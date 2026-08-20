# MapleMoon content-loss audit — 2026-08-20

## Executive answer (9 lines)

1. **YES — the current deploy is materially lesser, but it is not a wholesale rollback to one older commit.** It is a newer seven-route shell carrying a thinner content lineage.
2. **Count:** 14 DELIBERATE, 0 COLLATERAL, 5 UNEXPLAINED removals/features (19 inventory rows).
3. **Material unexplained thinning:** Home and Shop. Our Story and What Is Carob are much thinner too, but their structural cuts are explicitly authorised.
4. **#1 visitor miss:** Our Story's real founder portraits plus its ingredient, grove, craft, place and studio-gallery journey (DELIBERATE).
5. **#2 visitor miss:** Home's usable “Find Maple Moon near you” search became disabled representative cards (UNEXPLAINED; UNVERIFIED-NO-COMMIT).
6. **#3 visitor miss:** Shop fell from 24 to 22 product objects and lost the separate Goji/Coconut Carob Bites category (UNEXPLAINED; UNVERIFIED-NO-COMMIT).
7. **#4 visitor miss:** Home's “Free Shipping — Orders over $99” and “Secure payments” reassurance reverted to two “pending” labels (UNEXPLAINED for the exact 13 Aug copy; UNVERIFIED-NO-COMMIT).
8. **#5 visitor miss:** Carob Story's four-image grove gallery and on-page market FAQ (DELIBERATE; the FAQ was intentionally de-duplicated into the separate FAQ route).
9. The 17.5 KB Homepage gap is real evidence of a forked deploy/WIP lineage, not proof that the whole current site is older.

## Scope and chain of custody

- Repo/branch/head: `/Users/handtomouse/maplemoon-website`, `docs/registry-authority-20260819`, `9bbd9d6899cfcebbd5a32b96bf9d6c3a7c7818ac`.
- No page was edited. The only repo path written by this lane is this report.
- The worktree was **not clean before this lane**: ten unrelated untracked paths already existed (listed under Verification). They were preserved. Therefore the requested final `git status --porcelain` cannot truthfully be empty without deleting other work.
- “Absent” means a named, reader-visible section, copy block or usable feature in the best earlier comparison that is not available in the current page. Rewording and moved-but-still-available information are not treated as losses unless the access feature itself disappeared.
- Classification rule used exactly as requested: **DELIBERATE** only when the removal has an explicit packet/decision/receipt; **COLLATERAL** when a traced commit removes it without mentioning it; **UNEXPLAINED** when the deployed element has no removal authority or no source/removal commit.

### Current page hashes recorded before work

| Current page | SHA-256 | Bytes |
|---|---|---:|
| `_wip/carob-story.WIP.html` | `97524120b51de42fa4b9a0bda47a2cd2e9f5caf2b29b04b1da30da6d48a56a68` | 54,610 |
| `_wip/contact.WIP.html` | `38ef32975261f6fc9b08c8a5df299c8f3bfe893a59ef9540949ef7dee262c7cb` | 13,276 |
| `_wip/faq.WIP.html` | `d043e578349220fec89f16a1d75e0182a1e3fe745cdcaa5639c4be0cdff0c525` | 31,954 |
| `_wip/homepage_real_1_lead_photo.WIP.html` | `284c55d8bcfbb8fc39b500540c7e6494eb0edfcc5506c7f8dbe4dd622265fb81` | 190,907 |
| `_wip/our-story.WIP.html` | `5323d72a21b0ba30c59662564a86c6f07441d156ed76c5849e36ea6550a73566` | 63,989 |
| `_wip/shop.WIP.html` | `035a66bb8915e35f636b856849b2ae1cea8666f5fb302aeaf04cf6e8c1db4fc5` | 53,380 |
| `_wip/stockists.WIP.html` | `41a291fdec4a2f0ebe348544bf24d65f20d0017863941c1f252ddc3337d6d471` | 112,180 |

## Live-build provenance

