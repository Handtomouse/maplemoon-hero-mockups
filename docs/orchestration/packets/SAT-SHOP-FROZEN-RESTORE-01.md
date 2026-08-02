# Packet SAT-SHOP-FROZEN-RESTORE-01

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "SAT-SHOP-FROZEN-RESTORE-01",
  "candidate_id": "SAT-SHOP-FROZEN-RESTORE-CANDIDATE-20260801-001",
  "parent_candidate_id": "SAT-SHOP-F-RECONCILE-CANDIDATE-20260801-001",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "phase": "SAT-FROZEN-PACKAGE-CLOSURE",
  "state": "ready",
  "approval_class": "mutating-local-review-recovery",
  "cluster_id": "SAT-SHOP-FROZEN-INTEGRITY",
  "requires_visual_evidence": true,
  "objective": "Restore only the derived Shop pages and their three manifests to the exact hash-bound frozen candidate after an interrupted, unpromoted Shop-polish experiment caused manifest drift.",
  "user_decisions": [
    "Today's deliverable is the existing frozen six-page Saturday review package.",
    "Only critical or major closure defects may be corrected.",
    "The current Shop manifest mismatch is a critical frozen-artifact integrity failure.",
    "Photoshoot integration and new Shop polish are deferred."
  ],
  "readable_paths": [
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "docs/orchestration/reviews/SAT-SHOP-F-RECONCILE-01-20260801.json",
    "_wip/checkpoints/SAT-SHOP-POLISH-R1-STRUCTURE-20260801_20260801_221213_AEST/RECOVERY_MANIFEST.json",
    "_wip/checkpoints/SAT-SHOP-POLISH-R1-STRUCTURE-20260801_20260801_221213_AEST/files/docs/client-review/2026-08-01-saturday-review/staging-v1/clean/shop.html",
    "_wip/checkpoints/SAT-SHOP-POLISH-R1-STRUCTURE-20260801_20260801_221213_AEST/files/docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/shop.html",
    "_wip/checkpoints/SAT-SHOP-POLISH-R1-STRUCTURE-20260801_20260801_221213_AEST/files/docs/client-review/2026-08-01-saturday-review/staging-v1/MANIFEST.json",
    "_wip/checkpoints/SAT-SHOP-POLISH-R1-STRUCTURE-20260801_20260801_221213_AEST/files/docs/client-review/2026-08-01-saturday-review/staging-v1/clean/MANIFEST.json",
    "_wip/checkpoints/SAT-SHOP-POLISH-R1-STRUCTURE-20260801_20260801_221213_AEST/files/docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/MANIFEST.json"
  ],
  "writable_paths": [
    "docs/orchestration/packets/SAT-SHOP-FROZEN-RESTORE-01.md",
    "docs/orchestration/reviews/SAT-SHOP-FROZEN-RESTORE-01-20260801.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/shop.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/shop.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/MANIFEST.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/MANIFEST.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/MANIFEST.json",
    "_wip/reviews/sat_shop_frozen_restore_20260801/qa/browser-evidence.json"
  ],
  "base": {
    "branch": "codex-maplemoon-section-review",
    "head": "d65047b6a7431af955ad0cd5b57c42f7a9367225",
    "current_clean_shop_sha256": "c9dc5ccfd60faeead1010289741c399cdc5b474ce3fe479fd707e50a176720fa",
    "current_annotated_shop_sha256": "dd71b536bad8f6ac6432878d66ac9c1611d5b9b768a009f5b29cae6e1cc7da97",
    "current_aggregate_manifest_sha256": "f3c943b6c70e02e6d1e9b160e3ddc98f7d172cf4b43d02582e0b8ff1ddfc85c6",
    "current_clean_manifest_sha256": "e0ebf6a84420255dc76bfb31d21c67781ab5ee3a832692423a67e99d371650c3",
    "current_annotated_manifest_sha256": "627c202a3fa3fe3b24e89c4b9cdf926f46f9c74cabaa4b3a78aaaee3c66d1cdc"
  },
  "target": {
    "clean_shop_sha256": "43cad154be945d34006013808f2eca5eeb9676ae3e28cedafbb75faccb914abb",
    "annotated_shop_sha256": "333bc4f0b7452a6df6db799fa365be748df660797f1dff4d025d168e012dac10",
    "aggregate_manifest_sha256": "f2d24cbed1068f17d7989010a08354006f59e8dfe575346cd268f149d2b9b5e4",
    "clean_manifest_sha256": "87de0ddafdf21d8190e740f726dc51a10d4d8aefd5141c57fa7fd91df9ce3211",
    "annotated_manifest_sha256": "c4d9c678e89a7f1af5c7d3405056ff56dde246d81f624de77de3491abbaa7ec1"
  },
  "action": "After checkpointing the current unpromoted Shop-polish bytes, restore the five exact frozen files from the verified pre-polish checkpoint and perform read-only deterministic and rendered verification.",
  "verify": [
    "phase-start checkpoint and base hashes pass before restoration",
    "all five restored files exactly match the target SHA-256 values",
    "the Saturday package and mock-cart checkers pass",
    "clean Shop Variant F responds locally without console, asset or overflow failure",
    "canonical WIP, shared cart code, other five pages and photoshoot paths remain unchanged"
  ],
  "done": "The exact frozen six-page package is coherent again and remains share_ready false pending Nate's final human and audience gates.",
  "stop": [
    "a base hash, recovery checkpoint or target hash mismatches",
    "a path outside writable_paths would change",
    "another writer owns a writable path",
    "a checker or material rendered check fails",
    "any commit, push, deploy, publish, send, upload, Shopify, WooCommerce or production action is requested"
  ],
  "next_reviewer": "Nate final local review"
}
<!-- CONTROL-PLANE:END -->

This packet restores the frozen candidate only. It does not accept or delete the interrupted Shop-polish experiment.
