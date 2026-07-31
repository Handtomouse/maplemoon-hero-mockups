# Carli Canva Occurrence Reconciliation

**Packet:** `VIS-03A`
**Date:** 2026-07-31
**Owner:** Codex
**Final decision owner:** Nate
**Canva source:** design `DAHQwLcKo04`, 20 pages, 68 captured directions
**Parent register:** `docs/orchestration/reviews/CARLI-CANVA-NOTE-REGISTER-20260731.md`
**Status:** occurrence mapping complete; five-decision batch approved by Nate; `VIS-03C-01` independently accepted for its bounded eight-note delivery set

## Authority boundary

This is a read-only evidence and routing record. It maps every captured Canva direction to the current source and Saturday clean/annotated review surfaces. It does not edit WIP or generated pages, approve factual claims, bind catalogue data, contact anyone, change Canva, commit, push, deploy, use Shopify or change production.

Later Carli corrections outrank earlier Canva wording. In particular, the review package must not say that Maple Moon slow-roasts or mills its carob, use `smooth carob`, or claim handmade/small-batch production without separate authority.

## Evidence snapshot

| Alias | Path | SHA-256 |
|---|---|---|
| `H-SRC` | `_wip/homepage_real_1_lead_photo.WIP.html` | `921ef01aa922668da2f0aacdfdf7438fd0e5664fb78ba98bc9c011e55e03b098` |
| `C-SRC` | `docs/client-review/2026-07-29-carli-review/staging-v1/carob-story.WIP.html` | `0b26ba08f6fb4819ea9b5a64309b54cc02b34b2b25e819df2f4a7299fa5809fb` |
| `S-SRC` | `docs/client-review/2026-07-29-carli-review/staging-v1/shop.WIP.html` | `0742a612bc46bf6accf539095a3e61664e875783eeb5317291fcac0435905e00` |
| `O-SRC` | `docs/client-review/2026-07-29-carli-review/staging-v1/our-story.WIP.html` | `d899fb69b77eec6a989a0230225dfcb17232b5802daf36a36f89be506b93dbca` |
| `T-SRC` | `docs/client-review/2026-07-29-carli-review/staging-v1/stockists.WIP.html` | `e8f5fc777d8827de5e53fc32acf4078ec0144cd8c8a37d49655c20312914ac9b` |
| `F-SRC` | `docs/client-review/2026-07-29-carli-review/staging-v1/faq.WIP.html` | `01b629ddbd43aeddf913e1ea26e58f40037553b000a7f706cfea0d0c05f93e98` |
| `BUILD` | `docs/client-review/2026-08-01-saturday-review/staging-v1/MANIFEST.json` | `9328a02e4eb01176dd58add5902ad028736fe083829ff4c1c30983dbfdcec661` |

`CL/*` and `AN/*` below mean the corresponding files under `staging-v1/clean/` and `staging-v1/annotated/`.

## Disposition meanings

- `verified-existing`: already present and should remain.
- `ready-apply`: direction and exact target are clear; no Nate choice is required.
- `ready-after-review`: supplied copy can proceed after ordinary copy/fact review.
- `blocked-fact`: needs authoritative factual evidence, not a preference decision.
- `blocked-catalogue`: waits for the fresh WooCommerce export and approved catalogue.
- `blocked-asset`: waits for an approved image or asset choice.
- `verified-excluded`: intentionally omitted from the clean package.
- `needs-source-location`: the instruction is clear but the exact Canva-marked occurrence remains unresolved.
- `needs-Nate`: a genuine design, content-structure or inclusion decision.
- `deferred-external`: external sharing/testing remains separately approval-gated.

## Complete 68-note occurrence map

