import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "C:/Users/golds/Berne_Commercial/фото команды";
const DST = "C:/Users/golds/Berne_Commercial/_tmp/wp_team";
await mkdir(DST, { recursive: true });

// slug -> source filename. evgenii-knyazev intentionally OMITTED (source photo is the owner).
const PEOPLE = [
  ["mike","Mike.jpg"],["akhmed-osmanov","Akhmed Osmanov.jpg"],["andrei-lavrov","Andrei Lavrov.jpg"],
  ["boris","Boris.jpg"],["denis-novitskii","Denis Novitskii.jpg"],["dzmitrii-kitou","Dzmitrii Kitou.jpg"],
  ["dzmitrii","Dzmitrii.jpg"],["maksim-shiryagin","Makism Shiryagin.jpg"],["nikita-maslakov","Nikita Maslakov.jpg"],
  ["nikita-shirshov","Nikita Shirshov.jpg"],["refat-bekirov","Refat Bekirov.jpg"],["ruslan-hordieiev","Ruslan Hordieiev.jpg"],
  ["shokhrat-agabekov","Shokhrat Agabekov.jpg"],["valerii-basov","Valerii Basov.jpg"],["viktor-kamenschikov","Viktor Kamenschikov.jpg"],
  ["hasrat-yusifov","NankYusifov.jpg"],["vasyl-kruchkovskyi","VasylKruchkovskyi.jpg"],
];

let n = 0;
for (const [slug, src] of PEOPLE) {
  try {
    const m = await sharp(path.join(SRC, src)).rotate()
      .resize({ width: 800, height: 800, fit: "cover", position: "attention" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(DST, `${slug}.jpg`));
    n++; console.log(`${slug.padEnd(20)} ${(m.size/1024).toFixed(0)}KB`);
  } catch (e) { console.log(`SKIP ${slug} (${src}: ${e.message.slice(0,50)})`); }
}
console.log(`\n${n} team jpgs -> ${DST}`);
