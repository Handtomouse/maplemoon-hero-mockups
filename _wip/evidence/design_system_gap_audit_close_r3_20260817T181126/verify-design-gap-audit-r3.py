#!/usr/bin/env python3
"""Verify the preserved Maple Moon audit against fresh isolated R3 visual QA."""

from __future__ import annotations

import argparse
import copy
import hashlib
import json
import re
import sys
from pathlib import Path
from typing import Any


EXPECTED_HASHES = {
    "report": "d0a8cc3895e079bf56a2ce0c0a7fffc3d80f3fd214a33bdcdd8854e3ea4fda44",
    "matrix": "cf2d11e621829dd044f3a4b4263224eab7a5b0f40e28e0e8c565bedd0f1ae22d",
    "sources": "177c76545c6486d2d293f3b762949dab99e00513ca5fc6e8de4936f03af29988",
}
R3_ROOT = Path("/Users/handtomouse/maplemoon-website/_wip/evidence/design_system_gap_audit_close_r3_20260817T181126")
EXPECTED_STATUS_DIGEST = "65761e41fba2387b3cfd325aa38a142efc05e03cafa624904e11ab18d9d41a39"
EXPECTED_WIDTHS = [1440, 1024, 768, 390]
EXPECTED_ROUTES = [
    "homepage",
    "shop",
    "our-story",
    "carob-story",
    "faq",
    "stockists",
    "pure-carob-bar",
]
REQUIRED_FIELDS = {
    "id",
    "domain",
    "affected_page_component",
    "evidence",
    "wrong_missing_underdeveloped",
    "recommended_direction",
    "priority",
    "effort_risk",
    "shared_rule_or_intentional_exception",
    "current_authority_status",
    "needs_nate",
    "site_vs_styles_kit_conflict",
    "ai_template_flag",
    "mobile_weakness_flag",
    "state",
}
REQUIRED_FINISH_SECTIONS = [
    "## The 10 highest-value improvements",
    "## Important areas we have not considered enough",
    "## Rules that should become shared standards",
    "## Differences that should remain page-specific",
    "## Visual decisions Nate needs to see",
    "## Staged visual-proof and implementation plan",
]
REQUIRED_COVERAGE = {
    "page layouts": ("layout",),
    "section systems": ("sections",),
    "page headers": ("page headers",),
    "headline treatments": ("headline",),
    "image crops": ("crop",),
    "image blends": ("blend",),
    "image fades": ("fade",),
    "image masks": ("mask",),
    "navigation": ("navigation",),
    "mobile navigation": ("mobile navigation",),
    "buttons": ("buttons",),
    "icons": ("icons",),
    "cards": ("cards",),
    "forms": ("forms",),
    "filters": ("filters",),
    "accordions": ("accordion",),
    "modals": ("modal",),
    "drawers": ("drawer",),
    "footers": ("footer",),
    "responsive behaviour": ("responsive",),
    "accessibility": ("accessibility",),
    "motion": ("motion",),
    "loading states": ("loading",),
    "error states": ("error",),
    "empty states": ("empty",),
    "performance": ("performance",),
    "Shopify editability": ("shopify",),
    "future-page extensibility": ("future", "extensibility"),
}
SOURCE_FIELDS = {
    "source_id",
    "kind",
    "title",
    "url_or_path",
    "owner",
    "accessed_at",
    "observation",
    "applicability",
    "conflict_or_fit",
    "mapped_rule_ids",
}
R2_LABEL = "EVIDENCE_ONLY, FAILED_REQUIRED_CHECK and NOT_PROMOTED"


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def status_digest(matrix: dict[str, Any]) -> str:
    statuses = sorted(
        (finding.get("id"), finding.get("current_authority_status"))
        for finding in matrix.get("findings", [])
    )
    payload = json.dumps(statuses, separators=(",", ":"), ensure_ascii=False).encode()
    return hashlib.sha256(payload).hexdigest()