| ID | Current occurrence evidence | Clean / annotated state | Proposed disposition | Nate now? |
|---|---|---|---|---|
| CV-001 | `H-SRC:719`, homepage benefit strip | `CL/H:669`; `AN/H:670`, both retain four existing claims | `ready-apply`: use Carli's exact three-part wording | No |
| CV-002 | `S-SRC:343`, Pure bar description | `CL/S:279`; `AN/S:280`, old copy | `ready-after-review`: supplied product copy, fact-check before delivery | No |
| CV-003 | `S-SRC:347`, Cayenne bar | `CL/S:284`; `AN/S:285`, old copy | `ready-after-review` | No |
| CV-004 | `S-SRC:348`, Almond bar | `CL/S:284`; `AN/S:285`, old copy | `ready-after-review` | No |
| CV-005 | `S-SRC:344`, Peppermint bar | `CL/S:280`; `AN/S:281`, old copy | `ready-after-review` | No |
| CV-006 | `S-SRC:345`, Hazelnut bar | `CL/S:281`; `AN/S:282`, old copy | `ready-after-review`; avoid unsupported process wording | No |
| CV-007 | `S-SRC:346`, Coconut and Goji bar | `CL/S:282`; `AN/S:283`, current description retained | `verified-existing` | No |
| CV-008 | `S-SRC:351`, Pure Moon | `CL/S:287`; `AN/S:288`, current description retained | `verified-existing`; catalogue gate remains | No |
| CV-009 | `S-SRC:352`, Peppermint Moon | `CL/S:288`; `AN/S:289`, old copy | `ready-after-review` | No |
| CV-010 | `S-SRC:354`, Coconut and Goji Moon | `CL/S:290`; `AN/S:291`, old copy | `ready-after-review` | No |
| CV-011 | `S-SRC:353`, Hazelnut Moon | `CL/S:289`; `AN/S:290`, old copy | `ready-after-review`; later `smooth carob` correction controls | No |
| CV-012 | `S-SRC:356`, Almond Moon | `CL/S:292`; `AN/S:293`, old copy | `ready-after-review`; later `smooth carob` correction controls | No |
| CV-013 | `S-SRC:245,263-268`, catalogue filters and product order | `CL/S:181,199-204`; `AN/S:182,200-205`, current order | `needs-Nate`: whether to adopt Carli's rainbow order | **Yes** |
| CV-014 | `S-SRC:362`, Goji Eclipse Bite | `CL/S:298`; `AN/S:299`, old copy | `blocked-fact`: supplied wording conflicts with later ban on `smooth carob` | No |
| CV-015 | `S-SRC:359`, Pecan Eclipse Bite | `CL/S:295`; `AN/S:296`, old copy | `ready-after-review`; ingredient/process claims require confirmation | No |
| CV-016 | `S-SRC:361`, Hazelnut Eclipse Bite | `CL/S:297`; `AN/S:298`, old copy | `ready-after-review` | No |
| CV-017 | `S-SRC:360`, Almond Eclipse Bite | `CL/S:296`; `AN/S:297`, old copy | `ready-after-review` | No |
| CV-018 | `S-SRC:363`, Fudge | `CL/S:299`; `AN/S:300`, old copy | `ready-after-review` | No |
| CV-019 | `C-SRC:316`, current introductory definition | Excluded from both generated Carob Story surfaces | `blocked-fact`: botanical and processing claims need authority | No |
| CV-020 | `C-SRC:316,362`, current powder/process language | Excluded from both generated Carob Story surfaces | `blocked-fact`: distinguish supplier processing from Maple Moon processing | No |
| CV-021 | `C-SRC:328`, current `An honest comparison` heading | Comparison excluded from both generated surfaces | `ready-apply`: use `The Honest Comparison` when the section is admitted | No |
| CV-022 | `C-SRC:338-346`, comparison table | Excluded from both generated surfaces | `blocked-fact`: broad cacao/sugar claim | No |
| CV-023 | `C-SRC:343`, caffeine row | Excluded from both generated surfaces | `blocked-fact`: caffeine/theobromine wording | No |
| CV-024 | `C-SRC:338-346`, comparison table | Excluded from both generated surfaces | `blocked-fact`: stimulating/activating claim | No |
| CV-025 | `C-SRC:338-346`, carob column label | Excluded from both generated surfaces | `ready-apply`: label `Carob / Maple Moon Carob` | No |
| CV-026 | `C-SRC:338-346`, comparison table | Excluded from both generated surfaces | `blocked-fact`: stimulant-free and usage-moment claim | No |
| CV-027 | No current nutrition-comparison occurrence | Absent from both generated surfaces | `needs-Nate`: include or omit the comparison | **Yes** |
| CV-028 | `H-SRC:858`, ritual heading | `CL/H:802`; `AN/H:808`, heading already present | `verified-existing` | No |
| CV-029 | `H-SRC:861`, ritual introduction | `CL/H:805`; `AN/H:811`, existing copy remains | `blocked-fact`: do not use `sugar crash` without support | No |
| CV-030 | `H-SRC:864-868`, three ritual images | `CL/H:808-812`; `AN/H:814-818`, existing tea/ritual images | `needs-Nate`: whether the overall picture set changes | **Yes** |
| CV-031 | `H-SRC:865`, evening tile | `CL/H:809`; `AN/H:815`, current blurb retained | `verified-existing` | No |
| CV-032 | `H-SRC:866`, afternoon tea image | `CL/H:810`; `AN/H:816`, tea image remains | `blocked-asset`: use an approved elixir image when selected | No |
| CV-033 | No exact current occurrence; nearest ritual is `H-SRC:869` | Absent from clean and annotated | `blocked-fact`: confirm product/reference meaning before adding | No |
| CV-034 | `H-SRC:869`, label `Night` above `With tea, at night` | `CL/H:813`; `AN/H:819` | `ready-apply`: change the mapped label to `Night-time` | No |
| CV-035 | `H-SRC:902`, testimonial block | Excluded from clean; anonymized/consent-held in `AN/H:852` | `verified-excluded` | No |
| CV-036 | `H-SRC:902`, consent note and quotes | Excluded from clean; consent-held in annotated | `verified-excluded` | No |
| CV-037 | No exact current CTA; nearest range/shop surfaces | Supplied line absent from both generated surfaces | `blocked-fact`: `right to your door` implies delivery coverage | No |
| CV-038 | No dedicated current shipping CTA | FAQ has pending-policy entry at `CL/F:114`; `AN/F:116` | Routed into the single CV-066 shipping/returns decision | No |
| CV-039 | `S-SRC:343-374`, product arrays | Current generated shop still uses unreconciled product records | `blocked-catalogue`; copy lane can be reviewed separately | No |
| CV-040 | `S-SRC:343-374`, product image keys | Current generated shop uses available mixed product assets | `blocked-asset` and `blocked-catalogue` | No |
| CV-041 | Same product and asset range as CV-039/CV-040 | No reliable duration can be inferred yet | `blocked-asset` and `blocked-catalogue`; estimate after inventory | No |
| CV-042 | `S-SRC:343-374`, card descriptions; no admitted detail-copy source | Generated shop remains review-only | `blocked-catalogue`: reconcile WooCommerce and approved catalogue first | No |
| CV-043 | `O-SRC:326`, final sentence of ingredient paragraph | `CL/O:228`; `AN/O:238`, sentence remains | `ready-apply`: same removal directive as CV-044/CV-045 | No |
| CV-044 | `O-SRC:326`, `We make carob because...` sentence | `CL/O:228`; `AN/O:238`, sentence remains | `ready-apply`: same removal directive as CV-043/CV-045 | No |
| CV-045 | `O-SRC:326`, exact marked sentence | `CL/O:228`; `AN/O:238`, sentence remains | `ready-apply`: remove sentence; Canva placement resolved | No |
| CV-046 | `C-SRC:316,376,380`, current intro/gallery evidence | Clean excludes this content; annotated has related material | `blocked-fact`: supplier, geography, process and ingredient claims | No |
| CV-047 | `C-SRC:331,342-344`, comparison intro/table | Comparison excluded from generated surfaces | `blocked-fact`: plant-origin statement needs authority | No |
| CV-048 | `C-SRC:338-346`, comparison rows | Comparison excluded from generated surfaces | `ready-apply`: pair corresponding points when section is admitted | No |
| CV-049 | No exact current point; comparison at `C-SRC:338-346` | Excluded from generated surfaces | `blocked-fact`: cacao taste generalisation | No |
| CV-050 | `C-SRC:360`, process step 01 | Excluded from generated surfaces | `ready-apply`: `The pod` already matches | No |
| CV-051 | `C-SRC:361`, process step 02 | Annotated contains older process wording; clean excludes it | `blocked-fact`: `The roast` label is clear, but roasting attribution needs proof | No |
| CV-052 | `C-SRC:362`, process step 03 | Annotated contains older process wording; clean excludes it | `blocked-fact`: ingredient/process and flavour claims | No |
| CV-053 | `C-SRC:363`, process result area | Excluded from generated surfaces | `ready-apply`: result label/copy after process facts clear | No |
| CV-054 | `C-SRC:389-391`, current range transition | Generated Carob Story retains a shorter range transition | `ready-after-review`: exact supplied transition copy | No |
| CV-055 | `F-SRC:101`, first FAQ `What is carob?` | `CL/F:105`; `AN/F:106`, retained | `verified-existing` | No |
| CV-056 | `F-SRC:102`, current second FAQ position | `CL/F:106`; `AN/F:107`, still `Does it taste like chocolate?` | `blocked-fact`: replace position with caffeine Q&A after ingredient claim check | No |
| CV-057 | `F-SRC:103`, current third FAQ | Exact `is-carob-caffeine-free` object removed from clean and annotated by `VIS-03C-02`; no CV-056 replacement added | `verified-applied` | No |
| CV-058 | No current `Is there Maple in it?` occurrence | Absent from both generated surfaces | `blocked-fact`: product-wide no-added-sugar claim and spelling review | No |
| CV-059 | No current location FAQ | Absent from both generated surfaces | `blocked-fact`: confirm business location wording | No |
| CV-060 | Canva says questions 1-3 were edited; maps to CV-055-CV-057 | Current generated ordering not yet reconciled | `ready-apply` through CV-055-CV-057; no separate decision | No |
| CV-061 | `F-SRC:104`, current cacao-butter FAQ | Clean excludes it; `AN/F:109` retains old unsupported wording | `blocked-fact`: caffeine statement needs authoritative support | No |
| CV-062 | `F-SRC:104`, current cacao-butter FAQ | Clean excludes it; `AN/F:109` retains old unsupported wording | `blocked-fact`: process, `smooth` and flavour claims | No |
| CV-063 | `F-SRC:105`, source-location FAQ | `CL/F:108`; `AN/F:110`, simplified/old variants | `blocked-fact`: confirm supplier and South Australia wording | No |
| CV-064 | `F-SRC:106`, storage FAQ | `CL/F:109`; `AN/F:111`, conservative existing advice | `blocked-fact`: production exclusions and 15-25°C storage claim | No |
| CV-065 | Four `Perfect/no need change` markers on Canva page 19 | No reliable marker-to-occurrence attachment exposed by Canva | `needs-source-location`; preserve current FAQ until exact targets are identified | No |
| CV-066 | `F-SRC:111`, pending-policy FAQ | `CL/F:114`; `AN/F:116`, visible pending entry | `needs-Nate`: FAQ link versus a separate shipping/returns page | **Yes** |
| CV-067 | `T-SRC:549-552`, illustrative map panel | `CL/T:481-484`; `AN/T:482-485`, visibly says `Not a live map` | `needs-Nate`: clean-package fallback while the real map is pending | **Yes** |
| CV-068 | No page occurrence; external family/friend testing instruction | No generated-page change required | `deferred-external`: testing/share remains separately approved and scheduled | No |

