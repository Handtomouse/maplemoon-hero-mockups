# Packet GOV-RECEIPT-SELF-HASH-01

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "GOV-RECEIPT-SELF-HASH-01",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "phase": "SAT-CLOSURE-GOVERNANCE",
  "state": "needs_review",
  "approval_class": "mutating-local-governance",
  "requires_visual_evidence": false,
  "objective": "Repair the receipt gate's self-hash defect so a receipt can accurately report its own pre-state as absent and its deliberately unhashable final self-state as null without weakening any other scope, recovery or hash check.",
  "readable_paths": [
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "scripts/check-maplemoon-receipt.py",
    "docs/orchestration/packets/GOV-RECEIPT-SELF-HASH-01.md",
    "docs/orchestration/reviews/GOV-RECEIPT-SELF-HASH-01-20260801.json"
  ],
  "base": {
    "branch": "codex-maplemoon-section-review",
    "head": "d65047b6a7431af955ad0cd5b57c42f7a9367225",
    "sha256": {
      "scripts/check-maplemoon-receipt.py": "60ac89f6d8ebe162772a3c168e0e3f14562857848b9d22a45a03cf2202043fcb"
    }
  },
  "recovery": {
    "checkpoint_path": "_wip/checkpoints/GOV-RECEIPT-SELF-HASH-01_20260801_101647_AEST",
    "checkpoint_timestamp": "2026-08-01 10:16:47 AEST"
  },
  "action": "Pass the receipt path into validation, exempt only that exact path from impossible final self-hash equality while requiring its pre-hash and null self-post marker, and extend the self-test to reproduce this case.",
  "verify": [
    "phase-start recovery gate passes",
    "self-test includes receipt as a writable changed path and passes",
    "the held SAT-PRODUCT-NEUTRAL-01 receipt passes complete and promote gates",
    "all non-receipt writable paths still require exact pre and post hashes",
    "git diff --check passes"
  ],
  "done": "The gate accepts an accurately declared receipt self-reference without weakening other recovery, scope or hash requirements.",
  "stop": [
    "a path other than the exact receipt receives a hash exemption",
    "the self-test or product receipt remains held",
    "any external action is requested"
  ],
  "next_reviewer": "independent deterministic verifier"
}
<!-- CONTROL-PLANE:END -->

No external action is authorized by this packet.
