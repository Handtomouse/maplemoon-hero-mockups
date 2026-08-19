# MapleMoon Design System v1

Status: Phase 1 pilot; global foundation promoted and wired to Homepage only.

Authority: `docs/orchestration/packets/MAPLEMOON-PHASE-0-SHARED-FOUNDATION-20260807.md`

## What this phase establishes

This package records the shared system beneath the six current WIP pages. It does not redesign or publish those pages. Homepage is the first and only admitted pilot route; Shop, Our Story, What is Carob, Stockists and FAQ remain foundation-unwired and their files are untouched by this pilot.

The inventory is source-resolved: values were extracted from the admitted HTML and linked CSS at their frozen hashes. It is not a claim about a live browser's final computed cascade, loaded Typekit winner, Shopify runtime, production deployment or client approval.

The governed cascade is intentionally explicit:

1. `mm-tokens.css` — repeated primitive values only.
2. `mm-base.css` — reset, media defaults, document defaults, focus and reduced-motion safety.
3. `mm-chrome.css` — one header/footer/skip-link information architecture.
4. `mm-primitives.css` — bounded reusable presentation and state contracts.
5. route stylesheet (`_wip/styles/homepage.css` for the pilot) — semantic aliases and route-scoped adapters only.
6. registered route exceptions — protected art direction, after the shared layers.
7. `mm-chrome.js` — progressive mobile-menu enhancement only.

Every admitted route must load the CSS in that order. `mm-chrome.js` loads with `defer` against static header markup. No other route may import the new files until its own wiring packet is admitted.

## Machine-readable sources of truth

- `contracts/tokens.v1.json` mirrors every custom property in `mm-tokens.css`, including source references and any reserved Phase 1 purpose.
- `contracts/routes.v1.json` identifies exactly six authoritative WIP sources, their pre-pilot/current hashes and implementation state. Product detail pages remain a held route group, not invented catalogue truth. Contact is only an observed `mailto:` destination.
- `contracts/components.v1.json` records shared ownership, states, consumers and the deliberate non-shared boundary.
- `contracts/responsive.v1.json` admits 320, 390, 834 and 1440 as evidence widths and restricts new shared media queries.
- `contracts/images.v1.json` records role, crop, alt and custody requirements without inventing people, product, packaging or asset approval.
- `contracts/exceptions.v1.json` preserves intentional page art direction and baseline technical debt by exact source hash.

The JSON contracts own IDs, relationships and evidence state. CSS owns implementation. If they disagree, the checker fails; neither side silently wins.

## Token policy

A value is promoted only when it has a stable shared meaning and evidence in at least two admitted sources. Repetition alone does not make a design decision global. Route headings, section rhythm, complex gradients, masks, filters, image crops, one-route shadows, commerce semantics and business facts remain local or explicitly registered exceptions.

The resolved palette roles are:

- `#4074B6` / `--mm-color-accent-blue`: interaction, focus and validation emphasis; not a page wash.
- `#457798` / `--mm-color-blue-deep`: structural brand emphasis, selected navigation and strong blue type.
- `#7B9DBF` / `--mm-color-blue-atmosphere`: atmospheric/editorial colour in imagery grades and soft fields; not a focus colour.
- `#F1EDE3` / `--mm-color-cream`: shared interface cream for light text and neutral surfaces.
- `#E7E4CA` / `--mm-color-cream-editorial`: Homepage Editorial Night cream for hero/chrome copy and protected dissolves.
- `#F4F2ED` / `--mm-color-paper`: shared neutral paper.
- `#EEE9D3` / `--mm-color-paper-editorial`: Homepage/editorial paper. It does not replace the shared neutral paper on other routes.

Exact token-to-CSS agreement is mandatory. New shared CSS must use registered tokens for governed colour, type, spacing, radius, border, shadow and motion values. New exceptions require an ID, owner or owner hold, rationale, exact binding, evidence source and retirement rule.

## Shared chrome contract

There is one static header DOM and one set of five route links. Desktop and mobile presentations must not duplicate navigation markup. The home link is the centred wordmark destination; the cart is a button because commerce behavior is not owned here. Each rendered route must have exactly one `aria-current="page"` across the home and route links.

Phase 1 mounts the following structure, changing only route-relative `href` values and the one current-page attribute:

```html
<a class="mm-skip-link" href="#main-content">Skip to main content</a>
<header class="mm-site-header"
        data-mm-chrome
        data-header-theme="paper"
        data-mm-menu-state="closed">
  <div class="mm-wrap mm-header__bar">
    <button class="mm-icon-control mm-menu-toggle"
            type="button"
            hidden
            data-mm-menu-toggle
            aria-expanded="false"
            aria-controls="mm-primary-navigation mm-utility-navigation">
      Menu
    </button>

    <nav id="mm-primary-navigation"
         class="mm-header__nav"
         data-mm-primary-nav
         aria-label="Primary">
      <a href="shop.WIP.html">Shop</a>
      <a href="our-story.WIP.html">Our Story</a>
      <a href="carob-story.WIP.html">What is Carob</a>
    </nav>

    <a class="mm-header__home"
       data-mm-home-link
       href="homepage_real_1_lead_photo.WIP.html">maple moon</a>

    <div class="mm-header__right">
      <nav id="mm-utility-navigation"
           class="mm-header__utility-nav"
           data-mm-utility-nav
           aria-label="Utility">
        <a href="stockists.WIP.html">Stockists</a>
        <a href="faq.WIP.html">FAQ</a>
      </nav>
      <button class="mm-icon-control"
              type="button"
              data-mm-cart-toggle
              aria-label="Cart, 0 items">Cart</button>
    </div>
  </div>
</header>
```

Before JavaScript enhancement, the route links remain visible and usable at every width. At `max-width: 900px`, `MapleMoonChrome.mount()` validates the single-DOM hooks, then reveals the menu button and adds `data-mm-enhanced`. The enhanced closed state hides and makes both navigation regions inert. The open state restores them, moves focus to the first route, traps Tab within the header, closes on Escape and returns focus to the toggle. A transition back to desktop clears all mobile state. Failure to find exactly one required hook leaves the static fallback untouched and reports a console error.

The script does not create markup, alter product data, own cart behavior or infer a route. Night and Carob header treatments are modifiers or registered exceptions, never a second information architecture.

## Component boundary

The promoted implementation includes wrap, eyebrow, buttons/text link, icon control, field, disclosure, header, footer, skip link, surfaces, cards, chip rail, segmented control, pending state and product-card shell. Dissolve fields remain route-owned because a generic mask would flatten intentional art direction.

Shared components own only repeatable structure and presentation. They do not own page-specific copy, product facts, price, availability, claims, founder identity, stockist data, FAQ taxonomy, image art direction or Shopify behavior.

## Responsive and accessibility contract

New shared code may use the 560px narrow breakpoint, the 900px mobile-navigation breakpoint, the evidence-backed 400px correction, and the registered motion/contrast/hover capabilities only. Existing route-specific media conditions are grandfathered at their exact frozen hashes; they are evidence, not a new shared breakpoint scale.

Required manual evidence remains:

- 320, 390, 834 and 1440 CSS-pixel widths;
- keyboard reachability and focus return;
- no root horizontal overflow;
- native browser 200 percent zoom;
- runtime reduced-motion behavior.

The last two are not discharged by source checks or ordinary screenshots.

## Image and content holds

An image contract distinguishes asset custody, placement, crop, masking and alt ownership. A present file is not proof of client selection. Founder images follow `_wip/HANDOFF-FOUNDER-IMAGERY-20260803.md`; the 4:5 founder slot and real stacked crop/mask are protected. Product and packaging media remain held by the catalogue and visual-evidence gates. No implementation may invent founders, testimonials, certifications, stockists, ingredients, nutrition, availability or approved photography.

## Exceptions

The registered exceptions preserve, rather than flatten:

- Homepage Editorial Night ocean/scrim/mask/filter, protected wordmark and range handoffs;
- FAQ support palette, wrapper and support-surface geometry;
- Carob Story translucent rail, orchard/stage masks and route-specific long motion;
- Our Story palette, rhythm, 4:5 founder presentation and dissolves;
- Stockists finder/map state and contrast treatment;
- exact route section rhythm, fluid headings, masks, crops and one-route effects;
- documented baseline defects that are not allowed to become tokens.

An exception is not permission to grow debt. Phase 1 either preserves its exact binding, explicitly supersedes it with reviewed evidence, or holds.

## Checker modes

Contract validation:

```sh
node scripts/check-maplemoon-design-system.mjs --contracts-only
```

This validates contract shape and references, token parity, allowed shared media queries, JavaScript hooks, component implementations, exception bindings and all six current source hashes. It intentionally does not require route imports or mounts.

Homepage pilot route validation:

```sh
node scripts/check-maplemoon-design-system.mjs --route-conformance home
```

This turns on ordered-import, pilot stylesheet, chrome mount and implementation-state checks for Homepage only. `--route-conformance all` remains the future six-route gate and must continue to hold while five routes are intentionally unmigrated. Running without an explicit mode or route target is an error so a skipped wiring gate cannot look like success.

## Phase 1 sequence

The least-coupled wiring order is:

1. admit one route and create a new non-overwriting checkpoint;
2. add the ordered design-system imports without deleting route art direction;
3. replace only the header/footer/skip-link DOM with the shared contract;
4. map proven local primitives to shared classes or tokens;
5. preserve or register each route exception before removing any local rule;
6. render at all four widths and verify keyboard, overflow, reduced motion and 200 percent zoom;
7. repeat route by route;
8. enable `--route-conformance` only after all six consumers are intentionally wired.

Product pages, Shopify theme integration, catalogue truth, cart implementation, production deployment and client acceptance require separate authority. Phase 0 provides a reviewable foundation; it grants none of those permissions.
