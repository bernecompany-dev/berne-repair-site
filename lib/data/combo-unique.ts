/**
 * Hand-written unique content for the top-20 service×city combos.
 *
 * WHY THIS EXISTS — the 2026-06-10 techseo audit measured 72% Jaccard /
 * 84% containment between sister-city combo pages; Google crawled the
 * 770-combo tail once (2026-05-16) and declined to index most of it. These
 * 20 combos (10 GSC-proven earners + 10 tier-1 volume bets, audit §5) get
 * genuinely page-specific copy: a hand-written hero intro, a local-context
 * section grounded in the city's actual housing stock, service-nuance cards,
 * and combo-specific FAQs.
 *
 * RULES for adding entries:
 *  - Facts only: $59 diagnostic, 18 techs, completed-repairs count (lives in
 *    data/company.ts REPAIRS_COMPLETED — import it, don't hardcode), 4.79/871
 *    Google rating, 90-day labor & parts warranty, EPA-608, HQ in Hallandale
 *    Beach + Boca Raton office. No invented per-city job counts.
 *  - City color must be true-by-construction (housing stock, salt air,
 *    high-rise logistics, hard water) — not fabricated anecdotes.
 *  - Voice: technician/owner, premium positioning (Sub-Zero/Wolf/Viking
 *    where the city's housing stock supports it), never mass-market coupon
 *    framing.
 */

export type ComboUniqueFaq = { question: string; answer: string };

export type ComboUnique = {
  /**
   * Hand-written SERP meta description — symptom + geo + $59 + 90-day,
   * ≤155 chars. Replaces the templated description variants in the combo
   * route's generateMetadata.
   */
  metaDescription: string;
  /** Replaces the templated hero paragraph under the H1 */
  heroIntro: string;
  /** City-specific deep-dive section rendered after the issues grid */
  local: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  /** Service-nuance cards — what's different about this job in this city */
  nuances?: { title: string; body: string }[];
  /** Combo-specific FAQs, prepended to the templated FAQ set */
  faqs?: ComboUniqueFaq[];
};

const key = (service: string, city: string) => `${service}/${city}`;

