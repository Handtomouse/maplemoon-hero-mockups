# MapleMoon Claude Handoff - Post Meeting, 23 July 2026

## Read This First

This is a local WIP review project, not a production launch. Do not deploy, publish, commit, push, send client messages, upload assets, change Shopify, DNS, email, prices, product data, stockist data, or shared site infrastructure unless Nate explicitly asks for that exact action.

The checkout is intentionally dirty. Preserve all existing changes. Do not use reset, checkout, broad formatting, cleanup, or overwrite workflows. Treat each page WIP as a separate lane and keep edits scoped to its named file.

## Approval Update - 24 July

Nate has now given `approved apply to wip` for the six current WIP page baselines: Homepage, Shop, Our Story, Carob Story, FAQ, and Stockists.

- Use the named WIP files below as the approved local sources for a Carli/Dylan review package.
- This authorises preparation of a local review from the existing WIP pages. It does not authorise deployment, client sending, Shopify/DNS/email work, asset replacement, or public factual claims.
- No new granular page notes were supplied with the approval. Do not invent another visual edit; capture later notes verbatim and map them to a page before changing source.
- Approval of the page baselines does not clear the founder, photo-selection, pricing, policy, testimonial, stockist-data, social, or platform-input blockers.

## What Exists Now

Primary WIP repo:

`/Users/handtomouse/maplemoon-website`

Meeting hub, currently served locally:

`http://127.0.0.1:8795/_wip/_MEETING_INDEX_20260723.html`

Core working files:

| Area | Current source | State |
| --- | --- | --- |
| Homepage | `_wip/homepage_real_1_lead_photo.WIP.html` | Approved WIP review source |
| Shop | `_wip/shop.WIP.html` | Approved WIP review source |
| Our Story | `_wip/our-story.WIP.html` | Approved WIP review source; founder inputs remain blocked |
| Carob Story | `_wip/carob-story.WIP.html` | Approved WIP review source |
| FAQ | `_wip/faq.WIP.html` | Approved WIP review source; policy inputs remain blocked |
| Stockists | `_wip/stockists.WIP.html` | Approved WIP review source; public store data remains blocked |
| Live meeting state | `_wip/_LIVE_TRACKER_20260723.md` | Current state and blockers |
| Review evidence | `_wip/_REVIEW_PACK_20260723.md` | Review direction, screenshots, QA summary |
| Client walkthrough | `_wip/_CARLI_DYLAN_WALKTHROUGH_20260723.html` | Local meeting walkthrough |
| Client input draft | `_wip/_UNSENT_QUESTIONS_20260723.md` | Draft only; do not send |

The older, separately maintained working-page lane is:

`/Users/handtomouse/Projects/maplemoon/site`

Do not promote WIP changes into that lane without an explicit approval and a source-of-truth check.

## This Week's Established Direction

- The site direction is a Blue Hour hero resolving into a quieter Horizon Wash through the scroll. The homepage must feel ocean, moon, carob branch, and product-led, not like isolated cards stacked together.
- The current homepage uses the actual moonlit ocean as its dominant hero layer; mist is only a lower-horizon transition. The range/Carob boundary has been dissolved rather than presented as a card edge.
- Product and commerce states must stay honest. Bars/elixirs and the six-bar sampler use the existing verified review states. Do not invent pricing, SKUs, availability, or purchase flows for pending formats.
- Carob education must stay factual and restrained: pod rather than bean, Australian-grown carob, naturally caffeine free, slow-roasted and milled with cacao butter, and small batches on the NSW far north coast. Do not add health, medical, allergen, certification, or ingredient claims without a supplied source.
- Stockists is a finder-style WIP, not a live map. No precise pins, proximity, distance, phone, opening hours, addresses, or additional store claims until verified data and permission are supplied.
- Founder imagery, testimonials, public policy text, social links/OG image, stockist data, Shopify collaborator access, and final URL mapping are still client dependencies.

## Today's Page Work

### Homepage

- Corrected the missing ocean/moon issue after meeting review.
- Restored the real moonlit-ocean image to the hero, kept mist transitional, removed inherited range card shadow/radius, and extended the ocean dissolve into the range/Carob join.
- Reported mobile check: no horizontal overflow or console errors.
- Review focus: first viewport, visible moon placement, and the range-to-Carob transition at desktop and mobile.

### Shop

- Refined opening-stage hierarchy and sampler balance: calmer intro, narrower sampler treatment, aligned copy/CTA, and a clearer mobile order of copy, packs, then CTA.
- Static verification passed for breakpoint contracts, rail markup, enquiry links, and pending states.
- Still needs a fresh visual sign-off at desktop and 390px.

### Our Story

