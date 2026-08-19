#!/usr/bin/env python3
"""Serve the static candidate with Vercel-style clean HTML routes."""

from __future__ import annotations

import argparse
import functools
import http.server
from pathlib import Path
from urllib.parse import urlsplit


class CleanRouteHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path: str) -> str:
        translated = Path(super().translate_path(path))
        request_path = urlsplit(path).path
        if request_path == "/":
            return str(Path(self.directory) / "homepage.html")
        if translated.is_file() or translated.suffix:
            return str(translated)
        html = translated.with_suffix(".html")
        if html.is_file():
            return str(html)
        return str(translated)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, required=True)
    parser.add_argument("--port", type=int, required=True)
    args = parser.parse_args()
    handler = functools.partial(
        CleanRouteHandler, directory=str(args.root.resolve())
    )
    server = http.server.ThreadingHTTPServer(
        ("127.0.0.1", args.port), handler
    )
    print(f"SERVING root={args.root.resolve()} port={args.port}", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
