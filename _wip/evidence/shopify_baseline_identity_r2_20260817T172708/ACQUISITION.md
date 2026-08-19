# MapleMoon Shopify baseline R2 acquisition

- Auth route: Shopify CLI first-party device authentication, visibly approved by Nate.
- Authentication result: PASS. No verification code, activation URL, account email, token, cookie, password or recovery material is retained here.
- Store: `maplemooncarob.myshopify.com`.
- Theme list before and after: one theme only; ID `154500595909`, admin name `Ethereal`, role `live`, processing `false`.
- Public anonymous request: redirects to `/password` and states that the store is password protected.
- Exact local recovery: `theme-154500595909/`, 246 files, 2,866,869 bytes.
- Relative-path theme tree SHA-256: `6f94b20a498fa0db7d3d4f602a04a783809689e75f95dbf234f802e8ec9c5dee`.

## Identity reconciliation

The names are not competing themes. First-party theme bytes identify the product
as `Etheryx` by OpenThinking, version `1.4.0`. `config/settings_data.json`
identifies the installed preset as `Ethereal`. Shopify Admin/CLI therefore uses
the preset label `Ethereal` for theme ID `154500595909`, while the purchased
theme family is `Etheryx`.

Current update availability is not exposed by the CLI response. The previously
pinned admin observation of version `1.6.0` remains historical evidence only;
it is not silently promoted into this acquisition.

## Baseline integrity qualification

The exact live bytes are recoverable, but they are not a clean implementation
base without repair/update verification:

- `config/settings_schema.json` fails strict JSON parsing near line 470;
- Shopify Theme Check exits 1 with 3 errors and 195 warnings across 48 files;
- the three errors are recorded in `theme-check-summary.json`.

These are inherited live-theme findings, not acquisition failures. They make a
future duplicate/update/check phase mandatory before the theme is used for new
work. Nothing was repaired in S0.
