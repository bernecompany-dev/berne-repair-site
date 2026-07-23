#!/usr/bin/env python3
"""Rasterize the print PDFs into 300 dpi JPEGs for consumer photo-print
services (CVS, Walgreens, etc.) that only accept raster files.

The 0.125 in bleed is trimmed off: these services print edge-to-edge at the
ordered size, so the file must be exactly 36x24 / 16x24 in.
"""
import pathlib

import fitz  # PyMuPDF

ROOT = pathlib.Path(__file__).resolve().parent.parent
EXPORTS = ROOT / "exports"
DPI = 300
# bleed offset aligned to whole output pixels so the crop is exactly w*DPI wide
BLEED_PX = round(0.125 * DPI)
BLEED_PT = BLEED_PX * 72 / DPI

JOBS = [
    ("berne_usa_takeover_36x24_print.pdf", "berne_usa_takeover_36x24_300dpi.jpg", 36, 24),
    ("berne_florida_service_16x24_print.pdf", "berne_florida_service_16x24_300dpi.jpg", 16, 24),
]

for pdf_name, jpg_name, w_in, h_in in JOBS:
    doc = fitz.open(EXPORTS / pdf_name)
    page = doc[0]
    clip = fitz.Rect(BLEED_PT, BLEED_PT, BLEED_PT + w_in * 72, BLEED_PT + h_in * 72)
    pix = page.get_pixmap(matrix=fitz.Matrix(DPI / 72, DPI / 72), clip=clip, colorspace=fitz.csRGB, alpha=False)
    pix.set_dpi(DPI, DPI)
    assert (pix.width, pix.height) == (w_in * DPI, h_in * DPI), (pix.width, pix.height)
    out = EXPORTS / jpg_name
    out.write_bytes(pix.tobytes("jpeg", jpg_quality=92))
    print(f"{jpg_name}: {pix.width}x{pix.height}px @ {DPI}dpi, {out.stat().st_size // (1024 * 1024)} MB")
    doc.close()
