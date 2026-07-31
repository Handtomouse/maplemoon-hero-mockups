# Saturday Accessibility Preflight

**Date:** 2026-07-31  
**Scope:** six-page clean local review  
**Result:** technical pass with two human checks retained

## Improvements applied

- Added a real `<main id="main-content">` landmark to derived Our Story and Stockists pages.
- Added a keyboard skip route to those two pages.
- Added shared visible-focus and reduced-motion treatment for the new skip route.
- Extended the deterministic cart/review checker to require, on every clean and annotated page:
  - exactly one main landmark;
  - exactly one H1;
  - no duplicate IDs;
  - a skip route with a real target;
  - page-level reduced-motion treatment;
  - visible-focus treatment.

No canonical WIP page was edited.

## Rendered evidence

At 390px, Our Story and Stockists each rendered with:

- one `main` landmark;
- `#main-content` as the landmark target;
- a `Skip to main content` route;
- zero horizontal overflow;
- zero visible pending/placeholder wording;
- loaded Typekit fonts.

The Our Story skip route received keyboard focus with a visible 3px outline and transitioned into the viewport at `x=10`, `y=10`.

All six pages also passed a 720px reflow pass, used as additional geometry evidence for the effective half-width layout expected when a 1440px desktop view is enlarged. It is not represented as literal browser 200% zoom.

## Deterministic evidence

Passed:

- `npm run review:saturday:build`
- `npm run review:saturday:check`
- `npm run review:saturday:cart`
- `git diff --check`

## Evidence boundary

Repeated automated Tab traversal and keyboard activation are not reliable in the in-app Browser. Literal 200% browser zoom also does not expose a measurable scale change there.

These two checks remain human:

1. traverse each clean page with Tab, Shift+Tab, Enter, Space and Escape;
2. set browser zoom to exactly 200% and check clipping, overlap and control access.

Everything else in this preflight is technically closed.
