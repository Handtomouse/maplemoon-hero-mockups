# Packet SAT-SHARED-CART-CLOSED-FOCUS-01

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "SAT-SHARED-CART-CLOSED-FOCUS-01",
  "candidate_id": "SAT-SHARED-CART-CLOSED-FOCUS-CANDIDATE-20260801-001",
  "parent_candidate_id": "SAT-SHOP-F-RECONCILE-CANDIDATE-20260801-001",
  "worker_thread_id": "019fb5b5-786d-7653-acbe-0bfeb81f3b3d",
  "phase": "SAT-WALKTHROUGH-READINESS",
  "state": "ready",
  "approval_class": "mutating-local-review",
  "cluster_id": "SAT-SHARED-CART-CLOSED-FOCUS",
  "requires_visual_evidence": true,
  "objective": "Remove closed shared-cart descendants from sequential keyboard focus while preserving the open focus trap, Enter and Space behavior, Escape focus restoration, local mock checkout and no-network review safety.",
  "user_decisions": [
    "Nate said go after approving the walkthrough-readiness sequence that begins with the known closed-cart keyboard-focus blocker.",
    "The coordinator admitted SAT-SHARED-CART-CLOSED-FOCUS-01 as the only current correction lane.",
    "No page design, copy, catalogue, imagery, commerce facts, canonical WIP or external surface may change."
  ],
  "readable_paths": [
    "docs/plans/2026-07-31-maplemoon-saturday-delivery-gsd-plan.md",
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "docs/orchestration/LOCK_MANIFEST.json",
    "docs/orchestration/packets/SAT-SHOP-F-RECONCILE-01.md",
    "docs/orchestration/reviews/SAT-SHOP-F-RECONCILE-01-20260801.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/shop.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/shop.html",
    "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.css"
  ],
  "writable_paths": [
    "docs/orchestration/packets/SAT-SHARED-CART-CLOSED-FOCUS-01.md",
    "docs/orchestration/reviews/SAT-SHARED-CART-CLOSED-FOCUS-01-20260801.json",
    "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.js",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/mock-cart.js",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/mock-cart.js",
    "scripts/check-maplemoon-cart.mjs",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/MANIFEST.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/MANIFEST.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/MANIFEST.json",
    "_wip/reviews/sat_shared_cart_closed_focus_20260801/qa/browser-evidence.json"
  ],
  "base": {
    "branch": "codex-maplemoon-section-review",
    "head": "d65047b6a7431af955ad0cd5b57c42f7a9367225",
    "shared_mock_cart_sha256": "8f9de9995402679957bdbcaba3041e00c5fca6d24c523bf7bb666046a86259f9",
    "clean_mock_cart_sha256": "8f9de9995402679957bdbcaba3041e00c5fca6d24c523bf7bb666046a86259f9",
    "annotated_mock_cart_sha256": "8f9de9995402679957bdbcaba3041e00c5fca6d24c523bf7bb666046a86259f9",
    "cart_checker_sha256": "db3cc2e6b16224124e4f53880a7d8910e31a196ae49cac2a2def814463b39cab",
    "aggregate_manifest_sha256": "87578e293c2d80eb277050f354585547a513bbc8ad6c92c6cf7dc73bd62c5021",
    "clean_manifest_sha256": "3f6250b2452b46115475bf6d8b2b6f8379d0ba03d883a0586b588f050da7667c",
    "annotated_manifest_sha256": "edd3ec9ee1a8cee93c06138c73d157e4d8d6583a40dd509bdced76f4e3753866"
  },
  "action": "Apply the smallest shared-cart closed-state focus correction, synchronize its two generated copies and three manifests, add a regression assertion, and capture local keyboard evidence.",
  "verify": [
    "phase-start ownership, hashes and non-overwriting recovery checkpoint pass before cart behavior changes",
    "closed cart descendants are absent from sequential Tab and Shift+Tab focus",
    "opening the cart enables its controls and preserves the complete focus trap",
    "Enter and Space actions, Escape close and focus restoration remain intact",
    "cart drawer to fake checkout to local confirmation remains review-only and performs no network or commerce submission",
    "Saturday package checker, cart checker and git diff check pass",
    "page HTML, canonical WIP, Variant F structure, copy, catalogue, imagery and A-G evidence remain unchanged"
  ],
  "done": "One hash-bound local review candidate fixes the proven shared-cart keyboard defect and is ready for independent verification; literal 200 percent review remains a separate Nate-owned gate.",
  "stop": [
    "a base hash, ownership or recovery gate mismatches",
    "another writer owns an admitted path",
    "page HTML, canonical WIP, copy, catalogue, imagery, Variant F structure or A-G evidence would change",
    "open focus trap, Escape restoration, cart journey or no-network safety regresses",
    "a path outside writable_paths would change",
    "any commit, push, deploy, publish, send, upload, Shopify, WooCommerce or production action is requested"
  ],
  "next_reviewer": "Coordinator 019fa858-05c9-7631-b26e-8f5cbbf1387a, then Nate"
}
<!-- CONTROL-PLANE:END -->

No external action or automatic promotion is authorized by this packet.
