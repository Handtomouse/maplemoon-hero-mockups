# MapleMoon coordinator checkpoint, Thu 20 Aug 2026

Branch: `docs/registry-authority-20260819` (contains `staging-direction-a-twyg`, 107 ahead).
Codex gate: clear at session start. No codex pid cwd-in-repo, no rollout touching `_wip/` in 15 min.
Working tree at start: 1 modified file, 0 untracked.

## Merged and verified
`c6b6600 feat(shop): merge Bites into Eclipse Bites per Carli ruling 19 Aug`

The Bites build existed uncommitted in the working tree since 19 Aug 17:55. Now pinned.

- pre  sha256 `b444b0da...` matches `UFC/ops/qa/mm_bites_removal_20260819/shop.WIP.html.pre-bites-20260819`
- post sha256 `18f5e444...` matches the live file, unchanged by the commit
- diff is exactly 2 lines: nav L291 and section h2 L308, `Bites & Eclipse(s)` to `Eclipse Bites`
- products unchanged: 5 individual Eclipse Bite SKUs plus 1 bundle, reconciling with Carli's
  "the eclipse bites range has 5 SKUs"
- verify: HTMLParser parse OK, `git diff --check` clean, 0 em dashes, 0 "vibe"

## Email reconciliation, all four content emails read
Mail store, account E00D516A, `All Mail.mbox/.../Data/8/1/1/Messages`:
- `118047` Website Edit HOME PAGE, carlisaber@hotmail.com, 14 Aug 04:53 UTC
- `118043` Shop PAGE, carlisaber@hotmail.com, 14 Aug 05:57 UTC
- `118030` Our Story : NEEDS WORKS, info@, 15 Aug 08:55 AEST
- `118027` PAGE: WHAT IS CAROB, info@, 15 Aug 09:11 AEST

No date conflict with the brief. 14 Aug 23:11 UTC is 15 Aug 09:11 AEST, same message.

Batched already-built check across shop, homepage and our-story WIP: **every unambiguous
instruction in the three in-scope emails is already present in the WIP.** Nothing was queued or
reapplied. The fourth email, PAGE: WHAT IS CAROB, targets `carob-story.WIP.html`, which the spec
puts out of scope. It was read and its state recorded below, not applied.
Confirmed absent as she asked: "catalogue preview", "View range", "hand-moulded", "nightcap that
behaves", "a pod, not a bean", "actually", "when do you moon", "shared story", "individual notes",
"in their own words", "asked a different question", "the craft".
Confirmed present as she supplied: "nightcap with benefits", "Spray Free", "Little bite sized
treats", "crescent of pure carob", "Ayurvedic", "only two ingredients", "high in fibre",
"What is Maple Mooning?" (markup-split at L915), the 01/02/03 ritual tiles, "Born in Bondi".
Our Story chapters are already 01 "The people behind the product" and 02 "How Maple Moon began",
section 03 the place is already removed, and "The Range" is already a link to shop (L370).

## Not applied, deliberately
Bar/flavour order. The two emails contradict each other 64 minutes apart:
- Shop PAGE: "pink, red, **green, yellow**, blue, brown"
- HOME PAGE: "Pink, red, **yellow, green**, blue, brown"
Positions 3 and 4 are swapped and neither is rainbow order. Repo history already shows
`c3c6694 fix(shop): preserve client-specific flavour order` then `6518f01 revert(shop): preserve
unmapped flavour order`, so this has been changed and reverted once. Blocked pending her ruling.
Her home email also bundles a second, separate ask: which bar the hero starts on.

## Blockers
- Our Story body copy. She deleted without replacing. No replacement prose exists. Not writable.
- Our Story typography defect. She reported "Carli and Dylan: The font is different". Needs a
  visual check at 1440 and 390 to locate and confirm before any fix. Not yet resolved.
- Images. Every "too AI" / "where are the ones from the shoot" / "needs to change and match" /
  "remove background" ask is an asset-delivery blocker. She offered to send photos twice, in both
  emails, and nobody has answered.
- Founder photos. Every founder asset shipped is a crop of one frame, Heros-73.
  Alternatives on disk: 70 raw frames in `~/Downloads/wetransfer_website-hero-raws_2026-06-03_1315`
  and 69 in `~/UFC/clients/maplemoon/deliverables/hero_raws_ORIGINAL_wetransfer_20260603`.
  None generated. Selection is a human pick.
