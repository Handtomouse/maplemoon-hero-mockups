# MapleMoon Saturday Feedback Register — 1 August 2026

**Owner:** Codex  
**Final decision owner:** Nate  
**State:** active / coordinator-owned  
**Rule:** Reviewers report evidence; they do not edit source or accept their own work.

## States

`new → triaged → admitted → in_progress → needs_review → accepted`

Alternate states: `blocked`, `rejected`, `superseded`, `deferred`.

## Severity

- `critical`: privacy, consent, indexing/access or materially misleading exposure.
- `major`: visible unfinishedness, broken journey, unsupported public claim, cross-page contradiction or accessibility blocker.
- `minor`: polish invisible to an ordinary reviewer and safe to carry with an owner.

## Current queue

| ID | Page/surface | Section | Severity | Evidence summary | Disposition | Owner | Next gate | State |
|---|---|---|---|---|---|---|---|---|
| SAT-001 | Clean surface | Testimonials | critical | consent-held quotes remain as annotated evidence but the ordinary clean runtime excludes the whole section | clean-exclusion-verified | Nate/Carli | consent receipt before any clean inclusion | accepted |
| SAT-002 | Shared | Navigation | major | clean and annotated routes now expose one shared five-page navigation matrix: Shop, Our Story, What is Carob, Stockists and FAQ; desktop and mobile routes agree | shared-route-matrix | Codex | preserve in derived rebuilds | accepted |
| SAT-003 | Clean surface | Page routing | major | all six ordinary routes use short derived aliases and no clean navigation exposes `.WIP.html` filenames | derived-aliases | Codex | preserve in derived rebuilds | accepted |
| SAT-004 | Homepage/Stockists | Stockist count | major | Nate approved rounded public wording of 200+ from the 204-entry working directory; seven incomplete records remain hidden and the exact count remains internal evidence | approved-rounded-count | Nate/Codex | preserve 200+ until the directory is re-reconciled | accepted |
| SAT-005 | Shared | Cart/commerce chrome | major | Nate approved B1 rollout; ordinary routes add rendered products to a local cart, proceed through review checkout and finish at a fake received state without an order, email, payment or personal-data submission | realistic-review-cart | Nate/Codex | keep B2 authority blocked on CAT-01 | accepted |
| SAT-006 | Homepage/Stockists | Newsletter controls | major | forms perform a local fake submission, discard the address and clearly state that it was not saved | local-review-treatment | Nate/Codex | real submission remains an integration gate | accepted |
| SAT-007 | Shop/Stockists/FAQ | Purchase language | major | Shop products use Add to cart and the complete fake local checkout; shared review purchase links now resolve inside the six-page journey | realistic-local-journey | Nate/Codex | live purchase remains blocked on CAT-01 and Shopify | accepted |
| SAT-008 | Homepage/Our Story/FAQ | Pending content | major | all six clean pages exclude unresolved sections and visible provisional states; annotated routes retain the same evidence for review | clean-exclusion-verified | Nate/Codex | unresolved material cannot re-enter clean without approval | accepted |
| SAT-009 | All six pages | Typekit/rendering | major | runtime asset inventory observed `use.typekit.net` and `p.typekit.net`; `document.fonts.status` was loaded and the expected Typekit families rendered throughout the 36-viewport matrix | typekit-runtime-verified | Codex | keep Adobe Typekit as the only external allowlist | accepted |
| SAT-010 | Homepage/Carob/Shop/Story/FAQ | Public claims | major | prohibited and unsupported wording is absent from clean pages through exact safe reductions or section exclusion; annotated evidence remains; production replacement copy is still approval-gated | clean-claims-treatment | Nate/Codex | exact WIP/production copy remains separately blocked | accepted |
| SAT-011 | Shop | Catalogue/pricing | major | visible product facts cannot be accepted before fresh WooCommerce/catalogue reconciliation | blocked-external | Nate/Codex | CAT inputs and PII/provenance checks | blocked |
| SAT-012 | Stockists | Source notes/incomplete records | major | source notes and incomplete records are absent from clean runtime; annotated evidence is retained; 320–1440 visual checks show count-free controls without overflow | clean-exclusion-verified | Nate/Codex | source reconciliation remains external | accepted |
| SAT-013 | Annotated surface | Review entry | major | annotated index links append `?review=1` to all six short aliases and preserve review evidence | annotated-index-route | Codex | preserve in derived rebuilds | accepted |
| SAT-014 | Share package | `.vercel` metadata | major | rebuilt staging contains no linked-project, team or `.vercel` metadata; checker and direct inventory are clean | packaging-exclusion-verified | Codex | repeat before any approved packaging action | accepted |
| SAT-015 | Share link | OG metadata | major | clean and annotated review pages omit production-shaped OG and Twitter metadata, preventing a misleading public preview | neutral-review-metadata | Nate/Codex | reconsider only for an approved hosted share | accepted |
| SAT-016 | Governance | Validator | major | the frozen validator is now explicitly classified as pre-ratification candidate evidence; normal post-P04 invocation is expected to fail closed, while self-test remains valid; a successor needs separate admission | documented-post-ratification-boundary | Codex | create a successor only before the next control-plane mutation phase | accepted |
| SAT-017 | All six pages | Rendered QA | major | final 36-row matrix passed at 320/375/390/430/1024/1440; a 720px reflow pass also passed; a fresh 1280px clean/annotated pass found zero overflow or broken images and verified all key journeys; the in-app zoom shortcut still produced no measurable scale change and automated Tab stayed on body | runtime-evidence-complete-except-human-keys-zoom | Codex/Nate | human Tab/Shift+Tab/Enter/Space/Escape and exact 200% zoom walkthrough | needs_review |
| SAT-018 | Homepage clean/annotated | Cacao comparison | major | clean review excludes the unsupported comparison section entirely; annotated review retains it behind an explicit evidence-hold notice; re-entry to clean requires attributable MapleMoon-specific and neutral comparison evidence | clean-exclusion-annotated-evidence-hold | Codex | complete the separately bounded read-only evidence packet before any clean restoration | accepted |
| SAT-019 | Homepage/Stockists | Homepage stockist finder | major | Nate approved the compact clean Homepage finder; it accepts store, suburb, postcode or state queries, carries the query into the full directory, excludes incomplete records from clean results and retains the original provisional evidence only in annotated review | working-directory-handoff | Nate/Codex | preserve deterministic build, query handoff and incomplete-record exclusion | accepted |
| SAT-020 | Homepage | Benefit-strip wording | major | Nate approved and the Homepage now renders exactly three badges: `No Caffeine`, `Organic Ingredients`, `Vegan Friendly`; the superseded `Nothing Added` and combined badges are absent from clean and annotated review | exact-three-badge-strip-verified | Nate/Codex | preserve through final human review and later admitted implementation | accepted |

