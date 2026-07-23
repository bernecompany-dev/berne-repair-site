#!/usr/bin/env python3
"""Convert the print PDFs into outlined SVGs (all text as vector paths).

PyMuPDF renders each PDF page to SVG with text_as_path=True, which preserves
the exact glyph outlines (including kerning) of the approved print render.
"""
import pathlib
import re

import fitz  # PyMuPDF

ROOT = pathlib.Path(__file__).resolve().parent.parent
EXPORTS = ROOT / "exports"

JOBS = [
    ("berne_usa_takeover_36x24_print.pdf", "berne_usa_takeover_36x24_outlined.svg", 36.25, 24.25),
    ("berne_florida_service_16x24_print.pdf", "berne_florida_service_16x24_outlined.svg", 16.25, 24.25),
]

for pdf_name, svg_name, w_in, h_in in JOBS:
    doc = fitz.open(EXPORTS / pdf_name)
    page = doc[0]
    assert abs(page.rect.width - w_in * 72) < 1 and abs(page.rect.height - h_in * 72) < 1, (
        f"{pdf_name}: unexpected page size {page.rect}"
    )
    svg = page.get_svg_image(text_as_path=True)
    # Re-encode every embedded raster with PyMuPDF's PNG encoder. Chromium's
    # flattened background rasters otherwise carry random base64 runs that
    # GitHub push protection false-positives as access tokens.
    import base64

    def reencode(m):
        raw = base64.b64decode(m.group(1))
        pix = fitz.Pixmap(raw)
        return 'base64,' + base64.b64encode(pix.tobytes("png")).decode()

    svg = re.sub(r'base64,\s*([A-Za-z0-9+/=\s]+?)(?=")', lambda m: reencode(m), svg)
    # declare the physical size explicitly (PyMuPDF emits pt-based width/height)
    svg = re.sub(
        r'<svg([^>]*?)width="[^"]*" height="[^"]*"',
        f'<svg\\1width="{w_in}in" height="{h_in}in"',
        svg,
        count=1,
    )
    out = EXPORTS / svg_name
    out.write_text(svg)
    print(f"{svg_name}: {out.stat().st_size // 1024} KiB, page {page.rect.width / 72:.2f}x{page.rect.height / 72:.2f} in")
    doc.close()
