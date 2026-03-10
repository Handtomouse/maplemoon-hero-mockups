#!/usr/bin/env python3
"""
MapleMoon — Composite Image Builder
Generates product arrangement shots from existing packshot photography.
Output: ~/maplemoon-website/assets/imagery/

Shots produced:
  BANNER-BARS  — All 6 bar flavours arranged, 3:2 (2400×1600)
  BANNER-MOONS — 4 moon packs in arc, 3:2 (2400×1600)
  BANNER-ELIX  — Both elixirs styled, 3:2 (2400×1600)
  COLL-04      — 3 bars fanned on cream, 16:9 (1920×1080)
  COLL-05      — Flat-lay, 4 products + space for props, 1:1 (1200×1200)
"""

import os, math
from PIL import Image, ImageFilter, ImageEnhance, ImageDraw

# ── Paths ──────────────────────────────────────────────────────────────────────
ASSETS   = os.path.expanduser("~/maplemoon-website/assets/products")
OUT      = os.path.expanduser("~/maplemoon-website/assets/imagery")
os.makedirs(OUT, exist_ok=True)

# ── Brand colours ──────────────────────────────────────────────────────────────
CREAM    = (231, 228, 202)   # #E7E4CA
NAVY     = ( 30,  67, 102)   # #1E4366
LINEN    = (220, 213, 190)   # slightly darker warm cream for texture feel
WARM_OFF = (240, 236, 220)   # lightest warm off-white

def load(filename, size=None):
    """Load from products dir, optionally resize maintaining aspect."""
    path = os.path.join(ASSETS, filename)
    img  = Image.open(path).convert("RGBA")
    if size:
        img.thumbnail(size, Image.LANCZOS)
    return img

def paste_centered(canvas, img, cx, cy, rotate=0, shadow=True):
    """Paste img centred on (cx, cy) with optional rotation and drop shadow."""
    if rotate:
        img = img.rotate(rotate, expand=True, resample=Image.BICUBIC)

    w, h = img.size

    if shadow:
        # Build soft shadow layer
        shadow_layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        shadow_img   = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        # Fill just the alpha of the source as dark grey
        r, g, b, a  = img.split()
        shadow_fill  = Image.new("RGBA", (w, h), (30, 20, 10, 180))
        shadow_fill.putalpha(a)
        offset = 18
        sx = cx - w // 2 + offset
        sy = cy - h // 2 + offset
        shadow_layer.paste(shadow_fill, (sx, sy), shadow_fill)
        shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(radius=16))
        canvas.paste(shadow_layer, (0, 0), shadow_layer)

    x = cx - w // 2
    y = cy - h // 2
    canvas.paste(img, (x, y), img)
    return canvas

def warm_bg(size, colour=CREAM):
    """Create a warm-toned background with subtle noise for texture."""
    bg = Image.new("RGBA", size, colour + (255,))
    # Add very subtle warm grain via a semi-transparent noise layer
    import random
    noise = Image.new("RGBA", size, (0,0,0,0))
    px    = noise.load()
    rng   = random.Random(42)
    for y in range(size[1]):
        for x in range(size[0]):
            v = rng.randint(-8, 8)
            a = rng.randint(0, 12)
            px[x, y] = (max(0, min(255, colour[0]+v)),
                        max(0, min(255, colour[1]+v)),
                        max(0, min(255, colour[2]+v)), a)
    return Image.alpha_composite(bg, noise)

