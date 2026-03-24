# MapleMoon Hero Concepts — Senior Design Review

**15 variants audited. Pre-client-presentation gate.**
**Reviewer: Senior Product Design / Frontend**
**Date: 17 March 2026**

---

## Section 1: Per-Variant Critique

### V1 — Brand Statement

This is the most complete variant in the set. The dark palette with cream text reads as premium and considered. The seven-category crossfade system is genuinely well-built: hover previews, click locks, ARIA live regions updating dynamically, smooth 0.45s transitions. It communicates "we have a range" without overwhelming the user, and the single "Shop Now" CTA is appropriately restrained for a brand-first hero. The vertical category nav on desktop is distinctive and avoids the generic horizontal strip every other variant defaults to.

The problems are manageable but real. The headline and tagline contain identical text, which reads as a copy error, not a design choice. On devices narrower than 375px the vertical category stack risks overlapping the product image, and the "Back to Gallery" link disappears on mobile. The JPG paths for Packs and Gifts breaking from the webp convention is a build inconsistency, not a visual one, but it signals sloppy asset management. Mobile experience is otherwise solid: 70% width product, thumb-zone CTA, 44px hamburger target.

The interaction quality sets V1 apart. Keyboard focus triggering the same preview as hover is thoughtful accessibility work. The crossfade system does something useful — it lets a visitor scan the entire range without leaving the hero. That is functional, not decorative. This variant could ship on Shopify tomorrow with copy fixes and a mobile category overlap guard.

### V2 — Shop Now

A clean, minimal hero that does nothing wrong and nothing memorable. The cool blue gradient with animated dual radials is pleasant but generic — it could be any DTC brand. The single static product with drop shadow is the safest possible layout, and safety is the problem. There is no storytelling, no range communication, no reason to linger.

The pulsing CTA at 1.5s feels like a template default. Category tabs exist at the bottom but are static links, not switchers, so they add visual noise without interaction value. The animated gradients running constantly at 17s and 24s cycles cause unnecessary GPU compositing. Mobile layout is fine — 88% product width, good scale — but the cream-on-light-blue contrast is weaker than every dark variant. The category strip clipping "GIFTS" at 375px is the same bug shared across six variants. Nav links at 0.7 opacity will fail WCAG AA.

This is a placeholder hero wearing a finished costume. It would work as a fallback but should not be the recommendation.

### V3 — What is Carob?

The strongest editorial concept in the set. "What is Carob?" as the lead question is smart positioning for a product most consumers do not understand. The diagonal gradient from navy through teal to carob-dark is the warmest palette of any variant, and it actually feels like Byron Bay. The 55/45 desktop split with story on the left and product on the right gives the layout a magazine quality. Five trust badge SVGs with tooltip hover are well-executed brand proof points.

The mobile experience is where it falters. The hero is scrollable (overflow-y: auto), which breaks the full-viewport convention every other variant uses. On shorter devices, the fixed category strip at the bottom will overlap the CTAs — this is a P1 because it blocks conversion on real hardware. The trust badge tooltips at 24px and 0.6 opacity are effectively invisible on touch screens. Two CTAs ("Learn More" and "Shop Bars") give the user a clear choice between education and purchase, which is the right instinct for a carob brand.

This concept deserves serious consideration if the mobile layout issues are resolved. It is the only variant that treats the customer's ignorance about carob as an opportunity rather than an obstacle.

### V4 — The Range

A product-grid hero with a card carousel on mobile and three columns on desktop. The concept is sound — show three categories immediately. But the execution has a critical flaw: on mobile, only the first card is visible and there is no swipe affordance. No partial peek of the second card, no arrows, no text prompt. A first-time visitor will see one product card and assume that is all there is. The scroll-snap with IntersectionObserver dots is technically correct but visually invisible as a cue.

