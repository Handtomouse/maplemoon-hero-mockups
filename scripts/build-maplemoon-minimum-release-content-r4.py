#!/usr/bin/env python3
"""Build the non-overwriting MapleMoon R4 content-only release candidate."""

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


REPO = Path(__file__).resolve().parents[1]
PRIVATE_BUILDER = REPO / "scripts/build-maplemoon-wip-preview.py"
EXPECTED = {
    REPO / "_wip/homepage_real_1_lead_photo.WIP.html": "423184b66a18a2e1eb44bf547b6392ef1bc26be982309846c949c4e971251c04",
    REPO / "_wip/shop.WIP.html": "b444b0da4f5778f7434c6343854e3cdf48d1a88b038c7863a2ef1d46b5e0cbac",
    REPO / "_wip/our-story.WIP.html": "6beef3f9449804e800ad7883c311c957637d12a5e05c69beb7ed912e49b36e23",
    REPO / "_wip/carob-story.WIP.html": "c6b545bc4983960e4ce41bc0bc3a4bdf6ae8432dd5fdbc8e6c26980592d3f2d0",
    REPO / "_wip/faq.WIP.html": "3b1156324e7c9156b995bafdc036a28da83be5e7890ba12cf8d14868f49cdcc4",
    REPO / "_wip/stockists.WIP.html": "dbff73357e3425005db5fc7f0e0e589ed8a70b9dbcb62f31cab667cf37409f37",
    PRIVATE_BUILDER: "803c439e0e937309b7ada0c3f886983908c3cc6aed64f92e38c57fd656707808",
    Path("/Users/handtomouse/maplemoon_build_20260813/pure-carob-bar.html"): "015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65",
}

QUOTES = (
    "With a huge reaction to high histamine food + being dairy &amp; gluten free, your two carob bars (almond/mint) are life saving for me!",
    "Already given my daughter, loves it and we love it because it's nut free, dairy free!!",
    "I'm absolutely LOVING everything you are doing with your carob. I personally am OBSESSED with carob. I far prefer it over cacao... in fact in most of my recipes I use it... even when I say 'add dark chocolate' I stir carob through it myself.",
)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def assert_pins() -> None:
    failures = []
    for path, expected in EXPECTED.items():
        actual = sha256(path) if path.is_file() else "MISSING"
        if actual != expected:
            failures.append(f"{path}: expected {expected}, got {actual}")
    if failures:
        raise RuntimeError("Pinned input failure:\n" + "\n".join(failures))


def replace_count(text: str, old: str, new: str, count: int = 1) -> str:
    actual = text.count(old)
    if actual != count:
        raise RuntimeError(f"Expected {count} occurrence(s), found {actual}: {old[:120]!r}")
    return text.replace(old, new)


def regex_count(text: str, pattern: str, replacement: str, count: int = 1, flags: int = 0) -> str:
    updated, actual = re.subn(pattern, replacement, text, count=count, flags=flags)
    if actual != count:
        raise RuntimeError(f"Expected {count} regex replacement(s), found {actual}: {pattern[:120]!r}")
    return updated


def remove_cart_button(text: str) -> str:
    return regex_count(
        text,
        r"\s*<button\b[^>]*class=\"[^\"]*(?:wf-pcart|sp-cart|os-cart)[^\"]*\"[^>]*>.*?</button>",
        "",
        flags=re.S,
    )


def remove_mock_cart_refs(text: str) -> str:
    text = re.sub(r"\s*<link\b[^>]*href=\"/mock-cart\.css\"[^>]*>", "", text)
    text = re.sub(r"\s*<script\b[^>]*src=\"/mock-cart\.js\"[^>]*></script>", "", text)
    return text


