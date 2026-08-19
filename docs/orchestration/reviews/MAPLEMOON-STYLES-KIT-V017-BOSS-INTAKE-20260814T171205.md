# MapleMoon Styles Kit v0.1.7 BOSS intake

Date: 2026-08-14 AEST  
Packet: `MAPLEMOON-STYLES-KIT-V017-BOSS-INTAKE-20260814T171205`  
Worker thread: `/root/header_powder_update`

## Disposition

- **Package integrity: PASS.** The current Styles Kit is internally coherent at `0.1.7-provisional`: 30/30 required outputs, 54 rules, 12 decisions, 59 tokens, 9 governed assets and 14 proofs all independently verify.
- **Prior BOSS intake replacement: PASS for planning/intake only.** v0.1.7 is the single current Styles Kit package and supersedes the earlier v0.1.6 BOSS intake as the planning reference.
- **RESP-008 candidate result: four bounded technical edits, one route no-op.** Our Story already supplies the candidate's current headline reference and compliant mobile/media treatment. Carob, Shop and Stockists have headline-grammar drift. FAQ shares the headline grammar but its 390px photographic pseudo-element remains above/alongside the copy rather than below it.
- **Implementation: HOLD.** The handoff explicitly requires a fresh independent Claude `PASS` and `Safe to feed intended Codex Boss: YES`. This Codex intake does not substitute for that check.
- **Native browser 200% zoom: UNKNOWN.** A real browser-level zoom command was attempted and unavailable. The 720px check remains responsive-pressure evidence only.
- No Styles Kit, candidate, media, source, deployment, production, Git or client surface changed.

## Recovery and admission

Checkpoint:

`/Users/handtomouse/maplemoon-website/_wip/checkpoints/MAPLEMOON-STYLES-KIT-V017-BOSS-INTAKE-20260814T171205_20260814_171417_AEST`

Literal gates before the first output write:

```text
PASS checkpoint packet=MAPLEMOON-STYLES-KIT-V017-BOSS-INTAKE-20260814T171205 files=3 path=/Users/handtomouse/maplemoon-website/_wip/checkpoints/MAPLEMOON-STYLES-KIT-V017-BOSS-INTAKE-20260814T171205_20260814_171417_AEST
PASS packet=MAPLEMOON-STYLES-KIT-V017-BOSS-INTAKE-20260814T171205 phase=start scope=3
```

The recovery manifest records all three writable outputs as absent before admission.

## Receipt chronology reconciliation

The apparent v0.1.6/v0.1.7 contradiction is historical chronology, not two live results:

| Receipt era | Recorded state | Current? |
|---|---|---|
| Opening mechanical block | `0.1.6-provisional`, 37 cleanup candidates, 52 rules, 6 assets, 8 proofs; current v0.1.6 browser reload explicitly blocked | No; historical |
| `Rule-state receipt` | Older pre-decision status summary with all DEC items still open | No; historical/stale |
| `Nate decision-closure receipt — supersedes the prior rule-state summary and next action` | `0.1.6-provisional`, 47 cleanup candidates, 53 rules, 6 assets, 10 proofs and current 1440/390 browser evidence | No; superseded by v0.1.7 |
| `v0.1.7 Shell/page-header consolidation receipt — current` | 47 cleanup candidates, 54 rules, 9 assets, 14 proofs, Shell/navigation and RESP-008 examples, current 1440/1024/768/720/390 browser evidence | **Yes; single explicit canonical section** |

The receipt says at line 6 that the final v0.1.7 consolidation section is current and all earlier blocks are historical. The final section is also labelled `— current`. No silent choice among contradictory live claims was required.

## Exact Styles Kit verifier

Command from the kit output directory:

```sh
node verify-style-kit.mjs
```

Literal output:

```text
PASS required files non-empty: 30/30
PASS DESIGN-TOKENS.json parses
PASS ASSET-MANIFEST.json parses
PASS RULE-REGISTER.json parses
PASS CLEANUP-CANDIDATES.json parses
PASS package version parity: 0.1.7-provisional
PASS cleanup candidate schema/classification integrity: 47/47
PASS rule register schema/status/source integrity: 54 rules + 12 decisions
PASS human↔machine rule mirror: 54/54 rules, 12/12 decisions
PASS Markdown rule references resolve to RULE-REGISTER.json
PASS 13 August claim/FAQ/base-neutrality correction invariants
PASS JSON↔CSS token consistency: 59/59
PASS asset manifest hashes: 9/9
PASS visual proofs and dimensions: 14/14
PASS internal HTML/Markdown links and local assets resolve
PASS no accidental forbidden/internal implementation paths
PASS playground includes exactly the six permitted preview names
PASS shell/navigation and shared page-header specimens present
PASS anti-pattern comparisons: 12
PASS playground.js JavaScript parses
PASS playground CSS brace balance
RESULT PASS
```

## Independent package verification

Command:

```sh
node _wip/evidence/styles_kit_v017_boss_intake_20260814T171205/independent-package-audit.mjs
```

Literal output:

```text
REQUIRED nonblank=30/30
RULES rules=54 decisions=12
TOKENS json=59 css=59 parity=59
ASSETS hashes=9/9
PROOFS dimensions_nonblank=14/14
LINKS failures=0
SYNTAX json=4/4 js=1/1 css_braces=PASS
PACKAGE files=55 bytes=4865131 symlinks=0
CLEANUP candidates=47
POSITIVE_CONTROLS detected=5/5
RESULT PASS failures=0
```

The independent controls used in-memory missing-file, malformed-JSON, mutated-asset-hash, missing-link and wrong-proof-dimension fixtures. All five were detected. Governed asset hashes and every proof hash/dimension are recorded in `independent-package-audit.json`.

Static candidate asset scan:

```text
our-story.html static_local_assets=18/18
carob-story.html static_local_assets=16/16
faq.html static_local_assets=4/4
shop.html static_local_assets=9/9
stockists.html static_local_assets=5/5
POSITIVE_CONTROL detected=true
RESULT PASS failures=0
```

## Rendered verification

The audit used the real kit and candidate CSS over local HTTP. Browser-generated `favicon.ico` was explicitly excluded because it is not a page dependency. Candidate failure accounting covers rendered-viewport images; deferred off-screen lazy images remain separately recorded, while the static scan proves every declared local asset nonblank.

Literal final browser output:

```text
KIT widths=1440,1024,768,720,390 screenshots=15
KIT 1440: status=200 overflow=false broken=0 sub44=0 console=0 page=0 request=0 bad=0
KIT 1024: status=200 overflow=false broken=0 sub44=0 console=0 page=0 request=0 bad=0
KIT 768: status=200 overflow=false broken=0 sub44=0 console=0 page=0 request=0 bad=0
KIT 720: status=200 overflow=false broken=0 sub44=0 console=0 page=0 request=0 bad=0
KIT 390: status=200 overflow=false broken=0 sub44=0 console=0 page=0 request=0 bad=0
NATIVE_ZOOM UNKNOWN: Browser.setZoomLevel attempted
CANDIDATE story 390: status=200 overflow=false broken=0 console=0 page=0 request=0 bad=0
CANDIDATE story 900: status=200 overflow=false broken=0 console=0 page=0 request=0 bad=0
CANDIDATE story 1440: status=200 overflow=false broken=0 console=0 page=0 request=0 bad=0
CANDIDATE carob 390: status=200 overflow=false broken=0 console=0 page=0 request=0 bad=0
CANDIDATE carob 900: status=200 overflow=false broken=0 console=0 page=0 request=0 bad=0
CANDIDATE carob 1440: status=200 overflow=false broken=0 console=0 page=0 request=0 bad=0
CANDIDATE faq 390: status=200 overflow=false broken=0 console=0 page=0 request=0 bad=0
CANDIDATE faq 900: status=200 overflow=false broken=0 console=0 page=0 request=0 bad=0
CANDIDATE faq 1440: status=200 overflow=false broken=0 console=0 page=0 request=0 bad=0
CANDIDATE shop 390: status=200 overflow=false broken=0 console=0 page=0 request=0 bad=0
CANDIDATE shop 900: status=200 overflow=false broken=0 console=0 page=0 request=0 bad=0
CANDIDATE shop 1440: status=200 overflow=false broken=0 console=0 page=0 request=0 bad=0
CANDIDATE stockists 390: status=200 overflow=false broken=0 console=0 page=0 request=0 bad=0
CANDIDATE stockists 900: status=200 overflow=false broken=0 console=0 page=0 request=0 bad=0
CANDIDATE stockists 1440: status=200 overflow=false broken=0 console=0 page=0 request=0 bad=0
RESULT PASS failures=0
```

