# Open Graph image candidates — brief
# Written: 2026-08-03 · macbook Claude Code (worker)
# STATUS: prepared text for Nate to paste into a FRESH side chat. Nothing sent. No gate cleared.
# Do not give this to 019fb5b5 (queued for board refresh) or 019fc22d (mid-work, ungoverned).

---

**PACKET: prepare Open Graph share-image candidates. Candidates only — implement nothing.**

Work in `/Users/handtomouse/maplemoon-website`, branch `codex-maplemoon-section-review`. If your path contains `.codex/worktrees/`, stop and switch to the live repo.

## Why this exists

None of the six pages has an `og:image` or `twitter:image` — verified: NONE on all six, twitter count 0 on all six. The accepted audit confirms it: *"none of the six pages has canonical, Open Graph or Twitter-card metadata."*

This matters because the project's deliverable, CR-4, **is a link send**. URLs go to Carli and Dylan. With no `og:image` those links render as bare text in Messages, WhatsApp, Slack and email — the first thing they see of the site is nothing.

## Hard constraint — the frozen package

`docs/client-review/2026-08-01-saturday-review/staging-v1/clean/` is frozen and hash-verified (`clean/MANIFEST.json` = `d1c66b1d…`), and CR-0 keyboard and 200%-zoom evidence was measured against those exact bytes.

**You produce image candidates and a contact sheet. You do not add a single meta tag.** Implementation needs approved copy, canonical URLs and a separate code/access packet. Touching the pages re-freezes the package and forces a full CR-0 re-proof.

## The spec is already accepted — work to it, don't re-derive it

From `LINK-PREVIEW-METADATA-AUDIT-20260802.md`, the Open Graph image gate requires a future decision packet to prove:

1. source and approval status;
2. truthful product/people representation;
3. **no unsupported text or claim embedded in the image**;
4. safe 1.91:1 crop, **1200 × 630 master** recommended;
5. useful appearance across image-only, title-and-description surfaces;
6. contrast and legibility wherever text is deliberately included;
7. file type, byte size and absolute HTTPS URL behaviour on the exact host.

Gate `LP-03` — *"Open Graph image provenance, crop and claim safety approved"*, owner Nate plus client asset owner — is **HOLD**. Your output prepares that gate. It does not clear it. Say so in your receipt.

## What to produce

Two families, so Nate has a real choice of risk profile:

**Family 1 — atmosphere, no product.** Carob pods, the pale website blue, the established still-life language. Zero product-claim risk and zero permission exposure. Safe to generate synthetically.

**Family 2 — product-led. Generating raw product IS permitted.**

Nate's explicit ruling (3 Aug): raw, unwrapped carob product may be generated, because out of its packaging it reads as carob chocolate the way a pod reads as a pod. Do **not** mask or cut out a flat product shot and paste it into a scene — that looks pasted-in and is not what we want. Build proper imagery.

**CORRECTED 3 Aug — read this carefully, an earlier draft of this brief got it wrong.**

`/Users/handtomouse/UFC/spins/maplemoon_bites_moodboard_export_20260516/output_PNG/` (79 PNGs, 13 SKU families, multi-angle) is **NOT a real photoshoot.** Its own provenance records say so: `SPIN_BRIEF.md` describes the PSB layers as AI source images and lists real-photo retouching as a separate future SPIN; `SESSION_CHECKPOINT.md` calls them AI-generated moodboard tiles. They are **product-form references only** — never exact product identity, never client photography, and the flavour in a filename is provenance, not an approved claim.

**The verified real photography is:**
`/Users/handtomouse/UFC/clients/maplemoon/deliverables/hero_raws_ORIGINAL_wetransfer_20260603/Heros-24.jpg` — SHA-256 `6b0373e490e1270d6b327e5f505aff2b2453c57c20884c741da2fe17afedc86e`, 4000×6000, a genuine Mitch/client photograph of naked Moon pieces. That is the only source that can carry exact product identity.

So: use `Heros-24.jpg` where real product identity is needed, and the moodboard tiles only as form reference for clearly-labelled generic explorations. Never present a generated form as an exact MapleMoon product.

**The critical discipline — the moon is not a generic shape.** MapleMoon's crescent is a *designed proprietary form*: a specific taper, a specific inner curve, thick spine narrowing to fine points, matte deep reddish-brown with a soft sculptural sheen. That is the brand's signature. A pod is a natural generic object and forgiving; the crescent is not. Wrong proportion, wrong curve or a glossy plastic finish and it misrepresents the product even with no packaging in frame. Match the reference geometry and finish exactly, then verify against `moons-group-01/02/03.png`, `moons-pure-main.png` and the `close-texture` shots.

The same holds for the other forms — eclipsed bites, bars, fudge, bananas — each has its own real geometry in that directory. Reference the correct SKU for whatever appears.

Note the reference shoot is lit on clean white. The site language is the pale website blue with cool directional light. Re-lighting and re-staging into that world is exactly the generation task.

**Still absolutely forbidden:** packaging, wrappers, sleeves, labels, logos, printed text of any kind, or any claim rendered into the artwork. Unwrapped product only.

For each family produce a brand-default candidate plus, if it reads differently, homepage / shop / our-story variants. Deliver a contact sheet showing every candidate at 1200 × 630 **and** cropped to the surfaces that actually matter: the wide 1.91:1 card, a square-ish crop, and a small thumbnail.

## Forbidden in the artwork itself

No embedded claims, prices, stockist counts, certifications, awards or availability statements. No people, faces or hands. No fabricated packaging or labels. No readable text unless Nate has approved that exact wording — and if text is included, prove contrast and legibility at thumbnail size.

## Before you generate

State your generation route explicitly and name it in the receipt. Check free disk space first; HOLD all large-output work below 20 GiB free.

## Do not touch

Any page, `staging-v1/` or its manifests, `docs/orchestration/`, `LOCK_MANIFEST.json`, `.gitignore`, `scripts/check-maplemoon-review.py`. No commit, push, deploy, publish, upload or send. Record no CR gate. Select nothing on Nate's behalf.

Writable: your own evidence directory only.

## Report

Candidate count per family, the generation route named, a contact sheet at the three crops, an explicit statement that LP-03 remains HOLD, and — for anything product-led — which reference files from the photoshoot export you worked from, plus a side-by-side showing your generated form against the real reference so the crescent geometry can be checked at a glance. Then release ownership.
