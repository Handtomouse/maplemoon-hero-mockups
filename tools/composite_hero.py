#!/usr/bin/env python3
"""
Composite MapleMoon V9 hero images.
Takes --image mode product shots (white bg) and composites onto brand-blue gradient canvas.
"""

import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter
from rembg import remove

# --- Config ---
CANVAS_W, CANVAS_H = 1920, 1080
BRAND_BLUE = (123, 157, 191)  # #7B9DBF
BRAND_BLUE_DARK = (106, 139, 173)  # #6A8BAD
JPEG_QUALITY = 92

REVIEW_DIR = Path.home() / "Desktop" / "V9_Review"
OUTPUT_DIR = Path.home() / "maplemoon-website" / "assets" / "hero_shots"

# Card definitions: (source_file, output_name, x_center_pct, y_center_pct, height_pct)
CARDS = [
    {
        "name": "v9_card1_who",
        "source": "bar_b.png",
        "x_pct": 0.65,      # center-right, leave left for text
        "y_pct": 0.48,
        "h_pct": 0.72,      # 72% of canvas height
    },
    {
        "name": "v9_card2_where",
        "source": "banana_a.png",
        "x_pct": 0.50,      # centered
        "y_pct": 0.50,
        "h_pct": 0.65,
    },
    {
        "name": "v9_card3_what",
        "source": "bar_a.png",
        "x_pct": 0.38,      # center-left, product focus
        "y_pct": 0.48,
        "h_pct": 0.78,      # larger for product focus
    },
    {
        "name": "v9_card4_why",
        "source": "moon_b.png",
        "x_pct": 0.60,      # center-right
        "y_pct": 0.50,
        "h_pct": 0.60,      # smaller, range/intention card
    },
]


def make_radial_gradient(w, h, center_color, edge_color, cx_pct=0.5, cy_pct=0.45):
    """Create a radial gradient from center_color to edge_color."""
    img = Image.new("RGB", (w, h))
    pixels = img.load()
    cx, cy = int(w * cx_pct), int(h * cy_pct)
    max_dist = math.sqrt(max(cx, w - cx) ** 2 + max(cy, h - cy) ** 2)

    for y in range(h):
        for x in range(w):
            dist = math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
            t = min(dist / max_dist, 1.0)
            r = int(center_color[0] + (edge_color[0] - center_color[0]) * t)
            g = int(center_color[1] + (edge_color[1] - center_color[1]) * t)
            b = int(center_color[2] + (edge_color[2] - center_color[2]) * t)
            pixels[x, y] = (r, g, b)

    return img


def add_shadow(product_rgba, offset=(8, 10), blur=35, opacity=0.25):
    """Create a soft drop shadow from the product's alpha channel."""
    alpha = product_rgba.split()[3]
    shadow = Image.new("RGBA", product_rgba.size, (0, 0, 0, 0))
    shadow_layer = Image.new("L", product_rgba.size, 0)

    # Use alpha as shadow shape — erode slightly to avoid shadow on product edge
    shadow_layer.paste(alpha)
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(blur))

    # Apply opacity
    shadow_layer = shadow_layer.point(lambda p: int(p * opacity))

    shadow.putalpha(shadow_layer)
    return shadow, offset


def composite_card(card_def, gradient_bg):
    """Composite a single card."""
    source_path = REVIEW_DIR / card_def["source"]
    print(f"  Loading {card_def['source']}...")
    product_img = Image.open(source_path).convert("RGB")

    # Remove background using rembg
    print(f"  Removing background...")
    product_rgba = remove(product_img)

    # Clean up rembg artifacts: remove near-black shadow remnants
    # that rembg sometimes preserves from the original photo shadow
    pixels = product_rgba.load()
    w, h = product_rgba.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a > 0 and r < 80 and g < 80 and b < 80:
                pixels[x, y] = (r, g, b, 0)  # make dark remnants transparent

    # Scale product to target height
    target_h = int(CANVAS_H * card_def["h_pct"])
    aspect = product_rgba.width / product_rgba.height
    target_w = int(target_h * aspect)
    product_rgba = product_rgba.resize((target_w, target_h), Image.LANCZOS)

    # Calculate paste position (centered on x_pct, y_pct)
    paste_x = int(CANVAS_W * card_def["x_pct"] - target_w / 2)
    paste_y = int(CANVAS_H * card_def["y_pct"] - target_h / 2)

    # Create canvas from gradient
    canvas = gradient_bg.copy().convert("RGBA")

    # Add shadow
    shadow, (sx, sy) = add_shadow(product_rgba)
    canvas.paste(shadow, (paste_x + sx, paste_y + sy), shadow)

    # Paste product
    canvas.paste(product_rgba, (paste_x, paste_y), product_rgba)

    # Save as JPEG
    output_path = OUTPUT_DIR / f"{card_def['name']}.jpg"
    canvas.convert("RGB").save(output_path, "JPEG", quality=JPEG_QUALITY)
    size_kb = output_path.stat().st_size / 1024
    print(f"  Saved: {output_path} ({size_kb:.0f}KB)")
    return output_path


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print("Generating radial gradient background...")
    gradient = make_radial_gradient(CANVAS_W, CANVAS_H, BRAND_BLUE, BRAND_BLUE_DARK)

    results = []
    for i, card in enumerate(CARDS, 1):
        print(f"\nCard {i}: {card['name']}")
        path = composite_card(card, gradient)
        results.append(path)

    print(f"\nDone! {len(results)} hero images saved to {OUTPUT_DIR}")
    return results


if __name__ == "__main__":
    main()
