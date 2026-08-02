# MapleMoon — position, ship deliverable, and the plan from here
# Written: 2026-08-02 · for cold-start into a fresh session
# Status of this file: analysis and proposal. Records no verdict. Passes no gate.

## Load this first in a fresh session

Read, in order:
1. This file.
2. `CLAUDE.md` and `AGENTS.md` (lane rules — Codex is coordinator and lock custodian; Claude Code is a worker).
3. `docs/client-review/2026-08-01-saturday-review/READINESS-DEPENDENCY-ROADMAP-20260802.md` (the gate graph).
4. `_wip/evidence/IMAC-KEYBOARD-PROOF-20260802/RESULTS.json` (the keyboard evidence just landed).

Nothing else is needed to be useful immediately.

---

## THE SHIP DELIVERABLE

**Send the frozen six-page clean review package to Carli and Dylan, and collect their feedback.**

- The artifact: `docs/client-review/2026-08-01-saturday-review/staging-v1/clean/`
  (homepage, shop, our-story, carob-story, stockists, faq)
- Integrity: `clean/MANIFEST.json` = `d1c66b1d…`, `annotated/MANIFEST.json` = `3be3c0f2…`
- It is **built, frozen, hash-verified, and has never been sent.**

Everything else in this project — the family-and-friends soft launch (SL-0..3), the whole
Shopify OS2 build (SH-0..6) — sits *behind* that send. Nothing downstream can legitimately
start until it happens.

## THE DEADLINE — say this plainly

The package is named for a **Saturday 1 August** review. Today is 2 August. **That date has
passed and the package was never sent.**

**There is no forward deadline recorded anywhere in the repo.** I searched
`docs/orchestration/` and `docs/client-review/` for deadline/ship-date/go-live language and
found one incidental match, unrelated. This is a real gap: a project with no committed next
date drifts by default, which is the pattern that produced the missed date in the first place.

**Nate must set a date.** Recommend committing to a send date and working backwards, because
the remaining critical path is short (see below) and is dominated by one human task.

## THE PROGRESS BAR — the honest read

The gate graph has **16 gates** across three paths: CR-0..CR-4 (client review, 5),
SL-0..SL-3 (soft launch, 4), SH-0..SH-6 (Shopify, 7).

**Gates cleared: 0 of 16.**

That number is jarring next to the volume of work done, and both facts are true:

- **What IS done:** an enormous amount of *preparation*, all with independent PASS receipts —
  review-hub spec and feedback schema; soft-launch test plan, event schema and analysis
  template; link-preview/favicon metadata audit; Shopify OS2 translation map and migration
  gates; security and integration gate register; UAT, rollback, cutover and stabilization
  plan. Plus the frozen six-page package itself, plus its QA receipts.
- **Why the bar still reads zero:** every one of those is an *accepted local specification*.
  By the roadmap's own words they "authorize no implementation, access, collection,
  deployment or sharing." They are the shape of the work, not the work shipped.

**The entire project is blocked behind ONE gate: CR-0.** And CR-0 is reserved to Nate — no
agent may record it, because a control record written on his behalf corrupts every gate
downstream of it.

So: this is not a project that is 5% done. It is a project that is **fully prepared and
one human sitting-down away from unblocking three parallel workstreams.**

## WHAT CR-0 ACTUALLY REQUIRES, AND WHAT IS ALREADY EVIDENCED

CR-0 = review the exact frozen artifact as an ordinary viewer, covering three surfaces:

| Surface | State | Who |
|---|---|---|
| Keyboard / focus traversal | **EVIDENCED** for 5 of 6 pages at literal 390 CSS px | done, agent |
| Literal 200% browser zoom | **NOT STARTED** | pre-screenable by agent |
| Ordinary-viewer read (does it look right, does the copy land) | **NOT STARTED** | Nate only |

Keyboard evidence, committed at `9ead886`, `_wip/evidence/IMAC-KEYBOARD-PROOF-20260802/`:
our-story, carob-story, stockists, faq and shop all completed real OS-level Tab traversal at
literal 390 CSS px, with retained ordered stop lists, `document_hasFocus` true at start and
end, cycles wrapping within budget, zero focus leaks into the closed cart dialog, zero
zero-size stops. Independently cross-checked here against static DOM baselines: shop 48 v 48,
stockists 31 v 31, carob-story 13 v 13 exact.

**Gap: homepage has keyboard evidence only at 500 CSS px, not 390.** Five pages match each
other; homepage does not match them.

## THE PLAN — three phases, only one needs Nate

### PHASE 1 — Close the CR-0 evidence surface (AGENT, safe to /goal, ~1 session)

Bounded, evidence-only, records no verdict, writes only inside `_wip/evidence/`.

