# Codex brief: stage, retouch and inspect MapleMoon photography

Written 2026-08-03. Every step below was executed manually first on
`founders_portrait_v04.psd` and verified. This is a proven method, not a proposal.

## Method, already solved. Do not re-diagnose.

Screen capture over SSH silently returns wallpaper and menu bar with exit code 0 and no
error. macOS grants Screen Recording to the responsible process, which over SSH is
`sshd-keygen-wrapper`, and a grant cannot reach an already-running `sshd`. Terminal.app
holds the grant. Route screen work through the GUI session:

```sh
ssh imac 'printf "#!/bin/zsh\n<cmd>\nexit 0\n" > /tmp/cap.command
          chmod +x /tmp/cap.command; open -a Terminal /tmp/cap.command'
```

**Run ExtendScript by file, not by osascript:**

```sh
ssh imac "cat > /tmp/x.jsx" <<'JSX'
...
JSX
ssh imac 'open -a "Adobe Photoshop 2026" /tmp/x.jsx'
```

`open -a` avoids the Apple Events consent path entirely. Allow ~25s for Photoshop to run
a script on a 575 MB document. Have the script write its own log to `/tmp` and read that,
because `open` returns immediately and tells you nothing.

**Export pattern, verified non-destructive.** Duplicate, flatten, convert, save the
duplicate, close without saving. The original PSD's hash and mtime were confirmed unchanged
across a full export.

```js
var target = null;
for (var i = 0; i < app.documents.length; i++) {
  if (app.documents[i].name == NAME) { target = app.documents[i]; break; }
}
var d = target.duplicate();
d.flatten();
d.convertProfile("sRGB IEC61966-2.1", Intent.RELATIVECOLORIMETRIC, true, true);
d.saveAs(new File(OUT), new PNGSaveOptions(), true, Extension.LOWERCASE);
d.close(SaveOptions.DONOTSAVECHANGES);
```

Address documents **by name**. `app.activeDocument` exports whatever is frontmost and will
silently export the wrong file once more than one document is open.

## Four corrections learned from the trial

1. **PNG exports are untagged.** `sips -g profile` reports `<nil>`. Do not check for an
   embedded sRGB profile, it will always fail. Verify the *document's* profile before
   export instead. Untagged PNG is treated as sRGB by browsers.
2. **File sha256 does not prove image identity.** Two exports of the same document gave
   identical pixels and different file hashes, same byte size, metadata only. If a receipt
   is meant to prove "same image", hash the decoded pixel data, not the file.
3. **PIL is not installed on the iMac.** Pixel-level comparison runs on the MacBook after
   transfer. On the iMac you have `sips` only.
4. **Allow real time.** Photoshop scripting on this document takes ~20s. Scripts that poll
   too early report a missing file.

## Phase 0 - STAGE. Do this, then stop.

Selects go in `~/MapleMoon-Photoshop-Work/_INBOX/` on the iMac. Deliberately not
Drive-synced: Photoshop over a sync client causes locks and corrupt saves. Integrity comes
from receipts instead.

For each image create:

```
~/MapleMoon-Photoshop-Work/<slug>/inputs/   untouched original, never written to
~/MapleMoon-Photoshop-Work/<slug>/work/     the PSD you edit
~/MapleMoon-Photoshop-Work/<slug>/review/   exports and crops
```

Record sha256 of every original in `inputs/` before touching anything. Report the queue as
a numbered list and **stop**. Do not begin editing.

## Phase 0b - DIRECTION. No edit begins without one.

Each image needs a written direction from Nate, or a named reference image, stating what
should change. An image with neither is `AWAITING-DIRECTION` and is skipped. Do not invent
a direction from what the photo looks like.

## Per image

Loop until the measured checks pass and no defect remains, or the defect count fails to
fall between two consecutive rounds. Hard cap 4 rounds.

Each round:

1. Export a full-resolution sRGB PNG to `review/round-N.png`.
2. **Guard.** If the PSD mtime changed since the round began, ABORT that image and report
   it. Something else is writing to the file.
3. **Measured checks**, trustworthy from a report: pixel dimensions match the brief; the
   source document's profile is sRGB; highlight and shadow clipping below threshold from
   the histogram; the file opens and is not truncated.
4. **Judged checks**, require looking at 1:1 crops, never a downscale: edge quality where
   subject meets background; texture retained, not plasticky; gradient smoothness, no
   banding; nothing introduced at frame edges. Choose crop regions from the actual content
   of each image and say why. Report what you see, not whether it is good.
5. Log every defect with region, description, and `PARAMETRIC` or `HAND`.
6. Amend `PARAMETRIC` defects only, by script. Never attempt `HAND` work.

## Termination

Finish each image as exactly one of `READY-FOR-NATE`, `NEEDS-HAND-WORK`,
`AWAITING-DIRECTION`, `ABORTED`.

Never write DONE, APPROVED or PASS. Those are Nate's words. An agent may pre-screen so his
pass is short and informed. An agent may not record the pass.

## Receipts

Per round: pixel-data hash of the export, the defect log, the 1:1 crops examined. At the
end, one contact sheet at a path you state explicitly, so Nate judges the set in a single
pass rather than image by image.

## Never

Save or overwrite any PSD or original. Touch `docs/client-review/*/staging-v1/`. Wire
imagery into any page, manifest or template. Extend the FOUNDER-V04 packets. Reboot or
restart `sshd`.

## Report back, short, then stop

One line per image: filename, rounds used, terminal state. The contact sheet path. The
single question you most need Nate to answer.

## Trial already completed on founders_portrait_v04.psd

Do not redo it. Export verified at 6000x4000, pixels identical to the committed master
`_wip/masters/founder-v04-master.png`, pixel hash `517683f0`. PSD confirmed untouched,
`53a9fe71`, mtime 2026-08-02 22:50:31. Two 1:1 crops inspected. Observations for Nate,
not verdicts: grain is heavy and uniform, present in the flat backdrop as well as skin,
consistent with deliberate added grain rather than sensor noise; no halo or matte line
where hair or beard meets the backdrop; skin texture retained; the two subjects differ in
apparent sharpness.
