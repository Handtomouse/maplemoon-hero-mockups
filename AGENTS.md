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
