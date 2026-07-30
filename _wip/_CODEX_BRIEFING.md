# Codex Handoff — MapleMoon Website WIP
**Date:** 2026-07-19
**Handing off from:** Claude (Sonnet 4.6 session)
**Working directory:** `~/maplemoon-website`

---

## What this project is

A static multi-page HTML prototype for Maple Moon — an Australian organic carob brand. The prototype lives in `_wip/` and is served locally by `node server.js` on port 3005. The client is Carli and Dylan ("C&D"). Nate is the designer/PM.

The prototype will eventually be ported to Shopify Liquid, but that is blocked on Shopify collaborator access. For now: all work is on the static `.WIP.html` files.

---

## Current state

**Step 1 (fonts + layout) — LOCKED as of 2026-07-19.**

The homepage WIP is complete for step 1. Inner pages need a11y work (Wave 1).

**Step 2 (real pricing + content) — BLOCKED on Carli & Dylan.**

**Step 3 (reviews / social proof) — BLOCKED on Carli & Dylan.**

A C&D briefing email draft is written (see below) and awaiting Nate's "send it" approval.

---

## Priority order for this session

1. **Wave 1 — Inner-page a11y fixes** (5 pages, see findings below). This is the active work.
2. **Show Nate the C&D draft email** and get send approval (already drafted — see section below).
3. Hold on step 2/3 until C&D responds.

---

## Active file rules — NON-NEGOTIABLE

- **NEVER edit** `homepage_real_1_lead_photo.html` (the approved base). Work only on `.WIP.html` files.
- **NEVER deploy** to any live URL without Nate's explicit "go ahead."
- **NEVER invent** pricing, reviews, founder quotes, or social handles.
- **NEVER message MapleMoon** — Nate sends all comms. You may draft, not send.
- The server runs at `http://localhost:3005` — use it for verification.

---

## File locations

```
~/maplemoon-website/
├── server.js                          # local dev server (port 3005)
├── _wip/
│   ├── homepage_real_1_lead_photo.WIP.html   # HOMEPAGE — step 1 LOCKED
│   ├── our-story.WIP.html            # Wave 1 target
│   ├── shop.WIP.html                 # Wave 1 target (36 tap targets — worst)
│   ├── carob-story.WIP.html          # Wave 1 target
│   ├── faq.WIP.html                  # Wave 1 target
│   ├── stockists.WIP.html            # Wave 1 target
│   ├── brand_kit.css                 # shared styles
│   ├── RESEARCH.md                   # full wave plan + prior audit findings
│   ├── _CHECKPOINT_20260719.md       # latest checkpoint — READ THIS FIRST
│   └── _CODEX_BRIEFING.md            # this file
```

---

## Typography (TypeKit)

- **Kit:** `dvz0xjs` (NOT `rrz1ouj` — that is a different client)
- **Serif:** `p22-mackinac-pro` — headings, wordmark, pull quotes
- **Sans:** `neue-haas-grotesk-display` — body, nav, labels
- Loaded via `<link rel="stylesheet" href="https://use.typekit.net/dvz0xjs.css">`
- Both fonts declared as `--mm-serif` and `--mm-sans` CSS custom properties

---

## What was done on the homepage (do not redo)

- TypeKit font wiring fixed (removed conflicting local() @font-face blocks)
- a11y Group A: skip-link, `<main id="main-content">`, cart `<span>` → `<button>`, social links 44px
- Wave 0 ratified: B3 motion ON + button system KEPT; seal + dark marquee REMOVED
- 44px tap-target pass: 11 CSS rules added in `<style>/* A11Y — 44px tap-target pass */` block
- Mobile 375px verified clean
- Heading order confirmed valid — no fix needed

---

## Wave 1 — Inner-page a11y audit findings (390px viewport, 2026-07-19)

Ran puppeteer audit across all 5 inner pages. Results:

| Page | Sub-44px | Dead `href="#"` | Heading seq | Skip? |
|---|---|---|---|---|
| our-story | 10 | 1 | `12222224` | YES (h2→h4) |
| shop | **36** | 1 | `1233...` | no |
| carob-story | 10 | 1 | `122233224` | YES |
| faq | 10 | 0 | `1224` | YES (h2→h4) |
| stockists | 12 | 0 | `12333224` | YES |

**Common findings across all pages:**
- Cart is `<span role="button">` (classes `sp-cart`, `os-cart`) — needs `<button type="button">` with aria-label and 44px sizing. This is the same fix applied to the homepage.
- Logo link (`a.sp-logo`, `a.os-logo`) — no min-height, needs `display:inline-flex; align-items:center; min-height:44px`
- `.pill` links throughout — sub-44px, needs padding bump (same fix as homepage)
- Heading skips — locate the rogue h4 or h2→h4 jump in each affected page and fix the level

