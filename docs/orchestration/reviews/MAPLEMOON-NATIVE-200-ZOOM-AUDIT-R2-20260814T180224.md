# MapleMoon native 200% browser-zoom audit R2 — PASS

## Verdict

PASS. Chromium honoured the isolated-profile native page-zoom preferences, the 175% reject and 200% positive controls behaved distinctly, and the unchanged certified candidate passed the complete seven-route matrix at measured effective widths 390 and 720. No user browser, source, deployment, Git, production or client state was touched.

## Native zoom proof

- Three separate task-local headed Chrome profiles loaded `partition.default_zoom_level.x` before first launch: `0`, `3.069389038663465` and `3.8017840169239308` for 100%, 175% and 200%.
- At identical `1200x900` browser bounds, DPR measured `2`, `3.5`, `4`; CSS `innerWidth` measured `1200`, `685`, `600`; `visualViewport.scale` remained `1`; root CSS zoom remained `1`.
- Ratios were DPR `1:1.75:2` and inverse CSS width `1:1.7518248175:2`. The 175% profile rejected the exact 200% detector; the 200% profile passed it.
- No `Emulation.*` or `Input.*` CDP command, OS/UI input, activation, focus or existing-browser action occurred.

## Seven-route certification

- Native 200% at effective 390: outer width `780`, `innerWidth=clientWidth=scrollWidth=390`, DPR `4`, `visualViewport.scale=1`.
- Native 200% at effective 720: outer width `1440`, `innerWidth=clientWidth=scrollWidth=720`, DPR `4`, `visualViewport.scale=1`.
- All 14 route/width cases returned local HTTP 200, painted nonblank, decoded all eligible authored images, emitted no request/runtime/console failures, retained exact width with no overflow, and preserved fixed-header paint order.
- At effective 390, all seven routes passed closed/open navigation, full-width panel, six 44 CSS-pixel rows, row-centre hit ownership, focus trap, Escape close, opener restoration and reduced-motion behavior.
- All seven routes passed cart inert containment, modal-layer pointer blocking, Escape/explicit-close restoration, listener/observer balance and overflow checks. Shop preserved the selected `5 moons` option at `1219` cents and the persisted three-item subtotal `$36.57`.

## Rendered evidence

- Fourteen corrected whole-page captures use the zoom-aware `Page.getLayoutMetrics.contentSize` coordinate space.
- Forty-two no-clip top/middle/bottom viewport captures provide readable full-width checks for every route/width case: `1560px` physical width at effective 390 and `2880px` at effective 720.
- Visual inspection of the five contact sheets passed all 14 cases for clipped text, authored overlap, lost content, unreadable notices and off-canvas UI. The full-width menu and cart representative states also passed.
- The predecessor `cssContentSize` screenshot artifact and contact sheets are preserved under `screenshot-coordinate-artifact/` as false-positive evidence. Fixed headers visible over arbitrary mid-page scroll captures are expected viewport behavior; the whole-page captures show no lost authored content.

## Acquisition corrections

The evidence record preserves every unsuccessful verifier attempt: macOS height clamping, lazy-image eligibility, the anchor-only drawer row selector, the hard-coded overlay probe, post-close cart-state classification and the screenshot coordinate artifact. Each correction changed only the isolated evidence harness or acquisition method, kept the underlying candidate checks strict, and was followed by a complete rerun. None reproduced as a candidate failure.

## Integrity and cleanup

- All seven page hashes, four shared runtime/style hashes, predecessor HOLD review/receipt/evidence digest, integrated-certification receipt and certified-preview receipt matched at acquisition and close.
- Exact task-local Chrome PIDs `94567`, `94587`, `94603` and server PID `94566` were closed; ports `4422`, `9350`, `9351`, `9352` were closed. The three task-local profiles remain preserved for evidence.
- Candidate changes, deployments, Git actions and client actions were all empty.

## Promotion recommendation

Accept R2 as the native 200% zoom evidence for the unchanged certified candidate. Preserve the first audit as the correct safe HOLD predecessor and preserve R2's verifier-correction history with the accepted evidence.