def transform_home(text: str) -> str:
    text = remove_cart_button(remove_mock_cart_refs(text))
    text = replace_count(
        text,
        '  document.documentElement.classList.toggle("mm-cart-qa", params.get("cart-qa") === "1");\n',
        "",
        count=0,
    ) if 'document.documentElement.classList.toggle("mm-cart-qa"' in text else text

    for old, new in (
        ("Australian organic carob bars, moons, bites and elixirs.", "Australian organic carob bars."),
        ("Carob bars, moons, bites and elixirs made from Australian organic carob.", "Carob bars made from Australian organic carob."),
        ("Maple Moon makes Australian organic carob bars, moons, bites and elixirs.", "Maple Moon makes Australian organic carob bars."),
    ):
        text = text.replace(old, new)

    text = regex_count(
        text,
        r'\n\s*<button class="wf-tab" type="button" data-cat="(?:bananas|moons|elixirs)".*?</button>',
        "",
        count=3,
    )

    cat_match = re.search(r"  var CAT=\{\n    bars:(\[\n.*?\n    \]),\n    moons:", text, re.S)
    if not cat_match:
        raise RuntimeError("Home bars catalogue block not found")
    bars = cat_match.group(1)
    text = regex_count(
        text,
        r"  var RANGE_COPY=\{.*?\n  \};\n  // Product prices",
        "  var RANGE_COPY={bars:'Carob Bars: Smooth, naturally sweet bites for calm cravings.'};\n  // Product prices",
        flags=re.S,
    )
    text = regex_count(
        text,
        r"  var CAT=\{.*?\n  \};\n  var PRICE_STATE=",
        "  var CAT={\n    bars:" + bars + "\n  };\n  var PRICE_STATE=",
        flags=re.S,
    )
    text = regex_count(text, r"  var PRICE_STATE=\{.*?\n  \};\n  var SIZES=", "  var PRICE_STATE={bars:{priced:true,label:'Available now'}};\n  var SIZES=", flags=re.S)
    text = regex_count(text, r"  var SIZES=\{.*?\n  \};\n", "  var SIZES={bars:[]};\n", flags=re.S)
    text = replace_count(text, "  var CAT_ORDER=['bars','bananas','moons','elixirs'];", "  var CAT_ORDER=['bars'];")
    text = replace_count(text, "  var CAT_LABEL={bars:'Selected bar',moons:'Selected moon',elixirs:'Selected elixir',bananas:'Selected banana'};", "  var CAT_LABEL={bars:'Selected bar'};")
    text = replace_count(text, "  var CAT_FORMAT={bars:'Carob Bars',moons:'Carob Moons',elixirs:'Carob Elixirs',bananas:'Carob Bananas'};", "  var CAT_FORMAT={bars:'Carob Bars'};")
    text = replace_count(text, "  var CAT_SHOP_TARGET={bars:'/shop#bars',moons:'/shop#moons',elixirs:'/shop#elixirs',bananas:'/shop#bananas'};", "  var CAT_SHOP_TARGET={bars:'/shop#bars'};")

    text = regex_count(
        text,
        r'<section class="wrap mm-stockists" id="stockists".*?</section>',
        '<section class="wrap mm-stockists" id="stockists" aria-labelledby="stockists-title"><span class="qkick">Stockists</span><h2 id="stockists-title" class="lux-hd">Find a stockist</h2><p>Search for Maple Moon near you.</p><a class="wf-pill" href="/stockists">Search stockists <span aria-hidden="true">→</span></a></section>',
        flags=re.S,
    )
    text = replace_count(text, '<span class="qkick">Reviews · consent pending</span>', '<span class="qkick">Reviews</span>')
    text = replace_count(text, '<p>Real experiences, shared with care. These WIP quotes remain noindexed until Carli confirms consent.</p>', '')
    text = replace_count(text, '<div class="mm-review-note">Consent and final testimonial selection pending before go-live.</div>', '')
    text = replace_count(text, '<p>Founder portraits and final story details remain in review.</p>', '')
    text = regex_count(text, r'<div class="mm-pending-media">Carli<br>portrait pending</div>', '', count=1)
    text = regex_count(text, r'<div class="mm-pending-media">Dylan<br>portrait pending</div>', '', count=1)
    text = replace_count(text, '<span>Final delivery terms pending</span>', '<span>Orders ship Monday and Tuesday via Australia Post. Standard shipping $16.95. Free shipping over $99.</span>')
    text = regex_count(text, r'\s*<div class="wf-ti"><svg.*?<strong>Checkout</strong>.*?</div></div>', '', flags=re.S)
    text = replace_count(text, '<span>200+ locations across Australia</span>', '<span>Find Maple Moon near you</span>')
    text = regex_count(text, r'\n\s*<div class="wf-nl">.*?</div>\n', '\n', flags=re.S)

    for quote in QUOTES:
        if text.count(quote) != 1:
            raise RuntimeError(f"Home quote was not preserved exactly once: {quote[:80]}")
    for label in ("Maple Moon customer 01, Sydney", "Maple Moon customer 02", "Maple Moon customer 03"):
        if text.count(label) != 1:
            raise RuntimeError(f"Anonymous review label count failed: {label}")
    return text