- Thread 741, Dylan cPanel/DNS. Asked by iMessage 24 Jul 19:17, verified sent, no answer in 27 days.
  Two things owed: cPanel/DNS access, and the list of live @maplemoon.com.au mailboxes.
  Mail is self-hosted on cPanel, MX `mail.maplemoon.com.au`, IP `192.185.170.126`. Only info@ is
  confirmed from mail history. DNS and email-continuity testing blocked until both arrive.
  New datapoint: Carli uses `carlisaber@hotmail.com`, which is not on the cPanel.
- Thread 924, V9 classifier threshold. Stalled since 14 Aug 08:04, 6 days, no recommendation.
  `CONTROL_frame15` is green: `max_abs_diff 0, n_differing_px 0`.
  `combo.json` holds 7 keys covering only frames 63 and 66 at k0/k4/k8.
  `THRESH_ART` is 10 frames; 8 are unswept: 08, 21, 23, 26, 41, 43, 55, 60.
  9 delivery heroes carry threshold artifacts. The lane cannot pick a `(lo,hi,k)` on this data.

## Out of scope, flagged not built
Contact page with a name and message form; Wholesale account in the footer. Both new surfaces.

`carob-story.WIP.html` is outside the scope list, so nothing was applied there. State only, for
whoever owns that page: her "from the grove" wording and "roasted character" are already gone, and
her supplied "completely different plants" blurb is already in. Two items are still outstanding on
that page: the word "FEATURE" still appears 4 times, and the FAQ block she asked to remove is still
present. Her carob edits that also land on the in-scope homepage comparison panel are already
built verbatim: "Naturally bitter" and "Contains caffeine and theobromine".

## Open questions for Carli, none inferable
1. Bar order, quoting both her strings back.
2. Coconut Carob Bites: on the live site, zero counterpart in WIP. Neither email mentions it.
3. Label: "Eclipse Bites" as built, or plain "Eclipse". Two-string revert either way.
4. Will she send the real product and banana photos she twice offered.
5. The studio images. She wrote that they feel random and out of place at the end of Our Story
   and wondered about using them earlier or keeping just one to break up text, ending "I don't
   know". Explicitly her call, not a defect to action.
6. Her four open asks awaiting Nate: what "FEATURE" means on the carob page; whether more smiley
   non-AI founder frames exist; whether Our Story section 03 belongs; is "How it all began" 01 or 02
   (already built as 02, which matches her own suggestion).

Nothing sent. No client comms drafted or issued. Invoicing untouched.

---

# BUILD SESSION, same day, mode changed from report to build

Nate: stop blocking on small things, log them and keep moving. Scope expanded to
include carob-story, a contact page and the footer.

## Built and verified
- `84bee4d` carob-story: visible "FEATURE" removed from the comparison divider and
  the table header, header keeps a visually hidden label for screen readers.
  Cacao column now reads "Cacao powder" in header, specimen label and all four
  mobile data-labels. Her other carob edits were already live.
  The FAQ block she asked to drop was already out of the body. Only dead `.faq`
  CSS remains, inside minified media queries, left alone deliberately: zero
  visual effect, non-trivial breakage risk.
- `a6062a1` new `_wip/contact.WIP.html`, plus Wholesale and a real Contact link in
  the footer of all five existing pages. Shopify-native field names. No endpoint
  invented; the form does not post and says so.
- `4ca4c47` contact: page background fixed, grid overflow guards.
- `8a23953` our-story: visible "Tone rewrite pending Carli's copy" chip.
- `841b934` then `e1c4ab0` bar order.

## Bar order, the correction that matters
First pass mapped colours from the shop swatch hex chips. That was wrong.
Measured off the real pack artwork instead:
  almond   rgb(197,157,110) hue 32.4 sat 42.9%  desaturated tan  = brown
  hazelnut rgb(217,171,79)  hue 40.0 sat 64.5%  saturated gold   = yellow
Final order goji, cayenne, hazelnut, peppermint, pure, almond.
Caught by rendering the proof, not by reading CSS. Swatch chips are not the pack.

## Assumption logged, still needs Carli
Built the HOME PAGE sequence on instruction. Note the premise was inverted in the
brief: Shop PAGE (05:57 UTC) is the LATER email, not HOME PAGE (04:53 UTC), so
"latest wins" would select the other order. Two strings either way.

