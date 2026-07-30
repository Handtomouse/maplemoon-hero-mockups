---
type: executor_task
executor: frontend
project: MapleMoon Website
dispatched: 2026-05-31 14:08 AEST
status: DRAFTED (awaiting Nate fire)
depends_on: PLAN.md "Resume resolutions (2026-05-31)"
---

# Frontend Task: Synthesis Homepage (home-first Phase 1 lead)

## Step 0 — CONFIRM SCOPE FROM PRIMARY SOURCE BEFORE WRITING ANY CODE

Read these first and verify the brief against them. If anything below contradicts the sources, STOP and return the conflict — do not pattern-match or invent.

1. `PLAN.md` → "Resume resolutions (2026-05-31)" (the ratified decision).
2. `homepage_a.html` — the SHELL you build from (strong typographic Direction-A restyle, em-dash-clean, variant picker as text pills).
3. `homepage.html` — the DONOR for the fog hero (Decision B) + "What is carob?" education section (Decision C) + `prefers-reduced-motion` fallback.

**Brand facts (verify from files, flag any uncertain as UNVERIFIED — do NOT guess):**
MapleMoon = artisan carob from Byron Bay / Brunswick Heads region, organic / vegan / gluten-free / caffeine-free. It is NOT chocolate, NOT a "bean-to-bar" maker, NOT Sydney-based. Carob, not cacao. If you find yourself writing "chocolate" or "cacao" as the product, STOP.

## Goal

Produce **`homepage_synth.html`** (NEW FILE) = `homepage_a.html`'s shell + grafted fog hero (B) + education section (C). Do NOT overwrite `homepage.html` or `homepage_a.html` — both are read-only synthesis references. Promotion to `/homepage.html` happens only after Nate reviews `homepage_synth.html`.

## Build spec

- **Base**: copy `homepage_a.html` structure, type system, nav, and variant picker as-is (it's the agreed shell).
- **Graft Decision B (fog hero)**: bring the fog-primary hero treatment + Water-over-Fog + Brunswick Heads editorial photo-picker variants from `homepage.html`. The picker exists in `homepage_a.html` as text pills (MOONLIT MIST / HONEY MOON / BRUNSWICK COAST / DUNE SILHOUETTE) — reconcile the two picker patterns into one; flag in your handoff which you kept and why.
- **Graft Decision C (education)**: bring the "What is carob?" cut-out-pod-over-subtle-moving-background section, WITH the `prefers-reduced-motion` static fallback. Verify the fallback actually triggers (don't just copy the media query).
- **Decision A (product in hero)**: product shot must be visibly present in the hero, not absent as in the current `homepage.html` first viewport.
- **Fix the washed-out render**: `homepage.html`'s hero text renders at near-invisible opacity/contrast. Diagnose (intro-fade that never resolves vs low-contrast styling) and ensure the synthesis hero is legible on first paint.
- **Assets**: relative paths only (`assets/...`), matching repo convention. Use existing April renders / placeholders — NO 24-May photoshoot finals exist yet (Phase 2 swap).

## Hard constraints (NON-NEGOTIABLE)

- **ZERO em dashes** anywhere a client/visitor reads: `<title>`, all `<meta>`, all body copy. `homepage.html` has 28 (incl. title) — do not carry them over. Pre-flight grep `—` before declaring done; expected count = 0.
- Build as `homepage_synth.html` only. No edits to `homepage.html`, `homepage_a.html`, `products/pure-carob-bar*.html`, `assets/photography/pre_meeting_apr19/`, any `CLAUDE.md`, or any memory file.
- Do NOT deploy to Vercel. Do NOT email/message Carli or Dylan. Do NOT run git merges or branch deletes.
- Dev server already runs: `node server.js` → `http://localhost:3005/homepage_synth.html`.

## Acceptance criteria (all must pass)

1. `http://localhost:3005/homepage_synth.html` renders crisp — hero headline + product legible on first paint (no washed-out state).
2. Decision A: product shot present in hero.
3. Decision B: fog-primary hero + working variant picker (Water-over-Fog + Brunswick Heads selectable).
4. Decision C: education cut-out-pod section present; `prefers-reduced-motion` static fallback verified to trigger.
5. `grep -c "—" homepage_synth.html` == 0.
6. No console errors; all referenced assets resolve (no 404s in network panel).

## Cadence

Single-round build expected. If you fan out into ≥3 sub-rounds, insert a mid-loop pause-look-steer checkpoint (screenshot + "what's too loud / missing / drifted") per multi-round SPIN cadence rule before the back half. Return a screenshot + the 6-criteria pass/fail checklist on completion. Run a 5-item self-critique (incl. ≥1 positive) before handoff.
