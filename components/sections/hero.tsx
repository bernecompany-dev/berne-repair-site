import Image from "next/image";
import { BadgeDollarSign, Star, ShieldCheck, Clock3 } from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { COMPANY } from "@/data/company";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/60">
      <BackgroundGrid />

      <div className="container-prose relative pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium tracking-wide text-brand">
                <BadgeDollarSign className="size-3.5" aria-hidden />
                ${COMPANY.serviceCallPrice} service call · same-day
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
                <ShieldCheck className="size-3.5 text-brand" aria-hidden />
                Licensed & insured
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
                <Star className="size-3.5 text-brand" aria-hidden />
                {COMPANY.socialProof.repairsCompleted} of repairs
              </span>
            </div>

            <h1 className="heading-hero mt-7">
              Premium appliance repair.
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-brand via-[oklch(0.78_0.18_252)] to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
                Same-day across South Florida.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              17 technicians. Trucks stocked for Sub-Zero, Wolf, Viking, Thermador, Miele, Bosch
              and every major brand. <span className="text-foreground">${COMPANY.serviceCallPrice} flat service call</span> — applied toward the repair if you say go.
            </p>

            <div className="mt-9">
              <CTARow size="lg" />
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock3 className="size-4 text-brand" aria-hidden />
                <span>Open today · 8 AM – 9 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-brand" aria-hidden />
                <span>{COMPANY.socialProof.warranty}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-foreground/80">{COMPANY.socialProof.technicians}</span>
                <span>full-time technicians</span>
              </div>
            </div>
          </div>

          <HeroImage />
        </div>
      </div>
    </section>
  );
}

function HeroImage() {
  return (
    <div className="relative hidden lg:block">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-brand/30 via-transparent to-transparent blur-2xl"
      />
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_80px_-30px_oklch(0.67_0.21_252/0.35)]">
        <Image
          src="/images/team/tech-portrait.jpg"
          alt="Berne Repair technician inspecting a dryer motor — South Florida appliance repair"
          width={900}
          height={1100}
          priority
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="h-auto w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Floating price card */}
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-border bg-card/85 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Service call
            </span>
            <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-medium text-brand">
              Today
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-4xl font-semibold tracking-tight text-foreground">${COMPANY.serviceCallPrice}</span>
            <span className="text-sm text-muted-foreground">flat · applied toward repair</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundGrid() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(1 0 0 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -z-10 size-[1000px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.67 0.21 252 / 0.30), transparent)",
        }}
      />
    </>
  );
}
