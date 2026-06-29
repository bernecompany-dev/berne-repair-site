/**
 * LUXURY APPLIANCE REPAIR & CARE COST GUIDE — data asset.
 *
 * A single, hand-authored, link-worthy reference: typical repair-cost ranges,
 * common failures (symptom → likely part → error/fault indication → repair $),
 * and a transparent repair-vs-replace model for high-end built-in appliances
 * (Sub-Zero, Wolf, Miele, Thermador, Viking, Gaggenau, Liebherr, Dacor, and
 * built-in Bosch).
 *
 * SOURCING / METHODOLOGY
 * ----------------------
 * Figures are AGGREGATED, not invented. Where the Berne service desk has
 * published a concrete range (built-in coffee systems, warming drawers, wine
 * columns, sealed-system refrigeration — see data/highend/* and the blog) we
 * reuse it. Where no single published number exists we publish a reasoned range
 * grounded in (a) the appliance's serviceable architecture, (b) the part's
 * OEM cost band, and (c) South-Florida labor at the company's standard rate.
 * Every range is a *quote-before-work* estimate; the firm number always comes
 * from the $59 on-site diagnostic (credited to the repair). Ranges EXCLUDE the
 * diagnostic fee and assume the part is available. Error/fault codes vary by
 * model year — the codes shown are the most common indications, not a
 * model-specific lookup.
 *
 * This file is the single source of truth for BOTH the printed cost tables and
 * the interactive repair-vs-replace calculator, so the on-page numbers and the
 * tool can never drift apart.
 */

export type LocalizedText = { en: string; es: string };

/** One row in a category's failure/cost table. */
export type CostRow = {
  /** Homeowner-facing symptom. */
  symptom: LocalizedText;
  /** The part / system at fault, tech voice. */
  part: LocalizedText;
  /** Common error / fault indication, if the platform surfaces one. "" = none. */
  code: string;
  /** Typical repair cost low/high in USD (parts + labor, excl. $59 diagnostic). */
  repairLow: number;
  repairHigh: number;
};

export type LuxCategory = {
  id: string;
  /** Display name. */
  name: LocalizedText;
  /** Short label for the calculator <select>. */
  shortName: LocalizedText;
  /** Representative luxury brands for this category. */
  brands: string[];
  /** Example models / platforms (real, well-known). */
  examples: LocalizedText;
  /** One-paragraph context for the table section. */
  blurb: LocalizedText;
  /** Replacement cost band for a comparable LUXURY unit (installed). */
  replacementLow: number;
  replacementHigh: number;
  /** Expected service life of a well-maintained luxury unit, years. */
  expectedLifeYears: number;
  /**
   * Repair-worth threshold as a fraction of replacement cost. Luxury built-ins
   * carry a HIGHER threshold than the textbook 50% rule because replacement
   * almost always drags in cabinetry/panel/installation cost and a long lead
   * time — so a repair stays the rational choice further up the cost curve.
   */
  repairThresholdPct: number;
  /** Internal link to the matching service/brand hub. */
  href: string;
  /** Failure/cost rows. */
  rows: CostRow[];
};

const f = (en: string, es: string): LocalizedText => ({ en, es });

