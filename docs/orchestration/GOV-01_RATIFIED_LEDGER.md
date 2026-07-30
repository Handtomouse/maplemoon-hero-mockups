# MapleMoon GOV-01 Ratified Ledger

**Status:** GOV-01 governance recorded; implementation remains gated.
**Date:** 2026-07-29 (Australia/Sydney)
**Coordinator:** Codex
**Final approval owner:** Nate
**Base commit:** `b15c070e4ff0cd0cf45fc18a08cf08fb12cfbed1`
**Lock manifest:** `docs/orchestration/LOCK_MANIFEST.json`

## Ratified decisions

1. WooCommerce remains authoritative for live prices, stock, and commerce values until controlled cutover.
2. Carli's content document is authoritative for approved copy and claims:
   `~/UFC/ops/handoffs/handoff_20260719_mm_carli_doc_content.md`
   Confirmed readable, 11,065 bytes, blob prefix `67b5221b`.
3. The six `_wip` HTML pages are visual and review evidence only, not catalogue or Shopify import truth.
4. Named consent-pending testimonials are held from external exposure.
5. File ownership uses a coordinator-owned lock manifest; workers never edit the manifest and ambiguous ownership fails closed.
6. Nate is coordinator and final approval owner for this phase.

## Source-of-truth matrix

| Domain | Authority | Current state | Transfer rule |
|---|---|---|---|
| Live prices, stock, commerce values | WooCommerce | External export absent | Remains authoritative until final approved cutover |
| Approved copy and claims | Carli content document | Readable and frozen for this plan | Any conflict becomes approval-required |
| Layout and visual review | `_wip/*.WIP.html` | Dirty local WIP | Codex-owned; Claude read-only |
| Shopify theme implementation | Admitted development/unpublished theme | Not admitted | Requires THEME-01 packet, security/access gate, and held locks |
| Testimonials | Consent evidence plus approved attribution | Named quotes held | No external exposure without consent receipt |
| Stockist counts | Verified client dataset | Conflicting counts | Do not assert a number until reconciled |
| Review/P0 register | `_wip/_feedback/log.jsonl` plus Sonnet QA plus locked decision records | Requires reconciliation and severity preservation | One merged disposition table is authoritative for PAGE-01 admission |

## Ownership and approval classes

| Role | Owns | May not do |
|---|---|---|
| Nate | Final approvals, external authority, launch decisions | No implicit approval from silence |
| Codex | Ledger, locks, packet admission, verification, replanning | Cannot self-authorise production/external actions |
| Claude Code | Files explicitly named in an admitted packet | Cannot edit WIP, ledgers, locks, or external systems by default |
| Lower-level agents | Narrow read-only research and checks | Cannot choose winners in conflicts |

Approval classes:

- `read-only`: inspect and report; no file mutation or external action.
- `mutating-local`: named local files only, with a held lock and acceptance tests.
- `external-gated`: Shopify, WooCommerce, payments, email, DNS/MX, analytics, or customer/order data; separate explicit approval required.
- `production-gated`: publishing, deployment, cutover, client communication, or launch; written go/no-go required.

## Current conflict register

| Conflict | Status | Resolver / next evidence |
|---|---|---|
| Bar weight 80g vs 90g | conflict | WooCommerce export cross Carli document |
| Powder weight 250g vs 300g | conflict | WooCommerce export |
| Saudi NIP 35g vs 45g using one barcode | conflict | Dylan/Carli plus Saudi production artwork; separate from AU catalogue |
| New Saudi GS1 barcodes | approval-required | Dylan/production owner |
| Stockist counts 70+ vs 90 vs 40 | unknown | Verified client stockist dataset |
| Homepage P0 observations | undispositioned | Codex evidence pass before PAGE-01 |
| Natasha/Janice/Acacia testimonials | consent-pending, held | Consent receipt before external exposure |

## Homepage review register enumeration

Sources: `_wip/_feedback/log.jsonl`, Sonnet QA findings dated 2026-07-28, and Nate's locked decision record dated 2026-07-29. The 15 entries below are P0 desktop observations from the feedback log. They are enumerated, not approved or resolved. No homepage edit is authorized by this list.

| ID | Area | Current disposition |
|---|---|---|
| `ms47wt70g6ui` | Hero/stage mist restoration | open |
| `ms47xdy63buv` | Carob pod annotation placement | open |
| `ms47xox4brhw` | Carob pod annotation placement | open |
| `ms47zky0nu77` | Section blending | open |
| `ms480863049b` | Our Story prominence | open |
| `ms480ketpf1x` | Stockists section design | open |
| `ms483i0awztt` | Ritual image replacement | open |
| `ms483kzuv24t` | Ritual image replacement | open |
| `ms483ml8oirm` | Ritual image replacement | open |
| `ms48spa1hlmg` | Trust bar strategy and flow | open |
| `ms48t6ej2be8` | Hero fade-box visibility | open |
| `ms48tlo84t4y` | Hero video fallback | open |
| `ms48tuprlfwf` | Hero credentials readability | open |
| `ms48ubrlulgr` | Carob learn-more CTA strategy | open |
| `ms49rup1d3dn` | Carob section horizontal balance | open |

