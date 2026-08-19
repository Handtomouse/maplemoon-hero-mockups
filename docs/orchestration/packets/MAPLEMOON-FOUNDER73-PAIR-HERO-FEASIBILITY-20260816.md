# MapleMoon founder frame 73 pair-hero feasibility

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-FOUNDER73-PAIR-HERO-FEASIBILITY-20260816",
  "worker_thread_id": "/root",
  "state": "admitted",
  "objective": "Prove, without editing the site or source image, whether the sole smiling both-founder JPEG can fit the current Our Story pair-hero geometry at desktop and mobile.",
  "authority": "Continuation of Nate's active seven-workstream MapleMoon goal after FOUNDER_FRAMES.md identified Heros-73.jpg as the only qualifying supplied pair frame.",
  "base": {
    "our_story_sha256": "6beef3f9449804e800ad7883c311c957637d12a5e05c69beb7ed912e49b36e23",
    "frame73_sha256": "b31b11b0aec41cb9461a74e906a84979162d34b691a27fcef72a3b153e1e6d93",
    "current_pair_asset_sha256": "67a56d7c1b7e27973f86f7fe705ec48a963f8c22402bc46f60eb24e155a44e88",
    "production_immutable_token": "7vjf2m50b"
  },
  "readable_paths": [
    "maplemoon-website/_wip/HANDOFF-FOUNDER-IMAGERY-20260803.md",
    "maplemoon-website/_wip/our-story.WIP.html",
    "maplemoon-website/assets/our_story/founders_portrait_h212.webp",
    "Projects/maplemoon/downloads/wetransfer_website-hero-raws_2026-06-03_1315/Heros-73.jpg",
    "maplemoon_rebuild_20260815/FOUNDER_FRAMES.md"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/founder73_pair_hero_feasibility_20260816",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-FOUNDER73-PAIR-HERO-FEASIBILITY-20260816.json"
  ],
  "method": [
    "checkpoint both exact outputs and pass the phase-start gate before writing",
    "pin the WIP page, source JPEG and current pair asset",
    "build a review-only comparison that reproduces the current 3:2 container and edge wash without changing any source bytes",
    "render the current asset and frame 73 at measured 390 and 1440",
    "record crop geometry, visual result and decision boundary"
  ],
  "verify": [
    "source hashes and dimensions match acquisition and close",
    "both candidate and current asset render in the same 3:2 geometry at 390 and 1440",
    "no face, head or body is cropped from frame 73",
    "screenshots are nonblank with no overflow, broken image, console, page or request error",
    "no WIP, source image, build, deploy or production file changes"
  ],
  "stop": [
    "a pinned source differs",
    "frame 73 cannot retain both founders in the current geometry",
    "retouching, regrading, integration, deployment or selection would be required"
  ],
  "forbidden_actions": [
    "edit, copy over, retouch, regrade or export a source image",
    "edit Our Story or any website/build file",
    "select or approve frame 73 for live use",
    "deploy, promote, alias, publish, send or contact the client"
  ],
  "next_reviewer": "Nate for frame 73 pair-hero selection and the separate Our Story route decision",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->
