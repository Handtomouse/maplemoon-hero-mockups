# MapleMoon homepage style finish R4 — immutable snapshot integration — 2026-08-25 16:50 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-HOMEPAGE-STYLE-FINISH-R4-20260825T165002",
  "worker_thread_id": "019ffe53-6243-73a2-9d75-e1a072cd07ce",
  "state": "admitted_immutable_snapshot_candidate_after_two_live_source_drifts",
  "objective": "Capture one exact immutable homepage/source-preview baseline, build and independently verify the five-item homepage style integration against that snapshot, and report the later live-source rebase delta separately so active editors do not invalidate or corrupt the review candidate.",
  "authority": "Nate authorised staged style integration. R1 preserved four pre-QA failures; R2 and R3 correctly stopped on live-source drift. R4 may snapshot the current source/base after phase-start, build the bounded style candidate from that immutable baseline, run the full QA contract, and report only. It may not edit the live source, ingest, promote or deploy.",
  "predecessor": {
    "r3_packet_sha256": "f8628f037332ad8905812139c9223bcded425af978b35a29fe61cf7a04994b3b",
    "r3_receipt_sha256": "8324a3aebb318addc8e6cd3912327337df6e8560fbc6fa85ecd8c599a2d0410d",
    "r3_builder_sha256": "8a45fbaa12a31b01c579ac02adb7ca256b5072d61497436941129659e349ca05",
    "r3_drift_evidence_sha256": "8d03ce694368f99734e31515549550c524d176219795f926fe5abffe6a52d0fd"
  },
  "acquisition": {
    "homepage_wip_sha256_before_snapshot": "792e6508d21a4b1840f5a35fd28af05962030a7e2e32e73cda4651c7e5a48dd9",
    "private_preview_builder_sha256": "c8ea6c34d0207f9388ebf479f1c92ea77d63d61f5614cbbcf10a3896ef8c334a",
    "homepage_style_decisions_sha256": "c9f286b5d2c5b5367e74362e1ea69bbbf9b52be7be8bbccf6f4f668b7083a0d9",
    "homepage_styles_batch_01_sha256": "15ce5c5679d9f978db50c31b25ac59fd004acd19014e9fc80e3d613b46ee642e",
    "structure_preserved_tuning_sha256": "c603d3e26b4db821a18e2ca937f0b62ddc01b1ca2cc0ccb81571eb1926e0bdca",
    "carob_batch_06_sha256": "7f95350047a7676499d785788655e34ee8c645f07e5a5a05ad6d1972addd8560",
    "homepage_hybrid_sha256": "1e22c01f02c973867692ccc4f942fcd150c5c1a92365a34bef2573987b3a4966",
    "lane_2_homepage_system_sha256": "6d5b7a0986a698932b52fbdef67ef6a679b4dba4999feca9a3c686ec29328cf6"
  },
  "readable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R4-20260825T165002.md",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R3-20260825T164343.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R3-20260825T164343.json",
    "maplemoon-website/scripts/build-maplemoon-homepage-style-finish-r3-20260825T164343.mjs",
    "maplemoon-website/_wip/evidence/homepage_style_finish_r3_20260825T164343",
    "maplemoon-website/docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "maplemoon-website/scripts/check-maplemoon-receipt.py",
    "maplemoon-website/scripts/build-maplemoon-wip-preview.py",
    "maplemoon-website/scripts/check-maplemoon-responsive-overflow.mjs",
    "maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html",
    "maplemoon-website/_wip/our-story.WIP.html",
    "maplemoon-website/_wip/shop.WIP.html",
    "maplemoon-website/_wip/stockists.WIP.html",
    "maplemoon_build_20260813/mock-cart.js",
    ".codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/HOMEPAGE-STYLES-DECISIONS-20260824.md",
    ".codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/homepage-styles-batch-01.html",
    ".codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/maple-moon-homepage-structure-preserved-style-tuning.html",
    ".codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/homepage-what-is-carob-batch-06.html",
    ".codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/maple-moon-homepage-hybrid-current-vs-tuned.html",
    ".codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/maple-moon-lane-2-homepage-system.html"
  ],
  "writable_paths": [
    "maplemoon-website/scripts/build-maplemoon-homepage-style-finish-r4-20260825T165002.mjs",
    "maplemoon-website/_wip/deploy/generated/maplemoon-homepage-style-finish-r4-20260825T165002",
    "maplemoon-website/_wip/evidence/homepage_style_finish_r4_20260825T165002",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R4-20260825T165002.json"
  ],
  "snapshot_contract": [
    "after checkpoint/start PASS, copy the exact acquisition homepage bytes to evidence/source-snapshot.WIP.html and require SHA-256 792e6508d21a4b1840f5a35fd28af05962030a7e2e32e73cda4651c7e5a48dd9",
    "while live source still matches acquisition, run the pinned existing preview builder once into evidence/baseline and seal its complete directory hash; later live-source drift does not mutate or invalidate this sealed review baseline",
    "R4 builder reads only the sealed evidence/baseline and fails if its directory/hash differs; it never reads or writes the moving live homepage",
    "at close, compare current live homepage to the source snapshot and report an exact rebase delta; drift is HOLD only for later source ingestion, not failure of the immutable review candidate"
  ],
  "implementation_contract": [
    "preserve every R1/R2/R3 path byte-identical and create only the four exact R4 paths",
    "map all five styling items through one isolated external CSS asset and exact count-one homepage link injection; reverse the link to prove homepage byte equality",
    "retain acquisition hero-copy radial and carousel-mist refinements",
    "hotspot font stays at least 14px through 320; credit stays at least 14px/1.4; comparison is two columns at 1440/1024 and stacked at 768/390/320; #sampler.q-sampler plus neutralised pseudo-layers yields one dark readable field",
    "preserve section order, text, links, image/video sources, scripts, forms, structured data and exact current buttons; q-segments remains absent",
    "style only current truthful footer and single credit anatomy; do not invent missing legal/conditional/two-ended content",
    "stop after completion receipt for BOSS review; do not run promotion, ingestion or deploy"
  ],
  "verify": [
    "sealed snapshot/source and baseline directory hashes match at acquisition and close; all proof/builder/predecessor pins match",
    "baseline and R4 candidate differ only by count-one homepage link, isolated CSS and manifest; reverse reconstruction and flow/text/media/control projections are exact",
    "CDP exact 1440/1024/768/390/320; zero root/internal semantic overflow, broken images, console/page/request/bad-response failures",
    "hero one action, q-segments zero, exact buttons/links, hotspots/comparison/credit/starter literal gates all pass",
    "full-page and focused before/after evidence is complete/nonblank; independent visual review gives explicit verdicts for hero, hotspots, comparison, farm/credit, starter, footer and seams",
    "mobile menu, skip/focus, hero/starter focus and reduced-motion pass; twelve positive controls caught",
    "close live-source delta is recorded without modifying source",
    "completion receipt gate passes; promotion is not run"
  ],
  "stop": [
    "snapshot copy or baseline does not match the acquisition source hash",
    "a proof, predecessor, existing builder or frozen non-home file changes",
    "a correction requires source/content/media/button/flow/script/form/structured-data mutation",
    "a required check or independent visual judgment fails or is missing",
    "a path outside writable_paths changes as a result of R4",
    "promotion, deploy, production, Shopify, Git or client action becomes necessary"
  ],
  "forbidden_actions": [
    "edit/delete any R1/R2/R3 path, live WIP, existing preview builder, mock-cart, planning proof or existing preview/deployment",
    "change homepage flow, copy, imagery, buttons, comparison-control state, commerce or capability",
    "git add, commit, push, stash, checkout, reset, clean, delete, overwrite, gitignore, deploy, publish, promote, access Shopify or contact the client"
  ],
  "requires_visual_evidence": true,
  "next_reviewer": "MapleMoon BOSS independent visual review; separate explicit packet required for live-source rebase/ingestion or deployment"
}
<!-- CONTROL-PLANE:END -->

## BOSS snapshot decision

**GO — immutable review snapshot.** Active editors may continue on the live
homepage. R4 freezes one verified source/base, builds and proves the style layer
there, and reports later rebase work separately. No live source, preview or
deployment is touched.