1. **Homepage keyboard traversal at literal 390 CSS px** — completes the six-page set using
   the exact harness that just worked (`_wip/evidence/IMAC-KEYBOARD-PROOF-20260802/HARNESS.py`).
2. **Literal 200% zoom pre-screen, all six pages** — CDP `Emulation.setDeviceMetricsOverride`
   plus `setPageScaleFactor`/deviceScaleFactor already proved it can hit exact viewports, so
   200% is reachable the same way. Look for: clipped text, unreachable controls, horizontal
   overflow, overlapping hit targets, anything an ordinary viewer at 200% would hit.
3. **Produce a one-page CR-0 PRE-SCREEN PACK** stating exactly two things: what is already
   evidenced (so Nate does not redo it), and the shortlist of anything suspicious that he
   should look at personally.

**Why this is the right autonomous work:** it converts CR-0 from "a full QA pass Nate keeps
not starting" into "a short confirmation with the defects already surfaced." It cannot
corrupt the gate because it records nothing.

### PHASE 2 — Nate does CR-0 (HUMAN, ~15–20 minutes)

On the exact frozen artifact, as an ordinary viewer, at literal 200% zoom. Outcome is either
PASS, or the first material correction. Nothing else is asked of him.

**This is the only true bottleneck in the project.**

### PHASE 3 — Unblocked cascade (mixed)

- **CR-1** (Nate, minutes): approve audience, channel, wording, access/expiry route, feedback
  destination. Pure decisions — nothing to build.
- **CR-2** (agent, bounded packet from Codex): local review-hub build. Spec already accepted.
  Excludes deployment, live forms, analytics, sharing.
- **CR-3** (agent + Nate's copy/asset calls): metadata and link-preview implementation.
- **CR-4** (Nate): the send. Requires CR-0..CR-3 PASS plus fresh send approval.

SL and SH stay parked until CR-4. Do not start them; the roadmap is explicit.

## RISK THAT SHOULD BE FIXED REGARDLESS OF SEQUENCE

**`staging-v1/` is gitignored** (`.gitignore:34`, zero tracked files). The ship artifact —
the thing this whole project exists to send — has **no committed copy**. Its only integrity
evidence is SHA match. A stash, a clean checkout, or a disk event loses it silently, and it
would not be recoverable from git.

There is currently one accidental second replica: the iMac's rsynced copy at
`/Volumes/handtomouse/maplemoon-website/docs/client-review/…/staging-v1/`.

Fixing this means changing `.gitignore`, which is a deliberate configuration decision and
therefore Nate's and Codex's call, not a cleanup an agent should do unilaterally.

## WHAT AN AGENT MUST NEVER DO HERE

- Record CR-0 through CR-4. Nate's alone. Writing one on his behalf corrupts every downstream
  gate that inherits it.
- Write to `staging-v1/`, `docs/orchestration/`, `LOCK_MANIFEST.json`, or
  `scripts/check-maplemoon-review.py` (mid-flight in another lane).
- Commit anything outside its own lane. A scope breach is already on record for this project
  (`docs/orchestration/reviews/MAPLEMOON-CLAUDE-SCOPE-BREACH-20260802-1303-AEST.md`).
- Promote static/DOM analysis into a traversal result. It cannot see tab order, wrap, or traps.

## KNOWN ENVIRONMENT FACTS (save a fresh session an hour)

- **Chrome activation by app name is ambiguous** when two instances share a bundle id — it
  targets the wrong window and Tab keypresses silently do nothing while `hasFocus` still reads
  true. Use CDP `Page.bringToFront` on the specific window. This was the root cause of every
  failed traversal attempt.
- **Literal 390 CSS px IS reachable** via CDP `Emulation.setDeviceMetricsOverride`. The old
  "500px is a platform limit" note was vehicle-specific (window resize / extension), not a
  macOS limit. That caveat is closed.
- macOS Full Keyboard Access is ON (`AppleKeyboardUIMode` = 2) — never the cause; don't chase it.
- The iMac's home is SMB-mounted at `/Volumes/handtomouse` — a working two-way channel.
  Remote Login is OFF on the macbook, so scp *to* it fails. Taildrop (`tailscale file cp`) works.
- `npm run review:saturday:check` fails with 26 errors. This is EXPECTED: 23 are homepage.html
  and 3 are MANIFEST-level, all consequent to a homepage rebuild that hasn't happened, because
  the checker carries ~157 uncommitted lines pinning `SAT-HOME-CLEAN-CLOSURE-01`. Not damage.
- Branch `codex-maplemoon-section-review`; `d65047b` is NOT pushed to origin.

## THE ONE NEXT ACTION

Run Phase 1. It is the only work that both moves the ship date and cannot damage anything.
