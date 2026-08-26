# MapleMoon safety checkpoint — 2026-08-26

## Custody

- Branch: `safety/founders-20260824`
- Recovery ref created before staging or worktree edits: `refs/recovery/maplemoon-safety-20260826T104251+1000`
- Recovery commit: `8040ce6296b1b1ac2c63e16ecab312c5a5c040ef`
- Start state: 91 grouped `git status --short` entries, expanding to 1,810 individual files.
- Excluded as disposable build/QA output: `mm_5g_cdp_qa.tmp.mjs` (now ignored).
- Secured in the first three commits: 1,809 individual files.
- Path scan found no `.env`, `.next`, or `node_modules` candidates. The case-sensitive private-key/token scan found zero files.

## Commits made before this checkpoint packet

1. `0cff69a8af822bfe775db004114228711fee8634` — `feat(icons): add site system and external designer kit` — 179 files.
2. `42a63e8711e1ba3083574a74a7fb80c25996735b` — `feat(site): integrate founder and commerce imagery` — 1,617 files.
3. `f115432d6eb048b8ed3c7654fd020e176f0a322f` — `chore(site): sync remaining routes and release checks` — 13 files.

## Shipped / secured

“Shipped” here means secured in local Git on the safety branch, not pushed, merged, deployed, published, or sent.

- Site icon system, 44-asset v2 review evidence, and the external-designer icon kit.
- Current Home, Shop, and Our Story WIP sources; founder/ritual/product imagery; temporary-bundle work; and the associated QA evidence.
- Remaining Carob Story, Contact, FAQ, and Stockists WIP changes, route contracts, lock manifest, and release checks.
- The founder bio slot remains the decided 4:5 `aspect-ratio` geometry. Current portrait crop constants pass their guard.

## Pending

- Shopify S1B needs a current-state reconciliation before more work is described or scoped. The 19 Aug source says the 1.6.0 theme update exists unpublished; radar thread `#1007` on 24 Aug says the site link is live/PASSING and six Eclipse Bites products with 16 priced variants already exist in Shopify as DRAFT. The premise “Shopify is still the one remaining build” is therefore stale until reverified.
- Carli approval is still needed for the final Our Story founder photos.
- The Bites application needs Carli acknowledgement: remove the “Bites” label/sections while keeping the products, per Nate's 23 Aug ruling from her wording.
- Final QA and acceptance remain pending. No external publish action is authorised by this checkpoint.

## Known bugs and truthful holds

- `node scripts/check-maplemoon-icons.mjs` fails on icon-session hash drift for Home, Shop, and Our Story.
- Design-system contracts-only and route-conformance both HOLD on six frozen baseline drifts: Carob Story, FAQ, Home, Our Story, Shop, and Stockists.
- The 25 Aug Home/Shop integration remains HOLD: inherited Shop controls are below 44 px, the 390 ritual proof is contaminated by the cart drawer, and a concurrent Home writer invalidated the close-pin check.
- That integration evidence also records inherited Our Story 390 hero bleed/missing `main`, Contact/PDP footer gaps, and Shop/FAQ sub-44 controls.
- The 19 Aug S1B report records three Theme Check errors, strict-invalid vendor JSON, and no completed render check; current Shopify state was not touched or reverified in this safety pass.
- `git diff --cached --check` on the icon/deliverable commit reported whitespace in generated PDF/Illustrator/evidence artifacts. Source-route whitespace checks passed; frozen/generated proofs were not rewritten.

## Verification snapshot

- Portrait crop guard: PASS for `46% 40%`, mask stops, no v04 portrait wiring, and 4:5 bio slot.
- Icon v2 review: PASS, 44 unique assets and seven verified source hashes.
- Working tree after the first three commits: clean; this packet and `CARLI_SCOPE_PACKET_20260826.md` are committed in the following documentation commit.
