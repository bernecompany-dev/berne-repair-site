import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "фото команды");
const DST = path.join(ROOT, "public", "images", "team");

await mkdir(DST, { recursive: true });

// Hand-picked best photos with semantic names + role hints for alt text.
const PICKS = [
  { src: "photo_2026-05-01_16-43-37.jpg", out: "tech-mikhail.webp", role: "Service technician at the Berne Repair shop" },
  { src: "photo_2026-02-11_16-39-53.jpg", out: "tech-dmitry.webp",  role: "Berne Repair technician at the South Florida service center" },
  { src: "photo_2026-02-10_16-21-30.jpg", out: "dispatch-vladimir.webp", role: "Berne Repair dispatcher at the South Florida office" },
  { src: "photo_2025-12-22_09-19-06.jpg", out: "tech-andrei.webp", role: "Berne Repair licensed technician in South Florida" },
  { src: "Akhmed.jpg",                    out: "tech-akhmed.webp", role: "Berne Repair commercial technician servicing a UniMac washer" },
];

let totalKB = 0;
for (const p of PICKS) {
  const src = path.join(SRC, p.src);
  const dst = path.join(DST, p.out);
  const meta = await sharp(src)
    .rotate()
    .resize({ width: 800, height: 800, fit: "cover", position: "attention" })
    .webp({ quality: 84 })
    .toFile(dst);
  totalKB += meta.size / 1024;
  console.log(`${p.out.padEnd(28)} ${(meta.size/1024).toFixed(0)}KB  ${meta.width}×${meta.height}`);
}
console.log(`\nTotal: ${totalKB.toFixed(0)}KB`);
