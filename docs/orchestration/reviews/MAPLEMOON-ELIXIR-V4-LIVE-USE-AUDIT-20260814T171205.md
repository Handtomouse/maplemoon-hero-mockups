# MapleMoon elixir v4 live-use audit — 2026-08-14 17:12 AEST

## Verdict

**HOLD at the live-use boundary.** The exact SHA-pinned v4 pair passes the independent mechanical, edge-backdrop, measured-browser and unwired checks. It does not have authority for live use because fine packaging text is reconstructed, package-text fidelity is uncertified, and Nate has not approved either exact file for its named live slot. The currently wired candidate WebPs remain the authorized `KEEP current` assets.

## Acquisition pins

All nine packet pins matched at acquisition and are rechecked by `final_assert.py` at close:

| Input | SHA-256 result |
|---|---|
| Pure v4 PNG | `70f93f414902ae1b10e7ae1416954348aa20bd1d6950e37d05979b4e4aa9eb93` — MATCH |
| Spiced v4 PNG | `414f727e84ca0dc24749b10b1092f4618e9f9fc9b954304442a7a0a8779749bb` — MATCH |
| Shared alpha v4 | `39d6ca8c5539d2662703dbe7fa4795c10a30172b39574c487c806ad2d7fe5850` — MATCH |
| Producer proof HTML | `fab275c64ec07e69ec8a3acab4c4cd32f80592e05d67251ea81137d073042e0d` — MATCH |
| Candidate Shop HTML | `f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038` — MATCH |
| Wired pure WebP | `4398f43fcc7ff571f4eea4643e078f8416e6921f4e979f5bf31e53338e04916a` — MATCH |
| Wired spiced WebP | `9b92c0f0a0cc11b11aa9a5fa4cb7683b420db373e556c74adcb1ba576ffe1163` — MATCH |
| Asset-slot authority matrix | `8b68ad125353c57befd0f0035acae2530756cb52c9a242cbdd12a148becb40a0` — MATCH |
| Asset-authority addendum | `ccc4f3ca6991fd33b3f1348c051bc0cb6a7e6b920767ba0ca6c0581259f626f0` — MATCH |

## Independent mechanical result

`PASS` with positive controls.

- Both v4 files are 1254 × 1254 RGBA images. Pure is 16-bit/channel in its PNG encoding and Spiced is 8-bit/channel; Pillow presents both as RGBA for analysis.
- Both independently measure `x334 y107` to exclusive `x920 y1084`, exactly 586 × 977 visible pixels, centreline `x627`, baseline `y1084`.
- Their alpha channels are byte-for-byte identical to each other and to the pinned shared 8-bit grayscale mask: 36 alpha values, 5,876 partial-alpha pixels, 551,399 opaque pixels and 1,015,241 transparent pixels.
- Each silhouette has one 8-connected component, zero enclosed transparent holes and no alpha touching a canvas edge.
- Planted controls were detected for clipping, a stray second component, one enclosed hole, one-pixel alpha mismatch and a dark-halo composite.
- Independent inspection of white, neutral-grey and black composites found no obvious halo, colour fringe, clipping or opaque-background contamination at the rendered review scales.

Evidence: `mechanical_results.json` and `edge_backdrop_contact_sheet.png`.

## Measured browser result

`PASS` at measured 390, 900 and 1440 CSS-pixel widths. Each page was nonblank with the HOLD boundary visible, zero horizontal overflow, eight nonblank rendered image elements backed by four unique image requests returning HTTP 200, and zero console, page or failed-request events. Screenshots are `review_surface_390.png`, `review_surface_900.png` and `review_surface_1440.png`.

The initial harness run correctly loaded the page and four unique assets but failed its own assertion because it expected eight network responses for eight repeated `<img>` elements. Browsers fetched the four unique URLs once and reused them. The assertion was corrected to require all four unique image URLs at HTTP 200, then all three widths passed. No product, candidate or source file changed.

## Wired-candidate comparison

The v4 pair is not a scale/crop-preserving replacement of the current WebPs. Both v4 subjects are face-on, use the same 586 × 977 silhouette on a square canvas, and show a dense front-label treatment. The currently wired WebPs use 1024 × 1536 canvases, visible bounds of 564 × 884 for Pure and 574 × 899 for Spiced, a different angle, more surrounding negative space and a materially different visible label layout.

The large `CAROB ELIXIR` wording and Pure/Spiced colour distinction make the high-level SKU family and variant plausible. That observation is not source authority. OCR or visual plausibility cannot certify label, ingredient, nutrition, compliance or fine-print fidelity.

## Binding scan

`PASS / genuinely unwired` within the two packet-named trees.

- Scope: `/Users/handtomouse/maplemoon-website` and `/Users/handtomouse/maplemoon_build_20260813`.
- Coverage: 4,949 regular files, 5,870,034,730 bytes; zero read errors.
- Positive control: fixture path, filename, token and SHA-256 all detected.
- Exact v4 filename occurrences as files: 0.
- Exact SHA-256-equivalent copied-byte occurrences: 0.
- Runtime textual references: 0.
- Text references exist only in packet/evidence control records and are not runtime bindings.
- Limitations: symlink targets were not followed; text search covered regular files up to 8 MiB; exact-byte search hashed every regular file whose size matched either v4 PNG.

## Authority boundary

| Boundary | Result | Reason |
|---|---|---|
| Mechanical geometry and alpha | PASS | Exact shared 586 × 977 silhouette, one component, no holes or clipping; controls pass. |
| Rendered edge quality | PASS | White/grey/black and 390/900/1440 evidence has no obvious edge defect or runtime failure. |
| High-level SKU plausibility | LIMITED PASS | Pure and Spiced variants are visually distinguishable; this is not source or package authority. |
| Package-text fidelity | **HOLD** | Fine packaging text is reconstructed. No label, ingredient, nutrition, compliance or fine-print fidelity is certified. |
| Exact live-slot approval | **HOLD** | Authority matrix says `KEEP current / HOLD replacement`; Nate has not approved these SHA-pinned v4 files. |
| Overall live use | **HOLD** | GO requires every authority above. Two mandatory authorities are absent. |

## Exact Nate decision request

Nate, for each named SHA below, mark `APPROVE` or `REJECT` for reconstructed-label live use in its named slot: Pure Carob Elixir `70f93f…eb93`, and Spiced Carob Elixir `414f727e…749bb`.

Until that decision is explicit, do not copy, wire, integrate, deploy or promote either v4 file.

## Programme boundary

This review changes no V9 hero-photo count. The working figure remains **5 wired `photo_finals` heroes / 14 eligible V9 frames = 36%**. These generated/review assets are not eligible V9 photo frames and must not increase that number.
