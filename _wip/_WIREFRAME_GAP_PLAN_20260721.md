# MapleMoon wireframe gap plan - 2026-07-21

## Scope and source of truth

- Current implementation target: `/Users/handtomouse/maplemoon-website/_wip`
- Supplied wireframes: `/Users/handtomouse/Projects/maplemoon/wireframes`
- Legacy/reference prototype: `/Users/handtomouse/Projects/maplemoon/site`
- This is a planning artifact only. No page implementation files were edited for this audit.

## Locked decisions

- Compare the full wireframe set, but rank by Thursday review readiness.
- Launch-critical set: Home, Shop, Product, Stockists, Wholesale, FAQ, Search and Cart.
- Current approved copy and current verified/pending commerce state win over wireframe copy.
- Preserve the current Maple Moon visual system. Use wireframes for structure and interaction patterns, not a visual reset.
- Preserve current WIP nav/footer during page work. Borrow only launch-critical route fixes now and plan a later global nav/footer pass.
- Forms stay static/light demo with honest disabled or mailto behavior.
- Unsupported features can be visually prototyped and lightly interactive, but must be clearly Phase 2/data-pending where needed.
- Stockist data should preserve current names and infer only safe fields like state/type where obvious.
- Mobile should derive from current WIP responsive patterns because supplied wireframes are desktop-only.
- Cart is launch-critical for the wireframe match, but remains a wireframe/gap plan only before Shopify.
- Preserve current `$99` free-shipping threshold until confirmed. Do not copy the wireframe `$80`.
- Use `Maple Moon` two-word spelling.
- Start with layout/content structure only, then add existing assets/CSS illustration treatment only where it materially helps.

## Wireframe inventory

- `HERO-NEW.png`, `HERO-BOTTOM.png`, `HERO-BOTTOM-OPTION2.png`
- `ALL -PRODUCTs.png`
- `PRODUCT-PAGE.png`, `PRODUCT-op.png`
- `STOCKISTS.png`
- `WHOLESALe.png`
- `FAQS.png`
- `SEARCH.png`
- `CART.png`
- `ABOUT.png`, `OUR STORUY.png`, `WHAT IS CAROB.png`
- `PACKS.png`, `BITES-PAGE.png`, `RITUALS.png`, `JOURNAL.png`, `ARTICLE.png`, `SUBSCRIBE.png`

## Gap matrix

