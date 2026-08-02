# Packet PHOTO08-COLOR-01

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "PHOTO08-COLOR-01",
  "candidate_id": "MM-PHOTO8-01",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "phase": "PHOTO-CLOSURE",
  "state": "needs_review",
  "approval_class": "mutating-local-image-candidate",
  "requires_visual_evidence": true,
  "deadline": "target 2026-08-01 12:00 AEST; hard cutoff 2026-08-01 13:30 AEST; QA gate may not be sacrificed",
  "objective": "Create one non-overwriting colour and exposure candidate from the approved Photo 08 manual repair that naturally matches the current Our Story From the Studio gallery while preserving truthful product colour and all repaired pixels.",
  "readable_paths": [
    "_wip/reviews/photoshoot_repair_batch1_20260801/08_manual_v02/08_manual_v02.png",
    "_wip/reviews/photoshoot_repair_batch1_20260801/08_manual_v02/qa/08_manual_v02-native-100pct.png",
    "_wip/assets/our_story/studio_moons_trail.webp",
    "_wip/assets/our_story/studio_bar_rock.webp",
    "_wip/assets/our_story/studio_bar_almond.webp",
    "_wip/assets/our_story/studio_moons_brick.webp",
    "_wip/assets/photo_finals/maplemoon_heros55_brandmatched.webp",
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md"
  ],
  "writable_paths": [
    "_wip/reviews/photoshoot_repair_batch1_20260801/08_color_v03/08_color_v03.psd",
    "_wip/reviews/photoshoot_repair_batch1_20260801/08_color_v03/08_color_v03.png",
    "_wip/reviews/photoshoot_repair_batch1_20260801/08_color_v03/qa/08_color_v03-full-frame.png",
    "_wip/reviews/photoshoot_repair_batch1_20260801/08_color_v03/qa/08_color_v03-native-100pct.png",
    "_wip/reviews/photoshoot_repair_batch1_20260801/08_color_v03/qa/08_color_v03-our-story-context.png",
    "docs/orchestration/packets/PHOTO08-COLOR-01.md",
    "docs/orchestration/reviews/PHOTO08-COLOR-01-20260801.json"
  ],
  "base": {
    "branch": "codex-maplemoon-section-review",
    "head": "d65047b6a7431af955ad0cd5b57c42f7a9367225",
    "source_sha256": "e2ab4b187968f5edff8c6929a8c16a458b9a29ab3679f26b9e1f1bd374eaed09"
  },
  "recovery": {
    "checkpoint_path": "_wip/checkpoints/PHOTO08-COLOR-01_20260801_115016_AEST",
    "checkpoint_timestamp": "2026-08-01 11:50:16 AEST"
  },
  "action": "Apply one global, reversible colour and exposure grade only. Preserve dimensions, crop, geometry, edges, contact area, shadows, texture, grain and truthful blue packaging colour.",
  "verify": [
    "source hash matches exactly before work",
    "no Photoshop or Photo 08 ownership conflict exists",
    "phase-start recovery gate passes",
    "PSD and PNG are 3399 by 5098 and visually identical",
    "full-frame, native 100 percent contact and Our Story gallery-context QA exist",
    "contact repair, silhouettes, shadows, texture and grain remain intact",
    "no blue cast, clipped highlight, crushed shadow or obvious retouching is visible",
    "receipt validates at completion and promotion"
  ],
  "done": "One colour-approved local candidate and evidence set are ready for Nate's candidate-only decision.",
  "stop": [
    "source hash mismatch",
    "ownership overlap",
    "missing recovery evidence",
    "crop, remask, clone, heal, Generative Fill or geometry change is required",
    "truthful product colour cannot be preserved",
    "a required QA view or receipt gate fails",
    "any WIP HTML, website asset reference, package, commit, push, deploy, send, upload, Shopify, WooCommerce or external action is requested"
  ],
  "next_reviewer": "Nate"
}
<!-- CONTROL-PLANE:END -->

No website placement or external action is authorized by this packet.
