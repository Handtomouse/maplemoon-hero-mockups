# Wave-1D candidate custody — execution receipt
# Executed: 2026-08-02 ~22:25 AEST · macbook Claude Code (worker)
# Authority: Nate, explicit in-session approval — destination "C (both)", worktree lock "yes".
# Prior report: CUSTODY-EXPOSURE-AND-PROPOSAL.md (same directory)

## What was authorised

Nate was asked two bounded questions and answered:

- Destination: **C — both** (iMac replica *and* live-repo working path)
- Lock worktree `27ab` in the meantime: **yes**

This receipt records only those two actions. No other git, storage or external action was taken.

## Actions performed

### 1. Worktree lock

    git worktree lock /Users/handtomouse/.codex/worktrees/27ab/maplemoon-website \
      --reason "holds 71MB untracked Wave-1D imagery candidates; custody approved by Nate 2026-08-02"

Verified: `git worktree list` now reports the worktree as `locked`, and the lock file is
present at `.git/worktrees/maplemoon-website3/locked`. `git worktree prune` and
`git worktree remove` will now refuse. Reversible with `git worktree unlock`.

### 2. Replication to two durable destinations

Source (unchanged, read-only throughout):
`/Users/handtomouse/.codex/worktrees/27ab/maplemoon-website/docs/client-review/2026-08-01-saturday-review/generated-candidates/`

| # | Destination | Pre-existing files | Transferred |
|---|---|---|---|
| A | `/Volumes/handtomouse/maplemoon-website/docs/client-review/2026-08-01-saturday-review/generated-candidates/` (iMac SMB) | 0 | 73,832,126 bytes |
| B | `/Users/handtomouse/maplemoon-website/docs/client-review/2026-08-01-saturday-review/generated-candidates/` (live repo) | 0 | 73,832,126 bytes |

Both destinations were confirmed empty beforehand. Nothing was overwritten. `rsync -a`, no
deletions, source untouched.

## Verification

Both copies checked against `CANDIDATE-MANIFEST.sha256`
(51 entries, manifest self-hash `4a1f0ac5d29197114a6bf3a06b393b6bfce33f6a97494ffd0b6514eed436e8dd`):

| Destination | Result |
|---|---|
| iMac replica | **51 / 51 OK, 0 failures** |
| Live repo | **51 / 51 OK, 0 failures** |

The exposure recorded in `CUSTODY-EXPOSURE-AND-PROPOSAL.md` is closed. The candidate set now
exists in three independent locations, one of them off-machine, all provably byte-identical.

## Consequence that is now live and still needs a decision

Option B's known follow-on cost has arrived: the live repo working tree now carries **51 new
untracked files (~71 MB)** under `generated-candidates/`. They are untracked and **not**
gitignored, so they will appear in `git status` and are committable.

That leaves an open choice, deliberately **not** made here:

- **commit them** — durable in history, but adds ~71 MB of PNGs to the repository permanently; or
- **gitignore them** — keeps the repo light, but reproduces exactly the class of exposure this
  custody action just closed (the `staging-v1/` problem), now mitigated only by the iMac replica.

This is a repository-configuration decision belonging to Nate and Codex, not a worker.
Until it is made, the iMac replica is the authoritative safety copy.

## Not done

No commit, push, deploy, publish, upload or send. No page, `staging-v1/`, manifest,
`docs/orchestration/`, `LOCK_MANIFEST.json` or `.gitignore` file was modified. No candidate
image was generated, altered, wired into any page, or promoted. No CR gate was recorded.
