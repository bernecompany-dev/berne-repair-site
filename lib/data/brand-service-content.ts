/**
 * Brand × service landing pages — the premium brand-service layer.
 *
 * 3 hand-written pages targeting the highest-volume / lowest-KD brand-service
 * queries the 2026-06-10 content audit surfaced:
 *   - /brands/sub-zero/ice-maker-repair  ("sub zero ice maker repair", 2.9K/KD9)
 *   - /brands/miele/washer-repair        ("miele washing machine repair", 2.4K/KD0)
 *   - /brands/wolf/range-repair          ("wolf range repair", 880/KD5)
 *
 * They ride the same /brands/[slug]/[city] route machinery as the brand×city
 * pages (the second segment dispatches to this registry first), so
 * dynamicParams=false keeps every other brand/service pair a 404. EN-only:
 * hreflang en+x-default, matching the brand×city pattern.
 *
 * Facts stay canonical: $59 service call (credited), 18 techs, 29,000+
 * repairs, 4.79/871, 90-day warranty, Miami-Dade + Broward + Palm Beach.
 * Berne is an INDEPENDENT service company — no "authorized/factory" claims.
 */

export type BrandServiceFaq = { question: string; answer: string };

export type BrandServiceFailureMode = { title: string; detail: string };

export type BrandServiceCostRow = {
  /** Repair job label */
  job: string;
  /** Typical parts+labor range, e.g. "$200–$350" */
  range: string;
  /** One-line context note */
  note: string;
};

export type BrandServiceContent = {
  /** residential-brand-profiles slug */
  brand: string;
  /** second URL segment, e.g. "ice-maker-repair" */
  service: string;
  /** Display label for the service, e.g. "Ice Maker Repair" */
  serviceLabel: string;
  /** SERP title — rendered absolute (no layout suffix), target ≤60 chars */
  metaTitle: string;
  metaDescription: string;
  /** H1 second line (first line is "{Brand} {h1Lead}") */
  h1Lead: string;
  h1Accent: string;
  heroIntro: string;
  /** 2 deep-dive sections of hand-written copy */
  sections: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  }[];
  /** Service-specific failure modes (own bank — not the brand profile's) */
  failureModes: BrandServiceFailureMode[];
  /** Typical repair cost table */
  costRows: BrandServiceCostRow[];
  costNote: string;
  /** Existing /services hub this page belongs under */
  serviceHubSlug: string;
  serviceHubLabel: string;
  faqs: BrandServiceFaq[];
};

