/**
 * Brand × city landing pages — the premium-lane local layer.
 *
 * 15 pages: {Sub-Zero, Wolf, Viking, Thermador, Miele} × {Miami,
 * Fort Lauderdale, Boca Raton}. These target the exact query family the
 * 2026-06-10 content audit found winnable ("sub-zero repair miami",
 * "wolf range repair miami", "miele repair fort lauderdale") — SERPs held
 * by exact-match micro-sites and directories.
 *
 * Each page combines hand-written city copy (below) with a city-rotated
 * slice of the brand profile's failure-mode bank, so no two city pages of
 * the same brand render the same blocks. Facts stay canonical: $59 service
 * call, 18 techs, 4.79/871, 90-day warranty, EPA-608, HQ Hallandale Beach +
 * Boca Raton office.
 */

export type BrandCityFaq = { question: string; answer: string };

export type BrandCityContent = {
  brand: string; // residential-brand-profiles slug
  city: string; // cities.ts slug
  /** SERP title — rendered absolute (no layout suffix), target ≤60 chars */
  metaTitle: string;
  metaDescription: string;
  h1City: string; // display city for the H1 line
  heroIntro: string;
  local: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  faqs: BrandCityFaq[];
};

const k = (brand: string, city: string) => `${brand}/${city}`;

