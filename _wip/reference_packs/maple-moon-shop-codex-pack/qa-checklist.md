# QA checklist

## Data and commerce

- [ ] Products, prices, variants and availability come from the live data layer.
- [ ] Currency formatting follows the current storefront locale.
- [ ] Add-to-cart updates the canonical cart and cart count.
- [ ] Products requiring variant choice do not add an arbitrary variant.
- [ ] Sold-out and unavailable products cannot be added.
- [ ] PDP links remain correct.

## Filters and navigation

- [ ] Category selection is consistent: filter model or section-navigation model, never both.
- [ ] Flavour filters can be selected, combined if supported and cleared.
- [ ] Sort values match supported backend/client semantics.
- [ ] Query parameters restore after reload.
- [ ] Browser back/forward restores state.
- [ ] Invalid query values fail safely to defaults.
- [ ] Sticky category navigation does not cover section headings.

## Accessibility

- [ ] One H1 and logical heading order.
- [ ] Swatches have readable flavour names.
- [ ] Grid/list controls expose pressed state.
- [ ] All controls work by keyboard.
- [ ] Focus remains visible.
- [ ] Colour is not the only selected-state cue.
- [ ] Product images have appropriate alt text.
- [ ] Add-to-cart loading/success/error is conveyed accessibly.
- [ ] Tap targets meet minimum sizing.

## Responsive

- [ ] 1440px desktop reviewed.
- [ ] 1024px tablet landscape reviewed.
- [ ] 768px tablet portrait reviewed.
- [ ] 390px and 320px mobile reviewed.
- [ ] No horizontal page overflow.
- [ ] Long product names do not break cards.
- [ ] Category pills remain usable on narrow screens.
- [ ] Toolbar controls do not collapse into ambiguous icon-only actions.

## Visual

- [ ] Existing typography and colour tokens are used.
- [ ] Borders and shadows remain subtle.
- [ ] Product image ratios are consistent.
- [ ] Card heights align without clipping content.
- [ ] The first catalogue content appears early enough in the viewport.
- [ ] Trust and CTA bands read as supporting content, not another navigation system.

## Performance and regression

- [ ] No duplicate catalogue requests per category section.
- [ ] Below-fold images lazy-load.
- [ ] Layout shift is minimal during load.
- [ ] Existing analytics events are retained.
- [ ] New interactions use established event conventions.
- [ ] Header, account, currency selector, footer and cart drawer still work.
