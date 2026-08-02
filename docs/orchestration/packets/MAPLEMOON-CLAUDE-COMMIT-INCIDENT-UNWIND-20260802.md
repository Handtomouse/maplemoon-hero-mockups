# MapleMoon Claude commit-incident mixed-reset recovery packet

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-CLAUDE-COMMIT-INCIDENT-UNWIND-20260802",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "ready",
  "objective": "move the current branch and index from the unauthorized six-commit incident HEAD back to the accepted d65047b boundary with git reset --mixed, preserving every working-tree byte for bounded re-admission",
  "authority_path": "docs/orchestration/reviews/MAPLEMOON-CLAUDE-COMMIT-INCIDENT-RECOVERY-20260802.json",
  "authority_sha256": "d05bbdfa7d1f45fe437c05c78c005617e09b3f422059554222e0821e527e890d",
  "approval": "Nate explicitly authorized Main to perform the recovery-gated git reset --mixed d65047b and no other Git, cleanup or external action.",
  "base": {
    "branch": "codex-maplemoon-section-review",
    "incident_head": "d163a539ac0673a39bebfcd1ef94331353d0676d",
    "accepted_head": "d65047b6a7431af955ad0cd5b57c42f7a9367225",
    "bundle_path": "_wip/reviews/claude_commit_incident_20260802/committed-range.bundle",
    "bundle_sha256": "b3652175d5f389468574dcf1998be8368d20c65f10c83a7a35024f87bfab1ca9"
  },
  "readable_paths": [
    ".git refs, objects, index and reflog through bounded Git commands",
    "d65047b6a7431af955ad0cd5b57c42f7a9367225..d163a539ac0673a39bebfcd1ef94331353d0676d",
    "_wip/reviews/claude_commit_incident_20260802/committed-range.bundle",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/review-manifest.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/review-manifest.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/review-manifest.json"
  ],
  "writable_paths": [
    "docs/orchestration/packets/MAPLEMOON-CLAUDE-COMMIT-INCIDENT-UNWIND-20260802.md",
    "docs/orchestration/reviews/MAPLEMOON-CLAUDE-COMMIT-INCIDENT-UNWIND-20260802.json",
    "_wip/reviews/claude_commit_incident_20260802/pre-reset-tree-sha256.txt",
    "_wip/reviews/claude_commit_incident_20260802/post-reset-tree-sha256.txt",
    "_wip/reviews/claude_commit_incident_20260802/pre-reset-frozen-sha256.txt",
    "_wip/reviews/claude_commit_incident_20260802/post-reset-frozen-sha256.txt",
    "_wip/reviews/claude_commit_incident_20260802/post-reset-status.txt",
    "_wip/reviews/claude_commit_incident_20260802/post-reset-head.txt",
    "_wip/reviews/claude_commit_incident_20260802/post-reset-name-status.txt",
    "_wip/reviews/claude_commit_incident_20260802/post-reset-verification.md"
  ],
  "git_mutation": {
    "permitted": "git reset --mixed d65047b6a7431af955ad0cd5b57c42f7a9367225",
    "effect": "move the current branch ref and reset the index only; preserve working-tree bytes",
    "forbidden": "all other reset modes, checkout, restore, clean, add, commit, rebase, merge, branch, tag, push and deletion"
  },
  "verify": [
    "phase-start recovery checkpoint passes for every exact evidence output",
    "branch and incident HEAD match exactly before reset",
    "bundle SHA-256 and git bundle verification pass before and after reset",
    "all 126 incident-range path bytes are captured before and after and match exactly",
    "the frozen clean and annotated package tree hashes match before and after",
    "post-reset HEAD equals d65047b and index has no staged changes",
    "all incident bytes remain available as unstaged or untracked working material",
    "no cleanup, commit, push, deploy, send or external action occurs"
  ],
  "stop": [
    "branch or incident HEAD drift before reset",
    "unexpected staged or unstaged tracked changes before reset",
    "bundle verification failure",
    "pre/post incident path byte mismatch",
    "frozen-package byte mismatch",
    "post-reset HEAD or index mismatch",
    "request for any action outside the one authorized mixed reset"
  ],
  "forbidden_actions": [
    "git reset --soft or --hard",
    "git checkout, restore, clean, add, commit, rebase, merge, branch, tag or push",
    "file deletion or cleanup",
    "website, WIP or frozen-package byte changes",
    "worker dispatch during the recovery transaction",
    "deploy, publish, upload, send, client contact, Shopify, WooCommerce or production access"
  ],
  "next_reviewer": "Main Boss independent post-reset verification, then Nate CR-0",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Output

Return PASS only when the mixed reset is complete, the 126 affected paths and frozen package are byte-identical, the bundle remains valid and the branch/index are at the accepted boundary. Otherwise return HOLD or FAIL without cleanup.
