# R3 visual inspection — 2026-08-17

Status: **INSPECTED / BROWSER GATE FAILED**

This is evidence for the R3 recovery close only. It does not promote the candidate, alter the accepted 40-finding audit, resolve a design choice, or turn existing audit observations into browser-harness failures.

## Coverage inspected

- Four generated contact sheets were opened and inspected: 1440, 1024, 768 and 390.
- All 56 generated screenshots were opened and inspected: top and full-page proofs for seven routes at all four widths.
- The 28 top proofs are visually represented in the four contact sheets; every one of the 28 full-page proofs was also opened directly.
- Each route remained recognisable and each proof was visibly nonblank. The browser manifest independently records file hashes, byte counts and dimensions.

| Route | 1440 top/full | 1024 top/full | 768 top/full | 390 top/full |
|---|---|---|---|---|
| Home | inspected | inspected; browser failure recorded | inspected | inspected |
| Shop | inspected | inspected | inspected | inspected |
| Our Story | inspected | inspected | inspected | inspected |
| What Is Carob | inspected | inspected | inspected | inspected |
| FAQ | inspected | inspected | inspected | inspected |
| Stockists | inspected | inspected | inspected | inspected |
| Pure Carob PDP | inspected | inspected | inspected | inspected |

## Required failure

Home at 1024 contains one request failure for `assets/licensed/carob_farm/australian-carob-0205-mobile.jpg`: `net::ERR_ABORTED`. The row is correctly classified `FAIL` with `runtime-request-errors`; the full browser run exits 1. There was no retry and no failure suppression.

## Visual observations retained as audit evidence

- Home: the 1440 composition is visually continuous. At 768 the starter-box detail column is visibly clipped beyond the right edge even though the document root itself reports no overflow. The 390 proof includes the deliberately exercised cart drawer, so part of the underlying page is obscured while that state is open.
- Shop: all widths are populated and legible, but the dense controls and repeated product cards remain visually small at several widths; the harness records 19 sub-44 controls. This is an existing audit concern, not the R3 failure.
- Our Story: top and full proofs render at all widths. At 390 the centred wordmark and cart control visibly crowd/overlap; the missing `main` landmark and sub-44 controls remain existing audit findings.
- What Is Carob: media fades render without a hard outer rectangle in the inspected proofs. At 390 the centred wordmark and cart control visibly crowd/overlap.
- FAQ: accordion rows and utility states are visible at all widths. At 390 the popular-question chip row is visibly clipped rather than fully discoverable; no root overflow is reported because the row is internally contained.
- Stockists: finder, filter, list, wholesale and held newsletter treatments render at all widths. At 390 the centred wordmark and cart control visibly crowd/overlap.
- Pure Carob PDP: product, information cards, related products and footer render at all widths. The 390 proof includes the exercised cart drawer and shows the page continuing below it.

## Contact-sheet inspection

- `contacts/contact-1440-local-full.png`: seven recognisable desktop tops, no blank panel.
- `contacts/contact-1024-local-full.png`: seven recognisable desktop/tablet tops, including the Home row whose runtime failure is recorded separately.
- `contacts/contact-768-local-full.png`: seven recognisable tablet tops; route composition changes are visible.
- `contacts/contact-390-local-full.png`: seven recognisable mobile tops; header crowding and narrow-utility constraints are visible.

Disposition: the visual set is complete as failed-run evidence, but it cannot admit the audit because the exact browser gate failed 1/28 rows.
