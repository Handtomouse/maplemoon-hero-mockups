# What still needs image generation — prep-ahead list
# Written: 2026-08-03 · macbook Claude Code (worker)
# STATUS: analysis. Records no verdict. Passes no gate. Nothing generated.
# Method: extracted every image reference from the six frozen clean pages, resolved each
# against disk, cross-checked shop SKUs, and audited social/preview metadata.

## Headline

**The six pages have no broken or missing image references.** All 45 references across
homepage, shop, our-story, carob-story, stockists and faq resolve on disk. All 22 shop SKUs
have matching `assets/product_shots/*.webp` files. Nothing is a placeholder.

So the remaining work is **not** "fill missing slots". It is one genuine absence, one
decision, and a set of things that are not generation at all.

## TIER 1 — the one real generation gap, and it will be seen

**Open Graph / social share images. Zero of the six pages has one.**

Verified: `og:image` is NONE on all six pages, `twitter:image` count is 0 on all six. The
link-preview audit confirms independently: "none of the six pages has canonical, Open Graph
or Twitter-card metadata", with og:image, twitter:image and canonical all marked Missing for
every page.

**Why this matters more than it looks:** CR-4 *is* a link send. The deliverable is sharing
URLs with Carli and Dylan. With no `og:image`, those links render as bare text in Messages,
WhatsApp, Slack and email previews — the first thing they see of the site is nothing.

Favicon is fine — `assets/mm_logo_icon_blk.svg` is present and linked on all six pages.

**Prep that is safe to do now:** design candidate OG images (1200×630) against the frozen
pages' own look. **Do not implement.** Wiring requires approved metadata copy, exact canonical
URLs and a code/access packet, per `LINK-PREVIEW-METADATA-AUDIT-20260802.md` and
`LINK-PREVIEW-VALIDATION-MATRIX-20260802.json`. Generating candidates does not touch the
frozen package; implementing does.

## TIER 2 — generation only if a decision goes that way

**Homepage `#ritual` — Family D, three images.** The three current scenes
(`scene_after_dinner.jpg`, `scene_afternoon.jpg`, `scene_tea_night.jpg`) exist and resolve;
they are simply wrong for the brand. Between the older candidate set and the newer rounds
there are already well over twenty alternatives.

Generation is required **only** if Nate selects Family D — asymmetric editorial, off-frame
crops, vertical tension, layered depth — which has never been rendered and exists only as a
schematic. Every other choice is a selection, not a render.

## TIER 3 — not generation, do not queue these as image work

| Item | What it actually is |
|---|---|
| Homepage `#carob` mobile | Crop/recomposition of an existing approved asset |
| Our Story gallery | Crop and hierarchy review, existing photos only |
| Carob Story gallery | Crop and hierarchy review, existing photos only |
| FAQ hero decoration | Code fix — a nonportable generated-file reference in source |
| Homepage `#carob` desktop | **Code fix** — 28px grid misalignment, one CSS declaration |

## TIER 4 — blocked, and generation is forbidden, not merely unscheduled

| Item | Blocker |
|---|---|
| Founder/makers hero and hands | Files exist and resolve. Blocked on identity/permission, not absence. Never generate a founder. |
| Packaging, wrappers, labels, logos | Never fabricated. Unwrapped product only. |
| ~~Raw product~~ **SUPERSEDED 3 Aug** | Nate's ruling: raw unwrapped carob product **may be generated** — out of packaging it reads as carob chocolate the way a pod reads as a pod. Do not mask/cut-out flat shots into scenes. **The crescent moon is a designed proprietary form** — specific taper, inner curve, matte deep reddish-brown — so match reference geometry exactly; it is not forgiving the way a natural pod is. |
| **Provenance correction, 3 Aug** | An earlier version of this file called `UFC/spins/maplemoon_bites_moodboard_export_20260516/output_PNG/` a real photoshoot. **It is not.** Its own `SPIN_BRIEF.md` describes the PSB layers as AI source images and lists real-photo retouching as a separate future SPIN; `SESSION_CHECKPOINT.md` calls them AI-generated moodboard tiles. Those 79 files are **form reference only** — never exact product identity or client photography. The verified real product photograph is `UFC/clients/maplemoon/deliverables/hero_raws_ORIGINAL_wetransfer_20260603/Heros-24.jpg` (`6b0373e4…`, 4000×6000, genuine naked Moon pieces). |
| Stockists map/geography | No map asset referenced at all. Needs directory strategy first; must not imply coverage that doesn't exist. |
| Shop/product beyond current | Deferred entirely until after CR-4. |

## Recommended prep order

1. **OG image candidates.** The only gap that will be visible to Carli and Dylan, and it sits
   on the critical path because CR-4 is a link share. Prep candidates now, implement later.
2. **Ritual decision.** Not generation — Nate selecting from an existing set. Only Family D
   triggers a render.
3. **Everything else waits**, and roughly half of it is code or permission, not imagery.

## Note on scope

This covers the six-page review package. A future Shopify OS2 catalogue may need additional
product angles and lifestyle imagery, but that is post-CR-4 and outside this analysis; the
roadmap parks all SH work behind the send.
