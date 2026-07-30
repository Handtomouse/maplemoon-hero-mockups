# Suggested component map

Names are illustrative. Reuse existing repository names where they already exist.

```text
ShopPage
├── GlobalHeader                       [reuse]
├── ShopHero
│   ├── Eyebrow
│   ├── Heading + intro
│   └── RangeIllustration              [approved asset/decorative]
├── CatalogueToolbar
│   ├── FlavourFilter
│   ├── SortSelect
│   └── ViewToggle
├── CategoryNav
├── CatalogueContent
│   ├── MajorCategorySection
│   │   └── ProductCard[]              [reuse/extend]
│   └── CompactCategoryGrid
│       └── CompactCategoryModule[]
├── BrandProofStrip                    [reuse if available]
├── ShopSupportBand
│   ├── ProductHelpCTA
│   └── WholesaleCTA
└── GlobalFooter                       [reuse]
```

## Data responsibilities

### ShopPage / loader

- Fetch or receive the catalogue once.
- Normalise products, variants, taxonomy, flavour metadata and availability.
- Validate query state.
- Pass grouped, filtered and sorted data downward.

### CatalogueToolbar

- Purely controls catalogue state.
- Does not fetch its own products.
- Uses URL-backed state and accessible labels.

### CategoryNav

- Receives only valid categories with product counts.
- Handles selected state or active section observation.
- Does not duplicate filtering rules.

### ProductCard

- Receives a normalised product view model.
- Delegates cart mutation to existing cart hooks/actions.
- Handles pending, unavailable and error states visibly.

### MajorCategorySection

- Receives a category and its product slice.
- Owns section heading, descriptor, anchor and View all treatment.
- Does not transform raw storefront responses.

### CompactCategoryModule

Support variants such as:

```ts
type CompactModuleLayout = 'stacked-list' | 'feature-card' | 'mini-grid';
```

Choose layout from approved category configuration, not product-title string checks.

## Suggested state shape

```ts
type ShopView = 'grid' | 'list';

type ShopState = {
  category: string | 'all';
  flavours: string[];
  sort: string;
  view: ShopView;
};
```

Prefer repository-supported schema validation for incoming query parameters.
