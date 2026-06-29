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

/** Spanish localization for a service. Real Spanish — never interpolate the
 *  English noun into Spanish sentence templates (the "Spanglish" failure mode
 *  flagged in the 2026-06-10 techseo audit). */
export type ServiceEs = {
  /** Full Spanish display name — "Reparación de Refrigeradores" */
  name: string;
  /** Singular short noun with article-free casing — "Refrigerador" */
  shortName: string;
  /** Lowercase singular noun for inline prose — "refrigerador" */
  seoNoun: string;
  /** Grammatical gender of seoNoun, for article agreement in templates */
  gender: "m" | "f";
  /** Short card/meta description in Spanish */
  description: string;
  /** Hero paragraph in Spanish */
  longDescription: string;
  /** Symptom list translated — same order/meaning as EN commonIssues */
  commonIssues: string[];
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
  /** Spanish content layer — used by every /es template */
  es: ServiceEs;
};

/** Returns a Service whose display fields are swapped for the Spanish layer.
 *  Lets shared templates (personal copy, link labels) stay locale-agnostic. */
export function localizedService(service: Service, locale: "en" | "es"): Service {
  if (locale !== "es") return service;
  return {
    ...service,
    name: service.es.name,
    shortName: service.es.shortName,
    seoNoun: service.es.seoNoun,
    description: service.es.description,
    longDescription: service.es.longDescription,
    commonIssues: service.es.commonIssues,
  };
}

