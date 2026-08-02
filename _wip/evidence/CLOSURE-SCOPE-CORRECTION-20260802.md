# CORRECTED CLOSURE SCOPE — clean homepage
# For: SAT-HOME-CLEAN-CLOSURE-01 rebuild
# Written: 2026-08-02 · macbook Claude Code (worker)
# STATUS: proposal for Codex. Records no verdict, passes no gate, builds nothing.
# Authority: Nate ruled on the buckets directly. Codex owns the builder and the rebuild.

## Why this exists

The candidate produced under `SAT-HOME-CLEAN-CLOSURE-01` removed **26 lines** of visible
copy from the clean homepage. Nate's ruling: **it over-stripped.** Only a subset is actually
unsupported; the rest was general botany, brand voice, or a real product.

The packet's objective included *"reduce the education and story copy to neutral
page-navigation language"*. That instruction is broader than the claims problem it was
solving, and it is the source of the over-reach. **This document narrows it.**

The claims problem is real and traces to the Carli note register:
- **CV-046** — Australian Carob Co. / South Australia / Byron Bay source and process
  paragraph → `needs-fact-check`; *"supplier, geography, process and ingredient claims
  require authority"*
- **CV-063** — carob sourced from an Australian carob farm in South Australia →
  `needs-fact-check`; *"Canva contains spelling errors and is not sufficient supplier proof"*

Both concern **Maple Moon's supplier, geography and process**. Neither concerns brand voice,
general carob botany, or the sampler product.

---

## CUT — unsupported Maple Moon claims (8 items)

These assert origin, organic status or growing/process facts about Maple Moon's own product,
with no authority beyond a Canva document. They stay out **until Carli or Dylan supply
supplier documentation**, at which point they return evidenced rather than permitted.

| # | Exact copy | Claim type |
|---|---|---|
| 1 | `Maple Moon: Australian Organic Carob` (`<title>`) | origin + organic |
| 2 | `Australian organic carob` (hero eyebrow) | origin + organic |
| 3 | `Australian-grown carob pods.` | origin |
| 4 | `The far north coast` | geography |
| 5 | `Where the slow evenings live.` | geography (subtitle of #4) |
| 6 | `Carob is a naturally sweet pod that grows in the warm Australian sun. It is not a bean, and it is naturally caffeine free.` | origin/growing — **see note** |
| 7 | `Sun-ripened, naturally sweet pulp.` | process |
| 8 | `Sun-ripened` | process |

**Note on #6.** Only the origin clause is the problem. The botanical facts in the same
sentence are fine. Recommended rewrite keeping both meaning and voice:

> `Carob is a naturally sweet pod. It is not a bean, and it is naturally caffeine free.`

Title and eyebrow replacements: the candidate used `Maple Moon Carob` and `Maple Moon carob`.
Both are claim-safe and acceptable. If a stronger title is wanted, it must avoid origin and
organic terms until evidence exists.

---

## KEEP — general carob botany (4 items)

Independently verifiable facts about the plant, true regardless of who supplies it. These are
not Maple Moon claims and were cut defensively.

- `A pod, not a bean`
- `Naturally caffeine free.`
- `Caffeine free`
- `The pod`

Carob (*Ceratonia siliqua*) is a legume pod and is naturally caffeine-free. The candidate's
replacement — `Carob comes from the pod of the carob tree` — says less while asserting the
same thing, so it is a net loss.

## KEEP — brand voice (3 items)

No factual claim of any kind. Never flagged by Carli. This is the substance of the over-reach.

- `Born from Nighttime Cravings`
- `& Kind Intentions`
- `Discover the thinking behind Maple Moon: naturally sweet carob, quieter evenings, and small rituals made with care.`

The candidate replaced these with `The story behind Maple Moon` and `Meet the people behind
Maple Moon and explore the ideas shaping the brand.` — navigation labels in place of voice.
**Restore the originals.**

## KEEP — the sampler / box (7 items)

**Nate has confirmed the box exists as a real product.** The packet already recognised the
six-bar sampler as evidence-backed; only the framing was cut. With the product confirmed,
the framing is supported.

- `The starter box`
- `Try every` / `flavour.`
- `Six bars, one box. The whole range in a single starter set, ready for the slow part of the evening.`
- `maple moon · the starter box`
- `Inside the box`
- `Made to be given. The box does the wrapping.`

The candidate's `Six-bar sampler` / `Sampler selection` / `Six Maple Moon bar flavours, shown
together in one sampler.` are **not needed** if the originals return. Do not ship both.

---

## UNRULED — needs Nate, do not decide unilaterally (2 items)

I did not classify these when Nate ruled, so they carry no instruction. **Do not cut or keep
them on my say-so.**

1. `Deep, smooth and naturally sweet. Made with just real ingredients.`
2. `Carob Bars: Smooth, naturally sweet bites for calm cravings.`

Assessment offered, not a decision: the taste descriptors ("deep, smooth", "for calm
cravings") are subjective marketing rather than regulated factual claims, and `made with just
real ingredients` should be substantiable directly from the packaging ingredient list. On
that reading both are keepable. **But they are product claims, not botany or voice, so they
sit in a different class from anything Nate ruled on. Confirm before building.**

---

## Net effect

The original candidate cut 26 lines. This scope cuts **8**, rewrites **1** (#6), and restores
the other 17 — pending the two unruled items.

## What must NOT change

- The clean/annotated split stays. Comparison and process evidence continues to live in the
  byte-identical annotated homepage; this document changes only what clean removes.
- No new facts. Nothing here invents product, ingredient, origin, taste, packaging, price,
  availability or commerce content. Every KEEP is copy that already exists in the current
  frozen homepage.
- The other five pages are untouched.

## Consequences to plan for

Rebuilding changes the homepage bytes, so:
- `clean/MANIFEST.json` (`d1c66b1d…`) and the aggregate manifest are re-pinned.
- The keyboard and 200% zoom evidence bound to the current hashes must be re-run. Both are
  automated now and run unattended — the iMac harness at
  `_wip/evidence/IMAC-KEYBOARD-PROOF-20260802/HARNESS.py` produced five pages at literal
  390 CSS px, and the 200% sweep is headless.
- **Nate's CR-0 should happen ONCE, against the rebuilt package.** His editorial pass is the
  expensive input and must not be spent twice.

## Open blocker this does not solve

`SAT-HOME-CLEAN-CLOSURE-01` is at `outcome: HOLD` with 7 of 9 checks PASS. Both HOLDs are the
same item — the live sequential keyboard/focus proof, which failed because Chrome automation
was unavailable. That capability now works (osascript key events + CDP `Page.bringToFront`;
activation by app name was the root cause of every prior failure). `next_reviewer` reads
*"Main Boss after a fresh supported live-browser keyboard proof."*

So the proof should run against **the rebuilt homepage**, not the current one and not the
over-stripped candidate.
