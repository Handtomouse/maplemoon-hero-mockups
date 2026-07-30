# MapleMoon Support Pages: Execution Brief

Status: review and planning only. No production, Shopify, DNS, email, or source-page changes are included here.

## Current Decision Split

- **Carob Story first.** Its job is to explain the ingredient and build confidence before selling the range.
- **Shop is a separate task.** Do not use the Carob pass to resolve pricing, product naming, or purchase states.
- **FAQ is a separate task.** Target 8-10 calm, direct questions, beginning with carob and cacao, then product and ordering support.
- **Stockists is data-led.** Preserve the existing map-style WIP; collect verified store, suburb/locality, state, store type, and logo permission before adding exact store detail.
- **Homepage colour is still a visual decision.** Compare the existing `11 Homepage Bridge` and `01 Horizon Wash` review skins before changing a homepage source file.

## Carob Story Direction

Audience: a shopper who knows the name carob but does not yet understand why Maple Moon uses it.

Page job: make the pod tangible, show the path from pod to bar, then give a restrained factual comparison with cacao.

First viewport: a real farm or pod image, a direct `What is carob?` heading, and three compact facts. The review artifact is `_wip/_section_variants/carob-story-first-viewport-review-20260723.html`.

### Fact Guardrails

Use only the established language already present in Maple Moon WIP:

- Carob is a naturally sweet pod, not a bean.
- Maple Moon uses Australian-grown carob.
- Carob is naturally caffeine free.
- Maple Moon slow-roasts carob and mills it with cacao butter.
- Maple Moon makes products in small batches on the NSW far north coast.

Do not add health, digestion, sleep, mood, antioxidant, stimulant, theobromine, sugar, organic-certification, allergen, or medical claims without an approved product/source reference. Do not write `nothing added` as a general Carob Story claim because the range includes cacao butter and product-specific ingredients.

### Real Asset Shortlist

1. `assets/licensed/carob_farm/australian-carob-0205-16x9.jpg` - 2560 x 1440 farm view, best desktop hero.
2. `assets/licensed/carob_farm/australian-carob-0205-mobile.jpg` - 1080 x 1350 mobile crop.
3. `assets/licensed/carob_pods_macro.jpg` - 7360 x 4912 pod detail.
4. `assets/hero_shots/carob_branch_dusk.jpg` - 2200 x 1228 Maple Moon blue-hour pod image.
5. `assets/product_shots/bar_pure_carob_hero.webp` - 1200 x 1800 optional product cue only.

The old wireframe is useful for its left-copy/right-image hierarchy and compact comparison framing. Its health and ingredient claims are not approved copy.

## Separate Follow-up Lanes

### FAQ

Use Carob Story facts first, then create a clean 8-10 question outline. Keep `Still have questions?` as an email CTA. Verify product-specific answers before promotion.

### Shop

Audit real SKU names, category naming, pack sizes, and price readiness separately. Keep Moons, Bites/Eclipses, and Bananas in an honest pending state until pricing is verified.

### Stockist Intake

Required before exact finder details:

| Field | Required state |
| --- | --- |
| Store name | verified |
| State and suburb/locality | verified |
| Store type | verified where useful |
| Address, phone, hours, coordinates | omit until verified |
| Logo asset and usage permission | verified before display |
| Shopify destination/collection mapping | pending collaborator access |

### Shopify, DNS, and Mail

Recommended approach: prepare a read-only migration map first. Record domain host, current website host, MX records, existing mailboxes, Shopify collaborator access, and current-to-final URL mapping. Do not change DNS, MX, hosting, or Shopify routes until Dylan supplies the cPanel details and the mailbox inventory is confirmed.

## Comms State At 10:41 AEST, 23 Jul

- Carli and Dylan both acknowledged the 9:54am iMessage. No reply is needed.
- Dylan still needs to supply cPanel/DNS and mailbox details.
- Gmail remains unavailable in the sandbox, so the cross-channel check is partial. Recheck before drafting a client message or call brief.
