#!/usr/bin/env python3
"""
Build 3 hero variants from homepage.html for the Apr 19 Carli/Dylan review.

Variants:
  V1 fog    — animated blue_fog video (or still fallback) background
  V2 byron  — static Byron lighthouse silhouette background
  V3 pods   — static carob pods silhouette background

All variants:
  - Apply cornflower #7B9DBF atmosphere
  - Swap product images to transparent PNGs from products_clean/ where available
  - Adjust hero text colour for legibility on cornflower
  - Everything below the hero remains identical to homepage.html
"""
from __future__ import annotations
import re
from pathlib import Path

ROOT = Path.home() / "maplemoon-website"
SRC = ROOT / "homepage.html"

VARIANTS = [
    {
        "slug": "fog",
        "class_mod": "hero--fog",
        "title_suffix": "Fog Variant",
        "bg_markup": (
            '  <video class="hero-bg-video" autoplay muted loop playsinline '
            'poster="assets/hero_shots/blue_fog.png" aria-hidden="true">\n'
            '    <source src="assets/hero_shots/blue_fog_animated_pingpong.mp4" type="video/mp4">\n'
            '    <img src="assets/hero_shots/blue_fog.png" alt="" aria-hidden="true">\n'
            '  </video>\n'
        ),
    },
    {
        "slug": "byron",
        "class_mod": "hero--byron",
        "title_suffix": "Byron Silhouette Variant",
        "bg_markup": (
            '  <img class="hero-bg-still" '
            'src="assets/hero_shots/moodboard/maplemoon_minimalist_silhouette_photograph_byron_gen_001_20260331_190545.webp" '
            'alt="" aria-hidden="true" loading="eager" decoding="async">\n'
        ),
    },
    {
        "slug": "pods",
        "class_mod": "hero--pods",
        "title_suffix": "Carob Pods Silhouette Variant",
        "bg_markup": (
            '  <img class="hero-bg-still" '
            'src="assets/photography/refined/mm_refined_r2_fb1_wide_a.png" '
            'alt="" aria-hidden="true" loading="eager" decoding="async">\n'
        ),
    },
]

# CSS injected into each variant's <style> block (right after the
# /* HERO — FLAVOUR PICKER ... */ comment). Uses the source's own variables
# so the rest of the page remains coherent.
HERO_VARIANT_CSS = """
/* ══════════════════════════════════════
   HERO VARIANTS (Apr 19 review) — cornflower atmosphere
   ══════════════════════════════════════ */
.hero.hero--fog,
.hero.hero--byron,
.hero.hero--pods {
  background: #7B9DBF;
}

.hero-bg-video,
.hero-bg-still {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
}

/* Soft darken + cornflower wash so text passes WCAG */
.hero.hero--fog::before,
.hero.hero--byron::before,
.hero.hero--pods::before {
  background:
    linear-gradient(180deg, rgba(30, 67, 102, 0.15) 0%, rgba(30, 67, 102, 0.40) 100%),
    radial-gradient(ellipse 60% 70% at 50% 30%, rgba(123, 157, 191, 0.0) 0%, rgba(30, 67, 102, 0.20) 100%);
  z-index: 1;
}

.hero.hero--fog .hero-content,
.hero.hero--byron .hero-content,
.hero.hero--pods .hero-content {
  z-index: 2;
}

.hero.hero--fog .hero-headline,
.hero.hero--byron .hero-headline,
.hero.hero--pods .hero-headline {
  color: #FAF7F0;
  text-shadow: 0 2px 24px rgba(30, 67, 102, 0.45);
}

.hero.hero--fog .hero-badge,
.hero.hero--byron .hero-badge,
.hero.hero--pods .hero-badge {
  color: rgba(255, 255, 255, 0.92);
}

.hero.hero--fog .hero-sub,
.hero.hero--byron .hero-sub,
.hero.hero--pods .hero-sub {
  color: rgba(255, 255, 255, 0.86);
}

.hero.hero--fog .hero-tagline,
.hero.hero--byron .hero-tagline,
.hero.hero--pods .hero-tagline {
  color: rgba(255, 255, 255, 0.78);
}

.hero.hero--fog .hero-watermark,
.hero.hero--byron .hero-watermark,
.hero.hero--pods .hero-watermark {
  opacity: 0.07;
  filter: invert(1) brightness(2);
  z-index: 1;
}

.hero.hero--fog .product-display img,
.hero.hero--byron .product-display img,
.hero.hero--pods .product-display img {
  filter: drop-shadow(0 22px 48px rgba(30, 67, 102, 0.55));
}

.hero.hero--fog .hero-cat-btn,
.hero.hero--byron .hero-cat-btn,
.hero.hero--pods .hero-cat-btn {
  color: rgba(255, 255, 255, 0.85);
}
.hero.hero--fog .hero-cat-btn.active,
.hero.hero--byron .hero-cat-btn.active,
.hero.hero--pods .hero-cat-btn.active {
  color: #FAF7F0;
  border-bottom-color: #FAF7F0;
}
.hero.hero--fog .cat-separator,
.hero.hero--byron .cat-separator,
.hero.hero--pods .cat-separator {
  background: rgba(255, 255, 255, 0.5);
}

.hero.hero--fog .flavour-btn,
.hero.hero--byron .flavour-btn,
.hero.hero--pods .flavour-btn {
  color: rgba(255, 255, 255, 0.85);
  border-color: rgba(255, 255, 255, 0.35);
}
.hero.hero--fog .flavour-btn.active,
.hero.hero--byron .flavour-btn.active,
.hero.hero--pods .flavour-btn.active {
  background: #FAF7F0;
  color: var(--text-primary);
  border-color: #FAF7F0;
}

.hero.hero--fog .hero-cta,
.hero.hero--byron .hero-cta,
.hero.hero--pods .hero-cta {
  background: #FAF7F0;
  color: var(--text-primary);
  border: 1px solid #FAF7F0;
}
.hero.hero--fog .hero-cta:hover,
.hero.hero--byron .hero-cta:hover,
.hero.hero--pods .hero-cta:hover {
  background: transparent;
  color: #FAF7F0;
  border-color: #FAF7F0;
}

@media (prefers-reduced-motion: reduce) {
  .hero-bg-video { display: none; }
  .hero.hero--fog { background-image: url('assets/hero_shots/blue_fog.png'); background-size: cover; background-position: center; }
}
"""

