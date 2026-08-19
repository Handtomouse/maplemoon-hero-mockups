#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import pathlib
import re
from datetime import datetime, timezone

ROOT = pathlib.Path('/Users/handtomouse')
REPO = ROOT / 'maplemoon-website'
OUT = REPO / '_wip/evidence/design_system_gap_audit_20260817T153140'
REPORT = REPO / 'docs/orchestration/reviews/MAPLEMOON-DESIGN-SYSTEM-GAP-AUDIT-20260817T153140.md'
CANDIDATE = pathlib.Path('/private/tmp/maplemoon-pdp-route-repair-20260816')
KIT = ROOT / 'Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs'
PACKET = REPO / 'docs/orchestration/packets/MAPLEMOON-DESIGN-SYSTEM-GAP-AUDIT-20260817T153140.md'
LEDGER = REPO / 'docs/orchestration/MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md'
CHECKPOINT = REPO / '_wip/checkpoints/MAPLEMOON-DESIGN-SYSTEM-GAP-AUDIT-20260817T153140_20260817_153827_AEST'

def sha256(path: pathlib.Path) -> str:
    digest = hashlib.sha256()
    with path.open('rb') as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()

def ev(pointer: str, observation: str) -> dict:
    return {'pointer': pointer, 'observation': observation}

def finding(fid: str, domain: str, affected: str, evidence: list[dict], condition: str,
            direction: str, priority: str, effort: str, classification: str,
            status: str, nate: bool, conflict: str, ai: bool = False,
            mobile: bool = False, state: str = 'OPEN') -> dict:
    return {
        'id': fid,
        'domain': domain,
        'affected_page_component': affected,
        'evidence': evidence,
        'wrong_missing_underdeveloped': condition,
        'recommended_direction': direction,
        'priority': priority,
        'effort_risk': effort,
        'shared_rule_or_intentional_exception': classification,
        'current_authority_status': status,
        'needs_nate': nate,
        'site_vs_styles_kit_conflict': conflict,
        'ai_template_flag': ai,
        'mobile_weakness_flag': mobile,
        'state': state,
    }

VIS = str(OUT / 'VISUAL-QA.json')
IAB = str(OUT / 'raw/iab-visual-rows.json')
RULES = str(KIT / 'RULE-REGISTER.json')
COMP = str(KIT / 'COMPONENT-CONTRACTS.md')
RESP = str(KIT / 'RESPONSIVE-ACCESSIBILITY.md')
MEDIA = str(KIT / 'MEDIA-FOG-CROP-SPEC.md')
ARCH = str(KIT / 'PAGE-ARCHETYPES.md')
SHOPIFY = str(KIT / 'SHOPIFY-MAPPING.md')
ANTI = str(KIT / 'AI-TEMPLATE-ANTI-PATTERNS.md')
V032 = str(KIT / 'version-lanes/v0.3.2-provisional/LUXURY-POLISH-RESEARCH-SUPPLEMENT.md')

