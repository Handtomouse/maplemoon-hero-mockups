# VIS-02B1 — Compact range variants

Date: 2026-07-31  
Scope: MapleMoon Saturday derived Shop review package only

## Purpose

Create two local, query-gated visual variants for comparing the compact Elixirs, Bananas and Carob Powder range treatment. The default derived Shop route is unchanged unless a reviewer adds a query parameter.

## Variants

- Variant A: `?compact-variant=a&compact-focus=1#elixirs`
  - Enlarged image columns while preserving the compact horizontal shelf treatment.
  - Elixirs remains a stacked list; Bananas and Powder remain compact feature cards.
  - Recommended starting direction because it keeps the strongest compact-band hierarchy.
- Variant B: `?compact-variant=b&compact-focus=1#elixirs`
  - Elixirs remains a compact list.
  - Bananas and Powder become larger image-led feature panels for a stronger product-object read.
  - Use as the comparison reference if the product imagery needs more visual authority.

Comparison route:

`docs/client-review/2026-08-01-saturday-review/prototypes/shop-compact-range-comparison-v1.html`

## Safety and boundaries

- Query flags are local review controls only; no production or Shopify integration was added.
- Canonical `_wip/shop.WIP.html` is unchanged.
- Catalogue data, prices, cart logic, fake checkout, form confirmation and no-network safety controls were not changed.
- No assets were generated, transmitted or published.

## Verification

- `npm run review:saturday:check` — PASS.
- `npm run review:saturday:cart` — PASS.
- `git diff --check` — PASS.
- In-app browser visual pass at 1280px: both variants load in the comparison page; focus mode shows only the compact range; no horizontal overflow observed.

