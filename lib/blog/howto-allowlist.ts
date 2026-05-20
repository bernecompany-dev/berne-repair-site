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
};
