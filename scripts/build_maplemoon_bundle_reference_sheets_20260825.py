#!/usr/bin/env python3
"""Fail-closed deterministic reference sheets for one approved bundle image call."""

from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


REPO = Path(__file__).resolve().parents[1]
EVIDENCE = REPO / "_wip/evidence/maplemoon_bundle_correction_20260825t181849"
MAY_ROOT = Path("/Users/handtomouse/UFC/spins/maplemoon_bites_moodboard_export_20260516/output_PNG")
RAW_ROOT = Path("/Users/handtomouse/Library/CloudStorage/GoogleDrive-hello@handtomouse.org/My Drive/MrCC_PAI_Stage1_Files/UFC/clients/maplemoon/deliverables/photoshoot_2026_05_24/_closeout_20260812/08_photo_production_wave/product_geometry/proxies_real_raw")
CANDIDATE = Path("/Users/handtomouse/.codex/generated_images/019ffe53-6243-73a2-9d75-e1a072cd07ce/exec-82159e46-662a-4e9b-af90-0e2c68af52ac.png")
CANDIDATE_SHA256 = "b7d669130ef5c1482b4d3655e1407885087c884089cfdbadd7b0b5d0c5abdba1"

MAY_INPUTS = (
    ("pecan-eclipsed-bite-main.png", "PECAN ECLIPSE BITE", "851f2430025b2e06ccddf22c0c9eee932b74a4bf5304cffe0c3a8a64a2473ad2"),
    ("salted-almond-eclipsed-bite-main.png", "SALTED ALMOND ECLIPSE BITE", "334d09b0666b31cff4d015215a2ba23a21ce91a91fb1ae2cf54d734872372898"),
    ("hazelnut-eclipsed-bite-main.png", "HAZELNUT ECLIPSE BITE", "74f993edc3e82a35117fbf83aff1cbde38df050efd7dc7ae8a6626743327dee7"),
    ("salted-caramel-fudge-main.png", "SALTED CARAMEL FUDGE", "2f4fcc83cc9a58990ecf5040651ced18383c8c038db9afdaa079f4ed2b56e960"),
    ("goji-coconut-bar-main.png", "GOJI COCONUT BAR", "174c8a5f5f16f3c97a756c3656d4d6181f9ce9258ef02cd997187fcb3aea3f2f"),
    ("salted-almond-eclipsed-bite-main-inside.png", "ALMOND INTERIOR AUTHORITY", None),
    ("hazelnut-eclipsed-bite-main-inside.png", "HAZELNUT INTERIOR AUTHORITY", None),
)
RAW_STEMS = ("DSC01543", "DSC01561", "DSC01563", "DSC01564", "DSC01567", "DSC01572", "DSC01576")
PROMPT = (
    "Professional studio product photograph of exactly five Maple Moon products: one Pecan Eclipse Bite, one Salted Almond Eclipse Bite, one Hazelnut Eclipse Bite, one Salted Caramel Fudge and one Goji Coconut Bar. "
    "Treat the labelled identity sheet as SKU authority and the real-raw sheet only as scale, silhouette, texture and fudge-geometry authority. "
    "Make Almond unmistakable by showing one clean cut face with large angular almond pieces; keep Hazelnut intact with smaller rounded hazelnut crumb. "
    "Preserve the pecan-topped form. Make all three bites irregular, low and hand-dipped, never cloned domes. "
    "Make the fudge low, layered and hand-cut, not a perfect cube. Keep the Goji Coconut Bar substantial and faithful to its named reference, without invented red flecks. "
    "Arrange an asymmetrical five-item group with consistent scale, soft upper-left diffused light, neutral 5000K, natural contact shadows and crisp food texture on a transparent background. "
    "3/4 camera, 85mm feel, deep focus. No extra pieces, duplicate bodies, props, packaging, text, logos, white panels or floating shadows."
)


