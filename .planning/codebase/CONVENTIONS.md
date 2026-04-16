# Coding Conventions

**Analysis Date:** 2026-04-13

## Naming Patterns

**Files:**
- HTML hero prototypes: `hero_v{N}.html` (numeric versioning, e.g., `hero_v1.html`, `hero_v19.html`)
- Product demos: `product_v{N}.html` (e.g., `product_v7a.html`, `product_v13.html`)
- Shopify Liquid sections: `section-{component}.liquid` (kebab-case, e.g., `section-hero-evolved.liquid`, `section-product-main.liquid`)
- Layout templates: `layout/theme.liquid`, `layout/password.liquid`
- Template configs: `templates/{page-type}.json` or `templates/{page-type}.liquid`
- Utilities: `snippets/{name}.liquid`
- Global brand styles: `brand_kit.css` (single centralized source)

**CSS Classes:**
- BEM-inspired with double underscore for child elements: `.hero-evolved__headline`, `.prod-main__image-area`, `.testimonials__card`
- State classes: `.active`, `.scrolled` (lowercase, single class per state)
- Animation stagger classes: `.fade-1`, `.fade-2`, `.fade-3` through `.fade-7` (numeric postfix for delay sequence)
- Section-specific stagger: `.he-fade-1` through `.he-fade-7` (hero-evolved), `.tm-fade-1` (testimonials)
- Modifier classes: `.wm-full`, `.wm-bleed`, `.wm-subtle` (watermark variants)

**JavaScript Variables:**
- camelCase for all variables and functions: `menuAnimating`, `productStage`, `catLinks`, `focusable`
- Scoped to IIFE (immediately-invoked function expressions) to avoid global namespace pollution
- Descriptive names: `switchProduct()`, `getSelectedCat()`, `previewProduct()`
- DOM query caches prefixed with clear intent: `productImgs`, `catLinks`, `menuAnimating`

**HTML IDs and Data Attributes:**
- IDs: camelCase or snake_case: `menu-toggle`, `stripProgress` (mix exists; prefer kebab for clarity)
- Data attributes: kebab-case: `data-cat`, `data-tooltip`
- ARIA attributes: lowercase with hyphens: `aria-label`, `aria-expanded`, `aria-hidden`

## Code Style

**Formatting:**
- No linter/formatter configured (no `.eslintrc`, `.prettierrc` found)
- HTML: 2-space indentation (observed in all `.html` and `.liquid` files)
- CSS: 2-space indentation within rules
- JavaScript: 2-space indentation, semicolons required
- Single-line comments for inline documentation: `// [number] Description`
- Multi-line comments for section headers: `/* ── Section Name ── */`

**Linting:**
- No linting tools detected (no `eslint`, `stylelint` packages in `package.json`)
- Manual code review practices evident (numbered annotations for cross-references)

## Import Organization

**Stylesheet Linking (HTML):**
1. Meta tags and preload directives
2. Brand kit (`brand_kit.css`) — **always loaded first**
3. Inline `<style>` block (page-specific styles)
4. Preload for critical images (via `<link rel="preload">`)

**Liquid Sections:**
1. `{%- comment -%}` block (context and requirements)
2. Inline `<style>` (scoped to component)
3. HTML/Liquid markup
4. `{% schema %}` block (Shopify configuration)

**JavaScript Patterns:**
- Immediate use of `document` API (no imports)
- IIFE wrapper: `(function() { ... })()`
- Vanilla DOM queries: `document.querySelector()`, `document.querySelectorAll()`
- Event delegation via `.forEach()` and direct listener attachment

**Path Aliases:**
- None used (static HTML/CSS/JS project)
- Relative paths: `./assets/...`, `/sections/...` (absolute paths preferred for assets)

## Error Handling

**Patterns:**
- Defensive checks before DOM operations: `if (header) { ... }` before adding listeners
- Null-coalescing in Liquid: `section.settings.heading_tag | default: 'h2'`
- Safe selector queries: Check `focusable.length` before accessing array indices
- Try-less approach: No try/catch blocks observed; relies on conditional checks
- Example from `hero_v1.html` line 553: `if (!focusable.length) return;` — early exit on empty collection

## Logging

**Framework:** console only (no logging library detected)

**Patterns:**
- No logging calls found in production code
- Console for development only (no error, info, debug statements in committed files)
- Expected practice: Use browser DevTools for debugging

## Comments

**When to Comment:**
- Explain **why**, not what (code is readable enough)
- Reference external requirements: `// Adobe Fonts (P22 Mackinac Pro + Neue Haas Grotesk Display Pro) must be loaded by the theme <head>`
- Annotate cross-version changes: `/* [8] Use brand_kit color tokens — removed --grad-top/--grad-bottom */`
- Document accessibility patterns: `// [5] Focus trap — observer declared in outer scope to prevent memory leak`
- Explain complex logic: `// [23] Race condition guard — prevents event queue buildup during 0.3s animation`

**Annotation System:**
- Numbered reference system: `[1]`, `[5]`, `[17]`, `[29]` — refers to issues or improvements tracked elsewhere
- Format: `/* [number] Description of why/what changed */`
- Used to justify CSS token choices and JavaScript trade-offs
- Enable quick traceability to design/engineering decisions

