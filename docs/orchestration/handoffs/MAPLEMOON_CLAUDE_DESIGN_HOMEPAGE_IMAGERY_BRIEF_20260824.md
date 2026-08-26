# CLAUDE CODE — MAPLEMOON DESIGN, HOMEPAGE & IMAGERY BRIEF

Snapshot: 24 August 2026 AEST  
Purpose: reconcile the present design staging and prepare it for immediate native Shopify translation.  
Operating mode: evidence-first. Do not edit, build, deploy, alter Shopify, contact the client, or silently reconcile conflicts while reading this brief.

## Status legend

- `[VERIFIED FACT]` Supported by a named local file, receipt, hash, commit, message or immutable deployment.
- `[NATE DECISION]` Direct decision from Nate; scope is exactly what is stated.
- `[IN PROGRESS]` Active or incomplete lane.
- `[HOLD]` Not admitted for implementation, wiring, deployment or client use.
- `[SUPERSEDED]` Historical evidence only; no longer the current authority.
- `[UNKNOWN]` Evidence is missing or conflicting and must not be inferred.

## 1. Control plane and authority

- `[VERIFIED FACT]` Persistent BOSS task: `codex://threads/019ffe53-6243-73a2-9d75-e1a072cd07ce`.
- `[VERIFIED FACT]` Styles task: `codex://threads/019ff65f-fd33-7e51-8a83-360ba2f8d665`.
- `[VERIFIED FACT]` Product-imagery supply task: `codex://threads/01a00dec-ea17-7923-8065-4a53f0970908`.
- `[VERIFIED FACT]` Photography-supply task: `codex://threads/019ffd5b-edd2-7b23-8780-453f9b67a532`.
- `[VERIFIED FACT]` Claude manager relay task: `codex://threads/01a02e61-139f-7f72-995a-546e9237af8b`.
- `[VERIFIED FACT]` Claude evidence/session ID: `b7febdec-2b3f-44bc-a7d5-5a4498883e81`.
- `[VERIFIED FACT]` Current durable ledger: `/Users/handtomouse/maplemoon-website/docs/orchestration/MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md`; current SHA-256 `bc23e18da7b2e03d1d2eb4d9ab613b23fc226650870d848e9636fc1ddcca9c10`.
- `[SUPERSEDED]` Earlier handoffs cited ledger SHA `6a039f8a...`; use the current `bc23e18...` bytes and later durable receipts where they record newer decisions.
- `[VERIFIED FACT]` Source precedence:
  1. Direct Nate decisions and the current durable BOSS ledger.
  2. Later checkpointed packets and passing receipts.
  3. Current Git/source hashes and certified candidate receipts.
  4. Styles-task outputs as planning guidance according to their recorded statuses.
  5. Exact archived client-viewed pages and messages.
  6. Old previews, experimental visualizations and failed proof surfaces as comparison evidence only.

## 2. Current Git and design-staging state

- `[VERIFIED FACT]` Repository: `/Users/handtomouse/maplemoon-website`.
- `[VERIFIED FACT]` Branch: `safety/founders-20260824`.
- `[VERIFIED FACT]` HEAD: `c54d115cc1d7d679641e5061d5ee76407c48bd9b`.
- `[VERIFIED FACT]` HEAD commit: `c54d115 2026-08-24T11:48:08+10:00 Safety: founder frame701 wiring plus re-frozen contracts`.
- `[VERIFIED FACT]` Prior major candidate commit: `7c04f808e285acc116ae0f93c3d887ee1e96aea3` — `feat(site): promote Carli home/shop edits, clear minimum-release content leaks, add product shots`.
- `[HOLD]` The current worktree is not clean. Tracked changes exist in `.gitignore`, `_wip/carob-story.WIP.html`, `_wip/homepage_real_1_lead_photo.WIP.html`, `_wip/our-story.WIP.html`, `_wip/stockists.WIP.html`, `docs/design-system/contracts/exceptions.v1.json`, `docs/design-system/contracts/routes.v1.json`, `docs/orchestration/LOCK_MANIFEST.json`, and `stockists.html`.
- `[HOLD]` Untracked packet/evidence/review paths also exist for current Carli Sections A–D work. Preserve them; do not clean, stash, delete or absorb them.
- `[VERIFIED FACT]` Current source hashes from the final read-only check:
  - Home WIP `d0c02c2369476cbb27253ba3625d4c409609a85027fae8ad2317d885503f6819`
  - Shop WIP `f9d150dea283d43eb0a14e02dfeccf9ea1eb4eae87ec82a546ab6984f3fa5604`
  - Our Story WIP `267ee46bec4eabba46931134d6e4fc4feae1e60e5ea34c212d627de7e213af07`
  - Carob Story WIP `71d5a883cfb14db45b71d7fa94211d08778bc69d037d38c46c058c2e13da90e4`
  - FAQ WIP `449e2c4b129d0c63fc55d77ba2abe7c71c34da9b7c6f6f63fbb21cc899efe7e8`
  - Stockists WIP `c71ceeaa24f81fa1171e66168286a6bb1b62adb4e8ff80f7f201575d50c9def5`
  - Lock manifest `1ca8041bfdbddb34d620f76d42e13dd124311cabb3b32cc3ee83c425027ed8bc`.
