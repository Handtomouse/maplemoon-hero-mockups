# MapleMoon — Claude Code Instructions

`AGENTS.md` is the MapleMoon Codex instruction file. **Its rules apply here too.** Read it. This
file records only what differs for a Claude Code session.

## Control plane

Codex is coordinator and lock custodian. See `docs/orchestration/CONTROL_PLANE_INTERFACES.md`.
A Claude Code side chat is a **worker and disposable console**, never the control plane or the
source of truth (`AGENTS.md`, "Boss control-plane authority"). Durable state is the project-local
packet, not this conversation.

Do not invent a parallel coordination schema, lock file or check-in protocol. If a new control
artifact is genuinely needed, Codex proposes it as a packet under §9 of the control-plane
contract.

## Lane split

One writer per exact path. Without an admitted packet:

| Owner | Paths |
|---|---|
| **Codex** | `docs/orchestration/LOCK_MANIFEST.json`, `docs/orchestration/packets/`, protected/frozen packets, anything under an active lease |
| **Claude Code** | verification and browser QA, `scripts/check-*`, evidence and screenshots |
| **Neither, without a packet** | `docs/client-review/2026-08-01-saturday-review/staging-v1/` — the frozen artifact |

When lanes would overlap, stop and ask rather than racing the other agent.

## Browser QA

`AGENTS.md` says not to spawn external Chrome by default, and to prefer Codex's in-app browser.
It exempts "real-browser QA". Gate work that specifies *literal* browser zoom, keyboard focus
traversal or viewport behaviour falls under that exemption — CR-0 requires literal 200% zoom,
which an in-app preview cannot credibly produce. Use external Chrome for those, and say so.

Everything else — reading a page, checking copy — uses the local server, not a spawned tab.

## Gates reserved to Nate

CR-0 through CR-4 in `docs/client-review/2026-08-01-saturday-review/READINESS-DEPENDENCY-ROADMAP-20260802.md`
are Nate's. CR-0 passes only when **Nate** records PASS against the exact frozen artifact, as an
ordinary viewer.

An agent may **pre-screen** — find defects first so his pass is short and informed, or so he
skips it entirely because something needs fixing. An agent may **not** record the PASS. Writing a
control record on Nate's behalf corrupts it, and every downstream gate inherits that record.

## Verifying the frozen package before any review

Screen `staging-v1/clean/`, never `shared/`. Confirm the tree is intact first:

```sh
cd docs/client-review/2026-08-01-saturday-review/staging-v1
shasum -a 256 clean/MANIFEST.json annotated/MANIFEST.json   # match MANIFEST.json "files"
npm run review:saturday:check
```

A review of a drifted artifact is void.

## Shared working tree — the stale lock hazard

Codex and Claude Code share one working tree with no isolation. Committing is safe; concurrent
edits to the same file are not.

**Known failure, 2026-08-02:** a git process crashed on 2026-07-31 19:48, eight minutes after
`d65047b`, leaving a 0-byte orphan `.git/index.lock`. Every commit for the next 41 hours failed,
silently, and 122 files accumulated uncommitted. Nobody noticed because nothing surfaced the
error.

If `git commit` reports `Unable to create '.git/index.lock'`, do not delete it reflexively.
Confirm it is an orphan first:

```sh
stat -f '%Sm %z' -t '%F %T' .git/index.lock   # age and size
lsof .git/index.lock                          # no output = nothing holds it
pgrep -fl 'git '                              # no real git process
```

A 0-byte lock, unheld, older than the last commit is stale — remove it, then verify with
`git fsck --connectivity-only` and check `git status` before committing.

Commit before handing back to Codex. Never leave the tree dirty across a handoff.
