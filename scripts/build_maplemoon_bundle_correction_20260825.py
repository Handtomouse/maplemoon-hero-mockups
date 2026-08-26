#!/usr/bin/env python3
"""Build the private MapleMoon bundle correction successor deterministically."""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import sys
from pathlib import Path

from PIL import Image


REPO = Path(__file__).resolve().parents[1]
PACKET_ID = "maplemoon_bundle_correction_20260825t181849"
BASE = REPO / "_wip/deploy/generated/maplemoon-admitted-preview-r4-20260824T111607"
DEFAULT_OUTPUT = REPO / "_wip/deploy/generated/maplemoon_bundle_correction_20260825t181849"
SOURCE = REPO / "_wip/evidence/maplemoon_temporary_bundle_derivative_20260825t153228/derived/temporary_bundle_cutout_full.png"
ADMITTED_ASSET = REPO / "_wip/deploy/generated/maplemoon_temporary_bundle_preview_20260825t170206/assets/product_shots/temporary_eclipse_bite_bundle_web.webp"
ASSET_RELATIVE = Path("assets/product_shots/temporary_eclipse_bite_bundle_web.webp")
STATUS_RELATIVE = Path("temporary_bundle_status.json")
MANIFEST_RELATIVE = Path("temporary_bundle_build_manifest.json")

BASE_TREE_SHA256 = "5a649086667c7ed017e45b2cb97fdf6d356d1b4ad636a2d51b09b2b7321efe49"
SOURCE_SHA256 = "cbdbf30d95a5bd8a281ba0e49726881d16702ff046b73f3bbd6482a17396bb28"
ASSET_SHA256 = "8bca090850c29da285ae266d8bf666199ae7cacbeee475160df13bc82c66932f"

SHOP_OLD = "      {n:'Eclipse Bite Bundle',img:'eclipse_bundle',d:'Can\\'t decide? Try the range. All 5 bites to satisfy your cravings and curiosity.',price:'$24.99',size:'5 x 50g'}"
SHOP_NEW = "      {n:'Eclipse Bite Bundle',img:'eclipse_bundle',imagePath:'/assets/product_shots/temporary_eclipse_bite_bundle_web.webp',flavour:'all_only',kind:'bundle',temporary:true,alt:'Five-piece Maple Moon assortment',d:'Can\\'t decide? Try the range. All 5 bites to satisfy your cravings and curiosity.',price:'$24.99',size:'5 x 50g'}"
SHOP_FLAVOUR_OLD = "  function flavourOf(p){\n    var hay=(p.n+' '+p.d).toLowerCase();"
SHOP_FLAVOUR_NEW = "  function flavourOf(p){\n    if(p.flavour)return p.flavour;\n    var hay=(p.n+' '+p.d).toLowerCase();"
SHOP_LOADING_OLD = "      var imageAttrs=cat==='bites'?' loading=\"eager\" decoding=\"sync\"':' loading=\"lazy\" decoding=\"async\"';"
SHOP_LOADING_NEW = "      var imageAttrs=cat==='bites'&&index<3?' loading=\"eager\" decoding=\"sync\"':' loading=\"lazy\" decoding=\"async\"';"
SHOP_CLASS_OLD = "      var el=document.createElement('article');el.className='pcard';el.setAttribute('aria-labelledby',cardId);"
SHOP_CLASS_NEW = "      var el=document.createElement('article');el.className='pcard'+(p.kind==='bundle'?' is_bundle':'');el.setAttribute('aria-labelledby',cardId);if(p.temporary)el.dataset.assetStatus='temporary_replace_before_final';"
SHOP_ALT_OLD = "      el.innerHTML='<div class=\"ph\"><img src=\"'+imageSrc+'\" alt=\"'+cleanName+'\"'+imageAttrs+'></div>'+"
SHOP_ALT_NEW = "      el.innerHTML='<div class=\"ph\"><img src=\"'+imageSrc+'\" alt=\"'+(p.alt||cleanName)+'\"'+imageAttrs+'></div>'+"

