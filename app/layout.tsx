import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SkipToContent } from "@/components/site/skip-to-content";
import { StickyCTA } from "@/components/site/sticky-cta";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { LangSync } from "@/components/site/lang-sync";
import { JsonLd } from "@/components/site/json-ld";
import { MetaPixel } from "@/components/site/meta-pixel";
import { Clarity } from "@/components/site/clarity";
import { localBusinessJsonLd, websiteJsonLd, organizationJsonLd } from "@/lib/seo";
import { COMPANY } from "@/data/company";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
  twitter: {
    card: "summary_large_image",
    title: "Berne Appliance Repair — Premium Service in South Florida",
    description:
      "Same-day appliance repair across South Florida. $59 service call.",
    images: [DEFAULT_OG_IMAGE.url],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Server-render the correct `<html lang>` for the current path. We rely on
  // `x-pathname` (Vercel) or a custom header injected by `next.config.ts` to
  // know whether we're on /es. Falls back to `en-US` when the header is
  // absent (e.g. local dev without the rewrite). `LangSync` keeps the lang
  // attribute in sync on client navigation between locales.
  const h = await headers();
  const pathname =
    h.get("x-pathname") ??
    h.get("x-invoke-path") ??
    h.get("next-url") ??
    "/";
  const lang = pathname.startsWith("/es") ? "es-US" : "en-US";

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
          Core Web Vitals — open TCP+TLS to the third-party origins we contact
          on every page render in parallel with HTML parsing. Saves ~100-300ms
          on LCP/INP on mid-tier mobile networks vs waiting for the relevant
          <Script> tag to be encountered before opening the connection.
        */}
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.clarity.ms" crossOrigin="" />
        <link rel="dns-prefetch" href="//www.clarity.ms" />
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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? "G-5HM8N741LM"} />
        <MetaPixel />
        <Clarity />
      </body>
    </html>
  );
}
