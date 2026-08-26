# MapleMoon icon direction v2 — QA results

Date: 2026-08-25 AEST  
Status: **PASS FOR VISUAL REVIEW ONLY — NOT APPROVED — ROUTES UNCHANGED**

## Build and structural verification

```text
BUILD PASS maplemoon-icon-v2-review icons=44 sources=7
Review sheet: /Users/handtomouse/maplemoon-website/_wip/evidence/icon_session_20260825/v2_review/review-sheet.html
ROUTES UNCHANGED
CHECK PASS maplemoon-icon-v2-review assets=44 unique=44
CHECK PASS sources=7 hashes=verified
CHECK PASS review=self-contained symbols=44 uses=58
CHECK PASS homepage-categories=5 carob-comparison-rows=6 checks=3
CHECK PASS routes-unchanged=7
```

- Individual SVG count on disk: 44.
- Manifest SHA-256: `cb0f526309c000626da312c504b384e6e9b7de415b7074556488fc191509844b`.
- Review sheet SHA-256: `5cc555a90affa95602f05b673e7d5cfa2823738ae6a2e92feaa5b185f9e4560b`.
- All seven source files loaded in the browser and matched their recorded hashes.
- Browser console warnings/errors: none.

## Live-context visual checks

### Desktop — 1440 × 900

- Horizontal overflow: 0 px.
- Homepage category buttons: 5.
- Carob comparison rows: 6.
- Source anchor cards: 7, balanced in a 4 + 3 grid.
- Evidence:
  - `rendered/review-sheet-desktop-top.png`
  - `rendered/homepage-category-desktop.png`
  - `rendered/carob-comparison-desktop.png`

### Mobile — 390 × 844

- Horizontal overflow: 0 px.
- Category icons: five at exactly 17 × 17 px.
- Comparison icons: six at exactly 22 × 22 px.
- Confirmation checks: three at exactly 14 × 14 px.
- Evidence:
  - `rendered/homepage-category-mobile.png`
  - `rendered/carob-comparison-mobile-old.png`
  - `rendered/carob-comparison-mobile-carob.png`

## Harsh self-critique corrections made

1. The builder's initial template-string syntax error was caught before generation and fixed.
2. A hard-coded highlight colour in the Moon master was removed; drawings are single-colour/currentColor.
3. The Banana source claim was rejected until the actual current homepage asset was located, hashed and embedded.
4. The first Bites concept was rejected as a generic three-item cluster. It was redrawn from the current single domed Eclipse Bite product and that source was hashed and embedded.
5. The seven source anchors were rebalanced from an awkward 5 + 2 grid to 4 + 3.
6. A letterboxed mobile capture was rejected and recaptured after a clean viewport reset/reload; final PNGs are verified at 390 × 844.

## Deliberate hold

This is an approval surface, not a finished production library. None of the seven WIP routes references v2 review assets. Live replacement, the remaining icon family, final exports and external delivery require explicit approval of the four gates in `REVIEW-GATE.md`.