export const LUX_CATEGORIES: LuxCategory[] = [
  {
    id: "built-in-refrigeration",
    name: f("Built-in & Column Refrigeration", "Refrigeración empotrada y de columna"),
    shortName: f("Built-in refrigerator / column", "Refrigerador empotrado / columna"),
    brands: ["Sub-Zero", "Thermador", "Miele", "Liebherr", "Viking", "Monogram"],
    examples: f(
      "Sub-Zero 600/700-series & BI/IT built-ins, Designer column fridge & freezer, Thermador Freedom columns, Liebherr Monolith.",
      "Sub-Zero series 600/700 y empotrados BI/IT, columnas Designer de refrigerador y congelador, columnas Thermador Freedom, Liebherr Monolith.",
    ),
    blurb: f(
      "The most expensive appliance in a luxury kitchen and the one most worth saving. A built-in or column unit is a sealed refrigeration system behind a custom panel — most failures are an airflow, defrost, or control fault long before the compressor itself, and replacement means matching cabinetry and a multi-week lead time.",
      "El electrodoméstico más caro de una cocina de lujo y el que más vale la pena salvar. Una unidad empotrada o de columna es un sistema de refrigeración sellado tras un panel a medida — la mayoría de las fallas son de flujo de aire, descongelación o control mucho antes que el compresor, y reemplazar implica igualar la carpintería y semanas de espera.",
    ),
    replacementLow: 8000,
    replacementHigh: 18000,
    expectedLifeYears: 20,
    repairThresholdPct: 0.6,
    href: "/brands/sub-zero",
    rows: [
      {
        symptom: f("Not cooling / drifting warm, compressor runs", "No enfría / se entibia, el compresor funciona"),
        part: f("Condenser/evaporator fan, dirty condenser, or control board", "Ventilador del condensador/evaporador, condensador sucio o placa de control"),
        code: "",
        repairLow: 250,
        repairHigh: 700,
      },
      {
        symptom: f("Frost build-up / freezer over-icing", "Acumulación de escarcha / exceso de hielo en el congelador"),
        part: f("Defrost heater, defrost thermostat, or defrost control", "Resistencia de descongelación, termostato o control de descongelación"),
        code: "",
        repairLow: 300,
        repairHigh: 650,
      },
      {
        symptom: f("Dual-display flashing / 'Service' indication", "Pantalla doble parpadeando / indicación de 'Servicio'"),
        part: f("Main control board or temperature sensor (thermistor)", "Placa de control principal o sensor de temperatura (termistor)"),
        code: "Sub-Zero: flashing temp / Service",
        repairLow: 350,
        repairHigh: 900,
      },
      {
        symptom: f("Won't hold temperature, runs constantly", "No mantiene la temperatura, funciona sin parar"),
        part: f("Sealed-system leak or restriction (EPA 608 work)", "Fuga o restricción del sistema sellado (trabajo EPA 608)"),
        code: "",
        repairLow: 600,
        repairHigh: 1800,
      },
      {
        symptom: f("Condensation, warm spots, or door not sealing", "Condensación, zonas tibias o puerta que no sella"),
        part: f("Door gasket / hinge alignment", "Empaque de la puerta / alineación de la bisagra"),
        code: "",
        repairLow: 200,
        repairHigh: 500,
      },
      {
        symptom: f("Ice maker not producing", "La fábrica de hielo no produce"),
        part: f("Water valve, ice-maker module, or clogged line", "Válvula de agua, módulo de la fábrica de hielo o línea obstruida"),
        code: "",
        repairLow: 180,
        repairHigh: 600,
      },
    ],
  },
  {
    id: "pro-ranges-cooktops",
    name: f("Pro Ranges, Rangetops & Cooktops", "Cocinas, rangos y placas profesionales"),
    shortName: f("Pro range / rangetop / cooktop", "Cocina / rango / placa profesional"),
    brands: ["Wolf", "Viking", "Thermador", "Gaggenau", "Dacor", "Miele"],
    examples: f(
      "Wolf 36\"/48\" dual-fuel & gas ranges, Viking Professional, Thermador Pro Grand, Gaggenau Vario cooktops, Wolf induction.",
      "Cocinas Wolf de 36\"/48\" dual-fuel y a gas, Viking Professional, Thermador Pro Grand, placas Gaggenau Vario, inducción Wolf.",
    ),
    blurb: f(
      "Pro ranges are simple, rugged, and very repairable — most calls are a spark igniter, an oven sensor, or a bake/broil element, all bolt-in parts. The cabinet and burners outlive the electronics, so repair is almost always the value play versus a four-to-five-figure replacement.",
      "Las cocinas profesionales son simples, robustas y muy reparables — la mayoría de las llamadas son un encendedor de chispa, un sensor del horno o una resistencia, todas piezas atornilladas. El cuerpo y los quemadores duran más que la electrónica, así que reparar casi siempre conviene frente a un reemplazo de cinco cifras.",
    ),
    replacementLow: 6000,
    replacementHigh: 15000,
    expectedLifeYears: 18,
    repairThresholdPct: 0.55,
    href: "/brands/wolf",
    rows: [
      {
        symptom: f("Burner clicks but won't light / won't stay lit", "El quemador hace clic pero no enciende / no se mantiene"),
        part: f("Spark igniter / electrode, spark module, or gas valve", "Encendedor/electrodo de chispa, módulo de chispa o válvula de gas"),
        code: "",
        repairLow: 180,
        repairHigh: 480,
      },
      {
        symptom: f("Oven won't heat or won't reach temperature", "El horno no calienta o no alcanza la temperatura"),
        part: f("Bake/broil element, igniter (gas), or oven temp sensor", "Resistencia de hornear/asar, encendedor (gas) o sensor de temperatura"),
        code: "",
        repairLow: 220,
        repairHigh: 600,
      },
      {
        symptom: f("Oven temperature off / food burning or undercooking", "Temperatura del horno errónea / comida quemada o cruda"),
        part: f("Oven temperature sensor (RTD) or control recalibration", "Sensor de temperatura del horno (RTD) o recalibración del control"),
        code: "",
        repairLow: 180,
        repairHigh: 450,
      },
      {
        symptom: f("Display dark, controls dead, or error on panel", "Pantalla apagada, controles muertos o error en el panel"),
        part: f("Control board / relay board or membrane panel", "Placa de control / placa de relés o panel de membrana"),
        code: "",
        repairLow: 350,
        repairHigh: 950,
      },
      {
        symptom: f("Induction zone not heating / fault code", "Zona de inducción que no calienta / código de falla"),
        part: f("Induction power board or coil", "Placa de potencia de inducción o bobina"),
        code: "",
        repairLow: 400,
        repairHigh: 1100,
      },
    ],
  },
  {
    id: "wall-ovens",
    name: f("Built-in & Double Wall Ovens", "Hornos empotrados y dobles de pared"),
    shortName: f("Wall oven (single / double)", "Horno de pared (sencillo / doble)"),
    brands: ["Wolf", "Miele", "Thermador", "Gaggenau", "Viking", "Dacor"],
    examples: f(
      "Wolf M-series & E-series, Miele steam & combi-steam ovens, Thermador Masterpiece, Gaggenau 200/400-series.",
      "Wolf serie M y E, hornos de vapor y combi-vapor Miele, Thermador Masterpiece, Gaggenau serie 200/400.",
    ),
    blurb: f(
      "A built-in wall oven is a heating element, an igniter or two, a temperature sensor, a control board, and a hinge — a serviceable machine. Steam and combi-steam ovens add a water circuit and a few more sensors. Replacing one means pulling it from a custom cabinet, so a repair usually wins on both cost and disruption.",
      "Un horno de pared empotrado es una resistencia, uno o dos encendedores, un sensor de temperatura, una placa de control y una bisagra — una máquina reparable. Los hornos de vapor y combi-vapor añaden un circuito de agua y algunos sensores más. Reemplazar uno implica sacarlo de un mueble a medida, así que la reparación suele ganar en costo y molestias.",
    ),
    replacementLow: 4000,
    replacementHigh: 12000,
    expectedLifeYears: 16,
    repairThresholdPct: 0.55,
    href: "/services/oven-repair",
    rows: [
      {
        symptom: f("Won't heat / no bake or broil", "No calienta / no hornea ni asa"),
        part: f("Bake or broil element / igniter, or relay board", "Resistencia de hornear o asar / encendedor, o placa de relés"),
        code: "",
        repairLow: 220,
        repairHigh: 600,
      },
      {
        symptom: f("Temperature inaccurate / uneven baking", "Temperatura inexacta / horneado disparejo"),
        part: f("Oven temperature sensor (RTD) or convection fan motor", "Sensor de temperatura (RTD) o motor del ventilador de convección"),
        code: "",
        repairLow: 180,
        repairHigh: 500,
      },
      {
        symptom: f("Touch panel dark or unresponsive", "Panel táctil apagado o sin respuesta"),
        part: f("Control board or touch/membrane panel", "Placa de control o panel táctil/de membrana"),
        code: "",
        repairLow: 350,
        repairHigh: 1000,
      },
      {
        symptom: f("Steam oven won't generate steam / leaks", "El horno de vapor no genera vapor / gotea"),
        part: f("Water pump, valve, or steam-generator sensor", "Bomba de agua, válvula o sensor del generador de vapor"),
        code: "",
        repairLow: 300,
        repairHigh: 750,
      },
      {
        symptom: f("Door won't close flush / hinge sag", "La puerta no cierra al ras / bisagra caída"),
        part: f("Oven door hinge or spring set", "Bisagra de la puerta o juego de resortes"),
        code: "",
        repairLow: 180,
        repairHigh: 450,
      },
    ],
  },
  {
    id: "built-in-dishwashers",
    name: f("Built-in & Panel-Ready Dishwashers", "Lavavajillas empotrados y panel-ready"),
    shortName: f("Dishwasher (built-in)", "Lavavajillas (empotrado)"),
    brands: ["Miele", "Bosch", "Thermador", "Gaggenau", "Viking"],
    examples: f(
      "Miele G-series & Futura, Bosch Benchmark, Thermador Star-Sapphire/Emerald, Gaggenau 400-series, panel-ready installs.",
      "Miele serie G y Futura, Bosch Benchmark, Thermador Star-Sapphire/Emerald, Gaggenau serie 400, instalaciones panel-ready.",
    ),
    blurb: f(
      "Luxury dishwashers fail predictably — a drain pump, a clogged sump, a door latch, or a leak-protection (float) trip. They surface a fault code that points the way, and parts are widely serviceable. The exception is a failed main board, where the repair-vs-replace math gets closer.",
      "Los lavavajillas de lujo fallan de forma predecible — bomba de desagüe, sumidero obstruido, pestillo de la puerta o protección antifugas (flotador). Muestran un código de falla que orienta, y las piezas son muy reparables. La excepción es una placa principal averiada, donde la cuenta reparar-vs-reemplazar se ajusta.",
    ),
    replacementLow: 1400,
    replacementHigh: 3500,
    expectedLifeYears: 12,
    repairThresholdPct: 0.55,
    href: "/services/dishwasher-repair",
    rows: [
      {
        symptom: f("Won't drain / water left in the tub", "No desagua / queda agua en la cuba"),
        part: f("Drain pump or clogged sump/filter", "Bomba de desagüe o sumidero/filtro obstruido"),
        code: "Miele F11 · Bosch E24",
        repairLow: 180,
        repairHigh: 420,
      },
      {
        symptom: f("Leak / water in the base pan", "Fuga / agua en la base"),
        part: f("Float / leak-protection (Aquastop) system or door seal", "Sistema antifugas (flotador / Aquastop) o sello de la puerta"),
        code: "Miele F70 · Bosch E15",
        repairLow: 200,
        repairHigh: 480,
      },
      {
        symptom: f("Not cleaning / no spray pressure", "No limpia / sin presión de rociado"),
        part: f("Circulation pump or spray-arm blockage", "Bomba de circulación o brazo aspersor obstruido"),
        code: "",
        repairLow: 220,
        repairHigh: 520,
      },
      {
        symptom: f("Won't start / door won't latch", "No arranca / la puerta no cierra"),
        part: f("Door latch / interlock switch", "Pestillo de la puerta / interruptor de bloqueo"),
        code: "",
        repairLow: 160,
        repairHigh: 380,
      },
      {
        symptom: f("Dishes come out cold/wet / won't heat", "Los platos salen fríos/mojados / no calienta"),
        part: f("Heating element / flow-through heater or NTC sensor", "Resistencia / calentador de paso o sensor NTC"),
        code: "Miele F24",
        repairLow: 220,
        repairHigh: 550,
      },
    ],
  },
  {
    id: "wine-columns",
    name: f("Wine Columns & Built-in Wine Coolers", "Columnas de vino y enfriadores empotrados"),
    shortName: f("Wine column / cooler", "Columna de vino / enfriador"),
    brands: ["Sub-Zero", "Miele", "Thermador", "Liebherr", "Viking", "Gaggenau"],
    examples: f(
      "Sub-Zero designer wine storage, Miele KWT, Thermador Freedom wine column, Liebherr Vinidor dual-zone.",
      "Almacenamiento de vino Sub-Zero designer, Miele KWT, columna de vino Thermador Freedom, Liebherr Vinidor de doble zona.",
    ),
    blurb: f(
      "A wine column is precision refrigeration tuned for a narrow band and (often) two independent zones. Most failures are a fan, a thermostat/sensor, or a door seal letting Florida humidity in — all repairable. A sealed-system leak is the higher-cost case, still well under replacement.",
      "Una columna de vino es refrigeración de precisión ajustada a un rango estrecho y (a menudo) dos zonas independientes. La mayoría de las fallas son un ventilador, un termostato/sensor o un sello que deja entrar la humedad de Florida — todo reparable. Una fuga del sistema sellado es el caso más costoso, aún muy por debajo del reemplazo.",
    ),
    replacementLow: 3000,
    replacementHigh: 12000,
    expectedLifeYears: 14,
    repairThresholdPct: 0.55,
    href: "/services/wine-cooler-repair",
    rows: [
      {
        symptom: f("Not cooling / temperature drifting up", "No enfría / la temperatura sube"),
        part: f("Evaporator/condenser fan or temperature sensor", "Ventilador del evaporador/condensador o sensor de temperatura"),
        code: "",
        repairLow: 200,
        repairHigh: 550,
      },
      {
        symptom: f("One zone warm (dual-zone unit)", "Una zona tibia (unidad de doble zona)"),
        part: f("Zone damper, second fan, or zone sensor", "Compuerta de zona, segundo ventilador o sensor de zona"),
        code: "",
        repairLow: 220,
        repairHigh: 600,
      },
      {
        symptom: f("Condensation / sweating, seal fogging", "Condensación / sudoración, vidrio empañado"),
        part: f("Door gasket or UV-glass door seal", "Empaque de la puerta o sello de la puerta de vidrio UV"),
        code: "",
        repairLow: 180,
        repairHigh: 450,
      },
      {
        symptom: f("Compressor runs constantly, never cold enough", "El compresor funciona sin parar y nunca enfría bien"),
        part: f("Sealed-system leak/restriction (EPA 608 work)", "Fuga/restricción del sistema sellado (trabajo EPA 608)"),
        code: "",
        repairLow: 500,
        repairHigh: 1400,
      },
    ],
  },
  {
    id: "warming-drawers",
    name: f("Warming Drawers & Warming Ovens", "Cajones y hornos calentadores"),
    shortName: f("Warming drawer", "Cajón calentador"),
    brands: ["Wolf", "Miele", "Thermador", "Gaggenau", "Dacor"],
    examples: f(
      "Wolf WWD, Miele ESW, Thermador WD/WDC, Gaggenau WS, panel-ready drawers.",
      "Wolf WWD, Miele ESW, Thermador WD/WDC, Gaggenau WS, cajones panel-ready.",
    ),
    blurb: f(
      "A warming drawer is heat, a thermostat, a control, a drawer mechanism, and a humidity vent — the whole machine. The common failures (an open element, a drifted thermostat, sticky glides) are inexpensive parts and a straightforward job, so repair is almost always the clear value.",
      "Un cajón calentador es resistencia, termostato, control, mecanismo del cajón y ventilación de humedad — toda la máquina. Las fallas comunes (resistencia abierta, termostato descalibrado, rieles trabados) son piezas económicas y trabajo sencillo, así que reparar casi siempre es el valor claro.",
    ),
    replacementLow: 1500,
    replacementHigh: 3500,
    expectedLifeYears: 15,
    repairThresholdPct: 0.5,
    href: "/services/warming-drawer-repair",
    rows: [
      {
        symptom: f("Powers on but never gets warm", "Enciende pero nunca calienta"),
        part: f("Open heating element or tripped thermal fuse", "Resistencia abierta o fusible térmico disparado"),
        code: "",
        repairLow: 160,
        repairHigh: 400,
      },
      {
        symptom: f("Runs too hot / scorches or dries food", "Calienta de más / quema o reseca la comida"),
        part: f("Thermostat or temperature sensor (NTC)", "Termostato o sensor de temperatura (NTC)"),
        code: "",
        repairLow: 180,
        repairHigh: 420,
      },
      {
        symptom: f("Dead display / unresponsive controls", "Pantalla apagada / controles sin respuesta"),
        part: f("Control board or touch panel (or supply wiring)", "Placa de control o panel táctil (o cableado de alimentación)"),
        code: "",
        repairLow: 200,
        repairHigh: 550,
      },
      {
        symptom: f("Drawer drags, grinds, or won't close flush", "El cajón se traba, raspa o no cierra al ras"),
        part: f("Telescopic glides or latch/spring", "Rieles telescópicos o pestillo/resorte"),
        code: "",
        repairLow: 150,
        repairHigh: 380,
      },
    ],
  },
  {
    id: "built-in-coffee",
    name: f("Built-in & Plumbed Coffee Systems", "Sistemas de café empotrados y conectados al agua"),
    shortName: f("Built-in coffee system", "Sistema de café empotrado"),
    brands: ["Miele", "Gaggenau", "Wolf", "Thermador", "Jura"],
    examples: f(
      "Miele CVA, Gaggenau 200/400-series, Wolf & Thermador coffee systems, Jura Giga, La Marzocco.",
      "Miele CVA, Gaggenau serie 200/400, sistemas de café Wolf y Thermador, Jura Giga, La Marzocco.",
    ),
    blurb: f(
      "These machines cost as much as a small car and are engineered to be rebuilt — brew units, seals, pumps, valves, and boilers are all serviceable. In South Florida's hard water, scale is the number-one killer; a professional descale plus a worn seal or 3-way valve restores a five-figure machine for a small fraction of replacement.",
      "Estas máquinas cuestan tanto como un auto pequeño y están diseñadas para reconstruirse — grupos de café, sellos, bombas, válvulas y calderas son reparables. Con el agua dura del sur de Florida, la cal es el enemigo número uno; una descalcificación profesional más un sello gastado o una válvula de 3 vías revive una máquina de cinco cifras por una fracción del reemplazo.",
    ),
    replacementLow: 4000,
    replacementHigh: 15000,
    expectedLifeYears: 12,
    repairThresholdPct: 0.5,
    href: "/services/coffee-machine-repair",
    rows: [
      {
        symptom: f("'Descale' won't clear / weak, cold shots", "El mensaje de 'descalcificar' no se quita / café flojo y frío"),
        part: f("Scaled boiler/brew circuit + worn brew-unit seal", "Caldera/circuito obstruido por cal + sello del grupo gastado"),
        code: "Descale message",
        repairLow: 250,
        repairHigh: 600,
      },
      {
        symptom: f("No water / no pressure through the group", "Sin agua / sin presión por el grupo"),
        part: f("Clogged 3-way solenoid valve or pump", "Electroválvula de 3 vías obstruida o bomba"),
        code: "",
        repairLow: 220,
        repairHigh: 550,
      },
      {
        symptom: f("Brew temperature wrong / heating fault", "Temperatura de preparación incorrecta / falla de calentamiento"),
        part: f("NTC temperature sensor or heating element/thermoblock", "Sensor de temperatura NTC o resistencia/thermoblock"),
        code: "",
        repairLow: 250,
        repairHigh: 650,
      },
      {
        symptom: f("Grinder jammed or grinding inconsistently", "Molino atascado o muele de forma irregular"),
        part: f("Burr set or grinder motor/gearbox", "Juego de muelas o motor/caja del molino"),
        code: "",
        repairLow: 200,
        repairHigh: 500,
      },
    ],
  },
];

