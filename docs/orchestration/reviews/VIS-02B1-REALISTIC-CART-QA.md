# VIS-02B1 Realistic Local Review Cart - Amendment Receipt

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-receipt/v2",
  "receipt_id": "VIS-02B1-REALISTIC-CART-RECEIPT-20260731-001",
  "packet_id": "VIS-02B1-MOCK-CART-SHELL",
  "approval_id": "NATE-VIS-02B1-REALISTIC-CART-AMENDMENT-20260731",
  "worker": "Codex",
  "started_at": "2026-07-30T16:10:00Z",
  "completed_at": "2026-07-30T16:26:15Z",
  "files_changed": [
    "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.css",
    "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.js",
    "scripts/check-maplemoon-cart.mjs",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/**",
    "docs/orchestration/approvals/NATE-VIS-02B1-REALISTIC-CART-AMENDMENT-20260731.json",
    "docs/orchestration/packets/VIS-02B1-MOCK-CART-SHELL.md",
    "docs/orchestration/reviews/VIS-02B1-REALISTIC-CART-QA.md",
    "docs/orchestration/LIVE_PACKET_REGISTER_20260730.md",
    "docs/orchestration/SATURDAY_FEEDBACK_REGISTER_20260801.md",
    "docs/orchestration/SATURDAY_REVIEW_ACCEPTANCE_20260801.md"
  ],
  "canonical_wip_sha256_after": {
    "_wip/homepage_real_1_lead_photo.WIP.html": "891311f1ab1ea7f675183ed28db7be4bce87e6e690041cbd4d0b95f2651e2eaa",
    "_wip/shop.WIP.html": "b11f0eec60ee0a6c0927c0657171cf12044c1aa7f2a781d84a87eb843a6735d0",
    "_wip/our-story.WIP.html": "17b77bc83930a6ad4ef5834427bdeed5ff6672a8001328259aa84e7a98e06304",
    "_wip/carob-story.WIP.html": "cdc426a6a19d8012f9198584842766ed0ee7400d7f93a4642d9bb3db972216c7",
    "_wip/stockists.WIP.html": "257662784dfb31792c1604ff7821cb16abdc78281a681311f518498ab8a6e8ce",
    "_wip/faq.WIP.html": "4a7f5eee7096150f23f07cac6316c83893aab34135e3c40ca0e24848b77704f1"
  },
  "implementation_sha256": {
    "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.js": "a0b99737c9e30473fb101c73f837eaef2b36f7d76c856893c31dc35ebeea8882",
    "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.css": "828c5e5c108e217d41a7fe8debc263ff6631a1cd163001ac53b82d6a687de2f4",
    "scripts/check-maplemoon-cart.mjs": "99961c2e376ff4f76d594ef9a0c725b088fb99759af7bf9eb9a7fa781d49e156",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/MANIFEST.json": "1e3d930e231b27b0c99ff5047e4f46550db2eb7cac59dde8eade07982cb039b8"
  },
  "checks": [
    {
      "command": "node --check shared/mock-cart.js and scripts/check-maplemoon-cart.mjs",
      "result": "PASS"
    },
    {
      "command": "npm run review:saturday:build",
      "result": "PASS deterministic package build"
    },
    {
      "command": "npm run review:saturday:check",
      "result": "PASS 0 failures, 0 warnings"
    },
    {
      "command": "npm run review:saturday:cart",
      "result": "PASS Add to cart binding, pending treatment, fake checkout, local form, accessibility and no-network checks"
    },
    {
      "command": "two temporary builds plus diff -qr",
      "result": "PASS byte-identical trees; aggregate manifest sha256 1e3d930e231b27b0c99ff5047e4f46550db2eb7cac59dde8eade07982cb039b8"
    },
    {
      "command": "git diff --check",
      "result": "PASS"
    },
    {
      "check": "annotated Shop runtime",
      "result": "20 Add to cart controls, 2 visible unavailable pending-Moon controls, 0 Ask about links, 22-product status"
    },
    {
      "check": "clean Shop runtime",
      "result": "20 Add to cart controls, 2 pending Moon cards hidden, 20-product status, filtered empty-Moon range hidden"
    },
    {
      "check": "desktop cart and fake checkout",
      "result": "selected name, image, 90g size and $12.95 displayed price matched the card; quantity, checkout and fake order-received state passed"
    },
    {
      "check": "cross-page persistence",
      "result": "selected Shop item remained in the existing Homepage header cart within the same tab"
    },
    {
      "check": "responsive browser matrix",
      "result": "390, 430, 1024, 1440 pixels; no horizontal overflow; drawer or mobile sheet remained in viewport; active targets measured at 44 pixels"
    }
  ],
  "failures": [],
  "unknowns": [
    "The derived card facts remain provisional until CAT-01 and VIS-02B2 accept authoritative inputs.",
    "Final six-page visual acceptance and share_ready promotion remain separate Nate decisions."
  ],
  "residual_risk": [
    "The review cart intentionally feels purchasable but cannot create an order or collect customer or payment details.",
    "Products with tiered price strings repeat the displayed string and do not invent a pack selection or subtotal.",
    "Unsupported public claim occurrences elsewhere in the review package remain separately blocked."
  ],
  "forbidden_path_changes": [],
  "proposed_next_state": "needs_review",
  "next_reviewer": "Nate"
}
<!-- CONTROL-PLANE:END -->

## Boundary

This amendment binds only facts already rendered in the derived Shop cards. It does not accept those facts as catalogue authority, change canonical WIP, or authorize any external action.
