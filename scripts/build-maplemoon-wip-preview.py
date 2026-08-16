#!/usr/bin/env python3
"""Build a deploy-safe preview from the six current MapleMoon WIP pages.

The output is intentionally a self-contained static directory. It never copies
the repository root, `_wip`, project-local evidence, or a Vercel project link.
"""

from __future__ import annotations

import argparse
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
}

ROUTE_REPLACEMENTS = {
    "homepage_real_1_lead_photo.WIP.html": "homepage",
    "shop.WIP.html": "shop",
    "our-story.WIP.html": "our-story",
    "carob-story.WIP.html": "carob-story",
    "faq.WIP.html": "faq",
    "stockists.WIP.html": "stockists",
}

SUPPORT_FILES = {
    "brand_kit.css": REPO / "brand_kit.css",
    "a11y_inner.css": REPO / "_wip/a11y_inner.css",
    "design_refinement_20260723.css": REPO
    / "_wip/design_refinement_20260723.css",
    "styles/homepage.css": REPO / "_wip/styles/homepage.css",
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
            if ".WIP.html" in page:
                raise BuildError(f"unrewritten WIP route remains in {source}")
            if re.search(r"(?:href|src)\s*=\s*['\"]/_wip/", page, re.I):
                raise BuildError(f"internal WIP URL remains in {source}")
            transformed[destination_name] = page
            (staging / destination_name).write_text(page, encoding="utf-8")

        for destination_name, source in SUPPORT_FILES.items():
            copy_file(source, staging / destination_name)

        assets = referenced_assets(list(transformed.values()))
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
        "pages=6 private_dirs=0 vercel_project_link=0"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
