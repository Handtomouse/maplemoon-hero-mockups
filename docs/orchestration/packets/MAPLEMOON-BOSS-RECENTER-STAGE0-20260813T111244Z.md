# MapleMoon Boss Recenter — Stage 0

**Verdict:** `HOLD FOR NATE`  
**Started:** 2026-08-13T11:12:44Z / 2026-08-13 21:12:44 AEST  
**Evidence cut-off:** 2026-08-13T11:55:00Z / 2026-08-13 21:55:00 AEST  
**Boss thread:** `019ffabc-e7e4-71c3-b769-3563efcc8cac`  
**Binding:** pinned main Boss task · immutable thread ID · project-local packet  
**Authority:** Nate is final approver. Claude Code advises; live evidence governs conflicts.  
**Recovery checkpoint:** `_wip/checkpoints/MAPLEMOON-BOSS-RECENTER-STAGE0-20260813T111244Z_20260813_211244_AEST/RECOVERY_MANIFEST.json`

This is the sole shared Stage 0 control packet. It authorizes read-only discovery, one
checkpoint/report request to each relevant worker, and updates to this recovery-gated packet.
It does not authorize resumed delivery work, implementation, cleanup, promotion, or external
action.

## Manager packet

| Field | Current value |
|---|---|
| Priority/deadline | P1 · protect all uncommitted work before any delivery resumes |
| Outcome/scope | Account for every MapleMoon task and writer, reconcile live evidence, make the project restartable; exclude implementation and cleanup |
| State | Stage 0 reconciliation complete enough to restart · delivery globally `HOLD` · one external Claude background job remains an active possible writer |
| Evidence | This packet, its recovery manifest and receipt, live git/process/port/disk/DOM/Vercel checks, immutable task IDs, 15 worker reports, and Claude job state `e675f15e` |
| Gate | Nate approval is required before Stage 1 or any destructive/external action |
| Next | Keep all Codex lanes stopped; settle or pause Claude job `e675f15e`; then take a fresh recovery snapshot before any Stage 1 write |

## Mandatory quarantine — `SUPERSEDED`, do not execute

The following instructions are live evidence only. They are **SUPERSEDED** as operational
instructions. Every worker contacted during Stage 0 is directed not to execute them and to
report whether it already did.

| Quarantined instruction | Status | Harm if executed | Evidence at Stage 0 start |
|---|---|---|---|
| `/Users/handtomouse/Desktop/maplemoon-prompt-x1.txt` — seven-item category rail and merged Bites/Eclipses instructions | **SUPERSEDED — DO NOT EXECUTE** | Re-merges Bites/Eclipses | Original bytes preserved at `maplemoon-prompt-x1.txt.bak_armed_212809`, SHA-256 `83704571c2f526d3f873cae2f857488f957482478ac62905f338cb7a5843738f`. External Claude job `e675f15e` added a warning header at 21:28; current hash `a97dfc7d9cbd08018a09b83e86017d336d53da0751d84425843f5a77bdc2f9be`. Harmful body remains below the warning. |
| `/Users/handtomouse/Documents/Codex/2026-08-13/maplemoon-evidence-led-lanes/ICON_CANDIDATE_PACKET_SPEC.md:147` | **SUPERSEDED — DO NOT EXECUTE** | Re-merges Bites/Eclipses | Exact file located; SHA-256 `d5536d72e40aca2bf91ce1c7f700d5c1a75f25b77ae661c772ef75cfcaafd641`; line 147 says to approve one combined range mark. No icon assets or website wiring followed. |
| `/Users/handtomouse/UFC/ops/day/20260811/CODEX_RECONCILE_BRIEF.md:138` expectation `204 directory entries` | **SUPERSEDED — DO NOT EXECUTE** | Reinstates a corrected client-facing stockist count | SHA-256 `047cb75f01dd92e40ab4e580dd3a3208f59795a53dc15f72b131bf4242353922`; harmful text is present at lines 73 and 138. Rendered `:4330` Stockists DOM shows `200+` and zero `204` matches. |
| `/Users/handtomouse/Desktop/maplemoon-demo--ourstory-low-risk-adds-01.txt` targeting `_wip/deploy/site` | **SUPERSEDED — DO NOT EXECUTE** | Treats an unproved deploy tree as authoritative | Original preserved at `.bak_armed_212809`, SHA-256 `cdd69756e6c27e8dd23959bdbc2ca4934d8b8fa0cd2af67ff23864b35c34f7d9`; warning-header current hash `bb56c84c1d8dfebab1239e48e9224ba65b535ec4d239eb7ab38a617f1d1fc695`. |
| `/Users/handtomouse/Desktop/maplemoon-demo-global stlyes- low-risk-adds-02.txt` targeting `_wip/deploy/site` | **SUPERSEDED — DO NOT EXECUTE** | Same ambiguity | Original backup SHA-256 `14dd395358522a6fd00dd1f68bd7515c9d6f9841bc6e140d17c14b53949c6f7c`; warning-header current hash `197816d672b7f64aea5c0f6604796cfccc699c254e4f8169c66a289f592a4fec`. |
| `/Users/handtomouse/Desktop/maplemoon-demo-stockists- low-risk-adds-02.txt` targeting `_wip/deploy/site` | **SUPERSEDED — DO NOT EXECUTE** | Same ambiguity | Original backup SHA-256 `c5c3f40e12c11d866e125593eb93f782404a78c00d60b1e97ef95bb3be280ccd`; warning-header current hash `d15d50596b8a40c166e2b71e5aeb9d4671ea6dad17ee58d1e4a8dff490c47ae3`. |

