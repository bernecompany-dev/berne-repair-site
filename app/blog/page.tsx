import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { publishedArticles } from "@/lib/blog/articles";
import { absoluteUrl, breadcrumbJsonLd, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { COMPANY } from "@/data/company";

export const revalidate = 3600;

const PAGE_TITLE = "Berne Appliance Repair Field Notes — Premium Repair Blog";
const PAGE_DESCRIPTION =
  "Field-tested guidance from working technicians on Sub-Zero, Wolf, Viking, Thermador, and Miele appliance service across South Florida.";

export const metadata: Metadata = {
  // PAGE_TITLE already leads with the brand — `absolute` skips the layout
  // template so "Berne Appliance Repair" doesn't appear twice.
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/blog",
    languages: {
      "en-US": absoluteUrl("/blog"),
      "x-default": absoluteUrl("/blog"),
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: absoluteUrl("/blog"),
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
};

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const articles = publishedArticles();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
  ];

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/blog#blog"),
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: absoluteUrl("/blog"),
    publisher: { "@id": absoluteUrl("/#business") },
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: absoluteUrl(`/blog/${a.slug}`),
      datePublished: a.publishedAt.toISOString(),
      author: { "@type": "Person", name: a.author },
    })),
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
        <div className="container-prose pt-14 pb-14 sm:pt-20 sm:pb-16">
          <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Blog</span>
          </nav>

          <span className="eyebrow">Field notes</span>
          <h1 className="heading-hero mt-3 max-w-3xl">
            Premium appliance repair, written by the techs who do it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Owner-focused guides on Sub-Zero, Wolf, Viking, Thermador, and Miele service. Written for South Florida — salt air, condo high-rises, hurricane season, and all.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            $59 service call. Call {COMPANY.phone.display} for same-day diagnostic in Miami-Dade, Broward, and Palm Beach.
          </p>
        </div>
      </section>

      <section className="container-prose py-16 sm:py-20">
        {articles.length === 0 ? (
          <p className="text-muted-foreground">No published articles yet. Check back soon.</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/blog/${a.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card/40 p-6 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="size-3.5 text-brand" aria-hidden />
                    <time dateTime={a.publishedAt.toISOString()}>{formatDate(a.publishedAt)}</time>
                    <span aria-hidden>·</span>
                    <span>{a.readingMinutes} min read</span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground group-hover:text-brand">
                    {a.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {a.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand">
                    Read the article
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <CTABand />

      <JsonLd data={[blogJsonLd, breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
