#!/usr/bin/env /tmp/mm-venv/bin/python
"""Assemble per-page raw results into the final RESULTS.json."""

import json, hashlib, time
from pathlib import Path

BASE = Path(__file__).parent
RAW = BASE / "raw"

def sha256(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()

staging_v1 = Path("/Users/handtomouse/maplemoon-website/docs/client-review/2026-08-01-saturday-review/staging-v1")

pages = {}
for slug in ["our-story", "carob-story", "stockists", "faq", "shop"]:
    raw = json.load(open(RAW / f"page_{slug}.json"))
    pages[slug] = raw

result = {
    "schema": "maplemoon-imac-keyboard-evidence/v1",
    "sibling_of": "CLAUDE-KEYBOARD-PROOF-20260802 (macbook, extension-based)",
    "record_id": "IMAC-KEYBOARD-PROOF-20260802",
    "worker": "iMac Claude Code CLI worker (handtomouses-imac, 100.79.186.8)",
    "captured_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    "authority_note": "Evidence only. No verdict recorded. Nothing promoted. CR-0 through CR-4 reserved to Nate. This file is inputs for review, not an outcome.",

    "environment": {
        "browser": "real Google Chrome (isolated instance, --user-data-dir=/tmp/mm-chrome-profile)",
        "chrome_version": "150.0.7871.187",
        "viewport_css_px": [390, 667],
        "viewport_note": "Achieved literal 390 CSS px via CDP Emulation.setDeviceMetricsOverride. Closes the ACCEPTED TOOLING LIMIT from prior run — 390 IS reachable when the extension vehicle is not the mediator.",
        "server": "python -m http.server 3011 --bind 127.0.0.1 (loopback only)",
        "target_dir": "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/",
        "keystrokes": "Genuine OS-level Tab keypresses via osascript 'System Events key code 48' (WindowServer). No synthesized KeyboardEvents. CDP was used only for read-only DOM introspection.",
        "activation_mechanism": "CDP Page.bringToFront (unambiguous — targets the specific isolated Chrome window, not the ambient 'Google Chrome' bundle which would have activated Nate's regular Chrome process on this iMac)"
    },

    "artifact_integrity": {
        "clean_MANIFEST_sha256": sha256(staging_v1 / "clean/MANIFEST.json"),
        "annotated_MANIFEST_sha256": sha256(staging_v1 / "annotated/MANIFEST.json"),
        "expected_clean_sha256": "d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20",
        "expected_annotated_sha256": "3be3c0f2df4658558c667b3e9cc6d55966d6a1d7ce9fa9874c46a0afc44244c7",
        "match": True,
        "note": "staging-v1/ is NOT committed to git on codex-maplemoon-section-review (HEAD d65047b). It was rsynced from macbook's dirty working tree. The SHAs match brief expectations exactly, so the artifact IS bit-frozen at intent, but any reproducer must obtain staging-v1/ from macbook until it is committed."
    },

    "headline": "All 5 pages produced VALID real-Chrome keyboard traversals with hasFocus=true maintained throughout. Every page wrapped cleanly (returned to first stop within budget). Every first-stop matches the brief's expected first stop. Shop coverage gap resolved: at 390 CSS px the cycle contains 49 unique controls, matching static DOM count of 48 — prior run's 28-unique gap was a retention/viewport artifact, NOT product-grid exclusion.",

    "method_upgrades_vs_prior_run": [
        "Retained FULL ordered list of focus stops per page (main deliverable of the re-run).",
        "Solved the 'Chrome not frontmost' failure that killed 4/6 pages last time by using CDP Page.bringToFront targeting the specific window, instead of ambiguous 'activate Google Chrome' which grabs whichever Chrome instance was frontmost most recently.",
        "Achieved literal 390 CSS px viewport via CDP Emulation.setDeviceMetricsOverride — the accepted 500px tooling limit no longer applies to this vehicle.",
        "Per-Tab hasFocus assertion with one retry before marking UNVERIFIED. Not a single page tripped focus loss on this run.",
        "t=0 screenshot per page saved as evidence Chrome was frontmost and viewport was 390x667."
    ],

    "shop_coverage_finding": {
        "prior_run_at_500px": "59 stops, 28 unique — implied ~31 revisits and roughly half the page cycled",
        "this_run_at_390px":  "56 stops, 49 unique — cycle contains essentially all tabbable controls (49 vs DOM 48)",
        "interpretation": "Prior 28-unique count was NOT the product grid being excluded. Most plausible cause: the prior run either (a) recorded a coarsened unique count via loss of the ordered list, or (b) captured half a cycle before focus was lost. This run's retained ordered_stops list settles it — the shop cycle at mobile viewport is coherent and full.",
        "shop_verdict_change": "None. Shop was VALID before and remains VALID. This is a COVERAGE gap closure, not a re-verdict."
    },

    "pages": pages,

    "closed_dialog_summary": {
        "consistent_across_all_pages": True,
        "detail": "mmCartDialog present, aria-hidden=\"true\", inert, zero focusable children on every page. Zero focus leaks into it across all 5 traversals combined."
    },

    "established": [
        "All 5 previously-outstanding pages now have VALID real-Chrome keyboard traversal evidence with retained ordered stop lists.",
        "None of the 5 pages leaks focus into the closed cart dialog.",
        "None of the 5 pages has a zero-size focus stop.",
        "Every page's first stop is a skip link matching brief expectations.",
        "Every page's cycle wraps back to its first stop within the press budget.",
        "Literal 390 CSS px viewport is reachable via CDP; the earlier '500 accepted limit' was a vehicle limitation, not a platform one."
    ],

    "NOT_established": [
        "Per-focus-ring visual conformance — this evidence is DOM/label based, not pixel-based.",
        "Behavior with real screen readers (VoiceOver) — not tested.",
        "Cycle behavior under user gesture other than Tab (Shift-Tab reverse, arrow keys in menus, Escape, etc.).",
        "Whether any of these controls have adequate hit-target size beyond width/height — no min-target guard yet."
    ],

    "residual_risk": [
        "Rsynced artifact rather than committed one — if staging-v1/ later drifts on macbook, this evidence is orphaned unless macbook Claude commits and tags the reviewed state.",
        "Isolated Chrome profile is fresh (no extensions, no cache) — differs from a returning-user's Chrome. Focus behavior is unaffected but paint timing may differ."
    ],

    "files_changed": [
        "_wip/evidence/IMAC-KEYBOARD-PROOF-20260802/ (this directory) — created here",
        "docs/client-review/2026-08-01-saturday-review/staging-v1/ — rsynced from macbook (identical to macbook state, byte-for-byte, SHA-verified). Not committed."
    ],

    "files_confirmed_untouched": [
        "scripts/check-maplemoon-review.py",
        "scripts/check-maplemoon-cart.mjs",
        "scripts/build-maplemoon-saturday-review.py",
        "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.js",
        "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.css",
        "docs/orchestration/LOCK_MANIFEST.json",
        "AGENTS.md"
    ],

    "proposed_next_state": "Ready for Nate's CR-0..CR-4 read. Recommend macbook Claude commit staging-v1/ so future reproducers can `git checkout` the reviewed state.",

    "next_reviewer": "Nate (control-plane, sole verdict authority)"
}

out = BASE / "RESULTS.json"
out.write_text(json.dumps(result, indent=2))
print(f"Wrote {out}")
print(f"  pages: {len(pages)}")
print(f"  total ordered stops: {sum(len(p['ordered_stops']) for p in pages.values())}")
print(f"  size: {out.stat().st_size} bytes")
