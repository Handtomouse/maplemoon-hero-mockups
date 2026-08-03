# MapleMoon delivery checklist — 2026-08-03

**Supersedes** `DELIVERY-GAP-LIST-20260803.md` (keep that for the structural CR-gate finding).
**Scope:** what is missing, wrong, or unverified on the build Carli is actually looking at —
`_wip/deploy/site-full/`, served at `https://maplemoon-preview-carli.vercel.app`.

## Method, and its limits

Every line below marked `checked` was tested by grepping a distinctive phrase against the six
built HTML files in `_wip/deploy/site-full/`. That is reliable for long unique phrases and weak
for short common ones — lines flagged **(eyes)** matched a short string and need a human look
rather than being trusted.

The Canva register (`docs/orchestration/reviews/CARLI-CANVA-NOTE-REGISTER-20260731.md`) tracks
delivery into the frozen `clean/` package, **not** into `site-full`. Its "14 / 68 delivered" is
therefore an undercount for the preview. Measured here: **21 of 32 quotable notes are already
live**, not the 12 the last commit claimed.

---

## A. Claims on the live page that Carli told us to stop making

**This is the priority.** These are not gaps — they are statements currently in front of the
client that contradict her own corrections. Reconciliation rule 1 of the register: *do not say
`slow-roasted carob`, `smooth carob`, that Maple Moon **mills** carob, or that products are
`handmade` in `small batches`.*

- [ ] **A1. "slow-roasted and milled" sentence — 5 occurrences.** Live text: *"Maple Moon uses
      Australian-grown carob, slow-roasted and milled with cacao butter on the NSW far north
      coast."* Claims Maple Moon mills its own carob. `our-story.html` ×3, `carob-story.html` ×7,
      `faq.html` ×3 contain `slow-roasted`. Owner: **Nate confirms the true process, then Codex
      rewrites every occurrence.**
- [ ] **A2. "small batches" — 9 occurrences.** `our-story.html` ×5, `carob-story.html` ×2,
      `faq.html` ×1, `homepage.html` ×1. Includes *"Every bar is made in small batches from
      Australian-grown carob."*
- [ ] **A3. "handmade" — 2 occurrences.** `our-story.html`, `homepage.html`.
- [ ] **A4. "smooth carob" — 1 occurrence in `shop.html`.** Explicitly prohibited, and the
      register flags it as the conflict that blocks CV-014.
- [ ] **A5. The meta description repeats it.** *"Carli and Dylan make carob bars in small batches
      from Australian-grown carob, milled with cacao butter…"* — so this wording is also the
      link-preview text wherever the URL is shared.

Fixing A1–A5 is one coordinated copy pass, not five. It needs Nate's factual answer first:
**who roasts, who mills, and where.**

## B. Unverified factual claims that went live anyway

Marked `needs-fact-check` in the register, but present on the preview.

- [ ] **B1. CV-046 / CV-063 — supplier named.** "Australian Carob Co" and "South Australia" are
      on the page. The register says Canva "is not sufficient supplier proof". Owner: **Carli/Dylan
      confirm supplier and origin.**
- [ ] **B2. CV-059 — "Brunswick Heads, Byron Shire NSW"** is live on the FAQ; register wants
      business-location confirmation. Owner: **Carli/Dylan.**
- [ ] **B3. CV-052 — cacao butter process claim.** `cacao butter` appears on the build **(eyes)** —
      confirm whether it is a plain ingredient mention or the unverified tempering claim.

## C. Canva notes still not on the page — checked

- [ ] **C1. CV-014** Goji Eclipse Bites description. Blocked: its wording uses "smooth carob" (see A4).
- [ ] **C2. CV-015** Pecan Eclipse Bite description. `needs-fact-check`.
- [ ] **C3. CV-020** Carob powder flavour notes ("roasted caramel, malt and toasted nuts"). `needs-fact-check`.
- [ ] **C4. CV-022 / CV-023 / CV-024** Cacao side of the comparison — sweetness, caffeine/theobromine, "stimulating and activating". `needs-fact-check`.
- [ ] **C5. CV-019** Carob definition copy. `needs-fact-check`.
- [ ] **C6. CV-029** Ritual intro — held on the "sugar crash" claim.
- [ ] **C7. CV-033** Ritual night: "Full Moon Rituals, a bar, a bite and a journal." Held pending product-reference check.
- [ ] **C8. CV-037** Range CTA: "Every flavour, right to your door…" Held pending shipping-policy check.
- [ ] **C9. CV-047** Comparison intro: "…come from completely different plants." `needs-fact-check`.
- [ ] **C10. CV-053** Process step 04: "our maple moon signature carob." `ready-copy-review` — deliverable now.
- [ ] **C11. CV-054** Range transition: "Explore the range and see what calls you." Held pending product-support check.
- [ ] **C12. CV-056** FAQ "Is there any caffeine?" replacement. Blocked; the old question was already removed, so the FAQ is short one entry.
- [ ] **C13. CV-058** FAQ "Is there Maple in it?" `needs-fact-check` on the product-wide sugar claim.
- [ ] **C14. CV-061 / CV-062 / CV-064** FAQ cacao-butter caffeine, tempering, and storage answers. All `needs-fact-check`.

