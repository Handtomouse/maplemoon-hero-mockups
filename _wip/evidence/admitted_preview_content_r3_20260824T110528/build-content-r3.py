#!/usr/bin/env python3
"""Copy R2 and apply only ledger-approved public status-copy corrections."""

from __future__ import annotations

import hashlib
import re
import shutil
from pathlib import Path


ROOT = Path("/Users/handtomouse/maplemoon-website")
R2 = ROOT / "_wip/deploy/generated/maplemoon-admitted-preview-r2-20260824T105404"
R3 = ROOT / "_wip/deploy/generated/maplemoon-admitted-preview-r3-20260824T110528"
LEDGER = ROOT / "docs/orchestration/MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md"
R2_RECEIPT = ROOT / "docs/orchestration/reviews/MAPLEMOON-ADMITTED-PREVIEW-CERT-R2-20260824T105404.json"
R2_FAILURE = ROOT / "_wip/evidence/admitted_preview_cert_r2_20260824T105404/PREFLIGHT-FAILURE.md"

PINS = {
    LEDGER: "bc23e18da7b2e03d1d2eb4d9ab613b23fc226650870d848e9636fc1ddcca9c10",
    R2_RECEIPT: "d4c699ec7b8f3845cc48e2843fe078cd1c3a7524b4d12790bd792aeab296f376",
    R2_FAILURE: "a90c6dc89dbf6a40b3c7fd7292c9c127fc57f8b749470d359cb62ba3d8f476c9",
}
R2_TREE_SHA256 = "403ba4462cca930101d6afe42777d38528e34e0732a1daef35dd6c92db44a667"
POWDER_SHA256 = "40efa1836bffcf69b44084291b1996f8dc7a70d6f4bcef22e658904fa8a26eaf"


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def sha256_file(path: Path) -> str:
    return sha256_bytes(path.read_bytes())


def directory_sha256(path: Path) -> tuple[str, int]:
    digest = hashlib.sha256()
    count = 0
    for child in sorted(path.rglob("*")):
        if child.is_symlink():
            raise SystemExit(f"TREE_FAIL symlink={child}")
        if not child.is_file():
            continue
        digest.update(child.relative_to(path).as_posix().encode("utf-8"))
        digest.update(b"\0")
        digest.update(sha256_file(child).encode("ascii"))
        digest.update(b"\n")
        count += 1
    return digest.hexdigest(), count


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"SEAM_FAIL label={label} expected=1 actual={count}")
    return text.replace(old, new)


def extract(text: str, pattern: str, label: str) -> str:
    match = re.search(pattern, text, re.S)
    if not match:
        raise SystemExit(f"EXTRACT_FAIL label={label}")
    return match.group(1)


for path, expected in PINS.items():
    actual = sha256_file(path) if path.is_file() else None
    if actual != expected:
        raise SystemExit(f"PIN_FAIL path={path} expected={expected} actual={actual}")
r2_tree, r2_files = directory_sha256(R2)
if r2_tree != R2_TREE_SHA256 or r2_files != 75:
    raise SystemExit(f"R2_TREE_FAIL sha={r2_tree} files={r2_files}")
if R3.exists():
    existing_tree, existing_files = directory_sha256(R3)
    if existing_tree != R2_TREE_SHA256 or existing_files != 75:
        partial_home_sha = "8ad9c5258edaa56c263f38c01b9d9ef0152af6fb6179e6c59f1641b7b59319a5"
        if existing_files != 75 or sha256_file(R3 / "homepage.html") != partial_home_sha:
            raise SystemExit(
                f"RECOVERY_FAIL unexpected partial Home/output: {existing_tree}/{existing_files}"
            )
        for r2_file in sorted(R2.rglob("*")):
            if not r2_file.is_file() or r2_file.name == "homepage.html":
                continue
            relative = r2_file.relative_to(R2)
            r3_file = R3 / relative
            if not r3_file.is_file() or sha256_file(r3_file) != sha256_file(r2_file):
                raise SystemExit(f"RECOVERY_FAIL unexpected partial delta: {relative}")
else:
    shutil.copytree(R2, R3)