`_wip/deploy/site/.vercel/project.json` and `_wip/deploy/site-full/.vercel/project.json`
are byte-identical at SHA-256
`b9d709f7d81ca0209926c8817111d99b84f6764e944f0119c9c13ab13eac0db2` and both name
project `prj_wzWKBfku3VmFoKcj1NHBideqGJKn` (`maplemoon-preview-carli`). Their content differs.
Neither tree is authoritative until read-only Vercel deployment evidence settles what was
deployed last.

Read-only Vercel CLI evidence settles the narrow deployment question: project
`maplemoon-preview-carli` has a latest Ready Production deployment
`dpl_HTwEBMjY6xHzRDLoph9U7Xz35uav`, created 2026-08-03 10:01:19 AEST. Authenticated
`vercel curl --location` page bytes match neither current `site` nor current `site-full`;
one fetched product asset matches `site-full/.vercel/output/static`. The deployed artifact is
therefore an older built snapshot, not authority for either mutable local tree. Whether an
unauthenticated client sees content or a Vercel SSO wall remains a separate external-access gate.

## Known instrument traps

- Six-page live-build authority claim to verify: `/Users/handtomouse/maplemoon_build_20260813`,
  served on `:4330`. Before accepting a screenshot, curl the page and match a unique string
  to that build.
- `:8788` serves `/Users/handtomouse/Projects/maplemoon/site`, a superseded June/July repo.
  Evidence from that port is not current-site evidence.
- Source grep is not accepted as page-content verification. Page probes must inspect rendered
  DOM with cache disabled, use positive and negative controls, and record the blind probe before
  recording its result.

## Baseline at Stage 0 start

| Field | Verified value |
|---|---|
| Repository | `/Users/handtomouse/maplemoon-website` |
| Branch | `fix/trailing-slash-and-w1e-assets-20260812` |
| HEAD | `b5d385d5ae9db04438fde17a5a7cc1275b0ed07a` |
| Tracked changes | 14 modified paths; 92 insertions and 84 deletions across text, plus binary changes |
| Untracked state | Large pre-existing untracked deploy, evidence, recovery, design-system, packet and review trees; preserve all |
| Staged changes | None shown by `git diff --cached --stat` |
| Prior Boss baseline | `MAPLEMOON-CLAUDE-BOSS-ACCEPTANCE-20260807.md` recorded branch `codex-maplemoon-section-review` at `d70dad4…`; it is historical evidence, not current state |

No cleanup, reset, stash, restore, broad add, commit, kill, archive, deploy, publish, upload,
send, push, or promotion is authorized.

## Task inventory and reconciliation

