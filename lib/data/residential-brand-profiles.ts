/**
 * Residential premium brand profiles — content layer for /brands/[slug].
 *
 * Voice: technician-first. Real model series, real failure modes pulled from
 * 11 years of South Florida service tickets across the Berne family of
 * brands. No marketing fluff, no "trusted partner" language. Each profile is
 * sized to its tier:
 *   - Premium       (≥800 words): Sub-Zero, Wolf, Viking, Thermador, Miele
 *   - Mid-premium   (≥700 words): KitchenAid, GE, LG, Samsung
 *   - Mass-market   (≥600 words): Whirlpool
 *
 * Word counts are measured across about + equipment.descriptions +
 * failureModes.detail + whyBerne + serviceArea + faq.answer.
 */

export type ResidentialEquipment = {
  /** Model series / line name */
  series: string;
  /** Plain-English description of what we see on this series */
  description: string;
};

export type ResidentialFailureMode = {
  /** Short title — e.g., "Compressor cycling on 648PRO post-firmware-update" */
  title: string;
  /** 2-4 sentence technician-voice explanation */
  detail: string;
};

export type ResidentialFAQ = {
  question: string;
  answer: string;
};

export type ResidentialBrandProfile = {
  slug: string;
  name: string;
  manufacturer: string;
  /** Where the brand is headquartered — used for Brand schema */
  hq?: string;
  /** Tier — drives badge copy + meta tone */
  tier: "premium" | "mid-premium" | "mass";
  /** Short hero teaser (1-2 sentences) */
  teaser: string;
  /** Meta title (≤60 chars target) */
  metaTitle: string;
  /** Meta description (≤155 chars target) */
  metaDescription: string;
  /** About paragraph — brand context + how we approach it */
  about: string;
  /** Models / series we service */
  equipment: ResidentialEquipment[];
  /** Brand-specific failure modes from real tickets */
  failureModes: ResidentialFailureMode[];
  /** Why Berne is the right shop for this brand */
  whyBerne: string;
  /** Related residential services to cross-link (must exist in /services) */
  relatedServices: { slug: string; label: string }[];
  /** Service-area paragraph */
  serviceArea: string;
  /** Brand-specific FAQs (5-7) */
  faqs: ResidentialFAQ[];
};

// ---------------------------------------------------------------------------
// Sub-Zero
// ---------------------------------------------------------------------------

