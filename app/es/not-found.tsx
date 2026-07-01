import Link from "next/link";
import { CTARow } from "@/components/site/cta-row";

// Spanish 404 — mirrors EN copy at /not-found.tsx. Same search form + popular
// destinations, all linking to /es counterparts where they exist.
export default function NotFound() {
  return (
    <section className="container-prose flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
        404 · Página no encontrada
      </div>
      <h1 className="heading-hero mt-6">Te ayudamos a regresar al rumbo.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Esa página no existe — pero nuestros técnicos sí. Elige un destino,
        busca, o llámanos y te dirigimos.
      </p>

      <div className="mt-8 w-full max-w-xl">
        {/* 404 has no #lead-form anchor — point Book at the ES dispatch page. */}
        <CTARow size="md" locale="es" bookHref="/es/request-dispatch" />
      </div>

      <form
        action="/es/search"
        method="get"
        role="search"
        aria-label="Búsqueda del sitio"
        className="mt-8 flex w-full max-w-md items-center gap-2"
      >
        <label htmlFor="berne-404-search-es" className="sr-only">
          Buscar Berne Appliance Repair
        </label>
        <input
          type="search"
          name="q"
          id="berne-404-search-es"
          placeholder="Buscar p.ej. refrigerador, Wolf, Miami…"
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
        <button
          type="submit"
          className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand/90"
        >
          Buscar
        </button>
      </form>

      <nav
        aria-label="Destinos populares"
        className="mt-12 w-full max-w-3xl"
      >
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Destinos populares
        </h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          {[
            { href: "/es", label: "Inicio" },
            { href: "/es/services", label: "Todos los servicios" },
            { href: "/es/services/refrigerator-repair", label: "Refrigeradores" },
            { href: "/es/services/dishwasher-repair", label: "Lavavajillas" },
            { href: "/es/services/washer-repair", label: "Lavadoras" },
            { href: "/es/services/dryer-repair", label: "Secadoras" },
            { href: "/es/areas", label: "Áreas de servicio" },
            { href: "/es/brands", label: "Marcas" },
            { href: "/blog", label: "Guías de reparación" },
            { href: "/es/team", label: "Nuestro equipo" },
            { href: "/es/about", label: "Sobre Berne" },
            { href: "/es/request-dispatch", label: "Despacho" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-md border border-border bg-card px-3 py-2 text-left hover:border-brand/40 hover:bg-brand/5"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Link
        href="/es"
        className="mt-10 text-sm text-brand hover:underline"
      >
        ← Volver al inicio
      </Link>
    </section>
  );
}
