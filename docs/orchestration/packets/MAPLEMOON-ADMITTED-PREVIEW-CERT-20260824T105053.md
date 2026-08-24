# MapleMoon admitted preview certification — 2026-08-24 10:50 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-ADMITTED-PREVIEW-CERT-20260824T105053",
  "worker_thread_id": "019ffe53-6243-73a2-9d75-e1a072cd07ce",
  "state": "admitted_local_build_and_certification_only",
  "objective": "Build one private local seven-route candidate from the current admitted six WIP sources, the independently certified root Our Story frame-701 page, the certified Pure page and pinned support runtime; prove no private/out paths enter the build and certify all seven routes at 390 and 1440. Do not deploy in this packet.",
  "authority": "Nate directed BOSS to execute. Founder frame 701 wiring completed and promoted; Home/Shop design-system bindings and the catalogue R3 specification completed and promoted. Production, Vercel deploy, Shopify and client contact remain separately frozen.",
  "base": {
    "head": "7c04f808e285acc116ae0f93c3d887ee1e96aea3",
    "builder_sha256": "803c439e0e937309b7ada0c3f886983908c3cc6aed64f92e38c57fd656707808",
    "home_wip_sha256": "a06d1e19165c84065e96c14eafd1f8e8d7e5a4228d877f0017ca191d1341c174",
    "shop_wip_sha256": "f9d150dea283d43eb0a14e02dfeccf9ea1eb4eae87ec82a546ab6984f3fa5604",
    "our_story_root_sha256": "8dc01af541712a54986270f5bdf51f41ea48fa5be2699fa3610182910668458f",
    "carob_wip_sha256": "2fafd3867233a01ce6af1f4dd0a1837cc83fb69563d35d29c293e8d1d379d9e0",
    "faq_wip_sha256": "449e2c4b129d0c63fc55d77ba2abe7c71c34da9b7c6f6f63fbb21cc899efe7e8",
    "stockists_wip_sha256": "b7cb9f1963e53b70b279b0198aabddb528fddad74ad9763c9494c93e70346905",
    "founder_pair_sha256": "ec53b0faa3cec0e12e578395968e0605eeac5a64b191030d5c8661ed33ea608d",
    "founder_carli_sha256": "48b7032778a8a492129290bed69054004decc3f93ffc2a8b9b71bd997b7e1f0b",
    "founder_dylan_sha256": "34f7022d44a084d72ef6e05e4f3acf7cd64e26a8a08e3d1b555136dad267f942"
  },
  "readable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-ADMITTED-PREVIEW-CERT-20260824T105053.md",
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
    "maplemoon_build_20260813/mock-cart.js",
    "maplemoon_build_20260813/mock-cart.css"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/deploy/generated/maplemoon-admitted-preview-20260824T105053",
    "maplemoon-website/_wip/evidence/admitted_preview_cert_20260824T105053",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ADMITTED-PREVIEW-CERT-20260824T105053.json"
  ],
  "implementation_contract": [
    "use the canonical WIP preview builder without changing it, but override only PAGE_SOURCES['our-story.html'] to the certified root our-story.html inside a task-owned wrapper",
    "copy only referenced assets; never copy the repository root, out, _wip, docs, .git, .vercel or unrelated untracked artifacts into the candidate",
    "prove the three accepted frame-701 assets are present and the superseded hero73/pair592/pair870/placeholder references are absent",
    "certify seven routes at exact 390 and 1440 with nonblank content, no root overflow, no broken images, no console/page/request/bad-response failures, and required menu/cart interactions where present",
    "run the exact current minimum-release preflight and design-system checks; findings are failures unless an established review-only waiver is reported by the exact verifier",
    "write only local evidence, candidate output and receipt; do not deploy"
  ],
  "verify": [
    "all pinned sources match at acquisition and close",
    "builder returns BUILD PASS with seven pages, private_dirs=0 and vercel_project_link=0",
    "candidate has no out, _wip, docs, .git or .vercel path and no source URL containing /out/ or /_wip/",
    "agent-browser quick verification passes for homepage and the full independent 14-case browser matrix passes",
    "our-story founder image sources and rendered dimensions match the certified frame-701 contract",
    "exact preflight and both design-system checker modes return PASS",
    "only the three exact writable paths change"
  ],
  "stop": [
    "a pinned source changes",
    "the builder or any required browser/preflight/design-system check fails",
    "an out/private path enters the candidate",
    "a source, WIP, root route, asset, Git, Vercel, Shopify, production or client mutation would be required"
  ],
  "forbidden_actions": [
    "mutate, delete, stage, move, rename or gitignore any preserved out artifact",
    "change any source/WIP/root page/asset/canonical builder",
    "run vercel deploy, --prod, promote, alias, rollback or change deployment protection",
    "commit, push, write Shopify or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS for local candidate and evidence replay; preview deployment requires a successor packet",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## BOSS decision

GO for the exact local candidate and certification only. Production and all external state remain frozen.
