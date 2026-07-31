#!/usr/bin/env python3
"""Build deterministic local MapleMoon clean and annotated review surfaces."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image


REPO = Path(__file__).resolve().parents[1]
BASE_PACKET = REPO / "docs/orchestration/packets/VIS-01C-SATURDAY-REVIEW-SHELL.md"
UPDATE_PACKET = REPO / "docs/orchestration/packets/VIS-02A-HOMEPAGE-TECHNICAL-HARDENING.md"
CURRENT_PACKET = (
    REPO / "docs/orchestration/packets/VIS-03C-03-CURRENT-WIP-SOURCE-LINEAGE.md"
)
SOURCE_ROOT = REPO / "docs/client-review/2026-07-29-carli-review/staging-v1"
DEFAULT_OUTPUT = REPO / "docs/client-review/2026-08-01-saturday-review/staging-v1"
SHARED_ROOT = REPO / "docs/client-review/2026-08-01-saturday-review/shared"

PAGE_SOURCES = {
    "homepage.html": REPO / "_wip/homepage_real_1_lead_photo.WIP.html",
    "carob-story.html": REPO / "_wip/carob-story.WIP.html",
    "shop.html": REPO / "_wip/shop.WIP.html",
    "our-story.html": REPO / "_wip/our-story.WIP.html",
    "stockists.html": REPO / "_wip/stockists.WIP.html",
    "faq.html": REPO / "_wip/faq.WIP.html",
}
HOMEPAGE_SOURCE = PAGE_SOURCES["homepage.html"]
ROUTE_REPLACEMENTS = {
    "homepage_real_1_lead_photo.WIP.html": "homepage.html",
    "carob-story.WIP.html": "carob-story.html",
    "shop.WIP.html": "shop.html",
    "our-story.WIP.html": "our-story.html",
    "stockists.WIP.html": "stockists.html",
    "faq.WIP.html": "faq.html",
}
REVIEW_FILES = {"review-mode.css", "review-mode.js"}
SHARED_FILES = {"mock-cart.css", "mock-cart.js"}
CURRENT_PACKET_ID = "VIS-03C-03-CURRENT-WIP-SOURCE-LINEAGE"

CONTROL_RE = re.compile(
    r"<!-- CONTROL-PLANE:BEGIN -->\s*(\{.*?\})\s*<!-- CONTROL-PLANE:END -->",
    re.S,
)
REVIEW_LINK_RE = re.compile(
    r"\s*<link\b(?=[^>]*\bhref=[\"']review-mode\.css[\"'])[^>]*>\s*",
    re.I,
)
REVIEW_SCRIPT_RE = re.compile(
    r"\s*<script\b(?=[^>]*\bsrc=[\"']review-mode\.js[\"'])[^>]*>\s*</script>\s*",
    re.I,
)
CANONICAL_RE = re.compile(
    r"\s*<link\b(?=[^>]*\brel=[\"']canonical[\"'])[^>]*>\s*",
    re.I,
)
SOCIAL_META_RE = re.compile(
    r"\s*<meta\b(?=[^>]*(?:\bproperty=[\"']og:|\bname=[\"']twitter:))[^>]*>\s*",
    re.I,
)
ROBOTS_META_RE = re.compile(
    r"\s*<meta\b(?=[^>]*\bname=[\"']robots[\"'])[^>]*>\s*",
    re.I,
)
HOMEPAGE_CLEAN_EXCLUSION_RE = re.compile(
    r"\s*<section\b(?=[^>]*\bid=[\"'](?:who|reviews)[\"'])[^>]*>.*?</section>\s*",
    re.I | re.S,
)
CLEAN_SECTION_EXCLUSIONS = {
    "homepage.html": ("who", "reviews"),
    "carob-story.html": ("pod-to-bar",),
    "our-story.html": ("founders", "source", "craft"),
}
CLEAN_FORBIDDEN_CLAIMS = (
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
APPROVED_DELTA_FILES = frozenset(
    {
        "MANIFEST.json",
        "clean/MANIFEST.json",
        "clean/stockists.html",
        "annotated/MANIFEST.json",
        "annotated/stockists.html",
    }
)
HOMEPAGE_RITUAL_IMAGE_PATHS = (
    "assets/licensed/scene_after_dinner.jpg",
    "assets/licensed/scene_afternoon.jpg",
    "assets/licensed/scene_tea_night.jpg",
)
CV028_RITUAL_HEADING = '<span class="qkick">A sweeter kind of ritual</span>'
CV031_EVENING_TILE = (
    '<span class="mo">Evening</span><strong>After dinner</strong>'
    "<span>A small after-dinner ritual, when the lights are low.</span>"
)
CV055_CLEAN_FIRST_FAQ = (
    "{id:'what-is-carob',category:'carob',question:'What is carob?',"
    "answer:'Carob comes from a tree-grown pod, not a bean. Maple Moon uses "
    "Australian-grown carob.',keywords:['pod','bean','tree','cacao butter'],popular:true},"
)
CV055_ANNOTATED_FIRST_FAQ = (
    "{id:'what-is-carob',category:'carob',question:'What is carob?',"
    "answer:'Carob comes from a tree-grown pod, not a bean. Maple Moon uses "
    "Australian-grown carob, slow-roasted and milled with cacao butter.',"
    "keywords:['pod','bean','tree','cacao butter'],popular:true},"
)
CV057_FAQ_OBJECT = (
    "    {id:'is-carob-caffeine-free',category:'carob',question:'Is carob caffeine "
    "free?',answer:'Carob itself is naturally caffeine free.',keywords:['caffeine',"
    "'energy'],popular:true},\n"
)
CAROB_STORY_NUTRITION_COMPARISON_RE = re.compile(
    r"\bid=[\"'][^\"']*nutrition|"
    r"\bnutrition(?:al)?\s+(?:comparison|table)\b|"
    r"\bper\s+(?:100\s*g|serving)\b|"
    r">\s*(?:energy|protein|total fat|sugars?|sodium)\s*<",
    re.I,
)


class BuildError(RuntimeError):
    """Fail-closed build error."""


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def packet_control(path: Path) -> dict:
    match = CONTROL_RE.search(path.read_text(encoding="utf-8"))
    if not match:
        raise BuildError(f"control block missing: {path}")
    return json.loads(match.group(1))


def assert_hash(path: Path, expected: str, label: str) -> None:
    if not path.is_file():
        raise BuildError(f"pinned input missing ({label}): {path}")
    actual = sha256(path)
    if actual != expected:
        raise BuildError(
            f"pinned input changed ({label}): {path}; expected {expected}, got {actual}"
        )


def current_source_lineage(current_control: dict) -> dict[str, dict[str, str]]:
    pins = current_control["base"]["canonical_wip_sha256"]
    expected_paths = {
        source.relative_to(REPO).as_posix() for source in PAGE_SOURCES.values()
    }
    if set(pins) != expected_paths:
        raise BuildError("current packet source pins do not match the six page sources")
    lineage = {}
    for alias, source in PAGE_SOURCES.items():
        relative = source.relative_to(REPO).as_posix()
        lineage[alias] = {
            "source_id": f"canonical-current:{alias.removesuffix('.html')}",
            "sha256": pins[relative],
        }
    return lineage


def verify_inputs(control: dict, update_control: dict, current_control: dict) -> None:
    pins = control["source_pins"]
    for group in (
        "dependency_evidence_sha256",
        "canonical_wip_sha256",
        "frozen_authority_sha256",
    ):
        for relative, expected in pins[group].items():
            if (
                group == "canonical_wip_sha256"
                and relative == "_wip/homepage_real_1_lead_photo.WIP.html"
            ):
                continue
            assert_hash(REPO / relative, expected, group)
    for relative, expected in pins["copied_support_sha256"].items():
        assert_hash(SOURCE_ROOT / relative, expected, "copied_support_sha256")
    update_pins = update_control["implementation_pins"]
    if update_pins["homepage_source"] != "_wip/homepage_real_1_lead_photo.WIP.html":
        raise BuildError("VIS-02A Homepage source path changed")
    assert_hash(
        HOMEPAGE_SOURCE,
        update_pins["homepage_sha256"],
        "VIS-02A Homepage source",
    )
    lineage = current_source_lineage(current_control)
    for alias, source in PAGE_SOURCES.items():
        assert_hash(
            source,
            lineage[alias]["sha256"],
            f"VIS-03C-03 current source {alias}",
        )


def allowed_output(path: Path) -> bool:
    resolved = path.resolve()
    allowed_roots = (
        DEFAULT_OUTPUT.resolve(),
        Path(tempfile.gettempdir()).resolve(),
        Path("/private/tmp").resolve(),
    )
    return any(resolved == root or root in resolved.parents for root in allowed_roots)


def reset_output(path: Path) -> None:
    if not allowed_output(path):
        raise BuildError(f"refusing output outside admitted or temporary roots: {path}")
    if path.is_symlink():
        raise BuildError(f"refusing symlink output: {path}")
    if path.exists():
        shutil.rmtree(path)
    path.mkdir(parents=True)


def strip_review_layer(text: str) -> str:
    text = REVIEW_LINK_RE.sub("\n", text)
    text = REVIEW_SCRIPT_RE.sub("\n", text)
    return text


def required_replace(text: str, old: str, new: str, label: str) -> str:
    if old not in text:
        raise BuildError(f"clean review source changed before {label}")
    return text.replace(old, new, 1)


def required_remove_exact_once(text: str, exact: str, label: str) -> str:
    count = text.count(exact)
    if count != 1:
        raise BuildError(f"expected one exact {label} object, got {count}")
    return text.replace(exact, "", 1)


def remove_section(text: str, section_id: str) -> str:
    pattern = re.compile(
        rf"\s*<section\b(?=[^>]*\bid=[\"']{re.escape(section_id)}[\"'])"
        r"[^>]*>.*?</section>\s*",
        re.I | re.S,
    )
    updated, count = pattern.subn("\n", text, count=1)
    if count != 1:
        raise BuildError(f"clean review section changed before exclusion: {section_id}")
    return updated


def replace_section(text: str, section_id: str, replacement: str) -> str:
    pattern = re.compile(
        rf"\s*<section\b(?=[^>]*\bid=[\"']{re.escape(section_id)}[\"'])"
        r"[^>]*>.*?</section>\s*",
        re.I | re.S,
    )
    updated, count = pattern.subn("\n" + replacement.strip() + "\n", text, count=1)
    if count != 1:
        raise BuildError(f"clean review section changed before replacement: {section_id}")
    return updated


def section_markup(text: str, section_id: str) -> str:
    pattern = re.compile(
        rf"<section\b(?=[^>]*\bid=[\"']{re.escape(section_id)}[\"'])"
        r"[^>]*>.*?</section>",
        re.I | re.S,
    )
    matches = pattern.findall(text)
    if len(matches) != 1:
        raise BuildError(
            f"expected one {section_id} section for regression assertion, got {len(matches)}"
        )
    return matches[0]


def assert_page_regressions(text: str, alias: str) -> None:
    if alias == "homepage.html":
        ritual = section_markup(text, "ritual")
        actual_paths = tuple(
            re.findall(r"<img\b[^>]*\bsrc=[\"']([^\"']+)[\"']", ritual, re.I)
        )
        if actual_paths != HOMEPAGE_RITUAL_IMAGE_PATHS:
            raise BuildError(
                "Homepage ritual image paths changed: "
                f"expected {HOMEPAGE_RITUAL_IMAGE_PATHS}, got {actual_paths}"
            )
    if alias == "carob-story.html" and CAROB_STORY_NUTRITION_COMPARISON_RE.search(text):
        raise BuildError("Carob Story admitted a nutrition comparison")
    if alias == "stockists.html" and (
        "left:-9999px;top:8px;z-index:8;transform:none;" not in text
        or ".st-skip-finder:focus{left:18px;transform:translateY(0);" not in text
        or "if(!map||!mapSummary||!mapTextSummary)return;" not in text
    ):
        raise BuildError("Stockists derived interaction guards are incomplete")


def apply_vis03c_delta(text: str, alias: str) -> str:
    if alias == "homepage.html":
        return required_replace(
            text,
            '<span class="mo">Night</span><strong>With tea, at night</strong>',
            '<span class="mo">Night-time</span><strong>With tea, at night</strong>',
            "CV-034 Homepage ritual label",
        )

    if alias == "our-story.html":
        return required_replace(
            text,
            " We make carob because we love what it is, not what it stands in for.",
            "",
            "CV-043/CV-044/CV-045 Our Story sentence",
        )

    if alias == "faq.html":
        text = required_replace(
            text,
            "    { id:'support', label:'Support' },\n"
            "    { id:'pending', label:'Pending details', pending:true }",
            "    { id:'support', label:'Support' }",
            "CV-066 pending FAQ category",
        )
        text = required_replace(
            text,
            "  // Content boundary: approved shipping, returns, policy and pricing wording "
            "stays pending until supplied by Maple Moon.\n",
            "",
            "CV-066 pending FAQ comment",
        )
        text = required_replace(
            text,
            "    {id:'pending-policy-details',category:'pending',question:'What shipping, "
            "returns and policy details are confirmed?',answer:'Shipping, returns, policy "
            "wording and any related pricing details are still pending approved source copy."
            "',keywords:['shipping','returns','policy','pricing','delivery'],pending:true}\n",
            "",
            "CV-066 pending FAQ entry",
        )
        text = required_remove_exact_once(
            text,
            CV057_FAQ_OBJECT,
            "CV-057 is-carob-caffeine-free FAQ",
        )
        return required_replace(
            text,
            '</a></div><div class="support-mini"><strong>Need a hand?</strong>',
            '</a><a href="https://maplemoon.com.au/shipping-returns/">'
            '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
            '<path d="M4 7h11v10H4z"/><path d="M15 10h3l2 3v4h-5z"/>'
            '<path d="m9 12-2-2 2-2"/><path d="M7 10h5"/>'
            "</svg>Shipping &amp; returns</a></div><div class=\"support-mini\">"
            "<strong>Need a hand?</strong>",
            "CV-066 Shipping & returns link",
        )

    return text


def transform_page(text: str, alias: str) -> str:
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    for old, new in ROUTE_REPLACEMENTS.items():
        text = text.replace(old, new)
    text = strip_review_layer(text)
    text = CANONICAL_RE.sub("\n", text)
    text = SOCIAL_META_RE.sub("\n", text)
    text = ROBOTS_META_RE.sub("\n", text)
    if alias == "our-story.html":
        text = required_replace(
            text,
            "url('/assets/our_story/founders_portrait_h212.webp')",
            "url('assets/our_story/founders_portrait_h212.webp')",
            "Our Story derived founder asset path",
        )
    if alias == "faq.html":
        text = required_replace(
            text,
            'href="../assets/mm_logo_icon_blk.svg"',
            'href="assets/mm_logo_icon_blk.svg"',
            "FAQ derived favicon path",
        )
    if alias == "stockists.html":
        text = required_replace(
            text,
            "left:18px;top:8px;z-index:8;transform:translateY(-160%);",
            "left:-9999px;top:8px;z-index:8;transform:none;",
            "Stockists derived skip-control rest position",
        )
        text = required_replace(
            text,
            ".st-skip-finder:focus{transform:translateY(0);",
            ".st-skip-finder:focus{left:18px;transform:translateY(0);",
            "Stockists derived skip-control focus position",
        )
        text = required_replace(
            text,
            "  function renderMapMarkers(matched,visible){\n"
            "    var preview=visible.slice(0,4);",
            "  function renderMapMarkers(matched,visible){\n"
            "    if(!map||!mapSummary||!mapTextSummary)return;\n"
            "    var preview=visible.slice(0,4);",
            "Stockists derived optional-map guard",
        )
    text = re.sub(r"<!--\s*MM-SEO-BLOCK.*?-->\s*", "\n", text, flags=re.S | re.I)
    text = re.sub(r"/\*\s*WIP guardrail:.*?\*/\s*", "", text, flags=re.S | re.I)
    text = re.sub(
        r"<script\b[^>]*\btype=[\"']application/ld\+json[\"'][^>]*>.*?</script>\s*",
        "\n",
        text,
        flags=re.S | re.I,
    )
    text = re.sub(
        r'\s*<p class="st-directory-status" id="stockistDirectoryStatus">.*?</p>\s*',
        "\n",
        text,
        flags=re.S,
    )
    text = text.replace(' aria-describedby="stockistDirectoryStatus"', "")
    text = text.replace(
        "    parts.note=item.note?'<div class=\"st-result-note\"><span>Source note</span>'+text(item.note)+'</div>':'';",
        "    parts.note='';",
    )
    text = re.sub(r",sourceLine:\d+", "", text)
    text = re.sub(r',note:"(?:\\.|[^"\\])*"', "", text)
    text = re.sub(r'\s*<div class="st-data-key".*?</div>\s*', "\n", text, flags=re.S)
    text = text.replace(
        " This WIP keeps those answers visible as pending rather than inventing final terms.",
        "",
    )
    text = re.sub(
        r"<b>(?:Natasha(?:,\s*Sydney)?|Janice|Acacia)</b>",
        "<b>Customer name held pending consent</b>",
        text,
        flags=re.I,
    )
    text = text.replace(
        "</head>",
        """<meta name="robots" content="noindex,nofollow">
