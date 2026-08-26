# R4 diagnostic disposition — HOLD

Packet: `MAPLEMOON-HOMEPAGE-STYLE-FINISH-R4-20260825T165002`

Disposition: **HOLD / failed required candidate check. No visual PASS is claimed.**

## Candidate-owned failure

- The first and last rotated product images in `#sampler .sbox` exceed the semantic starter-box boundary by approximately 11.3 px at 768, 9.4 px at 390 and 7.6 px at 320. Root page overflow remains zero, so this is the clipped-container failure the semantic check is intended to catch. R4 remains immutable; no correction was applied here.

## Inherited behavior requiring an explicit successor disposition

- The active carousel's first/last `.cf-item`, `.cf-bp` and `img` elements produce six viewport-probe failures at 768 and six at 320 in both sealed baseline and candidate. This is byte-identical inherited behavior, not introduced by the R4 stylesheet; it still conflicts with the literal zero-failure overflow contract.
- `mock-cart.js` leaves the newsletter input disabled but enables the `Demo only` submit button at runtime at every measured width. Baseline and candidate are equal; the literal input-and-button-disabled contract therefore fails without runtime/source authority or an explicit inherited-runtime disposition.

## Harness-only corrections required before R5 certification

- Geometry records expose `x/y`, not `left/top`; the R4 harness therefore emitted false comparison/containment failures despite direct measurements showing two columns at 1440/1024 and the correct cacao-then-carob stack at 768/390/320.
- Count the single `footer.mm-site-footer`, not the mock-cart dialog's separate semantic footer.
- Apply the new style-component assertions to the candidate; keep baseline as preservation/runtime observation rather than requiring it to satisfy the intended new styling.
- Store viewport width separately from raster width and validate proof dimensions against the asserted CDP width.
- R4 focused normal-state review sheets at 390/320 are contaminated by the inherited closed/off-canvas cart overlay because they were cropped from full-page captures. They are invalid for visual approval. R5 must close/suppress only the closed cart state and recapture focused sections after scrolling with viewport/locator screenshots; it must not derive them from full-page rasters.

## Preserved evidence

- `qa-attempts/attempt-005`: 120/120 primary rasters, 60/60 before/after contacts, 11/11 aggregate review sheets, 16/16 interaction/focus/reduced-motion states and 12/12 caught positive controls.
- Automated literal: `HOMEPAGE_STYLE_AUTOMATED_QA FAIL widths=0/5 proofs=120/120 contacts=60/60 review_sheets=11/11 additional=16/16 positive_controls=12/12 close_pins=PASS live_rebase=HOLD`.
- Candidate checks otherwise measured: exact CDP widths and root overflow pass at 1440/1024/768/390/320; flow/text/media/control projections equal; zero comparison controls; two visible 14 px/600 hotspots at all widths; one 14 px credit with 20.3 px line-height; comparison geometry correct; no broken images, required sub-44 targets or page/console/request failures.
- Close pins PASS: snapshot `792e6508d21a4b1840f5a35fd28af05962030a7e2e32e73cda4651c7e5a48dd9`; baseline directory `394b65d1f98b931cc6fa90f685a363654ad3baa691321be1c8bc524d07c825c1`; candidate directory `fa218fcc78f4a403b311582b8c7219dd2cac25950f7b96914ab1f8e1186cde3e`; all pinned and frozen files stable during the run.
- The live homepage moved after sealing; `qa-attempts/attempt-005/LIVE-SOURCE-REBASE.diff` records it. Per R4 authority, this does not alter the sealed baseline/candidate diagnostic and requires a later Boss-owned rebase decision.

No candidate, source snapshot, baseline, frozen WIP, builder, Git, deploy, Shopify, production or client state was modified by QA.
