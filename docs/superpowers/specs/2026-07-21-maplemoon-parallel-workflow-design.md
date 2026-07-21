# MapleMoon Parallel Workflow Design

## Purpose

Define the fastest safe way to run multiple Codex sessions on the MapleMoon WIP without losing alignment, duplicating work, or creating merge conflicts in shared HTML files.

The target is Thursday review readiness for home, shop, and our-story. This means 80-90% reviewable, not production-complete.

## Recommendation

Use parallel sessions for diagnosis, review notes, small isolated variants, and visual QA. Use one coordinator session for all merges into shared WIP files, tracker updates, checkpoints, and final verification.

This is the right model because the worktree is dirty, the homepage WIP is large, and prior MapleMoon work already showed that shared-HTML concurrency causes merge conflicts and lost decisions.

## Scope

In scope:
- `_wip/homepage_real_1_lead_photo.WIP.html`
- `_wip/shop.WIP.html`
- `_wip/our-story.WIP.html`
- `_wip/stockists.WIP.html` only for link/list/status tracking
- `_wip/_section_reviews/*.md`
- `_wip/_SECTION_TRACKER.html`
- `_wip/_CHECKPOINT_*.md`

Out of scope unless Nate explicitly expands scope:
- deploys, pushes, Shopify promotion, DNS, email, client comms
- new testimonials, unconfirmed product prices, social URLs, stockist logos
- Carob Story and FAQ implementation
- maps, account/cart systems, stockist filters, new full concept boards

## Roles

### Coordinator

The coordinator is the only role allowed to merge final edits into shared WIP files and update the tracker/checkpoint.

Owns:
- merge order
- final edit scope
- conflict avoidance
- `_wip/_SECTION_TRACKER.html`
- `_wip/_CHECKPOINT_*.md`
- final browser/parser/diff verification

May edit:
- `_wip/homepage_real_1_lead_photo.WIP.html`
- `_wip/shop.WIP.html`
- `_wip/our-story.WIP.html`
- `_wip/_SECTION_TRACKER.html`
- `_wip/_CHECKPOINT_*.md`

### Home Review Session

Reviews homepage readiness and produces a written handoff. It should not directly edit the homepage unless the coordinator assigns one exact section and a bounded patch.

Output:
- `_wip/_section_reviews/home-thursday-review.md`

Focus:
- range-detail selector
- tasting notes below the product fan
- commerce/status CTA truth
- reviews pending state
- sampler/trust/stockists consistency
- mobile and desktop hierarchy

### Shop Review Session

Reviews shop truth and card behavior. It should normally write notes only.

Output:
- `_wip/_section_reviews/shop-thursday-review.md`

Focus:
- bars and elixirs priced
- moons, bites, and bananas pending
- no hidden placeholder prices leaking into source truth
- card images, labels, alt text, disabled CTA clarity
- mobile overflow

### Our Story Review Session

Reviews story copy, rhythm, and founder-image honesty.

Output:
- `_wip/_section_reviews/our-story-thursday-review.md`

Focus:
- Carli copy fidelity
- mobile readability
- founder image framed as editorial, not final portrait proof
- no invented founder portrait content

### Support Status Session

Reviews stockists, Carob Story, and FAQ only as status surfaces. It does not build those pages unless scope expands.

Output:
- `_wip/_section_reviews/support-pages-status.md`

Focus:
- stockists links stay on `stockists.WIP.html`
- representative stockist selection remains credible
- final Shopify URL mapping and logos remain listed as blockers
- Carob Story and FAQ remain outside Thursday home/shop/about focus

### Visual QA Session

Runs visual and interaction checks after review notes or after coordinator merges.

Output:
- screenshot paths
- issue list grouped by page and severity

Focus:
- 1440 desktop
- 390 mobile
- no horizontal overflow
- no overlapping text
- no empty `href="#"`
- useful image alt text
- no small tap targets in the review path

## Parallel Work Model

Run at most four active sessions at once:

1. Coordinator
2. Home review
3. Shop review
4. Our Story plus support status review

