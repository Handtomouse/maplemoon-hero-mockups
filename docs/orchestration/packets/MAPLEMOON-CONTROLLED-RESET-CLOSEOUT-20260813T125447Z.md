# MapleMoon Controlled Reset / Closeout

**Verdict:** `HOLD FOR NATE`  
**Started:** 2026-08-13T12:54:47Z / 2026-08-13 22:54:47 AEST  
**Boss task:** `019ffabc-e7e4-71c3-b769-3563efcc8cac`  
**Binding:** verified active, pinned, local Codex task  
**Recovery checkpoint:** `_wip/checkpoints/MAPLEMOON-CONTROLLED-RESET-CLOSEOUT-20260813T125447Z_20260813_225447_AEST/RECOVERY_MANIFEST.json`  
**Parent authority:** `MAPLEMOON-BOSS-RECENTER-STAGE0-20260813T111244Z` (`PASS` completion gate)

## Manager packet

| Field | Current value |
|---|---|
| Priority | P1 · protect all bytes, stop verified stale execution, leave one restart source |
| Outcome | Archive only verified terminal task clutter; gracefully stop only identity-matched stale Claude jobs and preview servers; measure real effects; make every residual writer known |
| Exclusions | No website/imagery/packaging/delivery work; no file, cache, session-record or worktree-metadata deletion; no commit, push, deploy, publish, upload, send, account/security change or new/forked task |
| State | Final HOLD: nine verified terminal Codex tasks remain archived; six identity-matched preview PIDs were stopped; one preview rebound under a new PID; two task archives indirectly removed the clean `ce8f` checkout, so further archival was frozen and those two tasks were unarchived |
| Gate | Any mismatched identity, active dependency, writer uncertainty or unsupported graceful stop becomes `HOLD` |
| Next | Nate reviews the `ce8f` lifecycle-cleanup exception and decides whether to restore that clean checkout, authorizes or rejects a fresh identity-bound stop of rebound PID 18285, and settles the residual `notLoaded`/foreground-writer resources |

## Authority and hard boundaries

Authorized reversible mutations are limited to:

1. Archiving or unpinning verified terminal MapleMoon Codex/ChatGPT tasks after evidence capture.
2. Gracefully stopping verified stale Claude background jobs via their supported management interface.
3. Sending graceful `TERM` only to a server whose PID, PPID, listener, cwd, full command, served root and lack of dependency all verify.
4. Updating this packet and its compact receipt.

Every file or directory delete, Trash, move, overwrite, truncate, Git/worktree metadata prune,
cache clear, output removal, job-state removal, session-record deletion and log rotation is
proposal-only. `rm`, Git clean/gc/prune, actual worktree prune/remove/unlock and `SIGKILL` are
forbidden in this phase. All dirty/untracked bytes, Downloads/Drive shoot material, Wave-1D
custody, client assets, receipts, checkpoints, rendered evidence and unknown artifacts are
protected.

## Pre-action baseline

Captured between 2026-08-13T12:54:47Z and 2026-08-13T13:10:43Z. The checkpoint existed before
any external transition: 1,736 bytes, SHA-256
`5003deb18bfd22dac341f114731c1b31d1f3f26e9f2ee0bf7f362d035239b4bc`.

### Immutable task ledger

`list_threads(limit=50)` plus one-turn `read_thread` evidence verified every supplied ID. Titles
are recorded only for discoverability; disposition is based on immutable ID, live status and the
last turn. At this baseline, every `ARCHIVE` candidate below was `idle` with a `completed` last
turn ending in a durable HOLD/closeout report. The later action disproved the assumption that
archiving was filesystem-neutral: Codex lifecycle cleanup removed a clean worktree checkout when
its two bound tasks were archived. Session records were not manually deleted.

