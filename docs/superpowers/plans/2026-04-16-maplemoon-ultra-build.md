# MapleMoon Ultra Build: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full multi-page MapleMoon website (3 PDPs + About + Collection + FAQ) with V7+V11 fusion design, consistent cross-page navigation, and Visual QA - ready for client meeting Apr 17-20.

**Architecture:** Static HTML pages linked to three shared CSS/JS files: `brand_kit.css` (design tokens), `shared.css` (V7+V11 fusion header/footer/nav/cards/trust bar/animations), and `shared.js` (menu, scroll, fade-up, smooth scroll). Each page only contains page-specific inline CSS and its own HTML content. No build step, no framework. Pages deploy to Vercel as static files. All pages share the V7+V11 warm carob palette with dark elixir sections.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla ES5 JavaScript, Vercel static hosting.

**Spec:** `docs/superpowers/specs/2026-04-16-maplemoon-ultra-build-design.md`

---

## File Structure

### New Files (to create)

| File | Purpose |
|------|---------|
| `shared.css` | V7+V11 fusion shared components: header, footer, nav, cards, trust bar, animations |
| `shared.js` | Shared JS: mobile menu, header scroll, fade-up observer, smooth scroll |
| `products/pure-carob-bar.html` | PDP for Pure Carob Bar (warm palette) |
| `products/peppermint-moon.html` | PDP for Peppermint Moon (warm palette) |
| `products/spiced-elixir.html` | PDP for Spiced Elixir (dark palette) |
| `our-story.html` | About / Origin story page |
| `collections/bars.html` | Bars collection grid |
| `faq.html` | FAQ accordion page |

### Files to Modify

| File | Change |
|------|--------|
| `homepage.html` | Update nav links to point to new pages instead of `#` anchors |
| `vercel.json` | Add routes for new pages and `/products/*`, `/collections/*` directories |

### Reference Files (read-only, used as source material)

| File | Contains |
|------|----------|
| `brand_kit.css` | Design tokens (colors, typography, spacing, shadows, breakpoints) |
| `homepage.html` | V7+V11 fusion patterns: header, footer, nav, product cards, trust bar, animations |
| `product_v7a.html` | PDP reference: gallery, buy box, tabs, mobile menu patterns |
| `content/product_descriptions.md` | Long-form product copy for all products |
| `content/about_page.md` | Origin, Process, Mission copy |
| `content/faq.md` | 10 FAQ Q&As |
| `content/meta_seo.md` | Page titles and meta descriptions |

---

## Shared Patterns

**CRITICAL:** Two shared files have been pre-built and MUST be linked by every page. These eliminate CSS/JS duplication and prevent drift between agents.

### Linking Shared Files

Every page's `<head>` must include these two lines (after brand_kit.css):

```html
<link rel="stylesheet" href="/brand_kit.css">
<link rel="stylesheet" href="/shared.css">
```

Every page must include this before `</body>`:

```html
<script src="/shared.js"></script>
```

**`shared.css`** contains: V7+V11 warm palette tokens (`:root`), header/nav (fixed, glassmorphism, hamburger, mobile menu), product cards, trust bar, footer (newsletter, nav), fade-up animations, sr-only, and all desktop breakpoint overrides. Pages should NOT duplicate these styles.

**`shared.js`** contains: mobile menu toggle/close/aria, header scroll class, IntersectionObserver fade-up, smooth scroll for anchor links. Pages should NOT duplicate this JS.

Pages only need inline `<style>` for **page-specific** CSS (e.g. PDP gallery layout, FAQ accordion, story sections).

### Shared Header HTML

Copy this HTML into every page, between `<body>` and `<main>`:

```html
<a href="#main" class="skip-link">Skip to content</a>
<input type="checkbox" id="menu-toggle" hidden>
<div class="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu" aria-hidden="true" inert>
  <button class="menu-close" aria-label="Close menu">&times;</button>
  <a href="/collections/bars.html">Bars</a>
  <a href="/collections/bars.html">Moons</a>
  <a href="/collections/bars.html">Elixirs</a>
  <div class="menu-divider"></div>
  <a href="/our-story.html">Our Story</a>
  <a href="/collections/bars.html">Shop</a>
  <a href="/faq.html">FAQ</a>
</div>
<header class="site-header" id="site-header">
  <a href="/homepage.html" class="header-logo-link"><img src="/assets/brand/maplemoon_logo.svg" alt="Maple Moon" class="header-logo" width="36" height="36" loading="eager" decoding="async"></a>
  <nav class="header-nav">
    <a href="/our-story.html">Our Story</a>
    <a href="/collections/bars.html">Shop</a>
    <a href="/faq.html">FAQ</a>
  </nav>
  <label for="menu-toggle" class="hamburger" role="button" aria-label="Menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </label>
</header>
```

### Shared Footer HTML

Copy this HTML before `</main>` or before the shared.js script:

```html
<footer class="site-footer" id="footer">
  <div class="footer-top">
    <img src="/assets/brand/maplemoon_logo.svg" alt="Maple Moon" class="footer-logo" width="48" height="48" loading="lazy" decoding="async">
    <nav class="footer-nav">
      <a href="/our-story.html">Our Story</a>
      <a href="/collections/bars.html">Shop</a>
      <a href="/faq.html">FAQ</a>
    </nav>
  </div>
  <div class="footer-newsletter">
    <p>Stay in the loop</p>
    <form class="newsletter-form" onsubmit="return false;">
      <input type="email" placeholder="Your email" aria-label="Email address">
      <button type="submit">Join</button>
    </form>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2024 Maple Moon. Handmade in Byron Bay, Australia.</p>
  </div>
</footer>
```

### Shared Trust Bar HTML

Copy this before the footer on every page:

```html
<section class="trust-bar" aria-label="Credentials">
  <div class="trust-item fade-up">
    <img src="/assets/brand/icon_organic.svg" alt="" loading="lazy" decoding="async">
    <span>Certified Organic</span>
  </div>
  <div class="trust-item fade-up">
    <img src="/assets/brand/icon_vegan.svg" alt="" loading="lazy" decoding="async">
    <span>100% Vegan</span>
  </div>
  <div class="trust-item fade-up">
    <img src="/assets/brand/icon_caffeine_free.svg" alt="" loading="lazy" decoding="async">
    <span>Caffeine Free</span>
  </div>
  <div class="trust-item fade-up">
    <img src="/assets/brand/icon_gluten_free.svg" alt="" loading="lazy" decoding="async">
    <span>Gluten Free</span>
  </div>
  <div class="trust-item fade-up">
    <img src="/assets/brand/icon_made_in_aus.svg" alt="" loading="lazy" decoding="async">
    <span>Made in Australia</span>
  </div>
</section>
```

