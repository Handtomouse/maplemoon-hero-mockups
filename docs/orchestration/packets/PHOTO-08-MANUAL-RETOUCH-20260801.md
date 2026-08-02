# Packet PHOTO-08-MANUAL-RETOUCH-20260801

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "PHOTO-08-MANUAL-RETOUCH-20260801",
  "candidate_id": "PHOTO-08-MANUAL-RETOUCH-CANDIDATE-20260801-001",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "ready",
  "objective": "Create one new local #8 image candidate from the verified untouched Heros-9.jpg, using manual Clone Stamp/Healing Brush only around Blu Tack/adhesive contacts, then produce native QA proof and a local-only preview without changing any website reference.",
  "readable_paths": [
    "Downloads/wetransfer_website-hero-raws_2026-06-03_1315/Heros-9.jpg",
    "maplemoon-website/docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/08_manual_v02/08_manual_v02.psd",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/08_manual_v02/08_manual_v02.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/08_manual_v02/qa/08_manual_v02-full-frame.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/08_manual_v02/qa/08_manual_v02-native-100pct.png",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/08_manual_v02/photo-08-v02-local-preview.html",
    "maplemoon-website/docs/orchestration/reviews/PHOTO-08-MANUAL-RETOUCH-20260801.json"
  ],
  "base": {
    "source_path": "Downloads/wetransfer_website-hero-raws_2026-06-03_1315/Heros-9.jpg",
    "source_sha256": "73a847fb710e864167e682a171122b55d4093267afd8cab9041cca490ef47170",
    "candidate_rule": "new v02 candidate only; never overwrite source, live, H212 or prior saved retouches"
  },
  "method": [
    "Manual Clone Stamp/Healing Brush only around Blu Tack/adhesive",
    "Preserve moon, rock, product contours, contact shadow, texture, silhouettes and grain",
    "Full-frame and native 100 percent QA before local preview"
  ],
  "non_goals": [
    "#24, #63, #73 or #74",
    "Generative Fill, algorithmic repair or invented pixels on protected subjects",
    "Any website WIP or derived-package reference swap",
    "Upload, publish, deploy, commit, push, client contact, Shopify, WooCommerce or production action"
  ],
  "verify": [
    "phase-start gate passes before candidate paths are written",
    "candidate is visibly distinct from and does not overwrite the verified source",
    "full-frame QA proof exists",
    "native 100 percent moon/rock/product contact QA proof exists",
    "local preview loads without changing any existing page reference",
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
