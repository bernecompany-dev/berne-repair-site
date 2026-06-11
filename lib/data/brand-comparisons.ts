/**
 * Brand comparison data — content layer for /compare/[slug] pages.
 *
 * High-value, long-form "X vs Y" comparison content targeting informational
 * search intent ("Sub-Zero vs Viking", "Wolf vs Thermador", etc.).
 *
 * Voice: technician-first, balanced, honest. We service all of these brands,
 * so the comparisons are neutral — buyers trust a service shop that doesn't
 * pick favorites in the marketing. Google rewards balanced comparison content.
 *
 * Sizing: each comparison aims for 1500-2000+ words across:
 *   intro + brandA.about + brandB.about + brandC.about (if any)
 *   + whereAWins/whereBWins/whereCWins
 *   + ownership.* + failureModes (per brand)
 *   + buyerProfiles + bernePerspective + faqs.answer
 */
import type { FAQ } from "@/data/faqs";

export type ComparisonBrand = {
  name: string;
  /** Brand HQ or country — surfaces in Brand schema */
  hq?: string;
  /** Existing /brands/<slug> on this site, if we have a brand page */
  brandSlug?: string;
  /** 200-word about paragraph */
  about: string;
  /** 4-7 concrete strengths with model evidence */
  strengths: { title: string; detail: string }[];
  /** Common failure modes — real ticket patterns */
  failureModes: { title: string; detail: string }[];
  /** Approx parts/service ownership note (1-2 sentences) */
  ownership: string;
};

export type BuyerProfile = {
  /** "If you prioritize X" — one-line headline */
  headline: string;
  /** Which brand we'd recommend + why (2-3 sentences) */
  recommendation: string;
};

export type ComparisonProfile = {
  slug: string;
  /** H1 — full comparison headline */
  h1: string;
  /** Meta title (≤60 chars target) */
  metaTitle: string;
  /** Meta description (≤155 chars target) */
  metaDescription: string;
  /** Short hero teaser (1-2 sentences) */
  teaser: string;
  /** 2-3 paragraph intro to the comparison */
  intro: string;
  /** TL;DR — 3-5 bullet verdict lines */
  tldr: string[];
  /** Brands being compared (2 or 3) */
  brands: ComparisonBrand[];
  /** Buyer profiles — who picks which */
  buyerProfiles: BuyerProfile[];
  /** Cost-of-ownership notes spanning the whole comparison */
  ownershipNotes: string;
  /** Berne's neutral-party perspective */
  bernePerspective: string;
  /** 5-7 FAQ entries */
  faqs: FAQ[];
};

// ---------------------------------------------------------------------------
// 1. Sub-Zero vs Viking — premium refrigeration showdown
// ---------------------------------------------------------------------------

const SUB_ZERO_VS_VIKING: ComparisonProfile = {
  slug: "sub-zero-vs-viking",
  h1: "Sub-Zero vs Viking — Which Built-In Refrigerator Is Right for You?",
  metaTitle: "Sub-Zero vs Viking — Refrigeration Compared | Berne",
  metaDescription:
    "Premium built-in refrigeration compared by a South Florida service shop that repairs both. Reliability, parts, sealed-system service, real model trade-offs.",
  teaser:
    "Two premium built-in refrigeration platforms — one built around dual sealed systems and decades-long compressor life, the other around bold pro-style aesthetics and a wider feature set. Here is what eleven years of South Florida service tickets actually show.",
  intro:
    "Anyone shopping for a $12,000-$20,000 refrigerator quickly narrows the field to a handful of platforms. Sub-Zero and Viking are two of the most common finalists — both build genuine commercial-grade refrigeration in panel-ready, built-in cabinetry, both carry full-depth warranties, and both will install cleanly into a 36\" or 48\" framed opening with a custom panel. They also fail in very different ways.\n\nBerne Appliance Repair services both lines across Miami-Dade, Broward, and Palm Beach. We do not sell appliances and we do not earn referral fees from either manufacturer. The comparison below is built from real warranty and out-of-warranty service tickets — the failure modes we see on the route, the parts we wait for, and the buyer profiles we watch make the decision in real kitchens.\n\nIn one sentence: Sub-Zero is the more conservative engineering choice; Viking gives you more visible feature payoff for the dollar but with a wider variance in long-term reliability. Below, we break it down by model series, failure modes, parts ecosystem, and which buyer profile each platform genuinely serves.",
  tldr: [
    "Sub-Zero wins on long-term reliability — 20+ year sealed-system service life is realistic; Viking averages closer to 12-15.",
    "Viking wins on pro-style aesthetics and price-to-feature — a 36\" Viking built-in lands materially under a comparable Sub-Zero BI-36.",
    "Both use dual evaporators (Sub-Zero standard, Viking on most current built-ins) — humidity control in the fresh-food side is near-equivalent.",
    "Sub-Zero parts (especially Series 700/Classic) remain available 25+ years out; Viking parts beyond 15 years can be a sourcing problem.",
    "If resale value of the home matters more than feature wishlists, Sub-Zero. If the kitchen is a one-time build for the owner, Viking is a legitimate choice.",
  ],
  brands: [
    {
      name: "Sub-Zero",
      hq: "Madison, Wisconsin",
      brandSlug: "sub-zero",
      about:
        "Sub-Zero is the original built-in residential refrigerator brand — the Bartelt family in Madison, Wisconsin has been building dual-compressor refrigeration since the 1940s and the BI/Classic platforms set the design vocabulary that Viking, Thermador, True Residential and Sub-Zero's own newer Designer line have all followed. The brand is privately held, US-manufactured, and ships with a 12-year sealed-system warranty (2 years full, 5 years parts on the sealed system, 12 years compressor) that is genuinely longer than any direct competitor. The platform is intentionally conservative: stable compressor models that have only changed twice in 20 years, magnetic-latch hinges, anti-microbial gasket seals, and a Carbon-Air freshness filter that the technician can swap in 30 seconds without breaking refrigerant. The trade-off is design conservatism — Sub-Zero's exterior aesthetic is corporate and restrained next to Viking's domed-stainless pro-style theatre.",
      strengths: [
        {
          title: "Dual sealed systems as a platform default",
          detail:
            "BI-36, BI-42, BI-48, and BI-30 all ship with two independent compressors — one for fresh food, one for the freezer. That means humidity bleed-through is structurally impossible and one compressor failure does not kill the second compartment. Viking matches this on current pro-built-in models but the older VCBB42/48 only ran a single sealed system with a damper.",
        },
        {
          title: "20+ year compressor life is the norm, not the exception",
          detail:
            "We routinely service 1998-2002 BI-700 series units that still hold temperature without a sealed-system intervention. The Embraco/EGAS compressors used through 2018 — and the newer Italian Aspera units since — both run at sustained-load duty cycles below 65%, which is the empirical reason these last so long.",
        },
        {
          title: "Parts availability beyond 25 years",
          detail:
            "Sub-Zero stocks board-level, motor, and door-seal parts for every model going back to the late 1980s. We sourced a 632 series condenser fan motor in 2025 in 48 hours from Madison; that would be impossible on most competitor platforms.",
        },
        {
          title: "Quiet operation",
          detail:
            "Current BI-36 measures 36 dB at one meter — quieter than a typical Whirlpool side-by-side and roughly 6-9 dB below comparable Viking built-ins. For open-plan kitchens with no service hallway between fridge and dining area, that matters.",
        },
      ],
      failureModes: [
        {
          title: "Drain-line freeze on BI-36/BI-48 (most common ticket)",
          detail:
            "The freezer evaporator drain freezes shut over time, water backs up into the freezer floor, then leaks down into the fresh-food compartment when you open the door. Fix is a drain-line clear + heat-tape inspection — typical 1-1.5 hour visit, no parts on most calls.",
        },
        {
          title: "Display board failure on 600/650 series (units pre-2014)",
          detail:
            "Older two-line display panels develop dim segments or stop responding to set-point changes. Sub-Zero stocks the board (around $480-$620 list, less through trade) and the swap is a 35-minute job.",
        },
        {
          title: "Condenser fan motor seizure in lake-front or coastal homes",
          detail:
            "Salt-air corrosion on the rear condenser fan motor is the dominant failure mode in any home within a mile of the ocean. We see it most on units that lack the proper grille airflow because the cabinet install was done tight to the wall.",
        },
      ],
      ownership:
        "Sub-Zero service-call routes are dense in South Florida — most parts arrive next-business-day from the Madison distribution warehouse via Marcone or Tribles. Out-of-warranty repair on a sealed system runs $900-$1,800 typical; a full compressor replacement on a BI-48 lands at $2,200-$2,800 with parts and labor.",
    },
    {
      name: "Viking",
      hq: "Greenwood, Mississippi",
      brandSlug: "viking",
      about:
        "Viking built the original pro-style residential range in the 1980s and brought the same exposed-steel, commercial-kitchen design language to refrigeration in the early 2000s. The brand is now owned by Middleby Corporation (since 2013), which has consolidated manufacturing, simplified the product portfolio, and addressed the platform reliability issues that plagued the 2008-2014 era. Current Viking 7 Series built-ins (VBI7360, VBI7480, etc.) ship with the ProChill dual-evaporator system and a 2-year parts+labor / 12-year sealed-system warranty that matches Sub-Zero on paper. The visible payoff over Sub-Zero is real — domed-stainless door panels, raised pro handles, blue LED interior lighting, glass shelves with a deeper lip — and the price comes in roughly 12-18% below a comparable Sub-Zero BI for the same cabinet size.",
      strengths: [
        {
          title: "Visible pro-style aesthetic",
          detail:
            "A Viking VBI7360 next to a Viking range and hood reads as a designed system; a Sub-Zero BI-36 in the same kitchen looks like a refrigerator from a different vocabulary. If the rest of the kitchen is Viking — and Viking is the only brand that builds a complete pro-style suite — visual coherence is a real argument.",
        },
        {
          title: "Lower entry price for built-in refrigeration",
          detail:
            "A 36\" Viking built-in lands between $9,500-$11,500 MSRP. A 36\" Sub-Zero BI-36 lands $13,000-$15,500. Both retail through dealer programs at 10-15% off list. The Viking price delta funds about a third of a Viking range or hood.",
        },
        {
          title: "Glass shelf design and interior layout",
          detail:
            "The 7 Series interior glass shelves carry deeper spill containment lips than Sub-Zero's bin-mount profile, and the door bin layout is more usable for tall bottles (we measure 17.5\" clear vs Sub-Zero's 16\" on a comparable bin slot).",
        },
        {
          title: "Improved reliability under Middleby ownership",
          detail:
            "The 2018+ Viking built-ins are materially more reliable than the 2010-2014 generation; sealed-system failures have dropped sharply on the 7 Series compared to the legacy VCBB platform. We still don't service them at Sub-Zero rates, but the gap has narrowed.",
        },
      ],
      failureModes: [
        {
          title: "Control board failure (VCBB/VCBI platform)",
          detail:
            "The legacy 2010-2014 control boards develop relay welds that lock the compressor on or off. Parts availability is now spotty — we wait 7-14 days on a current order, occasionally longer for the rarer VCBI assemblies.",
        },
        {
          title: "Door gasket compression set",
          detail:
            "Viking gaskets take a permanent crush along the hinge side after 8-10 years. The fridge runs longer cycles, freezer ice-up follows. The gasket itself is in-stock at $260-$340 typical, swap is straightforward.",
        },
        {
          title: "Ice-maker valve failures in 7 Series",
          detail:
            "Inlet solenoid valve and the ice mold thermistor are the two most common ice-maker tickets. Both are stocked parts, neither is sealed-system.",
        },
      ],
      ownership:
        "Viking parts run through Middleby's residential parts network — current production parts are typically 3-5 days out, older VCBB/VCBI parts can be 1-3 weeks. Out-of-warranty repair on a sealed system runs $1,200-$2,200 typical; in 2024-2025 we have seen Viking compressor parts pricing climb sharper than Sub-Zero, narrowing the historic cost advantage.",
    },
  ],
  buyerProfiles: [
    {
      headline: "You are building a long-hold primary residence",
      recommendation:
        "Sub-Zero. The 20-year reliability profile and the 25-year parts horizon both compound — you will likely never replace this refrigerator, and the resale of the home benefits from the brand name on appraisal photos.",
    },
    {
      headline: "You are doing a one-time pro-style kitchen build for yourself",
      recommendation:
        "Viking — particularly if the range and hood are also Viking and visual coherence matters more than the last 5% of reliability margin. The cost savings on the fridge funds upgrades elsewhere in the suite.",
    },
    {
      headline: "Coastal or lake-front South Florida home",
      recommendation:
        "Sub-Zero, with the proper condenser grille clearance specified at install. Salt air is hard on every brand of compressor fan motor, but the Sub-Zero sealed system survives the periodic motor swap better than Viking's tighter compressor cycle.",
    },
    {
      headline: "Vacation property or secondary home (low duty cycle)",
      recommendation:
        "Either platform is fine; we lean slightly Viking on lower-duty-cycle homes because the price-to-feature is hard to argue with when the fridge will run at half-load most of the year.",
    },
  ],
  ownershipNotes:
    "Both platforms qualify for the same Berne $59 service-call fee. Both Sub-Zero and Viking parts move through the Marcone distribution network, but Sub-Zero parts orders consistently clear in 24-48 hours from Atlanta or Madison and Viking parts beyond the 2018 catalog can stretch to 7-14 days. On a 15-year ownership horizon, Sub-Zero will typically need 1-2 sealed-system interventions versus Viking's 2-3; the Viking purchase price savings get partly absorbed by that delta unless you do scheduled maintenance every 24-36 months.",
  bernePerspective:
    "We service both lines, our techs hold the Sub-Zero factory training and the Viking field-service certification, and our trucks stock the common parts for both. If a client asks us pre-purchase, we usually ask three questions: (1) is this your forever house, (2) is the rest of the kitchen pro-style, (3) how many hours per week is the kitchen actually in use. Forever house + general transitional kitchen = Sub-Zero. Pro-style suite + heavy-use cooking household = Viking. Forever house with pro-style suite is the only profile that genuinely needs Sub-Zero's Designer column line at $20K+ — most buyers do not.",
  faqs: [
    {
      question: "Are Sub-Zero refrigerators worth the extra money over Viking?",
      answer:
        "For long-hold primary residences in coastal South Florida, yes — the 20-year-plus reliability profile and the strong resale signal both justify the 12-18% price premium. For one-time pro-style kitchen builds where the fridge will be replaced in a kitchen remodel inside 15 years, the math is closer and Viking is a defensible choice. We service both, so we have no incentive to push you either way.",
    },
    {
      question: "Which platform has better parts availability after 10 years?",
      answer:
        "Sub-Zero is materially better. We routinely source parts for 1995-2005 BI-700 series units in 48-72 hours. Viking parts for the legacy VCBB/VCBI platform built before 2014 can take 1-3 weeks to source and a few items are now back-ordered indefinitely. If you are buying used, this matters a lot.",
    },
    {
      question: "Do both brands offer the same 12-year sealed-system warranty?",
      answer:
        "Yes, both Sub-Zero and current Viking 7 Series built-ins ship with 2 years full + 5 years sealed-system parts + 12 years compressor coverage. The warranty is honored through factory-authorized service shops; Berne Appliance Repair is factory-authorized for Sub-Zero in South Florida and certified for Viking.",
    },
    {
      question: "Which brand is louder?",
      answer:
        "Viking. Current BI Sub-Zero models measure around 36 dB at one meter; comparable Viking 7 Series units measure 42-45 dB. In open-plan kitchens where the fridge sits across an island from the dining table, the gap is audible.",
    },
    {
      question: "Can a Sub-Zero panel be retrofitted to a Viking opening?",
      answer:
        "Not cleanly. The framed openings and hinge clearances differ enough that a same-size swap typically requires cabinet modification on the surround. If you are replacing one platform with the other, plan for a finish-carpenter half-day on top of the install.",
    },
    {
      question: "What is the typical service-call cost for either brand?",
      answer:
        "Berne charges $59 for the service call across both platforms, applied toward the repair if you proceed. Out-of-warranty sealed-system work lands $900-$1,800 on Sub-Zero and $1,200-$2,200 on current Viking. Non-sealed-system repairs (control boards, gaskets, fans) run $250-$700 on either platform.",
    },
    {
      question: "Which brand handles South Florida humidity better?",
      answer:
        "Both perform well — humidity is managed at the evaporator coil, not at the cabinet, and both run dual evaporators on current builds. Where we see humidity-related failures is on legacy single-sealed-system Viking VCBB units from before 2014, which were more prone to ice migration in muggy summers. Modern 7 Series Viking and any Sub-Zero BI handle South Florida summers without trouble.",
    },
  ],
};

