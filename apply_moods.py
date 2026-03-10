#!/usr/bin/env python3
"""
MapleMoon Mood Board Image Applicator — v2 (smart selection)
Restores HTML files from .bak, copies description-filtered mood images
into assets/mood/, and wires them into hero_v10, v13, v14, v16.

Selection criteria: non-branded, atmospheric, organic — chosen by
scanning manifest descriptions for brand/competitor names.

Usage:
    cd ~/maplemoon-website && python3 apply_moods.py
"""

import json
import shutil
from pathlib import Path

# ── Paths ──────────────────────────────────────────────────────────────────
SITE_DIR      = Path(__file__).parent
MANIFEST_PATH = Path.home() / 'Desktop/mm_stage2_pinterest/category_manifest.json'
MOOD_DIR      = SITE_DIR / 'assets/mood'
CATEGORIZED   = Path.home() / 'Desktop/mm_stage2_pinterest/categorized'


# ── Step 0: Restore HTML files from backups ────────────────────────────────

def restore_backups():
    for name in ['hero_v10', 'hero_v13', 'hero_v14', 'hero_v16']:
        bak = SITE_DIR / f'{name}.html.bak'
        html = SITE_DIR / f'{name}.html'
        if bak.exists():
            shutil.copy2(bak, html)
            print(f'  restored {name}.html from .bak')
        else:
            print(f'  WARNING: no .bak found for {name}.html — using current file')


# ── Step 1: Pick images by explicit sorted index ───────────────────────────

def get_sorted(manifest: dict, category: str) -> list[dict]:
    """Return items sorted by confidence descending, errors excluded."""
    items = manifest['categories'].get(category, [])
    items = [i for i in items if not i.get('error')]
    return sorted(items, key=lambda x: x.get('confidence', 0), reverse=True)


def pick(manifest: dict, category: str, index: int) -> tuple[Path, str]:
    """Return (absolute_src_path, relative_asset_path) for a specific index."""
    items = get_sorted(manifest, category)
    if index >= len(items):
        raise IndexError(f'{category}[{index}] out of range (only {len(items)} items)')
    item = items[index]
    src = CATEGORIZED / category / item['filename']
    rel = f'assets/mood/{category}/{item["filename"]}'
    print(f'  {category}[{index}] → {item["filename"]}')
    print(f'    "{item["description"][:70]}"')
    return src, rel


def copy_mood_images(manifest: dict) -> dict:
    """
    Copy all needed mood images into assets/mood/[category]/.
    Returns nested dict: picks[key] = relative asset path for use in HTML.
    """
    # Clean and recreate mood dir
    if MOOD_DIR.exists():
        shutil.rmtree(MOOD_DIR)

    picks = {}
    needed = [
        # key,                category,            index
        ('v10_bg',           'brand_palette',      2),  # moody incense smoke
        ('v13_bg',           'hero_lifestyle',     3),  # coastal/elixir/fruits
        ('v14_img1',         'flatlay_editorial',  8),  # carob bar + flour, monochromatic, no branding
        ('v14_img3',         'flatlay_editorial',  1),  # ceramic/dried ingredients
        # v16 masonry
        ('v16_bp0',          'brand_palette',      0),  # abstract spheres/geometric
        ('v16_bp3',          'brand_palette',      3),  # pear silhouette/soft blue
        ('v16_bp4',          'brand_palette',      4),  # wood on water/dark navy
        ('v16_fe1',          'flatlay_editorial',  1),  # ceramic/dried (same as v14_img3)
        ('v16_fe2',          'flatlay_editorial',  2),  # pears/concrete/botanicals
        ('v16_fe3',          'flatlay_editorial',  3),  # wellness/flowers/citrus
        ('v16_fe6',          'flatlay_editorial',  6),  # pouches/brass/dried fruit
        ('v16_fe7',          'flatlay_editorial',  7),  # herbs/linen/minimal
        ('v16_fe8',          'flatlay_editorial',  8),  # carob bar + scattered flour
        ('v16_hl4',          'hero_lifestyle',     4),  # silhouetted figure/warm orange
    ]

    for key, category, index in needed:
        src, rel = pick(manifest, category, index)
        # Copy file
        dest_dir = MOOD_DIR / category
        dest_dir.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest_dir / src.name)
        picks[key] = rel

    return picks


# ── Step 2–5: Update HTML files ────────────────────────────────────────────

def write_bak_and_read(path: Path) -> str:
    bak = path.with_suffix('.html.bak')
    content = path.read_text(encoding='utf-8')
    bak.write_text(content, encoding='utf-8')
    return content


