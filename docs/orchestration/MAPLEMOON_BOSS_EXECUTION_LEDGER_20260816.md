# MapleMoon Boss execution ledger

Last reconciled: **2026-08-17 19:20 AEST**  
Owner: **MapleMoon BOSS (`/root`)**  
Overall state: **PRIVATE PREVIEW CERTIFIED / MINIMUM RELEASE BLOCKED ON NATE DECISIONS / PRODUCTION FROZEN**

This is the durable done/remaining/blocked ledger requested by Nate. It records
evidence and execution state; it does not turn recommendations into approvals.

## Active task ownership split — Nate direction 2026-08-17 18:58 AEST

- Styles task `019ff65f-fd33-7e51-8a83-360ba2f8d665` owns the live site-style
  conversation with Nate: visual comparisons, unresolved style choices, Styles
  Kit reconciliation and style-only derived-output proof.
- BOSS task `019ffe53-6243-73a2-9d75-e1a072cd07ce` continues the other lanes:
  content/release integration, commerce and Shopify groundwork, product-imagery
  supply/admission, independent certification, preview/release sequencing and
  cross-lane custody.
- The Styles task does not gain content/claim, product-image admission,
  Shopify, Git, deploy, production or client-contact authority from this split.
  BOSS consumes only explicitly recorded decisions and certified outputs through
  the existing checkpoint/packet/receipt boundary.
- Already settled style decisions remain closed: pale-blue continuity with
  selective hairlines; `MENU / CENTRED WORDMARK / CONTACT`; Home as the visual
  exception; and Our Story keeping its pair hero while removing portrait
  placeholders. Page-header grammar and default editorial-section composition
  remain with the Styles task until Nate decides them there.

## Protected baseline

- Certified preview: <https://maplemoonbuild20260813-m49nihfds-handtomouses-projects.vercel.app>
- Immutable preview deployment: `dpl_BAMceRFCmxKYpq7bz3GHQZ2qZuKc` (`preview`, `Ready`)
- Frozen production token: `7vjf2m50b`
- Frozen production deployment: `dpl_G2LER2awaqyFtGRCcTserXbNynct` (`production`, `Ready`)
- Photography truth: **5 wired heroes / 14 eligible V9 frames = 36%**
- Production alias movement: **NOT AUTHORISED**
- Client contact: **NOT AUTHORISED**

## High-confidence execution completed in this pass

| Item | Result | Evidence |
|---|---|---|
| Create one Boss execution ledger | **DONE** | This file; non-overwriting recovery checkpoint at `_wip/checkpoints/MAPLEMOON-BOSS-EXECUTION-LEDGER-20260816T215029/CHECKPOINT.md`. |
| Reconfirm protected release inputs | **PASS** | `shasum -a 256 -c _wip/evidence/minimum_release_dry_run_20260816T203628/input-hashes.sha256` returned OK for all 8/8 inputs. |
| Reconcile active locks | **PASS** | `LOCK_MANIFEST.json`: 73 locks, 73 released, 0 non-released. |
| Reconcile dirty-tree boundary | **PASS / LEAVE UNTOUCHED** | Branch `fix/trailing-slash-and-w1e-assets-20260812`, HEAD `b704ce0`; three tracked modified paths and 3,649 untracked paths were inventoried only. No staging, cleanup, commit or source mutation occurred. |
| Define derived-release boundary | **DONE FOR PLANNING** | Exact boundary below; implementation remains gated by the missing decision record. |

## Source custody and dirty-tree boundary

The following tracked changes pre-date this pass and are protected inputs, not
cleanup targets:

- `_wip/homepage_real_1_lead_photo.WIP.html`
- `_wip/stockists.WIP.html`
- `scripts/build-maplemoon-wip-preview.py`

The large untracked set contains deploy copies, evidence, media-review material,
design-system work and other user/task outputs. This pass did not classify them
as disposable and did not add, remove, stage, ignore or alter them.

The current eight-input pin set is:

| Input | SHA-256 | Mode |
|---|---|---|
| `_wip/homepage_real_1_lead_photo.WIP.html` | `423184b66a18a2e1eb44bf547b6392ef1bc26be982309846c949c4e971251c04` | read-only |
| `_wip/shop.WIP.html` | `b444b0da4f5778f7434c6343854e3cdf48d1a88b038c7863a2ef1d46b5e0cbac` | read-only |
| `_wip/our-story.WIP.html` | `6beef3f9449804e800ad7883c311c957637d12a5e05c69beb7ed912e49b36e23` | read-only |
| `_wip/carob-story.WIP.html` | `c6b545bc4983960e4ce41bc0bc3a4bdf6ae8432dd5fdbc8e6c26980592d3f2d0` | read-only |
| `_wip/faq.WIP.html` | `3b1156324e7c9156b995bafdc036a28da83be5e7890ba12cf8d14868f49cdcc4` | read-only |
| `_wip/stockists.WIP.html` | `dbff73357e3425005db5fc7f0e0e589ed8a70b9dbcb62f31cab667cf37409f37` | read-only |
| `scripts/build-maplemoon-wip-preview.py` | `803c439e0e937309b7ada0c3f886983908c3cc6aed64f92e38c57fd656707808` | private-review builder; read-only |
| `/Users/handtomouse/maplemoon_build_20260813/pure-carob-bar.html` | `015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65` | frozen external input; read-only |

## Seven-workstream status

| # | Workstream | Done | Still needed | State |
|---:|---|---|---|---|
| 1 | BOSS coordination and custody | Certified preview, immutable production identity, 73/73 locks released, dry-run and visual audit complete. | Nate's literal decision record; checkpointed non-overlapping successor packets. | **BLOCKED ON AUTHORITY** |
| 2 | Photography and asset readiness | Native-dimension scratch prep and structural mask/PSD checks; frame 73 review and pair-hero feasibility. Dedicated product-imagery supply task `01a00dec-ea17-7923-8065-4a53f0970908` launched with Bites first. | Photography task continues Frame 23/V9 work. Product lane must finish inventory, source-fidelity review and prompt/cost dry run before any generation. | **ACTIVE / APPROVAL-GATED** |
| 3 | Product-image integration | Powder pile is the sole GO/KEEP replacement; current bindings are preserved. Existing Bite/Eclipse files have been located. | Existing Bite files remain candidate, rejected or review-only. Require exact SKU identity, source hash, Nate live-use approval and output proof before any site wiring. | **SUPPLY LANE ACTIVE / INTEGRATION HOLD** |
| 4 | Visual system and page refinement | v0.3.1 baseline, native 200%, shared header/cart runtime and v0.4 planning evidence complete. Fresh 21-case route audit complete. | Approved implementation slice; five-route mobile header correction; Our Story media decision. v0.4 remains guidance only. | **PARTIAL / HOLD** |
| 5 | Content and catalogue truth | Lane E/F certification; CAT 24/24; exact approved FAQ boundary preserved. | D01-D06; six-bar/enquiry-only release transform; 35 unknown content cells, 12 image approvals, Woo facts later. | **PARTIAL / HOLD** |
| 6 | Interaction, commerce and responsive QA | Private-preview drawers, cart lifecycle, keyboard, motion, native 200% and overflow checks pass. | Enquiry-only release or separately authorised real commerce; repeat QA on the successor. | **PRIVATE PREVIEW COMPLETE** |
| 7 | Independent certification and release | Current preview Ready; authenticated byte equality and production freeze proven. | Certify the decision-derived successor; preview deploy; separate explicit production instruction. | **PREVIEW COMPLETE / PRODUCTION HOLD** |