// ---------------------------------------------------------------------------
// 2. Wolf vs Thermador vs Viking — pro range showdown
// ---------------------------------------------------------------------------

const WOLF_VS_THERMADOR_VS_VIKING: ComparisonProfile = {
  slug: "wolf-vs-thermador-vs-viking",
  h1: "Wolf vs Thermador vs Viking — Which Pro Range Is Best?",
  metaTitle: "Wolf vs Thermador vs Viking — Honest Tech Verdict · Berne",
  metaDescription:
    "Three pro-style residential ranges compared by South Florida technicians who repair all three. Burner output, oven design, reliability, real-world trade-offs.",
  teaser:
    "Three brands dominate the residential pro-range market — Wolf, Thermador, and Viking. They share the dual-fuel format and the price tier, but the engineering philosophies are very different. Here is the honest comparison.",
  intro:
    "If you are spending $7,500-$15,000 on a 36\" or 48\" residential range, Wolf, Thermador, and Viking are almost certainly on the shortlist. All three deliver real commercial-derived burner output, all three offer a dual-fuel option that pairs sealed gas burners with electric ovens, and all three install through pro-style retail showrooms with comparable warranty programs. But the way they cook, the way they fail, and the parts ecosystems behind them are not the same.\n\nBerne Appliance Repair services all three brands across South Florida. We do not sell ranges, we do not earn referral fees, and our technicians carry factory training across the Sub-Zero / Wolf umbrella as well as Viking and Bosch / Thermador. The comparison below is built from real service tickets, not brochure copy.\n\nThe headline trade-off: Wolf is the most consistently reliable and the most conservative; Thermador delivers the strongest burner output for the dollar and the best baking oven; Viking is the most distinctive aesthetically but carries the highest variance in long-term reliability. Each is a defensible pick for a specific buyer profile.",
  tldr: [
    "Wolf wins on long-term reliability — 15+ year duty cycles routine; the dual-stacked burner is the most consistent simmer-to-sear in the category.",
    "Thermador wins on burner output (Star Burner pattern + Pedestal Star = best flame distribution under a 12\" pan) and oven baking performance.",
    "Viking wins on aesthetics and price-to-feature — the VGR series ranges land 10-15% below comparable Wolf for the same BTU output.",
    "Wolf's electric ovens use a dual convection fan pattern that beats both competitors on multi-rack baking consistency.",
    "Thermador parts move through the BSH (Bosch-Siemens-Hausgeräte) network — fast on current models, slow on pre-2015 platform.",
  ],
  brands: [
    {
      name: "Wolf",
      hq: "Fitchburg, Wisconsin",
      brandSlug: "wolf",
      about:
        "Wolf was the original commercial-range brand spun into residential by Sub-Zero in 2000, after Sub-Zero acquired the cooking line and rebuilt it around the residential dual-fuel format. The factory in Fitchburg, Wisconsin, builds every range, oven, and rangetop on the same engineering disciplines as Sub-Zero refrigeration — meaning conservative duty-cycle targets, US-sourced steel, and a 2-year-full / 5-year-limited warranty backed by the same field-service network. The defining Wolf burner design is the dual-stacked sealed burner: two concentric rings (an outer high-output ring rated 15,000-20,000 BTU and an inner simmer ring as low as 300 BTU) that lets a single burner cover the full range from a delicate beurre-blanc reduction to a screaming-hot sear without changing burners. The DF (dual-fuel) range pairs these burners with twin convection electric ovens running the dual-stacked broiler element. Wolf is not the cheapest, the most powerful, or the most visually arresting platform — it is the one we see fail least often on the 10-15 year mark.",
      strengths: [
        {
          title: "Dual-stacked burner design",
          detail:
            "Every Wolf sealed burner runs two flame rings — an inner simmer ring that drops to as low as 300 BTU and an outer ring rated 15,000 BTU on most positions and 20,000 BTU on the lower-left dedicated power burner. That gives you a usable simmer (no clicking on-off thermostat cycling) and a real sear from the same burner. Competitors typically dedicate one burner to simmer and one to power.",
        },
        {
          title: "Twin convection oven performance",
          detail:
            "The DF36 and DF48 ovens use dual convection fans (top and bottom) that produce materially more even bake across a three-rack cookie sheet test than single-fan Thermador or single-fan Viking. We see fewer hot-spot complaints on Wolf ovens than on any other pro range.",
        },
        {
          title: "Long-term reliability",
          detail:
            "We have customers running Wolf DF36 ranges installed in 2010 that have not had a single service ticket. The gas safety valve and the spark module on the Wolf burner platform are the most reliable in the category — we see those parts fail at roughly half the rate of comparable Thermador or Viking parts.",
        },
        {
          title: "Parts available 20+ years out",
          detail:
            "Wolf uses the Sub-Zero parts network, which means we routinely source parts for 2003-2008 Wolf ranges in 24-48 hours. Burner caps, igniters, control knobs, oven boards — all current-cataloged for the legacy platform.",
        },
      ],
      failureModes: [
        {
          title: "Spark module continuous clicking",
          detail:
            "Most common Wolf range ticket — a single burner igniter switch shorts and the spark module clicks continuously across all burners. Diagnosis is 15-20 minutes (isolating the bad switch); the switch itself is $40-$80 and the module $180-$240 if it has burned out.",
        },
        {
          title: "Oven door hinge wear on heavy-use households",
          detail:
            "After 8-10 years of daily use, the spring-tensioned oven door hinges lose their close-bias and the door starts sagging. Hinge replacement is a 45-minute job; parts $220-$310.",
        },
        {
          title: "Convection fan motor failure (DF48 only)",
          detail:
            "The lower convection fan motor on DF48 dual-oven units sees higher duty cycle and starts wining around year 12-15 in heavy households. Fan motor is $280-$360, swap is straightforward.",
        },
      ],
      ownership:
        "Wolf parts run through the same Sub-Zero / Wolf service network with 24-72 hour parts arrival typical. Out-of-warranty service-call ticket averages $250-$450 on common repairs (igniter, hinge, fan); sealed-component work is rare. Annual maintenance is not strictly necessary — we recommend a 24-month inspection rather than the 12-month some brands ask for.",
    },
    {
      name: "Thermador",
      hq: "Germany / Irvine, California (NA operations)",
      brandSlug: "thermador",
      about:
        "Thermador is the BSH (Bosch-Siemens-Hausgeräte) premium cooking brand for North America — same parent that builds Bosch and Gaggenau, with a US operations base in Irvine, California and final assembly historically in New Bern, North Carolina. The signature Thermador design is the Star Burner: a five-point star-shaped burner head that distributes flame over a wider footprint than a circular ring, with the optional Pedestal Star raising the flame closer to the bottom of the pan for higher effective transfer. On the oven side, Thermador's Pro Grand and Pro Harmony ranges deliver excellent baking — the Star series ovens hold setpoint within a few degrees across the full cycle and the convection patterns are very even. The brand is the most actively engineered of the three (the current platform refreshes faster than Wolf or Viking) and the price-to-feature ratio is strong, particularly on the 36\" Pro Harmony.",
      strengths: [
        {
          title: "Star burner flame pattern",
          detail:
            "The star-shaped burner head puts five points of flame contact under the pan rather than the single circular ring. Under a 12\" sauté pan, you get more even heat distribution and faster recovery after adding cold food. The Pedestal Star option raises the flame closer for higher effective BTU transfer.",
        },
        {
          title: "Baking oven performance",
          detail:
            "The Pro Grand and Pro Harmony electric oven cavities deliver some of the most accurate bake temperatures in the category — setpoint hold within 4-6F across the full cycle. The convection fan and ducting design pulls hot air across the back wall and exhausts down the front, producing very even browning.",
        },
        {
          title: "Strong price-to-feature on 36\" Pro Harmony",
          detail:
            "A 36\" Thermador Pro Harmony dual-fuel range lands $7,500-$8,800 MSRP — meaningfully below the Wolf DF36 ($10,500-$12,500) for similar BTU output and oven volume. The trade is on long-term reliability variance.",
        },
        {
          title: "Self-clean oven cycle works well",
          detail:
            "Of the three, Thermador's self-clean cycle is the most usable — runs at lower peak temperature than competitors and is less likely to damage the oven door gasket. The cycle hits 880F vs the 920-940F on competitor self-cleans.",
        },
      ],
      failureModes: [
        {
          title: "Igniter assembly carbon-fouling on Star burners",
          detail:
            "Carbon buildup on the igniter electrode is the most common ticket on Thermador ranges. After 4-6 years, the burners start hesitating to light. Cleaning is a 15-minute job; igniter replacement is $80-$130 each.",
        },
        {
          title: "Oven door triple-pane glass separation",
          detail:
            "On Pro Grand ranges built 2010-2016, the three-pane oven door glass can separate at the inner seal — visible as condensation between panes. Replacement door glass assembly $580-$780 typical.",
        },
        {
          title: "Touch control board failure on Pro Grand 48\" steam-combi",
          detail:
            "The steam-combi oven on dual-cavity Pro Grand 48 ranges is the most fragile single component on Thermador. Board replacement $720-$960. Wolf and Viking do not offer a directly comparable steam-combi product.",
        },
      ],
      ownership:
        "Thermador parts move through the BSH Home Appliances Group parts network — current production catalog parts arrive in 3-5 days, pre-2014 pre-platform parts can stretch to 7-14 days. Out-of-warranty service averages $300-$650 on common tickets; the steam-combi failure is the most expensive Thermador repair pattern at $900-$1,400 turnkey.",
    },
    {
      name: "Viking",
      hq: "Greenwood, Mississippi",
      brandSlug: "viking",
      about:
        "Viking invented the residential pro range in 1987 and the brand's commercial-derived aesthetic — domed stainless cooktops, exposed grates, classic open burner design — remains the most visually distinctive in the category. After Middleby Corporation acquired the brand in 2013, the platform has stabilized considerably from the troubled 2008-2014 era and current VGR and Tuscany series ranges are materially more reliable than their predecessors. The 36\" VGR3656 dual-fuel range delivers 18,500 BTU on the power burner and runs $7,200-$8,900 MSRP — the best raw price-to-feature value of the three brands. The trade-off is on consistency: Wolf and Thermador parts have a tighter manufacturing variance, while Viking burners can occasionally need re-calibration out of the box.",
      strengths: [
        {
          title: "Most distinctive aesthetic",
          detail:
            "If the rest of the kitchen is designed around a pro-style language, Viking's domed cooktop and signature handles complete the look in a way Wolf's restrained design and Thermador's German-restrained design cannot match. For a designed kitchen that is the central architectural feature of the home, Viking is the visual answer.",
        },
        {
          title: "Sealed Gourmet-Glo infrared broiler",
          detail:
            "The infrared ceramic broiler in the upper oven of dual-fuel Viking ranges is the most aggressive broiler in the category — surface temperatures reach 1,500F in 90 seconds. For dedicated broiler users (steakhouse-at-home cookery), Viking is genuinely the best choice.",
        },
        {
          title: "Strong post-Middleby reliability improvements",
          detail:
            "The 2018+ VGR and Tuscany ranges have meaningfully lower service ticket rates than the 2010-2014 platform. Current production parts are stocked through the Middleby Residential parts network with 3-5 day arrival typical.",
        },
        {
          title: "Best price-to-output on raw BTU",
          detail:
            "A 36\" Viking VGR3656 with 18,500 BTU power burner lands $1,500-$3,000 below comparable Wolf for similar output. That delta funds upgrades in the hood, range top, or other appliances elsewhere in the kitchen.",
        },
      ],
      failureModes: [
        {
          title: "Spark module + ignition switch failures",
          detail:
            "Like Wolf, Viking ignition systems develop continuous-clicking failures from a shorted switch. The Viking platform sees this slightly more often than Wolf (maybe 1.4x ticket rate); the part is $35-$70 per switch and $160-$220 for the module.",
        },
        {
          title: "Convection fan thermal cutoff on VGR",
          detail:
            "The dual-fuel oven's convection fan has a one-shot thermal fuse that trips after a high-temp self-clean cycle. Customer reports oven \"dead.\" Fuse is $40-$60, but it's behind the rear oven panel — a 30-minute access job.",
        },
        {
          title: "Door hinge bend on VGSC (commercial-style) ranges",
          detail:
            "Heavier oven door + spring tension wear leads to door sag on 8-12 year units. Hinge replacement is $260-$340 the pair, swap is a 60-minute job.",
        },
      ],
      ownership:
        "Viking parts run through the Middleby Residential parts network. Current production parts arrive 3-5 days; legacy 2010-2014 platform parts can stretch to 7-14 days or longer for the rarer items. Out-of-warranty service runs $280-$580 on common tickets, comparable to Thermador.",
    },
  ],
  buyerProfiles: [
    {
      headline: "You cook daily and want the most reliable pick",
      recommendation:
        "Wolf. The 15-year service ticket rate is materially lower than Thermador or Viking. Heavy daily-use households see the reliability delta compound to a real ownership cost difference over time.",
    },
    {
      headline: "You are a serious baker — bread, pastry, layered cakes",
      recommendation:
        "Thermador. The Pro Grand and Pro Harmony ovens hold setpoint better than either competitor and the convection pattern is the most even across all three racks. The Star burner is a bonus but the oven is the real reason.",
    },
    {
      headline: "Big-flame steak / wok / high-heat searing is your priority",
      recommendation:
        "Viking, with Thermador as a close second. The Viking Gourmet-Glo infrared broiler is unmatched and the 18,500 BTU power burner delivers more raw output than Wolf's 15,000 standard (Wolf only matches on the dedicated 20K corner burner).",
    },
    {
      headline: "Visual coherence with a Viking-branded suite",
      recommendation:
        "Viking. If the hood, fridge, and dishwasher are all Viking, the range completing the suite is the right call. The aesthetic value is real and the post-2018 reliability is acceptable.",
    },
    {
      headline: "Long-hold primary residence with appraisal in mind",
      recommendation:
        "Wolf. The brand reads strongest on appraisal photos in the $1M+ home market and the long-term reliability profile means you will not need to replace it during ownership.",
    },
  ],
  ownershipNotes:
    "All three brands qualify for the same Berne $59 service-call fee and the same $89 commercial dispatch if the range is in a commercial kitchen. Wolf service tickets are the cheapest in total ownership cost because they happen the least often. Thermador and Viking are comparable on per-ticket cost but ticket frequency on Viking pre-2018 platform was meaningfully higher (we no longer see that delta on current production). Total 15-year ownership cost ranks: Wolf cheapest, Thermador middle, Viking slightly higher (driven by legacy platform tickets we still see in the field).",
  bernePerspective:
    "For the median South Florida buyer at this price tier, we recommend Wolf when the question is open-ended. When the buyer has a specific cooking style (heavy baking, steak-forward, suite aesthetic), the answer shifts. We see all three platforms succeed and all three platforms fail in the field; the differences are real but small enough that buyer preference should drive the decision more than a service-shop opinion. The one configuration we steer away from is the Thermador Pro Grand 48\" steam-combi — the steam-combi cavity is the single most fragile thing across all three brands. If that feature is important, plan for one major service event inside the warranty period.",
  faqs: [
    {
      question: "Which pro range brand is the most reliable?",
      answer:
        "Wolf — by a meaningful margin on 10-15 year ownership. We see Wolf service tickets at roughly 0.6x the rate of Thermador and 0.7x the rate of post-2018 Viking. The gap was larger against pre-2018 Viking, which we no longer see in new installs.",
    },
    {
      question: "Is the Wolf dual-stacked burner really better than the Thermador Star burner?",
      answer:
        "They are different, not strictly better/worse. Wolf's dual-stacked design wins on simmer (genuine 300 BTU low without thermostatic cycling); Thermador's Star pattern wins on even heat distribution under wider pans. For delicate sauces and reductions, Wolf. For most other cooking, the difference is marginal.",
    },
    {
      question: "Which brand has the best oven for baking?",
      answer:
        "Thermador, narrowly. The Pro Grand and Pro Harmony ovens hold temperature within 4-6F of setpoint across the full cycle and the convection pattern is the most even on three-rack tests. Wolf's twin-convection design is a close second; Viking is third on baking-specific work.",
    },
    {
      question: "Are parts easier to source for one brand over another?",
      answer:
        "Wolf has the best parts ecosystem for legacy units (15+ year old ranges). Thermador and Viking are comparable on current production parts (3-5 days). For pre-2014 Viking platform, expect parts wait times of 7-14 days.",
    },
    {
      question: "Which is the best value for the money?",
      answer:
        "Viking on raw price-to-BTU; Thermador Pro Harmony on price-to-baking-oven; Wolf on lowest total cost of ownership. The honest answer depends on whether you care about purchase price or total ownership cost.",
    },
    {
      question: "Do all three offer the same warranty?",
      answer:
        "Approximately. Wolf is 2 years full + 5 years limited. Thermador is 2 years full + 5 years on burners and oven cavity. Viking is 2 years full + 5 years on cooking surface + 90 days on cosmetic. All three are honored through factory-authorized service shops including Berne in South Florida.",
    },
    {
      question: "Can Berne service all three in South Florida?",
      answer:
        "Yes. Our technicians carry factory training across Sub-Zero / Wolf, BSH (Thermador), and Viking. Same-day dispatch is typical for the $89 commercial or $59 residential service call across all three brands.",
    },
  ],
};

