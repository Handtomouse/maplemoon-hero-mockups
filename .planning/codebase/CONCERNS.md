# Codebase Concerns — Pre-Meeting Risk Audit

**Analysis Date:** 2026-04-18
**Context:** Pre-review audit for Sun Apr 19 meeting with Carli + Dylan. Site shipped to `maplemoon-website.vercel.app` 2026-04-16 (V7+V11 fusion).
**Priority legend:** **BLOCKER** = fix before Sunday / **FLAG** = disclose upfront / **NOTE** = backlog.

---

## BLOCKER — Fix before Sunday's meeting

### BLOCKER 1 — Root URL serves the internal prototype gallery, not the homepage

- **Problem:** Visiting `https://maplemoon-website.vercel.app/` (the URL most likely to be typed or copy-pasted) currently serves `index.html` — an internal "MapleMoon — Hero Concepts | HandToMouse Studio" gallery of 19 hero concept cards. First impression = a designer's internal mood board, not a brand site.
- **Verified:** `curl -sL https://maplemoon-website.vercel.app/` returns `<title>MapleMoon — Hero Concepts | HandToMouse Studio</title>`.
- **Files:** `/Users/handtomouse/maplemoon-website/index.html` (line 6 title), `/Users/handtomouse/maplemoon-website/vercel.json` (no root redirect)
- **Why Carli will find this:** She will type the bare domain to show Dylan. She will also Command+click the Vercel link from the share email and land here.
- **Fix approach:** Add a `{ "source": "/", "destination": "/homepage.html", "statusCode": 308 }` redirect to `vercel.json`, OR rename `index.html` to `_index_gallery.html` and rename `homepage.html` to `index.html`. Redirect is safer (keeps internal gallery at `/index.html` while root goes to brand). Test after deploy.

### BLOCKER 2 — Internal design-process files are deployed to production

- **Problem:** `.vercelignore` only excludes `hero_v3.html` and `hero_v12.html`. The other 35 prototype/admin HTML files at root **are live on prod**, reachable by URL-guessing or dev-tools sniffing.
- **Verified:** `curl -sI https://maplemoon-website.vercel.app/hero_v15.html` → `HTTP/2 200`. Same for `/client_review.html`, `/index.html`, `/homepage_backup.pdf` (5.5 MB design snapshot).
- **Files leaked to prod:**
  - `hero_v1.html, hero_v2.html, hero_v4.html, hero_v6–v19.html, hero_v9_atmospheric.html, hero_v9_product.html` (20 hero iterations)
  - `hero_photo_atmospherics.html, hero_photo_byron_bay.html, hero_photo_gift_boxes.html, hero_photo_products.html, hero_photo_silhouettes.html` (5 review boards)
  - `product_v2b.html, product_v7a.html, product_v9.html, product_v13.html, product_v19.html` (5 PDP prototypes)
  - `client_review.html, index.html, homepage_backup.pdf`
- **Why Carli will find this:** Not likely via normal browsing, but any forwarded deck with a Vercel deploy log, the Network tab, or a Google indexing event will surface them. Competitors who sniff sitemaps could grab the full creative process.
- **Fix approach:** Rewrite `.vercelignore` to exclude all prototype patterns in one pass:
  ```
  hero_v*.html
  hero_photo_*.html
  product_v*.html
  index.html            # only if homepage.html becomes the canonical index
  client_review.html
  homepage_backup.pdf
  *.bak
  *.r20_*
  apply_moods.py
  place_stock.py
  *.pdf                 # catch-all for design PDFs at root
  ```
  Redeploy. Verify with `curl -sI` on each pattern after deploy.

### BLOCKER 3 — Copyright says "© 2024" on every shipped page in 2026

