#!/usr/bin/env node
/**
 * Post-build audit of the city × service combo pages.
 *
 * Reads every rendered HTML in .next/server/app/services/<service>/<city>.html,
 * extracts text content, counts words, audits metadata + JSON-LD blocks,
 * runs an AI-tell regex sweep, and prints a JSON summary that the morning
 * brief can ingest.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = ".next/server/app/services";

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[#a-z0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function extractMeta(html, name) {
  const m = html.match(new RegExp(`<meta name="${name}" content="([^"]+)"`));
  return m ? m[1] : "";
}

function extractTitle(html) {
  return (html.match(/<title>([^<]+)<\/title>/) || [, ""])[1];
}

function extractCanonical(html) {
  return (html.match(/<link rel="canonical" href="([^"]+)"/) || [, ""])[1];
}

function extractJsonLd(html) {
  const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  const blocks = [];
  let m;
  while ((m = re.exec(html))) {
    try {
      const parsed = JSON.parse(
        m[1]
          .replace(/\\u003c/g, "<")
          .replace(/\\u003e/g, ">")
          .replace(/\\u0026/g, "&"),
      );
      blocks.push(parsed);
    } catch {
      blocks.push(null);
    }
  }
  return blocks;
}

const AI_TELLS = [
  /\bwhen it comes to\b/i,
  /\bin today'?s\b/i,
  /\bfirst and foremost\b/i,
  /\blook no further\b/i,
  /\bgame.?changer\b/i,
  /\bdive into\b/i,
  /\bcutting.?edge\b/i,
  /\bin the realm of\b/i,
  /\bnavigating the\b/i,
  /\bunlock the\b/i,
  /\bharness the power of\b/i,
  /\bdelve into\b/i,
  /\bin the world of\b/i,
  /\bone of the most\b/i,
  /\bplays? a (?:crucial|vital|pivotal|key) role\b/i,
  /\brest assured\b/i,
  /\bworld.?class\b/i,
  /\bcrafted to perfection\b/i,
  /\bseamless(?:ly)?\b/i,
  /\bleverage\b/i,
];

function audit() {
  if (!fs.existsSync(ROOT)) {
    console.error("No .next/server/app/services directory — run `npm run build` first.");
    process.exit(2);
  }

  const services = fs
    .readdirSync(ROOT)
    .filter(
      (s) =>
        fs.statSync(path.join(ROOT, s)).isDirectory() && s !== "[slug]",
    );

  const rows = [];
  const aiHits = {};
  let titlesOver = 0;
  let descsOver = 0;
  let jsonLdBlocksMin = Infinity;
  let jsonLdBlocksMax = 0;

  for (const s of services) {
    const dir = path.join(ROOT, s);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));
    for (const f of files) {
      const city = f.replace(/\.html$/, "");
      const html = fs.readFileSync(path.join(dir, f), "utf8");
      const text = stripHtml(html);
      const wc = countWords(text);
      const title = extractTitle(html);
      const desc = extractMeta(html, "description");
      const canon = extractCanonical(html);
      const ld = extractJsonLd(html);
      const nodeCount = ld.reduce(
        (acc, b) => acc + (Array.isArray(b) ? b.length : b ? 1 : 0),
        0,
      );

      if (title.length > 60) titlesOver++;
      if (desc.length > 160) descsOver++;
      jsonLdBlocksMin = Math.min(jsonLdBlocksMin, ld.length);
      jsonLdBlocksMax = Math.max(jsonLdBlocksMax, ld.length);

      for (const rx of AI_TELLS) {
        if (rx.test(text)) {
          aiHits[rx.source] = (aiHits[rx.source] || 0) + 1;
        }
      }

      rows.push({
        slug: `${s}/${city}`,
        wc,
        titleLen: title.length,
        descLen: desc.length,
        jsonLdScripts: ld.length,
        jsonLdNodes: nodeCount,
        canon,
      });
    }
  }

  rows.sort((a, b) => a.wc - b.wc);
  const ws = rows.map((r) => r.wc);
  const med = ws[Math.floor(ws.length / 2)];
  const p10 = ws[Math.floor(ws.length * 0.1)];
  const p90 = ws[Math.floor(ws.length * 0.9)];
  const min = ws[0];
  const max = ws[ws.length - 1];

  const summary = {
    combos_total: rows.length,
    word_count: { min, p10, median: med, p90, max },
    titles_over_60: titlesOver,
    descs_over_160: descsOver,
    json_ld_script_blocks: {
      min: jsonLdBlocksMin === Infinity ? 0 : jsonLdBlocksMin,
      max: jsonLdBlocksMax,
    },
    ai_tell_hits: aiHits,
    samples: [
      rows.find((r) => r.slug === "refrigerator-repair/miami"),
      rows.find((r) => r.slug === "dishwasher-repair/fort-lauderdale"),
      rows.find((r) => r.slug === "oven-repair/boca-raton"),
      rows.find((r) => r.slug === "washer-repair/aventura"),
      rows.find((r) => r.slug === "dryer-repair/coral-gables"),
    ].filter(Boolean),
  };

  console.log(JSON.stringify(summary, null, 2));
  return summary;
}

audit();
