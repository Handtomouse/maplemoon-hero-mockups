#!/usr/bin/env python3
"""Build the non-overwriting admitted R2 candidate and correct one exact media seam."""

from __future__ import annotations

import hashlib
import importlib.util
import shutil
from pathlib import Path


ROOT = Path("/Users/handtomouse/maplemoon-website")
BUILD_ROOT = Path("/Users/handtomouse/maplemoon_build_20260813")
OUTPUT = ROOT / "_wip/deploy/generated/maplemoon-admitted-preview-r2-20260824T105404"
BUILDER = ROOT / "scripts/build-maplemoon-wip-preview.py"
R1_RECEIPT = ROOT / "docs/orchestration/reviews/MAPLEMOON-ADMITTED-PREVIEW-CERT-20260824T105053.json"
APPROVED_POWDER = BUILD_ROOT / "assets/product_shots/powder_roasted.webp"
POWDER_SHA256 = "40efa1836bffcf69b44084291b1996f8dc7a70d6f4bcef22e658904fa8a26eaf"
POWDER_SEAM = "imagePath:'/out/image_candidates_20260823/powder_roasted_no_bg.png',"

PINS = {
    BUILDER: "803c439e0e937309b7ada0c3f886983908c3cc6aed64f92e38c57fd656707808",
    R1_RECEIPT: "f1744b36a0d03fd3baf0520acb7b419168e63df1ee2e93bed4cf6077f5da422d",
    ROOT / "_wip/homepage_real_1_lead_photo.WIP.html": "a06d1e19165c84065e96c14eafd1f8e8d7e5a4228d877f0017ca191d1341c174",
    ROOT / "_wip/shop.WIP.html": "f9d150dea283d43eb0a14e02dfeccf9ea1eb4eae87ec82a546ab6984f3fa5604",
    ROOT / "our-story.html": "8dc01af541712a54986270f5bdf51f41ea48fa5be2699fa3610182910668458f",
    ROOT / "_wip/carob-story.WIP.html": "2fafd3867233a01ce6af1f4dd0a1837cc83fb69563d35d29c293e8d1d379d9e0",
    ROOT / "_wip/faq.WIP.html": "449e2c4b129d0c63fc55d77ba2abe7c71c34da9b7c6f6f63fbb21cc899efe7e8",
    ROOT / "_wip/stockists.WIP.html": "b7cb9f1963e53b70b279b0198aabddb528fddad74ad9763c9494c93e70346905",
    ROOT / "assets/our_story/founders_frame701_pair_2400.webp": "ec53b0faa3cec0e12e578395968e0605eeac5a64b191030d5c8661ed33ea608d",
    ROOT / "assets/our_story/founder_carli_701_v2_2400.webp": "48b7032778a8a492129290bed69054004decc3f93ffc2a8b9b71bd997b7e1f0b",
    ROOT / "assets/our_story/founder_dylan_701_v2_2400.webp": "34f7022d44a084d72ef6e05e4f3acf7cd64e26a8a08e3d1b555136dad267f942",
    APPROVED_POWDER: POWDER_SHA256,
}


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def pin_inputs() -> None:
    for path, expected in PINS.items():
        if not path.is_file():
            raise SystemExit(f"PIN_FAIL missing={path}")
        actual = sha256(path)
        if actual != expected:
            raise SystemExit(
                f"PIN_FAIL path={path} expected={expected} actual={actual}"
            )


def scan_private_paths() -> None:
    forbidden_names = {"_wip", "docs", ".git", ".vercel"}
    bad_files = []
    bad_text = []
    for path in OUTPUT.rglob("*"):
        if any(part in forbidden_names for part in path.relative_to(OUTPUT).parts):
            bad_files.append(str(path.relative_to(OUTPUT)))
        if path.is_file() and path.suffix.lower() in {".html", ".css", ".js", ".json"}:
            text = path.read_text(encoding="utf-8", errors="replace")
            for needle in ("/out/", "/_wip/", ".WIP.html"):
                if needle in text:
                    bad_text.append(f"{path.relative_to(OUTPUT)}:{needle}")
    if bad_files or bad_text:
        raise SystemExit(f"PRIVATE_PATH_FAIL files={bad_files} text={bad_text}")


pin_inputs()

spec = importlib.util.spec_from_file_location("maplemoon_wip_builder", BUILDER)
builder = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(builder)
builder.PAGE_SOURCES["our-story.html"] = ROOT / "our-story.html"
files, byte_count = builder.build(OUTPUT)

shop_path = OUTPUT / "shop.html"
before = shop_path.read_text(encoding="utf-8")
seam_count = before.count(POWDER_SEAM)
if seam_count != 1:
    raise SystemExit(f"POWDER_SEAM_FAIL expected=1 actual={seam_count}")
if before.count("img:'powder_roasted'") != 1:
    raise SystemExit("POWDER_FALLBACK_FAIL img:'powder_roasted' count must equal 1")
after = before.replace(POWDER_SEAM, "")
if after.count(POWDER_SEAM) != 0:
    raise SystemExit("POWDER_SEAM_FAIL seam remains after replacement")
shop_path.write_text(after, encoding="utf-8")

powder_destination = OUTPUT / "assets/product_shots/powder_roasted.webp"
shutil.copy2(APPROVED_POWDER, powder_destination)
if sha256(powder_destination) != POWDER_SHA256:
    raise SystemExit("POWDER_ASSET_FAIL generated output hash mismatch")

scan_private_paths()
pin_inputs()

final_files = sum(1 for path in OUTPUT.rglob("*") if path.is_file())
final_bytes = sum(path.stat().st_size for path in OUTPUT.rglob("*") if path.is_file())
print(
    "R2_BUILD PASS "
    f"output={OUTPUT} canonical_files={files} canonical_bytes={byte_count} "
    f"files={final_files} bytes={final_bytes} pages=7 private_paths=0 "
    f"powder_seam_removed={seam_count} powder_sha256={POWDER_SHA256} "
    "our_story_source=root_certified_frame701 close_pins=12/12"
)
