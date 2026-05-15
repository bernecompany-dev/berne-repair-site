// Resizes service photos from `Services/<RuFolder>/*.jpg` into
// `public/images/services/<slug>/N.webp` at 1600w / 82q, takes the N most recent.
// Run: `node scripts/process-photos.mjs`

import { readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "Services");
const DST = path.join(ROOT, "public", "images", "services");
const PER_CATEGORY = 5; // 5 photos per service for carousel
const MAX_WIDTH = 1600;
const QUALITY = 82;

const MAP = {
  "Холодильник": "refrigerator-repair",
  "Ститарлка": "washer-repair",
  "Драер": "dryer-repair",
  "Плита": "oven-repair",
  "Микроволновка": "microwave-repair",
  "Дишвошер": "dishwasher-repair",
  "Air Duct cleaning": "air-duct-cleaning",
};

let total = 0, bytesIn = 0, bytesOut = 0;

for (const [ru, slug] of Object.entries(MAP)) {
  const srcDir = path.join(SRC, ru);
  if (!existsSync(srcDir)) { console.warn(`skip: ${ru} (no folder)`); continue; }
  const dstDir = path.join(DST, slug);
  await mkdir(dstDir, { recursive: true });

  const files = (await readdir(srcDir))
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort()
    .reverse() // newest filename (date-stamped) first
    .slice(0, PER_CATEGORY);

  console.log(`\n${slug}  (${files.length} photos)`);
  let i = 1;
  for (const f of files) {
    const src = path.join(srcDir, f);
    const dst = path.join(dstDir, `${i}.webp`);
    const inStat = (await sharp(src).metadata()).size ?? 0;
    bytesIn += inStat;
    const meta = await sharp(src)
      .rotate() // respect EXIF orientation
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(dst);
    bytesOut += meta.size;
    total++;
    console.log(`  ${i}.webp  ${(meta.size/1024).toFixed(0)}KB  ${meta.width}×${meta.height}`);
    i++;
  }
}

console.log(`\nProcessed ${total} images.  In: ${(bytesIn/1024/1024).toFixed(1)}MB → Out: ${(bytesOut/1024/1024).toFixed(1)}MB`);