## Fresh visual release blockers

1. Shop, Our Story, Carob Story, FAQ and Stockists have no visible mobile Menu at 390.
2. Shop, Our Story, Carob Story and Stockists have painted wordmark/cart overlap.
3. Our Story exposes two founder portrait placeholders and lacks a `<main>` landmark.
4. Stockists exposes internal/review/count state.
5. Shop exposes 22 products and mock commerce; the recommended minimum is six enquiry-only bars.
6. FAQ has drifted from the exact approved caffeine question and answer.

Pure related imagery, Carob Story body/blend, FAQ's mobile chip scroller and the
Stockists finder composition have passed; they are not repair targets.

## Product-imagery supply lane

Nate requested a separate product-imagery lane. Projectless Codex task
`01a00dec-ea17-7923-8065-4a53f0970908` is active and owns read-only product-image
intake, source-fidelity review, a ranked replacement list, dry-run prompts and
costs, and review HTML. It must not generate or edit imagery until Nate approves
the exact prompt and cost. It must not wire the website, write either MapleMoon
repository, run Git, send, upload, publish, deploy or treat a candidate as
approved.

Bites priority is Pecan Nut, Salted Almond, Hazelnut and Goji Ripe Eclipse Bites,
Salted Caramel Fudge and the five-item Eclipse Bite bundle. Goji Carob Bites and
Coconut Carob Bites remain identity-held until their exact source naming is
reconciled. Existing Bite imagery is available for review, but its current
authority is rejected, candidate or review-only, not launch-approved. The
existing photography task retains Frame 23/V9 grading, masks, pen paths and
master custody, so the two lanes must not modify each other's outputs.

Nate later selected **OpenAI GPT Image 2** for proposed AI image operations,
superseding the lane's initial Fal dry-run proposal. On 2026-08-17 Nate chose
**A — one-image pilot**: BOSS may present one exact prompt and, only after Nate
approves that prompt, run one image-generation call for review. This is a
bounded override of the earlier exact-dollar-cost gate for that single call;
cost remains `UNKNOWN`, no retry or second image is authorised, and the output
remains unapproved/unwired until separate review. Elixir matching remains
deterministic, source-pixel and non-AI.

The selected pilot subject was **the isolated five-item Eclipse Bite bundle**,
but Nate rejected the presented five-image reference set on 2026-08-17 as
wrong. The hash-pinned rejected cut-outs are therefore **not authorised even as
geometry references**. No generation call occurred. The pilot is reset to
`HOLD — CORRECT SOURCE IMAGES REQUIRED`; its former prompt is withdrawn and no
generation, retry, substitution or website wiring is authorised until Nate has
visually approved a corrected reference sheet and then approved a replacement
exact prompt.

Nate then identified the missing earlier ChatGPT imagery at
`/Users/handtomouse/UFC/spins/maplemoon_bites_moodboard_export_20260516/output_PNG`.
This May archive contains named main, side, top, group, close and interior views
for the Pecan, Salted Almond and Hazelnut Eclipse Bites, Salted Caramel Fudge,
and related Goji Coconut Bar imagery. It is the correct **known AI candidate
source for review**, replacing the mistakenly presented rejected cut-outs and
the unrelated August Fal bundle refinements. It is not yet an approved five-SKU
bundle binding: the current governed bundle names Goji Ripe, while this archive
names Goji Coconut Bar. No new generation or website use is authorised until
that identity is resolved and Nate approves the exact selected inputs/prompt.

Two non-overlapping product-image pilot lanes were opened on 2026-08-17:
`raw_product_pilot` prepares a one-image OpenAI dry run from one real May
photoshoot frame, and `may_ai_bundle_pilot` prepares a one-image OpenAI bundle
dry run using only the May ChatGPT archive. Both are prompt/input/cost/QA lanes
only. Neither may generate, edit sources, wire the website, deploy, publish or
contact the client until Nate separately approves its exact call.

Both dry runs closed without generation. The raw lane selected real frame
`DSC01563.jpg` (SHA-256 `9e8705ff69d609a6b24348f3d03fa8081b2385e9f7343dcb5f829826003c6284`)
as a pecan-topped bite candidate and estimated a medium 1024-square OpenAI call
at US$0.053 output plus inputs, with a US$0.10 approval provision. The May-AI
bundle lane pinned four clear 2160-square product references but is `HOLD` on
the fifth: the archive contains `goji-coconut-bar-main.png`, not a named Goji
Ripe Eclipse Bite. Its conditional five-input call is approximately US$0.23
with a US$0.30 approval cap. No call may run until Nate resolves that identity
and approves the exact relevant prompt/cost.

Nate then confirmed that the May archive's Goji Coconut image is the correct
fifth bundle identity and explicitly authorised both one-call lanes. Exactly
two built-in OpenAI image calls ran, once each, with no retry:

- raw-photo pilot: `/Users/handtomouse/.codex/generated_images/019ffe53-6243-73a2-9d75-e1a072cd07ce/exec-f4a1114b-7caa-4eb8-8cb2-4f29834a250c.png`,
  1254×1254 PNG, SHA-256
  `cdecaabc6c5b46ba18b124103591068738416045842f20c407247c1e4c85d52a`;
- May-AI five-item bundle pilot:
  `/Users/handtomouse/.codex/generated_images/019ffe53-6243-73a2-9d75-e1a072cd07ce/exec-d2bd1b23-5418-4078-86fb-e7bfe01ac350.png`,
  1254×1254 PNG, SHA-256
  `edcf1208872b22f042bd04330c08372e674b8fc95ba594e43fcd984086073a1e`.

Both outputs remain review-only, unapproved and unwired. No further generation,
site integration, deploy or client action is implied.

Nate's visual review then rejected both pilots as usable product imagery. The
raw-photo pilot is **REVISE**: relative to `DSC01563`, its bite is too tall,
round and enlarged, the pecan is oversized and over-cleaned, and the handmade
coating/base texture has been smoothed into a factory-like form. The five-item
bundle is **REJECT / RETRY REQUIRED**: the Goji bar is materially underscaled;
the rear Hazelnut and Salted Almond Eclipse Bites read as near-identical; the
Salted Caramel Fudge looks synthetic; all three domed bites are too uniform;
and the overall surface, lighting and arrangement are overly polished. Any
replacement prompt must use the real May photoshoot raws as physical-scale,
silhouette, topping, cut-face and texture references alongside the May AI
identity references. Fudge must follow the real side-angle family
`DSC01567`/`DSC01572`/`DSC01576`. Exact Almond-versus-Hazelnut raw binding must
be proven before generation rather than guessed. The first two calls are spent;
no retry is authorised until Nate sees and approves a new exact prompt and cost.

