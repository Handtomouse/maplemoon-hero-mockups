# Pricing edit spec: incoming meeting note (2026-07-24)

For the maplemoon-website WIP session. Apply under the Feedback Intake Protocol in
`_CLAUDE_HANDOFF_20260723_POST_MEETING.md`: page-local only, one lane per file,
NO shared CSS/nav/footer, dirty checkout preserved, nothing deployed/committed/sent.
Prices are provisional pending Carli & Dylan confirmation (Decision A). Treat as WIP, not launch.

## Source of truth: live WooCommerce store (verified 2026-07-23/24)
`GET https://maplemoon.com.au/wp-json/wc/store/v1/products` (+ `?type=variation&parent=<id>`)

| Product | Live retail (sale, and "was" if on sale) |
| --- | --- |
| Carob Bar 90g (all 6 flavours) | 1 $12.95 / 2 $25.25 / 5 $61.51 / 10 $116.55 |
| Carob Bars Bundle 6x90g | $73.82 (was $77.70) |
| Carob Crescent Moon 12g (4 flavours) | 1 $2.50 / 5 $12.19 (was $12.50) / 10 $23.75 (was $24.99) / 20 $44.99 (was $49.99) |
| Carob Coated Bananas 20g (id 2432) | 1 $2.99 / 5 $14.25 (was $14.99) / 10 $26.99 (was $29.99) / 20 $50.99 (was $59.99) |
| Eclipse Bite Bundle 5x50g | $24.99 |
| Carob Powder 300g | $14.95 |
| Shipping | standard $16.95; free over $99 |

Naming: live "Carob Crescent Moon" = WIP "moons"; live "Eclipse Bites" = WIP "bites".
All tiers now confirmed. No further live read needed before editing.

## Cross-check vs Carli's 19 Jul content doc (`~/UFC/ops/handoffs/handoff_20260719_mm_carli_doc_content.md`)
Client-authored; CONFIRMS the live store, with these notes:
- 10-bar: Carli's doc typo'd `$116.95 (10% off)`; 10% off $129.50 = **$116.55** (live). Use $116.55, not $116.95.
- 5-bar: Carli $61.50 vs live $61.51 (1c rounding); use live $61.51.
- Elixirs $23.95 (Pure) / $26.95 (Spiced): **CLIENT-CONFIRMED in Carli's doc** (not just provisional).
- Carli's doc also lists 5 individual Eclipse Bites at $5.99-$59.99 each (only the bundle is live) + a Coconut Goji bar free-ship-over-$150 rule. Out of this spec's two edits; note for a later pass.

## Resolved decisions (Nate)
- A: Use live prices now, provisional pending C&D confirm (supersedes the stale 13-Jul "live = wholesale" note).
- B: Elixirs $23.95 (Pure) / $26.95 (Spiced) - CONFIRMED in Carli 19-Jul doc (not on live store, but client-authored).
- C: Moons + bananas SHOWN with live prices (overrides the call's "hide until new packaging").

## Edit 1: `homepage_real_1_lead_photo.WIP.html` (lane: homepage)
Call decision: NO prices on the explore/range walkthrough (prices live on the shop only).
Remove the per-product price displays from the explore band:
- Sampler price block ~L897-899 (`sbox-price` aria-label + `sbox-was $77.70` + `sbox-now $73.82`): drop the numbers, keep the box/CTA.
- Bar cards ~L949-954 (`price:'$12.95'`): remove the price field.
- Elixir cards ~L964-965 (`price:'$23.95'` / `'$26.95'`): remove the price field.
- Bulk ladder ~L985-987 (single $12.95 / 5 $61.50 / 10 $116.95): remove the whole block (the $116.95 error and missing 2-bar tier disappear with it).
- KEEP the free shipping over $99 line ~L910 (value prop, not a product price).
Verify: `python3 -m html.parser`, `git diff --check`, 390/1440 spot-check of the explore band.

## Edit 2: `shop.WIP.html` (lane: shop)
Prices live here (call decision). Two things only:
- NO change to bars (single $12.95 L302-307), 6-bundle ($77.70 -> $73.82 L246), elixirs ($23.95/$26.95 L326-327): already match live retail / kept per Decision B. Do not touch them.
- Unhide moons + bananas (Decision C): surface them out of the current pending/hidden state (`.pr.pending`, L69-70) with the live ladders above (moons $2.50 to $44.99; bananas $2.99 to $50.99). Do NOT imply new packaging is ready; use existing/approved imagery only.
Verify: `python3 -m html.parser`, `git diff --check`, 390/1440 spot-check of the shop grid.

## Do not
Deploy, commit, push, send to client, change shared CSS/nav/footer, reset/clean the dirty checkout,
or treat these prices as final before C&D confirm. Update `_LIVE_TRACKER_20260723.md` only on a material change.
