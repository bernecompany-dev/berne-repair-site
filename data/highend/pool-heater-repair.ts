import type { HighEndService } from "./types";

/**
 * High-end RESIDENTIAL pool & spa heater repair — gas and heat-pump.
 * Hand-authored, single indexable EN/ES page. No service×city combos.
 */
export const poolHeaterRepair: HighEndService = {
  slug: "pool-heater-repair",
  name: "Pool Heater Repair",
  shortName: "Pool Heater",
  seoNoun: "pool heater",
  metaTitle: "Pool Heater Repair Miami | Gas & Heat Pump | $59 Diagnostic",
  metaDescription:
    "Priority pool & spa heater repair across South Florida — gas and heat-pump. Pentair, Hayward, Raypak, Jandy, AquaCal. Salt-air corrosion specialists. $59 diagnostic, credited to repair. EPA-608 certified.",
  cardDescription:
    "Gas and heat-pump pool & spa heater repair for South Florida's luxury homes. $59 diagnostic, credited to repair.",
  heroLede: "for South Florida pools & spas.",
  longDescription:
    "When the spa won't fire or the heat pump runs all day without touching the water, we diagnose and fix it on the first visit whenever parts allow. We service both worlds — gas heaters (Pentair MasterTemp, Hayward Universal H-Series, Raypak Digital) for fast spa heat, and the heat pumps (Pentair UltraTemp, Hayward HeatPro, AquaCal, Gulfstream) that dominate South Florida pools. Cupronickel and titanium heat exchangers, ignition controls, pressure switches, defrost boards, and sealed-system work all under one truck.",
  ownerNote: {
    opener:
      "I'm Eugene Berne. Pool heaters are the appliance South Florida homeowners forget about until the first January cold snap — and then everyone calls at once.",
    body:
      "Here's what eleven years on Miami-Dade and Broward decks taught me: the salt air and pool chemistry that make this such a beautiful place to own a pool are also the two things quietly eating your heat exchanger. Gas heaters with bare-copper cores corrode from the inside when water chemistry drifts; heat pumps survive longer on titanium coils but lose their nerve when the fan motor or defrost sensor gives out. The difference between a $300 ignition-control fix and a $2,800 heat-exchanger replacement is almost always how early you call. I'd rather send a tech for a flame-sensor cleaning than condemn a corroded core six months later.",
    closer:
      "We charge a flat $59 to come diagnose it — and that's free if you approve the repair. No diagnostic fee stacked on top, no guessing.",
  },
  diagnosisTitle: "How we diagnose & fix pool heaters",
  diagnosisIntro:
    "Gas and heat-pump heaters fail in completely different ways, so we diagnose them differently. On gas units we trace the ignition sequence — gas valve, igniter, flame sensor, pressure switch, thermal regulator — and read the brand error code. On heat pumps we check refrigerant pressures, the titanium coil, the fan motor, and the defrost logic. Below are the calls we run most across South Florida.",
  commonIssues: [
    "Gas heater won't ignite or locks out on startup",
    "Heat pump runs but water never warms",
    "Error code on the display (Pentair E05/E06, Hayward LO/IF/HS, Raypak codes)",
    "Heat exchanger leaking or corroded (salt/chlorine damage)",
    "Pressure switch open — no flow / dirty filter fault",
    "Heat pump fan not turning or icing over in a cool snap",
    "Soot, rumbling, or short-cycling on a gas burner",
  ],
  failureModes: [
    {
      symptom: "Gas heater clicks, tries to light, then locks out",
      cause:
        "Ignition sequence is failing. Most often a dirty or cracked flame sensor that can't prove flame, a weak hot-surface igniter, or a gas valve that isn't opening. On Pentair MasterTemp this throws E05 (ignition lockout); on Hayward Universal H-Series it shows IF (ignition failure).",
      fix: "Pull and clean or replace the flame sensor, ohm-test the igniter (a good HSI reads ~40-75 ohms cold), and verify gas pressure at the valve. Igniters and flame sensors for MasterTemp, H-Series, and Raypak Digital stay on the truck — most ignition calls finish on the first visit.",
    },
    {
      symptom: "Heat pump is running all day but the water never warms up",
      cause:
        "On a heat pump that usually means a low or lost refrigerant charge from a pinhole leak, a failing reversing valve, or a fan that's barely moving air across the evaporator. A low charge starves the titanium coil and the unit just churns ambient air. This is the #1 South Florida heat-pump call.",
      fix: "We gauge the system, find the leak, and recover/recharge under EPA Section 608 (we hold Universal certification — sealed-system work is never a DIY or unlicensed job). If the coil is intact, a leak repair and recharge restores it; if the titanium coil is breached we quote the exchanger.",
    },
    {
      symptom: "Display shows a fault code and the heater won't run",
      cause:
        "Every brand speaks its own dialect. Pentair E05/E06 = ignition or stack/flame-rollout sensor; Hayward LO = low water temp safety, HS = high-limit, IF = ignition failure; Raypak codes flag pressure switch, ignition, or high-limit faults. The code points to the system, not always the part.",
      fix: "We carry brand code-reference cards and a manometer plus multimeter. We read the live code, confirm the failing sensor or switch with a meter, and replace it. Most code-driven calls close in 60-90 minutes; control-board swaps add 1-3 business days for the part.",
    },
    {
      symptom: "Green or white crust around the heater, or water pooling under it",
      cause:
        "Heat-exchanger corrosion. South Florida pool chemistry plus salt air is brutal on bare-copper and even cupronickel cores — low pH, high chlorine, or a salt chlorinator pushes the water acidic and the exchanger erodes from the inside. Gas units suffer worst; you'll see green copper salts and eventually a leak that drips onto the burner tray.",
      fix: "We confirm the leak isn't just a header O-ring or pressure-switch fitting first — those are cheap. If the exchanger itself is breached, we quote a cupronickel (gas) or titanium (heat-pump) replacement and walk you through whether repair or a new heater is the smarter spend on your unit.",
    },
    {
      symptom: "Gas heater starts then shuts off in seconds; reads a flow or pressure fault",
      cause:
        "The water-pressure switch isn't seeing enough flow, so the heater refuses to fire for safety. Cause is usually upstream: a dirty filter, closed valve, low pump speed (variable-speed pumps set too low for heat mode), or a clogged exchanger. Sometimes the pressure switch itself has corroded contacts.",
      fix: "We check flow first — backwash/clean the filter, confirm valve positions and pump speed. If flow is good and it still faults, we test and replace the pressure switch. Switches for Pentair, Hayward, and Raypak are stock items, so these calls usually finish same-visit.",
    },
    {
      symptom: "Heat-pump fan won't spin, or the coil ices up on a cool morning",
      cause:
        "A seized or burned-out fan motor stops airflow across the evaporator; with no air movement the titanium coil frosts in a cold snap and the unit either ices over or trips. On models like Hayward HeatPro and AquaCal a failed fan motor or a defrost sensor/board that won't run the defrost cycle is the usual culprit.",
      fix: "We replace the fan motor and capacitor and verify the defrost cycle actually engages. If the defrost sensor or control board isn't triggering, we test and order it direct. After repair we confirm the coil clears and the unit holds setpoint.",
    },
  ],
  faqs: [
    {
      question: "Should I get a gas heater or a heat pump for my South Florida pool?",
      answer:
        "Both have a place here. Heat pumps dominate residential pools in Miami-Dade and Broward because our warm air makes them cheap to run for steady all-season pool heating — but they heat slowly. Gas heaters (Pentair MasterTemp, Raypak Digital) heat fast, so they're ideal for spas and on-demand quick heat. Plenty of luxury homes run both: a heat pump for the pool, a gas heater for the spa. We service and repair either.",
    },
    {
      question: "Is my pool heater worth repairing or should I replace it?",
      answer:
        "It comes down to which part failed and how old the unit is. Ignition controls, flame sensors, pressure switches, fan motors, and gas valves are economical repairs — almost always worth it. A breached heat exchanger on a unit under about eight years old is usually still worth replacing the core; on an older corroded unit, a new heater often makes more sense. We give you the parts number, the labor breakdown, and an honest repair-vs-replace call — no upsell.",
    },
    {
      question: "Which pool heater brands do you service?",
      answer:
        "All the majors used in South Florida — Pentair (MasterTemp, UltraTemp, ETi), Hayward (Universal H-Series gas, HeatPro heat pump), Raypak (Digital, Avia), Jandy/Zodiac, AquaCal, and Gulfstream. We carry common ignition parts, sensors, and pressure switches for these on the truck.",
    },
    {
      question: "How much does a pool heater diagnostic cost?",
      answer:
        "A flat $59 diagnostic. That covers the tech coming out and fully diagnosing the heater — and it's credited to your repair if you approve it. No separate diagnostic fee, no surprise add-ons. You get a clear quote before any work starts.",
    },
    {
      question: "Why do pool heaters corrode so fast in coastal Florida?",
      answer:
        "Two reasons working together: salt air off the Atlantic and pool water chemistry. Salt aerosol attacks the cabinet and electronics, while unbalanced water — low pH, high chlorine, or a salt chlorinator running acidic — eats the heat exchanger from the inside. The fix is maintenance: keep pH at 7.4-7.6 and alkalinity in range, rinse the cabinet down seasonally if you're near the water, and have the heater serviced once a year. We can set you up on a maintenance check that catches corrosion before it becomes a $2,000+ exchanger.",
    },
  ],
  brands: [
    "Pentair",
    "Hayward",
    "Raypak",
    "Jandy",
    "Zodiac",
    "AquaCal",
    "Gulfstream",
    "Sta-Rite",
    "MasterTemp",
  ],
  related: [
    {
      href: "/services/cold-plunge-repair",
      label: "Cold Plunge & Ice Bath Repair",
      blurb:
        "Chiller not cooling or holding temp? We service residential cold plunges and ice baths across South Florida.",
    },
    {
      href: "/services/electric-sauna-repair",
      label: "Electric Sauna Repair",
      blurb:
        "Heater elements, controls, and sensors for home electric saunas — diagnosed and fixed on the first visit.",
    },
  ],
  article: {
    slug: "pool-heater-not-heating-south-florida",
    title: "Pool Heater Not Heating? A South Florida Owner's Field Guide",
    description:
      "Why gas and heat-pump pool heaters quit in South Florida — ignition lockouts, low refrigerant, pressure-switch faults, and salt-air corrosion — plus what an owner can check before calling.",
    publishedAt: new Date("2026-06-23T13:00:00Z"),
    author: "Eugene Berne, Owner — Berne Appliance Repair",
    readingMinutes: 8,
    topic: "premium-service",
    body: `A homeowner in Coral Gables called us the first cold morning of the year: 58 degrees outside, a pool party that afternoon, and a heat pump that had been running since dawn without moving the water past 71. By the time we arrived the cause was textbook for this market — a slow refrigerant leak at a vibration-fatigued fitting that had bled the charge over a season. We found it, repaired it, recharged under EPA 608, and the pool hit 84 by evening. That single call captures almost everything that goes wrong with pool heaters in South Florida.

Pool heaters are the one piece of equipment owners forget about until the temperature drops — and in Miami-Dade, Broward, and Palm Beach that means everyone discovers the problem on the same January morning. Here's how to tell what's actually wrong, and what you can safely check before you book a [pool heater repair](/services/pool-heater-repair).

## First, know which heater you have

South Florida pools fall into two camps, and they fail in completely different ways.

**Heat pumps** dominate residential pools here. Pentair UltraTemp, Hayward HeatPro, AquaCal, and Gulfstream units pull warmth out of our already-warm air, which makes them cheap to run all season — but they heat slowly and depend on a clean refrigerant circuit, a working fan, and a titanium coil.

**Gas heaters** — Pentair MasterTemp, Hayward Universal H-Series, Raypak Digital — heat fast, so they're the go-to for spas and quick on-demand heat. Many luxury homes run a heat pump on the pool and a gas heater on the spa. The two need different diagnostics, so the first question we ask is always: gas or heat pump?

## When a gas heater won't ignite

This is the most common gas call. You hear the heater click and try to light, then it locks out. On a Pentair MasterTemp that's usually an **E05 ignition lockout**; on a Hayward Universal H-Series it reads **IF** (ignition failure).

Nine times out of ten the part at fault is small: a flame sensor crusted over so it can't prove flame, a weak hot-surface igniter, or a gas valve that isn't opening. An owner can safely check two things first — confirm the gas supply valve is open and the propane tank (if you're on LP) isn't empty, and make sure the filter is clean so the pressure switch sees flow. Beyond that, ignition components carry line voltage and gas, so the diagnosis belongs to a tech. We clean or replace the flame sensor, ohm-test the igniter, and verify gas pressure — and we keep these parts on the truck, so most ignition calls finish on the first visit.

## When a heat pump runs but won't warm the water

If your heat pump runs for hours and the water barely moves, the most likely culprit is a **low refrigerant charge** from a small leak, a failing reversing valve, or a fan that's barely turning. A starved titanium coil just churns ambient air without transferring heat.

Here's the important part: refrigerant work is not a DIY or handyman job. Sealed-system repair on a heat pump requires EPA Section 608 certification — we hold Universal — and recovering, leak-checking, and recharging correctly is what makes the repair last instead of leaking out again in three months. If the titanium coil is still intact, a leak repair and recharge brings the unit right back. Only if the coil itself is breached do we talk about replacing the exchanger.

## The salt-air and chemistry problem

This is the South Florida tax on pool ownership. The same coastal air that makes Fisher Island and Boca beautiful is steadily corroding your heater, and pool chemistry finishes the job from the inside.

Gas heaters suffer worst. A bare-copper or cupronickel heat exchanger erodes fast when water chemistry drifts — low pH, high chlorine, or a salt chlorinator running acidic turns the water aggressive and eats the core. You'll see green copper salts crusting around the unit, then eventually a leak that drips onto the burner tray and causes rumbling or soot. Heat pumps last longer on titanium coils but still lose cabinets and electronics to salt aerosol.

The defense is boring but it works: keep pH at 7.4-7.6 and alkalinity in range, rinse the cabinet seasonally if you're near the water, and have the heater serviced once a year. The difference between a $300 pressure-switch repair and a $2,800 exchanger replacement is almost always how early someone catches the corrosion.

## What an owner can check before calling

- **Filter and flow.** A dirty filter or a variable-speed pump set too low for heat mode will trip the pressure switch and stop a gas heater cold. Clean the filter and confirm the pump is running at heat speed.
- **Valves.** Make sure the gas valve is open and the water diverter valves are set to send flow through the heater.
- **The error code.** Photograph it before you reset anything — Pentair E05/E06, Hayward LO/IF/HS, or a Raypak code tells us exactly where to start.
- **Don't open the cabinet.** Gas, line voltage, and sealed refrigerant are all behind that panel. The reading is worth more to us than a guess.

## When to call us

If you've checked flow, valves, and the filter and the heater still won't fire or won't warm the water, the next step is a diagnostic. We charge a flat **$59 diagnostic — credited to your repair when you approve it**, with no separate fee stacked on top. We service every major brand used in South Florida: Pentair, Hayward, Raypak, Jandy/Zodiac, AquaCal, and Gulfstream, gas and heat-pump alike.

If your luxury wellness setup runs deeper than the pool, we also handle the rest of it — see our [cold plunge and ice bath repair](/services/cold-plunge-repair) for chiller and temperature-control work.

Call Berne Appliance Repair at **(754) 345-4515**. Most days we can have a tech at your door within hours — and before your next cold snap, not after it.`,
  },
  es: {
    name: "Reparación de Calentadores de Piscina",
    shortName: "Calentador de Piscina",
    seoNoun: "calentador de piscina",
    metaTitle: "Reparación de Calentadores de Piscina | Gas y Bomba",
    metaDescription:
      "Reparación prioritaria de calentadores de piscina y spa en el sur de Florida — gas y bomba de calor. Pentair, Hayward, Raypak, AquaCal. Especialistas en corrosión por salitre. Diagnóstico de $59, abonado a la reparación. Certificación EPA-608.",
    heroLede: "para piscinas y spas del sur de Florida.",
    longDescription:
      "Cuando el spa no enciende o la bomba de calor funciona todo el día sin calentar el agua, diagnosticamos y reparamos en la primera visita siempre que las piezas lo permitan. Trabajamos los dos mundos — calentadores a gas (Pentair MasterTemp, Hayward Universal H-Series, Raypak Digital) para calor rápido de spa, y las bombas de calor (Pentair UltraTemp, Hayward HeatPro, AquaCal, Gulfstream) que dominan las piscinas del sur de Florida. Intercambiadores de calor de cuproníquel y titanio, controles de encendido, presostatos, placas de descongelación y trabajo de sistema sellado, todo en un mismo camión.",
    ownerNote: {
      opener:
        "Soy Eugene Berne. El calentador de piscina es el equipo que los dueños del sur de Florida olvidan hasta la primera ola de frío de enero — y entonces todos llaman a la vez.",
      body:
        "Esto es lo que me enseñaron once años en las terrazas de Miami-Dade y Broward: el salitre y la química de la piscina que hacen tan hermoso tener una piscina aquí son también las dos cosas que se comen el intercambiador de calor en silencio. Los calentadores a gas con núcleos de cobre se corroen por dentro cuando la química del agua se desbalancea; las bombas de calor duran más gracias a las serpentinas de titanio, pero fallan cuando se daña el motor del ventilador o el sensor de descongelación. La diferencia entre una reparación de $300 del control de encendido y un reemplazo de $2,800 del intercambiador casi siempre depende de qué tan temprano usted llame. Prefiero enviar un técnico a limpiar un sensor de llama que condenar un núcleo corroído seis meses después.",
      closer:
        "Cobramos $59 fijos por venir a diagnosticarlo — y es gratis si usted aprueba la reparación. Sin cargo de diagnóstico aparte, sin adivinanzas.",
    },
    diagnosisTitle: "Cómo diagnosticamos y reparamos calentadores de piscina",
    diagnosisIntro:
      "Los calentadores a gas y de bomba de calor fallan de maneras completamente distintas, así que los diagnosticamos distinto. En las unidades de gas seguimos la secuencia de encendido — válvula de gas, encendedor, sensor de llama, presostato, regulador térmico — y leemos el código de error de la marca. En las bombas de calor revisamos las presiones del refrigerante, la serpentina de titanio, el motor del ventilador y la lógica de descongelación. Abajo están las llamadas más frecuentes en el sur de Florida.",
    commonIssues: [
      "El calentador a gas no enciende o se bloquea al arrancar",
      "La bomba de calor funciona pero el agua no calienta",
      "Código de error en la pantalla (Pentair E05/E06, Hayward LO/IF/HS, códigos Raypak)",
      "Intercambiador de calor con fuga o corroído (daño por sal/cloro)",
      "Presostato abierto — sin flujo / filtro sucio",
      "El ventilador de la bomba de calor no gira o se congela en frentes fríos",
      "Hollín, vibración o ciclos cortos en el quemador a gas",
    ],
    failureModes: [
      {
        symptom: "El calentador a gas chasquea, intenta encender y se bloquea",
        cause:
          "La secuencia de encendido está fallando. Casi siempre es un sensor de llama sucio o agrietado que no puede comprobar la llama, un encendedor de superficie caliente débil, o una válvula de gas que no abre. En el Pentair MasterTemp esto da E05 (bloqueo de encendido); en el Hayward Universal H-Series muestra IF (fallo de encendido).",
        fix: "Limpiamos o reemplazamos el sensor de llama, medimos la resistencia del encendedor (uno bueno lee ~40-75 ohmios en frío) y verificamos la presión de gas en la válvula. Llevamos encendedores y sensores de llama para MasterTemp, H-Series y Raypak Digital en el camión — la mayoría de estas llamadas se resuelven en la primera visita.",
      },
      {
        symptom: "La bomba de calor funciona todo el día pero el agua nunca calienta",
        cause:
          "En una bomba de calor eso casi siempre significa una carga de refrigerante baja o perdida por una microfuga, una válvula reversible que falla, o un ventilador que apenas mueve aire por el evaporador. Una carga baja deja sin trabajo a la serpentina de titanio y la unidad solo remueve aire ambiente. Es la llamada de bomba de calor número uno en el sur de Florida.",
        fix: "Medimos el sistema con manómetros, ubicamos la fuga y recuperamos/recargamos bajo la Sección 608 de la EPA (tenemos certificación Universal — el trabajo de sistema sellado nunca es para aficionados ni personal sin licencia). Si la serpentina está intacta, una reparación de fuga y recarga la deja como nueva; si la serpentina de titanio está perforada, cotizamos el intercambiador.",
      },
      {
        symptom: "La pantalla muestra un código de falla y el calentador no funciona",
        cause:
          "Cada marca habla su propio dialecto. Pentair E05/E06 = encendido o sensor de llama/gases; Hayward LO = seguridad por agua fría, HS = límite alto, IF = fallo de encendido; los códigos Raypak señalan presostato, encendido o límite alto. El código apunta al sistema, no siempre a la pieza exacta.",
        fix: "Llevamos tarjetas de referencia de códigos por marca, un manómetro y un multímetro. Leemos el código en vivo, confirmamos el sensor o interruptor defectuoso con el medidor y lo reemplazamos. La mayoría de estas llamadas se cierran en 60-90 minutos; el cambio de placa de control suma de 1 a 3 días hábiles por la pieza.",
      },
      {
        symptom: "Costra verde o blanca alrededor del calentador, o agua acumulada debajo",
        cause:
          "Corrosión del intercambiador de calor. La química de las piscinas del sur de Florida más el salitre son brutales con los núcleos de cobre y hasta de cuproníquel — un pH bajo, cloro alto o un clorador salino vuelven el agua ácida y el intercambiador se erosiona por dentro. Los calentadores a gas sufren más; verá sales verdes de cobre y con el tiempo una fuga que gotea sobre la bandeja del quemador.",
        fix: "Primero confirmamos que la fuga no sea solo un O-ring del cabezal o una conexión del presostato — eso es barato. Si el intercambiador mismo está perforado, cotizamos un reemplazo de cuproníquel (gas) o titanio (bomba de calor) y le explicamos si reparar o cambiar el calentador es el gasto más inteligente para su unidad.",
      },
      {
        symptom: "El calentador a gas enciende y se apaga en segundos; marca falla de flujo o presión",
        cause:
          "El presostato de agua no detecta suficiente flujo, así que el calentador se niega a encender por seguridad. La causa suele estar antes: filtro sucio, una válvula cerrada, una bomba de velocidad variable ajustada muy baja para el modo calor, o un intercambiador obstruido. A veces el propio presostato tiene los contactos corroídos.",
        fix: "Revisamos el flujo primero — lavamos/limpiamos el filtro, confirmamos las posiciones de las válvulas y la velocidad de la bomba. Si el flujo es bueno y aun así falla, probamos y reemplazamos el presostato. Los presostatos para Pentair, Hayward y Raypak los tenemos en stock, así que estas llamadas suelen cerrarse en la misma visita.",
      },
      {
        symptom: "El ventilador de la bomba de calor no gira, o la serpentina se congela en una mañana fría",
        cause:
          "Un motor de ventilador agarrotado o quemado detiene el flujo de aire por el evaporador; sin movimiento de aire, la serpentina de titanio se escarcha en un frente frío y la unidad se congela o se dispara. En modelos como Hayward HeatPro y AquaCal el culpable habitual es un motor de ventilador dañado o un sensor/placa de descongelación que no ejecuta el ciclo.",
        fix: "Reemplazamos el motor del ventilador y el capacitor y verificamos que el ciclo de descongelación realmente se active. Si el sensor o la placa de descongelación no disparan, los probamos y los pedimos directo. Tras la reparación confirmamos que la serpentina se descongela y la unidad mantiene la temperatura programada.",
      },
    ],
    faqs: [
      {
        question: "¿Conviene un calentador a gas o una bomba de calor para mi piscina en el sur de Florida?",
        answer:
          "Los dos tienen su lugar aquí. Las bombas de calor dominan las piscinas residenciales en Miami-Dade y Broward porque nuestro aire cálido las hace baratas de operar todo el año para calentar la piscina de forma constante — pero calientan despacio. Los calentadores a gas (Pentair MasterTemp, Raypak Digital) calientan rápido, así que son ideales para spas y calor inmediato. Muchas casas de lujo usan ambos: bomba de calor para la piscina y calentador a gas para el spa. Reparamos cualquiera de los dos.",
      },
      {
        question: "¿Vale la pena reparar mi calentador de piscina o debo reemplazarlo?",
        answer:
          "Depende de qué pieza falló y de la antigüedad de la unidad. Los controles de encendido, sensores de llama, presostatos, motores de ventilador y válvulas de gas son reparaciones económicas — casi siempre vale la pena. Un intercambiador perforado en una unidad de menos de unos ocho años normalmente todavía justifica reemplazar el núcleo; en una unidad vieja y corroída, un calentador nuevo suele tener más sentido. Le damos el número de pieza, el desglose de mano de obra y una recomendación honesta de reparar o reemplazar — sin presión de venta.",
      },
      {
        question: "¿Qué marcas de calentadores de piscina reparan?",
        answer:
          "Todas las principales que se usan en el sur de Florida — Pentair (MasterTemp, UltraTemp, ETi), Hayward (Universal H-Series a gas, HeatPro de bomba de calor), Raypak (Digital, Avia), Jandy/Zodiac, AquaCal y Gulfstream. Llevamos piezas comunes de encendido, sensores y presostatos para estas marcas en el camión.",
      },
      {
        question: "¿Cuánto cuesta el diagnóstico de un calentador de piscina?",
        answer:
          "Un diagnóstico de $59 fijos. Eso cubre que el técnico vaya y diagnostique el calentador por completo — y se abona a su reparación si usted la aprueba. Sin cargo de diagnóstico aparte, sin sorpresas. Recibe una cotización clara antes de empezar cualquier trabajo.",
      },
      {
        question: "¿Por qué se corroen tan rápido los calentadores de piscina en la Florida costera?",
        answer:
          "Por dos razones que actúan juntas: el salitre del Atlántico y la química de la piscina. El aerosol salino ataca el gabinete y la electrónica, mientras que un agua desbalanceada — pH bajo, cloro alto, o un clorador salino corriendo ácido — se come el intercambiador por dentro. La solución es el mantenimiento: mantenga el pH entre 7.4 y 7.6 y la alcalinidad en rango, enjuague el gabinete por temporada si vive cerca del agua, y dé servicio al calentador una vez al año. Podemos ponerlo en una revisión de mantenimiento que detecta la corrosión antes de que se convierta en un intercambiador de $2,000 o más.",
      },
    ],
  },
};
