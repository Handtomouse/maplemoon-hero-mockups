# MapleMoon minimum-release dry-run and visual punchlist — 2026-08-16

## Disposition

**DRY-RUN COMPLETE. IMPLEMENTATION HOLD UNTIL NATE RECORDS D01–D06 AND THE OUR STORY MEDIA CHOICE.**

This is a bounded implementation map, not a production approval. It makes no
website, WIP, build, media, Styles Kit, Shopify, Git, Vercel, production or
client-facing change. The current certified private preview remains:

https://maplemoonbuild20260813-m49nihfds-handtomouses-projects.vercel.app

Production remains frozen on immutable token `7vjf2m50b`.

## Fresh current-state proof

The measured browser probe passed 10/10 current route-width cases at 390 and
1440 for Pure, Our Story, FAQ, Stockists and Shop. Every case returned 200,
matched its requested client width, had no root overflow and reported zero
broken images, console errors, page errors, request failures or bad responses.

Important current-state corrections:

- Pure's five related bar images are not blank. All five decode at 800×1200,
  paint at nonzero size and are visibly present at both widths.
- FAQ's popular-question row is an intentional horizontal scroller at 390:
  client width 374, scroll width 645, `overflow-x:auto`. It is not root overflow.
- The current Shop has **22**, not 24, rendered cards: bars 6, moons 6, bites 6,
  elixirs 2, bananas 1, powder 1. Twenty say Add to cart and two say Enquire.
  The older 24-row authority ledger still governs what could exist, but an
  implementation must assert a six-bar outcome, not assume an 18-card deletion.
- Our Story has one working 1400×933 pair hero but zero founder portrait images.
  Two large visible cards say `Founder portrait pending` and
  `Nate selection required` at both widths.
- Stockists visibly says `200+`; its live count says
  `Showing 8 of 204 stockists. 204 total; 7 need client confirmation.` It also
  exposes `WIP directory status`, `source parse`, `Directory preview only` and
  non-collecting review-demo language.
- The current FAQ has drifted away from the approved D05 caffeine boundary: it
  currently asks `Is there any caffeine?` and answers
  `No carob is naturally sweet and we use stimulant free ingredients`.

Rendered evidence is under
`_wip/evidence/minimum_release_dry_run_20260816T203628/screenshots/`.

## Exact recommended decision bundle

No checkbox in R2/R3 is currently a recorded decision. The smallest truthful
bundle remains:

`D01=A; D02=A; D03=B; D04=A; D05=B; D06-PURE=REJECT; D06-SPICED=REJECT`

This line records content/commerce/media choices only when Nate explicitly sends
it back as his decision. It never authorises production movement or client
contact.

## Exact successor architecture

Do not overwrite the six private-review WIPs or the frozen Pure source. D05-B
explicitly requires preserving Carli-requested copy in private review. The
smallest safe implementation is one deterministic release builder that:

1. reads the current six WIPs and the exact pinned Pure source;
2. refuses unexpected source hashes or occurrence counts;
3. applies only the recorded D01–D05 transformations in memory;
4. writes a separate release-candidate directory;
5. proves that source WIPs and Pure source remain byte-identical.

Recommended implementation ownership:

- new `scripts/build-maplemoon-minimum-release.py` — the only content/capability
  mutation source;
- the existing `scripts/build-maplemoon-wip-preview.py` remains the private-review
  builder and must not acquire production policy;
- six inputs remain read-only:
  `_wip/homepage_real_1_lead_photo.WIP.html`, `_wip/shop.WIP.html`,
  `_wip/our-story.WIP.html`, `_wip/carob-story.WIP.html`, `_wip/faq.WIP.html`,
  `_wip/stockists.WIP.html`;
- `/Users/handtomouse/maplemoon_build_20260813/pure-carob-bar.html` remains a
  pinned read-only input;
- shared `mock-cart.js`/`.css` remain untouched and are excluded from the release
  output when no page references them.

If Nate instead wants the WIPs themselves rewritten, that is a different scope
because it would destroy the protected-review copy D05-B says to preserve.

## D01–D06 route/file/selector dry-run

