# Maple Moon brand system · Homepage pilot verification

Verified locally on 2026-08-13. No deploy, publish, commit or push was performed.

## Contract checker

```text
$ node scripts/check-maplemoon-design-system.mjs --contracts-only
PASS contracts-only tokens=75 routes=6 components=15 widths=4 images=14 exceptions=7 routeConformance=SKIPPED (flag not set)

$ node scripts/check-maplemoon-design-system.mjs --route-conformance home
PASS route-conformance tokens=75 routes=6 components=15 widths=4 images=14 exceptions=7 routeConformance=HOME_PASS
```

## Responsive render gate

Source: `responsive-results-final.json`

```text
320x844  overflow=0  brokenImages=0  videoErrors=0  consoleErrors=0  badResponses=0  PASS
390x844  overflow=0  brokenImages=0  videoErrors=0  consoleErrors=0  badResponses=0  PASS
834x1112 overflow=0  brokenImages=0  videoErrors=0  consoleErrors=0  badResponses=0  PASS
1440x900 overflow=0  brokenImages=0  videoErrors=0  consoleErrors=0  badResponses=0  PASS
```

Every page image was switched to eager loading for this test and the script waited until every image reported `complete` before checking `naturalWidth`.

## Protected art direction

Source: `protected-equivalence-final.json`

At 320, 390, 834 and 1440, all checks passed:

```text
protected hero/fog/mask/bridge/signature computed-style diff = 0
main text equality = true
header text equality = true (the new menu control is excluded)
footer text equality = true
image source equality = true
price equality = true
```

The comparison ran under `prefers-reduced-motion: reduce` so animated interpolation could not create false style differences.

## Interaction and accessibility

Source: `interaction-results-final.json`

```text
closed mobile menu: both nav groups hidden, display:none, zero client rects
open mobile menu: both nav groups visible, body scroll locked, focus moved to Shop
Escape: menu closed and focus returned to toggle
focus ring: solid 2px
keyboard trail: 10 successive interactive stops recorded
range tab: Bars -> Moons, aria-selected updated, 5 stage items rendered
range arrow: Pure Carob Moon -> Peppermint Moon
broken images=0; overflow=0; consoleErrors=0; badResponses=0
PASS
```

## Reduced motion and 200% browser zoom

Sources: `reduced-motion-final.json`, `zoom-200-final.json`

```text
reduced motion: media query=true; hero video paused at 0; active motion=[]; overflow=0; errors=0; PASS
native Chrome zoom: innerWidth 1440 -> 720; devicePixelRatio 1 -> 2; estimatedZoomPercent=200; overflow=0; errors=0; PASS
```

Chrome zoom was reset to 100% after the proof.

## Stylekit contact sheet

Source: `stylekit-results-final.json`

At 390 and 1440: seven sections, 21 swatches, 5 buttons, 3 fields, 5 chips, 3 segmented options, 4 surfaces, 2 cards, 3 pending examples and one chrome mount. Overflow, broken images, console errors and failed responses were all zero. PASS.

## Unmigrated routes

```text
$ shasum -a 256 -c _wip/recovery/brand-system-home-pilot-20260813T074906Z/untouched-routes.sha256
_wip/shop.WIP.html: OK
_wip/our-story.WIP.html: OK
_wip/carob-story.WIP.html: OK
_wip/stockists.WIP.html: OK
_wip/faq.WIP.html: OK
```

## Holds

- No deploy/publish authority was exercised; the Homepage remains `review_hold_no_deploy`.
- `MM-IMG-HOME-STORY-FIELD-01` remains `RIGHTS-UNVERIFIED/HOLD` in `images.v1.json`; this pilot did not replace or promote that image.
- The other five routes intentionally remain `foundation_unwired` and were not edited.