The app ledger returned 75 entries (all pinned plus 50 recent). Twenty were directly
MapleMoon-related by immutable ID, project context, cwd and recent state. Titles were used only
as untrusted labels. Fifteen reachable recent workers received exactly one stop/report directive;
all fifteen returned, report no current mutation and ended on `HOLD`. The current Boss was not
messaged. Four proven historical tasks were not woken. The tool exposes no page beyond those 50
recent non-pinned tasks; any older unpinned MapleMoon task outside that window is an explicit
`UNKNOWN` class rather than silently counted as absent.

| Immutable task ID | Host/context | Reconciled result | Disposition |
|---|---|---|---|
| `019ff60a-46fe-7331-8cfd-e32e9aa91206` | local · photoshoot Drive project | Five isolated product candidates; technically inventoried, visually rejected/unapproved; no repo write | `HOLD` |
| `019ffa71-502a-7181-84bc-3104d30de136` | local · photoshoot Drive project | Founder composite packs exist; three human-review holds; website untouched | `HOLD` |
| `019ffa77-b47a-73c2-972c-d6630a353c89` | local · `ce8f` worktree | Founder imagery v4 review outputs; no acceptance receipt | `HOLD` |
| `019ff602-60df-7ee1-95c8-51f782cee83a` | local · photoshoot Drive project | Exploratory images only; rights-unverified derivative remains held | `HOLD` |
| `019fef57-26db-7151-b43e-6db6645797ff` | local · photoshoot Drive project | Authored the provisional design-system/home pilot files in the shared dirty tree; preserved evidence, no promotion | `HOLD` |
| `019ff64b-93b4-7e52-b2e8-14b6470ebccd` | local · `ce8f` worktree | Located the merged icon-spec assertion; no icon asset or wiring followed | `HOLD` |
| `019feef2-1121-7942-ae14-289acfc579bd` | local · main repo | Its phase-start receipt gate failed because recovery scope did not match packet scope | `FAIL` + `HOLD` |
| `019ff678-e381-7463-bf19-2efb92a641db` | local · projectless sandbox | Finished rejected exploratory audit lane; preserved receipt; no delivery | `HANDOFF THEN CLOSE`, still `HOLD` |
| `019ff65f-fd33-7e51-8a83-360ba2f8d665` | local · main repo | Provisional style kit and cleanup register; 28 keep / 19 hold candidates; no website implementation | `HOLD` |
| `019ff9d3-0706-7a10-a162-b1cb61adfcc0` | local · main repo | Identified `shop.html.bak_x1`; no recenter-turn changes | `HOLD` |
| `019ffa0c-6bbf-7571-aa9e-581cde587ce1` | local · main repo | Image-gathering lane stopped; task-specific receipt absent | `HOLD` |
| `019ff9c4-a588-77d3-b74e-3bf5387225a9` | local · main repo | Prior Stockists brief bound rendered `:4330` evidence to the wrong source tree | `FAIL` + `HOLD` |
| `019ffa77-ead0-7fd2-affd-c0b002559a6b` | local · photoshoot Drive project | Duplicate report of design-system/home pilot ownership; no current mutation | `HOLD` |
| `6a7a9003-9670-83ec-ac6a-a9313fffcd4b` | ChatGPT · projectless | Reported no current mutation; host filesystem evidence unavailable there | `HOLD` |
| `6a7d8ff1-714c-83ec-8810-02d8de291a4d` | ChatGPT · projectless | Generated three founder images before recenter; isolated remote workspace, no Mac repo access | `HOLD` |
| `019ffabc-e7e4-71c3-b769-3563efcc8cac` | local · current pinned Boss | Sole current Codex coordinator and packet writer | `KEEP` on global `HOLD` |
| `019fd776-fb3f-7fc1-aa88-187fabb5971a` | local · former Boss | Aug 7 authority packet contradicts current branch/HEAD and is superseded by live evidence | `HISTORICAL` |
| `019fda1e-0f9d-7f43-b798-7ec17e03677a` | local · packaging project | Six-day-old packaging QA, outside website recenter | `HISTORICAL` |
| `019fd9a6-bf0f-7662-9a74-5458e50bf830` | local · packaging project | Six-day-old outlined-letter work, outside website recenter | `HISTORICAL` |
| `019fb5b5-de62-7862-a5fe-06bc59395c21` | local · archived source parent | Archived parent of imagery tasks; send correctly failed and it was not reawakened | `HISTORICAL` |

