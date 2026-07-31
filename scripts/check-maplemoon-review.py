#!/usr/bin/env python3
"""Confidence checks for historical and Saturday MapleMoon review packages."""

from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import URLError
from urllib.parse import urlsplit
from urllib.request import Request, urlopen

from PIL import Image


REPO = Path(__file__).resolve().parents[1]
DEFAULT_STAGING = REPO / "docs/client-review/2026-07-29-carli-review/staging-v1"
SATURDAY_STAGING = REPO / "docs/client-review/2026-08-01-saturday-review/staging-v1"
SATURDAY_PACKET_ID = "VIS-03C-03-CURRENT-WIP-SOURCE-LINEAGE"
PAGE_ALIASES = {
    "homepage.html",
    "carob-story.html",
    "shop.html",
    "our-story.html",
    "stockists.html",
    "faq.html",
}
FORBIDDEN = (
    "Natasha",
    "Janice",
    "Acacia",
    "_WEBSITE_ORCHESTRATOR",
    "_LIVE_TRACKER",
    ".codex",
    ".paperclip",
)
SATURDAY_FORBIDDEN = FORBIDDEN + (
    ".WIP.html",
    ".vercel",
    "/Users/",
    "_wip/",
    "source note",
    "sourceline",
    "wip directory status",
    "wip guardrail",
    "this wip",
    "mm-seo-block",
    "application/ld+json",
)
TEXT_EXTENSIONS = {".html", ".css", ".js", ".json", ".svg", ".md", ".txt"}
LOCAL_ATTRS = re.compile(
    r"\b(?:href|src|poster)=[\"']([^\"']+)|\bsrcset=[\"']([^\"']+)",
    re.I,
)
ASSET_PATHS = re.compile(
    r"(?<![A-Za-z0-9_./-])(assets/[A-Za-z0-9_./-]+\.(?:webp|jpg|jpeg|png|svg|mp4))",
    re.I,
)
ASSET_PREFIX_ASSIGNMENTS = re.compile(
    r"\b(?:var|let|const)\s+([A-Za-z_$][\w$]*)\s*=\s*[\"'](assets/[A-Za-z0-9_./-]*/)[\"']",
    re.I,
)
ASSET_PREFIX_CONCATENATIONS = re.compile(
    r"\b([A-Za-z_$][\w$]*)\s*\+\s*[\"']([A-Za-z0-9_.-]+\.(?:webp|jpg|jpeg|png|svg|mp4))[\"']",
    re.I,
)
SKIP_PREFIXES = ("http:", "https:", "//", "#", "mailto:", "tel:", "data:", "javascript:")
CANONICAL_RE = re.compile(r"<link\b[^>]*\brel=[\"']canonical[\"']", re.I)
SOCIAL_META_RE = re.compile(
    r"<meta\b[^>]*(?:\bproperty=[\"']og:|\bname=[\"']twitter:)",
    re.I,
)
HOMEPAGE_REVIEW_EXCLUSION_RE = re.compile(
    r"\s*<section\b(?=[^>]*\bid=[\"'](?:who|reviews)[\"'])[^>]*>.*?</section>\s*",
    re.I | re.S,
)
HOMEPAGE_DISABLED_COMPARISON_RE = re.compile(
    r"<div\b(?=[^>]*\bclass=[\"'][^\"']*\bq-segments\b)[^>]*>"
    r".*?<button\b[^>]*\bdisabled\b",
    re.I | re.S,
)
REVIEW_LINK = '<link rel="stylesheet" href="review-mode.css">\n'
REVIEW_SCRIPT = '<script src="review-mode.js"></script>\n'
MOCK_CART_LINK = '<link rel="stylesheet" href="mock-cart.css">\n'
MOCK_CART_SCRIPT = '<script src="mock-cart.js"></script>\n'
TYPEKIT_STYLESHEET = "https://use.typekit.net/dvz0xjs.css"
TYPEKIT_FONT_HOSTS = {"use.typekit.net", "p.typekit.net"}
CLEAN_UNSUPPORTED_CLAIMS = (
    "slow-roast and mill",
    "slow-roasted and milled",
    "milled with cacao butter",
    "mills its slow-roasted",
    "smooth carob",
    "handmade",
    "handcrafted",
    "small batches",
    "hand-poured, hand-packed",
)


