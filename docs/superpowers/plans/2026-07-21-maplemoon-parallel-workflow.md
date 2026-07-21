# MapleMoon Parallel Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Run MapleMoon Thursday-prep work through parallel review sessions and one serialized coordinator so home, shop, and our-story become 80-90% reviewable without conflicting edits.

**Architecture:** Parallel sessions produce page-specific review handoffs in `_wip/_section_reviews/`. The coordinator is the only actor that edits shared WIP HTML, `_wip/_SECTION_TRACKER.html`, and checkpoints. Verification runs after each merge and again once the review pack is assembled.

**Tech Stack:** Static HTML/CSS/JS in `_wip/`, Markdown handoff files, `python3 -m html.parser`, `git diff --check`, local static preview at `127.0.0.1:3005`, browser smoke checks at 1440px and 390px.

## Global Constraints

- Work only in WIP files unless Nate explicitly expands scope.
- No deploys, pushes, Shopify promotion, DNS, email, or client comms.
- Do not invent testimonials, unconfirmed product prices, social URLs, stockist logos, founder portrait content, Shopify routes, or product claims.
- Keep stockists wiring on `stockists.WIP.html` until final Shopify URL mapping exists.
- Preserve exact supplied copy; do not introduce visible em dashes in supplied copy.
- Keep Carob Story and FAQ implementation out of Thursday-prep unless Nate explicitly expands scope.
- Preserve unrelated dirty work.
- Parallelize diagnosis, review notes, screenshots, and small isolated variants only.
- Serialize all shared WIP HTML merges, tracker updates, checkpoint updates, and final verification through the coordinator.

---

### Task 1: Coordinator Preflight And Scope Freeze

**Files:**
- Read: `/Users/handtomouse/maplemoon-website/docs/superpowers/specs/2026-07-21-maplemoon-parallel-workflow-design.md`
- Read: `/Users/handtomouse/maplemoon-website/_wip/_CHECKPOINT_20260721.md`
- Read: `/Users/handtomouse/maplemoon-website/_wip/_SECTION_TRACKER.html`
- Read: `/Users/handtomouse/maplemoon-website/_wip/_SPLIT_CHECKPOINT_20260721.md` if present
- Read: `/Users/handtomouse/maplemoon-website/_wip/_COMMS_PROJECT_STATUS_20260721.md` if present
- Create: `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/coordination-preflight-20260721.md`

**Interfaces:**
- Consumes: Approved coordination spec and current WIP checkpoints.
- Produces: `coordination-preflight-20260721.md`, the source of truth for which review lanes will run and which files are locked to the coordinator.

- [ ] **Step 1: Check current dirty state**

Run:

```bash
git status --short
```

Expected: Dirty WIP files may exist. Do not revert them. Record only files relevant to home/shop/about/stockists tracking.

- [ ] **Step 2: Read active scope documents**

Run:

```bash
sed -n '1,260p' docs/superpowers/specs/2026-07-21-maplemoon-parallel-workflow-design.md
sed -n '1,220p' _wip/_CHECKPOINT_20260721.md
sed -n '1,220p' _wip/_SECTION_TRACKER.html
```

Expected: The coordination spec and tracker confirm home, shop, and our-story are the Thursday-prep focus.

- [ ] **Step 3: Write the preflight handoff**

Create `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/coordination-preflight-20260721.md` with this content. In the dirty-file section, include only files from `git status --short` that match `_wip/homepage_real_1_lead_photo.WIP.html`, `_wip/shop.WIP.html`, `_wip/our-story.WIP.html`, `_wip/stockists.WIP.html`, `_wip/_SECTION_TRACKER.html`, or `_wip/_CHECKPOINT_*.md`.