## Settled process locks

- Saturday deliverable is a six-page front-end review package, not a completed Shopify store.
- Audit work may use three disjoint read-only agents.
- Mutating work is one bounded worker per page/file cluster.
- Nate retains subjective, factual, catalogue, audience, send, git, deployment, Shopify, production and final-acceptance authority.
- Visual decision evidence is current-versus-proposed at desktop/mobile with annotations, status, Carli-note mapping and accessibility impact.
- Exact replacement copy requires Nate approval before WIP application.
- Page order is Homepage → Carob Story → Shop → Our Story → Stockists → FAQ.
- No critical or major issues may remain in the Saturday artifact.
- Minor issues may carry only when an ordinary reviewer cannot see unfinishedness.
- Annotated and clean surfaces derive from the same approved page state.
- Ordinary clean review hides unresolved or unsupported material; annotated review retains it as evidence.
- Adobe Typekit is the only accepted external dependency. The package is networked review, not zero-network.
- Cart work is split: B1 realistic local review interaction using existing rendered-card facts; B2 authoritative catalogue binding only after CAT-01.
- Newsletter submissions are fake local interactions; entered addresses are discarded immediately.
- Testimonials remain excluded from clean until Carli confirms permission and attribution.
- Public claim replacements require Nate's exact wording approval.