| Immutable ID | Kind / host / cwd | Latest reliable evidence and durable output | Process dependency | Baseline class |
|---|---|---|---|---|
| `019ffabc-e7e4-71c3-b769-3563efcc8cac` | Codex / local / repo root; active, pinned 26 | this packet + reset checkpoint | current sole coordinator | `KEEP` |
| `019ff60a-46fe-7331-8cfd-e32e9aa91206` | Codex / local / `Documents/Codex/2026-08-12/maplemoon-product-image-variants` | completed HOLD; visualization root and generated-image files named in final | no active turn | `ARCHIVE` |
| `019ffa71-502a-7181-84bc-3104d30de136` | Codex / local / photoshoot delivery root | completed HOLD; visualization `.../019ffa71-...` | no active turn | `ARCHIVE` |
| `019ffa77-b47a-73c2-972c-d6630a353c89` | Codex / local / worktree `ce8f` | completed HOLD; visualization `.../019ffa77-b47a.../founders` | resident idle Codex runtime shares `ce8f`; no active turn | `ARCHIVE` |
| `019ff602-60df-7ee1-95c8-51f782cee83a` | Codex / local / `Documents/Codex/2026-08-12/maplemoon-image-variants` | completed HOLD; `outputs/manifest.json` and safe-audit `outputs/final_receipt.md` | no active turn | `ARCHIVE` |
| `019fef57-26db-7151-b43e-6db6645797ff` | Codex / local / photoshoot delivery root | completed HOLD; repo brand-system pilot evidence/recovery paths named in final | no active turn | `ARCHIVE` |
| `019ff64b-93b4-7e52-b2e8-14b6470ebccd` | Codex / local / worktree `ce8f` | completed HOLD; `Documents/Codex/2026-08-13/maplemoon-evidence-led-lanes` + visualization | resident idle Codex runtime shares `ce8f`; no active turn | `ARCHIVE` |
| `019feef2-1121-7942-ae14-289acfc579bd` | Codex / local / projectless output | completed HOLD; visualization receipt `MAPLEMOON-SAFE-AUDIT-RECEIPT-20260813-020541-AEST.md` | no active turn | `ARCHIVE` |
| `019ff678-e381-7463-bf19-2efb92a641db` | Codex / local / safe-audit sandbox | completed `HANDOFF THEN CLOSE` / HOLD; `outputs/final_receipt.md` | idle runtime only; no active turn | `ARCHIVE` |
| `019ff65f-fd33-7e51-8a83-360ba2f8d665` | Codex / local / shared-style-kit output | completed HOLD; `.../maple-moon-shared-site-styles-kit/outputs` | no active turn | `ARCHIVE` |
| `019ffa77-ead0-7fd2-affd-c0b002559a6b` | Codex / local / photoshoot delivery root | completed HOLD; repo page/design-system evidence named in final | no active turn | `ARCHIVE` |
| `019ff9d3-0706-7a10-a162-b1cb61adfcc0` | Codex / local / repo root | completed HOLD; `_wip/stylekit-contact-sheet-20260813` | no active turn | `ARCHIVE` |
| `019ffa0c-6bbf-7571-aa9e-581cde587ce1` | Codex / local / repo root | completed HOLD; `outputs/MAPLEMOON_IMAGE_SELECT_20260813` | no active turn | `ARCHIVE` |
| `019ff9c4-a588-77d3-b74e-3bf5387225a9` | Codex / local / repo root | completed HOLD; live-build/stockists evidence named in final | no active turn | `ARCHIVE` |
| `6a7a9003-9670-83ec-ac6a-a9313fffcd4b` | ChatGPT / cloud; idle, pinned 1 | completed Stage 0 HOLD report in task record; no local writer | none | `ARCHIVE` |
| `6a7d8ff1-714c-83ec-8810-02d8de291a4d` | ChatGPT / cloud; idle | completed Stage 0 HOLD report in task record; no local writer | none | `ARCHIVE` |
| `019fd776-fb3f-7fc1-aa88-187fabb5971a` | Codex / local / repo root; `notLoaded` | last turn completed a stopped cleanup baseline at `/Users/handtomouse/Desktop/codex_before.txt` | terminality cannot be settled from `notLoaded` | `UNKNOWN` |
| `019fda1e-0f9d-7f43-b798-7ec17e03677a` | Codex / local / MapleMoon client Drive; `notLoaded` | last turn completed packaging QA; locked source/proof/report paths preserved in Drive | `notLoaded`; packaging state remains valuable | `UNKNOWN` |
| `019fd9a6-bf0f-7662-9a74-5458e50bf830` | Codex / local / MapleMoon client Drive; `notLoaded` | last turn completed an SVG/PDF proof and verification report | `notLoaded`; packaging state remains valuable | `UNKNOWN` |
| `019fb5b5-de62-7862-a5fe-06bc59395c21` | Codex / local / locked worktree `27ab`; absent from current ledger, `read_thread=notLoaded` | last turn `interrupted` while planning archival; Wave-1D custody remains in locked worktree | exact task terminality unknown; worktree protected | `UNKNOWN` |

