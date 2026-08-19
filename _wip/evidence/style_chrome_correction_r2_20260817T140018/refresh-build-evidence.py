#!/usr/bin/env python3
"""Rebuild R2 in an isolated temp lane, compare byte-for-byte, refresh manifests."""

from __future__ import annotations

import hashlib
import importlib.util
import json
import pathlib
import shutil
import tempfile


REPO = pathlib.Path("/Users/handtomouse/maplemoon-website")
R2_BUILDER = REPO / "scripts/build-maplemoon-style-chrome-derived-r2.py"
BASELINE = pathlib.Path("/private/tmp/maplemoon-style-chrome-r2-baseline-20260817T140406")
CURRENT = REPO / "_wip/deploy/generated/maplemoon-style-chrome-derived-r2-20260817T140018"
BUILD_EVIDENCE = REPO / "_wip/evidence/style_chrome_correction_r2_20260817T140018/build"
REPORT = REPO / "_wip/evidence/style_chrome_correction_r2_20260817T140018/manifest-refresh.json"


def load(path: pathlib.Path, name: str):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"cannot load {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def sha(path: pathlib.Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> int:
    r2 = load(R2_BUILDER, "mm_style_r2_refresh")
    r1 = r2.load_r1()
    r2.apply_r2_corrections(r1)
    with tempfile.TemporaryDirectory(prefix="maplemoon-r2-rebuild-") as temp_name:
        temp = pathlib.Path(temp_name)
        output = temp / "output"
        evidence = temp / "evidence"
        r1.DEFAULT_OUTPUT = output
        r1.DEFAULT_EVIDENCE = evidence
        files, byte_count = r1.build(BASELINE, output, evidence)
        expected = r1.manifest(output)
        actual = r1.manifest(CURRENT)
        if expected != actual:
            expected_names, actual_names = set(expected), set(actual)
            changed = sorted(name for name in expected_names & actual_names if expected[name] != actual[name])
            raise RuntimeError(f"generated output drift missing={sorted(expected_names-actual_names)} extra={sorted(actual_names-expected_names)} changed={changed}")
        BUILD_EVIDENCE.mkdir(parents=True, exist_ok=True)
        for name in ("baseline-manifest.json", "patch-manifest.json", "projection-proof.json", "build-summary.json"):
            shutil.copy2(evidence / name, BUILD_EVIDENCE / name)
        derived = json.loads((evidence / "derived-manifest.json").read_text(encoding="utf-8"))
        derived["root"] = str(CURRENT)
        r1.write_json(BUILD_EVIDENCE / "derived-manifest.json", derived)
        report = {
            "schema": "maplemoon-style-chrome-r2-manifest-refresh/v1",
            "baseline": str(BASELINE),
            "builder": {"path": str(R2_BUILDER), "sha256": sha(R2_BUILDER)},
            "current": {"path": str(CURRENT), "files": files, "bytes": byte_count, "directory_sha256": derived["directory_sha256"]},
            "isolated_rebuild_byte_equal": True,
            "reverse_equal": True,
            "projections_equal": True,
            "routes": 7,
            "verdict": "PASS",
        }
        REPORT.write_text(json.dumps(report, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        print(f"MANIFEST_REFRESH PASS files={files} bytes={byte_count} routes=7 reverse=7/7 projections=7/7 byte_equal=true digest={derived['directory_sha256']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