Native zoom literal result:

```text
UNKNOWN — Protocol error (Browser.setZoomLevel): 'Browser.setZoomLevel' wasn't found.
No page-scale or viewport emulation was substituted for native 200% browser zoom.
```

Human inspection of the 390/900/1440 contact sheets found no clipping, headline/search overlap, arbitrary exposed edge, broken “Maple Moon” name or horizontal overflow. The kit's five 390 specimens all show copy before media and one exact headline style. The candidate comparison exposes the bounded drift below.

## RESP-008 measured comparison

The kit catalogue's five specimens share one exact computed style: 54.6px / 51.324px / −2.184px at 390 and 76.32px / 71.7408px / −3.0528px at 1440, all weight 400. Those numeric values remain provisional; they are evidence of the grammar, not an automatic instruction to copy the numbers.

The current candidate's closest existing shared reference is Our Story + FAQ:

| Route | 390 headline | 900 headline | 1440 headline | Media/order observation |
|---|---|---|---|---|
| Our Story | 46.8 / 46.8 / −1.404 | 68 / 68 / −2.38 | 81.6 / 78.336 / −2.856 | 390 copy first; image below; zero border/radius; two-axis edge mask |
| Carob Story | 42.9 / 47.19 / −0.6435 | 56.8 / 62.48 / −0.852 | 60.48 / 66.528 / −0.9072 | 390 copy first/media below; source field visually dissolves without a hard frame |
| FAQ | 46.8 / 46.8 / −1.404 | 68 / 68 / −2.38 | 81.6 / 78.336 / −2.856 | Edge mask passes, but at 390 the pseudo-photo starts at top `0px` instead of below copy |
| Shop | 34.4 / 36.12 / normal | 36 / 37.8 / normal | 51.84 / 54.432 / normal | No exposed photographic header edge; sampler is an intentional contained surface |
| Stockists | 32 / 33.28 / +0.32 | 40.95 / 42.588 / +0.4095 | 65.52 / 68.1408 / +0.6552 | 390 pseudo-photo is below copy with all-edge mask; `Maple Moon` remains intact |

Values are `font-size / line-height / letter-spacing` in px. All five use the same loaded candidate P22 Mackinac/Georgia stack and weight 500; no font binding is promoted by this audit.

## Exact gap and cost table

| Route | Classification | Exact candidate file/selectors | Bounded implementation scope | Engineering + self-check cost |
|---|---|---|---|---:|
| Our Story | **Already compliant / no-op** | `maplemoon_build_20260813/our-story.html`: `.os-story-hero__copy h1`, `.os-story-hero__portrait`, `.os-story-hero__portrait img` | Preserve as the current candidate reference; no edit. | 0 h |
| Carob Story | **Bounded technical gap: headline only** | `maplemoon_build_20260813/carob-story.html`: `.hero .hd`, `.hero .pic`, `.hero .pic img`; responsive block at `max-width:900px` | Harmonise the headline size/line/tracking grammar across 390/900/1440. Preserve current copy, media identity, crop and visual field blend. | 0.5–0.75 h |
| FAQ | **Bounded technical gap: mobile media order** | `maplemoon_build_20260813/faq.html`: `.faq-hero h1`, `.faq-hero::after`, existing `max-width:900px` override | Keep the already-shared headline. At mobile only, move the existing masked pseudo-photo below the copy/search region without changing its source, crop or fog numbers; re-prove controls remain unobscured. | 0.75–1.0 h |
| Shop | **Bounded technical gap: headline only** | `maplemoon_build_20260813/shop.html`: inline `<h1>` style and `.sp-opening .sp-head h1`; `.sp-opening .sp-sampler` is not an exposed photo edge | Remove or neutralise split inline headline authority, then harmonise size/line/tracking. Do not invent or add header media. | 0.5–0.75 h |
| Stockists | **Bounded technical gap: headline only** | `maplemoon_build_20260813/stockists.html`: `.sp-head h1`, `.sp .sp-head h1`, mobile `.sp .sp-head::after` | Harmonise size/line/tracking while preserving the unbroken `Maple Moon` name and already-compliant masked photo placement. | 0.5–0.75 h |
| Shared independent QA | Required after any implementation | Five governed routes at 390/900/1440; Home exception regression; Pure excluded from RESP-008 | Computed-style parity, copy/media order, all-edge visual inspection, image/network/console/overflow checks. | 1.5–2.0 h |

