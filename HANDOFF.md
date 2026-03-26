# MapleMoon — Shopify Theme Handoff

## What's Here

A complete Shopify 2.0 theme built from 18 hero concept prototypes and 5 product page variations. Every section is self-contained with its own CSS, JS, and schema settings. No external dependencies beyond Google Fonts.

**Preview:** https://maplemoon-website.vercel.app
**Repo:** Handtomouse/maplemoon-website (branch: `paper-shopify-heroes`)

## Quick Install

Copy these folders into your Shopify theme root:

```
sections/          → theme/sections/
snippets/          → theme/snippets/
templates/         → theme/templates/
layout/            → theme/layout/
config/            → theme/config/
```

Then run `shopify theme dev` to preview locally, or push via `shopify theme push`.

## Sections (18 total)

### Core Storefront (8 custom sections)

| Section | File | What it does |
|---------|------|-------------|
| **Hero Evolved** | `section-hero-evolved.liquid` | Full-screen hero with product picker, star ratings, trust badges, dual CTAs. The recommended homepage hero. |
| **Product Main** | `section-product-main.liquid` | Full PDP: image gallery, buy box, variant selector, tabs (Details/Ingredients/Reviews), trust badges, educational callout. AJAX cart wired. |
| **Education Split** | `section-education-split.liquid` | 55/45 split panel. "What is Carob?" educational section with product image + watermark. |
| **Product Grid** | `section-product-grid.liquid` | Collection display. Mobile: horizontal scroll carousel. Desktop: responsive 3-column grid with hover effects. |
| **FAQ Accordion** | `section-faq-accordion.liquid` | Native `<details>/<summary>` accordion. Zero JS for open/close. 10 preset Q&As included. |
| **Testimonials** | `section-testimonials.liquid` | Star ratings + quotes. Mobile carousel, desktop auto-fit grid. |
| **Header/Nav** | `section-header.liquid` | Mobile: hamburger + full-screen overlay. Desktop: glassmorphism fixed bar. Cart icon with AJAX count badge. |
| **Footer** | `section-footer.liquid` | 4-column layout: brand, nav, contact, newsletter. Shopify customer signup form wired with AJAX submit. |

### Supporting Sections (10 scaffolded)

| Section | File | Notes |
|---------|------|-------|
| Cart | `section-cart.liquid` | Line items, quantity update, checkout |
| Collection Main | `section-collection-main.liquid` | Filterable product grid |
| 404 | `section-404.liquid` | On-brand error page |
| Article | `section-article.liquid` | Blog post template |
| Blog | `section-blog.liquid` | Blog listing |
| Search | `section-search.liquid` | Search results |
| Password | `section-password.liquid` | Coming soon page |
| List Collections | `section-list-collections.liquid` | Collection directory |
| Main Page | `main-page.liquid` | Generic page content |
| Trust Badges | `snippets/trust-badges.liquid` | Reusable badge row snippet |

## Shopify Wiring Status

### Fully Wired (production-ready)

**Product Main** (`section-product-main.liquid`):
- `{% form 'product' %}` with AJAX `/cart/add.js` submit
- Dynamic variant switching: price, image, availability update on select change
- Compare-at price with sale badge + strikethrough
- Low-stock urgency: "Only X left" when inventory <= 5
- Breadcrumb from `product.collections`
- Thumbnails from `product.images` (up to 6)
- Auto-populates Details tab from `product.description`
- Dispatches `cart:updated` CustomEvent for cart drawer integration
- Dual-mode: works with real Shopify product data OR section settings for preview

**Header** (`section-header.liquid`):
- Cart icon with `{{ cart.item_count }}` badge
- Listens for `cart:updated` event, refreshes count via `/cart.js`
- Focus trap + Escape close on mobile menu
- Badge hidden when count is 0 (CSS `data-count` attribute selector)

