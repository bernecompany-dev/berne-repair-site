/**
 * Curated HowTo step lists for blog articles that contain a verified,
 * procedural sequence in their body. We hand-curate instead of parsing
 * markdown at runtime because fabricated or mis-extracted steps trigger
 * a structured-data mismatch penalty in Search Console.
 *
 * Add an entry here ONLY after manually reading the post and confirming
 * the step list matches a real procedure section in the body.
 */

import type { HowToStepInput } from "@/lib/seo";

export type HowToBlueprint = {
  name: string;
  description: string;
  totalTimeISO: string;
  estimatedCostUSD?: string;
  supply?: string[];
  tool?: string[];
  steps: HowToStepInput[];
};

export const HOWTO_BLUEPRINTS: Record<string, HowToBlueprint> = {
  "wolf-range-burner-issues": {
    name: "Diagnose a Wolf Range Burner That Won't Light",
    description:
      "Five owner-side checks that resolve roughly 90% of Wolf burner ignition complaints before a service visit.",
    totalTimeISO: "PT15M",
    estimatedCostUSD: "0",
    supply: ["Isopropyl alcohol", "Cotton swab or toothbrush"],
    tool: ["Toothbrush", "Pin or paperclip"],
    steps: [
      {
        name: "Reseat the burner cap",
        text: "Lift the cap straight up, align the notch with the pin on the burner base, and drop it back on dead-square. Misaligned caps cause the spark electrode to fire into ceramic instead of gas-air mix, producing the classic non-ignition click.",
      },
      {
        name: "Clean the spark electrode",
        text: "Lift the burner head off and inspect the white ceramic insulator. Carbonized sugar or grease around the electrode tip kills the spark. Use a toothbrush and isopropyl alcohol — never water — and let it dry for thirty minutes before retrying.",
      },
      {
        name: "Brush the gas ports",
        text: "Run a pin or paperclip around the rim of the burner head to clear carbonized boil-overs from the gas ports. Avoid wire brushes — they widen the ports unevenly and degrade flame quality permanently.",
      },
      {
        name: "Confirm the gas valve at the wall",
        text: "Verify the gas valve under the range or at the wall riser is fully open. South Florida condos commonly leave a riser shut after maintenance and the symptom looks identical to an electrode fault.",
      },
      {
        name: "Cross-check against a working burner",
        text: "Try another burner. If one works and the other does not, the fault is local to the failing burner (cap, igniter, switch). If no burners light, the fault is shared (spark module, gas supply, or main valve).",
      },
    ],
  },

  "sub-zero-refrigerator-troubleshooting-miami": {
    name: "Troubleshoot a Sub-Zero Built-In Refrigerator Running Warm",
    description:
      "Five owner-side checks on a Sub-Zero 648PRO, BI-36, 632, or PRO 48 that drifts warm — condenser cleaning, fan inspection, gasket test, electronics reset, and the compressor-call decision.",
    totalTimeISO: "PT60M",
    estimatedCostUSD: "0",
    supply: [],
    tool: ["Soft brush", "HEPA shop vacuum", "Dollar bill"],
    steps: [
      {
        name: "Clean the upper condenser grille",
        text: "Pop the upper grille off the built-in (units like the 648PRO, 632, BI-36, and the newer PRO 48). On most models the grille tilts forward and lifts free without tools. Brush and HEPA-vacuum a felt mat of dust and salt off the fins until you see bare aluminum. Don't use compressed air — it pushes debris deeper into the coil.",
      },
      {
        name: "Listen for the condenser fan",
        text: "Open the grille and listen for both fans (condenser and compressor compartment). Both should spin smoothly without bearing noise. A stopped, dragging, or screeching fan is a $180 to $320 part replacement, common on units past the eight-year mark.",
      },
      {
        name: "Run the dollar-bill gasket test",
        text: "Pull a dollar bill across the seal at six points — corners and middle of each side, both doors. If the bill slides out without resistance, the gasket is done and the compressor is running 30 to 50 percent longer than it should.",
      },
      {
        name: "Reset the electronics at the breaker",
        text: "Built-in Sub-Zeros use a microprocessor board that can lock into a defrost-stuck or sensor-fault state after a brownout. Power-cycle at the breaker — full breaker off for two minutes, not just unplugging — to clear most soft faults. Photograph any code (EC, OF, vac C) before resetting.",
      },
      {
        name: "Wait an hour before judging the result",
        text: "Run the unit for an hour after cleaning and resetting before judging the result. The compressor needs time to recover from heat soak. If the unit still drifts warm after two hours, the fault is downstream (fan motor, sealed system, or compressor) and is a tech call.",
      },
    ],
  },

  "wolf-gas-top-burner-cleaning-ritual": {
    name: "Wolf Gas Top Burner Cleaning Ritual",
    description:
      "A ten-step post-cooking cleaning ritual that doubles igniter service life on Wolf sealed-burner rangetops and ranges (DF, AG, R, SRT, CT series).",
    totalTimeISO: "PT15M",
    estimatedCostUSD: "0",
    supply: ["Isopropyl alcohol (70% or 91%)", "Cotton swabs"],
    tool: ["Toothbrush", "Pin or paperclip", "Damp cloth"],
    steps: [
      {
        name: "Let the burner cool completely",
        text: "Wait at least twenty minutes after cooking ends before working on the burner. Working on a warm burner risks burns and risks thermal shock from cleaning-solution contact.",
      },
      {
        name: "Lift the burner cap straight up",
        text: "Lift the burner cap straight up off the burner head. Set it aside on a heat-protective surface.",
      },
      {
        name: "Lift the burner head off",
        text: "Lift the burner head off the burner base — it lifts straight up without tools on most Wolf sealed burners. Inspect the underside for spilled food residue.",
      },
      {
        name: "Inspect the spark electrode",
        text: "Look down at the spark electrode. The ceramic insulator should be white or off-white. Brown or black discoloration around the electrode tip is carbonized residue and must be cleaned.",
      },
      {
        name: "Wipe the ceramic insulator with alcohol",
        text: "With a cotton swab and isopropyl alcohol (70% or 91%), gently wipe the ceramic insulator around the electrode. Do not press hard — the electrode tip is fragile. Multiple gentle passes are better than one firm one.",
      },
      {
        name: "Brush the gas ports",
        text: "Brush the burner head's port openings with a toothbrush or clear each port with a thin pin. Every port should be clear of carbon. Never use a wire brush — it widens the ports unevenly.",
      },
      {
        name: "Wipe the burner well",
        text: "Wipe the burner well (the cavity the head sits in) with a damp cloth. Salt and food residue collects here on coastal installs.",
      },
      {
        name: "Let the alcohol evaporate fully",
        text: "Let the alcohol evaporate for 5 minutes minimum, 10 minutes for safety, before reassembling. Trapped alcohol vapor can flash on the first ignition.",
      },
      {
        name: "Reassemble dead-square",
        text: "Drop the burner head onto the gas inlet. Drop the burner cap onto the head with the alignment notch matched to the pin. A millimeter of misalignment will keep the burner from lighting cleanly.",
      },
      {
        name: "Test ignition",
        text: "Turn the knob and test. A correctly cleaned Wolf burner should light on the first or second click. If it doesn't, repeat steps 4-9 and reinspect the electrode.",
      },
    ],
  },

  "wolf-range-igniter-vs-spark-module": {
    name: "Identify Wolf Range Ignition Failure — Igniter vs Spark Module",
    description:
      "Five-step owner diagnostic sequence that separates a local igniter fault from a shared spark-module failure on Wolf gas ranges before booking service.",
    totalTimeISO: "PT15M",
    estimatedCostUSD: "0",
    supply: ["Isopropyl alcohol", "Cotton swab"],
    tool: [],
    steps: [
      {
        name: "Count how many burners are affected",
        text: "Identify how many burners are affected. One burner = local fault (igniter, cap alignment, gas port). All burners = module or supply fault. Some but not all = switch fault. The Wolf spark module is shared across all burners, so a module failure affects every burner.",
      },
      {
        name: "Reseat the cap and clean the electrode (single burner)",
        text: "For single-burner faults, reseat the burner cap and clean the spark electrode with a cotton swab and isopropyl alcohol. This resolves 60 to 70 percent of single-burner non-ignition complaints.",
      },
      {
        name: "Check the gas supply at the wall (all burners)",
        text: "For all-burner faults, check the gas supply at the wall. A closed shutoff feels identical to a module failure from the front of the range. The shutoff sits under the range or behind a cabinet on most installs; pulling the range out 4 inches gives access.",
      },
      {
        name: "Note specific positions (multi-burner but not all)",
        text: "For multi-burner faults that are not all burners, note which specific positions are affected and call for service. That pattern indicates a switch fault on one of the affected burners, which is tech work.",
      },
      {
        name: "Shut off the breaker on continuous-click",
        text: "For continuous-click faults (clicking with no knob turned), shut off the breaker to the range and call. The continuous spark isn't dangerous if gas is shut, but it's hard on the module and the electrodes.",
      },
    ],
  },

  "thermador-combi-oven-steam-descaling": {
    name: "Run a Thermador Combi-Oven Steam-Generator Descaling Cycle",
    description:
      "Six-step descaling procedure for Thermador combi-ovens (PODC301, MEDMC301, SLO302, C32IT) using OEM Thermador descaler — initiation, dwell, two rinses, and steam-production verification.",
    totalTimeISO: "PT120M",
    estimatedCostUSD: "0",
    supply: ["Thermador-approved descaler solution"],
    tool: [],
    steps: [
      {
        name: "Enter descale mode",
        text: "Wait for the descale prompt or manually enter descale mode (Settings > Maintenance > Descale on most current production).",
      },
      {
        name: "Fill the descale reservoir with OEM descaler",
        text: "Fill the descale reservoir with Thermador-approved descaler solution. Use only the manufacturer's descaler or an equivalent certified for stainless steam generators. Vinegar-based home descaling damages component seals on this platform; do not improvise.",
      },
      {
        name: "Start the descale cycle",
        text: "Start the descale cycle. The unit will run a heated soak of the steam generator with the descaler solution for 30 to 45 minutes.",
      },
      {
        name: "Run the first plain-water rinse",
        text: "When the cycle completes, the unit signals to drain and rinse. Refill with plain water and run the rinse cycle.",
      },
      {
        name: "Run a second plain-water rinse",
        text: "Run a second plain-water rinse cycle. South Florida descaling needs the extra rinse because dissolved minerals released from the heat exchanger don't all flush in the first rinse.",
      },
      {
        name: "Wipe the cavity and verify steam",
        text: "Wipe the cavity and test steam production at a normal cooking cycle (a steam-roast of vegetables works for verification). Resume normal use once steam output is consistent and there are no error codes.",
      },
    ],
  },

  "sub-zero-700-drawer-seal-failure": {
    name: "Inspect a Sub-Zero 700 Series Drawer Gasket",
    description:
      "Five-minute owner inspection on a Sub-Zero 700BR, 700BC, 736TR, or 700TFI drawer refrigerator to confirm whether a warm-running drawer is a gasket issue before booking service.",
    totalTimeISO: "PT5M",
    estimatedCostUSD: "0",
    supply: [],
    tool: [],
    steps: [
      {
        name: "Open the drawer fully",
        text: "Open the drawer fully. The Sub-Zero 700 uses a Blum-style undermount slide.",
      },
      {
        name: "Release the drawer from the carrier",
        text: "Tip the drawer face down at roughly 30 degrees and lift straight up. The drawer comes free of the carrier without tools.",
      },
      {
        name: "Inspect the magnetic strip",
        text: "With the drawer out, look at the gasket on all four sides. The magnetic strip should be flat with no folds or kinks.",
      },
      {
        name: "Press the foam profile",
        text: "Press the foam profile of the gasket. It should spring back when released. A gasket that's hard, glossy, or pulling away from the drawer face is done.",
      },
      {
        name: "Inspect the cabinet-side landing surface",
        text: "Look at the cabinet-side landing surface where the gasket lands. Confirm the contact surfaces are clean. Soft, matte gasket with tight bond to the carrier means it's still doing its job; signs of warping in the cabinet-side substrate indicate sustained humidity exposure and need a Sub-Zero authorized adjustment.",
      },
    ],
  },

  "miele-dishwasher-error-codes": {
    name: "Clear a Miele Dishwasher F11 Drainage Fault",
    description:
      "Three owner-side checks that resolve roughly 40% of Miele G6000 and G7000 F11 drainage faults before booking service.",
    totalTimeISO: "PT20M",
    estimatedCostUSD: "0",
    supply: [],
    tool: [],
    steps: [
      {
        name: "Check the drain hose for kinks",
        text: "Pull the unit out six inches (it's on adjustable feet, not screwed to the floor) and check the drain hose for kinks behind the cabinet. New condo installs often pinch the drain hose against the cabinet box during final positioning.",
      },
      {
        name: "Clear any downstream disposal blockage",
        text: "Miele dishwashers in homes with garbage disposals share a drain line. If the disposal is clogged downstream, water backs up. Run the disposal with cold water for 30 seconds, then retry the dishwasher cycle.",
      },
      {
        name: "Clean the triple filter at the sump",
        text: "Unscrew the triple-filter assembly at the bottom of the tub (round mesh, fine filter, coarse strainer). Rinse all three pieces under hot water and reinstall finger-tight. This alone fixes about 40 percent of F11 calls. If those three checks don't resolve it, the drain pump has failed and the unit needs service.",
      },
    ],
  },

  "miele-dishwasher-salt-reservoir-hard-water": {
    name: "Refill a Miele Dishwasher Salt Reservoir",
    description:
      "Six-step refill procedure for the Miele G6000 and G7000 series salt reservoir using dishwasher-specific salt to keep the built-in ion-exchange softener regenerating on Miami's hard water.",
    totalTimeISO: "PT10M",
    estimatedCostUSD: "15",
    supply: ["Dishwasher-specific salt (Miele branded or generic dishwasher salt)"],
    tool: ["Included Miele funnel", "Clean cloth"],
    steps: [
      {
        name: "Unscrew the reservoir cap",
        text: "Unscrew the salt reservoir cap counterclockwise. The reservoir is at the bottom of the tub, accessed from the front lower spray arm position.",
      },
      {
        name: "Pour salt slowly through the funnel",
        text: "Use the included Miele funnel. Pour dishwasher-specific salt slowly until it reaches the bottom of the fill opening. Never use table salt, kosher salt, or rock salt — the additives in food-grade salts damage the softener resin over time.",
      },
      {
        name: "Add half a cup of water on first refill",
        text: "On the first refill of a new dishwasher, add about a half cup of water to the reservoir after the salt. This starts the brine forming and prevents salt from caking. Skip this step on subsequent refills.",
      },
      {
        name: "Wipe any spilled salt off the tub",
        text: "Wipe any spilled salt off the tub floor and gasket area with a clean cloth. Salt residue can corrode stainless if it sits.",
      },
      {
        name: "Screw the cap back on hand-tight",
        text: "Screw the cap back on hand-tight. A loose cap means brine doesn't form correctly and the softener won't regenerate.",
      },
      {
        name: "Run a normal cycle immediately",
        text: "Run a normal cycle, ideally with dishes in it. The cycle confirms the salt is reading correctly and starts using brine immediately.",
      },
    ],
  },

  "thermador-star-burner-maintenance": {
    name: "Clean Thermador Star Burner Caps Without Damaging the Porcelain",
    description:
      "Quarterly deep-maintenance procedure for Thermador Star Burner caps and heads (PRG, PRD, PRL, PCG model families) that preserves the porcelain enamel finish.",
    totalTimeISO: "PT30M",
    estimatedCostUSD: "0",
    supply: ["pH-neutral dish soap", "Warm water"],
    tool: [
      "Microfiber cloth",
      "Soft brass-bristle gun-cleaning brush or wooden toothpick",
      "Isopropyl alcohol on a cotton swab",
    ],
    steps: [
      {
        name: "Pull every burner cap and head",
        text: "Once a quarter, pull every burner cap and head. Both lift straight up without tools on every Thermador Star Burner across the PRG, PRD, PRL, and PCG model families.",
      },
      {
        name: "Soak in warm soapy water",
        text: "Soak both pieces in warm soapy water with one drop of pH-neutral dish soap for 20 minutes. The carbon softens. Never use Bar Keepers Friend, Bon Ami, Comet, Magic Eraser, steel wool, or heavy-duty oven cleaner — all strip the porcelain enamel.",
      },
      {
        name: "Wipe with a microfiber and dry completely",
        text: "Wipe both pieces dry with a microfiber. Don't scrub. If a carbon spot won't come off after a soak, leave it — it'll burn off cleanly during the next cooking session at full flame.",
      },
      {
        name: "Clear gas-port debris with a wooden toothpick",
        text: "Use a wooden toothpick or a soft brass-bristle gun-cleaning brush to clear gas-port debris. Never a steel pin, paperclip, or sewing needle. Metal pins widen the ports unevenly and create flame-distribution problems that require replacing the burner head.",
      },
      {
        name: "Inspect and wipe the spark electrode",
        text: "While the head is off, inspect the spark electrode. The white ceramic insulator should be off-white to ivory. If blackened, wipe with isopropyl alcohol on a cotton swab.",
      },
      {
        name: "Vacuum the burner base and reassemble dead-square",
        text: "Vacuum the burner base (still mounted to the cooktop) with a soft brush attachment to clear crumbs. Reassemble dead-square: the cap drops onto the head with an alignment notch, the head drops onto the base with an alignment pin. Mis-seat any of these by a millimeter and the burner won't light properly.",
      },
    ],
  },
};
