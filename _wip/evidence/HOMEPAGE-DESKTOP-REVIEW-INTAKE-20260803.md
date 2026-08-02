# Homepage desktop review — note intake and classification
# Written: 2026-08-03 · macbook Claude Code (worker)
# STATUS: INTAKE AND CLASSIFICATION ONLY. Records no verdict. Passes no gate.
#         Nothing edited, rebuilt, committed, promoted or sent.
#         CR-0 through CR-4 remain Nate's alone.

## 0. Integrity of the artifact under review

Verified before any review work, 2026-08-03:

| item | value |
|---|---|
| repo | `/Users/handtomouse/maplemoon-website` (live tree, not a worktree) |
| branch / HEAD | `codex-maplemoon-section-review` / `b630111` |
| `clean/MANIFEST.json` | `d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20` ✓ matches |
| `annotated/MANIFEST.json` | `3be3c0f2df4658558c667b3e9cc6d55966d6a1d7ce9fa9874c46a0afc44244c7` ✓ matches |
| server | pre-existing `python3 -m http.server 3011`, PID 43050, cwd confirmed = `staging-v1/clean` |
| served page | `http://127.0.0.1:3011/homepage.html` → sha256 `0d102050…` = byte-identical to the frozen file |

No drift. The server was reused, not restarted, so no port clash was introduced.

---

## 1. THE PROVENANCE TRAP — establish this before reading any note

**The frozen artifact is NOT the WIP file. Three sections were cut.**

Every feedback record in `_wip/_feedback/log.jsonl` (still 16 records, unchanged) carries
`url: /_wip/homepage_real_1_lead_photo.WIP.html` — the **WIP source**, not the review package.
The carob intake already had to correct exactly this for `ms49rup1d3dn`. Any Claude-in-Chrome
session pointed at the same WIP inherits the same problem.

Section-id comparison, WIP vs frozen `clean/homepage.html`:

| | sections | ids |
|---|---|---|
| `_wip/homepage_real_1_lead_photo.WIP.html` | **11** | top, range, **why**, carob, ritual, **who**, story, **reviews**, stockists, sampler, trust |
| `staging-v1/clean/homepage.html` | **8** | top, range, carob, ritual, story, stockists, sampler, trust |

Frozen = WIP **minus `#why`, `#who`, `#reviews`**. The cut is deliberate and visible in the
build output — the frozen file retains the bare comment `<!-- WHY (carob vs cacao, comparison
panel) -->` with its section stripped.

> **CLASSIFICATION RULE, non-negotiable:** any note referring to `#why` (carob-vs-cacao
> comparison panel), `#who`, or `#reviews` describes content that **does not exist in the
> package Carli and Dylan will receive**. Such a note is **OUT-OF-ARTIFACT** — it is neither a
> defect nor a preference against this send. Record it, park it against the WIP, and do not
> let it enter the fix batch or block CR-0.

**Direction of the delta — the WIP has NOT run ahead of the freeze.** WIP last written
2026-08-01 09:58; frozen `homepage.html` built 2026-08-01 10:12, fourteen minutes later. The
WIP is also now clean against HEAD (committed at `63e3e69`) — the ` M` in the session-start
`git status` snapshot has since been committed by Codex. So the freeze is downstream of the
WIP's last edit, and shared content is expected to match. Spot-confirmed: the carob defect
declaration is byte-identical at WIP line 1889 and frozen line 1778.

---

## 2. A GAP IN THE EXISTING DESKTOP EVIDENCE — flagged, not re-run

`DESKTOP-SWEEP-20260802/FINDINGS.md` reports 1440 and 1280 measurements for homepage
(`#carob` 130 vs 158 median; 50 vs 78). **Those numbers are not in the persisted data.**

`DESKTOP-SWEEP-20260802/sweep.json` contains:

- widths **`1440` and `390` only — no 1280 data exists in the artifact at all**
- `results/1440/homepage` = **`LOAD_FAILED`**, no sections, no measurements

The five other pages *are* present and measured at 1440. **Homepage is the single page with no
persisted desktop measurement** — and it is the page with the known defect and the page about
to be walked through.

FINDINGS.md states a retry re-run succeeded and "produced 11 sections". **The frozen homepage
has 8 sections. 11 is exactly the WIP's count.** Two readings are possible: the successful
re-run was pointed at the WIP rather than the served artifact, or "11" is a prose transcription
slip and the re-run results were simply never written back to `sweep.json`. The persisted data
cannot distinguish them.

**What this does and does not change:**

- **Unaffected:** the defect is real and lives in the shipping artifact. The operative rule
  `.wf-what1 .inner{…padding:0…}` is confirmed present at top level, inside no media query, at
  frozen `homepage.html:1778`. That is a static fact about the file Nate is reviewing.
- **Unsupported by persisted data:** the specific **28px** figure, the 1280 numbers, and the
  "homepage is otherwise clean at desktop" conclusion.

