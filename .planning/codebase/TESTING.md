# Testing Patterns

**Analysis Date:** 2026-04-13

## Test Framework

**Runner:**
- None configured
- `package.json` (line 8) shows: `"test": "echo \"Error: no test specified\" && exit 1"`
- Running `npm test` fails with intentional error message

**Assertion Library:**
- Not applicable (no test framework)

**Run Commands:**
```bash
npm test                    # Returns error — no tests configured
npm start                   # Runs server.js (Express for local preview)
```

## Test File Organization

**Location:**
- No test files present in codebase
- Searched for `*.test.*`, `*.spec.*` patterns — none found
- No `/tests/`, `/test/`, `/__tests__/` directories

**Naming:**
- Not applicable

**Structure:**
- Not applicable

## Test Structure

**Suite Organization:**
- Not applicable — no tests exist

**Patterns:**
- Not applicable

## Mocking

**Framework:**
- Not used

**Patterns:**
- Not used

**What to Mock:**
- Not applicable

**What NOT to Mock:**
- Not applicable

## Fixtures and Factories

**Test Data:**
- Not applicable

**Location:**
- Not applicable

## Coverage

**Requirements:**
- None enforced
- No coverage tooling configured

**View Coverage:**
- Not applicable

## Test Types

### Unit Tests
- **Status:** Not used
- **Scope:** Individual functions (menu logic, product switcher, scroll listeners) could be unit tested but are not

### Integration Tests
- **Status:** Not used
- **Scope:** DOM interactions (menu open/close, category selection, focus trapping) would benefit from integration testing but are manual

### E2E Tests
- **Framework:** Not used
- **Approach:** Manual browser testing (no automation framework like Cypress, Playwright detected)

## Manual Testing Approach

Since no automated tests exist, the codebase relies on manual/browser-based testing. Evidence:

**Development Server:**
- `server.js` (Express) strips Liquid tags for browser preview
- Allows live testing of hero prototypes and sections at `http://localhost:3005`
- GET `/sections/:file.liquid` endpoint serves HTML preview (lines 7–25 in `server.js`)

**Testing Patterns Observable in Code:**
- Heavy use of console-accessible features (no logging lib)
- Defensive DOM checks: `if (header) { ... }` prevents runtime errors on pages without header
- Focus management tested through keyboard navigation (Tab, Escape keys)
- Accessibility verified via ARIA attributes and semantic HTML
- Animation testing via `prefers-reduced-motion` media queries (ensures animations disable correctly)

**Quality Assurance Practices:**
- Version iteration (18 hero prototypes from v1 to v19, 7+ product versions) suggests iterative testing
- Numbered annotation system (`[1]`, `[5]`, `[17]`) enables cross-reference to issues/decisions
- Liquid section self-containment reduces testing surface (styles/JS/config in one file)

## Browser Testing Checklist (Inferred)

Based on code patterns, manual testing likely covers:

**Interactions:**
- [x] Menu open/close on mobile (hamburger click)
- [x] Focus trap when menu open (Tab, Shift+Tab wrap, Escape closes)
- [x] Category hover preview (product image cross-fade)
- [x] Category click locks selection
- [x] Skip-to-content link works
- [x] Header glassmorphism on scroll (desktop 768px+)
- [x] Scroll indicator moves with product strip scroll

**Accessibility:**
- [x] All images have alt text
- [x] Buttons have aria-labels
- [x] Modal has aria-modal="true" and aria-hidden management
- [x] ARIA live regions announce dynamic updates (`aria-live="polite"`)
- [x] Keyboard navigation (focus visible, Tab order, Escape key)

**Responsive:**
- [x] Mobile (< 768px): hamburger menu visible, single product column
- [x] Tablet (768px–1024px): back link appears, product stage width increases
- [x] Desktop (> 1024px): hamburger hidden, navigation visible, product stage optimized

**Performance:**
- [x] Animations respect `prefers-reduced-motion`
- [x] Images load with `fetchpriority="high"` and `decoding="async"`
- [x] Scroll listener throttled via `requestAnimationFrame` (lines 643–654 in `hero_v1.html`)
- [x] Event listeners use `{ passive: true }` for scroll performance

## Code Quality Signals

**Strength:** Deliberate accessibility patterns
- Focus trap implementation (mutation observer cleanup)
- ARIA label updates on dynamic content
- Keyboard event handling (Escape, Tab)
- Semantic HTML with screen-reader text

**Weakness:** No automated regression testing
- Changes to menu logic or focus trap could silently break
- No unit test for `switchProduct()` state management
- Responsive breakpoint changes require manual testing at three viewports

**Opportunity:** Add test framework
- Jest + Testing Library could test DOM interactions (menu, category switcher)
- Cypress/Playwright for E2E testing across browsers
- Start with menu focus trap (complex, most fragile)

## Known Testing Gaps

**Untested Behaviors:**
1. **Product switcher race condition** — Lines 541–567: `menuAnimating` guards race condition during 0.3s animation but has no unit test
2. **Liquid template rendering** — `server.js` regex strips Liquid; correctness of strip patterns never verified (lines 12–22)
3. **Category strip scroll indicator** — Relies on `requestAnimationFrame` and `getComputedStyle` check (line 646); no test verifies calculation accuracy
4. **Cross-browser compatibility** — Focus trap uses `new MutationObserver()` and event listener cleanup; not tested in all browsers

**Risk Level:** Medium
- Core UX features (menu, category selection) rely on manual testing
- Focus trap complexity is error-prone; regression would silently break a11y
- Liquid preprocessing in dev server could diverge from production rendering

---

*Testing analysis: 2026-04-13*
