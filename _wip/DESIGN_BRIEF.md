# MapleMoon Website — Consolidated Design Brief (overnight run, 14 Jul 2026)

**Status of the design: APPROVED by client 13 Jul ("It looks so good. I'm so happy with it").**
This run = bounded polish + apply unapplied deltas, NOT a redesign. Deadline: click-through link ~16 Jul; page-by-page walkthrough call Mon 20 Jul 7pm. Do not drift the approved "Editorial Night" direction.

## Where work happens
- Edit ONLY the `.WIP.html` copies in `~/maplemoon-website/_wip/`. Never touch originals — they are the approved rollback baseline.
- Authoring is done in `$CLAUDE_JOB_DIR` then `cp`'d into `_wip/` (bg-isolation guard blocks Edit/Write tools inside the repo; Bash cp is additive and fine).
- Approved homepage base = `homepage_real_1_lead_photo.WIP.html` (Editorial Night, 930 lines).
- Screenshots → `_wip/checkpoints/` named `YYYY-MM-DD_vN_<page>_<width>.png`.

## Brand tokens (source: ~/maplemoon_brandkit/brandkit.config.ts)
- Primary `#457798` (UCLA Blue) · Secondary `#E8E5CE` (Eggshell) · Rich black `#0E1F2F` · Off-white `#F8F8F1`
- Greys `#F2EFFB` / `#DEDABA` / `#72A1C0` / `#2C4D63`
- Headings p22-mackinac-pro (400/500) · Body neue-haas-grotesk-display (100–900) · Display Argent Pixel CF
- Fonts via Adobe kit `https://use.typekit.net/dvz0xjs.css` (replace unlicensed local() demo cuts; keep Georgia/Helvetica fallback)
- Logos `~/maplemoon_brandkit/public/svg/`. PROTECT the giant CAROB wordmark (locked signature).

## Photos (drop-in by filename contract — _decisions_pack_20260713.html)
- Canonical finals `~/UFC/spins/maplemoon_contact_sheet_20260713/finals/` (17 brand-matched JPEG+WebP @2400px)
- Hero → `assets/hero_shots/moonlit_ocean_night.webp` · Packshots → `assets/product_shots/{key}.webp`

## THE DELTAS (bounded — this is the whole job)

### A. 13 Jul call decisions (apply — top priority)
A1. Copy reversal (supersedes June): "Handmade in Brunswick Heads" DEAD → "Australian organic carob" / locally-sourced. Brunswick = origin-story only, never a make claim. Fix hero eyebrow, meta description, <title> (drop "(PHOTO VARIANT dev)"), footer, all make-claim strings, every page.
A2. Meet Carli & Dylan (our-story): split couple shot → individual cropped profiles + role blurb each + "favourite way to enjoy" each.
A3. Delayed subscribe pop-up: scroll-triggered after landing (never instant); side "10% off" tab OR top banner; closes cleanly. No baked discount without C&D.
A4. "Coming soon" state for not-launch-ready SKUs.
A5. Quote carousel: feed from current live MapleMoon site reviews now; C&D testimonial slot = marked placeholder.
A6. Carob-story: keep photo slot for incoming Australian Carob Co (SA) farm imagery (permission pending) — placeholder.
A7. Two-click purchase from homepage = hard requirement, don't regress.

### B. 3 open June choices — SCREENSHOT VARIANTS for morning checklist, NEVER auto-pick
B1. Hero brand-surfacing: three stacked lines vs drop small "maple moon" vs merge to one. (CAROB wordmark protected.)
B2. Category packshot cohesion: unify card treatment vs per-category texture.
B3. Motion: restrained scroll-reveal vs static editorial.

### C. Mobile/iPhone harden + photo integration
Widths 375/390/430; safe-area insets; 44px touch targets; fix `.wf-still` mobile display:none if present; LCP budget on hero. Integrate finals by filename contract.

### D. Shopify-readiness (markup shape only — live port BLOCKED)
Shape sections to map onto existing `sections/*.liquid`; note schema fields. Do NOT push a theme.

## BLOCKED — park to checklist
Pricing (placeholders; DO NOT scrape current site = WHOLESALE; retail in C&D sheet; AUD default) · Shopify port (needs collaborator access) · Real reviews / farm permission / font purchase.

## HARD CONSTRAINTS
1. NO OUTBOUND COMMS all run. 2. Money only with Carli & Dylan; strip money refs. 3. Cacao-% omitted on ASAL/CHIL/GCOC/HNUT/PMIN, PCAR 50/50 stays, salted-caramel fudge active — don't "fix". 4. Never touch ~/Downloads MM zips. 5. No em dashes / never the word "vibe" in client copy. 6. Verify SHIPPED artifact via screenshot. 7. Self-critique ≤5 items ≥1 positive. 8. WIP copies only; originals sacrosanct.

## Done-when
Deployable link from WIP copies, all A-deltas applied, two-click intact, mobile clean 375/390/430, fonts render off-machine (or flagged), morning checklist built (base-file confirm + isolation ratify + B-variants). Originals untouched.
