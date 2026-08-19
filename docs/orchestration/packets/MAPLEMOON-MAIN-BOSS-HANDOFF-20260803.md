# MapleMoon Main Boss handoff — 2026-08-03

## Control status

- Snapshot captured: 2026-08-03T10:16:59+10:00
- Project: /Users/handtomouse/maplemoon-website
- Previous Main: 019fa858-05c9-7631-b26e-8f5cbbf1387a
- Proposed new Main: 019fc4f2-d00e-7863-8907-9b81c1cd9ccd
- Proposed new Main status at cutoff: idle/HOLD; it has not accepted coordination because this handoff was absent.
- Authority transition: the previous Main remains sole coordinator until the proposed new Main verifies this file and explicitly accepts. After this file is written, the previous Main is frozen and reference-only.
- Durable receipt gate: docs/orchestration/SIDECHAT_RECEIPT_GATE.md
- Receipt-gate SHA-256: ed6280e66ccbb99184fd88cb8e6b43aa86178152c869e8eb3bf371fbbfc5ab3b

## Recovery checkpoint for this handoff

- Checkpoint: _wip/checkpoints/MAPLEMOON-MAIN-BOSS-HANDOFF-20260803_20260803_101659_AEST
- Checkpoint manifest: _wip/checkpoints/MAPLEMOON-MAIN-BOSS-HANDOFF-20260803_20260803_101659_AEST/RECOVERY_MANIFEST.md
- Checkpoint manifest SHA-256: 690f9162e2e6c783556a3a26d5a2d0407370f57e58fb9f2877d687c5bea00cdc
- Pre-write state of this handoff path: absent

## Git state

- Branch: codex-maplemoon-section-review
- HEAD: 0f533b6f4438dbc80e1a75e856c672b52d5f41ca
- Upstream relation: 71 commits ahead of origin/codex-maplemoon-section-review
- LOCK_MANIFEST SHA-256: 8817645e128f6723fd2384f62fdfb78ca01d6b5ba5196339bb764137c38e12b2
- GOV-01_RATIFIED_LEDGER SHA-256: 4ce9f9e56e64f89540a4d44dc3e9f87801067d9b1e9acd9c08095c886279a834
- Current held/reserved/blocked rows in docs/orchestration/LOCK_MANIFEST.json: none

