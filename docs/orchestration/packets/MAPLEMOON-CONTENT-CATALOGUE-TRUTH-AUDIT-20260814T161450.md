# MapleMoon content and catalogue truth audit — 2026-08-14 16:14 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-CONTENT-CATALOGUE-TRUTH-AUDIT-20260814T161450",
  "worker_thread_id": "/root/header_powder_update",
  "state": "ready_read_only_truth_audit",
  "objective": "Build a route-by-route, source-backed truth register for the current seven-page candidate, separating private-preview-safe content from production blockers and exact Nate-only decisions without editing the candidate.",
  "authority": "Workstream 5 of MAPLEMOON-SEVEN-WORKSTREAM-PROGRAM-20260814T143154 requires a read-only claim, catalogue, CTA and pending-product audit before any content mutation. The Styles Kit is checked input but not blanket implementation authority; later BOSS evidence and explicit client/Nate sources must be reconciled, not silently overridden.",
  "base": {
    "candidate_root": "/Users/handtomouse/maplemoon_build_20260813",
    "content_safety_sha256": "f93775ee1d96f518100dc6cd036ea85edc3414ea8110abc8e95fdf2d88269403",
    "decisions_needed_sha256": "a410c87bcdef46ecfa5a41a98c81c157ff482d02a252756faf5d61b8c9541969",
    "source_register_sha256": "f04cd18d640378938caace711a7fb2b3b5ebbc7c691df42adc80f9b386f7928c",
    "rule_register_sha256": "728960a4fb87978741730990ddee3319eebb15bfa791cce45edf81b60baf621f",
    "boss_brief_sha256": "3f1e51db694cd53f43bde0d0783b262a526e200ea3657d521c313d97c0e2e4db",
    "asset_matrix_sha256": "8b68ad125353c57befd0f0035acae2530756cb52c9a242cbdd12a148becb40a0",
    "styles_intake_sha256": "f476f207550fc44dca08638a486ae071105a79a56f48250b8e96e5dcc4a2d2ed"
  },
  "page_sha256": {
    "homepage.html": "27921b2a466ccb670b2851a73043429763d3423bcaf651069e4e860dc01a78b1",
    "our-story.html": "2db31868a9791f373f156e7cdeb8261e494d1d47e9418a94c28156e213df7711",
    "carob-story.html": "4fd9ad0fabb9d60d0f391925f5a382ccfc8f705b60fca1c681f403a5cd9734bd",
    "shop.html": "f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038",
    "faq.html": "c5ce7aaf0b9b3221f34eb2928fc2ff6732fc1a915ea80144a4ade2b94011fb6e",
    "stockists.html": "4821adfe88680d4f174b7a8700c8d8a65594df2901bf3a7109d51b09040cb887",
    "pure-carob-bar.html": "015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65"
  },
  "readable_paths": [
    "maplemoon_build_20260813/homepage.html",
    "maplemoon_build_20260813/our-story.html",
    "maplemoon_build_20260813/carob-story.html",
    "maplemoon_build_20260813/shop.html",
    "maplemoon_build_20260813/faq.html",
    "maplemoon_build_20260813/stockists.html",
    "maplemoon_build_20260813/pure-carob-bar.html",
    "maplemoon_build_20260813/mock-cart.js",
    "maplemoon_build_20260813/mock-cart.css",
    "maplemoon_build_20260813/assets",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-SEVEN-WORKSTREAM-PROGRAM-20260814T143154.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ASSET-SLOT-AUTHORITY-MATRIX-20260814T143614.md",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-ASSET-AUTHORITY-ADDENDUM-20260814T160123.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ASSET-AUTHORITY-ADDENDUM-20260814T160123.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-STYLES-KIT-BOSS-INTAKE-20260814T151331.md",
    "maplemoon-website/scripts/check-maplemoon-receipt.py",
    "Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/CONTENT-SAFETY-AND-VOICE.md",
    "Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/DECISIONS-NEEDED.md",
    "Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/SOURCE-REGISTER.md",
    "Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/RULE-REGISTER.json",
    "UFC/ops/bus/maplemoon/BOSS_20260814.md",
    "UFC/ops/bus/maplemoon/CHECKPOINT_20260814_0915_photography_delivery.md",
    "maplemoon_product_shots_20260814/product_master_18_sku_v7_manifest.md"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/content_catalogue_truth_audit_20260814T161450",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CONTENT-CATALOGUE-TRUTH-AUDIT-20260814T161450.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CONTENT-CATALOGUE-TRUTH-AUDIT-20260814T161450.json"
  ],
  "method": [
    "create a non-overwriting checkpoint for the exact three writable outputs and pass the phase-start gate with --root /Users/handtomouse before the first write",
    "verify all pinned authority and route hashes before acquisition; record any changed source as HOLD rather than adapting silently",
    "extract the visible customer-facing text, metadata, structured data, alt text, CTA labels/destinations, forms, product cards, option labels/prices, pending states and stockist entries from all seven routes",
    "render all seven routes at measured 390 and 1440, including open cart and open mobile drawer states, so hidden implementation text is not misclassified as customer-visible",
    "for every material claim or action record route, exact text or compact stable identifier, category, governing source/rule/date, visibility state, and status: APPROVED, PRESERVE-CARLI-PENDING-NATE, PRIVATE-PREVIEW-ONLY, PRODUCTION-BLOCKER, or UNKNOWN",
    "reconcile the Styles Kit six-bar-only rule with the current 24-card private catalogue and later BOSS evidence; do not pick a winner where authority conflicts—name the exact Nate decision needed and affected routes/files",
    "distinguish product identity validity from exact image live-use authority; retain the measured photography truth of 5 wired heroes / 14 eligible V9 frames = 36 percent",
    "positively scan for unsupported health/diet/origin/manufacturing/availability claims, testimonials, fake live checkout/map/geolocation/contact/newsletter behavior, internal WIP vocabulary, placeholder links and silent personal-data collection",
    "verify the approved caffeine FAQ question/answer occurs exactly once and broader product-level caffeine claims do not appear",
    "verify Goji and Coconut Carob Bites remain distinct, and identify every candidate product/category beyond the six-bar rule without deleting or endorsing it",
    "classify the review cart language and controls under CNT-004/CMP-010: state whether disclosure makes it private-preview-safe and separately whether any production release remains blocked",
    "produce a route matrix, catalogue matrix, unresolved-decision register and the smallest ordered content correction packets that could follow only after authority is supplied",
    "write nonblank evidence and receipt; rerun all route/source hashes and completion then promotion gates; no implementation or deploy is authorised"
  ],
  "verify": [
    "the seven-route truth matrix covers visible copy, metadata/alt text, CTAs/forms and dynamic cart/drawer text",
    "the complete 24-card current catalogue is accounted for without confusing identity, preview presence and production approval",
    "six-bar versus 24-card authority conflict and CV-014/CV-051/CV-062 are recorded as exact Nate-only decisions, not silently resolved",
    "fake-live behavior, internal language, claims, testimonials, stockist truth, caffeine wording and silent-data risks have positive-controlled scans",
    "36 percent is the only photography completion figure recorded",
    "all source and route hashes remain unchanged after the audit",
    "only the exact evidence directory, Markdown review and receipt changed",
    "completion and promotion gates pass"
  ],
  "stop": [
    "a pinned source or route hash changes",
    "an authority conflict cannot be represented without inventing a decision",
    "a page/source/build edit, asset wiring, catalogue rewrite or external communication would be needed",
    "a path outside writable_paths changes",
    "deploy, production mutation, commit, push, delete, stash, gitignore or client contact is requested"
  ],
  "forbidden_actions": [
    "edit any candidate/site/build/source/media file",
    "choose six bars or 24 products on Nate's behalf",
    "remove or rewrite Carli-requested copy, product identities, prices or pending states",
    "deploy, promote, alias, alter protection, move production, commit, push, delete, stash, gitignore or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS, then Nate only for decision-bound content",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Scope note

This is an evidence-only truth pass. It identifies exact safe corrections and decision owners; it does not authorize content or catalogue changes.