HOME_OLD = "      {n:'Eclipse Bite Bundle',img:'eclipse_bundle',d:'Can\\'t decide? Try the range. All 5 bites to satisfy your cravings and curiosity.',price:null,size:''}"
HOME_NEW = "      {n:'Eclipse Bite Bundle',img:'eclipse_bundle',imagePath:'/assets/product_shots/temporary_eclipse_bite_bundle_web.webp',flavour:'all_only',kind:'bundle',temporary:true,alt:'Five-piece Maple Moon assortment',d:'Can\\'t decide? Try the range. All 5 bites to satisfy your cravings and curiosity.',price:null,size:''}"
HOME_CLASS_OLD = "      el.type='button';el.className='cf-item';el.setAttribute('aria-label',item.n);"
HOME_CLASS_NEW = "      el.type='button';el.className='cf-item'+(item.kind==='bundle'?' is_bundle':'');el.setAttribute('aria-label',item.n);if(item.temporary)el.dataset.assetStatus='temporary_replace_before_final';"
HOME_IMAGE_OLD = "      var img=document.createElement('img');img.src=PS+item.img+'.webp';img.alt=item.n;img.loading=i<5?'eager':'lazy';img.draggable=false;"
HOME_IMAGE_NEW = "      var img=document.createElement('img');img.src=item.imagePath||PS+item.img+'.webp';img.alt=item.alt||item.n;img.loading=i<5?'eager':'lazy';img.draggable=false;"
HOME_POINTER_OLD = "  var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(layout,120);});"
HOME_POINTER_NEW = "  var px=0,py=0,pw=false;\n  stage.addEventListener('pointerdown',function(e){px=e.clientX;py=e.clientY;pw=true;});\n  stage.addEventListener('pointerup',function(e){\n    if(!pw)return;pw=false;var dx=e.clientX-px,dy=e.clientY-py;\n    if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy))selectIndex(center+(dx<0?1:-1));\n  });\n  var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(layout,120);});"

SHOP_STYLE = """
<style id="temporary_bundle_site_fit">
.pcard.is_bundle .ph{padding:0;}
.pcard.is_bundle .ph img{
  width:90%;height:auto;max-width:90%;max-height:90%;object-fit:contain;
  filter:none!important;
}
.pcard.is_bundle:hover .ph img,.pcard.is_bundle:focus-within .ph img{transform:scale(1.015);}
.shop-list-view .pcard.is_bundle .ph{padding:0;}
.shop-list-view .pcard.is_bundle .ph img{width:90%;height:auto;max-width:90%;max-height:90%;}
.shop-list-view .sp-sec .grid{grid-template-columns:1fr!important;}
</style>
"""