## Genuine Nate decisions

All other notes are either clear implementation instructions, already satisfied, intentionally excluded, or blocked by facts, assets or catalogue inputs. They do not benefit from a preference decision now.

1. **CV-013, product order:** adopt Carli's rainbow order for Bars and Moons: pink, red, yellow, green, blue, brown.
   **Recommendation:** yes, provided each category only renders products that actually exist in the admitted catalogue.

2. **CV-027, nutrition comparison:** include or omit a nutrition table on Carob Story.
   **Recommendation:** omit it from the Saturday package until comparable, attributable source data exists.

3. **CV-030, ritual image set:** keep the current overall set or replace it.
   **Recommendation:** keep the current evening and night images; replace only the afternoon tea image with an approved elixir image after one visual choice.

4. **CV-038/CV-066, shipping and returns:** put the material in FAQ or create a separate page.
   **Recommendation:** link from FAQ to the existing shipping/returns source for Saturday; do not build a separate policy page until its wording is verified.

5. **CV-067, pending stockists map:** decide what clean reviewers see before a real map exists.
   **Recommendation:** remove the visibly unfinished illustrative-map panel from clean, retain it only in annotated review, and keep the verified stockist/list content.

## Nate decision record

**Decision batch:** `VIS-03A-D01`
**Ratified:** 2026-07-31
**Instruction:** `approve all 5`

