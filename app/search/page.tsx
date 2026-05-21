import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { kindLabel, search } from "@/lib/search-index";

// Search results pages are deliberately noindex — Google explicitly asks
// site owners not to index internal search result URLs. We still emit a
// canonical to the same URL so any backlinks resolve cleanly.
export const metadata: Metadata = {
  title: "Search — Berne Appliance Repair",
  description:
    "Search Berne Appliance Repair — services, brands, service areas, and field-notes articles across South Florida.",
  robots: { index: false, follow: true },
};

// Force dynamic rendering — `q` is read at request time, no static cache.
export const dynamic = "force-dynamic";

type SP = { q?: string | string[] };

function highlight(text: string, q: string): string {
  if (!q) return text;
  // Escape regex specials in the query before constructing a pattern.
  const esc = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(`(${esc})`, "ig"), "<mark>$1</mark>");
}

const POPULAR = [
  { href: "/services/refrigerator-repair", label: "Refrigerator repair" },
  { href: "/services/washer-repair", label: "Washer repair" },
  { href: "/services/dryer-repair", label: "Dryer repair" },
  { href: "/services/dishwasher-repair", label: "Dishwasher repair" },
  { href: "/brands/sub-zero", label: "Sub-Zero specialist" },
  { href: "/brands/wolf", label: "Wolf specialist" },
  { href: "/areas", label: "Service areas" },
  { href: "/blog", label: "Field notes blog" },
];

export default async function SearchPage({
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
          Search
        </p>
        <h1 className="heading-hero mt-2 text-3xl sm:text-4xl">
          {q ? (
            <>
              Results for &ldquo;{q}&rdquo;
              <span className="ml-2 align-middle text-base font-medium text-muted-foreground">
                ({hits.length} match{hits.length === 1 ? "" : "es"})
              </span>
            </>
          ) : (
            "Search Berne Appliance Repair"
          )}
        </h1>

        <form
          action="/search"
          method="get"
          role="search"
          aria-label="Site search"
          className="mt-5 flex w-full flex-wrap items-stretch gap-2"
        >
          <label htmlFor="berne-search-input" className="sr-only">
            Search
          </label>
          <input
            id="berne-search-input"
            type="search"
            name="q"
            defaultValue={q}
            placeholder="e.g. refrigerator, Sub-Zero, Miami, ice maker"
            className="min-w-[240px] flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
          <button
            type="submit"
            className="rounded-md bg-brand px-5 py-2 text-sm font-medium text-white hover:bg-brand/90"
          >
            Search
          </button>
        </form>

        <p className="mt-3 text-sm text-muted-foreground">
          Or call dispatch at{" "}
          <a href="tel:+17543454515" className="font-semibold text-brand hover:underline">
            (754) 345-4515
          </a>{" "}
          — $59 service call, applied to the repair.
        </p>
      </div>

      {q === "" && (
        <p className="mt-8 text-sm text-muted-foreground">
          Type a brand, an appliance, or a city to find services, guides, and
          service areas across the site.
        </p>
      )}

      {q !== "" && hits.length === 0 && (
        <div className="mt-8 rounded-xl border border-dashed border-border/60 p-6">
          <h2 className="text-lg font-semibold">Nothing matched &ldquo;{q}&rdquo;</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a brand (Sub-Zero, Wolf, Viking), an appliance (refrigerator,
            washer, dishwasher, ice maker), or a city (Miami, Aventura, Coral
            Gables).
          </p>
        </div>
      )}

      {hits.length > 0 && (
        <ol className="mt-8 grid gap-3">
          {hits.map((h) => (
            <li
              key={`${h.kind}-${h.url}`}
              className="rounded-xl border border-border/60 bg-card p-5 transition hover:border-brand/40 hover:bg-brand/5"
            >
              <Link href={h.url} className="block">
                <div className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {kindLabel(h.kind)}
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
                  <span className="font-mono">{h.url}</span>
                  <ArrowRight className="size-3 opacity-60" />
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}

      <nav aria-label="Popular destinations" className="mt-12 border-t border-border/60 pt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Popular destinations
        </h2>
        <ul className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
          {POPULAR.map((p) => (
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
