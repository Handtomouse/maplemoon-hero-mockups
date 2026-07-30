---
type: dispatch_list
project: MapleMoon Website
day: 1 (Sat 2026-05-09)
date_drafted: 2026-05-08
status: QUEUED — DO NOT FIRE until Nate green-lights at standup
author: PM SPIN
---

# Day 1 Dispatch — Sat 2026-05-09

## Pre-conditions (must clear before dispatch fires)

These are the Friday-night gates. If any are red, Day 1 work for that SPIN holds.

| Gate | Owner | State |
|---|---|---|
| Decisions A/B/C ratified (PROVISIONAL → GREEN) | Nate | ASK on standup |
| Reconcile path chosen (A / B / C from `2026-05-08_repo_reconcile.md`) | Nate | ASK on standup |
| Photography placeholder rule for Phase 1 | Nate | ASK on standup |
| About vs Our Story naming choice | Nate | ASK on standup |
| PDP variant pick (A or C) | Nate | ASK on standup |
| Frontend / Content / Integrations SPIN launchers in `~/bin/` ready | PM SPIN | NOT YET — assume not spawned, dispatch is paperwork only |

If gates clear at standup, Day 1 is **paperwork → first executor task each SPIN picks up**, not full sprint.

## Dispatch table

| # | Executor | Task slug | File path on dispatch | Estimated effort | Done-when |
|---|---|---|---|---|---|
| D1.1 | PM SPIN | reconcile-diff-survey | (this file's follow-on, written direct to checkpoints/) | 1.5h | `git diff main..staging-direction-a-twyg` summarised in 1 page; merge risk per file flagged; Nate eyeballs before any merge |
| D1.2 | Frontend SPIN | hero-fog-promote | `tasks/2026-05-09_09_frontend_hero-fog-promote.md` | 3h | `homepage.html` plays `blue_fog_animated_pingpong.mp4` with poster fallback, reduced-motion served the still, WCAG passes on hero text |
| D1.3 | Frontend SPIN | hero-water-variant | `tasks/2026-05-09_12_frontend_hero-water-variant.md` | 2h | `/homepage_v_fog_water.html` exists, CSS-only shimmer at ≤25% opacity, `prefers-reduced-motion` disables shimmer |
| D1.4 | Frontend SPIN | pdp-template-pick | `tasks/2026-05-09_15_frontend_pdp-template-pick.md` | 2h | One canonical `products/pure-carob-bar.html` (post-reconcile) consolidates A or C; old variants archived to `archive/`; ready to clone for 5 other Phase 1 SKUs |
| D1.5 | Content SPIN | three-ingredients-hook | `tasks/2026-05-09_10_content_three-ingredients-hook.md` | 1h | Editorial-break copy proposal with 3 phrasings of Alex's hook; saved alongside the homepage editorial-break section reference; Nate picks one before Frontend bakes it in |
| D1.6 | Content SPIN | about-naming-decision-prep | `tasks/2026-05-09_11_content_about-naming-decision-prep.md` | 30m | Diff between current `our-story.html` and what Phase 1 `about.html` would need; recommendation note for Nate ratify |
| D1.7 | Content SPIN | faq-three-ingredients-integrate | `tasks/2026-05-09_14_content_faq-three-ingredients-integrate.md` | 1h | `faq.html` has the three-ingredients hook woven in; em-dash grep clean; reduced-motion not relevant here |
| D1.8 | Integrations SPIN | contact-formspree-stand-up | `tasks/2026-05-09_13_int_contact-formspree-stand-up.md` | 2h | Formspree endpoint live, `/contact.html` skeleton renders form, spam honeypot in place, success/error states styled; copy placeholder, not final |
| D1.9 | PM SPIN | day1-eod-checkpoint | `checkpoints/2026-05-09_pm.md` | 30m | One-page rollup: shipped, blocked, dispatched-for-Sun |

## Dispatch ordering rationale

- **Reconcile diff (D1.1) first** at ~9am AEST so Frontend doesn't start work on a branch about to be merged.
- **Frontend gets 3 tasks** (D1.2, D1.3, D1.4). Hero promote first because everything else depends on a working baseline. Variant + PDP can run after.
- **Content gets 3 small parallel tasks** so it ramps without waiting on Frontend output.
- **Integrations gets 1 task** since Contact is the only Phase 1 page touching it; rest of Integrations workload is in Phase 2 (Shopify, Klaviyo, analytics).

## Done-when for Day 1 (PM-level)

- All 9 dispatch tasks produce files in their target locations or get a clear "blocked because X" note in the EOD checkpoint.
- No executor SPIN goes silent for >18h without a checkpoint update.
- Nate has received standup (8am AEST Sat) + EOD (5pm AEST Sat).
- Sun 2026-05-10 dispatch list queued by 5pm Sat.

## What is NOT in Day 1

- Products index page (Sun task).
- Header re-integration from Paper artboard (waiting on Carli to point at the artboard, blocker question 1 in session_01_homepage.md).
- Education section motion treatment (Sun or Mon).
- Real photography swap-in (Phase 2).
- Shopify cart integration (Phase 2).
- Domain cutover (Phase 2).

## Notes

- All commits use the convention from PLAN.md: `[FRONTEND]`, `[CONTENT]`, `[INT]`, `[PM]`.
- All file writes em-dash-free per project rule.
- Each task brief, when generated tomorrow morning, must be self-contained: file path, constraint, done-when, and the relevant decision references inline. Executors should not need to re-read PLAN.md to act.