```md
# Coordination Preflight - 2026-07-21

## Scope Freeze
- Active Thursday-prep pages: home, shop, our-story.
- Stockists work is tracking-only.
- Carob Story and FAQ stay out of implementation scope unless Nate expands scope.
- No deploys, pushes, Shopify promotion, DNS, email, or client comms.

## Coordinator-Owned Files
- `_wip/homepage_real_1_lead_photo.WIP.html`
- `_wip/shop.WIP.html`
- `_wip/our-story.WIP.html`
- `_wip/_SECTION_TRACKER.html`
- `_wip/_CHECKPOINT_*.md`

## Parallel Review Outputs Expected
- `_wip/_section_reviews/home-thursday-review.md`
- `_wip/_section_reviews/shop-thursday-review.md`
- `_wip/_section_reviews/our-story-thursday-review.md`
- `_wip/_section_reviews/support-pages-status.md`

## Current Dirty Files Relevant To Scope
- `_wip/homepage_real_1_lead_photo.WIP.html`
- `_wip/shop.WIP.html`
- `_wip/our-story.WIP.html`
- `_wip/stockists.WIP.html`
- `_wip/_CHECKPOINT_20260721.md`

## Merge Policy
- Review sessions are read-only unless the coordinator assigns one exact patch.
- Coordinator merges one page at a time.
- Tracker and checkpoint update only after verification passes.
```

- [ ] **Step 4: Verify preflight file exists**

Run:

```bash
test -f _wip/_section_reviews/coordination-preflight-20260721.md && sed -n '1,180p' _wip/_section_reviews/coordination-preflight-20260721.md
```

Expected: File prints with concrete scope, file ownership, and dirty-file list.

- [ ] **Step 5: Check whitespace**

Run:

```bash
git diff --check -- _wip/_section_reviews/coordination-preflight-20260721.md
```

Expected: No output.

---

### Task 2: Dispatch Parallel Review Sessions

**Files:**
- Create: `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/home-thursday-review.md`
- Create: `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/shop-thursday-review.md`
- Create: `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/our-story-thursday-review.md`
- Create: `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/support-pages-status.md`

**Interfaces:**
- Consumes: `coordination-preflight-20260721.md`.
- Produces: Four page/status review handoffs the coordinator can triage without reopening every decision branch.

- [ ] **Step 1: Dispatch Home Review worker**

Prompt:

```text
Read-only MapleMoon Thursday-prep review. Work in /Users/handtomouse/maplemoon-website.

Do not edit shared WIP HTML. Do not deploy, push, or send messages.

Review `_wip/homepage_real_1_lead_photo.WIP.html` for Thursday review readiness. Focus on:
- range-detail selector
- tasting notes below the product fan
- commerce/status CTA truth
- reviews pending state
- sampler/trust/stockists consistency
- mobile and desktop hierarchy

Write findings to `_wip/_section_reviews/home-thursday-review.md` using the format in `docs/superpowers/specs/2026-07-21-maplemoon-parallel-workflow-design.md`.
```

Expected: Worker creates only `_wip/_section_reviews/home-thursday-review.md`.

- [ ] **Step 2: Dispatch Shop Review worker**

Prompt:

```text
Read-only MapleMoon Thursday-prep review. Work in /Users/handtomouse/maplemoon-website.

Do not edit shared WIP HTML. Do not deploy, push, or send messages.

Review `_wip/shop.WIP.html` for Thursday review readiness. Focus on:
- bars and elixirs priced
- moons, bites, and bananas pending
- no hidden placeholder prices leaking into source truth
- card images, labels, alt text, disabled CTA clarity
- mobile overflow

Write findings to `_wip/_section_reviews/shop-thursday-review.md` using the format in `docs/superpowers/specs/2026-07-21-maplemoon-parallel-workflow-design.md`.
```

Expected: Worker creates only `_wip/_section_reviews/shop-thursday-review.md`.

- [ ] **Step 3: Dispatch Our Story Review worker**

Prompt:

```text
Read-only MapleMoon Thursday-prep review. Work in /Users/handtomouse/maplemoon-website.

Do not edit shared WIP HTML. Do not deploy, push, or send messages.

Review `_wip/our-story.WIP.html` for Thursday review readiness. Focus on:
- Carli copy fidelity
- mobile readability
- founder image framed as editorial, not final portrait proof
- no invented founder portrait content

Write findings to `_wip/_section_reviews/our-story-thursday-review.md` using the format in `docs/superpowers/specs/2026-07-21-maplemoon-parallel-workflow-design.md`.
```

Expected: Worker creates only `_wip/_section_reviews/our-story-thursday-review.md`.

- [ ] **Step 4: Dispatch Support Status worker**

Prompt:

```text
Read-only MapleMoon Thursday-prep status review. Work in /Users/handtomouse/maplemoon-website.

Do not build support pages. Do not deploy, push, or send messages.

Review `_wip/stockists.WIP.html`, `_wip/carob-story.WIP.html`, `_wip/faq.WIP.html`, and relevant homepage links only as status surfaces. Focus on:
- stockists links stay on `stockists.WIP.html`
- representative stockist selection remains credible
- final Shopify URL mapping and logos remain listed as blockers
- Carob Story and FAQ remain outside Thursday home/shop/about focus

Write findings to `_wip/_section_reviews/support-pages-status.md` using the format in `docs/superpowers/specs/2026-07-21-maplemoon-parallel-workflow-design.md`.
```

Expected: Worker creates only `_wip/_section_reviews/support-pages-status.md`.

- [ ] **Step 5: Confirm review artifacts exist**

Run:

```bash
test -f _wip/_section_reviews/home-thursday-review.md
test -f _wip/_section_reviews/shop-thursday-review.md
test -f _wip/_section_reviews/our-story-thursday-review.md
test -f _wip/_section_reviews/support-pages-status.md
```

Expected: All commands exit 0.

- [ ] **Step 6: Check review artifact whitespace**

Run:

```bash
git diff --check -- _wip/_section_reviews/home-thursday-review.md _wip/_section_reviews/shop-thursday-review.md _wip/_section_reviews/our-story-thursday-review.md _wip/_section_reviews/support-pages-status.md
```

Expected: No output.

---

### Task 3: Coordinator Triage

**Files:**
- Read: `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/home-thursday-review.md`
- Read: `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/shop-thursday-review.md`
- Read: `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/our-story-thursday-review.md`
- Read: `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/support-pages-status.md`
- Create: `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/coordinator-triage-20260721.md`

**Interfaces:**
- Consumes: Page/status review artifacts.
- Produces: A must-fix queue with exact page order and stop rules for merges.

- [ ] **Step 1: Read all review artifacts**

Run:

```bash
sed -n '1,220p' _wip/_section_reviews/home-thursday-review.md
sed -n '1,220p' _wip/_section_reviews/shop-thursday-review.md
sed -n '1,220p' _wip/_section_reviews/our-story-thursday-review.md
sed -n '1,220p' _wip/_section_reviews/support-pages-status.md
```

Expected: Each review has Must Fix, Nice To Have, Content Blocked, Exact Suggested Edits, and Residual Risk sections.

- [ ] **Step 2: Create triage file**

Create `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/coordinator-triage-20260721.md` with this structure:

```md
# Coordinator Triage - 2026-07-21

## Must Fix Before Thursday

### Shop
- Copy each accepted shop finding as `file:line - action - reason`.
- If there are no accepted shop fixes, write `- No must-fix items accepted.`

### Our Story
- Copy each accepted our-story finding as `file:line - action - reason`.
- If there are no accepted our-story fixes, write `- No must-fix items accepted.`

### Homepage
- Copy each accepted homepage finding as `file:line - action - reason`.
- If there are no accepted homepage fixes, write `- No must-fix items accepted.`

## Content Blocked
- Testimonials pending from Carli and Dylan.
- Moons, bites, and bananas pricing pending.
- Founder photos pending.
- Social URLs pending.
- OG image pending.
- Stockist logos and final Shopify URL mapping pending.
- Shopify collaborator access pending.

## Nice To Have
- Copy accepted nice-to-have findings as `page - action - reason`.
- If there are no accepted nice-to-have findings, write `- No nice-to-have items accepted.`

## Out Of Scope
- Deploys, pushes, Shopify promotion, DNS, email, client comms.
- Carob Story and FAQ implementation.
- Stockist maps, filters, logos, account/cart systems.
- New full concept boards.

## Merge Order
1. `_wip/shop.WIP.html`
2. `_wip/our-story.WIP.html`
3. `_wip/homepage_real_1_lead_photo.WIP.html`
4. `_wip/_SECTION_TRACKER.html`
5. `_wip/_CHECKPOINT_20260721.md` or a new dated checkpoint

## Stop Rules
- Stop once home, shop, and our-story are truthful, reviewable, and verified.
- Do not build around missing inputs.
- Do not start more review sessions after must-fix queue is clear.
```

The completed triage file must not contain the instruction words `Copy each accepted`; those lines are instructions for the coordinator while writing the triage, not final triage content.

- [ ] **Step 3: Self-check triage has no generic lines**

Run:

```bash
rg -n "Copy each accepted|TB[D]|TO[D]O" _wip/_section_reviews/coordinator-triage-20260721.md
```

Expected: Exit 1 with no matches.

- [ ] **Step 4: Check triage whitespace**

Run:

```bash
git diff --check -- _wip/_section_reviews/coordinator-triage-20260721.md
```

Expected: No output.

---

### Task 4: Merge Shop Must-Fix Items

**Files:**
- Modify: `/Users/handtomouse/maplemoon-website/_wip/shop.WIP.html`
- Read: `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/coordinator-triage-20260721.md`

**Interfaces:**
- Consumes: Accepted Shop must-fix list.
- Produces: Shop WIP page with source truth and visible UI aligned.

- [ ] **Step 1: Inspect accepted shop fixes**

Run:

```bash
sed -n '/### Shop/,/### Our Story/p' _wip/_section_reviews/coordinator-triage-20260721.md
```

Expected: Exact shop fixes are listed. If no shop must-fix items are accepted, skip to Task 5.

- [ ] **Step 2: Apply only accepted shop fixes**

Use `apply_patch` for manual edits. Typical accepted fix is to normalize pending prices in the `CAT` object:

```js
moons:[
  {n:'Pure Carob Moon',img:'moon_pure_carob',d:'A hand-moulded crescent of pure carob and cacao butter.',price:null,size:'40g'},
  {n:'Peppermint Moon',img:'moon_peppermint',d:'Cool peppermint in a hand-moulded crescent.',price:null,size:'40g'},
  {n:'Roasted Hazelnut Moon',img:'moon_hazelnut',d:'Roasted hazelnut in a smooth carob crescent.',price:null,size:'40g'},
  {n:'Coconut & Goji Moon',img:'moon_goji_coconut',d:'Coconut and goji in a naturally sweet crescent.',price:null,size:'40g'},
  {n:'Cayenne Moon',img:'moon_cayenne',d:'A slow warmth of cayenne in a carob crescent.',price:null,size:'40g'},
  {n:'Almond Moon',img:'moon_almond',d:'Toasted almond in a smooth carob crescent.',price:null,size:'40g'}
],
bites:[
  {n:'Coconut Bites',img:'bite_coconut',d:'Bite-sized carob with shredded coconut.',price:null,size:'pack'},
  {n:'Goji Bites',img:'bite_goji',d:'Bite-sized carob with goji berries.',price:null,size:'pack'},
  {n:'Golden Bites',img:'bite_gold',d:'Bite-sized carob, naturally sweet.',price:null,size:'pack'},
  {n:'Almond Eclipse',img:'eclipse_almond',d:'Carob eclipse bite with toasted almond.',price:null,size:'pack'},
  {n:'Hazelnut Eclipse',img:'eclipse_hazelnut',d:'Carob eclipse bite with roasted hazelnut.',price:null,size:'pack'},
  {n:'Pecan Eclipse',img:'eclipse_pecan',d:'Carob eclipse bite with pecan.',price:null,size:'pack'}
],
bananas:[
  {n:'Carob Bananas',img:'bananas',d:'Dehydrated banana, coated in naturally sweet carob.',price:null,size:'80g'}
]
```

