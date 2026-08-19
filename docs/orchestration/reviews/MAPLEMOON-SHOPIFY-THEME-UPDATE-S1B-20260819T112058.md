# MapleMoon Shopify theme update S1B resume review

## Result

**EXECUTED.** Etheryx 1.6.0 is on the store, in a new unpublished theme. Nothing
else moved. The migration is fully measured. The one warning Shopify raised turns
out to have nothing behind it, and that is proved rather than assumed.

## 1. What Shopify's update route actually did

It did **not** update a theme in place. It created a third theme.

```
154500595909  live         processing=False  Ethereal
160076628165  unpublished  processing=False  MapleMoon Private Review 20260817 S1
160142491845  unpublished  processing=False  Updated copy of Ethereal
```

`shopify theme list --store maplemooncarob.myshopify.com --json`, three
consecutive polls at 11:22:27, 11:22:57 and 11:23:28 AEST, all reporting
`processing=False` for `160142491845` before anything was pulled. Nothing was
pulled while the copy was still processing.

The new theme is `160142491845`, name `Updated copy of Ethereal`, role
`unpublished`, `processing` false, `createdAtRuntime` false.

## 2. Source determination — UNDETERMINED from bytes

The two candidate sources are byte-identical to each other right now:

```
diff -qr <fresh pull 154500595909> <fresh pull 160076628165>   ->  exit 0
```

So the classification of the new theme against each candidate is necessarily the
same object. It was computed independently against both and the two results hash
to the same value:

```
32a71e498de275ff88e6ab090a80fb905fcaa9d5a3d0605b7be744dfbe28a8aa  diff_vs_s1.json
32a71e498de275ff88e6ab090a80fb905fcaa9d5a3d0605b7be744dfbe28a8aa  diff_vs_live.json
diff diff_vs_s1.json diff_vs_live.json  ->  exit 0
```

**Verdict: UNDETERMINED.** No byte evidence can separate the two sources while
they are identical. `shopify theme info` exposes no parent or source field for
any of the three themes, so the CLI adds nothing either.

One piece of **circumstantial, non-byte** evidence is worth recording without
being treated as proof. Shopify names the copy after the source theme's *display
name*, and the copy is called `Updated copy of Ethereal`, not `Updated copy of
MapleMoon Private Review 20260817 S1`. That points at the live theme's card. It
is a naming convention, not a measurement, and it is a different argument from
the `installed_preset_name` one the brief correctly dismissed — both themes carry
preset `Ethereal`, but only one is *named* `Ethereal`. Recorded as an indication,
not a determination.

It does not matter for safety either way: both candidates are provably unchanged.

## 3. Nothing else moved

Both originals were re-pulled fresh from Shopify and compared to their sealed
recovery trees before the new theme was touched at all.

| Theme | Role | Files | Bytes | Gate digest | Relative tree SHA-256 |
|---|---|---|---|---|---|
| `154500595909` Ethereal | **live** | 246 | 2,866,869 | `e48a21dc…` | `6f94b20a…` |
| `160076628165` S1 | **unpublished** | 246 | 2,866,869 | `e48a21dc…` | `6f94b20a…` |

```
diff -qr <fresh 154500595909> _wip/recovery/shopify_theme_update_s1b_20260819T104947/live-154500595909      -> 0
diff -qr <fresh 154500595909> _wip/recovery/shopify_theme_safety_s1_20260817T210246/source-154500595909     -> 0
diff -qr <fresh 160076628165> _wip/recovery/shopify_theme_update_s1b_20260819T104947/before-160076628165    -> 0
diff -qr <fresh 160076628165> _wip/recovery/shopify_theme_safety_s1_20260817T210246/duplicate-160076628165  -> 0
```

Four `diff -qr` runs, all exit 0, each against a separately sealed copy. Both
originals are still 1.4.0 and neither carries the update.

Storefront, anonymous `curl`:

```
storefront:                   final_url=https://maplemooncarob.myshopify.com/password http_code=200 redirects=1
preview_new_160142491845_anon: final_url=https://maplemooncarob.myshopify.com/password http_code=200 redirects=2
preview_s1_160076628165_anon:  final_url=https://maplemooncarob.myshopify.com/password http_code=200 redirects=2
```

The password gate holds, including for the new theme's preview URL.

## 4. Before and after measures

| | Before `160076628165` 1.4.0 | After `160142491845` 1.6.0 |
|---|---|---|
| Files | 246 | **270** |
| Bytes | 2,866,869 | **3,046,532** |
| Gate directory SHA-256 | `e48a21dc289c2534aaf06711e1e4b653a7b4b54ce7a11406f8d78027a147ccc4` | `a8aa2c2d8eb252d83bc700a8ec0567300a910f1571fe9f26208cde9ba23c3b1d` |
| Relative tree SHA-256 | `6f94b20a498fa0db7d3d4f602a04a783809689e75f95dbf234f802e8ec9c5dee` | `4f281bb3683fd58750db478490ac2b13a90b0b06ee583565386ebad097476179` |

