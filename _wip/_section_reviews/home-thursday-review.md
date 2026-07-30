# Page Review: Home

## Scope
- Files reviewed: `_wip/homepage_real_1_lead_photo.WIP.html`
- Review basis: source inspection of the Thursday home WIP at desktop and mobile breakpoint rules; no shared WIP HTML edits made.

## Must Fix Before Thursday
- `_wip/homepage_real_1_lead_photo.WIP.html:721,1065-1068`: The enabled `Shop Now` button for priced Bars and Elixirs has no click handler, link, or product destination. It is rendered as an actionable commerce CTA but does nothing. Route it to a confirmed product/range destination or make the action truthfully read as a non-purchasing range action until commerce wiring exists.
- `_wip/homepage_real_1_lead_photo.WIP.html:713-734`: The category selector is placed after the selected product name, description, and CTA. This makes the visitor read a product decision before choosing the range format, and the selector is separated from the product fan by the detail block. Keep the tasting note directly below the fan, but move the format choice closer to the fan or make the relationship clearer before Thursday review.

## Nice To Have
- `_wip/homepage_real_1_lead_photo.WIP.html:726-731,1466-1479`: The five-category selector is complete and tap-sized, but at mobile widths each label is reduced to roughly `.48rem` and several labels are replaced through CSS generated content. The control remains usable, but the visual hierarchy is weak and the labels are hard to scan. Verify at 390px and consider a compact, readable two-row or shorter-label treatment.
- `_wip/homepage_real_1_lead_photo.WIP.html:707-710,736-740`: The selected product description functions as the tasting note below the fan, but there is no explicit `Tasting notes` cue. The copy is concise for Bars and becomes `Product details to follow.` for pending categories. A small consistent cue would make the intended detail relationship clearer without inventing product claims.
- `_wip/homepage_real_1_lead_photo.WIP.html:900-906`: The sampler has a clear confirmed price and useful bar-flavour/range links. On mobile the offer is stacked after the full product tray, so the price and CTAs arrive late in the section. This is reviewable, but the offer may benefit from a tighter mobile commerce cluster.

## Content Blocked
- `_wip/homepage_real_1_lead_photo.WIP.html:960-975,979-984,1075-1084`: Crescents/Moons, Eclipse Bites, and Bananas correctly remain pending with `Pricing to follow`, disabled primary CTA behavior, and `Shop Range` as the secondary route. Do not add prices, product URLs, or purchasable behavior before confirmation.
- `_wip/homepage_real_1_lead_photo.WIP.html:865-870`: Reviews is correctly a static content-pending state: `Real customer quotes are coming soon.` and `Awaiting approved testimonials`. The legacy carousel script exits because no `.qslide` elements exist, so no review rotation is exposed. Keep Reviews pending and do not add testimonials or carousel controls.
- `_wip/homepage_real_1_lead_photo.WIP.html:849-861`: Stockists uses the same `70+` count in the heading and trust strip and links to `stockists.WIP.html`; the visible marquee is explicitly representative and the full list remains a separate WIP page. Final logo set, exact lineup, and destination mapping remain content blockers.

## Do Not Change
- Do not invent prices, testimonials, product URLs, stockist logos, policies, or additional commerce claims.
- Do not make pending categories purchasable or replace `Pricing to follow` with placeholder values.
- Do not replace the recognisable product fan with a range grid or remove the sampler/trust/stockists surfaces from the Thursday review path.
- Do not edit the shared homepage WIP in this worker lane.

## Exact Suggested Edits
- Current state: `pdpAdd` is enabled and labeled `Shop Now` for priced categories, but source inspection finds no event listener or destination for it.
- Proposed state: connect it only to a confirmed commerce destination, or change the priced-category primary action to a truthful working route such as the confirmed shop/range surface until checkout wiring is available.
- Reason: visible CTA state must match actual behavior; a dead enabled button is the main Thursday readiness blocker.
- Current state: format tabs follow the selected detail and CTA.
- Proposed state: retain the fan, then expose the range-detail selector before or immediately alongside the selected detail, while keeping tasting copy below the fan.
- Reason: visitors should be able to choose Bars, Moons, Elixirs, Bites, or Bananas before interpreting the selected product state.

## Verification Run
- HTML parser: passed with `python3 -m html.parser _wip/homepage_real_1_lead_photo.WIP.html`.
- Diff check: passed with `git diff --check -- _wip/homepage_real_1_lead_photo.WIP.html`; no homepage WIP changes were made by this review.
- Desktop: source/CSS review at the 1440px ruleset; hierarchy and CTA wiring findings recorded. Browser screenshot not run in this worker lane.
- Mobile: source/CSS review at the 390px ruleset; no overflow claim made without a browser render. Selector label scale and stacked sampler offer are flagged for visual QA.

## Residual Risk
- The homepage is not Thursday-ready for a commerce walkthrough until the priced-category `Shop Now` action is either wired to a confirmed destination or truthfully downgraded.
- Desktop and mobile visual geometry, including fan overlap, exact selector readability, sampler fold position, and stockist marquee behavior, still need coordinator/browser verification after any merge.
- Stockists and sampler content remain WIP/status surfaces; final Shopify mapping and approved stockist assets are not established by this homepage review.