def load_saturday_builder():
    path = REPO / "scripts/build-maplemoon-saturday-review.py"
    spec = importlib.util.spec_from_file_location("maplemoon_saturday_builder", path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"could not load Saturday builder: {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


SATURDAY_BUILDER = load_saturday_builder()


def expected_source_lineage() -> dict[str, dict[str, str]]:
    control = SATURDAY_BUILDER.packet_control(SATURDAY_BUILDER.CURRENT_PACKET)
    return SATURDAY_BUILDER.current_source_lineage(control)


class QuietHTMLParser(HTMLParser):
    pass


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def clean_ref(raw: str) -> str:
    return raw.split("#", 1)[0].split("?", 1)[0].strip().split(",", 1)[0].strip()


def is_dynamic_ref(ref: str) -> bool:
    return ref.endswith("finalist_") or "{{" in ref or "[" in ref


def local_refs(text: str) -> list[str]:
    refs = []
    for match in LOCAL_ATTRS.finditer(text):
        raw = match.group(1) or match.group(2)
        candidates = [raw] if match.group(1) else [part.strip().split()[0] for part in raw.split(",")]
        refs.extend(candidates)
    refs.extend(match.group(1) for match in ASSET_PATHS.finditer(text))
    prefixes = dict(ASSET_PREFIX_ASSIGNMENTS.findall(text))
    for variable, filename in ASSET_PREFIX_CONCATENATIONS.findall(text):
        if variable in prefixes:
            refs.append(prefixes[variable] + filename)
    return refs


def check_symlinks(root: Path, failures: list[str]) -> None:
    symlinks = [p.relative_to(root) for p in root.rglob("*") if p.is_symlink()]
    if symlinks:
        failures.append(f"symlinks found: {', '.join(map(str, symlinks))}")
    else:
        print("PASS no symlinks")


def check_html_file(
    path: Path,
    root: Path,
    failures: list[str],
    *,
    saturday: bool,
) -> None:
    try:
        text = path.read_text(encoding="utf-8")
        QuietHTMLParser().feed(text)
    except Exception as exc:
        failures.append(f"{path.name}: HTML read/parse failed: {exc}")
        return

    lower = text.lower()
    if "noindex" not in lower or "nofollow" not in lower:
        failures.append(f"{path.name}: missing noindex/nofollow metadata")
    if CANONICAL_RE.search(text):
        failures.append(f"{path.name}: live canonical tag present")
    if saturday and SOCIAL_META_RE.search(text):
        failures.append(f"{path.name}: production social metadata present")
    for token in SATURDAY_FORBIDDEN if saturday else FORBIDDEN:
        if token.lower() in lower:
            failures.append(f"{path.name}: forbidden token present: {token}")

    for raw in local_refs(text):
        ref = clean_ref(raw)
        if not ref or ref.startswith(SKIP_PREFIXES) or is_dynamic_ref(ref):
            continue
        target = (path.parent / ref).resolve()
        try:
            target.relative_to(root)
        except ValueError:
            failures.append(f"{path.name}: local reference escapes package: {ref}")
            continue
        if not target.exists():
            failures.append(f"{path.name}: missing local reference: {ref}")


def check_manifest(root: Path, failures: list[str]) -> None:
    manifest_path = root / "MANIFEST.json"
    if not manifest_path.is_file():
        failures.append("MANIFEST.json missing")
        return
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        failures.append(f"MANIFEST.json invalid: {exc}")
        return
    expected = manifest.get("files")
    if manifest.get("packet_id") != SATURDAY_PACKET_ID:
        failures.append(
            f"MANIFEST.json packet ID mismatch: expected {SATURDAY_PACKET_ID}"
        )
    if manifest.get("source_lineage") != expected_source_lineage():
        failures.append("MANIFEST.json current-source lineage mismatch")
    if not isinstance(expected, dict):
        failures.append("MANIFEST.json files must be an object")
        return
    actual_paths = {
        path.relative_to(root).as_posix()
        for path in root.rglob("*")
        if path.is_file() and path != manifest_path
    }
    expected_paths = set(expected)
    if actual_paths != expected_paths:
        missing = sorted(expected_paths - actual_paths)
        extra = sorted(actual_paths - expected_paths)
        failures.append(f"manifest membership mismatch; missing={missing}, extra={extra}")
        return
    for relative in sorted(expected):
        path = root / relative
        record = expected[relative]
        actual_hash = sha256(path)
        actual_bytes = path.stat().st_size
        if record.get("sha256") != actual_hash or record.get("bytes") != actual_bytes:
            failures.append(f"manifest mismatch: {relative}")


def check_text_tree(root: Path, failures: list[str]) -> None:
    for path in sorted(p for p in root.rglob("*") if p.is_file() and p.suffix.lower() in TEXT_EXTENSIONS):
        text = path.read_text(encoding="utf-8", errors="replace")
        lower = text.lower()
        for token in SATURDAY_FORBIDDEN:
            if token.lower() in lower:
                failures.append(f"{path.relative_to(root)}: forbidden token present: {token}")
        if "../clean" in lower or "../annotated" in lower:
            failures.append(f"{path.relative_to(root)}: cross-root link present")


def check_embedded_metadata(root: Path, failures: list[str]) -> None:
    sensitive_keys = {"exif", "xmp", "xml", "iptc", "icc_profile"}
    image_paths = sorted(
        path
        for path in root.rglob("*")
        if path.is_file() and path.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}
    )
    for path in image_paths:
        try:
            with Image.open(path) as image:
                present = sensitive_keys & set(image.info)
                if image.getexif():
                    present.add("exif")
        except (OSError, ValueError) as exc:
            failures.append(f"{path.relative_to(root)}: image metadata inspection failed: {exc}")
            continue
        if present:
            failures.append(
                f"{path.relative_to(root)}: embedded metadata present: {sorted(present)}"
            )


