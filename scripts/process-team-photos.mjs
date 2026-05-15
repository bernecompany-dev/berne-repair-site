import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "фото команды");
const DST = path.join(ROOT, "public", "images", "team");

await mkdir(DST, { recursive: true });

// Canonical name → preferred source filename (some technicians have multiple shots)
const PEOPLE = [
  { src: "Evgenii Knyazev.jpg",     slug: "evgenii-knyazev" },
  { src: "Refat Bekirov.jpg",        slug: "refat-bekirov" },
  { src: "Akhmed Osmanov.jpg",       slug: "akhmed-osmanov" },
  { src: "Andrei Lavrov.jpg",        slug: "andrei-lavrov" },
  { src: "Dzmitrii Kitou.jpg",       slug: "dzmitrii-kitou" },
  { src: "Nikita Maslakov.jpg",      slug: "nikita-maslakov" },
  { src: "Nikita Shirshov.jpg",      slug: "nikita-shirshov" },
  { src: "Makism Shiryagin.jpg",     slug: "maksim-shiryagin" }, // source has typo
  { src: "Denis Novitskii.jpg",      slug: "denis-novitskii" },
  { src: "Dzmitrii.jpg",             slug: "dzmitrii" },
  { src: "Ruslan Hordieiev.jpg",     slug: "ruslan-hordieiev" },
  { src: "Shokhrat Agabekov.jpg",    slug: "shokhrat-agabekov" },
  { src: "Valerii Basov.jpg",        slug: "valerii-basov" },
  { src: "Viktor Kamenschikov.jpg",  slug: "viktor-kamenschikov" },
  { src: "Boris.jpg",                slug: "boris" },
  { src: "Mike.jpg",                 slug: "mike" },
];

let totalKB = 0;
let written = 0;
for (const p of PEOPLE) {
  const src = path.join(SRC, p.src);
  const dst = path.join(DST, `${p.slug}.webp`);
  try {
    const meta = await sharp(src)
      .rotate()
      .resize({ width: 800, height: 800, fit: "cover", position: "attention" })
      .webp({ quality: 84 })
      .toFile(dst);
    totalKB += meta.size / 1024;
    written++;
    console.log(`${p.slug.padEnd(22)} ${(meta.size/1024).toFixed(0)}KB`);
  } catch (e) {
    console.log(`SKIP ${p.slug.padEnd(22)} (${p.src}: ${e.message.slice(0,60)})`);
  }
}
console.log(`\n${written} photos · ${totalKB.toFixed(0)}KB total`);
