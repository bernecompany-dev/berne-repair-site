import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      aria-label="Berne Repair — home"
      className={cn(
        "group inline-flex items-center gap-2.5 font-semibold tracking-tight",
        className,
      )}
    >
      <span
        aria-hidden
        className="relative inline-flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-[oklch(0.55_0.22_252)] shadow-[0_8px_30px_-10px_var(--brand-glow)]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 text-white"
        >
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      </span>
      <span className="text-[1.05rem] leading-none">
        Berne <span className="text-brand">Repair</span>
      </span>
    </Link>
  );
}
