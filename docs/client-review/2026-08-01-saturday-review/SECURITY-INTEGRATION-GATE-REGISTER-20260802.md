# MapleMoon security and integration gate register

**Status:** local threat model only; no live system was accessed or tested  
**Verdict:** preparation may continue locally; every credential, integration, collection, deployment and production gate is HOLD

## Rating method

- **Critical:** could expose credentials/personal data, misdirect commerce, publish the wrong artifact or prevent safe rollback.
- **High:** could materially compromise access, factual/catalogue truth, privacy, checkout, integrations or availability.
- **Medium:** meaningful integrity, accessibility, operational or maintenance risk requiring evidence before activation.

“Required evidence” is a gate, not a claim that the control already exists.

## Register

| ID | Risk | Severity | Prevention/evidence gate | Owner class | Current state |
|---|---|---:|---|---|---|
| ACC-01 | Shared/admin accounts or weak authentication allow unauthorized store, host or analytics access | Critical | Named individual accounts, 2FA, least privilege, role review, recovery owner and access log | Store/host owner + security reviewer | HOLD: accounts and roles not inspected |
| SEC-01 | Tokens, passwords or customer data leak through source, prompts, screenshots, receipts or logs | Critical | No secrets in repo/chat; approved secret store; redacted evidence; rotation/revocation test | Security owner | HOLD: no credential handling authorized |
| ENV-01 | Development, review and production environments or data become mixed | High | Named environments, separate URLs/config/data, visible test flag, deployment authority and promotion manifest | Integration owner | HOLD: environment architecture not approved |
| SUP-01 | Third-party theme, app, script, pixel or form adds excessive permissions, tracking or supply-chain risk | High | Vendor/permission/data-flow review, necessity, contract/support, update/removal plan and isolated test | Security/integration owner | HOLD: no vendor selected |
| FORM-01 | Forms collect excessive or unsafe data, invite spam/abuse or expose submissions | High | Minimum fields, labels/validation, spam control, approved endpoint, notice, access, retention, deletion and failure/retry test | Data owner + security reviewer | HOLD: no live form authorized |
| ANA-01 | Analytics/cookies/pixels collect unapproved identifiers or mix test and production data | High | Named questions, event/property allowlist, consent disposition, `test_data` separation, redaction, retention and disable switch | Analytics/privacy owner | HOLD: collection is off |
| IMP-01 | WooCommerce/catalogue import carries stale/conflicting data, PII, spreadsheet formula payloads or irreversible mistakes | Critical | Hash/provenance/schema/row-count/PII/formula scan, conflict report, backup, dry run and rollback custody | Catalogue coordinator + store owner | BLOCKED: required inputs absent |
| CNT-01 | Rich text, metafields, imported HTML or URLs inject unsafe markup/scripts or misleading content | High | Source allowlist, sanitisation/escaping, safe link scheme, rendered review and content approval | Theme/content owner | HOLD: implementation absent |
| COM-01 | Custom cart/checkout logic misstates price, availability, order or payment outcome | Critical | Native Shopify product/cart/checkout truth, approved test mode, order reconciliation and no fake completion in production | Commerce owner | HOLD: native commerce not configured |
| REV-01 | Forwarded review links expose internal/annotated/WIP/governance material, account login or unintended audience | High | Exact clean artifact, access/expiry/revocation, route allowlist, forwarded-link test and explicit audience/channel approval | Nate/review owner | HOLD: absolute no-share rule active |
| MED-01 | Images disclose GPS/EXIF, lack consent/provenance or misrepresent generated material as real | High | Provenance/consent record, metadata strip where appropriate, approved masters/crops/alt text and generated-content disclosure | Asset owner | HOLD per asset until approved |
| SEO-01 | Bad redirects, canonical/noindex transition or domain change loses traffic or exposes the review site | High | URL inventory, collision/loop test, canonical/robots/sitemap plan, staged verification and DNS rollback | Domain/SEO owner | HOLD: final URLs/domain authority absent |
| STK-01 | Stockist records are inaccurate, stale or expose personal contact/address data beyond agreed business listings | High | Verified business source, minimum fields, update/removal owner, provenance timestamp and privacy review | Client/data owner | HOLD: production source model unresolved |
| SRC-01 | A stale worktree, derived package or unpinned source is promoted | Critical | Exact source/manifest hashes, served-checkout proof, one owner, recovery checkpoint and independent acceptance | Main coordinator | Controlled locally; promotion still HOLD |
| ROL-01 | Theme/import/domain/integration change cannot be rolled back | Critical | Last-known-good export, restore rehearsal, named rollback authority, abort thresholds and WooCommerce recoverability | Nate + technical owner | HOLD: no live change authorized |
| OBS-01 | Checkout, redirect, form or availability failures go unnoticed or leak sensitive logs | High | Minimal redacted monitoring, alert owner, incident severity/runbook, disable/rollback action and retention | Operations/security owner | HOLD: observability not selected |
| NET-01 | Host/security headers, CSP, framing or cross-origin behaviour are assumed rather than tested | High | Test exact chosen host response headers, allowed origins, framing, HTTPS, cache and error behaviour | Host/security owner | HOLD: no chosen host; no protection claimed |
| MAIL-01 | Newsletter/contact/CRM sends without valid consent, correct routing or suppression/deletion handling | High | Approved provider/recipient, notice/consent, double opt-in decision, least privilege, suppression/export/deletion UAT | Client/data owner | HOLD: integration not selected |
| A11Y-01 | Access/security controls or third-party widgets make the site unusable by keyboard, zoom or assistive technology | Medium | Keyboard/focus/200%/screen-reader-oriented UAT on the exact integrated artifact | Accessibility owner | HOLD until integrated artifact exists |

## Global fail-closed rules

- No evidence means HOLD, never assumed PASS.
- No shared credential or secret enters a packet, receipt, screenshot or client message.
- A local specification PASS never authorizes implementation or external action.
- A vendor/app/script is excluded until its permissions, network requests, data, retention and removal path are understood.
- A catalogue conflict is surfaced; no source silently wins.
- A review access request while Nate sleeps becomes a morning HOLD; no site material is exposed.
- No cutover without exact last-known-good artifacts, tested rollback and written go/no-go.

## Legal and compliance boundary

This register is operational risk planning, not legal advice or certification. The applicability of specific privacy, consumer, accessibility, marketing, tax or records obligations must be decided by the appropriate owner/adviser for the actual systems, data, audience and jurisdiction.
