#!/usr/bin/env python3
"""Verify the private bundle successor or block temporary content from release."""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import sys
import tempfile
import urllib.error
import urllib.request
from pathlib import Path

from PIL import Image


REPO = Path(__file__).resolve().parents[1]
OUTPUT = REPO / "_wip/deploy/generated/maplemoon_bundle_correction_20260825t181849"
BASE = REPO / "_wip/deploy/generated/maplemoon-admitted-preview-r4-20260824T111607"
SOURCE = REPO / "_wip/evidence/maplemoon_temporary_bundle_derivative_20260825t153228/derived/temporary_bundle_cutout_full.png"
ASSET_RELATIVE = Path("assets/product_shots/temporary_eclipse_bite_bundle_web.webp")
MANIFEST_RELATIVE = Path("temporary_bundle_build_manifest.json")
STATUS_RELATIVE = Path("temporary_bundle_status.json")

BASE_TREE_SHA256 = "5a649086667c7ed017e45b2cb97fdf6d356d1b4ad636a2d51b09b2b7321efe49"
SOURCE_SHA256 = "cbdbf30d95a5bd8a281ba0e49726881d16702ff046b73f3bbd6482a17396bb28"
ASSET_SHA256 = "8bca090850c29da285ae266d8bf666199ae7cacbeee475160df13bc82c66932f"
SITE_TREE_SHA256 = "a66430d81fc4b72aae06d32bf49b93458e934969d2a3510e2b57279b179c897b"
PAYLOAD_TREE_SHA256 = "6c7229ffef8f4dc4eeca0672c8728f35c37330aab83127907c8abf5d9b747208"
FINAL_TREE_SHA256 = "2710d435d83d8c3810ce7a2a0b7e775926d3482eb6e36372b79b1011404063bd"
FINAL_FILES = 77
FINAL_BYTES = 14795062
TEMPORARY_MARKERS = (
    "temporary_eclipse_bite_bundle_web.webp",
    "temporary_replace_before_final",
    "temporary_staging_replace_before_final",
    "temporary:true",
    '"temporary": true',
    '"launch_admitted": false',
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


def verify(root: Path) -> list[str]:
    failures: list[str] = []
    asset = root / ASSET_RELATIVE
    manifest_path = root / MANIFEST_RELATIVE
    status_path = root / STATUS_RELATIVE
    for path in (root, BASE, SOURCE, asset, manifest_path, status_path, root / "homepage.html", root / "shop.html"):
        if not path.exists():
            failures.append(f"missing: {path}")
    if failures:
        return failures

    if tree_snapshot(BASE) != (BASE_TREE_SHA256, 75, 14863579):
        failures.append("pinned base tree changed")
    if sha256_file(SOURCE) != SOURCE_SHA256:
        failures.append("accepted cut-out source hash changed")
    if sha256_file(asset) != ASSET_SHA256:
        failures.append("admitted temporary asset hash changed")
    final = tree_snapshot(root)
    if final != (FINAL_TREE_SHA256, FINAL_FILES, FINAL_BYTES):
        failures.append(f"final tree mismatch expected={(FINAL_TREE_SHA256, FINAL_FILES, FINAL_BYTES)} actual={final}")

    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        status = json.loads(status_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        return failures + [f"invalid JSON: {error}"]

    site = tree_snapshot(root, {STATUS_RELATIVE.as_posix(), MANIFEST_RELATIVE.as_posix()})
    payload = tree_snapshot(root, {MANIFEST_RELATIVE.as_posix()})
    if site[0] != SITE_TREE_SHA256 or status.get("site_tree_sha256") != SITE_TREE_SHA256:
        failures.append("site tree hash mismatch")
    if payload[0] != PAYLOAD_TREE_SHA256 or manifest.get("payload_tree_sha256") != PAYLOAD_TREE_SHA256:
        failures.append("payload tree hash mismatch")
    if (site[1], site[2]) != (status.get("site_files"), status.get("site_bytes")):
        failures.append("status site tree count or bytes mismatch")
    if (payload[1], payload[2]) != (manifest.get("payload_files"), manifest.get("payload_bytes")):
        failures.append("manifest payload count or bytes mismatch")
    expected_status = {
        "status": "temporary_staging_replace_before_final",
        "temporary": True,
        "launch_admitted": False,
        "base_tree_sha256": BASE_TREE_SHA256,
        "source_sha256": SOURCE_SHA256,
        "derivative_path": f"/{ASSET_RELATIVE.as_posix()}",
        "derivative_sha256": ASSET_SHA256,
        "site_tree_sha256": SITE_TREE_SHA256,
    }
    for key, expected in expected_status.items():
        if status.get(key) != expected:
            failures.append(f"status field mismatch {key} expected={expected!r} actual={status.get(key)!r}")
    if manifest.get("launch_admitted") is not False:
        failures.append("manifest does not explicitly deny launch admission")
    if manifest.get("asset", {}).get("copied_byte_for_byte") is not True:
        failures.append("manifest does not assert byte-for-byte asset custody")

    with Image.open(asset) as opened:
        image = opened.convert("RGBA")
    if image.size != (1080, 668):
        failures.append(f"asset dimensions expected=1080x668 actual={image.size}")
    if image.getchannel("A").getbbox() != (46, 46, 1034, 622):
        failures.append(f"asset alpha footprint changed: {image.getchannel('A').getbbox()}")
    if asset.stat().st_size != 90474:
        failures.append(f"asset bytes expected=90474 actual={asset.stat().st_size}")

    home = (root / "homepage.html").read_text(encoding="utf-8")
    shop = (root / "shop.html").read_text(encoding="utf-8")
    record_needles = ("imagePath:'/assets/product_shots/temporary_eclipse_bite_bundle_web.webp'", "flavour:'all_only'", "kind:'bundle'", "temporary:true")
    for label, text in (("Home", home), ("Shop", shop)):
        for needle in record_needles:
            if text.count(needle) != 1:
                failures.append(f"{label} product record seam count for {needle!r} is {text.count(needle)}")
        if text.count("el.dataset.assetStatus='temporary_replace_before_final'") != 1:
            failures.append(f"{label} DOM status marker missing")
        if text.count('id="temporary_bundle_site_fit"') != 1:
            failures.append(f"{label} task style block count is not one")
        if "TEMPORARY STAGING" in text or "REPLACE BEFORE FINAL" in text:
            failures.append(f"{label} contains a visible temporary warning string")
    if "aspect-ratio:1" not in home or "background:#fbfaf7" not in home or "scale(1.20)" not in home:
        failures.append("Home square product plate or target scale CSS missing")
    if ".cf-bp img{filter:none!important;}" not in home:
        failures.append("Home bundle shadow suppression missing")
    if "stage.addEventListener('pointerdown'" not in home or "stage.addEventListener('pointerup'" not in home:
        failures.append("Home pointer swipe support missing")
    if "width:90%;height:auto;max-width:90%;max-height:90%" not in shop:
        failures.append("Shop 90-percent image-well sizing missing")
    if ".pcard.is_bundle .ph{padding:0;}" not in shop or ".shop-list-view .pcard.is_bundle .ph{padding:0;}" not in shop:
        failures.append("Shop bundle image-well padding reset missing")
    if ".shop-list-view .sp-sec .grid{grid-template-columns:1fr!important;}" not in shop:
        failures.append("Shop list-view grid override missing")
    if "filter:none!important" not in shop:
        failures.append("Shop bundle halo suppression missing")
    if "if(p.flavour)return p.flavour;" not in shop:
        failures.append("Shop explicit flavour override missing")
    if "cat==='bites'&&index<3" not in shop:
        failures.append("Shop below-fold Bite lazy-loading rule missing")
    if (root / "assets/product_shots/eclipse_bundle.webp").exists():
        failures.append("obsolete labelled bundle asset remains")
    return failures


def release_findings(root: Path, base_url: str | None = None) -> list[str]:
    found: list[str] = []
    if root.exists():
        for child in sorted(path for path in root.rglob("*") if path.is_file()):
            relative = child.relative_to(root).as_posix()
            if "temporary" in relative.lower():
                found.append(f"file:{relative}:temporary_filename")
            if child.suffix.lower() not in {".html", ".json", ".js", ".css"}:
                continue
            text = child.read_text(encoding="utf-8", errors="replace")
            matches = sorted({marker for marker in TEMPORARY_MARKERS if marker in text})
            if matches:
                found.append(f"content:{relative}:{','.join(matches)}")
    if base_url:
        for route in ("homepage.html", "shop.html"):
            url = base_url.rstrip("/") + "/" + route
            try:
                request = urllib.request.Request(url, headers={"User-Agent": "MapleMoonReleaseGuard/1.0"})
                with urllib.request.urlopen(request, timeout=15) as response:
                    text = response.read().decode("utf-8", errors="replace")
            except (OSError, urllib.error.URLError) as error:
                found.append(f"fetch:{route}:blind:{error}")
                continue
            matches = sorted({marker for marker in TEMPORARY_MARKERS if marker in text})
            if matches:
                found.append(f"fetch:{route}:{','.join(matches)}")
    return found


def self_test() -> list[str]:
    failures: list[str] = []
    baseline = verify(OUTPUT)
    if baseline:
        return ["baseline verify failed before negative controls"] + baseline
    with tempfile.TemporaryDirectory(prefix="maplemoon_bundle_checker_") as temp:
        temp_root = Path(temp)

        changed = temp_root / "changed_hash"
        shutil.copytree(OUTPUT, changed)
        with (changed / ASSET_RELATIVE).open("ab") as handle:
            handle.write(b"negative-control")
        if not any("asset hash changed" in item for item in verify(changed)):
            failures.append("changed-hash negative control was not caught")

        removed = temp_root / "removed_status"
        shutil.copytree(OUTPUT, removed)
        home_path = removed / "homepage.html"
        home = home_path.read_text(encoding="utf-8")
        home_path.write_text(home.replace("el.dataset.assetStatus='temporary_replace_before_final'", "el.dataset.assetStatus=''", 1), encoding="utf-8")
        if not any("Home DOM status marker missing" in item for item in verify(removed)):
            failures.append("removed-status negative control was not caught")

        renamed = temp_root / "renamed_asset"
        shutil.copytree(OUTPUT, renamed)
        (renamed / ASSET_RELATIVE).rename(renamed / "assets/product_shots/bundle.webp")
        if not any("missing:" in item for item in verify(renamed)):
            failures.append("renamed-asset negative control was not caught")

        release = release_findings(OUTPUT)
        if not release:
            failures.append("attempted-release negative control was not caught")
    return failures


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--mode", choices=("verify", "release", "self-test"), default="verify")
    parser.add_argument("--root", type=Path, default=OUTPUT)
    parser.add_argument("--base-url")
    args = parser.parse_args()
    root = args.root.resolve()
    if args.mode == "release":
        findings = release_findings(root, args.base_url)
        if findings:
            print(f"HOLD TEMPORARY_BUNDLE_REPLACE_BEFORE_FINAL findings={len(findings)} root={root}")
            for finding in findings:
                print(f"TEMPORARY {finding}")
            return 2
        print("RELEASE GUARD PASS temporary bundle filenames, records, and markers absent")
        return 0
    if args.mode == "self-test":
        failures = self_test()
        if failures:
            print(f"SELF TEST FAIL failures={len(failures)}", file=sys.stderr)
            for failure in failures:
                print(f"FAIL {failure}", file=sys.stderr)
            return 1
        print("SELF TEST PASS controls=4 changed_hash removed_status renamed_asset attempted_release")
        return 0
    failures = verify(root)
    if failures:
        print(f"VERIFY FAIL failures={len(failures)}", file=sys.stderr)
        for failure in failures:
            print(f"FAIL {failure}", file=sys.stderr)
        return 1
    tree_sha256, files, byte_count = tree_snapshot(root)
    print(
        "VERIFY PASS "
        f"output={root} tree_sha256={tree_sha256} files={files} bytes={byte_count} "
        f"site_tree_sha256={SITE_TREE_SHA256} payload_tree_sha256={PAYLOAD_TREE_SHA256} "
        f"asset_sha256={ASSET_SHA256} status=temporary_replace_before_final"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
