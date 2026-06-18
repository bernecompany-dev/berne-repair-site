import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "C:/Users/golds/Berne_Commercial/фото команды";
const MYSITE = "C:/Users/golds/my-site/public/images/team";
const COMMERCIAL = "C:/Users/golds/Berne_Commercial/berne commercial/apps/web/public/team";
const WPSTAGE = "C:/Users/golds/Berne_Commercial/_tmp/wp_team";

await mkdir(MYSITE, { recursive: true });
await mkdir(COMMERCIAL, { recursive: true });
await mkdir(WPSTAGE, { recursive: true });

const PEOPLE = [
  { src: "NankYusifov.jpg",        slug: "hasrat-yusifov" },
  { src: "VasylKruchkovskyi.jpg",  slug: "vasyl-kruchkovskyi" },
];

for (const p of PEOPLE) {
  const src = path.join(SRC, p.src);
  const base = sharp(src).rotate().resize({ width: 800, height: 800, fit: "cover", position: "attention" });

  const webp = await base.clone().webp({ quality: 84 }).toFile(path.join(MYSITE, `${p.slug}.webp`));
  const jpgC = await base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(COMMERCIAL, `${p.slug}.jpg`));
  const jpgW = await base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(WPSTAGE, `${p.slug}.jpg`));

  console.log(`${p.slug.padEnd(20)} webp ${(webp.size/1024).toFixed(0)}KB · commercial.jpg ${(jpgC.size/1024).toFixed(0)}KB · wp.jpg ${(jpgW.size/1024).toFixed(0)}KB`);
}
console.log("done");
