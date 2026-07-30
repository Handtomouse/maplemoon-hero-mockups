# Maple Moon Section Review Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a simple local workflow where each Maple Moon page and major section is reviewed, approved, implemented, and verified independently.

**Architecture:** Keep the existing static WIP pages as the source of truth. Extend the current browser feedback overlay and orchestrator with page/section review sessions, approval states, and session-specific ledgers. Approved changes are integrated into the named WIP file only after a rollback copy and a clear approval record.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, existing local Node server, JSONL feedback log, Markdown ledger exports.

## Global Constraints

- Local WIP only. No commit, deploy, Shopify change, public launch, or client message.
- Preserve the existing dirty worktree and named WIP files.
- Do not invent pricing, policies, stockist data, testimonials, founder facts, imagery, or social proof.
- No shared navigation, footer, assets, or production files unless a separate approved batch names them.
- Review at 1440px and 390px before approval.
- One section or page per active session; no mixed feedback ledgers.
- Markdown remains an export and handoff format, not the primary annotation interface.

---

### Task 1: Define the review map and session naming

**Files:**
- Modify: `_wip/_WEBSITE_ORCHESTRATOR_20260728.html`
- Create: `_wip/reviews/REVIEW_MAP_20260728.md`

**Session map:**

- Homepage: `homepage-hero-02`, `homepage-range-02`, `homepage-ritual-02`, `homepage-founder-02`, `homepage-stockists-02`, `homepage-reviews-02`, `homepage-starter-kit-02`, `homepage-trust-02`
- Shop: `shop-navigation-01`, `shop-product-grid-01`, `shop-product-detail-01`
- Our Story: `our-story-hero-01`, `our-story-founder-01`, `our-story-body-01`
- Carob Story: `carob-story-hero-01`, `carob-story-education-01`, `carob-story-cta-01`
- FAQ: `faq-questions-01`, `faq-accordion-01`, `faq-cta-01`
- Stockists: `stockists-finder-01`, `stockists-results-01`, `stockists-coverage-01`

- [ ] Write the review map with one row per session, its WIP file, section anchor, viewport pair, status, and approval owner.
- [ ] Add orchestrator links that open the correct WIP file with `?review=<session>` and the correct section hash.
- [ ] Add visible states: `Not started`, `In review`, `Fix batch ready`, `Approved`, and `Held`.
- [ ] Confirm every link points to one of the six named WIP pages.

### Task 2: Make session isolation explicit in the feedback overlay

**Files:**
- Modify: `_wip/_feedback/feedback.js`
- Modify: `server.js`
- Test: `_wip/_feedback/feedback.js` with `node --check`; server syntax with `node --check server.js`

- [ ] Keep the current `review` query parameter as the session key.
- [ ] Store pathname, session, section hash, viewport, selector/region, category, priority, status, and note on every tag.
- [ ] Filter loaded pins and exported notes by both pathname and session.
- [ ] Display the active session and section name in the overlay header.
- [ ] Prevent export from silently combining `legacy` notes with named sessions.
- [ ] Preserve existing saved feedback records and treat missing session fields as `legacy`.

### Task 3: Add approval and batch states to the orchestrator

**Files:**
- Modify: `_wip/_WEBSITE_ORCHESTRATOR_20260728.html`
- Modify: `_wip/_feedback/feedback.js` only if the current export needs a status field

- [ ] Add a session card with links for `Open review`, `Open tags`, and `Export ledger`.
- [ ] Add four batch group labels: `Visual`, `Technical`, `Content/fact`, and `Decision`.
- [ ] Add an approval control that is local-only and records the approved session/batch in the review map.
- [ ] Keep approval separate from implementation. Approval authorises the next local edit batch only.
- [ ] Show held sessions without presenting them as ready to integrate.

### Task 4: Create rollback and integration rules

**Files:**
- Create: `_wip/reviews/INTEGRATION_RULES_20260728.md`
- Modify: `_wip/_WEBSITE_ORCHESTRATOR_20260728.html`

- [ ] Define the required pre-edit copy name: `<page>.rollback-<date>-<session>.html`.
- [ ] Record the pre-edit SHA-256 hash, approved session, approved batch, and changed section.
- [ ] Limit each integration batch to one page and one section.
- [ ] Require a post-edit parse, `git diff --check`, link check, H1/alt check, and desktop/mobile visual review.
- [ ] Mark tags closed only after the post-edit verification passes.

### Task 5: Run the first controlled review cycle

**Scope:** Homepage only. Do not edit the other five WIP pages in this cycle.

- [ ] Start with `homepage-hero-02` and `homepage-range-02`.
- [ ] Nate annotates each section at 1440px and 390px in the browser overlay.
- [ ] Export each session ledger and group notes into the four batch types.
- [ ] Apply only the approved batch to `_wip/homepage_real_1_lead_photo.WIP.html`.
- [ ] Create the dated rollback copy before editing.
- [ ] Verify the changed section at both widths and close only verified tags.
- [ ] Repeat for `homepage-ritual-02`, `homepage-founder-02`, `homepage-starter-kit-02`, and `homepage-trust-02`.

### Task 6: Expand to the remaining five pages

**Files:**
- Modify only the named page WIP file for the active session.
- Create one session ledger per page/section under `_wip/reviews/`.

- [ ] Review Shop by navigation, product grid, and product detail.
- [ ] Review Our Story by hero, founder block, and body/CTA.
- [ ] Review Carob Story by hero, education, and CTA.
- [ ] Review FAQ by question grouping, accordion behaviour, and CTA.
- [ ] Review Stockists by finder, results, and coverage framing.
- [ ] Do not integrate held factual, platform, asset, or client-decision items without a separate approval.

### Task 7: Verify the workflow itself

- [ ] Confirm two sessions on the same page do not show each other’s pins.
- [ ] Confirm desktop and mobile tags retain separate viewport values.
- [ ] Confirm exported ledgers contain session, section, viewport, priority, status, category, selector/region, and note.
- [ ] Confirm orchestrator counts match the filtered session records.
- [ ] Confirm no horizontal overflow and no inaccessible annotation controls at 390px.
- [ ] Run `git diff --check` and syntax checks after each implementation batch.

## Approval gates

1. Approve the review map and session names.
2. Approve the overlay/orchestrator workflow changes.
3. Approve each section’s grouped fix batch.
4. Approve integration after desktop/mobile verification.

## Design direction

Keep Maple Moon’s pale blue atmospheric field, moonlit transitions, restrained serif display type, and quiet editorial spacing. The distinctive signature is the section-to-section atmospheric wash: each section should feel like the next part of one evening, not a stack of independent cards. The review interface should stay visually secondary so the page itself remains the focus.

## Completion definition

The workflow is complete when Nate can open one session, annotate one section, export only that section’s notes, approve a grouped batch, review the resulting WIP at 1440px and 390px, and see the corresponding tags marked closed without affecting any other page or session.