**Deliverable tonight without any client input: C10 only.** Everything else in C waits on B.

## D. Missing assets

- [ ] **D1. Open Graph images — 4 referenced, 0 exist.** `assets/social/og-homepage.jpg`,
      `og-our-story.jpg`, `og-carob-story.jpg`, `og-stockists.jpg`. `assets/social/` is absent from
      the build entirely, so every social/messaging share of the link renders without an image.
      Candidates already generated at
      `_wip/evidence/IMAGERY-PROGRAMME-20260802/og_image_candidates_20260803_v1/`. Owner: **Nate picks, Codex places.**
- [ ] **D2. CV-032** Afternoon ritual wants elixir imagery, not tea. `needs-asset`.
- [ ] **D3. CV-040** Product photography for Eclipse Bites, Moons and Bananas without packaging.
      `needs-asset` + `needs-catalogue`. Active writer: `assets/product_shots/w1-e-prepared-20260803/` — do not race it.
- [ ] **D4. CV-030** Confirm whether the ritual pictures are changing at all. `needs-Nate`.

## E. Blocked on catalogue truth

Nothing here can be closed without a fresh WooCommerce export and an approved retail catalogue
(register rule 4 — names, images, weights, prices, availability, ingredients, selling options).

- [ ] **E1. CV-039** Apply new product descriptions across catalogue cards.
- [ ] **E2. CV-042** Restore original site copy for description, ingredients, further information.
- [ ] **E3. CV-013** Match flavour order between Bars and Moons.
- [ ] **E4. CV-041** Answer Carli's question: how long to add all pictures and descriptions.

## F. Structure, QA and hygiene

- [ ] **F1. The CR gates point at the wrong artifact.** `READINESS-DEPENDENCY-ROADMAP-20260802.md`
      writes CR-0…CR-4 against `staging-v1/clean/` — the stripped build. Carli sees `site-full/`.
      Running CR-0 as written certifies something no client will view. Owner: **Codex proposes a §9
      packet** to repoint or retire the gates. Do not edit the frozen tree either way.
- [ ] **F2. `carob-story` comparison table stacks badly at 390px** — content in a ~130px column,
      feature labels between the values they describe. Not an overflow. Design decision.
- [ ] **F3. Working tree dirty across a handoff** — 12 modified product shots plus the untracked
      `_wip/deploy/site/` and `site-full/` build dirs. `site-full/` is deliberately untracked; the
      product shots belong to an active writer. Owner: **Codex, explicit paths only.**
- [ ] **F4. Founder bios not yet deployed.** Built and committed (`76a626d`), held for Nate's
      local review. Carli crop v01 vs v02 still unpicked.
- [ ] **F5. 390px pass on the new founder cards** not yet run.

## Done this session — verified, not asserted

- [x] **Carli's preview URL serves the full build.** All six pages 200; `grep -c 'Why not'` on
      `/homepage` = 1 (stripped build returns 0); Carli's shop copy live.
- [x] **Carli's and Dylan's bios added** to `#founders` as expandable cards with portraits,
      verbatim, signature blocks stripped (her mobile number was in the source email and must not
      ship). Applied to the WIP source *and* the `site-full` copy. Commit `76a626d`.
- [x] **All placeholder copy gone from the six pages.** Fixed-string sweep for "coming soon",
      "to come", "content pending", "placeholder", "TBC", "lorem", "TODO", "FIXME" returns zero.
- [x] **21 of 32 quotable Canva notes confirmed live** on the preview — materially more than the
      register credits.

## Suggested order before the call

1. **A1–A5.** Get Nate the one factual answer (who roasts, who mills, where), then one copy pass.
   This is the only item on the list that is actively wrong rather than merely absent.
2. **B1–B3.** Same conversation — supplier, origin, location. Unlocks most of C.
3. **D1.** OG images; cheap, and every shared link is currently imageless.
4. **F1.** Codex repoints the gates before more QA is spent on the wrong build.
5. **C10**, then F3, F5. Everything else waits on client input.
