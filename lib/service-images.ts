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
    "Refrigerator compressor and sealed system inspection by Berne Appliance Repair",
    "Built-in refrigerator service call — Berne Appliance Repair, South Florida",
    "Refrigerator door seal and gasket inspection by a Berne technician",
    "Refrigerator control board diagnostic — Berne Appliance Repair, South Florida",
  ],
  "washer-repair": [
    "Berne technician repairing a washing machine in South Florida",
    "Front-load washer drain pump and bellows service by Berne Appliance Repair",
    "Washing machine drum and bearing service — Berne Appliance Repair",
    "Top-load washer control board diagnostic by a Berne technician",
    "Washer water inlet and hose inspection — Berne Appliance Repair, South Florida",
  ],
  "dryer-repair": [
    "Berne technician servicing a clothes dryer in South Florida",
    "Dryer heating element and thermal fuse replacement by Berne Appliance Repair",
    "Dryer drum belt and roller service — Berne Appliance Repair",
    "Gas dryer igniter and burner inspection by a Berne technician",
    "Dryer vent and exhaust duct inspection — Berne Appliance Repair, South Florida",
  ],
  "oven-repair": [
    "Berne technician repairing an oven in South Florida",
    "Oven bake and broil element inspection by Berne Appliance Repair",
    "Gas oven igniter and burner service — Berne Appliance Repair",
    "Range and cooktop control board diagnostic by a Berne technician",
    "Built-in wall oven service — Berne Appliance Repair, South Florida",
  ],
  "microwave-repair": [
    "Berne technician repairing a microwave in South Florida",
    "Over-the-range microwave magnetron and diode service by Berne Appliance Repair",
    "Built-in microwave control panel diagnostic — Berne Appliance Repair",
    "Microwave door switch and interlock inspection by a Berne technician",
  ],
  "dishwasher-repair": [
    "Berne technician repairing a dishwasher in South Florida",
    "Dishwasher drain pump and impeller service by Berne Appliance Repair",
    "Dishwasher spray arm and float inspection — Berne Appliance Repair, South Florida",
  ],
  "air-duct-cleaning": [
    "Berne technician cleaning HVAC air ducts in South Florida",
    "Dryer vent and exhaust duct cleaning by Berne Appliance Repair",
    "HVAC air handler and return inspection — Berne Appliance Repair, South Florida",
  ],
  "range-hood-repair": [
    "Berne technician repairing a range hood in South Florida",
    "Range hood blower motor and bearing service by Berne Appliance Repair",
    "Under-cabinet range hood control panel diagnostic — Berne Appliance Repair",
    "Wall-mount range hood damper and duct inspection by a Berne technician",
  ],
  // High-end specialty services (data/highend/*). Descriptive alt slots are
  // registered now so that, once real photos are shot, enabling the carousel
  // is a one-line add to SERVICE_HERO_IMAGES below — set("<slug>", N). Until
  // then these services intentionally render with no carousel (same graceful
  // path as ice-maker-repair / wine-cooler-repair, which have no photo set).
  "electric-sauna-repair": [
    "Berne technician servicing a home electric sauna heater in South Florida",
    "Sauna control panel and high-limit thermostat diagnostic by Berne Appliance Repair",
    "Infrared sauna cabin emitter inspection — Berne Appliance Repair, South Florida",
  ],
  "cold-plunge-repair": [
    "Berne technician servicing a home cold plunge chiller in South Florida",
    "Cold plunge water chiller and sealed-system inspection by Berne Appliance Repair",
    "Cold plunge circulation pump and temperature control diagnostic — Berne Appliance Repair",
  ],
  "pool-heater-repair": [
    "Berne technician repairing a residential pool heater in South Florida",
    "Pool heat-pump and heat exchanger inspection by Berne Appliance Repair",
    "Gas pool heater ignition and control diagnostic — Berne Appliance Repair, South Florida",
  ],
  "coffee-machine-repair": [
    "Berne technician servicing a built-in coffee machine in South Florida",
    "Premium coffee machine brew unit and descaling service by Berne Appliance Repair",
    "Built-in espresso machine boiler and pump diagnostic — Berne Appliance Repair",
  ],
  "warming-drawer-repair": [
    "Berne technician repairing a built-in warming drawer in South Florida",
    "Warming drawer heating element and thermostat service by Berne Appliance Repair",
    "Built-in warming drawer control panel diagnostic — Berne Appliance Repair",
  ],
  "recliner-repair": [
    "Berne technician repairing a power recliner motor in South Florida",
    "Power recliner actuator and transformer service by Berne Appliance Repair",
    "Premium leather motion furniture mechanism inspection — Berne Appliance Repair",
  ],
  "yacht-marine-appliance-repair": [
    "Berne technician servicing an onboard yacht refrigerator dockside in South Florida",
    "Marine DC refrigeration and condenser inspection by Berne Appliance Repair at the marina",
    "Yacht galley ice maker and wine cooler diagnostic — Berne Appliance Repair, South Florida",
  ],
};

const set = (slug: string, count: number): CarouselImage[] => {
  const contexts = SERVICE_ALT_CONTEXT[slug] ?? [];
  return Array.from({ length: count }, (_, i) => ({
    src: `/images/services/${slug}/${i + 1}.webp`,
    alt: contexts[i] ?? `Berne Appliance Repair service photo — ${slug.replace(/-/g, " ")}`,
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
