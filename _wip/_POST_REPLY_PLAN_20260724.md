# Post-reply plan: when Carli & Dylan respond to the 24 Jul review

Review was emailed to info@maplemoon.com.au (in-thread, msg 19f92707d58594df) with the live preview.
Stable alias: https://maplemoon-website-review.vercel.app/review-20260724/start.html
(The client currently holds the immutable o5mvzbqua hash URL; from the next round on, send the alias.)

## When their reply lands, in order

1. INGEST NOTES (Feedback Intake Protocol, per _CLAUDE_HANDOFF_20260723_POST_MEETING.md)
   - Extract each note verbatim; classify visual / copy-fact / content-asset / commerce / decision.
   - Map each visual note to exactly ONE _wip page file. No shared CSS/nav/footer without explicit approval + 6-page review.
   - Record any fact/price/policy/stockist/founder request as a dependency; do not invent.

2. LOCK PRICING (the single biggest open dependency)
   - If they confirm the live retail prices: mark them confirmed (drop "provisional"), and the vercel --prod gate is cleared.
   - If they correct any: update shop.WIP.html only, re-verify against their figures, keep bars/bundle/elixirs/moons/bananas consistent.

3. FOUNDER PHOTO
   - Replace the DRAFT #73 with their chosen/approved frame (or a repaired #73). Remove the "pending your final pick" caption once locked.
   - Bind as an optimised webp in /assets/our_story/ (root-absolute path), never a Downloads/file:// path.

4. CLOSE #743 DEFERRED SHOP GAPS
   - Add Carob Powder 300g $14.95; price Eclipse Bites bundle $24.99.
   - Reconcile bite NAMES: shop says Coconut/Goji/Golden Bites; live + Carli doc say Eclipse Bites (Pecan, Salted Almond, Hazelnut, Goji Ripe, Salted Caramel Fudge). Confirm before pricing.

5. OTHER CLIENT INPUTS the walkthrough asked for
   - Testimonials (attribution + permission), verified stockist data, approved shipping/returns/FAQ copy, founder bios/favourites, social/OG imagery.

6. REDEPLOY + RE-VERIFY + RE-ALIAS
   - Build review-<date>/ from a fresh hash-verified freeze; verify by CONTENT (titles + every image loads), not status codes.
   - Re-point maplemoon-website-review.vercel.app to the new deploy; send the ALIAS this time.
   - Update radar #739 + checkpoint.

## Hard gates (unchanged)
- No vercel --prod until C&D confirm retail pricing.
- No commit/push; dirty checkout preserved; nothing sent without Nate's explicit go.
- Email = info@maplemoon.com.au only; iMessage handled live by Nate.
