#!/usr/bin/env python3
"""Fail-closed validation for the proposed MapleMoon V2 control plane.

This is a read-only policy validator, not an enforcement hook. Normal and
bootstrap validation read repository state but never mutate it. Self-tests use
temporary fixtures outside the repository.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath
from typing import Any, Callable


CANDIDATE_ID = "CTRL-V2-CANDIDATE-20260730-001"
EXPECTED_HEAD = "a6cd91a589ceff18283e4c6250ac256fe97812a4"
EXPECTED_BRANCH = "codex-maplemoon-section-review"
MANIFEST_PATH = "docs/orchestration/LOCK_MANIFEST.json"
REVIEW_PATH = "docs/orchestration/reviews/CTRL-V2-REVIEW_CHAIN.md"
CHOOSER_PATH = "_wip/_CAROB_EDUCATION_VISUAL_DECISION_20260730.html"
CHOOSER_SHA256 = "976567ee99c1a367bd2317877bbb5672cf483d4d3478a18ea1b6826ff3cb68a7"

PAYLOAD_PATHS = [
    "docs/plans/2026-07-30-maplemoon-master-orchestration-plan-v2.md",
    "docs/orchestration/MASTER_PACKET_REGISTER.md",
    "docs/orchestration/CONTROL_PLANE_INTERFACES.md",
    "docs/orchestration/packets/CTRL-V2-P03.md",
    "docs/orchestration/packets/VIS-01A.md",
    "docs/orchestration/packets/CAT-01A-READ.md",
    "scripts/validate-maplemoon-control-plane.py",
]
NEW_TARGETS = PAYLOAD_PATHS[:3] + [REVIEW_PATH] + PAYLOAD_PATHS[3:]
P03_WRITABLE_PATHS = NEW_TARGETS + [MANIFEST_PATH]

PHASE_ORDER = [
    "CTRL-V2",
    "NATE-RATIFICATION",
    "VIS-01+CAT-01",
    "SECURITY-ACCESS",
    "THEME",
    "PAGE",
    "COMM-MEAS-DESIGN",
    "MEAS-IMPLEMENTATION",
    "UAT",
    "WRITTEN-GO-NO-GO",
    "CUT",
    "STAB",
]
PAGE_ORDER = [
    "Homepage",
    "Shop",
    "Our Story",
    "Carob Story",
    "Stockists",
    "FAQ",
]
STATES = {
    "planned",
    "ready",
    "in_progress",
    "needs_review",
    "accepted",
    "blocked",
    "rejected",
    "superseded",
}
APPROVAL_CLASSES = {
    "read-only",
    "local-review-only",
    "mutating-local",
    "git-gated",
    "external-gated",
    "production-gated",
}
SOURCE_HASHES = {
    "docs/plans/2026-07-29-maplemoon-master-orchestration-plan-draft.md":
        "32b1072654844f88be2e2694ab3f24688f0a6fbdf79817ffca034adbdc0e330c",
    "docs/orchestration/GOV-01_RATIFIED_LEDGER.md":
        "004cd5a0a6a4733f5c3b2517789b88655a443f9fdb27930f80eb954ad7273ffa",
    "docs/orchestration/GOV-01_RECONCILIATION_RECEIPT_20260730.md":
        "8edf833d76399a7c42508183a66fbedcd20a9e7ed1ee0b48b6bf212827fc2b99",
    CHOOSER_PATH: CHOOSER_SHA256,
}
CONTROL_RE = re.compile(
    r"<!-- CONTROL-PLANE:BEGIN -->\s*(\{.*?\})\s*"
    r"<!-- CONTROL-PLANE:END -->",
    re.DOTALL,
)


class ValidationError(RuntimeError):
    """A fail-closed control-plane validation failure."""


def strict_object(pairs: list[tuple[str, Any]]) -> dict[str, Any]:
    result: dict[str, Any] = {}
    for key, value in pairs:
        if key in result:
            raise ValidationError(f"duplicate JSON key: {key}")
        result[key] = value
    return result


def load_json_strict(text: str, origin: str) -> Any:
    try:
        return json.loads(text, object_pairs_hook=strict_object)
    except (json.JSONDecodeError, ValidationError) as exc:
        raise ValidationError(f"{origin}: invalid strict JSON: {exc}") from exc


def read_json_strict(path: Path) -> Any:
    return load_json_strict(path.read_text(encoding="utf-8"), str(path))


def sha256_raw(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def extract_control(path: Path) -> dict[str, Any]:
    text = path.read_text(encoding="utf-8")
    matches = CONTROL_RE.findall(text)
    if len(matches) != 1:
        raise ValidationError(f"{path}: expected exactly one control block")
    block = load_json_strict(matches[0], str(path))
    if not isinstance(block, dict):
        raise ValidationError(f"{path}: control block must be an object")
    return block


def parse_utc(value: str) -> datetime:
    if not isinstance(value, str) or not value.endswith("Z"):
        raise ValidationError(f"UTC timestamp must end in Z: {value!r}")
    try:
        parsed = datetime.fromisoformat(value[:-1] + "+00:00")
    except ValueError as exc:
        raise ValidationError(f"invalid UTC timestamp: {value!r}") from exc
    if parsed.utcoffset() != timezone.utc.utcoffset(parsed):
        raise ValidationError(f"timestamp is not UTC: {value!r}")
    return parsed


def safe_relative_path(root: Path, value: str) -> Path:
    if not isinstance(value, str) or not value:
        raise ValidationError("path must be a non-empty string")
    pure = PurePosixPath(value)
    if pure.is_absolute() or ".." in pure.parts or "." in pure.parts:
        raise ValidationError(f"unsafe relative path: {value}")
    if str(pure) != value or "\\" in value:
        raise ValidationError(f"non-canonical repository path: {value}")
    root_resolved = root.resolve()
    target = root / value
    cursor = root
    for part in pure.parts:
        cursor = cursor / part
        if cursor.is_symlink():
            raise ValidationError(f"symlink component forbidden in exact path: {value}")
    resolved = target.resolve(strict=False)
    try:
        resolved.relative_to(root_resolved)
    except ValueError as exc:
        raise ValidationError(f"path or symlink escapes repository: {value}") from exc
    return target


def validate_path_set(root: Path, paths: list[str]) -> None:
    folded: dict[str, str] = {}
    canonical: list[PurePosixPath] = []
    for value in paths:
        safe_relative_path(root, value)
        key = value.casefold()
        if key in folded and folded[key] != value:
            raise ValidationError(
                f"case-fold path collision: {folded[key]} and {value}"
            )
        folded[key] = value
        canonical.append(PurePosixPath(value))
    for index, left in enumerate(canonical):
        for right in canonical[index + 1:]:
            if left == right:
                raise ValidationError(f"duplicate path: {left}")
            if left in right.parents or right in left.parents:
                raise ValidationError(f"ancestor/descendant writer overlap: {left}, {right}")


def validate_base_state(root: Path, row: dict[str, Any]) -> None:
    path = safe_relative_path(root, row["path"])
    state = row.get("base_state")
    base_hash = row.get("base_sha256")
    if state == "absent":
        if base_hash is not None:
            raise ValidationError(f"{row['path']}: absent base must use null hash")
        if path.exists():
            raise ValidationError(f"{row['path']}: expected absent base but path exists")
    elif state == "present":
        if not path.is_file() or not isinstance(base_hash, str):
            raise ValidationError(f"{row['path']}: invalid present base")
        if sha256_raw(path) != base_hash:
            raise ValidationError(f"{row['path']}: present base hash mismatch")
    else:
        raise ValidationError(f"{row['path']}: invalid base_state {state!r}")


def validate_active_lease(
    row: dict[str, Any],
    now: datetime | None = None,
) -> None:
    acquired = parse_utc(row.get("acquired_at"))
    expires = parse_utc(row.get("lease_expires_at"))
    if acquired >= expires:
        raise ValidationError(f"{row.get('path')}: lease acquisition is not before expiry")
    if now is not None and expires <= now:
        raise ValidationError(f"{row.get('path')}: active lease is expired")


def validate_writable_leases(
    writable_paths: list[str],
    active_rows: list[dict[str, Any]],
) -> None:
    leased = {row["path"] for row in active_rows}
    missing = sorted(set(writable_paths) - leased)
    if missing:
        raise ValidationError(f"writable paths outside active lease: {missing}")


def validate_concurrency(packets: list[dict[str, Any]]) -> None:
    active = [p for p in packets if p.get("active")]
    read_only = [p for p in active if p.get("approval_class") == "read-only"]
    if len(read_only) > 3:
        raise ValidationError("more than three active read-only packets")
    mutating_by_cluster: dict[str, set[tuple[str, str]]] = {}
    for packet in active:
        if packet.get("approval_class") != "mutating-local":
            continue
        cluster = packet.get("cluster_id")
        identity = (str(packet.get("packet_id")), str(packet.get("owner")))
        mutating_by_cluster.setdefault(str(cluster), set()).add(identity)
    for cluster, identities in mutating_by_cluster.items():
        if len(identities) > 1:
            raise ValidationError(
                f"multiple mutating workers in cluster {cluster}: {sorted(identities)}"
            )


def validate_state(block: dict[str, Any], origin: str) -> None:
    state = block.get("state", block.get("status"))
    if state not in STATES:
        raise ValidationError(f"{origin}: invalid state/status {state!r}")
    disposition = block.get("disposition")
    if disposition == "needs-decision" and state != "needs_review":
        raise ValidationError(
            f"{origin}: needs-decision is only valid on needs_review"
        )
    if state == "ratified":
        raise ValidationError(f"{origin}: premature ratified state")


def validate_cat_contract(block: dict[str, Any]) -> None:
    if block.get("pii_exclusion_required") is not True:
        raise ValidationError("CAT packet missing PII exclusion")
    if block.get("authority_reference_required") is not True:
        raise ValidationError("CAT packet missing authority reference")
    if block.get("writable_paths") != []:
        raise ValidationError("CAT-01A-READ must have no writable paths")


def validate_freeze(
    root: Path,
    payload_hashes: dict[str, str] | None,
    review_hash: str | None,
    receipt_present: bool,
) -> None:
    if not receipt_present:
        raise ValidationError("missing review-chain receipt")
    if not isinstance(payload_hashes, dict) or set(payload_hashes) != set(PAYLOAD_PATHS):
        raise ValidationError("payload hash-set paths do not match")
    for relative, expected in payload_hashes.items():
        if sha256_raw(safe_relative_path(root, relative)) != expected:
            raise ValidationError(f"frozen payload hash mismatch: {relative}")
    if not isinstance(review_hash, str) or sha256_raw(root / REVIEW_PATH) != review_hash:
        raise ValidationError("review-chain hash mismatch")


def run_git(root: Path, *args: str) -> str:
    try:
        result = subprocess.run(
            ["git", *args],
            cwd=root,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
    except (OSError, subprocess.CalledProcessError) as exc:
        raise ValidationError(f"required read-only git check failed: git {' '.join(args)}") from exc
    return result.stdout.strip()


def git_dirty_paths(root: Path) -> set[str]:
    try:
        result = subprocess.run(
            ["git", "status", "--porcelain=v1", "-z", "--untracked-files=all"],
            cwd=root,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
    except (OSError, subprocess.CalledProcessError) as exc:
        raise ValidationError("required read-only git status check failed") from exc
    output = result.stdout
    if not output:
        return set()
    records = output.split(b"\0")
    dirty: set[str] = set()
    index = 0
    while index < len(records):
        record = records[index]
        index += 1
        if not record:
            continue
        if len(record) < 4:
            raise ValidationError(f"unparseable git status record: {record!r}")
        code = record[:2].decode("ascii", errors="strict")
        path = record[3:].decode("utf-8", errors="surrogateescape")
        if "R" in code or "C" in code:
            if index >= len(records):
                raise ValidationError("truncated rename/copy status")
            index += 1
        dirty.add(path)
    return dirty


def validate_manifest_structure(root: Path, manifest: dict[str, Any]) -> list[dict[str, Any]]:
    if manifest.get("manifest_version") != 2:
        raise ValidationError("manifest_version must be 2")
    baseline = manifest.get("current_baseline")
    if not isinstance(baseline, dict):
        raise ValidationError("current_baseline missing")
    if baseline.get("branch") != EXPECTED_BRANCH or baseline.get("head") != EXPECTED_HEAD:
        raise ValidationError("manifest current baseline mismatch")
    admission = manifest.get("bootstrap_admission")
    if not isinstance(admission, dict):
        raise ValidationError("bootstrap admission missing")
    if admission.get("receipt_id") != "NATE-LOCAL-AUTH-20260730-CTRL-V2-P03":
        raise ValidationError("bootstrap receipt mismatch")
    if admission.get("preflight_absent_paths") != NEW_TARGETS:
        raise ValidationError("bootstrap absent-path attestation mismatch")
    locks = manifest.get("locks")
    if not isinstance(locks, list) or not locks:
        raise ValidationError("manifest locks missing")
    legacy = [
        row for row in locks
        if row.get("packet_id") == "MM-CARLI-REVIEW-20260729-CTA"
    ]
    if len(legacy) != 1:
        raise ValidationError("exactly one legacy lock row required")
    legacy_row = legacy[0]
    if "schema_version" in legacy_row:
        raise ValidationError("legacy v1 row must remain structurally unchanged")
    if legacy_row.get("base_hash") != "94bd03e51f38642619c19f2ed5d772b720f6254b":
        raise ValidationError("legacy v1 row hash changed")
    v2_rows = [row for row in locks if row is not legacy_row]
    if len(v2_rows) != 8:
        raise ValidationError("exactly eight V2 lock rows required")
    paths = [row.get("path") for row in v2_rows]
    if set(paths) != set(NEW_TARGETS) or len(paths) != len(set(paths)):
        raise ValidationError("V2 lock paths do not match exact target set")
    validate_path_set(root, paths)
    for row in v2_rows:
        if row.get("schema_version") != 2:
            raise ValidationError(f"{row.get('path')}: versionless or non-v2 row")
        if row.get("hash_algorithm") != "sha256-raw":
            raise ValidationError(f"{row.get('path')}: hash algorithm must be sha256-raw")
        if row.get("packet_id") != "CTRL-V2-P03":
            raise ValidationError(f"{row.get('path')}: wrong packet")
        if row.get("candidate_id") != CANDIDATE_ID:
            raise ValidationError(f"{row.get('path')}: wrong candidate")
        if row.get("cluster_id") != "CTRL-V2-CONTROL-PLANE":
            raise ValidationError(f"{row.get('path')}: wrong cluster")
        if row.get("owner") != "Codex":
            raise ValidationError(f"{row.get('path')}: wrong lock owner")
        if row.get("approval_class") != "mutating-local":
            raise ValidationError(f"{row.get('path')}: wrong approval class")
        if row.get("base_state") != "absent" or row.get("base_sha256") is not None:
            raise ValidationError(f"{row.get('path')}: invalid construction base")
        validate_active_lease(row)
    active_rows = [row for row in v2_rows if row.get("status") == "held"]
    validate_concurrency([
        {
            "active": bool(active_rows),
            "approval_class": "mutating-local",
            "cluster_id": "CTRL-V2-CONTROL-PLANE",
            "packet_id": "CTRL-V2-P03",
            "owner": "Codex",
        }
    ])
    return v2_rows


def validate_payload(root: Path) -> dict[str, dict[str, Any]]:
    blocks: dict[str, dict[str, Any]] = {}
    document_ids: set[str] = set()
    for relative in PAYLOAD_PATHS[:-1]:
        path = safe_relative_path(root, relative)
        if not path.is_file():
            raise ValidationError(f"missing payload document: {relative}")
        block = extract_control(path)
        if block.get("schema") not in {
            "maplemoon-control-plane/v2",
            "maplemoon-packet/v2",
        }:
            raise ValidationError(f"{relative}: wrong schema")
        if block.get("candidate_id") != CANDIDATE_ID:
            raise ValidationError(f"{relative}: wrong candidate")
        document_id = block.get("document_id")
        if not isinstance(document_id, str) or document_id in document_ids:
            raise ValidationError(f"{relative}: missing or duplicate document_id")
        document_ids.add(document_id)
        validate_state(block, relative)
        blocks[document_id] = block

    plan = blocks["CTRL-V2-MASTER-PLAN"]
    if plan.get("phase_order") != PHASE_ORDER:
        raise ValidationError("master plan phase order mismatch")
    if plan.get("page_order") != PAGE_ORDER:
        raise ValidationError("master plan page order mismatch")
    if plan.get("current_authority") != "GOV-01":
        raise ValidationError("master plan must retain GOV-01 authority")

    register = blocks["MASTER-PACKET-REGISTER"]
    if set(register.get("states", [])) != STATES:
        raise ValidationError("register state set mismatch")
    if "needs-decision" in register.get("states", []):
        raise ValidationError("needs-decision cannot be a packet state")
    if set(register.get("approval_classes", [])) != APPROVAL_CLASSES:
        raise ValidationError("approval class set mismatch")
    packet_map = {item["id"]: item for item in register.get("packets", [])}
    expected_packet_states = {
        "CTRL-V2-P03": "needs_review",
        "CTRL-V2-P04": "ready",
        "VIS-01A": "planned",
        "CAT-01A-READ": "blocked",
    }
    for packet_id, expected_state in expected_packet_states.items():
        if packet_map.get(packet_id, {}).get("state") != expected_state:
            raise ValidationError(f"register state mismatch for {packet_id}")
    p04 = packet_map.get("CTRL-V2-P04", {})
    if p04.get("purpose") != "CTRL-V2-RATIFY":
        raise ValidationError("CTRL-V2-P04 must be the explicit ratification packet")
    required_bindings = {
        "candidate_id",
        "seven payload sha256-raw values",
        "review-chain sha256-raw",
        "Nate explicit decision and timestamp",
        "GOV-01 and July 29 draft supersession effects",
    }
    if set(p04.get("required_bindings", [])) != required_bindings:
        raise ValidationError("CTRL-V2-P04 ratification binding set mismatch")

    interfaces = blocks["CONTROL-PLANE-INTERFACES"]
    required_contracts = {
        "packet",
        "receipt",
        "lock",
        "transfer",
        "approval",
        "local-visual",
        "catalogue-intake",
        "review",
    }
    if set(interfaces.get("contracts", [])) != required_contracts:
        raise ValidationError("interface contract set mismatch")
    if interfaces.get("hash_algorithm") != "sha256-raw":
        raise ValidationError("interface hash algorithm mismatch")
    if interfaces.get("unknown_policy") != "deny":
        raise ValidationError("unknown inputs must deny")

    p03 = blocks["PACKET-CTRL-V2-P03"]
    if p03.get("writable_paths") != P03_WRITABLE_PATHS:
        raise ValidationError("P03 writable path list or order mismatch")
    validate_path_set(root, p03["writable_paths"])
    if p03.get("approval_class") != "mutating-local":
        raise ValidationError("P03 approval class mismatch")

    visual = blocks["PACKET-VIS-01A"]
    if visual.get("state") != "planned" or visual.get("writable_paths") != []:
        raise ValidationError("VIS-01A must be planned and read-only")
    if visual.get("page_order") != PAGE_ORDER:
        raise ValidationError("VIS-01A page order mismatch")
    evidence = visual.get("evidence", {})
    if evidence.get("sha256_raw") != CHOOSER_SHA256:
        raise ValidationError("VIS chooser raw hash mismatch")
    if evidence.get("state") != "needs_review":
        raise ValidationError("VIS evidence must remain needs_review")
    if evidence.get("disposition") != "needs-decision":
        raise ValidationError("VIS evidence must require a human decision")
    if evidence.get("render_state") != "blocked":
        raise ValidationError("VIS chooser render must remain blocked")
    if visual.get("no_upload") is not True:
        raise ValidationError("VIS packet must prohibit upload")
    if visual.get("no_send") is not True:
        raise ValidationError("VIS packet must prohibit send")
    if visual.get("no_promotion") is not True:
        raise ValidationError("VIS packet must prohibit promotion")
    if visual.get("zero_external_requests_required") is not True:
        raise ValidationError("VIS packet must require zero external requests")
    if visual.get("viewports") != [1440, 1024, 430, 390, 375, 320]:
        raise ValidationError("VIS viewport matrix mismatch")
    if visual.get("page_paths") != [
        "_wip/homepage_real_1_lead_photo.WIP.html",
        "_wip/shop.WIP.html",
        "_wip/our-story.WIP.html",
        "_wip/carob-story.WIP.html",
        "_wip/stockists.WIP.html",
        "_wip/faq.WIP.html",
    ]:
        raise ValidationError("VIS page path matrix mismatch")

    cat = blocks["PACKET-CAT-01A-READ"]
    if cat.get("state") != "blocked":
        raise ValidationError("CAT-01A-READ must remain blocked")
    validate_cat_contract(cat)
    return blocks


def validate_repository(root: Path, mode: str) -> None:
    root = root.resolve()
    manifest = read_json_strict(root / MANIFEST_PATH)
    v2_rows = validate_manifest_structure(root, manifest)

    branch = run_git(root, "rev-parse", "--abbrev-ref", "HEAD")
    head = run_git(root, "rev-parse", "HEAD")
    if branch != EXPECTED_BRANCH or head != EXPECTED_HEAD:
        raise ValidationError("live Git branch/HEAD mismatch")

    for relative, expected in SOURCE_HASHES.items():
        path = safe_relative_path(root, relative)
        if not path.is_file() or sha256_raw(path) != expected:
            raise ValidationError(f"protected source drift: {relative}")

    if mode == "bootstrap":
        held = [row for row in v2_rows if row.get("status") == "held"]
        if len(held) != 8:
            raise ValidationError("bootstrap requires eight held exact-path leases")
        now = datetime.now(timezone.utc)
        for row in held:
            validate_active_lease(row, now)
            validate_base_state(root, row)
        print("PASS bootstrap: strict manifest v2 and eight exact-path leases")
        return

    validate_payload(root)

    allowed_dirty = set(NEW_TARGETS) | {MANIFEST_PATH, CHOOSER_PATH}
    dirty = git_dirty_paths(root)
    unexpected = sorted(dirty - allowed_dirty)
    if unexpected:
        raise ValidationError(f"unauthorized dirty paths: {unexpected}")
    required_dirty = set(NEW_TARGETS) | {MANIFEST_PATH, CHOOSER_PATH}
    if mode == "normal" and dirty != required_dirty:
        raise ValidationError(
            f"final dirty path set mismatch; missing={sorted(required_dirty - dirty)} "
            f"extra={sorted(dirty - required_dirty)}"
        )

    if mode == "payload":
        held = [row for row in v2_rows if row.get("status") == "held"]
        if len(held) != 8:
            raise ValidationError("payload mode requires eight held locks")
        now = datetime.now(timezone.utc)
        for row in held:
            validate_active_lease(row, now)
        print("PASS payload: core contracts, packets, source hashes, and scope")
        return

    if mode != "normal":
        raise ValidationError(f"unknown validation mode: {mode}")
    if any(row.get("status") == "held" for row in v2_rows):
        raise ValidationError("normal validation requires no held V2 lease")
    if any(row.get("status") != "released" for row in v2_rows):
        raise ValidationError("normal validation requires all V2 rows released")
    for row in v2_rows:
        path = root / row["path"]
        if not path.is_file() or row.get("post_sha256") != sha256_raw(path):
            raise ValidationError(f"released post hash mismatch: {row['path']}")

    review = extract_control(root / REVIEW_PATH)
    if review.get("document_id") != "CTRL-V2-REVIEW-CHAIN":
        raise ValidationError("review-chain document ID mismatch")
    if review.get("candidate_id") != CANDIDATE_ID:
        raise ValidationError("review-chain candidate mismatch")
    validate_state(review, REVIEW_PATH)
    if review.get("status") != "needs_review":
        raise ValidationError("review chain must remain needs_review")

    pins = manifest.get("freeze_pins")
    if not isinstance(pins, list) or len(pins) != 1:
        raise ValidationError("exactly one candidate freeze pin required")
    pin = pins[0]
    if pin.get("candidate_id") != CANDIDATE_ID or pin.get("status") != "needs_review":
        raise ValidationError("freeze pin candidate/state mismatch")
    if pin.get("review_chain_sha256") != sha256_raw(root / REVIEW_PATH):
        raise ValidationError("manifest review-chain freeze hash mismatch")
    if pin.get("payload_sha256") != review.get("payload_sha256"):
        raise ValidationError("manifest/review-chain payload hash set mismatch")
    validate_freeze(
        root,
        review.get("payload_sha256"),
        pin.get("review_chain_sha256"),
        review.get("receipt_present") is True,
    )
    print("PASS normal: proposed V2 candidate is closed and frozen at needs_review")


def expect_failure(name: str, operation: Callable[[], Any]) -> None:
    try:
        operation()
    except (ValidationError, KeyError, TypeError, OSError):
        return
    raise AssertionError(f"negative fixture unexpectedly passed: {name}")


def run_self_tests() -> None:
    expect_failure(
        "duplicate JSON keys",
        lambda: load_json_strict('{"a": 1, "a": 2}', "fixture"),
    )
    expect_failure(
        "invalid needs-decision state",
        lambda: validate_state(
            {"state": "planned", "disposition": "needs-decision"},
            "fixture",
        ),
    )
    expect_failure(
        "premature ratified claim",
        lambda: validate_state({"state": "ratified"}, "fixture"),
    )
    expect_failure(
        "CAT missing PII exclusion",
        lambda: validate_cat_contract(
            {
                "writable_paths": [],
                "authority_reference_required": True,
            }
        ),
    )
    expect_failure(
        "CAT missing authority reference",
        lambda: validate_cat_contract(
            {
                "writable_paths": [],
                "pii_exclusion_required": True,
            }
        ),
    )
    expect_failure(
        "more than three read-only agents",
        lambda: validate_concurrency([
            {"active": True, "approval_class": "read-only"} for _ in range(4)
        ]),
    )
    expect_failure(
        "two mutating workers in one cluster",
        lambda: validate_concurrency([
            {
                "active": True,
                "approval_class": "mutating-local",
                "cluster_id": "A",
                "packet_id": "P1",
                "owner": "one",
            },
            {
                "active": True,
                "approval_class": "mutating-local",
                "cluster_id": "A",
                "packet_id": "P2",
                "owner": "two",
            },
        ]),
    )
    expect_failure(
        "invalid UTC lease",
        lambda: parse_utc("2026-07-30T01:00:00+10:00"),
    )
    expired = parse_utc("2020-01-01T00:00:00Z")
    if expired >= datetime.now(timezone.utc):
        raise AssertionError("expired lease fixture is not expired")
    expect_failure(
        "expired manual lease",
        lambda: validate_active_lease(
            {
                "path": "fixture",
                "acquired_at": "2019-01-01T00:00:00Z",
                "lease_expires_at": "2020-01-01T00:00:00Z",
            },
            datetime.now(timezone.utc),
        ),
    )
    expect_failure(
        "lease acquisition after expiry",
        lambda: validate_active_lease(
            {
                "path": "fixture",
                "acquired_at": "2026-01-02T00:00:00Z",
                "lease_expires_at": "2026-01-01T00:00:00Z",
            }
        ),
    )

    with tempfile.TemporaryDirectory(prefix="maplemoon-control-plane-") as temp:
        root = Path(temp)
        (root / "ok").mkdir()
        (root / "ok/file.txt").write_bytes(b"known")
        expect_failure("absolute path", lambda: safe_relative_path(root, "/tmp/x"))
        expect_failure("path traversal", lambda: safe_relative_path(root, "../x"))
        outside = root.parent / f"{root.name}-outside"
        outside.mkdir(exist_ok=False)
        try:
            os.symlink(outside, root / "escape")
            expect_failure(
                "symlink escape",
                lambda: safe_relative_path(root, "escape/file.txt"),
            )
        finally:
            outside.rmdir()
        os.symlink(root / "ok/file.txt", root / "inside-link")
        try:
            expect_failure(
                "in-repository symlink",
                lambda: safe_relative_path(root, "inside-link"),
            )
        finally:
            (root / "inside-link").unlink()

        expect_failure(
            "case-fold collision",
            lambda: validate_path_set(root, ["ok/A.txt", "ok/a.txt"]),
        )
        expect_failure(
            "ancestor writer overlap",
            lambda: validate_path_set(root, ["ok", "ok/file.txt"]),
        )
        expect_failure(
            "present hash mismatch",
            lambda: validate_base_state(
                root,
                {
                    "path": "ok/file.txt",
                    "base_state": "present",
                    "base_sha256": "0" * 64,
                },
            ),
        )
        expect_failure(
            "absent base exists",
            lambda: validate_base_state(
                root,
                {
                    "path": "ok/file.txt",
                    "base_state": "absent",
                    "base_sha256": None,
                },
            ),
        )
        expect_failure(
            "writable path outside lease",
            lambda: validate_writable_leases(
                ["ok/file.txt"],
                [{"path": "different.txt"}],
            ),
        )
        expect_failure(
            "missing receipt",
            lambda: validate_freeze(root, {}, None, False),
        )
        (root / "payload.txt").write_bytes(b"payload")
        (root / "review.txt").write_bytes(b"review")
        expect_failure(
            "frozen hash mismatch",
            lambda: validate_freeze(
                root,
                {relative: "0" * 64 for relative in PAYLOAD_PATHS},
                "0" * 64,
                True,
            ),
        )

        validate_path_set(root, ["ok/file.txt", "payload.txt", "review.txt"])
        validate_base_state(
            root,
            {
                "path": "ok/file.txt",
                "base_state": "present",
                "base_sha256": sha256_raw(root / "ok/file.txt"),
            },
        )
        validate_concurrency([
            {
                "active": True,
                "approval_class": "mutating-local",
                "cluster_id": "A",
                "packet_id": "P1",
                "owner": "one",
            },
            {"active": True, "approval_class": "read-only"},
            {"active": True, "approval_class": "read-only"},
            {"active": True, "approval_class": "read-only"},
        ])
        validate_cat_contract(
            {
                "writable_paths": [],
                "pii_exclusion_required": True,
                "authority_reference_required": True,
            }
        )
        validate_state(
            {"state": "needs_review", "disposition": "needs-decision"},
            "positive fixture",
        )
    print("PASS self-test: positive fixture and all named negative fixtures")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default=".", help="repository root")
    modes = parser.add_mutually_exclusive_group()
    modes.add_argument("--bootstrap", action="store_true")
    modes.add_argument("--payload", action="store_true")
    modes.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    try:
        if args.self_test:
            run_self_tests()
            return 0
        mode = "bootstrap" if args.bootstrap else "payload" if args.payload else "normal"
        validate_repository(Path(args.root), mode)
        return 0
    except (ValidationError, AssertionError) as exc:
        print(f"BLOCK: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
