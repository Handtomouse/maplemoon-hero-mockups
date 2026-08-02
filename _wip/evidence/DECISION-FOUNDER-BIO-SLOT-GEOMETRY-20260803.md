# Decision: founder bio image slot geometry

2026-08-03, Claude Code. A design decision, made rather than deferred, so bio crops stop
being cut against a guess. Overrule it if you disagree; do not leave it undefined.

## Decision

**The founder bio slot is 4:5 portrait.** Both bios are cut to 2400x3000 or larger at that
ratio, and the container matches it.

```css
.os-founder-bio{position:relative;aspect-ratio:4/5;max-width:420px;margin:0;overflow:visible}
.os-founder-bio img{width:100%;height:100%;object-fit:cover;object-position:50% 35%;
  -webkit-mask-image:linear-gradient(180deg,transparent 0,#000 8%,#000 90%,transparent 100%);
  mask-image:linear-gradient(180deg,transparent 0,#000 8%,#000 90%,transparent 100%)}
```

## Why 4:5

Dylan governs the slot. He frames tighter than Carli, so a ratio that suits her clips him,
which is exactly what `FOUNDER-V04-DYLAN-IN-PAGE-DEFECT-20260803.md` recorded. 4:5 is the
widest ratio at which his head clears with margin, verified in-page at both breakpoints. It
also matches the ratio Codex already cut both bios to, so nothing needs re-cutting except
Dylan, whose v02 proposal is already made and verified.

## Why aspect-ratio, not a height clamp

The story hero uses `height:clamp(...)`, which is why its container goes landscape at desktop
and portrait at mobile, and why the same asset frames differently at each. For bios that is a
defect, not a feature: a face should not reframe between breakpoints. `aspect-ratio:4/5` holds
the framing constant, so one crop is correct everywhere and only one verification is needed.

## Why vertical-only mask at both breakpoints

The story hero fades horizontally on desktop and hard-cuts on mobile, so the edge treatment
changes between breakpoints. On a face that reads as an inconsistency. Vertical-only at both
sizes keeps it uniform, and with `aspect-ratio` fixed there is no horizontal overflow to hide.

## `object-position: 50% 35%`

Centred horizontally, biased up so the crop favours the head rather than the chest. Both
subjects look upward in these frames, so the visual weight sits high.

## Consequences

- Dylan v02 (`x=200 y=250 w=2400 h=3000`) becomes the accepted geometry, not a proposal,
  once someone with authority to accept it says so. That is not me.
- Carli v02 (2600x3250) is already 4:5 and needs no re-cut.
- `scripts/check-maplemoon-portrait-crop.mjs` guards the story hero only. If bios are wired,
  it should be extended to cover the bio slot too.
