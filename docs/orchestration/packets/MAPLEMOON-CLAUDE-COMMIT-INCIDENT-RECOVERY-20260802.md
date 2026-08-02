# MapleMoon Claude commit-incident recovery packet

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-CLAUDE-COMMIT-INCIDENT-RECOVERY-20260802",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "ready",
  "objective": "preserve the unauthorized six-commit range, reflog, working-tree evidence and untracked incident records, then classify every commit without changing Git refs, index or source bytes",
  "authority_path": "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CLAUDE-SCOPE-BREACH-20260802-1303-AEST.md",
  "authority_sha256": "9f4c9a0045bee115584499432c0efeac4bd7e345aaa2cf918759d706634bd391",
  "base": {
    "branch": "codex-maplemoon-section-review",
    "accepted_head": "d65047b6a7431af955ad0cd5b57c42f7a9367225",
    "incident_head": "d163a539ac0673a39bebfcd1ef94331353d0676d"
  },
  "readable_paths": [
    ".git refs, objects and reflog through read-only Git commands",
    "CLAUDE.md",
    "docs/orchestration/packets/MAPLEMOON-CLAUDE-COLLAB-CONTINUITY-20260802.md",
    "docs/orchestration/reviews/MAPLEMOON-CLAUDE-SCOPE-BREACH-20260802-1303-AEST.md",
    "d65047b6a7431af955ad0cd5b57c42f7a9367225..d163a539ac0673a39bebfcd1ef94331353d0676d"
  ],
  "writable_paths": [
    "docs/orchestration/packets/MAPLEMOON-CLAUDE-COMMIT-INCIDENT-RECOVERY-20260802.md",
    "docs/orchestration/reviews/MAPLEMOON-CLAUDE-COMMIT-INCIDENT-RECOVERY-20260802.json",
    "_wip/reviews/claude_commit_incident_20260802/HEAD.txt",
    "_wip/reviews/claude_commit_incident_20260802/BASE.txt",
    "_wip/reviews/claude_commit_incident_20260802/commits.tsv",
    "_wip/reviews/claude_commit_incident_20260802/reflog.txt",
    "_wip/reviews/claude_commit_incident_20260802/status.txt",
    "_wip/reviews/claude_commit_incident_20260802/diff-stat.txt",
    "_wip/reviews/claude_commit_incident_20260802/diff-name-status.txt",
    "_wip/reviews/claude_commit_incident_20260802/commit-provenance.md",
    "_wip/reviews/claude_commit_incident_20260802/untracked-SHA256SUMS.txt",
    "_wip/reviews/claude_commit_incident_20260802/committed-range.bundle",
    "_wip/reviews/claude_commit_incident_20260802/untracked/CLAUDE.md",
    "_wip/reviews/claude_commit_incident_20260802/untracked/MAPLEMOON-CLAUDE-COLLAB-CONTINUITY-20260802.md",
    "_wip/reviews/claude_commit_incident_20260802/untracked/MAPLEMOON-CLAUDE-SCOPE-BREACH-20260802-1303-AEST.md"
  ],
  "verify": [
    "branch, base and incident HEAD match exactly before capture",
    "six commits are preserved in a valid Git bundle",
    "reflog, status, commit list, diff stat and 126-path name-status are captured",
    "three current untracked incident files are copied and hash-verified",
    "each commit receives provenance and risk classification",
    "Git refs, index, source bytes and frozen package remain unchanged"
  ],
  "stop": [
    "branch, base or HEAD drift",
    "unexpected staged or unstaged tracked changes",
    "bundle verification failure",
    "source or Git ref mutation",
    "reset, checkout, clean, delete, stage, commit, push or deploy request"
  ],
  "forbidden_actions": [
    "git reset",
    "git checkout or restore",
    "git clean or deletion",
    "git add, commit, rebase, merge, tag, branch creation or push",
    "website, WIP, frozen-package or external-system mutation"
  ],
  "next_reviewer": "Nate",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Output

Return HOLD with immutable recovery evidence, six per-commit classifications and one reversible recommendation. Do not execute any keep or unwind action.