- **Problem:** All 7 shipped pages footer reads `© 2024 Maple Moon. Handmade in Byron Bay, Australia.` It is 2026-04-18. A two-year-stale copyright reads as "dead/abandoned project."
- **Files:** `homepage.html:1541`, `collections/bars.html:230`, `our-story.html:306`, `faq.html:280`, `products/pure-carob-bar.html:377`, `products/peppermint-moon.html:372`, `products/spiced-elixir.html:398`
- **Fix approach:** Change all 7 footers to `© 2026 Maple Moon. Handmade in Byron Bay, Australia.` (or better: auto-inject year via a small `<script>` that writes `new Date().getFullYear()` into a `<span id="copy-year">` so this never rots again).

### BLOCKER 4 — Mobile nav: "Moons" and "Elixirs" both link to `/collections/bars.html`

- **Problem:** Every shipped page's mobile-menu `<div class="mobile-menu">` wires the "Moons" AND "Elixirs" nav items to `/collections/bars.html` (the Bars collection). Tap "Elixirs" on mobile → land on Bars. This will be the first thing tested when Dylan picks up his phone.
- **Files (all 7 pages, identical block):** `homepage.html:1169-1170`, `collections/bars.html:108-109`, `our-story.html:179-180`, `faq.html:142-143`, `products/pure-carob-bar.html:235-236`, `products/peppermint-moon.html:242-243`, `products/spiced-elixir.html:271-272`
- **Fix approach:** Either (a) decide these collections don't exist yet and remove the nav items, or (b) stub `/collections/moons.html` and `/collections/elixirs.html` as "Coming soon" placeholders and link them correctly, or (c) anchor-link them to `/homepage.html#range` which already has category tabs for Moons/Elixirs. Option (c) is the fastest honest fix.

### BLOCKER 5 — `collections/bars.html` meta description lists non-existent flavours

- **Problem:** Bars collection meta description says "seven flavours. Original, spiced pepperberry, coconut, coffee, peppermint, hazelnut, chilli" and title says "Seven Flavours". The page itself shows 6 bars: Pure Carob, Golden Coconut, Peppermint, Hazelnut, Chilli, Almond. "Spiced pepperberry" and "coffee" do not exist anywhere. "Almond" is missing from the meta list. Homepage bento tile also says "7 Flavours" but range grid has 6.
- **Files:** `collections/bars.html:6-7,10,132` (title/meta/copy), `homepage.html:1278` (bento "7 Flavours"), `homepage.html:1393-1402` (6 bars in grid)
- **Why Carli will find this:** She will read the meta on the social-share preview. Dylan may count products. The inconsistency makes the range feel unfinished.
- **Fix approach:** Get Carli's confirmed bar SKU list on the call. Until then, change all occurrences to "Six flavours" and drop the bogus flavour names. Safer: update meta to "Six flavours. Pure Carob, Golden Coconut, Peppermint, Hazelnut, Chilli, Almond. From $12.95." Fix bento count to match.

### BLOCKER 6 — Newsletter forms are non-functional (silent no-op on submit)

- **Problem:** Every page's newsletter form has `<form onsubmit="return false;">` and no JS handler, no Formspree action, no Mailchimp webhook. Clicking "Join" does nothing. Worse: no user feedback either (no "Thanks" message, no error). 8 instances across 7 shipped pages (homepage has two newsletter blocks — one on `.section--accent` cornflower band, one in footer).
- **Files:** `homepage.html:1512,1534`, `collections/bars.html:224`, `our-story.html:300`, `faq.html:274`, `products/pure-carob-bar.html:371`, `products/peppermint-moon.html:366`, `products/spiced-elixir.html:392`
- **Why Carli will find this:** She will test it. Everyone tests a newsletter form. Submit → nothing happens = "the site's broken."
- **Fix approach:** Two options. (a) **Disclose-and-disable** (fastest): add an inline note "Newsletter coming soon" and keep the form visually but disable the submit button. (b) **Wire Formspree** (~10 mins): create a Formspree endpoint for `info@maplemoon.com.au`, set `action="https://formspree.io/f/XXXX"` and `method="POST"`, drop `onsubmit` handler. CSP already allows `connect-src https://formspree.io` so this is ready. Recommend (b) — gets real signups for the coming shoot.

