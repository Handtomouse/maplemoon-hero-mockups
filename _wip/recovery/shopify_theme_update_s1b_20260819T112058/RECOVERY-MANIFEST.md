# MapleMoon Shopify theme update S1B resume recovery — 2026-08-19 11:20 AEST

Continues `_wip/recovery/shopify_theme_update_s1b_20260819T104947/`. That tree holds
the before state. This one holds the after state only.

- Store: `maplemooncarob.myshopify.com`.
- Live source, never touched: `154500595909` / `Ethereal` / `live` / 1.4.0.
- Sealed S1 duplicate, never touched: `160076628165` / `MapleMoon Private Review 20260817 S1` / `unpublished` / 1.4.0.
- Theme created by Shopify's admin update route: `160142491845` / `Updated copy of Ethereal` / `unpublished` / 1.6.0.

## Trees captured

| Directory | Files | Bytes | Gate directory SHA-256 | Relative tree SHA-256 |
|---|---|---|---|---|
| `after-160142491845/` | 270 | 3,046,532 | `a8aa2c2d8eb252d83bc700a8ec0567300a910f1571fe9f26208cde9ba23c3b1d` | `4f281bb3683fd58750db478490ac2b13a90b0b06ee583565386ebad097476179` |

Version read from the theme's own bytes, not the admin label:
`config/settings_schema.json` line 5, `"theme_version": "1.6.0"`, under
`"theme_name": "Etheryx"`, `"theme_author": "OpenThinking"`.

## Deliberate dedupe: no fifth 1.4.0 copy was written

`_wip/recovery/` already holds five byte-identical copies of the 1.4.0 tree, not four:

1. `shopify_baseline_identity_r2_20260817T172708/theme-154500595909/`
2. `shopify_theme_safety_s1_20260817T210246/source-154500595909/`
3. `shopify_theme_safety_s1_20260817T210246/duplicate-160076628165/`
4. `shopify_theme_update_s1b_20260819T104947/before-160076628165/`
5. `shopify_theme_update_s1b_20260819T104947/live-154500595909/`

This lane re-pulled `154500595909` and `160076628165` fresh to prove they had not
moved, but wrote neither into recovery. Both verification pulls were made to a
scratch path and discarded after `diff -qr` returned 0 against the sealed copies.
Only genuinely new content — the 1.6.0 tree — was sealed here.

## Digest algorithms, unchanged from the 10:49 manifest

- **Gate directory digest**: `path_snapshot` in
  `maplemoon-website/scripts/check-maplemoon-receipt.py` — sorted `rglob`, then
  relative POSIX path, NUL, lowercase file SHA-256, newline.
- **Relative tree SHA-256**: SHA-256 over `"<file-sha256>  ./<relative-path>\n"`
  lines for every file, sorted by relative path.

## Acquisition

Shopify CLI 3.92.1 `shopify theme pull --nodelete` only. No push, update, edit,
repair, publish, rename or delete ran against any theme in this lane. The 1.6.0
update itself was performed by Nate in the Shopify admin, not by this session.
