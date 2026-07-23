#!/usr/bin/env node
/**
 * Berne Repair — vintage wall poster set builder.
 *
 * Reproducibly generates two coordinated posters as editable SVG:
 *   1. USA  — "PLAN OF USA TAKEOVER"     36 × 24 in (landscape)
 *   2. FL   — "SERVING FLORIDA SINCE 2022" 16 × 24 in (portrait)
 *
 * Geometry sources (no hand-drawn / AI geography):
 *   - US states:  Wikimedia Commons "Blank US Map" lineage SVG (assets/maps/us_states_base.svg)
 *   - FL counties: U.S. Census Bureau via us-atlas (counties-10m.json), topojson-client, d3-geo
 *
 * Units: 1 SVG user unit = 0.01 inch.  Both canvases include 0.125 in bleed on all sides.
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import * as topojson from 'topojson-client';
import { geoTransverseMercator, geoAlbersUsa, geoPath } from 'd3-geo';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const EXPORTS = path.join(ROOT, 'exports');
fs.mkdirSync(EXPORTS, { recursive: true });

/* ---------------------------------------------------------------- tokens */

const C = {
  bg:      '#E8E0D1', // parchment
  dark:    '#24231F', // main dark (never pure black)
  line:    '#45433D', // map linework
  fill:    '#D8D2C5', // ordinary state/county fill
  accent:  '#C7A96B', // established / highlights
  accent2: '#A7A49C', // secondary
  phase:   '#C5BCAB', // "next phase" state fill (muted grey-brown)
  future:  '#807B70', // future targets outline
  paper2:  '#DED5C2', // slightly darker paper for plates
};

const BLEED = 12.5;          // 0.125 in
const USA = { W: 3625, H: 2425 };  // 36.25 × 24.25 in
const FLA = { W: 1625, H: 2425 };  // 16.25 × 24.25 in

/* ------------------------------------------------------------------ fonts */

function fontFace(family, file, weightRange, style = 'normal') {
  const b64 = fs.readFileSync(path.join(ROOT, 'assets/fonts', file)).toString('base64');
  return `@font-face{font-family:'${family}';font-style:${style};font-weight:${weightRange};` +
         `src:url(data:font/woff2;base64,${b64}) format('woff2');}`;
}
const FONT_CSS = [
  fontFace('Libre Baskerville', 'LibreBaskerville-var.woff2', '400 700'),
  fontFace('Oswald', 'Oswald-var.woff2', '200 700'),
  fontFace('Roboto Slab', 'RobotoSlab-var.woff2', '100 900'),
].join('\n');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function text(x, y, str, { f = 'Roboto Slab', w = 400, s = 20, ls = 0, fill = C.dark, anchor = 'middle', opacity = 1, halo = 0 } = {}) {
  return `<text x="${r2(x)}" y="${r2(y)}" font-family="${f}" font-weight="${w}" font-size="${s}"` +
    (ls ? ` letter-spacing="${ls}"` : '') +
    (halo ? ` paint-order="stroke" stroke="${C.bg}" stroke-width="${halo}" stroke-linejoin="round"` : '') +
    ` fill="${fill}"${opacity !== 1 ? ` opacity="${opacity}"` : ''} text-anchor="${anchor}">${esc(str)}</text>`;
}
const r2 = (n) => Math.round(n * 100) / 100;

/* ------------------------------------------------------- shared decoration */

/** Corner ornament drawn for the top-left corner of an inner rect; reused via transforms. */
function cornerOrnament() {
  // Restrained line-work fleuron: stepped L lines, quarter arc, diamond, dot.
  return `<g class="corner-orn" stroke="${C.line}" fill="none" stroke-width="1.6">
    <path d="M 0 46 L 0 12 Q 0 0 12 0 L 46 0"/>
    <path d="M 0 74 L 0 30" stroke-width="1.1"/>
    <path d="M 74 0 L 30 0" stroke-width="1.1"/>
    <path d="M 10 32 Q 10 10 32 10" stroke-width="1.1"/>
    <path d="M 21 21 l 7 -7 7 7 -7 7 z" fill="${C.accent}" stroke="${C.line}" stroke-width="1"/>
    <circle cx="10" cy="46" r="2.1" fill="${C.line}" stroke="none"/>
    <circle cx="46" cy="10" r="2.1" fill="${C.line}" stroke="none"/>
  </g>`;
}

/** Small centered ornament for the middle of top / bottom frame edges. */
function edgeOrnament(cx, cy, flip = false) {
  const s = flip ? -1 : 1;
  return `<g stroke="${C.line}" fill="none" stroke-width="1.2">
    <path d="M ${cx - 120} ${cy} H ${cx - 26}"/>
    <path d="M ${cx + 26} ${cy} H ${cx + 120}"/>
    <path d="M ${cx - 9} ${cy} l 9 ${-8 * s} 9 ${8 * s} -9 ${8 * s} z" fill="${C.accent}" stroke="${C.line}" stroke-width="1"/>
    <circle cx="${cx - 132}" cy="${cy}" r="1.8" fill="${C.line}" stroke="none"/>
    <circle cx="${cx + 132}" cy="${cy}" r="1.8" fill="${C.line}" stroke="none"/>
  </g>`;
}

/**
 * Identical frame system for both posters (absolute line weights & insets).
 *  outer thin line at 70 units from canvas edge, inner double line at 92 / 100.
 */