## 5. It really is 1.6.0, read from its own bytes

`config/settings_schema.json` line 5 of the pulled tree, not the admin label:

```
"theme_name": "Etheryx",
"theme_version": "1.6.0",          (before: "1.4.0")
"theme_author": "OpenThinking",
"theme_support_url": "https://openthinking.net/support/?src=etheryx"   (before: ".../support/")
```

## 6. Migration diff, 1.4.0 to 1.6.0

Against the sealed 1.4.0 tree: **30 added, 6 removed, 70 modified, 170 unchanged.**

### Removed — 6, and all six are the same vendor rename

| Removed | Replaced by |
|---|---|
| `assets/c-newsletter.js.liquid` | `assets/c-newsletter.js` |
| `assets/c-slider-autoscroll.js.liquid` | `assets/c-slider-autoscroll.js` |
| `assets/c-slider.js.liquid` | `assets/c-slider.js` |
| `assets/c-slideshow.js.liquid` | `assets/c-slideshow.js` |
| `assets/c-zoom.js.liquid` | `assets/c-zoom.js` |
| `assets/pdp-slider.js.liquid` | `assets/pdp-slider.js` |

Every removal has a matching addition. 1.6.0 drops the `.liquid` suffix from six
JS assets. **No bespoke file was removed.**

### Added — 30

- 8 renamed JS assets, plus `assets/c-content-reveal.js` and `assets/c-shoplogin.js`
- 9 new theme blocks under a new `blocks/` directory: `a-image`, `a-link`,
  `a-liquid`, `a-richtext`, `a-text`, `a-video`, `g-cell`, `g-flexbox`, `g-grid`,
  `g-overlay`
- 4 new sections: `ls-media-reveal`, `ls-tabbed-collections`, `s-custom`, `x-quickview`
- 7 new snippets: `c-badges`, `c-cart-upsell`, `c-prod-card-media-item`,
  `global-preload`, `pdp-media-alt`, `pdp-media-group`, `pdp-media-visible`
- 1 new template: `templates/page.custom-section.json`

These line up exactly with the 10 new schema keys in §7, so the added files and
the added settings corroborate each other.

### Modified — 70

By directory: assets 19, sections 23, snippets 21, config 2, layout 2, locales 1,
templates 2. The full unified diff is 10,270 lines and is sealed as evidence.
Largest single change is `sections/ls-hero.liquid`, +514/-514, which is the vendor
reindenting its whole `{% schema %}` block from tabs to spaces plus real content
changes. One file, `sections/ls-feat-collection.liquid`, differs by whitespace
only. No file differs by line endings alone.

## 7. 🔴 "Theme added: code edits could not be included" — nothing behind it

Shopify's banner is a standing notice about what the update route does not carry.
On this store it cost nothing, and that is measured, not assumed.

**a) The 1.4.0 tree contains no code customisation to lose.**

```
grep -ril 'maplemoon|maple moon|carob' <1.4.0 tree> --include='*.liquid' --include='*.js' --include='*.css'
  -> exit 1, no match
grep -ril 'maplemoon|maple moon|carob' <1.4.0 tree>          # all 246 files
  -> sections/header-group.json
     templates/index.json
```

Zero project-specific content in any Liquid, JS or CSS file. The only two hits in
the entire theme are theme-editor settings files, which are settings, not code.
Both survive into 1.6.0 — the same grep over the 1.6.0 tree returns the same two
files.

**b) Every store-uploaded asset survived byte-identically.**

`assets/maplemoon-logo.svg`, `brand-story.jpg`, `hero-editorial.jpg`,
`lifestyle-1.jpg`, `lifestyle-2.jpg`, `feature-bar.jpg`, `feature-glow.jpg` — all
seven classify as **unchanged**.

**c) 170 of 246 files are byte-identical between 1.4.0 and 1.6.0.** A code edit in
any of those would have been reverted to vendor and would have surfaced as
modified. Those 170 provably carried no dropped edit.

**d) Four diff lines look alarming and are not.** The migration diff removes:

```
-        "image": "shopify://shop_images/hero-editorial.jpg"
-        "image": "shopify://shop_images/brand-story.jpg"
-            "image": "shopify://shop_images/lifestyle-1.jpg"
-            "image": "shopify://shop_images/lifestyle-2.jpg"
```

