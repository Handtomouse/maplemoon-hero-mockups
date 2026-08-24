#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path('/Users/handtomouse/maplemoon-website')
EVIDENCE = ROOT / '_wip/evidence/shopify_catalogue_reconciliation_r3_20260824T104207'
REPORT = ROOT / 'docs/orchestration/reviews/MAPLEMOON-SHOPIFY-CATALOGUE-RECONCILIATION-R3-20260824T104207.md'
data = json.loads((EVIDENCE / 'CATALOGUE-R3.json').read_text())
report = REPORT.read_text()

assert data['counts']['governed_products'] == 24
assert data['counts']['family_counts'] == {
    'Bars': 6, 'Moons': 6, 'Eclipses': 6, 'Bites': 2,
    'Elixirs': 2, 'Bananas': 1, 'Powder': 1,
}
assert data['counts']['governed_dispositions'] == {'UPDATE': 13, 'CREATE': 11}
assert data['counts']['shopify_snapshot_statuses'] == {'ACTIVE': 13, 'DRAFT': 10}
assert data['counts']['shopify_snapshot_dispositions'] == {'UPDATE': 13, 'ARCHIVE_PROPOSAL': 10}
assert data['authority']['shopify_writes'] == 0
assert data['authority']['shopify_snapshot_current_as_of_2026_08_24'] is False

catalogue = data['governed_catalogue']
assert len({item['stable_id'] for item in catalogue}) == 24
assert len({item['customer_title'] for item in catalogue}) == 24
assert not any(item['customer_title'] == 'Eclipse Bites' for item in catalogue)
assert {item['customer_title'] for item in catalogue if not item['woo_parent_id']} == {
    'Pure Carob Moon', 'Cayenne Moon', 'Goji Carob Bites', 'Coconut Carob Bites'
}

for item in catalogue:
    assert f"| {item['stable_id']} | {item['family']} | {item['customer_title']} |" in report
    for variant in item['variants']:
        assert variant['sku'] is None
        assert variant['gtin'] is None
        assert variant['stock_quantity'] is None
        assert variant['shipping_weight'] is None

for stable_id in ('N07', 'N08', 'N09', 'N10', 'N11'):
    item = next(product for product in catalogue if product['stable_id'] == stable_id)
    assert [v['effective_price'] for v in item['variants']] == ['5.99', '32.99', '59.99']
    assert [v['regular_price'] for v in item['variants']] == ['5.99', '35.99', '71.99']

assert report.count('Goji Carob Bites') >= 2
assert report.count('Coconut Carob Bites') >= 2
assert 'ZERO SHOPIFY WRITES' in report
assert 'EXTERNAL REFRESH HOLD' in report
assert 'standalone product' in report
assert 'ARCHIVE_PROPOSAL' in report
assert ('sh' + 'pat_') not in report
assert ('access_' + 'token=') not in report
assert ('refresh_' + 'token=') not in report

print('R3_OUTPUT PASS report_rows=24 json_rows=24 live_rows=23 eclipse_products=5 eclipse_prices=5/5 identifiers_blank=ALL writes=0 external_refresh=HOLD')
