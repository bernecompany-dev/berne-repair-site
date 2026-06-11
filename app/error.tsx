"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { Phone, RotateCcw } from "lucide-react";
import { COMPANY } from "@/data/company";

// Route-segment error boundary — without it a failed server-action POST
// (e.g. offline mobile mid-submit) surfaces Next's raw "Application error"
// screen. One boundary serves both locales, hence the Spanish line.
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Surface in the client console / monitoring; digest matches server logs.
    console.error(error);
  }, [error]);

  return (
    <section className="container-prose flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
        Error
      </div>
      <h1 className="heading-hero mt-6">Something went wrong.</h1>
      <p className="mt-4 max-w-lg text-lg text-muted-foreground">
        Couldn&apos;t load this page. Please retry or call{" "}
        <a
          href={`tel:${COMPANY.phone.tel}`}
          className="font-semibold text-brand hover:underline"
        >
          {COMPANY.phone.display}
        </a>
        .
      </p>
      <p className="mt-2 max-w-lg text-sm text-muted-foreground" lang="es">
        ¿Problemas? Llame al{" "}
        <a
          href={`tel:${COMPANY.phone.tel}`}
          className="font-semibold text-brand hover:underline"
        >
          {COMPANY.phone.display}
        </a>
        .
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:brightness-110"
        >
          <RotateCcw className="size-4" aria-hidden />
          Try again
        </button>
        <a
          href={`tel:${COMPANY.phone.tel}`}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:border-brand/40 hover:bg-brand/5"
        >
          <Phone className="size-4" aria-hidden />
          Call {COMPANY.phone.display}
        </a>
      </div>
    </section>
  );
}
