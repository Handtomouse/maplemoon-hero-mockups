# MapleMoon Sleep Comms Monitor Authority

**Authorized by Nate:** 2026-08-02 01:26 AEST  
**Coordinator:** `019fa858-05c9-7631-b26e-8f5cbbf1387a`  
**Relationship:** Additive monitoring and acknowledgement authority only. It does not change the frozen overnight handoff or broaden website, commerce, production, deployment, or client-approval authority.

## Schedule

- From 06:00 AEST while Nate is asleep, reconcile MapleMoon communications no more than once per hour.
- Use the existing Main Boss heartbeat. A heartbeat occurring between hourly checks must not repeat the comms work.
- Stop automatic monitoring after the configured overnight heartbeat ends or when Nate resumes control, whichever happens first.

## Scope

- Carli, Dylan, and the verified MapleMoon client/group conversations only.
- Reconcile Gmail, iMessage, and WhatsApp using `comms-check`.
- For each genuinely new substantive inbound, use `comms-search` with a literal phrase from that message and MapleMoon scope to recover only the directly relevant context.
- Do not infer silence when a channel is partial or unavailable. Rerun the scoped check once; if identity, channel, or thread remains uncertain, HOLD and do not send.

## New-message and deduplication gate

- Only messages received after `2026-08-02T01:26:07+10:00` are eligible.
- Read prior non-overwriting monitor receipts before replying.
- Reply at most once per inbound message ID/thread event.
- Ignore reactions, emoji, thanks-only acknowledgements, automated notices, duplicates, and replies that merely acknowledge this monitor.
- Never create an acknowledgement loop.

## Pre-authorized reply

Reply only in the same verified channel/conversation. Be transparent that the sender is Nate's Codex assistant, not Nate. Adapt only the recipient name, channel-appropriate punctuation, and one short progress sentence grounded in the latest verified Boss receipt:

> Hey! This is Nate's Codex assistant. Nate is asleep at the moment (very needed) and set me up to keep an eye on MapleMoon messages. I've received and logged your message. [One plain verified progress sentence.] Please keep sending through any feedback, notes, links or files. I'll safely ingest and work on anything that doesn't conflict with the current build, and queue anything needing Nate's decision for when he wakes. He'll pick everything up properly in the morning. x

This authority covers only that acknowledgement and verified progress sentence. Do not answer substantive questions, make commitments, quote delivery times, request credentials, approve copy/products, or disclose internal technical detail.

## Absolute site-sharing hold

- Do not send or expose any MapleMoon website URL, localhost URL, Vercel URL, preview link, review hub, access instructions, passcode, screenshot, screen recording, attachment, package, download, QR code, or forwarded site material while Nate is asleep.
- Do not tell Carli, Dylan, the MapleMoon group, family, friends, testers, or anyone else that the site is ready to view.
- Do not prepare an outbound message containing a site link for automatic sending.
- Site sharing requires a new, explicit approval from Nate after he is awake and has reviewed the exact frozen artifact, audience, channel, wording, access route, and feedback route.
- A client request for the site or a link is a Nate-morning HOLD. Acknowledge receipt only using the pre-authorized reply above and do not include the requested material.

If same-channel sending is unavailable or recipient/thread identity is uncertain, do not send. Record the exact HOLD for Nate.

## Ingestion route

After acknowledging:

1. Add the new message, file, link, feedback, or decision to Main's evidence/decision intake without copying unnecessary private message text into chat.
2. If it is evidence-safe, local, already authorized, disjoint from active ownership, and needs no Nate/client/external decision, Main may route the smallest bounded packet under the existing recovery, receipt, QA, and independent-review gates.
3. Otherwise record a Nate-morning or client-input HOLD and continue other safe disjoint work.

A client message does not authorize commit, push, deploy, publish, sharing, upload, Shopify, WooCommerce, Vercel, production changes, analytics activation, payment/order processing, or any other external action.

## Durable receipts

Create one compact non-overwriting receipt per hourly run under:

`docs/orchestration/reviews/MAPLEMOON-SLEEP-COMMS-20260802/`

Each receipt records only:

- AEST run time;
- channels checked and any partial/errors;
- new inbound IDs, sender, channel, and timestamp;
- classification;
- acknowledgement status and outbound ID;
- short ingested finding;
- route: safe local work or Nate-morning HOLD;
- exactly one next action.

Do not store full private message bodies. If there is no new substantive inbound, create/return a minimal no-change receipt and message nobody.