"The Range" as the headline is a missed opportunity — it describes the layout, not the brand. Worse, it is a `<p>` tag, not a heading, so it fails semantically and in screen readers. Desktop hover (8px lift + 1.05x scale) is pleasant but standard. The dots tracking scroll position are display-only, not interactive, which is a missed interaction.

The concept has the right instinct but needs a swipe affordance, a real heading, and a stronger opening line to be presentable.

### V6 — Before & After

The most artistically ambitious variant and the least commercially viable. The split-screen concept — carob pods on one side, finished bar on the other — tells a transformation story in a single glance. The draggable divider on desktop is beautifully implemented: mouse, touch, keyboard arrows by 5%, Home/End for limits, ARIA slider role. The photography is custom, not stock, and the dark cinematic tone is genuinely premium.

But there are zero CTAs. None. "Shop." appears as static text in an h2, not a link or button. A visitor literally cannot convert. This is not a bug to fix; it is a philosophical gap. The variant was designed as a mood piece, not a sales tool. The mobile version strips the divider entirely and shows two stacked 50vh panels with text at corners and no interactive elements. The hamburger lacks a focus trap.

This cannot be presented to the client as a hero option. It is a mood board slide, not a homepage.

### V7 — Flavour Picker

The most interactive variant and the one that best understands e-commerce. Four category tabs (Bars, Moons, Bites, Elixirs) drive real state changes: the background gradient shifts colour, the product image swaps, the tagline updates, and the CTA dynamically rewrites ("SHOP HAZELNUT MOON", "SHOP SPICED ELIXIR"). This is not decoration. It lets a visitor browse the entire catalogue from the hero without scrolling.

The interaction test results confirm it works: Moons tab shifts warm brown, Bites gives "Poppable. Pure. A bag full of good.", Elixirs goes warm amber. CTA links are structured as real shop URLs (/shop/bars/pure-carob). The tagline copy per category is well-written and product-specific.

The bugs are contained. Hazelnut Moon and Pecan Moon share the same image URL, which is an asset pipeline error, not a design error. Flavour pills clip on mobile at 375px ("Hazelnut" gets cut). The hidden logo with zero display size is sloppy markup. But these are all fixable in a day. This variant understands that a hero's job is to collapse the distance between interest and purchase, and it does that better than any other concept in the set.

### V8 — Time of Day

A moody, atmospheric single-product hero. The deep navy palette with smoke effects and reflective surface reads as premium spirits or luxury chocolate, which is exactly the right neighbourhood for artisan carob. The large "CAROB BAR" wordmark overlapping the product is bold typography. The time-of-day greeting ("Good afternoon") via live-polite region is a nice personalization touch.

But the greeting disappears on mobile, which undermines the concept's single differentiating feature. The bottom category bar is navigation-only, not a switcher. Three preloaded images go unused, wasting bandwidth for no payoff. This is a competent single-product hero with one clever idea (time-of-day) that is not executed consistently across breakpoints. It would work but does not stand out.

### V9 — Story Cards

Four vertical panels telling a brand narrative: Who (MapleMoon), Where (Byron Bay), What (Pure Carob), Why (Pure Intention). The desktop hover-expand accordion is elegant — panels breathe as you explore. The single "SHOP ALL" CTA lives only in the Why panel, which is narratively satisfying (the story leads to the ask).

This variant is broken on mobile. Text on panels 2 through 4 is positioned at coordinates far outside the 375px viewport (left:869px). Panels show background images only. A mobile visitor sees four photo strips with no text, no headline, no CTA. This is a P0. Additionally, two of the four background images carry visible stock watermarks (Byron lighthouse and carob pods). The chevron arrows are non-functional.

The desktop experience is strong enough to salvage, but the mobile failure and stock watermarks make this unpresentable in its current state.

### V10 — Letterbox Cinema

A splash-page concept with no navigation. The only forward path is an "ENTER" button. No hamburger, no nav links, no access to Our Story, Stockists, Recipes, or Contact. The benefit icons (Organic, Vegan, Caffeine Free, Gluten Free, Made in Australia) are a smart trust-building cluster, and the dark cinematic treatment with smoke is visually strong.

