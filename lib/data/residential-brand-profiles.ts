import { REPAIRS_COMPLETED } from "@/data/company";

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
  /** Spanish localization. If absent, EN content is used as fallback. */
  es?: {
    teaser: string;
    metaTitle: string;
    metaDescription: string;
    about: string;
    equipment: ResidentialEquipment[];
    failureModes: ResidentialFailureMode[];
    whyBerne: string;
    serviceArea: string;
    faqs: ResidentialFAQ[];
  };
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
  metaTitle: "Sub-Zero Repair Miami & South Florida · $59 · Berne",
  metaDescription:
    "White-glove Sub-Zero refrigerator repair across Miami-Dade, Broward & Palm Beach. Built-ins, columns, BI-36, 648PRO. Licensed, EPA-608, 90-day warranty.",
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
  es: {
    teaser:
      "La refrigeración built-in es lo que hacemos con más frecuencia. Columnas Sub-Zero, side-by-sides clásicas y built-ins BI — diagnosticados y reparados por técnicos que han reconstruido estas unidades suficiente tiempo para conocer los hábitos de la plataforma.",
    metaTitle: "Reparación Sub-Zero · Sur de Florida",
    metaDescription:
      "Reparación Sub-Zero de guante blanco en Miami-Dade, Broward y Palm Beach. Built-ins, columnas, BI-36, 648PRO. Licenciados, EPA-608, garantía de 90 días.",
    about:
      "Sub-Zero es la marca que tocamos más que cualquier otra en el segmento built-in. Las side-by-sides clásicas (632, 642, 685), la línea BI built-in (BI-30, BI-36, BI-42, BI-48), la serie de columnas integradas (IC-30, IC-24, IC-27) y las unidades viejas PRO 600-series son tickets estándar para nuestro equipo. El clima del Sur de Florida es duro con estos compresores — la humedad carga el sistema dual-refrigeration, los coils del condensador se ensucian rápido en aire salino, y los homeowners que dejan acumular polvo en el grille frontal usualmente nos llaman primero por el lado fresh-food tibio. Diagnosticamos en la plataforma, no por adivinar: sistemas dual-evap significan que un lado tibio no siempre es compresor — la mitad del tiempo es el motor del evap fan en el compartimento afectado, un defrost terminator, o un relé de control board que dejó de switchear el loop secundario. Cargamos los gauges correctos (R-134a y R-600a, porque la Designer Series moderna se movió a isobutano), y nuestros técnicos están EPA-608 certified para el trabajo de sealed-system que muchos talleres no pueden tocar legalmente.",
    equipment: [
      { series: "Clásicas 600-series (632 / 642 / 685)", description: "Side-by-side built-ins de finales de los '90 a mediados de los 2000. Todavía en servicio en muchas cocinas de Coral Gables y Pinecrest — motores de condenser fan, evap fans, calentadores de defrost y empaques de door cassette son la lista usual." },
      { series: "Línea BI built-in (BI-30, BI-36, BI-42, BI-48)", description: "La plataforma built-in actual — all-fridge de 36 pulgadas, French door de 48 pulgadas, variantes BI-36UFD y BI-48SD. Dual-refrigeration, dos compresores, evap fans separados por compartimento. Control boards (generación 715549) y reemplazo de módulo de ice maker son comunes." },
      { series: "Columnas integradas Designer (IC-24, IC-27, IC-30)", description: "Columnas de refrigerador y freezer integradas flush-mount. Fallas del calentador anti-condensación, alineación de bisagra después de que la cabinetry asienta, y el swap dual-compresor en IC-30 más viejas son lo que vemos más." },
      { series: "Pro 648 / 632 PRO", description: "Built-ins Pro Series — 648PRO es la unidad de 48 pulgadas dual-refrigeration con interior stainless. Cycling de compresor post-firmware-update, fallas del módulo de ice maker y reemplazo de solenoide de water valve son los temas regulares." },
      { series: "Undercounter (UC-15, UC-24, 700-series drawers)", description: "Cajones de refrigerador undercounter y beverage centers. Sellos malos en empaques de cajón, compresor short-cycling y fallas de control board en la generación 700BCI vieja." },
      { series: "Wine storage (424, 427, 430)", description: "Unidades de wine single y dual-zone — falla de motor de ventilador, drift de temperatura dual-zone y reemplazo de LED board en la línea 427 más nueva." },
    ],
    failureModes: [
      { title: "Cycling de compresor 648PRO después de update de firmware", detail: "Lo vemos en unidades 648PRO que recibieron el update de control board de finales de los 2010s. Síntomas: compresor secundario ciclando cada 3-4 minutos, freezer manteniendo temp pero usando 40% más energía, fault 'PROBE' ocasional en el display. El fix es usualmente un reflash del control board más un termistor nuevo en el evap secundario — ambos tienen que hacerse juntos o regresa de inmediato." },
      { title: "Reemplazo de módulo de ice maker BI-36", detail: "El módulo de ice maker interno en unidades BI-36 (y 685, 632) tiene un patrón de falla conocido alrededor de los 8-10 años — los dedos dejan de rotar, el water inlet no actúa, o el módulo hace corto y dispara el breaker del ice maker. Cargamos el módulo Sub-Zero OEM (no el reemplazo universal, que no habla correctamente con el control board) y el clip del arnés que siempre se quiebra durante el install." },
      { title: "Falla de balero del motor del condenser fan 632 (~año 12)", detail: "El motor del condenser fan en la 632 original desgasta sus baleros alrededor de los 10-12 años en nuestro clima. Síntomas comienzan como chillido agudo atrás de la unidad, escalan a grille frontal caliente, luego food side tibio. Swap del motor OEM, limpieza de condensador a fondo, verificación de amp draw — listo." },
      { title: "Stall de dual evap fan BI-48 en el lado freezer", detail: "El evap fan del freezer en unidades BI-48 se atora con escarcha en las puntas de la aspa cuando el ciclo del defrost heater es incompleto. Lo vemos cuando el defrost terminator se debilita — el heater corre, pero no suficiente tiempo. El fix es el terminator + un clear manual de escarcha + un check del fan. Salta el check del fan y estarás de vuelta en 6 meses." },
      { title: "Circuito abierto del anti-sweat heater integrado IC-30", detail: "El calentador anti-condensación envuelto alrededor del frame de la puerta en columnas IC-30 se abre, y una vez que pasa, hay sweating en el borde del cabinet en nuestra humedad. Los clientes usualmente notan daño en cabinetry antes de notar que el heater está muerto. Diagnostique con multímetro en el arnés, reemplace el loom del heater — es un trabajo largo por el panel de acceso." },
      { title: "Relé soldado en control board Designer 700TCI", detail: "Los control boards Designer 700TCI y 700BCI tienen un problema conocido donde el relé del compresor se suelda en posición cerrada. La unidad corre continuamente, congela todo, y la única forma de pararlo es sacar el breaker. Reemplazo de board es el único fix real — no recomendamos los boards rebuilt de terceros, fallan otra vez en un año." },
      { title: "Fuga de water valve solenoid atrás de la unidad", detail: "En built-ins con through-the-door water, el water valve solenoid (pared trasera, accedido jalando la unidad hacia adelante) desarrolla un drip lento después de 7-9 años. Verá un baseboard húmedo antes de verlo dentro de la unidad. Reemplazo de la válvula, reemplazo del saddle valve en la pared si el homeowner tiene el barato, flush de la línea, y listo." },
    ],
    whyBerne:
      "El trabajo Sub-Zero no es un side hustle para nosotros. Nuestros técnicos senior cada uno tienen cientos de tickets Sub-Zero registrados, y cargamos partes BI/PRO/IC comunes en el camión — control boards (generación 715549), módulos de ice maker, motores de condenser y evap fan, water valves, anti-condensation heaters y empaques de puerta en los tamaños más comunes. Estamos EPA-608 Universal certified para el trabajo de sealed-system, que es un requisito duro para cualquier taller Sub-Zero que toque el loop dual-refrigeration. Y porque somos un taller W-2 — no subs — el mismo técnico que diagnosticó su BI-48 el año pasado es el que regresamos si un tema relacionado aparece. Los built-ins son una relación larga, y el work record se queda con la unidad en nuestro sistema.",
    serviceArea:
      "Cubrimos hogares Sub-Zero desde Homestead al norte hasta Jupiter — Coral Gables, Pinecrest, Coconut Grove, Brickell, Miami Beach, Bal Harbour, Aventura, Hallandale, Fort Lauderdale, Boca Raton, Delray, Palm Beach y Wellington. Los built-ins están concentrados en esos vecindarios, así que ruteamos llamadas Sub-Zero al técnico más cercano a su ZIP code la mañana del despacho.",
    faqs: [
      { question: "¿Vale la pena reparar un Sub-Zero o debería reemplazar?", answer: "Casi siempre vale la pena reparar. Una BI-48 nueva corre $14K-$20K instalada; la gran mayoría de reparaciones que hacemos caen en el rango de $200-$900. Sub-Zero diseñó estas unidades para 20+ años de servicio — compresores, evap fans y control boards son las partes que se desgastan, y las reemplazamos. Le daremos una evaluación honesta si una unidad realmente no vale la pena salvar (raro — usualmente una fuga de sealed-system en una 600-series vieja)." },
      { question: "¿Manejan trabajo de sealed-system en unidades dual-refrigeration?", answer: "Sí. Nuestros técnicos están EPA-608 Universal certified. Sacamos vacío, pesamos refrigerante y verificamos el loop dual-refrigeration con gauges apropiados — tanto R-134a como R-600a (isobutano) en unidades Designer más nuevas. Muchos talleres no pueden hacer este trabajo legalmente." },
      { question: "¿Cuánto toma usualmente una reparación Sub-Zero?", answer: "La mayoría de trabajos son first-visit complete porque cargamos las partes BI/PRO/IC comunes en el camión — motores de ventilador, módulos de ice maker, control boards en dos generaciones, water valves, empaques. Si necesitamos una parte menos común (boards de especialidad 600-series viejos, empaques vintage), típicamente la tenemos en 2-3 días hábiles del distribuidor Sub-Zero." },
      { question: "Mi BI-48 hace sonido de click y el lado de comida está tibio. ¿Cuál es la causa más probable?", answer: "En una BI-48 esa combinación usualmente apunta al relé del food-side compressor o al start device — el click es el relé tratando de engancharse, y el lado tibio es el compresor fallando arrancar. Menos común es el evap fan del food side trancado. Diagnosticamos con amp clamp + lectura de termistor en la primera visita y cotizamos antes de que entre cualquier parte." },
      { question: "¿Atienden unidades de vino y cajones undercounter Sub-Zero?", answer: "Sí — cobertura completa. Wine 400-series (424, 427, 430), undercounter 700-series, las nuevas plataformas UC-15 y UC-24, y la línea PRO 248 wine más vieja. Cycling de compresor, drift dual-zone, motores de ventilador y fallas de LED board son los temas regulares." },
      { question: "¿El mismo técnico manejará mi reparación si llamo otra vez después?", answer: "Cuando el scheduling lo permite, sí. Mantenemos historial de servicio en cada unidad en nuestro sistema, así que aunque un técnico diferente regrese, tienen su record completo — qué se reemplazó, qué lecturas se registraron, qué notó el cliente. Para relaciones Sub-Zero esto importa." },
    ],
  },
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
  metaTitle: "Wolf Range & Oven Repair Miami–South FL · $59 · Berne",
  metaDescription:
    "Wolf range, rangetop, dual-fuel & convection oven repair across South Florida. Priority service. Real OEM parts. EPA-608 certified. 90-day warranty.",
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
  es: {
    teaser:
      "Las estufas Wolf, rangetops y hornos dual-fuel están construidos para el largo plazo. Fallas de spark module, elementos de infrarrojo del broiler, control boards de dual-fuel — diagnosticamos en la plataforma y cargamos las partes OEM correctas.",
    metaTitle: "Reparación Wolf Estufas y Hornos · Sur de Florida · $59",
    metaDescription:
      "Reparación de estufas Wolf, rangetops, hornos dual-fuel y convección en el Sur de Florida. Servicio prioritario. Partes OEM. EPA-608. Garantía de 90 días.",
    about:
      "Wolf es la marca hermana de Sub-Zero — mismo parent, misma barra de calidad, mismo patrón de relación larga con el homeowner. Vemos estufas Wolf de gas (series DF dual-fuel, AG all-gas, GR all-gas residencial), los hornos de pared M Series (las plataformas MDO y SO más nuevas), rangetops Wolf, y los rangetops SRT clásicos contour-handle en muchas cocinas del Sur de Florida. Los trabajos más grandes son reemplazos de spark module en los rangetops (el módulo standalone es una parte conocida de desgaste alrededor del año 8-10), reemplazos del elemento infrarrojo del broiler en los hornos dual-fuel, fallas de control board dual-fuel, y swaps de motor del convection fan. También somos uno de los pocos talleres en Miami-Dade y Broward que trabajará en los hornos de vapor de convección Wolf (CSO) — tienen un generador de vapor separado con problemas de descalcificación y sensor de nivel de agua que requieren un approach específico. Las partes Wolf no siempre son next-day; mantenemos los spark modules, ignitors, elementos infrarrojos, control boards y sensores dual-fuel más comunes en el camión, y el resto lo sourceamos por la red de distribuidor Sub-Zero con típicamente 2-3 días.",
    equipment: [
      { series: "Estufa dual-fuel (DF304, DF364, DF484, DF606)", description: "Top de gas, horno eléctrico. Cuatro anchos comunes — 30, 36, 48 y 60 pulgadas. Control board dual-fuel, elemento de broiler de infrarrojo del horno, motor del convection fan y spark module del rangetop son los trabajos regulares." },
      { series: "Estufa all-gas (GR304, GR364, GR484, GR606)", description: "Estufas todo gas. El ignitor del horno (la barra Norton glow-bar), termocoples y los orificios del dual-stack burner son los que tocamos más. Swaps de motor del convection fan en las variantes de convección." },
      { series: "Rangetop / cooktop (SRT, RT, ICBSRT, contour-handle)", description: "Rangetops standalone, tanto el SRT clásico (contour handle) como la generación RT actual. Fallas de spark module, limpieza/reemplazo del ignitor de quemador, y el ensamble de la válvula de gas cuando un quemador no enciende." },
      { series: "Horno de pared M Series (SO30, SO30CM, MDO30, DO30)", description: "Hornos de pared single y double M Series — el M Series actual (controles M-touch) y el E Series más viejo. Fallas de touch panel, burnout del elemento de convección, reemplazo de bisagra de puerta y el socket del temperature probe son comunes." },
      { series: "Horno de vapor convección (CSO30)", description: "Horno de pared combi-steam. Descalcificación del generador de vapor, fallas del sensor de nivel de agua, reemplazo de empaque de puerta y fallas del control panel. Plataforma de especialidad — la mayoría de talleres no la toca." },
      { series: "Warming drawer (WWD30)", description: "Warming drawer Wolf — falla de elemento, termostato y problemas del slide assembly en unidades más viejas." },
    ],
    failureModes: [
      { title: "Fault de continuous-spark del spark module del rangetop", detail: "El spark module clásico del rangetop Wolf (SRT y RT temprano) desarrolla un fault donde un quemador chispea continuamente incluso con todas las knobs apagadas. Usualmente humedad entrando al módulo o un contacto del switch fallido. Reemplazamos el módulo y limpiamos los switches del quemador — ambos, no solo uno." },
      { title: "DF484 dual-fuel sin calentar, falla de control board", detail: "Los boards DF484 (y DF364) dual-fuel desarrollan una falla de relé donde el elemento de bake no engancha. El display muestra que la temperatura está subiendo pero el elemento está frío. Reemplazo del board es el fix — Wolf soporta esta parte." },
      { title: "Falla de bisagra de puerta del horno M Series", detail: "Las puertas de horno M Series son pesadas y las bisagras empiezan a sentirse flojas alrededor del año 7-8. Si lo dejas, eventualmente la puerta no cierra completamente y el sello se rompe. Reemplazamos bisagras en pares, nunca un solo lado." },
      { title: "Burnout del elemento infrarrojo del broiler", detail: "El broiler infrarrojo en unidades DF y SO es parte de desgaste — la mayoría fallan entre años 6 y 10. Síntomas: el broiler no se pone rojo, la comida dora desparejo, o la unidad tira un F-code. Reemplazo directo, pero hay que verificar el tipo de elemento." },
      { title: "Ruido y falla de balero del motor de convection fan", detail: "Los motores de convection fan se ponen ruidosos alrededor del año 9-12 — sonido grinding o chillido a velocidad alta. Baleros gastados. Reemplazamos el motor; mientras el panel trasero está afuera, aspiramos la cámara de convección e inspeccionamos el elemento." },
      { title: "Fault de descalcificación CSO30, sensor de nivel de agua", detail: "Los hornos de vapor de convección necesitan descalcificación regular. Si se brincan, el sensor de nivel de agua se cubre con cal y lee incorrectamente — a veces muy bajo (el horno no corre), a veces muy alto (el horno inunda). Descalcificamos, reemplazamos el sensor y educamos al homeowner sobre el intervalo." },
      { title: "Ignitor débil de estufa all-gas", detail: "Los hornos all-gas GR-series tienen un ignitor Norton-style glow-bar que se debilita alrededor del año 5-7. Síntomas: el horno toma 3-4 intentos de ignición para encender, o el lado de bake huele a gas antes de prender. Test de resistencia confirma. Reemplazar con OEM, no universal." },
    ],
    whyBerne:
      "Wolf y Sub-Zero comparten parent, y los homeowners que poseen uno usualmente poseen ambos — así que tratamos Wolf de la misma forma: relación larga, partes reales, el mismo técnico de vuelta cuando el scheduling lo permite. Cargamos las partes Wolf de alta falla en el camión (spark modules, glow-bar igniters, elementos infrarrojos en specs comunes, bisagras, convection motors, sensores dual-fuel), estamos set up con el distribuidor Sub-Zero/Wolf para las partes que no están en el camión, y trabajaremos en las plataformas más duras (CSO steam oven, E Series wall ovens viejos) que la mayoría de talleres declinan. Nuestros técnicos son installers de gas appliance licenciados, lo que importa en trabajo de rangetop y estufa de gas.",
    serviceArea:
      "Los installs Wolf están cluster en los mismos vecindarios del Sur de Florida que Sub-Zero — Coral Gables, Pinecrest, Coconut Grove, Brickell, Miami Beach, Bal Harbour, Aventura, Sunny Isles, Hallandale, Fort Lauderdale, Las Olas, Boca, Delray, Palm Beach. Ruteamos llamadas Wolf a los mismos técnicos manejando Sub-Zero.",
    faqs: [
      { question: "¿Reparan hornos dual-fuel Wolf?", answer: "Sí — todas las generaciones DF (DF304, DF364, DF484, DF606), boards actuales y viejos. Trabajos más comunes son reemplazos de control board, elementos de broiler infrarrojo y motores de convection fan. Cargamos las partes de alta falla en el camión." },
      { question: "Mi rangetop Wolf sigue chispeando con las knobs apagadas.", answer: "Eso casi siempre es el spark module — humedad entró o un switch del quemador falló. Reemplazamos el módulo (OEM) e inspeccionamos los seis switches del quemador; si uno es intermitente, reemplazar solo el módulo es un fix de corto plazo. Hacemos ambos." },
      { question: "¿Atienden el horno de vapor de convección Wolf (CSO)?", answer: "Sí. La plataforma CSO necesita approach específico — descalcificación del generador de vapor, diagnóstico del sensor de nivel de agua, inspección del empaque de puerta. La mayoría de appliance shops no la toca." },
      { question: "¿Cuánto duran los appliances Wolf?", answer: "Wolf construye para 15-20+ años de uso residencial. Las partes de desgaste (igniters, elementos infrarrojos, bisagras, motores de convection, spark modules) se reemplazan una o dos veces en esa vida útil. El chassis y los quemadores son esencialmente permanentes." },
      { question: "¿El ignitor de horno Wolf es universal?", answer: "No — los glow-bar igniters Wolf están spec por modelo y siempre instalamos OEM. Los igniters universales caben físicamente pero jalan un amperage distinto y no disparan el circuito de safety correctamente." },
      { question: "¿Pueden re-jet una estufa Wolf para propano?", answer: "Sí. Wolf provee el LP conversion kit para cada modelo, y nuestros técnicos son installers de gas licenciados. Re-jeteamos los quemadores, ajustamos el air shutter, hacemos swap del regulador y verificamos con manómetro antes del sign-off." },
    ],
  },
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
  metaTitle: "Viking Repair Miami & South Florida · $59 · Berne",
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
  es: {
    teaser:
      "Estufas Viking pro-style, refrigeradores built-in, lavavajillas y rangetops. 5-series y 7-series más viejas y la plataforma Tuscany más nueva — sabemos qué falla en cada generación.",
    metaTitle: "Reparación Viking · Sur de Florida · Diagnóstico $59",
    metaDescription:
      "Reparación de estufa Viking, refrigerador, lavavajillas y cooktop en Miami-Dade, Broward, Palm Beach. Pro-style 5-series, 7-series, Tuscany. EPA-608.",
    about:
      "Viking construyó la categoría de estufa residencial pro-style, y vemos muchas en el Sur de Florida — desde la 5-series original (VGR548, VGR530) que todavía corre en cocinas de 20 años hasta la 7-series Professional actual y la Tuscany más nueva. Las plataformas tienen patrones de falla significativamente distintos: el spark module 5-series y el simmer burner signature de Viking tienen quirks de diseño de décadas, los control panels 7-series son un punto débil conocido en unidades instaladas antes del rediseño 2018, y la serie Tuscany usa un motor de convection fan distinto que en realidad ha sido más confiable que la plataforma vieja. También manejamos refrigeración Viking (built-ins VCBB, la línea FreeStanding French door y la línea Designer column), lavavajillas Viking (FDW y las plataformas VDB30 más nuevas), y rangetops Viking incluyendo la línea pro open-burner. Trabajo de sealed-system en refrigeración Viking requiere EPA-608 — nuestros técnicos están certified.",
    equipment: [
      { series: "Pro-Style range — 5-series (VGR530, VGR548, VGSC560, VDSC530)", description: "All-gas (VGR), dual-fuel (VDSC) y variantes self-clean. La plataforma pro-style original. Spark modules, orificios del simmer-burner, ignitors del horno y el ensamble de safety valve son los trabajos comunes." },
      { series: "Pro-Style 7-series (VGR7361, VGR7488, VDR7488)", description: "Generación pro-style actual. Fallas del touch control panel (pre-2018), convection fan, bisagras de puerta del horno, y la conversión LP cuando los homeowners cambian de combustible." },
      { series: "Tuscany (TVDR4801, TVDR6601)", description: "Dual-fuel y all-gas residencial mid-tier. Plataforma de convección más nueva, control panel rediseñado. Empaque de puerta y elemento de bake son los items de servicio más comunes." },
      { series: "Refrigerador built-in (VCBB, FDB, FCB)", description: "Built-in side-by-side, French door y column. Compresor, motor del evap fan, defrost terminator, water valve. Trabajo de sealed-system donde se necesita." },
      { series: "Columnas Designer (VRI, VFI)", description: "Columnas de refrigerador y freezer integradas — flush mount. Calentadores anti-condensación, alineación de bisagra, reemplazo de empaque." },
      { series: "Lavavajillas (FDW, VDB30, RVDW)", description: "Lavavajillas Viking — control boards, ensambles de bomba de drenaje, resorte/cable de puerta y water inlet valve. Clase distinta de control board que Bosch/KitchenAid stock." },
      { series: "Rangetop (VGRT, VRT)", description: "Rangetops pro-style con open burners. Spark module, orificio del quemador, reemplazo de knob/valve." },
    ],
    failureModes: [
      { title: "Spark module 5-series chispeando continuo por humedad", detail: "El spark module 5-series está en una bahía apretada bajo el cooktop y la humedad del Sur de Florida lo alcanza. Síntoma: uno o más quemadores chispea con las knobs apagadas, especialmente después de una semana lluviosa. Secamos, inspeccionamos y reemplazamos el módulo si los contactos están picados. Los switches del quemador van en el mismo trabajo." },
      { title: "Simmer burner VGR548 no se mantiene a low setting", detail: "El simmer burner VGR548 tiene un orificio delicado y un termocople que se sienta muy cerca de la flama. Después de años de uso el termocople se debilita y apaga el quemador apenas la válvula de gas se libera. Reemplazar el termocople, verificar limpieza del orificio, ajustar el low-flame stop." },
      { title: "Falla del touch panel 7-series pre-2018", detail: "Las estufas 7-series pre-2018 tienen un tema conocido del control panel capacitive-touch donde el panel se vuelve no-responsivo en parches o registra ghost presses. Viking hizo un rediseño mid-2018. El fix es reemplazo del panel — pedimos vía distribuidor Viking, 3-5 días. No recomendamos los paneles rebuilt en eBay; fallan otra vez en un año." },
      { title: "Falla de motor del condenser fan en refrigerador built-in VCBB", detail: "El compartimento del compresor VCBB corre más caliente que el equivalente Sub-Zero, y el motor del condenser fan se desgasta más temprano — usualmente año 8-11. Chillido agudo atrás, lado fresh-food tibio. Swap del motor OEM, limpieza del condensador, verificación de amp draw." },
      { title: "Atasco del impulsor de bomba de drenaje (FDW)", detail: "Lavavajillas FDW tienen un impulsor de bomba de drenaje que se atora con debris duro — semillas de fruta, esquirlas de vidrio, ocasional clip plástico. Síntoma: tub mantiene agua, ciclo de drenaje es silencioso o zumba sin flujo. Sacamos la bomba, limpiamos el impulsor, verificamos rotación, y reemplazamos la bomba si el magneto está quebrado." },
      { title: "Falla de resorte de bisagra de puerta del horno", detail: "Los resortes de bisagra en hornos Viking pro-style se desgastan y eventualmente dejan que la puerta se cierre sola con fuerza. Vemos resortes rotos alrededor del año 10-13. El reemplazo viene en pares (izquierdo + derecho) — reemplazos de un solo lado siempre regresan como queja." },
      { title: "Anti-sweat heater abierto en columna Designer", detail: "Calentadores anti-condensación en columnas integradas VRI/VFI se rompen alrededor del año 9-12. El resultado es condensación en cabinetry que el homeowner usualmente atrapa antes del código de error. Reemplazo del calentador requiere desensamble parcial del frame de puerta — trabajo de unos 90 minutos." },
      { title: "Corrosión de brass head en rangetop open-burner (hogares costeros)", detail: "Los brass heads open-burner en rangetops Viking se corroen en cocinas con aire salino (Sunny Isles, Bal Harbour, Key Biscayne). Heads picados causan irregularidad de flama. Limpiar si es leve, reemplazar si pesado — cargamos los heads comunes en el camión." },
    ],
    whyBerne:
      "Viking tiene múltiples generaciones de plataforma con partes y patrones de falla significativamente distintos — un técnico genérico de 'pro range' obtendrá el diagnóstico mal en un trabajo de touch panel 7-series o un simmer burner 5-series. Nuestro equipo ha trabajado en Viking suficiente tiempo para saber qué plataforma tienes desde una foto del control panel, y cargamos las partes de alta falla: spark modules 5-series, harnesses de panel 7-series, termocoples del simmer burner, ignitors comunes, motores de convection, y condenser fans para la línea built-in. Somos installers de gas licenciados y EPA-608 certified.",
    serviceArea:
      "Las estufas Viking aparecen en todo el Sur de Florida — concentradas en Coral Gables, Pinecrest, Coconut Grove, Brickell, Miami Beach, Bal Harbour, Sunny Isles, Aventura, Fort Lauderdale, Las Olas, Boca Raton, Delray, Palm Beach y Wellington, pero atendemos Viking de Homestead a Jupiter en despacho estándar.",
    faqs: [
      { question: "¿Las estufas Viking todavía valen la pena reparar?", answer: "Casi siempre, sí — especialmente la 5-series y 7-series, que se construyeron para ser reconstruidas. Una estufa Viking pro-style nueva corre $9K-$15K; la mayoría de reparaciones que hacemos son $250-$900. El chassis y los quemadores duran décadas; las partes de desgaste se reemplazan una o dos veces en la vida útil." },
      { question: "¿Cuál es el problema más común de estufa Viking?", answer: "En la 5-series, es el spark module (driven por humedad en la costa del Sur de Florida) y el termocople del simmer burner. En la 7-series, es el touch control panel en unidades pre-2018. En la Tuscany, es el elemento de bake y el empaque de puerta. Sabemos qué esperar solo del número de modelo." },
      { question: "¿Reemplazan touch control panels Viking?", answer: "Sí. Pedimos paneles Viking-spec vía distribuidor — turnaround 3-5 días hábiles. No instalamos paneles rebuilt de terceros; su tasa de falla es alta." },
      { question: "¿Mi Viking funcionará con propano en una casa costera de Florida?", answer: "Sí — Viking envía LP conversion kits para cada estufa y rangetop. Re-jeteamos los quemadores, hacemos swap del regulador, ajustamos el low-flame stop y verificamos con manómetro. Requerido para installs de gas appliance en Florida." },
      { question: "¿Atienden la línea de refrigerador built-in Viking (VCBB)?", answer: "Sí — cobertura completa. Compresores, evap fans, sistemas de defrost, water valves, módulos de ice maker. EPA-608 certified para trabajo de sealed-system." },
      { question: "¿Y los lavavajillas Viking — FDW y VDB?", answer: "Sí, ambas plataformas. Control boards, bombas de drenaje, cables de puerta, water valves. Los lavavajillas Viking usan una clase de control board distinta que Bosch o KitchenAid." },
    ],
  },
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
  metaTitle: "Thermador Repair Miami & South Florida · $59 · Berne",
  metaDescription:
    "Thermador Pro Grand, Pro Harmony, Star Burner cooktop, Freedom column & Sapphire dishwasher repair. South Florida priority service. EPA-608, 90-day warranty.",
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
  es: {
    teaser:
      "Thermador Pro Grand, Pro Harmony, cooktops Star Burner, refrigeración de columna Freedom y lavavajillas Sapphire. Plataforma común con Bosch y Gaggenau — conocemos los procedimientos de servicio BSH.",
    metaTitle: "Reparación Thermador · Sur de Florida · Diagnóstico $59",
    metaDescription:
      "Reparación Thermador Pro Grand, Pro Harmony, cooktop Star Burner, columna Freedom y lavavajillas Sapphire. Sur de Florida, servicio prioritario. EPA-608.",
    about:
      "Thermador es parte de la familia BSH (junto con Bosch y Gaggenau), lo que significa que procedimientos de servicio, herramientas de diagnóstico y muchas partes se solapan. Vemos la línea Thermador completa en el Sur de Florida: estufas pro-style Pro Grand y Pro Harmony, cooktops de gas Star Burner, los cooktops de inducción, hornos de pared Masterpiece y Professional, la línea de refrigeración de columna Freedom, undercounter Freedom y el lavavajillas Sapphire. El Star Burner de Thermador — el patrón propietario de cinco puntas — tiene requerimientos específicos de cleaning y alineación del igniter que un técnico genérico frecuentemente obtiene mal. La línea Freedom column comparte plataforma con Gaggenau, y el lavavajillas Sapphire comparte generaciones de bomba de circulación y control board con Bosch. Nuestros técnicos cargan herramientas de diagnóstico BSH (el conector para acceso a service-mode), y estamos entrenados en la plataforma BSH a través de las tres líneas de marca. Las partes Thermador vienen por la red de distribuidor BSH — típicamente 2-3 días en cualquier cosa que no tengamos en stock.",
    equipment: [
      { series: "Estufa Pro Grand (PRD364, PRD486, PRD606)", description: "Pro Grand de 48, 60 y la vieja 36 pulgadas. Igniters Star Burner, control boards del horno (M Series), motores de convection fan y reemplazo de bisagra de puerta." },
      { series: "Estufa Pro Harmony (PRG304, PRG364, PRG484)", description: "Pro-style de perfil más bajo — misma plataforma Star Burner que Pro Grand pero sin el back guard y módulo de grill. Igniter, harness del switch de ignición, elemento del horno y convection fan." },
      { series: "Cooktop Star Burner (SGSXP, PCG, CIT)", description: "Cooktops de gas standalone (SGSXP, PCG) y cooktops de inducción (CIT). Cleaning del Star Burner, alineación del igniter, spark module y ensamble de surface-burner valve." },
      { series: "Refrigeración de columna Freedom (T18, T24, T30, T36, T48)", description: "Columnas integradas de refrigerador y freezer — 18 a 48 pulgadas. Compresores, evap fan, condenser fan, calentadores anti-condensación, y el control board atrás del grille superior." },
      { series: "Hornos de pared — Masterpiece y Professional (PO, PODMW, PODC)", description: "Unidades de pared single, double y combinación microondas/horno. Control panel (controles M Series), elementos de bake/broil, bisagras de puerta y el socket del meat probe." },
      { series: "Lavavajillas Sapphire (DWHD650, DWHD770)", description: "Lavavajillas Sapphire star-shaped fully-integrated. Bomba de circulación, bomba de drenaje, control board, resorte/cable de puerta y reemplazo del Sapphire glow LED." },
      { series: "Warming drawer (WD30, WDC30)", description: "Warming drawer slide-in — elemento, termostato, hardware de slide." },
    ],
    failureModes: [
      { title: "Alineación del igniter Star Burner después de cleaning por homeowner", detail: "El Star Burner tiene cinco puntos de contacto del igniter y son sensibles a alineación. Cuando un homeowner pasa el burner cap por un ciclo de lavavajillas (que Thermador no recomienda), el cap se pandea ligeramente y el igniter ya no toca el cap correctamente. Síntoma: el quemador hace click pero no enciende. Realineación + reemplazo de cap si está pandeado — usualmente bajo una hora." },
      { title: "Falla de balero de motor del convection fan Pro Grand", detail: "Los hornos de convección Pro Grand tienen un motor de fan que desgasta baleros alrededor del año 8-11. Síntoma: grinding ruidoso o chillido durante convection bake. Reemplazar el motor; mientras el back está afuera, inspeccionar el elemento de convección y la aspa del fan por cualquier grieta." },
      { title: "Falla del control board del dispenser de ice/water Freedom column", detail: "Las columnas Freedom T36 con through-the-door water tienen un control board del dispenser separado atrás de la cara del dispenser. Falla alrededor del año 9-12, usualmente después de que una water valve ha estado fugando sobre él lentamente. Reemplazar el board, reemplazar la water valve, y verificar que el saddle valve en la pared no tenga drip lento." },
      { title: "Capacitor de start de bomba de circulación Sapphire", detail: "Las bombas de circulación Sapphire (DWHD650/770) comparten una generación con Bosch 800 Series — y comparten la misma debilidad de capacitor de start. Síntoma: la bomba zumba pero no circula agua; el ciclo toma el tiempo completo y los platos salen sucios. Reemplazamos el capacitor, a veces la bomba completa." },
      { title: "Respuesta intermitente del touch panel M Series", detail: "Los controles de horno de pared M Series tienen un tema conocido de sensibilidad del touch panel en la generación 2015-2018. Síntoma: algunos botones responden, otros no, o aparecen ghost presses. Reemplazo del panel es el fix — vía distribuidor BSH." },
      { title: "Safety valve del horno Pro Harmony clickeando sin encender", detail: "El safety valve del horno Pro Harmony desarrolla un click sin abrir — oyes el relé, pero no hay flujo de gas al igniter del horno. Frecuentemente emparejado con un igniter débil que no jala suficiente corriente para disparar la válvula. Reemplazar el igniter (current spec, OEM), y verificar relé de válvula si el click persiste." },
      { title: "Cooktop de inducción (CIT) código E22 falla del generator board", detail: "Los generator boards de inducción CIT tienen un fault E22 conocido (over-temp/generator fault) que apunta a un módulo de power específico en el board. Diagnosticamos con la interfaz de service-mode BSH, reemplazamos el generator board vía distribuidor BSH." },
    ],
    whyBerne:
      "Thermador, Bosch y Gaggenau comparten una plataforma BSH — significando que las herramientas de diagnóstico, la interfaz de service-mode y muchos subensambles son comunes. Nuestros técnicos cargan el service connector BSH, están entrenados en la plataforma BSH, y tienen acceso directo al distribuidor de partes BSH. Cargamos partes de desgaste Thermador comunes en el camión (igniters Star Burner, harnesses M Series, capacitores de start de bomba Sapphire, calentadores anti-condensación de columna), y las partes menos comunes vienen en 2-3 días. Somos EPA-608 Universal certified para trabajo de sealed-system Freedom column, y installers de gas licenciados para trabajo de estufa Pro Grand y Pro Harmony.",
    serviceArea:
      "Las cocinas Thermador están cluster en Coral Gables, Pinecrest, Coconut Grove, Brickell, Miami Beach, Bal Harbour, Sunny Isles, Aventura, Fort Lauderdale, Boca Raton, Delray, Palm Beach y Wellington. Los installs Freedom column están distribuidos similarmente — ruteamos al técnico más cercano a su ZIP en despacho.",
    faqs: [
      { question: "¿Qué es un Star Burner y qué lo hace distinto de atender?", answer: "El Star Burner es el patrón propietario de cinco puntas de Thermador — da cobertura de flama más amplia y deja al quemador sentarse más bajo en el cooktop. En servicio, el cap del quemador y alineación del igniter importan más que en un quemador redondo estándar. Un cap mal alineado no enciende correctamente, y el igniter tiene que tocar el cap en un punto específico." },
      { question: "¿Atienden la línea de refrigeración Freedom column?", answer: "Sí — cobertura completa en columnas T18 a T48. Compresores, evap fans, sistemas de defrost, water valves, control boards, calentadores anti-condensación. EPA-608 certified para trabajo de sealed-system." },
      { question: "¿Thermador es lo mismo que Bosch?", answer: "Mismo parent (BSH), así que comparten procedimientos de servicio, herramientas de diagnóstico y muchos subensambles — pero las líneas de modelo son distintas. Lavavajillas Sapphire y Bosch 800 Series comparten una generación de bomba de circulación, por ejemplo. Atendemos todas las marcas BSH." },
      { question: "Mi horno Pro Grand muestra un F-code. ¿Pueden diagnosticar remoto?", answer: "Los F-codes nos dan un punto de partida pero no diagnóstico completo. La mayoría de F-codes en hornos Thermador apuntan a temas de sensor o control-board, pero verificamos onsite con el BSH service connector para leer la historia completa de fault antes de cotizar partes." },
      { question: "¿Cuánto toma usualmente una reparación de lavavajillas Sapphire?", answer: "First-visit complete en la mayoría de trabajos. Cargamos capacitores de start de bomba de circulación, bombas de drenaje, cables/resortes de puerta y control boards en las generaciones comunes. Partes menos comunes toman 2-3 días vía BSH." },
      { question: "¿Pueden convertir una estufa Pro Grand de gas natural a propano?", answer: "Sí. BSH suministra el LP conversion kit por modelo — orificios de quemador, regulador, a veces un spec distinto de módulo de ignición. Nuestros técnicos son installers de gas licenciados, y verificamos la conversión con manómetro antes del sign-off." },
      { question: "¿Y los cooktops de inducción — hay partes disponibles?", answer: "Sí. Los cooktops de inducción CIT tienen reemplazos de generator board y surface unit disponibles vía BSH. Códigos de error (E22, E15) usualmente apuntan a subensambles específicos, lo que hace el diagnóstico rápido." },
    ],
  },
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
  metaTitle: "Miele Repair Miami & South Florida · $59 · Berne",
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
        "Miele recommends descaling every 200 hours of steam use, which works out to about every 3-4 months for typical home use. Skipping descales is the #1 cause of steam oven sensor failures and water-level errors. If you've gone a year without descaling, we can do it as part of a service visit.",
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
  es: {
    teaser:
      "La ingeniería alemana de Miele es engaño en costo: las máquinas duran 20+ años cuando se atienden correctamente. Lavavajillas G-series, lavadoras y secadoras W1/T1, MasterCool refrigeración, hornos H 7000 — la plataforma completa, con el Miele Service Tool.",
    metaTitle: "Reparación Miele · Sur de Florida · Diagnóstico $59",
    metaDescription:
      "Reparación Miele lavavajillas, W1 lavadora, T1 secadora, MasterCool refrigeración, hornos H 7000 y de vapor. Service Tool, partes OEM, EPA-608.",
    about:
      "Miele es el patrón de oro residencial — la única marca que en serio diseña para 20+ años de servicio. La plataforma Generation 7000 (G 7000 lavavajillas, H 7000 hornos de pared, hornos de vapor DG, MasterCool refrigeración KF/KS) es engineering-heavy, repair-intensive una vez que envejece, y crítica al homeowner que la compró. Trabajamos en la línea completa con el Miele Service Tool (requerido para fault-code reads, parámetros y firmware flashes en plataforma actual), partes OEM Miele vía distribuidor Miele USA, y técnicos senior entrenados específicamente en la plataforma. Vemos lavavajillas G-series con sus AutoOpen y AutoDos, lavadoras W1 y secadoras heat-pump T1, MasterCool side-by-sides y columnas, hornos de pared H 7000 con M Touch, hornos de vapor DG, y los sistemas de café CM/CVA — todos los cuales tienen modos de falla específicos del platform.",
    equipment: [
      { series: "Lavavajillas G 7000 / G 5000 / Futura", description: "Generación G 7000 actual con AutoOpen y AutoDos, plus G 5000 y Futura más viejos. Bomba de circulación, bomba de drenaje, actuador AutoOpen, panel M Touch, y los componentes AutoDos." },
      { series: "Lavadora W1 / Secadora T1 (WWB, TWB, heat-pump)", description: "Pares de lavandería W1 y secadora T1 heat-pump. Bomba de drenaje, motor del tambor, evap coil cleaning en T1, panel de control y resorte/empaque de puerta." },
      { series: "MasterCool refrigeración (KF 2911, KS 1801)", description: "Built-in side-by-sides y columnas. Compresores, evap fan motors, condenser fans, sistemas de defrost, water valves." },
      { series: "Hornos de pared H 7000 / H 6000", description: "Single, double, y combi wall ovens con M Touch panel. Elementos de bake/broil, motor del convection fan, bisagras y panel M Touch." },
      { series: "Horno de vapor (DG, DGC combi-steam)", description: "Hornos built-in de vapor y combi-steam. Descalcificación del generador de vapor, sensor de nivel de agua, empaque de puerta y panel M Touch." },
      { series: "Sistema de café (CM, CVA, CM 7750)", description: "Máquinas de café bean-to-cup built-in y freestanding. Calibración del grinder, reemplazo de brew unit, descalcificación y cleaning del sistema de leche." },
      { series: "Cooktop y range (KM, HR)", description: "Cooktops de inducción (KM 7000), cooktops de gas y la estufa pro-style HR. Generator boards en inducción, igniters en gas." },
    ],
    failureModes: [
      { title: "Falla del actuador AutoOpen G 7000", detail: "La serie G 7000 tiene un feature AutoOpen que abre la puerta al final del ciclo para liberar vapor. El motor del actuador tiene un punto de desgaste conocido alrededor del año 4-6 — la puerta no abre, o abre y luego se traba. Reemplazar el actuador, re-flash del firmware del panel si la unidad no ha recibido el último update." },
      { title: "Fuga de bomba de circulación G-series desde sello del impulsor", detail: "Las bombas de circulación G 5000 y Futura más viejas desarrollan una fuga lenta en el sello del eje del impulsor alrededor del año 7-10. La fuga va bajo el tub antes de aparecer en el kick panel frontal, así que el homeowner frecuentemente no la ve hasta daño en el piso de abajo. Reemplazo de bomba + inspección del base pan + check del sensor float-switch." },
      { title: "Evaporador T1 heat-pump tapado con lint, ciclos largos", detail: "Las secadoras T1 (heat-pump) dependen de un coil de evaporador limpio para intercambio de calor. Incluso con el filtro de lint limpiado cada load, lint fino llega al evap y corta eficiencia del heat-pump. Síntoma: ciclos corren 50%+ más que normal. Sacamos el evap, lo limpiamos, verificamos función de bomba de drenaje. Trabajo de unas 2 horas hecho a fondo." },
      { title: "Obstrucción de objeto extraño en bomba de drenaje W1", detail: "Las bombas de drenaje W1 atrapan monedas, clips de pelo y ocasional underwire — igual que cualquier front-loader. Síntoma: fault code F24 o F11 (dependiendo de generación). Sacamos la bomba, limpiamos la obstrucción, verificamos rotación y operación del float-switch." },
      { title: "Falla de motor del evap fan MasterCool KF 2911 lado freezer", detail: "Los built-ins MasterCool side-by-side (KF 2911) tienen un motor de evap fan del lado freezer que se desgasta alrededor del año 8-11. Síntoma: lado freezer tibio, lado fresh-food normal, fault de sensor ocasional en el touch panel. Swap del motor OEM e inspección del sistema de defrost." },
      { title: "Acumulación de escala en sensor de nivel de agua del horno de vapor (DG)", detail: "Los hornos de vapor DG dependen de descalcificación regular — cuando los descales se brincan, el sensor de nivel de agua acumula escala y lee incorrectamente. Resultado: el horno piensa que el tank está vacío cuando está lleno, o viceversa. Descalcificamos a fondo, reemplazamos el sensor si ha estado atorado." },
      { title: "Drift de calibración del grinder de café", detail: "Los grinders bean-to-cup CM y CVA drifteen fuera de calibración después de 18-24 meses de uso regular. Síntoma: el espresso sale más ligero, el dose se siente corto. Recalibramos usando el Miele Service Tool, limpiamos la brew unit, reemplazamos las burrs del grinder si están gastadas." },
      { title: "Respuesta intermitente del M Touch panel en hornos H 7000", detail: "Los M Touch panels en hornos de pared H 7000 desarrollan temas de sensibilidad de touch — parches de la pantalla que no responden o ghost-press. Reemplazo del panel es el fix; pedimos vía Miele USA, típicamente 3-5 días." },
    ],
    whyBerne:
      "El servicio Miele requiere el Miele Service Tool, partes Miele reales, y un técnico que conozca la plataforma suficientemente bien para leer el fault code en contexto. Tenemos el tool, pedimos partes vía la red de distribuidor Miele USA, y nuestros técnicos senior han trabajado en G-series, W1/T1, MasterCool y plataformas Generation 7000 por años. Estamos EPA-608 certified para trabajo de sealed-system MasterCool, y cargamos los consumibles de alta falla en el camión — actuadores G 7000, kits de bomba de circulación, bombas de drenaje, partes AutoDos, suministros de cleaning de evaporador para T1. Los homeowners Miele valoran el appliance suficiente tiempo que el approach de relación larga importa.",
    serviceArea:
      "Los installs Miele están concentrados en Coral Gables, Pinecrest, Coconut Grove, Brickell, Miami Beach, Bal Harbour, Aventura, Hallandale, Fort Lauderdale, Las Olas, Boca Raton, Delray, Palm Beach y Wellington. Despachamos llamadas Miele a los técnicos entrenados en el Miele Service Tool — usualmente mismo día en Miami-Dade, Broward y Palm Beach.",
    faqs: [
      { question: "¿Tienen el Miele Service Tool?", answer: "Sí. El Miele Service Tool es requerido para fault-code reads, ajustes de parámetro y firmware flashes en la plataforma Miele actual — lavavajillas G-series, lavandería W1/T1, refrigeración MasterCool, hornos de pared H 7000, hornos de vapor. Tenemos el tool y nuestros técnicos están entrenados." },
      { question: "Mi secadora T1 heat-pump está tomando 2+ horas por load. ¿Qué pasa?", answer: "Casi siempre el coil del evaporador tapado con lint fino. Incluso con el filtro de lint limpiado cada load, lint microscópico llega al evaporador del heat-pump y corta eficiencia. Sacamos el evap, lo limpiamos a fondo, verificamos la bomba de drenaje y el path de condensado." },
      { question: "¿Qué tan frecuente debo descalcificar mi horno de vapor Miele?", answer: "Miele recomienda descalcificar cada 200 horas de uso de vapor, que sale a cada 3-4 meses para uso típico de hogar. Brincar descales es la causa #1 de fallas de sensor de horno de vapor y errores de nivel de agua. Si ha pasado un año sin descalcificar, podemos hacerlo como parte de una visita de servicio." },
      { question: "¿Atienden sistemas de café Miele (CM/CVA)?", answer: "Sí. Calibración del grinder, reemplazo de brew unit, descalcificación, cleaning del sistema de leche, y diagnósticos del panel. CM 7750 y las máquinas built-in CVA más viejas ambas soportadas." },
      { question: "¿Hay partes Miele disponibles en US?", answer: "Sí. Miele USA mantiene red de distribuidor — partes comunes vienen en 2-4 días, y cargamos consumibles de alta falla en el camión (actuadores G 7000, kits de bomba de circulación, bombas de drenaje). Solo Miele genuino; no aftermarket — no lo recomendamos." },
      { question: "¿Miele vale la pena el costo de reparar?", answer: "Sí para la mayoría de trabajos. Miele diseña sus appliances para 20 años de vida útil — mucho más que cualquier competidor americano — y el costo de reemplazo es alto (un par MasterCool nuevo es $15K-$20K; un lavavajillas G 7000 es $2.5K-$3.5K). La mayoría de reparaciones caen muy por debajo del costo de reemplazo." },
      { question: "¿La lavadora W1 y secadora T1 pueden apilarse?", answer: "Sí, con el stacking kit de Miele. Instalamos y re-levelamos el par, y verificamos que las puertas swinging clear de la cabinetry. Muchos owners Miele apilan en laundry closets donde el espacio es apretado." },
    ],
  },
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
  metaTitle: "KitchenAid Repair Miami & South FL · $59 · Berne",
  metaDescription:
    "KitchenAid refrigerator, range, dishwasher & cooktop repair. Priority service across Miami-Dade, Broward, Palm Beach. $59 diagnostic, credited to repair. 90-day warranty.",
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
  es: {
    teaser:
      "Refrigeración KitchenAid built-in, estufas, cooktops y la línea workhorse de lavavajillas. Construido en plataformas Whirlpool — conocemos las partes compartidas y los quirks específicos de KitchenAid.",
    metaTitle: "Reparación KitchenAid · Sur de Florida · Diagnóstico $59",
    metaDescription:
      "Reparación KitchenAid refrigerador, estufa, lavavajillas y cooktop. Servicio prioritario en Miami-Dade, Broward, Palm Beach. Diagnóstico de $59, abonado. Garantía de 90 días.",
    about:
      "KitchenAid es la marca premium de Whirlpool — comparte plataformas Whirlpool en lavavajillas, refrigeración y lavandería pero con interiores y controles upgrade. Vemos el rango completo en cocinas del Sur de Florida: refrigeradores French door y side-by-side (KRFC, KBSD, KBSN series), built-ins KSC y la línea KitchenAid columns, lavavajillas KDFE/KDTE/KDPE de stainless interior, estufas slide-in y freestanding KSEG/KSGB/KSGG, hornos de pared single y double KOSE/KODE, y la línea cooktop con quemadores Even-Heat. KitchenAid comparte modos de falla con Whirlpool en muchos casos — diverter motors de lavavajillas, evap fan motors, módulos de ice maker — entonces atendemos ambas marcas con las mismas partes y procedimientos. Donde KitchenAid es distinto es en los controles touch (más sofisticados que Whirlpool stock) y los hornos con sistemas True Convection.",
    equipment: [
      { series: "Refrigerador French door (KRFC, KRFF, KRMF)", description: "French door con freezer abajo — el formato más común. Ice maker, water valve, evap fan, defrost heater son las llamadas recurrentes." },
      { series: "Built-in side-by-side (KBSD, KBSN)", description: "Built-in side-by-side de 42 y 48 pulgadas. Compresor, motor del evap fan, módulo de ice maker, water valve y control board." },
      { series: "KitchenAid columns (KCFCX, KCRCX)", description: "Columnas integradas full-height refrigerador y freezer. Anti-condensación heater, alineación de bisagra, control board." },
      { series: "Lavavajillas (KDFE, KDTE, KDPE)", description: "Lavavajillas KitchenAid de stainless interior. Bomba de circulación, motor diverter, control board, door cable/resorte y water inlet valve." },
      { series: "Estufa slide-in/freestanding (KSEG, KSGB, KSGG)", description: "Estufas slide-in eléctricas y de gas. Igniter del horno (glow-bar), elemento de bake, control board, switches de superficie." },
      { series: "Hornos de pared (KOSE, KODE, KOCE)", description: "Hornos de pared single, double y combi-microwave. Touch control, elementos de bake/broil, motor del convection fan, bisagras de puerta." },
      { series: "Cooktop Even-Heat (KCED, KCGD)", description: "Cooktops eléctricos e inducción Even-Heat. Switches de superficie, elementos, generator board en inducción." },
    ],
    failureModes: [
      { title: "Motor diverter del lavavajillas atascado", detail: "Los lavavajillas KitchenAid (compartido con Whirlpool) usan un motor diverter que rota para dirigir agua a brazos de rocío superior/inferior. Se atasca alrededor del año 5-7, frecuentemente con debris de comida. Síntoma: solo un brazo de rocío activo, platos saliendo sucios en la repisa de arriba o abajo. Reemplazo del motor diverter es trabajo de una visita." },
      { title: "Falla del motor del evap fan en French door", detail: "El motor del evap fan en refrigeradores French door KitchenAid (compartido con Whirlpool) falla alrededor del año 7-10. Síntoma: lado fresh-food tibio, freezer normal, ruido de chillido o silencio del fan. Reemplazo OEM y check del sistema de defrost." },
      { title: "Reemplazo de módulo de ice maker (KRFC)", detail: "Los módulos de ice maker en KitchenAid French door tienen patrón de falla conocido alrededor del año 6-9 — los dedos dejan de rotar, water inlet no actúa, o el módulo hace corto. Reemplazo de módulo OEM, no aftermarket." },
      { title: "Igniter del horno glow-bar débil (KSGB/KSGG)", detail: "Los hornos de gas KitchenAid usan un igniter Norton glow-bar que se debilita alrededor del año 5-7. Síntoma: el horno toma múltiples intentos de ignición, o el lado de bake huele a gas antes de prender. Test de resistencia confirma — sobre ~120 ohms en frío y el igniter está de salida." },
      { title: "Falla del touch control en hornos de pared (KOSE)", detail: "Los touch controls en hornos de pared KOSE 2015-2018 tienen sensibilidad intermitente — algunos botones responden, otros no. Reemplazo del panel es el fix; pedimos vía distribuidor Whirlpool, 1-2 días." },
      { title: "Door cable del lavavajillas roto", detail: "Los cables/resortes de puerta del lavavajillas se rompen alrededor del año 5-8 por uso normal. La puerta cae abierta o no se queda cerrada. Reemplazo de cable y resorte como par." },
      { title: "Switch de superficie del cooktop intermitente", detail: "Los switches de superficie en cooktops Even-Heat pierden continuidad después de uso pesado. Síntoma: el quemador no calienta o calienta intermitente. Test con multímetro confirma, reemplazo del switch." },
    ],
    whyBerne:
      "KitchenAid comparte plataforma con Whirlpool, así que las partes y procedimientos son compartidos — pero KitchenAid tiene su propio set de quirks de controles y series exclusivas que un técnico tiene que conocer. Atendemos ambas marcas con los mismos técnicos, partes y procedimientos. Cargamos las partes de alta falla en el camión (motores diverter, igniters glow-bar, módulos de ice maker, evap fans, cables de puerta, bombas de drenaje), y las partes menos comunes vienen en 1-2 días vía distribuidor Whirlpool. EPA-608 certified para trabajo de sealed-system en refrigeración built-in y column.",
    serviceArea:
      "Cobertura completa del Sur de Florida — Miami-Dade, Broward y Palm Beach. KitchenAid es marca mass-premium así que vemos installs en toda la región, de tract homes a high-rises.",
    faqs: [
      { question: "¿Atienden built-ins y columnas KitchenAid?", answer: "Sí — cobertura completa en KitchenAid built-ins (KBSD, KBSN) y la línea KitchenAid columns. EPA-608 certified para sealed-system." },
      { question: "¿Cuál es la reparación de estufa KitchenAid más común?", answer: "Igniter del horno en estufas de gas KSGB/KSGG — Norton glow-bar se debilita alrededor del año 5-7. Fix rápido con partes OEM. En las estufas eléctricas, el elemento de bake es el más común." },
      { question: "Mi refri French door KitchenAid tiene el lado fresh-food tibio. ¿Cuál es la causa?", answer: "Usualmente una de tres cosas: (1) falla del defrost heater, evaporador del freezer engelado, sin airflow al fresh-food; (2) motor del evap fan trancado; (3) control board principal no comandando defrost. Testeamos los tres en la primera llamada." },
      { question: "¿Cargan partes KitchenAid en el camión?", answer: "Sí — partes de alta falla en el camión (motores diverter, igniters, módulos de ice maker, evap fans, cables de puerta, bombas de drenaje). Partes menos comunes vienen en 1-2 días vía distribuidor Whirlpool." },
      { question: "¿KitchenAid y Whirlpool usan las mismas partes?", answer: "En muchas plataformas, sí — lavavajillas, French door refrigeración, lavandería. Los controles y interiores son diferentes pero las partes mecánicas frecuentemente son las mismas. Atendemos ambas marcas con los mismos técnicos." },
      { question: "¿Cuánto cuesta el diagnóstico KitchenAid?", answer: "Diagnóstico de $59. La cuota cubre el diagnóstico y es gratuita si autoriza la reparación — solo se paga si decide no continuar." },
    ],
  },
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
  metaTitle: "GE Monogram & Cafe Repair Miami–South FL · $59 · Berne",
  metaDescription:
    "GE, GE Profile, Cafe & Monogram appliance repair. Priority service across South Florida. Built-ins, induction, ranges, dishwashers. $59 diagnostic. 90-day warranty.",
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
  es: {
    teaser:
      "GE Appliances cubre cuatro líneas — GE estándar, Profile, Cafe y Monogram premium built-in. Atendemos las cuatro con los mismos técnicos y partes compartidas a través de tiers.",
    metaTitle: "Reparación GE / Profile / Cafe / Monogram · Sur de FL",
    metaDescription:
      "Reparación de refrigeradores, estufas, lavavajillas y hornos GE, Profile, Cafe y Monogram en el Sur de Florida. Servicio prioritario, diagnóstico de $59.",
    about:
      "GE Appliances (ahora una compañía Haier) cubre cuatro sub-marcas que vemos a diario en el Sur de Florida: GE estándar (mass-market), Profile (mid-tier con más features), Cafe (mid-premium con hardware custom) y Monogram (línea premium built-in que compite con Sub-Zero y Thermador). Las plataformas comparten significativamente — Profile y Cafe en particular tienen plataforma overlap pesado — así que nuestro truck stock cubre fallas de alta frecuencia a través de las cuatro marcas al mismo tiempo. La línea Monogram built-in incluye refrigeradores ZIC/ZIS column, French door ZWE/ZWS, y los slide-in y pro-style ranges ZGP/ZDP. Las estufas Cafe incluyen la línea induction CHS9 y las gas pro-style con burners high-output. Hornos Advantium speed-cook (ZSC, PSB) son una plataforma específica con magnetrons high-voltage que necesitan procedimiento de safety apropiado.",
    equipment: [
      { series: "Refrigerador French door (GFE, PFE, CFE — GE, Profile, Cafe)", description: "French door con freezer abajo. Ice maker, water valve dual-solenoid, evap fan, defrost heater son las llamadas recurrentes." },
      { series: "Side-by-side (GSE, GFE — through-the-door agua/hielo)", description: "Refrigeradores side-by-side. Dispenser, water valve, módulo de ice maker y motor del auger son los items estándar." },
      { series: "Built-in Monogram (ZIC, ZIS column / ZIK)", description: "Línea Monogram built-in y columns — compite con Sub-Zero. Compresores, evap fan motors, control boards, anti-condensación heaters." },
      { series: "Estufa Profile/Cafe (PGB, PHB, CHS, CGS)", description: "Estufas slide-in y freestanding gas y eléctricas. Igniters, control boards, elementos de bake. CHS9 línea induction." },
      { series: "Monogram pro-style (ZGP, ZDP)", description: "Estufas Monogram pro-style — competidor directo de Viking/Wolf. Igniters, válvulas de safety, control boards." },
      { series: "Lavavajillas (GDF, PDT, CDT)", description: "Lavavajillas GE estándar, Profile y Cafe. Bombas de drenaje, motor diverter, control board, water valves." },
      { series: "Hornos de pared y Advantium (JT, JK, ZSC, PSB)", description: "Hornos single, double y Advantium speed-cook. Magnetrons (Advantium), touch controls, elementos, bisagras." },
    ],
    failureModes: [
      { title: "Diverter motor del lavavajillas atascado (GDF/PDT/CDT)", detail: "Motor diverter rota para dirigir agua a brazos de rocío superior/inferior. Se atasca alrededor del año 5-7 con debris. Síntoma: solo un brazo activo, platos sucios en una repisa. Reemplazo del diverter — trabajo de una visita." },
      { title: "Falla de motor del evap fan (French door)", detail: "Motor del evap fan en refrigeradores French door GE falla alrededor del año 7-10. Síntoma: fresh-food tibio, freezer normal, ruido o silencio del fan. Reemplazo OEM y check del sistema de defrost." },
      { title: "Reemplazo de módulo de ice maker", detail: "Los módulos de ice maker GE tienen patrón de falla alrededor del año 6-9. Reemplazo de módulo, no el ensamble completo, en la mayoría de casos." },
      { title: "Falla de water valve dual-solenoid", detail: "Side-by-sides GFE y GSE con through-the-door water tienen water valve dual-solenoid que falla alrededor del año 5-8. Síntoma: ice maker dropea cero o cubos parciales, water dispenser funciona pero lento. Reemplazo de válvula, flush de línea." },
      { title: "Falla de magnetron en Advantium speed-cook", detail: "Hornos combi Advantium (ZSC, PSB) tienen magnetron que se desgasta alrededor del año 7-10. Síntoma: modo microondas no calienta, modo horno normal. Reemplazo de magnetron requiere descarga de high-voltage y procedimiento de safety apropiado — no es trabajo DIY." },
      { title: "Falla de control board en hornos de pared", detail: "Los hornos de pared GE/Profile con touch control desarrollan respuesta intermitente alrededor del año 6-9. Reemplazo del touch panel es el fix; vía distribuidor GE." },
    ],
    whyBerne:
      "GE Appliances cubre cuatro sub-marcas y trabajamos en todas — de un refri freestanding GFE básico en Hialeah a un install Monogram ZIP column en Pinecrest. Las partes se comparten a través de los tiers (Profile y Cafe en particular tienen overlap pesado de plataforma), lo que significa que nuestro truck stock cubre la mayoría de trabajos de alta falla en las cuatro marcas al mismo tiempo. Estamos EPA-608 certified para trabajo de sealed-system Monogram built-in, installers de gas licenciados para Monogram ZGP/ZDP y estufas de gas Cafe, y entrenados en los procedimientos de servicio Advantium high-voltage.",
    serviceArea:
      "Installs GE, Profile, Cafe y Monogram cubren el footprint completo del Sur de Florida — de Homestead al norte hasta Jupiter. Monogram tiende a cluster en los mismos vecindarios que Sub-Zero y Thermador, mientras GE estándar y Profile se distribuyen ampliamente. Despacho el mismo día en el área de cobertura.",
    faqs: [
      { question: "¿Cuál es la diferencia entre GE, Profile, Cafe y Monogram?", answer: "Mismo parent (GE Appliances, una compañía Haier). GE estándar es mass-market. Profile es mid-tier con más features. Cafe es mid-premium con hardware y acabados custom. Monogram es la línea premium built-in que compite con Sub-Zero y Thermador. Las partes se comparten a través de los tiers en muchas plataformas." },
      { question: "Estufa de inducción Cafe — ¿pueden repararla?", answer: "Sí. La estufa de inducción CHS9 comparte una generación de generator board con los cooktops de inducción Profile. Trabajo más común es reemplazo de generator board cuando una o dos surface units dejan de responder. Vía distribuidor GE en 2-3 días." },
      { question: "¿Cuánto duran los refrigeradores GE?", answer: "Refrigeradores GE estándar y Profile están diseñados para unos 12-15 años de servicio. Cafe y Monogram están construidos para más — 18-25+ años en la línea Monogram built-in. Las partes de desgaste típicamente se reemplazan una vez durante la vida útil de la unidad." },
      { question: "Mi lavavajillas GE Profile no drena. ¿Cuál es la causa?", answer: "Casi siempre el impulsor de la bomba de drenaje atrapando debris. Sacamos la bomba en la primera visita, limpiamos la obstrucción, verificamos integridad del magneto y reemplazamos si está agrietado." },
      { question: "¿Manejan hornos Advantium speed-cook?", answer: "Sí — ambas plataformas Profile y Monogram Advantium. Reemplazo de magnetron (requiere procedimiento de descarga high-voltage), control panel y elemento de convección." },
      { question: "¿Las partes GE son fáciles de encontrar?", answer: "Sí — GE tiene red de distribución sólida y la mayoría de partes comunes vienen en 1-2 días. Cargamos las partes de alta falla en el camión a través de las cuatro sub-marcas (módulos de ice maker, water valves, bombas de drenaje, igniters, evap fans)." },
    ],
  },
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
  metaTitle: "Whirlpool Repair Miami & South FL · $59 · Berne",
  metaDescription:
    "Whirlpool washer, dryer, refrigerator, dishwasher & range repair. Priority service across South Florida. $59 diagnostic. Parts on truck. 90-day warranty.",
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
  es: {
    teaser:
      "Whirlpool es el workhorse mass-market — la marca que está en la mayoría de single-family homes, condos y rentals del Sur de Florida. Plataforma confiable, partes en stock, reparaciones de una visita.",
    metaTitle: "Reparación Whirlpool · Sur de Florida · Diagnóstico $59",
    metaDescription:
      "Reparación Whirlpool lavadora, secadora, refrigerador, lavavajillas y estufa en Miami-Dade, Broward, Palm Beach. Servicio prioritario, diagnóstico de $59.",
    about:
      "Whirlpool es la marca americana mass-market más instalada en el Sur de Florida — la opción default para builders, property management y homeowners que valoran confiabilidad y partes disponibles sobre features premium. La plataforma Whirlpool es predecible: motores direct-drive en lavadoras top-load WTW Cabrio, plataforma compartida en lavavajillas con KitchenAid (motor diverter, control board), refrigeradores French door WRF/WRX, secadoras eléctricas WED y de gas WGD. Las partes son fáciles de sourcer — Whirlpool tiene una de las redes de distribución más fuertes en la industria, partes comunes en 1-2 días, y nosotros cargamos las partes de alta falla en el camión para completar en una visita.",
    equipment: [
      { series: "Lavadora top-load Cabrio (WTW)", description: "Lavadoras top-load Cabrio direct-drive. Lid switch, sensor de level de agua, motor del actuator, control board son las llamadas estándar." },
      { series: "Lavadora front-load (WFW)", description: "Lavadoras front-load. Door lock, switch de puerta, bomba de drenaje, motor de tambor y control board." },
      { series: "Secadora eléctrica/gas (WED, WGD)", description: "Secadoras eléctricas WED y de gas WGD. Thermal fuse, elemento de calor (eléctrica), igniter y válvula de gas (gas), drum belt, idler pulley." },
      { series: "Refrigerador French door (WRF, WRX)", description: "French door con freezer abajo. Ice maker, water valve, evap fan, defrost heater." },
      { series: "Side-by-side (WRS, GSS)", description: "Side-by-side con through-the-door agua/hielo. Water valve, dispenser, auger motor, control board." },
      { series: "Lavavajillas (WDF, WDT)", description: "Lavavajillas mass-market. Motor diverter (compartido con KitchenAid), bomba de drenaje, water inlet valve, control board, door cable/resorte." },
      { series: "Estufa eléctrica/gas (WFE, WFG)", description: "Estufas freestanding y slide-in. Igniter (gas), elemento de bake (eléctrica), control board, switches de superficie." },
    ],
    failureModes: [
      { title: "Lid switch fallido en Cabrio WTW", detail: "El lid switch en lavadoras top-load Cabrio falla alrededor del año 4-7. Síntoma: lavadora no entra a spin. Reemplazo del switch es trabajo de una visita." },
      { title: "Bomba de drenaje atascada (WFW front-load)", detail: "Las bombas de drenaje en front-load atrapan monedas, hair clips y la ocasional underwire. Síntoma: lavadora no drena, fault code F21 o F33. Sacamos la bomba, limpiamos obstrucción, verificamos rotación." },
      { title: "Thermal fuse de secadora soplado", detail: "Las thermal fuses de secadora soplan cuando el vent está tapado. Síntoma: el tambor gira pero no calienta. Testeamos el fuse, elemento de calor y termostato, plus inspeccionamos el vent. Reemplazar el fuse sin limpiar el vent significa que regresamos." },
      { title: "Falla de motor del evap fan en French door", detail: "Motor del evap fan en refrigeradores French door Whirlpool falla alrededor del año 7-10. Síntoma: fresh-food tibio, freezer normal. Reemplazo OEM y check del sistema de defrost." },
      { title: "Motor diverter del lavavajillas atascado", detail: "Mismo motor diverter que KitchenAid — se atasca alrededor del año 5-7. Síntoma: solo un brazo de rocío activo. Reemplazo del diverter." },
      { title: "Falla del igniter de estufa de gas (WFG)", detail: "El igniter Norton glow-bar en estufas de gas Whirlpool se debilita alrededor del año 5-7. Síntoma: horno toma intentos múltiples para encender. Test de resistencia confirma." },
    ],
    whyBerne:
      "Las reparaciones Whirlpool son trabajo de high-volume — la marca está en la mayoría de cocinas y lavanderías del Sur de Florida, y nuestro truck stock está construido alrededor de los patrones de falla más comunes de Whirlpool. Cargamos lid switches, drain pumps, thermal fuses, igniters glow-bar, motores diverter, control boards en las generaciones más comunes, y water valves. Partes adicionales vienen en 1-2 días vía distribuidor Whirlpool. Compartimos partes con KitchenAid en muchas plataformas, así que un técnico atiende ambas marcas con el mismo set de partes. Servicio el mismo día en el área de cobertura completa.",
    serviceArea:
      "Los installs Whirlpool están ampliamente distribuidos en el Sur de Florida — single-family homes, condos, rentals y portfolios de property-management. Despachamos el mismo día en el footprint completo de Homestead a Jupiter.",
    faqs: [
      { question: "Mi lavadora Whirlpool no centrifuga. ¿Cuál es el problema más probable?", answer: "En una top-load Cabrio (WTW), es usualmente el lid switch — falla alrededor del año 4-7. En una front-load (WFW), es el door lock o switch de puerta. Diagnosticamos en la primera visita y cotizamos antes de que entren partes." },
      { question: "¿Cuánto duran los appliances Whirlpool?", answer: "Whirlpool construye para 10-12 años de vida útil típica en la mayoría de productos. Las partes de desgaste (lid switches, bombas de drenaje, igniters, thermal fuses) se reemplazan una o dos veces en esa ventana — es mantenimiento normal." },
      { question: "¿Las partes Whirlpool son fáciles de sourcer?", answer: "Sí — Whirlpool tiene una de las redes de distribución de partes más fuertes en la industria. La mayoría de partes comunes vienen en 1-2 días, y cargamos las partes de alta falla en el camión para completar en la primera visita." },
      { question: "Mi secadora Whirlpool no calienta pero el tambor gira. ¿Cuál es la causa?", answer: "En una secadora eléctrica (WED), más frecuente el thermal fuse — sopló porque el vent está tapado. Testeamos el fuse, el elemento de calor y el termostato de operación, plus inspeccionamos el vent. Reemplazar el fuse sin limpiar el vent significa que regresamos." },
      { question: "¿Atienden secadoras de gas Whirlpool (WGD)?", answer: "Sí — servicio completo de secadora de gas. Igniter, sensor de flama, solenoide de válvula de gas, thermal fuse. Nuestros técnicos son installers de gas appliance licenciados." },
      { question: "¿Pueden reparar appliances Whirlpool viejos (15+ años)?", answer: "Frecuentemente sí, pero depende de la parte. Lavadoras direct-drive viejas (WTW pre-2010) y secadoras viejas usualmente tienen partes disponibles. Refrigeradores 15+ años a veces son más difíciles de sourcer partes especialty — cotizaremos honestamente." },
    ],
  },
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
  metaTitle: "LG Appliance Repair Miami & South FL · $59 · Berne",
  metaDescription:
    "LG refrigerator, washer, dryer & range repair across South Florida. LinearCompressor, InstaView, TwinWash, WashTower. Priority service. EPA-608, 90-day warranty.",
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
        "Yes — the heat-pump dryer is energy-efficient and well-built. Most common service issue is the evaporator clogged with fine lint, which we clean as part of the service visit. Cycle times return to normal afterward.",
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
  es: {
    teaser:
      "Refrigeradores French door LG, lavadoras WashTower y TwinWash, secadoras heat-pump, estufas de inducción. La plataforma Linear Inverter y los patrones de falla documentados — sabemos qué está cubierto bajo class-action.",
    metaTitle: "Reparación LG · Sur de Florida · Diagnóstico $59",
    metaDescription:
      "Reparación LG French door, WashTower, TwinWash, secadora heat-pump y estufa de inducción en el Sur de Florida. EPA-608, $59, garantía de 90 días.",
    about:
      "LG ha sido una de las marcas más vendidas en el Sur de Florida en la última década — la línea French door (LFXS, LRMVS), la lavadora WashTower que apila lavadora y secadora en un solo chassis, la TwinWash con un pedestal mini-washer abajo, las secadoras heat-pump DLHC, y la línea de estufa de inducción LSEL. La plataforma de mayor visibilidad es el Linear Inverter Compressor en refrigeradores French door — el class-action settlement cubre rangos seriales específicos construidos 2014-2017, y verificamos elegibilidad onsite. Los modos de falla LG son bien documentados: Linear Inverter Compressor falla, water filter housing crack, ice maker module en French door, drain pump WashTower, evap coil tapado en secadora heat-pump, control board en LSEL induction. Estamos EPA-608 certified para trabajo de sealed-system del compresor.",
    equipment: [
      { series: "Refrigerador French door (LFXS, LRMVS, LFXC)", description: "French door con freezer abajo, algunos con InstaView (panel de vidrio que ilumina). Linear Inverter Compressor, ice maker, water valve, evap fan." },
      { series: "Side-by-side (LSXS, LRSXS)", description: "Side-by-side con through-the-door agua/hielo. Water valve, dispenser, control board, motor del auger." },
      { series: "Lavadora WashTower (WKEX)", description: "Lavadora y secadora apiladas en un solo chassis integrado. Drain pump, motor del tambor, elemento de secadora, panel de control." },
      { series: "Lavadora TwinWash con pedestal (WM, TWINW)", description: "Lavadora front-load con mini-washer pedestal abajo. Drain pump del pedestal, motor del tambor, control board." },
      { series: "Secadora heat-pump (DLHC)", description: "Secadoras heat-pump energy-efficient. Coil del evaporador (cleaning regular), drain pump, motor del compresor." },
      { series: "Estufa de inducción (LSEL)", description: "Estufas slide-in de inducción. Generator boards, surface coils individuales, control panel." },
    ],
    failureModes: [
      { title: "Falla del Linear Inverter Compressor (French door)", detail: "El Linear Inverter Compressor en unidades French door construidas 2014-2017 tiene un patrón de falla conocido — el class-action settlement cubre rangos seriales específicos. Síntoma: refri no enfría, freezer tibio, compresor zumba sin compresión. Verificamos elegibilidad contra el número serial onsite. EPA-608 certified para reemplazo de compresor." },
      { title: "Reemplazo de módulo de ice maker (RF/LFXS)", detail: "Los módulos de ice maker en LG French door tienen patrón de falla alrededor del año 5-8 — los dedos no rotan, water inlet no actúa. Módulo OEM reemplazo. Si la water valve también está fallando (común en este punto), las cambiamos juntas." },
      { title: "Crack del water filter housing", detail: "El housing del water filter en algunas French door cracks alrededor del año 6-9, especialmente si el filter no se ha cambiado regularmente. Síntoma: fuga lenta atrás del refri o agua en el piso. Reemplazo del housing." },
      { title: "Drain pump WashTower atascado", detail: "La drain pump en WashTower atrapa monedas y debris. Síntoma: lavadora no drena, fault code. Sacamos el front panel del chassis integrado, limpiamos pump, verificamos rotación." },
      { title: "Evap coil tapado en secadora heat-pump (DLHC)", detail: "Las secadoras DLHC heat-pump dependen de un coil de evaporador limpio. Lint fino llega al evap y corta eficiencia. Síntoma: ciclos largos, drum tibio pero no caliente. Limpieza del evap restaura performance." },
      { title: "Falla de control board en estufa de inducción LSEL", detail: "Las estufas de inducción LSEL tienen generator boards que pueden fallar cuando una o más surface units dejan de detectar cookware. Diagnóstico con procedimiento LG y reemplazo del generator board específico." },
    ],
    whyBerne:
      "El servicio LG necesita un técnico que sepa qué unidades están bajo el class-action del Linear Inverter Compressor, qué patrones de falla son documentados vs. uno-en-mil, y cómo navegar las relaciones con Samsung's distributor para partes específicas. Verificamos elegibilidad de class-action onsite, manejamos reemplazo de compresor bajo el settlement (parte cubierta), y cargamos las partes de alta falla en el camión: ice maker modules, water valves, drain pumps, control boards en generaciones comunes. EPA-608 certified para sealed-system. Servicio el mismo día en el footprint completo del Sur de Florida.",
    serviceArea:
      "LG está ampliamente distribuido en el Sur de Florida — single-family homes, condos y construcción nueva. Despacho el mismo día de Homestead a Miami-Dade, Broward y hasta Jupiter.",
    faqs: [
      { question: "Mi refri LG French door no enfría. ¿Podría ser el compresor?", answer: "Muy probable — el Linear Inverter Compressor en unidades French door construidas 2014-2017 tiene patrón de falla conocido. Chequeamos elegibilidad contra el settlement del class-action, documentamos la unidad para el homeowner, y manejamos el reemplazo de compresor. EPA-608 certified." },
      { question: "¿Cómo sé si mi compresor LG está cubierto bajo el class-action?", answer: "Verificamos onsite contra el número serial y los rangos seriales documentados del settlement. Si su unidad está cubierta, la parte del compresor es sin costo; el labor puede o no estar — explicaremos los specifics antes de cualquier trabajo." },
      { question: "¿Reparan LG WashTower?", answer: "Sí — cobertura completa en la columna stacked WashTower. Drain pump de la lavadora, problemas de motor, elemento de la secadora y bloqueos del lint-duct. Sacamos el front panel para servicio." },
      { question: "Mi pedestal TwinWash no drena. ¿Qué pasa?", answer: "Casi siempre la drain pump del pedestal atrapando un item pequeño — moneda, hair clip o calcetín. Sacamos la pump, la limpiamos y verificamos rotación en la misma visita." },
      { question: "¿Las secadoras heat-pump LG (DLHC) valen la pena reparar?", answer: "Sí — la secadora heat-pump es energy-efficient y bien construida. El service issue más común es el evap tapado con lint fino, que limpiamos como parte de la visita de servicio. Los tiempos de ciclo regresan a normal después." },
      { question: "¿Cuánto duran los appliances LG?", answer: "LG construye para 10-15 años de servicio en la mayoría de productos. El Linear Inverter Compressor específicamente ha tenido temas de confiabilidad en ciertos rangos de build, pero unidades más nuevas han mejorado." },
      { question: "¿Atienden estufas de inducción LG (LSEL)?", answer: "Sí. Las estufas LSEL de inducción tienen generator boards y surface coils individuales — el trabajo más común es una surface unit no detectando cookware, que diagnosticamos con el procedimiento de LG." },
    ],
  },
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
  metaTitle: "Samsung Appliance Repair Miami–South FL · $59 · Berne",
  metaDescription:
    "Samsung refrigerator, washer, dryer, range & dishwasher repair across South Florida. Family Hub, FlexWash, Bespoke. Priority service. $59 diagnostic. 90-day warranty.",
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
  es: {
    teaser:
      "Refrigeradores Samsung Family Hub, lavandería FlexWash, estufas de inducción slide-in y la línea modular Bespoke. Conocemos la plataforma — y los patrones de falla documentados.",
    metaTitle: "Reparación Samsung · Sur de Florida · Diagnóstico $59",
    metaDescription:
      "Reparación Samsung refrigerador, lavadora, secadora, estufa y lavavajillas en el Sur de Florida. Family Hub, FlexWash, Bespoke. Servicio prioritario, $59.",
    about:
      "La línea residencial Samsung se ha expandido pesado en la última década — de los refrigeradores French door Family Hub (RF) con touch screen en la puerta, al sistema modular Bespoke que deja a los homeowners cambiar door panels, a la lavadora FlexWash que tiene un mini-washer top-load separado encima de una lavadora principal front-load. Vemos todo en el Sur de Florida. La confiabilidad Samsung ha sido mixta comparada con LG o Whirlpool — el ice maker en la línea French door (RF28, RF22, RF23) ha sido service ticket frecuente, el sistema de sello del FlexWash en el mini-washer superior ha sido tema conocido, y las estufas slide-in (NE63, NE58) han tenido fallas de control board en ciertos años de build. Dicho eso, disponibilidad de partes es buena vía distribuidor Samsung (1-2 días para la mayoría), los códigos de diagnóstico son detallados, y la mayoría de reparaciones son first-visit complete.",
    equipment: [
      { series: "Refrigerador French door Family Hub (RF28, RF22, RF23)", description: "French door con touch screen en la puerta para apps, cámaras internas y conectividad. Ice maker assembly, touch screen, water valve son las llamadas estándar." },
      { series: "Refrigerador Bespoke (modular)", description: "Sistema modular Bespoke que permite swap de door panels por homeowner. Bisagras, panels, alineación." },
      { series: "Lavadora FlexWash (WV)", description: "Front-load main washer con mini top-load encima. Sello del mini-washer, drain pump, motor del tambor, control board." },
      { series: "Lavadora front-load estándar (WF)", description: "Lavadoras front-load. Drain pump, motor del tambor, door lock, control board." },
      { series: "Secadora eléctrica/gas (DV)", description: "Secadoras eléctricas DV42 y de gas DV45. Heating element, igniter (gas), thermal fuse, drum belt." },
      { series: "Estufa slide-in (NE63, NE58)", description: "Estufas eléctricas y de inducción slide-in. Control board, surface elements/coils, generator boards (inducción)." },
      { series: "Lavavajillas (DW80)", description: "Lavavajillas Samsung. Heating element (dry cycle), drain pump, control board." },
    ],
    failureModes: [
      { title: "Ice maker French door congelado/no produce (RF28, RF22, RF23)", detail: "El service ticket más común en la línea French door Samsung. El módulo del ice maker tiene patrón de falla — los dedos no rotan, ice queda atorado en la cavity, o el módulo congela completo. Reemplazamos con el módulo revisado, defrosteamos la cavity, inspeccionamos los seals." },
      { title: "FlexWash top mini-washer sello fugando", detail: "El sello del top mini-washer en FlexWash desarrolla fugas alrededor del año 3-5. Síntoma: agua atrás del mini-washer durante ciclo. Reemplazo del sello, check de daño electrónico por la fuga." },
      { title: "Falla del heating element en secadora DV42", detail: "Las secadoras eléctricas (DV42 y DV45 matching) tienen heating element que se quema alrededor del año 6-9. Síntoma: drum gira, sin calor. Reemplazo del elemento, check del thermal fuse y termostato de operación." },
      { title: "Touch screen Family Hub negro / falla de power-up", detail: "Las unidades Family Hub con touch screen (RF28, RF22, RF23 variantes) tienen pantalla que pierde poder alrededor del año 5-7. El refri continúa funcionando pero la pantalla está muerta. Reemplazo del screen assembly — vía distribuidor Samsung, disponible pero caro." },
      { title: "Sag de bisagra Bespoke después de panel swap", detail: "Los refrigeradores Bespoke permiten swap de door panels, y las bisagras del panel pueden desarrollar sag si los panels se cambian frecuentemente o se instalan incorrectamente. Re-shim, reemplazo de bisagras si se necesita." },
      { title: "Falla del heating element del lavavajillas (DW80)", detail: "Los lavavajillas DW80 tienen un heating element usado para el ciclo de secado que falla alrededor del año 5-7. Síntoma: platos salen mojados, ciclo sensor brinca secado. Reemplazo del elemento, verificación del termistor." },
    ],
    whyBerne:
      "Samsung tiene patrones de servicio conocidos — el ice maker French door, el sello FlexWash, el control board NE63, la pantalla Family Hub — y nuestros técnicos los conocen. Cargamos las partes de alta falla Samsung en el camión (ice maker assemblies, drain pumps, heating elements, control boards en las variantes comunes), sourceamos vía distribuidor Samsung para cualquier otra cosa (1-2 días). EPA-608 certified para trabajo de sealed-system de refrigerador, installers de gas licenciados para secadoras de gas DV y estufas de gas NX.",
    serviceArea:
      "Samsung está ampliamente distribuido en el Sur de Florida — concentrado pesado en construcción más nueva en Doral, Aventura, Hallandale, Sunny Isles, Fort Lauderdale, Boca Raton, Delray y Palm Beach. Despacho el mismo día en el área de cobertura completa.",
    faqs: [
      { question: "Mi ice maker Samsung French door está congelado. ¿Se puede arreglar?", answer: "Sí. El ice maker French door Samsung (RF28, RF22, RF23) es el service ticket más común en la plataforma. El fix usualmente involucra reemplazar el ice maker assembly con el módulo revisado, defrostear la cavity e inspeccionar los seals. Cargamos la parte en el camión." },
      { question: "¿Vale la pena reparar el FlexWash si el top mini-washer fuga?", answer: "Usualmente sí. El reemplazo del top seal es trabajo moderado (rango $250-$450), mucho menos que una unidad FlexWash nueva. Chequeamos daño electrónico por la fuga antes del sign-off." },
      { question: "¿Reparan touch screens Family Hub?", answer: "Sí — screen assemblies disponibles vía distribuidor Samsung. La pantalla es cara (rango $600-$900 dependiendo de generación), pero el resto del refri típicamente funciona normal aunque la pantalla esté muerta. Discutimos si el reemplazo tiene sentido para su situación." },
      { question: "¿Cuánto duran los appliances Samsung?", answer: "Samsung construye para 10-13 años de servicio en la mayoría de productos. Las partes de desgaste (ice makers, drain pumps, heating elements, control boards) se reemplazan en la vida útil. La confiabilidad ha variado por año y plataforma — daremos una evaluación honesta de su unidad específica." },
      { question: "Mi lavadora Samsung dice 4C o 5E. ¿Qué significa?", answer: "Códigos 4C / 5E indican tema de drenaje — usualmente atasco del impulsor de la drain pump, a veces drain hose tapado. Sacamos la pump en la primera visita y la limpiamos." },
      { question: "¿Las partes Samsung están disponibles?", answer: "Sí — Samsung mantiene red de distribuidor US con la mayoría de partes comunes disponibles en 1-2 días. Cargamos las partes de alta falla (ice maker assemblies, drain pumps, heating elements) en el camión." },
      { question: "¿Manejan estufas de inducción Samsung?", answer: "Sí. Estufas de inducción Samsung (variantes NE58 y NX60) tienen generator boards y surface coils que podemos atender. Trabajo más común es surface unit no detectando cookware — diagnosticado con procedimiento Samsung." },
    ],
  },
};