findings = [
finding('GAP-001','navigation','Shop, Our Story, What Is Carob, FAQ and Stockists — 390/768 site header',
 [ev(f'{VIS}#/rows[route=shop|our-story|carob-story|faq|stockists,width=390].observed.hasVisibleMenu','All five values are false; Home and Pure are true.'), ev(f'{RULES}#NAV-001','One shared desktop/mobile header is APPROVED.')],
 'Five of seven current routes have no customer-reachable mobile menu, so navigation disappears on the exact screens most customers will use.',
 'Apply the approved shared mobile chrome to all seven routes: Menu left, centred inseparable wordmark, Contact right, one route map, current-route state, 52px menu rows.', 'P0','M / low design risk, high regression risk','SHARED RULE','APPROVED — NAV-001/NAV-003; implementation absent',False,'DIRECT CONFLICT',False,True),
finding('GAP-002','navigation','Home and Pure — mobile right action',
 [ev(f'{IAB}#/rows[route=homepage|pure-carob-bar,width=390].metrics.interactiveNames','Both routes expose Cart, not Contact.'), ev(f'{LEDGER}#D02/D05','Current approved line records mobile header Menu / centred wordmark / Contact and D02=A.')],
 'The only two routes with a working mobile header use Cart as the right action, contradicting the current approved chrome.',
 'Use Contact as the shared mobile right action. Keep cart/commerce access inside the appropriate commerce flow unless a later approved decision changes it.', 'P0','S / low','SHARED RULE','CURRENT BOSS/NATE DECISION',False,'DIRECT CONFLICT',False,True),
finding('GAP-003','navigation','Desktop header across all seven routes',
 [ev('/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SEVEN-ROUTE-VISUAL-AUDIT-R2-20260816T210036.md#Header probe','Prior pinned audit measured four wordmark/cart overlaps and only two menu-capable routes.'), ev(f'{COMP}#Shared-header','One anatomy and route map are specified.')],
 'Header markup, class systems, breakpoints and utility sets remain route-specific; the prior current-candidate proof measured painted overlap on four routes.',
 'Converge on one semantic header primitive and route map while keeping Home visual transparency/overlay behaviour as the explicit exception.', 'P0','M / high regression surface','SHARED RULE with HOME VISUAL EXCEPTION','APPROVED — NAV-001/NAV-002/NAV-003',False,'DIRECT CONFLICT',False,True),
finding('GAP-004','accessibility','Our Story — primary landmark',
 [ev(f'{VIS}#/rows[route=our-story].observed.landmarks.main','Main count is 0 at all four widths.'), ev(f'{RESP}#Semantic expectations','Exactly one main landmark and working skip target are required.')],
 'Our Story has no <main>, so the page fails the shared semantic shell even though its visual composition is broadly viable.',
 'Wrap the existing approved page content in exactly one main landmark and bind the skip link without changing the page design.', 'P0','S / low','SHARED RULE','TECHNICAL EVIDENCE REQUIRED — RESP-005/NAV-004',False,'DIRECT CONFLICT',False,True),
finding('GAP-005','footer','All seven routes — website footer',
 [ev(f'{IAB}#/rows[width=390].metrics.footer.text','Home includes demo newsletter and seven links; Shop/Story/Carob/Stockists expose four links; FAQ and Pure use different maps.'), ev(f'{COMP}#Shared-footer','The kit specifies a governed shared anatomy with conditional held slots.')],
 'The footer is not one shared component: route maps, wordmark treatment, newsletter/demo messaging and legal/help anatomy differ.',
 'Create one shared footer anatomy and route map. Contact, newsletter and legal slots remain held/conditional until real capability and copy are supplied.', 'P1','M / medium','SHARED RULE','APPROVED anatomy; held content dependencies',False,'DIRECT CONFLICT',False,True),
finding('GAP-006','page headers','Shop, Our Story, What Is Carob, FAQ and Stockists — opening composition',
 [ev(f'{VIS}#/rows[width=390].observed.heading','Non-Home page openings use different geometry and H1 scales.'), ev(f'{RULES}#RESP-007/RESP-008','Copy-first mobile page headers and shared non-Home headline/media blend grammar are APPROVED.')],
 'The non-Home page headers do not yet read as one family: copy/media order, height, headline measure and relationship to the site header differ.',
 'Use one shared non-Home page-header contract: copy first, same headline grammar, same blend-edge logic, same vertical entry rhythm; change only content, crop/focal point and page-role density.', 'P1','M / medium','SHARED RULE','APPROVED — RESP-007/RESP-008',False,'DIRECT CONFLICT',False,True),
finding('GAP-007','typography','Non-Home H1 system at 390',
 [ev(f'{VIS}#/rows[width=390].observed.heading','Stockists 32px; Shop 37.6px; Carob 42.9px; FAQ 46.8px; Our Story 54.6px.'), ev(f'{RULES}#RESP-008','Shared non-Home headline typography is APPROVED; Maple Moon must remain inseparable.')],
 'The same headline role spans a 22.6px range on mobile and uses different line-height/measure rules, creating visual drift.',
 'Adopt one fluid non-Home H1 token and CMS-safe wrapping contract. Preserve the words “Maple Moon” as one unit; allow only the leading verb/phrase to vary.', 'P1','S–M / medium','SHARED RULE','APPROVED direction; type delivery still FND-002 dependency',False,'DIRECT CONFLICT',False,True),
finding('GAP-008','typography','Eyebrows, kickers and section labels across Story, Carob, FAQ and Stockists',
 [ev(f'{ANTI}#AP-018','The anti-pattern register warns against repetitive template symmetry and generic micro-label systems.'), ev(f'{V032}#Luxury-polish principles','Editorial hierarchy should be carried by type and space, not repeated chrome.')],
 'Repeated tiny all-caps gold/grey kickers such as “Stockists”, “Good questions” and “The makers” are a recognisable AI/Claude-template trait when used before every heading.',
 'Reserve kickers for orientation that genuinely adds meaning. Else use an editorial opening line, chapter number, plain-language subhead or whitespace/line rhythm.', 'P1','S / aesthetic decision','SHARED RULE with page-specific copy','PROVISIONAL/RECOMMENDED — FND-008/CMP-014',True,'NO DIRECT RULE BREACH; under-specified aesthetic',True,False),
finding('GAP-009','media','Non-Home page-header images — crops, fades and edges',
 [ev('/private/tmp/maplemoon-pdp-route-repair-20260816/our-story.html#mask-image','Story contains 36 mask-image declarations; Carob 14; Stockists 8; Shop/FAQ use different or no header media.'), ev(f'{MEDIA}#Page-header contract','Responsive art direction and named fog are specified, but exact crops/media remain held.')],
 'The desired shared headline/photo integration exists conceptually but is implemented as page-specific mask stacks and crop overrides, not one inspectable media contract.',
 'Create one header-media placement contract with shared edge treatment and per-page focal-point/crop fields. Exact media and focal points remain held until governed.', 'P1','M / media regression risk','SHARED RULE with page-specific crop/focal point','APPROVED grammar + CONTENT/MEDIA DEPENDENCY',True,'PARTIAL CONFLICT',False,True),
finding('GAP-010','media','All mask-based page-header blends',
 [ev('/private/tmp/maplemoon-pdp-route-repair-20260816/{homepage,our-story,carob-story,stockists}.html#@supports','Static inspection found no @supports/no-mask fallback despite 132 mask declarations.'), ev(f'{MEDIA}#Fallback','The kit requires a fallback that does not reveal a hard rectangle.')],
 'Unsupported or partially supported masks can expose hard rectangular image edges—the exact failure Nate flagged visually.',
 'Every header blend needs a no-mask fallback using overscan, pseudo-element fog and background-colour continuity; verify with mask support disabled.', 'P1','S–M / medium','SHARED RULE','TECHNICAL EVIDENCE REQUIRED — MEDIA-004/FOG-006',False,'IMPLEMENTATION PROOF MISSING',False,True),
finding('GAP-011','fog','Shared media fog numeric model',
 [ev(f'{RULES}#FOG-002','Exact alpha/core/falloff dimensions remain NEEDS NATE.'), ev('/private/tmp/maplemoon-pdp-route-repair-20260816/homepage.html#mask-image','Current pages contain many unrelated numeric masks and blurs.')],
 'Names none/light/medium are approved, but no approved alpha, core/depth or falloff/edge values exist; current raw values cannot become authority by repetition.',
 'Show Nate one controlled A/B/C proof with all three numeric dimensions separated. Do not derive geometry from old 0/.18/.34 opacity examples.', 'P1','S visual proof / low technical risk','SHARED RULE','NEEDS NATE — FOG-002',True,'UNRESOLVED, not a breach',False,False,'HOLD'),
finding('GAP-012','layout','Shared content shell',
 [ev('/private/tmp/maplemoon-pdp-route-repair-20260816/{shop,our-story,carob-story,stockists,products/pure-carob-bar}.html#.wrap','These routes use max-width 1180px; FAQ uses 1200px; Home references the 1240px kit token.'), ev(f'{RULES}#FND-001','1240px shell is PROVISIONAL/RECOMMENDED, not locked.')],
 'Three shell systems coexist, so columns and page-header edges do not align from route to route.',
 'Resolve one shared shell token during visual proof; page-specific full-bleed sections may escape it deliberately. Do not silently promote 1240 before review.', 'P1','M / broad layout impact','SHARED RULE with explicit full-bleed exceptions','PROVISIONAL/RECOMMENDED — FND-001',True,'SITE/KIT DRIFT; final value not approved',False,False),
finding('GAP-013','responsive','Gutters and breakpoint ownership',
 [ev('/private/tmp/maplemoon-pdp-route-repair-20260816#route CSS','Current routes mix 28/20/16px gutters and 1180/1050/1000/900/820/768/720/700/600/560/520/400 breakpoints.'), ev(f'{RESP}#Composition','Kit specifies 20px mobile gutters and shared acceptance widths.')],
 'Spacing and breakpoint changes are page-local, producing hard-to-predict 768–1024 and 360–390 behaviour.',
 'Define shared shell/gutter/breakpoint ownership and permit page-specific composition changes only when tied to an archetype rule.', 'P1','M–L / high regression surface','SHARED RULE','PROVISIONAL/RECOMMENDED + TECHNICAL EVIDENCE REQUIRED',False,'PARTIAL CONFLICT',False,True),
finding('GAP-014','sections','Late-page rhythm on Home, Story, Carob and Stockists',
 [ev('/Users/handtomouse/Documents/Codex/2026-08-11/referenced-chatgpt-conversation-this-is-an/outputs/maple-moon-recovery/MAPLE-MOON-SIX-PAGE-DESIGN-CRITIQUE-20260812.md#late-page degradation','The canonical critique identified denser, more generic lower-page composition.'), ev(f'{VIS}#/contacts','Fresh full-page contacts show long sequences of similarly weighted modules.')],
 'The first viewport carries the brand; later sections increasingly become equal cards, bordered panels and repeated CTA blocks.',
 'For each archetype, define a 3–5-beat section rhythm (open editorial / evidence / task / quiet close) and cap consecutive contained modules.', 'P1','M / editorial re-sequencing risk','SHARED RHYTHM with page-specific content','PROVISIONAL/RECOMMENDED — CMP-013/CMP-014',False,'UNDERDEVELOPED',True,True),
finding('GAP-015','cards','FAQ, Shop, Carob comparisons, Story founders and Stockists utilities',
 [ev(f'{ANTI}#AP-001/AP-002/AP-006','The kit rejects excessive cards, pills and nested containers.'), ev(f'{VIS}#/contacts','Fresh proofs show multiple stacked bordered panels and capsule filter rows.')],
 'Purposeful cards are mixed with containers that only group spacing, making the site feel like a themed dashboard.',
 'Use cards only for objects or bounded actions. Replace decorative containers with open editorial spacing, hairlines or full-bleed section shifts.', 'P1','M / medium','SHARED RULE','APPROVED anti-template guardrail; component details provisional',False,'PARTIAL CONFLICT',True,True),
finding('GAP-016','actions','Buttons and text-link hierarchy across all routes',
 [ev(f'{COMP}#Buttons-and-text-links','Primary navy, secondary outline and tertiary underline are specified.'), ev(f'{VIS}#/contacts','Current CTA shapes, sizes, letterspacing and link treatment vary by route.')],
 'Primary/secondary/tertiary actions are not consistently recognisable, especially between commerce, utility and editorial pages.',
 'Map every action to one of three shared roles; keep capsule shape per DEC-004 but prevent every link/filter from becoming a pill.', 'P1','M / low–medium','SHARED RULE','APPROVED direction DEC-004; CMP-002 PROVISIONAL',False,'PARTIAL CONFLICT',True,True),
finding('GAP-017','states','Primary, secondary, tertiary and icon controls',
 [ev(f'{RULES}#CMP-017','Six-state control matrix remains PROVISIONAL/RECOMMENDED.'), ev(f'{VIS}#/stateCoverage','Only selected current interactions were exercisable; loading/error/disabled matrices are not present site-wide.')],
 'Default/hover/focus-visible/pressed/loading/disabled states are not demonstrated on real components across all control roles.',
 'Implement and test the full six-state matrix as a shared primitive before route styling; do not promote CMP-017 from this audit.', 'P1','M / interaction regression risk','SHARED RULE','PROVISIONAL/RECOMMENDED — CMP-017',False,'IMPLEMENTATION PROOF MISSING',False,True),
finding('GAP-018','icons','Header, FAQ, Shop, Carob and Stockists utility icons',
 [ev(f'{RULES}#CMP-009','Thin functional 1.25–1.5px icons and no decorative tiles/circles are APPROVED.'), ev('/private/tmp/maplemoon-pdp-route-repair-20260816#inline SVG and glyphs','Current pages mix inline SVG, Unicode symbols, CSS shapes and circular icon containers.')],
 'There is no governed production icon source, export grid, license record or linecap/stroke mapping; visual weight varies.',
 'Choose one licensed/source-controlled icon family or governed custom set with 20/24px grid, stroke, linecap, optical sizing and accessible-name rules.', 'P1','M / asset governance risk','SHARED RULE','APPROVED appearance — CMP-009; source TECHNICAL DEPENDENCY',False,'PARTIAL CONFLICT',True,True),
finding('GAP-019','shop','Shop catalogue composition at 1440/1024/768/390',
 [ev(f'{RULES}#DEC-007','Approved planning direction is one asymmetric Pure feature plus five supporting at desktop, two-column mobile.'), ev(f'{VIS}#/rows[route=shop].screenshot','Current Shop is an equal product grid with 22 items.')],
 'The current composition is an equal catalogue grid and does not express the approved feature/supporting hierarchy.',
 'Show a 24-product extension of DEC-007: Pure feature opening, five supporting launch bars, then quieter scalable catalogue groups; preserve two-column mobile where readable.', 'P0','M–L / catalogue architecture risk','SHARED PRODUCT-LED RULE','APPROVED DEC-007 but 24-product extension unapproved',True,'DIRECT CONFLICT + SCOPE EVOLUTION',True,True),
finding('GAP-020','governance','Shop catalogue scope in Styles Kit versus current Boss ledger',
 [ev(f'{RULES}#ARC-005/CNT-001','Sealed kit still limits Home/Shop preview to six bars.'), ev(f'{LEDGER}#Shopify/Etheryx decisions','Later direct decision requires all 24 products.')],
 'The planning authority contains a live contradiction: six-bar preview scope is stale against the later 24-product launch decision.',
 'In the next governed documentation revision, supersede only the catalogue-scope statements and extend the Shop archetype without changing other statuses.', 'P0','S governance / high consequence if ignored','SHARED RULE','CURRENT BOSS DECISION supersedes stale kit scope',False,'DIRECT AUTHORITY CONFLICT',False,False,'HOLD'),
finding('GAP-021','filters','Shop flavour filter and taxonomy',
 [ev(f'{VIS}#/interactions[component=shop-filter-view]','The Pure filter returns eight visible products across unrelated-looking families in the current UI.'), ev('https://shopify.dev/docs/storefronts/themes/best-practices/design','Official Shopify guidance says discovery should fit the target segment.')],
 'Filter labels do not explain whether they mean ingredient, flavour family, format or availability; the result set weakens trust.',
 'Define product taxonomy first (format, flavour, availability, dietary attributes) and expose only filters with deterministic merchant-owned data.', 'P1','M / data-model dependency','SHARED RULE','TECHNICAL/DATA EVIDENCE REQUIRED — CMP-005',False,'UNDERDEVELOPED',False,True),
finding('GAP-022','accessibility','Shop interactive controls',
 [ev(f'{VIS}#/rows[route=shop].observed.sub44','Nineteen controls are below 44px at every tested width.'), ev('https://shopify.dev/docs/storefronts/themes/best-practices/accessibility#touch-screen-and-mobile-devices','Shopify calls for 44×44 primary touch targets.')],
 'Sort, view, size/pack and product actions do not meet the kit’s 44px requirement.',
 'Raise the interactive hit area to at least 44×44 without visually bloating the controls; verify pointer and keyboard behaviour.', 'P0','S–M / low','SHARED RULE','APPROVED — RESP-004',False,'DIRECT CONFLICT',False,True),
finding('GAP-023','product media','Products without governed imagery',
 [ev(f'{LEDGER}#Shopify/Etheryx decisions','Nate permits a clean image-free product layout when approved imagery is missing.'), ev(f'{RULES}#DEC-012/MEDIA-002','Neutral held slots are approved; media admission remains held.')],
 'Current repeated crescent/product-like graphics can read as invented product imagery instead of an honest image-free state.',
 'Show Nate type-first and neutral-material placeholder options that never imply the missing product appearance; keep admission/rights separate.', 'P1','S visual proof / media custody risk','SHARED RULE','APPROVED neutral-state direction; exact appearance NEEDS NATE',True,'POTENTIAL CONFLICT',True,True,'HOLD'),
finding('GAP-024','archetypes','Pure Carob product-detail page and future PDPs',
 [ev(f'{ARCH}#Current archetypes','The kit defines six route archetypes but no explicit product-detail subtype.'), ev(f'{VIS}#/rows[route=pure-carob-bar]','Pure is now a seventh audited route with distinct commerce needs.')],
 'PDP behaviour is only implicit inside the Shop archetype, leaving media, purchase, information and related-product hierarchy under-specified.',
 'Add a product-detail subtype under the product-led archetype, preserving the six-page character model while covering commerce-specific structure.', 'P1','M / medium','SHARED RULE','PROVISIONAL documentation gap; no rule promotion',False,'COVERAGE GAP',False,True),
finding('GAP-025','commerce states','PDP and product-card purchase states',
 [ev(f'{COMP}#Product-items','The kit lists product/card primitives but real availability/variant/cart states need technical proof.'), ev(f'{VIS}#/stateCoverage','No safe deterministic sold-out, unavailable, loading or commerce-error state was available.')],
 'Variant selection, quantity, add-to-cart feedback, sold-out, enquiry-only, price range, sale, error and unavailable states are not governed end-to-end.',
 'Create a state contract driven by Shopify product data and test it on both cards and PDPs; no fake checkout or stock state.', 'P0','L / commerce and data risk','SHARED RULE','TECHNICAL EVIDENCE REQUIRED + Shopify dependency',False,'UNDERDEVELOPED',False,True,'HOLD'),
finding('GAP-026','product system','Shop cards versus Pure PDP',
 [ev(f'{VIS}#/contacts/contact-1440-local-full.png','Fresh proof shows different image wells, radii, action density and metadata hierarchy.'), ev(f'{COMP}#Product-items','One product/card primitive is planned.')],
 'Cards and PDP do not yet share a clear media ratio, price hierarchy, metadata order, state language or action grammar.',
 'Define a shared product information anatomy with intentionally different card/PDP density, not different semantics.', 'P1','M / medium','SHARED RULE with card/PDP density exception','PROVISIONAL/RECOMMENDED — CMP-004',False,'PARTIAL CONFLICT',True,True),
finding('GAP-027','forms','Homepage newsletter, Stockists search/newsletter, FAQ search and future Shopify forms',
 [ev('/private/tmp/maplemoon-pdp-route-repair-20260816/stockists.html#st-news','The email form is disabled/demo-only; current forms do not cover the full kit state catalogue.'), ev(f'{COMP}#Forms','Help, error, success, required, read-only, autofill, disabled and error-summary states are documented.')],
 'The site has fragments of form styling but no shared field/label/help/error/success/autofill/disabled system demonstrated in real context.',
 'Build one accessible form primitive and exercise every documented state; keep newsletter/contact endpoints held until real.', 'P1','M / capability and accessibility risk','SHARED RULE','TECHNICAL EVIDENCE REQUIRED — CMP-008',False,'IMPLEMENTATION PROOF MISSING',False,True),
finding('GAP-028','faq','FAQ clear button and category controls',
 [ev(f'{VIS}#/rows[route=faq].observed.sub44','At least one FAQ control is sub-44 at 390/1440 and four at 768.'), ev(f'{VIS}#/interactions[component=faq-search-empty|faq-accordion]','Search empty and accordion behaviour otherwise work in the fresh harness.')],
 'Useful search/accordion states exist, but the clear/category controls do not consistently meet target size and intermediate-density behaviour.',
 'Preserve the quiet utility pattern and zero-results guidance; enlarge hit areas and verify the 768/900 transition without adding more pills.', 'P1','S / low','SHARED RULE','APPROVED target size; CMP-006/CMP-007 technical proof',False,'PARTIAL CONFLICT',False,True),
finding('GAP-029','overlays','Menu drawer, cart dialog and future modal/popover surfaces',
 [ev(f'{VIS}#/interactions[component=mobile-menu]','Home/Pure menu open and Escape close were exercised.'), ev(f'{VIS}#/stateCoverage','No general modal exists; cart dialog presence differs by route; five routes lack the shared menu drawer.')],
 'Overlay anatomy and layer behaviour are not shared across routes; current proof covers only a subset of menu/cart states.',
 'Use one layer scale, scroll-lock/focus-return contract and overlay chrome. Only create modals/popovers for real tasks.', 'P1','M / focus and layer risk','SHARED RULE','LAYER-001 PROVISIONAL; LAYER-002 TECHNICAL EVIDENCE REQUIRED',False,'PARTIAL CONFLICT',True,True),
finding('GAP-030','accessibility','Keyboard focus order and native 200% zoom',
 [ev(f'{VIS}#/focusRows','Local fresh contexts record keyboard sequences; focus styling is inspectable.'), ev(f'{VIS}#/stateCoverage/native200','Current candidate native-200 remains UNKNOWN because the authenticated in-app browser has no native zoom control; R2 proof is not current authority.')],
 'Focus traversal has partial proof, but current-candidate native browser 200% proof is not closed and cannot be inherited from failed R2.',
 'Run a separate current-candidate native-zoom harness after implementation, including sticky header, skip link, menu, forms and purchase controls.', 'P1','M / test-harness risk','SHARED RULE','TECHNICAL EVIDENCE REQUIRED — RESP-002/RESP-009',False,'PROOF GAP',False,True,'UNKNOWN'),
finding('GAP-031','responsive','320px, 360px, 375px and landscape acceptance',
 [ev(f'{VIS}#/widths','Fresh current proof covers 390, 768, 1024 and 1440 only.'), ev(f'{RESP}#Acceptance','The kit calls for reflow and overflow safety beyond 390, including small widths and zoom.')],
 'The current route set has no fresh whole-site proof at 320/360/375 or phone landscape, where long words, filters and headers are most fragile.',
 'Add small-width and landscape acceptance after shared chrome/page-header implementation; do not infer from the kit playground.', 'P1','M / medium','SHARED RULE','TECHNICAL EVIDENCE REQUIRED — RESP-003/RESP-006',False,'PROOF GAP',False,True,'UNKNOWN'),
finding('GAP-032','accessibility','Forced colours, text spacing, coarse pointer, safe areas and focus-not-obscured',
 [ev(f'{RESP}#Additional acceptance contracts','These contracts are documented in the kit.'), ev(f'{VIS}#/stateCoverage','Fresh current browser QA did not close these OS/browser-specific modes.')],
 'The documentation is ahead of real-site proof for high-contrast, user text-spacing overrides, coarse pointer, env(safe-area-inset-*), and sticky-focus visibility.',
 'Add dedicated acceptance tests; ensure the visual system still works without gradients/masks/colour-only distinction.', 'P1','M / accessibility risk','SHARED RULE','TECHNICAL EVIDENCE REQUIRED',False,'PROOF GAP',False,True,'UNKNOWN'),
finding('GAP-033','system states','Loading, error, unavailable and empty states',
 [ev(f'{VIS}#/stateCoverage','FAQ empty is exercised; deterministic loading and error triggers are UNKNOWN; media-specific unavailable is not current-site proof.'), ev(f'{RULES}#MEDIA-003/CMP-006/CMP-008','Five media states and utility/form states are planned but not promoted.')],
 'State coverage is uneven: FAQ empty is useful, while media/product/filter/form loading and error states are absent or untestable.',
 'Create a cross-component state matrix with honest copy, stable geometry, retry/escape paths and no fake capability.', 'P1','M / medium','SHARED RULE','PROVISIONAL/RECOMMENDED + TECHNICAL EVIDENCE REQUIRED',False,'IMPLEMENTATION PROOF MISSING',True,True,'UNKNOWN'),
finding('GAP-034','performance','Responsive image delivery across all routes',
 [ev(f'{VIS}#/rows[width=390].observed.imageDelivery','Across seven routes: 61 DOM images, 5 with intrinsic width+height, 0 srcset, 0 sizes; 38 have decoding attributes.'), ev('https://shopify.dev/docs/storefronts/themes/best-practices/performance/index#use-responsive-images','Shopify recommends responsive image_tag output and below-fold lazy loading.')],
 'The visual system specifies crops but the current candidate does not provide responsive candidates/sizes and rarely reserves intrinsic geometry.',
 'Bind every placement to intrinsic ratio, widths/sizes, priority, decoding and error behaviour. Above-fold media loads normally; below-fold media lazy-loads.', 'P0','M–L / asset pipeline risk','SHARED RULE','TECHNICAL EVIDENCE REQUIRED — MEDIA-005',False,'DIRECT DELIVERY GAP',False,True),
finding('GAP-035','typography','Mackinac/Neue Haas delivery and fallback metrics',
 [ev('/private/tmp/maplemoon-pdp-route-repair-20260816/*#use.typekit.net/dvz0xjs.css','All seven pages reference the same external Typekit kit and named fallbacks.'), ev(f'{RULES}#FND-002/DEC-003','Type strategy is selected, but licensing/file delivery remains a dependency.')],
 'The face choices are coherent, but license scope, Shopify delivery, fallback metric matching and failure behaviour are not sealed.',
 'Record license/host authority, exact weights/styles, preload policy and metric-compatible fallback tests before production.', 'P1','S–M / licensing and CLS risk','SHARED RULE','CONTENT/MEDIA DEPENDENCY — FND-002',False,'UNRESOLVED, not a style reversal',False,False,'HOLD'),
finding('GAP-036','tokens','Current candidate CSS and token adoption',
 [ev(f'{OUT}/raw/static-source-metrics.json','Seven HTML files contain 56 style blocks, 1,809 raw colour literals, 132 mask rules and 111 media queries.'), ev(f'{RULES}#FND-001..FND-009','The accepted kit exposes shared tokens, but most remain provisional or require proof.')],
 'The candidate is a stack of route-local overrides; shared decisions can drift because tokens and primitives are not the dominant implementation path.',
 'For later implementation, map accepted tokens to theme settings/CSS once, classify bounded page exceptions, and remove duplicate overrides only under a separate reversible packet.', 'P0','L / high regression risk','SHARED RULE + bounded exceptions','MIXED: approved decisions, provisional token values',False,'ARCHITECTURE GAP',False,True),
finding('GAP-037','content safety','Visible internal/demo language in Home and Stockists UI',
 [ev('/private/tmp/maplemoon-pdp-route-repair-20260816/stockists.html#WIP directory status/Needs confirmation/Demo only','Internal review labels are visible in customer-facing component surfaces.'), ev(f'{RULES}#CMP-010','No internal status vocabulary is APPROVED.')],
 'WIP, pending-confirmation and demo labels make the interface feel unfinished and are explicitly prohibited as customer-facing UI.',
 'Hold unavailable capabilities silently or use customer-neutral unavailable/help states; retain internal provenance only in evidence, not the page.', 'P0','S / low','SHARED RULE','APPROVED — CMP-010',False,'DIRECT CONFLICT',True,True),
finding('GAP-038','stockists','Stockists map/list relationship',
 [ev('/private/tmp/maplemoon-pdp-route-repair-20260816/stockists.html#.st-map-canvas/.st-map-marker','The current map is CSS-drawn, has markers and hover/focus styles, and is paired with internal preview language.'), ev(f'{LEDGER}#D03','Current decision keeps a non-interactive visual map; kit ARC-006 is list-first.')],
 'The surface can look interactive despite having no governed coordinates, weakening the list-first truthfulness standard.',
 'Keep the directory primary. If the visual map remains, make it unmistakably illustrative/noninteractive and remove pins, hover affordance and implied precision.', 'P0','S–M / trust risk','INTENTIONAL PAGE-SPECIFIC DIFFERENCE within shared truthfulness rule','CURRENT BOSS/NATE DECISION + ARC-006',False,'PARTIAL CONFLICT',True,True),
finding('GAP-039','capability','Demo cart, checkout and newsletter affordances',
 [ev(f'{IAB}#/homepage-mobile-menu-open','Home exposes a cart dialog with “Continue to checkout”; Home/Stockists newsletter surfaces say demo/disabled.'), ev(f'{RULES}#CONTENT-SAFETY/CMP-010','No fake checkout or fake capability is a shared guardrail.')],
 'Controls that look transactional but are local/demo-only violate the premium trust model even when accompanied by small disclaimer text.',
 'In planning previews, remove or clearly neutralise the action itself; in Shopify, bind the same visual role only to real native capability.', 'P0','S now / L for real commerce','SHARED RULE','APPROVED anti-fake-capability guardrail',False,'DIRECT CONFLICT',True,True),
finding('GAP-040','shopify','Etheryx/OS2.0 implementation mapping and future extensibility',
 [ev(f'{LEDGER}#Shopify/Etheryx decisions','Current authority is purchased Etheryx on an unpublished duplicate of maplemooncarob, native OS2.0, all 24 products.'), ev(f'{SHOPIFY}#Discovery fields','The kit remains planning-only and has no read-only Etheryx schema discovery findings.'), ev('https://shopify.dev/docs/storefronts/themes/best-practices/templates-sections-blocks','Shopify says sections/blocks must remain reorderable without relying on a fixed block sequence.')],
 'The design system is not yet mapped to the actual theme’s section/block limits, settings, dynamic sources, locales/Markets, app extensions, SEO ownership, rollback or deprecation model.',
 'Run a separate read-only Etheryx discovery; then define protected global primitives, merchant-editable content/crops, safe ranges and migration/rollback boundaries.', 'P0','L / platform and merchant-risk','SHARED RULE with template-specific bindings','PLANNING ONLY — TECHNICAL EVIDENCE REQUIRED',False,'IMPLEMENTATION MAPPING GAP',False,True,'HOLD'),
]