The corrected retry dry run is now source-locked and awaiting that approval.
Call 1 uses only full-resolution `DSC01563.jpg` as the raw edit source and has a
US$0.10 approval provision. Call 2 uses the five named May AI main images for
SKU identity plus full-resolution `DSC01543`/`DSC01561`/`DSC01564` for real
Eclipse-family form and `DSC01567`/`DSC01572`/`DSC01576` for real fudge form;
its approval provision is US$0.35. Combined two-call cap is US$0.45, with no
retry. The tool does not expose the exact billed amount before execution.

Nate approved those exact prompts and the US$0.45 cap. The corrected run used
exactly one successful image call per lane and no image retry. The first bundle
submission was rejected by tool validation before generation because eleven
reference paths exceeded the five-path limit; the same source pixels were then
assembled deterministically into two labelled reference sheets and the approved
prompt was run unchanged. Outputs:

- corrected raw-product candidate:
  `/Users/handtomouse/.codex/generated_images/019ffe53-6243-73a2-9d75-e1a072cd07ce/exec-8e1f6737-7c4c-4c54-acd5-05ae0b3cf9e1.png`,
  1023×1537 PNG, SHA-256
  `17b1b74c103edf0a409250d97be8ac38fc4c242ecd521ec204ac9d880d12447a`;
- corrected five-product bundle candidate:
  `/Users/handtomouse/.codex/generated_images/019ffe53-6243-73a2-9d75-e1a072cd07ce/exec-82159e46-662a-4e9b-af90-0e2c68af52ac.png`,
  1536×1024 PNG, SHA-256
  `b7d669130ef5c1482b4d3655e1407885087c884089cfdbadd7b0b5d0c5abdba1`.

Review disposition remains bounded. The raw candidate is materially closer to
`DSC01563` and is ready for Nate's visual decision. The bundle now has exactly
five items, a correctly substantial Goji bar and substantially more believable
raw-referenced fudge, but the two crumb-topped Almond/Hazelnut bodies still read
too similarly at a glance. It therefore remains **HOLD / NOT ADMITTED** pending
Nate's judgement; no further image call, website wiring or launch admission is
authorised.

The subsequent 15-point visual self-critique keeps **both** corrected outputs on
HOLD. “Closer to DSC01563” is not source-pixel approval: the single image still
regenerates product micro-geometry, changes the colour/light treatment and uses
an incompatible portrait catalogue crop. The bundle still fails immediate
Almond-versus-Hazelnut recognition, mould-like dome variation, believable
relative scale, raw fudge irregularity and non-synthetic Goji surface truth.
Neither image is safe for catalogue admission or website wiring.

## Deterministic derived-release boundary

The next mutating phase must not overwrite the six WIPs, the private-review
builder or the frozen Pure source. After the decision record exists:

1. checkpoint every exact writable output before first write;
2. create `scripts/build-maplemoon-minimum-release.py` as the sole policy transform;
3. pin all eight read-only inputs and the decision receipt;
4. apply only recorded D01-D05 transformations in memory;
5. write a separate release-candidate directory;
6. add the five-route header, Our Story semantics and FAQ target-size corrections only within the derived output;
7. prove the eight inputs and all held media remain byte-identical;
8. stop before deployment on any unexpected hash, occurrence count, claim, asset, route or runtime result.

### Admitted chrome/accessibility slice — D05 decoupled

The Styles Kit task completed the approved read-only reconciliation: the six
route hashes match this ledger, while the existing repository design-system
contracts are stale and their checker remains `HOLD` on six baseline hashes.
Nate then replied `execute` to the current ranked site-design-styles sequence
and clarified `dont worry about claims in this chat - just site styles`. BOSS
therefore admitted a reversible style-only derived output whose raw
reconstruction gate requires all customer copy and D05-owned surfaces to remain
byte-identical. D05 stays wholly in this Boss lane and is no longer a dependency
for the style slice.

The exact issued packet is
`docs/orchestration/packets/MAPLEMOON-STYLE-CHROME-DERIVED-20260817T134139.md`
(SHA-256 `d9c0297df589071f76abf35a18f19cd0a682517332101060688ee3e4a9c04fe6`),
bound to worker thread `019ff65f-fd33-7e51-8a83-360ba2f8d665`. It is limited to
`MM-COMP-SITE-HEADER-01`, the applicable
`MM-COMP-SKIP-LINK-01` repair, and approved `NAV-001`–`NAV-003`, `CMP-009` and
`RESP-004`. Treat `NAV-004` and `RESP-005` as proof gates only. Preserve the
Home/Pure working pattern, the Home visual exception, the 70 px mobile header,
44 px Menu control, centred intact Maple Moon wordmark and truthful Contact
action/reserved balance; D02-A means no cart.

Explicit exclusions remain: FND token adoption; `CMP-001`–`CMP-008` and
`CMP-011`–`CMP-017` appearance adoption; `RESP-007`/`RESP-008` page-header or
media work; `MEDIA-002`–`MEDIA-005`; all fog values; font delivery; section
rhythm; Shop polish; overlays; footer change unless separately named; and any
blanket v0.4 adoption. This authority also excludes Shopify. Do not mutate the
six WIPs, sealed Styles Kit, Git, production or client state.

The first 2026-08-17 fog comparison did not visibly render its governed media
and is invalid as approval evidence. A corrected self-contained review proof is
`/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/maple-moon-balanced-fog-proof.html`
(SHA-256 `d3de0d591f7077cb6f6a013b4328c6ee1f92d314556d87e35c0e207ba653e36b`).
Its governed media visibly renders at desktop 1440 and mobile 390; controls
switch correctly and measured root/internal overflow is zero. After reviewing
that corrected visible proof and its longer desktop dissolve, Nate selected
**Medium / Balanced** at 2026-08-17 20:30:12 AEST. `FOG-002` is therefore
**APPROVED BY NATE FOR PLANNING** as: 20% pale-blue veil; 48% clear-core target;
26% general falloff target; desktop media begins at 27% of header width with an
intentionally longer 43%-of-media-frame left dissolve behind the headline.
Other desktop edges and mobile retain the Medium treatment shown in the proof.
This resolves only the Nate design-choice hold. Real route/media/runtime
implementation proof remains required, and no website, sealed Styles Kit,
Shopify, Git, deploy or production authority is granted.

### Style-chrome R1 failure and R2 correction admission

