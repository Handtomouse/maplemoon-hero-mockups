# Reviews Placeholder Section Review

Target: `_wip/homepage_real_1_lead_photo.WIP.html`, section `id="reviews"`.

Tracker status: keep `Reviews / quote|content-pending`. Carli has not supplied testimonials, so this section must not be marked cleared.

Preview note: the requested `:3005` URL was not responding cleanly because stale listeners are bound to that port. I used a temporary plain static preview on `:3105` for DOM measurements only. No screenshot files or repo files were created for that check.

## Current Read

The section is styled as an editorial pull quote between the stockist marquee and the starter box. It has the right overall restraint for Maple Moon: centered serif text, soft top rule, small uppercase attribution, circular arrow controls, and minimal dots.

The problem is that the placeholder is currently presented with the weight and behavior of a real testimonial carousel. The page shows three identical pending slides, auto-rotates them every 6.5 seconds, and gives the user previous and next controls even though there is no real content to browse.

Measured behavior:

- Desktop 1440px: section is 296px tall, quote text renders at 32px, track is 720px wide, three slides exist in the DOM, one is visible.
- Mobile 390px: section is 268px tall, quote track narrows to 194px between arrow buttons, placeholder quote wraps to three lines, the attribution wraps to two lines.
- Section spacing is flush to both neighboring sections, with the border carrying the transition.

## Issues

1. The bracketed placeholder becomes the main visual message. At quote scale, it reads like an internal production note rather than a polished content-pending state.

2. The current placeholder contains a long dash in visible copy. The rest of this content pass is avoiding that punctuation style.

3. `Real customer review` under a bracketed non-review is a mixed signal. It correctly promises real content later, but the label can be read as if this is already a real review.

4. The carousel affordance is misleading while all three slides are identical. Arrows, dots, and timed rotation imply selectable content, but every interaction produces the same pending message.

5. The `aria-live` track will announce auto-rotated placeholder changes. Because the slides are identical, that creates noise without useful state change.

6. On narrow mobile, the arrows take 140px of horizontal space including gaps, leaving only 194px for the placeholder text. That makes the empty state feel cramped and more technical.

7. There is no visible section label. A real quote can survive without one, but a pending state benefits from a small `Reviews` label so the user understands what will live here later.

## Option A: Single Polished Pending Hold

Replace the carousel with one static, centered pending message. Keep the editorial quote styling, add a small `Reviews` kicker, remove arrows and dots until real testimonials exist.

Suggested visible copy:

```html
<span class="qkick">Reviews</span>
<p class="q serif">Real customer quotes are coming soon.</p>
<p class="who">Awaiting approved testimonials</p>
```

Why it works: this is honest, polished, and removes fake carousel behavior. It also keeps the section visible as a content slot for Carli without pretending the content exists.

Tradeoff: the page temporarily loses the richer carousel shape. That is the right tradeoff until at least two real quotes are supplied.

## Option B: One-Slide Carousel Shell

Keep the `qslider` structure but reduce it to a single visible pending slide, hide arrows and dots while the section is pending, and turn off `aria-live`.

Suggested visible copy:

```html
<p class="q serif">Real customer quotes are coming soon.</p>
<p class="who">Awaiting approved testimonials</p>
```

Why it works: this preserves the future carousel markup, so adding testimonials later is a smaller HTML change.

Tradeoff: it still leaves a carousel shell in the code for a non-carousel state. It is cleaner than the current version, but less clear than Option A.

## Option C: Thin Content-Pending Strip

Collapse the section into a compact rule-separated strip with a small label and one line of copy:

```html
<span class="qkick">Reviews</span>
<p class="who">Customer testimonials are pending approval.</p>
```

Why it works: it avoids giving empty social proof too much page weight and keeps momentum into the starter box.

Tradeoff: it may feel too small for a section that will eventually carry trust. If the client is reviewing the full homepage structure, a fuller placeholder is more helpful.

## Recommended Option

Use Option A now.

It is the best balance of polish, honesty, and implementation scope. It avoids invented praise, removes redundant interaction, and gives Carli a clear content slot to fill later. Keep the tracker as `content-pending`.

## Exact Scoped Patch Suggestion

Patch only the `#reviews` section markup and add the pending-state CSS near the existing testimonial styles. Do not change `_SECTION_TRACKER.html` except to leave the existing `content-pending` status intact.

Add this CSS beside the current `.wf-quote` rules:

```css
.wf-quote.pending{text-align:center;padding:clamp(52px,6vw,72px) 0;border-top:1px solid var(--line-soft);}
.wf-quote.pending .reviews-pending{max-width:620px;margin:0 auto;}
.wf-quote.pending .qkick{margin-bottom:14px;}
.wf-quote.pending .q{font-family:var(--mm-serif);font-weight:400;font-size:calc(clamp(1.45rem,2.4vw,2rem) * var(--h-scale));line-height:1.35;color:var(--ink);max-width:22ch;margin:0 auto 14px;}
.wf-quote.pending .who{font-size:.64rem;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-faint);}
```

Replace the current `#reviews` section with this:

```html
  <!-- TESTIMONIAL (real reviews pending) -->
  <section class="wrap wf-quote pending" id="reviews" aria-label="Reviews">
    <div class="reviews-pending">
      <span class="qkick">Reviews</span>
      <p class="q serif">Real customer quotes are coming soon.</p>
      <p class="who">Awaiting approved testimonials</p>
    </div>
  </section>
```

Why this patch is safely scoped:

- No real reviews are invented.
- No testimonial source is implied.
- The existing quote-carousel JavaScript exits early because `.qslide` no longer exists.
- The section remains visible and content-pending.
- The copy contains no long dash punctuation.
