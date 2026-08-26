#!/usr/bin/env python3
from __future__ import annotations

import csv
import hashlib
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree

from PIL import Image


REPO = Path(__file__).resolve().parents[3]
KIT = REPO / "_wip/deliverables/MapleMoon_External_Designer_Icon_Kit_20260825"
ARCHIVE = KIT.with_suffix(".zip")
SVG_DIR = KIT / "03_FINAL_PRODUCTION_PENDING/01_VECTOR_SVG"
PNG_DIR = KIT / "03_FINAL_PRODUCTION_PENDING/02_PNG_TRANSPARENT_2000PX"
REFERENCE = REPO / "_wip/evidence/carli_external_icon_kit_20260825/01_SOURCE_LOCKED/MM_Packaging-Reference_Moons-Pure-Carob_Bilingual_10-AUG-2026_PRINT.pdf"
EXPECTED_REFERENCE_SHA256 = "e86934ac69eb8d55810ed6b1482b5a982bc5408062e3a406e56597d91c3420e3"
FORBIDDEN_ZIP_TOKENS = (
    "99_SUPERSEDED",
    "WORKING",
    "_full",
    "MOON-REVERT",
    "07-AUG-2026",
)


def digest(path: Path) -> str:
    value = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            value.update(block)
    return value.hexdigest()


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> int:
    svgs = sorted(SVG_DIR.glob("*.svg"))
    pngs = sorted(PNG_DIR.glob("*.png"))
    require(len(svgs) == 13, f"expected 13 SVGs, found {len(svgs)}")
    require(len(pngs) == 13, f"expected 13 PNGs, found {len(pngs)}")
    require({p.stem for p in svgs} == {p.stem for p in pngs}, "SVG/PNG names do not pair exactly")
    print("PASS asset pairs: 13 SVG + 13 PNG with matching names")

    svg_hashes = [digest(path) for path in svgs]
    png_hashes = [digest(path) for path in pngs]
    require(len(set(svg_hashes)) == 13, "duplicate SVG content found")
    require(len(set(png_hashes)) == 13, "duplicate PNG content found")
    print("PASS duplicate scan: 0 duplicate SVGs; 0 duplicate PNGs")

    for path in svgs:
        root = ElementTree.parse(path).getroot()
        require(root.tag.endswith("svg"), f"not an SVG root: {path.name}")
        require(not any(node.tag.endswith("image") for node in root.iter()), f"embedded raster found: {path.name}")
    print("PASS vector validation: 13 well-formed SVGs; 0 embedded rasters")

    for path in pngs:
        with Image.open(path) as image:
            require(image.size == (2000, 2000), f"wrong PNG size: {path.name} {image.size}")
            require("A" in image.getbands(), f"PNG has no alpha channel: {path.name}")
            alpha = image.getchannel("A")
            low, high = alpha.getextrema()
            require(low < 255 and high == 255, f"PNG transparency is unexpected: {path.name} {(low, high)}")
    print("PASS PNG validation: all 13 are 2000 x 2000 with transparency")

    with (KIT / "ASSET_INDEX.csv").open(newline="", encoding="utf-8") as handle:
        rows = list(csv.DictReader(handle))
    require(len(rows) == 13, f"expected 13 asset-index rows, found {len(rows)}")
    require(len({row["asset_id"] for row in rows}) == 13, "duplicate asset ID found in index")
    print("PASS asset index: 13 unique named records")

    manifest = KIT / "SHA256SUMS.txt"
    listed: dict[Path, str] = {}
    for line in manifest.read_text(encoding="utf-8").splitlines():
        expected, relative = line.split("  ", 1)
        listed[KIT / relative] = expected
    actual_files = {
        path
        for path in KIT.rglob("*")
        if path.is_file()
        and "99_SUPERSEDED_QUARANTINE" not in path.parts
        and path.name != "SHA256SUMS.txt"
    }
    require(set(listed) == actual_files, "checksum manifest coverage does not match deliverable files")
    for path, expected in listed.items():
        require(digest(path) == expected, f"checksum mismatch: {path.relative_to(KIT)}")
    print(f"PASS checksum manifest: {len(listed)} files verified")

    require(digest(REFERENCE) == EXPECTED_REFERENCE_SHA256, "packaging reference is not the approved Pure Carob clean-set file")
    require(not list((KIT / "01_SOURCE_LOCKED").glob("*.pdf")), "packaging PDF found in external asset kit")
    print("PASS packaging authority: internal reference matches CLEAN-SET_10-AUG-2026; external kit contains no packaging PDF")

    expected_archive_files = {
        f"{KIT.name}/{path.relative_to(KIT).as_posix()}"
        for path in KIT.rglob("*")
        if path.is_file() and "99_SUPERSEDED_QUARANTINE" not in path.parts
    }
    with zipfile.ZipFile(ARCHIVE) as archive:
        require(archive.testzip() is None, "ZIP CRC test failed")
        archive_files = {name for name in archive.namelist() if not name.endswith("/")}
    require(archive_files == expected_archive_files, "ZIP contents do not exactly match the approved external set")
    require(not any(token in name for name in archive_files for token in FORBIDDEN_ZIP_TOKENS), "forbidden/superseded item found in ZIP")
    print(f"PASS ZIP: CRC valid; {len(archive_files)} files; 0 superseded or working files")

    print("RESULT: EXTERNAL ICON KIT VERIFIED")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as error:
        print(f"FAIL: {error}", file=sys.stderr)
        raise