- `[HOLD]` The Our Story WIP changed during reconciliation. Any new worker must re-hash every input immediately before acquisition and stop if a pin differs.
- `[VERIFIED FACT]` Four lock rows remain BLOCKED under packet `MAPLEMOON-CARLI-SECTION-D-20260824T015534Z`. Do not override or release them casually.
- `[NATE DECISION]` This staging site is the design source intended for translation into Shopify. It must not be changed merely to suit the present static implementation or an Etheryx demo.

## 3. Current candidate versus old previews

- `[VERIFIED FACT]` Latest certified private preview: `https://maplemoonbuild20260813-j9pef6x3q-handtomouses-projects.vercel.app`; deployment `dpl_9gAxXL2uxFu4tobNeSgRR69NqgQj`; Preview / Ready / Vercel-authenticated private review only.
- `[VERIFIED FACT]` Preview receipt: `/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CERTIFIED-PRIVATE-PREVIEW-R5-20260824T112414.json`; SHA-256 `7c21650bb075827fd795a1de3e4fa7a39d86e9003b61ae0e07a0efa54ae39074`.
- `[VERIFIED FACT]` Exact R4 candidate tree: `/Users/handtomouse/maplemoon-website/_wip/deploy/generated/maplemoon-admitted-preview-r4-20260824T111607`; 75 files; tree SHA-256 `5a649086667c7ed017e45b2cb97fdf6d356d1b4ad636a2d51b09b2b7321efe49`.
- `[VERIFIED FACT]` R5 deployed-route hashes:
  - Home `8ad9c5258edaa56c263f38c01b9d9ef0152af6fb6179e6c59f1641b7b59319a5`
  - Shop `ec78b161c768f00850eaeeadbc86925e7e294cf5f6dfa9f792b2231d348cc05f`
  - Our Story `8dc01af541712a54986270f5bdf51f41ea48fa5be2699fa3610182910668458f`
  - Carob Story `2fafd3867233a01ce6af1f4dd0a1837cc83fb69563d35d29c293e8d1d379d9e0`
  - FAQ `354b556d01f36c60ff2bb902386bd86fb61a271ee6420b550fcce2192ec078e3`
  - Stockists `d5adc08c573483fe462708fc5c20a45485fae9d21ab36991653ec50036ee94ac`
  - Pure PDP `2157a7ef9846c854a2565b9e1c4c4a3f934b8b2ab92dc1e119a31bb838109869`.
- `[VERIFIED FACT]` R5 passed 14/14 route-width cases at 390/1440 with zero broken images, console errors, page errors, request failures or overflow; R5 authenticated byte equality passed 16/16.
- `[HOLD]` R5 is the latest certified comparison point, but newer dirty Home/Our Story/Carob Story/Stockists staging changes postdate it. It is not the complete current design state.
- `[SUPERSEDED]` Preview `https://maplemoonbuild20260813-m49nihfds-handtomouses-projects.vercel.app`, deployment `dpl_BAMceRFCmxKYpq7bz3GHQZ2qZuKc`, is historical evidence only.
- `[SUPERSEDED]` The client production alias and frozen 08:54 build are not the present design staging or Shopify implementation base.
- `[SUPERSEDED]` Style-Chrome R2 is evidence-only and failed its required content preflight. Its green chrome tests do not make it release-ready.

## 4. Homepage quality directive

- `[NATE DECISION]` Homepage flow must remain unchanged.
- `[NATE DECISION]` Do not reorder, remove or invent homepage sections. Refinement may improve hierarchy, typography, spacing, responsive treatment, crops, authenticity, affordances, contrast, polish and Shopify editability without changing the narrative sequence.
- `[NATE DECISION]` The current staging design leads the Shopify translation. The purchased theme must accommodate the design; the design must not be flattened into theme-demo conventions.
- `[IN PROGRESS]` The homepage still requires a serious, harsh, independent design QA against its exact current bytes.
- `[HOLD]` No independent harsh QA currently certifies Home hash `d0c02c...`. The R5 certification predates this source state.
- `[HOLD]` The current Home Section A closeout receipt at `/Users/handtomouse/maplemoon-website/out/maplemoon_carli_home_section_a_20260824_receipt.json`, SHA-256 `7ba81ff18939b4adeadaee1591ba6016ffc4d53913b6dbf0f1949354e9f189fa`, records an earlier post-hash and no longer pins the current Home bytes.
- `[VERIFIED FACT]` Current Home ritual cards use real studio image paths:
  - `assets/our_story/studio_bar_almond.webp`
  - `assets/our_story/studio_bar_rock.webp`
  - `assets/our_story/studio_moon_rock.webp`.
- `[HOLD]` Treat those bindings as current staging observations, not final client approval, until the current Home is independently rendered and reviewed.

## 5. Exact client-viewed link and images

