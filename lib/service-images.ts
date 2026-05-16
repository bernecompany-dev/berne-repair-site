import type { CarouselImage } from "@/components/site/carousel";

const altFor = (name: string, n: number) =>
  `${name} job by Berne Repair — South Florida (photo ${n})`;

const set = (slug: string, name: string, count: number): CarouselImage[] =>
  Array.from({ length: count }, (_, i) => ({
    src: `/images/services/${slug}/${i + 1}.webp`,
    alt: altFor(name, i + 1),
  }));

/** Maps service slug → carousel images. Missing slug = no carousel. */
export const SERVICE_HERO_IMAGES: Record<string, CarouselImage[]> = {
  "refrigerator-repair": set("refrigerator-repair", "Refrigerator repair", 5),
  "washer-repair": set("washer-repair", "Washer repair", 5),
  "dryer-repair": set("dryer-repair", "Dryer repair", 5),
  "oven-repair": set("oven-repair", "Oven & range repair", 5),
  "microwave-repair": set("microwave-repair", "Microwave repair", 4),
  "dishwasher-repair": set("dishwasher-repair", "Dishwasher repair", 3),
  "air-duct-cleaning": set("air-duct-cleaning", "Air duct cleaning", 3),
  "range-hood-repair": set("range-hood-repair", "Range hood repair", 4),
};
