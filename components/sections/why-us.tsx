import { Clock3, Users, ShieldCheck, Wrench, Award, Truck } from "lucide-react";

const REASONS = [
  {
    icon: Clock3,
    title: "Same-day service",
    body: "Call before noon — we can have a technician at your door today across all three counties.",
  },
  {
    icon: Users,
    title: "17 technicians",
    body: "Real bench, not a one-man show. Faster scheduling and the right specialist for the job.",
  },
  {
    icon: Truck,
    title: "Trucks stocked for premium brands",
    body: "Sub-Zero, Wolf, Viking, Thermador, Miele, Bosch — common parts ride in the truck.",
  },
  {
    icon: Wrench,
    title: "Honest diagnosis, $59 flat",
    body: "Up-front pricing. Service call applied toward the repair if you say go ahead.",
  },
  {
    icon: ShieldCheck,
    title: "90-day warranty",
    body: "Parts and labor backed for 90 days. Same issue comes back, so do we — at no charge.",
  },
  {
    icon: Award,
    title: "Trusted by commercial clients",
    body: "We service property management, restaurants, and retail — including Target, Publix, Petco.",
  },
];

export function WhyUs() {
  return (
    <section
      id="why"
      className="relative border-y border-border/60 bg-gradient-to-b from-transparent via-card/30 to-transparent"
    >
      <div className="container-prose py-20 sm:py-28">
        <div className="max-w-2xl">
          <span className="eyebrow">Why Berne Repair</span>
          <h2 className="heading-section mt-3">
            Built like a fleet operation — priced like a local.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r) => (
            <div
              key={r.title}
              className="flex gap-4 rounded-2xl border border-border bg-background/40 p-6"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-white/[0.04] text-brand">
                <r.icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {r.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {r.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
