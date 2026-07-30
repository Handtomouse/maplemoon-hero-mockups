# MapleMoon Website Orchestrator Design

## Purpose

Create a local-only control room for the six MapleMoon WIP pages and the 7pm Carli review. It separates presentation-ready material from internal blockers and preserves the existing WIP workflow.

## Design

The orchestrator is a static HTML page based on the existing meeting index visual language. It contains a clear tonight route, six page cards, a meeting agenda, direct links to existing review evidence, an internal workboard, a partial comms-check note, pending client inputs, and a desktop/mobile checklist.

The page does not connect to external services, deploy, send messages, edit Shopify, replace assets, or infer missing facts. Existing named WIP files remain canonical.

## Verification

Validate HTML parsing, local links, diff whitespace, 390px layout, 1440px layout, and preservation of the dirty checkout. Page-local polish remains limited to evidence-backed, unblocked work.