- `[VERIFIED FACT]` Sent Gmail message ID `19ffd4c477cfd246`, subject `Maple Moon website preview`, was sent to `info@maplemoon.com.au` on 14 August 2026 at 08:44:22 AEST.
- `[VERIFIED FACT]` Exact client-viewed link: `https://maplemoonbuild20260813.vercel.app`.
- `[VERIFIED FACT]` Exact archived client-viewed homepage: `/Users/handtomouse/maplemoon-website/_wip/evidence/track1_carli_build_20260816/fetch/live/homepage.html`; 208,556 bytes; SHA-256 `b936b5bb4856cdd6134e5b15bce5dfc3b353c1d442fd1a418180b35b8fa10356`; MD5 `6197879a5ca9d3ed0452773abc0bbeb4`.
- `[VERIFIED FACT]` The three ritual images Carli and Dylan actually saw were:
  1. `/assets/ritual/ritual_after_dinner.webp`; local source `/Users/handtomouse/maplemoon_build_20260813/assets/ritual/ritual_after_dinner.webp`; SHA-256 `70786224f83e1ff858dcfbdf6328c1341f745be4df61fd112aa93f400098b4d7`; 837×1350.
  2. `/assets/ritual/ritual_afternoon.webp`; SHA-256 `308e6f3a489f11b4a8bb57f25f8ed2fb6f275387ab8436695edb1fb6be9ebe79`; 837×1350.
  3. `/assets/ritual/ritual_tea_night.webp`; SHA-256 `da82fc967439666d586e9bf75578d7728b1de289b3456418d85514904483d920`; 837×1350.
- `[VERIFIED FACT]` Their archived alt descriptions were “Dark carob squares on a stone board in low light”, “A teacup in soft afternoon light”, and “A steaming cup against a blue evening window”.
- `[HOLD]` Do not infer client-viewed imagery from today’s asset folders. The archive and hashes above are the binding evidence.

## 6. Rejected “Maple Mooning” proof

- `[SUPERSEDED]` Rejected proof: `/Users/handtomouse/.codex/visualizations/2026/08/14/019ffe53-6243-73a2-9d75-e1a072cd07ce/maple-mooning-actual-product-proof.html`; SHA-256 `abc957ad35447dae1894dbb678b0a43a4ce6fa34eff4ab412e15d0a8e46be537`.
- `[VERIFIED FACT]` It failed because it used the wrong image family rather than the three exact images Carli and Dylan saw.
- `[VERIFIED FACT]` Its imagery represented an atmospheric blue twilight/pod image with a bar, a hand-with-pods image with a Pure four-pack, and a silhouetted carob-branches image with an Elixir canister.
- `[HOLD]` That proof cannot answer what Carli meant by changing the client-viewed ritual imagery. It has no design or asset-admission authority.

## 7. Carli’s exact imagery feedback

- `[VERIFIED FACT]` Home email ID `19ffe9e25e48c3ec`, subject `Website Edit HOME PAGE`, 14 August 2026 14:53 AEST:
  - “Love the colour and moon and sky”
  - Banana: “Fist pic: Too AI”
  - “Second Pic: Not nice, needs a nices bunch of banana shits”
  - “Do you need us to send you?”
  - Moons: “Goji pick needs to go”; “Al lothers are good”
  - “Elixirs are good”
  - Eclipse bites: “Images too AI, where are the ones from the shoot?” and “And also blurry”
  - Ritual: “PHOTOS need to be changes to showcase the ACTUAL product”.
- `[VERIFIED FACT]` Shop email ID `19ffed8779cb19e3`, subject `Shop PAGE`, 14 August 2026 15:57 AEST:
  - “Goji and coconut moon : change picture”
  - “What did the original images from the photo shoot look like? The look TOO AI. We want our website to be slick but also REAL and down to earth which is very much us too.”
  - Goji Ripe: “Image needs to change and match”
  - Banana: “IMAGE?: needs to change TOO AI”
  - Carob Powder: “Remove background for image that matches” and “Do you need us to send you one?”
- `[VERIFIED FACT]` Our Story email ID `1a0027cf1194f7e0`, subject beginning `Our Story : NEEDS WORKS`, 15 August 2026 08:55 AEST:
  - “Its abit disjounted...”
  - “it doesn’t feel like us, its abit too ’try hard"”
  - “CARLI PHOTO: TOO AI , not into it, was there anything thats more ‘smiley’ from both of us? We arn’t serious people , this doesn’t feel authentic Dylan looks WAY too seriously , he is never is serious LOL”
  - “The from the studio images feel very random and out of place here... Maybe just one photo to break up text”.
- `[VERIFIED FACT]` Content source: `https://docs.google.com/document/d/1MfelnF5F9HUMSTgdnE7TGFGaZ-S4wH1THIK07sKrRnM/edit?tab=t.0`; title `Core Website Pages`.
- `[HOLD]` The Google Doc is a content/catalogue source. It does not prove which images were visible in the client link.
- `[HOLD]` Carli’s “all others are good” and “Elixirs are good” apply to what she saw in that exact old build. They are not blanket hash-level approval for later derivatives.

## 8. Shared styles and page exceptions

