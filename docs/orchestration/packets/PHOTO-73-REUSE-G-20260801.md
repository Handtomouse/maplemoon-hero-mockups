# Packet PHOTO-73-REUSE-G-20260801

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "PHOTO-73-REUSE-G-20260801",
  "candidate_id": "PHOTO-73-REUSE-G-CANDIDATE-20260801-001",
  "worker_thread_id": "019fbb6e-c971-7443-a291-3024f446e559",
  "phase": "PHOTO-73-REUSE",
  "state": "ready",
  "requires_visual_evidence": true,
  "objective": "Create one non-overwriting #73 v02 review candidate by reusing the previously selected G Photoshop colour/background suite and full-resolution matte, replacing only its subject pixels with the latest flattened 73_manual_v01 edit, then refine only evidenced hair, hand/finger and arm-gap mask defects.",
  "readable_paths": [
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_manual_v01/73_manual_v01.psd",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_manual_v01/73_manual_v01.png",
    "_wip/reviews/founders_portrait_h073_playground/assets/photoshop-h073-review-v03/subject_original_pixels_full_alpha.psd",
    "_wip/reviews/founders_portrait_h073_playground/assets/v4/e-refinement-24.webp",
    "_wip/reviews/founders_portrait_h073_playground/assets/manual-integrated-v11/integrated-g-background.webp",
    "_wip/reviews/founders_portrait_h073_playground/assets/integration-proof-v12/integration-proof-v12.png",
    "_wip/our-story.WIP.html",
    "scripts/check-maplemoon-receipt.py",
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md"
  ],
  "writable_paths": [
    "docs/orchestration/packets/PHOTO-73-REUSE-G-20260801.md",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v02/73_reuse_g_v02.psd",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v02/73_reuse_g_v02.png",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v02/qa/73_reuse_g_v02-full-frame.png",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v02/qa/73_reuse_g_v02-hair-hand-armgap-100pct.png",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v02/qa/73_reuse_g_v02-mask-white-black.png",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v02/qa/73_reuse_g_v02-our-story-desktop.png",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v02/qa/73_reuse_g_v02-our-story-mobile.png",
    "docs/orchestration/reviews/PHOTO-73-REUSE-G-20260801.json"
  ],
  "base": {
    "latest_subject_psd_sha256": "0878127fba7f712765291efa30c0d33c871187d7cd555b071f7615623ead89e0",
    "selected_g_sha256": "5e5ed602fc403083513fabcf355f882314f6ee37124e1b724ab6a67910b18422",
    "integration_v12_sha256": "88b2373d41ea0a8b925ca53173e67f3c3c65bc42ecd7e62f4a930ccc0b46db21",
    "candidate_rule": "new v02 files only; never overwrite the latest edit, prior Photoshop suite, live asset or website reference"
  },
  "method": [
    "Duplicate the structured v03 G Photoshop suite to the new v02 PSD and use the existing v11 integrated G background asset rather than the two-sided QA wall sample",
    "Insert the latest flattened 73_manual_v01 pixels as a new subject layer",
    "Reuse the existing full-resolution subject transparency as the starting matte",
    "Refine only visible hair, hand/finger and arm-gap defects at native resolution",
    "Preserve the selected G background, falloff, grain and existing subject colour unless QA proves a mismatch",
    "Render full-frame, edge, mask-on-white/black, desktop and mobile review proof"
  ],
  "verify": [
    "phase-start recovery gate passes before any repository write",
    "all three authority hashes remain exact",
    "candidate PSD remains layered and 6000 by 4000",
    "latest subject pixels are used and the prior selected G suite remains separate and editable",
    "mask proof shows no old wall contamination, hard halo or missing arm/finger gap",
    "desktop and mobile evidence fit the pale MapleMoon website palette",
    "receipt uses maplemoon-receipt/v2 and the exact worker_thread_id"
  ],
  "stop": [
    "an authority hash differs",
    "recovery or phase-start gate fails",
    "Photoshop cannot preserve editable layers",
    "a person edge requires generated pixels or broad subject replacement",
    "any path outside writable_paths would change",
    "any live, website-reference, upload, commit, push, deploy or production action is requested"
  ],
  "next_reviewer": "Nate"
}
<!-- CONTROL-PLANE:END -->
