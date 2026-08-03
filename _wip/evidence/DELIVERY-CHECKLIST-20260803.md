# MapleMoon delivery checklist — 2026-08-03

**Supersedes** `DELIVERY-GAP-LIST-20260803.md` (keep it for the CR-gate finding, restated in F1).
**Scope:** what is missing, wrong, or unverified on the build Carli is actually looking at —
`_wip/deploy/site-full/`, served at `https://maplemoon-preview-carli.vercel.app`.

## Method, and its limits

Lines marked `checked` were tested by grepping a distinctive phrase against the six built HTML
files in `_wip/deploy/site-full/`. Reliable for long unique phrases, weak for short common ones —
lines flagged **(eyes)** matched a short string and need a human look rather than being trusted.

Counts in section A are **occurrences** (`grep -o | wc -l`), measured per file, not line counts.

The Canva register (`docs/orchestration/reviews/CARLI-CANVA-NOTE-REGISTER-20260731.md`) tracks
delivery into the frozen `clean/` package, **not** into `site-full`. Its "14 / 68 delivered" is
therefore an undercount for the preview. Measured here: **21 of 32 quotable notes are already
live**.

**Attribution caveat:** the prohibitions in section A come from reconciliation rule 1 of that
register, whose header reads `Owner: Codex`. It records Carli's later corrections as prohibiting
this wording. It is the register's summary, not a quote from her — worth knowing before repeating
it back to her on a call.

---

## A. Prohibited claims live on the preview — 37 occurrences

**The priority.** Not gaps: statements currently in front of the client that the register records
as prohibited. Rule 1 — *do not say `slow-roasted carob`, `smooth carob`, that Maple Moon **mills**
carob, or that products are `handmade` in `small batches`.* Note `slow-roasted` and `milled` are
two separate prohibitions and they do not always co-occur.

Measured in `_wip/deploy/site-full/`. The WIP source carries the **identical** counts in the six
canonical pages, so both copies need the same fix:

| phrase | total | carob-story | our-story | faq | shop | homepage |
|---|---|---|---|---|---|---|
| `slow-roasted` | 13 | 7 | 3 | 3 | – | – |
| `milled` | 11 | 7 | 1 | 2 | 1 | – |
| `mills` | 1 | – | – | 1 | – | – |
| `small batch` | 9 | 2 | 5 | 1 | – | 1 |
| `handmade` | 2 | – | 1 | – | – | 1 |
| `smooth carob` | 1 | – | – | – | 1 | – |

- [ ] **A1. The "slow-roasted and milled" sentence.** Live text: *"Maple Moon uses Australian-grown
      carob, slow-roasted and milled with cacao butter on the NSW far north coast."* Asserts Maple
      Moon mills its own carob.
- [ ] **A2. `small batch` ×9**, including *"Every bar is made in small batches from
      Australian-grown carob."*
- [ ] **A3. `handmade` ×2.**
- [ ] **A4. `smooth carob` ×1** in `shop.html` — also the conflict that blocks CV-014.
- [ ] **A5. The meta description repeats it** — *"Carli and Dylan make carob bars in small batches
      from Australian-grown carob, milled with cacao butter…"* — so this is the link-preview text
      wherever the URL is shared. Note it matches on `milled` and `small batch` **without**
      `slow-roasted`; fixing only the A1 sentence leaves it standing.

**Fix targets — both copies, or the next rebuild reverts it** (README line 198, the trap that
already bit stockists):
1. `_wip/carob-story.WIP.html`, `our-story.WIP.html`, `faq.WIP.html`, `shop.WIP.html`,
   `homepage_real_1_lead_photo.WIP.html`
2. the matching files in `_wip/deploy/site-full/`

Do **not** sweep `_wip/*.rollback-*.html` or the `_hero_*`/`_ratio_preview`/`_MORNING_CHECKLIST`
scratch files — they carry more hits but ship nowhere.

A1–A5 is one coordinated copy pass, not five. It needs Nate's factual answer first: **who roasts,
who mills, and where.** Owner: **Nate decides the true wording, Codex applies it to both copies.**

## B. Unverified factual claims that went live anyway

Marked `needs-fact-check` in the register, but present on the preview.

- [ ] **B1. CV-046 / CV-063 — supplier named.** "Australian Carob Co" and "South Australia" are on
      the page; the register says Canva "is not sufficient supplier proof". Owner: **Carli/Dylan.**
- [ ] **B2. CV-059 — "Brunswick Heads, Byron Shire NSW"** live on the FAQ; needs business-location
      confirmation. Owner: **Carli/Dylan.**
- [ ] **B3. CV-052 — cacao butter process claim.** `cacao butter` appears **(eyes)** — confirm
      whether it is a plain ingredient mention or the unverified tempering claim.

## C. Canva notes still not on the page — checked

- [ ] **C1. CV-014** Goji Eclipse Bites description — blocked by its own "smooth carob" wording (A4).
- [ ] **C2. CV-015** Pecan Eclipse Bite description. `needs-fact-check`.
- [ ] **C3. CV-020** Carob powder flavour notes. `needs-fact-check`.
- [ ] **C4. CV-022 / CV-023 / CV-024** Cacao side of the comparison. `needs-fact-check`.
- [ ] **C5. CV-019** Carob definition copy. `needs-fact-check`.
- [ ] **C6. CV-029** Ritual intro — held on the "sugar crash" claim.
- [ ] **C7. CV-033** Ritual night: "Full Moon Rituals, a bar, a bite and a journal."
- [ ] **C8. CV-037** Range CTA — held pending shipping-policy check.
- [ ] **C9. CV-047** Comparison intro. `needs-fact-check`.
- [ ] **C10. CV-053** Process step 04: "our maple moon signature carob." `ready-copy-review`.
- [ ] **C11. CV-054** Range transition — held pending product-support check.
- [ ] **C12. CV-056** FAQ "Is there any caffeine?" replacement. Blocked — and the old question was
      already removed, so the FAQ is currently one entry short.
