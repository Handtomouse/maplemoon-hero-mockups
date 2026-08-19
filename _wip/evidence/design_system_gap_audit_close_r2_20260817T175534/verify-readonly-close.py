#!/usr/bin/env python3
"""Replay all protected Maple Moon audit pins for the R2 close correction."""

from __future__ import annotations

import copy
import hashlib
import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path("/Users/handtomouse")
REPO = ROOT / "maplemoon-website"
KIT = ROOT / "Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs"
RECOVERY = ROOT / "Documents/Codex/2026-08-11/referenced-chatgpt-conversation-this-is-an/outputs/maple-moon-recovery"
R2_LANE = REPO / "_wip/evidence/design_system_gap_audit_close_r2_20260817T175534"

PINNED_FILES = {
    REPO / "docs/orchestration/packets/MAPLEMOON-DESIGN-SYSTEM-GAP-AUDIT-CLOSE-R2-20260817T175534.md": "5a35f5f3e027a464685684d5af914efb1334e7552baa5b36815b8c3535d0d119",
    REPO / "docs/orchestration/packets/MAPLEMOON-DESIGN-SYSTEM-GAP-AUDIT-20260817T153140.md": "16b36559a3623c06413c39cecb60f02f88751236ec905d424c9b81a77032ee32",
    REPO / "docs/orchestration/reviews/MAPLEMOON-DESIGN-SYSTEM-GAP-AUDIT-20260817T153140.md": "d0a8cc3895e079bf56a2ce0c0a7fffc3d80f3fd214a33bdcdd8854e3ea4fda44",
    REPO / "docs/orchestration/reviews/MAPLEMOON-DESIGN-SYSTEM-GAP-AUDIT-20260817T153140.json": "66a8966c378bc185f72eba49a090a078b4e7bcd7103df0779f2e2eeebcc8a528",
    REPO / "_wip/evidence/design_system_gap_audit_20260817T153140/GAP-MATRIX.json": "cf2d11e621829dd044f3a4b4263224eab7a5b0f40e28e0e8c565bedd0f1ae22d",
    REPO / "_wip/evidence/design_system_gap_audit_20260817T153140/SOURCE-MANIFEST.json": "177c76545c6486d2d293f3b762949dab99e00513ca5fc6e8de4936f03af29988",
    REPO / "_wip/evidence/design_system_gap_audit_20260817T153140/VISUAL-QA.json": "d8497ba286653d4f9dc301664d599397a422803e143b2b3f58fbfef37a91a25f",
    REPO / "docs/orchestration/MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md": "82735f8eaa9aea90923a2f84717260f5055500aa1d7f69f1adea0693b57abf43",
    KIT / "version-lanes/v0.3.2-provisional/BASELINE-HASH-MANIFEST.json": "ea710a90e20d33fdba53b435aa89c18eb3cdfd92b8da686672dfa74f1b4efb67",
    KIT / "RULE-REGISTER.json": "94fdba5891d5534c5221265b278e30370a4f666f67653f13b69cc7545dc653e3",
    KIT / "DESIGN-TOKENS.json": "42e405100bafca42749532db99a3d8afd20b0bda0bf3fe9095fb09ef22388271",
    REPO / "docs/orchestration/reviews/MAPLEMOON-STYLES-KIT-V031-BOSS-REINTAKE-20260814T204321.md": "cbd5e9a1bc23355062c214e8430842d0f63f61e20061b34a9e2b0d369205caaf",
    KIT / "version-lanes/v0.3.2-provisional/LUXURY-POLISH-RESEARCH-SUPPLEMENT.md": "32a61e27de04b62b4a01c23c587817c22f4e77a88baa0e10901704ef47162441",
    KIT / "version-lanes/v0.3.2-provisional/BOSS-HANDOFF-DIFF-MATRIX.md": "4b2f9350809ee5c3d2e91f415124b04dcc95d12a62560f7c7234ca75b8caef3c",
    KIT / "version-lanes/v0.3.2-provisional/VERIFICATION-RECEIPT.md": "849bb942120c2cba5d848b55940e592d7887d9e8ce6ebaabb7b43acb6d9ab1ca",
    KIT / "version-lanes/v0.4-provisional/PACKAGE-HASHES.json": "a33a893b8d50bd81f65955e74f7f565c4d81d93478c82885171d29b3ac385e03",
    KIT / "version-lanes/v0.4-provisional/BOSS-HANDOFF.md": "cf2cded755ede6064b54cc5966a7cda45e5e8e46d1314b612ba9037bffcd5932",
    KIT / "version-lanes/v0.4-provisional/PROOF-MANIFEST.json": "e82536f330c217595f774674cd6a21c7f9099f753c4437d2e196a60585c9ac59",
    REPO / "docs/orchestration/reviews/MAPLEMOON-SEVEN-ROUTE-VISUAL-AUDIT-R2-20260816T210036.md": "8016d98ada1b36c4215c4448c24b98939f4ec97101e08f988d3d305955166c4d",
    REPO / "docs/orchestration/reviews/MAPLEMOON-SEVEN-ROUTE-VISUAL-AUDIT-R2-20260816T210036.json": "fa79e8fea8569692ae231428b1528dd732048d216f3f2fff103d8e82fff3784c",
    RECOVERY / "MAPLE-MOON-SIX-PAGE-DESIGN-CRITIQUE-20260812.md": "0d9560c6b6b06b5aeaaa67a97e8c711e3fb3b18778e901fa1ceb40da67f567cd",
    RECOVERY / "reference-pack/manifest.json": "732629803e1f4e9aeaea9e3d184df90441c3cfc48cf4a8c9f198aaa9186a6a8f",
    RECOVERY / "reference-pack/manifest.sha256": "9926a268593aada3c6bdc4c1955d3109c4eaf19aafeb802a0b5c5f812b7b4ec2",
    RECOVERY / "CARLI-CLAUDE-SIX-PAGE-RECONCILIATION.md": "d1fe1743e744a600fcec52bf45ed737e514be28bce186d02dfc3078e53f90b96",
    ROOT / "UFC/ops/day/20260813/MORNING_BRIEF.html": "59391669f6fcf0bc4a226c342327e4deea0c89960a414037a121bde9bb130d4c",
    REPO / "docs/orchestration/reviews/MAPLEMOON-STYLE-CHROME-CORRECTION-R2-20260817T140018.json": "120973a7505925520de7a70b33487651d7463b3d3f3e99edf36a0dc877e32d2a",
    REPO / "docs/orchestration/packets/MAPLEMOON-STYLE-CHROME-R2-HOLD-DISPOSITION-20260817T151159.md": "6a44ff05dfcb8289a0856fbdd17c0c3d8599c27df3975fd3fb9b56eff2ebc4ce",
    Path("/private/tmp/maplemoon-pdp-route-repair-20260816/homepage.html"): "9495d2eee0d81cbc8f86749df36b8f6532a9603c40638ffc728e55aae857cb89",
    Path("/private/tmp/maplemoon-pdp-route-repair-20260816/shop.html"): "a0c5c03c2aaf2b21307995a7b33843c5ffa0d5785ddf4a6dea252f40b8ab208a",
    Path("/private/tmp/maplemoon-pdp-route-repair-20260816/our-story.html"): "0f00cb8beae8b911920f20f6e5976d60d0e94e70ed99f7d3557dbf9a1883c2b2",
    Path("/private/tmp/maplemoon-pdp-route-repair-20260816/carob-story.html"): "5bfc9842c36d9f093d193f21cc7ea11cc96f3565fe65925d023e6ce0380e0756",
    Path("/private/tmp/maplemoon-pdp-route-repair-20260816/faq.html"): "29c1fb87be58a0c8ac65e148201c7164143fe947122e11c819c0444956a4b601",
    Path("/private/tmp/maplemoon-pdp-route-repair-20260816/stockists.html"): "b93f676f6ebdf9edc8bef7a7e013a0ab9a8aa6d7f2a0662c6da516d2741e955a",
    Path("/private/tmp/maplemoon-pdp-route-repair-20260816/products/pure-carob-bar.html"): "2157a7ef9846c854a2565b9e1c4c4a3f934b8b2ab92dc1e119a31bb838109869",
}

