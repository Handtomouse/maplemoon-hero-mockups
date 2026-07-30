# SPLIT CHECKPOINT - MapleMoon orchestration + website continuation - 2026-07-21

## Why this exists
- Nate split MapleMoon into two lanes:
  - comms and project tracking
  - continued home/shop/about website execution
- Keep the lanes separate so client messages do not interrupt the editing pass, and website edits do not create accidental outbound promises.

## Spawned tasks
- `019f81f3-c707-7360-96ca-a1ef74fe864b` - MapleMoon Orchestrator - Comms + Tracking
- `019f81f3-ca91-7072-a722-d1e7103bab53` - MapleMoon Website Continuation - Home Shop About

## Lane ownership
- Orchestrator owns latest-message checks, reply drafting, blocker tracking, Thursday meeting awareness and concise status summaries.
- Website continuation owns only WIP home/shop/about edits and verification.
- Neither lane should send messages, deploy, push or promote base files without an explicit new instruction.

## Current known state
- Thursday 7pm is confirmed in the MapleMoon iMessage group.
- Nate already sent the Shopify/cPanel email safety reply.
- Comms orchestrator created `_wip/_COMMS_PROJECT_STATUS_20260721.md` and reported no reply needed on the known thread state.
- Website continuation created `_wip/_CHECKPOINT_20260721.md`, tightened homepage story teaser copy, fixed shop desktop overflow from the decorative moonwash layer, and verified home/shop/about smoke checks.
- Website continuation completed after the split: it stopped the local preview/debug processes and reported no deploy, push, promotion or client comms.

## Active files from the split
- `_wip/_COMMS_PROJECT_STATUS_20260721.md`
- `_wip/_CHECKPOINT_20260721.md`
- `_wip/homepage_real_1_lead_photo.WIP.html`
- `_wip/shop.WIP.html`
- `_wip/_SPLIT_CHECKPOINT_20260721.md`

## Blockers still open
- Real testimonials from Carli and Dylan.
- Pricing for moons, bites and bananas.
- Founder photos.
- Instagram and Facebook URLs.
- OG image.
- Stockist logo assets.
- Shopify collaborator access.
- Shopify URL mapping for final stockists routing.

## Next best actions
1. Use `_wip/_CHECKPOINT_20260721.md` as the latest website-edit checkpoint.
2. Before drafting any new MapleMoon message, ask the orchestrator to refresh comms state first.
3. Keep the review scope to home, shop and about unless Nate explicitly expands it.
4. Do not resolve Shopify email/DNS beyond conservative planning until current DNS/mail host details are confirmed.
5. Reconcile `_wip/_CHECKPOINT_20260721.md` and this split checkpoint before closing or archiving the main MapleMoon thread.