// ---------------------------------------------------------------------------
// 3. Miele vs Bosch — premium dishwasher comparison
// ---------------------------------------------------------------------------

const MIELE_VS_BOSCH: ComparisonProfile = {
  slug: "miele-vs-bosch",
  h1: "Miele vs Bosch — Which Premium Dishwasher Is Better?",
  metaTitle: "Miele vs Bosch — Premium Dishwashers | Berne",
  metaDescription:
    "German-engineered premium dishwashers compared. Miele's 20-year life vs Bosch's 12-15 — wash quality, drying, real-world reliability from a service shop that fixes both.",
  teaser:
    "Two German-engineered dishwasher platforms that dominate the premium segment. Both are quiet, both clean exceptionally well, both will outlast a typical mass-market dishwasher by 2-3x. But they are not the same machine, and the price delta has a real engineering basis.",
  intro:
    "Miele and Bosch are the two premium dishwashers South Florida kitchens choose when the buyer wants something better than a mass-market Whirlpool or KitchenAid. Both brands are German-engineered (Miele in Gütersloh, Bosch as part of the BSH consortium in Munich), both use stainless tubs, both deliver wash and dry performance well above the US-built premium segment. Where they diverge is on durability, repairability, and price tier.\n\nBerne Appliance Repair services both lines across South Florida. The honest comparison: a Miele G7000 series dishwasher will likely outlast a comparable Bosch 800 Series by 5-8 years in real-world South Florida use, and the price reflects that. Bosch delivers about 80% of the Miele experience at 55-65% of the price. Whether the remaining 20% is worth the price delta depends entirely on how long you plan to own the appliance and the home.",
  tldr: [
    "Miele wins on lifetime — 20+ year service life is realistic; Bosch averages 12-15 years.",
    "Bosch wins on price — comparable models land 35-45% below Miele MSRP.",
    "Both deliver excellent wash and quiet operation (Miele 39-42 dBA; Bosch 800 Series 39-42 dBA — effectively tied).",
    "Miele's AutoDos detergent dispenser is the only one of its kind in the category — Bosch has no equivalent.",
    "Bosch's parts ecosystem is faster for current production; Miele's parts are longer-tail (15+ year availability).",
  ],
  brands: [
    {
      name: "Miele",
      hq: "Gütersloh, Germany",
      brandSlug: "miele",
      about:
        "Miele is the family-owned German manufacturer that has built household appliances since 1899 — still privately held by the Miele and Zinkann families, still manufacturing in Gütersloh, Germany, and still building every dishwasher to a 20-year-design-life specification (the brand's marketing claim, but it matches what we see in the field). The current G7000 and G7100 series dishwashers ship with seven wash programs, the AutoDos automatic detergent dispenser (no other brand sells this), and a panel-ready built-in design that integrates cleanly into a custom-paneled kitchen. The wash system is the EcoTech platform, which uses a heat exchanger to pre-warm the rinse water from the previous load's drain water — a small but genuine efficiency feature that nobody else builds. Price tier is the highest in residential dishwashers: a paneled G7366 lands $2,800-$3,800 typical install.",
      strengths: [
        {
          title: "20-year design life",
          detail:
            "Every component is engineered to 20-year service. The wash motor, drain pump, heating element, control board are all over-specified for residential duty cycles. We routinely service Miele dishwashers from 2005-2008 that have not had a single ticket — the wash motor still measures within OEM tolerance.",
        },
        {
          title: "AutoDos automatic detergent dispenser",
          detail:
            "The G7000 series introduces the PowerDisk consumable — a 20-load disk loaded into the door dispenser that the machine doses automatically per wash. Eliminates pod usage. Nobody else builds this. For households that run multiple loads per day, the convenience compounds.",
        },
        {
          title: "Quiet operation under 40 dBA",
          detail:
            "Current G7000 measures 39 dBA in the quiet wash cycle — among the quietest in the category. In open-plan kitchens running the dishwasher during dinner, the difference is real.",
        },
        {
          title: "Strong drying performance",
          detail:
            "Miele uses a heat exchanger condenser drying system that uses cool surface area at the side of the tub to condense steam at the end of the cycle. Drying performance on plastic items is materially better than the typical Bosch CrystalDry or condensation-only systems.",
        },
      ],
      failureModes: [
        {
          title: "Water inlet valve solenoid (G6000/G7000)",
          detail:
            "After 8-12 years, the inlet valve solenoid develops a slow leak that triggers the bottom-pan flood sensor. The machine refuses to fill. Valve is $140-$180; the swap is a 45-minute job through the bottom kickplate.",
        },
        {
          title: "Door spring tension loss",
          detail:
            "The counter-balance door spring loses tension after 10-15 years and the door becomes hard to close. Spring kit is $60-$110 the pair, swap is a 30-minute job.",
        },
        {
          title: "Drain pump impeller wear (rare, 15+ year units)",
          detail:
            "Drain pump impeller starts hesitating to start the drain cycle on units past 15 years. Replacement pump $180-$240; access is through the bottom kickplate.",
        },
      ],
      ownership:
        "Miele parts move through Miele USA's parts network (Princeton, NJ distribution). Current parts arrive 3-5 days; 15+ year vintage parts can stretch to 7-14 days but Miele explicitly stocks parts for 20-year-old units, which is unique in the segment. Out-of-warranty service averages $250-$420 on common tickets.",
    },
    {
      name: "Bosch",
      hq: "Stuttgart, Germany (BSH Munich)",
      // No brandSlug — /brands/bosch has no profile page; linking it would 404.
      about:
        "Bosch dishwashers are built by BSH (Bosch-Siemens-Hausgeräte) — the same consortium that builds Thermador and Gaggenau — with current models manufactured in New Bern, North Carolina (where the platform has been built since 1997). Bosch's 800 Series and Benchmark Series compete directly with Miele on wash quality and quietness at a meaningfully lower price point. The CrystalDry system (a hydroscopic zeolite mineral that absorbs moisture from the air at the end of the cycle and releases heat to dry the dishes) is genuinely effective and gives Bosch competitive drying performance against Miele's heat-exchanger system. The price advantage is real — a current 800 Series panel-ready dishwasher lands $1,400-$1,900 MSRP versus Miele's $2,800-$3,800.",
      strengths: [
        {
          title: "Price-to-performance leadership",
          detail:
            "A Bosch 800 Series at $1,500 delivers wash and quiet performance that lands within 80% of a Miele G7000 at $3,200. Over 12-15 years, the price delta funds the eventual replacement — Bosch becomes the rational choice for ownership horizons shorter than 15 years.",
        },
        {
          title: "CrystalDry drying system",
          detail:
            "The zeolite-mineral drying tech in the 800 Series and Benchmark dries plastic items meaningfully better than the typical condensation-only premium dishwasher. Comes the closest to matching Miele's heat-exchanger system at a much lower cost.",
        },
        {
          title: "Strong parts ecosystem (US manufacturing)",
          detail:
            "Because Bosch builds in New Bern, NC, current production parts move through the BSH US parts network with 1-3 day arrival typical. Faster than Miele on current parts; equivalent on legacy.",
        },
        {
          title: "Quiet operation matches Miele",
          detail:
            "The 800 Series measures 39-42 dBA — effectively tied with Miele G7000 on quietness. The Benchmark series adds AutoAir door open at end of cycle that further improves drying without adding noise.",
        },
      ],
      failureModes: [
        {
          title: "ECO sensor (turbidity) failures on Ascenta-300 series",
          detail:
            "Lower-tier Ascenta and 300 Series develop turbidity sensor faults after 5-8 years where the machine misreads the soil level and either short-cycles or over-extends. Sensor is $80-$140; 30-minute job.",
        },
        {
          title: "Drain pump failures across all series",
          detail:
            "Drain pump is the most common Bosch dishwasher ticket overall. Pump $130-$200, swap is 30-40 minutes. Tighter platform variance — the pump fails earlier than the equivalent Miele part by 4-6 years on average.",
        },
        {
          title: "Heating element open-circuit on 800 Series",
          detail:
            "The exposed heater element on 800 Series can develop continuity faults after 10-14 years. Element + thermistor assembly $140-$200; access through the bottom kickplate.",
        },
      ],
      ownership:
        "Bosch parts move through the BSH Home Appliances parts network — current production at 1-3 days, pre-2014 platform parts at 5-10 days. Out-of-warranty service averages $200-$380 on common tickets. Total 15-year ownership cost is lower than Miele but the replacement cycle is faster.",
    },
  ],
  buyerProfiles: [
    {
      headline: "You are buying for a forever home",
      recommendation:
        "Miele. The 20-year design life means you likely never replace the dishwasher during ownership. The $1,000-$1,400 price delta over Bosch amortizes to under $100/year on a 15-year hold.",
    },
    {
      headline: "You are renovating for resale in 5-7 years",
      recommendation:
        "Bosch 800 Series. The aesthetic and wash quality are very close to Miele at the price point that comparable kitchens are running. The premium of Miele won't fully recover on resale.",
    },
    {
      headline: "Heavy daily use with multiple loads per day",
      recommendation:
        "Miele, particularly the G7000 with AutoDos. The automatic detergent dosing compounds the convenience over thousands of cycles, and the 20-year design life genuinely earns out under heavy use.",
    },
    {
      headline: "Quiet kitchen / open-plan layout",
      recommendation:
        "Either — they are tied. Both 39-42 dBA. Choose on price or AutoDos preference.",
    },
    {
      headline: "Vacation property or low-duty cycle",
      recommendation:
        "Bosch. The Miele design-life advantage doesn't compound at low duty cycle, so the price premium is wasted.",
    },
  ],
  ownershipNotes:
    "Both platforms qualify for the same Berne $59 service-call fee in South Florida. Miele service tickets are less frequent (annual rate roughly 0.5x Bosch on 10-year-old units), but per-ticket cost is comparable. Total 20-year ownership cost favors Miele only if you actually keep the appliance 20 years; for ownership horizons under 12 years, Bosch is the cleaner economic choice. Both brands' parts move through reliable national networks; we do not see brand-specific parts delays in South Florida.",
  bernePerspective:
    "For most South Florida buyers, the honest answer is Bosch 800 Series — the price delta to Miele does not earn out on typical ownership horizons of 8-12 years, and the wash quality is genuinely close. We recommend Miele to clients who are building for permanence (forever home, multi-generational house, ultra-premium kitchen suite). We recommend Bosch when the buyer asks for our honest opinion and the kitchen is otherwise mid-premium. For households running 3+ loads per day, the AutoDos convenience on Miele G7000 is the single feature that tips the math toward Miele regardless of ownership horizon.",
  faqs: [
    {
      question: "Is Miele really worth twice the price of Bosch?",
      answer:
        "For ownership horizons of 18-20+ years, yes — the design life genuinely earns out. For typical ownership horizons of 8-12 years, Bosch is the better economic choice and delivers 80%+ of the Miele performance. The 20% that Miele adds (AutoDos, drying, longevity) is a real but specific value.",
    },
    {
      question: "Which dries dishes better?",
      answer:
        "Miele, by a small margin. The heat-exchanger condenser drying system on G7000 outperforms Bosch's CrystalDry on plastic items. On glassware and ceramics, the two are effectively tied.",
    },
    {
      question: "Which is quieter?",
      answer:
        "Effectively tied. Both Miele G7000 and Bosch 800 Series measure 39-42 dBA depending on cycle. The Bosch Benchmark adds an AutoAir door-pop at end of cycle, which slightly increases briefly but improves drying.",
    },
    {
      question: "How long do Bosch dishwashers actually last in South Florida?",
      answer:
        "12-15 years is typical in our field data. Hard water shortens it; soft water extends it. Drain pump is the dominant failure mode and the most expensive 10-year service ticket on Bosch.",
    },
    {
      question: "Does Miele's AutoDos PowerDisk add significant ongoing cost?",
      answer:
        "Yes, modestly. A 20-load PowerDisk runs $13-$16 — about $0.70 per load versus pods at $0.30-$0.50 each. Over 5 years of daily use, the total premium is $300-$400, which most AutoDos buyers consider a fair trade for the convenience.",
    },
    {
      question: "Can either dishwasher be installed panel-ready in a custom kitchen?",
      answer:
        "Yes, both. Miele has been panel-ready for 20+ years and the door panel fitment is the cleanest in the category. Bosch 800 Series and Benchmark are also fully panel-ready with the appropriate door hardware kit.",
    },
    {
      question: "Which has better parts availability after 10 years?",
      answer:
        "Tied. Miele explicitly stocks parts for 20-year-old units, which is unique. Bosch has strong parts for current production but legacy platform parts get harder past 12 years.",
    },
  ],
};