def transform_shop(text: str) -> str:
    text = remove_cart_button(text)
    for old, new in (
        ("Australian organic carob bars, moons, bites, elixirs and carob bananas.", "Australian organic carob bars."),
        ("Browse carob bars, moons, bites, elixirs and carob bananas.", "Browse the six Maple Moon carob bars."),
        ("Maple Moon makes Australian organic carob bars, moons, bites and elixirs.", "Maple Moon makes Australian organic carob bars."),
        ("Australian organic carob bars, moons, bites and elixirs.", "Australian organic carob bars."),
        ("Bars, moons, bites, elixirs and carob bananas. All made from Australian organic carob, naturally sweet with nothing added.", "Six carob bars made from Australian organic carob, naturally sweet with nothing added."),
    ):
        text = text.replace(old, new)
    text = replace_count(
        text,
        '<div class="sp-flag">Bars, bites, elixirs, powder <span class="amp">&amp;</span> bananas priced &middot; selected moon products by enquiry</div>',
        '<div class="sp-flag">Orders ship Monday and Tuesday via Australia Post. Standard shipping $16.95. Free shipping over $99.</div>',
    )
    text = regex_count(
        text,
        r'<aside class="purchase-guide".*?</aside>',
        '<aside class="purchase-guide" data-purchase-legend aria-label="How to enquire"><strong>Direct enquiry</strong><span>Every listed bar is available by email enquiry.</span></aside>',
        flags=re.S,
    )
    text = regex_count(text, r'\s*<p class="cart-summary".*?</p>', '', flags=re.S)
    text = regex_count(text, r'\s*<nav class="wrap sp-cats" aria-label="Categories">.*?</nav>', '', flags=re.S)
    for section_id in ("moons", "bites", "elixirs", "bananas", "powder"):
        text = regex_count(text, rf'\s*<section class="wrap sp-sec" id="{section_id}">.*?</section>', '', flags=re.S)

    cat_match = re.search(r"  var CAT=\{\n    bars:(\[\n.*?\n    \]),\n    moons:", text, re.S)
    if not cat_match:
        raise RuntimeError("Shop bars catalogue block not found")
    bars = cat_match.group(1)
    text = regex_count(text, r"  var ECLIPSE_SIZES=.*?;\n  var MOON_TIERS=.*?;\n", "")
    text = regex_count(
        text,
        r"  var CAT=\{.*?\n  \};\n  var DIET=",
        "  var CAT={\n    bars:" + bars + "\n  };\n  var DIET=",
        flags=re.S,
    )
    text = replace_count(text, "  var PRICED={bars:true,elixirs:true,moons:true,bites:true,bananas:true,powder:true};", "  var PRICED={bars:true};")
    text = regex_count(
        text,
        r"      var action=priced\?.*?;\n",
        "      var action='<a class=\"add\" aria-label=\"Enquire about '+cleanName+'\" href=\"mailto:info@maplemoon.com.au?subject=Enquiry%20about%20'+encodeURIComponent(p.n)+'\">Enquire</a>';\n",
    )
    text = regex_count(text, r"  var cart=\{.*?\n  renderCart\(\);\n", "", flags=re.S)
    return text


