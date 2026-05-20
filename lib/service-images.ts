import type { CarouselImage } from "@/components/site/carousel";

/**
 * Per-service alt text context. Generic, accurate, never fabricated.
 * The goal is to give Google Image search + accessibility tools enough
 * context to associate each photo with the service it depicts without
 * inventing specific brand/model/job details we can't verify.
 */
const SERVICE_ALT_CONTEXT: Record<string, string[]> = {
  "refrigerator-repair": [
    "Berne technician diagnosing a refrigerator in South Florida",
    "Refrigerator compressor and sealed system inspection by Berne Repair",
    "Built-in refrigerator service call — Berne Repair, South Florida",
    "Refrigerator door seal and gasket inspection by a Berne technician",
    "Refrigerator control board diagnostic — Berne Repair, South Florida",
  ],
  "washer-repair": [
    "Berne technician repairing a washing machine in South Florida",
    "Front-load washer drain pump and bellows service by Berne Repair",
    "Washing machine drum and bearing service — Berne Repair",
    "Top-load washer control board diagnostic by a Berne technician",
    "Washer water inlet and hose inspection — Berne Repair, South Florida",
  ],
  "dryer-repair": [
    "Berne technician servicing a clothes dryer in South Florida",
    "Dryer heating element and thermal fuse replacement by Berne Repair",
    "Dryer drum belt and roller service — Berne Repair",
    "Gas dryer igniter and burner inspection by a Berne technician",
    "Dryer vent and exhaust duct inspection — Berne Repair, South Florida",
  ],
  "oven-repair": [
    "Berne technician repairing an oven in South Florida",
    "Oven bake and broil element inspection by Berne Repair",
    "Gas oven igniter and burner service — Berne Repair",
    "Range and cooktop control board diagnostic by a Berne technician",
    "Built-in wall oven service — Berne Repair, South Florida",
  ],
  "microwave-repair": [
    "Berne technician repairing a microwave in South Florida",
    "Over-the-range microwave magnetron and diode service by Berne Repair",
    "Built-in microwave control panel diagnostic — Berne Repair",
    "Microwave door switch and interlock inspection by a Berne technician",
  ],
  "dishwasher-repair": [
    "Berne technician repairing a dishwasher in South Florida",
    "Dishwasher drain pump and impeller service by Berne Repair",
    "Dishwasher spray arm and float inspection — Berne Repair, South Florida",
  ],
  "air-duct-cleaning": [
    "Berne technician cleaning HVAC air ducts in South Florida",
    "Dryer vent and exhaust duct cleaning by Berne Repair",
    "HVAC air handler and return inspection — Berne Repair, South Florida",
  ],
  "range-hood-repair": [
    "Berne technician repairing a range hood in South Florida",
    "Range hood blower motor and bearing service by Berne Repair",
    "Under-cabinet range hood control panel diagnostic — Berne Repair",
    "Wall-mount range hood damper and duct inspection by a Berne technician",
  ],
};

const set = (slug: string, count: number): CarouselImage[] => {
  const contexts = SERVICE_ALT_CONTEXT[slug] ?? [];
  return Array.from({ length: count }, (_, i) => ({
    src: `/images/services/${slug}/${i + 1}.webp`,
    alt: contexts[i] ?? `Berne Repair service photo — ${slug.replace(/-/g, " ")}`,
  }));
};

/** Maps service slug → carousel images. Missing slug = no carousel. */
export const SERVICE_HERO_IMAGES: Record<string, CarouselImage[]> = {
  "refrigerator-repair": set("refrigerator-repair", 5),
  "washer-repair": set("washer-repair", 5),
  "dryer-repair": set("dryer-repair", 5),
  "oven-repair": set("oven-repair", 5),
  "microwave-repair": set("microwave-repair", 4),
  "dishwasher-repair": set("dishwasher-repair", 3),
  "air-duct-cleaning": set("air-duct-cleaning", 3),
  "range-hood-repair": set("range-hood-repair", 4),
};

/**
 * Flat list of absolute image paths per service slug — used by JSON-LD
 * Service schema to populate the `image` array, giving Google an explicit
 * association between each /services/<slug> URL and the photos that depict it.
 */
export const SERVICE_IMAGE_PATHS: Record<string, string[]> = Object.fromEntries(
  Object.entries(SERVICE_HERO_IMAGES).map(([slug, imgs]) => [
    slug,
    imgs.map((i) => i.src),
  ]),
);
