# Packet PHOTO-73-MANUAL-MASK-20260801

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "PHOTO-73-MANUAL-MASK-20260801",
  "candidate_id": "PHOTO-73-MANUAL-MASK-CANDIDATE-20260801-001",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "ready",
  "requires_visual_evidence": true,
  "objective": "Build one separate #73 review candidate from the verified original delivered Heros-73.jpg using a manual Photoshop subject mask and the approved pale-blue studio-wall direction with faint natural shadow depth, then prove all people edges and real Our Story crops before any approval decision.",
  "prerequisites": [
    "Nate approves or finishes a correction on #24 before #73 is opened",
    "a fresh phase-start checkpoint passes for every writable path below",
    "the protected #73 source hash remains b31b11b0aec41cb9461a74e906a84979162d34b691a27fcef72a3b153e1e6d93"
  ],
  "readable_paths": [
    "maplemoon-website/_wip/source_recovery/photoshoot_raws_20260801/Heros-73.jpg",
    "UFC/spins/maplemoon_lightblue_h212_grade_20260723/04_warm_h212_alignment/maplemoon_heros73_H212_warm_guarded_master.png",
    "UFC/spins/maplemoon_lightblue_h212_grade_20260723/04_warm_h212_alignment/maplemoon_heros73_H212_warm_background_mask.png",
    "maplemoon-website/_wip/reviews/founders_portrait_h073_playground/assets/integration-proof-v12/integration-proof-v12.png",
    "maplemoon-website/_wip/our-story.WIP.html",
    "maplemoon-website/assets/our_story/founders_portrait_h212.webp",
    "maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/73_manual_v01/73_manual_v01.psd",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/73_manual_v01/73_manual_v01.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/73_manual_v01/qa/73_manual_v01-full-frame.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/73_manual_v01/qa/73_manual_v01-hair-left-100pct.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/73_manual_v01/qa/73_manual_v01-hand-fingers-100pct.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/73_manual_v01/qa/73_manual_v01-arm-gap-100pct.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/73_manual_v01/qa/73_manual_v01-clothing-boundary-100pct.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/73_manual_v01/qa/73_manual_v01-our-story-desktop.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/73_manual_v01/qa/73_manual_v01-our-story-mobile.png",
    "maplemoon-website/docs/orchestration/reviews/PHOTO-73-MANUAL-MASK-20260801.json"
  ],
  "base": {
    "source_path": "maplemoon-website/_wip/source_recovery/photoshoot_raws_20260801/Heros-73.jpg",
    "source_sha256": "b31b11b0aec41cb9461a74e906a84979162d34b691a27fcef72a3b153e1e6d93",
    "candidate_rule": "new v01 PSD and review outputs only; never overwrite source, live H212 or any historical candidate"
  },
  "references": {
    "H212_grade_only_sha256": "336f98f46ad9dfab8a2719447293ba5ceaf131264673124317a4c51a444d2e00",
    "historical_mask_comparison_only_sha256": "0700d00babbfd70593e77703235f85e59130cf18367f81cea079cad4b9ba6af9",
    "approved_direction_proof_only_sha256": "88b2373d41ea0a8b925ca53173e67f3c3c65bc42ecd7e62f4a930ccc0b46db21",
    "direction": "pale-blue photographic studio wall with a bright soft centre, restrained grain, gentle perimeter falloff and faint broad natural shadow depth"
  },
  "method": [
    "Start from original delivered source pixels only",
    "Create a fresh manual Pen/Select-and-Mask subject matte; use the historical matte only as comparison",
    "Manually refine Carli's left hair and flyaways, hand and finger gaps, founders' arm gap, shoulders, denim and outer people boundary",
    "Keep skin, faces, expression, hair colour, hands, ring, denim texture and original grain protected",
    "Composite only the approved pale-blue wall direction; preserve faint photographic shadow depth and avoid hard geometric shadows",
    "Use H212 and integration proof v12 as colour/direction references only, never repair bases",
    "Render the real Our Story section at desktop and mobile through an in-memory/local substitution without changing the page reference"
  ],
  "non_goals": [
    "Generative Fill, automated subject replacement, algorithmic final mask or generated people pixels",
    "Using v7, v8, v12, H212 or any derived composite as the repair base",
    "Waxy skin, recoloured hair, flattened denim, erased wisps, hard cutout edges or old-wall contamination",
    "Any change to _wip/our-story.WIP.html, founders_portrait_h212.webp or a website asset reference",
    "Upload, publish, deploy, commit, push, client contact or production action"
  ],
  "verify": [
    "phase-start gate passes after #24 approval and before any candidate path is written",
    "source hash remains exact",
    "full-frame and all four native 100 percent edge proofs exist",
    "no old teal/grey wall remains in arm gap, fingers, hair or body boundary",
    "edges retain natural softness without halos or clipped hair",
    "desktop and mobile real-section proofs preserve both founders and fit the pale website palette",
    "receipt uses maplemoon-receipt/v2 and the exact worker_thread_id"
  ],
  "stop": [
    "#24 has not been approved",
    "source hash differs",
    "checkpoint or phase-start verification does not pass",
    "manual Photoshop control is unavailable",
    "a protected person pixel or edge cannot be repaired without invention",
    "any path outside writable_paths would change"
  ],
  "next_reviewer": "coordinator then Nate"
}
<!-- CONTROL-PLANE:END -->