def nonblank_string(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def validate_content(
    report_text: str,
    matrix: dict[str, Any],
    sources: dict[str, Any],
    visual: dict[str, Any],
) -> list[str]:
    errors: list[str] = []
    findings = matrix.get("findings")
    if matrix.get("schema") != "maplemoon-design-system-gap-matrix/v1":
        errors.append("matrix schema mismatch")
    if matrix.get("status") != "READ_ONLY_AUDIT_PLANNING_GUIDANCE_ONLY":
        errors.append("matrix authority status changed")
    if not isinstance(findings, list) or len(findings) != 40 or matrix.get("finding_count") != 40:
        errors.append("matrix must contain exactly 40 findings")
        findings = findings if isinstance(findings, list) else []

    ids: list[str] = []
    for index, finding in enumerate(findings):
        if not isinstance(finding, dict):
            errors.append(f"finding {index} is not an object")
            continue
        missing = sorted(REQUIRED_FIELDS - finding.keys())
        if missing:
            errors.append(f"finding {finding.get('id', index)} missing fields: {','.join(missing)}")
        finding_id = finding.get("id")
        if not isinstance(finding_id, str) or not re.fullmatch(r"GAP-\d{3}", finding_id):
            errors.append(f"finding {index} has invalid id")
        else:
            ids.append(finding_id)
        for field in (
            "domain",
            "affected_page_component",
            "wrong_missing_underdeveloped",
            "recommended_direction",
            "priority",
            "effort_risk",
            "shared_rule_or_intentional_exception",
            "current_authority_status",
            "site_vs_styles_kit_conflict",
            "state",
        ):
            if field in finding and not nonblank_string(finding[field]):
                errors.append(f"finding {finding_id or index} has blank {field}")
        evidence = finding.get("evidence")
        if not isinstance(evidence, list) or not evidence:
            errors.append(f"finding {finding_id or index} is uncited")
        else:
            for evidence_index, item in enumerate(evidence):
                if not isinstance(item, dict) or not nonblank_string(item.get("pointer")) or not nonblank_string(item.get("observation")):
                    errors.append(f"finding {finding_id or index} evidence {evidence_index} is incomplete")

    if len(ids) != len(set(ids)):
        errors.append("matrix finding IDs are duplicated")
    report_ids = re.findall(r"^\| (GAP-\d{3}) \|", report_text, flags=re.M)
    if len(report_ids) != 40 or len(set(report_ids)) != 40:
        errors.append("report must contain exactly 40 unique table findings")
    if set(report_ids) != set(ids):
        errors.append("report and matrix finding IDs are not one-to-one")

    for section in REQUIRED_FINISH_SECTIONS:
        if report_text.count(section) != 1:
            errors.append(f"report finish section missing or duplicated: {section}")
    combined = (report_text + "\n" + json.dumps(matrix, ensure_ascii=False)).lower()
    for label, needles in REQUIRED_COVERAGE.items():
        if not all(needle.lower() in combined for needle in needles):
            errors.append(f"named audit domain missing: {label}")

    top_ten = matrix.get("highest_value_improvements")
    if not isinstance(top_ten, list) or len(top_ten) != 10:
        errors.append("highest-value list must contain exactly ten items")
    else:
        ranks = [item.get("rank") for item in top_ten if isinstance(item, dict)]
        top_ids = [item.get("finding_id") for item in top_ten if isinstance(item, dict)]
        if ranks != list(range(1, 11)):
            errors.append("highest-value ranks must be exactly 1 through 10")
        if len(top_ids) != 10 or len(set(top_ids)) != 10 or not set(top_ids).issubset(set(ids)):
            errors.append("highest-value findings must be ten unique matrix IDs")
    top_section = report_text.split("## The 10 highest-value improvements", 1)
    if len(top_section) != 2:
        errors.append("report top-ten section unavailable")
    else:
        bounded = top_section[1].split("\n## ", 1)[0]
        if len(re.findall(r"^\d+\. \*\*GAP-\d{3}:\*\*", bounded, flags=re.M)) != 10:
            errors.append("report top-ten section must contain exactly ten numbered items")

    if status_digest(matrix) != EXPECTED_STATUS_DIGEST:
        errors.append("finding authority/status classifications changed")
    holds = matrix.get("holds")
    if not isinstance(holds, list) or not any(R2_LABEL in str(item) for item in holds):
        errors.append("matrix does not preserve the full R2 evidence-only label")
    if R2_LABEL not in report_text:
        errors.append("report does not preserve the full R2 evidence-only label")
    if re.search(r"\bR2\s+is\s+(?:current|approved|promoted|authority)\b", combined, flags=re.I):
        errors.append("R2 is asserted as current or promoted")

    source_rows = sources.get("sources")
    if sources.get("schema") != "maplemoon-design-system-gap-source-manifest/v1":
        errors.append("source manifest schema mismatch")
    if sources.get("accessed_at") != "2026-08-17":
        errors.append("source manifest date mismatch")
    authority_note = str(sources.get("authority_note", "")).lower()
    if "advisory" not in authority_note or "never maple moon authority" not in authority_note:
        errors.append("source manifest lacks the advisory/non-authority boundary")
    if not isinstance(source_rows, list) or len(source_rows) != 23:
        errors.append("source manifest must contain exactly 23 records")
        source_rows = source_rows if isinstance(source_rows, list) else []
    source_ids: list[str] = []
    for index, source in enumerate(source_rows):
        if not isinstance(source, dict):
            errors.append(f"source {index} is not an object")
            continue
        missing = sorted(SOURCE_FIELDS - source.keys())
        if missing:
            errors.append(f"source {source.get('source_id', index)} missing fields: {','.join(missing)}")
        source_id = source.get("source_id")
        if nonblank_string(source_id):
            source_ids.append(source_id)
        if source.get("accessed_at") != "2026-08-17":
            errors.append(f"source {source_id or index} has wrong access date")
        for field in ("kind", "title", "url_or_path", "owner", "observation", "applicability", "conflict_or_fit"):
            if not nonblank_string(source.get(field)):
                errors.append(f"source {source_id or index} has blank {field}")
        mapped = source.get("mapped_rule_ids")
        if not isinstance(mapped, list) or not mapped or not all(nonblank_string(value) for value in mapped):
            errors.append(f"source {source_id or index} lacks mapped rule IDs")
        kind = str(source.get("kind", ""))
        if kind.startswith("external") and "authority" in kind:
            errors.append(f"external source {source_id or index} is mislabeled as authority")
    if len(source_ids) != len(set(source_ids)):
        errors.append("source IDs are duplicated")

    if visual.get("schema") != "maplemoon-design-system-gap-visual-qa/v1" or visual.get("status") != "PASS":
        errors.append("visual QA schema/status mismatch")
    if visual.get("widths") != EXPECTED_WIDTHS or visual.get("routes") != EXPECTED_ROUTES:
        errors.append("visual QA route/width set mismatch")
    if not isinstance(visual.get("rows"), list) or len(visual["rows"]) != 28:
        errors.append("visual QA must contain 28 rows")
    if visual.get("failures") != []:
        errors.append("visual QA contains harness failures")
    controls = visual.get("positiveControls", {})
    expected_controls = ["missingRouteCaught", "overflowCaught", "brokenImageCaught", "blankCaught", "widthSetCaught"]
    if controls.get("result") != "PASS" or not all(controls.get(name) is True for name in expected_controls):
        errors.append("visual QA positive controls are incomplete")
    acquisition = visual.get("acquisition")
    if not isinstance(acquisition, list) or len(acquisition) != 7 or not all(item.get("match") is True for item in acquisition):
        errors.append("visual QA acquisition pins are incomplete")
    if visual.get("remote_target") != "https://maplemoonbuild20260813-m49nihfds-handtomouses-projects.vercel.app":
        errors.append("visual QA remote target mismatch")
    if visual.get("local_candidate") != "/private/tmp/maplemoon-pdp-route-repair-20260816":
        errors.append("visual QA candidate root mismatch")

    rows = visual.get("rows") if isinstance(visual.get("rows"), list) else []
    expected_pairs = {(route, width) for route in EXPECTED_ROUTES for width in EXPECTED_WIDTHS}
    observed_pairs: set[tuple[str, int]] = set()
    for row in rows:
        if not isinstance(row, dict):
            errors.append("visual QA row is not an object")
            continue
        route = row.get("route")
        width = row.get("width")
        if isinstance(route, str) and isinstance(width, int):
            observed_pairs.add((route, width))
        if row.get("result") != "PASS" or row.get("harnessFailures") != []:
            errors.append(f"visual QA row failed: {route}/{width}")
        telemetry = row.get("errors") if isinstance(row.get("errors"), dict) else {}
        if any(telemetry.get(key) for key in ("consoleErrors", "pageErrors", "requestFailures", "badResponses")):
            errors.append(f"visual QA telemetry failure: {route}/{width}")
        observed = row.get("observed") if isinstance(row.get("observed"), dict) else {}
        if observed.get("clientWidth") != width or not isinstance(observed.get("scrollWidth"), int) or observed.get("scrollWidth", 10**9) > width + 1:
            errors.append(f"visual QA root overflow or width mismatch: {route}/{width}")
        if observed.get("brokenImages"):
            errors.append(f"visual QA broken image: {route}/{width}")
        screenshot = row.get("screenshot") if isinstance(row.get("screenshot"), dict) else {}
        for variant in ("top", "full"):
            proof = screenshot.get(variant) if isinstance(screenshot.get(variant), dict) else {}
            proof_path = Path(str(proof.get("path", "")))
            try:
                inside_r3 = proof_path.resolve().is_relative_to(R3_ROOT.resolve())
            except (OSError, RuntimeError):
                inside_r3 = False
            if not inside_r3 or not proof_path.is_file() or proof_path.stat().st_size == 0:
                errors.append(f"visual QA {variant} proof missing/outside R3: {route}/{width}")
                continue
            if proof.get("nonblank") is not True or proof.get("bytes") != proof_path.stat().st_size or proof.get("sha256") != sha256_file(proof_path):
                errors.append(f"visual QA {variant} proof metadata mismatch: {route}/{width}")
    if observed_pairs != expected_pairs:
        errors.append("visual QA does not cover each route/width exactly once")

    contacts = visual.get("contacts")
    if not isinstance(contacts, list) or len(contacts) != 4:
        errors.append("visual QA must contain four contact sheets")
    else:
        for contact in contacts:
            contact_path = Path(str(contact.get("path", ""))) if isinstance(contact, dict) else Path("")
            try:
                inside_r3 = contact_path.resolve().is_relative_to(R3_ROOT.resolve())
            except (OSError, RuntimeError):
                inside_r3 = False
            if not inside_r3 or not contact_path.is_file() or contact_path.stat().st_size == 0:
                errors.append("visual QA contact sheet missing or outside R3")
            elif contact.get("bytes") != contact_path.stat().st_size or contact.get("sha256") != sha256_file(contact_path):
                errors.append(f"visual QA contact metadata mismatch: {contact_path}")

    for key in (
        "important_unconsidered_areas",
        "proposed_shared_standards",
        "intentional_page_specific_differences",
        "visual_decisions_for_nate",
        "staged_plan",
        "holds",
    ):
        if not isinstance(matrix.get(key), list) or not matrix[key]:
            errors.append(f"matrix finish collection missing: {key}")
    return errors


def caught(errors: list[str], expected_fragment: str) -> bool:
    return any(expected_fragment in error for error in errors)


def run_positive_controls(report_text: str, matrix: dict[str, Any], sources: dict[str, Any], visual: dict[str, Any]) -> dict[str, bool]:
    controls: dict[str, bool] = {}

    uncited = copy.deepcopy(matrix)
    uncited["findings"][0]["evidence"] = []
    controls["uncited_finding"] = caught(validate_content(report_text, uncited, sources, visual), "uncited")

    missing_field = copy.deepcopy(matrix)
    del missing_field["findings"][0]["domain"]
    controls["missing_field_domain"] = caught(validate_content(report_text, missing_field, sources, visual), "missing fields: domain")

    promoted = copy.deepcopy(matrix)
    next(item for item in promoted["findings"] if item["id"] == "GAP-008")["current_authority_status"] = "APPROVED"
    controls["status_promotion"] = caught(validate_content(report_text, promoted, sources, visual), "classifications changed")

    r2_current = copy.deepcopy(matrix)
    r2_current["holds"] = ["R2 is current authority." if R2_LABEL in str(item) else item for item in r2_current["holds"]]
    changed_report = report_text.replace(R2_LABEL, "R2 is current authority")
    controls["r2_as_current"] = caught(validate_content(changed_report, r2_current, sources, visual), "R2")

    missing_top_ten = copy.deepcopy(matrix)
    missing_top_ten["highest_value_improvements"].pop()
    controls["missing_top_ten"] = caught(validate_content(report_text, missing_top_ten, sources, visual), "exactly ten")
    return controls


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--report", type=Path, required=True)
    parser.add_argument("--matrix", type=Path, required=True)
    parser.add_argument("--sources", type=Path, required=True)
    parser.add_argument("--visual-qa", type=Path, required=True)
    args = parser.parse_args()

    paths = {
        "report": args.report,
        "matrix": args.matrix,
        "sources": args.sources,
        "visual_qa": args.visual_qa,
    }
    errors: list[str] = []
    for label, path in paths.items():
        if not path.is_file() or path.stat().st_size == 0:
            errors.append(f"{label} missing or blank: {path}")
        elif label in EXPECTED_HASHES and sha256_file(path) != EXPECTED_HASHES[label]:
            errors.append(f"{label} SHA-256 mismatch")
    if errors:
        print("DESIGN_GAP_AUDIT_R3 FAIL " + " | ".join(errors))
        return 1

    try:
        report_text = args.report.read_text(encoding="utf-8")
        matrix = json.loads(args.matrix.read_text(encoding="utf-8"))
        sources = json.loads(args.sources.read_text(encoding="utf-8"))
        visual = json.loads(args.visual_qa.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as error:
        print(f"DESIGN_GAP_AUDIT FAIL parse_error={error}")
        return 1

    errors = validate_content(report_text, matrix, sources, visual)
    controls = run_positive_controls(report_text, matrix, sources, visual)
    if not all(controls.values()):
        errors.append("one or more positive controls were not caught")
    if errors:
        print("DESIGN_GAP_AUDIT FAIL " + " | ".join(errors))
        print("POSITIVE_CONTROLS " + " ".join(f"{name}={str(value).lower()}" for name, value in controls.items()))
        return 1

    print("DESIGN_GAP_AUDIT_R3 PASS findings=40 report_ids=40 top10=10 sources=23 visual_rows=28 statuses=UNCHANGED")
    print("POSITIVE_CONTROLS PASS " + " ".join(f"{name}=true" for name in controls))
    return 0


if __name__ == "__main__":
    sys.exit(main())
