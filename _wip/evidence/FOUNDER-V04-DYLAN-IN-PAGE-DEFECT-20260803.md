# Dylan v01 in-page: head clipped at the desktop treatment

2026-08-03, Claude Code verification lane. Companion to the Carli and pair receipts.

## Result

`dylan_bio_v01.png` (2600x3250) rendered under the production rules via
`dylan-inpage-verify.html`.

**Desktop, 560x520 box, two-axis mask — DEFECT.** The top of Dylan's head is clipped by the
container edge and what remains sits inside the top fade (opaque only from 8%). His face is
intact; the crown is not. `object-fit:cover` scales to fill width, and his crop carries
almost no headroom, so the excess is taken off the top.

**Mobile, 342x460, vertical-only mask — PASS.** The taller box suits the 4:5 crop. His head
clears the top fade with margin, sides are hard-cut well outside him.

## Caveat that matters

There is still no bio image slot in the page. This was rendered against the *story hero*
treatment as the nearest existing analogue. So this is not proof that Dylan fails in his
eventual home, it is proof that his crop has so little headroom that any container wider
than roughly 4:5 will cut his head.

## Implication

Carli v02 and Dylan v01 are both 2600x3250 but frame very differently: Carli sits low with
space above, Dylan fills the frame to the top. They will not behave the same in one shared
container. If both bios use one slot geometry, Dylan governs it, and he needs headroom added
at the crop stage rather than compensated for in CSS.

Recommend settling the bio slot aspect first, then re-cutting Dylan with headroom to suit.