### BLOCKER 7 — "Add to Cart" buttons are non-functional on all 3 PDPs

- **Problem:** Every product page has `<button class="pdp-cta" type="button">Add to Cart</button>` with no click handler, no cart drawer, no Shopify wiring. Click → nothing happens visually.
- **Files:** `products/pure-carob-bar.html:286`, `products/peppermint-moon.html:281`, `products/spiced-elixir.html:309`
- **Why Carli will find this:** She will click it. Same reason as newsletter.
- **Fix approach:** Same two-option pattern. (a) Disable button with text "Pre-order — opening soon" or "Notify me" (opens a mailto or Formspree dialog). (b) Wire to Shopify once theme is live. Recommend (a) for Sunday. Even swapping to a disabled state with `Coming Soon` is better than a dead button.

### BLOCKER 8 — "Price TBD" showing on Spiced Elixir PDP

- **Problem:** `products/spiced-elixir.html` has `<p class="pdp-price">Price TBD</p>` live on prod. Reads as "we haven't figured out our business yet."
- **File:** `products/spiced-elixir.html:307`. Also referenced as `"Coming soon"` in related-products grids on both `pure-carob-bar.html:331` and `peppermint-moon.html:326`.
- **Fix approach:** Either remove the Spiced Elixir from range entirely until priced, or put a specific placeholder like "$18.95 (launching May)". Do NOT ship with "Price TBD" as a visible string.

### BLOCKER 9 — Duplicate stock image used for two different story sections

