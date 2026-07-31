# Packet CAT-01A-READ — Catalogue Provenance Extraction

**Candidate:** `CTRL-V2-CANDIDATE-20260730-001`
**State:** `blocked`
**Approval class:** `read-only`
**Owner:** Unassigned
**Execution gate:** V2 ratification plus both approved inputs and PII preflight

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "document_id": "PACKET-CAT-01A-READ",
  "packet_id": "CAT-01A-READ",
  "candidate_id": "CTRL-V2-CANDIDATE-20260730-001",
  "phase": "CAT-01",
  "state": "blocked",
  "approval_class": "read-only",
  "writable_paths": [],
  "receipt_transport": "inline-manual",
  "required_inputs": [
    "fresh WooCommerce product export",
    "client-approved retail catalogue"
  ],
  "pii_exclusion_required": true,
  "authority_reference_required": true,
  "next_reviewer": "Codex"
}
<!-- CONTROL-PLANE:END -->

## Objective

After both inputs arrive and pass local intake, read them to extract provenance, schema, row counts, product/SKU/variant identifiers and discrepancies. Return findings inline. Do not create a ledger.

## Source hierarchy

- Client-approved retail catalogue: intended products, prices and sell options.
- WooCommerce: live operational comparator until controlled cutover.
- Approved content: copy and claims.
- WIP: layout evidence only.

## Intake preconditions

Before unblocking, a coordinator packet must name:

- exact local paths, custodian, raw SHA-256, format, byte size and UTF-8/schema policy;
- PII scan with explicit exclusion of customer/order/contact/payment/free-text personal data;
- formula-prefix, malformed-row, unexpected-column, duplicate-SKU and invalid-encoding behavior;
- metadata-only quarantine and no raw PII retention;
- source expiry/disposal and approved authority references.

## Action / Verify / Done / Stop

**Action:** Parse only admitted product/catalogue fields and compare sources without choosing a winner.

**Verify:** Source hashes, row counts, schema, PII exclusion and authority references. Record conflicts as confirmed, conflict, unknown, excluded or approval-required.

**Done:** Inline/manual provenance receipt; zero persisted files and zero external access.

**Stop:** Missing input/authority, PII, formula risk, malformed or unexpected data, source drift, request to persist output, or any Shopify/WooCommerce connection.

`CAT-01B-LEDGER` is a later, separate mutating-local packet with fresh locks. It is not created or authorized here.

## GOV-01 transition conflict

The still-controlling GOV-01 reconciliation says CAT-01A may create a newly named output path under a held lock. This conflicts with V2’s safer split.

- Before V2 ratification: CAT-01A remains blocked; neither interpretation is admitted.
- If Nate ratifies this candidate: `CTRL-V2-P04` must explicitly supersede that GOV-01 output-path clause.
- After that supersession: `CAT-01A-READ` is zero-write/inline; only a future `CAT-01B-LEDGER` may persist output under new locks.
