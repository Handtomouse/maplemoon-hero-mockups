#!/usr/bin/env python3
"""Read-only confidence checks for the MapleMoon client-review package."""

from __future__ import annotations

import argparse
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import URLError
from urllib.request import Request, urlopen


REPO = Path(__file__).resolve().parents[1]
DEFAULT_STAGING = REPO / "docs/client-review/2026-07-29-carli-review/staging-v1"
FORBIDDEN = (
    "Natasha",
    "Janice",
    "Acacia",
    "_WEBSITE_ORCHESTRATOR",
    "_LIVE_TRACKER",
    ".codex",
    ".paperclip",
)
LOCAL_ATTRS = re.compile(r"\b(?:href|src|poster|srcset)=[\"']([^\"']+)", re.I)
SKIP_PREFIXES = ("http:", "https:", "//", "#", "mailto:", "tel:", "data:", "javascript:")


class QuietHTMLParser(HTMLParser):
    pass


def clean_ref(raw: str) -> str:
    return raw.split("#", 1)[0].split("?", 1)[0].strip().split(",", 1)[0].strip()


def is_dynamic_ref(ref: str) -> bool:
    return ref.endswith("finalist_") or "{{" in ref or "[" in ref


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--staging", type=Path, default=DEFAULT_STAGING)
    parser.add_argument("--base-url", help="Optional hosted preview URL to probe")
    args = parser.parse_args()

    root = args.staging.resolve()
    failures: list[str] = []
    warnings: list[str] = []
    html_files = sorted(root.glob("*.html")) if root.exists() else []

    if not root.is_dir():
        print(f"FAIL staging directory missing: {root}")
        return 1

    print(f"MapleMoon review checker: {root}")
    print(f"HTML files: {len(html_files)}")

    symlinks = [p.relative_to(root) for p in root.rglob("*") if p.is_symlink()]
    if symlinks:
        failures.append(f"symlinks found: {', '.join(map(str, symlinks))}")
    else:
        print("PASS no symlinks")

    for path in html_files:
        try:
            text = path.read_text(encoding="utf-8")
            QuietHTMLParser().feed(text)
        except Exception as exc:  # parser/read failures are actionable
            failures.append(f"{path.name}: HTML read/parse failed: {exc}")
            continue

        lower = text.lower()
        if "noindex" not in lower or "nofollow" not in lower:
            failures.append(f"{path.name}: missing noindex/nofollow metadata")
        if re.search(r"<link[^>]+rel=[\"']canonical[\"']", text, re.I):
            failures.append(f"{path.name}: live canonical tag present")
        for token in FORBIDDEN:
            if token.lower() in lower:
                failures.append(f"{path.name}: forbidden token present: {token}")

        for raw in LOCAL_ATTRS.findall(text):
            ref = clean_ref(raw)
            if not ref or ref.startswith(SKIP_PREFIXES) or is_dynamic_ref(ref):
                continue
            target = (path.parent / ref).resolve()
            if not target.exists():
                failures.append(f"{path.name}: missing local reference: {ref}")

    if not failures:
        print("PASS HTML metadata, forbidden-content, and local-reference checks")

    if args.base_url:
        base = args.base_url.rstrip("/")
        routes = [p.name for p in html_files]
        for route in routes:
            request = Request(f"{base}/{route}", headers={"Range": "bytes=0-255"})
            try:
                with urlopen(request, timeout=8) as response:
                    status = response.status
                    robots = response.headers.get("X-Robots-Tag", "")
                    if status >= 400:
                        failures.append(f"hosted {route}: HTTP {status}")
                    elif "noindex" not in robots.lower():
                        warnings.append(f"hosted {route}: X-Robots-Tag does not include noindex")
                    else:
                        print(f"PASS hosted {route}: HTTP {status}, {robots}")
            except (URLError, OSError, TimeoutError) as exc:
                warnings.append(f"hosted checks unavailable: {exc}")
                break

    for warning in warnings:
        print(f"WARN {warning}")
    for failure in failures:
        print(f"FAIL {failure}")

    print(f"Summary: {len(failures)} failure(s), {len(warnings)} warning(s)")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