const subZeroIceMaker: BrandServiceContent = {
  brand: "sub-zero",
  service: "ice-maker-repair",
  serviceLabel: "Ice Maker Repair",
  metaTitle: "Sub-Zero Ice Maker Repair Miami–South FL · $59 · Berne",
  metaDescription:
    "Sub-Zero ice maker repair — UC-15 undercounter units and built-in modules in BI, Classic & PRO. Same-day South Florida service, $59 call, 90-day warranty.",
  h1Lead: "ice maker repair",
  h1Accent: "across South Florida.",
  heroIntro:
    "UC-15 undercounter machines, the ice maker modules inside BI and Classic built-ins, PRO-series systems — Sub-Zero ice is its own discipline, and it's one our senior refrigeration techs work every week. $59 diagnostic applied toward the repair, same-day dispatch across Miami-Dade, Broward, and Palm Beach.",
  sections: [
    {
      eyebrow: "The platform",
      heading: "Two different machines: built-in modules vs the UC-15",
      paragraphs: [
        "Sub-Zero ice problems come in two distinct flavors, and the first job of a correct diagnosis is knowing which machine you actually own. Most Sub-Zero owners have an ice maker module — the assembly living inside the freezer compartment of a BI, Classic 600-series, PRO, or Designer unit. It's a compact system: a fill valve at the back wall, a mold with ejector fingers, a module motor, and a bin with level sensing. When it fails, the refrigerator keeps working perfectly; you just stop getting ice. The second machine is the UC-15 — Sub-Zero's dedicated 15-inch undercounter ice machine, a fundamentally different appliance with its own refrigeration system, water pump, and drain requirements (gravity or pump-model, which matters enormously for diagnosis).",
        "The distinction drives everything downstream. A BI-36 that stopped making ice usually needs module-level work — ejector fingers stalled, a fill valve that no longer seats, a cracked harness clip, or a control board that stopped powering the circuit. The OEM module matters here: the universal replacements don't communicate properly with Sub-Zero's control board, which is why we install the genuine assembly and the harness hardware that ships with it. A UC-15 producing thin, cloudy, or no ice is a different conversation: scale on the evaporator plate, a tired circulation pump, a fouled condenser, or — in South Florida garages — an ambient-heat problem the machine was never specced to fight.",
        "Water is the through-line in both stories. South Florida's hard water scales fill valves, clouds cubes, and chokes the UC-15's water path on an accelerated schedule, and a clogged or aging filter (the 4204490 on most built-ins) is behind a surprising share of 'broken ice maker' calls. We test water pressure and flow before condemning hardware — a $40 filter fixing a 'failed' ice maker is a weekly event on our schedule.",
      ],
    },
    {
      eyebrow: "How we work it",
      heading: "Diagnosis by measurement, repair from truck stock",
      paragraphs: [
        "An ice maker visit runs like every Berne diagnostic: measurements before conclusions. On built-in modules we verify fill-valve actuation and volume, watch a harvest cycle, test the module motor and ejector travel, and check bin sensing — in that order, because the failure distribution follows that order. On UC-15s we read production rate against spec, inspect the evaporator plate for scale, test the pump, and check condenser airflow and ambient conditions. The $59 service call covers the full diagnosis and applies toward the repair.",
        "Parts logistics favor speed: ice maker modules for the common BI and Classic generations, fill valves, 4204490 filters, and harness clips ride on the senior-rotation trucks, so most built-in module repairs close in a single visit. UC-15 components and less-common legacy parts come through Sub-Zero's distributor, typically 2-3 business days. Everything we install carries the 90-day parts and labor warranty, and the work is logged against your unit's service history — so the next tech who visits knows exactly what's been done.",
      ],
    },
  ],
  failureModes: [
    {
      title: "Module ejector fingers stalled mid-harvest (BI, Classic, 685/632)",
      detail:
        "The classic 8-10-year failure: fingers freeze mid-rotation, the mold stays full, ice production stops cold. Sometimes a one-time jam from a fused cube pair; usually a worn module motor or stripped cam. We replace with the Sub-Zero OEM module — the universal aftermarket units don't talk to the control board correctly — plus the harness clip that nearly always cracks on removal.",
    },
    {
      title: "Fill valve not seating — overfilled mold, frozen sheet in the bin",
      detail:
        "A weeping fill valve overfills the mold; the spill freezes into a sheet at the bin bottom and the harvest mechanism jams against it. Owners report 'one giant block instead of cubes.' Valve replacement plus a manual clear and a flow test, and we check inlet pressure since high house pressure accelerates the next failure.",
    },
    {
      title: "No fill at all — valve, filter, or supply path",
      detail:
        "A dry mold means the water never arrived: a dead fill valve coil, a clogged 4204490 filter, a kinked or scaled supply line, or the saddle valve at the wall barely cracked open. We trace the path end-to-end in one pass — and replace the cheap part when the cheap part is the answer.",
    },
    {
      title: "UC-15 making thin, cloudy, or incomplete ice",
      detail:
        "On the undercounter machine, degraded ice almost always means scale on the evaporator plate or a circulation pump losing flow. South Florida water makes this a maintenance rhythm, not a one-time event. We descale the system, service the pump, and set you up with a realistic cleaning interval — garage installs need it twice as often.",
    },
    {
      title: "UC-15 low production in hot installs",
      detail:
        "A UC-15 in a 95°F garage or pool cabana fights head pressure the spec sheet never promised to handle. Production drops in summer exactly when demand peaks. A condenser cleaning recovers real capacity; beyond that, we'll tell you honestly what the install location costs you and whether relocation or supplemental ventilation makes sense.",
    },
    {
      title: "Bin level sensing failures — ice maker stops early or overfills",
      detail:
        "Built-in modules sense bin level mechanically or electronically depending on generation; a stuck arm or failed sensor either halts production with a half-empty bin or overfills until cubes jam the chute. Quick diagnosis, inexpensive fix, and frequently misdiagnosed as a dead module by shops that don't know the platform.",
    },
    {
      title: "Ice tastes or smells off",
      detail:
        "Taste complaints trace to an expired filter, a biofilm-coated bin, or — on UC-15s — a water path overdue for sanitizing. We replace the filter, sanitize the path and bin, and check that the freezer compartment isn't transferring odors. If your ice has been off for months, the fix is cheaper than you think.",
    },
    {
      title: "Control board not powering the ice circuit",
      detail:
        "When fill, module, and sensing all test healthy but nothing runs, the control board's ice-circuit relay is the remaining suspect — a known aging pattern on the 715549-generation boards. We confirm by measurement before quoting a board, because boards are the expensive answer and deserve the burden of proof.",
    },
  ],
  costRows: [
    { job: "Diagnostic visit", range: "$59", note: "Applied toward the repair" },
    { job: "Water filter replacement + flow test", range: "$80–$140", note: "Filter included; 15 minutes" },
    { job: "Fill valve replacement", range: "$180–$320", note: "Most common single fix" },
    { job: "OEM ice maker module (BI / Classic)", range: "$350–$600", note: "Genuine Sub-Zero assembly + harness" },
    { job: "UC-15 descale + water-path service", range: "$200–$350", note: "Restores production & clarity" },
    { job: "UC-15 pump replacement", range: "$300–$500", note: "Includes descale of the path" },
    { job: "Control board (ice circuit failure)", range: "$450–$700", note: "Only after measured confirmation" },
  ],
  costNote:
    "Ranges reflect typical South Florida jobs, parts plus labor, before any access complications. You get an exact written quote after the $59 diagnostic — which is credited toward whichever repair you approve. 90-day parts and labor warranty on all of it.",
  serviceHubSlug: "ice-maker-repair",
  serviceHubLabel: "Ice Maker Repair",
  faqs: [
    {
      question: "My Sub-Zero stopped making ice but the fridge works fine. What's likely wrong?",
      answer:
        "That's the normal failure pattern — the ice maker module is its own subsystem, so the refrigerator keeps running when it dies. The usual suspects, in order: a stalled module (ejector fingers / motor), a failed or weeping fill valve, a clogged filter starving the fill, or bin sensing stuck in the 'full' state. Each one is testable, and the diagnosis happens on the first visit.",
    },
    {
      question: "Should I replace the ice maker module myself with an aftermarket unit?",
      answer:
        "We'd advise against the aftermarket route on Sub-Zero specifically. The universal modules don't communicate correctly with Sub-Zero's control board — they'll often run a few cycles and then misbehave in ways that look like a board failure. The OEM assembly costs more but works with the unit's control logic and is the only version we'll warranty.",
    },
    {
      question: "How much does Sub-Zero ice maker repair cost?",
      answer:
        "Most jobs land between $180 and $600 depending on the failure: fill valves in the $180-$320 range, OEM module replacements $350-$600, UC-15 descale and pump work $200-$500. The $59 diagnostic is applied toward the repair, you approve a written quote before any part goes in, and everything carries our 90-day warranty.",
    },
    {
      question: "Do you service the UC-15 undercounter ice machine?",
      answer:
        "Yes — both the gravity-drain and pump models, which fail differently and are diagnosed differently. Scale management is the heart of UC-15 ownership in South Florida; we descale, service pumps and valves, clean condensers, and will give you an honest read on garage and outdoor-kitchen installs that run hot.",
    },
    {
      question: "Why is my Sub-Zero ice cloudy or shrinking?",
      answer:
        "Cloudy or thin ice is a water story: an expired filter, scale in the fill path, or on UC-15s a scaled evaporator plate that can't freeze clear layers. Occasionally it's a freezer running slightly warm, which we check while we're there. It's almost never a reason to replace hardware beyond the filter and a descale.",
    },
    {
      question: "Can you come today? The bin's empty and we're hosting this weekend.",
      answer:
        "Call before noon and same-day is usually achievable — ice maker calls route to the senior refrigeration techs already crossing Miami-Dade, Broward, and Palm Beach daily. Module and valve repairs typically close in one visit from truck stock, so 'fixed before the party' is a realistic outcome, not a slogan.",
    },
  ],
};