Dirty paths captured before this handoff was added:

    M assets/product_shots/w1-e-prepared-20260803/README.md
    M assets/product_shots/w1-e-prepared-20260803/bananas.webp
    M assets/product_shots/w1-e-prepared-20260803/browser-qa-preview.html
    M assets/product_shots/w1-e-prepared-20260803/eclipse_almond.webp
    M assets/product_shots/w1-e-prepared-20260803/eclipse_fudge.webp
    M assets/product_shots/w1-e-prepared-20260803/eclipse_hazelnut.webp
    M assets/product_shots/w1-e-prepared-20260803/eclipse_pecan.webp
    M assets/product_shots/w1-e-prepared-20260803/moon_almond.webp
    M assets/product_shots/w1-e-prepared-20260803/moon_cayenne.webp
    M assets/product_shots/w1-e-prepared-20260803/moon_goji_coconut.webp
    M assets/product_shots/w1-e-prepared-20260803/moon_hazelnut.webp
    M assets/product_shots/w1-e-prepared-20260803/moon_peppermint.webp
    M assets/product_shots/w1-e-prepared-20260803/moon_pure_carob.webp
    ?? _wip/deploy/site-full/
    ?? _wip/deploy/site/
    ?? _wip/evidence/CLAIM-VERIFICATION-20260803.md
    ?? _wip/evidence/IMAGERY-PROGRAMME-20260802/BOARD-REFRESH-BRIEF-20260803.md
    ?? _wip/evidence/IMAGERY-PROGRAMME-20260802/GENERATION-PREP-LIST-20260803.md
    ?? _wip/evidence/IMAGERY-PROGRAMME-20260802/OG-IMAGE-CANDIDATE-BRIEF-20260803.md
    ?? _wip/evidence/IMAGERY-PROGRAMME-20260802/OG-IMAGE-CANDIDATES-20260803-V1-CLOSEOUT-PACKET.md
    ?? _wip/evidence/IMAGERY-PROGRAMME-20260802/OG-IMAGE-CANDIDATES-20260803-V1-PACKET.md
    ?? _wip/evidence/IMAGERY-PROGRAMME-20260802/OG-IMAGE-CANDIDATES-20260803-V1-RECEIPT.json
    ?? _wip/evidence/IMAGERY-PROGRAMME-20260802/ROUND-ABC-MANIFEST.sha256
    ?? _wip/evidence/IMAGERY-PROGRAMME-20260802/og_image_candidates_20260803_v1/
    ?? _wip/evidence/STAGING-V1-MANIFEST-20260803.sha256
    ?? _wip/evidence/founder_v04_main_imac_qa_export_20260803/carli_bio_v01.png
    ?? _wip/evidence/founder_v04_main_imac_qa_export_20260803/carli_bio_v02.png
    ?? _wip/evidence/founder_v04_main_imac_qa_export_20260803/dylan_bio_v01.png
    ?? _wip/evidence/founder_v04_main_imac_qa_export_20260803/founders_portrait_v04_review.png
    ?? _wip/evidence/founder_v04_main_imac_qa_export_20260803/our_story_v04_review.html
    ?? _wip/evidence/founder_v04_main_imac_qa_export_20260803/our_story_v04_review_v02.html
    ?? _wip/evidence/founder_v04_main_imac_qa_export_20260803/qa/
    ?? _wip/evidence/founder_v04_main_imac_qa_export_20260803/source_selection.md
    ?? docs/client-review/2026-07-29-carli-review/staging-v1/
    ?? docs/orchestration/packets/FOUNDER-V04-CARLI-CROP-CORRECTION-20260803.md
    ?? docs/orchestration/packets/FOUNDER-V04-HERO-PRESENTATION-V02-20260803.md
    ?? docs/orchestration/packets/FOUNDER-V04-MAIN-IMAC-QA-EXPORT-20260803.md
    ?? docs/orchestration/packets/MAPLEMOON-QA-PROOF-200-ZOOM-20260803.md
    ?? docs/orchestration/packets/MAPLEMOON-QA-PROOF-200-ZOOM-R2-20260803.md
    ?? docs/orchestration/packets/MAPLEMOON-QA-PROOF-NETWORK-20260803.md
    ?? docs/orchestration/packets/MAPLEMOON-QA-PROOF-NETWORK-R2-20260803.md
    ?? docs/orchestration/packets/MAPLEMOON-QA-PROOF-REDUCED-MOTION-20260803.md
    ?? docs/orchestration/packets/MAPLEMOON-QA-PROOF-REDUCED-MOTION-R2-20260803.md
    ?? docs/orchestration/packets/MAPLEMOON-QA-REVIEW-BOARD-20260803.md
    ?? docs/orchestration/packets/MAPLEMOON-QA-REVIEW-BOARD-INDEPENDENT-CLOSE-20260803.md
    ?? docs/orchestration/packets/MAPLEMOON-QA-REVIEW-BOARD-LIVE-EMBED-20260803.md
    ?? docs/orchestration/packets/MAPLEMOON-QA-REVIEW-BOARD-LIVE-EMBED-R2-20260803.md
    ?? docs/orchestration/packets/MAPLEMOON-SIX-PAGE-TECHNICAL-QA-20260803.md
    ?? docs/orchestration/packets/MAPLEMOON-SIX-PAGE-VISUAL-QA-20260803.md
    ?? docs/orchestration/packets/SAT-FOUR-PAGE-SEAMS-FADES-WIP-20260803.md
    ?? docs/orchestration/packets/SAT-HOME-WIP-BUILD-NOW-20260803.md
    ?? docs/orchestration/reviews/FOUNDER-V04-CARLI-CROP-CORRECTION-20260803.json
    ?? docs/orchestration/reviews/FOUNDER-V04-HERO-PRESENTATION-V02-20260803.json
    ?? docs/orchestration/reviews/FOUNDER-V04-MAIN-IMAC-QA-EXPORT-20260803.json
    ?? docs/orchestration/reviews/MAPLEMOON-QA-PROOF-200-ZOOM-20260803.json
    ?? docs/orchestration/reviews/MAPLEMOON-QA-PROOF-200-ZOOM-R2-20260803.json
    ?? docs/orchestration/reviews/MAPLEMOON-QA-PROOF-NETWORK-20260803.json
    ?? docs/orchestration/reviews/MAPLEMOON-QA-PROOF-NETWORK-R2-20260803.json
    ?? docs/orchestration/reviews/MAPLEMOON-QA-PROOF-REDUCED-MOTION-R2-20260803.json
    ?? docs/orchestration/reviews/MAPLEMOON-QA-REVIEW-BOARD-INDEPENDENT-CLOSE-20260803.json
    ?? docs/orchestration/reviews/MAPLEMOON-QA-REVIEW-BOARD-LIVE-EMBED-R2-20260803.json
    ?? docs/orchestration/reviews/MAPLEMOON-SIX-PAGE-TECHNICAL-QA-20260803.json
    ?? docs/orchestration/reviews/MAPLEMOON-SIX-PAGE-VISUAL-QA-20260803.json
    ?? docs/orchestration/reviews/SAT-FOUR-PAGE-SEAMS-FADES-WIP-20260803.json
    ?? docs/orchestration/reviews/SAT-HOME-WIP-BUILD-NOW-20260803.json

