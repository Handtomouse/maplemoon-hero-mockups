# MapleMoon Codex Lane E handoff execution

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-CODEX-LANE-E-HANDOFF-20260816T151818",
  "worker_thread_id": "/root",
  "state": "admitted_held",
  "objective": "Execute CODEX_LANE_E_HANDOFF_20260816.md from clean commit 981b1f0, applying every still-missing authorised Lane E occurrence, verifying the already-present baseline items, and producing the exact receipt and claims ledger without deploying or contacting the client.",
  "authority": "Nate's direct request in the active Codex task plus /Users/handtomouse/maplemoon_recentre_20260815/CODEX_LANE_E_HANDOFF_20260816.md and its authoritative LANE_E_MUTATING_PACKET_20260816.md input.",
  "base": {
    "git_commit": "981b1f02b0f944856f6615c31b5b2ec52a294238",
    "rollback_tag": "pre-lane-e-20260816",
    "production_immutable_token": "7vjf2m50b"
  },
  "readable_paths": [
    "/Users/handtomouse/maplemoon_recentre_20260815/CODEX_LANE_E_HANDOFF_20260816.md",
    "/Users/handtomouse/maplemoon_recentre_20260815/LANE_E_MUTATING_PACKET_20260816.md",
    "/Users/handtomouse/maplemoon_recentre_20260815/LANE_E_apply.md",
    "/Users/handtomouse/maplemoon_recentre_20260815/ALIGN.html",
    "/Users/handtomouse/maplemoon_recentre_20260815/CV_STATUS.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/CARLI-CANVA-OCCURRENCE-RECONCILIATION-20260731.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/LOCK_MANIFEST.json"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html",
    "maplemoon-website/_wip/shop.WIP.html",
    "maplemoon-website/_wip/our-story.WIP.html",
    "maplemoon-website/_wip/carob-story.WIP.html",
    "maplemoon-website/_wip/faq.WIP.html",
    "maplemoon-website/_wip/stockists.WIP.html",
    "maplemoon-website/docs/orchestration/LOCK_MANIFEST.json",
    "maplemoon_apply_20260815/RECEIPT.md",
    "maplemoon_apply_20260815/CLAIMS_APPLIED.md",
    "maplemoon_apply_20260815/lane_e_handoff_20260816T151818",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CODEX-LANE-E-HANDOFF-20260816T151818.json"
  ],
  "method": [
    "preserve the timestamped recovery checkpoint before first content write and hold six exact page locks",
    "treat the 981b1f0 page bytes as baseline truth; verify already-present authorised edits rather than duplicating them",
    "apply the remaining exact Canva wording unless a later 14 August email restates the line",
    "use transparent anonymous review handles instead of inventing human identities",
    "commit one reversible scope item at a time",
    "run positive-control, old-count and new-count checks across the six current root WIP review pages",
    "render every changed page at 390 and 1440 and inspect the resulting images",
    "write RECEIPT.md, CLAIMS_APPLIED.md and a maplemoon-receipt/v2 JSON record"
  ],
  "verify": [
    "all six locks and base hashes match before content mutation",
    "every scope item has explicit before and after counts after a positive control",
    "all changed HTML inline scripts and JSON-LD parse",
    "changed pages render at 390 and 1440 with no overflow, broken images, console, page or request errors",
    "git diff --check passes and the final tracked tree contains only the authorised committed history",
    "production remains pinned to 7vjf2m50b and no deploy command runs"
  ],
  "stop": [
    "a required source line, current page hash or lock differs from the admitted boundary",
    "a required occurrence or rendered check fails",
    "the task would require deploy, client contact, Shopify action, photography mutation or production movement"
  ],
  "forbidden_actions": [
    "deploy, promote, alias, publish, upload or client contact",
    "Shopify account action",
    "photography, colour-grade or external-drive mutation",
    "edit rollback, evidence, recovery or non-current page copies to manufacture zero counts"
  ],
  "next_reviewer": "Nate via the exact external receipt and claims ledger",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

The six current root `_wip/*.WIP.html` review pages are the occurrence corpus. Historical,
rollback, evidence, checkpoint and local deploy copies are not current page surfaces and are not
rewritten to manufacture absence.

