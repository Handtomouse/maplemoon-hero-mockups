# SAT-HOME-CAROB-HORIZONTAL-BALANCE-01 — read-only intake response
# Written: 2026-08-02 · macbook Claude Code (worker)
# STATUS: PROPOSAL. Nothing edited, rebuilt, committed, pushed or sent.
#         Main must approve before any mutation. CR-0 remains Nate's alone.

## 1. ACK

Intake received and verified against the repo. All three cited references exist.
Two corrections follow; both are material to how the packet should be written.

## 2. Corrections to the intake

**(a) The feedback record is 5 days old and cites a different file.**
`ms49rup1d3dn` in `_wip/_feedback/log.jsonl` (record 16 of 16) is timestamped
`2026-07-28T06:23:16.261Z`, and its `url` field is `/_wip/homepage_real_1_lead_photo.WIP.html`
— the WIP source, **not** the frozen review package. The intake presents it as though it
were raised against the review artifact.

It **transfers regardless**: the identical declaration exists in the generated package at
`staging-v1/clean/homepage.html:1778`. But the packet should cite the record accurately,
because a reviewer checking the provenance will otherwise find a mismatch.

Verified fields: `sel` = `#carob`, `priority` = `P0 · blocks review`, `status` = `Observed`,
`note` = "everything is too far to the left", `vw` = 1158, `viewport` = desktop,
`rect` = {x:0, y:1330, w:1158, h:600}.

**(b) The 2 August 11:00pm screenshot was never received by this session.**
No image has been pasted into this conversation. The diagnosis below rests entirely on the
source, not on the screenshot. If the screenshot shows something the CSS does not explain,
that is new information and this packet does not cover it.

**Verified as stated:** `docs/orchestration/GOV-01_RATIFIED_LEDGER.md:81` reads
`| ms49rup1d3dn | Carob section horizontal balance | open |`. Adjacent line 80 records
`ms48ubrlulgr | Carob learn-more CTA strategy | open`, matching the related note.

## 3. Diagnosis — cascade-order bug, desktop only

Section binding confirmed: `<section class="wf-what1" id="carob">`.

The offending rule is at **top level, inside no media query**:

    .wf-what1 .inner{position:relative;z-index:2;display:block;width:100%;padding:0;background:transparent;}

Brace-depth analysis of every `.wf-what1 .inner` padding declaration in the generated file:

| line | media context | padding |
|---|---|---|
| 1674 | `@media(max-width:900px)` | `48px clamp(20px,7vw,56px) 54px` |
| 1680 | `@media(max-width:600px)` | `36px 20px 42px` |
| **1778** | **TOP LEVEL — applies at every width** | **`0`** |
| 1837 | `@media(max-width:900px)` | `44px clamp(20px,7vw,56px) 54px` |
| 1865 | `@media(max-width:600px)` | `36px 20px 42px` |

All five share specificity (0,2,0), so source order decides. Lines 1837 and 1865 follow 1778
and win at ≤900px and ≤600px. **Above 900px nothing follows 1778, so `padding:0` stands** and
the section's eyebrow, heading, rule, paragraph, facts row and CTA sit flush against the left
viewport edge.

This matches the report exactly: captured at `vw: 1158`, `rect.x: 0`.

Note the baseline rule at line 472 — `.wf-what1 .inner{position:relative;z-index:2;width:100%;}`
— declares no padding either. **Deleting `padding:0` alone may therefore not fix it**; a
desktop inset probably has to be added, matched to the horizontal rhythm of adjacent sections
rather than invented.

## 4. Why our own evidence missed it — disclose this

All CR-0 evidence gathered so far was captured at **≤720px layout width**:

- keyboard traversal, 5 pages, literal **390** CSS px (`IMAC-KEYBOARD-PROOF-20260802`)
- 200% zoom pre-screen, 6 pages, **720** CSS px layout viewport (`CR0-PRESCREEN-20260802`)

Both sit **below the 900px breakpoint**, so both exercised the padded variant and could not
have surfaced this. **The CR-0 evidence pack contains no coverage above 900px at all.**

Treat all desktop widths across the whole six-page package as **UNREVIEWED**. The same
cascade pattern may exist in sibling sections; nothing has ruled it out.

## 5. Smallest Homepage-only correction packet

**`SAT-HOME-CAROB-HORIZONTAL-BALANCE-01`**

- **Objective:** restore horizontal inset for `.wf-what1 .inner` above 900px so the `#carob`
  section shares the left inset of adjacent sections.
- **Size:** one declaration.
- **Hard constraint:** ≤900px and ≤600px rendering must be byte-unchanged. Those widths are
  correct today and are covered by existing evidence.
- **Explicitly OUT of scope:** the Learn More CTA strategy (`ms48ubrlulgr`) and pod-callout
  positioning. Both are same-section, neither is P0, and bundling them converts a one-line
  correction into a design review. Raise separately.
- **Forbidden:** inventing product, ingredient, origin, taste, packaging, price, availability
  or commerce content. This is a layout correction only; no copy changes.

## 6. Exact writable paths

    _wip/homepage_real_1_lead_photo.WIP.html      line 1889      ← the only edit

