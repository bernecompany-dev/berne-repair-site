import { Phone, CalendarCheck, MessageSquare, MessagesSquare } from "lucide-react";
import { COMPANY } from "@/data/company";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

const SMS_BODIES: Record<Locale, string> = {
  en: encodeURIComponent("Hi, I need appliance repair —"),
  es: encodeURIComponent("Hola, necesito reparación de electrodomésticos —"),
};

export function CTARow({
  className,
  size = "md",
  bookHref = "#lead-form",
  showChat = false,
  locale = "en",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  bookHref?: string;
  showChat?: boolean;
  locale?: Locale;
}) {
  const d = getDictionary(locale).cta;
  const smsBody = SMS_BODIES[locale];
  const sizes: Record<string, string> = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-5 text-[15px]",
    lg: "h-14 px-6 text-base",
  };
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <a
        href={`tel:${COMPANY.phone.tel}`}
        data-analytics="cta-call"
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full bg-brand font-semibold text-brand-foreground shadow-[0_0_0_1px_oklch(1_0_0/0.08),0_10px_30px_-10px_var(--brand-glow)] transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          sizes[size],
        )}
      >
        <Phone className="size-4" aria-hidden />
        <span>{d.callPrefix} {COMPANY.phone.display}</span>
      </a>
      <a
        href={bookHref}
        data-analytics="cta-book"
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-tint/[0.04] font-semibold text-foreground transition-colors hover:bg-tint/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          sizes[size],
        )}
      >
        <CalendarCheck className="size-4" aria-hidden />
        <span>{d.book}</span>
      </a>
      <a
        href={`sms:${COMPANY.phone.sms}?&body=${smsBody}`}
        data-analytics="cta-text"
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-tint/[0.04] font-semibold text-foreground transition-colors hover:bg-tint/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          sizes[size],
        )}
      >
        <MessageSquare className="size-4" aria-hidden />
        <span>{d.text}</span>
      </a>
      {showChat ? (
        <button
          type="button"
          data-analytics="cta-chat"
          aria-label="Open chat (coming soon)"
          disabled
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full border border-dashed border-border bg-transparent font-semibold text-muted-foreground transition-colors",
            sizes[size],
          )}
        >
          <MessagesSquare className="size-4" aria-hidden />
          <span>{d.chat}</span>
        </button>
      ) : null}
    </div>
  );
}