The first style-only derived build passed its reversible build boundary but
failed the first required measured-390 browser gate and stopped correctly. The
R1 receipt is
`docs/orchestration/reviews/MAPLEMOON-STYLE-CHROME-DERIVED-20260817T134139.json`:
all seven routes reported at least one skip/control/overflow failure, including
32 px task-owned root overflow on Our Story. No wider, interaction, native-200,
preflight, deployment or production action ran; all source and sealed-kit pins
remained exact. R1 is a permanent failed evidence artifact and is not a release
candidate.

Nate explicitly approved one bounded correction. BOSS issued
`docs/orchestration/packets/MAPLEMOON-STYLE-CHROME-CORRECTION-R2-20260817T140018.md`
(SHA-256 `41b7a0520e705c9316377ed3775f98d116a0fcdba8db08ace13f44b45cd69606`)
to the same worker thread. It requires a new non-overwriting builder/output,
baseline-versus-derived diagnosis of every failed class, full 35-case,
interaction, native-200, preflight, source-pin and receipt gates, and preserves
the exact style-only/no-copy/no-route-design/no-deploy boundary.

### Style chrome R2 closure disposition — 2026-08-17 15:11 AEST

R2's focused 390, complete 35-case browser/interaction, native-200 and
reversible-manifest gates passed, but its mandatory unchanged anonymous
preflight failed on inherited content outside style authority. BOSS decision:
close the current R2 packet with a truthful failed-required-check receipt, do
not promote it, preserve all green style evidence, and move the content/source
correction into a new non-overwriting BOSS-owned integration successor. Exact
decision: `docs/orchestration/packets/MAPLEMOON-STYLE-CHROME-R2-HOLD-DISPOSITION-20260817T151159.md`.

Closure completed exactly: receipt
`docs/orchestration/reviews/MAPLEMOON-STYLE-CHROME-CORRECTION-R2-20260817T140018.json`
SHA-256 `120973a7505925520de7a70b33487651d7463b3d3f3e99edf36a0dc877e32d2a`;
completion returned literal FAIL exit 3 once; promotion was not run. Green
evidence remains focused 390 7/7, browser 35/35 plus interactions 28/28,
native-200 14/14, reversible manifest 7/7 and close pins 23/23. Status remains
HOLD pending the separately checkpointed content/integration successor.

## Decision gate — base approved / D05 exceptions in grill

Nate replied `execute` immediately after being shown this exact line in task
`019ff65f-fd33-7e51-8a83-360ba2f8d665`. It is therefore approved exactly as
written and nothing broader:

```text
D01=A; D02=A; D03=B; D04=A; D05=B;
D06-PURE=REJECT; D06-SPICED=REJECT;
OUR-STORY=KEEP CURRENT PAIR HERO + REMOVE PORTRAIT PLACEHOLDERS;
MOBILE-HEADER=MENU / CENTRED WORDMARK / CONTACT
```

This approval does not authorise production, client contact, extra media,
blanket v0.4 promotion, numeric fog, font, Shopify or sealed Styles Kit output
mutation. The current grill-me claim choices are later explicit D05 exceptions
to the earlier D05-B recommendation. Nate's later global instruction is: keep
all remaining Woo claims, do not let unresolved claim evidence block launch,
and flag the issues after production is live. This closes the claim-disposition
grill; it does not itself authorise production alias movement or client contact.

### Grill-me decision log — 2026-08-17

