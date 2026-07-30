# Maple Moon Local Review Pack - 23 July 2026

Status: local review only. Nothing has been sent, deployed, promoted, committed, or pushed.

## Selected WIP Direction

- Homepage: the existing hero composition and credentials capsule remain. The selected background is the local `assets/hero_shots/carob_branch_dusk.jpg` treatment, with static content on load.
- Carob Story: opens with `What is Carob?`, a real carob image, and the approved foundation: pod rather than bean, Australian-grown carob, naturally caffeine free, slow-roasted and milled with cacao butter, small batches on the NSW far north coast.
- FAQ: ten concise answers now begin with carob/cacao and stay within verified product, ordering, and stockist guidance.
- Stockists: retains search, state/type/area filters and map-style preview. It does not imply a real map, location search, proximity, distance, phone, or trading-hour data.

## Homepage Review Variants

- Selected static WIP: `_wip/homepage_real_1_lead_photo.WIP.html`
- Direct branch + static: `_wip/_section_variants/homepage-hero-branch-direct-static-review-20260723.html`
- Direct branch + scroll reveal: `_wip/_section_variants/homepage-hero-branch-direct-scroll-review-20260723.html`
- Branch-palette reference + static: `_wip/_section_variants/homepage-hero-branch-reference-static-review-20260723.html`

The selected and static variants have 11 reveal targets, all visible on load. The scroll-review variant has the same 11 targets and starts with motion enabled for review.

## Screenshots

- `_wip/checkpoints/20260723_7pm_review/home-mobile.jpg`
- `_wip/checkpoints/20260723_7pm_review/home-desktop.jpg`
- `_wip/checkpoints/20260723_7pm_review/carob-story-mobile.jpg`
- `_wip/checkpoints/20260723_7pm_review/stockists-mobile.jpg`
- `_wip/checkpoints/20260723_7pm_review/home-branch-static-mobile.jpg`
- `_wip/checkpoints/20260723_7pm_review/home-branch-scroll-mobile.jpg`
- `_wip/checkpoints/20260723_7pm_review/home-branch-reference-mobile.jpg`

## Verification

Fresh in-app-browser checks at 390px and 1440px passed for homepage, shop, our story, carob story, FAQ, and stockists:

- no horizontal overflow
- one H1 with no heading-level skips
- no missing image alt attributes
- no broken eager images
- no dead `#` links
- no console errors
- no targets below 44px in either viewport

Interaction checks passed: the FAQ accordion opens its answer; Stockists search returns the expected Noosa result and updates the result/map-preview copy.

`python3 -m html.parser` completed without parse errors. `git diff --check` completed without whitespace errors.

## Recovery

Pre-edit snapshots and original SHA-256 hashes are in `_wip/checkpoints/20260723_pre_7pm/`.

## Still Pending

The separate unsent question draft is `_wip/_UNSENT_QUESTIONS_20260723.md`.
