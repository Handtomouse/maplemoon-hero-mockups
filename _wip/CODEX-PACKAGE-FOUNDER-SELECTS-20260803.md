# Codex package: cut the five approved founder selects

Approved by Nate 2026-08-03. Execute on the **iMac**. Work on a **dedicated branch** so the
main tree stays clean. Claude Code verifies each output and drives; you produce.

Read `_wip/HANDOFF-FOUNDER-IMAGERY-20260803.md` first. Do not re-diagnose anything in it.

## Branch

```sh
git checkout -b codex/founder-selects-20260803
```

One commit per select. Do not merge. Do not touch `main` or the frozen package. If you use
sub-sessions or worktrees per select, keep them under `.claude/worktrees/` and land them on
this one branch.

## The five selects

Source folder on the iMac, readable **only through the Terminal bridge**, plain SSH cannot
read `CloudStorage`:

```
~/Library/CloudStorage/GoogleDrive-hello@handtomouse.org/My Drive/Maple Moon RAWs - Photography Shoot
```

| # | Source file (`.arw`) | Role | Output |
|---|---|---|---|
| 55 | `20260524 Maple Moon - Studio Session-595` | Our Story pair hero | full frame, no crop |
| 70 | `20260524 Maple Moon - Studio Session-706` | hands passing carob pod, section break | full frame, no crop |
| 87 | `20260524 Maple Moon - Studio Session-816` | **Carli bio** | 4:5 crop |
| 94 | `20260524 Maple Moon - Studio Session-843` | **Dylan bio** | 4:5 crop |
| 97 | `20260524 Maple Moon - Studio Session-858` | editorial standing, brand image | full frame, no crop |

Stage each as `~/MapleMoon-Photoshop-Work/SELECT-<n>-<role>/` with `inputs/`, `work/`,
`review/`. Record `shasum -a 256` of every source in `inputs/` before any processing. Never
write to `inputs/`.

## Why 87 and 94 rather than re-cutting v04

Both bios were being cut from one pair frame, which is why Dylan clipped: he was never
composed as a subject. There are no solo frames in this shoot. 87 has Carli foreground with
Dylan soft behind, so it crops like a portrait. 94 is a close two-shot where Dylan's face is
large with space above his head. This fixes the clipping at source rather than rescuing it in
CSS. `dylan_bio_v02_PROPOSED.png` is superseded once 94 lands.

## Bio crop rule

The founder bio slot is **4:5 via `aspect-ratio`**, decided in
`_wip/evidence/DECISION-FOUNDER-BIO-SLOT-GEOMETRY-20260803.md`. Cut 87 and 94 to 4:5 with
**deliberate headroom above the head**, not a tight face crop. Dylan governs the slot; if a
crop only just fits him, it is wrong.

## Method, already proven, do not vary it

- Develop RAW with `sips`. macOS reads Sony ARW natively, verified.
- Anything in Photoshop: `open -a "Adobe Photoshop 2026" /tmp/x.jsx`, address documents **by
  name** not `app.activeDocument`, duplicate, flatten, convert to sRGB, saveAs the duplicate,
  close without saving. Never save over a PSD or an original.
- Screen work goes through `open -a Terminal /tmp/x.command`. Direct `screencapture` over SSH
  returns wallpaper silently with exit 0.
- Portrait frames carry **no orientation metadata**. `mdls` returns 0 for all 160 and both
  rotate passes were verified no-ops. Rotate from content, per frame, on these five only.

## Acceptance, per output

1. Source sha256 recorded and unchanged after processing.
2. Exported sRGB, correct dimensions, opens and is not truncated.
3. **In-page verified at 1440 and 390.** Reuse the harnesses already built:
   `_wip/evidence/carli-inpage-verify.html`, `carli-inpage-verify-390.html`,
   `pair-inpage-verify.html`. Swap the `src`. A proof rendered without the production mask
   and `object-position` is void.
4. `node scripts/check-maplemoon-portrait-crop.mjs` exits 0.

Finish each as `READY-FOR-NATE` or `NEEDS-HAND-WORK`. Never DONE, APPROVED or PASS.

## Report back, short, then stop

One line per select: number, role, output path, dimensions, terminal state. Then stop.
Claude Code verifies before anything is wired. Nothing is wired in this package.

## Do not

Merge the branch. Touch `docs/client-review/*/staging-v1/`. Wire imagery into any page,
manifest or template. Extend the FOUNDER-V04 packets. Reboot or restart `sshd`. Process any
frame outside these five; the other 155 are not approved.