| Deploy | Immutable identity | Homepage | Repo provenance conclusion |
|---|---|---:|---|
| `maplemoonbuild20260813.vercel.app` | `dpl_G2LER2awaqyFtGRCcTserXbNynct`, immutable token `7vjf2m50b`, created 2026-08-14 08:37 AEST | 208,556 B, SHA-256 `b936b5bb4856cdd6134e5b15bce5dfc3b353c1d442fd1a418180b35b8fa10356` | All six route responses hash exactly to blobs archived at `12848c156ad4aae30db321be6c31a1c6e89b5e48` (`baseline: protect unclaimed Codex output before triage`, 2026-08-19). This proves the bytes, not the deployment's source commit. Vercel reports `gitSource: null`, and no tracked WIP commit has this six-page byte set: **source commit UNVERIFIED-NO-COMMIT**. |
| `maplemoon-demo-v2-20260813.vercel.app` | `dpl_2efuhsAxq2gUoT7nwRJRUBidmCLQ`, immutable token `pi0jh8xdd`, created 2026-08-13 18:27 AEST | 180,565 B, SHA-256 `92f99de54ee81aa01dd808a4b730774ddef302725efa83d14f3036268aeaf0d0` | No fetched route hash is a tracked blob; Vercel reports `gitSource: null`. Its section structure is close to the 12 Aug line on Our Story/Shop but not byte-identical to `0f873527`: **source commit UNVERIFIED-NO-COMMIT**. |
| current preview | `dpl_8Ac6gUyFFJ1Gdh4ehGaVUW8Tg94m`, created 2026-08-20 17:15 AEST | 191,070 B | Shop, Our Story, Carob Story, Stockists, Contact and FAQ are byte-identical to current WIPs. Homepage is current WIP plus 163 deployment bytes. |

The best earlier comparison is therefore the exact 208,556-byte build response, corroborated by the demo, `0f873527`, the Lane E/Lane F checkpoints, and `981b1f0`. The demo is secondary because its provenance is weaker and it contains fewer Home features than the 208,556-byte build.

## Seven-page human content inventory

### Home

Earlier-only or degraded features: six product-format tabs rather than four (`Eclipses` and `Bites` are absent), a `View Range` secondary CTA, a usable stockist search form, live `$99` shipping and secure-payment reassurance, an enabled newsletter field/action, and the Nigel Young/Australian Carob Co photo credit. Current Home adds substantial replacement content (comparison, founders, reviews and expanded stockist preview), so it is not globally shorter; it is nevertheless less capable in stockist discovery and less complete in product-range coverage/assurance.

### Shop

The earlier build has seven catalogue sections and 24 product objects. Current has six sections and 22 objects. The missing section is the separate `Bites` enquiry category containing `Goji Carob Bites` and `Coconut Carob Bites`; the six `Eclipse Bites` remain under the current `Eclipse Bites` section. Other section-copy changes are replacements, not removals.

### Our Story

Earlier has 11 principal sections; current has five. Current keeps the shared story, both long founder biographies, “How Maple Moon began” and the Range CTA. It loses the two individual founder portraits, ingredient bridge, grove/source panel, pull-quote interstitial, craft band, Brunswick Heads/place chapter and five-image studio gallery. This is the largest visual/narrative thinning, but the Lane F packet explicitly required a `01 people`, `02 beginning`, “no 03” rebuild and placeholders pending Nate's founder selection.

### What Is Carob

Current keeps/reworks the hero, comparison and range CTA and adds a four-step `From pod to bar` sequence. The earlier four-image `The pod, up close` grove gallery and three-question on-page market FAQ are absent. Both are inside the explicitly authorised Lane F structural rebuild; the separate FAQ page remains.

### Stockists

The searchable 204-row directory, wholesale band and newsletter visual slot remain. The CSS-drawn “Illustrative coverage preview” map UI/marker JS is absent, and the newsletter is visibly non-collecting/disabled. Both removals were authorised. The map lead is **confirmed**, not refuted.

### FAQ

No material answer section is missing. The earlier `Shipping & returns` quick-action mailto is absent, but current adds a dedicated `Where can I find shipping and returns information?` FAQ answer linking the policy source; this is an intentional relocation, not net information loss. Current also retains Contact in its footer.

