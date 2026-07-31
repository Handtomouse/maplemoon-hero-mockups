# VIS-02B1 Hidden Mock Cart QA Shell - Receipt

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-receipt/v2",
  "receipt_id": "VIS-02B1-MOCK-CART-SHELL-RECEIPT-20260731-001",
  "packet_id": "VIS-02B1-MOCK-CART-SHELL",
  "worker": "Codex",
  "started_at": "2026-07-30T15:40:00Z",
  "completed_at": "2026-07-30T15:59:02Z",
  "files_changed": [
    "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.css",
    "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.js",
    "scripts/build-maplemoon-saturday-review.py",
    "scripts/check-maplemoon-review.py",
    "scripts/check-maplemoon-cart.mjs",
    "package.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/**",
    "docs/orchestration/approvals/NATE-VIS-02B1-SATURDAY-DECISIONS-20260731.json",
    "docs/orchestration/packets/VIS-02B1-MOCK-CART-SHELL.md",
    "docs/orchestration/packets/VIS-02B2-CATALOGUE-BINDING.md",
    "docs/orchestration/reviews/CARLI-CLAIMS-REPLACEMENT-OPTIONS-20260731.md",
    "docs/orchestration/reviews/VIS-02B1-MOCK-CART-SHELL-QA.md",
    "docs/orchestration/SATURDAY_FEEDBACK_REGISTER_20260801.md",
    "docs/orchestration/SATURDAY_REVIEW_ACCEPTANCE_20260801.md",
    "docs/orchestration/LIVE_PACKET_REGISTER_20260730.md",
    "docs/orchestration/LOCK_MANIFEST.json"
  ],
  "canonical_wip_sha256_after": {
    "_wip/homepage_real_1_lead_photo.WIP.html": "891311f1ab1ea7f675183ed28db7be4bce87e6e690041cbd4d0b95f2651e2eaa",
    "_wip/shop.WIP.html": "b11f0eec60ee0a6c0927c0657171cf12044c1aa7f2a781d84a87eb843a6735d0",
    "_wip/our-story.WIP.html": "17b77bc83930a6ad4ef5834427bdeed5ff6672a8001328259aa84e7a98e06304",
    "_wip/carob-story.WIP.html": "cdc426a6a19d8012f9198584842766ed0ee7400d7f93a4642d9bb3db972216c7",
    "_wip/stockists.WIP.html": "257662784dfb31792c1604ff7821cb16abdc78281a681311f518498ab8a6e8ce",
    "_wip/faq.WIP.html": "4a7f5eee7096150f23f07cac6316c83893aab34135e3c40ca0e24848b77704f1"
  },
  "checks": [
    {
      "command": "node --check shared/mock-cart.js and scripts/check-maplemoon-cart.mjs",
      "result": "PASS"
    },
    {
      "command": "python3 -B scripts/build-maplemoon-saturday-review.py --self-test",
      "result": "PASS changed pin fails before output"
    },
    {
      "command": "npm run review:saturday:check",
      "result": "PASS 0 failures, 0 warnings"
    },
    {
      "command": "npm run review:saturday:cart",
      "result": "PASS hidden gate, synthetic fixture, form, accessibility and static no-network checks"
    },
    {
      "command": "two temporary builds plus diff -qr",
      "result": "PASS byte-identical trees; aggregate manifest sha256 0c6f922162a3a662269fa6cd57c5bdfa0e67dc636ad611c85e7d8fb66c755935"
    },
    {
      "command": "git diff --check",
      "result": "PASS"
    },
    {
      "check": "in-app Browser ordinary clean Homepage",
      "result": "cart absent; testimonials and founder placeholders hidden; neutral stockist heading; stock controls hidden; newsletter discards address and reports it was not saved; no overflow"
    },
    {
      "check": "in-app Browser annotated Homepage",
      "result": "cart absent; testimonials, founder evidence and original stockist count preserved; no overflow"
    },
    {
      "check": "in-app Browser cart-qa=1 journey",
      "result": "synthetic item add, quantity, cross-page per-tab persistence, checkout preview, completion, Escape close and focus restore passed"
    },
    {
      "check": "in-app Browser responsive matrix",
      "result": "390, 430, 1024 and 1440 pixels; 44px minimum active dialog target; no overflow or broken images"
    },
    {
      "check": "in-app Browser clean Stockists and FAQ",
      "result": "neutral stockist wording, incomplete records and illustrative map hidden, local Notify me enabled, pending FAQ category hidden"
    }
  ],
  "failures": [],
  "unknowns": [
    "The shell has static no-network proof but no exported runtime request log in this receipt.",
    "Full six-page 320, 375 and 200 percent zoom review remains outside this packet."
  ],
  "residual_risk": [
    "The ordinary clean package is still not share-ready because unsupported claim occurrences and unaccepted product or pricing content remain in source-derived pages.",
    "B2 real catalogue binding remains blocked on CAT-01 accepted inputs.",
    "Consent-held testimonials and pending-founder sections are removed from clean HTML. Other non-sensitive review exclusions remain runtime treatments while annotated evidence is retained.",
    "The implementation was executed directly from Nate's current approval and its lock records are reconciled at receipt time rather than representing a pre-write held lease."
  ],
  "forbidden_path_changes": [],
  "proposed_next_state": "needs_review",
  "next_reviewer": "Nate"
}
<!-- CONTROL-PLANE:END -->

## Boundary

The B1 shell is internal QA evidence only. It is invisible unless `cart-qa=1` is present and cannot assert a product, price or order.
