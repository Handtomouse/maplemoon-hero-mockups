# MapleMoon integrated header and cart independent certification — 2026-08-14 15:58 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-INTEGRATED-HEADER-CART-CERT-20260814T155822",
  "worker_thread_id": "/root/recertify_updated_preview",
  "state": "hold_until_cart_preflight_successor_passes",
  "objective": "Independently certify the stable integrated candidate containing the corrected FAQ, DEC-008/NAV-004 shared mobile header and exact-option/integer-subtotal private cart, without editing or deploying.",
  "authority": "The seven-workstream goal requires an independent certification owner after mutating slices. Header implementation has BOSS-validated completion/promotion PASS. Cart implementation is functionally PASS but this packet must not start until MAPLEMOON-CART-PREFLIGHT-VERIFY-20260814T155246 passes completion and promotion.",
  "base": {
    "candidate_root": "/Users/handtomouse/maplemoon_build_20260813",
    "homepage_sha256": "27921b2a466ccb670b2851a73043429763d3423bcaf651069e4e860dc01a78b1",
    "our_story_sha256": "2db31868a9791f373f156e7cdeb8261e494d1d47e9418a94c28156e213df7711",
    "carob_story_sha256": "4fd9ad0fabb9d60d0f391925f5a382ccfc8f705b60fca1c681f403a5cd9734bd",
    "shop_sha256": "f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038",
    "faq_sha256": "c5ce7aaf0b9b3221f34eb2928fc2ff6732fc1a915ea80144a4ade2b94011fb6e",
    "stockists_sha256": "4821adfe88680d4f174b7a8700c8d8a65594df2901bf3a7109d51b09040cb887",
    "pure_sha256": "015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65",
    "mock_cart_js_sha256": "5776f8d628710970e81cf704ae0673ff69988d46952778f5624772db335b8b1a",
    "mock_cart_css_sha256": "c17deb1f972017d9790f2191360a457e54d7287730847f9f470c9de371603308",
    "mm_chrome_js_sha256": "063fe11d5f5ed5d90c724868f1ffb8f3536aed73cc2f7fb9bc6e4791eb192d18",
    "mm_chrome_css_sha256": "2d7414a8994ae11414cb269f4ca335293b409eb9da956ca3b625e716c26080ba",
    "header_receipt": "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-MOBILE-HEADER-RUNTIME-20260814T150338.json",
    "cart_successor_receipt": "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CART-PREFLIGHT-VERIFY-20260814T155246.json",
    "corrected_faq_preview": "https://maplemoonbuild20260813-krftm36lg-handtomouses-projects.vercel.app",
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
    "maplemoon_build_20260813/assets",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-MOBILE-HEADER-RUNTIME-20260814T150338.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-MOBILE-HEADER-RUNTIME-20260814T150338.json",
    "maplemoon-website/_wip/evidence/mobile_header_runtime_20260814T150338",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-CART-PREFLIGHT-VERIFY-20260814T155246.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CART-PREFLIGHT-VERIFY-20260814T155246.json",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CART-OPTION-SUBTOTAL-FIX-20260814T152958.json",
    "maplemoon-website/_wip/evidence/cart_option_subtotal_fix_20260814T152958",
    "maplemoon-website/scripts/check-maplemoon-receipt.py",
    "UFC/ops/bus/maplemoon/tools_20260813/preflight_deploy.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/integrated_header_cart_cert_20260814T155822",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-INTEGRATED-HEADER-CART-CERT-20260814T155822.json"
  ],
  "method": [
    "do not begin until MAPLEMOON-CART-PREFLIGHT-VERIFY-20260814T155246 exists and its completion and promotion gates pass",
    "create the non-overwriting checkpoint and run phase-start gate with --root /Users/handtomouse before the first certification evidence/receipt write",
    "independently verify the header and cart predecessor receipts/gates plus all eleven acquisition hashes",
    "serve the stable candidate read-only and use a fresh browser harness independent of both implementation workers",
    "at measured 390 and 900 on all seven routes prove header visible at top, 23px downward jitter guard, hide at 24px intentional downward travel, reveal on first upward sample, visible on focus/menu open, full-width drawer, six 44px rows, exact paint-order hit targets, focus trap, Escape and focus return",
    "repeat all seven routes under prefers-reduced-motion: reduce and prove the header stays fixed/visible with no automatic movement",
    "at measured 1440 on all seven routes prove desktop reset with no stale mobile state",
    "on Shop at measured 390, 900 and 1440 independently exercise nondefault Moon, Banana and Eclipse options, two options of one product, exact line identities/unit prices/line totals/subtotals, quantity/remove/empty/bag count, reload/cross-route/fresh/corrupt/legacy storage and no cookie/localStorage/network/navigation/order/payment/email side effects",
    "independently verify cart dialog semantics, initial focus, Tab and Shift-Tab containment, Escape/overlay close, opener return, inert background, 44px controls and 200 percent zoom containment",
    "on FAQ at 390 and 1440 open the caffeine item and prove exact approved question/answer once, no old copy, no clipping, and drawer/header interaction remains clean",
    "on every route at 390, 900 and 1440 force authored lazy images in-view/eager and require all authored assets 200/nonblank, zero broken/pending images, zero horizontal overflow and zero console/page/request errors",
    "run exact UFC local preflight and require the established literal PASS with two review-only hits and local root waiver",
    "capture nonblank representative light/night header, reduced-motion, drawer, cart mixed subtotal and FAQ screenshots plus machine-readable traces",
    "read-only prove production remains immutable 7vjf2m50b / Ready and homepage MD5 6197879a5ca9d3ed0452773abc0bbeb4",
    "write the certification receipt and run completion then promotion gates; no deploy is authorised"
  ],
  "verify": [
    "predecessor gates and all eleven acquisition hashes match",
    "all seven routes pass integrated header/drawer/reduced-motion/desktop/reset/image/runtime/overflow matrices",
    "Shop passes exact option-line, integer-cents arithmetic, storage, focus, 44px, 200 percent zoom and no-side-effect gates",
    "FAQ exact copy and open-state rendering pass",
    "exact UFC preflight exits 0 with established literal PASS verdict",
    "evidence is nonblank and machine-readable",
    "production immutable target and frozen homepage MD5 remain unchanged",
    "no candidate/source/deployment/client path changes",
    "completion and promotion receipt gates pass"
  ],
  "stop": [
    "a predecessor gate, acquisition hash, runtime, header, drawer, cart, FAQ, image, overflow, focus, target, zoom, storage, side-effect, preflight, evidence or freeze check fails",
    "the candidate changes during certification",
    "a source/build/deployment fix would be required; stop HOLD without editing",
    "any path outside writable_paths changes",
    "deploy, production mutation, commit, push, delete, stash, gitignore or client contact is requested"
  ],
  "forbidden_actions": [
    "edit any candidate/site/build/source file",
    "deploy, promote, alias, alter protection, move production, commit, push, delete, stash, gitignore or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS for preview-only release decision",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Independence boundary

This certifier owns no implementation file and must stop on any required fix. A PASS authorizes BOSS to issue a separate preview-only deployment packet; it does not authorize production.
