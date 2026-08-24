#!/usr/bin/env python3
import csv
import hashlib
import json
import subprocess
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path('/Users/handtomouse/maplemoon-website')
EVIDENCE = ROOT / '_wip/evidence/shopify_catalogue_reconciliation_r3_20260824T104207'
WOO = Path('/Users/handtomouse/Library/Messages/Attachments/e0/00/3631B118-5A32-487A-8E55-C0533B3B96CB/Maple Moon Store CSV File Export.csv')

PINS = {
    'docs/orchestration/MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md': 'bc23e18da7b2e03d1d2eb4d9ab613b23fc226650870d848e9636fc1ddcca9c10',
    'docs/orchestration/CATALOGUE-RECONCILIATION-20260820.md': 'b80cd3e8158d14d03f631cba79e1f3590e27587493b2dfbeef2ab1180afad7f1',
    'docs/orchestration/catalogue-reconciliation-20260820.csv': 'b866aff0954963f81cf9515854fff06250a89b8cae6374f23d4c7f33b38c8281',
    'docs/orchestration/reviews/MAPLEMOON-CONTENT-CATALOGUE-TRUTH-AUDIT-R2-20260814T164221.md': 'eee350fd321947cf5966818636cc68b6828ce6574a6d49c03f573ef360d70060',
    '_wip/shop.WIP.html': 'f9d150dea283d43eb0a14e02dfeccf9ea1eb4eae87ec82a546ab6984f3fa5604',
    'out/shopify_diff_20260823.md': '79a51d356295e1fa005123d4583f8248bc2bc6abc44449b04b00caa8a41d56bb',
    'out/shopify_create_spec_20260823.md': '65292dbbbbc7a55edf476784897313fc1bacb243c85f413b44368d2879916e99',
    'out/maplemoon_lane_20260823_receipt.json': 'c8b5285191fe1fba5ab2f21c707aebe2923d669919a30f52a3a0540135900468',
}
WOO_SHA = 'eeea19fd89b30052bd4c4cf28519f56f1195e4595c92485fb186a66719e6b114'

def sha(path):
    h = hashlib.sha256()
    with path.open('rb') as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()

for relative, expected in PINS.items():
    actual = sha(ROOT / relative)
    if actual != expected:
        raise SystemExit(f'PIN_FAIL {relative} expected={expected} actual={actual}')
if sha(WOO) != WOO_SHA:
    raise SystemExit('PIN_FAIL Woo export')

with WOO.open(newline='', encoding='utf-8-sig') as handle:
    woo_rows = list(csv.DictReader(handle))

parents = [row for row in woo_rows if row['Type'] != 'variation']
variations = [row for row in woo_rows if row['Type'] == 'variation']
simple = [row for row in parents if row['Type'] == 'simple']
if (len(woo_rows), len(parents), len(variations), len(variations) + len(simple)) != (119, 28, 91, 99):
    raise SystemExit('WOO_COUNT_FAIL')
if any(row['SKU'] or row['GTIN, UPC, EAN, or ISBN'] for row in woo_rows):
    raise SystemExit('WOO_IDENTIFIER_FAIL')
if any(row['Stock'] or row['Weight (kg)'] for row in woo_rows):
    raise SystemExit('WOO_BLANK_FIELD_FAIL')

parents_by_id = {row['ID']: row for row in parents}
variants_by_parent = defaultdict(list)
for row in variations:
    variants_by_parent[row['Parent'].removeprefix('id:')].append(row)