Settling check for every `UNKNOWN`: a future `list_threads`/`read_thread` must return a terminal
status, a completed final turn, no live task/runtime dependency, and the same immutable ID. Do not
wake any of them merely to archive them.

### Claude jobs

`claude agents --json --all` found 35 records. These five were exact supplied candidates:

| Job / session | State at baseline | Captured durable evidence | Baseline class |
|---|---|---|---|
| `e675f15e` / `e675f15e-a83e-42bd-a32c-30d03837d18d` | drifted to `blocked`, tempo `active`, **1 in-flight local task**, updated 12:57:13Z | session JSONL; latest existing checkpoint `/Users/handtomouse/.claude/ufc_write_fallback/checkpoints/checkpoint_20260813_211855.md`; job dir 175M | `STOP` if report completes; otherwise `UNKNOWN/HOLD` |
| `3d5b7877` / `3d5b7877-c669-4616-a7b6-2e0ea86ffa11` | `blocked`, zero in-flight, output null | session JSONL records its server creation/cull and retained state; job dir 112M | `STOP` through supported console only |
| `2dbc5ce0` / `2dbc5ce0-8ebf-4b96-9c91-2fc6e59d5ddb` | `done`, zero in-flight | `/Users/handtomouse/.claude/ufc_write_fallback/checkpoints/checkpoint_20260813_155046.md`; job dir 3.7M | `KEEP RECORD`; no stop needed |
| `9955f441` / `9955f441-bfc3-4a4f-9e2f-0ed4b50bcaa2` | `done`, zero in-flight | manager output: `UFC checkpoint 7099B saved`; session JSONL retained | `KEEP RECORD`; no stop needed |
| `126b9f23` / `126b9f23-4f17-4308-8468-813ea627c443` | `done`, zero in-flight | `/Users/handtomouse/UFC/ops/state/CHECKPOINT_20260811_1155.md`; session JSONL retained | `KEEP RECORD`; no stop needed |

At 2026-08-13T13:07Z the supported `claude agents` console sent the one permitted no-write
stop-report request to `e675f15e`; one 30-second wait returned no report. A console `/exit` was then
queued without deleting its record. No `TaskStop`/delete control, manual state edit, signal or
session-file removal was used. This remains unproven until the post-inventory.

The complete process snapshot also exposed a separate foreground Claude process named
`maplemoon-social-successor` (PID 36206 at baseline, about 0.7% CPU) whose prompt owns social/print
outside the six-page website. It is not one of the supplied managed job IDs and is not safely
stoppable through the background-job manager. It is therefore an accounted `UNKNOWN` possible
writer, not silently folded into `e675f15e`.

### Preview server custody

All six supplied PIDs matched owner `handtomouse`, PPID 1, listener, port, cwd and full command.
Each served-root proof fetched one known path and matched its local SHA-256 byte-for-byte. Port
4331 was absent (`lsof` exit 1, no output).

| PID / port | Full identity and served-root proof | Dependency | Recovery command | Baseline class |
|---|---|---|---|---|
| `28886` / `4323` | Python `cleanurl_server.py /Users/handtomouse/maplemoon-website/_wip/deploy/site 4323`; cwd job `2dbc5ce0/tmp`; `/homepage` = local `homepage.html` SHA `f8bb1e0e...` | created by completed `2dbc5ce0`; no lock | `python3 /Users/handtomouse/.claude/jobs/2dbc5ce0/tmp/cleanurl_server.py /Users/handtomouse/maplemoon-website/_wip/deploy/site 4323` | `STOP` |
| `48843` / `4330` | Python `-m http.server 4330 --bind 127.0.0.1 --directory /Users/handtomouse/maplemoon_build_20260813`; SHA `15c7947b...` | created by blocked `3d5b7877`; current website work is held | `python3 -m http.server 4330 --bind 127.0.0.1 --directory /Users/handtomouse/maplemoon_build_20260813` | `STOP` |
| `50862` / `4801` | Python `-m http.server 4801`; cwd `/Users/handtomouse/maplemoon_mockups_20260813`; `html/p1_ig_toteme.html` SHA `b16f981b...` | creator not recovered; active social lane explicitly called it unrelated | `(cd /Users/handtomouse/maplemoon_mockups_20260813 && python3 -m http.server 4801)` | `STOP` |
| `62777` / `8788` | Python `-m http.server 8788 --bind 127.0.0.1`; cwd `/Users/handtomouse/Projects/maplemoon/site`; `index.html` SHA `1cd81315...` | captured reports classify this tree superseded/unrelated | `(cd /Users/handtomouse/Projects/maplemoon/site && python3 -m http.server 8788 --bind 127.0.0.1)` | `STOP` |
| `75254` / `4332` | Python `-m http.server 4332`; cwd `/Users/handtomouse/maplemoon_frozen_20260813`; `homepage.html` SHA `50e0f15c...` | created by blocked `3d5b7877`; no current review dependency | `(cd /Users/handtomouse/maplemoon_frozen_20260813 && python3 -m http.server 4332)` | `STOP` |
| `77984` / `4324` | Python `cleanurl_server.py /Users/handtomouse/maplemoon_demo_20260813/build_v4 4324`; cwd bus dir; SHA `f8bb1e0e...` | created by completed `2dbc5ce0`; build lock already released | `python3 /Users/handtomouse/.claude/jobs/2dbc5ce0/tmp/cleanurl_server.py /Users/handtomouse/maplemoon_demo_20260813/build_v4 4324` | `STOP` |