Not re-run here — re-measuring is Codex's sweep to redo, and this session's lane is intake.
Raised so the packet's QA table is not written against a figure whose backing data is absent.

---

## 3. DEDUPE PRE-MAP — apply mechanically to each incoming note

| if the note is about… | verdict | id | class | notes |
|---|---|---|---|---|
| carob section sitting left / out of alignment / "too far left" | **DUPLICATE** | `ms49rup1d3dn` | BOUNDED | Packet with Codex awaiting approval. Do not expand or re-diagnose. |
| the carob section's onward link / CTA wording or prominence | **DUPLICATE** | `ms48ubrlulgr` | **DEEPER** | Explicitly OUT of scope of the carob packet per intake §5. Separate lane. **See wording caveat below.** |
| hero credential line weight / readability / thickness | **DUPLICATE** | `ms48tuprlfwf` | BOUNDED (pending) | Target `wf-pcreds` confirmed present in the frozen file. |
| our-story `#shop` alignment | **DISPROVED** | — | — | Symmetric 28/28, centred by design. Needs new evidence to re-raise. |
| faq `.wrap` alignment | **DISPROVED** | — | — | On its own grid, 120/120. Needs new evidence to re-raise. |
| `#why`, `#who`, `#reviews` | **OUT-OF-ARTIFACT** | — | — | Not in the package. See §1. |
| anything else | **NEW** | assign | classify | Verify against the frozen file before recording. |

**Wording caveat on `ms48ubrlulgr`.** The record says "better learn more CTA strategy", but the
string "learn more" appears **zero times** in the frozen homepage. The frozen `#carob` CTA
reads **"The full carob story"** → `carob-story.html`. The concept transfers (the carob
section's onward CTA); the literal wording does not. Any note quoting "Learn more" is
describing the WIP, not the package.

---

## 4. CLASSIFIED LIST — Nate's Claude-in-Chrome homepage notes

**STATUS: AWAITING PASTE.** As of writing, no notes have been provided to this session.
`_wip/_feedback/log.jsonl` remains at 16 records, so the notes are not in the repo either.
The table below is filled on receipt; it is not left empty by oversight.

Each note is recorded against all four axes. **A note missing an axis is a note not yet
classified.**

| # | note (his words, verbatim) | page · section | dedupe | defect / preference | bounded / deeper | verified against frozen? |
|---|---|---|---|---|---|---|
| — | *awaiting paste* | | | | | |

**Axis definitions, so the table is readable cold:**

- **dedupe** — NEW · DUPLICATE of `<id>` · DISPROVED · OUT-OF-ARTIFACT
- **defect / preference** — a *defect* is something broken, misaligned, unreadable or wrong. A
  *preference* is "I would word/style this differently". Preferences are captured in full and
  **must not block the send**.
- **bounded / deeper** — *bounded* is one-line-ish and rides the existing fix batch. *deeper*
  is redesign, needs its own lane, and **moves the send date**. Say so explicitly when it does.
- **verified against frozen** — the claim was checked against `staging-v1/clean/`, not the WIP,
  not memory.

---

## 5. WALKTHROUGH RUNNING ORDER — homepage, desktop first

Why desktop first: all CR-0 evidence before 2026-08-02 was captured at ≤720px (keyboard 390,
zoom pre-screen 720), both below the 900px breakpoint. The alignment sweep since is one narrow
geometric check — and per §2 its homepage desktop data did not persist. **Imagery, typography,
vertical rhythm, colour and copy at desktop are entirely unreviewed.**

`http://127.0.0.1:3011/homepage.html` — eight sections, in document order:

| # | id | eyebrow | heading |
|---|---|---|---|
| 1 | `#top` | — | hero / lead photo, credential line (`wf-pcreds`) |
| 2 | `#range` | — | Pure Carob & Cacao Butter |
| 3 | `#carob` | First things first | What is Carob, *actually?* ← **known defect lives here** |
| 4 | `#ritual` | A sweeter kind of ritual | When do you moon? |
| 5 | `#story` | Our story | Born from Nighttime Cravings & Kind Intentions |
| 6 | `#stockists` | Stockists | Find Maple Moon near you |
| 7 | `#sampler` | The starter box | Try every flavour. |
| 8 | `#trust` | — | shopping-reassurance strip |

**Record the viewport width once, at the top of the pass, and stamp it on every observation.**
Existing records carry `vw` 1246 and 1158; the carob defect is width-dependent and only exists
above 900px. An observation without a width is not verifiable later.

**No fixing mid-pass.** Observations are recorded and classified; nothing is edited.

---

## 6. Lane compliance

Written inside `_wip/evidence/` only. Nothing touched in `staging-v1/`,
`docs/orchestration/`, `scripts/`, `.gitignore` or `LOCK_MANIFEST.json`. No build run, no
commit made to another lane's files. The 3011 server was reused, not replaced. No gate
recorded, and none may be recorded from this lane.