### Image Paths

All image paths must use root-relative URLs (`/assets/...`) since pages live in subdirectories (`/products/`, `/collections/`).

### Design Rules (from spec)

- P22 Mackinac Pro: weights 400/500 ONLY. Never bold.
- Brand accent is cornflower `#7B9DBF`, not navy `#1E4366`.
- Navy is text-on-cream only.
- Body line-height: 1.6-1.7. Heading line-height: 1.1-1.2.
- All buttons: 44px minimum touch target.
- `prefers-reduced-motion` guards on ALL animations.

---

## Task 1: Product Detail Page - Pure Carob Bar (Warm Palette)

**Files:**
- Create: `products/pure-carob-bar.html`
- Reference: `homepage.html` (header/footer/nav patterns), `product_v7a.html` (PDP layout reference), `content/product_descriptions.md` (copy), `content/meta_seo.md` (SEO)

This is the template PDP. Tasks 2 and 3 clone this with different content.

- [ ] **Step 1: Create the HTML file with head, shared header, and shared footer**

Create `products/pure-carob-bar.html`. Start with the full HTML document structure:

```html
<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pure Carob Bar | MapleMoon</title>
<meta name="description" content="Pure Carob Bar by Maple Moon. Australian carob and cacao butter, hand-tempered and set. Nothing else. Organic, vegan, caffeine-free. $12.95.">
<meta name="theme-color" content="#7B9DBF">
<meta property="og:title" content="Pure Carob Bar | MapleMoon">
<meta property="og:description" content="Australian carob and cacao butter, hand-tempered and set. Nothing else.">
<meta property="og:type" content="product">
<meta property="og:image" content="/assets/product_shots/bar_pure_carob.webp">
<meta property="og:site_name" content="Maple Moon">
<link rel="icon" href="/assets/brand/maplemoon_logo.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/brand/maplemoon_logo.svg">
<link rel="stylesheet" href="/brand_kit.css">
<link rel="stylesheet" href="/shared.css">
<style>
/* Page-specific styles go here (Steps 2-5) */
</style>
</head>
<body>
```

Include the shared header HTML (from Shared Patterns section).

Include the shared footer HTML and trust bar (from Shared Patterns section).

Close with `<script src="/shared.js"></script>` before `</body>`. Do NOT duplicate any CSS or JS that exists in shared.css or shared.js.

- [ ] **Step 2: Add breadcrumb navigation**

Between the header and main product content, add a breadcrumb:

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="/homepage.html">Home</a>
  <span aria-hidden="true">/</span>
  <a href="/collections/bars.html">Bars</a>
  <span aria-hidden="true">/</span>
  <span aria-current="page">Pure Carob</span>
</nav>
```

CSS for breadcrumb (add to the page `<style>`):

```css
.breadcrumb {
  padding: 80px 24px 0;
  max-width: 1200px;
  margin: 0 auto;
  font-family: var(--mm-sans);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--text-muted);
}
.breadcrumb a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}
.breadcrumb a:hover { color: var(--text-primary); }
.breadcrumb span[aria-hidden] { margin: 0 8px; opacity: 0.4; }
```

- [ ] **Step 3: Build the product hero section (image + buy box)**

Add the main product section. This is a two-column layout: product image left, buy box right. Mobile stacks vertically.

```html
<main id="main" tabindex="-1">
<section class="pdp-hero" aria-label="Pure Carob Bar">
  <div class="pdp-layout">
    <div class="pdp-gallery fade-up">
      <img src="/assets/product_shots/bar_pure_carob.webp" alt="Pure Carob Bar - front view" class="pdp-main-image" width="400" height="600" loading="eager" decoding="async">
    </div>
    <div class="pdp-info fade-up">
      <span class="pdp-badge">Carob Bars</span>
      <h1 class="pdp-title">Pure Carob</h1>
      <p class="pdp-price">$12.95 <span class="pdp-weight">80g</span></p>
      <p class="pdp-short-desc">Australian carob and cacao butter, hand-tempered and set. Nothing else.</p>
      <button class="pdp-cta" type="button">Add to Cart</button>
      <div class="pdp-trust">
        <img src="/assets/brand/icon_organic.svg" alt="Organic" width="24" height="24">
        <img src="/assets/brand/icon_vegan.svg" alt="Vegan" width="24" height="24">
        <img src="/assets/brand/icon_caffeine_free.svg" alt="Caffeine Free" width="24" height="24">
        <img src="/assets/brand/icon_gluten_free.svg" alt="Gluten Free" width="24" height="24">
      </div>
    </div>
  </div>
</section>
```

CSS for the PDP hero:

```css
.pdp-hero {
  padding: 24px 24px 48px;
  background: var(--warm-bg);
}
.pdp-layout {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.pdp-gallery {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--cream-warm);
  border-radius: 12px;
  padding: 40px 24px;
}
.pdp-main-image {
  width: 100%;
  max-width: 280px;
  height: auto;
  object-fit: contain;
}
.pdp-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.pdp-badge {
  font-family: var(--mm-sans);
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent-blue);
}
.pdp-title {
  font-family: var(--mm-serif);
  font-size: 2.2rem;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.1;
  margin: 0;
}
.pdp-price {
  font-family: var(--mm-sans);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}
.pdp-weight {
  font-weight: 300;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-left: 8px;
}
.pdp-short-desc {
  font-family: var(--mm-sans);
  font-size: 0.95rem;
  font-weight: 300;
  line-height: 1.65;
  color: var(--text-secondary);
  max-width: 480px;
}
.pdp-cta {
  display: inline-block;
  padding: 14px 40px;
  background: var(--accent-blue);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-family: var(--mm-sans);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: opacity 0.2s;
  min-height: 44px;
  align-self: flex-start;
}
.pdp-cta:hover { opacity: 0.85; }
.pdp-trust {
  display: flex;
  gap: 16px;
  margin-top: 8px;
  opacity: 0.5;
}
.pdp-trust img { width: 24px; height: 24px; }

