# MapleMoon commerce and form interaction audit — 2026-08-14 15:07 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-COMMERCE-INTERACTION-AUDIT-20260814T150722",
  "worker_thread_id": "/root/dedup_risk_audit",
  "state": "ready_read_only",
  "objective": "Independently audit the immutable corrected-FAQ preview's private-demo cart, catalogue availability controls, newsletter forms and storage/network truth without changing the candidate, deployment or production.",
  "authority": "The seven-workstream goal explicitly includes interaction and commerce QA. This phase is evidence-only and excludes shared-header scroll/navigation behaviour, which is owned by MAPLEMOON-MOBILE-HEADER-RUNTIME-20260814T150338.",
  "base": {
    "immutable_preview": "https://maplemoonbuild20260813-krftm36lg-handtomouses-projects.vercel.app",
    "preview_deployment": "dpl_6gGEYQfUuXZPYGLaasVDEo9KZrQD",
    "preview_receipt": "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-FAQ-CORRECTED-PREVIEW-20260814T145952.json",
    "mock_cart_js_sha256": "5eea3ac3c707964f878b5221c0f001902dc4f6c84d56457fac1455a4e1844816",
    "mock_cart_css_sha256": "0ebf64caa50e0650778e3bbb84718d0bb9dd716531c02fbd4ee01c9c5cf1df7c",
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
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-FAQ-CORRECTED-PREVIEW-20260814T145952.json",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CONTENT-CATALOGUE-TRUTH-20260814T145247.md",
    "maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/commerce_interaction_audit_20260814T150722",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-COMMERCE-INTERACTION-AUDIT-20260814T150722.json"
  ],
  "method": [
    "create the non-overwriting checkpoint and run the phase-start gate with --root /Users/handtomouse before the first evidence or receipt write",
    "verify the corrected-preview receipt at completion and promotion and verify the preview deployment ID, target preview, Ready status and production freeze",
    "use authenticated Vercel reads to acquire a byte-exact local snapshot of the immutable preview routes and the assets required for Shop/cart/form runtime; keep the snapshot inside the exact evidence directory",
    "prove the snapshot mock-cart.js and mock-cart.css hashes match the packet and prove the acquired route hashes match the preview receipt",
    "statically audit mock-cart.js for storage, cookie, network, order, payment, checkout and form-submission paths; every absence claim must have a positive control proving the probe detects the construct",
    "serve only the acquired immutable snapshot locally and run browser tests at measured 390, 900 and 1440 CSS px; do not read changing candidate bytes during runtime",
    "in clean Shop mode prove the catalogue-preview/no-checkout disclosure is visible before interaction and remains available while the cart is used",
    "for available and unavailable product controls prove truthful enablement, accessible names, 44px targets, exact item identity/price capture, add, increment, decrement, remove, empty state, bag count and subtotal arithmetic",
    "prove sessionStorage persists within one origin/session across route navigation and reload, a fresh browser context starts empty, corrupt stored JSON fails safely, and cart operations create no localStorage or cookie state",
    "prove cart dialog semantics, initial focus, Tab/Shift-Tab containment, Escape close, opener focus return, overlay close, background inertness and 200 percent zoom containment",
    "prove there is no working checkout/order/payment action and that the interface states checkout/orders are not connected before a user could mistake it for commerce",
    "exercise every email form with invalid and valid input: invalid submission is blocked; valid submission makes no request, clears the field, focuses a polite status and explicitly says the email was not saved",
    "instrument fetch, XMLHttpRequest, WebSocket, sendBeacon, form submission, window.open and navigation changes; trigger safe local positive controls for each relevant detector before asserting cart/form actions caused no external side effect",
    "scan clean-mode visible text for internal review/status vocabulary while preserving the explicit customer-facing preview disclosures",
    "capture nonblank representative screenshots and machine-readable result/trace files",
    "write the receipt and run completion then promotion gates"
  ],
  "verify": [
    "the audit runs only against a hash-verified immutable preview snapshot, not changing candidate bytes",
    "cart and email forms have no real order/payment/email/network side effect and the positive controls prove detection coverage",
    "the private-demo disclosure is visible before action and accurately describes session-only/no-checkout behaviour",
    "available/unavailable controls, identity, prices, quantity, subtotal, remove, empty state and bag count are correct",
    "storage is sessionStorage-only, survives same-session route/reload, starts empty in a fresh context and handles corrupt state safely",
    "dialog, focus, inertness, keyboard, 44px targets and 200 percent zoom pass at measured 390, 900 and 1440",
    "all tested route/assets are 200, no horizontal overflow, and zero page/console/request/image errors beyond deliberate negative controls",
    "production immutable target and frozen homepage MD5 remain unchanged",
    "no website, candidate, deployment, repository source or external client state changes",
    "completion and promotion receipt gates pass"
  ],
  "stop": [
    "the preview receipt/gate, deployment identity, snapshot hash or production freeze fails",
    "the test would read a changing shared-header file rather than the immutable snapshot",
    "a cart/form action produces an external request, navigation, cookie, localStorage, order, payment or email side effect",
    "a disclosure, arithmetic, storage, keyboard, focus, target-size, zoom, runtime or visible-truth check fails",
    "a website/candidate/deployment/source fix would be required; record HOLD rather than edit",
    "any path outside writable_paths changes"
  ],
  "forbidden_actions": [
    "edit any candidate, website, build, deployment or source file",
    "change the mobile header or navigation scope",
    "submit a real order, payment, email, form or client message",
    "deploy, promote, move production, alter protection, commit, push, delete, stash or gitignore"
  ],
  "next_reviewer": "MapleMoon BOSS",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Independence note

The immutable snapshot is required because the shared-header worker may change the live candidate during this audit. Header-scroll results are expressly out of scope and must not be inferred from this evidence.