This handoff path becomes one additional untracked path after creation. Preserve every dirty byte until a separately admitted packet assigns ownership and recovery.

## Current source authority

The current committed six-page working source is the six WIP files at HEAD 0f533b6. These bytes are current source state, but the latest four-page receipt is HOLD and does not independently accept this lineage.

| Page | Source path | SHA-256 |
| --- | --- | --- |
| Homepage | _wip/homepage_real_1_lead_photo.WIP.html | eeb7f73d0281932043d1af53aabcdb4c2689ab9aabdfd6244beb3684dd593e11 |
| Shop | _wip/shop.WIP.html | 65a8199ed228bddc72cabe8e93eadf1cf000804c4035a8197fb14db4811617d3 |
| Our Story | _wip/our-story.WIP.html | f3a72926931b7cbb2ec625a87654059a0bf2a6d34764949ec298725bccde9a06 |
| Carob Story | _wip/carob-story.WIP.html | e4cc851c3b014cb2a13d487989088764a3a4d86fc10539aba9c7efa5b690e56b |
| Stockists | _wip/stockists.WIP.html | a3b886db50d53c1997e3ca595db2f4f56c6cff1accfee6ebf4e413fc284c3b03 |
| FAQ | _wip/faq.WIP.html | 5dc68f31f5fb82a8149e2984541a30a4028932d2aa2f3cef11ae6940228c45fd |

Lineage warning: docs/orchestration/reviews/SAT-FOUR-PAGE-SEAMS-FADES-WIP-20260803.json is HOLD because concurrent changes and later commits invalidated the hashes it tested. Do not promote its earlier candidate or treat its PASS subchecks as acceptance of the current six WIP bytes.

## Frozen generated package

Path: docs/client-review/2026-08-01-saturday-review/staging-v1

| Artifact | SHA-256 |
| --- | --- |
| Aggregate MANIFEST.json | d0d834b9b9173a497d0b03e39e4c282a7d5247f51484ebfd7ba3a64e8416bf7c |
| clean/MANIFEST.json | d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20 |
| annotated/MANIFEST.json | 3be3c0f2df4658558c667b3e9cc6d55966d6a1d7ce9fa9874c46a0afc44244c7 |
| clean/homepage.html | 0d102050395b79f4add5d9ddb7f75e962d7e41e11a78cd7f88c35ce4a947ef0c |
| clean/shop.html | 43cad154be945d34006013808f2eca5eeb9676ae3e28cedafbb75faccb914abb |
| clean/our-story.html | 587a0042d27f74a4ee6d6a4c3488d226a5feab1f4531f26b697082432630fe75 |
| clean/carob-story.html | d93dc036603ae7772e365573de1f89f066556d922d8b99c5e3fc7f2dada62762 |
| clean/stockists.html | c54892a85c15165de448f68cab211979695bcabe066ecab987342c368dfca21b |
| clean/faq.html | f4acfb51c6e353828a432285f2a37f69ca39154b18d78ef41e337dc29fb35dcf |

This is the claim-stripped formal review artifact. It remains frozen and must not be rebuilt or edited. It is not the source of the current public preview.

## Deployed full-source preview

