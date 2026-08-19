#!/usr/bin/env python3
"""
MapleMoon deploy preflight - ANONYMOUS client-facing verification.

RUN BY HAND, AFTER A HUMAN APPROVES A DEPLOY. This script only ever READS.
It never deploys, never calls a Vercel write API, never pushes, never authenticates.

  usage:  python3 preflight_deploy.py <BASE_URL> [--local]
  e.g.    python3 preflight_deploy.py https://maplemoon-xxxx.vercel.app
          python3 preflight_deploy.py http://127.0.0.1:4330 --local

  --local  waives the root-path requirement below, for a bare `python -m http.server`
           whose "/" is a directory index. NEVER pass it against a deploy host: the
           verdict line says WAIVED so a waived run can never read as a clean one.

WHY THIS EXISTS
  Two failure modes fooled a naive check and must be impossible here:

  1. VERCEL SSO WALL. Vercel Authentication is a TEAM DEFAULT on this account
     (ssoProtection: enabled, scope all_except_custom_domains). A walled deployment
     returns HTTP 200 with a ~482KB Vercel login page for EVERY path, including paths
     that do not exist. So "200" proves nothing. This script therefore fetches
     ANONYMOUSLY - plain curl, no cookie jar, no token, no vercel CLI auth. An
     AUTHENTICATED fetch sails through the wall and reports a walled site as working,
     which is exactly the bug. Do not "fix" a wall failure by adding credentials.

  2. BLIND PROBE. Before believing any page result we request paths that definitely
     do not exist. If a bogus path returns the same status AND a similar body size as
     a real page, the host cannot distinguish present from absent, every downstream
     result is meaningless, and we abort with PROBE BLIND rather than report pass/fail.

POSITIVE CONTROLS
  Every leak check states a positive control: the identical matcher is run against a
  synthetic canary containing each forbidden pattern. If a matcher cannot find its own
  pattern in the canary, the matcher is broken and we print BLIND, never "no leaks".
  This script must never print a clean bill of health it cannot prove it could disprove.

NEGATIVE CONTROLS (added 13 Aug 2026)
  A positive canary cannot validate a matcher that carries EXCLUSIONS: a bare-204
  matcher that fires on everything passes the positive control perfectly, and a
  preflight that cries wolf gets ignored - the same end state as being blind. So a
  matcher with exclusions also states a MUST-NOT canary, built from REAL page data
  (actual postcodes 2204/3204, real street addresses, the real `+" "+total;` JS
  variable). If anything in the must-not canary fires, we print BLIND.

WHY THE MATCHERS WERE BROADENED (13 Aug 2026)
  The old check searched two EXACT phrases, "204 directory entries" and
  "204-store directory". It therefore scored PASS-adjacent on, and was completely
  blind to, a third instance worded differently:
      "Showing X of Y stockists. 204 total; 7 need client confirmation."
  A name-keyed matcher is blind to a differently-worded instance of the same leak.
  The replacement flags (a) any bare 204 in visitor copy that is not a postcode or
  street number, and (b) internal-status language as a class, not as phrases.

LAYER CHOICE AND ITS BLIND SPOT
  bare-204 and the placeholder/pending checks run on the "text" layer. text_layer()
  strips ALL tags, so attribute text - <meta name="description" content="...">, alt=,
  aria-label=, title= - is invisible to every text-layer matcher. That is a known and
  accepted blind spot: raw-layer 204 is unusable because CSS colours (rgba(236,227,204))
  are full of the literal 204. The internal-ops-language check runs on "raw" precisely
  so that meta/aria copy is still covered for the phrase-shaped leaks.
"""

import re
import subprocess
import sys
import tempfile
import os

EM_DASH = "—"

