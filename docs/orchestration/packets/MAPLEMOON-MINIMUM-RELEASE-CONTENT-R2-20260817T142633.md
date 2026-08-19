# MapleMoon minimum-release content candidate R2 — 2026-08-17 14:26 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-MINIMUM-RELEASE-CONTENT-R2-20260817T142633",
  "worker_thread_id": "/root/dedup_risk_audit",
  "state": "admitted_after_r1_preflight_contract_hold",
  "objective": "Execute the unchanged content-only minimum-release transform from R1 using a new non-overwriting builder/output/evidence/receipt and one new exact-copy successor preflight whose only semantic changes are the three page-presence anchors made stale by certified source evolution and D03.",
  "authority": "R1 checkpoint/start and all acquisition pins passed, but its fresh untouched baseline proved the original UFC preflight stale: it requires Our Story text `Two individual notes.` and Carob Story text `Carob is a naturally sweet pod, not a bean.`, both absent from the already independently certified pinned WIPs. It also requires the old Homepage anchor `Find Maple Moon near you`, while approved D03-B uses nonnumeric `Find a stockist`. BOSS authorises a copied successor preflight only, leaving all leak, wall, blind-probe, root, path, positive-control, negative-control and verdict logic byte-equivalent. This authorises no insertion of stale/hidden copy and no broader content, style, media, deploy or production change.",
  "predecessor": {
    "packet_id": "MAPLEMOON-MINIMUM-RELEASE-CONTENT-20260817T141810",
    "packet_sha256": "88a6d7563574046e3eb240ce0b812fbe5df87bd99cdffd2f5d68deeb384a3cdd",
    "checkpoint_manifest_sha256": "52e641403eb6a8dc5f467dc733169d1e299d24084ae1db7cc051d67a2762bf06",
    "original_preflight_sha256": "e0158d6e862547cf5f177010f00b2156c6c2eca3645c01480b00d724591d290c",
    "fresh_baseline_result": "FAIL_6_WITH_STALE_OUR_STORY_AND_CAROB_STORY_ANCHORS",
    "implementation_outputs_created": 0
  },
  "base": {
    "homepage_wip_sha256": "423184b66a18a2e1eb44bf547b6392ef1bc26be982309846c949c4e971251c04",
    "shop_wip_sha256": "b444b0da4f5778f7434c6343854e3cdf48d1a88b038c7863a2ef1d46b5e0cbac",
    "our_story_wip_sha256": "6beef3f9449804e800ad7883c311c957637d12a5e05c69beb7ed912e49b36e23",
    "carob_story_wip_sha256": "c6b545bc4983960e4ce41bc0bc3a4bdf6ae8432dd5fdbc8e6c26980592d3f2d0",
    "faq_wip_sha256": "3b1156324e7c9156b995bafdc036a28da83be5e7890ba12cf8d14868f49cdcc4",
    "stockists_wip_sha256": "dbff73357e3425005db5fc7f0e0e589ed8a70b9dbcb62f31cab667cf37409f37",
    "pure_input_sha256": "015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65",
    "private_preview_builder_sha256": "803c439e0e937309b7ada0c3f886983908c3cc6aed64f92e38c57fd656707808",
    "boss_ledger_sha256": "f62b6974d760c6085472f100753000cb66bddb838e94d5137bec55768b1c9831",
    "woo_export_sha256": "eeea19fd89b30052bd4c4cf28519f56f1195e4595c92485fb186a66719e6b114",
    "original_preflight_sha256": "e0158d6e862547cf5f177010f00b2156c6c2eca3645c01480b00d724591d290c",
    "production_immutable_token": "7vjf2m50b",
    "production_homepage_md5": "6197879a5ca9d3ed0452773abc0bbeb4"
  },
  "readable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-MINIMUM-RELEASE-CONTENT-R2-20260817T142633.md",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-MINIMUM-RELEASE-CONTENT-20260817T141810.md",
    "maplemoon-website/_wip/checkpoints/MAPLEMOON-MINIMUM-RELEASE-CONTENT-20260817T141810_20260817_142407_AEST/RECOVERY_MANIFEST.json",
    "maplemoon-website/docs/orchestration/MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md",
    "maplemoon-website/docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "maplemoon-website/scripts/check-maplemoon-receipt.py",
    "maplemoon-website/scripts/build-maplemoon-wip-preview.py",
    "maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html",
    "maplemoon-website/_wip/shop.WIP.html",
    "maplemoon-website/_wip/our-story.WIP.html",
    "maplemoon-website/_wip/carob-story.WIP.html",
    "maplemoon-website/_wip/faq.WIP.html",
    "maplemoon-website/_wip/stockists.WIP.html",
    "maplemoon_build_20260813/pure-carob-bar.html",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATE-DECISION-GATE-R2-20260814T184422.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATE-DECISION-ADDENDUM-R3-20260815T043624.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-E-INDEPENDENT-CERT-20260816T133827.json",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-F-INDEPENDENT-CERT-20260816T143809.json",
    "Library/Messages/Attachments/e0/00/3631B118-5A32-487A-8E55-C0533B3B96CB/Maple Moon Store CSV File Export.csv",
    "maplemoon_cat01a_20260815/LEDGER.md",
    "maplemoon_cat01a_20260815/ledger.csv",
    "maplemoon_cat01a_20260815/CONFLICTS.md",
    "maplemoon_cat01a_20260815/NEEDED.md",
    "UFC/ops/bus/maplemoon/tools_20260813/preflight_deploy.py"
  ],
  "writable_paths": [
    "maplemoon-website/scripts/check-maplemoon-minimum-release-preflight.py",
    "maplemoon-website/scripts/build-maplemoon-minimum-release-content-r2.py",
    "maplemoon-website/_wip/deploy/generated/maplemoon-minimum-release-content-r2-20260817T142633",
    "maplemoon-website/_wip/evidence/minimum_release_content_r2_20260817T142633",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-MINIMUM-RELEASE-CONTENT-R2-20260817T142633.json"
  ],
  "implementation_contract": [
    "all R1 content decisions, implementation boundaries, method, verification and forbidden actions carry forward unchanged except the explicitly superseded preflight path and new R2 output names",
    "create the successor preflight by reading the pinned original bytes and making exactly three count-one body-anchor replacements: Homepage `Find Maple Moon near you` to `Find a stockist`; Our Story `Two individual notes.` to `The people behind the product`; Carob Story `Carob is a naturally sweet pod, not a bean.` to `Carob is a naturally sweet pod grown on the carob tree.`",
    "the successor preflight must otherwise be byte-identical to the original; record a machine proof that removing those six old/new string spans leaves equal bytes, and preserve the original verifier unchanged",
    "the three new anchors must be present in the intended final visible rendered body and source-backed by the pinned current WIPs or D03 transform; do not add hidden anchor text or duplicate visible content to satisfy the checker",
    "derive the R2 content candidate from a new fresh unique pinned baseline and create no R1 implementation output",
    "D01: expose exactly the six approved bars on Home and Shop and no other candidate product card, using pinned Woo authority only for hierarchy, variation names, prices and stock",
    "D02: remove public cart, checkout, order, demo and connected-store implications; expose truthful mailto product enquiry only; show the exact approved shipping sentence and free shipping over $99 without implying checkout",
    "D03: keep all 204 source-equal stockist rows, preserve seven incomplete rows without invention, remove 200+ marketing copy, use nonnumeric Find a stockist framing and truthful dynamic counts",
    "D04: remove Home and Stockists email/newsletter collection forms, fields, handlers, storage and requests; preserve direct mailto contact",
    "D05: keep and ship existing claims with post-live flags in the Boss ledger; preserve exact approved FAQ wording; make no silent claim rewrite or expansion",
    "D06: no product-image copy, edit, binding or approval; both v4 elixirs remain rejected; remove only excluded product cards",
    "Our Story: keep current pair hero and remove founder portrait placeholder surfaces; make no individual founder selection",
    "exclude the entire parallel style-chrome R1/R2 surface; later integration requires a separate packet"
  ],
  "method": [
    "create a fresh non-overwriting recovery checkpoint for all five writable paths and require phase=start PASS with --root /Users/handtomouse before first write",
    "replay and record the R1 acquisition and exact original-preflight baseline failure; require all R1/base/original-verifier hashes exact",
    "create the copied successor preflight and prove the exact three-replacement-only delta plus inherited positive and negative controls",
    "build a fresh unique baseline under /private/tmp, then create and run the deterministic R2 content builder once into the exact output path",
    "run the full R1 occurrence, projection, reverse-reconstruction, catalogue, commerce, shipping, stockist, collection, FAQ, claim, media and founder checks",
    "run browser QA for all seven routes at measured 390, 768, 900, 1024 and 1440; run applicable product-enquiry, stockist, contact, FAQ, drawer and keyboard interactions",
    "capture and inspect nonblank full-page evidence at 390 and 1440 for all seven routes and preserve every superseded harness attempt",
    "run both verifiers against the exact final candidate: preserve the original stale-anchor failure as expected historical evidence and require the successor preflight literal PASS at its unchanged fail tiers",
    "recheck every pin, verifier delta, media projection and production freeze at close; write receipt; require completion and promotion gates PASS"
  ],
  "verify": [
    "only five exact R2 writable paths changed; all R1 paths, source WIPs, Pure, existing builders, original preflight, assets, style outputs and unrelated paths stayed exact",
    "successor preflight equals original bytes after accounting for exactly the three authorised anchor replacements; all matcher/control logic is unchanged",
    "the original verifier reproduces its stale-anchor failure and the successor verifier passes the final candidate with no waiver beyond the existing local-root marker",
    "all content checks from R1 pass: six exact bars, zero excluded cards, truthful enquiry-only actions, exact shipping/free-$99 copy, 204 stockists with seven incomplete and zero invention, zero collection forms, exact FAQ, preserved claims, no product-media mutation, current pair hero and no portrait placeholders",
    "all seven reverse reconstructions and protected projections pass",
    "all 35 browser cases, interactions and 14 visually inspected screenshots pass with zero root overflow, broken image, console, page, request or bad-response failure",
    "production immutable identity and homepage bytes remain frozen; completion and promotion receipt gates pass"
  ],
  "stop": [
    "any R1/base/original-preflight/source hash or production freeze differs",
    "the successor preflight requires any delta beyond the three exact anchor replacements, or can pass only with hidden/stale copy or weakened matcher/control logic",
    "any R1 content stop condition occurs, including invented facts, content outside authority, media change or a real browser/preflight failure",
    "a path outside writable_paths changes"
  ],
  "forbidden_actions": [
    "edit the original UFC preflight, any source WIP, Pure input, existing builder, R1 path, style artifact, asset, product image, source master or unrelated dirty-tree path",
    "insert hidden verification text, resurrect stale copy, weaken matchers, remove controls or relabel a real failure as verifier drift",
    "generate or admit imagery, access or mutate Shopify, commit, push, stash, delete, gitignore, deploy, move production, alter protection or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS for receipt replay, then separately packeted integration with certified style R2; no deployment",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Boss correction decision

**GO for R2 with the successor verifier only.** The R1 stop was correct. The
repair is to make the page-presence anchors follow the already certified source,
not to force old copy back into the candidate. All leak and runtime gates remain
unchanged.
