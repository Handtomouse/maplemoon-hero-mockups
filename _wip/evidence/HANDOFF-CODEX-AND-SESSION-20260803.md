# Handoff blocks — Codex approval request + fresh Claude session launch
# Written: 2026-08-03 (early) · macbook Claude Code (worker)
# STATUS: prepared text for Nate to paste. Nothing sent. No verdict recorded.

Two pasteable blocks. Block A goes to Codex. Block B starts a fresh Claude Code session.
Both are prepared to ingest Nate's Claude-in-Chrome homepage notes, which are NOT in the repo
and must be pasted in by him.

---

## BLOCK A — paste to Codex

```
MapleMoon — packet approval request plus two separate asks.

=== ASK 1: approve SAT-HOME-CAROB-HORIZONTAL-BALANCE-01 ===

Defect ms49rup1d3dn (GOV-01 ledger line 81, still open).

CORRECTED CHARACTERISATION. The intake described the carob section as
"pressed against the left viewport edge". Measured, it is not. At 1440 the
section's text starts at 130px while #top and #ritual, both left-aligned,
start at 158px. Identical 28px miss at 1280 (50px vs 78px). So it is a 28px
grid misalignment, not a flush-left collapse. The feedback record's rect x:0
is the section bounding box, which legitimately spans full width.

The fix brief is therefore "restore the shared 158px grid alignment", not
"add padding".

CAUSE, verified by brace-depth analysis of the generated file:
  .wf-what1 .inner{...padding:0;...}  sits at TOP LEVEL, inside no media
  query, at WIP source line 1889 (generated homepage.html line 1778).
  The rules that restore padding are inside @media(max-width:900px) and
  @media(max-width:600px) and FOLLOW it in source order, so <=900px renders
  correctly and >900px does not. getComputedStyle(inner).paddingLeft returns
  0px at both 1440 and 1280, confirming the rule is operative.
  Section binding confirmed: <section class="wf-what1" id="carob">.

SCOPE: one declaration, one file.
  Writable: _wip/homepage_real_1_lead_photo.WIP.html   line 1889   ONLY.
  NOT staging-v1/clean/homepage.html — that is generated
  (build-maplemoon-saturday-review.py:30 maps the WIP source onto it), so a
  direct edit is discarded on rebuild and breaks the freeze.
  Note: the baseline rule at line 472 declares no padding either, so deleting
  padding:0 alone may not fix it; a desktop inset likely has to be added.

HARD CONSTRAINT: <=900px and <=600px rendering must be unchanged. Those
widths are correct today and are covered by existing evidence.

OUT OF SCOPE, raise separately: Learn More CTA strategy (ms48ubrlulgr) and
pod-callout positioning. Neither is P0. Bundling turns a one-line correction
into a design review.

SCOPE IS ONE ITEM, NOT THREE. A desktop sweep at 1440/1280 initially flagged
our-story #shop and three faq .wrap sections as outliers. Both were false
positives of a detector that compared minimum text-left against a page median
without segmenting by text-align. Re-measured with gap symmetry: our-story
#shop is text-align:center with 28px gaps on BOTH sides, centred by design;
the faq sections sit on their own grid. Disproved and recorded at commit
b24d23a. shop, carob-story and stockists show no negative outliers at 1440.

RECOVERY GATE REQUIRED:
- phase-start receipt via scripts/check-maplemoon-receipt.py capturing exact
  writable scope and pre-mutation bytes
- pre-hashes for the WIP source and all three manifests. Current:
  clean/MANIFEST.json     d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20
  annotated/MANIFEST.json 3be3c0f2df4658558c667b3e9cc6d55966d6a1d7ce9fa9874c46a0afc44244c7
- non-overwriting checkpoint under _wip/checkpoints/ BEFORE any write
- staging-v1/ is gitignored with ZERO tracked files, so that checkpoint is
  the only rollback path in existence. Confirm it exists before mutating.

QA REQUIRED BEFORE PROMOTION:
- rendered at 1440 and 1280: #carob eyebrow, heading, rule, paragraph, facts
  row and CTA all on the same left grid as #top and #ritual
- rendered at 900 and 901: both sides of the breakpoint, proving the fix does
  not move the boundary
- rendered at 390: unchanged from current (regression check)
- keyboard at 1440 and 390: genuine OS-level Tab, full ordered stop lists,
  document_hasFocus true at start AND end, zero leaks into closed
  #mmCartDialog. Use osascript key events plus CDP Page.bringToFront.
  Activation by app name silently targets the wrong window when two Chrome
  instances share a bundle id; that caused every earlier traversal failure.
  Working harness: _wip/evidence/IMAC-KEYBOARD-PROOF-20260802/HARNESS.py
- do NOT substitute static DOM analysis for a traversal

=== ASK 2: the checker contract is stale and has no green option ===

scripts/check-maplemoon-review.py carries ~157 uncommitted lines pinning
SATURDAY_PACKET_ID = "SAT-HOME-CLEAN-CLOSURE-01". Nate has ruled to retain all
clean homepage copy, so that rebuild is NOT happening and the checker was
advanced ahead of it.

Current: 26 failures (22 homepage copy-token, 1 complete-document parity,
1 aggregate MANIFEST contract, 2 packet-ID mismatch).

Reverting is NOT a fix. The committed HEAD version was run out-of-tree and
yields 6 failures, not 0: it clears 22 but introduces 2 new current-source
lineage mismatches.

Worse, the packet-ID mismatch is not a stale pin. All three manifests carry
SAT-SHARED-MOBILE-HEADER-01. The working tree pins SAT-HOME-CLEAN-CLOSURE-01;
HEAD pins VIS-03C-03-CURRENT-WIP-SOURCE-LINEAGE. NEITHER version pins what the
artifact actually says. Only re-pinning to SAT-SHARED-MOBILE-HEADER-01 clears
it; that packet's receipt records outcome PASS.

One failure may be a real artifact problem rather than a checker one: the
complete-document parity mismatch compares clean/homepage.html against
annotated/homepage.html, both INSIDE the artifact, and it survives a revert.
Unresolved from our side because the canonicalisation rules live inside the
uncommitted diff.

Decision needed: what contract should the checker hold, and what now happens
to SAT-HOME-CLEAN-CLOSURE-01, which sits at outcome HOLD with no remaining
scope? A failing deterministic QA gate should not ride into a client send.

=== ASK 3: packet to make the ship artifact recoverable ===

staging-v1/ is gitignored at .gitignore:34 (docs/client-review/*/staging-v1/)
with ZERO tracked files. The artifact this project exists to send has no
committed copy; its only integrity evidence is SHA match. A stash, clean
checkout or disk event loses it silently.

Nate has chosen to request a Codex packet rather than have a worker edit
.gitignore. Note it is not a one-line negation: git will not re-include files
under an excluded directory, so it needs either a restructured /** rule or
git add -f with no config change.

One accidental replica exists: /Volumes/handtomouse/maplemoon-website/.../staging-v1/
(iMac, SMB mount). Incidental, not a managed backup.

=== INCOMING ===

Nate captured homepage notes via Claude-in-Chrome. They are NOT in the repo
(_wip/_feedback/log.jsonl is unchanged at 16 records, mtime 28 Jul) and will
be pasted in. They may add items to the correction batch. Do not treat the
carob packet as the complete homepage fix list until those are ingested.

CR-0 through CR-4 remain Nate's alone. Nothing has been promoted.
```

