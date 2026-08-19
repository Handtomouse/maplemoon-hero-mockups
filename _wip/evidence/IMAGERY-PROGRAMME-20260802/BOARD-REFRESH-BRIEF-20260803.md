# Ritual decision board — refresh brief
# Written: 2026-08-03 00:58 AEST · macbook Claude Code (worker)
# STATUS: prepared text for Nate to paste into the imagery thread. Nothing sent. No verdict.

---

**PACKET: refresh the ritual decision board against the expanded candidate set. Re-take the imagery write lane.**

You released ownership after `IMAGERY-PROGRAMME-RECEIPT-20260802.json`. I am giving it back to you for one bounded task. Nothing else about the programme changes.

## Why this is needed

Your board (`ritual-decision-board.json`, 23:46) is **stale**. Between 00:02 and 00:56 another thread produced a second candidate set your board has never seen, and it is not a variant of the 15 you catalogued — I hashed all of it against `CANDIDATE-MANIFEST.sha256` and there is **zero overlap**. Deciding from your board right now means choosing from a superseded set.

## The new input, already frozen for you

`ROUND-ABC-MANIFEST.sha256` in this directory — **12 entries** (candidate images only), self-hash `fc6e36cc25bc1fc5`, verified stable 12/12 across a 40-second hash re-check.

Source: `/Users/handtomouse/.codex/visualizations/2026/08/02/019fc22d-074e-7453-8544-c3a09238af2b/ritual_rounds_abc_20260802_v1/`

| Group | Files | State |
|---|---|---|
| Round A | `round_a_{after_dinner,afternoon,tea_at_night}_v1.png` + `round_a_contact_sheet_v1.png` | stable, written 00:02–00:25 |
| Round B | `round_b_{after_dinner,afternoon,tea_at_night}_v1.png` + `round_b_contact_sheet_v1.png` | stable |
| Round C | `round_c_{after_dinner,afternoon,tea_at_night}_v1.png` + `round_c_contact_sheet_v1.png` | stable |
| Competing board | `site_treatment_board_{desktop,mobile}_v1.png`, `site_treatment_board_v1.html` | **VOLATILE — deliberately excluded from the manifest** |

**Why the competing board is excluded:** a first snapshot at 00:56:13 covering all 15 files failed re-verification two minutes later — those three board files were being rewritten in place (PNGs at 00:56:23 and 00:56:27) while the twelve candidate images had not changed since 00:25. The owning thread is still iterating its board. Treat those three as a read-only moving reference, never as a frozen input, and re-hash them at the moment you read them.

Art-direction context, read-only: `../019fc22d-.../maplemoon_on_brand_ritual_study_20260802/` — `style_dna.md`, `scene_correction_map.md`, `manifest.json`, references and desktop v1/v2 boards.

## The task

1. **Verify first.** Re-check `ROUND-ABC-MANIFEST.sha256` and `CANDIDATE-MANIFEST.sha256` before you use anything. If either drifts, stop and report — do not build on a moving set.

2. **Resolve the naming collision explicitly.** The new files are `round_a/b/c`; your board already has sets `A`, `C`, `R1`, `R2`, `R3`. State plainly whether `round_a/b/c` are the same three rounds as the `generation-plan.md` R1/R2/R3, genuinely new directions, or a re-render of existing ones. **Do not assume, and do not silently merge two different things under one letter.** If they are new, give them distinct unambiguous IDs.

3. **Fold them into the existing board schema** — same `candidate_sets` shape (`id`, `label`, `status`, `items[]` with `id`, `path`, `sha256`, `dimensions`, `limitation`). Keep every existing set. This is an addition, not a replacement.

4. **Reconcile the two boards.** The other thread built its own `site_treatment_board_*`. Say which treatment is correct against the frozen Homepage `#ritual` CSS, and note any place the competing board departs from it. One board must end up authoritative.

5. **Re-render** `ritual-decision-board-desktop-1440.png` and `-mobile-390.png` with the full set, keeping the frozen crop/filter/gradient/text-safe treatment and labels outside the artwork.

6. **Update the shortlist honestly.** The current non-binding shortlist (R1.1 + R2.2 + R3.3) predates the new material. Either restate it against the full set or withdraw it — do not leave a stale recommendation standing.

## Hard limits — unchanged

**Generate nothing.** This is a re-render of a board from existing bytes only. No new imagery, no editing of any candidate, no wiring, no page changes.

Do not touch: any page, `staging-v1/` or its manifests, `docs/orchestration/`, `LOCK_MANIFEST.json`, `.gitignore`, `scripts/check-maplemoon-review.py`. No commit, push, deploy, publish, upload or send. Record no CR gate. Select nothing on Nate's behalf.

Writable: this directory only.

## Report

Board refreshed with a stated total candidate count; the naming-collision ruling; which site-treatment board is authoritative and why; the restated or withdrawn shortlist; and both manifests re-verified at exit. Then release ownership again.
