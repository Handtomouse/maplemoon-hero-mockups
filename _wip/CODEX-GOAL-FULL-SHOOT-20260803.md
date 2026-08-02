# /goal — Maple Moon shoot: develop, cut and prove every frame

Paste everything below the line after `/goal`. Execute on the **iMac**. Never stop and wait.
If you are blocked, take an idle task from the queue at the bottom and keep going.

---

**GOAL: take all 160 frames of the 2026-05-24 studio shoot from RAW to proven, page-ready
imagery, with every output verified against the real production CSS, and nothing wired.**

## Non-negotiables

- **All processing on the iMac.** Never process RAW or run Photoshop on the MacBook.
- **Branch isolation.** `git checkout -b codex/founder-selects-20260803` and stay on it. One
  commit per image. Never merge. Never touch `main` or `docs/client-review/*/staging-v1/`.
- **Nothing gets wired.** No page, manifest or template is edited. Wiring is a separate
  decision that costs Nate the send date.
- **You never write DONE, APPROVED or PASS.** Those are Nate's words. You pre-screen so his
  pass is short. Writing a pass on his behalf corrupts every gate downstream of it.

## Read first, do not re-diagnose

`_wip/HANDOFF-FOUNDER-IMAGERY-20260803.md`. It records solved ground: the Terminal bridge for
screen work and `CloudStorage` reads, the Photoshop scripting export, the three stacked crops,
and that the RAWs carry no orientation metadata so rotation must be inferred per frame.

`_wip/CODEX-PACKAGE-FOUNDER-SELECTS-20260803.md`. The five approved selects and why.

## Source

```
~/Library/CloudStorage/GoogleDrive-hello@handtomouse.org/My Drive/Maple Moon RAWs - Photography Shoot
```

160 Sony ARW, three bodies of work: **1-49** styled product on blue, **50-109** founder
portraits, **110-160** packshots and unwrapped product. Frame number is index in sorted order.

## Order of work. Do not reorder.

1. **The five approved selects first.** 55 pair hero, 70 hands detail, 87 Carli bio, 94 Dylan
   bio, 97 editorial standing. Already staged at `~/MapleMoon-Photoshop-Work/SELECT-*`.
   Sources verified as 595, 706, 816, 843, 858. Finish these before anything else.
2. **The rest of 50-109**, the portraits.
3. **110-160**, packshots and unwrapped.
4. **1-49**, styled product last. Note: the imagery goal brief defers Shop and product
   imagery. Process them, but flag that deferral in your report rather than assuming it lapsed.

## Per image

1. Develop from RAW with `sips`. macOS reads ARW natively.
2. Infer rotation from content, per frame. There is no orientation metadata; `mdls` returns 0
   for all 160 and two rotate passes were verified no-ops. Never blanket-rotate a range.
3. For bios, cut 4:5 **with deliberate headroom above the head**. The slot is decided in
   `_wip/evidence/DECISION-FOUNDER-BIO-SLOT-GEOMETRY-20260803.md`. Dylan governs it: if a crop
   only just fits him, it is wrong.
4. Export sRGB. Photoshop work uses `open -a "Adobe Photoshop 2026" /tmp/x.jsx`, address
   documents **by name** not `app.activeDocument`, duplicate, flatten, convert, saveAs the
   duplicate, close without saving. Never save over a PSD or an original.
5. **Objective checks**, all must pass: source sha256 unchanged; correct dimensions; opens and
   is not truncated; highlight and shadow clipping below threshold.
6. **In-page proof at 1440 and 390**, using the existing harnesses
   `_wip/evidence/carli-inpage-verify.html`, `carli-inpage-verify-390.html`,
   `pair-inpage-verify.html`. Swap the `src`. A proof rendered without the production mask and
   `object-position` is void; that mistake has already been made once.
7. `node scripts/check-maplemoon-portrait-crop.mjs` must exit 0.
8. Amend only parametric defects, by script. Never attempt hand retouching. If a defect needs
   hand work, record it and move on.

Loop an image until its objective checks pass and the defect count stops falling between two
consecutive rounds. Hard cap 4 rounds, then move on with its state recorded.

## Reporting. This is how Nate and Claude Code watch you cheaply.

Append **one tab-separated line per image** to `_wip/evidence/SHOOT-STATUS.tsv`, and nothing
else. No prose reports, no new packets, no dispatch documents.

```
frame<TAB>role<TAB>output_path<TAB>WxH<TAB>rounds<TAB>state<TAB>note
```

`state` is one of `READY-FOR-NATE`, `NEEDS-HAND-WORK`, `SKIPPED`, `ABORTED`.
`note` is at most ten words. Commit the file every ten images.

That file is the entire monitoring surface. Do not write status anywhere else.

## Storage discipline

Do not produce uncompressed TIFFs. Five already exist at 144 MB each, 720 MB total, which
nothing asked for. Delete them and use sRGB PNG or JPEG. Full-resolution masters go in
`_wip/masters/`, which is gitignored, with a sha256 receipt in `_wip/evidence/`. Never commit
a master.

## Idle queue. Take these when blocked, never stop.

1. Rotate the 160 proxies in `~/MapleMoon-Photoshop-Work/_INBOX/proxies` from content, one at
   a time, and rebuild `CONTACT-SHEET.html`.
2. Build a separate contact sheet per body of work: product-blue, portraits, packshots.
3. Re-verify the already-accepted assets at 1440 and 390 and record any drift.
4. Extend `scripts/check-maplemoon-portrait-crop.mjs` to cover the bio slot once bios exist.
5. Write per-image direction stubs marked `AWAITING-DIRECTION` for anything you cannot judge.
6. Checkpoint the branch.

Never invent a new packet, register or coordination scheme to fill idle time. That is the
failure mode to avoid.

## Escalate, do not guess

If a frame needs a decision you cannot make, mark it `AWAITING-DIRECTION` in the TSV and keep
going. Never invent a creative direction from what a photo looks like.