class GateError(RuntimeError):
    """A governed input is missing or changed."""


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    names = (
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    )
    for name in names:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def contain(path: Path, size: tuple[int, int], background: str = "#f7f5ef") -> Image.Image:
    with Image.open(path) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGBA")
    plate = Image.new("RGBA", size, background)
    fitted = ImageOps.contain(image, (size[0] - 24, size[1] - 24), Image.Resampling.LANCZOS)
    plate.alpha_composite(fitted, ((size[0] - fitted.width) // 2, (size[1] - fitted.height) // 2))
    return plate.convert("RGB")


def find_raws() -> tuple[dict[str, Path], list[str], list[str]]:
    found: dict[str, Path] = {}
    missing: list[str] = []
    ambiguous: list[str] = []
    for stem in RAW_STEMS:
        matches = sorted(path for path in RAW_ROOT.rglob(f"{stem}*") if path.is_file()) if RAW_ROOT.is_dir() else []
        if not matches:
            missing.append(stem)
        elif len(matches) > 1:
            ambiguous.append(f"{stem}:{len(matches)}")
        else:
            found[stem] = matches[0]
    return found, missing, ambiguous


def validate_inputs() -> tuple[list[tuple[Path, str]], dict[str, Path], dict[str, str]]:
    may: list[tuple[Path, str]] = []
    may_hashes: dict[str, str] = {}
    for filename, label, expected in MAY_INPUTS:
        path = MAY_ROOT / filename
        if not path.is_file():
            raise GateError(f"missing May identity: {filename}")
        actual = sha256_file(path)
        if expected and actual != expected:
            raise GateError(f"May identity hash changed: {filename}")
        may.append((path, label))
        may_hashes[filename] = actual
    if not CANDIDATE.is_file() or sha256_file(CANDIDATE) != CANDIDATE_SHA256:
        raise GateError("current failure candidate missing or hash changed")
    raws, missing, ambiguous = find_raws()
    if missing or ambiguous:
        detail = []
        if missing:
            detail.append("missing=" + ",".join(missing))
        if ambiguous:
            detail.append("ambiguous=" + ",".join(ambiguous))
        raise GateError("governed raw gate closed: " + " ".join(detail))
    return may, raws, may_hashes


def draw_sheet_header(canvas: Image.Image, title: str, subtitle: str) -> None:
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((0, 0, canvas.width, 116), fill="#1e4366")
    draw.text((36, 24), title, fill="white", font=font(30, True))
    draw.text((36, 67), subtitle, fill="#e7e4ca", font=font(17))


def build_identity(may: list[tuple[Path, str]]) -> Path:
    canvas = Image.new("RGB", (1800, 1280), "#e7edf3")
    draw_sheet_header(canvas, "BUNDLE IDENTITY REFERENCE", "Named May files are SKU authority. Interior views distinguish Almond from Hazelnut.")
    draw = ImageDraw.Draw(canvas)
    cells = [(40 + (i % 4) * 440, 145 + (i // 4) * 550) for i in range(len(may))]
    for (path, label), (x, y) in zip(may, cells):
        plate = contain(path, (410, 430))
        canvas.paste(plate, (x, y))
        draw.rectangle((x, y, x + 410, y + 430), outline="#457798", width=2)
        draw.text((x, y + 444), label, fill="#101923", font=font(18, True))
        draw.text((x, y + 474), path.name, fill="#394952", font=font(13))
    output = EVIDENCE / "bundle_identity_reference_sheet.png"
    canvas.save(output, format="PNG", compress_level=9)
    return output


def build_geometry(raws: dict[str, Path]) -> Path:
    canvas = Image.new("RGB", (1800, 1280), "#e7edf3")
    draw_sheet_header(canvas, "BUNDLE GEOMETRY REFERENCE", "Geometry evidence only. These files are not Almond or Hazelnut SKU bindings.")
    draw = ImageDraw.Draw(canvas)
    for index, stem in enumerate(RAW_STEMS):
        x = 40 + (index % 4) * 440
        y = 145 + (index // 4) * 550
        plate = contain(raws[stem], (410, 430), "#fbfaf7")
        canvas.paste(plate, (x, y))
        draw.rectangle((x, y, x + 410, y + 430), outline="#457798", width=2)
        family = "ECLIPSE FAMILY GEOMETRY" if index < 4 else "FUDGE GEOMETRY"
        draw.text((x, y + 444), f"{stem} | {family}", fill="#101923", font=font(17, True))
        draw.text((x, y + 474), raws[stem].name, fill="#394952", font=font(13))
    output = EVIDENCE / "bundle_geometry_reference_sheet.png"
    canvas.save(output, format="PNG", compress_level=9)
    return output


def build_failure() -> Path:
    canvas = Image.new("RGB", (1800, 1200), "#101923")
    draw_sheet_header(canvas, "CURRENT CANDIDATE FAILURE REFERENCE", "Do not repeat these recorded defects.")
    plate = contain(CANDIDATE, (1180, 920), "#fbfaf7")
    canvas.paste(plate, (35, 145))
    draw = ImageDraw.Draw(canvas)
    failures = (
        "1. Almond and Hazelnut remain too similar.",
        "2. Three bites read as cloned moulded domes.",
        "3. Fudge scale and geometry remain wrong.",
        "4. Goji surface material is not real-raw verified.",
        "5. Keep exactly five product bodies.",
    )
    draw.rounded_rectangle((1250, 180, 1760, 870), radius=18, fill="#e7e4ca", outline="#457798", width=3)
    draw.text((1285, 220), "REJECT IF REPEATED", fill="#1e4366", font=font(24, True))
    y = 290
    for line in failures:
        draw.multiline_text((1285, y), line, fill="#101923", font=font(20), spacing=6)
        y += 104
    draw.text((1285, 820), "Source SHA-256", fill="#394952", font=font(14, True))
    draw.text((1285, 848), CANDIDATE_SHA256[:32], fill="#394952", font=font(13))
    draw.text((1285, 870), CANDIDATE_SHA256[32:], fill="#394952", font=font(13))
    output = EVIDENCE / "bundle_failure_reference_sheet.png"
    canvas.save(output, format="PNG", compress_level=9)
    return output


def write_gate(status: str, reason: str, raw_hashes: dict[str, str] | None = None, outputs: list[Path] | None = None) -> None:
    EVIDENCE.mkdir(parents=True, exist_ok=True)
    record = {
        "schema": "maplemoon-bundle-raw-reference-gate/v1",
        "status": status,
        "reason": reason,
        "required_raw_stems": list(RAW_STEMS),
        "raw_root": str(RAW_ROOT),
        "raw_sha256": raw_hashes or {},
        "outputs": [path.name for path in outputs or []],
        "approved_prompt": PROMPT,
        "estimated_cost_usd": {"low": 0.20, "high": 0.30, "hard_cap": 0.35},
        "automatic_retry": False,
        "generation_run": False,
        "launch_admitted": False,
    }
    (EVIDENCE / "raw_reference_gate.json").write_text(
        json.dumps(record, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )


def main() -> int:
    try:
        may, raws, may_hashes = validate_inputs()
    except (GateError, OSError, ValueError) as error:
        write_gate("HOLD", str(error))
        print(f"REFERENCE HOLD: {error}")
        return 2
    try:
        EVIDENCE.mkdir(parents=True, exist_ok=True)
        outputs = [build_identity(may), build_geometry(raws), build_failure()]
        raw_hashes = {stem: sha256_file(path) for stem, path in raws.items()}
        sheet_hashes = {path.name: sha256_file(path) for path in outputs}
        write_gate("READY_FOR_SINGLE_REVIEW_ONLY_CALL", "all governed inputs present and hashed", raw_hashes, outputs)
        manifest = {
            "schema": "maplemoon-bundle-reference-sheets/v1",
            "may_sha256": may_hashes,
            "raw_sha256": raw_hashes,
            "candidate_sha256": CANDIDATE_SHA256,
            "sheet_sha256": sheet_hashes,
            "approved_prompt": PROMPT,
            "estimated_cost_usd": {"low": 0.20, "high": 0.30, "hard_cap": 0.35},
            "automatic_retry": False,
            "generation_run": False,
        }
        (EVIDENCE / "bundle_reference_manifest.json").write_text(
            json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8"
        )
    except (OSError, ValueError) as error:
        write_gate("HOLD", f"reference rendering failed: {error}")
        print(f"REFERENCE HOLD: rendering failed: {error}")
        return 2
    print("REFERENCE PASS sheets=3 generation_run=false single_call_ready=true")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
