# WITHDRAWN — DO NOT EXECUTE — MapleMoon minimum-release content candidate R3

Nate rejected the proposed testimonial removal before this packet was dispatched
or phase-started. The anonymised testimonials are to remain. This packet carries
no execution authority and is retained only as a withdrawn control-plane record.

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-MINIMUM-RELEASE-CONTENT-R3-20260817T143013",
  "worker_thread_id": "/root/dedup_risk_audit",
  "state": "withdrawn_by_nate_before_phase_start",
  "objective": "Execute the R2 content-only minimum-release transform in new non-overwriting R3 outputs, additionally removing the complete consent-pending Home review/testimonial surface from the derived candidate while leaving the source WIP exact.",
  "authority": "R2 correctly held because the unchanged preflight flags the visible Home sentence `Consent and final testimonial selection pending before go-live.` and its unapproved customer quotes. Nate's KEEP AND SHIP override applies to current Woo claims, not unconsented testimonials or internal review status. Existing MapleMoon rules prohibit unconsented testimonials and internal WIP labels in a release candidate. BOSS therefore authorises removal of the exact complete Home `section#reviews.mm-reviews`, including its heading, pending labels, all three quotes and pending note, from the derived candidate only. Do not rewrite, anonymise, replace or retain any quote. Source WIP bytes remain protected.",
  "predecessor": {
    "r2_packet_id": "MAPLEMOON-MINIMUM-RELEASE-CONTENT-R2-20260817T142633",
    "r2_packet_sha256": "3d53b2fd3c18aa78908c8f0b4a0475827fa3c4ec968ec60d087766a3b371d930",
    "r2_checkpoint_manifest_sha256": "2418602c8e9b951b25c7801a452e7edd0d6a44de5e34df0a60cd41528d892bb4",
    "r2_implementation_outputs_created": 0,
    "r2_hold": "unchanged_word_testimonial_leak_on_home_consent_pending_review_surface"
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
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-MINIMUM-RELEASE-CONTENT-R3-20260817T143013.md",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-MINIMUM-RELEASE-CONTENT-R2-20260817T142633.md",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-MINIMUM-RELEASE-CONTENT-20260817T141810.md",
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
    "maplemoon-website/scripts/check-maplemoon-minimum-release-preflight-r3.py",
    "maplemoon-website/scripts/build-maplemoon-minimum-release-content-r3.py",
    "maplemoon-website/_wip/deploy/generated/maplemoon-minimum-release-content-r3-20260817T143013",
    "maplemoon-website/_wip/evidence/minimum_release_content_r3_20260817T143013",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-MINIMUM-RELEASE-CONTENT-R3-20260817T143013.json"
  ],
  "implementation_contract": [
    "all R2 decisions, exact three-anchor copied-preflight contract, content transforms, methods, checks and forbidden actions carry forward unchanged into new R3 paths",
    "remove exactly one complete visible Home `section#reviews.mm-reviews` from the derived candidate; its source occurrence count must be one and final count zero",
    "remove all three enclosed customer quotes and all consent-pending/review-pending labels with that section; preserve zero quote fragments elsewhere and add no replacement testimonial or review copy",
    "do not remove or rewrite Woo product claims under this authority; D05 KEEP AND SHIP / POST-LIVE FLAG remains intact",
    "the source Homepage WIP, CSS definitions and every non-section customer surface remain byte-protected; unused review CSS may remain because source reconstruction and minimal transformation take priority",
    "no style-chrome, product-image, founder-selection, Shopify, deployment or production surface is admitted"
  ],
  "method": [
    "create a fresh checkpoint for all five R3 writable paths and require phase=start PASS before first write",
    "replay R1 and R2 acquisition, original-preflight failures and zero-output holds; verify every base and predecessor pin",
    "create the three-anchor successor preflight exactly as R2 specified, at the new R3 path, with machine proof of no other verifier delta",
    "build the full content-only candidate from a fresh pinned baseline using one new deterministic non-overwriting R3 builder",
    "prove exact review-section removal separately from D01 through D06 transforms, protected projections and reverse reconstruction",
    "run all R2 source, catalogue, commerce, shipping, stockist, collection, FAQ, claim, media, founder, preflight, 35-case browser, interaction and 14-screenshot checks",
    "recheck all pins and frozen production, write receipt, and require completion then promotion PASS"
  ],
  "verify": [
    "only the five R3 writable paths changed and every R1/R2/source/original-verifier/style/media/unrelated path remained exact",
    "successor verifier differs from the pinned original by exactly the three authorised anchors and passes unchanged matcher/control gates",
    "Home review section, three quote fragments, consent pending, testimonial selection pending and review-only labels are absent from the derived candidate and present unchanged in the protected source WIP",
    "all R2 content checks pass: six exact bars, truthful enquiry only, exact shipping/free-$99 copy, 204 stockists with seven incomplete and no invention, zero collection forms, exact FAQ, current claims preserved, no media mutation, pair hero kept and founder placeholders absent",
    "seven reverse reconstructions/projections, 35 browser cases, required interactions, 14 visual screenshots, successor preflight and frozen production checks pass",
    "completion and promotion receipt gates pass"
  ],
  "stop": [
    "any predecessor/base/source/verifier hash or production freeze differs",
    "review removal cannot be isolated to exactly one Home section or requires rewriting a quote/claim elsewhere",
    "any R2 stop condition, real browser/preflight failure or path outside writable_paths occurs"
  ],
  "forbidden_actions": [
    "edit any WIP, original verifier, R1/R2 path, existing builder, style artifact, asset, product image, source master or unrelated dirty-tree path",
    "retain hidden quote/testimonial canaries in the candidate, invent consent, replace customer identity or weaken the testimonial leak matcher",
    "generate/admit imagery, access or mutate Shopify, commit, push, stash, delete, gitignore, deploy, move production, alter protection or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS for receipt replay, then separately packeted integration with certified style R2; no deployment",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Boss correction decision

**GO for R3.** Consent-pending testimonials are removed from the derived release,
not rewritten or approved. The protected source remains the record for any later
Carli/Dylan consent decision.
