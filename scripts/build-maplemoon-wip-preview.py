#!/usr/bin/env python3
"""Build a deploy-safe preview from the current MapleMoon seven-route candidate.

The candidate combines six current WIP pages with the separately certified Pure
Carob product page. The output is intentionally a self-contained static
directory. It never copies the repository root, `_wip`, project-local evidence,
or a Vercel project link.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import sys
import tempfile
from pathlib import Path


REPO = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = Path("/private/tmp/maplemoon-wip-preview")

PAGE_SOURCES = {
    "homepage.html": REPO / "_wip/homepage_real_1_lead_photo.WIP.html",
    "shop.html": REPO / "_wip/shop.WIP.html",
    "our-story.html": REPO / "_wip/our-story.WIP.html",
    "carob-story.html": REPO / "_wip/carob-story.WIP.html",
    "faq.html": REPO / "_wip/faq.WIP.html",
    "stockists.html": REPO / "_wip/stockists.WIP.html",
    "contact.html": REPO / "_wip/contact.WIP.html",
}

PINNED_PAGE_SOURCES = {
    "products/pure-carob-bar.html": (
        Path("/Users/handtomouse/maplemoon_build_20260813/pure-carob-bar.html"),
        "015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65",
    ),
}

ROUTE_REPLACEMENTS = {
    "homepage_real_1_lead_photo.WIP.html": "homepage",
    "shop.WIP.html": "shop",
    "our-story.WIP.html": "our-story",
    "carob-story.WIP.html": "carob-story",
    "faq.WIP.html": "faq",
    "stockists.WIP.html": "stockists",
    "contact.WIP.html": "contact",
}

CLEAN_ROUTE_REPLACEMENTS = {
    '"/homepage.html#carob': '"/carob-story',
    "'/homepage.html#carob": "'/carob-story",
    '"/homepage.html': '"/homepage',
    "'/homepage.html": "'/homepage",
    '"/shop.html': '"/shop',
    "'/shop.html": "'/shop",
    '"/our-story.html': '"/our-story',
    "'/our-story.html": "'/our-story",
    '"/carob-story.html': '"/carob-story',
    "'/carob-story.html": "'/carob-story",
    '"/faq.html': '"/faq',
    "'/faq.html": "'/faq",
    '"/stockists.html': '"/stockists',
    "'/stockists.html": "'/stockists",
    '"/contact.html': '"/contact',
    "'/contact.html": "'/contact",
}

HOMEPAGE_PURE_TARGET = "url:'products/pure-carob-bar.html'"
HOMEPAGE_PURE_TARGET_CLEAN = "url:'/products/pure-carob-bar'"
HOMEPAGE_SHOP_NOW_SEAM = """  if(pdpAdd)pdpAdd.addEventListener('click',function(){
    var state=PRICE_STATE[currentCat]||{priced:false};
    if(state.priced){
      window.location.href=shopTarget(currentCat);
      return;
    }
    var item=data[center];"""
HOMEPAGE_SHOP_NOW_WITH_PRODUCT = """  if(pdpAdd)pdpAdd.addEventListener('click',function(){
    var state=PRICE_STATE[currentCat]||{priced:false};
    var item=data[center];
    if(state.priced){
      window.location.href=(item&&item.url)||shopTarget(currentCat);
      return;
    }"""

SUPPORT_FILES = {
    "brand_kit.css": REPO / "brand_kit.css",
    "a11y_inner.css": REPO / "_wip/a11y_inner.css",
    "design_refinement_20260723.css": REPO
    / "_wip/design_refinement_20260723.css",
    "styles/homepage.css": REPO / "_wip/styles/homepage.css",
}

PINNED_SUPPORT_FILES = {
    "mock-cart.js": (
        Path("/Users/handtomouse/maplemoon_build_20260813/mock-cart.js"),
        "aab0c1e4d45ab919559b34aa5ab8b4b15b9b4081e32649db170caaeb19ecf69c",
    ),
    "mock-cart.css": (
        Path("/Users/handtomouse/maplemoon_build_20260813/mock-cart.css"),
        "c17deb1f972017d9790f2191360a457e54d7287730847f9f470c9de371603308",
    ),
}

ASSET_RE = re.compile(
    r"(?<![A-Za-z0-9._-])/assets/[A-Za-z0-9_@+.,/ -]+?\."
    r"(?:avif|css|gif|jpe?g|js|mp4|png|svg|webm|webp)",
    re.IGNORECASE,
)
PRODUCT_IMAGE_RE = re.compile(r"\bimg\s*:\s*['\"]([^'\"]+)['\"]")
PHOTO_FINAL_RE = re.compile(r"\bPF\s*\+\s*['\"]([^'\"]+)['\"]")


class BuildError(RuntimeError):
    """Fail-closed preview build error."""


def allowed_output(path: Path) -> bool:
    resolved = path.resolve()
    temp_roots = {Path(tempfile.gettempdir()).resolve(), Path("/private/tmp").resolve()}
    repo_root = (REPO / "_wip/deploy/generated").resolve()
    return any(root == resolved or root in resolved.parents for root in temp_roots) or (
        resolved == repo_root or repo_root in resolved.parents
    )


def checked_output(path: Path) -> Path:
    resolved = path.resolve()
    if not allowed_output(resolved):
        raise BuildError(
            "output must be under /private/tmp, the system temp directory, or "
            f"{REPO / '_wip/deploy/generated'}"
        )
    if resolved in {Path("/private/tmp"), Path(tempfile.gettempdir()).resolve()}:
        raise BuildError(f"refusing broad output directory: {resolved}")
    if path.is_symlink():
        raise BuildError(f"refusing symlink output: {path}")
    return resolved


def transform_page(text: str) -> str:
    text = text.replace("../assets/", "/assets/")
    text = text.replace("/_wip/styles/homepage.css", "/styles/homepage.css")
    for source_name, route_name in ROUTE_REPLACEMENTS.items():
        text = text.replace(source_name, route_name)
    for source_route, clean_route in CLEAN_ROUTE_REPLACEMENTS.items():
        text = text.replace(source_route, clean_route)
    return text


def referenced_assets(texts: list[str]) -> set[Path]:
    relative_paths: set[Path] = set()
    for text in texts:
        relative_paths.update(Path(match.lstrip("/")) for match in ASSET_RE.findall(text))
        relative_paths.update(
            Path("assets/product_shots") / f"{name}.webp"
            for name in PRODUCT_IMAGE_RE.findall(text)
        )
        relative_paths.update(
            Path("assets/photo_finals") / name for name in PHOTO_FINAL_RE.findall(text)
        )
    return relative_paths


def copy_file(source: Path, destination: Path) -> None:
    if not source.is_file():
        raise BuildError(f"required input is missing: {source}")
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination)


def copy_pinned_file(source: Path, destination: Path, expected_sha256: str) -> None:
    if not source.is_file():
        raise BuildError(f"required pinned input is missing: {source}")
    actual_sha256 = hashlib.sha256(source.read_bytes()).hexdigest()
    if actual_sha256 != expected_sha256:
        raise BuildError(
            f"pinned input changed: {source} expected={expected_sha256} actual={actual_sha256}"
        )
    copy_file(source, destination)


def build(output: Path) -> tuple[int, int]:
    output = checked_output(output)
    staging = output.with_name(f".{output.name}.building")
    if staging.exists():
        if staging.is_symlink():
            raise BuildError(f"refusing symlink staging directory: {staging}")
        shutil.rmtree(staging)
    staging.mkdir(parents=True)

    try:
        transformed: dict[str, str] = {}
        for destination_name, source in PAGE_SOURCES.items():
            if not source.is_file():
                raise BuildError(f"page source is missing: {source}")
            page = transform_page(source.read_text(encoding="utf-8"))
            if destination_name == "homepage.html":
                if page.count(HOMEPAGE_PURE_TARGET) != 1:
                    raise BuildError(
                        "Homepage Pure product target seam was not found exactly once"
                    )
                page = page.replace(
                    HOMEPAGE_PURE_TARGET, HOMEPAGE_PURE_TARGET_CLEAN
                )
                if page.count(HOMEPAGE_SHOP_NOW_SEAM) != 1:
                    raise BuildError(
                        "Homepage Shop Now navigation seam was not found exactly once"
                    )
                page = page.replace(
                    HOMEPAGE_SHOP_NOW_SEAM, HOMEPAGE_SHOP_NOW_WITH_PRODUCT
                )
            if ".WIP.html" in page:
                raise BuildError(f"unrewritten WIP route remains in {source}")
            if re.search(r"(?:href|src)\s*=\s*['\"]/_wip/", page, re.I):
                raise BuildError(f"internal WIP URL remains in {source}")
            transformed[destination_name] = page
            (staging / destination_name).write_text(page, encoding="utf-8")

        for destination_name, (source, expected_sha256) in PINNED_PAGE_SOURCES.items():
            if not source.is_file():
                raise BuildError(f"pinned page source is missing: {source}")
            actual_sha256 = hashlib.sha256(source.read_bytes()).hexdigest()
            if actual_sha256 != expected_sha256:
                raise BuildError(
                    f"pinned page changed: {source} expected={expected_sha256} "
                    f"actual={actual_sha256}"
                )
            page = transform_page(source.read_text(encoding="utf-8"))
            if re.search(r"(?:href|src)\s*=\s*['\"]/_wip/", page, re.I):
                raise BuildError(f"internal WIP URL remains in {source}")
            transformed[destination_name] = page
            destination = staging / destination_name
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_text(page, encoding="utf-8")

        for destination_name, source in SUPPORT_FILES.items():
            copy_file(source, staging / destination_name)

        for destination_name, (source, expected_sha256) in PINNED_SUPPORT_FILES.items():
            copy_pinned_file(source, staging / destination_name, expected_sha256)

        cart_runtime = staging / "mock-cart.js"
        cart_text = cart_runtime.read_text(encoding="utf-8")
        route_leaf = (
            'return new URL(normalizeHref(rawHref), window.location.href).pathname\n'
            '        .split("/")\n'
            '        .pop();'
        )
        route_leaf_normalized = (
            'const leaf = new URL(normalizeHref(rawHref), window.location.href).pathname\n'
            '        .split("/")\n'
            '        .pop();\n'
            '      return leaf && !leaf.endsWith(".html") ? `${leaf}.html` : leaf;'
        )
        if cart_text.count(route_leaf) != 1:
            raise BuildError("certified cart route normalizer seam was not found exactly once")
        cart_runtime.write_text(
            cart_text.replace(route_leaf, route_leaf_normalized), encoding="utf-8"
        )

        asset_texts = list(transformed.values())
        asset_texts.extend(
            source.read_text(encoding="utf-8")
            for source in SUPPORT_FILES.values()
            if source.suffix.lower() == ".css"
        )
        assets = referenced_assets(asset_texts)
        scanned_stylesheets: set[Path] = set()
        while True:
            pending_stylesheets = sorted(
                relative
                for relative in assets
                if relative.suffix.lower() == ".css"
                and relative not in scanned_stylesheets
            )
            if not pending_stylesheets:
                break
            for relative in pending_stylesheets:
                source = REPO / relative
                if not source.is_file():
                    raise BuildError(f"referenced stylesheet is missing: {source}")
                assets.update(
                    referenced_assets([source.read_text(encoding="utf-8")])
                )
                scanned_stylesheets.add(relative)
        for relative in sorted(assets):
            if relative.is_absolute() or ".." in relative.parts:
                raise BuildError(f"unsafe asset path: {relative}")
            copy_file(REPO / relative, staging / relative)

        config_source = REPO / "_wip/deploy/vercel-preview.json"
        config = json.loads(config_source.read_text(encoding="utf-8"))
        config.pop("_comment", None)
        (staging / "vercel.json").write_text(
            json.dumps(config, indent=2) + "\n", encoding="utf-8"
        )

        if (staging / ".vercel").exists():
            raise BuildError("build unexpectedly contains a Vercel project link")
        if any((staging / forbidden).exists() for forbidden in ("_wip", "docs", ".git")):
            raise BuildError("build unexpectedly contains a private repository directory")

        if output.exists():
            if output.is_symlink():
                raise BuildError(f"refusing symlink output: {output}")
            shutil.rmtree(output)
        staging.replace(output)
        file_count = sum(1 for path in output.rglob("*") if path.is_file())
        byte_count = sum(path.stat().st_size for path in output.rglob("*") if path.is_file())
        return file_count, byte_count
    except Exception:
        if staging.exists() and not staging.is_symlink():
            shutil.rmtree(staging)
        raise


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    try:
        file_count, byte_count = build(args.output)
    except (BuildError, OSError, UnicodeError, json.JSONDecodeError) as exc:
        print(f"BUILD FAIL: {exc}", file=sys.stderr)
        return 1
    print(
        f"BUILD PASS output={args.output.resolve()} files={file_count} bytes={byte_count} "
        "pages=7 private_dirs=0 vercel_project_link=0"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