sources = [
 {'source_id':'SRC-PACKET','kind':'local-authority','title':'Boss design-system gap audit packet','url_or_path':str(PACKET),'owner':'MapleMoon Boss','accessed_at':'2026-08-17','observation':'Defines exact authority, inputs, outputs, controls and no-implementation boundary.','applicability':'Governs this audit.','conflict_or_fit':'Highest scope authority for this work.','mapped_rule_ids':['ALL']},
 {'source_id':'SRC-BOSS-LEDGER','kind':'local-authority','title':'Current Boss execution ledger','url_or_path':str(LEDGER),'owner':'MapleMoon Boss','accessed_at':'2026-08-17','observation':'Current decisions include D01–D06, shared mobile chrome, Home exception, Etheryx/OS2.0 and all 24 products.','applicability':'Current decision authority.','conflict_or_fit':'Supersedes stale six-bar/implementation assumptions only where explicit.','mapped_rule_ids':['NAV-001','NAV-003','ARC-005','DEC-007']},
 {'source_id':'SRC-KIT-V031','kind':'local-planning-authority','title':'Accepted sealed v0.3.1 Styles Kit','url_or_path':str(KIT),'owner':'Maple Moon Styles Kit task; accepted by Boss','accessed_at':'2026-08-17','observation':'68 rules, 12 decisions and 70 tokens with mixed statuses.','applicability':'Planning authority only; never implementation proof.','conflict_or_fit':'Statuses preserved.','mapped_rule_ids':['ALL']},
 {'source_id':'SRC-KIT-V032','kind':'local-advisory','title':'Luxury polish research overlay v0.3.2','url_or_path':str(KIT/'version-lanes/v0.3.2-provisional'),'owner':'Maple Moon Styles Kit task','accessed_at':'2026-08-17','observation':'Advisory restraint, hierarchy, pacing and media principles.','applicability':'Clarifies eight named rules only.','conflict_or_fit':'No status promotion.','mapped_rule_ids':['FND-002','FND-008','CMP-002','CMP-013','CMP-014','MEDIA-002','MEDIA-004','MEDIA-005']},
 {'source_id':'SRC-KIT-V040','kind':'local-advisory-visual','title':'v0.4 planning visual guidance','url_or_path':str(KIT/'version-lanes/v0.4-provisional'),'owner':'Maple Moon Styles Kit task','accessed_at':'2026-08-17','observation':'Four specimen families at four widths.','applicability':'Comparison only.','conflict_or_fit':'No specimen is website approval.','mapped_rule_ids':['FND-008','CMP-002','CMP-013','CMP-014','MEDIA-004','MEDIA-005']},
 {'source_id':'SRC-CURRENT-CANDIDATE','kind':'current-site-evidence','title':'Boss-pinned m49 candidate and exact local bytes','url_or_path':'https://maplemoonbuild20260813-m49nihfds-handtomouses-projects.vercel.app','owner':'MapleMoon candidate','accessed_at':'2026-08-17','observation':'Authenticated IAB inspection plus 28 local hash-pinned fresh contexts.','applicability':'Current visual/runtime evidence.','conflict_or_fit':'Implementation evidence, never rule authority.','mapped_rule_ids':['ALL']},
 {'source_id':'EXT-WCAG22','kind':'external-primary','title':'Web Content Accessibility Guidelines 2.2','url_or_path':'https://www.w3.org/TR/WCAG22/','owner':'W3C WAI','accessed_at':'2026-08-17','observation':'Defines reflow, focus, target size and other conformance criteria.','applicability':'Accessibility acceptance.','conflict_or_fit':'Fits Maple Moon guardrails; not visual authority.','mapped_rule_ids':['RESP-002','RESP-003','RESP-004','RESP-005','RESP-009']},
 {'source_id':'EXT-WCAG-REFLOW','kind':'external-primary','title':'Understanding Reflow','url_or_path':'https://www.w3.org/WAI/WCAG22/Understanding/reflow.html','owner':'W3C WAI','accessed_at':'2026-08-17','observation':'Reflow and 200% text/zoom must avoid two-dimensional reading; sticky content must not obscure focus.','applicability':'Small-width, zoom and sticky-header tests.','conflict_or_fit':'Fits.','mapped_rule_ids':['RESP-002','RESP-003','RESP-009']},
 {'source_id':'EXT-WAI-APG','kind':'external-primary','title':'ARIA Authoring Practices patterns','url_or_path':'https://www.w3.org/WAI/ARIA/apg/patterns/','owner':'W3C WAI','accessed_at':'2026-08-17','observation':'Documents keyboard and semantic contracts for accordion, disclosure, dialog and menu button patterns.','applicability':'FAQ, mobile menu and overlays.','conflict_or_fit':'Fits; native HTML remains preferred where possible.','mapped_rule_ids':['CMP-006','CMP-007','CMP-008','LAYER-002']},
 {'source_id':'EXT-SHOPIFY-ACCESS','kind':'external-primary','title':'Accessibility best practices for Shopify themes','url_or_path':'https://shopify.dev/docs/storefronts/themes/best-practices/accessibility','owner':'Shopify','accessed_at':'2026-08-17','observation':'Requires keyboard operation, visible focus, skip link, labelled forms, dialog focus management and 44×44 primary targets.','applicability':'Commerce and theme acceptance.','conflict_or_fit':'Fits Maple Moon’s 44px rule.','mapped_rule_ids':['RESP-004','RESP-005','CMP-008','LAYER-002']},
 {'source_id':'EXT-SHOPIFY-PERF','kind':'external-primary','title':'Performance best practices for Shopify themes','url_or_path':'https://shopify.dev/docs/storefronts/themes/best-practices/performance/index','owner':'Shopify','accessed_at':'2026-08-17','observation':'Prefer HTML/CSS, responsive image_tag output, restrained preloads and below-fold lazy loading.','applicability':'Media delivery and later Etheryx implementation.','conflict_or_fit':'Fits; no implementation imported.','mapped_rule_ids':['MEDIA-005','RESP-009']},
 {'source_id':'EXT-SHOPIFY-SECTIONS','kind':'external-primary','title':'Building with sections and blocks','url_or_path':'https://shopify.dev/docs/storefronts/themes/best-practices/templates-sections-blocks','owner':'Shopify','accessed_at':'2026-08-17','observation':'Sections/blocks should remain reorderable and flow logically regardless of block sequence.','applicability':'Merchant editability and future pages.','conflict_or_fit':'Fits; design guardrails must constrain unsafe combinations.','mapped_rule_ids':['ARC-007','CMP-013','CMP-014']},
 {'source_id':'EXT-SHOPIFY-OS20','kind':'external-primary','title':'Online Store 2.0','url_or_path':'https://shopify.dev/docs/storefronts/themes/os20','owner':'Shopify','accessed_at':'2026-08-17','observation':'JSON templates, dynamic sources and app blocks enable modular merchant editing.','applicability':'Etheryx planning.','conflict_or_fit':'Fits current Boss decision.','mapped_rule_ids':['ARC-007']},
 {'source_id':'EXT-SHOPIFY-JSON','kind':'external-primary','title':'JSON templates','url_or_path':'https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates','owner':'Shopify','accessed_at':'2026-08-17','observation':'A JSON template supports up to 25 sections and each section up to 50 blocks.','applicability':'Future page and section architecture.','conflict_or_fit':'Constraints must be discovered in Etheryx before mapping.','mapped_rule_ids':['ARC-007']},
 {'source_id':'EXT-WEBDEV-RESPONSIVE','kind':'external-primary','title':'Preload responsive images','url_or_path':'https://web.dev/articles/preload-responsive-images','owner':'Google web.dev','accessed_at':'2026-08-17','observation':'srcset/sizes let the browser choose an appropriately sized resource; critical images may need carefully targeted preload/fetch priority.','applicability':'Header/product media.','conflict_or_fit':'Fits MEDIA-005.','mapped_rule_ids':['MEDIA-005']},
 {'source_id':'EXT-WEBDEV-CLS','kind':'external-primary','title':'Optimize Cumulative Layout Shift','url_or_path':'https://web.dev/articles/optimize-cls','owner':'Google web.dev','accessed_at':'2026-08-17','observation':'Unreserved lazy media can shift content; intrinsic geometry reduces CLS.','applicability':'Media placement ledger.','conflict_or_fit':'Fits.','mapped_rule_ids':['MEDIA-005','RESP-009']},
 {'source_id':'EXT-APPLE-TYPE','kind':'external-primary-advisory','title':'Human Interface Guidelines — Typography','url_or_path':'https://developer.apple.com/design/human-interface-guidelines/typography','owner':'Apple','accessed_at':'2026-08-17','observation':'Use a limited type set, preserve hierarchy and adapt to larger text without truncation.','applicability':'Advisory for legibility and fallback testing.','conflict_or_fit':'Fits; platform styling is not imported.','mapped_rule_ids':['FND-002','FND-008','RESP-002']},
 {'source_id':'EXT-APPLE-MOTION','kind':'external-primary-advisory','title':'Human Interface Guidelines — Motion','url_or_path':'https://developer.apple.com/design/human-interface-guidelines/motion','owner':'Apple','accessed_at':'2026-08-17','observation':'Motion should be purposeful, brief, optional and cancelable.','applicability':'Header motion, media and overlays.','conflict_or_fit':'Fits quiet premium direction.','mapped_rule_ids':['RESP-009','LAYER-002']},
 {'source_id':'EXT-PORSCHE-DS','kind':'external-primary-advisory','title':'Porsche Design System v3 — Spacing','url_or_path':'https://designsystem.porsche.com/v3/styles/spacing/','owner':'Porsche','accessed_at':'2026-08-17','observation':'Separates fluid and static spacing scales in a documented system.','applicability':'Reference for disciplined token use only.','conflict_or_fit':'Fits methodology; values/components are not imported.','mapped_rule_ids':['FND-001','CMP-013']},
 {'source_id':'EXT-AESOP','kind':'external-first-party-advisory','title':'Aesop official site','url_or_path':'https://www.aesop.com/','owner':'Aesop','accessed_at':'2026-08-17','observation':'Combines narrative modules, product discovery and truthful service capability.','applicability':'Editorial-commerce pacing.','conflict_or_fit':'Fit: truthful service and varied pacing. Conflict: dense catalogue/navigation must not be copied.','mapped_rule_ids':['ARC-001','ARC-005','CMP-013']},
 {'source_id':'EXT-LOEWE','kind':'external-first-party-advisory','title':'LOEWE official site','url_or_path':'https://www.loewe.com/usa/en/women/wardrobe-essentials-thm','owner':'LOEWE','accessed_at':'2026-08-17','observation':'Inserts editorial chapters inside product discovery rather than treating every module equally.','applicability':'Shop rhythm reference.','conflict_or_fit':'Fit: asymmetric editorial/product pacing. Conflict: fashion-scale imagery and oversized branding.','mapped_rule_ids':['ARC-005','CMP-013','MEDIA-004']},
 {'source_id':'EXT-THEROW','kind':'external-first-party-advisory','title':'The Row official site','url_or_path':'https://www.therow.com/en-au','owner':'The Row','accessed_at':'2026-08-17','observation':'Shows extreme editing, low chrome and image-first hierarchy.','applicability':'Restraint benchmark.','conflict_or_fit':'Fit: fewer modules. Conflict: small utility type and image-dependent emptiness fail Maple Moon needs.','mapped_rule_ids':['FND-008','CMP-002','CMP-014']},
 {'source_id':'EXT-HERMES','kind':'external-first-party-advisory','title':'Hermès official online store','url_or_path':'https://www.hermes.com/us/en/','owner':'Hermès','accessed_at':'2026-08-17','observation':'Uses distinct story-to-product chapters with focused actions.','applicability':'Editorial-commerce pacing.','conflict_or_fit':'Fit: chapter variation. Conflict: campaign theatre and luxury copy are not Maple Moon authority.','mapped_rule_ids':['CMP-013','CMP-014','MEDIA-004']},
]

