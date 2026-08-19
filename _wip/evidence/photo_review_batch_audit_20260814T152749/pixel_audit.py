#!/usr/bin/env python3
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps
from scipy import ndimage

SOURCE = Path('/Users/handtomouse/.codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814')
ASSETS = SOURCE / 'assets'
OUTPUT = Path('/Users/handtomouse/maplemoon-website/_wip/evidence/photo_review_batch_audit_20260814T152749')
FILES = {
    'powder': ('carob_powder_isolated.png', 'e935a9c6783f0fe0fed7659692d2cea0f4056afa4734a75e4dcba7b629966a27'),
    'elixir_pure': ('elixir_pure_isolated_equal-size.png', 'd3bda575c320bc42ca69b5ddd0ba806e392f9b7694d31f7ea0310c501fcbd18a'),
    'elixir_spiced': ('elixir_spiced_isolated_equal-size.png', '210aab110c8682d6140a50b3ee1621aec0ffe43a9d86841433a8852512c86bba'),
    'bundle': ('five_item_bundle_low_angle_isolated.png', 'ac87e7c1a5b6e96cc40d607e69a841f0b9987f642f3b32e4128dacad2c3814d6'),
}
REVIEW_HTML = SOURCE / 'maplemoon_product_corrections_review_20260814.html'
REVIEW_HTML_SHA256 = 'ed859eaa0d62a97d19bc2c377bf78084a9b3799d50b7eb47a0ecd7201ba90167'


def sha256(path):
    digest = hashlib.sha256()
    with path.open('rb') as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()


def composite(image, color):
    rgba = image.convert('RGBA')
    background = Image.new('RGBA', rgba.size, color + (255,))
    return Image.alpha_composite(background, rgba).convert('RGB')


metrics = {}
images = {}
for name, (filename, expected_hash) in FILES.items():
    path = ASSETS / filename
    raw_hash = sha256(path)
    with Image.open(path) as source_image:
        original_mode = source_image.mode
        original_format = source_image.format
        image = source_image.convert('RGBA')
    images[name] = image
    alpha = np.asarray(image.getchannel('A'))
    subject = alpha > 0
    y_values, x_values = np.where(subject)
    bounds = {
        'x': int(x_values.min()),
        'y': int(y_values.min()),
        'right_exclusive': int(x_values.max() + 1),
        'bottom_exclusive': int(y_values.max() + 1),
        'width': int(x_values.max() - x_values.min() + 1),
        'height': int(y_values.max() - y_values.min() + 1),
    }
    labels, component_count = ndimage.label(alpha > 127)
    component_sizes = np.bincount(labels.ravel())[1:]
    large_components = sorted((int(value) for value in component_sizes if value > 100), reverse=True)
    corners = [int(alpha[0, 0]), int(alpha[0, -1]), int(alpha[-1, 0]), int(alpha[-1, -1])]
    transparent = int(np.count_nonzero(alpha == 0))
    opaque = int(np.count_nonzero(alpha == 255))
    partial = int(np.count_nonzero((alpha > 0) & (alpha < 255)))
    metrics[name] = {
        'filename': filename,
        'sha256_expected': expected_hash,
        'sha256_actual': raw_hash,
        'hash_pass': raw_hash == expected_hash,
        'format': original_format,
        'mode': original_mode,
        'canvas': {'width': image.width, 'height': image.height},
        'alpha_extrema': [int(alpha.min()), int(alpha.max())],
        'transparent_pixels': transparent,
        'opaque_pixels': opaque,
        'partially_transparent_pixels': partial,
        'subject_pixels_alpha_gt_zero': int(np.count_nonzero(subject)),
        'subject_bounds': bounds,
        'corner_alpha': corners,
        'components_alpha_gt_127_total': int(component_count),
        'components_alpha_gt_127_over_100_pixels': len(large_components),
        'largest_components_alpha_gt_127': large_components[:10],
        'genuine_alpha_pass': original_mode == 'RGBA' and transparent > 0 and opaque > 0 and int(alpha.min()) == 0 and int(alpha.max()) == 255,
        'nonempty_subject_pass': bool(np.any(subject)) and bounds['width'] > 0 and bounds['height'] > 0,
        'transparent_border_pass': corners == [0, 0, 0, 0] and transparent > image.width * image.height * 0.5,
        'baked_full_canvas_checkerboard_absent': corners == [0, 0, 0, 0] and transparent > 0,
    }
    metrics[name]['mechanical_pass'] = all([
        metrics[name]['hash_pass'],
        image.width > 0,
        image.height > 0,
        metrics[name]['genuine_alpha_pass'],
        metrics[name]['nonempty_subject_pass'],
        metrics[name]['transparent_border_pass'],
        metrics[name]['baked_full_canvas_checkerboard_absent'],
    ])

