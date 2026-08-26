#!/usr/bin/env python3
"""Build the checkpointed temporary MapleMoon bundle private preview.

The script derives only from the exact hash-pinned admitted preview and accepted
transparent bundle cut-out. It never writes source pages or canonical assets.
"""

from __future__ import annotations

import hashlib
import json
import shutil
import sys
from pathlib import Path

from PIL import Image


REPO = Path(__file__).resolve().parents[1]
PACKET_ID = "maplemoon_temporary_bundle_site_fit_20260825t170206"
BASE = REPO / "_wip/deploy/generated/maplemoon-admitted-preview-r4-20260824T111607"
OUTPUT = REPO / "_wip/deploy/generated/maplemoon_temporary_bundle_preview_20260825t170206"
SOURCE = REPO / "_wip/evidence/maplemoon_temporary_bundle_derivative_20260825t153228/derived/temporary_bundle_cutout_full.png"
ASSET_RELATIVE = Path("assets/product_shots/temporary_eclipse_bite_bundle_web.webp")
STATUS_RELATIVE = Path("temporary_bundle_status.json")
MANIFEST_RELATIVE = Path("temporary_bundle_build_manifest.json")

BASE_TREE_SHA256 = "5a649086667c7ed017e45b2cb97fdf6d356d1b4ad636a2d51b09b2b7321efe49"
SOURCE_SHA256 = "cbdbf30d95a5bd8a281ba0e49726881d16702ff046b73f3bbd6482a17396bb28"

SHOP_OLD = "      {n:'Eclipse Bite Bundle',img:'eclipse_bundle',d:'Can\\'t decide? Try the range. All 5 bites to satisfy your cravings and curiosity.',price:'$24.99',size:'5 x 50g'}"
SHOP_NEW = "      {n:'Eclipse Bite Bundle',img:'eclipse_bundle',imagePath:'/assets/product_shots/temporary_eclipse_bite_bundle_web.webp',flavour:'all_only',kind:'bundle',temporary:true,alt:'Temporary five-piece Eclipse Bite Bundle assortment',d:'Can\\'t decide? Try the range. All 5 bites to satisfy your cravings and curiosity.',price:'$24.99',size:'5 x 50g'}"
SHOP_FLAVOUR_OLD = "  function flavourOf(p){\n    var hay=(p.n+' '+p.d).toLowerCase();"
SHOP_FLAVOUR_NEW = "  function flavourOf(p){\n    if(p.flavour)return p.flavour;\n    var hay=(p.n+' '+p.d).toLowerCase();"
SHOP_LOADING_OLD = "      var imageAttrs=cat==='bites'?' loading=\"eager\" decoding=\"sync\"':' loading=\"lazy\" decoding=\"async\"';"
SHOP_LOADING_NEW = "      var imageAttrs=cat==='bites'&&index<3?' loading=\"eager\" decoding=\"sync\"':' loading=\"lazy\" decoding=\"async\"';"
SHOP_CLASS_OLD = "      var el=document.createElement('article');el.className='pcard';el.setAttribute('aria-labelledby',cardId);"
SHOP_CLASS_NEW = "      var el=document.createElement('article');el.className='pcard'+(p.kind==='bundle'?' is_bundle':'');el.setAttribute('aria-labelledby',cardId);if(p.temporary)el.dataset.assetStatus='temporary_replace_before_final';"
SHOP_ALT_OLD = "      el.innerHTML='<div class=\"ph\"><img src=\"'+imageSrc+'\" alt=\"'+cleanName+'\"'+imageAttrs+'></div>'+"
SHOP_ALT_NEW = "      el.innerHTML='<div class=\"ph\"><img src=\"'+imageSrc+'\" alt=\"'+(p.alt||cleanName)+'\"'+imageAttrs+'></div>'+"