| Page | Wireframe | Current page | Structural gaps | Visual gaps | Content/data risks | Launch risk | Recommended action |
|---|---|---|---|---|---|---|---|
| Home | `HERO-NEW`, `HERO-BOTTOM`, `HERO-BOTTOM-OPTION2` | `_wip/homepage_real_1_lead_photo.WIP.html` | Current homepage already has hero, range selector, carob, ritual, story, stockists, reviews, sampler and trust. Wireframe bottom options show simpler product-first range and utility bands, but most required structure already exists. | Current WIP is richer/darker and approved; wireframe is lighter/minimal. | Do not reintroduce old $80/$60 thresholds or unapproved review/product claims. | Medium | Do not rebuild. Only use wireframe bottom options as later comparison for range clarity if homepage review flags confusion. |
| Shop / all products | `ALL -PRODUCTs.png` | `_wip/shop.WIP.html` | Wireframe has category tiles, left filter rail, sort/view controls, product grid, quiz/help band and full trust/footer. Current shop has hero, sampler, category nav and category grids, but no left filters/sort/view mode. | Wireframe is utility/catalogue dense; current WIP is editorial. | Product counts, reviews, prices and some product categories are unverified or intentionally pending. | High | Add a lightweight catalogue-control layer only if time remains after stockists/search: category/search/sort UI with honest pending states, no fake reviews/counts. |
| Product detail | `PRODUCT-PAGE`, `PRODUCT-op` | Homepage PDP block plus legacy `/Projects/maplemoon/site/product*.html`; no current `_wip` PDP page | Wireframe has gallery, reviews, flavour/size/quantity, trust icons, accordions, cross-sell and review summary. Current WIP has homepage PDP block only; static PDP pages are outside current WIP. | Wireframe is commerce-first; current WIP is homepage embedded. | Prices/availability/reviews and Shopify cart are not fully confirmed. | High | Plan only for Thursday. Do not build a fake PDP unless explicitly scoped. Preserve homepage two-click path and note PDP as Shopify-port/Phase 2. |
| Stockists | `STOCKISTS.png` | `_wip/stockists.WIP.html`; legacy `/Projects/maplemoon/site/stockists.html` | Wireframe has search, use-location, state tabs, popular areas, store filters, result cards, map panel, shop-online card, wholesale card, trust/footer. Current WIP has hero, full list, wholesale CTA and newsletter, but no search/filter/map-style interaction. Legacy page has state pills/search/map pattern with fake demo data. | Wireframe has local-map utility feel; current WIP is list-heavy editorial. | No verified addresses, phone numbers, hours, distances or coordinates. Current list names must be preserved. | Critical | First implementation target. Add search, state/type filters, popular chips, result count, visual map panel, shop-online and wholesale cards. Omit real distance/open-in-maps/call-store unless data exists. |
| Wholesale | `WHOLESALe.png` | No current `_wip/wholesale.WIP.html`; legacy `/Projects/maplemoon/site/wholesale.html` | Wireframe has hero, benefits strip, range preview, why-stock list, application form, stockist-map CTA, wholesale family band, newsletter and trust/footer. Current WIP only links wholesale intent from stockists via mailto. | Wireframe is a full trade landing page; current WIP lacks surface. | Wholesale pricing, minimums, catalogue download and backend form are not confirmed. | High | Treat as linked support flow from Stockists. Add stronger stockist CTA now; create full WIP wholesale page only after stockists unless time allows. Use mailto/static form, no backend promises. |
| FAQ | `FAQS.png` | `_wip/faq.WIP.html` | Wireframe has search, topic tabs, side category nav, grouped accordion sections and support CTAs. Current WIP has a simpler FAQ list and contact CTA. | Wireframe is denser help-center structure; current WIP is editorial/simple. | Some shipping/returns numbers remain confirmation-sensitive. | Medium-high | Add FAQ search/topic grouping after stockists/search if time allows. Preserve current copy and `$99` state, flag conflicting wireframe categories like account/subscription as Phase 2. |
| Search | `SEARCH.png` | No current `_wip/search.WIP.html`; legacy `/Projects/maplemoon/site/search.html` | Wireframe has global search input, tabs for Products/Articles/Stockists, result grid, no-results help, recommendations and newsletter/trust. Current WIP has no standalone search page. | Wireframe is clean utility page; current WIP has no equivalent. | Product/review/pricing and stockist address data not complete. | High | Make search launch-critical as a pattern. Reuse a lightweight subset inside Stockists first. Standalone search page can be a phase after stockists if time remains. |
| Cart | `CART.png` | No current WIP cart; Shopify/native cart pending | Wireframe has cart lines, free shipping progress, order summary, discount code, checkout, cross-sell and help cards. Current WIP only has cart icons. | Wireframe is full checkout-adjacent utility. | Cart/checkout/discount/payment behavior belongs to Shopify. | High, but blocked | Plan only. Do not build a fake cart before Shopify or explicit scope. Keep cart icon nonfunctional/placeholder in WIP. |
| Our Story | `ABOUT.png`, `OUR STORUY.png` | `_wip/our-story.WIP.html` | Wireframes include longer values, mission, timeline, decision criteria, community quotes and stockist CTA. Current WIP has story hero, chapters, quote, craft/place, founders, gallery and CTA. | Current WIP is more photographic/editorial; wireframes are card-based overview pages. | Founder photos and real testimonials still pending. Some wireframe copy may be generic. | Medium | Preserve current WIP. Borrow only if Thursday review asks for more structured values/timeline. Keep founder photo/testimonial blockers visible. |
| What is Carob | `WHAT IS CAROB.png` | `_wip/carob-story.WIP.html` | Wireframe has simple comparison table, benefit strip, ingredient block, FAQ and CTA. Current WIP already has richer pod-to-bar, gallery, comparison, FAQ and CTA. | Wireframe is utilitarian; WIP is richer and more brand-specific. | Farm imagery/permission remains pending; no cacao % drift. | Low-medium | No immediate change. Use wireframe table as fallback if current carob-story feels too editorial for client review. |
| Packs / bundles | `PACKS.png` | No current `_wip` packs page; shop sampler exists | Wireframe has pack tabs, pack cards, build-your-own flow, comparison table, FAQ and subscribe CTA. | No current equivalent except sampler/starter box. | Bundles/gifts/discounts are not fully confirmed. | Medium | Defer. Keep starter box only; do not introduce unconfirmed bundle pricing/discounts. |
| Bites category | `BITES-PAGE.png` | `_wip/shop.WIP.html#bites` | Wireframe has a dedicated category page with filters, product cards, benefits, promise, newsletter and trust/footer. Current shop has Bites/Eclipses as pending category inside shop. | Dedicated category page is cleaner but more surface area. | Bites pricing/availability still pending. | Medium | Defer dedicated page. Keep current Bites pending state until pricing/availability confirmed. |
| Rituals | `RITUALS.png` | Homepage ritual section; legacy `/Projects/maplemoon/site/rituals.html`; no current `_wip` page | Wireframe is a full ritual content hub with filters, journey, bundles, journal links and CTA. | Not represented in current WIP nav except homepage ritual. | Content and bundles are future/editorial. | Low-medium | Audit/rank only. Defer unless client asks for rituals in Thursday review. |
| Journal | `JOURNAL.png` | No current `_wip` journal page; legacy reference exists | Wireframe has featured article, categories, article grid, product strip, pagination, newsletter. | No current WIP equivalent. | Needs real article content and product data. | Low | Defer. Keep nav/footer global pass later. |
| Article | `ARTICLE.png` | No current `_wip` article page; legacy reference exists | Wireframe has article hero, table of contents, sidebars, featured product, newsletter, related products/posts. | No current WIP equivalent. | Needs real article content and product claims. | Low | Defer. |
| Subscribe | `SUBSCRIBE.png` | Homepage newsletter only; no current subscription page | Wireframe has subscription product purchase module, benefits, FAQ and subscription favorites. | No current WIP equivalent. | Subscription discounts/app behavior are unconfirmed. | Medium, blocked | Defer. Do not add subscription claims or discounts now. |