But a splash page is an outdated pattern that adds friction without value. Every click before the shop is a conversion leak. The "Free shipping" message disappears on mobile. This would need to be fundamentally reconceived as a real homepage hero, not a landing gate. Not presentable as-is.

### V11 — The Grid

An asymmetric mood board grid with a large product tile and smaller supporting tiles. Visually interesting layout. But: no headline, no tagline, no CTA, no value proposition. The tiles have cursor:pointer but no click handlers, so they look interactive and do nothing. Tile labels read as design-system annotations ("ACCENT TILE — colour only, no photo"), not customer copy.

This is an art-directed layout prototype, not a hero concept. It has no commercial function. Cut it.

### V12 — The Unwrap

Three products on desktop with hover-reveal info cards. Mobile uses a tap-to-cycle through four states (bar, bar+info, eclipse+info, elixir+info). Each product gets its own CTA: "Add to Cart", "Shop Moons", "Notify Me" for the elixir. This is a multi-product hero that actually converts per product, which is unusual and interesting.

The desktop problem is severe: without hovering, a visitor sees three product images, no text, no headline, no CTA. There is no visible h1 or heading anywhere in the semantic structure. The "Tap to discover" prompt on mobile is the only onboarding cue. The tap-cycle mechanic is clever but non-standard — users trained on scroll and swipe may not discover it. The info panel sliding up from the bottom on mobile with a fixed CTA at 48px height is well-executed touch UI.

This concept has genuine commercial ideas (per-product CTAs, "Notify Me" for pre-launch elixirs) that are undermined by the invisible-without-interaction problem on desktop. A visible default state with product names and a headline would fix it.

### V13 — Full Bleed Photo

A single photograph of a hand holding the Spiced Carob Elixir, full-bleed with a Ken Burns 30s zoom on desktop (reduced-motion aware — good). The footer bar with tagline left and "Shop Now" right is minimal and confident. The photography is original, not stock.

The absence of an h1 tag anywhere in the DOM is a P0 for accessibility and SEO. The "Artisan carob and cacao butter. Byron Bay." tagline does good work as a positioning line. This is the most visually mature variant — it trusts the photography and gets out of the way. But it is a single-product, single-image hero with no range communication and no interaction beyond the CTA. For a brand with seven categories, that is a strategic limitation.

Strong as a campaign landing page. Limited as a homepage hero.

### V14 — Ingredient Journey

A scroll-driven four-chapter editorial: pod, powder, bar, range. The desktop sticky-photo-left / scrolling-text-right pattern is well-established editorial UX (think Apple product pages). The IntersectionObserver crossfading backgrounds at 0.3 threshold is correctly implemented. The mobile scroll hint with animated pulse is a thoughtful touch.

Two of the four images carry visible Adobe Stock watermarks. That is a P0 for client presentation. The h1 is "It starts with the pod" rather than the brand name, which is a semantic choice that hurts SEO but works editorially. Desktop nav links become invisible when scrolling over dark photo panels. The single CTA appears only at chapter 4, which means a visitor must scroll through the entire story to find a purchase path.

This is the best storytelling variant and the worst conversion variant. It should not be a homepage hero. It should be the "Our Story" page, built after launch.

### V15 — Product Orbit

Eight products rotating in a 60-second CSS orbit around a central "CAROB" wordmark. Clicking a node opens an info panel with product name, description, and "View Product" CTA. The orbit pauses when a panel is open. Close via button, click-outside, or Escape.

The concept is visually striking in screenshots but hostile in practice. Moving tap targets are an accessibility and usability failure. At 150px radius on mobile, eight nodes have roughly 30px gaps — too tight for reliable touch targeting on a moving carousel. Two product images come from the wrong asset directory and one (Gift Bundle) has a white background that clashes with the blue gradient. Deep product URLs will 404. The interaction is designed for designers, not for shoppers.