1. Adopt Carli's rainbow order for Bars and Moons, limited to products admitted by the catalogue.
2. Omit the nutrition comparison from the Saturday package until attributable comparison data exists.
3. Keep the evening and night ritual images; replace only the afternoon image after an approved elixir-image choice.
4. Link the FAQ to the existing shipping/returns source for Saturday; do not create a separate policy page until its wording is verified.
5. Remove the visibly unfinished illustrative-map panel from clean review, retain it in annotated review, and preserve the verified stockist/list content.

This ratification authorizes bounded implementation planning for these decisions. It does not itself authorize client contact, Canva changes, catalogue invention, commit, push, deploy, Shopify or production action.

## VIS-03C-01 coordinator acceptance

**Accepted:** 2026-07-31
**Receipt:** `docs/orchestration/reviews/VIS-03C-01-EVIDENCE-SAFE-CANVA-DELTA-20260731.md`
**Delivered:** CV-027, CV-034, CV-038, CV-043, CV-044, CV-045, CV-066 and CV-067

The coordinator independently reran the builder self-test, Saturday checker, cart checker, motion checker and `git diff --check`; all passed. Clean FAQ and Stockists were visually reviewed at `320`, `375`, `390`, `430`, `1024` and `1440` pixels. The initial visual block for the missing FAQ icon, half-width Stockists results and internal pending wording was corrected and rechecked. Annotated evidence remained available.

