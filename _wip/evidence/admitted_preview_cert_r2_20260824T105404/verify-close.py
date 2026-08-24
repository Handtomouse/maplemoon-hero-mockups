#!/usr/bin/env python3
"""Read-only close-pin and generated-candidate integrity verification."""

from __future__ import annotations

import hashlib
import subprocess
from pathlib import Path


ROOT = Path("/Users/handtomouse/maplemoon-website")
BUILD_ROOT = Path("/Users/handtomouse/maplemoon_build_20260813")
OUTPUT = ROOT / "_wip/deploy/generated/maplemoon-admitted-preview-r2-20260824T105404"
PINS = {
    ROOT / "scripts/build-maplemoon-wip-preview.py": "803c439e0e937309b7ada0c3f886983908c3cc6aed64f92e38c57fd656707808",
    ROOT / "docs/orchestration/reviews/MAPLEMOON-ADMITTED-PREVIEW-CERT-20260824T105053.json": "f1744b36a0d03fd3baf0520acb7b419168e63df1ee2e93bed4cf6077f5da422d",
    ROOT / "_wip/homepage_real_1_lead_photo.WIP.html": "a06d1e19165c84065e96c14eafd1f8e8d7e5a4228d877f0017ca191d1341c174",
    ROOT / "_wip/shop.WIP.html": "f9d150dea283d43eb0a14e02dfeccf9ea1eb4eae87ec82a546ab6984f3fa5604",
    ROOT / "our-story.html": "8dc01af541712a54986270f5bdf51f41ea48fa5be2699fa3610182910668458f",
    ROOT / "_wip/carob-story.WIP.html": "2fafd3867233a01ce6af1f4dd0a1837cc83fb69563d35d29c293e8d1d379d9e0",
    ROOT / "_wip/faq.WIP.html": "449e2c4b129d0c63fc55d77ba2abe7c71c34da9b7c6f6f63fbb21cc899efe7e8",
    ROOT / "_wip/stockists.WIP.html": "b7cb9f1963e53b70b279b0198aabddb528fddad74ad9763c9494c93e70346905",
    ROOT / "assets/our_story/founders_frame701_pair_2400.webp": "ec53b0faa3cec0e12e578395968e0605eeac5a64b191030d5c8661ed33ea608d",
    ROOT / "assets/our_story/founder_carli_701_v2_2400.webp": "48b7032778a8a492129290bed69054004decc3f93ffc2a8b9b71bd997b7e1f0b",
    ROOT / "assets/our_story/founder_dylan_701_v2_2400.webp": "34f7022d44a084d72ef6e05e4f3acf7cd64e26a8a08e3d1b555136dad267f942",
    BUILD_ROOT / "assets/product_shots/powder_roasted.webp": "40efa1836bffcf69b44084291b1996f8dc7a70d6f4bcef22e658904fa8a26eaf",
}


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


failures = []
for path, expected in PINS.items():
    actual = sha256(path) if path.is_file() else None
    if actual != expected:
        failures.append(f"pin {path}: expected={expected} actual={actual}")

powder = OUTPUT / "assets/product_shots/powder_roasted.webp"
if sha256(powder) != PINS[BUILD_ROOT / "assets/product_shots/powder_roasted.webp"]:
    failures.append("generated powder asset does not match admitted source")

shop = (OUTPUT / "shop.html").read_text(encoding="utf-8")
if "/out/" in shop:
    failures.append("generated Shop contains /out/")
if shop.count("img:'powder_roasted'") != 1:
    failures.append("generated Shop powder fallback count is not one")

private_hits = []
for path in OUTPUT.rglob("*"):
    if not path.is_file():
        continue
    if any(part in {"_wip", "docs", ".git", ".vercel"} for part in path.relative_to(OUTPUT).parts):
        private_hits.append(str(path.relative_to(OUTPUT)))
    if path.suffix.lower() in {".html", ".css", ".js", ".json"}:
        text = path.read_text(encoding="utf-8", errors="replace")
        if any(needle in text for needle in ("/out/", "/_wip/", ".WIP.html")):
            private_hits.append(str(path.relative_to(OUTPUT)))
if private_hits:
    failures.append(f"private hits={private_hits}")

out_status = subprocess.check_output(
    ["git", "status", "--short", "--untracked-files=normal", "--", "out"],
    cwd=ROOT,
    text=True,
).splitlines()
if len(out_status) != 20 or any(not line.startswith("?? out/") for line in out_status):
    failures.append(f"preserved untracked out entries expected=20 actual={len(out_status)}")

if failures:
    for failure in failures:
        print(f"FAIL {failure}")
    raise SystemExit(1)
print(
    "R2_CLOSE PASS pins=12/12 powder=40efa1836bff private_paths=0 "
    f"generated_files={sum(1 for path in OUTPUT.rglob('*') if path.is_file())} "
    "preserved_out_entries=20/20"
)
