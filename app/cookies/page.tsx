import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/data/company";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Which cookies ${COMPANY.legalName} sets, what they do, and how to disable them.`,
  alternates: {
    canonical: "/cookies",
    languages: {
      "en-US": absoluteUrl("/cookies"),
      "es-US": absoluteUrl("/es/cookies"),
      "x-default": absoluteUrl("/cookies"),
    },
  },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <article className="container-prose py-16 sm:py-20 max-w-3xl prose-invert">
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span aria-hidden>/</span>
        <span className="text-foreground/80">Cookies</span>
      </nav>
      <h1 className="text-4xl font-semibold tracking-tight">Cookie Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: 2026-05-20</p>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90">
        <p>
          This page explains what cookies and similar storage technologies{" "}
          {COMPANY.legalName} uses on{" "}
          <a href={COMPANY.url} className="text-brand hover:underline">{COMPANY.url}</a>{" "}
          and how to control them. We keep cookie use minimal: we do not run
          third-party advertising trackers.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">What cookies are</h2>
        <p>
          Cookies are small text files that a website stores in your browser.
          They let the site remember preferences (such as language), measure
          aggregate traffic, and protect forms from automated abuse. We also
          use related browser storage (localStorage, sessionStorage) for the
          same purposes.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Cookies we set</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Essential</strong> — anti-spam protection on the lead form
            (a one-time token), and a routing cookie that prevents duplicate
            submissions. Set by us, cannot be disabled without breaking the
            form.
          </li>
          <li>
            <strong>Functional</strong> — your language choice (English or
            Spanish) is remembered in localStorage so we serve the correct
            version on return visits. No third party reads it.
          </li>
          <li>
            <strong>Analytics</strong> — Google Analytics 4 sets first-party
            cookies (<code>_ga</code>, <code>_ga_*</code>) with anonymized IP
            so we can see aggregate page views, sources of traffic, and which
            services customers look up. No personal identifiers are sent.
          </li>
          <li>
            <strong>Map embeds</strong> — Google Maps may set its own cookies
            when a map loads on city pages. Disable by blocking third-party
            cookies; the map will simply not render.
          </li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">What we do not use</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>No Facebook Pixel or Meta tracking.</li>
          <li>No retargeting / advertising cookies.</li>
          <li>No cross-site tracking pixels.</li>
          <li>No data sales of any kind.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">How to control cookies</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Block or delete cookies in your browser settings (Chrome, Safari, Firefox, Edge — all support per-site control).</li>
          <li>Enable "Do Not Track" or browser-level "Global Privacy Control" — we honor both.</li>
          <li>Opt out of Google Analytics by installing the official <a className="text-brand hover:underline" href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">GA opt-out extension</a>.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Updates</h2>
        <p>
          If we add or remove cookies we will update this page. See{" "}
          <Link href="/privacy" className="text-brand hover:underline">Privacy Policy</Link>{" "}
          for the full picture of what we collect and why.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Contact</h2>
        <p>
          Questions: email{" "}
          <a href={`mailto:${COMPANY.email.public}`} className="text-brand hover:underline">{COMPANY.email.public}</a>{" "}
          or call{" "}
          <a href={`tel:${COMPANY.phone.tel}`} className="text-brand hover:underline">{COMPANY.phone.display}</a>.
        </p>
      </div>
    </article>
  );
}
