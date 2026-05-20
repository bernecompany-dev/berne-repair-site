import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Berne Repair — Same-Day Appliance Repair · South Florida",
    template: "%s · Berne Repair",
  },
  description:
    "Same-day appliance repair across Miami-Dade, Broward & Palm Beach. $59 service call. 18 W-2 techs, licensed. Sub-Zero, Wolf, Viking, Miele.",
  applicationName: COMPANY.legalName,
  openGraph: {
    type: "website",
    siteName: COMPANY.legalName,
    title: "Berne Repair — Premium Appliance Repair in South Florida",
    description:
      "Same-day appliance repair across South Florida. $59 service call. Licensed & insured.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Berne Repair — Premium Appliance Repair in South Florida",
    description:
      "Same-day appliance repair across South Florida. $59 service call.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  other: {
    "facebook-domain-verification": "lfwrqrca4g3ex5peub7im3b56wytbt",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LangSync />
        <SiteHeader />
        <main className="flex-1">{children}</main>
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
