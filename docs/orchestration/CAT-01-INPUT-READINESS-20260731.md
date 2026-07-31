# CAT-01 Input Readiness

**Date:** 2026-07-31  
**Owner:** Codex  
**State:** blocked-external  
**Packet:** `CAT-01A-READ`

## Current evidence

No fresh WooCommerce product export or approved retail catalogue was found in the bounded repository search.

## Required inputs

1. fresh WooCommerce product export;
2. client-approved retail catalogue containing the intended products, prices and selling options.

## Intake record required for each input

- exact local path and custodian;
- received date and source authority;
- byte size, format and raw SHA-256;
- expected encoding and schema;
- row count and column inventory;
- product, SKU and variant identifier policy;
- PII exclusion result;
- formula-prefix, malformed-row, duplicate-SKU and unexpected-column policy;
- expiry/disposal instruction.

## Stop conditions

Stop and quarantine metadata-only if an input contains customer, order, contact, payment or free-text personal data; formulas; malformed rows; unexplained columns; source drift; or an unclear authority chain.

## Next state

When both approved inputs exist locally, run `CAT-01A-READ` as a zero-write provenance comparison. Do not connect to WooCommerce or Shopify and do not persist a catalogue ledger under that packet.
