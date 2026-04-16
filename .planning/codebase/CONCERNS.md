# Codebase Concerns

**Analysis Date:** 2026-04-13

## Tech Debt

**CSS Duplication Across 37 HTML Prototype Files:**
- Issue: All 37 HTML files in root contain `<style>` blocks with inline CSS. Many styles are duplicated across versions (keyframes like `@keyframes fadeIn`, `@keyframes productEntrance`, spacing patterns). No shared stylesheet between prototypes beyond `brand_kit.css` link.
- Files: Root-level HTML files (`hero_v*.html`, `product_v*.html`, `hero_photo_*.html`, `index.html`, `client_review.html`, `mockup_maker.html`, etc.)
- Impact: 22,153 total lines of HTML across 37 files; estimated 30-40% style duplication. Maintenance burden when brand changes (must update multiple files). Larger deployments to Vercel.
- Fix approach: Extract common component styles (buttons, cards, animations, typography) into `brand_kit.css` or new component-specific stylesheets. Reduce inline styles to variant overrides only. Would need refactoring pass on each hero prototype.

**Inconsistent Inline Styles vs CSS Variables:**
- Issue: Prototypes mix CSS variable usage (`var(--mm-cream)`) with hard-coded hex values. Some files use brand_kit tokens correctly; others override with inline styles. E.g., `hero_v10.html` has inline `font-family` and `font-size` attributes instead of CSS classes. Also, some Liquid sections define variables inline (`--he-grad-top`, `--pg-bg`) instead of pulling from centralized brand_kit.
- Files: `hero_v10.html`, `hero_v11.html`, `section-hero-evolved.liquid`, `section-product-grid.liquid`, `main-page.liquid`
- Impact: Inconsistent brand application. If brand colors change, some files won't update (hard-coded values stay static). Complicates future Shopify theme deployment.
- Fix approach: Audit all HTML files and Liquid sections; standardize to CSS variables from `brand_kit.css`. Create a "style audit" checklist verifying no hard-coded colors, fonts, or spacing exist. Enforce in code review.

**Duplicate Backup and Pre-Edit Files:**
- Issue: Untracked prototype versions cluttering root directory. Files like `hero_v10.html.bak`, `hero_v10.html.r20_pre_edit`, `hero_v10.html.r20_d20_2026-03-16.bak` are version history snapshots left in place.
- Files: `hero_v10.html.bak`, `hero_v10.html.r20_pre_edit`, `hero_v10.html.r20_d20_2026-03-16.bak`, `hero_v12.html.r20_pre_edit`, `hero_v13.html.r20_pre_edit`, `hero_v14.html.bak`, `hero_v16.html.bak`, `hero_v13.html.bak`, plus backup files in `mockups/` directory
- Impact: Confuses deployments (Vercel may serve backup files as public routes if not in `.vercelignore`). Takes up repo space. When viewing directory, unclear which is canonical version.
- Fix approach: Delete all `.bak` and `.r20_*` files; rely on git history instead. Verify `.vercelignore` excludes these patterns. Consider naming convention (e.g., `[ARCHIVE]/hero_v10_old.html`) if historical versions need preservation.

## Known Bugs

**Missing `alt` Attributes on 48 Decorative Images:**
- Symptoms: Empty or missing `alt=""` attributes on non-content images in hero files. Screen readers attempt to describe images or skip them silently. Accessibility violation.
- Files: Concentrated in `hero_v15.html` (10 empty `alt`s), `hero_v16.html` (48 empty `alt`s). Scattered across others: `hero_v10.html`, `hero_v12.html`, `hero_v14.html`, etc.
- Trigger: Viewing page with screen reader; attempting to navigate by image.
- Workaround: Add `alt=""` (empty) for purely decorative images, or add descriptive `alt` text if image has semantic meaning. Verify with WAVE or aXe accessibility tools.
- Recommended Fix: Audit all `hero_v*.html` files; categorize images as decorative (set `alt=""`) or content (add meaningful text). Document rationale in comments.

