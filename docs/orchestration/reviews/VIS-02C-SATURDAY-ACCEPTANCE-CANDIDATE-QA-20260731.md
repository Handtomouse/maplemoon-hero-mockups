# VIS-02C Saturday Acceptance Candidate QA

**Date:** 2026-07-31  
**Coordinator:** Codex  
**Decision owner:** Nate  
**State:** conditional pass / `needs_review`  
**Candidate:** local six-page clean and annotated Saturday review package  
**Not authorized:** commit, push, deployment, send, upload, Shopify, WooCommerce or production action

## Source state

- repository: `/Users/handtomouse/maplemoon-website`
- branch: `codex-maplemoon-section-review`
- HEAD: `a6cd91a`, `docs(governance): reconcile GOV-01 control records`
- canonical WIP remained outside this acceptance-candidate mutation
- existing dirty worktree was preserved

## Deterministic checks

| Check | Result |
|---|---|
| `npm run review:saturday:build` | PASS |
| `npm run review:saturday:check` | PASS, zero failures and warnings |
| `npm run review:saturday:cart` | PASS |
| `node scripts/check-maplemoon-homepage-motion.mjs` | PASS |
| builder negative self-test | PASS |
| `git diff --check` | PASS |

The aggregate manifest remains deliberately `share_ready: false` until Nate completes the human gates and ratifies the exact candidate and audience.

## Fresh rendered evidence

All six clean aliases were rendered at the in-app Browser's 1280 by 720 viewport.

| Page | One H1 | One main | Skip route | Horizontal overflow | Broken images | Visible unfinished signal |
|---|---:|---:|---:|---:|---:|---:|
| Homepage | yes | yes | yes | no | 0 | none |
| Carob Story | yes | yes | yes | no | 0 | none |
| Shop | yes | yes | yes | no | 0 | none |
| Our Story | yes | yes | yes | no | 0 | none |
| Stockists | yes | yes | yes | no | 0 | none |
| FAQ | yes | yes | yes | no | 0 | none |

Expected fonts reported loaded on every clean page.

Every annotated page rendered its review banner with section dots:

- Homepage: 15;
- Carob Story: 10;
- Shop: 12;
- Our Story: 14;
- Stockists: 7;
- FAQ: 7.

No annotated page had horizontal overflow or broken images.

## Journey checks

### Homepage to Stockists

- query: `Byron Bay`;
- handoff URL included `stockists.html?q=Byron+Bay`;
- the full finder prefilled the query;
- six confirmed results rendered;
- zero incomplete results were visible.

### Shop cart

- 20 visible review products expose `Add to cart`;
- the first product added to the local cart;
- the review checkout collected no personal information;
- the fake received state confirmed that no order, email or payment was created.

### FAQ

- query: `stockists`;
- one matching answer rendered;
- the accordion opened with `aria-expanded="true"`;
- the answer linked to the full Stockists finder.

## Visual review observations

- Homepage: cohesive hero and review rhythm; the stockist mini-finder is technically accepted and Nate-approved.
- Carob Story: clear educational opening and comparison hierarchy; process-dependent material remains excluded.
- Shop: coherent range, sampler, filters and purchase affordance; product authority remains CAT-blocked.
- Our Story: clear founder-led hero; emotional pacing and portrait preference remain Nate decisions.
- Stockists: search and filter hierarchy is clear without map behavior or incomplete records.
- FAQ: search, popular questions and accordion hierarchy are clear.

These are independent observations, not subjective locks.

## Human-only evidence still open

The in-app Browser did not provide reliable evidence for the two remaining checks:

1. pressing the browser zoom shortcut twice left `innerWidth`, `innerHeight`, device pixel ratio and visual viewport scale unchanged, so exact 200 percent zoom is not claimed;
2. automated Tab input remained focused on `BODY`, matching the prior tool limitation, so a full physical Tab, Shift+Tab, Enter, Space and Escape traversal is not claimed.

Nate must complete those checks in the visible browser and approve the subjective design of all six exact pages.

## External gates

- Carli's exact public replacement wording remains approval-gated.
- The Canva benefit-strip difference is registered as `SAT-020`.
- CAT-01 remains blocked on a fresh WooCommerce export and approved retail catalogue.
- No hosted audience, deployment or send is admitted.

## Candidate disposition

Technical and interaction evidence passes. The package remains `needs_review` and `share_ready: false` until:

- literal 200 percent zoom passes;
- the full physical keyboard walkthrough passes;
- Nate locks the six page designs;
- Nate ratifies the exact artifact and audience.