export const COMBO_UNIQUE: Record<string, ComboUnique> = {
  // == FLAGSHIP =============================================================
  [key("refrigerator-repair", "miami")]: {
    metaDescription:
      "Warm fridge in Miami? Heat-doubled compressor cycles and salt-air coils — same-day repair, Brickell built-ins to Grove kitchens. $59 call, 90-day warranty.",
    heroIntro:
      "Miami is the hardest city in America to be a refrigerator. Compressors run near-continuously against 90°F ambient heat, condenser coils clog with humidity-bound dust, and anything within a mile of Biscayne Bay corrodes years ahead of schedule. We repair refrigerators here every working day — from Sub-Zero columns in Brickell towers to French-door units in Coconut Grove bungalows — with a flat $59 diagnostic and trucks stocked for same-day completion.",
    local: {
      eyebrow: "Refrigerator repair in Miami — the local reality",
      heading: "Why Miami kills refrigerators faster, and how we work around it",
      paragraphs: [
        "Miami refrigerators live a different life than the spec sheet assumes. A unit rated for 70°F ambient spends half the year fighting 85-95°F kitchens, which means the compressor duty cycle roughly doubles and every marginal component — start relay, condenser fan, door gasket — fails sooner. Add salt-laden air in Edgewater, Mid-Beach, and anywhere east of Biscayne Boulevard, and condenser coils corrode and load up until the sealed system overheats. The single highest-value habit for a Miami fridge owner is a coil cleaning once a year; it's also the first thing our techs check on every warm-fridge call.",
        "The building stock shapes the work too. In Brickell and Downtown high-rises, most of what we see is built-in: Sub-Zero, Thermador, and panel-ready columns that have to be serviced in place — there is no 'wheel it to the curb' option on the 38th floor. Our techs handle service-elevator booking, COI paperwork for building management, and protective floor runs as standard procedure, because in a Brickell condo that's half the job. In the Grove, Little Havana, and Edgewater's older low-rises, it's the opposite problem: 10-20-year-old freestanding units where the honest call is sometimes 'replace, don't repair' — and we'll tell you that on the phone before you pay for a visit.",
        "Parts logistics favor us in Miami proper. Our dispatch routes techs across the urban core all day, so a morning call from Wynwood or the Design District usually gets an afternoon slot, and the truck stock reflects what Miami kitchens actually hold — evaporator fan motors and start relays for LG, Samsung, and Whirlpool, plus Sub-Zero pivot kits and 4204490 water filters for the built-in segment. About 8 of 10 refrigerator calls in the city close on the first visit.",
        "One Miami-specific warning: after summer grid flickers and hurricane-season outages, we get a wave of 'fridge dead after the power came back' calls. Nine times out of ten that's a control board or start device that took the surge — not the compressor. Don't let anyone condemn the unit before those two are tested; the difference is a $200-400 repair versus a four-figure replacement.",
      ],
      },
    nuances: [
      {
        title: "High-rise built-ins are most of the work",
        body: "Brickell, Downtown, and Edgewater towers mean Sub-Zero, Thermador, and integrated columns serviced in place. We coordinate service elevators and building COIs ourselves — senior techs only on panel-ready units.",
      },
      {
        title: "Salt air = condenser death",
        body: "East of Biscayne Boulevard, coils corrode and clog years early. Every warm-fridge diagnostic starts at the condenser; an annual coil cleaning is the cheapest insurance a Miami fridge can get.",
      },
      {
        title: "Post-outage surge failures",
        body: "After grid flickers, boards and start relays fail — compressors usually survive. We test both before any replacement talk.",
      },
      {
        title: "Heat-doubled duty cycles",
        body: "Miami ambient heat roughly doubles compressor runtime versus the design assumption. Marginal relays, fans, and gaskets fail sooner here — which is why our trucks carry them as standard stock.",
      },
    ],
    faqs: [
      {
        question: "Do you service built-in refrigerators in Brickell and Downtown Miami condo towers?",
        answer:
          "Yes — built-in and panel-ready units (Sub-Zero, Thermador, Viking, Miele) in high-rises are a core part of our Miami work. We handle the building logistics ourselves: certificate of insurance for your management company, service-elevator scheduling, and floor protection. Senior technicians handle the built-in segment.",
      },
      {
        question: "My fridge died after a power outage in Miami — is it the compressor?",
        answer:
          "Usually not. Post-outage failures are most often the start relay or the main control board, both of which take the surge before the compressor does. We test both at the $59 diagnostic before anyone talks about replacing the unit. A relay swap is often same-visit.",
      },
      {
        question: "How fast can you get to a refrigerator emergency in Miami?",
        answer:
          "A refrigerator full of spoiling food is a priority dispatch. Call before noon and we can usually have a technician at your Miami address the same day — our techs criss-cross the urban core all day, so Wynwood, Brickell, the Grove, and Little Havana are quick to reach. The $59 diagnostic is free if you approve the repair.",
      },
    ],
  },

  // == GSC-PROVEN EARNERS ===================================================
  [key("dryer-repair", "hallandale-beach")]: {
    metaDescription:
      "Dryer not heating in Hallandale Beach? Our HQ is on N Federal Hwy — the fastest dispatch we run. $59 diagnostic, vent airflow checked, 90-day warranty.",
    heroIntro:
      "Hallandale Beach is home turf — our headquarters sits on N Federal Highway, which makes a dryer call here the shortest dispatch we run. Condo laundry closets in Three Islands and Golden Isles, stacked units in the beach towers, gas dryers in the single-family pockets west of US-1: we see all of it, with a $59 diagnostic and most repairs closed the same visit.",
    local: {
      eyebrow: "Dryer repair in Hallandale Beach — from the home office",
      heading: "The company headquarters is in this zip code",
      paragraphs: [
        "Berne Appliance Repair is headquartered at 1001 N Federal Hwy in Hallandale Beach, so 'how fast can you get here' has the best possible answer in this city: our techs start and end their routes nearby, and a morning call almost always converts to a same-day visit. There's no travel-time padding in the schedule for Hallandale — Three Islands, Golden Isles, and Hallandale Park are minutes from the office.",
        "The dryer work here is shaped by condo living. Most Hallandale dryers are stacked or closet-installed units venting through long shared duct runs — and a restricted vent is the root cause behind the two complaints we hear most: clothes needing two cycles, and thermal fuses that keep blowing. Replacing the fuse without clearing the duct just schedules the next failure, so our diagnostic always includes an airflow check at the vent. In the beach towers, lint-clogged common risers are a building-level issue we can document for your association.",
        "For the premium segment — Miele and Bosch ventless heat-pump dryers are increasingly common in newer Hallandale condos — drainage faults and sensor failures get a senior tech, because ventless platforms diagnose very differently from a belt-and-fuse Whirlpool. Either way the math is the same: $59 to diagnose — free if you approve the repair — 90-day warranty on parts and labor.",
      ],
    },
    nuances: [
      {
        title: "HQ dispatch advantage",
        body: "Our main office is on N Federal Hwy in Hallandale Beach. Dryer calls here get the tightest same-day windows we can offer anywhere in South Florida.",
      },
      {
        title: "Condo vent runs are the silent killer",
        body: "Long shared duct runs in Three Islands and beachfront towers restrict airflow — the real cause behind blown thermal fuses and two-cycle drying. We check airflow on every call, not just the failed part.",
      },
      {
        title: "Ventless heat-pump units",
        body: "Miele and Bosch ventless dryers in newer condos are a different diagnostic discipline — condensate pumps, sensors, heat exchangers. Senior techs handle these.",
      },
    ],
    faqs: [
      {
        question: "How quickly can you get to a dryer repair in Hallandale Beach?",
        answer:
          "Faster than anywhere else we serve — our headquarters is at 1001 N Federal Hwy in Hallandale Beach. Call before noon and a same-day visit is the norm, not the exception. The $59 diagnostic is free with your approved repair.",
      },
      {
        question: "My Hallandale condo dryer takes two cycles — is the dryer broken?",
        answer:
          "Often the dryer is fine and the vent run is the problem. Condo duct runs in Hallandale's towers are long and lint loads up over years, choking airflow. We measure airflow at the diagnostic, clean what's reachable, and document building-side restrictions for your association if the blockage is in a common riser.",
      },
    ],
  },

  [key("air-duct-cleaning", "greenacres")]: {
    metaDescription:
      "Dusty vents or musty AC in Greenacres? HEPA negative-pressure duct cleaning with before/after photos. $59 service call, 90-day warranty.",
    heroIntro:
      "Greenacres runs on central air — single-family homes and villas from the '80s and '90s where the original flex-duct is now decades old. That's exactly the duct generation that sheds, leaks, and grows musty in Palm Beach County humidity. We bring HEPA-filtered negative-pressure equipment, photograph everything before and after, and quote honestly when a duct run needs replacing instead of cleaning.",
    local: {
      eyebrow: "Air duct cleaning in Greenacres — what we actually find",
      heading: "Thirty-year-old flex duct meets year-round humidity",
      paragraphs: [
        "Most Greenacres housing — Pine Acres, Country Walk, and the surrounding subdivisions — went up in the 1980s and '90s, which means original flex duct and fiberglass-lined air handlers that have been breathing Palm Beach County humidity for thirty-plus years. What we find when we open these systems is consistent: matted dust on the supply runs, microbial growth at the air handler where condensation sits, and crushed or disconnected runs in the attic from years of cable installers crawling past. Cleaning fixes the first two; we'll tell you plainly when a crushed run needs re-work instead of a brush.",
        "The complaint that usually triggers the call is allergies that get worse indoors, or dust resettling on furniture within a day of cleaning. Both are real symptoms of duct loading, but we verify before we sell: our diagnostic includes a look inside the ducts with a camera, and if your ducts don't need cleaning we say so. When we do clean, it's negative-pressure machine work with HEPA filtration — not a shop vac and an air wand — and you get before/after photos of your actual ducts, not stock images.",
        "Dryer vents ride along on many Greenacres jobs. Single-story homes here have long horizontal vent runs to the exterior wall, and a decade of lint in that run is both an efficiency problem and the #1 dryer fire risk. If your dryer needs two cycles, have us check the vent the same visit — it's the cheapest fix on the truck.",
      ],
    },
    nuances: [
      {
        title: "1980s-90s duct stock",
        body: "Original flex duct in Pine Acres and Country Walk homes is past its design life. We camera-inspect first and tell you when replacement beats cleaning — no selling a brush job on collapsed duct.",
      },
      {
        title: "Real equipment, photographed proof",
        body: "Negative-pressure HEPA machine cleaning with before/after photos of your ducts on every job. If the camera says your ducts are clean, we tell you that too.",
      },
      {
        title: "Dryer vent add-on",
        body: "Long single-story vent runs to the exterior wall are Greenacres' hidden fire risk. We clean dryer vents on the same visit at a bundled rate.",
      },
    ],
    faqs: [
      {
        question: "How do I know if my Greenacres home actually needs duct cleaning?",
        answer:
          "Honest answer: you don't until someone looks inside. Dust resettling within a day, indoor allergies, musty smell at startup, and visible dust plumes at the registers are real indicators — but we verify with a camera inspection as part of the visit before recommending anything. If the ducts are clean, we say so and you've spent $59, not $500.",
      },
      {
        question: "Do you clean dryer vents in Greenacres too?",
        answer:
          "Yes, and we recommend doing it the same visit. Greenacres single-story homes typically have long horizontal dryer vent runs, and years of lint buildup is the most common cause of two-cycle drying — and the leading cause of dryer fires. Bundling it with duct cleaning is the cheapest way to get both done.",
      },
    ],
  },

  [key("microwave-repair", "hialeah")]: {
    metaDescription:
      "Microwave dead or sparking in Hialeah? OTR and built-in units fixed same day — en inglés o español. $59 diagnostic — free with repair, 90-day warranty.",
    heroIntro:
      "Hialeah kitchens work harder than almost anywhere in Miami-Dade, and the over-the-range microwave takes the brunt of it — steam from the stovetop below, heavy daily use, and the door slamming that eventually kills every latch switch. We repair OTR, built-in, and drawer microwaves across Hialeah and West Hialeah with a $59 diagnostic, en inglés o en español.",
    local: {
      eyebrow: "Microwave repair in Hialeah — high-duty kitchens",
      heading: "Why Hialeah microwaves fail young, and which ones are worth fixing",
      paragraphs: [
        "The microwave failures we see in Hialeah are concentrated in over-the-range units — they're in most kitchens here, and they live directly above the steam and grease of stovetops that get real daily use. Steam migrates into the control panel and door-switch cavity; a few years of it and you get the classic Hialeah trio: buttons that stop responding, a unit that runs but doesn't heat (magnetron or its diode), and door switches that fail from tens of thousands of open-close cycles. All three are repairable, and door switches are a same-visit fix from truck stock.",
        "The honest-math conversation matters with microwaves more than any other appliance, and we have it up front. A countertop unit is usually not worth a service call — we'll tell you that on the phone. But OTR and built-in units are a different story: replacement means installation, trim kits, and sometimes cabinet work, so a $150-300 repair on a quality unit beats a $600+ replace-and-install. GE, Whirlpool, and Samsung OTR platforms — the bulk of Hialeah's installed base — have well-stocked, affordable parts channels, which keeps repairs on the sensible side of that line.",
        "Our Hialeah customers often prefer service in Spanish — no problem. Llámenos y le atendemos en español, desde el diagnóstico hasta la factura. Same $59 diagnostic — free with repair — 90-day parts and labor warranty either way.",
      ],
    },
    nuances: [
      {
        title: "OTR units above hard-working stoves",
        body: "Steam and grease from daily stovetop cooking migrate into door switches and control panels. Door-switch failures are the most common Hialeah microwave call — and the cheapest fix on the truck.",
      },
      {
        title: "Repair-vs-replace honesty",
        body: "Countertop unit? We'll tell you on the phone not to pay for a visit. OTR or built-in? Repair usually wins, because replacement carries install and trim-kit costs.",
      },
      {
        title: "Servicio en español",
        body: "Hialeah dispatch, diagnostics, and paperwork available fully in Spanish — most of our techs working this zone are bilingual.",
      },
    ],
    faqs: [
      {
        question: "Is an over-the-range microwave worth repairing in Hialeah?",
        answer:
          "Usually yes. Unlike a countertop unit, replacing an OTR microwave means installation labor, mounting, and sometimes a trim kit — so the true replacement cost is far above the sticker price. Most OTR repairs (door switches, diodes, magnetrons on common GE/Whirlpool/Samsung platforms) land between $150 and $300, which is the sensible side of the math.",
      },
      {
        question: "¿Ofrecen reparación de microondas en Hialeah en español?",
        answer:
          "Sí. Puede llamar y hacer todo el proceso en español — el despacho, el diagnóstico del técnico y la factura. La visita técnica cuesta $59 y es gratuita si aprueba la reparación, con garantía de 90 días en piezas y mano de obra.",
      },
    ],
  },

  [key("refrigerator-repair", "hialeah")]: {
    metaDescription:
      "Fridge warm or leaking in Hialeah? We keep 10-20-year-old units alive with OEM parts and honest math. $59 diagnostic, 90-day warranty. En español.",
    heroIntro:
      "Hialeah's refrigerators are survivors — many of the homes around West Hialeah and Palm Springs North still run units that are 10, 15, even 20 years old, and owners here want them fixed, not replaced. That's work we respect and know how to do: honest diagnostics at $59, OEM parts with the number printed on your invoice, and straight talk when a repair genuinely isn't worth it. En español si lo prefiere.",
    local: {
      eyebrow: "Refrigerator repair in Hialeah — keeping good units alive",
      heading: "Older fridges, hot garages, and the repairs that actually make sense",
      paragraphs: [
        "Hialeah gives us a different refrigerator population than the coastal condos: freestanding top-freezer and side-by-side units, many past their tenth birthday, often with a second fridge sweating it out in the garage. That second-fridge pattern matters — a garage in Hialeah summer runs well above any refrigerator's rated ambient, so compressor start components, condenser fans, and door gaskets on garage units fail at two or three times the indoor rate. If your garage fridge is clicking and not starting, it's almost always the start relay, and that's a same-visit repair from truck stock.",
        "On older units the repair-or-replace line is where trust gets earned. Our rule, stated before we ever drive out: if the failure is a compressor or sealed-system leak on a 12+ year-old freestanding unit, we'll tell you on the phone that replacement likely wins, and you've spent nothing. But most of what kills these fridges is far cheaper — defrost heaters, thermistors, fan motors, relays — parts in the $150-350 installed range that buy the unit years. We put the OEM part number on every invoice so you can verify exactly what went in.",
        "Hard water and decades-old supply lines in Hialeah's housing stock also mean ice-maker and water-valve work is constant here: clogged inlet screens, scaled valves, slow dispensers. It's unglamorous work that takes thirty minutes and saves a floor from the slow leak you haven't noticed yet. Y sí — todo el servicio está disponible en español, del diagnóstico a la garantía de 90 días.",
      ],
    },
    nuances: [
      {
        title: "Garage fridges die young",
        body: "Hialeah garage heat runs far above rated ambient — start relays, condenser fans, and gaskets fail at multiples of the indoor rate. The click-but-no-start symptom is usually a $59-diagnostic, same-visit relay fix.",
      },
      {
        title: "OEM part numbers on the invoice",
        body: "Older units deserve verifiable repairs. Every invoice lists the OEM part number installed, so you know it's not a generic pull from a junk drawer.",
      },
      {
        title: "Hard-water valve work",
        body: "Scaled inlet valves and clogged screens from older supply lines drive Hialeah's ice-maker and dispenser complaints. Quick fixes that prevent slow-leak floor damage.",
      },
    ],
    faqs: [
      {
        question: "My 15-year-old Hialeah fridge stopped cooling — should I even call?",
        answer:
          "Yes, and here's why: describe the symptom on the phone first. If it sounds like a compressor or sealed-system failure on a unit that age, we'll tell you replacement probably wins and you've spent nothing. But most failures on older units are defrost heaters, fans, thermistors, or relays — $150-350 repairs that keep a good fridge running for years.",
      },
      {
        question: "Do you repair garage refrigerators in Hialeah?",
        answer:
          "Constantly. Garage units in Hialeah heat work much harder than the kitchen fridge and burn through start relays, condenser fans, and door gaskets faster. Most garage-fridge failures are inexpensive component swaps we finish the same visit — the $59 diagnostic is free with the repair either way.",
      },
    ],
  },

  [key("garbage-disposal-repair", "key-biscayne")]: {
    metaDescription:
      "Disposal jammed or leaking on Key Biscayne? One trip — repair parts and a new unit ride the truck over the bridge. $59 diagnostic, 90-day warranty.",
    heroIntro:
      "Key Biscayne is one bridge from the mainland, and that bridge is exactly why disposal calls here get planned right: our techs arrive with both repair parts and a replacement unit on the truck, so a corroded InSinkErator in a Cape Florida kitchen gets resolved in one trip — repair or swap, your call after the $59 diagnostic.",
    local: {
      eyebrow: "Garbage disposal repair on Key Biscayne",
      heading: "Salt air under the sink, and one-trip resolutions",
      paragraphs: [
        "Garbage disposals on Key Biscayne fail differently than inland: the island's salt-saturated air finds the disposal's steel components even under the sink, and we routinely open cabinets in Cape Florida and Harbor Drive homes to find rust-streaked housings and corroded mounting flanges on units only a few years old. A jammed flywheel is a repair; a rusted-through housing or weeping flange is a replacement, and pretending otherwise just schedules a flood. We carry stainless-chambered replacement units on the truck for exactly this scenario.",
        "Because the island is a single-causeway trip, we run Key Biscayne calls fully provisioned — diagnosis, repair parts, and a replacement unit all ride along, so whichever way the $59 diagnostic points, the job finishes that visit. That matters doubly for the island's condo stock near Crandon, where building water shut-off windows and dock/elevator rules make a second visit genuinely painful to schedule.",
        "Two pieces of free island-specific advice: run the disposal with cold water for a few extra seconds after grinding (it clears the trap and slows odor buildup in humid kitchens), and if the unit hums without turning, stop hitting reset — that's a jam or a seized bearing, and repeated resets cook the motor windings. The hex-key fix for a simple jam takes us minutes; a cooked motor is a replacement.",
      ],
    },
    nuances: [
      {
        title: "Salt corrosion under the sink",
        body: "Island air corrodes disposal housings and flanges years early. We distinguish repairable jams from rusted-through housings honestly — and carry stainless-chamber replacements on the truck.",
      },
      {
        title: "One-bridge, one-trip provisioning",
        body: "Key Biscayne dispatches carry repair parts and a replacement unit both, so the job ends the same visit regardless of which way the diagnostic points.",
      },
      {
        title: "Condo water-shutoff logistics",
        body: "For Crandon-area buildings we coordinate shut-off windows and building access in advance — no wasted visits.",
      },
    ],
    faqs: [
      {
        question: "My Key Biscayne disposal hums but won't turn — repair or replace?",
        answer:
          "Stop pressing reset first — repeated resets on a jammed unit burn the motor. A hum usually means a jam or seized bearing: a jam is a minutes-long fix at the $59 diagnostic; a seized bearing on a corroded island unit usually points to replacement, and we carry stainless-chambered units on the truck so it's done the same visit.",
      },
      {
        question: "Why do garbage disposals fail faster on Key Biscayne?",
        answer:
          "Salt air. Even under a sink cabinet, the island's salt-laden humidity corrodes the disposal's housing, flange, and internal steel years ahead of an inland unit. Stainless-chamber models last meaningfully longer here, and that's what we stock for island replacements.",
      },
    ],
  },

  [key("dishwasher-repair", "bal-harbour")]: {
    metaDescription:
      "Miele or Bosch dishwasher down in Bal Harbour? Senior techs service panel-ready units in place; building COI handled. $59 diagnostic, 90-day warranty.",
    heroIntro:
      "Bal Harbour kitchens are built around panel-ready, European dishwashers — Miele, Bosch, Thermador — integrated into custom cabinetry in the Village's oceanfront residences. Servicing them is precision work: senior techs, manufacturer service modes, cabinetry-safe removal when needed, and building COIs handled before we arrive. The diagnostic is the same flat $59 it is everywhere else.",
    local: {
      eyebrow: "Dishwasher repair in Bal Harbour",
      heading: "Integrated European units, serviced to building standards",
      paragraphs: [
        "Most Bal Harbour dishwasher calls involve an integrated, panel-ready unit — a Miele G-series or Bosch Benchmark behind custom millwork — in an oceanfront condominium. That changes the job. Pulling an integrated dishwasher without scarring the panel or the adjacent cabinetry is a learned skill; our senior techs do it with protective film and the manufacturer's removal procedure, not a pry bar. And in the Village's managed buildings, the paperwork is part of the service: certificate of insurance to your association, service-elevator scheduling, and water shut-off coordination, all arranged before the visit.",
        "The failures themselves skew European. Bosch's E15 leak-detection fault — water in the base pan tripping the float — is the most common code we clear here, and it's never just 'reset it': we open the unit and find the actual weep, because E15 always has a cause. Miele's brushless circulation pumps and heat-pump drying systems are quiet and excellent until they fail without warning; diagnosing them is service-mode work, not guesswork. Both brands reward genuine training, which is why Bal Harbour units go to the senior rotation.",
        "Salt air reaches even kitchen interiors this close to the Atlantic, accelerating corrosion on door hinges, rack rollers, and any exposed fastener. If your racks are shedding rusty residue or the door has started to drop, those are restorable conditions — and far cheaper than living with them until they damage the tub.",
      ],
    },
    nuances: [
      {
        title: "Panel-ready removal done right",
        body: "Integrated Miele and Bosch units come out with protective film and the manufacturer's procedure — your custom millwork stays flawless.",
      },
      {
        title: "Building paperwork pre-arranged",
        body: "COI to your association, service-elevator booking, and water shut-off windows handled before the tech arrives. Standard procedure for the Village's managed buildings.",
      },
      {
        title: "E15 means find-the-leak",
        body: "Bosch's most common Bal Harbour fault is water in the base pan. We locate the actual source — never just reset the float and leave.",
      },
    ],
    faqs: [
      {
        question: "Do you service integrated Miele dishwashers in Bal Harbour condos?",
        answer:
          "Yes — integrated European units are the majority of our Bal Harbour dishwasher work. Senior technicians handle panel-ready removal with the manufacturer's procedure, and we arrange your building's COI and service-elevator requirements in advance. The $59 diagnostic is free if you approve the repair.",
      },
      {
        question: "My Bosch dishwasher shows E15 — can I just reset it?",
        answer:
          "You can tip the unit to drain the base pan and the code may clear — but E15 means water leaked where it shouldn't, and it will return until the source is fixed. We open the base, find the actual leak (hose clamp, pump seal, or tub seam), and repair the cause. Resetting and walking away is how a small leak becomes cabinet damage.",
      },
    ],
  },

  [key("air-duct-cleaning", "bay-harbor-islands")]: {
    metaDescription:
      "Musty AC or damp vents in Bay Harbor Islands? HEPA duct cleaning for condo risers and shared closets, photo-documented. $59 call, 90-day warranty.",
    heroIntro:
      "Bay Harbor Islands packs mid-rise condo living onto two small islands, and its duct problems are condo problems: shared mechanical closets, decades-old risers in the East Island co-ops, and salt-humid air that keeps coils and ducts damp enough for microbial growth. We clean with HEPA negative-pressure equipment, document everything in photos, and coordinate with building management as needed.",
    local: {
      eyebrow: "Air duct cleaning in Bay Harbor Islands",
      heading: "Two islands, mostly condos, very damp air",
      paragraphs: [
        "Duct work on Bay Harbor Islands is condo work. The East Island's older co-op buildings run duct and air-handler installations that go back decades, while the West Island's newer mid-rises have tighter systems that still fight the same enemy: marine humidity that keeps evaporator coils and nearby duct sections damp for months at a stretch. Damp duct plus organic dust is the recipe for the musty-at-startup smell that drives most of our calls here — and cleaning the visible registers without treating the air handler and supply trunk does nothing for it.",
        "Working in occupied condo units on a small island takes more care than a suburban attic crawl: we protect floors and furnishings, run the negative-pressure machine from the unit or the hallway as building rules allow, and handle association requirements — COI, elevator pads, work-hour windows — before the appointment. You get before/after photos of your actual duct interiors, which double as documentation for your association if the contamination source turns out to be building-side.",
        "If anyone in the household has allergies that flare indoors, ask us to inspect the air handler closet specifically. In Bay Harbor's humidity, a fouled evaporator coil or a rusted, never-cleaned condensate pan upstream of your supply ducts will re-contaminate freshly cleaned duct in months. We'd rather fix the cause and have the cleaning last years.",
      ],
    },
    nuances: [
      {
        title: "Condo-procedure cleaning",
        body: "COI, elevator pads, and work-hour windows arranged with your association in advance; floors and furnishings protected during the job.",
      },
      {
        title: "Air handler first",
        body: "In marine humidity, a fouled coil or condensate pan upstream re-contaminates clean ducts in months. We inspect and treat the source, not just the symptom.",
      },
      {
        title: "Photo documentation",
        body: "Before/after photos of your duct interiors — useful evidence if the issue traces to building-side systems.",
      },
    ],
    faqs: [
      {
        question: "Can you clean ducts in a Bay Harbor Islands condo without trouble with the association?",
        answer:
          "Yes — condo jobs are most of what we do on the islands. We provide your association the certificate of insurance, book the service elevator, and work within the building's permitted hours. The equipment runs with HEPA filtration, so there's no dust migration into hallways or neighboring units.",
      },
      {
        question: "Why does my Bay Harbor condo smell musty when the AC starts?",
        answer:
          "That startup smell is almost always microbial growth on a damp evaporator coil or in the supply duct nearest the air handler — chronic conditions in marine humidity. Cleaning the ducts helps, but the lasting fix includes treating the coil and condensate pan; otherwise the smell returns within a season. We inspect both as part of the visit.",
      },
    ],
  },

  [key("washer-repair", "kendall")]: {
    metaDescription:
      "Washer not draining or spinning in Kendall? Trucks stocked for LG, Samsung and Whirlpool — most jobs one visit. $59 diagnostic — free with repair, 90-day warranty.",
    heroIntro:
      "Kendall is family-laundry country — high-capacity top-loaders and front-load pairs in Kendall Lakes and the Hammocks running loads daily, not weekly. Heavy duty cycles surface every weak point a washer has, and we've repaired all of them: $59 diagnostic, trucks stocked for the Whirlpool, LG, and Samsung platforms that dominate these neighborhoods, most jobs done in one visit.",
    local: {
      eyebrow: "Washer repair in Kendall — high-mileage laundry",
      heading: "What daily-use households do to washers, and the fixes that last",
      paragraphs: [
        "A Kendall household washer works at commercial cadence — kids' uniforms, towels, linens, every day — and that mileage pattern decides what we find. On the Whirlpool/Maytag vertical-modular top-loaders that fill so many Kendall Lakes laundry rooms, the shift actuator is the classic high-mileage failure: the machine fills, the display counts, but the tub never agitates or spins. It's the single most common one-part washer repair we do, the part rides on every truck, and it's a 45-60 minute fix. On front-loaders, daily use plus South Florida's hard water accelerates drain-pump clogs and door-boot wear — both first-visit repairs when caught early.",
        "The repair we talk people out of matters too: drum bearings on a 10+ year-old front-loader. Daily use gets a washer to that failure faster here than the brochure suggests, and a $400-600 bearing job on a tub that's often welded shut isn't honest money. We'll show you the bearing play, explain the math, and let you decide with real numbers — that's the same honesty that built our 4.79-star rating across 871 verified reviews.",
        "Scheduling fits family logistics: call before noon and we can usually reach Kendall the same day, with an arrival window confirmed by phone so nobody burns a workday waiting. The $59 diagnostic is free if you approve the repair, and everything we touch carries the 90-day parts-and-labor warranty.",
      ],
    },
    nuances: [
      {
        title: "VMW actuator — the Kendall classic",
        body: "Whirlpool/Maytag top-loaders that fill but never agitate or spin: the shift actuator. On every truck, fixed in under an hour.",
      },
      {
        title: "Hard water on front-loaders",
        body: "Scale and daily cycles accelerate drain-pump clogs and boot wear. Early repair is cheap; ignored, it becomes a leak that finds your floor.",
      },
      {
        title: "Bearing-job honesty",
        body: "On older front-loaders we show you the bearing play and the real math before anyone spends $400-600 on a welded-shut tub.",
      },
    ],
    faqs: [
      {
        question: "My Kendall top-loader fills with water but won't spin or agitate — what is it?",
        answer:
          "On the Whirlpool/Maytag platforms common in Kendall, that exact symptom is usually the shift actuator — the most frequent single-part washer repair we do. The part is on the truck and the job runs 45-60 minutes. The $59 diagnostic confirms it before any work starts.",
      },
      {
        question: "Is a washer making grinding noises during spin worth repairing?",
        answer:
          "Depends on age. Grinding during spin usually means drum bearings. On a machine under 7-8 years old it can be worth it; on an older front-loader where the tub is welded shut, a $400-600 bearing job rarely beats replacement — and we'll tell you that to your face with the bearing play demonstrated, not after the invoice.",
      },
    ],
  },

  [key("dryer-repair", "delray-beach")]: {
    metaDescription:
      "Dryer taking two cycles in Delray Beach? We check vent airflow on every call — the usual culprit here. $59 diagnostic — free with repair, 90-day warranty.",
    heroIntro:
      "Delray Beach dryers split into two populations: condo and townhome units near Atlantic Avenue with long, lint-choked vent runs, and the laundry rooms of the Lake Ida and Tropic Isle single-family streets where machines run a decade past their warranty. Both get the same treatment — a $59 diagnostic that always includes an airflow check, because in Delray the vent is guilty until proven innocent.",
    local: {
      eyebrow: "Dryer repair in Delray Beach",
      heading: "Check the vent first — then the dryer",
      paragraphs: [
        "More than half the 'dryer not drying' calls we run in Delray Beach end at the vent, not the appliance. The townhomes and condos clustered around Atlantic Avenue and Pineapple Grove route their exhaust through long interior runs — vertical risers, roof terminations, flex transitions crushed behind stacked units — and a decade of lint in that path will blow thermal fuses, trigger overheat shutoffs mid-cycle, and stretch one load into three. Replacing the blown fuse without clearing the duct is a two-week fix; we measure airflow at the termination on every call so the repair actually lasts.",
        "In the single-family neighborhoods — Lake Ida, Tropic Isle, the streets off Seacrest — the machines themselves are older and the failures are honest mechanical wear: idler pulleys shrieking, drum rollers flat-spotted, belts snapped, igniters weakening on the gas units. These are the repairs our trucks are stocked for; belt and roller kits for the Whirlpool 29-inch and 27-inch platforms that fill these laundry rooms ride on every route, and most calls close in one visit.",
        "Salt-side caveat for the barrier-island and Intracoastal streets: exterior vent caps corrode and their flapper dampers seize, which both restricts airflow and lets humid air drift back into the duct. It's a five-minute check we do on every coastal Delray call, and replacing a seized cap is one of the cheapest meaningful repairs in the book.",
      ],
    },
    nuances: [
      {
        title: "Vent restriction is suspect #1",
        body: "Condo and townhome runs near Atlantic Ave choke with lint over years. Every diagnostic includes an airflow measurement — fixing the fuse without the duct just reschedules the failure.",
      },
      {
        title: "Coastal vent caps seize",
        body: "Salt corrodes exterior flapper dampers on Intracoastal-side homes, restricting flow and letting humidity back in. Cheap to replace, checked on every coastal call.",
      },
      {
        title: "Wear-part stock for older machines",
        body: "Belt, idler, and roller kits for the Whirlpool-platform dryers that fill Lake Ida-era laundry rooms ride on every truck.",
      },
    ],
    faqs: [
      {
        question: "My Delray condo dryer keeps blowing thermal fuses — why does it keep happening?",
        answer:
          "Because the fuse is the symptom, not the cause. A thermal fuse blows when the dryer overheats, and the usual reason is a lint-restricted vent run — common in Delray's condo and townhome stock with long interior ducts. We replace the fuse and clear or document the vent restriction; otherwise you'll be buying fuses every few months.",
      },
      {
        question: "Do you service gas dryers in Delray Beach?",
        answer:
          "Yes — gas units in Delray's single-family neighborhoods are routine work. The common no-heat cause is a weakened igniter or failed gas-valve coils, both of which we test by amp draw and resistance at the $59 diagnostic. Igniters and coil pairs for the major brands are truck-stock items.",
      },
    ],
  },

  [key("oven-repair", "lake-park")]: {
    metaDescription:
      "Oven not heating in Lake Park? Vintage Park Avenue District ranges and new townhome units alike — igniters on the truck. $59 diagnostic, 90-day warranty.",
    heroIntro:
      "Lake Park's housing runs older than its glossier Palm Beach County neighbors — mid-century homes around the Park Avenue District whose ovens have decades of service behind them, plus newer ranges in the townhomes near Kelsey Park. We repair both generations: $59 diagnostic, igniters and elements on the truck, and honest advice when a vintage range deserves a specialist part order instead of a guess.",
    local: {
      eyebrow: "Oven & range repair in Lake Park",
      heading: "Older homes, older ovens, straightforward fixes",
      paragraphs: [
        "Lake Park gives us one of the more interesting oven populations in Palm Beach County: the Park Avenue District's mid-century housing still holds gas ranges with real years on them, while the redeveloped pockets near the marina and Kelsey Park run modern electric and dual-fuel units. On the older gas side, the failure pattern is wonderfully predictable — bake igniters weaken with age until they can't open the safety valve, and the oven 'clicks but won't light.' Igniter swaps are a thirty-minute, truck-stock repair, and they're most of what we do here.",
        "Electric units in the newer stock fail by element and sensor: a bake element with a visible blister, a thermistor that's drifted enough to burn cookies on one rack and undercook on another. Both are inexpensive, same-visit repairs. The one Lake Park-specific pattern worth naming is power quality — older neighborhood wiring plus summer storms produces the control-board lockouts and F-code displays we get called for after every major outage. Most clear with a proper reset and board inspection; genuinely surged boards we order direct from the OEM channel.",
        "And when a range is genuinely vintage — we see them in Lake Park's older kitchens — we say so honestly: some parts are discontinued, some are special-order, and sometimes the right answer is keeping a beloved stove alive with a sourced part while being clear about cost and lead time. You'll get that math at the $59 diagnostic, not after.",
      ],
    },
    nuances: [
      {
        title: "Weak igniters in mid-century kitchens",
        body: "Gas ovens that click but won't light: the bake igniter, weakened by age. Amp-tested at the diagnostic, swapped from truck stock in about thirty minutes.",
      },
      {
        title: "Post-storm F-codes",
        body: "Older wiring plus summer storms means control-board lockouts after outages. Most clear with a proper reset and inspection — truly surged boards get OEM-channel orders.",
      },
      {
        title: "Vintage-range honesty",
        body: "Discontinued parts and lead times explained up front when a Lake Park classic needs sourcing — keeping an old stove alive is fine work, done with open eyes.",
      },
    ],
    faqs: [
      {
        question: "My gas oven in Lake Park clicks but won't light — is that dangerous?",
        answer:
          "It's the most common gas-oven failure and the design is protecting you: a weakened igniter can't open the gas safety valve, so gas isn't flowing. The fix is an igniter replacement — about thirty minutes, parts on the truck. If you ever smell gas while the oven is off, that's a different situation: ventilate and call your gas utility first.",
      },
      {
        question: "My oven shows an F-code after a storm — does it need a new board?",
        answer:
          "Often not. Post-outage F-codes in Lake Park are frequently lockouts that clear with a correct reset procedure and a board inspection for surge damage. We test before replacing — if the board genuinely took the surge, we order from the OEM channel and quote it before any work.",
      },
    ],
  },

  // == TIER-1 VOLUME BETS ===================================================
  [key("washer-repair", "miami")]: {
    metaDescription:
      "Washer stuck mid-cycle in Miami? Condo stackables to full-size pairs — building logistics handled for you. $59 diagnostic — free with repair, 90-day warranty.",
    heroIntro:
      "Washer repair in Miami spans two different worlds: stacked and ventless combos squeezed into Brickell and Edgewater condo closets, and full-size pairs in the Grove, Shenandoah, and Little Havana. We service both daily — $59 diagnostic, condo building logistics handled for you, and trucks stocked for the LG, Samsung, and Whirlpool platforms that dominate the city.",
    local: {
      eyebrow: "Washer repair in Miami",
      heading: "Condo laundry closets and the machines that live in them",
      paragraphs: [
        "Most Miami washer calls now come from condos, and condo machines fail in condo-specific ways. Stacked units in Brickell and Downtown laundry closets run with minimal clearance — vibration that a garage floor would absorb instead loosens hoses and walks the unit into the wall, and ventless washer-dryer combos common in newer towers add condensate-drain and sensor failures that diagnose nothing like a standard machine. Our techs work these closets every day: we bring slim tools for tight extraction, we book the service elevator, and the building's COI requirement is handled before the visit, not discovered at the door.",
        "The other Miami constant is water. High-rise pressure variations and hard South Florida water work inlet valves and pressure sensors hard, and a slow-fill or overfill complaint in a tower unit is usually one of those two parts rather than the board. Down in the single-family neighborhoods, drain-pump clogs are the king failure — coins, hairpins, and the occasional baby sock pulled from LG and Samsung pump filters make up a meaningful share of our first-visit fixes.",
        "A word on urgency Miami owners already understand: in a condo, a leaking washer is never just your problem — it's the unit below's problem within the hour. Door-boot tears and weeping supply hoses get priority dispatch, and if you see water, shutting the unit's supply valves before we arrive is the best five-second favor you can do yourself.",
      ],
    },
    nuances: [
      {
        title: "Stacked and ventless combo expertise",
        body: "Brickell-closet stacked pairs and ventless combos are a different diagnostic discipline — condensate paths, sensors, tight extraction. Daily work for our Miami routes.",
      },
      {
        title: "Building logistics included",
        body: "COI to management, service-elevator booking, floor protection — arranged before arrival as standard Miami condo procedure.",
      },
      {
        title: "Leaks get priority",
        body: "In a tower, washer water becomes a downstairs neighbor's ceiling fast. Leak calls jump the queue; shut your supply valves and call.",
      },
    ],
    faqs: [
      {
        question: "Can you repair the stacked washer in my Brickell condo closet?",
        answer:
          "Yes — tight-clearance stacked units are the bread and butter of our Miami condo work. Techs carry the slim tooling for closet extraction, and we handle your building's COI and service-elevator requirements before the visit. The $59 diagnostic is free if you approve the repair.",
      },
      {
        question: "My Miami washer is leaking — what do I do right now?",
        answer:
          "Close the two supply valves behind or near the machine (or the laundry closet's shut-off), then call us — leak calls get priority dispatch because in Miami condos water travels to the unit below fast. Most leaks trace to a door-boot tear, a clamp, or a weeping inlet hose: first-visit repairs in most cases.",
      },
    ],
  },

  [key("dryer-repair", "miami")]: {
    metaDescription:
      "Dryer running hot or not drying in Miami? We measure vent airflow on every call — high-rise runs are the usual cause. $59 diagnostic, 90-day warranty.",
    heroIntro:
      "Miami dryers fight two enemies the brochure never mentions: humidity that makes every cycle work harder, and high-rise vent runs that nobody has cleaned since the building went up. From stacked units in Edgewater towers to gas dryers in Coconut Grove, we diagnose at a flat $59 — and we measure vent airflow on every single call, because in this city the duct is the disease and the dryer is usually just the symptom.",
    local: {
      eyebrow: "Dryer repair in Miami",
      heading: "Humidity, high-rises, and the vent runs nobody sees",
      paragraphs: [
        "Drying clothes in Miami means pushing moisture into air that's already saturated, so any weakness — a partly clogged vent, a tired heating element, a worn blower — shows up here as two-cycle drying long before it would inland. In the city's tower stock, the vent run is the dominant culprit: stacked units in Edgewater, Brickell, and Downtown exhaust into long vertical risers or shared building ducts, and years of lint in those paths produce the classic chain of blown thermal fuses, mid-cycle overheat shutdowns, and marathon dry times. We measure airflow at every diagnostic; when the restriction is building-side, you get it documented in writing for your association.",
        "Ventless condensate dryers — increasingly standard in new Miami towers because routing exhaust is expensive — are their own discipline: heat exchangers that clog with lint paste, condensate pumps that fail quietly, sensors that misread. They're excellent machines serviced correctly and miserable ones serviced by guesswork, so they go to techs trained on the platform. Meanwhile the Grove, Shenandoah, and the city's single-family streets still run classic vented machines, where the fixes are honest mechanics: belts, rollers, idlers, igniters on the gas units — same-visit work from truck stock.",
        "Take the burning-smell call seriously in this city. Lint is fuel, Miami dryers run hot and long, and a dryer that smells like scorch needs to be off until it's inspected. We treat those as priority dispatches — and most turn out to be a $59 diagnostic away from a cheap fix and a thorough interior clean-out.",
      ],
    },
    nuances: [
      {
        title: "Airflow measured every visit",
        body: "Tower riser ducts choke with years of lint. We measure at the diagnostic and document building-side restrictions for your association in writing.",
      },
      {
        title: "Ventless platform training",
        body: "Condensate dryers in new Miami towers fail by heat exchanger, pump, and sensor — serviced by techs trained on the platform, not by parts-cannon guessing.",
      },
      {
        title: "Burning smell = stop and call",
        body: "Lint plus heat is the #1 dryer fire recipe. Scorch-smell calls get priority dispatch and a full interior clean-out with the repair.",
      },
    ],
    faqs: [
      {
        question: "Why does my Miami high-rise dryer take two or three cycles?",
        answer:
          "Usually the building's vent path, not your dryer. Tower units exhaust through long risers or shared ducts that may never have been cleaned, and restricted airflow turns one cycle into three while quietly overheating the machine. We measure airflow at the $59 diagnostic, fix what's reachable, and give you written documentation if the restriction is building-side.",
      },
      {
        question: "Do you repair ventless condenser dryers in Miami condos?",
        answer:
          "Yes — ventless units are standard in newer Miami towers and a regular part of our routes. Their failures (clogged heat exchangers, condensate pumps, humidity sensors) need platform-specific diagnosis, which is exactly why they go to our techs trained on those machines. Most repairs finish same-visit.",
      },
    ],
  },

  [key("refrigerator-repair", "fort-lauderdale")]: {
    metaDescription:
      "Fridge warm in Fort Lauderdale? Salt-canal corrosion is the local killer — Sub-Zero to Whirlpool, EPA-608 techs. $59 diagnostic, 90-day warranty.",
    heroIntro:
      "Fort Lauderdale refrigeration runs the full spectrum we service anywhere: Sub-Zero built-ins in Las Olas Isles and Rio Vista kitchens, premium French-door units in Coral Ridge, and hard-working freestanding fridges across Victoria Park and Flagler Village. Saltwater canals thread the whole city — and with them the corrosion that defines fridge repair here. $59 diagnostic, EPA-608 certified techs, same-day when you call before noon.",
    local: {
      eyebrow: "Refrigerator repair in Fort Lauderdale",
      heading: "Canal-front corrosion and a premium built-in population",
      paragraphs: [
        "Fort Lauderdale's 'Venice of America' geography is a refrigeration variable: thousands of homes sit directly on saltwater canals, and brackish air doesn't stop at the patio door. On canal-front units in Las Olas Isles, Rio Vista, and Coral Ridge we see condenser coils, fan motors, and even door hinges corroding on timelines inland units never face. For built-in Sub-Zero and Thermador columns — heavily represented in these neighborhoods — that means the condenser cleaning the manual politely suggests is genuinely mandatory here, and it's the first thing our techs inspect on any warm-compartment call.",
        "The premium segment shapes our Fort Lauderdale dispatch: built-ins get senior techs who know the platforms — dual-refrigeration Sub-Zeros where a warm fresh-food side is usually a fan or terminator rather than the compressor everyone fears, Thermador columns with their own control logic, integrated panel-ready units that have to be serviced in place. We carry gauges for both R-134a and the newer R-600a isobutane systems, and our EPA-608 Universal certification covers the sealed-system work many shops legally can't touch.",
        "East-side condo towers along the beach and Intracoastal add the familiar building choreography — COIs, service elevators, polished-floor protection — which we run as standard procedure. And throughout Victoria Park and Flagler Village's older stock, the honest repair-or-replace conversation comes with real numbers at the $59 diagnostic: most failures are $150-400 component swaps worth doing; a sealed-system failure on a 15-year-old freestanding unit usually isn't, and we'll say so.",
      ],
    },
    nuances: [
      {
        title: "Canal-front coil corrosion",
        body: "Brackish air off the canals eats condensers and fan motors early. Annual coil service is mandatory maintenance here, and it's our first check on every warm-fridge call.",
      },
      {
        title: "Senior techs for built-ins",
        body: "Sub-Zero, Thermador, and panel-ready columns in Las Olas-area kitchens go to the senior rotation — with R-134a and R-600a gauges and EPA-608 sealed-system certification on the truck.",
      },
      {
        title: "Tower logistics handled",
        body: "Beach and Intracoastal high-rises: COI, service elevator, floor protection — arranged before arrival, every time.",
      },
    ],
    faqs: [
      {
        question: "Do you repair Sub-Zero refrigerators in Fort Lauderdale?",
        answer:
          "Yes — Sub-Zero built-ins are a core specialty, and the Las Olas/Rio Vista/Coral Ridge corridor is one of the densest Sub-Zero areas we serve. Senior techs handle the platform, including dual-refrigeration diagnostics and EPA-608 sealed-system work. The diagnostic is the same flat $59 — free if you approve the repair.",
      },
      {
        question: "Why do refrigerators on Fort Lauderdale canals need more frequent service?",
        answer:
          "Salt-laden air off the canals corrodes condenser coils, fan motors, and fasteners well ahead of inland schedules — restricted, corroded coils make the compressor run hot and long, which is how a $150 cleaning deferred becomes a four-figure sealed-system job. Annual coil service on canal-front units is the best money in refrigeration maintenance.",
      },
    ],
  },

  [key("refrigerator-repair", "kendall")]: {
    metaDescription:
      "Fridge or ice maker down in Kendall? French-door family workhorses fixed same day, parts on the truck. $59 diagnostic — free with repair, 90-day warranty.",
    heroIntro:
      "Kendall fridges feed real households — French-door workhorses in Kendall Lakes and the Hammocks opened a hundred times a day, ice makers that never get a rest, and a second fridge in half the garages. We keep them running: $59 diagnostic, LG/Samsung/Whirlpool parts stocked on the truck, and most repairs finished the same visit they're diagnosed.",
    local: {
      eyebrow: "Refrigerator repair in Kendall",
      heading: "Family-duty refrigerators and the failures heavy use brings",
      paragraphs: [
        "The Kendall refrigerator population is dominated by big-box French-door and side-by-side units — LG, Samsung, Whirlpool — bought for capacity and worked accordingly. Heavy door traffic is the quiet variable: every opening loads the evaporator with humid Florida air, so frost-control systems work overtime and their weak links surface first. Samsung's twin-cooling fan icing over (fresh side warm, freezer fine), LG's evaporator-fan failures, defrost heaters going open-circuit — these are the calls Kendall generates week in, week out, and the parts for all of them ride on our trucks.",
        "Ice makers deserve their own paragraph here because Kendall households genuinely depend on them. Hard water scales inlet valves and clogs their screens; optic sensors film over; harvest motors seize. Most ice-maker failures are $150-300 repairs, and we'll always check the water filter first — an overdue filter starves flow and mimics a dying valve, and it's the five-minute test that's saved plenty of Kendall customers a part they didn't need.",
        "The garage second-fridge gets the same honesty we give in Hialeah: garage heat doubles compressor workload, start relays and condenser fans fail early, and the click-click-click of a relay-locked compressor is a same-visit, truck-stock fix. A genuinely failed compressor on an aging garage unit, on the other hand, gets you straight numbers at the $59 diagnostic — sometimes the right call is promoting the kitchen fridge's replacement to the garage instead.",
      ],
    },
    nuances: [
      {
        title: "Frost-system failures lead",
        body: "Heavy door traffic in humid air overworks defrost systems — iced twin-cooling fans, open heaters, failed terminators. The signature Kendall fridge calls, parts on every truck.",
      },
      {
        title: "Ice maker triage",
        body: "Filter first (it's the free test), then valve screens, optics, and harvest motor. Hard Kendall water makes valve scaling a regular offender.",
      },
      {
        title: "Garage-unit math",
        body: "Click-but-no-start is a cheap relay; a dead compressor on an old garage fridge gets honest replace-vs-repair numbers before any work.",
      },
    ],
    faqs: [
      {
        question: "My Samsung fridge in Kendall is warm on top but the freezer works — what is it?",
        answer:
          "That's the textbook symptom of the twin-cooling evaporator fan icing over — a Samsung French-door classic we see constantly in Kendall. The fix is a proper defrost of the duct plus a fan motor if it's damaged, and it's same-visit work with parts from the truck. The $59 diagnostic confirms it before we start.",
      },
      {
        question: "My ice maker stopped — do I need a new ice maker assembly?",
        answer:
          "Usually not. We check the water filter first (an overdue filter starves the ice maker and mimics bigger failures), then the inlet valve screens that Kendall's hard water scales up, then the optics and harvest motor. Most fixes land between $150 and $300 — a full assembly swap is the last resort, not the first guess.",
      },
    ],
  },

  [key("washer-repair", "hialeah")]: {
    metaDescription:
      "Washer problems in Hialeah? Hard-working top-loaders repaired with OEM parts and honest pricing — en español. $59 diagnostic, 90-day warranty.",
    heroIntro:
      "Hialeah laundry rooms keep machines longer and work them harder than anywhere in Miami-Dade — top-loaders with a decade of daily cycles, repaired, passed along, and repaired again. That's our kind of work: $59 diagnostic, OEM part numbers printed on the invoice, honest math on every repair, y todo el servicio disponible en español.",
    local: {
      eyebrow: "Washer repair in Hialeah",
      heading: "Hard-working machines, sediment-heavy water, honest repairs",
      paragraphs: [
        "Two Hialeah realities shape every washer call here. First, the machines are seasoned — Whirlpool and Maytag top-loaders dominate, many on their second decade, and their high-mileage failures are wonderfully fixable: shift actuators (fills but won't spin or agitate — the single most common repair we do on this platform), lid switches, drain pumps, suspension rods. Second, the water: older supply infrastructure in parts of Hialeah and West Hialeah carries sediment that packs inlet-valve screens until machines fill at a trickle. Cleaning the screens is a ten-minute fix that gets misdiagnosed as a valve or board by shops that don't look first; we look first.",
        "Front-loaders are growing in the newer households, and they bring the familiar pattern: drain-pump filters clogged with coins and bobby pins, door-boot tears at the bottom fold, and the UE/OE/dE code family on LG and Samsung that points to exactly which subsystem failed — codes our techs read with the tech sheets on the truck rather than guessing. Most front-loader calls in Hialeah close on the first visit.",
        "We know many Hialeah machines are family workhorses that earn their keep, so the repair-or-replace talk comes with real numbers, not a sales pitch — and with the OEM part number on your invoice so you can verify exactly what was installed. Si prefiere hacer todo el proceso en español — el diagnóstico, la explicación y la factura — así lo hacemos. Visita de $59 gratuita con la reparación, garantía de 90 días.",
      ],
    },
    nuances: [
      {
        title: "Sediment-packed valve screens",
        body: "Older supply lines fill inlet screens with grit until the machine trickle-fills. Ten-minute fix — checked before anyone sells you a valve or a board.",
      },
      {
        title: "Top-loader platform mastery",
        body: "Actuators, lid switches, suspension rods, drain pumps — the decade-old Whirlpool/Maytag fleet of Hialeah, repaired from truck stock in one visit.",
      },
      {
        title: "Facturas con número de pieza OEM",
        body: "Cada reparación lista el número de pieza original instalada — transparencia total, en inglés o español.",
      },
    ],
    faqs: [
      {
        question: "My Hialeah washer fills very slowly — is that a big repair?",
        answer:
          "Usually the opposite. Slow filling in Hialeah is most often sediment from older supply lines packing the inlet-valve screens — a ten-minute cleaning, not a part. We check the screens before condemning the valve or board; if the valve solenoid has genuinely failed, that's still a modest same-visit repair.",
      },
      {
        question: "¿Reparan lavadoras en Hialeah con servicio en español?",
        answer:
          "Sí, completamente. Puede llamar, recibir el diagnóstico del técnico y la factura todo en español. La visita técnica cuesta $59, es gratuita si aprueba la reparación, y todo el trabajo lleva garantía de 90 días en piezas y mano de obra.",
      },
    ],
  },

  [key("refrigerator-repair", "boca-raton")]: {
    metaDescription:
      "Sub-Zero or built-in fridge down in Boca Raton? Senior EPA-608 techs from our S Federal Hwy office. $59 diagnostic — free with repair, 90-day warranty.",
    heroIntro:
      "Boca Raton's kitchens hold one of the densest premium-refrigeration populations in Palm Beach County — Sub-Zero columns in East Boca and Royal Palm estates, integrated panel-ready units in Boca West and Boca Pointe, wine storage everywhere. Our Boca Raton office on S Federal Highway anchors this part of our service map: senior techs, EPA-608 sealed-system credentials, $59 diagnostic.",
    local: {
      eyebrow: "Refrigerator repair in Boca Raton",
      heading: "Premium built-ins, country-club logistics, and a local office",
      paragraphs: [
        "We keep an office at 131 S Federal Hwy in Boca Raton because Palm Beach County demands its own dispatch gravity — and because Boca's refrigerator stock deserves techs who live on the premium platforms. East Boca, Royal Palm, and Mizner Park kitchens run Sub-Zero side-by-sides and columns, Thermador and Miele integrated units, and undercounter wine storage as the default, not the exception. That work goes to our senior rotation: dual-refrigeration diagnostics where a warm side rarely means the compressor, panel-ready service done in place without scarring millwork, and sealed-system work under EPA-608 Universal certification with gauges for both R-134a and the newer R-600a units.",
        "Boca's gated and country-club communities — Boca West, Boca Pointe, Broken Sound and their neighbors — add a layer of logistics we've made routine: gate clearances arranged ahead of the visit, association rules respected, arrival windows honored because nobody in a club community wants an open-ended 'sometime today.' It's the same operational discipline our condo high-rise work taught us, applied west of I-95.",
        "Wine storage earns a Boca-specific note: dual-zone Sub-Zero and undercounter units here protect collections worth multiples of the appliance, and the failure that matters — a zone drifting warm — is exactly the one owners notice last. If your reds zone is creeping above set point or the unit's running constantly, that's a fan, sensor, or charge issue worth a $59 look long before the cooling quits entirely. We service Sub-Zero 424/427/430-series wine units as standard work.",
      ],
    },
    nuances: [
      {
        title: "Local office on S Federal Hwy",
        body: "Our Boca Raton office anchors Palm Beach County dispatch — tight arrival windows for East Boca, Mizner, and the club communities west of I-95.",
      },
      {
        title: "Senior techs on the premium fleet",
        body: "Sub-Zero, Thermador, Miele built-ins and panel-ready columns — serviced in place, EPA-608 sealed-system certified, R-134a and R-600a gauges on the truck.",
      },
      {
        title: "Wine storage watched closely",
        body: "Zone drift on Sub-Zero 424/427/430 units gets caught at $59 — long before a warm zone costs you the collection it protects.",
      },
    ],
    faqs: [
      {
        question: "Do you service Sub-Zero refrigerators in Boca Raton's gated communities?",
        answer:
          "Yes — Boca West, Boca Pointe, and the club communities are regular territory, with gate access arranged before the visit and association rules handled as standard procedure. Sub-Zero built-ins go to senior techs with EPA-608 certification. Our Boca Raton office at 131 S Federal Hwy keeps arrival windows tight.",
      },
      {
        question: "My wine cooler's red-wine zone is running warm — is that urgent?",
        answer:
          "More urgent than it feels. Zone drift on dual-zone units (a failing evaporator fan, sensor, or low charge) progresses quietly until cooling quits entirely — usually discovered on a hot weekend with a full collection inside. A $59 diagnostic catches it early; we service Sub-Zero and premium undercounter wine units as core work in Boca.",
      },
    ],
  },

  [key("washer-repair", "hollywood")]: {
    metaDescription:
      "Washer leaking or not spinning in Hollywood? Same-day from our Hallandale HQ next door — beach towers to the Hills. $59 diagnostic, 90-day warranty.",
    heroIntro:
      "Hollywood washers split by geography: full-size pairs in the Hollywood Hills and Emerald Hills ranch homes, stacked units in the beach towers along A1A, and everything in between across Hollywood Lakes. We run this city daily from our Hallandale Beach headquarters next door — $59 diagnostic, same-day on most before-noon calls, 90-day warranty on everything we touch.",
    local: {
      eyebrow: "Washer repair in Hollywood",
      heading: "Next door to headquarters, and we know the housing stock",
      paragraphs: [
        "Hollywood sits directly north of our Hallandale Beach headquarters, which makes it one of the fastest dispatches on our map — techs cross into Hollywood Lakes and the Hills all day, and a morning call here rarely waits past the afternoon. The housing tells us what we'll find before we arrive: the mid-century ranch homes of Hollywood Hills and Emerald Hills run full-size top-loaders and front-load pairs with real mileage, while the beach corridor's condo towers run stacked and compact units with the building-access choreography we handle as routine — COI, elevator, protective runners.",
        "On the single-family side, the failure list is the honest classics: Whirlpool/Maytag shift actuators (fills, counts, never spins), drain pumps fouled by coins and grit, suspension rods on aging top-loaders that let the drum bang through spin like a kettledrum. All truck-stock, all same-visit fixes in most cases. The beach-side towers add the salt variable — fasteners and valve bodies corrode faster within blocks of the Atlantic — and stacked units' tight closets mean leaks hide until they're the downstairs neighbor's ceiling, so anything weeping gets priority dispatch.",
        "Hollywood Lakes' older plumbing deserves its own line: original galvanized supply lines in some of these streets shed scale that packs washer inlet screens, the trickle-fill complaint we clear in ten minutes. If your machine fills slowly and you're in an older Lakes home, mention it when you call — it's often the whole problem, and a ten-minute fix with the $59 diagnostic waived is the cheapest repair in the book.",
      ],
    },
    nuances: [
      {
        title: "HQ-adjacent dispatch",
        body: "Hollywood is the next city up from our Hallandale Beach headquarters — same-day windows on before-noon calls are the norm.",
      },
      {
        title: "Ranch-home classics",
        body: "Actuators, suspension rods, drain pumps on the Hills' seasoned top-loaders — truck-stock parts, one-visit fixes.",
      },
      {
        title: "Beach-tower stacked units",
        body: "A1A condos: tight closets, salt-accelerated corrosion, building COIs handled in advance, leaks treated as priority.",
      },
    ],
    faqs: [
      {
        question: "How fast can you reach a washer repair in Hollywood?",
        answer:
          "Hollywood borders our Hallandale Beach headquarters, so it's one of our fastest dispatch zones — call before noon and a same-day visit is the norm. The $59 diagnostic is free if you approve the repair, with a 90-day parts-and-labor warranty on the work.",
      },
      {
        question: "My washer in an older Hollywood Lakes home fills very slowly — big problem?",
        answer:
          "Probably a small one. Older galvanized supply lines in parts of Hollywood Lakes shed scale that packs the washer's inlet screens — a ten-minute cleaning restores full flow. We check the screens before condemning any parts; if a valve solenoid has genuinely failed, that's still a modest same-visit repair.",
      },
    ],
  },

  [key("dryer-repair", "pembroke-pines")]: {
    metaDescription:
      "Dryer squealing or not heating in Pembroke Pines? 90s-vintage units are our specialty — belts and rollers stocked. $59 diagnostic, 90-day warranty.",
    heroIntro:
      "Pembroke Pines is planned-community territory — SilverLakes, Chapel Trail, Pembroke Falls — where '90s-vintage homes mean '90s-vintage laundry rooms and dryers that have quietly worked for years past their warranty. We keep them safe and running: $59 diagnostic, vent airflow checked on every call, belts and rollers on the truck for the platforms these neighborhoods run.",
    local: {
      eyebrow: "Dryer repair in Pembroke Pines",
      heading: "Planned communities, aging vents, predictable fixes",
      paragraphs: [
        "Pembroke Pines built out fast in the late '80s and '90s, and that cohort of homes — SilverLakes, Chapel Trail, Pembroke Falls, Pembroke Shores — now runs dryer vents that are decades old. Many of these single- and two-story layouts route exhaust through long under-roof runs to a side wall, and twenty-plus years of lint in foil-flex transitions and crushed elbows is the root cause behind most of what we're called for: two-cycle drying, blown thermal fuses, dryers shutting down hot mid-cycle. We measure airflow on every diagnostic and quote vent cleaning honestly when that's the actual fix — replacing a fuse without clearing the duct is a repeat appointment with extra steps.",
        "The machines themselves are the familiar suburban fleet — Whirlpool, Maytag, Samsung, LG, electric almost across the board — and their wear parts fail on schedule: idler pulleys that shriek, drum rollers that thump on rotation, belts that snap after years of service. These are same-visit repairs from truck stock, typically 45 minutes door to door. Where homes have been remodeled and gas lines added, the gas units follow the standard playbook: weak igniters amp-tested at the diagnostic, valve coils replaced as a pair.",
        "Worth knowing in a two-story Pines home: if your laundry is upstairs, vent runs are longer and lint settles at every bend — and a restricted upstairs vent is both an efficiency drain and a genuine fire consideration. If the top of your dryer is hot to the touch or the laundry room feels like a sauna mid-cycle, book the vent check; it's the cheapest meaningful safety work we do.",
      ],
    },
    nuances: [
      {
        title: "'90s vent runs at end-of-life",
        body: "Foil-flex transitions and long under-roof runs from the build-out era choke with decades of lint. Airflow measured every visit — the fuse is never the whole fix.",
      },
      {
        title: "Wear parts on schedule",
        body: "Idlers, rollers, belts on the suburban Whirlpool/Samsung/LG fleet — truck-stock, 45-minute repairs.",
      },
      {
        title: "Upstairs laundry caution",
        body: "Two-story homes with upstairs laundry have longer, bend-heavy vents. Hot cabinet tops and sauna-feel laundry rooms are the early warnings worth a check.",
      },
    ],
    faqs: [
      {
        question: "My Pembroke Pines dryer shuts off hot mid-cycle and works after cooling — what's wrong?",
        answer:
          "That's the thermal cutoff protecting you from a restricted vent. The dryer overheats because air can't move, shuts down, cools, and runs again — until the cutoff fails permanently. We measure airflow at the $59 diagnostic and fix the restriction along with any heat-damaged parts; in '90s-era Pines homes the vent run is the usual culprit.",
      },
      {
        question: "How long should a dryer repair take in Pembroke Pines?",
        answer:
          "Most of what these neighborhoods need — belts, idler pulleys, drum rollers, thermal fuses, igniters on gas units — is same-visit work from truck stock, typically about 45 minutes once diagnosed. Call before noon and SilverLakes, Chapel Trail, and Pembroke Falls usually get same-day windows.",
      },
    ],
  },

  [key("refrigerator-repair", "west-palm-beach")]: {
    metaDescription:
      "Fridge failing in West Palm Beach? El Cid bungalows to Downtown towers — EPA-608 techs, dedicated 561 line. $59 diagnostic, 90-day warranty.",
    heroIntro:
      "West Palm Beach refrigeration spans historic El Cid bungalows, Flamingo Park's restored 1920s homes, Northwood cottages, and the new Downtown towers — four different fridge populations in one city. We service all of them from our Palm Beach County dispatch, with a dedicated 561 line, EPA-608 certified techs, and the same flat $59 diagnostic everywhere.",
    local: {
      eyebrow: "Refrigerator repair in West Palm Beach",
      heading: "Historic districts, new towers, and everything between",
      paragraphs: [
        "Few cities we serve mix refrigerator generations like West Palm Beach. The historic districts — El Cid, Flamingo Park, Grandview Heights — pair lovingly restored 1920s houses with kitchens that range from brand-new panel-ready columns to faithful twenty-year-old units that owners rightly want kept alive. Downtown WPB's new towers run builder-grade stainless French-doors by the hundreds, with the condo logistics we handle daily. And Northwood's cottages carry the honest older freestanding stock where repair-or-replace math matters most. Each population gets its own playbook, and all of them get straight numbers at the $59 diagnostic.",
        "Two technical notes specific to this city. First, historic-district electrical: older homes that haven't had panel upgrades produce the brownout-and-surge conditions that kill control boards and start devices — if your fridge died during a storm week, suspect the board and relay before the compressor, because that's usually what we find. Second, the new Downtown towers' builder-grade units fail young and identically — ice maker assemblies, evaporator fans, board relays in the same models across entire buildings — which means we've usually seen your exact failure in your exact floor plan before, and the part is often already on the truck.",
        "Our Palm Beach County dispatch runs on its own 561 line — (561) 858-9919 — backed by the Boca Raton office south of you. Call before noon and West Palm addresses from Northwood to Grandview Heights usually land a same-day window, with the 90-day parts-and-labor warranty on every repair.",
      ],
    },
    nuances: [
      {
        title: "Storm-week board failures",
        body: "Historic-district wiring passes surges that kill boards and relays, not compressors. We test both before anyone condemns the unit.",
      },
      {
        title: "Tower fleet familiarity",
        body: "Downtown's builder-grade units fail identically across whole buildings — odds are we've fixed your exact failure in your exact floor plan, with the part already stocked.",
      },
      {
        title: "Dedicated 561 dispatch",
        body: "(561) 858-9919 routes Palm Beach County directly, backed by the Boca Raton office. Before-noon calls usually get same-day windows.",
      },
    ],
    faqs: [
      {
        question: "My refrigerator in El Cid died after a storm — does it need replacing?",
        answer:
          "Probably not. Older West Palm electrical systems pass surges that take out the control board or compressor start relay — both repairable — while the compressor itself usually survives. We test the start circuit and the board at the $59 diagnostic before any replacement conversation. It's the most common post-storm finding in the historic districts.",
      },
      {
        question: "Do you service refrigerators in Downtown West Palm Beach condo towers?",
        answer:
          "Daily. The newer towers run the same builder-grade models across hundreds of units, so their failure patterns — ice maker assemblies, evaporator fans, board relays — are thoroughly familiar, and the common parts ride on our Palm Beach County trucks. We handle COI and service-elevator requirements with your building before the visit.",
      },
    ],
  },
};

/** Lookup helper — returns undefined for the ~750 combos without hand-written content. */
export function getComboUnique(serviceSlug: string, citySlug: string): ComboUnique | undefined {
  return COMBO_UNIQUE[key(serviceSlug, citySlug)];
}