function frame(W, H, { bottomPlate = null } = {}) {
  const o = 70, i1 = 92, i2 = 100;
  let g = `<g class="frame" fill="none">
    <rect x="${o}" y="${o}" width="${W - 2 * o}" height="${H - 2 * o}" stroke="${C.line}" stroke-width="1.6"/>
    <rect x="${i1}" y="${i1}" width="${W - 2 * i1}" height="${H - 2 * i1}" stroke="${C.line}" stroke-width="3"/>
    <rect x="${i2}" y="${i2}" width="${W - 2 * i2}" height="${H - 2 * i2}" stroke="${C.line}" stroke-width="1"/>`;
  // corner ornaments sit just inside the double line
  const c = i2 + 8;
  g += `<g transform="translate(${c} ${c})">${cornerOrnament()}</g>`;
  g += `<g transform="translate(${W - c} ${c}) scale(-1 1)">${cornerOrnament()}</g>`;
  g += `<g transform="translate(${c} ${H - c}) scale(1 -1)">${cornerOrnament()}</g>`;
  g += `<g transform="translate(${W - c} ${H - c}) scale(-1 -1)">${cornerOrnament()}</g>`;
  g += edgeOrnament(W / 2, o, false);
  if (!bottomPlate) g += edgeOrnament(W / 2, H - o, true);
  g += `</g>`;
  if (bottomPlate) {
    const pw = bottomPlate.width, ph = 66, cx = W / 2, cy = H - i2 + 4;
    g += `<g class="bottom-plate">
      <rect x="${cx - pw / 2}" y="${cy - ph / 2}" width="${pw}" height="${ph}" fill="${C.bg}" stroke="${C.line}" stroke-width="1.4"/>
      <rect x="${cx - pw / 2 + 6}" y="${cy - ph / 2 + 6}" width="${pw - 12}" height="${ph - 12}" fill="none" stroke="${C.line}" stroke-width="0.8"/>
      ${text(cx, cy + 8, bottomPlate.label, { f: 'Oswald', w: 500, s: 26, ls: 5, fill: C.dark })}
      <path d="M ${cx - pw / 2 - 46} ${cy} h 30 M ${cx + pw / 2 + 16} ${cy} h 30" stroke="${C.line}" stroke-width="1.2"/>
    </g>`;
  }
  return g;
}

/* ------------------------------------------------------------- background */

function backgroundDefs(idp) {
  return `
  <filter id="${idp}-grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" seed="7" stitchTiles="stitch"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.18  0 0 0 0 0.16  0 0 0 0 0.12  0 0 0 0.045 0"/>
  </filter>
  <radialGradient id="${idp}-vig" cx="50%" cy="48%" r="72%">
    <stop offset="70%" stop-color="#B9AD93" stop-opacity="0"/>
    <stop offset="100%" stop-color="#B9AD93" stop-opacity="0.16"/>
  </radialGradient>
  <radialGradient id="${idp}-blot" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#C9BC9F" stop-opacity="0.10"/>
    <stop offset="100%" stop-color="#C9BC9F" stop-opacity="0"/>
  </radialGradient>`;
}

function background(W, H, idp) {
  return `<rect width="${W}" height="${H}" fill="${C.bg}"/>
  <ellipse cx="${W * 0.24}" cy="${H * 0.3}" rx="${W * 0.3}" ry="${H * 0.28}" fill="url(#${idp}-blot)"/>
  <ellipse cx="${W * 0.78}" cy="${H * 0.68}" rx="${W * 0.32}" ry="${H * 0.3}" fill="url(#${idp}-blot)"/>
  <ellipse cx="${W * 0.5}" cy="${H * 0.9}" rx="${W * 0.4}" ry="${H * 0.2}" fill="url(#${idp}-blot)"/>
  <rect width="${W}" height="${H}" fill="url(#${idp}-vig)"/>`;
}
// grain goes on top of everything, very light
const grainOverlay = (W, H, idp) => `<rect width="${W}" height="${H}" filter="url(#${idp}-grain)" opacity="0.9"/>`;

/* ----------------------------------------------------------------- header */

function brandBlock(cx, y, { ruleHalf = 260, brandSize = 56, tagSize = 26 } = {}) {
  // BERNE REPAIR flanked by thin rules, tagline underneath
  const gap = brandSize * 3.2;
  return `<g>
    <path d="M ${cx - ruleHalf - gap / 2} ${y - brandSize * 0.32} h ${ruleHalf} M ${cx + gap / 2} ${y - brandSize * 0.32} h ${ruleHalf}"
          stroke="${C.line}" stroke-width="1.4"/>
    <circle cx="${cx - ruleHalf - gap / 2 - 10}" cy="${y - brandSize * 0.32}" r="2.4" fill="${C.line}"/>
    <circle cx="${cx + ruleHalf + gap / 2 + 10}" cy="${y - brandSize * 0.32}" r="2.4" fill="${C.line}"/>
    ${text(cx, y, 'BERNE REPAIR', { f: 'Oswald', w: 500, s: brandSize, ls: brandSize * 0.32, fill: C.dark })}
    ${text(cx, y + brandSize * 0.95, 'BUILT ON QUALITY. DRIVEN BY TRUST.', { f: 'Roboto Slab', w: 400, s: tagSize, ls: tagSize * 0.28, fill: C.line })}
  </g>`;
}

/* ----------------------------------------------------------- compass rose */

