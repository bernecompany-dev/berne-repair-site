import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/data/company";
import { absoluteUrl, pageOpenGraph } from "@/lib/seo";

const PAGE_TITLE = "Privacy Policy";
const PAGE_DESCRIPTION = `How ${COMPANY.legalName} collects, uses, and protects information from visitors and customers.`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/privacy",
    languages: {
      "en-US": absoluteUrl("/privacy"),
      "es-US": absoluteUrl("/es/privacy"),
      "x-default": absoluteUrl("/privacy"),
    },
  },
  openGraph: pageOpenGraph({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, path: "/privacy" }),
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="container-prose py-16 sm:py-20 max-w-3xl prose-invert">
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span aria-hidden>/</span>
        <span className="text-foreground/80">Privacy</span>
      </nav>
      <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: 2026-07-01</p>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90">
        <p>
          {COMPANY.legalName} ("we," "us," "our") respects your privacy. This policy explains what
          information we collect when you visit{" "}
          <a href={COMPANY.url} className="text-brand hover:underline">{COMPANY.url}</a>{" "}
          or contact us for appliance repair service, and how we use it.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">What we collect</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Lead form data</strong>: your name, phone number, optional email, city, appliance type, optional brand and free-text description of the problem.</li>
          <li><strong>Technical data</strong>: anonymized IP address, browser type, pages visited, referral source — collected automatically through Google Analytics 4.</li>
          <li><strong>Cookies</strong>: GA4 sets first-party cookies to measure visits. When our ad campaigns are active, advertising platforms (Google Ads, Microsoft Advertising, Meta) also set conversion-measurement cookies — see the <Link href="/cookies" className="text-brand hover:underline">Cookie Policy</Link> for the full list and opt-outs.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">How we use it</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Contact you to schedule, diagnose, and complete the repair you requested.</li>
          <li>Send a service receipt, warranty confirmation, and follow-up about the same job.</li>
          <li>Improve our website and understand which services customers need.</li>
        </ul>
        <p>
          We <strong>do not sell, rent, or trade</strong> your information. We do not send unsolicited
          marketing email or SMS unless you explicitly opt in.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Calls and text messages (TCPA)</h2>
        <p>
          By submitting our contact form and checking the consent box, you agree that{" "}
          {COMPANY.legalName} may contact you by phone call or SMS at the number provided about your
          repair request. Standard message and data rates may apply. You can opt out at any time by
          replying STOP to any text or telling our dispatch you no longer wish to be contacted.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Retention</h2>
        <p>
          We keep lead and customer contact information for the duration of the warranty period (90 days
          after the last service) plus 2 years for tax and dispute-resolution purposes. You may request
          deletion sooner by emailing{" "}
          <a href={`mailto:${COMPANY.email.public}`} className="text-brand hover:underline">{COMPANY.email.public}</a>.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Third parties</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Resend</strong> — transactional email provider that delivers lead notifications to our inbox.</li>
          <li><strong>Vercel</strong> — hosts the website. Logs minimal request data for ~30 days.</li>
          <li><strong>Google Analytics 4</strong> — aggregate site traffic measurement.</li>
          <li><strong>Ad platforms</strong> — Google Ads, Microsoft Advertising, and Meta conversion tags measure which of our ads lead to a repair request. Active only while we run campaigns; see the <Link href="/cookies" className="text-brand hover:underline">Cookie Policy</Link> for opt-outs.</li>
          <li><strong>Google Maps</strong> — map embed on city pages. Subject to Google's privacy policy.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Your rights</h2>
        <p>
          If you are a Florida resident or otherwise entitled to consumer privacy rights, you may
          request access to, correction of, or deletion of your personal information by emailing us
          at{" "}
          <a href={`mailto:${COMPANY.email.public}`} className="text-brand hover:underline">{COMPANY.email.public}</a>
          . We will respond within 30 days.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Contact</h2>
        <p>
          Questions or concerns: call{" "}
          <a href={`tel:${COMPANY.phone.tel}`} className="text-brand hover:underline">{COMPANY.phone.display}</a>{" "}
          or email{" "}
          <a href={`mailto:${COMPANY.email.public}`} className="text-brand hover:underline">{COMPANY.email.public}</a>.
        </p>
      </div>
    </article>
  );
}
