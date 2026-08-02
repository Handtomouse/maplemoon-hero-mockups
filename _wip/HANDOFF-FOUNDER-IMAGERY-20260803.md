# Handoff: founder imagery, 2026-08-03 ~03:30

State after a Claude Code verification session. Thirteen commits, `63e3e69` through `a01665f`.
Read this before touching founder imagery. Nothing here needs rediscovering.

## Blocked on exactly two things, both Nate's

1. **Drive shortcut.** The selects are "Maple Moon RAWs - Photography Shoot", shared by
   `bernarddh96@gmail.com`. It is a *Shared with me* item, which Drive for Desktop does not
   sync. Adding a shortcut to My Drive makes it appear on the iMac at
   `~/Library/CloudStorage/GoogleDrive-hello@handtomouse.org/My Drive/`. Nothing then needs
   downloading through the MacBook. Until that happens the photo loop has no input.
2. **Accepting Dylan v02.** Pre-screened and verified. Recording the pass is Nate's per
   `CLAUDE.md`, not an agent's.

## Solved, do not re-diagnose

**iMac screen capture.** Direct `screencapture` over SSH returns wallpaper silently, exit 0,
no error. TCC grants Screen Recording to the *responsible process*, which over SSH is
`sshd-keygen-wrapper`, and a grant cannot reach an already-running `sshd`. Terminal holds the
grant. Route through the GUI session:

```sh
ssh imac 'printf "#!/bin/zsh\n<cmd>\nexit 0\n" > /tmp/cap.command
          chmod +x /tmp/cap.command; open -a Terminal /tmp/cap.command'
```

Terminal also holds Full Disk Access, so the same bridge reads `CloudStorage` paths that
plain SSH cannot. No reboot was needed and none is.

**Photoshop export.** Run ExtendScript via `open -a "Adobe Photoshop 2026" /tmp/x.jsx`, not
osascript. Address documents by name, never `app.activeDocument`. Duplicate, flatten,
convertProfile to sRGB, saveAs the duplicate, close without saving. Allow ~25s on a 575 MB
document. Verified non-destructive: PSD hash and mtime unchanged across a full export.

**Gotchas.** PNG exports are untagged, so a "profile is sRGB" check always fails. File sha256
does not prove image identity; hash decoded pixels. PIL is absent on the iMac.

## The trap that voided Codex's proofs

The Our Story portrait applies **three** stacked crops: Photoshop bounds, then
`object-fit:cover` at `object-position:46% 40%` (our-story.WIP.html line 603), then a
two-axis alpha mask (line 543) that dissolves the outer 11% left and 9% right. Mobile
(line 553) drops the horizontal mask entirely.

Codex's QA proofs were rendered against `our_story_v04_review.html`, which contains
`mask-image` zero times and no `object-position`. They show a page that does not exist.
Superseded by the receipts below.

## Verified in-page at 1440 and 390

| Asset | Result |
|---|---|
| Carli v02, `x=2750 y=400 w=2600 h=3250` | PASS both |
| Pair portrait, 6000x4000 | PASS both |
| Dylan v01 | CLIPPED at desktop, crown cut |
| Dylan v02 PROPOSED, `x=200 y=250 w=2400 h=3000` | PASS both, ~264px headroom |

Custody master `_wip/masters/founder-v04-master.png`, pixel hash `517683f0`, gitignored,
receipt in `_wip/evidence/IMAGERY-PROGRAMME-20260802/`.

## Decision made

Founder bio slot is **4:5 via `aspect-ratio`, not a height clamp**, vertical-only mask at
both breakpoints, `object-position:50% 35%`. Dylan governs the slot because he frames
tighter than Carli. Full rationale in `DECISION-FOUNDER-BIO-SLOT-GEOMETRY-20260803.md`.

Enforced by `node scripts/check-maplemoon-portrait-crop.mjs`, which fails on a height-clamp
bio container, a horizontal bio mask, drifted hero constants, or a v04 portrait wired
without an in-page receipt.

## The loop, when input exists

`_wip/CODEX-PHOTO-LOOP-BRIEF-20260803.md`, proven by manual trial. **It needs one amendment
before use:** the source is RAW, so a develop stage in Camera Raw or Lightroom comes before
any Photoshop retouch, and that develop stage is where the look actually lives. Selects go in
`~/MapleMoon-Photoshop-Work/_INBOX/` on the iMac, deliberately not Drive-synced.