<script>
(() => {
  const params = new URLSearchParams(window.location.search);
  document.documentElement.classList.toggle("mm-annotated-review", params.get("review") === "1");
  document.documentElement.classList.toggle("mm-cart-qa", params.get("cart-qa") === "1");
})();
</script>
<link rel="stylesheet" href="mock-cart.css">
</head>""",
        1,
    )
    text = text.replace(
        "</body>",
        '<script src="mock-cart.js"></script>\n</body>',
        1,
    )
    if alias in {"our-story.html", "stockists.html"}:
        if text.count("</header>") != 1 or len(re.findall(r"<footer\b", text, re.I)) != 1:
            raise BuildError(f"{alias} changed before review landmark insertion")
        text = re.sub(
            r"(<body\b[^>]*>)",
            r'\1\n<a class="mm-review-skip" href="#main-content">Skip to main content</a>',
            text,
            count=1,
            flags=re.I,
        )
        text = text.replace(
            "</header>",
            '</header>\n<main id="main-content" tabindex="-1">',
            1,
        )
        text = re.sub(r"(<footer\b)", r"</main>\n\1", text, count=1, flags=re.I)
    text = apply_vis03c_delta(text, alias)
    text = re.sub(r"\n{3,}", "\n\n", text)
    if ".WIP.html" in text:
        raise BuildError("unmapped .WIP.html route remains in transformed page")
    if re.search(r"<link\b[^>]*\brel=[\"']canonical[\"']", text, re.I):
        raise BuildError("canonical tag remains in transformed page")
    if re.search(r"<meta\b[^>]*(?:property=[\"']og:|name=[\"']twitter:)", text, re.I):
        raise BuildError("production social metadata remains in transformed page")
    text = text.rstrip() + "\n"
    assert_page_regressions(text, alias)
    return text


def clean_page(text: str, alias: str) -> str:
    clean = text
    for section_id in CLEAN_SECTION_EXCLUSIONS.get(alias, ()):
        clean = remove_section(clean, section_id)

    if alias == "homepage.html":
        clean = replace_section(
            clean,
            "stockists",
            """
  <section class="wrap mm-stockists mm-home-stockist-finder" id="stockists" aria-labelledby="stockists-title">
    <span class="qkick">Stockists</span>
    <h2 id="stockists-title" class="lux-hd">Find Maple Moon near you</h2>
    <p>Search by store, suburb, postcode or state, then continue to matching locations in the full directory.</p>
    <form class="mm-stockist-mini" action="stockists.html" method="get" role="search">
      <label for="homepageStockistSearch">Where should we look?</label>
      <div class="mm-stockist-mini__controls">
        <input id="homepageStockistSearch" name="q" type="search" placeholder="Try Byron Bay, 2481 or NSW" autocomplete="off" enterkeyhint="search">
        <button type="submit">Find stockists</button>
      </div>
    </form>
    <a class="wf-pill" href="stockists.html">View full directory <span aria-hidden="true">→</span></a>
  </section>
            """,
        )
        clean = required_replace(
            clean,
            "Carob is a naturally sweet pod that grows in the warm Australian sun. "
            "It is not a bean, and it is naturally caffeine free. We slow-roast and "
            "mill it with cacao butter for a mellow, velvety finish.",
            "Carob is a naturally sweet pod that grows in the warm Australian sun. "
            "It is not a bean, and it is naturally caffeine free.",
            "Homepage carob introduction",
        )
        clean = required_replace(
            clean,
            '<div class="co flip" style="right:560px;top:56%"><span class="dot"></span>'
            '<span class="line"></span><div class="lab"><div class="top"><svg viewBox="0 0 24 24">'
            '<path d="M17 3a9 9 0 1 0 4 12 7 7 0 0 1-4-12z"/></svg>'
            '<span class="t">Slow-roasted</span><span class="n">03</span></div>'
            '<span class="d">Milled with cacao butter for smoothness.</span></div></div>',
            "",
            "Homepage unsupported process callout",
        )
        clean = required_replace(
            clean,
            '<div class="co" style="left:90px;top:58%"><span class="dot"></span>'
            '<span class="line"></span><div class="lab"><div class="top"><svg viewBox="0 0 24 24">'
            '<path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10z"/></svg>'
            '<span class="t">Small batches</span><span class="n">02</span></div>'
            '<span class="d">Hand-poured, hand-packed.</span></div></div>',
            "",
            "Homepage unsupported production callout",
        )
        clean = required_replace(
            clean,
            "d:'Slow-roasted hazelnut folded through smooth carob.'",
            "d:'Roasted hazelnut folded through carob.'",
            "Homepage Roasted Hazelnut description",
        )
        clean = required_replace(
            clean,
            "The full Maple Moon range, handmade bars, moons and elixirs",
            "The full Maple Moon range: bars, moons and elixirs",
            "Homepage product-range alternative text",
        )
        clean = required_replace(
            clean,
            '      <div class="q-segments" aria-label="Comparison views">\n'
            '        <button class="on" type="button">Compare</button>\n'
            '        <button type="button" disabled>Nutrition</button>\n'
            '        <button type="button" disabled>Taste <span class="amp">&amp;</span> Feel</button>\n'
            "      </div>\n",
            "",
            "Homepage unavailable comparison tabs",
        )

    if alias == "carob-story.html":
        clean = required_replace(
            clean,
            '<meta name="description" content="Carob is a naturally sweet pod, naturally '
            'caffeine free. Maple Moon uses Australian-grown carob, slow-roasted and milled '
            'with cacao butter on the NSW far north coast.">',
            "",
            "Carob Story unsupported description metadata",
        )
        clean = required_replace(
            clean,
            "Carob is a naturally sweet pod, not a bean. Maple Moon uses Australian-grown "
            "carob, slow-roasted and milled with cacao butter on the NSW far north coast.",
            "Carob is a naturally sweet pod, not a bean. Maple Moon uses Australian-grown carob.",
            "Carob Story hero introduction",
        )
        clean = required_replace(
            clean,
            "It is a close cousin, not an impersonation. Roasted carob is smooth and naturally "
            "sweet, with a gentle toasted warmth of its own. If you come to it expecting carob "
            "rather than chocolate, it wins you over on its own terms.",
            "Carob is naturally sweet, with a gentle toasted warmth of its own. If you come to "
            "it expecting carob rather than chocolate, it wins you over on its own terms.",
            "Carob Story taste answer",
        )
        clean = required_replace(
            clean,
            "Each product label lists its exact ingredients. Maple Moon's carob is slow-roasted "
            "and milled with cacao butter.",
            "Each product label lists its exact ingredients.",
            "Carob Story ingredient answer",
        )
        clean = re.sub(
            r"\s*<details>\s*<summary>Where is it made\?.*?</details>\s*",
            "\n",
            clean,
            count=1,
            flags=re.I | re.S,
        )

    if alias == "shop.html":
        replacements = (
            (
                "The full-size 90g bar, six flavours. Naturally sweet carob milled with cacao butter.",
                "The full-size 90g bar, six flavours. Naturally sweet carob.",
                "Shop Bars introduction",
            ),
            (
                "Dehydrated banana coated in smooth carob. The newest moon in the sky.",
                "Dehydrated banana coated in carob. The newest moon in the sky.",
                "Shop Bananas introduction",
            ),
            (
                "d:'Slow-roasted hazelnut folded through smooth carob.'",
                "d:'Roasted hazelnut folded through carob.'",
                "Shop Roasted Hazelnut description",
            ),
            (
                "d:'Roasted hazelnut in a smooth carob crescent.'",
                "d:'Roasted hazelnut in a carob crescent.'",
                "Shop Roasted Hazelnut Moon description",
            ),
            (
                "d:'Toasted almond in a smooth carob crescent.'",
                "d:'Toasted almond in a carob crescent.'",
                "Shop Almond Moon description",
            ),
            (
                "d:'Roasted hazelnut and Medjool dates in smooth carob.'",
                "d:'Roasted hazelnut and Medjool dates in carob.'",
                "Shop Hazelnut Eclipse Bite description",
            ),
        )
        for old, new, label in replacements:
            clean = required_replace(clean, old, new, label)

    if alias == "our-story.html":
        clean = required_replace(
            clean,
            '<meta name="description" content="Carli and Dylan make carob bars in small batches '
            'from Australian-grown carob, milled with cacao butter, on the far north coast of NSW.">',
            "",
            "Our Story unsupported description metadata",
        )
        clean = required_replace(
            clean,
            "<span>The makers</span><span>Australian carob</span>"
            "<span>Personal profiles pending</span>",
            "<span>The makers</span><span>Australian carob</span>",
            "Our Story pending founder signal",
        )

    if alias == "faq.html":
        replacements = (
            (
                "answer:'Carob comes from a tree-grown pod, not a bean. Maple Moon uses "
                "Australian-grown carob, slow-roasted and milled with cacao butter.'",
                "answer:'Carob comes from a tree-grown pod, not a bean. Maple Moon uses "
                "Australian-grown carob.'",
                "FAQ carob definition",
            ),
            (
                "    {id:'why-cacao-butter',category:'carob',question:'Why does Maple Moon use "
                "cacao butter?',answer:'Maple Moon mills its slow-roasted carob with cacao "
                "butter. Refer to the individual product page and label for its full ingredient "
                "list.',keywords:['ingredients','label','product page']},\n",
                "",
                "FAQ unsupported cacao-butter answer",
            ),
            (
                "answer:'Maple Moon uses Australian-grown carob. The pods are slow-roasted and "
                "milled in small batches on the NSW far north coast.'",
                "answer:'Maple Moon uses Australian-grown carob.'",
                "FAQ carob sourcing answer",
            ),
            (
                "Store details are being confirmed and will be added as they are verified.",
                "",
                "FAQ purchase-location pending note",
            ),
        )
        for old, new, label in replacements:
            clean = required_replace(clean, old, new, label)

    if alias == "stockists.html":
        pattern = re.compile(
            r"\s*<aside\b(?=[^>]*\bclass=[\"'][^\"']*\bst-map-panel\b[^\"']*[\"'])"
            r"[^>]*>.*?</aside>\s*",
            re.I | re.S,
        )
        clean, count = pattern.subn("\n\n      ", clean, count=1)
        if count != 1:
            raise BuildError("clean Stockists map panel changed before CV-067 exclusion")
        clean = required_replace(
            clean,
            '<div class="st-finder-shell">',
            '<div class="st-finder-shell st-finder-shell--clean">',
            "clean Stockists single-column finder hook",
        )
        clean = required_replace(
            clean,
            "</head>",
            """<style id="vis03c-clean-stockists-layout">
