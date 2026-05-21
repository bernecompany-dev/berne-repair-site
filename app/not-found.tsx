import Link from "next/link";
import { CTARow } from "@/components/site/cta-row";

// Custom 404 — surfaces popular destinations + an internal search so a missing
// URL still routes the user somewhere useful. Sitelink searchbox eligibility
// comes from the root WebSite + SearchAction JSON-LD emitted via lib/seo.ts
// websiteJsonLd() (mounted in app/layout.tsx).
export default function NotFound() {
  return (
    <section className="container-prose flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
        404
      </div>
      <h1 className="heading-hero mt-6">Page not found.</h1>
      <p className="mt-4 max-w-lg text-lg text-muted-foreground">
        That page doesn&apos;t exist — but our technicians do. Call us, book
        online, or head back home.
      </p>
      <div className="mt-8">
        <CTARow size="md" />
      </div>

      {/* Internal search — submits to home with ?q=. The URL pattern matches
          the WebSite SearchAction target, which is what Google reads when
          deciding whether to render a sitelinks searchbox in the SERP. */}
      <form
        action="/"
        method="get"
        role="search"
        aria-label="Site search"
        className="mt-8 flex w-full max-w-md items-center gap-2"
      >
        <label htmlFor="berne-404-search" className="sr-only">
          Search Berne Appliance Repair
        </label>
        <input
          type="search"
          name="q"
          id="berne-404-search"
          placeholder="Search e.g. refrigerator, Wolf, Miami…"
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
        <button
          type="submit"
          className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand/90"
        >
          Search
        </button>
      </form>

      <nav
        aria-label="Popular destinations"
        className="mt-10 w-full max-w-3xl"
      >
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Popular destinations
        </h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          {[
            { href: "/", label: "Home" },
            { href: "/services", label: "All services" },
            { href: "/services/refrigerator-repair", label: "Refrigerator repair" },
            { href: "/services/dishwasher-repair", label: "Dishwasher repair" },
            { href: "/services/washer-repair", label: "Washer repair" },
            { href: "/services/dryer-repair", label: "Dryer repair" },
            { href: "/areas", label: "Service areas" },
            { href: "/brands", label: "Brands we service" },
            { href: "/blog", label: "Repair guides" },
            { href: "/team", label: "Our team" },
            { href: "/about", label: "About Berne" },
            { href: "/contact", label: "Contact dispatch" },
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

      <Link href="/" className="mt-8 text-sm text-brand hover:underline">
        ← Back to home
      </Link>
    </section>
  );
}
