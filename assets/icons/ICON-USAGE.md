# MapleMoon icon system v1

This is the governed website icon family. It is intentionally related to the rounded, one-colour construction of MapleMoon's packaging artwork without turning packaging claim badges into interface controls.

## Source files

- `mm-icons.svg` - shared SVG symbol sprite used by the WIP routes.
- `individual/` - one optimized, named SVG per symbol.
- `manifest.json` - machine-readable inventory and lane ownership.
- `contact-sheet.html` - complete visual review surface.
- `scripts/build-maplemoon-icon-system.mjs` - deterministic source and exporter.

Rebuild with:

```sh
node scripts/build-maplemoon-icon-system.mjs
```

## Construction

- 24 x 24 master grid with an approximately 18 x 18 optical core.
- 1.5 px nominal stroke.
- Round caps and joins.
- Controlled softness and asymmetry, with recognition taking priority.
- Single-colour artwork only. The sprite inherits `currentColor`.

## HTML pattern

```html
<svg class="mm-icon" viewBox="0 0 24 24" aria-hidden="true">
  <use href="/assets/icons/mm-icons.svg#mm-icon-cart"></use>
</svg>
```

Decorative icons use `aria-hidden="true"`. Icon-only interactive controls require a meaningful `aria-label` on the button or link. Do not repeat the accessible name inside the SVG.

## Lanes

### Utility

Use for navigation, cart, search, disclosures, arrows, email, stockists, delivery, payment, warnings and social links. Default size is 24 px; use the supplied small modifiers at 16 or 20 px.

### Product format

Use only for the five range selectors: bars, bananas, Moons, Eclipse bites and elixirs. These are category cues, not packaging illustrations.

### Editorial and process

Use for story/process communication such as pod, roast, blend, result, sun and Moon motifs. These may scale to 32-48 px but keep the same stroke character.

### Claim symbols

Use only as small, labelled companions where a full packaging claim badge would be illegible. The legal/approved wording remains visible beside the symbol. Do not treat a symbol-only cut as a certification mark.

## Colour

- Ink on paper: inherited page ink/navy.
- Cream on colour: inherited cream.
- Never add gradients or multicolour fills inside an icon.
- Do not recolour packaging claim badges or modify claim wording without approval.

## Do not

- Do not use Unicode glyphs or emoji as finished icons.
- Do not paste one-off inline paths into route files when a sprite symbol exists.
- Do not shrink a text-ring packaging badge below 40 px.
- Do not use all 2-, 3- and 4-ingredient claim variants together.
- Do not redraw the packaging badges from memory.
