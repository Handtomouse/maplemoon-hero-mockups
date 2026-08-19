# Native-200 attempt 5

Outcome: **CANDIDATE FAIL — Shop skip activation did not reach its target.**

The native preference proof passed and the homepage passed at effective 390px.
On Shop, the first sequential skip was visible and its target existed, but the
preserved visually-hidden `#catalogue-title` remained outside the viewport after
activation. This is a real failure against the packet's skip-route requirement.

The bounded correction is a generated-R2-only click handler: it preserves each
route's existing href and text, focuses the existing target where possible, and
scrolls it beneath the 70px fixed header. It does not alter customer copy,
route content, layout styling, WIP sources or the pinned R1 builder.
