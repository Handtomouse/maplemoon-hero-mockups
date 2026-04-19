#!/usr/bin/env python3
"""
Build homepage_review.html — single-URL review page with a hero variant picker.

Same source (homepage.html) as the 3 standalone variants, but all 3 hero
backgrounds are embedded and the user toggles between them via top-right
pill buttons. URL hash drives initial state (#fog, #byron, #pods) so Carli
can share a specific variant link.
"""
from __future__ import annotations
from pathlib import Path
from build_hero_variants import (
    HERO_VARIANT_CSS,
    PRODUCT_SWAPS,
    ROOT,
    SRC,
    apply_common_transforms,
)

OUT = ROOT / "homepage_review.html"

PICKER_CSS = """
/* ══════════════════════════════════════
   HERO REVIEW PICKER (Apr 19)
   ══════════════════════════════════════ */
.hero--review .hero-bg-video,
.hero--review .hero-bg-still {
  opacity: 0;
  transition: opacity 0.6s ease;
}
.hero--review.hero--fog .hero-bg-video[data-bg="fog"] { opacity: 1; }
.hero--review.hero--byron .hero-bg-still[data-bg="byron"] { opacity: 1; }
.hero--review.hero--pods .hero-bg-still[data-bg="pods"] { opacity: 1; }

.hero-picker {
  position: fixed;
  top: 84px;
  right: 24px;
  z-index: 100;
  display: flex;
  gap: 4px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(30, 67, 102, 0.12);
  border-radius: 999px;
  box-shadow: 0 8px 24px rgba(30, 67, 102, 0.15);
  font-family: var(--mm-sans);
}

.hero-picker-label {
  display: none;
  align-items: center;
  padding: 0 12px 0 8px;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 500;
}

.hero-picker-btn {
  appearance: none;
  border: 0;
  background: transparent;
  padding: 8px 16px;
  border-radius: 999px;
  font-family: var(--mm-sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}
.hero-picker-btn:hover {
  color: var(--text-primary);
  background: rgba(123, 157, 191, 0.1);
}
.hero-picker-btn.active {
  background: var(--text-primary);
  color: #FFFFFF;
}

@media (min-width: 640px) {
  .hero-picker-label { display: inline-flex; }
}

@media (max-width: 560px) {
  .hero-picker {
    top: auto;
    bottom: 16px;
    right: 50%;
    transform: translateX(50%);
  }
}
"""

PICKER_HTML = '''
<nav class="hero-picker" aria-label="Hero variant" data-hero-picker>
  <span class="hero-picker-label">Hero:</span>
  <button class="hero-picker-btn active" data-variant="fog" type="button">Fog</button>
  <button class="hero-picker-btn" data-variant="byron" type="button">Byron</button>
  <button class="hero-picker-btn" data-variant="pods" type="button">Pods</button>
</nav>
'''

HERO_BG_BUNDLE = '''
  <video class="hero-bg-video" data-bg="fog" autoplay muted loop playsinline poster="assets/hero_shots/blue_fog.png" aria-hidden="true">
    <source src="assets/hero_shots/blue_fog_animated_pingpong.mp4" type="video/mp4">
    <img src="assets/hero_shots/blue_fog.png" alt="" aria-hidden="true">
  </video>
  <img class="hero-bg-still" data-bg="byron" src="assets/hero_shots/moodboard/maplemoon_minimalist_silhouette_photograph_byron_gen_001_20260331_190545.webp" alt="" aria-hidden="true" loading="eager" decoding="async">
  <img class="hero-bg-still" data-bg="pods" src="assets/photography/refined/mm_refined_r2_fb1_wide_a.png" alt="" aria-hidden="true" loading="eager" decoding="async">
'''

PICKER_JS = '''
<script>
(function () {
  var hero = document.getElementById('hero');
  var picker = document.querySelector('[data-hero-picker]');
  if (!hero || !picker) return;

  var validModes = ['fog', 'byron', 'pods'];

  function apply(mode) {
    if (validModes.indexOf(mode) === -1) mode = 'fog';
    hero.classList.remove('hero--fog', 'hero--byron', 'hero--pods');
    hero.classList.add('hero--' + mode);
    picker.querySelectorAll('.hero-picker-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.variant === mode);
      b.setAttribute('aria-pressed', String(b.dataset.variant === mode));
    });
    if (window.location.hash !== '#' + mode) {
      history.replaceState(null, '', '#' + mode);
    }
  }

  picker.addEventListener('click', function (e) {
    var btn = e.target.closest('.hero-picker-btn');
    if (btn) apply(btn.dataset.variant);
  });

  window.addEventListener('hashchange', function () {
    apply(location.hash.replace('#', ''));
  });

  var initial = location.hash.replace('#', '') || 'fog';
  apply(initial);
})();
</script>
'''


def build_review(source: str) -> str:
    out = source

    out = out.replace(
        "<title>Maple Moon — Artisan Carob from Byron Bay</title>",
        "<title>Maple Moon — Hero Review (Apr 19)</title>",
    )

    css_anchor = "/* ══════════════════════════════════════\n   HERO — FLAVOUR PICKER (warm palette)"
    out = out.replace(css_anchor, HERO_VARIANT_CSS + "\n" + PICKER_CSS + "\n" + css_anchor)

    out = out.replace(
        '<section class="hero" id="hero" aria-label="Hero">\n\n',
        '<section class="hero hero--review hero--fog" id="hero" aria-label="Hero">\n\n'
        + HERO_BG_BUNDLE + "\n",
    )

    # apply_common_transforms: wordmark CSS + header span, body class, product swaps
    out = apply_common_transforms(out)

    # Picker HTML inserts after the (now class-tagged) body tag
    body_tag = '<body class="has-atmospheric-hero">'
    if body_tag in out:
        out = out.replace(body_tag, body_tag + "\n" + PICKER_HTML.strip() + "\n", 1)

    out = out.replace("</body>", PICKER_JS + "\n</body>")
    return out


def main():
    source = SRC.read_text(encoding="utf-8")
    OUT.write_text(build_review(source), encoding="utf-8")
    print(f"  wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