| Decision surface | Nate decision | Release qualification |
|---|---|---|
| Global Woo claim rule | **KEEP AND SHIP** all remaining source claims; stop asking claim by claim. | Unresolved substantiation, classification, labelling and comparative-claim issues do **not** block launch. Preserve them in the post-live issues ledger for a consolidated Carli/Dylan review. This is a content disposition, not production-deploy or client-contact authority. |
| Home testimonials | **KEEP** all three anonymised quotes. Remove only visitor-visible internal process labels such as `consent pending`, `WIP quotes`, `noindexed` and `testimonial selection pending before go-live`; use clean customer-facing review framing. | Do not de-anonymise, invent consent, rewrite a quote or remove the testimonial section. The withdrawn R3 removal draft was never dispatched or phase-started. |
| Home founder cards | **KEEP** both Carli and Dylan cards. Remove only the visitor-visible sentence that founder portraits/final story details remain in review. | A separate photography selection workstream will present smiling Carli and smiling Dylan RAW options for Nate to choose. Until then, the cards remain structurally present; no agent may invent a portrait, bind a photo or change the accepted pair hero. |
| Home `Why carob` tabs | **A — show only the completed `Why carob` content.** Remove the disabled `Nutrition` and `Taste & Feel` future tabs and the visitor-visible pending-review sentence. | Do not invent nutrition/comparative values or expose unfinished capability. This changes the release presentation only; the omitted future topics may return under a later approved content packet. |
| Woo CSV authority | **YES, bounded** — exact export SHA-256 `eeea19fd89b30052bd4c4cf28519f56f1195e4595c92485fb186a66719e6b114` is authoritative for product hierarchy, variation names, prices and stock. | For explicit overlapping customer-facing copy, Carli's later direct Google Doc wins. Shipping settings, checkout configuration and final assortment remain separate decisions. |
| Launch commerce backend | **B — Shopify.** The Woo export is migration/source data; WooCommerce is not the launch checkout destination. | Shopify store ownership/access, plan, payment provider, shipping/tax settings, product import and end-to-end test-order evidence remain required before checkout can be called live. This does not itself authorise store mutation, purchasing, deployment or production. |
| Shopify site architecture | **A — native Shopify Online Store 2.0 theme.** Port the approved Maple Moon design into governed Shopify sections and use Shopify's native products, cart, checkout and admin. | Do not ship a split Vercel/headless storefront. The current derived site remains the visual/content source and review reference; conversion requires a separate checkpointed theme-build lane and Shopify runtime certification. |
| Shopify theme foundation | **Use the purchased Etheryx theme.** Shopify receipts prove Etheryx was purchased for store `maplemooncarob` on 18 February 2026 for `$502.29 AUD`. | The licence is store-specific. Do not replace it with Dawn or copy it into another store without a separate licence/transfer decision. Exact installed version, preset, update state and current customisations still require read-only admin inspection. |
| Shopify build environment | **CORRECTED A — work in the existing `maplemooncarob` store on an unpublished duplicate of Etheryx while the current published theme stays live.** | Theme code, templates and theme settings must remain confined to the unpublished duplicate until a separate publish decision. A second development store is not the default because the paid Etheryx licence is tied to this store. |
| Shopify live-store staging boundary | **Theme-local work may proceed in the unpublished duplicate; store-global changes remain separately gated.** | Products, collections, navigation, files, metafields, apps, markets, payments, shipping, tax, domains and customer/order settings can affect the published store even when editing an unpublished theme. Inventory imports and checkout tests require backups, exact writable scope and their own checkpointed packet. |
| Shopify ownership | **A — Maple Moon is the final store owner; HandToMouse works through Partner/collaborator access.** Maple Moon owns billing, customer/order data, payment configuration and the production domain. | Verify the current admin owner before work. If ownership presently differs, transfer is a later explicit gate; HandToMouse must not remain merchant of record, billing owner or long-term custodian of customer data. |
| Shopify launch catalogue scope | **B — publish all 24 catalogue products at launch.** Import and expose the complete governed 24-product catalogue rather than holding incomplete-image products as Draft. | This approves product visibility only. It does not admit fake, wrong-product, rejected or review-only imagery; the exact fallback treatment for products without approved imagery remains a separate decision. Price, variant, inventory and sale-state mappings still require verification against the authoritative export. |
| Shopify missing-image treatment | **A — use a clean image-free product layout.** Products without approved imagery remain publishable with real name, description, price and options, but no placeholder promise and no candidate/review image. | Do not show `image coming soon`, fake packaging, wrong-product imagery or unapproved generations. A later approved asset may replace the image-free state through the media admission lane. |
| Copy-source precedence | **A — Carli's direct document wins for explicit customer-facing copy; Woo supplies catalogue structure, prices and stock.** | `Core Website Pages` was shared by Carli and current revision 760 was modified by Carli on 22 Jul. The elixir section was absent in revision 491 (13 May) and present in Carli's revision 742 (19 Jul). Both elixirs therefore use exact `Handmade in Brunswick Heads`; Woo's conflicting Byron Bay line is stale for this field. |
| Free-shipping threshold | **B — launch copy states free shipping over $99.** | Carli's document repeats `$99` across the product copy; the isolated `$150` occurrence is treated as stale. This decides displayed copy, not Shopify configuration or checkout behaviour. |
| Displayed shipping line | **A — show `Orders ship Monday and Tuesday via Australia Post. Standard shipping $16.95.` plus free shipping over $99.** | This is approved launch copy from Carli's document. Shopify configuration and checkout calculation must still match before real commerce is enabled. |
| Stockist publication | **B — publish all 204 authoritative stockist entries as supplied.** | Seven entries remain incomplete (seven missing postcode; three of those also missing address). Publish them without invented details and retain the exact omissions in the post-live Carli/Dylan issues ledger. |
| Stockist incomplete-data presentation | **A — remove customer-visible internal status language and review controls.** Remove `WIP`, `preview only`, `need client confirmation`, `before launch`, the `Needs confirmation` filter and equivalent process labels. | Keep all 204 entries. Where the source lacks publishable location fields, show only the neutral customer-facing text `Location details unavailable`; do not infer or invent addresses, postcodes, states or store metadata. |
| Stockist map presentation | **B — keep the visual map as a clearly labelled non-interactive directory aid.** | Remove disabled location and pagination controls that imply unavailable functionality. The map must not claim pins, distances, directions, store hours, geolocation or live interaction; real map capability remains held until sourced coordinates and runtime evidence exist. |
| Home stockist finder | **B — embed a functional stockist search on Home.** Replace the disabled search/List/Map controls and representative placeholder cards with a real search surface backed by the same authoritative 204-entry directory used by the Stockists page. | It must not fork or hand-copy the dataset, invent missing details or imply live mapping/geolocation. Results use the approved neutral incomplete-data treatment; the full directory remains the canonical extended view. |
| Product-copy treatment | **A, revised** — use Woo copy as the factual source, clean clear typos and duplicated shipping/wholesale boilerplate, and preserve all source claims. | Do not silently rewrite or remove claims. Record unresolved evidence/compliance issues for post-live review. |
| Spiced Elixir `Anti-Inflammatory` | **KEEP** in both current Woo occurrences. | Post-live flag: substantiation and Carli/Dylan content review. |
| Finished-product caffeine claims | **KEEP** across the 15 affected Woo products, including `Caffeine Free`, `Caffeine Free Alternative` and `without the caffeine buzz`. | Post-live flag: substantiation and Carli/Dylan content review. The separate FAQ carob-only wording remains approved. |
| `healthy, clean…no nasties` | **KEEP** across the four Eclipse Bite flavours, Salted Caramel Fudge and Eclipse Bite Bundle. | Post-live flag: wording/substantiation and Carli/Dylan content review. |
| Elixir `Night Time Alternative` | **KEEP** on both Plain and Spiced Carob Elixirs. | Post-live flag: use-occasion versus therapeutic boundary and Carli/Dylan content review. |
| Elixir market uniqueness | **KEEP** `One of its kind` and `one of the only Caffeine Free Night Time alternatives on the Market` on both elixirs. | Post-live flag: comparative-claim substantiation and Carli/Dylan content review. |
| `No Added Sugar` | **KEEP** across six individual bars, three Carob Crescents and Carob Powder. | Post-live flag: the Woo export lacks per-100 g sugar-condition evidence and nutrition substantiation. |
| `Sugar Free` | **KEEP** on the Organic Vegan Bundle of Carob Bars (6x90g) and Premium Organic Carob Powder Roasted (300g). | Post-live flag: the Woo export lacks final-product total-sugar values and nutrition-panel/testing substantiation. |
| `Gluten Free` | **KEEP** across six individual bars, four Carob Crescents, the bar bundle and Carob Powder. | Post-live flag: manufacturing, ingredient and cross-contact evidence for the no-detectable-gluten condition. |
| Organic wording | **KEEP** `Organic`, `Organic Ingredients` and `certified organic` wording across the 21 affected food products. | Post-live flag: supplier/certification evidence for each ingredient and whole-product representation. |
| `Vegan` | **KEEP** across the 21 affected food products. | Post-live flag: formulations, processing aids, supplier inputs and manufacturing cross-contact. |
| Carob Powder `perfect for kids` | **KEEP** the phrase within `Caffeine-free & stimulant-free (perfect for kids + evenings)`. | Post-live flag: age suitability, serving guidance, formulation and allergen/cross-contact evidence. |
| Carob Powder nutrient/antioxidant claim | **KEEP** `Rich in calcium, magnesium, potassium, and antioxidants`. | Post-live flag: final-product nutrition panel/testing and antioxidant substantiation. |
| Carob Powder gut/nervous-system claim | **KEEP** `Gut-friendly, gentle on the nervous system`. | Post-live flag: food-health relationship, scientific and NPSC evidence where required. |
| Carob Powder `stimulant-free` | **KEEP** both Woo occurrences. | Post-live flag: final-product formulation or analytical evidence for the broader absence claim. |
| Bath Salts `relax and rejuvenate` | **KEEP** `will help you to relax and rejuvenate at the end of your day`. | Post-live flag: cosmetic-versus-therapeutic classification and advertising review. |
| Bath Salts `healing products` | **KEEP** `healing products that honour your insides, outsides and the Earth`. | Post-live flag: TGA classification, lawful supply/ARTG status where applicable, evidence and advertising review. |
| Bath Salts magnesium-bath effects | **KEEP** `Benefits of Magnesium Baths: Eases stress, inflammation, muscle aches and pains.` | Post-live flag: TGA classification, lawful supply/ARTG status where applicable, product-specific evidence and advertising review. |
| Bath Salts `detoxifying properties` | **KEEP** `They have detoxifying properties`. | Post-live flag: defined claim meaning, TGA classification, lawful supply status where applicable and product-specific evidence. |
| Bath Salts skin-health claim | **KEEP** `known to improve skin health`. | Post-live flag: cosmetic-versus-therapeutic classification, product-specific evidence and advertising review. |
| Bath Salts magnesium-restoration claim | **KEEP** `restore magnesium levels in the body`. | Post-live flag: TGA classification, lawful supply status where applicable, product-specific evidence and advertising review. |

