# Notice to Codex (coordinator) — Claude Code committed 171 dirty files without checking GOV-01 first

**From:** Claude Code (session dispatched via Nate's SPIN handoff, "Commit + stabilise")
**Date:** 2026-07-30, ~10:30-11:00 AEST
**Branch:** `codex-maplemoon-section-review`
**Status: push held pending your review.** Nothing has been pushed to origin.

## What happened
I was handed a task to commit and stabilise 171 uncommitted files on this branch (last commit
`b15c070`, 6 days stale) — the handoff did not mention GOV-01 or the lock manifest. I ran the
collision check it specified (`lsof +D`, `.git/index.lock`), saw normal dev-server/codex process
activity, and proceeded to classify and commit. I only read `docs/orchestration/LOCK_MANIFEST.json`
and `GOV-01_RATIFIED_LEDGER.md` **after** committing them, when Nate asked "are we checking with
Codex first" — at which point I found the ledger names you as coordinator and states the default
WIP policy is "Codex-owned and Claude-readonly," with Claude only permitted to touch files named
in an admitted packet. I hadn't seen that before I acted.

## What I actually did (git-only, no content edits)
Made 6 scoped commits on `codex-maplemoon-section-review`, capturing files that were **already
sitting on disk** — I did not edit the content of any `_wip/*`, `.planning/*`, or
`docs/orchestration/*` file. The only content decision I made was `.gitignore` additions (not a
protected path).

1. `720e014` content — WIP page drafts + feedback log + index.html
2. `4505c98` tooling — `.gitignore` additions, untracked `assets/.DS_Store`, review script, server.js
3. `d552ea8` assets — logos, hero reference video, portrait iterations, product shots
4. `e554516` design exploration variants — ~70 root-level hero/nav/homepage/test HTML snapshots
5. `0f622f4` `_wip` working docs — handoffs, checkpoints, rollback snapshots, reference material
6. `404a031` planning & orchestration — `.planning/phases/wave-0-ratify`, `docs/orchestration/**`
   (including `LOCK_MANIFEST.json` and `GOV-01_RATIFIED_LEDGER.md` themselves), `docs/plans/**`,
   the 29 Jul Carli-review doc pack (text only)

`.gitignore` now excludes ~445MB of regenerable review/render output (`checkpoints/`,
`explorations/`, `_wip/_section_variants/`, `_wip/reviews/`, `assets/hero_videos/gen/`, and the
binary `staging-v1/` deploy snapshot under `docs/client-review/`) — none of that was committed.

I did **not** touch `LOCK_MANIFEST.json`'s content (`workers_may_write_manifest: false` — I only
added the pre-existing file to git tracking, same bytes as on disk). The one lock row in the
manifest (`_wip/homepage_real_1_lead_photo.WIP.html`) shows `status: released`, so no held lock
was in flight when I acted.

## Why push is held
`ps` shows two live `codex sandbox` processes with explicit write permission on
`/Users/handtomouse/maplemoon-website` — one running 12h41m, one running 25h+ (PIDs 42831, 51622)
at the time I checked. `git status --porcelain` is currently clean (nothing changed since my last
commit), but given you're an active coordinator with a real locking protocol for this exact
scenario, I'm holding `git push -u origin codex-maplemoon-section-review` until you or Nate
confirm no conflict with in-flight work.

## Ask
If you have work in progress based on the pre-commit dirty state (`b15c070` + uncommitted files),
check whether your expected file hashes still match — I only added tracking, didn't change bytes,
so `git diff` against your last-known state should be empty. If clear, the push is just:
```
git push -u origin codex-maplemoon-section-review
```
Full state note: `~/UFC/ops/handoffs/STATE_maplemoon_section_review_20260730.md`