- `[VERIFIED FACT]` Current Styles handoff: `/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/CLAUDE-HANDOFF-20260824.md`; SHA-256 `60fa363508c789997c6072b54ee19e27dd4bbe686e1cb6b9f0eafc896fde1bd2`.
- `[VERIFIED FACT]` Sealed v0.3.1-provisional baseline remains 68 rules, 12 decisions and 70 tokens at `/Users/handtomouse/Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs`; STATUS SHA-256 `78825a5757bad150d8450eba536bc60387453b920827fe8020d8cc408c0075ba`; verifier receipt SHA-256 `268fc97d2562274401fd2fb41e00d38f6d2faf7343fb435a53e633a4ed3f66ab`.
- `[VERIFIED FACT]` v0.3.2 is advisory only: baseline manifest SHA-256 `ea710a90e20d33fdba53b435aa89c18eb3cdfd92b8da686672dfa74f1b4efb67`; receipt SHA-256 `849bb942120c2cba5d848b55940e592d7887d9e8ce6ebaabb7b43acb6d9ab1ca`.
- `[VERIFIED FACT]` v0.4 is planning visual guidance only: proof manifest SHA-256 `e82536f330c217595f774674cd6a21c7f9099f753c4437d2e196a60585c9ac59`; receipt SHA-256 `e727823094643a4800bb0ad6b36fe0282fd2b954a39029548b4d3bcfd6a82caa`; BOSS handoff SHA-256 `cf2cded755ede6064b54cc5966a7cda45e5e8e46d1314b612ba9037bffcd5932`.
- `[VERIFIED FACT]` Batch 03 remains planning-only: proof SHA-256 `3cdb598320920ced2cb3c47536d19a0dd5587a08b0464fc0b06ca50cf2417efc`; BOSS handoff SHA-256 `fe93698f31e7d1e00a2ba666c18bf33e65c9ee3d0a91fd946e7e2da8015e6a84`; receipt SHA-256 `45b395ed53bac8c2cd905c8571f4f3e6b880e5262c39d5b20a2e185416f957ca`.
- `[NATE DECISION]` Exact decision line: `D01=A; D02=A; D03=B; D04=A; D05=B; D06-PURE=REJECT; D06-SPICED=REJECT; OUR-STORY=KEEP CURRENT PAIR HERO + REMOVE PORTRAIT PLACEHOLDERS; MOBILE-HEADER=MENU / CENTRED WORDMARK / CONTACT`.
- `[NATE DECISION]` Once real commerce is connected, SHOP-053 supersedes the pre-commerce right-side Contact action: mobile shell becomes Menu / centred intact wordmark / Bag; Contact moves into the menu/footer.
- `[NATE DECISION]` Home remains an intentional visual-system exception.
- `[NATE DECISION]` Non-Home page-header planning direction: candidate C, with shared headline/reading order/Medium edge-blend grammar and page-role density.
- `[NATE DECISION]` Body-composition planning direction: candidate B, open editorial rhythm with 3–5 varied beats.
- `[NATE DECISION]` Use a controlled mix of chapter numbers, direct subheads, whitespace and hairlines; do not add generic automatic micro-kickers.
- `[NATE DECISION]` Width model: 1240px outer shell, 1180px editorial inset, proposed gutters 64px large desktop / 48px smaller desktop-tablet / 20px mobile.
- `[NATE DECISION]` FOG-002 task-level planning recipe: Medium, 20% pale-blue veil, 48% clear core and 26% falloff; desktop media begins at 27% of header width and the left dissolve spans 43% of the media frame.
- `[HOLD]` FOG-002’s design choice is planning-approved in the Styles task but not reconciled into the sealed kit or proven on all real routes/media/runtime conditions.
- `[VERIFIED FACT]` Approved/planning requirements include `CNT-001`, `CNT-003`, `CNT-004`, exact-only `CNT-005`, `ARC-001`–`ARC-006`, `NAV-001`–`NAV-003`, `CMP-009`, `CMP-010`, `MEDIA-001`, `RESP-004`, `RESP-007`, `RESP-008`, `OPS-001`–`OPS-005`, and `DEC-001`–`DEC-012`.
- `[HOLD]` Provisional/recommended only: `FND-001`, `FND-003`–`FND-008`, `CMP-001`–`CMP-005`, `CMP-011`–`CMP-017`, `MEDIA-003`, `MEDIA-004`, `FOG-003`, `FOG-005`, `RESP-001`, and `LAYER-001`.
- `[HOLD]` Dependency or technical-evidence gates remain: `CNT-002`, sealed-kit `FOG-002`, `FND-002`, `FND-009`, `MEDIA-002`, `MEDIA-005`, `FOG-004`, `FOG-006`, `NAV-004`, `CMP-006`–`CMP-008`, `RESP-002`, `RESP-003`, `RESP-005`, `RESP-006`, `RESP-009`, `LAYER-002`, font delivery/licensing, media rights, exact crops, Shopify runtime and production.
- `[NATE DECISION]` FAQ’s chip/rail treatment remains page-specific. It is not a universal component promotion.

## 9. Imagery readiness