route_files = ['homepage.html','shop.html','our-story.html','carob-story.html','faq.html','stockists.html','products/pure-carob-bar.html']
static_rows=[]
for rel in route_files:
    path=CANDIDATE/rel
    text=path.read_text(errors='replace')
    styles=re.findall(r'<style[^>]*>(.*?)</style>',text,re.S|re.I); css=''.join(styles); images=re.findall(r'<img\b[^>]*>',text,re.I)
    static_rows.append({'file':str(path),'sha256':sha256(path),'bytes':path.stat().st_size,'lines':text.count('\n')+1,'style_blocks':len(styles),'style_bytes':sum(map(len,styles)),'script_blocks':len(re.findall(r'<script\b',text,re.I)),'images_static':len(images),'images_intrinsic':sum(bool(re.search(r'\bwidth=',x,re.I) and re.search(r'\bheight=',x,re.I)) for x in images),'images_srcset':sum(bool(re.search(r'\bsrcset=',x,re.I)) for x in images),'images_sizes':sum(bool(re.search(r'\bsizes=',x,re.I)) for x in images),'raw_colour_literals':len(re.findall(r'#[0-9a-fA-F]{3,8}\b|rgba?\(',css)),'mask_rules':len(re.findall(r'(?:-webkit-)?mask-image\s*:',css)),'media_queries':len(re.findall(r'@media\s*\(',css)),'main_count':len(re.findall(r'<main\b',text,re.I)),'footer_count':len(re.findall(r'<footer\b',text,re.I))})