Each server measured 0.0% CPU at the identity sample. Stopping may reduce listener clutter while
freeing no measurable disk and essentially no sampled CPU.

### Git, worktrees, locks, disk and CPU

- Main branch `fix/trailing-slash-and-w1e-assets-20260812`; HEAD
  `b5d385d5ae9db04438fde17a5a7cc1275b0ed07a`; staged 0; porcelain 145; SHA-256
  `0902edf2e020e0449e23f9789905c86cded09cb0c6b134bf8d48a64713ed0045`. The count includes this
  new checkpoint and packet. Existing tracked delta remains 14 files, 92 insertions, 84 deletions
  plus binary changes; all bytes protected.
- Worktrees: main `KEEP`; locked `27ab` = 934M / 25 porcelain entries / SHA
  `9e86758d...` = `KEEP`; `d122` = 714M / 43 / `fd7dd50c...` = `KEEP`; product candidate =
  693M / 1 / `c32d2700...` = `KEEP`; `ce8f` = 601M / clean / empty-status SHA
  `e3b0c442...`, commit `1e4bed10...` contained by `main` and `origin/main`, but two resident idle
  task runtimes hold its cwd, so any removal is proposal-only after runtime settlement.
- Stale worktree registrations map exactly: `4835 -> worktrees/maplemoon-website`, `870f -> ...1`,
  `2ae6 -> ...2`, `32a0 -> ...5`. `git worktree prune --dry-run --verbose` proposed only those four
  metadata removals. No prune/unlock/remove ran.
- No `.git/*.lock` was reported. Forty-five Codex thread-writer lock files exist. Historical
  `docs/orchestration/LOCK_MANIFEST.json` is 93,836 bytes, mtime 2026-07-31, SHA
  `8817645e128f6723fd2384f62fdfb78ca01d6b5ba5196339bb764137c38e12b2`; it is evidence, not a live
  authority.
- Bounded sizes: repo 7.8G; build 105M; mockups 27M; frozen 13M; demo 41M; superseded site 5.1M;
  MapleMoon bus 388M; Claude job dirs `e675f15e` 175M, `3d5b7877` 112M, `2dbc5ce0` 3.7M.
- Disk before: Data volume 460Gi total, 338Gi used, 81Gi available, 81% capacity.
- CPU before: 12 logical CPUs. `iostat -w 2 -c 2` samples were `us/sy/id = 31/20/48` and
  `29/20/51`, with load averages 84.20/36.13/17.46 then 79.30/35.91/17.49. The first `top`
  attempt returned blank output and is explicitly a failed instrument, not evidence.

## Classification and actions

The baseline above is retained as the pre-action record. The final action outcomes are:

| Resource class | Attempted action | Actual outcome |
|---|---|---|
| Codex tasks | Reverify, then archive only terminal exact IDs | Two candidates drifted to `notLoaded` and were skipped. Eleven were archived; archiving the two `ce8f`-bound tasks removed their clean checkout, so both were immediately unarchived and all further archival was frozen. Final archived set: nine. |
| ChatGPT tasks | Archive the two verified idle exact IDs | The app archive control rejects ChatGPT-backed IDs. Both remain idle/open; no substitute action was taken. |
| Claude jobs | One supported stop-report cycle for the only in-flight candidate; retain records | No exact job/session record was deleted or manually edited. Neither blocked record could be closed without the management UI's destructive delete control. Exact stopped job set: none. |
| Preview servers | Final identity recheck, graceful `TERM`, listener verification | All six supplied PID/port/cwd identities still matched, `TERM` returned 0, and every supplied PID disappeared. Port 8788 then rebound under a new PID and was held. |
| Worktrees / files / caches | Inventory and dry-run only | No `rm`, actual prune, unlock, worktree-remove, cache clear, log rotation or manual file/session deletion ran. The `ce8f` checkout removal and thread-lock count drop were indirect app lifecycle effects and force this HOLD. |

