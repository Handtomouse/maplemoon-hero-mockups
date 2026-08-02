# Wave 1D non-Shop reconciliation — 2026-08-02

Status: report-only; no imagery generation, page integration, Shop work, or promotion.

## Authority and baseline

The current authority is `/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-OVERNIGHT-BOSS-HANDOFF-20260802.md`, SHA-256 `12689434a7c46c323b27d1c8a099cb9703bf910b8c6dbbac2cfca193a0c6b599`.

The six frozen non-Shop baseline files were re-hashed and matched the coordinator values:

| File | SHA-256 |
|---|---|
| `docs/client-review/2026-08-01-saturday-review/staging-v1/clean/homepage.html` | `0d102050395b79f4add5d9ddb7f75e962d7e41e11a78cd7f88c35ce4a947ef0c` |
| `docs/client-review/2026-08-01-saturday-review/staging-v1/clean/our-story.html` | `e270a5016260eed726f2bdcbb27447cea6066cc19a866d524fd47cff24cef7d1` |
| `docs/client-review/2026-08-01-saturday-review/staging-v1/clean/carob-story.html` | `d93dc036603ae7772e365573de1f89f066556d922d8b99c5e3fc7f2dada62762` |
| `docs/client-review/2026-08-01-saturday-review/staging-v1/clean/stockists.html` | `046a1fe649d75814804b921ac258fca135fa11b9447ca9c54eb28859df3d5af6` |
| `docs/client-review/2026-08-01-saturday-review/staging-v1/clean/faq.html` | `f4acfb51c6e353828a432285f2a37f69ca39154b18d78ef41e337dc29fb35dcf` |
| `docs/client-review/2026-08-01-saturday-review/staging-v1/MANIFEST.json` | `f2d24cbed1068f17d7989010a08354006f59e8dfe575346cd268f149d2b9b5e4` |

## Reconciled non-Shop inventory

Source of truth: `generated-candidates/IMAGERY-MATRIX.md`, the five frozen clean pages and their aggregate manifest, current local source assets, and the authority handoff.

- Homepage: hero, `#why`, story, and sampler are current/approved local imagery; `#carob` is suitable but needs a mobile crop; social/OG references remain placeholders.
- Homepage ritual tiles: the three existing source scenes are wrong per the three open ritual feedback records. The isolated candidate family is the only high-confidence safe-to-generate gap. Families A+C+D were selected for expansion; richer E-H and original-v5 low-fidelity material were exploratory. No final ritual candidate is approved.
- Our Story: ingredient, farm, range, place, and gallery sources exist; makers/founder hero and hands require approved client assets and identity/permission evidence. Existing gallery crop and hierarchy need human visual review.
- Carob Story: farm, macro, pod-to-bar and closing imagery exist; gallery crop/hierarchy needs review. Copy/process claims remain factual/client gated.
- Stockists: header and trade imagery exist; geographic/map imagery is missing and blocked pending Nate's visual decision and verified directory strategy. Existing imagery must not imply real coverage.
- FAQ: body needs no raster image; the hero decoration is a non-portable generated-file placeholder in the source page and requires a separate page/code remediation packet.
- Shop/product imagery is deferred entirely. No Shop cards, products, crops, lower-range assets, packaging or catalogue states were altered or recommended here.

## Provenance and limitations

Existing candidates are review-only isolated PNGs, not exact MapleMoon products, recipes, packaging, labels, people, claims, client photography, testimonials, stockists, certifications, or catalogue evidence. They remain pending human review and are not referenced by existing pages. The matrix's licensed/local sources remain the provenance baseline; no new source was introduced in this reconciliation.

## Smallest next non-Shop packet

One packet only: a Nate visual-review packet for the three isolated Homepage `#ritual` candidates, comparing the preserved A+C+D-expanded set at the actual tile crops and recording one selected direction or HOLD. It must remain unwired and must not touch Shop or existing page/code files. This packet is recommended, not executed.

## Verification result

The checker-owned phase-start gate passed. The six baseline hashes matched. All 30 pre-existing files in `generated-candidates/` were byte-identical before and after this report. Only the four admitted output paths changed; no Shop/product path changed. Disk availability was 34 GiB at verification. `ready_to_promote` remains false.
