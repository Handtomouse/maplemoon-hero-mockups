from pathlib import Path
from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).parent
SHOTS = ROOT / "screenshots"
ROUTES = ["homepage", "our-story", "carob-story", "shop", "faq", "stockists", "pure-carob-bar"]


def overview(width: int) -> None:
    box = (300, 620)
    margin = 18
    label_h = 34
    canvas = Image.new("RGB", (len(ROUTES) * (box[0] + margin) + margin, box[1] + label_h + margin * 2), "#ece8dc")
    draw = ImageDraw.Draw(canvas)
    for index, route in enumerate(ROUTES):
        image = Image.open(SHOTS / f"{width}-{route}-full.png").convert("RGB")
        thumb = ImageOps.contain(image, box)
        x = margin + index * (box[0] + margin) + (box[0] - thumb.width) // 2
        y = margin + label_h + (box[1] - thumb.height) // 2
        canvas.paste(thumb, (x, y))
        draw.text((margin + index * (box[0] + margin), margin), f"{width} · {route}", fill="#142737")
    canvas.save(ROOT / f"visual-overview-{width}.png")


def states() -> None:
    names = ["390-homepage-menu-open.png", "390-shop-cart-open.png"]
    box = (720, 900)
    margin = 24
    label_h = 38
    canvas = Image.new("RGB", (len(names) * (box[0] + margin) + margin, box[1] + label_h + margin * 2), "#ece8dc")
    draw = ImageDraw.Draw(canvas)
    for index, name in enumerate(names):
        image = Image.open(SHOTS / name).convert("RGB")
        thumb = ImageOps.contain(image, box)
        x = margin + index * (box[0] + margin) + (box[0] - thumb.width) // 2
        y = margin + label_h + (box[1] - thumb.height) // 2
        canvas.paste(thumb, (x, y))
        draw.text((margin + index * (box[0] + margin), margin), name.removesuffix(".png"), fill="#142737")
    canvas.save(ROOT / "visual-open-states.png")


def segments(width: int) -> None:
    labels = ["top", "middle", "bottom"]
    box = (520 if width == 390 else 720, 660 if width == 390 else 496)
    margin = 18
    label_h = 32
    canvas = Image.new(
        "RGB",
        (len(labels) * (box[0] + margin) + margin, len(ROUTES) * (box[1] + label_h + margin) + margin),
        "#ece8dc",
    )
    draw = ImageDraw.Draw(canvas)
    for row, route in enumerate(ROUTES):
        for column, label in enumerate(labels):
            name = f"{width}-{route}-segment-{label}.png"
            image = Image.open(SHOTS / name).convert("RGB")
            thumb = ImageOps.contain(image, box)
            x = margin + column * (box[0] + margin) + (box[0] - thumb.width) // 2
            y0 = margin + row * (box[1] + label_h + margin)
            y = y0 + label_h + (box[1] - thumb.height) // 2
            canvas.paste(thumb, (x, y))
            draw.text((margin + column * (box[0] + margin), y0), f"{width} · {route} · {label}", fill="#142737")
    canvas.save(ROOT / f"visual-segments-{width}.png")


overview(390)
overview(720)
states()
segments(390)
segments(720)
print("VISUAL_CONTACTS PASS sheets=5")