export const LUX_CATEGORY_BY_ID: Record<string, LuxCategory> = Object.fromEntries(
  LUX_CATEGORIES.map((c) => [c.id, c]),
);

/**
 * Brand modifier applied to a category's replacement-cost band in the
 * calculator. Reflects where a brand sits within the luxury tier (a Sub-Zero
 * column costs more to replace than a Viking; a Gaggenau oven more than a
 * Dacor). 1.0 = the category's mid-band. Used ONLY to nudge the replacement
 * estimate so the repair-vs-replace ratio is realistic for the chosen brand.
 */
export const BRAND_REPLACEMENT_FACTOR: Record<string, number> = {
  "Sub-Zero": 1.15,
  Gaggenau: 1.2,
  Wolf: 1.1,
  Miele: 1.05,
  Thermador: 1.0,
  Liebherr: 1.0,
  Viking: 0.95,
  Dacor: 0.9,
  Bosch: 0.85,
  Monogram: 0.9,
  Jura: 0.9,
  Other: 1.0,
};

export const CALCULATOR_BRANDS = [
  "Sub-Zero",
  "Wolf",
  "Miele",
  "Thermador",
  "Viking",
  "Gaggenau",
  "Liebherr",
  "Dacor",
  "Bosch",
  "Monogram",
  "Other",
];

