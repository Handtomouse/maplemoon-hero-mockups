# MapleMoon homepage style finish R2 — bounded pre-QA correction — 2026-08-25 16:35 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-HOMEPAGE-STYLE-FINISH-R2-20260825T163529",
  "worker_thread_id": "019ffe53-6243-73a2-9d75-e1a072cd07ce",
  "state": "admitted_non_overwriting_correction_after_r1_pre_qa_fail",
  "objective": "Correct exactly the four literal CSS-contract failures preserved by R1, rebuild into a new non-overwriting derived root, and complete the full exact-width independent visual/runtime QA programme without changing source, page flow, content, media, controls, functionality, Git, preview, deploy or production.",
  "authority": "Nate authorised staged style integration. R1 correctly stopped before browser QA. R2 may correct only the 14px hotspot floor, 14px credit floor, 768 comparison stacking, and inherited sampler ID/pseudo-layer cascade, plus evidence-harness defects that retain all positive controls. No broader redesign or source ingestion is authorised.",
  "predecessor": {
    "packet_sha256": "16b627382d3c6b94eea3b10218335387882d71fe4c67637e4e9b6c6a6cf896c4",
    "failed_receipt_sha256": "d345e2461148b041aa660bc9f0f399808d07b07cefba7d338eb31db358138606",
    "failed_builder_sha256": "b9188bb8d5ee3bf57f4bb9cc2b195769caf2fa69ff25747879c37cc50d00be30",
    "failure_evidence_sha256": "a9d600ce747df0b79c889bfd02a4b602dfefdcc8a32901a325dd06919efed515",
    "failed_output_directory_sha256": "bc214f45f21f78b41f29f01eb51340ab19f934a7405c9680b3d540dfeb4b86ee"
  },
  "base": {
    "homepage_wip_sha256": "0e979d3737dc1484c6f4a4e23feed5ab7b74871b0b3ced84faa045c817f29e1b",
    "private_preview_builder_sha256": "c8ea6c34d0207f9388ebf479f1c92ea77d63d61f5614cbbcf10a3896ef8c334a",
    "homepage_style_decisions_sha256": "c9f286b5d2c5b5367e74362e1ea69bbbf9b52be7be8bbccf6f4f668b7083a0d9",
    "homepage_styles_batch_01_sha256": "15ce5c5679d9f978db50c31b25ac59fd004acd19014e9fc80e3d613b46ee642e",
    "structure_preserved_tuning_sha256": "c603d3e26b4db821a18e2ca937f0b62ddc01b1ca2cc0ccb81571eb1926e0bdca",
    "carob_batch_06_sha256": "7f95350047a7676499d785788655e34ee8c645f07e5a5a05ad6d1972addd8560",
    "homepage_hybrid_sha256": "1e22c01f02c973867692ccc4f942fcd150c5c1a92365a34bef2573987b3a4966",
    "lane_2_homepage_system_sha256": "6d5b7a0986a698932b52fbdef67ef6a679b4dba4999feca9a3c686ec29328cf6"
  },
  "readable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R2-20260825T163529.md",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-HOMEPAGE-STYLE-FINISH-20260825T161314.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-HOMEPAGE-STYLE-FINISH-20260825T161314.json",
    "maplemoon-website/scripts/build-maplemoon-homepage-style-finish-20260825T161314.mjs",
    "maplemoon-website/_wip/deploy/generated/maplemoon-homepage-style-finish-20260825T161314",
    "maplemoon-website/_wip/evidence/homepage_style_finish_20260825T161314",
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
    "maplemoon-website/scripts/build-maplemoon-homepage-style-finish-r2-20260825T163529.mjs",
    "maplemoon-website/_wip/deploy/generated/maplemoon-homepage-style-finish-r2-20260825T163529",
    "maplemoon-website/_wip/evidence/homepage_style_finish_r2_20260825T163529",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R2-20260825T163529.json"
  ],
  "implementation_contract": [
    "preserve all four R1 paths byte-identical and create only the four exact new R2 paths after checkpoint and phase=start PASS",
    "derive from a fresh output of the pinned existing private-preview builder, not the failed R1 output",
    "retain the R1 selector mapping and visual direction while correcting only four known failures: hotspot font remains at least 14px through 320; credit remains at least 14px; comparison stacks at 768 and narrower; #sampler.q-sampler and its pseudo-layers yield one dark readable field",
    "preserve homepage section order, visible text, links, media, scripts, forms, structured data and exact current buttons; q-segments stays absent",
    "keep one isolated external CSS asset and count-one link injection; reverse that injection to prove homepage byte equality",
    "do not claim exact Footer-C legal/conditional anatomy or a two-ended credit ledger because current truthful markup does not contain them",
    "complete all required exact-width, component, seam, focus, reduced-motion, runtime, overflow, image, positive-control and rendered-evidence checks",
    "stop after receipt completion for BOSS review; do not run promotion, ingestion or deploy"
  ],
  "verify": [
    "R1 and all source/proof pins match at acquisition and close; frozen files remain byte-identical",
    "fresh baseline and R2 output differ only by exact homepage stylesheet link, isolated CSS and manifest",
    "CDP exact 1440/1024/768/390/320 widths; zero root/internal semantic overflow, broken images, console/page/request/bad-response failures",
    "flow/text/media/control projections equal; hero retains exactly one Shop the Range action; q-segments count zero",
    "hotspots exactly two, visible and at least 14px/500; credit visible once and at least 14px/1.4; comparison two columns at 1440/1024 and stacked at 768/390/320; starter six images/two 44px CTAs/contained layout",
    "full-page plus focused before/after proof set is complete and nonblank; independent visual reviewer marks hero, hotspots, comparison, farm/credit, starter, footer and all seam boundaries PASS or HOLD with evidence",
    "mobile menu, skip/focus, hero/starter focus and reduced-motion states pass",
    "twelve positive controls are caught",
    "completion receipt gate passes; promotion is not run"
  ],
  "stop": [
    "a source, proof, predecessor or frozen pin changes",
    "a correction requires copy, media, control, flow, script, form, structured-data or source mutation",
    "a required check or visual judgment fails or is missing",
    "a path outside writable_paths changes as a result of R2",
    "promotion, deploy, production, Shopify, Git or client action becomes necessary"
  ],
  "forbidden_actions": [
    "edit or delete any R1 path, frozen WIP, existing preview builder, mock-cart, planning proof or existing preview/deployment",
    "change homepage flow, copy, imagery, buttons, comparison-control state, commerce or capability",
    "git add, commit, push, stash, checkout, reset, clean, delete, overwrite, gitignore, deploy, publish, promote, access Shopify or contact the client"
  ],
  "requires_visual_evidence": true,
  "next_reviewer": "MapleMoon BOSS independent visual review; separate explicit packet required for source ingestion or deployment"
}
<!-- CONTROL-PLANE:END -->

## BOSS correction decision

**GO — R2 bounded correction only.** Preserve R1 as failed evidence. Fix the
four named CSS-contract failures in a new deterministic derived root, retain all
structural projections and positive controls, and stop after a truthful
completion gate. No promotion or deployment is authorised.