**Total bounded package:** 3.75–5.25 hours including independent QA. This estimate excludes any media selection, crop/fog change, content decision, Home redesign or Pure Carob addition.

## Authority holds kept separate

- `MEDIA-002`: exact live media identity/admission remains held. No route image is approved by this intake.
- `FOG-002`: numeric fog strengths remain `NEEDS NATE`.
- `FOG-004`: exact crop/blend-depth implementation proof remains required.
- `RESP-002` / `RESP-003`: any later implementation still needs complete 1440/390 proof and no-overflow proof.
- `FND-002`: font licensing/delivery remains a dependency; current computed candidate use is observation only.
- Home remains the explicit cinematic exception. Pure Carob is not silently added to RESP-008.
- Exact implementation values remain HOLD until the required fresh Claude check passes.

## Acquisition and close hashes

All pinned hashes matched at acquisition and close:

```text
2886885cc115f0e20ebbcb02061eb55047e5592c40d9b3f723ef6e10e88f444a  CLAUDE-CHECK-TO-CODEX-BOSS-HANDOFF-20260814.md
98a67138c800cad65f49845fad812f9b2c518f725806cfb7c691ad36f340d516  RULE-REGISTER.json
118bb9c62f101a14a3fc3f51f596f4185428f93569306be04aa814503eeadae5  VERIFICATION-RECEIPT.md
793d2f8b9149aac0f9c1d92d42138e3dd16476d7726778809aff6f08397c2074  STATUS.md
27921b2a466ccb670b2851a73043429763d3423bcaf651069e4e860dc01a78b1  homepage.html
2db31868a9791f373f156e7cdeb8261e494d1d47e9418a94c28156e213df7711  our-story.html
4fd9ad0fabb9d60d0f391925f5a382ccfc8f705b60fca1c681f403a5cd9734bd  carob-story.html
f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038  shop.html
c5ce7aaf0b9b3221f34eb2928fc2ff6732fc1a915ea80144a4ade2b94011fb6e  faq.html
4821adfe88680d4f174b7a8700c8d8a65594df2901bf3a7109d51b09040cb887  stockists.html
015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65  pure-carob-bar.html
```

## Evidence

- `_wip/evidence/styles_kit_v017_boss_intake_20260814T171205/browser-audit.json`
- `_wip/evidence/styles_kit_v017_boss_intake_20260814T171205/independent-package-audit.json`
- `_wip/evidence/styles_kit_v017_boss_intake_20260814T171205/candidate-asset-scan.json`
- `_wip/evidence/styles_kit_v017_boss_intake_20260814T171205/contact-kit-headers-390.png`
- `_wip/evidence/styles_kit_v017_boss_intake_20260814T171205/contact-candidates-390.png`
- `_wip/evidence/styles_kit_v017_boss_intake_20260814T171205/contact-candidates-900.png`
- `_wip/evidence/styles_kit_v017_boss_intake_20260814T171205/contact-candidates-1440.png`
- Individual kit and candidate screenshots for every required width are in the same directory.

## Failures and corrections

- The first browser run found one browser-generated favicon 404 and counted off-screen lazy images before they were requested. It is preserved as `browser-audit-attempt1-failed.json` and was not called a page failure.
- A second diagnostic attempted to trigger all lazy images and proved that some remained intentionally deferred at smaller viewports. It is preserved as `browser-audit-attempt2-lazy-visibility-correction.json`.
- The final check counts rendered-viewport image failures and records deferred images separately; static source scanning independently proves all declared candidate local assets nonblank. Final browser and static scans both pass.

## Exactly one next action

Run the handoff's required fresh independent Claude review. Only if it returns both `PASS` and `Safe to feed intended Codex Boss: YES` may BOSS issue a four-file, no-media-change RESP-008 implementation packet for Carob Story, FAQ, Shop and Stockists.
