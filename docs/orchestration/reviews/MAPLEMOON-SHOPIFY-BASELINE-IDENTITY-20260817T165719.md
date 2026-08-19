# MapleMoon Shopify S0 baseline and identity — HOLD

## Outcome

S0 stopped correctly before Shopify acquisition. The recovery checkpoint and
phase-start gate passed, all twelve local authority pins matched and the full
Woo export was parsed, but Shopify CLI had no existing authenticated session.
It requested a new login; that login was not followed.

The packet requires an exact installed-theme recovery or an honest HOLD. Theme
identity, version/vendor metadata, theme role/list and exact bytes therefore
remain unrefreshed. Historical admin findings in the Boss ledger were not
silently reused as current S0 evidence.

## What actually ran

```text
PASS checkpoint packet=MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-20260817T165719 files=4 path=/Users/handtomouse/maplemoon-website/_wip/checkpoints/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-20260817T165719_20260817_171933_AEST
PASS packet=MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-20260817T165719 phase=start scope=4
WOO_FULL_READ rows=119 columns=82 bytes=109468
TYPES variable=20 variation=91 simple=8
SKU_NONBLANK=0 SKU_UNIQUE=0
SHOPIFY_THEME_LIST existing_auth=UNAVAILABLE login_flow=NOT_FOLLOWED
```

The short-lived verification code and activation URL printed by the CLI were
not copied into any evidence. No cookies, browser storage, tokens, passwords,
payout data, customer records or recovery material were inspected or recorded.

## External-state boundary

- authenticated Shopify reads: **0**;
- Shopify mutation commands: **0**;
- theme pull/duplicate/update/publish: **0**;
- product/settings/domain/user/payment changes: **0**;
- browser admin pages opened after stop: **0**;
- client contact, Git, deploy or production action: **0**.

## Release condition

Issue a fresh non-overwriting S0 successor only after Nate explicitly chooses
one of these safe acquisition routes:

1. complete a user-visible Shopify CLI login for this store, then permit only
   read-only `theme list`, `theme info` and exact `theme pull`; or
2. provide an exact theme archive obtained through a separately approved route,
   plus first-party admin metadata binding it to store/theme ID `154500595909`.

Until then, S1 remains HOLD. A login approval is not theme-duplication,
theme-update or publication authority.

