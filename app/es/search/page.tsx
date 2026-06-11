import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { kindLabelEs, search, toEsUrl } from "@/lib/search-index";

// Spanish search results — uses the same index as /search but re-prefixes
// EN URLs to /es/* for routes that exist in both locales. Blog stays EN-only
// (no /es/blog tree today). Noindex like the EN version.
export const metadata: Metadata = {
  // Absolute — brand already in the string; layout template would double it.
  title: { absolute: "Buscar — Berne Appliance Repair" },
  description:
    "Buscar Berne Appliance Repair — servicios, marcas, áreas de servicio y guías técnicas en todo el sur de Florida.",
  alternates: { canonical: "/es/search" },
  robots: { index: false, follow: true },
};

export const dynamic = "force-dynamic";

type SP = { q?: string | string[] };

function highlight(text: string, q: string): string {
  if (!q) return text;
  const esc = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(`(${esc})`, "ig"), "<mark>$1</mark>");
}

const POPULAR_ES = [
  { href: "/es/services/refrigerator-repair", label: "Refrigeradores" },
  { href: "/es/services/washer-repair", label: "Lavadoras" },
  { href: "/es/services/dryer-repair", label: "Secadoras" },
  { href: "/es/services/dishwasher-repair", label: "Lavavajillas" },
  { href: "/es/brands", label: "Marcas" },
  { href: "/es/areas", label: "Áreas de servicio" },
  { href: "/blog", label: "Guías de reparación" },
  { href: "/es/request-dispatch", label: "Despacho" },
];

export default async function SearchPageEs({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const params = await searchParams;
  const raw = params.q;
  const q = (Array.isArray(raw) ? raw[0] : raw ?? "").trim();
  const hits = q ? search(q, 20) : [];

  return (
    <section className="container-prose py-16 sm:py-20">
      <div className="rounded-2xl border border-border/60 bg-card/60 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">
          Búsqueda
        </p>
        <h1 className="heading-hero mt-2 text-3xl sm:text-4xl">
          {q ? (
            <>
              Resultados para &ldquo;{q}&rdquo;
              <span className="ml-2 align-middle text-base font-medium text-muted-foreground">
                ({hits.length} resultado{hits.length === 1 ? "" : "s"})
              </span>
            </>
          ) : (
            "Buscar Berne Appliance Repair"
          )}
        </h1>

        <form
          action="/es/search"
          method="get"
          role="search"
          aria-label="Búsqueda del sitio"
          className="mt-5 flex w-full flex-wrap items-stretch gap-2"
        >
          <label htmlFor="berne-search-input-es" className="sr-only">
            Buscar
          </label>
          <input
            id="berne-search-input-es"
            type="search"
            name="q"
            defaultValue={q}
            placeholder="p.ej. refrigerador, Sub-Zero, Miami, hielera"
            className="min-w-[240px] flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
          <button
            type="submit"
            className="rounded-md bg-brand px-5 py-2 text-sm font-medium text-white hover:bg-brand/90"
          >
            Buscar
          </button>
        </form>

        <p className="mt-3 text-sm text-muted-foreground">
          O llama a despacho al{" "}
          <a href="tel:+17543454515" className="font-semibold text-brand hover:underline">
            (754) 345-4515
          </a>{" "}
          — visita de $59, aplicada a la reparación.
        </p>
      </div>

      {q === "" && (
        <p className="mt-8 text-sm text-muted-foreground">
          Escribe una marca, un electrodoméstico o una ciudad para encontrar
          servicios, guías y áreas de servicio en todo el sitio.
        </p>
      )}

      {q !== "" && hits.length === 0 && (
        <div className="mt-8 rounded-xl border border-dashed border-border/60 p-6">
          <h2 className="text-lg font-semibold">Sin resultados para &ldquo;{q}&rdquo;</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Prueba una marca (Sub-Zero, Wolf, Viking), un electrodoméstico
            (refrigerador, lavadora, lavavajillas) o una ciudad (Miami,
            Aventura, Coral Gables).
          </p>
        </div>
      )}

      {hits.length > 0 && (
        <ol className="mt-8 grid gap-3">
          {hits.map((h) => {
            const url = toEsUrl(h.url);
            return (
              <li
                key={`${h.kind}-${h.url}`}
                className="rounded-xl border border-border/60 bg-card p-5 transition hover:border-brand/40 hover:bg-brand/5"
              >
                <Link href={url} className="block">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand">
                    {kindLabelEs(h.kind)}
                  </div>
                  <h2
                    className="mt-1 text-lg font-semibold leading-snug"
                    dangerouslySetInnerHTML={{ __html: highlight(h.title, q) }}
                  />
                  <p
                    className="mt-1 text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: highlight(h.text, q) }}
                  />
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="font-mono">{url}</span>
                    <ArrowRight className="size-3 opacity-60" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      )}

      <nav aria-label="Destinos populares" className="mt-12 border-t border-border/60 pt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Destinos populares
        </h2>
        <ul className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
          {POPULAR_ES.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="block rounded-md border border-border bg-card px-3 py-2 hover:border-brand/40 hover:bg-brand/5"
              >
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