**Incomplete Liquid Section Configurations:**
- Symptoms: Many Liquid sections have minimal `{% schema %}` blocks. E.g., `main-page.liquid` has only `"name"`, `"tag"`, `"class"` fields—no `"settings"` array to customize colors, text, or images in Shopify admin UI.
- Files: `main-page.liquid`, `section-404.liquid` (partial settings), `section-article.liquid`, `section-blog.liquid`, `section-search.liquid`, `section-password.liquid`, `section-list-collections.liquid`
- Trigger: Attempting to customize section in Shopify admin Theme Editor; no settings controls appear.
- Workaround: Edit files directly in Shopify editor or via Git; no GUI customization available.
- Recommended Fix: Complete `{% schema %}` blocks with color, text, and image settings matching the HTML's design intent. Use `presets` for default layouts.

**Content-Security-Policy Allows `unsafe-inline` for Styles and Scripts:**
- Symptoms: CSP header in `vercel.json` permits `style-src 'unsafe-inline'` and `script-src 'unsafe-inline'`. Protects against basic XSS but allows attack vectors if any user input reaches `<style>` or `<script>` tags.
- Files: `vercel.json` (line 19)
- Impact: Weakened security posture. If form input or third-party service injects malicious CSS/JS, it executes unblocked.
- Current mitigation: Static site (no user input processed on frontend). Shopify backend validates form data. No dynamic script generation.
- Recommendations: (1) Move inline styles to external stylesheets to remove `style-src 'unsafe-inline'`. (2) Extract JavaScript to `.js` files and use nonce-based CSP for dynamic scripts. (3) Add `img-src 'https:' data:;` instead of pinimg-specific allowlist (currently restricted to `https://i.pinimg.com`). (4) Restrict `frame-src` to specific domains if embedding third-party iframes.

## Performance Bottlenecks

**Asset Directory Size (569 MB) with Large Unoptimized Product Images:**
- Problem: `/assets/product_shots/` contains 208 MB of unoptimized PNG files. Individual product mockups exceed 8 MB (e.g., `moon_pure_carob.png` 8.2 MB, `moon_cayenne.png` 8.8 MB). Multiple large PNG files in `/assets/product_shots/moons/` and `/assets/product_shots/bars/` directories.
- Files: `assets/product_shots/moon_*.png`, `assets/product_shots/bar_*.png`, `assets/product_shots/moons/*@2x.png` (7–9 MB each), `/assets/hero_shots/blue_fog_001.png` (15 MB)
- Current capacity: Vercel has no bandwidth limits, but Lighthouse performance scores degrade with >5 MB images. Mobile users experience slow loads.
- Scaling path: (1) Convert all PNG to WebP format with srcset fallbacks. (2) Implement lazy loading (`loading="lazy"`) on all product images. (3) Generate responsive image sets (600px, 1200px) instead of 2x mockups. (4) Move hero moodboard images to CDN with on-demand transformation (Cloudinary, Imgix). (5) Target product images <2 MB each, hero backgrounds <3 MB.

**No Image Lazy Loading in Hero HTML Files:**
- Problem: Hero files reference large background images and product shots without `loading="lazy"`. Main hero image loads synchronously, delaying LCP (Largest Contentful Paint).
- Files: All `hero_v*.html` files, particularly `hero_v1.html` through `hero_v19.html`
- Cause: Prototypes prioritized visual quality over Core Web Vitals.
- Improvement path: Add `loading="lazy"` to `<img>` tags for below-fold images. Use `fetch-priority="high"` for hero product images. Add `decoding="async"` to prevent layout thrashing.