- `[VERIFIED FACT]` The May ChatGPT/AI archive is `/Users/handtomouse/UFC/spins/maplemoon_bites_moodboard_export_20260516/output_PNG`: 79 PNGs across 13 SKU families and multiple angles.
- `[VERIFIED FACT]` Provenance source: `/Users/handtomouse/maplemoon-website/_wip/evidence/IMAGERY-PROGRAMME-20260802/OG-IMAGE-CANDIDATE-BRIEF-20260803.md`.
- `[HOLD]` The May archive is AI-generated moodboard/product-form reference material. It is not real photoshoot imagery, exact product identity, or approved client-facing photography.
- `[IN PROGRESS]` A separate real-raw product-fidelity lane is required. Its purpose is to preserve true shape, size, topping, cut-surface, colour and SKU identity from the raws.
- `[VERIFIED FACT]` Real-raw pilot input: `DSC01563.jpg`; SHA-256 `9e8705ff69d609a6b24348f3d03fa8081b2385e9f7343dcb5f829826003c6284`.
- `[SUPERSEDED]` First pilot output: `/Users/handtomouse/.codex/generated_images/019ffe53-6243-73a2-9d75-e1a072cd07ce/exec-f4a1114b-7caa-4eb8-8cb2-4f29834a250c.png`; SHA-256 `cdecaabc6c5b46ba18b124103591068738416045842f20c407247c1e4c85d52a`; disposition REVISE/rejected.
- `[HOLD]` Corrected pilot: `/Users/handtomouse/.codex/generated_images/019ffe53-6243-73a2-9d75-e1a072cd07ce/exec-8e1f6737-7c4c-4c54-acd5-05ae0b3cf9e1.png`; SHA-256 `17b1b74c103edf0a409250d97be8ac38fc4c242ecd521ec204ac9d880d12447a`. It regenerated microgeometry, changed colour/light and used the wrong crop; it is not source-pixel-approved.
- `[SUPERSEDED]` Initial five-product bundle: `/Users/handtomouse/.codex/generated_images/019ffe53-6243-73a2-9d75-e1a072cd07ce/exec-d2bd1b23-5418-4078-86fb-e7bfe01ac350.png`; SHA-256 `edcf1208872b22f042bd04330c08372e674b8fc95ba594e43fcd984086073a1e`; disposition REJECT.
- `[HOLD]` Corrected bundle: `/Users/handtomouse/.codex/generated_images/019ffe53-6243-73a2-9d75-e1a072cd07ce/exec-82159e46-662a-4e9b-af90-0e2c68af52ac.png`; SHA-256 `b7d669130ef5c1482b4d3655e1407885087c884089cfdbadd7b0b5d0c5abdba1`. It remains unadmitted because Almond/Hazelnut read too similarly, dome variation and scale remain weak, the fudge is too synthetic/regular, and the Goji surface is not sufficiently faithful.
- `[VERIFIED FACT]` Real physical-form proxy root: `/Users/handtomouse/Library/CloudStorage/GoogleDrive-hello@handtomouse.org/My Drive/MrCC_PAI_Stage1_Files/UFC/clients/maplemoon/deliverables/photoshoot_2026_05_24/_closeout_20260812/08_photo_production_wave/product_geometry/proxies_real_raw/`.
- `[VERIFIED FACT]` Eclipse form references: `DSC01543.jpg`, `DSC01561.jpg`, `DSC01564.jpg`.
- `[VERIFIED FACT]` Fudge form references: `DSC01567.jpg`, `DSC01572.jpg`, `DSC01576.jpg`.
- `[UNKNOWN]` The exact Almond-versus-Hazelnut raw binding remains unconfirmed. Do not guess from visual similarity.
- `[NATE DECISION]` Nate stated that the Goji product identity/form was correct during the product-imagery review.
- `[HOLD]` No exact Goji file/hash was bound to that statement, so it is not yet an asset-admission record.
- `[VERIFIED FACT]` Aug-23 candidate-generation receipt: `/Users/handtomouse/maplemoon-website/out/maplemoon_lane_20260823_receipt.json`; SHA-256 `c8b5285191fe1fba5ab2f21c707aebe2923d669919a30f52a3a0540135900468`; outcome HOLD; no product candidate selected or placed.
- `[VERIFIED FACT]` Candidate directory: `/Users/handtomouse/maplemoon-website/out/image_candidates_20260823`; 17 files; directory SHA-256 `fd9b26cc357043cbb938e63b500fbe656f5afa5609f6e7f65eb2e5a708f6b3f1`.
- `[VERIFIED FACT]` Generation-lane receipt: `/Users/handtomouse/.mrcc_lanes/logs/maplemoon-images-20260823-20260823-154245/last_message.txt`; SHA-256 `2fdbc9b2af9050b5cbbe402dfe28f8c8222df4af07d8f59844eb2de368602906`; it records built-in image generation ×3 and no placement/deployment.
- `[HOLD]` Current generated candidates:
  - `assets/product_shots/final_20260823/carob_bananas.png`; SHA-256 `b95166ac27ce0eeda83ee6e445fc7de6d6b405ca8763b83782beb0ec46538a23`
  - `assets/product_shots/final_20260823/goji_ripe_eclipse_bites.png`; SHA-256 `b3b176d3b06c3a3a19eeb7e548dfb80af58529f77b154fa85131e6940102fab4`
  - `assets/product_shots/final_20260823/eclipse_bites_range.png`; SHA-256 `c1901a132e1f3b4b8dbb253822c3abfbcb811c7a829555b84610bcb9f0f63e42`
  - `assets/product_shots/final_20260823/coconut_goji_moons.png`; SHA-256 `9ee4ca0d2a431e57413fa6a7bad4c269759f93a86ff4188d49e62de8e5b37630`
  - `assets/product_shots/final_20260823/carob_powder_no_bg.png`; SHA-256 `1592a5a64c5e0f3054a81705a998cf5ae3877143fdd720854c5e78cd3c6fab6f`.
