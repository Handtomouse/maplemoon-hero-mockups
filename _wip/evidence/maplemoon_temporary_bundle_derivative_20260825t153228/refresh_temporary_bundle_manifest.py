#!/usr/bin/env python3
"""Refresh the exact source/model/task-file SHA-256 manifest."""

from __future__ import annotations

import hashlib
from pathlib import Path


TASK_ROOT = Path(__file__).resolve().parent
MANIFEST = TASK_ROOT / "temporary_bundle_source_output_hashes.sha256"
SOURCE = Path(
    "/Users/handtomouse/.codex/generated_images/"
    "019ffe53-6243-73a2-9d75-e1a072cd07ce/"
    "exec-82159e46-662a-4e9b-af90-0e2c68af52ac.png"
)
MODEL = Path("/Users/handtomouse/.u2net/birefnet-general.onnx")


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


paths = sorted(
    path for path in TASK_ROOT.rglob("*") if path.is_file() and path != MANIFEST
)
lines = [f"{sha256_file(SOURCE)}  {SOURCE}", f"{sha256_file(MODEL)}  {MODEL}"]
lines.extend(
    f"{sha256_file(path)}  {path.relative_to(TASK_ROOT).as_posix()}" for path in paths
)
MANIFEST.write_text("\n".join(lines) + "\n", encoding="utf-8")
print(f"MANIFEST PASS entries={len(lines)} path={MANIFEST}")