Separate from the Codex/ChatGPT ledger, 14 local Claude background-job records mention
MapleMoon. Twelve are terminal (`done` or `failed`), `3d5b7877` is blocked/idle with zero
in-flight tasks, and `e675f15e` (`maple web 03`, session
`e675f15e-a83e-42bd-a32c-30d03837d18d`) is `blocked` but `tempo=active`; two local
agents remained in flight at the evidence cut-off. It started at 21:16, after Stage 0 began, and wrote live
artifacts through at least 21:53. It did not receive the Codex ledger directive because it is not
a Codex task and no safe immutable messaging channel was available. It remains the global writer
collision and prevents a clean all-writers-paused claim.

## Resource inventory

### Repository and worktrees

- Main repo remains on `fix/trailing-slash-and-w1e-assets-20260812` at
  `b5d385d5ae9db04438fde17a5a7cc1275b0ed07a`.
- Git reported 143 porcelain records before the Stage 0 receipt was written and 144 at final
  verification because that new receipt is an additional untracked record: 14 tracked modified
  paths, zero staged paths, and large untracked trees. Text diff is 92 insertions / 84 deletions plus binary replacements. No byte was
  cleaned, restored, stashed, staged or committed.
- Repo size is 7.8 GiB. No `.git/*.lock` file exists.
- `docs/orchestration/LOCK_MANIFEST.json` is a 31 Jul historical register, SHA-256
  `8817645e128f6723fd2384f62fdfb78ca01d6b5ba5196339bb764137c38e12b2`; it is not a live lease.
- Worktrees: main; product-page candidate worktree; locked `27ab` (934 MiB, 25 porcelain
  records, explicitly protecting 71 MiB Wave-1D candidates); clean `ce8f` (601 MiB); `d122`;
  and four prunable stale registrations (`2ae6`, `32a0`, `4835`, `870f`). No prune/unlock ran.

### Local servers and processes

| Port / PID | Measured root or command | State / authority |
|---|---|---|
| `4330` / `48843` | `python -m http.server ... --directory /Users/handtomouse/maplemoon_build_20260813` | Current six-page build instrument, but its files are still being changed externally |
| `8788` / `62777` | cwd `/Users/handtomouse/Projects/maplemoon/site` | Superseded June/July tree; never current evidence |
| `4331` / `26711` | cwd `/Users/handtomouse/maplemoon_ds_20260813` | Design-system preview; owner not promoted |
| `4332` / `75254` | cwd `/Users/handtomouse/maplemoon_frozen_20260813` | Frozen comparison preview |
| `4323` / `28886` | clean-url server for `_wip/deploy/site` | Ambiguous old deploy-tree preview |
| `4324` / `77984` | clean-url server for `maplemoon_demo_20260813/build_v4` | Demo preview, not authority |
| `4801` / `50862` | cwd `/Users/handtomouse/maplemoon_mockups_20260813` | Mockup preview, not authority |

All listed servers were left running. Claude monitor PID `30603` is a read-only 60-second dirty/
worktree watcher but continuously consumes process slots; another orchestration monitor pair
`36424`/`36434` is also live. No process was killed.

### Disk and protected media

- `df -h` at reconciliation: Data volume 460 GiB, 336 GiB used, 84 GiB available, 81%.
- Bounded roots: live build 105 MiB; design-system preview 145 MiB; frozen preview 13 MiB;
  mockups 27 MiB; demo build 41 MiB; safe audit sandbox 46 MiB; mounted photoshoot root 2.9 GiB.
- Protected Downloads evidence includes a 300 MiB hero-raw ZIP, its 349 MiB expanded folder and
  two 47 MiB ARW files. This is not a complete shoot inventory; Drive upload/copy count remains
  unproved. All Downloads shoot material is protected from culling.

### Rendered DOM and deployment checks

- `:4330/stockists.html` blind DOM probe: positive `Find Maple Moon` = 2, negative bogus token = 0,
  `200+` = 2, `204 directory entries` = 0, `204 parsed` = 0.