function compassRose(cx, cy, R) {
  const pt = (a, r) => `${r2(cx + r * Math.sin(a))} ${r2(cy - r * Math.cos(a))}`;
  let g = `<g class="compass">`;
  g += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.line}" stroke-width="1.2"/>`;
  g += `<circle cx="${cx}" cy="${cy}" r="${R * 0.82}" fill="none" stroke="${C.line}" stroke-width="0.7"/>`;
  g += `<circle cx="${cx}" cy="${cy}" r="${R * 0.1}" fill="${C.bg}" stroke="${C.line}" stroke-width="1"/>`;
  // 8 minor rays
  for (let k = 0; k < 8; k++) {
    const a = (k * Math.PI) / 4 + Math.PI / 8;
    g += `<path d="M ${pt(a, R * 0.08)} L ${pt(a, R * 0.62)}" stroke="${C.accent2}" stroke-width="1.1"/>`;
  }
  // 4 diagonal points
  for (let k = 0; k < 4; k++) {
    const a = (k * Math.PI) / 2 + Math.PI / 4;
    g += `<path d="M ${pt(a, R * 0.55)} L ${pt(a + 0.16, R * 0.12)} L ${pt(a - 0.16, R * 0.12)} Z" fill="${C.accent2}" stroke="${C.line}" stroke-width="0.7"/>`;
  }
  // 4 cardinal points, two-tone
  for (let k = 0; k < 4; k++) {
    const a = (k * Math.PI) / 2;
    g += `<path d="M ${pt(a, R * 0.78)} L ${pt(a + 0.13, R * 0.13)} L ${pt(a, R * 0.2)} Z" fill="${C.accent}" stroke="${C.line}" stroke-width="0.7"/>`;
    g += `<path d="M ${pt(a, R * 0.78)} L ${pt(a - 0.13, R * 0.13)} L ${pt(a, R * 0.2)} Z" fill="${C.bg}" stroke="${C.line}" stroke-width="0.7"/>`;
  }
  const L = R * 1.16;
  g += text(cx, cy - L + 7, 'N', { f: 'Roboto Slab', w: 600, s: 24, fill: C.line });
  g += text(cx + L, cy + 8, 'E', { f: 'Roboto Slab', w: 500, s: 20, fill: C.line });
  g += text(cx, cy + L + 13, 'S', { f: 'Roboto Slab', w: 500, s: 20, fill: C.line });
  g += text(cx - L, cy + 8, 'W', { f: 'Roboto Slab', w: 500, s: 20, fill: C.line });
  g += `</g>`;
  return g;
}

/* -------------------------------------------------------- crossed wrenches */

function crossedWrenches(cx, cy, s) {
  // simple open-end + ring wrench silhouette, drawn along the y axis, length 100 units before scaling
  const wrench = `M -7 -50 A 16 16 0 0 1 7 -50 L 10 -42 A 12 12 0 0 0 -10 -42 Z
    M -6 -41 a 12 12 0 0 0 12 0 L 4.5 34 a 10.5 10.5 0 0 1 5 8 a 10 10 0 1 1 -19 0 a 10.5 10.5 0 0 1 5 -8 Z
    M 0 40 m -4.6 0 a 4.6 4.6 0 1 0 9.2 0 a 4.6 4.6 0 1 0 -9.2 0`;
  return `<g transform="translate(${cx} ${cy})" fill="${C.line}" fill-rule="evenodd">
    <g transform="rotate(45) scale(${s})"><path d="${wrench}"/></g>
    <g transform="rotate(-45) scale(${s})"><path d="${wrench}"/></g>
  </g>`;
}

/* ==================================================================== USA */

function parsePathPoints(d) {
  const tokens = d.match(/[a-zA-Z]|[-+]?\d*\.?\d+(?:e[-+]?\d+)?/gi) || [];
  let i = 0, cmd = '', x = 0, y = 0, sx = 0, sy = 0;
  const pts = [];
  const num = () => parseFloat(tokens[i++]);
  while (i < tokens.length) {
    if (/^[a-zA-Z]$/.test(tokens[i])) {
      cmd = tokens[i++];
      if (cmd === 'z' || cmd === 'Z') { x = sx; y = sy; continue; }
    }
    switch (cmd) {
      case 'M': x = num(); y = num(); sx = x; sy = y; cmd = 'L'; break;
      case 'm': x += num(); y += num(); sx = x; sy = y; cmd = 'l'; break;
      case 'L': x = num(); y = num(); break;
      case 'l': x += num(); y += num(); break;
      case 'H': x = num(); break;
      case 'h': x += num(); break;
      case 'V': y = num(); break;
      case 'v': y += num(); break;
      case 'C': num(); num(); num(); num(); x = num(); y = num(); break;
      case 'c': num(); num(); num(); num(); x += num(); y += num(); break;
      case 'S': case 'Q': num(); num(); x = num(); y = num(); break;
      case 's': case 'q': num(); num(); x += num(); y += num(); break;
      case 'T': x = num(); y = num(); break;
      case 't': x += num(); y += num(); break;
      case 'A': num(); num(); num(); num(); num(); x = num(); y = num(); break;
      case 'a': num(); num(); num(); num(); num(); x += num(); y += num(); break;
      default: i++; continue;
    }
    pts.push([x, y]);
  }
  return pts;
}

function loadStates() {
  const svg = fs.readFileSync(path.join(ROOT, 'assets/maps/us_states_base.svg'), 'utf8');
  const states = {};
  const re = /<path id="([A-Z]{2})"[^>]*?\sd="([^"]+)"/g;
  let m;
  while ((m = re.exec(svg))) {
    const pts = parsePathPoints(m[2]);
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    states[m[1]] = {
      d: m[2],
      bbox: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)],
    };
  }
  return states;
}

const STATE_NAMES = {
  AL: 'ALABAMA', AK: 'ALASKA', AZ: 'ARIZONA', AR: 'ARKANSAS', CA: 'CALIFORNIA', CO: 'COLORADO',
  CT: 'CONNECTICUT', DE: 'DELAWARE', FL: 'FLORIDA', GA: 'GEORGIA', HI: 'HAWAII', ID: 'IDAHO',
  IL: 'ILLINOIS', IN: 'INDIANA', IA: 'IOWA', KS: 'KANSAS', KY: 'KENTUCKY', LA: 'LOUISIANA',
  ME: 'MAINE', MD: 'MARYLAND', MA: 'MASSACHUSETTS', MI: 'MICHIGAN', MN: 'MINNESOTA', MS: 'MISSISSIPPI',
  MO: 'MISSOURI', MT: 'MONTANA', NE: 'NEBRASKA', NV: 'NEVADA', NH: 'NEW HAMPSHIRE', NJ: 'NEW JERSEY',
  NM: 'NEW MEXICO', NY: 'NEW YORK', NC: 'NORTH CAROLINA', ND: 'NORTH DAKOTA', OH: 'OHIO', OK: 'OKLAHOMA',
  OR: 'OREGON', PA: 'PENNSYLVANIA', RI: 'RHODE ISLAND', SC: 'SOUTH CAROLINA', SD: 'SOUTH DAKOTA',
  TN: 'TENNESSEE', TX: 'TEXAS', UT: 'UTAH', VT: 'VERMONT', VA: 'VIRGINIA', WA: 'WASHINGTON',
  WI: 'WISCONSIN', WV: 'WEST VIRGINIA', WY: 'WYOMING',
};

