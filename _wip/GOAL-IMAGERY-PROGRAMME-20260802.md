# MapleMoon — /goal brief: complete the site imagery programme
# Written 2026-08-02 ~22:10 AEST · paste everything below the line after `/goal`
# Verified at write time: live repo HEAD 7cf3557, 49 GiB free, 3 imagery side chats live.

---

**GOAL: take the MapleMoon site imagery from scattered exploration to one decided, receipted candidate set — without touching the frozen six-page package.**

You are the single imagery coordinator. Work in `/Users/handtomouse/maplemoon-website`, branch `codex-maplemoon-section-review`, HEAD `7cf3557` or a descendant. If your path contains `.codex/worktrees/`, stop and switch to the live repo first.

## THE HARD CONSTRAINT — read before planning

The six-page package at `docs/client-review/2026-08-01-saturday-review/staging-v1/clean/` is **frozen and hash-verified** (`clean/MANIFEST.json` = `d1c66b1d…`), and the CR-0 evidence just produced — real keyboard traversal on 5 pages at 390 CSS px, plus a clean 200% zoom pre-screen on all 6 — was measured **against those exact bytes**.

Therefore: **every output of this goal is a candidate, wired to nothing.** Contact sheets, decision boards, receipts. You do not edit any page, any `staging-v1/` file, or any manifest. Wiring imagery into the package is a separate deliberate re-freeze-and-re-prove decision that costs Nate the send date — surface it as a decision, never assume it.

## STEP 0 — CUSTODY. ALREADY DONE 2026-08-02 ~22:25 AEST. Do not repeat it.

The Wave-1D candidates were at loss risk — 51 files (36 PNG, 71 MB) existing only in a prunable, untracked worktree. Nate approved custody destination "C — both" plus a worktree lock, and it was executed and verified.

Current state, verified by hash:

| Location | Files | Status |
|---|---|---|
| `/Users/handtomouse/.codex/worktrees/27ab/…/generated-candidates/` | 51 | original, untouched; **worktree now locked** against prune/remove |
| `/Users/handtomouse/maplemoon-website/docs/client-review/2026-08-01-saturday-review/generated-candidates/` | 51 | live-repo working copy, **51/51 hash-verified** |
| `/Volumes/handtomouse/maplemoon-website/…/generated-candidates/` | 51 | iMac off-machine replica, **51/51 hash-verified** |

Integrity reference: `_wip/evidence/IMAGERY-PROGRAMME-20260802/CANDIDATE-MANIFEST.sha256`, self-hash `4a1f0ac5d29197114a6bf3a06b393b6bfce33f6a97494ffd0b6514eed436e8dd`. Receipts in the same directory.

**Work from the live-repo copy.** Verify against the manifest before you rely on it; do not re-copy, re-hash-baseline or re-propose custody.

**One custody decision remains open and is Nate's, not yours:** the 51 live-repo files are untracked and not gitignored, so they must eventually be either committed (~71 MB of PNGs permanently in history) or gitignored (repo stays light, but relies on the iMac replica). Do not decide it, do not commit them, do not edit `.gitignore`. Surface it in your report and move on.

## STEP 1 — READ-ONLY. Do not take the write lane yet.

Three side chats are live on imagery right now and hold in-flight state:
- **Side chat 1** "Generate Wave 1D imagery" — 7 files edited (`generation-plan.md`, `contact-sheets.html`, `site-board.html` +4).
- **Side chat 2** — ritual A/C comparison board, mid-run with a fail-closed guard active.
- **Side chat 3** — new art-direction change; correctly refusing to regenerate real bars/elixir.

Do not kill or duplicate them. Overlapping writers is exactly what produced the scope breach and the six-commit incident already on record. **Open read-only:** inventory, classify, build the decision board, write the plan. Take the write lane only once those workers return receipts and release ownership — treat that as an explicit gate you report on, not a hope.

## STEP 2 — CLASSIFY. This is the real deliverable, not a render queue.

"All the imagery to finish the site" is four different things. Produce `_wip/evidence/IMAGERY-PROGRAMME-20260802/CLASSIFICATION.md` splitting every remaining gap into exactly these buckets:

**A. Genuinely generatable now (synthetic, no real product).**
The ritual tile families are the only true generation lane. The plan already exists at
`/Users/handtomouse/.codex/visualizations/2026/07/31/019fb5b5-de62-7862-a5fe-06bc59395c21/maplemoon_ritual_family_a_exploration_20260802_v1/generation-plan.md` —
three bounded rounds, nine outputs (R1 richer/tactile, R2 cleaner editorial, R3 broad wildcard), with a shared rendering lock. Honour that lock exactly: 16:9 landscape surviving a narrow portrait `object-fit: cover` crop, essential forms in the central 40%, pale website blue, dry matte irregular pods, at most two unbranded matte-stoneware accessories plus a compact aged pewter spoon. Frozen references are botanical morphology only (`assets/licensed/carob_pods_macro.jpg`, SHA `0426510e…`) and colour field only (`assets/hero_shots/bg_v4_range.png`, SHA `b075aa7c…`). **The wood board in the reference is not an approved style element and must not appear.**

**B. Not generations at all — crops and recomposition on already-approved assets.**
Cheapest and safest work here; do not regenerate what needs recropping.
- Homepage `#carob` — needs a mobile crop.
- Our Story gallery — crop and hierarchy need human visual review.
- Carob Story gallery — crop and hierarchy need review.

**C. Not raster at all — code.**
The FAQ hero decoration is a non-portable generated-file placeholder in the source page. It looks like an imagery gap and isn't; it needs a page/code remediation packet.

**D. Blocked — cannot be generated, do not attempt.**
- Our Story founder/makers hero and hands — require approved **client** assets plus identity/permission evidence.
- Real MapleMoon bars, elixir, powder, packaging, labels — **verified client assets only, never regenerated or imitated.** Side chat 3 already ruled this correctly; inherit that ruling.
- Stockists geographic/map imagery — blocked pending Nate's visual decision and a verified directory strategy. Existing imagery must not imply coverage that doesn't exist.
- All Shop/product imagery — deferred entirely.

**Social/OG images** sit between A and D: do not re-derive requirements. Read `docs/client-review/2026-08-01-saturday-review/LINK-PREVIEW-METADATA-AUDIT-20260802.md` and `LINK-PREVIEW-VALIDATION-MATRIX-20260802.json` and work to that accepted spec.

## STEP 3 — GATES before any render batch

1. **State the generation route explicitly before generating anything.** Nothing in the current record establishes which tool/model produced the existing 36 PNGs. Use the same route the Wave-1D side chat used, name it in the receipt, and stop and ask if you cannot identify it. Do not improvise a different generator — it breaks visual continuity with candidates already under review.
2. **Free-space check ahead of every batch.** 49 GiB free at brief time. The standing rule is HOLD all large-output work below 20 GiB. Do not delete, compress, move or offload anything to make room — that needs its own custody packet.
3. Non-overwriting timestamped checkpoint for every writable path; clear the phase-start gate via `docs/orchestration/SIDECHAT_RECEIPT_GATE.md` and `scripts/check-maplemoon-receipt.py`.
4. You cannot accept your own output. Independent verification before any PASS.

## STEP 4 — DECIDE. One board, one decision, per family.

For bucket A, produce a single side-by-side decision board at the **actual tile crops** (desktop 1440 and mobile 390), showing current vs proposed, and record **one selected direction or HOLD per family**. Existing boards live at
`/Users/handtomouse/.codex/visualizations/2026/07/31/019fb5b5-.../maplemoon_ritual_ac_site_board_20260802_v1/` — extend that, don't start a fresh format.

Selection by inference is forbidden. Nate selects; you present.

## NEVER

Commit, push, deploy, publish, upload, send, contact the client, touch Shopify/Woo/Vercel, install dependencies. Write to `staging-v1/`, `docs/orchestration/`, `LOCK_MANIFEST.json`, or `scripts/check-maplemoon-review.py`. Record CR-0..CR-4. Generate people, hands, faces, branches, foliage, linen, wood boards, farmhouse styling, logos, labels, readable text or any product claim. Merge candidates into WIP or theme files.

## REPORT BACK — short, and stop

1. Confirmation the live-repo candidate copy verifies 51/51 against the manifest, plus a one-line reminder that commit-vs-gitignore is still open. **(needs Nate, do not decide)**
2. The four-bucket classification, with a count of what is actually generatable.
3. The generation route you identified, named.
4. Ownership state of the three live side chats — released or still holding.
5. Exactly two decisions for Nate: **which ritual direction (or HOLD)**, and **does any imagery go into the package before the send** — knowing yes means re-freezing and re-proving CR-0.

Then stop. Do not walk the idle ladder to manufacture activity.
