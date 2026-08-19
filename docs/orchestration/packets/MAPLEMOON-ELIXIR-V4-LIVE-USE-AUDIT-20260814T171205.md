# MapleMoon elixir v4 live-use audit — 2026-08-14 17:12 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-ELIXIR-V4-LIVE-USE-AUDIT-20260814T171205",
  "worker_thread_id": "/root/dedup_risk_audit",
  "state": "ready_read_only_live_use_audit",
  "objective": "Independently verify the new same-size clean-edge elixir v4 pair, compare it with the currently wired candidate elixirs and existing asset authority, and issue an explicit GO or HOLD for live use without copying, wiring or editing any product asset.",
  "authority": "The photography task produced two new review-only v4 PNGs and a proof after the prior asset audit. The task explicitly states that fine packaging text remains reconstructed. Mechanical quality is not live-use approval; only Nate can accept reconstructed label detail or bind these files to production slots.",
  "base": {
    "candidate_root": "/Users/handtomouse/maplemoon_build_20260813",
    "photography_thread_id": "019ffd5b-edd2-7b23-8780-453f9b67a532",
    "pure_v4_sha256": "70f93f414902ae1b10e7ae1416954348aa20bd1d6950e37d05979b4e4aa9eb93",
    "spiced_v4_sha256": "414f727e84ca0dc24749b10b1092f4618e9f9fc9b954304442a7a0a8779749bb",
    "shared_alpha_v4_sha256": "39d6ca8c5539d2662703dbe7fa4795c10a30172b39574c487c806ad2d7fe5850",
    "proof_v4_sha256": "fab275c64ec07e69ec8a3acab4c4cd32f80592e05d67251ea81137d073042e0d",
    "shop_html_sha256": "f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038",
    "wired_plain_sha256": "4398f43fcc7ff571f4eea4643e078f8416e6921f4e979f5bf31e53338e04916a",
    "wired_spiced_sha256": "9b92c0f0a0cc11b11aa9a5fa4cb7683b420db373e556c74adcb1ba576ffe1163",
    "asset_matrix_sha256": "8b68ad125353c57befd0f0035acae2530756cb52c9a242cbdd12a148becb40a0",
    "asset_addendum_sha256": "ccc4f3ca6991fd33b3f1348c051bc0cb6a7e6b920767ba0ca6c0581259f626f0",
    "working_photo_ratio": "5 wired photo_finals hero files / 14 eligible V9 frames = 36 percent"
  },
  "readable_paths": [
    ".codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814/assets/elixir_pure_same_size_clean_edges_v4.png",
    ".codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814/assets/elixir_spiced_same_size_clean_edges_v4.png",
    ".codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814/assets/elixir_clean_shared_alpha_v4.png",
    ".codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814/maplemoon_elixir_clean_edges_proof_v4.html",
    "maplemoon_build_20260813/shop.html",
    "maplemoon_build_20260813/assets/product_shots/elixir_plain.webp",
    "maplemoon_build_20260813/assets/product_shots/elixir_spiced.webp",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ASSET-SLOT-AUTHORITY-MATRIX-20260814T143614.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ASSET-AUTHORITY-ADDENDUM-20260814T160123.md",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-PHOTO-REVIEW-BATCH-AUDIT-R2-20260814T153609.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-PHOTO-REVIEW-BATCH-AUDIT-R2-20260814T153609.json",
    "maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/elixir_v4_live_use_audit_20260814T171205",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ELIXIR-V4-LIVE-USE-AUDIT-20260814T171205.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ELIXIR-V4-LIVE-USE-AUDIT-20260814T171205.json"
  ],
  "method": [
    "create a timestamped non-overwriting checkpoint for the exact three writable outputs and pass phase-start with --root /Users/handtomouse before the first write",
    "verify all pinned hashes at acquisition and close; record dimensions, colour model and alpha statistics for both v4 files and the shared mask",
    "independently measure visible bounds, connected components, interior transparent holes and alpha equality; test the claimed identical 586 by 977 silhouettes rather than inheriting the producer's result",
    "use positive-controlled edge tests and rendered white, neutral-grey and black backdrops to detect halos, colour fringing, clipping or opaque contamination",
    "render a neutral review-only surface at measured 390, 900 and 1440; require nonblank screenshots, zero page/console/request/image failures and actual image 200 responses",
    "compare v4 scale, crop, identity and visible label detail with both currently wired candidate elixirs; do not treat OCR similarity or visual plausibility as source or regulatory authority",
    "state prominently that fine packaging text is reconstructed and therefore no label, ingredient, nutrition, compliance or fine-print fidelity is certified",
    "positive-control and scan both MapleMoon website/build trees for the two v4 filenames, their exact hashes and equivalent copied bytes; record every occurrence and whether the assets are genuinely unwired",
    "produce a live-use boundary table separating mechanical/render quality, SKU identity, package-text fidelity and Nate approval; return GO only if every required authority exists, otherwise HOLD with one exact decision request",
    "record that product-image review does not alter the 36 percent V9 hero-photo working figure",
    "write receipt and run completion gate; run promotion gate only to prove evidence completeness, never to grant live use"
  ],
  "verify": [
    "all pinned hashes match at acquisition and close",
    "dimensions, alpha, bounds, components, holes and edge quality are independently evidenced with positive controls",
    "390, 900 and 1440 review renders are nonblank and error-free",
    "current candidate binding and all v4 occurrences are reported exactly",
    "reconstructed fine packaging text remains an explicit live-use hold unless Nate has separately approved it",
    "36 percent remains the only photo-completion figure",
    "only the exact evidence directory, review and receipt change",
    "completion gate passes"
  ],
  "stop": [
    "a pinned input or candidate hash changes",
    "a required mechanical, browser, positive-control or absence check fails",
    "live-use authority is missing or contradicted",
    "a candidate, source, media, site, build or Styles Kit edit would be needed",
    "a path outside writable_paths changes",
    "deploy, production mutation, commit, push, delete, stash, gitignore or client contact is requested"
  ],
  "forbidden_actions": [
    "copy, edit, relabel, regenerate, optimise, integrate or wire any elixir image",
    "approve reconstructed package text or a product-image slot for Nate",
    "edit candidate/site/build/source/media or prior evidence",
    "deploy, promote, alias, alter protection, move production, commit, push, delete, stash, gitignore or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS, then Nate only for any reconstructed-label or live-use decision",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Boundary

This packet audits a review artifact. A mechanically clean image is still not a live-approved product image.
