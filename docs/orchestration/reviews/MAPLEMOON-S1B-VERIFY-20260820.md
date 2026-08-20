# MapleMoon S1B verification — Etheryx 1.6.0

Date: 2026-08-20 AEST  
Store: `maplemooncarob.myshopify.com`  
Repository: `9bbd9d6`, branch `docs/registry-authority-20260819`  
Remote mutation authority: none

## Decision

**DISCARD theme `160142491845`; do not promote it and do not merge it.**

The deciding fact is a verified quality regression: 1.6.0 retains three errors,
introduces 31 warnings while removing 11 (net **+20**), and introduces a new
`LiquidHTMLSyntaxError` in `sections/ls-slideshow.liquid`. The vendor update does
not achieve the defect-reduction purpose for which promotion was being considered.

No bespoke code merge is evidenced. If quality were acceptable, the update would
be a straight swap: all 20 merchant settings and all seven MapleMoon assets were
carried into 1.6.0. That does not outweigh the new diagnostics.

## 1. Stale-premise gate

The required command exited 0 and returned exactly four themes:

| ID | Role | Name | Processing |
|---|---|---|---|
| `154500595909` | live | Ethereal | false |
| `160076628165` | unpublished | MapleMoon Private Review 20260817 S1 | false |
| `160142491845` | unpublished | Updated copy of Ethereal | false |
| `160184271045` | development | Liquid Console (3.92.1) | false |

Raw output: `_wip/evidence/s1b_verify_20260820/theme-list-step1.txt`.

Shopify CLI 3.92.1's `theme list --json` query does not select `updatedAt`. A
read-only query through the same installed Shopify CLI authenticated Admin client
recorded the live theme's initial timestamp as:

```text
154500595909 updatedAt=2026-02-19T21:36:27Z
```

Raw metadata: `_wip/evidence/s1b_verify_20260820/live-theme-metadata-step1.json`.

## 2. Fresh pulls

Both required pulls exited 0:

```text
160076628165 -> /private/tmp/maplemoon-s1b-140.ZHmdlb  exit=0
160142491845 -> /private/tmp/maplemoon-s1b-160.J8Dft5  exit=0
```

The fresh 1.4.0 pull is byte-identical to the sealed S1 duplicate and the fresh
1.6.0 pull is byte-identical to the sealed S1B update result:

```text
fresh_140_vs_sealed_duplicate_exit=0
fresh_160_vs_sealed_after_exit=0
```

Raw pull transcripts: `theme-pull-140.txt`, `theme-pull-160.txt`.

## 3. Theme Check — measured baseline and result

The same installed Theme Check ran against both fresh pulls. Exit 1 is the
expected advisory exit.

| Theme | Files inspected | Errors | Warnings | Total | Exit |
|---|---:|---:|---:|---:|---:|
| 1.4.0 / `160076628165` | 181 | **3** | **195** | 198 | 1 |
| 1.6.0 / `160142491845` | 197 | **3** | **215** | 218 | 1 |

The asserted 195-warning baseline is therefore **confirmed exactly**.

Full raw transcripts: `theme-check-140.txt`, `theme-check-160.txt`.

### Error identity

Two errors persist verbatim: `TranslationKeyExists` in
`snippets/inc-socials.liquid` and `ParserBlockingScript` in
`sections/t-giftcard.liquid`.

The third error is not a fix. The 1.4.0 `LiquidHTMLSyntaxError` in
`assets/c-slider.js.liquid` disappears because the updater renames that asset to
plain `.js`, outside Theme Check's Liquid inspection. 1.6.0 then introduces a new
`LiquidHTMLSyntaxError` in `sections/ls-slideshow.liquid`: “Attempting to close
HtmlElement 'div' before it was opened.”

## 4. Warning delta attribution

Diagnostics were normalized as a multiset keyed by relative file, severity, rule
ID and message. Line/column was excluded so a warning moved by vendor edits is not
misclassified as newly introduced.