## Testing note worth keeping
Chrome headless clamps its viewport to a 500px minimum. `--window-size=390`
lays out at 500 and crops the image to 390, which fakes a horizontal overflow on
any page. Confirmed with a control page reporting clientWidth 500. Use 500 or
wider, or real device emulation. A previous "mobile overflow" finding made this
way would be a false positive.

## Founder photos
Contact sheet of all 70 frames: `~/UFC/ops/qa/mm_founder_contactsheet_20260820/index.html`
Frames 73 and 74 are absent from both raw deliveries, yet every shipped founder
asset is a crop of Heros-73. That frame reached us by some other route. Nothing
generated. Selection is Nate's, then Carli's.

## Font mismatch, investigated, no fix made
Her note "Carli and Dylan: The font is different". All WIP pages load the same
Adobe kit dvz0xjs. Every heading on our-story resolves to p22-mackinac-pro via
explicit rules, including both founder h3s. `.amp` is undefined site-wide and
inert. The only variation is the deliberate italic on the ampersand. Checked at
pixel level too. No defect found, so nothing was guessed at. Needs her to point.

## Visual proof
`~/UFC/ops/qa/mm_build_proof_20260820/index.html`

---

# COORDINATOR PASS 2, same day, afternoon

Codex gate: CLEAR, and worth recording how. A codex session IS live (pid 21154, started
13:35) and its rollout log matches `_wip/`. It is a false positive: cwd is `/Users/handtomouse`,
not the repo, and the `_wip/` hits are its own *exclusion globs*. Its brief reads
"Do not touch: the maplemoon-website repo, `_wip/`, or `docs/shopify/`. Other lanes own those."
It is running the V9 classifier threshold sweep. Write mode was correct.
Future gates should read the match context, not just the match count.

## Named build scope was already complete
carob-story (84bee4d), contact page (a6062a1, 4ca4c47, 0c179b6, fc50ed8) and the Wholesale
footer (a6062a1) were all built this morning. Verified against live files, nothing reapplied.
The 70-frame founder contact sheet also exists and is complete:
`~/UFC/ops/qa/mm_founder_contactsheet_20260820/index.html`, 70 `<img>` entries.

## Built this pass

`83b8ae5 fix(contact): drop the unbacked POST, add a no-JS fallback`
The form carried `method="post"` with no `action`. With JS the handler calls
`preventDefault()`, confirmed in a real browser. Without JS it would have self-posted,
reloading the page and silently discarding everything typed while looking like a send.
Removed `method`, added a `<noscript>` notice pointing at info@maplemoon.com.au.
No endpoint invented.

`0627cd2 fix(faq): bring the footer into line with the other five pages`
`faq.WIP.html` was the single page the a6062a1 footer rollout missed. It had a
self-referential FAQ link and neither Wholesale nor Contact. All five WIP pages with an
`sp-ft` footer now carry an identical link set.

## Verify evidence
- HTMLParser parse OK on both files; `git diff --check` clean.
- Chrome over CDP against a local server rooted at `_wip` then repo root, port 3211.
  JS on: submit leaves the URL unchanged, retains field values, shows the
  "Sending is not connected yet" status.
  JS off (`Emulation.setScriptExecutionDisabled`): no `method` attribute present,
  noscript notice renders.
- faq and contact at 1440 and 390: `clientWidth` correct, no horizontal overflow,
  zero `a[href="#"]`, footer reads Shop, Our Story, Stockists, Wholesale, Contact.
- Use `Emulation.setDeviceMetricsOverride`, not `--window-size`. It gives a true 390px
  viewport and avoids the 500px clamp recorded in pass 1.

## Checked and found clean, no action taken
- **Em dashes.** 26 occurrences across carob-story and homepage, and **zero are visible**.
  All sit inside `<style>`, `<script>` or comments. A raw `grep -c` overstates this badly.
  The `–` in `price:'$5.99–$59.99'` is an en dash, correct range typography, not a defect.
- **Prices. Nothing changed in this pass.** Price provenance was still unresolved at the time.
  CORRECTION to an earlier line here: `$5.99`-`$59.99` is the **Eclipse Bite** range, not the
  bar range. Bars are $12.95 for one 90g bar. See pass 3 for the resolved position.

