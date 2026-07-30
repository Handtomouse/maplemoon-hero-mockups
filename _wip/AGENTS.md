# MapleMoon Website — Codex Handoff
## Section-by-Section Review Loop | Updated 2026-07-24 (post-meeting + pricing pass)

## What you're doing
Working through the MapleMoon `_wip` website page by page, integrating Carli's content brief into each section and presenting before/after to Nate for approval. One section at a time. Nate says keep / tweak / next.

## Current focus (2026-07-24)
The 20 Jul meeting is done. All 6 pages are "ready for review" per `_CLAUDE_HANDOFF_20260723_POST_MEETING.md` + `_LIVE_TRACKER_20260723.md`. Active task: apply `_PRICING_EDIT_SPEC_20260724.md` (homepage price-strip + shop unhide moons/bananas). Read that spec + the handoff before editing.

## Content source
ALL copy for the website is in:
`~/UFC/ops/handoffs/handoff_20260719_mm_carli_doc_content.md`

Read this first. It contains: bar pricing, product descriptions, homepage copy (headlines, CTAs, section copy), full Our Story, Why Carob bullets, and the complete stockists list (50+ retailers).

## Pages + order
1. `homepage_real_1_lead_photo.WIP.html` — 12 sections to clear (Hero already done)
2. `shop.WIP.html`
3. `our-story.WIP.html`
4. `stockists.WIP.html`

Section tracker: `_SECTION_TRACKER.html` — see the JS `D` object for the full section list per page.

## Loop protocol
For each section:
1. Read the current HTML for that section
2. Identify what Carli's Doc says should go there
3. Show Nate: what's there now (one line) + what you'd change (the new copy/layout)
4. Wait for Nate to say **keep** / **tweak [instruction]** / **next**
5. Apply the change, mark section cleared in your notes, move to the next

Do not batch sections without approval. One at a time.

## Hard rules
- **No em dashes** anywhere in copy. Use commas, colons, or line breaks instead.
- **No deploy** without Nate's explicit ok. All edits stay in `_wip`.
- **No fabricated content.** If something isn't in Carli's Doc, flag it as content-pending.
- **Integrate Carli's copy faithfully** — don't rewrite or improve it; place it as written.
- **Reviews block**: no testimonials in the Doc yet. Build the styled block, leave a `[customer quotes — coming from Carli]` note, mark as content-pending not cleared.
- Do NOT message Carli or Dylan.
- Do NOT edit the base file `homepage_real_1_lead_photo.html` — work on `.WIP.html` copies only.

## Local HTML preview
- Do not run `open`, `open -a Google Chrome`, or spawn external Chrome tabs for routine local HTML previews.
- Serve the repo locally when needed and inspect pages with Codex's in-app Browser, or give Nate the localhost/file URL inside the task.
- Use external Chrome only when Nate needs to do something in Chrome, explicitly asks for Chrome, or there is a concrete reason such as real-browser QA, profile-specific auth, extension behavior, or tooling that cannot run inside the in-app Browser.

## Current state (2026-07-24)
All 6 pages (homepage, shop, our-story, carob-story, faq, stockists) are "ready for review" per the 23 Jul handoff + live tracker + review pack. Homepage section loop from 19 Jul is superseded. Open items are client dependencies (testimonials, founder assets, verified stockist data, shipping/policy copy) and the pricing spec above.

## Key brand notes
- MM voice: warm, slow-living, organic, premium but not corporate
- Type: p22-mackinac-pro (serif display) + whatever sans is in the WIP
- Colours: cream background, dark ink, moon gold accents
- Never use pure black or pure grey
- Tone of copy: Carli wrote it — keep it exactly as she wrote it

## When done with each page
Save a checkpoint and let Nate know the page is complete. Then move to the next.

## How to start
Say: "Picking up the homepage loop. Sections 1-6 already cleared. Here's section 7 — When do you moon (Ritual Moment):" then show current vs proposed.