# Swap current .webp product paths to canonical transparent PNG mockups
# Source of truth: product_shots/{bars,moons,eclipse_bites}/ — Feb 2 MM web
# mockups at 2048×3072 with alpha baked in (no rembg needed).
PRODUCT_SWAPS = {
    # bars — MM_BAR_Web-Mockups_<FLAVOUR>_90G_02-FEB-2026.png
    "assets/product_shots/bar_pure_carob.webp":   "assets/product_shots/bars/MM_BAR_Web-Mockups_PCAR_90G_02-FEB-2026.png",
    "assets/product_shots/bar_peppermint.webp":   "assets/product_shots/bars/MM_BAR_Web-Mockups_PMIN_90G_02-FEB-2026.png",
    "assets/product_shots/bar_hazelnut.webp":     "assets/product_shots/bars/MM_BAR_Web-Mockups_HNUT_90G_02-FEB-2026.png",
    "assets/product_shots/bar_goji_coconut.webp": "assets/product_shots/bars/MM_BAR_Web-Mockups_GCOC_90G_02-FEB-2026.png",
    "assets/product_shots/bar_cayenne.webp":      "assets/product_shots/bars/MM_BAR_Web-Mockups_CHIL_90G_02-FEB-2026.png",
    "assets/product_shots/bar_almond.webp":       "assets/product_shots/bars/MM_BAR_Web-Mockups_ASAL_90G_02-FEB-2026.png",
    # moons — MM_MOONS_Web-Mockups_<FLAVOUR>_35G_02-FEB-2026@2x.png
    "assets/product_shots/moon_pure_carob.webp":   "assets/product_shots/moons/MM_MOONS_Web-Mockups_PCAR_35G_02-FEB-2026@2x.png",
    "assets/product_shots/moon_peppermint.webp":   "assets/product_shots/moons/MM_MOONS_Web-Mockups_PMIN_35G_02-FEB-2026@2x.png",
    "assets/product_shots/moon_hazelnut.webp":     "assets/product_shots/moons/MM_MOONS_Web-Mockups_HNUT_35G_02-FEB-2026@2x.png",
    "assets/product_shots/moon_goji_coconut.webp": "assets/product_shots/moons/MM_MOONS_Web-Mockups_GCOC_35G_02-FEB-2026@2x.png",
    "assets/product_shots/moon_cayenne.webp":      "assets/product_shots/moons/MM_MOONS_Web-Mockups_CHIL_35G_02-FEB-2026@2x.png",
    "assets/product_shots/moon_almond.webp":       "assets/product_shots/moons/MM_MOONS_Web-Mockups_ASAL_35G_02-FEB-2026@2x.png",
    # bites
    "assets/product_shots/bite_coconut.webp": "assets/product_shots/eclipse_bites/eclipse-bite_coconut.png",
    "assets/product_shots/bite_goji.webp":    "assets/product_shots/eclipse_bites/eclipse-bite_goji.png",
    # elixirs — keep existing products_clean versions (no canonical equivalent)
    "assets/product_shots/elixir_plain.webp":  "assets/products_clean/elixir_plain.png",
    "assets/product_shots/elixir_spiced.webp": "assets/products_clean/elixir_spiced.png",
}


