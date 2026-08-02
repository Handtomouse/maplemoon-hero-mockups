# MapleMoon Codex Instructions

## Local HTML Preview

For local HTML previews, do not run `open`, `open -a Google Chrome`, or spawn external Chrome tabs by default. Serve the repo locally when needed and inspect pages with Codex's in-app Browser, or provide the localhost/file URL in the task.

Use external Chrome only when Nate needs to do something in Chrome, explicitly asks for Chrome, or there is a concrete reason such as real-browser QA, profile-specific auth, extension behavior, or tooling that cannot run inside the in-app Browser.

## Side-chat worker oversight

### Boss control-plane authority

Use this order of authority for MapleMoon supervision:

1. The project-local recovery packet is the durable state and restart source.
2. One persistent pinned main Boss task is the sole coordinator, ownership, and promotion authority.
3. A Side chat is an optional disposable console only; it is never the sole control plane or source of truth.

OpenAI documentation does not establish that bottom Side chats are unsaved or automatically expire. Missing UI visibility, `notLoaded`, or a changed Side-chat identity does not prove deletion. These remain operational discoverability and recovery risks, so resume from verified project-local evidence and immutable task IDs rather than titles, panel state, or memory.

Nate's minimum command surface is `Boss: <goal>` and `Boss check`. Codex compiles the worker binding, manager packet, writable scope, recovery gate, checks, and approval boundary automatically.

When a MapleMoon task supervises a named worker, use the receipt gate in `docs/orchestration/SIDECHAT_RECEIPT_GATE.md` rather than repeatedly re-reading the worker conversation. Check only at phase start, completion, correction and promotion. Do not guess a worker from a task title, continuously poll workers, or promote missing evidence.

For a mutating phase, require a timestamped, non-overwriting recovery checkpoint for every exact writable path before the first write. New packet and receipt records must identify the exact same `worker_thread_id`, so no supervisor guesses its worker. Then use `scripts/check-maplemoon-receipt.py` to verify the worker's compact `maplemoon-receipt/v2` receipt. `HOLD` is the default for missing recovery, hashes, check results, rendered evidence or authority; `FAIL` is reserved for a scope breach or failed required check.

## Founder imagery: read before touching it (added 2026-08-03)

`_wip/HANDOFF-FOUNDER-IMAGERY-20260803.md` is the single entry point. Read it first. It
records solved ground so you do not rediscover it:

- **iMac screen capture is solved.** Plain `screencapture` over SSH returns wallpaper
  silently, exit 0, no error, because TCC binds Screen Recording to the responsible process
  and that is `sshd-keygen-wrapper`. Route through `open -a Terminal /tmp/x.command`.
  Terminal holds Screen Recording *and* Full Disk Access, so it is also the only way to read
  `CloudStorage` paths. No reboot is needed and none should be attempted.
- **Photoshop export is solved.** `open -a "Adobe Photoshop 2026" /tmp/x.jsx`, address
  documents by name not `app.activeDocument`, duplicate, flatten, convert to sRGB, saveAs the
  duplicate. Verified non-destructive.
- **QA proofs must render the real CSS.** The Our Story portrait applies three stacked crops:
  Photoshop bounds, `object-fit:cover` at `object-position:46% 40%`, then an alpha mask that
  dissolves the outer edges. A review surface without those shows a page that does not exist,
  and proofs rendered against one are void. `node scripts/check-maplemoon-portrait-crop.mjs`
  enforces this.
- **The founder bio slot is decided:** 4:5 via `aspect-ratio`, not a height clamp. See
  `_wip/evidence/DECISION-FOUNDER-BIO-SLOT-GEOMETRY-20260803.md`. The guard fails otherwise.
- **The shoot is staged and pre-screened.** 160 ARW developed to proxies with a numbered
  contact sheet at `~/MapleMoon-Photoshop-Work/_INBOX/`. Three distinct bodies of work, so
  three directions, not one. Awaiting Nate's selects.

Dylan v02 is pre-screened and verified but **not accepted**. Accepting it is Nate's.
