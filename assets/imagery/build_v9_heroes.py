#!/usr/bin/env python3
"""
MapleMoon — V9 Hero Compositing Script
Takes 1:1 product photography from --image mode (white bg),
replaces background with brand blue, composites onto 16:9 canvas.
"""
import os, sys
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance, ImageDraw

OUT = os.path.expanduser("~/maplemoon-website/assets/hero_shots")
os.makedirs(OUT, exist_ok=True)

# Brand blue — #7B9DBF (cornflower), NOT deep navy
BRAND_BLUE = (123, 157, 191)

# Canvas size: 4K 16:9
W, H = 3840, 2160


def remove_white_bg(img, threshold=230, feather=8):
    """Replace white/near-white pixels with transparency."""
    rgba = img.convert("RGBA")
    data = np.array(rgba)

    # Mask: pixels where ALL of R,G,B > threshold
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    white_mask = (r > threshold) & (g > threshold) & (b > threshold)

    # Set white pixels to transparent
    data[white_mask, 3] = 0

    result = Image.fromarray(data, "RGBA")

    # Feather edges: blur the alpha channel for smooth transition
    if feather > 0:
        alpha = result.split()[3]
        alpha = alpha.filter(ImageFilter.GaussianBlur(radius=feather))
        result.putalpha(alpha)

    return result


def brand_blue_bg(size=None):
    """Solid brand blue canvas."""
    if size is None:
        size = (W, H)
    return Image.new("RGBA", size, BRAND_BLUE + (255,))


def drop_shadow(canvas, img, cx, cy):
    """Soft drop shadow beneath product."""
    w, h = img.size
    _, _, _, a = img.split()
    shadow_fill = Image.new("RGBA", (w, h), (40, 60, 80, 0))
    shadow_alpha = a.point(lambda p: int(p * 0.35))
    shadow_fill.putalpha(shadow_alpha)
    sx = cx - w // 2 + 12
    sy = cy - h // 2 + 18
    shadow_layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    shadow_layer.paste(shadow_fill, (sx, sy), shadow_fill)
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(radius=22))
    return Image.alpha_composite(canvas, shadow_layer)


def paste_product(canvas, img, cx, cy):
    """Paste product centered at cx,cy with drop shadow."""
    canvas = drop_shadow(canvas, img, cx, cy)
    x = cx - img.width // 2
    y = cy - img.height // 2
    canvas.paste(img, (x, y), img)
    return canvas


def vignette(canvas, strength=0.20):
    """Subtle edge vignette — lighter than v2's 0.30."""
    w, h = canvas.size
    vig = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(vig)
    for i in range(50):
        t = i / 50
        alpha = int(strength * 255 * (t ** 2.2))
        m = int(min(w, h) * 0.5 * (1 - t))
        draw.rectangle([m, m, w - m, h - m],
                        outline=(20, 35, 55, alpha),
                        width=max(1, int(min(w, h) * 0.012)))
    vig = vig.filter(ImageFilter.GaussianBlur(radius=min(w, h) // 7))
    return Image.alpha_composite(canvas, vig)


def save(img, filename, note=""):
    """Save as high-quality JPEG."""
    path = os.path.join(OUT, filename)
    final = img.convert("RGB")
    final = ImageEnhance.Sharpness(final).enhance(1.08)
    final.save(path, "JPEG", quality=93)
    kb = os.path.getsize(path) // 1024
    print(f"  ✅ {filename}  {img.size[0]}×{img.size[1]}  {kb}KB  {note}")


def composite_hero(input_path, output_filename, product_height=1800, y_offset=-60, note=""):
    """
    Full pipeline: load AI output → remove white bg → place on brand blue 16:9 canvas.

    Args:
        input_path: Path to 1:1 AI-generated product photo (white bg)
        output_filename: e.g. 'v9_card1_who_moons.jpg'
        product_height: Target height for the product on canvas
        y_offset: Vertical offset from center (negative = up, for text space below)
    """
    print(f"\n  Processing: {os.path.basename(input_path)}")

    # Load and remove white background
    raw = Image.open(input_path).convert("RGBA")
    product = remove_white_bg(raw, threshold=230, feather=6)

    # Resize to target height
    scale = product_height / product.height
    new_w = int(product.width * scale)
    product = product.resize((new_w, product_height), Image.LANCZOS)

    # Create brand blue canvas
    canvas = brand_blue_bg()

    # Center product with slight upward offset
    cx = W // 2
    cy = H // 2 + y_offset

    # Composite
    canvas = paste_product(canvas, product, cx, cy)
    canvas = vignette(canvas, strength=0.18)

    save(canvas, output_filename, note)
    return os.path.join(OUT, output_filename)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 build_v9_heroes.py <input_image> <output_filename> [product_height] [y_offset]")
        print("Example: python3 build_v9_heroes.py moons_photo.png v9_card1_who_moons.jpg 1800 -60")
        sys.exit(1)

    input_path = sys.argv[1]
    output_name = sys.argv[2]
    height = int(sys.argv[3]) if len(sys.argv) > 3 else 1800
    offset = int(sys.argv[4]) if len(sys.argv) > 4 else -60

    composite_hero(input_path, output_name, product_height=height, y_offset=offset)
