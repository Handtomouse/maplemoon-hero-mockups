# Packet VIS-02B — Mock Cart Rollout

**Packet ID:** `VIS-02B-MOCK-CART-ROLLOUT`
**Candidate authority:** `CTRL-V2-CANDIDATE-20260730-001`
**Cluster:** `VIS-02B-SHARED-COMMERCE-CHROME`
**State:** `blocked / admitted`
**Approval class:** `mutating-local`
**Owner:** Codex
**Final decision owner:** Nate

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "VIS-02B-MOCK-CART-ROLLOUT",
  "candidate_id": "CTRL-V2-CANDIDATE-20260730-001",
  "phase": "VIS-02",
  "state": "blocked",
  "approval_class": "mutating-local",
  "cluster_id": "VIS-02B-SHARED-COMMERCE-CHROME",
  "objective": "Roll the Nate-approved mock-cart and checkout interaction into the deterministic clean and annotated Saturday review packages without editing canonical WIP or connecting to a commerce, analytics or production system.",
  "non_goals": [
    "canonical WIP, theme, Shopify or production storefront edits",
    "mobile menu, primary navigation, footer or unrelated shared-shell redesign",
    "product, price, availability, shipping, tax or selling-option invention",
    "catalogue-source mutation or acceptance by inference",
    "copy, claims, stockist, founder, testimonial, Carob chooser or section-visibility changes",
    "personal, contact, address, payment or order-data collection",
    "client contact, send, upload, publication, deployment, commit or push"
  ],
  "readable_paths": [
    "AGENTS.md",
    "_wip/AGENTS.md",
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "_wip/shop.WIP.html",
    "_wip/our-story.WIP.html",
    "_wip/carob-story.WIP.html",
    "_wip/stockists.WIP.html",
    "_wip/faq.WIP.html",
    "docs/client-review/2026-08-01-saturday-review/prototypes/mock-cart-checkout-v1.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1",
    "docs/orchestration/approvals/NATE-VIS-02B-MOCK-CART-ROLLOUT-20260731.json",
    "docs/orchestration/SATURDAY_FEEDBACK_REGISTER_20260801.md",
    "docs/orchestration/SATURDAY_REVIEW_ACCEPTANCE_20260801.md",
    "docs/orchestration/reviews/VIS-02A-HOMEPAGE-TECHNICAL-QA.md",
    "docs/orchestration/packets/VIS-02A-HOMEPAGE-TECHNICAL-HARDENING.md",
    "docs/orchestration/LIVE_PACKET_REGISTER_20260730.md",
    "docs/orchestration/LOCK_MANIFEST.json",
    "scripts/build-maplemoon-saturday-review.py",
    "scripts/check-maplemoon-review.py",
    "package.json"
  ],
  "writable_paths": [
    "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.css",
    "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.js",
    "scripts/build-maplemoon-saturday-review.py",
    "scripts/check-maplemoon-review.py",
    "scripts/check-maplemoon-cart.mjs",
    "docs/client-review/2026-08-01-saturday-review/staging-v1",
    "docs/orchestration/reviews/VIS-02B-MOCK-CART-ROLLOUT-QA.md",
    "docs/orchestration/packets/VIS-02B-MOCK-CART-ROLLOUT.md",
    "docs/orchestration/LIVE_PACKET_REGISTER_20260730.md",
    "docs/orchestration/LOCK_MANIFEST.json"
  ],
  "base": {
    "branch": "codex-maplemoon-section-review",
    "head": "a6cd91a589ceff18283e4c6250ac256fe97812a4",
    "files": [
      {
        "path": "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.css",
        "state": "absent",
        "sha256": null
      },
      {
        "path": "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.js",
        "state": "absent",
        "sha256": null
      },
      {
        "path": "scripts/build-maplemoon-saturday-review.py",
        "state": "present",
        "sha256": "61b3e3cec0caf5dc79d3c0e318c984a1fadcdbbecb0a7b1ad4b00060e3cd9ab2"
      },
      {
        "path": "scripts/check-maplemoon-review.py",
        "state": "present",
        "sha256": "f57bf34770124381cfc8e6a81a544c7b0fa4c79a594e27ea57f6909637d2b262"
      },
      {
        "path": "scripts/check-maplemoon-cart.mjs",
        "state": "absent",
        "sha256": null
      },
      {
        "path": "docs/client-review/2026-08-01-saturday-review/staging-v1/MANIFEST.json",
        "state": "present",
        "sha256": "4c0b02b8b861d40502188f6c4e77dbab966a07509d48d0f31087ca305034e9cb"
      },
      {
        "path": "docs/orchestration/LIVE_PACKET_REGISTER_20260730.md",
        "state": "present",
        "sha256": "8e42cb0b9dbf61a575d1ba0b99ba0dc3ed8bfaf5e91e4cf5018438996c383bdd"
      },
      {
        "path": "docs/orchestration/LOCK_MANIFEST.json",
        "state": "present",
        "sha256": "0075deda78d92edfb449aa3179880475b24d9b35c3ea259a9d02ebd1591adee6"
      }
    ]
  },
  "implementation_pins": {
    "approved_prototype": "docs/client-review/2026-08-01-saturday-review/prototypes/mock-cart-checkout-v1.html",
    "approved_prototype_sha256": "efc59be4e5612b77a7f1c0493d6cf3a3789448217a7b953acfeba946ab082d14",
    "canonical_wip_policy": "read-only",
    "derived_package_policy": "clean and annotated outputs are generated from one source state and receive the same cart behavior; annotated output alone receives reset and state-explanation controls",
    "product_data_policy": "deny every product, price, availability and selling option that is not present in accepted CAT provenance evidence"
  },
  "dependencies": [
    "NATE-VIS-02B-MOCK-CART-ROLLOUT-20260731",
    "VIS-02A-HOMEPAGE-TECHNICAL accepted by the coordinator",
    "CAT-01 product, price, availability and selling-option provenance accepted with no PII",
    "fresh acquisition-time hash and lock check for every writable path"
  ],
  "blockers": [
    "VIS-02A-HOMEPAGE-TECHNICAL remains needs_review in the operational register",
    "CAT-01 remains blocked because the fresh WooCommerce export and approved retail catalogue are not available as accepted local evidence"
  ],
  "sources": [
    "Nate's explicit approved for rollout decision",
    "approved local prototype raw SHA-256 efc59be4e5612b77a7f1c0493d6cf3a3789448217a7b953acfeba946ab082d14",
    "twenty-question mock-cart decision contract in the current Codex task",
    "Saturday review acceptance and feedback registers",
    "accepted CAT evidence only for commerce facts"
  ],
  "skills": [],
  "action": "Create one shared, deterministic cart stylesheet and script for the review package; copy them into both generated surfaces; expose Add to cart only on verified eligible product controls in the derived Homepage and Shop; make the cart available across all six derived pages with per-tab session storage; provide a desktop drawer, mobile bottom sheet, safe demo checkout and completion state; expose reset/state tools only in annotated mode; rebuild and verify without changing canonical WIP or performing any external request or commerce write.",
  "verify": [
    "all acquisition-time base hashes match before writing and all exact-path leases are held by one Codex writer",
    "approved prototype raw SHA-256 still matches",
    "no canonical WIP path changes",
    "clean and annotated outputs receive identical products, prices, availability, cart state and checkout behavior",
    "annotated output alone exposes reset and state-explanation controls",
    "Add to cart exists only on the derived Homepage and Shop; cart access exists on all six derived pages",
    "the cart persists across all six pages in one tab and resets with the tab session",
    "only accepted CAT entries can be purchased and unavailable accepted entries show Sold out with disabled purchasing",
    "no real personal, contact, address, payment or order data is requested, stored or transmitted",
    "no fetch, XHR, beacon, analytics, API, Shopify or WooCommerce request exists",
    "unverified shipping or tax displays Calculated in the live store without changing the verified subtotal",
    "desktop drawer and mobile bottom sheet pass at 1440, 1024, 430 and 390 pixels with no horizontal overflow",
    "keyboard path, focus trap and restoration, Escape close, visible status, 44px targets and reduced-motion behavior pass",
    "clean mode contains no prototype-only top bar, internal marker, reset control or unfinished-looking commerce control",
    "builder self-test, Saturday checker, cart checker, deterministic double-build and git diff --check pass",
    "forbidden paths and external systems show zero change"
  ],
  "done": "The accepted CAT-bound mock purchase journey works across the six generated review pages, independent verification returns needs_review, and share_ready remains false until the remaining Saturday gates pass.",
  "stop": [
    "VIS-02A is not accepted",
    "CAT provenance is missing, partial, contradictory, contains PII or does not bind every displayed commerce fact",
    "prototype, base hash or lock mismatch",
    "implementation requires canonical WIP, theme, copy, claims, catalogue-source or unrelated shared-shell edits",
    "any unverified product or amount would be displayed as purchasable",
    "any real form submission, external request, analytics or commerce-system write appears",
    "client contact, send, upload, publication, deployment, commit, push, Shopify, WooCommerce, Vercel or production action is requested"
  ],
  "next_reviewer": "Codex"
}
<!-- CONTROL-PLANE:END -->

## Admission disposition

Nate approved the interaction direction for rollout. This packet is admitted as the only future writer for the derived cart cluster, but it is not executable yet. No implementation lock is held.

## Why canonical WIP stays read-only

The Saturday cart is a review-only simulation, not the Shopify implementation. The deterministic builder is the narrowest reversible place to add identical clean and annotated behavior while preserving the current page sources and the one-writer rule.

## Unblock conditions

1. Codex accepts the completed VIS-02A technical receipt.
2. CAT-01 binds every purchasable product fact to accepted WooCommerce and retail-catalogue evidence with no PII.
3. Codex re-hashes every writable path and acquires exact unexpired leases.
4. One writer executes; independent reviewers verify before any promotion.

Until all four conditions hold, the prototype remains approved evidence and the generated Saturday package remains unchanged.