// label placement tweaks in source-map coordinates (dx, dy from bbox centre)
const LABEL_OFFSET = {
  MI: [16, 52], LA: [-14, 4], FL: [30, 12], ID: [-2, 30], MN: [-8, 10], CA: [-10, -14],
  TX: [4, -8], VA: [12, 0], WV: [-5, 8], NY: [-4, -2], KY: [4, 4], TN: [0, 2], MO: [0, 4],
  OK: [10, -4], SC: [4, -2], NC: [8, -4], AR: [-2, 2], IL: [-4, 8], AK: [-12, 24], WA: [4, 8],
  ME: [4, 8], AZ: [0, 6], NV: [0, -8], MT: [0, 4], NM: [0, 2], GA: [0, 4], AL: [0, 2], MS: [0, 2],
};
// states labelled in the ocean with leader lines (order top→bottom on the seaboard)
const LEADER_STATES = ['VT', 'NH', 'MA', 'RI', 'CT', 'NJ', 'DE', 'MD'];
// per-state font-size tiers (poster units); default 25
const LABEL_SIZE = {
  RI: 21, CT: 21, DE: 21, NJ: 21, MD: 21, MA: 21, NH: 21, VT: 21, HI: 22, WV: 21, VT2: 21,
  KY: 23, TN: 23, SC: 22, IN: 23, OH: 24, PA: 24, VA: 23, NC: 23, LA: 23, MS: 22, AL: 22,
  ME: 22, WI: 24, IL: 24, GA: 23, AR: 23, MO: 24, IA: 24, OK: 23, FL: 24, NY: 24, MI: 23, WA: 23, OR: 24, ID: 22,
  MS: 18,
};

