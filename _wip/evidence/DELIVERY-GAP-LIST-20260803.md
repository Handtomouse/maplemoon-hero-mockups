# MapleMoon delivery gap list — 2026-08-03

**Written by:** Claude Code (macbook), from `READINESS-DEPENDENCY-ROADMAP-20260802.md`,
`docs/orchestration/packets/`, and live verification of the deployed preview.
**Purpose:** single numbered list of what is still missing, with one owner per line, so Codex
and Claude are not working from two different pictures.

## Verified closed (checked live, 2026-08-03)

**G0 — Carli's preview URL now serves the full build.** `https://maplemoon-preview-carli.vercel.app`
All six pages 200. `grep -c 'Why not'` on `/homepage` = **1** (stripped build returns 0).
`grep -c 'two wholefood ingredients'` on `/shop` = **1** (Carli's Canva copy is live).
The brief at `_wip/deploy/CODEX-BRIEF-20260803-PREVIEW-URL.md` is complete. Do not re-run it.

## Open gaps

| # | Gap | Owner | Blocked on |
|---|---|---|---|
| G1 | Carli's and Dylan's bios never placed. Emailed 2026-07-29 as "Carli Blurb" / "Dylan Blurb". `/our-story` still renders "Individual stories to come" (confirmed live). | **Nate decides** placement + trim, then Claude-lane edit | Nate only |
| G2 | 41 of 68 Canva notes undelivered. 20 are `needs-fact-check` (origin/health claims). 19 were `ready-copy-review`, 12 applied. CV-037, CV-033, CV-054 held on purpose. | **Nate/Carli** for the 20 fact-checks; **Codex-lane** to apply the remainder | Supplier authority |
| G3 | `carob-story` comparison table stacks badly at 390px — content in a ~130px column, labels between the values they describe. Not an overflow. | **Design decision**, then Codex-lane CSS | Nate |
| G4 | 5 OG social images missing (`assets/social/og-*.jpg`). Link previews degrade. Candidates exist untracked under `_wip/evidence/IMAGERY-PROGRAMME-20260802/og_image_candidates_20260803_v1/`. | **Nate picks**, Codex-lane renders + places | Nate |
| G5 | Working tree dirty across a handoff: 12 modified product shots plus untracked `_wip/deploy/site/`, `site-full/`, and ~10 evidence docs. CLAUDE.md forbids this. | **Codex-lane** commit | Nothing |

## Structural finding — the two-sources-of-truth problem

This is the actual "centralisation" gap.

`READINESS-DEPENDENCY-ROADMAP-20260802.md` governs the **frozen six-page package** at
`docs/client-review/2026-08-01-saturday-review/staging-v1/clean/`. Gates CR-0 through CR-4 are all
written against that artifact.

But that artifact is **not what Carli is looking at.** She now has `site-full/`, built from
`_wip/*.WIP.html` — roughly 630 more words, the "Why not cacao?" section intact, and a working
add-to-cart instead of a mailto.

Consequence: CR-0 (Nate's literal 200% zoom and keyboard pass) as written certifies a build no
client will ever see. Passing it proves nothing about the live preview. Every downstream gate
inherits that mismatch.

**Recommendation for Codex:** propose a §9 packet that either (a) re-points CR-0..CR-4 at
`site-full/` as the reviewed artifact, or (b) explicitly retires the frozen package as a
historical checkpoint and opens a fresh gate path. Do not silently run CR-0 against `clean/`.
Do not edit the frozen tree either way — `npm run review:saturday:check` must stay at 0 failures.

## Suggested order before the client call

1. G1 (bios) — highest client-visible value, smallest edit, Nate-blocked so ask first.
2. The structural finding — Codex proposes the packet; without it QA effort goes to the wrong build.
3. G5 (commit) — cheap, and the tree should not stay dirty.
4. G4, G3, G2 — after the call.
