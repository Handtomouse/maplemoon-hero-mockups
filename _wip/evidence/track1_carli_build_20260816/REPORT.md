# MapleMoon Track 1 T1–T5 report

Date: 2026-08-16 AEST  
Preview: `dpl_23YJaFycFuaRidqaFGSpogxaC8EX` at `maplemoonbuild20260813-fsdi7562p-handtomouses-projects.vercel.app`  
Live alias remained: `dpl_G2LER2awaqyFtGRCcTserXbNynct` / `7vjf2m50b`

## T1 — six-route fetch proof

All bytes below were fetched from the authenticated throwaway preview. Each control is `grep -ic carob` on the same response.

| Route | HTTP | Bytes | Control | WIP-only assertion | Result |
|---|---:|---:|---:|---|---|
| `/homepage` | 200 | 188362 | 91 | `Maple Moon customer 01, Sydney` = 1; live = 0 | PASS |
| `/shop` | 200 | 50564 | 24 | all four required positives = 1; all four required negatives = 0 | PASS |
| `/our-story` | 200 | 63842 | 32 | `Founder portrait pending` = 2; live = 0 | PASS |
| `/carob-story` | 200 | 54352 | 55 | `Stimulant free, making it perfect for arvos and slow evenings` = 1; live = 0 | PASS |
| `/faq` | 200 | 31865 | 14 | `despite the name, we dont ADD any extra sugars` = 1; live = 0 | PASS |
| `/stockists` | 200 | 111371 | 8 | `204 parsed · 7 need confirmation` = 1; live = 0 | PASS |

Shop exact controls:

- zero: `hand-moulded`, `nightcap that behaves`, `VIEW RANGE`, `catalogue preview`
- one: `Two layers for a fruit indulgence`, `nightcap with benefits`, `Ayurvedic inspired`, `fudgy inside`

All six fetched preview HTML files are byte-identical (`cmp=0`) to the staged artifact used for browser QA.

## T2 — live-to-preview delta

### Homepage

Copy and composition: replaces the shorter live Home with the expanded system-pilot page. It removes the Eclipses/Bites/View Range navigation, old carob explainer, old three moment lines, inline stockist finder, free-shipping/payment strip and old newsletter prompt. It adds the detailed carob/cacao comparison, three Maple Mooning moments, founder section with pending portraits, 200+ stockist preview, anonymised consent-held reviews, starter-box surface and non-collecting demo newsletter.

References removed: `/assets/hero_shots/hero_poster_wetsand2_loop.webp`; `/assets/hero_videos/gen/finalists/graded_blue/finalist_wetsand2_loop.mp4`; `/assets/mm_wordmark_blk.svg`; `/assets/ritual/ritual_after_dinner.webp`; `/assets/ritual/ritual_afternoon.webp`; `/assets/ritual/ritual_tea_night.webp`; `/design_refinement_20260723.css`; `/mock-cart.css`; `/mock-cart.js`.

References added: `/assets/design-system/mm-base.css`; `/assets/hero_videos/gen/finalists/graded_blue/finalist_wetsand2.mp4`; `/assets/licensed/scene_after_dinner.jpg`; `/assets/licensed/scene_afternoon.jpg`; `/assets/licensed/scene_tea_night.jpg`; `/styles/homepage.css`; canonical `https://maplemoon.com.au/`; JSON-LD logo `https://maplemoon.com.au/assets/social/mm_logo_social.jpg`; OG image `https://maplemoon.com.au/assets/social/og-homepage.jpg`.

Routes/anchors: all internal `.html` links become clean routes; old `View Range`, inline stockist finder and `#top` empty-link bindings disappear; new `Read our story`, full stockist list and logo-to-`#top` bindings appear.

### Shop

Copy and composition: replaces the live summary and old section descriptions, including `Hand-moulded` and `nightcap that behaves`, with Carli's revised catalogue copy. Adds the local subtotal/cart guide, enquiry explanation, revised Bites & Eclipse grouping, `nightcap with benefits`, and changed product-card copy including all four T1 positive strings.

References removed: `/assets/mm_wordmark_blk.svg`; `/mock-cart.css`; `/mock-cart.js`.

References added: JSON-LD logo `https://maplemoon.com.au/assets/mm_logo_icon_blk.svg`; canonical `https://maplemoon.com.au/collections/all`.

Routes/anchors: `.html` routes become clean routes; `#eclipses` and separate Eclipses navigation disappear; `Bites & Eclipse` targets `#bites`.

### Our Story

Copy and composition: replaces the live multi-chapter story (Coastal beginnings, founders, ingredient, source, craft, place, range and studio gallery) with a much smaller founders-first page. The preview introduces `Carli & Dylan`, people and beginning sections, but displays `Founder portrait pending` and `Nate selection required` placeholders.

References removed: `/assets/hero_shots/silhouette_closeup.webp`; both Australian Carob farm hero crops; `/assets/mm_wordmark_blk.svg`; `/assets/our_story/01_founders_hero_v03.webp`; `/assets/our_story/ai_ritual_afternoon.png`; `/assets/our_story/founder_carli.webp`; `/assets/our_story/founder_dylan.webp`; `/assets/our_story/founders_hands.webp`; four studio images; three photo-final images; `/mock-cart.css`; `/mock-cart.js`.

References added: `/assets/our_story/founders_portrait_h212.webp`; canonical `https://maplemoon.com.au/pages/our-story`.

Routes/anchors: `.html` routes become clean routes; the old story/source/craft/place/gallery chapter anchors are removed; the replacement exposes only `#people`, `#beginning` and `#range` plus Shop links.

### What is Carob