# ---------------------------------------------------------------------------
# Pages. Vercel serves these with cleanUrls:true (/our-story); a plain
# python -m http.server serves them as files (/our-story.html). We try both,
# but ONLY after the wall and blind-probe guards have passed - under the SSO
# wall every candidate returns 200 and would "resolve" to a login page.
# ---------------------------------------------------------------------------
PAGES = [
    # slug,           extra candidate paths,  <title> anchor,                        body anchor
    ("homepage",     ["/", "/homepage", "/homepage.html", "/index.html"],
     "Maple Moon: Australian Organic Carob", "Find a stockist"),
    ("our-story",    ["/our-story", "/our-story.html"],
     "Our Story | Maple Moon", "The people behind the product"),
    ("carob-story",  ["/carob-story", "/carob-story.html"],
     "What is Carob? | Maple Moon", "Carob is a naturally sweet pod grown on the carob tree."),
    ("shop",         ["/shop", "/shop.html"],
     "Shop the Range | Maple Moon", "Find your flavour"),
    ("faq",          ["/faq", "/faq.html"],
     "FAQ | Maple Moon", "Popular questions"),
    ("stockists",    ["/stockists", "/stockists.html"],
     "Stockists | Maple Moon", "Find Maple Moon."),
]

# Scanned for leaks in addition to the six pages. The 204-store leak was found
# inside a JS template literal, so shipped JS is in scope: a pending name inside
# mock-cart.js would be loaded by every page and missed by scanning HTML alone.
# The candidate list above is a FALLTHROUGH, and for the homepage that fallthrough is
# itself a failure mode. The link Nate sends is the bare root. If "/" 404s but
# "/homepage.html" serves, the loop breaks on the first candidate that works and the run
# prints PASS while the only URL the client will ever click is dead. There is no
# index.html in the build tree, so on a host without a "/" -> homepage rewrite this is
# the expected state, not a hypothetical. A page listed here must be served by exactly
# the path named, whatever else in its candidate list also happens to work.
ROOT_REQUIRED = {"homepage": "/"}

EXTRA_LEAK_TARGETS = [
    ("mock-cart.js",      ["/mock-cart.js"]),
    ("pure-carob-bar",    ["/pure-carob-bar", "/pure-carob-bar.html"]),
]

BOGUS_PATHS = [
    "/zzq-definitely-not-a-real-path-9471",
    "/zzq-definitely-not-a-real-path-9471.html",
]


# ---------------------------------------------------------------------------
# Anonymous fetch
# ---------------------------------------------------------------------------
def fetch(url):
    """Anonymous GET. No cookie jar, no netrc, no auth header, no token.

    Returns dict(ok, status, size, final_url, body, error). ok is False when curl
    itself failed - a dead host must never read as "0 leak hits found".
    """
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".body")
    tmp.close()
    try:
        proc = subprocess.run(
            ["curl", "-sS", "-L", "--max-time", "30", "--no-netrc",
             "--max-redirs", "5", "-o", tmp.name,
             "-w", "%{http_code}\t%{size_download}\t%{url_effective}", url],
            capture_output=True, text=True,
        )
        if proc.returncode != 0:
            return {"ok": False, "status": 0, "size": 0, "final_url": url,
                    "body": "", "error": (proc.stderr or "").strip()[:200]
                    or f"curl exit {proc.returncode}"}
        parts = proc.stdout.strip().split("\t")
        if len(parts) < 3:
            return {"ok": False, "status": 0, "size": 0, "final_url": url,
                    "body": "", "error": "unparseable curl output"}
        with open(tmp.name, "r", encoding="utf-8", errors="replace") as fh:
            body = fh.read()
        return {"ok": True, "status": int(parts[0]), "size": int(parts[1]),
                "final_url": parts[2], "body": body, "error": ""}
    finally:
        os.unlink(tmp.name)


# ---------------------------------------------------------------------------
# Text layer: what a visitor can actually read.
#   - <style> blocks and HTML comments are stripped (internal notes, not copy)
#   - /* */ and // comments are stripped (JS/CSS notes, not copy)
#   - <script> is DELIBERATELY KEPT: faq/shop build visible copy from JS template
#     literals, and a real em dash leak lives in a mock-cart.js string assigned to
#     .textContent. Stripping <script> would blind this check to shipped copy.
# ---------------------------------------------------------------------------
def text_layer(body, is_js=False):
    t = body
    if not is_js:
        t = re.sub(r"(?is)<style.*?</style>", "", t)
        t = re.sub(r"(?s)<!--.*?-->", "", t)
    t = re.sub(r"(?s)/\*.*?\*/", "", t)
    t = re.sub(r"(?m)(?<![:\"'])//[^\n]*", "", t)
    if not is_js:
        t = re.sub(r"(?s)<[^>]+>", " ", t)
    return t


