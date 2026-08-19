# MapleMoon native 200% browser-zoom audit — 2026-08-14 17:44 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-NATIVE-200-ZOOM-AUDIT-20260814T174412",
  "worker_thread_id": "/root/recertify_updated_preview",
  "state": "ready_read_only_isolated_browser_audit",
  "objective": "Close the remaining native 200 percent browser-zoom evidence gap on the exact certified seven-route candidate using an isolated Chrome profile, proving genuine browser zoom rather than viewport or CSS emulation and making no candidate or deployment change.",
  "authority": "The integrated header/cart certification and certified private preview are PASS. The v0.1.7 Styles Kit intake correctly reported native 200 percent zoom UNKNOWN because its automation interface could not set browser zoom. The seven-workstream interaction/release gate still requires an honest native-zoom result; this successor supplies evidence only.",
  "base": {
    "candidate_root": "/Users/handtomouse/maplemoon_build_20260813",
    "integrated_cert_receipt_sha256": "9eb39d99d6d3504db2d3e798bbd6b1c1941b40127f2c152bd028edb844077695",
    "preview_receipt_sha256": "e6610d6e4c0b51f3770b5361948693e3bd5006dd8805470e498f7c47007c9bda",
    "certified_preview": "https://maplemoonbuild20260813-28up3uqbm-handtomouses-projects.vercel.app",
    "certified_preview_deployment": "dpl_4okANTnDW3BkRCp3SehpVyzgdyfc",
    "production_immutable_token": "7vjf2m50b",
    "mm_chrome_js_sha256": "063fe11d5f5ed5d90c724868f1ffb8f3536aed73cc2f7fb9bc6e4791eb192d18",
    "mm_chrome_css_sha256": "2d7414a8994ae11414cb269f4ca335293b409eb9da956ca3b625e716c26080ba",
    "mock_cart_js_sha256": "36fb46b05a46ecf1c770991c6b9cf2eb8c08fda361c7176d37df081668f123aa",
    "mock_cart_css_sha256": "c17deb1f972017d9790f2191360a457e54d7287730847f9f470c9de371603308"
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
    "maplemoon_build_20260813/assets/design-system/mm-chrome.js",
    "maplemoon_build_20260813/assets/design-system/mm-chrome.css",
    "maplemoon_build_20260813/mock-cart.js",
    "maplemoon_build_20260813/mock-cart.css",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-INTEGRATED-HEADER-CART-CERT-R2-20260814T163003.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-INTEGRATED-HEADER-CART-CERT-R2-20260814T163003.json",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-CERTIFIED-PREVIEW-DEPLOY-20260814T165853.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CERTIFIED-PREVIEW-DEPLOY-20260814T165853.json",
    "maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/native_200_zoom_audit_20260814T174412",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATIVE-200-ZOOM-AUDIT-20260814T174412.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATIVE-200-ZOOM-AUDIT-20260814T174412.json"
  ],
  "method": [
    "create a timestamped non-overwriting checkpoint for the exact three writable outputs and pass phase-start with --root /Users/handtomouse before the first write",
    "verify all pinned candidate and predecessor hashes at acquisition and close",
    "serve the exact candidate locally and launch a separate headed Chrome process with a fresh mktemp user-data directory, unique remote-debugging port and recorded exact PID; never attach to or alter any existing Chrome profile/window",
    "use native browser UI keyboard commands only on the demonstrably isolated front window: reset with Command-0, record the 100 percent baseline, then apply the exact Chrome zoom increments to 200 percent; do not use CSS zoom, viewport scale, device emulation or page-scale substitution",
    "prove native 200 percent by unchanged outer bounds plus a twofold devicePixelRatio ratio and approximately halved CSS inner width versus the 100 percent baseline; run a 175 percent positive control that the 200 percent detector rejects, then restore and re-prove 200 percent",
    "use the isolated browser's own window-bounds API only to reach measured effective CSS inner widths of exactly 390 and 720 while page zoom remains proved at 200 percent; record outer bounds, inner width, DPR and visualViewport metrics for every capture",
    "at both effective widths, load all seven routes and require status 200, clientWidth equals scrollWidth equals innerWidth, nonblank paint, complete/nonbroken authored images, zero page/console/request failures and no fixed-header paint-through",
    "at effective 390 on every route, prove closed navigation, open full-width navigation, six 44 CSS-pixel rows, row-centre paint-order hits, keyboard focus trap, Escape close and opener restoration; preserve the existing reduced-motion behavior",
    "at effective 390 exercise cart open/close on every route: background inert containment, overlay pointer blocking, Escape and explicit-close focus restoration, no observer/listener accumulation and no horizontal overflow; on Shop also preserve option/subtotal arithmetic and storage behavior",
    "capture nonblank full-page screenshots for all seven routes at both effective widths plus representative open-menu and open-cart states; visually inspect for clipped text, overlapping controls, lost content, unreadable notices and off-canvas UI",
    "close only the exact isolated Chrome PID and local server PID and leave the temporary profile path recorded for recoverability; do not touch the user's Chrome state",
    "write the review and receipt and run completion then promotion gates; no deploy is authorised"
  ],
  "verify": [
    "the 200 percent proof is native and quantitatively distinct from 100 and 175 percent",
    "all seven routes pass at effective measured 390 and 720 with page zoom held at 200 percent",
    "navigation, cart, focus, inertness, paint order, reduced motion, overflow and Shop arithmetic remain correct",
    "all screenshots are nonblank and visual inspection reports no clipping, overlap or lost content",
    "the isolated profile and exact spawned processes never alter the user's Chrome profile or existing window state",
    "candidate, predecessor and production baseline hashes remain unchanged",
    "only the exact evidence directory, review and receipt change",
    "completion and promotion gates pass"
  ],
  "stop": [
    "the isolated Chrome instance cannot be uniquely identified and targeted without risking the user's existing browser state",
    "the measured 200 percent proof is unavailable or could be explained by viewport/device/CSS emulation",
    "a pinned hash changes or a required runtime, visual, positive-control or process-isolation check fails",
    "a candidate/source/media/Styles Kit edit, deploy, production mutation, commit, push, delete, stash, gitignore or client contact would be needed",
    "a path outside writable_paths changes"
  ],
  "forbidden_actions": [
    "attach to, focus, resize, navigate, zoom, close or modify the user's existing Chrome profile/window",
    "substitute CSS zoom, pinch/page scale, viewport scaling or device emulation for native browser zoom",
    "edit any candidate/site/build/source/media/Styles Kit file or prior evidence",
    "deploy, promote, alias, alter protection, move production, commit, push, delete, stash, gitignore or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS; if PASS, preserve as the native-zoom release-boundary evidence for the unchanged certified candidate",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Boundary

This packet closes an evidence gap only. It cannot change the candidate, preview, production or the user's browser state.