| Decision | Exact current surfaces | Recommended transform and hard acceptance gate |
|---|---|---|
| D01=A — six bars | Home `.wf-range-tabs`, `CAT`, `CAT_STATE`, `CAT_SHOP_TARGET`, rendered range; Shop `.sp-sec`, `.grid[data-cat]`, `CAT`, `PRICED`, toolbar/category state | Release output contains only the six named bars. Home has one Bars category and six reachable bar cards. Shop has one Bars section and six cards. Zero moons/bites/elixirs/bananas/powder cards, category controls or structured-data products. Do not calculate this as “remove 18”: current Shop is 22. |
| D02=A — enquiry only | Every route's header cart: Home `.wf-pcart[data-mm-cart-toggle]`; Shop `.sp-cart[data-cart-toggle]` and `.cart-summary`; Our Story `.os-cart`; Carob Story/FAQ/Stockists `.sp-cart`; Pure `.sp-cart[data-mm-cart-toggle]`. Home/Pure `mock-cart` includes. Shop `[data-add-to-cart]`, inline cart state and subtotal. | Remove header cart controls rather than invent a replacement label. Remove mock-cart references from output. Shop six bar actions use its existing `Enquire` label and mailto pattern. Zero `Add to cart`, checkout, subtotal, cart drawer, local cart storage or fake purchase capability. `Shop`, `Shop Now` and range-browsing links may remain because they navigate rather than transact. |
| D03=B — nonnumeric stockists | Home stockist band/trust figures and any 200+ metadata/JSON-LD; Stockists meta/OG/Twitter, `.sp-head`, `.st-proof-row`, state/count/status UI, UNKNOWN entries and directory script | Keep the existing `Find a stockist` wording. Remove all public `200+`, 204/197/7 counts, parsed/review/confirmation language and seven UNKNOWN entries. Render the 197 location-complete records without publishing a total. Zero `200+`, `204 total`, `need client confirmation`, `source parse`, `WIP`, `review` and `preview only` in customer-reachable text, metadata or JSON-LD. |
| D04=A — remove collection forms | Home newsletter `<form>` and demo note; Stockists `.st-news`, `.st-form`, disabled `Coming soon` button and demo notes | Remove both collection-form blocks. Preserve direct existing mailto contact/wholesale links. Zero `<form>` in release pages unless a later endpoint/privacy packet explicitly admits one; zero newsletter/demo/coming-soon collection language. |
| D05=B — bounded claims | All seven route files, visible copy first and then exact metadata/OG/Twitter/JSON-LD mirrors. Use the occurrence table in `MAPLEMOON-NATE-DECISION-GATE-R2-20260814T184422.md`, not broad search-and-replace. | Restore exactly one approved FAQ question and answer from R3. Keep only bounded pod/not-bean and Australian-grown carob statements. Remove whole unsupported sentences/blocks rather than authoring substitute client copy. Zero finished-product caffeine, diet, sugar, health, performance, formulation, manufacture, storage or ungoverned origin claims. CV-014/051/062 remain unmapped and create no edit authority. |
| D06 Pure/Spiced=REJECT | Shop `elixir_plain` and `elixir_spiced` bindings; the two held v4 review inputs | No media or slot change. Current private-preview elixir bindings stay as evidence only and disappear from the six-bar release under D01=A. Assert the two v4 hashes are absent from release output and all source media hashes remain unchanged. |

### Exact approved FAQ boundary for D05-B

The release output must contain exactly once:

> Does carob contain caffeine?  
> Carob itself is naturally caffeine-free. Its mellow, naturally sweet flavour works beautifully in bars, baking and warm drinks. Maple Moon recipes vary, so please check the individual product label for the full ingredient list.

That wording supports carob itself only. It does not approve any finished-product
claim. The current FAQ regression must therefore be corrected in the derived
release output while the private WIP remains unchanged.

## Route coverage after the transform