const mieleWasher: BrandServiceContent = {
  brand: "miele",
  service: "washer-repair",
  serviceLabel: "Washer Repair",
  metaTitle: "Miele Washer Repair Miami & South Florida · $59 · Berne",
  metaDescription:
    "Miele washing machine repair — W1 compacts and legacy models. F11, F20, F50 fault codes, TwinDos, drain pumps, door locks. $59 call, 90-day warranty.",
  h1Lead: "washing machine repair",
  h1Accent: "across South Florida.",
  heroIntro:
    "W1 compacts, the legacy W30xx generation, TwinDos systems, honeycomb drums — Miele laundry is engineered for twenty years, and it deserves service that reads the F-codes instead of guessing. $59 diagnostic credited toward the repair, same-day dispatch across Miami-Dade, Broward, and Palm Beach.",
  sections: [
    {
      eyebrow: "The platform",
      heading: "Engineered for 20 years — and worth every repair along the way",
      paragraphs: [
        "Miele designs its washing machines to a 20-year service life, and the engineering follows through: the honeycomb drum that's gentler on fabric and famously hard to wear out, sealed bearing assemblies that outlast three ordinary washers, and the Waterproof System (WPS) that physically stops a leak before it reaches your floor. South Florida's installed base is dominated by the W1 compact generation — WWB, WWH, and WXD models stacked with their matching T1 heat-pump dryers in condo laundry closets from Brickell to Boca — plus a long tail of older W30xx and W1xxx units still running in houses that bought them fifteen years ago.",
        "What makes Miele rational to service is the diagnostic culture built into the machine. The platform reports faults as F-codes that mean specific things: F11 is a drainage fault, F20 is heating, F50 is the drive electronics, F53 the speed sensor, and the F1xx family belongs to the Waterproof System deciding something got wet that shouldn't be. A tech who knows the code map walks in with the failure space already narrowed; a tech who doesn't starts replacing parts in alphabetical order. We're the first kind. We also know the platform's South Florida habits — drain pumps eating condo-closet lint, TwinDos dispensers clogging on detergent that sat through a summer vacation, and the WPS tripping on humidity-condensation events that look like leaks but aren't.",
        "One practical note: many W1 compacts run on standard 120V outlets while others (and the older full-size units) want 240V — and a surprising number of 'dead washer' calls after a renovation trace to the electrical work, not the machine. It's the kind of thing we check in the first ten minutes rather than the last.",
      ],
    },
    {
      eyebrow: "How we work it",
      heading: "F-codes first, then measurements, then a written quote",
      paragraphs: [
        "Every Miele visit starts with the fault memory — the machine has usually already told the story before we open anything. Then measurements: drain path and pump impeller for F11s, heater resistance and relay for F20s, motor windings and tach signal for the F50/F53 family, and the WPS float and hose integrity when the water-protection codes appear. The $59 service call covers the full diagnosis and is credited toward the repair you approve.",
        "We stock the high-frequency W1 parts — drain pumps, door locks, inlet valves — on the trucks, so the most common repairs close in one visit. The deeper Miele catalog flows through the brand's US parts network in typically 2-4 business days, and on legacy W30xx units we'll tell you honestly which parts are still obtainable before you commit to a repair path. Every installed part carries the 90-day parts and labor warranty, and a Miele repaired properly goes back to being the most durable machine in the building.",
      ],
    },
  ],
  failureModes: [
    {
      title: "F11 — drainage fault, the platform's most common code",
      detail:
        "F11 means the machine couldn't pump out within its time window. Nine times out of ten the drain pump impeller is jammed with lint, a coin, or a bra wire; the tenth time the pump motor itself is done. Condo laundry closets with long drain runs make this South Florida's #1 Miele call. We clear or replace the pump and flush the full drain path so the code doesn't return next month.",
    },
    {
      title: "F20 — heating fault on wash cycles",
      detail:
        "Miele heats its own water, and F20 means the heater circuit didn't deliver: a scaled or failed heating element, a heater relay on the power board, or the temperature sensor lying about the result. Hard South Florida water accelerates element scaling. Element and sensor test in minutes with a meter — this is a measured diagnosis, never a guess.",
    },
    {
      title: "F50 / F53 — drive electronics and speed sensor faults",
      detail:
        "The F50 family points at the motor drive: F50 is the electronics unit, F53 the tachometer losing track of drum speed. Symptoms range from a drum that won't turn to violent spin aborts. We test motor windings and the tach signal before any board is ordered, because half of 'electronics' faults are actually a failing motor component telling on itself.",
    },
    {
      title: "Waterproof System tripped — F1xx codes, machine locked out",
      detail:
        "The WPS float in the base pan stops everything when it senses water. Real causes: a weeping inlet hose, a perished door boot fold, a TwinDos line leak — or condensation in a humid garage install that was never a leak at all. We find the actual water source, dry and reset the system, and fix the cause. A tripped WPS is the machine working correctly, not failing.",
    },
    {
      title: "TwinDos dispenser clogged or not dosing",
      detail:
        "The TwinDos automatic dosing system clogs when detergent sits unused — the classic post-vacation complaint — or when third-party refills gum the lines. We service and flush the dosing path and reset the system. If you're refilling with non-Miele detergent, we'll show you the maintenance rhythm that keeps it happy anyway.",
    },
    {
      title: "Door lock failures — won't lock, won't release",
      detail:
        "The door lock is a 10-15-year wear item: a machine that won't start (no lock confirmation) or holds the door hostage after a cycle. On W1 units the lock assembly is a stocked truck part and a same-visit fix. We also check the latch alignment, because a settling stacked install can mimic a lock failure.",
    },
    {
      title: "Drum bearing wear on high-mileage legacy units",
      detail:
        "Rare by industry standards — Miele's sealed bearing design outlasts everyone else's — but fifteen-year-old W30xx units with daily-family mileage do eventually develop the jet-engine spin sound. We'll give you the honest economics: on some models the bearing job is worth it against a $2,500+ replacement; on others we'll tell you to enjoy the machine until it retires.",
    },
    {
      title: "Inlet valve and slow-fill faults",
      detail:
        "A W1 filling slowly or throwing intermittent water-intake faults usually has a scaled inlet valve screen or a tired valve coil — accelerated, as always, by South Florida water. Screen cleaning or valve replacement is quick work; we test fill rate against spec afterward so the fix is verified, not assumed.",
    },
  ],
  costRows: [
    { job: "Diagnostic visit (F-code read + measurements)", range: "$59", note: "Applied toward the repair" },
    { job: "Drain pump clear / replacement (F11)", range: "$180–$350", note: "Most common Miele repair" },
    { job: "Heating element or heater relay (F20)", range: "$250–$450", note: "Includes descale check" },
    { job: "Door lock assembly", range: "$200–$350", note: "Truck-stock part on W1 models" },
    { job: "WPS leak trace + reset", range: "$150–$300", note: "Plus the cost of the actual leak fix" },
    { job: "TwinDos service / flush", range: "$120–$250", note: "Often bundled with another repair" },
    { job: "Motor / electronics work (F50 family)", range: "$350–$700", note: "Only after measured confirmation" },
  ],
  costNote:
    "Typical South Florida ranges, parts plus labor. Exact written quote after the $59 diagnostic — credited toward any repair you approve. 90-day parts and labor warranty on everything we install.",
  serviceHubSlug: "washer-repair",
  serviceHubLabel: "Washer Repair",
  faqs: [
    {
      question: "My Miele washer shows F11. What does it mean and what will it cost?",
      answer:
        "F11 is a drainage fault — the machine couldn't pump out in time. The usual cause is a jammed or failing drain pump, occasionally a blocked drain path. Typical repair runs $180-$350 including the pump if it needs replacement, and it's a single-visit fix in most cases since we stock W1 drain pumps on the truck.",
    },
    {
      question: "Is a Miele washer worth repairing?",
      answer:
        "Almost always — that's the point of the brand. Miele engineers for a 20-year life, replacement W1 units run $1,800-$2,800, and the common repairs (pumps, locks, valves, heaters) all land in the low hundreds. The honest exception is drum bearings on very high-mileage legacy units, where we'll walk you through the real math before you decide.",
    },
    {
      question: "My Miele is locked and showing a waterproof / F1xx fault. Is my floor about to flood?",
      answer:
        "No — the opposite. The Waterproof System found water in the base pan and shut everything down before it reached your floor. The machine is doing its job. We trace the actual source (a hose weep, a door boot fold, sometimes just condensation in a humid install), fix it, dry the pan, and reset the system.",
    },
    {
      question: "Do you work on the compact W1 stacked units in condos?",
      answer:
        "Constantly — stacked W1/T1 pairs in condo laundry closets are the most common Miele install in our service area. We handle the unstacking and restacking when a repair requires it, and we know the closet-specific failure patterns: lint-choked drain pumps, long drain runs, and ventilation-starved dryers above them.",
    },
    {
      question: "Can you still get parts for my 15-year-old Miele?",
      answer:
        "Usually yes — Miele's parts support for legacy platforms is among the best in the industry, and the W30xx generation remains well covered, typically 2-4 business days through the US parts network. Before committing you to a repair on an older unit, we confirm part availability and price so the decision is made with real numbers.",
    },
    {
      question: "Why does my Miele take so long to wash compared to my old machine?",
      answer:
        "That's by design, not a fault — Miele cycles run longer at lower water volumes and controlled temperatures, which is part of why the machines and your clothes last. But if cycle times have suddenly gotten longer than they used to be, that's a real symptom (usually heating or drainage related) and worth a diagnostic.",
    },
  ],
};

