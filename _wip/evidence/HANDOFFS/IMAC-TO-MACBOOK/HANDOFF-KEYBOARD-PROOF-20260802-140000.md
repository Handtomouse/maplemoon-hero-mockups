# HANDOFF: iMac worker → macbook Claude
# Task: MAPLEMOON-KEYBOARD-PROOF-20260802
# Written: 2026-08-02
# Relay path: dropped at macbook:~/maplemoon-website/_wip/evidence/HANDOFFS/IMAC-TO-MACBOOK/
# Nate stays primary. This is worker↔coordinator, not decision-making.

## STATUS: unblocked, ready to run — but you should read this first.

### What I did

1. Fresh clone via `ssh://macbook/...` (password auth to 100.107.171.55 is
   locked; the `macbook` ssh alias with key auth works — script accordingly
   if you target the iMac).
2. Checked out `codex-maplemoon-section-review`, HEAD = d65047b ✓ per brief.
3. Discovered `staging-v1/` is NOT committed on the branch. Only `shared/`
   and `prototypes/` are. Commit eaba511 (titled "add 1 Aug six-page review
   package") only landed the mock-cart triplet, not the review pack.
4. Confirmed on your side: `staging-v1/` exists on disk, sits alongside
   ~17 uncommitted `*-20260802.md/.json` files, plus dirty:
   `AGENTS.md`, `mock-cart.js`, `check-maplemoon-review.py`,
   `check-maplemoon-cart.mjs`, `build-maplemoon-saturday-review.py`,
   `package.json`, WIP HTMLs.
5. SHA-verified `staging-v1/` on your disk against the brief:
     d1c66b1d…  clean/MANIFEST.json      ✓ matches brief
     3be3c0f2…  annotated/MANIFEST.json  ✓ matches brief
   The artifact is bit-frozen at the expected hashes — just not in git.
6. Rsynced `staging-v1/` from your machine to my clone at the same path.
   Re-verified SHAs on my side — identical, matches brief.
7. Confirmed staging-v1/ is self-contained (mock-cart.js/css exist inside
   both clean/ and annotated/), so your dirty shared/mock-cart.js does
   NOT reach the artifact I'm reviewing.

### What I need from you — non-negotiable

**FREEZE WINDOW: staging-v1/ contents.**
For the duration of my run (I'll start after your ACK below and finish
inside a bounded window I'll declare), do not modify anything under:

    docs/client-review/2026-08-01-saturday-review/staging-v1/**

If you must break the freeze, drop a file at:

    ~/maplemoon-website/_wip/evidence/HANDOFFS/IMAC-TO-MACBOOK/ABORT-<ISO>.txt

I check that path before promoting results. Any file there ≥ mine in mtime
= I stop and re-baseline.

**LOCK MANIFEST DECLARATION.**
You are lock custodian per AGENTS.md. You have `LOCK_MANIFEST.json` open in
your dirty tree — before I start, please commit whatever version of it
declares this freeze and cite the tip SHA in your ACK. If you can't commit
it now, at minimum tell Nate the freeze is verbally granted; I'll cite that
in my RESULTS.

### What I need from you — strongly requested (not blocking)

**FREEZE the shared editing files during my run:**
- `scripts/check-maplemoon-review.py` (you already said mid-flight; not my
  lane, but if it changes I want to know so I don't run stale checks against
  fresh code)
- `docs/client-review/2026-08-01-saturday-review/shared/mock-cart.js`
  (only matters if you later decide staging-v1/ should re-inherit from
  shared/; currently it doesn't so this is precautionary)

**COMMIT `staging-v1/` to git before Nate's client review closes.**
Right now the artifact is only verifiable by SHA match, not by
`git checkout <ref>`. That's fine for my traversal (SHAs are authoritative)
but bad for anyone reproducing this later. Not my job to fix — flagging.

**RECONCILE the check-maplemoon-review.py 26-error state.**
Brief said "KNOWN, EXPECTED, all 26 are homepage.html, not damage, not my
pages." I'm trusting that. If the reality is different, tell Nate now, not
after CR-1.

### Coordination protocol going forward

Because Nate relays chat between us, we cannot chat — but we can drop files.
Mailboxes are set up:

    macbook:~/maplemoon-website/_wip/evidence/HANDOFFS/
      IMAC-TO-MACBOOK/    ← I drop here (via scp)
      MACBOOK-TO-IMAC/    ← you drop here (I ssh-poll or Nate tells me)

Convention:
- Filename: `<TYPE>-<TASK-ID>-<ISO>.<ext>`
  Types: HANDOFF, ACK, ABORT, RESULT, QUESTION, ANSWER
- Every file's first line is a UTF-8 header comment stating type + task-id.
- ACK a handoff by dropping an ACK-<TASK-ID>-<ISO>.md within your window.
  No ACK = I ask Nate to relay verbally before proceeding.
- Never mutate the other party's mailbox. Read-only from your side.

### My preconditions still to verify (before I start)

- Chrome running on iMac + Claude browser extension connected (not yet
  confirmed — deferred while I was blocked on artifact).
- Accessibility grant to the extension controller.
- `osascript -e 'tell application "Google Chrome" to activate'` returns 0.
- Real OS-level Tab keypresses land in Chrome (I will assert
  `document.hasFocus() === true` and abort if false — no synth fallback).

If any of these fail I stop and drop a QUESTION-<ISO>.md in your inbox
rather than degrading the method.

### What I will produce

Single file at:

    _wip/evidence/IMAC-KEYBOARD-PROOF-20260802/RESULTS.json

Per page (our-story, carob-story, stockists, faq + shop re-run):
- tab_presses, focus_stops, unique_controls
- FULL ordered stop list (tag, accessible label, width, height, in-closed-dialog)
- first_stop, wrapped_at (index or null)
- document_hasFocus (must be true)
- zero_size_focus_stops, focus_leak_into_closed_cart_dialog
- closed_dialog_inert, closed_dialog_aria_hidden

Plus: worker id, captured_at, environment block, artifact integrity block
(both MANIFEST SHAs), authority_note ("evidence only, no verdict recorded,
nothing promoted, CR-0 reserved to Nate").

Each page marked VALID (real traversal, focus confirmed) or UNVERIFIED
(anything short of that). No PASS/FAIL. That's Nate's alone.

I will scp the whole `IMAC-KEYBOARD-PROOF-20260802/` folder back to your
`_wip/evidence/` when done.

### What I explicitly will NOT do

- Write outside `_wip/evidence/`.
- Modify anything under `staging-v1/`, `check-maplemoon-review.py`, or any
  server bind address.
- Push to any shared branch.
- Record a CR verdict.
- Restate or change shop's verdict — only report what its focus cycle
  actually contains and where it wraps, so you and Nate can settle the
  59-stop / 28-unique question.
- Fall back to synthesized KeyboardEvents if real keys don't land.
- Commit any file. My clone stays dirty on staging-v1/ (which is
  legitimate: the artifact isn't on origin) and I'll note that in RESULTS.

### One request

If your dirty tree is intentional WIP that has to keep moving today, and
staging-v1/ won't get a proper freeze / commit, tell Nate now. He can
either defer this run or accept "snapshot verified by SHA, not by git ref"
as good enough. I can execute either way; I want you and Nate aligned
before I burn keypresses.

### Ready-to-run signal

I'll wait for either:
- an ACK file in `IMAC-TO-MACBOOK/` from you, OR
- Nate relaying "go" verbally with the freeze confirmed.

Whichever comes first.

— iMac worker (Claude Code)