**JSDoc/TSDoc:**
- Not used (vanilla JS, no TypeScript)
- Function purposes inline with descriptive names instead

## Function Design

**Size:** 
- Most functions 5–25 lines (compact, focused)
- Examples: `switchProduct()` (15 lines), `previewProduct()` (5 lines), `getSelectedCat()` (6 lines)
- Larger blocks wrapped in IIFEs by feature (menu system, category switcher, scroll listener)

**Parameters:**
- Minimal: Most functions take 1 parameter (e.g., `cat` in `switchProduct(cat)`)
- Prefer DOM element querying inside function over passing many args
- Use object/record for Liquid assignments: `assign pm_has_product = true`

**Return Values:**
- Functions either return simple values (`null`, boolean, string) or perform side effects (DOM updates)
- No explicit error returns; rely on conditionals to guard execution
- Example: `getSelectedCat()` returns category string or `null`

## Module Design

**Exports:**
- No module system (no `export`, `import` statements)
- Shopify Liquid uses `{% schema %}` blocks for configuration export
- Each `.html` file is standalone (no concatenation/bundling)

**Barrel Files:**
- None used (flat file structure)
- `brand_kit.css` acts as single source of truth for tokens (not a barrel; a centralized config)

**Scope Isolation:**
- IIFEs wrap each feature block to avoid global namespace pollution
- Pattern from `hero_v1.html` lines 521–577 (menu system), 579–634 (category switcher), 636–655 (scroll indicator)
- Each IIFE has its own variable scope: `toggle`, `menu`, `hamburger` only exist within menu IIFE

**Component Architecture (Liquid):**
- Self-contained sections: All CSS, JS, schema in one file
- No external dependencies beyond Adobe Fonts (declared in comments)
- Vanilla JS only — no framework dependencies
- CSS variables scoped to section: `.hero-evolved__*`, `.prod-main__*`
- Example: `section-hero-evolved.liquid` includes inline styles for `.hero-evolved__*`, inline JS for category switching, and `{% schema %}` for Shopify admin configuration

## CSS Variables (Brand Kit)

**Source:** `brand_kit.css` (lines 1–150+)

**Colors:**
- Primary: `--mm-dark-bg`, `--mm-cream`, `--mm-navy`, `--mm-blue-top`, `--mm-blue-bottom`
- Utilities: `--mm-cream-{opacity}` (04, 08, 10, 15, 20, 25, 30, 40, 50, 60, 80), `--mm-navy-{opacity}`, `--mm-black-{opacity}`
- Deprecated per files: Old `--grad-top`, `--grad-bottom` replaced with explicit gradients

**Spacing:**
- `--space-{n}`: `1` (4px), `2` (8px), `3` (12px), `4` (16px), `5` (20px), `6` (24px), `8` (32px), `10` (40px), `12` (48px), `16` (64px)

**Radius:**
- `--radius-sm` (4px), `--radius-md` (12px), `--radius-lg` (24px), `--radius-pill` (50px), `--radius-full` (50%)

**Shadows:**
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl` (drop-shadow stacks)

**Z-Index Scale:**
- `--z-base` (1), `--z-product` (2), `--z-sticky` (10), `--z-dropdown` (50), `--z-fixed` (100), `--z-modal` (150), `--z-tooltip` (200)

**Transitions/Easing:**
- `--ease-default` (0.3s ease), `--ease-slow` (0.5s ease), `--ease-spring` (0.4s cubic-bezier)

**Breakpoints:**
- `--bp-mobile` (480px), `--bp-tablet` (768px), `--bp-desktop` (1024px)

**Typography Scale:**
- `--fs-{size}`: xs (10.4px), sm (12px), base (14px), md (16px), lg (18px), xl (24px), 2xl (32px), 3xl (44px), 4xl (56px), display (80px)

## Mobile-First Responsive Pattern

**Media Queries:**
- Base styles for mobile first
- `@media (min-width: 768px)` for tablet/desktop
- `@media (min-width: 1024px)` for large desktop
- Examples: `hero_v1.html` lines 317–424, `section-hero-evolved.liquid`

**Accessibility:**
- `@media (prefers-reduced-motion: no-preference)` guards all animations
- `@media (prefers-reduced-motion: reduce)` disables animations for motion-sensitive users
- Always include both guards: enable by default, disable explicitly

## Accessibility

**Patterns:**
- Skip-to-content links: `<a href="#main" class="skip-link">Skip to content</a>`
- Focus management: `tabindex="-1"` on main container for skip-link targeting
- ARIA attributes: `aria-label`, `aria-expanded`, `aria-hidden`, `aria-live="polite"` for dynamic updates
- Button semantics: `role="button"` on labels, `role="img"` on icon spans with `aria-label`
- Menu focus trap (lines 537–567 in `hero_v1.html`): Prevents focus escape during overlay modal
- Keyboard navigation: Escape key closes menu, Tab wraps focus within modal

## Asset Optimization

**Image Loading:**
- `fetchpriority="high"` on critical above-fold images
- `loading="eager"` or `loading="lazy"` explicitly set
- `decoding="async"` on all images for non-blocking decode

**Preload Directives:**
- `<link rel="preload" as="image" href="...">` for critical hero images
- Preload fonts via `@font-face` with `font-display: swap`

---

*Convention analysis: 2026-04-13*
