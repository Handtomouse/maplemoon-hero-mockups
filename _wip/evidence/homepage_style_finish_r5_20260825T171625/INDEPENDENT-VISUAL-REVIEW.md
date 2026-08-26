# R5 independent visual review — authoritative attempt-003

Packet: `MAPLEMOON-HOMEPAGE-STYLE-FINISH-R5-20260825T171625`

Evidence reviewed: `_wip/evidence/homepage_style_finish_r5_20260825T171625/qa-attempts/attempt-003/review-sheets`

## Evidence validity — PASS

All 11 immutable attempt-003 review sheets were inspected with `view_image` at original detail. The sheets are nonblank, correctly labelled, and cover 1440, 1024, 768, 390 and 320. The focused 390/320 captures are clean and are not contaminated by the R4 closed/off-canvas cart overlay.

Where the 320 `hero-header` locator sheet shows only the upper rim of `Shop Now`, this is a capture-boundary artifact rather than a live visual defect. The button belongs to the deliberately overlapping `#range`, not `#top`; it is fully contained by `#range` and intact in the full-page record.

## Area verdicts

### Hero/header — PASS

The image and product crops are intentional, the logo, title and primary action remain legible, and the centre product and both carousel arrows are visually complete. The composition stays contained and coherent at all five widths.

### Hotspots — PASS

Both callouts remain distinctly anchored and readable without collision. Their mobile arrangement is contained and preserves a clear relationship to the carob image.

### Comparison — PASS

The 1440/1024 two-column treatment is balanced. At 768/390/320, cacao precedes carob in a deliberate vertical sequence. Headings, rules, labels, values and the VS marker are readable and aligned without clipping or cramped copy.

### Farm credit — PASS

The photography credit is legible but subordinate at every width. Its rule, alignment and spacing create a coherent handoff from the farm image into the story.

### Story seams — PASS

The story-top, story-credit, story-credit-boundary and story-bottom evidence all show clean dissolves. There is no accidental hard band, doubled mask, blank slab, cropped text or discontinuous background shift.

### Starter — REVISE / FAIL

This is the sole candidate-owned defect. At exact 1440, the rotated edge packshot remains **1.923 px outside `.sbox`**, violating the required semantic containment gate. The six-pack fan otherwise reads coherently at all widths, with no additional visible starter craft defect.

The content edges visible in the `starter-core` locator sheet are the `.sbox` capture boundary, not viewport clipping; the full-page record retains the intended outer section gutter.

### Sampler-to-trust seam — PASS

The sampler and trust content form one continuous midnight field. The inherited pale pseudo-envelope is absent, with no visible stripe, flash or unexplained light gap.

### Trust contrast — PASS

Cream text and gold icons read clearly against the navy field. The three benefits are balanced on wide screens and deliberate when stacked.

### Footer — PASS

The footer continues the lower dark field coherently. Heading, controls, disclaimer, brand, navigation and contact control remain contained and visually ordered at all widths.

At 320, the disabled input placeholder truncates to `Email collection di…` in both baseline and candidate. The explicit disclaimer and `DEMO ONLY` label remain fully readable. This is inherited and unchanged, so it is not an R5 candidate defect and does not justify broadening R6.

### Mobile containment — PASS

The clean 390/320 evidence shows no live horizontal or content clipping. The hero locator rim described above is capture-only. The carousel edge bleed reads as an intentional clipped-stage composition, with its centre product and arrows intact.

### Anti-template / MapleMoon brand quality — PASS

The candidate presents a cohesive coastal-blue-to-midnight arc, restrained cream/gold accents, confident serif/sans hierarchy and organic editorial imagery. It avoids generic SaaS-card treatment, pill excess and disconnected template blocks.

## Overall verdict — HOLD

No overall visual PASS is claimed. R5 remains on **HOLD** because the exact 1440 starter containment requirement fails by **1.923 px**.

The evidence supports exactly one R6 visual correction:

```css
html body .wf #sampler.q-sampler .sbox-grid {
  padding-inline: 18px !important; /* R5: 14px */
}
```

R6 should change `padding-inline` from **14 px to 18 px**, then rerun the same five-width containment and immutable visual proof set. No additional visual CSS change is justified by this review.

## Separate inherited integration disposition

The newsletter runtime remains a separate inherited integration **HOLD**: the sealed runtime keeps the input disabled while enabling the no-side-effect `Demo only` submit control. This is not a visual/craft defect and must not be folded into the bounded R6 sampler correction.

The inherited clipped-carousel exception is visually acceptable in this evidence; its centre item and both arrows remain complete. Functional traversal and exception gates remain separate from this visual judgment.
