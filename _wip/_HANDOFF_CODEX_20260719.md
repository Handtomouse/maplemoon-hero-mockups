# MapleMoon Website — Section Review Loop Handoff
**Generated**: 2026-07-19  
**Handed off by**: Claude (Sonnet 4.6) → Codex  
**Priority**: High — MM meeting 7pm Monday 20 Jul  
**Dev server**: :3005 (node, static)

---

## What this is

Section-by-section content review loop across 4 pages of the MapleMoon `_wip` static HTML build. Carli (co-founder) sent a content brief today with all website copy. The task is to integrate her exact copy into the HTML files, section by section.

**Rule: integrate Carli's exact copy — don't rewrite or improve it.**

---

## Content source

`~/UFC/ops/handoffs/handoff_20260719_mm_carli_doc_content.md`

Contains: bar pricing, product descriptions/ingredients, full homepage copy, full Our Story copy, Why Carob bullets, complete stockists list (71 retailers).

---

## Files being edited

All edits stay in `_wip/`. Do NOT deploy or push.

- `~/maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html` (1061 lines, 82KB)
- `~/maplemoon-website/_wip/shop.WIP.html`
- `~/maplemoon-website/_wip/our-story.WIP.html`
- `~/maplemoon-website/_wip/stockists.WIP.html`
- `~/maplemoon-website/_wip/_SECTION_TRACKER.html` — update `|cleared` flags as you go

---

## Completed this session

### Homepage sections DONE (no further action needed)

| Section | Status | What changed |
|---|---|---|
| 1 Hero | cleared (prior session) | — |
| 2 Product lineup carousel | cleared | Bar prices $5.50→$12.95; elixirs $12→$23.95/$26.95 |
| 3 Selected bar PDP block | cleared | Static price updated; pricing flag scoped to unconfirmed SKUs |
| 4 Product detail | cleared | SIZES.bars updated to Carli's bundle tiers ($12.95/$61.50/$116.95); elixir size updated to 150g jar |
| 5 What is Carob | cleared (keep) | No Doc copy for this section — current editorial copy stands |
| 6 Why not cacao | cleared (keep) | No Doc copy for this section — comparison cards stand |

**Pricing note**: Moons, plain bites (coconut/goji/golden), bananas — pricing NOT in Carli's doc. Nate confirmed we need to get these from Carli & Dylan before updating. Current prices are indicative placeholders. Eclipse Bites show $5.99-$59.99 in the Doc but interpretation is ambiguous — hold.

---

## What Codex needs to do

### HOMEPAGE — sections 7-13

Work through each section in order. For each: read the current HTML, make the change, note before/after.

---

#### Section 7: When do you moon (Ritual Moment)
**Location**: `id="ritual"`, approx line 628  
**Current**: qkick "A sweeter kind of ritual" / h2 "When do you moon?" / 3 ritual tiles (no intro copy)  
**Change**: Add Carli's ritual paragraph as a lead-in between the headline and the `.tiles` div.

Carli's copy (from Doc, "The Ritual Moment"):
> Maple Moon isn't just a treat, it's a moment of presence. A slow-evening indulgence, a shared bite with little ones, a pause in your day. Our handcrafted carob creations turn simple moments into mindful ones.

Note: the Doc has "isn't just a treat — it's" with an em dash. Replace with comma as above. No other em dashes.

Add as a `<p>` with `style="color:var(--ink-soft);font-size:1.05rem;max-width:54ch;margin:0 0 32px;"` between the `lux-hd` h2 and the `.tiles` div.

The 3 tiles (After dinner / Afternoon reset / With tea at night) have no equivalent Doc copy — keep them exactly as-is.

The Doc also mentions a CTA "Explore Rituals & Recipes" — omit for now (no rituals page exists yet in the WIP build).

---

#### Section 8: From Brunswick Heads (Our Story tease)
**Location**: `id="story"`, approx line 642 (the `wf-where1` full-bleed band)  
**Current**: qkick "Where it happens" / h2 "From Brunswick Heads." / body about small batches / "Read our story" CTA  
**Change**: Update headline, body, and CTA to Carli's "Our Story tease" copy.

Carli's copy (from Doc):
- Keep qkick: change to "Our story"
- h2: "Born from Nighttime Cravings & Kind Intentions"
- Body: "Our co-founder, Carli, created Maple Moon to answer a simple need, a truly delicious treat without caffeine or buzz. What started as one flavour evolved into a full range of handcrafted carob creations loved by health-conscious treat lovers of all ages."
  - Note: Doc had em dash "a simple need — a truly" → replace with comma (done above)
- CTA text: change "Read our story" → "Read the Full Story" (keep href="our-story.WIP.html")

