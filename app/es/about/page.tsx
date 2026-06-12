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
import { COMPANY, REPAIRS_COMPLETED, REPAIRS_COMPLETED_BARE } from "@/data/company";
import { REVIEW_AGGREGATE } from "@/data/reviews";
import { breadcrumbJsonLd, absoluteUrl, pageOpenGraph } from "@/lib/seo";

const PAGE_TITLE = "Sobre Berne Appliance Repair — Empresa familiar desde 2015";
const PAGE_DESCRIPTION = `Parte de la familia de empresas Berne que sirve al sur de Florida desde 2015 — división premium desde 2022. 18 técnicos W-2, ${REPAIRS_COMPLETED} servicios, 4.79/871 reseñas.`;

export const metadata: Metadata = {
  // Absolute — brand already in the string; layout template would double it.
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/es/about",
    languages: {
      "en-US": absoluteUrl("/about"),
      "es-US": absoluteUrl("/es/about"),
      "x-default": absoluteUrl("/about"),
    },
  },
  openGraph: pageOpenGraph({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, path: "/es/about", locale: "es" }),
};

export default function AboutPageES() {
  const crumbs = [
    { name: "Inicio", href: "/es" },
    { name: "Nosotros", href: "/es/about" },
  ];

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Sobre Berne Appliance Repair",
    url: absoluteUrl("/es/about"),
    inLanguage: "es-US",
    description:
      `Berne Appliance Repair: la división premium de la familia de empresas Berne, reparando electrodomésticos en el sur de Florida desde 2015 — lanzada por Eugene Berne en 2022. 18 técnicos W-2, más de ${REPAIRS_COMPLETED_BARE} servicios completados, 4.79/871 reseñas. Sub-Zero, Wolf, Viking, Thermador y Miele en Miami-Dade, Broward, Palm Beach y la Costa del Golfo.`,
    mainEntity: { "@id": absoluteUrl("/#business") },
    breadcrumb: { "@id": absoluteUrl("/es/about#breadcrumb") },
  };

  const founderPersonJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#founder"),
    name: "Eugene Berne",
    alternateName: "Eugene Bernitsky",
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
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden />
              Con licencia y asegurados
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Star className="size-3.5 text-brand" aria-hidden />
              {REVIEW_AGGREGATE.ratingValue} / {REVIEW_AGGREGATE.reviewCount} reseñas
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            El equipo premium de electrodomésticos del sur de Florida.{" "}
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              Construido en oficio, no en subcontratistas.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            La familia de empresas Berne repara los electrodomésticos del sur
            de Florida desde 2015 con una sola premisa: las casas de alto
            poder adquisitivo merecían una empresa de servicio que de verdad
            apareciera, que arreglara el electrodoméstico bien a la primera, y
            a la que se le pudiera confiar el interior de un refrigerador
            Sub-Zero de $20K o una estufa Wolf de 48&quot;. Eugene Berne lanzó
            esta división premium en 2022 — mismo operador, mismos estándares,
            enfoque más preciso en marcas de lujo. Hoy —{" "}
            {COMPANY.socialProof.technicians} técnicos W-2,{" "}
            {COMPANY.socialProof.repairsCompleted} servicios completados,{" "}
            <span className="text-foreground">
              {REVIEW_AGGREGATE.ratingValue}/5 en {REVIEW_AGGREGATE.reviewCount}{" "}
              reseñas verificadas
            </span>
            {" "}— esa premisa sigue siendo el sistema operativo de la
            compañía.
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
            {/* LCP candidate on /es/about — render eagerly with high fetch priority. */}
            <Image
              src="/images/team/evgenii-knyazev.webp"
              alt="Eugene Berne, fundador de Berne Appliance Repair, fotografiado en el taller de Berne Appliance Repair"
              width={800}
              height={1000}
              priority
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
              La familia de empresas Berne repara electrodomésticos en el sur
              de Florida desde 2015, porque las casas de alto poder
              adquisitivo hacían siempre la misma pregunta: a quién le confío
              un refrigerador de $20K. La respuesta honesta solía ser
              &ldquo;a nadie de forma confiable&rdquo; — el mercado eran
              despachadores de franquicia, operaciones de un solo camión, y
              una larga cola de técnicos dispuestos a abrir un sistema sellado
              de Sub-Zero sin entrenamiento formal. La familia construyó la
              alternativa — y en 2022 lancé esta división premium: mismo
              operador, mismos estándares, enfoque más preciso en marcas de
              lujo.
            </p>
            <p>
              Hoy, en toda la familia de empresas, la operación son{" "}
              {COMPANY.socialProof.technicians}{" "}
              técnicos W-2 en camiones surtidos específicamente para las
              marcas premium que el sur de Florida tiene en sus cocinas:
              Sub-Zero, Wolf, Viking, Thermador, Miele, Bosch — más las
              marcas de volumen (LG, Samsung, Whirlpool, GE, KitchenAid) que
              también atendemos a diario porque cada casa tiene una mezcla.
              Hemos completado{" "}
              <strong className="text-foreground">
                {COMPANY.socialProof.repairsCompleted} servicios
              </strong>{" "}
              en Miami-Dade, Broward, Palm Beach y la Costa del Golfo — la
              calificación de 4.79★ en {REVIEW_AGGREGATE.reviewCount} reseñas
              es multi-fuente (Google, Yelp y las plataformas que nuestros
              clientes realmente usan).
            </p>
            <p>
              Por qué importa el W-2: cuando el técnico en su entrada es un
              empleado de Berne con un sueldo de por medio, el diagnóstico
              es honesto, la reparación es la correcta, y el camión viene
              surtido antes de salir de la oficina. Cuando es un
              subcontratista del día, nada de eso es estructuralmente
              cierto. Tomamos la decisión operativa cara desde temprano —
              nómina, beneficios, presupuesto de capacitación, flota —
              porque nada más le da la consistencia que el trabajo exige.
            </p>
            <p>
              La familia Berne corre tres marcas coordinadas. La operación
              residencial general es{" "}
              <a
                href="https://bernerepair.com/"
                rel="noopener"
                className="text-brand hover:underline"
              >
                Berne Appliance Repair
              </a>
              {" "}— el sitio de cara al consumidor donde aterriza la mayoría
              de los servicios. Este sitio,{" "}
              <span className="text-foreground">berne-repair.com</span>, es el
              nivel premium — columnas Sub-Zero, Wolf dual-fuel, Miele
              built-in, las casas de Sunny Isles / Bal Harbour / Fisher
              Island donde el electrodoméstico se instaló como parte de un
              build-out de cocina a medida. Cocinas comerciales, equipo de
              restaurante, hoteles y edificios administrados se despachan
              vía{" "}
              <a
                href="https://www.berne-commercial.com/"
                rel="noopener"
                className="text-brand hover:underline"
              >
                Berne Commercial Repair
              </a>
              . Mismo estándar de capacitación. Misma rendición de cuentas.
              La{" "}
              {/* /family is EN-only (no /es/family route) — link the EN page, like /blog. */}
              <Link href="/family" className="text-brand hover:underline">
                página de la familia
              </Link>{" "}
              tiene la versión larga.
            </p>
            <p>
              Berne es miembro de{" "}
              <a
                href="https://msaworld.com/"
                rel="noopener external"
                target="_blank"
                className="text-brand hover:underline"
              >
                MSA World
              </a>
              {" "}(Marcone Servicers Association), la principal asociación de
              la industria para contratistas de servicio de electrodomésticos.
              Nuestros técnicos completan capacitación continua a través de
              cursos de MSA World y actualizaciones de certificación OEM
              (Sub-Zero, Wolf, Miele, LG, Samsung, GE) &mdash; para que el
              camión que llega a su casa esté equipado para reparar el
              electrodoméstico que realmente tiene, no una hoja de
              especificaciones de hace cinco años.
            </p>
            <p>
              Hacia dónde vamos: otros seis a ocho técnicos sumándose a la
              flota durante los próximos 18 meses. Una huella comercial más
              amplia a través de la marca hermana. Y — la parte que no
              cambia — cada llamada de escalación me llega a mí
              personalmente. Ese es el estándar de operación. Eso es lo que
              nos enseñaron {COMPANY.socialProof.repairsCompleted} servicios a
              comprometer.
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
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-tint/[0.04] px-5 py-3 text-sm font-semibold text-foreground hover:bg-tint/[0.07]"
            >
              <Users className="size-4 text-brand" aria-hidden />
              Conozca a los {COMPANY.socialProof.technicians} técnicos
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/20">
        <div className="container-prose py-16 sm:py-20">
          <div className="mb-10 max-w-2xl">
            <span className="eyebrow">En cifras</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Cómo se ve Berne Appliance Repair hoy.
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
              sub="Gratuita si nos da luz verde con la reparación"
            />
            <Stat
              icon={<Clock3 className="size-5 text-brand" aria-hidden />}
              value="Mismo día"
              label="Estándar de despacho"
              sub="Abierto 7 días · 7 AM – 9 PM"
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
              Berne Appliance Repair despacha en todo Miami-Dade, Broward y Palm Beach —
              desde Homestead al sur hasta Jupiter al norte. Vecindarios
              prioritarios incluyen Bal Harbour, Sunny Isles, Fisher Island,
              Key Biscayne, Coral Gables, Pinecrest, Aventura, Hollywood,
              Fort Lauderdale, Boca Raton, Delray Beach y West Palm Beach.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/es/areas"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-tint/[0.04] px-5 py-3 text-sm font-semibold text-foreground hover:bg-tint/[0.07]"
              >
                <MapPin className="size-4 text-brand" aria-hidden />
                Ver todas las ciudades
              </Link>
              <Link
                href="/es/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-tint/[0.04] px-5 py-3 text-sm font-semibold text-foreground hover:bg-tint/[0.07]"
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