PINNED_DIRECTORIES = {
    REPO / "_wip/evidence/design_system_gap_audit_20260817T153140": "3de02a167f7e0b225c9624dabb2ce09c4d70fa4bd30372c80c8c5549dd7a83aa",
    REPO / "_wip/evidence/seven_route_visual_audit_r2_20260816T210036": "d62e4a4930642bd2e616bc7d8472bbcca91160659c59d79409fb80aff22f1034",
    REPO / "_wip/deploy/generated/maplemoon-style-chrome-derived-r2-20260817T140018": "3a1e162a6e63db71478e3d365155eff146e2e5839dfc7fad5833b7bc14175e24",
    REPO / "_wip/evidence/style_chrome_correction_r2_20260817T140018": "1f7217132d5308b1d62f2147f31e50f8ad08e5278a6d3c8ad4f545671f6cdeb4",
}


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def sha256_directory(path: Path) -> tuple[str, int]:
    digest = hashlib.sha256()
    count = 0
    for child in sorted(path.rglob("*")):
        if child.is_symlink():
            raise RuntimeError(f"symlink in protected directory: {child}")
        if not child.is_file():
            continue
        digest.update(child.relative_to(path).as_posix().encode("utf-8"))
        digest.update(b"\0")
        digest.update(sha256_file(child).encode("ascii"))
        digest.update(b"\n")
        count += 1
    return digest.hexdigest(), count


