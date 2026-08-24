# MapleMoon Shopify catalogue reconciliation R3 — 2026-08-24 10:42 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-SHOPIFY-CATALOGUE-RECONCILIATION-R3-20260824T104207",
  "worker_thread_id": "019ffe53-6243-73a2-9d75-e1a072cd07ce",
  "state": "admitted_documentation_only_reconciliation",
  "objective": "Produce one non-overwriting, machine-verifiable Shopify catalogue reconciliation that corrects the stale 20 August and 23 August specs against the current durable Boss ledger, the authoritative Woo export, the verified 23-product Shopify snapshot and the governed 24-card catalogue. No Shopify write is admitted.",
  "authority": "Nate directed BOSS to execute. The durable Boss ledger is highest authority: launch all governed 24 products, preserve Goji Carob Bites and Coconut Carob Bites as distinct identity-held products, use Woo for hierarchy/variation names/prices/stock, use GST-inclusive pricing, do not invent SKUs, stock quantities or shipping weights, use image-free states where imagery is unapproved, and keep store mutation/publish/deploy separately gated.",
  "base": {
    "head": "7c04f808e285acc116ae0f93c3d887ee1e96aea3",
    "boss_ledger_sha256": "bc23e18da7b2e03d1d2eb4d9ab613b23fc226650870d848e9636fc1ddcca9c10",
    "woo_csv_sha256": "eeea19fd89b30052bd4c4cf28519f56f1195e4595c92485fb186a66719e6b114",
    "shop_wip_sha256": "f9d150dea283d43eb0a14e02dfeccf9ea1eb4eae87ec82a546ab6984f3fa5604",
    "catalogue_reconciliation_r1_sha256": "b80cd3e8158d14d03f631cba79e1f3590e27587493b2dfbeef2ab1180afad7f1",
    "shopify_snapshot_20260823_sha256": "79a51d356295e1fa005123d4583f8248bc2bc6abc44449b04b00caa8a41d56bb",
    "stale_create_spec_sha256": "65292dbbbbc7a55edf476784897313fc1bacb243c85f413b44368d2879916e99"
  },
  "readable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-CATALOGUE-RECONCILIATION-R3-20260824T104207.md",
    "maplemoon-website/docs/orchestration/MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md",
    "maplemoon-website/docs/orchestration/CATALOGUE-RECONCILIATION-20260820.md",
    "maplemoon-website/docs/orchestration/catalogue-reconciliation-20260820.csv",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CONTENT-CATALOGUE-TRUTH-AUDIT-R2-20260814T164221.md",
    "maplemoon-website/_wip/shop.WIP.html",
    "maplemoon-website/out/shopify_diff_20260823.md",
    "maplemoon-website/out/shopify_create_spec_20260823.md",
    "maplemoon-website/out/maplemoon_lane_20260823_receipt.json",
    "/Users/handtomouse/Library/Messages/Attachments/e0/00/3631B118-5A32-487A-8E55-C0533B3B96CB/Maple Moon Store CSV File Export.csv"
  ],
  "writable_paths": [
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-CATALOGUE-RECONCILIATION-R3-20260824T104207.md",
    "maplemoon-website/_wip/evidence/shopify_catalogue_reconciliation_r3_20260824T104207",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-CATALOGUE-RECONCILIATION-R3-20260824T104207.json"
  ],
  "implementation_contract": [
    "preserve the governed 24 exactly: Bars 6, Moons 6, Eclipses 6, Bites 2, Elixirs 2, Bananas 1, Powder 1",
    "preserve Goji Carob Bites and Coconut Carob Bites as distinct identity-held products; do not carry forward the stale N13/N14 surplus ruling",
    "treat Eclipse Bites as a collection/family, never as a standalone product; the six products are four named Eclipse Bites, Salted Caramel Fudge and Eclipse Bite Bundle",
    "use Woo exact variant rows and sale/regular price semantics; record all blank Woo SKU, stock quantity and structured shipping-weight fields as gaps",
    "record the 23-product Shopify snapshot as verified on 2026-08-23, not live-current on 2026-08-24; authentication expiry is a close gate for external mutation, not permission to guess",
    "identify the exact update/create/archive proposal with stable IDs where known, but do not generate or execute any Shopify mutation",
    "mark image bindings separately and admit no review-only, fake, wrong-product or unapproved media"
  ],
  "verify": [
    "all pinned local input hashes match at acquisition and close",
    "Woo CSV parses to 119 rows, 28 parents, 91 explicit variation rows and 99 sellable records",
    "governed catalogue counts exactly 24 with 6/6/6/2/2/1/1 family accounting",
    "exactly 20 governed products map to Woo parents and exactly four do not: Pure Carob Moon, Cayenne Moon, Goji Carob Bites, Coconut Carob Bites",
    "the proposal contains no standalone Eclipse Bites product and uses $5.99/$35.99/$71.99 regular prices with $32.99/$59.99 sale values for the five variable Eclipse products",
    "all 23 Shopify snapshot IDs receive exactly one proposed disposition; external state remains read-only and refresh-required",
    "machine JSON and human report map one-to-one and only the three exact writable paths change"
  ],
  "stop": [
    "a pinned local authority hash changes",
    "the exact 24-product accounting cannot be reconciled without inventing an identity, price, SKU, stock quantity or shipping weight",
    "a Shopify write, publish, archive, upload, login credential disclosure, theme, Git, deploy, production or client action would be required"
  ],
  "forbidden_actions": [
    "mutate, delete, stage, move, rename or gitignore any preserved out artifact",
    "write to Shopify or save credentials",
    "change customer-facing site files, the Woo export, catalogue source files, media, theme, Git, Vercel, production or client state"
  ],
  "next_reviewer": "MapleMoon BOSS for exact receipt replay and a separate external-auth/write decision",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## BOSS decision

GO for documentation-only R3 reconciliation. Shopify remains read-only and external mutation
remains HOLD. This packet supersedes neither the Woo export nor the governed catalogue; it
corrects stale derived interpretations so a later write packet can be exact and reversible.