```text
pre-existing and re-reported: 184
introduced by vendor 1.6.0:    31
removed from 1.4.0:            11
net:                           +20
```

All 31 introduced warnings are rule `VariableName`.

| File | Added warnings |
|---|---:|
| `blocks/a-video.liquid` | 2 |
| `sections/ls-product.liquid` | 8 |
| `sections/ls-tabbed-collections.liquid` | 3 |
| `sections/overlay-newsletter.liquid` | 2 |
| `sections/t-product.liquid` | 8 |
| `snippets/c-cart.liquid` | 1 |
| `snippets/c-prod-card.liquid` | 1 |
| `snippets/global-css.liquid` | 4 |
| `snippets/pdp-media-core.liquid` | 1 |
| `snippets/pdp-popups.liquid` | 1 |

The 11 removals comprise `VariableName` 9 and `UnusedAssign` 2. Full grouped data:
`_wip/evidence/s1b_verify_20260820/warning-delta.json`.

## 5. `settings_schema.json` line 470

1.4.0 strict parse:

```text
jq: parse error: Expected another array element at line 470, column 9
exit=5
469              },
470          ]
```

1.6.0 strict parse:

```text
jq: parse error: Expected another array element at line 495, column 9
exit=5
494              },
495          ]
```

**Verdict: preserved and moved.** The same trailing comma after the favicon
`image_picker` block remains; 25 inserted lines merely move the parser failure
from line 470 to 495. 1.6.0 does not fix it.

Raw output: `_wip/evidence/s1b_verify_20260820/settings-schema-verdict.txt`.

## 6. MapleMoon customization and stock boundary

The 1.6.0 tree is not vanilla as a whole. It carries the store configuration:

- 20/20 merchant `current` settings preserved identically; 0 changed.
- Seven MapleMoon assets preserved byte-identically: logo and six supplied images.
- The only project-name hits are `sections/header-group.json` and
  `templates/index.json`; both are theme-editor data and are semantically equal
  across the update.
- No `maplemoon`, `maple moon` or `carob` hit exists in any Liquid, JS or CSS file
  in either version.

Accordingly, no bespoke code merge is evidenced and the customization required
for a straight swap is already present. The supplied inputs do not include an
independently clean vendor 1.4.0 or 1.6.0 package, so byte-for-byte stock code
identity cannot be proven for the 70 vendor-modified files; this is an explicit
evidence limit, not silently claimed away.

Raw output: `_wip/evidence/s1b_verify_20260820/customization-verdict.txt`.

## 7. Required recursive diff sample

`diff -r <1.4.0> <1.6.0> | head -50` returned the first 50 lines beginning with
new cart-notice CSS in `assets/app.css`. The upstream `diff` received SIGPIPE
after `head` completed, so its pipeline status was 141. The supplied full
migration evidence classifies 30 added, 6 removed, 70 modified and 170 unchanged.

Raw output: `_wip/evidence/s1b_verify_20260820/diff-first-50.txt`.

## 8. Final remote tamper check

The final theme list is still the same four IDs, names and roles. The live theme's
timestamp is identical before and after every read-only operation:

```text
initial_live_154500595909_updatedAt=2026-02-19T21:36:27Z
final_live_154500595909_updatedAt=2026-02-19T21:36:27Z
identical=true
```

Raw output: `theme-list-final.txt`, `live-theme-metadata-final.txt`,
`tamper-check.txt`.

## 9. Repository-state limitation

The worktree was already dirty before this task began, with three untracked packet
files. Additional unrelated untracked orchestration files appeared during the
run. They were preserved untouched. Therefore the requested literal empty
`git status --porcelain` condition cannot be truthfully asserted without deleting
or committing user-owned work, which was not authorized. This task changed only
the two authorized output targets: this report and
`_wip/evidence/s1b_verify_20260820/`.
