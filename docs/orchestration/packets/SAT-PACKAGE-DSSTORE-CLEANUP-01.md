# SAT-PACKAGE-DSSTORE-CLEANUP-01

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "SAT-PACKAGE-DSSTORE-CLEANUP-01",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "ready",
  "objective": "remove exactly five pre-existing Finder .DS_Store metadata files that invalidate Saturday package membership, then rerun the authoritative deterministic checks without changing any review content",
  "authority_path": "docs/orchestration/reviews/MAPLEMOON-CLAUDE-COMMIT-INCIDENT-UNWIND-20260802.json",
  "authority_sha256": "294c0cd83d4a21de0f99008f96d4f9878613287270cb30a7ae3973a54ad1c1f6",
  "approval": "Nate explicitly approved SAT-PACKAGE-DSSTORE-CLEANUP-01 for these five files only, with checkpoint, deletion and deterministic recheck.",
  "readable_paths": [
    "docs/client-review/2026-08-01-saturday-review/staging-v1",
    "scripts/check-maplemoon-review.py",
    "scripts/check-maplemoon-cart.mjs",
    "scripts/check-maplemoon-responsive-overflow.mjs",
    "_wip/reviews/claude_commit_incident_20260802/pre-reset-frozen-sha256.txt",
    "_wip/reviews/claude_commit_incident_20260802/post-reset-frozen-sha256.txt"
  ],
  "writable_paths": [
    "docs/orchestration/packets/SAT-PACKAGE-DSSTORE-CLEANUP-01.md",
    "docs/orchestration/reviews/SAT-PACKAGE-DSSTORE-CLEANUP-01-20260802.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/.DS_Store",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/.DS_Store",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/assets/.DS_Store",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/.DS_Store",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/assets/.DS_Store",
    "_wip/reviews/package_dsstore_cleanup_20260802/pre-delete-sha256.txt",
    "_wip/reviews/package_dsstore_cleanup_20260802/post-clean-package-sha256.txt",
    "_wip/reviews/package_dsstore_cleanup_20260802/check-results.txt"
  ],
  "base_sha256": {
    "docs/client-review/2026-08-01-saturday-review/staging-v1/.DS_Store": "3f62e9ceb5e5a677eaddc0490fd3d40a1ccd32d6fd6b987a2adf95cd2c2e7a40",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/.DS_Store": "55a13f1ed86279c53a22fcd3bf5f888d4259afc20f5af0979bff989e179ade40",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/assets/.DS_Store": "98a40530bb3215e08de90b661ef735f25ebb5625146f0769b9dd548ed8ac823f",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/.DS_Store": "51c1c27901233678569f247f2282cef8a49fafbd8f228f766f2c1afb884d4cd7",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/assets/.DS_Store": "8efd36743376b0e1758ac5594bb64560b2ff5d90764b7f3d0cfcf2375608d236"
  },
  "verify": [
    "all five files exist and match their admitted SHA-256 values before deletion",
    "timestamped non-overwriting checkpoint captures all five files and every evidence output",
    "only the five admitted .DS_Store files are deleted",
    "authoritative Saturday clean/annotated checker passes",
    "cart/no-network checker passes",
    "responsive overflow positive-control self-test passes",
    "all remaining staging-v1 review content retains its pre-clean SHA-256 values",
    "Git HEAD and index remain unchanged"
  ],
  "stop": [
    "any admitted file is absent or has a base-hash mismatch before deletion",
    "checkpoint failure",
    "any deletion outside the five exact paths",
    "review-content hash drift",
    "required deterministic check failure",
    "Git HEAD or index mutation"
  ],
  "forbidden_actions": [
    "delete any file other than the five exact .DS_Store paths",
    "edit, rebuild or reformat review content",
    "git add, commit, reset, checkout, restore, clean, push or branch mutation",
    "worker or Claude activation",
    "deploy, publish, upload, send, client contact, Shopify, WooCommerce or production action"
  ],
  "next_reviewer": "Main Boss independent deterministic verification, then Nate Homepage CR-0",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Output

PASS only when the five metadata files are absent, all checkers pass, and every remaining package byte is unchanged. Then begin the clean Homepage guided CR-0 without sharing.
