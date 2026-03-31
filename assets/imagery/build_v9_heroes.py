#!/usr/bin/env python3
"""
MapleMoon — V9 Hero Compositing Script v2
Takes 1:1 product photography from --image mode (white bg),
smoothly blends white bg → brand blue, auto-crops product, composites onto 16:9.
"""
import os, sys
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance, ImageDraw

OUT = os.path.expanduser("~/maplemoon-website/assets/hero_shots")
os.makedirs(OUT, exist_ok=True)

# Brand blue — #7B9DBF (cornflower), NOT deep navy
BRAND_BLUE = np.array([123, 157, 191], dtype=np.float32)

# Canvas size: 4K 16:9
W, H = 3840, 2160


def blend_white_to_blue(img, threshold=0.72, power=1.8):
    """
    Smoothly replace white/near-white pixels with brand blue.
    Preserves product colors — only affects pixels whiter than threshold.
    Shadows blend naturally to blue-tinted instead of grey artifacts.
    """
    data = np.array(img.convert("RGB"), dtype=np.float32)

    # Whiteness: how close each pixel is to pure white (0-1)
    # Using min channel — light blue packaging (~170 min) won't be affected
    whiteness = np.min(data, axis=2) / 255.0

    # Blend curve: ramp from 0 at threshold to 1 at pure white
    blend = np.clip((whiteness - threshold) / (1.0 - threshold), 0, 1) ** power
    blend = blend[:, :, np.newaxis]  # Broadcast to 3 channels

    # Blend: white pixels → brand blue, product pixels → unchanged
    blended = data * (1 - blend) + BRAND_BLUE[np.newaxis, np.newaxis, :] * blend

    return Image.fromarray(blended.astype(np.uint8), "RGB")


def auto_crop(img, bg_color=None, margin=20):
    """Crop to non-background bounding box with margin."""
    data = np.array(img.convert("RGB"))

    if bg_color is None:
        # Sample background from top-left corner
        bg_color = data[5, 5]

    # Find pixels that differ significantly from background
    diff = np.max(np.abs(data.astype(int) - bg_color.astype(int)), axis=2)
    mask = diff > 30  # Pixels differing >30 from bg in any channel

    rows = np.any(mask, axis=1)
    cols = np.any(mask, axis=0)

    if not rows.any() or not cols.any():
        return img  # No crop needed

    rmin, rmax = np.where(rows)[0][[0, -1]]
    cmin, cmax = np.where(cols)[0][[0, -1]]

    # Add margin
    rmin = max(0, rmin - margin)
    rmax = min(data.shape[0], rmax + margin)
    cmin = max(0, cmin - margin)
    cmax = min(data.shape[1], cmax + margin)

    return img.crop((cmin, rmin, cmax, rmax))


def vignette(canvas, strength=0.15):
    """Subtle edge vignette with blue-tinted darkening."""
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
    return Image.alpha_composite(canvas.convert("RGBA"), vig).convert("RGB")


def save(img, filename, note=""):
    """Save as high-quality JPEG."""
    path = os.path.join(OUT, filename)
    final = ImageEnhance.Sharpness(img).enhance(1.08)
    final.save(path, "JPEG", quality=93)
    kb = os.path.getsize(path) // 1024
    print(f"  ✅ {filename}  {img.size[0]}×{img.size[1]}  {kb}KB  {note}")


def composite_hero(input_path, output_filename, fill_pct=0.82, y_offset=-40, note=""):
    """
    Full pipeline:
    1. Load AI output (1:1, white bg)
    2. Blend white bg → brand blue (smooth, no artifacts)
    3. Auto-crop to product bounding box
    4. Scale product to fill_pct of canvas height
    5. Place centered on brand blue 16:9 canvas
    6. Add vignette
    """
    print(f"\n  Processing: {os.path.basename(input_path)}")

    raw = Image.open(input_path).convert("RGB")

    # Step 1: Blend white background to brand blue
    blended = blend_white_to_blue(raw, threshold=0.72, power=1.8)

    # Step 2: Auto-crop to product bounding box
    # Sample the new bg color (should be brand blue now)
    cropped = auto_crop(blended, bg_color=np.array(list(BRAND_BLUE)), margin=40)
    print(f"    Cropped: {raw.size} → {cropped.size}")

    # Step 3: Scale to fill canvas height
    target_h = int(H * fill_pct)
    scale = target_h / cropped.height
    target_w = int(cropped.width * scale)
    product = cropped.resize((target_w, target_h), Image.LANCZOS)

    # Step 4: Create brand blue canvas and paste
    canvas = Image.new("RGB", (W, H), tuple(BRAND_BLUE.astype(int)))
    cx = (W - product.width) // 2
    cy = (H - product.height) // 2 + y_offset
    canvas.paste(product, (cx, cy))

    # Step 5: Vignette
    canvas = vignette(canvas, strength=0.15)

    save(canvas, output_filename, note)
    return os.path.join(OUT, output_filename)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 build_v9_heroes.py <input_image> <output_filename> [fill_pct] [y_offset]")
        print("Example: python3 build_v9_heroes.py moons_photo.png v9_card1_who_moons.jpg 0.82 -40")
        sys.exit(1)

    input_path = sys.argv[1]
    output_name = sys.argv[2]
    fill = float(sys.argv[3]) if len(sys.argv) > 3 else 0.82
    offset = int(sys.argv[4]) if len(sys.argv) > 4 else -40

    composite_hero(input_path, output_name, fill_pct=fill, y_offset=offset)