- Local deploy source: _wip/deploy/site-full
- Local deploy-source aggregate SHA-256: a99dc2095a969d1a0d2909176ddce4772e2035d4c13b60dc63e054df760850f9
- Vercel project: maplemoon-preview-carli
- Project ID: prj_wzWKBfku3VmFoKcj1NHBideqGJKn
- Project-link file SHA-256: b9d709f7d81ca0209926c8817111d99b84f6764e944f0119c9c13ab13eac0db2
- Current production deployment URL: https://maplemoon-preview-carli-3jqyy8hww-handtomouses-projects.vercel.app
- Public alias: https://maplemoon-preview-carli.vercel.app
- Deployment brief: _wip/deploy/CODEX-BRIEF-20260803-PREVIEW-URL.md
- Deployment brief SHA-256: b6f4cdca4f061865563af5b7028bb3f80ee134ae8308421e992f340dd338b9f8
- Runbook: _wip/deploy/README.md
- Runbook SHA-256: 10f0ee3ce14162403dd8eda46f23a7b8a17456ac58f203030bb954ee76255c67

The six public responses were SHA-256 hashed after deployment and exactly matched the local site-full files:

| Route | Local and public SHA-256 |
| --- | --- |
| /homepage | fe29203259541281af4f22c2c04e952fc69ed9c952e937ae281d8d3b2b6ccafa |
| /shop | 69efa152821c128249cf6156f8304034535f63ef0c2fa9002bf4ef8d45d24d0c |
| /our-story | e136c48e4d6939a707e27fca04dde720f13ac10aada5177471d45259425b7385 |
| /carob-story | 5811912ecd8d3bf48f8506766849ad5a9a98007e91abace7d501af1d49c81040 |
| /stockists | d5245e32845c56f5f134e112bfe7d07336007a8f00d32fafc2c503cc7bca3354 |
| /faq | aeddccbdb5b7cbf8a873892774e4a2acd51fa356b9c5814aa1788b71d37fc192 |

## Served and public URLs

| Classification | URL | Verified state |
| --- | --- | --- |
| Local frozen clean package | http://127.0.0.1:3011/homepage.html | Python server PID 43050, bound to 127.0.0.1, cwd is the frozen clean directory. Six local response hashes match the clean files above. |
| Public full-source preview | https://maplemoon-preview-carli.vercel.app | Current alias; six routes 200; public/no SSO; /_wip/ and /docs/ return 404; full-build markers present; noindex and security headers present. |
| Current immutable deployment | https://maplemoon-preview-carli-3jqyy8hww-handtomouses-projects.vercel.app | Ready production deployment behind the public alias. |

Non-authoritative listeners:

- Port 3012 serves /Users/handtomouse/.claude/jobs/ae554412/tmp/preview-new. Do not use it as MapleMoon authority.
- Port 3139 serves /Users/handtomouse/.claude/worktrees/maplemoon-founder-selects-20260803. Do not use it as six-page package authority.
- The former review-board URL on port 3016 is not currently listening; use the retained evidence files, not that stale URL.

## Completed checks and evidence

### Current deployment and frozen package

- npm run review:saturday:check was rerun against the current frozen package: 0 failures, 0 warnings.
- Public routes /, /shop, /our-story, /carob-story, /stockists and /faq returned 200.
- homepage.html redirected within the public alias and not to sso-api.
- /_wip/ and /docs/ returned 404.
- Shop marker two wholefood ingredients returned one match.
- Homepage marker Why not returned one match.
- assets/products_new/bar_pure_carob.webp returned 200.
- Shop title returned Shop the Range | Maple Moon.
- Public headers include X-Robots-Tag noindex, nofollow, noarchive, nosnippet plus CSP, nosniff, SAMEORIGIN, referrer and permissions policies.
- Exact deployment evidence and procedure: _wip/deploy/CODEX-BRIEF-20260803-PREVIEW-URL.md and _wip/deploy/README.md.

### Retained six-page QA evidence for the frozen clean package only

