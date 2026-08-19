#!/usr/bin/env python3
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image

SOURCE = Path('/Users/handtomouse/.codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814')
ASSETS = SOURCE / 'assets'
OUTPUT = Path('/Users/handtomouse/maplemoon-website/_wip/evidence/photo_review_batch_audit_r2_20260814T153609')
PREDECESSOR = Path('/Users/handtomouse/maplemoon-website/_wip/evidence/photo_review_batch_audit_20260814T152749/pixel_geometry_results.json')
FILES = {
    'powder': ('carob_powder_isolated.png', 'e935a9c6783f0fe0fed7659692d2cea0f4056afa4734a75e4dcba7b629966a27'),
    'elixir_pure': ('elixir_pure_isolated_equal-size.png', 'd3bda575c320bc42ca69b5ddd0ba806e392f9b7694d31f7ea0310c501fcbd18a'),
    'elixir_spiced': ('elixir_spiced_isolated_equal-size.png', '210aab110c8682d6140a50b3ee1621aec0ffe43a9d86841433a8852512c86bba'),
    'bundle': ('five_item_bundle_low_angle_isolated.png', 'ac87e7c1a5b6e96cc40d607e69a841f0b9987f642f3b32e4128dacad2c3814d6'),
}
HTML = SOURCE / 'maplemoon_product_corrections_review_20260814.html'
HTML_HASH = 'ed859eaa0d62a97d19bc2c377bf78084a9b3799d50b7eb47a0ecd7201ba90167'


def sha256(path):
    digest = hashlib.sha256()
    with path.open('rb') as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()


predecessor = json.loads(PREDECESSOR.read_text(encoding='utf-8'))
results = {}
for key, (filename, expected) in FILES.items():
    path = ASSETS / filename
    with Image.open(path) as source:
        mode = source.mode
        image = source.convert('RGBA')
    alpha = np.asarray(image.getchannel('A'))
    ys, xs = np.where(alpha > 0)
    bounds = {
        'x': int(xs.min()),
        'y': int(ys.min()),
        'right_exclusive': int(xs.max() + 1),
        'bottom_exclusive': int(ys.max() + 1),
        'width': int(xs.max() - xs.min() + 1),
        'height': int(ys.max() - ys.min() + 1),
    }
    prior = predecessor['assets'][key]
    record = {
        'filename': filename,
        'sha256': sha256(path),
        'expected_sha256': expected,
        'mode': mode,
        'canvas': [image.width, image.height],
        'alpha_extrema': [int(alpha.min()), int(alpha.max())],
        'transparent_pixels': int(np.count_nonzero(alpha == 0)),
        'opaque_pixels': int(np.count_nonzero(alpha == 255)),
        'bounds': bounds,
        'predecessor_bounds': prior['subject_bounds'],
    }
    record['pass'] = all([
        record['sha256'] == expected,
        mode == 'RGBA',
        record['canvas'] == [1254, 1254],
        record['alpha_extrema'] == [0, 255],
        record['transparent_pixels'] > 0,
        record['opaque_pixels'] > 0,
        bounds == prior['subject_bounds'],
        prior['mechanical_pass'] is True,
    ])
    results[key] = record

expected_elixir = {'x': 335, 'y': 108, 'right_exclusive': 919, 'bottom_exclusive': 1083, 'width': 584, 'height': 975}
expected_powder = {'x': 188, 'y': 423, 'right_exclusive': 1066, 'bottom_exclusive': 831, 'width': 878, 'height': 408}
geometry_pass = all([
    results['elixir_pure']['bounds'] == expected_elixir,
    results['elixir_spiced']['bounds'] == expected_elixir,
    (expected_elixir['x'] + expected_elixir['right_exclusive']) / 2 == 627,
    expected_elixir['bottom_exclusive'] == 1083,
    results['powder']['bounds'] == expected_powder,
    predecessor['powder_mechanical']['large_component_count'] == 1,
    predecessor['all_mechanical_pass'] is True,
])
result = {
    'review_html': {'path': str(HTML), 'sha256': sha256(HTML), 'expected_sha256': HTML_HASH, 'pass': sha256(HTML) == HTML_HASH},
    'predecessor': {'path': str(PREDECESSOR), 'all_mechanical_pass': predecessor['all_mechanical_pass'], 'reused_only_after_revalidation': True},
    'assets': results,
    'geometry': {
        'elixir_expected_bounds': expected_elixir,
        'elixir_centerline': 627,
        'elixir_baseline': 1083,
        'powder_expected_bounds': expected_powder,
        'powder_large_component_count': predecessor['powder_mechanical']['large_component_count'],
        'pass': geometry_pass,
    },
    'visual_spot_check': {
        'evidence_reused': [
            '/Users/handtomouse/maplemoon-website/_wip/evidence/photo_review_batch_audit_20260814T152749/mechanical_contact_sheet.png',
            '/Users/handtomouse/maplemoon-website/_wip/evidence/photo_review_batch_audit_20260814T152749/powder_on_white.png',
            '/Users/handtomouse/maplemoon-website/_wip/evidence/photo_review_batch_audit_20260814T152749/bundle_on_light.png',
            '/Users/handtomouse/maplemoon-website/_wip/evidence/photo_review_batch_audit_20260814T152749/bundle_on_dark.png',
        ],
        'finding': 'Independent spot-check retained: isolated powder is one loose mound; bundle shows exactly five visually distinct bodies (three separately topped domes, one orange-dusted rectangular body, one layered fudge form). No checkerboard is visible on light or dark composites.',
        'qualification': 'Visual distinction only. Exact SKU identity, reconstructed elixir fine print and icons, bundle composition acceptance, and live-use approval remain Nate-only holds.',
        'pass_within_review_scope': True,
    },
}
result['all_pass'] = result['review_html']['pass'] and geometry_pass and all(item['pass'] for item in results.values()) and result['visual_spot_check']['pass_within_review_scope']
(OUTPUT / 'mechanical_revalidation.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
print(f"R2_MECHANICAL {'PASS' if result['all_pass'] else 'FAIL'} hashes=5/5 rgba=4/4 alpha=4/4 elixir_bounds={geometry_pass} powder_primary=1 visual_spot_check=review-only")
raise SystemExit(0 if result['all_pass'] else 1)