export type Verdict = "repair" | "lean-repair" | "borderline" | "replace";

export type CalcResult = {
  verdict: Verdict;
  /** Replacement estimate used (USD). */
  replacementEstimate: number;
  /** repairCost / replacementEstimate, 0-1+. */
  ratio: number;
  /** Cost threshold actually applied after age adjustment, 0-1. */
  appliedThresholdPct: number;
  /** Fraction of expected service life already used, 0-1+. */
  lifeUsed: number;
};

/**
 * Repair-vs-replace model for LUXURY built-ins. Transparent and deterministic
 * so the on-page explanation matches the math exactly.
 *
 *  1. Replacement estimate = category mid-band × brand factor.
 *  2. ratio = repairCost / replacement estimate.
 *  3. The category's base cost threshold is RELAXED for younger units and
 *     TIGHTENED for units near end of life (older = replace at a lower ratio).
 *  4. Verdict bands around the age-adjusted threshold.
 */
export function evaluateRepairOrReplace(args: {
  categoryId: string;
  brand: string;
  ageYears: number;
  repairCost: number;
}): CalcResult {
  const cat = LUX_CATEGORY_BY_ID[args.categoryId] ?? LUX_CATEGORIES[0];
  const factor = BRAND_REPLACEMENT_FACTOR[args.brand] ?? 1.0;
  const mid = (cat.replacementLow + cat.replacementHigh) / 2;
  const replacementEstimate = Math.round((mid * factor) / 50) * 50;

  const repairCost = Math.max(0, args.repairCost || 0);
  const ratio = replacementEstimate > 0 ? repairCost / replacementEstimate : 0;

  const lifeUsed = cat.expectedLifeYears > 0 ? args.ageYears / cat.expectedLifeYears : 0;

  // Age adjustment: a unit with most of its life left earns up to +0.12 on the
  // threshold (repair further up the cost curve); a unit past its expected life
  // loses up to -0.20 (replace sooner). Clamped to a sane 0.30–0.80 window.
  const ageAdj = 0.12 - lifeUsed * 0.32;
  const appliedThresholdPct = Math.min(
    0.8,
    Math.max(0.3, cat.repairThresholdPct + ageAdj),
  );

  let verdict: Verdict;
  if (ratio <= appliedThresholdPct * 0.6) verdict = "repair";
  else if (ratio <= appliedThresholdPct) verdict = "lean-repair";
  else if (ratio <= appliedThresholdPct * 1.25) verdict = "borderline";
  else verdict = "replace";

  return { verdict, replacementEstimate, ratio, appliedThresholdPct, lifeUsed };
}