Final builder SHA-256: `82e510dc1760e9145c076db65b05b5adc893ce4938eb086a996a42a09707e74a`
Final aggregate package manifest SHA-256: `58dbde15a6160e87dde09fe14f8c552da2eb09c0c52e1a3771e78e7a5aeb95df`

No commit, push, deploy, client send, Canva mutation, Shopify use or production action was performed.

## VIS-03C-02 coordinator acceptance

**Accepted:** 2026-07-31
**Receipt:** `docs/orchestration/reviews/VIS-03C-02-FAQ-EVIDENCE-SAFE-CLOSURE-20260731.md`
**Delivered:** CV-028, CV-031, CV-035, CV-036, CV-055 and CV-057

The executor completed the admitted byte changes but did not return its receipt. Codex shut down the worker, reclaimed the locks, reconstructed the evidence and completed six-width browser QA. An independent `gsd-verifier` then returned PASS. Its only non-blocking guard-label correction was applied and the full automated and deterministic-build suite passed again.

No CV-056 replacement or caffeine wording was added. All factual, catalogue, asset, consent, WIP and external-action blocks remain held. No commit, push, deploy, client send, Canva mutation, Shopify use or production action was performed.

## Completeness and next gate

- Canva source directions mapped: `68 / 68`
- IDs present exactly once: `68 / 68`, independently verified by `gsd-verifier`
- Clear, no-choice directions: routed without asking Nate
- Factual, catalogue and asset dependencies: held rather than guessed
- Genuine Nate decisions: `5 / 5 approved`
- Verified derived-review deliveries: `14 / 68`
- Canonical page/WIP mutations: `0`
- External actions: `0`

The next bounded wave may address additional evidence-safe items. Fact, catalogue, asset, consent and external-action blocks remain held.
