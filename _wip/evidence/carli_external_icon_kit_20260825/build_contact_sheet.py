from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path("/Users/handtomouse/maplemoon-website")
KIT = ROOT / "_wip/deliverables/MapleMoon_External_Designer_Icon_Kit_20260825"
PNGS = KIT / "03_FINAL_PRODUCTION_PENDING/02_PNG_TRANSPARENT_2000PX"
OUTPUT = KIT / "02_REVIEW_PROOFS/MapleMoon_Packaging-Icon_Contact-Sheet_20260825.pdf"
PACK_PREVIEW = Path(
    "/private/tmp/mm_arabic_clean_20260825/rendered/"
    "MM_4PACK_Moons_PCOB_35G_BILINGUAL_10-AUG-2026_PRINT.png"
)

BLUE = HexColor("#315F88")
CREAM = HexColor("#E7E4CA")
PAPER = HexColor("#F4F1E8")
INK = HexColor("#172326")
MUTED = HexColor("#667477")
WHITE = HexColor("#FFFFFF")


FRONT = [
    ("MM_Icon_Caffeine-Free.png", "Caffeine free"),
    ("MM_Icon_Organic-Ingredients.png", "Organic ingredients"),
    ("MM_Icon_Made-in-Australia.png", "Made in Australia"),
    ("MM_Icon_Vegan-Friendly.png", "Vegan friendly"),
    ("MM_Icon_Gluten-Free.png", "Gluten free"),
]

BACK = [
    ("MM_Icon_With-Only-2-Ingredients.png", "With only 2 ingredients"),
    ("MM_Icon_With-Only-3-Ingredients.png", "With only 3 ingredients"),
    ("MM_Icon_With-Only-4-Ingredients.png", "With only 4 ingredients"),
    ("MM_Icon_Additive-Free.png", "Additive free"),
    ("MM_Icon_No-Artificial-Flavours-Colours.png", "No artificial flavours & colours"),
    ("MM_Icon_Less-than-5g-Natural-Sugars.png", "Less than 5g natural sugars"),
]

BRAND = [
    ("MM_Brandmark_Moon-Sun.png", "Moon / Sun brandmark"),
    ("MM_Logo_Primary.png", "Primary logo"),
]


def fit_text(c, text, x, y, max_width, font="Helvetica", size=8, min_size=6):
    while size > min_size and stringWidth(text, font, size) > max_width:
        size -= 0.25
    c.setFont(font, size)
    c.drawCentredString(x, y, text)


def draw_header(c, title, subtitle, page_no):
    width, height = landscape(A4)
    c.setFillColor(BLUE)
    c.rect(0, height - 78, width, 78, stroke=0, fill=1)
    c.setFillColor(CREAM)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(34, height - 42, title)
    c.setFont("Helvetica", 9.5)
    c.drawString(35, height - 60, subtitle)
    c.setFont("Helvetica-Bold", 9)
    c.drawRightString(width - 34, height - 42, f"25 AUG 2026  ·  {page_no}/2")


def draw_tile(c, x, y, w, h, filename, label):
    c.setFillColor(BLUE)
    c.roundRect(x, y, w, h, 7, stroke=0, fill=1)
    image_box = min(w - 18, h - 42)
    image_x = x + (w - image_box) / 2
    image_y = y + 30
    c.drawImage(
        ImageReader(PNGS / filename),
        image_x,
        image_y,
        image_box,
        image_box,
        preserveAspectRatio=True,
        anchor="c",
        mask="auto",
    )
    c.setFillColor(CREAM)
    fit_text(c, label, x + w / 2, y + 13, w - 14, size=8.5, min_size=6.25)


def draw_grid(c, items, x, y, total_width, tile_height, columns, gap):
    tile_width = (total_width - gap * (columns - 1)) / columns
    for index, (filename, label) in enumerate(items):
        col = index % columns
        row = index // columns
        draw_tile(
            c,
            x + col * (tile_width + gap),
            y - row * (tile_height + gap),
            tile_width,
            tile_height,
            filename,
            label,
        )


