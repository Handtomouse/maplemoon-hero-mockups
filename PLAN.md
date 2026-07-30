---
type: project_plan
project: MapleMoon Website
created: 2026-05-08
phase_1_ship: 2026-05-24 (Sun, photoshoot day)
phase_2_ship: 2026-06-07 (Sun, photo finals delivery day)
orchestration: PM SPIN + 3 executor SPINs (frontend, content, integrations)
canonical_location: ~/maplemoon-website/PLAN.md
---

# MapleMoon Website Build Plan

## Goals

**Phase 1 (by 2026-05-24, 16 days)**: ship Home + 5 main pages, live on `maplemoon-website.vercel.app` (or final domain if cutover landed). Photography is placeholder for SKUs not yet shot.

**Phase 2 (by 2026-06-07, 30 days)**: full launch. All 19 remaining product detail pages with real photography from Mitch's photo finals delivery. Shopify cart + checkout. Email capture + abandoned cart flow. SEO + analytics fully wired. DNS cutover to `maplemoon.com.au`.

## Page list (Phase 1)

| Page | Path | Owner | Status |
|---|---|---|---|
| Home | `/homepage_synth.html` → promote to `/homepage.html` | Frontend (lead) + Content + Integrations | SYNTHESIS BUILD (2026-05-31): start from `homepage_a.html` shell, graft fog hero (B) + education section (C) from `homepage.html`, em-dash sweep, fix washed-out hero contrast |
| About | `/about.html` (TBC) | Content (lead) + Frontend | NOT STARTED |
| Products index | `/products/index.html` (TBC) | Frontend (lead) + Content | NOT STARTED |
| Pure Carob PDP (template) | `/products/pure-carob-bar.html` | Frontend (lead) + Content | EXISTS but uncommitted parent-session work, treat as DO-NOT-TOUCH baseline, build NEW alongside |
| Contact | `/contact.html` (TBC) | Integrations (lead, Formspree) + Frontend | NOT STARTED |
| FAQ | `/faq.html` (TBC) | Content (lead) + Frontend | NOT STARTED |

## Page list (Phase 2)

19 remaining product detail pages: 5 bars (ASAL, CHIL, GCOC, HNUT, PMIN), 6 moons, 5 bites, 2 elixirs, 1 banana, 1 powder. Plus bundle/gift box pages.

## Decisions ratified (2026-05-08, PROVISIONAL pending Nate overturn)

Three decisions from `~/UFC/clients/maplemoon/session_plans/session_01_homepage.md`. Ratified Friday afternoon by Nate (provisional, with explicit overturn path: edit this file to flip any of A/B/C and PM SPIN re-reads on next standup):

- **A. Product presence in hero**: **Option 1, product IN hero**. Reason: Carli flipped mid-call to "way stronger" referring to the larger product shot. Preserves the flavour-to-colour link.
- **B. Hero background motif**: **Option 1, fog primary + Water-over-Fog + Brunswick Heads variants in editorial-picker pattern**. Reason: Carli explicitly asked for the comparison; picker pattern already on the page so build cost is low.
- **C. Education section imagery**: **Option 1, cut-out carob pod over subtle moving bg, with `prefers-reduced-motion` static fallback**. Reason: Carli flagged the section as weak, low-risk reversible change, motion guard covers her own "too much" concern.

**Overturn path**: edit this file's Decisions section directly to flip any of A/B/C. PM SPIN reads PLAN.md every wake; flips land within one standup cycle.

**Executor unblock**: Frontend SPIN can now proceed on hero promote + variant picker + education cut-out. Content SPIN can write hero + intro band + education copy aligned to these directions.

## Coordination contract

- **Single source of truth**: this file (`~/maplemoon-website/PLAN.md`)
- **Daily PM checkpoint**: `~/maplemoon-website/checkpoints/YYYY-MM-DD_pm.md` (one per day)
- **Task dispatch**: PM SPIN writes `tasks/YYYY-MM-DD_HH_<executor>_<slug>.md`, executor SPIN picks up
- **Commits**: prefix with `[FRONTEND]`, `[CONTENT]`, `[INT]`, `[PM]` per executor
- **Nate-facing standup**: 8am AEST iMessage from PM SPIN ("today's plan + blockers")
- **Nate-facing EOD**: 5pm AEST iMessage from PM SPIN ("what shipped + tomorrow's setup")
- **Carli/Dylan loop**: Week 1 = Nate only. Decision after Sun 2026-05-17 review of how Week 1 went.

## DO-NOT-TOUCH files

These have uncommitted parent-session work, do not modify:
- `homepage_cd_*.html`
- `cd_bundle/`
- `claude_design_briefing.md`
- `products/pure-carob-bar.html` (treat as reference, build new alongside)
- `assets/photography/pre_meeting_apr19/`

## Current code state (snapshot 2026-05-08)

- Static HTML + CSS site, no framework
- Hero variants exist: `homepage.html`, `homepage_v_fog.html`, `homepage_v_byron.html`, `homepage_v_pods.html`
- 4 Vercel projects deployed: `maplemoon-website` (primary, 8d), `maplemoon-hero-mockups`, `maplemoon-dashboard`, `maplemoon_brandkit`
- Two `.claude/worktrees/` exist (wonderful-brattain, bold-shockley) suggesting prior parallel session work
- No `package.json`, no build step (raw HTML deploy)
- 17 days since session_01_homepage.md was authored, work has stalled

## Risks + mitigations