# ---------------------------------------------------------------------------
# Leak matchers.
#   layer "raw"  -> every shipped byte (comments and markup included). Used where
#                   even a hidden occurrence is unacceptable.
#   layer "text" -> visitor-readable copy only.
# tier "fail" blocks the deploy; tier "review" is surfaced in the verdict for a
# human to clear (never silently swallowed).
# ---------------------------------------------------------------------------

# A bare 204 in visitor copy, excluding the shapes real stockist data legitimately
# contains. Exclusions, in order:
#   (?<!\d) ... (?!\d)   2204 / 3204 / 2040 postcodes, and any longer number
#   (?<!Shop )(?<!Unit )(?<!Suite )(?<!Level )   "Shop 204", "Unit 204"
#   (?!\s*/)             "204/12 Knox Street"
#   (?!<street>)         "204 High St", "204 North Rd" - number, Capitalised street
#                        words, then a street-type suffix
_STREET_SUFFIX = (r"St|Street|Rd|Road|Ave|Avenue|Dr|Drive|Pde|Parade|Hwy|Highway|"
                  r"Ln|Lane|Cres|Crescent|Ct|Court|Pl|Place|Tce|Terrace|"
                  r"Blvd|Boulevard|Way|Esp|Esplanade")
BARE_204 = (r"(?<!\d)(?<!Shop )(?<!Unit )(?<!Suite )(?<!Level )204(?!\d)(?!\s*/)"
            r"(?!(?:\s+[A-Z][\w'’-]+){1,3}\s+(?:" + _STREET_SUFFIX + r")\b)")

# Real strings lifted from stockists.html. If the bare-204 matcher fires on ANY of
# these it is a false-positive machine, and the script must refuse to print a verdict.
# The rgba() line is wrapped in <style> exactly as it appears in the real page, so this
# also re-proves that the stripper is what protects us from CSS colour value 204.
CANARY_204_MUST_NOT = (
    'address:"shop 42/20 Smidmore Street, 2204, Marrickville, 2204, Australia",postcode:"2204" '
    'address:"553a North Rd, Ormond, 3204",postcode:"3204" '
    'address:"122-138 Flood St, Shop 21, Leichhardt, 2040, Australia",postcode:"2040" '
    "204 High St, Wodonga, 3690, Australia. Shop 204, 12 Flood St. 204/12 Knox Street. "
    "<style>.wf-pflag{background:rgba(236,227,204,.36);}</style>"
)

# The real false positive a naive `total;` produces: a JS variable in stockists.html.
CANARY_OPS_MUST_NOT = (
    'btn.textContent=btn.dataset.label+" "+total; var total; const total;'
)

# placeholder= as an HTML attribute and ::placeholder in CSS are legitimate; only the
# visitor-readable word is a leak. Both of these must die in the text layer.
CANARY_DEV_MUST_NOT = (
    '<input placeholder="Search store, suburb, postcode or state">'
    "<style>.st-search input::placeholder{color:var(--ink-faint);}</style>"
)

# A quoted bare token - 'pending' / "PENDING" - is a CSS class name or a data-value,
# not visitor copy. Without this exclusion the status matcher returns 27 hits on
# homepage.html alone, almost all of them classList.toggle('pending'), and a review
# list nobody reads is the same as no check at all. Real copy ("Details pending",
# "7 entries pending") is never a lone quoted token, so it still fires.
CANARY_STATUS_MUST_NOT = (
    "pdpFlag.classList.toggle('pending',!state.priced); "
    'pdpProof.classList.add("pending"); '
    '<button data-filter="review" data-value="PENDING">'
)

