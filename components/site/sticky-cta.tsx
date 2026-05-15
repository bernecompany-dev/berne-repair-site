"use client";

import { useEffect, useState } from "react";
import { Phone, MessageSquare, CalendarCheck } from "lucide-react";
import { COMPANY } from "@/data/company";

const SMS_BODY = encodeURIComponent("Hi, I need appliance repair —");

/**
 * Mobile-only bottom action bar — appears after the user scrolls past the
 * first viewport. Three thumb-reachable CTAs: call / book / text.
 * Hidden on lg+ since the header CTA stays visible there.
 */
export function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShow(window.scrollY > Math.min(window.innerHeight * 0.6, 400));
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-label="Quick actions"
      role="region"
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 lg:hidden transition-[opacity,transform] duration-300 ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="pointer-events-auto m-3 grid grid-cols-3 gap-1.5 rounded-2xl border border-border bg-card/95 p-1.5 shadow-[0_-10px_40px_-15px_oklch(0_0_0/0.5)] backdrop-blur-md">
        <a
          href={`tel:${COMPANY.phone.tel}`}
          data-analytics="sticky-call"
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-brand px-3 py-3 text-xs font-semibold text-brand-foreground shadow-[0_8px_20px_-8px_var(--brand-glow)]"
        >
          <Phone className="size-4" aria-hidden />
          Call
        </a>
        <a
          href="/#lead-form"
          data-analytics="sticky-book"
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-white/[0.04] px-3 py-3 text-xs font-semibold text-foreground"
        >
          <CalendarCheck className="size-4 text-brand" aria-hidden />
          Book
        </a>
        <a
          href={`sms:${COMPANY.phone.sms}?&body=${SMS_BODY}`}
          data-analytics="sticky-text"
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-white/[0.04] px-3 py-3 text-xs font-semibold text-foreground"
        >
          <MessageSquare className="size-4 text-brand" aria-hidden />
          Text
        </a>
      </div>
    </div>
  );
}
