import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { GoogleAnalytics } from "@/components/site/google-analytics";
import { GoogleAdsTag } from "@/components/site/google-ads-tag";
import { MicrosoftUetTag } from "@/components/site/microsoft-uet-tag";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SkipToContent } from "@/components/site/skip-to-content";
import { StickyCTA } from "@/components/site/sticky-cta";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { LangSync } from "@/components/site/lang-sync";
import { JsonLd } from "@/components/site/json-ld";
import { MetaPixel } from "@/components/site/meta-pixel";
import { Clarity } from "@/components/site/clarity";
import { AnalyticsEvents } from "@/components/site/analytics-events";
import { localBusinessJsonLd, websiteJsonLd, organizationJsonLd } from "@/lib/seo";
import { COMPANY } from "@/data/company";
import "./globals.css";

// Geist Sans is the LCP-critical font: the hero <h1> (the mobile LCP element
// on every page) renders in it, so it keeps the default preload.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// preload: false — Geist Mono only renders tiny accent labels (hero tech
// count, process-step numbers, search URLs), never the LCP element. Its
// preloaded woff2 (~23KB, High priority) competed with the LCP-critical
// CSS + Geist Sans for mobile bandwidth in the first-paint window (SEO
// round-4 LCP fix). display:swap shows the size-adjusted fallback until it
// arrives.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// Intentional serif for the brand wordmarks (components/sections/brands.tsx,
// brand-specialists.tsx use `font-serif`). Without a loaded serif, Tailwind's
// stack fell back to ui-serif/Times — jarring inside the Geist design.
// Mapped to Tailwind's `font-serif` via --font-serif in app/globals.css.
// Variable font: omitting `weight` loads the full 400–900 axis (one file per
// style), covering the wordmarks' font-medium/font-bold + italic variants
// without synthesized faux styles.
// preload: false — Playfair renders only the below-the-fold brand wordmarks,
// but its two variable files (normal + italic, ~78KB combined) were preloaded
// at High priority into the critical first-paint window on every page,
// delaying the hero-H1 LCP resources on mobile (SEO round-4 LCP fix).
// display:swap covers the late arrival; the wordmarks are never the LCP.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

// Pinned to production www origin (see lib/seo.ts) so metadataBase — and thus
// every relative canonical/og:url — resolves to the self-referential www host,
// not the misconfigured non-www NEXT_PUBLIC_SITE_URL env value.
const SITE_URL = "https://www.berne-repair.com";