## FAQ page is orphaned, pre-existing, flagged not fixed
No WIP page links `/faq.WIP.html` except faq itself, which marks its own utility nav with
`aria-current="page"`. The other five pages have never linked FAQ from footer or header.
So the FAQ page currently has no inbound route from anywhere in the WIP set.
This predates today and was not introduced here. The footer fix above deliberately keeps
faq's own FAQ link rather than swapping it out, so nothing regressed. Whether FAQ should be
promoted into the shared footer or nav is a routing decision for Nate.

## Not done, deliberately
`faq.WIP.html` header nav still points "What is Carob" at
`/homepage_real_1_lead_photo.WIP.html#carob` while carob-story, contact, shop and stockists
all point at `/carob-story.WIP.html`. Retargeting is a routing decision on a page the spec
fences off, and there is no evidence which destination is intended for FAQ readers.
Left alone, raised as a question.

## New question for Nate, not inferable
The shop data carries a **1 / 5 / 10** pack ladder ("1 $2.50 / 5 $12.19 / 10 $23.75") for the
crescents. The Shopify correction describes the five products as variable on a **1 / 6 / 12**
ladder, 6-pack $32.99, 12-pack $59.99. Two different pack structures, and the price source is
already disputed between the 13 Jul brief and the 17 Aug ledger. Nothing was changed.

---

# COORDINATOR PASS 3, pricing unblocked

Nate resolved price provenance: **the WooCommerce export governs and is retail truth.** The
13 Jul "do not scrape, it is wholesale" warning is superseded.

Also resolved, and it retires the earlier scare: **35.99 / 71.99 are the `Regular` column and
32.99 / 59.99 are the `Sale` column of the same variations.** Sales are open-ended, no start or
end date, so Sale is the live price and Regular is the compare-at. There was never a risk of
silently raising prices. It was a column confusion.

## Governing source, re-derived here rather than relayed
`/Users/handtomouse/Downloads/Maple Moon Store CSV File Export.csv`
sha256 `eeea19fd89b30052bd4c…`, matching the hash pinned in the 16 Aug ledger. 119 rows,
20 variable + 91 variation + 8 simple.

**There are FOUR pack ladders, not two.** Parsed directly from the CSV:

| Line | Ladder (effective / compare-at) |
|---|---|
| Bars 90g | 1 $12.95 / 2 $25.25 (was $25.90) / 5 $61.51 (was $64.75) / 10 $116.55 (was $129.50) |
| Crescent Moons 12g | 1 $2.50 / 5 $12.19 (was $12.50) / 10 $23.75 (was $24.99) / **20 $44.99** (was $49.99) |
| Eclipse Bites 50g | 1 $5.99 / 6 $32.99 (was $35.99) / 12 $59.99 (was $71.99) |
| Carob Bananas 20g | 1 $2.99 / 5 $14.25 / 10 $26.99 / 20 $50.99 |

Simples: Eclipse Bite Bundle $24.99, Carob Elixir $23.95, Spiced Carob Elixir $26.95,
Carob Powder 300g $14.95, Bundle of 6 Bars $73.82 (was $77.70).

Do not normalise these ladders together. They are genuinely different product lines.

## Full reconciliation: every existing WIP price already matched the export
All 22 shop products checked value by value. Zero wrong prices. Nothing was rewritten.
The `$5.99–$59.99` string uses an en dash and is correct range typography.

## Built this pass

`d4a8eb0 fix(shop): correct the Eclipse Bite pack ladder against the Woo export`

The defect was in the tier data, not the prices.
`ECLIPSE_SIZES=[{label:'50g',price:5.99},{label:'Value pack',price:59.99}]`

1. **The 6-pack rung was absent**, so $32.99 could not be bought.
2. **No rung carried a `quantity`.** The renderer reads `option.quantity||1`, so every
   multipack entered the cart as one unit.
3. Labels named the weight, not the pack. All five bites are 50g each, so "50g" did not
   distinguish anything.

Now `[{label:'1 bite',price:5.99,quantity:1},{label:'6 bites',price:32.99,quantity:6},
{label:'12 bites',price:59.99,quantity:12}]`, with `optionLabel:'Pack'`, matching MOON_TIERS.

