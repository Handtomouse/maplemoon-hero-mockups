# Home + Shop integration — truthful HOLD

The integration candidate completed all four exact CDP cases and all required
interaction, projection, geometry, asset, overflow, runtime, and visual checks.
It remains `HOLD`, not accepted, because the packet explicitly requires required
targets to be at least 44 px.

At Shop 1440, the inherited catalogue controls measure below that threshold:

- seven flavour swatches: `34 x 34` px;
- Grid button: `40.546875 x 34` px;
- List button: `37.53125 x 34` px;
- sort select: `132 x 34` px.

These controls predate this integration and the packet does not authorise their
re-authoring. No source or candidate repair was attempted, and attempt 004 was not
rerun. The authoritative report is
`cdp-attempts/attempt-004/browser-results.json`.

Attempt 004 also cannot serve as a clean visual proof set because its 390 ritual
crop and 390 contact sheet contain the fixed cart drawer over the lower ritual
card. See `HUMAN-VISUAL-REVIEW.md`.

Independent whole-site QA also reports inherited release holds outside this
packet's writable scope: Our Story 390 hero-image bleed probe and missing `main`,
Contact/PDP shared-footer gaps, and existing Shop/FAQ sub-44 controls. None were
edited here.

## Concurrent Home writer breach

After this candidate was sealed, the live Home source moved from the integration
hash `77142fb603eb3caeb673ecb1fe55cfbd42fe3251701e668e2fd6208082b192e1`
to `57bfa7b17fcb4c5f872de2babb1d016d435f4fd292275bb987fe4465b1484ad6`.
The candidate itself remained byte-stable at directory SHA-256
`0f733228075cd871fd5972c60ac5d208a63124d5c5ffd63e21cfbe518cb908e4`.

Read-only reconstruction and Claude JSONL evidence identify the external writer
as session `1fc505ef-9769-4ff7-ad04-5a047ecb5a50`. It added range-button CSS at
20:22:56, 20:23:49 and 20:24:53 AEST; changed the range-to-carob gradient at
20:29:02; and added hotspot-card overrides at 20:29:56 and 20:30:10. The exact
Claude process was stopped and the live Home bytes were preserved, not reverted.
This is a packet stop-condition breach and prevents close-pin certification.