The `.co` annotation callouts (Sun-ripened, Small batches, The far north coast) on the photo — keep them as-is.

---

#### Section 9: Who — Carli & Dylan
**Location**: `id="who"`, approx line 659  
**Current**: strong "Who makes it? Two humans and a moon." / span "Carli and Dylan hand-pour every batch. No factory, no shortcuts, no cocoa multinationals in sight."  
**Change**: Update with Carli's founders intro.

- strong: "Carli & Dylan"
- span: "They met in a health food store, a fitting beginning for two people who believe deeply that what we eat affects how we feel, physically and emotionally."
  - Note: Doc had "health food store — a fitting beginning" with em dash → replace with comma (done above)

Keep CTA: "Meet Carli & Dylan" → href="our-story.WIP.html"

---

#### Section 10: Stockists marquee
**Location**: `id="stockists"`, approx line 667  
**Current**: "Harris Farm · Goodness Me Boxes · QE Health Foods · Selected stockists" (×2 for scroll loop)  
**Change**: Replace with real confirmed stockist names from the Doc. Use a representative selection of ~18 names (enough for the marquee to feel full; not all 71 as that bloats the animation).

Suggested selection (mix of national chains + independents):
WholeLife Pharmacy, Seasons IGA, GoVita Ballina, GoVita Blacktown, Maloneys Coogee, Maloneys Rozelle, Maloneys Surry Hills, Health Emporium, Ripe Organics, Village Greens, Turramurra Wholefoods, Surfcoast Wholefoods, Fill Good Bulk Store, In2Health, Patterson's Organics, Harpers Food Market, Goodness Me, Five Vegans

Each name: `<span>Name</span><i></i>` pattern. The track is doubled for infinite scroll, so repeat the full set twice.

Also update the footer note from "Stockist lineup being confirmed · logos to follow" to "70+ stockists across Australia · full list at maplemoon.com.au/pages/stockists"

---

#### Section 11: Reviews / quote
**Status**: CONTENT-PENDING — Carli has not supplied testimonials.  
**Action**: Do NOT invent quotes. Update placeholder slide text to make it clearly a content placeholder for the client to fill.

Update the 3 `.qslide` blocks:
- Slide 1: `<p class="q serif">"[Testimonial — to be supplied by Carli]"</p><p class="who">Real customer review · coming soon</p>`
- Slide 2: `<p class="q serif">"[Testimonial — to be supplied by Carli]"</p><p class="who">Real customer review · coming soon</p>`
- Slide 3: `<p class="q serif">"[Testimonial — to be supplied by Carli]"</p><p class="who">Real customer review · coming soon</p>`

Mark in the tracker as `content-pending` (not `cleared`). This section does NOT get a `|cleared` flag.

---

#### Section 12: Try every flavour (sampler)
**Location**: `id="sampler"`, approx line 691  
**Current**: price shows "$ TBC (six bars)" / "Indicative pricing · final pricing to be confirmed" flag  
**Change**: Update to confirmed bundle price from Doc.

- `sbox-price` div: change `$ TBC<span class="g">(six bars)</span>` to:
  `<s style="font-size:1.1rem;color:var(--ink-faint);font-weight:400">$77.70</s> $73.82<span class="g"> (6 bars, 90g each)</span>`