- [ ] **C13. CV-058** FAQ "Is there Maple in it?" `needs-fact-check`.
- [ ] **C14. CV-061 / CV-062 / CV-064** FAQ cacao-butter caffeine, tempering, storage. `needs-fact-check`.
- [ ] **C15. CV-051 is half-applied.** The register says use `roasted for depth` **and remove
      `slow`**. The replacement landed; the removal did not — the live process step reads
      *"The roast / Slow-roasted for depth."* Already-approved direction, no client input needed.

**Deliverable tonight with no client input: C10 and C15.** Everything else in C waits on B.

## D. Missing assets

- [ ] **D1. Open Graph images — 4 referenced, 0 exist.** `assets/social/og-homepage.jpg`,
      `og-our-story.jpg`, `og-carob-story.jpg`, `og-stockists.jpg`. `assets/social/` is absent from
      the build, so every share of the link renders imageless. Candidates already generated at
      `_wip/evidence/IMAGERY-PROGRAMME-20260802/og_image_candidates_20260803_v1/`.
      Owner: **Nate picks, Codex places.**
- [ ] **D2. CV-032** Afternoon ritual wants elixir imagery, not tea. `needs-asset`.
- [ ] **D3. CV-040** Product photography for Eclipse Bites, Moons and Bananas without packaging.
      Active writer at `assets/product_shots/w1-e-prepared-20260803/` — do not race it.
- [ ] **D4. CV-030** Confirm whether the ritual pictures are changing at all. `needs-Nate`.

## E. Blocked on catalogue truth

Nothing here closes without a fresh WooCommerce export and an approved retail catalogue
(register rule 4).

- [ ] **E1. CV-039** Apply new product descriptions across catalogue cards.
- [ ] **E2. CV-042** Restore original site copy for description, ingredients, further information.
- [ ] **E3. CV-013** Match flavour order between Bars and Moons.
- [ ] **E4. CV-041** Answer Carli's question: how long to add all pictures and descriptions.

## F. Structure, QA and hygiene

- [ ] **F1. The two builds trade off against each other, and nobody priced the trade.**
      `staging-v1/clean/` contains **zero** occurrences of all six phrases in section A — the
      stripping removed exactly these unverified claims, which is what it exists to do. `site-full/`
      restores the missing ~630 words *and* all 37 prohibited occurrences with them. So:
      `clean/` = claim-safe but content-stripped (Carli's complaint); `site-full/` = complete but
      claim-unsafe (section A). Deploying `site-full/` answered her complaint and silently took on
      the claim risk. Meanwhile `READINESS-DEPENDENCY-ROADMAP-20260802.md` writes CR-0…CR-4 against
      `clean/`, so the gates certify the artifact nobody is looking at. Owner: **Codex proposes a §9
      packet** to repoint or retire the gates. Do not edit the frozen tree. **Closing section A is
      what makes `site-full/` gate-able** — until then neither build is both complete and safe.
- [ ] **F2. `carob-story` comparison table stacks badly at 390px** — content in a ~130px column,
      feature labels between the values they describe. Not an overflow. Design decision.
- [ ] **F3. Working tree dirty across a handoff** — 12 modified product shots plus untracked
      `_wip/deploy/site/` and `site-full/`. `site-full/` is deliberately untracked; the product
      shots belong to an active writer. Owner: **Codex, explicit paths only.**
- [ ] **F4. Founder bios not yet deployed.** Built and committed (`76a626d`), held for Nate's local
      review. Carli crop v01 vs v02 still unpicked.
- [ ] **F5. 390px pass on the new founder cards** not yet run.

## Done this session — verified, not asserted

- [x] **Carli's preview URL serves the full build.** All six pages 200; `grep -c 'Why not'` on
      `/homepage` = 1 (stripped build returns 0); Carli's shop copy live.
- [x] **Carli's and Dylan's bios added** to `#founders` as expandable cards with portraits,
      verbatim, signature blocks stripped (her mobile number was in the source email and must not
      ship). Applied to the WIP source *and* the `site-full` copy. Commit `76a626d`.
- [x] **All placeholder copy gone from the six pages.** Fixed-string sweep for "coming soon",
      "to come", "content pending", "placeholder", "TBC", "lorem", "TODO", "FIXME" returns zero.
- [x] **21 of 32 quotable Canva notes confirmed live** on the preview — more than the register credits.
- [x] **Section A counts measured per file** across `site-full/`, the WIP source and `clean/`.

## Suggested order before the call

1. **A1–A5.** One factual answer from Nate (who roasts, who mills, where), then one copy pass
   across both file copies. The only items that are actively wrong rather than merely absent.
2. **B1–B3.** Same conversation — supplier, origin, location. Unlocks most of C.
3. **C15**, then **C10** — both already approved, no client input needed.
4. **D1.** OG images; cheap, and every shared link is currently imageless.
5. **F1.** Codex repoints the gates once A is closed. Then F3, F5.