- **Problem:** `our-story.html` uses `/assets/stock/stock_carob_pods_hand.jpg` **twice** — once for the "Origin" section (hand holding pods) and again for the "Process" section (which is meant to illustrate the Byron Bay kitchen / small-batch handmade workflow). Same image, same alt text. Reads as "we ran out of photography" (which is true per PHOTOGRAPHY_PIPELINE_REPORT.md, but shouldn't look that way).
- **File:** `our-story.html:223,241` (both `<img src="/assets/stock/stock_carob_pods_hand.jpg">`)
- **Why Carli will find this:** She is a founder. She will read the Story page top-to-bottom.
- **Fix approach:** Swap the Process image to a different asset. Candidates on disk: `/Users/handtomouse/maplemoon-website/assets/hero_shots/hero_bar_carob_pods_studio.png` or a lifestyle shot from `assets/lifestyle/`. If nothing fits, crop a different detail of the same source and use that. Last resort: hide the second image entirely and keep the Process section text-only.

### BLOCKER 10 — "$99 free shipping / $16.95 shipping / info@maplemoon.com.au" are unconfirmed facts

- **Problem:** `faq.html` hardcodes shipping prices ($16.95, free over $99), 1-2 day dispatch, and `info@maplemoon.com.au` as the support/wholesale email in two places. If these numbers or the email address are not confirmed by Carli, shipping live is a commitment the brand may not be able to fulfil.
- **Files:** `faq.html:209,215,221,227,236`
- **Fix approach:** Confirm these with Carli before meeting OR pull the dollar figures and swap the placeholder email into "Contact us at our Instagram DMs" or similar until email is live.

---

## FLAG — Disclose upfront in the meeting

### FLAG 1 — `hero_v12.html` visible in sources despite being in `.vercelignore`

- **Problem:** `.vercelignore` lists `hero_v3.html` and `hero_v12.html` but most other prototype HTML files are NOT excluded. The inconsistency suggests the ignore was built ad-hoc and is incomplete. Depending on how Vercel resolves the ignore, specific files may still be reachable. Safer to rewrite top-to-bottom (see BLOCKER 2).
- **Files:** `.vercelignore:24-25`
- **Disclosure line:** "We have 19 design iterations in the repo as reference artifacts. We'll be sweeping them out of the deployed build in Phase 2 polish."

### FLAG 2 — Product grid links: 5 of 6 bars route to `href="#"`

- **Problem:** On `collections/bars.html` and `homepage.html` range grid, only the Pure Carob bar has a real PDP (`/products/pure-carob-bar.html`). The other five (Golden Coconut, Peppermint, Hazelnut, Chilli, Almond) all link to `href="#"` — click and the page just scrolls to top.
- **Verified count:** `grep -c 'href="#"' collections/bars.html` = 5, `homepage.html` = 15 (includes moons/bites/elixirs grid placeholders too)
- **Files:** `collections/bars.html:143,148,153,158,163`, `homepage.html:1378,1383,1388,1393,1398` (bars), plus moon/bite/elixir hidden cards
- **Why Carli will find this:** She will click a bar that isn't Pure Carob. The dead link scroll-to-top is obvious.
- **Disclosure line:** "Only Pure Carob, Peppermint Moon, and Spiced Elixir have live product pages today. The other variants will be built once we have confirmed photography and pricing for each SKU." This positions the scope honestly.

### FLAG 3 — Real product photography is missing; all PDPs use one static WebP each

- **Problem:** Pure Carob PDP has a thumbnail gallery with 2 "Coming soon" slots (deliberate TODO Phase 2 comment in markup). Peppermint Moon and Spiced Elixir PDPs have no gallery at all — just a single webp. Per `PHOTOGRAPHY_PIPELINE_REPORT.md`, real product photography has not happened yet.
- **Files:** `products/pure-carob-bar.html:267,275,277` (three `TODO Phase 2:` comments in markup — these comments are visible in page source), `products/peppermint-moon.html`, `products/spiced-elixir.html`
- **Disclosure line:** "Product photography is Phase 2. The current PDPs are scaffolded around single web-optimised shots — when your photographer delivers, we swap in the gallery strip, lifestyle shots, and ingredient close-ups already stubbed in the markup."

### FLAG 4 — Homepage has a `<!-- TODO Phase 2: wire ... -->` comment live in production HTML

- **Problem:** `homepage.html:1467` contains `<!-- TODO Phase 2: wire mm_refined_hero_c2_byron_a.png as atmospheric bg here -->`. It is an HTML comment so invisible on screen, but view-source or right-click → Inspect exposes it. Dylan specifically may View Source.
- **Files:** `homepage.html:1467`, `products/pure-carob-bar.html:267,275,277`
- **Fix approach:** Either delete the TODO comments before Sunday (5 min) or leave them and flag as roadmap notes in disclosure.

### FLAG 5 — Sans-serif/serif depend on locally-installed Adobe Fonts

- **Problem:** `brand_kit.css` declares fonts via `@font-face` with `src: local('P22 Mackinac Pro Book')...`. This works only if the user has the fonts installed locally (which Nate and the team do). External visitors fall back to `Georgia`/`Helvetica Neue` — which doesn't match the brand.
- **Files:** `assets/brand_kit.css:99-106`
- **Disclosure line:** "We're running on local font references right now. Phase 2 wires up the Adobe Fonts web CDN — you'll see typography look slightly different on this machine vs a clean browser until we hook that up."

### FLAG 6 — "Handmade in Byron Bay" / "Australian-grown carob" are claims that need legal sign-off

- **Problem:** Copy asserts "Australian-grown carob," "handmade in small batches in our Byron Bay kitchen," "organic Australian carob and cacao butter," "certified organic." These are trade claims. If any aren't literally true at launch (e.g., "certified organic" requires certifier paperwork), the site exposes the brand to ACCC/ASIC action.
- **Files:** `homepage.html:1348-1349`, `our-story.html:219,236-238`, `faq.html:183-191`, every PDP detail tab
- **Disclosure line:** "The copy claims certified organic, Australian-grown, and vegan. Before you go live publicly, double-check your organic certifier, sourcing paper trail, and kitchen location language with your lawyer. We can soften any claim to 'naturally grown' / 'small-batch' in one pass if needed."

### FLAG 7 — `homepage_backup.pdf` (5.5 MB) is publicly accessible

- **Problem:** `curl -sI https://maplemoon-website.vercel.app/homepage_backup.pdf` returns `HTTP/2 200`. Anyone who guesses the filename (or scrapes directory listings) gets a full PDF snapshot of the homepage design. If the PDF contains internal annotations, SPIN notes, or alternate hero options, those leak too.
- **Files:** Root `/Users/handtomouse/maplemoon-website/homepage_backup.pdf`
- **Fix:** Add `*.pdf` to `.vercelignore` and redeploy (same change as BLOCKER 2). Safe to delete from repo entirely — it's a backup, not a runtime asset.

### FLAG 8 — All 11 hero product images use `loading="eager"`

- **Problem:** The hero "flavour picker" loads all 11 product webps up-front (`bar_pure_carob.webp`, `bar_goji_coconut.webp`, ..., `elixir_spiced.webp`). Each is 60–130 KB, so ~1 MB of images before first paint on the homepage. LCP suffers on mobile 4G.
- **Files:** `homepage.html:1207-1220`
- **Fix:** Keep `bar_pure_carob.webp` as `loading="eager" fetchpriority="high"` (already set line 1207), swap the other 10 to `loading="lazy"`. They hide behind `opacity:0` until user picks a flavour — no visible lag from lazy-loading.

---

## NOTE — Backlog

### NOTE 1 — 6-product grids collapse to 2-column on mobile

- Collections/Bars: 6 bars, mobile = 3 rows of 2. Works. Desktop = 3 columns. Works. No action.

### NOTE 2 — `vercel.json` CSP still permits `'unsafe-inline'` for style and script

- `vercel.json:19` CSP header. Needed because every page has inline `<style>` and inline `<script>` blocks. Future hardening: extract all inline CSS/JS to `brand_kit.css`/`shared.js`, switch CSP to nonce-based. Effort: 1-2 days.

### NOTE 3 — 37 HTML files in root is hard to navigate

- Prototype files (`hero_v*.html`, `product_v*.html`, etc.) clutter root. Once BLOCKER 2 moves them out of the deployed build, consider also moving them into `_prototypes/` subfolder so they stop appearing in editor file-pickers. Git blame history is preserved via `git mv`.

### NOTE 4 — `server.js` / `express` dependency appears unused in deployed build

- `package.json:13` has `express: ^5.2.1` and `server.js` exists but Vercel serves static files directly (`outputDirectory: "."`). `server.js` is only used for local `npm start`. Not a risk, but clean up if repo gets audited.

### NOTE 5 — 40 background backup files (`.bak`, `.r20_pre_edit`, `.r20_d20_*`)

- Clean up once the prototype-to-production pass is done. Git history preserves them. Delete them to reduce Claude Code / editor file list noise.

### NOTE 6 — Desktop layout: Elixir mode "dark nav" intersection observer fires on Elixir bento tile only

- `shared.js:66-81` nav-dark observer is wired to `[data-nav-dark="true"]`. The homepage has 3 of these: the "What is carob" editorial break (line 1262), the Elixir bento tile (line 1312), and the "Byron Bay" editorial break (line 1466). Nav goes dark when any of them are >50% in viewport. Working as intended but the transition can feel jumpy on slow scroll. Tune `rootMargin` if Carli comments.

### NOTE 7 — Source PNG directory (569 MB) is committed to git

- `assets/product_shots/*.png` source files (avg 8 MB each) are in the repo. Only the `.webp` versions are served. Safe to move PNGs to a `_source/` dir excluded from `.vercelignore` AND `.gitignore` them (regenerate from design tools on demand). Reduces repo clone time from ~1.4 GB to ~100 MB.

### NOTE 8 — `hero-cta` "Shop Pure Carob" button anchor-scrolls to `#range` not `/products/pure-carob-bar.html`

- `homepage.html:1254` — CTA says "Shop Pure Carob" but goes to `#range` section on same page. Either change CTA text to "See the Range" or retarget the link to `/products/pure-carob-bar.html`. Small copy-vs-behaviour mismatch.

### NOTE 9 — Keyboard nav works for category tabs but not flavour pills

- `homepage.html:1675-1681` wires ArrowLeft/ArrowRight for `.hero-cat-btn` (Bars/Moons/Bites/Elixirs) but flavour pills (`.flavour-btn`) are plain buttons without arrow-key cycling. Not a WCAG failure (they're focusable and clickable) but tab order is long. Accessibility polish, not critical.

### NOTE 10 — `Add to Cart` button on pure-carob-bar uses `.btn .btn--primary` utility classes; the other two PDPs don't

- `products/pure-carob-bar.html:286` → `class="pdp-cta btn btn--primary"`. Other two PDPs → `class="pdp-cta"` only. Inconsistent. Pick one. `shared.css` doesn't seem to define `.btn.btn--primary` (verify).

---

## Test Coverage Gaps (unchanged from prior audit)

**No automated accessibility, Lighthouse, or visual regression testing.** Playwright e2e suite exists for Pureairo but not MapleMoon. Consider porting Pureairo's viewport-matrix test pattern once V1 stabilises.

---

## Summary Priority Table

| # | Finding | Priority | Fix Effort |
|---|---------|----------|------------|
| 1 | Root URL serves prototype gallery, not homepage | **BLOCKER** | 5 min (vercel.json redirect) |
| 2 | 30+ internal HTML files deployed to prod | **BLOCKER** | 15 min (rewrite .vercelignore + redeploy) |
| 3 | Copyright "© 2024" on every page in 2026 | **BLOCKER** | 5 min (sed replace) |
| 4 | Mobile nav Moons/Elixirs both route to Bars | **BLOCKER** | 10 min (anchor-link to #range) |
| 5 | Bars meta says 7 flavours with 2 bogus names; page has 6 | **BLOCKER** | 10 min (rewrite meta, fix bento count) |
| 6 | Newsletter forms are silent no-ops (8 instances) | **BLOCKER** | 10 min disable OR 30 min Formspree wire |
| 7 | Add to Cart buttons do nothing | **BLOCKER** | 10 min (disable + "Notify me" copy) |
| 8 | "Price TBD" visible on Spiced Elixir PDP | **BLOCKER** | 2 min |
| 9 | Our Story re-uses same stock image twice | **BLOCKER** | 10 min (swap one) |
| 10 | Unconfirmed shipping $ and support email in FAQ | **BLOCKER** | Ask Carli on call |
| F1 | `.vercelignore` incomplete even for listed files | FLAG | Covered by BLOCKER 2 |
| F2 | 5 of 6 bars link to `href="#"` | FLAG | Disclose scope |
| F3 | Real product photography missing | FLAG | Disclose Phase 2 |
| F4 | TODO comments in production HTML | FLAG | 5 min strip, or disclose |
| F5 | Adobe Fonts not web-loaded | FLAG | Disclose, backlog |
| F6 | Trade claims ("certified organic") need legal sign-off | FLAG | Client homework |
| F7 | `homepage_backup.pdf` public | FLAG | Covered by BLOCKER 2 |
| F8 | All 11 hero images eager-loaded | FLAG | 5 min one-line fix post-meeting |

---

**Meeting recommendation:** Fix BLOCKERS 1-9 before Sunday 4pm (total effort ~90 min). BLOCKER 10 becomes a meeting agenda item. Open the call with a short "before we walk through, here's what's stubbed vs shipped" preamble covering FLAGS 2, 3, 5, 6. Everything else is backlog.

*Concerns audit: 2026-04-18*