function buildUsaPoster() {
  const { W, H } = USA;
  const idp = 'usa';
  const states = loadStates();

  // ---- map transform: source viewBox is x 174..1133, y 100..693 (959 × 593)
  const s = 2.72;
  const mw = 959 * s, mh = 593 * s;
  const x0 = (W - mw) / 2, y0 = 550;
  const M = ([px, py]) => [x0 + (px - 174) * s, y0 + (py - 100) * s];

  const PHASE_STATES = new Set(['GA', 'AL', 'SC']);

  let mapPaths = `<g transform="translate(${r2(x0 - 174 * s)} ${r2(y0 - 100 * s)}) scale(${s})" stroke="${C.line}" stroke-width="${r2(1.6 / s)}" stroke-linejoin="round">`;
  for (const [id, st] of Object.entries(states)) {
    const fill = id === 'FL' ? C.accent : PHASE_STATES.has(id) ? C.phase : C.fill;
    mapPaths += `<path id="us-${id}" d="${st.d}" fill="${fill}"${id === 'FL' ? ` stroke-width="${r2(2.4 / s)}"` : ''}/>`;
  }
  mapPaths += `</g>`;

  // ---- state labels (poster coordinate space, absolute font sizes)
  let labels = `<g class="state-labels">`;
  const leaderPos = {};
  // stack leader labels along the Atlantic, top → bottom
  const mapRight = x0 + mw;
  LEADER_STATES.forEach((id) => {
    const b = states[id].bbox;
    leaderPos[id] = { anchor: M([(b[0] + b[2]) / 2, (b[1] + b[3]) / 2]) };
  });
  const sorted = [...LEADER_STATES].sort((a, b) => leaderPos[a].anchor[1] - leaderPos[b].anchor[1]);
  let ly = leaderPos[sorted[0]].anchor[1] - 60;
  sorted.forEach((id) => {
    ly = Math.max(ly + 46, leaderPos[id].anchor[1] - 40);
    leaderPos[id].label = [mapRight + 46, ly];
  });
  for (const [id, st] of Object.entries(states)) {
    if (id === 'FL') continue; // placed later, between the city columns
    const name = STATE_NAMES[id];
    const size = LABEL_SIZE[id] || 25;
    if (LEADER_STATES.includes(id)) {
      const { anchor, label } = leaderPos[id];
      labels += `<path d="M ${r2(anchor[0])} ${r2(anchor[1])} L ${r2(label[0] - 12)} ${r2(label[1] - 6)}" stroke="${C.line}" stroke-width="1" fill="none" opacity="0.85"/>`;
      labels += text(label[0], label[1], name, { f: 'Roboto Slab', w: 500, s: size, ls: 1.5, fill: C.dark, anchor: 'start', halo: 3 });
      continue;
    }
    const b = st.bbox;
    const off = LABEL_OFFSET[id] || [0, 0];
    const [lx, lyy] = M([(b[0] + b[2]) / 2 + off[0], (b[1] + b[3]) / 2 + off[1]]);
    const two = name.includes(' ') && !['NEW YORK'].includes(name) && ['NORTH DAKOTA', 'SOUTH DAKOTA', 'NEW MEXICO', 'NORTH CAROLINA', 'SOUTH CAROLINA', 'WEST VIRGINIA', 'NEW HAMPSHIRE', 'RHODE ISLAND'].includes(name);
    if (two) {
      const [a, bword] = name.split(' ');
      labels += text(lx, lyy - size * 0.55, a, { f: 'Roboto Slab', w: 500, s: size, ls: 1.5, fill: C.dark, halo: 3 });
      labels += text(lx, lyy + size * 0.65, bword, { f: 'Roboto Slab', w: 500, s: size, ls: 1.5, fill: C.dark, halo: 3 });
    } else {
      labels += text(lx, lyy, name, { f: 'Roboto Slab', w: 500, s: size, ls: 1.5, fill: C.dark, halo: 3 });
    }
  }
  labels += `</g>`;

  // ---- Florida cities layer (same 12 cities as the Florida poster).
  // Dot positions: project city lat/lon with Albers USA, then fit the projected
  // Florida bounds onto this map's Florida path bounds (per-axis affine).
  const topoStates = JSON.parse(fs.readFileSync(path.join(ROOT, 'node_modules/us-atlas/states-10m.json'), 'utf8'));
  const flFeature = topojson.feature(topoStates, topoStates.objects.states).features.find((f) => f.id === '12');
  const alb = geoAlbersUsa();
  const [[ax0, ay0], [ax1, ay1]] = geoPath(alb).bounds(flFeature);
  const fb = states.FL.bbox;
  const [p0x, p0y] = M([fb[0], fb[1]]), [p1x, p1y] = M([fb[2], fb[3]]);
  const cityDot = (ll) => {
    const [ax, ay] = alb(ll);
    return [p0x + ((ax - ax0) / (ax1 - ax0)) * (p1x - p0x), p0y + ((ay - ay0) / (ay1 - ay0)) * (p1y - p0y)];
  };
  const dots = Object.fromEntries(CITIES.map((c) => [c.n, cityDot(c.ll)]));

  // labels fan out into the Gulf (left column) and the Atlantic (right column)
  const stagger = (list, minGap) => {
    let y = -Infinity;
    return list.map(([name, dy]) => {
      y = Math.max(y + minGap, dots[name][1] + (dy || 0));
      return [name, y];
    });
  };
  const gulfCol = stagger([['Tampa', -10], ['St. Petersburg', 8], ['Sarasota', 6], ['Fort Myers', 4], ['Naples', 4]], 30);
  const atlCol = stagger([['Orlando', -6], ['West Palm Beach', -4], ['Boca Raton', 0], ['Fort Lauderdale', 0], ['Miami', 4]], 30);
  const gulfX = Math.min(...gulfCol.map(([n]) => dots[n][0])) - 52;
  const atlX = p1x + 26;

  let usCities = `<g class="fl-cities">`;
  for (const c of CITIES) {
    const [dx, dy] = dots[c.n];
    if (c.capital) {
      const st = Array.from({ length: 10 }, (_, k) => {
        const a = (k * Math.PI) / 5 - Math.PI / 2, rr = k % 2 ? 4.5 : 10;
        return `${r2(dx + rr * Math.cos(a))},${r2(dy + rr * Math.sin(a))}`;
      }).join(' ');
      usCities += `<polygon points="${st}" fill="${C.dark}" stroke="${C.bg}" stroke-width="1.2"/>`;
      usCities += text(dx - 4, dy + 40, 'TALLAHASSEE', { f: 'Oswald', w: 500, s: 14, ls: 1, fill: C.dark });
      usCities += `<path d="M ${r2(dx)} ${r2(dy + 12)} L ${r2(dx - 3)} ${r2(dy + 27)}" stroke="${C.line}" stroke-width="0.9" fill="none"/>`;
      continue;
    }
    usCities += `<circle cx="${r2(dx)}" cy="${r2(dy)}" r="5.2" fill="${C.dark}" stroke="${C.bg}" stroke-width="1.6"/>`;
  }
  const col = (entries, colX, anchor) => {
    for (const [name, ly] of entries) {
      const [dx, dy] = dots[name];
      const tx = anchor === 'start' ? colX : colX;
      const lineEnd = anchor === 'start' ? colX - 8 : colX + 8;
      usCities += `<path d="M ${r2(dx + (anchor === 'start' ? 7 : -7))} ${r2(dy)} L ${r2(lineEnd)} ${r2(ly - 5)}" stroke="${C.line}" stroke-width="0.9" fill="none" opacity="0.8"/>`;
      usCities += text(tx, ly, name.toUpperCase(), { f: 'Oswald', w: 500, s: 14, ls: 1, fill: C.dark, anchor });
    }
  };
  col(gulfCol, gulfX, 'end');
  col(atlCol, atlX, 'start');
  // Jacksonville: label straight east of its dot
  {
    const [dx, dy] = dots['Jacksonville'];
    usCities += text(dx + 16, dy - 2, 'JACKSONVILLE', { f: 'Oswald', w: 500, s: 14, ls: 1, fill: C.dark, anchor: 'start' });
  }
  // FLORIDA state name in the free interior strip between the two city columns
  usCities += text(
    (dots['Fort Myers'][0] + dots['Boca Raton'][0]) / 2 + 2,
    dots['Boca Raton'][1] - 20,
    'FLORIDA', { f: 'Roboto Slab', w: 500, s: 18, ls: 1, fill: C.dark, halo: 3 });
  usCities += `</g>`;

  // ---- all US cities with population >= 50,000 as small target dots.
  // Each state's cities are placed with that state's own Albers→base-map fit
  // so no dot drifts across a state border.
  const cityData = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets/data/us_cities_50k.json'), 'utf8')).cities;
  const FIPS2POST = {
    '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA', '08': 'CO', '09': 'CT', '10': 'DE',
    '11': 'DC', '12': 'FL', '13': 'GA', '15': 'HI', '16': 'ID', '17': 'IL', '18': 'IN', '19': 'IA',
    '20': 'KS', '21': 'KY', '22': 'LA', '23': 'ME', '24': 'MD', '25': 'MA', '26': 'MI', '27': 'MN',
    '28': 'MS', '29': 'MO', '30': 'MT', '31': 'NE', '32': 'NV', '33': 'NH', '34': 'NJ', '35': 'NM',
    '36': 'NY', '37': 'NC', '38': 'ND', '39': 'OH', '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI',
    '45': 'SC', '46': 'SD', '47': 'TN', '48': 'TX', '49': 'UT', '50': 'VT', '51': 'VA', '53': 'WA',
    '54': 'WV', '55': 'WI', '56': 'WY',
  };
  const albPath = geoPath(alb);
  const stTransform = {};
  for (const f of topojson.feature(topoStates, topoStates.objects.states).features) {
    const post = FIPS2POST[f.id];
    if (!post || !states[post]) continue;
    const [[bx0, by0], [bx1, by1]] = albPath.bounds(f);
    const sb = states[post].bbox;
    const [q0x, q0y] = M([sb[0], sb[1]]), [q1x, q1y] = M([sb[2], sb[3]]);
    stTransform[post] = ([px, py]) =>
      [q0x + ((px - bx0) / (bx1 - bx0)) * (q1x - q0x), q0y + ((py - by0) / (by1 - by0)) * (q1y - q0y)];
  }
  stTransform.DC = stTransform.MD; // DC sits inside Maryland's bbox
  let cityDots = `<g class="city-dots" fill="${C.line}" fill-opacity="0.5">`;
  let dotCount = 0;
  for (const c of cityData) {
    const tf = stTransform[c.st];
    if (!tf) continue;
    const p = alb([c.lon, c.lat]);
    if (!p) continue;
    const [ddx, ddy] = tf(p);
    cityDots += `<circle cx="${r2(ddx)}" cy="${r2(ddy)}" r="2.4"/>`;
    dotCount++;
  }
  cityDots += `</g>`;
  console.log(`USA: ${dotCount} population dots`);

  // ---- header
  const cx = W / 2;
  const header = `<g class="header">
    ${text(cx, 310, 'PLAN OF USA TAKEOVER', { f: 'Libre Baskerville', w: 700, s: 128, ls: 10, fill: C.dark })}
    ${brandBlock(cx, 448, { ruleHalf: 300, brandSize: 54, tagSize: 25 })}
  </g>`;

  // ---- legend strip under the map
  const legY = 2258;
  const item = (x, swatch, label, value) => `
    ${swatch}
    ${text(x + 44, legY + 8, label, { f: 'Oswald', w: 500, s: 25, ls: 3, fill: C.dark, anchor: 'start' })}
    ${value ? text(x + 44 + label.length * 17 + 26, legY + 8, '— ' + value, { f: 'Roboto Slab', w: 400, s: 22, fill: C.line, anchor: 'start' }) : ''}`;

  const sw = (x, fill, dashed = false) =>
    `<rect x="${x}" y="${legY - 14}" width="26" height="26" fill="${dashed ? 'none' : fill}" stroke="${dashed ? C.future : C.line}" stroke-width="${dashed ? 1.6 : 1.2}"${dashed ? ' stroke-dasharray="5 4"' : ''}/>`;

  const legend = `<g class="legend">
    ${text(310, legY + 8, 'LEGEND', { f: 'Oswald', w: 600, s: 26, ls: 6, fill: C.dark, anchor: 'start' })}
    <path d="M 310 ${legY + 24} h 132" stroke="${C.accent}" stroke-width="2"/>
    ${item(540, sw(540, C.accent), 'ESTABLISHED', 'SERVING FLORIDA SINCE 2022')}
    ${item(1560, sw(1560, C.phase), 'NEXT PHASE', 'EXPANSION')}
    ${item(2160, sw(2160, null, true), 'FUTURE TARGETS', '')}
    <circle cx="2760" cy="${legY - 1}" r="4.5" fill="${C.line}" fill-opacity="0.75"/>
    ${text(2790, legY + 8, 'CITIES 50,000+', { f: 'Oswald', w: 500, s: 25, ls: 3, fill: C.dark, anchor: 'start' })}
  </g>`;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="36.25in" height="24.25in" viewBox="0 0 ${W} ${H}">
  <title>Berne Repair — Plan of USA Takeover — 36×24 vintage map poster</title>
  <defs>${backgroundDefs(idp)}<style>${FONT_CSS}</style></defs>
  ${background(W, H, idp)}
  ${header}
  ${mapPaths}
  ${cityDots}
  ${labels}
  ${usCities}
  ${compassRose(3255, 1560, 128)}
  ${legend}
  ${frame(W, H, { bottomPlate: { label: 'SERVING FLORIDA SINCE 2022', width: 760 } })}
  ${grainOverlay(W, H, idp)}
</svg>`;
  fs.writeFileSync(path.join(EXPORTS, 'berne_usa_takeover_36x24_editable.svg'), svg);
  console.log('USA poster written');
}

/* ================================================================ FLORIDA */

const CITIES = [
  { n: 'Miami',            ll: [-80.1918, 25.7617], side: 'E' },
  { n: 'Fort Lauderdale',  ll: [-80.1373, 26.1224], side: 'E' },
  { n: 'Boca Raton',       ll: [-80.1289, 26.3683], side: 'E' },
  { n: 'West Palm Beach',  ll: [-80.0534, 26.7153], side: 'E' },
  { n: 'Naples',           ll: [-81.7948, 26.1420], side: 'W' },
  { n: 'Fort Myers',       ll: [-81.8723, 26.6406], side: 'W' },
  { n: 'Sarasota',         ll: [-82.5307, 27.3364], side: 'W' },
  { n: 'Tampa',            ll: [-82.4572, 27.9506], side: 'N', dy: -4 },
  { n: 'St. Petersburg',   ll: [-82.6403, 27.7676], side: 'W', dy: 8 },
  { n: 'Orlando',          ll: [-81.3792, 28.5383], side: 'E', dx: 18, dy: 2 },
  { n: 'Jacksonville',     ll: [-81.6557, 30.3322], side: 'E', dx: 18, dy: -14 },
  { n: 'Tallahassee',      ll: [-84.2807, 30.4383], side: 'N', dy: -16, capital: true },
];

// additional cities shown only on the Florida poster
const CITIES_EXTRA = [
  { n: 'Pensacola',        ll: [-87.2169, 30.4213], side: 'S', dy: 6 },
  { n: 'Panama City',      ll: [-85.6602, 30.1588], side: 'S', dy: 4 },
  { n: 'Gainesville',      ll: [-82.3248, 29.6516], side: 'E', dx: 10, dy: -10 },
  { n: 'Ocala',            ll: [-82.1401, 29.1872], side: 'E', dx: 10, dy: -6 },
  { n: 'Daytona Beach',    ll: [-81.0228, 29.2108], side: 'E' },
  { n: 'Melbourne',        ll: [-80.6081, 28.0836], side: 'E' },
  { n: 'Port St. Lucie',   ll: [-80.3582, 27.2730], side: 'E' },
  { n: 'Lakeland',         ll: [-81.9498, 28.0395], side: 'N', dy: 2 },
  { n: 'Cape Coral',       ll: [-81.9495, 26.5629], side: 'W', dy: 16 },
  { n: 'Key West',         ll: [-81.7800, 24.5551], side: 'W', dy: 2 },
];

const ZONES = {
  south:  ['12086', '12011', '12099'],           // Miami-Dade, Broward, Palm Beach
  tampa:  ['12057', '12103', '12101'],           // Hillsborough, Pinellas, Pasco
  naples: ['12021', '12071'],                    // Collier, Lee
};

// county label size / offset tweaks (poster units), keyed by county name.
// Panhandle counties are narrow — labels are staggered up/down to avoid collisions.
const COUNTY_TWEAK = {
  'Escambia':    { s: 12, dx: -2, dy: -10 },
  'Santa Rosa':  { s: 11, dy: 22 },
  'Okaloosa':    { s: 12, dy: -16 },
  'Walton':      { s: 12, dy: 16 },
  'Holmes':      { s: 11, dy: -14 },
  'Washington':  { s: 11, dy: 10 },
  'Bay':         { s: 13, dy: 4 },
  'Jackson':     { s: 13, dy: -8 },
  'Calhoun':     { s: 12 },
  'Gulf':        { s: 12, dx: 4, dy: 6 },
  'Liberty':     { s: 12 },
  'Franklin':    { s: 12, dx: 10, dy: 8 },
  'Gadsden':     { s: 12, dx: -8, dy: -12 },
  'Leon':        { s: 13, dx: 6, dy: 18 },
  'Wakulla':     { s: 12, dy: 6 },
  'Jefferson':   { s: 11, dy: 18 },
  'Madison':     { s: 12, dy: -10 },
  'Taylor':      { s: 13 },
  'Hamilton':    { s: 11 },
  'Suwannee':    { s: 12, dy: -4 },
  'Lafayette':   { s: 12 },
  'Columbia':    { s: 12, dy: 10 },
  'Baker':       { s: 12 },
  'Union':       { s: 10 },
  'Bradford':    { s: 10, dy: 4 },
  'Nassau':      { s: 12 },
  'Duval':       { s: 13, dx: -12, dy: 16 },
  'Clay':        { s: 12 },
  'St. Johns':   { s: 12 },
  'Putnam':      { s: 13 },
  'Flagler':     { s: 12 },
  'Alachua':     { s: 13, dx: -18, dy: 20 },
  'Gilchrist':   { s: 10 },
  'Dixie':       { s: 12 },
  'Levy':        { s: 13 },
  'Marion':      { s: 14, dx: -10, dy: 22 },
  'Volusia':     { s: 14 },
  'Lake':        { s: 13, dy: 10 },
  'Seminole':    { s: 11, dx: -8 },
  'Orange':      { s: 14, dy: 18 },
  'Osceola':     { s: 14 },
  'Brevard':     { s: 13 },
  'Polk':        { s: 15 },
  'Hillsborough':{ s: 13, dx: 8, dy: 18 },
  'Pinellas':    { s: 11, dx: -4, dy: 12 },
  'Pasco':       { s: 13 },
  'Hernando':    { s: 12 },
  'Citrus':      { s: 13 },
  'Sumter':      { s: 11 },
  'Manatee':     { s: 13 },
  'Sarasota':    { s: 13, dx: -4 },
  'Hardee':      { s: 13 },
  'Highlands':   { s: 13 },
  'DeSoto':      { s: 13 },
  'Charlotte':   { s: 13 },
  'Glades':      { s: 13 },
  'Okeechobee':  { s: 11, dx: -14 },
  'Indian River':{ s: 11 },
  'St. Lucie':   { s: 13, dx: 8 },
  'Martin':      { s: 13 },
  'Lee':         { s: 13, dx: 14, dy: 8 },
  'Hendry':      { s: 14 },
  'Collier':     { s: 14 },
  'Broward':     { s: 14 },
  'Palm Beach':  { s: 14 },
  'Miami-Dade':  { s: 14, dy: 10 },
  'Monroe':      { s: 14, dx: -60, dy: 6 },
};

function buildFloridaPoster() {
  const { W, H } = FLA;
  const idp = 'fla';
  const topo = JSON.parse(fs.readFileSync(path.join(ROOT, 'node_modules/us-atlas/counties-10m.json'), 'utf8'));
  const all = topojson.feature(topo, topo.objects.counties);
  const fl = { type: 'FeatureCollection', features: all.features.filter((f) => String(f.id).startsWith('12')) };

  // Fit Florida by width (right edge leaves room for Atlantic-coast city labels),
  // then pin the top of the panhandle right under the header.
  const zoneLeft = 115, zoneRight = 1330, topY = 672;
  const proj = geoTransverseMercator().rotate([83.5, 0]);
  proj.fitExtent([[0, 0], [zoneRight - zoneLeft, 100000]], fl);
  let gp = geoPath(proj);
  const b = gp.bounds(fl);
  const t = proj.translate();
  proj.translate([t[0] + (zoneLeft - b[0][0]), t[1] + (topY - b[0][1])]);
  gp = geoPath(proj);

  let counties = `<g class="counties" stroke="${C.line}" stroke-width="1.3" stroke-linejoin="round" fill="${C.fill}">`;
  for (const f of fl.features) counties += `<path d="${gp(f)}" id="cty-${f.id}"/>`;
  counties += `</g>`;

  // service zone overlays (merged geometry)
  const mergeZone = (ids) =>
    gp(topojson.merge(topo, topo.objects.counties.geometries.filter((g) => ids.includes(String(g.id)))));
  let zones = `<g class="zones">`;
  for (const ids of Object.values(ZONES)) {
    zones += `<path d="${mergeZone(ids)}" fill="${C.accent}" fill-opacity="0.32" stroke="${C.accent}" stroke-width="2.4" stroke-opacity="0.75"/>`;
  }
  zones += `</g>`;

  // county labels
  let clabels = `<g class="county-labels">`;
  for (const f of fl.features) {
    const name = f.properties.name;
    const t = COUNTY_TWEAK[name] || {};
    const [cx0, cy0] = gp.centroid(f);
    clabels += text(cx0 + (t.dx || 0), cy0 + (t.dy || 0), name.toUpperCase(), {
      f: 'Roboto Slab', w: 500, s: t.s || 16, ls: 0.4, fill: C.dark, opacity: 0.92,
    });
  }
  clabels += `</g>`;

  // cities
  let cities = `<g class="cities">`;
  for (const c of [...CITIES, ...CITIES_EXTRA]) {
    const [px, py] = proj(c.ll);
    const lbl = c.n.toUpperCase();
    let lx = px, lyy = py, anchor = 'start', leader = '';
    const D = 24;
    if (c.side === 'E') { lx = px + D; lyy = py + 7; }
    if (c.side === 'W') { lx = px - D; lyy = py + 7; anchor = 'end'; }
    if (c.side === 'N') { lx = px + 4; lyy = py - 26; anchor = 'middle'; }
    if (c.side === 'S') { lx = px + 2; lyy = py + 38; anchor = 'middle'; }
    lx += c.dx || 0; lyy += c.dy || 0;
    if (c.capital) {
      const st = (r) => Array.from({ length: 10 }, (_, k) => {
        const a = (k * Math.PI) / 5 - Math.PI / 2, rr = k % 2 ? r * 0.45 : r;
        return `${r2(px + rr * Math.cos(a))},${r2(py + rr * Math.sin(a))}`;
      }).join(' ');
      cities += `<polygon points="${st(13)}" fill="${C.dark}" stroke="${C.bg}" stroke-width="1.4"/>`;
    } else {
      cities += `<circle cx="${r2(px)}" cy="${r2(py)}" r="7.5" fill="${C.dark}" stroke="${C.bg}" stroke-width="2.2"/>`;
    }
    cities += text(lx, lyy, lbl, { f: 'Oswald', w: 500, s: 20, ls: 1.4, fill: C.dark, anchor });
    if (leader) cities += leader;
  }
  cities += `</g>`;

  // header
  const cx = W / 2;
  const header = `<g class="header">
    ${text(cx, 300, 'SERVING FLORIDA', { f: 'Libre Baskerville', w: 700, s: 96, ls: 7, fill: C.dark })}
    ${text(cx, 416, 'SINCE 2022', { f: 'Libre Baskerville', w: 700, s: 96, ls: 7, fill: C.dark })}
    ${brandBlock(cx, 522, { ruleHalf: 150, brandSize: 44, tagSize: 21 })}
  </g>`;

  // legend — Gulf side
  const lg = { x: 150, y: 1520, w: 420, lh: 46 };
  const zoneNames = ['SOUTH FLORIDA', 'TAMPA BAY AREA', 'NAPLES / FORT MYERS AREA', 'FUTURE EXPANSION'];
  let legend = `<g class="legend">
    ${text(lg.x, lg.y, 'OUR SERVICE AREAS', { f: 'Oswald', w: 600, s: 26, ls: 4, fill: C.dark, anchor: 'start' })}
    <path d="M ${lg.x} ${lg.y + 16} h 170" stroke="${C.accent}" stroke-width="2"/>`;
  zoneNames.forEach((zn, i) => {
    const y = lg.y + 52 + i * lg.lh;
    const dashed = zn === 'FUTURE EXPANSION';
    legend += `<rect x="${lg.x}" y="${y - 15}" width="20" height="20" fill="${dashed ? 'none' : C.accent}" fill-opacity="${dashed ? 1 : 0.45}" stroke="${dashed ? C.future : C.accent}" stroke-width="${dashed ? 1.5 : 1.2}"${dashed ? ' stroke-dasharray="4 3"' : ''}/>`;
    legend += text(lg.x + 32, y, zn, { f: 'Roboto Slab', w: 500, s: 19, ls: 0.6, fill: C.dark, anchor: 'start' });
  });
  legend += `</g>`;

  // bottom element
  const bottom = `<g class="bottom">
    ${crossedWrenches(cx, 2185, 0.85)}
    ${text(cx, 2270, 'QUALITY REPAIRS.', { f: 'Oswald', w: 500, s: 26, ls: 4, fill: C.dark })}
    ${text(cx, 2304, 'LASTING IMPACT.', { f: 'Oswald', w: 500, s: 26, ls: 4, fill: C.dark })}
  </g>`;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="16.25in" height="24.25in" viewBox="0 0 ${W} ${H}">
  <title>Berne Repair — Serving Florida Since 2022 — 16×24 vintage map poster</title>
  <defs>${backgroundDefs(idp)}<style>${FONT_CSS}</style></defs>
  ${background(W, H, idp)}
  ${header}
  ${counties}
  ${zones}
  ${clabels}
  ${cities}
  ${legend}
  ${bottom}
  ${frame(W, H)}
  ${grainOverlay(W, H, idp)}
</svg>`;
  fs.writeFileSync(path.join(EXPORTS, 'berne_florida_service_16x24_editable.svg'), svg);
  console.log('Florida poster written');
}

buildUsaPoster();
buildFloridaPoster();
