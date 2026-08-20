> ⛔ **SUPERSEDED 20 Aug 18:15 — do not launch.**
>
> SUPERSEDED by .../TASK2_CATALOGUE_RECONCILIATION.md. This file's only unique content, the Admin-API-unavailable contingency and the second CSV copy, has been grafted into that packet as an addendum. DO NOT RUN THIS FILE.

# MapleMoon catalogue reconciliation — Woo × CSV × 24-card — 2026-08-20 17:58 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-CATALOGUE-RECONCILIATION-WOO-24-20260820T175821",
  "worker_thread_id": "/root",
  "state": "ready",
  "objective": "Produce one three-way reconciliation table binding the hash-pinned CSV export (119 rows), the live WooCommerce site (28 sitemap products), and the 24-card private candidate catalogue. Every row must land in exactly one disposition. The Shopify side is NOT part of this reconciliation and must be reported as unverifiable, blocked on Q1.",
  "authority": "Read-only. Anonymous scraping of the public WooCommerce site and local file reads only. No Shopify write, no Shopify Admin call, no app install.",
  "base": {
    "authoritative_csv": "/Users/handtomouse/Downloads/Maple Moon Store CSV File Export.csv",
    "authoritative_csv_sha256": "eeea19fd89b30052bd4c4cf28519f56f1195e4595c92485fb186a66719e6b114",
    "authoritative_csv_rows": 119,
    "csv_authority_source": "pinned as authoritative in the 16 Aug BOSS ledger and re-confirmed 20 Aug",
    "live_site": "https://maplemoon.com.au",
    "live_platform": "WooCommerce/WordPress - Shopify is the migration target, NOT yet the system of record",
    "live_sitemap_product_count": 28,
    "live_eclipse_bites_category_count": 6,
    "candidate_catalogue_cards": 24,
    "candidate_catalogue_source": "docs/orchestration/packets/MAPLEMOON-CONTENT-CATALOGUE-TRUTH-AUDIT-R2-20260814T164221.md",
    "import_csv_built_20aug": "docs/shopify/PRODUCTS-ECLIPSE-BITES-IMPORT-20260820.csv",
    "import_set_size": 6,
    "enquiry_only_holds": ["Pure Carob Moon", "Cayenne Moon", "Goji Carob Bites", "Coconut Carob Bites"],
    "shopify_side": "UNVERIFIABLE - no Admin API credential on this machine, CLI session is theme-scoped, 'shopify app execute' requires an app installed on the store which is a Gate 0 authority decision"
  },
  "readable_paths": [
    "/Users/handtomouse/Downloads/Maple Moon Store CSV File Export.csv",
    "/Users/handtomouse/maplemoon-website/docs/shopify/BACKLOG-ASSUMPTIONS-QUESTIONS-20260820.md",
    "/Users/handtomouse/maplemoon-website/docs/shopify/COLLECTIONS-PLAN-20260820.md",
    "/Users/handtomouse/maplemoon-website/docs/shopify/PRODUCTS-ECLIPSE-BITES-IMPORT-20260820.csv",
    "/Users/handtomouse/maplemoon-website/docs/shopify/REDIRECT-MAP-WOO-TO-SHOPIFY-20260820.csv",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-CONTENT-CATALOGUE-TRUTH-AUDIT-20260814T161450.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-CONTENT-CATALOGUE-TRUTH-AUDIT-R2-20260814T164221.md",
    "/Users/handtomouse/maplemoon-website/docs/client-review/2026-08-01-saturday-review/SHOPIFY-OS2-MIGRATION-GATES-20260802.md"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/catalogue_reconciliation_20260820T175821",
    "maplemoon-website/docs/shopify/RECONCILIATION-WOO-CSV-24CARD-20260820T175821.md",
    "maplemoon-website/docs/shopify/RECONCILIATION-WOO-CSV-24CARD-20260820T175821.csv",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CATALOGUE-RECONCILIATION-WOO-24-20260820T175821.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CATALOGUE-RECONCILIATION-WOO-24-20260820T175821.json"
  ],
  "authorized_external_side_effect": "Anonymous HTTP GET against the public maplemoon.com.au WooCommerce site only. No authenticated call to any system.",
  "method": [
    "assert the CSV hash equals eeea19fd89b30052bd4c4cf28519f56f1195e4595c92485fb186a66719e6b114 before reading a single row; STOP if it does not match, because every downstream claim depends on it",
    "assert the CSV parses to exactly 119 rows; report the actual count if it does not",
    "extract the 24-card list verbatim from the catalogue truth audit R2, quoting each card's number, name, category and disposition; do NOT reconstruct or infer this list",
    "scrape the live Woo product sitemap anonymously and enumerate every product URL, name and price; record the actual count rather than assuming 28",
    "build the three-way table: one row per distinct product identity, with columns for CSV presence, Woo presence, 24-card presence, price agreement, and disposition",
    "assign every row exactly one disposition from: IN-IMPORT-SET, ENQUIRY-ONLY-HOLD, LIVE-ONLY-NOT-MIGRATING, CANDIDATE-ONLY-NOT-LIVE, IDENTITY-HELD, UNRESOLVED",
    "flag every price disagreement between the CSV and the live scrape as a discrete finding with both values quoted",
    "handle variable products correctly: the five singles are variable products with 1/6/12 pack variations, not single-price products; a reconciliation that collapses them to one price is WRONG",
    "record which rows carry active open-ended sale prices, since those migrate differently",
    "report the SKU gap explicitly: 0 of 119 rows carry a SKU, and SHOP-046 forbids inventing them",
    "write a clearly separated section titled 'Shopify side: unverifiable' stating that no Admin API credential exists on this machine, that the CLI session is theme-scoped, and that reading Shopify's actual product state is blocked on Q1 pending a Gate 0 authority decision",
    "do NOT attempt to read, create or verify any Shopify product or collection",
    "write the reconciliation as both a human markdown table and a machine-readable CSV, plus a maplemoon-receipt/v2 receipt, then stop"
  ],
  "verify": [
    "the CSV hash assertion is quoted in the report with its actual computed value",
    "the row count assertion is quoted with its actual value",
    "the 24-card list in the report is quoted from the audit R2, with the source line for each card",
    "every one of the 24 cards appears exactly once in the reconciliation table",
    "every live Woo product appears exactly once in the reconciliation table",
    "the dispositions sum to the count of DISTINCT PRODUCT IDENTITIES in the table, not to the 119 CSV rows; the three sources are different sizes and 119 rows collapse to far fewer identities, so state the identity count explicitly and show the dispositions summing to it",
    "the four enquiry-only holds are present and are NOT in the import set",
    "the five variable products show three variation prices each, not one",
    "the report contains an explicit 'Shopify side: unverifiable' section naming Q1 and Gate 0",
    "every gate that cannot be run is reported as not run, with its reason and its instrument"
  ],
  "stop": [
    "the CSV hash does not match eeea19fd89b30052bd4c4cf28519f56f1195e4595c92485fb186a66719e6b114",
    "the 24-card list cannot be quoted verbatim from the audit R2, which would mean inventing the launch set",
    "the live site is unreachable or has been re-platformed, which would invalidate the Woo side",
    "any row cannot be assigned a disposition, which is a real finding and must be reported as UNRESOLVED rather than forced",
    "the task appears to require any Shopify Admin credential"
  ],
  "forbidden_actions": [
    "read, create, update or delete any Shopify product, collection, metaobject or publication",
    "install any Shopify app, or run 'shopify app execute'",
    "invent a SKU, barcode, weight or price for any row",
    "treat 'publish all 24 at launch' as a settled ruling; it is Q10 and unresolved",
    "treat the 19 Aug 'Bites & Eclipses' to 'Eclipse Bites' rename as ratified; it is Q11 and unresolved",
    "modify the authoritative CSV in /Users/handtomouse/Downloads",
    "touch anything under _wip/recovery/, which the theme lane owns",
    "commit to main, or push any branch"
  ],
  "next_reviewer": "MapleMoon root Boss, then Nate",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Scope note, read this before starting

