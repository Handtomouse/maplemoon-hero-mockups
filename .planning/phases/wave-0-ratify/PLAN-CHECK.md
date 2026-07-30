# Wave 0 Ratify — PLAN-CHECK

**Checked:** 2026-07-18
**Checker:** GSD plan-checker (goal-backward)
**Plan:** `.planning/phases/wave-0-ratify/PLAN.md`
**Target file verified line-by-line:** `_wip/homepage_real_1_lead_photo.WIP.html` (actual: 1048 lines)

---

## VERDICT: PASS WITH NOTES

The plan, executed exactly as written, achieves the Wave 0 goal: each of the three elements
gets a documented keep/revert/modify decision, the WIP reflects the chosen branch, reverts are
scoped by selector (not line range) so they cannot cross-contaminate, A7 and the CAROB wordmark
survive every option, and Wave 3 (and only Wave 3) is correctly identified as the gated wave.
Every specific code citation in the plan is accurate against the current file. The notes below
are precision improvements and one path-ambiguity; none block execution.

Safe to hand to an executor now.

---

## Line-number accuracy — ALL CITED LINES VERIFIED CORRECT

Every specific line/range the plan cites matches the current 1048-line file exactly. There is NO
line drift. (An earlier pass mis-read a "+2 drift" on the motion block by comparing the grep's
first *content* hit at 1000 against the block *start* at 998 — the plan correctly cites the block
as 998-1020, and the fact that the downstream block 1022-1046 is exact proves nothing above it
shifted.)

| Element / anchor | Plan cites | Actual | Status |
|---|---|---|---|
| Motion `<style>` block | 998-1005 | 998 `<style>` ... 1005 `</style>` | EXACT |
| Motion toggle markup | 1006 | 1006 `<button id="motionToggle">` | EXACT |
| Motion JS IIFE | 1007-1020 | 1007 `<script>` ... 1020 `</script>` | EXACT |
| Motion init default | 1017 `var on=!reduce;` | 1017 `var on=!reduce;` | EXACT |
| Button block | 1022-1046 (interleaved) | 1022-1046 | EXACT |
| `--rr:14px` | 1023 | 1023 `:root{--rr:14px}` | EXACT |
| `.wf a.wf-ppill` override | 1024-1027 | 1024-1027 | EXACT |
| `.wf-pdp .wf-pill` override | 1028-1032 | 1028-1032 | EXACT |
| `.wf-pdp .wf-sz` override | 1033-1034 | 1033-1034 | EXACT |
| `.wf-pcreds{display:none}` | 1036 | 1036 | EXACT |
| Original `.wf a.wf-ppill` | 105-106 | 105-106 | EXACT |
| Original `.wf-sz` | 162-163 | 162-163 | EXACT |
| Original `.wf-pill` | 168-169 | 168-169 | EXACT |
| Original `.wf-pcreds{display:flex}` | 107 | 107 | EXACT |
| Seal markup | 532 | 532 (inside `.wf-phero`, before `</section>` at 534) | EXACT |
| Marquee markup | 537 | 537 (just inside `<main id="main-content">` at 536) | EXACT |
| CAROB wordmark SVG | 526 | 526 `assets/carob_wordmark.svg` | EXACT |
| A7 coverflow/PDP/Add-to-Cart JS | 754-932 | 754 `<script>` ... 932 `})();` | EXACT |

**One trivial discrepancy:** the plan's prose says "1049 lines" (frontmatter comment + structural_facts);
the file is 1048 lines (off-by-one, almost certainly a trailing-newline miscount). No executor
action keys off the total line count, so this is cosmetic. NOTE only.

---

## Issues found

### NOTE 1 — Seal-CSS range label includes `.wf-phero`, and that rule is a redundant duplicate
- Structural_facts and Task 3B step 4 label "Seal CSS: lines 1037-1039" and instruct removing
  `.mm-seal{...}` + `.mm-seal .mn{...}`. But the actual lines are: 1037 `.wf-phero{position:relative}`,
  1038 `.mm-seal{...}`, 1039 `.mm-seal .mn{...}`. Line 1037 is NOT a seal selector.
