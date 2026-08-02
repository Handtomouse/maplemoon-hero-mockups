# MapleMoon Shopify Online Store 2.0 translation map

**Status:** local architecture specification only  
**Default architecture:** native Shopify Online Store 2.0 theme, subject to later store/theme verification  
**Not selected:** headless commerce, custom synchronisation, webhooks, paid apps or a base theme  
**Store access:** none used or authorized

## Translation principles

1. Preserve the approved visual and content intent, not the prototype's file structure or hard-coded data.
2. Use native Shopify product, variant, price, availability, cart, checkout, collection and customer-event surfaces wherever they own the truth.
3. Keep editorial sections configurable through OS2 section settings and blocks, with sensible limits and fallbacks.
4. Import no product, price, availability, ingredient, certification, stockist or process fact until its verified source and owner are recorded.
5. Keep the review hub, mock cart, fake checkout confirmation, annotations and QA controls out of the production theme.
6. Treat accessibility, responsive behaviour, metadata, performance and reduced motion as acceptance criteria, not optional polish.

## Shared theme architecture

| Current responsibility | Proposed OS2 responsibility | Data/configuration | Gate |
|---|---|---|---|
| Colour, type, spacing, radius, shadows and motion | `settings_schema.json`, CSS custom properties and documented design tokens | Brand-approved fonts, colours and scale | Typekit/font licensing, contrast and performance review |
| Header, primary/utility navigation, logo, currency/cart | Header section group plus native menus, localization and cart state | Shopify menus, logo/image settings, market/currency configuration | Final navigation, markets and account choices |
| Announcement/status messaging | Optional announcement-bar section | Merchant-editable text/link blocks | No unsupported promotion or claim |
| Footer, contact and policy links | Footer section group with native menus and policy links | Menus, contact details, social links and policy objects | Client-approved contact, legal and social destinations |
| Product card | Shared Liquid snippet/component using product objects | Product title, featured media, price, compare-at price, availability, tags/metafields | Verified catalogue import and card-content rules |
| Cart drawer | Native Shopify cart/Ajax Cart APIs with accessible focus management | Native cart lines and cart attributes only | Checkout settings, shipping/tax and interaction UAT |
| Checkout | Native Shopify checkout | Shopify checkout configuration | Plan/permissions, payments, shipping, tax, policies and legal approval |
| Images/video | Theme image/video settings with responsive sources and alt text | Approved masters, crops, focal points and alt text | Provenance, consent, crop and performance QA |
| Metadata | Theme/page/product SEO fields and layout-level social metadata | Approved title, description, canonical, social image | Final URL, noindex/index decision and factual-safety pass |
| Forms | Native contact/customer forms where suitable | Approved destination, notice and consent copy | Spam, privacy, retention, owner and integration review |

## Page and section mapping

### Homepage → `templates/index.json`

| Current section | Proposed section responsibility | Data authority | Notes/gate |
|---|---|---|---|
| Hero `#top` | `mm-hero` with image/video, mobile fallback, focal point, heading, two CTAs and reduced-motion behaviour | Approved brand copy and hero assets | No autoplay dependency; no unsupported claim |
| Range/selector `#range`, `#shop`, `#product` | Native featured collection or product-spotlight section using product references | Shopify product/collection objects after verified import | Prototype selector logic does not become catalogue truth |
| Carob introduction `#carob` | `mm-editorial-split` with heading, body, media and link blocks | Approved Carob copy/evidence | Cacao comparison remains blocked until substantiated |
| Ritual `#ritual` | `mm-editorial-cards` with image/text blocks | Approved supplied or separately approved candidate imagery | Wave 1D candidates remain unwired until selected |
| Founder/story bridge `#story` | Image-with-text/editorial section | Approved founder copy and imagery | Individual portraits remain source-gated where required |
| Stockist preview `#stockists` | `mm-stockist-preview` search/link summary | Verified stockist data source or safe static CTA | Do not hard-code unverified store records |
| Sampler `#sampler` | Native featured product, bundle product or collection section only if a real catalogue object exists | Verified catalogue and selling options | No invented pack, contents, price, availability or bundle logic |
| Trust/reassurance `#trust` | Evidence-backed icon/text blocks | Approved policy, ingredient/certification and service facts | Each statement requires source ownership |

### Shop → `templates/collection.json` plus optional editorial page sections

| Current section | Proposed responsibility | Data authority | Notes/gate |
|---|---|---|---|
| Catalogue hero | Collection banner/hero section | Approved editorial copy and collection image | Keep concise and factual |
| Sampler feature `#packs` | Featured product only if an admitted Shopify product exists | Verified product/catalogue | Omit cleanly if unsupported |
| Search/filter/sort controls | Native collection filtering/sorting where supported | Product options, tags/metafields and collection structure | Taxonomy and Search & Discovery/app choice require review; no default paid app |
| Category rail `#catalogue` | Collection navigation using native menus/collection references | Approved collection taxonomy | One catalogue rail, not a second global navigation |
| Bars `#bars` | Collection/product grid | Shopify collection/product objects | Full-width major range |
| Moons `#moons` | Collection/product grid | Shopify collection/product objects | Keep unpackaged presentation until real retail packaging exists |
| Bites & Eclipses `#bites` | Collection/product grid | Shopify collection/product objects | Omit any item whose truthful image/data fails provenance QA |
| Elixirs `#elixirs` | Compact collection/list section | Shopify collection/product objects | Two confirmed products only if catalogue proves them |
| Bananas `#bananas` | Compact product/collection card | Shopify product object | Keep unpackaged until real packaging exists |
| Powder `#powder` | Compact product/collection card | Shopify product object | Price, weight and availability from Shopify only |