LEAK_CHECKS = [
    # name, regex, layer, tier,
    #   canary line that MUST match (positive control),
    #   canary that must NOT match (negative control), or None
    ("review-link",
     r"[?&]review=1", "raw", "fail",
     'a link <a href="/shop?review=1">review mode</a>', None),

    ("204-internal-count",
     r"204 directory entries|204-store directory", "raw", "fail",
     "<span>204 directory entries</span> and the 204-store directory blurb", None),

    # Broadened 13 Aug 2026: catches "204 total; 7 need client confirmation", which the
    # two exact phrases above could never have seen.
    ("bare-204-visitor-copy",
     BARE_204, "text", "fail",
     ("the finder shows 204 stores",
      "Showing 8 of 204 stockists. 204 total; 7 need client confirmation.",
      "<span>204 directory entries</span>",
      "204 entries were imported"),
     CANARY_204_MUST_NOT),

    ("internal-ops-language",
     r"(?i)need(?:s|ing)?\s+client\s+confirmation|client\s+confirmation|"
     r"directory\s+entries|-store\s+directory|\d\s*total\s*;",
     "raw", "fail",
     ("<span>204 directory entries</span>",
      "preview highlights from the 204-store directory.",
      "Showing 8 of 204 stockists. 204 total; 7 need client confirmation.",
      "Seven entries still need client confirmation.",
      'aria-label="7 entries needing client confirmation"',
      "awaiting client confirmation"),
     CANARY_OPS_MUST_NOT),

    ("dev-placeholder-copy",
     r"(?i)\bTODO\b|\blorem(?:\s+ipsum)?\b|\bplaceholder\b", "text", "fail",
     ("TODO swap this before launch",
      "lorem ipsum dolor sit amet",
      "image placeholder pending final art"),
     CANARY_DEV_MUST_NOT),

    # Deliberately tier "review", not "fail". `pending` is load-bearing UI language on
    # the stockists finder (the "Needs confirmation" filter, area:"Details pending"
    # rows), so blocking on it would make the preflight unrunnable and therefore
    # ignored. Surfaced for a human every run; never silently swallowed.
    # Lookbehind ONLY. A trailing-quote lookahead was tried and reverted 13 Aug 2026:
    # it is character-adjacent, not token-aware, so it could not tell a bare
    # identifier's quote from the CLOSING quote of prose, and it silently dropped all
    # 5 real area:"Details pending" rows in stockists.html. The lookbehind alone still
    # kills classList.toggle('pending' / add("pending" / data-value="PENDING", which
    # are all quote-PRECEDED. The canary below carries the real shape so that this
    # over-exclusion can never come back undetected.
    ("internal-status-review",
     r"(?i)(?<![\"'])\bpending\b|\bneeds?\s+confirmation\b|total;",
     "text", "review",
     ('area:"Details pending"',
      "7 entries pending final checks",
      "3 stores need confirmation",
      "204 total; the rest are live"),
     CANARY_STATUS_MUST_NOT),

    ("pending-consent-names",
     r"Natasha|Janice|Acacia", "raw", "fail",
     "quotes from Natasha, Janice and Acacia", None),

    ("word-testimonial",
     r"(?i)testimonial", "text", "fail",
     "a glowing testimonial from a customer", None),

    ("word-testimonial-hidden",
     r"(?i)testimonial", "raw", "review",
     "<!-- testimonial block -->", None),

    ("em-dash",
     EM_DASH, "text", "fail",
     "visitor copy with an em dash " + EM_DASH + " right here", None),

    ("local-filesystem-path",
     r"/Users/handtomouse", "raw", "fail",
     "a stray path /Users/handtomouse/maplemoon_build", None),
]

# Proves the strip pipeline removes what it claims to: an em dash and the word
# testimonial buried in comments must NOT survive into the text layer. Without
# this, a text-layer "0 hits" could just mean the stripper ate everything.
CANARY_MUST_STRIP = (
    "<style>/* a comment em dash " + EM_DASH + " and testimonial */</style>"
    "<!-- html comment em dash " + EM_DASH + " testimonial -->"
    "<p>ordinary visible copy</p>"
)


