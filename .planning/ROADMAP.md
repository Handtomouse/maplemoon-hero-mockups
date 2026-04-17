# ROADMAP.md

## Milestone: v1.0 — Horizon 2 Design Overhaul

### Phase 1: Design Elevation Sprint
- **Goal:** Make the existing 7 pages not boring. Pull forward premium DTC design patterns from the ultra build spec into the current static HTML pages.
- **Deliverables:**
  - [ ] 1.1 Homepage redesign — add editorial scroll storytelling, parallax hero, richer section transitions, generous whitespace
  - [ ] 1.2 Typography and spacing pass — enforce P22 Mackinac Pro + Neue Haas Grotesk hierarchy across all pages, tighten heading/body rhythm
  - [ ] 1.3 Motion layer — fade-up scroll reveals, subtle parallax on hero images, smooth warm-to-dark section gradients (all with reduced-motion guards)
  - [ ] 1.4 Navigation elevation — glassmorphism header, header-scrolled state, dark mode header for elixir sections via Intersection Observer
  - [ ] 1.5 PDP elevation — product image gallery (hero + thumbnails), richer buy box layout, editorial product description styling
  - [ ] 1.6 About page elevation — full-width hero with gradient overlay, alternating split sections, process timeline (Pod > Roast > Mill > Temper > Pack)
  - [ ] 1.7 Collection page elevation — collection hero banner, refined product card grid, hover states
  - [ ] 1.8 Dark elixir sections — verify dark palette consistency across Spiced Elixir PDP and homepage elixir showcase
  - [ ] 1.9 Component library — document button variants (primary/secondary/ghost), card patterns (product/story/feature), trust badges in brand_kit.css
- **Dependencies:** None (works on existing pages)
- **Estimated effort:** 2-3 sessions
- **UAT criteria:**
  - Every page feels premium at 375px, 768px, and 1440px
  - No layout breaks, no placeholder text visible
  - Motion is subtle and enhanceable (reduced-motion safe)
  - Competitive comparison: can sit next to Aesop/Koko Black screenshots without embarrassment
  - V7+V11 fusion palette consistent across all pages (warm default, dark elixir only)

### Phase 2: Photography Integration
- **Goal:** Wire the unused 27 AI-generated images into pages and prepare a creative brief for the real 2-day photoshoot.
- **Deliverables:**
  - [ ] 2.1 Audit all 460 media assets — catalogue approved (17), maybe (31), AI-generated (27), categorise by page destination
  - [ ] 2.2 Wire AI images into pages — hero shots, product lifestyle, about page photography, collection banners
  - [ ] 2.3 Generate additional AI category banners for Moons and Eclipse Bites (Bars and Elixirs already done)
  - [ ] 2.4 Image optimisation — WebP conversion, responsive srcset, lazy loading, max 200KB per hero image
  - [ ] 2.5 Photoshoot creative brief — 2-day structure (Day 1 studio packshots 90 images, Day 2 lifestyle/hero 32 images), shot list prioritised by page need
  - [ ] 2.6 "Needs from Carli" list — real product in correct wrappers, bar cross-sections, kitchen/production access, founder portraits
- **Dependencies:** Phase 1 (pages need to be elevated before photography placement makes sense)
- **Estimated effort:** 2 sessions
- **UAT criteria:**
  - Zero broken image icons on any page
  - No watermarked or placeholder stock images visible
  - Hero images under 200KB each (WebP)
  - Photoshoot brief is actionable by any local photographer
  - "Needs from Carli" list ready to hand over at meeting

### Phase 3: Additional Pages
- **Goal:** Build the remaining pages to reach 12+ page complete site.
- **Deliverables:**
  - [ ] 3.1 Contact page — form + info@maplemoon.com.au + Byron Bay location map placeholder
  - [ ] 3.2 Wholesale page — B2B enquiry form, wholesale info, minimum order details, existing stockist logos
  - [ ] 3.3 Cart page — line items, quantities, subtotal, checkout CTA (static demo, wired for Shopify AJAX in Phase 6)
  - [ ] 3.4 Blog shell — journal listing page with 2-3 placeholder posts, article template
  - [ ] 3.5 Shop All collection page — full product grid (20 SKUs), filter/sort stretch
  - [ ] 3.6 Moons collection page — dedicated grid for 6 moon flavours
  - [ ] 3.7 Eclipse Bites collection page — dedicated grid
  - [ ] 3.8 Cross-page navigation update — wire all new pages into header/footer/mobile menu
  - [ ] 3.9 vercel.json route updates for new pages
- **Dependencies:** Phase 1 (design system must be elevated before building more pages in it)
- **Estimated effort:** 2-3 sessions
- **UAT criteria:**
  - All pages render at 375/768/1440px without breaks
  - Navigation works across all 12+ pages (no dead links)
  - V7+V11 fusion consistent on every new page
  - Forms submit (or show appropriate placeholder behaviour)
  - Cart page has functional line-item UI (quantities, remove, subtotal)

### Phase 4: Creative Strategy
- **Goal:** Define brand positioning, content strategy, and emotional storytelling that justifies premium pricing and differentiates MapleMoon from competitors.
- **Deliverables:**
  - [ ] 4.1 Competitive analysis — Aesop (minimalist/literary), Koko Black (luxury/gifting), Haigh's (heritage/craft), Pana Chocolate (health/Byron Bay). Document what MapleMoon can own.
  - [ ] 4.2 Brand positioning document — "Not trying to be chocolate. It's carob." Five pillars: Authenticity, Craft, Provenance, Simplicity, Joy.
  - [ ] 4.3 Content strategy guide — voice (warm, direct, confident), photography (editorial, warm-lit, tactile), copy cadence (short sentences, statements not explanations)
  - [ ] 4.4 Homepage emotional arc mapping — Curiosity > Education > Trust > Desire > Action, with section-by-section breakdown
  - [ ] 4.5 Product positioning matrix — each product's unique angle, primary audience, key selling point
  - [ ] 4.6 Apply strategy to existing copy — rewrite any sections that don't match the voice guide
