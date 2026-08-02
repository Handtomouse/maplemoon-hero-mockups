# Pre-screen: Carli v02 under the production alpha mask

2026-08-03, Claude Code verification lane. **This is a pre-screen, not a pass.** It does not
satisfy the receipt gate in `scripts/check-maplemoon-portrait-crop.mjs`, deliberately.

## Method

Applied the production mask from `_wip/our-story.WIP.html` line 543 to Codex's accepted
`carli_bio_v02.png` (2600x3250): horizontal opaque 11% to 91%, vertical opaque 8% to 90%,
linear fades to fully transparent, composited over the page background `#c5d5e5`.

## Result

Carli survives. Inside the opaque region: hair full length, hand, fingers, ring, face, and
the raised elbow. The fade catches only the outer denim of her left shoulder and the lap at
the bottom edge, which reads as a deliberate soft vignette rather than a loss of subject.

The bounds `x=2750 y=400 w=2600 h=3250` therefore **do** satisfy the corrected criterion:
hair, hand, fingers and elbow are inside the opaque region. Margin is generous, not marginal.

## Why this is still not a pass

This is a mask simulation at the image's own aspect, not a browser render. It does not
model stage 2, `object-fit:cover` with `object-position:46% 40%`, which re-crops according
to the real container aspect and could shift the framing. The margin observed here is wide
enough that a moderate container-aspect difference should not endanger the subject, but that
is an expectation, not a measurement.

A real pass needs the review surface re-rendered with lines 543 and 603 applied, per
`FOUNDER-V04-CROP-ACCEPTANCE-CORRECTION-20260803.md`. The gate stays armed until then.

## Standing

Codex's crop work is sound. Its pixels are verified identical to the custody master by two
independent paths. The only defect found is that its QA proofs were rendered against a
surface missing both production crop stages, so those proofs cannot carry the pass, even
though the underlying asset now looks likely to earn one.