def canary_lines(check):
    """A matcher's positive canary may be one string or a TUPLE of shapes.

    A tuple matters for any matcher built from an alternation. run_controls asserts
    each shape SEPARATELY, because a single blob canary lets one healthy branch mask
    a broken one: the `pending` matcher briefly carried a trailing-quote lookahead
    that silently dropped every area:"Details pending" row, and a blob canary still
    passed because its `needs confirmation` branch matched. One shape per alternative
    is what makes the self-test able to fail.
    """
    line = check[4]
    return (line,) if isinstance(line, str) else tuple(line)


def build_canary():
    parts = []
    for c in LEAK_CHECKS:
        parts.extend(canary_lines(c))
    return "<html><body>" + " ".join(parts) + "</body></html>"


def run_controls():
    """Prove every matcher can fire, that no matcher fires on legitimate real data,
    and that the stripper strips. Returns (ok, notes)."""
    canary = build_canary()
    notes = []
    ok = True
    for check in LEAK_CHECKS:
        name, pattern, layer, _tier, _line, must_not = check
        # Each declared shape is asserted on its own, not as one blob.
        for shape in canary_lines(check):
            hay = shape if layer == "raw" else text_layer(shape)
            if not re.search(pattern, hay):
                ok = False
                notes.append("matcher '%s' could NOT find its own pattern in canary "
                             "shape %r" % (name, shape[:60]))
        # Negative control. A matcher carrying exclusions is only trustworthy if it
        # stays silent on real data that legitimately contains the same characters.
        if must_not:
            neg = must_not if layer == "raw" else text_layer(must_not)
            bad = [m.group(0) for m in re.finditer(pattern, neg)]
            if bad:
                ok = False
                notes.append("matcher '%s' FIRED on its must-not canary (%d hit(s): %r) "
                             "- it would false-positive on real stockist data"
                             % (name, len(bad), bad[:3]))
    stripped = text_layer(CANARY_MUST_STRIP)
    if EM_DASH in stripped or "testimonial" in stripped.lower():
        ok = False
        notes.append("strip pipeline leaked comment content into the text layer")
    if "ordinary visible copy" not in stripped:
        ok = False
        notes.append("strip pipeline destroyed visible copy")
    return ok, notes


def ctx(hay, match, width=60):
    s = max(0, match.start() - width)
    return re.sub(r"\s+", " ", hay[s:match.end() + width]).strip()[:150]


