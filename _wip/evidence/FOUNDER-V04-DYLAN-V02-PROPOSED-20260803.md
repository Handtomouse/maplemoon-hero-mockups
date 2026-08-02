# Dylan v02 proposed: headroom added, verified at both treatments

2026-08-03, Claude Code verification lane. **A proposal, not a decision.** The bio slot
aspect is still undefined; this crop is chosen to survive the plausible range rather than to
settle it.

## Bounds

`x=200 y=250 w=2400 h=3000` from `_wip/masters/founder-v04-master.png` (pixel hash
`517683f0`). 4:5, matching Carli v02's ratio. Right edge 2600, clear of Carli's crop which
starts at 2750, so it contains no Carli pixels.

Versus v01, which clipped: roughly 264px of headroom now sits above the top of his head.

## Verified

Rendered via `dylan-v02-verify.html` under the production rules.

- **Desktop, 560x520, two-axis mask — PASS.** Full head visible with clearance above,
  inside the opaque region. The clipping in v01 is gone.
- **Mobile, 342x460, vertical-only mask — PASS.** Head clear of the top fade with margin.

## Why 4:5 and not something tighter

Dylan governs the shared slot because he frames tighter than Carli. A crop that only just
survives one container aspect will fail the moment the slot is redesigned. This one holds
from 4:5 through to noticeably wider before his head approaches an edge.

## Still open

The bio slot geometry. Once its aspect is fixed, both bios should be cut to it directly
rather than to a proxy. Output file: `dylan_bio_v02_PROPOSED.png`, named so it cannot be
mistaken for an accepted asset.
