# MapleMoon seven-route visual audit R2 — 2026-08-16

## Disposition

**AUDIT COMPLETE. CURRENT PRIVATE PREVIEW REMAINS TECHNICALLY CERTIFIED; VISUAL RELEASE HAS BLOCKERS. PRODUCTION HOLD.**

This audit inspected the exact seven HTML hashes deployed at:

https://maplemoonbuild20260813-m49nihfds-handtomouses-projects.vercel.app

It makes no website, source, build, media, Styles Kit, Shopify, Git, Vercel,
production or client mutation. The sealed v0.4 package remains planning guidance
only. Production remains frozen on `7vjf2m50b`.

## Exact evidence

- Certified local hashes: 7/7 exact.
- Browser renders: 21/21 PASS at 390, 900 and 1440.
- Evidence: 84 nonblank screenshots plus 12 contact sheets.
- Runtime: all cases HTTP 200, exact requested root width, zero broken images,
  zero console/page/request/bad-response failures.
- Positive controls: missing route, forced overflow and forced blank all caught.
- Human visual inspection: 21/21 route-width cases.

Raw final output:

```text
ACQUISITION PASS matched=7/7
POSITIVE_CONTROLS PASS missing_route=true overflow=true blank=true
AUDIT_SUMMARY pass=21 fail=0 total=21 screenshots=84 contacts=12
HEADER_SUMMARY routes=7/7 menu=2 no_menu_or_links=5 overlaps=4 positive_control=PASS
```

Two harness-only corrections are preserved. The first changed navigation from a
global `networkidle` wait to explicit authored-image settlement. The second
separated render-integrity failures from discovered semantic landmark flags.
Neither changed a candidate assertion or website byte.

## New P0 finding — mobile header/navigation

Only Homepage and Pure provide a visible mobile Menu at 390. Shop, Our Story,
Carob Story, FAQ and Stockists have:

- no Menu control;
- zero visible nav links after their desktop nav hides;
- only the logo and cart remaining as visible header actions.

Four of those five also paint their wordmark outside an undersized logo link box
and across the cart's painted/hit area:

| Route | Logo box width | Painted logo width | Horizontal logo/cart overlap |
|---|---:|---:|---:|
| Shop | 11.5px | 113.7px | **41.1px** |
| Our Story | 8px | 113.7px | **42.9px** |
| Carob Story | 55.9px | 113.7px | **18.9px** |
| Stockists | 31.5px | 113.7px | **31.1px** |

FAQ has no painted collision, but still has no mobile navigation. Mobile header
heights also vary: FAQ 59px, Carob Story 65px, the other routes 70px.

This is not a v0.4 aesthetic preference. It is a current navigation and paint
defect. The correction should extend the already working Homepage/Pure mobile
header pattern and already certified shared runtime to the five derived release
routes. It does not authorise unrelated button, typography, fog or overlay work.

## Route verdicts

| Route | Current visual disposition | Exact remaining ownership |
|---|---|---|
| Homepage | **PASS with content/commerce holds** | Existing mobile header is a reference. D02–D05 own cart, stockist, form and claim surfaces. Home remains the explicit visual exception. |
| Shop | **RELEASE BLOCKER** | Missing/colliding mobile header; current 22-card/20-cart page is 15,569px tall at 390; 19 visible controls are below 44px. D01-A/D02-A should remove the disposable catalogue/cart controls before any polishing. |
| Our Story | **RELEASE BLOCKER** | Missing/colliding mobile header; two visible portrait placeholders; zero `<main>` landmarks; two 30.8px story summaries. Header/semantics can join the release builder; portrait treatment remains a separate exact media choice. |
| Carob Story | **HEADER BLOCKER; BODY PASS** | Missing/colliding 65px mobile header. Hero, copy-first responsive order, orchard blend and comparison composition visually pass. |
| FAQ | **HEADER + CONTENT BLOCKER** | Missing 59px mobile header. Popular chips pass as an intentional scroller. Search input is 25.9px high; 900px category buttons are 42px. D05 must restore the exact approved caffeine wording. |
| Stockists | **RELEASE BLOCKER** | Missing/colliding mobile header plus five visible internal/review strings. Finder/filter layout itself passes; D03-B/D04-A should remove counts/internal state/form without redesigning it. |
| Pure Bar | **PASS with content/commerce holds** | Existing mobile header is a reference. Hero and all five related bar images visually pass. D02/D05 own cart and claim removal. |

## Cross-route visual conclusions

### Fix in the minimum-release successor

1. Use one 70px mobile header composition on all seven release routes: 44px Menu,
   centred Maple Moon wordmark and the decision-appropriate right action.
2. Under D02-A, remove the right cart rather than preserving a fake commerce
   control. The header must still retain a balanced centre and a truthful action
   or reserved 44px slot; exact customer label must come from existing approved
   language, not invention.
3. Add one `<main>` landmark to Our Story and make both story summaries at least
   44px high.
4. Make the FAQ's actual input hit target fill its visual search shell; raise the
   900px category buttons from 42px to at least 44px.
5. Let D01-A remove Shop's 16 current beyond-six cards and all 19 disposable
   34px catalogue controls; verify exactly six enquiry-only bars rather than
   polishing the 22-card private-review layout.

These changes belong in the deterministic derived release builder proposed by
the minimum-release dry-run. They should not overwrite the private-review WIPs.

### Separate held dependencies

- Our Story founder portraits remain a media decision. Do not style around empty
  placeholders or treat layout removal as image approval.
- Non-bar product imagery remains held. D01-A removes it from the first release;
  later swaps remain one exact SKU/hash/slot packet each.
- v0.4 remains `PLANNING_VISUAL_GUIDANCE_ONLY_IMPLEMENTATION_HOLD`. No blanket
  section, header, fog, overlay, component or token adoption is opened here.
- Real commerce remains blocked on Woo/Shopify authority.

### No visual work required

- Pure related-bar images and layout pass at all three widths.
- Carob Story's all-edge image blend and copy-first mobile order pass.
- FAQ popular chips intentionally scroll horizontally at 390 without root
  overflow; wrapping or shrinking them is not recommended.
- Stockists' responsive filter grid and results layout pass; the defect is its
  public/internal truth surface and header, not its finder composition.
- Homepage's photographic long-form rhythm remains coherent and stays the
  explicit Home exception.

## Screenshot qualification

Full-page 390 captures include off-canvas fixed cart layers on Homepage/Pure due
to full-page coordinate acquisition. Closed-state top/middle/bottom viewport
captures and runtime geometry are the state authority. This is an evidence
artefact, not an open-cart candidate defect.

## Estimated correction cost after decisions

This adds approximately **3–5 technical hours** to the already scoped
minimum-release builder: five-route header derivation, Our Story semantics, FAQ
target sizing and the additional 21-case visual regression. It does not include
founder media, product-image work, Shopify, client copy or production.

## Exactly one next action

Nate records the D01–D06 bundle and Our Story media direction. BOSS then admits
one deterministic release-builder packet containing the five-route header fix
and decision-approved truth/capability transforms, while the original WIPs and
all held media remain byte-identical.
