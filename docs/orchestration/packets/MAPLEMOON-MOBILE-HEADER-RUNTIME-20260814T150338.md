# MapleMoon mobile header runtime implementation — 2026-08-14 15:03 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-MOBILE-HEADER-RUNTIME-20260814T150338",
  "worker_thread_id": "/root/header_powder_update",
  "state": "hold_until_corrected_faq_preview_receipt_passes",
  "objective": "Implement and prove the already approved DEC-008 mobile header behaviour through the two shared chrome files only: viewport-fixed mobile header, hide after intentional downward scrolling, immediate reveal on upward scrolling, and no automatic movement under reduced motion.",
  "authority": "Nate selected DEC-008 on 2026-08-14. NAV-004 requires runtime proof. The user's withdrawn blanket brand-style sentence grants no additional authority; this packet is bounded only to DEC-008, NAV-004 and existing drawer accessibility contracts.",
  "base": {
    "candidate_root": "/Users/handtomouse/maplemoon_build_20260813",
    "mm_chrome_js_sha256": "cc72e22a121cbdb1ec695d181219ca696b0e020f82fedc243e1f407154c1316c",
    "mm_chrome_css_sha256": "38ae8acbbdd30ebdfbe633ab1f042549fd2573c7e458e946cc2c53596b32349a",
    "homepage_sha256": "27921b2a466ccb670b2851a73043429763d3423bcaf651069e4e860dc01a78b1",
    "our_story_sha256": "2db31868a9791f373f156e7cdeb8261e494d1d47e9418a94c28156e213df7711",
    "carob_story_sha256": "4fd9ad0fabb9d60d0f391925f5a382ccfc8f705b60fca1c681f403a5cd9734bd",
    "shop_sha256": "f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038",
    "faq_sha256": "c5ce7aaf0b9b3221f34eb2928fc2ff6732fc1a915ea80144a4ade2b94011fb6e",
    "stockists_sha256": "4821adfe88680d4f174b7a8700c8d8a65594df2901bf3a7109d51b09040cb887",
    "pure_sha256": "015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65",
    "required_predecessor_receipt": "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-FAQ-CORRECTED-PREVIEW-20260814T145952.json",
    "required_predecessor_preview": "https://maplemoonbuild20260813-krftm36lg-handtomouses-projects.vercel.app",
    "production_immutable": "7vjf2m50b",
    "production_homepage_md5": "6197879a5ca9d3ed0452773abc0bbeb4"
  },
  "readable_paths": [
    "maplemoon_build_20260813/homepage.html",
    "maplemoon_build_20260813/our-story.html",
    "maplemoon_build_20260813/carob-story.html",
    "maplemoon_build_20260813/shop.html",
    "maplemoon_build_20260813/faq.html",
    "maplemoon_build_20260813/stockists.html",
    "maplemoon_build_20260813/pure-carob-bar.html",
    "maplemoon_build_20260813/assets/design-system/mm-chrome.js",
    "maplemoon_build_20260813/assets/design-system/mm-chrome.css",
    "maplemoon_build_20260813/assets/design-system/mm-tokens.css",
    "maplemoon_build_20260813/assets/design-system/mm-primitives.css",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-FAQ-CORRECTED-PREVIEW-20260814T145952.json",
    "maplemoon-website/scripts/check-maplemoon-receipt.py",
    "Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/STATUS.md",
    "Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/MAPLE-MOON-DESIGN-SYSTEM.md",
    "Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/COMPONENT-CONTRACTS.md",
    "Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/RESPONSIVE-ACCESSIBILITY.md"
  ],
  "writable_paths": [
    "maplemoon_build_20260813/assets/design-system/mm-chrome.js",
    "maplemoon_build_20260813/assets/design-system/mm-chrome.css",
    "maplemoon-website/_wip/evidence/mobile_header_runtime_20260814T150338",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-MOBILE-HEADER-RUNTIME-20260814T150338.json"
  ],
  "implementation_contract": [
    "at measured viewport widths up to and including 900 CSS px the header remains fixed to the viewport and visible at scroll top",
    "ordinary jitter does not hide it: require at least 24 cumulative CSS px of downward intent after leaving the top/header region before hiding",
    "once hidden, any deliberate upward scroll sample reveals it immediately; it must not wait for a second threshold",
    "the header remains visible while its menu is open, while keyboard focus is within it, and at/near scroll top",
    "opening the menu from any scroll position reveals the header first; Escape closes it and returns focus to the menu button; Tab remains trapped within the open drawer as before",
    "prefers-reduced-motion: reduce keeps the mobile header fixed and visible and disables automatic transform/transition movement",
    "crossing above 900 CSS px fully clears mobile inline state, attributes, observers/listeners and any layout-reservation mechanism; crossing back remounts exactly once",
    "the implementation preserves scroll position, does not introduce a visible content jump during hide/reveal, and does not obscure the focused control",
    "all state is per the single mounted data-mm-chrome root; no route-specific selector or page rewrite is permitted"
  ],
  "method": [
    "do not begin until the required corrected-FAQ preview receipt exists and its completion and promotion gates pass",
    "create the non-overwriting checkpoint for all four writable paths and run the phase-start gate with --root /Users/handtomouse before the first write",
    "verify the two shared-file hashes and all seven route hashes exactly match the packet",
    "capture baseline measured geometry at 390, 900 and 1440 before editing, including header rect, first-main-content marker rect, scroll position, open/closed drawer state and focus target",
    "implement DEC-008 only in mm-chrome.js and mm-chrome.css; if a page-specific exception or third implementation file is required, stop HOLD rather than broaden scope",
    "serve the candidate locally and prove the full interaction state matrix on all seven routes at measured 390 and 900; prove desktop reset at 1440",
    "repeat the full seven-route matrix with prefers-reduced-motion: reduce and verify the header never auto-hides",
    "at 390 and 900 prove closed/open drawer geometry, six 44px rows, paint-order hit targets, focus trap, Escape, focus return and no content paint-through are unchanged",
    "at 390, 900 and 1440 verify zero horizontal overflow, zero console/page/request/image errors, all local assets 200, and no obscured focused control",
    "capture nonblank screenshots and machine-readable results for representative light-header and night-header routes in visible, hidden, revealed, menu-open and reduced-motion states",
    "run the candidate's exact existing local preflight and record literal output; do not silently substitute a missing verifier",
    "prove production remains frozen at immutable 7vjf2m50b and homepage MD5 6197879a5ca9d3ed0452773abc0bbeb4",
    "write the receipt and run completion then promotion gates; no deployment is authorised"
  ],
  "verify": [
    "only mm-chrome.js, mm-chrome.css, the exact evidence directory and receipt changed",
    "all seven routes satisfy the entire visible/hide/reveal/menu/focus/breakpoint/reduced-motion matrix at measured widths",
    "downward jitter under 24px does not hide; intentional downward motion hides; the first upward sample reveals",
    "no layout jump during hide/reveal, no obscured focused control, no horizontal overflow, and zero runtime/request/image failures",
    "existing seven-route drawer certification remains PASS at 390 and 900",
    "desktop 1440 restores the existing header geometry and behaviour with no stale mobile state",
    "the evidence set is nonblank and includes machine-readable geometry plus rendered screenshots",
    "existing local preflight passes at its exact fail tiers",
    "production immutable target and frozen homepage MD5 remain unchanged",
    "completion and promotion receipt gates pass"
  ],
  "stop": [
    "the predecessor preview receipt/gate, a base hash or the production freeze fails",
    "shared-only implementation cannot override existing route CSS safely",
    "any page-specific HTML/CSS/JS edit or third implementation file appears necessary",
    "any route fails the movement, focus, drawer, overflow, runtime, request, image or layout-jump matrix",
    "a path outside writable_paths changes",
    "deploy, production mutation, commit, push, deletion, stash, gitignore, client contact or broad style refactor is requested"
  ],
  "forbidden_actions": [
    "edit any of the seven HTML pages or any asset other than the two shared chrome files",
    "change colours, typography, buttons, page-header imagery, catalogue content, product imagery or unrelated styling",
    "deploy, promote, move production, alter deployment protection, commit, push, delete, stash, gitignore or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS then independent certification",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Scope note

This is a single rule-ID implementation, not the withdrawn blanket brand-style alignment request. A route exception is a stop condition because it would create overlapping ownership with the seven page files.