static_metrics={'schema':'maplemoon-static-source-metrics/v1','candidate':str(CANDIDATE),'rows':static_rows,'totals':{key:sum(row[key] for row in static_rows) for key in ['bytes','lines','style_blocks','style_bytes','script_blocks','images_static','images_intrinsic','images_srcset','images_sizes','raw_colour_literals','mask_rules','media_queries']}}
(OUT/'raw/static-source-metrics.json').write_text(json.dumps(static_metrics,indent=2)+'\n')

top10 = [
 ('GAP-001','Put the approved shared mobile navigation on all seven routes.'),
 ('GAP-006','Unify non-Home page-header, headline and photo-blend grammar.'),
 ('GAP-019','Extend the approved asymmetric Shop composition to the decided 24-product scope.'),
 ('GAP-037','Remove internal/demo UI language and fake-looking capability surfaces.'),
 ('GAP-034','Add responsive image geometry, candidates, sizes and priority rules.'),
 ('GAP-036','Replace route-local override stacks with governed shared primitives and bounded exceptions.'),
 ('GAP-022','Bring all primary Shop/FAQ controls to the 44px interaction standard and complete states.'),
 ('GAP-040','Map the system to the actual Etheryx/OS2.0 schema through read-only discovery.'),
 ('GAP-030','Close current-site focus, native-200, small-width and high-contrast proof gaps.'),
 ('GAP-024','Add a product-detail subtype and real Shopify commerce-state contract.'),
]

