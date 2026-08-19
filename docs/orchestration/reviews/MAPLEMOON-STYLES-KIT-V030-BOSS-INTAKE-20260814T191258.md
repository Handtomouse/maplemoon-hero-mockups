# MapleMoon Styles Kit v0.3 Boss intake — 2026-08-14

## Disposition

- **Required-check result: FAIL. Planning promotion: HOLD.** The pinned `0.3.0-provisional` package is mechanically parseable, but the late Styles-task self-audit is reproducible and exposes required browser/specimen integrity failures that the task-owned verifier misses. It cannot replace v0.1.7 for planning yet.
- **No implementation authority.** Every provisional, `NEEDS NATE`, content/media, technical-evidence, exact-media, crop, fog, runtime, Shopify, deployment and production hold remains intact.
- **Independent-review boundary: acceptable in principle, not reached in outcome.** Nate's direct no-Claude instruction safely replaces the unavailable model-identity condition with separate Styles-task authorship, this distinct Boss-worker audit and root receipt/hash replay. That replacement does not waive failed evidence.
- Candidate, kit, media, source, deployment, Git, production and client surfaces were read only.

## Admission

Raw phase-start output after the fresh non-overwriting checkpoint:

```text
PASS checkpoint packet=MAPLEMOON-STYLES-KIT-V030-BOSS-INTAKE-20260814T191258 files=3 path=_wip/checkpoints/MAPLEMOON-STYLES-KIT-V030-BOSS-INTAKE-20260814T191258_20260814_191548_AEST
PASS packet=MAPLEMOON-STYLES-KIT-V030-BOSS-INTAKE-20260814T191258 phase=start scope=3
```

Checkpoint:
`maplemoon-website/_wip/checkpoints/MAPLEMOON-STYLES-KIT-V030-BOSS-INTAKE-20260814T191258_20260814_191548_AEST`

Packet SHA-256 at admission: `d785d126af72f45deb3b1d1b3ee58a129d8bcce968aef3f165c2894fad9f5880`.

## Authority reconciliation

The current machine state is unambiguous: `0.3.0-provisional`, 68 rules, 12 decisions, 66 tokens, 9 governed assets and 31 proof PNGs. Across rules plus decisions the states are 37 `APPROVED`, 25 `PROVISIONAL/RECOMMENDED`, 14 `TECHNICAL EVIDENCE REQUIRED`, 2 `NEEDS NATE`, and 2 `CONTENT/MEDIA DEPENDENCY`. The 37 approved entries include all 12 decisions; only 25 rules are approved.

Preserved boundaries include:

- `CNT-002` and `FOG-002`: `NEEDS NATE`.
- `FND-002` and `MEDIA-002`: `CONTENT/MEDIA DEPENDENCY`.
- `FND-009`, `NAV-004`, `CMP-006`–`CMP-008`, `MEDIA-005`, `FOG-004`, `FOG-006`, `RESP-002`, `RESP-003`, `RESP-005`, `RESP-006`, `RESP-009`, and `LAYER-002`: `TECHNICAL EVIDENCE REQUIRED` in the kit.
- All other provisional appearance rules remain provisional; no real asset, crop, focal point, grade, fog number or implementation base was admitted.

The current-state documents have one correctable documentation-drift bundle: `COMPLETION-AUDIT.md` says “65 tokens” while the live JSON/CSS/verifier state is 66/66; it reports 64 regular files while the corrected handoff reports 79; `RULE-REGISTER.json` still calls `SRC-KIT` version `0.1.7-provisional`; and the bridge/completion-audit next action still requires Claude. Nate's direct no-Claude instruction supersedes that stale process text. These seams do not make the authority model ambiguous, but they belong in the single correction below.

## Exact task-owned verifier

Command: `node verify-style-kit.mjs` from the kit output root. Exit `0`.