### Contact

There is no 13 Aug equivalent: both older deploys return 404. The current page was added by `a6062a11eb9d2c3aeb4c45b260ca5bcf98705248` on 2026-08-20 (`feat(contact): build contact page, add Wholesale to every footer`). There is no earlier content to lose.

## Removal register

Every row has a removal commit or is explicitly `UNVERIFIED-NO-COMMIT`.

| # | Page | Earlier item absent/degraded now | Removal commit, date, message | Class | Evidence and intent |
|---:|---|---|---|---|---|
| 1 | Home | `Eclipses` and `Bites` product tabs/data plus `View Range` | `981b1f02b0f944856f6615c31b5b2ec52a294238`; 2026-08-16; `Baseline before Codex Lane E apply` | **DELIBERATE** | `git log -S 'id="pdpView"'`; Lane E checkpoint `external/RECEIPT.md` explicitly says “no Bites column, no View Range”. Earlier build has 6 tabs; current has 4. |
| 2 | Home | Usable `Find Maple Moon near you` search/form, replaced by disabled representative cards | **UNVERIFIED-NO-COMMIT** | **UNEXPLAINED** | Exact live feature is only in deployed/archive bytes; `git log -S 'mm-home-stockist-finder'` and `-S 'Find Maple Moon near you'` return no WIP commit. Later Boss ledger actually requires a functional Home finder. |
| 3 | Home | `Free Shipping — Orders over $99` reassurance, replaced by `Final delivery terms pending` | Exact 13 Aug `$99` removal: **UNVERIFIED-NO-COMMIT**. Nearest source-line removal is `720e0145acbbc9694f20a260a073de33259ca996`; 2026-07-30; `wip(section-review): content — WIP page drafts + feedback log + index` | **UNEXPLAINED** | `720e0145` deliberately neutralised an older unverified `$60` claim, but the later exact `$99` deploy copy never entered WIP history, so no commit explains its subsequent absence. Later Boss decision approves `$99`. |
| 4 | Home | `Secure payments — Safe and easy checkout`, replaced by `Final payment details pending` | Exact 13 Aug removal: **UNVERIFIED-NO-COMMIT**. Nearest source-line removal is `720e0145acbbc9694f20a260a073de33259ca996`; 2026-07-30; same message | **UNEXPLAINED** | Same fork: the exact 13 Aug assurance is deploy-only and has no removal commit. |
| 5 | Home | `Farm photography by Nigel Young, The Australian Carob Co` credit | **UNVERIFIED-NO-COMMIT** | **UNEXPLAINED** | Exact string exists in both 13 Aug deploys but `git log -S` returns no WIP commit; current retains the imagery but not this visible credit. |
| 6 | Home | Enabled `Stay in the loop` email field/Join action, replaced by disabled demo-only form | `981b1f02b0f944856f6615c31b5b2ec52a294238`; 2026-08-16; same message | **DELIBERATE** | Lane E packet requires keeping the slot while preventing collection/submission and adding visible non-collecting notice. |
| 7 | Shop | Separate `Bites` category: `Goji Carob Bites` and `Coconut Carob Bites` (24 products becomes 22) | **UNVERIFIED-NO-COMMIT** | **UNEXPLAINED** | Both product strings exist in the exact live response; `git log -S 'Goji Carob Bites'` returns no WIP commit. They were deploy-only and are absent from both `0f873527`/`981b1f0` lineage and current. |
| 8 | Our Story | Individual Carli and Dylan portraits, replaced by pending placeholders | `981b1f02b0f944856f6615c31b5b2ec52a294238`; 2026-08-16; same message | **DELIBERATE** | `git log -S 'founder_carli.webp'`; Lane F R2 explicitly rejects those bindings and requires accessible placeholders until Nate selects. |
| 9 | Our Story | `Carob, on its own terms` ingredient bridge | `981b1f02b0f944856f6615c31b5b2ec52a294238`; 2026-08-16; same message | **DELIBERATE** | `git log -S 'os-ingredient-bridge'`; Lane F exact structural rule is `01 people`, `02 beginning`, no `03`, preserving only named kept material. |
| 10 | Our Story | `Carob, in the grove` / source panel | `981b1f02b0f944856f6615c31b5b2ec52a294238`; 2026-08-16; same message | **DELIBERATE** | `git log -S 'id="source"'`; Lane F keeps unchosen grove wording in `FOR_NATE.md`, not on the page. |
| 11 | Our Story | Standalone “Why should indulgence come at the cost of rest?” pull quote and the same line in the beginning copy | `981b1f02b0f944856f6615c31b5b2ec52a294238`; 2026-08-16; same message | **DELIBERATE** | `git log -S` on the sentence; cut occurs inside the bounded Lane F rebuild. |
| 12 | Our Story | Craft/range band (`The range, together` / `Made by hand, batch by batch`) | `981b1f02b0f944856f6615c31b5b2ec52a294238`; 2026-08-16; same message | **DELIBERATE** | `git log -S 'id="craft"'`; excluded by the authorised two-chapter structure. |
| 13 | Our Story | Brunswick Heads/place chapter, including “We aren't corporate…” belief statement | `981b1f02b0f944856f6615c31b5b2ec52a294238`; 2026-08-16; same message | **DELIBERATE** | `git log -S 'id="place"'` and `-S "We aren't corporate"`; Lane F removes chapter `03` while retaining a shorter location sentence in People. |
| 14 | Our Story | Five-image `The range, in its own light` studio gallery | `981b1f02b0f944856f6615c31b5b2ec52a294238`; 2026-08-16; same message | **DELIBERATE** | `git log -S 'os-gal'`; Lane F explicitly removes held Frame 55 bindings and keeps studio placement proposals review-only. |
| 15 | Carob Story | Four-image `The pod, up close` grove gallery | `981b1f02b0f944856f6615c31b5b2ec52a294238`; 2026-08-16; same message | **DELIBERATE** | `git log -S 'id="gallery"'`; Lane F replaces the page structure with exact pod-to-bar steps and forbids publishing unchosen grove prose/media placement. |
| 16 | Carob Story | On-page `Asked, answered` market FAQ | `981b1f02b0f944856f6615c31b5b2ec52a294238`; 2026-08-16; same message | **DELIBERATE** | `git log -S 'class="faq" id="faq"'`; Lane F explicitly says remove the duplicated block without changing the separate FAQ page. |
| 17 | Stockists | CSS-drawn illustrative map, coverage markers and map-summary JS | `981b1f02b0f944856f6615c31b5b2ec52a294238`; 2026-08-16; same message | **DELIBERATE** | `git log -S 'Illustrative coverage preview'`; ratified CV-067 decision says remove the visibly unfinished illustrative map from clean review while preserving the verified list. |
| 18 | Stockists | Enabled newsletter address field/promise, replaced by disabled non-collecting demo | `981b1f02b0f944856f6615c31b5b2ec52a294238`; 2026-08-16; same message | **DELIBERATE** | `git log -S 'Leave your email and we will let you know'`; Lane E explicitly requires visible non-collecting state. |
| 19 | FAQ | `Shipping & returns` quick action | **UNVERIFIED-NO-COMMIT** for the exact deploy-only quick action | **DELIBERATE** | `git log -S 'Shipping%20and%20returns'` returns no WIP commit, but ratified CV-066 explicitly moves the function into FAQ content. Current includes a dedicated shipping/returns question and external policy link. This is access relocation, not net content loss. |