Copy and composition: replaces the live “What is Carob, actually?” page, pod gallery and market FAQ with the fact-first orchard hero, carob/cacao comparison, four-step pod-to-bar sequence and range CTA. New copy includes the client-supplied Australian-grown, stimulant-free and cacao-butter claims.

References removed: six `/assets/ai/` images; three brand icon SVGs; `/assets/mm_wordmark_blk.svg`; two older photo-final images; `/mock-cart.css`; `/mock-cart.js`.

References added: `/assets/licensed/carob_farm/australian-carob-0205-mobile.jpg`; `/assets/photo_finals/maplemoon_heros41_brandmatched.webp`; JSON-LD logo and OG image; canonical `https://maplemoon.com.au/pages/carob-story`.

Routes/anchors: only `.html` to clean-route normalisation; route intent is otherwise unchanged.

### FAQ

Copy and composition: visible shell is mostly retained. Inline FAQ data changes the carob source, exact Maple answer spelling, location, cacao-butter explanation, storage, where-to-buy and shipping/returns entries. The footer-level `Shipping & returns` and `Contact` links disappear.

References removed: `/assets/faq_hero_ritual.webp`; `/assets/mm_wordmark_blk.svg`; `/mock-cart.css`; `/mock-cart.js`. No new asset/CSS/JS reference was added.

Routes/anchors: all `.html` routes become clean routes; the two removed footer mailto links disappear.

### Stockists

Copy and composition: adds the authoritative 204 total, seven-confirmation hold, directory-preview labelling, explicit source status and a non-collecting newsletter notice. The heading becomes `Stock maple moon.` on two lines. The live skip-link copy and `#main-content` anchor disappear.

References removed: `/assets/mm_wordmark_blk.svg`; `/mock-cart.css`; `/mock-cart.js`.

References added: JSON-LD logo `https://maplemoon.com.au/assets/social/mm_logo_social.jpg`; OG image `https://maplemoon.com.au/assets/social/og-stockists.jpg`; canonical `https://maplemoon.com.au/pages/stockists`.

Routes/anchors: `.html` routes become clean routes; the skip link is removed; Shop links become clean routes.

### Redirect result

Redirect behaviour is unchanged: both deployments return `302 / -> /homepage`, and every `/*.html` route returns `308` to its clean route. The preview's internal links now target clean routes directly, avoiding those 308 hops.

Exhaustive machine-readable delta: `delta.json`. Raw page diffs: `diffs/*.diff`.

## T3 — rollback proof

The temporary alias was first pointed at preview `dpl_23YJaFycFuaRidqaFGSpogxaC8EX`, then this command was executed:

```sh
vercel alias set maplemoonbuild20260813-7vjf2m50b-handtomouses-projects.vercel.app maplemoon-rollback-proof-20260816-1808.vercel.app
```

Inspection returned `dpl_G2LER2awaqyFtGRCcTserXbNynct`, target `production`, status `Ready`. The equivalent emergency command for Carli's alias is therefore:

```sh
vercel alias set maplemoonbuild20260813-7vjf2m50b-handtomouses-projects.vercel.app maplemoonbuild20260813.vercel.app
```

That Carli-alias command was not run. The temporary proof alias was removed after verification.

## T4 — rendered delta check

The SSO-protected preview cannot be opened by an anonymous isolated Chrome. All six deployed HTML fetches were therefore byte-compared to the staging artifact (`cmp=0` for every route), then that exact artifact was tested in isolated Chrome.

Matrix result: 11/12 PASS. Every case returned 200 at exact 390/1440 width, with zero horizontal overflow, broken images, console errors, page errors, request failures and bad responses.

Interaction results:

- Homepage 390 menu state opens, but the focused paint-order probe fails: primary links remain a horizontal legacy flex row; the Stockists row's centre hit resolves to underlying page content rather than Stockists. Drawer is not certifiable.
- Homepage cart control is visible but clicking it changes no dialog, body state or other observable state. `homepage-cart-no-effect` is a required failure, consistent with `/mock-cart.css` and `/mock-cart.js` disappearing in T2.
- Shop cart passes at both widths: `$0.00 / 0 ITEMS` to `$12.95 / 1 ITEM`, with correct count and aria-label.
- FAQ exact Maple question opens at both widths with the answer visible.
- Our Story visibly replaces the current live photographic story with large empty founder/image placeholders at both widths.

Screenshot roots:

- all twelve: `/Users/handtomouse/maplemoon-website/_wip/evidence/track1_carli_build_20260816/screenshots`
- 390 contact: `screenshots/contact-390.png`
- 1440 contact: `screenshots/contact-1440.png`
- open menu: `screenshots/homepage-390-menu-open.png`
- FAQ open: `screenshots/faq-390-open.png`, `screenshots/faq-1440-open.png`
- Shop cart: `screenshots/shop-390-cart.png`, `screenshots/shop-1440-cart.png`

Raw results: `visual-results.json`; menu paint-order measurement: `menu-probe.json`.

## Recommendation

**HOLD promotion of `dpl_23YJaFycFuaRidqaFGSpogxaC8EX`.** The fetch path is correct, but the candidate has two live interaction defects on Homepage (dead cart and failed mobile Stockists hit target) and a material Our Story design regression to visible placeholders. Stockists also loses its skip link. Correct those in a new preview, then rerun T1–T4 against the replacement deployment.

## T7

Draft only, not sent: `/Users/handtomouse/UFC/ops/send_review/20260816_carli_asks_draft.txt`  
SHA-256: `ba61b07d42e43ac90e7e5c56454cb1b11c37bc61b34f4db672fcd33a441709d9`  
Forbidden checks: em dash 0, en dash 0, `vibe` 0, `->` 0.
