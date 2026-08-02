# W1-A homepage receipt — 2026-08-03

## Authority and scope

- Writable source: `_wip/homepage_real_1_lead_photo.WIP.html` only.
- Added evidence: `FADE-PATTERN-20260803.md` (published before any W1-A remainder edit) and this receipt.
- No `staging-v1/` rebuild, no git write, no gate record, and no non-homepage WIP edit.

## Delivered

1. Published the shared section-dissolve pattern. The hero uses a masked image plus a separate
   blurred radial-gradient fog bridge; full-bleed section imagery must use transparency into the
   existing page wash, not a border or opaque section colour.
2. Preserved the existing `homepage-build-now-20260803` H1/H2 layer and verified its source
   order: hero wordmark, credentials, then CTA. Its H3/C1/S1/S2/SA1/RT2 rules were already in
   the dirty WIP and were not duplicated.
3. Finished the remaining homepage layer:
   - H3 keeps the existing credential-pill box dimensions but prevents the slightly larger text
     wrapping.
   - C2 keeps exactly two callouts, targets the central and far-right real pod clusters in
     `carob_branch_dusk.jpg`, and removes the unapproved third callout.
   - R2/R3 mists and lightly blurs non-centre carousel packs; `.center` remains fully sharp.
4. Applied the IDLE QUEUE #7 decided homepage-only Moons rename. `data-cat`, catalogue keys,
   labels, copy, and the responsive selector now use `moons`; links still resolve to `#moons`.

## Contrast

The current story eyebrow foreground is `#3f4b51`. Against the explicit story-wash colour
`#d9e9f0`, static WCAG contrast calculates `#8b806a` at **3.13:1** and the new foreground at
**7.22:1**. A fresh rendered pixel sample is pending because the local-file browser policy
blocks scripted DOM/capture access; do not treat the static calculation as viewport QA.

## Actual verification output

```text
W1-A remainder contract: PASS (callouts=2, sections=11)
W1-A scoped-layer integrity: PASS
Moons rename contract: PASS
Inline JavaScript parse: PASS (7 scripts)
d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20  docs/client-review/2026-08-01-saturday-review/staging-v1/clean/MANIFEST.json
```

`git diff --check -- _wip/homepage_real_1_lead_photo.WIP.html _wip/evidence/FADE-PATTERN-20260803.md`
produced no output (clean).

## IDLE QUEUE follow-through

- #1: HOLD. A real local Chrome capture confirmed the page parsed and the hero's source order,
  but the browser policy blocked scripted access to the local `file:` page before 1440/834/390
  scroll-and-settle captures could be completed.
- #2: W1-F asset re-measure is 3.31 MB homepage and 1.37 MB carob-story; homepage remains
  0.31 MB over target. Shop is 4.27 MB because six oversized product PNGs are outside the
  licensed-only W1-F scope.
- #3: HOLD on the same local-file browser policy.
- #4: WIP metadata audit found missing local OG social images on homepage, Our Story, Carob
  Story, and Stockists; shop has no `og:image`; FAQ has neither canonical nor `og:image`.
- #5: Read-only inventory found 335 raster assets above 300 KB (241 above 1 MB). No duplicate
  or deletion conclusion was drawn.
- #6: FAQ lacks `AUD $`; footer prefixes differ (`wf-ft`, `os-ft`, `sp-ft`). The alleged
  8px Our Story pill issue did not reproduce in static pill rules.
- Adversarial W1-F check: the four named homepage offenders are now 1600px progressive JPEGs,
  but six other `assets/licensed/carob_farm/*.jpg` files remain over 300 KB (0.78–1.70 MB).
  They were not changed from this packet.

## Current hashes

```text
c2eddfff47b4abffdbe7c82e4066ce245c5bc3dca0e4adb64200d609bade2f04  _wip/homepage_real_1_lead_photo.WIP.html
17f71a8c167b6129a288ab2914dce339709a456efceda9af3ad72956cecfe2b2  _wip/evidence/FADE-PATTERN-20260803.md
```

## Next action

Run the mandated scroll-and-settle QA at literal 1440, 834, and 390 from a browser surface
permitted to script the local WIP file, then decide whether the still-overweight homepage needs
the non-licensed `carob_branch_dusk.jpg` or product-shot optimisation in a separately-authorised
packet.
