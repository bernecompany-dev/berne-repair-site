export type Service = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  commonIssues: string[];
  brands: string[];
  /** Used for service×city combo SEO meta */
  seoNoun: string;
};

export const SERVICES: Service[] = [
  {
    slug: "refrigerator-repair",
    name: "Refrigerator Repair",
    shortName: "Refrigerator",
    seoNoun: "refrigerator",
    description:
      "Same-day refrigerator repair for all major brands. $59 service call. Licensed & insured.",
    longDescription:
      "From a fridge that won't cool to a freezer that's iced over, our technicians diagnose and fix residential and commercial refrigerators on the first visit whenever parts allow. We service French door, side-by-side, top-freezer, bottom-freezer, built-in, and column refrigerators including Sub-Zero, Viking, and Thermador.",
    commonIssues: [
      "Not cooling or warm fridge compartment",
      "Freezer over-icing or frost buildup",
      "Water leaking onto floor",
      "Ice maker not making ice",
      "Loud humming, clicking, or grinding",
      "Compressor not starting",
      "Door seal damage and condensation",
    ],
    brands: ["Sub-Zero", "Viking", "Thermador", "LG", "Samsung", "Whirlpool", "GE", "KitchenAid", "Bosch", "Frigidaire", "Maytag", "Miele"],
  },
  {
    slug: "washer-repair",
    name: "Washer Repair",
    shortName: "Washer",
    seoNoun: "washer",
    description:
      "Washing machine not draining, spinning, or filling? Same-day washer repair. $59 service call.",
    longDescription:
      "We repair front-load, top-load, and stackable washers — leaks, drum issues, control boards, drain pumps, balance problems, and error codes. All major residential and commercial brands.",
    commonIssues: [
      "Washer won't drain or spin",
      "Won't fill with water",
      "Leaking from bottom or door",
      "Loud banging during spin cycle",
      "Error codes on display",
      "Door or lid won't lock",
    ],
    brands: ["LG", "Samsung", "Whirlpool", "Maytag", "GE", "Bosch", "Miele", "Speed Queen", "Electrolux"],
  },
  {
    slug: "dryer-repair",
    name: "Dryer Repair",
    shortName: "Dryer",
    seoNoun: "dryer",
    description:
      "Dryer not heating or taking forever to dry? Same-day dryer repair. $59 service call.",
    longDescription:
      "Gas and electric dryer repair — heating elements, igniters, thermal fuses, vents, belts, drums, control boards. We also clean clogged vents that cause long dry cycles and fire risk.",
    commonIssues: [
      "Dryer runs but won't heat",
      "Clothes take 2+ cycles to dry",
      "Loud squealing or thumping",
      "Won't start or stops mid-cycle",
      "Burning smell",
      "Drum won't tumble",
    ],
    brands: ["LG", "Samsung", "Whirlpool", "Maytag", "GE", "Bosch", "Miele", "Speed Queen", "Electrolux"],
  },
  {
    slug: "dishwasher-repair",
    name: "Dishwasher Repair",
    shortName: "Dishwasher",
    seoNoun: "dishwasher",
    description:
      "Dishwasher leaking, not draining, or leaving dishes dirty? Same-day repair. $59 service call.",
    longDescription:
      "We fix dishwashers from every major brand — pump and motor issues, leaks, control panels, door latches, spray arms, and drainage. Built-in, drawer, and portable units.",
    commonIssues: [
      "Won't drain or standing water in tub",
      "Leaking from door or under unit",
      "Dishes not getting clean",
      "Won't start or buttons unresponsive",
      "Loud humming or grinding",
      "Soap dispenser not opening",
    ],
    brands: ["Bosch", "Miele", "KitchenAid", "Whirlpool", "GE", "Samsung", "LG", "Frigidaire", "Maytag"],
  },
  {
    slug: "oven-repair",
    name: "Oven & Range Repair",
    shortName: "Oven",
    seoNoun: "oven",
    description:
      "Oven not heating, uneven temps, or broken igniter? Same-day repair. $59 service call.",
    longDescription:
      "Gas and electric oven, range, and cooktop repair — bake/broil elements, igniters, control boards, door hinges, thermostats. Including high-end Wolf, Viking, and Thermador.",
    commonIssues: [
      "Oven not heating or slow to heat",
      "Uneven baking or temperature off",
      "Broiler element burned out",
      "Self-clean stuck or door locked",
      "Gas igniter clicking but not lighting",
      "Display showing error code",
    ],
    brands: ["Wolf", "Viking", "Thermador", "Bosch", "KitchenAid", "GE", "Whirlpool", "LG", "Samsung", "Frigidaire"],
  },
  {
    slug: "microwave-repair",
    name: "Microwave Repair",
    shortName: "Microwave",
    seoNoun: "microwave",
    description:
      "Built-in or over-the-range microwave not heating? Same-day repair. $59 service call.",
    longDescription:
      "Built-in, over-the-range, and drawer microwave repair — magnetrons, control boards, door switches, turntable motors, fans.",
    commonIssues: [
      "Microwave runs but doesn't heat",
      "Sparks or arcing inside",
      "Buttons not responding",
      "Loud buzzing",
      "Door won't open or latch",
      "Turntable not spinning",
    ],
    brands: ["GE", "Whirlpool", "Samsung", "LG", "KitchenAid", "Bosch", "Sharp", "Panasonic"],
  },
  {
    slug: "ice-maker-repair",
    name: "Ice Maker Repair",
    shortName: "Ice Maker",
    seoNoun: "ice maker",
    description:
      "Built-in ice maker not making ice? Same-day repair. $59 service call.",
    longDescription:
      "Stand-alone and built-in ice maker repair — water inlet valves, ice molds, harvest assemblies, control boards. Sub-Zero, Scotsman, U-Line, and other premium units.",
    commonIssues: [
      "No ice production",
      "Slow ice production",
      "Cloudy or bad-tasting ice",
      "Ice maker leaking water",
      "Won't cycle through harvest",
      "Error codes",
    ],
    brands: ["Sub-Zero", "Scotsman", "U-Line", "Manitowoc", "Hoshizaki", "KitchenAid", "Whirlpool", "GE"],
  },
  {
    slug: "air-duct-cleaning",
    name: "Air Duct Cleaning",
    shortName: "Air Duct",
    seoNoun: "air duct cleaning",
    description:
      "Professional HVAC and dryer vent cleaning for South Florida homes. $59 service call. Licensed & insured.",
    longDescription:
      "HVAC duct cleaning, dryer vent cleaning, and air handler service for residential and commercial properties. We use HEPA-filtered negative-pressure equipment to pull out years of dust, mold spores, pet dander, and lint — improving indoor air quality and reducing fire risk. Before/after photos every job.",
    commonIssues: [
      "Dust settles on furniture within a day",
      "Dryer takes 2+ cycles or vents are hot",
      "Visible mold near vents or musty smell",
      "Allergies or asthma worse indoors",
      "HVAC blower runs but airflow is weak",
      "Never been cleaned in 5+ years",
      "New construction debris in ducts",
    ],
    brands: ["Carrier", "Trane", "Lennox", "Rheem", "Goodman", "American Standard", "Bryant", "York"],
  },
  {
    slug: "garbage-disposal-repair",
    name: "Garbage Disposal Repair",
    shortName: "Garbage Disposal",
    seoNoun: "garbage disposal",
    description:
      "Garbage disposal jammed, humming, or leaking? Same-day repair or replacement. $59 service call.",
    longDescription:
      "We repair and replace garbage disposals from every major brand — InSinkErator, Waste King, Moen, KitchenAid, GE, Whirlpool. Jams, motor failures, leaking flanges, dishwasher drain hookups — same-day in most cases. If replacement makes more sense than repair, we'll tell you up front and quote a fair install.",
    commonIssues: [
      "Disposal humming but not turning",
      "Won't turn on at all",
      "Leaking under the sink",
      "Strange grinding or rattling noise",
      "Slow drain or backed up",
      "Disposal reset button keeps tripping",
      "Smelly disposal that won't clear",
    ],
    brands: ["InSinkErator", "Waste King", "Moen", "KitchenAid", "GE", "Whirlpool", "Frigidaire", "Kohler"],
  },
  {
    slug: "range-hood-repair",
    name: "Range Hood Repair",
    shortName: "Range Hood",
    seoNoun: "range hood",
    description:
      "Range hood fan, light, or controls dead? Same-day repair. $59 service call.",
    longDescription:
      "Wall-mount, island, under-cabinet, and downdraft range hood repair. Failed blowers, burnt-out LEDs, dead touch panels, broken dampers, loud bearings, grease-clogged ducts — we handle all of it. Premium hoods (Wolf, Viking, Thermador, Vent-A-Hood, Zephyr) get senior techs who know the proprietary control boards.",
    commonIssues: [
      "Fan won't turn on at any speed",
      "Lights work but blower is dead",
      "Loud rattling or grinding from the motor",
      "Touch panel unresponsive or flickering",
      "Damper stuck open or won't close",
      "Weak suction or grease buildup",
      "Burnt-out LED strip or halogen bulbs",
    ],
    brands: ["Wolf", "Viking", "Thermador", "Vent-A-Hood", "Zephyr", "Broan", "Best", "Faber", "Bosch", "KitchenAid", "GE", "Samsung"],
  },
  {
    slug: "wine-cooler-repair",
    name: "Wine Cooler Repair",
    shortName: "Wine Cooler",
    seoNoun: "wine cooler",
    description:
      "Wine cooler running warm or not cooling? Same-day repair. $59 service call.",
    longDescription:
      "Dual-zone and single-zone wine cooler repair — compressors, thermoelectric units, fans, control boards, door seals. Sub-Zero, Wine Enthusiast, EuroCave, and more.",
    commonIssues: [
      "Not cooling to set temperature",
      "Excess condensation inside",
      "Loud fan or compressor noise",
      "Display not working",
      "Door not sealing",
    ],
    brands: ["Sub-Zero", "Viking", "Thermador", "Wine Enthusiast", "EuroCave", "Marvel", "U-Line"],
  },
];

export const SERVICE_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s]),
);
