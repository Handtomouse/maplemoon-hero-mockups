# Codex task — adapt the current Maple Moon shop page

Inspect the repository first. Identify the existing shop route, product-fetching layer, cart implementation, design tokens, global header/footer, product-card component, responsive utilities and analytics conventions.

Then adapt the existing shop page to match the hierarchy, interaction model and visual intent shown in `annotated-reference.png` and `source-reference.png`.

## Non-negotiables

- Do not replace working commerce logic with mock data.
- Do not create a parallel cart, product schema, header or footer.
- Reuse existing Shopify/storefront IDs, variants, availability and pricing.
- Do not invent product copy, categories, flavours or images.
- Preserve accessibility, keyboard navigation, focus states and analytics hooks.
- Preserve existing routes unless a route change is explicitly required by the repository.
- Prefer extending shared components over page-local duplication.

## Target page structure

1. Existing global header with Shop active.
2. Editorial range hero with real heading/copy and a lightweight product-family illustration or existing approved asset.
3. Catalogue utility toolbar:
   - flavour swatches/filter;
   - sort dropdown;
   - grid/list view toggle.
4. Category pill navigation for All products, Bars, Moons, Bananas, Bites & Eclipse, Elixirs, Packs & Gifts and Powder, derived from actual catalogue taxonomy.
5. Full catalogue sections for major ranges, with section heading, descriptor, product cards and View all action.
6. Compact category modules for smaller ranges where appropriate.
7. Existing brand-proof/trust strip.
8. Support and wholesale CTA band.
9. Existing global footer.

## Required behaviour

- Reflect category, flavour, sort and view state in query parameters.
- Restore state on reload and support browser back/forward.
- Category pills must either filter the complete catalogue or scroll to sections. Inspect the current implementation and choose the option that produces the clearest, least disruptive experience; do not mix both models.
- If using anchored sections, update the active category with IntersectionObserver and offset for sticky UI.
- Product cards must use live variant availability and price data.
- Add-to-cart must handle required variant selection, sold-out states, loading, success and failure.
- Sorting must be stable and use supported storefront semantics.
- Flavour controls must have text labels available to screen readers; colour alone cannot carry meaning.
- Grid/list controls must use `aria-pressed` and retain state.
- Use skeletons or the current loading pattern while product data resolves.
- Empty and error states must provide a recovery action.

## Responsive intent

- Desktop: six-column major product grid where space permits; large hero; one-line category navigation; compact supporting modules.
- Tablet: three-column product grid; horizontally scrollable category pills; toolbar wraps cleanly.
- Mobile: two-column cards where content remains legible, otherwise one column; hero illustration reduced or removed; sticky category row; filter/sort controls become a compact drawer or stacked control row; all tap targets at least 44px.

## Delivery

Implement the page, then report:

1. files changed;
2. components reused versus created;
3. data/query changes;
4. accessibility work;
5. tests run and results;
6. any reference detail intentionally not reproduced, with the reason.
