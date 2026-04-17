# VERIFICATION.md — Phase 1: Design Elevation Sprint

Use this checklist AFTER all 9 tasks in `PLAN.md` are complete and committed, BEFORE advancing to Phase 2 (Photography Integration).

Verification is organised by UAT criterion from `ROADMAP.md §Phase 1 UAT`, plus phase-specific guards.

---

## 0. Brand Blue Guard Audit

Before any other check, confirm no navy/teal leakage into accent positions.

### Commands
```bash
cd ~/maplemoon-website
grep -r "#1E4366" --include="*.html" --include="*.css" -n      # only acceptable in text-on-cream contexts (body copy on warm-bg)
grep -r "#2D6B7F" --include="*.html" --include="*.css" -n      # acceptable only in gradient stops, never as standalone accent
grep -r "#4A7B9D" --include="*.html" --include="*.css" -n      # acceptable only in gradient stops, never as standalone accent
grep -rn "accent" ~/maplemoon-website/shared.css ~/maplemoon-website/brand_kit.css
```

### Pass criteria
- [ ] No `background: #1E4366` or `color: #1E4366` on CTA buttons, newsletter accent section, or eyebrow labels.
- [ ] `#1E4366` appears ONLY as body/heading text on warm-bg contexts (e.g., `body { color: var(--mm-navy) }` is fine).
- [ ] `--accent-blue` in `shared.css` resolves to `#7B9DBF` (grep the variable definition).
- [ ] `.section--accent` background is exactly `#7B9DBF`.
- [ ] Any `<!-- TODO Phase 2 -->` image-prompt comment includes the negative-prompt line from `PLAN.md §0`.

---

## 1. Breakpoint Matrix

Test every page at three breakpoints. Use Chrome DevTools responsive mode.

| Page | 375px (iPhone SE) | 768px (iPad portrait) | 1440px (desktop) |
|------|-------------------|------------------------|--------------------|
| `homepage.html` | [ ] no overflow, hero fits, flavour picker scrolls | [ ] bento grid 3-col, origin split horizontal | [ ] product image dominates, nav centred |
| `our-story.html` | [ ] hero readable, process timeline vertical stack | [ ] split sections alternate, timeline horizontal | [ ] full-width hero with overlay, alternating splits |
| `faq.html` | [ ] accordion readable, tap targets ≥44px | [ ] as 375 | [ ] max-width centred, generous side whitespace |
| `collections/bars.html` | [ ] hero visible, grid 2-col, featured card full-width | [ ] grid 3-col, featured card spans 2 | [ ] grid 4-col, featured spans 2 |
| `products/pure-carob-bar.html` | [ ] single-column stack, gallery + thumbs visible | [ ] 2-col layout, image sticky | [ ] 2-col layout, image sticky, generous info padding |
| `products/peppermint-moon.html` | [ ] same as pure-carob-bar | [ ] same | [ ] same |
| `products/spiced-elixir.html` | [ ] dark treatment, no white flash on load | [ ] dark + sticky image | [ ] dark + sticky image + readable contrast |

### Pass criteria
- [ ] Every cell above is checked.
- [ ] No horizontal scroll at any breakpoint on any page (verify: `document.body.scrollWidth === window.innerWidth`).
- [ ] No text overflow, no clipped headlines, no broken grids.

---

## 2. Motion & Reduced-Motion Test

### Motion ON (default)
- [ ] Scroll through every page top-to-bottom. Every `.reveal` element fades in as it enters viewport.
- [ ] Stagger delays visible on multi-child sections (bento grid items, process timeline steps, product grid cards).
- [ ] Header becomes dark when elixir section is >50% in viewport (homepage).
- [ ] Header backdrop-blur activates past 40px scroll.
- [ ] Parallax elements (if any) translate smoothly at 60fps.
- [ ] Thumbnail swap on PDPs crossfades 0.4s (no hard cut).

### Motion OFF (macOS System Settings → Display → Reduce motion, then reload)
- [ ] All content is visible immediately on page load.
- [ ] No stuck `opacity: 0` elements.
- [ ] No translate transforms in flight.
- [ ] Scroll behaviour is instant (no smooth scroll).
- [ ] Header dark-mode still swaps (instant, no transition).