.st-finder-shell.st-finder-shell--clean{grid-template-columns:minmax(0,1fr)}
.st-finder-shell.st-finder-shell--clean .st-results-panel{grid-column:1 / -1}
</style>
</head>""",
            "clean Stockists single-column finder layout",
        )
        clean = required_replace(
            clean,
            "<span>204 parsed · 7 need confirmation</span>",
            "<span>204 directory entries</span>",
            "clean Stockists reviewer-safe directory wording",
        )

    lower = clean.lower()
    for claim in CLEAN_FORBIDDEN_CLAIMS:
        if claim in lower:
            raise BuildError(f"clean {alias} retained unsupported claim: {claim}")

    for section_id in CLEAN_SECTION_EXCLUSIONS.get(alias, ()):
        if re.search(rf'\bid=["\']{re.escape(section_id)}["\']', clean, re.I):
            raise BuildError(f"clean {alias} retained excluded section: {section_id}")
    return re.sub(r"\n{3,}", "\n\n", clean).rstrip() + "\n"


def annotate_page(clean_text: str) -> str:
    if "</head>" not in clean_text or "</body>" not in clean_text:
        raise BuildError("page lacks head/body insertion points")
    annotated = clean_text.replace(
        "</head>",
        '<link rel="stylesheet" href="review-mode.css">\n</head>',
        1,
    )
    annotated = annotated.replace(
        "</body>",
        '<script src="review-mode.js"></script>\n</body>',
        1,
    )
    return annotated


def assert_vis03c02_evidence(clean_text: str, annotated_text: str, alias: str) -> None:
    if alias == "homepage.html":
        for mode, page_text in (("clean", clean_text), ("annotated", annotated_text)):
            if (
                page_text.count(CV028_RITUAL_HEADING) != 1
                or page_text.count(CV031_EVENING_TILE) != 1
            ):
                raise BuildError(f"{mode} Homepage failed CV-028/CV-031 evidence guard")
        review_section = re.compile(
            r"<section\b(?=[^>]*\bid=[\"']reviews[\"'])[^>]*>.*?</section>",
            re.I | re.S,
        )
        if review_section.search(clean_text):
            raise BuildError("clean Homepage retained CV-035/CV-036 testimonials")
        annotated_reviews = review_section.findall(annotated_text)
        if (
            len(annotated_reviews) != 1
            or annotated_reviews[0].count("Customer name held pending consent") != 3
            or "Consent and final testimonial selection pending before go-live."
            not in annotated_reviews[0]
            or any(name in annotated_reviews[0] for name in ("Natasha", "Janice", "Acacia"))
        ):
            raise BuildError("annotated Homepage failed CV-035/CV-036 consent guard")

    if alias == "faq.html":
        expected_first = {
            "clean": CV055_CLEAN_FIRST_FAQ,
            "annotated": CV055_ANNOTATED_FIRST_FAQ,
        }
        for mode, page_text in (("clean", clean_text), ("annotated", annotated_text)):
            if page_text.count(expected_first[mode]) != 1:
                raise BuildError(f"{mode} FAQ changed CV-055 first question")
            if (
                "is-carob-caffeine-free" in page_text
                or re.search(r"\bcaffeine\b", page_text, re.I)
            ):
                raise BuildError(f"{mode} FAQ failed CV-057 or added CV-056 wording")


def review_script() -> str:
    return """(() => {
  const reviewMode = new URLSearchParams(window.location.search).get('review') === '1';
  document.documentElement.classList.toggle('review-mode', reviewMode);
  if (!reviewMode) return;

  const reviewHref = (rawHref) => {
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('http') || rawHref.startsWith('//')) return null;
    const next = new URL(rawHref, window.location.href);
    next.searchParams.set('review', '1');
    return `${next.pathname}${next.search}${next.hash}`;
  };

  const keepReview = (link) => {
    const nextHref = reviewHref(link.getAttribute('href'));
    if (nextHref && link.getAttribute('href') !== nextHref) link.setAttribute('href', nextHref);
  };

  const states = {
    review: { label: 'Needs review', className: 'review' },
    placeholder: { label: 'Placeholder or external input', className: 'placeholder' },
    replace: { label: 'Technical fix required', className: 'replace' }
  };

  const banner = document.createElement('aside');
  banner.className = 'review-banner';
  banner.setAttribute('aria-label', 'Maple Moon review key');
  banner.innerHTML = `
    <div class="review-banner__intro">
      <strong>Annotated review</strong>
      <span>Dots identify decisions, external inputs, and technical fixes.</span>
    </div>
    <div class="review-banner__legend">
      ${Object.entries(states).map(([key, state]) => `
        <span class="review-legend-item"><i class="review-dot review-dot--${state.className}" aria-hidden="true"></i>${state.label}</span>
      `).join('')}
    </div>`;
  document.body.prepend(banner);

  document.querySelectorAll('a[href]').forEach(keepReview);
  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.target.matches('a[href]')) {
        keepReview(mutation.target);
      }
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node.matches('a[href]')) keepReview(node);
        node.querySelectorAll('a[href]').forEach(keepReview);
      });
    });
  }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['href'] });
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (link) keepReview(link);
    const shopButton = event.target.closest('#pdpAdd');
    if (!shopButton || !/shop now/i.test(shopButton.textContent || '')) return;
    const rangeLink = document.getElementById('pdpView');
    const target = rangeLink && reviewHref(rangeLink.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.href = target;
  });

  const page = window.location.pathname.split('/').pop() || 'homepage.html';
  const markers = {
    'homepage.html': [
      ['header', 'replace'], ['#top', 'review'], ['#range', 'review'],
      ['#carob', 'review'], ['#why', 'review'], ['#ritual', 'review'],
      ['#story', 'review'], ['#who', 'placeholder'], ['#stockists', 'placeholder'],
      ['#reviews', 'placeholder'], ['#sampler', 'review'], ['#trust', 'review'],
      ['footer', 'replace']
    ],
    'carob-story.html': [
      ['header', 'replace'], ['#carob-story .hero', 'review'],
      ['#carob-and-cacao', 'review'], ['#pod-to-bar', 'review'],
      ['#gallery', 'review'], ['#faq', 'review'], ['footer', 'replace']
    ],
    'shop.html': [
      ['header', 'replace'], ['.sp-head', 'placeholder'], ['#catalogue', 'review'],
      ['#bars', 'placeholder'], ['#moons', 'placeholder'], ['#bites', 'placeholder'],
      ['#elixirs', 'placeholder'], ['#bananas', 'placeholder'], ['#powder', 'placeholder'],
      ['footer', 'replace']
    ],
    'our-story.html': [
      ['header', 'replace'], ['.os-story-hero', 'review'], ['#story', 'review'],
      ['#founders', 'placeholder'], ['#ingredient', 'review'], ['#carob', 'review'],
      ['#source', 'review'], ['#craft', 'review'], ['#place', 'review'],
      ['#range', 'review'], ['#shop', 'review'], ['footer', 'replace']
    ],
    'stockists.html': [
      ['header', 'replace'], ['.sp-head', 'placeholder'], ['.st-finder', 'placeholder'],
      ['.st-results-panel', 'placeholder'], ['.st-map-wrap', 'review'],
      ['footer', 'replace']
    ],
    'faq.html': [
      ['header', 'replace'], ['.faq-hero', 'review'], ['.faq-workspace', 'review'],
      ['.support-panel', 'review'], ['footer', 'replace']
    ]
  };

  (markers[page] || []).forEach(([selector, stateKey]) => {
    const state = states[stateKey];
    document.querySelectorAll(selector).forEach((target) => {
      if (!state || target.querySelector(':scope > .review-target-dot')) return;
      target.classList.add('review-target');
      const dot = document.createElement('span');
      dot.className = `review-dot review-dot--${state.className} review-target-dot`;
      dot.setAttribute('role', 'img');
      dot.setAttribute('aria-label', state.label);
      dot.title = state.label;
      target.prepend(dot);
    });
  });
})();
"""


def review_index() -> str:
    cards = [
        ("01", "Homepage", "homepage.html"),
        ("02", "Carob Story", "carob-story.html"),
        ("03", "Shop", "shop.html"),
        ("04", "Our Story", "our-story.html"),
        ("05", "Stockists", "stockists.html"),
        ("06", "FAQ", "faq.html"),
    ]
    links = "\n".join(
        f'      <li><a href="{href}?review=1"><span>{number}</span>{title}</a></li>'
        for number, title, href in cards
    )
    return f"""<!doctype html>
