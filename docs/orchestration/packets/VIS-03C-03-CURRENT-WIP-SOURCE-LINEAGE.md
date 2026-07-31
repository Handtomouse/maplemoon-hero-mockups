# Packet VIS-03C-03 - Current WIP Source Lineage

**Packet ID:** `VIS-03C-03-CURRENT-WIP-SOURCE-LINEAGE`
**Candidate ID:** `VIS-03C-03-CURRENT-WIP-LINEAGE-CANDIDATE-20260731-001`
**Candidate authority:** `CTRL-V2-CANDIDATE-20260730-001`
**Cluster:** `VIS-03C-03-DERIVED-REVIEW-LINEAGE`
**State:** `needs_review`
**Approval class:** `mutating-local-derived-review`
**Owner:** Codex
**Final decision owner:** Nate

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "VIS-03C-03-CURRENT-WIP-SOURCE-LINEAGE",
  "candidate_id": "VIS-03C-03-CURRENT-WIP-LINEAGE-CANDIDATE-20260731-001",
  "parent_candidate_id": "CTRL-V2-CANDIDATE-20260730-001",
  "phase": "VIS-03",
  "state": "needs_review",
  "approval_class": "mutating-local-derived-review",
  "cluster_id": "VIS-03C-03-DERIVED-REVIEW-LINEAGE",
  "objective": "Rebuild the six-page clean and annotated Saturday review package from the six current canonical WIP page files while preserving every existing evidence-safe derived transformation and leaving canonical WIP byte-identical.",
  "user_decisions": [
    "use all six current WIP pages as the derived package source lineage",
    "normalize review-only metadata and local asset paths in generated outputs only",
    "automatically repair safe derived-preview defects and rerun checks",
    "Codex completes automated and responsive browser QA",
    "freeze a verified local candidate and stop for Nate visual, keyboard and 200 percent review"
  ],
  "non_goals": [
    "editing any canonical WIP page",
    "changing page design, section order, copy, claims, catalogue facts, prices or assets",
    "delivering additional Canva-note IDs",
    "resolving the held Carob Story comparison or CAT inputs",
    "committing, pushing, deploying, sharing, sending or changing external systems"
  ],
  "readable_paths": [
    "docs/orchestration/packets/VIS-01C-SATURDAY-REVIEW-SHELL.md",
    "docs/orchestration/packets/VIS-02A-HOMEPAGE-TECHNICAL-HARDENING.md",
    "docs/orchestration/packets/VIS-03C-02-FAQ-EVIDENCE-SAFE-CLOSURE.md",
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "_wip/carob-story.WIP.html",
    "_wip/shop.WIP.html",
    "_wip/our-story.WIP.html",
    "_wip/stockists.WIP.html",
    "_wip/faq.WIP.html",
    "docs/client-review/2026-07-29-carli-review/staging-v1",
    "docs/client-review/2026-08-01-saturday-review/shared",
    "docs/client-review/2026-08-01-saturday-review/staging-v1"
  ],
  "writable_paths": [
    "scripts/build-maplemoon-saturday-review.py",
    "scripts/check-maplemoon-review.py",
    "docs/client-review/2026-08-01-saturday-review/staging-v1",
    "docs/orchestration/reviews/VIS-03C-03-CURRENT-WIP-SOURCE-LINEAGE-20260731.md"
  ],
  "base": {
    "branch": "codex-maplemoon-section-review",
    "head": "a6cd91a589ceff18283e4c6250ac256fe97812a4",
    "builder_sha256": "69f609c8517e44c191b5f760bd52f0d6d3f6e03e7d64f1cc412efbb70d6f474f",
    "checker_sha256": "92693b7c3a8223a77f6c964bcb4822e209070eb04e6e468bdd90a4bf6f47b90c",
    "aggregate_manifest_sha256": "406be749b7eecc262204be04dfaf92d7b5a44181d1450b327b3470f9854ada91",
    "canonical_wip_sha256": {
      "_wip/homepage_real_1_lead_photo.WIP.html": "921ef01aa922668da2f0aacdfdf7438fd0e5664fb78ba98bc9c011e55e03b098",
      "_wip/carob-story.WIP.html": "cdc426a6a19d8012f9198584842766ed0ee7400d7f93a4642d9bb3db972216c7",
      "_wip/shop.WIP.html": "b11f0eec60ee0a6c0927c0657171cf12044c1aa7f2a781d84a87eb843a6735d0",
      "_wip/our-story.WIP.html": "17b77bc83930a6ad4ef5834427bdeed5ff6672a8001328259aa84e7a98e06304",
      "_wip/stockists.WIP.html": "257662784dfb31792c1604ff7821cb16abdc78281a681311f518498ab8a6e8ce",
      "_wip/faq.WIP.html": "4a7f5eee7096150f23f07cac6316c83893aab34135e3c40ca0e24848b77704f1"
    }
  },
  "action": "Pin and consume the six current WIP sources, apply only deterministic derived-review sanitization and path normalization, rebuild clean and annotated output through the fail-closed promotion path, run the complete automated and responsive browser checks, record exact evidence and freeze the result at needs_review.",
  "verify": [
    "all six current WIP acquisition hashes match before writing and remain unchanged afterward",
    "builder and checker acquisition hashes match",
    "the aggregate staging manifest acquisition hash matches",
    "all generated manifests identify VIS-03C-03-CURRENT-WIP-SOURCE-LINEAGE",
    "every generated page records current WIP provenance",
    "review-only noindex metadata is present and production canonical and social metadata are absent",
    "all local assets resolve from both clean and annotated roots",
    "all prior evidence-safe derived transformations remain enforced",
    "two independent full builds are byte-identical",
    "builder self-test, Saturday checker, cart checker, motion checker, Python compilation and git diff --check pass",
    "all six clean and annotated pages pass 320, 375, 390, 430, 1024 and 1440 pixel overflow, broken-image and unfinished-signal checks",
    "the candidate remains share_ready false and stops for Nate visual, keyboard and 200 percent review"
  ],
  "done": "One byte-stable local candidate is derived from the six pinned current WIP pages, independently checked and frozen at needs_review without canonical WIP or external-state mutation.",
  "stop": [
    "a base hash, source hash or held lock does not match",
    "a canonical WIP edit is required",
    "a derived repair changes public facts, design intent, catalogue data, claims or source assets",
    "deterministic, interaction, responsive, local-asset or forbidden-path verification fails",
    "any commit, push, deploy, send, Canva, Shopify, WooCommerce, Vercel or production action is requested"
  ],
  "next_reviewer": "Nate"
}
<!-- CONTROL-PLANE:END -->

## Coordinator admission

Nate approved all five lineage and review decisions. This packet supersedes only the page-source lineage of the derived Saturday package. The July 29 staging folder remains a read-only support source for review-layer assets that are separately pinned; it is no longer the page-content source for the five non-Homepage routes.

The verified implementation changed no generated page bytes except the clean and annotated Stockists outputs. Browser QA found and corrected two derived-only defects there: a rest-state skip control overlapping the mobile introduction and a clean-mode script attempting to update the intentionally excluded illustrative map. The candidate is now frozen at `needs_review`; only Nate's visual, keyboard and 200 percent review remains.