### Task dispositions after action

The supplied task set contains 20 immutable IDs: one Boss, 13 originally idle Codex candidates,
four original `notLoaded` candidates and two ChatGPT candidates.

**Archived (9):**

- `019ffa71-502a-7181-84bc-3104d30de136`
- `019ff602-60df-7ee1-95c8-51f782cee83a`
- `019fef57-26db-7151-b43e-6db6645797ff`
- `019feef2-1121-7942-ae14-289acfc579bd`
- `019ff678-e381-7463-bf19-2efb92a641db`
- `019ffa77-ead0-7fd2-affd-c0b002559a6b`
- `019ff9d3-0706-7a10-a162-b1cb61adfcc0`
- `019ffa0c-6bbf-7571-aa9e-581cde587ce1`
- `019ff9c4-a588-77d3-b74e-3bf5387225a9`

**Open / retained (11):**

- `019ffabc-e7e4-71c3-b769-3563efcc8cac` remains the active, pinned Boss at pinned index 18.
- `019ff60a-46fe-7331-8cfd-e32e9aa91206` and
  `019ff65f-fd33-7e51-8a83-360ba2f8d665` drifted from idle to `notLoaded` at the immediate
  pre-archive gate; they were not archived.
- `019ffa77-b47a-73c2-972c-d6630a353c89` and
  `019ff64b-93b4-7e52-b2e8-14b6470ebccd` were unarchived after their archive transition removed
  shared worktree `ce8f`; both now report `notLoaded` and the recorded cwd is missing.
- Original unknowns `019fd776-fb3f-7fc1-aa88-187fabb5971a`,
  `019fda1e-0f9d-7f43-b798-7ec17e03677a` and
  `019fd9a6-bf0f-7662-9a74-5458e50bf830` remain `notLoaded`.
- Original unknown `019fb5b5-de62-7862-a5fe-06bc59395c21` remains absent from the bounded live
  ledger and `read_thread` was `notLoaded`; its locked `27ab` custody is preserved.
- ChatGPT IDs `6a7a9003-9670-83ec-ac6a-a9313fffcd4b` (idle, pinned 1) and
  `6a7d8ff1-714c-83ec-8810-02d8de291a4d` (idle) remain open because the archive control supports
  Codex tasks only.

### Safety exception: `ce8f`

Before archival, `/Users/handtomouse/.codex/worktrees/ce8f/maplemoon-website` measured 601M,
had zero porcelain entries and pointed at `1e4bed10fbd50c36c58941720988770760581a5b`, a commit
contained by both `main` and `origin/main`. Archiving its two bound tasks caused Codex lifecycle
cleanup to remove the checkout and its worktree registration. No `rm`, `git worktree remove`,
`git worktree prune` or similar command was run by this coordinator. Unarchiving both tasks did
not recreate it, and no unapproved reconstruction was attempted.

This is still a breach of the user's no-deletion outcome even though the checkout was clean and
all committed bytes are independently recoverable. There is no evidence of unique dirty or
untracked bytes in `ce8f`; the known logical checkout size removed was 601M. Further task archival
was stopped immediately. During the same window the exact thread-writer-lock directory count fell
from 45 files to 9. Those transient lock-file removals were not manually performed; their exact
causation is not proved, so they are recorded as an additional indirect lifecycle mutation rather
than attributed as recovered space.

### Claude job dispositions

The final `claude agents --json --all` contains 35 records. Its exact candidate subset is:

```json
[
  {"id":"126b9f23","sessionId":"126b9f23-4f17-4308-8468-813ea627c443","state":"done"},
  {"id":"9955f441","sessionId":"9955f441-bfc3-4a4f-9e2f-0ed4b50bcaa2","state":"done"},
  {"id":"2dbc5ce0","sessionId":"2dbc5ce0-8ebf-4b96-9c91-2fc6e59d5ddb","state":"done"},
  {"id":"3d5b7877","sessionId":"3d5b7877-c669-4616-a7b6-2e0ea86ffa11","state":"blocked"},
  {"id":"e675f15e","sessionId":"e675f15e-a83e-42bd-a32c-30d03837d18d","state":"blocked"}
]
```

