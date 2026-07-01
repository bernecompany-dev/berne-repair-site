import Link from "next/link";
import {
  Gem,
  BadgeDollarSign,
  ShieldCheck,
  ArrowRight,
  ScrollText,
  Scale,
  Gauge,
  Sparkles,
} from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { FAQSection } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { RepairReplaceCalculator } from "@/components/site/repair-replace-calculator";
import { COMPANY } from "@/data/company";
import {
  LUX_CATEGORIES,
  LUX_STATS,
  LUX_FAQS,
  LUX_METHODOLOGY,
  DIAGNOSTIC_BENCHMARKS,
} from "@/data/luxury-cost-guide";
import {
  absoluteUrl,
  articleJsonLd,
  datasetJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";

type Locale = "en" | "es";

export const COST_GUIDE_SLUG = "resources/luxury-appliance-repair-cost-guide";
export const COST_GUIDE_PUBLISHED = "2026-06-29";
export const COST_GUIDE_MODIFIED = "2026-06-29";

const T = {
  en: {
    home: "Home",
    resources: "Resources",
    badge: `$${COMPANY.serviceCallPrice} diagnostic · credited to repair`,
    badge2: "Factory-trained · EPA 608 · white-glove",
    h1a: "Luxury Appliance Repair & Care",
    h1b: "Cost Guide.",
    lede: "Real repair-cost ranges, common failures, and a transparent repair-vs-replace model for the built-in equipment in South Florida's finest kitchens — Sub-Zero, Wolf, Miele, Thermador, Viking, Gaggenau, and Liebherr. Built from our own service-desk figures, not guesswork.",
    statsEyebrow: "By the numbers",
    tablesEyebrow: "Cost by category",
    tablesHeading: "What luxury repairs actually cost.",
    tablesLede:
      "Typical parts-plus-labor ranges by category and failure. Ranges exclude the $59 diagnostic and assume the part is available; the firm number always comes from the on-site diagnosis with a written quote.",
    colSymptom: "Symptom",
    colPart: "Likely part / system",
    colCode: "Common code",
    colCost: "Typical repair",
    replaces: "Comparable replacement (installed)",
    life: "Expected service life",
    visit: "Visit this hub",
    ruleEyebrow: "The decision",
    ruleHeading: "Repair or replace? The luxury rule.",
    ruleP1:
      "The textbook advice is the 50% rule: if a repair costs more than half of a new unit, replace it. For luxury built-ins, that rule is wrong — it under-values repair.",
    ruleP2:
      "We apply a higher break-even, around 55–60% of replacement, for three reasons:",
    rulePoints: [
      "Built-ins are engineered to be rebuilt — sealed systems, elements, pumps, brew units, and boards are serviceable parts, which is part of why they cost what they do.",
      "They last far longer. A built-in Sub-Zero can run 20+ years, so a repair buys many more years than the same fix on a mass-market unit.",
      "Replacement isn't just the appliance. A built-in or panel-ready swap drags in cabinetry matching, installation, and a multi-week lead time.",
    ],
    ruleP3:
      "The further a unit is into its expected life, the lower that break-even drops. The calculator below applies exactly this logic to your brand, age, and quote.",
    benchEyebrow: "Diagnostic benchmarks",
    benchHeading: "The numbers our techs test against.",
    benchLede:
      "We diagnose with a meter, not a guess. These are the readings that separate a $40 part from a five-figure replacement.",
    methodEyebrow: "Methodology & credentials",
    methodHeading: "How this guide is built — and who built it.",
    relatedEyebrow: "Go deeper",
    relatedHeading: "Brand & service references.",
    relatedLede: "The hubs behind the numbers above.",
    faqSuffix: "Luxury repair cost — FAQ",
  },
  es: {
    home: "Inicio",
    resources: "Recursos",
    badge: `Diagnóstico de $${COMPANY.serviceCallPrice} · abonado a la reparación`,
    badge2: "Formados de fábrica · EPA 608 · guante blanco",
    h1a: "Guía de Costos de Reparación",
    h1b: "de Electrodomésticos de Lujo.",
    lede: "Rangos reales de costo de reparación, fallas comunes y un modelo transparente de reparar-vs-reemplazar para el equipo empotrado de las mejores cocinas del sur de Florida — Sub-Zero, Wolf, Miele, Thermador, Viking, Gaggenau y Liebherr. Construida con las cifras de nuestro propio taller, no con suposiciones.",
    statsEyebrow: "En cifras",
    tablesEyebrow: "Costo por categoría",
    tablesHeading: "Lo que cuesta de verdad una reparación de lujo.",
    tablesLede:
      "Rangos típicos de piezas más mano de obra por categoría y falla. Excluyen el diagnóstico de $59 y asumen que la pieza está disponible; el número firme siempre sale del diagnóstico a domicilio con presupuesto por escrito.",
    colSymptom: "Síntoma",
    colPart: "Pieza / sistema probable",
    colCode: "Código común",
    colCost: "Reparación típica",
    replaces: "Reemplazo comparable (instalado)",
    life: "Vida útil esperada",
    visit: "Ver este hub",
    ruleEyebrow: "La decisión",
    ruleHeading: "¿Reparar o reemplazar? La regla del lujo.",
    ruleP1:
      "El consejo de manual es la regla del 50%: si una reparación cuesta más de la mitad de una unidad nueva, reemplácela. Para empotrados de lujo, esa regla está equivocada — subestima la reparación.",
    ruleP2:
      "Aplicamos un punto de equilibrio más alto, alrededor del 55–60% del reemplazo, por tres razones:",
    rulePoints: [
      "Los empotrados están hechos para reconstruirse — sistemas sellados, resistencias, bombas, grupos de café y placas son piezas reparables, parte de por qué cuestan lo que cuestan.",
      "Duran mucho más. Un Sub-Zero empotrado puede durar más de 20 años, así que una reparación da muchos más años que el mismo arreglo en una unidad común.",
      "Reemplazar no es solo el electrodoméstico. Un cambio empotrado o panel-ready arrastra igualar la carpintería, la instalación y semanas de espera.",
    ],
    ruleP3:
      "Cuanto más avanzada está una unidad en su vida útil, más baja ese punto de equilibrio. La calculadora de abajo aplica exactamente esta lógica a su marca, antigüedad y presupuesto.",
    benchEyebrow: "Referencias de diagnóstico",
    benchHeading: "Las cifras contra las que miden nuestros técnicos.",
    benchLede:
      "Diagnosticamos con multímetro, no adivinando. Estas son las lecturas que separan una pieza de $40 de un reemplazo de cinco cifras.",
    methodEyebrow: "Metodología y credenciales",
    methodHeading: "Cómo se construye esta guía — y quién la construyó.",
    relatedEyebrow: "Profundice",
    relatedHeading: "Referencias de marcas y servicios.",
    relatedLede: "Los hubs detrás de las cifras de arriba.",
    faqSuffix: "Costo de reparación de lujo — Preguntas frecuentes",
  },
} as const;

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export function LuxuryCostGuidePage({ locale = "en" }: { locale?: Locale }) {
  const t = T[locale];
  const base = locale === "es" ? "/es" : "";
  const path = `${base}/${COST_GUIDE_SLUG}`;
  const url = absoluteUrl(path);
  const localizeHref = (href: string) => (locale === "es" ? `/es${href}` : href);

  const crumbs = [
    { name: t.home, href: locale === "es" ? "/es" : "/" },
    { name: t.resources, href: `${base}/resources` },
    {
      name: locale === "es" ? "Guía de costos de lujo" : "Luxury cost guide",
      href: path,
    },
  ];

  const faqsForSchema = LUX_FAQS.map((q) => ({
    question: q.question[locale],
    answer: q.answer[locale],
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.67 0.21 252 / 0.25), transparent)",
          }}
        />
        <div className="container-prose pt-14 pb-14 sm:pt-20 sm:pb-16">
          <nav
            className="mb-6 flex items-center gap-2 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href={crumbs[0].href} className="hover:text-foreground">
              {t.home}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{t.resources}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <BadgeDollarSign className="size-3.5" aria-hidden />
              {t.badge}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden />
              {t.badge2}
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            {t.h1a}{" "}
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              {t.h1b}
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t.lede}
          </p>

          <div className="mt-8">
            <CTARow size="lg" locale={locale} bookHref={`${base}/request-dispatch`} />
          </div>
        </div>
      </section>

      {/* Cited stats */}
      <section className="border-b border-border/60 bg-background/40">
        <div className="container-prose py-12 sm:py-16">
          <span className="eyebrow">
            <Sparkles className="mr-1.5 inline size-3.5" aria-hidden />
            {t.statsEyebrow}
          </span>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LUX_STATS.map((s) => (
              <div
                key={s.value}
                className="rounded-2xl border border-border bg-card/40 p-5"
              >
                <div className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">
                  {s.value}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.label[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost tables */}
      <section className="container-prose py-16 sm:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">
            <BadgeDollarSign className="mr-1.5 inline size-3.5" aria-hidden />
            {t.tablesEyebrow}
          </span>
          <h2 className="heading-section mt-3">{t.tablesHeading}</h2>
          <p className="mt-4 text-muted-foreground">{t.tablesLede}</p>
        </div>

        <div className="mt-10 space-y-12">
          {LUX_CATEGORIES.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-24">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
                    <Gem className="size-5 text-brand" aria-hidden />
                    {cat.name[locale]}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    {cat.blurb[locale]}
                  </p>
                </div>
                <Link
                  href={localizeHref(cat.href)}
                  className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-semibold text-brand hover:underline sm:self-end"
                >
                  {t.visit}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                <span>
                  <span className="font-semibold text-foreground/80">{t.replaces}:</span>{" "}
                  {usd(cat.replacementLow)}–{usd(cat.replacementHigh)}
                </span>
                <span>
                  <span className="font-semibold text-foreground/80">{t.life}:</span>{" "}
                  {cat.expectedLifeYears}{locale === "es" ? " años" : " yrs"}
                </span>
              </div>

              <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-card/50 text-left">
                      <th scope="col" className="px-4 py-3 font-semibold text-foreground/80">{t.colSymptom}</th>
                      <th scope="col" className="px-4 py-3 font-semibold text-foreground/80">{t.colPart}</th>
                      <th scope="col" className="px-4 py-3 font-semibold text-foreground/80">{t.colCode}</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold text-foreground/80">{t.colCost}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.rows.map((r, i) => (
                      <tr
                        key={i}
                        className="border-b border-border/60 last:border-0 even:bg-card/20"
                      >
                        <td className="px-4 py-3 text-foreground/90">{r.symptom[locale]}</td>
                        <td className="px-4 py-3 text-muted-foreground">{r.part[locale]}</td>
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                          {r.code || "—"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-foreground">
                          {usd(r.repairLow)}–{usd(r.repairHigh)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Repair-vs-replace rule */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <div>
              <span className="eyebrow">
                <Scale className="mr-1.5 inline size-3.5" aria-hidden />
                {t.ruleEyebrow}
              </span>
              <h2 className="heading-section mt-3">{t.ruleHeading}</h2>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>{t.ruleP1}</p>
              <p className="text-foreground/90">{t.ruleP2}</p>
              <ul className="space-y-3">
                {t.rulePoints.map((p, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card/40 p-4"
                  >
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand/15 text-xs font-bold text-brand">
                      {i + 1}
                    </span>
                    <span className="text-sm text-foreground/90">{p}</span>
                  </li>
                ))}
              </ul>
              <p>{t.ruleP3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive calculator */}
      <RepairReplaceCalculator locale={locale} />

      {/* Diagnostic benchmarks */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <Gauge className="mr-1.5 inline size-3.5" aria-hidden />
              {t.benchEyebrow}
            </span>
            <h2 className="heading-section mt-3">{t.benchHeading}</h2>
            <p className="mt-4 text-muted-foreground">{t.benchLede}</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DIAGNOSTIC_BENCHMARKS.map((b) => (
              <div
                key={b.value}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-card/40 p-5"
              >
                <span className="font-mono text-lg font-bold text-brand">{b.value}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {b.metric[locale]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology / E-E-A-T */}
      <section className="container-prose py-16 sm:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">
            <ScrollText className="mr-1.5 inline size-3.5" aria-hidden />
            {t.methodEyebrow}
          </span>
          <h2 className="heading-section mt-3">{t.methodHeading}</h2>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {LUX_METHODOLOGY.map((m, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card/40 p-5"
            >
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
              <span className="text-sm leading-relaxed text-foreground/90">{m[locale]}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          <Link href={localizeHref("/credentials")} className="text-brand hover:underline">
            {locale === "es"
              ? "Ver licencias, certificación EPA 608 y seguro →"
              : "See our licenses, EPA 608 certification & insurance →"}
          </Link>
        </p>
      </section>

      {/* Related hubs */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="eyebrow">{t.relatedEyebrow}</span>
            <h2 className="heading-section mt-3">{t.relatedHeading}</h2>
            <p className="mt-4 text-muted-foreground">{t.relatedLede}</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LUX_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={localizeHref(cat.href)}
                className="group flex h-full flex-col gap-2 rounded-xl border border-border bg-card/40 p-5 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold leading-snug text-foreground/90 group-hover:text-brand">
                    {cat.name[locale]}
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand"
                    aria-hidden
                  />
                </span>
                <span className="text-xs leading-relaxed text-muted-foreground">
                  {cat.brands.slice(0, 5).join(" · ")}
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            <Link href={localizeHref("/services")} className="text-brand hover:underline">
              {locale === "es" ? "Todos los servicios de reparación →" : "All repair services →"}
            </Link>
          </p>
        </div>
      </section>

      <FAQSection
        faqs={faqsForSchema}
        title={t.faqSuffix}
      />

      <Contact locale={locale} />
      <CTABand locale={locale} />

      <JsonLd
        data={[
          articleJsonLd({
            url,
            headline:
              locale === "es"
                ? "Guía de Costos de Reparación de Electrodomésticos de Lujo"
                : "Luxury Appliance Repair & Care Cost Guide",
            description: t.lede,
            datePublished: COST_GUIDE_PUBLISHED,
            dateModified: COST_GUIDE_MODIFIED,
            authorName: "Eugene Berne, Owner — Berne Appliance Repair",
            locale,
            keywords: [
              "luxury appliance repair cost",
              "Sub-Zero repair cost",
              "Wolf range repair",
              "Miele dishwasher repair",
              "repair vs replace appliance",
            ],
          }),
          datasetJsonLd({
            url,
            name:
              locale === "es"
                ? "Rangos de costo de reparación de electrodomésticos de lujo (sur de Florida)"
                : "Luxury appliance repair cost ranges (South Florida)",
            description:
              locale === "es"
                ? "Rangos de costo de reparación por categoría y falla para electrodomésticos empotrados de lujo (Sub-Zero, Wolf, Miele, Thermador, Viking, Gaggenau, Liebherr), con vida útil esperada, costo de reemplazo y referencias de diagnóstico."
                : "Repair-cost ranges by category and failure mode for luxury built-in appliances (Sub-Zero, Wolf, Miele, Thermador, Viking, Gaggenau, Liebherr), with expected service life, replacement cost, and diagnostic benchmarks.",
            dateModified: COST_GUIDE_MODIFIED,
            locale,
            keywords: [
              "appliance repair cost",
              "luxury appliances",
              "Sub-Zero",
              "Wolf",
              "Miele",
              "Thermador",
              "Viking",
              "Gaggenau",
              "repair vs replace",
            ],
            variables: [
              "Symptom",
              "Likely part or system",
              "Common error code",
              "Typical repair cost (USD)",
              "Replacement cost (USD)",
              "Expected service life (years)",
            ],
          }),
          faqJsonLd(faqsForSchema, locale),
          breadcrumbJsonLd(crumbs),
        ]}
      />
    </>
  );
}
