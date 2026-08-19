# MapleMoon Shopify theme update S1B review

## Result

**HOLD at step 3. The official Etheryx 1.6.0 update did not run.**

Nothing in Shopify changed. The live theme, the target theme, both roles and the
storefront password page are exactly as S1 left them. Every step that could be
proved without the update was run and passed, and every step that depends on the
update is reported as not run with its reason, not approximated.

The block is instrumental, not a question of authority. Nate's authorisation is
clear and the update is real and available. Shopify's own update route is an
admin interface action, and no instrument available to this session can drive it.

## 1. Pin

| Item | Pinned value | Measured | Match |
|---|---|---|---|
| Live theme | `154500595909` `Ethereal` role `live` | same | yes |
| Target theme | `160076628165` `MapleMoon Private Review 20260817 S1` role `unpublished` | same | yes |
| Files | 246 | 246 | yes |
| Bytes | 2,866,869 | 2,866,869 | yes |
| S0 relative tree SHA-256 | `6f94b20a498fa0db7d3d4f602a04a783809689e75f95dbf234f802e8ec9c5dee` | identical | yes |
| Gate directory digest | `e48a21dc289c2534aaf06711e1e4b653a7b4b54ce7a11406f8d78027a147ccc4` | identical | yes |

Neither digest was taken on trust. The gate digest was recomputed with
`path_snapshot` from `scripts/check-maplemoon-receipt.py`. The relative tree
SHA-256 algorithm was not recorded anywhere in S0 or S1, so it was recovered by
reproducing the sealed value exactly: SHA-256 over
`"<file-sha256>  ./<relative-path>\n"` lines, sorted by relative path. Both
algorithms are now written into the recovery manifest so the next lane does not
have to rediscover them.

## 2. Before bytes

Fresh `shopify theme pull --theme 160076628165 --nodelete`:

- 246 files
- 2,866,869 bytes
- gate directory SHA-256 `e48a21dc289c2534aaf06711e1e4b653a7b4b54ce7a11406f8d78027a147ccc4`
- relative tree SHA-256 `6f94b20a498fa0db7d3d4f602a04a783809689e75f95dbf234f802e8ec9c5dee`
- `diff -qr` against the sealed S0 recovery: exit 0

## 3. Update — not run

### The route exists and the version is real

This was checked rather than assumed, because the S1 receipt explicitly recorded
the 1.6.0 observation as unrefreshed.

- Etheryx is a genuine Shopify Theme Store theme. Its Theme Store listing is
  `themes.shopify.com/themes/etheryx/presets/ethereal`, and the current version
  is **1.6.0**, released **21 July 2026**, author **OpenThinking**.
- The `Ethereal` versus `Etheryx` question is now closed from the theme's own
  bytes, not from inference: `config/settings_data.json` carries
  `"installed_preset_name": "Ethereal"`, and `Ethereal` is one of three presets
  shipped in the file alongside `Etheryx` and `Ethernity`. `Ethereal` is a preset
  of Etheryx, exactly as the Theme Store URL indicates.
- Installed version is `1.4.0`. The update is two minor versions behind.

So the official route is legitimate and the target is correct.

### Why it could not be driven

**Shopify CLI has no update command.** The complete `shopify theme` command list
in CLI 3.92.1 is `check`, `console`, `delete`, `dev`, `duplicate`, `info`,
`init`, `language-server`, `list`, `metafields`, `open`, `package`, `profile`,
`publish`, `pull`, `push`, `rename`, `share`. The list was read in full, past the
point an earlier truncated read stopped, to be certain nothing after `share` was
being missed. There is no `theme update`.

**The admin route is inside a cross-origin iframe.** The authenticated Shopify
admin was reached in Chrome and the store session is live. The theme library
itself renders inside an iframe served from `online-store-web.shopifyapps.com`,
while the host page is `admin.shopify.com`. Page scripting reaches only the host
frame, so the theme list, the update banner and the update control are all
unreadable and unclickable from there. Loading the iframe source as a top-level
page was tried and Shopify's App Bridge redirected it straight back into the
embedded admin. The legacy `maplemooncarob.myshopify.com/admin/themes` URL
redirects to the same embedded page.

**The instruments that could click are unavailable to a background session.**
The GUI takeover gate denies window automation until Nate types `gogo`, and the
browser-extension tool requires an interactive browser choice this session cannot
present. Capturing the Chrome window by window id returned a blank frame because
an occluded Chrome window stops painting, so even a read-only screenshot of the
theme library was not obtainable while Nate was working in another application.

Three diagnosis attempts were made and then the lane stopped, rather than
escalating into taking over a machine Nate was actively using.

### What was deliberately not done

- No vendor zip from `openthinking.net` was downloaded or uploaded. That is a
  different action from the authorised one, and it would not produce the official
  migration diff this phase exists to capture.