def update_v10(picks: dict):
    """Letterbox Cinema — moody incense smoke bg."""
    p = SITE_DIR / 'hero_v10.html'
    hero = picks['v10_bg']
    content = write_bak_and_read(p)
    n = 0

    replacements = [
        ('href="assets/products/bar_bundle.jpg"',
         f'href="{hero}"'),
        ('src="assets/products/bar_bundle.jpg" alt="" aria-hidden="true"',
         f'src="{hero}" alt="" aria-hidden="true"'),
    ]
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new, 1)
            n += 1

    p.write_text(content, encoding='utf-8')
    print(f'  hero_v10.html: {n} replacements')


def update_v13(picks: dict):
    """Full Bleed Photo — coastal lifestyle bg."""
    p = SITE_DIR / 'hero_v13.html'
    hero = picks['v13_bg']
    content = write_bak_and_read(p)
    n = 0

    replacements = [
        ('href="assets/products/bar_bundle.jpg"',
         f'href="{hero}"'),
        ("url('assets/products/bar_bundle.jpg') center/cover no-repeat",
         f"url('{hero}') center/cover no-repeat"),
    ]
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new, 1)
            n += 1

    p.write_text(content, encoding='utf-8')
    print(f'  hero_v13.html: {n} replacements')


def update_v14(picks: dict):
    """Ingredient Journey — img1: carob powder, img3: ceramic/dried."""
    p = SITE_DIR / 'hero_v14.html'
    texture = picks['v14_img1']
    lifestyle = picks['v14_img3']
    content = write_bak_and_read(p)
    n = 0

    replacements = [
        ('href="assets/products/powder_roasted.jpg"',
         f'href="{texture}"'),
        ('src="assets/products/powder_roasted.jpg" alt="Raw carob pods and natural ingredients"',
         f'src="{texture}" alt="Raw carob pods and natural ingredients"'),
        ('src="assets/products_clean/bar_pure_carob.png" alt="MapleMoon Original Bar"',
         f'src="{lifestyle}" alt="MapleMoon Original Bar"'),
    ]
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new, 1)
            n += 1

    p.write_text(content, encoding='utf-8')
    print(f'  hero_v14.html: {n} replacements')


def update_v16(picks: dict):
    """
    Moodboard Collage — swap 10 product images for atmospheric mood images.
    Each product appears twice (duplicated columns for infinite scroll),
    so replace_all handles both copies.
    """
    p = SITE_DIR / 'hero_v16.html'
    content = write_bak_and_read(p)
    n = 0

    swaps = [
        ('assets/products/eclipse_almond.jpg',      picks['v16_bp0']),  # abstract spheres
        ('assets/products/moon_almond.jpg',          picks['v16_bp3']),  # pear silhouette
        ('assets/products/moon_coconut.jpg',         picks['v16_bp4']),  # wood on water
        ('assets/products_clean/elixir_spiced.png',  picks['v16_fe1']),  # ceramic/dried
        ('assets/products/eclipse_goji.jpg',         picks['v16_fe2']),  # pears/botanicals
        ('assets/products/bananas.jpg',              picks['v16_fe3']),  # wellness/citrus
        ('assets/products/bar_bundle.jpg',           picks['v16_fe6']),  # pouches/brass/fruit
        ('assets/products/eclipse_bundle.jpg',       picks['v16_fe7']),  # herbs/linen
        ('assets/products/powder_roasted.jpg',       picks['v16_fe8']),  # carob bar + flour
        ('assets/products/moon_hazelnut.jpg',        picks['v16_hl4']),  # silhouette/warm orange
    ]

    for old_src, new_src in swaps:
        old_attr = f'src="{old_src}"'
        new_attr = f'src="{new_src}"'
        count = content.count(old_attr)
        if count > 0:
            content = content.replace(old_attr, new_attr)
            n += count
        else:
            print(f'    NOT FOUND: {old_src}')

    p.write_text(content, encoding='utf-8')
    print(f'  hero_v16.html: {n} replacements (includes duplicates)')


# ── Entry point ─────────────────────────────────────────────────────────────

def main():
    if not MANIFEST_PATH.exists():
        print(f'ERROR: Manifest not found: {MANIFEST_PATH}')
        raise SystemExit(1)

    manifest = json.loads(MANIFEST_PATH.read_text())

    print('=== STEP 0: RESTORING FROM BACKUPS ===')
    restore_backups()
    print()

    print('=== STEP 1: COPYING SMART-SELECTED MOOD IMAGES ===')
    picks = copy_mood_images(manifest)
    print()

    print('=== STEP 2-5: UPDATING HERO FILES ===')
    update_v10(picks)
    update_v13(picks)
    update_v14(picks)
    update_v16(picks)
    print()

    print('=== COMPLETE ===')
    for v in ['hero_v10', 'hero_v13', 'hero_v14', 'hero_v16']:
        print(f'  http://localhost:3004/{v}.html')


if __name__ == '__main__':
    main()
