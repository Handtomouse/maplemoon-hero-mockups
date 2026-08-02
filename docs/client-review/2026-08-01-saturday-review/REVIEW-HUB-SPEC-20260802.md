# MapleMoon client-review hub specification

**Status:** local specification only; not implemented, served or approved for sharing  
**Audience under consideration:** Carli and Dylan  
**Package:** six-page Saturday clean review  
**External action:** HOLD until Nate approves the exact frozen artifact, audience, channel, wording, access route and feedback route after waking

## Purpose

Give a non-technical reviewer one calm entry point for the six clean pages, make the limits of the prototype obvious, and provide a consistent way to describe feedback. The hub must never expose annotated pages, governance files, WIP labels, technical IDs, localhost paths or internal status records.

## Information architecture

The future hub has one page and no hidden workflow:

1. **Welcome** — one sentence explaining that this is a review of the proposed MapleMoon website experience, not a live shop.
2. **What to expect** — three short labels:
   - **Ready to review:** visual direction, page structure, navigation and the mock shopping journey.
   - **Intentionally mocked:** Add to Cart, cart and checkout confirmation; no order or payment is created.
   - **Feedback needed:** factual/content corrections, design preferences, missing assets, broken interactions and accessibility issues.
3. **Review the six pages** — six equal navigation cards in this order:

| Label | Clean route | Review focus |
|---|---|---|
| Homepage | `staging-v1/clean/homepage.html` | First impression, messaging, hierarchy and onward paths |
| Shop | `staging-v1/clean/shop.html?compact-variant=f` | Catalogue structure, product clarity and mock cart journey |
| Our Story | `staging-v1/clean/our-story.html` | Founder story, imagery and pacing |
| Carob Story | `staging-v1/clean/carob-story.html` | Carob education, factual clarity and visual storytelling |
| Stockists | `staging-v1/clean/stockists.html` | Finding a stockist and directory expectations |
| FAQ | `staging-v1/clean/faq.html` | Question coverage, clarity and navigation |

4. **Two-minute review flow**:
   1. Open a page from the hub.
   2. Scan it once as an ordinary visitor.
   3. Try the main navigation or interaction.
   4. Note the page, visible section and feedback type.
   5. Return to the hub and continue or open the mock feedback flow.
5. **Feedback** — a clearly review-only mock form using the companion schema. It must not transmit or retain data until a separately approved service, owner, privacy notice and retention rule exist.
6. **Thank-you state** — honest prototype wording: “Thanks — this review prototype has demonstrated the submission step. No feedback has been sent or stored.”

## Clean-surface rules

- The hub links only to the six clean pages.
- Annotated pages may retain blocked evidence for internal review, but they are not linked, indexed or described on the clean hub.
- Every page provides an obvious, keyboard-accessible route back to the hub once implementation is separately admitted.
- Do not show “WIP”, “placeholder”, “unknown”, internal note IDs, QA controls, review dots, governance labels or unfinished-state language to an ordinary viewer.
- If a fact, product image, price, process statement or asset is unresolved, the clean package uses the already-approved safe treatment or omits it; the hub does not explain internal disputes.

## Feedback taxonomy

Reviewers choose one plain-language type:

- **Factual or content correction** — something is inaccurate, unclear or missing in the words.
- **Design preference** — a visual, layout or hierarchy preference rather than a defect.
- **Missing asset** — an image, logo, document or other supplied material is absent or wrong.
- **Broken interaction** — a link, button, navigation path or mock commerce step does not work as expected.
- **Accessibility issue** — reading, zoom, keyboard, focus, contrast, motion or usability problem.

The form asks for the page, visible section, device family, feedback type and optional concise comment. It does not ask for technical IDs, a name, email, phone number, precise location or sensitive information.

## Accessibility and ordinary-viewer acceptance

Before implementation can be accepted:

- the hub and all controls work at 390 px and 1440 px without unintended horizontal overflow;
- literal browser zoom at 200% preserves content and action access;
- keyboard order follows the visual order, focus is visible, and all six page cards and the feedback controls are operable;
- headings and landmarks describe the page; labels are persistent and error text is associated with its field;
- motion respects reduced-motion preference;
- every clean page has a consistent way back to the hub;
- the mocked status is clear before any cart or feedback submission action;
- no network request, storage write, analytics event or cookie occurs from the mock feedback flow.

## Current evidence and implementation gates

Current local inventory confirms six clean HTML pages, titles and favicon references on all six, and `noindex,nofollow` on all six. It also confirms no clean review hub, descriptions on only four pages, and no Open Graph or canonical metadata in the targeted scan.

The following remain separate gates:

- Nate selects the exact frozen package and approves implementation of the hub.
- Nate approves the audience, channel, message wording, access method, expiry and feedback destination after waking.
- A factual-safety pass approves every public metadata sentence; current process wording must not be assumed safe.
- A privacy/security owner approves any real form, storage, analytics, notice, retention or deletion process.
- A rendered independent review passes before any promotion or sharing.

## Explicit exclusions

No deployment, public link, password system, analytics, cookies, data collection, client contact, Shopify, WooCommerce, Vercel, production integration, catalogue change, new product fact or client-facing send is part of this specification.
