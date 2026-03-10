#!/usr/bin/env python3
"""
MapleMoon — Composite Builder v2
Uses clean transparent PNGs with rembg-stripped backgrounds.
Brand cream (#E7E4CA) backgrounds, dimensional drop shadows, warm vignette.
"""
import os, math, random
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance, ImageDraw

CLEAN = os.path.expanduser("~/maplemoon-website/assets/products_clean")
OUT   = os.path.expanduser("~/maplemoon-website/assets/imagery")
os.makedirs(OUT, exist_ok=True)

# Brand colours
CREAM     = (231, 228, 202)   # #E7E4CA
WARM_DARK = (221, 217, 190)   # #DDD9BE — slightly darker warm cream
LINEN     = (225, 220, 198)   # mid-tone

def load(fname, height=None):
    """Load from clean dir, resize to target height maintaining aspect."""
    img = Image.open(os.path.join(CLEAN, fname)).convert("RGBA")
    if height:
        w, h = img.size
        new_w = int(w * height / h)
        img = img.resize((new_w, height), Image.LANCZOS)
    return img

def warm_bg(size, colour=CREAM):
    """Warm textured background with subtle grain."""
    bg  = Image.new("RGBA", size, colour + (255,))
    rng = random.Random(42)
    noise = Image.new("RGBA", size, (0,0,0,0))
    px = noise.load()
    for y in range(size[1]):
        for x in range(size[0]):
            v = rng.randint(-6, 6)
            a = rng.randint(0, 10)
            c = tuple(max(0, min(255, colour[i]+v)) for i in range(3))
            px[x, y] = c + (a,)
    return Image.alpha_composite(bg, noise)

def drop_shadow(canvas, img, cx, cy):
    """Render a soft drop shadow beneath img centred at cx,cy."""
    w, h = img.size
    # Extract alpha from the product
    _, _, _, a = img.split()
    # Create dark fill using alpha as mask
    shadow_fill = Image.new("RGBA", (w, h), (20, 15, 10, 0))
    shadow_alpha = a.point(lambda p: int(p * 0.45))
    shadow_fill.putalpha(shadow_alpha)
    # Offset: right 16px, down 22px
    sx = cx - w//2 + 16
    sy = cy - h//2 + 22
    # Paste onto temporary layer, blur
    shadow_layer = Image.new("RGBA", canvas.size, (0,0,0,0))
    shadow_layer.paste(shadow_fill, (sx, sy), shadow_fill)
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(radius=18))
    return Image.alpha_composite(canvas, shadow_layer)

def paste(canvas, img, cx, cy, rotate=0):
    """Paste img centred at cx,cy with optional rotation. Shadow first."""
    if rotate:
        img = img.rotate(rotate, expand=True, resample=Image.BICUBIC)
    canvas = drop_shadow(canvas, img, cx, cy)
    x = cx - img.width//2
    y = cy - img.height//2
    canvas.paste(img, (x, y), img)
    return canvas

