# Page Review: Support Status

## Scope
- Files reviewed: `_wip/stockists.WIP.html`, `_wip/carob-story.WIP.html`, `_wip/faq.WIP.html`, `_wip/homepage_real_1_lead_photo.WIP.html`, `_wip/shop.WIP.html`, `_wip/our-story.WIP.html`
- Review mode: status-only; no support-page implementation or shared WIP HTML changes.

## Must Fix Before Thursday
- `_wip/homepage_real_1_lead_photo.WIP.html:861,915,929`: Keep every homepage stockists route pointed to `stockists.WIP.html`. The marquee full-list link, trust-bar link, footer link, and the home/shop/our-story utility links currently stay WIP-local; preserve this state through Thursday review.
- `_wip/homepage_real_1_lead_photo.WIP.html:849-861`: Treat the representative stockist set as reviewable but provisional. The named selection is credible against the full list in `_wip/stockists.WIP.html:233-312`, including GoVita, Maloneys, Health Emporium, Ripe Organics, Village Greens, Turramurra Wholefoods, Surfcoast Wholefoods, Fill Good Bulk Store, In2Health, Patterson's Organics, Harpers Food Market, Goodness Me, and Five Vegans. `WholeLife Pharmacy` and `Seasons IGA` are brand-level labels while the full list is branch-specific, so exact branch confirmation remains required before final promotion.
- `_wip/_CHECKPOINT_20260721.md:18`, `_wip/_SPLIT_CHECKPOINT_20260721.md:38-40`: Keep stockist logo assets, Shopify collaborator access, and final Shopify URL mapping listed as blockers. Do not replace WIP links with final Shopify routes or add logo claims/assets until those inputs are confirmed.

## Nice To Have
- When the stockist page is eventually promoted, normalize brand capitalization and branch naming across the full list and the homepage representative set so a visitor can reconcile the marquee labels with exact store entries.
- Add final stockist logos only after the lineup and permissions are confirmed; the current homepage comment already identifies the logo set as pending.

## Content Blocked
- Final Shopify URL mapping for the stockists page and final store-level routing are blocked by Shopify collaborator access and unconfirmed URL data.
- Final stockist logo selection/assets remain pending.
- Carob Story and FAQ are outside the Thursday home/shop/about focus. Their WIP pages remain linked/status-visible, but they are not Thursday implementation or promotion targets (`_wip/_CHECKPOINT_20260721.md:4-6,19`).

## Do Not Change
- Do not build or revise Carob Story or FAQ in this lane.
- Do not change homepage, shop, or our-story stockists links away from `stockists.WIP.html`.
- Do not promote WIP links to final Shopify URLs.
- Do not add unconfirmed stockist branches, logos, testimonials, or claims.

## Exact Suggested Edits
- Current state: the homepage has a 70+ stockist claim, a representative marquee, and a full-list link to `stockists.WIP.html`; the WIP stockists page contains 71 listed retailers split into national chains and independent stores.
- Proposed state: preserve the current WIP-only routing and representative set for Thursday review, while carrying exact branch mapping, logo assets, and Shopify collaborator access as explicit post-review blockers.
- Reason: the static review surface is internally traceable without implying final commerce routing or final brand-asset approval.

## Verification Run
- HTML parser: passed for `_wip/stockists.WIP.html`, `_wip/carob-story.WIP.html`, `_wip/faq.WIP.html`, and `_wip/homepage_real_1_lead_photo.WIP.html`.
- Diff check: passed for both new Markdown reports; no shared WIP HTML was edited by this worker.
- Link/status check: homepage and relevant page navigation references remain WIP-local for stockists; Carob Story and FAQ are present as out-of-scope WIP surfaces.
- Desktop: not run; this lane was a file/status review only.
- Mobile: not run; this lane was a file/status review only.

## Residual Risk
- The current branch-level stockist list and the homepage's brand-level representative labels still need owner confirmation before final Shopify migration.
- The WIP pages contain canonical/metadata references to future Shopify URLs, but those are metadata surfaces, not confirmed final route mappings.
