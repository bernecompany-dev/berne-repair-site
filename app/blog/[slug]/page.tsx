import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import {
  ARTICLES,
  articleBySlug,
  isPublished,
  relatedArticles,
} from "@/lib/blog/articles";
import { renderMarkdown } from "@/lib/blog/render";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  blogPostingJsonLd,
  howToJsonLd,
  DEFAULT_OG_IMAGE,
} from "@/lib/seo";
import { HOWTO_BLUEPRINTS } from "@/lib/blog/howto-allowlist";
import { COMPANY } from "@/data/company";

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article || !isPublished(article)) return {};
  const url = absoluteUrl(`/blog/${article.slug}`);
  return {
    title: `${article.title} · Berne Appliance Repair`,
    description: article.description,
    alternates: {
      canonical: `/blog/${article.slug}`,
      languages: {
        "en-US": url,
        "x-default": url,
      },
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: "article",
      publishedTime: article.publishedAt.toISOString(),
      modifiedTime: article.updatedAt?.toISOString() ?? article.publishedAt.toISOString(),
      authors: [article.author],
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();
  if (!isPublished(article)) notFound();

  const related = relatedArticles(article, 3);
  const url = absoluteUrl(`/blog/${article.slug}`);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: article.title, href: `/blog/${article.slug}` },
  ];

  // Word count — strip markdown link/heading punctuation lightly for accuracy.
  const wordCount = article.body
    .replace(/[#*_`>\-]/g, " ")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const articleSchema = blogPostingJsonLd({
    url,
    headline: article.title,
    description: article.description,
    image: absoluteUrl("/og.png"),
    datePublished: article.publishedAt.toISOString(),
    dateModified:
      article.updatedAt?.toISOString() ?? article.publishedAt.toISOString(),
    authorName: article.author,
    articleSection: article.topic,
    wordCount,
    keywords: [article.topic],
  });

  const howtoBlueprint = HOWTO_BLUEPRINTS[article.slug];
  const howtoSchema = howtoBlueprint
    ? howToJsonLd({ url, ...howtoBlueprint })
    : null;

  const jsonLdNodes = howtoSchema
    ? [articleSchema, howtoSchema, breadcrumbJsonLd(crumbs)]
    : [articleSchema, breadcrumbJsonLd(crumbs)];

  return (
    <>
      <article>
        <header className="border-b border-border/60">
          <div className="container-prose pt-12 pb-10 sm:pt-16 sm:pb-12">
            <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <span aria-hidden>/</span>
              <Link href="/blog" className="hover:text-foreground">Blog</Link>
              <span aria-hidden>/</span>
              <span className="line-clamp-1 text-foreground/80">{article.title}</span>
            </nav>

            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl md:leading-[1.1]">
              {article.title}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {article.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-brand" aria-hidden />
                <time dateTime={article.publishedAt.toISOString()}>
                  {formatDate(article.publishedAt)}
                </time>
              </div>
              <span aria-hidden>·</span>
              <span>{article.readingMinutes} min read</span>
              <span aria-hidden>·</span>
              <span>{article.author}</span>
            </div>
          </div>
        </header>

        <div className="container-prose max-w-3xl py-12 sm:py-16">
          {renderMarkdown(article.body)}

          <aside className="mt-14 rounded-2xl border border-brand/30 bg-brand/[0.06] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Need a tech on this today?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              ${COMPANY.serviceCallPrice} service call. Factory-trained technicians for Sub-Zero, Wolf, Viking, Thermador, and Miele across Miami-Dade, Broward, and Palm Beach.
            </p>
            <a
              href={`tel:${COMPANY.phone.tel}`}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
            >
              <Phone className="size-4" aria-hidden />
              Call {COMPANY.phone.display}
            </a>
          </aside>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-border/60 bg-background/40">
          <div className="container-prose py-16">
            <span className="eyebrow">Keep reading</span>
            <h2 className="heading-section mt-3">Related field notes</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/blog/${a.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card/40 p-6 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                  >
                    <div className="text-xs text-muted-foreground">
                      <time dateTime={a.publishedAt.toISOString()}>{formatDate(a.publishedAt)}</time>
                    </div>
                    <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground group-hover:text-brand">
                      {a.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                      {a.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand">
                      Read
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CTABand />

      <JsonLd data={jsonLdNodes} />
    </>
  );
}