/** Cited stat blocks for the asset (link-worthy pull quotes). */
export const LUX_STATS: { value: string; label: LocalizedText }[] = [
  {
    value: "20+ yrs",
    label: f(
      "Expected service life of a well-maintained built-in Sub-Zero — far longer than the 10–13 yrs of a mass-market fridge.",
      "Vida útil esperada de un Sub-Zero empotrado bien mantenido — mucho más que los 10–13 años de un refrigerador común.",
    ),
  },
  {
    value: "~60%",
    label: f(
      "Repair-worth threshold we apply to luxury built-ins — higher than the textbook 50% rule, because replacement drags in cabinetry and lead time.",
      "Umbral de conveniencia de reparación que aplicamos a empotrados de lujo — mayor que la regla clásica del 50%, porque reemplazar arrastra carpintería y tiempo de espera.",
    ),
  },
  {
    value: "200–350 ppm",
    label: f(
      "Typical South-Florida tap-water hardness — the single biggest driver of scale failures in built-in coffee systems and steam ovens.",
      "Dureza típica del agua del grifo en el sur de Florida — el mayor causante de fallas por cal en sistemas de café y hornos de vapor.",
    ),
  },
  {
    value: "$59",
    label: f(
      "Flat on-site diagnostic, credited to the repair — you get a firm written quote before any work begins.",
      "Diagnóstico fijo a domicilio, abonado a la reparación — recibe un presupuesto firme por escrito antes de empezar.",
    ),
  },
];

