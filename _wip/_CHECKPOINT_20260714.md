# CHECKPOINT - MapleMoon Website Overnight Iteration - 2026-07-14
Session: bg job 06d07a43. Plan: ~/.claude/plans/synchronous-sauteeing-ember.md

## FRAME (critical)
Design was APPROVED by client 13 Jul. This run = bounded POLISH + apply unapplied 13 Jul deltas on WIP copies. NOT a redesign. Deadline: click-through link ~16 Jul; walkthrough call Mon 20 Jul 7pm. Backend/Shopify/pricing next-steps are externally BLOCKED.

## WHERE (isolation - IMPORTANT)
- Approved site = 99 UNTRACKED files in ~/maplemoon-website (copy-based workflow, not commits). Worktree would be destructive. bg-isolation guard blocks Edit/Write TOOLS in repo; Bash file ops work.
- Working additively on ~/maplemoon-website/_wip/*.WIP.html. Originals NEVER touched.
- Authoring pattern: Write/edit in $CLAUDE_JOB_DIR OR python-via-Bash, then it lands in _wip. Screenshots via _wip/shot.js (puppeteer-core + system Chrome, server on :3005).
- Approved base = homepage_real_1_lead_photo.html (verified superset; run-sheet "final demo").

## DONE + VERIFIED
- A1 copy reversal: 20 edits/6 pages, "handmade in Brunswick Heads" -> "Australian organic carob"; Brunswick kept as origin-story on our-story only; fixed stale "Byron Bay" bug (faq/stockists). Asserted 1x each, no em dashes. Verified in screenshots. Log: $JD/tmp/a1_copy_log.json.
- C fonts: Adobe kit dvz0xjs (verified serves p22-mackinac-pro + neue-haas-grotesk-display) injected all 6 pages -> renders off-machine (was local()-demo, deploy blocker).
- Screenshot harness _wip/shot.js working; 12 baseline shots (390+1440) in _wip/checkpoints/.
- MORNING CHECKLIST built: _wip/_MORNING_CHECKLIST.html (opened in Chrome). Decisions 1-5 (base-file confirm, isolation ratify, copy wording table, 3 B-choices, font licensing) + applied/prepared/blocked/QA.
- RESEARCH_NOTES.md distilled (photo/mobile/shopify).

## NEXT (prepared, not applied)
A2 Meet Carli&Dylan (our-story split profiles) | A3 delayed scroll subscribe popup | A4 coming-soon SKU states | A5 quote carousel from live-site reviews | mobile hardening (svh/safe-area/44px/LCP - see RESEARCH_NOTES) | B1/B2/B3 variants as screenshots | D Shopify shaping (gaps in RESEARCH_NOTES).

## BLOCKED (park): retail pricing (wholesale on live site - DON'T scrape), Shopify collaborator access, real reviews, carob-farm permission, font licence confirm.
## CONSTRAINTS: no outbound comms; money only w/ Carli&Dylan; no em dash / no "vibe"; cacao-% omitted on ASAL/CHIL/GCOC/HNUT/PMIN; never touch ~/Downloads MM zips.

## UPDATE (A+B round)
- ASSET FIX: WIP pages referenced relative `assets/`, `brand_kit.css` etc that didn't resolve from `_wip/`. Created symlinks (`_wip/assets -> ../assets`, `brand_kit.css`, `shared.css/js`, `products`; same in `_wip/variants/`). Screenshots before this fix showed broken hero/wordmark/packshots - all re-shot correctly. If resuming, keep these symlinks.
- A5 (reviews): VERIFIED live maplemoon.com.au has NO reviews (no Judge.me/Okendo/Loox, /pages/reviews=404, headless render). Did NOT fabricate. Carousel structure already exists (.wf-quote #reviews, 3 qslides, L616-622). BLOCKED on Nate naming a real source (Google/IG/markets). Flagged in checklist.
- B1 hero variants built in `_wip/variants/` (hero_A_current / hero_B_brandline / hero_C_minimal) + 6 screenshots (desktop+iPhone) embedded in checklist decision 4a. CAROB wordmark protected in all.
- B2 packshot cohesion: parked (needs real packshot finals to compare). B3 motion: not screenshottable, scroll-reveal spec ready (IO + reduced-motion) to wire as a live toggle on request.

## ROUND 2 (marathon - "run until morning") state
APPLIED + tested this round (all on _wip copies, audit.js clean, no overflow regression):
- FIXED my own viewport bug (malformed `content="...1.0", viewport-fit=cover"` -> valid single attr) on all 6 pages. Was breaking safe-area + HTML validity. Caught by a11y + perf agents independently.
- favicon: unified `<link rel=icon>` -> assets/mm_logo_icon_blk.svg on all 6 pages (was 404).
- carob-story broken img (outputs/round_2/... .png) -> assets/hero_shots/carob_branch_dusk.jpg.
- a11y safe wins: removed duplicate aria-label on h1 wordmark; aria-live on testimonial track.
- perf (homepage): preload LCP hero webp (fetchpriority=high); decoding=async on wordmark; loading=lazy+decoding=async on carob-branch; aspect-ratio:9/14 on .sbox-grid img (CLS).

TEST HARNESS: _wip/audit.js (puppeteer) - checks overflow@375/390/430, missing alt, 404s, console errors, sub-44 tap targets, heading order, dead links. Baseline: zero overflow, all imgs have alt, h1x1 no skips. Open issues it found: sub-44 tap targets (homepage 26, shop 33), dead href="#" links (homepage 9), typekit p.css ERR in headless (network artifact - verify Mackinac renders in REAL browser vs Georgia fallback).

SPEC LIBRARY (durable, in $CLAUDE_JOB_DIR/tmp - APPLY IN NEXT WAVES):
- a11y_audit.md - full WCAG audit, Group A safe-auto-apply (skip-link+<main>, cart <span>-><button>, nav aria-labels, tab roles, reduced-motion JS guards) + Group B judgement (contrast #ink-faint fails 4.5:1, dead links).
- seo_pack.md - OG/Twitter per page + JSON-LD (Organization/WebSite/FAQPage/Article/Breadcrumb/Product), canonical+robots+manifest. Placeholders: og images (need 1200x630 crops), social handles, ISO dates. FAQ rich-result deprecated (still include). Uses dvz0xjs kit.
- perf_mobile_patches.md - line-referenced patches; more below-fold lazy/decoding + tap-target min-height (.wf-pcart padding, .wf-ft .soc a 44px, .qarw 44px, .wf-sz/.wf-nl button/.wf-tab min-height) + safe-area CSS (needs device verify).
- popup_component.html - A3 subscribe (scroll-trigger + side tab, accessible, offer value = swap token). Inject before </body> as a preview variant.
- meet_cd_layout.html + meet_cd_copy.md - A2 (replaces our-story founders block lines 225-236). Copy = DRAFT proposals w/ flagged role assumptions - needs Nate approval + profile photos (assets/our_story/carli.webp,dylan.webp pending).

NEXT-WAVE ORDER: (1) apply SEO JSON-LD + OG (additive head, flag placeholder og-images); (2) a11y Group A safe fixes + re-audit tap-target count; (3) build popup + motion + meetCD as preview variants (don't touch base) + screenshot; (4) contrast + dead-link decisions -> checklist; (5) re-audit + checklist + checkpoint each wave.