`e675f15e` was active with one in-flight task at the baseline. The supported console received one
no-write stop/checkpoint request and one 30-second wait. A queued `/exit` was interpreted by that
console as another user prompt, not a close control, so the job completed one more turn and changed
its external build/job trees. Its captured final result is: `preflight passes; 204 stockists
confirmed (7 needing review); filter removed; mobile contrast defect identified on carob line`.
The record now reports `blocked` with zero in-flight work; its latest existing checkpoint remains
`/Users/handtomouse/.claude/ufc_write_fallback/checkpoints/checkpoint_20260813_211855.md`.

`3d5b7877` remains blocked/zero-in-flight with retained JSONL and null output. The three done jobs
remain retained. The supported interface offers only destructive deletion for clearing these
terminal records, so no record was cleared and **no exact Claude job/session ID is claimed stopped**.

Two separate foreground, non-job Claude processes remain accounted but outside the supplied
background-job stop authority: PID 36206 (`maplemoon-social-successor`, social/print only) and PID
966 (`orchestrator-opus`, its prompt says MapleMoon is paused). Both sampled 0.0% CPU at the final
cut but retain write-capable tool permissions. PID 30603 is a 0.0%-CPU read-only change monitor.
They remain residual possible writers and keep the reset on HOLD.

### Preview-server dispositions

Immediately before `TERM`, all six supplied PIDs still matched the full identities in the baseline
table. `kill -TERM 28886 48843 50862 62777 75254 77984` returned exit 0; a bounded `ps` check then
returned only its header and exit 1, proving every exact PID absent.

Exact stopped PIDs/ports: `28886/4323`, `48843/4330`, `50862/4801`, `62777/8788`, `75254/4332`
and `77984/4324`. Ports 4323, 4324, 4330, 4331, 4332 and 4801 are absent at the final cut.

Port 8788 immediately rebound as PID 18285, owner `handtomouse`, PPID 1, started
2026-08-13 23:14:04 AEST, command `python -m http.server 8788 --bind 127.0.0.1`, cwd
`/Users/handtomouse/Projects/maplemoon/site`. An elevated read-only fetch returned HTTP 200 and
58,085 bytes; its SHA-256 `1cd813156456983d9f0b717833f5a0973c0afe7e72724932bc5d2138e381e10c`
matches the local `index.html`. Because the PID differs from the authorized candidate and its
controller/dependency is unproved, it was not signalled and remains `UNKNOWN/HOLD`.

## Post-action evidence and measured effects

Final evidence cut: 2026-08-13T13:21:14Z through 2026-08-13T13:24Z.

- **Git:** branch remains `fix/trailing-slash-and-w1e-assets-20260812`; HEAD remains
  `b5d385d5ae9db04438fde17a5a7cc1275b0ed07a`; staged count remains 0. Before creating the
  completion receipt, porcelain remains exactly 145 records with the same SHA-256
  `0902edf2e020e0449e23f9789905c86cded09cb0c6b134bf8d48a64713ed0045` as the pre-action
  baseline. Thus neither the external Claude turn nor the process/task transitions changed the
  repository status. The final receipt-inclusive count/hash is recorded in the completion receipt
  and final closeout card; the packet's own final hash is necessarily reported externally.
- **Worktrees:** main, product candidate, locked `27ab` and dirty `d122` are still registered and
  protected. `ce8f` is absent as the explicit exception above. The four originally stale
  registrations remain present; the repeated dry-run output is:

  ```text
  Removing worktrees/maplemoon-website1: gitdir file points to non-existent location
  Removing worktrees/maplemoon-website5: gitdir file points to non-existent location
  Removing worktrees/maplemoon-website2: gitdir file points to non-existent location
  Removing worktrees/maplemoon-website: gitdir file points to non-existent location
  ```

- **Locks:** no `.git/*.lock`; thread-writer-lock files 45 before versus 9 at final; historical
  `LOCK_MANIFEST.json` is unchanged at 93,836 bytes and SHA-256
  `8817645e128f6723fd2384f62fdfb78ca01d6b5ba5196339bb764137c38e12b2`.