- `:4330/shop.html` blind DOM re-probe: positive unique build text = 1, negative bogus token = 0;
  sections `#eclipses` and `#bites` both exist, but the category rail contains `#bites` and omits
  `#eclipses`. Source has both links, then inline JavaScript `replaceChildren()` rebuilds the rail
  from a list that omits `#eclipses`. The verified split is therefore incomplete in rendered UI.
- Curl byte-matched `:4330/our-story.html` to the current live-build file and byte-matched
  `:8788/index.html` to the superseded tree. Instrument identity is proved; content acceptance is not.
- Latest Vercel deployment is 10 days old and page bytes match neither mutable local deploy tree.

## Collision map

| Collision | Evidence | Effect / owner | State |
|---|---|---|---|
| Concurrent live-build writer after Stage 0 start | Claude job `e675f15e` state/timeline plus mtimes and pre-edit backups | External Claude lane owns these writes, not any contacted Codex task | `FAIL` + global `HOLD` |
| Live Shop split is only partial | Rendered DOM has both sections but no `#eclipses` rail link; inline target list omits it | Existing live-build JavaScript, current exact author unknown | `HOLD`; do not implement in Stage 0 |
| Stockist count claims conflict | Rendered DOM proves `200+` and zero `204`; Claude timeline asserts `204` is live | Claude claim used a different or blind instrument; DOM evidence wins for current `:4330` page | `HOLD` the old brief and claim |
| `site` vs `site-full` | Same Vercel project ID, different bytes; deployed pages match neither | Neither mutable tree is authority | `HOLD` |
| Shared dirty repo ownership | 14 tracked changes plus large untracked pilot/evidence/deploy trees from multiple lanes | Main repo has overlapping historical authors and no promotion receipt | `HOLD` |
| Receipt gate scope | Initial draft wrongly listed the checkpoint itself as a governed output | Boss packet metadata; corrected to packet + still-absent receipt before receipt write | Completion may be verified, promotion remains false |
| Founder imagery | Multiple local and remote candidate sets, no common accepted manifest | Human decision belongs to Nate | `HOLD` |
| Product imagery | Five isolated candidates; generated identities and weak masks were rejected | Image lanes | `HOLD` |

Post-checkpoint external mutations observed and preserved:

- `/Users/handtomouse/maplemoon_build_20260813/pure-carob-bar.html` created at 21:33:23,
  SHA-256 `39c3e165d765219df655fc036f93bfdae4592886c65315a3767b9676024df3aa`.
- `shop.html` pre-edit backup hash `59c9f52b...`; current hash `55c9d198...` at 21:35:20.
- `homepage.html` pre-edit backup hash `1e8b85d4...`; current hash `15c7947b...` at 21:35:21.
- `faq.html` pre-edit backup hash `d1804ed5...`; current hash `2094183f...` at 21:35:32.
- Bus checkpoint, deploy-preflight script and client-facing `WHATS_NEXT_MAPLEMOON.html` were also
  written; the checkpoint advanced again at 21:49:12. These are not ratified by this packet.
- `carob-story.html` and `mock-cart.js` changed at 21:53:40, with current SHA-256
  `dfa96ecb03cdde0fdeeb9cbd82a8a399dad924cb0de0401ee549afca58fb6ab6` and
  `f0dba5444f6f1c64dee0c33d4e1ad80aca11fc3d18d26c0a15576153b97b09c8` respectively;
  pre-edit backups are preserved beside them. The packet freezes evidence at 21:55 rather than
  pretending a moving external lane can be continuously reconciled.

## Closeout and cleanup candidates — proposal only

