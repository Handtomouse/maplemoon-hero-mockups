# Frame-701 founder wiring — verification summary

Final disposition: **PASS** for the exact founder-media scope.

- Nate's selected header source is `frame_701_CORRECT.jpg`, not frames 592 or 870.
- The governed header WebP is a deterministic centred `4000x2667+0+1666` crop resized to 2400×1600, sRGB, SHA-256 `ec53b0faa3cec0e12e578395968e0605eeac5a64b191030d5c8661ed33ea608d`.
- The Carli and Dylan governed WebPs are byte-identical to the accepted v2 sources. Their live slots are 4:5 with `object-fit:cover`, `object-position:50% 35%`, and vertical-only fades.
- `verify-founder-source.py` reports `FOUNDER_SOURCE PASS`, including exact source/output hashes, deterministic hero rebuild, exact occurrence counts, and a page delta limited to the admitted founder-media seams.
- `verify-founder-browser.mjs` reports `FOUNDER_BROWSER PASS cases=2/2 failures=0`. At measured 1440 and 390, both founders render at their exact natural dimensions, the root has no overflow, the skip link is keyboard reachable, and console/page/request/bad-response counts are all zero.
- The four final cropped review proofs are derived from the clean full-page captures. This avoids a documented Playwright element-screenshot fixed-layer compositing artefact; all intermediate attempts are preserved and named.
- `verify-seven-routes.mjs` reports `SEVEN_ROUTE_BROWSER PASS cases=14/14 failures=0` at 390 and 1440 across Home, Shop, Our Story, Carob Story, FAQ, Stockists, and Pure Carob Bar.
- The exact minimum-release preflight reports `VERDICT: PASS with 2 review-only hit(s) ... | WAIVED: root:homepage`. The local root waiver must be rechecked on a real preview URL before promotion.
- Existing design-system checks remain `HOLD ... holds=2` for the already-admitted Home and Shop frozen-baseline drift only. No founder route or asset fails those gates; contract reconciliation remains a separate checkpointed lane.

Evidence-acquisition qualifications:

1. Attempt 1 used Playwright's invalid `viewportSize` option and therefore remained at 1280px. Preserved as `browser-results-attempt1.json`.
2. Attempt 2 used the repository root server, which omits two Vercel-rewritten support stylesheets. Preserved as `browser-results-attempt2-root-server.json`.
3. Attempts 3–5 exposed focus-transition timing assumptions in the verifier only. Preserved by name.
4. Attempt 6 proved Playwright's element screenshot could composite a hidden fixed skip link into an off-viewport element capture. Browser state recorded the link blurred and translated above the viewport. The final proofs are cropped from clean full-page screenshots instead.
5. The first seven-route attempt omitted existing deployment support files from the temporary build. It is preserved as `seven-route-results-attempt1-incomplete-build.json`; the exact-file corrected rerun passed 14/14.

No copy, non-founder imagery, Shopify, Git, Vercel, deploy, production, or client state was changed.