### Count check

- DELIBERATE: rows 1, 6, 8–19 = **14**.
- COLLATERAL: **0**. The broad `981b1f0` message does not describe the cuts, but the accompanying Lane E/Lane F packets and ratified CV decisions do, so those rows meet the requested DELIBERATE test rather than COLLATERAL.
- UNEXPLAINED: rows 2–5 and 7 = **5**, all explicitly `UNVERIFIED-NO-COMMIT` for the exact deploy-only element.

## Rank: unexplained/collateral visitor impact

1. **Home functional stockist finder → disabled mock cards (UNEXPLAINED).** A high-intent visitor loses a direct discovery task; the later recorded decision says this should be functional.
2. **Shop's separate Carob Bites category and two products (UNEXPLAINED).** It visibly narrows the catalogue from 24 to 22 objects and removes an entire enquiry category.
3. **Home `$99` free-shipping reassurance → “pending” (UNEXPLAINED).** It weakens purchase confidence and contradicts the later approved `$99` launch copy.
4. **Home secure-payment reassurance → “pending” (UNEXPLAINED).** It makes the current page read as unfinished.
5. **Home farm-photo credit (UNEXPLAINED).** Low interaction impact, but it removes attribution visible on both 13 Aug deploys.

There are no COLLATERAL rows after consulting the accompanying packets; this ranking therefore contains all five UNEXPLAINED rows.

