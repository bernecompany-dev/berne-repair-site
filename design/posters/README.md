# Berne Repair — Vintage Wall Poster Set

Two coordinated print posters designed to hang side by side as one set:

| Poster | Size | Orientation | File base |
|---|---|---|---|
| **Plan of USA Takeover** | 36 × 24 in | landscape | `berne_usa_takeover_36x24_*` |
| **Serving Florida Since 2022** | 16 × 24 in | portrait | `berne_florida_service_16x24_*` |

Both canvases include **0.125 in bleed** on all sides (SVG canvas = 36.25 × 24.25 in
and 16.25 × 24.25 in) and keep all content ≥ 0.5 in inside the trim line.
1 SVG user unit = 0.01 in.

## Status

**Final — design approved.** Complete export set is in `exports/`:
editable SVG (live text), outlined SVG (all text as paths), print PDF at exact
physical size with 0.125 in bleed, hi-res PNG previews and the wall mockup.

## Build

```bash
npm install                        # us-atlas, topojson-client, d3-geo
node scripts/build-posters.mjs     # writes editable SVGs to exports/
node scripts/render-previews.mjs   # preview PNGs (Playwright + system Chromium)
node scripts/render-mockup.mjs     # berne_maps_wall_mockup.png
node scripts/export-print.mjs      # print PDFs (Chromium, exact size + bleed)
python3 scripts/pdf_to_outlined_svg.py  # outlined SVGs from the PDFs (PyMuPDF)
python3 scripts/export-raster-print.py  # 300dpi JPEGs for photo-print services
```

`render-previews.mjs --small-only` renders quick low-res QA copies (`exports/qa_*.png`).

## Outputs (exports/)

- `berne_*_editable.svg` — live text, embedded woff2 fonts (design source)
- `berne_*_outlined.svg` — every glyph converted to vector paths (no fonts needed)
- `berne_*_print.pdf` — exact physical size incl. 0.125 in bleed
  (36.25 × 24.25 in and 16.25 × 24.25 in), vector maps/type, embedded subset
  fonts, no crop marks (bleed-only, as most print shops prefer)
- `berne_*_300dpi.jpg` — flattened 300 dpi JPEG at the exact ordered size
  (10800 × 7200 px and 4800 × 7200 px, bleed trimmed) for consumer photo-print
  services like CVS/Walgreens that only accept raster uploads
- `berne_*_preview.png` — ≥ 3000 px long side, sRGB
- `berne_maps_wall_mockup.png` — both posters at true relative scale on a neutral wall

The paper grain is a seamless 3 × 3 in raster tile at 300 dpi
(`assets/textures/grain_tile.png`) so print files stay small; everything else
is vector.

## Map geometry sources (no hand-drawn / AI-generated geography)

- **US states** — `assets/maps/us_states_base.svg`: Wikimedia Commons
  "Blank US Map" lineage vector (the same 959 × 593 base used by
  *Map of USA with state names.svg*). Direct download from
  `commons.wikimedia.org` / `upload.wikimedia.org` is blocked by this build
  environment's egress policy, so the file was obtained from a public GitHub
  mirror (WebsiteBeaver/interactive-and-responsive-svg-map-of-us-states-capitals)
  and its geometry left untouched. State-name labels are set fresh as live
  vector text to match the poster typography.
- **Florida counties** — U.S. Census Bureau cartographic boundaries via the
  [`us-atlas`](https://www.npmjs.com/package/us-atlas) package
  (`counties-10m.json`, the same federal dataset Wikimedia's
  *Florida Counties with Names.svg* is traced from), filtered to FIPS 12 and
  projected with a transverse-Mercator projection (d3-geo). County borders come
  straight from the data; county-name labels are set as live vector text.
- **Cities** — the 12 service cities are plotted on both posters from published
  lat/lon coordinates as a separate vector layer; Tallahassee is marked with a
  capital star. The Florida poster carries 10 additional labelled cities
  (Pensacola, Panama City, Gainesville, Ocala, Daytona Beach, Melbourne,
  Port St. Lucie, Lakeland, Cape Coral, Key West). On the USA poster the service
  city labels fan out into the Gulf and the Atlantic on thin leader lines
  (positions derived by fitting an Albers-USA projection of Florida onto the
  base map's Florida outline).
- **Population dots (USA poster)** — every US city with population ≥ 50,000
  (971 dots) from GeoNames (`assets/data/us_cities_50k.json`, generated with the
  `geonamescache` PyPI package, CC BY 4.0). Each state's cities are placed with
  a per-state affine fit of the Albers-USA projection onto that state's outline
  in the base map, so dots never drift across state borders. All dots are label
  candidates via a greedy collision-avoiding labeler (8 positions per dot,
  population priority, ~300 names placed; majors ≥ 400k are laid down before
  dots become obstacles so a big-city name always outranks the dot texture).
  NYC boroughs / neighborhood pseudo-cities are excluded from labels.
  Ocean names (Pacific Ocean, Atlantic Ocean, Gulf of America) are set in
  letterspaced italic; the Florida poster carries Gulf of America and Atlantic
  Ocean as well.
- **Florida cities ≥ 15,000 (Florida poster)** — all 246 from GeoNames
  (`assets/data/fl_cities_15k.json`) as dots; names are placed with the same
  collision-avoiding labeler (population priority), so the Miami–West Palm
  corridor keeps only as many names as physically fit at print size.
- **Hydrography (Florida poster)** — lakes and rivers from Natural Earth 10m
  physical layers (`assets/data/fl_hydro.json`, public domain), clipped to the
  state outline, with modern names set in classic italic (St. Johns, Suwannee,
  Peace, Kissimmee, Caloosahatchee, Withlacoochee, Escambia, Choctawhatchee,
  Ochlockonee, St. Marys rivers; lakes Okeechobee, George, Kissimmee, Apopka,
  Istokpoga).

## Fonts (assets/fonts, all open licenses)

- **Libre Baskerville** (variable 400–700) — main titles
- **Oswald** (variable 200–700) — BERNE REPAIR, taglines, legend headers, city labels
- **Roboto Slab** (variable 100–900) — state/county labels, legend text
- Cormorant Garamond kept in assets as an alternative title face (unused)

Fonts are embedded in the editable SVGs as base64 woff2 `@font-face` (live text).
For final print exports the text will additionally be converted to outlines.

## Palette

`#E8E0D1` parchment · `#24231F` dark · `#45433D` linework · `#D8D2C5` base fill ·
`#C7A96B` accent (established/service areas) · `#C5BCAB` next-phase fill ·
`#A7A49C` secondary · `#807B70` future-target outline