- Technical receipt: docs/orchestration/reviews/MAPLEMOON-SIX-PAGE-TECHNICAL-QA-20260803.json
- Technical findings: _wip/reviews/maplemoon-six-page-qa-20260803/technical/findings.json
- Technical receipt SHA-256: 89f22df4101950ad6f08bf3f7bcc7f32d86152110e1b653be46cc31616dd62c4
- Visual receipt: docs/orchestration/reviews/MAPLEMOON-SIX-PAGE-VISUAL-QA-20260803.json
- Visual coverage: _wip/reviews/maplemoon-six-page-qa-20260803/visual/coverage.json
- Visual findings: _wip/reviews/maplemoon-six-page-qa-20260803/visual/findings.json
- Visual receipt SHA-256: 6f85012d75319551a1c3e0a85dddddc8fc1ec13eca6acd7abdc84b0e4314cf11
- Review-board close receipt: docs/orchestration/reviews/MAPLEMOON-QA-REVIEW-BOARD-INDEPENDENT-CLOSE-20260803.json
- Review-board files: _wip/reviews/maplemoon-six-page-qa-20260803/review-board/
- Review-board close receipt SHA-256: dc656321e415d979cc3ff0ff3ac13b8b06b95e903553abcc62b2c1423825b6db
- Literal 200 percent HOLD receipt: docs/orchestration/reviews/MAPLEMOON-QA-PROOF-200-ZOOM-R2-20260803.json
- Request-level network HOLD receipt: docs/orchestration/reviews/MAPLEMOON-QA-PROOF-NETWORK-R2-20260803.json (SHA-256: e2e37f301440abade4f95de8ae725aebf2a021dfbd4e06df2147e4a29e7b694c)
- Reduced-motion HOLD receipt: docs/orchestration/reviews/MAPLEMOON-QA-PROOF-REDUCED-MOTION-R2-20260803.json (SHA-256: b310aaa09573b7363ef253d74e74e66f85833459591b6796697232fc1b1d4203)
- Claim-reproduction evidence for the frozen clean package: _wip/evidence/CLAIM-VERIFICATION-20260803.md

Scope warning: none of the retained clean-package QA receipts certifies the different full-source public deployment. The review-board PASS accepts the review-board workflow only and explicitly leaves 200 percent, reduced motion and request-level network proof at HOLD.

## Active workers and ownership

### Active isolated worker

- Task: MapleMoon product-image intake and preparation
- Immutable task ID: 019fc42c-03b0-7d91-8c25-d127fbbc73e9
- Worktree: /Users/handtomouse/.codex/worktrees/32a0/maplemoon-website
- Packet: /Users/handtomouse/.codex/worktrees/32a0/maplemoon-website/docs/orchestration/packets/MM-PRODUCTS-INTAKE-PREP-20260803.md
- Worker status at cutoff: active; final structural/source-preservation checks in progress; no completion receipt yet.
- Source, read-only: /Users/handtomouse/Downloads/MM-Products
- Verified source count: 204 PNG
- Source aggregate manifest SHA-256: d7bad42190869453e214f5e71d9ef2def3d3c8e72405353abd29201ef6a2de18
- Recovery checkpoint: /Users/handtomouse/.codex/worktrees/32a0/maplemoon-website/_wip/reviews/mm-products-intake-20260803/checkpoints/MM-PRODUCTS-INTAKE-PREP-20260803_20260803_063525_AEST
- Derivatives admitted: none

Exact 21 writable paths, all inside that isolated worktree:

1. docs/orchestration/packets/MM-PRODUCTS-INTAKE-PREP-20260803.md
2. docs/orchestration/reviews/MM-PRODUCTS-INTAKE-PREP-20260803.json
3. _wip/reviews/mm-products-intake-20260803/source_inventory_v01.json
4. _wip/reviews/mm-products-intake-20260803/source_inventory_v01.csv
5. _wip/reviews/mm-products-intake-20260803/source_aggregate_manifest_v01.sha256
6. _wip/reviews/mm-products-intake-20260803/exact_duplicate_map_v01.json
7. _wip/reviews/mm-products-intake-20260803/composition_family_flags_v01.json
8. _wip/reviews/mm-products-intake-20260803/visual_index_v01.md
9. _wip/reviews/mm-products-intake-20260803/candidate_mapping_manifest_v01.json
10. _wip/reviews/mm-products-intake-20260803/qa/qa_proof_v01.json
11. _wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_001.png
12. _wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_002.png
13. _wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_003.png
14. _wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_004.png
15. _wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_005.png
16. _wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_006.png
17. _wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_007.png
18. _wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_008.png
19. _wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_009.png
20. _wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_010.png
21. _wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_011.png

Do not interrupt this worker. The next Main may ingest only its final receipt and referenced evidence, then independently verify it.