unconsidered = [
 'The decided 24-product catalogue taxonomy: format, flavour, dietary attributes, price/availability and how each is merchant-owned.',
 'The product-detail subtype: variants, quantities, enquiry-only, sold-out, price range, sale, error and post-add feedback.',
 'Etheryx schema discovery and which current theme settings must be protected, deprecated or rolled back.',
 'Shopify Markets/locales, longer translated text, currencies and right-to-left resilience.',
 'App-extension boundaries for reviews, subscriptions, search, stockists and analytics without template drift.',
 'Native Shopify checkout/account/search-result/policy surfaces and where Maple Moon styling must stop.',
 'Asset colour-management, focal-point metadata and governance when Carli/Nate replace imagery in the editor.',
 'Performance budgets for fonts, LCP media, total image bytes, section JavaScript and app impact.',
 'Whole-site browser modes at 320/360/375, phone landscape, 200% native zoom, forced colours and user text spacing.',
 'Deprecation/version migration: how old sections/tokens are detected and retired without breaking merchant content.',
]

shared = [
 'One semantic header/footer/route map; mobile Menu / centred wordmark / Contact; 44px targets and 52px menu rows.',
 'One non-Home page-header/H1/media-edge grammar with inseparable “Maple Moon”; copy and crop vary by page.',
 'One shell/gutter/breakpoint ownership model, after Nate reviews the 1180/1200/1240 visual comparison.',
 'One primary/secondary/tertiary action hierarchy and six-state matrix.',
 'One icon source/export/stroke/accessibility contract.',
 'One media placement ledger: custody, crop, intrinsic ratio, srcset/sizes, priority, alt/caption, decoding and error state.',
 'One form, filter, accordion and overlay accessibility contract.',
 'No internal WIP/demo labels, fake checkout/map precision, invented imagery or unsupported capability.',
 'Shared performance and accessibility acceptance, including reduced motion, small widths, high contrast and native 200%.',
 'Shared Shopify global primitives with bounded merchant-editable content and safe ranges.',
]

