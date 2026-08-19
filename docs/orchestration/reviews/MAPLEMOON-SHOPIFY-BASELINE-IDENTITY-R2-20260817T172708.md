# MapleMoon Shopify S0 baseline and identity R2 — PASS

## Outcome

S0 is complete. The store is `maplemooncarob.myshopify.com`; it is password
protected; and it currently has exactly one theme, ID `154500595909`, named
`Ethereal`, with role `live`.

The Ethereal/Etheryx ambiguity is resolved. The installed theme product is
**Etheryx 1.4.0 by OpenThinking**. **Ethereal is the installed preset name** and
therefore the name shown for the live theme in Shopify. The current CLI does
not expose update availability, so the prior `1.6.0 available` observation
remains historical until S1 refreshes it.

## Exact recovery

- 246 files;
- 2,866,869 bytes;
- relative-path tree SHA-256
  `6f94b20a498fa0db7d3d4f602a04a783809689e75f95dbf234f802e8ec9c5dee`;
- location:
  `_wip/recovery/shopify_baseline_identity_r2_20260817T172708/theme-154500595909`.

Theme list and theme metadata were identical before and after the pull. No
theme, product, setting, protection, domain, user, payment or publication state
was changed.

## Important inherited baseline finding

The exact recovery is trustworthy, but the live 1.4.0 bytes are not a clean
base for new development:

- strict JSON parsing fails for `config/settings_schema.json` near line 470;
- Shopify Theme Check exits 1 with 3 errors and 195 warnings across 48 files.

No fix was attempted. S1 must preserve this exact backup, work only on an
unpublished duplicate, update or repair there, and require a clean independent
theme check before porting MapleMoon work.

## Boundary

The login was visibly authorised. Authentication codes, URLs, account email,
tokens, cookies, passwords and recovery material were not retained. No client
contact, Git action, deploy, production move, theme duplicate/update/edit or
publication occurred.

S0 PASS does not itself authorise S1 mutation.
