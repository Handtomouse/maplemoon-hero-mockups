# MapleMoon website icon system — handoff

Date: 25 August 2026 (AEST)  
Status: implemented in WIP routes, visually verified, review hold, not deployed

## Outcome

The MapleMoon website now uses one custom, brand-aligned SVG icon system instead of mixed Unicode glyphs, CSS drawings and one-off marks.

- 39 named icons across four lanes: utility, editorial/process, product format and claim symbol.
- Five distinct product-format marks: bars, bananas, moons, eclipse bites and elixirs.
- 39 individual designer-facing SVG exports plus a reusable SVG sprite.
- Seven WIP routes migrated: home, shop, carob story, our story, FAQ, stockists and contact.
- 75 authored icon uses checked against the sprite contract.
- No packaging text-ring badge has been repurposed as a generic interface icon.

## Design decisions

- Base grid: `24 × 24`.
- Primary drawing field: approximately `18 × 18`.
- Stroke: `1.5`, round caps and round joins.
- Colour: `currentColor`; route CSS owns the colour, not the SVG file.
- Utility icons stay quiet and functional.
- Product and process icons carry the organic MapleMoon character.
- Packaging-derived claim symbols remain a separate lane from navigation and controls.

## Source and generated files

- Master/export builder: `scripts/build-maplemoon-icon-system.mjs`
- Reusable sprite: `assets/icons/mm-icons.svg`
- Individual SVGs: `assets/icons/individual/mm-*.svg`
- Manifest: `assets/icons/manifest.json`
- Shared route CSS: `assets/icons/mm-icons.css`
- Contact sheet: `assets/icons/contact-sheet.html`
- Usage and accessibility guide: `assets/icons/ICON-USAGE.md`
- Contract: `docs/design-system/contracts/icons.v1.json`
- Verifier: `scripts/check-maplemoon-icons.mjs`
- Deploy-safe preview builder: `scripts/build-maplemoon-wip-preview.py` now follows CSS asset references so pseudo-element icons are packaged.
- One-time migration receipt: `scripts/apply-maplemoon-icon-system.mjs`
- One-time legacy cleanup receipt: `scripts/cleanup-maplemoon-legacy-icon-css.mjs`

## Migrated WIP routes

- `_wip/homepage_real_1_lead_photo.WIP.html`
- `_wip/shop.WIP.html`
- `_wip/carob-story.WIP.html`
- `_wip/our-story.WIP.html`
- `_wip/faq.WIP.html`
- `_wip/stockists.WIP.html`
- `_wip/contact.WIP.html`

## Recovery

A timestamped, non-overwriting pre-edit copy of all seven route files is in:

`_wip/evidence/icon_session_20260825/recovery/20260825T174116_AEST/`

A separate pre-edit checkpoint for the existing deploy-safe preview builder is in:

`_wip/evidence/icon_session_20260825/recovery/20260825T180500_AEST/`

The icon contract records both the pre-edit and verified post-edit route hashes.

## Verification actually run

### Direct-file contact sheet correction

The first contact sheet depended on an external SVG sprite. That rendered over HTTP but failed when the HTML was opened directly with `file://`, producing blank blue icon discs. The corrected contact sheet embeds all symbols and styles in the HTML itself.

```text
PASS maplemoon-contact-sheet icons=39 inline_symbols=39 local_uses=39
PASS self-contained HTML with no external stylesheet, script or sprite dependency
```

The corrected sheet was visually rendered with all icon drawings visible and the evidence screenshot was replaced at `rendered/icon-contact-sheet-desktop.png`.

### Dedicated icon contract

```text
PASS maplemoon-icons icons=39 individual=39 consumers=7 uses=75
PASS sprite ids, individual SVG structure, currentColor, no embedded raster/text
PASS no one-off inline SVG, raw icon glyphs, _full variants or CSS-drawn process marks on admitted routes
```

That output records the completed icon migration. A later rerun after the contact-sheet-only correction reports `our-story: icon-session hash drifted`, because the WIP route has since changed outside this contact-sheet fix. Its newer state was not overwritten or silently accepted; the direct-file sheet has its own isolated passing check above.

All four icon scripts also pass `node --check` with no syntax output.

### Deploy-safe preview build

```text
BUILD PASS output=/private/tmp/maplemoon-icon-qa-preview files=83 bytes=13032651 pages=7 private_dirs=0 vercel_project_link=0
```

The build contains and serves all four individual SVGs used by CSS pseudo-elements: `mm-arrow-right.svg`, `mm-chevron-right.svg`, `mm-external.svg` and `mm-plus.svg`. Each returned HTTP 200 in the canonical preview. This closes the omission caught during QA when the first preview build copied the shared CSS but not its SVG dependencies.

### Live browser QA

Every route was loaded in the Codex in-app browser at `390 × 844` and `1440 × 900`.

| Route | Source/runtime icon references matched | Horizontal overflow at 390 | Horizontal overflow at 1440 |
|---|---:|---:|---:|
| Home | 40 / 40 | 0 | 0 |
| Shop | 3 / 3 | 0 | 0 |
| Carob story | 8 / 8 | 0 | 0 |
| Our story | 3 / 3 | 0 | 0 |
| FAQ | 22 / 22 | 0 | 0 |
| Stockists | 9 / 9 | 0 | 0 |
| Contact | 1 / 1 | 0 | 0 |

The canonical deploy-safe preview returned no browser-console warnings or errors. The mobile menu was verified open (`aria-expanded="true"`) and closed (`aria-expanded="false"`). A closed FAQ item was opened and its answer panel became visible with `aria-expanded="true"`.

Rendered evidence is in `_wip/evidence/icon_session_20260825/rendered/`, including desktop and mobile views of the product-format selector, comparison section, carob process sequence, FAQ and stockist states.

## Existing design-system gate

`node scripts/check-maplemoon-design-system.mjs --contracts-only` returns:

```text
HOLD contracts-only holds=6
carob-story: frozen baseline hash drifted
faq: frozen baseline hash drifted
home: frozen baseline hash drifted
our-story: frozen baseline hash drifted
shop: frozen baseline hash drifted
stockists: frozen baseline hash drifted
```

This hold is preserved intentionally. The worktree already contained route drift and unrelated active work; those frozen baseline hashes were not silently rebased. The icon-specific contract and verifier are green, but promotion/deploy remains blocked until the main design-system authority reviews and intentionally accepts the current route baselines.

## Next decision

Review the contact sheet and rendered page evidence. If the icon direction is accepted, promote the current route baselines through the normal design-system authority; do not deploy directly from this WIP state.
