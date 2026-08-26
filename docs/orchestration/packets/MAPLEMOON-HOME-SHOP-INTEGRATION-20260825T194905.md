# MapleMoon Home + Shop single-writer integration — 2026-08-25 19:49 AEST

This packet creates one local, non-overwriting private-preview candidate. It does
not authorise upload, `.vercel`, Git, Shopify, production, publishing, client
contact, or a claim that the whole site is finished.

Nate's latest Home decision is **C / HERO HOLD**. The current Home includes one
unauthorised five-line `hero CTA hard-centre, Nate 19:38` drift. Removing exactly
those five lines reproduces the last frozen Home SHA-256
`558c5bb86346d69029e0fa4abc34c9bff3c4386522e97eef34e5d2e655ecf1d5`.
The worker must remove that drift before any admitted integration and must make no
other hero/header change.

## Pinned inputs

- Home current acquisition SHA-256:
  `ddb18820d7f8095286d7e2aec387fe0272ee1cd148ac501e8981bb4387a5fd18`.
- Home after exact unauthorised-drift removal:
  `558c5bb86346d69029e0fa4abc34c9bff3c4386522e97eef34e5d2e655ecf1d5`.
- Shop SHA-256:
  `b1834aeacb06e11dc5b5de4b851c77d47fa32fae38f0e2579a5b03235ef28ed8`.
- Our Story admitted lane SHA-256:
  `e45a05474e6a9dce28afc9bf5094790eaaad21a51912e03c36b5c0ff4645dfa5`.
- F98 SHA-256:
  `d254e21f31c7b1e41155884437c7831806502abf7d1a77e72976a8383a82e32e`.
- Icon v2 review manifest SHA-256:
  `cb0f526309c000626da312c504b384e6e9b7de415b7074556488fc191509844b`.
- Temporary bundle source:
  `_wip/deploy/generated/maplemoon_temporary_bundle_preview_20260825t170206/assets/product_shots/temporary_eclipse_bite_bundle_web.webp`,
  SHA-256 `8bca090850c29da285ae266d8bf666199ae7cacbeee475160df13bc82c66932f`,
  90,474 bytes, 1080x668.
- Mock cart remains pinned/read-only at
  `/Users/handtomouse/maplemoon_build_20260813/mock-cart.js`.

## Exact implementation

1. Confirm every pin and every writable pre-state before checkpointing.
2. Create one timestamped, non-overwriting recovery checkpoint for all exact
   writable paths and require receipt `phase=start` PASS before the first target
   write.
3. Remove only Home lines comprising the comment `hero CTA hard-centre, Nate
   19:38`, the three associated declarations, and their blank separator. Require
   the intermediate Home hash to equal `558c5bb...` exactly.
4. Create `assets/icons/mm-icons-v2.svg` from the 44 approved v2 individual SVGs.
   Preserve geometry/viewBox/strokes, use `mm-icon-${manifest.id}` symbols, remove
   review-only metadata, and include no raster, script, style, event handlers,
   external dependencies, text nodes, or hard-coded drawing colours.
5. Point only the five Home product-category controls and the Home three-row
   cacao/carob comparison to the new v2 sprite. Preserve all comparison copy and
   row order byte-for-byte. Use six distinct semantic comparison symbols and
   exactly three v2 checks. Preserve the current hairline layout and keep the
   removed comparison segment control absent.
6. Copy the exact temporary bundle bytes to
   `assets/product_shots/temporary_eclipse_bite_bundle_web.webp`. Bind it to Home
   and Shop using the receipt-backed site-fit logic. Show exactly one visible
   `TEMPORARY STAGING / REPLACE BEFORE FINAL` marker on the bundle in each route.
   Home and Shop must use the same exact new asset. Shop `All` shows it; every
   specific flavour hides it. Do not delete the old bundle asset.
7. Preserve the three current Home ritual bindings, captions below images, and
   object positions `24% / 20% / 38%`; verify them visually but do not re-author
   them. Preserve the Home section flow, copy, media, buttons, carousel, range
   selector, transitions, footer, shared styles and all non-scoped behaviour.
8. Do not apply the held R6 stylesheet, its 14-to-18 px sampler change, the held
   Home modal, or any other Styles Kit planning proof.
9. Build one new non-overwriting local candidate and verify it. Stop after a
   truthful completion receipt; do not promote or upload.

## Home invariants after every Home write

- case-insensitive `bites` occurrence count is 22 or 23; intended current count is
  23 because `mm-icon-eclipse-bites` adds the 23rd.