Product-detail pages use `templates/product.json` with native media, variants, quantity, availability, price, cart form, shipping/policy links and optional evidence-approved accordions. The review prototype's neutral `View product/Enquire` treatment remains valid only until real catalogue and commerce objects are admitted.

### Our Story → `templates/page.our-story.json`

| Current section | Proposed section responsibility | Gate |
|---|---|---|
| Maker hero | `mm-founder-hero` with approved joint or individual portrait layout | Individual crops need their real source delivery; no generated founders |
| Story sub-navigation | Accessible anchor navigation section | Final section names and mobile overflow QA |
| Shared story `#story` | Rich text/image editorial section | Exact approved bios and source copy |
| Ingredient bridge `#ingredient` | Editorial callout | Evidence-backed product/ingredient wording only |
| Beginnings `#carob` | Timeline or image-with-text blocks | Carli-approved factual wording |
| Pull quote | Quote section | Exact permission/attribution gate where applicable |
| Place `#place` | Image-with-text/place section | Approved location copy and imagery |
| Studio range `#range` | Editorial gallery | Approved masters, alt text and crops |
| Shop CTA `#shop` | CTA section linked to collection | Final destination and CTA copy |

### Carob Story → `templates/page.carob-story.json`

| Current section | Proposed section responsibility | Gate |
|---|---|---|
| Hero `#top` | Editorial hero | Approved neutral introduction and imagery |
| Carob/cacao `#carob-and-cacao` | Evidence-led comparison/education section, disabled by default | Sentence-level source map and claims review; absent until substantiated |
| Pod gallery `#gallery` | Media gallery with captions/alt text | Approved source photography and factual captions |
| Range CTA | Collection CTA | Final destination and claim-safe copy |
| FAQ `#faq` | Collapsible content blocks or referenced FAQ data | Approved answers and duplication policy |

### Stockists → `templates/page.stockists.json`

| Current section | Proposed section responsibility | Data authority/gate |
|---|---|---|
| Hero | Editorial hero | Approved count/location wording; no unverified “200+” claim |
| Finder | `mm-stockist-finder` presentation over an approved data source | Data owner must choose verified Shopify metaobjects, a vetted app or another approved source; no unreviewed hard-coded production list |
| Search/filter/results | Accessible client-side or app-backed finder | Store name, address, suburb, postcode, state, link and status need provenance/update owner |
| Empty/help/online CTA | Fallback content blocks | Final commerce/contact destination |
| Wholesale | Contact/wholesale CTA or native form | Recipient, spam, privacy and retention review |
| Newsletter | Native customer form or approved email integration | Consent copy, provider, double opt-in and data-owner gate |

### FAQ → `templates/page.faq.json`

| Current section | Proposed section responsibility | Data authority/gate |
|---|---|---|
| Hero/search | FAQ hero plus accessible local filtering | Approved question/answer dataset |
| Popular questions | Curated FAQ references | Editorial owner and ordering |
| Category navigation/results | Collapsible FAQ section blocks or verified reusable data model | Avoid duplicated conflicting answers across Carob Story and FAQ |
| Quick actions/support | Contact, wholesale, stockist and policy links | Final destinations and ownership |
| Support CTA | Native contact route | Privacy/spam and service-response owner |

## Data translation

| Domain | Shopify target | Required source | HOLD condition |
|---|---|---|---|
| Products/variants | Product and variant objects | Fresh WooCommerce export plus approved retail catalogue | Missing, conflicting or stale product facts |
| Prices/selling options | Variant price, compare-at price and selling-plan objects only where approved | Current WooCommerce truth and client approval | Any inferred pack, discount, subscription or wholesale rule |
| Availability/inventory | Shopify inventory/availability | Approved inventory and location setup | No verified owner or sync/cutover plan |
| Ingredients/dietary/certification | Product metafields with definitions | Label/certification evidence and approved claims | General carob evidence used as MapleMoon-specific proof |
| Product media | Product media with alt/focal/crop records | Approved masters and provenance | Distorted, wrong, generated-as-real or unapproved packaging |
| Editorial copy | Page/section settings or metaobjects where appropriate | Carli-approved source copy | Roast, mill, smooth-carob, small-batch or comparative claim unresolved |
| Stockists | Approved structured source | Current verified directory and owner | Unknown update cadence or source truth |
| FAQ | Section blocks or approved reusable content model | Approved answer register | Contradictory or unsupported answer |
| Redirects/SEO | Shopify redirects and SEO fields | Current URL inventory and final information architecture | Missing domain owner or collision analysis |

## Implementation order

1. Confirm store, plan, roles, 2FA, development-theme route and base-theme decision.
2. Freeze approved design tokens, six-page section contracts and source hashes.
3. Build shared header/footer/tokens/accessibility primitives in an unpublished development theme.
4. Implement editorial templates with placeholder-free approved content only.
5. Admit catalogue provenance extraction, reconcile products/variants/media, then import into a test environment.
6. Replace mock Shop/cart/checkout behaviour with native Shopify behaviour.
7. Add only approved forms, stockist data, analytics/consent and integrations.
8. Run deterministic, rendered, accessibility, performance, SEO, commerce and rollback UAT.
9. Obtain written go/no-go before domain/cutover action; keep WooCommerce recoverable through stabilization.

## Explicit exclusions

No theme code, store access, credentials, product import, app installation, webhooks, custom synchronisation, headless build, payment/shipping/tax change, analytics activation, deployment, domain change or production action is authorized by this map.