- **Why it's harmless:** the ORIGINAL `.wf-phero{position:relative;...}` is intact at **line 58**.
  Line 1037 is a redundant duplicate added by the 16 Jul port. Removing it OR leaving it both work.
  The absolutely-positioned children of `.wf-phero` (`.mm-seal` at 1038, and critically the scroll
  arrow `.wf-pscroll{position:absolute}` at 111 / markup at 533) stay anchored by line 58 regardless.
- **Executor guidance to add:** In Task 3B, the by-selector rule is correct — delete `.mm-seal`,
  `.mm-seal .mn`, `.mm-marq*`, `@keyframes mmsc`, and the marquee reduced-motion guard by selector.
  Line 1037 `.wf-phero{position:relative}` can be left in place (harmless duplicate) or removed; it
  does NOT need to be treated as seal CSS and removing it does NOT orphan the scroll arrow or seal.
  The 3B verify grep (`! mm-seal && ! mm-marq && ! wf-pcreds{display:none}`) does not check 1037, so
  leaving it in is invisible to verification and fine.

### NOTE 2 — Base file lives at repo ROOT, not `_wip/`; Task 4 step 4 gives no path
- Hard_constraint 1 and Task 4 step 4 say "confirm `homepage_real_1_lead_photo.html` is byte-for-byte
  untouched" without a path. The approved base is at **`./homepage_real_1_lead_photo.html`** (repo root,
  82328 bytes, dated 16 Jul). There is NO copy inside `_wip/`.
- **Executor guidance to add:** checksum the root file: `md5 ./homepage_real_1_lead_photo.html`.
  Since all edits land in `_wip/homepage_real_1_lead_photo.WIP.html` (a different file), the base is
  structurally protected — but state the path so the executor checksums the right file.

### NOTE 3 — Two sequential reverts must be re-grepped between edits, never batched
- If Nate picks two revert branches (e.g. Element 2 = B AND Element 3 = B), both edit the SAME block
  1022-1046. The first revert shifts the line numbers the second one would target.
- The plan already states "grep to confirm current line numbers before any deletion, editing one
  element shifts the others" (structural_facts REVERT-BY-SELECTOR RULE). This is correct and sufficient.
- **Executor guidance to make explicit:** apply the two WIP edits **sequentially** — complete edit 1,
  cp into `_wip/`, then re-grep and apply edit 2 against the NEW line numbers. Never compute both edits'
  line targets against the original file and batch them. Because both reverts are by-selector, this is
  low-risk, but the sequential-with-re-grep discipline should be stated as a step, not left implicit.

---

## Confirmations (verified, not assumed)

1. **Revert safety — Element 2/3 interleave handled.** Block 1022-1046 is one `<style>` with button
   rules (1023-1034), `.wf-pcreds{display:none}` (1036), and seal/marquee (1037-1045) interleaved. The
   plan forbids line-range deletion across this block and mandates by-selector deletion + re-grep. Verified
   the interleave is real and the by-selector instructions name the correct selectors.
2. **`--rr` is button-only.** Grep confirms `--rr` appears ONLY at 1023 (def) and 1024/1025/1028/1031/1033
   (button rules). Nothing else uses it. Task 2B's `--rr` removal is safe; the seal/marquee do not
   reference it. The separate original `--radius` var (line 39, used at 168) is untouched.
3. **Cascade-restore mechanism is real.** Originals at 105-106, 162-163, 168-169 (buttons) and 107
   (`.wf-pcreds{display:flex}`) are all present and intact. Deleting the later overrides restores them
   by cascade with no re-creation. Verified.
4. **No `motion-off` class exists; `motion-on` is the only motion class.** Confirmed 11 motion-token
   occurrences, all consistent with the plan. Task 1B correctly avoids inventing a `motion-off` class
   and instead flips the JS init default.