# ---------------------------------------------------------------------------
def main():
    argv = sys.argv[1:]
    local = "--local" in argv
    argv = [a for a in argv if a != "--local"]
    if len(argv) != 1 or argv[0].startswith("-"):
        sys.stderr.write(__doc__.strip() + "\n")
        return 2
    base = argv[0].rstrip("/")

    print("MapleMoon deploy preflight - ANONYMOUS fetch (no cookie, no token, no CLI auth)")
    print("base: %s" % base)
    print("-" * 78)

    failures, blinds, reviews, waived = [], [], [], []

    def line(verdict, label, detail=""):
        print("%-5s %-28s %s" % (verdict, label, detail))

    # -- GUARD 0: matcher self-test -----------------------------------------
    ctl_ok, ctl_notes = run_controls()
    if ctl_ok:
        line("PASS", "control:matchers",
             "all %d matchers fired on canary; stripper verified" % len(LEAK_CHECKS))
    else:
        line("BLIND", "control:matchers", "; ".join(ctl_notes))
        blinds.append("matcher self-test")
        print("-" * 78)
        print("VERDICT: BLIND - leak matchers are broken. No result below can be trusted.")
        return 1

    # -- GUARD 1: Vercel SSO wall -------------------------------------------
    root = fetch(base + "/")
    if not root["ok"]:
        line("FAIL", "guard:reachable", "curl failed: %s" % root["error"])
        print("-" * 78)
        print("VERDICT: FAIL - host did not respond. Nothing was checked.")
        return 1

    walled = ("vercel.com/login" in root["final_url"]
              or re.search(r"<title>\s*Login", root["body"], re.I) is not None
              or "Authentication Required" in root["body"])
    if walled:
        line("FAIL", "guard:sso-wall",
             "login page served (final_url=%s, %dB)" % (root["final_url"][:60], root["size"]))
        print("-" * 78)
        print("VERDICT: FAIL - VERCEL SSO WALL. The deployment is behind Vercel")
        print("  Authentication, so Carli and Dylan would see a login page, not the site.")
        print("  REMEDIATION: disable Vercel Authentication on the PROJECT")
        print("    Vercel dashboard > Project > Settings > Deployment Protection")
        print("    > Vercel Authentication > Disabled  (team default is Enabled)")
        print("  DO NOT 'fix' this by adding a token or cookie to this script. An")
        print("  authenticated fetch passes through the wall and hides the failure.")
        return 1
    line("PASS", "guard:sso-wall", "no Vercel login page (status %d, %dB)"
         % (root["status"], root["size"]))

    # -- GUARD 2: bogus-path control ----------------------------------------
    # Resolve one known-real page to compare against.
    real_probe = None
    anchors = (PAGES[0][2], PAGES[5][2])
    for cand in PAGES[0][1] + PAGES[5][1]:
        r = fetch(base + cand)
        if r["ok"] and r["status"] == 200 and any(a in r["body"] for a in anchors):
            real_probe = r
            break
    if real_probe is None:
        line("BLIND", "guard:bogus-control", "could not resolve any known-real page to compare")
        print("-" * 78)
        print("VERDICT: BLIND - no real page resolved, so present-vs-absent is untestable.")
        return 1

    blind = False
    for bp in BOGUS_PATHS:
        b = fetch(base + bp)
        if not b["ok"]:
            continue
        same_status = (b["status"] == real_probe["status"])
        big = max(b["size"], real_probe["size"]) or 1
        similar_size = abs(b["size"] - real_probe["size"]) / big < 0.10
        if same_status and similar_size:
            line("BLIND", "guard:bogus-control",
                 "%s -> %d/%dB vs real %d/%dB (indistinguishable)"
                 % (bp, b["status"], b["size"], real_probe["status"], real_probe["size"]))
            blind = True
        else:
            line("PASS", "guard:bogus-control",
                 "%s -> %d/%dB vs real %d/%dB (distinguishable)"
                 % (bp, b["status"], b["size"], real_probe["status"], real_probe["size"]))
    if blind:
        blinds.append("bogus-path control")
        print("-" * 78)
        print("VERDICT: BLIND - the host returns the same thing for real and fake paths.")
        print("  This probe cannot tell present from absent, so NOTHING below is meaningful.")
        return 1

    # -- CHECK: six pages reachable and serving their own content ------------
    print("-" * 78)
    fetched = {}
    for slug, cands, title_anchor, body_anchor in PAGES:
        got = None
        for cand in cands:
            r = fetch(base + cand)
            if r["ok"] and r["status"] == 200 and title_anchor in r["body"]:
                got = (cand, r)
                break
        if got is None:
            line("FAIL", "page:" + slug, "no candidate path served its title anchor")
            failures.append("page:" + slug)
            continue
        cand, r = got
        fetched[slug] = r
        need = ROOT_REQUIRED.get(slug)
        if need and cand != need:
            if local:
                line("WAIVE", "root:" + slug,
                     "served by %s, not %s; --local waives it" % (cand, need))
                waived.append("root:" + slug)
            else:
                line("FAIL", "root:" + slug,
                     "served by %s but %s did not; the link Nate sends is %s"
                     % (cand, need, need))
                failures.append("root:" + slug)
        elif need:
            # fetch() follows redirects, and vercel.json 302s "/" to "/homepage". That is
            # a working root, so it must pass - but name where it landed, or a root that
            # redirects somewhere wrong would read as a bare clean PASS.
            hop = ""
            eff = r.get("final_url", "")
            if eff and not eff.rstrip("/").endswith(base.rstrip("/")):
                hop = " (via %s)" % eff[len(base):] if eff.startswith(base) else " (via %s)" % eff
            line("PASS", "root:" + slug, "%s serves it%s, no fallthrough" % (need, hop))
        if body_anchor in r["body"]:
            line("PASS", "page:" + slug,
                 "%s %d %dB title+body anchors present" % (cand, r["status"], r["size"]))
        else:
            line("FAIL", "page:" + slug,
                 "%s served title but body anchor missing: %r" % (cand, body_anchor[:40]))
            failures.append("page:" + slug + " body anchor")

    # Extra leak-scan targets (not part of the six-page contract).
    for label, cands in EXTRA_LEAK_TARGETS:
        for cand in cands:
            r = fetch(base + cand)
            if r["ok"] and r["status"] == 200 and r["size"] > 200:
                fetched[label] = r
                break

    if not fetched:
        print("-" * 78)
        print("VERDICT: BLIND - nothing fetched, leak results would be vacuous.")
        return 1

    # -- CHECK: leaks --------------------------------------------------------
    print("-" * 78)
    for name, pattern, layer, tier, _line, must_not in LEAK_CHECKS:
        hits = []
        for label, r in sorted(fetched.items()):
            is_js = label.endswith(".js")
            hay = r["body"] if layer == "raw" else text_layer(r["body"], is_js)
            for m in re.finditer(pattern, hay):
                hits.append((label, ctx(hay, m)))
        ctl = ("control: pattern fires on canary [%s layer]%s"
               % (layer, "; silent on real-data must-not canary" if must_not else ""))
        if not hits:
            line("PASS", "leak:" + name, "0 hits across %d docs; %s" % (len(fetched), ctl))
        elif tier == "fail":
            line("FAIL", "leak:" + name, "%d hit(s); %s" % (len(hits), ctl))
            for label, c in hits[:4]:
                print("        %-18s %s" % (label, c))
            failures.append("leak:" + name)
        else:
            # Layer-aware: "not in visitor copy" is only true for a raw-layer matcher.
            where = ("in shipped bytes but NOT in visitor copy" if layer == "raw"
                     else "IN VISITOR-READABLE COPY - review tier, not auto-blocking")
            line("REVW", "leak:" + name, "%d hit(s) %s; %s" % (len(hits), where, ctl))
            for label, c in hits[:4]:
                print("        %-18s %s" % (label, c))
            reviews.append("leak:" + name)

    # -- verdict -------------------------------------------------------------
    print("-" * 78)
    tail = " | %d review-only hit(s)" % len(reviews) if reviews else ""
    if waived:
        tail += " | WAIVED: %s" % ", ".join(waived)
    if failures:
        print("VERDICT: FAIL (%d) - %s%s" % (len(failures), ", ".join(failures), tail))
        print("  Client-facing leak present. Do NOT send this link to Carli and Dylan.")
        return 1
    if blinds:
        print("VERDICT: BLIND%s" % tail)
        return 1
    # Waivers are printed on EVERY passing verdict, not on a branch of their own. The
    # reviews branch used to return first, so a --local run swallowed its own waiver and
    # read as clean - the same fallthrough-looks-green shape this file exists to stop.
    waiver_note = (" | WAIVED: %s" % ", ".join(waived)) if waived else ""
    if reviews:
        print("VERDICT: PASS with %d review-only hit(s) - %s%s"
              % (len(reviews), ", ".join(reviews), waiver_note))
        print("  Not visitor-readable, but they are shipped bytes. A human must clear them.")
        if waived:
            print("  A waived root is NOT a cleared root. Re-run without --local on the deploy host.")
        return 0
    if waived:
        print("VERDICT: PASS with %d waiver(s) - %s" % (len(waived), ", ".join(waived)))
        print("  A waived root is NOT a cleared root. Re-run without --local on the deploy host.")
        return 0
    print("VERDICT: PASS - %d pages served their own content, 0 leaks, all controls fired."
          % len(PAGES))
    return 0


if __name__ == "__main__":
    sys.exit(main())