Carli and Dylan are **not to be contacted yet**. Nate wants one consolidated
post-live issues review. The claim disposition is now closed as **KEEP AND
SHIP / POST-LIVE FLAG**. Production alias movement remains separately frozen
until Nate gives the explicit production instruction; this claim rule is not
that instruction.

## Shopify admin read-only audit — 2026-08-17 AEST

Nate authenticated directly to `maplemooncarob`; no password or recovery
credential is recorded here. The audit was read-only and made no Shopify
change.

| Surface | Verified current state | Disposition |
|---|---|---|
| Access and ownership | `hello@handtomouse.org` / Nate Don is active and is both Organization owner and Store owner. It is the only listed user. The store sits inside `HANDTOMOUSE PTY LTD`; secure sign-in is not required. | Full working access is confirmed. Before launch, transfer merchant ownership to Maple Moon and retain HandToMouse as collaborator; require a secure sign-in method. |
| Plan/store type | Custom plan; **Development store / client-transfer store**. Shopify says plan change is unavailable until the store is transferred to the client. | Real payments and launch remain blocked until the transfer and client plan selection are explicitly approved and completed. |
| Theme | The sole current theme is named `Ethereal`, theme ID `154500595909`, added 18 Feb; version `1.6.0` is available. No unpublished working duplicate was visible. Purchase email/ledger calls the paid theme `Etheryx`. | Reconcile `Ethereal` versus `Etheryx`; create a non-published duplicate before any theme mutation. Do not update the current theme in place. |
| Storefront/domain/SEO | Storefront password protection is on. Only `maplemooncarob.myshopify.com` is connected and primary. Home SEO title, meta description and social-sharing image are unset. | Keep password protection through review. Connect the Maple Moon production domain and complete SEO/social assets only in the launch-settings lane. |
| Catalogue | 23 Shopify products: 13 Active, 10 Draft; 22 show zero stock and the gift card does not track inventory. Current list contains stale gift/bundle records and does not match the governed 24-row launch catalogue. | Do not patch ad hoc. Rebuild/import from the pinned Woo export plus Carli precedence rules, with backup, mapping proof and no unapproved imagery. |
| Payments | Development-store test payments only. Shopify Payments setup is incomplete; PayPal is inactive. | Launch blocker. Configure after client transfer and business-owner approval, then prove test orders/refunds before production. |
| Shipping | One profile/location. Australia: `$11` standard below `$100`, free at `$100+`, `$15` express. International: `$20` for 27 configured countries, but those countries are not in an active market. | Conflicts with approved customer copy: `$16.95` standard and free over `$99`. Reconcile checkout rates to the approved line before launch; keep international disabled until explicitly scoped. |
| Markets | Australia is the only active market. | Appropriate minimum-release boundary unless Nate/Maple Moon explicitly adds markets. |
| Tax/customs | Australia is **not collecting** tax. All 50 existing variants lack country of origin and HS codes. | Client/accountant decision required for GST registration/collection. Complete customs data before international launch. |
| Fulfilment | One active location, currently the HandToMouse Bondi location. Local delivery and pickup are off. | Replace with Maple Moon's true fulfilment/legal location during ownership/setup, not during theme work. |
| Policies/privacy | Return rules, refund policy, terms, shipping policy and legal notice are unset; Shopify automated privacy policy is published. Cookie/opt-out surfaces are automatic for the active AU market. Shopify Network Intelligence is enabled. | Launch blocker for missing policies/contact information. Obtain client-approved legal copy and privacy/data-use decision before opening the store. |
| Checkout | Phone or email accepted; account sign-in not required; email/SMS marketing opt-ins are hidden; abandoned-checkout email is enabled for email subscribers after 10 hours; tipping is off. | Preserve until an explicit checkout-settings packet; verify all customer-facing templates and consent behavior before launch. |
| Notifications/apps | Sender email is `hello@handtomouse.org`. Flow is the only listed installed app; Online Store and Agentic are present as sales channels. | Replace sender with a Maple Moon-owned authenticated domain address before launch; keep app surface minimal and review Flow before enabling automations. |
| General defaults | Store currency is AUD and units are metric, but the store time zone is Eastern Time (US & Canada). | Correct to Sydney/Australia in the launch-settings lane. |

## Shopify launch decision register — Nate approvals 2026-08-17

These decisions were made one-by-one after the read-only admin audit. They are
implementation authority only when cited by a later checkpointed packet. They
do not by themselves authorize a Shopify mutation, purchase, ownership
transfer, product import, theme publish, domain change, password removal,
production movement or client contact.