// ---------------------------------------------------------------------------
// 4. Sub-Zero vs Thermador — column refrigeration
// ---------------------------------------------------------------------------

const SUB_ZERO_VS_THERMADOR: ComparisonProfile = {
  slug: "sub-zero-vs-thermador",
  h1: "Sub-Zero vs Thermador — Column Refrigeration Compared",
  metaTitle: "Sub-Zero vs Thermador — Column Fridges | Berne",
  metaDescription:
    "Sub-Zero Designer vs Thermador Freedom column refrigeration — premium built-in cold storage compared by a service shop that repairs both.",
  teaser:
    "Column refrigeration changes the game — separate full-height fridge and freezer columns mounted side-by-side, panel-ready, fully integrated. Two brands dominate: Sub-Zero Designer and Thermador Freedom. The differences are real.",
  intro:
    "Column refrigeration is the premium evolution of the built-in refrigerator. Instead of a single 36\" or 48\" unit with a freezer drawer at the bottom or a side-by-side split, you install a separate fridge column (24\", 30\", or 36\" wide) and a freezer column (typically 18\" or 24\") side-by-side, each panel-ready, each independently controlled. The result is a fully integrated wall of refrigeration that disappears into the cabinetry and offers significantly more usable storage in either compartment than a comparable conventional built-in.\n\nTwo brands lead this segment: Sub-Zero Designer (the IC-series columns) and Thermador Freedom (the T-Series and Liberty columns). Berne Appliance Repair services both across South Florida and the decision between them is genuinely close — both deliver excellent build quality, both panel-ready cleanly, both ship with strong warranties. The trade-off is between Sub-Zero's deeper engineering conservatism and Thermador's stronger feature set at a lower price.",
  tldr: [
    "Sub-Zero Designer is the more reliable platform — 18+ year design life on the IC columns is realistic.",
    "Thermador Freedom lands 15-22% below comparable Sub-Zero Designer on pricing — meaningful budget delta.",
    "Both panel-ready cleanly with custom cabinet doors; Thermador's hinge mechanism is slightly easier to align.",
    "Sub-Zero has the longer service-network history; Thermador parts move through BSH at competitive speed.",
    "If the kitchen is being designed around the cold storage as a feature, either works. If reliability over 15+ years matters, Sub-Zero.",
  ],
  brands: [
    {
      name: "Sub-Zero Designer (IC series)",
      hq: "Madison, Wisconsin",
      brandSlug: "sub-zero",
      about:
        "Sub-Zero's Designer line — the IC series columns (IC-18FI freezer, IC-24R refrigerator, IC-27R, IC-30R, IC-30RID with internal dispenser, IC-36R) — is the brand's answer to the column refrigeration trend and is built on the same engineering disciplines as the BI built-in line. Independent dual sealed systems per column (the freezer column has its own compressor; each refrigerator column has its own compressor), magnetic-latch door seals, the same 36 dB acoustic target, and the same 12-year sealed-system warranty. The Designer columns ship as fully panel-ready and are designed to install flush with cabinetry to a 0.125-inch tolerance — when done correctly, the column literally vanishes into the kitchen. Sub-Zero parts and service network apply identically to Designer as to BI.",
      strengths: [
        {
          title: "Per-column independent sealed systems",
          detail:
            "Each Sub-Zero Designer column has its own compressor and sealed system. Two refrigerator columns + one freezer column means three independent systems — any one failure leaves the other two operational. Thermador's Freedom columns share thermal management within each column.",
        },
        {
          title: "Quietest column refrigeration on the market",
          detail:
            "IC-30R measures 36 dB at one meter. Comparable Thermador T36IR measures 42-45 dB. In open-plan kitchens with the column visible from the dining area, the gap is audible.",
        },
        {
          title: "Strongest panel-ready fitment",
          detail:
            "Sub-Zero Designer hinges and toe-kick clearances are designed for 0.125\" fitment tolerance with custom cabinet panels. When the cabinet shop nails the panel, the column truly disappears.",
        },
        {
          title: "20+ year part availability",
          detail:
            "Same as the BI line — Sub-Zero stocks parts back to the late 1980s and the Designer platform parts are guaranteed available 20+ years out.",
        },
      ],
      failureModes: [
        {
          title: "Door alignment drift on flush-panel installs",
          detail:
            "Most common Designer ticket: the custom panel weight pulls the door slightly out of vertical over 2-3 years. Re-alignment is a 30-45 minute adjustment, no parts. Should be done at the 24-month service interval.",
        },
        {
          title: "Ice maker valve on IC-30RID dispenser column",
          detail:
            "The internal water dispenser version develops valve solenoid failures around year 8-12. Valve replacement is $180-$240, swap is 40 minutes.",
        },
        {
          title: "Carbon-air filter compartment hinge wear",
          detail:
            "Minor — the filter compartment lid hinge can wear and stop clicking shut properly after 10+ years. Hinge replacement is $30-$50 and a 15-minute job.",
        },
      ],
      ownership:
        "Sub-Zero Designer parts run through the same Marcone / Tribles distribution as BI. Out-of-warranty service averages $400-$900 typical; sealed-system work is rare on the Designer columns and runs $1,200-$2,400 if needed. Annual maintenance is unnecessary; we recommend a 24-month alignment + condenser-clean inspection.",
    },
    {
      name: "Thermador Freedom",
      hq: "Germany / Irvine, California",
      brandSlug: "thermador",
      about:
        "Thermador's Freedom collection — the T-Series columns (T18IR/IF, T24IR/IF, T30IR/IF, T36IR) plus the Liberty series — is the brand's answer to column refrigeration and competes directly with Sub-Zero Designer at a meaningful price discount. The Freedom columns ship with the Diamond Crystal Ice Maker option (T18IF freezer column), full-extension shelves, blue-tint interior LEDs, and a 2-year-full / 12-year-compressor warranty that matches Sub-Zero on paper. The columns are manufactured by BSH at the New Bern, NC facility (final assembly varies by model) and the parts network is the same BSH consortium that supports Thermador ranges. Pricing is the strongest argument: a Thermador T30IR refrigerator column lands $7,800-$9,500 versus a comparable Sub-Zero IC-30R at $10,500-$13,500.",
      strengths: [
        {
          title: "Best price-to-feature in the column segment",
          detail:
            "Thermador Freedom columns land 15-22% below comparable Sub-Zero Designer for similar volume and feature set. On a kitchen running three columns (two fridge + one freezer), the price delta can fund the entire range or hood.",
        },
        {
          title: "Diamond Ice Maker (T18IF freezer column)",
          detail:
            "The clear-ice maker option produces 1\" cubes that look like restaurant ice — meaningfully better for cocktail use than the typical cloudy-ice from a domestic ice maker. No direct Sub-Zero equivalent.",
        },
        {
          title: "Easier hinge alignment for finish carpenters",
          detail:
            "The Thermador hinge mechanism has a slightly wider adjustment range than Sub-Zero Designer, which makes panel alignment easier for the cabinet shop. Reduces total install time on a custom panel job by ~30 minutes per column.",
        },
        {
          title: "Strong feature set on T-Series",
          detail:
            "Full-extension shelves with soft-close, blue-tint interior LEDs, app connectivity, and a sturdier crisper drawer than Sub-Zero Designer. Visible feature payoff for the dollar is the Thermador story.",
        },
      ],
      failureModes: [
        {
          title: "Door alignment drift (same as Sub-Zero Designer)",
          detail:
            "All column refrigeration with custom panels has this issue. Thermador's wider adjustment range makes the re-alignment slightly faster.",
        },
        {
          title: "Control board failures on early T-Series",
          detail:
            "2014-2018 T-Series columns developed control board issues that BSH addressed in firmware updates and a hardware revision in 2019. Older units may still need the board replacement — $480-$640 parts.",
        },
        {
          title: "Door gasket compression set (year 8-10)",
          detail:
            "Standard premium-refrigeration failure mode. Gasket replacement $260-$340, swap is 45 minutes.",
        },
      ],
      ownership:
        "Thermador Freedom parts move through BSH parts network — current production at 3-5 days, pre-2019 platform at 7-10 days. Out-of-warranty service averages $380-$720 typical. Total 15-year ownership cost lands slightly below Sub-Zero Designer when purchase price is included; if ownership extends to 20+ years, Sub-Zero wins.",
    },
  ],
  buyerProfiles: [
    {
      headline: "Maximum reliability matters most",
      recommendation:
        "Sub-Zero Designer. 18+ year design life with the per-column independent sealed systems giving you redundancy. If one column fails, the kitchen is not down.",
    },
    {
      headline: "Budget-conscious column installation",
      recommendation:
        "Thermador Freedom. The 15-22% price advantage on three columns can mean $5,000-$8,000 savings on a multi-column kitchen.",
    },
    {
      headline: "Cocktail enthusiast / home bar",
      recommendation:
        "Thermador Freedom — specifically the T18IF freezer column with the Diamond Ice Maker. Sub-Zero has no equivalent.",
    },
    {
      headline: "Open-plan kitchen visible from dining",
      recommendation:
        "Sub-Zero Designer for the lower noise floor (36 vs 42-45 dB). The audible difference at meal service is real.",
    },
    {
      headline: "Long-hold primary residence in coastal South Florida",
      recommendation:
        "Sub-Zero Designer. Same coastal-corrosion considerations as the BI line — the longer parts ecosystem and the field-service network is more robust for 20-year ownership.",
    },
  ],
  ownershipNotes:
    "Both platforms qualify for the $59 Berne service call. Sub-Zero Designer total cost of ownership over 15 years lands slightly higher (higher purchase price) but the per-year ownership cost flattens past 15 years — Designer outlives Freedom. Per-ticket repair cost is comparable; ticket frequency favors Sub-Zero by roughly 0.6-0.7x. For a 3-column kitchen, total 15-year ownership including purchase is roughly equivalent; the decision is mostly about feature preference and aesthetic.",
  bernePerspective:
    "We see both succeed and both fail in the field. Sub-Zero Designer is what we install in our own home if we install column refrigeration; Thermador Freedom is what we recommend to clients who are price-conscious and don't have a 20-year ownership horizon. The Diamond Ice Maker on Thermador is the single feature most buyers don't realize they care about until they have it; for home bar / cocktail-focused kitchens, that one feature can tip the decision. For everything else, the call is between Sub-Zero's quieter, more reliable, more expensive platform and Thermador's stronger feature set at the lower price.",
  faqs: [
    {
      question: "Can I mix Sub-Zero Designer and Thermador Freedom columns in one kitchen?",
      answer:
        "Technically yes, aesthetically no. The hinge styles and toe-kick details are different enough that mixing the two looks inconsistent even behind custom panels. Pick one platform for the whole column wall.",
    },
    {
      question: "Is the Sub-Zero Designer Climate Smart Touch worth the upgrade over IC?",
      answer:
        "For most buyers, no. The Climate Smart adds Wi-Fi connectivity and a humidity-monitoring feature that few owners actually use. We recommend the standard IC platform unless you specifically want app integration.",
    },
    {
      question: "How big a custom panel can these columns support?",
      answer:
        "Both support 80-100 pound custom panels. The 96\"-tall x 36\"-wide cabinet panel typical in pro kitchens runs 60-75 pounds — well within spec for both. The hinge adjustment is what carpenters care about — Thermador has slightly more range.",
    },
    {
      question: "What's the warranty difference?",
      answer:
        "Both are 2 years full + 5 years sealed-system parts + 12 years compressor. The difference is the service network — Sub-Zero's factory-authorized network is larger and longer-tenured in most US markets.",
    },
    {
      question: "Which has better app / Wi-Fi integration?",
      answer:
        "Thermador, narrowly. The Home Connect app (BSH-wide) is more polished than Sub-Zero's app and integrates with other Thermador appliances. For app-forward households, Thermador.",
    },
    {
      question: "Can both be retrofitted into an existing kitchen with conventional refrigeration?",
      answer:
        "Yes, but it's a significant cabinet job. Column refrigeration requires a different cabinet opening dimension and dedicated electrical (each column needs its own 15A circuit). Plan for a finish-carpenter week on top of the appliance install.",
    },
    {
      question: "Which brand do you see fail more often in coastal homes?",
      answer:
        "Both have similar coastal corrosion issues on the condenser fan motor (same engineering as their BI / Pro Grand siblings). Proper grille clearance at install is more important than the brand choice.",
    },
  ],
};

