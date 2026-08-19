# Styles Kit v0.3.1 independent re-intake — raw verification

Packet: `MAPLEMOON-STYLES-KIT-V031-BOSS-REINTAKE-20260814T204321`  
Worker: `/root/header_powder_update`  
Run date: 2026-08-14 AEST

## Admission

```text
PASS checkpoint packet=MAPLEMOON-STYLES-KIT-V031-BOSS-REINTAKE-20260814T204321 files=3 path=maplemoon-website/_wip/checkpoints/MAPLEMOON-STYLES-KIT-V031-BOSS-REINTAKE-20260814T204321_20260814_204804_AEST
PASS packet=MAPLEMOON-STYLES-KIT-V031-BOSS-REINTAKE-20260814T204321 phase=start scope=3
```

## Portable verifier

Command: `node verify-style-kit.mjs`  
Exit: `0`

```text
PASS core required files non-empty: 35/35
PASS DESIGN-TOKENS.json parses
PASS RULE-REGISTER.json parses
PASS SPECIMEN-TRACEABILITY.json parses
PASS TOKEN-USAGE.json parses
PASS MEDIA-PLACEMENT-LEDGER.json parses
PASS ANTI-PATTERN-COVERAGE.json parses
PASS PROOF-MANIFEST.json parses
PASS machine-readable version parity: 0.3.1-provisional
PASS playground presents v0.3.1 current state
PASS current-facing human documents identify v0.3.1 state and counts
PASS Boss bridge uses the Nate-superseded independent re-intake process
PASS human MEDIA-003 contract names all five distinct states
PASS current docs supersede historical CNT-005 NEEDS NATE text exactly
PASS rule register counts: 68 rules / 12 decisions
PASS CNT-002 current status NEEDS NATE
PASS FOG-002 current status NEEDS NATE
PASS CNT-005 current status APPROVED
PASS CMP-017 current status PROVISIONAL/RECOMMENDED
PASS MEDIA-005 current status TECHNICAL EVIDENCE REQUIRED
PASS FOG-002 separates alpha, core/depth and falloff/edge
PASS token count reconciled: 70
PASS JSON↔CSS token parity: 70/70
PASS token usage accounting: 55 live + 15 contract-only
PASS raw colour literals classified: 72/72
PASS reject-only raw colours remain bounded to reject specimens
PASS specimen manifest covers every live specimen: 17/17
PASS specimen rule/decision/source references resolve
PASS MEDIA-003 exact five named states present
PASS CMP-017 matrix: 4 families × 6 states
PASS page-header tabs have IDs, relationships, selection, hidden state and keyboard contract
PASS disclosure/current-route relation present: aria-controls="shop-disclosure-specimen"
PASS disclosure/current-route relation present: aria-controls="mobile-menu-specimen"
PASS disclosure/current-route relation present: aria-controls="specimen-drawer"
PASS disclosure/current-route relation present: aria-current="page"
PASS live mobile-menu name and icon state track expansion
PASS MEDIA-005 catalogue structure: 12 images with geometry/loading/decoding/srcset/sizes + visible failure
PASS page-header and integration blends have explicit no-mask fallback
PASS reduced motion removes loading shimmer and infinite iteration
PASS DEC-007 specimen: asymmetric Pure feature + five support; two-column mobile; neutral media only
PASS shared website footer has separate desktop/mobile anatomy and kit footer remains separate
PASS FAQ useful zero-results state is wired without false support capability
PASS form catalogue covers eight required states
PASS expanded responsive/accessibility acceptance contracts present
PASS anti-pattern coverage reconciled: 18 documented / 12 visual
PASS icon source/export/licence/pixel-grid/stroke contract present
PASS Shopify discovery schema extended without findings
PASS placement-level MEDIA-002↔MEDIA-005 ledger complete: 6 held entries
PASS claim phrase→route/file→block/selector map preserves unmapped/NEEDS NATE state
PASS versioned proof manifest verified: 44 entries
PASS playground local references resolve: 5/5
PASS playground contains no rejected candidate, file URL or internal machine path
RESULT PASS core=0 archive_audit=SKIPPED_BY_DEFAULT
PASS optional cleanup/project-archaeology audit skipped; run with --with-archive-audit when that machine-specific evidence is in scope
```

## Positive controls

The portable folder does not vendor Playwright, so the package's documented bundled runtime path was used.  
Command: `NODE_PATH=/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules node verify-style-kit-positive-controls.mjs`  
Exit: `0`

