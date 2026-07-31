# MapleMoon Saturday Delivery GSD Operational Plan

**Plan ID:** `SAT-GSD-20260731-001`
**Parent authority:** ratified `CTRL-V2-CANDIDATE-20260730-001`
**Operational phase:** `VIS-03-CARLI-CANVA-CLOSURE`
**Deadline:** Saturday 2026-08-01 at 06:00 AEST
**Coordinator:** Codex
**Final decision owner:** Nate
**State:** ready for read-only occurrence reconciliation

This is an additive operational plan beneath the frozen V2 master plan. It does not modify the ratified V2 payload or its hashes.

## 1. Outcome

Produce a polished six-page local Saturday review package in which:

- every one of Carli's 68 Canva directions is captured, mapped and dispositioned;
- every included item is verified as applied;
- every unresolved item is deliberately excluded or visibly safe in the annotated surface only;
- an ordinary reviewer sees no placeholder, pending, broken or obviously unfinished state;
- clean and annotated packages remain derived from the same accepted page state;
- technical, interaction, responsive, content and independent QA pass;
- Nate retains final design, factual, audience and delivery authority.

The Saturday deliverable is a front-end review package. It is not a completed Shopify store, production deployment or commerce cutover.

## 2. Bound inputs

| Input | Purpose | Raw SHA-256 at plan creation |
|---|---|---|
| `docs/plans/2026-07-30-maplemoon-master-orchestration-plan-v2.md` | Frozen parent authority | Ratified hash remains governed by P04 |
| `docs/orchestration/reviews/CARLI-CANVA-NOTE-REGISTER-20260731.md` | All 20 Canva pages and 68 source directions | `3ad91345149f46773a8cca557ed5b8ca604ab00eb76d70714e2c05e67d7259d2` |
| `docs/orchestration/SATURDAY_REVIEW_ACCEPTANCE_20260801.md` | Saturday acceptance threshold | `ba39b18c0b23c21de3b24204136685e12f622bb5c3500a61190884d7a5c81e8c` |
| `docs/orchestration/SATURDAY_FEEDBACK_REGISTER_20260801.md` | Current accepted, held and blocked findings | `4c8ea1293743910bf21d927333c43d83ce33cdb37e296e92db87eb2b16af1a82` |
| `docs/orchestration/SATURDAY_SECTION_FREEZE_REGISTER_20260731.md` | Current page inclusion and exclusion state | Current working evidence |
| `docs/orchestration/reviews/CARLI-CLAIMS-REPLACEMENT-OPTIONS-20260731.md` | Later claims corrections that outrank conflicting Canva text | Current working evidence |
| `docs/client-review/2026-08-01-saturday-review/staging-v1` | Current clean and annotated candidate | Generated evidence only |

If any bound source changes, the affected mapping or verification must be rerun. Unaffected accepted evidence should not be repeated.

## 3. Non-negotiable rules

1. Later Carli corrections outrank earlier Canva wording when they conflict.
2. Do not publish or present as accepted:
   - `slow-roasted carob`;
   - `smooth carob`;
   - a claim that Maple Moon mills carob;
   - a claim that products are handmade in small batches.
3. Pseudonyms do not replace testimonial permission and attribution. Testimonials stay out of clean review.
4. Product names, images, weights, prices, ingredients, availability and sell options stay catalogue-gated.
5. Factual, health, caffeine, ingredient, origin, process, policy and storage claims require authoritative support.
6. Blocked material is omitted from clean review rather than shown as pending.
7. One mutating worker owns each page/file cluster. Generated shared files have one coordinator-controlled writer.
8. No client contact, send, upload, commit, push, deploy, Shopify, WooCommerce or production action is authorized.

## 4. Definition of done for each Canva item

Each `CV-001` through `CV-068` must reach exactly one final disposition:

- `verified-applied`;
- `verified-existing`;
- `verified-excluded`;
- `blocked-fact`;
- `blocked-catalogue`;
- `blocked-asset`;
- `blocked-consent`;
- `deferred-by-Nate`.

`verified-applied` and `verified-existing` require:

1. exact source occurrence evidence;
2. clean and annotated occurrence evidence where applicable;
3. confirmation that no later Carli correction is violated;
4. responsive and interaction checks appropriate to the change;
5. independent verification by someone other than the worker;
6. the register's Delivery checkbox changed only after all prior conditions pass.

Blocked or deferred items must name the missing input, owner and clean-surface treatment.

## 5. Model, agent and task routing

| Work | Model/effort | Capacity |
|---|---|---|
| Exact occurrence inventory, links, spelling and deterministic comparisons | Low or Fast | Up to three disjoint read-only agents |
| Page-local copy/layout application after decisions | Medium | One mutating worker per page cluster |
| Claims, consent, accessibility, integration and final independent review | High | One focused reviewer per review class |
| Cross-source conflict or phase replan | Sol / highest available | Only when a real conflict or phase gate requires it |
| Register, locks, receipts, generated package and promotion control | Codex coordinator | Single owner |

Token and context rules:

- do not wake or poll unrelated MapleMoon tasks;
- do not ask multiple agents to review the same evidence;
- use deterministic searches and existing checker output before rendered re-review;
- batch Nate decisions by page and severity;
- escalate only unresolved major conflicts, not routine formatting;
- return compact receipts containing files, checks, blockers and one next gate.

## 6. Task and file ownership

- The existing Shop task remains the only active owner for the Shop page cluster until it returns a receipt or explicitly releases ownership.
- This coordinator may perform read-only Shop mapping but must not duplicate Shop mutations.
- Homepage, Carob Story, Our Story, Stockists and FAQ may receive separate page-local packets only after occurrence reconciliation.
- The builder, checker, package manifest, shared cart assets and generated package are one shared cluster. They may have only one writer at a time.
- Other MapleMoon tasks must return a receipt before their findings are admitted. Chat text alone does not change register state.