products = [
    ('B01', 'Bars', 'Pure Carob & Cacao Butter', '6012', '8708816240837', 'UPDATE'),
    ('B02', 'Bars', 'Peppermint & Buckwheat', '5451', '8708824105157', 'UPDATE'),
    ('B03', 'Bars', 'Roasted Hazelnut', '5436', '8708825317573', 'UPDATE'),
    ('B04', 'Bars', 'Coconut & Goji', '2416', '8708819681477', 'UPDATE'),
    ('B05', 'Bars', 'Cayenne Chilli', '5145', '8708821156037', 'UPDATE'),
    ('B06', 'Bars', 'Almond & Celtic Salt', '5133', '8708822499525', 'UPDATE'),
    ('N01', 'Moons', 'Pure Carob Moon', None, None, 'CREATE'),
    ('N02', 'Moons', 'Peppermint Moon', '5556', '8708832821445', 'UPDATE'),
    ('N03', 'Moons', 'Roasted Hazelnut Moon', '5550', '8708832198853', 'UPDATE'),
    ('N04', 'Moons', 'Coconut & Goji Moon', '2395', '8708830003397', 'UPDATE'),
    ('N05', 'Moons', 'Cayenne Moon', None, None, 'CREATE'),
    ('N06', 'Moons', 'Almond Moon', '5540', '8708830888133', 'UPDATE'),
    ('N07', 'Eclipses', 'Pecan Nut Eclipse Bite', '2850', None, 'CREATE'),
    ('N08', 'Eclipses', 'Salted Almond Eclipse Bite', '2877', None, 'CREATE'),
    ('N09', 'Eclipses', 'Hazelnut Eclipse Bite', '2857', None, 'CREATE'),
    ('N10', 'Eclipses', 'Goji Ripe Eclipse Bite', '2883', None, 'CREATE'),
    ('N11', 'Eclipses', 'Salted Caramel Fudge', '2889', None, 'CREATE'),
    ('N12', 'Eclipses', 'Eclipse Bite Bundle', '6035', None, 'CREATE'),
    ('N13', 'Bites', 'Goji Carob Bites', None, None, 'CREATE'),
    ('N14', 'Bites', 'Coconut Carob Bites', None, None, 'CREATE'),
    ('N15', 'Elixirs', 'Pure Carob Elixir', '3345', '8708835180741', 'UPDATE'),
    ('N16', 'Elixirs', 'Spiced Carob Elixir', '2440', '8708835672261', 'UPDATE'),
    ('N17', 'Bananas', 'Carob Bananas', '2432', '8708834623685', 'UPDATE'),
    ('N18', 'Powder', 'Carob Powder', '5927', None, 'CREATE'),
]

live = [
    ('8708816240837', 'Pure Carob & Cacao Butter Bar', 'ACTIVE', 'B01', 'UPDATE'),
    ('8708824105157', 'Peppermint Buckwheat Crisp Bar', 'ACTIVE', 'B02', 'UPDATE'),
    ('8708825317573', 'Roasted Dark Hazelnut Bar', 'ACTIVE', 'B03', 'UPDATE'),
    ('8708819681477', 'Goji & Coconut Bar', 'ACTIVE', 'B04', 'UPDATE'),
    ('8708821156037', 'Cayenne Chilli & Celtic Salt Bar', 'ACTIVE', 'B05', 'UPDATE'),
    ('8708822499525', 'Salted Almond Bar', 'ACTIVE', 'B06', 'UPDATE'),
    ('8708828922053', 'Pure Carob & Cacao Butter Moons', 'ACTIVE', None, 'ARCHIVE_PROPOSAL'),
    ('8708832821445', 'Peppermint Buckwheat Crisp Moons', 'ACTIVE', 'N02', 'UPDATE'),
    ('8708832198853', 'Roasted Hazelnut Moons', 'ACTIVE', 'N03', 'UPDATE'),
    ('8708830003397', 'Coconut & Goji Moons', 'ACTIVE', 'N04', 'UPDATE'),
    ('8708831609029', 'Cayenne Chilli Celtic Salt Moons', 'ACTIVE', None, 'ARCHIVE_PROPOSAL'),
    ('8708830888133', 'Almond Celtic Salt Moons', 'ACTIVE', 'N06', 'UPDATE'),
    ('8708835180741', 'Plain Carob Elixir', 'DRAFT', 'N15', 'UPDATE'),
    ('8708835672261', 'Spiced Carob Elixir', 'DRAFT', 'N16', 'UPDATE'),
    ('8708834623685', 'Carob Bananas', 'ACTIVE', 'N17', 'UPDATE'),
    ('8708840227013', 'Digital Gift Card', 'DRAFT', None, 'ARCHIVE_PROPOSAL'),
    ('8708839669957', 'Gift Box — Premium', 'DRAFT', None, 'ARCHIVE_PROPOSAL'),
    ('8708839309509', 'Gift Box — Classic', 'DRAFT', None, 'ARCHIVE_PROPOSAL'),
    ('8708838064325', 'Mixed Moons 6-Pack', 'DRAFT', None, 'ARCHIVE_PROPOSAL'),
    ('8708837638341', 'Mixed Bars 6-Pack', 'DRAFT', None, 'ARCHIVE_PROPOSAL'),
    ('8708837146821', 'The Full Range', 'DRAFT', None, 'ARCHIVE_PROPOSAL'),
    ('8708836655301', 'Moon Sampler', 'DRAFT', None, 'ARCHIVE_PROPOSAL'),
    ('8708836196549', 'The Starter Pack', 'DRAFT', None, 'ARCHIVE_PROPOSAL'),
]