/* Desktop: side-by-side */
@media (min-width: 768px) {
  .pdp-layout {
    flex-direction: row;
    align-items: flex-start;
    gap: 56px;
  }
  .pdp-gallery {
    flex: 1;
    max-width: 50%;
    padding: 56px 40px;
  }
  .pdp-main-image { max-width: 360px; }
  .pdp-info {
    flex: 1;
    padding-top: 24px;
  }
  .pdp-title { font-size: 2.8rem; }
}
```

- [ ] **Step 4: Add product details tabs (Details / Ingredients)**

Below the hero section, add a tabbed content area:

```html
<section class="pdp-tabs-section" aria-label="Product details">
  <div class="pdp-tabs-container">
    <div class="pdp-tab-nav" role="tablist">
      <button class="pdp-tab active" role="tab" aria-selected="true" data-tab="details">Details</button>
      <button class="pdp-tab" role="tab" aria-selected="false" data-tab="ingredients">Ingredients</button>
    </div>
    <div class="pdp-tab-panel active" role="tabpanel" data-tab="details">
      <p>The Original Pure Carob bar is MapleMoon in its simplest form. Australian-grown carob, slow-roasted and milled, combined with organic cacao butter and hand-tempered in our Byron Bay kitchen. There's nothing added because nothing needs to be. Carob is naturally sweet, rich in flavour, and entirely free from caffeine. Each 80g bar is wrapped by hand and made in small batches. If you've never tried carob before, start here.</p>
    </div>
    <div class="pdp-tab-panel" role="tabpanel" data-tab="ingredients">
      <p><strong>Ingredients:</strong> Australian carob (60%), organic cacao butter (40%).</p>
      <p><strong>Allergen info:</strong> Made in a facility that processes tree nuts (hazelnuts, coconut). Gluten-free, dairy-free, soy-free.</p>
      <p><strong>Storage:</strong> Store in a cool, dry place away from direct sunlight. If bars arrive soft during summer, a few minutes in the fridge will restore the snap.</p>
    </div>
  </div>
</section>
```

CSS for tabs:

```css
.pdp-tabs-section {
  padding: 0 24px 64px;
  background: var(--warm-bg);
}
.pdp-tabs-container {
  max-width: 700px;
  margin: 0 auto;
}
.pdp-tab-nav {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border-light);
  margin-bottom: 32px;
}
.pdp-tab {
  padding: 12px 24px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  font-family: var(--mm-serif);
  font-size: 0.95rem;
  font-weight: 400;
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  min-height: 44px;
}
.pdp-tab.active {
  color: var(--text-primary);
  border-bottom-color: var(--accent-blue);
}
.pdp-tab:hover { color: var(--text-primary); }
.pdp-tab-panel {
  display: none;
}
.pdp-tab-panel.active { display: block; }
.pdp-tab-panel p {
  font-family: var(--mm-sans);
  font-size: 0.92rem;
  font-weight: 300;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 16px;
}
```

Add tab-switching JS after the shared JS block:

```javascript
/* Tab switching */
var tabBtns = document.querySelectorAll('.pdp-tab');
var tabPanels = document.querySelectorAll('.pdp-tab-panel');
tabBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var target = this.dataset.tab;
    tabBtns.forEach(function(b) {
      b.classList.toggle('active', b.dataset.tab === target);
      b.setAttribute('aria-selected', b.dataset.tab === target ? 'true' : 'false');
    });
    tabPanels.forEach(function(p) {
      p.classList.toggle('active', p.dataset.tab === target);
    });
  });
});
```

- [ ] **Step 5: Add "You Might Also Like" cross-sell section**

Below tabs, add a product grid showing 3-4 related products:

```html
<section class="pdp-related" aria-label="Related products">
  <div class="pdp-related-container">
    <h2 class="pdp-related-title fade-up">You Might Also Like</h2>
    <div class="pdp-related-grid fade-up">
      <a href="/products/peppermint-moon.html" class="product-card">
        <img src="/assets/product_shots/moon_peppermint.webp" alt="Peppermint Moon" loading="lazy" decoding="async">
        <span class="product-card-name">Peppermint Moon</span>
        <span class="product-card-desc">$2.50</span>
      </a>
      <a href="/collections/bars.html" class="product-card">
        <img src="/assets/product_shots/bar_goji_coconut.webp" alt="Golden Coconut Bar" loading="lazy" decoding="async">
        <span class="product-card-name">Golden Coconut</span>
        <span class="product-card-desc">$12.95</span>
      </a>
      <a href="/products/spiced-elixir.html" class="product-card">
        <img src="/assets/product_shots/elixir_spiced.webp" alt="Spiced Elixir" loading="lazy" decoding="async">
        <span class="product-card-name">Spiced Elixir</span>
        <span class="product-card-desc">Coming soon</span>
      </a>
    </div>
  </div>
