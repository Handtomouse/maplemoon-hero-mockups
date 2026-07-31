# Packet VIS-02B2 - Verified Catalogue Binding

**Packet ID:** `VIS-02B2-CATALOGUE-BINDING`  
**Candidate authority:** `CTRL-V2-CANDIDATE-20260730-001`  
**Cluster:** `VIS-02B2-CATALOGUE-BINDING`  
**State:** `blocked / admitted`  
**Approval class:** `mutating-local-derived-review`  
**Owner:** Codex  
**Final decision owner:** Nate

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "VIS-02B2-CATALOGUE-BINDING",
  "candidate_id": "CTRL-V2-CANDIDATE-20260730-001",
  "phase": "VIS-02",
  "state": "blocked",
  "approval_class": "mutating-local-derived-review",
  "cluster_id": "VIS-02B2-CATALOGUE-BINDING",
  "objective": "Replace the synthetic B1 fixture with accepted product, price, availability and selling-option evidence after CAT-01 reconciliation.",
  "non_goals": [
    "WooCommerce credential access by an agent",
    "live WooCommerce or Shopify writes",
    "automatic resolution of source conflicts",
    "client contact, send, upload, deployment, commit, push or production action"
  ],
  "readable_paths": [
    "fresh local WooCommerce admin Products CSV supplied by Nate",
    "Carli's approved retail catalogue supplied locally",
    "accepted CAT-01 provenance and reconciliation receipt",
    "VIS-02B1-MOCK-CART-SHELL receipt and implementation"
  ],
  "writable_paths": [],
  "dependencies": [
    "fresh WooCommerce admin Products CSV",
    "Carli-approved retail catalogue",
    "CAT-01 schema, provenance, row-count, hash and PII checks accepted",
    "human decision for every WooCommerce and Carli conflict",
    "new exact-path packet and fresh lock acquisition before implementation"
  ],
  "blockers": [
    "fresh WooCommerce export is not accepted",
    "Carli-approved retail catalogue is not accepted",
    "CAT-01 reconciliation has not passed"
  ],
  "action": "Remain blocked. On accepted inputs, create a new exact binding packet that admits only reconciled records and excludes every unresolved conflict.",
  "verify": [
    "no PII in accepted inputs",
    "every displayed commerce fact binds to accepted provenance",
    "conflicting records remain excluded",
    "clean and annotated cart facts match",
    "no live commerce request or write"
  ],
  "done": "The clean and annotated review cart uses only accepted catalogue facts and returns a needs_review receipt.",
  "stop": [
    "input missing, stale, partial, contradictory or contains PII",
    "human decision missing for a conflict",
    "external-system write would be required"
  ],
  "next_reviewer": "Codex"
}
<!-- CONTROL-PLANE:END -->

No implementation lock is held.
