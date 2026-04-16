# MapleMoon Ultra Build: Design Specification

**Date:** 2026-04-16
**Author:** Nate Don / HandToMouse Studio
**Status:** Draft
**Scope:** Full website build across 8 dedicated teams, 2 horizons

---

## 1. Project Context

### What Exists

MapleMoon is an artisan carob brand from Byron Bay. The website build has been in progress since Feb 2026 with 125 commits across the `paper-shopify-heroes` branch.

**Built and production-ready:**
- 52KB V7+V11 fused homepage (static HTML, deployed to Vercel)
- 18 Shopify Liquid 2.0 sections (8 core, 10 scaffolded)
- 11 JSON templates for full Shopify theme
- Brand design system (`brand_kit.css` with CSS custom properties)
- 19 hero concept prototypes and 5 product page variants
- 460 media assets (683MB) across 14 subdirectories
- Full content library (product descriptions, about copy, FAQ, SEO meta, hero copy)
- AJAX cart, newsletter signup, variant switching all wired
- Accessibility audit passed (WCAG AAA, skip links, ARIA, motion guards)

**Approved by client (Apr 3 call):**
- V7+V11 fusion direction
- Warm carob palette for bars (#F5F0E8, #5C3D2E), dark smoke for elixirs
- Cornflower blue accent (#7B9DBF)
- Origin story front and centre
- Three product categories: Bars / Moons / Elixirs

**Not yet built:**
- Product detail pages in V7+V11 fusion style
- About/Our Story expanded page
- Collection/Shop pages
- Contact/Stockists page
- Cart page with V7+V11 treatment
- Blog shell
- Reviews app integration
- Shopify store setup and domain transfer

### Client Relationship

- **Contacts:** Carli (primary decision-maker), Dylan (co-founder)
- **Trust level:** High ("We trust you, you've got this" / "You're killing it")
- **Payment history:** Excellent ($22K lifetime, 6.4-day avg lag, zero follow-ups)
- **Revenue:** ~$20K/month gross, targeting $30K
- **Meeting:** In-person Sydney Apr 17-20 (date/time TBD)

### Commercial Context

- INV-0365: $671.58 outstanding (paused, do not chase)
- Billing model: Project-based (not hourly)
- Shopify build quoted at $13,206 core (30/40/30 milestone terms recommended)

---

## 2. Architecture Decision: Stay Static HTML for Now

The current homepage is a 52KB static HTML file with inline CSS/JS. The Shopify Liquid sections exist in parallel but are designed for future theme installation.

**Decision:** Continue building pages as static HTML for the meeting demo and Vercel preview. The Shopify Liquid sections are already written and tested. Theme installation happens post-meeting when Carli provides Shopify store access, deposit, and SKU/pricing docs.

**Rationale:**
- Static HTML deploys instantly to Vercel (no build step)
- Carli can review the full site at maplemoon-website.vercel.app without Shopify setup
- Liquid sections are already 95% production-ready and can be installed later
- No framework overhead for a demo/presentation site
- The content, design tokens, and CSS all transfer directly to Shopify

**What this means for teams:** All page builds target static HTML with the V7+V11 fusion treatment. Shopify-specific wiring (cart AJAX, variant switching, metafields) happens in Horizon 2 during theme installation.

---

## 3. Design System Specification (Team 1)

### Mission
Extend `brand_kit.css` into a complete, documented design system that enforces V7+V11 fusion across every page and component.

### Palette

**Warm Mode (Bars, Moons, Story, Default):**

| Token | Value | Usage |
|-------|-------|-------|
| `--warm-bg` | `#F5F0E8` | Page background |
| `--warm-bg-alt` | `#EDE7DA` | Alternate section background |
| `--carob-warm` | `#5C3D2E` | Primary headings, strong text |
| `--carob-mid` | `#8B6F5E` | Secondary text |
| `--carob-light` | `#B8A08E` | Muted text, captions |
| `--cream-warm` | `#FAF7F0` | Card backgrounds, overlays |
| `--accent-blue` | `#7B9DBF` | CTAs, links, accent elements |
| `--text-primary` | `#3A2A1C` | Body text |
| `--text-secondary` | `#6B5A4A` | Subheadings |
| `--text-muted` | `#9B8A7A` | Labels, metadata |
| `--border-light` | `rgba(90, 60, 40, 0.1)` | Dividers, card borders |

**Dark Mode (Elixirs Only):**

| Token | Value | Usage |
|-------|-------|-------|
| `--elixir-dark` | `#1E2A1E` | Section background |
| `--elixir-text` | `#E7E4CA` | Text on dark |
| `--elixir-accent` | `#7B9DBF` | Same cornflower accent |

### Typography

| Role | Font | Weight | Size Range |
|------|------|--------|------------|
| Display | P22 Mackinac Pro | 400, 500 | 40-80px |
| Heading | P22 Mackinac Pro | 400 | 24-36px |
| Body | Neue Haas Grotesk / Inter | 300, 400 | 15-18px |
| Label | Neue Haas Grotesk / Inter | 500 | 11-13px, uppercase, tracked |
| CTA | Neue Haas Grotesk / Inter | 500 | 13-15px, uppercase, tracked |

**Rules:**
- P22 Mackinac Pro: weights 400/500 ONLY. Never bold.
- Gold `#E1D78E` is decorative only. Never for readable text.
- Navy `#1E4366` is text-on-cream only. Brand accent is cornflower `#7B9DBF`.
- Body line-height: 1.6-1.7. Heading line-height: 1.1-1.2.

### Component Library

**Buttons:**
- Primary: cornflower `#7B9DBF` bg, white text, 12px 32px padding, 6px radius, uppercase, tracked
- Secondary: transparent, cornflower border, cornflower text
- Ghost: transparent, underline on hover
- All: 44px minimum touch target, hover opacity 0.85, transition 0.2s

**Cards:**
- Product card: cream-warm bg, 12px radius, subtle shadow, image top, name + price bottom
- Story card: full-bleed image, overlay text, 8px radius
- Feature card: icon + heading + description, warm-bg, no border

**Navigation:**
- Desktop: fixed glassmorphism bar, logo left, nav centre, cart right
- Mobile: hamburger, full-screen overlay, serif links, dividers
- Header transitions to opaque on scroll (warm-bg with blur)
- Dark mode header for elixir sections (automatic via Intersection Observer)

**Trust Badges:**
- Row of 4-6 SVG icons (Organic, Vegan, Caffeine-Free, Gluten-Free, Made in Aus)
- 48px icon size, carob-mid colour, centred row with 24px gap
- Appear in hero section, product pages, and footer

**Section Transitions:**
- Warm-to-dark: gradient blend over 100px
- Section spacing: 80px desktop, 48px mobile
- Subtle parallax on hero images (respects reduced-motion)

### Deliverables
1. Extended `brand_kit.css` with all tokens above
2. Component stylesheet or inline patterns for buttons, cards, badges, nav
3. Dark/light section switching CSS (class-based, not media query)
4. Documented token reference (inline comments in CSS)

---

## 4. UX / Information Architecture (Team 2)

### Mission
Define the complete site structure, user flows, and navigation hierarchy.

### Site Map

```
maplemoon.com.au/
|-- / (Homepage - V7+V11 fusion)
|   |-- Hero with flavour picker
|   |-- Product showcase (Bars / Moons / Elixirs)
|   |-- Our Story teaser
|   |-- The Range (full product grid)
|   |-- Certification badges
|   |-- Newsletter signup
|
|-- /collections/bars (Carob Bars collection)
|-- /collections/moons (Crescent Moons collection)
|-- /collections/elixirs (Carob Elixirs collection)
|-- /collections/eclipse-bites (Eclipse Bites collection)
|-- /collections/all (Shop All)
|
|-- /products/:handle (Product detail pages)
|   |-- 6 bars, 6 moons, 5 eclipse bites, 2 elixirs, 1 powder = 20 products
|
|-- /pages/our-story (About / Origin)
|-- /pages/what-is-carob (Educational)
|-- /pages/faq (FAQ accordion)
|-- /pages/contact (Contact + stockist enquiry)
|-- /pages/wholesale (B2B enquiries)
|
|-- /blogs/journal (Blog - future)
|
|-- /cart (Shopping cart)
```

### User Personas & Flows

**Persona 1: Health-Conscious Shopper**
- Entry: Google search "organic carob bars australia" or Instagram
- Flow: Homepage hero > "What is Carob?" education > Browse bars > PDP (reads ingredients) > Add to cart > Checkout
- Key friction: "Is this actually good?" -- needs taste/quality signals (reviews, photography, story)
- Conversion triggers: Organic/vegan badges, ingredient transparency, "naturally sweet" messaging

**Persona 2: Gift Buyer**
- Entry: Direct link or Google "byron bay food gifts"
- Flow: Homepage > Browse range > Finds gift box / bundle > PDP > Add to cart
- Key friction: "Will this arrive in time? Does it look premium enough?"
- Conversion triggers: Premium photography, gift-ready packaging shots, shipping info

**Persona 3: Wholesale / Stockist**
- Entry: Direct (business card, word of mouth) or Google "carob wholesale australia"
- Flow: Homepage > Footer "Wholesale" link > Wholesale enquiry form
- Key friction: "Is this brand serious enough for my shelves?"
- Conversion triggers: Professional site, clear pricing tiers, existing stockist logos

### Navigation Hierarchy

**Primary Nav (Desktop):** Bars | Moons | Elixirs | Our Story | Shop All
**Mobile Nav:** Same + FAQ, Contact, Wholesale
**Footer Nav:** Shop All | Our Story | FAQ | Contact | Wholesale | Shipping & Returns
**Utility:** Cart icon (with count badge) | Search (stretch goal)

### Page Priority Matrix

| Page | Meeting Demo | Launch Required | Revenue Impact |
|------|:---:|:---:|:---:|
| Homepage | YES | YES | HIGH |
| PDP (bars) | YES | YES | CRITICAL |
| PDP (moons) | YES | YES | HIGH |
| Collection (bars) | YES | YES | HIGH |
| About/Story | YES | YES | MEDIUM |
| Collection (all) | - | YES | HIGH |
| Contact | - | YES | LOW |
| FAQ | - | YES | LOW |
| Wholesale | - | YES | MEDIUM |
| Cart | - | YES | CRITICAL |
| Blog | - | STRETCH | LOW |
| Elixirs PDP | - | YES | MEDIUM |

### Deliverables
1. Site map document (above, finalised)
2. User flow diagrams for 3 personas
3. Navigation hierarchy with mobile/desktop variants
4. Page priority matrix for build ordering

---

## 5. Frontend Development (Team 3)

### Mission
Build all remaining pages using V7+V11 fusion design language. Static HTML targeting Vercel preview, with content from the existing `content/` directory.

### Pages to Build

**Priority 1 (Meeting Demo):**

1. **Product Detail Page (PDP)** - `/products/pure-carob-bar.html`
   - V7+V11 fusion treatment applied to existing `product_v7a.html` patterns
   - Image gallery (hero shot + 3-4 thumbnails)
   - Buy box: product name, price ($12.95), variant selector (if applicable), Add to Cart CTA
   - Tabs: Details (from product_descriptions.md long copy), Ingredients, Reviews (placeholder)
   - Trust badges row
   - "You might also like" product grid (3-4 items)
   - Dark smoke treatment for elixir PDPs
   - One template, populated per-product with different content
   - **Build 3 demo PDPs:** Pure Carob Bar, Peppermint Moon, Spiced Elixir

2. **About / Our Story** - `/our-story.html`
   - Content from `content/about_page.md` (Origin, Process, Mission sections)
   - Full-width hero: Byron Bay landscape (silhouette image from approved assets)
   - Split sections: story text + photography
   - Timeline or progression: Pod > Roast > Mill > Temper > Pack
   - Founder section (Carli + Dylan - placeholder until real photos)
   - Warm palette throughout

3. **Collection Page** - `/collections/bars.html`
   - Product grid: 6 bars in 3x2 desktop, 2x3 tablet, 1-column mobile
   - Product cards: image, name, price, "Shop Now" link
   - Collection hero banner at top
   - Filter/sort (stretch goal for demo, required for launch)

**Priority 2 (Post-Meeting, Pre-Launch):**

4. **Shop All** - `/collections/all.html`
5. **FAQ** - `/faq.html` (content from `content/faq.md`, use accordion pattern)
6. **Contact** - `/contact.html` (form + info@maplemoon.com.au + Byron Bay location)
7. **Wholesale** - `/wholesale.html` (enquiry form + wholesale info)
8. **Cart** - `/cart.html` (line items, quantities, checkout CTA)

### Technical Patterns

- Each page is self-contained HTML with inline `<style>` and `<script>`
- All pages link `brand_kit.css` for design tokens
- Shared header/footer markup copied into each page (not templated, since static HTML)
- Images reference `assets/` directory (relative paths)
- Responsive: mobile-first CSS, breakpoints at 480/768/1024px
- Accessibility: skip links, semantic HTML, ARIA, focus states, reduced-motion guards
- Dark section switching: `.section-dark` class triggers elixir palette via CSS

### Deployment
- Vercel static hosting (existing setup)
- `vercel.json` routes updated for new pages
- No build step required

### Deliverables
1. 3 demo PDPs (bar, moon, elixir) with V7+V11 fusion
2. About/Our Story page
3. Collection page (bars)
4. Updated navigation across all pages (homepage + new pages)
5. Updated `vercel.json` with routes for new pages

---

## 6. Visual QA (Team 4)

### Mission
Screenshot and audit every page at 3 breakpoints. Flag issues. Run after every build pass.

### Process
1. Open each page in Chrome (Default profile)
2. Screenshot at 1440px (desktop), 768px (tablet), 375px (mobile)
3. Check against design system tokens (colours, typography, spacing)
4. Flag: broken images, placeholder text, layout breaks, colour inconsistencies, accessibility gaps
5. Cross-check navigation links work across all pages
6. Verify dark/light section transitions
7. Check touch targets on mobile (44px minimum)
8. Verify reduced-motion behaviour

### Severity Classification
- **P0 Critical:** Broken layout, missing content, wrong colours, inaccessible
- **P1 Major:** Spacing issues, typography inconsistencies, image quality
- **P2 Minor:** Polish items, hover state refinements, subtle alignment

### Deliverables
1. QA report with annotated screenshots per page per breakpoint
2. Issue list with severity, page, description, and fix recommendation
3. Re-run after fixes to verify resolution

---

## 7. Creative Strategy (Team 5 - Horizon 2)

### Mission
Define brand positioning, content strategy, and emotional storytelling arc for a premium DTC experience that competes with Aesop, Koko Black, and Haigh's.

### Competitive Analysis Targets
- **Aesop:** Minimalist, literary, intellectual. "The product speaks."
- **Koko Black:** Luxury gifting, dark/gold palette, indulgence positioning
- **Haigh's:** Heritage, craft, Australian provenance
- **Pana Chocolate:** Health-conscious, raw/organic, Byron Bay adjacent

### MapleMoon Positioning
MapleMoon sits at the intersection of **Haigh's craft heritage** and **Pana's health positioning**, with a unique **"carob is its own thing"** narrative that none of the competitors own.

**Brand pillars:**
1. **Authenticity:** "Not trying to be chocolate. It's carob."
2. **Craft:** Handmade, small batch, Byron Bay kitchen
3. **Provenance:** Australian-grown carob, sun-ripened pods
4. **Simplicity:** Pure ingredients, nothing added
5. **Joy:** Naturally sweet, guilt-free indulgence

### Emotional Arc (Homepage Flow)
1. **Curiosity:** "What is this?" -- Hero section, beautiful photography, unfamiliar product
2. **Education:** "Oh, carob." -- What is Carob section, ingredient story
3. **Trust:** "These people are legit." -- Origin story, Byron Bay, certifications
4. **Desire:** "I want to try this." -- Product showcase, flavour exploration
5. **Action:** "Add to cart." -- Clear CTAs, simple purchase path

### Content Strategy
- **Voice:** Warm, direct, confident. Not precious or preachy. Speaks like a maker, not a marketer.
- **Photography:** Editorial, warm-lit, tactile. Show the product, the ingredients, the place.
- **Copy cadence:** Short sentences. Statements, not explanations. Let the product speak.

### Deliverables
1. Brand positioning document with competitive analysis
2. Content strategy guide (voice, tone, cadence)
3. Homepage story flow with emotional arc mapping
4. Product positioning matrix (each product's unique angle)

---

## 8. Photography + Art Direction (Team 6 - Horizon 2)

### Mission
Own the visual identity. Direct the planned 2-day photoshoot, continue AI pipeline for gaps, and create a visual world that elevates MapleMoon to premium DTC level.

### Current Asset State
- 17 approved photographs (silhouettes, product composites, botanicals, gift boxes, fog textures)
- 13 AI-refined images (Nano Banana 2 + FLUX Pro v1.1) awaiting creative direction review
- 7 v2 variants as alternatives
- 4 warm/dark texture backgrounds ready to use
- 77 product shots across multiple directories

### Photography Gaps (Require Real Product from Carli)
1. All 6 bar flavours in correct wrappers (AI can't do packaging text)
2. Editorial shots with real bars (lifestyle needs actual product)
3. Packaging with real branding (correct wordmark/icon)
4. Bar cross-section/unwrapped shots
5. Kitchen/production process photos
6. Carob farm/grove photos
7. Founder portraits (Carli + Dylan)

### AI Pipeline (Can Generate)
- Category banners for Moons and Eclipses (have Bars and Elixirs)
- Brand journey/timeline imagery for About page
- Additional lifestyle/flat-lay compositions
- Product-in-context scenes (desk, picnic, gift)

### Photoshoot Plan (Already Documented)
- 2-day structure: Day 1 studio packshots (90 images), Day 2 lifestyle/hero (32 images)
- 122 unique photographs mapped to Shopify pages
- ~40 social crops (1:1, 9:16, 16:9)
- 9 video clips
- Budget: $1,550-3,900

### Deliverables
1. Refined shot list prioritised by page need
2. AI photography pipeline execution for fillable gaps
3. Photoshoot creative brief for photographer (when real product available)
4. Asset integration plan (which images go where on which pages)
5. Image optimisation specs (WebP, responsive srcset, lazy loading)

---

## 9. Conversion + Marketing (Team 7 - Horizon 2)

### Mission
Optimise every page for conversion. Build email capture, social proof, and launch campaign infrastructure.

### Conversion Audit Framework

**Per-page checklist:**
- Primary CTA visible above fold?
- Secondary CTA in mid-page?
- Trust signals within 2 scrolls of any CTA?
- Social proof present (reviews, stockist logos, "X sold")?
- Urgency/scarcity where authentic ("handmade in small batches")?
- Exit-intent or scroll-triggered email capture?
- Cross-sell/upsell recommendations?

### Email Strategy (Klaviyo)
- **Welcome flow:** Subscribe > Welcome email (brand story + 10% off first order) > Product education (Day 3) > Best sellers (Day 7)
- **Abandoned cart:** 1hr reminder > 24hr reminder with social proof > 72hr last chance
- **Post-purchase:** Thank you + care instructions > Review request (Day 7) > Reorder nudge (Day 30)
- **Newsletter:** Monthly, editorial voice, Byron Bay updates + new products

### Launch Campaign
- **Pre-launch:** "Something's brewing" teaser (email + Instagram)
- **Launch day:** Site live announcement, first-order incentive
- **Post-launch week:** Daily social content, influencer seeding, PR outreach

### SEO
- Content from `content/meta_seo.md` (already written for all pages)
- Schema markup: Product, Organization, FAQ, BreadcrumbList
- Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1

### Analytics
- Meta Pixel: ViewContent, AddToCart, Purchase events
- Google Analytics 4: Enhanced e-commerce tracking
- Hotjar or similar: Heatmaps on homepage and PDP for first 30 days

### Deliverables
1. Conversion audit of every page with specific recommendations
2. CTA hierarchy document (primary, secondary, tertiary per page)
3. Email capture strategy with flow diagrams
4. Launch campaign timeline
5. SEO implementation checklist
6. Analytics setup checklist

---

## 10. Shopify Operations (Team 8 - Horizon 2)

### Mission
Production infrastructure. Theme installation, domain transfer, app stack, and go-live.

### Shopify Setup Checklist

**Store Foundation:**
- [ ] Create Shopify store (or get access to existing WooCommerce migration)
- [ ] Configure store settings (currency AUD, timezone AEST, shipping zones AU)
- [ ] Add all products (20 SKUs) with descriptions, images, pricing, variants
- [ ] Create collections: Bars, Moons, Eclipse Bites, Elixirs, All
- [ ] Set up shipping: Standard $16.95, Free over $99
- [ ] Payment: Shopify Payments (Stripe) + PayPal + Afterpay

**Theme Installation:**
- [ ] Copy `sections/`, `templates/`, `layout/`, `config/`, `snippets/` to theme
- [ ] Load fonts (P22 Mackinac Pro via Google Fonts, Neue Haas Grotesk via Linotype or Inter fallback)
- [ ] Create `custom.tagline` metafield definition
- [ ] Add pagination wrappers to collection/blog/search templates
- [ ] Replace watermarked stock images with licensed originals
- [ ] Test all 7 items from HANDOFF.md testing checklist

**App Stack:**
- [ ] Reviews: Judge.me (free tier) or Loox (photo reviews)
- [ ] Email: Klaviyo (free up to 250 contacts)
- [ ] Analytics: Google Analytics 4 + Meta Pixel
- [ ] SEO: Built-in Shopify SEO + JSON-LD schema
- [ ] Backup: Rewind (automatic daily backups)

**Domain Transfer:**
- [ ] Current domain: maplemoon.com.au (registrar TBD)
- [ ] Plan: Add domain to Shopify, update DNS, verify SSL
- [ ] Zero-downtime strategy: Add domain before removing from old host
- [ ] Email continuity: Ensure MX records preserved for info@maplemoon.com.au

**Go-Live Runbook:**
1. Final content review with Carli
2. Remove password page
3. Domain DNS cutover
4. Verify SSL certificate
5. Test checkout flow end-to-end
6. Submit sitemap to Google Search Console
7. Monitor Core Web Vitals for 48 hours
8. Announce launch

### Deliverables
1. Shopify store setup (products, collections, settings)
2. Theme installation and testing
3. App stack configuration
4. Domain migration plan
5. Go-live runbook with rollback procedures

---

## 11. Execution Phasing

### Horizon 1: Meeting-Ready (24-48 hours)

**Wave 1 (Parallel):**
- Team 1 (Design System): Extend brand_kit.css with component tokens
- Team 2 (UX/IA): Finalise site map and page priority

**Wave 2 (Parallel, after Wave 1 tokens are set):**
- Team 3 (Frontend Dev): Build PDP, About, Collection pages
- Team 4 (Visual QA): QA homepage first, then new pages as they land

**Wave 3 (Sequential):**
- Team 3: Wire navigation across all pages
- Team 4: Final full-site QA pass

**Meeting deliverable:** Full multi-page site at maplemoon-website.vercel.app with homepage, 3 PDPs, About page, Bars collection, and working cross-page navigation.

### Horizon 2: World-Class Overhaul (Post-Meeting, 2-4 weeks)

**Week 1:**
- Team 5 (Creative Strategy): Brand positioning and content strategy
- Team 6 (Photography): AI pipeline execution + photoshoot brief
- Team 3 (Frontend Dev): Remaining pages (FAQ, Contact, Wholesale, Cart)

**Week 2:**
- Team 7 (Conversion): Audit and optimise all pages
- Team 3 (Frontend Dev): Implement conversion recommendations
- Team 4 (Visual QA): Full regression pass

**Week 3:**
- Team 8 (Shopify Ops): Store setup, theme installation, app stack
- Team 6 (Photography): Real product photoshoot (if Carli has provided product)

**Week 4:**
- Team 8 (Shopify Ops): Domain transfer, go-live
- Team 7 (Conversion): Launch campaign execution
- Team 4 (Visual QA): Production verification

---

## 12. Success Criteria

### Meeting Demo (Horizon 1)
- [ ] 6+ pages live and navigable at Vercel preview URL
- [ ] V7+V11 fusion consistent across all pages
- [ ] Responsive at desktop, tablet, and mobile
- [ ] No broken images or placeholder text visible to client
- [ ] Dark elixir sections working
- [ ] Carli and Dylan can browse the full site on their phones

### Launch (Horizon 2)
- [ ] 20 products live with real photography
- [ ] Checkout flow working end-to-end
- [ ] Email capture active (Klaviyo)
- [ ] Core Web Vitals passing (green)
- [ ] Domain transferred with zero downtime
- [ ] First 10 orders processed successfully

---

## 13. Constraints and Risks

| Risk | Mitigation |
|------|-----------|
| Meeting could be tomorrow (Apr 17) | Horizon 1 scoped to 24-48hr delivery |
| No meeting time confirmed | Build regardless, have demo ready |
| Real product photos not available | Use existing AI-generated + approved shots, flag gaps for Carli |
| Shopify store access not yet provided by Carli | Build static HTML first, Shopify install is Horizon 2 |
| Fal.ai balance exhausted ($0) | Use existing 27 generated images, top up later |
| Font licensing (Neue Haas Grotesk) | Inter fallback already specified in CSS |
| Photography needs real product for packaging text | Document as "needs from Carli" list for meeting |

---

## 14. Out of Scope

- Shopify store creation (requires Carli's account/deposit)
- Real product photography shoot (requires AFQA packaging + photographer)
- Payment processing setup (requires Shopify store)
- International shipping configuration
- Wholesale portal / B2B channel (future phase)
- Blog content creation (template only)
- Saudi export / Arabic label integration
- AFQA compliance packaging (separate workstream)
