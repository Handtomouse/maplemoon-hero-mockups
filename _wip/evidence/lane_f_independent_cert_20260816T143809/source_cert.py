#!/usr/bin/env python3
"""Independent, read-only Lane F R2 source certification."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path("/Users/handtomouse/maplemoon-website")
OUT = ROOT / "_wip/evidence/lane_f_independent_cert_20260816T143809"

PINS = {
    ROOT / "docs/orchestration/reviews/MAPLEMOON-LANE-F-REBUILD-R2-20260816T141330.json": "034769fc3451c0045d42b89e1ed5fa14d30603c8920185f2464856f0e5e49103",
    ROOT / "_wip/our-story.WIP.html": "6beef3f9449804e800ad7883c311c957637d12a5e05c69beb7ed912e49b36e23",
    ROOT / "_wip/carob-story.WIP.html": "82b8d3a94de71c453ff2970f185832c93056862d4dd5599f02b6fc222bd9b339",
    Path("/Users/handtomouse/maplemoon_rebuild_20260815/RECEIPT.md"): "94548492290343f58d2e8b55530307bd6967b921ee180f5ec73448b26c2a16b6",
    Path("/Users/handtomouse/maplemoon_rebuild_20260815/FOR_NATE.md"): "3ce2323be612d16226a21d82308816c09fb844851cb6c6e97fe9f82ee79c94ec",
    ROOT / "docs/orchestration/LOCK_MANIFEST.json": "5d09ba28d3dc8b8d016cccd4ad0e9a3898eedb5b4c0ab810ee091fe3a6e3d8d2",
    ROOT / "_wip/faq.WIP.html": "4540ef31a150cb6de8062c2d4d74709f24d13ce45490f8e3c1c9c283c1fdbd56",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


class ProbeParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.stack: list[dict] = []
        self.nodes: list[dict] = []
        self.jsonld: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        node = {"tag": tag, "attrs": dict(attrs), "text": ""}
        self.stack.append(node)
        self.nodes.append(node)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.nodes.append({"tag": tag, "attrs": dict(attrs), "text": ""})

    def handle_data(self, data: str) -> None:
        for node in self.stack:
            node["text"] += data

    def handle_endtag(self, tag: str) -> None:
        for index in range(len(self.stack) - 1, -1, -1):
            node = self.stack[index]
            if node["tag"] == tag:
                if tag == "script" and node["attrs"].get("type") == "application/ld+json":
                    self.jsonld.append(node["text"])
                del self.stack[index:]
                return


def classes(node: dict) -> set[str]:
    return set((node["attrs"].get("class") or "").split())


def norm(value: str) -> str:
    return " ".join(value.split())


def parse(source: str) -> ProbeParser:
    parser = ProbeParser()
    parser.feed(source)
    parser.close()
    return parser


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--phase", choices=("acquisition", "close"), required=True)
    args = ap.parse_args()

    checks: list[dict] = []
    failures: list[str] = []

    def check(name: str, actual, expected, detail: str = "") -> None:
        passed = actual == expected
        checks.append({"name": name, "pass": passed, "actual": actual, "expected": expected, "detail": detail})
        if not passed:
            failures.append(f"{name}: actual={actual!r} expected={expected!r}{' ' + detail if detail else ''}")

    for path, expected in PINS.items():
        check(f"sha256:{path}", sha256(path), expected)

    lock_data = json.loads((ROOT / "docs/orchestration/LOCK_MANIFEST.json").read_text())
    locks = [row for row in lock_data["locks"] if row.get("packet_id") == "MAPLEMOON-LANE-F-REBUILD-R2-20260816T141330"]
    check("lock_count", len(locks), 2)
    check("lock_paths", sorted(row.get("path") for row in locks), ["_wip/carob-story.WIP.html", "_wip/our-story.WIP.html"])
    check("lock_statuses", sorted(row.get("status") for row in locks), ["held", "held"])
    check("lock_thread_ids", sorted(row.get("worker_thread_id") for row in locks), ["/root/dedup_risk_audit", "/root/dedup_risk_audit"])
    check("lock_released_by", [row.get("released_by") for row in locks], [None, None])
    check("lock_post_sha", [row.get("post_sha256") for row in locks], [None, None])

    our_path = ROOT / "_wip/our-story.WIP.html"
    carob_path = ROOT / "_wip/carob-story.WIP.html"
    faq_path = ROOT / "_wip/faq.WIP.html"
    our = our_path.read_text()
    carob = carob_path.read_text()
    faq = faq_path.read_text()
    our_dom = parse(our)
    carob_dom = parse(carob)
    faq_dom = parse(faq)

    corpus = our + "\n" + carob + "\n" + faq
    control_count = corpus.count("Maple Moon")
    check("positive_control_maple_moon", control_count > 0, True, f"count={control_count}")

    chapters = []
    for node in our_dom.nodes:
        if "os-chap" in classes(node):
            number = next((norm(n["text"]) for n in our_dom.nodes if n is not node and n["tag"] == "span" and "no" in classes(n) and norm(n["text"]) in norm(node["text"])), "")
            labels = [norm(n["text"]) for n in our_dom.nodes if n["tag"] == "span" and "lab" in classes(n) and norm(n["text"]) in norm(node["text"])]
            chapters.append({"number": number, "label": labels[0] if labels else ""})
    # Direct source order makes this independent of cosmetic nested-text whitespace.
    chapter_pairs = re.findall(r'<div class="os-chap"><span class="no">(\d+)</span><span class="rule"></span><span class="lab">([^<]+)</span></div>', our)
    check("our_story_chapter_pairs", chapter_pairs, [("01", "The people behind the product"), ("02", "How Maple Moon began")])
    check("our_story_no_chapter_03", any(number == "03" for number, _ in chapter_pairs), False)

    cut_needles = [
        "We aren't corporate, but we are intentional",
        "we are intentional",
        "The people, then the ingredient, then the place.",
        "the ingredient, then the beginning, then the place",
        "Shared story",
        "Two individual notes",
        "Each founder in their own words",
        "So she asked a different question",
        "so she asked a different question",
        "02: the craft",
        "the range in its own light",
        "the range in its downlight",
        "We love what it is, not want it stands for",
    ]
    for needle in cut_needles:
        check(f"our_story_cut:{needle}", our.count(needle), 0)

    pair_asset = "/assets/our_story/founders_portrait_h212.webp"
    check("accepted_pair_hero_refs", our.count(pair_asset), 2)
    check("frame55_atmospheric_zero", our.count("maplemoon_heros55_brandmatched_atmospheric.webp"), 0)
    check("frame55_zero", our.count("maplemoon_heros55_brandmatched.webp"), 0)
    check("rejected_carli_binding_zero", our.count("/assets/our_story/founder_carli.webp"), 0)
    check("rejected_dylan_binding_zero", our.count("/assets/our_story/founder_dylan.webp"), 0)

    placeholders = [node for node in our_dom.nodes if "os-founder-placeholder" in classes(node)]
    check("founder_placeholder_count", len(placeholders), 2)
    check("founder_placeholder_roles", [node["attrs"].get("role") for node in placeholders], ["img", "img"])
    check("founder_placeholder_labels", [node["attrs"].get("aria-label") for node in placeholders], ["Carli portrait pending Nate selection", "Dylan portrait pending Nate selection"])
    check("founder_placeholder_visible_hold", ["Nate selection required" in norm(node["text"]) for node in placeholders], [True, True])

    location = "Born in Bondi but now residing in the Brunswick Heads, Northern Rivers."
    check("exact_location", our.count(location), 1)
    check("range_links", len(re.findall(r'<a class="os-kick" href="/shop\.WIP\.html">The Range</a>', our)), 1)
    range_paragraphs = [
        "Maple Moon is more than a treat. It's a ritual. A pause. A moment of care for your nervous system, your body, and your evenings.",
        "We invite you to slow down, savour deeply, and enjoy something that tastes as good as it feels.",
        "Try Maple Moon, for presence, pleasure, and peace under the moon.",
    ]
    for paragraph in range_paragraphs:
        check(f"accepted_range_blurb:{paragraph[:32]}", our.count(paragraph), 1)

    our_img_srcs = [node["attrs"].get("src") for node in our_dom.nodes if node["tag"] == "img"]
    check("our_story_img_srcs", our_img_srcs, [pair_asset, "/assets/hero_shots/carob_pods_cluster.jpg"])

    carob_h1 = [norm(node["text"]) for node in carob_dom.nodes if node["tag"] == "h1"]
    check("carob_exact_h1", carob_h1, ["What is Carob?"])
    check("carob_actually_zero", len(re.findall(r"\bactually\b", carob, flags=re.I)), 0)
    exact_intro = "Carob is a naturally sweet pod grown on the carob tree. The pods are deseeded, ground and roasted into a fine powder. Maple Moon used organic Australia grown carob in all its products. It is naturally sweet, so we never add refined sugars or sweeteners to our products."
    check("carob_exact_intro", carob.count(exact_intro), 1)
    check("carob_used_exact", carob.count("Maple Moon used organic Australia grown carob in all its products."), 1)
    check("carob_uses_silent_correction_zero", carob.count("Maple Moon uses organic Australia grown carob in all its products."), 0)
    comparison_intro = "While they may look similar, carob powder and cacao powder come from completely different plants."
    check("comparison_intro", carob.count(comparison_intro), 1)
    check("cacoa_misspelling_zero", len(re.findall(r"\bcacoa\b", carob, flags=re.I)), 0)
    cacao_count = len(re.findall(r"\bcacao\b", carob, flags=re.I))
    check("cacao_positive_control", cacao_count > 0, True, f"count={cacao_count}")

    table = re.search(r'<table class="cmp-table">(.*?)</table>', carob, flags=re.S)
    check("comparison_table_present", table is not None, True)
    table_text = table.group(1) if table else ""
    rows = re.findall(r'<tr><td class="carob"[^>]*>([^<]+)</td><th scope="row">([^<]+)</th><td class="cacao"[^>]*>([^<]+)</td></tr>', table_text)
    check("comparison_aligned_rows", rows, [
        ("A tree-grown pod", "Source", "A bean"),
        ("Naturally sweet", "Sweetness", "Naturally bitter"),
        ("Naturally caffeine free", "Caffeine", "Contains caffeine and theobromine"),
    ])

    process = re.search(r'<ol class="process-steps"[^>]*>(.*?)</ol>', carob, flags=re.S)
    check("process_list_present", process is not None, True)
    process_text = process.group(1) if process else ""
    process_rows = re.findall(r'<li><span class="process-no"[^>]*>(\d+)</span>.*?<strong>([^<]+)</strong><span>([^<]+)</span></li>', process_text, flags=re.S)
    check("process_exact_rows", process_rows, [
        ("01", "The pod", "Australian-grown carob."),
        ("02", "The roast", "Roasted for depth."),
        ("03", "The Base", "Mixed with premium cacao butter for chocolatey undertones"),
        ("04", "The result", "our maple moon signature carob"),
    ])
    check("process_slow_zero", len(re.findall(r"\bslow(?:ly)?(?:-|\s)?roast", process_text, flags=re.I)), 0)
    check("crunchy_to_creamy", carob.count("FROM CRUNCHY TO CREAMY"), 1)
    check("from_the_grove_unpublished", len(re.findall(r"From the grove", carob, flags=re.I)), 0)

    faq_sections = [node for node in carob_dom.nodes if node["tag"] == "section" and "faq" in classes(node)]
    check("carob_in_page_faq_sections", len(faq_sections), 0)
    check("carob_in_page_details", len([node for node in carob_dom.nodes if node["tag"] == "details"]), 0)
    check("separate_faq_has_questions", len([node for node in faq_dom.nodes if node["tag"] == "script"]) > 0 and "const faqs = [" in faq, True)

    nate_only_needles = [
        "Carob begins on the tree as a naturally sweet pod.",
        "From the carob tree, to the pod, then ground and roasted into a fine powder.",
        "A naturally sweet pod, grown on the carob tree, then deseeded, ground and roasted into a fine powder before it reaches Maple Moon.",
        "between the Maple Mooning section and the testimonial area",
        "20260524 Maple Moon - Studio Session-816.arw",
        "20260524 Maple Moon - Studio Session-586.arw",
    ]
    for needle in nate_only_needles:
        check(f"nate_only_unpublished:{needle[:36]}", (our + "\n" + carob).count(needle), 0)

    # Every local asset reference used by HTML or CSS must resolve. Data URLs are excluded.
    asset_refs = sorted(set(re.findall(r"(?:src|srcset)=[\"'](/assets/[^\"' ]+)|url\([\"']?(/assets/[^\"')]+)", our + "\n" + carob)))
    flattened = sorted(set(a or b for a, b in asset_refs))
    missing_assets = [ref for ref in flattened if not (ROOT / ref.lstrip("/")).is_file()]
    check("asset_positive_control", len(flattened) > 0, True, f"refs={len(flattened)}")
    check("missing_assets", missing_assets, [])

    for name, parser in (("our_story", our_dom), ("carob_story", carob_dom), ("faq", faq_dom)):
        json_errors = []
        for index, raw in enumerate(parser.jsonld):
            try:
                json.loads(raw)
            except Exception as exc:  # pragma: no cover - evidence path
                json_errors.append(f"{index}:{exc}")
        if name == "faq":
            check("faq_jsonld_exact_count", len(parser.jsonld), 0)
        else:
            check(f"{name}_jsonld_positive", len(parser.jsonld) > 0, True, f"count={len(parser.jsonld)}")
        check(f"{name}_jsonld_parse", json_errors, [])

    result = {
        "schema": "maplemoon-lane-f-independent-source/v1",
        "phase": args.phase,
        "positive_control": {"needle": "Maple Moon", "count": control_count, "corpus_files": 3},
        "checks": checks,
        "summary": {"pass": sum(1 for row in checks if row["pass"]), "fail": len(failures), "total": len(checks)},
        "failures": failures,
    }
    OUT.mkdir(parents=True, exist_ok=True)
    output_path = OUT / f"source-{args.phase}.json"
    if args.phase == "acquisition" and output_path.exists():
        output_path = OUT / "source-acquisition-rerun.json"
    output_path.write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n")
    print(f"POSITIVE_CONTROL needle='Maple Moon' count={control_count} corpus=3")
    print(f"SUMMARY phase={args.phase} pass={result['summary']['pass']} fail={len(failures)} total={len(checks)}")
    for failure in failures:
        print(f"FAIL {failure}")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
