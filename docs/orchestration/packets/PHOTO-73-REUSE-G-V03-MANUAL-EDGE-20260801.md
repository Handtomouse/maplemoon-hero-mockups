# Packet PHOTO-73-REUSE-G-V03-MANUAL-EDGE-20260801

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "PHOTO-73-REUSE-G-V03-MANUAL-EDGE-20260801",
  "candidate_id": "PHOTO-73-REUSE-G-V03-MANUAL-EDGE-CANDIDATE-20260801-001",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "phase": "PHOTO-73-REUSE-G-V03-MANUAL-EDGE",
  "state": "ready",
  "requires_visual_evidence": true,
  "objective": "Create one non-overwriting layered v03 candidate from the verified v02 PSD and manually remove only the remaining teal source-wall edge contamination around Carli's loose hair, wrist, hand and fingers while preserving the approved G integration and real subject detail.",
  "readable_paths": [
    "docs/orchestration/packets/PHOTO-73-REUSE-G-20260801.md",
    "docs/orchestration/reviews/PHOTO-73-REUSE-G-20260801.json",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v02/73_reuse_g_v02.psd",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v02/73_reuse_g_v02.png",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v02/qa/73_reuse_g_v02-full-frame.png",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v02/qa/73_reuse_g_v02-hair-hand-armgap-100pct.png",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v02/qa/73_reuse_g_v02-mask-white-black.png",
    "scripts/check-maplemoon-receipt.py",
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md"
  ],
  "writable_paths": [
    "docs/orchestration/packets/PHOTO-73-REUSE-G-V03-MANUAL-EDGE-20260801.md",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v03/73_reuse_g_v03.psd",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v03/73_reuse_g_v03.png",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v03/qa/73_reuse_g_v03-full-frame.png",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v03/qa/73_reuse_g_v03-hair-hand-armgap-100pct.png",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v03/qa/73_reuse_g_v03-mask-white-black.png",
    "docs/orchestration/reviews/PHOTO-73-REUSE-G-V03-MANUAL-EDGE-20260801.json"
  ],
  "base": {
    "v02_psd_sha256": "86343f18a1524a5b49acb1f94e6ba1f9357f9c6569ff2cc499587d7be565c600",
    "candidate_rule": "new v03 files only; v02 PSD, website references, live assets and all unadmitted paths remain unchanged"
  },
  "method": [
    "Save a separate layered v03 PSD from the verified v02 base without overwriting v02",
    "Use localized manual Photoshop edge-colour decontamination only around the evidenced loose hair, wrist, hand and fingers, using the preserved editable matte",
    "Do not use broad Defringe, generation, subject replacement, global recolouring or geometry changes",
    "Preserve real hair and finger detail, grain, skin, denim, shadows, arm-gap geometry, subject pixels and the approved G background",
    "Render the review PNG, full-frame proof, native 100 percent hair-hand-arm-gap proof and white-black matte proof only after the native edge check passes"
  ],
  "verify": [
    "phase-start recovery gate passes before Photoshop or candidate mutation",
    "v02 PSD hash remains exact before and after the phase",
    "v03 PSD remains layered and non-overwriting",
    "native proof shows no teal contamination, halo, clipped loose hair, clipped fingers, hard cutout edge, lost grain or changed arm-gap geometry",
    "full-frame review preserves the approved G background, subject colour and lighting integration",
    "receipt uses maplemoon-receipt/v2 and the exact worker_thread_id"
  ],
  "stop": [
    "the v02 base hash differs",
    "recovery or phase-start gate fails",
    "interactive Photoshop control is unavailable",
    "manual cleanup would require generation, broad Defringe, subject replacement or unapproved recolouring",
    "native edge QA exposes a halo, clipped detail, hard edge, lost grain or changed subject/background",
    "any path outside writable_paths would change",
    "any website proof, website reference, live asset, upload, deploy, commit, push or client action is requested"
  ],
  "next_reviewer": "Nate"
}
<!-- CONTROL-PLANE:END -->