export const LUX_FAQS: { question: LocalizedText; answer: LocalizedText }[] = [
  {
    question: f(
      "How much does it cost to repair a Sub-Zero or other built-in refrigerator?",
      "¿Cuánto cuesta reparar un Sub-Zero u otro refrigerador empotrado?",
    ),
    answer: f(
      "Most built-in refrigeration repairs fall between about $250 and $900 — a condenser/evaporator fan, a defrost component, a temperature sensor, or a control board. A sealed-system repair (a refrigerant leak or restriction, which by law requires an EPA 608-certified technician) typically runs $600–$1,800. Because a comparable built-in or column unit costs $8,000–$18,000 installed, repair is almost always the rational choice. Every job starts with a flat $59 diagnostic, credited to the repair, and a written quote.",
      "La mayoría de las reparaciones de refrigeración empotrada cuestan entre $250 y $900 — un ventilador del condensador/evaporador, un componente de descongelación, un sensor de temperatura o una placa de control. Una reparación del sistema sellado (fuga o restricción de refrigerante, que por ley requiere un técnico certificado EPA 608) suele costar $600–$1,800. Como una unidad empotrada o de columna comparable cuesta $8,000–$18,000 instalada, reparar casi siempre es lo razonable. Todo trabajo empieza con un diagnóstico fijo de $59, abonado a la reparación, y un presupuesto por escrito.",
    ),
  },
  {
    question: f(
      "When is it worth repairing a high-end appliance instead of replacing it?",
      "¿Cuándo conviene reparar un electrodoméstico de alta gama en lugar de reemplazarlo?",
    ),
    answer: f(
      "For luxury built-ins we use a higher threshold than the usual 50% rule: repair generally makes sense as long as the repair costs less than roughly 55–60% of replacement AND the unit still has meaningful service life left. The reason is that replacing a built-in or panel-ready unit isn't just the appliance — it drags in cabinetry matching, installation, and a multi-week lead time. Our calculator on this page applies that logic to your specific brand, age, and quote.",
      "Para empotrados de lujo usamos un umbral más alto que la regla habitual del 50%: reparar suele convenir mientras la reparación cueste menos de un 55–60% del reemplazo Y a la unidad le quede vida útil significativa. El motivo es que reemplazar una unidad empotrada o panel-ready no es solo el electrodoméstico — arrastra igualar la carpintería, la instalación y semanas de espera. La calculadora de esta página aplica esa lógica a su marca, antigüedad y presupuesto.",
    ),
  },
  {
    question: f(
      "Why do luxury appliances justify repair at a higher cost than ordinary ones?",
      "¿Por qué los electrodomésticos de lujo justifican una reparación más cara que los comunes?",
    ),
    answer: f(
      "Three reasons. First, they're built to be rebuilt — brew units, sealed systems, elements, pumps, and boards are designed as serviceable parts, which is part of why they cost what they do. Second, they last far longer (a built-in Sub-Zero can run 20+ years), so a repair buys many more years than the same repair on a mass-market unit. Third, replacement triggers cabinetry and installation costs that a freestanding appliance never does. The result is that the break-even point sits higher up the cost curve.",
      "Tres razones. Primera, están hechos para reconstruirse — grupos de café, sistemas sellados, resistencias, bombas y placas son piezas reparables, parte de por qué cuestan lo que cuestan. Segunda, duran mucho más (un Sub-Zero empotrado puede durar más de 20 años), así que una reparación da muchos más años que la misma reparación en una unidad común. Tercera, reemplazar dispara costos de carpintería e instalación que un electrodoméstico independiente nunca tiene. El resultado es que el punto de equilibrio queda más arriba en la curva de costo.",
    ),
  },
  {
    question: f(
      "Are these repair prices guaranteed?",
      "¿Estos precios de reparación están garantizados?",
    ),
    answer: f(
      "The ranges on this page are aggregated estimates to help you budget — they exclude the diagnostic fee and assume the part is available. The firm number always comes from the on-site $59 diagnostic, where a technician confirms the fault and gives you a written quote with parts and labor before any work begins. You only pay the $59 if you decide not to proceed.",
      "Los rangos de esta página son estimaciones agregadas para ayudarle a presupuestar — excluyen la tarifa de diagnóstico y asumen que la pieza está disponible. El número firme siempre sale del diagnóstico a domicilio de $59, donde un técnico confirma la falla y le da un presupuesto por escrito con piezas y mano de obra antes de empezar. Solo paga los $59 si decide no continuar.",
    ),
  },
  {
    question: f(
      "Can you still get parts for Sub-Zero, Wolf, Miele, and Gaggenau?",
      "¿Todavía consiguen piezas para Sub-Zero, Wolf, Miele y Gaggenau?",
    ),
    answer: f(
      "Yes. Sub-Zero, Wolf, Thermador, and KitchenAid parts are widely available and many ride on our trucks. Miele, Gaggenau, Liebherr, and Dacor parts are ordered direct from the distributor, usually a 2–4 business-day wait. We give you the exact part number and price up front, so there are no surprises.",
      "Sí. Las piezas Sub-Zero, Wolf, Thermador y KitchenAid están muy disponibles y muchas van en nuestros camiones. Las piezas Miele, Gaggenau, Liebherr y Dacor se piden directo al distribuidor, normalmente de 2 a 4 días hábiles. Le damos el número de pieza exacto y el precio por adelantado, sin sorpresas.",
    ),
  },
];

