# Packet PHOTO-24-SAVE-RECOVERY-20260801

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "PHOTO-24-SAVE-RECOVERY-20260801",
  "candidate_id": "PHOTO-24-RECOVERED-EDIT-20260801-001",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "ready",
  "objective": "Preserve the accidentally source-saved #24 edit as a new review JPEG, then restore Heros-24.jpg byte-for-byte from the original WeTransfer ZIP without losing the user's repair work.",
  "readable_paths": [
    "Downloads/wetransfer_website-hero-raws_2026-06-03_1315.zip",
    "maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "Downloads/wetransfer_website-hero-raws_2026-06-03_1315/Heros-24.jpg",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260801/24_manual_v01/24_manual_v01_recovered_from_source.jpg",
    "maplemoon-website/docs/orchestration/reviews/PHOTO-24-SAVE-RECOVERY-20260801.json"
  ],
  "base": {
    "altered_source_sha256": "6e1a3c198ad34392fe4f745382348b06c4ad0f0458bb7d1f240679db8e7bb809",
    "archive_original_sha256": "6b0373e490e1270d6b327e5f505aff2b2453c57c20884c741da2fe17afedc86e",
    "recovery_rule": "copy the altered file first; verify the copy; only then restore the source from the exact ZIP entry"
  },
  "method": [
    "Checkpoint the altered source and absent recovery candidate before writing",
    "Copy the altered JPEG byte-for-byte to the new review path",
    "Verify the recovery copy hash equals the altered-source hash",
    "Restore only Heros-24.jpg from the original ZIP entry",
    "Verify the restored source hash equals the required archive-original hash"
  ],
  "non_goals": [
    "Any additional retouch, Photoshop operation, candidate approval or website change",
    "Upload, publish, deploy, commit, push, client contact or production action"
  ],
  "verify": [
    "phase-start gate passes before recovery writes",
    "recovered review JPEG remains 4000 by 6000 sRGB and has the altered-source hash",
    "restored source remains 4000 by 6000 sRGB and has the archive-original hash",
    "receipt uses maplemoon-receipt/v2 and the exact worker_thread_id"
  ],
  "stop": [
    "checkpoint or phase-start verification does not pass",
    "recovery copy hash differs from the altered-source hash",
    "archive entry test or restored-source hash fails",
    "any path outside writable_paths would change"
  ],
  "next_reviewer": "coordinator"
}
<!-- CONTROL-PLANE:END -->