- **Dependencies:** Phase 1 (need elevated pages as canvas), Phase 2 (need photography plan aligned with brand direction)
- **Estimated effort:** 1-2 sessions
- **UAT criteria:**
  - Brand positioning is distinct from all 4 competitors analysed
  - Copy across all pages matches the voice guide (warm, direct, confident, not precious)
  - Homepage follows the 5-stage emotional arc
  - Every product has a documented unique angle

### Phase 5: Conversion Optimisation
- **Goal:** Optimise every page for purchase conversion, email capture, and return visits.
- **Deliverables:**
  - [ ] 5.1 Conversion audit — per-page checklist (primary CTA above fold, trust signals within 2 scrolls of CTA, social proof present)
  - [ ] 5.2 CTA hierarchy — primary, secondary, tertiary CTAs per page, documented
  - [ ] 5.3 Email capture — newsletter signup in footer (already wired), exit-intent or scroll-triggered popup, welcome flow outline for Klaviyo
  - [ ] 5.4 Social proof integration — review placeholders on PDPs, stockist logos, "handmade in small batches" authenticity signals
  - [ ] 5.5 Cross-sell and upsell — "You might also like" on PDPs (already started), bundle suggestions, category cross-links
  - [ ] 5.6 SEO implementation — schema markup (Product, Organization, FAQ, BreadcrumbList), meta from content/meta_seo.md, sitemap
  - [ ] 5.7 Analytics setup plan — Meta Pixel events, GA4 enhanced e-commerce, Hotjar heatmaps for first 30 days
- **Dependencies:** Phase 3 (all pages must exist), Phase 4 (CTAs must align with brand voice)
- **Estimated effort:** 1-2 sessions
- **UAT criteria:**
  - Every page has a visible primary CTA above the fold
  - Email capture is present on every page (footer) plus one additional trigger
  - Schema markup validates in Google Rich Results Test
  - Core Web Vitals: LCP < 2.5s, CLS < 0.1

### Phase 6: Shopify Theme Installation
- **Goal:** Install the static HTML site as a live Shopify theme with working e-commerce.
- **Deliverables:**
  - [ ] 6.1 Shopify store setup — products (20 SKUs), collections (Bars, Moons, Eclipse Bites, Elixirs, All), settings (AUD, AEST, AU shipping zones)
  - [ ] 6.2 Theme installation — copy sections/, templates/, layout/, config/, snippets/ to theme
  - [ ] 6.3 Font loading — P22 Mackinac Pro via Google Fonts, Inter fallback
  - [ ] 6.4 Metafield setup — custom.tagline definition, pagination wrappers
  - [ ] 6.5 App stack — Klaviyo (email), Judge.me or Loox (reviews), GA4 + Meta Pixel (analytics), Rewind (backups)
  - [ ] 6.6 Payment configuration — Shopify Payments (Stripe) + PayPal + Afterpay
  - [ ] 6.7 Shipping configuration — Standard $16.95, Free over $99
  - [ ] 6.8 HANDOFF.md testing checklist — 7 items from existing handoff doc
  - [ ] 6.9 Replace watermarked images with licensed originals
- **Dependencies:** Carli provides Shopify store access + deposit + SKU/pricing docs. Phase 5 (conversion elements must be ready).
- **Estimated effort:** 2-3 sessions
- **UAT criteria:**
  - All 20 products live with correct pricing, images, descriptions
  - Checkout flow works end-to-end (test order placed and refunded)
  - Klaviyo email capture functional
  - Reviews app installed and collecting
  - All Liquid sections render correctly across 3 breakpoints
  - HANDOFF.md 7-item checklist passes

### Phase 7: Launch
- **Goal:** Transfer domain, go live, execute launch campaign, and monitor.
- **Deliverables:**
  - [ ] 7.1 Domain migration plan — add maplemoon.com.au to Shopify, update DNS, verify SSL, preserve MX records for info@maplemoon.com.au
  - [ ] 7.2 Zero-downtime cutover — add domain before removing from old host
  - [ ] 7.3 Final content review with Carli — all pages, all products, all copy
  - [ ] 7.4 Remove Shopify password page
  - [ ] 7.5 Submit sitemap to Google Search Console
  - [ ] 7.6 Launch announcement — "Something's brewing" teaser (email + Instagram), launch day site-live announcement, first-order incentive
  - [ ] 7.7 Post-launch monitoring — Core Web Vitals for 48 hours, first 10 orders processed, hotjar heatmaps active
  - [ ] 7.8 Handover documentation — Carli/Dylan self-service guide for product updates, content changes
- **Dependencies:** Phase 6 (Shopify must be fully set up and tested)
- **Estimated effort:** 1-2 sessions
- **UAT criteria:**
  - Domain resolves to Shopify store with valid SSL
  - Email (info@maplemoon.com.au) continues working (MX records preserved)
  - Core Web Vitals green for 48 hours post-launch
  - First 10 orders processed successfully
  - Carli can independently add/edit products and update content
  - Rollback procedure documented and tested

---

## Backlog (999.x)
- 999.1 International shipping configuration
- 999.2 Wholesale portal / B2B channel
- 999.3 Blog content creation (beyond shell)
- 999.4 Saudi export / Arabic label integration on website
- 999.5 Search functionality
- 999.6 Loyalty/rewards programme
- 999.7 Subscription/auto-reorder for regular customers