| Proposed later action | Evidence / benefit | Recovery path | Risk / gate |
|---|---|---|---|
| Pause Claude job `e675f15e` after its current reversible checkpoint | It is the only proved post-Stage0 writer and currently has local agents in flight | Resume by immutable session ID `e675f15e-a83e-42bd-a32c-30d03837d18d` from `CHECKPOINT_20260813_NIGHT2.md` after a fresh snapshot | Highest priority; stopping without first capturing its final hashes may orphan work; Nate decides |
| Stop obsolete preview `:8788` | Proven superseded root; removes false-screenshot risk | Restart from `/Users/handtomouse/Projects/maplemoon/site` with the recorded Python server command | Could disrupt an unseen reviewer; verify listeners and consumer first |
| Stop old/duplicate previews `:4323`, `:4324`, `:4801` | Roots are known and none is authority | Commands/roots are recorded above | Could remove a comparison surface; snapshot open-browser consumers first |
| Stop monitors `30603` and `36424`/`36434` | Long-lived background loops; small resource and noise reduction | Re-arm from their recorded command/script if still needed | Loses drift alarms; only after the active writer is settled |
| Archive former Boss `019fd776` and finished safe-audit task `019ff678` | Handoff evidence is captured here; declutters task list | Immutable IDs and this packet preserve discoverability | Archive is UI state change; Nate decides |
| Prune stale worktree registrations `2ae6`, `32a0`, `4835`, `870f` | Git marks only these four as prunable | Git metadata can be recreated from surviving refs | Never unlock or force `27ab`; rerun worktree list immediately before action |

No delete/cull proposal is made for Downloads shoot material, `27ab`, imagery outputs, generated
images, local builds, caches or the dirty repo. Ownership/copy count is insufficient.

## Decision log

1. 2026-08-13T11:12:44Z — accepted Nate's Stage 0 brief as the current P1 recenter authority.
2. 2026-08-13T11:12:44Z — delivery globally set to `HOLD`; no prior packet is promoted.
3. 2026-08-13T11:12:44Z — quarantined the harmful instruction classes above before any worker contact.
4. 2026-08-13T11:12:44Z — preserved the entire dirty working tree; current branch/HEAD supersede the Aug 7 baseline as observed state, without ratifying any content.
5. 2026-08-13T11:28:00Z — issued one stop/report directive to each of 15 reachable recent tasks; no task received a second directive.
6. 2026-08-13T11:30:00Z — Vercel evidence established that the latest deployment is an older snapshot and neither local deploy tree is authority.
7. 2026-08-13T11:35:00Z — rendered-DOM evidence overruled source appearance: the Shop rail still omits `#eclipses`; Stockists renders `200+` and no `204` text.
8. 2026-08-13T11:55:00Z — observed continuing post-checkpoint writes by Claude job `e675f15e`; classified this as a writer collision, froze an evidence cut-off and retained global `HOLD`.
9. 2026-08-13T11:48:00Z — corrected the Stage 0 receipt-gate scope by governing only the packet and receipt, while treating the recovery manifest as the checkpoint itself.
10. No implementation, cleanup, promotion, deployment, publication, upload, send, commit, push, archive, kill, delete, revert, reset or worker creation was performed by this Boss task.

## Recovery and restart

On interruption:

1. Read this packet and the recovery manifest named above.
2. Verify this exact Boss thread ID, packet and receipt hashes, then run
   `scripts/check-maplemoon-receipt.py ... --phase complete` against the named checkpoint.
3. Read Claude job `e675f15e` state and compare mtimes/hashes of the seven post-checkpoint paths
   before believing this snapshot is still current.
4. Re-run bounded git/process/port and blind rendered-DOM checks without changing state.
5. Keep delivery `HOLD` whenever `e675f15e` is active, a hash drifts, or evidence is missing.
6. Do not resume implementation until Nate authorizes a new Stage 1 packet with exact writers.

## Copy/paste Claude briefing

