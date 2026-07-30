# Page Review: Our Story

## Scope
- Files reviewed: `_wip/our-story.WIP.html`
- Review focus: Carli copy fidelity, mobile readability, editorial founder-image framing, and avoiding invented founder portrait content.

## Must Fix Before Thursday
- `_wip/our-story.WIP.html:336`: Change the image alt text from `Two hands passing a carob banana between them` to `Two hands passing a carob pod between them`. The supplied `founders_hands.webp` asset visibly shows a long carob pod, not a banana; the current alt text is inaccurate and weakens the honest editorial framing.

## Nice To Have
- No additional Thursday must-fix is needed for the current mobile type scale or stacked layout. Keep the existing 390px treatment unless a device pass exposes a concrete crop or wrapping defect.

## Content Blocked
- Real founder portraits remain pending. `assets/our_story/carli.webp` and `assets/our_story/dylan.webp` are absent, so the hands-and-pod still must remain an editorial makers image rather than proof of either founder's identity or appearance.
- Do not add founder roles, biographical details, names attached to individual hands, or a replacement portrait without supplied source content.

## Do Not Change
- Preserve the supplied Carli wording in the hero, `How Maple Moon Began`, craft, place, founders, and closing invitation sections.
- Do not replace the editorial hands image with an invented or generated founder portrait.
- Do not turn the founders block into portrait proof while the real founder photos are still blocked.

## Exact Suggested Edits
- Current state: line 336 describes the pictured object as a carob banana.
- Proposed state: describe it as a carob pod, matching the visible asset.
- Reason: accurate alt text keeps the founders image editorial, accessible, and truthful without adding founder portrait content.

## Verification Run
- HTML parser: passed for `_wip/our-story.WIP.html` in this review pass.
- Diff check: passed for the two review artifacts after writing them.
- Desktop: source layout reviewed for the 1440px path; the desktop split and founders card have no obvious copy or framing conflict.
- Mobile: source layout reviewed for the 390px path. The `max-width:900px` rules stack the story sections, reduce image heights, and keep text within the 28px page gutters. A fresh browser render was not available because the local server could not be kept alive in this sandbox; the 2026-07-21 checkpoint records a prior 390px Chrome smoke pass for this page.

## Residual Risk
- Founder-photo readiness is intentionally unresolved: the page is reviewable with editorial hands imagery, but it is not launch-complete as a final founder portrait presentation.
- Font rendering and the long first story chapter should receive a final real-device check at 390px before promotion.