def transform_our_story(text: str) -> str:
    text = remove_cart_button(text)
    text = replace_count(text, '<span>Personal profiles pending</span>', '')
    text = regex_count(text, r'\s*<div class="os-founder-note__portrait os-founder-placeholder".*?</div>', '', count=2, flags=re.S)
    return text


def transform_faq(text: str) -> str:
    text = remove_cart_button(text)
    old = "{id:'is-there-any-caffeine',category:'carob',question:'Is there any caffeine?',answer:'No carob is naturally sweet and we use stimulant free ingredients',keywords:['caffeine','stimulant','ingredients'],popular:true}"
    new = "{id:'does-carob-contain-caffeine',category:'carob',question:'Does carob contain caffeine?',answer:'Carob itself is naturally caffeine-free. Its mellow, naturally sweet flavour works beautifully in bars, baking and warm drinks. Maple Moon recipes vary, so please check the individual product label for the full ingredient list.',keywords:['caffeine','carob','ingredients','label'],popular:true}"
    return replace_count(text, old, new)


def transform_stockists(text: str) -> str:
    text = remove_cart_button(text)
    text = replace_count(
        text,
        'Find Maple Moon Australian carob at 200+ stockists across Australia. Directory details are being confirmed.',
        'Find Maple Moon Australian carob stockists across Australia.',
        count=2,
    )
    for old, new in (
        ('Find Maple Moon at 200+ stockists across Australia. Directory details are being confirmed before launch.', 'Find Maple Moon stockists across Australia.'),
        ('<p>Find Maple Moon at 200+ health food stores, pharmacies and grocers across Australia.</p>', '<p>Search for Maple Moon stockists across Australia.</p>'),
        ('<p class="sub">Search the current Maple Moon stockist directory by store, suburb, postcode or state. Seven entries still need client confirmation.</p>', '<p class="sub">Search the Maple Moon stockist directory by store, suburb, postcode or state.</p>'),
        ('<small>Search the source directory; store-type labels are provisional pending client sign-off.</small>', '<small>Search by store, suburb, postcode or state.</small>'),
        (' aria-describedby="stockistDirectoryStatus"', ' aria-describedby="stockistCount"'),
        ('<p id="stockistEmptyCopy">Try a broader search or clear the filters while the remaining store details are confirmed.</p>', '<p id="stockistEmptyCopy">Try a broader search or clear the filters.</p>'),
        ("return \"Try a broader search or clear the filters.\";", "return \"Try a broader search or clear the filters.\";"),
        ("count.textContent=shown.length?(\"Showing \"+visible.length+\" of \"+shown.length+\" stockists. 204 total; 7 need client confirmation.\"):(\"No stockists shown. 204 total; 7 need client confirmation.\");", "count.textContent=shown.length?(\"Showing \"+visible.length+\" of \"+shown.length+\" stockists.\"):\"No stockists shown.\";"),
    ):
        if old != new:
            text = replace_count(text, old, new)
    text = regex_count(text, r'\s*<div class="st-proof-row".*?</div>', '', flags=re.S)
    text = regex_count(text, r'\s*<p class="st-filter-label st-type-label".*?</div>', '', flags=re.S)
    text = regex_count(text, r'\s*<p class="st-directory-status".*?</div>', '', flags=re.S)
    text = regex_count(text, r'\s*<section class="wrap st-news".*?</section>', '', flags=re.S)
    text = replace_count(text, '<a class="st-empty-link" href="/shop">Shop online</a>', '<a class="st-empty-link" href="/shop">Browse the range</a>')
    text = replace_count(text, '<div><h3>Can\'t find a listed store?</h3><p>Shop online while store details are confirmed.</p></div>', '<div><h3>Can\'t find a listed store?</h3><p>Browse the range, then enquire directly.</p></div>')
    text = regex_count(
        text,
        r"  function badgeHtml\(item\)\{.*?\n  \}\n  function resultCard",
        "  function badgeHtml(item){\n    var parts={place:\"\",kind:\"\",address:\"\",note:\"\"};\n    if(item.state===\"UNKNOWN\"||!item.address||!item.postcode){\n      parts.place='<span class=\"pending\">Location details unavailable</span>';\n    }else if(item.type===\"Online / delivery\"||item.state===\"Online\"){\n      parts.place='<span class=\"online\">Online</span>';\n    }else{\n      parts.place='<strong>'+text(item.area)+'</strong><span>, '+text(item.state)+'</span>';\n      parts.address='<address class=\"st-result-address\">'+text(item.address)+'</address>';\n    }\n    return parts;\n  }\n  function resultCard",
        flags=re.S,
    )
    text = replace_count(text, 'var filters={state:"ALL",type:"ALL",review:"ALL",area:"",query:""};', 'var filters={state:"ALL",type:"ALL",area:"",query:""};')
    text = replace_count(text, 'filters={state:"ALL",type:"ALL",review:"ALL",area:', 'filters={state:"ALL",type:"ALL",area:', count=2)
    text = replace_count(text, '  var pendingFilter=document.querySelector(\'[data-filter="review"][data-value="PENDING"]\');\n', '')
    text = replace_count(text, '    if(filters.review==="PENDING"&&item.state!=="UNKNOWN")return false;\n', '')
    text = replace_count(text, '    if(kind==="review"&&value==="PENDING")return "Needs confirmation";\n', '')
    text = regex_count(text, r'    if\(pendingFilter\)\{.*?\n    \}\n', '', flags=re.S)
    text = replace_count(text, '    if(filters.review!=="ALL")items.push({kind:"review",label:labelFor("review",filters.review)});\n', '')
    text = replace_count(text, '    if(filters.review==="PENDING")bits.push("needs-confirmation");\n', '')
    text = replace_count(text, '      if(remove.dataset.remove==="review")filters.review="ALL";\n', '')
    return text


