# Packet PHOTO-74-GRADE-INTEGRATION-20260801

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "PHOTO-74-GRADE-INTEGRATION-20260801",
  "candidate_id": "PHOTO-74-GRADE-INTEGRATION-CANDIDATE-20260801-001",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "queued_after_photo_73_approval",
  "requires_visual_evidence": true,
  "objective": "Create one separate #74 review candidate from the verified Heros-75.jpg by non-destructively integrating exposure, colour and background toward the warm guarded H212 direction; do not remask unless native QA first proves a specific edge defect.",
  "prerequisites": [
    "#73 has reached Nate Confirm or Fix",
    "a fresh phase-start checkpoint passes for every writable path below",
    "the #74 source hash remains 987f0acf17b4da9605d83272efe6b3d79e10080967e4de88b1098dfe97c31252"
  ],
  "readable_paths": [
    "Downloads/wetransfer_website-hero-raws_2026-06-03_1315/Heros-75.jpg",
    "UFC/spins/maplemoon_lightblue_h212_grade_20260723/04_warm_h212_alignment/maplemoon_heros74_H212_warm_guarded_master.png",
    "UFC/spins/maplemoon_lightblue_h212_grade_20260723/04_warm_h212_alignment/maplemoon_heros74_H212_warm_background_mask.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260731/qa/heros74_hands_pod_raw_edge_100pct.jpg",
    "maplemoon-website/_wip/our-story.WIP.html",
    "maplemoon-website/assets/our_story/founders_hands.webp",
    "maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/74_grade_v01/74_grade_v01.psd",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/74_grade_v01/74_grade_v01.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/74_grade_v01/qa/74_grade_v01-full-frame.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/74_grade_v01/qa/74_grade_v01-left-hand-contact-100pct.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/74_grade_v01/qa/74_grade_v01-right-hand-contact-100pct.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/74_grade_v01/qa/74_grade_v01-pod-texture-100pct.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/74_grade_v01/qa/74_grade_v01-background-shadow-100pct.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/74_grade_v01/qa/74_grade_v01-our-story-desktop.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/74_grade_v01/qa/74_grade_v01-our-story-mobile.png",
    "maplemoon-website/docs/orchestration/reviews/PHOTO-74-GRADE-INTEGRATION-20260801.json"
  ],
  "base": {
    "source_path": "Downloads/wetransfer_website-hero-raws_2026-06-03_1315/Heros-75.jpg",
    "source_sha256": "987f0acf17b4da9605d83272efe6b3d79e10080967e4de88b1098dfe97c31252",
    "candidate_rule": "new v01 PSD and review outputs only; never overwrite source, live asset or prior candidate"
  },
  "references": {
    "H212_grade_only_sha256": "397b2f15ef40d48592850ab77a4e8e277d7c0940023e8bca3f4f40ef31e3b6bd",
    "historical_mask_comparison_only_sha256": "fa78c7ba27f4577331e883dfa3a7279f01e873fd13653ef4cf00e2bf0f154e81",
    "direction": "warm guarded people and pod, pale H212-style background, photographic shadow integration and preserved source grain"
  },
  "method": [
    "Start from the untouched high-key source and use reversible Camera Raw or adjustment layers",
    "Match the H212 direction while protecting both hands, fingers, nails, skin, arm hair, pod texture and contact points",
    "Preserve original shadow geometry and avoid flattening the pod or human detail",
    "Inspect native edges first; do not create or repair a mask unless a visible defect is documented and separately approved",
    "Render the real Our Story hands section at desktop and mobile through a local in-memory substitution without changing its asset reference"
  ],
  "non_goals": [
    "Speculative remasking, Generative Fill, people or pod replacement",
    "Using H212 or the historical mask as a repair base",
    "Any change to _wip/our-story.WIP.html, founders_hands.webp or another website reference",
    "Upload, publish, deploy, commit, push, client contact or production action"
  ],
  "verify": [
    "phase-start gate passes before candidate paths are written",
    "source hash remains exact",
    "native hand, pod and background-shadow proofs show no newly introduced edge fault",
    "protected warm detail and original shadow geometry remain intact",
    "desktop and mobile real-section proofs fit the pale website palette",
    "receipt uses maplemoon-receipt/v2 and the exact worker_thread_id"
  ],
  "stop": [
    "#73 has not been reviewed",
    "source hash differs",
    "checkpoint or phase-start verification does not pass",
    "a mask repair appears necessary without separate evidence and approval",
    "any path outside writable_paths would change"
  ],
  "next_reviewer": "coordinator then Nate"
}
<!-- CONTROL-PLANE:END -->
