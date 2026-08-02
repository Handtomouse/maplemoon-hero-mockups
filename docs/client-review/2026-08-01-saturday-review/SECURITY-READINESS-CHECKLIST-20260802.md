# MapleMoon security readiness checklist

**Status:** pre-implementation checklist; unchecked items are HOLD

## Access and secrets

- [ ] Name the store, host, domain, analytics, form and email owners.
- [ ] Use individual accounts, 2FA and least-privilege roles; review sensitive permissions.
- [ ] Document recovery contacts and emergency revocation.
- [ ] Keep all credentials/tokens out of source, chat, screenshots and receipts.
- [ ] Prove the approved secret store, rotation and revocation path.
- [ ] Remove temporary access after the approved phase.

## Environment and source integrity

- [ ] Separate local review, development theme, test data and production.
- [ ] Record exact branch/HEAD/source/manifest hashes and served authority.
- [ ] Use one writer per file/section cluster and non-overwriting checkpoints.
- [ ] Build temporarily and independently verify before promotion.
- [ ] Prevent annotated/WIP/governance routes from entering the clean or production surface.
- [ ] Preserve last-known-good theme, catalogue and configuration exports.

## Content, catalogue and media

- [ ] Hash and provenance-check WooCommerce/catalogue inputs; exclude PII and unsafe formulas/markup.
- [ ] Reconcile product, variant, price, availability, weight, image, ingredient and claim conflicts.
- [ ] Escape/sanitise merchant-editable content and validate URLs.
- [ ] Record media provenance/consent; strip sensitive metadata where appropriate.
- [ ] Do not present generated packaging/people as real.
- [ ] Validate alt text, crops, responsive sources and asset performance.

## Forms, analytics and privacy

- [ ] Name each form/event question and prove every field/property is necessary.
- [ ] Approve endpoint/provider, notice/consent disposition, access, retention and deletion.
- [ ] Keep test data flagged and separate; prohibit sensitive free text in analytics.
- [ ] Test spam/abuse, validation, error/retry, duplicate handling, export and deletion.
- [ ] Inventory every cookie, pixel, script and network request on the exact artifact.
- [ ] Keep session replay, fingerprinting and third-party analytics off unless separately justified and approved.

## Apps and integrations

- [ ] Record vendor, purpose, permissions, data categories, sub-processors, retention and support/update route.
- [ ] Test installation/configuration in the approved non-production environment.
- [ ] Verify failure mode, rate limits, retries, duplicate actions and data redaction.
- [ ] Test disable/uninstall and data deletion without breaking the storefront.
- [ ] Reject redundant scripts/apps and undocumented network calls.
- [ ] Require a separate replan for headless, custom sync or webhooks.

## Storefront, cart and checkout

- [ ] Use Shopify product/variant/price/availability truth and native cart/checkout boundaries.
- [ ] Verify accessible cart focus, quantity/remove, errors and checkout return paths.
- [ ] Configure and UAT payments, shipping, tax, policies, notifications and test orders only with explicit authority.
- [ ] Ensure fake review checkout events never appear as production completion.
- [ ] Reconcile test orders and prove no unintended real charge/order notification.

## Host, SEO and link access

- [ ] Test exact HTTPS, response headers, CSP/frame policy, cache, errors and cross-origin behaviour on the chosen host.
- [ ] Verify favicon, Open Graph, canonical, robots/noindex transition, sitemap and structured data.
- [ ] Test redirects for collisions, loops, chains and missed high-value URLs.
- [ ] Verify forwarded review access reveals no login/account/internal path and can be revoked.
- [ ] Keep site/link sharing held until Nate approves exact artifact, audience, channel, wording, access and feedback route.

## UAT, incident and rollback

- [ ] Run responsive, keyboard, focus, 200% zoom, reduced-motion, links/assets, network, console and performance QA.
- [ ] Run catalogue, search, forms, cart, checkout, account, shipping, tax and notification UAT.
- [ ] Define incident severity, monitoring, alert owner, redacted logs and communication route.
- [ ] Rehearse rollback for theme, import, app, domain/redirect and analytics changes.
- [ ] Set abort thresholds and preserve WooCommerce recoverability through stabilization.
- [ ] Record written go/no-go with exact artifacts, owners and accepted residual risk.

## Completion rule

No checklist completion authorizes an external action. Store access, import, app installation, tracking, test orders, deployment, domain change, publish and production launch each require their own explicit authority and evidence-bound packet.