def woo_variants(parent_id):
    if not parent_id:
        return []
    parent = parents_by_id[parent_id]
    source = variants_by_parent[parent_id] if parent['Type'] == 'variable' else [parent]
    if parent['Type'] == 'variable':
        source = sorted(
            source,
            key=lambda row: int((row['Attribute 1 value(s)'].split() or ['999'])[0])
            if (row['Attribute 1 value(s)'].split() or [''])[0].isdigit()
            else 999,
        )
    result = []
    for row in source:
        sale = row['Sale price'] or None
        regular = row['Regular price'] or None
        result.append({
            'woo_record_id': row['ID'],
            'option': row['Attribute 1 value(s)'] if parent['Type'] == 'variable' else 'Default Title',
            'effective_price': sale or regular,
            'compare_at_price': regular if sale and regular else None,
            'sale_price': sale,
            'regular_price': regular,
            'sku': None,
            'gtin': None,
            'stock_quantity': None,
            'availability': 'in_stock' if row['In stock?'] == '1' else 'out_of_stock',
            'inventory_policy': 'deny' if row['Backorders allowed?'] == '0' else 'continue',
            'shipping_weight': None,
        })
    return result

catalogue = []
for stable_id, family, title, woo_parent, shopify_id, disposition in products:
    catalogue.append({
        'stable_id': stable_id,
        'family': family,
        'customer_title': title,
        'woo_parent_id': woo_parent,
        'woo_parent_title': parents_by_id[woo_parent]['Name'] if woo_parent else None,
        'shopify_product_id': shopify_id,
        'proposed_disposition': disposition,
        'variants': woo_variants(woo_parent),
        'commerce_status': 'WOO_MAPPED_GAPS_RETAINED' if woo_parent else 'HOLD_NO_WOO_COMMERCE_SOURCE',
        'image_status': 'APPROVED_KEEP_POWDER' if stable_id == 'N18' else 'IMAGE_FREE_UNLESS_SEPARATELY_ADMITTED',
    })

family_counts = Counter(item['family'] for item in catalogue)
disposition_counts = Counter(item['proposed_disposition'] for item in catalogue)
live_status_counts = Counter(item[2] for item in live)
live_disposition_counts = Counter(item[4] for item in live)

assert len(catalogue) == 24
assert family_counts == {'Bars': 6, 'Moons': 6, 'Eclipses': 6, 'Bites': 2, 'Elixirs': 2, 'Bananas': 1, 'Powder': 1}
assert disposition_counts == {'UPDATE': 13, 'CREATE': 11}
assert sum(1 for item in catalogue if item['woo_parent_id']) == 20
assert [item['customer_title'] for item in catalogue if not item['woo_parent_id']] == [
    'Pure Carob Moon', 'Cayenne Moon', 'Goji Carob Bites', 'Coconut Carob Bites'
]
assert len(live) == 23
assert live_status_counts == {'ACTIVE': 13, 'DRAFT': 10}
assert live_disposition_counts == {'UPDATE': 13, 'ARCHIVE_PROPOSAL': 10}
assert not any(item['customer_title'] == 'Eclipse Bites' for item in catalogue)

eclipse_variable = [item for item in catalogue if item['stable_id'] in {'N07', 'N08', 'N09', 'N10', 'N11'}]
for item in eclipse_variable:
    assert [v['effective_price'] for v in item['variants']] == ['5.99', '32.99', '59.99']
    assert sorted(v['regular_price'] for v in item['variants']) == ['35.99', '5.99', '71.99']