| ID | Approved decision |
|---|---|
| SHOP-001 | Keep HandToMouse ownership during the unpublished build; transfer to Maple Moon after QA and before paid-plan activation, real payments and domain launch. |
| SHOP-002 | Preserve the current installed theme as a rollback copy; update a second unpublished duplicate to Ethereal 1.6.0 before porting. |
| SHOP-003 | Back up the catalogue; update matching products by stable ID/handle, create missing products, and archive stale extras only after verification. No delete-and-replace migration. |
| SHOP-004 | Launch shipping is Australia only: `$16.95` standard and free shipping over `$99`; express and international remain off until separately approved. |
| SHOP-005 | Shopify Payments is primary; PayPal is permitted only through a Maple Moon-owned account. HandToMouse must not own payout/payment credentials. |
| SHOP-006 | Maple Moon is GST registered. |
| SHOP-007 | Catalogue prices are GST-inclusive customer totals; Shopify calculates the GST component within them and does not add 10% at checkout. |
| SHOP-008 | Shopify fulfillment, shipping labels and returns use Maple Moon's confirmed real dispatch/returns address, not HandToMouse's address. |
| SHOP-009 | Store sender/contact identity uses a Maple Moon-owned `@maplemoon.com.au` mailbox; HandToMouse is not the customer-facing sender. |
| SHOP-010 | `maplemoon.com.au` becomes primary only at the final launch gate after DNS and email continuity proof. Preserve the existing email provider and all MX/SPF/DKIM/DMARC records; change only storefront records needed by Shopify. |
| SHOP-011 | Draft return/refund, shipping, terms, privacy and contact policies, then require Maple Moon approval before publishing; generated boilerplate is not final authority. |
| SHOP-012 | Enable an optional unchecked email-marketing consent control with double opt-in after privacy/sender setup; SMS marketing remains off. |
| SHOP-013 | Checkout requires email; phone is omitted unless a confirmed carrier requirement proves it necessary. |
| SHOP-014 | Guest checkout remains available; customer accounts are optional. |
| SHOP-015 | Track inventory per variant and stop selling at zero. Backorders require explicit product-level approval. |
| SHOP-016 | Back up then archive every product outside the governed 24-product launch catalogue; do not expose the digital gift card or stale gift/bundle records by default. |
| SHOP-017 | The Shopify port reproduces the approved current candidate and shared Styles Kit rules. Any design-gap improvement requires a visual proof and Nate approval before implementation. |
| SHOP-018 | Product imagery uses a controlled hybrid: real/verified identity leads; AI lifestyle and product candidates are allowed, but no generated image launches until product/pack fidelity and Nate approval pass. |
| SHOP-019 | Native-first app policy: install an app only for a proved capability gap after permission, privacy, performance and recurring-cost review. |
| SHOP-020 | Launch with Shopify core analytics only; no Meta, Google Ads or other external advertising pixels. |
| SHOP-021 | Keep Shopify Network Intelligence enabled, disclose it in the approved privacy policy, and retain the no-external-pixel launch boundary. |
| SHOP-022 | Require two-factor authentication for the Maple Moon owner and every collaborator before payments or public launch. |
| SHOP-023 | Commerce certification includes success, failed payment, discount, shipping threshold, tax, inventory decrement, notification, fulfillment, cancellation and refund tests, then one explicitly authorised low-value live order/refund after payment activation. |
| SHOP-024 | Obtain private client approval of a complete integrated store, then use one coordinated launch window for ownership, plan, payments, domain, theme publish and password removal with rollback ready. |
| SHOP-025 | Any critical checkout, payment, price, tax, inventory, shipping, domain, email, mobile or accessibility failure triggers immediate rollback/re-lock, not live patching. |
| SHOP-026 | Store all 204 stockists in Shopify metaobjects as one governed directory source used by Home search and the Stockists page. |
| SHOP-027 | Use Shopify product/variant fields plus governed metafields for ingredients, allergens, weight, usage, certifications and supporting product details; do not use one free-form description blob as the data model. |
| SHOP-028 | Maple Moon must nominate the individual responsible for billing, tax, payouts and account recovery before ownership transfer; do not guess Carli or Dylan. |
| SHOP-029 | Keep calculated delivery dates off until carrier timings are proved; show only the approved Monday/Tuesday dispatch statement and verified Australia Post terms. |
| SHOP-030 | Fulfill orders manually only after packing and adding tracking; do not auto-fulfill on payment. |
| SHOP-031 | Preserve existing Maple Moon email DNS while connecting Shopify; prove mailbox continuity before and after the storefront DNS change. |
| SHOP-032 | Develop through Shopify CLI in a dedicated local version-controlled theme workspace; deploy only to the unpublished duplicate and use Theme Editor only for governed settings. |
| SHOP-033 | Carli and Dylan receive one complete integrated private review after Nate approves desktop/mobile, catalogue and checkout; do not send piecemeal client updates. |
| SHOP-034 | Crawl/export current Woo URLs, preserve matching handles where sensible, and verify 301 redirects for every changed path. |
| SHOP-035 | Do not migrate historical Woo customers or orders by default; retain them in a secured Woo archive unless Maple Moon later proves a business need. |
| SHOP-036 | Import only mailing-list contacts with verifiable marketing consent and preserve consent source/date; all others remain unsubscribed. |
| SHOP-037 | Do not automatically migrate Woo reviews. Keep the three approved anonymised Home quotes; product reviews need separate source/consent admission. |
| SHOP-038 | Theme-controlled pages and interactions must meet WCAG 2.2 AA, including keyboard, focus, contrast, reduced motion, zoom and screen-reader semantics. |
| SHOP-039 | Key mobile templates must pass current Core Web Vitals with responsive media and a controlled script budget. |
| SHOP-040 | Every admitted product image requires exact product/variant identity, source/rights, approval state, crop/scale rules, alt text and responsive-delivery proof. |
| SHOP-041 | Before client review, run automated width coverage plus real Safari/iPhone and Chrome/Android checks across navigation, search, cart, checkout entry, forms and 200% zoom. |
| SHOP-042 | Only an explicit Nate instruction may publish a Shopify theme or remove storefront protection; passing QA is not publish authority. |
| SHOP-043 | Future theme updates run on a duplicate with full regression proof and separate promotion approval; never update live in place. |
| SHOP-044 | After a full backup, import the governed 24 products in a separate gated batch while the store remains password-protected, then test the duplicate theme against real product data. |
| SHOP-045 | Use the current Woo export for build mapping, then obtain and reconcile a fresh stock export immediately before launch. |
| SHOP-046 | Preserve authoritative Maple Moon SKUs/GTINs exactly; duplicate or mismatched identifiers stop that product's import and Shopify must not invent replacements. |
| SHOP-047 | Import compare-at/sale prices only where a fresh source proves a real active sale; do not manufacture discounts. |
| SHOP-048 | Put structured ingredients and allergen information on every food PDP, with a concise allergen statement visible near purchase controls and full details below. |
| SHOP-049 | Keep the shop editorial: product-family navigation plus search and only useful collection filters; no generic marketplace filter sidebar. |
| SHOP-050 | Quick add is permitted only for genuinely simple single-option products; variant products open the PDP for correct selection. |
| SHOP-051 | Use an accessible native Shopify cart drawer plus full cart-page fallback; Shopify is the only source of variant, quantity, price and subtotal truth. |
| SHOP-052 | Use Shopify native predictive search across products and useful content with keyboard/mobile accessibility proof. |
| SHOP-053 | With real commerce connected, the mobile header is `Menu / centred intact wordmark / Bag`; Contact moves into the menu/footer. This supersedes the earlier pre-commerce right-side Contact decision. |
| SHOP-054 | Restore contact/newsletter forms only as real Shopify-backed forms after Maple Moon sender identity, privacy, consent and spam protection are configured. |
| SHOP-055 | Customer enquiries and order notifications go only to Maple Moon-owned mailboxes; HandToMouse receives no customer/order data by default. |
| SHOP-056 | Permit one branded abandoned-checkout email after 10 hours only for consented recipients, after sender/template verification. |
| SHOP-057 | Give every product/key page deliberate titles, descriptions, canonical handling, structured data and approved social imagery; verify redirects and rich-result markup. |
| SHOP-058 | Keep the Home hero video as an intentional Home exception only after final clip approval plus mobile performance, poster fallback and reduced-motion/static proof. |
| SHOP-059 | Treat every governed bundle as its own SKU and stock quantity exactly as supplied by Woo; do not automatically decrement components unless Maple Moon confirms assembled-to-order operations. |
| SHOP-060 | Require verified weight for every variant and governed package dimensions before shipping certification; missing values hold that SKU's checkout proof. |
| SHOP-061 | At ownership transfer, choose Shopify Basic billed monthly; reassess annual billing or Grow only after real sales/staffing evidence. |
| SHOP-062 | Do not add paid POS Pro at launch; use only included basic POS capability if needed. |
| SHOP-063 | No change-of-mind returns for food products; preserve all Australian Consumer Law remedies for faulty, damaged, unsafe, incorrect or misdescribed goods. Final wording still requires Maple Moon approval. |
| SHOP-064 | Exclude wishlist, loyalty, subscriptions, live chat and unsupported decorative ecommerce features from launch. |
| SHOP-065 | Launch retail checkout only; wholesale remains a genuine Maple Moon enquiry path. |
| SHOP-066 | Run a 72-hour active launch watch for checkout, payments, orders, inventory, notifications, redirects, errors and performance, then a two-week review. |
| SHOP-067 | Retain HandToMouse Partner collaborator access only through the agreed launch-support period; Maple Moon remains owner and reviews/removes access afterward. |
| SHOP-068 | Deliver a concise operating guide plus training for products, inventory, orders, fulfillment, refunds, pages, stockists, forms, theme updates and support escalation. |

