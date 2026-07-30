# Maple Moon Live Meeting Tracker

Local WIP only. No message, upload, deployment, commit, push, Shopify change, or public claim is authorised by this tracker.

Last refreshed: 2026-07-24 AEST (current static preflight)

## Meeting Control

- Main review hub: `_wip/_MEETING_INDEX_20260723.html`
- Client walkthrough: `_wip/_CARLI_DYLAN_WALKTHROUGH_20260723.html`
- Review target: strongest possible six-page scroll-through, with factual gaps made explicit.
- Review order: Homepage, Shop, Our Story, Carob Story, Stockists, FAQ, photo candidates, client inputs.
- Shared files remain frozen. Page owners only change their named WIP file after a decision in their own task.

## Current Review Gate - 24 July

- Tracking covers the six working WIP pages: Homepage, Shop, Our Story, Carob Story, FAQ, and Stockists.
- Approval received: Nate gave `approved apply to wip` for all six current WIP page baselines.
- The current named WIP files are now the approved local review sources for Claude's Carli/Dylan review. No additional granular notes were supplied with the approval, so do not invent a new page edit.
- For later feedback, ingest notes verbatim, map each decision to one named WIP file, and separate factual/client dependencies from visual changes before making another edit.
- The approval gate authorises only the agreed WIP application workflow. It does not authorise a client send, deployment, Shopify/DNS/email change, commit, push, asset replacement, or unverified public claim.
- Current static preflight: all six named WIP pages pass scoped `git diff --check` and each contains one source H1. The local preview is currently open in Codex; the execution shell cannot reach port 8795, so its `000` curl responses are not treated as page failures.

## Live Lanes

| Lane | File / review | Current state | Next decision or action | Meeting status |
| --- | --- | --- | --- | --- |
| Homepage | `homepage_real_1_lead_photo.WIP.html` | Approved WIP review baseline: moonlit ocean is dominant; mist is transition-only; the range/Carob seam and inherited range card treatment were removed. | Use as the current local review source; capture any later page-specific feedback separately. | Approved WIP baseline |
| Shop | `shop.WIP.html` | Approved WIP review baseline: opening breakpoint contracts, rail markup, enquiry links, and honest pending states are intact. | Use as the current local review source; retain exact commerce facts and pending states. | Approved WIP baseline |
| Our Story | `our-story.WIP.html` | Approved WIP review baseline: structural pass is in place, with no founder asset bound. | Review the page with Carli/Dylan; founder image, bios, favourites, and portrait choices remain required inputs. | Approved WIP baseline + client inputs |
| Carob Story | `carob-story.WIP.html` | Approved WIP review baseline: denser comparison, tighter pod-to-bar transition, available-looking inactive stages, and 18px mobile gutters. | Use as the current local review source; keep factual guardrails intact. | Approved WIP baseline |
| FAQ | `faq.WIP.html` | Approved WIP review baseline: accessibility/scanability pass is in place, with no new shipping wording or policy claim. | Use as the current local review source; shipping/help/policy content remains a client input. | Approved WIP baseline + client inputs |
| Stockists | `stockists.WIP.html` | Approved WIP review baseline: finder behavior and non-live-map guardrails are intact. | Use as the current local review source; verified public store data and any extra public fields remain separate gates. | Approved WIP baseline + client inputs |
| Photo candidates | `http://127.0.0.1:3102/UFC/spins/maplemoon_lightblue_h212_grade_20260723/07_review/index.html` | Local H212 review package is directly reviewable: overall/warm contact sheets, H212/H216 comparisons, QA report, and repair queue. All 18 candidates previously passed RGB, dimension, hue-band, and protected-pixel checks; #8/#24 edge review plus #63/#73 repairs remain holds. | Review H212 as the primary set; do not replace website assets or select a final image until visual review completes. | Ready for review |

## Client Inputs Still Required

1. Product range, exact names, availability, pricing, and purchase state for non-bar formats.
2. Customer testimonials with exact attribution and public-use permission.
3. Public shipping, returns, allergen, and wholesale wording.
4. Verified public stockist dataset and approval for any detail fields, maps, pins, logos, or contact information.
5. Founder photos, social URLs, and social/OG imagery.
6. Shopify collaborator access and final URL mapping when visual review is approved.

## Update Rule

This tracker is refreshed from the live page and photo tasks during the meeting period. A lane may be marked `Ready for review` only after its owner reports the page-local result and verification; it is not launch approval.
