import { Phone } from "lucide-react";
import { COMPANY } from "@/data/company";
import { cn } from "@/lib/utils";

type Variant = "solid" | "ghost" | "minimal";

export function PhoneCTA({
  variant = "solid",
  size = "md",
  withLabel = true,
  className,
}: {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  withLabel?: boolean;
  className?: string;
}) {
  const sizes: Record<string, string> = {
    sm: "h-9 px-3.5 text-sm",
    md: "h-11 px-5 text-[15px]",
    lg: "h-12 px-6 text-base",
  };
  const variants: Record<Variant, string> = {
    solid:
      "bg-brand text-brand-foreground shadow-[0_0_0_1px_oklch(1_0_0/0.08),0_10px_30px_-10px_var(--brand-glow)] hover:brightness-110 hover:-translate-y-px",
    ghost:
      "border border-border bg-white/[0.03] text-foreground hover:bg-white/[0.06]",
    minimal:
      "text-foreground hover:text-brand",
  };
  return (
    <a
      href={`tel:${COMPANY.phone.tel}`}
      data-analytics="click-to-call"
      aria-label={`Call Berne Appliance Repair at ${COMPANY.phone.display}`}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,box-shadow,background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        sizes[size],
        variants[variant],
        className,
      )}
    >
      <Phone className="size-4" aria-hidden />
      {withLabel ? (
        <span className="whitespace-nowrap">
          <span className="hidden sm:inline">Call </span>
          {COMPANY.phone.display}
        </span>
      ) : (
        <span className="sr-only">Call us</span>
      )}
    </a>
  );
}