exceptions = [
 'Home remains the cinematic exception: keep the already-decided hero concept; tune styles only and do not force the non-Home page header onto it.',
 'Our Story remains editorial: longer reading rhythm, founder/media narrative and open chapter transitions.',
 'What Is Carob remains educational: comparison and process structures may be denser, but not dashboard-like.',
 'FAQ remains quiet utility: search, categories and accordions can be compact and task-first.',
 'Shop remains product-led: asymmetric opening plus scalable catalogue hierarchy, not an editorial Story page.',
 'Stockists remains list-first and task-led; any retained map is illustrative and noninteractive.',
 'PDP is a product-led subtype with commerce state density that other pages do not inherit.',
 'Per-page media crops/focal points and section sequencing remain content-specific inside the shared media/rhythm contracts.',
]

nate_visuals = [
 {'id':'VD-01','question':'Which non-Home page-header proof best balances shared H1/media grammar with Story, Carob, FAQ, Shop and Stockists character?','options':'A shared split; B copy-first with media below; C shared grammar with page-role density variants','recommendation':'C, with the same type/blend grammar and only crop/density changing.'},
 {'id':'VD-02','question':'What replaces generic all-caps eyebrow repetition?','options':'A selective chapter numbers; B plain editorial subheads; C whitespace/hairline only; D a controlled mix','recommendation':'D: use a kicker only when it adds orientation.'},
 {'id':'VD-03','question':'How should DEC-007 scale from six bars to all 24 products?','options':'A Pure feature + five bars then grouped catalogue; B one continuous equal grid; C filter-first list','recommendation':'A.'},
 {'id':'VD-04','question':'How should image-free products appear before governed imagery exists?','options':'A type-first no image box; B neutral material field; C generic package silhouette','recommendation':'A or B; reject invented silhouettes.'},
 {'id':'VD-05','question':'Which exact none/light/medium fog alpha, core/depth and falloff/edge model is approved?','options':'A restrained narrow falloff; B broader atmospheric falloff; C page-specific numbers','recommendation':'A shared restrained model, with crop-specific placement rather than page-specific strength.'},
 {'id':'VD-06','question':'How visible should the illustrative Stockists map be beside the list?','options':'A quiet background illustration; B equal column; C remove it','recommendation':'A, with no pins/hover/precision.'},
 {'id':'VD-07','question':'Which shared footer composition should be reviewed?','options':'A links/legal only; B links plus held newsletter slot; C editorial sign-off plus links','recommendation':'C, with newsletter conditional on real capability.'},
 {'id':'VD-08','question':'Which governed icon family/export direction best matches Maple Moon?','options':'A custom thin organic set; B restrained licensed outline set; C mixed route-specific icons','recommendation':'B unless a custom set is budgeted and licensed.'},
]

stages = [
 {'stage':'0 — Authority reconciliation','scope':'Supersede stale six-product scope with the recorded 24-product decision; keep all other statuses; bind Etheryx decision in planning docs.','proof':'Rule/status diff only.','implementation':'None.'},
 {'stage':'1 — Shared visual proof','scope':'Header/footer, non-Home page headers, headline wrapping, media blends/no-mask fallback, actions/icons and mobile density.','proof':'1440/1024/768/390 plus 375/360/320; Nate selects only the bounded questions above.','implementation':'None until selection.'},
 {'stage':'2 — Commerce and utility proof','scope':'24-product Shop, image-free products, PDP subtype, filters, forms, FAQ, Stockists list/map, all states.','proof':'Realistic governed placeholders/data; keyboard, reduced motion, forced-colour and error/empty/loading specimens.','implementation':'None until review.'},
 {'stage':'3 — Read-only Etheryx discovery','scope':'Theme settings, sections/blocks, dynamic sources, locales/Markets, SEO/schema, apps, migration and rollback.','proof':'Schema/ownership matrix; no Shopify connection or change in this audit lane.','implementation':'None.'},
 {'stage':'4 — Checkpointed implementation','scope':'One shared primitive layer first, then page-specific archetypes and commerce bindings.','proof':'Reverse-patch/copy preservation; real site at all acceptance widths/modes.','implementation':'Separate Boss packet only.'},
 {'stage':'5 — Independent acceptance','scope':'Visual, accessibility, performance, Shopify editability and regression QA.','proof':'Current deployed candidate with hashes, browser evidence and Nate’s recorded decisions.','implementation':'Promotion remains a separate authority action.'},
]

