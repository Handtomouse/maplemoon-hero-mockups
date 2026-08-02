# Wave-1D candidate custody — exposure and proposal
# Written: 2026-08-02 ~22:20 AEST · macbook Claude Code (worker)
# STATUS: REPORT + PROPOSAL. No bytes moved. No git operation performed. Passes no gate.

## Why this file exists

The overnight boss handoff forbids automatic offload or storage transfer:
*"Do not delete, compress, move, offload to iMac/Drive or change storage settings
automatically. Storage cleanup or transfer requires a separately admitted recovery/custody
packet."* This report is the admissible input to that packet. It stops at the rule.

## The exposure

All Wave-1D generated imagery exists at exactly one location:

`/Users/handtomouse/.codex/worktrees/27ab/maplemoon-website/docs/client-review/2026-08-01-saturday-review/generated-candidates/`

| Property | Value |
|---|---|
| Files | 51 (36 PNG, 8 JSON, 4 MD, 3 HTML) |
| Size | 71 MB |
| Tracked in git | No — untracked |
| Gitignored | **No** (`git check-ignore` returns nothing — these are committable) |
| Present in live repo | **No.** `generated-candidates/` does not exist at `/Users/handtomouse/maplemoon-website/…` at all |
| Worktree lock state | **Unlocked — prunable.** No `locked` file under `.git/worktrees/*/` |
| Other uncommitted entries in that worktree | 25 |

Integrity baseline captured alongside this report:
`CANDIDATE-MANIFEST.sha256` — 51 lines, self-hash
`4a1f0ac5d29197114a6bf3a06b393b6bfce33f6a97494ffd0b6514eed436e8dd`

This manifest is the recovery reference. If custody is decided later, any copy can be proved
byte-identical against it.

## The risk, stated plainly

An unlocked git worktree is removable by `git worktree remove`, and is pruned automatically
once its directory disappears. Nothing in the repository records that this worktree holds
71 MB of irreplaceable, unreferenced, untracked output. A routine worktree cleanup — the kind
run without a second thought — destroys the entire Wave-1D imagery exploration with no git
history to recover it from. This is the same failure class as `staging-v1/` being gitignored,
but worse: `staging-v1/` at least has a second replica on the iMac. This has none.

## Destination options

**Option A — iMac SMB replica (recommended).**
Mount is live and verified: `//handtomouse@HandToMouses-iMac.local/handtomouse` at
`/Volumes/handtomouse`, **1.5 TiB free**. Copy the directory, re-verify against the manifest.

- Off-machine redundancy, surviving both worktree prune and macbook disk pressure.
- Touches no repository state and no git metadata; nothing to unwind.
- Mirrors the custody pattern already used for `staging-v1/`.
- The macbook data volume is at **89% (49 GiB free)**, so keeping 71 MB off it is the cheaper side.

**Option B — durable path in the live repo, via packet.**
Copy into `/Users/handtomouse/maplemoon-website/docs/client-review/2026-08-01-saturday-review/generated-candidates/`.

- Puts the work where the reconciliation report already claims it lives.
- But forces a follow-on decision — commit 71 MB of PNGs, or gitignore them and reproduce the
  exact exposure this report is about. Adds to a working tree already carrying 145 changes.

**Option C — both.** A is the safety copy, B is the working location. Strictly the most robust.

**Recommendation: A now, B only if and when the candidates are promoted past exploration.**
A is reversible, cheap, off-machine, and needs no governance unwind.

## Immediate protective action available at zero byte cost

`git worktree lock` on the `27ab` worktree sets a flag that makes prune and remove refuse.
It moves no files, changes no tracked content, and reverses with `git worktree unlock`.

**Not performed.** It is a git state change on a repository where an unauthorized-commit
incident is already on record, so it is offered for approval rather than taken.

## What is needed from Nate — one answer

> Approve custody: **A** (iMac replica), **B** (live repo path), or **C** (both) —
> and separately, **yes/no** to locking worktree `27ab` in the meantime.

Nothing downstream in the imagery programme should start until this is answered, because
every remaining step references these files.