- Remove `wf-pflag` "Indicative pricing" line entirely from this section (it's confirmed)
- The 6 flavours list is already correct — keep as-is

---

#### Section 13: Trust bar
**Location**: `id="trust"`, approx line 727  
**Current**: first `.wf-ti`: "Free Shipping / On orders over $60"  
**Change**: Update shipping threshold to match Doc.

- strong: keep "Free Shipping"
- span: change "On orders over $60" → "On orders over $99"

The other 3 trust items (Secure Payments, Find Us In, Journal) — keep as-is.

---

### SHOP PAGE — sections (all content)

File: `shop.WIP.html`

The shop page's JS catalog also has placeholder pricing. Update the same way:

In the `CAT` JS object (approx line 280):
- `bars`: all prices '$5.50' → '$12.95', size '90g' stays
- `elixirs`: Pure Carob Elixir '$12.00' → '$23.95' size 'jar' → '150g'; Spiced '$12.00' → '$26.95' size 'jar' → '150g'
- `bites`: Eclipse products (Almond, Hazelnut, Pecan) — leave as placeholder until Carli confirms
- `moons`, `bananas`: leave as placeholder until Carli confirms

Also remove the shop page `.sp-flag` "Indicative pricing · final pricing to be confirmed" div — replace with: "Bars & elixirs priced · moons, bites & bananas pricing to follow"

Section tracker for Shop: mark Bars section as cleared, leave others as pending.

---

### OUR STORY PAGE — all sections

File: `our-story.WIP.html`

The Our Story page has a basic structure but needs Carli's full story copy dropped in. The page currently has placeholder editorial copy. Replace with Carli's exact words.

**Section: Hero — on its own terms**
Current h1: "Carob, on its own terms."  
Current p: "Naturally sweet, caffeine free, and grown right here in Australia. We make carob because we love what it is, not what it stands in for."

From Doc ("Simple. Clean. Grounded."): Keep the hero as-is — it's a good intro and aligns with the Doc's tone. The full Doc narrative starts at "How Maple Moon Began" and goes into the body sections.

**Section: The question (ch 01 — Why carob)**
Current: "It started with a question: why is carob treated as a substitute?"  
Current body: "Carob isn't trying to be chocolate..."

Replace with Carli's "How Maple Moon Began" copy:
> Maple Moon began simply, with a craving. Our co-founder Carli was searching for a sweet evening treat that felt good in her body. Something indulgent, comforting, and grounding, without the buzz or stimulation of caffeine.
> After making her own raw cacao creations, she began noticing something wasn't right. Even in the evenings, she felt jittery, wired, and restless. That's when she realised cacao naturally contains caffeine, and because of its bitterness, it's often paired with heavily processed sweeteners.
> So she asked a different question: Why should indulgence come at the cost of rest?
> That's when she turned to carob. Naturally sweet. Caffeine-free. Gentle and grounding.
> But there was a problem, no carob products on the market met her standards. Most contained lectins, stabilisers, or were overly processed. So she stripped it all back and made her own.

Note: Em dashes in the Doc replaced with commas above. Keep the `os-chap` label "Why carob" or change to "How it began".

**Section: Pull quote (os-quote)**
Current: "Everything we make comes back to the pod."
From Doc: "So she asked a different question: Why should indulgence come at the cost of rest?"
Replace with Carli's rhetorical question as the pull quote. It's more powerful.

**Section: Made by hand band (ch 02)**
Current: "Made by hand, batch by batch." + process description
From Doc ("A Brand That Feels Like Home"): 
> Our treats are handcrafted in small batches using organic, vegan ingredients, free from preservatives, stimulants, and unnecessary additives. Each batch is made with care and intention, so indulgence feels nourishing, not taxing.

Replace the body paragraph with Carli's copy. Keep h2 "Made by hand, batch by batch."

**Section: From Brunswick Heads (ch 03)**
Current: "From Brunswick Heads, far north coast NSW." + body about small batches staying in their hands.
From Doc ("Simple. Clean. Grounded."):
> We are beach babies. Earthlings at heart. People who love quiet days, salty air, bare feet and the gentle hum of nature. Maple Moon reflects how we live, simple, clean, organic, and guided by nature's rhythm rather than trends.
> We aren't corporate, but we are intentional. And we believe everyone deserves a healthy, guilt-free treat they can enjoy themselves and confidently share with their children.

Replace body paragraphs with this. Keep h2 "From Brunswick Heads, far north coast NSW." (it works with the photo). Note: Doc has "We aren't corporate — but we are intentional" with em dash; replace with comma.

**Section: Founders — Carli & Dylan**
Current: "Carli & Dylan" / "Maple Moon is Carli and Dylan. Together they make every carob bar..." / "Small batches, made by two pairs of hands."
From Doc ("Meet the Founders"):
> Carli & Dylan met in a health food store, a fitting beginning for two people who believe deeply that what we eat affects how we feel, physically and emotionally.
> Together, they began creating flavours that are rich, joyful, and deeply satisfying, an explosion of sensation without caffeine or guilt.
> Maple Moon (affectionately known as "the vegan ultimate honeymooning experience") is a true reflection of who they are and what they value: nourishment, simplicity, love, and connection.

Replace both `<p>` tags and the `.sig` line with Carli's copy (3 paragraphs). Note em dash replacements above.

**Section: Gallery**
Current: 5-image editorial grid with note "Photographed at the Maple Moon studio session, May 2026."
No change — no gallery copy in Doc. Keep as-is. Cleared.

**Section: CTA — taste it**
Current: "Taste it for yourself." + body about bars, moons, bites, elixirs + "Shop the range" CTA
From Doc ("An Invitation"):
> Maple Moon is more than a treat. It's a ritual. A pause. A moment of care for your nervous system, your body, and your evenings.
> We invite you to slow down, savour deeply, and enjoy something that tastes as good as it feels.
> Try Maple Moon, for presence, pleasure, and peace under the moon.

Replace body paragraph. Keep h2 "Taste it for yourself." Update CTA stays "Shop the range" → "Try Maple Moon".

---

### STOCKISTS PAGE — all sections

File: `stockists.WIP.html`

**Section: Coming soon to (st-sec)**
Current: 3 placeholder cards (Harris Farm, Goodness Me Boxes, QE Health Food Stores)
Change: Replace the entire `.st-grid` with two sections: National Chains and Independent Stores, using real data from the Doc.

The current layout uses `.st-card` components in a 3-col grid. Replace with two `<section>` blocks, each with a heading and an alphabetical list (or cards) of stockists.

**National Chains** (from Doc):
Barr St Wholelife Pharmacy & Healthfoods, Belgian Gardens WholeLife Pharmacy & Healthfoods, Cooroy Market Garden, FARMER AND SUN, HAWTHORNE GARAGE, Hervey Bay WholeLife Pharmacy & Healthfoods, Hillsdon Grocer, MAUD ST. IGA MAROOCHYDORE, IGA ST LUCIA, Mandurah WholeLife Pharmacy & Healthfoods, Maroochydore Wholelife Pharmacy & Healthfoods, Tewantin Market Garden, Mt Gravatt WholeLife Healthfoods Markets, Newmarket Wholelife, Pacific Fair WholeLife Pharmacy & Healthfoods, Seasons IGA Noosa, Seasons IGA Burpengary, Seasons IGA Cooroy Garnet Street, Seasons IGA Maleny, Strathpine Wholelife Pharmacy & Healthfoods, The Olive Branch Health Food Store, WholeLife Healthfoods Market Fairfield, Wholelife Healthfoods Market Cairns Central, WholeLife Healthfoods Markets Smithfield, Wholelife Pharmacy Dee Why, Seasons IGA Wises Rd

**Independent Stores** (from Doc):
Bangalow General Store, Bangalow Herbal Wisdom, Brunswick Wild Octaves, Brunswick Post Shop, Crabbes Creek, Garden of Goodness, EatRawOrganic, Fill Good Bulk Store, Five Vegans, FoodForThought, Foodies Organic, Good Vibes, GoVita Ballina, GoVita Blacktown, Gulaga Wholefoods, Harpers Food Market, Health Emporium, In2Health, Maloneys Coogee, Maloneys Rozelle, Maloneys Surry Hills, Maloneys Woollahra, Mornington Coastal Pharmacy, Mybelle Pantry, Navana Life, Nourish Bulk Ballina, Patterson's Organics, Pavillion Hampers, Plump Organic Grocery Store, Priceline Sydney (Julie), Raw Bulk Wholefoods, Red Earth Wholefoods, Riderau, Ripe Organics, Riverland Healthfoods, Surfcoast Wholefoods, Turramurra Wholefoods, Taste Organic Cammeray, Taste Organic Enmore, The Organic Grocer Tas, Village Greens, Wellness on William, Wholefoods Wangaratta, Wholefoods Wodonga, Goodness Me

Suggested layout: replace the 3-card `.st-grid` with two `<div class="st-list-block">` sections. Each has a `<h3>` heading and a two-column grid of stockist names (simple `<ul>` or pill tags). Use existing `.sp-kick` for the section headings.

Update the page header copy:
- Current: "The lineup is being confirmed as we launch. Until the first shelves are stocked, everything is made to order from Australian organic carob."
- Update to: "Find Maple Moon at 70+ health food stores, pharmacies and grocers across Australia."
- Remove `.sp-flag` "Launching soon · stockist list to be confirmed"

**Section: Trade (st-trade)** — keep as-is, no Doc copy for this.

**Section: Newsletter (st-news)** — keep as-is.

---

## Rules (NON-NEGOTIABLE for all edits)

1. **NEVER use em dashes** in copy. Replace with comma, colon, or line break.
2. **Use Carli's exact copy** — don't rewrite, improve, or paraphrase.
3. **Do NOT deploy or push** — edits stay in `_wip/`.
4. **Do NOT send any messages** to Carli, Dylan, or anyone.
5. **Reviews block**: Carli has not supplied testimonials. Use `[Testimonial — to be supplied by Carli]` placeholder. Do NOT invent quotes.
6. **Moons / bites / bananas pricing**: not confirmed from Carli. Leave as indicative.

---

## Section tracker updates

After each section, update `_SECTION_TRACKER.html`. In the JS `D` object, add `|cleared` to section names as you complete them.

Example: `"Product lineup carousel"` → `"Product lineup carousel|cleared"`

Sections already cleared this session (update the tracker):
- Homepage sections 1-6: all `|cleared`

---

## After all pages done

1. Update `_SECTION_TRACKER.html` to reflect final cleared count
2. Open the tracker in Chrome to verify the progress bar
3. Save a checkpoint

---

*This handoff file: `~/maplemoon-website/_wip/_HANDOFF_CODEX_20260719.md`*
