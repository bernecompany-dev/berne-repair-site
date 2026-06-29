import type { HighEndService } from "./types";

export const coldPlungeRepair: HighEndService = {
  slug: "cold-plunge-repair",
  name: "Cold Plunge Repair",
  shortName: "Cold Plunge",
  seoNoun: "cold plunge",
  metaTitle: "Cold Plunge Repair Miami | Chiller & Sealed-System Pros",
  metaDescription:
    "Cold plunge & ice-bath chiller not cooling? EPA 608-certified sealed-system repair for Plunge, Renu Therapy, Blue Cube & more across South Florida. $59 service call.",
  cardDescription:
    "Chiller, pump, and sealed-system repair for home cold plunges and ice baths. $59 service call.",
  heroLede: "for South Florida's wellness rooms.",
  longDescription:
    "A cold plunge is precision refrigeration in a beautiful shell — a sealed compressor system pushing 37-50°F water against the Florida heat. When yours stops reaching setpoint, frosts over, trips its GFCI, or stops circulating, our EPA 608 Universal technicians diagnose the chiller the same way we diagnose a built-in Sub-Zero. We service Plunge, Renu Therapy, Blue Cube, Penguin Chillers, and standalone water chillers and heat-pumps across Miami-Dade, Broward, and Palm Beach.",
  ownerNote: {
    opener:
      "I've spent eleven years repairing sealed refrigeration systems — Sub-Zero, Viking, Thermador — and a cold plunge chiller is the same physics in a different cabinet.",
    body:
      "Most plunge owners get told to 'replace the whole unit' the moment the chiller stops cooling. That's almost never necessary. Underneath the wood and acrylic, a Penguin or Blue Cube chiller is a compressor, an evaporator, a condenser coil, a TXV or cap-tube, and a charge of R-134a or R-513A — a system I'm legally certified to open, recover, and recharge under EPA Section 608 Universal. Down here, the real killers are hard-water scale choking the heat exchanger, salt-air corrosion on the condenser, and undersized circulation pumps cooked by 90°F ambient air in a garage plunge room.",
    closer:
      "If your water won't get cold, send me a photo of the chiller's data plate before you spend five figures on a replacement. Nine times out of ten it's a repair, not a write-off.",
  },
  diagnosisTitle: "How we diagnose & fix cold plunge chillers",
  diagnosisIntro:
    "A cold plunge that won't cool is a refrigeration call, not a plumbing one. We work the sealed system, the water loop, and the controls in that order — measuring superheat and subcooling, water flow, and board signals before we touch a part.",
  commonIssues: [
    "Water won't reach the cold setpoint",
    "Chiller compressor runs but doesn't cool",
    "Ice or frost building on the evaporator / lines",
    "Circulation pump not running or airlocked",
    "GFCI or breaker tripping on startup",
    "Scale, cloudy water, or failed ozone/UV sanitation",
    "Control board or temp-sensor fault codes",
  ],
  failureModes: [
    {
      symptom: "Chiller runs constantly but water never gets below ~60°F",
      cause:
        "Almost always a sealed-system problem: a slow refrigerant leak that's dropped the charge, or a restricted metering device (cap-tube/TXV). On South Florida coastal installs we also see condenser coils so caked with salt and dust they can't reject heat, so the system runs but loses capacity.",
      fix:
        "We take suction/discharge pressures, calculate superheat and subcooling, and pinpoint whether it's charge, restriction, or airflow. Leak-detection, evacuation, and recharge with R-134a or R-513A are EPA Section 608 work — we hold Universal certification and do it on-site. A coil clean-and-comb often restores full capacity on its own.",
    },
    {
      symptom: "Evaporator or refrigerant lines are frosting / iced over",
      cause:
        "Low charge or weak water flow across the heat exchanger drops evaporator temperature below freezing, so the loop ices and chokes itself. A failing circulation pump, clogged filter, or scaled-up plate exchanger starves flow and triggers the same frost.",
      fix:
        "We thaw and inspect, then chase the root cause — restore water flow (pump, filter, descale), or correct an undercharge through proper recovery and recharge. We never just 'top off' a sealed system blind; we fix the leak first, then weigh in the correct charge.",
    },
    {
      symptom: "Compressor tries to start, hums, then trips the breaker or GFCI",
      cause:
        "A failed start capacitor or start relay on the compressor, a grounded/shorted compressor winding, or moisture and corrosion in the chiller's electrical box — extremely common in humid garage and patio plunge rooms on the Florida coast.",
      fix:
        "We meter the windings, test the cap/relay, and check insulation resistance to ground. Cap and relay kits are a same-visit swap. If the GFCI itself is nuisance-tripping from moisture, we dry, seal, and correct the circuit. A truly grounded compressor we quote against the cost of a new chiller honestly.",
    },
    {
      symptom: "Water flow is weak or the circulation pump won't prime",
      cause:
        "Airlock after a water change, a clogged filter or intake, scale buildup seizing the impeller, or a pump motor that's failed after years of running hot. Without flow the chiller can't transfer cold into the water no matter how well the compressor runs.",
      fix:
        "We purge the airlock, clear and descale the loop, and test pump amp-draw against spec. A seized or burned-out pump gets replaced — we match flow rate and head so the chiller sees the water volume it was engineered for.",
    },
    {
      symptom: "Cloudy water, biofilm, or ozone/UV sanitation not keeping up",
      cause:
        "South Florida's hard, mineral-heavy water scales the plate exchanger and fouls the filter fast, and a dead ozone generator or expired UV lamp lets biofilm take over. Scale also acts as insulation on the heat exchanger, quietly stealing cooling capacity.",
      fix:
        "We descale the exchanger and loop, replace the filter, and test/replace the ozone module or UV lamp. We leave you on a hard-water maintenance interval so scale never gets a foothold again — the same discipline that keeps coastal Sub-Zero condensers alive.",
    },
    {
      symptom: "Display shows a fault code or the temp sensor reads wildly wrong",
      cause:
        "A drifting or failed thermistor/RTD feeds the control board a false water temperature, so it short-cycles, over-cools, or refuses to run. Less often the control board itself has corroded or lost a relay in the humid cabinet environment.",
      fix:
        "We verify the sensor against a calibrated thermometer and swap it if it's out of tolerance — a quick fix on most chillers. Board faults we diagnose, then source the brand-specific board; we set expectations on lead time up front rather than guessing.",
    },
  ],
  faqs: [
    {
      question: "Is it worth repairing a cold plunge chiller or should I replace it?",
      answer:
        "In the large majority of cases, repair. The chiller is a sealed refrigeration system, and most failures are a capacitor, pump, sensor, leak, or scale — all repairable for a fraction of replacement cost. We only recommend replacing when a compressor is internally shorted or the cabinet is beyond economical repair, and we'll show you the math before you decide.",
    },
    {
      question: "Which cold plunge and chiller brands do you service?",
      answer:
        "Plunge (The Cold Plunge), Renu Therapy, Blue Cube, Ice Barrel, Morozko Forge, Cold Stoic, and Penguin Chillers, plus generic add-on water chillers and heat-pump chillers. Because the underlying refrigeration is universal, we can service most standalone chillers even when the tub is a custom or DIY build.",
    },
    {
      question: "How much does a cold plunge repair visit cost?",
      answer:
        "Our diagnostic is a flat $59 service call — and it's free when you approve the repair, charged only if you decline. You get a written diagnosis with parts and labor before any work starts. No hidden diagnostic fee stacked on top.",
    },
    {
      question: "Are you certified to work on the refrigerant / sealed system?",
      answer:
        "Yes. We hold EPA Section 608 Universal certification, which legally covers recovering, evacuating, and recharging refrigerant on these chillers (R-134a, R-513A, and similar). Sealed-system work is illegal for uncertified handymen to perform — we do it correctly, recover refrigerant responsibly, and fix the leak rather than just topping off.",
    },
    {
      question: "How do I keep my cold plunge from breaking in the first place?",
      answer:
        "In South Florida the two enemies are hard-water scale and salt-air corrosion. Keep up with filter changes and water care, descale the chiller's heat exchanger on a regular interval, keep the condenser coil clean and clear of debris, and make sure the chiller has real airflow if it lives in a hot garage. We offer a maintenance visit that handles all of it.",
    },
  ],
  brands: [
    "Plunge",
    "Renu Therapy",
    "Blue Cube",
    "Ice Barrel",
    "Morozko Forge",
    "Cold Stoic",
    "Penguin Chillers",
    "Heat-pump chillers",
    "Generic water chillers",
  ],
  related: [
    {
      href: "/services/electric-sauna-repair",
      label: "Electric Sauna Repair",
      blurb:
        "The hot half of the contrast-therapy setup — heater elements, controls, and sensors for residential saunas.",
    },
    {
      href: "/services/pool-heater-repair",
      label: "Pool Heater Repair",
      blurb:
        "Heat-pump and gas pool heaters share the same refrigeration and water-loop diagnostics we use on plunge chillers.",
    },
    {
      href: "/services/refrigerator-repair",
      label: "Refrigerator Repair",
      blurb:
        "Built-in and luxury refrigeration — shared sealed-system refrigeration expertise straight from our Sub-Zero benches.",
    },
  ],
  article: {
    slug: "cold-plunge-chiller-not-cooling-miami",
    title: "Cold Plunge Chiller Not Cooling? A Refrigeration Tech's Guide (Miami)",
    description:
      "Why South Florida cold plunge chillers stop reaching setpoint — sealed-system leaks, hard-water scale, weak pumps, and frost — and what an EPA 608-certified tech actually checks before recommending replacement.",
    publishedAt: new Date("2026-06-25T13:00:00Z"),
    author: "Eugene Berne, Owner — Berne Appliance Repair",
    readingMinutes: 7,
    topic: "premium-service",
    body: `A client in Pinecrest texted us in June: her $13,000 cold plunge had drifted from a crisp 39°F up to a useless 64°F over a week, and the dealer's answer was "the chiller's shot, order a new one." We were at her house the next morning. The data plate read R-513A, the condenser coil was a felt mat of dust and salt, and the suction pressure told the whole story in ninety seconds — the unit was low on charge from a slow leak at a flare fitting. We found the leak, evacuated the system, replaced the fitting, weighed in the correct charge, and combed the coil. She was back to 38°F that afternoon for a few hundred dollars instead of five figures.

That call is the most common [cold plunge repair](/services/cold-plunge-repair) we get in South Florida, and it illustrates the single most important thing an owner should understand: **a cold plunge chiller is precision refrigeration.** Under the acrylic and the cedar surround, a Plunge, Blue Cube, or Penguin chiller is the same kind of sealed system we've serviced in built-in Sub-Zeros for eleven years — a compressor, a condenser, an evaporator/heat exchanger, a metering device, and a refrigerant charge. The same diagnostic logic applies, and so does the same law: opening that sealed system requires EPA Section 608 certification.

## "Runs but won't get cold" is almost always the sealed system

When the compressor is clearly running — you can hear it, you can feel the cabinet getting warm — but the water never reaches setpoint, the problem is one of three things, in order of how often we see them:

1. **Low refrigerant charge from a leak.** Flare fittings, Schrader cores, and brazed joints all leak eventually, especially in the vibration and humidity of a Florida install. Low charge means low capacity. The fix is not to "top it off" — that's both illegal blind and pointless. We find the leak with electronic detection, repair it, evacuate to remove moisture, and weigh in the exact factory charge.

2. **A dirty or corroded condenser coil.** This is the Florida special. Salt aerosol within a couple miles of the coast, plus construction dust and garage grime, builds an insulating mat across the condenser fins. The compressor runs but can't reject heat, so capacity collapses. A proper coil clean often restores the unit with no parts at all.

3. **A restricted metering device** (cap tube or TXV), which mimics low charge on the gauges but reads differently on superheat and subcooling. We measure both before we condemn any part — guessing here is how owners get sold compressors they didn't need.

## Hard water is quietly killing your heat exchanger

South Florida tap water is hard — heavy in calcium and magnesium. Inside a chiller's plate heat exchanger, those minerals precipitate out as scale, and scale is an insulator. A scaled exchanger can't transfer cold into the water efficiently, so the chiller runs longer and longer for less and less effect, and eventually the evaporator side gets cold enough to **frost and ice over**, choking flow entirely.

The same hard water and biofilm foul filters, seize circulation-pump impellers, and overwhelm ozone and UV sanitation. When we get a "weak cooling" or "frosting" call, descaling the loop and exchanger is often half the repair. We put owners on a descale-and-filter interval afterward so it never recurs — the exact maintenance discipline that keeps coastal refrigeration alive. If you've read our writeups on keeping condensers clean for [refrigerator repair](/services/refrigerator-repair), it's the identical principle applied to a plunge.

## The pump and the electrics

No water flow means no cooling, even with a perfect refrigerant charge — the chiller has nothing to pull heat out of. After a water change, plunges frequently **airlock**, and the circulation pump won't prime. Other times the pump motor has simply cooked itself after years of running in a 90°F garage, or scale has seized the impeller. We purge the airlock, descale, and check the pump's amp draw against spec before deciding whether it needs replacement.

The other recurring Florida failure is electrical. Humid cabinets corrode start capacitors, relays, and GFCI circuits. A chiller that **hums and trips the breaker on startup** usually needs a capacitor or relay — a same-visit fix — not a new compressor. A GFCI that nuisance-trips is often just moisture intrusion that needs drying and sealing. We meter the compressor windings and insulation resistance before condemning anything expensive.

## Why EPA 608 certification matters here

Any handyman can swap a pump or a filter. But the moment a repair involves the refrigerant — recovering it, finding a leak, evacuating, recharging — it is sealed-system work, and under EPA Section 608 it is illegal for an uncertified person to perform. We hold **Section 608 Universal certification**, the same credential that lets us open a Sub-Zero's sealed system. That means we can actually fix a leaking or undercharged chiller correctly and legally, recover refrigerant responsibly, and stand behind the charge weight — instead of telling you to throw the unit away.

## When replacement really is the answer

We'll always tell you straight. If a compressor has an internally shorted or grounded winding, or the cabinet has corroded past economical repair, replacement is the honest call — and we'll show you the numbers. But that's the exception. The large majority of "the chiller is dead" verdicts we're called in to confirm turn out to be a leak, a coil, a cap, a pump, or scale.

## Book a diagnosis

If your cold plunge won't reach temperature, frosts over, or trips its breaker, get a real refrigeration diagnosis before you spend five figures replacing it. Our diagnostic is a flat **$59 service call** — free when you approve the repair, charged only if you decline — and you get a written quote with parts and labor before any work begins. Call **(754) 345-4515** and we'll have an EPA 608-certified tech at your South Florida door, most days within a few hours.`,
  },
  es: {
    name: "Reparación de Baños de Inmersión Fría",
    shortName: "Baño de Inmersión Fría",
    seoNoun: "baño de inmersión fría",
    metaTitle: "Reparación de Tinas de Inmersión Fría y Chillers",
    metaDescription:
      "¿El chiller de tu baño de hielo no enfría? Reparación del sistema sellado con certificación EPA 608 para Plunge, Renu Therapy, Blue Cube y más en el sur de Florida. Visita técnica de $59.",
    heroLede: "para las salas de bienestar del sur de Florida.",
    longDescription:
      "Un baño de inmersión fría es refrigeración de precisión dentro de una carcasa elegante: un sistema sellado con compresor que mantiene el agua entre 37 y 50°F contra el calor de Florida. Cuando deja de alcanzar la temperatura, se llena de escarcha, dispara el GFCI o deja de circular, nuestros técnicos con certificación EPA 608 Universal lo diagnostican igual que un Sub-Zero empotrado. Damos servicio a Plunge, Renu Therapy, Blue Cube, Penguin Chillers y chillers de agua independientes en Miami-Dade, Broward y Palm Beach.",
    ownerNote: {
      opener:
        "He pasado once años reparando sistemas de refrigeración sellados — Sub-Zero, Viking, Thermador — y el chiller de un baño de inmersión fría es la misma física en otro gabinete.",
      body:
        "A la mayoría de los dueños les dicen que 'reemplacen toda la unidad' en cuanto el chiller deja de enfriar. Casi nunca es necesario. Bajo la madera y el acrílico, un chiller Penguin o Blue Cube es un compresor, un evaporador, un condensador, una válvula de expansión o tubo capilar, y una carga de R-134a o R-513A — un sistema que estoy legalmente certificado para abrir, recuperar y recargar bajo la Sección 608 de la EPA. Aquí los verdaderos asesinos son la incrustación de cal del agua dura que tapa el intercambiador de calor, la corrosión por aire salino en el condensador y las bombas de circulación recalentadas por los 90°F de un cuarto de garaje.",
      closer:
        "Si tu agua no enfría, mándame una foto de la placa de datos del chiller antes de gastar cinco cifras en un reemplazo. Nueve de cada diez veces es una reparación, no una pérdida total.",
    },
    diagnosisTitle: "Cómo diagnosticamos y reparamos chillers de baños de inmersión fría",
    diagnosisIntro:
      "Un baño de inmersión que no enfría es una llamada de refrigeración, no de plomería. Trabajamos el sistema sellado, el circuito de agua y los controles en ese orden — midiendo sobrecalentamiento y subenfriamiento, flujo de agua y señales de la placa antes de tocar cualquier pieza.",
    commonIssues: [
      "El agua no alcanza la temperatura programada",
      "El compresor del chiller funciona pero no enfría",
      "Hielo o escarcha en el evaporador o las líneas",
      "La bomba de circulación no funciona o tiene aire",
      "El GFCI o el breaker se dispara al arrancar",
      "Cal, agua turbia o falla del ozono/UV de sanitización",
      "Falla de la placa de control o del sensor de temperatura",
    ],
    failureModes: [
      {
        symptom: "El chiller funciona sin parar pero el agua nunca baja de ~60°F",
        cause:
          "Casi siempre es un problema del sistema sellado: una fuga lenta de refrigerante que bajó la carga, o un dispositivo de medición restringido (tubo capilar o válvula de expansión). En instalaciones costeras del sur de Florida también vemos condensadores tan cargados de sal y polvo que no pueden disipar el calor, así que el sistema funciona pero pierde capacidad.",
        fix:
          "Tomamos presiones de succión y descarga, calculamos sobrecalentamiento y subenfriamiento, y determinamos si es carga, restricción o flujo de aire. La detección de fugas, el vacío y la recarga con R-134a o R-513A son trabajo de la Sección 608 de la EPA — tenemos la certificación Universal y lo hacemos en sitio. Una limpieza del condensador a menudo restaura la capacidad completa por sí sola.",
      },
      {
        symptom: "El evaporador o las líneas de refrigerante se llenan de escarcha o hielo",
        cause:
          "Carga baja o flujo de agua débil a través del intercambiador hace que la temperatura del evaporador baje del punto de congelación, así que el circuito se congela y se ahoga. Una bomba de circulación defectuosa, un filtro tapado o un intercambiador incrustado de cal restringen el flujo y provocan la misma escarcha.",
        fix:
          "Descongelamos e inspeccionamos, luego perseguimos la causa raíz — restaurar el flujo de agua (bomba, filtro, descalcificar) o corregir una carga baja mediante recuperación y recarga adecuadas. Nunca 'rellenamos' un sistema sellado a ciegas; primero reparamos la fuga y luego pesamos la carga correcta.",
      },
      {
        symptom: "El compresor intenta arrancar, zumba y dispara el breaker o el GFCI",
        cause:
          "Un capacitor o relé de arranque defectuoso en el compresor, un devanado del compresor en corto o a tierra, o humedad y corrosión en la caja eléctrica del chiller — algo muy común en cuartos húmedos de garaje y patio en la costa de Florida.",
        fix:
          "Medimos los devanados, probamos el capacitor y el relé, y revisamos la resistencia de aislamiento a tierra. Los kits de capacitor y relé se cambian en la misma visita. Si el GFCI se dispara por humedad, secamos, sellamos y corregimos el circuito. Un compresor realmente aterrizado lo cotizamos honestamente contra el costo de un chiller nuevo.",
      },
      {
        symptom: "El flujo de agua es débil o la bomba de circulación no ceba",
        cause:
          "Aire atrapado tras un cambio de agua, un filtro o toma tapados, cal que traba el impulsor, o un motor de bomba que falló después de años funcionando caliente. Sin flujo, el chiller no puede transferir frío al agua por más bien que funcione el compresor.",
        fix:
          "Purgamos el aire, limpiamos y descalcificamos el circuito, y probamos el consumo de la bomba contra la especificación. Una bomba trabada o quemada se reemplaza — igualamos el caudal y la altura para que el chiller reciba el volumen de agua para el que fue diseñado.",
      },
      {
        symptom: "Agua turbia, biopelícula o el ozono/UV de sanitización no da abasto",
        cause:
          "El agua dura y mineralizada del sur de Florida incrusta cal en el intercambiador de placas y ensucia el filtro rápido, y un generador de ozono muerto o una lámpara UV vencida dejan que la biopelícula tome el control. La cal también actúa como aislante en el intercambiador, robando capacidad de enfriamiento en silencio.",
        fix:
          "Descalcificamos el intercambiador y el circuito, cambiamos el filtro y probamos o reemplazamos el módulo de ozono o la lámpara UV. Te dejamos en un intervalo de mantenimiento para agua dura para que la cal nunca vuelva a afianzarse — la misma disciplina que mantiene vivos los condensadores Sub-Zero de la costa.",
      },
      {
        symptom: "La pantalla muestra un código de falla o el sensor marca temperaturas erróneas",
        cause:
          "Un termistor o RTD que se desvía o falla le da a la placa una temperatura de agua falsa, así que cicla de forma corta, enfría de más o se niega a funcionar. Con menos frecuencia, la propia placa de control se ha corroído o perdió un relé en el ambiente húmedo del gabinete.",
        fix:
          "Verificamos el sensor contra un termómetro calibrado y lo cambiamos si está fuera de tolerancia — un arreglo rápido en la mayoría de los chillers. Las fallas de placa las diagnosticamos y luego conseguimos la placa específica de la marca; fijamos las expectativas de tiempo de entrega por adelantado en lugar de adivinar.",
      },
    ],
    faqs: [
      {
        question: "¿Vale la pena reparar el chiller o debería reemplazarlo?",
        answer:
          "En la gran mayoría de los casos, reparar. El chiller es un sistema de refrigeración sellado, y la mayoría de las fallas son un capacitor, una bomba, un sensor, una fuga o cal — todo reparable por una fracción del costo de reemplazo. Solo recomendamos reemplazar cuando un compresor está en corto interno o el gabinete está más allá de una reparación económica, y te mostramos los números antes de que decidas.",
      },
      {
        question: "¿Qué marcas de baños de inmersión fría y chillers reparan?",
        answer:
          "Plunge (The Cold Plunge), Renu Therapy, Blue Cube, Ice Barrel, Morozko Forge, Cold Stoic y Penguin Chillers, además de chillers de agua y de bomba de calor genéricos. Como la refrigeración de fondo es universal, podemos dar servicio a la mayoría de los chillers independientes incluso cuando la tina es un montaje a medida o casero.",
      },
      {
        question: "¿Cuánto cuesta una visita de reparación?",
        answer:
          "Nuestro diagnóstico es una visita técnica de $59 — y es gratis cuando apruebas la reparación, se cobra solo si la rechazas. Recibes un diagnóstico por escrito con piezas y mano de obra antes de empezar cualquier trabajo. Sin cargos de diagnóstico ocultos encima.",
      },
      {
        question: "¿Están certificados para trabajar el refrigerante / sistema sellado?",
        answer:
          "Sí. Tenemos la certificación EPA Sección 608 Universal, que cubre legalmente recuperar, evacuar y recargar el refrigerante de estos chillers (R-134a, R-513A y similares). El trabajo del sistema sellado es ilegal para personas sin certificación — lo hacemos correctamente, recuperamos el refrigerante de forma responsable y reparamos la fuga en lugar de solo rellenar.",
      },
      {
        question: "¿Cómo evito que mi baño de inmersión fría se dañe?",
        answer:
          "En el sur de Florida los dos enemigos son la cal del agua dura y la corrosión por aire salino. Mantén al día los cambios de filtro y el cuidado del agua, descalcifica el intercambiador del chiller en un intervalo regular, mantén el condensador limpio y libre de basura, y asegúrate de que el chiller tenga ventilación real si vive en un garaje caliente. Ofrecemos una visita de mantenimiento que se encarga de todo.",
      },
    ],
  },
};
