You are taking over a website build for Maple Moon, an Australian organic carob brand. The designer is Nate. The clients are Carli and Dylan ("C&D"). Read this entire prompt before touching any file.

---

## YOUR WORKING DIRECTORY

`~/maplemoon-website`

The local dev server runs with `node server.js` on port 3005. Start it if it is not running. All pages are served from `_wip/` as static HTML.

---

## WHAT HAS ALREADY BEEN DONE — DO NOT REDO

The homepage (`_wip/homepage_real_1_lead_photo.WIP.html`) is fully locked for Step 1. The following are complete and verified:

- TypeKit fonts wired (kit `dvz0xjs`, fonts `p22-mackinac-pro` + `neue-haas-grotesk-display`)
- a11y: skip-link, `<main id="main-content">`, cart `<span>` → `<button>`, social links 44px
- 44px tap-target pass (CSS block added at bottom of file)
- Seal and dark marquee removed; static credentials row restored in hero
- B3 motion ON default and new button system both approved and kept
- Mobile 375px verified clean

Do not edit the homepage. Do not edit `homepage_real_1_lead_photo.html` (the base file — no `.WIP` in the name). That file is untouchable.

---

## WHAT TO DO NOW

### Task 1 — Wave 1: inner-page a11y fixes

Run an a11y audit on the five inner pages, fix the issues you find, and verify at 390px mobile. The audit script is at `_wip/audit.js` (uses `puppeteer-core` from `~/maplemoon-website/node_modules`, Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`).

The five pages:
- `_wip/our-story.WIP.html`
- `_wip/shop.WIP.html`
- `_wip/carob-story.WIP.html`
- `_wip/faq.WIP.html`
- `_wip/stockists.WIP.html`

A prior audit (390px, 2026-07-19) found these specific issues:

| Page | Sub-44px targets | Heading skip |
|---|---|---|
| our-story | 10 | YES — h2→h4 jump |
| shop | 36 | no |
| carob-story | 10 | YES |
| faq | 10 | YES — h2→h4 jump |
| stockists | 12 | YES |

**Common across all pages:**
- Cart is `<span role="button">` with class `sp-cart` or `os-cart`. Replace with `<button type="button" aria-label="Cart, 0 items">` and ensure 44×44px sizing in CSS.
- Logo link (`a.sp-logo`, `a.os-logo`) — needs `display:inline-flex; align-items:center; min-height:44px`.
- `.pill` anchor links — sub-44px, needs padding bump to meet 44px height.

**Heading skips:** locate the rogue `<h4>` element in each affected page and either reclassify it as `<h3>` or adjust the hierarchy to be sequential. Do not skip levels.

**Shop (36 targets):** investigate the product grid before bulk-fixing — there may be many small per-product CTAs that need a different approach to the other pages.

**Approach:** create a shared `_wip/a11y_inner.css` with the common tap-target fixes (logo, pill, nav, footer links, cart button sizing) and link it from all five inner pages. Make cart button semantic fixes directly in each page's HTML.

After completing fixes, re-run the audit and confirm sub-44px count drops to zero (or near-zero — social `href="#"` placeholders are blocked on client for handles, those are acceptable).

### Task 2 — C&D email

There is a draft email ready for Nate's approval. Show it to Nate and wait for "send it" before doing anything. Do NOT send it yourself.

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

When Nate approves, send via `~/bin/send_mail_clean.py` (Gmail API). Before sending, render the draft to HTML, save it under `~/UFC/ops/send_review/`, and open it in Chrome for Nate to see. Only send after Nate sees the render and says go.

### Task 3 — Step 2 and Step 3 are blocked

Step 2 (real pricing + content) and Step 3 (reviews) cannot proceed until C&D responds. Do not invent prices. Do not write fake reviews. Hold these tasks until C&D replies.

---

## HARD RULES — NEVER VIOLATE THESE

**Files:**
- Never edit `homepage_real_1_lead_photo.html` (no `.WIP`). That file is the approved base.
- Always work on `.WIP.html` files only.
- Never deploy to any live URL without Nate saying "deploy it."

**Content:**
- Never invent pricing. All prices are indicative placeholders pending C&D.
- Never write fake reviews or invented quotes.
- Omit cacao % on ASAL, CHIL, GCOC, HNUT, PMIN flavours. Do not add it even if you think you know it.
- PCAR (Pure Carob & Cacao Butter) is 50/50 — that ratio is OK to state.
- Salted-caramel fudge is an active SKU — never flag it coming soon.

**Comms:**
- Never send any email, iMessage, or DM on Nate's behalf without explicit approval ("send it" / "yes" / "go").
- MapleMoon email is info@maplemoon.com.au only. Never email carlisaber@gmail.com or bernarddh96@gmail.com.
- Always open MapleMoon emails with "Hey team," (lowercase t).
- Close with "Thanking you," and sign "Nate."
- Never use em dashes in any copy or subject line.
- Never use the word "vibe" in any context.

**Design:**
- `--ink-faint: #a99f87` on `--paper: #eee9d3` fails WCAG 4.5:1. Nate knows. Do not change this value — it is deferred to a final contrast audit.
- TypeKit kit is `dvz0xjs`. Do not substitute `rrz1ouj` — that is a different client (Lewis).

---

## REFERENCE: GAP LIST (what is blocked on C&D)

These cannot be completed until C&D responds. Note them, do not guess them:

1. Final retail pricing — all SKUs
2. Free shipping threshold (currently $60 in homepage, conflicts with FAQ $99 and dashboard $75)
3. Reviews source or direct quotes
4. Founder photos (carli.webp + dylan.webp for Meet the Founders section)
5. Coming-soon SKU confirmation
6. Social handles (Instagram, Facebook)
7. OG image (assets/social/ folder does not exist — 1200×630 crop needed)
8. Stockist logo files (names are in page; logo files pending)
9. Shopify collaborator access (needed for liquid port — not possible until granted)
