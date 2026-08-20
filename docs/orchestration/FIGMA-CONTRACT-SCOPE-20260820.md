# MapleMoon bounded Figma implementation contract — 2026-08-20

## Authority and boundary

This contract consumes the one source pinned in `docs/orchestration/AUTHORITATIVE-SOURCE-PIN-20260820.md`: the hash-pinned seven-page deployed `_wip` set at commit `9bbd9d6899cfcebbd5a32b96bf9d6c3a7c7818ac`.

The deliverable is one bounded design-by-exception Figma file. It is not a full responsive reconstruction, a new source of runtime truth, a Shopify theme, or permission to change content, claims, imagery, routes or settled exceptions. Code remains responsive/runtime truth. Figma records visual decisions, component contracts, route parity references and unresolved implementation comparisons.

## Exact deliverable count

- **24 top-level reference frames**: 14 canonical route frames plus 10 state frames.
- **15 component sets**, matching the current in-repo component contracts.
- **75 named source variables** grouped into 11 token categories; no invented palette, spacing scale or motion system.
- Suggested Figma pages: `00 Read Me`, `01 Foundations`, `02 Components`, `03 Canonical Routes`, `04 Commerce + System States`, `05 Etheryx Annotations`, `99 Decision Log`.

## Foundations to build

Create the variable/style layer from `docs/design-system/contracts/tokens.v1.json` and preserve every CSS name as its code alias. The 75 variables are grouped exactly as observed: color 27, font 2, type 10, geometry 3, spacing 7, radius 8, border 1, focus 2, shadow 2, motion 12 and layer 1.

- Colours: use the 27 exact source-resolved values, including the paper/editorial/night roles. Do not substitute the held Styles Kit navy/blue/ivory palette.
- Typography: use the exact serif and sans stacks as annotations; Mackinac/Neue Haas delivery remains an implementation dependency, so deterministic fallbacks must be visible in the spec.
- Layout: preserve `1180px` container maximum, `28px` desktop gutter, `16px` mobile gutter, `62px` header and `44px` minimum controls.
- Radius, border, focus and shadow: mirror all exact values. Do not collapse route-local shapes into one generic card grammar.
- Motion and layer values: record as inspectable implementation annotations. Static Figma frames do not prove timing, reduced-motion or stacking behaviour.
- Responsive reference widths: canonical desktop `1440px` and mobile `390px`; implementation evidence must still cover the contract widths `320`, `390`, `834` and `1440`.

## Components to build — 15 sets

Build exactly the component sets below, using the names and state lists in `docs/design-system/contracts/components.v1.json`. Route-specific heroes, page sections, claims and media compositions remain local frame content, not universal components.

1. `MM-COMP-SITE-HEADER-01`
2. `MM-COMP-SITE-FOOTER-01`
3. `MM-COMP-SKIP-LINK-01`
4. `MM-COMP-WRAP-01`
5. `MM-COMP-EYEBROW-01`
6. `MM-COMP-BUTTON-01`
7. `MM-COMP-ICON-CONTROL-01`
8. `MM-COMP-FIELD-01`
9. `MM-COMP-DISCLOSURE-01`
10. `MM-COMP-CHIP-RAIL-01`
11. `MM-COMP-PENDING-01` — evidence/review only; never customer-facing in a clean launch frame
12. `MM-COMP-PRODUCT-CARD-SHELL-01`
13. `MM-COMP-SEGMENTED-01`
14. `MM-COMP-SURFACE-CARD-01`
15. `MM-COMP-DISSOLVE-FIELD-01`

Each interactive set must show only states already named by its contract. Include focus-visible and disabled/pending variants where named, while annotating that Figma cannot prove semantics, keyboard access, focus return, loading, cart or search behaviour.

## Canonical route frames — 14

Create desktop and mobile reference frames for each exact deployed route. Each pair preserves the pinned source's content order, hierarchy, route character, image slot geometry and registered exceptions. These frames are parity references, not editable page-builder proposals.