HEADER_WORDMARK_CSS = """
/* ══════════════════════════════════════
   HEADER WORDMARK (Apr 19) — text next to logo icon
   ══════════════════════════════════════ */
.header-logo-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.header-wordmark {
  font-family: var(--mm-serif);
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0.01em;
  color: var(--text-primary);
  text-transform: lowercase;
  line-height: 1;
  transition: color 0.3s ease;
  white-space: nowrap;
}
.site-header.header-dark .header-wordmark { color: var(--mm-cream); }

/* Atmospheric hero pages — pre-scroll header goes light over cornflower */
body.has-atmospheric-hero .site-header:not(.scrolled) .header-wordmark,
body.has-atmospheric-hero .site-header:not(.scrolled) .header-nav a {
  color: #FAF7F0;
  text-shadow: 0 1px 12px rgba(30, 67, 102, 0.35);
}
body.has-atmospheric-hero .site-header:not(.scrolled) .hamburger span {
  background: #FAF7F0;
}
body.has-atmospheric-hero .site-header:not(.scrolled) .header-logo {
  filter: brightness(0) invert(1);
}
"""

_HEADER_ANCHOR = (
    '<a href="/homepage.html" class="header-logo-link">'
    '<img src="assets/brand/maplemoon_logo.svg" alt="Maple Moon" '
    'class="header-logo" width="36" height="36" loading="eager" '
    'decoding="async"></a>'
)

_HEADER_REPLACEMENT = (
    '<a href="/homepage.html" class="header-logo-link">'
    '<img src="assets/brand/maplemoon_logo.svg" alt="" '
    'class="header-logo" width="36" height="36" loading="eager" decoding="async">'
    '<span class="header-wordmark">maple moon</span>'
    '</a>'
)


def apply_common_transforms(html: str) -> str:
    """Transforms applied to every atmospheric-hero build (variants + review).

    - Inject wordmark CSS
    - Replace header logo markup to include wordmark text
    - Add body class so header CSS can target atmospheric pages
    - Apply product swaps
    """
    # Inject wordmark CSS before existing .site-header rule
    html = html.replace(".site-header {", HEADER_WORDMARK_CSS.strip() + "\n\n.site-header {", 1)

    # Add wordmark to logo link
    html = html.replace(_HEADER_ANCHOR, _HEADER_REPLACEMENT, 1)

    # Flag body as atmospheric so header CSS flips text light pre-scroll
    html = html.replace("<body>", '<body class="has-atmospheric-hero">', 1)

    # Product image swaps — only if the transparent PNG actually exists
    for old, new in PRODUCT_SWAPS.items():
        if (ROOT / new).exists():
            html = html.replace(f'src="{old}"', f'src="{new}"')
    return html


def build_variant(source: str, variant: dict) -> str:
    """Transform homepage source into a standalone variant, return HTML."""
    out = source

    out = out.replace(
        "<title>Maple Moon — Artisan Carob from Byron Bay</title>",
        f"<title>Maple Moon — {variant['title_suffix']}</title>",
    )

    css_anchor = "/* ══════════════════════════════════════\n   HERO — FLAVOUR PICKER (warm palette)"
    out = out.replace(css_anchor, HERO_VARIANT_CSS + "\n" + css_anchor)

    out = out.replace(
        '<section class="hero" id="hero" aria-label="Hero">\n\n',
        f'<section class="hero {variant["class_mod"]}" id="hero" aria-label="Hero">\n\n'
        f'{variant["bg_markup"]}\n',
    )

    out = apply_common_transforms(out)
    return out


def main():
    source = SRC.read_text(encoding="utf-8")
    for v in VARIANTS:
        out_path = ROOT / f"homepage_v_{v['slug']}.html"
        out_path.write_text(build_variant(source, v), encoding="utf-8")
        print(f"  wrote {out_path.relative_to(ROOT)} ({out_path.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
