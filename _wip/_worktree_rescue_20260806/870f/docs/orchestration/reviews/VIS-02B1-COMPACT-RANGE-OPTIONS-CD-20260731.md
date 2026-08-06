# VIS-02B1 — Compact range options C/D

Date: 2026-07-31  
Scope: MapleMoon Saturday derived Shop review package only

## New local options

- Variant C: `?compact-variant=c&compact-focus=1#elixirs`
  - Centred image wells for each product card.
  - Keeps the product description, price and review-only action readable beneath the object.
  - Single-product Bananas and Powder modules collapse to their content height instead of inheriting Elixirs' two-item height.
- Variant D: `?compact-variant=d&compact-focus=1#elixirs`
  - A quieter centred gallery tile with larger object wells and shorter copy.
  - Keeps the three secondary ranges visually aligned while giving the product images the strongest authority.

## Powder image

Found the existing generated artisan shot at:

`assets/gemini/artisan/maplemoon_powder_roasted_artisan_20260305.png`

It shows the Powder pouch centred with roasted carob pods around it. For the derived package only, metadata-stripped copies are available as:

- `staging-v1/clean/assets/product_shots/powder_roasted_pile.png`
- `staging-v1/annotated/assets/product_shots/powder_roasted_pile.png`

Variants C and D use this image through a query-gated swap. The default route and existing A/B variants continue using `powder_roasted.webp`.

## Safety and boundaries

- A/B comparison is preserved; C/D are additional local query-gated treatments.
- Canonical `_wip/shop.WIP.html` is unchanged.
- No catalogue data, prices, cart logic, fake checkout, form confirmation or network behavior changed.
- No external asset generation, upload, Shopify, production or client action occurred.

## Verification

- `npm run review:saturday:check` — PASS, 0 failures and 0 warnings.
- `npm run review:saturday:cart` — PASS.
- `git diff --check` — PASS.
- In-app browser visual QA: C and D load at 1280px, focus mode hides the surrounding sections, centred images remain contained, and the Powder pile shot is visible in both.

