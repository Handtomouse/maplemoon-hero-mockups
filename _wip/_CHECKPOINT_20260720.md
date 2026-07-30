# CHECKPOINT - MapleMoon WIP continuation - 2026-07-20

## Scope
- Continue the home, shop and about WIP pages toward the promised 80-90% client review state.
- Fix the starter box sampler price and trust bar details.
- Keep stockists wiring visible in the local tracker.
- No messages sent.

## Done
- Homepage sampler now shows the confirmed starter box pricing: $77.70 struck through, $73.82 current price, 6 bars at 90g each.
- Homepage sampler accessibility label now matches the confirmed price instead of saying price TBC.
- Homepage trust bar now uses the $99 free shipping threshold and links stockists with "70+ locations across Australia".
- Shop sampler banner now repeats the confirmed starter box price so the offer is consistent between home and shop.
- Shop moons, bites and bananas now show `Pricing to follow` with disabled CTAs instead of placeholder prices with active Add to Cart buttons.
- Homepage footer social icons are no longer dead links while Instagram and Facebook URLs are pending.
- Homepage category tabs no longer call `scrollIntoView` on initial load, so the page opens at the hero instead of jumping down to the range dock.
- Section tracker now records the current stockists wiring state: WIP links point to `stockists.WIP.html`; Shopify URL mapping and logo assets remain pending.

## Current blockers
- Real testimonials still pending from Carli and Dylan.
- Moons, bites and bananas pricing still pending.
- Founder photos, social URLs, OG image, stockist logo assets and Shopify collaborator access still pending.
- Carob Story and FAQ remain outside today's home/shop/about focus and are still pending in the tracker.

## Scheduling/status note state

No further outbound needed right now. Nate sent the short appreciative Thursday note in iMessage, and Thursday 7pm was confirmed in the MapleMoon group.

## Next 20-step execution ladder
1. Review homepage hero at 390 and 1440 for first-screen polish.
2. Confirm homepage range carousel has no mobile overlap.
3. Confirm homepage unpriced categories are disabled and honest.
4. Confirm homepage sampler links to the bar range.
5. Confirm homepage trust bar remains three items and wraps cleanly.
6. Keep homepage reviews content-pending until real testimonials arrive.
7. Remove or disable any remaining dead homepage links.
8. Review shop hero, sampler banner and category nav at mobile.
9. Confirm shop bars and elixirs are priced and purchasable.
10. Confirm shop moons, bites and bananas are not purchasable until pricing is confirmed.
11. Check shop card image loading and alt text.
12. Review Our Story hero and chapter flow at mobile.
13. Confirm Our Story founder image is not presented as a portrait.
14. Keep founder portrait need listed as a blocker.
15. Confirm all home/shop/about nav and footer paths stay inside WIP files.
16. Keep stockists links pointing to `stockists.WIP.html` until Shopify URL mapping exists.
17. Run HTML parser checks on edited WIP pages.
18. Run `git diff --check` on edited files.
19. Run the existing WIP browser audit.
20. Update this checkpoint with results and remaining blockers.

## Verification - 2026-07-20
- HTML parser passed for `homepage_real_1_lead_photo.WIP.html`, `shop.WIP.html`, `our-story.WIP.html` and `_SECTION_TRACKER.html`.
- `git diff --check` passed for the edited WIP files.
- WIP browser audit passed for homepage, shop, our-story, carob-story, FAQ and stockists: no console errors, bad requests, missing alt text, small tap targets, mobile overflow or dead links.
- Screenshot pass checked home, shop and our-story at mobile and desktop widths. Homepage desktop load measured at `scrollY: 0` after the range tab scroll fix.