- `[HOLD]` These files exist, but the Home/Shop closeout packets keep A02/A03/A04/A06 and B05/B08/B10/B17/B18 open. R5 does not bind these candidates.
- `[VERIFIED FACT]` `out/shopify_create_spec_20260823.md` calls some candidates “REAL”, but the generation receipt proves the lane used built-in image generation.
- `[HOLD]` Treat that “REAL” label as a provenance classification error until corrected. Do not admit those files as real photography.
- `[VERIFIED FACT]` Current photography truth remains five wired hero files out of 14 eligible V9 frames: 36%, not 80%.

## 10. Founder imagery reconciliation

- `[NATE DECISION]` Founder composition/identity is frame 701: pair image for the Our Story header and individual frame-701 cut-outs for the bios.
- `[SUPERSEDED]` An earlier Claude-manager relay said the v2 real-CSS crop/grade still required visual acceptance.
- `[VERIFIED FACT]` A later durable packet records that real-CSS acceptance as completed: `/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-FOUNDER-FRAME701-WIRING-20260824T100005.md`; SHA-256 `c6485d72ec9faec028ae7bfcfccda1c9d7a14890d8df909b6770f4239d5e9152`.
- `[VERIFIED FACT]` Passing receipt: `/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-FOUNDER-FRAME701-WIRING-20260824T100005.json`; SHA-256 `fb87ae41e646bd660cc28594070d6b70a358bcbfe63be91a651b3faf30ed3d4d`.
- `[VERIFIED FACT]` Accepted/wired asset hashes:
  - Source frame 701 `b80bcdaf58bf952217bbc5ea32d90ee1ae8340c29767f43e8735fca62723d4f1`
  - Pair `assets/our_story/founders_frame701_pair_2400.webp`; SHA-256 `ec53b0faa3cec0e12e578395968e0605eeac5a64b191030d5c8661ed33ea608d`
  - Carli bio SHA-256 `48b7032778a8a492129290bed69054004decc3f93ffc2a8b9b71bd997b7e1f0b`
  - Dylan bio SHA-256 `34f7022d44a084d72ef6e05e4f3acf7cd64e26a8a08e3d1b555136dad267f942`.
- `[VERIFIED FACT]` Commit `c54d115...` and certified R5 include the accepted founder work.
- `[UNKNOWN]` Reopen founder crop/grade only if Nate explicitly disputes the later durable packet. Do not silently revert to the earlier HOLD.

## 11. Shopify translation target

- `[NATE DECISION]` Use native Shopify Online Store 2.0, not a Vercel/headless storefront.
- `[NATE DECISION]` The purchased Etheryx design is the theme foundation, but its demo is not design authority.
- `[NATE DECISION]` Translate the approved staging design into native Shopify sections, blocks and settings.
- `[NATE DECISION]` Work only in an unpublished duplicate until a separate publish decision.
- `[VERIFIED FACT]` Store: `maplemooncarob.myshopify.com`; currently password protected.
- `[VERIFIED FACT]` Theme family: Etheryx; preset/admin name `Ethereal`.
- `[VERIFIED FACT]` Theme IDs:
  - `154500595909` — live Ethereal, version 1.4.0 baseline.
  - `160076628165` — unpublished `MapleMoon Private Review 20260817 S1`, version 1.4.0.
  - `160142491845` — unpublished `Updated copy of Ethereal`, exact theme bytes version 1.6.0.
- `[VERIFIED FACT]` Theme evidence: `docs/orchestration/reviews/MAPLEMOON-SHOPIFY-THEME-UPDATE-S1B-20260819T112058.md` and matching JSON receipt.
- `[HOLD]` No theme implementation, Shopify write, push or publish should begin until Nate identifies the exact unpublished target theme. The 1.6.0 copy is the logical candidate but is not silently selected here.
- `[NATE DECISION]` Launch catalogue target is 24 products.
- `[NATE DECISION]` When approved imagery is unavailable, use a deliberate image-free product treatment; never insert fake placeholders.
- `[NATE DECISION]` Real/verified product identity leads. AI output may be used only after fidelity review and exact Nate approval.

## 12. Current visual disposition