document = {
    'schema': 'maplemoon-shopify-catalogue-reconciliation-r3/v1',
    'packet_id': 'MAPLEMOON-SHOPIFY-CATALOGUE-RECONCILIATION-R3-20260824T104207',
    'state': 'DOCUMENTATION_COMPLETE_EXTERNAL_REFRESH_HOLD',
    'authority': {
        'woo_sha256': WOO_SHA,
        'shopify_identity_list_enumerated_at': '2026-08-20',
        'shopify_counts_and_relevant_identities_revalidated_at': '2026-08-23',
        'shopify_snapshot_current_as_of_2026_08_24': False,
        'live_refresh_result': 'HOLD_EXPIRED_BROWSER_AND_CLI_AUTH',
        'shopify_writes': 0,
    },
    'counts': {
        'woo_rows': len(woo_rows),
        'woo_parents': len(parents),
        'woo_variations': len(variations),
        'woo_sellable_records': len(variations) + len(simple),
        'governed_products': len(catalogue),
        'family_counts': dict(family_counts),
        'governed_dispositions': dict(disposition_counts),
        'woo_mapped_governed_products': 20,
        'governed_products_without_woo': 4,
        'shopify_snapshot_products': len(live),
        'shopify_snapshot_statuses': dict(live_status_counts),
        'shopify_snapshot_dispositions': dict(live_disposition_counts),
    },
    'superseded_derived_findings': [
        '2026-08-20 N13/N14 surplus ruling conflicts with the current durable Boss ledger and is not carried forward.',
        '2026-08-23 standalone Eclipse Bites product proposal is invalid; Eclipse Bites is a family/collection.',
        '2026-08-23 Eclipse price ladder $5.99/$32.99/$59.99 is incomplete as authority unless paired with Woo regular/compare-at values $5.99/$35.99/$71.99.',
    ],
    'governed_catalogue': catalogue,
    'shopify_snapshot': [
        {
            'shopify_product_id': sid,
            'title': title,
            'status': status,
            'governed_match': match,
            'proposed_disposition': disposition,
            'identity_list_enumerated_at': '2026-08-20',
            'counts_and_relevant_identities_revalidated_at': '2026-08-23',
        }
        for sid, title, status, match, disposition in live
    ],
    'holds': [
        'Fresh Shopify read is required immediately before any mutation because browser and CLI authentication expired on 2026-08-24.',
        'All Woo SKUs, GTINs, stock quantities and structured shipping weights are blank; no values may be invented.',
        'Pure Carob Moon, Cayenne Moon, Goji Carob Bites and Coconut Carob Bites have no Woo commerce source.',
        'Archive proposals require a fresh backup and a separate explicitly authorised Shopify write packet.',
        'Publish, checkout, theme, payment, shipping, tax, domain and production remain separately gated.',
    ],
}

EVIDENCE.mkdir(parents=True, exist_ok=True)
(EVIDENCE / 'CATALOGUE-R3.json').write_text(json.dumps(document, indent=2, ensure_ascii=False) + '\n')
(EVIDENCE / 'SOURCE-CHECK.json').write_text(json.dumps({
    'pins': {relative: {'expected': expected, 'actual': sha(ROOT / relative), 'match': True} for relative, expected in PINS.items()},
    'woo': {'expected': WOO_SHA, 'actual': sha(WOO), 'match': True},
    'result': 'PASS',
}, indent=2) + '\n')

def price_summary(item):
    if not item['variants']:
        return 'HOLD — no Woo commerce source'
    values = []
    for variant in item['variants']:
        price = variant['effective_price'] or 'GAP'
        if variant['compare_at_price']:
            price += f" (compare ${variant['compare_at_price']})"
        values.append(f"{variant['option']}: ${price}")
    return '; '.join(values)

report = [
    '# MapleMoon Shopify catalogue reconciliation R3',
    '',
    '**Status:** DOCUMENTATION COMPLETE · EXTERNAL REFRESH HOLD · ZERO SHOPIFY WRITES',
    '',
    'This is the corrected migration specification for the governed Maple Moon catalogue. '
    'It uses the pinned Woo export for catalogue commerce facts, the current durable Boss ledger '
    'for the 24-product boundary, the fully enumerated 20 August Shopify identity list, and the '
    '23 August complete read that reconfirmed the 23-product totals and relevant identities. '
    'The 24 August browser and CLI sessions are expired, so the Shopify snapshot is deliberately '
    'not described as current enough for mutation.',
    '',
    '## Corrections to earlier derived documents',
    '',
    '1. The governed launch catalogue is exactly 24: Bars 6, Moons 6, Eclipses 6, Bites 2, Elixirs 2, Bananas 1, Powder 1.',
    '2. Goji Carob Bites and Coconut Carob Bites remain distinct, identity-held governed products. The stale N13/N14 surplus interpretation is not carried forward.',
    '3. Eclipse Bites is a collection/family, not a standalone product. Its six products are Pecan, Salted Almond, Hazelnut, Goji Ripe, Salted Caramel Fudge and Eclipse Bite Bundle.',
    '4. The five variable Eclipse products use Woo effective prices $5.99 / $32.99 / $59.99; the 6- and 12-pack compare-at values are $35.99 / $71.99.',
    '5. Woo contains no SKU, GTIN, stock quantity or structured shipping weight anywhere in the export. Every such value stays blank/HOLD.',
    '',
    '## Governed 24-product proposal',
    '',
    '| ID | Family | Customer product | Woo parent | Shopify ID | Proposal | Exact commerce state |',
    '|---|---|---|---:|---:|---|---|',
]
for item in catalogue:
    report.append(
        f"| {item['stable_id']} | {item['family']} | {item['customer_title']} | "
        f"{item['woo_parent_id'] or '—'} | {item['shopify_product_id'] or '—'} | "
        f"{item['proposed_disposition']} | {price_summary(item)} |"
    )