**Footer** (`section-footer.liquid`):
- `{% form 'customer' %}` for newsletter signup
- Hidden `contact[tags]` = "newsletter" for subscriber tagging
- AJAX submit with success/error feedback states
- `enable_newsletter` toggle in section settings

### Needs Wiring Before Go-Live

| Item | Where | What to do |
|------|-------|-----------|
| Reviews tab | Product Main, tab block 3 | Replace placeholder with Judge.me/Stamped/Loox app snippet |
| Newsletter provider | Footer | If using Klaviyo/Mailchimp instead of Shopify, swap form action |
| Cart drawer | Header cart icon | Add slide-out cart drawer or link to `/cart` page |
| Metafields | Product Main | Create `custom.tagline` metafield in Shopify admin for product taglines |
| Stock images | Hero Evolved, Education Split | Replace watermarked Adobe Stock with licensed originals |

## Design Tokens

All sections reference these CSS custom properties (set via section schema color settings):

| Token | Default | Usage |
|-------|---------|-------|
| `--pm-bg` | `#F0EDDF` | Page background (warm cream) |
| `--pm-text` | `#1E4366` | Primary text (navy) |
| `--pm-accent` | `#E1D78E` | CTA buttons, tab underlines, badges (gold) |
| `--pm-serif` | P22 Mackinac Pro | Headings, product name, tabs |
| `--pm-sans` | Neue Haas Grotesk Display Pro | Body text, UI elements |

**Brand rules:**
- Gold `#E1D78E` is decorative only. Never use for readable text.
- P22 Mackinac Pro: weights 400/500 only. Never bold.
- Navy on cream = 8.2:1 contrast ratio (WCAG AAA).

## Fonts Required

Add to `<head>` in `theme.liquid` (or load via Shopify font picker):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=P22+Mackinac+Pro:wght@400;500&display=swap" rel="stylesheet">
```

Neue Haas Grotesk Display Pro requires a license from Linotype, or substitute with Inter (the fallback already specified in CSS).

## Accessibility

Every section includes:
- Skip link to `#main-content`
- Semantic heading hierarchy (h1 > h2 > h3)
- `role="tab"`, `role="tabpanel"`, `aria-selected` for tabs
- `aria-label` on all interactive elements
- Focus trap + Escape dismiss on mobile menu
- `prefers-reduced-motion` guards on all animations
- Minimum 44x44px touch targets
- `:focus-visible` outlines (2px solid, 4px offset)

## File Reference

### Prototypes (reference only, not part of theme)

| File | What |
|------|------|
| `hero_v1.html` - `hero_v19.html` | 18 hero concept prototypes |
| `product_v7a.html`, `v9`, `v13`, `v19`, `v2b` | 5 product page prototypes |
| `index.html` | Gallery of all concepts in device frames |
| `presentation.html` | Compact review tool with favourites |
| `review.html` | Inspector mode with element highlighting |
| `brand_kit.css` | Design tokens (read-only reference) |

### Theme Files (install these)

```
layout/theme.liquid
config/settings_data.json
config/settings_schema.json
templates/*.json (11 files)
sections/*.liquid (18 files)
snippets/trust-badges.liquid
```

## Testing Checklist

After installing in Shopify:

1. **Homepage:** Add Hero Evolved + Education Split + Product Grid + Testimonials + FAQ sections via Theme Editor
2. **Product page:** Verify Product Main loads product data (title, price, images, variants)
3. **Cart:** Add a product, confirm cart count updates in header badge
4. **Newsletter:** Submit email in footer, check Shopify Customers for "newsletter" tag
5. **Mobile:** Test hamburger menu, carousel swipe, scroll snap on Product Grid
6. **Accessibility:** Tab through entire page, verify focus states and skip link
7. **Reduced motion:** Enable in OS settings, confirm all animations disabled

## Contact

**Built by:** HandToMouse Studio (hello@handtomouse.org)
**Designer/Developer:** Nate Don