pure_bounds = metrics['elixir_pure']['subject_bounds']
spiced_bounds = metrics['elixir_spiced']['subject_bounds']
elixir_geometry = {
    'pure_bounds': pure_bounds,
    'spiced_bounds': spiced_bounds,
    'pure_centerline': (pure_bounds['x'] + pure_bounds['right_exclusive']) / 2,
    'spiced_centerline': (spiced_bounds['x'] + spiced_bounds['right_exclusive']) / 2,
    'pure_baseline': pure_bounds['bottom_exclusive'],
    'spiced_baseline': spiced_bounds['bottom_exclusive'],
}
elixir_geometry['pass'] = all([
    pure_bounds == spiced_bounds,
    pure_bounds['x'] == 335,
    pure_bounds['y'] == 108,
    pure_bounds['width'] == 584,
    pure_bounds['height'] == 975,
    elixir_geometry['pure_centerline'] == elixir_geometry['spiced_centerline'],
    elixir_geometry['pure_baseline'] == elixir_geometry['spiced_baseline'],
])

powder_mechanical = {
    'bounds': metrics['powder']['subject_bounds'],
    'large_component_count': metrics['powder']['components_alpha_gt_127_over_100_pixels'],
    'single_primary_alpha_component_pass': metrics['powder']['components_alpha_gt_127_over_100_pixels'] == 1,
}

light = (244, 240, 232)
dark = (17, 17, 15)
composites = {}
for name, image in images.items():
    composites[(name, 'light')] = composite(image, light)
    composites[(name, 'dark')] = composite(image, dark)

composites[('powder', 'light')].save(OUTPUT / 'powder_on_white.png')
composites[('bundle', 'light')].save(OUTPUT / 'bundle_on_light.png')
composites[('bundle', 'dark')].save(OUTPUT / 'bundle_on_dark.png')

canvas = Image.new('RGB', (1480, 1660), (34, 34, 31))
draw = ImageDraw.Draw(canvas)
font = ImageFont.load_default(size=18)
title_font = ImageFont.load_default(size=26)
draw.text((28, 20), 'MapleMoon four-asset independent mechanical contact sheet', fill=(244, 240, 232), font=title_font)
draw.text((28, 58), 'Light and dark composites from source RGBA; review-only, no SKU or live-use approval.', fill=(190, 185, 176), font=font)
order = ['powder', 'elixir_pure', 'elixir_spiced', 'bundle']
labels_text = {
    'powder': 'carob powder isolated',
    'elixir_pure': 'pure elixir, reconstructed fine print held',
    'elixir_spiced': 'spiced elixir, reconstructed fine print held',
    'bundle': 'five-body bundle, SKU identity and acceptance held',
}
for row, name in enumerate(order):
    top = 100 + row * 385
    draw.text((28, top), labels_text[name], fill=(244, 240, 232), font=font)
    for column, background in enumerate(['light', 'dark']):
        x = 28 + column * 718
        thumb = ImageOps.contain(composites[(name, background)], (690, 330), Image.Resampling.LANCZOS)
        stage = Image.new('RGB', (690, 330), light if background == 'light' else dark)
        stage.paste(thumb, ((690 - thumb.width) // 2, (330 - thumb.height) // 2))
        canvas.paste(stage, (x, top + 28))
        draw.text((x + 8, top + 36), background, fill=(30, 30, 28) if background == 'light' else (244, 240, 232), font=font)
canvas.save(OUTPUT / 'mechanical_contact_sheet.png')

result = {
    'review_html': {
        'path': str(REVIEW_HTML),
        'sha256_expected': REVIEW_HTML_SHA256,
        'sha256_actual': sha256(REVIEW_HTML),
        'pass': sha256(REVIEW_HTML) == REVIEW_HTML_SHA256,
    },
    'assets': metrics,
    'elixir_geometry': elixir_geometry,
    'powder_mechanical': powder_mechanical,
    'rendered_checks': {
        'powder_on_white': 'powder_on_white.png',
        'bundle_on_light': 'bundle_on_light.png',
        'bundle_on_dark': 'bundle_on_dark.png',
        'contact_sheet': 'mechanical_contact_sheet.png',
    },
}
result['all_mechanical_pass'] = all(item['mechanical_pass'] for item in metrics.values()) and elixir_geometry['pass'] and powder_mechanical['single_primary_alpha_component_pass'] and result['review_html']['pass']
(OUTPUT / 'pixel_geometry_results.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
print(json.dumps(result, indent=2))
raise SystemExit(0 if result['all_mechanical_pass'] else 1)