- No request was forged to the online-store app's internal endpoints. A blind
  POST to an undocumented endpoint that mutates a theme is not an official route
  and could not be audited afterwards.
- No 1.4.0 defect was hand-repaired. `config/settings_schema.json`,
  `assets/c-slider.js.liquid`, `snippets/inc-socials.liquid` and
  `sections/t-giftcard.liquid` are untouched, exactly as the handoff requires.

## 4. After bytes — not run

There is no after state, so no after measures are reported and no
`after-160076628165/` directory exists in the recovery tree.

## 5. Migration diff — not produced

The 1.4.0 to 1.6.0 file and settings diff cannot exist without the update. No
partial or inferred diff is offered.

## 6. Settings preservation — before side captured, comparison not run

The before-side baseline was captured so the comparison is cheap when the update
does run, and because both settings files turned out to be traps.

- `config/settings_schema.json` is **not strict JSON**: `jq` exits 5 with
  `Expected another array element at line 470, column 9`. A `json.load` on it
  throws, so setting ids were extracted by regex instead. **137 unique setting
  ids**, asserted nonzero before any diff would be reported.
- `config/settings_data.json` is **also not strict JSON**, which was not
  previously recorded: it opens with a `/* */` comment block and parses only
  after comment stripping. It carries `installed_preset_name: "Ethereal"`,
  **20 merchant setting values** under `current`, and three presets
  (`Etheryx` 11, `Ethereal` 20, `Ethernity` 24).

The preservation test is not "did `settings_data.json` stay the same". Shopify
keeps the merchant data file and replaces the schema. So when the update runs,
each of those 20 merchant values must be classified as preserved, changed,
newly defaulted, or **orphaned** — surviving in the data file with no matching id
in the 1.6.0 schema, and therefore silently never read again. `templates/*.json`
and `sections/*.json` section settings orphan the same way and need the same pass.

## 7. Gates — rerun, identical to baseline

| Gate | Baseline to beat | This run | Verdict |
|---|---|---|---|
| Shopify Theme Check | exit 1; 181 files inspected; 198 offences across 48 files; 3 errors; 195 warnings | exit 1; **181 files inspected with 198 total offenses found across 48 files. 3 errors. 195 warnings.** | identical |
| Strict JSON `config/settings_schema.json` | invalid, line 470 column 9 | `jq` exit 5, `parse error: Expected another array element at line 470, column 9` | identical |

Both gates ran to completion against the before-state pull. The numbers are
byte-for-byte the inherited 1.4.0 baseline, which is the correct result for a
theme that was not modified. When the update does run, the "181 files inspected"
figure will move because 1.6.0 ships a different file count; that is expected and
must not be read as a regression.

## 8. Preview — not run

An anonymous `curl` of `?preview_theme_id=160076628165` ends at
`https://maplemooncarob.myshopify.com/password`, http 200, 2 redirects. That
proves the password gate holds. It proves nothing about whether the theme
renders, and is not reported as if it did.

Opening the preview URL in the authenticated Chrome session also landed on
`/password`, because the admin session cookie does not carry storefront preview
access on its own. Entering the storefront password was out of the question. So
the render check is **not run**, and no rendering claim is made.

## 9. Nothing else moved

- Live theme `154500595909` re-pulled fresh: 246 files, 2,866,869 bytes, gate
  digest `e48a21dc...`, relative tree SHA-256 `6f94b20a...`, `diff -qr` against
  the sealed S0 recovery exit 0. Byte-identical.
- Close-state theme list is exactly two themes: `154500595909` `Ethereal` role
  `live` processing false, and `160076628165` `MapleMoon Private Review 20260817
  S1` role `unpublished` processing false. No third theme appeared.
- Storefront at close: `final_url=https://maplemooncarob.myshopify.com/password
  http_code=200 redirects=1`.
- No publication, password removal, payment, ownership, domain, DNS, product,
  collection, metaobject, app, code push or client contact occurred. No
  credential, token, cookie, storefront password or customer record entered
  evidence.

## Ordering deviation, disclosed

The before-state pull and the evidence writes happened before the packet existed,
so the checkpoint gate ran after those two directories already had content and
their `pre_sha256` entries are non-null rather than absent. Both gates still
passed: `checkpoint` PASS with `files=4`, and `verify --phase start` PASS with
`scope=4`. Recording this rather than reordering the timestamps.

## The one thing that unblocks this

Nate opens the Shopify admin theme library himself and either applies the update,
or types `gogo` so this lane can drive the click while he watches. Everything
else is already staged: before bytes captured, both digest algorithms recovered
and written down, both gates reproducing baseline exactly, the settings baseline
extracted past two strict-JSON traps, and the live theme proved untouched.

## Next state

`s1b_held_official_update_route_requires_admin_interface_instrument`