matrix = {'schema':'maplemoon-design-system-gap-matrix/v1','status':'READ_ONLY_AUDIT_PLANNING_GUIDANCE_ONLY','generated_at':'2026-08-17','authority_order':['current Boss ledger','accepted sealed v0.3.1 planning baseline','v0.3.2 advisory research overlay','v0.4 advisory visual proof','current candidate evidence','historical critique/reference only','external sources advisory only'],'finding_count':len(findings),'findings':findings,'highest_value_improvements':[{'rank':i+1,'finding_id':fid,'improvement':text} for i,(fid,text) in enumerate(top10)],'important_unconsidered_areas':unconsidered,'proposed_shared_standards':shared,'intentional_page_specific_differences':exceptions,'visual_decisions_for_nate':nate_visuals,'staged_plan':stages,'holds':['FOG-002 exact numbers remain NEEDS NATE.','Exact media/crops/rights remain CONTENT/MEDIA DEPENDENCY.','Font licensing/delivery remains unresolved.','Native-200 and several OS/browser modes remain TECHNICAL EVIDENCE REQUIRED.','R2 is EVIDENCE_ONLY, FAILED_REQUIRED_CHECK and NOT_PROMOTED.','Current demo base is the Boss-pinned m49 candidate for this audit only; no implementation/demo base is designated by the Styles Kit.','Port 4183 remains rejected and never authority.','No claim decision is opened or changed by this style audit.']}
(OUT/'GAP-MATRIX.json').write_text(json.dumps(matrix,indent=2)+'\n')
(OUT/'SOURCE-MANIFEST.json').write_text(json.dumps({'schema':'maplemoon-design-system-gap-source-manifest/v1','accessed_at':'2026-08-17','authority_note':'External sources are dated advisory comparisons only and never Maple Moon authority.','sources':sources},indent=2)+'\n')

def esc(text: str) -> str:
    return text.replace('|','\\|').replace('\n',' ')

lines=[]
lines += ['# Maple Moon complete design-system gap audit','','**Disposition:** READ-ONLY DESIGN AUDIT · PLANNING GUIDANCE ONLY · NO IMPLEMENTATION OR PROMOTION','',f'**Audit date:** 17 August 2026  ','**Current candidate:** `m49` / `dpl_BAMceRFCmxKYpq7bz3GHQZ2qZuKc`  ',f'**Matrix:** `{OUT / "GAP-MATRIX.json"}`  ',f'**Visual QA:** `{OUT / "VISUAL-QA.json"}`  ',f'**Source manifest:** `{OUT / "SOURCE-MANIFEST.json"}`','',
'## Executive conclusion','',
'Maple Moon already has a distinctive visual thesis: pale atmospheric blue, warm ivory, deep navy editorial serif, restrained sans utility type, selective gold, quiet lines and soft media integration. The problem is not a missing taste level. The problem is that the current seven-route candidate implements that thesis as seven separately tuned pages, while the accepted Styles Kit remains a mixed-status planning system rather than the dominant implementation layer.','',
f'This audit records **{len(findings)} evidence-backed gaps**. The most urgent are shared chrome, non-Home page-header grammar, the stale six-product versus decided 24-product conflict, fake/internal preview affordances, responsive media delivery, Shop target sizes, PDP/commerce states and actual Etheryx mapping. Home remains the explicit cinematic exception; its hero concept is closed and needs style tuning only.','',
'The fresh browser run covered all seven routes at 1440, 1024, 768 and 390 with 28/28 harness cases, zero root overflow, broken assets, console/page/request failures, and exercised the available menu, filter, FAQ empty and accordion states. Findings such as sub-44 targets, missing landmarks and missing menus are product defects, not harness failures. Current-candidate native 200% remains explicitly UNKNOWN; failed R2 evidence cannot close it.','',
'## Authority and status handling','',
'1. The current Boss ledger is decision authority.','2. Accepted sealed v0.3.1 is planning authority only; its APPROVED/PROVISIONAL/NEEDS NATE/MEDIA/TECHNICAL statuses are preserved.','3. v0.3.2 research and v0.4 visual proofs are advisory only.','4. The current m49 candidate is implementation evidence, not rule authority.','5. Historical critique/reference packs are comparison evidence only.','6. External sources inform checks and critique; prestige or trend never promotes a Maple Moon rule.','',
'R2 is cited only as **EVIDENCE_ONLY · FAILED_REQUIRED_CHECK · NOT_PROMOTED**. Claims were not audited or changed. The Styles Kit does not designate a demo/implementation base; the packet designates m49 only as this audit target. Port 4183 remains rejected.','',
'## Current best-practice comparison','',
'Official W3C and Shopify guidance reinforces the kit’s practical rules: keyboard access, visible focus, truthful labels, 44px primary commerce controls, responsive images, intrinsic geometry and modular sections/blocks. Premium first-party comparisons support editorial pacing and restraint, but not imitation: Aesop demonstrates narrative plus truthful service capability; LOEWE and Hermès alternate editorial and product chapters; The Row demonstrates editing and low chrome. Their tiny utility type, image dependence, fashion theatre and catalogue complexity conflict with Maple Moon’s accessibility and anti-template guardrails. See `SOURCE-MANIFEST.json` for dated source-by-source fit/conflict mapping.','',
'## Design gap matrix','',
'| ID | Domain / affected surface | Evidence | What is wrong or missing | Recommended direction | Priority | Effort / risk | Shared vs exception | Authority / status | Nate? | Conflict | AI | Mobile |','|---|---|---|---|---|---|---|---|---|---:|---|---:|---:|']
for row in findings:
    evid='; '.join(f"`{item['pointer']}` — {item['observation']}" for item in row['evidence'])
    lines.append('| ' + ' | '.join([row['id'],esc(row['domain']+' — '+row['affected_page_component']),esc(evid),esc(row['wrong_missing_underdeveloped']),esc(row['recommended_direction']),row['priority'],esc(row['effort_risk']),esc(row['shared_rule_or_intentional_exception']),esc(row['current_authority_status']),'YES' if row['needs_nate'] else 'NO',esc(row['site_vs_styles_kit_conflict']),'YES' if row['ai_template_flag'] else 'NO','YES' if row['mobile_weakness_flag'] else 'NO']) + ' |')

lines += ['','## The 10 highest-value improvements','']
for i,(fid,text) in enumerate(top10,1): lines.append(f'{i}. **{fid}:** {text}')
lines += ['','## Important areas we have not considered enough',''] + [f'- {item}' for item in unconsidered]
lines += ['','## Rules that should become shared standards',''] + [f'- {item}' for item in shared]
lines += ['','## Differences that should remain page-specific',''] + [f'- {item}' for item in exceptions]
lines += ['','## Visual decisions Nate needs to see','']
for item in nate_visuals: lines += [f"### {item['id']}", '', f"**Question:** {item['question']}", '', f"**Options:** {item['options']}", '', f"**Recommendation:** {item['recommendation']}", '']
lines += ['## Staged visual-proof and implementation plan','', '| Stage | Scope | Required proof | Implementation authority |','|---|---|---|---|']
for stage in stages: lines.append(f"| {stage['stage']} | {stage['scope']} | {stage['proof']} | {stage['implementation']} |")
lines += ['','## Holds, unknowns and dependencies',''] + [f'- {item}' for item in matrix['holds']]
lines += ['','## Evidence and verification receipt','',f'- Fresh authenticated remote evidence: `{IAB}`',f'- Fresh reproducible browser QA: `{VIS}`',f'- Full matrix: `{OUT / "GAP-MATRIX.json"}`',f'- Sources: `{OUT / "SOURCE-MANIFEST.json"}`',f'- Static source metrics: `{OUT / "raw/static-source-metrics.json"}`',f'- Contact sheets: `{OUT / "contacts"}`',f'- Recovery checkpoint: `{CHECKPOINT}`','',
'The package is complete only when the exact verifier, browser QA, close pin replay, JSON parse checks and phase=complete receipt gate all return their literal required results. This report changes no website, kit, Shopify, Vercel, deploy, production or client state.','']
REPORT.write_text('\n'.join(lines))
print(f'BUILD_AUDIT_ARTIFACTS findings={len(findings)} top10={len(top10)} sources={len(sources)} report_bytes={REPORT.stat().st_size} matrix_bytes={(OUT/"GAP-MATRIX.json").stat().st_size}')