def transform_pure(text: str) -> str:
    text = remove_cart_button(remove_mock_cart_refs(text))
    text = replace_count(text, '  document.documentElement.classList.toggle("mm-cart-qa", params.get("cart-qa") === "1");\n', '')
    return text


TRANSFORMS = {
    "homepage.html": transform_home,
    "shop.html": transform_shop,
    "our-story.html": transform_our_story,
    "carob-story.html": remove_cart_button,
    "faq.html": transform_faq,
    "stockists.html": transform_stockists,
    "products/pure-carob-bar.html": transform_pure,
}


def validate_candidate(root: Path) -> dict[str, object]:
    pages = {name: (root / name).read_text(encoding="utf-8") for name in TRANSFORMS}
    combined = "\n".join(pages.values())
    home = pages["homepage.html"]
    shop = pages["shop.html"]
    our_story = pages["our-story.html"]
    faq = pages["faq.html"]
    stockists = pages["stockists.html"]

    failures = []
    checks = {
        "pages": len(pages),
        "forms": len(re.findall(r"<form\b", combined, re.I)),
        "cart_controls": len(re.findall(r"data-(?:mm-)?cart-toggle|data-add-to-cart", combined, re.I)),
        "mock_cart_refs": len(re.findall(r"(?:href|src)=\"/mock-cart\.(?:js|css)\"", combined, re.I)),
        "home_review_sections": home.count('class="wrap mm-reviews"'),
        "home_quotes": sum(home.count(quote) for quote in QUOTES),
        "home_founder_cards": home.count('class="mm-founder-card"'),
        "our_story_founder_cards": our_story.count('class="os-founder-note"'),
        "our_story_placeholders": len(re.findall(r'<div\b[^>]*class="[^"]*os-founder-placeholder', our_story)),
        "faq_question": faq.count("Does carob contain caffeine?"),
        "faq_answer": faq.count("Carob itself is naturally caffeine-free. Its mellow, naturally sweet flavour works beautifully in bars, baking and warm drinks. Maple Moon recipes vary, so please check the individual product label for the full ingredient list."),
        "stockist_rows": len(re.findall(r'^    \{name:', stockists, re.M)),
        "stockist_unknown": len(re.findall(r'state:"UNKNOWN"', stockists)),
        "shop_bar_rows": len(re.findall(r"^      \{n:.*img:'bar_", shop, re.M)),
        "shipping_line": shop.count("Orders ship Monday and Tuesday via Australia Post. Standard shipping $16.95."),
        "free_shipping_99": shop.count('<div class="sp-flag">Orders ship Monday and Tuesday via Australia Post. Standard shipping $16.95. Free shipping over $99.</div>'),
    }
    expected = {
        "forms": 0,
        "cart_controls": 0,
        "mock_cart_refs": 0,
        "home_review_sections": 1,
        "home_quotes": 3,
        "home_founder_cards": 2,
        "our_story_founder_cards": 2,
        "our_story_placeholders": 0,
        "faq_question": 1,
        "faq_answer": 1,
        "stockist_rows": 204,
        "stockist_unknown": 7,
        "shop_bar_rows": 6,
        "shipping_line": 1,
        "free_shipping_99": 1,
    }
    for key, value in expected.items():
        if checks[key] != value:
            failures.append(f"{key}: expected {value}, got {checks[key]}")
    for forbidden in (
        "Reviews · consent pending",
        "These WIP quotes remain noindexed",
        "Consent and final testimonial selection pending before go-live.",
        "Founder portraits and final story details remain in review.",
        "200+ stockists",
        "204 total; 7 need client confirmation",
        "WIP directory status",
        "Directory preview only",
    ):
        if forbidden in combined:
            failures.append(f"forbidden visitor/process string remains: {forbidden}")
    for path in (root / "mock-cart.js", root / "mock-cart.css"):
        if path.exists():
            failures.append(f"mock cart asset remains: {path.name}")
    if failures:
        raise RuntimeError("Candidate validation failed:\n" + "\n".join(failures))
    return checks