def validate_pins(file_pins: dict[Path, str], directory_pins: dict[Path, str]) -> list[str]:
    errors: list[str] = []
    for path, expected in file_pins.items():
        if not path.is_file():
            errors.append(f"protected file missing: {path}")
            continue
        actual = sha256_file(path)
        if actual != expected:
            errors.append(f"protected file drift: {path} expected={expected} actual={actual}")
    for path, expected in directory_pins.items():
        if not path.is_dir():
            errors.append(f"protected directory missing: {path}")
            continue
        try:
            actual, _ = sha256_directory(path)
        except RuntimeError as error:
            errors.append(str(error))
            continue
        if actual != expected:
            errors.append(f"protected directory drift: {path} expected={expected} actual={actual}")
    return errors


def load_json(path: Path) -> dict[str, Any]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        raise ValueError(f"JSON root is not an object: {path}")
    return payload


def main() -> int:
    errors = validate_pins(PINNED_FILES, PINNED_DIRECTORIES)

    design_verifier = R2_LANE / "verify-design-gap-audit.py"
    close_verifier = R2_LANE / "verify-readonly-close.py"
    for verifier in (design_verifier, close_verifier):
        if not verifier.is_file() or verifier.stat().st_size == 0:
            errors.append(f"R2 verifier missing or blank: {verifier}")

    try:
        rule_register = load_json(KIT / "RULE-REGISTER.json")
        design_tokens = load_json(KIT / "DESIGN-TOKENS.json")
        rule_count = len(rule_register.get("rules", []))
        decision_count = len(rule_register.get("decisions", []))
        token_count = len(design_tokens.get("tokens", {}))
        if (rule_count, decision_count, token_count) != (68, 12, 70):
            errors.append(f"authority count drift: rules={rule_count} decisions={decision_count} tokens={token_count}")
    except (OSError, ValueError, json.JSONDecodeError) as error:
        errors.append(f"authority inventory parse failure: {error}")
        rule_count = decision_count = token_count = -1

    mutated_files = copy.deepcopy(PINNED_FILES)
    mutation_target = next(iter(mutated_files))
    mutated_files[mutation_target] = "0" * 64
    mutation_errors = validate_pins(mutated_files, PINNED_DIRECTORIES)
    mutation_caught = any(str(mutation_target) in error and "drift" in error for error in mutation_errors)
    if not mutation_caught:
        errors.append("mutated read-only pin positive control was not caught")

    if errors:
        print("READONLY_CLOSE FAIL " + " | ".join(errors))
        print(f"POSITIVE_CONTROL mutated_read_only_pin={str(mutation_caught).lower()}")
        return 1

    directory_files = sum(sha256_directory(path)[1] for path in PINNED_DIRECTORIES)
    route_count = sum(1 for path in PINNED_FILES if str(path).startswith("/private/tmp/maplemoon-pdp-route-repair-20260816/") and path.suffix == ".html")
    print(
        "READONLY_CLOSE PASS "
        f"file_pins={len(PINNED_FILES)} directory_pins={len(PINNED_DIRECTORIES)} "
        f"directory_files={directory_files} routes={route_count} counts={rule_count}/{decision_count}/{token_count}"
    )
    print("POSITIVE_CONTROL PASS mutated_read_only_pin=true")
    return 0


if __name__ == "__main__":
    sys.exit(main())