- `[NATE DECISION]` Approved for planning: Home exception; shared non-Home page-header direction; open editorial body rhythm; controlled context lines; 1240/1180 width model; responsive gutter direction; Medium fog recipe; mobile chrome structure; current founder frame-701 treatment.
- `[VERIFIED FACT]` Technically certified: R5’s seven routes at 390/1440 and its exact deployed bytes.
- `[SUPERSEDED]` Rejected: the wrong-image-family “Maple Mooning” proof, initial real-raw pilot, initial bundle and stale old preview surfaces as current authority.
- `[HOLD]` Provisional: exact typography delivery, most component appearance tokens, detailed section styling, media presentation states, overlays, image-free product visual treatment and task-only editorial mounting choices until reconciled.
- `[HOLD]` Missing: current-Home harsh independent design QA, exact current-WIP integrated certification, exact approved product-image bindings, reliable Almond/Hazelnut identity map, acceptable five-product bundle, real-route fog fallback proof and final Shopify section/schema translation.
- `[HOLD]` Awaiting Nate: exact Shopify target theme; exact open product assets or image-free choice; any remaining Home refinement selections after harsh QA; any additional bundle-generation cost/prompt approval.

## 13. Ten highest-value actions — execution order

1. `[HOLD]` Re-pin the exact current six WIPs, contracts, lock manifest and intended Shopify design base. Stop if any byte moves during acquisition.
2. `[IN PROGRESS]` Run harsh independent Homepage design QA against the pinned Home without changing its flow.
3. `[HOLD]` Turn that QA into flow-preserving before/after visual proofs only; Nate selects refinements before implementation.
4. `[HOLD]` Reconcile the approved shared-style decisions into one Shopify translation contract without mutating the sealed Styles Kit.
5. `[HOLD]` Resolve Home imagery A02/A03/A04/A06 by exact file/hash, or record a deliberate image-free choice.
6. `[HOLD]` Resolve Shop imagery B05/B08/B10/B17/B18 by exact file/hash and correct all provenance labels.
7. `[IN PROGRESS]` Run the real-raw bites fidelity lane with exact SKU/source bindings, especially Almond versus Hazelnut and authentic fudge geometry.
8. `[IN PROGRESS]` Continue the separate five-product bundle lane only after the reference binding and exact generation/revision authority are clear.
9. `[HOLD]` Map every approved staging section to Etheryx 1.6.0 OS2 sections, blocks, settings, metafields and image-free fallbacks; no theme write yet.
10. `[HOLD]` Implement and certify in the selected unpublished Shopify theme, then keep preview approval, storefront publication and client communication as separate gates.

## 14. Safe parallelism

- `[VERIFIED FACT]` After the exact source pin is stable, these read-only lanes can run safely in parallel:
  - Harsh Homepage QA.
  - Shared-style/Shopify contract reconciliation.
  - Product-image provenance and raw-to-SKU inventory.
  - Shopify section/block/settings mapping.
- `[IN PROGRESS]` The real-raw fidelity lane and five-product bundle lane may run in parallel only if they own separate output paths and perform no site wiring.
- `[HOLD]` Theme implementation must wait for the design-base pin, shared-style contract and target-theme decision.
- `[NATE DECISION]` Missing media does not have to block the structural Shopify build if the approved image-free treatment is used.
- `[HOLD]` Do not run Shopify writes, Git promotion, Vercel deployment or production publication alongside an unpinned/moving source tree.

## 15. Exact decisions still required from Nate

- `[HOLD]` Confirm the exact staging snapshot to audit and translate: current dirty WIPs after checkpoint, or certified R5 as the temporary base.
- `[HOLD]` Review and select the flow-preserving Homepage refinements produced by the harsh QA.
- `[HOLD]` Bind exact files/hashes for Home A02/A03/A04/A06 and Shop B05/B08/B10/B17/B18, or explicitly choose image-free treatment per slot.
- `[HOLD]` Confirm exact raw/SKU identity for Almond and Hazelnut bites and correct the generated-candidate provenance register.
- `[HOLD]` Decide whether the corrected five-product bundle receives one more revision, is rejected, or is replaced by a raw-composite route. Any new generation needs its exact prompt/cost authority.
- `[HOLD]` Confirm the unpublished Shopify target theme. Recommended candidate for review: theme ID `160142491845`, Ethereal/Etheryx 1.6.0.
- `[VERIFIED FACT]` No new founder decision is required unless Nate disputes the later frame-701 wiring packet.
- `[VERIFIED FACT]` No new numeric fog design choice is required; real-route/runtime verification remains required.

## 16. Bounded Claude → Codex execution packet

- `[IN PROGRESS]` Packet ID: `MAPLEMOON-HOMEPAGE-HARSH-DESIGN-QA-R1-20260824T153058`.
- `[IN PROGRESS]` Worker: persistent BOSS task `019ffe53-6243-73a2-9d75-e1a072cd07ce`.
- `[IN PROGRESS]` Goal: perform an independent, deliberately harsh design audit of the exact pinned Homepage and produce a Shopify OS2.0 translation map. Preserve the existing Homepage flow exactly. This lane is evidence/reporting only.

### Required inputs

