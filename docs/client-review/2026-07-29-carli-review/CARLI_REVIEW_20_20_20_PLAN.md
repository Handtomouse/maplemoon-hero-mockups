# MapleMoon Carli review: 20 / 20 / 20 plan

Internal planning aid for the 29 July review package. Proposed only: no item below authorises a WIP edit, Shopify change, deployment, upload, or client contact.

## 20 improvements to consider

| ID | Improvement | Evidence or decision needed | Gate |
|---|---|---|---|
| I01 | Make the homepage hero proposition immediately legible | Carli confirms the first-screen message and hierarchy | Carli review |
| I02 | Confirm the hero primary CTA wording and destination | Confirm “Shop the Range” intent before Shopify wiring | Copy + route |
| I03 | Keep the secondary hero CTA stripped unless a later decision reinstates it | Existing homepage disposition | Nate lock |
| I04 | Make the carob story pathway unmistakable | Confirm CTA label and target page | Carli review |
| I05 | Reconcile the product range names and variants | WooCommerce export plus catalogue reconciliation | CAT-01 |
| I06 | Mark provisional prices and weights consistently | Confirm approved retail values | Client + commerce |
| I07 | Replace provisional stockist counts with one verified dataset | Resolve 180+, 200+, and 204/7-confirmation conflict | Data gate |
| I08 | Keep shipping and ordering language aligned with the non-checkout WIP | Confirm Australia-first policy and launch stage | Commerce gate |
| I09 | Make product cards consistent across homepage and Shop | Compare names, imagery, price, and status | Catalogue QA |
| I10 | Keep testimonials as neutral placeholders until receipts are recorded | Use the consent checklist | Consent gate |
| I11 | Separate website/private-review permission from promotional permission | Confirm quote-by-quote scope | Consent gate |
| I12 | Confirm the founders and Our Story copy with Carli | Flag unsupported or unfinished founder inputs | Client review |
| I13 | Make the Carob Story education flow easy to scan | Confirm section order, claims, and CTA | Copy + IA |
| I14 | Make FAQ answers operationally accurate | Confirm delivery, storage, allergy, and returns language | Client + legal |
| I15 | Make Stockists useful without implying a live directory | Confirm data source and update owner | Data gate |
| I16 | Confirm mobile navigation and hero spacing in Shopify port | Deferred homepage dispositions | Shopify port |
| I17 | Preserve a calm fallback when hero video cannot load | Test poster/fallback and reduced motion | Runtime QA |
| I18 | Strengthen keyboard focus and tap-target consistency | Run the accessibility matrix | A11y QA |
| I19 | Prepare a client-safe asset bundle with no internal links | Replace the local symlink before delivery | Packaging gate |
| I20 | Define the review-to-Shopify handoff receipt | Record accepted, deferred, blocked, and owner fields | Nate + Claude Code |

## 20 checks to run

| ID | Check | Pass condition | Evidence |
|---|---|---|---|
| C01 | All six canonical pages open from the index | Every local link resolves | Link scan |
| C02 | Two support pages are client-safe | No internal tracker/orchestrator links | Staging scan |
| C03 | Staging HTML parses | All staging HTML files parse without error | Parser output |
| C04 | No consent-pending names leak into staging | Natasha, Janice, and Acacia absent from staging | Consent scan |
| C05 | Review metadata is non-indexing | noindex/nofollow/noarchive on staging pages | Metadata scan |
| C06 | No live canonical points from staging | No live-site canonical tags remain | Metadata scan |
| C07 | Relative CSS and asset references resolve | No broken local references except deliberate dynamic paths | Link scan |
| C08 | Asset delivery is portable | No broken symlink in a final bundle | Package scan |
| C09 | Desktop hero at 1440px is readable | Brand, copy, CTA, and credentials remain legible | Screenshot/Browser |
| C10 | Mobile hero at 390px is readable | No clipping, overlap, or crowded controls | Screenshot/Browser |
| C11 | Six pages pass 1024px review | Layout remains coherent at tablet width | Screenshot/Browser |
| C12 | Keyboard traversal works | Focus is visible and order is sensible | Interaction QA |
| C13 | Tap targets meet the current requirement | Primary controls are comfortably tappable | Interaction QA |
| C14 | Reduced-motion behavior works | Motion is suppressed or safely reduced | Browser test |
| C15 | Hero video fallback works | Poster/static fallback is present and readable | Runtime test |
| C16 | Internal forms and mail links are labelled as WIP | No false promise of a production workflow | Copy scan |
| C17 | Product claims match the reconciled catalogue | Names, sizes, price, and availability agree | Catalogue ledger |
| C18 | Stockist claims match the verified dataset | Counts and locations agree | Stockist ledger |
| C19 | Vercel access control is actually verified | Auth/protection is proven from project state or test | Vercel evidence |
| C20 | Final message and artifact match exactly | The reviewed link/file is the one proposed for sending | Nate review |

## 20 review points for Carli

| ID | Ask Carli to review | Capture |
|---|---|---|
| R01 | Does the homepage feel like MapleMoon in the first few seconds? | Screenshot or note |
| R02 | Is the hero wording clear and emotionally right? | Copy comment |
| R03 | Does the hero video feel calm, premium, and appropriate? | Candidate choice |
| R04 | Is the hero primary CTA the right next action? | Wording + destination |
| R05 | Is the carob section understandable without prior context? | Content comment |
| R06 | Does “The full carob story” accurately represent the destination? | CTA approval |
| R07 | Are the product names and flavours correct? | Catalogue correction |
| R08 | Are the provisional product values visibly marked for review? | Confirm or correct |
| R09 | Which stockist information is current and publishable? | Data correction |
| R10 | Is the Stockists page useful even before the final dataset? | IA/content comment |
| R11 | Are the Our Story people, dates, and claims accurate? | Copy approval |
| R12 | Are the Carob Story facts and tone accurate? | Copy approval |
| R13 | Do the FAQ answers reflect the intended customer experience? | Policy correction |
| R14 | Is anything missing from the six-page navigation? | Page/IA note |
| R15 | Does the page order make sense for a first-time visitor? | IA comment |
| R16 | Does the mobile experience feel as considered as desktop? | Screenshot/note |
| R17 | Are any images wrong, missing, or needing replacement? | Asset note |
| R18 | Which testimonial wording and attribution can be approved? | Consent checklist |
| R19 | What must be ready for the Carli/Dylan Shopify and order-flow session? | Session input list |
| R20 | What are the top three changes before Saturday's non-live click-through? | Prioritised actions |

## Handoff rule

Carli feedback becomes a structured receipt. Each item is marked `accepted`, `change requested`, `blocked`, `deferred to Shopify`, or `needs client asset`, with an owner and evidence path. Claude Code may implement only an admitted packet with explicit file scope; Codex reviews the receipt, re-plans the next packet, and stops at any external or approval gate.