```text
PASS required files non-empty: 31/31
PASS DESIGN-TOKENS.json parses
PASS ASSET-MANIFEST.json parses
PASS RULE-REGISTER.json parses
PASS CLEANUP-CANDIDATES.json parses
PASS package version parity: 0.3.0-provisional
PASS cleanup candidate schema/classification integrity: 47/47
PASS rule register schema/status/source integrity: 68 rules + 12 decisions
PASS human↔machine rule mirror: 68/68 rules, 12/12 decisions
PASS Markdown rule references resolve to RULE-REGISTER.json
PASS 13 August claim/FAQ/base-neutrality correction invariants
PASS JSON↔CSS token consistency: 66/66
PASS small gold text contrast: color.surface.blue=5.80:1 color.surface.ivory=5.93:1 color.surface.paper=6.47:1
PASS asset manifest hashes: 9/9
PASS visual proofs and dimensions: 31/31
PASS internal HTML/Markdown links and local assets resolve
PASS no accidental forbidden/internal implementation paths
PASS playground includes exactly the six permitted preview names
PASS shell/navigation and shared page-header specimens present
PASS sections/media/control specimens: roles=7 mediaStates=4 integrations=4 effects=4 overlays=3 systemStates=7 delivery=3 controlStates=6 icons=6
PASS anti-pattern comparisons: 12
PASS playground.js JavaScript parses
PASS playground CSS brace balance
PASS contrast scrim is contained to its media box
RESULT PASS
```

This output is genuine but insufficient: its own `mediaStates=4` success conflicts with `MEDIA-003`'s required five-state contract, and its root-width check misses internal Stockists panel overflow.

## Independent mechanical checks and positive controls

The independent audit passed 31/31 nonblank required files, all four JSON parses, version parity, 68+12 schema and mirrors, 66/66 token parity, small-gold kit-token contrasts 5.80/5.93/6.47, 9/9 asset hashes, 31/31 valid nonzero PNGs, links/assets, JavaScript parse, CSS balance, 12 anti-patterns and scrim containment.

```text
PASS positive_controls: missingRequired=DETECTED malformedRule=DETECTED malformedToken=DETECTED malformedAsset=DETECTED brokenLink=DETECTED brokenAsset=DETECTED escapedScrim=DETECTED
RESULT PASS
```

The first independent run is preserved: it failed because the task-owned harness pointed its scrim test at the token stylesheet. The script was corrected to read `playground.css`; no source package changed.

Other task-owned harness corrections are also preserved rather than hidden: Chrome's automatic favicon probe caused the first browser aggregate to fail until the local server returned a deliberate `204`; two initial `jq` acceptance aggregates had expression-shape errors before the corrected aggregate returned the authoritative exit `1`; and the first predecessor-gate replay used the script path relative to `/Users/handtomouse` before the corrected `maplemoon-website/scripts/...` commands passed 6/6. None was a source-package or candidate mutation.

## Material Styles-task self-audit replay

The late self-audit was not treated as commentary. Its claims were replayed against the pinned source:

| Check | Replayed result | Intake consequence |
|---|---|---|
| Playground literal rule traceability | 28/68 rules; 2/12 decisions | Documentation/specimen coverage gap; human-machine status mirror still passes separately. |
| `MEDIA-003` media states | Requires governed, placeholder, loading, error, unavailable; playground has 4/5, omitting media-specific unavailable | **Required specimen mismatch.** |
| `CMP-017` control matrix | Six states exist only for primary; secondary, tertiary and icon do not have full matrices | **Rule/specimen mismatch.** |
| `FOG-002` trial numbers | `0`, `0.18`, `0.34` exist but do not define opacity versus mask core/falloff | Held numeric model is underspecified; no Nate choice is possible from these numbers alone. |
| Stockists header panel | Internal overflow +2px at 390, +5px at 375, +9px at 360, +18px at 320; root remains clipped/equal | **Required browser failure; prior zero-root-overflow claim is incomplete.** |
| Raw colours | Non-token colour literals remain in live playground CSS | Token-governance/traceability gap; no website inference. |
| Proof custody | 31 PNGs, no current proof manifest; no current open modal/drawer/popover screenshots in the source package | Mixed-history proof traceability gap. This intake's own interaction screenshots do not rewrite source-package history. |
| CV cases | No CV-014/CV-051/CV-062 phrase→route/block occurrence map | `CNT-002` remains `NEEDS NATE`; no candidate edit becomes eligible. |
| Media records | `MEDIA-005` placement contract is prose; `ASSET-MANIFEST.json` has no placement-level sizes/priority/decoding/error fields | `MEDIA-002`/`MEDIA-005` remain split and held. |
| Shopify | Mapping explicitly says exact theme/base/sections/settings/catalogue/apps/preview/noindex/migration/rollback discovery remains required | Planning note only; no implementation readiness. |
| Native 200 | Candidate R2 is valid candidate evidence only | Does not close kit media, FND, overlay or layer holds. |

Raw replay: `_wip/evidence/styles_kit_v030_boss_intake_20260814T191258/material-self-audit-replay.json`.