/**
 * Cited diagnostic benchmarks — the actual meter readings our techs test
 * against. Highly citable, brand-specific facts that make this asset a
 * reference rather than a sales page.
 */
export const DIAGNOSTIC_BENCHMARKS: { metric: LocalizedText; value: string }[] = [
  {
    metric: f(
      "Warming-drawer heating element (Wolf WWD, Miele ESW) — healthy resistance",
      "Resistencia de cajón calentador (Wolf WWD, Miele ESW) — valor sano",
    ),
    value: "20–40 Ω (OL = open / dead)",
  },
  {
    metric: f(
      "Wolf glow-bar oven igniter — healthy current draw",
      "Encendedor de barra incandescente Wolf — consumo de corriente sano",
    ),
    value: "3.2–3.6 A (≤2.5 A = failing)",
  },
  {
    metric: f(
      "Built-in coffee NTC temperature sensor — at room temperature",
      "Sensor NTC de café empotrado — a temperatura ambiente",
    ),
    value: "~1080 Ω",
  },
  {
    metric: f(
      "Espresso brew pressure for proper extraction",
      "Presión de preparación de espresso para una extracción correcta",
    ),
    value: "~9 bar",
  },
  {
    metric: f(
      "South-Florida tap-water hardness driving scale failures",
      "Dureza del agua del sur de Florida que provoca fallas por cal",
    ),
    value: "200–350 ppm",
  },
];