## Answer to Nate's actual question

**Yes: the deployed current candidate is a lesser version of itself. No: it is not simply “a much older commit.”** Its navigation, Contact route, shared footer and some Home content are newer. But it combines those newer additions with (a) explicitly authorised, highly visible structural reductions on Our Story and Carob Story and (b) five untraced deploy-only regressions on Home/Shop. Home and Shop are materially thinner than their 13 Aug equivalents in ways not explained by a deliberate removal. The strongest technical description is **newer shell, forked content lineage, lesser visitor experience**.

## Verification evidence

Initial required commands (real output):

```text
$ git rev-parse --short HEAD && git branch --show-current
9bbd9d6
docs/registry-authority-20260819

$ for f in _wip/*.WIP.html; do shasum -a 256 "$f"; done
97524120b51de42fa4b9a0bda47a2cd2e9f5caf2b29b04b1da30da6d48a56a68  _wip/carob-story.WIP.html
38ef32975261f6fc9b08c8a5df299c8f3bfe893a59ef9540949ef7dee262c7cb  _wip/contact.WIP.html
d043e578349220fec89f16a1d75e0182a1e3fe745cdcaa5639c4be0cdff0c525  _wip/faq.WIP.html
284c55d8bcfbb8fc39b500540c7e6494eb0edfcc5506c7f8dbe4dd622265fb81  _wip/homepage_real_1_lead_photo.WIP.html
5323d72a21b0ba30c59662564a86c6f07441d156ed76c5849e36ea6550a73566  _wip/our-story.WIP.html
035a66bb8915e35f636b856849b2ae1cea8666f5fb302aeaf04cf6e8c1db4fc5  _wip/shop.WIP.html
41a291fdec4a2f0ebe348544bf24d65f20d0017863941c1f252ddc3337d6d471  _wip/stockists.WIP.html

$ curl -sL https://maplemoonbuild20260813.vercel.app/ -o /tmp/mm_0813.html && wc -c /tmp/mm_0813.html
208556 /tmp/mm_0813.html

$ curl -sL https://maplemoon-demo-v2-20260813.vercel.app/ -o /tmp/mm_demo.html && wc -c /tmp/mm_demo.html
180565 /tmp/mm_demo.html

$ git log -S 'id="pdpView"' --oneline -- _wip/homepage_real_1_lead_photo.WIP.html
981b1f0 Baseline before Codex Lane E apply
720e014 wip(section-review): content — WIP page drafts + feedback log + index

$ git log -S 'os-ingredient-bridge' --oneline -- _wip/our-story.WIP.html
981b1f0 Baseline before Codex Lane E apply
2734a90 feat(wave1): W1-A/B/C page copy, fade pattern, decision-board refresh
720e014 wip(section-review): content — WIP page drafts + feedback log + index

$ git log -S 'id="gallery"' --oneline -- _wip/carob-story.WIP.html
981b1f0 Baseline before Codex Lane E apply
cdbd708 Commit approved baseline: real-lead-photo homepage + linked pages, WIP set, assets

$ git log -S 'Illustrative coverage preview' --oneline -- _wip/stockists.WIP.html
981b1f0 Baseline before Codex Lane E apply
720e014 wip(section-review): content — WIP page drafts + feedback log + index
```

