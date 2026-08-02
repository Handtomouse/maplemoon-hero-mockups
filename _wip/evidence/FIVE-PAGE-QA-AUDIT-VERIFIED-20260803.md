# Five remaining pages — QA audit P0/P1 verification
# Written: 2026-08-03 · macbook Claude Code (worker)
# STATUS: VERIFICATION ONLY. Records no verdict. Passes no gate. Nothing fixed.
#         CR-0..CR-4 remain Nate's alone.
# Companion to: HOMEPAGE-QA-AUDIT-CLASSIFIED-20260803.md

## Scope and why it is bounded

Verifying all ~100 findings across five pages is a 50k+ job. On homepage, **every** P2/P3
resolved to code health, CR-3 metadata or preference — none affected the send. So this covers
**P0 and P1 only**: the set that could actually block the package.

Findings extracted: our-story 8 · carob-story 6 · stockists 7 · faq 7 · **shop 15**.

`our-story-qa-audit.md` and `our-story-qa-audit (1).md` carry **identical** P0/P1 sets; the
`(1)` file only adds lower-severity items. Same for the two stockists files. `faq.txt`
supersedes `faq-audit-report.txt` (7 findings vs 3).

---

## 1. THE MOST IMPORTANT FINDING — do not "fix" the robots tag

All six pages carry `<meta name="robots" content="noindex,nofollow">`. **Verified on all six.**

Three separate audits flag this as a defect needing repair:

- our-story #6 — *"Blocks indexing"*
- stockists #4 — *"will block indexing if shipped as-is"*
- faq #6 — *"this page will not be indexed"*

> **They are wrong for this artifact.** This is a private client-review package served from
> localhost to two named people. `noindex,nofollow` is **correct and deliberate** here.
> Removing it is the one change in these audits that would be actively harmful.

It becomes a genuine defect at public launch, not before. Same reasoning as the missing OG
tags — real, but owned by **CR-3**, which already has its own accepted audit
(`LINK-PREVIEW-METADATA-AUDIT-20260802.md`). Do not action either from these packets.

This is the signature failure mode across all six audits: they were written as *build* QA
against a *review* artifact, so "not production-ready" reads as "broken".

---

## 2. CONFIRMED — verified against the frozen artifact

| page | # | finding | measured |
|---|---|---|---|
| **our-story** | **#2 P0** | **3 of 8 sub-nav links are dead** | **CONFIRMED.** `<a href="#founders">`, `<a href="#source">`, `<a href="#craft">` are real HTML links in `.os-story-subnav__inner`. IDs `founders`, `source`, `craft` **do not exist anywhere** — not in any page, not in any JS. Clicking them does nothing. |
| **carob-story** | **#1 P0** | `carob_pods_macro.jpg` oversized | **CONFIRMED — 9.8MB**, and referenced **twice** on the page. |
| **carob-story** | **#3 P1** | copy says four, page has three | **CONFIRMED.** Subheading reads *"The four things everyone asks at the market stall."* — the page contains **3** `<details>` items. |
| **carob-story** | #5 P1 | two more oversized images | **CONFIRMED** — 498KB and 577KB (audit said 509/591). |
| **stockists** | **#2/#5 P1** | internal status copy is customer-visible | **CONFIRMED.** Live UI strings: *"Search the source directory; store-type labels are provisional pending client sign-off."* and *"Store-type labels are provisional."* |
| **shop** | **#8 P0** | starter-box PNGs unoptimised | **CONFIRMED — 4.07MB across 6 PNGs** (573–812KB each), rendered as small thumbnails. |
| all six | — | `robots noindex,nofollow` | **CONFIRMED present** — and correct, see §1. |

**`our-story #2` is the strongest defect in the entire audit set.** It is client-visible,
unambiguous, statically provable, and it is exactly what a reviewer does: click the sub-nav.
Three of eight links do nothing. It also explains `#3` — the nav promises Founders / The source
/ The craft, and those sections were never written.

**Package-wide image weight is a real theme, not three separate findings.** Homepage ~21.7MB,
carob-story 9.8MB (loaded twice), shop 4.07MB. Carli and Dylan will review this over a normal
connection.

---

## 3. ~~DISPROVED~~ — **WITHDRAWN 2026-08-03, THE DISPROOF WAS WRONG**

> **⚠️ The capture `05-stockists--tablet-834.png` shows `SKIP FILTERS TO RESULTS` rendered as a
> visible white pill in the page body with nothing focused.** The audit's core claim —
> permanently visible — is **correct**. My static reading of the authored CSS missed what the
> review-build tooling does at runtime, the same error as the injected nav.
>
> Still not reproduced: the claimed overlap with the hero paragraph. At 834 the button sits
> clear of it, below the stat row. So: **visible when it should be hidden — real; overlapping —
> not shown.** See `VISUAL-VERIFICATION-20260803.md` §3. The static analysis below is retained
> only to show how the error was made.

**`stockists #1` (P0) — "skip-link permanently visible, overlapping the hero paragraph at
every breakpoint."**

The CSS is the textbook-correct pattern:

    .st-skip-finder      { position:absolute; top:8px; transform:translateY(-160%); … }
    .st-skip-finder:focus{ transform:translateY(0); … }

Hidden by default, revealed on focus. I cascade-checked it — only **2** occurrences in the
page, and the one shared-file override (`mock-cart.css:107`) sets **only**
`min-height / display / align-items`. It does not touch `transform` or `position`.

