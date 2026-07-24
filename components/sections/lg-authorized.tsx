import Image from "next/image";

import type { Locale } from "@/lib/i18n";

// LG Authorized Service Center credential (2026-07-24). Two placements:
// - "banner": full-width card on /brands/lg (EN + ES) with the 800x125 mark
// - "compact": small badge row for the /about trust block with the 400x62 mark
// The artwork is a white LG logotype on solid black, so both variants sit the
// image on a black card regardless of theme. Explicit width/height + lazy.

const BADGE_ALT = "LG Authorized Service Center — Berne Repair";

export function LgAuthorizedBanner({ locale = "en" }: { locale?: Locale }) {
  const t =
    locale === "es"
      ? {
          eyebrow: "Credencial de fábrica",
          body: `Berne es un LG Authorized Service Center para el Sur de Florida. Las reparaciones LG se hacen con partes autorizadas por la fábrica y técnicos entrenados en los procedimientos de servicio de LG.`,
        }
      : {
          eyebrow: "Factory credential",
          body: `Berne is an LG Authorized Service Center for South Florida. LG repairs here run on factory-authorized parts and technicians trained on LG's own service procedures.`,
        };

  return (
    <section className="container-prose py-10 sm:py-12">
      <div className="grid items-center gap-6 rounded-2xl border border-border bg-card/50 p-6 sm:p-8 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-10">
        <div className="rounded-xl bg-black p-5 sm:p-6">
          <Image
            src="/images/credentials/lg-authorized-service-800.webp"
            alt={BADGE_ALT}
            width={800}
            height={125}
            sizes="(min-width: 1024px) 372px, (min-width: 640px) 60vw, 90vw"
            loading="lazy"
            className="h-auto w-full"
          />
        </div>
        <div>
          <span className="eyebrow">{t.eyebrow}</span>
          <p className="mt-3 text-base leading-relaxed text-foreground/90 sm:text-lg">
            {t.body}
          </p>
        </div>
      </div>
    </section>
  );
}

export function LgAuthorizedBadge({ locale = "en" }: { locale?: Locale }) {
  const label =
    locale === "es"
      ? "Centro de servicio autorizado por LG"
      : "Factory-authorized LG service";

  return (
    <div className="mt-5 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card/50 p-4">
      <div className="rounded-lg bg-black px-3 py-2.5">
        <Image
          src="/images/credentials/lg-authorized-service-400.webp"
          alt={BADGE_ALT}
          width={400}
          height={62}
          sizes="220px"
          loading="lazy"
          className="h-auto w-[220px] max-w-full"
        />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