def vignette(canvas, strength=0.35):
    """Add a soft warm vignette to pull edges down."""
    w, h = canvas.size
    vig  = Image.new("RGBA", (w, h), (0,0,0,0))
    draw = ImageDraw.Draw(vig)
    steps = 60
    for i in range(steps):
        t = i / steps
        alpha = int(strength * 255 * (t ** 2))
        margin = int(min(w, h) * 0.5 * (1 - t))
        draw.rectangle([margin, margin, w-margin, h-margin],
                       outline=(20, 10, 5, alpha), width=max(1, int(min(w,h)*0.015)))
    vig = vig.filter(ImageFilter.GaussianBlur(radius=min(w,h)//8))
    return Image.alpha_composite(canvas, vig)

def warm_grade(img, warmth=1.04, sat=1.08, bright=1.02):
    """Apply warm colour grade: boost reds/yellows slightly, boost saturation."""
    img = img.convert("RGB")
    img = ImageEnhance.Brightness(img).enhance(bright)
    img = ImageEnhance.Color(img).enhance(sat)
    # Warm shift: boost R slightly, pull B down slightly
    r, g, b = img.split()
    r = r.point(lambda p: min(255, int(p * warmth)))
    b = b.point(lambda p: int(p * (2 - warmth)))
    return Image.merge("RGB", (r, g, b)).convert("RGBA")

def save(img, shot_id, note=""):
    path = os.path.join(OUT, f"{shot_id}.jpg")
    out  = img.convert("RGB")
    out  = ImageEnhance.Sharpness(out).enhance(1.1)
    out.save(path, "JPEG", quality=92)
    size = os.path.getsize(path) // 1024
    print(f"  ✅ {shot_id}.jpg  {img.size[0]}×{img.size[1]}  {size}KB  {note}")

# ── BANNER-BARS ───────────────────────────────────────────────────────────────
# 6 bars in a slight fan arrangement, 3:2 (2400×1600), cream warm bg
# ─────────────────────────────────────────────────────────────────────────────
def build_banner_bars():
    W, H = 2400, 1600
    canvas = warm_bg((W, H), CREAM)

    bars = [
        ("bar_original.jpg",      -15),
        ("bar_almond.jpg",         -9),
        ("bar_hazelnut.jpg",       -3),
        ("bar_chilli.jpg",          3),
        ("bar_peppermint.jpg",      9),
        ("bar_coconut_goji.jpg",   15),
    ]

    # Fan across centre — x positions spread across width
    n    = len(bars)
    margin = 260
    step = (W - margin * 2) // (n - 1)
    cx_start = margin

    for i, (fname, angle) in enumerate(bars):
        img  = load(fname, size=(520, 520))
        img  = warm_grade(img)
        cx   = cx_start + i * step
        # Slight vertical stagger for depth
        cy   = H // 2 + (abs(i - n//2) * 30) - 60
        canvas = paste_centered(canvas, img, cx, cy, rotate=angle)

    canvas = vignette(canvas)
    save(canvas, "BANNER-BARS", "All 6 bars fanned — 3:2")

# ── BANNER-MOONS ──────────────────────────────────────────────────────────────
# 4 moon packs in a gentle arc, 3:2 (2400×1600)
# ─────────────────────────────────────────────────────────────────────────────
def build_banner_moons():
    W, H = 2400, 1600
    canvas = warm_bg((W, H), LINEN)

    moons = [
        "moon_almond.jpg",
        "moon_hazelnut.jpg",
        "moon_coconut.jpg",
        "moon_peppermint.jpg",
    ]

    # Arrange in a gentle circular arc across the bottom half
    n      = len(moons)
    radius = 900
    cx_c   = W // 2
    cy_c   = H + 240  # arc centre below the image

    for i, fname in enumerate(moons):
        img = load(fname, size=(560, 560))
        img = warm_grade(img, warmth=1.03)
        t   = (i / (n - 1)) - 0.5           # -0.5 → +0.5
        angle_rad = t * math.pi * 0.55
        cx  = int(cx_c + radius * math.sin(angle_rad))
        cy  = int(cy_c - radius * math.cos(angle_rad))
        rot = int(t * 18)
        canvas = paste_centered(canvas, img, cx, cy, rotate=rot)

    canvas = vignette(canvas, strength=0.30)
    save(canvas, "BANNER-MOONS", "4 moon packs arc — 3:2")

# ── BANNER-ELIX ───────────────────────────────────────────────────────────────
# Both elixir jars side by side with space for a poured-glass placeholder
# 3:2 (2400×1600)
# ─────────────────────────────────────────────────────────────────────────────
def build_banner_elix():
    W, H = 2400, 1600
    canvas = warm_bg((W, H), WARM_OFF)

    elixirs = [
        ("elixir_plain.jpg",  -8, W // 2 - 380),
        ("elixir_spiced.jpg",  8, W // 2 + 380),
    ]

    for fname, angle, cx in elixirs:
        img  = load(fname, size=(620, 620))
        img  = warm_grade(img, warmth=1.05, sat=1.10)
        canvas = paste_centered(canvas, img, cx, H // 2 - 30, rotate=angle)

    # Add a subtle "powder spill" suggestion via an elliptical warm gradient
    draw  = ImageDraw.Draw(canvas)
    for r in range(80, 0, -5):
        alpha = int(30 * (1 - r / 80))
        draw.ellipse(
            [W // 2 - r * 2, H // 2 + 200 - r, W // 2 + r * 2, H // 2 + 200 + r],
            fill=(180, 140, 90, alpha)
        )

    canvas = vignette(canvas, strength=0.28)
    save(canvas, "BANNER-ELIX", "Both elixirs — 3:2 (poured glass: add in post)")

# ── COLL-04 ──────────────────────────────────────────────────────────────────
# 3 bars fanned on warm linen, 16:9 (1920×1080)
# ─────────────────────────────────────────────────────────────────────────────
def build_coll_04():
    W, H = 1920, 1080
    canvas = warm_bg((W, H), LINEN)

    trio = [
        ("bar_hazelnut.jpg",   -18, W // 2 - 300),
        ("bar_original.jpg",     0, W // 2),
        ("bar_peppermint.jpg",  18, W // 2 + 300),
    ]

    for fname, angle, cx in trio:
        img  = load(fname, size=(420, 420))
        img  = warm_grade(img)
        canvas = paste_centered(canvas, img, cx, H // 2, rotate=angle)

    canvas = vignette(canvas, strength=0.32)
    save(canvas, "COLL-04", "3 bars fanned — 16:9 wide")

# ── COLL-05 ──────────────────────────────────────────────────────────────────
# Flat-lay: bar centre, surrounded by moon + elixir + eclipse, 1:1 (1200×1200)
# ─────────────────────────────────────────────────────────────────────────────
def build_coll_05():
    W, H = 1200, 1200
    canvas = warm_bg((W, H), CREAM)

    # Central hero: almond bar
    hero = load("bar_almond.jpg", size=(440, 440))
    hero = warm_grade(hero, warmth=1.06)
    canvas = paste_centered(canvas, hero, W // 2, H // 2)

    # Surrounding: 4 products at corners
    corners = [
        ("moon_almond.jpg",       320, 300,  12),
        ("elixir_plain.jpg",      880, 280, -10),
        ("eclipse_hazelnut.jpg",  300, 880,  -8),
        ("bananas.jpg",           880, 900,  14),
    ]

    for fname, cx, cy, rot in corners:
        img  = load(fname, size=(280, 280))
        img  = warm_grade(img)
        canvas = paste_centered(canvas, img, cx, cy, rotate=rot, shadow=True)

    canvas = vignette(canvas, strength=0.30)
    save(canvas, "COLL-05", "Flat-lay, bar + surrounding products — 1:1")

# ── RUN ALL ───────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("\nMapleMoon — Building composites...\n")
    build_banner_bars()
    build_banner_moons()
    build_banner_elix()
    build_coll_04()
    build_coll_05()
    print(f"\nAll composites saved to:\n  {OUT}\n")
    print("Next: review outputs, adjust crop/placement as needed.")
    print("Lifestyle shots (HERO-01, COLL-01, COLL-02, COLL-03, BRAND-01)")
    print("require AI generation or photography — see prompts file.")