| Pair | Route | Source-specific requirement |
|---|---|---|
| 1 | `/` | Preserve the Editorial Night hero, protected CAROB signature, route-specific dissolves and established hero/content density. |
| 2 | `/shop` | Preserve the exact catalogue hierarchy and source-visible control/section structure; do not infer live prices, variants or product truth from the mock. |
| 3 | `/our-story` | Preserve chapter rhythm, founder treatment, stacked crop/dissolve behaviour and the settled 4:5 founder bio slots. |
| 4 | `/carob-story` | Preserve the educational route structure, comparison flow and the registered Carob header and seam exceptions. |
| 5 | `/stockists` | Preserve finder/list-first hierarchy and illustrative imagery; do not invent retailer, map or distance capability. |
| 6 | `/faq` | Preserve search, category, disclosure and support hierarchy. This is the route without content imagery. |
| 7 | `/contact` | Match the deployed Contact page exactly as a visual frame. Annotate the unresolved Shopify route authority; do not use the frame to overrule the contract's current `mailto:` destination record. |

## Commerce and system-state frames — 10

Create desktop and mobile frames for each state below. These are integration-contract surfaces, not new page redesigns.

1. **Collection**: Shopify collection result state using the MapleMoon Shop hierarchy and product-card contract. Keep it distinct from the canonical deployed `/shop` frame.
2. **PDP**: media, product information/options, primary action, validation/availability and recommendations slots. All product data and claims are placeholders bound to real Shopify fields, never fabricated copy.
3. **Search**: search overlay/result state with populated, no-results, loading and error annotations. One pair may use adjacent component variants rather than multiplying top-level frames.
4. **Bag**: drawer state with empty, populated, updating and error annotations. Use “Bag” in the visual label while mapping to Etheryx cart primitives; checkout capability remains Shopify-owned.
5. **Image-free**: the load-bearing no-approved-imagery state, desktop and mobile. It must demonstrate the same layout with every governed image slot unavailable.

### Image-free contract