### DevTools emulation fallback (if macOS setting can't be toggled)
- [ ] Chrome DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce` → reload → verify.

---

## 3. Competitive Comparison

Methodology: side-by-side screenshot every MapleMoon page next to the competitor equivalent. Ask the gut-check question.

### Screenshot pairs
| MapleMoon | Aesop | Koko Black | Haigh's |
|-----------|-------|------------|---------|
| `homepage.html` | aesop.com homepage | kokoblack.com homepage | haighschocolates.com.au homepage |
| `collections/bars.html` | aesop.com/au/c/skin | kokoblack.com/collections/milk-chocolate | haighschocolates.com.au/collections |
| `products/pure-carob-bar.html` | aesop.com/au/p/skin/cleansers/parsley-seed-anti-oxidant-facial-cleansing-masque | kokoblack.com/products/... | haighschocolates.com.au/products/... |
| `our-story.html` | aesop.com/au/r/about | kokoblack.com/pages/our-story | haighschocolates.com.au/pages/heritage |

### Gut-check questions (answer honestly — if any answer is "no" the phase is not done)
- [ ] Does the MapleMoon homepage have AT LEAST as much visual rhythm (section personality shifts) as Koko Black's homepage?
- [ ] Does the MapleMoon PDP have AT LEAST a sticky image column and multi-image gallery scaffold, matching Aesop's PDP structure?
- [ ] Does the MapleMoon About page tell a story through images AND text (not just text blocks), matching Haigh's heritage page?
- [ ] Does the MapleMoon Collection page have a hero image and featured card, matching the premium-collection pattern?
- [ ] Typography — is the headline ratio (display : body) ≥ 4× on every page?
- [ ] Can any page sit next to its competitor screenshot without looking like a "student project" (per PROJECT.md Success Criterion)?

If you answer "no" to any: log the gap as a follow-up task and decide whether to address in Phase 1 or defer.

---

## 4. Palette Consistency Audit

Per ROADMAP.md UAT: "V7+V11 fusion palette consistent across all pages (warm default, dark elixir only)."

### Commands
```bash
cd ~/maplemoon-website
# Elixir bg should be ONE canonical value
grep -r "#1E2A1E" --include="*.html" --include="*.css" -n
grep -r "#1a1a1a" --include="*.html" --include="*.css" -n     # should be empty or clearly legacy-only
grep -r "#1E1612" --include="*.html" --include="*.css" -n     # should be empty (was in research doc as example only)
# Cornflower accent
grep -r "#7B9DBF" --include="*.html" --include="*.css" -n     # should appear consistently across pages
```

### Pass criteria
- [ ] Elixir dark bg is `#1E2A1E` everywhere (homepage elixir section, Spiced Elixir PDP hero, any dark card surfaces).
- [ ] `#7B9DBF` appears as `--accent-blue` / `--mm-blue-top` / `.section--accent` background across ≥5 of the 7 pages.
- [ ] Warm bg is `#F5F0E8` (`--warm-bg`) everywhere.
- [ ] Cream bg is `#FAF7F0` (`--cream-warm`) everywhere.
- [ ] No stray colour one-offs (grep for `color: #` and `background: #` in HTML inline styles — each hex should appear in `brand_kit.css` or `shared.css`).

---

## 5. Accessibility Guardrails

- [ ] Skip-to-content link still present and visible on `:focus` (test with keyboard Tab from page load).
- [ ] All focus-visible outlines intact (2px navy outline — already defined in `brand_kit.css`).
- [ ] Contrast ratios on dark sections: cream `#E7E4CA` on elixir `#1E2A1E` = 12.2:1 (passes AAA). Verify with https://webaim.org/resources/contrastchecker/.
- [ ] Contrast on cornflower accent button (cornflower bg, cream text) ≥ 4.5:1 (WCAG AA).
- [ ] All `<img>` tags have `alt` attributes (grep for `<img ` and confirm).
- [ ] All interactive elements ≥44×44px tap target (spot-check nav, flavour picker, thumbnail swaps, process timeline).
- [ ] All animations respect `prefers-reduced-motion: reduce`.

---

## 6. Placeholder / Broken-State Sweep

Per ROADMAP UAT: "No layout breaks, no placeholder text visible."

- [ ] No visible "Lorem ipsum" or placeholder copy on any rendered page.
- [ ] No broken image icons (all `<img src=>` resolve, verify in DevTools Network panel for 404s).
- [ ] `<!-- TODO Phase 2: wire X.png -->` comments exist in source but do NOT render visually (comments only).
- [ ] No console errors in DevTools (hard requirement — zero errors).
- [ ] No console warnings related to deprecated APIs, missing resources, or unused IntersectionObserver targets.

---

## 7. Component Library Self-Check (Task 1.9 output)

- [ ] `brand_kit.css` contains the `/* ══ COMPONENT INVENTORY ══ */` block.
- [ ] Every class named in the inventory has a grep match in `shared.css` or `brand_kit.css`.
- [ ] Every documented class has ≥1 grep match in an HTML file (real-world usage).
- [ ] Brand blue guard comment is present verbatim in the inventory.
- [ ] Button variants `.btn--primary`, `.btn--secondary`, `.btn--ghost-dark` are applied in ≥1 real button per page.

---

## 8. Sign-Off

Phase 1 is DONE when:
- [ ] All of §0–§7 above pass.
- [ ] Nate has personally scrolled all 7 pages on 375px, 768px, 1440px.
- [ ] Nate has personally toggled `prefers-reduced-motion: reduce` and confirmed no broken states.
- [ ] A git commit exists with message `feat(phase-1): design elevation sprint complete` (or equivalent) on `paper-shopify-heroes`.
- [ ] This file is updated with date-of-verification and tester initials.

**Verified by:** ________________
**Date:** ________________
**Deploy URL tested:** https://maplemoon-website.vercel.app/ (specify exact preview URL if feature branch)

---

## 9. If Verification Fails

1. Identify the failing task (1.1–1.9) from the failing criterion.
2. Do NOT move to Phase 2. Log the gap as a sub-task (e.g., 1.5.1) and return to the plan.
3. Re-run the relevant VERIFICATION sections after fixes.
4. Only mark Phase 1 complete when every box in §0–§7 is checked.
