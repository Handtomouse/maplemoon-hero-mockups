#!/usr/bin/env python3
"""Independent source/boundary replay for MapleMoon Lane E certification."""

import argparse
import hashlib
import json
import re
from pathlib import Path

ROOT = Path("/Users/handtomouse/maplemoon-website")
OUT = ROOT / "_wip/evidence/lane_e_independent_cert_20260816T133827"

PAGES = {
    "home": (ROOT / "_wip/homepage_real_1_lead_photo.WIP.html", "d097392fc1c6f44c3e3c09024bb7c2e2ea275e215a468dfe76306c6dcf534748"),
    "shop": (ROOT / "_wip/shop.WIP.html", "b444b0da4f5778f7434c6343854e3cdf48d1a88b038c7863a2ef1d46b5e0cbac"),
    "our-story": (ROOT / "_wip/our-story.WIP.html", "f861ae24b6d4cd106402455e1361172be8b769cf0c0f967c17ee8de9a55fed19"),
    "carob-story": (ROOT / "_wip/carob-story.WIP.html", "0ad6ea9bfaacf81d7ee4d7e5ddcf93c2bd77afe3635d575bf7a2c30c8f696e27"),
    "faq": (ROOT / "_wip/faq.WIP.html", "4540ef31a150cb6de8062c2d4d74709f24d13ce45490f8e3c1c9c283c1fdbd56"),
    "stockists": (ROOT / "_wip/stockists.WIP.html", "1cc8b4e55c7dc59f6e268222c310ac47d477540caf7540970981726a801b9075"),
}

PREDECESSOR_RECEIPT = ROOT / "docs/orchestration/reviews/MAPLEMOON-LANE-E-APPLY-20260815T213337.json"
PREDECESSOR_RECEIPT_HASH = "7a4d0e3c97c1cee599774b02300f9e4a96ece019adeb8fe7d84992b15c6f69d7"
LOCK_MANIFEST = ROOT / "docs/orchestration/LOCK_MANIFEST.json"
LOCK_PACKET = "MAPLEMOON-LANE-E-APPLY-20260815T213337"
LOCK_WORKER = "/root/dedup_risk_audit"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def literal_count(text: str, needle: str) -> int:
    return text.casefold().count(needle.casefold())


def literal_hits(texts, needle: str):
    pattern = re.compile(re.escape(needle), re.I)
    hits = []
    for label, (path, _) in PAGES.items():
        for number, line in enumerate(texts[label].splitlines(), 1):
            if pattern.search(line):
                hits.append(f"{path.relative_to(ROOT)}:{number}")
    return hits