**Large Uncompressed HTML Files (500–1200 lines per prototype):**
- Problem: Each hero prototype is 500–1200 lines of HTML with embedded `<style>` blocks. No minification or bundling. Prototype discovery tools (presentation.html, review.html, mockup_maker.html) render all 37 hero previews client-side.
- Files: `hero_v*.html` (659–973 lines each), `presentation.html` (955 lines), `review.html` (complex DOM generation)
- Impact: Initial page load builds massive DOM; JavaScript DOM manipulation (innerHTML usage) on slow networks causes interaction delay.
- Improvement path: (1) Split hero prototypes into smaller modules (e.g., hero base + variant overrides). (2) Lazy-load prototypes in gallery pages. (3) Extract common HTML patterns into templates. (4) Minify before Vercel deployment.

## Fragile Areas

**Prototype Gallery Pages Tightly Coupled to Hard-Coded Hero Lists:**
- Files: `presentation.html`, `review.html`, `mockup_maker.html`, `triage.html`
- Why fragile: These pages contain hand-coded JavaScript with hero file lists: `const HEROES = ['hero_v1.html', 'hero_v2.html', ...]`. Adding a new hero requires manual edits in 4 files. Easy to miss, causing broken links or missing previews.
- Safe modification: Create a `config/heroes.json` file listing all hero metadata. Load it dynamically in gallery pages via fetch. Ensure it's version-controlled so git history tracks changes.
- Test coverage gaps: No test confirming all listed heroes exist. No validation that hero files parse correctly.

**Shopify Liquid Sections Depend on Adobe Fonts Not Being Loaded by Main Theme:**
- Files: All sections in `sections/` reference P22 Mackinac Pro and Neue Haas Grotesk via `font-family` CSS but lack `@font-face` declarations. They assume `layout/theme.liquid` or Shopify admin loads Adobe Fonts globally.
- Why fragile: If theme layout changes or Adobe Fonts fail to load, entire section typography breaks (falls back to Georgia/Helvetica). Current template has this commented out: `{%- comment -%} <link rel="stylesheet" href="https://use.typekit.net/XXXXXXX.css"> {%- endcomment -%}` in `layout/theme.liquid`.
- Safe modification: Move font `@font-face` declarations into a shared snippet (`snippets/brand-fonts.liquid`), included in both `layout/theme.liquid` and all sections. Or embed font files locally with `font-face`.
- Test coverage: No visual regression test verifying fonts load.

**Product Image Paths Hard-Coded in Sections Without Asset_URL Filter:**
- Files: Several Liquid sections reference images without proper Shopify asset path handling. E.g., `section-hero-evolved.liquid` references `{{ section.settings.watermark_image | image_url: width: 600 }}` but other hardcoded paths like `<img src="assets/hero_shots/...">` won't resolve on live store.
- Why fragile: When theme installed on Shopify, paths like `assets/hero_shots/silhouette_closeup.webp` may not match theme asset file structure. Requires manual path remapping.
- Safe modification: Audit all Liquid files; replace hardcoded asset paths with `{{ 'filename.webp' | asset_url }}` filter. Move all static assets into Shopify theme `assets/` folder structure.

**Accessibility Attributes Inconsistently Applied Across Hero Variants:**
- Files: Some heroes (`hero_v1.html`, `hero_v11.html`, `hero_v12.html`, `hero_v13.html`) implement ARIA labels and roles correctly; others don't. E.g., `hero_v16.html` has 48 empty `alt` attributes but no compensating ARIA.
- Why fragile: When client requests new hero variant, developers might copy old prototype without accessibility attributes. Causes accessibility compliance drift.
- Safe modification: Document accessibility checklist in `CONVENTIONS.md`. Include template with required ARIA attributes in hero boilerplate.
- Test coverage: No automated accessibility testing (aXe, WAVE integration).

## Scaling Limits