## Prioritized build ladder

1. **Stockists wireframe implementation in `_wip/stockists.WIP.html`**
   - Add search input, state/type filters, popular-area chips and result count.
   - Convert the current stockist names into a small structured data array in page JS.
   - Preserve all current names. Infer state/type only where obvious from existing names/grouping.
   - Add a map-style visual panel with numbered markers tied to visible result rows. No API, no precise geolocation claim.
   - Add shop-online and wholesale CTA cards below map/list.
   - Keep newsletter as disabled/static unless existing behavior says otherwise.

2. **Stockists verification**
   - `python3 -m html.parser _wip/stockists.WIP.html`
   - `git diff --check _wip/stockists.WIP.html`
   - Desktop/mobile smoke for no horizontal overflow, filter/search behavior, keyboard focus, and honest no-results state.

3. **Search pattern extraction**
   - Reuse the stockists search/filter pattern as the first launch-critical search surface.
   - If time allows, create a lightweight `_wip/search.WIP.html` shell using Products/Articles/Stockists tabs, but keep data/demo status explicit.

4. **FAQ enhancement**
   - Add topic filters/search only if it does not disturb verified FAQ content.
   - Preserve current copy and current `$99` shipping state.
   - Do not add account/subscription answers unless sourced.

5. **Wholesale support flow**
   - If stockists is stable, create or plan `_wip/wholesale.WIP.html` from the wireframe.
   - Use mailto/static form only. No catalogue download unless an approved file exists.
   - Link Stockists -> Wholesale as the main trade path.

6. **Shop catalogue controls**
   - Only after stockists/search/FAQ: consider adding filter/sort affordances to `_wip/shop.WIP.html`.
   - Preserve pending states for moons, bites and bananas pricing.
   - Do not copy wireframe reviews/counts/prices.

7. **Cart/PDP planning**
   - Keep as gap plan only until Shopify/native cart path is explicit.
   - Do not implement fake checkout or discount behavior.

8. **Deferred content surfaces**
   - Packs, Rituals, Journal, Article and Subscribe stay ranked but deferred.
   - Revisit after Thursday review or after client confirms content/data.

## Implementation guardrails

- Work only in `_wip/*.WIP.html` and new `_wip` planning notes unless Nate explicitly expands scope.
- Do not edit root/base pages or deploy.
- Do not invent prices, reviews, addresses, phone numbers, distances, hours, discounts, social URLs or product availability.
- Keep current `$99` trust threshold until confirmed.
- Preserve `Maple Moon` two-word spelling.
- Use existing assets/CSS treatment only after the structure is clear.

## Proposed next action

Start with `_wip/stockists.WIP.html`, because it has the highest Thursday-readiness gap and the supplied `STOCKISTS.png` wireframe plus legacy reference page give enough direction to implement safely without external data.
