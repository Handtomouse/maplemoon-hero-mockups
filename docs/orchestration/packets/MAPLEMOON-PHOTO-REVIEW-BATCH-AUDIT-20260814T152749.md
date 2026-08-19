# MapleMoon photo review batch independent audit — 2026-08-14 15:27 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-PHOTO-REVIEW-BATCH-AUDIT-20260814T152749",
  "worker_thread_id": "/root/recertify_updated_preview",
  "state": "ready_evidence_only",
  "objective": "Independently verify the mechanical and rendered claims for the four latest photography review assets without granting SKU identity, live-use approval or website integration authority.",
  "authority": "The photography task 019ffd5b-edd2-7b23-8780-453f9b67a532 completed a review-only batch in response to Nate's isolated-powder, equal-elixir-scale, corrected-fudge and low-angle five-item-bundle requests. A lane self-report is not evidence, so BOSS requires an independent bounded audit before updating asset readiness.",
  "base": {
    "source_task": "019ffd5b-edd2-7b23-8780-453f9b67a532",
    "review_html_sha256": "ed859eaa0d62a97d19bc2c377bf78084a9b3799d50b7eb47a0ecd7201ba90167",
    "powder_sha256": "e935a9c6783f0fe0fed7659692d2cea0f4056afa4734a75e4dcba7b629966a27",
    "elixir_pure_sha256": "d3bda575c320bc42ca69b5ddd0ba806e392f9b7694d31f7ea0310c501fcbd18a",
    "elixir_spiced_sha256": "210aab110c8682d6140a50b3ee1621aec0ffe43a9d86841433a8852512c86bba",
    "bundle_sha256": "ac87e7c1a5b6e96cc40d607e69a841f0b9987f642f3b32e4128dacad2c3814d6",
    "production_immutable": "7vjf2m50b",
    "production_homepage_md5": "6197879a5ca9d3ed0452773abc0bbeb4"
  },
  "readable_paths": [
    ".codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814/maplemoon_product_corrections_review_20260814.html",
    ".codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814/assets/carob_powder_isolated.png",
    ".codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814/assets/elixir_pure_isolated_equal-size.png",
    ".codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814/assets/elixir_spiced_isolated_equal-size.png",
    ".codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814/assets/five_item_bundle_low_angle_isolated.png",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ASSET-SLOT-AUTHORITY-MATRIX-20260814T143614.md",
    "maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/photo_review_batch_audit_20260814T152749",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-PHOTO-REVIEW-BATCH-AUDIT-20260814T152749.json"
  ],
  "method": [
    "create the non-overwriting checkpoint and run the phase-start gate with --root /Users/handtomouse before the first evidence or receipt write",
    "verify all five acquisition hashes exactly",
    "decode each PNG independently and prove nonzero dimensions, a real alpha channel, both transparent and opaque pixels, nonempty subject bounds and no baked transparency checkerboard",
    "measure alpha-derived object bounds for both elixirs and prove width, height, centreline and baseline are identical; the reported target is 584 by 975 pixels",
    "inspect the isolated powder against its white-background rendering and prove no pack, label, rectangular packaging silhouette or extra primary object is present",
    "inspect the five-item bundle at native resolution and on light/dark checks; count exactly five visually distinct product bodies and record whether pecan, almond, hazelnut, goji and layered fudge are distinguishable without claiming authoritative SKU identity",
    "render the supplied review HTML at measured 390, 900 and 1440 CSS px and verify all four final assets load, labels remain visible, zero horizontal overflow and zero console/page/request/image errors",
    "capture independent nonblank contact sheets/screenshots and machine-readable pixel/geometry results",
    "read-only prove neither website tree references any of the four new filenames and include a planted filename positive control before making that absence claim",
    "read-only prove production remains frozen at immutable 7vjf2m50b and homepage MD5 6197879a5ca9d3ed0452773abc0bbeb4",
    "write the receipt and run completion gate"
  ],
  "verify": [
    "all acquisition hashes match and all PNGs have genuine transparency with nonempty subjects",
    "pure and spiced elixir alpha bounds are exactly 584 by 975 with identical centreline and baseline",
    "powder is visually isolated without packaging",
    "bundle presents exactly five distinct bodies and the layered fudge form is visibly differentiated",
    "review surface passes at measured 390, 900 and 1440 without overflow/runtime/broken-image errors",
    "positive-controlled search confirms the four assets remain unwired in both website trees",
    "receipt explicitly retains reconstructed elixir fine print, bundle acceptance and all exact SKU/live-binding questions as Nate-only holds",
    "production remains frozen and no website/build/photo source/deployment file changes",
    "completion receipt gate passes"
  ],
  "stop": [
    "an acquisition hash, decode, alpha, geometry, count, render, absence-control or production-freeze check fails",
    "the audit would assert authoritative SKU identity, approve reconstructed label text or grant live-use authority",
    "a source/photo/website/build/deployment file would need to change",
    "any path outside writable_paths changes"
  ],
  "forbidden_actions": [
    "edit, regenerate, relabel, move, copy into a site, integrate, deploy, promote, commit, push, delete, stash or gitignore any asset",
    "approve elixir fine print, bundle composition, exact SKU identity or website binding",
    "change production or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS then Nate for visual/live-use decisions",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Acceptance boundary

A PASS makes these mechanically verified review assets only. It does not make any of them live-ready, client-approved or eligible for integration.