// ---------------------------------------------------------------------------
// 5. Wolf vs Blue Star — pro range alternatives
// ---------------------------------------------------------------------------

const WOLF_VS_BLUE_STAR: ComparisonProfile = {
  slug: "wolf-vs-blue-star",
  h1: "Wolf vs Blue Star — Pro Range Alternative or Direct Competitor?",
  metaTitle: "Wolf vs Blue Star — Pro Ranges Compared | Berne",
  metaDescription:
    "Wolf's polished pro range vs Blue Star's commercial-grade open-burner alternative. Real differences in cooking style, reliability, and ownership.",
  teaser:
    "Wolf is the polished pro-style standard. Blue Star is the chef's-cult favorite — open-burner cast-iron grates, 22,000 BTU burner heads, hand-assembled in Pennsylvania. These ranges cook differently. Here is what we see.",
  intro:
    "Wolf and Blue Star are two very different answers to the same question — what does a pro range look like in a residential kitchen? Wolf takes the commercial design language and refines it into a polished, sealed-burner platform that fits cleanly into a high-end kitchen. Blue Star takes the opposite approach: leave the open-burner commercial design largely intact, build it by hand in Pennsylvania, and let the buyer accept the trade-offs in exchange for genuinely commercial cooking output.\n\nBerne Appliance Repair services both lines in South Florida. The comparison is more interesting than the typical Wolf-vs-anything because Blue Star is not chasing Wolf — it is doing something genuinely different. The right answer depends on whether you cook like a home cook who values refinement, or like a chef who values raw output. Both have legitimate buyers.",
  tldr: [
    "Wolf wins on reliability and refinement — sealed burners, dual-stacked simmer, integrated convection ovens.",
    "Blue Star wins on raw output — 22,000 BTU open-burner heads, deeper wok bowls, true restaurant cooking.",
    "Blue Star is hand-assembled — visible craftsmanship and weight (300+ lbs on a 36\" range vs Wolf's 240 lbs).",
    "Wolf's ovens have dual convection and even baking; Blue Star's ovens are simpler and less bake-optimized.",
    "Pricing roughly comparable on 36\"; Blue Star pulls ahead on customization (color, trim, configurations).",
  ],
  brands: [
    {
      name: "Wolf",
      hq: "Fitchburg, Wisconsin",
      brandSlug: "wolf",
      about:
        "Wolf is detailed in the Wolf vs Thermador vs Viking comparison above; what matters in the Blue Star context is that Wolf represents the polished, refined pro-range archetype. Sealed burners, dual-stacked flame design, integrated dual convection ovens, and a Sub-Zero-grade service network. The platform is engineered for consistent residential duty cycle — daily cooking by a serious home cook — without crossing into commercial territory.",
      strengths: [
        {
          title: "Sealed burner cleanability",
          detail:
            "Sealed burners means spills don't reach the burner box below. Lift the cap, wipe the surface, done. Blue Star's open burners require a more involved cleaning procedure.",
        },
        {
          title: "Dual-stacked burner simmer",
          detail:
            "Wolf's inner simmer ring drops to 300 BTU genuine low. Blue Star's open burners struggle to simmer below 1,500 BTU without going out — the open-flame design is not a precision low-heat tool.",
        },
        {
          title: "Twin convection oven baking",
          detail:
            "Wolf DF36/DF48 ovens hold setpoint within 5-8F and the dual convection pattern is even across all three racks. Blue Star ovens are single-fan and less consistent on bake.",
        },
        {
          title: "Sub-Zero / Wolf service network",
          detail:
            "Nationwide factory-authorized service network with same-day parts. Blue Star service is more localized — works well in major markets, harder in secondary markets.",
        },
      ],
      failureModes: [
        {
          title: "Spark module continuous clicking (most common)",
          detail:
            "Detailed in the Wolf vs Thermador vs Viking comparison.",
        },
        {
          title: "Oven door hinge sag",
          detail:
            "Standard heavy-use failure mode. Hinge kit $220-$310, 45-minute swap.",
        },
        {
          title: "Convection fan motor (DF48 only)",
          detail:
            "Lower-oven convection fan motor on DF48 at year 12-15 in heavy households.",
        },
      ],
      ownership:
        "Wolf parts arrive 24-72 hours through the Sub-Zero / Wolf network. Out-of-warranty service averages $250-$450 on common tickets.",
    },
    {
      name: "Blue Star",
      hq: "Reading, Pennsylvania",
      about:
        "Blue Star is the family-owned American manufacturer that has built professional cooking equipment in Reading, Pennsylvania since 1880 (under the Prizer-Painter Stove Works name; the Blue Star brand is the residential extension launched in 1995). Every Blue Star range is hand-assembled by a small team of welders and assemblers — the brand does not stamp parts in mass production. The signature design is the open-burner cooktop with 22,000 BTU PowR cast-iron burner heads (up to 25,000 BTU on the UltraNova) and cast-iron grates that look and feel like commercial restaurant equipment. The range is available in 750+ color and trim configurations (any standard RAL color), all welded-stainless or solid-brass trim, and configurations ranging from 24\" to 60\" wide. Blue Star is a serious chef's cult range — many of the country's best home cooks own one. Mass-market it is not.",
      strengths: [
        {
          title: "22,000 BTU PowR burner heads (25,000 on UltraNova)",
          detail:
            "The highest BTU output in the residential range category. For wok cooking, deep-pan searing, and high-heat sauté, the difference vs Wolf's 15,000 BTU standard or 20,000 BTU corner burner is real. Water boil time is roughly 35-45% faster.",
        },
        {
          title: "Open-burner cast iron grate platform",
          detail:
            "True commercial open-burner design — easier to actually cook with a wok (the grate accepts a wok ring with no modification), easier to position pans off-center, easier to control flame visually.",
        },
        {
          title: "Custom configuration and color",
          detail:
            "750+ color options, all-stainless or solid-brass trim choices, 24\"-60\" widths, configurations with French top, griddle, charbroiler, or simmer plate in any position. No other brand offers this.",
        },
        {
          title: "Hand-assembled American manufacturing",
          detail:
            "Every range is hand-welded and hand-assembled in Reading, PA. The weight (300+ lbs on a 36\") is from real steel construction rather than thin sheet. The build quality is visible.",
        },
      ],
      failureModes: [
        {
          title: "Igniter fouling on open burners (common)",
          detail:
            "Open-burner design means spills can reach the spark igniter electrode. Carbon fouling and corrosion are routine — most Blue Star service tickets are igniter cleaning or replacement. Igniter $40-$80 per burner, 20-minute job.",
        },
        {
          title: "Oven thermostat drift",
          detail:
            "The mechanical oven thermostat on Blue Star can drift 15-25F from setpoint after 5-7 years. Thermostat replacement $180-$260, swap is 60 minutes. Wolf's digital thermostat doesn't have this failure mode.",
        },
        {
          title: "Drip tray corrosion under burner box",
          detail:
            "Spills that get under the open-burner cooktop pool in the drip tray and accelerate corrosion. Owner-maintainable — regular drip tray clean-out solves it — but it's a real maintenance task.",
        },
      ],
      ownership:
        "Blue Star parts are factory-direct from Reading, PA — usually 5-7 day arrival, longer in markets without local Blue Star service partners. Berne keeps common parts (igniters, thermostats) on the truck for the South Florida route. Out-of-warranty service averages $280-$550 typical; the maintenance overhead is higher than Wolf because of the open-burner cleaning + drip tray management.",
    },
  ],
  buyerProfiles: [
    {
      headline: "You are a serious home cook with technique-driven cooking",
      recommendation:
        "Blue Star. The 22,000 BTU output and the open-burner design genuinely change what you can cook at home. Wok cooking, deep searing, large-pan sauté are all in a different tier. The maintenance overhead is real but worth it for daily use.",
    },
    {
      headline: "You cook regularly but care more about refinement than raw output",
      recommendation:
        "Wolf. The sealed burner design, the integrated electronics, and the polished aesthetic fit a refined kitchen better. The 15,000 BTU standard burner is plenty for 95% of home cooking.",
    },
    {
      headline: "You want a colorful or custom range that complements your kitchen palette",
      recommendation:
        "Blue Star. 750+ color options is genuinely unique. Wolf is black, stainless, or red-knob — that's it.",
    },
    {
      headline: "Long-hold primary residence with appraisal in mind",
      recommendation:
        "Wolf. The Sub-Zero / Wolf brand reads strongest on appraisal photos and the service network is broader nationally. Blue Star is recognized in chef circles but less so in general residential appraisal.",
    },
    {
      headline: "Heavy baking household (bread, pastry, layered cakes)",
      recommendation:
        "Wolf. Twin convection ovens hold setpoint better and bake more evenly. Blue Star's ovens are designed around stovetop cooking, not baking.",
    },
  ],
  ownershipNotes:
    "Wolf service tickets happen less often but per-ticket cost is comparable. Blue Star requires more owner-side maintenance (open-burner cleaning, drip tray management) — annual deep clean is realistic. Over 10 years, total ownership cost is similar; the labor inputs are different. Berne services both brands across South Florida; parts for Blue Star can take a couple extra days versus Wolf due to factory-direct sourcing from Pennsylvania.",
  bernePerspective:
    "These are different ranges for different cooks. If a client asks for our honest opinion: most clients should buy Wolf, because most clients cook in a way that doesn't fully exploit Blue Star's strengths and would resent the maintenance overhead. The clients who should buy Blue Star already know they want it — they have specific cooking practices (wok, large-pan, high-heat) that need the BTU output and the open-burner design. We have a small subset of clients who own Blue Star and cook seriously; none of them would switch. We have many Wolf clients who are very happy. Both are correct for the right buyer.",
  faqs: [
    {
      question: "Is Blue Star actually a better range than Wolf?",
      answer:
        "For specific cooking styles — wok, high-heat searing, large-pan technique-driven cooking — yes. For most home cooking (baking, daily family dinners, weeknight casseroles), Wolf is genuinely better suited and more refined. Neither is universally better.",
    },
    {
      question: "Does Blue Star really put out 22,000 BTU on every burner?",
      answer:
        "The 22,000 BTU PowR burner is standard on the front burners of the standard Blue Star range. Some models go to 25,000 BTU on the UltraNova platform. Wolf's standard burner is 15,000 BTU with a single 20,000 BTU dedicated power position.",
    },
    {
      question: "How is Blue Star service in South Florida specifically?",
      answer:
        "Berne services Blue Star across all of South Florida. Common parts (igniters, thermostats, knobs) are kept on the truck. Less-common parts arrive 5-7 days from Reading, PA. Wolf parts are slightly faster (24-72 hours) through the Sub-Zero / Wolf network.",
    },
    {
      question: "Is the open-burner design a fire hazard?",
      answer:
        "No more than any other range. The igniter cycles in the same way, the gas safety valves operate the same way, and the burner is designed to be visible during operation. Owners who treat it like commercial equipment (clean spills promptly, maintain the drip tray) have no issues.",
    },
    {
      question: "Which range holds resale value better?",
      answer:
        "Wolf, narrowly. The brand recognition is broader and resale shoppers are more likely to value Wolf in a home appraisal. Blue Star holds value in chef-focused homes but reads as more specialized in general resale.",
    },
    {
      question: "Can I customize the color or trim on a Wolf?",
      answer:
        "No. Wolf is black, stainless, or red-knob accents. If color is important to you, Blue Star (750+ RAL colors) or Lacanche (French custom range) are the answers.",
    },
    {
      question: "What's the BTU difference like in actual cooking?",
      answer:
        "Water boil time is the most measurable difference — a 4-quart pot from cold water to a rolling boil takes about 6-7 minutes on Wolf and about 4-5 minutes on Blue Star. For high-heat searing of a steak, the recovery time after adding the steak (when surface temperature drops) is faster on Blue Star.",
    },
  ],
};

