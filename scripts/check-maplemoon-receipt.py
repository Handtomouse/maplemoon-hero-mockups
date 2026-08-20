#!/usr/bin/env python3
"""Fail-closed, low-token admission checks for MapleMoon worker receipts.

Workers create a recovery checkpoint before mutating, then return one JSON
receipt. A side-chat manager runs this tool at phase start, completion and
promotion instead of re-reading a long conversation.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import sys
import tempfile
from datetime import UTC, datetime
from pathlib import Path
from typing import Any


CONTROL_RE = re.compile(
    r"<!--\s*CONTROL-PLANE:BEGIN\s*-->\s*(\{.*?\})\s*"
    r"<!--\s*CONTROL-PLANE:END\s*-->",
    re.S,
)
SHA256_RE = re.compile(r"^[0-9a-f]{64}$")
PACKET_REQUIRED = {
    "schema",
    "packet_id",
    "worker_thread_id",
    "state",
    "objective",
    "readable_paths",
    "writable_paths",
    "verify",
    "stop",
    "next_reviewer",
}
RECEIPT_REQUIRED = {
    "schema",
    "receipt_id",
    "packet_id",
    "worker_thread_id",
    "worker",
    "started_at",
    "completed_at",
    "files_read",
    "files_changed",
    "pre_sha256",
    "post_sha256",
    "checks",
    "screenshots_or_urls",
    "failures",
    "unknowns",
    "residual_risk",
    "forbidden_path_changes",
    "proposed_next_state",
    "next_reviewer",
}


class GateError(RuntimeError):
    """A malformed gate input. It is a HOLD, never an inference."""


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def path_snapshot(path: Path) -> dict[str, str | int]:
    if not path.exists():
        return {"state": "absent"}
    if path.is_symlink():
        raise GateError(f"symlink is not an admitted checkpoint target: {path}")
    if path.is_file():
        return {"state": "present", "kind": "file", "sha256": sha256_file(path)}
    if not path.is_dir():
        raise GateError(f"unsupported checkpoint target: {path}")

    digest = hashlib.sha256()
    count = 0
    for child in sorted(path.rglob("*")):
        if child.is_symlink():
            raise GateError(f"symlink inside checkpoint target: {child}")
        if not child.is_file():
            continue
        relative = child.relative_to(path).as_posix().encode("utf-8")
        digest.update(relative)
        digest.update(b"\0")
        digest.update(sha256_file(child).encode("ascii"))
        digest.update(b"\n")
        count += 1
    return {"state": "present", "kind": "directory", "sha256": digest.hexdigest(), "files": count}


def normalise_relative(value: str) -> str:
    raw = Path(value)
    if not value or raw.is_absolute() or ".." in raw.parts or value.endswith("/**"):
        raise GateError(f"scope path must be exact and repository-relative: {value!r}")
    normalised = raw.as_posix()
    if normalised in {".", ""}:
        raise GateError("repository root cannot be a writable path")
    return normalised


def parse_embedded_json(path: Path) -> dict[str, Any]:
    text = path.read_text(encoding="utf-8")
    if path.suffix.lower() == ".json":
        payload = json.loads(text)
    else:
        matches = CONTROL_RE.findall(text)
        if len(matches) != 1:
            raise GateError(f"expected one CONTROL-PLANE JSON block: {path}")
        payload = json.loads(matches[0])
    if not isinstance(payload, dict):
        raise GateError(f"control data must be an object: {path}")
    return payload


def load_packet(path: Path) -> tuple[dict[str, Any], list[str]]:
    packet = parse_embedded_json(path)
    missing = sorted(PACKET_REQUIRED - packet.keys())
    if missing:
        raise GateError(f"packet missing required fields: {', '.join(missing)}")
    if packet.get("schema") != "maplemoon-packet/v2":
        raise GateError("packet schema must be maplemoon-packet/v2")
    if not isinstance(packet["worker_thread_id"], str) or not packet["worker_thread_id"].strip():
        raise GateError("packet worker_thread_id must name the exact worker task")
    writable = packet["writable_paths"]
    if not isinstance(writable, list) or not all(isinstance(value, str) for value in writable):
        raise GateError("packet writable_paths must be a list of strings")
    exact_writable = [normalise_relative(value) for value in writable]
    if len(set(exact_writable)) != len(exact_writable):
        raise GateError("packet contains duplicate writable paths")
    for index, left in enumerate(sorted(exact_writable)):
        for right in sorted(exact_writable)[index + 1 :]:
            if right.startswith(left + "/"):
                raise GateError(f"writer overlap: {left} and {right}")
    return packet, exact_writable


def load_receipt(path: Path) -> dict[str, Any]:
    receipt = parse_embedded_json(path)
    missing = sorted(RECEIPT_REQUIRED - receipt.keys())
    if missing:
        raise GateError(f"receipt missing required fields: {', '.join(missing)}")
    if receipt.get("schema") != "maplemoon-receipt/v2":
        raise GateError("receipt schema must be maplemoon-receipt/v2")
    if not isinstance(receipt["worker_thread_id"], str) or not receipt["worker_thread_id"].strip():
        raise GateError("receipt worker_thread_id must name the exact worker task")
    for field in ("files_read", "files_changed", "checks", "screenshots_or_urls", "failures", "unknowns", "residual_risk", "forbidden_path_changes"):
        if not isinstance(receipt[field], list):
            raise GateError(f"receipt {field} must be a list")
    for field in ("pre_sha256", "post_sha256"):
        if not isinstance(receipt[field], dict):
            raise GateError(f"receipt {field} must be an object")
    return receipt


def copy_snapshot(source: Path, destination: Path) -> None:
    if not source.exists():
        return
    if source.is_symlink():
        raise GateError(f"refusing checkpoint of symlink: {source}")
    destination.parent.mkdir(parents=True, exist_ok=True)
    if source.is_file():
        shutil.copy2(source, destination)
    elif source.is_dir():
        shutil.copytree(source, destination, symlinks=False)
    else:
        raise GateError(f"unsupported checkpoint source: {source}")


def checkpoint(packet_path: Path, root: Path, destination: Path) -> int:
    packet, writable = load_packet(packet_path)
    if not writable:
        print(f"PASS checkpoint packet={packet['packet_id']} mode=read-only files=0")
        return 0
    if destination.exists():
        raise GateError(f"checkpoint destination already exists: {destination}")
    destination.mkdir(parents=True)
    snapshots: dict[str, dict[str, str | int]] = {}
    try:
        for relative in writable:
            source = root / relative
            target = destination / "files" / relative
            snapshots[relative] = path_snapshot(source)
            copy_snapshot(source, target)
            if snapshots[relative]["state"] == "present":
                copied = path_snapshot(target)
                if copied != snapshots[relative]:
                    raise GateError(f"checkpoint hash mismatch after copy: {relative}")
        payload = {
            "schema": "maplemoon-recovery-checkpoint/v1",
            "packet_id": packet["packet_id"],
            "created_at": datetime.now(UTC).isoformat().replace("+00:00", "Z"),
            "repository": str(root.resolve()),
            "files": snapshots,
        }
        manifest = destination / "RECOVERY_MANIFEST.json"
        manifest.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    except Exception:
        # Preserve a partial checkpoint for inspection. It is never silently reused.
        raise
    print(f"PASS checkpoint packet={packet['packet_id']} files={len(writable)} path={destination}")
    return 0


def validate_checkpoint(packet: dict[str, Any], writable: list[str], root: Path, checkpoint_root: Path, *, phase: str) -> list[str]:
    holds: list[str] = []
    manifest_path = checkpoint_root / "RECOVERY_MANIFEST.json"
    if not manifest_path.is_file():
        return ["recovery manifest missing"]
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return ["recovery manifest invalid JSON"]
    if manifest.get("schema") != "maplemoon-recovery-checkpoint/v1":
        holds.append("recovery manifest schema mismatch")
    if manifest.get("packet_id") != packet["packet_id"]:
        holds.append("recovery packet ID mismatch")
    if manifest.get("repository") != str(root.resolve()):
        holds.append("recovery repository mismatch")
    records = manifest.get("files")
    if not isinstance(records, dict) or set(records) != set(writable):
        holds.append("recovery scope does not exactly match packet writable paths")
        return holds
    for relative in writable:
        expected = records[relative]
        copied = checkpoint_root / "files" / relative
        if expected.get("state") == "present":
            try:
                if path_snapshot(copied) != expected:
                    holds.append(f"recovery bytes changed or missing: {relative}")
            except GateError as error:
                holds.append(str(error))
        elif expected.get("state") != "absent":
            holds.append(f"recovery state invalid: {relative}")
        if phase == "start":
            try:
                if path_snapshot(root / relative) != expected:
                    holds.append(f"source changed after recovery checkpoint: {relative}")
            except GateError as error:
                holds.append(str(error))
    return holds


def validate_receipt(
    packet: dict[str, Any],
    writable: list[str],
    receipt: dict[str, Any],
    receipt_relative: str,
    root: Path,
    checkpoint_root: Path | None,
    phase: str,
) -> tuple[list[str], list[str]]:
    holds: list[str] = []
    fails: list[str] = []
    if receipt["packet_id"] != packet["packet_id"]:
        fails.append("receipt packet ID does not match packet")
    if receipt["worker_thread_id"] != packet["worker_thread_id"]:
        fails.append("receipt worker task does not match packet")
    if receipt["forbidden_path_changes"]:
        fails.append("receipt reports forbidden path changes")
    if receipt["failures"]:
        holds.append("receipt reports unresolved failures")
    if not receipt["checks"]:
        holds.append("receipt has no checks")
    for index, check in enumerate(receipt["checks"], start=1):
        if not isinstance(check, dict):
            fails.append(f"receipt check {index} is malformed: expected an object, got {check!r}")
            continue

        declared = check.get("expected_exit_code", 0)
        if isinstance(declared, int) and not isinstance(declared, bool):
            expected = [declared]
        elif (
            isinstance(declared, list)
            and declared
            and all(isinstance(value, int) and not isinstance(value, bool) for value in declared)
        ):
            expected = declared
        else:
            fails.append(
                f"receipt check {index} has malformed expected_exit_code: "
                f"expected an integer or non-empty list of integers, got {declared!r}"
            )
            continue

        actual = check.get("exit_code")
        expected_text = str(expected[0]) if len(expected) == 1 else f"one of {expected}"
        if not isinstance(actual, int) or isinstance(actual, bool) or actual not in expected:
            fails.append(
                f"receipt check {index} exit code mismatch: expected {expected_text}, got {actual!r}"
            )

    try:
        changed = [normalise_relative(value) for value in receipt["files_changed"]]
    except GateError as error:
        fails.append(str(error))
        changed = []
    if len(set(changed)) != len(changed):
        fails.append("receipt contains duplicate changed paths")
    if any(path not in writable for path in changed):
        fails.append("receipt changed a path outside packet writable scope")
    if checkpoint_root is not None:
        holds.extend(validate_checkpoint(packet, writable, root, checkpoint_root, phase="complete"))
        manifest = json.loads((checkpoint_root / "RECOVERY_MANIFEST.json").read_text(encoding="utf-8")) if (checkpoint_root / "RECOVERY_MANIFEST.json").is_file() else {}
        snapshots = manifest.get("files", {})
        observed_changed: list[str] = []
        for relative in writable:
            before = snapshots.get(relative)
            if before is None:
                continue
            try:
                after = path_snapshot(root / relative)
            except GateError as error:
                fails.append(str(error))
                continue
            if after != before:
                observed_changed.append(relative)
            reported_pre = receipt["pre_sha256"].get(relative)
            reported_post = receipt["post_sha256"].get(relative)
            expected_pre = before.get("sha256") if before.get("state") == "present" else None
            actual_post = after.get("sha256") if after.get("state") == "present" else None
            if relative in changed:
                if relative == receipt_relative:
                    if reported_pre != expected_pre or reported_post is not None:
                        holds.append(f"receipt self-hash evidence mismatch: {relative}")
                elif reported_pre != expected_pre or reported_post != actual_post:
                    holds.append(f"receipt hash evidence mismatch: {relative}")
        if set(changed) != set(observed_changed):
            holds.append("receipt changed-path list does not match checkpoint comparison")
    elif writable:
        holds.append("mutating packet has no recovery checkpoint")

    if phase == "promote":
        if packet.get("requires_visual_evidence") and not receipt["screenshots_or_urls"]:
            holds.append("visual packet has no rendered evidence")
        if receipt["proposed_next_state"] == "accepted" and (receipt["unknowns"] or receipt["residual_risk"]):
            holds.append("accepted state conflicts with listed unknowns or residual risk")
    return holds, fails


def verify(packet_path: Path, receipt_path: Path | None, root: Path, checkpoint_root: Path | None, phase: str) -> int:
    packet, writable = load_packet(packet_path)
    if phase == "start":
        holds = validate_checkpoint(packet, writable, root, checkpoint_root, phase="start") if writable and checkpoint_root else ([] if not writable else ["mutating packet has no recovery checkpoint"])
        if holds:
            print(f"HOLD packet={packet['packet_id']} reason={' | '.join(holds)}")
            return 2
        print(f"PASS packet={packet['packet_id']} phase=start scope={len(writable)}")
        return 0
    if receipt_path is None:
        raise GateError("completion and promotion verification require a receipt")
    receipt = load_receipt(receipt_path)
    try:
        receipt_relative = normalise_relative(receipt_path.resolve().relative_to(root.resolve()).as_posix())
    except ValueError as error:
        raise GateError("receipt must be inside the repository root") from error
    holds, fails = validate_receipt(packet, writable, receipt, receipt_relative, root, checkpoint_root, phase)
    if fails:
        print(f"FAIL packet={packet['packet_id']} reason={' | '.join(fails)}")
        return 3
    if holds:
        print(f"HOLD packet={packet['packet_id']} reason={' | '.join(holds)}")
        return 2
    print(f"PASS packet={packet['packet_id']} phase={phase} changed={len(receipt['files_changed'])}")
    return 0


def self_test() -> int:
    with tempfile.TemporaryDirectory(prefix="maplemoon-receipt-gate-") as temp:
        root = Path(temp) / "repo"
        root.mkdir()
        (root / "sample.txt").write_text("before\n", encoding="utf-8")
        packet = {
            "schema": "maplemoon-packet/v2",
            "packet_id": "SELFTEST-01",
            "worker_thread_id": "self-test-worker",
            "state": "ready",
            "objective": "self test",
            "readable_paths": ["sample.txt"],
            "writable_paths": ["sample.txt", "receipt.json"],
            "verify": ["self test"],
            "stop": ["self test"],
            "next_reviewer": "Codex",
        }
        packet_path = root / "packet.json"
        packet_path.write_text(json.dumps(packet), encoding="utf-8")
        checkpoint_root = root / "checkpoint"
        checkpoint(packet_path, root, checkpoint_root)
        if verify(packet_path, None, root, checkpoint_root, "start") != 0:
            raise GateError("self-test start gate failed")
        before = sha256_file(root / "sample.txt")
        (root / "sample.txt").write_text("after\n", encoding="utf-8")
        after = sha256_file(root / "sample.txt")
        incomplete_receipt = {
            "schema": "maplemoon-receipt/v2",
            "receipt_id": "SELFTEST-INCOMPLETE-01",
            "packet_id": "SELFTEST-01",
            "worker_thread_id": "self-test-worker",
            "worker": "self-test",
            "started_at": "2026-08-01T00:00:00Z",
            "completed_at": "2026-08-01T00:00:01Z",
            "files_read": ["sample.txt"],
            "files_changed": [],
            "pre_sha256": {},
            "post_sha256": {},
            "checks": [{"command": "self test", "exit_code": 0, "result": "pass"}],
            "screenshots_or_urls": [],
            "failures": [],
            "unknowns": [],
            "residual_risk": [],
            "forbidden_path_changes": [],
            "proposed_next_state": "needs_review",
            "next_reviewer": "Codex",
        }
        incomplete_path = root / "incomplete-receipt.json"
        incomplete_path.write_text(json.dumps(incomplete_receipt), encoding="utf-8")
        if verify(packet_path, incomplete_path, root, checkpoint_root, "complete") != 2:
            raise GateError("self-test did not hold incomplete receipt")
        receipt = {
            "schema": "maplemoon-receipt/v2",
            "receipt_id": "SELFTEST-RECEIPT-01",
            "packet_id": "SELFTEST-01",
            "worker_thread_id": "self-test-worker",
            "worker": "self-test",
            "started_at": "2026-08-01T00:00:00Z",
            "completed_at": "2026-08-01T00:00:01Z",
            "files_read": ["sample.txt"],
            "files_changed": ["sample.txt", "receipt.json"],
            "pre_sha256": {"sample.txt": before, "receipt.json": None},
            "post_sha256": {"sample.txt": after, "receipt.json": None},
            "checks": [{"command": "self test", "exit_code": 0, "result": "pass"}],
            "screenshots_or_urls": [],
            "failures": [],
            "unknowns": [],
            "residual_risk": [],
            "forbidden_path_changes": [],
            "proposed_next_state": "needs_review",
            "next_reviewer": "Codex",
        }
        receipt_path = root / "receipt.json"
        receipt_path.write_text(json.dumps(receipt), encoding="utf-8")
        if verify(packet_path, receipt_path, root, checkpoint_root, "complete") != 0:
            raise GateError("self-test completion gate failed")
    print("PASS self-test checkpoint, scope, hash and missing-receipt checks")
    return 0


def parser() -> argparse.ArgumentParser:
    command = argparse.ArgumentParser(description=__doc__)
    command.add_argument("--self-test", action="store_true")
    subparsers = command.add_subparsers(dest="command")

    checkpoint_parser = subparsers.add_parser("checkpoint", help="create a non-overwriting recovery checkpoint")
    checkpoint_parser.add_argument("--packet", type=Path, required=True)
    checkpoint_parser.add_argument("--root", type=Path, default=Path.cwd())
    checkpoint_parser.add_argument("--destination", type=Path, required=True)

    verify_parser = subparsers.add_parser("verify", help="gate a worker at start, completion or promotion")
    verify_parser.add_argument("--packet", type=Path, required=True)
    verify_parser.add_argument("--root", type=Path, default=Path.cwd())
    verify_parser.add_argument("--checkpoint", type=Path)
    verify_parser.add_argument("--receipt", type=Path)
    verify_parser.add_argument("--phase", choices=("start", "complete", "promote"), required=True)
    return command


def main() -> int:
    args = parser().parse_args()
    try:
        if args.self_test:
            return self_test()
        if args.command == "checkpoint":
            return checkpoint(args.packet, args.root.resolve(), args.destination)
        if args.command == "verify":
            return verify(args.packet, args.receipt, args.root.resolve(), args.checkpoint, args.phase)
        raise GateError("choose checkpoint or verify")
    except (GateError, OSError, ValueError, json.JSONDecodeError) as error:
        print(f"HOLD reason={error}")
        return 2


if __name__ == "__main__":
    sys.exit(main())