// Default OG image — points at Next's dynamic /opengraph-image route so
// every page that does NOT explicitly set `openGraph.images` still emits a
// valid 1200x630 PNG. Per Next.js semantics, the `openGraph` key is replaced
// (not merged) by child segments, so any page that sets its own openGraph
// block must also include this default in its `images:` array. Convenience
// re-export in `lib/seo.ts` (DEFAULT_OG_IMAGE) keeps page metadata DRY.
const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Berne Appliance Repair — premium appliance repair across South Florida",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Berne Appliance Repair — Same-Day Service · South Florida",
    template: "%s · Berne Appliance Repair",
  },
  description:
    "Same-day appliance repair across Miami-Dade, Broward & Palm Beach. $59 service call. 18 W-2 techs, licensed. Sub-Zero, Wolf, Viking, Miele.",
  applicationName: COMPANY.legalName,
  openGraph: {
    type: "website",
    siteName: COMPANY.legalName,
    title: "Berne Appliance Repair — Premium Service in South Florida",
    description:
      "Same-day appliance repair across South Florida. $59 service call. Licensed & insured.",
    url: SITE_URL,
    locale: "en_US",
    images: [DEFAULT_OG_IMAGE],
  },
  // Card type ONLY — no title/description/images here. The `twitter` metadata
  // key inherits to every page that doesn't override it, so a hardcoded title
  // was emitting the generic home wording as twitter:title on all ~1800 pages
  // (round-3 audit). With only `card` set, X/Twitter falls back to each page's
  // own og:title / og:description / og:image while keeping the large-image
  // card. Blog posts still define their full twitter block per post.
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  verification: {
    google: "qiR-HdKxkA8_Tzu4v15iTY_RW3UM0Lf0O5hI-geXe0g",
  },
  other: {
    "facebook-domain-verification": "lfwrqrca4g3ex5peub7im3b56wytbt",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint to apply the persisted/visitor theme and avoid a
// flash of the wrong scheme (FOUC). DEFAULT is LIGHT: we only switch to dark
// when the visitor explicitly stored that choice. `prefers-color-scheme` is
// intentionally NOT auto-applied so first-time visitors always see light.
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"){document.documentElement.classList.add("dark");}else{document.documentElement.classList.remove("dark");}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // STATIC-GENERATION CONTRACT — do NOT read headers()/cookies() here.
  //
  // Any per-request API (headers, cookies, connection, …) in the ROOT layout
  // opts EVERY route on the site out of static prerendering: Vercel then
  // serves all pages with `Cache-Control: private, no-cache, no-store` and
  // cold TTFB jumps from ~120ms (prerendered) to ~2.4s (lambda). This
  // happened once already (an `await headers()` call to sniff /es for
  // `<html lang>`) — do not reintroduce it.
  //
  // `<html lang>` strategy instead:
  //   - statically prerendered as `lang="en-US"` (this file),
  //   - `app/es/layout.tsx` flips it to `es-US` via a tiny inline script that
  //     runs during HTML parsing, before first paint, on every /es page,
  //   - `LangSync` keeps the attribute correct on client-side navigation
  //     between locales.
  // SEO is carried by per-page hreflang alternates (lib/seo.ts), which do not
  // depend on the html attribute.
  return (
    <html
      lang="en-US"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/*
          No-FOUC theme bootstrap. Must run before the browser paints, so it
          lives as an inline script in <head> ahead of the stylesheet-driven
          first paint. Default is light; only an explicit stored "dark" flips
          the <html> class. See viewport.themeColor + components/site/theme-toggle.
        */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/*
          OpenAI/ChatGPT Ads attribution: capture the `oppref` click ref from
          the landing URL into a 90-day cookie so the server-side Conversions
          API (bzr.openai.com) can tie a lead back to the ad click. Runs early
          and ungated (independent of analytics consent — it's first-party
          attribution, no third-party call). Harmless when the param is absent.
        */}
        <script dangerouslySetInnerHTML={{ __html: `try{var o=new URLSearchParams(location.search).get('oppref');if(o){document.cookie='_oppref='+encodeURIComponent(o)+';path=/;max-age=7776000;samesite=lax'}}catch(e){}` }} />
        {/*
          Core Web Vitals — dns-prefetch ONLY (no preconnect) for analytics
          origins. All three loaders (GA4 lib, Meta Pixel, Clarity) are
          strategy="lazyOnload", i.e. they fetch at browser idle, seconds
          after LCP. A full preconnect would open 3 TCP+TLS handshakes during
          the critical first-paint window and compete with the LCP resources
          (fonts, hero image) for mobile bandwidth/CPU — for connections that
          sit unused until idle. DNS resolution alone is nearly free and
          still shaves the lookup when the lazy scripts eventually load.
        */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
        <link rel="dns-prefetch" href="//www.clarity.ms" />
        <link rel="dns-prefetch" href="//cdn.callrail.com" />
        {/* CallRail dynamic number insertion (swap.js) — атрибуция звонков по источнику */}
        <script async src="//cdn.callrail.com/companies/879510798/bcc465bc235b37a3282e/12/swap.js"></script>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LangSync />
        <SkipToContent />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main>
        <SiteFooter />
        <StickyCTA />
        <WhatsAppFab />
        <JsonLd data={[organizationJsonLd(), localBusinessJsonLd(), websiteJsonLd()]} />
        {/*
          AnalyticsEvents stays mounted in every environment: it only wires
          delegated click listeners onto window.gtag (a no-op when GA is
          absent) and exposes the __aeMounted hydration flag the e2e specs
          wait on. The actual third-party loaders (GA4, Meta Pixel, Clarity)
          are production-gated inside their own components so `next dev`
          localhost traffic never pollutes the GA4 property (it was ~27% of
          "users" before gating).
        */}
        <AnalyticsEvents />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? "G-5HM8N741LM"} />
        {/*
          Google Ads conversion tracking (tag AW-18232464152, baked-in default
          with NEXT_PUBLIC_GADS_* override). Includes the website call tracking
          config — Google swaps the displayed phone number for ad-click
          visitors; no tel: click listener needed.
        */}
        <GoogleAdsTag />
        {/*
          Microsoft Advertising UET (tag 97251280) + phone_click event for
          the "Phone click" conversion goal — Bing has no number-swap call
          tracking, so tel: clicks are the call proxy.
        */}
        <MicrosoftUetTag />
        <MetaPixel />
        <Clarity />
      </body>
    </html>
  );
}