// ---------------------------------------------------------------------------
// Liebherr — added 2026-06-11 (content wave: premium-segment gap close).
// EN-only: no `es` block by design — these slugs are excluded from the /es
// lane and carry en+x-default hreflang only.
// ---------------------------------------------------------------------------

const liebherr: ResidentialBrandProfile = {
  slug: "liebherr",
  name: "Liebherr",
  manufacturer: "Liebherr-Hausgeräte GmbH",
  hq: "Bulle, Switzerland",
  tier: "premium",
  teaser:
    "German-engineered refrigeration with a dedicated platform: BioFresh drawers, DuoCooling circuits, Monolith columns, and R-600a sealed systems — serviced by techs who carry the gauges and the EPA-608 card the isobutane work requires.",
  metaTitle: "Liebherr Refrigerator Repair South Florida · $59 · Berne",
  metaDescription:
    "Liebherr refrigerator repair across Miami-Dade, Broward & Palm Beach. Monolith columns, BioFresh, wine cabinets, F-code faults. EPA-608, 90-day warranty.",
  about:
    "Liebherr builds refrigeration and only refrigeration, and it shows in the engineering: dual independent cooling circuits (DuoCooling), BioFresh compartments holding just above freezing at controlled humidity, and variable-speed compressors running on R-600a isobutane. It also shows in the service work — this is not a platform you diagnose with generic-fridge instincts. The display throws F-series fault codes (F0 through F5 on most electronic models) that point at specific sensors and fan circuits, the sealed system is hydrocarbon-charged and legally requires EPA-608 certification to open, and the integrated HC and Monolith columns are built into cabinetry that has to be protected while panels come off. South Florida's install base skews to the 24-inch integrated HC series in condo kitchens, freestanding CS/CBS units, the 30- and 36-inch Monolith columns in newer luxury builds, and a steady population of WS-series wine cabinets protecting collections from Brickell to Boca. Our techs work the platform regularly: humidity-stressed door gaskets, ice maker fill valves, evap fan failures behind BioFresh drawers, and the control-electronics faults that read as mystery warm-ups until you pull the actual fault log.",
  equipment: [
    {
      series: "Monolith columns (MRB/MF 24-36\")",
      description:
        "Liebherr's flagship built-in refrigerator and freezer columns. Flush-inset installs in newer Miami and Fort Lauderdale luxury builds — door alignment after cabinetry settle, ice maker faults, and display electronics are the working list.",
    },
    {
      series: "Integrated HC series (HC 1000 / HC 1550 / HCB)",
      description:
        "24-inch fully integrated units, heavily represented in condo kitchens. Evap fan motors, defrost faults, and gasket replacements on panel-ready doors are the standard tickets.",
    },
    {
      series: "Freestanding CS / CBS series",
      description:
        "Counter-depth freestanding French door and bottom-freezer units. BioFresh drawer temperature drift, fill-valve failures on ice maker models, and door hinge wear are what we see.",
    },
    {
      series: "BioFresh / BioFresh-Plus compartments",
      description:
        "Near-0°C high-humidity produce drawers controlled by their own sensor and damper circuit. When BioFresh runs warm or freezes produce, it's usually the damper actuator or the compartment sensor — both diagnosable from the fault log.",
    },
    {
      series: "Wine cabinets (WS / WSbs / Vinidor, WU undercounter)",
      description:
        "Single- and multi-zone wine units, freestanding and undercounter. Zone temperature drift, fan motor failures, charcoal filter and humidity complaints, and UV-door seal wear on cabinets holding serious collections.",
    },
    {
      series: "SBS combinations (side-by-side paired columns)",
      description:
        "CS/SGN pairs running as a side-by-side install. The linkage is electronic, not mechanical — one side failing usually has its own independent circuit, which makes honest diagnosis straightforward.",
    },
  ],
  failureModes: [
    {
      title: "F1 / F2 fault codes — air and evaporator sensor failures",
      detail:
        "Liebherr's electronic models log sensor faults as F-codes on the display. F1 is typically the air sensor, F2 the evaporator sensor — a failed sensor makes the unit run long, over-freeze, or drift warm depending on where it fails in range. We read the fault log, verify the sensor resistance against spec, and replace the failed probe rather than guessing at the compressor.",
    },
    {
      title: "Ice maker fill valve and supply faults on Monolith and CS units",
      detail:
        "The IceMaker option adds a fill valve, supply line, and level sensing that all live in our humidity. No ice or hollow cubes usually traces to a failing fill valve or a clogged inlet screen; an overflowing tray points at the valve not seating. We carry the valve and rebuild the water path in one visit on most calls.",
    },
    {
      title: "BioFresh compartment running warm or freezing produce",
      detail:
        "BioFresh holds produce just above 0°C, and its damper actuator and dedicated sensor are the two failure points. Symptom: lettuce freezing in the drawer while the main compartment reads normal, or BioFresh drifting to fridge temperature. Both log faults the display can surface — the fix is the actuator or sensor, not a refrigerant story.",
    },
    {
      title: "Evap fan failure behind the rear panel — warm unit, quiet box",
      detail:
        "A stalled evaporator fan on HC and CS units presents as a gradually warming compartment with the compressor still running. On integrated units the access is through the rear interior panel with the BioFresh drawers out. We verify fan voltage before condemning the motor — sometimes it's the control board's fan driver, and replacing the motor alone would be a comeback.",
    },
    {
      title: "Door gasket and hinge wear on integrated panel-ready doors",
      detail:
        "South Florida humidity finds every weak gasket. On panel-ready HC and Monolith doors the cabinetry panel adds weight the hinges were specced for — but only when aligned. After a kitchen settles, the door drops a few millimeters, the gasket seal breaks at a corner, and the unit sweats or frosts. Re-shim, re-align, replace the gasket if it's taken a set.",
    },
    {
      title: "Wine cabinet zone drift on Vinidor multi-zone units",
      detail:
        "Multi-zone wine cabinets run separate sensors and heaters per zone. When one zone drifts while the others hold, it's the zone sensor or its damper — not the compressor, which serves all zones. We log actual zone temps against setpoint before touching parts, because a 2-3°F sensor offset is a calibration-level fix, not a teardown.",
    },
    {
      title: "Condensation and sweating cabinets in high-humidity installs",
      detail:
        "Garage installs, covered patios, and beach-adjacent kitchens push ambient humidity past what the anti-condensation system was tuned for. Sweating between door and frame usually means the gasket or the frame heater circuit; sweating inside means door openings or a drainage path clogged with the algae South Florida grows in every drain line. We clear the drain path and test the heater loop with a meter.",
    },
    {
      title: "Control electronics failures after power events",
      detail:
        "Summer storm season is hard on electronic refrigeration. After a surge or brownout we see Liebherr displays dead, units stuck in demo/showroom mode, or compressors locked out by corrupted electronics. Some of it is a reset procedure; some needs the power board. We test before replacing — and we recommend a dedicated surge protector on every electronic built-in we service.",
    },
  ],
  whyBerne:
    "Liebherr is a refrigeration-only platform, and we service it with refrigeration-first techs — the same senior rotation that handles Sub-Zero and Thermador built-ins. That matters for three reasons. First, the sealed system: Liebherr runs R-600a isobutane, and our techs carry EPA-608 Universal certification plus the hydrocarbon-rated gauges and recovery equipment the refrigerant legally requires. Second, the diagnosis: we read the platform's fault log and test sensors against spec instead of selling compressors. Third, the install context: integrated HC and Monolith columns live inside custom cabinetry, and we treat the millwork as part of the job — floor protection, panel handling, hinge re-shimming after removal. Parts come through Liebherr's US distribution; common sensors, fans, valves, and gaskets typically land in 2-3 business days when they're not already on the truck.",
  relatedServices: [
    { slug: "refrigerator-repair", label: "Refrigerator Repair" },
    { slug: "wine-cooler-repair", label: "Wine Cooler Repair" },
    { slug: "ice-maker-repair", label: "Ice Maker Repair" },
  ],
  serviceArea:
    "Liebherr installs cluster where European kitchens cluster — Brickell, Edgewater, Miami Beach, Sunny Isles, Aventura, Hallandale, Las Olas and the Fort Lauderdale beach corridor, Boca Raton, Delray, and the Palm Beach island. We dispatch across all of Miami-Dade, Broward, and Palm Beach counties, and Liebherr calls route to the refrigeration-senior techs in your zip.",
  faqs: [
    {
      question: "My Liebherr is showing an F1 (or F2-F5) error. What does it mean?",
      answer:
        "F-codes on Liebherr electronic models are sensor and circuit faults — F1 is typically the air sensor, F2 the evaporator sensor, and the higher codes map to fans and secondary circuits depending on model. The unit usually keeps running in a fallback mode, but temperatures drift. We read the fault log on arrival, test the flagged sensor against resistance spec, and replace just the failed part. Most F-code repairs are a single visit.",
    },
    {
      question: "Is it worth repairing a Liebherr refrigerator?",
      answer:
        "Almost always. A Monolith column runs $9K-$13K installed and the HC integrated units $4K-$7K — while the repairs we actually do on this platform (sensors, fans, valves, gaskets, control boards) fall well under a tenth of replacement cost. Liebherr engineers for a 15+ year service life. The rare exception is a sealed-system failure on an older freestanding unit, and we'll tell you honestly when that's the case.",
    },
    {
      question: "Can you do sealed-system work on Liebherr's R-600a units?",
      answer:
        "Yes. Liebherr charges its modern platform with R-600a isobutane, which is flammable and legally requires EPA-608 certification plus hydrocarbon-rated equipment to open. Our techs carry both. Many shops decline this work entirely — it's one of the most common reasons Liebherr owners end up calling us second.",
    },
    {
      question: "Why is my BioFresh drawer freezing my vegetables?",
      answer:
        "BioFresh holds produce just above freezing, so there isn't much margin — a damper actuator sticking open or a compartment sensor reading a few degrees high will push the drawer below 0°C and freeze produce. Both faults are diagnosable from the unit's own log and fixable in one visit. It's not a refrigerant problem, despite what a generic-fridge diagnosis might claim.",
    },
    {
      question: "Do you repair Liebherr wine cabinets?",
      answer:
        "Yes — freestanding WS and Vinidor multi-zone cabinets, undercounter WU units, and the wine sections of combination units. Zone temperature drift, fan motors, door seal and UV-glass issues, and humidity complaints are the regular work. For serious collections we prioritize scheduling the same way we do a fridge full of food.",
    },
    {
      question: "How fast can you get Liebherr parts in South Florida?",
      answer:
        "Common service parts — sensors, evap and condenser fans, fill valves, gaskets in the standard sizes — are either on the truck or 2-3 business days through Liebherr's US parts distribution. Less common electronics for older or low-volume models can take longer, and we tell you the realistic timeline at diagnosis, not after.",
    },
    {
      question: "Do you service built-in Monolith columns in condo towers?",
      answer:
        "Yes, and it's a core scenario for us — flush-inset columns can't be wheeled out, so they're diagnosed and repaired in place, with cabinetry panels handled carefully and the building's COI and service-elevator requirements arranged before the visit. The $59 diagnostic is free with the approved repair, as on every job.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Dacor
// ---------------------------------------------------------------------------

const dacor: ResidentialBrandProfile = {
  slug: "dacor",
  name: "Dacor",
  manufacturer: "Dacor, Inc. (Samsung)",
  hq: "City of Industry, California",
  tier: "premium",
  teaser:
    "California-built luxury cooking with three distinct generations in the field — Epicure and Renaissance legacies, Heritage, and the Samsung-era Contemporary line. We service all of them, igniters to relay boards.",
  metaTitle: "Dacor Repair Miami & South Florida · $59 · Berne",
  metaDescription:
    "Dacor range, oven & column refrigeration repair in South Florida. Igniters, relay boards, legacy Epicure & Renaissance units. $59 diagnostic, 90-day warranty.",
  about:
    "Dacor occupies an unusual spot in the premium kitchen: an American luxury brand with three distinct hardware generations in the field. The legacy Epicure and Renaissance lines (roughly mid-90s through mid-2010s) still anchor thousands of South Florida kitchens — wall ovens and ranges with relay boards and membrane control panels that have known aging patterns. The Heritage line carried the pro-style range torch through the 2010s. And since Samsung acquired the brand in 2016, the Contemporary and Transitional collections have brought touch-screen controls, column refrigeration, and Samsung-era electronics into the platform. Each generation fails differently, and we service all three. The classic calls are cooking calls: gas oven igniters that glow but never fire the burner, spark modules that click continuously after a boil-over, dual-fuel ovens dead on one element because a relay board let go, and Renaissance control panels that stop responding on humid mornings. On the newer side it's column refrigeration diagnostics and induction cooktop modules. Parts strategy matters with Dacor — Samsung-era parts flow well through distribution, while some legacy Epicure and Renaissance boards are scarce and worth repairing rather than replacing, which is a call we help owners make honestly.",
  equipment: [
    {
      series: "Heritage ranges (HGPR / HGER 30-48\")",
      description:
        "Pro-style gas and dual-fuel ranges. Burner igniters, oven glow-bars, convection fans, and door hinge wear are the standard tickets — plus the griddle and grill options on the 48-inch units.",
    },
    {
      series: "Contemporary / Transitional ranges and wall ovens (Samsung era)",
      description:
        "Touch-control ranges, steam-assist wall ovens, and the four-part purge of legacy electronics. Control boards, door locks, and convection motors, with parts flowing through Samsung-Dacor distribution.",
    },
    {
      series: "Renaissance wall ovens (RNO / DOB generations)",
      description:
        "The biggest legacy population in South Florida. Relay boards, ERC control panels, door hinges, and thermal limits — we know which failures are repair-worthy and which boards can be rebuilt when new stock is gone.",
    },
    {
      series: "Epicure ranges and rangetops (ERSD / ERD legacy)",
      description:
        "The classic late-90s/2000s pro-style line. Spark modules, valve re-greasing, oven thermostats, and the door hinge and spring assemblies that wear after two decades of service.",
    },
    {
      series: "Column refrigeration (DRR / DRZ / DRW wine)",
      description:
        "Samsung-era refrigerator, freezer, and wine columns. Evap fans, defrost faults, ice maker assemblies, and display electronics — panel-ready installs serviced in place.",
    },
    {
      series: "Cooktops and ventilation (gas, induction, hoods)",
      description:
        "Gas cooktop spark systems, induction generator modules on the newer collections, and hood blower and control failures. Re-ignition sensors on sealed burners are a Dacor-specific regular.",
    },
  ],
  failureModes: [
    {
      title: "Gas oven igniter weak — oven slow to heat or won't fire",
      detail:
        "The classic Dacor gas-range call. The hot-surface igniter glows but ages below the amperage the safety valve needs, so the oven heats slowly, cycles erratically, or never lights. We measure igniter current draw against spec instead of guessing — a 15-minute diagnosis — and carry compatible igniters for the common Epicure and Heritage ovens on the truck.",
    },
    {
      title: "Spark module clicking continuously after boil-overs",
      detail:
        "When a surface burner keeps clicking after it's lit (or clicks with all knobs off), moisture or grease has tracked into a spark switch or the module is failing. South Florida humidity makes this a year-round ticket. Sometimes it dries out; usually a switch in the harness or the module itself needs replacing. We isolate which burner circuit leaks before replacing anything.",
    },
    {
      title: "Renaissance / Epicure relay board failure — dual-fuel oven dead or stuck heating",
      detail:
        "The relay boards driving bake and broil elements on legacy Dacor wall ovens are a known aging failure: an element that never energizes, or worse, a relay welded closed that keeps heating past setpoint. New-old-stock boards are scarce for some models — we'll tell you when a board-level repair (re-soldered relays) is the smarter path than hunting a discontinued part.",
    },
    {
      title: "ERC / membrane control panel unresponsive on legacy wall ovens",
      detail:
        "Renaissance-era electronic range controls develop dead keys and phantom faults, often humidity-correlated — working fine by afternoon, dead on a muggy morning. The membrane and the ERC behind it both age. We test which layer failed before quoting, because the membrane alone is a much smaller job than the control.",
    },
    {
      title: "Oven door hinges and springs sagging on 20-year-old Epicures",
      detail:
        "A Dacor oven door that won't sit flush bleeds heat, runs long bakes, and trips thermal limits. Hinge and spring kits are still obtainable for most legacy models, and a re-hinged door with a fresh gasket restores temperature behavior owners assumed needed a new thermostat.",
    },
    {
      title: "Dual-stacked burner re-ignition sensor faults",
      detail:
        "Dacor's sealed burners use flame-sensing re-ignition — when the sensor fouls or drifts, the burner clicks intermittently while lit or drops flame at simmer. Cleaning electrode and sensor geometry fixes some; failed sensors and harness corrosion (common near salt air) need parts. Either way it's diagnosable in one visit.",
    },
    {
      title: "Column refrigeration warm-up — evap fan and defrost faults (DRR/DRZ)",
      detail:
        "Samsung-era Dacor columns follow modern column logic: a compartment drifting warm with the compressor running points to the evaporator fan or an incomplete defrost cycle, both of which log faults. We pull the fault history and test the actual circuit. Sealed-system work, when truly needed, is done by our EPA-608 certified techs.",
    },
    {
      title: "Induction cooktop generator module failures (Contemporary line)",
      detail:
        "A zone that stops detecting cookware or a cooktop throwing flashing error codes usually means a generator board or its temperature sensing. We run the manufacturer diagnostic sequence to isolate the module before ordering — induction boards are too expensive to swap on a hunch.",
    },
  ],
  whyBerne:
    "Dacor rewards a shop that knows all three generations. Our techs carry the legacy knowledge — which Renaissance relay boards can be rebuilt, which Epicure igniters cross-reference to available parts, what a humidity-faulted membrane looks like versus a dead ERC — alongside current Samsung-era diagnostic procedures for the Contemporary collections and column refrigeration. We're licensed for the gas work, EPA-608 Universal certified for the refrigeration side, and honest about the economics: on a 20-year-old wall oven we'll lay out repair-versus-replace with real numbers before any part goes in. The $59 diagnostic is free when you approve the repair, most cooking-side jobs close in one visit from truck stock, and everything we install carries the 90-day labor and parts warranty.",
  relatedServices: [
    { slug: "oven-repair", label: "Oven Repair" },
    { slug: "refrigerator-repair", label: "Refrigerator Repair" },
    { slug: "range-hood-repair", label: "Range Hood Repair" },
  ],
  serviceArea:
    "We service Dacor kitchens across Miami-Dade, Broward, and Palm Beach — heavy legacy populations in Coral Gables, Pinecrest, Plantation, Weston, and Boca Raton, with the newer Samsung-era collections showing up in remodels from Aventura to Delray Beach. Same-day dispatch when scheduling allows.",
  faqs: [
    {
      question: "My Dacor oven takes forever to heat — is it dying?",
      answer:
        "Probably not. On gas Dacor ovens the most common cause is a weak hot-surface igniter — it still glows, but below the current the safety valve needs, so the oven fires late and cycles slowly. It's a measurable diagnosis and a same-visit fix in most cases. On dual-fuel models the equivalent culprit is a relay board underfeeding an element.",
    },
    {
      question: "Can you still get parts for older Dacor (Epicure / Renaissance) units?",
      answer:
        "Mostly, yes — igniters, hinges, gaskets, spark modules, and many controls are still obtainable or cross-reference cleanly. Some legacy relay boards and ERCs are discontinued; for those we evaluate board-level repair, which keeps a structurally excellent 20-year-old oven in service. We tell you the realistic parts picture at diagnosis.",
    },
    {
      question: "My Dacor burner keeps clicking after it lights. What's wrong?",
      answer:
        "Continuous clicking means a spark circuit thinks a burner still needs ignition — either moisture or grease in a spark switch (very common after boil-overs and in our humidity), a fouled re-ignition sensor, or a failing spark module. We isolate the leaking circuit rather than replacing the whole system. Until it's fixed, the clicking is annoying but not dangerous on a lit burner.",
    },
    {
      question: "Is a 15-year-old Dacor wall oven worth repairing?",
      answer:
        "Usually. The legacy Dacor chassis — the box, insulation, racks, door glass — is built to a standard that survives decades; what ages is the electronics and igniters. A relay board or control repair at a few hundred dollars against a $4K-$8K replacement wall oven (plus cabinetry modification, since cutout sizes changed) is the math most owners land on. We'll give you both numbers straight.",
    },
    {
      question: "Do you service Samsung-era Dacor — column fridges and the Contemporary line?",
      answer:
        "Yes. The post-2016 collections run modern electronics with proper diagnostic modes, and parts flow well through Samsung-Dacor distribution, typically 1-3 business days. Column refrigeration, steam-assist wall ovens, induction cooktops, and the touch-control ranges are all in scope, with EPA-608 certified techs on the refrigeration work.",
    },
    {
      question: "Do you work on Dacor range hoods and ventilation?",
      answer:
        "Yes — blower motors, control boards, and lighting on Dacor hoods and downdrafts. A hood that stopped moving air over a pro-style range is a kitchen-stopper in a South Florida summer, and it's usually a motor or switch-level repair, not a replacement.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Fisher & Paykel
// ---------------------------------------------------------------------------

const fisherPaykel: ResidentialBrandProfile = {
  slug: "fisher-paykel",
  name: "Fisher & Paykel",
  manufacturer: "Fisher & Paykel Appliances (Haier)",
  hq: "Auckland, New Zealand",
  tier: "premium",
  teaser:
    "The DishDrawer is the most distinctive dishwasher on the market — and the most misdiagnosed. We service the full Fisher & Paykel platform: DishDrawers, ActiveSmart refrigeration, CoolDrawer, and SmartDrive laundry.",
  metaTitle: "Fisher & Paykel Repair South Florida · $59 · Berne",
  metaDescription:
    "Fisher & Paykel repair in Miami-Dade, Broward & Palm Beach. DishDrawer F1, lid actuators, ActiveSmart fridges, SmartDrive washers. $59, 90-day warranty.",
  about:
    "Fisher & Paykel engineers differently than anyone else in the premium kitchen, and the DishDrawer is the proof: a dishwasher built as one or two independent drawers, each with its own motor, pump, lid mechanism, and flood sensor. It's brilliant when it runs and notorious when a shop that's never opened one starts guessing. The platform's famous F1 fault — flood switch triggered — sends more South Florida owners to Google than any other single F&P symptom, and nine times out of ten it traces to a lid seal, a drain path, or a perished hose rather than a dead machine. Beyond the DishDrawer, the brand runs deep: ActiveSmart refrigeration (counter-depth French doors and the integrated series), the CoolDrawer multi-temperature drawer that converts from freezer to pantry, SmartDrive direct-drive washers with their diverter-valve quirks, heat-pump dryers, and the pro-style ranges that came out of the DCS lineage. We service the full platform. Fisher & Paykel's diagnostic culture helps — the machines log faults thoroughly and the service data is good — but the field experience is what separates a correct lid-actuator diagnosis from an unnecessary control-board swap, and our techs have years of both drawers and the rest of the line under their belts.",
  equipment: [
    {
      series: "DishDrawer (DD24 double / single, Series 7-11)",
      description:
        "The signature product — independent drawer dishwashers. Lid actuators and seals, F1 flood faults, drain pumps, and rotor-position errors are the working list. Both drawers are independent: one failing never means both are gone.",
    },
    {
      series: "ActiveSmart refrigeration (RF series French door, counter-depth)",
      description:
        "Sensor-driven refrigeration with adaptive defrost. Evap fan faults, defrost element failures, ice maker assemblies, and door hinge cartridges are the standard tickets.",
    },
    {
      series: "Integrated and column refrigeration (RS series)",
      description:
        "Panel-ready integrated units serviced in place inside cabinetry. Display electronics, fan motors, and gasket work, with the same careful-millwork protocol as our other built-in brands.",
    },
    {
      series: "CoolDrawer (RB36 multi-temperature drawer)",
      description:
        "A drawer that runs as freezer, fridge, chill, or pantry on command. Mode-switching faults, sensor drift, and seal wear — a niche product we see in high-end Miami and Boca kitchens, and one very few shops will touch.",
    },
    {
      series: "SmartDrive washers and heat-pump dryers",
      description:
        "Direct-drive top loaders and the newer front-load platform. Diverter valve faults, drain pumps, rotor position sensors, and the heat-pump dryer lint-path cleaning that prevents half its failures.",
    },
    {
      series: "Ranges and cooktops (DCS heritage / RGV3, CG series)",
      description:
        "Pro-style gas ranges from the DCS lineage and current F&P-badged cooking. Igniters, spark modules, and convection fans — serviced with the same gas-licensed techs as our Wolf and Dacor work.",
    },
  ],
  failureModes: [
    {
      title: "DishDrawer F1 fault — flood switch triggered",
      detail:
        "F1 means water reached the flood sensor in the base pan. The drawer stops and runs its drain pump in self-protection. The real cause is usually a lid seal that's perished, a drain hose weep, or a blocked drain path — not a failed machine. We pull the drawer, find the actual leak, dry and reset the base, and replace the seal or hose that caused it. Owners who've been told the F1 means a new dishwasher call us for a second opinion weekly.",
    },
    {
      title: "Lid actuator failure — drawer won't seal or won't release",
      detail:
        "Each DishDrawer lid is driven by actuators that clamp it tight during a cycle. When an actuator fails, the drawer either won't start (no seal) or won't open after the cycle. It's the platform's best-known mechanical wear item, the parts are available, and replacement is routine for a tech who's done it dozens of times — and fiddly for one who hasn't.",
    },
    {
      title: "DishDrawer rotor-position / motor errors (ER codes)",
      detail:
        "The drawer's single motor handles wash and drain by reversing direction, sensed by rotor position. Debris in the pump chamber or a worn rotor throws motor errors mid-cycle. Clearing the chamber and inspecting the rotor solves most; genuine motor failures get a like-for-like replacement. The fault log tells the story before we open anything.",
    },
    {
      title: "ActiveSmart fridge warm with fans running — adaptive defrost faults",
      detail:
        "ActiveSmart refrigeration uses sensor-driven adaptive defrost, and when a defrost element or sensor fails, frost slowly chokes the evaporator: temperatures drift up over days while everything sounds normal. We test the defrost circuit and sensors against spec — it's the platform's most common refrigeration repair and a one-visit fix with parts we stock.",
    },
    {
      title: "CoolDrawer mode-switching and temperature drift",
      detail:
        "The CoolDrawer's party trick — freezer to pantry at a button press — relies on its damper, heater, and sensor array agreeing. When a mode change stalls or a setpoint drifts, the fault log identifies which leg failed. It's a rare product that most shops decline; we service it as part of the integrated-kitchen rotation.",
    },
    {
      title: "SmartDrive washer diverter valve — fills then drains, or won't spin",
      detail:
        "F&P's direct-drive top loaders route water and motion through a diverter valve that's a known wear item. Classic symptoms: machine drains during agitation, or refuses spin with an out-of-balance complaint that isn't about balance. The valve is inexpensive relative to the washer and the swap is routine for techs who know the platform.",
    },
    {
      title: "Ice maker and water path faults on RF French-door units",
      detail:
        "No ice, hollow ice, or a dispenser drip on the RF series usually lands on the fill valve, the filter housing, or the ice maker assembly itself. South Florida water quality accelerates scale in the fill path. We rebuild the water path end-to-end rather than swapping one part and hoping.",
    },
    {
      title: "Heat-pump dryer long cycles — lint-choked exchanger",
      detail:
        "F&P heat-pump dryers recirculate air through a heat exchanger that South Florida lint and humidity will eventually mat over. Symptom: ever-longer cycles and damp loads, no fault code. Deep-cleaning the exchanger and airflow path restores performance; we also check the condensate pump while we're in there, because it fails quietly around the same age.",
    },
  ],
  whyBerne:
    "Fisher & Paykel punishes guesswork — a DishDrawer F1 diagnosed by someone who's never pulled a drawer becomes a 'replace the dishwasher' quote, and an adaptive-defrost fault read with generic-fridge instincts becomes an unnecessary compressor story. Our techs work the platform on its own terms: we read the fault logs, we've done the lid actuators and diverter valves enough times to quote them confidently, and we stock the high-frequency parts — lid seals and actuators, drain pumps, defrost components, diverter valves — so most repairs close in one visit. Parts beyond truck stock flow through Fisher & Paykel's US distribution in 2-4 business days. Gas-licensed for the range work, EPA-608 certified for sealed-system refrigeration, 90-day labor and parts warranty on everything, and the $59 diagnostic is free when you approve the repair.",
  relatedServices: [
    { slug: "dishwasher-repair", label: "Dishwasher Repair" },
    { slug: "refrigerator-repair", label: "Refrigerator Repair" },
    { slug: "washer-repair", label: "Washer Repair" },
    { slug: "dryer-repair", label: "Dryer Repair" },
  ],
  serviceArea:
    "DishDrawers and ActiveSmart kitchens are spread across the whole tri-county map — Miami Beach and Aventura condos, Coral Gables and Pinecrest remodels, Fort Lauderdale, Weston, Boca Raton, Delray, and up the Palm Beach coast. We dispatch same-day across Miami-Dade, Broward, and Palm Beach when scheduling allows.",
  faqs: [
    {
      question: "My DishDrawer shows F1 and beeps. Is it dead?",
      answer:
        "No — F1 is the flood sensor doing its job. Water reached the base pan, almost always from a lid seal, a hose weep, or a blocked drain path, and the machine stopped to protect your kitchen. The fix is finding and repairing the actual leak, drying the base, and resetting. It's one of the most common calls we run on the platform, and it almost never means a new dishwasher.",
    },
    {
      question: "One drawer of my double DishDrawer died. Do I need to replace both?",
      answer:
        "No. Each drawer is a complete independent machine — its own motor, pump, control, and lid system. One drawer failing says nothing about the other. We repair the failed drawer; the working one keeps washing dishes the whole time.",
    },
    {
      question: "Can you actually get Fisher & Paykel parts in Florida?",
      answer:
        "Yes. We stock the high-frequency DishDrawer parts (lid seals, actuators, drain pumps) and common refrigeration components on the truck, and Fisher & Paykel's US parts distribution covers the rest in typically 2-4 business days. Parts supply on this brand is better than its niche reputation suggests.",
    },
    {
      question: "Why is my ActiveSmart fridge slowly getting warm?",
      answer:
        "Gradual warming over days — with fans audible and the compressor running — is the signature of a failing defrost circuit: frost builds on the evaporator until air can't move through it. It's the most common ActiveSmart repair and a straightforward fix once the failed element or sensor is identified. A sudden warm-up points elsewhere, which is exactly why we test rather than assume.",
    },
    {
      question: "Is the DishDrawer worth keeping versus replacing with a regular dishwasher?",
      answer:
        "If you like the format, yes — the platform is mechanically sound and every common failure (seals, actuators, pumps) is a repairable wear item far below replacement cost. Swapping to a conventional dishwasher also means cabinetry modification, since the DishDrawer cutout doesn't match standard 24-inch boxes. We'll give you honest numbers for both paths.",
    },
    {
      question: "Do you service Fisher & Paykel washers and heat-pump dryers?",
      answer:
        "Yes — SmartDrive top loaders (diverter valves, pumps, rotor sensors are the regulars), the front-load platform, and the heat-pump dryers, where a lint-matted heat exchanger causes most of the 'takes three cycles to dry' complaints. All carry the same $59 diagnostic and 90-day warranty.",
    },
    {
      question: "Do you work on the CoolDrawer?",
      answer:
        "Yes. The multi-temperature CoolDrawer is rare enough that many shops decline it, but it's part of our integrated-kitchen rotation — mode-switching faults, sensor drift, and seal wear are all serviceable, and the fault log makes honest diagnosis possible on the first visit.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Gaggenau
// ---------------------------------------------------------------------------

const gaggenau: ResidentialBrandProfile = {
  slug: "gaggenau",
  name: "Gaggenau",
  manufacturer: "Gaggenau Hausgeräte (BSH Home Appliances)",
  hq: "Munich, Germany",
  tier: "premium",
  teaser:
    "The 400 and 200 series are the most architectural appliances in any South Florida kitchen — and they're serviceable, by techs who know the BSH platform underneath and respect the millwork around it.",
  metaTitle: "Gaggenau Repair Miami & South Florida · $59 · Berne",
  metaDescription:
    "Gaggenau repair in Miami, Fort Lauderdale & Palm Beach. 400/200 series ovens, combi-steam, Vario cooktops, wine climate cabinets. EPA-608, 90-day warranty.",
  about:
    "Gaggenau sits at the top of the premium kitchen — the 400 series ovens with their solid-stainless doors, the EB 333 90-centimeter icon, combi-steam ovens plumbed into the wall, Vario cooktop modules set flush into stone, and climate cabinets protecting wine collections worth more than the kitchen. Under the architecture, though, is BSH engineering — the same parent company as Bosch and Thermador — which means structured diagnostics, error codes that mean something, and a parts pipeline we already work every week. That combination is exactly what Gaggenau service in South Florida needs. The machines are rational to diagnose; the installs are not casual. A 400-series oven door is a two-person lift, a Vario induction module comes out of a stone countertop that must not be chipped, and a combi-steam oven's fault often traces to the water it's been fed rather than the machine itself — South Florida's hard water scales steam generators on an accelerated schedule. Our techs service Gaggenau as part of the same senior rotation that handles Thermador and Bosch benchmark products, with the patience the hardware deserves and the BSH diagnostic procedures the platform is built around.",
  equipment: [
    {
      series: "400 series ovens (BO 480/481, EB 333)",
      description:
        "The flagship line — solid stainless doors, rotary-knob controls, and the 90cm EB 333. Door hinge and gasket work, heating elements, and control module faults, all serviced with two techs when the door mass requires it.",
    },
    {
      series: "Combi-steam ovens (BS 470/471/484, 200 series BSP)",
      description:
        "Plumbed and tank-fed steam ovens. Steam generator scaling, descale-cycle faults, door seals, and water-path valves — the most South-Florida-sensitive product in the line because of our water hardness.",
    },
    {
      series: "Vario cooktops 400/200 (VI induction, VG gas, VR grill, VP Teppan)",
      description:
        "Modular cooktop elements set flush into countertops. Induction generator modules, gas re-ignition, downdraft pairing, and the careful stone-side extraction the format demands.",
    },
    {
      series: "Vario cooling 400/200 (RC / RF / RB columns)",
      description:
        "Fully integrated refrigeration columns. Evap fans, defrost and sensor faults, door alignment in flush installs, and gasket work — EPA-608 certified techs on anything sealed-system.",
    },
    {
      series: "Wine climate cabinets (RW 404/414/466)",
      description:
        "Multi-zone wine columns with humidity control. Zone sensor drift, fan motors, door seal and UV-glass issues, and the humidity complaints that usually trace to seals rather than refrigeration.",
    },
    {
      series: "Dishwashers (DF 480/481 series)",
      description:
        "Panel-ready dishwashers on the BSH platform. Heat pump and circulation faults, E-code diagnostics, drain pumps, and door balance on heavy custom panels.",
    },
  ],
  failureModes: [
    {
      title: "Combi-steam scale faults — descale loop the unit can't complete",
      detail:
        "South Florida water is hard, and Gaggenau steam generators know it. Scale builds in the generator and valves until the unit demands descaling, then faults mid-descale because the buildup is past what the cycle can dissolve. We do a manual descale and water-path service, and we'll talk honestly about feed-water treatment — the only thing that changes the repeat interval.",
    },
    {
      title: "400-series oven door hinge wear — a two-person, by-the-book job",
      detail:
        "The solid stainless 400-series door is magnificent and heavy, and its hinges wear in a way lighter doors don't. Symptoms: a door that drops at the last centimeter, won't sit flush, or bleeds heat at the top. Hinge replacement on this line is a careful two-tech procedure — done right, the door closes like new for another decade.",
    },
    {
      title: "Control module and rotary-encoder faults on 400/200 ovens",
      detail:
        "Gaggenau's rotary controls feed encoders that occasionally fail or drift — an oven that changes modes on its own or ignores a knob has an encoder or control module fault, and the BSH error-code structure identifies which. We replace the failed module, not the whole control architecture.",
    },
    {
      title: "Vario induction module failure — one zone dead or cookware not detected",
      detail:
        "Each Vario induction element runs on generator boards that fail independently. A dead zone with the others working is a module-level diagnosis, confirmed through the BSH service test before anything is ordered. Extraction from a flush stone install is half the job, and we treat the countertop as the most expensive part in the room.",
    },
    {
      title: "Wine climate cabinet zone drift and humidity complaints",
      detail:
        "On RW cabinets, one zone drifting while others hold points at a zone sensor or damper, not the compressor. Humidity complaints usually trace to door seals or the charcoal filter rather than the climate system. We measure before we touch — collections in these cabinets justify the discipline.",
    },
    {
      title: "Integrated column warm-up — evap fan and defrost on RC/RF units",
      detail:
        "Gaggenau columns follow BSH refrigeration logic: gradual warming with the compressor running is airflow or defrost, sudden warming is electrical or sealed-system. The fault memory plus sensor checks sort it on the first visit. Flush installs are serviced in place with panels handled by the book.",
    },
    {
      title: "Dishwasher E-codes on the DF series — circulation and heat-pump faults",
      detail:
        "The DF dishwashers share BSH internals, so their E-codes map to known circuits — circulation pump, heat pump, flow sensor. A drawer of error history tells us more than an hour of guessing. Drain pumps and circulation units are stocked or 2-3 days through BSH parts.",
    },
    {
      title: "Gas Vario re-ignition faults near salt air",
      detail:
        "VG gas modules use flame-sensing re-ignition, and coastal installs corrode electrode harnesses faster than anywhere inland. Intermittent clicking or a burner dropping flame at simmer is electrode geometry, sensor fouling, or harness corrosion — diagnosable in one visit, and worth fixing before the spark module gets blamed.",
    },
  ],
  whyBerne:
    "Gaggenau owners in South Florida have two realistic options: factory-adjacent service with long scheduling horizons, or an independent shop that actually knows the BSH platform. We're the second — the same senior techs who handle our Thermador and Bosch benchmark work service Gaggenau with the BSH diagnostic procedures, error-code structure, and parts pipeline they already use weekly. We respect what the hardware costs: two techs on 400-series doors, stone-safe extraction on Vario modules, panel protocol on integrated columns, and measurements before parts on anything refrigerated. EPA-608 Universal certification covers the sealed-system work, the gas license covers the VG modules, and the 90-day parts and labor warranty covers everything we install. The $59 diagnostic is free when you approve the repair.",
  relatedServices: [
    { slug: "oven-repair", label: "Oven Repair" },
    { slug: "refrigerator-repair", label: "Refrigerator Repair" },
    { slug: "dishwasher-repair", label: "Dishwasher Repair" },
    { slug: "wine-cooler-repair", label: "Wine Cooler Repair" },
  ],
  serviceArea:
    "Gaggenau installs concentrate exactly where you'd expect — Fisher Island, Miami Beach, Brickell and Edgewater towers, Coral Gables, Bal Harbour, Golden Beach, Las Olas Isles, Boca Raton, and the Palm Beach island. We dispatch across the full tri-county footprint, and Gaggenau calls route to the senior premium-kitchen rotation.",
  faqs: [
    {
      question: "Does anyone in South Florida actually service Gaggenau?",
      answer:
        "Yes — we do, regularly. Gaggenau is built by BSH, the same group as Bosch and Thermador, so the diagnostic procedures and parts pipeline are ones we work every week. The difference from generic service is knowing the line's specifics: the 400-series door mass, the combi-steam water sensitivity, the Vario extraction protocol. That's exactly the work our senior rotation handles.",
    },
    {
      question: "My combi-steam oven keeps demanding descaling. Is something broken?",
      answer:
        "Probably scale, not a defect. South Florida water hardness loads steam generators far faster than the European water the descale intervals were designed around. A manual descale and water-path service clears the fault; treating the feed water is what actually extends the interval. We'll give you the honest version of both.",
    },
    {
      question: "Can you repair the EB 333 / 90cm Gaggenau oven?",
      answer:
        "Yes. The EB 333 is the line's icon and we treat it accordingly — heating elements, hinges, gaskets, and control modules are all serviceable, and the door work is done two-handed by procedure. Parts route through BSH distribution, typically 2-4 business days for anything not stocked.",
    },
    {
      question: "One zone of my Vario induction cooktop is dead. Whole cooktop gone?",
      answer:
        "Almost certainly not. Vario induction elements run independent generator modules — one dead zone with others working is a single-module diagnosis, confirmed through the BSH service test before we order anything. The careful part is extraction from your countertop, which we treat as the most expensive object in the kitchen.",
    },
    {
      question: "How expensive is Gaggenau repair compared to replacement?",
      answer:
        "The ratio is the friendliest in the industry: a 400-series oven runs $10K-$17K to replace, while the repairs we actually perform — hinges, elements, modules, seals, descaling — sit in the hundreds. Gaggenau engineers for decades of service. Unless a unit has catastrophic sealed-system or structural damage, repair wins the math, and we'll show you the numbers before any work starts.",
    },
    {
      question: "Do you service Gaggenau wine climate cabinets?",
      answer:
        "Yes — RW multi-zone cabinets included. Zone drift, fan motors, seals, and humidity issues are the regular work, and we measure actual zone temperatures against setpoint before replacing anything. For serious collections we prioritize scheduling the way we would a failing refrigerator.",
    },
    {
      question: "Are you an authorized Gaggenau service center?",
      answer:
        "No — Berne is an independent service company, not affiliated with or endorsed by Gaggenau or BSH. What we offer is BSH-platform fluency, senior techs, faster scheduling than the factory channel typically manages in South Florida, and a 90-day warranty on our work. For in-warranty units, factory service protects your coverage; out of warranty, independence is usually faster and less expensive.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Bertazzoni
// ---------------------------------------------------------------------------

const bertazzoni: ResidentialBrandProfile = {
  slug: "bertazzoni",
  name: "Bertazzoni",
  manufacturer: "Bertazzoni S.p.A.",
  hq: "Guastalla, Italy",
  tier: "premium",
  teaser:
    "Italian ranges with mechanical souls — Master, Professional, and Heritage series serviced by techs who understand that a Bertazzoni oven is tuned, not just repaired.",
  metaTitle: "Bertazzoni Range Repair South Florida · $59 · Berne",
  metaDescription:
    "Bertazzoni range & oven repair in Miami, Fort Lauderdale & Boca Raton. Igniters, thermostat calibration, convection fans. $59 diagnostic, 90-day warranty.",
  about:
    "Bertazzoni has built cooking equipment in Guastalla since 1882, and the ranges South Florida buys today — Master, Professional, and Heritage series in 24 to 48 inches — keep a deliberately mechanical character: brass burners, physical thermostats on the gas ovens, and far less electronics than the German and American competition. That design philosophy changes how the brand is serviced. A Bertazzoni gas oven that bakes hot or cold isn't throwing an error code; it has a thermostat that needs testing and often calibration, which is a skill, not a part swap. The burners light through spark modules and switch harnesses that South Florida humidity tests year-round. Oven doors run on hinge and spring assemblies that wear visibly by year five of heavy use. And because dealers cluster in the Miami Design District and the brand prices below Wolf while looking the part, the install base here is large, young, and growing — a lot of 30- and 36-inch Master series ranges in remodels from Coconut Grove to Delray. We service the platform on its own terms: mechanical diagnosis, honest calibration work, igniters and hinge kits on the truck, and the patience to align six brass burner caps so they all light on the first click.",
  equipment: [
    {
      series: "Master Series ranges (MAST 24-36\", gas / induction / dual-fuel)",
      description:
        "The volume seller in South Florida remodels. Spark modules and igniter switches, oven thermostat calibration, door hinge kits, and convection fan motors on the electric-oven versions.",
    },
    {
      series: "Professional Series ranges (PROF 24-48\")",
      description:
        "The flagship look — metal knobs, brass burners, available in the full width run. Same mechanical platform underneath: ignition, thermostats, hinges, plus griddle and double-oven options on the 48-inch.",
    },
    {
      series: "Heritage Series ranges (HERT 30-48\")",
      description:
        "The vintage-styled line. Mechanically close to Professional — we service ignition systems, oven calibration, and the trim-heavy doors with the care the finish deserves.",
    },
    {
      series: "Wall ovens and speed ovens (MAST/PROF 30\" electric)",
      description:
        "Electric wall ovens with more conventional controls. Heating elements, convection motors, door locks, and control faults — closer to standard European-oven service.",
    },
    {
      series: "Cooktops and rangetops (gas and induction)",
      description:
        "Gas cooktops share the range's burner and ignition hardware; induction models run generator modules diagnosed per-zone. Re-ignition faults near the coast are a recurring ticket.",
    },
    {
      series: "Ventilation and dishwashers (KU hoods, DW24 panel-ready)",
      description:
        "Hood blower motors and controls, and the panel-ready dishwashers Bertazzoni pairs with its kitchens — drain pumps, circulation faults, and door balance on custom panels.",
    },
  ],
  failureModes: [
    {
      title: "Gas oven baking hot or cold — thermostat calibration drift",
      detail:
        "Bertazzoni gas ovens run mechanical thermostats, and they drift — a unit baking 25-50°F off setpoint is the brand's signature complaint. The fix is testing the thermostat against a calibrated probe and either adjusting it (there's a calibration procedure most shops never learned) or replacing it when it's past adjustment. We do the measurement first; half the 'broken oven' calls are recoverable by calibration.",
    },
    {
      title: "Burner igniters clicking continuously or not sparking",
      detail:
        "The spark system — module, switch harness, electrodes — is the most common Bertazzoni service call in our climate. Boil-overs and humidity track moisture into igniter switches, causing phantom clicking; corroded electrodes stop sparking entirely. We isolate the leaking switch or dead electrode circuit rather than shotgunning parts, and we re-seat burner caps whose misalignment causes half the 'won't light' complaints.",
    },
    {
      title: "Oven door dropping or not closing flush — hinge and spring wear",
      detail:
        "Bertazzoni doors run on hinge-and-spring assemblies that wear by year four to six of heavy use. A door that drops open the last inch or won't sit flush bleeds heat, stretches preheat times, and cooks unevenly — owners often blame the thermostat. Hinge kits are available and the replacement is routine; we check door seal compression while we're in there.",
    },
    {
      title: "Convection fan failure on dual-fuel and electric ovens",
      detail:
        "The convection motor on dual-fuel Masters and Professionals develops bearing noise before it dies — a scraping or droning behind the oven's back wall. Caught early it's a clean motor swap; ignored, it can take the fan blade into the element. Parts come through Bertazzoni's US distribution, typically 3-5 business days, so calling at the first noise saves an oven-less week.",
    },
    {
      title: "Dual-fuel oven dead on one function — element or selector faults",
      detail:
        "On dual-fuel models, bake working while broil is dead (or convection-only failures) traces to the individual element or the selector switch feeding it. Element resistance testing sorts it in minutes. The electric ovens are conventional under the Italian skin — these are honest, predictable repairs.",
    },
    {
      title: "Flame dropping at simmer on brass burners",
      detail:
        "The dual-ring brass burners simmer beautifully when the flame-sense and air mixture are right, and frustrate when they're not — a burner that dies at low flame has a fouled sensing circuit, a misaligned cap, or an air-shutter issue from the factory setting. It's tuning work, and it's why a Bertazzoni tech needs mechanical patience more than a parts catalog.",
    },
    {
      title: "Induction zone faults on Master induction ranges",
      detail:
        "The induction Masters run per-zone generator boards. A zone that stops detecting cookware or throws a flashing fault is diagnosed through the service test to module level before ordering. Less common in the field than the gas issues, but fully serviceable.",
    },
  ],
  whyBerne:
    `Bertazzoni rewards mechanical service culture, and that's what our cooking-side techs bring — the same crew that handles Wolf and Dacor ranges. We test gas oven thermostats against calibrated probes instead of declaring them dead, we carry igniter switches, spark modules, and hinge kits for the common Master and Professional configurations, and we know the brand-specific quirks: the calibration procedure, the burner-cap geometry, the air-shutter tuning that makes the simmer behave. Licensed for gas, insured, 18 technicians across the tri-county map, ${REPAIRS_COMPLETED} completed repairs, and a 4.79-star average across 1,373 customer reviews. The $59 diagnostic is free with an approved repair and everything we install carries the 90-day parts and labor warranty.`,
  relatedServices: [
    { slug: "oven-repair", label: "Oven Repair" },
    { slug: "range-hood-repair", label: "Range Hood Repair" },
    { slug: "dishwasher-repair", label: "Dishwasher Repair" },
  ],
  serviceArea:
    "Bertazzoni's South Florida footprint follows the remodel map — Coconut Grove, Coral Gables, Miami Shores, Doral, Aventura, Hollywood, Fort Lauderdale, Coral Springs, Boca Raton, and Delray Beach, with dealers clustered around the Miami Design District feeding new installs every month. Same-day dispatch across Miami-Dade, Broward, and Palm Beach when scheduling allows.",
  faqs: [
    {
      question: "My Bertazzoni oven runs hot (or cold). Can it be fixed without a new thermostat?",
      answer:
        "Often, yes. The gas ovens use mechanical thermostats with a factory calibration procedure — drift up to a few dozen degrees is frequently recoverable by adjustment against a calibrated probe. When the thermostat is past adjustment, replacement is straightforward. Either way the diagnosis is a measurement, not a guess, and it happens on the first visit.",
    },
    {
      question: "Why do my Bertazzoni burners keep clicking?",
      answer:
        "Continuous clicking means a spark circuit believes a burner needs lighting — usually moisture or boil-over residue in an igniter switch, sometimes a failing spark module or a burner cap sitting a few millimeters off its seat. We isolate the specific circuit; replacing the whole ignition system is almost never necessary. In South Florida humidity this is the brand's most common call.",
    },
    {
      question: "Are Bertazzoni parts hard to get in the US?",
      answer:
        "The common service parts — igniters, switches, spark modules, hinge kits, thermostats, fan motors — flow through Bertazzoni's US distribution in typically 3-5 business days, and we stock the highest-frequency items on the truck. Cosmetic and trim parts for the Heritage line can take longer. We give you the realistic timeline at diagnosis.",
    },
    {
      question: "Is Bertazzoni worth repairing, or should I switch to another brand?",
      answer:
        "Repair, in almost every case. The platform is mechanically simple, parts are reasonable, and the common failures — ignition, thermostats, hinges, fans — are wear items, not design flaws. A typical repair lands in the $200-$450 range against $3K-$8K for a comparable replacement range. The mechanical simplicity that causes the quirks also makes the brand durable.",
    },
    {
      question: "Do you service the 48-inch Professional with the double oven?",
      answer:
        "Yes — both ovens, the griddle, and the full burner set. The 48-inch units add a second thermostat and more ignition circuits, which means more things to tune and the same logic to tune them with. It's a configuration we see regularly in Gables and Boca kitchens.",
    },
    {
      question: "My new Bertazzoni never baked accurately from day one. Defect or normal?",
      answer:
        "Common, and usually fixable. Factory thermostat settings plus South Florida installation variables (gas pressure, ventilation) mean some units need a calibration pass to bake true — a service visit, not a warranty war. If you're in warranty, Bertazzoni's channel should handle it; out of warranty or tired of waiting, we calibrate against a certified probe and show you the before/after numbers.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Monogram (GE's luxury line)
// ---------------------------------------------------------------------------

const monogram: ResidentialBrandProfile = {
  slug: "monogram",
  name: "Monogram",
  manufacturer: "GE Appliances (Haier)",
  hq: "Louisville, Kentucky",
  tier: "premium",
  teaser:
    "GE's luxury line pairs premium hardware with the best parts logistics in the industry — built-in refrigeration, pro ranges, and Advantium speed ovens repaired fast because the parts actually show up.",
  metaTitle: "Monogram Appliance Repair South Florida · $59 · Berne",
  metaDescription:
    "Monogram repair across Miami-Dade, Broward & Palm Beach — built-in fridges, pro ranges, Advantium ovens, ice machines. Priority service, $59 diagnostic, 90-day warranty.",
  about:
    "Monogram is GE's luxury division, and it occupies a sweet spot for South Florida owners: genuinely premium hardware — 42- and 48-inch built-in refrigeration, columns, pro-style dual-fuel ranges, the Advantium speed-oven family, nugget and gourmet ice machines — backed by GE's parts network, which is simply the best in the industry. That second half changes the ownership experience more than people expect. Where a European competitor's control board might take two weeks to land, the equivalent Monogram part is typically in our hands in one to three days, which is the difference between a weekend without a refrigerator and a month. The service work itself follows premium built-in logic: ZIS/ZISS 42- and 48-inch built-ins with sealed-system and evap-fan tickets, column refrigeration in newer installs, Advantium ovens whose speed-cook magic runs through halogen lamps and magnetrons that age, dual-fuel pro ranges with relay-board and igniter work, and the undercounter ice machines that South Florida garages punish. Our techs carry GE factory service-manual fluency across the line, the EPA-608 certification the sealed systems require, and enough Monogram tickets logged to know the platform's habits — including which version of a part GE has revised and superseded, which matters on a brand with 30 years of built-in history in local kitchens.",
  equipment: [
    {
      series: "Built-in refrigeration (ZIS / ZISS 42\"-48\" side-by-side)",
      description:
        "The classic Monogram built-ins anchoring South Florida kitchens since the 90s. Evap and condenser fans, dispenser systems, control boards, and sealed-system work on the units worth saving.",
    },
    {
      series: "Column refrigeration (ZIR / ZIF panel-ready)",
      description:
        "The current integrated column platform. Door alignment, ice maker faults, display electronics, and gasket work — serviced in place inside custom cabinetry.",
    },
    {
      series: "Pro ranges and rangetops (ZHP / ZDP 30-48\" dual-fuel)",
      description:
        "Pro-style dual-fuel ranges. Igniters and spark systems, oven relay boards, convection motors, and the griddle options on 48-inch configurations.",
    },
    {
      series: "Advantium speed ovens (ZSB / ZSC wall and over-range)",
      description:
        "The halogen-plus-microwave speed platform. Halogen lamp failures, magnetrons, door switches, and control faults — a Monogram-specific specialty most shops won't open.",
    },
    {
      series: "Wall ovens (ZTS / ZET Statement & Minimalist)",
      description:
        "Electric convection wall ovens. Heating elements, door locks, hinge kits, and the control-panel faults GE's diagnostics isolate cleanly.",
    },
    {
      series: "Ice machines and undercounter (ZDIS / UCC nugget and gourmet)",
      description:
        "Undercounter clear-ice and nugget machines. Scale management, pumps, bin sensors, and the condenser cleaning that South Florida installs need twice as often as the manual suggests.",
    },
  ],
  failureModes: [
    {
      title: "ZIS/ZISS built-in warm on the fresh-food side — fan and defrost circuit",
      detail:
        "The classic 42/48 built-in complaint. With the compressor running, a warm fresh-food side traces to the evaporator fan, a frost-choked air path from an incomplete defrost, or a damper fault — far more often than the compressor itself. We test the actual circuit with the panels off and quote from measurements. Most of these close in one visit with truck-stock parts.",
    },
    {
      title: "Advantium halogen lamp and magnetron aging",
      detail:
        "Advantium's speed-cook runs on high-output halogen lamps plus a microwave magnetron, and both age — symptoms range from 'speed-cook takes twice as long' to a dead cavity with the controls alive. Lamp and magnetron replacements are routine for us and mysterious to shops that treat it like a normal microwave. GE parts availability keeps these repairs fast and economical.",
    },
    {
      title: "Dispenser system failures on built-ins — auger motors, chutes, solenoids",
      detail:
        "Through-the-door ice and water on the ZIS platform runs an auger motor, chute flap, and solenoid set that wears with use. No ice dispensing with ice in the bin is the auger circuit or a frozen chute; a dribbling water dispenser is the valve or a fatigued line. All of it is serviceable, and the parts are days away at worst.",
    },
    {
      title: "Pro range oven relay board faults (ZDP dual-fuel)",
      detail:
        "Dual-fuel Monogram ranges drive their electric ovens through relay boards with a known aging pattern — an element that stops energizing, erratic preheat, or a convection mode that quietly disappeared. Board diagnosis is by-the-book GE procedure, replacements are available (often revised versions that outlast the originals), and the gas side keeps working throughout.",
    },
    {
      title: "Ice machine scale and pump failures in garage installs",
      detail:
        "South Florida garages push undercounter ice machines hard — heat raises head pressure while hard water scales the evaporator plate and pump. Production drops, cubes go cloudy or thin, and eventually the pump or bin sensor quits. We descale, service the water path, clean the condenser, and replace what's actually worn. Twice-yearly cleaning roughly doubles machine life here.",
    },
    {
      title: "Column ice maker faults on ZIR panel-ready units",
      detail:
        "The integrated columns' ice systems fault through fill valves, level sensing, and the occasional harness issue at the door. GE's diagnostic mode surfaces the failing leg directly, which keeps this an evidence-based repair rather than a parts cannon.",
    },
    {
      title: "Wall oven door lock and hinge issues on self-clean units",
      detail:
        "Self-clean cycles are hard on door lock motors and hinges — the classic post-clean call is a door locked shut or a door that no longer sits flush. Lock motor replacement and hinge kits are standard work, and we'll tell you honestly: skip the self-clean cycle on an aging oven and the door hardware lasts years longer.",
    },
    {
      title: "Control board failures after summer power events",
      detail:
        "Storm-season surges take out Monogram refrigeration and oven boards every year. Symptoms: dead displays, units stuck in fault states, compressors locked out. GE's board availability (and revision history) makes these unusually fast repairs for the premium segment — typically days, not weeks. Surge protection on built-ins is the cheapest insurance we recommend.",
    },
  ],
  whyBerne:
    "Monogram is where premium service should be easy, and we make it so. GE's parts network means we quote realistic timelines and hit them — common boards, fans, igniters, lamps, and valves either ride on the truck or land in 1-3 business days, the fastest in the premium segment. Our techs carry GE service-manual fluency across the Monogram line, EPA-608 Universal certification for the sealed-system work, and gas licensing for the pro ranges. We've logged enough tickets on the ZIS built-in platform alone to know its habits cold, and the Advantium family — which many shops decline — is standard work for us. The $59 diagnostic is free when you approve the repair, every job carries the 90-day parts and labor warranty, and same-day dispatch covers the full tri-county footprint.",
  relatedServices: [
    { slug: "refrigerator-repair", label: "Refrigerator Repair" },
    { slug: "oven-repair", label: "Oven Repair" },
    { slug: "ice-maker-repair", label: "Ice Maker Repair" },
    { slug: "dishwasher-repair", label: "Dishwasher Repair" },
  ],
  serviceArea:
    "Monogram built-ins span thirty years of South Florida kitchens — from classic ZIS units in Pinecrest, Coral Gables, and Plantation to new column installs in Brickell, Aventura, Fort Lauderdale, Boca Raton, and Palm Beach Gardens. We dispatch across Miami-Dade, Broward, and Palm Beach counties, same-day when scheduling allows.",
  faqs: [
    {
      question: "Is Monogram the same as GE? Who actually makes it?",
      answer:
        "Monogram is GE Appliances' luxury division — designed and built by GE (owned by Haier since 2016) as a separate premium line from GE Profile and Café. For service this is good news: the hardware is premium-grade, but parts flow through GE's distribution network, the strongest in the industry, which keeps Monogram repairs faster and more economical than European-brand equivalents.",
    },
    {
      question: "My 42-inch Monogram built-in is warm on the fridge side. Compressor?",
      answer:
        "Statistically unlikely. On the ZIS/ZISS platform a warm fresh-food side with the unit running usually means the evaporator fan, a frost-blocked air path from a defrost fault, or a damper issue. The compressor is the last suspect, not the first. We test the actual circuits at the $59 diagnostic — which is free if you approve the repair — before any expensive word gets used.",
    },
    {
      question: "Do you repair Advantium ovens?",
      answer:
        "Yes, and it's something of a specialty — the Advantium's halogen-lamp-plus-magnetron design confuses shops that treat it like a standard microwave. Lamp replacement, magnetrons, door switches, and control faults are all routine for us, and GE parts availability keeps the repairs quick. If speed-cook has gotten slow or the cavity went dead, it's almost always repairable.",
    },
    {
      question: "How fast can you get Monogram parts?",
      answer:
        "Fastest in the premium segment. Common parts ride on the truck; nearly everything else lands in 1-3 business days through GE's distribution. Even control boards for 20-year-old ZIS built-ins are usually obtainable, often as revised versions that outlast the originals. It's the single biggest ownership advantage Monogram has over European competitors.",
    },
    {
      question: "Is a 20-year-old Monogram built-in worth repairing?",
      answer:
        "Often yes. The ZIS-era cabinets and sealed systems were built for the long haul, replacement built-ins start around $10K installed, and GE's parts support for the old platform remains unusually good. The honest exceptions: a failed sealed system on a corroded coastal unit, or repeated board failures — and we'll tell you straight when replacement wins the math.",
    },
    {
      question: "Do you service Monogram ice machines?",
      answer:
        "Yes — the undercounter clear-ice and nugget machines, including the garage installs South Florida loves and the machines hate. Descaling, water-path service, pumps, bin sensors, and condenser cleaning are the regular work. If production has dropped or the cubes have gone thin, call before the pump fails; the early version of that repair is much cheaper.",
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
  liebherr,
  dacor,
  fisherPaykel,
  gaggenau,
  bertazzoni,
  monogram,
];

/**
 * Brand hubs added in the 2026-06-11 content wave. EN-only (no `es` block):
 * excluded from the /es lane and given en+x-default hreflang. Sitemap uses
 * this to set the fresher lastmod.
 */
export const NEW_BRAND_SLUGS_2026_06_11 = [
  "liebherr",
  "dacor",
  "fisher-paykel",
  "gaggenau",
  "bertazzoni",
  "monogram",
] as const;

export const RESIDENTIAL_BRAND_SLUGS = RESIDENTIAL_BRAND_PROFILES.map((b) => b.slug);

export const RESIDENTIAL_BRAND_BY_SLUG: Record<string, ResidentialBrandProfile> =
  Object.fromEntries(RESIDENTIAL_BRAND_PROFILES.map((b) => [b.slug, b]));

export function getResidentialBrand(slug: string): ResidentialBrandProfile | undefined {
  return RESIDENTIAL_BRAND_BY_SLUG[slug];
}
