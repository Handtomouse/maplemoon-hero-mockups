# Packet PHOTO-73-RAW-RECOVERY-20260801

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "PHOTO-73-RAW-RECOVERY-20260801",
  "candidate_id": "PHOTO-73-RAW-SOURCE-20260801-001",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "ready",
  "objective": "Recover the exact Heros-73.jpg entry from the original local WeTransfer ZIP into a new protected workspace source path, prove byte identity and provenance, and resolve the historical #73 source-lineage block without opening Photoshop or changing any image candidate or website reference.",
  "readable_paths": [
    "Downloads/wetransfer_website-hero-raws_2026-06-03_1315.zip",
    "UFC/spins/maplemoon_three_round_blue_warm_20260723/round_01/warm_review/maplemoon_heros73_photoshop_reference.jpg",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260731/RAW_MASTER_REGISTER.md",
    "maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/source_recovery/photoshoot_raws_20260801/Heros-73.jpg",
    "maplemoon-website/_wip/reviews/photoshoot_repair_batch1_20260731/RAW_MASTER_REGISTER.md",
    "maplemoon-website/docs/orchestration/reviews/PHOTO-73-RAW-RECOVERY-20260801.json"
  ],
  "base": {
    "archive_path": "Downloads/wetransfer_website-hero-raws_2026-06-03_1315.zip",
    "archive_entry": "Heros-73.jpg",
    "entry_sha256": "b31b11b0aec41cb9461a74e906a84979162d34b691a27fcef72a3b153e1e6d93",
    "recovery_rule": "new protected byte-identical source copy only; never overwrite the archive, reference, live asset or any prior candidate"
  },
  "method": [
    "Test and extract only the exact Heros-73.jpg archive entry",
    "Verify SHA-256, byte size, 6000 by 4000 dimensions and sRGB profile",
    "Confirm byte identity with the known high-resolution Photoshop reference",
    "Update only the #73 row of the raw master register and write one receipt"
  ],
  "non_goals": [
    "Photoshop, masking, grading, compositing or candidate generation",
    "Any change to founders_portrait_h212.webp or an Our Story reference",
    "Upload, publish, deploy, commit, push, client contact or production action"
  ],
  "verify": [
    "phase-start gate passes before recovered source or register is written",
    "archive entry test passes",
    "recovered source SHA-256 equals the required archive-entry SHA-256",
    "recovered source is 6000 by 4000 sRGB",
    "reference SHA-256 equals the recovered source SHA-256",
    "receipt uses maplemoon-receipt/v2 and the exact worker_thread_id"
  ],
  "stop": [
    "archive entry is absent or fails integrity test",
    "entry or reference hash differs from the required hash",
    "checkpoint or phase-start verification does not pass",
    "any path outside writable_paths would change"
  ],
  "next_reviewer": "coordinator"
}
<!-- CONTROL-PLANE:END -->