| Route | Decision surfaces | Separate held dependency |
|---|---|---|
| Homepage | D01 range, D02 cart, D03 stockist counts, D04 form, D05 claims and mirrors | Home remains the visual-system exception; no blanket v0.4 implementation. |
| Shop | D01 six bars, D02 enquiry actions/cart removal, D05 item facts and mirrors, D06 no change | Real Woo/Shopify price, variants, inventory and checkout stay blocked. |
| Our Story | D02 header cart, D05 visible/structured health and performance claims | Pair-hero/portrait media is a separate exact-slot packet. |
| Carob Story | D02 header cart, D05 bounded pod/not-bean/Australian-grown surface | Existing crop/fog/media stays untouched. |
| FAQ | D02 header cart, D05 exact caffeine restoration and removal of unproved answers | No invented replacement answers. Direct support mailto stays. |
| Stockists | D02 header cart, D03 nonnumeric public directory, D04 form, D05 trade claim | Source owner/cadence still needed for any future numeric claim. |
| Pure Carob Bar | D02 header cart/mock cart, D05 diet/formulation/size/price claims | Existing five related bar images pass; no image repair or swap is needed. |

## Visual punchlist

### Release blockers

1. **Our Story founder portraits:** two large empty-looking placeholders are
   customer-visible at 390 and 1440. This is missing approved media, not a CSS
   failure. Do not tune the layout around placeholders. A separate packet needs
   exact Carli and Dylan 4:5 source/output hashes, slot approval and the existing
   real-CSS crop guard before replacing them.
2. **Stockists internal state:** client-confirmation, parsed-count and review-demo
   language is visibly exposed. D03-B/D04-A must remove it from the release fork.
3. **Catalogue/commerce mismatch:** current Shop visibly presents 22 products,
   20 Add-to-cart actions and two enquiries. D01-A/D02-A must prove exactly six
   enquiry-only bars.
4. **FAQ authority regression:** current wording is not the exact approved D05
   question/answer. Restore only the pinned R3 text.
5. **Claims:** fresh static scan found authority-sensitive surfaces on all seven
   routes (line-level evidence in `static-scope-scan.json`). No broad replacement
   copy should be improvised.

### Not defects / no work

- Pure related-bar imagery is decoded, painted and visually coherent at both
  widths; no image or CSS repair is scoped.
- FAQ mobile popular chips deliberately scroll horizontally with no root overflow;
  no wrap or shrink fix is scoped.
- Shop's header/sampler composition is visually stable at both widths. Its release
  change is catalogue/commerce truth, not a redesign.
- v0.4 remains planning guidance only. This packet opens no button, header, fog,
  overlay, spacing or typography implementation.

## Implementation estimate after choices

Planning envelope, not a quote:

- deterministic release builder plus pin/occurrence controls: 2–3 h;
- D01/D02 catalogue and enquiry-only transform: 3–5 h;
- D03/D04 Stockists and form removal: 2–3 h;
- D05 exact occurrence work after the policy is recorded: 4–7 h;
- integrated local and preview certification: 4–6 h.

Total: **15–24 technical hours** before Our Story media, product-image swaps,
Shopify implementation or production movement. Exact customer-facing replacement
copy beyond the approved FAQ sentence is deliberately not included.

## Required successor verification

1. Re-pin all seven inputs and the decision receipt before write.
2. Positive and negative controls for every transformation; exact occurrence
   counts, no loose global replacement.
3. Seven routes at 390/900/1440, native 200%, keyboard, focus, reduced motion,
   closed/open mobile menu and zero root/internal overflow.
4. Six bars exactly; six enquiry mailtos; zero cart/checkout/subtotal/storage,
   zero collection forms and zero held stockist/internal-state language.
5. Exact FAQ question/answer once each; old current wording absent; unsupported
   claim list absent from visible copy and mirrored metadata/JSON-LD.
6. All images 200/nonblank/natural size; two bogus routes 404 and distinct.
7. Source WIPs, Pure source, media, Styles Kit and shared cart bytes unchanged.
8. New preview only, authenticated byte equality, anonymous-protection result,
   and immutable production before/after comparison.

## Exactly one next action

Nate records the seven minimum-release values and chooses the Our Story media
direction. BOSS can then issue one checkpointed release-builder packet without
guessing copy, touching held media or changing the private-review source.
