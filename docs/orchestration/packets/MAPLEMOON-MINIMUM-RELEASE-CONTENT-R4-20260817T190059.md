# MapleMoon minimum-release content candidate R4 — 2026-08-17 19:00 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-MINIMUM-RELEASE-CONTENT-R4-20260817T190059",
  "worker_thread_id": "019ffe53-6243-73a2-9d75-e1a072cd07ce",
  "state": "admitted_after_testimonial_disposition_and_task_ownership_split",
  "objective": "Execute the content-only minimum-release transform in new non-overwriting R4 paths, preserving all three anonymised Home quote cards and both founder cards while removing only visitor-visible internal review/process language. Keep site-style decisions and implementation in the separate Styles task.",
  "authority": "Nate explicitly chose A: keep the three anonymised quotes, keep the cards, and remove only internal review labels and the internal reference sentence. Nate also chose to keep both Carli and Dylan founder cards while later selecting smiling portraits in a separate photography branch. The withdrawn R3 removal packet carries no authority. All R1/R2 D01-D06 decisions and the KEEP AND SHIP / POST-LIVE FLAG claim disposition remain in force. Task ownership is split: thread 019ff65f-fd33-7e51-8a83-360ba2f8d665 owns site styles; this BOSS task owns content/release integration. This packet grants no style, media, Shopify, deployment, production or client-contact authority.",
  "predecessor": {
    "r1_packet_sha256": "88a6d7563574046e3eb240ce0b812fbe5df87bd99cdffd2f5d68deeb384a3cdd",
    "r2_packet_sha256": "3d53b2fd3c18aa78908c8f0b4a0475827fa3c4ec968ec60d087766a3b371d930",
    "r2_checkpoint_manifest_sha256": "2418602c8e9b951b25c7801a452e7edd0d6a44de5e34df0a60cd41528d892bb4",
    "withdrawn_r3_packet_sha256": "2fb32c9fe9626c45bc7151a3838bc3ee83e535b52e48e72f84b449a4168ffa20",
    "r1_implementation_outputs_created": 0,
    "r2_implementation_outputs_created": 0,
    "r3_phase_started": false
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
    "boss_ledger_sha256": "447863845cc86e04a7ad55e22d41de617ef2f0698d3d254188a9677bd7ac4772",
    "woo_export_sha256": "eeea19fd89b30052bd4c4cf28519f56f1195e4595c92485fb186a66719e6b114",
    "original_preflight_sha256": "e0158d6e862547cf5f177010f00b2156c6c2eca3645c01480b00d724591d290c",
    "production_immutable_token": "7vjf2m50b",
    "production_homepage_md5": "6197879a5ca9d3ed0452773abc0bbeb4"
  },
  "readable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-MINIMUM-RELEASE-CONTENT-R4-20260817T190059.md",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-MINIMUM-RELEASE-CONTENT-20260817T141810.md",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-MINIMUM-RELEASE-CONTENT-R2-20260817T142633.md",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-MINIMUM-RELEASE-CONTENT-R3-20260817T143013.md",
    "maplemoon-website/_wip/checkpoints/MAPLEMOON-MINIMUM-RELEASE-CONTENT-R2-20260817T142633_20260817_142821_AEST/RECOVERY_MANIFEST.json",
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
    "maplemoon-website/scripts/check-maplemoon-minimum-release-preflight-r4.py",
    "maplemoon-website/scripts/build-maplemoon-minimum-release-content-r4.py",
    "maplemoon-website/_wip/deploy/generated/maplemoon-minimum-release-content-r4-20260817T190059",
    "maplemoon-website/_wip/evidence/minimum_release_content_r4_20260817T190059",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-MINIMUM-RELEASE-CONTENT-R4-20260817T190059.json"
  ],
  "implementation_contract": [
    "carry forward every R1 content decision and every R2 three-anchor successor-preflight constraint into new R4 paths",
    "preserve section#reviews.mm-reviews, its heading, all three quote texts and all three anonymised Maple Moon customer labels exactly; do not add names, consent claims, attribution or rewritten quote text",
    "within the one Home reviews section, change the visible kicker exactly from `Reviews · consent pending` to `Reviews`, remove the complete visible paragraph beginning `Real experiences, shared with care.`, and remove the complete `.mm-review-note` element containing `Consent and final testimonial selection pending before go-live.`",
    "the exact internal review/process strings `consent pending`, `WIP quotes`, `noindexed`, `testimonial selection pending before go-live` and `Consent and final testimonial selection pending before go-live.` must be absent from the final rendered body; do not insert hidden canaries or replacement process wording",
    "keep both Home founder cards and the accepted Our Story pair hero; remove only visitor-visible founder portrait placeholder/review surfaces already authorised by R1/R2, without selecting or binding an individual portrait",
    "D01 through D06 remain unchanged: six approved bars, enquiry-only/no mock cart, exact shipping/free-$99 copy, all 204 source-equal stockists with seven incomplete, no collection forms, current claims preserved and flagged post-live, no v4 elixir or other product-media admission",
    "do not consume, copy or modify style-task outputs; page-header grammar and editorial composition remain unresolved in the Styles task"
  ],
  "method": [
    "create a fresh non-overwriting recovery checkpoint for all five writable paths and require phase=start PASS with --root /Users/handtomouse before first write",
    "replay all R1/R2 holds and prove R3 was withdrawn before phase start; verify every packet, source, ledger, Woo and original-preflight pin",
    "create the R4 successor preflight by copying the pinned original and making exactly the three R2 anchor replacements; prove all other matcher/control/verdict bytes equal",
    "build a fresh baseline under /private/tmp, then execute one deterministic non-overwriting R4 content builder into the exact output path",
    "prove the testimonial delta separately: three quotes and anonymous labels exact, one clean Reviews kicker, internal paragraph/note/process strings absent",
    "run all R2 catalogue, commerce, shipping, stockist, collection, FAQ, claim, media, founder, protected-projection and reverse-reconstruction checks",
    "run seven routes at measured 390, 768, 900, 1024 and 1440, required interactions, keyboard checks and fourteen nonblank 390/1440 full-page screenshots; inspect every screenshot",
    "run the exact successor preflight, recheck all pins and frozen production, write the receipt, then require completion and promotion PASS"
  ],
  "verify": [
    "only the five exact R4 writable paths changed; source WIPs, Pure, all R1/R2/R3/style/Styles Kit/media/Shopify/unrelated paths remained exact",
    "successor preflight differs from original only by the three authorised R2 anchors and passes with unchanged fail tiers and controls",
    "reviews section count is one; each exact quote and anonymised label count is one; visible internal review/process string count is zero; no quote or attribution changed",
    "both founder cards remain and visitor-visible founder portrait placeholder/review surfaces are zero; pair hero binding is exact",
    "six exact bars, truthful enquiry-only actions, exact shipping/free-$99 copy, 204 stockists with seven incomplete, zero collection forms, exact FAQ, preserved claims and zero product-media mutation all pass",
    "seven reverse reconstructions/protected projections, all 35 browser cases, interactions and fourteen visually inspected screenshots pass",
    "production immutable identity and homepage bytes remain frozen; completion and promotion receipt gates pass"
  ],
  "stop": [
    "any packet/base/source/ledger/Woo/original-preflight hash or production freeze differs",
    "preserving the three quote cards requires inventing consent, changing quote text, exposing a real customer name or weakening a leak matcher",
    "a content change outside the exact R1/R2 decisions and the bounded Home review/founder cleanup is needed",
    "any real browser, interaction, overflow, image, runtime, request, preflight, rendered-evidence or scope check fails"
  ],
  "forbidden_actions": [
    "edit any WIP, Pure source, original verifier, R1/R2/R3 path, existing builder, style-task artifact, Styles Kit output, asset, product image, source master or unrelated dirty-tree path",
    "remove a quote card, invent consent, de-anonymise a customer, bind founder portraits, weaken leak matching or retain hidden process text",
    "access or mutate Shopify, generate/admit imagery, commit, push, stash, delete, gitignore, deploy, move production, alter protection or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS for receipt replay; later integration with a separately certified style successor; no deployment",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Boss execution decision

**GO for R4 content-only execution.** The three anonymised quote cards and both
founder cards remain. Only visitor-visible internal review/process language and
founder placeholder surfaces are removed. Site styles stay in task
`019ff65f-fd33-7e51-8a83-360ba2f8d665` and are not an R4 input.
