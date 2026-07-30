# Coordinator Triage - 2026-07-21

## Scope
- Inputs reviewed: `_wip/_section_reviews/home-thursday-review.md`, `_wip/_section_reviews/shop-thursday-review.md`, `_wip/_section_reviews/our-story-thursday-review.md`, and `_wip/_section_reviews/support-pages-status.md`.
- Output purpose: combine lane findings into one ordered, bounded merge queue for Thursday prep.
- Ownership: this artifact is triage only. It does not authorize this worker to edit shared WIP HTML, `_SECTION_TRACKER.html`, checkpoints, deploys, pushes, Shopify promotion, DNS, email, or client comms.
- Priority basis: bounded visible/source-truth fixes first for shop, then our-story, then homepage.

## Must Fix Before Thursday

### Shop
- `_wip/shop.WIP.html:299-320` - remove or null pending-category placeholder price fields for moons, bites, and bananas - their visible UI is pending, and source data should not retain unconfirmed numeric prices that could leak through future rendering or inspection.
- `_wip/shop.WIP.html:90-94,324-334` - let pending card status and disabled CTA wrap or stack at the mobile breakpoint - the long `Pricing to follow` row should remain fully visible inside cards at 390px instead of relying on page-level `overflow-x:hidden`.

### Our Story
- `_wip/our-story.WIP.html:336` - change the image alt text from `Two hands passing a carob banana between them` to `Two hands passing a carob pod between them` - the asset shows a carob pod, and accurate alt text keeps the editorial founder image truthful.

### Homepage
- `_wip/homepage_real_1_lead_photo.WIP.html:721,1065-1068` - either wire the enabled priced-category `Shop Now` button to a confirmed destination or downgrade it to a truthful working non-purchase route - an enabled commerce CTA must not be dead during Thursday review.
- `_wip/homepage_real_1_lead_photo.WIP.html:713-734` - clarify the relationship between the product fan, category selector, selected detail, and CTA - visitors should be able to choose Bars, Moons, Elixirs, Bites, or Bananas before interpreting the selected product state.
- `_wip/homepage_real_1_lead_photo.WIP.html:861,915,929` and page utility/footer links - preserve `stockists.WIP.html` routing through Thursday review. Do not replace WIP-local stockists links with final Shopify routes until final mapping exists.
- `_wip/homepage_real_1_lead_photo.WIP.html:849-861` and `_wip/stockists.WIP.html:233-312` - keep the representative homepage stockist set reviewable but provisional. Branch-level confirmation remains required before promotion, especially for brand-level labels such as `WholeLife Pharmacy` and `Seasons IGA`.
- `_wip/_CHECKPOINT_20260721.md:18` and `_wip/_SPLIT_CHECKPOINT_20260721.md:38-40` - keep stockist logo assets, Shopify collaborator access, and final Shopify URL mapping listed as blockers until owner confirmation exists.

## Content Blocked
- Testimonials pending from Carli and Dylan.
- Moons, bites, and bananas pricing pending.
- Founder photos pending.
- Social URLs pending.
- OG image pending.
- Stockist logos and final Shopify URL mapping pending.
- Shopify collaborator access pending.
- Final stockist branch mapping, brand capitalization, logo permissions, and store-level routing remain owner-confirmation items.
- Final Shopify product URLs and cart behavior are not present in WIP; Bars and Elixirs should not be treated as production-purchasable from local labels alone.

## Nice To Have
- Repeated `Vegan`, `GF`, and `No Caffeine` chips need confirmation against product-level data before promotion.
- Category naming for moons, bites/eclipses, and bananas needs alignment before promotion.
- Homepage selector label readability, tasting-note cue, sampler mobile clustering, fan geometry, and stockist marquee behavior need visual QA after any merge.

## Out Of Scope
- Do not deploy, push, promote to Shopify, change DNS, send email, or perform client comms.
- Do not edit Carob Story or FAQ for Thursday-prep unless Nate explicitly expands scope.
- Do not replace `stockists.WIP.html` routing with final Shopify URLs until final URL mapping exists.
- Do not add unconfirmed testimonials, product prices, product URLs, social URLs, stockist logos, founder portrait content, policies, claims, or product-level dietary labels.
- Do not make moons, bites, or bananas purchasable.
- Do not replace the recognisable homepage product fan with a range grid or start a new concept board.
- Do not edit shared WIP HTML outside the serialized coordinator merge.

## Merge Order
1. `_wip/shop.WIP.html`
2. `_wip/our-story.WIP.html`
3. `_wip/homepage_real_1_lead_photo.WIP.html`
4. `_wip/_SECTION_TRACKER.html`
5. `_wip/_CHECKPOINT_20260721.md` or a new dated checkpoint

## Stop Rules
- Stop once home, shop, and our-story are truthful, reviewable, and verified.
- Do not build around missing inputs.
- Do not start more review sessions after the must-fix queue is clear.

## Verification Plan
1. Before merging, snapshot `git status --short` and confirm unrelated dirty work is preserved.
2. After the shop merge, run `python3 -m html.parser _wip/shop.WIP.html`, `git diff --check -- _wip/shop.WIP.html`, and a 390px browser check for pending card row wrapping.
3. After the our-story merge, run `python3 -m html.parser _wip/our-story.WIP.html`, `git diff --check -- _wip/our-story.WIP.html`, and a 390px browser check for the hero/story/founders stack.
4. After the homepage merge, run `python3 -m html.parser _wip/homepage_real_1_lead_photo.WIP.html`, `git diff --check -- _wip/homepage_real_1_lead_photo.WIP.html`, and browser checks at desktop and 390px for CTA behavior, selector hierarchy, fan geometry, sampler position, and stockist marquee behavior.
5. Keep stockists links WIP-local during link checks: marquee full-list link, trust-bar link, footer link, and home/shop/our-story utility links should continue to point to `stockists.WIP.html`.
6. Update `_wip/_SECTION_TRACKER.html` and checkpoint only after page merges and verification are complete.

## Residual Risk
- Thursday readiness remains bounded to home, shop, and our-story reviewability, not launch completeness.
- Shopify collaborator access, final route mapping, commerce integration, final stockist assets, approved testimonials, final founder portraits, social URLs, and OG imagery remain unresolved blockers.
- Browser geometry has to be rechecked after coordinator merges; lane reviews included source/CSS checks but not a full post-merge visual pass.
- Metadata may still reference future Shopify surfaces; do not treat those as confirmed final route mappings.
