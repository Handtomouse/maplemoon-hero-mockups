# In-page render of Carli v02 under production CSS: 1440 verified, 390 outstanding

2026-08-03, Claude Code verification lane. **Partial. Deliberately not named to satisfy the
receipt gate in `scripts/check-maplemoon-portrait-crop.mjs`, because 390 was not obtained.**

## Harness

`_wip/evidence/carli-inpage-verify.html`, served locally, replicating the production rules
from `_wip/our-story.WIP.html`:

- `object-fit:cover; object-position:46% 40%` (line 603)
- the two-axis alpha mask (line 543), horizontal opaque 11% to 91%, vertical 8% to 90%
- grid `.92fr / 1.08fr`, gap `clamp(40px,6vw,90px)`, portrait height `clamp(400px,46vw,548px)`

Known deviation: harness container `max-width:1200px`, real page `1180px`. A 20px difference,
about 1.7%, which shifts the cover crop marginally and does not affect the finding below.

## Result at 1440x900

**Pass.** Carli's hair, hand, fingers and raised elbow all render inside the opaque region.
The elbow sits nearest the right fade and remains clear of it. Nothing required is lost to
the mask.

`object-fit:cover` crops the lap and knee away vertically, because the container is landscape
relative to the 4:5 crop. This is expected and correct: knee is not among the required
elements. It does mean the knee framing decided in Photoshop is invisible on desktop.

## Result at 390

**Not obtained.** The browser did not apply the viewport resize; the render returned
identical to 1440. Not retried, to avoid a loop.

Mobile matters independently: line 553 drops the horizontal mask entirely and applies the
vertical mask only, and the portrait height changes to `min(118vw,560px)`. That is a
materially different crop, so the desktop pass does not transfer.

## Standing

The gate stays armed. A full pass needs 390 rendered with line 553's mobile mask. Codex's
crop bounds are looking sound at desktop; its own QA proofs remain void because they were
rendered without either production crop stage, per
`FOUNDER-V04-CROP-ACCEPTANCE-CORRECTION-20260803.md`.
