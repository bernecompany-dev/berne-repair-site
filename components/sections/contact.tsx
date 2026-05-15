import { Phone, Mail, Clock3, MapPin } from "lucide-react";
import { LeadForm } from "@/components/sections/lead-form";
import { COMPANY } from "@/data/company";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export function Contact({
  defaultCity,
  defaultAppliance,
  locale = "en",
}: {
  defaultCity?: string;
  defaultAppliance?: string;
  locale?: Locale;
}) {
  const d = getDictionary(locale).contact;
  return (
    <section id="contact" className="container-prose py-20 sm:py-28 scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div>
          <span className="eyebrow">{d.eyebrow}</span>
          <h2 className="heading-section mt-3">{d.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{d.body}</p>

          <ul className="mt-8 space-y-4 text-base">
            <li className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Phone className="size-4" aria-hidden />
              </span>
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{d.phone}</div>
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
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{d.email}</div>
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
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{d.hours}</div>
                <div className="font-semibold text-foreground">{COMPANY.hours.label}</div>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <MapPin className="size-4" aria-hidden />
              </span>
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{d.serviceArea}</div>
                <div className="font-semibold text-foreground">{d.serviceAreaValue}</div>
              </div>
            </li>
          </ul>
        </div>

        <div id="lead-form">
          <LeadForm defaultCity={defaultCity} defaultAppliance={defaultAppliance} locale={locale} />
        </div>
      </div>
    </section>
  );
}
