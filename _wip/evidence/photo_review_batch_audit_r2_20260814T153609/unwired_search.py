#!/usr/bin/env python3
import json
import os
from pathlib import Path

OUTPUT = Path('/Users/handtomouse/maplemoon-website/_wip/evidence/photo_review_batch_audit_r2_20260814T153609')
CONTROL = OUTPUT / 'unwired_search_positive_control.txt'
TARGETS = [
    'carob_powder_isolated.png',
    'elixir_pure_isolated_equal-size.png',
    'elixir_spiced_isolated_equal-size.png',
    'five_item_bundle_low_angle_isolated.png',
]
ROOTS = [
    Path('/Users/handtomouse/maplemoon-website'),
    Path('/Users/handtomouse/maplemoon_build_20260813'),
]
ALLOWED_CONTROL_PREFIXES = [
    Path('/Users/handtomouse/maplemoon-website/docs/orchestration/packets'),
    Path('/Users/handtomouse/maplemoon-website/docs/orchestration/reviews'),
    Path('/Users/handtomouse/maplemoon-website/_wip/evidence/photo_review_batch_audit_20260814T152749'),
    OUTPUT,
]


def under(path, prefix):
    try:
        path.relative_to(prefix)
        return True
    except ValueError:
        return False


def allowed(path):
    return any(under(path, prefix) for prefix in ALLOWED_CONTROL_PREFIXES)


all_matches = []
files_scanned = 0
bytes_scanned = 0
for root in ROOTS:
    for current, directories, filenames in os.walk(root, followlinks=False):
        directories[:] = [name for name in directories if name not in {'.git', 'node_modules'}]
        current_path = Path(current)
        for filename in filenames:
            path = current_path / filename
            files_scanned += 1
            for target in TARGETS:
                if target in str(path.relative_to(root)):
                    all_matches.append({'root': str(root), 'path': str(path), 'target': target, 'kind': 'path', 'allowed_control_plane': allowed(path)})
            try:
                data = path.read_bytes()
            except (OSError, PermissionError):
                continue
            bytes_scanned += len(data)
            for target in TARGETS:
                occurrences = data.count(target.encode('utf-8'))
                if occurrences:
                    all_matches.append({'root': str(root), 'path': str(path), 'target': target, 'kind': 'content', 'occurrences': occurrences, 'allowed_control_plane': allowed(path)})

control_data = CONTROL.read_text(encoding='utf-8')
control = {target: control_data.count(target) for target in TARGETS}
control_pass = all(count == 1 for count in control.values())
forbidden_matches = [match for match in all_matches if not match['allowed_control_plane']]
by_root = {}
for root in ROOTS:
    root_text = str(root)
    matches = [match for match in all_matches if match['root'] == root_text]
    by_root[root_text] = {
        'all_match_records': len(matches),
        'control_plane_match_records': len([match for match in matches if match['allowed_control_plane']]),
        'website_or_build_match_records': len([match for match in matches if not match['allowed_control_plane']]),
    }

result = {
    'targets': TARGETS,
    'roots': [str(root) for root in ROOTS],
    'method': 'Recursive path-name and raw-byte filename search; .git and node_modules excluded. Control-plane packet, receipt and named audit evidence paths are classified separately from website/build wiring.',
    'files_scanned': files_scanned,
    'bytes_scanned': bytes_scanned,
    'positive_control': {'path': str(CONTROL), 'counts': control, 'pass': control_pass},
    'by_root': by_root,
    'all_matches': all_matches,
    'forbidden_website_or_build_matches': forbidden_matches,
    'all_pass': control_pass and len(forbidden_matches) == 0,
}
(OUTPUT / 'unwired_search_results.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
print(f"R2_UNWIRED {'PASS' if result['all_pass'] else 'FAIL'} control=4/4 site_or_build_matches={len(forbidden_matches)} files={files_scanned} bytes={bytes_scanned}")
raise SystemExit(0 if result['all_pass'] else 1)