SHOP-006/007 and SHOP-063 are implementation inputs, not tax or legal advice.
Client/accountant/legal confirmation still owns entity details, registrations and
final policy wording.

The next Shopify lane is read-only: establish the exact store/theme identity,
capture a pinned recovery baseline and reconcile `Ethereal` versus `Etheryx`.
Only after that packet passes may a separate checkpointed mutation packet
duplicate the current theme without publishing it, record the duplicate ID and
prove the current theme and password-protected storefront remained unchanged.

## Ranked next 10 and execution state

| Rank | Next action | Confidence | Gate | State |
|---:|---|---|---|---|
| 1 | Create one Boss execution ledger. | High | none | **DONE** |
| 2 | Reconfirm protected preview/production baseline evidence. | High | none | **DONE (receipt replay)** |
| 3 | Reconcile dirty-tree ownership and locks. | High | none | **DONE (read-only)** |
| 4 | Define the deterministic release-builder boundary. | High | none | **DONE (planning only)** |
| 5 | Record D01-D06, Our Story and mobile-header decisions. | High | exact Nate decision | **DONE — exact line approved** |
| 6 | Build the derived minimum-release candidate. | High | fresh decision receipt + checkpoint | **R4 BUILT / HOLD — deterministic build and local preflight green; required browser gate failed** |
| 7 | Correct shared mobile chrome in a style-only derived output. | High | R2 packet + fresh checkpoint + full proof gates | **OWNED BY STYLES TASK — active; R1/R2 remain unpromoted evidence** |
| 8 | Apply content/capability corrections in the release candidate. | High after exact packet | approved D01-D04 plus D05 KEEP-AND-SHIP override | **R4 APPLIED / NOT PROMOTED — three quotes and two founder cards kept; internal process copy removed** |
| 9 | Independently certify and deploy one preview. | High after 6-8 pass | certification PASS | **NOT STARTED** |
| 10 | Present production promotion as a separate decision. | High after 9 | explicit Nate production instruction | **NOT STARTED / FROZEN** |

Product imagery runs beside this release sequence as a supply-only lane. It does
not unblock or authorise integration by itself; every selected asset still needs
an exact identity and live-use approval.

### Content-only R4 close — 2026-08-17 19:20 AEST

R4 built reproducibly in a new output, preserved all three anonymised Home quote
cards and both founder cards, removed only the authorised internal process
surfaces, and passed the successor local preflight. It did not certify: the full
35-case browser run reached all seven routes with HTTP 200, exact root widths and
zero broken/incomplete images, then failed the packet's required zero-error gate
on inherited Typekit DNS failures and Home/Pure chrome mount-contract console
errors. The FAQ browser selector also counted two exact-text DOM matches and was
not weakened. Exact failed receipt:
`docs/orchestration/reviews/MAPLEMOON-MINIMUM-RELEASE-CONTENT-R4-20260817T190059.json`.
Completion returned literal FAIL exit 3; promotion was not run. R4 is
evidence-only and must not be deployed. The chrome/font findings were delivered
to Styles task `019ff65f-fd33-7e51-8a83-360ba2f8d665`; the FAQ proof remains a
BOSS harness/integration follow-up. No WIP, Shopify, Git, Vercel, production or
client state changed.

## Source evidence

- `docs/orchestration/reviews/MAPLEMOON-SEVEN-WORKSTREAM-CLOSEOUT-MATRIX-20260816T202900.md` — SHA-256 `c04cdcd568c93b445cec0419c3ecdc88e5294de11aff15bed3fc84df566d7e57`
- `docs/orchestration/reviews/MAPLEMOON-MINIMUM-RELEASE-DRY-RUN-20260816T203628.md` — SHA-256 `c868a822b88a4a50994ea41b1d265e8b0abe235085b9d7ac9c6376e79531bfaf`
- `docs/orchestration/reviews/MAPLEMOON-SEVEN-ROUTE-VISUAL-AUDIT-R2-20260816T210036.md` — SHA-256 `8016d98ada1b36c4215c4448c24b98939f4ec97101e08f988d3d305955166c4d`
- `_wip/evidence/minimum_release_dry_run_20260816T203628/input-hashes.sha256` — SHA-256 `5fff65281da9ad9440eca957869092e4594bdfcfbde922afbaa8f781dbf72ccf`
- `docs/orchestration/LOCK_MANIFEST.json` — SHA-256 at reconciliation `a7ec12d38bd272f334f0afe3cfb3f32694f574e3400dc6c0323c434d939c420f`
- `docs/orchestration/reviews/MAPLEMOON-STYLE-CHROME-DERIVED-20260817T134139.json` — R1 required-browser FAIL receipt, SHA-256 `5594ab1a0f0f49c5f1215a85f4cb7809f04e0af4c5921a0169a9602176b86526`
- `docs/orchestration/packets/MAPLEMOON-STYLE-CHROME-CORRECTION-R2-20260817T140018.md` — bounded non-overwriting correction authority, SHA-256 `41b7a0520e705c9316377ed3775f98d116a0fcdba8db08ace13f44b45cd69606`

## Stop condition

Customer-copy or release-candidate mutation may begin only from a fresh packet
that pins the exact base decisions plus the D05 **KEEP AND SHIP / POST-LIVE
FLAG** override. The style-only packet remains separate and must prove D05 copy
byte-unchanged. Production and client contact remain separately frozen
regardless of candidate certification.