def check_saturday_root(root: Path, profile: str) -> list[str]:
    failures: list[str] = []
    if not root.is_dir():
        return [f"staging directory missing: {root}"]
    print(f"MapleMoon Saturday checker ({profile}): {root}")
    check_symlinks(root, failures)

    html_files = {path.name for path in root.glob("*.html")}
    expected_html = PAGE_ALIASES | ({"index.html"} if profile == "saturday-annotated" else set())
    if html_files != expected_html:
        failures.append(
            f"HTML alias set mismatch; expected={sorted(expected_html)}, actual={sorted(html_files)}"
        )

    if profile == "saturday-clean":
        for forbidden_file in ("review-mode.css", "review-mode.js", "index.html"):
            if (root / forbidden_file).exists():
                failures.append(f"clean root contains review-only file: {forbidden_file}")
    else:
        for required_file in ("review-mode.css", "review-mode.js", "index.html"):
            if not (root / required_file).is_file():
                failures.append(f"annotated root missing: {required_file}")
        index = root / "index.html"
        if index.is_file():
            text = index.read_text(encoding="utf-8")
            for alias in sorted(PAGE_ALIASES):
                if f'{alias}?review=1' not in text:
                    failures.append(f"annotated index missing review route: {alias}?review=1")

    for required_file in ("mock-cart.css", "mock-cart.js"):
        if not (root / required_file).is_file():
            failures.append(f"{profile} root missing shared review asset: {required_file}")
    for alias in sorted(PAGE_ALIASES):
        page_path = root / alias
        if not page_path.is_file():
            continue
        text = page_path.read_text(encoding="utf-8")
        if MOCK_CART_LINK.strip() not in text:
            failures.append(f"{alias}: mock-cart stylesheet missing")
        if MOCK_CART_SCRIPT.strip() not in text:
            failures.append(f"{alias}: mock-cart script missing")
        if profile == "saturday-clean":
            lower = text.lower()
            for claim in CLEAN_UNSUPPORTED_CLAIMS:
                if claim in lower:
                    failures.append(f"{alias}: unsupported clean-review claim present: {claim}")
            if alias == "homepage.html" and HOMEPAGE_DISABLED_COMPARISON_RE.search(text):
                failures.append(
                    "homepage.html: unavailable comparison controls remain on clean review"
                )
            if alias == "homepage.html":
                required_finder_tokens = (
                    'class="mm-stockist-mini"',
                    'action="stockists.html"',
                    'name="q"',
                    "Find stockists",
                )
                for token in required_finder_tokens:
                    if token not in text:
                        failures.append(
                            f"homepage.html: working stockist mini-finder missing token: {token}"
                        )
                for unfinished_token in (
                    "Representative stockist",
                    "Details pending verification",
                    "Verified directory pending",
                ):
                    if unfinished_token.lower() in lower:
                        failures.append(
                            "homepage.html: unfinished stockist placeholder remains: "
                            f"{unfinished_token}"
                        )

    check_manifest(root, failures)
    check_text_tree(root, failures)
    check_embedded_metadata(root, failures)
    for path in sorted(root.glob("*.html")):
        check_html_file(path, root, failures, saturday=True)

    if not failures:
        print("PASS aliases, manifest, metadata, forbidden-content, and local references")
    return failures