<html lang="en-AU">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>Maple Moon | Annotated local review</title>
  <link rel="preconnect" href="https://use.typekit.net">
  <link rel="stylesheet" href="https://use.typekit.net/dvz0xjs.css">
  <style>
    :root {{ color-scheme: light; --ink:#18242c; --cream:#f4eedf; --gold:#c99b52; }}
    * {{ box-sizing:border-box; }}
    body {{ margin:0; min-height:100vh; background:var(--cream); color:var(--ink);
      font-family:"neue-haas-grotesk-display","Helvetica Neue",sans-serif; }}
    main {{ width:min(980px,calc(100% - 32px)); margin:0 auto; padding:clamp(48px,9vw,110px) 0; }}
    .eyebrow {{ text-transform:uppercase; letter-spacing:.18em; font-size:.72rem; }}
    h1 {{ max-width:760px; margin:18px 0 12px; font-family:"freight-display-pro",Georgia,serif;
      font-size:clamp(3rem,8vw,6.5rem); font-weight:400; line-height:.92; }}
    p {{ max-width:680px; line-height:1.6; opacity:.78; }}
    ul {{ list-style:none; padding:0; margin:48px 0 0; display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }}
    a {{ min-height:64px; display:flex; align-items:center; gap:18px; padding:16px 20px; color:inherit;
      text-decoration:none; border:1px solid rgba(24,36,44,.24); background:rgba(255,255,255,.35); }}
    a:hover, a:focus-visible {{ border-color:var(--gold); outline:3px solid rgba(201,155,82,.25); }}
    a span {{ color:var(--gold); font-size:.72rem; letter-spacing:.12em; }}
    .note {{ margin-top:34px; padding-top:18px; border-top:1px solid rgba(24,36,44,.18); font-size:.82rem; }}
    @media (max-width:620px) {{ ul {{ grid-template-columns:1fr; }} }}
  </style>
</head>
<body>
  <main>
    <div class="eyebrow">Pre-dispatch local evidence</div>
    <h1>Annotated review</h1>
    <p>Use these six pages to inspect what is current, provisional, placeholder, or awaiting a decision. This package is not approved for sharing yet.</p>
    <ul>
{links}
    </ul>
    <p class="note">The coloured review key appears at the top of each page. Normal links keep review mode active.</p>
  </main>
</body>
</html>
"""


def sanitized_copy(source: Path, target: Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    suffix = source.suffix.lower()
    if suffix in {".jpg", ".jpeg"}:
        subprocess.run(
            [
                "jpegtran",
                "-copy",
                "none",
                "-optimize",
                "-outfile",
                str(target),
                str(source),
            ],
            check=True,
            capture_output=True,
        )
        return
    if suffix == ".png":
        with Image.open(source) as image:
            sensitive = {"exif", "xmp", "xml", "iptc", "icc_profile"} & set(image.info)
            if not sensitive:
                shutil.copyfile(source, target)
                return
            image.save(target, format="PNG", optimize=False)
        return
    if suffix == ".webp":
        shutil.copyfile(source, target)
        info = subprocess.run(
            ["webpmux", "-info", str(target)],
            check=True,
            capture_output=True,
            text=True,
        ).stdout.lower()
        for feature in ("icc", "exif", "xmp"):
            if feature not in info:
                continue
            stripped = target.with_name(f".{target.name}.{feature}.strip")
            subprocess.run(
                ["webpmux", "-strip", feature, str(target), "-o", str(stripped)],
                check=True,
                capture_output=True,
            )
            stripped.replace(target)
        return
    shutil.copyfile(source, target)


def copy_support(control: dict, clean: Path, annotated: Path) -> None:
    for relative in sorted(control["source_pins"]["copied_support_sha256"]):
        source = SOURCE_ROOT / relative
        if relative in REVIEW_FILES:
            if relative == "review-mode.css":
                data = source.read_bytes()
            else:
                source.read_text(encoding="utf-8")
                data = review_script().encode()
            target = annotated / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(data)
            continue
        for root in (clean, annotated):
            target = root / relative
            sanitized_copy(source, target)
    for relative in sorted(SHARED_FILES):
        source = SHARED_ROOT / relative
        if not source.is_file():
            raise BuildError(f"shared review source missing: {source}")
        for root in (clean, annotated):
            target = root / relative
            target.write_bytes(source.read_bytes())


def manifest_for(root: Path, mode: str, current_control: dict) -> dict:
    files = {}
    for path in sorted(p for p in root.rglob("*") if p.is_file()):
        relative = path.relative_to(root).as_posix()
        if relative == "MANIFEST.json":
            continue
        files[relative] = {
            "sha256": sha256(path),
            "bytes": path.stat().st_size,
        }
    return {
        "schema": "maplemoon-saturday-review/v1",
        "packet_id": CURRENT_PACKET_ID,
        "mode": mode,
        "classification": "networked-local-review",
        "share_ready": False,
        "allowed_external": {
            "stylesheet": ["https://use.typekit.net/dvz0xjs.css"],
            "font_hosts": ["use.typekit.net", "p.typekit.net"],
        },
        "source_lineage": current_source_lineage(current_control),
        "files": files,
    }


def write_manifest(root: Path, mode: str, current_control: dict) -> None:
    payload = (
        json.dumps(
            manifest_for(root, mode, current_control),
            indent=2,
            sort_keys=True,
        )
        + "\n"
    )
    (root / "MANIFEST.json").write_text(payload, encoding="utf-8")


def write_aggregate_manifest(output: Path, current_control: dict) -> None:
    files = {}
    for relative in ("clean/MANIFEST.json", "annotated/MANIFEST.json"):
        path = output / relative
        files[relative] = {"sha256": sha256(path), "bytes": path.stat().st_size}
    payload = {
        "schema": "maplemoon-saturday-review-aggregate/v1",
        "packet_id": CURRENT_PACKET_ID,
        "share_ready": False,
        "source_lineage": current_source_lineage(current_control),
        "files": files,
    }
    (output / "MANIFEST.json").write_text(
        json.dumps(payload, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )


def tree_hashes(root: Path) -> dict[str, str]:
    if not root.is_dir() or root.is_symlink():
        raise BuildError(f"review tree missing or unsafe: {root}")
    return {
        path.relative_to(root).as_posix(): sha256(path)
        for path in sorted(path for path in root.rglob("*") if path.is_file())
    }


def apply_approved_delta(candidate: Path, output: Path) -> None:
    if output.resolve() != DEFAULT_OUTPUT.resolve():
        raise BuildError("approved delta may only target the Saturday staging root")
    candidate_hashes = tree_hashes(candidate)
    current_hashes = tree_hashes(output)
    missing = sorted(APPROVED_DELTA_FILES - candidate_hashes.keys())
    if missing:
        raise BuildError(f"approved candidate is missing owned files: {', '.join(missing)}")
    changed = {
        relative
        for relative in candidate_hashes.keys() | current_hashes.keys()
        if candidate_hashes.get(relative) != current_hashes.get(relative)
    }
    forbidden = sorted(changed - APPROVED_DELTA_FILES)
    if forbidden:
        raise BuildError(
            "candidate changes forbidden Saturday paths: " + ", ".join(forbidden)
        )
    for relative in sorted(APPROVED_DELTA_FILES):
        source = candidate / relative
        target = output / relative
        if source.is_symlink() or target.is_symlink():
            raise BuildError(f"refusing symlink during approved delta: {relative}")
        target.write_bytes(source.read_bytes())
    final_hashes = tree_hashes(output)
    if final_hashes != candidate_hashes:
        raise BuildError("approved delta did not reproduce the verified candidate tree")
    print(
        f"PASS applied approved {CURRENT_PACKET_ID} delta: "
        + ", ".join(sorted(changed))
    )


def build(output: Path) -> None:
    control = packet_control(BASE_PACKET)
    update_control = packet_control(UPDATE_PACKET)
    current_control = packet_control(CURRENT_PACKET)
    if current_control.get("packet_id") != CURRENT_PACKET_ID:
        raise BuildError("current packet provenance does not match builder packet ID")
    verify_inputs(control, update_control, current_control)
    reset_output(output)
    clean = output / "clean"
    annotated = output / "annotated"
    clean.mkdir()
    annotated.mkdir()

    for alias, source in PAGE_SOURCES.items():
        source_text = source.read_text(encoding="utf-8")
        transformed_text = transform_page(source_text, alias)
        clean_text = clean_page(transformed_text, alias)
        annotated_text = annotate_page(transformed_text)
        assert_page_regressions(clean_text, alias)
        assert_page_regressions(annotated_text, alias)
        assert_vis03c02_evidence(clean_text, annotated_text, alias)
        if alias == "homepage.html":
            if clean_text.count('<span class="mo">Night-time</span>') != 1:
                raise BuildError("clean Homepage lacks the single CV-034 label")
            if annotated_text.count('<span class="mo">Night-time</span>') != 1:
                raise BuildError("annotated Homepage lacks the single CV-034 label")
        if alias == "our-story.html":
            removed_sentence = (
                "We make carob because we love what it is, not what it stands in for."
            )
            retained_sentence = (
                "Naturally sweet, caffeine free, and grown right here in Australia."
            )
            for mode, page_text in (("clean", clean_text), ("annotated", annotated_text)):
                if removed_sentence in page_text or page_text.count(retained_sentence) != 1:
                    raise BuildError(f"{mode} Our Story failed CV-043/CV-044/CV-045")
        if alias == "faq.html":
            expected_link = (
                '<a href="https://maplemoon.com.au/shipping-returns/">'
                '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
                '<path d="M4 7h11v10H4z"/><path d="M15 10h3l2 3v4h-5z"/>'
                '<path d="m9 12-2-2 2-2"/><path d="M7 10h5"/>'
                "</svg>Shipping &amp; returns</a>"
            )
            for mode, page_text in (("clean", clean_text), ("annotated", annotated_text)):
                if page_text.count(expected_link) != 1 or "pending-policy-details" in page_text:
                    raise BuildError(f"{mode} FAQ failed CV-066")
        if alias == "stockists.html":
            if (
                "Not a live map" in clean_text
                or '<aside class="st-map-panel"' in clean_text
            ):
                raise BuildError("clean Stockists retained the CV-067 map panel")
            if (
                clean_text.count("st-finder-shell--clean") != 3
                or clean_text.count("204 directory entries") != 1
                or "204 parsed · 7 need confirmation" in clean_text
            ):
                raise BuildError("clean Stockists failed visual-QA correction")
            if (
                annotated_text.count("Not a live map") != 1
                or annotated_text.count('<aside class="st-map-panel"') != 1
                or annotated_text.count("204 parsed · 7 need confirmation") != 1
                or "st-finder-shell--clean" in annotated_text
            ):
                raise BuildError("annotated Stockists changed during visual-QA correction")
        (clean / alias).write_text(clean_text, encoding="utf-8")
        (annotated / alias).write_text(
            annotated_text,
            encoding="utf-8",
        )

    copy_support(control, clean, annotated)
    (annotated / "index.html").write_text(review_index(), encoding="utf-8")
    write_manifest(clean, "clean", current_control)
    write_manifest(annotated, "annotated", current_control)
    write_aggregate_manifest(output, current_control)


def self_test() -> None:
    with tempfile.TemporaryDirectory(prefix="maplemoon-vis01c-selftest-") as temp:
        base = Path(temp)
        changed = base / "changed-input.html"
        changed.write_text("changed", encoding="utf-8")
        output = base / "must-not-exist"
        try:
            assert_hash(changed, "0" * 64, "negative-self-test")
        except BuildError:
            if output.exists():
                raise BuildError("negative self-test wrote output")
        else:
            raise BuildError("negative self-test did not fail")
    print("PASS changed pinned input fails before output")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument(
        "--apply-approved-delta",
        type=Path,
        metavar="BUILT_ROOT",
        help=(
            "apply only the fail-closed VIS-03C-03 lineage outputs and manifests "
            "from a verified full build"
        ),
    )
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    try:
        if args.self_test:
            self_test()
        elif args.apply_approved_delta:
            apply_approved_delta(args.apply_approved_delta, args.output)
        else:
            build(args.output)
            print(f"PASS built deterministic review roots: {args.output.resolve()}")
        return 0
    except (BuildError, OSError, ValueError, KeyError, json.JSONDecodeError) as exc:
        print(f"FAIL {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