All four are inside `templates/index.json`, and that file is **semantically
identical** before and after — parsed and compared as objects, `True`. Shopify
reserialised it and moved `image` earlier in each settings block. Same byte count,
10,942 both sides. Nothing was lost. `sections/header-group.json` is the same
story: `mixBlend` moved, semantically identical, 1,865 bytes both sides.

**Category (b), customisation dropped and vendor default returned: the only
confirmed instances are two theme-editor settings, in §8. Zero code files.**

The honest boundary: for the 70 modified vendor files, a hypothetical inline code
edit that contains no project-specific string cannot be separated from a vendor
change without a clean vendor 1.4.0 reference, which this lane is not authorised
to obtain. Given (a), (b) and (c), and a theme installed 18 February and never
launched, the probability is very low, but it is stated as a limit rather than
claimed away.

## 8. Settings preservation

**Schema, `config/settings_schema.json`:** 137 unique ids before, **147 after**.
Nonzero before-side count asserted before any diff, as the packet requires.

- **10 added**, none removed: `card_badges_overlay`, `cart_upsells_collection`,
  `cart_upsells_limit`, `cart_upsells_title`, `cart_upsells_visibility`,
  `page_transition_speed`, `page_transition_style`, `search_suggested_links`,
  `search_suggested_links_direction`, `search_suggested_links_title`.
- **0 removed.** No global setting was orphaned.

**Merchant values, `config/settings_data.json` `current`:** 20 before, 20 after.

**All 20 preserved byte-identically. 0 changed, 0 newly defaulted, 0 orphaned.**
Every one of the 20 also still has a matching id in the 1.6.0 schema, so none is
orphaned in the silent sense either.

`body_strikethrough_links_hover`, `button_alignment`, `card_crop_fit`,
`card_crop_position`, `card_crop_ratio`, `card_media_type`, `card_quick_buy`,
`card_show_color_list`, `card_show_secondary`, `card_show_size_list`,
`card_stealth_meta`, `card_text_align`, `color_schemes`, `footer_stealth`,
`heading_as_body`, `media_radius`, `themeName`, `themePreset`, `type_body_font`,
`type_heading_font`.

Preset counts are unchanged: Etheryx 11, Ethereal 20, Ethernity 24.

### Three real losses, all small, all named

1. **`installed_preset_name` was dropped from `config/settings_data.json`.**
   Before: `"installed_preset_name": "Ethereal"`. After: the key is absent
   entirely. The preset identity marker the S1 lane used to close the
   Ethereal-versus-Etheryx question no longer exists in the new theme. `current`
   still carries `themePreset: "Ethereal"`, so the information survives elsewhere,
   but anything keyed on `installed_preset_name` will now read nothing.

2. **`templates/product.json`, quantity block: `"label": true` dropped.**
   `"settings": { "label": true }` became `"settings": {}`.

3. **`templates/product.json`, main product section: `"contain_media_size": false`
   dropped.** The id no longer exists anywhere in 1.6.0 — `grep -rl
   contain_media_size` returns 3 files in the 1.4.0 tree
   (`sections/ls-product.liquid`, `sections/t-product.liquid`,
   `templates/product.json`) and **0 files** in 1.6.0. The vendor retired the
   setting and Shopify correctly dropped the now-meaningless value.

Both product-template losses were `false`-equivalent or default values, so no
visible configuration was lost. They are named because the brief asked for every
key that did not survive.

### Vendor preset defaults moved, merchant values did not follow

Inside `presets.Ethereal`, 1.6.0 changes the vendor defaults: `type_body_font`
`inter_n4` → `figtree_n4`, `type_heading_font` `crimson_text_n7` → `figtree_n5`,
and the `coretex-1` colour scheme shifts from the blue/cream pair to a warm neutral
(`#E8E5CE`/`#1E4366` → `#F7F4EF`/`#5b5048`). The store's `current` values are
untouched, so the merchant settings now **diverge from the 1.6.0 preset default**.
That is correct behaviour, but it means anyone who clicks "reset to preset" in the
new theme will get a different look from the one on the live theme today.

## 9. Gates, old versus new

Instrument: Shopify CLI 3.92.1, `shopify theme check --path <dir>` and `jq 1.8.1`.
Both gates ran to completion on both trees.

| Gate | Before 1.4.0 | After 1.6.0 |
|---|---|---|
| Theme Check exit | 1 | 1 |
| Files inspected | 181 | **197** |
| Total offences | 198 across 48 files | **218 across 48 files** |
| Errors | 3 | 3 |
| Warnings | 195 | **215** |

Per check:

| Sev | Check | Before | After | Delta |
|---|---|---|---|---|
| error | LiquidHTMLSyntaxError | 1 | 1 | 0 |
| error | ParserBlockingScript | 1 | 1 | 0 |
| error | TranslationKeyExists | 1 | 1 | 0 |
| warning | UnusedAssign | 4 | 2 | −2 |
| warning | VariableName | 191 | 213 | **+22** |

The error count is flat but **one of the three errors moved file**, which a count
alone would have hidden:

| Error | Before | After |
|---|---|---|
| LiquidHTMLSyntaxError | `assets/c-slider.js.liquid` | **`sections/ls-slideshow.liquid`** |
| ParserBlockingScript | `sections/t-giftcard.liquid` | `sections/t-giftcard.liquid` |
| TranslationKeyExists | `snippets/inc-socials.liquid` | `snippets/inc-socials.liquid` |

The old `c-slider.js.liquid` defect is gone because the file no longer exists — it
became `c-slider.js`, which Theme Check does not parse as Liquid. A **new**
LiquidHTMLSyntaxError appeared in `sections/ls-slideshow.liquid`: "Attempting to
close HtmlElement 'div' before it was opened", line 93. That is a fresh 1.6.0
defect, not an inherited one. `t-giftcard.liquid` and `inc-socials.liquid` are
both in the unchanged 170, so 1.6.0 did not touch them and their errors persist
verbatim.

**Strict JSON, both files, both trees, all four invalid:**

| File | Before | After |
|---|---|---|
| `config/settings_schema.json` | jq exit 5, `Expected another array element at line 470, column 9` | jq exit 5, **`… at line 495, column 9`** |
| `config/settings_data.json` | jq exit 5, `Invalid numeric literal at line 2, column 0` | jq exit 5, same |

The schema defect is the **same trailing comma, in the same place**: the `favicon`
`image_picker` block closes with `},` and then `]`. It shifted from line 470 to 495
purely because 1.6.0 inserted settings above it. **OpenThinking did not fix it in
two minor versions.** `settings_data.json` still opens with a `/* */` comment block
and still parses only after comment stripping.

## 10. Preview — not run

The render check is still not run. An anonymous `curl` of
`?preview_theme_id=160142491845` ends at `/password`, http 200, 2 redirects. That
proves the password gate holds and nothing more. No rendering claim is made.

## What this changes for the port

The update is safe to work from. Both 1.4.0 originals are intact and recoverable,
the 1.6.0 tree is sealed, settings carried across cleanly, and the theme was never
code-customised, so the port has no bespoke 1.4.0 code to reconcile.

Three things to carry forward:

1. `settings_schema.json` is still strict-invalid in 1.6.0. Any tooling that
   `json.load()`s it still throws. Same for `settings_data.json` and its comment
   block. This is now confirmed as vendor behaviour across two minor versions, not
   a one-off.
2. A new LiquidHTMLSyntaxError in `sections/ls-slideshow.liquid` line 93 arrived
   with 1.6.0.
3. `installed_preset_name` no longer exists in the new theme's settings data.

## 11. Receipt gates, and one honest failure

`scripts/check-maplemoon-receipt.py`:

```
checkpoint              PASS  packet=…S1B-20260819T112058 files=5
verify --phase start    PASS  packet=…S1B-20260819T112058 phase=start scope=5
verify --phase complete FAIL  reason=receipt contains a failed or malformed check
```

The completion gate is reported as **FAIL**, not massaged. Line 276 of the script
rejects any check whose `exit_code` is not 0. This receipt truthfully records
`shopify theme check` exit 1, `jq` exit 5 and a `grep` exit 1 — and for that grep,
exit 1 means *no match*, which is the pass condition for the customisation probe.
Rewriting those to 0 would have turned the gate green by lying about what the
tools returned, so they were left as they were. The 10:49 receipt carries the same
nonzero codes and was only ever run through `--phase start`, which does not
inspect them, so this is the first time the rule has been hit.

This is a gate-design mismatch worth fixing separately: a program whose baseline
legitimately exits nonzero can never satisfy `--phase complete` as written.

Two disclosures on ordering. The packet initially omitted the required `stop`
field and both gates returned HOLD; the field was added and the gates rerun. And
this gate transcript is copied into the evidence directory after the checkpoint
that measures that directory, so a checkpoint retaken now would see one extra
file. Recorded rather than hidden by reordering timestamps.

## Boundaries held

No theme was published, promoted, previewed-as-published, renamed or deleted. The
live theme and the sealed S1 duplicate were read only. No password removal, no
payments, no ownership, no domain, no DNS, no product, collection, metaobject or
app change. No code pushed, no port begun, no client contact. No credential,
token, cookie, storefront password or customer record entered evidence. Work is on
branch `s1b/shopify-theme-update-20260819`; nothing was committed to main and
nothing was pushed.
