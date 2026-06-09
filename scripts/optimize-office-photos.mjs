// One-off: optimize office/dispatch team photos from C:/Users/golds/Team
// into public/images/team/*.webp (max 800px long side, EXIF stripped, <150KB).
import sharp from "sharp";
import { stat } from "node:fs/promises";

const SRC = "C:/Users/golds/Team";
const OUT = "C:/Users/golds/my-site/public/images/team";

const PHOTOS = [
  ["ArtemOperationalManagerandIT.jpg", "artem.webp"],
  ["BogdanOperationalDirector.jpg", "bogdan.webp"],
  ["GabeOpeationalManager.jpg", "gabe.webp"],
  ["JaylaDispatchOperator.JPG", "jayla.webp"],
  ["KeithDispatchLeadOpeartor.jpg", "keith.webp"],
  ["LinaDispatchOperator.jpg", "lina.webp"],
  ["StaceyDispatchOperator.jpg", "stacey.webp"],
];

for (const [src, out] of PHOTOS) {
  let quality = 80;
  let buf;
  // .rotate() bakes in EXIF orientation; metadata is stripped by default.
  for (;;) {
    buf = await sharp(`${SRC}/${src}`)
      .rotate()
      .resize(800, 800, { fit: "inside", withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
    if (buf.length <= 150 * 1024 || quality <= 50) break;
    quality -= 10;
  }
  await sharp(buf).toFile(`${OUT}/${out}`);
  const meta = await sharp(buf).metadata();
  const kb = (await stat(`${OUT}/${out}`)).size / 1024;
  console.log(`${out}: ${meta.width}x${meta.height} q${quality} ${kb.toFixed(0)}KB`);
}
