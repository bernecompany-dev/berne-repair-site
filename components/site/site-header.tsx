"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, BadgeDollarSign } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { PhoneCTA } from "@/components/site/phone-cta";
import { COMPANY } from "@/data/company";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/#areas", label: "Areas" },
  { href: "/team", label: "Team" },
  { href: "/#why", label: "Why us" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/55">
      <div className="container-prose flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[11px] font-medium text-brand">
            <BadgeDollarSign className="size-3.5" aria-hidden />
            ${COMPANY.serviceCallPrice} service call
          </span>
        </div>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-white/[0.05] hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <PhoneCTA size="sm" variant="solid" className="hidden sm:inline-flex" />
          <PhoneCTA size="sm" variant="solid" withLabel={false} className="sm:hidden" />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-white/[0.03] text-foreground transition-colors hover:bg-white/[0.06] lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden overflow-hidden border-t border-border/60 transition-[max-height,opacity] duration-300 ease-out",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-prose flex flex-col gap-1 py-4" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-foreground/90 transition-colors hover:bg-white/[0.05]"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 inline-flex items-center gap-1.5 self-start rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[11px] font-medium text-brand">
            <BadgeDollarSign className="size-3.5" aria-hidden />
            ${COMPANY.serviceCallPrice} service call · same-day
          </div>
        </nav>
      </div>
    </header>
  );
}
