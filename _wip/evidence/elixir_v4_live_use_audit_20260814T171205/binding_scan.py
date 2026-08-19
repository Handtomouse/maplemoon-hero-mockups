#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOTS = [Path("/Users/handtomouse/maplemoon-website"), Path("/Users/handtomouse/maplemoon_build_20260813")]
TARGETS = {
    "elixir_pure_same_size_clean_edges_v4.png": {"size": 3008708, "sha256": "70f93f414902ae1b10e7ae1416954348aa20bd1d6950e37d05979b4e4aa9eb93"},
    "elixir_spiced_same_size_clean_edges_v4.png": {"size": 941894, "sha256": "414f727e84ca0dc24749b10b1092f4618e9f9fc9b954304442a7a0a8779749bb"},
}
CONTROL_PATH = HERE / "scan_control_fixture.txt"
CONTROL_NAME = CONTROL_PATH.name
CONTROL_TOKEN = b"maplemoon_elixir_v4_scan_positive_control_171205"


def digest(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def main() -> None:
    expected_control_sha = hashlib.sha256(CONTROL_TOKEN + b"\n").hexdigest()
    control = {
        "path_found": CONTROL_PATH.is_file(),
        "name_found": CONTROL_PATH.name == CONTROL_NAME,
        "token_found": CONTROL_TOKEN in CONTROL_PATH.read_bytes(),
        "hash_found": digest(CONTROL_PATH) == expected_control_sha,
        "expected_sha256": expected_control_sha,
        "actual_sha256": digest(CONTROL_PATH),
    }
    control["pass"] = all(control[key] for key in ("path_found", "name_found", "token_found", "hash_found"))

    totals = {}
    filename_occurrences = []
    textual_occurrences = []
    equivalent_bytes = []
    errors = []
    names = tuple(TARGETS)
    needles = [name.encode() for name in names] + [value["sha256"].encode() for value in TARGETS.values()]
    target_sizes = {value["size"] for value in TARGETS.values()}

    for root in ROOTS:
        file_count = 0
        byte_count = 0
        for directory, dirs, files in os.walk(root, followlinks=False):
            dirs[:] = [d for d in dirs if d != ".git"]
            for filename in files:
                path = Path(directory) / filename
                if path.is_symlink():
                    continue
                try:
                    size = path.stat().st_size
                    file_count += 1
                    byte_count += size
                    if filename in TARGETS:
                        filename_occurrences.append(str(path))
                    if size in target_sizes:
                        actual = digest(path)
                        for target, meta in TARGETS.items():
                            if actual == meta["sha256"]:
                                equivalent_bytes.append({"target": target, "path": str(path), "sha256": actual})
                    if size <= 8 * 1024 * 1024:
                        raw = path.read_bytes()
                        hits = [needle.decode() for needle in needles if needle in raw]
                        if hits:
                            textual_occurrences.append({"path": str(path), "hits": hits})
                except (OSError, PermissionError) as exc:
                    errors.append({"path": str(path), "error": str(exc)})
        totals[str(root)] = {"files": file_count, "bytes": byte_count}

    runtime_refs = []
    for match in textual_occurrences:
        path = match["path"]
        website_record = path.startswith("/Users/handtomouse/maplemoon-website/docs/") or path.startswith("/Users/handtomouse/maplemoon-website/_wip/")
        if not website_record:
            runtime_refs.append(match)

    pass_state = control["pass"] and not filename_occurrences and not equivalent_bytes and not runtime_refs and not errors
    result = {
        "status": "PASS" if pass_state else "FAIL",
        "scope": [str(root) for root in ROOTS],
        "coverage": totals,
        "positive_control": control,
        "exact_filename_occurrences": filename_occurrences,
        "exact_hash_equivalent_byte_occurrences": equivalent_bytes,
        "all_textual_occurrences": textual_occurrences,
        "runtime_textual_occurrences": runtime_refs,
        "classification": "docs/ and _wip/ references are control/evidence records, not runtime bindings; all other textual references are treated as runtime and fail closed.",
        "errors": errors,
        "unwired": pass_state,
        "limitations": ["Symlink targets are not followed.", "Text reference search reads regular files up to 8 MiB; exact-byte search hashes every regular file whose byte size matches either pinned v4 asset.", "The audit evidence directory necessarily contains control references and is classified as evidence, not runtime."],
    }
    (HERE / "binding_scan_results.json").write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(f"ELIXIR_V4_BINDING_SCAN {result['status']} control={control['pass']} filenames={len(filename_occurrences)} equivalent_bytes={len(equivalent_bytes)} runtime_refs={len(runtime_refs)} files={sum(v['files'] for v in totals.values())} bytes={sum(v['bytes'] for v in totals.values())} errors={len(errors)} unwired={result['unwired']}")


if __name__ == "__main__":
    main()