- q-segments **DOM element** count is zero; dormant CSS references do not fail.
- bare `mm-pending` class token count is zero; `mm-pending-media` is allowed.
- no Home hero/header source, copy, media, controls, or computed geometry changes
  beyond removal of the exact unauthorised drift.

## Verification

- Run the existing v2 icon checker and a worker-owned final integration checker
  with positive controls.
- Build through `scripts/build-maplemoon-wip-preview.py` into the exact new
  generated candidate path; do not touch the builder.
- Use CDP, assert `innerWidth`, and test exact 1440 and 390. Never use
  `chrome --window-size` or `mobile_probe.py`.
- Require HTTP 200, root overflow zero, internal semantic containment, broken
  assets zero, console/page/request failures zero, and required targets >=44 px.
- Exercise Home categories, range carousel, comparison, temporary bundle and
  Shop grid/list plus every flavour filter.
- Capture nonblank human-review crops for Home hero/header, comparison, range,
  ritual, section transitions, footer, Home bundle, Shop bundle grid and Shop
  bundle list at 1440 and 390. A build PASS is not visual evidence.
- Prove Home hero projection after drift removal is byte-/semantic-equivalent to
  the `558c5bb...` baseline, and prove all non-scoped Home/Shop projections remain
  unchanged.
- Replay all protected pins at close. If any protected source moves, stop and
  close HOLD without rerunning against moving bytes.

## Stop conditions

- any pre-state or source pin mismatch;
- any new concurrent writer or target drift;
- any required edit beyond the exact implementation above;
- any failed browser, visual, invariant, icon, asset, filter, projection, receipt,
  or close-pin gate;
- any Git, `.vercel`, deploy, upload, Shopify, production, publishing or client
  action.

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-HOME-SHOP-INTEGRATION-20260825T194905",
  "worker_thread_id": "019ffe53-6243-73a2-9d75-e1a072cd07ce",
  "state": "ready_single_writer_local_candidate_only",
  "objective": "Remove the unauthorised Home hero drift, integrate the approved v2 Home icons and receipt-backed temporary bundle into Home and Shop, build and certify one local non-overwriting candidate without upload.",
  "readable_paths": [
    "maplemoon-website/_wip/evidence/icon_session_20260825/v2_review",
    "maplemoon-website/_wip/deploy/generated/maplemoon_temporary_bundle_preview_20260825t170206",
    "maplemoon-website/_wip/our-story.WIP.html",
    "maplemoon-website/_wip/carob-story.WIP.html",
    "maplemoon-website/_wip/faq.WIP.html",
    "maplemoon-website/_wip/stockists.WIP.html",
    "maplemoon-website/_wip/contact.WIP.html",
    "maplemoon-website/assets/our_story/ritual_quiet_finish_20260825.webp",
    "maplemoon-website/assets/our_story/ritual_softer_pause_20260825.webp",
    "maplemoon-website/assets/our_story/ritual_last_cup_20260825.webp",
    "maplemoon-website/scripts/build-maplemoon-wip-preview.py",
    "maplemoon-website/scripts/check-maplemoon-icon-v2-review.mjs",
    "maplemoon-website/scripts/check-maplemoon-receipt.py",
    "maplemoon_build_20260813/mock-cart.js"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html",
    "maplemoon-website/_wip/shop.WIP.html",
    "maplemoon-website/assets/icons/mm-icons-v2.svg",
    "maplemoon-website/assets/product_shots/temporary_eclipse_bite_bundle_web.webp",
    "maplemoon-website/_wip/deploy/generated/maplemoon-home-shop-integration-20260825T194905",
    "maplemoon-website/_wip/evidence/home_shop_integration_20260825T194905",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-HOME-SHOP-INTEGRATION-20260825T194905.json"
  ],
  "verify": [
    "checkpoint and receipt phase=start PASS before first target write",
    "exact pin and unauthorised-drift reverse-hash controls",
    "44-symbol v2 sprite and route-semantic icon checks",
    "Home invariants and scoped projection equality",
    "temporary bundle byte identity, labels and Home/Shop filter behaviour",
    "non-overwriting build and exact CDP 1440/390 browser QA",
    "human inspection of all named nonblank crops",
    "close-pin replay and receipt phase=complete PASS"
  ],
  "stop": [
    "target or source drift",
    "scope expansion or any required check failure",
    "Git, .vercel, deploy, upload, Shopify, production, publishing or client action"
  ],
  "requires_visual_evidence": true,
  "next_reviewer": "MapleMoon BOSS; Nate must explicitly approve any later upload"
}
<!-- CONTROL-PLANE:END -->