HOME_STYLE = """
<style id="temporary_bundle_site_fit">
.wf-cf[data-cat="eclipseBites"] .cf-item.is_bundle .cf-bp{
  width:100%;height:auto;aspect-ratio:1;margin-top:124px;
  transform:translateY(-46px) scale(1.20);
  transform-origin:50% 100%;
  overflow:hidden;
  border:1px solid rgba(69,119,152,.14);
  border-radius:3px;
  background:#fbfaf7;
  box-shadow:0 8px 18px rgba(16,25,35,.12);
}
.wf-cf[data-cat="eclipseBites"] .cf-item.is_bundle .cf-bp img{filter:none!important;}
@media(max-width:900px){
  .wf-cf[data-cat="eclipseBites"] .cf-item.is_bundle .cf-bp{
    transform:translateY(-32px) scale(1.20);
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
    if 'id="temporary_bundle_site_fit"' in text:
        raise BuildError(f"{label} already contains the task style block")
    return text.replace("</body>", f"{style}</body>")


def patch_shop(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    text = replace_once(text, SHOP_OLD, SHOP_NEW, "Shop bundle binding")
    text = replace_once(text, SHOP_FLAVOUR_OLD, SHOP_FLAVOUR_NEW, "Shop flavour override")
    text = replace_once(text, SHOP_LOADING_OLD, SHOP_LOADING_NEW, "Shop loading policy")
    text = replace_once(text, SHOP_CLASS_OLD, SHOP_CLASS_NEW, "Shop bundle class")
    text = replace_once(text, SHOP_ALT_OLD, SHOP_ALT_NEW, "Shop bundle alt")
    path.write_text(append_style(text, SHOP_STYLE, "Shop"), encoding="utf-8")


def patch_home(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    text = replace_once(text, HOME_OLD, HOME_NEW, "Home bundle binding")
    text = replace_once(text, HOME_CLASS_OLD, HOME_CLASS_NEW, "Home bundle class")
    text = replace_once(text, HOME_IMAGE_OLD, HOME_IMAGE_NEW, "Home image path")
    text = replace_once(text, HOME_POINTER_OLD, HOME_POINTER_NEW, "Home pointer swipe")
    path.write_text(append_style(text, HOME_STYLE, "Home"), encoding="utf-8")


def verify_admitted_inputs() -> None:
    if not BASE.is_dir():
        raise BuildError(f"pinned base missing: {BASE}")
    base = tree_snapshot(BASE)
    if base != (BASE_TREE_SHA256, 75, 14863579):
        raise BuildError(f"pinned base changed: sha256={base[0]} files={base[1]} bytes={base[2]}")
    if not SOURCE.is_file() or sha256_file(SOURCE) != SOURCE_SHA256:
        raise BuildError("accepted full cut-out hash mismatch")
    if not ADMITTED_ASSET.is_file() or sha256_file(ADMITTED_ASSET) != ASSET_SHA256:
        raise BuildError("admitted temporary web asset hash mismatch")
    with Image.open(ADMITTED_ASSET) as opened:
        if opened.size != (1080, 668):
            raise BuildError(f"admitted asset dimensions changed: {opened.size}")
        if opened.convert("RGBA").getchannel("A").getbbox() != (46, 46, 1034, 622):
            raise BuildError("admitted asset alpha footprint changed")
    if ADMITTED_ASSET.stat().st_size != 90474:
        raise BuildError("admitted asset byte size changed")


def build(output: Path) -> tuple[str, int, int, str, str]:
    verify_admitted_inputs()
    if output.exists():
        raise BuildError(f"non-overwriting output already exists: {output}")
    shutil.copytree(BASE, output, symlinks=False)
    patch_home(output / "homepage.html")
    patch_shop(output / "shop.html")
    stale_asset = output / "assets/product_shots/eclipse_bundle.webp"
    if not stale_asset.is_file():
        raise BuildError("expected stale bundle asset missing from pinned base")
    stale_asset.unlink()
    destination = output / ASSET_RELATIVE
    shutil.copyfile(ADMITTED_ASSET, destination)
    if sha256_file(destination) != ASSET_SHA256:
        raise BuildError("copied temporary asset changed")

    site_tree_sha256, site_files, site_bytes = tree_snapshot(
        output, {STATUS_RELATIVE.as_posix(), MANIFEST_RELATIVE.as_posix()}
    )
    status = {
        "schema": "maplemoon-temporary-asset-status/v2",
        "packet_id": PACKET_ID,
        "status": "temporary_staging_replace_before_final",
        "temporary": True,
        "launch_admitted": False,
        "base_tree_sha256": BASE_TREE_SHA256,
        "source_sha256": SOURCE_SHA256,
        "derivative_path": f"/{ASSET_RELATIVE.as_posix()}",
        "derivative_sha256": ASSET_SHA256,
        "site_tree_sha256": site_tree_sha256,
        "site_files": site_files,
        "site_bytes": site_bytes,
        "release_guard": "python3 -B scripts/check_maplemoon_bundle_correction_20260825.py --mode release",
    }
    (output / STATUS_RELATIVE).write_text(
        json.dumps(status, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )
    payload_sha256, payload_files, payload_bytes = tree_snapshot(
        output, {MANIFEST_RELATIVE.as_posix()}
    )
    manifest = {
        "schema": "maplemoon-temporary-bundle-build/v2",
        "packet_id": PACKET_ID,
        "status": "temporary_staging_replace_before_final",
        "base": {
            "path": str(BASE.relative_to(REPO)),
            "tree_sha256": BASE_TREE_SHA256,
            "files": 75,
            "bytes": 14863579,
        },
        "source": {"path": str(SOURCE.relative_to(REPO)), "sha256": SOURCE_SHA256},
        "asset": {
            "path": ASSET_RELATIVE.as_posix(),
            "sha256": ASSET_SHA256,
            "bytes": 90474,
            "dimensions": [1080, 668],
            "copied_byte_for_byte": True,
        },
        "site_tree_sha256": site_tree_sha256,
        "site_files": site_files,
        "site_bytes": site_bytes,
        "payload_tree_sha256": payload_sha256,
        "payload_files": payload_files,
        "payload_bytes": payload_bytes,
        "launch_admitted": False,
        "forbidden_actions": [
            "deployment",
            "production_promotion",
            "shopify_mutation",
            "client_delivery",
            "candidate_admission",
        ],
    }
    (output / MANIFEST_RELATIVE).write_text(
        json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )
    final_sha256, final_files, final_bytes = tree_snapshot(output)
    return final_sha256, final_files, final_bytes, site_tree_sha256, payload_sha256


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    output = args.output.resolve()
    try:
        final, files, byte_count, site, payload = build(output)
    except (BuildError, OSError, ValueError) as error:
        print(f"BUILD FAIL: {error}", file=sys.stderr)
        return 1
    print(
        "BUILD PASS "
        f"output={output} tree_sha256={final} files={files} bytes={byte_count} "
        f"site_tree_sha256={site} payload_tree_sha256={payload} "
        f"asset_sha256={ASSET_SHA256} status=temporary_replace_before_final"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
