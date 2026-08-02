# CLOSURE DECISION — supersedes CLOSURE-SCOPE-CORRECTION-20260802.md
# Written: 2026-08-02 · macbook Claude Code (worker)
# STATUS: records Nate's decision. Passes no gate, builds nothing, promotes nothing.

## The decision

**Nate has ruled: retain all copy on the clean homepage. Cut nothing.**

Stated grounds, in his words: the carob **is** Australian; official certifications will be
obtained afterwards; there is roughly a week before the site needs to be Shopify-ready, and
that is the window in which the paperwork gets done.

This **supersedes** `CLOSURE-SCOPE-CORRECTION-20260802.md` (commit `ced507d`), which proposed
cutting 8 items. That document is superseded in full, not amended. Nothing is cut.

## What this means for SAT-HOME-CLEAN-CLOSURE-01

If nothing is cut, the closure candidate has no remaining scope. The clean homepage stays
byte-identical to the current frozen artifact.

**Consequences, which are almost entirely favourable:**

- **No rebuild.** `staging-v1/` stays at `clean/MANIFEST.json` = `d1c66b1d…`,
  `annotated/MANIFEST.json` = `3be3c0f2…`.
- **No evidence re-run.** The keyboard traversal (5 pages, literal 390 CSS px, commit
  `9ead886`) and the 200% zoom pre-screen (6 pages, commit `fe3c580`) are bound to those
  hashes and remain valid.
- **The in-flight iMac run was aimed correctly after all.** It is proving `homepage` at 390
  against the current frozen homepage, which is now confirmed as the shipping artifact. On
  return it completes the six-page keyboard record.
- **CR-0 can proceed immediately** against the existing frozen package. Nate's editorial pass
  is spent once, not twice.

## The one loose end this creates — for Codex

`scripts/check-maplemoon-review.py` carries ~157 uncommitted lines and pins
`SATURDAY_PACKET_ID = "SAT-HOME-CLEAN-CLOSURE-01"`. It was advanced *ahead of* a rebuild that
is now not happening. It therefore fails against the package we intend to ship:

    26 failures — 23 homepage.html, 3 MANIFEST-level
    (1 aggregate MANIFEST contract mismatch, 2 packet-ID mismatches)

This is a **checker** problem, not an artifact problem. The artifact is intact and
hash-verified. But a failing deterministic QA gate is not something to carry into a client
send, so it needs resolving by whoever owns the checker.

**Codex decision required:** revert the checker to the pre-closure contract, or re-pin it to
the current frozen package. Not a worker decision, and not to be done from this lane.

## Claims status — record this accurately

The retained copy asserts Australian origin and organic status:

- `<title>` — `Maple Moon: Australian Organic Carob`
- hero eyebrow — `Australian organic carob`
- `Australian-grown carob pods.`, `The far north coast`, `grows in the warm Australian sun`,
  `Sun-ripened, naturally sweet pulp.`

**These are retained on Nate's instruction and are NOT yet substantiated.** The Carli note
register flags remain open and unresolved:

- **CV-046** — supplier, geography, process and ingredient claims require authority
- **CV-063** — a Canva document with spelling errors is not sufficient supplier proof

**Do not let any downstream record describe this copy as verified.** It is retained pending
certification, which is a different state.

### Why this is defensible for the review send, and where it stops being so

The artifact is a **client review package addressed to Carli and Dylan**, who are the
authority on their own supply chain. Putting the claims in front of them lets them confirm or
correct; removing them would strip out the very thing they need to rule on.

**That reasoning does not extend past the review.** Origin and organic claims are regulated
in Australia, and "organic" in particular depends on certification held by a certified
operator. Before any public launch — the Shopify work Nate references — the certification
must actually exist, or the claim must come out of the title, the hero and the body copy.

**Recommendation:** make provenance an explicit question in the send message rather than a
silent assumption. It costs one sentence, converts an exposure into a review question, and
gets CV-046 and CV-063 closed by the only people who can close them.

## Unruled items — now moot

`CLOSURE-SCOPE-CORRECTION-20260802.md` recorded two unruled items:

- `Deep, smooth and naturally sweet. Made with just real ingredients.`
- `Carob Bars: Smooth, naturally sweet bites for calm cravings.`

Nate ruled A, keeping both, and has now ruled to retain everything. Both stay. No open
question remains on the clean homepage copy.

## Resulting critical path

1. **CR-0** — Nate, on the existing frozen package. Unblocked now.
2. **Codex** — resolve the checker contract; withdraw or re-scope the closure packet.
3. **iMac** — returns homepage 390 keyboard evidence, completing the six-page record.
4. **CR-1 → CR-4** — audience, hub, metadata, send.