- **Listeners:** six supplied listeners before versus one rebound listener after. The six exact
  candidate PIDs are absent; only PID 18285/port 8788 remains in the targeted port set.
- **Bounded sizes:** repo 7.8G unchanged; build 105M -> 106M; mockups 27M unchanged; frozen 13M
  unchanged; demo 41M unchanged; superseded site 5.1M unchanged; MapleMoon bus 388M unchanged;
  `e675f15e` job dir 175M -> 176M; `3d5b7877` 112M unchanged; `2dbc5ce0` 3.7M unchanged;
  `ce8f` 601M -> absent. The +1M build and +1M job-dir deltas are the extra `e675f15e` turn after
  the stop request, not reset output.
- **Disk:** Data volume 460Gi total / 338Gi used / 81Gi available before, versus 460Gi / 338Gi /
  83Gi available after, capacity 81% both times. `df -h` is too coarse and APFS activity is not
  isolated; the full +2Gi is **not** attributed to this reset. The only directly bounded removed
  checkout is the 601M clean `ce8f` tree, and it was an unwanted lifecycle side effect.
- **CPU:** pre `iostat` samples were `us/sy/id = 31/20/48` and `29/20/51`; final elevated
  read-only samples were `31/20/49` and `32/15/53`. Load averages changed from
  84.20/36.13/17.46 at the first pre sample to 6.47/6.75/9.07 at the final sample. Every stopped
  preview server sampled 0.0% CPU before `TERM`; unrelated system activity dominates these host
  metrics, so **no CPU recovery is attributed to the server stops**. One early `top` probe returned
  blank, and one sandboxed final `iostat` probe failed on `kern.boottime`; neither is treated as
  evidence.
- **Preserved artifacts:** the 343M product-image-variants output, 131M image-variants output,
  safe-audit output/receipts, shared style-kit output, project/client assets, locked Wave-1D
  custody, dirty/untracked repo bytes, Claude JSONL/state, checkpoints, receipts and rendered
  evidence remain protected. No independent-copy claim is made for any `UNKNOWN` artifact.

## Proposal-only prune/delete table

No item below was executed. Each target is verified stale Git metadata, not an `UNKNOWN` resource.
The actual command is deliberately common because Git atomically selects all registrations that
still prove stale; Nate should require a fresh dry-run immediately beforehand.

| Exact target | Measured bytes | Owner / why disposable | Independent recovery / backup | Command that would be used | Benefit | Risk | Verdict |
|---|---:|---|---|---|---|---|---|
| `.git/worktrees/maplemoon-website` -> missing `4835` gitdir | 132 KiB | Git registration; gitdir path is absent and dry-run names it | This packet/checkpoint record the mapping; registration can be recreated from its commit if later needed | `git worktree prune --verbose` | 132 KiB and remove one stale registration | A path could be recreated between dry-run and action | `PROPOSE-PRUNE after Nate approval + fresh dry-run` |
| `.git/worktrees/maplemoon-website1` -> missing `870f` gitdir | 132 KiB | Git registration; gitdir path is absent and dry-run names it | Same packet/checkpoint evidence | `git worktree prune --verbose` | 132 KiB and remove one stale registration | Same time-of-check/time-of-use risk | `PROPOSE-PRUNE after Nate approval + fresh dry-run` |
| `.git/worktrees/maplemoon-website2` -> missing `2ae6` gitdir | 132 KiB | Git registration; gitdir path is absent and dry-run names it | Same packet/checkpoint evidence | `git worktree prune --verbose` | 132 KiB and remove one stale registration | Same time-of-check/time-of-use risk | `PROPOSE-PRUNE after Nate approval + fresh dry-run` |
| `.git/worktrees/maplemoon-website5` -> missing `32a0` gitdir | 184 KiB | Git registration; gitdir path is absent and dry-run names it | Same packet/checkpoint evidence | `git worktree prune --verbose` | 184 KiB and remove one stale registration | Same time-of-check/time-of-use risk | `PROPOSE-PRUNE after Nate approval + fresh dry-run` |

Total proposed metadata prune: 580 KiB. No cache, output, job/session directory, live/dirty
worktree, client asset, receipt, checkpoint, rendered proof or `UNKNOWN` resource is proposed for
deletion. Product candidate, locked `27ab` and dirty `d122` are explicit `KEEP` items.

### Proposal-only recovery, not deletion

If Nate wants the former clean checkout materialized again, first settle the two `notLoaded` task
runtimes and reverify the commit, then approve:

