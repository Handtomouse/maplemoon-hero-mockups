# Claim verification — 2026-08-03

**Scope:** observation only, against http://127.0.0.1:3011/ and the frozen
docs/client-review/2026-08-01-saturday-review/staging-v1/clean package.

**No gate recorded.** No source, staging, manifest, WIP page, build, or Git state was
modified. This report is the sole new file. clean/MANIFEST.json was
d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20 before
the report write.

## Method and limits

- Chrome was driven without activating an app by name. The direct CDP socket at
  127.0.0.1:9222 was not reachable from this task environment; the available Chrome
  browser bridge was used instead. Each requested viewport override was asserted from
  the page (innerWidth/innerHeight) before a measurement.
- Before each page run, document.querySelectorAll('section').length was asserted:
  Shop 10, FAQ 10, Our Story 11.
- Before every visual judgement, the page was scrolled from top to bottom and polled
  until every image was complete && naturalWidth > 0: Shop 28/28 at 390 and 1054,
  FAQ 1/1, Our Story 11/11.
- A second, fresh-navigation adversarial pass retested every result. The repeat data is
  included below; no initial finding is being treated as a pass by itself.

## 1. Shop 390px cart renders off-screen

**Verdict: DISPROVED.**

At asserted 390 × 844, activating the unique header cart button produced an open
dialog with left=0, right=390, top=101.281, bottom=844, width=390,
height=742.719. scrollWidth=390, so horizontal overflow was zero. The close
control and both footer actions were hit-testable at the expected mobile coordinates;
the dialog's computed position was fixed, bottom:0px.

Adversarial rerun: after a fresh 390px navigation and a second 28/28 image settle, the
same dialog resolved to the same 0 … 390 horizontal bounds and 101.281 … 844
vertical bounds. It is not an off-screen, unusable mobile cart.

**Repro:** set 390 × 844 → load shop.html → assert 10 sections → scroll full page
and settle 28/28 images → return to top → activate header cart → read the dialog
getBoundingClientRect() and documentElement.scrollWidth.

## 2. Shop list view around 1054px hides price digits on every card

**Verdict: DISPROVED as stated; a subset defect is CONFIRMED.**

At asserted 1054 × 844, List view had 22 cards: 20 purchasable and 2 enquire-only.
The Range rectangles for rendered price glyphs intersected the Add button on **12/20**
purchasable cards: all six Bars and all six Bites. Example, the first Bar price glyphs
extend x=237 … 305.211; its circular Add button begins at x=265.586, creating a
24.586 × 13px overlap over the trailing (90g) glyphs. A hit-test inside that region
returns the Add button. The effect is visible, not merely a box-model artefact.

The other eight purchasable cards were clear: four Moons, two Elixirs, Bananas and
Powder. The two unavailable Moon cards have no Add button. Therefore “on every card”
is false, but the Bars-and-Bites occlusion is real.

Adversarial rerun: fresh 1054px navigation, List click, 28/28 settled images, then
Range-vs-button geometry again returned exactly the same set of 12 occluded IDs and
the same eight clear IDs.

**Repro:** set 1054 × 844 → load Shop → assert 10 sections → scroll/settle 28/28 →
return top → activate unique List view button → for every visible .pcard, compare
Range.selectNodeContents(.pr).getClientRects() with button.add.getBoundingClientRect().

## 3. Shop in-page anchors all fail to jump

**Verdict: DISPROVED.**

All seven visible catalogue links were activated, rather than checked statically. Every
one updated the hash, produced non-zero scroll, and placed the existing target near the
top of the viewport:

| Activated link | Result |
| --- | --- |
| View bar flavours | #bars, scrollY=502, target top 94.02px |
| Bars | #bars, 484.5, 111.52px |
| Moons | #moons, 1924.5, 94.15px |
| Bananas | #bananas, 4906.5, 94.02px |
| Bites & Eclipse | #bites, 3014, 94.09px |
| Elixirs | #elixirs, 4265, 93.80px |
| Powder | #powder, 5519.5, 98.19px |

Adversarial rerun at 390 × 844: View bar flavours again produced #bars,
scrollY=942, target top 94.02px.

**Repro:** load Shop → assert 10 sections → activate each unique visible a[href^="#"]
link → measure location.hash, scrollY, target existence and target rect.