/** Methodology / E-E-A-T bullets. */
export const LUX_METHODOLOGY: LocalizedText[] = [
  f(
    "Factory-trained, EPA Section 608 Universal certified technicians — the certification legally required to open the sealed refrigeration systems inside built-in fridges, wine columns, and cold plunges.",
    "Técnicos formados de fábrica y certificados EPA Sección 608 Universal — la certificación exigida por ley para abrir los sistemas de refrigeración sellados de refrigeradores empotrados, columnas de vino y baños de hielo.",
  ),
  f(
    "Ranges aggregate the Berne service desk's own published figures (built-in coffee, warming drawers, wine columns, sealed-system refrigeration) with OEM part-cost bands and South-Florida labor at our standard rate.",
    "Los rangos agregan las cifras publicadas por el propio taller de Berne (café empotrado, cajones calentadores, columnas de vino, refrigeración de sistema sellado) con bandas de costo de piezas OEM y mano de obra del sur de Florida a nuestra tarifa estándar.",
  ),
  f(
    "Every estimate is a quote-before-work figure; the firm price comes from the $59 on-site diagnostic, credited to the repair, with a written quote before any work begins.",
    "Cada estimación es una cifra de presupuesto-antes-del-trabajo; el precio firme sale del diagnóstico a domicilio de $59, abonado a la reparación, con presupuesto por escrito antes de empezar.",
  ),
  f(
    "White-glove handling: we protect custom panels and cabinetry, work clean in a fine home, and re-align panel-ready fronts so the reveal matches the surrounding run.",
    "Trato de guante blanco: protegemos paneles y carpintería a medida, trabajamos limpio en una casa fina y realineamos los frentes panel-ready para que la separación coincida con el conjunto.",
  ),
];