The 16th feedback-log record, a P1 observation, is also included:

| ID | Severity | Area | Current disposition |
|---|---|---|---|
| `ms47wbp07ev9` | P1 | Product-range blend/seam at `#range` | open |

Additional homepage-relevant QA items are preserved with their actual source severity:

| ID | Severity | Viewport | Issue / current disposition |
|---|---|---|---|
| `MM-HOME-001` | P1 | 390 | Carob branch image exposes a hard dark band; open |
| `MM-HOME-002` | P1 | 1440/390 | Reviews/testimonial placeholder or named quotes require explicit external-exposure handling; held |
| `MM-HOME-003` | P2 | 390 | Secondary CTA competes with primary; Nate decision is STRIP, but edit remains lock-gated |
| `MM-HOME-004` | P2 | 390 | Mobile navigation is deferred to Shopify port; disposition required for review framing |
| `MM-HOME-006` | P3 | 390 | Hero spacing; discretionary |

The scoped feedback log contains no mobile P0 rows. The separate QA source does contain mobile P1/P2/P3 findings, so the earlier desktop-only statement must not be used to imply that mobile review is complete. PAGE-01 remains blocked until the merged register is verified and each blocking item is accepted, deferred with rationale, or excluded from the Shopify rebuild by Nate.

Nate's locked decision record also says the local testimonial placeholder stays visible for Carli's review. That does not clear named consent-pending testimonials for external exposure: any screenshot, client send, public page, or production artifact must still apply the consent hold.

## GOV-01-P02 coordinator resolutions

- **R1, 16th feedback ID: CLOSED.** The current `_wip/_feedback/log.jsonl` contains 16 unique IDs, and all 16 are present in this ledger. The previously missing entry is `ms47wbp07ev9`, P1, `#range` product-range blend/seam observation. Any later request saying R1 is still open is stale unless the log gains a new ID.
- **R4, Carob learn-more mapping:** the selector/anchor is `#carob a.wf-more.wf-more-strong[href="carob-story.WIP.html"]`, with visible text `The full carob story`. There are zero literal `learn more` hits in the homepage WIP; the feedback item maps to this existing anchor, not dropped.
- **Row 5 identity, `ms480863049b`:** targets the separate `#who` section, a `section` headed `Carli & Dylan`. It does not target the hero secondary CTA. The hero CTA is a separate `a.wf-ppill.secondary[href="our-story.WIP.html"]`, tracked as `MM-HOME-003`; the observations are related but not duplicates.

## GOV-01-P03 responsive evidence receipt

Read-only in-app Browser inspection of `_wip/homepage_real_1_lead_photo.WIP.html` at 1440, 1024, 430, 390, 375, and 320px found:

- no horizontal overflow at any breakpoint;
- the hero secondary `Discover Our Story` link remains present at all six breakpoints, so Nate's STRIP decision is still held by the homepage ownership lock;
- `#who` remains a distinct Our Story section at all six breakpoints;
- the Carob CTA remains `The full carob story` and maps to `carob-story.WIP.html`;
- visible `List` and `Map` controls measure 42px high at mobile widths, a potential touch-target/accessibility observation requiring disposition, not a code fix in this packet;
- no file was edited and no externally shareable screenshot set was created.

## Verification standard

Because `npm test` intentionally fails and no useful suite exists, packets must name their evidence type:

- scoped `git diff --check`;
- line-level source citations;
- JSON/schema validation where applicable;
- Theme Check for theme work;
- manual responsive/accessibility review at 1440, 1024, 430, 390, 375, and 320px where applicable;
- proof that forbidden paths had zero changed bytes;
- a receipt listing files read, changed, checks, blockers, residual risk, and next gate.

## Threat register

No risk is accepted by this ledger. Statuses below describe governance state only; an `in-progress` or `deferred` item still blocks any dependent gate.

