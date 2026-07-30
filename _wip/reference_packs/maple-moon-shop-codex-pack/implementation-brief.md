# Maple Moon shop page — implementation brief

## 1. Objective

Turn the current shop page into a structured range browser that feels editorial but behaves like a serious commerce catalogue. The reference improves hierarchy by separating discovery controls, category navigation, major product families, compact secondary ranges, reassurance and conversion support.

The build must remain data-driven. The visual is not permission to hard-code products or reconstruct a detached marketing page.

## 2. Page anatomy

### A. Global header

Reuse the canonical header. The Shop item is active. Currency, account and cart must continue using their existing global logic.

### B. Hero

- Eyebrow: range label.
- H1: “Shop the range.” or the current approved equivalent.
- One concise introductory paragraph.
- Optional right-side line illustration or approved range asset.
- Keep hero height restrained; catalogue controls should remain visible near the first viewport on common laptop screens.

### C. Catalogue utility toolbar

One card containing three distinct groups:

1. **Flavour** — labelled swatches or tokens generated from real metafields/tags.
2. **Sort by** — native or accessible custom select using supported sort keys.
3. **View** — grid/list segmented control.

Do not make swatches decorative. Each needs a name, selected state, keyboard support and a clear reset path.

### D. Category navigation

Recommended order:

- All products
- Bars
- Moons
- Bananas
- Bites & Eclipse
- Elixirs
- Packs & Gifts
- Powder

Taxonomy must be mapped from the existing catalogue. If names differ, use the approved live taxonomy rather than creating duplicate categories.

Pills should be compact, horizontally scrollable at narrow widths and visibly selected. A sticky state below the header is appropriate once the user enters the catalogue.

### E. Major catalogue sections

Bars, Moons and Bites & Eclipse receive full-width sections in the reference. Each section includes:

- H2 category name;
- short descriptor;
- View all action when more products exist than the preview limit;
- product grid;
- stable anchors/IDs if using section navigation.

The preview count should adapt to available width and actual catalogue size. Avoid empty placeholders to force six cards.

### F. Product card

Required data:

- product image with fixed aspect ratio;
- title;
- one short approved descriptor where available;
- size/weight;
- current price and compare-at price where relevant;
- stock/availability state;
- add-to-cart action or variant-selection action.

Behaviour:

- Entire informational area may link to the PDP, but the add button remains a separate control.
- Show loading feedback during cart mutation.
- Disable or relabel sold-out products.
- Do not silently select a variant where meaningful options exist.
- Keep card height visually consistent without clipping names or accessibility text.

### G. Compact secondary modules

Elixirs, Bananas, Carob Powder and Packs & Gifts can use denser modules to prevent the page becoming a wall of identical cards.

- Elixirs may use a short stacked list.
- Single-product ranges can use a horizontal card.
- Packs & Gifts can carry a larger image or bundle metadata.
- All modules need a View all action only when a destination exists.

### H. Trust strip

Four proof points:

- Australian made;
- naturally sweet;
- plant based;
- no refined sugar.

Use existing approved copy and icons. Treat them as non-interactive content unless the current site already links these claims to supporting pages.

### I. Conversion support band

Two equal lanes:

- product discovery/help → Contact or product-matching support;
- retail partnership → Wholesale enquiry.

The actions need distinct destinations and event tracking.

### J. Footer

Reuse the global footer exactly. Do not encode page-specific footer navigation.

## 3. State model and URLs

Recommended query parameters:

```text
/shop?category=bars&flavour=raspberry&sort=featured&view=grid
```

Rules:

- omit default values where practical;
- parse and validate parameters before applying them;
- preserve unrelated query parameters used by analytics or campaigns;
- update without full-page reload where supported;
- browser back/forward must restore the catalogue state;
- deep links must work server-side and client-side.

## 4. Layout specification

Use repository spacing and breakpoint tokens first. Approximate intent:

- max content width: 1200–1320px;
- major container gutters: 24–32px desktop, 16–20px mobile;
- hero split: roughly 60/40;
- catalogue card radius: 14–18px;
- product grid gap: 16–20px;
- major desktop grid: 6 columns;
- tablet grid: 3 columns;
- mobile grid: 2 columns if card width remains at least ~155px; otherwise 1 column.

Keep borders subtle and shadows low. The page should feel pale and calm, not washed out: body copy, prices, labels and controls must still pass contrast requirements.

## 5. Responsive behaviour

### Desktop

- Header and hero remain horizontal.
- Toolbar is one row.
- Category pills form one row where possible.
- Major product sections use 5–6 columns depending on actual container width.
- Compact modules form four columns.

### Tablet

- Hero may remain split but with reduced illustration.
- Toolbar wraps into two rows.
- Category pills become horizontal scroll with visible overflow cue.
- Major grid becomes three columns.
- Compact modules become two columns.

### Mobile

- Hero becomes single-column.
- Search/filter/sort UI prioritises category and sort; flavour filtering may sit in a drawer/sheet.
- Category nav is sticky and scrollable.
- Grid/list toggle remains available only if both views are fully designed.
- Product cards use two columns only if names, prices and controls remain usable.
- CTA and trust modules stack.
- Footer uses existing mobile treatment.

## 6. Accessibility

- Logical heading hierarchy: one H1, category H2s, product names at the appropriate lower level.
- Every control has an accessible name.
- Swatches expose flavour text and selected state.
- Grid/list buttons use `aria-pressed`.
- Sort control uses a real label.
- Sticky controls do not obscure focused content or anchor destinations.
- Add-to-cart feedback is announced via a polite live region where the current cart pattern supports it.
- Product images use meaningful alt text; decorative range illustration uses empty alt text.
- Keyboard order follows visual order.
- Visible focus states use the brand accent and are not removed.

## 7. Performance

- Use responsive product images and current image CDN/transforms.
- Lazy-load below-the-fold images.
- Prioritise only the first visible product row.
- Avoid fetching the same catalogue multiple times for each section.
- Derive grouped sections from one normalised product dataset where practical.
- Keep view/filter state client-side without remounting the global page shell.
- Do not ship a heavy carousel library for static grids.

## 8. Analytics

Retain existing events. Add or map events for:

- category selected;
- flavour selected/cleared;
- sort changed;
- grid/list changed;
- product clicked;
- add-to-cart attempted/succeeded/failed;
- View all clicked;
- support CTA clicked;
- wholesale CTA clicked.

Use the repository’s event naming and payload conventions.

## 9. Empty, loading and error states

- **Loading:** existing skeleton system or stable card skeletons to prevent layout shift.
- **No filtered results:** explain the active filters and offer Clear filters.
- **Catalogue error:** concise message, retry action and preserved navigation.
- **Cart error:** inline feedback near the action; do not rely on a disappearing toast alone.
- **No image:** approved fallback asset, not a blank broken-image box.

## 10. Acceptance criteria

- Page uses live catalogue data and existing cart logic.
- Header/footer remain canonical shared components.
- All filters and view state are keyboard accessible and URL-restorable.
- Major range sections are scannable and do not render fake placeholder products.
- Product cards show correct prices, availability and variant behaviour.
- Layout matches the reference hierarchy at desktop, tablet and mobile widths.
- Contrast, focus and tap-target checks pass.
- No regressions to PDP links, cart count, currency or analytics.
- No horizontal page overflow at supported breakpoints.
