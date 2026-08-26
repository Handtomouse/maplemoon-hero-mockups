#!/usr/bin/env python3
"""Verify the private bundle preview or block it from release."""

from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path

from PIL import Image


REPO = Path(__file__).resolve().parents[1]
OUTPUT = REPO / "_wip/deploy/generated/maplemoon_temporary_bundle_preview_20260825t170206"
BASE = REPO / "_wip/deploy/generated/maplemoon-admitted-preview-r4-20260824T111607"
SOURCE = REPO / "_wip/evidence/maplemoon_temporary_bundle_derivative_20260825t153228/derived/temporary_bundle_cutout_full.png"
ASSET = OUTPUT / "assets/product_shots/temporary_eclipse_bite_bundle_web.webp"
MANIFEST = OUTPUT / "temporary_bundle_build_manifest.json"
STATUS = OUTPUT / "temporary_bundle_status.json"
BASE_TREE_SHA256 = "5a649086667c7ed017e45b2cb97fdf6d356d1b4ad636a2d51b09b2b7321efe49"
SOURCE_SHA256 = "cbdbf30d95a5bd8a281ba0e49726881d16702ff046b73f3bbd6482a17396bb28"
TEMPORARY_MARKERS = (
    "temporary_eclipse_bite_bundle_web.webp",
    "temporary_replace_before_final",
    "temporary_staging_replace_before_final",
)


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def tree_snapshot(root: Path, excluded: set[str] | None = None) -> tuple[str, int, int]:
    excluded = excluded or set()
    digest = hashlib.sha256()
    count = 0
    byte_count = 0
    for child in sorted(path for path in root.rglob("*") if path.is_file()):
        relative = child.relative_to(root).as_posix()
        if relative in excluded:
            continue
        digest.update(relative.encode("utf-8"))
        digest.update(b"\0")
        digest.update(sha256_file(child).encode("ascii"))
        digest.update(b"\n")
        count += 1
        byte_count += child.stat().st_size
    return digest.hexdigest(), count, byte_count


def verify() -> list[str]:
    failures: list[str] = []
    for path in (OUTPUT, BASE, SOURCE, ASSET, MANIFEST, STATUS):
        if not path.exists():
            failures.append(f"missing: {path}")
    if failures:
        return failures

    base_sha256, base_files, base_bytes = tree_snapshot(BASE)
    if (base_sha256, base_files, base_bytes) != (BASE_TREE_SHA256, 75, 14863579):
        failures.append("pinned base tree changed")
    if sha256_file(SOURCE) != SOURCE_SHA256:
        failures.append("accepted source hash changed")

    try:
        manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
        status = json.loads(STATUS.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        return [f"invalid JSON: {error}"]
    if manifest.get("status") != "temporary_staging_replace_before_final":
        failures.append("manifest temporary status missing")
    if status.get("status") != "temporary_staging_replace_before_final":
        failures.append("status temporary marker missing")
    if status.get("launch_admitted") is not False:
        failures.append("status does not explicitly deny launch admission")
    if status.get("source_sha256") != SOURCE_SHA256:
        failures.append("status source hash mismatch")
    if status.get("asset_sha256") != sha256_file(ASSET):
        failures.append("status asset hash mismatch")

    payload_sha256, payload_files, payload_bytes = tree_snapshot(
        OUTPUT, {"temporary_bundle_build_manifest.json"}
    )
    if payload_sha256 != manifest.get("payload_tree_sha256"):
        failures.append("payload tree hash mismatch")
    if payload_files != manifest.get("payload_files"):
        failures.append("payload file count mismatch")
    if payload_bytes != manifest.get("payload_bytes"):
        failures.append("payload byte count mismatch")

    with Image.open(ASSET) as opened:
        image = opened.convert("RGBA")
    if image.size != (1080, 668):
        failures.append(f"asset dimensions expected=1080x668 actual={image.size}")
    bbox = image.getchannel("A").getbbox()
    if not bbox or bbox[0] > 60 or bbox[1] > 60 or bbox[2] < 1020 or bbox[3] < 608:
        failures.append(f"asset alpha footprint is unexpectedly small: {bbox}")
    if ASSET.stat().st_size > 220_000:
        failures.append(f"asset exceeds 220000-byte budget: {ASSET.stat().st_size}")

    home = (OUTPUT / "homepage.html").read_text(encoding="utf-8")
    shop = (OUTPUT / "shop.html").read_text(encoding="utf-8")
    for label, text in (("Home", home), ("Shop", shop)):
        if text.count("/assets/product_shots/temporary_eclipse_bite_bundle_web.webp") != 1:
            failures.append(f"{label} temporary asset binding count is not one")
        if text.count("el.dataset.assetStatus='temporary_replace_before_final'") != 1:
            failures.append(f"{label} temporary DOM status seam count is not one")
        if text.count('id="temporary_bundle_site_fit"') != 1:
            failures.append(f"{label} temporary style block count is not one")
    if "flavour:'all_only'" not in shop or "if(p.flavour)return p.flavour;" not in shop:
        failures.append("Shop all-only flavour override missing")
    if "cat==='bites'&&index<3" not in shop:
        failures.append("Shop below-fold Bite lazy-loading rule missing")
    if (OUTPUT / "assets/product_shots/eclipse_bundle.webp").exists():
        failures.append("obsolete labelled bundle asset remains in output")
    return failures


def release_guard() -> int:
    found: list[str] = []
    for child in sorted(path for path in OUTPUT.rglob("*") if path.is_file()):
        if child.suffix.lower() not in {".html", ".json", ".js", ".css"}:
            continue
        text = child.read_text(encoding="utf-8", errors="replace")
        matches = [marker for marker in TEMPORARY_MARKERS if marker in text]
        if matches:
            found.append(f"{child.relative_to(OUTPUT)}:{','.join(matches)}")
    if ASSET.is_file():
        found.append(f"{ASSET.relative_to(OUTPUT)}:temporary_asset_present")
    if found:
        print(
            "HOLD TEMPORARY_BUNDLE_REPLACE_BEFORE_FINAL "
            f"matches={len(found)} output={OUTPUT}"
        )
        for item in found:
            print(f"TEMPORARY {item}")
        return 2
    print("RELEASE GUARD PASS temporary bundle markers absent")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--mode", choices=("verify", "release"), default="verify")
    args = parser.parse_args()
    if args.mode == "release":
        return release_guard()
    failures = verify()
    if failures:
        print(f"VERIFY FAIL failures={len(failures)}", file=sys.stderr)
        for failure in failures:
            print(f"FAIL {failure}", file=sys.stderr)
        return 1
    tree_sha256, files, byte_count = tree_snapshot(OUTPUT)
    print(
        "VERIFY PASS "
        f"output={OUTPUT} tree_sha256={tree_sha256} files={files} bytes={byte_count} "
        f"asset_sha256={sha256_file(ASSET)} asset_bytes={ASSET.stat().st_size} "
        "status=temporary_replace_before_final"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