home_path = R3 / "homepage.html"
home = (R2 / "homepage.html").read_text(encoding="utf-8")
review_start = home.index('<div class="mm-review-grid">')
review_end = home.index('<div class="mm-review-note">', review_start)
review_grid_before = home[review_start:review_end]
home = replace_once(
    home,
    '''      <div class="q-segments" aria-label="Comparison views">
        <button class="on" type="button" aria-pressed="true">Compare</button>
        <button type="button" disabled>Nutrition</button>
        <button type="button" disabled>Taste <span class="amp">&amp;</span> Feel</button>
      </div>
''',
    "",
    "home-future-controls",
)
home = replace_once(
    home,
    '    <p class="q-compare-held">Nutrition tab and exact comparative values remain pending review.</p>\n',
    "",
    "home-future-status",
)
home = replace_once(
    home,
    '<p>Founder portraits and final story details remain in review.</p>',
    "",
    "home-founder-status",
)
home = replace_once(home, "Reviews · consent pending", "Customer stories", "home-review-kicker")
home = replace_once(
    home,
    "Real experiences, shared with care. These WIP quotes remain noindexed until Carli confirms consent.",
    "Real experiences, shared with care.",
    "home-review-intro",
)
home = replace_once(
    home,
    '<div class="mm-review-note">Consent and final testimonial selection pending before go-live.</div>',
    "",
    "home-review-note",
)
review_after_start = home.index('<div class="mm-review-grid">')
review_after_end = home.index('</section>', review_after_start)
review_grid_after = home[review_after_start:review_after_end]
if review_grid_before != review_grid_after:
    raise SystemExit("QUOTE_PROJECTION_FAIL review grid changed")
home_path.write_text(home, encoding="utf-8")

stock_path = R3 / "stockists.html"
stock = (R2 / "stockists.html").read_text(encoding="utf-8")
array_before = extract(stock, r"var stockists=\[(.*?)\n  \];", "stockist-array")
array_projection_before = re.sub(r',note:"(?:\\.|[^"\\])*"', "", array_before)
stock = replace_once(
    stock,
    '<meta name="description" content="Find Maple Moon at 200+ stockists across Australia. Directory details are being confirmed before launch.">',
    '<meta name="description" content="Find Maple Moon at 200+ stockists across Australia.">',
    "stock-meta-description",
)
stock = replace_once(
    stock,
    '<meta property="og:description" content="Find Maple Moon Australian carob at 200+ stockists across Australia. Directory details are being confirmed.">',
    '<meta property="og:description" content="Find Maple Moon Australian carob at 200+ stockists across Australia.">',
    "stock-og-description",
)
stock = replace_once(
    stock,
    '<meta name="twitter:description" content="Find Maple Moon Australian carob at 200+ stockists across Australia. Directory details are being confirmed.">',
    '<meta name="twitter:description" content="Find Maple Moon Australian carob at 200+ stockists across Australia.">',
    "stock-twitter-description",
)
stock = replace_once(stock, "      <span>204 parsed · 7 need confirmation</span>\n", "", "stock-proof-status")
stock = replace_once(
    stock,
    '<p class="sub">Search the current Maple Moon stockist directory by store, suburb, postcode or state. Seven entries still need client confirmation.</p>',
    '<p class="sub">Search the Maple Moon stockist directory by store, suburb, postcode or state.</p>',
    "stock-intro-status",
)
stock = replace_once(
    stock,
    '<small>Search the source directory; store-type labels are provisional pending client sign-off.</small>',
    '<small>Search by store, suburb, postcode or state.</small>',
    "stock-search-cue",
)
stock = replace_once(stock, ' aria-describedby="stockistDirectoryStatus"', "", "stock-aria-status")
stock = replace_once(
    stock,
    '<p class="st-filter-label st-type-label">Directory view <span>Store-type labels are provisional</span></p>',
    '<p class="st-filter-label st-type-label">Directory view</p>',
    "stock-type-status",
)
stock = replace_once(
    stock,
    '        <button class="st-result-filter" type="button" data-filter="review" data-value="PENDING" aria-pressed="false">Needs confirmation</button>\n',
    "",
    "stock-review-filter",
)
stock = replace_once(
    stock,
    '          <button class="st-area-next" type="button" disabled aria-disabled="true" aria-label="More popular areas pending">&gt;</button>\n',
    "",
    "stock-disabled-area-control",
)
stock = replace_once(
    stock,
    '        <p class="st-directory-status" id="stockistDirectoryStatus"><strong>WIP directory status</strong><span>204 entries are in this source parse. Seven entries have incomplete location details and need client confirmation before launch.</span></p>\n',
    "",
    "stock-directory-status",
)
stock = replace_once(
    stock,
    '''        <div class="st-data-key" aria-label="Directory caveats">
          <span><i></i>204 source entries</span>
          <span class="pending"><i></i>7 location details pending</span>
          <span class="online"><i></i>Directory preview only</span>
        </div>
''',
    "",
    "stock-data-key",
)
stock = replace_once(
    stock,
    "Try a broader search or clear the filters while the remaining store details are confirmed.",
    "Try a broader search or clear the filters.",
    "stock-empty-copy",
)
stock = replace_once(
    stock,
    "Shop online while store details are confirmed.",
    "Shop the available range online.",
    "stock-shop-cta",
)
stock = replace_once(
    stock,
    '  /* WIP guardrail: no live map, exact pins, near-me, distances or hours until stockist coordinates are sourced. Type/group labels are inferred and need client sign-off. */\n',
    "",
    "stock-wip-comment",
)
stock, note_count = re.subn(r',note:"(?:\\.|[^"\\])*"', "", stock)
if note_count != 8:
    raise SystemExit(f"STOCK_NOTE_FAIL expected=8 actual={note_count}")
