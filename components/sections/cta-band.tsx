import { CTARow } from "@/components/site/cta-row";
import { COMPANY } from "@/data/company";

export function CTABand() {
  return (
    <section className="container-prose py-12 sm:py-20">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card/80 via-card/40 to-card/80 p-10 sm:p-16">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(700px 400px at 90% 20%, oklch(0.67 0.21 252 / 0.18), transparent 60%), radial-gradient(700px 400px at 10% 80%, oklch(0.67 0.21 252 / 0.10), transparent 60%)",
          }}
        />
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Broken appliance? <span className="text-brand">${COMPANY.serviceCallPrice}</span> gets a technician on the way.
            </h2>
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Call now, book online, or text us — most jobs scheduled within an hour, completed today.
            </p>
          </div>
          <div className="lg:justify-self-end">
            <CTARow size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