**Not** `staging-v1/clean/homepage.html`. That file is generated:
`scripts/build-maplemoon-saturday-review.py:30` maps
`_wip/homepage_real_1_lead_photo.WIP.html` → `homepage.html`. A direct edit there is
discarded on rebuild and breaks the freeze.

Regenerated as build output, never hand-edited:

    staging-v1/clean/homepage.html
    staging-v1/annotated/homepage.html
    staging-v1/MANIFEST.json, clean/MANIFEST.json, annotated/MANIFEST.json

## 7. Required non-overwriting recovery gate

- Phase-start receipt via `scripts/check-maplemoon-receipt.py` capturing exact writable scope
  and pre-mutation bytes.
- Pre-hashes recorded for the WIP source and all three manifests.
  Current: `clean/MANIFEST.json` = `d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20`,
  `annotated/MANIFEST.json` = `3be3c0f2df4658558c667b3e9cc6d55966d6a1d7ce9fa9874c46a0afc44244c7`.
- Checkpoint written under `_wip/checkpoints/` **before** any mutation, and it must not
  overwrite an existing checkpoint directory.
- **Critical:** `staging-v1/` is gitignored (`.gitignore:34`) with **zero tracked files**. The
  artifact has no committed copy, so the checkpoint is the only rollback path in existence.
  Confirm the checkpoint exists and is readable before touching the source.
- One off-machine replica currently exists at
  `/Volumes/handtomouse/maplemoon-website/…/staging-v1/` (iMac, SMB). Incidental, not a
  managed backup.

## 8. Required QA before promotion

**Rendered — must include >900px, which no prior evidence covers:**

| width | check |
|---|---|
| 1440 | `#carob` eyebrow, heading, rule, paragraph, facts row, CTA share the left inset of adjacent sections |
| 1280 | same |
| 901 / 900 | both sides of the breakpoint, proving the fix does not shift the boundary |
| 390 | unchanged from current — regression check, not a fix check |

**Keyboard — genuine OS-level Tab, not synthesized events:**

- 1440px and 390px, full ordered stop lists retained
- `document_hasFocus` asserted true at start AND end; abort as UNVERIFIED if focus is lost
- zero focus leaks into the closed `#mmCartDialog`; zero zero-size stops
- **Method matters:** `osascript` key events plus CDP `Page.bringToFront`. Activation by app
  name silently targets the wrong window when two Chrome instances share a bundle id — that
  was the root cause of every earlier traversal failure, including on this machine.
- Working harness: `_wip/evidence/IMAC-KEYBOARD-PROOF-20260802/HARNESS.py`

**Do not substitute static DOM analysis for a traversal.** It cannot observe tab order, wrap
behaviour or focus traps.

## 9. Fresh session launch block

Paste everything below the line into a new session.

---

    MapleMoon — homepage correction session. Read fully before acting.

    Repo /Users/handtomouse/maplemoon-website, branch codex-maplemoon-section-review.
    If your path contains .codex/worktrees/, STOP and switch to the live repo.

    READ FIRST:
      _wip/evidence/CAROB-HORIZONTAL-BALANCE-INTAKE-20260802.md   (this file)
      _wip/evidence/PROJECT-POSITION-AND-PLAN-20260802.md
      _wip/evidence/CLOSURE-DECISION-20260802.md
      CLAUDE.md and AGENTS.md   (Codex is lock custodian; Claude Code is a worker)

    STATE: CR-0 is in progress. Nate is reviewing the frozen six-page package
    section by section. One P0 defect is confirmed:

      ms49rup1d3dn — #carob section, "everything is too far to the left"
      Cause: .wf-what1 .inner{padding:0} at TOP LEVEL (no media query),
      WIP source line 1889 / generated homepage.html line 1778.
      Rules restoring padding sit inside max-width:900px and follow it, so the
      defect is DESKTOP ONLY (>900px). GOV-01 ledger line 81 records it open.

    CRITICAL GAP: all existing CR-0 evidence was gathered at <=720px layout
    width (keyboard 390, zoom pre-screen 720). Nothing above 900px has ever
    been tested. Treat ALL desktop widths across ALL six pages as UNREVIEWED.

    YOUR JOB: walk Nate through the package section by section, page by page,
    at DESKTOP width first. He looks and reacts in whatever words he likes;
    you record and classify into bounded-fix vs deeper-work. Do not fix
    mid-pass. Do NOT record CR-0 — that is Nate's alone, and every downstream
    gate inherits it.

    DO NOT edit staging-v1/, docs/orchestration/, scripts/, .gitignore or
    LOCK_MANIFEST.json. Write only inside _wip/evidence/.

    Serve: python3 -m http.server 3011 --bind 127.0.0.1 from
    docs/client-review/2026-08-01-saturday-review/staging-v1/clean/
    Verify clean/MANIFEST.json = d1c66b1d... before reviewing anything.
    A review of a drifted artifact is void.

---

## 10. Authority

Proposal only. No verdict recorded, nothing promoted, no file outside `_wip/evidence/`
written. Main must approve `SAT-HOME-CAROB-HORIZONTAL-BALANCE-01` before any mutation.
CR-0 through CR-4 remain reserved to Nate.
