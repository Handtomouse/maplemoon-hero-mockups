# Maple Moon Parallel Page Pass - 23 July 2026

Status: local WIP only. No client message, deployment, commit, push, Shopify change, or content publication occurred.

## Shared Boundary

- Shared styles, shared navigation/footer markup, and assets were held unchanged during the page pass.
- Existing recovery material remains in `_wip/checkpoints/20260723_pre_7pm/`.

## Page Results

- Homepage: retained the branch-led hero and credentials capsule; added a clear `Choose a format` cue; priced selection now says `Explore Range` and routes to its matching local Shop category.
- Shop: category rail is easier to re-enter while browsing; priced product actions now open a product-specific enquiry rather than implying a non-existent cart; pending categories remain disabled and labelled `Pricing to follow`.
- Our Story: refined the chapter rhythm, founders panel, gallery lead-in, and closing section without changing the story copy or adding founder material.
- Carob Story: clarified the pod-to-bar interaction and comparison/FAQ reading flow without adding health, product, or ingredient claims.
- FAQ: added stable question numbering and clearer open-answer treatment; all answers remain within verified carob, product-label, support, and wholesale wording.
- Stockists: strengthened finder/result/map-preview states without implying a live map, exact store details, distances, or opening hours.

## QA

- Desktop and 390px mobile checks passed for homepage, Shop, Our Story, Carob Story, FAQ, and Stockists. The browser run found no horizontal overflow, missing image `alt` attributes, or console errors.
- Every page has one H1. The initial homepage desktop audit flagged its two hero actions and newsletter field below the 44px baseline; the final page-local CSS adds a 44px minimum height to those exact controls. This final sizing correction was statically verified after the browser session ended.
- Interaction checks passed: homepage Elixir selection, Shop priced enquiry links/pending buttons, Carob Story step 03, FAQ accordion, and Stockists `Noosa` search.
- `python3 -m html.parser` and `git diff --check` passed after the edits.

## Remaining Inputs

- Product names, prices, availability, and purchase links for Moons, Bites/Eclipses, Bananas, and any other non-bar formats.
- Approved testimonials, founder photos, social links, and social/OG imagery.
- Verified stockist source data, including publish permission for names and any future detail fields.
- Approved public shipping, returns, allergen, and wholesale-policy wording.
