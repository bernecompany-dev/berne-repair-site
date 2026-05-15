"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CarouselImage = { src: string; alt: string };

export function Carousel({
  images,
  className,
  /** Autoplay interval in ms; 0 to disable */
  autoplayMs = 5500,
  aspectClass = "aspect-[4/5]",
  priority = false,
}: {
  images: CarouselImage[];
  className?: string;
  autoplayMs?: number;
  aspectClass?: string;
  priority?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = images.length;

  // Track which slide is most-visible via IntersectionObserver
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const items = Array.from(root.children) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        let bestIdx = index;
        let bestRatio = 0;
        for (const e of entries) {
          if (e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio;
            const i = items.indexOf(e.target as HTMLElement);
            if (i >= 0) bestIdx = i;
          }
        }
        setIndex(bestIdx);
      },
      { root, threshold: [0.5, 0.75, 1] },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [total]); // eslint-disable-line react-hooks/exhaustive-deps

  // Autoplay
  useEffect(() => {
    if (!autoplayMs || paused || total <= 1) return;
    const id = window.setInterval(() => {
      goto((index + 1) % total);
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [autoplayMs, paused, index, total]); // eslint-disable-line react-hooks/exhaustive-deps

  function goto(i: number) {
    const root = scrollRef.current;
    if (!root) return;
    const item = root.children[i] as HTMLElement | undefined;
    if (!item) return;
    root.scrollTo({ left: item.offsetLeft - root.offsetLeft, behavior: "smooth" });
  }

  if (total === 0) return null;

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-brand/25 via-transparent to-transparent blur-2xl"
      />
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_80px_-30px_oklch(0.67_0.21_252/0.30)]">
        <div
          ref={scrollRef}
          className={cn(
            "flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
          aria-roledescription="carousel"
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              className={cn("relative w-full shrink-0 snap-start", aspectClass)}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority={priority && i === 0}
                loading={priority && i === 0 ? undefined : "lazy"}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goto((index - 1 + total) % total)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex size-10 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-background"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goto((index + 1) % total)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex size-10 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-background"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
          <div className="mt-3 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goto(i)}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-6 bg-brand" : "w-1.5 bg-foreground/30 hover:bg-foreground/60",
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