Do not change priced bars or elixirs unless triage explicitly accepts that change.

- [ ] **Step 3: Verify shop parser**

Run:

```bash
python3 -m html.parser _wip/shop.WIP.html
```

Expected: No output.

- [ ] **Step 4: Verify shop whitespace**

Run:

```bash
git diff --check -- _wip/shop.WIP.html
```

Expected: No output.

- [ ] **Step 5: Record shop merge result**

Append to `_wip/_section_reviews/coordinator-triage-20260721.md`:

```md

## Merge Results

### Shop
- Applied accepted shop must-fix items.
- Parser: passed.
- Diff check: passed.
- Residual risk: final Shopify variants and pricing remain blocked by missing confirmed data/access.
```

If `## Merge Results` already exists, add only the `### Shop` subsection.

---

### Task 5: Merge Our Story Must-Fix Items

**Files:**
- Modify: `/Users/handtomouse/maplemoon-website/_wip/our-story.WIP.html`
- Read: `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/coordinator-triage-20260721.md`

**Interfaces:**
- Consumes: Accepted Our Story must-fix list.
- Produces: Our Story WIP page with copy/founder framing ready for review.

- [ ] **Step 1: Inspect accepted Our Story fixes**

Run:

```bash
sed -n '/### Our Story/,/### Homepage/p' _wip/_section_reviews/coordinator-triage-20260721.md
```

Expected: Exact our-story fixes are listed. If no our-story must-fix items are accepted, skip to Task 6.

- [ ] **Step 2: Apply only accepted Our Story fixes**

Use `apply_patch` for manual edits. Allowed categories:
- fix copy fidelity to supplied Carli wording
- clarify founder image alt/caption if it implies a portrait
- fix mobile readability or overflow
- keep missing founder portrait listed as a blocker

Do not invent portrait content, founder biography details, testimonials, or product claims.

- [ ] **Step 3: Verify Our Story parser**

Run:

```bash
python3 -m html.parser _wip/our-story.WIP.html
```

Expected: No output.

- [ ] **Step 4: Verify Our Story whitespace**

Run:

```bash
git diff --check -- _wip/our-story.WIP.html
```

Expected: No output.

- [ ] **Step 5: Record Our Story merge result**

Append under `## Merge Results` in `_wip/_section_reviews/coordinator-triage-20260721.md`:

```md

### Our Story
- Applied accepted our-story must-fix items.
- Parser: passed.
- Diff check: passed.
- Residual risk: final founder portraits remain blocked by missing approved photography.
```

---

### Task 6: Merge Homepage Must-Fix Items

**Files:**
- Modify: `/Users/handtomouse/maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html`
- Read: `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/coordinator-triage-20260721.md`

**Interfaces:**
- Consumes: Accepted Homepage must-fix list.
- Produces: Homepage WIP with range-detail/tasting-note truth ready for review.

- [ ] **Step 1: Inspect accepted homepage fixes**

Run:

```bash
sed -n '/### Homepage/,/## Content Blocked/p' _wip/_section_reviews/coordinator-triage-20260721.md
```

Expected: Exact homepage fixes are listed. If no homepage must-fix items are accepted, skip to Task 7.

- [ ] **Step 2: Apply only accepted homepage fixes**

Use `apply_patch` for manual edits. Allowed categories:
- simplify range-detail hierarchy
- replace “Featured collection preview” with tasting notes/helper proof beneath the fan
- keep product fan as visual lead
- keep selected product title as the primary headline in the range block
- keep Bars/Elixirs purchasable and Crescents/Bites/Bananas pending
- remove or soften inert footer/social/newsletter UI only if triage accepts it as must-fix