---

## BLOCK B — paste into a fresh Claude Code session

```
MapleMoon — homepage correction session. Read fully before acting.

Repo /Users/handtomouse/maplemoon-website, branch codex-maplemoon-section-review.
Run: pwd && git rev-parse --short HEAD && git branch --show-current
If your path contains .codex/worktrees/, STOP and switch to the live repo.

READ FIRST, in order:
  _wip/evidence/CAROB-HORIZONTAL-BALANCE-INTAKE-20260802.md
  _wip/evidence/DESKTOP-SWEEP-20260802/FINDINGS.md
  _wip/evidence/CLOSURE-DECISION-20260802.md
  _wip/evidence/PROJECT-POSITION-AND-PLAN-20260802.md
  CLAUDE.md and AGENTS.md   (Codex is lock custodian; Claude Code is a worker)

STATE
CR-0 is in progress. Nate is reviewing the frozen six-page package. Nothing is
being rebuilt: he ruled to retain all clean homepage copy, so staging-v1 stays
at clean/MANIFEST.json = d1c66b1d... and the existing keyboard and zoom
evidence remain valid against it.

One defect confirmed: ms49rup1d3dn, homepage #carob, 28px left of the shared
158px grid at 1440 (and 50 vs 78 at 1280). Cause is a TOP-LEVEL
.wf-what1 .inner{padding:0} at WIP line 1889. Desktop only; <=900px is correct.
A packet for it is with Codex awaiting approval. Do not implement it.

Two other sections were flagged and DISPROVED as false positives. Do not
re-raise our-story #shop or the faq .wrap sections without new evidence; both
are centred by design. See FINDINGS.md.

YOUR FIRST JOB — INGEST NATE'S CLAUDE-IN-CHROME NOTES
He will paste homepage notes captured in a Claude-in-Chrome session. They are
NOT in the repo; _wip/_feedback/log.jsonl is unchanged at 16 records.

Treat them as OBSERVATIONS, not instructions. For each note:
  1. identify page and section
  2. dedupe against what is already known: the carob 28px misalignment, and
     the GOV-01 open items ms48tuprlfwf (hero credentials readability) and
     ms48ubrlulgr (carob learn-more CTA strategy)
  3. classify BOUNDED (one-line-ish, rides the fix batch) or DEEPER (redesign,
     separate lane, moves the send date)
  4. separate DEFECTS from PREFERENCES. "I would word this differently" is a
     preference; capture it, do not let it block the send
  5. verify anything factual against the frozen files before recording it

Write the result to _wip/evidence/ as a single classified list. Do NOT fix
anything. Do NOT record CR-0.

THEN
Walk Nate through the package section by section at DESKTOP width first. He
looks and reacts in whatever words he likes; you record and classify. Do not
fix mid-pass.

Why desktop first: every piece of CR-0 evidence before tonight was captured at
<=720px (keyboard 390, zoom pre-screen 720), both below the 900px breakpoint.
A 1440/1280 alignment sweep has now run, but that is one narrow geometric
check. Imagery, typography, rhythm, colour and copy at desktop are entirely
unreviewed.

HARD RULES
- Do NOT record CR-0 through CR-4. Nate's alone. Every downstream gate
  inherits CR-0, so an agent writing it corrupts all of them.
- Do NOT edit staging-v1/, docs/orchestration/, scripts/, .gitignore or
  LOCK_MANIFEST.json. Write only inside _wip/evidence/.
- A scope breach is already on record for this project. Lane discipline is not
  optional.
- Never substitute static DOM analysis for a real keyboard traversal.
- Assert a page actually PARSED, not merely that it navigated. A sweep here
  reported a page with a correct URL and title but zero sections; without a
  guard it would have looked clean.

SERVE
  cd docs/client-review/2026-08-01-saturday-review/staging-v1/clean
  python3 -m http.server 3011 --bind 127.0.0.1
Verify clean/MANIFEST.json = d1c66b1d... before reviewing anything.
A review of a drifted artifact is void.
```