Pre-existing status captured before the report write:

```text
?? _wip/evidence/s1b_verify_20260820/
?? docs/orchestration/AUTHORITATIVE-SOURCE-PIN-20260820.md
?? docs/orchestration/CATALOGUE-RECONCILIATION-20260820.md
?? docs/orchestration/FIGMA-CONTRACT-SCOPE-20260820.md
?? docs/orchestration/SHARED-CHROME-SHOP-VS-HOMEPAGE-20260820T175821.md
?? docs/orchestration/catalogue-reconciliation-20260820.csv
?? docs/orchestration/packets/MAPLEMOON-CATALOGUE-RECONCILIATION-WOO-24-20260820T175821.md
?? docs/orchestration/packets/MAPLEMOON-REGISTRY-REBASELINE-DRYRUN-20260820T175821.md
?? docs/orchestration/packets/MAPLEMOON-SHOPIFY-THEME-INVENTORY-S1B-VERIFY-20260820T175821.md
?? docs/orchestration/reviews/MAPLEMOON-S1B-VERIFY-20260820.md
```

Final verification (real output):

```text
$ for f in _wip/*.WIP.html; do shasum -a 256 "$f"; done
97524120b51de42fa4b9a0bda47a2cd2e9f5caf2b29b04b1da30da6d48a56a68  _wip/carob-story.WIP.html
38ef32975261f6fc9b08c8a5df299c8f3bfe893a59ef9540949ef7dee262c7cb  _wip/contact.WIP.html
d043e578349220fec89f16a1d75e0182a1e3fe745cdcaa5639c4be0cdff0c525  _wip/faq.WIP.html
284c55d8bcfbb8fc39b500540c7e6494eb0edfcc5506c7f8dbe4dd622265fb81  _wip/homepage_real_1_lead_photo.WIP.html
5323d72a21b0ba30c59662564a86c6f07441d156ed76c5849e36ea6550a73566  _wip/our-story.WIP.html
035a66bb8915e35f636b856849b2ae1cea8666f5fb302aeaf04cf6e8c1db4fc5  _wip/shop.WIP.html
41a291fdec4a2f0ebe348544bf24d65f20d0017863941c1f252ddc3337d6d471  _wip/stockists.WIP.html

$ git diff --name-only
[no output]

$ git diff -- _wip/*.WIP.html
[no output]

$ removal-row/class check
19
DELIBERATE=14
COLLATERAL=0
UNEXPLAINED=5
PASS: all removal rows carry a 40-character SHA or UNVERIFIED-NO-COMMIT

$ git status --porcelain
?? _wip/evidence/s1b_verify_20260820/
?? docs/orchestration/AUTHORITATIVE-SOURCE-PIN-20260820.md
?? docs/orchestration/CONTENT-LOSS-AUDIT-20260820.md
?? docs/orchestration/FIGMA-CONTRACT-SCOPE-20260820.md
?? docs/orchestration/SHARED-CHROME-SHOP-VS-HOMEPAGE-20260820T175821.md
?? docs/orchestration/packets/MAPLEMOON-CATALOGUE-RECONCILIATION-WOO-24-20260820T175821.md
?? docs/orchestration/packets/MAPLEMOON-REGISTRY-REBASELINE-DRYRUN-20260820T175821.md
?? docs/orchestration/packets/MAPLEMOON-SHOPIFY-THEME-INVENTORY-S1B-VERIFY-20260820T175821.md
?? docs/orchestration/reviews/MAPLEMOON-S1B-VERIFY-20260820.md
```

The final status is not empty because the worktree was dirty at entry. It contains this lane's one report plus eight surviving pre-existing untracked paths. Two pre-existing paths recorded at entry disappeared concurrently during the audit: `docs/orchestration/CATALOGUE-RECONCILIATION-20260820.md` and `docs/orchestration/catalogue-reconciliation-20260820.csv`. This lane did not delete, restore or otherwise touch them. This external change prevents a literal “initial status plus exactly one path” assertion, but `git diff --name-only` and the empty page diff prove no tracked/page mutation by this lane.
