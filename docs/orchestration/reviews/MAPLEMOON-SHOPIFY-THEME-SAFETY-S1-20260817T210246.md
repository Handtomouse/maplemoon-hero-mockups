# MapleMoon Shopify theme safety S1 review

## Result

**PASS — one unpublished safety duplicate created; live theme and password protection unchanged.**

The current live theme remains `154500595909` (`Ethereal`, role `live`). Shopify
created exactly one new theme, `160076628165`, named `MapleMoon Private Review
20260817 S1`, with role `unpublished`. No theme update, edit, repair, push,
publication, deletion or post-creation rename ran.

## Remote state

Before the authorized command, the store contained exactly the one expected
live theme and no target-name duplicate. The duplicate command ran exactly once
and returned the concrete unpublished theme ID `160076628165`. The final theme
list contains exactly:

1. `154500595909` — `Ethereal` — `live` — processing `false`.
2. `160076628165` — `MapleMoon Private Review 20260817 S1` — `unpublished` — processing `false`.

The public storefront still redirects to
`https://maplemooncarob.myshopify.com/password`, returns HTTP 200 and required
one redirect. No storefront-password or store-global setting changed.

## Recovery proof

The sealed S0 recovery, fresh live-theme pull and fresh duplicate-theme pull are
byte-for-byte identical under both pairwise `diff -qr` comparisons. Every tree
contains exactly 246 files totalling 2,866,869 bytes. Every theme subdirectory
has the gate-compatible directory digest
`e48a21dc289c2534aaf06711e1e4b653a7b4b54ce7a11406f8d78027a147ccc4`.
Exact equality to the sealed S0 tree proves the two fresh pulls retain its
recorded relative-path theme-tree identity
`6f94b20a498fa0db7d3d4f602a04a783809689e75f95dbf234f802e8ec9c5dee`.

The initial live-source pull attempt failed before acquisition because its exact
destination directory had not yet been created. No remote or source change
occurred; the non-destructive pull was rerun after creating the packet-owned
directory and passed. This attempt is retained rather than silently omitted.

## Inherited defects

The duplicate faithfully reproduces the known S0 baseline defects:

- Shopify Theme Check: exit 1; 181 files inspected; 198 offences across 48 files;
  3 errors and 195 warnings.
- Strict JSON parsing of `config/settings_schema.json`: exit 5 at line 470,
  column 9 (`Expected another array element`).

These are not S1 failures because the packet requires an exact duplicate and
forbids repair. They do mean the unpublished copy is not yet a clean
implementation base. A separate, checkpointed S1B decision is required before
any update or repair.

## Boundary audit

No product, collection, inventory, navigation, file, metaobject, metafield,
customer, order, discount, app, market, payment, shipping, tax, location,
domain, policy, user, password-protection, Vercel, Git, production or client
mutation occurred. Evidence contains no secret, token, cookie, password,
verification URL, customer record or payout detail.

## Next state

`s1_complete_unpublished_duplicate_ready_for_separate_s1b_update_or_repair_decision`

S1 does not authorize changing the duplicate. The next decision is whether to
obtain and validate an official Etheryx update on this unpublished copy or to
repair the inherited 1.4.0 bytes locally under a new packet.