### V16 — Moodboard

A three-column masonry drift of 57 images (duplicated for seamless loop) animated upward at 80/90/100 seconds per column. Hero text overlaid at centre. "Shop Now" CTA.

No screenshots were captured, so visual rendering is unverified. That alone makes it unpresentable. Beyond that: 57 images on initial load is a performance disaster. Multiple filenames contain "pinterest_702913..." prefixes, indicating images sourced from Pinterest with probable copyright issues. The reduced-motion fallback layout is broken (fixed overlay on scrollable content). The pointer-events:none on the text overlay means the masonry pause behaviour fires unpredictably.

This is a mood board tool, not a hero concept. Cut it.

---

## Section 2: Ranked Shortlist — Top 3

**1. V7 — Flavour Picker.** The only variant where the interaction directly serves purchase intent: browse categories, see products, read product-specific copy, click a CTA that names the exact product you want.

**2. V1 — Brand Statement.** The most polished single-screen hero with the strongest interaction system (hover preview, click lock, crossfade) and a complete category overview that communicates range without clutter.

**3. V3 — What is Carob?** The smartest editorial positioning for a product category most consumers do not understand, with a warm palette that genuinely evokes Byron Bay.

---

## Section 3: Recommended Winner

**V7 — Flavour Picker.**

V7 wins because it is the only variant that collapses the full browse-to-buy journey into a single viewport. A visitor arrives, sees the product, taps a category, sees that category's hero product with a real tagline, and clicks a CTA that says "SHOP HAZELNUT MOON" — not "Shop Now", not "Browse All", but the specific product they just chose. That specificity is the difference between a hero that looks good and a hero that sells.

V1 comes close. Its crossfade system is technically excellent, and the vertical category nav is a distinctive layout choice. But V1's interaction is observational — you preview products. V7's interaction is decisional — you choose a flavour and the entire hero reconfigures to support that choice. The background gradient shifting per category (blue for bars, warm brown for moons, amber for elixirs) gives each selection a distinct sensory identity. V3 has the strongest copy instinct ("What is Carob?" as a lead question is exactly right for market education), but it is a single-product, single-message hero that does not scale to seven categories.

V7 also scales cleanly. Adding a new category means adding a tab, a set of flavour pills, product images, and copy strings. The dynamic CTA URL structure (/shop/bars/pure-carob, /shop/moons/hazelnut-moon) maps directly to a Shopify collection/product hierarchy. The bugs are contained and fixable: the shared Moons image is an asset swap, the pill overflow is a CSS clamp, the hidden logo is a markup deletion. None of these require rethinking the concept. The interactions serve users who want to browse and buy, not designers who want to demonstrate technical range.

---

## Section 4: Steal List

- **V1 — Vertical category nav.** The fixed left-side category stack is a distinctive navigation pattern. Consider it as an alternative to V7's horizontal tabs on wide desktop viewports (1440px+) where horizontal space is abundant.

- **V3 — "What is Carob?" headline.** Use this as V7's default state headline before any category is selected. It frames the entire picker as an answer to the question.

- **V3 — Trust badge cluster.** Five SVG icons (Organic, Vegan, Caffeine Free, Gluten Free, Made in Australia) with tooltip hover. Place these below V7's flavour pills as persistent proof points.

- **V6 — Draggable split divider.** The implementation (ARIA slider, keyboard arrows, 20-80% clamp) is excellent. Repurpose it for a "From Pod to Bar" story section below the hero fold.

- **V8 — Time-of-day greeting.** "Good morning" / "Good afternoon" as a subtle personalisation line above V7's headline. Low effort, warm tone, aligns with the Byron Bay brand personality.

- **V9 — Who/Where/What/Why narrative arc.** The four-panel story structure works as a below-fold section. Use the panel labels as section anchors on the About page.

