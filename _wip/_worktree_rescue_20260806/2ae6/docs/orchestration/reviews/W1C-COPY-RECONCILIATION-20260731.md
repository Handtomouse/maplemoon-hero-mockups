# Wave 1C Copy Reconciliation Receipt

**Packet:** `W1C-COPY-RECONCILIATION-20260731`
**State:** `needs_review` / derived rebuild blocked
**Scope:** Our Story, Carob Story and FAQ only
**Action class:** read-only source reconciliation; no canonical WIP edits
**Decision owner:** Nate

## Evidence hierarchy

1. The 30 July Carli correction recorded in `CARLI-CLAIMS-REPLACEMENT-OPTIONS-20260731.md` overrides older wording for disputed process claims.
2. The governed 19 July Carli content handoff remains the source for older approved copy where it does not conflict:
   `/Users/handtomouse/UFC/ops/handoffs/handoff_20260719_mm_carli_doc_content.md`
3. The three `_wip` pages are layout and review evidence, not authoritative claim approval.

The local snapshot contains no separate Canva export or exact Canva wording source. No Canva wording was invented or applied.

## Latest correction boundary

Do not publish or approve wording that says or implies:

- slow-roasted carob;
- smooth carob;
- Maple Moon mills the carob powder;
- handmade, handcrafted or made in small batches.

Carli's correction specifically says Maple Moon buys the carob powder and does not mill it.

## Occurrence matrix

| Page | Current occurrences | Disposition |
|---|---|---|
| Our Story | Metadata at lines 12, 166 and 238; craft heading/body at 366-370; alt text at 366; pending founder cards at 317-320; farm placeholder at 355; unsupported wellbeing/children language at 381 and 409-411 | Withhold disputed claims and visible pending sections from clean. Preserve only after exact approved replacement copy is supplied. Founder portrait remains a visual candidate, not a locked asset. |
| Carob Story | Metadata at 12, 197, 203 and 269; hero at 316; process steps at 361-363; taste answer at 406; ingredient answer at 414; made answer at 418 | Exclude or rewrite the process and affected answers. Retain only safe ingredient/origin facts after exact wording approval. |
| FAQ | Answers at 99, 102 and 103 repeat disputed roast/mill/small-batch claims; pending category and answer at 95 and 109; purchase answer at 105 says store details are being confirmed | Remove disputed answers and the pending category from clean. Keep support answers only where policy, catalogue and source wording are approved. |

## Safe factual baseline for review, not automatic WIP approval

- Carob is a naturally sweet pod, not a bean.
- Maple Moon uses Australian-grown carob.
- Carob itself is naturally caffeine free.
- Carob and cacao are different ingredients.
- Product labels are the source for exact ingredients.
- Email support routes may remain as local review pathways.

The older 19 July handoff contains conflicting claims such as slow roasting, milling, handcrafted production, small batches and wellbeing outcomes. Those lines remain evidence of the historical source, not approval to publish them after the 30 July correction.

## Derived review route status

No clean or annotated Saturday page was rebuilt. The existing builder is pinned to:

`docs/client-review/2026-07-29-carli-review/staging-v1`

That source directory is absent in this snapshot. Running the builder would therefore fail its provenance contract or require changing the builder and its source pins, which is outside this bounded packet.

Canonical WIP files remain unchanged. No claim replacement, asset replacement, client contact, send, commit, push, deploy, Shopify or production action occurred.

## Required next packet

`W1C-DERIVED-REBUILD-20260731`

Admit only after Nate approves the exact replacement or exclusion policy and the derived source root is restored or a new source-pin packet is accepted. Writable scope should be limited to the Saturday derived clean/annotated output and its manifest, never the three canonical WIP pages.
