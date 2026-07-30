# Maple Moon — Shop page Codex pack

This pack translates the supplied shop-page mock-up into an implementation brief for adapting the **existing** Maple Moon storefront.

## Files

- `codex-prompt.md` — paste directly into Codex.
- `implementation-brief.md` — detailed page behaviour, layout and responsive rules.
- `component-map.md` — recommended component boundaries and data responsibilities.
- `qa-checklist.md` — acceptance and regression checklist.
- `annotated-reference.png` — numbered visual reference.
- `source-reference.png` — clean source mock-up.

## Implementation principle

Treat the mock-up as a UX and hierarchy reference, not a literal screenshot reconstruction. Preserve the current stack, Shopify/storefront data model, cart implementation, analytics, routes, design tokens and shared components. Refactor only where the current page cannot support the intended experience cleanly.

## Priority order

1. Make product discovery and add-to-cart faster.
2. Keep categories, sorting, flavours and view mode coherent and URL-addressable.
3. Use real products, variants, availability, prices and imagery.
4. Preserve global header/footer and existing commerce behaviour.
5. Match the calm Maple Moon visual system without hard-coding the screenshot.
