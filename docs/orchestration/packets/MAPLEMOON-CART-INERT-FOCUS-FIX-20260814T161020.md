# MapleMoon cart inert and focus-containment correction — 2026-08-14 16:10 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-CART-INERT-FOCUS-FIX-20260814T161020",
  "worker_thread_id": "/root/dedup_risk_audit",
  "state": "ready_cart_js_only",
  "objective": "Correct the independently proven cart modal failure through mock-cart.js only: make every background body branch inert while the cart is open, prevent pointer/keyboard/programmatic focus escape, and restore every branch's exact prior inert state on every close route.",
  "authority": "MAPLEMOON-INTEGRATED-HEADER-CART-CERT-20260814T155822 failed its required inert-background gate with outside_inert=0/7 and programmatic_focus_escaped=true. The seven-workstream goal authorises this narrow interaction correction; no page, header, cart arithmetic, catalogue, deployment or production change is authorised.",
  "base": {
    "candidate_root": "/Users/handtomouse/maplemoon_build_20260813",
    "mock_cart_js_sha256": "5776f8d628710970e81cf704ae0673ff69988d46952778f5624772db335b8b1a",
    "mock_cart_css_sha256": "c17deb1f972017d9790f2191360a457e54d7287730847f9f470c9de371603308",
    "mm_chrome_js_sha256": "063fe11d5f5ed5d90c724868f1ffb8f3536aed73cc2f7fb9bc6e4791eb192d18",
    "mm_chrome_css_sha256": "2d7414a8994ae11414cb269f4ca335293b409eb9da956ca3b625e716c26080ba",
    "integrated_failure_receipt": "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-INTEGRATED-HEADER-CART-CERT-20260814T155822.json",
    "integrated_failure_receipt_sha256": "78c2e183699be5483125dbc0fc8a3bd4d5274a173cc11614188b0f7893f7ee10",
    "cart_preflight_receipt": "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CART-PREFLIGHT-VERIFY-20260814T155246.json",
    "production_immutable": "7vjf2m50b",
    "production_homepage_md5": "6197879a5ca9d3ed0452773abc0bbeb4"
  },
  "page_sha256": {
    "homepage.html": "27921b2a466ccb670b2851a73043429763d3423bcaf651069e4e860dc01a78b1",
    "our-story.html": "2db31868a9791f373f156e7cdeb8261e494d1d47e9418a94c28156e213df7711",
    "carob-story.html": "4fd9ad0fabb9d60d0f391925f5a382ccfc8f705b60fca1c681f403a5cd9734bd",
    "shop.html": "f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038",
    "faq.html": "c5ce7aaf0b9b3221f34eb2928fc2ff6732fc1a915ea80144a4ade2b94011fb6e",
    "stockists.html": "4821adfe88680d4f174b7a8700c8d8a65594df2901bf3a7109d51b09040cb887",
    "pure-carob-bar.html": "015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65"
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
    "maplemoon_build_20260813/assets/design-system/mm-chrome.js",
    "maplemoon_build_20260813/assets/design-system/mm-chrome.css",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-CART-OPTION-SUBTOTAL-FIX-20260814T152958.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CART-OPTION-SUBTOTAL-FIX-20260814T152958.json",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-CART-PREFLIGHT-VERIFY-20260814T155246.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CART-PREFLIGHT-VERIFY-20260814T155246.json",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-INTEGRATED-HEADER-CART-CERT-20260814T155822.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-INTEGRATED-HEADER-CART-CERT-20260814T155822.json",
    "maplemoon-website/_wip/evidence/integrated_header_cart_cert_20260814T155822",
    "maplemoon-website/scripts/check-maplemoon-receipt.py",
    "UFC/ops/bus/maplemoon/tools_20260813/preflight_deploy.py"
  ],
  "writable_paths": [
    "maplemoon_build_20260813/mock-cart.js",
    "maplemoon-website/_wip/evidence/cart_inert_focus_fix_20260814T161020",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CART-INERT-FOCUS-FIX-20260814T161020.json"
  ],
  "implementation_contract": [
    "store the intended opener before any inert mutation; opening an already-open cart must not apply a second background state or overwrite the original return target",
    "treat only the cart overlay and cart dialog as active modal branches; for every other direct document.body child, record whether inert was already present and set inert while the dialog is open",
    "observe direct body-child additions while open and immediately inert every new non-modal branch, recording its prior state before mutation",
    "native inert is the primary pointer, keyboard and focus boundary; add a guarded focusin containment fallback that redirects any outside focus attempt to the dialog's first valid focus target without recursion",
    "on every close route disconnect any observer, disable containment, restore each recorded branch to exactly its prior inert presence, then return focus to the stored opener only if it remains connected and focusable",
    "cover X, overlay, Escape, secondary close, completed demo order and any existing programmatic close path; repeated open-close cycles must not leak inert state or event observers",
    "preserve pre-existing inert state created by the shared mobile header or any other owner; never remove an inert attribute this cart did not introduce",
    "do not add broad aria-hidden mutations to the page background; if an existing attribute must be touched, preserve and restore its exact prior value",
    "do not change dialog structure, visual styling, selected-option identity, integer-cents arithmetic, subtotal, storage schema, catalogue labels, disclosure text or no-side-effect behavior",
    "do not edit mock-cart.css, mm-chrome.js/css or any page; stop if the fix cannot remain mock-cart.js-only"
  ],
  "method": [
    "create the non-overwriting checkpoint for all three writable paths and run the phase-start gate with --root /Users/handtomouse before the first write",
    "verify all four shared base hashes, seven page hashes, the cart-preflight successor PASS and the exact integrated-failure receipt/hash",
    "inspect current cart open/close/focus paths and implement the smallest mock-cart.js-only ownership-safe inert lifecycle",
    "run a JavaScript syntax check and static probes proving an explicit open-time background capture, body-child observation, focusin containment, exact restore ordering and observer teardown",
    "serve the candidate locally and at measured 390, 900 and 1440 prove every direct background body branch is inert while open and neither pointer, Tab, Shift-Tab nor programmatic focus can escape the dialog",
    "insert a new focusable direct body child while open and prove it becomes inert immediately and cannot receive focus",
    "pre-seed at least one background branch as inert before opening; prove all non-modal branches are inert while open and the pre-seeded branch stays inert after close while cart-introduced inert is removed",
    "prove exact state restoration and opener return for X, overlay, Escape, secondary close and completed demo order, plus at least three repeated open-close cycles with no observer/listener/inert leakage",
    "exercise opening from the header cart trigger with the mobile menu closed; separately prove an already-inert branch owned by the header is not claimed or cleared by the cart",
    "rerun the complete prior option/subtotal matrix: nondefault Moon/Banana/Eclipse, two options of one product, exact integer-cents lines/subtotal, quantity/remove/empty/bag, reload/cross-route/fresh/corrupt/legacy session state and no cookie/localStorage/network/navigation/order/payment/email side effects",
    "prove dialog semantics, initial focus, 44px controls, 200 percent zoom containment, zero horizontal overflow and zero console/page/request/image errors",
    "capture nonblank 390/900/1440 screenshots plus machine-readable inert ownership, focus-attempt, restore and cart-regression traces",
    "run the exact UFC local preflight and record its literal output",
    "prove all seven HTML files, mock-cart.css and mm-chrome.js/css retain exact base hashes",
    "read-only prove production remains immutable 7vjf2m50b / Ready and homepage MD5 6197879a5ca9d3ed0452773abc0bbeb4",
    "write the receipt and run completion then promotion gates; no deployment is authorised"
  ],
  "verify": [
    "only mock-cart.js, the exact evidence directory and receipt changed",
    "all current and dynamically inserted non-modal body branches are inert while open; programmatic focus stays inside",
    "pre-existing inert ownership is preserved and cart-owned inert is restored exactly on every close path and repeated cycle",
    "all prior option, integer-cents, subtotal, storage, no-side-effect, keyboard, target, zoom, overflow, runtime, request and image checks pass unchanged",
    "all seven page files, mock-cart.css and mm-chrome.js/css retain exact base hashes",
    "the exact UFC preflight exits 0 with the established literal PASS verdict",
    "production immutable target and frozen homepage MD5 remain unchanged",
    "completion and promotion receipt gates pass"
  ],
  "stop": [
    "a base hash, predecessor gate/receipt, integrated-failure receipt/hash or production freeze fails",
    "the behavior cannot be corrected within mock-cart.js alone",
    "any current or inserted background branch remains interactive/focusable while open",
    "any pre-existing inert state is cleared or a cart-introduced inert state remains after close",
    "any prior cart arithmetic, identity, storage, disclosure, side-effect, keyboard, target, zoom, overflow, runtime, request, image or preflight gate regresses",
    "a path outside writable_paths changes",
    "deploy, production mutation, real checkout, commit, push, delete, stash, gitignore or client contact is requested"
  ],
  "forbidden_actions": [
    "edit mock-cart.css, mm-chrome.js/css or any page/source/media file other than mock-cart.js",
    "change catalogue facts, cart arithmetic/content, header behavior, imagery, styling or checkout capability",
    "deploy, promote, alias, alter protection, move production, commit, push, delete, stash, gitignore or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS then independent integrated certification R2",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Scope note

This packet repairs one independently reproduced modal-boundary failure. It does not authorize a cart redesign, commerce expansion, page edit, deployment or production movement.
