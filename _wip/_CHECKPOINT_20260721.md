# CHECKPOINT - MapleMoon WIP continuation - 2026-07-21

## Scope
- Continue home, shop and about WIP pages toward Thursday review without promoting or deploying.
- Preserve existing dirty WIP work and avoid Carob Story, FAQ, Shopify, email and DNS scope.
- Keep stockists wiring tracked only.

## Done
- Reviewed the Jul 20 checkpoint, section tracker and handoff before editing.
- Ran a file-first review pass across `homepage_real_1_lead_photo.WIP.html`, `shop.WIP.html` and `our-story.WIP.html`.
- Tightened the homepage story teaser copy to match the handoff-normalized wording: `a simple need, a truly delicious treat` instead of the colon variant.
- Fixed a shop-page desktop overflow caused by the decorative moonwash layer so the review page no longer exposes a horizontal scrollbar.
- Confirmed home, shop and our-story nav/footer stockists links remain pointed at `stockists.WIP.html`.
- Added parallel lane review artifacts and coordinator triage in `_wip/_section_reviews/`, with home, shop, our-story and support findings consolidated into `coordinator-triage-20260721.md`.
- Shop WIP: removed pending-category numeric placeholder prices for moons, bites and bananas from source data, and added a mobile rule so pending price/CTA rows stack inside cards.
- Our Story WIP: corrected the founders image alt text from carob banana to carob pod.
- Homepage WIP: wired the priced `Shop Now` button to WIP-local shop anchors and made mobile range selector labels more readable.
- Homepage WIP: hid the review-only `MOTION: ON` control while preserving the existing motion toggle element for script safety.

## Current blockers
- Real testimonials still pending from Carli and Dylan.
- Moons, bites and bananas pricing still pending.
- Founder photos, social URLs, OG image, stockist logo assets and Shopify collaborator access still pending.
- Carob Story and FAQ remain outside this home/shop/about pass.

## Verification - 2026-07-21
- `python3 -m html.parser` passed for `homepage_real_1_lead_photo.WIP.html`, `shop.WIP.html`, `our-story.WIP.html`, `_SECTION_TRACKER.html` and this checkpoint.
- `git diff --check` passed for the edited home/shop/about WIP files, `_SECTION_TRACKER.html` and this checkpoint.
- Local preview served home, shop and our-story with HTTP 200 responses on `127.0.0.1:3005`.
- Chrome desktop smoke pass checked home, shop and our-story for empty `href="#"` links, missing image alt attributes and horizontal overflow. Home, shop and our-story passed after the shop moonwash overflow fix.
- Chrome screenshot captured from the active browser session: `/var/folders/h1/6pq8gbd149g65vh46kpwc1vh0000gn/T/chrome-devtools-mcp-BOQb9L/screenshot.png`.

## Verification - 2026-07-21 continuation
- `python3 -m html.parser` passed for `homepage_real_1_lead_photo.WIP.html`, `shop.WIP.html` and `our-story.WIP.html` after continuation edits.
- `git diff --check` passed for the edited home/shop/about WIP files and `coordinator-triage-20260721.md`.
- Source audit confirmed `$4.50`, `$6.50` and `$8.50` pending-category placeholders are no longer present in `shop.WIP.html`.
- Chrome local preview on `127.0.0.1:8765` confirmed homepage `Shop Now` routes to `shop.WIP.html#bars`; `Shop Range` points to the matching WIP shop anchor.
- Mobile row wrapping is CSS/source verified through the `max-width:560px` rule. The narrow Chrome window evaluation did not return reliable output, so a fresh 390px screenshot pass remains recommended before promotion.

## Verification - 2026-07-21 mobile polish continuation
- `python3 -m html.parser` passed for `homepage_real_1_lead_photo.WIP.html`, `shop.WIP.html`, `our-story.WIP.html`, `stockists.WIP.html` and this checkpoint after the hidden motion-control polish edit.
- `git diff --check` passed for home, shop, our-story, stockists and this checkpoint.
- Source link sanity pass confirmed home/shop/about nav and CTAs remain WIP-local where expected, with stockists still pointing to `stockists.WIP.html`.
- 390px homepage screenshot confirmed the fixed `MOTION: ON` control is no longer visible: `/tmp/maplemoon_390_after_home.png`.

## Verification - 2026-07-21 four-page 390px pass
- Captured final 390px screenshots for the Thursday WIP review pages:
  - Home: `/tmp/maplemoon_390_final_home.png`
  - Shop: `/tmp/maplemoon_390_final_shop.png`
  - Our Story: `/tmp/maplemoon_390_final_our_story.png`
  - Stockists: `/tmp/maplemoon_390_final_stockists.png`
- CDP layout measurement at `innerWidth: 390` confirmed `clientWidth: 390`, `scrollWidth: 390` and `overflow: false` for home, shop, our-story and stockists.
- Homepage still contains intentionally wide moving marquee children, but the document itself does not expose horizontal overflow.

## Verification - 2026-07-21 inner-page audit refresh
- Ran `_wip/audit.js` against local preview on port 3005.
- Home, our-story, shop, carob-story, faq and stockists all returned zero console errors, zero bad requests, zero missing image alt attributes, zero sub-44px interactive targets, no heading skips and no horizontal overflow at 375px, 390px or 430px.
- No page edits were needed from this audit refresh.