const wolfRange: BrandServiceContent = {
  brand: "wolf",
  service: "range-repair",
  serviceLabel: "Range Repair",
  metaTitle: "Wolf Range Repair Miami & South Florida · $59 · Berne",
  metaDescription:
    "Wolf range repair — GR gas, DF dual-fuel, igniters, clicking burners, infrared griddles, oven temperature faults. Same-day service, $59, 90-day warranty.",
  h1Lead: "range repair",
  h1Accent: "across South Florida.",
  heroIntro:
    "GR gas ranges, DF dual-fuel, rangetops with the infrared griddle — the red-knob platform has known habits, and our gas-licensed techs have repaired them across thousands of South Florida tickets. $59 diagnostic credited toward the repair, same-day dispatch across Miami-Dade, Broward, and Palm Beach.",
  sections: [
    {
      eyebrow: "The platform",
      heading: "GR, DF, and SRT — same burners, very different ovens",
      paragraphs: [
        "Wolf's range family shares its top end — the dual-stacked sealed burners with their signature simmer — but splits sharply below the cooktop. The GR series is all-gas: the oven fires through a hot-surface glow-bar igniter and a safety valve, a deliberately simple system whose failures are mechanical and predictable. The DF dual-fuel series puts an electric convection oven under the gas top, run by control boards and relays — more precise, more capable, and with an entirely different failure vocabulary. Rangetops (SRT) and the older R series round out the family. Knowing which platform you own is the first half of a correct phone diagnosis, and it's why our dispatchers ask for the model before the truck rolls.",
        "The failure patterns sort cleanly by platform. GR ovens that heat slowly, run cold, or quit entirely almost always trace to a weakening glow-bar igniter — it still glows, so owners assume it works, but its current draw has dropped below what the safety valve needs to open fully. It's a measured diagnosis (amp clamp, two minutes) and a same-visit fix from truck stock. DF ovens fail through their electronics: a relay board that stops feeding an element, a temperature sensor drifting out of spec, a control board that lost a convection mode. Up top, both platforms share the South Florida classic — burners clicking continuously after a boil-over or on a humid morning, which is moisture or grease tracking a spark switch, occasionally the spark module itself.",
        "Two Wolf-specific subsystems deserve their own mention. The infrared griddle (and charbroiler on 48-inch units) runs ceramic infrared elements with their own ignition; when the griddle won't light or heats unevenly, it's a distinct diagnosis from the burners. And the dual-stacked burner's simmer ring has its own spark and flame geometry — a burner that lights high but won't hold simmer is usually a fixable alignment or sensing issue, not a defect.",
      ],
    },
    {
      eyebrow: "How we work it",
      heading: "Gas-licensed techs, measured diagnosis, one-visit bias",
      paragraphs: [
        "Range work is gas work, and we treat it that way: licensed techs, leak-checks after every connection we touch, and burner verification across the full top before we leave. The diagnostic itself is measurement-driven — igniter current draw against spec on GR ovens, element resistance and relay actuation on DF units, circuit isolation on clicking burner switches — so the quote you approve names the actual failed part, not a hypothesis.",
        "We stock the high-frequency Wolf parts: glow-bar igniters for the common GR ovens, spark modules and switch harnesses, and door hardware. Less common parts — DF relay and control boards, griddle elements — come through distribution in typically 2-4 business days. The $59 service call applies toward the repair, every part we install carries the 90-day parts and labor warranty, and the repair history stays logged against your range for the next visit, whoever runs it.",
      ],
    },
  ],
  failureModes: [
    {
      title: "GR oven slow to heat or not lighting — weak glow-bar igniter",
      detail:
        "The single most common Wolf range repair. The hot-surface igniter ages below the amperage the gas safety valve requires: the oven fires late, undershoots temperature, or stops lighting entirely while the igniter still visibly glows. We measure current draw against spec — a two-minute, definitive test — and replace from truck stock. Most of these close in one visit.",
    },
    {
      title: "Burners clicking continuously — moisture or grease in a spark switch",
      detail:
        "The South Florida classic: after a boil-over or on a humid morning, the spark system clicks with all knobs off or keeps clicking after a burner lights. One leaking igniter switch drags the whole shared spark circuit. We isolate which switch leaks rather than replacing the full harness on a guess — though on older heavily-cooked ranges, the harness is sometimes the honest answer.",
    },
    {
      title: "DF oven dead on one mode — relay board faults",
      detail:
        "Dual-fuel ovens route bake, broil, and convection through relay boards with a known aging pattern. Classic presentation: bake works, broil is dead, or convection modes quietly disappeared from the menu. We confirm at the board with a meter before ordering, and we check the elements it feeds so a failed element doesn't masquerade as electronics.",
    },
    {
      title: "Oven temperature drift — sensor out of spec",
      detail:
        "A Wolf oven baking 25-50°F off setpoint usually has a temperature sensor whose resistance curve has drifted — measurable in minutes against the spec table. On DF units the control board's calibration offset gives us a second lever. Either way, you get an oven that bakes true again, verified with a probe before we leave.",
    },
    {
      title: "Infrared griddle won't light or heats unevenly",
      detail:
        "The infrared griddle runs its own ceramic elements and ignition circuit. No-light conditions trace to the griddle igniter or its valve; uneven heat usually means a degraded element. It's a Wolf-specific subsystem many shops have never opened — for us it's a routine ticket with parts a few days out at worst.",
    },
    {
      title: "Door drops or won't close flush — hinge wear",
      detail:
        "Wolf oven doors are heavy, and after years of daily use the hinges sag — the door drops the last inch, heat bleeds at the top, preheats stretch, and bake times wander. Owners frequently blame the thermostat. A hinge kit and gasket check restores the seal and the temperature behavior together.",
    },
    {
      title: "Simmer ring won't hold flame on dual-stacked burners",
      detail:
        "The lower simmer ring has its own flame geometry and sensing; when it dies at low settings, the cause is usually a misaligned burner cap, a fouled sensing electrode, or debris in the simmer ports. This is tuning work — exactly the kind of repair that separates platform familiarity from parts-cannon service.",
    },
    {
      title: "Convection fan noise or failure on DF ovens",
      detail:
        "DF convection motors announce bearing wear as a scrape or drone before failing outright. Caught at the noise stage it's a clean motor swap; run to failure, it can cost a fan blade too. If your oven has started humming a new tune, the early version of this repair is meaningfully cheaper.",
    },
  ],
  costRows: [
    { job: "Diagnostic visit", range: "$59", note: "Applied toward the repair" },
    { job: "Oven glow-bar igniter (GR series)", range: "$250–$400", note: "The most common Wolf repair; truck stock" },
    { job: "Spark igniter switch / circuit isolation", range: "$200–$380", note: "Fixes continuous clicking" },
    { job: "Spark module replacement", range: "$280–$450", note: "When the module itself has failed" },
    { job: "Oven temperature sensor", range: "$200–$350", note: "Includes probe-verified calibration check" },
    { job: "DF relay / control board", range: "$450–$800", note: "Only after meter confirmation at the board" },
    { job: "Door hinge kit + gasket", range: "$300–$500", note: "Restores seal and bake accuracy" },
    { job: "Convection fan motor (DF)", range: "$300–$500", note: "Cheaper at the first noise than after failure" },
  ],
  costNote:
    "Typical parts-plus-labor ranges for South Florida jobs on 30-48\" Wolf ranges; 48-inch double-oven configurations can run higher on oven-side repairs. Written quote after the $59 diagnostic, which credits toward the repair. 90-day parts and labor warranty.",
  serviceHubSlug: "oven-repair",
  serviceHubLabel: "Oven & Range Repair",
  faqs: [
    {
      question: "My Wolf oven's igniter glows but the oven won't heat. How is that possible?",
      answer:
        "A glow-bar igniter can glow visibly while drawing too little current to open the gas safety valve — that's the standard end-of-life behavior, and it's exactly why visual inspection misleads. We measure the igniter's amp draw against spec, which settles the question in two minutes. Replacement typically runs $250-$400 and closes the same visit from truck stock.",
    },
    {
      question: "Why do my Wolf burners click constantly in the morning?",
      answer:
        "Humidity. Moisture tracks into a spark igniter switch overnight and the shared spark circuit fires until it dries out — the same thing happens after boil-overs. Sometimes it self-resolves by noon, but a switch that's begun leaking only gets worse. We isolate the specific leaking switch and replace it, which usually runs $200-$380.",
    },
    {
      question: "Is Wolf range repair expensive?",
      answer:
        "Less than the badge suggests. The most common repairs — igniters, spark switches, sensors — land in the $200-$450 range, parts and labor. The expensive end (DF control boards, $450-$800) is much rarer and only quoted after meter-level confirmation. Against a $7K-$15K replacement range, repair wins the math in nearly every scenario we see.",
    },
    {
      question: "Do you repair the infrared griddle and charbroiler?",
      answer:
        "Yes — the ceramic infrared elements, their ignition circuits, and the valves behind them. It's a Wolf-specific subsystem that generic shops often decline. Won't-light conditions and uneven heat are both serviceable, with parts typically 2-4 business days when they're not on the truck.",
    },
    {
      question: "My Wolf bakes unevenly / runs hot. Can it be recalibrated?",
      answer:
        "Usually, yes. We first measure the temperature sensor against spec — drift there is the most common cause and a $200-$350 fix. On dual-fuel models the control also carries a calibration offset we can set. And we always check the door seal and hinges, because a sagging door mimics a calibration problem convincingly.",
    },
    {
      question: "Are you an authorized Wolf service center?",
      answer:
        "No — Berne is an independent service company, not affiliated with or endorsed by Sub-Zero Group. For in-warranty units, factory-designated service protects your coverage and is the right call. Out of warranty, an independent shop with deep Wolf experience typically gets to you faster and charges less — that's the honest division of labor, and we'll tell you if your situation belongs on the other side of it.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export const BRAND_SERVICE_PAGES: BrandServiceContent[] = [
  subZeroIceMaker,
  mieleWasher,
  wolfRange,
];

export const BRAND_SERVICE_SLUGS = BRAND_SERVICE_PAGES.map((p) => ({
  brand: p.brand,
  service: p.service,
}));

export function getBrandServiceContent(
  brand: string,
  service: string,
): BrandServiceContent | undefined {
  return BRAND_SERVICE_PAGES.find((p) => p.brand === brand && p.service === service);
}

export function getServicePagesForBrand(brand: string): BrandServiceContent[] {
  return BRAND_SERVICE_PAGES.filter((p) => p.brand === brand);
}

/**
 * Editorial sub-pages under /brands/{slug}/ that are NOT in the
 * brand-service registry (one-off static routes). Listed here so brand hubs
 * can link them without hardcoding in the template.
 */
export const BRAND_GUIDE_LINKS: Record<
  string,
  { href: string; title: string; teaser: string }[]
> = {
  thermador: [
    {
      href: "/brands/thermador/service-guide",
      title: "Thermador customer service — the honest guide",
      teaser:
        "Official Thermador support numbers and channels, what factory service does well, and when an independent South Florida tech is the faster, cheaper call.",
    },
  ],
};
