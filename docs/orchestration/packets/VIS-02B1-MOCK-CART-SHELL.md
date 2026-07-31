# Packet VIS-02B1 - Realistic Local Review Cart

**Packet ID:** `VIS-02B1-MOCK-CART-SHELL`  
**Candidate authority:** `CTRL-V2-CANDIDATE-20260730-001`  
**Cluster:** `VIS-02B1-DERIVED-REVIEW-SHELL`  
**State:** `needs_review`  
**Approval class:** `mutating-local-derived-review`  
**Owner:** Codex  
**Final decision owner:** Nate

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "VIS-02B1-MOCK-CART-SHELL",
  "candidate_id": "CTRL-V2-CANDIDATE-20260730-001",
  "phase": "VIS-02",
  "state": "needs_review",
  "approval_class": "mutating-local-derived-review",
  "cluster_id": "VIS-02B1-DERIVED-REVIEW-SHELL",
  "objective": "Create and verify a realistic local review cart across all six derived pages, binding only the existing rendered review-card facts while applying Nate-approved pending-product treatment, clean-review exclusions and local fake newsletter behavior.",
  "non_goals": [
    "canonical WIP, theme, Shopify or production storefront edits",
    "accepting the rendered review catalogue as authoritative CAT-01 evidence",
    "creating or changing product, price, availability, shipping, tax or selling-option facts",
    "public claim replacement",
    "catalogue-source acceptance or mutation",
    "client contact, send, upload, publication, deployment, commit or push"
  ],
  "readable_paths": [
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "_wip/shop.WIP.html",
    "_wip/our-story.WIP.html",
    "_wip/carob-story.WIP.html",
    "_wip/stockists.WIP.html",
    "_wip/faq.WIP.html",
    "docs/client-review/2026-08-01-saturday-review/prototypes/mock-cart-checkout-v1.html",
    "docs/client-review/2026-07-29-carli-review/staging-v1",
    "docs/orchestration/approvals/NATE-VIS-02B1-SATURDAY-DECISIONS-20260731.json",
    "docs/orchestration/approvals/NATE-VIS-02B1-REALISTIC-CART-AMENDMENT-20260731.json"
  ],
  "writable_paths": [
    "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.css",
    "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.js",
    "scripts/build-maplemoon-saturday-review.py",
    "scripts/check-maplemoon-review.py",
    "scripts/check-maplemoon-cart.mjs",
    "package.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1",
    "docs/orchestration/reviews/VIS-02B1-MOCK-CART-SHELL-QA.md",
    "docs/orchestration/reviews/VIS-02B1-REALISTIC-CART-QA.md",
    "docs/orchestration/reviews/CARLI-CLAIMS-REPLACEMENT-OPTIONS-20260731.md",
    "docs/orchestration/SATURDAY_FEEDBACK_REGISTER_20260801.md",
    "docs/orchestration/SATURDAY_REVIEW_ACCEPTANCE_20260801.md",
    "docs/orchestration/LIVE_PACKET_REGISTER_20260730.md",
    "docs/orchestration/LOCK_MANIFEST.json",
    "docs/orchestration/packets/VIS-02B1-MOCK-CART-SHELL.md"
  ],
  "base": {
    "branch": "codex-maplemoon-section-review",
    "head": "a6cd91a589ceff18283e4c6250ac256fe97812a4",
    "canonical_wip_sha256": {
      "_wip/homepage_real_1_lead_photo.WIP.html": "891311f1ab1ea7f675183ed28db7be4bce87e6e690041cbd4d0b95f2651e2eaa",
      "_wip/shop.WIP.html": "b11f0eec60ee0a6c0927c0657171cf12044c1aa7f2a781d84a87eb843a6735d0",
      "_wip/our-story.WIP.html": "17b77bc83930a6ad4ef5834427bdeed5ff6672a8001328259aa84e7a98e06304",
      "_wip/carob-story.WIP.html": "cdc426a6a19d8012f9198584842766ed0ee7400d7f93a4642d9bb3db972216c7",
      "_wip/stockists.WIP.html": "257662784dfb31792c1604ff7821cb16abdc78281a681311f518498ab8a6e8ce",
      "_wip/faq.WIP.html": "4a7f5eee7096150f23f07cac6316c83893aab34135e3c40ca0e24848b77704f1"
    },
    "implementation_sha256": {
      "scripts/build-maplemoon-saturday-review.py": "61b3e3cec0caf5dc79d3c0e318c984a1fadcdbbecb0a7b1ad4b00060e3cd9ab2",
      "scripts/check-maplemoon-review.py": "f57bf34770124381cfc8e6a81a544c7b0fa4c79a594e27ea57f6909637d2b262",
      "package.json": "985e2ac60335552c00b8e3a61eb398b244d12280d037e2a76587107789bd9257",
      "docs/client-review/2026-08-01-saturday-review/staging-v1/MANIFEST.json": "4c0b02b8b861d40502188f6c4e77dbab966a07509d48d0f31087ca305034e9cb"
    }
  },
  "dependencies": [
    "NATE-VIS-02B1-SATURDAY-DECISIONS-20260731",
    "NATE-VIS-02B1-REALISTIC-CART-AMENDMENT-20260731",
    "VIS-02A-HOMEPAGE-TECHNICAL accepted",
    "approved mock cart prototype efc59be4e5612b77a7f1c0493d6cf3a3789448217a7b953acfeba946ab082d14"
  ],
  "action": "Activate the review cart on ordinary clean and annotated routes; convert the 20 non-pending rendered product actions to Add to cart; derive each cart item's name, image, size and displayed price from its current card; hide the two pending Moon products from clean and keep them unavailable in annotated; preserve per-tab state across six pages; provide accessible drawer and mobile sheet behavior; retain fake checkout and local newsletter thank-you behavior.",
  "verify": [
    "canonical WIP hashes unchanged",
    "ordinary clean and annotated routes expose the existing header cart and local drawer",
    "Shop exposes exactly 20 Add to cart controls and no Ask about this item links after runtime initialization",
    "clean hides the two pending Moon products and reports 20 products",
    "annotated preserves the two pending Moon products as unavailable and reports 22 products",
    "cart item name, image, size and displayed price match the selected review card",
    "quantity persists across pages in one tab",
    "fake checkout completes without collecting personal or payment data",
    "Escape closes and restores focus",
    "44px targets, reduced motion and no overflow pass at 390, 430, 1024 and 1440 pixels",
    "newsletter discards the entered address and confirms it was not saved",
    "clean Homepage and Stockists hide agreed consent and provisional evidence while annotated preserves it",
    "builder, checker, cart checker, deterministic double-build and git diff --check pass"
  ],
  "done": "The realistic derived review cart and resolved clean-review treatments are implemented and independently visible in the local browser; packet remains needs_review and the package remains share_ready false.",
  "stop": [
    "new or changed catalogue, price, availability, shipping, tax or selling-option data would be required",
    "canonical WIP or external-system mutation would be required",
    "any client contact, send, upload, deployment, commit, push, Shopify, WooCommerce, Vercel or production action is requested"
  ],
  "next_reviewer": "Nate"
}
<!-- CONTROL-PLANE:END -->

## Disposition

This is the executable child of the superseded parent `VIS-02B-MOCK-CART-ROLLOUT`. Nate's later realistic-cart amendment supersedes the earlier query-gated visibility decision. The cart uses facts already rendered in the derived review cards; it does not accept those facts as CAT-01 commerce authority.