The aggregate required-kit acceptance check exits `1`. Under the receipt-gate semantics this is a failed required check, so packet outcome is `FAIL` and promotion remains `HOLD`.

## Rendered evidence

The intake rendered the live kit at 1440×1000, 1024×900, 768×900 and measured 390×844. Full-page and all five page-header specimens are nonblank. Root overflow, loaded broken images, required sub-44 controls, console/page/request/HTTP errors and missing required catalogue sections are all zero on the final run.

The modal, drawer and popover catalogue examples pass focus entry, Escape close and focus return at measured 390. The drawer also makes its contained background inert. These are catalogue proofs only.

Final browser raw output:

```text
{
  "kitWidths": 4,
  "kitPass": true,
  "interactionsPass": true,
  "candidateRenders": 21,
  "candidateNetworkPass": true
}
RESULT PASS
```

The separate internal-panel probe is what exposes the Stockists defect hidden by root clipping.

Key evidence:

- `_wip/evidence/styles_kit_v030_boss_intake_20260814T191258/kit-widths-contact-sheet.png`
- `_wip/evidence/styles_kit_v030_boss_intake_20260814T191258/kit-header-contact-sheet.png`
- `_wip/evidence/styles_kit_v030_boss_intake_20260814T191258/candidate-contact-sheet.png`
- individual kit and candidate PNGs in the same directory.

## RESP-008 candidate gap and cost table

Only the approved `RESP-007`/`RESP-008` grammar is enforced. The kit's exact typography numbers remain provisional. Home is the explicit cinematic exception; Pure is excluded.

| Route | Exact file/selectors | Measured evidence | Status and bounded work | Cost |
|---|---|---|---|---:|
| Our Story | `our-story.html`; `.os-story-hero__copy h1`, `.os-story-hero__portrait` | 46.8/68/81.6px at 390/900/1440; mobile copy precedes media; exposed-edge treatment intact | **No-op / current shared reference.** Preserve exact media hold. | 0 h |
| Carob Story | `carob-story.html`; `.hero .hd`, `.hero .pic`, `.hero .pic img`, existing `max-width:900px` block | 42.9/56.8/60.48px; mobile copy precedes media and current blend remains intact | **Headline-only gap.** Harmonise size/line/tracking without changing wording, asset, crop or fog. | 0.5–0.75 h |
| FAQ | `faq.html`; `.faq-hero h1`, `.faq-hero::after`, existing mobile overrides | Headline matches Our Story at all three widths; 390 visual keeps the pseudo-photo above/alongside rather than after copy/search | **Mobile media-order gap.** Move the existing masked pseudo-photo below copy/search, preserving asset/crop/fog and control clearance. | 0.75–1.0 h |
| Shop | `shop.html`; inline opening `<h1>` and `.sp-opening .sp-head h1` | 34.4/36/51.84px; no exposed header-photo edge | **Headline-only gap.** Remove split inline authority and harmonise size/line/tracking; add no media. | 0.5–0.75 h |
| Stockists | `stockists.html`; `.sp-head h1`, `.sp .sp-head h1`, mobile `.sp .sp-head::after` | 32/40.95/65.52px; `Maple Moon` remains intact; candidate masked photo placement is below heading/search | **Headline-only gap.** Harmonise typography and preserve current candidate photo placement. The kit's own Stockists specimen overflow is a separate source-package defect. | 0.5–0.75 h |
| Shared independent QA | Five governed routes at 390/900/1440; Home regression; Pure exclusion | Current intake supplies baseline only | Reprove computed parity, order, exposed edges, text, requests, images and overflow after mutation. | 1.5–2.0 h |

RESP-008 subtotal: **3.75–5.25 hours**.

## Separately proven technical candidate findings

