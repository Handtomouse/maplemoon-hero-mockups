#!/usr/bin/env python3
"""
MapleMoon — Bar Size Normalisation
Extracts tight bounding box of each bar, resizes product to consistent
960px tall, recentres on 1024×1536 transparent canvas, overwrites file.
"""
import os
import numpy as np
from PIL import Image

CLEAN = os.path.expanduser("~/maplemoon-website/assets/products_clean")
TARGET_H = 960
CANVAS_W, CANVAS_H = 1024, 1536

bars = [
    "bar_almond.png",
    "bar_cayenne.png",
    "bar_hazelnut.png",
    "bar_pure_carob.png",
    "bar_goji_coconut.png",
]

print(f"\nNormalising bars to {TARGET_H}px product height...\n")
print(f"{'File':<25} {'Before':>12} {'After':>12} {'Change':>10}")
print("-" * 62)

for fname in bars:
    path = os.path.join(CLEAN, fname)
    img  = Image.open(path).convert("RGBA")

    # Find tight bounding box of non-transparent pixels
    alpha = np.array(img.split()[3])
    rows  = np.any(alpha > 10, axis=1)
    cols  = np.any(alpha > 10, axis=0)
    rmin, rmax = np.where(rows)[0][[0, -1]]
    cmin, cmax = np.where(cols)[0][[0, -1]]

    before_h = rmax - rmin
    before_w = cmax - cmin

    # Crop to tight bounding box
    cropped = img.crop((cmin, rmin, cmax + 1, rmax + 1))

    # Resize to target height, maintain aspect ratio
    aspect   = cropped.width / cropped.height
    new_h    = TARGET_H
    new_w    = int(round(new_h * aspect))
    resized  = cropped.resize((new_w, new_h), Image.LANCZOS)

    # Paste recentred on fresh transparent canvas
    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    paste_x = (CANVAS_W - new_w) // 2
    paste_y = (CANVAS_H - new_h) // 2
    canvas.paste(resized, (paste_x, paste_y), resized)

    canvas.save(path, "PNG")

    change = f"{'+' if new_h > before_h else ''}{new_h - before_h}px"
    print(f"{fname:<25} {before_w}×{before_h:>5} {new_w}×{new_h:>5} {change:>10}")

print("\nVerifying final bounding boxes...")
print(f"\n{'File':<25} {'Product W':>10} {'Product H':>10} {'Aspect':>8}")
print("-" * 56)

for fname in bars:
    img   = Image.open(os.path.join(CLEAN, fname)).convert("RGBA")
    alpha = np.array(img.split()[3])
    rows  = np.any(alpha > 10, axis=1)
    cols  = np.any(alpha > 10, axis=0)
    rmin, rmax = np.where(rows)[0][[0, -1]]
    cmin, cmax = np.where(cols)[0][[0, -1]]
    pw = cmax - cmin
    ph = rmax - rmin
    print(f"{fname:<25} {pw:>10}px {ph:>10}px {pw/ph:>8.3f}")

print("\n✅ Done. All bars normalised.")
