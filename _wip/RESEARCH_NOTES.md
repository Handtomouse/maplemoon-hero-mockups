# MapleMoon Website - Research Notes (distilled, 14 Jul 2026)
Source: 3 parallel research agents (photo-display, iOS mobile, Shopify OS2.0). Apply to WIP copies only.

## PHOTO / TEXT DISPLAY (fit to approved "Editorial Night" - do NOT drift)
- Hero dissolve = the brief: .hero::after linear-gradient(to bottom, transparent 50%, cream 100%). Keep.
- Legibility over photo: directional scrim linear-gradient(160deg, rgba(0,0,0,.05), rgba(0,0,0,.55)) OR multi-layer text-shadow (0 1px 3px/.5, 0 4px 16px/.3). 
- DRIFT-HIGH, AVOID: blue #457798 duotone on food (goes cold/grey-green on chocolate); coverflow/3D arc (client approved current one - KEEP it, but don't ADD more); ring/morph custom cursors.
- Scroll-reveal: single IntersectionObserver, [data-reveal]{opacity:0;translateY(24px)} -> .is-visible; unobserve after fire; prefers-reduced-motion guard. Calm 24px rise = on-brand.
- animation-timeline: view() NOT baseline (Chrome only) - @supports guard mandatory, degrade to static.
- Type polish: clamp() scales (display clamp(2.5rem,5.5vw+1rem,5.5rem)); body stable 17px; text-wrap:balance on headings (baseline 2024), pretty on body; letter-spacing:-0.025em on Mackinac display; max-width:65ch body.
- Accent blue = punctuation only (labels/tags/CTAs), never body; overuse reads corporate.
- Seamless: same-doc View Transitions (88%, document.startViewTransition with fallback) for tab swaps; LQIP blur-up for hero; loading=lazy+decoding=async below fold (NEVER lazy on LCP hero); width/height on every img for CLS.

## iOS / MOBILE HARDENING (375/390/430) - headless can't verify svh/safe-area/zoom/backdrop; needs device
- viewport meta MUST add viewport-fit=cover or env() insets return 0.
- Height ladder: base 100vh -> @supports(height:100svh){100svh}. svh=stable no-reflow (use for hero); dvh=reflows (modals only); avoid lvh for hero.
- Safe area: padding-bottom:max(16px, env(safe-area-inset-bottom)); inline insets max(20px,env(...-left/right)); header top inset.
- Touch: min 44x44; ::before inset:-8px to expand hit area; -webkit-tap-highlight-color:transparent; :active scale(.98)/opacity feedback; gate :hover behind @media(hover:hover)and(pointer:fine).
- Inputs: font-size>=16px or Safari auto-zooms on focus.
- LCP hero: <link rel=preload as=image imagesrcset ...> + <picture> avif/webp/jpg, fetchpriority=high, decoding=async, width/height set, NO lazy.
- Product card: <picture> srcset sizes="(min-width:768px)33vw,50vw"; aspect-ratio:4/5 to kill CLS; loading=lazy.
- Gotchas: position:sticky dies inside ancestor overflow:hidden/transform -> use overflow:clip (Safari16+); backdrop-filter needs -webkit- prefix, cap to 1-2 elements; overscroll-behavior:contain on inner scrollers (Safari16+); html{-webkit-text-size-adjust:100%} (NOT none); overflow-x:hidden+max-width:100% only as nuclear option.
- srcset maps 1:1 to Shopify {{ img | image_url: width: N }} - portable.

## SHOPIFY OS 2.0 (scaffold is already well-formed; these are the GAPS)
- Add {{ block.shopify_attributes }} to every block root element (theme editor can't select blocks without it).
- Block-ify: convert hardcoded testimonials -> block type 'testimonial' {quote,author,role}; confirm FAQ items are faq_item blocks {question,answer:richtext}.
- Add { "type": "@app" } to testimonials + product-grid blocks arrays; handle {% when '@app' %}{% render block %} - leaves a slot for Judge.me/Okendo reviews later.
- Images: switch <img src> to {{ block.settings.image | image_url: width:800 | image_tag: alt:..., loading:'lazy' }} for auto srcset+CDN versioning. Theme assets use {{ 'x.webp' | asset_url }}.
- Coming-soon/sold-out: {% if product.available %}...{% elsif product.metafields.custom.coming_soon %}Notify Me{% else %}Sold Out{% endif %}. is_prelaunch block setting maps to this.
- Fonts: Adobe kit link belongs ONCE in layout/theme.liquid <head> (kit dvz0xjs - NOT rrz1ouj which is Lewis). Section CSS uses font-family:'p22-mackinac-pro'/'neue-haas-grotesk-display'.
- Price: leave OFF grid per brand rule; {{ product.price | money }} only where intended.
- CSS scope multi-instance sections with #shopify-section-{{ section.id }}.
- Templates/index.json already correctly wires sections. Presets exist (customizer-addable). Good.