HOME_OLD = "      {n:'Eclipse Bite Bundle',img:'eclipse_bundle',d:'Can\\'t decide? Try the range. All 5 bites to satisfy your cravings and curiosity.',price:null,size:''}"
HOME_NEW = "      {n:'Eclipse Bite Bundle',img:'eclipse_bundle',imagePath:'/assets/product_shots/temporary_eclipse_bite_bundle_web.webp',kind:'bundle',temporary:true,alt:'Temporary five-piece Eclipse Bite Bundle assortment',d:'Can\\'t decide? Try the range. All 5 bites to satisfy your cravings and curiosity.',price:null,size:''}"
HOME_CLASS_OLD = "      el.type='button';el.className='cf-item';el.setAttribute('aria-label',item.n);"
HOME_CLASS_NEW = "      el.type='button';el.className='cf-item'+(item.kind==='bundle'?' is_bundle':'');el.setAttribute('aria-label',item.n);if(item.temporary)el.dataset.assetStatus='temporary_replace_before_final';"
HOME_IMAGE_OLD = "      var img=document.createElement('img');img.src=PS+item.img+'.webp';img.alt=item.n;img.loading=i<5?'eager':'lazy';img.draggable=false;"
HOME_IMAGE_NEW = "      var img=document.createElement('img');img.src=item.imagePath||PS+item.img+'.webp';img.alt=item.alt||item.n;img.loading=i<5?'eager':'lazy';img.draggable=false;"

SHOP_STYLE = """
<style id="temporary_bundle_site_fit">
.pcard.is_bundle .ph{padding:16px;}
.pcard.is_bundle .ph img{width:96%;height:auto;max-width:96%;max-height:72%;object-fit:contain;}
.shop-list-view .pcard.is_bundle .ph{padding:12px;}
.shop-list-view .pcard.is_bundle .ph img{width:96%;height:auto;max-width:96%;max-height:80%;}
</style>
"""

HOME_STYLE = """
<style id="temporary_bundle_site_fit">
.wf-cf[data-cat="eclipseBites"] .cf-item.is_bundle .cf-bp{
  transform:translateY(-46px) scale(1.06);
  transform-origin:50% 100%;
}
@media(max-width:900px){
  .wf-cf[data-cat="eclipseBites"] .cf-item.is_bundle .cf-bp{
    transform:translateY(-32px) scale(1.06);
  }
}
</style>
"""


class BuildError(RuntimeError):
    """Fail-closed build error."""


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


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise BuildError(f"{label} seam count expected=1 actual={count}")
    return text.replace(old, new)


def append_style(text: str, style: str, label: str) -> str:
    if text.count("</body>") != 1:
        raise BuildError(f"{label} closing body seam is not unique")
    if "id=\"temporary_bundle_site_fit\"" in text:
        raise BuildError(f"{label} already contains the temporary style block")
    return text.replace("</body>", f"{style}</body>")


def build_asset(destination: Path) -> dict[str, object]:
    if sha256_file(SOURCE) != SOURCE_SHA256:
        raise BuildError("accepted full cut-out hash mismatch")
    with Image.open(SOURCE) as opened:
        image = opened.convert("RGBA")
    bbox = image.getchannel("A").getbbox()
    if bbox != (147, 190, 1359, 894):
        raise BuildError(f"unexpected accepted alpha bounds: {bbox}")
    pad = 60
    crop_box = (
        max(0, bbox[0] - pad),
        max(0, bbox[1] - pad),
        min(image.width, bbox[2] + pad),
        min(image.height, bbox[3] + pad),
    )
    cropped = image.crop(crop_box)
    target_width = 1080
    target_height = round(cropped.height * target_width / cropped.width)
    resized = cropped.resize((target_width, target_height), Image.Resampling.LANCZOS)
    destination.parent.mkdir(parents=True, exist_ok=True)
    resized.save(
        destination,
        format="WEBP",
        lossless=False,
        quality=86,
        alpha_quality=100,
        method=6,
        exact=True,
    )
    with Image.open(destination) as check:
        check_rgba = check.convert("RGBA")
        output_bbox = check_rgba.getchannel("A").getbbox()
        dimensions = check_rgba.size
    return {
        "source_alpha_bbox": list(bbox),
        "crop_box": list(crop_box),
        "output_dimensions": list(dimensions),
        "output_alpha_bbox": list(output_bbox) if output_bbox else None,
        "output_sha256": sha256_file(destination),
        "output_bytes": destination.stat().st_size,
    }


