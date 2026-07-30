# Page Review: Shop

## Scope
- Files reviewed: `_wip/shop.WIP.html`

## Must Fix Before Thursday
- `_wip/shop.WIP.html:299-320`: Moons, bites, and bananas are rendered as pending through `PRICED`, but their source objects still contain numeric placeholder prices (`$4.50`, `$6.50`, and `$8.50`). Remove those fields or set them to `null` so source truth cannot leak a price through future rendering or inspection.
- `_wip/shop.WIP.html:90-94,324-334`: The pending card row keeps the long `Pricing to follow` button beside the price/status span with no wrapping rule. At a 390px viewport the row is likely wider than the card content; the page-level `overflow-x:hidden` masks the overflow rather than resolving it. Allow the row to stack or wrap and recheck the disabled CTA at 390px.

## Nice To Have
- `_wip/shop.WIP.html:323-334`: Verify the repeated `Vegan`, `GF`, and `No Caffeine` chips against confirmed product-level data before treating them as final labels. They are currently applied to every card, including all pending categories.
- `_wip/shop.WIP.html:243-275`: Keep the category labels and section headings aligned with the approved naming decision for moons, bites/eclipses, and bananas before promotion.

## Content Blocked
- Final prices for moons, bites, and bananas are not confirmed. Their visible state should remain `Pricing to follow` with disabled CTAs.
- Final Shopify product URLs and cart behavior are not present in this WIP. Bars and elixirs should not be treated as production-purchasable solely because their local CTAs say `Add to Cart`.

## Do Not Change
- Do not make moons, bites, or bananas purchasable.
- Do not expose their numeric placeholder prices in visible UI or source data.
- Do not invent final product URLs, prices, claims, or product-level dietary labels.
- Do not edit `_wip/shop.WIP.html` in this review lane; the coordinator owns the shared WIP merge.

## Exact Suggested Edits
- Current state: `PRICED` correctly marks only bars and elixirs as priced, but all five catalog groups still carry `price` fields and pending cards suppress those values at render time.
- Proposed state: keep numeric prices only on bars and elixirs; remove or null the price fields for moons, bites, and bananas. Keep their rendered text and disabled button as `Pricing to follow`.
- Current state: pending cards use one horizontal `.row` for status and CTA, while the page uses `overflow-x:hidden`.
- Proposed state: make the pending row wrap or stack at the mobile breakpoint, keeping the disabled CTA fully visible inside the card.
- Reason: Thursday review should be truthful in source data and legible at the target mobile width, not merely visually masked.

## Verification Run
- HTML parser: passed with `python3 -m html.parser _wip/shop.WIP.html`.
- Product asset audit: passed; every referenced card and sampler `.webp` asset exists under `assets/product_shots/`.
- Diff check: passed for the existing WIP file with `git diff --check -- _wip/shop.WIP.html`.
- Desktop: static CSS review at the 1180px max-width layout; three-column cards and image containers have stable dimensions.
- Mobile: static CSS review at 390px; category wrapping is configured, but the pending CTA row needs a browser check/fix because its content can exceed the card text width.

## Residual Risk
- The WIP has no live commerce integration, so `Add to Cart` is a review-state label rather than verified checkout behavior.
- The SEO block still contains placeholder social-image paths, which is outside this shop review scope.
