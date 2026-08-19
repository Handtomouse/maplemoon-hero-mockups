#!/usr/bin/env python3
"""Fail-closed static checks for the seven-route preview candidate."""

from __future__ import annotations

import argparse
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROUTES = {
    "/": "homepage.html",
    "/homepage": "homepage.html",
    "/shop": "shop.html",
    "/our-story": "our-story.html",
    "/carob-story": "carob-story.html",
    "/faq": "faq.html",
    "/stockists": "stockists.html",
    "/products/pure-carob-bar": "products/pure-carob-bar.html",
}
PAGES = tuple(dict.fromkeys(ROUTES.values()))


class References(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.values: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for name, value in attrs:
            if name in {"href", "src"} and value:
                self.values.append((name, value))


def local_target(root: Path, value: str) -> Path | None:
    if value.startswith(("#", "mailto:", "tel:", "data:", "javascript:")):
        return None
    parsed = urlsplit(value)
    if parsed.scheme or parsed.netloc:
        return None
    route = unquote(parsed.path)
    if not route:
        return None
    if route in ROUTES:
        return root / ROUTES[route]
    if route.startswith("/"):
        return root / route.lstrip("/")
    return root / route


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    root = args.root.resolve()
    failures: list[str] = []
    checks: list[dict[str, object]] = []

    for relative in PAGES:
        page = root / relative
        exists = page.is_file() and page.stat().st_size > 100
        checks.append({"check": "page", "path": relative, "pass": exists})
        if not exists:
            failures.append(f"missing-page:{relative}")
            continue
        parser_ = References()
        text = page.read_text(encoding="utf-8")
        parser_.feed(text)
        for attribute, value in parser_.values:
            target = local_target(root, value)
            if target is None:
                continue
            exists = target.is_file()
            checks.append(
                {
                    "check": "reference",
                    "page": relative,
                    "attribute": attribute,
                    "value": value,
                    "target": str(target.relative_to(root)),
                    "pass": exists,
                }
            )
            if not exists:
                failures.append(f"missing-reference:{relative}:{value}")

    homepage = (root / "homepage.html").read_text(encoding="utf-8")
    pure = (root / "products/pure-carob-bar.html").read_text(encoding="utf-8")
    target_count = homepage.count("url:'/products/pure-carob-bar'")
    nav_count = homepage.count(
        "window.location.href=(item&&item.url)||shopTarget(currentCat)"
    )
    old_target_count = homepage.count("products/pure-carob-bar.html")
    pure_title_count = len(
        re.findall(
            r'<h1[^>]*id="product-title"[^>]*>Pure Carob\s*<span[^>]*>&amp;</span>\s*Cacao Butter</h1>',
            pure,
        )
    )
    controls = {
        "homepage_clean_target_exactly_once": target_count == 1,
        "homepage_target_is_used_by_shop_now": nav_count == 1,
        "homepage_old_target_absent": old_target_count == 0,
        "pure_title_positive_control_exactly_once": pure_title_count == 1,
        "page_count": len(PAGES),
    }
    for name, passed in controls.items():
        if name == "page_count":
            continue
        if not passed:
            failures.append(name)

    result = {
        "root": str(root),
        "pages": list(PAGES),
        "controls": controls,
        "checks": checks,
        "failures": sorted(set(failures)),
        "result": "PASS" if not failures else "FAIL",
    }
    args.output.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(
        f"STATIC {result['result']} pages={len(PAGES)}/7 "
        f"references={sum(item['check'] == 'reference' for item in checks)} "
        f"failures={len(result['failures'])}"
    )
    for failure in result["failures"]:
        print(f"FAIL {failure}")
    return 0 if not failures else 1


if __name__ == "__main__":
    raise SystemExit(main())