### Verify evidence, control-tested against the pre-fix page
Served HEAD's own copy at `/shop_before.html` and ran the identical script.

    before   "Value pack · $59.99  q=1"   ->  Cart, 1 item,    subtotal $59.99
    after    "6 bites · $32.99     q=6"   ->  Cart, 6 items,   subtotal $32.99
    after    "12 bites · $59.99    q=12"  ->  Cart, 12 items,  subtotal $59.99

All 5 eclipse pickers render three rungs. Parse OK, `diff --check` clean, no horizontal
overflow at 1440 or 390, zero `a[href="#"]`.

## Open, not built, needs Nate
**The 90g bars carry no size picker at all.** They render a flat `$12.95`, which is the true
1-bar price, so nothing on the page is wrong. But the export says bars are variable on
1/2/5/10 and the 2/5/10 rungs are unreachable. Wiring a picker is new behaviour rather than a
correction, so it was not built. Same question, smaller, for the bananas 20-rung.

Still unanswered and left exactly as found: whether FAQ is promoted into the shared footer,
and the FAQ header nav retarget of "What is Carob".

## Note on authority files
`REGISTRY_AUTHORITY_20260819.md` rules on design-system route registries, **not** card
accounting. The card authority is the CAT ledger. This session never opened either file and
never relied on card accounting, so nothing here inherits that confusion.

---

# COORDINATOR PASS 4, pack pickers wired

Nate approved wiring pack pickers for the 90g bars and the Carob Bananas, and asked me to
check the Crescent Moons 20 rung rather than assume it.

## Crescent Moons: checked, already correct, nothing done
`MOON_TIERS` already carried `{label:'20 moons',price:44.99,quantity:20}`. The 20 rung was
never missing. No change made.

## Built: `137a80d feat(shop): wire pack pickers for the 90g bars and Carob Bananas`

    BAR_TIERS     1 $12.95 / 2 $25.25 / 5 $61.51 / 10 $116.55
    BANANA_TIERS  1 $2.99  / 5 $14.25 / 10 $26.99 / 20 $50.99

Both taken from the governing export, both with per-rung `quantity`.

### A live mispricing found and fixed on the way
The banana `price` field held the ladder as a display string,
`'1 $2.99 / 5 $14.25 / 10 $26.99 / 20 $50.99'`. With no `sizes` array the renderer fell back to
`priceNumber()`, whose regex `\d+(?:\.\d{1,2})?` returns the **first** number in the string.
That was the leading `1`, so the card carried `unitPrice 1` and **sold a $2.99 product for
$1.00**. Confirmed in the browser before the change:

    BEFORE  banana card  unitPrice="1"  ->  Cart, 1 item, subtotal $1.00

The moons escaped this only because they already had `sizes`, which takes precedence.
Any future product given a ladder string but no `sizes` array will hit the same trap.
`price` is a display field; `sizes` is the commerce truth.

## Verify evidence
Every rung exercised in isolation, fresh page load each time, at 1440 and 390.
All 15 rungs across four categories passed, cart item count equal to declared rung quantity:

    bars     1/2/5/10   ->  1, 2, 5, 10 items   $12.95, $25.25, $61.51, $116.55
    moons    1/5/10/20  ->  1, 5, 10, 20 items  $2.50, $12.19, $23.75, $44.99
    bites    1/6/12     ->  1, 6, 12 items      $5.99, $32.99, $59.99
    bananas  1/5/10/20  ->  1, 5, 10, 20 items  $2.99, $14.25, $26.99, $50.99

Picker coverage is deliberately partial where products are pending or simple:
bars 6/6, bananas 1/1, bites 5/6 (bundle is a simple), moons 4/6 (two are `pending:true`).
Pending stays pending and gets an Enquire link, not a cart button.
Parse OK, `diff --check` clean, no horizontal overflow at either width, zero `a[href="#"]`.

## Deliberately not done
`pickerAttribute` still emits `data-size-picker="eclipse"` for every non-moon category, so bar
and banana cards carry an attribute named after a different product line. It is cosmetic:
nothing in the CSS or JS selects on it. Renaming it was rejected because the frozen QA
baselines under `_wip/evidence/` key on that exact string, and a rename would break diffing
against them for no functional gain. Logged rather than fixed.

No price value was invented or altered anywhere in this pass. Nothing pushed, nothing deployed.
FAQ footer promotion and the FAQ nav retarget remain untouched.
