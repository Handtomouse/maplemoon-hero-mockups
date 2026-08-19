# MapleMoon native 200% browser-zoom audit R2 — 2026-08-14 18:02 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-NATIVE-200-ZOOM-AUDIT-R2-20260814T180224",
  "worker_thread_id": "/root/recertify_updated_preview",
  "state": "ready_preference_driven_native_zoom_successor",
  "objective": "Prove native Chrome page zoom at 100, 175 and 200 percent without focus or UI input by launching separate isolated profiles with Chromium's own default page-zoom preference, then complete the seven-route 200 percent audit against the unchanged certified candidate.",
  "authority": "The first audit correctly stopped because a safe frontmost isolated Chrome window could not be proved. Chromium's source defines the browser preference partition.default_zoom_level, initializes HostZoomMap from it, and defines page zoom factor as pow(1.2, zoom_level). R2 uses that native profile preference before Chrome starts; it sends no keyboard input, uses no emulation and preserves the first HOLD.",
  "chromium_primary_sources": {
    "pref_name": "https://chromium.googlesource.com/chromium/src/+/refs/heads/main/chrome/common/pref_names.h#868",
    "pref_initialization": "https://chromium.googlesource.com/chromium/src/+/ee29dd0c3875d017f69f0be001756602b8b8f1e9/chrome/browser/ui/zoom/chrome_zoom_level_prefs.cc#35",
    "page_zoom_conversion": "https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#23",
    "default_partition_key": "x plus the hex encoding of the empty profile-relative partition path, therefore x",
    "zoom_levels": {
      "100_percent": 0,
      "175_percent": 3.069389038663465,
      "200_percent": 3.8017840169239308
    }
  },
  "base": {
    "candidate_root": "/Users/handtomouse/maplemoon_build_20260813",
    "predecessor_review_sha256": "22edc54049fcf28a864de8ca913657bb0ab7c09620275e0d99a57aea206b926f",
    "predecessor_receipt_sha256": "69de9cc7f1befb6ff9c080addbadf092b3b243811a162cca878331db157b3b76",
    "predecessor_evidence_sha256": "1e26fd6e03c64ae5073780380b8ca495780e75b07f697cf32cfe585cae235c42",
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
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-NATIVE-200-ZOOM-AUDIT-20260814T174412.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATIVE-200-ZOOM-AUDIT-20260814T174412.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATIVE-200-ZOOM-AUDIT-20260814T174412.json",
    "maplemoon-website/_wip/evidence/native_200_zoom_audit_20260814T174412",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-INTEGRATED-HEADER-CART-CERT-R2-20260814T163003.json",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CERTIFIED-PREVIEW-DEPLOY-20260814T165853.json",
    "maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/native_200_zoom_audit_r2_20260814T180224",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATIVE-200-ZOOM-AUDIT-R2-20260814T180224.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATIVE-200-ZOOM-AUDIT-R2-20260814T180224.json"
  ],
  "method": [
    "create a timestamped non-overwriting checkpoint for the exact three writable outputs and pass phase-start with --root /Users/handtomouse before the first write",
    "verify the predecessor HOLD, predecessor evidence digest, candidate hashes and predecessor-certification hashes at acquisition and close",
    "record the three cited Chromium primary-source files and independently verify the pref name, default partition key derivation, HostZoomMap initialization and 1.2 exponent conversion before relying on them",
    "create three fresh deterministic task-local profile directories under /tmp for 100, 175 and 200 percent; before each first Chrome launch create only Default/Preferences with partition.default_zoom_level.x set to the exact named value; record the file bytes and SHA-256",
    "launch each as a separate isolated headed Chrome process with its own explicit profile, CDP port and exact PID; do not activate, focus, send keyboard input to, attach to or alter any existing browser process/window",
    "use identical browser outer bounds for the 100, 175 and 200 profiles and navigate each to the same local positive-control page; use CDP only for bounds, navigation, measurement and screenshots, never any Emulation domain zoom/scale/device command",
    "prove browser-native profile zoom by matching the on-disk preference, visualViewport.scale remaining 1, empty/default CSS zoom, stable outer bounds, DPR ratios approximately 1:1.75:2 and inverse CSS inner-width ratios approximately 1:1/1.75:1/2; require the 175 profile to fail the 200 detector and the 200 profile to pass it",
    "after proof, use only the 200 profile and its native preference; set outer bounds until measured effective CSS inner widths are exactly 390 and 720, recording outer size, layout/visual viewport, DPR, preference and absence of emulation commands for every case",
    "at both effective widths, load all seven routes and require local HTTP 200, clientWidth equals scrollWidth equals innerWidth, nonblank paint, complete/nonbroken authored images, zero page/console/request failures and correct fixed-header paint order",
    "at effective 390 on every route, prove closed/open navigation, full-width panel, six 44 CSS-pixel rows, row-centre hit order, focus trap, Escape close, opener restoration and reduced-motion behavior",
    "at effective 390 on every route, prove cart inert containment, overlay pointer blocking, Escape/explicit-close restoration, no observer/listener accumulation and no horizontal overflow; on Shop also preserve option identity, subtotal arithmetic and storage",
    "capture nonblank full-page screenshots of all seven routes at both widths plus representative menu/cart states and visually inspect clipped text, overlap, lost content, unreadable notices and off-canvas UI",
    "close only exact task-local Chrome/server PIDs, verify their ports closed and preserve the temporary profile paths plus Preferences hashes as evidence; leave the first HOLD evidence untouched",
    "write the R2 review and receipt and run completion then promotion gates; no deploy is authorised"
  ],
  "verify": [
    "the native page-zoom mechanism is grounded in Chromium primary source and loaded from isolated profile preferences",
    "100, 175 and 200 are quantitatively distinct at identical outer bounds; 175 rejects and 200 passes the exact detector",
    "no global input, focus stealing, Emulation zoom/scale/device command or user-browser action occurs",
    "all seven routes pass at effective measured 390 and 720 under proved native 200 percent",
    "navigation, cart, focus, inertness, paint order, reduced motion, overflow and Shop arithmetic remain correct",
    "all screenshots are nonblank and visually free of clipping, overlap and lost content",
    "candidate and predecessor hashes remain unchanged",
    "only the exact R2 evidence directory, review and receipt change",
    "completion and promotion gates pass"
  ],
  "stop": [
    "Chrome does not honor the isolated preference or the 100/175/200 metrics do not match native page zoom",
    "any existing browser process/window would need focus, input, resizing, navigation or modification",
    "an Emulation zoom/scale/device command or UI keystroke would be needed",
    "a pinned hash changes or a required runtime, visual, positive-control or process-isolation check fails",
    "a candidate/source/media/Styles Kit edit, deploy, production mutation, commit, push, delete, stash, gitignore or client contact would be needed",
    "a path outside writable_paths changes"
  ],
  "forbidden_actions": [
    "activate, focus, resize, navigate, zoom, close, attach to or modify the user's existing browser process/profile/window",
    "send any global or process-directed keyboard input",
    "use CSS zoom, page/pinch scale, viewport/device emulation, force-device-scale-factor or any Emulation zoom/scale/device command",
    "edit any candidate/site/build/source/media/Styles Kit file or prior evidence",
    "deploy, promote, alias, alter protection, move production, commit, push, delete, stash, gitignore or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS; if PASS, preserve R2 as native-zoom evidence and retain the first audit as the correct safe HOLD predecessor",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Boundary

R2 changes the native-zoom control mechanism, not the QA standard. It must not use focus or emulation to manufacture a pass.
