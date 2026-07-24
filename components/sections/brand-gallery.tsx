import Image from "next/image";

import { getBrandPhotos } from "@/lib/data/brand-photos";
import type { Locale } from "@/lib/i18n";

// Field-photo gallery for the residential brand hubs. Photos are real job
// shots (2026-07-24 batch), 5 per brand, served from /images/brands/{slug}/.
// Explicit width/height come from lib/data/brand-photos.ts and the images are
// cropped to a uniform 3:4 frame via aspect-[3/4] — zero CLS either way.
// Always rendered below the fold; every image is loading="lazy" so the
// gallery never competes with the hero LCP.
export function BrandGallery({
  brandSlug,
  brandName,
  locale = "en",
}: {
  brandSlug: string;
  brandName: string;
  locale?: Locale;
}) {
  const photos = getBrandPhotos(brandSlug);
  if (!photos.length) return null;

  const t =
    locale === "es"
      ? {
          eyebrow: `${brandName} en el campo`,
          title: `Trabajos ${brandName} reales — fotos de nuestros técnicos.`,
          body: `Tomadas por nuestros técnicos en llamadas ${brandName} en el Sur de Florida — no son fotos de archivo.`,
        }
      : {
          eyebrow: `${brandName} in the field`,
          title: `Real ${brandName} jobs — shot by our techs.`,
          body: `Taken by our technicians on ${brandName} calls across South Florida — not stock photography.`,
        };

  return (
    <section className="container-prose py-16 sm:py-20">
      <div className="max-w-3xl">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2 className="heading-section mt-3">{t.title}</h2>
        <p className="mt-4 text-muted-foreground">{t.body}</p>
      </div>
      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {photos.map((p) => (
          <li
            key={p.file}
            className="overflow-hidden rounded-2xl border border-border bg-card/40"
          >
            <Image
              src={`/images/brands/${brandSlug}/${p.file}`}
              alt={p.alt}
              width={p.width}
              height={p.height}
              sizes="(min-width: 1280px) 400px, (min-width: 640px) 33vw, 50vw"
              quality={78}
              loading="lazy"
              className="aspect-[3/4] h-auto w-full object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