**Shop page (36 targets):** likely the product grid CTAs. Investigate before bulk-fixing.

**Proposed Wave 1 approach:**
1. Create `_wip/a11y_inner.css` with shared tap-target rules (logo, pill, cart sizing, footer nav) — link from all 5 inner pages
2. Fix cart `<span>` → `<button>` in each inner page nav HTML
3. Locate and fix the heading level skips (open each page, grep for `<h4`, reclassify if needed)
4. Investigate shop's 36 targets specifically before applying fixes

---

## C&D email draft (DRAFT — Nate must approve before sending)

**To:** info@maplemoon.com.au
**Subject:** Website — a few things we need from you

> Hey team,
>
> Getting close on the new site. To finish it off properly, we need a few things from you both:
>
> **Pricing.** Final retail price for each product — bars, moons, bites, elixirs, bananas, and the sampler box. Also, what is the free shipping threshold? I want to make sure the site shows the right figure.
>
> **Social links.** Your Instagram handle, and your Facebook page if it is active. Also confirming the contact email — is info@maplemoon.com.au the right one to point customers to?
>
> **Reviews.** We have a section on the site for customer quotes. Where do your real reviews live? Google, Instagram, market feedback? Or if you want to send me two or three favourite quotes directly, I can work with those.
>
> **Founder photos.** A photo each of Carli and Dylan for the founders section. Any behind-the-scenes shot works, nothing needs to be formal.
>
> **Coming soon.** Are any products in the range not yet available for purchase? If so, which ones should we flag as coming soon on the site?
>
> No rush on all at once, happy to work through these as they come.
>
> Thanking you,
> Nate

**How to send (when approved):** Use `~/bin/send_mail_clean.py` (Gmail API). Never AppleScript Mail (wraps in blockquote). Show Nate the full HTML render in `~/UFC/ops/send_review/` before sending (pre-send HTML review gate).

---

## Client communication rules — NON-NEGOTIABLE

- MapleMoon email: **info@maplemoon.com.au only** — never carlisaber@gmail.com or bernarddh96@gmail.com even as CC
- Always open with **"Hey team,"** (lowercase t) — never an individual name
- Money/quotes/invoices: only discuss with Carli & Dylan (not vendor/Mitch threads)
- Sign off as **"Nate"** (never "Don" — though if C&D call Nate "Don" inbound, accept it, never flag it)
- Close with **"Thanking you,"**
- No em dashes anywhere in copy (ever)
- No generic openers ("Hope you're well", "Just checking in")
- No email sends without Nate's explicit "send it" / "yes" / "go"
- Pre-send gate: render draft to HTML, open in Chrome, THEN ask for approval

---

## Content constraints — NON-NEGOTIABLE

- **Cacao %:** Omit on ASAL, CHIL, GCOC, HNUT, PMIN flavours. PCAR is 50/50 carob/cacao — OK to state. Do not add % to any bar that doesn't currently show it.
- **Salted-caramel fudge** = active SKU — treat as available, never flag coming-soon
- **Pricing** = all indicative/placeholder until C&D confirm. Never invent a price.
- **Reviews** = zero live reviews exist. Placeholder slides only. Never write fake reviews.

---

## Gap list (needs C&D — step 2/3 blockers)

1. Final retail pricing (all SKUs)
2. Free shipping threshold (currently $60 in page — conflicts with FAQ $99 and dashboard $75)
3. Reviews source or direct quotes
4. Founder photos (carli.webp + dylan.webp)
5. Coming-soon SKU confirmation
6. Social handles (Instagram, Facebook)
7. OG image (assets/social/ doesn't exist — 1200×630 crop needed)
8. Stockist logo set (names are in; logo files pending)
9. Shopify collaborator access

---

## Contrast deferred

`--ink-faint: #a99f87` on `--paper: #eee9d3` fails WCAG 4.5:1. Nate confirmed defer to final audit — do not change this colour value now.

---

## How to verify your work

- Start server if not running: `node server.js` from `~/maplemoon-website`
- View at `http://localhost:3005/_wip/<page>.WIP.html`
- Run tap-target audit: `node _wip/audit.js` (uses puppeteer-core from `~/maplemoon-website/node_modules`)
- Chrome binary: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- Mobile test: puppeteer viewport `{width:375, height:812, isMobile:true}`