Do not create a new variant board. Do not rewrite unrelated homepage sections.

- [ ] **Step 3: Verify homepage parser**

Run:

```bash
python3 -m html.parser _wip/homepage_real_1_lead_photo.WIP.html
```

Expected: No output.

- [ ] **Step 4: Verify homepage whitespace**

Run:

```bash
git diff --check -- _wip/homepage_real_1_lead_photo.WIP.html
```

Expected: No output.

- [ ] **Step 5: Record homepage merge result**

Append under `## Merge Results` in `_wip/_section_reviews/coordinator-triage-20260721.md`:

```md

### Homepage
- Applied accepted homepage must-fix items.
- Parser: passed.
- Diff check: passed.
- Residual risk: testimonials, social URLs, stockist logos, and final Shopify mapping remain blocked by missing approved inputs.
```

---

### Task 7: Final Visual QA

**Files:**
- Read: `/Users/handtomouse/maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html`
- Read: `/Users/handtomouse/maplemoon-website/_wip/shop.WIP.html`
- Read: `/Users/handtomouse/maplemoon-website/_wip/our-story.WIP.html`
- Create: `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/final-visual-qa-20260721.md`

**Interfaces:**
- Consumes: Merged home/shop/our-story WIP pages.
- Produces: Final QA artifact used by checkpoint closeout.

- [ ] **Step 1: Start local preview**

Run:

```bash
python3 -m http.server 3005 --bind 127.0.0.1
```

Expected: Server runs at `http://127.0.0.1:3005/`. If port 3005 is occupied, use another temporary port and record it in the QA file.

- [ ] **Step 2: Smoke all review pages**

Check:
- `/_wip/homepage_real_1_lead_photo.WIP.html`
- `/_wip/shop.WIP.html`
- `/_wip/our-story.WIP.html`

At widths:
- 1440 desktop
- 390 mobile

For each page record:
- load status
- horizontal overflow
- empty `href="#"`
- missing image alt attributes
- visible text overlap
- small tap targets in review path
- stockists links pointing to `stockists.WIP.html`

- [ ] **Step 3: Write QA file**

Create `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/final-visual-qa-20260721.md`:

```md
# Final Visual QA - 2026-07-21

## Preview
- URL/port used:

## Homepage
- 1440:
- 390:
- Empty href check:
- Missing alt check:
- Overflow check:
- Notes:

## Shop
- 1440:
- 390:
- Empty href check:
- Missing alt check:
- Overflow check:
- Notes:

## Our Story
- 1440:
- 390:
- Empty href check:
- Missing alt check:
- Overflow check:
- Notes:

## Residual Risk
- List only risks still present after QA.
```

Each QA result must be written as one of these exact forms:
- `passed`
- `failed: homepage range tabs overflow by 18px at 390px`
- `not run: Chrome debug port unavailable after two attempts`

- [ ] **Step 4: Stop local preview**

Stop the local preview server before ending the task.

- [ ] **Step 5: Check QA artifact whitespace**

Run:

```bash
git diff --check -- _wip/_section_reviews/final-visual-qa-20260721.md
```

Expected: No output.

---

### Task 8: Tracker And Checkpoint Closeout

**Files:**
- Modify: `/Users/handtomouse/maplemoon-website/_wip/_SECTION_TRACKER.html`
- Create or modify: `/Users/handtomouse/maplemoon-website/_wip/_CHECKPOINT_20260721.md` or `/Users/handtomouse/maplemoon-website/_wip/_CHECKPOINT_20260722.md`
- Read: `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/coordinator-triage-20260721.md`
- Read: `/Users/handtomouse/maplemoon-website/_wip/_section_reviews/final-visual-qa-20260721.md`

