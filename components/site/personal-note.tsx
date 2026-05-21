import Image from "next/image";
import { Quote } from "lucide-react";

export function PersonalNote({
  opener,
  body,
  closer,
}: {
  opener: string;
  body: string;
  closer: string;
}) {
  return (
    <section className="container-prose py-16">
      <div className="grid items-start gap-8 rounded-3xl border border-border bg-card/50 p-6 sm:p-10 lg:grid-cols-[auto_1fr] lg:gap-12">
        <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-border sm:size-24 lg:size-28">
            <Image
              src="/images/team/evgenii-knyazev.webp"
              alt="Eugene Berne, owner of Berne Appliance Repair"
              fill
              sizes="(min-width: 1024px) 120px, 96px"
              quality={80}
              loading="lazy"
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-base font-semibold tracking-tight">Eugene Berne</div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Owner · Berne Appliance Repair
            </div>
          </div>
        </div>
        <div>
          <Quote className="size-5 text-brand" aria-hidden />
          <div className="mt-2 space-y-3 text-base leading-relaxed text-foreground/90 sm:text-lg">
            <p>{opener}</p>
            <p>{body}</p>
            <p className="text-sm text-muted-foreground">{closer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