def vignette(canvas, strength=0.30):
    """Soft warm vignette."""
    w, h = canvas.size
    vig  = Image.new("RGBA", (w, h), (0,0,0,0))
    draw = ImageDraw.Draw(vig)
    for i in range(50):
        t = i / 50
        alpha = int(strength * 255 * (t ** 2.2))
        m = int(min(w,h) * 0.5 * (1-t))
        draw.rectangle([m, m, w-m, h-m], outline=(25, 18, 8, alpha),
                       width=max(1, int(min(w,h) * 0.012)))
    vig = vig.filter(ImageFilter.GaussianBlur(radius=min(w,h)//7))
    return Image.alpha_composite(canvas, vig)

def save(img, shot_id, note=""):
    path = os.path.join(OUT, f"{shot_id}.jpg")
    final = img.convert("RGB")
    final = ImageEnhance.Sharpness(final).enhance(1.12)
    final.save(path, "JPEG", quality=93)
    kb = os.path.getsize(path) // 1024
    print(f"  ✅ {shot_id}.jpg  {img.size[0]}×{img.size[1]}  {kb}KB  {note}")

# ── BANNER-BARS ───────────────────────────────────────────────────────────────
# 6 bars, warm→cool colour order left→right
# Full fan across 2400×1600 canvas
def build_banner_bars():
    W, H = 2400, 1600
    canvas = warm_bg((W, H), CREAM)

    bars = [
        ("bar_cayenne.png",     -14),   # rust/terracotta
        ("bar_almond.png",       -8),   # kraft/tan
        ("bar_hazelnut.png",     -3),   # gold
        ("bar_peppermint.png",    3),   # sage green
        ("bar_goji_coconut.png",  8),   # dusty pink/mauve
        ("bar_pure_carob.png",   14),   # periwinkle blue
    ]

    n      = len(bars)
    pad    = 160
    step   = (W - pad*2) // (n-1)
    bar_h  = 900   # tall — these are portrait bars

    for i, (fname, angle) in enumerate(bars):
        img = load(fname, height=bar_h)
        cx  = pad + i * step
        # Middle bars lowest, edge bars rise slightly for natural grouping
        cy  = H//2 + int(abs(i - (n-1)/2) * -22) + 40
        canvas = paste(canvas, img, cx, cy, rotate=angle)

    canvas = vignette(canvas)
    save(canvas, "BANNER-BARS", "6 colour-coded bars fanned — 3:2")

# ── BANNER-ELIX ───────────────────────────────────────────────────────────────
# Both elixirs side by side on warm cream, with subtle spice scatter
def build_banner_elix():
    W, H = 2400, 1600
    canvas = warm_bg((W, H), WARM_DARK)

    # Draw subtle spice-scatter ellipses at base (cinnamon/cardamom suggestion)
    draw = ImageDraw.Draw(canvas)
    rng2 = random.Random(99)
    for _ in range(120):
        x = rng2.randint(W//4, 3*W//4)
        y = rng2.randint(H//2 + 300, H - 80)
        rx, ry = rng2.randint(3,10), rng2.randint(1,3)
        angle  = rng2.randint(0, 180)
        alpha  = rng2.randint(30, 80)
        colour = (rng2.randint(140,180), rng2.randint(90,120), rng2.randint(40,70), alpha)
        # Draw as tiny rotated ellipse approximation
        draw.ellipse([x-rx, y-ry, x+rx, y+ry], fill=colour[:3])

    elixirs = [
        ("elixir_plain.png",  -9, W//2 - 420),
        ("elixir_spiced.png",  9, W//2 + 420),
    ]

    elix_h = 980
    for fname, angle, cx in elixirs:
        img = load(fname, height=elix_h)
        canvas = paste(canvas, img, cx, H//2 - 40, rotate=angle)

    canvas = vignette(canvas, strength=0.25)
    save(canvas, "BANNER-ELIX", "Both elixirs, warm spice scatter — 3:2")

# ── COLL-04 ──────────────────────────────────────────────────────────────────
# 3-bar fan: hazelnut(gold) + peppermint(sage green) + cayenne(rust) — warm palette
# 16:9 wide — bars fill ~70% of height
def build_coll_04():
    W, H = 1920, 1080
    canvas = warm_bg((W, H), LINEN)

    trio = [
        ("bar_hazelnut.png",    -22, W//2 - 360),
        ("bar_peppermint.png",    0, W//2),
        ("bar_cayenne.png",      22, W//2 + 360),
    ]

    bar_h = int(H * 0.78)   # 70% of height
    for fname, angle, cx in trio:
        img = load(fname, height=bar_h)
        canvas = paste(canvas, img, cx, H//2 + 20, rotate=angle)

    canvas = vignette(canvas, strength=0.28)
    save(canvas, "COLL-04", "3-bar fan, max colour contrast — 16:9")

# ── COLL-05 ──────────────────────────────────────────────────────────────────
# Flat-lay: almond bar centre, eclipse + elixir + bath salts + goji surrounding
def build_coll_05():
    W, H = 1200, 1200
    canvas = warm_bg((W, H), CREAM)

    # Centre product: almond bar (upright, tall)
    centre = load("bar_almond.png", height=560)
    canvas = paste(canvas, centre, W//2, H//2, rotate=0)

    # Surrounding products (smaller scale)
    surround = [
        ("eclipse_hazelnut_a.png", W//2 - 350, H//2 - 310, -10, 260),
        ("elixir_plain.png",     W//2 + 330, H//2 - 290,   5, 280),
        ("bath_salts_lavender.png", W//2 - 330, H//2 + 320,  -8, 260),
        ("bar_goji_coconut.png", W//2 + 340, H//2 + 300,  14, 260),
    ]

    for fname, cx, cy, angle, h in surround:
        img = load(fname, height=h)
        canvas = paste(canvas, img, cx, cy, rotate=angle)

    canvas = vignette(canvas, strength=0.30)
    save(canvas, "COLL-05", "Flat-lay, bar + 4 supporting products — 1:1")

# ── RUN ───────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("\nMapleMoon — Building composites v2 (clean cutouts)...\n")
    build_banner_bars()
    build_banner_elix()
    build_coll_04()
    build_coll_05()
    print(f"\n✅ All composites → {OUT}")
    print("🔴 BANNER-MOONS blocked — no moon packshots in current set")