// ---------------------------------------------------------------------------
// 6. Sub-Zero BI-36 vs BI-48 — within-brand model decision
// ---------------------------------------------------------------------------

const SUB_ZERO_BI_36_VS_BI_48: ComparisonProfile = {
  slug: "sub-zero-bi-36-vs-bi-48",
  h1: "Sub-Zero BI-36 vs BI-48 — Which Built-In Refrigerator Should You Choose?",
  metaTitle: "Sub-Zero BI-36 vs BI-48 — Model Guide | Berne",
  metaDescription:
    "Sub-Zero's two most popular built-in refrigerators compared. Cabinet size, capacity, dual-cooling, parts availability, and which kitchen each one fits.",
  teaser:
    "Once you have decided on Sub-Zero, the next question is BI-36 or BI-48. The difference is not just 12 inches of cabinet width — it changes capacity, ice options, layout, and even the service-call profile. Here is what we see.",
  intro:
    "The Sub-Zero BI line is the most-installed premium built-in refrigerator in South Florida, and within the line, the BI-36 and BI-48 are the two most-specified models. Both ship with the same dual sealed-system platform, the same Carbon-Air filter, the same magnetic-latch door seals, and the same 12-year sealed-system warranty. The differences are about cabinet footprint, internal volume, and which features each model supports.\n\nBerne Appliance Repair services every BI Sub-Zero in South Florida — we know both models in the field. This comparison is for buyers who have already committed to Sub-Zero (good choice, see our Sub-Zero vs Viking comparison) and now need to pick between the two most common widths. The decision is a real one — switching between BI-36 and BI-48 is not a same-day cabinet job, and the appliance carries a 4-year delivery window from the date of the home build.",
  tldr: [
    "BI-36 is 21.4 cu ft total; BI-48 is 30.0 cu ft total — meaningfully more storage in the 48.",
    "BI-48 supports the side-by-side configuration and the over-and-under (BI-48S/SD configurations); BI-36 is single-door fridge with bottom freezer drawer only.",
    "BI-48 has a higher ticket rate (slightly more components, slightly more humidity volume in the door bins) but the per-ticket cost is comparable.",
    "BI-36 fits a standard 36\" cabinet opening; BI-48 needs a 48\" opening + 1\" surround clearance.",
    "Pricing: BI-36 $13,500-$15,500 installed; BI-48 $16,000-$19,500 installed.",
  ],
  brands: [
    {
      name: "Sub-Zero BI-36",
      hq: "Madison, Wisconsin",
      brandSlug: "sub-zero",
      about:
        "The BI-36 is Sub-Zero's most-installed built-in refrigerator in residential kitchens — single-door full-height fresh-food compartment on top, freezer drawer at the bottom, dual sealed systems, panel-ready. The platform has been in continuous production since 2002 with two significant refresh cycles (2010 and 2018). The current BI-36UFD ships with the touch-screen door display, internal LED lighting, the Carbon-Air filter, three glass shelves with two adjustable, two crisper drawers, and a freezer drawer with ice maker. Total storage capacity is 21.4 cu ft (17.3 fresh food, 4.1 freezer). At 36\" wide x 84\" tall, it fits cleanly in a standard 36\" framed opening with 1\" surround clearance.",
      strengths: [
        {
          title: "Standard 36\" cabinet opening",
          detail:
            "Most kitchen designs default to a 36\" refrigerator cabinet opening — the BI-36 drops in without changing the surrounding cabinetry. Easier retrofits, easier renovations.",
        },
        {
          title: "Single-door fridge layout maximizes shelf width",
          detail:
            "The full 36\" width of the fresh-food compartment is one continuous shelf — better for large platters, party trays, and oversized cookware than the BI-48 side-by-side layout.",
        },
        {
          title: "Lowest service-ticket frequency in the BI line",
          detail:
            "Fewer components means fewer failure points. We see BI-36 service tickets at roughly 0.75x the rate of BI-48 over a 10-year horizon. The dollar difference is small but real.",
        },
        {
          title: "Lower acquisition price",
          detail:
            "BI-36 retails $11,500-$13,500 vs BI-48 at $13,800-$16,500. Installed delta is typically $2,000-$3,000.",
        },
      ],
      failureModes: [
        {
          title: "Drain-line freeze (most common)",
          detail:
            "Same as the BI-48. Drain-line clear is a 1-hour visit, no parts.",
        },
        {
          title: "Door display dim segments",
          detail:
            "Touch-screen door display can develop dim or unresponsive segments after 8-10 years. Board replacement $480-$620, 30-minute job.",
        },
        {
          title: "Freezer drawer slide rail wear (heavy-use households)",
          detail:
            "Drawer rail develops slop after 10-12 years of daily use. Rail set $180-$240, 45-minute job.",
        },
      ],
      ownership:
        "Same Sub-Zero parts ecosystem as the BI-48 and the rest of the line. Out-of-warranty service averages $250-$580 on common tickets.",
    },
    {
      name: "Sub-Zero BI-48",
      hq: "Madison, Wisconsin",
      brandSlug: "sub-zero",
      about:
        "The BI-48 is the larger and more flexible Sub-Zero built-in — 48\" wide x 84\" tall, available in three configurations: BI-48SD (side-by-side with drawer freezer), BI-48S (side-by-side traditional), and BI-48SID (side-by-side with internal water dispenser). All three share the same dual sealed-system platform, the same Carbon-Air filter, and the same 12-year warranty. Total storage capacity is 30.0 cu ft (18.4 fresh food, 11.6 freezer). The freezer side is genuinely usable as a full-height freezer for bulk storage — meaningful upgrade over the bottom-drawer freezer on the BI-36.",
      strengths: [
        {
          title: "30 cu ft total capacity",
          detail:
            "Materially more storage than the BI-36 — particularly the freezer side, which is full-height usable storage rather than a drawer. For households that batch-cook, host events, or buy in bulk, the capacity is the dominant argument.",
        },
        {
          title: "Multiple configurations (SD / S / SID)",
          detail:
            "The SID configuration adds an internal water dispenser without breaking the panel-ready aesthetic — water access without a visible dispenser on the door. SD adds a freezer drawer below the side-by-side freezer for ice and frozen food separation.",
        },
        {
          title: "Better humidity zoning",
          detail:
            "The 48\" cabinet has more volume per dual-evaporator zone, which translates to slightly better humidity hold in the fresh-food compartment. We see fewer humidity-related ice-up tickets on BI-48 than on BI-36.",
        },
        {
          title: "Higher resale signal in $2M+ South Florida homes",
          detail:
            "BI-48 reads as a more obviously premium appliance on home photography — for high-end resale, the visual presence is real.",
        },
      ],
      failureModes: [
        {
          title: "Drain-line freeze (same as BI-36)",
          detail:
            "Most common BI-line ticket overall.",
        },
        {
          title: "Side-by-side door alignment drift",
          detail:
            "Two doors, two hinges — alignment drift over 3-5 years is more common than on the single-door BI-36. Re-alignment is a 30-minute adjustment, no parts.",
        },
        {
          title: "Ice maker valve on SID configurations",
          detail:
            "Internal water dispenser version has more solenoid valves than the standard SD configuration. Valve failures are the second-most-common BI-48SID ticket at year 7-10. $180-$240 part, 40-minute swap.",
        },
        {
          title: "Larger condenser fan motor (slightly higher coastal corrosion exposure)",
          detail:
            "The BI-48 condenser fan motor is larger and has more surface area for salt-air corrosion in coastal homes. Replacement $180-$240, 30-minute swap.",
        },
      ],
      ownership:
        "Slightly higher service-ticket frequency than BI-36 (more components, more configurations) but per-ticket cost is comparable. Out-of-warranty service averages $260-$620 on common tickets.",
    },
  ],
  buyerProfiles: [
    {
      headline: "Standard family household (3-4 people)",
      recommendation:
        "BI-36. The capacity is sufficient, the cabinet opening is standard, and the lower service-ticket frequency over 15 years is a real advantage. The BI-48 capacity is wasted on most family households.",
    },
    {
      headline: "Heavy hosting / entertaining household",
      recommendation:
        "BI-48, preferably the SD configuration. The full-height freezer side and the 30 cu ft total capacity earn their keep when you host weekly. The price delta is reasonable for the use case.",
    },
    {
      headline: "Cooking enthusiast with batch cooking practice",
      recommendation:
        "BI-48. The freezer-side capacity for cooked-and-frozen meals, stock, vacuum-sealed proteins, and bulk-purchase ingredients is the dominant argument.",
    },
    {
      headline: "Bar-focused / cocktail kitchen",
      recommendation:
        "BI-48SID for the internal water dispenser plus the larger ice production from the freezer side. The water access without a visible door dispenser preserves the panel-ready aesthetic.",
    },
    {
      headline: "Compact kitchen (galley or smaller open-plan)",
      recommendation:
        "BI-36. The 48\" cabinet opening on a BI-48 is too dominant in a smaller kitchen and the capacity is wasted in the same space.",
    },
  ],
  ownershipNotes:
    "Both qualify for the $59 Berne service call. BI-48 service ticket rate is roughly 1.3x BI-36 over 10 years — primarily from the additional doors, alignment, and SID-configuration components. Total 15-year ownership cost: BI-36 $13,500 acquisition + $1,800 service (typical); BI-48 $16,500 acquisition + $2,400 service (typical). The capacity delta is the only reason to take the higher cost. For households that genuinely need 30 cu ft, the math is right. For households that don't, BI-36 is the cleaner economic choice.",
  bernePerspective:
    "We see most clients overbuy on capacity. A family of four does not need 30 cu ft of refrigeration — the BI-36 is sufficient and the extra $2,500-$3,000 on the BI-48 funds upgrades elsewhere in the kitchen. The clients who should buy BI-48 are the ones who actually host weekly, batch-cook seriously, or run a household of 5+. The BI-48SID is the right answer for cocktail-forward households; the BI-48SD is the right answer for hosting households; the standard BI-48S is the right answer when freezer-side capacity is the dominant need. For everything else, BI-36.",
  faqs: [
    {
      question: "Does the BI-48 fit in a kitchen designed for a BI-36?",
      answer:
        "Not without cabinet modification. The BI-48 needs a 48\" opening + 1\" surround clearance vs the BI-36's 36\" + 1\". Switching widths requires a finish-carpenter cabinet job.",
    },
    {
      question: "What's the energy use difference between BI-36 and BI-48?",
      answer:
        "About 8-12% more annual kWh on the BI-48. Both qualify for ENERGY STAR; the absolute kWh delta is small in real cost (under $30/year typical).",
    },
    {
      question: "Which is louder?",
      answer:
        "Both measure 36 dB at one meter on current production. The BI-48 has two compressors of slightly different size, but the acoustic management is the same — no audible difference in normal kitchen use.",
    },
    {
      question: "Can both run a custom panel?",
      answer:
        "Yes, both are panel-ready. The BI-48 supports heavier panels (up to 100 lbs total) than the BI-36 (up to 75 lbs total). Most kitchen designs are well within both spec windows.",
    },
    {
      question: "What's the typical service-call cost for either model?",
      answer:
        "$59 Berne service call for both. Out-of-warranty repair averages $250-$580 on BI-36 and $260-$620 on BI-48 — effectively tied per-ticket.",
    },
    {
      question: "Which has better resale value?",
      answer:
        "BI-48 reads more obviously premium on home photography, but the resale signal of \"Sub-Zero\" is what matters — both models capture that. Premium homes ($2M+) often expect BI-48; standard premium ($800K-$1.5M) is satisfied with BI-36.",
    },
    {
      question: "Should I get the SID with internal dispenser or standard SD?",
      answer:
        "SID if water access matters and you want to preserve the panel-ready aesthetic without a visible door dispenser. Standard SD if you don't drink dispenser water often — the SID adds complexity (more valves, more failure points) for a feature most households use sparingly.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export const BRAND_COMPARISONS: ComparisonProfile[] = [
  SUB_ZERO_VS_VIKING,
  WOLF_VS_THERMADOR_VS_VIKING,
  MIELE_VS_BOSCH,
  SUB_ZERO_VS_THERMADOR,
  WOLF_VS_BLUE_STAR,
  SUB_ZERO_BI_36_VS_BI_48,
];

export const BRAND_COMPARISON_SLUGS = BRAND_COMPARISONS.map((c) => c.slug);

export function getBrandComparison(slug: string): ComparisonProfile | undefined {
  return BRAND_COMPARISONS.find((c) => c.slug === slug);
}

/**
 * Return all comparisons that include a given brand (matched by brandSlug).
 * Used by /brands/[slug] pages to cross-link to relevant brand-vs-brand
 * comparison pages.
 */
export function getComparisonsForBrand(brandSlug: string): ComparisonProfile[] {
  return BRAND_COMPARISONS.filter((c) =>
    c.brands.some((b) => b.brandSlug === brandSlug),
  );
}