**Repository Size and Deployment Performance:**
- Current capacity: 1.4 GB repo; 569 MB assets. Vercel cold starts may slow with repo >1 GB.
- Limit: Git operations (clone, pull, push) slow; CI/CD build times increase.
- Scaling path: (1) Move assets to Shopify CDN once theme is live (don't store 569 MB in git). (2) Archive old prototype versions to separate branch or external storage. (3) Implement shallow clones (`git clone --depth 1`) for CI/CD.

**Prototype Management (37 HTML Files):**
- Current capacity: 37 standalone HTML files all in root.
- Limit: Beyond ~20 variations, directory becomes unmanageable. Discovery/curation tools (presentation.html) must update manually.
- Scaling path: (1) Organize prototypes into versioned folders (`prototypes/v1/`, `prototypes/v2/`) by iteration. (2) Use metadata file (`config/prototype-manifest.json`) instead of hard-coded arrays. (3) Build a static site generator (11ty, Hugo) to template prototypes from components.

## Security Considerations

**Shopify Form Submissions in Liquid Sections Without CSRF Tokens:**
- Risk: Newsletter signup form in `section-footer.liquid` uses standard `{% form 'customer' %}`, which Shopify handles, but custom JavaScript dispatch events (`cart:updated`) could be spoofed if attacker injects custom events.
- Files: `sections/section-footer.liquid`, `sections/section-header.liquid`
- Current mitigation: Shopify theme form endpoints are protected by CSRF tokens handled server-side. AJAX `/cart/add.js` requires Shopify session.
- Recommendations: (1) Verify all form handling uses Shopify's `form` tag syntax. (2) Never accept user input in JavaScript without validation. (3) Sanitize any user-generated content before rendering (currently none, but plan ahead).

**Open Pinterest Iframe via CSP:**
- Risk: CSP `img-src` allows `https://i.pinimg.com`. If application later embeds Pinterest pins via iframe, CSP must be updated.
- Files: `vercel.json` line 19
- Current mitigation: No Pinterest iframes currently embedded; restriction is cautious.
- Recommendations: Remove Pinterest allowlist if not used. If Pinterest integration planned, add specific `frame-src` directive instead.

**innerHTML Usage in Preview/Admin Pages:**
- Risk: `presentation.html`, `review.html`, `mockup_maker.html` use `innerHTML` to dynamically build preview grids. If future versions accept user-named hero files or custom metadata, XSS vulnerability possible.
- Files: `index.html`, `review.html`, `presentation.html`, `mockup_maker.html`
- Current mitigation: These are static data; no user input processed.
- Recommendations: (1) Replace innerHTML with textContent where possible. (2) If user input ever processed, use `createElement` + `appendChild` instead of innerHTML. (3) Add CSP `script-src` nonce to allow only verified scripts.

## Test Coverage Gaps

**No Automated Accessibility Testing:**
- What's not tested: WCAG 2.1 AA compliance. Screen reader compatibility. Keyboard navigation. Color contrast.
- Files: All HTML and Liquid section files
- Risk: Accessibility issues (missing alt text, improper ARIA) shipped to production unnoticed. Barrier for disabled users.
- Priority: High — MapleMoon brand emphasizes inclusivity; accessibility failures damage reputation.
- Recommended Fix: Add axe-core integration in CI pipeline. Test hero variants for contrast, ARIA, alt attributes. Verify keyboard nav on interactive elements (category picker, menu toggle).

**No Lighthouse / Core Web Vitals Testing:**
- What's not tested: LCP, CLS, FID/INP on hero pages. Image optimization effectiveness. CSS/JS bundle sizes.
- Files: `vercel.json` build config has no Lighthouse check
- Risk: Performance regressions ship unnoticed. Large image updates degrade mobile experience.
- Priority: Medium — Affects user experience and SEO ranking.
- Recommended Fix: Integrate Lighthouse CI. Set performance budgets for hero pages (<3 sec LCP on 4G). Block PRs exceeding budgets.

**No Visual Regression Testing for Hero Variants:**
- What's not tested: CSS changes in `brand_kit.css` or Liquid sections don't break hero rendering. Font loading failures caught.
- Files: No regression test suite
- Risk: Brand color change applied to brand_kit.css; one hero doesn't update due to hard-coded value. Not caught until manual review.
- Priority: Medium — Maintenance burden increases with more heroes.
- Recommended Fix: Screenshot comparison tool (Percy, Chromatic) on each hero variant. Verify all visuals match expected output after CSS updates.

**No Liquid Schema Validation:**
- What's not tested: Section schemas are valid JSON. Settings referenced in Liquid template match schema definition.
- Files: All `sections/*.liquid` files with `{% schema %}` blocks
- Risk: Malformed schema breaks Shopify admin UI. Undefined settings referenced in templates cause silent failures.
- Priority: Medium — Will surface immediately upon Shopify installation but wastes time debugging.
- Recommended Fix: Add schema validation script in CI (e.g., `shopify theme check`). Verify all `section.settings.*` references exist in schema.

## Dependencies at Risk

**Adobe Fonts (P22 Mackinac Pro, Neue Haas Grotesk) Not Self-Hosted:**
- Risk: Theme depends on external Adobe Fonts CDN. If service degrades or company discontinues fonts, site typography breaks. No local fallback fonts defined at adequate specificity.
- Impact: Core brand identity (serif headlines, sans body) not guaranteed.
- Current mitigation: Fallback fonts defined (`Georgia`, `Helvetica Neue`) but not visually equivalent.
- Migration plan: (1) Download font files locally; host via Shopify CDN or self-hosted. (2) Update `@font-face` to reference local URLs. (3) Use `font-display: swap` (already in use) to prevent FOUT.

**Vercel Static Hosting Dependency:**
- Risk: Preview site (maplemoon-website.vercel.app) hosted on Vercel. If service becomes unavailable, preview URLs break. Client review links expire if Vercel project deleted.
- Impact: Loss of shareable prototype links; client feedback history lost if not documented.
- Current mitigation: Prototypes stored in Git; can be re-deployed to alternative CDN.
- Migration plan: (1) Document all prototype URLs and Git commit hashes. (2) Keep backups of Vercel `vercel.json` and deployment logs. (3) Plan migration path to Shopify CDN once theme goes live.

## Missing Critical Features

**No Form Validation on Newsletter Signup:**
- Problem: Footer form submits to Formspree without client-side email validation. Invalid emails fail silently at server.
- Files: `section-footer.liquid` (form action to Formspree)
- Blocks: Email validation flows can't offer immediate user feedback.
- Recommended Fix: Add `<input type="email" required>` and client-side validation before submit. Display error states.

**No Cart Drawer / Side Panel:**
- Problem: Header cart icon increments count but doesn't show drawer preview. Customers must navigate to full cart page to review items.
- Files: `section-header.liquid` (cart badge only)
- Blocks: Impulse checkout flow. Users don't see what they added without page nav.
- Recommended Fix: Build cart slide-out panel triggered by header icon. Display line items, totals, proceed-to-checkout button. Sync with `cart:updated` event.

**No Product Recommendations / "You May Also Like":**
- Problem: Single product page doesn't recommend complementary items. No upsell/cross-sell sections.
- Files: `section-product-main.liquid` (ends with reviews)
- Blocks: Lost revenue opportunity on PDP.
- Recommended Fix: Add "Related Products" grid at bottom of `section-product-main.liquid` pulling from product collections or Shopify recommendations app.

## Summary of Priority Fixes

| Issue | Severity | Timeline | Effort |
|-------|----------|----------|--------|
| Image optimization (569 MB assets) | High | Before launch | 1–2 weeks |
| Accessibility audit + fixes (48 missing alts, ARIA gaps) | High | Before launch | 1 week |
| Liquid section schema completion | Medium | Before launch | 3–5 days |
| CSS duplication extraction | Medium | Post-launch Phase 1 | 2 weeks |
| Backup file cleanup | Low | Immediate | 30 mins |
| Hero list configuration externalization | Low | Post-launch Phase 1 | 2 days |

---

*Concerns audit: [2026-04-13]*
