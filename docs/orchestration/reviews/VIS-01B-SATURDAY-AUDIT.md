# VIS-01B Saturday Audit Receipt

**Packet:** `VIS-01B-SATURDAY-CONTROL`  
**Status:** `BLOCK` / `needs_review` evidence; not an admitted worker packet  
**Review mode:** three disjoint read-only agents plus coordinator source checks  
**Files changed by reviewers:** none

## Reviewer conclusions

### UI/source audit

- No defensible visual, colour, typography or spacing score exists without rendered review.
- All resolvable static media and 39 dynamically referenced product images exist.
- No duplicate static IDs or genuine broken fragment targets were found.
- Copywriting and experience remain materially incomplete because of visible pending material, contradictory counts, disputed claims and inert controls.
- Carob Story is the strongest source-level lock candidate; no page is final-locked.

### Integration audit

- Local page destinations, static fragments, inline scripts/JSON-LD and 69 staged assets pass source checks.
- The shared navigation/footer matrix is inconsistent.
- Clean inner-page navigation leaks to a `.WIP.html` homepage URL.
- Cart, newsletter and purchase-looking controls do not provide commerce behaviour.
- Annotated mode works after `?review=1`, but the review index does not enter that mode.
- Staging noindex/canonical checks pass; production-shaped OG metadata remains.
- `.vercel/` project/team metadata must be excluded from any share artifact.

### Assumptions audit

- The ratified V2 is canonical even though its frozen header retains the earlier proposed status.
- The Saturday page order and process decisions are settled.
- Existing staging/orchestrator artifacts are reusable scaffolding, not the approved Saturday pair.
- The latest Carli correction source, exact occurrence map and replacement wording are not yet durable local evidence.
- No page-local mutating worker is admitted by this audit.
- No complete page or content/design section is safely final-locked.

## Coordinator checks and boundaries

- Historical `staging-v1` checker: `PASS`, 10 root HTML files, no symlinks, no forbidden-token/direct-local-reference failures.
- That checker does not prove current-WIP freshness, zero-network operation, CSS references, fragment integrity, JavaScript behaviour, responsive/accessibility QA, OG correctness, `.vercel` exclusion or clean/annotated visual parity. It skips external URLs and therefore does not clear Typekit.
- Six WIP SHA-256 values were the same at both coordinator captures:
  - Homepage: `e98643f389763f3c50da9001395a783c08eb078719e0499b9d122c35a6c11f12`
  - Carob Story: `cdc426a6a19d8012f9198584842766ed0ee7400d7f93a4642d9bb3db972216c7`
  - Shop: `b11f0eec60ee0a6c0927c0657171cf12044c1aa7f2a781d84a87eb843a6735d0`
  - Our Story: `17b77bc83930a6ad4ef5834427bdeed5ff6672a8001328259aa84e7a98e06304`
  - Stockists: `257662784dfb31792c1604ff7821cb16abdc78281a681311f518498ab8a6e8ce`
  - FAQ: `4a7f5eee7096150f23f07cac6316c83893aab34135e3c40ca0e24848b77704f1`
- Existing `staging-v1` page hashes differ from all six current WIP hashes; derivation/freshness must be explicitly rebuilt and recorded before Saturday acceptance.
- `git diff --check`: pass for tracked diffs only; it does not inspect untracked generated documents.
- Frozen V2 validator: `BLOCK: exactly eight V2 lock rows required`. The script's candidate-era cardinality rule conflicts with accepted post-ratification P04 lock records. The frozen validator was not modified.

## Saturday disposition

The package is not currently Saturday-ready. Source mechanics are substantially present, but critical/major trust, content, navigation, commerce-presentation and rendered-QA gates remain.

The authoritative unresolved queue is `docs/orchestration/SATURDAY_FEEDBACK_REGISTER_20260801.md`.

## First review-surface pre-dispatch proposal

A later packet may propose a new derived Saturday staging path with exact current WIP hashes, aliases, routing/index files and an allowlist. It may then address only review-surface mechanics:

- create clean aliases that expose no `.WIP.html` filenames;
- make annotated index links enter `?review=1`;
- exclude `.vercel/` metadata from share artifacts;
- preserve source WIP and all factual/catalogue gates.

Navigation/footer changes and commerce/newsletter neutralisation remain separate Nate decisions. No mutation is admitted by this receipt.
