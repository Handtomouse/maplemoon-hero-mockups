# MapleMoon side-chat receipt gate

This is the low-token control loop for a side-chat manager. It replaces repeated prose updates with three deterministic gates and one compact worker receipt.

## Rule

One side-chat manager supervises one named worker. Every new packet and receipt must include the exact `worker_thread_id`, and the two values must match. A manager never guesses the worker from task titles and never continuously polls it.

The manager checks only at phase start, completion, correction and promotion. It replies to the worker only when the deterministic gate returns `HOLD` or `FAIL`.

## Worker sequence

1. Create a timestamped, non-overwriting recovery checkpoint for the exact writable scope.
2. Ask the gate to verify phase start.
3. Perform the admitted work and self-check it.
4. Write one `maplemoon-receipt/v2` JSON file or Markdown control block.
5. Ask the gate to verify completion, then promotion if applicable.

```sh
# Before the first write
python3 -B scripts/check-maplemoon-receipt.py checkpoint \
  --packet docs/orchestration/packets/EXACT-PACKET.md \
  --destination _wip/checkpoints/EXACT-PACKET_YYYYMMDD_HHMMSS_AEST

python3 -B scripts/check-maplemoon-receipt.py verify \
  --packet docs/orchestration/packets/EXACT-PACKET.md \
  --checkpoint _wip/checkpoints/EXACT-PACKET_YYYYMMDD_HHMMSS_AEST \
  --phase start

# After work
python3 -B scripts/check-maplemoon-receipt.py verify \
  --packet docs/orchestration/packets/EXACT-PACKET.md \
  --receipt docs/orchestration/reviews/EXACT-RECEIPT.json \
  --checkpoint _wip/checkpoints/EXACT-PACKET_YYYYMMDD_HHMMSS_AEST \
  --phase complete
```

Use `--phase promote` for a packet whose final state would otherwise be promoted. Packets that need rendered evidence must set `"requires_visual_evidence": true`; promotion then holds unless the receipt has a screenshot path or review URL.

## Verdicts

- `PASS`: exact scope, checkpoint, pre/post hashes and successful checks agree.
- `HOLD`: evidence, recovery, hashes, rendered evidence or authority is missing. The manager returns one compact correction request.
- `FAIL`: changed path is outside scope, a receipt reports forbidden changes, or a required check fails.

No verdict promotes a packet by itself. Human decisions, source evidence, catalogue gates and external actions remain separate gates.

Historical packets without `worker_thread_id` are evidence, not admission-ready work. Wrap or supersede them before a new mutating phase.

## Compact side-chat manager reply

```text
[PASS/HOLD/FAIL]
- Outcome: …
- Evidence: receipt + gate output
- Confidence: high/medium/low
- Files: changed paths only
- Checks: pass/fail summary
- Backup: checkpoint path
- Blocker or approval: one item
- Next action: one item
- Ready to promote: yes/no
```

The manager should not re-summarise the project, wake workers for housekeeping, or run browser/agent work merely to produce an update.
