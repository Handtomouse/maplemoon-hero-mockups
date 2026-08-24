# MapleMoon certified private preview R5 — 2026-08-24 11:24 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-CERTIFIED-PRIVATE-PREVIEW-R5-20260824T112414",
  "worker_thread_id": "019ffe53-6243-73a2-9d75-e1a072cd07ce",
  "state": "exact_certified_r4_preview_only_deployment_and_remote_certification",
  "objective": "Deploy the exact locally certified R4 tree once to the historical MapleMoon Vercel project as Preview only, return its immutable URL, verify authenticated byte equality and preserve the production alias unchanged.",
  "authority": "Nate previously authorised preview deployment while keeping production frozen. R4 receipt ac60ed2f0d7fa34eb4be00f264c912bd2eebf33f48d74fc9ba5d17968f415222 has complete and promote gates PASS and proposed_next_state certified_local_candidate_ready_for_separate_private_preview_deploy_packet. Read-only project inspection confirms historical project maplemoon_build_20260813 ID prj_uyvhJMmqX5hq2mFxzLUKu3sxqyzn; production remains 7vjf2m50b/dpl_G2LER2awaqyFtGRCcTserXbNynct Ready. The repo's different maplemoon-website link is not authority.",
  "base": {
    "head": "7c04f808e285acc116ae0f93c3d887ee1e96aea3",
    "r4_tree_sha256": "5a649086667c7ed017e45b2cb97fdf6d356d1b4ad636a2d51b09b2b7321efe49",
    "r4_receipt_sha256": "ac60ed2f0d7fa34eb4be00f264c912bd2eebf33f48d74fc9ba5d17968f415222",
    "historical_project_json_sha256": "67c7d22f79bf6ac5785d8c9b760ac5df4081448c247228a71f445c61200db902",
    "project_id": "prj_uyvhJMmqX5hq2mFxzLUKu3sxqyzn",
    "org_id": "team_385xEDn7YomEO2eo5pHTp3px",
    "production_deployment_id": "dpl_G2LER2awaqyFtGRCcTserXbNynct",
    "production_immutable_token": "7vjf2m50b"
  },
  "readable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-CERTIFIED-PRIVATE-PREVIEW-R5-20260824T112414.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ADMITTED-PREVIEW-RUNTIME-R4-20260824T111607.json",
    "maplemoon-website/_wip/deploy/generated/maplemoon-admitted-preview-r4-20260824T111607",
    "maplemoon_build_20260813/.vercel/project.json",
    "maplemoon-website/scripts/check-maplemoon-minimum-release-preflight-r4.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/certified_private_preview_r5_20260824T112414",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CERTIFIED-PRIVATE-PREVIEW-R5-20260824T112414.json"
  ],
  "implementation_contract": [
    "replay R4 receipt complete/promote and exact R4 tree hash before deployment",
    "create an isolated /private/tmp staging copy of exact R4 and add only the exact historical .vercel/project.json binding; prove all 75 candidate files are byte-identical before deploy",
    "run exactly one vercel deploy --yes from isolated staging with no --prod, promote, alias, rollback, protection or second deployment command",
    "inspect returned immutable deployment and require target Preview, status Ready and historical project identity",
    "authenticated-fetch all seven HTML routes and critical mock-cart/design-system/powder/founder assets; require status 200, nonblank and byte equality to R4",
    "run anonymous preflight on immutable URL; Vercel SSO wall is an expected private-review qualification, never a success or reason to change protection",
    "inspect production alias after preview deployment and require the exact 7vjf2m50b/dpl_G2LER production identity unchanged",
    "write only R5 evidence and receipt; do not mutate R4 or durable project links"
  ],
  "verify": [
    "R4 tree/receipt and historical project binding match at acquisition and close",
    "exactly one preview deployment command ran and returned Ready Preview",
    "authenticated remote bytes equal exact R4 for all named files",
    "anonymous qualification and production freeze evidence are recorded literally",
    "only the two exact R5 writable paths change"
  ],
  "stop": [
    "staging candidate bytes differ, project identity differs or a deploy command would target production",
    "deployment is not Preview/Ready or any authenticated byte/status check fails",
    "production alias identity changes",
    "a source/R1/R2/R3/R4/Git/Shopify/client mutation would be required"
  ],
  "forbidden_actions": [
    "run vercel deploy --prod, vercel --prod, promote, alias, rollback, protection change or a second deploy",
    "deploy to project maplemoon-website or any project other than prj_uyvhJMmqX5hq2mFxzLUKu3sxqyzn",
    "mutate R4, source, WIP, root pages, assets, Git, Shopify, production or preserved out artifacts",
    "contact or email the client"
  ],
  "next_reviewer": "Nate for private preview review; production requires a separate explicit instruction and packet",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## BOSS decision

GO for exactly one preview-only deployment of certified R4 to the historical MapleMoon project. Production remains frozen.
