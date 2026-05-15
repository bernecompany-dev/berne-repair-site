import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { JsonLd } from "@/components/site/json-ld";
import { localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";
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
    default: "Berne Repair — Premium Appliance Repair in South Florida · $59 Service Call",
    template: "%s · Berne Repair",
  },
  description:
    "Same-day appliance repair across Miami-Dade, Broward, and Palm Beach. $59 service call. 17 technicians. Licensed & insured. Sub-Zero, Wolf, Viking, Thermador, Miele, Bosch and all major brands.",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <JsonLd data={[localBusinessJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
