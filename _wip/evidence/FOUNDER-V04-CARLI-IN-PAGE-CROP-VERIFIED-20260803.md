# Carli v02 in-page crop verified: 1440 and 390

2026-08-03, Claude Code verification lane. Satisfies the receipt requirement in
`scripts/check-maplemoon-portrait-crop.mjs`.

## What was verified

Codex's accepted `carli_bio_v02.png` (2600x3250, bounds `x=2750 y=400 w=2600 h=3250`)
rendered through harnesses replicating the production rules in `_wip/our-story.WIP.html`.

## 1440 desktop — PASS

Harness `carli-inpage-verify.html`. Grid `.92fr / 1.08fr`, portrait height
`clamp(400px,46vw,548px)`, `object-fit:cover`, `object-position:46% 40%` (line 603),
two-axis mask (line 543) horizontal opaque 11% to 91%, vertical 8% to 90%.

Hair, hand, fingers and the raised elbow all render inside the opaque region. The elbow
sits nearest the right fade and stays clear. `cover` crops the lap and knee away
vertically, which is expected: the container is landscape relative to the 4:5 crop, and
knee is not a required element.

## 390 mobile — PASS

Harness `carli-inpage-verify-390.html`. Box 342x460, being `390 - 24px padding x2` wide and
`min(118vw,560px)` tall. `object-fit:cover`, `object-position:46% 40%`, and the mobile mask
per line 553, which is **vertical only**, 8% to 88%.

Hair, hand, fingers and elbow all present and inside the opaque region.

**Behaviour worth knowing:** mobile has no horizontal mask, so the left and right edges are
hard cuts rather than fades. At 342x460 the box is narrower in ratio than the 4:5 image, so
`cover` crops the sides, and Carli's left shoulder meets the container edge as a hard cut.
Acceptable for a portrait, but visually a different treatment from desktop's soft fade. If
that inconsistency is unwanted, it is a CSS decision, not a crop one.

## Deviations from production, stated

- Harness container `max-width:1200px`; real page `1180px`. About 1.7%, shifts the desktop
  cover crop marginally, does not affect the finding.
- These are rule replicas, not the live page with the asset wired. No v04 asset is wired
  yet; the page still references `founders_portrait_h212.webp`.

## Standing

The crop bounds are sound at both breakpoints. Codex's own QA proofs remain void, having
been rendered against a surface with no mask and no `object-position`, per
`FOUNDER-V04-CROP-ACCEPTANCE-CORRECTION-20260803.md`. This receipt replaces them.

This is a technical verification of framing under the production CSS. It is not a client
review pass, which remains Nate's.
