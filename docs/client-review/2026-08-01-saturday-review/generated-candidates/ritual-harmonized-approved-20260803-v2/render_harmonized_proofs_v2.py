#!/usr/bin/env python3
import base64
import json
import pathlib
import time
import urllib.request

import websocket

DEBUG = "http://127.0.0.1:9333"
ROOT = pathlib.Path(__file__).resolve().parent


def new_target():
    request = urllib.request.Request(f"{DEBUG}/json/new?about:blank", method="PUT")
    with urllib.request.urlopen(request, timeout=10) as response:
        return json.load(response)


def render(width, viewport_height, png_name):
    target = new_target()
    ws = websocket.create_connection(target["webSocketDebuggerUrl"], timeout=20, origin=DEBUG)
    counter = 0

    def command(method, params=None):
        nonlocal counter
        counter += 1
        ident = counter
        ws.send(json.dumps({"id": ident, "method": method, "params": params or {}}))
        while True:
            message = json.loads(ws.recv())
            if message.get("id") == ident:
                if "error" in message:
                    raise RuntimeError(message["error"])
                return message.get("result", {})

    command("Page.enable")
    command("Runtime.enable")
    command("Emulation.setDeviceMetricsOverride", {
        "width": width, "height": viewport_height, "deviceScaleFactor": 1,
        "mobile": False, "screenWidth": width, "screenHeight": viewport_height,
    })
    command("Page.navigate", {"url": (ROOT / "harmonized_site_treatment_v2.html").as_uri()})
    expression = """({
      readyState: document.readyState,
      allImagesLoaded: [...document.images].every(i => i.complete && i.naturalWidth > 0),
      innerWidth: window.innerWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      cardWidths: [...document.querySelectorAll('.q-tile')].map(e => Number(e.getBoundingClientRect().width.toFixed(3))),
      cardHeights: [...document.querySelectorAll('.q-tile')].map(e => Number(e.getBoundingClientRect().height.toFixed(3)))
    })"""
    state = None
    for _ in range(100):
        state = command("Runtime.evaluate", {"expression": expression, "returnByValue": True})["result"]["value"]
        if state["readyState"] == "complete" and state["allImagesLoaded"]:
            break
        time.sleep(0.05)
    else:
        raise RuntimeError("Page or images did not finish loading")
    height = state["scrollHeight"]
    command("Emulation.setDeviceMetricsOverride", {
        "width": width, "height": height, "deviceScaleFactor": 1,
        "mobile": False, "screenWidth": width, "screenHeight": height,
    })
    shot = command("Page.captureScreenshot", {
        "format": "png", "fromSurface": True, "captureBeyondViewport": True,
        "clip": {"x": 0, "y": 0, "width": width, "height": height, "scale": 1},
    })
    (ROOT / png_name).write_bytes(base64.b64decode(shot["data"]))
    command("Page.close")
    ws.close()
    state.update({"file": png_name, "screenshotWidth": width, "screenshotHeight": height})
    return state


report = {
    "schema": "maplemoon-ritual-harmonized-chrome-qa/v2",
    "desktop": render(1440, 1000, "harmonized_site_treatment_desktop_v2.png"),
    "mobile": render(390, 900, "harmonized_site_treatment_mobile_true390_v2.png"),
}
(ROOT / "harmonized_chrome_qa_v2.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
print(json.dumps(report, indent=2))
