#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
PINS = {
    Path("/Users/handtomouse/.codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814/assets/elixir_pure_same_size_clean_edges_v4.png"): "70f93f414902ae1b10e7ae1416954348aa20bd1d6950e37d05979b4e4aa9eb93",
    Path("/Users/handtomouse/.codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814/assets/elixir_spiced_same_size_clean_edges_v4.png"): "414f727e84ca0dc24749b10b1092f4618e9f9fc9b954304442a7a0a8779749bb",
    Path("/Users/handtomouse/.codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814/assets/elixir_clean_shared_alpha_v4.png"): "39d6ca8c5539d2662703dbe7fa4795c10a30172b39574c487c806ad2d7fe5850",
    Path("/Users/handtomouse/.codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814/maplemoon_elixir_clean_edges_proof_v4.html"): "fab275c64ec07e69ec8a3acab4c4cd32f80592e05d67251ea81137d073042e0d",
    Path("/Users/handtomouse/maplemoon_build_20260813/shop.html"): "f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038",
    Path("/Users/handtomouse/maplemoon_build_20260813/assets/product_shots/elixir_plain.webp"): "4398f43fcc7ff571f4eea4643e078f8416e6921f4e979f5bf31e53338e04916a",
    Path("/Users/handtomouse/maplemoon_build_20260813/assets/product_shots/elixir_spiced.webp"): "9b92c0f0a0cc11b11aa9a5fa4cb7683b420db373e556c74adcb1ba576ffe1163",
    Path("/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ASSET-SLOT-AUTHORITY-MATRIX-20260814T143614.md"): "8b68ad125353c57befd0f0035acae2530756cb52c9a242cbdd12a148becb40a0",
    Path("/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ASSET-AUTHORITY-ADDENDUM-20260814T160123.md"): "ccc4f3ca6991fd33b3f1348c051bc0cb6a7e6b920767ba0ca6c0581259f626f0",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> None:
    pin_results = {str(path): {"expected": expected, "actual": sha256(path)} for path, expected in PINS.items()}
    mechanical = json.loads((HERE / "mechanical_results.json").read_text(encoding="utf-8"))
    browser = json.loads((HERE / "browser_results.json").read_text(encoding="utf-8"))
    binding = json.loads((HERE / "binding_scan_results.json").read_text(encoding="utf-8"))
    matrix = Path("/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ASSET-SLOT-AUTHORITY-MATRIX-20260814T143614.md").read_text(encoding="utf-8")
    addendum = Path("/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ASSET-AUTHORITY-ADDENDUM-20260814T160123.md").read_text(encoding="utf-8")
    authority = {
        "matrix_holds_plain": "elixir_plain.webp" in matrix and "KEEP current / HOLD replacement" in matrix,
        "matrix_holds_spiced": "elixir_spiced.webp" in matrix and matrix.count("KEEP current / HOLD replacement") >= 2,
        "addendum_reconstructed_text_hold": "Reconstructed fine print is not authoritative" in addendum,
        "addendum_nate_approval_required": "Nate visual/label/live-use approval required" in addendum,
        "photo_ratio_36_preserved": "5 / 14 = 36%" in addendum,
    }
    screenshots = [HERE / f"review_surface_{width}.png" for width in (390, 900, 1440)]
    screenshot_checks = {str(path): {"exists": path.is_file(), "bytes": path.stat().st_size if path.is_file() else 0} for path in screenshots}
    checks = {
        "all_close_hashes_match": all(value["expected"] == value["actual"] for value in pin_results.values()),
        "mechanical_pass": mechanical.get("status") == "PASS",
        "browser_pass": browser.get("status") == "PASS",
        "binding_scan_pass_unwired": binding.get("status") == "PASS" and binding.get("unwired") is True,
        "authority_holds_present": all(authority.values()),
        "screenshots_nonblank": all(value["exists"] and value["bytes"] > 10000 for value in screenshot_checks.values()),
    }
    status = "PASS" if all(checks.values()) else "FAIL"
    result = {"status": status, "pin_results": pin_results, "authority": authority, "screenshots": screenshot_checks, "checks": checks, "live_use_boundary": "HOLD_RECONSTRUCTED_LABEL_AND_NATE_LIVE_SLOT_APPROVAL_REQUIRED"}
    (HERE / "final_assert_results.json").write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(f"ELIXIR_V4_FINAL_ASSERT {status} close_hashes={sum(v['expected']==v['actual'] for v in pin_results.values())}/{len(pin_results)} mechanical={checks['mechanical_pass']} browser={checks['browser_pass']} unwired={checks['binding_scan_pass_unwired']} authority={checks['authority_holds_present']} screenshots={sum(v['exists'] and v['bytes']>10000 for v in screenshot_checks.values())}/3 live_use=HOLD")
    raise SystemExit(0 if status == "PASS" else 1)


if __name__ == "__main__":
    main()