def draw_page_one(c):
    width, height = landscape(A4)
    c.setFillColor(PAPER)
    c.rect(0, 0, width, height, stroke=0, fill=1)
    draw_header(
        c,
        "MapleMoon current packaging icons",
        "Individual, named assets verified against the bilingual Saudi Moons clean set dated 10 August 2026.",
        1,
    )

    margin = 34
    usable = width - margin * 2
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(margin, height - 101, "FRONT CLAIM BADGES")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 7.5)
    c.drawRightString(width - margin, height - 101, "Current on-pack wording and artwork")
    draw_grid(c, FRONT, margin, height - 246, usable, 128, 5, 9)

    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(margin, height - 270, "BACK CLAIM BADGES")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 7.5)
    c.drawRightString(
        width - margin,
        height - 270,
        "Ingredient-count badge is SKU-specific - use only the applicable 2, 3 or 4 variant",
    )
    draw_grid(c, BACK, margin, height - 421, usable, 132, 6, 8)

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 7.5)
    c.drawString(
        margin,
        18,
        "Files supplied once each as editable SVG vectors and 2000 x 2000 px transparent PNGs. On-pack cream is retained.",
    )


def draw_page_two(c):
    width, height = landscape(A4)
    c.setFillColor(PAPER)
    c.rect(0, 0, width, height, stroke=0, fill=1)
    draw_header(
        c,
        "Brand assets and current source reference",
        "Individual SVG and PNG files are supplied; production packaging files are intentionally excluded.",
        2,
    )

    margin = 34
    left_w = 340
    gap = 22
    right_x = margin + left_w + gap
    right_w = width - right_x - margin

    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(margin, height - 103, "BRAND ASSETS")
    tile_w = (left_w - 12) / 2
    draw_tile(c, margin, height - 324, tile_w, 196, *BRAND[0])
    draw_tile(c, margin + tile_w + 12, height - 324, tile_w, 196, *BRAND[1])

    c.setFillColor(WHITE)
    c.roundRect(margin, 48, left_w, 190, 8, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(margin + 16, 218, "DESIGNER HANDOFF")
    c.setFont("Helvetica", 8.5)
    notes = [
        "SVG: editable vector artwork; opens in Adobe Illustrator.",
        "PNG: transparent 2000 px derivative for placement and preview.",
        "Keep the supplied wording and proportions intact.",
        "Do not use all ingredient-count variants together.",
        "Claims and recolouring need MapleMoon approval before production.",
    ]
    text = c.beginText(margin + 16, 196)
    text.setLeading(19)
    for line in notes:
        text.textLine(f"•  {line}")
    c.drawText(text)

    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(right_x, height - 103, "CURRENT PACKAGING AUTHORITY")
    preview_h = 286
    c.setFillColor(WHITE)
    c.roundRect(right_x, height - 412, right_w, preview_h, 8, stroke=0, fill=1)
    c.drawImage(
        ImageReader(PACK_PREVIEW),
        right_x + 12,
        height - 400,
        right_w - 24,
        preview_h - 24,
        preserveAspectRatio=True,
        anchor="c",
        mask="auto",
    )

    c.setFillColor(WHITE)
    c.roundRect(right_x, 48, right_w, 118, 8, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 9.5)
    c.drawString(right_x + 14, 145, "CLEAN-SET_10-AUG-2026  ·  BILINGUAL SAUDI MOONS")
    c.setFont("Helvetica", 7.8)
    source_lines = [
        "Context preview: current Pure Carob bilingual pack; packaging file not included.",
        "Authority manifest: 00_PLATE_FROM_THIS.md - use CLEAN-SET only.",
        "Full six-flavour source: drive.google.com/drive/folders/1h0M_Sz3NCbWfTjPfmlV30P52EqCUFzAu",
        "Earlier 7 August and MOON-REVERT sets are superseded and excluded.",
    ]
    text = c.beginText(right_x + 14, 126)
    text.setLeading(16)
    for line in source_lines:
        text.textLine(line)
    c.drawText(text)


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=landscape(A4), pageCompression=1)
    pdf.setTitle("MapleMoon Packaging Icon Contact Sheet - 25 August 2026")
    pdf.setAuthor("HandToMouse")
    draw_page_one(pdf)
    pdf.showPage()
    draw_page_two(pdf)
    pdf.showPage()
    pdf.save()


if __name__ == "__main__":
    main()
