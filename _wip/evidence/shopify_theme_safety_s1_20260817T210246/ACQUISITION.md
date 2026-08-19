# MapleMoon Shopify theme safety S1 evidence

- Store: `maplemooncarob.myshopify.com`.
- Before duplication: exactly one theme, `154500595909` / `Ethereal` / `live` / processing `false`.
- Authorized remote write: exactly one `shopify theme duplicate` command.
- Returned duplicate: `160076628165` / `MapleMoon Private Review 20260817 S1` / `unpublished`.
- After duplication: exactly the unchanged live source plus the one unpublished duplicate; both processing `false`.
- Fresh live-source pull, fresh duplicate pull and the sealed S0 recovery are byte-for-byte identical under `diff -qr`.
- Each tree contains 246 files and 2,866,869 bytes. The gate-compatible directory digest for each theme subdirectory is `e48a21dc289c2534aaf06711e1e4b653a7b4b54ce7a11406f8d78027a147ccc4`.
- Because both fresh pulls are byte-identical to the sealed S0 tree, they inherit the S0 relative-path theme-tree identity `6f94b20a498fa0db7d3d4f602a04a783809689e75f95dbf234f802e8ec9c5dee`.
- The duplicate reproduces the inherited baseline defects: Theme Check exit 1 with 3 errors and 195 warnings across 48 files; strict `jq` parsing fails at line 470, column 9.
- The public storefront still redirects to `/password` and returns HTTP 200 after one redirect.
- No authentication material, cookie, password, customer data or payout detail is retained.

The duplicate is a faithful safety copy, not a clean implementation base. No update, repair, edit, push or publication occurred in S1.