## 7. Phase sequence

### VIS-03A - Canva occurrence reconciliation

**Class:** read-only
**Objective:** Map all 68 Canva items to exact current source, clean and annotated occurrences.

Parallel read-only lanes:

1. Homepage and Our Story;
2. Shop, without mutating the active Shop task's cluster;
3. Carob Story, Stockists and FAQ.

The coordinator resolves shared or cross-page items after lane receipts return.

**Output:** `docs/orchestration/reviews/CARLI-CANVA-OCCURRENCE-RECONCILIATION-20260731.md`

**Exit:**

- `68 / 68` items have exact occurrence or exact absence evidence;
- every item has one proposed final disposition;
- duplicates and cross-page effects are reconciled;
- no page or generated file changed.

### VIS-03B - Decision compression

**Class:** review-only
**Objective:** Separate decisions Nate must make from work that is already safe, factual blocks and external inputs.

Decision batches:

1. Homepage and shared presentation;
2. Carob Story comparison, process and ritual;
3. Shop wording, order and missing imagery;
4. Our Story removals and retained copy;
5. Stockists map and test treatment;
6. FAQ wording, facts and policy route.

**Exit:**

- Nate receives only unresolved choices;
- each choice includes a recommendation and affected `CV` IDs;
- no safe implementation packet depends on an unanswered unrelated question.

### VIS-03C - Page application waves

**Class:** mutating-local, only after page-specific admission
**Order:** Homepage → Carob Story → Shop → Our Story → Stockists → FAQ.

For each page:

1. verify current raw hash and active owner;
2. admit one exact writable scope;
3. apply accepted copy, layout and inclusion/exclusion decisions only;
4. rebuild the derived clean and annotated package once;
5. run page-local checks;
6. return a receipt and release ownership before the next page.

The Shop wave waits for the active Shop task receipt. Catalogue-blocked facts remain review-only and may not be invented.

**Exit:**

- every admitted change has a receipt;
- blocked material remains absent from clean review;
- no unrelated WIP or generated output changed.

### VIS-03D - Independent verification

**Class:** read-only
**Reviewers:** claims/security, UI/accessibility and integration/plan verification.

Required checks:

- every `CV` disposition agrees with the source register;
- later claims corrections are enforced;
- clean and annotated content parity is intentional;
- no visible unfinished signal appears in clean;
- navigation, stockist finder, mock cart, fake checkout and fake newsletter still work;
- 320, 375, 390, 430, 1024 and 1440px checks pass;
- keyboard, focus, tap targets, reduced motion and literal 200 percent zoom are checked;
- links, assets, headings, landmarks, noindex and external-host allowlist pass;
- deterministic build, checker, cart checker and diff checks pass.

**Exit:** zero unresolved critical or major issue in the included Saturday artifact.

### VIS-03E - Saturday freeze and Nate acceptance

**Class:** local-review-only
**Objective:** Freeze the exact local artifact and present a compact decision pack.

The acceptance pack binds:

- source and generated hashes;
- `CV-001` through `CV-068` final dispositions;
- carried minor items with owner and later gate;
- known external blocks;
- exact clean and annotated routes;
- intended audience;
- feedback route.

**Exit:** Nate accepts the exact frozen artifact and audience. Any sharing or deployment remains a separate explicit action.

## 8. Internal deadline gates

The final readiness deadline is Saturday at 06:00 AEST.

| Gate | Latest target | Required state |
|---|---|---|
| Source reconciliation | `T-12h` | VIS-03A complete, all 68 mapped |
| Decision lock | `T-9h` | Nate decisions batched; factual blocks isolated |
| Page application complete | `T-6h` | Included high-confidence work implemented |
| Content and feature freeze | `T-4h` | No new features or speculative copy |
| Full independent QA | `T-3h` | Critical/major issues at zero |
| Human keyboard, zoom and visual walkthrough | `T-2h` | Human-only gates recorded |
| Artifact and audience ratification | `T-1h` | Exact hashes and decision pack ready |
| Delivery-ready local package | `06:00 AEST` | Accepted artifact ready for separately approved delivery |

If a target is already missed, do not restart the whole plan. Immediately:

1. stop new feature work;
2. preserve all accepted evidence;
3. prioritize critical, major and ordinary-reviewer unfinishedness;
4. exclude unresolved material from clean;
5. carry only invisible minor polish with an owner.

## 9. Verification loop

Each mutating wave follows:

`plan → exact scope → base hash → implement → deterministic checks → rendered checks → independent review → accept/reject/rework`

Maximum two repair iterations per page before escalation. After two failed iterations:

- stop the page packet;
- preserve the last accepted state;
- record the exact failure and evidence;
- ask Sol/highest reasoning for a narrow replan;
- keep unrelated pages moving.

Workers cannot accept their own work. Technical pass does not equal Nate's visual or factual approval.

## 10. Stop and escalation conditions

Stop the affected packet when:

- the source changed after mapping;
- another task owns or changed the same path;
- a requested change needs unsupported public facts;
- a product or selling fact conflicts with the catalogue gate;
- an approved image is missing;
- clean review would expose a placeholder or unresolved state;
- a checker, responsive test or independent review fails;
- external access, sending, deployment or production action would be required.

The rest of the plan continues where dependencies remain clean.

## 11. Immediate next packet

`VIS-03A-CANVA-OCCURRENCE-RECONCILIATION`

It is read-only against current page sources and the generated clean/annotated package. It must return the 68-item occurrence matrix without editing WIP, the generated package, the Canva source or any external system.
