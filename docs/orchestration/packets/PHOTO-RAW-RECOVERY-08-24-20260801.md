# Packet PHOTO-RAW-RECOVERY-08-24-20260801

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "PHOTO-RAW-RECOVERY-08-24-20260801",
  "worker_thread_id": "019f9c36-83e1-7941-92e5-a3b134212288",
  "state": "ready",
  "objective": "Preserve the current altered Heros-9.jpg and Heros-24.jpg in a non-overwriting recovery checkpoint, then restore only those two source paths byte-for-byte from the verified local WeTransfer ZIP.",
  "readable_paths": [
    "Downloads/wetransfer_website-hero-raws_2026-06-03_1315.zip",
    "maplemoon-website/scripts/check-maplemoon-receipt.py",
    "maplemoon-website/docs/orchestration/packets/PHOTO-RAW-RECOVERY-08-24-20260801.md"
  ],
  "writable_paths": [
    "Downloads/wetransfer_website-hero-raws_2026-06-03_1315/Heros-9.jpg",
    "Downloads/wetransfer_website-hero-raws_2026-06-03_1315/Heros-24.jpg",
    "maplemoon-website/docs/orchestration/reviews/PHOTO-RAW-RECOVERY-08-24-20260801.json"
  ],
  "recovery_checkpoint_path": "maplemoon-website/_wip/checkpoints/PHOTO-RAW-RECOVERY-08-24-20260801_20260801_051116_AEST",
  "base_sha256": {
    "Downloads/wetransfer_website-hero-raws_2026-06-03_1315/Heros-9.jpg": "380a92ddda3823bbc85faba7b802d17cb5c5c1f8af7620c65d124ff630b7a51f",
    "Downloads/wetransfer_website-hero-raws_2026-06-03_1315/Heros-24.jpg": "fcc6d0a7776c32e92d391327826e90bd17710324b1e497f1adb40c39425a82b3"
  },
  "required_post_sha256": {
    "Downloads/wetransfer_website-hero-raws_2026-06-03_1315/Heros-9.jpg": "73a847fb710e864167e682a171122b55d4093267afd8cab9041cca490ef47170",
    "Downloads/wetransfer_website-hero-raws_2026-06-03_1315/Heros-24.jpg": "6b0373e490e1270d6b327e5f505aff2b2453c57c20884c741da2fe17afedc86e"
  },
  "verify": [
    "checkpoint contains immutable copies matching both altered pre-write hashes",
    "phase-start gate passes before either source path changes",
    "only Heros-9.jpg and Heros-24.jpg are restored from exact ZIP entries",
    "restored hashes equal the required original SHA-256 values",
    "phase-complete receipt gate passes with exact pre/post hashes and changed paths"
  ],
  "stop": [
    "checkpoint or phase-start verification does not pass",
    "a current source hash differs from the recorded altered hash",
    "an archive entry hash differs from the required original hash",
    "any path outside the three admitted writable paths would change",
    "Photoshop, candidates, other photos, website files, Git, Drive, uploads, deployment or production action would be involved"
  ],
  "next_reviewer": "coordinator"
}
<!-- CONTROL-PLANE:END -->

This packet admits one bounded recovery operation. Its root is `/Users/handtomouse`. The recovery checkpoint is deliberately recorded outside `writable_paths` because a checkpoint cannot safely include its own destination in the snapshot scope.
