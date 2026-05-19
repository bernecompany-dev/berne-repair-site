import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, ChefHat, Crown } from "lucide-react";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "The Berne Family of Companies — How Our 3 Brands Work Together",
  description:
    "Berne Repair, Berne Appliance Repair, and Berne Commercial Repair — three brands, one operator, one engineering-built service standard. Premium residential, standard residential, and commercial dispatch across South Florida.",
  alternates: {
    canonical: "/family",
    languages: {
      "en-US": absoluteUrl("/family"),
      "x-default": absoluteUrl("/family"),
    },
  },
  openGraph: {
    title: "The Berne Family of Companies",
    description:
      "Three brands, one operator, one engineering-built service standard.",
    url: absoluteUrl("/family"),
    type: "website",
  },
};

const brands = [
  {
    icon: Crown,
    name: "Berne Repair",
    url: "https://www.berne-repair.com/",
    tag: "this site",
    focus: "Premium residential",
    price: "$59 service call",
    detail:
      "Luxury and high-end residential — Sub-Zero, Wolf, Viking, Thermador, Miele, Bosch built-ins. The crew, parts inventory, and warranty are built for column refrigerators, dual-fuel ranges, and steam ovens.",
    accent:
      "bg-gradient-to-br from-brand/15 via-brand/5 to-transparent border-brand/40",
  },
  {
    icon: Home,
    name: "Berne Appliance Repair",
    url: "https://bernerepair.com/",
    tag: "sister site",
    focus: "Standard residential",
    price: "$59 service call",
    detail:
      "Mainstream residential brands — Whirlpool, GE, Samsung, LG, Maytag, Frigidaire. Same dispatch desk, same warranty, optimized for fast everyday work across South Florida.",
    accent:
      "bg-gradient-to-br from-white/[0.04] to-transparent border-border",
  },
  {
    icon: ChefHat,
    name: "Berne Commercial Repair",
    url: "https://www.berne-commercial.com/",
    tag: "commercial",
    focus: "Restaurants, production, facilities",
    price: "$89 service call",
    detail:
      "Commercial kitchens, refrigeration walk-ins, ice machines, commercial laundry, multi-location accounts with COI. Vendor-ready dispatch for restaurants and property managers.",
    accent:
      "bg-gradient-to-br from-white/[0.04] to-transparent border-border",
  },
];

export default function FamilyPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.67 0.21 252 / 0.20), transparent)",
          }}
        />
        <div className="container-prose pt-14 pb-12 sm:pt-20 sm:pb-16">
          <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">The family</span>
          </nav>

          <h1 className="heading-hero max-w-3xl">
            One operator. Three brands.{" "}
            <span className="bg-gradient-to-r from-brand to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              One standard.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Berne Repair (this site) sits inside a small family of South Florida
            appliance-service brands run by the same operator and dispatch desk.
            Different brand names, different price points, but the same trucks,
            the same technicians, and the same warranty.
          </p>
        </div>
      </section>

      <section className="container-prose py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {brands.map((b) => (
            <a
              key={b.name}
              href={b.url}
              className={`group flex flex-col gap-4 rounded-3xl border p-6 transition-all hover:-translate-y-0.5 ${b.accent}`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <b.icon className="size-5" aria-hidden />
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {b.tag}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  {b.name}
                </h2>
                <div className="mt-1 text-sm font-medium text-brand">
                  {b.focus} · {b.price}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {b.detail}
              </p>
              <div className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
                Visit site
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-border bg-card/40 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight">
            Why three brands?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Customers searching for &quot;commercial walk-in repair&quot; want very
            different signals than customers searching for &quot;Sub-Zero column
            service.&quot; Splitting the brands lets us speak directly to each segment
            without diluting either. Internally, dispatch is unified — a Coral Gables
            Sub-Zero call and a Doral restaurant freezer call route through the same
            desk, with the right specialist dispatched from the right truck.
          </p>
        </div>
      </section>
    </>
  );
}