- `[VERIFIED FACT]` `/Users/handtomouse/maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html`; expected SHA-256 `d0c02c2369476cbb27253ba3625d4c409609a85027fae8ad2317d885503f6819`.
- `[VERIFIED FACT]` `/Users/handtomouse/maplemoon-website/docs/orchestration/MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md`; SHA-256 `bc23e18da7b2e03d1d2eb4d9ab613b23fc226650870d848e9636fc1ddcca9c10`.
- `[VERIFIED FACT]` `/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CERTIFIED-PRIVATE-PREVIEW-R5-20260824T112414.json`; SHA-256 `7c21650bb075827fd795a1de3e4fa7a39d86e9003b61ae0e07a0efa54ae39074`.
- `[VERIFIED FACT]` `/Users/handtomouse/maplemoon-website/_wip/deploy/generated/maplemoon-admitted-preview-r4-20260824T111607`; expected tree SHA-256 `5a649086667c7ed017e45b2cb97fdf6d356d1b4ad636a2d51b09b2b7321efe49`.
- `[VERIFIED FACT]` `/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/CLAUDE-HANDOFF-20260824.md`; SHA-256 `60fa363508c789997c6072b54ee19e27dd4bbe686e1cb6b9f0eafc896fde1bd2`.
- `[VERIFIED FACT]` `/Users/handtomouse/maplemoon-website/_wip/evidence/track1_carli_build_20260816/fetch/live/homepage.html`; SHA-256 `b936b5bb4856cdd6134e5b15bce5dfc3b353c1d442fd1a418180b35b8fa10356`.
- `[VERIFIED FACT]` Gmail source IDs: `19ffd4c477cfd246`, `19ffe9e25e48c3ec`, `19ffed8779cb19e3`, `1a0027cf1194f7e0`.

### Stop condition

- `[HOLD]` Before creating the checkpoint or writing an output, hash every input. If Home differs from `d0c02c...`, any other named pin differs, a governing lock conflicts, or a source edit is required, stop and return HOLD to BOSS. Do not adapt to moving bytes.

### Exact writable outputs only

- `[IN PROGRESS]` `/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-HOMEPAGE-HARSH-DESIGN-QA-R1-20260824T153058.md`
- `[IN PROGRESS]` `/Users/handtomouse/maplemoon-website/_wip/evidence/homepage_harsh_design_qa_r1_20260824T153058/`
- `[IN PROGRESS]` `/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-HOMEPAGE-HARSH-DESIGN-QA-R1-20260824T153058.md`
- `[IN PROGRESS]` `/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-HOMEPAGE-HARSH-DESIGN-QA-R1-20260824T153058.json`.

### Steps

1. `[IN PROGRESS]` Create a fresh, timestamped, non-overwriting checkpoint for every writable path and pass `phase=start`.
2. `[IN PROGRESS]` Render the exact pinned Home at 1440, 1024, 768, 390, 375 and 320.
3. `[IN PROGRESS]` Exercise keyboard order, visible focus, menu/cart states available in this source, reduced motion, text spacing and native 200% where the environment can prove it.
4. `[IN PROGRESS]` Inspect hierarchy, rhythm, typography, colour, spacing, authenticity, image choice/crop, CTA hierarchy, navigation, product picker, ritual section, trust/proof, footer, mobile compression, performance implications and Shopify editability.
5. `[NATE DECISION]` Preserve the existing section sequence and narrative flow. Findings may recommend refinement only.
6. `[IN PROGRESS]` Compare current Home, certified R5 and the exact archived client-viewed Homepage. Name the source and hash behind every image-related finding.
7. `[IN PROGRESS]` Produce a Shopify OS2.0 section/block/settings/metafield translation map for the selected Etheryx foundation without writing Shopify.
8. `[IN PROGRESS]` Rank findings by impact, confidence, effort and risk; label shared rule versus Home exception; identify whether Nate must see a visual choice.
9. `[IN PROGRESS]` Create nonblank rendered proof/contact sheets and an exact source-close hash report.
10. `[IN PROGRESS]` Write a truthful PASS, HOLD or FAIL receipt and return control to BOSS. Do not implement.

### Required verification

- `[IN PROGRESS]` All expected source hashes match at acquisition and close.
- `[IN PROGRESS]` All rendered images are nonblank.
- `[IN PROGRESS]` Zero audit-harness console, page, request or broken-image failures.
- `[IN PROGRESS]` Root and meaningful internal overflow measured at every required width.
- `[IN PROGRESS]` Every finding has an exact evidence pointer, priority, effort/risk, shared-rule/exception classification, and Nate-decision flag.
- `[IN PROGRESS]` The Shopify map covers section type, block schema, setting type, dynamic source/metafield need, responsive behavior and image-free fallback.
- `[IN PROGRESS]` A read-only close proves zero mutation to WIPs, assets, contracts, lock manifest, sealed Styles Kit, Git, Shopify, Vercel, production and client state.
- `[IN PROGRESS]` Completion receipt passes the project’s `maplemoon-receipt/v2` gate.

### Do not touch

- `[HOLD]` Any WIP/site source, assets, design-system contracts, lock rows, sealed Styles Kit, current candidates, `out/` artefacts, Git state, Shopify themes/store data, Vercel, production or client communications.

### Done when

- `[IN PROGRESS]` BOSS receives one evidence-backed harsh Homepage gap matrix, visual proof set and Shopify translation map against unchanged flow and exact pinned bytes. No implementation or promotion occurs.