**Interfaces:**
- Consumes: Merge results and final QA artifact.
- Produces: Current tracker/checkpoint that Nate can trust before review.

- [ ] **Step 1: Decide checkpoint date**

Run:

```bash
date +%Y%m%d
```

Expected: Use `_wip/_CHECKPOINT_20260721.md` if still July 21, otherwise create `_wip/_CHECKPOINT_YYYYMMDD.md` for the current date.

- [ ] **Step 2: Update tracker only for verified state**

Modify `_wip/_SECTION_TRACKER.html` only if a section status changed after verified merges. Do not mark content-pending sections as cleared.

Allowed status logic:
- Reviews remain `content-pending` unless real testimonials arrive.
- Moons/Bites/Bananas remain `content-pending` unless confirmed prices arrive.
- Stockists remains tracking/cleared only for WIP link/list state, not final Shopify readiness.

- [ ] **Step 3: Write checkpoint closeout**

Add this structure to the selected checkpoint:

```md
## Thursday Review Closeout - 2026-07-21

## Ready For Review
- List verified home/shop/about surfaces that are ready for feedback.

## Needs Source Input Before Launch
- Real testimonials from Carli and Dylan.
- Moons, bites, and bananas final pricing.
- Founder photos.
- Social URLs.
- OG image.
- Stockist logo assets.
- Final Shopify URL mapping.
- Shopify collaborator access.

## Not In This Scope
- Deploys, pushes, Shopify promotion, DNS, email, client comms.
- Carob Story and FAQ implementation.
- Stockist maps, filters, logos, account/cart systems.
- New full concept boards.

## Verification
- HTML parser:
- Diff check:
- Browser desktop:
- Browser mobile:
- Visual QA artifact: `_wip/_section_reviews/final-visual-qa-20260721.md`
```

Each verification line must use a concrete result, such as `HTML parser: passed`, `Browser mobile: failed: shop card CTA wraps over price at 390px`, or `Browser desktop: not run: local preview could not bind to an available port`.

- [ ] **Step 4: Run final parser gate**

Run:

```bash
python3 -m html.parser _wip/homepage_real_1_lead_photo.WIP.html _wip/shop.WIP.html _wip/our-story.WIP.html _wip/_SECTION_TRACKER.html
```

Expected: No output.

- [ ] **Step 5: Run final diff gate**

Run:

```bash
git diff --check -- _wip/homepage_real_1_lead_photo.WIP.html _wip/shop.WIP.html _wip/our-story.WIP.html _wip/_SECTION_TRACKER.html
```

Expected: No output.

- [ ] **Step 6: Final status summary**

Prepare a concise status for Nate:

```md
MapleMoon Thursday review state:
- Home: ready, range selector and review path verified at desktop and mobile.
- Shop: needs targeted follow-up, pending category source prices still require cleanup.
- Our Story: ready, founder imagery is framed as editorial and founder photos remain a launch blocker.
- Remaining blockers: testimonials, pending SKU prices, founder photos, socials, OG image, stockist logos, Shopify URL mapping/access.
- Verification: parser, diff check, desktop/mobile smoke status.
```

Do not send client comms from this website session.

---

## Plan Self-Review

Spec coverage:
- Coordinator-only merge model is covered by Tasks 1, 3, 4, 5, 6, and 8.
- Parallel review sessions are covered by Task 2.
- Visual QA after review/merge is covered by Task 7.
- Verification gates are covered by Tasks 4, 5, 6, 7, and 8.
- Stop rules and out-of-scope constraints are covered in Global Constraints, Task 3, and Task 8.

Placeholder scan:
- The plan uses concrete examples for generated handoff/checkpoint content.
- The plan includes self-check commands that reject generic instruction text from generated artifacts.
- No task asks a worker to invent unspecified implementation details.

Type and path consistency:
- Review artifacts use `_wip/_section_reviews/*.md`.
- Shared WIP files match the approved spec paths.
- Verification commands use the same paths throughout.
