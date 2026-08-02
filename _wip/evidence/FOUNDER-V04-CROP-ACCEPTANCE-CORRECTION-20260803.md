# Verification finding: Carli v02 crop acceptance criterion is wrong

Raised 2026-08-03 by the Claude Code verification lane against packet
`FOUNDER-V04-CARLI-CROP-CORRECTION-20260803`. No packet file was edited. This is a finding,
not a control record.

## Severity

The packet's acceptance test can pass while the delivered asset is visibly broken. Any
receipt written against the current criterion is unsound.

## What the packet assumes

Acceptance is `Carli v02 cuts required hair, hand, fingers, elbow or identity` evaluated
against the exported file at `2600x3250`, bounds `x=2750 y=400 w=2600 h=3250`.

## What actually happens

`_wip/our-story.WIP.html` applies **three** stacked crops. The packet accounts for the
first only.

| # | Stage | Rule | Source |
|---|---|---|---|
| 1 | Photoshop bounds | `x=2750 y=400 w=2600 h=3250` | the packet |
| 2 | CSS cover | `object-fit:cover; object-position:46% 40%` | line 603, `.os` scope |
| 3 | Alpha mask | horizontal opaque only 11% to 91%; vertical opaque only 8% to 90% | line 543 |

Stage 2 overrides the base rule at line 432, which reads `object-position:center 42%`. Two
different values for the same property exist in the file; the `.os`-scoped one wins.

Stage 3 is the one nobody has accounted for. Roughly the outer **11% left** and **9% right**
of the displayed image dissolve to fully transparent, along with 8% top and 10% bottom. On
mobile, line 553 applies the vertical mask only.

In the v02 bounds, Carli's shoulder reaches the left edge of the crop, so it lands inside
the horizontal fade. The browser does not cut her, it dissolves her, and no file-level
check can detect that.

## Corrected criterion

Replace:

> Carli v02 cuts required hair, hand, fingers, elbow or identity

With:

> Carli's hair, hand, fingers and elbow are inside the **opaque** region of the mask, at the
> real container, verified in-page at 1440 and 390. Not verified at file level.

Bounds and `object-position` must be decided together in one pass. They are currently
decided by two processes that cannot see each other.

## Not yet wired, so there is time

The page still references `assets/our_story/founders_portrait_h212.webp`. No v04 derivative
is wired into any page, manifest or template. This can be fixed before anything ships.

## CONFIRMED 2026-08-03 02:55. This is no longer a predicted risk.

`_wip/evidence/founder_v04_main_imac_qa_export_20260803/` contains QA proofs at 1440 and
390, which is the right instinct. But they are rendered against
`our_story_v04_review.html`, an isolated review surface that:

- contains `mask-image` **zero times**, so stage 3 is absent entirely
- carries no `object-position`, so stage 2 does not match production either

The proofs therefore show a rendering that does not exist on the real page. They cannot
support a pass on Carli framing. **Any receipt written against them is void.**

Remedy: render the proofs against the real `.os`-scoped rules from `_wip/our-story.WIP.html`
(line 543 mask, line 603 object-position), or copy those rules into the review surface.
Then re-check that hair, hand, fingers and elbow sit inside the opaque region.

Confirms a matching finding from Codex's own receipt: `founders_portrait_v04_review.png`
is pixel-identical to the custody master. Two independent paths agree the pixels are sound.
The defect is in what the proofs were rendered against, not in the image.

Enforced by `scripts/check-maplemoon-portrait-crop.mjs`.

## Independently verified while raising this

Against `_wip/masters/founder-v04-master.png`, pixel hash `517683f0`:

- The bounds produce exactly `2600x3250`.
- No pixels of the second subject remain in frame.
- Carli's hair, hand, fingers and ring are inside the file.
- The knee is fully in frame and uncut; the bottom edge lands below it at lap level.

So the bounds are correct **as a file**. The defect is entirely in the acceptance criterion,
not in the crop maths.
