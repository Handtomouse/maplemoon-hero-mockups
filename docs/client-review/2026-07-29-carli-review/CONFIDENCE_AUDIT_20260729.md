# MapleMoon client-review confidence audit — 29 July 2026

## Scope

Read-only confidence pass after the approved message was sent. This audit covers the client-facing preview, the copied staging package, and the current communication state. No WIP page, Shopify state, production deployment, or client message was changed by this audit.

Reusable checker: [scripts/check-maplemoon-review.py](/Users/handtomouse/maplemoon-website/scripts/check-maplemoon-review.py). Run `python3 scripts/check-maplemoon-review.py --base-url <preview-url>` for the local package checks plus an optional hosted-route probe.

## Confirmed

- The corrected hosted review index opened in the Codex in-app Browser at the approved preview URL.
- The index showed the six canonical pages plus the walkthrough and hero-review support pages: eight cards and eight local links.
- The index title, review heading, WIP disclaimer, and `noindex, nofollow, noarchive` metadata were present; no console errors were reported for the index.
- All six canonical hosted pages loaded at 390x844 and 1440x900 with a page title, expected heading, no horizontal overflow, and the same noindex metadata.
- The client-safe staging package contains 69 copied assets and no asset symlink.
- The staging scan found no named testimonial subjects, internal tracker links, or orchestrator references. Testimonial content is neutral placeholder copy.
- The comms read-back verified the review message in the MapleMoon Design Team iMessage thread at 16:41 AEST. No newer inbound client reply was present at the 16:43 AEST check.
- The reusable checker passed all local checks: 10 HTML files, no symlinks, client-safe metadata, forbidden-content scan, and local references. Its hosted probe returned a warning because shell DNS was unavailable; the in-app Browser remains the hosted evidence surface.

## Evidence boundaries

- Shell DNS could not resolve the Vercel hostname in this environment; the in-app Browser successfully opened the hosted index and canonical routes, so browser evidence is authoritative for this pass.
- `naturalWidth === 0` was observed for some below-fold `loading=lazy` images before their regions were visited. This is not recorded as a broken-asset finding. Full media-load proof still needs a deliberate scroll/interaction pass.
- The local reference checker reports one dynamic hero-video prefix as missing; the page constructs the finalist filename at runtime, so this is a known checker limitation rather than a confirmed 404.

## Remaining gates

1. Carli/Dylan review notes and decisions are still external and not yet received.
2. Testimonials remain blocked until anonymisation or written wording/attribution approval is recorded.
3. Stockist count, pricing, weights, shipping language, and ordering claims still need one authoritative client-approved set.
4. Full below-fold visual/media/interaction QA remains outstanding.
5. The preview is noindex but not password-protected; keep it within the team while review is in progress.

## Confidence

- Message delivery: high.
- Review-index availability and route structure: high.
- Responsive structural pass: medium-high.
- Full visual/media readiness: medium.
- Client-content approval: medium-low pending reply.
- Shopify launch readiness: low until catalogue reconciliation and order-flow testing are complete.

## Stopping point

Wait for the client review response. On arrival, convert it into a page-by-page decision ledger, resolve the content gates, then run one bounded remediation and verification pass.