```text
MAPLEMOON RECENTER — CLAUDE ADVISORY BRIEF

Facts
- Codex ledger: 20 MapleMoon tasks accounted. Fifteen recent workers reported no current
  mutation and ended HOLD; four older tasks are historical; one pinned Boss remains.
- Separate Claude background job e675f15e started after Stage 0 began and wrote the live build,
  Desktop warnings, bus checkpoint, preflight script and client-facing handover page. Its current
  state is blocked but tempo=active with local agents in flight. It is the only proved writer.
- Main repo remains b5d385d on fix/trailing-slash-and-w1e-assets-20260812 with 144 final porcelain
  records (including this new receipt), zero staged. Nothing was cleaned or promoted.
- Rendered :4330 Shop DOM has separate Bites and Eclipses sections but the rail omits Eclipses;
  source appearance alone is misleading because inline JS rebuilds the rail.
- Rendered :4330 Stockists DOM has 200+ twice and zero 204 matches.
- The latest maplemoon-preview-carli deployment is from 3 Aug; its pages match neither current
  site nor site-full. Neither mutable deploy tree is authority.

Conflicts
- e675f15e continued delivery work after the Stage 0 global hold began.
- Claude's timeline says 204 is live, while controlled rendered DOM says it is absent.
- The Shop source contains #eclipses, while controlled rendered DOM omits that rail link.
- Current live-build copy edits and the new Pure Carob Bar page have no shared promotion receipt.

Unknowns
- Whether Nate intentionally wants e675f15e to remain the sole delivery lane.
- Whether an unauthenticated client sees the old deployment or a Vercel SSO wall.
- Which current copy choices and founder/product imagery Nate accepts.
- Which exact snapshot should become the Stage 1 candidate baseline.

Options
A. Pause e675f15e after a safe checkpoint, hash every changed path, then recenter under one Boss.
B. Keep e675f15e as the only live-build writer; Codex remains read-only and reconciles only after
   it stops. Do not run both managers against the same files.
C. Keep all delivery held and review the candidate snapshots before naming any writer.

Recommendation
Choose A. First preserve e675f15e's final bytes and receipts, then use one writer per exact path,
one read-only QA lane, and a separate later deployment gate. Do not infer acceptance from a
successful render or Vercel Ready status.

Questions for Claude
1. Which exact e675f15e changes are directional recommendations versus factual corrections?
2. Which evidence supports the proposed copy where it differs from the pre-edit backups?
3. What client-access behavior should be tested separately from build correctness?
```

## Proposed Stage 1 — not authorized

Precondition: Nate chooses the disposition of Claude job `e675f15e`; it reaches a safe stop;
Boss captures fresh non-overwriting checkpoints and exact SHA-256s for every path below; confirmed
Claude direction is recorded as advice, not authority.

| Lane | One writer / exact writable paths | Dependency | Required verification |
|---|---|---|---|
| Control | Boss `019ffabc…` only: `docs/orchestration/packets/MAPLEMOON-BOSS-STAGE1-AUTHORITY-SEAL-20260813T115000Z.md`; `_wip/checkpoints/MAPLEMOON-BOSS-STAGE1-AUTHORITY-SEAL-20260813T115000Z_20260813_215000_AEST/RECOVERY_MANIFEST.json`; `docs/orchestration/reviews/MAPLEMOON-BOSS-STAGE1-AUTHORITY-SEAL-20260813T115000Z.json` | External writer stopped; all three candidate paths rechecked unoccupied | receipt gate start PASS before first write; completion PASS; no promotion state |
| Live-build stabilization | One newly named writer: `/Users/handtomouse/maplemoon_build_20260813/shop.html`, `homepage.html`, `faq.html`, `pure-carob-bar.html` only | Control baseline + Nate's copy/product-page decisions | exact pre/post hashes; blind DOM controls; split rail; route links; 390/834/1440 renders; console and interaction checks |
| Client handover | One separate writer: `/Users/handtomouse/UFC/ops/bus/maplemoon/WHATS_NEXT_MAPLEMOON.html` only | Accepted live-build facts | no internal IDs/paths/testimonials; every done claim tied to rendered evidence; human copy review |
| Deploy preflight | One separate writer: `/Users/handtomouse/UFC/ops/bus/maplemoon/tools_20260813/preflight_deploy.py` only | Stable candidate URL contract | dry-run/local tests including bogus-path negative control; no API mutation |
| QA | Read-only worker, no writable path | All three writing lanes stopped | route matrix, byte identity, rendered DOM, accessibility and visual proof; independent receipt |

