# VIS-02B1 Snapshot Reconciliation Receipt

**Date:** 2026-07-31
**Scope:** supplied MapleMoon worktree snapshot
**Mode:** read-only reconciliation plus restoration of the absent derived review tree
**Decision owner:** Nate

## Outcome

The supplied worktree was missing the derived Saturday review output at
`docs/client-review/2026-08-01-saturday-review/staging-v1/`. The exact tree was
restored from the canonical local checkout at
`/Users/handtomouse/maplemoon-website/docs/client-review/2026-08-01-saturday-review/staging-v1/`
after targeted source parity checks passed.

No canonical WIP page, shared source file, governance file, external system or
production surface was changed. Existing dirty worktree changes were preserved.

## Source admission evidence

Targeted files matched byte-for-byte between the supplied worktree and the
canonical checkout before restoration:

- `_wip/shop.WIP.html`
- `docs/client-review/2026-08-01-saturday-review/shared/mock-cart.js`
- `docs/client-review/2026-08-01-saturday-review/shared/mock-cart.css`
- `scripts/check-maplemoon-cart.mjs`
- `scripts/build-maplemoon-saturday-review.py`
- `scripts/check-maplemoon-review.py`
- `package.json`

The restored tree contains 154 files and is byte-identical to the canonical
tree. Its aggregate manifest SHA-256 is:

`5a72253b040f02dd3215ca805e50bbc614415a044cdecd34df29125a50217f9f`

The earlier VIS-02B1 receipt records aggregate hash
`1e3d930e231b27b0c99ff5047e4f46550db2eb7cac59dde8eade07982cb039b8`; that
historical hash does not match the current canonical/restored tree and remains
an evidence discrepancy, not silently corrected in the historical receipt.

## Verification

- `npm run review:saturday:check`: PASS, 0 failures, 0 warnings
- `npm run review:saturday:cart`: PASS
- restored tree versus canonical tree with `diff -qr`: PASS, byte-identical
- WIP HTML parser: PASS
- shared cart and checker syntax checks: PASS
- `git diff --check`: PASS

The deterministic checks confirm clean and annotated route manifests, aliases,
metadata, local references, forbidden-content rules, parity, Add to cart
binding, pending-product treatment, fake checkout, local form behavior,
accessibility guards and no-network checks.

## Remaining boundaries

- No browser/mobile/desktop visual walkthrough was performed in this packet.
- Exact 200% zoom and full human keyboard traversal remain open.
- Product facts remain review-card fixtures, not CAT-01 authority.
- `VIS-02B2-CATALOGUE-BINDING` remains blocked until the fresh WooCommerce
  export, approved retail catalogue and CAT-01 provenance/PII checks pass.
- No commit, push, deploy, send, upload, Shopify, WooCommerce or production
  action was performed.

## Next gate

Nate reviews the restored clean/annotated Shop journey. Catalogue binding does
not proceed from this receipt.
