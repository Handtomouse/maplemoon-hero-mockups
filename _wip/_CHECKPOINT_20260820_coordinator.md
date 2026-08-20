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