def extract_category(source: str, category: str):
    match = re.search(rf"^\s*{re.escape(category)}:\[\s*\n(.*?)^\s*\]", source, re.M | re.S)
    if not match:
        return None
    return re.findall(r"\{n:'([^']+)'", match.group(1))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--phase", choices=("acquisition", "close"), required=True)
    args = parser.parse_args()

    texts = {label: path.read_text(encoding="utf-8") for label, (path, _) in PAGES.items()}
    corpus = "\n".join(texts.values())
    results = []
    failures = []

    def record(name, actual, expected, status="required"):
        passed = actual == expected
        row = {"name": name, "status": status, "actual": actual, "expected": expected, "result": "PASS" if passed else "FAIL"}
        results.append(row)
        if not passed:
            failures.append(row)

    hash_results = {}
    for label, (path, expected) in PAGES.items():
        actual = sha256(path)
        hash_results[str(path.relative_to(ROOT))] = actual
        record(f"hash:{label}", actual, expected)
    predecessor_actual = sha256(PREDECESSOR_RECEIPT)
    record("predecessor-receipt-hash", predecessor_actual, PREDECESSOR_RECEIPT_HASH)

    manifest = json.loads(LOCK_MANIFEST.read_text(encoding="utf-8"))
    locks = [row for row in manifest.get("locks", []) if row.get("packet_id") == LOCK_PACKET]
    expected_lock_paths = sorted(str(path.relative_to(ROOT)) for path, _ in PAGES.values())
    actual_lock_paths = sorted(row.get("path") for row in locks)
    record("held-lock-count", len(locks), 6)
    record("held-lock-paths", actual_lock_paths, expected_lock_paths)
    record("held-lock-workers", sorted({row.get("worker_thread_id") for row in locks}), [LOCK_WORKER])
    record("held-lock-statuses", sorted({row.get("status") for row in locks}), ["held"])
    record("held-lock-unreleased", all(row.get("released_by") is None and row.get("post_sha256") is None for row in locks), True)

    # Every occurrence probe is guarded by a real present control and an impossible absent control.
    control_count = literal_count(corpus, "Maple Moon")
    record("positive-control:Maple Moon-present", control_count > 0, True)
    record("negative-control:sentinel", literal_count(corpus, "__MAPLEMOON_LANE_E_CERT_SENTINEL__"), 0)

    occurrence_expectations = [
        ("old-home-actually", '<h2 class="lux-hd">What is Carob, <em>actually?</em></h2>', 0, "applied"),
        ("new-home-carob-heading", '<h2 class="lux-hd">What is Carob?</h2>', 1, "applied"),
        ("old-home-not-bean-sentence", "It is not a bean, and it is naturally caffeine free.", 0, "applied"),
        ("old-home-not-bean-fact", "A pod, not a bean", 0, "applied"),
        ("new-high-in-fibre", "high in fibre", 2, "applied"),
        ("old-ritual-heading", "When do you <em>moon?</em>", 0, "applied"),
        ("new-ritual-heading", "What is <em>Maple Mooning?</em>", 1, "applied"),
        ("new-ritual-01", "<strong>A quiet finish</strong>", 1, "applied"),
        ("new-ritual-02", "<strong>A softer pause</strong>", 1, "applied"),
        ("new-ritual-03", "<strong>The last cup</strong>", 1, "applied"),
        ("home-bites-column-absent", 'data-cat="eclipseBites"', 0, "applied"),
        ("home-category-order", "var CAT_ORDER=['bars','bananas','moons','elixirs'];", 1, "applied"),
        ("old-view-range", "View Range", 0, "applied"),
        ("new-shop-now", "Shop Now", 2, "applied"),
        ("old-range-preview", "Range preview", 0, "applied"),
        ("new-enquire-details", "Enquire for details", 7, "applied"),
        ("old-slow-roasted", "slow-roasted", 0, "applied"),
        ("supplier-wording", "Sourced from the Australian Carob Co. in South Australia, roasted and finely ground there before reaching the kitchen.", 13, "applied"),
        ("old-small-batches", "small batches", 0, "applied"),
        ("byron-kitchen", "The Maple Moon kitchen is in Byron Bay.", 6, "applied"),
        ("old-hand-moulded", "hand-moulded", 0, "applied"),
        ("old-smooth-carob", "smooth carob", 0, "applied"),
        ("new-nightcap", "The nightcap with benefits", 2, "applied"),
        ("new-pure-moon", "A crescent of pure carob and cacao butter", 2, "applied"),
        ("new-eclipse-section", "The perfect treats for those that desire a healthy clean creation made with whole ingredients.", 1, "applied"),
        ("new-pecan", "A blend of pecans and dates for a fudgy inside, coated in our pure carob", 1, "applied"),
        ("new-goji", "Two layers for a fruit indulgence. Goji berries, dates and almonds blended together and layered on coconut and cashews.", 1, "applied"),
        ("new-bundle", "Try the range. All 5 bites to satisfy your cravings and curiosity.", 1, "applied"),
        ("new-pure-elixir", "A warm carob drink with only two ingredients, naturally sweet and caffeine free.", 2, "applied"),
        ("new-spiced-elixir", "A warm carob drink with an Ayurvedic inspired spice blend", 2, "applied"),
        ("new-bananas", "Spray Free Australian Grown Bananas coated in our pure carob for the perfect chewy treat.", 4, "applied"),
        ("old-comparison-heading", "An honest comparison", 0, "applied"),
        ("new-comparison-heading", "The Honest Comparison", 2, "applied"),
        ("old-carob-table-header", '<th scope="col" class="carob">Carob</th>', 0, "applied"),
        ("new-carob-table-header", "Carob / Maple Moon Carob", 4, "applied"),
        ("removed-our-story-sentence", "We make carob because we love what it is, not what it stands in for.", 0, "applied"),
        ("new-roast-copy", "Roasted for depth.", 1, "applied"),
        ("old-small-batch-process", "Poured in small batches.", 0, "applied"),
        ("new-signature-result", "our maple moon signature carob", 1, "applied"),
        ("old-faq-id", "is-carob-caffeine-free", 0, "applied"),
        ("new-faq-id", "does-it-taste-like-chocolate", 1, "applied"),
        ("old-pending-policy-id", "pending-policy-details", 0, "applied"),
        ("new-shipping-link-id", "shipping-and-returns", 1, "applied"),
        ("old-map-heading", "Illustrative coverage preview", 0, "applied"),
        ("new-map-legend", "Directory preview only", 1, "applied"),
        ("old-stockist-count", "150+", 0, "applied"),
        ("standing-stockist-count", "200+", 7, "applied"),
        ("newsletter-notice", "Demo only. This form does not collect or submit email addresses.", 2, "applied"),
        ("testimonial-natasha", "Natasha, Sydney", 1, "hold-preserved"),
        ("testimonial-janice", "Janice", 1, "hold-preserved"),
        ("testimonial-acacia", "Acacia", 1, "hold-preserved"),
        ("testimonial-hold-notice", "Consent and final testimonial selection pending before go-live.", 1, "hold-preserved"),
        ("process-fact-hold", "Milled with cacao butter.", 1, "hold-preserved"),
        ("faq-fact-hold", "Maple Moon mills its carob with cacao butter.", 1, "hold-preserved"),
        ("comparison-fact-hold-cacao-sugar", "Naturally bitter, so it needs added sugar", 1, "hold-preserved"),
        ("comparison-fact-hold-cacao-caffeine", "Contains caffeine, late in the day", 1, "hold-preserved"),
        ("comparison-fact-hold-carob-sugar", "Sweet from the pod itself, no added sugar", 1, "hold-preserved"),
        ("comparison-fact-hold-carob-caffeine", "Naturally caffeine free, any hour you like", 1, "hold-preserved"),
        ("pure-elixir-binding", "img:'elixir_plain'", 2, "hold-preserved"),
        ("spiced-elixir-binding", "img:'elixir_spiced'", 2, "hold-preserved"),
    ]
    occurrence_rows = []
    for name, needle, expected, disposition in occurrence_expectations:
        count = literal_count(corpus, needle)
        passed = count == expected and control_count > 0
        row = {
            "name": name,
            "needle": needle,
            "disposition": disposition,
            "positive_control": control_count,
            "count": count,
            "expected": expected,
            "hits": literal_hits(texts, needle),
            "result": "PASS" if passed else "FAIL",
        }
        occurrence_rows.append(row)
        if not passed:
            failures.append(row)

    # A displayed 197 replacement is forbidden; CSS colour values such as rgb(197,...) are not display claims.
    display_197 = re.findall(r">\s*197\+?\s*<|\b197\s+(?:stockists?|stores?)\b", corpus, re.I)
    record("no-displayed-197-substitution", len(display_197), 0)
    v4_elixir_refs = re.findall(r"(?:elixir[^\n]{0,60}v4|v4[^\n]{0,60}elixir)", corpus, re.I)
    record("no-v4-elixir-binding", len(v4_elixir_refs), 0)

    expected_bars = [
        "Coconut & Goji",
        "Cayenne Chilli",
        "Pure Carob & Cacao Butter",
        "Almond & Celtic Salt",
        "Peppermint & Buckwheat",
        "Roasted Hazelnut",
    ]
    expected_moons = [
        "Coconut & Goji Moon",
        "Cayenne Moon",
        "Pure Carob Moon",
        "Almond Moon",
        "Peppermint Moon",
        "Roasted Hazelnut Moon",
    ]
    for label in ("home", "shop"):
        record(f"{label}-bars-six-approved-order", extract_category(texts[label], "bars"), expected_bars)
        record(f"{label}-moons-six-approved-order", extract_category(texts[label], "moons"), expected_moons)

    home_categories = {name: extract_category(texts["home"], name) for name in ("bars", "moons", "elixirs", "bananas")}
    shop_categories = {name: extract_category(texts["shop"], name) for name in ("bars", "moons", "bites", "elixirs", "bananas", "powder")}
    record("home-demo-product-count", sum(len(items or []) for items in home_categories.values()), 15)
    record("shop-demo-product-count", sum(len(items or []) for items in shop_categories.values()), 22)
    record("24-product-shopify-catalogue-added", any(sum(len(items or []) for items in groups.values()) == 24 for groups in (home_categories, shop_categories)), False)

    record("home-cart-trigger-source", texts["home"].count("data-mm-cart-toggle"), 1)
    record("shop-cart-add-source", texts["shop"].count("data-add-to-cart"), 2)
    record("shop-cart-subtotal-source", texts["shop"].count("data-cart-subtotal"), 2)
    record("shop-cart-arithmetic-source", "cart.subtotal+=Number(card.dataset.unitPrice)||0" in texts["shop"], True)

    payload = {
        "schema": "maplemoon-lane-e-independent-source-cert/v1",
        "phase": args.phase,
        "corpus": [str(path.relative_to(ROOT)) for path, _ in PAGES.values()],
        "corpus_rule": "all six current root-level WIP review pages; checkpoints, recovery, evidence and deploy copies excluded",
        "hashes": hash_results,
        "predecessor_receipt_sha256": predecessor_actual,
        "lock_rows": locks,
        "checks": results,
        "occurrence_checks": occurrence_rows,
        "failures": failures,
        "result": "PASS" if not failures else "FAIL",
    }
    output = OUT / f"source-{args.phase}.json"
    output.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"{payload['result']} phase={args.phase} hashes={len(PAGES) + 1} locks={len(locks)} occurrence_checks={len(occurrence_rows)} checks={len(results)} failures={len(failures)}")
    if failures:
        for failure in failures:
            print(json.dumps(failure, sort_keys=True))
        raise SystemExit(1)


if __name__ == "__main__":
    main()
