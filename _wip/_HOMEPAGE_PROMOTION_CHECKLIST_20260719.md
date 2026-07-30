# Homepage Promotion Checklist - 2026-07-19

Scope: `_wip/homepage_real_1_lead_photo.WIP.html`

Do not deploy or push from this checklist. It is a local readiness record for promoting the homepage out of `_wip` once source content blockers are cleared.

## Frozen WIP Baseline

- URL: `http://127.0.0.1:3005/_wip/homepage_real_1_lead_photo.WIP.html`
- File size: `92944 bytes`
- SHA-256: `9a8f9bf990fecbf3f80c36ebfe5eef0d463f3f7afa8a956c7354baa4ed7bab55`
- Preview server: existing Node process on port `3005`

## Executed Next 10

1. Baseline recorded in this checklist.
2. Missing-source register confirmed locally. Do not invent reviews, founder photos, social handles, unresolved SKU states, or unresolved pricing.
3. Reviews block remains honest and content-pending: `Real customer quotes are coming soon.` / `Awaiting approved testimonials`.
4. Pricing audit completed. Homepage currently exposes bar pricing, elixir pricing, starter box pricing, pack prices, and `$99` shipping threshold. Pending categories still say `Pricing to follow`.
5. Commerce CTA audit completed. Bars and elixirs are enabled. Crescents and Eclipse Bites are disabled with pending copy. The starter box CTA still routes within the WIP homepage rather than adding to cart.
6. Visible-copy rules checked. No visible em dashes found. No invented testimonials found.
7. Responsive browser pass completed at `390`, `768`, `1024`, and `1440` widths. No horizontal overflow found.
8. Accessibility pass completed for current homepage preview. No missing image alt attributes, no sub-44px interactive targets, and no visible heading skip found after the WIP feedback panel adjustment.
9. Tracker state reviewed. Homepage Trust bar is `cleared`; Reviews / quote remains `content-pending`, which matches the real content state.
10. Promotion remains blocked until source content and platform gaps below are resolved.

## Blockers Before Promotion

- Real customer testimonials from Carli and Dylan, or a named approved review source.
- Confirmed social URLs for Instagram and Facebook. These are the only remaining `href="#"` links in the homepage file.
- Founder photo assets and final founder/profile details for the full Our Story A2 requirement.
- Confirmed launch state for Crescents, Eclipse Bites, Moons, Bites, Bananas, and any other non-bar, non-elixir products.
- Confirmed unresolved pricing outside the homepage bar/elixir/starter-box set.
- Shopify collaborator access and final cart/product URL mapping.
- Final OG/social image assets under `assets/social/`.

## Current Verification Results

- `git diff --check -- _wip/homepage_real_1_lead_photo.WIP.html _wip/_feedback/feedback.js`: pass.
- Visible-copy em dash scan: pass.
- Browser probe: no overflow, no missing alt, no sub-44 targets, no visible heading skip at `390`, `768`, `1024`, and `1440`.
- Commerce probe:
  - `bars`: Add to Cart enabled, `$12.95(90g)`.
  - `crescents`: Add to Cart disabled, `Pricing to follow`.
  - `elixirs`: Add to Cart enabled, `$23.95(150g)`.
  - `eclipseBites`: Add to Cart disabled, `Pricing to follow`.
