import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/data/company";
import { absoluteUrl, pageOpenGraph } from "@/lib/seo";

const PAGE_TITLE = "Terms of Service";
const PAGE_DESCRIPTION = `Service scope, booking, pricing, warranty, payment, and dispute terms for ${COMPANY.legalName} appliance repair customers.`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/terms",
    languages: {
      "en-US": absoluteUrl("/terms"),
      "es-US": absoluteUrl("/es/terms"),
      "x-default": absoluteUrl("/terms"),
    },
  },
  openGraph: pageOpenGraph({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, path: "/terms" }),
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <article className="container-prose py-16 sm:py-20 max-w-3xl prose-invert">
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span aria-hidden>/</span>
        <span className="text-foreground/80">Terms</span>
      </nav>
      <h1 className="text-4xl font-semibold tracking-tight">Terms of Service</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: 2026-05-20</p>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90">
        <p>
          These terms govern the appliance-repair service you request from{" "}
          {COMPANY.legalName} ("we," "us," "our") through{" "}
          <a href={COMPANY.url} className="text-brand hover:underline">{COMPANY.url}</a>,
          by phone, or by direct text. By submitting a request or accepting a
          scheduled visit, you agree to these terms.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">1. Service scope</h2>
        <p>
          We provide in-home diagnostic, repair, and maintenance service for
          residential appliances — refrigerators, washers, dryers, dishwashers,
          ovens, ranges, microwaves, ice machines, and wine coolers — across
          Miami-Dade, Broward, Palm Beach, and select Gulf Coast counties
          (Hillsborough, Sarasota, Collier, Pinellas, Lee).
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">2. Booking and dispatch</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>A submitted form is a service <em>request</em>, not a confirmed appointment. We confirm by phone before dispatching.</li>
          <li>Same-day windows are offered where capacity allows; weather, parts availability, and dispatch load may shift the window.</li>
          <li>Two-hour arrival windows are typical; we update by call or text 30 minutes before arrival.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">3. Diagnostic fee and pricing</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>The residential service-call (diagnostic) fee is <strong>${COMPANY.serviceCallPrice}</strong>. It is waived if you authorize the repair on the same visit.</li>
          <li>Flat-rate per-repair pricing is disclosed in writing before any work begins.</li>
          <li>Parts costs are disclosed upfront. Custom-order or special-order parts may require non-refundable deposits.</li>
          <li>You authorize repairs in writing (digital signature on tablet or signed estimate) before parts are ordered or labor begins.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">4. Warranty</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>{COMPANY.socialProof.warranty}</strong> on workmanship for completed repairs.</li>
          <li>Manufacturer warranty on OEM parts as supplied (typically 1 year).</li>
          <li>Warranty is void if the appliance is modified or serviced by another party after our repair, if the failure is unrelated to the original work, or if the appliance was damaged by water, surge, abuse, or pests.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">5. Limitations and customer responsibilities</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>We do not transport, dispose of, or recycle replaced appliances or major parts unless arranged separately.</li>
          <li>We do not perform refrigerant recovery beyond what is required for a compliant repair (EPA Section 608).</li>
          <li>Service requires reasonable access. Gated communities, locked utility rooms, and parking limits require advance notice.</li>
          <li>The customer is responsible for clearing the work area and securing pets before the technician arrives.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">6. Payment</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Payment is due on completion of service. We accept cash, credit/debit card, Zelle, and Apple Pay.</li>
          <li>Late balances may accrue 1.5% per month interest after 30 days.</li>
          <li>Returned-payment fee: $35 per occurrence.</li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mt-10">7. Cancellation and no-show</h2>
        <p>
          You may cancel or reschedule at no charge up to 2 hours before the
          arrival window. Cancellations inside that window, or no-shows when the
          technician arrives, may incur a $59 trip fee covering dispatch time.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">8. Limitation of liability</h2>
        <p>
          Our maximum liability for any claim arising from a service visit is
          limited to the amount you paid for that visit. We are not liable for
          consequential damages (food spoilage, water damage, business
          interruption) except where caused by our gross negligence and not
          otherwise covered by your homeowner's insurance.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">9. Dispute resolution</h2>
        <p>
          Florida law governs these terms. Any dispute that cannot be resolved
          directly with our dispatch will be submitted to binding arbitration
          in Broward County, Florida, before any court action. Each party bears
          its own arbitration costs unless the arbitrator awards otherwise.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">10. Updates</h2>
        <p>
          We may update these terms; material changes are posted here with a
          new "Last updated" date. Continued use of our service after the date
          posted constitutes acceptance.
        </p>

        <h2 className="text-xl font-semibold tracking-tight mt-10">Contact</h2>
        <p>
          Questions: call{" "}
          <a href={`tel:${COMPANY.phone.tel}`} className="text-brand hover:underline">{COMPANY.phone.display}</a>{" "}
          or email{" "}
          <a href={`mailto:${COMPANY.email.public}`} className="text-brand hover:underline">{COMPANY.email.public}</a>.
        </p>
        <p className="text-xs text-muted-foreground">
          See also: <Link href="/privacy" className="hover:text-brand">Privacy Policy</Link>{" "}
          · <Link href="/cookies" className="hover:text-brand">Cookie Policy</Link>
        </p>
      </div>
    </article>
  );
}
