import { Phone, Mail, Clock3, MapPin } from "lucide-react";
import { LeadForm } from "@/components/sections/lead-form";
import { COMPANY } from "@/data/company";

export function Contact({ defaultCity, defaultAppliance }: { defaultCity?: string; defaultAppliance?: string }) {
  return (
    <section id="contact" className="container-prose py-20 sm:py-28 scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div>
          <span className="eyebrow">Contact</span>
          <h2 className="heading-section mt-3">
            Request a callback — or just call us.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Open 7 days. Most jobs scheduled within an hour, completed the same day.
          </p>

          <ul className="mt-8 space-y-4 text-base">
            <li className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Phone className="size-4" aria-hidden />
              </span>
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Phone</div>
                <a href={`tel:${COMPANY.phone.tel}`} className="font-semibold text-foreground hover:text-brand">
                  {COMPANY.phone.display}
                </a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Mail className="size-4" aria-hidden />
              </span>
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Email</div>
                <a href={`mailto:${COMPANY.email.public}`} className="font-semibold text-foreground hover:text-brand">
                  {COMPANY.email.public}
                </a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Clock3 className="size-4" aria-hidden />
              </span>
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Hours</div>
                <div className="font-semibold text-foreground">{COMPANY.hours.label}</div>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <MapPin className="size-4" aria-hidden />
              </span>
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Service area</div>
                <div className="font-semibold text-foreground">
                  Miami-Dade · Broward · Palm Beach
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div id="lead-form">
          <LeadForm defaultCity={defaultCity} defaultAppliance={defaultAppliance} />
        </div>
      </div>
    </section>
  );
}
