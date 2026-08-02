# Packet PHOTO-24-MANUAL-RETOUCH-20260801

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "PHOTO-24-MANUAL-RETOUCH-20260801",
  "candidate_id": "PHOTO-24-MANUAL-RETOUCH-CANDIDATE-20260801-001",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "ready",
  "objective": "Create one new local #24 candidate from the verified untouched Heros-24.jpg, using manual Clone Stamp/Healing Brush only on visible adhesive/support traces beneath the moon-stack contacts, then produce native QA proof and a local website-section preview without changing any website reference.",
  "readable_paths": [
    "Downloads/wetransfer_website-hero-raws_2026-06-03_1315/Heros-24.jpg",
    "Downloads/wetransfer_website-hero-raws_2026-06-03_1315/Heros-24.psd",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260731/PHOTOSHOP_PREP_PACKET_20260731.md",
    "maplemoon-website/docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/24_manual_v01/24_manual_v01.psd",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/24_manual_v01/24_manual_v01.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/24_manual_v01/qa/24_manual_v01-full-frame.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/24_manual_v01/qa/24_manual_v01-native-100pct.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/24_manual_v01/photo-24-v01-website-section-preview.html",
    "maplemoon-website/docs/orchestration/reviews/PHOTO-24-MANUAL-RETOUCH-20260801.json"
  ],
  "base": {
    "source_path": "Downloads/wetransfer_website-hero-raws_2026-06-03_1315/Heros-24.jpg",
    "source_sha256": "6b0373e490e1270d6b327e5f505aff2b2453c57c20884c741da2fe17afedc86e",
    "candidate_rule": "new v01 candidate only; never overwrite source, live, H212 or prior retouches"
  },
  "method": [
    "Manual Clone Stamp/Healing Brush only on visible grey adhesive/support traces beneath moon contacts",
    "Repair one contact at a time from nearest matching backdrop, concrete or chocolate texture",
    "Preserve moon silhouettes, concrete texture, real contact shadows, edge transitions and grain",
    "Full-frame and native 100 percent lower-contact QA before website-section preview"
  ],
  "non_goals": [
    "#8, #63, #73 or #74",
    "Generative Fill, algorithmic repair or invented pixels on protected product geometry",
    "Continuous soft bands beneath moons or broad shadow replacement",
    "Any website WIP or derived-package reference swap",
    "Upload, publish, deploy, commit, push, client contact, Shopify, WooCommerce or production action"
  ],
  "verify": [
    "phase-start gate passes before candidate paths are written",
    "candidate is visibly distinct from and does not overwrite the verified source",
    "full-frame QA proof exists",
    "native 100 percent lower-contact QA proof exists",
    "local real-section preview loads without changing any existing page reference",
    "receipt uses maplemoon-receipt/v2 and the exact worker_thread_id"
  ],
  "stop": [
    "source hash differs from the required hash",
    "checkpoint or phase-start verification does not pass",
    "manual Photoshop control is unavailable",
    "repair would touch protected contours or require Generative Fill",
    "any path outside writable_paths would change",
    "any website, external, client, commerce, deployment or production action is requested"
  ],
  "next_reviewer": "coordinator then Nate"
}
<!-- CONTROL-PLANE:END -->
