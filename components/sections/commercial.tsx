import { Building2, Store, Utensils, Briefcase } from "lucide-react";
import { CTARow } from "@/components/site/cta-row";

const SEGMENTS = [
  { icon: Store, label: "Retail" },
  { icon: Utensils, label: "Restaurants" },
  { icon: Building2, label: "Property management" },
  { icon: Briefcase, label: "Volume contracts" },
];

export function Commercial() {
  return (
    <section className="relative overflow-hidden border-y border-border/60">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(900px 400px at 70% 50%, oklch(0.67 0.21 252 / 0.10), transparent 60%)",
        }}
      />
      <div className="container-prose grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <span className="eyebrow">Commercial</span>
          <h2 className="heading-section mt-3">
            On call for property managers, restaurants, retail.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            We've maintained appliances for Target, Publix, Petco, and dozens of property management
            companies across South Florida. Net terms, priority dispatch, single point of contact.
          </p>

          <div className="mt-8">
            <CTARow size="md" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {SEGMENTS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card/60 p-6"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-white/[0.04] text-brand">
                <s.icon className="size-5" aria-hidden />
              </span>
              <div className="text-base font-semibold tracking-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
