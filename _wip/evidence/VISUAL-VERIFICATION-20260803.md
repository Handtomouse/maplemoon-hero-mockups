# Visual verification — what is actually on screen
# Written: 2026-08-03 · macbook Claude Code (worker)
# STATUS: OBSERVATION ONLY. Records no verdict. Passes no gate.
#         Nothing fixed, edited or promoted. CR-0..CR-4 remain Nate's alone.
# Method: direct inspection of Codex's immutable full-page captures at
#         _wip/reviews/canva-full-page-captures-20260803/canva-ready-v2/
#         Bound to clean/MANIFEST.json = d1c66b1d… (verified).

Three captures inspected: `01-homepage--desktop-1440`, `02-shop--desktop-1440`,
`05-stockists--tablet-834`. This corrects two findings I previously published on static
grounds, and confirms the most serious claim in the whole review.

---

## 1. VIS-001 — CONFIRMED on every capture inspected, and it is the first thing you see

Unstyled text bleeds above the composed header on all three pages. **The exact artifact
differs by page**, which is why the earlier descriptions disagreed:

| capture | what is actually rendered, top-left |
|---|---|
| homepage 1440 | `Skip to main content` — blue, underlined, unstyled. Repeated again at page **foot**. |
| shop 1440 | `ShopOur StoryWhat is CarobStockistsFAQ` — concatenated, unstyled |
| stockists 834 | **both** — `Skip to main content` at the very top, **and** `ShopOur StoryWhat is CarobStockistsFAQ` below it |

Codex's description ("a concatenated secondary navigation string") is right for shop and
stockists and wrong for homepage, where the artifact is the skip link. Both are the same class
of defect: **review-build tooling rendering as raw unstyled text in the clean package.**

Cross-page audit #41 identifies the mechanism — `.mm-review-skip` is injected by the
review-build tooling, not authored in the page. `mock-cart.js` carries a `hideInClean()` helper
that is supposed to suppress review-mode furniture unless `?review=1`. **It is not suppressing
these.** The captures are of `clean/` with no query string, and the artifacts are visible.

> **It does not matter that these are "tooling" rather than design.** They are in the artifact
> being sent. Carli and Dylan will see raw unstyled text at the top of every page.

**Note the header itself is fine at 1440** — `SHOP · OUR STORY · WHAT IS CAROB · maple moon ·
STOCKISTS · AUD $ · FAQ · cart` renders correctly and looks composed. The injected nav
*works*; it is the duplicate unstyled copy that leaks.

**At 834 the nav has not collapsed** — the header shows only the wordmark and cart, and the
five links have fallen out as raw text. That is the substance of homepage audit #2/#3, now
visually confirmed.

---

## 2. IMG-001 — CONFIRMED, and understated. Shop cannot be sent.

At desktop 1440, `shop.html` renders **more than half its catalogue with no product imagery
at all** — not degraded, not low-quality: empty white panes.

| section | state |
|---|---|
| **Bars** row 1 | ✅ three product shots (Pure Carob, Peppermint & Buckwheat, Roasted Hazelnut) |
| **Bars** row 2 | ❌ **blank** — Coconut & Goji, Cayenne Chilli, Almond & Celtic Salt |
| **Moons** | ❌ **all six blank** — every card, no imagery whatsoever |
| **Bites & Eclipses** row 1 | ✅ three polished chocolate shots |
| **Bites & Eclipses** row 2 | ⚠️ present but visibly **off-style** — reads as raw/unretouched next to row 1, notably the Salted Caramel Fudge shot |
| **Elixirs** | ❌ **blank** — both products |
| **Bananas** | ❌ **blank** |
| **Carob Powder** | ❌ **blank** |

Prices and `ADD TO CART` render throughout ($12.95, tiered $2.50 / $12.19 / $23.75 / $44.99,
ranges $5.99–$59.99, $24.99), with `ENQUIRE FOR RETAIL` on Moons — confirming Codex's
**FACT-002** and the audit's shop #4 (a `$5.99–$59.99` range with no visible size selector).

**This is the finding that decides the send.** Not alignment, not typography. A reviewer
opening shop sees a range that looks half-built.

---

## 3. CORRECTION — my disproof of stockists #1 was WRONG

I previously disproved it, reasoning that `.st-skip-finder` carries the correct
hide-then-reveal-on-focus pattern (`translateY(-160%)` → `translateY(0)` on `:focus`), and that
the audit had misread its own computed `-70.4px`.

**The capture shows the button is permanently visible.** `SKIP FILTERS TO RESULTS` renders as a
white pill in the page body at 834, with nothing focused. The audit's core claim was correct
and my static reading was wrong — the same failure as the nav: I read authored CSS and never
accounted for what the review-build tooling does at runtime.

**Partially standing:** the audit said it overlaps the hero paragraph *at every breakpoint*. In
this capture it sits clear of the paragraph, below the stat row. So it is **visible when it
should be hidden** (real) but **not overlapping at 834** (not reproduced). Cross-page #43's
claim of overlap at ~820px is likewise not evident here.

`FIVE-PAGE-QA-AUDIT-VERIFIED-20260803.md` §3 is amended accordingly.

---

## 4. Also confirmed by eye

- **`NATE-HOME-001` / `ms49rup1d3dn`** — the `#carob` block does sit visibly left of the grid
  shared by `When do you moon?` and its siblings. Real and noticeable. Nate's own wording
  ("pressed against the left edge") still overstates it; it is a grid miss of roughly 28px, and
  the fix is *restore the established inset*, not *add padding*.
- **`#carob` callout pods** render as two grey translucent boxes with faint text against the
  photograph — they read as unfinished furniture rather than designed callouts.
- **Hero credential pill** (`NO CAFFEINE · ORGANIC INGREDIENTS · VEGAN FRIENDLY`) sits over the
  bright sky and is low-contrast, exactly as audit #18 / `ms48tuprlfwf` describe.
- **Stockists internal copy is visible as claimed** — *"Search the source directory; store-type
  labels are provisional pending client sign-off."* and *"Store-type labels are provisional."*
- **`IMG-004` consistent with Codex** — the wholesale still-life **is** present at 834.
- **Homepage imagery is sound** — hero video frame, product bars, ritual cards, orchard, and
  the six starter-box bars all render. The blank-media problem does not affect homepage.

---

## 5. Where this leaves the send

**Blocking, confirmed by eye:**

1. Unstyled review-tooling text at the top of **every** page (`VIS-001`)
2. **Shop** — majority of the catalogue has no product imagery (`IMG-001`)
3. **Our-story / carob-story / stockists** — empty media slots per Codex `IMG-002/003/004`
4. Stockists — internal sign-off language in customer-facing copy
5. `#carob` grid miss (`NATE-HOME-001`, decision still `pending` — **Nate's to record, not mine**)

**Method note for the record.** Every correction I have had to issue this session came from the
same root: reading source instead of looking at the rendered page. Codex's captures answered in
three images what a whole session of static analysis got wrong twice. **Look first.**

## 6. Lane compliance

Written inside `_wip/evidence/` only. Captures were read, never modified. Nothing touched in
`staging-v1/`, `docs/orchestration/`, `_wip/reviews/`, `scripts/` or `LOCK_MANIFEST.json`.
No gate recorded; `NATE-HOME-001` remains `pending` and is Nate's alone to decide.