The obvious version of this task — "reconcile Woo against what is in Shopify" — **cannot be run.**
There is no Admin API credential anywhere on this machine, the CLI session is theme-scoped, and
`shopify app execute` needs an app installed on the store, which is a Gate 0 authority decision
that no lane may take. That is Q1 in the 20 Aug backlog.

So this packet reconciles the three sources that **are** readable: the hash-pinned CSV export,
the live WooCommerce site, and the 24-card private candidate catalogue. The Shopify column is
deliberately absent and its absence must be stated, not quietly omitted.

Two rulings are **not** settled and must not be assumed:
- **Q10** — "publish all 24 at launch" cannot mean 24 priced checkout products, since four are
  enquiry-only holds and `SHOP-060` holds every SKU's checkout proof pending verified weight.
- **Q11** — the `Bites & Eclipses` → `Eclipse Bites` rename has not been ratified.

## Handoff

    Goal:        One three-way reconciliation table (CSV × Woo × 24-card) where every product
                 identity lands in exactly one disposition, with the Shopify side explicitly
                 reported as unverifiable and blocked on Q1.
    Inputs:      the readable_paths array above, all absolute; CSV hash asserted first
    Steps:       the numbered `method` array in the control plane, in order
    Verify:      every item in the `verify` array; the load-bearing one is that dispositions
                 sum to the count of distinct product identities, stated explicitly
    Output:      a report of 10 lines or fewer: hash assertion result, row count,
                 six disposition totals, count of price disagreements, count of unresolved rows,
                 and one line confirming the Shopify-unverifiable section is present
    Do not touch: everything in `forbidden_actions`; especially no Shopify Admin call and no
                 invented SKU, barcode, weight or price
    Checkpoint:  at ~250 turns or ~40% context, write state and continue in a fresh session

**Launch needs `--network`** (anonymous scrape of maplemoon.com.au):

    ~/bin/codex_lane.sh maplemoon-catalogue-reconciliation \
      /Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-CATALOGUE-RECONCILIATION-WOO-24-20260820T175821.md \
      -C /Users/handtomouse/maplemoon-website --network