## 4. Skip to the catalogue does nothing on Enter

**Verdict: DISPROVED.**

At 1054px, Enter on the unique skip link set #catalogue-title, scrolled to 315.5px,
and focused the target H2.sr-only, rather than the body. At 390px, the adversarial
keyboard pass again set the same hash, scrolled to 778.5px, and focused
H2#catalogue-title (target top 178.49px).

**Repro:** load Shop with empty hash → assert 10 sections → locate the unique skip link
from the live accessibility tree → send Enter → measure hash, scroll, and
document.activeElement.

## 5. Moons bulk tiers only add at quantity 1/base price

**Verdict: CONFIRMED only for the initial quantity; no billing conclusion is observable.**

A fresh activation of Add Peppermint Moon to cart opens the local review cart with
quantity 1 and the displayed tier string 1 $2.50 / 5 $12.19 / 10 $23.75 / 20 $44.99.
The cart has an accessible plus control. Four presses advanced it deterministically
through 2, 3, 4, and 5; the adversarial fresh-cart pass again ended at 5 items.

The frozen review cart displays no per-line dollar amount and no monetary subtotal.
It therefore cannot demonstrate that a base price is charged at quantity 1, nor that the
5-unit tier is applied or ignored. The supported statement is: **a fresh add begins at
one unit, and the UI can be raised to five; tier-price calculation is not rendered by
this package.**

**Repro:** load Shop → assert 10 sections → activate unique Peppermint Moon Add button →
read cart item → activate unique Increase Peppermint Moon quantity button four times →
read the item text and cart item count.

## 6. FAQ focusing a right-edge control shifts the page about 260px left

**Verdict: DISPROVED.**

At asserted 1440 × 900, the header cart had bounds 1276 … 1320. Before focus:
scrollX=0, scrollWidth=clientWidth=1440, and body/header/main left edges were all
0. Focusing that button by keyboard left every measurement unchanged. Moving focus
to the header Shop link also left every measurement unchanged. The adversarial fresh
FAQ pass repeated the same before/after values and no horizontal shift.

**Repro:** set 1440 × 900 → load FAQ → assert 10 sections → scroll/settle 1/1 image →
return top → keyboard-focus unique header cart button without activation → measure
scrollX, document widths, and body/header/main left rects → move focus to header Shop
and repeat.

## 7. Contrast values

**Verdict: mixed — the claimed chip figure is materially confirmed; the other two
numeric assertions are disproved, though all three are below 4.5:1.**

Ratios use WCAG relative luminance after compositing alpha foreground/background colours
over the local live linear-gradient colour. An independent second calculation from the
captured computed values returned the same ratios to three decimals.

| Surface | Live computed foreground | Local computed backdrop / effective background | Measured ratio | Claim result |
| --- | --- | --- | ---: | --- |
| Shop .chips span (Vegan) | rgba(111,106,98,0.64) → effective rgb(159,156,151) | card rgba(251,250,247,0.86) over local gradient → rgb(244,245,244) | **2.504:1** | **CONFIRMED materially** (claimed ~2.56) |
| Shop utility FAQ | rgb(111,106,98) | header-gradient sample rgb(184,201,217) | **3.175:1** | **DISPROVED numerically** (claimed ~3.6), still below AA |
| Our Story .os-kick (The makers) | rgb(163,157,146) | hero-gradient sample rgb(200,216,231) | **1.846:1** | **DISPROVED numerically** (claimed ~2.41), worse than claimed |

**Repro:** settle the relevant live page first → read getComputedStyle(...).color,
opacity-bearing ancestor background colours, and the local position in the page gradient
→ alpha-composite foreground/background → calculate WCAG relative luminance contrast.

## What survived adversarial review

1. **The 1054px List-view price occlusion is real, but scoped to 12 purchasable
   Bars/Bites cards, not every card.**
2. **A fresh Moon add starts at quantity 1.** The package does not expose a calculated
   monetary price, so it cannot support a conclusion about tier-price application.
3. **All three sampled text surfaces are below 4.5:1.** Exact ratios are 2.504:1,
   3.175:1 and 1.846:1.

The mobile cart-offscreen, all-anchor, skip-link and FAQ focus-shift assertions did not
survive runtime reproduction.

**No gate recorded.**