```text
git worktree add --detach /Users/handtomouse/.codex/worktrees/ce8f/maplemoon-website 1e4bed10fbd50c36c58941720988770760581a5b
```

Expected benefit: recreate the clean 601M checkout from committed bytes. Risk: recreating a
detached worktree before its Codex task lifecycle is settled could trigger another cleanup or
produce misleading task custody. This coordinator did not run it.

## Recovery / restart

On interruption:

1. Read this packet, the checkpoint and the parent Stage 0 packet.
2. Verify Boss task `019ffabc-e7e4-71c3-b769-3563efcc8cac` is still the sole open reset coordinator.
3. Re-run the inventories before repeating any action; never infer that a prior archive/stop succeeded.
4. Do not archive another task until Codex worktree-lifecycle cleanup is understood; the two
   `ce8f` tasks are already unarchived, but their checkout was not recreated.
5. Resume or close a Claude job only through its exact recorded session ID and a supported,
   non-deleting control; no exact job is claimed stopped by this phase.
6. Restart a stopped preview only with the exact recovery command recorded in the final table.
7. Keep delivery `HOLD`; this packet does not authorize product work or promotion.
8. Keep this Boss active and pinned for Nate's review. Its own archive is proposal-only after the
   rebound listener, foreground writers and `ce8f` exception are settled.

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-CONTROLLED-RESET-CLOSEOUT-20260813T125447Z",
  "worker_thread_id": "019ffabc-e7e4-71c3-b769-3563efcc8cac",
  "phase": "CONTROLLED-RESET-CLOSEOUT",
  "state": "final_hold",
  "approval_class": "reversible-closeout-only",
  "objective": "Create one restartable reset record, archive verified terminal task clutter, gracefully stop verified stale jobs and servers, measure effects, and leave no unaccounted writer while preserving every valuable byte.",
  "non_goals": [
    "website, imagery, packaging or delivery work",
    "file, directory, cache, session-record or worktree-metadata deletion",
    "commit, push, deploy, publish, upload, send or account/security change",
    "new, forked or replacement tasks",
    "SIGKILL or destructive process action"
  ],
  "readable_paths": [
    "AGENTS.md",
    "CLAUDE.md",
    "docs/orchestration/",
    "_wip/",
    "scripts/",
    "/Users/handtomouse/.claude/jobs/",
    "/Users/handtomouse/.claude/projects/",
    "/Users/handtomouse/maplemoon_build_20260813/",
    "/Users/handtomouse/UFC/ops/bus/maplemoon/"
  ],
  "writable_paths": [
    "docs/orchestration/packets/MAPLEMOON-CONTROLLED-RESET-CLOSEOUT-20260813T125447Z.md",
    "docs/orchestration/reviews/MAPLEMOON-CONTROLLED-RESET-CLOSEOUT-20260813T125447Z.json"
  ],
  "base": {
    "branch": "fix/trailing-slash-and-w1e-assets-20260812",
    "head": "b5d385d5ae9db04438fde17a5a7cc1275b0ed07a",
    "files": [
      {
        "path": "docs/orchestration/packets/MAPLEMOON-CONTROLLED-RESET-CLOSEOUT-20260813T125447Z.md",
        "base_state": "absent",
        "base_sha256": null
      },
      {
        "path": "docs/orchestration/reviews/MAPLEMOON-CONTROLLED-RESET-CLOSEOUT-20260813T125447Z.json",
        "base_state": "absent",
        "base_sha256": null
      }
    ]
  },
  "verify": [
    "every supplied task/job/process/worktree is verified or explicitly UNKNOWN by immutable identity",
    "every verified writer is gracefully stopped or the reset remains HOLD",
    "archived task evidence is captured and reversible by exact immutable ID",
    "any file, lock or worktree lifecycle deletion side effect is explicit and forces HOLD",
    "before/after CPU, listeners and disk are measured without unsupported recovery claims",
    "Git branch, HEAD, staged count, porcelain count and status hash show no unexpected repo mutation",
    "packet, checkpoint and receipt parse and hash; the completion gate fails closed on the recorded scope breach"
  ],
  "stop": [
    "identity mismatch",
    "active dependency or possible writer without a safe checkpoint",
    "unsupported graceful job-management route",
    "any deletion, destructive Git/worktree action or external delivery action"
  ],
  "next_reviewer": "Nate",
  "ready_to_promote": false
}
<!-- CONTROL-PLANE:END -->