- Preserve each slot's geometry, reading order and surrounding spacing so approval of imagery does not trigger a layout redesign.
- Use only existing surface/line tokens (`--mm-color-card`, the route's paper/editorial/night surface, `--mm-color-line-soft` or their exact dark-context counterparts). No stock photography, generated packaging, blurred asset, silhouette, gradient illustration or fake thumbnail.
- Product media uses a neutral product-media field; editorial media uses a quiet route-toned field. Neither exposes internal words such as “pending”, “unapproved” or asset-review IDs to customers.
- Decorative empty slots are hidden from assistive technology; content-image absence gets truthful customer-facing fallback text only when the implementation has approved wording. No invented alt text.
- The `MM-COMP-PENDING-01` component may appear only on the Figma review page to explain evidence status. The canonical and launch-state frames use the clean image-free treatment.
- Every image-bearing component gets a `media=approved | unavailable` property. The two image-free top-level frames are the acceptance specimen for applying that property globally.

## Unresolved comparisons only

Comparison boards may cover only these implementation questions:

| Comparison | What may vary | What is fixed |
|---|---|---|
| Etheryx collection integration | How the pinned Shop introduction/control hierarchy wraps or precedes native `t-collection` results | Shop content order, route character and real catalogue truth |
| PDP composition | Placement of native media, information/options and recommendations within MapleMoon foundations | Etheryx capability, truthful product data and no invented claims |
| Search presentation | Overlay-to-results transition and density at desktop/mobile | Search semantics, states and route tokens |
| Bag presentation | Drawer density and line-item hierarchy | Native cart operations, truthful totals and 44px targets |
| Image-free treatment | Neutral paper versus route-toned field where both use existing exact tokens | Slot geometry, no substitute imagery and no internal review language |

Do not create comparison boards for route content, Home hero concept/density, shared chrome anatomy, protected CAROB sizing, route seam/mask families, Carob header character, founder 4:5 geometry, narrow-width corrections or product/claim decisions. Those are settled by the pinned source and registered exception records.

To reopen a settled item requires all of: a dated Nate-authorised change naming the exact route and exception/contract ID; the old and proposed new values; replacement visual evidence at `320`, `390`, `834` and `1440`; accessibility/runtime impact; new source hashes; an authorised contract update; and passing `contracts-only` plus route conformance. Until that record exists, Figma copies the settled result and offers no alternative.

## Etheryx 1.6.0 annotations

Annotate against the sealed local Etheryx 1.6.0 snapshot at `_wip/recovery/shopify_theme_update_s1b_20260819T112058/after-160142491845` (unpublished theme `160142491845`). An annotation names the target; it does not authorise a Shopify write.

| Figma surface | Etheryx target |
|---|---|
| Global shell | `layout/theme.liquid`: `headerGroup`, `mainContent`, `footerGroup`, `overlayGroup` |
| Header | `sections/header-group.json` → `sections/header.liquid` |
| Footer | `sections/footer-group.json` → `sections/footer.liquid` + `sections/footer-bottom.liquid` |
| Home | `templates/index.json`; map route-local compositions to bounded `ls-*` sections only where anatomy fits, otherwise annotate a future MapleMoon-specific section rather than distorting a generic one |
| Shop/collection | `templates/collection.json` → `sections/t-collection.liquid` → `snippets/c-prod-card.liquid` |
| Our Story | future alternate page template; inspect `templates/page.about.json` and its `ls-hero`, `ls-hero-text`, `ls-multicolumn`, `ls-links` only as available structure, not design authority |
| Carob Story / Stockists | future alternate page templates; start from `templates/page.json`/`sections/t-page.liquid` or bounded custom sections, preserving route-local exceptions |
| FAQ | `templates/page.faq.json` → `sections/p-faq.liquid` |
| Contact | `templates/page.contact.json` → `sections/p-contact.liquid`; route publication remains held |
| PDP | `templates/product.json` → `sections/t-product.liquid`; annotate `.etheryx-product-media`, `.etheryx-product-info`, `.etheryx-product-options`, recommendations |
| Search | `sections/overlay-group.json` → `sections/overlay-search.liquid` → `snippets/c-search.liquid`; results use `templates/search.json` → `sections/t-search.liquid` → `snippets/c-prod-card.liquid` |
| Bag | `sections/overlay-group.json` → `sections/overlay-cart.liquid` → `snippets/c-cart.liquid` |
| Image-free | annotate at every image-setting/product-media boundary; the theme receives an explicit unavailable branch and must not substitute an asset automatically |

Each section annotation must state: exact target file/type, owned data fields, merchant-editable fields, locked visual contract, image authority state, responsive behaviour, accessibility requirement and registered exception ID where applicable.

## Relationship to the 36 conformance findings

Figma authoring depends on **0 of 36** findings being fixed first. The pinned pages, 75 tokens, 15 component contracts and the already wired Home/Shop chrome provide sufficient source evidence.

All **36 can proceed in parallel** with Figma: four routes (Carob Story, FAQ, Our Story and Stockists) each have the same nine implementation findings—one `aria-current`, one shared mount count, deferred shared script, mount presence, four shared CSS imports and route state promotion. These are HTML integration defects, not unresolved visual decisions.

Final port parity sign-off does depend on all 36 being closed and the checker returning exit 0, because only then can the shared-header/footer Figma annotations be compared to one measured implementation across all contracted routes. Contact remains outside this six-route conformance check and requires its separate route-authority decision before Shopify publication.

## Effort

**Estimate: 20–24 hours, or 2.5–3 focused days.** This fits the proposed 16–24 hour / 2–3 day range at its upper end because the contract includes 24 audited frames, the image-free system and exact Etheryx annotations.

| Work | Hours |
|---|---:|
| File structure, 75 variables and foundation specimens | 3–4 |
| 15 component sets and named variants | 5–6 |
| Seven canonical desktop/mobile pairs | 6–7 |
| Five desktop/mobile state pairs, including image-free | 3–4 |
| Etheryx annotations, decision log and parity audit | 3 |
| **Total** | **20–24** |

Stop at this contract. Do not make the Figma file, rebuild all responsive states, change Shopify, or resolve held data/media decisions inside the design file.