- The existing structural pass stays in place; no founder asset was bound.
- Do not fabricate a founder portrait, bios, favourites, or social material.
- The next real dependency is Carli/Dylan selecting an approved founder image (especially #73 if chosen) and providing individual bios/favourites/portrait choices.

### Carob Story

- Approved page-local refinement completed: denser comparison, tighter gap from comparison to pod-to-bar, inactive stages read as available choices, and 18px mobile gutters.
- `html.parser` and `git diff --check` passed for the scoped change.
- Final automated visual capture was blocked by the browser's local-file URL policy, so inspect the open page before making another visual change.

### FAQ

- Completed a scanability/accessibility pass: skip link and main landmark, semantic grouped headings with offsets, active topic states, focus styling, mobile topic-rail feedback, stronger label contrast, and 52px mobile accordion targets.
- Existing Shop, Stockists, and email pathways were linked without changing claims.
- Browser checks at 1440px and 390px reported no horizontal overflow; product topic activation worked.
- A non-visible shipping-content blocker note was added. Do not add visible shipping, returns, or policy wording until Carli/Dylan supply approved text.

### Stockists

- Finder preflight is complete: equal-width desktop results/coverage panels, one-column mobile layout, parsing, clearing, no-result recovery, load-more, preview-marker highlighting, and non-live-map guardrails all remain intact.
- Static checks passed: HTML parse, inline JS parse, and `git diff --check`.
- The next visual check is desktop/mobile finder behavior. The data blocker remains: verified public records and approval for any additional field.

## Photo Work

Two separate local-only review sets exist. Neither is approved website source.

1. Round 01 colour options for images 4, 23, and 55:
   - `/Users/handtomouse/UFC/spins/maplemoon_recovered_round01_20260723/round_01/review/index.html`
   - `/Users/handtomouse/UFC/spins/maplemoon_recovered_round01_20260723/round_01/review/decision_contact_sheet.png`

2. H212 light-blue package:
   - `http://127.0.0.1:3102/UFC/spins/maplemoon_lightblue_h212_grade_20260723/07_review/index.html`
   - 18 candidates previously passed RGB, dimension, hue-band, and protected-pixel checks.
   - H212 is primary; H216 is diagnostic only.
   - #8/#24 edge review and #63/#73 repairs remain explicit holds.

Do not replace a website asset, select a final candidate, upload, or deliver any image until Nate gives an explicit selection instruction.

## Verification Already Reported

The 23 July local review pack reports fresh 390px and 1440px checks across homepage, shop, Our Story, Carob Story, FAQ, and Stockists:

- no horizontal overflow
- one H1 and no heading-level skips
- no missing image alts or broken eager images
- no dead `#` links or console errors
- no visible targets below 44px
- FAQ accordion and Stockists search interaction checks passed
- `python3 -m html.parser` and `git diff --check` passed for the reviewed scope

Treat this as scoped WIP QA, not a production certification. Re-run a focused check after any page edit.

## Client Inputs Still Needed

1. Exact current product range, names, availability, pricing, purchase states, and purchase links for all non-bar formats.
2. Approved testimonials with exact attribution and public-use permission.
3. Approved shipping, returns, allergen, wholesale, and help wording.
4. Verified stockist source data: name, locality, state, type, and approval for every public field; addresses, phones, hours, coordinates, and logos only if specifically approved.
5. Founder photos, bios/favourites, social URLs, and social/OG imagery.
6. Shopify collaborator access, final URL mapping, and separate DNS/cPanel/mailbox inventory before any domain/mail change.

## Feedback Intake Protocol

When Nate supplies Claude's meeting notes:

1. Extract each note verbatim, then classify it as `visual`, `copy/fact`, `content asset`, `commerce/platform`, or `client decision`.
2. Map each visual note to exactly one WIP page file. Do not make shared CSS/nav/footer changes unless Nate explicitly asks and the impact on all six pages is reviewed.
3. For any fact, price, policy, stockist, testimonial, or founder request, record the dependency rather than inventing content.
4. Present the smallest safe change plan and wait for approval before editing a page.
5. After an approved page-local edit, validate that file with `python3 -m html.parser`, `git diff --check`, and a desktop/mobile visual check appropriate to the changed interaction.
6. Update `_wip/_LIVE_TRACKER_20260723.md` only when a material result, blocker, or decision has changed. The previous two-minute monitor has been stopped.

## Hard Do-Not-Do List

- Do not touch Shopify, DNS, email, production hosting, deployment, commits, pushes, or external client channels.
- Do not reset or clean the dirty worktree.
- Do not change shared files, nav/footer markup, assets, or other pages while working a page lane.
- Do not invent product claims, policy terms, testimonials, stockists, founder information, social URLs, or image selection.
- Do not call the stockist map live or imply location precision.
- Do not present local WIP as launched, final, or client-approved.

## Best Starting Point

Read these in order before touching anything:

1. `_wip/_LIVE_TRACKER_20260723.md`
2. This handoff
3. `_wip/_REVIEW_PACK_20260723.md`
4. The specific WIP page named by the incoming meeting note
5. `git status --short` and the exact target hunk

Build the local client review from the approved baseline pages and make the still-required inputs visible. For any later page change, return a compact note-to-file mapping and the smallest page-local plan before editing.