```text
PASS positive control: omitted MEDIA-003 state was rejected
PASS positive control: primary-only CMP-017 matrix was rejected
PASS positive control: unclassified live raw colour was rejected
PASS positive control: reduced-motion infinite shimmer was rejected
PASS positive control: missing tab aria-controls was rejected
PASS positive control: missing no-mask fallback was rejected
PASS positive control: one-column mobile product regression was rejected
PASS positive control: internal clipping detector fires while root remains equal ({"rootOverflow":0,"internalOverflow":572})
RESULT PASS positive_controls=8
```

## Exact browser verifier

Command: `NODE_PATH=/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules node verify-style-kit-browser.mjs 'http://127.0.0.1:4328/style-kit-playground.html?review=031'`  
Exit: `0`

```text
PASS 1440px root overflow=0 brokenImages=0 sub44=0 productColumns=4
PASS 1440px DEC-007 grid columns=4
PASS 1024px root overflow=0 brokenImages=0 sub44=0 productColumns=4
PASS 1024px DEC-007 grid columns=4
PASS 768px root overflow=0 brokenImages=0 sub44=0 productColumns=2
PASS 768px DEC-007 grid columns=2
PASS 390px root overflow=0 brokenImages=0 sub44=0 productColumns=2
PASS 390px DEC-007 grid columns=2
PASS 390px Stockists root/internal overflow=0; Maple Moon intact
PASS 375px Stockists root/internal overflow=0; Maple Moon intact
PASS 360px Stockists root/internal overflow=0; Maple Moon intact
PASS 320px Stockists root/internal overflow=0; Maple Moon intact
PASS page-header keyboard tab relation works
PASS modal open state exercised at 390px
PASS modal open root/internal overflow=0 at 390px
PASS drawer open state exercised at 390px
PASS drawer open root/internal overflow=0 at 390px
PASS popover open state exercised at 390px
PASS popover open root/internal overflow=0 at 390px
PASS browser console/request/page errors=0
RESULT PASS browser=0 widths=1440,1024,768,390 stockists=390,375,360,320 overlays=modal,drawer,popover
```

The capture rerun returned the same lines plus 13 `PASS captured ...` records into `rendered/`; all 13 PNG hashes exactly equal their sealed `PROOF-MANIFEST.json` entries.

## Independent structure replay

Command: `node independent-structure-audit.mjs`  
Exit: `0`

```text
PASS rules=68
PASS decisions=12
PASS unique rule IDs=68
PASS unique decision IDs=12
PASS JSON tokens=70
PASS CSS tokens=70
PASS JSON/CSS values match 70/70
PASS live token classifications=55
PASS contract-only token classifications=15
PASS classified token union=70
PASS traced specimens=17
PASS live specimen IDs=17
PASS unresolved trace references=0
PASS MEDIA-003 states=5/5 exact
PASS CMP-017 control families=4
PASS CMP-017 primary states=6
PASS CMP-017 secondary states=6
PASS CMP-017 tertiary states=6
PASS CMP-017 icon states=6
PASS proof records=44
PASS historical proof records=31
PASS current v0.3.1 proof records=13
PASS current proof present 31-page-headers-v031-desktop-1440.png
PASS current proof present 32-page-headers-v031-mobile-390.png
PASS current proof present 33-modal-open-v031-mobile-390.png
PASS current proof present 34-drawer-open-v031-mobile-390.png
PASS current proof present 35-popover-open-v031-mobile-390.png
PASS documented anti-patterns=18
PASS visual anti-patterns=12
PASS held media placements=6
PASS missing placement fields=0
PASS claim map marker CV-014
PASS claim map marker CV-051
PASS claim map marker CV-062
PASS claim map marker smooth carob
PASS claim map marker slow-roasted carob
PASS claim map marker Maple Moon mills carob
PASS claim map marker handmade in small batches
PASS claim map marker UNMAPPED
PASS claim map marker 0 exact current-candidate occurrences
PASS claim map marker NEEDS NATE
PASS Shopify discovery field Online Store 2.0 schema
PASS Shopify discovery field Locales and markets
PASS Shopify discovery field Metafields/dynamic sources
PASS Shopify discovery field SEO and structured data
PASS Shopify discovery field App-extension boundary
PASS Shopify discovery field Migration/deprecation
PASS Shopify discovery field Rollback
PASS FOG-002 separates alpha/opacity
PASS FOG-002 separates core/depth
PASS FOG-002 separates falloff/edge
PASS raw colour literals=72
PASS unclassified raw colours=0
PASS DEC-007 asymmetric desktop
PASS DEC-007 two-column mobile
PASS shared website footer
PASS reduced-motion shimmer removal
PASS unsupported-mask fallback
PASS semantic page-header tabs
PASS semantic disclosure relations
PASS useful FAQ zero state
PASS compact mobile catalogue contents
PASS hold preserved CNT-002=NEEDS NATE
PASS hold preserved FOG-002=NEEDS NATE
PASS hold preserved MEDIA-002=CONTENT/MEDIA DEPENDENCY
PASS hold preserved MEDIA-005=TECHNICAL EVIDENCE REQUIRED
PASS hold preserved FND-009=TECHNICAL EVIDENCE REQUIRED
PASS hold preserved RESP-009=TECHNICAL EVIDENCE REQUIRED
PASS hold preserved LAYER-002=TECHNICAL EVIDENCE REQUIRED
PASS base neutrality and rejected port 4183 preserved
RESULT PASS independent_structure=0 counts=68+12 tokens=70/70 usage=55+15 specimens=17 media=5 controls=4x6 proofs=31+13 anti=18+12 placements=6
```

