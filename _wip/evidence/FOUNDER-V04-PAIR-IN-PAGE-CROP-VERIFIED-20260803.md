# Pair portrait in-page crop verified: 1440 and 390

2026-08-03, Claude Code verification lane. Companion to
`FOUNDER-V04-CARLI-IN-PAGE-CROP-VERIFIED-20260803.md`.

## Verified

`founders_portrait_v04_review.png` (6000x4000), the direct replacement for the currently
wired `founders_portrait_h212.webp`, rendered under the production rules from
`_wip/our-story.WIP.html` via `pair-inpage-verify.html`.

**Desktop, two-axis mask 11/91 and 8/90 — PASS.** Both subjects clear of the fades. Faces,
Carli's raised hand and hair all well inside the opaque region. Dylan's outer shoulder
enters the left fade and reads as an intentional soft edge.

**Mobile, vertical-only mask 8/88 — PASS.** `object-fit:cover` crops the sides heavily,
because a 3:2 landscape source into a 342x460 portrait box discards a lot of width. Both
outer arms are hard-cut at the container edge, since mobile has no horizontal fade. Both
faces and Carli's hand remain intact. Tight but sound.

## Finding: the bio crops have no destination

`dylan_bio_v01.png` and `carli_bio_v02.png` are both 2600x3250. There is **no bio image slot
in the page**. `os-founder-notes` is text only, and no CSS defines a founder bio portrait
container, height or `object-fit`.

So those crops are being produced against a slot that does not exist yet. They cannot be
in-page verified, because there is no page to verify them in. Carli v02 was verified against
the *story hero* treatment, which is the nearest existing analogue, not its eventual home.

This is worth surfacing before more bio crops are cut: the container decides the crop, and
right now the container is undefined. Deciding the slot geometry first would avoid re-cutting.

## Standing

Not a client review pass, which remains Nate's. This verifies framing survives the
production CSS, nothing more.