| ID | Threat/control area | Disposition | Owner | Stop gate |
|---|---|---|---|---|
| T-01 | Governance, canonical plan, stale-plan supersession | in-progress | Codex/Nate | No mutation until canonical record is ratified |
| T-02 | Least-privilege Shopify access, 2FA, expiry, revocation | open | Nate/Shopify owner | No Shopify access or theme packet |
| T-03 | Payment, customer data, email capture, retention | open | Nate | No payment/PII/email configuration |
| T-04 | Custom webhooks or background sync | deferred, prohibited at launch | Codex/Sol | Any exception requires a new threat review |
| T-05 | Consent-aware analytics and marketing measurement | open | Codex/Nate | No analytics/ESP packet |
| T-06 | WooCommerce authority, freeze, reconciliation, rollback | open | Nate/commerce owner | No catalogue transfer or cutover |
| T-07 | Dirty worktree, accidental commit/deploy | in-progress | Codex | No commit, push, deploy, or publish |
| T-08 | Codex↔Claude context leakage, redaction, file allowlist | open | Codex | No handoff containing PII, raw communications, or feedback logs |
| T-09 | File ownership, locks, leases, interrupted handoff | in-progress | Codex | No write without held lock and matching base hash |
| T-10 | Autonomous-action and external-action gates | in-progress | Sol/Nate | Stop on any external or production action |
| T-11 | Escalation ladder and final authority | in-progress | Sol/Nate | Stop on scope change, conflict, or failed gate |
| T-12 | Full UAT, monitoring, support, rollback rehearsal | open | Sol/Nate | No production go/no-go |

## Packet and receipt templates

Every future packet must use this shape:

```text
Packet ID / phase / parent decision
Base commit and relevant per-file hashes
Objective / non-goals
Readable inputs
Exclusive writable files, if any
Approval class / forbidden actions
Dependencies and prior receipts
Action / Verify / Done / Stop for each task
Required evidence and output path
Rollback or recovery method
```

Every worker receipt must return:

```text
Packet ID / status
Files read / files changed
Commands, checks, and exit results
Evidence paths or screenshots, where applicable
Acceptance result
Blockers / unresolved questions
Residual risk
Next gate requested
```

## Escalation ladder

1. **Worker:** stop immediately, change nothing further, and report the trigger.
2. **Codex coordinator:** verify evidence, ownership, hashes, and scope; keep the gate closed or prepare a bounded replan.
3. **Sol/high reviewer:** assess reasoning, security, integration, and whether the packet may be reissued.
4. **Nate:** gives final approval for content conflicts, external access, payments, client sends, production, deployment, cutover, and accepted residual risk.

No lower rung may silently override a higher-rung stop. Silence is not approval.

## Dirty-worktree and accidental-action protection

The repository currently contains extensive uncommitted and untracked WIP. Therefore:

- workers may not commit, push, deploy, publish, branch-archive, or run production commands;
- only Codex may prepare a commit or external-action packet, and only after a separate approval gate;
- any future commit must use an explicit named file list and pre/post status receipt;
- no cleanup, staging, reset, deletion, or opportunistic formatting is permitted;
- a dirty working tree is evidence to preserve, not a reason to normalise or discard changes.

## Consent enforcement rule

The named testimonials remain local WIP evidence only and are not cleared for any external review pack, screenshot set, client send, public page, or production theme. Any packet containing them must stop unless a consent/attribution receipt is attached. This is a governance hold; no WIP edit has been made to implement it.

## Escalation and stop conditions

Stop and return to Codex/Sol on scope expansion, source conflict, secrets/PII, unclear ownership, lock mismatch, failed verification, new integration, external access, payment/DNS/email action, or any request to send/publish/deploy/commit.

## Current gates

| Gate | Status | Evidence / blocker |
|---|---|---|
| GOV-01 ratified decisions | passed for governance defaults | This ledger and lock manifest |
| GOV-01-P04 homepage dispositions | ratified | Nate accepted the PAGE-01 cluster, ritual asset dependency, Shopify defers, and standing testimonial/CTA rulings |
| Read-only evidence baseline | passed | HEAD, WIP diff-check, baseline hashes captured |
| Lock manifest exists | passed for governance setup | Empty manifest; no mutating lock granted |
| WooCommerce export | blocked | Not available locally |
| CAT-01 import ledger | blocked | Cannot begin until WooCommerce export exists |
| Homepage merged review register | dispositioned and authoritative for PAGE-01 admission | Subject to security/access gate and held locks |
| GOV-01-P03 responsive evidence | passed for read-only evidence | Six breakpoints inspected; no horizontal overflow; new 42px mobile control observation recorded |
| Shopify security/access gate | open | Least-privilege access, 2FA, revocation unverified |
| External testimonial exposure | blocked | Consent receipt absent |

## Next admissible packet

No further MapleMoon packet is required before the WooCommerce export arrives. On receipt, admit `CAT-01A` as read-only provenance extraction. It may write only to a newly named CAT-01 ledger output path with a coordinator-granted held lock; it may not edit WIP, theme, feedback, or external systems. Until then, no mutating packet is authorized and the lock manifest remains empty.