def canonical_document(text: str, alias: str, *, project_clean: bool) -> bytes:
    normalized = text.replace("\r\n", "\n").replace("\r", "\n")
    normalized = normalized.replace(REVIEW_LINK, "").replace(REVIEW_SCRIPT, "")
    if project_clean:
        normalized = SATURDAY_BUILDER.clean_page(normalized, alias)
    return normalized.encode("utf-8")


def check_parity(clean: Path, annotated: Path) -> list[str]:
    failures = []
    for alias in sorted(PAGE_ALIASES):
        clean_path = clean / alias
        annotated_path = annotated / alias
        if not clean_path.is_file() or not annotated_path.is_file():
            failures.append(f"parity input missing: {alias}")
            continue
        if canonical_document(
            clean_path.read_text(encoding="utf-8"),
            alias,
            project_clean=False,
        ) != canonical_document(
            annotated_path.read_text(encoding="utf-8"),
            alias,
            project_clean=True,
        ):
            failures.append(f"complete-document parity mismatch: {alias}")
    if not failures:
        print("PASS complete-document clean/annotated parity")
    return failures


def check_aggregate_manifest(root: Path) -> list[str]:
    failures = []
    path = root / "MANIFEST.json"
    try:
        manifest = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        return [f"aggregate MANIFEST.json invalid: {exc}"]
    expected_paths = {"clean/MANIFEST.json", "annotated/MANIFEST.json"}
    files = manifest.get("files")
    if (
        manifest.get("schema") != "maplemoon-saturday-review-aggregate/v1"
        or manifest.get("packet_id") != SATURDAY_PACKET_ID
        or manifest.get("share_ready") is not False
        or manifest.get("source_lineage") != expected_source_lineage()
        or not isinstance(files, dict)
        or set(files) != expected_paths
    ):
        return ["aggregate MANIFEST.json contract mismatch"]
    for relative in sorted(expected_paths):
        child = root / relative
        record = files[relative]
        if not child.is_file():
            failures.append(f"aggregate manifest child missing: {relative}")
        elif record.get("sha256") != sha256(child) or record.get("bytes") != child.stat().st_size:
            failures.append(f"aggregate manifest mismatch: {relative}")
    unexpected = {
        path.relative_to(root).as_posix()
        for path in root.iterdir()
        if path.name not in {"clean", "annotated", "MANIFEST.json"}
    }
    if unexpected:
        failures.append(f"unexpected aggregate-root members: {sorted(unexpected)}")
    if not failures:
        print("PASS aggregate manifest binds clean and annotated manifests")
    return failures


def network_urls(payload: object) -> list[tuple[str, str]]:
    items = payload.get("requests", []) if isinstance(payload, dict) else payload
    if not isinstance(items, list):
        raise ValueError("network log must be an array or an object with a requests array")
    result = []
    for item in items:
        if isinstance(item, str):
            result.append((item, ""))
        elif isinstance(item, dict) and isinstance(item.get("url"), str):
            result.append((item["url"], str(item.get("resource_type", item.get("resourceType", "")))))
        else:
            raise ValueError("network request entries must be URLs or objects with url")
    return result


