# MapleMoon — new session launch block
# Written 2026-08-02 21:30 AEST. Paste everything below the line into a fresh session.
# All paths verified to exist at time of writing. HEAD was 7cf3557.

---

**MapleMoon — session start. Read this whole block before acting. Do not start work until step 8.**

## 0. Hard stop — verify where you are

Work in `/Users/handtomouse/maplemoon-website`, branch `codex-maplemoon-section-review`.

Run: `pwd && git rev-parse --short HEAD && git branch --show-current`

- If the path contains `.codex/worktrees/`, **STOP and cd to the main repo.** Several stale worktrees sit at `a6cd91a` and will give you a completely false picture of the project.
- Expect HEAD `7cf3557` or a descendant. If you see `d163a53`, stop and tell me — that is the reverted commit-incident head.

## 1. Thread check-in — in this precedence order

Authority is **not** equal between threads. Per the overnight boss handoff, the project-local record and the persistent coordinator thread supersede the disposable side-chat.

1. **Project-local record (the files)** — highest authority.
2. **MAINCHAT / coordinator:** `019fa858-05c9-7631-b26e-8f5cbbf1387a` ("Plan MapleMoon model workflow"). Durable proxy on disk: `docs/orchestration/packets/MAPLEMOON-OVERNIGHT-BOSS-HANDOFF-20260802.md`.
3. **SIDECHAT / Wave-1D worker:** `019fb5b5-de62-7862-a5fe-06bc59395c21`. Durable proxy: `docs/orchestration/reviews/WAVE-1D-*.json` (all returned PASS) plus `docs/client-review/2026-08-01-saturday-review/generated-candidates/WAVE-1D-NONSHOP-RECONCILIATION-20260802.md`.

You cannot read another thread directly. Reconcile from those files. If something material isn't written down, **ask me to paste it — do not infer it.**

Also confirm the overnight monitor `maplemoon-overnight-boss-loop` is finished (24 runs × 20 min from 00:48 AEST, so it expired ~08:48). If any heartbeat is somehow still firing, stay read-only. Two writers on one lane is exactly what produced the commit incident and the scope breach already on record.

## 2. Cold-start read order

1. `_wip/evidence/PROJECT-POSITION-AND-PLAN-20260802.md` ← written for exactly this handover, read it fully
2. `CLAUDE.md` and `AGENTS.md` — lane rules: Codex is coordinator and lock custodian, Claude Code is a worker
3. `docs/client-review/2026-08-01-saturday-review/READINESS-DEPENDENCY-ROADMAP-20260802.md` — the 16-gate graph
4. `_wip/evidence/IMAC-KEYBOARD-PROOF-20260802/RESULTS.json` — the keyboard evidence that just landed

Before **any** mutation, clear the phase-start gate: `docs/orchestration/SIDECHAT_RECEIPT_GATE.md` and `scripts/check-maplemoon-receipt.py`.

## 3. Where this actually stands — do not re-derive it

- **Ship deliverable:** send the frozen six-page clean package to Carli and Dylan. Artifact is `docs/client-review/2026-08-01-saturday-review/staging-v1/clean/` (homepage, shop, our-story, carob-story, stockists, faq), `clean/MANIFEST.json` = `d1c66b1d…`. It is built, frozen, hash-verified, **and has never been sent.**
- The package is named for **Saturday 1 August. That date passed.** There is no forward send date recorded anywhere in the repo.
- **0 of 16 gates cleared.** Everything sits behind **CR-0**, and CR-0 is reserved to me — no agent may record it.
- A very large amount of prep is genuinely DONE and independently receipted: review-hub spec and feedback schema, soft-launch test plan and event schema, link-preview/favicon audit, Shopify OS2 translation map and migration gates, security and integration gate register, UAT/rollback/cutover/stabilization plans. All of it is *accepted local specification* — it authorises no implementation, access, deployment or sharing.
- Keyboard traversal is evidenced for **5 of 6 pages at literal 390 CSS px**. Homepage has evidence only at 500 px. That is the gap.

## 4. Phase 1 status — MOSTLY DONE as of 2026-08-02 ~22:00. Do not redo it.

**Read these as completed input before planning anything:**

- `_wip/evidence/CR0-PRESCREEN-20260802/CR0-PRESCREEN-PACK.md` — **DONE.** Literal 200% zoom pre-screened **clean across all six pages** (CDP `Emulation.setDeviceMetricsOverride`, 720×450 CSS px @ `deviceScaleFactor: 2`). Integrity confirmed against `clean/MANIFEST.json` = `d1c66b1d…`.
- `_wip/evidence/IMAC-KEYBOARD-PROOF-20260802/RESULTS.json` + `_wip/evidence/HANDOFFS/IMAC-TO-MACBOOK/COMPLETION-KEYBOARD-PROOF-20260802-215500.md` — **DONE.** Real OS-level Tab traversal VALID for our-story, carob-story, stockists, faq, shop at literal 390 CSS px.

**The one remaining Phase 1 item:** homepage keyboard traversal at literal 390 CSS px. Homepage has evidence only at 500 px; the other five are at 390. Use the harness that already worked — `_wip/evidence/IMAC-KEYBOARD-PROOF-20260802/HARNESS.py` — and honour the iMac worker's freeze window on `staging-v1/` so it hits the same frozen bytes the other five did.

Route that run to Codex, not inline. Write me a Codex brief: Goal / Inputs (absolute paths) / Steps / Verify / Output / Do-not-touch.

Once homepage lands, the CR-0 evidence surface is closed and **the only thing left on CR-0 is my own ordinary-viewer read.**

## 5. Never do

- Record CR-0 through CR-4. Mine alone — writing one on my behalf corrupts every downstream gate.
- Write to `staging-v1/`, `docs/orchestration/`, `LOCK_MANIFEST.json`, or `scripts/check-maplemoon-review.py`.
- Commit, push, deploy, publish, upload, send, contact the client, touch Shopify/WooCommerce/Vercel, or install dependencies. A scope breach and an unauthorised six-commit incident are both already on record for this project.
- Promote static or DOM analysis into a traversal result. It cannot see tab order, wrap, or traps.
- Start any SL-* or SH-* work. Parked until CR-4.

## 6. Environment facts — these save an hour

- Chrome activation by app name is ambiguous when two instances share a bundle id; it targets the wrong window and Tab keypresses silently do nothing while `document_hasFocus` still reads true. Use CDP `Page.bringToFront` on the specific window. This caused every earlier failed traversal.
- Literal 390 CSS px **is** reachable via CDP. The old "500 px is a platform limit" note was vehicle-specific and is closed.
- macOS Full Keyboard Access is ON (`AppleKeyboardUIMode` = 2). Never the cause — don't chase it.
- The iMac's home is SMB-mounted at `/Volumes/handtomouse`. Remote Login is OFF on the macbook so scp *to* it fails; Taildrop (`tailscale file cp`) works.

## 7. Known risk — raise it, don't fix it

`staging-v1/` is gitignored (`.gitignore:34`, zero tracked files). The ship artifact has **no committed copy**; its only integrity evidence is SHA match. A stash or clean checkout loses it silently. Fixing it means changing `.gitignore` — my call and Codex's, not yours.

## 8. First reply back to me — keep it short

a) the cwd, branch and HEAD you verified;
b) any drift between the boss handoff and what's actually on disk;
c) confirmation the overnight loop is dead;
d) the Codex brief for Phase 1;
e) the two decisions you need from me: **do I sit down and do CR-0 now**, and **what send date am I committing to**.

Then stop and wait. Do not walk the productive-idle ladder to manufacture activity.