## Independent interaction replay

Command: `NODE_PATH=/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules node independent-browser-audit.mjs`  
Final exit: `0`

```text
PASS modal focus entry/open state {"state":true,"active":"Close modal specimen"}
PASS modal Escape close and focus return
PASS drawer focus entry/open state {"state":true,"active":"Close drawer specimen","backgroundColor":"rgb(247, 243, 234)","backgroundImage":"none","opacity":"1","pageInert":true}
PASS drawer is fully opaque and contained catalogue page is inert
PASS drawer Escape close and focus return
PASS popover focus entry/open state {"state":true,"active":"specimen-popover"}
PASS popover Escape close and focus return
PASS mobile catalogue contents/landmarks {"buttonVisible":true,"label":"Contents","detailsPresent":true,"h1":1,"landmarks":[["header",1],["nav",8],["main",1],["footer",1]]}
PASS image requests nonblank 12/12
PASS independent console/page/request errors=0
RESULT PASS independent_browser=0 overlays=modal,drawer,popover focus=entry,escape,return drawer=opaque mobile_contents=present
```

The first task-owned interaction run evaluated lazy images before scrolling/waiting them and returned exit `1` on incomplete image requests while all interaction checks passed. The harness was corrected to force eager loading, scroll each image and await load/error exactly as the sealed browser verifier does; the complete rerun above passed 12/12. No package or candidate file changed.

## Candidate revalidation

Command: `node candidate-static-audit.mjs` from the pinned prior evidence directory  
Exit: `0`

```text
RESULT PASS candidate_hashes=7/7 declared_assets=56/56
```

Current candidate markup totals remain: 61 image elements; 28 with intrinsic dimensions; 25 with loading policy; 49 with decoding; 0 with `srcset`; 0 with `sizes`; 0 inline error handlers. Therefore candidate `MEDIA-005` remains `HOLD_TECHNICAL_EVIDENCE_INCOMPLETE` despite 56/56 referenced assets being present and nonblank.

The pinned prior FND-009 evidence remains applicable because all seven candidate page hashes match: Home `#pdpEyebrow` is 2.51:1 at 390, 3.05:1 at 900 and 3.23:1 at 1440. FAQ and Pure controls remain ≥4.5:1.

## Syntax

```text
node --check playground.js                          exit 0, output empty
node --check verify-style-kit-core.mjs              exit 0, output empty
node --check verify-style-kit-browser.mjs           exit 0, output empty
node --check verify-style-kit-positive-controls.mjs exit 0, output empty
node --check independent-browser-audit.mjs          exit 0, output empty
```

## Close hash replay

Command: `node hash-replay.mjs`  
Exit: `0`

```text
RESULT PASS hash_replay=28/28
```

This covers the packet itself, all 18 pinned Styles Kit/harness files, the prior v0.3 review/receipt and all seven candidate pages. The script prints every expected/actual SHA-256 pair and is retained beside this record.

## Render integrity

`magick identify` reported all 13 PNGs at their required dimensions, 584–30,291 colours per capture, nonzero bytes and nonblank means. Visual inspection passed both contact sheets. The fresh captures are byte-identical to the 13 current v0.3.1 manifest proofs.

## Receipt gates

Completion command exit `0`:

```text
PASS packet=MAPLEMOON-STYLES-KIT-V031-BOSS-REINTAKE-20260814T204321 phase=complete changed=3
```

Promotion command exit `0`:

```text
PASS packet=MAPLEMOON-STYLES-KIT-V031-BOSS-REINTAKE-20260814T204321 phase=promote changed=3
```