### Coordinator tasks

- Previous Main 019fa858-05c9-7631-b26e-8f5cbbf1387a owns only this handoff and its checkpoint for this final phase. It is frozen after writing.
- Proposed new Main 019fc4f2-d00e-7863-8907-9b81c1cd9ccd owns no writable path and has not accepted coordination. Its intake correctly returned HOLD while this file was missing.
- Completed subagents 019fc349-4ed4-77f0-9858-5015dbdf1ec7 and 019fc3de-e1e8-7732-809b-fdc57686f579 hold no active ownership.

## Frozen and prohibited paths

- docs/client-review/2026-08-01-saturday-review/staging-v1/** — frozen hash-verified formal package; do not edit or rebuild.
- _wip/deploy/site-full/** — deployed public snapshot; do not mutate until a new recovery-gated deployment packet is admitted.
- _wip/deploy/site/** — old claim-stripped deploy copy; do not redeploy over the public alias without explicit rollback approval.
- _wip/homepage_real_1_lead_photo.WIP.html, _wip/shop.WIP.html, _wip/our-story.WIP.html, _wip/carob-story.WIP.html, _wip/stockists.WIP.html and _wip/faq.WIP.html — no new writes until current lineage is reconciled under a superseding packet.
- assets/product_shots/w1-e-prepared-20260803/** — dirty RECROP WIP; preserve and do not overlap. Current immutable Codex owner was not verified at handoff cutoff.
- /Users/handtomouse/Downloads/MM-Products — read-only source; never rename, move, delete or overwrite.
- Founder/Photoshop paths and current site references — no Photoshop or founder integration work is admitted by this handoff.
- Repo-root vercel.json — do not deploy from repo root; it can expose internal repo paths.
- No Shopify, WooCommerce, analytics, production, commerce, credential, client-contact, commit or push action is admitted.

## Current blockers and unresolved Nate decisions

1. The current six WIP hashes are newer than the latest accepted source-lineage proof. SAT-FOUR-PAGE-SEAMS-FADES-WIP-20260803 remains HOLD. A new packet must preserve and verify the current HEAD state or explicitly recovery-gate an unwind; no implicit keep/reset decision.
2. The public full-source preview is byte-verified against local site-full and passed HTTP checks, but it has not received a fresh independent real-browser post-deploy QA pass. Prior technical/visual receipts bind the different frozen clean package.
3. Literal browser 200 percent, standards-based reduced-motion runtime and request-level network proof remain HOLD in the retained clean-package evidence.
4. Product-image intake has no approved catalogue authority. All 204 generated candidates remain HOLD and no derivatives are admitted until fresh approved catalogue evidence exists.
5. Forty-one of sixty-eight Canva notes were recorded as undelivered in the deploy handoff; twenty require supplier/factual authority. CV-037, CV-033 and CV-054 remain deliberately held. Do not invent replacements.
6. The public Our Story page still contains founder content pending states and founders_portrait_h212.webp. Nate previously rejected the wrong founder photo; no founder-image integration is approved here. Carli/Dylan bio placement and trimming remain a Nate design decision.
7. Carob Story comparison-table stacking at 390px remains a Nate design decision.
8. Referenced OG images are absent for homepage, Our Story, Carob Story and Stockists; link-preview treatment remains unresolved.
9. Public access is currently unauthenticated because Nate explicitly approved this exact public deployment. Any password, credential, expiry or access-control change requires a separate Nate approval.
10. Sharing/sending the public URL and exact client message remain unapproved external actions. The client call is this evening, but urgency does not expand authority.

## Exact external-action authority

- Deploy: Nate explicitly authorized one public Vercel deployment of _wip/deploy/site-full to https://maplemoon-preview-carli.vercel.app. That action completed. This authority is consumed and does not authorize another deploy, rollback or configuration change.
- Share: not authorized.
- Send/contact: not authorized. No URL or message was sent to Carli or Dylan by this Main.
- Credentials/access control: no creation, rotation, passcode, password, SSO, expiry or revocation action authorized.
- Commit/push: not authorized.
- Shopify/WooCommerce/production/commerce/analytics: not authorized.

## Recommended next packet

MAPLEMOON-PUBLIC-PREVIEW-POSTDEPLOY-QA-20260803

- Purpose: one read-only, hash-bound verification of the exact current public deployment before Nate decides whether to send it.
- Subject: https://maplemoon-preview-carli.vercel.app with the six public hashes recorded above.
- Required checks: real browser at 390, 834 and 1440; page-by-page visual and overflow review; header/navigation; working local cart including Add, quantity, close and focus restoration; FAQ accordions; Stockists search; console errors; failed assets; request destinations; no internal paths; literal 200 percent if the browser exposes independent displayed proof; reduced-motion if supported.
- Writable scope if admitted: one new packet, one new receipt and one isolated evidence root under _wip/reviews/maplemoon-public-preview-postdeploy-qa-20260803/. No source, deploy, package, manifest or website writes.
- Stop conditions: public hash drift, unsupported control surface, any content correction, any deploy/configuration need, any send/share/credential requirement.
- Promotion limit: PASS would verify the already-deployed preview only. It would not authorize sending, sharing, another deployment or acceptance of unsupported claims.

## Recovery and rollback

- This handoff pre-write checkpoint: _wip/checkpoints/MAPLEMOON-MAIN-BOSS-HANDOFF-20260803_20260803_101659_AEST
- Deployment project-link checkpoint: _wip/checkpoints/MAPLEMOON-PREVIEW-URL_20260803_095639_AEST/site-full-vercel-link-before
- Previous accidental project-link project.json SHA-256: ea12abf8f4f3b0771d7d299800c4550314dcce32cc3c42032b15bca187efad4d
- Current project-link project.json SHA-256: b9d709f7d81ca0209926c8817111d99b84f6764e944f0119c9c13ab13eac0db2
- Current production deployment: https://maplemoon-preview-carli-3jqyy8hww-handtomouses-projects.vercel.app
- Previous production deployment retained by Vercel: https://maplemoon-preview-carli-7w32611fl-handtomouses-projects.vercel.app
- Older local stripped deploy copy: _wip/deploy/site/
- Homepage WIP checkpoint: _wip/checkpoints/SAT-HOME-WIP-BUILD-NOW-20260803_20260803_040352_AEST
- Four-page WIP checkpoint: _wip/checkpoints/SAT-FOUR-PAGE-SEAMS-FADES-WIP-20260803_20260803_045345_AEST
- Active product-worker checkpoint: /Users/handtomouse/.codex/worktrees/32a0/maplemoon-website/_wip/reviews/mm-products-intake-20260803/checkpoints/MM-PRODUCTS-INTAKE-PREP-20260803_20260803_063525_AEST

No rollback is authorized by this handoff. Any Vercel rollback, WIP unwind, deletion, replacement or Git reset requires a new exact approval and recovery packet.

## Superseded work that must not be resumed

- Do not resume the stripped-site deployment route as the active public preview. _wip/deploy/site/ is historical rollback material only.
- Do not use the accidental Vercel project site-full or https://site-full-omega.vercel.app as client authority.
- Do not treat staging-v1/clean as the current public preview source; it remains the separate frozen formal-review artifact.
- Do not promote SAT-FOUR-PAGE-SEAMS-FADES-WIP-20260803 from its earlier checked hashes; its completion receipt is HOLD and current WIP bytes differ.
- Do not reuse clean-package QA receipts as certification of the full-source public deployment.
- Do not wake or restore old Wave 1A/1B/1C, Variant-F, Wave 1D, missing-Side-chat, photoshoot or Photoshop workers. Historical receipts remain evidence only unless a new Main admits an exact superseding packet.
- Do not resume confused Side-chat Photoshop ownership requests. Nate explicitly told this Main to disregard them.
- Do not revive Claude as a coordinator. One persistent Main remains sole coordination authority.
- Do not create a second heartbeat or duplicate coordinator.

## Acceptance gate for the new Main

The proposed new Main must:

1. Verify this file's SHA-256 against the value supplied by the previous Main.
2. Recheck branch, HEAD and git status without modifying anything.
3. Recheck the three package manifests and six public hashes.
4. Reconcile the active product worker from its final receipt or current bounded status without messaging it.
5. Confirm this handoff checkpoint and the deployment rollback evidence.
6. Explicitly state sole-coordination acceptance before admitting any new packet.

Until that acceptance, this previous Main remains frozen and reference-only. No worker contact, edit, rebuild, deploy, send, commit, push or credential action is authorized.