export const BRAND_CITY_CONTENT: Record<string, BrandCityContent> = {
  // ───────────────────────────── SUB-ZERO ─────────────────────────────
  [k("sub-zero", "miami")]: {
    brand: "sub-zero",
    city: "miami",
    metaTitle: "Sub-Zero Repair Miami — Same-Day · $59 Call · Berne",
    metaDescription:
      "Sub-Zero refrigerator repair in Miami — Brickell, Coconut Grove, Coral Gables. Built-ins, columns, wine units. EPA-608 senior techs, $59 diagnostic, 90-day warranty.",
    h1City: "Miami",
    heroIntro:
      "Brickell columns, Coconut Grove built-ins, Coral Gables classics — Miami holds one of the densest Sub-Zero populations in Florida, and it's the platform our senior techs service most. Same-day dispatch across the city, EPA-608 sealed-system certification, and a flat $59 diagnostic applied toward the repair.",
    local: {
      eyebrow: "Sub-Zero in Miami",
      heading: "High-rise built-ins, salt air, and a platform we know cold",
      paragraphs: [
        "Sub-Zero service in Miami is high-rise service. A BI-42 on the 30th floor of a Brickell tower can't be wheeled out — it gets diagnosed and repaired in place, which means the tech needs the platform knowledge to work through the front grille and behind the panels without disturbing custom millwork. Our Miami Sub-Zero calls go exclusively to the senior rotation, and the building choreography — certificate of insurance for your association, service-elevator booking, floor protection — is handled before the appointment, because in a managed tower that's half the job.",
        "Miami's climate is the other half of the story. Sub-Zero's dual-refrigeration design is robust, but condensers in Edgewater, Mid-Beach, and anywhere near the bay corrode and clog on accelerated schedules, and the symptom chain is predictable: the unit runs longer, the fresh-food side drifts warm, and owners fear the compressor when the real culprit is usually a loaded coil, an evaporator fan, or a defrost terminator. We diagnose by the platform, not by fear — and we carry gauges for both R-134a and the R-600a isobutane systems in the newer Designer series, with EPA-608 Universal certification for the sealed-system work many shops can't legally touch.",
        "The Miami install base spans generations: classic 600-series side-by-sides still anchoring Coral Gables kitchens, the BI line throughout the Grove and the Gables, integrated columns in new Brickell and Edgewater builds, and 424/427 wine units protecting collections across the city. Parts logistics reflect it — Sub-Zero pivot kits, 4204490 filters, and the common fan motors ride on the Miami trucks, and most non-sealed-system repairs close in one visit.",
      ],
    },
    faqs: [
      {
        question: "Do you repair Sub-Zero refrigerators in Brickell condo towers?",
        answer:
          "Yes — built-in Sub-Zero work in managed towers is the core of our Miami brand service. Units are serviced in place by senior techs, and we arrange the COI, service elevator, and floor protection with your building before the visit. The $59 diagnostic applies toward the repair.",
      },
      {
        question: "My Miami Sub-Zero's fresh-food side is warm — is the compressor gone?",
        answer:
          "Usually not. On dual-refrigeration Sub-Zeros a warm fresh-food side most often traces to the evaporator fan, a frost-blocked duct, a defrost terminator, or a condenser loaded with Miami's humid, salty dust. We test the actual circuit at the $59 diagnostic before anyone says the word compressor.",
      },
      {
        question: "How fast can you get to a Sub-Zero call in Miami?",
        answer:
          "Call before noon and same-day is the norm — our techs cross the Miami urban core all day. A Sub-Zero holding hundreds of dollars of food gets priority routing, and the truck stock covers the common platform parts so most repairs finish the first visit.",
      },
    ],
  },
  [k("sub-zero", "fort-lauderdale")]: {
    brand: "sub-zero",
    city: "fort-lauderdale",
    metaTitle: "Sub-Zero Repair Fort Lauderdale · $59 Call · Berne",
    metaDescription:
      "Sub-Zero repair in Fort Lauderdale — Las Olas Isles, Rio Vista, Coral Ridge. Canal-front corrosion specialists, EPA-608 certified, $59 diagnostic, 90-day warranty.",
    h1City: "Fort Lauderdale",
    heroIntro:
      "The Las Olas Isles, Rio Vista, and Coral Ridge hold Fort Lauderdale's Sub-Zero fleet — much of it in canal-front kitchens where brackish air rewrites the maintenance schedule. Senior techs, EPA-608 sealed-system certification, $59 diagnostic, same-day when you call before noon.",
    local: {
      eyebrow: "Sub-Zero in Fort Lauderdale",
      heading: "Canal-front kitchens are a different maintenance reality",
      paragraphs: [
        "Fort Lauderdale's Sub-Zero population concentrates exactly where the salt is: the finger isles off Las Olas, Rio Vista, Harbor Beach, Coral Ridge along the Intracoastal. Brackish air finds the condenser of a built-in refrigerator within a season, and a corroded, dust-bound coil makes the dual compressors run hot and long — the slow-motion failure behind most warm-compartment calls we run here. Our first move on any canal-front Sub-Zero is the condenser; our standing advice is an annual coil service, which on this platform in this city is the difference between component repairs and sealed-system jobs.",
        "The install base skews classic: 600-series side-by-sides and early BI units have been anchoring these kitchens for decades, and they reward a tech who knows the generation — evaporator fan motors, defrost heaters, door cassette gaskets, and the ice maker pivot bushings that dry out and bind. We stock the platform's common parts on the Broward trucks, and what has to be ordered comes through the OEM channel with the part number printed on your invoice.",
        "When the diagnosis is genuinely sealed-system — a leak or a failed compressor on an aging unit — you get the honest version with numbers at the $59 diagnostic: EPA-608-certified repair quoted against the unit's age and the cost of a comparable replacement. Sub-Zeros are rebuildable in a way mass-market units aren't, and on this platform a major repair often is the right money; we'll show you the math either way.",
      ],
    },
    faqs: [
      {
        question: "Why does my canal-front Sub-Zero in Fort Lauderdale need service so often?",
        answer:
          "Salt. Brackish air off the canals corrodes and loads the condenser far faster than inland, making the compressors run hot and long. An annual coil cleaning resets that clock and is the single best maintenance dollar on a canal-front built-in. It's the first thing we check on every warm-unit call.",
      },
      {
        question: "Is a 20-year-old Sub-Zero in Coral Ridge worth repairing?",
        answer:
          "Often yes — that's what separates Sub-Zero from mass-market units. The 600-series platform is serviceable and parts remain available, so fan motors, heaters, gaskets, and even sealed-system work can be sound money against an $10,000+ replacement. We quote the repair against the unit's condition honestly at the $59 diagnostic.",
      },
      {
        question: "Do you handle Sub-Zero wine units in Fort Lauderdale?",
        answer:
          "Yes — 424/427/430-series wine storage is standard work. Zone drift, fan failures, and LED board issues are the common calls; catching a drifting zone early protects the collection, so warm-zone complaints get prompt scheduling.",
      },
    ],
  },
  [k("sub-zero", "boca-raton")]: {
    brand: "sub-zero",
    city: "boca-raton",
    metaTitle: "Sub-Zero Repair Boca Raton — Same-Day · $59 · Berne",
    metaDescription:
      "Sub-Zero repair in Boca Raton from our local S Federal Hwy office — East Boca, Boca West, Mizner Park. Senior techs, EPA-608, $59 diagnostic, 90-day warranty.",
    h1City: "Boca Raton",
    heroIntro:
      "Our Boca Raton office on S Federal Highway anchors Sub-Zero service across the city — East Boca estates, Mizner Park condos, and the country-club kitchens of Boca West and Boca Pointe. Senior platform techs, EPA-608 certification, gate access arranged before arrival, $59 diagnostic.",
    local: {
      eyebrow: "Sub-Zero in Boca Raton",
      heading: "A local office and the club-community routine, mastered",
      paragraphs: [
        "Boca Raton is the center of gravity for our Palm Beach County premium work, and we keep an office at 131 S Federal Hwy because of it. Sub-Zero here means columns and BI units in East Boca and Royal Palm kitchens, integrated panel-ready installs behind custom millwork in Mizner-area condos, and a deep installed base across the gated communities west of I-95. Dispatch from the local office keeps arrival windows tight — and in a club community, an honored window matters as much as the repair.",
        "Gated-community logistics are routine for us: gate clearance arranged when the appointment is booked, association rules respected, and for the condo stock, COI and elevator coordination handled in advance. The units themselves run the full modern range — BI-36 and BI-42 French-door builds, Designer-series integrated columns with R-600a systems, undercounter drawers and wine storage — and they go to the senior rotation with the platform training and the EPA-608 credentials sealed-system work requires.",
        "Boca owners tend to maintain their kitchens properly, so a disproportionate share of our work here is preventive and early-stage: condenser service, door-alignment and gasket work on heavy-use units, ice maker modules, and the drifting wine-storage zone caught before it becomes a warm one. That's the right way to own a Sub-Zero, and the $59 diagnostic makes the look-before-it-breaks call easy money.",
      ],
    },
    faqs: [
      {
        question: "Do you service Sub-Zero in Boca West and the gated communities?",
        answer:
          "Yes — the club communities are regular territory for our Boca office. Gate access is arranged when you book, the arrival window is honored, and Sub-Zero units go to senior techs with EPA-608 certification. The $59 diagnostic applies toward any repair.",
      },
      {
        question: "Can you service a panel-ready integrated Sub-Zero without damaging the cabinetry?",
        answer:
          "That's exactly what the senior rotation is for. Integrated columns are serviced in place using the manufacturer's procedures — panel removal where needed is done with protective film and the right tooling, and door cam/hinge alignment after cabinetry settle is one of our most common Boca repairs.",
      },
      {
        question: "How quickly can a Sub-Zero tech reach East Boca?",
        answer:
          "Our office is on S Federal Hwy in Boca Raton, so East Boca, Royal Palm, and Mizner Park are minutes away — before-noon calls usually land same-day windows. Palm Beach County also has its own dispatch line: (561) 858-9919.",
      },
    ],
  },

  // ─────────────────────────────── WOLF ───────────────────────────────
  [k("wolf", "miami")]: {
    brand: "wolf",
    city: "miami",
    metaTitle: "Wolf Range Repair Miami — Same-Day · $59 · Berne",
    metaDescription:
      "Wolf range, oven & cooktop repair in Miami — Brickell, Coconut Grove, Coral Gables. Igniters, modules, convection. Senior techs, $59 diagnostic, 90-day warranty.",
    h1City: "Miami",
    heroIntro:
      "Wolf ranges anchor serious Miami kitchens — dual-fuel 48s in Coconut Grove, rangetops in Coral Gables, induction and module cooktops in Brickell builds. We service the platform daily: igniter and spark-module work from truck stock, senior techs on the control systems, $59 diagnostic applied to the repair.",
    local: {
      eyebrow: "Wolf in Miami",
      heading: "Hard-working ranges in a city that actually cooks",
      paragraphs: [
        "Miami's Wolf installs get used — these aren't showroom ranges, and the failure pattern shows it. The red-knob gas platforms (R-series ranges, rangetops, GR grills) fail by ignition first: spark electrodes fouled by real cooking, igniters weakening until a burner clicks without lighting, spark modules dropping single burners. All of it is standard truck-stock work for us. The dual-fuel and E-series electric ovens fail by element and control — and Miami's storm-season power quality adds the post-outage lockouts and error displays we get called for every summer.",
        "The city's housing stock adds two Wolf-specific wrinkles. In Brickell and Edgewater towers, ventilation rules favor induction and electric — newer condo kitchens run Wolf induction cooktops and M-series wall ovens whose diagnostics are entirely control-board territory, senior-tech work we don't hand to juniors. In the Grove, the Gables, and the single-family streets, big gas ranges rule, and the salt-side caveat applies: spark electrode insulators and burner components within a mile of the bay corrode measurably faster, which is why a burner that's begun clicking lazily deserves attention before it quits entirely.",
        "Wolf owners in Miami should expect what we deliver everywhere: diagnosis by amp-draw and resistance measurement rather than parts-cannon guessing, OEM parts with the number on the invoice, and the honest call when a repair on an older unit should be weighed against Wolf's own rebuild economics. The $59 diagnostic applies toward whatever the right answer turns out to be.",
      ],
    },
    faqs: [
      {
        question: "My Wolf range burner clicks but won't light in Miami — what's the fix?",
        answer:
          "Most often a fouled or corroded spark electrode (Miami's coastal air accelerates this) or a weakening igniter that can't open the gas valve — both testable at the $59 diagnostic and usually repairable the same visit. If a whole bank of burners drops at once, that points to the spark module, also a standard truck repair.",
      },
      {
        question: "Do you repair Wolf induction cooktops in Miami condos?",
        answer:
          "Yes — induction is increasingly the Brickell-tower standard and it's senior-tech work: generator boards, fan cooling, and touch-control diagnostics handled with the platform's service procedures. Building COI and elevator logistics are arranged before the visit as standard Miami practice.",
      },
      {
        question: "My Wolf oven shows an error after a power flicker — is the board dead?",
        answer:
          "Often it's a lockout that clears with the correct reset procedure, not a dead board. Miami's summer power quality triggers these regularly. We verify the board, sensors, and door-lock circuit before replacing anything — if the board truly took the surge, it's quoted in writing through the OEM channel.",
      },
    ],
  },
  [k("wolf", "fort-lauderdale")]: {
    brand: "wolf",
    city: "fort-lauderdale",
    metaTitle: "Wolf Range Repair Fort Lauderdale · $59 · Berne",
    metaDescription:
      "Wolf range & oven repair in Fort Lauderdale — Las Olas, Rio Vista, Coral Ridge. Ignition, convection, control work by senior techs. $59 diagnostic, 90-day warranty.",
    h1City: "Fort Lauderdale",
    heroIntro:
      "From Las Olas Isles outdoor kitchens to Rio Vista dual-fuel 48s, Fort Lauderdale runs a serious Wolf fleet — much of it within salt range of the canals. Ignition work from truck stock, senior techs on control systems, $59 diagnostic, same-day on most before-noon calls.",
    local: {
      eyebrow: "Wolf in Fort Lauderdale",
      heading: "Canal-city ranges, outdoor grills, and salt-paced wear",
      paragraphs: [
        "Fort Lauderdale gives Wolf two lives: the indoor ranges and wall ovens of Rio Vista, Coral Ridge, and Victoria Park kitchens, and a notable population of Wolf outdoor grills built into the dock-side summer kitchens of the Isles. The outdoor units take the brunt — salt air corrodes burners, igniter electrodes, and valve components on a schedule inland owners never see, and an annual service on a canal-front grill genuinely pays for itself. Indoors, the salt effect is slower but real: spark electrodes and igniters within the canal network's air shed foul and weaken early, and the click-without-light call is our most common Wolf dispatch in this city.",
        "The indoor fleet is classic premium Broward: R-series and dual-fuel ranges, rangetops with grill and griddle modules, M-series and L-series wall ovens. Failure patterns follow the platform — weakening bake igniters on gas ovens, convection fan bearings after years of real use, control lockouts after storm-season power events. Diagnosis is by measurement (igniter amp draw, element resistance, sensor values) and the common parts ride on the Broward trucks for first-visit completion.",
        "Wolf work here runs through the same senior rotation as our Sub-Zero calls — the brands cluster in the same kitchens, and often a single visit covers both. Building logistics for the beach and Intracoastal towers (COI, service elevators) are arranged in advance, and every repair carries the 90-day parts-and-labor warranty with the OEM part number on the invoice.",
      ],
    },
    faqs: [
      {
        question: "Do you service Wolf outdoor grills on the Fort Lauderdale canals?",
        answer:
          "Yes — built-in Wolf grills in dock-side summer kitchens are regular work. Salt exposure means burners, electrodes, and valves wear on an accelerated schedule; we repair what's serviceable, replace what's corroded through, and recommend an annual service for canal-front units.",
      },
      {
        question: "My Wolf oven heats slowly and won't reach temperature — what's the likely cause?",
        answer:
          "On gas units, a weakening bake igniter that opens the valve late and partially — confirmed by amp-draw at the $59 diagnostic, fixed same-visit from truck stock. On dual-fuel and electric, a drifted temperature sensor or a tired element. Either way the diagnosis is a measurement, not a guess.",
      },
      {
        question: "Can one visit cover my Wolf range and Sub-Zero fridge?",
        answer:
          "Usually yes — the same senior techs handle both platforms, and the brands share kitchens across Rio Vista and the Isles. Mention both units when you book and we'll schedule the time to diagnose each; each diagnostic applies toward its own repair.",
      },
    ],
  },
  [k("wolf", "boca-raton")]: {
    brand: "wolf",
    city: "boca-raton",
    metaTitle: "Wolf Range Repair Boca Raton — Same-Day · $59 · Berne",
    metaDescription:
      "Wolf range & oven repair in Boca Raton from our local office — East Boca, Boca West, club communities. Senior techs, $59 diagnostic, 90-day warranty.",
    h1City: "Boca Raton",
    heroIntro:
      "Boca Raton's kitchens run Wolf as the default serious range — 48-inch dual-fuels in East Boca, rangetops and wall ovens across the club communities. Serviced from our S Federal Hwy office: senior techs, gate access pre-arranged, $59 diagnostic applied to the repair.",
    local: {
      eyebrow: "Wolf in Boca Raton",
      heading: "Estate kitchens, entertainers' ranges, local dispatch",
      paragraphs: [
        "Boca's Wolf fleet skews large and well-specified: 48- and 60-inch dual-fuel ranges with double griddles in East Boca and Royal Palm estate kitchens, rangetop-plus-wall-oven configurations throughout Boca West, Boca Pointe, and the newer club builds. These are entertainers' kitchens that surge from idle to full-burner holiday duty — exactly the usage pattern that surfaces weak igniters, tired convection fans, and oven-sensor drift right before the dinner party. Our standing Boca advice: if a burner has started lighting lazily or the oven runs visibly behind its display, book the $59 look before the season, not during it.",
        "Operating from 131 S Federal Hwy keeps Wolf response in this city tight — East Boca and Mizner are minutes out, the western communities a short hop, and gate clearances are arranged at booking so the window holds. Senior techs run the platform with the proper instruments: igniter amp draw, sensor resistance against temperature, spark-module isolation when one burner bank drops. The high-frequency parts — igniters, electrodes, thermostats and sensors for the common R-series and DF-series configurations — ride on the Palm Beach trucks.",
        "Where Boca differs from our other Wolf cities is the proportion of dual-appliance calls: Wolf ranges share these kitchens with Sub-Zero refrigeration almost by default, and a single senior-tech visit frequently services both. Each unit gets its own diagnostic and quote, both carry the 90-day parts-and-labor warranty, and the OEM part numbers go on the invoice — the documentation standard that built a 4.79 rating across 871 reviews.",
      ],
    },
    faqs: [
      {
        question: "Can you service Wolf ranges inside Boca Raton's gated club communities?",
        answer:
          "Yes — Boca West, Boca Pointe, Broken Sound and their neighbors are core territory for our local office. Gate clearance is arranged when you book and the arrival window is honored. Wolf platform work goes to the senior rotation, with the $59 diagnostic applied toward the repair.",
      },
      {
        question: "My Wolf oven runs 25 degrees cool — can that be fixed without replacing the board?",
        answer:
          "Almost always. Temperature offset is usually a drifted cavity sensor — measured against actual temperature at the diagnostic and replaced same-visit on most configurations. Wolf units can also be recalibrated through service mode in some cases, which we check before selling any part.",
      },
      {
        question: "How fast can a Wolf tech reach East Boca?",
        answer:
          "Our office is on S Federal Hwy in Boca Raton — East Boca, Royal Palm, and Mizner Park are minutes from dispatch, and before-noon calls usually get same-day windows. Palm Beach County's direct line is (561) 858-9919.",
      },
    ],
  },

  // ────────────────────────────── VIKING ──────────────────────────────
  [k("viking", "miami")]: {
    brand: "viking",
    city: "miami",
    metaTitle: "Viking Repair Miami — Range & Oven · $59 · Berne",
    metaDescription:
      "Viking range, oven & refrigerator repair in Miami — Coral Gables, Coconut Grove, Brickell. Ignition and control specialists, $59 diagnostic, 90-day warranty.",
    h1City: "Miami",
    heroIntro:
      "Viking's pro-style ranges have been the backbone of ambitious Miami kitchens for twenty-five years — VGSC classics in Coral Gables, 7-Series in new Grove builds, Viking refrigeration alongside. We service every generation: ignition work from truck stock, $59 diagnostic, same-day on most before-noon calls.",
    local: {
      eyebrow: "Viking in Miami",
      heading: "Twenty-five years of installs, every generation still cooking",
      paragraphs: [
        "Miami's Viking population spans the brand's whole history, which makes generational knowledge the difference between a fix and a guess. The early-2000s VGSC/VDSC ranges anchoring Coral Gables and Grove kitchens fail by igniter and valve — predictable, well-documented, fixable from truck stock. The mid-generation units brought the door-hinge and spring failures every Viking tech knows (the oven door that won't quite close is a Viking signature), and the current 5- and 7-Series add electronic controls that diagnose like modern premium ovens. We carry the tech documentation for all of it.",
        "Climate notes apply here as everywhere in this city: spark electrodes and igniters east of US-1 corrode ahead of schedule in bay air, and storm-season power events trip the control lockouts on newer electronic units — most clear with proper reset procedure, which we verify rather than selling boards on spec. Viking refrigeration (built-in columns and the professional French-door units) shares the same Miami reality as all built-in cold: condenser service is mandatory maintenance, not a suggestion.",
        "What Viking owners value — and what we deliver in Miami daily — is keeping a substantial, rebuildable range in service rather than surrendering to a throwaway replacement. Igniters, valves, hinges, thermostats, and door gaskets keep a VGSC cooking for another decade, and the $59 diagnostic with OEM part numbers on the invoice keeps the economics transparent.",
      ],
    },
    faqs: [
      {
        question: "My older Viking range's oven door won't close fully — is that worth fixing?",
        answer:
          "Yes, and it's a classic Viking repair: door hinges and springs wear on the heavy oven doors, the seal opens, and the oven runs slow and hot at the same time. Hinge kits restore the door to factory closure — far cheaper than living with the heat loss or replacing a substantial range.",
      },
      {
        question: "Do you work on both old and new Viking ranges in Miami?",
        answer:
          "Every generation — early VGSC/VDSC classics, the mid-2000s units, and current 5- and 7-Series with electronic controls. The failure patterns differ by generation and we carry documentation for each. The $59 diagnostic applies regardless of the range's age.",
      },
      {
        question: "Do you service Viking refrigerators in Miami too?",
        answer:
          "Yes — Viking built-in refrigeration and professional French-door units are standard work, with the same Miami caveat as all built-in cold: bay-air corrosion makes condenser service essential. Refrigeration calls go to EPA-608 certified techs.",
      },
    ],
  },
  [k("viking", "fort-lauderdale")]: {
    brand: "viking",
    city: "fort-lauderdale",
    metaTitle: "Viking Repair Fort Lauderdale — Same-Day · $59 · Berne",
    metaDescription:
      "Viking range & appliance repair in Fort Lauderdale — Las Olas, Coral Ridge, Victoria Park. All generations serviced, $59 diagnostic, 90-day warranty.",
    h1City: "Fort Lauderdale",
    heroIntro:
      "Victoria Park bungalow kitchens, Coral Ridge remodels, Las Olas waterfront builds — Fort Lauderdale's Viking fleet covers every era of the brand. Ignition and hinge work from truck stock, senior techs on the electronic generations, $59 diagnostic applied toward the repair.",
    local: {
      eyebrow: "Viking in Fort Lauderdale",
      heading: "A remodel city full of pro-style ranges",
      paragraphs: [
        "Fort Lauderdale renovates constantly, and Viking has been the pro-style range of choice through two decades of those remodels — so the city's fleet mixes lightly-used newer units in Coral Ridge and Flagler Village flips with hard-working classics in Victoria Park and Rio Vista kitchens that have hosted years of real cooking. The classics fail by igniter, valve, and the famous Viking door hinge; the newer electronic generations fail by sensor and control. We carry generation-specific documentation and the high-frequency parts for both.",
        "The canal-and-coast effect that drives our Sub-Zero and Wolf work here applies equally to Viking: salt air corrodes spark electrodes and burner components on the waterfront streets measurably faster, and outdoor Viking grills in the Isles' summer kitchens age like all dock-side equipment — fast. Indoor or out, the diagnostic discipline is the same: amp-draw and resistance measurements, not parts-cannon guessing, with the $59 visit fee applied to whatever repair you approve.",
        "Viking refrigeration and dishwashers ride along in many of these kitchens, and we service the full brand line in one dispatch when needed. Every repair ships with the 90-day parts-and-labor warranty and OEM part numbers on the invoice — and when an aging unit genuinely isn't worth its next repair, we say that plainly with numbers, which is exactly how we'd want to be treated.",
      ],
    },
    faqs: [
      {
        question: "My Viking burner won't light after I cleaned the range — what happened?",
        answer:
          "Almost always water or cleaner in the spark electrode wells — it shorts the spark to ground. Let them dry, and if the click doesn't return in a day, an electrode has likely failed (cleaning chemicals accelerate corrosion on coastal units). Either way it's a quick, inexpensive diagnosis at $59.",
      },
      {
        question: "Do you repair Viking outdoor grills in Fort Lauderdale?",
        answer:
          "Yes — Viking built-in grills in the Isles' dock-side kitchens are regular work. Salt exposure shortens burner and igniter life outdoors, so we repair what's serviceable, replace what's corroded, and recommend annual service for waterfront units.",
      },
      {
        question: "Are parts still available for older Viking ranges?",
        answer:
          "For most of the fleet, yes — igniters, valves, hinge kits, thermostats, and gaskets for the VGSC-era platforms remain available, and they're what keeps these substantial ranges cooking for another decade. Anything special-order is quoted with lead time at the diagnostic.",
      },
    ],
  },
  [k("viking", "boca-raton")]: {
    brand: "viking",
    city: "boca-raton",
    metaTitle: "Viking Repair Boca Raton — Range & Oven · $59 · Berne",
    metaDescription:
      "Viking range & appliance repair in Boca Raton from our local office — East Boca, Boca West, club communities. All generations, $59 diagnostic, 90-day warranty.",
    h1City: "Boca Raton",
    heroIntro:
      "Boca Raton's club-community kitchens installed Viking by the hundreds through the 2000s, and those ranges are now in their prime repair years. Serviced from our S Federal Hwy office: generation-specific expertise, gate access pre-arranged, $59 diagnostic.",
    local: {
      eyebrow: "Viking in Boca Raton",
      heading: "The 2000s install wave is now the repair wave",
      paragraphs: [
        "Boca Raton's building boom and the rise of the pro-style kitchen happened together, which is why Boca West, Boca Pointe, and the East Boca remodels of that era hold one of the densest Viking concentrations we service. Those VGSC/VDSC-generation ranges are now fifteen to twenty-five years old — squarely in the years where igniters weaken, valves tire, door hinges sag, and thermostats drift. All of it is repairable, all of it is routine for us, and keeping a substantial Viking cooking remains far better money than replacing it with a lesser new range.",
        "Our Boca office on S Federal Hwy runs this work locally: gate clearances arranged at booking for the club communities, tight windows for East Boca and Mizner, and the Palm Beach trucks stocked with the platform's high-frequency parts — igniters, electrodes, hinge kits, sensors. Newer 5- and 7-Series units and Viking's refrigeration line go to the senior rotation with the brand's current service documentation.",
        "A Boca-specific pattern worth naming: seasonal households. Ranges that sit idle for months then surge to holiday duty surface their weak components in the first heavy week — so if you're returning for the season, the pre-season $59 check on a lazy burner or slow oven beats a Thanksgiving-week failure every time. Book it like the AC service; your range earns it.",
      ],
    },
    faqs: [
      {
        question: "My Viking range sat unused all summer in Boca — now a burner won't light. Why?",
        answer:
          "Idle months are hard on gas ranges: humidity corrodes electrodes, residue stiffens valves, and the weak components show up in the first heavy use. It's the classic seasonal-Boca pattern and usually a quick fix — electrode or igniter from truck stock at the $59 diagnostic.",
      },
      {
        question: "Is my 20-year-old Viking from the original Boca West kitchen worth repairing?",
        answer:
          "Usually, emphatically yes. The VGSC-era platforms are mechanically substantial and parts remain available — igniters, valves, hinges, and thermostats restore full function for a fraction of what a comparable new range costs. We give you the honest math at the diagnostic if a unit is ever past it.",
      },
      {
        question: "Do you arrange gate access for Viking service in the club communities?",
        answer:
          "Yes — gate clearance is handled when you book, and the arrival window is honored. Our office is local (131 S Federal Hwy), and Palm Beach County has its own dispatch line: (561) 858-9919.",
      },
    ],
  },

  // ──────────────────────────── THERMADOR ─────────────────────────────
  [k("thermador", "miami")]: {
    brand: "thermador",
    city: "miami",
    metaTitle: "Thermador Repair Miami — Same-Day · $59 · Berne",
    metaDescription:
      "Thermador repair in Miami — Freedom columns, Pro ranges, Star burners. Brickell, Coral Gables, Coconut Grove. Senior techs, $59 diagnostic, 90-day warranty.",
    h1City: "Miami",
    heroIntro:
      "Thermador owns a particular slice of Miami: Freedom refrigeration columns in new Brickell and Edgewater builds, Pro Harmony and Pro Grand ranges in the Gables and the Grove, Star burners everywhere serious cooking happens. Senior techs on the platform, $59 diagnostic, building logistics handled.",
    local: {
      eyebrow: "Thermador in Miami",
      heading: "The new-build brand of Miami's design kitchens",
      paragraphs: [
        "Thermador rode Miami's construction wave: the Freedom column system — fully integrated, panel-ready refrigeration in modular widths — became the architect's default in Brickell, Edgewater, and Design District builds of the last decade, and those columns are now hitting their first real service years. Freedom diagnostics are senior-tech work: door-alignment after cabinetry settle, anti-condensation heater faults in Miami humidity, control electronics that follow Bosch-group (German) service conventions. We carry the documentation and service these columns in place, with tower COI and elevator logistics arranged before arrival.",
        "On the cooking side, Pro Harmony and Pro Grand ranges with the signature Star burners fill the Gables and Grove kitchens. The platform's known patterns are our daily Miami work: Star-burner igniter and electrode service (the burner geometry needs its specific parts, which we stock), oven igniters on the gas cavities, and the touch-control diagnostics on newer units after storm-season power events. Thermador dishwashers — Bosch-built Sapphire and Emerald lines — round out many of these kitchens and follow the familiar E15/E22 code discipline.",
        "Miami adds its standing tax on everything: bay-air corrosion on electrodes and condensers east of US-1, humidity working the column door heaters, surge events testing every control board each summer. The $59 diagnostic, measurement-first method, OEM part numbers on the invoice, and 90-day warranty apply to all of it.",
      ],
    },
    faqs: [
      {
        question: "Do you service Thermador Freedom columns in Miami high-rises?",
        answer:
          "Yes — Freedom columns in Brickell and Edgewater towers are a senior-tech specialty: in-place service, panel and door-alignment work, heater and control diagnostics by the platform's documentation. COI and service-elevator coordination with your building is standard procedure.",
      },
      {
        question: "My Thermador Star burner clicks constantly even when off — what's wrong?",
        answer:
          "Continuous clicking usually means moisture or residue shorting a spark electrode, or a failing spark module grounding through one burner. In Miami's humidity it's common after deep cleaning or a boil-over. It's a quick isolation test at the $59 diagnostic and typically a same-visit fix.",
      },
      {
        question: "Are Thermador dishwasher error codes like E15 serious?",
        answer:
          "E15 means water reached the base pan — the leak-detection float tripped. The code can be cleared, but the leak that caused it must be found or it returns. We open the base, locate the actual source, and fix the cause; that's the difference between a repair and a reset.",
      },
    ],
  },
  [k("thermador", "fort-lauderdale")]: {
    brand: "thermador",
    city: "fort-lauderdale",
    metaTitle: "Thermador Repair Fort Lauderdale · $59 · Berne",
    metaDescription:
      "Thermador repair in Fort Lauderdale — Freedom columns, Pro ranges, dishwashers. Las Olas, Coral Ridge, Flagler Village. $59 diagnostic, 90-day warranty.",
    h1City: "Fort Lauderdale",
    heroIntro:
      "Fort Lauderdale's remodel wave put Thermador into kitchens from Flagler Village townhomes to Las Olas waterfront estates — Freedom columns, Pro ranges, Sapphire dishwashers. Senior techs with the platform documentation, $59 diagnostic, same-day on most before-noon calls.",
    local: {
      eyebrow: "Thermador in Fort Lauderdale",
      heading: "Remodel kitchens, German service logic, salt on the side",
      paragraphs: [
        "Thermador's Fort Lauderdale footprint tracks the city's renovation map: Flagler Village and Victoria Park remodels of the last decade specified Thermador packages heavily (the brand's combined-appliance programs made it the remodeler's economics play), while Las Olas and Coral Ridge estates run the full Freedom column and Pro Grand treatment. The result is a young-ish fleet now entering its first failure years — door heaters and alignment on the columns, Star-burner ignition service on the ranges, and the Bosch-group control diagnostics that reward a tech trained on German service conventions.",
        "The canal-city salt effect lands on Thermador exactly as it does on the city's Sub-Zero fleet: condensers on the refrigeration columns load and corrode early near the water, and ignition components on waterfront ranges foul ahead of schedule. Condenser service on a canal-adjacent Freedom column is annual maintenance, not optional — it's the first inspection point on any warm-column call we run here.",
        "These kitchens are usually multi-Thermador (column + range + dishwasher), and one senior-tech visit can triage all of it: each unit gets its own measured diagnosis and written quote, every repair carries the 90-day parts-and-labor warranty, and OEM part numbers go on the invoice. Before-noon calls usually land same-day windows across the city.",
      ],
    },
    faqs: [
      {
        question: "My Thermador Freedom column is sweating at the door seams — is that a failure?",
        answer:
          "Likely the anti-condensation door heater, which fights exactly this in humid climates — when it fails, condensation appears at the seams and hinge side. It's a known platform repair and senior-tech work on integrated columns. Left alone, chronic moisture damages panels and millwork, so it's worth the $59 look promptly.",
      },
      {
        question: "Can you service all my Thermador appliances in one Fort Lauderdale visit?",
        answer:
          "Usually yes — column, range, and dishwasher in one senior-tech dispatch is common here since remodels installed them as packages. Each appliance gets its own diagnostic and quote; repairs carry the 90-day warranty.",
      },
      {
        question: "Why does my canal-front Thermador column run constantly?",
        answer:
          "Start with the condenser: salt air loads and corrodes it early on waterfront installs, making the system run long to hold temperature. A condenser service often resolves it; if not, we test fans, sensors, and charge in that order. Catching it early is the difference between maintenance and a sealed-system job.",
      },
    ],
  },
  [k("thermador", "boca-raton")]: {
    brand: "thermador",
    city: "boca-raton",
    metaTitle: "Thermador Repair Boca Raton — Same-Day · $59 · Berne",
    metaDescription:
      "Thermador repair in Boca Raton from our local office — Freedom columns, Pro ranges, dishwashers. East Boca, Boca West. $59 diagnostic, 90-day warranty.",
    h1City: "Boca Raton",
    heroIntro:
      "Boca Raton's kitchen renovations specify Thermador packages by default — Freedom columns behind custom panels, Pro Harmony ranges, Sapphire dishwashers. Our S Federal Hwy office runs the platform locally: senior techs, gate access pre-arranged, $59 diagnostic.",
    local: {
      eyebrow: "Thermador in Boca Raton",
      heading: "Package kitchens in club country, serviced from a local office",
      paragraphs: [
        "Thermador's appliance-package economics made it the renovation default across Boca Raton's last decade of kitchen projects — East Boca remodels, Mizner-area condos, and the club-community updates of Boca West and Boca Pointe routinely run a full Thermador suite. That means our Boca Thermador work is suite work: Freedom columns with door-alignment and heater service, Pro ranges with Star-burner ignition maintenance, Bosch-built dishwashers with their disciplined error-code diagnostics. One senior-tech visit typically covers the kitchen.",
        "The seasonal-household pattern that shapes all our Boca premium work applies doubly to Thermador's electronics: months idle, then full holiday duty, with humidity working the column door heaters and control boards in between. Returning residents should treat the pre-season check like the AC service — a $59 diagnostic on a sweating column seam or a lazy burner before Thanksgiving beats a failure during it. Gate clearances for the club communities are arranged at booking, and our local office keeps the windows tight.",
        "Documentation discipline matters on this platform and we keep it: German-convention service procedures, measured diagnostics rather than guesswork, OEM part numbers on every invoice, and the 90-day parts-and-labor warranty on all of it. When a part must come through the OEM channel, the lead time is quoted in writing before you commit.",
      ],
    },
    faqs: [
      {
        question: "Do you service complete Thermador kitchen packages in Boca Raton?",
        answer:
          "Yes — packages are the Boca norm and one senior-tech visit usually triages the column, range, and dishwasher together. Each appliance gets its own measured diagnostic and written quote, with the $59 visit applied toward the repair.",
      },
      {
        question: "We're seasonal residents — should the Thermador kitchen be checked before we return?",
        answer:
          "It's the smartest money in premium-appliance ownership here. Idle humid months surface weak door heaters, electrodes, and sensors in the first week of real use. A pre-season diagnostic visit catches them on your schedule instead of during the holidays.",
      },
      {
        question: "How local is your Thermador service to Boca Raton?",
        answer:
          "Genuinely local — our office is at 131 S Federal Hwy, minutes from East Boca and Mizner Park, with gate access for the club communities arranged at booking. Palm Beach County dispatch: (561) 858-9919.",
      },
    ],
  },

  // ────────────────────────────── MIELE ───────────────────────────────
  [k("miele", "miami")]: {
    brand: "miele",
    city: "miami",
    metaTitle: "Miele Repair Miami — Same-Day Service · $59 · Berne",
    metaDescription:
      "Miele repair in Miami — dishwashers, washers, dryers, coffee systems. Brickell, Coral Gables, Coconut Grove. Factory-trained diagnostics, $59 call, 90-day warranty.",
    h1City: "Miami",
    heroIntro:
      "Miele runs quietly through Miami's best kitchens and laundry rooms — G-series dishwashers behind Brickell millwork, W1/T1 laundry pairs in Edgewater towers, built-in coffee systems in the Gables. We service the platform with its own discipline: service-mode diagnostics, $59 visit, 90-day warranty.",
    local: {
      eyebrow: "Miele in Miami",
      heading: "German engineering meets Miami water and condo living",
      paragraphs: [
        "Miele's Miami footprint is concentrated where the city builds best: integrated G-series dishwashers in Brickell and Edgewater towers, compact W1 washers and T1 heat-pump dryers in condo laundry closets (Miele's ventless 240V-less compacts are practically the new-tower standard), and CM-series built-in coffee systems across the Gables and the Grove. Each line has its own service discipline — Miele diagnostics run through the machine's service mode and fault memory, not guesswork, and that's exactly how our techs work the brand.",
        "Two Miami-specific stresses dominate the failure patterns. First, water: South Florida's hard water scales Miele dishwasher heater circuits, clogs spray-arm jets, and works the coffee systems' brew units and flow meters hard — descaling discipline genuinely determines these machines' lifespans here, and we reset that baseline as part of any service. Second, condo logistics: integrated and stacked Miele units in tight tower closets need careful extraction and the building paperwork (COI, elevator) we arrange as standard Miami procedure.",
        "Miele's heat-pump dryers and brushless pump systems are superb machines that fail in undramatic, diagnosable ways — a condensate path clogged with lint paste, a drifted sensor, a worn brew-unit seal — and they reward genuine platform knowledge with long second lives. The $59 diagnostic applies toward the repair, OEM part numbers go on the invoice, and everything we touch carries the 90-day warranty.",
      ],
    },
    faqs: [
      {
        question: "Do you repair Miele washer-dryer pairs in Miami condos?",
        answer:
          "Yes — compact W1/T1 pairs in tower laundry closets are core Miami work. Heat-pump dryer faults (condensate paths, heat-exchanger lint, sensors) are diagnosed through Miele's service mode, and tight-closet extraction plus building COI/elevator logistics are handled as standard procedure.",
      },
      {
        question: "My Miele dishwasher shows an F-code — can you read it?",
        answer:
          "Yes — Miele's fault codes and service-mode memory tell a trained tech exactly which subsystem failed, and that's how we diagnose: by the machine's own data, not parts-swapping. Most G-series repairs complete in one visit; anything special-order is quoted with lead time in writing.",
      },
      {
        question: "Does Miami water really affect Miele machines?",
        answer:
          "Significantly. Hard water scales dishwasher heaters, jets, and coffee-system brew paths — the single biggest lifespan factor for Miele in Miami. We service the immediate fault and reset your descaling/salt baseline so the machine ages the way Miele intended.",
      },
    ],
  },
  [k("miele", "fort-lauderdale")]: {
    brand: "miele",
    city: "fort-lauderdale",
    metaTitle: "Miele Repair Fort Lauderdale — Same-Day · $59 · Berne",
    metaDescription:
      "Miele repair in Fort Lauderdale — dishwashers, W1/T1 laundry, coffee systems. Las Olas, Coral Ridge, Victoria Park. Service-mode diagnostics, $59 call, 90-day warranty.",
    h1City: "Fort Lauderdale",
    heroIntro:
      "From Las Olas estates to Victoria Park remodels, Fort Lauderdale's Miele machines get the platform discipline they were built for: service-mode diagnostics, OEM parts with numbers on the invoice, $59 visit applied to the repair, 90-day warranty on everything we touch.",
    local: {
      eyebrow: "Miele in Fort Lauderdale",
      heading: "Quiet machines, long lives, and the local water tax",
      paragraphs: [
        "Fort Lauderdale's Miele fleet lives in the same kitchens as the city's Sub-Zero and Wolf installs — Las Olas, Rio Vista, Coral Ridge — plus a strong dishwasher-and-laundry presence in Victoria Park and Flagler Village remodels, where a Miele G-series dishwasher is often the renovation's quiet upgrade. The brand's failure modes here are undramatic and diagnosable: brushless circulation pumps that quit without warning, heat-pump dryer condensate paths pasted with lint, door locks and water paths reporting precise fault codes that reward a tech who reads them properly.",
        "Broward water is moderately hard and the beach-corridor buildings add salt air to the equation: scale works the dishwasher heater circuits and coffee systems, while corrosion finds hinges and fasteners in oceanfront towers. Both are manageable with the maintenance rhythm Miele designed for — and our service visits reset that baseline (salt, descaling, intake screens) along with the immediate repair, because a Miele maintained Miele's way simply doesn't come back on the schedule a neglected one does.",
        "For the Intracoastal and beach towers, the condo routine applies: COI to the association, service-elevator booking, careful extraction of integrated and stacked units from tight closets. Same-day windows are normal for before-noon calls, and Palm Beach-adjacent northern neighborhoods can also route through our Boca office when that's faster.",
      ],
    },
    faqs: [
      {
        question: "My Miele dishwasher in Fort Lauderdale hums but won't circulate — what is it?",
        answer:
          "On Miele's brushless platforms that's the classic circulation-pump symptom — they're quiet, excellent, and fail without much warning. We confirm through service mode rather than guessing, quote the pump in writing, and complete most such repairs in one return visit if the part isn't truck-stock.",
      },
      {
        question: "Do you service Miele built-in coffee systems in Fort Lauderdale?",
        answer:
          "Yes — CM and CVA built-in systems are regular work: brew-unit seals, flow meters, grinder faults, and the scale-related failures Broward water encourages. Descaling discipline gets reset as part of any service so the machine stays out of trouble.",
      },
      {
        question: "Are Miele repairs expensive compared to regular brands?",
        answer:
          "The diagnostic is the same flat $59, and because Miele machines report faults precisely, you're paying for the right part the first time rather than a parts-cannon sequence. Repairs are quoted in writing before work starts, with OEM numbers on the invoice and the 90-day warranty on everything.",
      },
    ],
  },
  [k("miele", "boca-raton")]: {
    brand: "miele",
    city: "boca-raton",
    metaTitle: "Miele Repair Boca Raton — Same-Day · $59 · Berne",
    metaDescription:
      "Miele repair in Boca Raton from our local office — dishwashers, laundry, coffee systems. East Boca, Boca West, club communities. $59 diagnostic, 90-day warranty.",
    h1City: "Boca Raton",
    heroIntro:
      "Boca Raton may be Miele's strongest South Florida city — dishwashers and laundry pairs throughout the club communities, coffee systems in East Boca kitchens. Serviced from our S Federal Hwy office with the platform's own discipline: service-mode diagnostics, $59 visit, 90-day warranty.",
    local: {
      eyebrow: "Miele in Boca Raton",
      heading: "The club-community quiet standard, serviced locally",
      paragraphs: [
        "Walk the kitchens of Boca West, Boca Pointe, or an East Boca renovation and the dishwasher is a Miele more often than anywhere else we serve — the brand's quiet running and panel-ready integration made it the Boca default, with W1/T1 laundry pairs and built-in coffee systems following in the newer projects. Our Boca office services this fleet locally: gate clearance arranged at booking, tight arrival windows, and techs who work the brand through its service modes and fault memory the way Miele intended.",
        "The Boca seasonal rhythm is the platform's main stress here. Machines idle for months develop dried seals, stagnant water paths, and — in the coffee systems — scale that sets like concrete; then the holiday season demands full duty immediately. Returning residents get the same advice we give for the rest of the premium kitchen: a pre-season $59 service visit that runs the diagnostics, refreshes salt and descaling baselines, and catches the worn seal before it's a leak under the cabinetry.",
        "Palm Beach County's water is hard enough to make maintenance rhythm decisive for Miele lifespans — heater circuits, spray jets, and brew units all pay the scale tax when descaling lapses. Every service visit resets that baseline alongside the repair, with OEM part numbers on the invoice and the 90-day parts-and-labor warranty. The county's direct dispatch line is (561) 858-9919.",
      ],
    },
    faqs: [
      {
        question: "Do you service Miele dishwashers inside Boca's gated communities?",
        answer:
          "Constantly — Miele is practically the club-community standard. Gate access is arranged when you book through our local S Federal Hwy office, the window is honored, and the $59 diagnostic applies toward the repair.",
      },
      {
        question: "Our Miele coffee system sat unused all summer and now won't brew — ruined?",
        answer:
          "Almost certainly not ruined: idle months let scale set in the brew path and seals dry, the classic seasonal-Boca pattern. A proper service — brew unit, flow path, descale cycle, seals as needed — usually restores it fully. Worth doing before assuming the worst.",
      },
      {
        question: "Can you maintain Miele machines so they last like they're supposed to?",
        answer:
          "Yes — that's most of the secret with this brand. Salt, descaling, and intake maintenance on Palm Beach County water determine whether a Miele runs ten years or twenty-five. We reset the maintenance baseline at every service visit and show you the rhythm to keep.",
      },
    ],
  },
};

export const BRAND_CITY_SLUGS: { brand: string; city: string }[] = Object.values(
  BRAND_CITY_CONTENT,
).map((c) => ({ brand: c.brand, city: c.city }));

export function getBrandCityContent(brand: string, city: string): BrandCityContent | undefined {
  return BRAND_CITY_CONTENT[k(brand, city)];
}

/** City list for a brand — used for hub→city internal links. */
export function getCitiesForBrand(brand: string): BrandCityContent[] {
  return Object.values(BRAND_CITY_CONTENT).filter((c) => c.brand === brand);
}
