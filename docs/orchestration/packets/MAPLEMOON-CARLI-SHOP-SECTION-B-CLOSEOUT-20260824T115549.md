# MapleMoon Carli Shop Section B closeout — 2026-08-24 11:55 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-CARLI-SHOP-SECTION-B-CLOSEOUT-20260824T115549",
  "candidate_id": "MAPLEMOON-CARLI-SHOP-SECTION-B-CANDIDATE-20260824-001",
  "cluster_id": "MAPLEMOON-CARLI-SHOP-SECTION-B",
  "worker_thread_id": "/root",
  "phase": "CARLI-SHOP-SECTION-B",
  "state": "blocked_pre_acquisition",
  "approval_class": "nate-directed-mutating-local-wip-and-contract",
  "objective": "Verify Carli checklist items B01-B18 against the current Home and Shop WIP sources, preserve the five unselected review-only image swaps as open, remove the mistakenly placed B18 review candidate from Shop, refresh only the resulting Shop route hash binding, and produce a machine-verifiable receipt without touching production, Shopify or another page lane.",
  "authority": "Nate supplied the exact checklist, target, prior receipt, image-selection holds, page-specific bar-order ruling, Bites-grouping ruling, catalogue-pricing ruling, required checks and commit instruction in the current task.",
  "non_goals": [
    "select or place any generated image candidate",
    "change Home, Our Story, What is Carob, Shopify, deployment, production or client state",
    "change product identity, catalogue hierarchy, copy beyond B01-B18 or pricing semantics",
    "write the source checklist outside the repository when the session filesystem does not admit that path"
  ],
  "base": {
    "branch": "safety/founders-20260824",
    "head": "c54d115cc1d7d679641e5061d5ee76407c48bd9b",
    "shop_sha256": "f9d150dea283d43eb0a14e02dfeccf9ea1eb4eae87ec82a546ab6984f3fa5604",
    "routes_sha256": "4c77b0a142a204d232d61ab10384a239e65beadcf7403f589ea4aa56e2cbe6a7",
    "checklist_sha256": "3d6b375874237f3856ae1dc7c47e686385a9dd456f70adab6f563f9212b332bb",
    "prior_lane_receipt_sha256": "c8b5285191fe1fba5ab2f21c707aebe2923d669919a30f52a3a0540135900468"
  },
  "dependencies": [
    "MAPLEMOON-CARLI-HOME-SHOP-IMAGERY-20260823-RECEIPT-001",
    "MAPLEMOON-HOME-SHOP-CONTRACT-RECONCILIATION-20260824T102930-RECEIPT-01"
  ],
  "sources": [
    "/Users/handtomouse/Desktop/MrCC_PAI_Stage1_Files/UFC/clients/maplemoon/CARLI_WEBSITE_NOTES_20260814_CHECKLIST.md",
    "maplemoon-website/out/maplemoon_lane_20260823_receipt.json",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-CATALOGUE-RECONCILIATION-R3-20260824T104207.md"
  ],
  "skills": [],
  "readable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-CARLI-SHOP-SECTION-B-CLOSEOUT-20260824T115549.md",
    "maplemoon-website/AGENTS.md",
    "maplemoon-website/CLAUDE.md",
    "maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html",
    "maplemoon-website/_wip/shop.WIP.html",
    "maplemoon-website/out/maplemoon_lane_20260823_receipt.json",
    "maplemoon-website/out/image_candidates_20260823",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-CATALOGUE-RECONCILIATION-R3-20260824T104207.md",
    "maplemoon-website/docs/design-system/contracts/routes.v1.json",
    "maplemoon-website/docs/design-system/contracts/exceptions.v1.json",
    "maplemoon-website/scripts/check-maplemoon-design-system.mjs"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/shop.WIP.html",
    "maplemoon-website/docs/design-system/contracts/routes.v1.json",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CARLI-SHOP-SECTION-B-CLOSEOUT-20260824T115549.json"
  ],
  "action": "Remove only the Carob Powder review-candidate imagePath binding, preserve every other B01-B18 implementation byte, update the Shop baseline_sha256 in routes.v1.json to the resulting exact Shop hash, verify both checker modes, record item-level close/open evidence and leave the external checklist update on explicit filesystem HOLD.",
  "implementation_contract": [
    "B01-B04, B06-B07, B09-B16 are verification-only when the current source exactly satisfies Carli's instruction and the two supplied rulings",
    "B05, B08, B10, B17 and B18 remain open with the exact note awaiting Nate's pick from image_candidates_20260823",
    "remove the B18 /out/image_candidates_20260823/powder_roasted_no_bg.png binding and do not place any replacement candidate",
    "preserve Shop bar order pink, red, green, yellow, blue, brown; do not reconcile it with Home",
    "preserve all six Eclipse-family cards, including the five variable products at effective prices $5.99/$32.99/$59.99 with compare-at values $35.99/$71.99 governed by the catalogue reconciliation, and preserve the separate $24.99 bundle",
    "change only the Shop baseline_sha256 in routes.v1.json after the WIP edit; exceptions.v1.json remains byte-identical"
  ],
  "verify": [
    "exact assertions prove B01-B04, B06-B07, B09-B16 satisfied and no generated image_candidates_20260823 path remains in either inspected WIP",
    "all five image items B05, B08, B10, B17 and B18 remain unselected and unplaced",
    "node scripts/check-maplemoon-design-system.mjs --contracts-only returns PASS",
    "node scripts/check-maplemoon-design-system.mjs --route-conformance all returns PASS",
    "exceptions.v1.json, all excluded WIPs, assets, out candidates, Shopify, deployment and production remain unchanged",
    "receipt gate complete and promote phases return PASS for the exact three-path writable scope"
  ],
  "done": "The Shop source contains every settled B-item, no review-only candidate binding, an exact current route hash, two passing required checks, released leases and a committed repository closeout; the five image decisions and the inaccessible external checklist write are reported truthfully as HOLD/open.",
  "stop": [
    "a generated candidate would need to be selected or placed",
    "a source, lock, checkpoint, hash, required check, scope or pricing assertion fails",
    "another page, asset, Shopify, deployment, production or client action is required",
    "the external checklist cannot be updated through an admitted repository-relative path"
  ],
  "blocked_reason": "The shared docs/design-system/contracts/routes.v1.json lease became blocked under MAPLEMOON-CARLI-SECTION-D-20260824T015534Z after that lane's required Desktop checklist write was rejected by the same session filesystem boundary. This packet did not acquire leases or mutate Shop, routes or its receipt.",
  "forbidden_actions": [
    "mutate, delete, stage, move, rename or gitignore any preserved out artifact",
    "touch homepage_real_1_lead_photo.WIP.html, our-story.WIP.html or carob-story.WIP.html",
    "select or place B05, B08, B10, B17 or B18 imagery",
    "write Shopify, deploy, publish, upload, send or contact the client"
  ],
  "next_reviewer": "Nate for the five image picks and the out-of-workspace checklist update",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## BOSS decision

GO for the exact local Shop candidate-unbinding and Shop route hash reconciliation only.
All settled copy/order/grouping work is verification-only. Generated product imagery remains
review-only until Nate picks it, and the external checklist file remains outside this session's
writable roots.
