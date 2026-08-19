# MapleMoon Nate decision gate R2 — 2026-08-14 18:44 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-NATE-DECISION-GATE-R2-20260814T184422",
  "worker_thread_id": "/root/dedup_risk_audit",
  "state": "ready_control_plane_decision_consolidation",
  "objective": "Consolidate every currently actionable Nate-only MapleMoon catalogue, commerce, stockist, form, claim and exact-media decision into one bounded evidence-backed gate with a recommended conservative choice, while separating choices Nate can make now from dependencies that do not yet have enough evidence.",
  "authority": "Content/catalogue truth R2, asset authority addendum R2 and native-zoom R2 are closed and pinned. Styles Kit v0.1.7 is planning-valid, but its owner is now running an approved v0.2.0 documentation-only refinement, so no current Styles Kit implementation decision may be represented as final until that task closes and receives the required fresh Claude result.",
  "base": {
    "content_review_sha256": "eee350fd321947cf5966818636cc68b6828ce6574a6d49c03f573ef360d70060",
    "content_receipt_sha256": "e18c11272f7b183e88e45d58ac2aca2db68ce9d28046bcc9fe70e39fdfc8d8a8",
    "asset_addendum_r2_sha256": "c1466768f82a8938acd6bbdf6d7ec33100b1326920f5d5669d260adeb52ed508",
    "asset_addendum_r2_receipt_sha256": "a81987e8d976e9bfe436d9a28ece38b7a04484e18c11c3e811080df541c64780",
    "native_zoom_r2_sha256": "01173ba097490c2b3fa2902c1252e1ef2db61d3e1cef92845e5dde14e3b8c8fc",
    "native_zoom_r2_receipt_sha256": "2ce32f493fce151f91a8f7750f1141a99bea70167254cd081e9c080874ab87d5",
    "styles_intake_v017_sha256": "2e5ac9d60c3b84dc1be5ec14b9bd658971ec0b9e8a6b47f349e9da088c01022b",
    "styles_intake_v017_receipt_sha256": "02930940a11dc5eab0dc4205dd6892126faca3cc955b23e246a40b6ef680934a",
    "styles_task_thread_id": "019ff65f-fd33-7e51-8a83-360ba2f8d665",
    "working_photo_ratio": "5 wired photo_finals hero files / 14 eligible V9 frames = 36 percent",
    "production_state": "frozen on immutable token 7vjf2m50b"
  },
  "readable_paths": [
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CONTENT-CATALOGUE-TRUTH-AUDIT-R2-20260814T164221.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CONTENT-CATALOGUE-TRUTH-AUDIT-R2-20260814T164221.json",
    "maplemoon-website/_wip/evidence/content_catalogue_truth_audit_r2_20260814T164221",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ASSET-SLOT-AUTHORITY-MATRIX-20260814T143614.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ASSET-AUTHORITY-ADDENDUM-R2-20260814T172612.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ASSET-AUTHORITY-ADDENDUM-R2-20260814T172612.json",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATIVE-200-ZOOM-AUDIT-R2-20260814T180224.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATIVE-200-ZOOM-AUDIT-R2-20260814T180224.json",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-STYLES-KIT-V017-BOSS-INTAKE-20260814T171205.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-STYLES-KIT-V017-BOSS-INTAKE-20260814T171205.json",
    "maplemoon_build_20260813/homepage.html",
    "maplemoon_build_20260813/our-story.html",
    "maplemoon_build_20260813/carob-story.html",
    "maplemoon_build_20260813/shop.html",
    "maplemoon_build_20260813/faq.html",
    "maplemoon_build_20260813/stockists.html",
    "maplemoon_build_20260813/pure-carob-bar.html",
    "maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATE-DECISION-GATE-R2-20260814T184422.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATE-DECISION-GATE-R2-20260814T184422.json"
  ],
  "required_decision_groups": [
    "D01 production catalogue: six approved bars only versus an item-by-item authorised 24-product catalogue; never treat the private-preview 24 as approved by default",
    "D02 production commerce: truthful enquiry-only static experience versus separately scoped real connected commerce; never call the current mock cart checkout",
    "D03 stockist public truth: explicitly confirm the 204-source minus 7-withheld equals 197 public figure and its owner/cadence, or choose nonnumeric wording; never retain unsupported 200+ by inertia",
    "D04 newsletter/contact: remove or truthfully disable collection until connected, versus separately approve a real consent/privacy/submission endpoint",
    "D05 customer-visible claims and the mapped CV-014/CV-051/CV-062 occurrences: approve with named evidence, choose bounded neutral wording, or preserve only in private review; exact strings/routes/selectors required",
    "D06 exact elixir v4 live use: separately APPROVE or REJECT Pure SHA 70f93f414902ae1b10e7ae1416954348aa20bd1d6950e37d05979b4e4aa9eb93 and Spiced SHA 414f727e84ca0dc24749b10b1092f4618e9f9fc9b954304442a7a0a8779749bb, acknowledging reconstructed fine packaging text",
    "D07 exact live media still lacking source/approval, including Our Story founder use and every product slot outside already approved powder: identify as dependency-first, not a binary choice Nate can responsibly approve from missing evidence",
    "D08 Styles Kit implementation: explicitly pending the in-progress v0.2.0 source close plus fresh Claude PASS and Safe-to-feed result; no Nate choice requested from a moving package",
    "D09 production movement: preserve as a separate final explicit Nate instruction after the smallest correction packets and new private preview; do not bundle it into content approval"
  ],
  "method": [
    "create a timestamped non-overwriting checkpoint for the exact two writable outputs and pass phase-start with --root /Users/handtomouse before the first write",
    "verify all eight pinned review/receipt hashes and replay their applicable completion/promotion gates",
    "extract each exact unresolved decision, route, visible string, selector/state and source evidence from the pinned reviews and unchanged candidate; no vague category-only prompts",
    "for D01 through D06 provide mutually exclusive choices, one clearly labelled recommended conservative choice, concrete impact and the exact candidate files that would become eligible for a later packet",
    "for D05 separate evidence-backed exact caffeine wording from broader finished-product health, diet, sugar, origin, ingredient, taste, availability, formulation and manufacturing claims; do not imply one approved sentence approves the category",
    "for D06 use full SHA-256 values and named slots and state that mechanical/render PASS does not certify label, ingredient, nutrition, compliance or fine-print fidelity",
    "for D07 and D08 produce dependency statements rather than asking Nate to choose without the required evidence",
    "list the recommended smallest implementation order after decisions: truth-critical content/commerce first, then approved exact media, then final Styles rule slice, then integrated QA/private preview",
    "state the current technical evidence already complete: header/cart integration, native 200 percent zoom, local preflight and authenticated private-preview byte equality; do not reopen these without a mutation",
    "state 36 percent as the only photo figure and retain production/client-contact freeze",
    "write a one-page primary decision sheet followed by evidence appendix; write receipt and run completion then promotion gates"
  ],
  "verify": [
    "every actionable prompt has exact choices, one recommendation, impact and downstream file scope",
    "every non-actionable dependency is labelled WAIT FOR EVIDENCE rather than converted into a Nate choice",
    "six-versus-24, commerce, stockist count/source, newsletter, claims/CV occurrences and both elixir hashes are all present",
    "the exact caffeine approval is not broadened to finished-product claims",
    "the moving v0.2.0 Styles Kit and production movement remain separate later gates",
    "36 percent is the only photo-completion figure",
    "only the exact decision sheet and receipt change",
    "completion and promotion gates pass"
  ],
  "stop": [
    "a pinned review/receipt hash or applicable predecessor gate fails",
    "a decision cannot be stated exactly without inventing copy, product facts, price, availability, source, asset approval or capability",
    "the in-progress Styles Kit would need to be treated as final",
    "a candidate/source/media/Styles Kit edit or external action would be needed",
    "a path outside writable_paths changes"
  ],
  "forbidden_actions": [
    "make any Nate/client decision, silently apply the recommended defaults or edit the candidate",
    "read or import the moving Styles Kit outputs as stable authority",
    "deploy, promote, alias, alter protection, move production, commit, push, delete, stash, gitignore, email or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS, then Nate for D01 through D06 only; D07 through D09 remain dependency/release gates",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Boundary

This is one decision surface, not permission to implement its recommendations.