Decisively: the audit cites a computed `transform: translateY(-7…)`. With `min-height:44px`,
**-160% of 44px = -70.4px**. The audit's own measurement is the rule working correctly — it
saw the element translated *off* position and reported it as visible. It misread its own
evidence.

*Close-out:* the stockists PNG render will settle this visually in five seconds. If the
skip-link is not sitting over the hero paragraph, this P0 is dead.

---

## 4. A false positive in MY OWN check — recorded so it is not repeated

My first anchor scan reported `shop.html` had a missing target literally named
`'+section.id+'`, which reads like a broken JS-concatenated href.

**It is not a defect.** That string lives inside a `<script>` block as a JS string being
concatenated at runtime. My regex scanned script contents as if they were markup. Re-run with
`<script>` blocks stripped, shop has **zero** missing anchor targets.

The same re-test **confirms** our-story's three dead links are genuine — they sit in real
markup, outside any script.

> Same lesson as the desktop sweep's false positives: a detector that does not model context
> flags things for doing exactly what they were designed to do. **Strip scripts before
> scanning markup.**

> **⚠️ CORRECTION, 2026-08-03 — that lesson is half-right and I misapplied it.**
> Stripping `<script>` is correct for *"does this literal href target exist?"*. It is **wrong**
> for *"what does a viewer actually see?"* — because `mock-cart.js` **injects a five-route nav
> at runtime on every page** (`normalizeReviewNavigation()`, `mock-cart.js:22-31`). By
> stripping scripts I made myself blind to it, and wrongly declared homepage audit #3
> fabricated and `faq.html` unreachable. Both withdrawn; see
> `HOMEPAGE-QA-AUDIT-CLASSIFIED-20260803.md`. Codex's render pass caught the real defect
> (`VIS-001`, all 18 captures). **Static analysis cannot answer visual questions. Full stop.**

Consequence: **`shop #19`** ("all in-page anchor links fail to jump") is **UNVERIFIED**, not
confirmed. Its targets all exist. Whatever the audit saw needs runtime reproduction.

---

## 5. UNVERIFIED — real possibilities, need a running browser

Static inspection cannot settle these. **None should be actioned on the audit's word alone**,
given the hit rate so far.

**shop — the problem page, 15 P0/P1 and the most serious claims:**

| # | claim | why it matters |
|---|---|---|
| **#18 P0** | cart dialog opens but renders **off-screen at 390px** | if true, the cart is unusable on mobile — the most consequential unverified claim in the set |
| **#13 P0** | "Add to cart" button overlaps price, hiding the last digits, in List view at ~1054px | visibly wrong on every product card |
| **#26 P0** | bulk-tier pricing shown, but cart only ever adds qty 1 at base price | pricing that does not match what is charged |
| **#4 P0** | price ranges `$5.99–$59.99` with no size/quantity selector | reviewer cannot tell what they are buying |
| **#20 P0** | "Skip to the catalogue" link does nothing on Enter | WCAG 2.4.1 |
| **#15 P0** | focus ring clipped by an `overflow:hidden` card | keyboard visibility |
| **#23 P0** | `overflow:hidden auto` on `.sp` creates a stray scroll container | proposed root cause of several of the above |
| #2 / #3 / #14 P1 | contrast ~2.56:1 and ~3.6:1; weak pill focus | below AA if the numbers hold |
| #5 / #6 / #12 P1 | no cart subtotal; cart not cleared after demo order; mobile nav overflow | |

**faq #1 (P0)** — focusing a right-edge element shifts the whole page ~260px left and never
resets. **Verify this one early.** If real, it is a keyboard-triggered layout break, and the
existing keyboard-traversal evidence was captured at 390px where it may not reproduce.

**our-story #1 (P0)** — desktop nav and mobile pill-nav both render between ~561–900px.
Reproducible at a single width; the 1024 render will not catch it (the band is below 1024).

**Contrast claims** (our-story #15 `.os-kick` at 2.41:1, #16 at 3.58:1; shop #2/#3) need
computed colour sampling, not a grep.

---

## 6. Where this leaves the package

**Confirmed and client-visible, worth fixing before the send:**

1. our-story — 3 dead sub-nav links *(and the missing sections they promise)*
2. carob-story — "four things" over three items
3. carob-story — 9.8MB image, loaded twice
4. shop — 4.07MB of PNG thumbnails
5. stockists — internal sign-off language in customer-facing UI
6. *(homepage, per companion doc)* — 21.7MB images, distorted Moons shot, hero pill contrast,
   `faq.html` unreachable

**Do not touch:** the robots tag (§1), OG/canonical (CR-3), and every code-health item.

**Verify before believing:** all of shop's P0s, faq #1, our-story #1.

**Audit reliability, across both documents:** of the P0s I could decide statically, roughly
**two in five were wrong** — fabricated (homepage #3), self-retracted (homepage #1),
misread evidence (stockists #1), or unsupported (shop #19). The confirmed ones are real and
worth acting on. **The severity labels carry no weight; the descriptions sometimes do.**

## 7. Lane compliance

Written inside `_wip/evidence/` only. Zip extracted to the job tmp directory, outside the repo.
Nothing touched in `staging-v1/`, `docs/orchestration/`, `scripts/`, `.gitignore` or
`LOCK_MANIFEST.json`. No build, no fix, no gate recorded.