| Risk | Mitigation |
|---|---|
| 24 May photoshoot pulls Nate's attention from website | Orchestration team owns daily delivery, Nate ratifies decisions only |
| Decisions A/B/C never ratified | PM SPIN surfaces as a hard blocker on Day 0 + every standup until resolved |
| Photography placeholders look thin on launch day | Content SPIN sources high-quality stock or AI-generated DIRECTIONAL placeholders, marked clearly for Phase 2 swap-out |
| Shopify integration takes longer than expected | Phase 1 launches WITHOUT cart (display-only catalog), Phase 2 adds cart |
| Domain cutover fails | Phase 1 ships on `maplemoon-website.vercel.app`, DNS in Phase 2 |
| Two parallel worktrees + uncommitted work creates merge conflicts | PM SPIN's first Day 0 task is to inventory + recommend reconcile path before any executor writes code |

## Dispatch state

| Date | Standup | EOD | Tasks dispatched | Tasks closed | Blockers |
|---|---|---|---|---|---|
| 2026-05-08 (Day 0) | sent 13:59 AEST, Path A picked | scheduled 17:00 AEST | 0 (paperwork only, executors not yet spawned) | n/a | none open: reconcile path B chosen, decisions A/B/C green, Sat dispatch greenlit |
| 2026-05-09 → 2026-05-30 | NONE | NONE | 0 | 0 | ORCHESTRATION NEVER FIRED. Sat 2026-05-09 dispatch did not run; no standups; no executor SPINs spawned. This is why nothing shipped and 2026-05-24 Phase 1 ship date passed. |
| 2026-05-31 (resume) | resume session, not a standup | pending | 1 (frontend synthesis home, drafted) | 0 | operating model resurrected; lead = synthesis; home-first scope; frontend SPIN brief drafted, awaiting Nate fire |

(PM SPIN appends rows daily.)

## Day 0 resolutions (2026-05-08)

- **Reconcile path**: Option B chosen by Nate. PM SPIN runs `git diff main..staging-direction-a-twyg` survey first thing Sat (D1.1). Then merge staging-direction-a-twyg into main, push to origin, archive `staging-direction-b/c`, `claude-design-explore/v2`, `paper-shopify-heroes`, `saturday-refinement`, all `claude/*` worktree branches. Worktrees `bold-shockley` and `wonderful-brattain` removed last.
- **DO-NOT-TOUCH list**: 3 of 5 paths (`homepage_cd_*.html`, `cd_bundle/`, `claude_design_briefing.md`) are stale and will be trimmed when PLAN.md gets its first commit on the new main.
- **Decisions A/B/C**: PROVISIONAL → CONFIRMED GREEN. Frontend SPIN cleared to proceed on hero promote, water-over-fog variant, background picker, education cut-out.
- **Sat dispatch**: 9 tasks fire 8am AEST per `tasks/2026-05-09_day1_dispatch.md`. PM SPIN wakes at 8am AEST Sat for Standup #2.

## Resume resolutions (2026-05-31, ratified by Nate)

State reconciled 23 days after the last checkpoint. The PM-SPIN orchestration never fired past Day-0 paperwork; nothing shipped; the 2026-05-24 Phase-1 ship date passed. Four decisions locked this session:

- **Operating model**: RESURRECT SPIN orchestration (PM + frontend/content/integrations executors per the Coordination contract above). Not solo-build.
- **Phase 1 lead page**: SYNTHESIS. Start from `homepage_a.html` (the newer Direction-A restyle: strong typographic shell, em-dash-clean, evolved variant picker) and graft back the fog hero (Decision B) + "What is carob?" education section + `prefers-reduced-motion` fallback (Decision C) from `homepage.html`. Rationale: `homepage_a.html` is the stronger execution but silently dropped B+C (it predates the 08-May ratification); `homepage.html` honours B+C but renders washed-out and is em-dash-dirty. Synthesis keeps the better shell and honours the ratified decisions. Build as new `homepage_synth.html`, review, then promote to `homepage.html`.
- **Phase 1 scope**: HOME-FIRST. Get the synthesis homepage ship-ready, then re-scope About / Products index / Contact. (`our-story.html`, `collections/`, `faq.html` already exist as starting points; no `contact.html` yet.)
- **Branch state**: still DIVERGED — `main` = Apr 19 baseline; working branch `staging-direction-a-twyg` branched *before* the baseline (merge-base `ce3bb86`), so it LACKS the 2 baseline commits incl. `1e4bed1` "close 9 pre-review blockers." The "merge twyg→main" reconcile is a true 3-way merge, NOT a fast-forward, and is DEFERRED until after the home build (Nate's call, not auto).

### Current-truth corrections to this plan
- DO-NOT-TOUCH `homepage_cd_*.html` and `cd_bundle/` **do not exist on disk** (stale guard, confirmed 2026-05-08 + 2026-05-31). Real DO-NOT-TOUCH: `products/pure-carob-bar.html` (+ `_a`/`_c`), `assets/photography/pre_meeting_apr19/`, and now `homepage.html` / `homepage_a.html` as synthesis source references.
- **No CLAUDE.md exists** anywhere in the repo. Conventions = this PLAN.md + UFC naming.
- **No 24-May photoshoot finals in the repo** — only April sets. Synthesis home uses existing April renders / placeholders; real-photo swap is Phase 2 when finals land (~2026-06-07).
- Two 30-Apr stashes (`@{0}` claude-design-v2, `@{1}` claude-design-explore) untouched — separate decision tree, do not apply/drop without Nate.
- Dev server: `node server.js` → `http://localhost:3005` (express static on repo root; `npm install` required, deps were absent on resume).
