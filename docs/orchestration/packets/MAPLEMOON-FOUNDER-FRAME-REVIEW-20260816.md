# MapleMoon founder-frame review

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-FOUNDER-FRAME-REVIEW-20260816",
  "worker_thread_id": "/root",
  "state": "admitted",
  "objective": "Visually inspect all 75 supplied website-hero JPEGs and record whether a usable relaxed or smiling frame containing both founders exists.",
  "authority": "Nate's Execute instruction for item 10 of the ranked MapleMoon next-10 list and CODEX_TASKS_20260816_THREE.md Task 2.",
  "readable_paths": [
    "maplemoon-website/_wip/HANDOFF-FOUNDER-IMAGERY-20260803.md",
    "maplemoon_recentre_20260815/CODEX_TASKS_20260816_THREE.md",
    "Projects/maplemoon/downloads/wetransfer_website-hero-raws_2026-06-03_1315"
  ],
  "writable_paths": [
    "maplemoon_rebuild_20260815/FOUNDER_FRAMES.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-FOUNDER-FRAME-REVIEW-20260816.json"
  ],
  "method": [
    "checkpoint both exact outputs before the first write",
    "visually inspect every supplied JPEG using labelled contact sheets and full-size edge-case review",
    "classify frames by visible founder count and name only qualifying shortlist candidates",
    "do not generate, retouch, regrade, integrate or approve imagery"
  ],
  "verify": [
    "exactly 75 input JPEGs are present",
    "all five 15-frame contact sheets are nonblank and inspected",
    "the output contains three classification lists and an explicit top-three result",
    "input files remain unchanged"
  ],
  "stop": [
    "an input is missing or unreadable",
    "the visual identity of a person cannot be established",
    "image mutation or site integration would be required"
  ],
  "forbidden_actions": [
    "generate, retouch, regrade or overwrite imagery",
    "choose or integrate an image as approved",
    "deploy, publish, send or contact the client"
  ],
  "next_reviewer": "Nate for image selection; Mitch only if a second or third both-founder option is required",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->