- **V10 — Benefit icon cluster.** The five benefit SVGs are clean and category-appropriate. Merge with V3's trust badges (they overlap) and place in V7's footer area.

- **V12 — Per-product CTA differentiation.** "Add to Cart" for in-stock, "Notify Me" for pre-launch elixirs. Apply this logic to V7's dynamic CTA — if a product is not yet available, the CTA should change to "Notify Me" rather than linking to a 404.

- **V13 — Ken Burns background.** The 30s zoom with reduced-motion awareness is well-built. Use it as a subtle background treatment on V7's default state (before any category is selected) to add visual depth to the initial load.

- **V14 — Scroll-driven chapter transitions.** The sticky-photo-left / scrolling-text-right pattern is the right UX for a dedicated "Our Story" page. Build it as a separate page using V14's IntersectionObserver logic.

---

## Section 5: P1 UX Issues

### P0 — Blocks conversion or presentation entirely

- **V6 — Zero CTAs**: "Shop." is static text, not a button or link. A visitor cannot convert. There is no purchase path.
- **V9 — Mobile text invisible**: Text on panels 2-4 positioned at x-coordinates outside the mobile viewport (left:869px on a 375px screen). Mobile visitors see four photo strips with no copy and no CTA.
- **V11 — Zero CTAs, no headline**: No button, link, value proposition, or heading. Cursor:pointer on non-interactive tiles is actively misleading.
- **V13 — No h1 tag**: No heading element in the DOM. Critical accessibility and SEO failure for a homepage hero.
- **V14 — Visible stock watermarks**: Adobe Stock watermarks clearly visible on carob pods and powder images. Cannot be shown to a client.
- **V16 — No visual verification + copyright risk**: No screenshots captured to confirm rendering. Pinterest-sourced filenames indicate likely copyrighted imagery.

### P1 — Would damage conversion or credibility in presentation

- **V3 — Category strip overlaps CTAs on short mobile viewports**: On devices shorter than approximately 667px, the fixed category bar covers the "Learn More" and "Shop Bars" buttons. The conversion path is physically blocked.
- **V4 — No scroll affordance on mobile card carousel**: Second and third product cards are hidden off-screen with no swipe hint, arrows, or partial card peek. Visitors will assume there is only one product.
- **V6 — No focus trap on mobile menu**: Hamburger menu opens with aria-modal but keyboard focus escapes to the page behind. Violates WCAG modal behaviour.
- **V7 — Duplicate Moons product image**: Both "Hazelnut Moon" and "Pecan Moon" load moon_pure_carob.webp. One of two Moon products displays the wrong image.
- **V9 — Stock watermarks on 2 of 4 panel images**: Byron lighthouse and carob pods photos carry visible watermark overlays. Not presentable.
- **V12 — No visible heading or CTA on desktop without hover**: First-time desktop visitors see three floating product images with no text, no headline, no call to action. There is no visible entry point to the experience.
- **V14 — Desktop nav links invisible over dark photo panel**: When the sticky photo is a dark image, the nav text disappears entirely. Navigation is lost during the scroll experience.
- **V15 — Moving tap targets in product orbit**: Eight nodes at 150px radius with 30px gaps rotate continuously. Precise tapping on a moving 60s carousel is unreliable, especially on mobile.
- **V15 — Wrong asset directory for 2 products**: Gift Bundle renders with a white background against blue gradient. Visual inconsistency breaks the premium feel.
- **V16 — 57 images on initial load**: Catastrophic Time to Interactive. No lazy loading apparent. Page will be unusable on mobile data connections.

### Summary

**Client-presentable now (minor fixes only):** 3 — V1, V7, V8.
**Presentable after targeted fixes (1-2 day effort):** 4 — V2, V3, V4, V12.
**Need fundamental rework or asset replacement:** 3 — V9, V14, V15.
**Should be cut entirely:** 5 — V6, V10, V11, V13 (as homepage hero), V16.