stock = replace_once(
    stock,
    '  var filters={state:"ALL",type:"ALL",review:"ALL",area:"",query:""};',
    '  var filters={state:"ALL",type:"ALL",area:"",query:""};',
    "stock-filters-initial",
)
stock = replace_once(
    stock,
    '  var pendingFilter=document.querySelector(\'[data-filter="review"][data-value="PENDING"]\');\n',
    "",
    "stock-pending-filter-binding",
)
stock = stock.replace(
    'filters={state:"ALL",type:"ALL",review:"ALL",area:"",query:""};',
    'filters={state:"ALL",type:"ALL",area:"",query:""};',
)
if stock.count('filters={state:"ALL",type:"ALL",review:"ALL",area:"",query:""};') != 0:
    raise SystemExit("STOCK_FILTER_RESET_FAIL review reset remains")
stock = replace_once(
    stock,
    '    if(filters.review==="PENDING"&&item.state!=="UNKNOWN")return false;\n',
    "",
    "stock-review-match",
)
stock = replace_once(
    stock,
    '    if(kind==="review"&&value==="PENDING")return "Needs confirmation";\n',
    "",
    "stock-review-label",
)
stock = replace_once(
    stock,
    '''    if(pendingFilter){
      var pendingTotal=stockists.filter(function(item){return item.state==="UNKNOWN";}).length;
      pendingFilter.textContent="Needs confirmation "+pendingTotal;
      pendingFilter.setAttribute("aria-label",pendingTotal+" entries needing client confirmation");
    }
''',
    "",
    "stock-review-count",
)
stock = replace_once(
    stock,
    '    if(filters.review!=="ALL")items.push({kind:"review",label:labelFor("review",filters.review)});\n',
    "",
    "stock-review-active",
)
stock = replace_once(
    stock,
    '    if(filters.review==="PENDING")bits.push("needs-confirmation");\n',
    "",
    "stock-review-title",
)
stock = replace_once(
    stock,
    '''    }else if(item.state==="UNKNOWN"||item.state==="AUS"&&item.area==="Details pending"){
      parts.place=item.area&&item.area!=="Details pending"?'<span class="pending">Area reference: '+text(item.area)+' · state pending confirmation</span>':'<span class="pending">Location details pending confirmation</span>';
''',
    '''    }else if(item.state==="UNKNOWN"||item.state==="AUS"&&item.area==="Details pending"){
      parts.place='<span class="pending">Location details unavailable</span>';
''',
    "stock-neutral-location",
)
stock = replace_once(
    stock,
    '    if(item.state==="UNKNOWN")parts.kind+=\'<span class="st-badge confirm">Confirm details</span>\';\n',
    "",
    "stock-confirm-badge",
)
stock = replace_once(
    stock,
    '    parts.note=item.note?\'<div class="st-result-note"><span>Source note</span>\'+text(item.note)+\'</div>\':\'\';\n',
    "",
    "stock-source-note-render",
)
stock = replace_once(stock, "      badges.note+\n", "", "stock-source-note-output")
stock = replace_once(
    stock,
    '    count.textContent=shown.length?("Showing "+visible.length+" of "+shown.length+" stockists. 204 total; 7 need client confirmation."):("No stockists shown. 204 total; 7 need client confirmation.");',
    '    count.textContent=shown.length?("Showing "+visible.length+" of "+shown.length+" stockists."):"No stockists shown.";',
    "stock-result-count",
)
array_after = extract(stock, r"var stockists=\[(.*?)\n  \];", "stockist-array-after")
if array_projection_before != array_after:
    raise SystemExit("STOCKIST_PROJECTION_FAIL governed fields changed")
if array_after.count("sourceLine:") != 204:
    raise SystemExit(f"STOCKIST_COUNT_FAIL expected=204 actual={array_after.count('sourceLine:')}")
stock_path.write_text(stock, encoding="utf-8")

powder = R3 / "assets/product_shots/powder_roasted.webp"
if sha256_file(powder) != POWDER_SHA256:
    raise SystemExit("POWDER_PIN_FAIL")

for path in R3.rglob("*"):
    if not path.is_file() or path.suffix.lower() not in {".html", ".css", ".js", ".json"}:
        continue
    value = path.read_text(encoding="utf-8", errors="replace")
    if any(needle in value for needle in ("/out/", "/_wip/", ".WIP.html")):
        raise SystemExit(f"PRIVATE_PATH_FAIL path={path}")

r3_tree, r3_files = directory_sha256(R3)
print(
    "CONTENT_R3 PASS "
    f"files={r3_files} tree_sha256={r3_tree} quote_projection={sha256_bytes(review_grid_after.encode())} "
    "quotes=3/3 anonymous_names=3/3 stockists=204/204 unknown=7/7 "
    f"notes_removed={note_count} powder={POWDER_SHA256[:12]} private_paths=0"
)
