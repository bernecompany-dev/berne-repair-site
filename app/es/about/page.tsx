import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  BadgeDollarSign,
  Wrench,
  MapPin,
  Star,
  Clock3,
  Phone,
} from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { COMPANY } from "@/data/company";
import { TEAM } from "@/data/team";
import { REVIEW_AGGREGATE } from "@/data/reviews";
import { breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sobre Berne Repair — Reparación de electrodomésticos en el sur de Florida",
  description:
    "Berne Repair: 18 técnicos, más de 29,000 servicios, 4.79/871 reseñas en Miami-Dade, Broward y Palm Beach. Fundada en 2022 por Eugene Berne, con 11+ años de herencia en el sector.",
  alternates: {
    canonical: "/es/about",
    languages: {
      "en-US": absoluteUrl("/about"),
      "es-US": absoluteUrl("/es/about"),
      "x-default": absoluteUrl("/about"),
    },
  },
};

export default function AboutPageES() {
  const crumbs = [
    { name: "Inicio", href: "/es" },
    { name: "Nosotros", href: "/es/about" },
  ];

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Sobre Berne Repair",
    url: absoluteUrl("/es/about"),
    inLanguage: "es-US",
    mainEntity: { "@id": absoluteUrl("/#business") },
    breadcrumb: { "@id": absoluteUrl("/es/about#breadcrumb") },
  };

  const founderPersonJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#founder"),
    name: "Eugene Bernitsky",
    alternateName: "Eugene Berne",
    jobTitle: "Fundador y CEO",
    worksFor: { "@id": absoluteUrl("/#organization") },
    sameAs: [
      "https://bernerepair.com/",
      "https://berne-commercial.com/",
      "https://www.linkedin.com/in/eugene-bernitsky-b52763364/",
    ],
  };

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.67 0.21 252 / 0.25), transparent)",
          }}
        />
        <div className="container-prose pt-14 pb-12 sm:pt-20 sm:pb-16">
          <nav
            className="mb-6 flex items-center gap-2 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href="/es" className="hover:text-foreground">
              Inicio
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Nosotros</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <Users className="size-3.5" aria-hidden />
              {COMPANY.socialProof.technicians} técnicos a tiempo completo
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden />
              Con licencia y asegurados
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Star className="size-3.5 text-brand" aria-hidden />
              {REVIEW_AGGREGATE.ratingValue} / {REVIEW_AGGREGATE.reviewCount} reseñas
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            El equipo premium de electrodomésticos del sur de Florida.{" "}
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              Construido en oficio, no en subcontratistas.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Berne Repair se estableció en 2022 como la sucursal premium del sur
            de Florida de una familia de operaciones de reparación de
            electrodomésticos con{" "}
            <span className="text-foreground">11+ años de herencia en el sector</span>.
            Hoy: {COMPANY.socialProof.technicians} técnicos W-2,{" "}
            {COMPANY.socialProof.repairsCompleted} servicios completados,{" "}
            {REVIEW_AGGREGATE.ratingValue}/5 en {REVIEW_AGGREGATE.reviewCount}{" "}
            reseñas verificadas — y una visita técnica de ${COMPANY.serviceCallPrice}
            {" "}aplicada a la reparación si nos da luz verde.
          </p>

          <div className="mt-9">
            <CTARow size="lg" locale="es" />
          </div>
        </div>
      </section>

      <section className="container-prose grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand/30 via-transparent to-transparent blur-2xl"
          />
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_80px_-30px_oklch(0.67_0.21_252/0.35)]">
            <Image
              src="/images/team/evgenii-knyazev.webp"
              alt="Eugene Berne, fundador de Berne Repair, fotografiado en el taller de Berne Repair"
              width={800}
              height={1000}
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        <div>
          <span className="eyebrow">Nota del fundador</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Hola — soy Eugene Berne.
          </h2>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/90 sm:text-lg">
            <p>
              Fundé Berne Repair en 2022 tras una década en el oficio de
              reparación de electrodomésticos. El plan era simple: construir
              una operación de flota en el sur de Florida donde cada técnico
              en el camión sea un empleado de Berne — no el primo de un
              despachador, no un subcontratista del día — y respaldar cada
              reparación con una garantía real y un teléfono que yo mismo
              contesto.
            </p>
            <p>
              Cuatro años después operamos {COMPANY.socialProof.technicians}{" "}
              técnicos a tiempo completo en camiones surtidos para Sub-Zero,
              Wolf, Viking, Thermador, Miele, Bosch y todas las marcas
              principales. Hemos completado{" "}
              <strong className="text-foreground">
                {COMPANY.socialProof.repairsCompleted} servicios
              </strong>{" "}
              en Miami-Dade, Broward y Palm Beach. La página de reseñas lo
              demuestra — {REVIEW_AGGREGATE.ratingValue} sobre 5 en{" "}
              {REVIEW_AGGREGATE.reviewCount} reseñas verificadas en Google,
              Yelp y las plataformas que nuestros clientes realmente usan.
            </p>
            <p>
              Somos una empresa joven. El oficio que la sostiene no lo es —
              nuestros técnicos senior aportan de 7 a 10 años de banco cada
              uno, y la familia Berne de operaciones de reparación lleva
              atendiendo servicios en Florida desde 2015. La marca residencial
              general opera como{" "}
              <a
                href="https://bernerepair.com/"
                rel="noopener"
                className="text-brand hover:underline"
              >
                Berne Appliance Repair
              </a>
              , y el trabajo comercial / restaurante / hotel se despacha vía{" "}
              <a
                href="https://www.berne-commercial.com/"
                rel="noopener"
                className="text-brand hover:underline"
              >
                Berne Commercial Repair
              </a>
              . Si quiere la versión larga, la{" "}
              <Link href="/es/family" className="text-brand hover:underline">
                página de la familia
              </Link>{" "}
              la tiene.
            </p>
            <p>
              Si nos llama hoy antes del mediodía, es muy probable que tenga
              a un técnico en su puerta a la hora de la cena. Ese es el
              estándar de operación. Eso es lo que{" "}
              {COMPANY.socialProof.repairsCompleted} servicios nos enseñaron
              a comprometer.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${COMPANY.phone.tel}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-[0_10px_30px_-10px_var(--brand-glow)] hover:-translate-y-px hover:brightness-110"
            >
              <Phone className="size-4" aria-hidden />
              Llamar {COMPANY.phone.display}
            </a>
            <Link
              href="/es/team"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground hover:bg-white/[0.07]"
            >
              <Users className="size-4 text-brand" aria-hidden />
              Conozca a los {TEAM.length - 1} técnicos
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/20">
        <div className="container-prose py-16 sm:py-20">
          <div className="mb-10 max-w-2xl">
            <span className="eyebrow">En cifras</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Cómo se ve Berne Repair hoy.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              icon={<Users className="size-5 text-brand" aria-hidden />}
              value={String(COMPANY.socialProof.technicians)}
              label="Técnicos a tiempo completo"
              sub="Todos empleados W-2, no subcontratistas"
            />
            <Stat
              icon={<Wrench className="size-5 text-brand" aria-hidden />}
              value={COMPANY.socialProof.repairsCompleted}
              label="Servicios completados"
              sub="En toda la familia Berne de operaciones"
            />
            <Stat
              icon={<Star className="size-5 text-brand" aria-hidden />}
              value={`${REVIEW_AGGREGATE.ratingValue} / 5`}
              label={`${REVIEW_AGGREGATE.reviewCount} reseñas verificadas`}
              sub="Google, Yelp y otras plataformas"
            />
            <Stat
              icon={<MapPin className="size-5 text-brand" aria-hidden />}
              value="3"
              label="Condados atendidos"
              sub="Miami-Dade · Broward · Palm Beach"
            />
            <Stat
              icon={<BadgeDollarSign className="size-5 text-brand" aria-hidden />}
              value={`$${COMPANY.serviceCallPrice}`}
              label="Visita técnica plana"
              sub="Aplicada a la reparación si nos da luz verde"
            />
            <Stat
              icon={<Clock3 className="size-5 text-brand" aria-hidden />}
              value="Mismo día"
              label="Estándar de despacho"
              sub="Abierto 7 días · 8 AM – 9 PM"
            />
            <Stat
              icon={<ShieldCheck className="size-5 text-brand" aria-hidden />}
              value="90 días"
              label="Garantía de mano de obra y piezas"
              sub="En cada servicio, por escrito, sin asteriscos"
            />
            <Stat
              icon={<ShieldCheck className="size-5 text-brand" aria-hidden />}
              value="Con licencia"
              label="y totalmente asegurados"
              sub="Credenciales del estado de Florida en archivo"
            />
          </div>
        </div>
      </section>

      <section className="container-prose py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Área de servicio</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Tres condados, más de 60 ciudades.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Berne Repair despacha en todo Miami-Dade, Broward y Palm Beach —
              desde Homestead al sur hasta Jupiter al norte. Vecindarios
              prioritarios incluyen Bal Harbour, Sunny Isles, Fisher Island,
              Key Biscayne, Coral Gables, Pinecrest, Aventura, Hollywood,
              Fort Lauderdale, Boca Raton, Delray Beach y West Palm Beach.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/es/areas"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground hover:bg-white/[0.07]"
              >
                <MapPin className="size-4 text-brand" aria-hidden />
                Ver todas las ciudades
              </Link>
              <Link
                href="/es/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground hover:bg-white/[0.07]"
              >
                <Wrench className="size-4 text-brand" aria-hidden />
                Qué reparamos
              </Link>
            </div>
          </div>

          <div>
            <span className="eyebrow">Cómo operamos</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Operado como flota. Tarifa de local.
            </h2>
            <ul className="mt-5 space-y-3 text-base leading-relaxed text-foreground/90">
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>
                  Sólo técnicos W-2. Sin despacho subcontratado, sin
                  &ldquo;conozco a alguien&rdquo;.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>
                  Certificación EPA para trabajo de refrigerantes donde
                  importa — Sub-Zero, columnas built-in, sistemas sellados.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>
                  Camiones surtidos para las marcas que vemos todos los días
                  — Sub-Zero, Wolf, Viking, Thermador, Miele, Bosch, LG,
                  Samsung, Whirlpool, GE, KitchenAid.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>
                  Garantía de 90 días en mano de obra y piezas, por escrito.
                  Sin letra chica.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>
                  Respaldado por el dueño: Eugene contesta las escalaciones
                  personalmente.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Contact locale="es" />
      <CTABand locale="es" />

      <JsonLd data={[aboutJsonLd, breadcrumbJsonLd(crumbs), founderPersonJsonLd]} />
    </>
  );
}

function Stat({
  icon,
  value,
  label,
  sub,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-5">
      <div className="flex items-center gap-2">{icon}</div>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
        {value}
      </div>
      <div className="mt-1 text-sm font-medium text-foreground/85">{label}</div>
      {sub ? (
        <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {sub}
        </div>
      ) : null}
    </div>
  );
}
