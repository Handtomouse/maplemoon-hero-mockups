# MapleMoon homepage style finish R3 — fresh-source staged candidate — 2026-08-25 16:43 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-HOMEPAGE-STYLE-FINISH-R3-20260825T164343",
  "worker_thread_id": "019ffe53-6243-73a2-9d75-e1a072cd07ce",
  "state": "admitted_fresh_source_successor_after_r2_drift_hold",
  "objective": "Build and independently verify the five-item homepage style integration against the freshly reconciled homepage source, in a new non-overwriting derived root, with zero source, flow, content, media, control, Git, preview, deployment or production mutation.",
  "authority": "Nate authorised the staged style integration. R1 is failed pre-QA evidence; R2 is a source-drift HOLD. Read-only reconciliation proved the new source changed only two compatible visual CSS refinements. R3 may apply the exact bounded R2 corrections and complete the full QA contract, but may not ingest, promote or deploy.",
  "predecessor": {
    "r2_packet_sha256": "99a38c956a161c9dd129dd99cc092f2c30e7b6780e33e560207c9b028cce17a6",
    "r2_receipt_sha256": "daed8b097f0af8df6cb458588013e964fb644eb93098c7b679367fea2fae7178",
    "r2_builder_sha256": "60b2846b257147205d252db135b23e62e94ac428790e4d20460bb3268960d236",
    "r2_drift_evidence_sha256": "3a09a371a86c49ac8dd44ed2da59660336a583f4e4c12e50cc56d016daf4d8b2"
  },
  "base": {
    "homepage_wip_sha256": "4a65a61df537652711749137855e9cf0adc443d2b0db2dcabc883fdc3fe442e9",
    "private_preview_builder_sha256": "c8ea6c34d0207f9388ebf479f1c92ea77d63d61f5614cbbcf10a3896ef8c334a",
    "homepage_style_decisions_sha256": "c9f286b5d2c5b5367e74362e1ea69bbbf9b52be7be8bbccf6f4f668b7083a0d9",
    "homepage_styles_batch_01_sha256": "15ce5c5679d9f978db50c31b25ac59fd004acd19014e9fc80e3d613b46ee642e",
    "structure_preserved_tuning_sha256": "c603d3e26b4db821a18e2ca937f0b62ddc01b1ca2cc0ccb81571eb1926e0bdca",
    "carob_batch_06_sha256": "7f95350047a7676499d785788655e34ee8c645f07e5a5a05ad6d1972addd8560",
    "homepage_hybrid_sha256": "1e22c01f02c973867692ccc4f942fcd150c5c1a92365a34bef2573987b3a4966",
    "lane_2_homepage_system_sha256": "6d5b7a0986a698932b52fbdef67ef6a679b4dba4999feca9a3c686ec29328cf6"
  },
  "readable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R3-20260825T164343.md",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R2-20260825T163529.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R2-20260825T163529.json",
    "maplemoon-website/scripts/build-maplemoon-homepage-style-finish-r2-20260825T163529.mjs",
    "maplemoon-website/_wip/evidence/homepage_style_finish_r2_20260825T163529",
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
    "maplemoon-website/scripts/build-maplemoon-homepage-style-finish-r3-20260825T164343.mjs",
    "maplemoon-website/_wip/deploy/generated/maplemoon-homepage-style-finish-r3-20260825T164343",
    "maplemoon-website/_wip/evidence/homepage_style_finish_r3_20260825T164343",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R3-20260825T164343.json"
  ],
  "implementation_contract": [
    "preserve every R1/R2 path byte-identical and create only the four exact R3 paths after checkpoint and phase=start PASS",
    "derive from a fresh output of the pinned existing private-preview builder and retain the newly reconciled hero-copy radial and carousel-mist CSS refinements",
    "map the five styling items through one isolated external CSS asset and exact count-one homepage link injection; reverse the link to prove homepage byte equality",
    "hotspot font remains at least 14px through 320; farm credit remains at least 14px with line-height at least 1.4; comparison is two columns at 1440/1024 and stacked at 768/390/320; #sampler.q-sampler plus neutralised pseudo-layers produces one dark readable field",
    "preserve section order, visible text, links, image/video sources, scripts, forms, structured data and exact current buttons; q-segments stays absent",
    "style current truthful footer anatomy only; do not invent Footer-C legal/conditional content or a two-ended credit ledger",
    "complete exact-width, component, seam, focus, reduced-motion, runtime, overflow, image, positive-control and rendered-evidence QA",
    "stop after completion receipt for BOSS review; do not run promotion, source ingestion or deploy"
  ],
  "verify": [
    "all base/proof/predecessor pins match at acquisition and close; frozen files remain byte-identical",
    "fresh baseline and R3 output differ only by homepage stylesheet link, isolated CSS and manifest; flow/text/media/control projections equal",
    "CDP exact 1440/1024/768/390/320; zero root/internal semantic overflow, broken images, console/page/request/bad-response failures",
    "hero retains exactly one Shop the Range action; q-segments count zero; buttons/links unchanged",
    "hotspots, comparison, credit and starter literal component gates pass at all widths",
    "full-page and focused before/after proof set is complete/nonblank and independent visual review marks hero, hotspots, comparison, farm/credit, starter, footer and seam boundaries PASS or HOLD",
    "mobile menu, skip/focus, hero/starter focus and reduced-motion states pass",
    "twelve positive controls are caught",
    "completion receipt gate passes; promotion is not run"
  ],
  "stop": [
    "a source, proof, predecessor or frozen pin changes",
    "a correction requires copy, media, button, flow, script, form, structured-data or source mutation",
    "a required check or independent visual judgment fails or is missing",
    "a path outside writable_paths changes as a result of R3",
    "promotion, deploy, production, Shopify, Git or client action becomes necessary"
  ],
  "forbidden_actions": [
    "edit/delete any R1/R2 path, frozen WIP, existing preview builder, mock-cart, planning proof or existing preview/deployment",
    "change homepage flow, copy, imagery, buttons, comparison-control state, commerce or capability",
    "git add, commit, push, stash, checkout, reset, clean, delete, overwrite, gitignore, deploy, publish, promote, access Shopify or contact the client"
  ],
  "requires_visual_evidence": true,
  "next_reviewer": "MapleMoon BOSS independent visual review; separate explicit packet required for source ingestion or deployment"
}
<!-- CONTROL-PLANE:END -->

## BOSS fresh-source decision

**GO — R3 staged candidate only.** The source drift was compatible and has been
reconciled exactly. Build from the new pin, retain the incoming visual
refinements, complete the full QA contract, and stop before promotion or deploy.
