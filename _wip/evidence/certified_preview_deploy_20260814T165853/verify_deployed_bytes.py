#!/usr/bin/env python3
import hashlib
import json
import re
import subprocess
import tempfile
from datetime import UTC, datetime
from pathlib import Path

PREVIEW = "https://maplemoonbuild20260813-28up3uqbm-handtomouses-projects.vercel.app"
CANDIDATE = Path("/Users/handtomouse/maplemoon_build_20260813")
OUT = Path("/Users/handtomouse/maplemoon-website/_wip/evidence/certified_preview_deploy_20260814T165853")
FILES = [
    "homepage.html",
    "our-story.html",
    "carob-story.html",
    "shop.html",
    "faq.html",
    "stockists.html",
    "pure-carob-bar.html",
    "mock-cart.js",
    "mock-cart.css",
    "assets/design-system/mm-chrome.js",
    "assets/design-system/mm-chrome.css",
    "assets/design-system/mm-tokens.css",
    "assets/design-system/mm-primitives.css",
]
QUESTION = "Does carob contain caffeine?"
ANSWER = (
    "Carob itself is naturally caffeine-free. Its mellow, naturally sweet flavour works "
    "beautifully in bars, baking and warm drinks. Maple Moon recipes vary, so please check "
    "the individual product label for the full ingredient list."
)


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def fetch(route: str, destination: Path) -> dict:
    command = [
        "vercel", "curl", f"/{route}", "--deployment", PREVIEW, "--",
        "--silent", "--show-error", "--location", "--output", str(destination),
        "--write-out", "%{http_code}",
    ]
    completed = subprocess.run(
        command,
        cwd=CANDIDATE,
        text=True,
        capture_output=True,
        check=False,
    )
    match = re.search(r"(\d{3})\s*$", completed.stdout)
    status = int(match.group(1)) if match else None
    body = destination.read_bytes() if destination.is_file() else b""
    return {
        "command": " ".join(command[:6]) + " -- [curl output controls]",
        "exit_code": completed.returncode,
        "status": status,
        "bytes": len(body),
        "sha256": sha256(body),
        "stderr": completed.stderr.strip(),
        "body": body,
    }


def main() -> int:
    report = {
        "schema": "maplemoon-certified-preview-byte-equality/v1",
        "preview_url": PREVIEW,
        "checked_at": datetime.now(UTC).isoformat().replace("+00:00", "Z"),
        "files": {},
        "bogus_controls": [],
        "faq": {},
        "outcome": "PASS",
    }
    with tempfile.TemporaryDirectory(prefix="maplemoon-preview-verify-") as temporary:
        temp = Path(temporary)
        for index, relative in enumerate(FILES):
            remote = fetch(relative, temp / f"file-{index}")
            local = (CANDIDATE / relative).read_bytes()
            equal = remote["body"] == local
            record = {key: value for key, value in remote.items() if key != "body"}
            record.update({
                "local_bytes": len(local),
                "local_sha256": sha256(local),
                "byte_equal": equal,
                "nonblank": len(remote["body"]) > 0,
            })
            report["files"][relative] = record
            if remote["exit_code"] != 0 or remote["status"] != 200 or not remote["body"] or not equal:
                raise RuntimeError(f"deployed equality failed for {relative}: {record}")

        homepage_hash = report["files"]["homepage.html"]["sha256"]
        for index, route in enumerate(("zzq-certified-preview-missing-9471", "zzq-certified-preview-missing-9471.html")):
            remote = fetch(route, temp / f"bogus-{index}")
            record = {key: value for key, value in remote.items() if key != "body"}
            record["distinct_from_homepage"] = remote["sha256"] != homepage_hash
            report["bogus_controls"].append(record)
            if remote["exit_code"] != 0 or remote["status"] != 404 or not remote["body"] or not record["distinct_from_homepage"]:
                raise RuntimeError(f"bogus route was not a genuine distinct 404: {route}: {record}")

        faq = (CANDIDATE / "faq.html").read_text(encoding="utf-8")
        report["faq"] = {
            "question": QUESTION,
            "answer": ANSWER,
            "question_count": faq.count(QUESTION),
            "answer_count": faq.count(ANSWER),
        }
        if report["faq"]["question_count"] != 1 or report["faq"]["answer_count"] != 1:
            raise RuntimeError(f"FAQ exact-copy count failed: {report['faq']}")

    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "authenticated-byte-equality.json").write_text(
        json.dumps(report, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )
    print(
        "PREVIEW_BYTES PASS files=13/13 status=200 nonblank=13/13 byte_equal=13/13 "
        "bogus=2/2:404 faq=1/1"
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as error:
        OUT.mkdir(parents=True, exist_ok=True)
        failure = {
            "schema": "maplemoon-certified-preview-byte-equality/v1",
            "preview_url": PREVIEW,
            "checked_at": datetime.now(UTC).isoformat().replace("+00:00", "Z"),
            "outcome": "FAIL",
            "error": str(error),
        }
        (OUT / "authenticated-byte-equality.json").write_text(
            json.dumps(failure, indent=2, sort_keys=True) + "\n", encoding="utf-8"
        )
        print(f"PREVIEW_BYTES FAIL {error}")
        raise SystemExit(1)
