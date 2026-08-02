# VIS-03C-05 Responsive Fix Receipt

**Packet:** `VIS-03C-05-RESPONSIVE-FIX`  
**Candidate:** `VIS-03C-05-RESPONSIVE-FIX-CANDIDATE-20260731-001`  
**Branch / HEAD:** `codex-maplemoon-section-review` / `d65047b6a7431af955ad0cd5b57c42f7a9367225`  
**Completed:** `2026-07-31T10:59:56Z`  
**State:** `needs_review`  
**Share ready:** `false`

## Scope executed

- Added one final page-local containment layer to `_wip/our-story.WIP.html`.
- Neutralized stale founder-portrait inset values, contained its grid items, corrected the sub-400-pixel header grid and made the existing floating-image suppression authoritative.
- Kept `_wip/stockists.WIP.html` unchanged. Its source already used the safe transform-based skip-link treatment.
- Removed only the derived-builder rewrite that reintroduced `left:-9999px`, then asserted the safe Stockists rest and focus states.
- Rebuilt the clean and annotated Saturday review surfaces from all six current WIP inputs.

## Source integrity

| Source | Post SHA-256 | Result |
|---|---|---|
| Homepage | `921ef01aa922668da2f0aacdfdf7438fd0e5664fb78ba98bc9c011e55e03b098` | unchanged |
| Carob Story | `e1695095f6b8e18eccea468dfd8a09013e85b5c64c5de427b3d8e5701e6f4320` | unchanged |
| Shop | `d976b0b8df1edc845eae10fa03a272f96dae7ff9fad6711f1dfb6eed80ff5a09` | unchanged |
| Our Story | `a823f0f7291ee3b66acfefd0a718227c47717cf7811747db9216a1e17612fb1d` | admitted CSS-only repair |
| Stockists | `6e92382ccec4874aac79c32e644d0ed130d03400c7d23682623b0e4154a6fa36` | unchanged |
| FAQ | `4a7f5eee7096150f23f07cac6316c83893aab34135e3c40ca0e24848b77704f1` | unchanged |

Our Story's diff adds CSS only. Copy, image `src` values and section order were not changed.

## Deterministic package evidence

- Two independent candidate builds were byte-identical.
- Promoted local staging was byte-identical to the candidate build.
- Aggregate manifest: `b521c9f7e451193314e50a8987ee00df92533efe7db8e633acd985705bf3e2e3`
- Clean manifest: `d6382996f4fc922506df7d24d1928c1dfb258a63ee27ccae5cf44022c0b52526`
- Annotated manifest: `94747c89204e4fdafa032396452afd774d282f2d1b9288eacf024122f81a9d17`
- Builder: `eda9181683c1dc700566b2822dded3dbabc0959e76ca38e69bdd26f27847b457`
- Checker: `3897fc57b9a15564932b36f94e95753b9549ee222396f8260aa492c02219c3d5`

## Verification

- Saturday clean and annotated checker: PASS, 0 failures, 0 warnings.
- Cart and fake-checkout checker: PASS.
- Homepage reduced-motion checker: PASS.
- Responsive detector self-test: PASS.
- Rendered responsive matrix: PASS, 72 of 72 cases.
  - Surfaces: clean and annotated.
  - Routes: Homepage, Carob Story, Shop, Our Story, Stockists and FAQ.
  - Widths: 320, 375, 390, 430, 1024 and 1440 pixels.
- Positive control: PASS. The injected element 900 pixels wider than the viewport was detected at 320 and 1440 pixels.
- Stockists skip-link keyboard activation and focus: PASS on clean and annotated at 320 and 1440 pixels.
  - Exactly one link was present.
  - Rest position stayed horizontally inside the viewport.
  - Keyboard focus settled to `transform: matrix(1, 0, 0, 1, 0, 0)` and remained horizontally inside the viewport.
- Browser warnings/errors: 0.
- `git diff --check`: PASS.
- Generated Python bytecode was restored to its exact HEAD blob after validation.

## Boundary proof

No other page, design, copy, imagery, catalogue, pricing or commerce behavior was changed. No commit, push, deploy, send, Shopify, WooCommerce, Vercel or production action occurred.

## Residual gate

This candidate is not accepted and is not share-ready. Nate remains the final decision owner and must complete the real-browser visual and 200 percent zoom review before any later promotion.
