# Pricing follow-up spec (2026-07-24, pass 2) - CORRECTED after visual + code review

Second page-local pass, `_wip/shop.WIP.html` ONLY. Same rules as pass 1:
one lane, no shared CSS/nav/footer, dirty checkout preserved, nothing deployed/committed/sent.
Pass 1 (homepage price-strip + shop moons/bananas) is DONE and verified. Do not redo it.

## IMPORTANT mechanism note (this is why the first draft of this spec was wrong)
"Pricing to follow" is currently a CATEGORY-level flag, not per item:
- L334: `var PRICED={bars:true,elixirs:true,moons:true,bites:false,bananas:true};`
- L339: `var priced=!!PRICED[cat];`
- L344 renders `p.price` + "Ask about this item" when priced, else the `.pending` style + a disabled
  "Pricing to follow" button.
So simply editing an item's price string will NOT produce the pending treatment. A one-line
renderer change is required (below).

## Changes

1. Enable PER-ITEM pending. Change L339 from:
   `var priced=!!PRICED[cat];`
   to:
   `var priced=!!PRICED[cat] && !p.pending;`
   This keeps every existing category behaviour identical and lets a single item opt out.

2. Moons array (L310-315). Keep all 6 entries. On `Pure Carob Moon` (L310) and `Cayenne Moon` (L314)
   add `pending:true` (they are real production SKUs but are NOT sold on the live store, so their
   price would be inferred). Leave their price strings in place; the renderer will ignore them.
   The other 4 keep the verified live ladder `1 $2.50 / 5 $12.19 / 10 $23.75 / 20 $44.99`.

3. Sizes -> live per-unit values. TWO places, not one:
   - L266 section copy: "Hand-moulded 40g crescents." -> "Hand-moulded 12g crescents."
   - L310-315: `size:'40g'` -> `size:'12g'` on all 6 moon entries.
   - L330 bananas: `size:'80g'` -> `size:'20g'`.

4. Eyebrow status line L238 currently reads "Bars, moons, elixirs & bananas priced · bites pricing to
   follow". With 2 moons now pending, reword so it stays true, e.g. "Bars, elixirs & bananas priced ·
   some moons & bites pricing to follow". Keep it factual.

## Do NOT in this pass
- Do not add Carob Powder 300g ($14.95) or price the Eclipse Bites bundle ($24.99). Deferred (radar #743).
- Do not touch bars, the 6-bundle, or elixirs. They already match live.
- Do not touch the homepage; pass 1 is complete.

## Separate flag for radar #743 (do not action here)
The bites entries (L318-320) are named "Coconut Bites", "Goji Bites", "Golden Bites". The real range
per the live store + Carli's 19-Jul doc is Eclipse Bites in Pecan Nut, Salted Almond, Hazelnut,
Goji Ripe and Salted Caramel Fudge. Names need reconciling with the client before pricing them.

## Verify
`python3 -m html.parser` + `git diff --check` on shop.WIP.html, plus a 390px/1440px check.
Note: use a real device-emulation check for 390 (Codex in-app browser or Chrome device mode).
A plain headless window at 390 does NOT emulate a device and clips instead of reflowing.
Prices remain provisional pending Carli & Dylan confirmation.