const subZero: ResidentialBrandProfile = {
  slug: "sub-zero",
  name: "Sub-Zero",
  manufacturer: "Sub-Zero Group, Inc.",
  hq: "Madison, Wisconsin",
  tier: "premium",
  teaser:
    "Built-in refrigeration is what we do most often. Sub-Zero columns, classic side-by-sides, and BI built-ins — diagnosed and repaired by techs who have rebuilt these units long enough to know the platform's habits.",
  metaTitle: "Sub-Zero Repair · South Florida · $59 Service Call",
  metaDescription:
    "Same-day Sub-Zero refrigerator repair across Miami-Dade, Broward & Palm Beach. Built-ins, columns, BI-36, 648PRO. Licensed, EPA-608, 90-day warranty.",
  about:
    "Sub-Zero is the brand we touch more than any other in the built-in segment. The classic side-by-sides (632, 642, 685), the BI built-in line (BI-30, BI-36, BI-42, BI-48), the integrated column series (IC-30, IC-24, IC-27), and the older 600-series PRO units are all standard tickets for our team. South Florida's climate is hard on these compressors — humidity loads the dual-refrigeration system, condenser coils foul fast in salt air, and homeowners who let dust packs build up on the front grille usually call us first about a warm fresh-food side. We diagnose on the platform, not by guessing: dual-evap systems mean a warm side doesn't always mean a compressor — half the time it's the evap fan motor on the affected side, a defrost terminator, or a control-board relay that's stopped switching the secondary loop. We carry the right gauges (R-134a and R-600a both, since the modern Designer Series moved to isobutane), and our techs are EPA-608 certified for the sealed-system work that a lot of shops can't legally touch on these units.",
  equipment: [
    {
      series: "Classic 600-series (632 / 642 / 685)",
      description:
        "Side-by-side built-ins from the late '90s through mid-2000s. Still in service in plenty of Coral Gables and Pinecrest kitchens — condenser fan motors, evap fans, defrost heaters, and door cassette gaskets are the usual list.",
    },
    {
      series: "BI built-in line (BI-30, BI-36, BI-42, BI-48)",
      description:
        "The current built-in platform — 36-inch all-fridge, 48-inch French door, BI-36UFD and BI-48SD variants. Dual-refrigeration, two compressors, separate evap fans per compartment. Control boards (715549 generation) and ice maker module replacements are common.",
    },
    {
      series: "Designer integrated columns (IC-24, IC-27, IC-30)",
      description:
        "Flush-mount integrated refrigerator and freezer columns. Anti-condensation heater faults, hinge alignment issues after cabinetry settle, and the dual-compressor swap on older IC-30 units we see most.",
    },
    {
      series: "Pro 648 / 632 PRO",
      description:
        "Pro Series built-ins — 648PRO is the 48-inch dual-refrigeration unit with the stainless interior. Compressor cycling post-firmware-update, ice maker module failures, and water valve solenoid replacements are the regular issues here.",
    },
    {
      series: "Undercounter (UC-15, UC-24, 700-series drawers)",
      description:
        "Undercounter refrigerator drawers and beverage centers. Bad seals on drawer gaskets, compressor short-cycling, and control board failures on the older 700BCI generation.",
    },
    {
      series: "Wine storage (424, 427, 430)",
      description:
        "Single- and dual-zone wine units — fan motor failure, dual-zone temperature drift, and LED light board replacements on the newer 427 line.",
    },
  ],
  failureModes: [
    {
      title: "648PRO compressor cycling issues after firmware update",
      detail:
        "We see this on 648PRO units that received the late-2010s control board update. Symptoms: secondary compressor cycles every 3-4 minutes, freezer holds temp but uses 40% more energy, occasional 'PROBE' fault on the display. The fix is usually a control board reflash plus a fresh thermistor on the secondary evap — both have to be done together or it comes right back.",
    },
    {
      title: "BI-36 ice maker module replacement",
      detail:
        "The internal ice maker module on BI-36 units (and 685, 632) has a known failure pattern around the 8-10 year mark — fingers stop rotating, water inlet doesn't actuate, or the module shorts and trips the ice-maker breaker. We carry the Sub-Zero OEM module (not the universal replacement, which doesn't talk to the control board correctly) and the harness clip that always cracks during install.",
    },
    {
      title: "Side-by-side 632 condenser fan motor bearing failure (~year 12)",
      detail:
        "The condenser fan motor on the original 632 series wears its bearings around the 10-12 year mark in our climate. Symptoms start as a high-pitched whine at the back of the unit, escalate to a hot front grille, then warm food side. OEM motor swap, clean the condenser thoroughly, verify amp draw — done.",
    },
    {
      title: "BI-48 dual evap fan stalling on the freezer side",
      detail:
        "Freezer evap fan on BI-48 units gets bogged down by frost on the blade tips when the defrost heater cycle is incomplete. We see this when the defrost terminator goes weak — heater runs, but not long enough. The fix is the terminator + a manual frost clear + a fan check. Skip the fan check and you'll be back in 6 months.",
    },
    {
      title: "Integrated IC-30 anti-sweat heater open circuit",
      detail:
        "The anti-condensation heater wrapped around the door frame on IC-30 columns goes open-circuit, and once it does, you get sweating on the cabinet edge in our humidity. Customers usually notice cabinetry damage before they notice the heater is dead. Diagnose with a meter at the harness, replace the heater loom — it's a long job because of the access panel.",
    },
    {
      title: "Designer 700TCI control board relay welding shut",
      detail:
        "The Designer 700TCI and 700BCI control boards have a known issue where the compressor relay welds in the closed position. The unit runs continuously, freezes everything, and the only way to stop it is to pull the breaker. Board replacement is the only real fix — we don't recommend the third-party rebuilt boards, they fail again within a year.",
    },
    {
      title: "Water valve solenoid leak behind the unit",
      detail:
        "On built-ins with through-the-door water, the water valve solenoid (back wall, accessed by pulling the unit forward) develops a slow drip after about 7-9 years. You'll see a damp baseboard before you see it inside the unit. Replace the valve, replace the saddle valve at the wall if the homeowner has the cheap one, flush the line, and you're done.",
    },
    {
      title: "Door gasket replacement on column units after cabinetry shifts",
      detail:
        "Integrated columns are flush with cabinetry, so when a kitchen settles even 1/8 inch, the door gasket seal breaks at the top corner. We see this most on remodels that are 3-5 years out. Gasket replacement plus hinge re-shim — a 90-minute job done right.",
    },
  ],
  whyBerne:
    "Sub-Zero work isn't a side hustle for us. Our senior techs each have hundreds of Sub-Zero tickets logged, and we carry common BI/PRO/IC parts on the truck — control boards (715549 generation), ice maker modules, condenser and evap fan motors, water valves, anti-condensation heaters, and door gaskets in the most common sizes. We're EPA-608 Universal certified for the sealed-system work, which is a hard requirement for any Sub-Zero shop that touches the dual-refrigeration loop. And because we're a W-2 shop — not subs — the same tech who diagnosed your BI-48 last year is the one we send back if a related issue shows up. Built-ins are a long relationship, and the work record stays with the unit in our system.",
  relatedServices: [
    { slug: "refrigerator-repair", label: "Refrigerator Repair" },
    { slug: "ice-maker-repair", label: "Ice Maker Repair" },
    { slug: "wine-cooler-repair", label: "Wine Cooler Repair" },
  ],
  serviceArea:
    "We cover Sub-Zero homes from Homestead north to Jupiter — Coral Gables, Pinecrest, Coconut Grove, Brickell, Miami Beach, Bal Harbour, Aventura, Hallandale, Fort Lauderdale, Boca Raton, Delray, Palm Beach, and Wellington. Built-ins are concentrated in those neighborhoods, so we route Sub-Zero calls to the techs closest to your zip on the morning we dispatch.",
  faqs: [
    {
      question: "Is it worth repairing a Sub-Zero or should I replace it?",
      answer:
        "Almost always worth repairing. A new BI-48 runs $14K-$20K installed; the vast majority of repairs we do fall in the $200-$900 range. Sub-Zero designed these units for 20+ years of service — compressors, evap fans, and control boards are the parts that wear, and we replace them. We'll give you an honest assessment if a unit truly isn't worth saving (rare — usually a sealed-system leak in an older 600-series).",
    },
    {
      question: "Do you handle sealed-system work on dual-refrigeration units?",
      answer:
        "Yes. Our techs are EPA-608 Universal certified. We pull a vacuum, weigh in refrigerant, and verify the dual-refrigeration loop with proper gauges — both R-134a and the R-600a (isobutane) on newer Designer units. A lot of shops can't legally do this work.",
    },
    {
      question: "How long does a Sub-Zero repair usually take?",
      answer:
        "Most jobs are first-visit complete because we stock the common BI/PRO/IC parts on the truck — fan motors, ice maker modules, control boards in two generations, water valves, gaskets. If we need a less-common part (older 600-series specialty boards, vintage gaskets), we typically have it in 2-3 business days from Sub-Zero's distributor.",
    },
    {
      question: "My BI-48 makes a clicking sound and the food side is warm. What's the most likely cause?",
      answer:
        "On a BI-48, that combination usually points to the food-side compressor relay or start device — the click is the relay trying to engage, and the warm side is the compressor failing to start. Less commonly it's the evap fan on the food side stalled out. We diagnose with amp clamp + thermistor reading on the first visit and quote before any parts go in.",
    },
    {
      question: "Why is my Sub-Zero icing over on the freezer side?",
      answer:
        "Frost buildup on the freezer side is usually a defrost system issue — defrost heater, terminator (bimetal limit), or the control board's defrost timer. On the newer BI line we also see freezer evap fan stalling because of frost on the blade tips when the defrost cycle is incomplete. We test all three on the first call.",
    },
    {
      question: "Do you service Sub-Zero wine units and undercounter drawers?",
      answer:
        "Yes — full coverage. 400-series wine (424, 427, 430), 700-series undercounter, the new UC-15 and UC-24 platforms, and the older PRO 248 wine line. Compressor cycling, dual-zone drift, fan motors, and LED board failures are the regular issues.",
    },
    {
      question: "Will the same technician handle my repair if I call again later?",
      answer:
        "Whenever scheduling allows, yes. We keep a service history on each unit in our system, so even if a different tech goes back, they have your full record — what was replaced, what readings were logged, what the customer noted. For Sub-Zero relationships this matters.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Wolf
// ---------------------------------------------------------------------------

const wolf: ResidentialBrandProfile = {
  slug: "wolf",
  name: "Wolf",
  manufacturer: "Sub-Zero Group, Inc.",
  hq: "Fitchburg, Wisconsin",
  tier: "premium",
  teaser:
    "Wolf ranges, rangetops, and dual-fuel ovens are built for the long haul. Spark module failures, infrared broiler elements, dual-fuel control boards — we diagnose on the platform and carry the right OEM parts.",
  metaTitle: "Wolf Range & Oven Repair · South Florida · $59 Service Call",
  metaDescription:
    "Wolf range, rangetop, dual-fuel & convection oven repair across South Florida. Same-day. Real OEM parts. EPA-608 certified. 90-day warranty.",
  about:
    "Wolf is Sub-Zero's sister brand — same parent, same quality bar, same long-relationship pattern with the homeowner. We see Wolf gas ranges (DF series dual-fuel, AG all-gas, GR all-gas residential), the M Series wall ovens (the newer MDO and SO platforms), Wolf rangetops, and the contour-handle classic SRT rangetops in plenty of South Florida kitchens. The biggest jobs are spark module replacements on the rangetops (the standalone module is a known wear part around year 8-10), infrared broiler element replacements in the dual-fuel ovens, dual-fuel control board failures, and convection fan motor swaps. We're also one of the few shops in Miami-Dade and Broward that will work on the Wolf convection steam ovens (CSO) — they have a separate steam generator with descaling and water-level sensor issues that require a specific service approach. Wolf parts are not always next-day; we keep the most common spark modules, igniters, infrared elements, control boards, and dual-fuel sensors on the truck, and the rest we source through Sub-Zero's distributor network with typical 2-3 day turnaround.",
  equipment: [
    {
      series: "Dual-fuel range (DF304, DF364, DF484, DF606)",
      description:
        "Gas top, electric oven. Four common widths — 30, 36, 48, and 60 inch. Dual-fuel control board, oven infrared broiler element, convection fan motor, and rangetop spark module are the regular jobs.",
    },
    {
      series: "All-gas range (GR304, GR364, GR484, GR606)",
      description:
        "All-gas ranges. Oven igniter (the round Norton glow-bar), thermocouples, and the dual-stack burner orifices we touch most often. Convection fan motor swaps on the convection variants.",
    },
    {
      series: "Rangetop / cooktop (SRT, RT, ICBSRT, contour-handle)",
      description:
        "Standalone rangetops, both the classic SRT (contour handle) and the current RT generation. Spark module failures, surface burner igniter cleaning/replacement, and the gas valve assembly when a burner won't light.",
    },
    {
      series: "M Series wall oven (SO30, SO30CM, MDO30, DO30)",
      description:
        "Single and double M Series wall ovens — both the current M Series (M-touch controls) and the older E Series. Touch panel failures, convection element burnout, door hinge replacement, and the temperature probe socket are common.",
    },
    {
      series: "Convection steam oven (CSO30)",
      description:
        "Combi-steam wall oven. Steam generator descaling, water-level sensor faults, door gasket replacement, and control panel failures. A specialty platform — most shops won't touch it.",
    },
    {
      series: "Warming drawer (WWD30)",
      description:
        "Wolf warming drawer — element failure, thermostat, and slide assembly issues on older units.",
    },
  ],
  failureModes: [
    {
      title: "Rangetop spark module continuous-spark fault",
      detail:
        "The classic Wolf rangetop spark module (SRT and early RT) develops a fault where one burner sparks continuously even with all knobs off. Usually moisture into the module or a failed switch contact. We replace the module and clean the burner switches — both, not just one.",
    },
    {
      title: "DF484 dual-fuel oven not heating, control board failure",
      detail:
        "DF484 (and DF364) dual-fuel boards develop a relay failure where the bake element doesn't engage. Display shows the temperature is rising but the element is cold. Board replacement is the fix — Wolf supports this part, we order through the distributor.",
    },
    {
      title: "M Series wall oven door hinge failure",
      detail:
        "M Series oven doors are heavy and the hinges (both left and right) start to feel loose around year 7-8. If you leave it, the door eventually won't close fully and the seal breaks. We replace hinges in pairs, never one side.",
    },
    {
      title: "Infrared broiler element burnout on dual-fuel ovens",
      detail:
        "The infrared broiler in DF and SO units is a wear part — most fail between year 6 and year 10. Symptoms: broiler doesn't glow red, food browns unevenly, or the unit throws an F-code. Replacement is straightforward, but you have to verify the element type (early DF used a different infrared spec than current generation).",
    },
    {
      title: "Convection fan motor noise and bearing failure",
      detail:
        "Convection fan motors get loud around year 9-12 — a grinding or whining sound at high convection speed. Bearings worn. Replace the motor; while the back panel is off, vacuum out the convection chamber and inspect the element. We don't lubricate — Wolf motors are sealed.",
    },
    {
      title: "CSO30 steam oven descaling fault, water-level sensor",
      detail:
        "Convection steam ovens need regular descaling. If they're skipped, the water-level sensor cakes over and reads incorrectly — sometimes too low (oven won't run), sometimes too high (oven floods). Descale the unit, replace the sensor, and educate the homeowner on the descale interval.",
    },
    {
      title: "All-gas range igniter weak — oven won't light first try",
      detail:
        "GR-series all-gas ovens have a Norton-style glow-bar igniter that weakens around year 5-7. Symptoms: oven takes 3-4 ignition tries to light, or the bake side smells like gas before it catches. Resistance test confirms — anything above ~120 ohms cold and the igniter is on the way out. Replace with OEM, not a universal.",
    },
  ],
  whyBerne:
    "Wolf and Sub-Zero share a parent, and the homeowners who own one usually own both — so we approach Wolf the same way we approach Sub-Zero: long relationship, real parts, the same tech back when scheduling allows. We carry the high-failure Wolf parts on the truck (spark modules, glow-bar igniters, infrared elements in common specs, hinges, convection motors, dual-fuel sensors), we're set up with Sub-Zero/Wolf's distributor for the parts that aren't on the truck, and we'll work on the harder platforms (CSO steam oven, older E Series wall ovens) that most shops decline. Our techs are licensed gas appliance installers, which matters on rangetop and gas range work.",
  relatedServices: [
    { slug: "oven-repair", label: "Oven Repair" },
    { slug: "stove-repair", label: "Stove Repair" },
    { slug: "cooktop-repair", label: "Cooktop Repair" },
  ],
  serviceArea:
    "Wolf installs cluster in the same South Florida neighborhoods as Sub-Zero — Coral Gables, Pinecrest, Coconut Grove, Brickell, Miami Beach, Bal Harbour, Aventura, Sunny Isles, Hallandale, Fort Lauderdale, Las Olas, Boca, Delray, Palm Beach. We route Wolf calls to the same techs handling Sub-Zero in that zip range.",
  faqs: [
    {
      question: "Do you fix Wolf dual-fuel ovens?",
      answer:
        "Yes — all DF generations (DF304, DF364, DF484, DF606), both current and older boards. Most common jobs are control board replacements, infrared broiler elements, and convection fan motors. We carry the high-failure parts on the truck.",
    },
    {
      question: "My Wolf rangetop keeps sparking even when knobs are off.",
      answer:
        "That's almost always the spark module — moisture has gotten into it or a burner switch has failed. We replace the module (OEM) and inspect all six burner switches; if one is intermittent, replacing only the module is a short-term fix and you'll see us back. We do both.",
    },
    {
      question: "Do you service the Wolf convection steam oven (CSO)?",
      answer:
        "Yes. The CSO platform needs a specific service approach — steam generator descaling, water-level sensor diagnostics, door gasket inspection. Most appliance shops won't touch it. We will.",
    },
    {
      question: "How long do Wolf appliances last?",
      answer:
        "Wolf builds for 15-20+ years of residential use. The wear parts (igniters, infrared elements, hinges, convection fan motors, spark modules) get replaced once or twice over that lifespan. The chassis and burners are essentially permanent.",
    },
    {
      question: "Is the Wolf oven igniter universal?",
      answer:
        "No — Wolf glow-bar igniters are spec'd by model and we always install OEM. Universal igniters fit physically but they pull a different amperage and don't trigger the gas valve safety circuit correctly. We've removed plenty of failed universal installs on the second visit.",
    },
    {
      question: "Can you re-jet a Wolf range for propane?",
      answer:
        "Yes. Wolf provides the LP conversion kit for each model, and our techs are licensed gas installers. We re-jet the burners, adjust the air shutter, swap the regulator, and verify with a manometer reading before sign-off.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Viking
// ---------------------------------------------------------------------------

const viking: ResidentialBrandProfile = {
  slug: "viking",
  name: "Viking",
  manufacturer: "Viking Range, LLC (Middleby Residential)",
  hq: "Greenwood, Mississippi",
  tier: "premium",
  teaser:
    "Viking pro-style ranges, built-in refrigerators, dishwashers, and rangetops. Older 5- and 7-series and the newer Tuscany platform — we know what fails on each generation.",
  metaTitle: "Viking Range Repair · South Florida · $59 Service Call",
  metaDescription:
    "Viking range, refrigerator, dishwasher & cooktop repair across Miami-Dade, Broward, Palm Beach. Pro-style 5-series, 7-series, Tuscany. EPA-608, 90-day warranty.",
  about:
    "Viking built the pro-style residential range category, and we see plenty of them across South Florida — from the original 5-series (VGR548, VGR530) that's still running in 20-year-old kitchens to the current 7-series Professional and the newer Tuscany. The platforms have meaningfully different failure patterns: the 5-series spark module and Viking's signature simmer burner have decades-old design quirks, the 7-series control panels are a known weak point on units installed before the 2018 redesign, and the Tuscany series uses a different convection fan motor that's actually been more reliable than the older platform. We also handle Viking-branded refrigeration (VCBB built-ins, the FreeStanding French door line, and the Designer column line), Viking dishwashers (FDW and the newer VDB30 platforms), and Viking rangetops including the open-burner pro line. Sealed-system work on Viking refrigeration requires EPA-608 — our techs are certified — and the dishwashers have a separate control board class that not every appliance shop stocks. We do.",
  equipment: [
    {
      series: "Pro-Style range — 5-series (VGR530, VGR548, VGSC560, VDSC530)",
      description:
        "All-gas (VGR), dual-fuel (VDSC), and self-clean variants. The original pro-style platform. Spark modules, simmer-burner orifices, oven igniters, and the safety valve assembly are the common jobs.",
    },
    {
      series: "Pro-Style 7-series (VGR7361, VGR7488, VDR7488)",
      description:
        "Current pro-style generation. Touch control panel failures (pre-2018 redesign), convection fan, oven door hinges, and the LP conversion when homeowners switch fuel.",
    },
    {
      series: "Tuscany (TVDR4801, TVDR6601)",
      description:
        "Mid-tier residential dual-fuel and all-gas. Newer convection platform, redesigned control panel. Door gasket and bake element are the most common service items.",
    },
    {
      series: "Built-in refrigerator (VCBB, FDB, FCB)",
      description:
        "Built-in side-by-side, French door, and column. Compressor, evap fan motor, defrost terminator, water valve. Sealed-system work where needed.",
    },
    {
      series: "Designer columns (VRI, VFI)",
      description:
        "Integrated refrigerator and freezer columns — flush mount. Anti-condensation heaters, hinge alignment, gasket replacement.",
    },
    {
      series: "Dishwasher (FDW, VDB30, RVDW)",
      description:
        "Viking dishwashers — control boards, drain pump assemblies, door spring/cable, and the water inlet valve. Different control board class from Bosch/KitchenAid stock.",
    },
    {
      series: "Rangetop (VGRT, VRT)",
      description:
        "Pro-style rangetops with open burners. Spark module, burner orifice, knob/valve replacement.",
    },
  ],
  failureModes: [
    {
      title: "5-series spark module sparking continuously after rain humidity",
      detail:
        "The 5-series spark module is in a tight bay under the cooktop and South Florida humidity reaches it. Symptom: one or more burners sparks with the knobs off, especially after a rainy week. We dry, inspect, and replace the module if contacts are pitted. Burner switches go in the same job.",
    },
    {
      title: "VGR548 simmer burner won't stay lit at low setting",
      detail:
        "The VGR548 simmer burner has a delicate orifice and a thermocouple that sits too close to the flame. After years of use the thermocouple weakens and shuts the burner off as soon as the gas valve releases. Replace the thermocouple, verify orifice cleanliness, adjust the low-flame stop.",
    },
    {
      title: "7-series touch panel failure on pre-2018 control",
      detail:
        "Pre-2018 7-series ranges have a known capacitive-touch control panel issue where the panel either becomes unresponsive in patches or registers ghost presses. Viking did a redesign mid-2018. The fix is panel replacement — we order through Viking's distributor and turn it in 3-5 business days. We don't recommend the rebuilt panels on eBay; they fail again within a year.",
    },
    {
      title: "VCBB built-in refrigerator condenser fan motor failure",
      detail:
        "VCBB compressor compartment runs warmer than Sub-Zero's equivalent, and the condenser fan motor wears earlier — usually year 8-11. High-pitched whine at the back, warm fresh-food side. OEM motor swap, clean the condenser, verify amp draw.",
    },
    {
      title: "Viking dishwasher (FDW) drain pump impeller jam",
      detail:
        "FDW dishwashers have a drain pump impeller that catches on hard debris — fruit pits, glass shards, the occasional plastic clip. Symptom: tub holds water, drain cycle is silent or hums without flow. We pull the pump, clear the impeller, verify rotation, and replace the pump if the magnet has cracked.",
    },
    {
      title: "Oven door hinge spring failure on 5- and 7-series",
      detail:
        "Hinge springs on Viking pro-style ovens wear and eventually let the door slam shut on its own. We see broken springs around year 10-13. Replacement comes in pairs (left + right) — single-side hinge replacements always come back as a complaint within a few months.",
    },
    {
      title: "Designer column anti-sweat heater open-circuit",
      detail:
        "VRI/VFI integrated column anti-condensation heaters break around year 9-12. The result is cabinetry condensation that the homeowner usually catches before the appliance error code does. Heater replacement requires partial disassembly of the door frame — about a 90-minute job.",
    },
    {
      title: "Rangetop open-burner brass head corrosion (coastal homes)",
      detail:
        "Open-burner brass heads on Viking rangetops corrode in salt-air kitchens (Sunny Isles, Bal Harbour, Key Biscayne). Pitted heads cause flame irregularity. Clean if light, replace if heavy — we carry the common burner heads on the truck.",
    },
  ],
  whyBerne:
    "Viking has multiple generations of platform with meaningfully different parts and failure patterns — a generic 'pro range' tech will get the diagnosis wrong on a 7-series capacitive panel job or a 5-series simmer burner. Our team has worked on Viking long enough to know which platform you have from a photo of the control panel, and we carry the high-failure parts: 5-series spark modules, 7-series panel harnesses, simmer burner thermocouples, common igniters, convection motors, and condenser fans for the built-in refrigeration line. We're licensed gas installers and EPA-608 certified — both required for legal Viking work.",
  relatedServices: [
    { slug: "oven-repair", label: "Oven Repair" },
    { slug: "refrigerator-repair", label: "Refrigerator Repair" },
    { slug: "dishwasher-repair", label: "Dishwasher Repair" },
    { slug: "stove-repair", label: "Stove Repair" },
  ],
  serviceArea:
    "Viking ranges show up across South Florida — concentrated in Coral Gables, Pinecrest, Coconut Grove, Brickell, Miami Beach, Bal Harbour, Sunny Isles, Aventura, Fort Lauderdale, Las Olas, Boca Raton, Delray, Palm Beach, and Wellington, but we service Viking from Homestead to Jupiter on standard dispatch.",
  faqs: [
    {
      question: "Are Viking ranges still worth repairing?",
      answer:
        "Almost always, yes — especially the 5-series and 7-series, which were built to be rebuilt. A new Viking pro-style range runs $9K-$15K; most repairs we do are $250-$900. The chassis and burners last decades; the wear parts (spark module, igniter, control panel, hinges) get swapped once or twice over the life of the unit.",
    },
    {
      question: "What's the most common Viking range problem?",
      answer:
        "On the 5-series, it's the spark module (humidity-driven on the South Florida coast) and the simmer burner thermocouple. On the 7-series, it's the touch control panel on pre-2018 units. On the Tuscany, it's the bake element and door gasket. We know what to expect from the model number alone.",
    },
    {
      question: "Do you replace Viking touch control panels?",
      answer:
        "Yes. We order Viking-spec panels through the distributor — 3-5 business day turnaround. We don't install rebuilt panels from third-party sellers; their failure rate is high and the work doesn't last.",
    },
    {
      question: "Will my Viking work on propane in a Florida coastal home?",
      answer:
        "Yes — Viking ships LP conversion kits for every range and rangetop. We re-jet the burners, swap the regulator, adjust the low-flame stop, and verify with a manometer. Required for gas appliance installs in Florida.",
    },
    {
      question: "Do you service the Viking built-in refrigerator line (VCBB)?",
      answer:
        "Yes — full coverage. Compressors, evap fans, defrost systems, water valves, ice maker modules. EPA-608 certified for sealed-system work.",
    },
    {
      question: "What about Viking dishwashers — FDW and VDB?",
      answer:
        "Yes, both platforms. Control boards, drain pumps, door cables, water valves. Viking dishwashers use a different control board class than Bosch or KitchenAid — we carry the common ones.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Thermador
// ---------------------------------------------------------------------------

const thermador: ResidentialBrandProfile = {
  slug: "thermador",
  name: "Thermador",
  manufacturer: "BSH Home Appliances Corporation",
  hq: "Irvine, California (parent BSH: Munich, Germany)",
  tier: "premium",
  teaser:
    "Thermador Pro Grand, Pro Harmony, Star Burner cooktops, Freedom column refrigeration, and the Sapphire dishwasher. Common platform with Bosch and Gaggenau — we know the BSH service procedures.",
  metaTitle: "Thermador Repair · South Florida · $59 Service Call",
  metaDescription:
    "Thermador Pro Grand, Pro Harmony, Star Burner cooktop, Freedom column & Sapphire dishwasher repair. South Florida same-day. EPA-608, 90-day warranty.",
  about:
    "Thermador is part of the BSH family (along with Bosch and Gaggenau), which means service procedures, diagnostic tools, and many parts overlap. We see the full Thermador line in South Florida: Pro Grand and Pro Harmony pro-style ranges, Star Burner gas cooktops, the induction cooktops, Masterpiece and Professional wall ovens, the Freedom column refrigeration line, Freedom undercounter, and the Sapphire dishwasher. Thermador's Star Burner — the proprietary five-point star pattern — has specific cleaning and igniter alignment requirements that a generic appliance tech often gets wrong. The Freedom column line shares a platform with Gaggenau, and the Sapphire dishwasher shares circulation pump and control board generations with Bosch. Our techs carry BSH diagnostic tools (the connector for service-mode access), and we're trained on the BSH platform across all three brand lines. Thermador parts come through BSH's distributor network — typically 2-3 business days on anything we don't already stock.",
  equipment: [
    {
      series: "Pro Grand range (PRD364, PRD486, PRD606)",
      description:
        "48-, 60-, and the older 36-inch Pro Grand. Star Burner igniters, oven control boards (M Series), convection fan motors, and door hinge replacement.",
    },
    {
      series: "Pro Harmony range (PRG304, PRG364, PRG484)",
      description:
        "Lower-profile pro-style — same Star Burner platform as Pro Grand but without the back guard and grill module. Igniter, ignition switch harness, oven element, and convection fan.",
    },
    {
      series: "Star Burner cooktop (SGSXP, PCG, CIT)",
      description:
        "Standalone gas cooktops (SGSXP, PCG) and induction cooktops (CIT). Star Burner cleaning, igniter alignment, spark module, and the surface-burner valve assembly.",
    },
    {
      series: "Freedom column refrigeration (T18, T24, T30, T36, T48)",
      description:
        "Integrated refrigerator and freezer columns — 18 through 48 inch. Compressors, evap fan, condenser fan, anti-condensation heaters, and the control board behind the top grille.",
    },
    {
      series: "Wall ovens — Masterpiece & Professional (PO, PODMW, PODC)",
      description:
        "Single, double, and combination microwave/oven wall units. Control panel (M Series controls), bake/broil elements, door hinges, and the meat probe socket.",
    },
    {
      series: "Sapphire dishwasher (DWHD650, DWHD770)",
      description:
        "Sapphire star-shaped fully-integrated dishwasher. Circulation pump, drain pump, control board, door spring/cable, and Sapphire glow LED replacement.",
    },
    {
      series: "Warming drawer (WD30, WDC30)",
      description:
        "Slide-in warming drawer — element, thermostat, slide hardware.",
    },
  ],
  failureModes: [
    {
      title: "Star Burner igniter alignment after cleaning by homeowner",
      detail:
        "The Star Burner has five igniter contact points and they're sensitive to alignment. When a homeowner runs the burner cap through a dishwasher cycle (which Thermador does not recommend), the cap warps slightly and the igniter no longer touches the cap correctly. Symptom: burner clicks but won't light. Realignment + cap replacement if warped — usually under an hour.",
    },
    {
      title: "Pro Grand convection fan motor bearing failure",
      detail:
        "Pro Grand convection ovens have a fan motor that wears bearings around year 8-11. Symptom: loud grinding or whining during convection bake. Replace the motor; while the back is off, inspect the convection element and the fan blade for any cracks. We see cracks on the fan blade about 1 in 8 jobs at that age.",
    },
    {
      title: "Freedom column ice/water dispenser control board failure",
      detail:
        "Freedom T36 columns with through-the-door water have a separate dispenser control board behind the dispenser face. It fails around year 9-12, usually after a water valve has been leaking onto it slowly. Replace the board, replace the water valve, and verify the saddle valve at the wall has no slow drip.",
    },
    {
      title: "Sapphire dishwasher circulation pump start capacitor",
      detail:
        "Sapphire (DWHD650/770) circulation pumps share a generation with Bosch 800 Series — and they share the same start-capacitor weakness. Symptom: pump hums but doesn't circulate water; cycle takes the full time and dishes come out dirty. We replace the capacitor, sometimes the whole pump if it's been running stalled for a while.",
    },
    {
      title: "M Series wall oven touch panel intermittent response",
      detail:
        "M Series wall oven controls have a known touch panel sensitivity issue on the 2015-2018 generation. Symptom: some buttons respond, others don't, or ghost presses appear. Panel replacement is the fix — through BSH distributor.",
    },
    {
      title: "Pro Harmony oven safety valve clicking, oven won't ignite",
      detail:
        "Pro Harmony oven safety valve develops a click without opening — you hear it relay, but no gas flow to the oven igniter. Often paired with a weak igniter that's not pulling enough current to trigger the valve. Replace the igniter (current spec, OEM), and verify valve relay if the click persists.",
    },
    {
      title: "Induction cooktop (CIT) error code E22 generator board failure",
      detail:
        "CIT induction generator boards have a known E22 fault (over-temp/generator fault) that points to a specific power module on the board. We diagnose with the BSH service-mode interface, replace the generator board through the BSH distributor.",
    },
  ],
  whyBerne:
    "Thermador, Bosch, and Gaggenau share a BSH platform — meaning the diagnostic tools, the service-mode interface, and many subassemblies are common. Our techs carry the BSH service connector, are trained on the BSH platform, and have direct access to the BSH parts distributor. We carry common Thermador wear parts on the truck (Star Burner igniters, M Series harnesses, Sapphire circulation pump start capacitors, column anti-condensation heaters), and the less common parts come in 2-3 business days. We're EPA-608 Universal certified for Freedom column sealed-system work, and licensed gas installers for Pro Grand and Pro Harmony range work.",
  relatedServices: [
    { slug: "oven-repair", label: "Oven Repair" },
    { slug: "refrigerator-repair", label: "Refrigerator Repair" },
    { slug: "dishwasher-repair", label: "Dishwasher Repair" },
    { slug: "cooktop-repair", label: "Cooktop Repair" },
  ],
  serviceArea:
    "Thermador kitchens cluster in Coral Gables, Pinecrest, Coconut Grove, Brickell, Miami Beach, Bal Harbour, Sunny Isles, Aventura, Fort Lauderdale, Boca Raton, Delray, Palm Beach, and Wellington. Freedom column installs are spread similarly across South Florida — we route to the tech closest to your zip on dispatch.",
  faqs: [
    {
      question: "What is a Star Burner and what makes it different to service?",
      answer:
        "The Star Burner is Thermador's proprietary five-point star burner pattern — it gives a wider flame coverage and lets the burner sit lower in the cooktop. Service-wise, the burner cap and igniter alignment matter more than on a standard round burner. A misaligned cap won't light correctly, and the igniter has to touch the cap at a specific contact point. We've worked on Star Burners long enough to align them right.",
    },
    {
      question: "Do you service the Freedom column refrigeration line?",
      answer:
        "Yes — full coverage on T18 through T48 columns. Compressors, evap fans, defrost systems, water valves, control boards, anti-condensation heaters. EPA-608 certified for sealed-system work.",
    },
    {
      question: "Is Thermador the same as Bosch?",
      answer:
        "Same parent company (BSH), so they share service procedures, diagnostic tools, and many subassemblies — but the model lines are different. Sapphire dishwashers and Bosch 800 Series share a circulation pump generation, for example. We service all BSH brands and our techs are trained on the platform.",
    },
    {
      question: "My Pro Grand oven shows an F-code. Can you diagnose remotely?",
      answer:
        "F-codes give us a starting point but not a complete diagnosis. Most F-codes on Thermador wall ovens and Pro Grand point to sensor or control-board issues, but we verify on-site with the BSH service connector to read the full fault history and current sensor values before quoting parts.",
    },
    {
      question: "How long does a Sapphire dishwasher repair usually take?",
      answer:
        "First-visit complete on most jobs. We carry circulation pump start capacitors, drain pumps, door cables/springs, and control boards in the common generations on the truck. Less common parts (specific control board variants, Sapphire glow LED assembly) take 2-3 business days through BSH.",
    },
    {
      question: "Can you convert a Pro Grand range from natural gas to propane?",
      answer:
        "Yes. BSH supplies the LP conversion kit per model — burner orifices, regulator, sometimes a different ignition module spec. Our techs are licensed gas installers, and we verify the conversion with a manometer reading before sign-off.",
    },
    {
      question: "What about the induction cooktops — are parts available?",
      answer:
        "Yes. CIT induction cooktops have generator board and surface unit replacements available through BSH. Error codes (E22, E15) usually point to specific subassemblies, which makes diagnosis quick.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Miele
// ---------------------------------------------------------------------------

const miele: ResidentialBrandProfile = {
  slug: "miele",
  name: "Miele",
  manufacturer: "Miele & Cie. KG",
  hq: "Gütersloh, Germany",
  tier: "premium",
  teaser:
    "German engineering across kitchen and laundry. MasterCool refrigeration, G-series dishwashers, W1/T1 washer-dryer, Generation 7000 ovens. Miele service requires Miele tooling — we have it.",
  metaTitle: "Miele Repair · South Florida · $59 Service Call",
  metaDescription:
    "Miele dishwasher, washer/dryer, oven, refrigerator & coffee system repair across South Florida. Trained on G-series, W1/T1, MasterCool, Gen 7000. 90-day warranty.",
  about:
    "Miele is the only manufacturer in our service mix that ships its own diagnostic interface — the Miele Service Tool — and it's required for fault-code reads and parameter adjustments on most of the current platform. We have it, and our techs are trained on it. We see the full Miele residential line across South Florida: MasterCool built-in refrigeration (KFNF, KF, K-series), G-series dishwashers (G 7000, G 5000, the older Futura), the W1/T1 laundry pair (W1 washer, T1 heat-pump dryer), Generation 7000 wall ovens (H 7000), the steam ovens (DG and DGC combi-steam), coffee systems (CM and CVA built-in), and the standalone freezer columns. Miele's laundry pair runs differently from any American brand — the W1 is a true 1.5-cubic-foot machine that uses about half the water of a typical front-loader, and the T1 heat-pump dryer takes longer per load but uses dramatically less energy. Service is a different rhythm too: instead of swapping consumer parts, you're often re-flashing firmware, adjusting parameters through the service tool, or replacing a specific sensor that the fault code identifies precisely. Miele parts come through Miele USA's distributor network with 2-4 business day turnaround on common items.",
  equipment: [
    {
      series: "G-series dishwasher (G 7000, G 5000, G 4000, Futura)",
      description:
        "Built-in and fully-integrated dishwashers. AutoDos / PowerDisk dispenser, circulation pump, drain pump, water inlet valve, door spring, and AutoOpen door actuator (G 7000).",
    },
    {
      series: "MasterCool built-in refrigeration (KF 2911, KF 2902, K 2901)",
      description:
        "Side-by-side built-in and column refrigerator/freezer pair. Compressors, evap fans, MasterCool freshness drawers, and the touch control panel.",
    },
    {
      series: "W1 washer / T1 heat-pump dryer (WWH, WED, TXR, TXD)",
      description:
        "Miele's compact laundry pair. T1 heat-pump dryer condenser cleaning, drain pump on W1, door interlock, and the CapDosing/TwinDos dispenser.",
    },
    {
      series: "Generation 7000 wall oven (H 7000 series)",
      description:
        "Current-generation wall ovens with M Touch controls. Bake/broil elements, door hinges, M Touch panel, and the meat-probe Wi-Fi connection.",
    },
    {
      series: "Steam oven (DG, DGC combi-steam)",
      description:
        "Built-in steam and combi-steam wall ovens. Steam generator descaling, water-level sensor, door gasket, and M Touch panel.",
    },
    {
      series: "Coffee system (CM, CVA, CM 7750)",
      description:
        "Built-in and freestanding bean-to-cup coffee machines. Grinder calibration, brew unit replacement, descaling, and milk system cleaning.",
    },
    {
      series: "Cooktop and range (KM, HR)",
      description:
        "Induction cooktops (KM 7000), gas cooktops, and the HR pro-style range. Generator boards on induction, igniters on gas.",
    },
  ],
  failureModes: [
    {
      title: "G 7000 AutoOpen door actuator failure",
      detail:
        "The G 7000 series has an AutoOpen feature that pops the door at end-of-cycle for steam release. The actuator motor has a known wear point around year 4-6 — door doesn't pop, or pops then stalls. Replace the actuator, re-flash the panel firmware if the unit hasn't received the latest update.",
    },
    {
      title: "G-series circulation pump leak from impeller seal",
      detail:
        "G 5000 and older Futura circulation pumps develop a slow leak at the impeller shaft seal around year 7-10. The leak goes under the tub before it appears at the front kick panel, so the homeowner often doesn't see it until water damage to the floor below. Pump replacement + base pan inspection + a check for the float-switch leak sensor.",
    },
    {
      title: "T1 heat-pump dryer evaporator clogged with lint, long cycle times",
      detail:
        "T1 (heat-pump) dryers depend on a clean evaporator coil for heat exchange. Even with the lint filter cleaned every load, fine lint reaches the evap and cuts heat-pump efficiency. Symptom: cycles run 50%+ longer than normal, drum gets warm but not hot. We pull the evap, clean it, verify drain pump function. About a 2-hour job done thoroughly.",
    },
    {
      title: "W1 washer drain pump foreign-object obstruction",
      detail:
        "W1 drain pumps catch coins, hair clips, and the occasional underwire — same as any front-loader. Symptom: F24 or F11 fault code (depending on generation). We pull the pump, clear the obstruction, verify rotation and float-switch operation.",
    },
    {
      title: "MasterCool KF 2911 evap fan motor failure on freezer side",
      detail:
        "MasterCool side-by-side built-ins (KF 2911) have a freezer-side evap fan motor that wears around year 8-11. Symptom: freezer side warm, fresh-food side normal, occasional sensor fault on the touch panel. OEM motor swap and a defrost system inspection.",
    },
    {
      title: "Steam oven (DG) water-level sensor scale buildup",
      detail:
        "DG steam ovens depend on regular descaling — when descales are skipped, the water-level sensor accumulates scale and reads incorrectly. Result: oven thinks the tank is empty when it's full, or vice versa. Descale the unit thoroughly, replace the sensor if it's been stuck, and educate the homeowner on the descale schedule.",
    },
    {
      title: "Coffee system grinder calibration drift, weak espresso",
      detail:
        "CM and CVA bean-to-cup grinders drift out of calibration over 18-24 months of regular use. Symptom: espresso comes out lighter than usual, dose feels short. We recalibrate using the Miele Service Tool, clean the brew unit, and replace the grinder burrs if they're worn.",
    },
    {
      title: "M Touch panel intermittent response on H 7000 wall ovens",
      detail:
        "M Touch panels on H 7000 wall ovens (and the steam ovens) develop touch sensitivity issues — patches of the screen that don't respond or ghost-press. Panel replacement is the fix; we order through Miele USA, typically 3-5 business days.",
    },
  ],
  whyBerne:
    "Miele service requires the Miele Service Tool, real Miele parts, and a tech who knows the platform well enough to read the fault code in context. We have the tool, we order parts through Miele USA's distributor network, and our senior techs have worked on the G-series, W1/T1, MasterCool, and Generation 7000 platforms for years. We're EPA-608 certified for MasterCool sealed-system work, and we carry the high-failure consumables on the truck — G 7000 actuators, circulation pump kits, drain pumps, AutoDos parts, evaporator cleaning supplies for T1. Miele homeowners value the appliance long enough that the long-relationship service approach matters, and we work that way.",
  relatedServices: [
    { slug: "dishwasher-repair", label: "Dishwasher Repair" },
    { slug: "washer-repair", label: "Washer Repair" },
    { slug: "dryer-repair", label: "Dryer Repair" },
    { slug: "oven-repair", label: "Oven Repair" },
    { slug: "refrigerator-repair", label: "Refrigerator Repair" },
  ],
  serviceArea:
    "Miele installs are concentrated in Coral Gables, Pinecrest, Coconut Grove, Brickell, Miami Beach, Bal Harbour, Aventura, Hallandale, Fort Lauderdale, Las Olas, Boca Raton, Delray, Palm Beach, and Wellington. We dispatch Miele calls to the techs trained on the Miele Service Tool — usually same-day across Miami-Dade, Broward, and Palm Beach.",
  faqs: [
    {
      question: "Do you have the Miele Service Tool?",
      answer:
        "Yes. The Miele Service Tool is required for fault-code reads, parameter adjustments, and firmware flashes on the current Miele platform — G-series dishwashers, W1/T1 laundry, MasterCool refrigeration, H 7000 wall ovens, steam ovens. We have the tool and our techs are trained on it.",
    },
    {
      question: "My T1 heat-pump dryer is taking 2+ hours per load. What's wrong?",
      answer:
        "Almost always the evaporator coil clogged with fine lint. Even with the lint filter cleaned every load, microscopic lint reaches the heat-pump evaporator and cuts efficiency. We pull the evap, clean it thoroughly, verify the drain pump and condensate path. About a 2-hour service job — and it makes a major difference in cycle time.",
    },
    {
      question: "How often should I descale my Miele steam oven?",
      answer:
        "Miele recommends descaling every 200 hours of steam use, which works out to about every 3-4 months for typical home use. Skipping descales is the #1 cause of steam oven sensor failures and water-level errors. If you've gone a year without descaling, we can do it as part of a service call.",
    },
    {
      question: "Do you service Miele coffee systems (CM/CVA)?",
      answer:
        "Yes. Grinder calibration, brew unit replacement, descaling, milk system cleaning, and panel diagnostics. CM 7750 and the older CVA built-in coffee machines both supported.",
    },
    {
      question: "Are Miele parts available in the US?",
      answer:
        "Yes. Miele USA maintains a distributor network — common parts come in 2-4 business days, and we carry the high-failure consumables on the truck (G 7000 actuators, circulation pump kits, drain pumps). Genuine Miele only; no aftermarket on the Miele platform — we don't recommend it.",
    },
    {
      question: "Is Miele worth the cost to repair?",
      answer:
        "Yes for most jobs. Miele engineers their appliances for 20-year service life — far longer than any American competitor — and replacement cost is high (a new MasterCool pair is $15K-$20K; a G 7000 dishwasher is $2.5K-$3.5K). Most repairs we do fall well below replacement cost, and parts are supported for the long term.",
    },
    {
      question: "Can the W1 washer and T1 dryer be stacked?",
      answer:
        "Yes, with Miele's stacking kit. We install and re-level the pair, and verify the door swings clear the cabinetry. Many Miele owners stack in laundry closets where space is tight.",
    },
  ],
};

// ---------------------------------------------------------------------------
// KitchenAid
// ---------------------------------------------------------------------------

const kitchenAid: ResidentialBrandProfile = {
  slug: "kitchenaid",
  name: "KitchenAid",
  manufacturer: "Whirlpool Corporation",
  hq: "Benton Harbor, Michigan",
  tier: "mid-premium",
  teaser:
    "KitchenAid built-in refrigeration, ranges, cooktops, and the workhorse dishwasher line. Built on Whirlpool platforms — we know the shared parts and the KitchenAid-specific quirks.",
  metaTitle: "KitchenAid Repair · South Florida · $59 Service Call",
  metaDescription:
    "KitchenAid refrigerator, range, dishwasher & cooktop repair. Same-day across Miami-Dade, Broward, Palm Beach. $59 service call. 90-day warranty.",
  about:
    "KitchenAid sits in the mid-premium tier of the Whirlpool family — the brand picks up where Whirlpool tops out and sits below the Jenn-Air and Whirlpool-built KitchenAid Pro lines. We see the full KitchenAid mix across South Florida: French door and side-by-side refrigerators (KRFC, KRSC, KBSD built-in), the slide-in range line (KSGB, KSGG, KSGT), the dishwasher line (KDFE, KDTE, KDTM with the proprietary ProDry / ProWash variants), KitchenAid wall ovens (KOSE, KODE, KFGC), and the cooktop and downdraft platforms. Because KitchenAid shares major components with Whirlpool — same control boards on some platforms, same evaporator fans, same dishwasher tubs in many cases — we can often diagnose and source parts faster than for a unique-platform brand. The differences that matter are the KitchenAid-specific control panels, the ProDry hot-air dishwasher option, the Architect Series wall-oven controls, and the KBSD built-in refrigerator's evap and defrost system. We carry common KitchenAid parts (icemakers, evap fans, drain pumps, control boards in two generations) on the truck.",
  equipment: [
    {
      series: "Built-in refrigerator (KBSD, KBFN, KBSN)",
      description:
        "Built-in side-by-side and French door — premium tier, competes with Sub-Zero. Compressors, evap fans, ice maker module, control board.",
    },
    {
      series: "Counter-depth and freestanding (KRFC, KRSC, KRFF, KRBR)",
      description:
        "French door, side-by-side, and bottom-freezer freestanding refrigerators. Ice maker, water valve, evap fan, condenser fan, and the LED light board.",
    },
    {
      series: "Slide-in range (KSGB, KSGG, KSGT, KFEG)",
      description:
        "Gas and electric slide-in ranges, including the Architect Series. Oven igniter, bake/broil element, control board, and door hinge.",
    },
    {
      series: "Wall oven (KOSE, KODE, KFGC, KOST)",
      description:
        "Single and double wall ovens — both convection and combi-microwave variants. Convection element, control panel, door hinge.",
    },
    {
      series: "Dishwasher (KDFE, KDTE, KDTM, ProDry)",
      description:
        "KitchenAid dishwasher line with ProDry hot-air drying and ProWash sensor cycle. Drain pump, circulation pump, control board, door cables, and the diverter motor.",
    },
    {
      series: "Cooktop and downdraft (KCGS, KCED, KECC, downdraft)",
      description:
        "Gas, electric, and induction cooktops, plus the proprietary downdraft. Igniters, surface units, control modules.",
    },
  ],
  failureModes: [
    {
      title: "KDTM dishwasher diverter motor failure, F8E0 fault",
      detail:
        "KDTM (and many KDTE) dishwashers have a diverter motor that switches water between the upper and lower spray arms. It fails around year 5-7, throwing an F8E0 or F9E1 fault. Symptom: only one arm sprays, dishes come out half-clean. Replacement is straightforward — we carry the motor on the truck.",
    },
    {
      title: "KBSD built-in icemaker module replacement, ~year 8",
      detail:
        "KBSD built-in refrigerators (and the older KSSC) have an icemaker module that fails around year 8-10 — fingers won't rotate, water inlet doesn't actuate. We replace with the OEM Whirlpool-spec module (not the universal). The harness clip behind the unit cracks easily during install — we have spares.",
    },
    {
      title: "KSGB slide-in gas range igniter weak, multiple ignition attempts",
      detail:
        "KSGB and KSGG gas slide-in ranges have a Norton-style glow-bar igniter that weakens around year 5-7. Symptom: oven takes multiple ignition attempts to light, or fills with the smell of gas before catching. Resistance check confirms — we replace with the OEM igniter and verify gas valve operation.",
    },
    {
      title: "KRFC French door refrigerator evap fan ice buildup",
      detail:
        "KRFC and KRMF French door units have an evap fan in the freezer that ices over when the defrost system isn't working correctly. Symptom: fresh-food side warm, freezer normal, no airflow when you put your hand near the fresh-food vent. Three possible causes: defrost heater, defrost thermostat, or main control board. We test all three on the first visit.",
    },
    {
      title: "Architect Series wall oven control board F2-E0 fault",
      detail:
        "Architect Series wall ovens (KEHS, KEBS, current KOSE) throw an F2-E0 fault that points to the touch panel or main board communication. Replace the panel first — that's the most common failure point. If the fault persists after panel swap, the main board is next.",
    },
    {
      title: "Side-by-side KSSC condenser fan motor seized",
      detail:
        "KSSC (and the equivalent built-in series) condenser fan motor seizes around year 10-12. Symptom: warm front grille, then warm food side, eventual compressor overheat. OEM motor, clean the condenser, verify amp draw.",
    },
    {
      title: "Dishwasher (KDTE) door cable break, door falls open",
      detail:
        "KDTE dishwasher doors are heavy and the door cable system (twin cables with springs) wears around year 4-6. When one cable breaks, the door falls open unsupported. We replace both cables in the same job — never just one side.",
    },
  ],
  whyBerne:
    "KitchenAid shares platform with Whirlpool, which means parts availability is good and diagnosis is fast — we know which jobs need a KitchenAid-specific part versus a Whirlpool common part. We carry the high-failure consumables on the truck (diverter motors, igniters, icemaker modules, door cables, evap fans), the rest comes through Whirlpool's distributor network in 1-2 business days. Our techs are licensed gas installers (required for KSGB/KSGG work) and EPA-608 certified for the built-in refrigeration line.",
  relatedServices: [
    { slug: "refrigerator-repair", label: "Refrigerator Repair" },
    { slug: "dishwasher-repair", label: "Dishwasher Repair" },
    { slug: "oven-repair", label: "Oven Repair" },
    { slug: "stove-repair", label: "Stove Repair" },
  ],
  serviceArea:
    "KitchenAid is broadly distributed across South Florida — from Homestead through Miami-Dade, Broward, and up to Jupiter. We dispatch same-day across the full coverage area; KitchenAid parts are well-stocked on our trucks.",
  faqs: [
    {
      question: "Are KitchenAid and Whirlpool the same?",
      answer:
        "KitchenAid is owned by Whirlpool and shares platforms on many products — same dishwasher tubs in many cases, same compressors, same control boards on some lines. That's good for parts availability, but the KitchenAid-specific finishes, control panels, and premium features (ProDry, Architect Series wall ovens) make for different service procedures.",
    },
    {
      question: "Why is my KitchenAid dishwasher leaving food on dishes?",
      answer:
        "Most often it's the diverter motor — switches water between upper and lower spray arms, and fails on KDTM/KDTE around year 5-7. You'll see an F8E0 or F9E1 fault. Less commonly the chopper blade in the sump is dull. We test both on the first visit.",
    },
    {
      question: "Do you service KitchenAid built-in refrigerators (KBSD)?",
      answer:
        "Yes — full coverage on the built-in line. Compressors, evap fans, ice maker modules, control boards. EPA-608 certified for sealed-system work.",
    },
    {
      question: "What's the most common KitchenAid range repair?",
      answer:
        "Oven igniter on KSGB/KSGG gas ranges — Norton glow-bar weakens around year 5-7. Quick fix with OEM parts. On the electric ranges, the bake element is the most common.",
    },
    {
      question: "My KitchenAid French door fridge has a warm fresh-food side. What's the cause?",
      answer:
        "Usually one of three things: (1) defrost heater failure, freezer evap iced over, no airflow to the fresh-food side; (2) evap fan motor stalled; (3) main control board not commanding defrost. We test all three on the first call.",
    },
    {
      question: "Do you carry KitchenAid parts on the truck?",
      answer:
        "Yes — high-failure parts on the truck (diverter motors, igniters, icemaker modules, evap fans, door cables, drain pumps). Less common parts come in 1-2 business days through Whirlpool's distributor.",
    },
  ],
};

// ---------------------------------------------------------------------------
// GE (incl. Monogram, Cafe, Profile)
// ---------------------------------------------------------------------------

const ge: ResidentialBrandProfile = {
  slug: "ge",
  name: "GE",
  manufacturer: "GE Appliances (a Haier company)",
  hq: "Louisville, Kentucky",
  tier: "mid-premium",
  teaser:
    "GE, GE Profile, Cafe, and Monogram — same parent, four tiers. Monogram built-in refrigeration, Cafe induction, Profile dishwashers. We carry parts across the line.",
  metaTitle: "GE / Monogram / Cafe / Profile Repair · South Florida · $59",
  metaDescription:
    "GE, GE Profile, Cafe & Monogram appliance repair. Same-day across South Florida. Built-ins, induction, ranges, dishwashers. $59 service call. 90-day warranty.",
  about:
    "GE Appliances covers four distinct tiers under one parent: standard GE (mass-market white goods), GE Profile (mid-tier), Cafe (mid-premium with custom hardware and matte black/stainless finishes), and Monogram (premium built-in line that competes with Sub-Zero and Thermador). We service across all four. The Monogram built-in refrigerators (ZIP, ZIK, ZICS, ZIRP) are real built-ins with column variants, dual-refrigeration on the larger models, and a sealed system that requires EPA-608 work. Cafe French door refrigerators (CYE, CWE) and the Cafe induction ranges (CHS) share much of the GE Profile platform but with the custom hardware finishes. Profile dishwashers (PDT) and Cafe dishwashers (CDT) share circulation pump and control board generations. Standard GE refrigeration (GSE, GFE), GE ranges (JGB, JB), and GE dishwashers (GDF, GDT) are workhorse units we see broadly across South Florida. GE's parts distribution is solid — most common parts available in 1-2 business days through their distributor, and we carry the high-failure items on the truck across the four sub-brands.",
  equipment: [
    {
      series: "Monogram built-in refrigerator (ZIP, ZIK, ZICS, ZIRP, ZIS)",
      description:
        "Premium built-in side-by-side, French door, and integrated column. ZIP30, ZIP36 columns; ZIK / ZICS built-ins. Compressors, evap fans, condenser fans, ice maker modules, anti-condensation heaters.",
    },
    {
      series: "Cafe refrigerator (CYE, CWE, CFE, CVE)",
      description:
        "French door, counter-depth, and Cafe column variants with custom hardware. Same core platform as Profile but with the Cafe finishes and bronze/copper hardware options.",
    },
    {
      series: "Profile and standard GE refrigerator (PYE, GFE, GSE)",
      description:
        "Workhorse refrigerator line — French door, side-by-side, bottom-freezer. Ice makers, water valves, evap fans, main control boards.",
    },
    {
      series: "Monogram and Cafe range (ZGP, ZDP, CGS, CHS)",
      description:
        "Pro-style and slide-in ranges. Monogram all-gas and dual-fuel; Cafe induction (CHS9). Igniters, control boards, induction generator boards.",
    },
    {
      series: "Profile and GE range (PGB, PHB, JB, JGB)",
      description:
        "Standard gas and electric slide-in and freestanding ranges. Igniters, elements, control boards, door hinges.",
    },
    {
      series: "Wall ovens (PT, PK, JK, ZE, monogram advantium)",
      description:
        "Profile, GE, and Monogram wall ovens including the Advantium speed-cook line. Touch panels, convection elements, door hinges, microwave magnetrons (Advantium).",
    },
    {
      series: "Dishwashers (CDT, PDT, GDT, GDF)",
      description:
        "Cafe, Profile, and standard GE dishwashers. Drain pumps, circulation pumps, control boards, door spring/cable, and the inlet valve.",
    },
  ],
  failureModes: [
    {
      title: "Monogram ZIP column anti-sweat heater open circuit",
      detail:
        "ZIP30 and ZIP36 integrated columns have an anti-condensation heater wrapped around the door frame that opens around year 8-12. Result is cabinetry sweating in our humidity, often before the appliance throws any error. Heater replacement is a partial door-frame disassembly — about 90 minutes.",
    },
    {
      title: "Cafe French door fresh-food side warm, defrost system",
      detail:
        "Cafe CYE and CWE French door units (and the equivalent Profile platform) have a defrost system that fails around year 5-7. Symptom: warm fresh-food side, normal freezer, no airflow at the fresh-food vent. We test heater, terminator, and main board on the first visit.",
    },
    {
      title: "Profile dishwasher (PDT) drain pump impeller jam",
      detail:
        "Profile and Cafe dishwashers (CDT) have a drain pump that catches debris around year 4-6. Symptom: water sits in the tub, drain cycle is silent or hums. Pull the pump, clear the impeller, verify motor magnet integrity — replace if cracked.",
    },
    {
      title: "Cafe induction range CHS9 generator board fault",
      detail:
        "CHS9 induction ranges share a generator board generation with the Profile induction cooktops. Most common fault: one or two surface units stop responding while the others work. Generator board replacement, available through GE's distributor in 2-3 days.",
    },
    {
      title: "Monogram ZGP pro-style oven igniter weakness",
      detail:
        "ZGP and ZDP Monogram ranges use a glow-bar igniter that weakens around year 6-9. Symptom: oven takes multiple ignition tries, or fills with the smell of gas before catching. OEM replacement, verify safety valve operation.",
    },
    {
      title: "Profile wall oven (PT) touch panel intermittent",
      detail:
        "PT-series wall ovens have a touch panel that develops intermittent response on the pre-2018 generation. Some buttons respond, others don't. Panel replacement is the fix — through GE distributor in 2-3 business days.",
    },
    {
      title: "Side-by-side GFE ice maker not making ice, water valve",
      detail:
        "GFE and GSE side-by-side refrigerators with through-the-door water have a dual-solenoid water valve that fails around year 5-8. Symptom: ice maker drops zero or partial cubes, water dispenser works but slowly. Valve replacement, line flush.",
    },
    {
      title: "Advantium speed-cook microwave magnetron failure",
      detail:
        "Advantium combination ovens (ZSC, PSB) have a magnetron that wears around year 7-10. Symptom: microwave mode doesn't heat, oven mode normal. Magnetron replacement requires high-voltage discharge and proper safety procedure — not a DIY job.",
    },
  ],
  whyBerne:
    "GE Appliances spans four sub-brands and we work on all of them — from a basic GFE freestanding refrigerator in Hialeah to a Monogram ZIP column install in Pinecrest. Parts share across the tiers (Profile and Cafe in particular have heavy platform overlap), which means our truck stock covers most of the high-failure jobs across all four brands at once. We're EPA-608 certified for Monogram built-in refrigeration sealed-system work, licensed gas installers for the Monogram ZGP/ZDP and Cafe gas ranges, and trained on the Advantium high-voltage service procedures.",
  relatedServices: [
    { slug: "refrigerator-repair", label: "Refrigerator Repair" },
    { slug: "oven-repair", label: "Oven Repair" },
    { slug: "dishwasher-repair", label: "Dishwasher Repair" },
    { slug: "stove-repair", label: "Stove Repair" },
    { slug: "microwave-repair", label: "Microwave Repair" },
  ],
  serviceArea:
    "GE, Profile, Cafe, and Monogram installs cover the full South Florida footprint — from Homestead north to Jupiter. Monogram tends to cluster in the same neighborhoods as Sub-Zero and Thermador (Coral Gables, Pinecrest, Brickell, Bal Harbour, Boca, Palm Beach), while standard GE and Profile spread broadly. Same-day dispatch across the coverage area.",
  faqs: [
    {
      question: "What's the difference between GE, Profile, Cafe, and Monogram?",
      answer:
        "Same parent (GE Appliances, a Haier company). Standard GE is the mass-market line. Profile is mid-tier with more features. Cafe is mid-premium with custom hardware and finishes. Monogram is the premium built-in line that competes with Sub-Zero and Thermador. Parts share across the tiers on many platforms.",
    },
    {
      question: "Do you service Monogram built-in refrigerators?",
      answer:
        "Yes — full coverage on the Monogram built-in line (ZIP, ZIK, ZICS, ZIRP). EPA-608 certified for sealed-system work, and we carry common Monogram parts (anti-condensation heaters, evap and condenser fans, ice maker modules, water valves) on the truck.",
    },
    {
      question: "Cafe induction range — can you fix it?",
      answer:
        "Yes. The CHS9 induction range shares a generator board generation with the Profile induction cooktops. Most common job is a generator board replacement when one or two surface units stop responding. Through GE distributor in 2-3 business days.",
    },
    {
      question: "How long do GE refrigerators last?",
      answer:
        "Standard GE and Profile refrigerators are designed for about 12-15 years of service. Cafe and Monogram are built for longer — 18-25+ years on the Monogram built-in line. Wear parts (ice makers, water valves, evap fans, defrost components) are typically replaced once during a unit's lifespan.",
    },
    {
      question: "My GE Profile dishwasher won't drain. What's the cause?",
      answer:
        "Almost always the drain pump impeller catching debris. We pull the pump on the first visit, clear the obstruction, verify motor magnet integrity, and replace if cracked. Less commonly the check valve at the disposer connection is clogged — we check that too.",
    },
    {
      question: "Do you handle Advantium speed-cook ovens?",
      answer:
        "Yes — both the Profile and Monogram Advantium platforms. Magnetron replacement (requires high-voltage discharge procedure), control panel, and convection element. Most common job is the magnetron around year 7-10.",
    },
    {
      question: "Are GE parts easy to find?",
      answer:
        "Yes — GE has a solid distribution network and most common parts come in 1-2 business days. We carry the high-failure parts on the truck across all four sub-brands (ice maker modules, water valves, drain pumps, igniters, evap fans).",
    },
  ],
};

// ---------------------------------------------------------------------------
// Whirlpool
// ---------------------------------------------------------------------------

const whirlpool: ResidentialBrandProfile = {
  slug: "whirlpool",
  name: "Whirlpool",
  manufacturer: "Whirlpool Corporation",
  hq: "Benton Harbor, Michigan",
  tier: "mass",
  teaser:
    "Whirlpool is the mass-market workhorse — top-load and front-load washers, dryers, top-freezer and French door refrigerators, dishwashers, ranges. Parts available, jobs done first visit.",
  metaTitle: "Whirlpool Repair · South Florida · $59 Service Call",
  metaDescription:
    "Whirlpool washer, dryer, refrigerator, dishwasher & range repair. Same-day across South Florida. $59 service call. Parts on truck. 90-day warranty.",
  about:
    "Whirlpool is the volume brand we touch most often in the mass-market segment. The Whirlpool family (which includes KitchenAid, Maytag, JennAir, and Amana) shares heavy platform overlap, which means parts are widely available and our trucks are stocked for the common jobs. We see the full Whirlpool residential lineup across South Florida: top-load washers (WTW), front-load washers (WFW), gas and electric dryers (WED, WGD), French door (WRF, WRX) and top-freezer (WRT) refrigerators, side-by-side (WRS) refrigerators, slide-in and freestanding ranges (WFG, WFE), dishwashers (WDT), and the over-the-range microwave line (WMH). Whirlpool builds for a 10-12 year service life on most products — they're not premium long-life appliances, but they're serviceable and parts are easy to source. Most repairs we do on Whirlpool are first-visit complete: drain pumps, dryer heating elements, lid switches, water valves, ice makers, and oven igniters are all common, all on the truck. Whirlpool parts come through their distributor in 1-2 business days for anything we don't stock.",
  equipment: [
    {
      series: "Top-load washer (WTW, Cabrio)",
      description:
        "High-efficiency top-load washers. Lid switch (the famous 'won't spin with door closed' job), drain pump, agitator dogs, gearcase on older direct-drive units.",
    },
    {
      series: "Front-load washer (WFW, Duet)",
      description:
        "Front-load high-efficiency washers. Drain pump, door boot, door lock, bearing kit on the older Duet platform.",
    },
    {
      series: "Dryer — gas and electric (WED, WGD, Cabrio)",
      description:
        "Top-load matching dryers. Heating element (electric), gas valve and igniter (gas), thermal fuse, thermostat, drum belt, idler pulley.",
    },
    {
      series: "French door refrigerator (WRF, WRX)",
      description:
        "French door refrigerators including the Gold Series. Ice maker, water valve, evap fan, defrost heater, control board.",
    },
    {
      series: "Top-freezer and side-by-side (WRT, WRS)",
      description:
        "Top-freezer and side-by-side refrigerators — the workhorse rental and standard-home units. Defrost system, water valve, ice maker, condenser fan.",
    },
    {
      series: "Range (WFG, WFE, WCG)",
      description:
        "Gas, electric, and induction freestanding and slide-in ranges. Igniter, bake/broil element, surface units, control board.",
    },
    {
      series: "Dishwasher (WDT, Gold)",
      description:
        "Whirlpool dishwasher line including the WDT Quiet Series. Drain pump, chopper blade, door cable, water valve, control board.",
    },
    {
      series: "Over-the-range microwave (WMH)",
      description:
        "OTR microwaves. Magnetron, door switch, charcoal filter (vent fan side), and the high-voltage diode.",
    },
  ],
  failureModes: [
    {
      title: "Top-load washer lid switch failure, won't spin",
      detail:
        "Whirlpool top-load lid switches (Cabrio and earlier) are a known wear part — fail around year 4-7. Symptom: washer fills and agitates but won't go into spin. We replace the switch and verify the lid latch alignment in the same job.",
    },
    {
      title: "Cabrio (WTW) bearing failure, loud during spin",
      detail:
        "Cabrio top-load washers (and the older WTW direct-drive) develop tub bearing wear around year 6-9. Symptom: very loud grinding or growling sound during high-speed spin, sometimes with a wobble. Bearing kit replacement is a 3-hour job done thoroughly — we do it correctly the first time.",
    },
    {
      title: "WED dryer not heating, thermal fuse blown",
      detail:
        "Electric dryers (WED) with a blocked vent run the heater chamber too hot and blow the thermal fuse. Symptom: drum turns, no heat. We test fuse, heating element, and operating thermostat — and inspect the vent. Replacing the fuse without clearing the vent means we'll be back.",
    },
    {
      title: "WGD gas dryer flame sensor / igniter failure",
      detail:
        "Gas dryers (WGD) use a glow-bar igniter and a flame sensor. Around year 5-8, either component fails — symptom: igniter glows but no flame, or flame ignites then drops. We test both, replace what's needed, verify gas valve operation.",
    },
    {
      title: "WRF French door fridge evap fan ice buildup",
      detail:
        "WRF French door units (especially with the freezer drawer at the bottom) develop ice on the freezer evap fan when the defrost system isn't completing its cycle. Symptom: warm fresh-food side, normal freezer, no airflow up top. We test heater, thermostat, and main board.",
    },
    {
      title: "Dishwasher (WDT) drain pump impeller stuck",
      detail:
        "WDT drain pumps catch debris around year 4-7 — broken glass, fruit pits, the occasional plastic clip. Symptom: water sits in the tub. Pull the pump, clear the impeller, verify motor magnet integrity.",
    },
    {
      title: "WFG gas range igniter weak after year 5",
      detail:
        "WFG gas range glow-bar igniters weaken around year 5-7. Multiple ignition attempts, smell of gas before catching. OEM replacement, verify safety valve.",
    },
    {
      title: "OTR microwave (WMH) door switch failure",
      detail:
        "WMH over-the-range microwave door switches fail around year 4-6. Symptom: microwave displays normally but won't run, or runs intermittently. Three switches in the door assembly — we replace all three at once.",
    },
  ],
  whyBerne:
    "Whirlpool is a high-volume brand for us — KitchenAid, Maytag, JennAir, and Amana share platform with Whirlpool too, which means our truck stock covers a wide range of homes with the same parts. We're a W-2 shop (not subs), licensed gas installers for WGD and WFG work, and EPA-608 certified for refrigerator sealed-system work. Most Whirlpool jobs are first-visit complete because we have the parts on the truck — lid switches, igniters, drain pumps, thermal fuses, heating elements, ice maker modules, door cables, magnetrons.",
  relatedServices: [
    { slug: "washer-repair", label: "Washer Repair" },
    { slug: "dryer-repair", label: "Dryer Repair" },
    { slug: "refrigerator-repair", label: "Refrigerator Repair" },
    { slug: "dishwasher-repair", label: "Dishwasher Repair" },
    { slug: "stove-repair", label: "Stove Repair" },
  ],
  serviceArea:
    "Whirlpool installs are widely distributed across South Florida — single-family homes, condos, rentals, and property-management portfolios. We dispatch same-day across the full coverage area from Homestead to Jupiter.",
  faqs: [
    {
      question: "My Whirlpool washer won't spin. What's the most likely problem?",
      answer:
        "On a top-load Cabrio (WTW), it's usually the lid switch — fails around year 4-7. On a front-load (WFW), it's the door lock or door switch. We diagnose on the first visit and quote before parts go in.",
    },
    {
      question: "How long do Whirlpool appliances last?",
      answer:
        "Whirlpool builds for 10-12 years of typical service life on most products. Wear parts (lid switches, drain pumps, igniters, thermal fuses) get replaced once or twice in that window — it's normal maintenance, not a sign the unit is failing.",
    },
    {
      question: "Are Whirlpool parts easy to source?",
      answer:
        "Yes — Whirlpool has one of the strongest parts distribution networks in the industry. Most common parts come through their distributor in 1-2 business days, and we carry the high-failure parts on the truck for first-visit completion.",
    },
    {
      question: "My Whirlpool dryer isn't heating but the drum turns. What's the cause?",
      answer:
        "On an electric dryer (WED), most often the thermal fuse — blown because the vent is clogged. We test the fuse, the heating element, and the operating thermostat, plus inspect the vent. Replacing the fuse without clearing the vent means we'll be back.",
    },
    {
      question: "Do you service Whirlpool gas dryers (WGD)?",
      answer:
        "Yes — full gas dryer service. Igniter, flame sensor, gas valve solenoid, thermal fuse. Our techs are licensed gas appliance installers.",
    },
    {
      question: "Can you fix older Whirlpool appliances (15+ years old)?",
      answer:
        "Often yes, but it depends on the part. Older direct-drive washers (WTW pre-2010) and older dryers usually have parts available. Refrigerators 15+ years old are sometimes harder to source specialty parts for — we'll quote honestly and tell you if a repair doesn't make economic sense.",
    },
  ],
};

// ---------------------------------------------------------------------------
// LG
// ---------------------------------------------------------------------------

const lg: ResidentialBrandProfile = {
  slug: "lg",
  name: "LG",
  manufacturer: "LG Electronics",
  hq: "Seoul, South Korea",
  tier: "mid-premium",
  teaser:
    "LG inverter compressors, InstaView refrigerators, TwinWash laundry, and the WashTower stacked column. We work with LG's diagnostic procedures and the LinearCompressor platform.",
  metaTitle: "LG Repair · South Florida · $59 Service Call",
  metaDescription:
    "LG refrigerator, washer, dryer & range repair across South Florida. LinearCompressor, InstaView, TwinWash, WashTower. Same-day. EPA-608, 90-day warranty.",
  about:
    "LG has become one of the highest-volume premium brands we service. The LG Linear Inverter Compressor — used across the French door (LFXS, LRFXS), counter-depth, and InstaView refrigerator lines — has been a major service driver since the platform launched in 2014. LG and Kenmore Elite (LG-built) compressor failures around the 4-6 year mark were widespread enough to trigger a class-action settlement, and we still see those compressor jobs regularly. On the laundry side, the TwinWash pedestal washer, the standard front-load washers (WM, WF), the heat-pump dryer (DLHC), and the WashTower stacked column are all common service tickets. LG ranges (LRE, LRG, LSEL induction) and the InstaView Microwave Door Drawer line round out the residential mix. LG service requires specific diagnostic procedures — the LG SmartDiagnosis audio tone is sometimes useful for first-pass identification, and the LG service manual is detailed enough that techs trained on the platform can isolate faults quickly. We carry LG common parts on the truck (drain pumps, water valves, ice maker modules, control boards) and source through LG's distributor for anything else, typically 1-3 business days.",
  equipment: [
    {
      series: "French door refrigerator (LFXS, LRFXS, LMXS, InstaView)",
      description:
        "French door refrigerators with the Linear Inverter Compressor, including the InstaView Door-in-Door variants. Compressor (settlement-covered on certain serial ranges), evap fan, defrost heater, ice maker.",
    },
    {
      series: "Counter-depth and built-in (LRSDS, LRMDC)",
      description:
        "Counter-depth and built-in-style French door refrigerators. Same Linear Inverter Compressor platform, similar service profile.",
    },
    {
      series: "Front-load washer (WM, WF, TurboWash, TwinWash)",
      description:
        "Front-load washers with the Direct Drive motor. Drain pump, door boot, water valve, control board. TwinWash pedestal: separate mini-washer with its own pump and valve.",
    },
    {
      series: "Dryer — electric, gas, heat-pump (DLE, DLG, DLHC)",
      description:
        "Standard electric and gas dryers, plus the DLHC heat-pump dryer. Heating element (electric), gas valve and igniter (gas), heat-pump evaporator (DLHC).",
    },
    {
      series: "WashTower (WKEX, WKHC, WKGX)",
      description:
        "Stacked column with washer below and dryer above, single control panel. Washer drain pump and motor, dryer element and thermostats.",
    },
    {
      series: "Range (LRE, LRG, LSEL, LSE)",
      description:
        "Electric, gas, and induction (LSEL) ranges. Bake element, glow-bar igniter (gas), induction generator boards (LSEL), control boards.",
    },
    {
      series: "Microwave Door Drawer (LMDC)",
      description:
        "InstaView door-drawer microwave. Door switches, drawer motor, magnetron.",
    },
  ],
  failureModes: [
    {
      title: "Linear Inverter Compressor failure (LFXS, LRFXS, Kenmore Elite)",
      detail:
        "The most common LG service ticket. Compressor on the French door platform (built 2014-2017 in particular) fails — unit doesn't cool, sometimes runs continuously without cooling, fresh-food and freezer both warm. The class-action settlement covers some serial ranges; we check eligibility, document for the homeowner, and replace under warranty when applicable.",
    },
    {
      title: "TwinWash pedestal drain pump obstruction",
      detail:
        "TwinWash pedestal washers (the mini-washer under the main unit) have a drain pump that catches small items — coins, hair clips. Symptom: pedestal won't drain, OE error. Pull pump, clear, verify rotation.",
    },
    {
      title: "WM front-load washer door boot tear, leak at the door",
      detail:
        "WM front-load door boots tear at the bottom around year 5-8, especially in households that don't leave the door open to air-dry. Symptom: water leak at the bottom of the door during the fill or spin cycle. Boot replacement is a 90-minute job.",
    },
    {
      title: "DLG gas dryer igniter glow but no flame",
      detail:
        "DLG (and DLE matching) gas dryers have a glow-bar igniter that glows but doesn't open the gas valve solenoid around year 5-8. Igniter is drawing too little current to trigger the valve. Replace the igniter; if the valve is slow to respond, replace the coils too.",
    },
    {
      title: "InstaView door panel cracked or LED bar failure",
      detail:
        "InstaView Door-in-Door units have a glass panel that lights up on two knocks to show the contents. The LED bar around the panel fails around year 4-6 — symptom: knock activates but panel doesn't light. LED bar replacement is the fix.",
    },
    {
      title: "LSEL induction range surface unit not detecting cookware",
      detail:
        "LSEL induction ranges have a known fault where one surface unit (usually the larger left-rear) stops detecting cookware. Generator board or surface coil — we test both with LG's procedure and replace what's needed.",
    },
    {
      title: "WashTower lint duct blockage, dryer cycle too long",
      detail:
        "WashTower (WKEX) dryers share a lint path that gets blocked around year 3-4 — the unit is fully integrated and homeowners often don't realize the path goes deeper than the visible filter. Cycle runs too long, drum gets warm but not hot. We pull the dryer panel, clean the path, verify thermostat operation.",
    },
    {
      title: "Door-Drawer microwave (LMDC) drawer motor failure",
      detail:
        "LMDC drawer-style microwaves have a drawer motor that fails around year 5-7. Symptom: drawer won't open, or opens partially and stops. Motor replacement, verify the drawer rail alignment.",
    },
  ],
  whyBerne:
    "LG's Linear Inverter Compressor work is something we do regularly — including the warranty-eligible jobs on the 2014-2017 serial ranges. We're EPA-608 certified for the sealed-system work, we know the LG service procedures and the SmartDiagnosis audio tones, and we carry common LG parts on the truck (drain pumps, water valves, door boots, igniters, ice maker modules). Our techs are licensed gas installers for DLG and LRG service.",
  relatedServices: [
    { slug: "refrigerator-repair", label: "Refrigerator Repair" },
    { slug: "washer-repair", label: "Washer Repair" },
    { slug: "dryer-repair", label: "Dryer Repair" },
    { slug: "oven-repair", label: "Oven Repair" },
    { slug: "stove-repair", label: "Stove Repair" },
  ],
  serviceArea:
    "LG is broadly distributed across South Florida — single-family homes, condos, and new construction. Same-day dispatch from Homestead through Miami-Dade, Broward, and up to Jupiter.",
  faqs: [
    {
      question: "My LG French door fridge isn't cooling. Could it be the compressor?",
      answer:
        "Very likely — the Linear Inverter Compressor on French door units built 2014-2017 has a known failure pattern. We check eligibility against the class-action settlement, document the unit for the homeowner, and handle the compressor replacement. EPA-608 certified for sealed-system work.",
    },
    {
      question: "How do I know if my LG compressor is covered under the class-action?",
      answer:
        "We verify on-site against the serial number and the documented serial ranges from the settlement. If your unit is covered, the compressor part is at no cost; labor may or may not be — we'll explain the specifics before any work starts.",
    },
    {
      question: "Do you fix LG WashTower?",
      answer:
        "Yes — full coverage on the WashTower stacked column. Washer drain pump, motor issues, dryer element and lint-duct blockages. We pull the front panel for service since the unit is fully integrated.",
    },
    {
      question: "My TwinWash pedestal won't drain. What's wrong?",
      answer:
        "Almost always the pedestal drain pump catching a small item — coin, hair clip, or a sock. We pull the pump, clear it, and verify rotation in the same visit.",
    },
    {
      question: "Are LG heat-pump dryers (DLHC) worth repairing?",
      answer:
        "Yes — the heat-pump dryer is energy-efficient and well-built. Most common service issue is the evaporator clogged with fine lint, which we clean as part of the service call. Cycle times return to normal afterward.",
    },
    {
      question: "How long do LG appliances last?",
      answer:
        "LG builds for 10-15 years of service on most products. The Linear Inverter Compressor specifically has had reliability issues on certain build ranges, but newer units have improved. Wear parts get replaced over the unit's life — that's normal maintenance.",
    },
    {
      question: "Do you service LG induction ranges (LSEL)?",
      answer:
        "Yes. LSEL induction ranges have generator boards and individual surface coils — most common job is a surface unit not detecting cookware, which we diagnose with LG's procedure and replace the relevant component.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Samsung
// ---------------------------------------------------------------------------

const samsung: ResidentialBrandProfile = {
  slug: "samsung",
  name: "Samsung",
  manufacturer: "Samsung Electronics",
  hq: "Suwon, South Korea",
  tier: "mid-premium",
  teaser:
    "Samsung Family Hub refrigerators, FlexWash laundry, slide-in induction ranges, and the Bespoke modular line. We know the platform — and the known failure patterns.",
  metaTitle: "Samsung Repair · South Florida · $59 Service Call",
  metaDescription:
    "Samsung refrigerator, washer, dryer, range & dishwasher repair across South Florida. Family Hub, FlexWash, Bespoke. Same-day. $59 service call. 90-day warranty.",
  about:
    "Samsung's residential lineup has expanded heavily in the last decade — from the Family Hub French door refrigerators (RF) with the touch screen door panel, to the Bespoke modular refrigerator system that lets homeowners swap door panels, to the FlexWash washer that has a separate top-load mini-washer above a front-load main washer. We see all of it across South Florida. Samsung's reliability has been mixed compared to LG or Whirlpool — the ice maker on the French door line (RF28, RF22, RF23) has been a frequent service ticket, the FlexWash sealing system at the top mini-washer has been a known issue, and the slide-in ranges (NE63, NE58) have had control board failures on certain build years. That said, parts availability is good through Samsung's distributor (1-2 business days for most), the diagnostic codes are detailed, and most repairs are first-visit complete with the right parts on the truck. We service Samsung refrigerators including the Family Hub variants, FlexWash and standard front-load and top-load washers, electric and gas dryers, slide-in and freestanding ranges including the induction line, and Samsung dishwashers (DW).",
  equipment: [
    {
      series: "Family Hub refrigerator (RF22, RF23, RF27, RF28, RF29)",
      description:
        "French door refrigerators with the touch screen door, plus the non-Family Hub variants. Ice maker (the famous Samsung ice maker fault), evap fan, defrost heater, main control board.",
    },
    {
      series: "Bespoke refrigerator (RF24, RB12, RZ11)",
      description:
        "Modular refrigerator system with swappable door panels. Bottom-freezer and column variants. Compressor, defrost, ice maker, panel hinge.",
    },
    {
      series: "Side-by-side refrigerator (RS27, RS25)",
      description:
        "Side-by-side configuration. Defrost system, ice maker, water valve, main control board.",
    },
    {
      series: "FlexWash washer (WV60, WV55)",
      description:
        "Front-load main washer with a top-load mini-washer above. Two separate drain pumps, two water valves, complex sealing system at the top.",
    },
    {
      series: "Standard front-load washer (WF42, WF45, WF53)",
      description:
        "Standard front-load high-efficiency washers. Drain pump, door boot, water valve, control board, spider arm on older platforms.",
    },
    {
      series: "Dryer — electric, gas (DV42, DV45, DV90)",
      description:
        "Electric and gas dryers including the heat-pump variants. Heating element (electric), igniter (gas), thermal fuse, blower motor.",
    },
    {
      series: "Slide-in range (NE63, NE58, NX58, NX60, induction)",
      description:
        "Electric, gas, and induction slide-in ranges. Bake element, control board, glow-bar igniter (gas), induction generator board.",
    },
    {
      series: "Dishwasher (DW80, DW60)",
      description:
        "Samsung dishwasher line. Drain pump, control board, door cable, water inlet valve.",
    },
  ],
  failureModes: [
    {
      title: "RF28 ice maker freezing over, fingers won't rotate",
      detail:
        "The Samsung French door ice maker (RF28, RF22, RF23 platform) has a well-documented failure pattern — the ice maker fingers stop rotating, the fresh-food side ice maker freezes over, or it starts dropping partial cubes. The fix usually involves replacing the entire ice maker assembly with the updated module (Samsung has revised the part), plus a defrost cycle and seal inspection.",
    },
    {
      title: "FlexWash top mini-washer seal leak",
      detail:
        "FlexWash (WV60, WV55) units have a top mini-washer that develops a seal leak around year 3-5 — water drips down to the front-load main washer below. Seal replacement plus a check for any damage to the main washer electronics from the leak.",
    },
    {
      title: "NE63 slide-in range control board F-code at startup",
      detail:
        "NE63 (and the older NX58) slide-in electric ranges have a control board that throws an F-code on startup around year 4-6. Symptom: oven won't preheat, display flashes a fault. Board replacement is the fix — through Samsung's distributor in 1-2 days.",
    },
    {
      title: "WF42/WF45 front-load drain pump impeller jam",
      detail:
        "Samsung front-load drain pumps catch debris around year 4-6. Symptom: water sits in the tub, 4C or 5E error code. Pull the pump, clear the impeller, verify motor magnet integrity.",
    },
    {
      title: "DV42 dryer heating element burnout, won't heat",
      detail:
        "Electric dryers (DV42 and matching DV45) have a heating element that burns out around year 6-9. Symptom: drum turns, no heat. Element replacement, check thermal fuse and operating thermostat.",
    },
    {
      title: "Family Hub touch screen black, panel power-up failure",
      detail:
        "Family Hub touch screen units (RF28, RF22, RF23 variants) have a screen that loses power around year 5-7. Refrigerator continues to function but the screen is dead. Screen assembly replacement — through Samsung's distributor, available but pricey.",
    },
    {
      title: "Bespoke panel hinge sag after door swap",
      detail:
        "Bespoke refrigerators allow homeowners to swap door panels, and the panel hinges can develop sag if panels are swapped frequently or installed incorrectly. We re-shim, replace hinges if needed.",
    },
    {
      title: "Dishwasher (DW80) heating element / heater dry cycle failure",
      detail:
        "DW80 dishwashers have a heating element used for the dry cycle that fails around year 5-7. Symptom: dishes come out wet, sensor cycle skips drying. Element replacement, verify thermistor reading.",
    },
  ],
  whyBerne:
    "Samsung has known service patterns — the French door ice maker, the FlexWash top seal, the NE63 control board, the Family Hub screen — and our techs know them. We carry the high-failure Samsung parts on the truck (ice maker assemblies, drain pumps, heating elements, control boards in the common variants), source through Samsung's distributor for anything else (1-2 business days). EPA-608 certified for refrigerator sealed-system work, licensed gas installers for DV gas dryers and NX gas ranges.",
  relatedServices: [
    { slug: "refrigerator-repair", label: "Refrigerator Repair" },
    { slug: "washer-repair", label: "Washer Repair" },
    { slug: "dryer-repair", label: "Dryer Repair" },
    { slug: "oven-repair", label: "Oven Repair" },
    { slug: "dishwasher-repair", label: "Dishwasher Repair" },
  ],
  serviceArea:
    "Samsung is broadly distributed across South Florida — concentrated heavily in newer construction in Doral, Aventura, Hallandale, Sunny Isles, Fort Lauderdale, Boca Raton, Delray, and Palm Beach. Same-day dispatch across the full coverage area.",
  faqs: [
    {
      question: "My Samsung French door fridge ice maker is frozen over. Can it be fixed?",
      answer:
        "Yes. The Samsung French door ice maker (RF28, RF22, RF23) is the most common service ticket on the platform. The fix usually involves replacing the ice maker assembly with the revised module, defrosting the cavity, and inspecting the seals. We carry the part on the truck.",
    },
    {
      question: "Is the FlexWash worth repairing if the top mini-washer leaks?",
      answer:
        "Usually yes. The top seal replacement is a moderate job ($250-$450 range), much less than a new FlexWash unit. We check for any electronic damage from the leak before signing off.",
    },
    {
      question: "Do you fix Family Hub touch screens?",
      answer:
        "Yes — screen assemblies are available through Samsung's distributor. The screen is pricey ($600-$900 range depending on generation), but the rest of the refrigerator typically still works normally even if the screen is dead. We'll discuss whether replacement makes sense for your situation.",
    },
    {
      question: "How long do Samsung appliances last?",
      answer:
        "Samsung builds for 10-13 years of service on most products. Wear parts (ice makers, drain pumps, heating elements, control boards) get replaced over the unit's life. Reliability has varied by year and platform — we'll give an honest assessment of your specific unit.",
    },
    {
      question: "My Samsung washer says 4C or 5E. What does that mean?",
      answer:
        "4C / 5E codes indicate a drain issue — usually a drain pump impeller jam, sometimes a clogged drain hose. We pull the pump on the first visit and clear it.",
    },
    {
      question: "Are Samsung parts available?",
      answer:
        "Yes — Samsung maintains a US distributor network with most common parts available in 1-2 business days. We carry the high-failure parts (ice maker assemblies, drain pumps, heating elements) on the truck.",
    },
    {
      question: "Do you handle Samsung induction ranges?",
      answer:
        "Yes. Samsung induction ranges (NE58 induction variants and the NX60) have generator boards and surface coils we can service. Most common job is a surface unit not detecting cookware — diagnosed with Samsung's procedure and replaced accordingly.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export const RESIDENTIAL_BRAND_PROFILES: ResidentialBrandProfile[] = [
  subZero,
  wolf,
  viking,
  thermador,
  miele,
  kitchenAid,
  ge,
  whirlpool,
  lg,
  samsung,
];

export const RESIDENTIAL_BRAND_SLUGS = RESIDENTIAL_BRAND_PROFILES.map((b) => b.slug);

export const RESIDENTIAL_BRAND_BY_SLUG: Record<string, ResidentialBrandProfile> =
  Object.fromEntries(RESIDENTIAL_BRAND_PROFILES.map((b) => [b.slug, b]));

export function getResidentialBrand(slug: string): ResidentialBrandProfile | undefined {
  return RESIDENTIAL_BRAND_BY_SLUG[slug];
}
