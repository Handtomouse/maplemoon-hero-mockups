# Range Detail Block Brand CSS Research - 2026-07-20

Scope: the selected product / CTA / format tabs / supporting collection copy block only. No hero rethink, no product shelf rethink, no new claims or copy.

## Subject, Audience, Job

Subject: MapleMoon's homepage range detail handoff for Australian organic carob.

Audience: a first-time visitor who has just seen the hero and the product shelf, and needs to understand what the selected product is and where to go next.

Single job: make the selected bar feel calm, premium, and actionable without letting the format tabs or the supporting collection copy compete for primary attention.

## Local Brand CSS Findings

### Existing Brand Tokens

- Cream: `#E7E4CA` / `--mm-cream`
- Navy: `#1E4366` / `--mm-navy`
- Ocean top: `#7B9DBF` / `--mm-blue-top`
- Ocean bottom: `#A8BDD4` / `--mm-blue-bottom`
- Carob dark: `#3a2a1a` / `--mm-carob-dark`
- Homepage ink: `#2c2a26`
- Homepage soft ink: `#665f53`
- Homepage faint ink: `#a99f87`
- Homepage gold accent: `#b3a380`

These are already enough. The section does not need a new palette.

### Existing Type System

- Display: `P22 Mackinac Pro`, weights 400 and 500 only.
- Utility/body: `Neue Haas Grotesk Display Pro`, mostly 300 to 500.
- Eyebrows: `.qkick` and `.pdp-eyebrow` use small uppercase, `0.62rem` to `0.64rem`, letter spacing around `0.20em` to `0.22em`.
- Section headings: `.lux-hd` uses Mackinac 500, `clamp(2.1rem,3.6vw,3.1rem)`.
- Buttons: `.wf-pill` uses tiny uppercase, currently `0.66rem`, high letter spacing, black/cream fill logic.

The block in the screenshot is drifting too close to full hero scale. It should use Mackinac, but not hero-size Mackinac.

### Existing Structural Language

- MapleMoon already uses hairline rules, quiet uppercase labels, small icons, soft radial light, and warm cream controls.
- Pills and segmented controls are established, but should feel utilitarian and light, not like a large dashboard navigation bar.
- Cards exist elsewhere, but this block should not become a card. It is a section handoff, not a product tile.

## Current Block Diagnosis

1. The selected product title and the collection headline are both too important.
   Result: the visitor reads two competing headlines, then has to decide what the section is about.

2. The tab rail is too tall and too wide for its job.
   Result: the control feels like the main content instead of a format switcher.

3. Vertical dividers in the tab rail are too strong.
   Result: the tabs read as four large panels rather than a quiet product-format control.

4. The `Shop Now` button is visually heavier than the product title.
   Result: the action arrives too early and too loudly for a calm preview shelf.

5. The supporting copy should be a caption or editorial footer.
   Result: `Handcrafted carob creations` should not be another hero moment directly under the tabs.

## Brand-Fit Directions

### 1. Recommended: Selected Product First, Collection as Caption

Use the selected product as the only true headline. The collection copy becomes a smaller editorial footer below the tabs.

Wire:

```text
SELECTED BAR
Pure Carob & Cacao Butter
Deep, smooth and naturally sweet. Made with just real ingredients.

[ Shop Now ] [ Shop Range ]

| icon Carob Bars | icon Crescents | icon Elixirs | icon Bites |

FEATURED COLLECTION PREVIEW
Handcrafted carob creations
Carob Bars: Smooth, naturally sweet bites for calm cravings.
```

CSS moves:

- `#pdpName`: `clamp(2rem, 3.2vw, 3.15rem)`
- `.sel-head .d`: `0.98rem` to `1.04rem`, max width `42ch`
- `.wf-pdp .btns`: margin top `20px`, gap `10px` to `12px`
- `.wf-range-tabs`: max width `720px` to `760px`, min height `56px` to `60px`
- `.wf-range-tabs .wf-tab`: min height `56px`, icon `17px`, label `0.58rem` to `0.62rem`
- `.wf-line-head .lux-hd`: `clamp(1.35rem, 2vw, 1.85rem)`
- `.wf-line-head p`: `0.9rem`, max width `38ch`

Why it fits: it keeps the current order, current copy, current controls, and current palette. The only design move is clearer hierarchy.

### 2. Quiet Rail

Keep the same order, but reduce the tabs to a rail with no filled segmented panels.

Wire:

```text
[selected product + CTAs]

icon Carob Bars     icon Crescents     icon Elixirs     icon Bites
----------------

[small collection footer]
```

CSS moves:

- Remove or soften the cream tab background.
- Replace vertical dividers with spacing.
- Active state is only a gold underline and ink text.
- Rail max width `680px`.

Why it fits: MapleMoon already uses hairline rules and subtle active states. This would feel less like SaaS tabs.

Risk: if the tabs are too quiet, people may miss that formats are interactive.

### 3. Compact Purchase Handoff

Make the CTAs and tabs one grouped module while the selected text sits above.

Wire:

```text
SELECTED BAR
Pure Carob & Cacao Butter
Deep, smooth and naturally sweet. Made with just real ingredients.

[ Shop Now ] [ Shop Range ]
Carob Bars | Crescents | Elixirs | Bites

[small collection footer]
```

CSS moves:

- Put CTAs and tabs closer together.
- Make tabs shorter, `48px` to `52px`.
- Treat tab rail like secondary navigation below the decision pair.

Why it fits: good for mobile, less vertical space.

Risk: desktop may feel too compressed unless the product shelf above provides enough breathing room.

### 4. Editorial Split

Place selected product left and collection context right on desktop, stacking on mobile.

Wire:

```text
SELECTED BAR                       FEATURED COLLECTION PREVIEW
Pure Carob & Cacao Butter          Handcrafted carob creations
Deep, smooth...                    Carob Bars: Smooth...
[ Shop Now ] [ Shop Range ]

Carob Bars | Crescents | Elixirs | Bites
```

Why it fits: gives each copy block a job.

Risk: this is a larger structural change and not as close to the current page. Not recommended unless the centered stack keeps failing.

## Recommended CSS Direction

Use direction 1. It is the highest ROI and least disruptive:

- Keep centered composition.
- Keep the selected product as the main message.
- Reduce the tab rail height and width.
- Make the collection copy a small footer, not a second headline.
- Keep current cream, ink, gold, and ocean-blue blend.

## Proposed Token Layer For This Block

```css
.wf{
  --range-detail-max:720px;
  --range-tab-max:740px;
  --range-detail-gap:18px;
  --range-control-gap:24px;
  --range-footer-gap:30px;
  --range-tab-h:58px;
}
```

Use these only inside the WIP override block so this remains easy to tune.

## Generic-Default Review

Avoid:

- A new card around the selected block.
- More cream-panel styling.
- Bigger serif headlines.
- More decoration around the tabs.
- New packaging, icon systems, or background images.

Specific MapleMoon choices to keep:

- Moonlit ocean blend as atmosphere.
- Mackinac for the product name, but at product-detail scale.
- Neue Haas uppercase for labels and controls.
- Gold only as an active marker, not a large accent.
- Hairline separators when structure is needed.

## Implementation Recommendation

Patch the existing homepage block with a small CSS-only hierarchy pass first. Do not move DOM again.

Target:

- Selected title down about 15% to 25%.
- Supporting collection title down about 35% to 45%.
- Tabs down from large segmented bar to calm control.
- Buttons from “primary marketing CTA” toward “product decision pair.”

This should make the exact section in the screenshot feel calmer without changing the surrounding page direction.
