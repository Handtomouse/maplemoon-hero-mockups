# MapleMoon admitted preview certification R2 — 2026-08-24 10:54 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-ADMITTED-PREVIEW-CERT-R2-20260824T105404",
  "worker_thread_id": "019ffe53-6243-73a2-9d75-e1a072cd07ce",
  "state": "admitted_non_overwriting_wrapper_correction_and_local_certification",
  "objective": "Supersede the failed R1 candidate with a non-overwriting R2 build that removes exactly one development-only powder imagePath from the generated Shop page, installs the exact previously admitted powder_roasted.webp into generated output, then runs the full local seven-route certification. Do not change source or deploy.",
  "authority": "R1 mechanically built but failed the mandatory private-path check because _wip/shop.WIP.html carries one /out/ powder override. The same product object retains img:'powder_roasted'. The exact admitted KEEP powder asset remains available at maplemoon_build_20260813/assets/product_shots/powder_roasted.webp with SHA-256 40efa1836bffcf69b44084291b1996f8dc7a70d6f4bcef22e658904fa8a26eaf; the repo fallback has a different legacy hash and is not authority. Generated-output-only exact seam removal plus exact admitted-asset copy is deterministic and does not alter product copy, price, order, source WIP or media authority.",
  "base": {
    "head": "7c04f808e285acc116ae0f93c3d887ee1e96aea3",
    "r1_receipt_sha256": "f1744b36a0d03fd3baf0520acb7b419168e63df1ee2e93bed4cf6077f5da422d",
    "builder_sha256": "803c439e0e937309b7ada0c3f886983908c3cc6aed64f92e38c57fd656707808",
    "shop_wip_sha256": "f9d150dea283d43eb0a14e02dfeccf9ea1eb4eae87ec82a546ab6984f3fa5604",
    "powder_keep_sha256": "40efa1836bffcf69b44084291b1996f8dc7a70d6f4bcef22e658904fa8a26eaf",
    "our_story_root_sha256": "8dc01af541712a54986270f5bdf51f41ea48fa5be2699fa3610182910668458f"
  },
  "readable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-ADMITTED-PREVIEW-CERT-R2-20260824T105404.md",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-ADMITTED-PREVIEW-CERT-20260824T105053.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ADMITTED-PREVIEW-CERT-20260824T105053.json",
    "maplemoon-website/_wip/evidence/admitted_preview_cert_20260824T105053/FAILURE.md",
    "maplemoon-website/scripts/build-maplemoon-wip-preview.py",
    "maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html",
    "maplemoon-website/_wip/shop.WIP.html",
    "maplemoon-website/our-story.html",
    "maplemoon-website/_wip/carob-story.WIP.html",
    "maplemoon-website/_wip/faq.WIP.html",
    "maplemoon-website/_wip/stockists.WIP.html",
    "maplemoon-website/assets",
    "maplemoon-website/brand_kit.css",
    "maplemoon-website/_wip/a11y_inner.css",
    "maplemoon-website/_wip/design_refinement_20260723.css",
    "maplemoon-website/_wip/styles/homepage.css",
    "maplemoon-website/_wip/deploy/vercel-preview.json",
    "maplemoon_build_20260813/pure-carob-bar.html",
    "maplemoon_build_20260813/assets/product_shots/powder_roasted.webp",
    "maplemoon_build_20260813/mock-cart.js",
    "maplemoon_build_20260813/mock-cart.css"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/deploy/generated/maplemoon-admitted-preview-r2-20260824T105404",
    "maplemoon-website/_wip/evidence/admitted_preview_cert_r2_20260824T105404",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ADMITTED-PREVIEW-CERT-R2-20260824T105404.json"
  ],
  "implementation_contract": [
    "replay R1 source pins and canonical builder without changing them; override only PAGE_SOURCES['our-story.html'] to the certified root Our Story page",
    "after the canonical build and before certification, require the exact string imagePath:'/out/image_candidates_20260823/powder_roasted_no_bg.png', exactly once in generated shop.html and remove exactly that string",
    "require the same product object to retain img:'powder_roasted', then copy the exact admitted external source over generated assets/product_shots/powder_roasted.webp and require its SHA-256 to equal 40efa1836bffcf69b44084291b1996f8dc7a70d6f4bcef22e658904fa8a26eaf",
    "prove no /out/, /_wip/, .WIP.html, private directory, docs, .git or .vercel path remains in the final R2 output",
    "certify seven routes at exact 390 and 1440 with nonblank content, exact root widths, no broken images, no console/page/request/bad-response failures, menu/cart checks where present, and rendered evidence",
    "run agent-browser quick verification, exact minimum-release preflight and both design-system checker modes",
    "write only non-overwriting R2 output, evidence and receipt; do not deploy"
  ],
  "verify": [
    "all pinned sources and the R1 failure receipt match at acquisition and close",
    "the wrapper reports exactly one powder override removal and one exact generated powder asset replacement; generated Shop otherwise matches canonical R1 output",
    "builder reports seven pages, private_dirs=0 and vercel_project_link=0",
    "agent-browser quick verification and independent 14-case matrix pass",
    "founder frame-701 assets and powder fallback render at 390 and 1440",
    "exact preflight and design-system checks pass",
    "only the three exact R2 writable paths change"
  ],
  "stop": [
    "the exact powder seam count is not one or its fallback asset/hash is absent",
    "a pinned source changes",
    "any required build, browser, preflight or design-system check fails",
    "a source/WIP/root/asset/R1/Git/Vercel/Shopify/production/client mutation would be required"
  ],
  "forbidden_actions": [
    "mutate, delete, stage, move, rename or gitignore any preserved out artifact",
    "change any source/WIP/root page/asset/canonical builder or R1 output/evidence/receipt",
    "run vercel deploy, --prod, promote, alias, rollback or change deployment protection",
    "commit, push, write Shopify or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS for local R2 replay; preview deployment requires a successor packet",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## BOSS decision

GO for the exact generated-output-only powder fallback correction and full local R2 certification.