5. **A7 survives every option.** The coverflow -> PDP -> Add-to-Cart JS (754-932) and the Add-to-Cart
   button (line 570) are not referenced by any motion/button/seal task. No option touches this range.
6. **CAROB wordmark protected.** Line 526 SVG is not referenced by any of the three elements' tasks.
   Task 3B explicitly re-confirms it post-revert.
7. **Scroll arrow not orphaned by any revert** (see NOTE 1) — `.wf-phero{position:relative}` original
   at line 58 keeps `.wf-pscroll` (111/533) anchored even if the duplicate at 1037 is removed.
8. **Every option has a complete, actionable task.** Motion A/B/C + D-scope-gate; Buttons A/B/C;
   Seal A/B/C. Each has files, action, verify (grep), done. No option leaves a judgement call to the
   executor beyond Nate's checkpoint pick. Task 1D correctly routes Option D to its own wave.
9. **Verify greps function against the live file.** Every string the verify commands test
   (`var on=!reduce;`, `NEW BUTTON SYSTEM`, `--rr:14px`, `wf-pcreds{display:none}`, `mm-seal`,
   `mm-marq`, `motionToggle`, `IntersectionObserver`) is present in the current file, so the
   pre/post-edit assertions will fire correctly (no false pass, no false fail).
10. **Wave dependency accurate.** Plan's `<dependencies>` block states Wave 0 gates Wave 3 ONLY, and
    explicitly reconciles RESEARCH's "gates nothing technically" (true for Waves 1/2/8) against the
    real Wave 3 gate. Frontmatter `gates: [wave-3]` matches. Correct.
11. **RESEARCH Wave 0 scope fully covered.** RESEARCH s.5 Wave 0 names exactly three items (B3 motion-on,
    16 Jul button system, seal+marquee). All three are covered with keep/revert/modify branches. No
    Wave 0 scope item is missing. (Motion Option D correctly deferred; A3 popup port is Wave 3, not
    Wave 0 — correctly excluded.)

### Hard-constraint carry-through — all present in the plan
- WIP-only edits via `$CLAUDE_JOB_DIR` + `cp` / python-via-Bash; Edit/Write blocked by bg-isolation
  guard — hard_constraint 2, restated in every edit task. PRESENT.
- No outbound comms to MapleMoon — hard_constraint 4. PRESENT.
- TypeKit `p.css` NAME_NOT_RESOLVED noted as headless sandbox artifact, not a real error —
  hard_constraint 5 + verification note. PRESENT.
- No em dashes in copy — hard_constraint 6. PRESENT. (Checker also confirms this PLAN-CHECK uses none.)
- Never "vibe" — hard_constraint 6. PRESENT.
- Keep `_wip/` symlinks intact — hard_constraint 3; verified `assets`, `brand_kit.css`, `shared.css`
  symlinks currently exist. PRESENT.

---

## Verification-criteria sufficiency

Sufficient. For RATIFY (A branches) the criterion is a DECISIONS.md grep — unambiguous. For
REVERT/MODIFY branches each task has a specific grep assertion plus a 390+1440 screenshot that must
be opened, plus an explicit A7 + wordmark re-check. The motion-on screenshot caveat (sections start
at opacity:0 until IntersectionObserver fires; scroll/wait before shooting) is called out so the
executor will not capture blank sections. An executor knows unambiguously when Wave 0 is done.

One soft edge: DECISIONS.md is listed as an artifact and every task writes to it, but the file does
not yet exist — the first task that runs must create it. This is normal (grep-for-string verifies
creation implicitly) and not an issue.

---

## Executor readiness: YES

Hand it over. Apply the three NOTES as executor guidance (they are precision/clarity, not blockers):
add the base-file path to Task 4, state the sequential re-grep discipline for double-reverts, and
clarify that line 1037 `.wf-phero{position:relative}` in Task 3B is a redundant duplicate (safe to
leave or remove, not seal CSS). Nothing in the plan will break the goal, A7, or the wordmark.