report.extend([
    '',
    'Tally: **UPDATE 13 · CREATE 11 = 24**. Exactly 20 governed products map to Woo; the four without Woo commerce authority are Pure Carob Moon, Cayenne Moon, Goji Carob Bites and Coconut Carob Bites.',
    '',
    '## Recorded Shopify identity baseline',
    '',
    '| Shopify ID | Current title | Status | Governed match | Proposal |',
    '|---:|---|---|---|---|',
])
for sid, title, status, match, disposition in live:
    report.append(f'| {sid} | {title} | {status} | {match or "—"} | {disposition} |')

report.extend([
    '',
    'Provenance: the full ID/title/status list was enumerated read-only on 20 August; the 23 August complete catalogue read revalidated the 23-product totals and relevant mapped/absent identities. It is not represented as a 24 August live mutation basis. Tally: **13 ACTIVE · 10 DRAFT = 23**. Proposed reconciliation is **UPDATE 13 · ARCHIVE_PROPOSAL 10**. An archive proposal is not archive authority.',
    '',
    '## External and data holds',
    '',
])
for hold in document['holds']:
    report.append(f'- {hold}')

report.extend([
    '',
    '## Image boundary',
    '',
    'Carob Powder is the sole already admitted KEEP image in this catalogue record. Every other product must use the approved image-free layout unless an exact source/output/hash/slot is separately admitted. Review-only, wrong-product, fake and unapproved imagery is excluded.',
    '',
    '## Decision and next gate',
    '',
    'R3 is ready for Boss admission as the catalogue specification only. Before any Shopify mutation: authenticate read-only, export/backup the live catalogue, prove the 23-product identity/status snapshot has not drifted, then issue a separate exact reversible write packet. Theme publish, payments, shipping, tax, domains, production and client contact remain outside this packet.',
    '',
    'Machine mirror: `_wip/evidence/shopify_catalogue_reconciliation_r3_20260824T104207/CATALOGUE-R3.json`.',
])

(ROOT / 'docs/orchestration/reviews/MAPLEMOON-SHOPIFY-CATALOGUE-RECONCILIATION-R3-20260824T104207.md').write_text('\n'.join(report) + '\n')

out_status = subprocess.check_output(
    ['git', 'status', '--porcelain', '--', 'out'], cwd=ROOT, text=True
)
out_lines = [line for line in out_status.splitlines() if line]
if len(out_lines) != 20:
    raise SystemExit(f'OUT_SCOPE_FAIL expected=20 actual={len(out_lines)}')
(EVIDENCE / 'SCOPE-CLOSE.json').write_text(json.dumps({
    'tracked_head': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip(),
    'staged_diff_names': subprocess.check_output(['git', 'diff', '--cached', '--name-only'], cwd=ROOT, text=True).splitlines(),
    'preserved_out_status_count': len(out_lines),
    'preserved_out_status_sha256': hashlib.sha256(out_status.encode()).hexdigest(),
    'shopify_writes': 0,
    'shopify_refresh': 'HOLD_EXPIRED_BROWSER_AND_CLI_AUTH',
    'result': 'PASS',
}, indent=2) + '\n')

print(
    'CATALOGUE_R3 PASS '
    f'governed={len(catalogue)}/24 families={dict(family_counts)} '
    f'woo_mapped=20 no_woo=4 dispositions={dict(disposition_counts)} '
    f'shopify_snapshot={len(live)}/23 statuses={dict(live_status_counts)} '
    f'live_dispositions={dict(live_disposition_counts)} writes=0 refresh=HOLD_AUTH'
)