def build(output: Path) -> dict[str, object]:
    if output.exists():
        raise RuntimeError(f"Output already exists: {output}")
    assert_pins()
    temp_parent = Path(tempfile.mkdtemp(prefix="maplemoon-r4-", dir="/private/tmp"))
    baseline = temp_parent / "baseline"
    staging = temp_parent / "staging"
    try:
        completed = subprocess.run(
            [sys.executable, "-B", str(PRIVATE_BUILDER), "--output", str(baseline)],
            cwd=REPO,
            check=True,
            capture_output=True,
            text=True,
        )
        shutil.copytree(baseline, staging)
        before_hashes = {}
        after_hashes = {}
        for relative, transform in TRANSFORMS.items():
            path = staging / relative
            original = path.read_text(encoding="utf-8")
            before_hashes[relative] = hashlib.sha256(original.encode()).hexdigest()
            updated = transform(original)
            if updated == original:
                raise RuntimeError(f"Transform made no change: {relative}")
            path.write_text(updated, encoding="utf-8")
            after_hashes[relative] = hashlib.sha256(updated.encode()).hexdigest()
        for name in ("mock-cart.js", "mock-cart.css"):
            (staging / name).unlink()
        checks = validate_candidate(staging)
        output.parent.mkdir(parents=True, exist_ok=True)
        shutil.move(str(staging), str(output))
        return {
            "outcome": "PASS",
            "baseline_output": completed.stdout.strip(),
            "output": str(output),
            "checks": checks,
            "page_hashes_before": before_hashes,
            "page_hashes_after": after_hashes,
        }
    finally:
        shutil.rmtree(temp_parent, ignore_errors=True)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--check-only", action="store_true")
    args = parser.parse_args()
    assert_pins()
    if args.check_only:
        print("R4 CHECK-ONLY PASS pins=8 output_absent=" + str(not args.output.exists()).lower())
        return 0
    result = build(args.output.resolve())
    print(json.dumps(result, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