def check_network_log(path: Path) -> list[str]:
    failures = []
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
        requests = network_urls(payload)
    except (OSError, json.JSONDecodeError, ValueError) as exc:
        return [f"network log invalid: {exc}"]
    if not requests:
        return ["network log contains no requests"]

    for url, resource_type in requests:
        parsed = urlsplit(url)
        if parsed.scheme in ("", "data", "blob", "about"):
            continue
        if parsed.hostname in {"localhost", "127.0.0.1"}:
            continue
        if url == TYPEKIT_STYLESHEET:
            continue
        is_typekit_font = (
            parsed.scheme == "https"
            and parsed.hostname == "use.typekit.net"
            and parsed.path.startswith("/af/")
            and parsed.path.endswith("/l")
        )
        is_typekit_font_helper = (
            parsed.scheme == "https"
            and parsed.hostname == "p.typekit.net"
            and parsed.path == "/p.css"
            and "k=dvz0xjs" in parsed.query
        )
        if is_typekit_font or is_typekit_font_helper:
            continue
        failures.append(f"unapproved external request: {resource_type or 'unknown'} {url}")
    if not failures:
        print(f"PASS runtime network allowlist ({len(requests)} request(s)); log sha256={sha256(path)}")
    return failures


def historical_check(root: Path, base_url: str | None) -> tuple[list[str], list[str]]:
    failures: list[str] = []
    warnings: list[str] = []
    html_files = sorted(root.glob("*.html")) if root.exists() else []
    if not root.is_dir():
        return [f"staging directory missing: {root}"], warnings
    print(f"MapleMoon review checker: {root}")
    print(f"HTML files: {len(html_files)}")
    check_symlinks(root, failures)
    for path in html_files:
        check_html_file(path, root, failures, saturday=False)
    if not failures:
        print("PASS HTML metadata, forbidden-content, and local-reference checks")

    if base_url:
        base = base_url.rstrip("/")
        for path in html_files:
            request = Request(f"{base}/{path.name}", headers={"Range": "bytes=0-255"})
            try:
                with urlopen(request, timeout=8) as response:
                    status = response.status
                    robots = response.headers.get("X-Robots-Tag", "")
                    if status >= 400:
                        failures.append(f"hosted {path.name}: HTTP {status}")
                    elif "noindex" not in robots.lower():
                        warnings.append(f"hosted {path.name}: X-Robots-Tag does not include noindex")
                    else:
                        print(f"PASS hosted {path.name}: HTTP {status}, {robots}")
            except (URLError, OSError, TimeoutError) as exc:
                warnings.append(f"hosted checks unavailable: {exc}")
                break
    return failures, warnings


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--staging", type=Path)
    parser.add_argument("--base-url", help="Optional hosted preview URL to probe")
    parser.add_argument(
        "--profile",
        choices=(
            "historical",
            "saturday-clean",
            "saturday-annotated",
            "saturday-all",
            "saturday-network",
        ),
        default="historical",
    )
    parser.add_argument("--network-log", type=Path)
    args = parser.parse_args()
    staging = (
        args.staging
        if args.staging is not None
        else SATURDAY_STAGING
        if args.profile.startswith("saturday-") and args.profile != "saturday-network"
        else DEFAULT_STAGING
    )

    if args.profile == "saturday-network":
        failures = (
            check_network_log(args.network_log)
            if args.network_log
            else ["--network-log is required for saturday-network"]
        )
        warnings: list[str] = []
    elif args.profile == "saturday-all":
        root = staging.resolve()
        failures = check_aggregate_manifest(root)
        failures.extend(check_saturday_root(root / "clean", "saturday-clean"))
        failures.extend(check_saturday_root(root / "annotated", "saturday-annotated"))
        failures.extend(check_parity(root / "clean", root / "annotated"))
        warnings = []
    elif args.profile in {"saturday-clean", "saturday-annotated"}:
        failures = check_saturday_root(staging.resolve(), args.profile)
        warnings = []
    else:
        failures, warnings = historical_check(staging.resolve(), args.base_url)

    for warning in warnings:
        print(f"WARN {warning}")
    for failure in failures:
        print(f"FAIL {failure}")
    print(f"Summary: {len(failures)} failure(s), {len(warnings)} warning(s)")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