def patch_shop(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    text = replace_once(text, SHOP_OLD, SHOP_NEW, "Shop bundle binding")
    text = replace_once(text, SHOP_FLAVOUR_OLD, SHOP_FLAVOUR_NEW, "Shop flavour override")
    text = replace_once(text, SHOP_LOADING_OLD, SHOP_LOADING_NEW, "Shop loading policy")
    text = replace_once(text, SHOP_CLASS_OLD, SHOP_CLASS_NEW, "Shop bundle class")
    text = replace_once(text, SHOP_ALT_OLD, SHOP_ALT_NEW, "Shop bundle alt")
    text = append_style(text, SHOP_STYLE, "Shop")
    path.write_text(text, encoding="utf-8")


def patch_home(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    text = replace_once(text, HOME_OLD, HOME_NEW, "Home bundle binding")
    text = replace_once(text, HOME_CLASS_OLD, HOME_CLASS_NEW, "Home bundle class")
    text = replace_once(text, HOME_IMAGE_OLD, HOME_IMAGE_NEW, "Home image path")
    text = append_style(text, HOME_STYLE, "Home")
    path.write_text(text, encoding="utf-8")


def build() -> tuple[str, int, int, dict[str, object]]:
    if not BASE.is_dir():
        raise BuildError(f"pinned base missing: {BASE}")
    base_sha256, base_files, base_bytes = tree_snapshot(BASE)
    if (base_sha256, base_files, base_bytes) != (BASE_TREE_SHA256, 75, 14863579):
        raise BuildError(
            "pinned base changed: "
            f"sha256={base_sha256} files={base_files} bytes={base_bytes}"
        )
    if OUTPUT.exists():
        if OUTPUT.is_symlink():
            raise BuildError(f"refusing symlink output: {OUTPUT}")
        shutil.rmtree(OUTPUT)
    shutil.copytree(BASE, OUTPUT, symlinks=False)

    patch_home(OUTPUT / "homepage.html")
    patch_shop(OUTPUT / "shop.html")
    stale_asset = OUTPUT / "assets/product_shots/eclipse_bundle.webp"
    if not stale_asset.is_file():
        raise BuildError("expected stale bundle asset was not present in the pinned base")
    stale_asset.unlink()
    asset = build_asset(OUTPUT / ASSET_RELATIVE)

    status = {
        "schema": "maplemoon-temporary-asset-status/v1",
        "packet_id": PACKET_ID,
        "status": "temporary_staging_replace_before_final",
        "launch_admitted": False,
        "source_sha256": SOURCE_SHA256,
        "asset_path": f"/{ASSET_RELATIVE.as_posix()}",
        "asset_sha256": asset["output_sha256"],
        "release_guard": "python3 -B scripts/check_maplemoon_temporary_bundle_preview_20260825.py --mode release",
    }
    (OUTPUT / STATUS_RELATIVE).write_text(
        json.dumps(status, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )

    payload_sha256, payload_files, payload_bytes = tree_snapshot(
        OUTPUT, {MANIFEST_RELATIVE.as_posix()}
    )
    manifest = {
        "schema": "maplemoon-temporary-bundle-build/v1",
        "packet_id": PACKET_ID,
        "status": "temporary_staging_replace_before_final",
        "base": {
            "path": str(BASE.relative_to(REPO)),
            "tree_sha256": BASE_TREE_SHA256,
            "files": 75,
            "bytes": 14863579,
        },
        "source": {
            "path": str(SOURCE.relative_to(REPO)),
            "sha256": SOURCE_SHA256,
        },
        "asset": {"path": ASSET_RELATIVE.as_posix(), **asset},
        "payload_tree_sha256": payload_sha256,
        "payload_files": payload_files,
        "payload_bytes": payload_bytes,
        "forbidden_actions": [
            "launch_admission",
            "deployment",
            "production_promotion",
            "shopify_mutation",
            "client_delivery",
        ],
    }
    (OUTPUT / MANIFEST_RELATIVE).write_text(
        json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )
    final_sha256, final_files, final_bytes = tree_snapshot(OUTPUT)
    return final_sha256, final_files, final_bytes, asset


def main() -> int:
    try:
        output_sha256, files, byte_count, asset = build()
    except (BuildError, OSError, ValueError) as error:
        print(f"BUILD FAIL: {error}", file=sys.stderr)
        return 1
    print(
        "BUILD PASS "
        f"output={OUTPUT} tree_sha256={output_sha256} files={files} bytes={byte_count} "
        f"asset={asset['output_dimensions'][0]}x{asset['output_dimensions'][1]} "
        f"asset_bytes={asset['output_bytes']} asset_sha256={asset['output_sha256']} "
        "status=temporary_replace_before_final"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
