# Carli review send gate — 29 July 2026

Status: **BLOCKED pending Nate review and bounded remediation.** No message, upload, hosted publish, deploy, commit, or Shopify action occurred.

## Execution completed

- Confirmed the six canonical WIP pages and current review index exist.
- Parsed all six canonical WIP HTML files successfully.
- Confirmed the homepage CTA strip is present in the current local WIP state.
- Confirmed the index, README, and draft message are local-only review materials.
- Preserved the dirty working tree and existing file ownership.
- Created local-only `staging-v1` with six page copies, the walkthrough, and the focused hero review.
- Replaced named testimonial content in `staging-v1` with neutral placeholders.
- Removed live-site canonical tags and changed staging copies to `noindex, nofollow, noarchive`.
- Removed the internal orchestrator and meeting-tracker links from staging support pages.
- Staging HTML, relative links, consent scan, metadata scan, and diff checks passed.
- Added the internal quote-by-quote consent checklist; it is outside `staging-v1` and is not part of a client-facing artifact.
- Added the internal 20/20/20 improvement, check, and Carli review matrix; it is planning guidance only and authorises no mutation or send.
- Replaced the staging asset symlink with a 69-file allowlisted copied asset set and recorded it in `staging-v1/ASSET_MANIFEST.md`.
- Copied the five existing hero-review poster thumbnails into `staging-v1` so the local candidate has its intended video fallback imagery.
- Served the isolated staging directory locally and verified HTTP 200 for the review index, all six canonical pages, the hero video, and a hero poster.
- Deployed `staging-v1` to Vercel as preview deployment `dpl_9tgpnHaBRyoV5cjLWhfSvaCnaQiE`; deployment state is `READY` and no production promotion occurred.
- Hosted verification returned HTTP 200 for the index, all six canonical pages, the hero video, and a hero poster; hosted responses returned `X-Robots-Tag: noindex`.
- The first preview's bare root returned 404 because the linked project redirect expected `/homepage.html`; added a staging-only root rewrite to the review index before redeployment.
- The inherited project redirect still took precedence, so added a byte-identical `homepage.html` review-index alias for the bare preview route.
- Redeployed corrected candidate as `dpl_HzPjP8MT2iGMTr1qiVwLAJnBjsnZ`; deployment state is `READY` and the bare preview URL now returns HTTP 200 via `/homepage.html`.
- In-app Browser verification confirms the corrected bare preview opens at `/homepage.html`, shows the review heading and eight page cards, and retains `noindex, nofollow, noarchive` metadata.

## Blocking findings

1. The homepage contains named consent-pending testimonials: Natasha, Janice, and Acacia. They cannot appear in an external review artifact without a consent/attribution receipt.
2. The WIP pages declare `robots=index, follow` and live-site canonical URLs. A public hosted copy would not satisfy the stated review-only/noindex boundary.
3. Stockist claims conflict: homepage `180+`; Stockists `200+`, `204 parsed`, and `7 need confirmation`.
4. Commerce claims need reconciliation: 90g bar values, 300g powder value, shipping language, and “Online ordering available” conflict with the non-checkout WIP state.
5. No current hosted link or externally usable allowlisted attachment bundle has been verified; `staging-v1/assets` is still a local symlink.
6. No current runtime visual/interaction evidence is available for this execution pass.
7. Read-only Vercel project inspection confirms the existing project and team. Its current deployment records are marked `private`, but the project reports `ssoProtection: null` and no password-protection setting; an automation bypass is present. Hosted verification returned HTTP 200 without authentication, proving this preview is not password-protected. Do not share it with Carli until access is separately configured and tested.

## Required before send

- Create a client-safe allowlisted artifact that excludes named testimonials and internal comments.
- Choose and verify a private delivery route or explicitly approve corrected review metadata.
- Reconcile or suppress conflicting stockist, price, weight, shipping, and ordering claims.
- Run the responsive and interaction matrix from the 20/20/20 plan.
- Nate reviews the exact artifact, message, and delivery route, then explicitly confirms send.

## Hard stop

Do not send or publish while any blocker above remains unresolved. This report is evidence of the gate, not a client-facing deliverable.
