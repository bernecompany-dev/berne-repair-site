/** Technician-voice failure mode used in city × service mid-page sections.
 *  symptom = how the homeowner describes it
 *  cause   = most-likely root cause(s), tech voice
 *  fix     = what we do on-site, plus when a part has to be ordered
 */
export type FailureMode = {
  symptom: string;
  cause: string;
  fix: string;
};

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  commonIssues: string[];
  /** Detailed technician-voice failure-mode bank. 8-12 entries per service.
   *  Used to compose mid-page deep content on combo pages — rotated by
   *  (service, city) hash so each combo surfaces 5 distinct entries. */
  failureModes?: FailureMode[];
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
    failureModes: [
      {
        symptom: "Fresh-food side warm, freezer still cold",
        cause: "Almost always a failed evaporator fan motor or a frost-blocked airflow duct between the two compartments. On Samsung French-door units this is the textbook symptom of the twin-cooling fan icing over.",
        fix: "Pull the freezer back panel, check the fan with the door switch defeated. Replace the motor or run a manual defrost and clear the duct. Fan motors are on the truck for LG, Samsung, Whirlpool, and Sub-Zero.",
      },
      {
        symptom: "Freezer is one solid sheet of frost",
        cause: "Defrost system has stopped cycling — usually a defrost heater that's gone open-circuit, a defrost thermostat stuck open, or on newer units a control-board defrost relay that's burned its contacts.",
        fix: "Ohm-test the heater (should read 20-80 ohms cold) and the thermostat (closed below ~20°F). Swap whichever is bad. Most calls finish on the first visit; on board failures we order direct.",
      },
      {
        symptom: "Ice maker fills with water but won't drop cubes",
        cause: "Water inlet valve solenoid is stuck open, OR the harvest motor has seized in residue, OR the optic emitter/receiver in the freezer is dirty. On Sub-Zero 700-series the ice maker pivot bushings dry out and bind.",
        fix: "Run a forced harvest cycle, check optics with a flashlight, swap the inlet valve if it leaks past. Sub-Zero pivot kits stay on the truck.",
      },
      {
        symptom: "Water leaking from inside fridge onto the floor",
        cause: "Defrost drain at the back of the freezer floor is clogged with ice and food residue. Water from the defrost cycle has nowhere to go, overflows the drain pan, runs out the door seal.",
        fix: "Pull the lower freezer panel, clear the drain with hot water and a flexible brush, install a copper drain-clip if the OEM strap is gone. 30-minute job most of the time.",
      },
      {
        symptom: "Compressor hums for a few seconds, clicks off, repeats",
        cause: "Start relay or PTC (positive temperature coefficient) device has failed — compressor can't get inrush current. A failing compressor can mimic this, but 80% of the time it's the relay or capacitor on the side of the compressor.",
        fix: "Pull the back cover, swap the relay/capacitor kit. If the compressor starts and runs cold, it was the relay. If it still won't start, we test compressor windings to confirm.",
      },
      {
        symptom: "Loud grinding or rattling from the back when running",
        cause: "Condenser fan motor bearings are dry, or a piece of debris (cardboard, bird-down on patio units) is hitting the blade. On built-in Sub-Zero 600/700-series the condenser fan is up top and easy to overlook.",
        fix: "Pull the back grille, inspect and lubricate or replace the fan motor, clear the condenser coil at the same time. Coil-cleaning add-on usually saves the homeowner a future service call.",
      },
      {
        symptom: "Door not sealing, condensation around edges",
        cause: "Door gasket has shrunk, cracked, or pulled away from the inner liner. Common on units 8+ years old. On built-ins the magnet strip inside the gasket can demagnetize after years of being held open during cleaning.",
        fix: "Replace the gasket (we measure and order — gaskets are model-specific and rarely stock items). For built-in panel-ready units we re-align the door cam and adjust the hinge tension first; that fixes 30% of complaints without a new gasket.",
      },
      {
        symptom: "Display shows a fault code (E-codes / SY-codes)",
        cause: "Depends entirely on the brand. Samsung 22E = ice room fan; LG ER-rF = freezer fan; GE Profile FF = freezer fan or thermistor; Whirlpool PO = power outage acknowledgement, not a fault.",
        fix: "We carry brand-specific code reference cards plus a multimeter and basic part kit. Most code-driven calls finish in 60-90 minutes; board replacements add 1-3 business days for the part.",
      },
      {
        symptom: "Refrigerator is cycling on and off every couple minutes",
        cause: "Most often a failing thermistor giving the control board a wildly fluctuating temperature reading — board reacts by short-cycling. Less common: low refrigerant charge causing the compressor to short-cycle on overload protector.",
        fix: "Thermistor swap is a 20-minute job on most brands. Low-charge sealed-system work is an EPA-certified call — we hold Section 608 Universal and quote that separately.",
      },
      {
        symptom: "Water dispenser drips or won't flow",
        cause: "Inlet valve has a partially blocked screen, water filter is overdue (most units restrict flow when the filter is past its life), or the dispenser switch in the door has a sticky actuator.",
        fix: "Change the filter first (always — it's the 5-minute test). If flow is still wrong, valve gets replaced. Filters for Samsung HAF-CIN, LG LT700P, Whirlpool EDR3, and Sub-Zero 4204490 are stock items.",
      },
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
    failureModes: [
      {
        symptom: "Won't drain — tub full of water after a cycle",
        cause: "Drain pump filter is clogged with lint, coins, or a sock. On LG/Samsung front-loaders this is the #1 cause. Less common: pump impeller cracked or pump motor seized.",
        fix: "Pull the access cover, drain via the cleanout hose, clear the filter, run a diagnostic spin. If pump still doesn't run, swap the pump — kits for LG 4681EA2001T and Samsung DC97-15974 stay on the truck.",
      },
      {
        symptom: "Drum bangs and walks across the floor on spin",
        cause: "Suspension rods (top-load) or shock absorbers (front-load) have lost damping. On older Maytag/Whirlpool top-load HE units the four suspension rods all wear together — replacing only one fails again in months.",
        fix: "Replace all four rods/shocks as a set, level the unit, balance test. Sometimes the spider arm has cracked and the basket itself needs replacing — we'll quote both options honestly.",
      },
      {
        symptom: "Won't fill with water, or fills very slowly",
        cause: "Inlet valve screens clogged with sediment (very common in older South Florida buildings with iron pipes), water inlet valve solenoid burned out, or pressure switch hose is kinked and the unit thinks the tub is already full.",
        fix: "Pull the supply hoses, clean the screens, electrically test the solenoids. Valve swaps run 20-30 minutes; pressure-switch fixes are 10. We carry hot/cold inlet valves for the major brands.",
      },
      {
        symptom: "Front-loader leaking from the door",
        cause: "Door boot (rubber gasket) has a small tear, usually at the bottom where bra wires, coins, and bobby pins collect. Sometimes it's the balance ring on the drum leaking instead and water tracks down through the boot.",
        fix: "Inspect with a flashlight while filling. Tear → boot replacement (parts in 1-3 days, brand-specific). Balance ring → drum-out service, longer call, quoted separately.",
      },
      {
        symptom: "LG or Samsung error code on display (UE / dE / 4E / OE)",
        cause: "UE = unbalanced, usually a load distribution issue first, then suspension. dE = door lock circuit. 4E = water inlet (see fill issue above). OE = drain issue. The display is telling you exactly which subsystem to check.",
        fix: "Code-driven diagnostic — we carry the LG/Samsung tech sheets in the truck plus replacement door interlocks, pressure switches, and valves. Most code calls finish in one visit.",
      },
      {
        symptom: "Won't start at all — display off, door locks fine",
        cause: "Lid switch (top-load) or door interlock (front-load) failed open, OR main control board has lost the user-interface ribbon connection, OR the line filter (LG/Samsung) at the back has shorted.",
        fix: "Test the door circuit with a meter first (free check). Line filters are a stock item for LG WF-series and Samsung WF42 line. Control boards we order from the OEM channel — usually 2-3 days.",
      },
      {
        symptom: "Grinding noise during spin only",
        cause: "Drum bearings have failed. On front-loaders this is normally a 7-12 year old failure — bearings rust from years of detergent contact when the seal weeps. Common on Whirlpool Duet, Maytag Maxima, and older Samsung models.",
        fix: "We open the unit, assess bearing kit cost vs. unit age. On units 10+ years old we'll tell you straight: a $400-$600 bearing job often isn't worth it. Tubs are sometimes welded shut and require full basket replacement.",
      },
      {
        symptom: "Clothes still wet after spin cycle",
        cause: "Drain pump partial blockage (water leaving slowly), or the spin speed isn't reaching max RPM — usually a faulty Hall sensor on the motor or a worn drive belt on belted models.",
        fix: "Diagnostic spin test, measure max RPM via service mode, pull belt and motor cover. Hall sensor swaps are quick; belt replacement is a 30-minute job on most front-loaders.",
      },
      {
        symptom: "Strong sour or musty smell from inside",
        cause: "Biofilm buildup in the gasket folds, in the dispenser drawer, and behind the drum baffle. Always a habits issue (cold-only washes + leaving door closed). Sometimes the drain hose has a low spot trapping standing water.",
        fix: "We can clean the gasket and dispenser, recommend a hot-cycle maintenance program. If you want the drum lifted for full clean we can do that on a separate job — it's a real cleanup call, not a 30-minute fix.",
      },
      {
        symptom: "Display shows tub but cycle never starts",
        cause: "Common on Whirlpool/Maytag VMW (vertical modular washer) units — the actuator below the tub has burned out and the shifter can't engage agitate/spin mode. Easy diagnostic: take the back off and watch the shifter during a cycle.",
        fix: "Actuator swap is 45-60 minutes and the part is on the truck for any VMW-platform top-loader. This is the single most common one-part failure we run on Whirlpool top-loaders.",
      },
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
    failureModes: [
      {
        symptom: "Runs but produces no heat — clothes come out damp and cold",
        cause: "Electric units: heating element burned open OR thermal fuse blown from a restricted vent. Gas units: igniter cracked, gas valve coils failed, or flame sensor dirty.",
        fix: "Ohm-test element (~10-15 ohms when good), check thermal fuse continuity, inspect igniter glow. Element + thermal fuse kits stock for Whirlpool 279838 and Samsung DC47-00019A. Igniters too for GE/Maytag gas units.",
      },
      {
        symptom: "Takes 2-3 cycles to dry one load",
        cause: "Lint-restricted exhaust vent — usually downstream of the unit, in the wall duct or roof termination, not the lint trap. Long exterior runs in older South Florida homes accumulate years of buildup.",
        fix: "Power-vacuum the full duct path with our HEPA equipment, inspect the roof or wall cap for crushed mesh, measure airflow at termination. Most homes haven't been done in 5+ years.",
      },
      {
        symptom: "Loud squealing or shrieking when running",
        cause: "Idler pulley bearing has dried out, OR a drum support roller has flat-spotted, OR (on Whirlpool/Maytag 27\" platform) the drum glides under the front bulkhead have worn through.",
        fix: "Pull the front panel, spin everything by hand to identify the noise source. Idler/roller kits for Whirlpool 29\" and 27\" platforms ride in the truck. Glide kits the same. 45-minute job.",
      },
      {
        symptom: "Drum doesn't turn — motor hums but no rotation",
        cause: "Drive belt has snapped, or it's still intact but jumped off the idler pulley, OR the motor pulley has slipped. On older units a seized blower wheel will lock the motor and prevent any rotation.",
        fix: "Remove top panel, inspect belt. Belt swap is the most common dryer repair we do — 30-40 minutes start to finish. Belt kits for both 29\" Whirlpool/Maytag and 27\" LG/Samsung stock on truck.",
      },
      {
        symptom: "Smells like something is burning",
        cause: "First check — lint in the cabinet around the heating element. Second — drum bearing failure rubbing metal. Third — motor windings failing. Stop using immediately; lint plus electric heat is fire risk #1 in dryer repair.",
        fix: "We pull the cabinet and clean the entire interior, replace any glide/roller that's metal-on-metal contacting, ohm-test motor windings. Often we'll recommend a full vent cleaning the same day.",
      },
      {
        symptom: "Won't start — drum won't turn even with door closed",
        cause: "Door switch failed (most common), thermal fuse blown (always check this before assuming worse), start switch failed, or motor centrifugal switch contacts burned.",
        fix: "Door switch and thermal fuse are 10-15 minute swaps. Motor centrifugal switch sits on top of the motor body and is replaceable separately on most brands — no full motor swap usually.",
      },
      {
        symptom: "Display shows error code (E5, F0, dE, etc.)",
        cause: "Brand-specific. Samsung E5 / E6 / E7 = thermistor failure or short. LG dE = door lock circuit. Whirlpool F0 / F1 = control board comms. Maytag PF = power failure (not a fault, just an ack).",
        fix: "We carry brand-specific tech sheets, multimeter, replacement thermistors and door lock assemblies. Most code-driven dryer calls finish in one visit; control board swaps need 1-3 days.",
      },
      {
        symptom: "Gas dryer won't light — clicks but no flame",
        cause: "Igniter is glowing but the gas valve coils aren't opening (most common), OR igniter has fractured silicon carbide rod and isn't glowing at all, OR the flame sensor is dirty and won't confirm flame.",
        fix: "Ohm-test the coils (each should read 1300-1500 ohms cold). Replace coils as a pair, never individually. Igniters are stock for Whirlpool, Maytag, GE, Samsung. Most gas calls finish first visit.",
      },
      {
        symptom: "Stops mid-cycle randomly",
        cause: "Most often a thermal cutoff opening when the dryer overheats from restricted airflow — once it cools off it can be started again. Faulty cycling thermostat or motor overload protector are the next two suspects.",
        fix: "We always check the full vent path on these calls before swapping the thermal cutoff — replacing the cutoff without fixing the underlying airflow issue just lets it burn out again in a month.",
      },
      {
        symptom: "Vent steam coming out the laundry room — moisture indoors",
        cause: "Vent duct disconnected behind the unit, OR transition hose crushed, OR (worst case) someone installed the dryer with no exterior vent termination — venting straight into the room or attic.",
        fix: "We re-route the transition with smooth-wall metal (not foil flex), seal the wall thimble, verify exterior termination. If there's no exit run, we can quote a new run on a separate visit.",
      },
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
    failureModes: [
      {
        symptom: "Standing water in tub at end of cycle",
        cause: "Drain pump impeller obstructed (broken glass, label adhesive, tomato seeds), OR drain hose loop is kinked, OR (very common) the garbage disposal knock-out plug was never removed during the disposal install.",
        fix: "Pull the lower spray arm and filter, inspect impeller, check the drain loop under the sink. Disposal knock-out is a 30-second hammer-and-screwdriver fix — but the dishwasher will never drain until it's done.",
      },
      {
        symptom: "Water on the floor in front of the dishwasher",
        cause: "Door seal/gasket has a flat spot or tear, OR (more common) the inlet valve is dribbling past its shutoff and overfilling the tub. Bosch units sometimes leak from the heat-pump module on the side of the tub.",
        fix: "Dye-test the gasket and inlet valve to isolate. Gasket replacement is a quick swap; inlet valves are model-specific and stock for Whirlpool, KitchenAid, GE, Bosch.",
      },
      {
        symptom: "Dishes coming out gritty or with film",
        cause: "Spray arm jets clogged with hard-water scale (very common in South Florida), OR the chopper/macerator blade has failed and food particles are recirculating, OR rinse aid dispenser is empty.",
        fix: "Pull and soak the spray arms in vinegar (we have a kit), replace the chopper assembly if present, refill rinse aid. Chopper kits stock for Whirlpool and KitchenAid Tall Tub platform.",
      },
      {
        symptom: "Won't start — buttons light up but nothing happens",
        cause: "Door latch microswitch has failed (the unit doesn't think the door is closed), OR the user-interface board to main control board ribbon cable has corroded, OR a thermal fuse on the control board has blown.",
        fix: "Test door latch continuity with a meter, inspect ribbon cable. Latch assemblies are a stock item for the high-volume brands. Control board thermal fuse is repairable (we re-solder) on some Whirlpool boards.",
      },
      {
        symptom: "Loud humming during fill — never starts wash",
        cause: "Circulation pump motor seized or capacitor failed (on units that use one). Bosch and Miele use brushless DC pumps that can fail without warning — they're more expensive but quieter when new.",
        fix: "Diagnostic via service mode (Bosch holds 'Start' for 3 seconds at power-on for tech mode). Pump replacement is a major job — quoted at the call before any disassembly.",
      },
      {
        symptom: "Detergent door not opening mid-cycle",
        cause: "Dispenser actuator has stuck closed (wax motor failed or hardened detergent gluing the door), OR the control board never sent the open signal because of a sensor fault.",
        fix: "Pull the door panel, swap the dispenser assembly. Whirlpool, KitchenAid, GE dispensers are common stock items. Bosch built-in dispensers we order — typically 1-2 days.",
      },
      {
        symptom: "Tub fills with water but spray arms don't move",
        cause: "Circulation pump impeller broken (loud whining accompanies), OR the upper spray arm hose has split, OR the diverter motor under the tub has failed and water isn't being directed to either arm.",
        fix: "Service-mode run with the door cracked, listen and look. Diverter motors are an inexpensive part on Whirlpool/KitchenAid platforms — most common single-part fix on this symptom.",
      },
      {
        symptom: "Display showing error code (E15, E22, F1, etc.)",
        cause: "Bosch E15 = water under the base pan (leak detection float tripped). Bosch E22 = filter clog. Whirlpool F1 = control board fault. KitchenAid F2-E1 = stuck key on the touch panel.",
        fix: "E15 always means we open the unit and find the leak — never just reset and walk away. We carry the full Bosch repair manual and brand-specific test sheets.",
      },
      {
        symptom: "Cycle takes 3+ hours — dishes still warm but never finishes",
        cause: "Heating element has failed open on units that still use one (older Whirlpool, KitchenAid, GE), so the cycle just keeps trying to reach temperature. On heat-pump models (modern Bosch/Miele) this means the pump itself is failing.",
        fix: "Ohm-test heating element (15-25 ohms when good), replace if open. Heat-pump diagnostics are senior-tech work — we send the right person.",
      },
      {
        symptom: "Cabinet around the dishwasher is wet but dishwasher seems fine",
        cause: "Slow leak from the inlet hose connection at the back-left of the unit, OR condensation from the side panels if insulation has shifted, OR (worst case) a slow leak from the tub seam that's wicking down the side.",
        fix: "Pull the kickplate, dye-test connections. Hose swaps are quick. Tub-seam leaks we'll quote honestly — on units 10+ years old replacement often makes more sense than a tub re-weld.",
      },
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
    failureModes: [
      {
        symptom: "Gas oven won't ignite — burner clicks but no flame",
        cause: "Bake igniter has weakened with age and isn't pulling enough current to open the gas safety valve. This is the most common gas oven failure, period — igniters are a wear part with a 5-8 year typical life.",
        fix: "Amp-clamp the igniter circuit during a cold start. Good igniter draws 3.2-3.6A; weak one reads 2.5A or below and won't open the valve. Igniters stock for Whirlpool, GE, Maytag, KitchenAid, Samsung. 30-minute swap.",
      },
      {
        symptom: "Electric oven heats but won't reach set temperature",
        cause: "Bake element has a hot spot but isn't drawing full amperage (visual: you can see it glowing dimly or unevenly), OR the temperature sensor (thermistor) at the back of the oven cavity has drifted out of spec.",
        fix: "Ohm-test bake element (~20-40 ohms when good), ohm-test sensor at room temp (~1080 ohms for standard Whirlpool sensor). Replace whichever is bad. Both are stock items for the major brands.",
      },
      {
        symptom: "Broiler doesn't work but bake does (or vice versa)",
        cause: "Broil element is open-circuit (top), OR the bake/broil relay on the control board has failed. On gas units the broil burner igniter has weakened separately from the bake igniter.",
        fix: "Visual inspection first — bubbles or breaks on the element are visible. Element swaps are 15-minute jobs on most brands. Board relays are repairable on some Whirlpool/Maytag boards.",
      },
      {
        symptom: "Display shows F1, F2, F3, or similar code",
        cause: "Whirlpool/KitchenAid F1 = control board ROM error, F2 = stuck key on touch panel, F3 = oven sensor open, F4 = oven sensor shorted. GE F-codes follow a similar pattern. Bosch e-codes are more granular.",
        fix: "F2 (stuck key) often clears by replacing the membrane overlay alone, no board swap. F3/F4 are sensor swaps. F1 is a board issue — we order direct from the OEM channel.",
      },
      {
        symptom: "Self-clean cycle finished but the door stays locked",
        cause: "Latch motor (the small bidirectional motor that drives the lock cam) has burned out or the cam itself has stripped. Sometimes a thermal limit switch in the door latch circuit has opened from heat damage.",
        fix: "Replace door latch assembly — they come as a complete unit for most brands. Whirlpool/KitchenAid wall ovens, GE Profile, and Samsung NE-series are stock items.",
      },
      {
        symptom: "Surface burner won't light but you smell gas",
        cause: "Spark electrode is dirty (food spillover on the ceramic insulator shorts the spark to ground), OR the spark module has failed and not sending current to one specific burner.",
        fix: "Clean the electrode with a wire brush, dry thoroughly. If clean and still no spark, swap the module. Spark modules are stock for GE, Whirlpool, KitchenAid, Samsung, Frigidaire.",
      },
      {
        symptom: "Oven temperature is way off — burns or undercooks",
        cause: "Oven cavity sensor has drifted, OR the control board's temperature calibration is off (usually after a power surge). On Wolf and Viking the platinum RTD sensors can fail with offsets up to 50°F either way.",
        fix: "Verify with an oven thermometer test (we carry calibrated digital probes). Sensor swap fixes 80% of these. For Wolf/Viking we sometimes recalibrate via service mode instead of swapping parts.",
      },
      {
        symptom: "Wolf, Viking, or Thermador oven shows panel-lit error",
        cause: "Wolf has fewer error codes — most issues route through the door latch, ignition module, or convection fan motor. Viking VGSC/VDSC code patterns are documented; Thermador Pro Grand uses German tech-sheet conventions.",
        fix: "Senior-tech call — Wolf, Viking, Thermador all get our most experienced people. We carry the relevant tech manuals plus the most common spare modules. Premium brands are 70% same-day, 30% parts-order.",
      },
      {
        symptom: "Convection fan is loud or grinding",
        cause: "Convection fan motor bearings have failed — common after 6-10 years of continuous use. The convection element behind the fan sometimes degrades at the same time (both are downstream of the rear bake circuit).",
        fix: "Pull the rear cavity cover (door off), swap fan motor. Stock for GE Profile, KitchenAid wall ovens, Whirlpool double-ovens. Premium brand motors usually 1-3 day order.",
      },
      {
        symptom: "Cooktop indicator says element is on but it's cold",
        cause: "Infinite switch on the dial has burned its internal contact, OR the surface element itself has gone open (visible break in the coil), OR on glass-top units the radiant burner has a hairline crack invisible from above.",
        fix: "Pull the cooktop, inspect from below. Infinite switches and surface elements both stock items for Whirlpool, GE, Samsung, Frigidaire. Glass-top radiant burners are model-specific orders.",
      },
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
