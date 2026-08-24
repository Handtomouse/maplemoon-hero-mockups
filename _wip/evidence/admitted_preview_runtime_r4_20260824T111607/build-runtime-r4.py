#!/usr/bin/env python3
"""Create R4 by removing one exact generated Stockists visibility seam."""

from __future__ import annotations

import hashlib
import shutil
from pathlib import Path


ROOT = Path("/Users/handtomouse/maplemoon-website")
R3 = ROOT / "_wip/deploy/generated/maplemoon-admitted-preview-r3-20260824T110528"
R4 = ROOT / "_wip/deploy/generated/maplemoon-admitted-preview-r4-20260824T111607"
PINS = {
    ROOT / "docs/orchestration/MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md": "bc23e18da7b2e03d1d2eb4d9ab613b23fc226650870d848e9636fc1ddcca9c10",
    ROOT / "docs/orchestration/reviews/MAPLEMOON-ADMITTED-PREVIEW-CONTENT-R3-20260824T110528.json": "012fc4d87ad680b317c098fb571d4b7b4fe23fda6d3696b02cef2705509e712a",
    ROOT / "_wip/evidence/admitted_preview_content_r3_20260824T110528/BROWSER-FAILURE.md": "5a5ebc057f907507e3108bcb90c37f8c999a7cb0c1c59675ce2505c1e792082b",
}
R3_TREE_SHA256 = "6bd47bbecf170f8d3b3c23b221a5c1a8596f30b24cb32da8ee9b72879088acb5"
R3_MOCK_SHA256 = "754ea8b1235a6329bfcbc32aae0f9e5e09c334bf26726bbff8c2c8653f54afe5"
SEAM = '''      document.querySelectorAll(".st-result.is-pending").forEach((element) => {
        element.hidden = true;
      });
'''


def sha256_file(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def tree_sha256(path: Path) -> tuple[str, int]:
    digest = hashlib.sha256()
    count = 0
    for child in sorted(path.rglob("*")):
        if child.is_symlink():
            raise SystemExit(f"TREE_FAIL symlink={child}")
        if not child.is_file():
            continue
        digest.update(child.relative_to(path).as_posix().encode())
        digest.update(b"\0")
        digest.update(sha256_file(child).encode())
        digest.update(b"\n")
        count += 1
    return digest.hexdigest(), count


for path, expected in PINS.items():
    actual = sha256_file(path) if path.is_file() else None
    if actual != expected:
        raise SystemExit(f"PIN_FAIL path={path} expected={expected} actual={actual}")
r3_tree, r3_files = tree_sha256(R3)
if r3_tree != R3_TREE_SHA256 or r3_files != 75:
    raise SystemExit(f"R3_TREE_FAIL sha={r3_tree} files={r3_files}")
if sha256_file(R3 / "mock-cart.js") != R3_MOCK_SHA256:
    raise SystemExit("R3_MOCK_FAIL")
if R4.exists():
    raise SystemExit(f"NON_OVERWRITE_FAIL destination exists: {R4}")
shutil.copytree(R3, R4)

r3_mock = (R3 / "mock-cart.js").read_text(encoding="utf-8")
if r3_mock.count(SEAM) != 1:
    raise SystemExit(f"SEAM_FAIL expected=1 actual={r3_mock.count(SEAM)}")
r4_mock = r3_mock.replace(SEAM, "")
(R4 / "mock-cart.js").write_text(r4_mock, encoding="utf-8")
if r4_mock.count(SEAM) != 0 or r4_mock.replace(
    '    const tidyResults = () => {\n',
    '    const tidyResults = () => {\n' + SEAM,
    1,
) != r3_mock:
    raise SystemExit("NORMALIZED_DIFF_FAIL")

for r3_file in sorted(R3.rglob("*")):
    if not r3_file.is_file() or r3_file.name == "mock-cart.js":
        continue
    relative = r3_file.relative_to(R3)
    if sha256_file(r3_file) != sha256_file(R4 / relative):
        raise SystemExit(f"UNEXPECTED_DIFF_FAIL path={relative}")

r4_tree, r4_files = tree_sha256(R4)
print(
    "RUNTIME_R4 PASS "
    f"files={r4_files} tree_sha256={r4_tree} seam_removed=1 "
    f"mock_pre={R3_MOCK_SHA256} mock_post={sha256_file(R4 / 'mock-cart.js')} "
    "other_files_equal=74/74"
)