export const SERVICES: Service[] = [
  {
    slug: "refrigerator-repair",
    name: "Refrigerator Repair",
    shortName: "Refrigerator",
    seoNoun: "refrigerator",
    description:
      "Factory-trained service for Sub-Zero, Miele, Thermador and Viking refrigeration — built-ins and columns restored in place, sealed systems by EPA-608 techs.",
    longDescription:
      "We are a white-glove refrigeration specialist for South Florida's finest kitchens. Our technicians service built-in, integrated, and panel-ready refrigeration — Sub-Zero side-by-sides and columns, Thermador Freedom, Miele MasterCool, Viking Professional — in place, protecting the surrounding millwork, stone, and flooring as we work. Sealed-system repairs (compressors, evaporators, condensers) are handled under EPA Section 608 Universal certification by senior techs, with the diagnostic findings and OEM part numbers documented before any work begins.",
    commonIssues: [
      "Fresh-food compartment drifting above set point",
      "Freezer over-icing or frost on a built-in evaporator",
      "Water pooling beneath the cabinet or behind drawers",
      "Built-in ice maker no longer harvesting",
      "New mechanical noise from a column or integrated unit",
      "Compressor or sealed system not starting",
      "Door no longer sealing flush with the panel",
    ],
    failureModes: [
      {
        symptom: "Fresh-food side reads warm while the freezer stays cold",
        cause: "On dual-evaporator and dual-refrigeration platforms this points to a failed evaporator fan motor or a frost-blocked airflow duct between compartments — the classic twin-cooling icing pattern on Samsung French-door units, and a fan or terminator on Sub-Zero rather than the compressor everyone fears first.",
        fix: "We pull the back panel, verify the fan with the door switch defeated, then replace the motor or clear and defrost the duct. Evaporator fan motors for LG, Samsung, Whirlpool, and Sub-Zero ride on the truck.",
      },
      {
        symptom: "Freezer compartment glazed in a solid sheet of frost",
        cause: "The defrost system has stopped cycling — an open-circuit defrost heater, a defrost thermostat stuck open, or on newer boards a defrost relay with burned contacts.",
        fix: "We ohm-test the heater (20-80 ohms cold) and thermostat (closed below ~20°F) and replace whichever has failed. Most calls finish on the first visit; board failures are ordered through the OEM channel.",
      },
      {
        symptom: "Ice maker takes water but never releases cubes",
        cause: "A water inlet valve solenoid stuck open, a harvest motor seized in residue, or a fouled optic emitter/receiver. On Sub-Zero 700-series built-ins the ice-maker pivot bushings dry out and bind.",
        fix: "We force a harvest cycle, check the optics, and replace a leaking inlet valve. Sub-Zero pivot kits stay on the truck for the common pre-2017 modules.",
      },
      {
        symptom: "Water tracking onto the floor from inside the cabinet",
        cause: "The defrost drain at the freezer floor has frozen over with ice and food residue, so defrost water overflows the pan and runs out past the door seal.",
        fix: "We pull the lower panel, clear the drain with hot water and a flexible brush, and fit a copper drain clip where the OEM strap is gone — typically a 30-minute repair.",
      },
      {
        symptom: "Compressor hums for a few seconds, clicks off, repeats",
        cause: "The start relay or PTC device has failed and the compressor can't draw inrush current. A failing compressor mimics this, but four times in five it is the relay or run capacitor at the compressor.",
        fix: "We replace the relay/capacitor kit. If the compressor then starts and runs cold, the relay was the culprit; if not, we test the windings to confirm before any sealed-system conversation.",
      },
      {
        symptom: "Grinding or rattling from the back of the cabinet",
        cause: "Dry condenser fan bearings, or debris striking the blade. On built-in Sub-Zero 600/700-series the condenser fan sits up top and is easy to overlook.",
        fix: "We pull the grille, inspect, and lubricate or replace the fan motor, then clean the condenser coil in the same visit — the coil service that keeps a Miami built-in from overheating its sealed system.",
      },
      {
        symptom: "Door no longer sealing; condensation around the edges",
        cause: "The gasket has shrunk, cracked, or pulled from the liner — common past eight years. On built-ins the magnet strip can demagnetize after years of being held open during cleaning.",
        fix: "We measure and order the model-specific gasket. On panel-ready units we first re-align the door cam and adjust hinge tension; that alone resolves about a third of complaints without a new gasket.",
      },
      {
        symptom: "Display showing a fault code (E-codes / SY-codes)",
        cause: "Entirely brand-dependent. Samsung 22E = ice-room fan; LG ER-rF = freezer fan; GE Profile FF = freezer fan or thermistor; Whirlpool PO = power-outage acknowledgement, not a fault.",
        fix: "We carry brand-specific code references plus a multimeter and a core part kit. Most code-driven calls finish in 60-90 minutes; board replacements add 1-3 business days for the part.",
      },
      {
        symptom: "Refrigerator short-cycling every couple of minutes",
        cause: "Most often a failing thermistor feeding the board a wildly fluctuating temperature, so it short-cycles the compressor. Less common is a low refrigerant charge cycling the compressor on its overload protector.",
        fix: "A thermistor swap is a 20-minute job on most platforms. Low-charge sealed-system work is an EPA-608 call we quote separately — we hold Section 608 Universal certification.",
      },
      {
        symptom: "Water dispenser drips or flow has fallen off",
        cause: "A partially blocked inlet-valve screen, a filter past its service life restricting flow, or a sticky dispenser actuator in the door.",
        fix: "We change the filter first — the five-minute test — then replace the valve if flow is still wrong. Filters for Samsung HAF-CIN, LG LT700P, Whirlpool EDR3, and Sub-Zero 4204490 are stock items.",
      },
    ],
    brands: ["Sub-Zero", "Viking", "Thermador", "LG", "Samsung", "Whirlpool", "GE", "KitchenAid", "Bosch", "Frigidaire", "Maytag", "Miele"],
    es: {
      name: "Reparación de Refrigeradores",
      shortName: "Refrigerador",
      seoNoun: "refrigerador",
      gender: "m",
      description:
        "Servicio especializado para refrigeración Sub-Zero, Miele, Thermador y Viking — unidades empotradas y de columna reparadas en sitio, sistema sellado por técnicos EPA-608.",
      longDescription:
        "Somos un especialista en refrigeración de guante blanco para las mejores cocinas del sur de Florida. Nuestros técnicos reparan unidades empotradas, integradas y panel-ready — Sub-Zero side-by-side y de columna, Thermador Freedom, Miele MasterCool, Viking Professional — en su lugar, protegiendo la ebanistería, la piedra y los pisos que las rodean. El trabajo de sistema sellado (compresores, evaporadores, condensadores) lo realizan técnicos senior con certificación EPA Sección 608 Universal, documentando el diagnóstico y los números de pieza OEM antes de comenzar.",
      commonIssues: [
        "El compartimento de frescos sube por encima de la temperatura programada",
        "Exceso de hielo o escarcha en el evaporador de una unidad empotrada",
        "Agua acumulada bajo el mueble o detrás de los cajones",
        "La máquina de hielo empotrada deja de producir",
        "Ruido mecánico nuevo en una columna o unidad integrada",
        "El compresor o el sistema sellado no arranca",
        "La puerta ya no sella a ras del panel",
      ],
    },
  },
  {
    slug: "washer-repair",
    name: "Washer Repair",
    shortName: "Washer",
    seoNoun: "washer",
    description:
      "Precision washer service for Miele, Bosch, Asko and Speed Queen — premium front-loaders and stacked installations diagnosed in service mode, not by guesswork.",
    longDescription:
      "We service premium and high-capacity laundry the way it was engineered to be serviced — diagnosed in the manufacturer's service mode, repaired with OEM parts, and finished with the surrounding cabinetry and flooring protected. Miele W1, Bosch 800-series, Asko, Electrolux, and Speed Queen front-loaders and stacked installations are our regular work, alongside the LG and Samsung platforms common in luxury laundry rooms.",
    commonIssues: [
      "Drum won't drain or reach full spin speed",
      "Fill cycle stalls or runs slow on a premium front-loader",
      "Leak appearing at the door boot or under the cabinet",
      "Bearing rumble or walk on the spin cycle",
      "European interlock or error code locking the door",
      "Stacked unit needs in-place service in a tight closet",
    ],
    failureModes: [
      {
        symptom: "Tub still full of water at the end of a cycle",
        cause: "The drain-pump filter is packed with lint, coins, or a stray sock — the leading cause on LG and Samsung front-loaders — or, less often, a cracked impeller or a seized pump motor.",
        fix: "We pull the access cover, drain through the cleanout hose, clear the filter, and run a diagnostic spin. Pump kits for LG 4681EA2001T and Samsung DC97-15974 ride on the truck.",
      },
      {
        symptom: "Drum thumps and walks across the floor during spin",
        cause: "Suspension rods (top-load) or shock absorbers (front-load) have lost their damping. On older HE top-loaders the four rods wear together — replacing one fails again within months.",
        fix: "We replace all four rods or shocks as a set, level the unit, and balance-test. Where the spider arm has cracked we quote a basket replacement honestly against the value of the machine.",
      },
      {
        symptom: "Machine won't fill, or fills at a trickle",
        cause: "Inlet-valve screens clogged with sediment — common in older South Florida supply lines — a burned-out inlet solenoid, or a kinked pressure-switch hose telling the control the tub is already full.",
        fix: "We pull the supply hoses, clean the screens, and bench-test the solenoids. Valve swaps run 20-30 minutes; pressure-switch fixes are quicker. Hot/cold inlet valves for the major platforms stay on the truck.",
      },
      {
        symptom: "Front-loader weeping from the door",
        cause: "A small tear in the door boot, usually at the bottom fold where wires and coins collect — or a leaking balance ring on the drum tracking water down through the boot.",
        fix: "We dye-test while filling to isolate it. A boot tear is a model-specific part in 1-3 days; a balance-ring leak is a drum-out service we quote separately.",
      },
      {
        symptom: "LG or Samsung code on the display (UE / dE / 4E / OE)",
        cause: "UE = unbalanced load, then suspension; dE = door-lock circuit; 4E = water inlet; OE = drain. The control is naming the subsystem to check.",
        fix: "Code-driven diagnostic with the manufacturer tech sheets in the truck plus replacement interlocks, pressure switches, and valves. Most code calls finish in one visit.",
      },
      {
        symptom: "Dead at the door — display off, latch engaging normally",
        cause: "A lid switch or door interlock failed open, a control-board ribbon connection lost, or the line filter (LG/Samsung) at the rear has shorted.",
        fix: "We meter the door circuit first. Line filters are stock for the LG WF and Samsung WF42 lines; control boards we source through the OEM channel, usually 2-3 days.",
      },
      {
        symptom: "Grinding only during spin",
        cause: "Drum bearings have failed — typically a 7-12 year wear-out on front-loaders as detergent weeps past the seal. Common on Whirlpool Duet, Maytag Maxima, and older Samsung drums.",
        fix: "We open the unit and weigh the bearing-kit cost against the machine's value — on a premium drum (Miele, Speed Queen) the repair almost always wins; on a welded-tub commodity unit we say so plainly.",
      },
      {
        symptom: "Clothes still soaked after the spin cycle",
        cause: "A partial drain-pump blockage so water leaves slowly, or the spin never reaches max RPM — usually a drifting Hall sensor on the motor or a worn drive belt on belted models.",
        fix: "We measure max RPM in service mode, then pull the belt and motor cover. Hall-sensor swaps are quick; belt replacement is about 30 minutes on most front-loaders.",
      },
      {
        symptom: "Persistent sour or musty odor from the drum",
        cause: "Biofilm built up in the gasket folds, the dispenser drawer, and behind the baffle — a cold-wash-plus-closed-door habit. Sometimes a low spot in the drain hose holds standing water.",
        fix: "We deep-clean the gasket and dispenser and recommend a hot-cycle maintenance routine. A full drum-lift clean is a separate, honest service call — not a 30-minute fix dressed up as one.",
      },
      {
        symptom: "Display lights the tub but the cycle never starts",
        cause: "Common on Whirlpool/Maytag vertical-modular top-loaders — the shift actuator below the tub has burned out and can't engage agitate or spin.",
        fix: "The actuator swap runs 45-60 minutes and the part is on the truck for any VMW-platform top-loader — the single most common one-part fix we run on these machines.",
      },
    ],
    brands: ["LG", "Samsung", "Whirlpool", "Maytag", "GE", "Bosch", "Miele", "Speed Queen", "Electrolux"],
    es: {
      name: "Reparación de Lavadoras",
      shortName: "Lavadora",
      seoNoun: "lavadora",
      gender: "f",
      description:
        "Servicio de precisión para Miele, Bosch, Asko y Speed Queen — lavadoras premium de carga frontal e instalaciones apiladas diagnosticadas en modo servicio, no a la adivinanza.",
      longDescription:
        "Reparamos lavandería premium y de alta capacidad como fue diseñada para repararse — diagnóstico en el modo de servicio del fabricante, piezas OEM y un cierre que protege la ebanistería y los pisos alrededor. Las unidades Miele W1, Bosch serie 800, Asko, Electrolux y Speed Queen de carga frontal e instalaciones apiladas son nuestro trabajo habitual, junto a las plataformas LG y Samsung comunes en cuartos de lavado de lujo.",
      commonIssues: [
        "El tambor no drena o no alcanza la velocidad de centrifugado",
        "El llenado se detiene o va lento en una carga frontal premium",
        "Fuga en el empaque de la puerta o bajo el mueble",
        "Zumbido de balero o vibración fuerte en el centrifugado",
        "Interlock europeo o código de error bloqueando la puerta",
        "La unidad apilada necesita servicio en sitio en un clóset estrecho",
      ],
    },
  },
  {
    slug: "dryer-repair",
    name: "Dryer Repair",
    shortName: "Dryer",
    seoNoun: "dryer",
    description:
      "Expert dryer and heat-pump service for Miele T1, Bosch and Speed Queen — vented and ventless platforms diagnosed correctly, plus full vent airflow inspection.",
    longDescription:
      "Premium and ventless drying is a different discipline, and we service it as one. Miele T1 and Bosch 800-series heat-pump dryers — increasingly standard in South Florida's luxury condos — get senior techs who know the refrigerant circuit and condenser path, while the gas and electric vented machines in single-family homes get a complete airflow inspection on every call, because a restricted vent is both the most common cause of long dry times and the leading fire risk.",
    commonIssues: [
      "Runs but produces no heat",
      "A single load needs two or more cycles to dry",
      "Squeal or thump from the drum or blower",
      "Won't start or shuts down hot mid-cycle",
      "Scorched or burning smell during operation",
      "Ventless heat-pump unit no longer drying",
    ],
    failureModes: [
      {
        symptom: "Runs but the load comes out damp and cold",
        cause: "On electric units a heating element burned open or a thermal fuse blown by a restricted vent; on gas, a cracked igniter, failed valve coils, or a dirty flame sensor.",
        fix: "We ohm-test the element (~10-15 ohms good), check the thermal fuse, and inspect the igniter glow. Element and fuse kits for Whirlpool 279838 and Samsung DC47-00019A are stock, as are igniters for GE and Maytag gas units.",
      },
      {
        symptom: "One load takes two or three cycles to dry",
        cause: "A lint-restricted exhaust downstream of the machine — in the wall duct or roof termination, not the lint trap. Long exterior runs in older South Florida homes accumulate years of buildup.",
        fix: "We power-vacuum the full duct path with HEPA equipment, inspect the roof or wall cap, and measure airflow at the termination. Most homes haven't had it done in five-plus years.",
      },
      {
        symptom: "Loud squeal or shriek while running",
        cause: "A dry idler-pulley bearing, a flat-spotted drum support roller, or worn front-bulkhead glides on the Whirlpool/Maytag 27-inch platform.",
        fix: "We pull the front panel and spin everything by hand to isolate the noise. Idler, roller, and glide kits for the 29-inch and 27-inch platforms ride on the truck — about a 45-minute repair.",
      },
      {
        symptom: "Motor hums but the drum doesn't turn",
        cause: "A snapped drive belt, a belt jumped off the idler, or a slipped motor pulley — and on older units a seized blower wheel locking the motor.",
        fix: "We remove the top panel and inspect the belt. A belt swap is the most common dryer repair we run, 30-40 minutes start to finish, with kits for both the 29-inch and 27-inch platforms on the truck.",
      },
      {
        symptom: "Smells like something is scorching",
        cause: "First, lint in the cabinet around the heating element; second, a failing drum bearing rubbing metal; third, failing motor windings. Lint plus electric heat is the number-one fire risk in drying.",
        fix: "Stop using it immediately. We pull the cabinet, clean the entire interior, replace any metal-on-metal glide or roller, and ohm-test the motor windings — usually recommending a full vent cleaning the same day.",
      },
      {
        symptom: "Won't start — drum stays still with the door closed",
        cause: "A failed door switch (most common), a blown thermal fuse, a failed start switch, or burned motor centrifugal-switch contacts.",
        fix: "Door switch and thermal fuse are 10-15 minute swaps. The motor centrifugal switch is replaceable on its own on most brands — no full motor swap needed.",
      },
      {
        symptom: "Error code on the display (E5, F0, dE, etc.)",
        cause: "Brand-specific: Samsung E5/E6/E7 = thermistor fault; LG dE = door lock; Whirlpool F0/F1 = control comms; Maytag PF = power-failure acknowledgement, not a fault.",
        fix: "We carry the tech sheets, a multimeter, and replacement thermistors and door-lock assemblies. Most code calls finish in one visit; control-board swaps need 1-3 days.",
      },
      {
        symptom: "Gas dryer clicks but won't light",
        cause: "The igniter glows but the gas-valve coils aren't opening, the igniter's silicon-carbide rod has fractured, or a dirty flame sensor won't confirm flame.",
        fix: "We ohm-test the coils (1300-1500 ohms cold each) and replace them as a pair, never singly. Igniters are stock for Whirlpool, Maytag, GE, and Samsung — most gas calls finish on the first visit.",
      },
      {
        symptom: "Shuts down at random mid-cycle",
        cause: "Most often a thermal cutoff opening on overheat from restricted airflow — it restarts once cool. A faulty cycling thermostat or motor overload protector are the next suspects.",
        fix: "We inspect the full vent path before swapping the cutoff — replacing it without fixing the airflow just burns out the new part within a month.",
      },
      {
        symptom: "Humid air and steam venting into the laundry room",
        cause: "A duct disconnected behind the unit, a crushed transition hose, or — worst case — a dryer installed with no exterior termination, exhausting into the room or attic.",
        fix: "We re-route the transition in smooth-wall metal (not foil flex), seal the wall thimble, and confirm exterior termination. A missing run is quoted as a separate visit.",
      },
    ],
    brands: ["LG", "Samsung", "Whirlpool", "Maytag", "GE", "Bosch", "Miele", "Speed Queen", "Electrolux"],
    es: {
      name: "Reparación de Secadoras",
      shortName: "Secadora",
      seoNoun: "secadora",
      gender: "f",
      description:
        "Servicio experto de secadoras y bomba de calor para Miele T1, Bosch y Speed Queen — plataformas con y sin ventilación diagnosticadas correctamente, con inspección completa del ducto.",
      longDescription:
        "El secado premium y sin ventilación es una disciplina aparte y así lo servimos. Las secadoras de bomba de calor Miele T1 y Bosch serie 800 — cada vez más comunes en los condos de lujo del sur de Florida — van con técnicos senior que conocen el circuito de refrigerante y el condensador, mientras que las máquinas de gas y eléctricas con ducto reciben una inspección completa de flujo de aire en cada visita, porque un ducto obstruido es a la vez la causa más común de ciclos largos y el principal riesgo de incendio.",
      commonIssues: [
        "Funciona pero no genera calor",
        "Una sola carga necesita dos o más ciclos para secar",
        "Chirrido o golpeteo del tambor o del soplador",
        "No arranca o se apaga caliente a mitad de ciclo",
        "Olor a quemado durante el funcionamiento",
        "La unidad de bomba de calor sin ducto ya no seca",
      ],
    },
  },
  {
    slug: "dishwasher-repair",
    name: "Dishwasher Repair",
    shortName: "Dishwasher",
    seoNoun: "dishwasher",
    description:
      "Specialist service for integrated Miele, Bosch Benchmark and Thermador dishwashers — panel-ready units removed and refit without scarring custom cabinetry.",
    longDescription:
      "Integrated, panel-ready European dishwashers are the standard in the kitchens we serve, and they demand the standard to match. Our senior techs remove and refit Miele G-series, Bosch Benchmark, and Thermador Sapphire units behind custom millwork using protective film and the manufacturer's procedure — never a pry bar — and diagnose their brushless pumps and heat-pump drying systems in service mode rather than by guesswork.",
    commonIssues: [
      "Standing water left in the tub after a cycle",
      "Leak at the door or beneath an integrated unit",
      "Dishes coming out gritty or filmed",
      "Bosch E15 or other leak-detection fault",
      "Quiet panel-ready unit no longer running the pump",
      "Detergent door not releasing mid-cycle",
    ],
    failureModes: [
      {
        symptom: "Standing water in the tub at cycle's end",
        cause: "A drain-pump impeller fouled by glass, label adhesive, or seeds; a kinked drain loop; or — very common — a garbage-disposal knock-out plug never removed during a disposal install.",
        fix: "We pull the lower spray arm and filter, inspect the impeller, and check the drain loop. The knock-out is a 30-second fix, but the dishwasher will never drain until it's done.",
      },
      {
        symptom: "Water on the floor in front of the unit",
        cause: "A door gasket with a flat spot or tear, or — more often — an inlet valve dribbling past its shutoff and overfilling the tub. Bosch units sometimes leak from the side heat-pump module.",
        fix: "We dye-test the gasket and inlet valve to isolate. Gasket swaps are quick; inlet valves are model-specific and stock for Whirlpool, KitchenAid, GE, and Bosch.",
      },
      {
        symptom: "Dishes coming out gritty or filmed",
        cause: "Spray-arm jets scaled by South Florida hard water, a failed chopper/macerator recirculating food, or an empty rinse-aid reservoir.",
        fix: "We soak the spray arms, replace the chopper assembly where fitted, and refill rinse aid. Chopper kits are stock for the Whirlpool and KitchenAid Tall Tub platforms.",
      },
      {
        symptom: "Buttons light up but nothing starts",
        cause: "A failed door-latch microswitch (the unit doesn't see the door closed), a corroded ribbon between the user interface and main board, or a blown thermal fuse on the control board.",
        fix: "We meter the latch continuity and inspect the ribbon. Latch assemblies are stock for the high-volume brands; the control-board thermal fuse is re-solderable on some Whirlpool boards.",
      },
      {
        symptom: "Loud hum during fill, never starts washing",
        cause: "A seized circulation-pump motor or failed capacitor. Bosch and Miele use brushless DC pumps that can fail without warning — quieter when new, dearer to replace.",
        fix: "We enter service mode (Bosch holds Start three seconds at power-on) to confirm. A pump replacement is a major job, quoted in writing before any disassembly.",
      },
      {
        symptom: "Detergent door won't open mid-cycle",
        cause: "A stuck dispenser actuator — a failed wax motor or hardened detergent gluing the door — or a board that never sent the open signal because of a sensor fault.",
        fix: "We pull the door panel and replace the dispenser assembly. Whirlpool, KitchenAid, and GE dispensers are common stock; Bosch built-in dispensers are typically a 1-2 day order.",
      },
      {
        symptom: "Tub fills but the spray arms stay still",
        cause: "A broken circulation-pump impeller (a whine gives it away), a split upper spray-arm hose, or a failed diverter motor not directing water to either arm.",
        fix: "We run it in service mode with the door cracked to watch and listen. Diverter motors are an inexpensive Whirlpool/KitchenAid part — the most common single-part fix for this symptom.",
      },
      {
        symptom: "Error code on the display (E15, E22, F1, etc.)",
        cause: "Bosch E15 = water in the base pan (leak-detection float tripped); E22 = filter clog; Whirlpool F1 = control fault; KitchenAid F2-E1 = a stuck touch-panel key.",
        fix: "E15 always means we open the unit and find the leak — never just reset and walk away. We carry the full Bosch repair manual and brand test sheets.",
      },
      {
        symptom: "Cycle runs three-plus hours and never finishes",
        cause: "On units with a traditional element (older Whirlpool, KitchenAid, GE) the element has failed open, so the cycle keeps reaching for temperature. On heat-pump Bosch/Miele it points to the pump itself.",
        fix: "We ohm-test the element (15-25 ohms good) and replace it. Heat-pump diagnostics are senior-tech work — we send the right person, not a guess.",
      },
      {
        symptom: "Cabinet beside the dishwasher is wet but the unit looks fine",
        cause: "A slow leak at the rear-left inlet connection, condensation from shifted side-panel insulation, or — worst case — a tub-seam leak wicking down the side.",
        fix: "We pull the kickplate and dye-test the connections. Hose swaps are quick; a tub-seam leak on an aging unit we quote honestly against replacement.",
      },
    ],
    brands: ["Bosch", "Miele", "KitchenAid", "Whirlpool", "GE", "Samsung", "LG", "Frigidaire", "Maytag"],
    es: {
      name: "Reparación de Lavavajillas",
      shortName: "Lavavajillas",
      seoNoun: "lavavajillas",
      gender: "m",
      description:
        "Servicio especializado para lavavajillas integrados Miele, Bosch Benchmark y Thermador — unidades panel-ready retiradas y reinstaladas sin dañar la ebanistería a medida.",
      longDescription:
        "Los lavavajillas europeos integrados y panel-ready son la norma en las cocinas que servimos, y exigen un estándar a la altura. Nuestros técnicos senior retiran y reinstalan unidades Miele serie G, Bosch Benchmark y Thermador Sapphire detrás de la ebanistería a medida con película protectora y el procedimiento del fabricante — nunca una palanca — y diagnostican sus bombas sin escobillas y sistemas de secado por bomba de calor en modo servicio, no a la adivinanza.",
      commonIssues: [
        "Queda agua estancada en la tina tras el ciclo",
        "Fuga en la puerta o debajo de una unidad integrada",
        "Los platos salen con arenilla o película",
        "Falla Bosch E15 u otra detección de fuga",
        "Unidad panel-ready silenciosa que ya no mueve la bomba",
        "La compuerta del jabón no abre a mitad de ciclo",
      ],
    },
  },
  {
    slug: "oven-repair",
    name: "Oven & Range Repair",
    shortName: "Oven",
    seoNoun: "oven",
    description:
      "Senior-tech service for Wolf, Viking, Thermador, Gaggenau and La Cornue ranges — calibration, ignition and control work to factory tolerance.",
    longDescription:
      "Professional ranges are the heart of a luxury kitchen, and we service them as the precision instruments they are. Wolf dual-fuel and gas ranges, Viking Professional, Thermador Pro Grand and Pro Harmony, Gaggenau, and La Cornue all go to our senior rotation — techs who recalibrate platinum RTD sensors to factory tolerance, work German and French tech-sheet conventions, and protect stone and cabinetry while servicing built-in wall ovens in place.",
    commonIssues: [
      "Oven slow to heat or holding off-target",
      "Baking unevenly across the cavity",
      "Broil element or burner out while bake works",
      "Self-clean finished but the door stays locked",
      "Pro-range surface burner clicking without lighting",
      "Panel-lit fault code on a premium range",
    ],
    failureModes: [
      {
        symptom: "Gas oven won't ignite — the burner clicks but no flame",
        cause: "The bake igniter has weakened with age and no longer pulls enough current to open the gas safety valve — the most common gas-oven failure, with igniters a 5-8 year wear part.",
        fix: "We amp-clamp the igniter on a cold start: a healthy igniter draws 3.2-3.6A, a weak one 2.5A or below. Igniters are stock for Whirlpool, GE, Maytag, KitchenAid, and Samsung — a 30-minute swap.",
      },
      {
        symptom: "Electric oven heats but never reaches set temperature",
        cause: "A bake element with a hot spot drawing under full amperage (it glows dim or uneven), or a cavity sensor (thermistor) drifted out of spec.",
        fix: "We ohm-test the element (~20-40 ohms good) and the sensor (~1080 ohms at room temp on a standard Whirlpool sensor) and replace whichever has failed — both stock for the major platforms.",
      },
      {
        symptom: "Broil works but bake doesn't, or the reverse",
        cause: "An open-circuit element, or a failed bake/broil relay on the control board. On gas, one burner igniter has weakened independently of the other.",
        fix: "A visual check finds breaks or blisters; element swaps are 15-minute jobs. Board relays are repairable on some Whirlpool and Maytag boards.",
      },
      {
        symptom: "Display shows F1, F2, F3 or similar",
        cause: "On Whirlpool/KitchenAid: F1 = control ROM error, F2 = stuck touch-panel key, F3 = oven sensor open, F4 = sensor shorted. GE follows a similar map; Bosch e-codes are more granular.",
        fix: "F2 often clears by replacing the membrane overlay alone — no board. F3/F4 are sensor swaps; F1 we order direct from the OEM channel.",
      },
      {
        symptom: "Self-clean finished but the door stays locked",
        cause: "The latch motor that drives the lock cam has burned out or the cam stripped, or a thermal limit switch in the latch circuit opened from heat.",
        fix: "We replace the door-latch assembly as a complete unit. Whirlpool/KitchenAid wall ovens, GE Profile, and Samsung NE-series latches are stock items.",
      },
      {
        symptom: "Surface burner won't light but you smell gas",
        cause: "A dirty spark electrode (spillover on the ceramic insulator shorts the spark to ground) or a failed spark module not feeding current to one burner.",
        fix: "We clean and dry the electrode; if it still won't spark we swap the module. Spark modules are stock for GE, Whirlpool, KitchenAid, Samsung, and Frigidaire.",
      },
      {
        symptom: "Oven temperature well off — burning or undercooking",
        cause: "A drifted cavity sensor, or a board calibration thrown off by a power surge. On Wolf and Viking the platinum RTD sensors can fail with offsets up to 50°F either way.",
        fix: "We verify against a calibrated probe. A sensor swap resolves most; on Wolf and Viking we often recalibrate through service mode instead of replacing parts, documenting the as-found offset.",
      },
      {
        symptom: "Wolf, Viking, Thermador or Gaggenau showing a panel-lit fault",
        cause: "Wolf routes most issues through the door latch, ignition module, or convection fan rather than codes; Viking VGSC/VDSC and Thermador Pro Grand follow documented patterns under German conventions.",
        fix: "Senior-tech call — our most experienced people, the relevant tech manuals, and the common spare modules on the truck. Premium brands run about 70% first-visit, 30% parts-order.",
      },
      {
        symptom: "Convection fan loud or grinding",
        cause: "Convection fan-motor bearings have failed after 6-10 years of use, often with the convection element degrading alongside on the same rear circuit.",
        fix: "We pull the rear cavity cover (door off) and replace the fan motor. Stock for GE Profile, KitchenAid, and Whirlpool double-ovens; premium motors are usually a 1-3 day order.",
      },
      {
        symptom: "Cooktop says the element is on but it stays cold",
        cause: "A burned infinite-switch contact on the dial, an open surface element, or — on glass-top units — a hairline crack in the radiant burner invisible from above.",
        fix: "We pull the cooktop and inspect from below. Infinite switches and surface elements are stock for Whirlpool, GE, Samsung, and Frigidaire; glass-top radiant burners are model-specific orders.",
      },
    ],
    brands: ["Wolf", "Viking", "Thermador", "Bosch", "KitchenAid", "GE", "Whirlpool", "LG", "Samsung", "Frigidaire"],
    es: {
      name: "Reparación de Hornos y Estufas",
      shortName: "Horno",
      seoNoun: "horno",
      gender: "m",
      description:
        "Servicio de técnicos senior para estufas Wolf, Viking, Thermador, Gaggenau y La Cornue — calibración, encendido y control a tolerancia de fábrica.",
      longDescription:
        "Las estufas profesionales son el corazón de una cocina de lujo y las servimos como los instrumentos de precisión que son. Las estufas Wolf de combustible dual y a gas, Viking Professional, Thermador Pro Grand y Pro Harmony, Gaggenau y La Cornue van a nuestra rotación senior — técnicos que recalibran sensores RTD de platino a tolerancia de fábrica, manejan convenciones de fichas técnicas alemanas y francesas, y protegen piedra y ebanistería al reparar hornos de pared empotrados en sitio.",
      commonIssues: [
        "El horno tarda en calentar o se mantiene fuera de temperatura",
        "Horneado disparejo en la cavidad",
        "Resistencia del asador o quemador sin funcionar mientras hornea",
        "La autolimpieza terminó pero la puerta sigue bloqueada",
        "Quemador de superficie de estufa pro que hace clic sin prender",
        "Código de falla iluminado en una estufa premium",
      ],
    },
  },
  {
    slug: "microwave-repair",
    name: "Microwave Repair",
    shortName: "Microwave",
    seoNoun: "microwave",
    description:
      "Built-in, drawer and speed-oven microwave service for Wolf, Thermador, Sharp and Miele — trim-kit and cabinet-fit work done right.",
    longDescription:
      "We service the integrated microwave segment — Wolf MD30 and speed ovens, Thermador MD24, Sharp drawer units, and Miele built-ins — where a failure means trim kits, cabinet fit, and in-place service rather than a counter swap. Senior techs handle the drawer and built-in platforms, replacing magnetrons, control boards, door switches, and drive systems to keep a premium unit in its cabinetry.",
    commonIssues: [
      "Runs but no longer heats",
      "Arcing or sparking inside the cavity",
      "Touch panel unresponsive on a built-in",
      "Loud buzzing under load",
      "Drawer or door no longer latching",
      "Turntable or drive no longer turning",
    ],
    brands: ["GE", "Whirlpool", "Samsung", "LG", "KitchenAid", "Bosch", "Sharp", "Panasonic"],
    es: {
      name: "Reparación de Microondas",
      shortName: "Microondas",
      seoNoun: "microondas",
      gender: "m",
      description:
        "Servicio de microondas empotrados, de gaveta y speed-oven para Wolf, Thermador, Sharp y Miele — trabajo de trim-kit y ajuste a gabinete bien hecho.",
      longDescription:
        "Servimos el segmento de microondas integrados — Wolf MD30 y speed ovens, Thermador MD24, gavetas Sharp y empotrados Miele — donde una falla implica trim kits, ajuste al gabinete y servicio en sitio, no un cambio de mostrador. Los técnicos senior atienden las plataformas de gaveta y empotradas, reemplazando magnetrones, tarjetas de control, interruptores de puerta y sistemas de arrastre para mantener una unidad premium en su ebanistería.",
      commonIssues: [
        "Funciona pero ya no calienta",
        "Arcos o chispas dentro de la cavidad",
        "Panel táctil sin respuesta en un empotrado",
        "Zumbido fuerte bajo carga",
        "La gaveta o la puerta ya no cierra con seguro",
        "El plato giratorio o el arrastre ya no gira",
      ],
    },
  },
  {
    slug: "ice-maker-repair",
    name: "Ice Maker Repair",
    shortName: "Ice Maker",
    seoNoun: "ice maker",
    description:
      "Sealed-system ice maker service for Sub-Zero, Scotsman, U-Line and Marvel — EPA-608 techs for built-in and stand-alone clear-ice units.",
    longDescription:
      "Built-in and stand-alone ice makers are sealed-system appliances, and we service them under EPA Section 608 Universal certification. Sub-Zero built-ins, Scotsman and U-Line clear-ice units, Hoshizaki residential, and Marvel column makers go to senior techs who document refrigerant recovery on every system that opens — restoring harvest, water, and control systems to factory performance.",
    commonIssues: [
      "Production stopped on a built-in maker",
      "Harvest slowed or yield fallen off",
      "Cloudy ice or off taste",
      "Water leaking from the unit or supply",
      "Harvest cycle not completing",
      "Control board fault code",
    ],
    brands: ["Sub-Zero", "Scotsman", "U-Line", "Manitowoc", "Hoshizaki", "KitchenAid", "Whirlpool", "GE"],
    es: {
      name: "Reparación de Máquinas de Hielo",
      shortName: "Máquina de Hielo",
      seoNoun: "máquina de hielo",
      gender: "f",
      description:
        "Servicio de sistema sellado para máquinas de hielo Sub-Zero, Scotsman, U-Line y Marvel — técnicos EPA-608 para unidades empotradas e independientes de hielo claro.",
      longDescription:
        "Las máquinas de hielo empotradas e independientes son electrodomésticos de sistema sellado, y las servimos bajo certificación EPA Sección 608 Universal. Las empotradas Sub-Zero, las unidades de hielo claro Scotsman y U-Line, Hoshizaki residencial y las de columna Marvel van con técnicos senior que documentan la recuperación de refrigerante en cada sistema que se abre — devolviendo los sistemas de cosecha, agua y control al rendimiento de fábrica.",
      commonIssues: [
        "Producción detenida en una unidad empotrada",
        "Cosecha lenta o menor rendimiento",
        "Hielo turbio o con sabor",
        "Fuga de agua de la unidad o del suministro",
        "El ciclo de cosecha no se completa",
        "Código de falla de la tarjeta de control",
      ],
    },
  },
  {
    slug: "air-duct-cleaning",
    name: "Air Duct Cleaning",
    shortName: "Air Duct",
    seoNoun: "air duct cleaning",
    description:
      "HEPA negative-pressure duct and dryer-vent cleaning for South Florida estates — camera-verified, photo-documented, NADCA-compliant process.",
    longDescription:
      "Clean air is part of caring for a fine home. We clean HVAC ducts, dryer vents, and air handlers with HEPA-filtered negative-pressure equipment — a camera-verified, NADCA-compliant process that pulls years of dust, mold spores, dander, and lint out of the system rather than scrubbing it loose. Every job is documented with before-and-after photos of your actual ducts, and floors and furnishings are protected throughout.",
    commonIssues: [
      "Dust resettling on surfaces within a day",
      "Dryer needing two cycles or running hot",
      "Musty smell at AC startup or mold near vents",
      "Allergy or asthma symptoms worse indoors",
      "Weak airflow from a running blower",
      "Ducts never cleaned in 5+ years",
      "New-construction debris in the system",
    ],
    brands: ["Carrier", "Trane", "Lennox", "Rheem", "Goodman", "American Standard", "Bryant", "York"],
    es: {
      name: "Limpieza de Ductos de Aire",
      shortName: "Ductos de Aire",
      seoNoun: "limpieza de ductos",
      gender: "f",
      description:
        "Limpieza de ductos y ventilación de secadora con presión negativa HEPA para residencias del sur de Florida — verificada con cámara, documentada con fotos, proceso NADCA.",
      longDescription:
        "El aire limpio es parte de cuidar una buena casa. Limpiamos ductos de aire acondicionado, ventilación de secadora y manejadoras con equipo de presión negativa y filtración HEPA — un proceso verificado con cámara y conforme a NADCA que extrae años de polvo, esporas de moho, caspa y pelusa en lugar de soltarlos. Cada trabajo se documenta con fotos de antes y después de sus ductos reales, y protegemos pisos y mobiliario en todo momento.",
      commonIssues: [
        "El polvo se reasienta en las superficies en un día",
        "La secadora necesita dos ciclos o trabaja caliente",
        "Olor a humedad al arrancar el A/C o moho cerca de las rejillas",
        "Síntomas de alergia o asma que empeoran adentro",
        "Flujo de aire débil con el ventilador encendido",
        "Ductos sin limpiar en más de 5 años",
        "Escombros de construcción nueva en el sistema",
      ],
    },
  },
  {
    slug: "garbage-disposal-repair",
    name: "Garbage Disposal Repair",
    shortName: "Garbage Disposal",
    seoNoun: "garbage disposal",
    description:
      "Disposal repair and stainless-chamber replacement for fine kitchens — InSinkErator Evolution, Waste King and quiet-mount premium units.",
    longDescription:
      "A jam, a leak, or a tired motor under a custom sink deserves a clean, in-place fix. We repair and replace disposals across the premium tiers — InSinkErator Evolution and Pro, Waste King quiet-mount, Moen and KitchenAid — clearing jams, resealing flanges, and squaring away dishwasher hookups. When replacement is the honest call, we fit a stainless-chamber, quiet-mount unit and seal the cabinet clean.",
    commonIssues: [
      "Disposal humming but not turning",
      "Won't power on at all",
      "Leaking under the sink cabinet",
      "Grinding or rattling on a quiet-mount unit",
      "Slow drain or backup at the disposal",
      "Reset button tripping repeatedly",
      "Persistent odor that won't clear",
    ],
    brands: ["InSinkErator", "Waste King", "Moen", "KitchenAid", "GE", "Whirlpool", "Frigidaire", "Kohler"],
    es: {
      name: "Reparación de Trituradores de Basura",
      shortName: "Triturador",
      seoNoun: "triturador de basura",
      gender: "m",
      description:
        "Reparación y reemplazo con cámara de acero inoxidable para cocinas finas — InSinkErator Evolution, Waste King y unidades premium de montaje silencioso.",
      longDescription:
        "Un atasco, una fuga o un motor cansado bajo un fregadero a medida merece una solución limpia y en sitio. Reparamos y reemplazamos trituradores en las gamas premium — InSinkErator Evolution y Pro, Waste King de montaje silencioso, Moen y KitchenAid — liberando atascos, resellando bridas y dejando en orden las conexiones del lavavajillas. Cuando el reemplazo es la decisión honesta, instalamos una unidad de cámara de acero inoxidable y montaje silencioso, y sellamos el mueble.",
      commonIssues: [
        "El triturador zumba pero no gira",
        "No enciende en absoluto",
        "Fuga bajo el mueble del fregadero",
        "Molienda o traqueteo en una unidad de montaje silencioso",
        "Drenaje lento o reflujo en el triturador",
        "El botón de reinicio se dispara repetidamente",
        "Olor persistente que no se va",
      ],
    },
  },
  {
    slug: "range-hood-repair",
    name: "Range Hood Repair",
    shortName: "Range Hood",
    seoNoun: "range hood",
    description:
      "Premium range-hood service for Wolf, Viking, Thermador, Vent-A-Hood and Zephyr — proprietary control boards and blowers our senior techs stock.",
    longDescription:
      "A statement hood over a pro range is part of the kitchen's design, and its electronics deserve a specialist. We service wall-mount, island, under-cabinet, and downdraft hoods — Wolf, Viking, Thermador, Vent-A-Hood, and Zephyr included — handling proprietary control boards, failed blowers, dead touch panels, seized dampers, and grease-loaded ducts with the brand-specific spares on the senior truck.",
    commonIssues: [
      "Blower dead at every speed",
      "Lights working but the blower won't run",
      "Rattle or grind from the motor",
      "Touch panel unresponsive or flickering",
      "Damper stuck open or refusing to close",
      "Weak suction or heavy grease loading",
      "LED strip or halogen lighting burned out",
    ],
    brands: ["Wolf", "Viking", "Thermador", "Vent-A-Hood", "Zephyr", "Broan", "Best", "Faber", "Bosch", "KitchenAid", "GE", "Samsung"],
    es: {
      name: "Reparación de Campanas de Cocina",
      shortName: "Campana",
      seoNoun: "campana de cocina",
      gender: "f",
      description:
        "Servicio premium de campanas para Wolf, Viking, Thermador, Vent-A-Hood y Zephyr — tarjetas de control propietarias y extractores que nuestros técnicos senior tienen en stock.",
      longDescription:
        "Una campana de diseño sobre una estufa profesional es parte de la cocina, y su electrónica merece un especialista. Servimos campanas de pared, de isla, bajo gabinete y de extracción descendente — incluyendo Wolf, Viking, Thermador, Vent-A-Hood y Zephyr — atendiendo tarjetas de control propietarias, extractores dañados, paneles táctiles muertos, compuertas trabadas y ductos saturados de grasa, con las piezas específicas de cada marca en el camión senior.",
      commonIssues: [
        "El extractor no enciende en ninguna velocidad",
        "Las luces funcionan pero el extractor no",
        "Traqueteo o ruido del motor",
        "Panel táctil que no responde o parpadea",
        "Compuerta trabada abierta o que no cierra",
        "Succión débil o fuerte acumulación de grasa",
        "Tira LED o focos halógenos quemados",
      ],
    },
  },
  {
    slug: "wine-cooler-repair",
    name: "Wine Cooler Repair",
    shortName: "Wine Cooler",
    seoNoun: "wine cooler",
    description:
      "Wine cellar and cooler service for Sub-Zero, EuroCave, Marvel and Viking — protecting collections worth multiples of the appliance, by EPA-608 techs.",
    longDescription:
      "When the cooling protects a collection worth far more than the cabinet, the service has to match. We restore dual-zone and single-zone wine units — Sub-Zero 424/427/430 columns, EuroCave Premiere and S-series, Marvel, Viking, and Wine Enthusiast — diagnosing zone drift, condensation, and noise with calibrated probes, and handling sealed-system work under EPA Section 608 Universal certification before a warm zone ever costs you a vintage.",
    commonIssues: [
      "A zone drifting above its set point",
      "Condensation forming inside the cabinet",
      "Compressor or fan noise on a column unit",
      "Display or control unresponsive",
      "Door or divider seal no longer sealing",
    ],
    brands: ["Sub-Zero", "Viking", "Thermador", "Wine Enthusiast", "EuroCave", "Marvel", "U-Line"],
    es: {
      name: "Reparación de Cavas de Vino",
      shortName: "Cava de Vino",
      seoNoun: "cava de vino",
      gender: "f",
      description:
        "Servicio de cavas y enfriadores de vino para Sub-Zero, EuroCave, Marvel y Viking — protegiendo colecciones que valen múltiplos del equipo, por técnicos EPA-608.",
      longDescription:
        "Cuando el enfriamiento protege una colección que vale mucho más que el mueble, el servicio debe estar a la altura. Restauramos cavas de una y dos zonas — columnas Sub-Zero 424/427/430, EuroCave Premiere y serie S, Marvel, Viking y Wine Enthusiast — diagnosticando la desviación de zona, la condensación y el ruido con sondas calibradas, y atendiendo el sistema sellado bajo certificación EPA Sección 608 Universal antes de que una zona tibia le cueste una añada.",
      commonIssues: [
        "Una zona que sube por encima de su temperatura",
        "Condensación dentro del mueble",
        "Ruido de compresor o ventilador en una unidad de columna",
        "Pantalla o control sin respuesta",
        "El empaque de la puerta o del divisor ya no sella",
      ],
    },
  },
];

export const SERVICE_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s]),
);