</section>
```

CSS (`.product-card` styles are in `shared.css`, only add wrapper styles):

```css
.pdp-related {
  padding: 64px 24px;
  background: var(--warm-bg-alt);
}
.pdp-related-container {
  max-width: 900px;
  margin: 0 auto;
}
.pdp-related-title {
  font-family: var(--mm-serif);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 32px;
}
.pdp-related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 767px) {
  .pdp-related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 6: Add trust bar before footer**

Copy the Shared Trust Bar HTML from the Shared Patterns section above. Place it between the related products section and the footer. CSS is already in `shared.css`.

- [ ] **Step 7: Verify the page renders correctly**

Run: `open /Users/handtomouse/maplemoon-website/products/pure-carob-bar.html`

Check:
- Header renders with logo and nav links
- Breadcrumb shows Home / Bars / Pure Carob
- Product image displays (bar_pure_carob.webp)
- Buy box shows title, price, description, Add to Cart button
- Tabs switch between Details and Ingredients
- Related products grid shows 3 cards
- Trust bar renders with 5 icons
- Footer renders with newsletter form
- Mobile hamburger menu works
- Page scrolls smoothly

- [ ] **Step 8: Commit**

```bash
cd ~/maplemoon-website
git add products/pure-carob-bar.html
git commit -m "feat: add Pure Carob Bar PDP with V7+V11 fusion treatment"
```

---

## Task 2: Product Detail Page - Peppermint Moon (Warm Palette)

**Files:**
- Create: `products/peppermint-moon.html`
- Reference: `homepage.html` (HTML structure), `shared.css` + `shared.js` (linked), `content/product_descriptions.md` (copy)

Build independently using the same PDP structure as Task 1 but with Moon-specific content. Link `brand_kit.css`, `shared.css`, `shared.js`. Use shared header/footer/trust bar HTML from Shared Patterns section. Only write page-specific inline CSS (PDP gallery, buy box, tabs, related grid - same patterns as Task 1).

- [ ] **Step 1: Create the full page with head, shared links, header, footer**

Create `products/peppermint-moon.html` with the same document structure as Task 1 Step 1. Link `/brand_kit.css` and `/shared.css` in head, `<script src="/shared.js"></script>` before `</body>`. Include shared header and footer HTML from Shared Patterns. Include ALL page-specific PDP CSS from Task 1 (Steps 2-5) in an inline `<style>` block.

- [ ] **Step 2: Build page content with Moon-specific details**

Make these replacements throughout the file:

**Head:**
- Title: `Peppermint Moon | MapleMoon`
- Meta description: `Peppermint Crescent Moon by Maple Moon. Hand-moulded carob and cacao butter crescents with natural peppermint oil. Organic, vegan, caffeine-free. $2.50 each.`
- og:title: `Peppermint Moon | MapleMoon`
- og:description: `Cool mint crescents of pure carob and cacao butter. Individually wrapped. From $2.50.`
- og:image: `/assets/product_shots/moon_peppermint.webp`

**Breadcrumb:**
- Change `Bars` link to `Moons` (href stays `/collections/bars.html` for now since no moons collection page yet)
- Change current page text to `Peppermint Moon`

**Product hero:**
- Image: `src="/assets/product_shots/moon_peppermint.webp"` alt: `Peppermint Moon - individually wrapped`
- Badge: `Crescent Moons`
- Title: `Peppermint Moon`
- Price: `$2.50 <span class="pdp-weight">individual</span>` and add second price line: `<p class="pdp-price-box">Box of 24: $44.99</p>`
- Short desc: `Natural peppermint oil through pure carob and cacao butter. Cool, clean, and naturally sweet.`

**Details tab:**
- Content from `content/product_descriptions.md` Crescent Moons long copy, adapted for peppermint: `MapleMoon Crescent Moons are hand-moulded from the same pure carob and cacao butter as our bars, shaped into crescents and individually wrapped. The peppermint is measured precisely, enough to be present, not enough to overpower. Available individually at $2.50 or as a box of 24 for $44.99. Handmade and hand-packed in Byron Bay.`

**Ingredients tab:**
- Ingredients: `Australian carob (55%), organic cacao butter (40%), natural peppermint oil (5%).`

**Related products:**
- Show Pure Carob Bar, Golden Coconut Bar, Spiced Elixir (link to their pages)

Add CSS for the box price line:

```css
.pdp-price-box {
  font-family: var(--mm-sans);
  font-size: 0.85rem;
  font-weight: 300;
  color: var(--text-muted);
  margin: -8px 0 0 0;
}
```

- [ ] **Step 3: Verify the page renders correctly**

Run: `open /Users/handtomouse/maplemoon-website/products/peppermint-moon.html`

Same checks as Task 1, Step 7. Additionally verify the moon image renders (round shape, not bar shape).

- [ ] **Step 4: Commit**

```bash
cd ~/maplemoon-website
git add products/peppermint-moon.html
git commit -m "feat: add Peppermint Moon PDP"
```

---

## Task 3: Product Detail Page - Spiced Elixir (Dark Palette)

**Files:**
- Create: `products/spiced-elixir.html`
- Reference: `homepage.html` (HTML structure), `shared.css` + `shared.js` (linked), `content/product_descriptions.md` (copy)

Build independently using the same PDP structure as Task 1 but with dark elixir palette and elixir-specific content. Link `brand_kit.css`, `shared.css`, `shared.js`. Use shared header/footer/trust bar HTML from Shared Patterns section. Write page-specific PDP CSS from Task 1 PLUS dark palette overrides in inline `<style>`.

- [ ] **Step 1: Create the full page with head, shared links, header, footer**

Create `products/spiced-elixir.html` with the same document structure as Task 1 Step 1. Link `/brand_kit.css` and `/shared.css` in head, `<script src="/shared.js"></script>` before `</body>`. Include shared header and footer HTML from Shared Patterns. Include ALL page-specific PDP CSS from Task 1 (Steps 2-5) in an inline `<style>` block.

- [ ] **Step 2: Update product-specific content**

**Head:**
- Title: `Spiced Elixir | MapleMoon`
- Meta description: `Spiced Carob Elixir by Maple Moon. Warm carob with native spices, handmade in Byron Bay. Organic, vegan, caffeine-free.`
- og:image: `/assets/product_shots/elixir_spiced.webp`

**Breadcrumb:**
- `Elixirs` instead of `Bars`, current page `Spiced Elixir`

**Product hero:**
- Image: `src="/assets/product_shots/elixir_spiced.webp"`, alt: `Spiced Carob Elixir`
- Badge: `Carob Elixirs`
- Title: `Spiced Elixir`
- Price: use appropriate elixir price
- Short desc: from product_descriptions.md (does not have elixir long copy, use the short: `Spiced carob. Something for the cold months.`)

**Details tab:**
- `Our Spiced Elixir blends warm Australian carob with native spices for a rich, aromatic drink that's perfect when the weather turns. Made from pure carob powder and cacao butter, it's naturally sweet with no caffeine. Stir into warm milk, oat milk, or water. Organic, vegan, gluten-free.`

**Ingredients tab:**
- `Australian carob powder, organic cacao butter, mixed spice blend (cinnamon, ginger, nutmeg).`

- [ ] **Step 3: Apply dark elixir palette**

Override the `:root` palette for the entire page. Add these CSS overrides at the top of the `<style>` block, after the standard `:root`:

```css
/* Dark elixir override */
body {
  background: #1A1410;
  color: #E7E4CA;
}

.pdp-hero { background: #1A1410; }
.pdp-gallery { background: #2A2218; }
.pdp-badge { color: var(--accent-blue); }
.pdp-title { color: #E7E4CA; }
.pdp-price { color: #E7E4CA; }
.pdp-short-desc { color: rgba(231, 228, 202, 0.7); }
.pdp-trust { opacity: 0.4; filter: brightness(0) invert(0.9); }

.breadcrumb { color: rgba(231, 228, 202, 0.4); }
.breadcrumb a { color: rgba(231, 228, 202, 0.4); }
.breadcrumb a:hover { color: #E7E4CA; }

.pdp-tabs-section { background: #1A1410; }
.pdp-tab-nav { border-bottom-color: rgba(231, 228, 202, 0.1); }
.pdp-tab { color: rgba(231, 228, 202, 0.4); }
.pdp-tab.active { color: #E7E4CA; border-bottom-color: var(--accent-blue); }
.pdp-tab:hover { color: #E7E4CA; }
.pdp-tab-panel p { color: rgba(231, 228, 202, 0.7); }

.pdp-related { background: #221C16; }
.pdp-related-title { color: #E7E4CA; }
.product-card { background: #2A2218; color: #E7E4CA; }
.product-card:hover { box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3); }
.product-card-name { color: #E7E4CA; }
.product-card-desc { color: rgba(231, 228, 202, 0.5); }

.trust-bar { background: #221C16; border-color: rgba(231, 228, 202, 0.06); }
.trust-item img { filter: brightness(0) invert(0.8); }
.trust-item span { color: rgba(231, 228, 202, 0.5); }

/* Dark header */
.site-header .header-nav a { color: #E7E4CA; }
.site-header .hamburger span { background: #E7E4CA; }
.site-header.scrolled {
  background: rgba(26, 20, 16, 0.85);
  border-bottom-color: rgba(231, 228, 202, 0.06);
}

/* Dark mobile menu */
.mobile-menu { background: #1A1410; color: #E7E4CA; }
.mobile-menu a { color: #E7E4CA; }
.menu-close { color: #E7E4CA; }
.menu-divider { background: rgba(231, 228, 202, 0.1); }
```

- [ ] **Step 4: Verify the page renders correctly**

Run: `open /Users/handtomouse/maplemoon-website/products/spiced-elixir.html`

Check the dark palette is consistent throughout: dark background, cream text, cornflower accent on CTA and tab underline. No warm-bg peeking through. Header should be dark-mode.

- [ ] **Step 5: Commit**

```bash
cd ~/maplemoon-website
git add products/spiced-elixir.html
git commit -m "feat: add Spiced Elixir PDP with dark elixir palette"
```

---

## Task 4: About / Our Story Page

**Files:**
- Create: `our-story.html`
- Reference: `homepage.html` (header/footer), `content/about_page.md` (copy), `content/meta_seo.md` (SEO)

- [ ] **Step 1: Create the HTML file with shared header and footer**

Create `our-story.html` with the standard document structure. Include:
- SEO from meta_seo.md: Title `Our Story | MapleMoon`, description from the About section
- Same `:root` palette as homepage
- Shared header/footer HTML and CSS (from Shared Patterns)
- Shared JS (menu, scroll, fade-up)

- [ ] **Step 2: Build the hero section**

Full-width hero with Byron Bay silhouette image:

```html
<main id="main" tabindex="-1">
<section class="story-hero" aria-label="Our Story">
  <img src="/assets/hero_shots/byron_bay_silhouette.webp" alt="Byron Bay coastline at sunset" class="story-hero-bg" loading="eager" decoding="async">
  <div class="story-hero-overlay">
    <span class="story-hero-badge fade-up">Our Story</span>
    <h1 class="story-hero-title fade-up">Carob Isn't Trying<br>to Be Chocolate</h1>
    <p class="story-hero-sub fade-up">It's its own thing. Naturally sweet, caffeine-free, and grown right here in Australia.</p>
  </div>
</section>
```

CSS:

```css
.story-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.story-hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 60%;
}
.story-hero-overlay {
  position: relative;
  z-index: 1;
  padding: 48px 24px;
  background: linear-gradient(transparent, rgba(245, 240, 232, 0.95));
  width: 100%;
}
.story-hero-badge {
  font-family: var(--mm-sans);
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent-blue);
  display: block;
  margin-bottom: 12px;
}
.story-hero-title {
  font-family: var(--mm-serif);
  font-size: 2.2rem;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.15;
  margin: 0 0 16px;
}
.story-hero-sub {
  font-family: var(--mm-sans);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 520px;
}

@media (min-width: 768px) {
  .story-hero { min-height: 70vh; }
  .story-hero-overlay { padding: 80px 56px; }
  .story-hero-title { font-size: 3rem; }
}
```

- [ ] **Step 3: Build the Origin section**

Content from `content/about_page.md`, "The Origin" section:

```html
<section class="story-section" aria-label="The Origin">
  <div class="story-split">
    <div class="story-text fade-up">
      <span class="story-label">The Origin</span>
      <h2 class="story-heading">Why Does Carob Get Treated as a Substitute?</h2>
      <p>Carob isn't trying to be chocolate. It's its own thing. Naturally sweet, caffeine-free, and grown right here in Australia. We started MapleMoon in Byron Bay because we believed carob deserved better than the back shelf. Better ingredients, better craft, better packaging. Something you'd reach for because you wanted it, not because you were avoiding something else.</p>
      <p>Australian-grown carob pods, sun-ripened and slow-roasted. That's the starting point. Everything we make comes back to the pod.</p>
    </div>
    <div class="story-image fade-up">
      <img src="/assets/stock/stock_carob_pods_hand.jpg" alt="Hand holding Australian carob pods" loading="lazy" decoding="async">
    </div>
  </div>
</section>
```

CSS for split sections:

```css
.story-section {
  padding: 64px 24px;
  background: var(--warm-bg);
}
.story-section:nth-child(even) { background: var(--warm-bg-alt); }
.story-split {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.story-text { flex: 1; }
.story-label {
  font-family: var(--mm-sans);
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent-blue);
  display: block;
  margin-bottom: 12px;
}
.story-heading {
  font-family: var(--mm-serif);
  font-size: 1.8rem;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.2;
  margin: 0 0 20px;
}
.story-section p {
  font-family: var(--mm-sans);
  font-size: 0.95rem;
  font-weight: 300;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 16px;
}
.story-image {
  flex-shrink: 0;
}
.story-image img {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  max-height: 400px;
}

@media (min-width: 768px) {
  .story-section { padding: 100px 48px; }
  .story-split {
    flex-direction: row;
    align-items: center;
    gap: 56px;
  }
  .story-split:nth-child(even) { flex-direction: row-reverse; }
  .story-image { width: 45%; }
  .story-heading { font-size: 2.2rem; }
}
```

- [ ] **Step 4: Build the Process section**

Content from `content/about_page.md`, "The Process" section. Alternating split layout (image left this time):

```html
<section class="story-section" aria-label="The Process">
  <div class="story-split" style="flex-direction: row-reverse;">
    <div class="story-text fade-up">
      <span class="story-label">The Process</span>
      <h2 class="story-heading">Handmade in Small Batches</h2>
      <p>Every MapleMoon product is handmade in small batches in our Byron Bay kitchen. We work with organic Australian carob and cacao butter. No compound, no fillers, no shortcuts.</p>
      <p>The carob is roasted low and slow to bring out its natural sweetness, then milled and combined with cacao butter. Each batch is hand-tempered, hand-moulded, and hand-packed. The process is slower than it needs to be. We prefer it that way.</p>
    </div>
    <div class="story-image fade-up">
      <img src="/assets/hero_shots/byron_bay_silhouette.webp" alt="Byron Bay landscape" loading="lazy" decoding="async">
    </div>
  </div>
</section>
```

- [ ] **Step 5: Build the Mission section**

Content from `content/about_page.md`, "The Mission" section:

```html
<section class="story-section" aria-label="The Mission">
  <div class="story-centred fade-up">
    <span class="story-label">The Mission</span>
    <h2 class="story-heading">Carob That Stands on Its Own</h2>
    <p>We want carob to stand on its own. Not as a substitute, not as an alternative, but as something worth choosing for what it is.</p>
    <p>That means premium quality in everything. The ingredients, the craft, the packaging, the experience. It means staying small enough to make everything by hand. It means sourcing Australian carob and supporting local growers.</p>
    <p>MapleMoon is a Byron Bay company. The coast is where we make, where we pack, and where we ship from. Every product that leaves here carries a bit of this place with it.</p>
    <a href="/collections/bars.html" class="story-cta">Shop the Range</a>
  </div>
</section>
```

CSS for centred layout:

```css
.story-centred {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}
.story-centred .story-label { margin-bottom: 16px; }
.story-centred .story-heading { margin-bottom: 24px; }
.story-cta {
  display: inline-block;
  margin-top: 16px;
  padding: 14px 40px;
  background: var(--accent-blue);
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-family: var(--mm-sans);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: opacity 0.2s;
  min-height: 44px;
}
.story-cta:hover { opacity: 0.85; }
```

- [ ] **Step 6: Add trust bar and footer, verify, commit**

Add trust bar (same as homepage) before footer.

Run: `open /Users/handtomouse/maplemoon-website/our-story.html`

Check: Hero image loads, three content sections render with alternating layout, Mission section is centred, CTA links to collection, trust bar and footer render, all responsive at 375/768/1440px.

```bash
cd ~/maplemoon-website
git add our-story.html
git commit -m "feat: add Our Story page with V7+V11 fusion treatment"
```

---

## Task 5: Bars Collection Page

**Files:**
- Create: `collections/bars.html`
- Reference: `homepage.html` (product cards, range grid patterns)

- [ ] **Step 1: Create the page with header, footer, and collection hero**

Create `collections/bars.html` with shared patterns. Add a collection hero:

```html
<main id="main" tabindex="-1">
<section class="collection-hero" aria-label="Carob Bars">
  <div class="collection-hero-content">
    <span class="collection-badge fade-up">The Range</span>
    <h1 class="collection-title fade-up">Carob Bars</h1>
    <p class="collection-sub fade-up">Seven flavours, one craft. Pure Australian carob and cacao butter, hand-tempered in Byron Bay. From $12.95.</p>
  </div>
</section>
```

CSS:

```css
.collection-hero {
  padding: 120px 24px 48px;
  background: var(--warm-bg);
  text-align: center;
}
.collection-hero-content {
  max-width: 600px;
  margin: 0 auto;
}
.collection-badge {
  font-family: var(--mm-sans);
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent-blue);
  display: block;
  margin-bottom: 12px;
}
.collection-title {
  font-family: var(--mm-serif);
  font-size: 2.5rem;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.1;
  margin: 0 0 16px;
}
.collection-sub {
  font-family: var(--mm-sans);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.6;
  color: var(--text-secondary);
}

@media (min-width: 768px) {
  .collection-hero { padding: 140px 48px 64px; }
  .collection-title { font-size: 3rem; }
}
```

- [ ] **Step 2: Build the product grid**

All 7 bars (6 flavours + almond) in a responsive grid:

```html
<section class="collection-grid-section" aria-label="All bars">
  <div class="collection-grid fade-up">
    <a href="/products/pure-carob-bar.html" class="product-card">
      <img src="/assets/product_shots/bar_pure_carob.webp" alt="Pure Carob Bar" loading="lazy" decoding="async">
      <span class="product-card-name">Pure Carob</span>
      <span class="product-card-desc">Nothing added. $12.95</span>
    </a>
    <a href="#" class="product-card">
      <img src="/assets/product_shots/bar_goji_coconut.webp" alt="Golden Coconut Bar" loading="lazy" decoding="async">
      <span class="product-card-name">Golden Coconut</span>
      <span class="product-card-desc">Toasted coconut. $12.95</span>
    </a>
    <a href="#" class="product-card">
      <img src="/assets/product_shots/bar_peppermint.webp" alt="Peppermint Bar" loading="lazy" decoding="async">
      <span class="product-card-name">Peppermint</span>
      <span class="product-card-desc">Cool and clean. $12.95</span>
    </a>
    <a href="#" class="product-card">
      <img src="/assets/product_shots/bar_hazelnut.webp" alt="Hazelnut Bar" loading="lazy" decoding="async">
      <span class="product-card-name">Hazelnut</span>
      <span class="product-card-desc">Roasted hazelnuts. $12.95</span>
    </a>
    <a href="#" class="product-card">
      <img src="/assets/product_shots/bar_cayenne.webp" alt="Chilli Bar" loading="lazy" decoding="async">
      <span class="product-card-name">Chilli</span>
      <span class="product-card-desc">Slow warmth. $12.95</span>
    </a>
    <a href="#" class="product-card">
      <img src="/assets/product_shots/bar_almond.webp" alt="Almond Bar" loading="lazy" decoding="async">
      <span class="product-card-name">Almond</span>
      <span class="product-card-desc">Whole roasted almonds. $12.95</span>
    </a>
  </div>
</section>
```

CSS:

```css
.collection-grid-section {
  padding: 0 24px 64px;
  background: var(--warm-bg);
}
.collection-grid {
  max-width: 960px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

@media (min-width: 768px) {
  .collection-grid-section { padding: 0 48px 80px; }
  .collection-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1024px) {
  .collection-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
}
```

Product card CSS is already in `shared.css`. Do NOT duplicate it.

- [ ] **Step 3: Add "Explore More" section linking to other categories**

```html
<section class="collection-explore" aria-label="Explore more">
  <div class="explore-container">
    <h2 class="explore-title fade-up">Explore More</h2>
    <div class="explore-grid fade-up">
      <a href="/products/peppermint-moon.html" class="product-card">
        <img src="/assets/product_shots/moon_peppermint.webp" alt="Peppermint Moon" loading="lazy" decoding="async">
        <span class="product-card-name">Crescent Moons</span>
        <span class="product-card-desc">From $2.50</span>
      </a>
      <a href="/products/spiced-elixir.html" class="product-card">
        <img src="/assets/product_shots/elixir_spiced.webp" alt="Spiced Elixir" loading="lazy" decoding="async">
        <span class="product-card-name">Carob Elixirs</span>
        <span class="product-card-desc">Warm and spiced</span>
      </a>
    </div>
  </div>
</section>
```

CSS:

```css
.collection-explore {
  padding: 64px 24px;
  background: var(--warm-bg-alt);
}
.explore-container { max-width: 600px; margin: 0 auto; }
.explore-title {
  font-family: var(--mm-serif);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 32px;
}
.explore-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
```

- [ ] **Step 4: Add trust bar, verify, commit**

Add trust bar before footer. Verify page renders at all breakpoints. Check that Pure Carob card links to the PDP.

```bash
cd ~/maplemoon-website
git add collections/bars.html
git commit -m "feat: add Bars collection page with product grid"
```

---

## Task 6: FAQ Page

**Files:**
- Create: `faq.html`
- Reference: `content/faq.md` (10 Q&As), `homepage.html` (header/footer)

- [ ] **Step 1: Create the page with header, footer, and FAQ hero**

Create `faq.html` with shared patterns. Hero section:

```html
<main id="main" tabindex="-1">
<section class="faq-hero" aria-label="FAQ">
  <span class="faq-badge fade-up">Help</span>
  <h1 class="faq-title fade-up">Frequently Asked Questions</h1>
  <p class="faq-sub fade-up">Everything you need to know about carob, our products, and ordering.</p>
</section>
```

CSS:

```css
.faq-hero {
  padding: 120px 24px 48px;
  background: var(--warm-bg);
  text-align: center;
}
.faq-badge {
  font-family: var(--mm-sans);
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent-blue);
  display: block;
  margin-bottom: 12px;
}
.faq-title {
  font-family: var(--mm-serif);
  font-size: 2.2rem;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.15;
  margin: 0 0 16px;
}
.faq-sub {
  font-family: var(--mm-sans);
  font-size: 1rem;
  font-weight: 300;
  color: var(--text-secondary);
}

@media (min-width: 768px) {
  .faq-hero { padding: 140px 48px 56px; }
  .faq-title { font-size: 2.8rem; }
}
```

- [ ] **Step 2: Build the accordion with all 10 FAQs**

Use native `<details>/<summary>` (zero JS, same pattern as the Shopify Liquid section):

```html
<section class="faq-list" aria-label="Questions and answers">
  <div class="faq-container">
    <details class="faq-item fade-up">
      <summary class="faq-question">What is carob?</summary>
      <div class="faq-answer">
        <p>Carob comes from the pod of the carob tree (Ceratonia siliqua), which grows across the Mediterranean and in parts of Australia. The pods are harvested, roasted, and milled into a powder that's naturally sweet, no sugar required. We combine it with organic cacao butter to make our bars, moons, bites, and elixirs.</p>
      </div>
    </details>
    <details class="faq-item fade-up">
      <summary class="faq-question">Does it taste like chocolate?</summary>
      <div class="faq-answer">
        <p>Carob has its own distinct flavour. It's rich and naturally sweet with warm, toasty notes. Some people find it reminiscent of chocolate, others find it completely different. We'd rather you try it and decide for yourself. It's not trying to be chocolate. It's carob.</p>
      </div>
    </details>
    <details class="faq-item fade-up">
      <summary class="faq-question">Is MapleMoon vegan?</summary>
      <div class="faq-answer">
        <p>Yes. Every product in our range is 100% vegan. We use organic cacao butter as our fat base, never dairy, never compound. Our kitchen in Byron Bay is entirely plant-based.</p>
      </div>
    </details>
    <details class="faq-item fade-up">
      <summary class="faq-question">Is it organic and gluten-free?</summary>
      <div class="faq-answer">
        <p>Yes to both. All MapleMoon products are certified organic and gluten-free. They're also caffeine-free and contain no refined sugar.</p>
      </div>
    </details>
    <details class="faq-item fade-up">
      <summary class="faq-question">Where do you source your carob?</summary>
      <div class="faq-answer">
        <p>We use Australian-grown carob that's sun-ripened and harvested locally. The pods are slow-roasted and milled in our Byron Bay facility.</p>
      </div>
    </details>
    <details class="faq-item fade-up">
      <summary class="faq-question">How should I store MapleMoon products?</summary>
      <div class="faq-answer">
        <p>Store in a cool, dry place away from direct sunlight. Carob and cacao butter can soften in warm conditions. If your bars arrive soft during summer, a few minutes in the fridge will restore the snap. Carob Powder should be kept sealed in a cool, dry cupboard.</p>
      </div>
    </details>
    <details class="faq-item fade-up">
      <summary class="faq-question">Do you ship Australia-wide?</summary>
      <div class="faq-answer">
        <p>Yes. We ship to all Australian addresses. Standard shipping is $16.95, and orders over $99 ship free. Orders are packed and dispatched from Byron Bay within 1-2 business days.</p>
      </div>
    </details>
    <details class="faq-item fade-up">
      <summary class="faq-question">What is your returns policy?</summary>
      <div class="faq-answer">
        <p>If your order arrives damaged or incorrect, contact us within 7 days at info@maplemoon.com.au and we'll make it right. Due to the nature of food products, we cannot accept returns on opened items.</p>
      </div>
    </details>
    <details class="faq-item fade-up">
      <summary class="faq-question">What about allergens?</summary>
      <div class="faq-answer">
        <p>MapleMoon products are made in a facility that processes tree nuts (hazelnuts, coconut). All products are gluten-free, dairy-free, and soy-free. Specific allergen information is listed on each product page and on the packaging. If you have a severe allergy, please contact us before ordering.</p>
      </div>
    </details>
    <details class="faq-item fade-up">
      <summary class="faq-question">Do you offer wholesale?</summary>
      <div class="faq-answer">
        <p>Yes. We supply selected retailers, cafes, and stockists across Australia. For wholesale enquiries, pricing, and minimum orders, please email info@maplemoon.com.au with your business details and we'll be in touch.</p>
      </div>
    </details>
  </div>
</section>
```

CSS for the accordion:

```css
.faq-list {
  padding: 0 24px 64px;
  background: var(--warm-bg);
}
.faq-container {
  max-width: 700px;
  margin: 0 auto;
}
.faq-item {
  border-bottom: 1px solid var(--border-light);
}
.faq-question {
  font-family: var(--mm-serif);
  font-size: 1.05rem;
  font-weight: 400;
  color: var(--text-primary);
  padding: 20px 0;
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 44px;
}
.faq-question::-webkit-details-marker { display: none; }
.faq-question::after {
  content: '+';
  font-family: var(--mm-sans);
  font-size: 1.2rem;
  font-weight: 300;
  color: var(--text-muted);
  transition: transform 0.2s;
  flex-shrink: 0;
  margin-left: 16px;
}
.faq-item[open] .faq-question::after {
  content: '\2212';
}
.faq-answer {
  padding: 0 0 20px;
}
.faq-answer p {
  font-family: var(--mm-sans);
  font-size: 0.92rem;
  font-weight: 300;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
}

@media (min-width: 768px) {
  .faq-list { padding: 0 48px 80px; }
  .faq-question { font-size: 1.1rem; padding: 24px 0; }
}
```

- [ ] **Step 3: Add a "Still have questions?" CTA section**

```html
<section class="faq-cta-section" aria-label="Contact">
  <div class="faq-cta-content fade-up">
    <h2 class="faq-cta-title">Still have questions?</h2>
    <p class="faq-cta-text">Email us at <a href="mailto:info@maplemoon.com.au">info@maplemoon.com.au</a> and we'll get back to you.</p>
  </div>
</section>
```

CSS:

```css
.faq-cta-section {
  padding: 64px 24px;
  background: var(--warm-bg-alt);
  text-align: center;
}
.faq-cta-content { max-width: 500px; margin: 0 auto; }
.faq-cta-title {
  font-family: var(--mm-serif);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--text-primary);
  margin: 0 0 12px;
}
.faq-cta-text {
  font-family: var(--mm-sans);
  font-size: 0.95rem;
  font-weight: 300;
  color: var(--text-secondary);
}
.faq-cta-text a {
  color: var(--accent-blue);
  text-decoration: none;
}
.faq-cta-text a:hover { text-decoration: underline; }
```

- [ ] **Step 4: Verify and commit**

Open, verify accordion opens/closes, all 10 Q&As render, responsive at all breakpoints.

```bash
cd ~/maplemoon-website
git add faq.html
git commit -m "feat: add FAQ page with native accordion"
```

---

## Task 7: Update Homepage Navigation + Vercel Routes

**Files:**
- Modify: `homepage.html`
- Modify: `vercel.json`

- [ ] **Step 1: Update homepage nav links**

In `homepage.html`, update the header nav links (currently `#`-anchored) to point to real pages:

**Mobile menu (lines 1162-1171):**
- `<a href="/collections/bars.html">Bars</a>`
- `<a href="/collections/bars.html">Moons</a>` (moons collection page not built yet, link to bars)
- `<a href="/collections/bars.html">Elixirs</a>` (same)
- `<a href="/our-story.html">Our Story</a>`
- `<a href="/collections/bars.html">Shop</a>`
- `<a href="/faq.html">FAQ</a>`

**Desktop nav (lines 1176-1180):**
- `<a href="/our-story.html">Our Story</a>`
- `<a href="/collections/bars.html">Shop</a>`
- `<a href="/faq.html">FAQ</a>`

**Footer nav (lines 1479-1485):**
- `<a href="/our-story.html">Our Story</a>`
- `<a href="/collections/bars.html">Shop</a>`
- `<a href="/faq.html">FAQ</a>`

**Origin section CTA (line 1335):**
- `<a href="/our-story.html" class="origin-cta fade-up">Read the full story</a>`

**Product cards in range grid (lines 1358-1443):**
- Pure Carob card: `href="/products/pure-carob-bar.html"`
- Other bar cards: `href="/collections/bars.html"` (no individual PDP yet)

Make the logo in the header a link to homepage: wrap in `<a href="/homepage.html">`.

- [ ] **Step 2: Update vercel.json routes**

Read current `vercel.json`, then add routes for new directories:

```json
{
  "rewrites": [
    { "source": "/products/:path*", "destination": "/products/:path*" },
    { "source": "/collections/:path*", "destination": "/collections/:path*" }
  ]
}
```

Verify the existing vercel.json structure before modifying. Add routes without removing existing ones.

- [ ] **Step 3: Verify all cross-page links work**

Open homepage, click through to:
- Our Story (nav link)
- Shop / Bars collection (nav link)
- FAQ (nav link)
- Pure Carob Bar PDP (from range grid)
- Back to homepage (logo click)

Verify all links resolve. Check that root-relative image paths work from subdirectories.

- [ ] **Step 4: Commit**

```bash
cd ~/maplemoon-website
git add homepage.html vercel.json
git commit -m "feat: wire cross-page navigation across all pages"
```

---

## Task 8: Visual QA Pass

**Files:**
- No files created. This task produces a QA report.

- [ ] **Step 1: Screenshot every page at 3 breakpoints**

Open each page in Chrome and screenshot at:
- Desktop: 1440px width
- Tablet: 768px width
- Mobile: 375px width

Pages to QA:
1. `/homepage.html`
2. `/products/pure-carob-bar.html`
3. `/products/peppermint-moon.html`
4. `/products/spiced-elixir.html`
5. `/our-story.html`
6. `/collections/bars.html`
7. `/faq.html`

That's 21 screenshots total.

- [ ] **Step 2: Check each screenshot against the design system**

For each screenshot, verify:
- Background colours match palette (warm-bg for light pages, dark for elixir)
- Text colours are correct (text-primary, not black)
- Cornflower accent (#7B9DBF) on CTAs and badges, not navy
- Typography: serif for headings, sans for body
- No layout breaks or overflow
- Images render (no broken image icons)
- Touch targets are 44px+ on mobile
- Header is fixed and doesn't overlap content
- Footer newsletter form is visible and styled

- [ ] **Step 3: Test interactive elements**

- Mobile hamburger menu opens/closes on all pages
- FAQ accordion opens/closes (faq.html)
- PDP tabs switch between Details and Ingredients
- Homepage flavour picker and category tabs work
- All nav links navigate to correct pages
- Smooth scroll works on homepage anchor links

- [ ] **Step 4: Document issues and fix**

Create a list of any issues found. Fix P0/P1 issues immediately. Commit fixes.

```bash
cd ~/maplemoon-website
git add -A
git commit -m "fix: visual QA fixes across all pages"
```

---

## Parallelisation Guide

**Pre-task (DONE):** `shared.css` and `shared.js` have been created. These eliminate CSS/JS duplication. All agents link to these files instead of copying styles inline.

Tasks 1-6 are fully independent and can run in parallel. Each agent needs:
- Read access to `homepage.html` (for HTML structure reference)
- Read access to `brand_kit.css`, `shared.css`, `shared.js` (linked, not copied)
- Read access to `content/` directory (for copy)
- Read access to the Shared Patterns section of this plan (for header/footer/trust bar HTML)
- Write access to their specific output file only

**Wave 1 (all 6 parallel):** Tasks 1, 2, 3, 4, 5, 6
**Wave 2 (sequential, after Wave 1):** Task 7 (needs all pages to exist for link wiring)
**Wave 3 (sequential, after Wave 2):** Task 8 (needs all pages + navigation wired)

Recommended: Dispatch Tasks 1-6 as parallel subagents, then run Tasks 7-8 inline.

## Known Gaps (flag to agents)

- **Elixir pricing:** Not in any content file. Use "Price TBD" on the Spiced Elixir PDP.
- **About page Process image:** No kitchen/production photos exist. Reuse `stock_carob_pods_hand.jpg` or `byron_bay_silhouette.webp`. Do NOT fabricate.
- **Moon breadcrumb:** Links to `/homepage.html#range` since no dedicated Moons collection page exists yet.
- **Image paths:** All must be root-relative (`/assets/...`) since pages live in subdirectories.
