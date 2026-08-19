# MapleMoon minimum-release content candidate — 2026-08-17 14:18 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-MINIMUM-RELEASE-CONTENT-20260817T141810",
  "worker_thread_id": "/root/dedup_risk_audit",
  "state": "admitted_content_only_derived_candidate",
  "objective": "Build and certify a new non-overwriting content/capability-only seven-route derived candidate implementing Nate's recorded D01 through D06 release decisions and later bounded overrides, without applying the parallel style-chrome slice, admitting product imagery, changing source WIPs, deploying or moving production.",
  "authority": "Nate approved D01=A, D02=A, D03=B, D04=A, D05=B, D06-PURE=REJECT, D06-SPICED=REJECT, KEEP CURRENT PAIR HERO + REMOVE PORTRAIT PLACEHOLDERS, and later explicitly overrode D05 neutralisation with KEEP AND SHIP / POST-LIVE FLAG for all current Woo claims. Nate further approved Carli-over-Woo precedence for explicit customer copy; Woo export authority for catalogue hierarchy, variation names, prices and stock; free shipping over $99; the exact displayed shipping line; and publication of all 204 supplied stockist entries with seven incomplete rows preserved and flagged. This is implementation authority for a derived content candidate only, not production, deployment, Shopify configuration, client contact, style expansion or product-media approval.",
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
    "production_immutable_token": "7vjf2m50b",
    "production_homepage_md5": "6197879a5ca9d3ed0452773abc0bbeb4"
  },
  "readable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-MINIMUM-RELEASE-CONTENT-20260817T141810.md",
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
    "maplemoon-website/scripts/build-maplemoon-minimum-release-content.py",
    "maplemoon-website/_wip/deploy/generated/maplemoon-minimum-release-content-20260817T141810",
    "maplemoon-website/_wip/evidence/minimum_release_content_20260817T141810",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-MINIMUM-RELEASE-CONTENT-20260817T141810.json"
  ],
  "implementation_contract": [
    "derive from a fresh unique output of the pinned private-preview builder; never edit the six WIPs, frozen Pure input or existing preview builder",
    "create one deterministic non-overwriting builder using staging, exact occurrence assertions, a machine-readable patch manifest, reverse reconstruction and protected projections",
    "D01: Home and Shop expose exactly the six approved bars and no other candidate product card: Pure Carob & Cacao Butter, Peppermint & Buckwheat, Roasted Hazelnut, Coconut & Goji, Cayenne Chilli, Almond & Celtic Salt; use Woo only for exact hierarchy, variation names, prices and stock and do not import conflicting Woo customer copy where a later recorded Carli decision exists",
    "D02: the public candidate is truthful enquiry-only; remove all cart toggles, cart drawers, add-to-cart, checkout, place-order, demo-order, local-cart and connected-store implications; permitted product action is a truthful mailto enquiry only; no mock commerce script may be reachable",
    "preserve the approved display copy exactly once in the appropriate Shop fulfilment surface: Orders ship Monday and Tuesday via Australia Post. Standard shipping $16.95. and free shipping over $99; do not claim that a checkout is connected",
    "D03 plus later override: publish all 204 authoritative stockist records already supplied, preserve all seven incomplete records without invented address or postcode, remove 200+ marketing language, use nonnumeric Find a stockist framing, and make filter/result counts mechanically truthful to the 204-row data",
    "D04: remove active and disabled newsletter/email collection forms and fields from Home and Stockists; preserve a truthful direct mailto contact route; no submit handler, storage or network collection may remain",
    "D05 later override: preserve existing customer claims except exact D01 through D04 capability/catalogue changes; do not silently neutralise or expand claims; keep the exact approved FAQ caffeine question and answer unchanged; the Boss ledger remains the post-live issue record",
    "D06: reject both proposed reconstructed-label elixir v4 inputs for this release; do not copy, bind or modify any product image, and do not change existing media bytes or bindings except removing excluded product cards as part of D01",
    "Our Story: keep the current accepted pair hero and remove the founder portrait placeholder surfaces entirely; do not choose or bind an individual founder portrait",
    "do not apply or copy the parallel style-chrome R1/R2 runtime, page-header, token, font, fog, media, section or overlay work; integration occurs only in a later separately packeted builder after both lanes certify"
  ],
  "method": [
    "before first write create one timestamped non-overwriting checkpoint for all four writable paths and pass phase=start with --root /Users/handtomouse",
    "verify every base pin exactly and stop on drift; record the current dirty-tree inventory without cleaning, staging or classifying unrelated paths",
    "build one fresh private-preview baseline under /private/tmp and hash its full file manifest",
    "create and run the deterministic content builder once into the exact non-overwriting output directory",
    "write exact source-to-derived occurrence evidence, six-product accounting, 204-stockist accounting, commerce and collection absence probes, FAQ exact-text proof, claim-preservation projection, media-binding projection and reverse reconstruction proof",
    "run browser QA for all seven routes at measured 390, 768, 900, 1024 and 1440 from fresh contexts; exercise every remaining product enquiry, stockist filter/search/result count, direct contact action, FAQ, mobile drawer and keyboard path applicable to this content-only candidate",
    "capture nonblank full-page evidence at 390 and 1440 for all seven routes and inspect it; preserve every superseded harness attempt with rationale",
    "run python3 -B /Users/handtomouse/UFC/ops/bus/maplemoon/tools_20260813/preflight_deploy.py against the exact derived root and record literal output; this grants no deploy authority",
    "recheck all base/source hashes, media projections and production freeze at close",
    "write one maplemoon-receipt/v2 JSON and pass completion then promotion gates; promotion means evidence-complete for Boss integration review only"
  ],
  "verify": [
    "only the four exact writable paths changed and all source WIPs, Pure, existing builders, assets, parallel style outputs and unrelated dirty-tree paths remained untouched",
    "seven of seven reverse reconstructions and protected source/customer-copy/media projections pass",
    "Home and Shop each expose exactly the six named approved bars and zero excluded product cards; any displayed product name, variation, price or stock value matches the pinned Woo export",
    "cart triggers, drawers, cart storage, checkout/order/demo/connected-store claims and mock-cart reachability are zero; all six product actions are truthful enquiry mailto actions",
    "the exact approved shipping sentence and free-over-$99 statement are present without implying connected checkout",
    "Stockists contains 204 unique source-equal rows, keeps the exact seven incomplete rows incomplete, invents zero values, removes every 200+ claim and reports truthful filter/search counts",
    "newsletter/email collection forms, fields, handlers, storage and submission requests are zero; direct contact mailto remains visible and keyboard reachable",
    "the exact approved FAQ caffeine question and answer each occur once and broader customer copy is preserved except listed D01 through D04 transformations",
    "no product-image file or live binding was added or changed; both v4 elixirs remain rejected; current pair hero remains exact and individual founder placeholders are absent",
    "all 35 browser cases pass exact viewport/no-root-overflow/nonblank/image/console/page/request/bad-response gates; all required interactions and 14 rendered screenshots pass visual inspection",
    "exact local preflight passes; production immutable identity and homepage bytes remain frozen",
    "completion and promotion receipt gates pass"
  ],
  "stop": [
    "a base/source hash, Woo pin, production freeze, media projection or unrelated dirty-tree path differs",
    "an exact six-product identity, Woo fact, 204-row stockist accounting, incomplete-row boundary, FAQ text or approved shipping statement cannot be proved",
    "an implementation would require inventing stockist data, connected commerce, an endpoint, a claim, product copy, media approval, product identity or founder selection",
    "a content change outside exact D01 through D04, recorded shipping copy and placeholder removal is needed",
    "a real browser, keyboard, overflow, image, runtime, request, preflight or rendered-evidence failure remains",
    "a path outside writable_paths changes"
  ],
  "forbidden_actions": [
    "edit any WIP, frozen Pure input, existing preview builder, style R1/R2 artifact, Styles Kit output, asset, product image, source master or unrelated dirty-tree path",
    "generate or edit product imagery, admit a product-media candidate, change elixir bindings or select a founder portrait",
    "invent or silently rewrite product copy or claims beyond the exact recorded transformations",
    "access or mutate Shopify, commit, push, stash, delete, gitignore, deploy, move production, alter Vercel protection or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS for receipt replay, followed by a separately packeted integration of the certified content and certified style-chrome transforms; no deployment",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Boss execution decision

**GO for this content-only derived candidate.** This packet deliberately keeps
product imagery and style work outside the build. The candidate is useful only
after its exact content/capability changes certify, and it must later be merged
with the independently certified style transform by a new deterministic packet.
It is not a deployment or production candidate by itself.