| Rule | Exact surface/evidence | Current result | Eligibility/cost |
|---|---|---|---|
| `FND-009` | `homepage.html` `#pdpEyebrow`; sampled real field beside the text; text shadow recorded but not credited | **FAIL:** 2.51:1 / 3.05:1 / 3.23:1 at 390/900/1440. FAQ is 4.92–5.63 and Pure is 4.59–4.84. | Exact Home colour/field correction is technically eligible after a separate packet; 0.25–0.5 h plus shared reproof. |
| `MEDIA-005` | Seven-page static source plus 21 renders | 56/56 declared local assets nonblank and all requested viewport images clean, but intrinsic dimensions, `srcset`/`sizes`, priority and visible failure behaviour are inconsistent; zero inline error handlers is not fallback proof. | **HOLD / not costable as implementation** until placement ledger and `MEDIA-002` bindings exist. |
| `NAV-004` | Mobile-header receipt + integrated R2 + native-200 R2 | Existing candidate has independent 7-route threshold, focus/menu, reduced-motion and native-zoom evidence. | Satisfied for the pinned candidate only; rerun after any shared-header mutation. |
| `RESP-009` | Cart inert/focus receipt + integrated R2 + native-200 R2 | Current cart/drawer scope proves focus containment/return, Escape, inert ownership, pointer blocking, 44px and zoom. | Satisfied for those existing surfaces only; no broad kit proof or automatic future-overlay acceptance. |
| `LAYER-002` | Integrated R2 and native-200 R2 paint-order/inert ownership | Existing header/drawer/cart stacking is independently evidenced. | Satisfied for pinned candidate only; rerun after mutation. |

Immediately costable candidate work including the FND-009 gap is **4.0–5.75 hours**, but this intake authorises none of it and the Styles Kit correction remains upstream.

## D01–D06 eligibility map

No recommendation is treated as a decision.

| Decision | Candidate eligibility if Nate chooses | Current state |
|---|---|---|
| D01 catalogue | `homepage.html`, `shop.html`, exact approved mirror in `pure-carob-bar.html`; media separate | Awaiting A/B. B additionally requires a dated 24-item register. |
| D02 commerce mode | Seven cart triggers, `shop.html`, `homepage.html`, `pure-carob-bar.html`, `mock-cart.js/css` under a separate packet | Awaiting A/B; current mock cart is not live checkout. |
| D03 stockist truth | `homepage.html`, `stockists.html` | Awaiting A/B; 197 requires named owner/source/cadence/as-of date. |
| D04 newsletter/contact | `homepage.html`, `stockists.html`; C additionally requires endpoint/privacy implementation | Awaiting A/B/C. |
| D05 claims | Exact selected occurrences only across seven pages; metadata mirrors only after visible copy | Awaiting A/B/C; CV-014/051/062 remain unmapped and ineligible. |
| D06 elixir v4 | `shop.html` and exact named slot file only after per-slot approval, destination/output hash and render proof | Awaiting separate PURE/SPICED approval/rejection; current conservative recommendation is not authority. |

The sole approved current product-media exception remains `powder_roasted.webp` SHA-256 `40efa1836bffcf69b44084291b1996f8dc7a70d6f4bcef22e658904fa8a26eaf`. Photography truth remains **5 wired hero files / 14 eligible V9 frames = 36%**.

## Native 200 boundary

The kit's native-200 result remains `UNKNOWN`. Candidate R2 separately passes genuine native 200% browser zoom at effective 390 and 720 across all seven routes. That receipt is cited, not imported as kit proof, and it does not close `FND-009`, `MEDIA-002`, `MEDIA-005`, `RESP-009`, `LAYER-002` or exact-media holds for future work.

## Exactly one task-owned correction

**Issue one docs/playground/verifier-only `v0.3.1-provisional` correction packet** that: fixes the 65/66, 64/79, stale v0.1.7 and superseded-Claude text; resolves the Stockists internal overflow; makes `MEDIA-003` and `CMP-017` specimens match their written contracts; defines the held fog-number semantics without choosing them for Nate; adds current proof-manifest and open-interaction custody; makes rule/decision traceability explicit; adds the missing CV occurrence-map placeholder and placement-level `MEDIA-005` ledger structure; and updates the verifier with positive-controlled internal-overflow/specimen-coverage checks. It may not write the website, admit media, resolve Nate decisions or weaken any hold.

## Hash close and changed paths

All packet-pinned kit, predecessor and seven candidate hashes match at close. Raw close output is `_wip/evidence/styles_kit_v030_boss_intake_20260814T191258/close-hashes-raw.txt`.

Exact changed paths:

1. `maplemoon-website/_wip/evidence/styles_kit_v030_boss_intake_20260814T191258`
2. `maplemoon-website/docs/orchestration/reviews/MAPLEMOON-STYLES-KIT-V030-BOSS-INTAKE-20260814T191258.md`
3. `maplemoon-website/docs/orchestration/reviews/MAPLEMOON-STYLES-KIT-V030-BOSS-INTAKE-20260814T191258.json`

No other path was intentionally changed. Production remains frozen on immutable token `7vjf2m50b`.