Promotion gate: all writer receipts reconcile to their checkpoints; QA has no unresolved failures;
Nate accepts the exact candidate and separately authorizes any deploy/publish/send. Deployment must
use a new immutable URL first, verify unauthenticated client access and content, and retain the old
deployment as rollback. Rollback for local work restores only the exact checkpointed files; no
reset, clean, broad restore or deletion.

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-BOSS-RECENTER-STAGE0-20260813T111244Z",
  "candidate_id": "CTRL-V2-CANDIDATE-20260730-001",
  "worker_thread_id": "019ffabc-e7e4-71c3-b769-3563efcc8cac",
  "phase": "RECENTER-STAGE0",
  "state": "hold",
  "completed_at": "2026-08-13T11:55:00Z",
  "approval_class": "recovery-gated-control",
  "objective": "Quarantine harmful instructions, account for every MapleMoon task and possible writer, reconcile live project evidence, and leave a restartable HOLD packet without resuming delivery.",
  "non_goals": [
    "implementation",
    "cleanup",
    "promotion",
    "commit or push",
    "deploy, publish, upload, send or external contact",
    "archive, kill, delete, revert or reset",
    "create, fork, hand off or replace workers"
  ],
  "readable_paths": [
    "AGENTS.md",
    "CLAUDE.md",
    "docs/orchestration/CONTROL_PLANE_INTERFACES.md",
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "docs/orchestration/packets/",
    "docs/orchestration/reviews/",
    "docs/orchestration/handoffs/",
    "_wip/",
    "scripts/"
  ],
  "writable_paths": [
    "docs/orchestration/packets/MAPLEMOON-BOSS-RECENTER-STAGE0-20260813T111244Z.md",
    "docs/orchestration/reviews/MAPLEMOON-BOSS-RECENTER-STAGE0-20260813T111244Z.json"
  ],
  "base": {
    "branch": "fix/trailing-slash-and-w1e-assets-20260812",
    "head": "b5d385d5ae9db04438fde17a5a7cc1275b0ed07a",
    "files": [
      {
        "path": "docs/orchestration/packets/MAPLEMOON-BOSS-RECENTER-STAGE0-20260813T111244Z.md",
        "base_state": "absent",
        "base_sha256": null
      },
      {
        "path": "docs/orchestration/reviews/MAPLEMOON-BOSS-RECENTER-STAGE0-20260813T111244Z.json",
        "base_state": "absent",
        "base_sha256": null
      }
    ]
  },
  "coverage": {
    "ledger_entries_scanned": 75,
    "maplemoon_tasks": 20,
    "workers_contacted_once": 15,
    "worker_reports_received": 15,
    "historical_not_woken": 4,
    "current_boss": 1
  },
  "external_writer": {
    "kind": "claude_background_job",
    "id": "e675f15e",
    "session_id": "e675f15e-a83e-42bd-a32c-30d03837d18d",
    "observed_state": "blocked",
    "tempo": "active",
    "in_flight_tasks": 2,
    "verdict": "FAIL_AND_HOLD"
  },
  "sources": [
    "/Users/handtomouse/Desktop/CODEX_BOSS_RECENTER_STAGE0.md",
    "AGENTS.md",
    "CLAUDE.md",
    "docs/orchestration/CONTROL_PLANE_INTERFACES.md",
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "live local and task-ledger evidence"
  ],
  "action": "Perform Stage 0 only: read-only discovery, one checkpoint request per relevant worker, reconciliation, packet update, and HOLD.",
  "verify": [
    "every MapleMoon-related task is verified or UNKNOWN by immutable thread ID, host and project context",
    "all Codex/ChatGPT workers are paused or HOLD; any external writer is explicitly identified and prevents promotion",
    "git/process/port/disk/lock/receipt evidence is captured with real output",
    "quarantined instructions are marked SUPERSEDED and included in every worker directive",
    "packet and recovery manifest exist, are non-empty, parse/check cleanly where applicable, and have raw SHA-256 hashes",
    "Boss changes are limited to the recovery manifest, packet and receipt; externally caused concurrent changes are itemised rather than attributed to Stage 0"
  ],
  "done": "Stage 0 packet, receipt, coverage, collision map, Claude brief and Stage 1 proposal exist. Delivery remains HOLD because external job e675f15e is an active possible writer; Nate is the next decision gate.",
  "stop": [
    "any attempted implementation or delivery resumption",
    "any overlapping writer",
    "any missing recovery, hash, check, rendered evidence or authority",
    "any external or destructive action without Nate approval"
  ],
  "next_reviewer": "Nate",
  "ready_to_promote": false
}
<!-- CONTROL-PLANE:END -->
