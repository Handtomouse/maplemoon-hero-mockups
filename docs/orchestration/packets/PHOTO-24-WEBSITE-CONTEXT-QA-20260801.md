# Packet PHOTO-24-WEBSITE-CONTEXT-QA-20260801

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "PHOTO-24-WEBSITE-CONTEXT-QA-20260801",
  "candidate_id": "PHOTO-24-WEBSITE-CONTEXT-QA-20260801-001",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "ready",
  "requires_visual_evidence": true,
  "objective": "Capture desktop and mobile screenshots of the #24 candidate substituted only inside a local copy of the real Our Story WIP page, without changing the source page or any website asset reference.",
  "readable_paths": [
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/24_manual_v01/24_manual_v01.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/24_manual_v01/photo-24-v01-website-section-preview.html",
    "maplemoon-website/_wip/our-story.WIP.html",
    "maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/24_manual_v01/qa/24_manual_v01-our-story-desktop.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/24_manual_v01/qa/24_manual_v01-our-story-mobile.png",
    "maplemoon-website/docs/orchestration/reviews/PHOTO-24-WEBSITE-CONTEXT-QA-20260801.json"
  ],
  "method": [
    "Serve the repository on localhost only",
    "Load the real Our Story WIP copy containing only an in-copy #24 image substitution",
    "Capture the studio grid at 1440-pixel desktop and 390-pixel mobile widths",
    "Do not change the source WIP page or an asset reference"
  ],
  "non_goals": [
    "Any image repair, website source edit, asset swap, upload, publish, deploy, commit or client action"
  ],
  "verify": [
    "phase-start gate passes before screenshots are written",
    "both screenshots visibly contain the #24 candidate in the real studio grid",
    "no website source or asset reference changes",
    "receipt uses maplemoon-receipt/v2 and the exact worker_thread_id"
  ],
  "stop": [
    "checkpoint or phase-start verification does not pass",
    "the candidate fails to load in the local page copy",
    "any path outside writable_paths would change"
  ],
  "next_reviewer": "coordinator then Nate"
}
<!-- CONTROL-PLANE:END -->
