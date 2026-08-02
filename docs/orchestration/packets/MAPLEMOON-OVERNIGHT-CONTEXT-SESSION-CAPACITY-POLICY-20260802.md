# MapleMoon Overnight Context and Session Capacity Policy

**Recorded:** 2026-08-02 01:13 AEST  
**Coordinator:** `019fa858-05c9-7631-b26e-8f5cbbf1387a`  
**Relationship:** Additive operating policy. It does not change the frozen overnight authority hash or broaden any active packet.

## Goal

Keep overnight progress durable and token-efficient without exhausting the Boss, worker, browser or model context windows. Project-local packets, receipts, manifests and evidence paths are the memory; chat is the control surface, not the archive.

## Boss rules

- Keep the persistent Main Boss as coordinator, but do not load full worker histories repeatedly.
- At phase start, completion, correction and promotion, read only the latest substantive receipt plus exact files it references.
- Use compact state cards: authority/hash, owner/scope, outcome, evidence paths, blocker and exactly one next action.
- Do not paste large source files, manifests, screenshots, test logs or research extracts into chat. Store them locally and cite path/hash/short finding.
- Do not repeat unchanged context in every worker prompt. Supply the exact packet, authority path/hash, writable paths, acceptance checks and stop conditions.
- Prefer bounded queries (`rg`, exact files, targeted checks) over broad repository or conversation scans.
- Use hashes to avoid rerunning checks or rereading evidence when inputs are unchanged.
- Keep heartbeat turns short. If a worker is active, observe only at a permitted phase gate; do not create another prompt merely to show activity.
- Route deterministic work to Low/Fast, bounded implementation to one Medium worker, independent review to High and real conflicts only to the strongest model.

## Worker rules

- One packet, one objective and one writable cluster per worker phase.
- A worker returns a compact receipt and releases ownership before a new objective.
- A worker must not carry the whole project conversation; read the current local packet and only the named authority/evidence files.
- Save visual evidence, logs, contact sheets and research synthesis to admitted local paths; chat returns only summaries and links.
- Do not ask Nate questions whose answers are already in current authority or can be verified locally.
- If a decision blocks one item, record it and continue another admitted disjoint item rather than filling context with repeated explanations.

## Capacity and compaction gate

Before a thread becomes difficult to operate, or immediately after automatic compaction, the current owner must:

1. stop at the nearest reversible phase boundary;
2. verify current files, hashes, lock and checkpoint;
3. write/update the durable packet or receipt with done/current/blocked/next;
4. record exact evidence paths and the one next command;
5. continue from that file rather than reconstructing state from memory.

If the app exposes a low remaining-context/session signal, treat roughly the final quarter as handoff territory. Do not start a large new phase there. Finish/hold the current bounded phase, write its receipt and route the next phase to a fresh bounded worker if needed while Main retains coordination.

## Tool and session limits

- Treat task titles and UI status as hints only; use immutable thread IDs and current receipts.
- Keep thread reads to the smallest recent page needed; do not scan every historical turn unless resolving a specific conflict.
- Do not continuously poll. Use event waits or heartbeat cadence and check only at permitted gates.
- Reuse an existing correct worker instead of creating duplicates.
- Maximum concurrency remains one mutating worker per cluster and up to three disjoint read-only lanes.
- Close or finalize unneeded browser tabs only when doing so cannot discard human review state; otherwise reuse a small set of named tabs.
- Do not retain large binary/base64 output in chat context. Store files locally and inspect them by path.

## Recovery from context/session loss

- Never treat a side chat as authority.
- On missing UI, `notLoaded`, compaction, restart or new session, resume from the latest SHA-verified project-local authority, packet, receipt, checkpoint and manifest.
- Do not infer deletion, completion or failure from a missing panel or stale title.
- Missing current evidence is HOLD, but other disjoint work may continue.
- Do not create a replacement coordinator. If a worker is inaccessible, use its durable packet/receipt and immutable ID or wait for Main to rebind it safely.

## Morning receipt

The morning Boss check must summarize rather than replay the night: current frozen candidate, changed/untouched files, final hashes, checkpoints/rollback, QA/security/Shopify/client-review preparation outcomes, active/held/released owners, unresolved Nate/client gates and exactly one recommended next action.