Visual QA can run as a fifth session only after review notes exist or after coordinator merges. Earlier than that, it often produces findings against stale intermediate states.

## Merge Order

1. Freeze scope: home, shop, our-story, stockists tracking only.
2. Run page review sessions in parallel.
3. Coordinator triages findings into must-fix, content-blocked, nice-to-have, and out-of-scope.
4. Merge one page at a time.
5. Recommended merge order:
   - `shop.WIP.html` first, because commerce truth is concrete and lower risk.
   - `our-story.WIP.html` second, because copy fidelity and founder framing are separate from commerce.
   - `homepage_real_1_lead_photo.WIP.html` last, because it is the largest and highest-conflict file.
6. Update `_SECTION_TRACKER.html` and checkpoint only after verified page merges.
7. Run final review pack across home, shop, and our-story.

## Review Handoff Format

Every parallel review session should use this concrete shape and replace the example content with page-specific findings:

```md
# Page Review: Shop

## Scope
- Files reviewed: `_wip/shop.WIP.html`

## Must Fix Before Thursday
- `_wip/shop.WIP.html:289`: Remove hidden placeholder prices from pending product data so the source truth matches the visible `Pricing to follow` state.

## Nice To Have
- Tighten mobile spacing in the category nav if labels wrap awkwardly at 390px.

## Content Blocked
- Moons, bites, and bananas final prices are not confirmed and must not be invented.

## Do Not Change
- Do not make moons, bites, or bananas purchasable.
- Do not route to final Shopify product URLs.
- Do not add unconfirmed product claims.

## Exact Suggested Edits
- Current state: pending categories have visible `Pricing to follow`, but some source product objects still contain placeholder prices.
- Proposed state: set pending category product prices to `null` or remove those fields, while keeping the rendered card text as `Pricing to follow`.
- Reason: the review page should be truthful in both visible UI and source data.

## Verification Run
- HTML parser: not run by reviewer unless requested.
- Diff check: not run by reviewer unless requested.
- Desktop: note reviewed width and result.
- Mobile: note reviewed width and result.

## Residual Risk
- Final Shopify variants and pricing still need collaborator access and confirmed data.
```

## Verification Gates

For each merged page:

```bash
python3 -m html.parser _wip/page.WIP.html
git diff --check _wip/page.WIP.html
```

Manual/browser smoke:
- desktop around 1440px
- mobile around 390px
- no horizontal overflow
- nav/footer links stay inside WIP pages
- stockists links point to `stockists.WIP.html`
- no empty `href="#"`
- images have useful alt text
- no invented claims, reviews, pricing, stockist logos, or social URLs
- no visible em dashes in supplied copy
- pending content remains clearly pending

Final closeout:

```bash
python3 -m html.parser _wip/homepage_real_1_lead_photo.WIP.html _wip/shop.WIP.html _wip/our-story.WIP.html _wip/_SECTION_TRACKER.html
git diff --check _wip/homepage_real_1_lead_photo.WIP.html _wip/shop.WIP.html _wip/our-story.WIP.html _wip/_SECTION_TRACKER.html
```

## Stop Rules

Stop when home, shop, and our-story are reviewable, truthful, and verified.

Do not keep spinning up new sessions once the coordinator has enough must-fix findings. Extra sessions after that point add coordination cost and stale advice.

Do not build around missing inputs. Missing testimonials, founder photos, stockist logos, Shopify access, final URL mapping, and unconfirmed SKU prices must stay visible blockers.

## Failure Modes To Avoid

- Multiple sessions editing `homepage_real_1_lead_photo.WIP.html` at the same time.
- Parallel agents updating `_SECTION_TRACKER.html` or checkpoints independently.
- Hidden placeholder prices remaining in shop data after UI masks them.
- Variant boards replacing a direct range-detail decision.
- Visual QA against stale pages after the coordinator has already changed them.
- Treating content-pending sections as cleared.
- Deploying or promoting WIP files during Thursday-prep work.
