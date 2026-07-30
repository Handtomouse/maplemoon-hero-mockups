# MapleMoon website: build plan, now -> Tue 28 Jul Carli meeting

Today = Fri 24 Jul. Meeting = Tue 28 Jul (CARLI only; Dylan away Fri 24 -> ~Thu 30).
Review is OUT (both links land on the verified review). Goal: keep the build moving on the
design/structure side while C&D's content + copy notes come in, so Tue 28 shows real progress.

## Execution model (unchanged)
- Codex lane on ~/maplemoon-website/_wip, branch staging-direction-a-twyg. Page-local edits, one lane per file.
- No shared CSS/nav/footer without an explicit all-6-page review. Dirty checkout preserved. No commit.
- Verify by CONTENT (titles + every image + raw-status), never status codes/samples/greps. Re-verify deploy after edits.
- HARD GATE: never vercel --prod until C&D confirm retail pricing.
- If C&D reply with notes: run _wip/_POST_REPLY_PLAN_20260724.md (Feedback Intake Protocol) first.

## BUILDABLE NOW (no client reply needed) - do these
1. Shop gaps (radar #743): add Carob Powder 300g $14.95 + Eclipse Bites bundle $24.99, and add the 5 individual
   Eclipse Bites at $5.99-$59.99 (names ARE confirmed in Carli's 19 Jul doc: Pecan Nut, Salted Almond, Hazelnut,
   Goji Ripe, Salted Caramel Fudge). Reconcile the shop's placeholder bite names (Coconut/Goji/Golden) to these.
2. Two pending hero decisions (Nate's calls): keep/strip the "Discover Our Story" 2nd CTA; keep/revert the dark
   creds pill. Decide, then apply page-local.
3. "Made in Brunswick Heads" copy: remove from the story/farm page (13 Jul decision), broaden to Australian/NSW
   far-north-coast. Page-local, no client input needed.
4. Founder photo: swap the raw #73 draft for the staged H212 (assets/our_story/founders_portrait_h212.webp),
   drop the "draft direction" caption once swapped. (Interim; final pick still a client input.)
5. Hover-hue panel styling: roll cohesively across all 6 pages. SHARED change -> review impact on all six first.
6. Photo grade finish (radar #661/#668): lock the natural-blue variant, roll across the shortlist frames, apply to site.
7. Wave 1 inner-page a11y: verify it is complete across the 5 inner pages; finish any gaps.
8. Full page polish + QA for the walkthrough: 390px + 1440px on all 6, no overflow, images load, pricing correct.

## CLIENT-BLOCKED (park until C&D reply; do NOT invent)
- Per-page copy notes (their review feedback) | testimonials + attribution/permission | verified stockist data (71 -> ~300)
- shipping/returns/policy FAQ wording | founder final photo pick + bios/favourites | Shopify collaborator access (Shopify port)
- press "as seen in" logos + the podcast video clip | retail-price CONFIRMATION (locks all prices, clears the --prod gate)

## Suggested cadence
- Fri 24 (today): items 1, 2, 3 (shop gaps, hero calls, Brunswick copy).
- Sat 25 - Sun 26: items 4, 5, 6 (founder swap, hover-hue rollout, photo grade). Fold in any C&D notes if they land.
- Mon 27: item 7 + 8 (a11y + full QA), re-verify the deploy by content, refresh the review link.
- Tue 28: Carli meeting - walk the 6 pages, capture her notes, agree next steps + remaining client inputs.

## State pointers
- Canonical call notes: clients/maplemoon/meetings/call_notes_20260723_2001_CANONICAL.md
- Post-reply plan: _wip/_POST_REPLY_PLAN_20260724.md | Pricing spec: _wip/_PRICING_EDIT_SPEC_20260724.md (+ followup)
- Radar: #739 review delivered | #478 INV-0424 sent | #743 shop gaps
- Review link: maplemoon-website-review.vercel.app/review-20260724/start.html (also o5mvzbqua full path)
