import Link from "next/link";
import { CTARow } from "@/components/site/cta-row";

export default function NotFound() {
  return (
    <section className="container-prose flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
        404
      </div>
      <h1 className="heading-hero mt-6">Page not found.</h1>
      <p className="mt-4 max-w-lg text-lg text-muted-foreground">
        That page doesn't exist — but our technicians do. Call us, book online, or head back home.
      </p>
      <div className="mt-8">
        <CTARow size="md" />
      </div>
      <Link href="/" className="mt-6 text-sm text-brand hover:underline">
        ← Back to home
      </Link>
    </section>
  );
}
