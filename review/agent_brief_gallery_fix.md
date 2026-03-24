# MapleMoon Gallery Consolidation + Breakpoint Capture — Agent Team Brief

## Context

The MapleMoon hero concepts site (`localhost:3005`, served from `~/maplemoon-website/`) has **two gallery pages** that overlap in purpose but diverge in design, content, and functionality. This creates confusion — especially since all 15 hero variants link "Back to Gallery" to `index.html`, but the design review workflow used `gallery.html`. A new agent team needs to resolve this and capture the 3 responsive breakpoint previews from the index page.

---

## Problem 1: Two Galleries, No Clear Canonical

### index.html (the "editorial gallery")
- Light cream/navy brand palette, serif typography (P22 Mackinac Pro, Neue Haas Grotesk)
- Shows **16 concepts** (V1, V2, V3, V4, V6–V16)
- Each concept displayed in **3 device frames** side-by-side: iPhone (180×390px), iPad (260×347px), Desktop (480×300px) — using scaled iframes
- Concept titles + multi-line descriptions + "Open Full Screen" buttons
- Lazy-loaded iframes via IntersectionObserver
- Has a "Mockup Maker" tool CTA at the bottom
- **This is the canonical entry point** — all `hero_v*.html` files link back to `index.html`

### gallery.html (the "review grid")
- Dark charcoal theme (#0f0f0f), gold accents (#c8a96e), system fonts
- Shows **19 concepts** (V1–V4, V6–V19) — 3 extra variants not in index.html
- Compact 3-column grid, single iframe per concept (1400×800 scaled down)
- Shortlist starring system (localStorage: `mm_starred`)
- Hover-reveal "Open full size" button
- No device frame previews, no descriptions
- Probably the older/original review tool

### The Issue
- Users landing on `/` get no page (Express serves static files, no root redirect)
- `index.html` is the intended primary gallery but `gallery.html` has features (starring, extra variants) that index doesn't
- Neither page knows the other exists — no cross-linking
- gallery.html references V17, V18, V19 which may or may not exist as actual files

---

## Problem 2: Breakpoint Screenshots Needed

The index.html gallery renders each hero concept at 3 breakpoints via scaled iframes:

| Device | Frame Size | Iframe Scale | Effective Viewport |
|--------|-----------|-------------|-------------------|
| iPhone | 180×390px display | `transform: scale(0.1286)` on 1400×800 | ~375×812 equivalent |
| iPad | 260×347px display | `transform: scale(0.25)` on 1040×1389 | ~768×1024 equivalent |
| Desktop | 480×300px display | `transform: scale(0.3333)` on 1440×900 | 1440×900 native |

**Need:** Proper full-resolution screenshots of each of the **Top 3 winner variants (V7, V1, V3)** at all 3 breakpoints:
- Mobile: 375×812
- Tablet: 768×1024
- Desktop: 1440×900

These screenshots should be saved to `~/maplemoon-website/review/breakpoints/` with naming: `hero_v{n}_{device}.png` (e.g., `hero_v7_mobile.png`, `hero_v7_tablet.png`, `hero_v7_desktop.png`).

---

## Tasks for the Agent Team

### Task 1: Consolidate the Two Galleries

**Goal:** One canonical gallery at `index.html` that incorporates the best of both.

**Keep from index.html:**
- The editorial brand design (cream/navy palette, serif typography)
- 3-device frame previews (iPhone, iPad, Desktop) per concept
- Concept titles and descriptions
- Lazy-loaded iframes
- The "Open Full Screen" link per concept

**Steal from gallery.html:**
- Shortlist/starring system (localStorage `mm_starred`, star toggle per card, chip bar at top showing starred variants)
- The "Open full size" hover interaction — adapt it for the device frames (clicking a device frame could open full-screen at that breakpoint)

**Fix in the merge:**
- Reconcile the concept count — index has 16, gallery has 19. Check which of V17, V18, V19 actually exist as files (`ls ~/maplemoon-website/hero_v1[7-9].html`). If they exist, add them to the merged gallery. If not, remove them.
- Add a root redirect: update `server.js` to redirect `/` to `/index.html`
- Delete or redirect `gallery.html` to `index.html` after merge — don't leave a dead page
- Ensure the "Back to Gallery" links in all `hero_v*.html` files still work (they already point to `index.html`, so this should be fine)

**Design constraints:**
- Keep the brand palette (cream #E7E4CA, navy #1E4366, blue #7B9DBF)
- Keep the serif/sans font pairing
- The star button should be subtle — gold outline icon, not a loud toggle
- Chip bar at top for starred variants should match the cream/navy palette, not gold on charcoal
- Mobile responsive: on mobile (<768px), stack device frames vertically (iPhone only, or iPhone + Desktop)

### Task 2: Capture Breakpoint Screenshots

**Goal:** Full-resolution screenshots of the Top 3 variants at 3 breakpoints.

Using chrome-devtools MCP:
1. For each variant (V7, V1, V3):
   a. Navigate to `http://localhost:3005/hero_v{n}.html`
   b. Resize to **375×812** → screenshot → `review/breakpoints/hero_v{n}_mobile.png`
   c. Resize to **768×1024** → screenshot → `review/breakpoints/hero_v{n}_tablet.png`
   d. Resize to **1440×900** → screenshot → `review/breakpoints/hero_v{n}_desktop.png`
2. Create `review/breakpoints/` directory first
3. Total: 9 screenshots (3 variants × 3 breakpoints)

**Important:** The chrome-devtools MCP has a single shared page pointer — do NOT run multiple browser agents in parallel. Process all screenshots sequentially in one agent.

### Task 3: Update the Design Review Documents

After the gallery consolidation:
- Update `review/hero_review_client_facing.md` to reference the correct gallery URL
- Add a "Breakpoint Preview" section to the client doc pointing to the 9 screenshots
- If V17–V19 exist and are added to the gallery, note them as "additional concepts not included in the formal review"

---

## Key Files

| File | Purpose |
|------|---------|
| `~/maplemoon-website/index.html` | Primary editorial gallery (KEEP as base) |
| `~/maplemoon-website/gallery.html` | Dark review grid (MERGE features, then remove) |
| `~/maplemoon-website/server.js` | Express static server, port 3005 (add root redirect) |
| `~/maplemoon-website/hero_v*.html` | 15 hero variant pages (all link back to index.html) |
| `~/maplemoon-website/brand_kit.css` | Shared brand tokens (use for consistent styling) |
| `~/maplemoon-website/review/` | Review documents and breakpoint screenshots output |

## Architecture Notes

- All files are standalone HTML — no build step, no framework
- Server is Express serving static files on port 3005
- The iframes in the gallery are performance-sensitive — lazy loading via IntersectionObserver is critical
- The starring system uses localStorage key `mm_starred` as a JSON array of variant IDs
- brand_kit.css contains all shared CSS custom properties (colours, fonts, spacing, z-index, animations)
- The chrome-devtools MCP operates on a single selected page — browser agents must work sequentially, never in parallel

## Non-Negotiable Rules (from project CLAUDE.md)

- snake_case naming only (lowercase, underscores, digits)
- Never delete user files — archive to `/UFC/archive/` if removing gallery.html
- No em dashes in any client-facing copy
- Mark manual review needs with **🔴 REVIEW**
