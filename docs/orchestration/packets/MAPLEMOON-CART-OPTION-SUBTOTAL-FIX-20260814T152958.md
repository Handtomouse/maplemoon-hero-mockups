# MapleMoon cart option and subtotal correction — 2026-08-14 15:29 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-CART-OPTION-SUBTOTAL-FIX-20260814T152958",
  "worker_thread_id": "/root/dedup_risk_audit",
  "state": "ready_shared_cart_only",
  "objective": "Correct the two independently proven private-preview cart failures through mock-cart.js and mock-cart.css only: capture the exact currently selected product option/price at add time and expose exact integer-cents line totals/subtotal.",
  "authority": "MAPLEMOON-COMMERCE-INTERACTION-AUDIT-20260814T150722 returned a positive-controlled HOLD for COMMERCE-01 and COMMERCE-02. The seven-workstream goal authorises interaction/commerce corrections, but no catalogue fact, Shop markup, real checkout or production change.",
  "base": {
    "candidate_root": "/Users/handtomouse/maplemoon_build_20260813",
    "mock_cart_js_sha256": "5eea3ac3c707964f878b5221c0f001902dc4f6c84d56457fac1455a4e1844816",
    "mock_cart_css_sha256": "0ebf64caa50e0650778e3bbb84718d0bb9dd716531c02fbd4ee01c9c5cf1df7c",
    "shop_sha256": "f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038",
    "predecessor_receipt": "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-COMMERCE-INTERACTION-AUDIT-20260814T150722.json",
    "production_immutable": "7vjf2m50b",
    "production_homepage_md5": "6197879a5ca9d3ed0452773abc0bbeb4"
  },
  "readable_paths": [
    "maplemoon_build_20260813/homepage.html",
    "maplemoon_build_20260813/our-story.html",
    "maplemoon_build_20260813/carob-story.html",
    "maplemoon_build_20260813/shop.html",
    "maplemoon_build_20260813/faq.html",
    "maplemoon_build_20260813/stockists.html",
    "maplemoon_build_20260813/pure-carob-bar.html",
    "maplemoon_build_20260813/mock-cart.js",
    "maplemoon_build_20260813/mock-cart.css",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-COMMERCE-INTERACTION-AUDIT-20260814T150722.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-COMMERCE-INTERACTION-AUDIT-20260814T150722.json",
    "maplemoon-website/_wip/evidence/commerce_interaction_audit_20260814T150722/results/static-commerce-gate.json",
    "maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon_build_20260813/mock-cart.js",
    "maplemoon_build_20260813/mock-cart.css",
    "maplemoon-website/_wip/evidence/cart_option_subtotal_fix_20260814T152958",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CART-OPTION-SUBTOTAL-FIX-20260814T152958.json"
  ],
  "implementation_contract": [
    "read the current .pcard dataset.unitPrice, dataset.unitQuantity and selected .size-select option only when the user activates Add; do not snapshot a mutable selection at page startup",
    "for a selectable product, store the selected option label and exact integer unitPriceCents derived from dataset.unitPrice; reject non-finite, negative or overlarge values fail-closed",
    "different options of one product are separate stable cart lines; re-adding the same product+option increments that line only",
    "non-option products retain their current identity and price, represented internally as validated integer cents",
    "persist only sanitized id, base product identity, option label, display size, unitPriceCents, image metadata and bounded integer quantity in the existing sessionStorage key",
    "render each line's exact option label, unit price and quantity-derived line total; compute subtotal exclusively with integer cents and format as AUD dollars at display time",
    "add a visible Subtotal row with an addressable output target and include the same subtotal in the demo checkout summary; shipping remains explicitly calculated in the live store",
    "quantity increment/decrement/remove, empty state, bag count, reload and same-session route persistence remain correct",
    "legacy stored rows without valid cents fail safely or are conservatively migrated from a strict dollar-price pattern; never turn a range/from string into a fabricated exact price",
    "no Shop/page edit, catalogue number, network request, order, payment, personal-data submission or client-visible production capability is introduced"
  ],
  "method": [
    "create the non-overwriting checkpoint for all four writable paths and run the phase-start gate with --root /Users/handtomouse before the first write",
    "verify the three base hashes and predecessor HOLD receipt exactly",
    "prove by static inspection that Shop already exposes dataset.unitPrice, dataset.unitQuantity and .size-select selected option labels; stop if a Shop edit is required",
    "implement only the two shared cart files using DOM-safe text rendering and integer-cents arithmetic",
    "run a syntax check and the predecessor's four positive-controlled static probes, now requiring all constructs to pass",
    "serve the candidate locally and test at measured 390, 900 and 1440 CSS px",
    "for at least one Moon, Banana and Eclipse card change away from the default option, add it, and prove cart line identity, option label, unit price, line total and subtotal exactly equal Shop dataset/selection values",
    "add two different options of the same product and prove two independent lines; re-add one and prove only its quantity/line total changes",
    "prove mixed-item subtotal, increment, decrement, remove, empty state, bag count, reload, cross-route same-session persistence, fresh-context empty state and corrupt-storage fail-safe behavior",
    "prove dialog semantics, focus containment/return, Escape/overlay close, 44px controls, 200 percent zoom containment and zero horizontal overflow/runtime/request/image errors",
    "instrument network/storage/navigation APIs with positive controls and prove cart/checkout demo creates no external side effect, cookie or localStorage state",
    "capture nonblank screenshots and machine-readable arithmetic/state traces",
    "run the candidate's exact existing local preflight and record literal output",
    "prove production remains frozen at immutable 7vjf2m50b and homepage MD5 6197879a5ca9d3ed0452773abc0bbeb4",
    "write the receipt and run completion then promotion gates; no deployment is authorised"
  ],
  "verify": [
    "only mock-cart.js, mock-cart.css, the exact evidence directory and receipt changed",
    "all four prior static failures now pass with their positive controls",
    "selected Moon/Banana/Eclipse options enter the cart as exact distinct option lines with correct integer-cents totals",
    "visible line totals and subtotal remain exact through every quantity/remove/persistence transition",
    "the private-demo no-order/no-payment disclosure remains visible and truthful",
    "all keyboard, focus, target-size, 200 percent zoom, overflow, runtime, request, image and storage gates pass",
    "all seven pages retain exact pre-phase HTML hashes",
    "existing local preflight passes at its exact fail tiers",
    "production immutable target and frozen homepage MD5 remain unchanged",
    "completion and promotion receipt gates pass"
  ],
  "stop": [
    "a base hash, predecessor receipt or production freeze fails",
    "an exact selected option cannot be captured without editing Shop or another page",
    "arithmetic requires floating-point accumulation rather than integer cents",
    "any catalogue price/label would need to be invented or changed",
    "any runtime, arithmetic, identity, storage, keyboard, focus, target, zoom, overflow, request, image or preflight gate fails",
    "a path outside writable_paths changes",
    "deploy, production mutation, real checkout, commit, push, delete, stash, gitignore or client contact is requested"
  ],
  "forbidden_actions": [
    "edit shop.html or any of the seven page HTML files",
    "change catalogue prices, option labels, products, availability, imagery, headers or unrelated styling",
    "add real checkout/payment/order/email/personal-data behavior",
    "deploy, promote, move production, alter protection, commit, push, delete, stash, gitignore or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS then independent certification",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Scope note

This is a correction of two proven cart implementation failures. It does not approve any catalogue fact or turn the private review cart into real commerce.
