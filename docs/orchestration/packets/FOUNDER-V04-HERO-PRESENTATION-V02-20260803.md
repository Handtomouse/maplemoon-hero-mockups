# Packet FOUNDER-V04-HERO-PRESENTATION-V02-20260803

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "FOUNDER-V04-HERO-PRESENTATION-V02-20260803",
  "candidate_id": "FOUNDER-V04-HERO-PRESENTATION-V02-CANDIDATE-001",
  "worker_thread_id": "019f9c36-83e1-7941-92e5-a3b134212288",
  "phase": "FOUNDER-V04-HERO-PRESENTATION-V02",
  "state": "ready",
  "requires_visual_evidence": true,
  "objective": "Create a non-overwriting isolated Our Story v02 review where the pair photograph fills the entire hero section and the accepted Carli/Dylan crops become large editorial portraits rather than small cards.",
  "approval": "Nate selected Fix pair and Fix individual crop, specifying that the pair hero must be large and occupy the whole section.",
  "ownership": "This task 019f9c36-83e1-7941-92e5-a3b134212288 owns only the five paths below.",
  "readable_paths": [
    "_wip/evidence/founder_v04_main_imac_qa_export_20260803/our_story_v04_review.html",
    "_wip/evidence/founder_v04_main_imac_qa_export_20260803/founders_portrait_v04_review.png",
    "_wip/evidence/founder_v04_main_imac_qa_export_20260803/carli_bio_v02.png",
    "_wip/evidence/founder_v04_main_imac_qa_export_20260803/dylan_bio_v01.png"
  ],
  "writable_paths": [
    "docs/orchestration/packets/FOUNDER-V04-HERO-PRESENTATION-V02-20260803.md",
    "docs/orchestration/reviews/FOUNDER-V04-HERO-PRESENTATION-V02-20260803.json",
    "_wip/evidence/founder_v04_main_imac_qa_export_20260803/our_story_v04_review_v02.html",
    "_wip/evidence/founder_v04_main_imac_qa_export_20260803/qa/our_story_v04_v02_desktop_1440.png",
    "_wip/evidence/founder_v04_main_imac_qa_export_20260803/qa/our_story_v04_v02_mobile_390.png"
  ],
  "base": {
    "pair_sha256": "d20b9e63bcb4aab90c1c473f9bd3315555df83bb2d84989fc1d0a1b6dac7c553",
    "carli_sha256": "5e6744f17105639cc55a30015bac5dee5f59faa90e25061610cf18ec3b5becfb",
    "dylan_sha256": "78e551e63178803ac48f8b1c0bdfd15d984ded3c0ed5ac88b3cd2a818811cfd9"
  },
  "method": [
    "Checkpoint all five writable paths before creating v02.",
    "Use the pair image as a full-bleed section background with founders as the dominant first-viewport signal.",
    "Overlay concise hero content directly on the image, never inside a card.",
    "Present Carli and Dylan as two large editorial portrait panels using accepted literal crops.",
    "Render and visually inspect 1440 desktop and 390 mobile proofs; fix overflow, occlusion and bad crops before completion."
  ],
  "verify": [
    "desktop and mobile hero image fills the entire hero section",
    "both founders remain visible and hero text does not cover faces",
    "individual portraits are large, balanced and unclipped",
    "inner/client/scroll widths match at 1440 and 390",
    "all three images load at native dimensions with no console errors",
    "no source image, prior review, WIP, frozen page or live reference changes"
  ],
  "stop": [
    "any image hash mismatch",
    "checkpoint or gate failure",
    "text covers a founder face or important hand detail",
    "a source image or existing review would need overwriting",
    "any website integration or external action is required"
  ],
  "forbidden_actions": [
    "edit pixels, PSDs, sources, prior review evidence, canonical WIP, frozen pages or live references",
    "commit, push, deploy, publish, upload, send or integrate"
  ],
  "next_reviewer": "Nate"
}
<!-- CONTROL-PLANE:END -->

## Output boundary

Review presentation only. No website integration is authorized.
