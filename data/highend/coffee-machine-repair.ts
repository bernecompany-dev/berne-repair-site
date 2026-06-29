import type { HighEndService } from "./types";

/**
 * High-end / luxury RESIDENTIAL specialty service: premium & built-in
 * coffee machines ONLY (Miele CVA, Gaggenau, Jura, La Marzocco, Wolf,
 * Thermador, Breville/Sage prosumer). NOT cheap drip makers. These are
 * $3k–$15k machines that are worth repairing — and South Florida hard
 * water is the #1 thing killing them.
 */
export const coffeeMachineRepair: HighEndService = {
  slug: "coffee-machine-repair",
  name: "Coffee Machine Repair",
  shortName: "Coffee Machine",
  seoNoun: "coffee machine",
  metaTitle: "Coffee Machine Repair — Built-In & Premium | Berne",
  metaDescription:
    "Built-in & premium coffee machine repair across South Florida — Miele CVA, Gaggenau, Jura, La Marzocco, Wolf, Thermador. Descaling, brew units, pumps. $59 service call.",
  cardDescription:
    "Built-in & prosumer espresso machine repair — Miele, Gaggenau, Jura, La Marzocco. Hard-water descaling specialists.",
  heroLede: "for built-in & premium machines.",
  longDescription:
    "We service the machines that cost as much as a small car — built-in plumbed Miele CVA and Gaggenau 200/400-series, Jura Giga and Z-line super-automatics, La Marzocco Linea Mini and GS3, Wolf and Thermador coffee systems, and prosumer Breville/Sage Dual Boiler and Oracle units. South Florida's hard water is the single biggest killer of these machines: scale chokes the boiler, seizes the brew unit, and clogs the 3-way solenoid valve. We descale, rebuild, reseal, and recalibrate on-site so a $5,000 machine keeps pulling shots instead of getting hauled to the landfill.",
  ownerNote: {
    opener: "A built-in coffee machine is the one appliance people assume is disposable. It isn't.",
    body:
      "I've watched homeowners write off a $7,000 Miele CVA over a 'descale' message that wouldn't clear, when the real fix was a $40 valve and an hour of descaling that the machine could no longer do on its own. Down here in Broward and Miami-Dade the water comes out of the tap hard — 200 to 350 ppm in most neighborhoods — and that calcium goes straight into the boiler and brew group of every espresso machine in the house. If you've never had a built-in or plumbed-in machine professionally descaled, scale is already building behind the panels. The good news: these machines are built to be rebuilt. Brew units come apart, seals are replaceable, boilers can be flushed, grinders are serviceable. That's exactly why they cost what they do, and exactly why a repair almost always beats a $4k–$15k replacement.",
    closer: "Bring me a scaled-up Gaggenau or a Jura that quit mid-shot and I'll tell you straight whether it's worth saving — it usually is.",
  },
  diagnosisTitle: "How we diagnose & fix premium coffee machines",
  diagnosisIntro:
    "Premium machines hide their faults behind generic messages — 'descale,' 'fill water,' 'error.' We pull the panels, pressure-test the pump, scope the brew unit and solenoid, and read the actual fault data instead of guessing. Here's what we see most on built-in and prosumer units in South Florida.",
  commonIssues: [
    "Scale buildup — descale cycle won't clear or machine runs slow",
    "Weak, thin, or under-pressure espresso (pump / 9-bar pressure loss)",
    "Brew unit jammed, grinding, or leaking from the group",
    "Water leaking under the cabinet (3-way solenoid valve, seals, lines)",
    "No water / no flow on a plumbed-in built-in machine",
    "Milk or steam system not frothing or steaming weakly",
    "Temperature wrong or 'heating' forever (boiler / thermoblock / NTC sensor)",
  ],
  failureModes: [
    {
      symptom: "\"Descale\" message keeps coming back, or the cycle aborts halfway",
      cause:
        "South Florida hard water has packed scale into the boiler and flow paths faster than the machine's automatic cycle can dissolve it. On Miele CVA and Jura super-automatics the flow meter can no longer read proper flow through the calcified lines, so the machine re-flags descale or quits the cycle. Years of using bottled-water descaler at the wrong concentration makes it worse.",
      fix:
        "We do a manual decalcification — circulate professional descaling solution through the boiler and brew circuit, then physically clear the flow meter and 3-way solenoid. On heavily scaled boilers we pull and flush the unit rather than trusting the onboard cycle. We finish by re-seating the brew unit and verifying flow. Most descaling calls finish on the first visit.",
    },
    {
      symptom: "Espresso pours thin, pale, and fast — no crema, no body",
      cause:
        "Lost brew pressure. The vibration pump (Jura, Breville/Sage, Nespresso Momento) or rotary pump (La Marzocco GS3, plumbed builds) is no longer holding ~9 bar — usually a worn pump, a scaled pressure path, or a leaking over-pressure/expansion valve bleeding pressure off. A clogged grinder dosing too coarse mimics the same cup.",
      fix:
        "We gauge actual brew pressure at the group, check pump output, and inspect the OPV/expansion valve. We replace the pump or rebuild the valve, descale the path, and recalibrate grind and dose. La Marzocco rotary pumps and Sage/Breville vibration pumps are standard parts we source quickly.",
    },
    {
      symptom: "Brew unit grinds, jams, or won't return to home position",
      cause:
        "On Jura, Miele, and other super-automatics the removable/internal brew unit has dried grease and hardened coffee oils binding the gears, or a cracked/worn brew-unit seal letting grounds pack into the mechanism. On built-in Gaggenau and Miele CVA the brew group seizes when descaling has been skipped and scale gets into the piston.",
      fix:
        "We pull and fully service the brew unit — deep-clean, replace the brew seals and O-rings, re-grease with food-safe lubricant, and reset the gear timing. If the brew unit is cracked or stripped we install an OEM assembly. This is the single most common rebuild on Jura Giga/Z-line and Miele machines.",
    },
    {
      symptom: "Water pooling under the cabinet around a built-in machine",
      cause:
        "The 3-way solenoid valve that dumps the puck's residual pressure has failed or its seals are scaled, OR a plumbed-in supply fitting, internal silicone line, or boiler gasket is weeping. On plumbed Miele CVA and Gaggenau builds a slow leak hides behind the cabinet and shows up as a warped floor before anyone notices.",
      fix:
        "We isolate the leak under pressure — solenoid, fittings, lines, or boiler gasket — replace the failed seal or valve, and re-test the plumbed supply connection. We re-route or re-clamp any line rubbing against a cabinet edge. Solenoid valves and line seals are on the truck for the common built-in brands.",
    },
    {
      symptom: "Machine says heating forever, or coffee comes out lukewarm / scalding",
      cause:
        "A failed NTC temperature sensor feeding the control board a bad reading, a thermoblock or boiler element that's scaled over (insulating calcium slows or blocks heat transfer), or a failed thermal element. Scale is again the root cause on most South Florida units — calcium on the element acts like a blanket.",
      fix:
        "We ohm-test the NTC sensor and the heating element, descale or replace the thermoblock/boiler as needed, and verify brew temperature at the group with a probe against the machine's spec. Sensors and elements are model-specific; we measure and order where they aren't stock.",
    },
    {
      symptom: "No milk froth / weak steam, or steam wand spits water",
      cause:
        "On automatic milk systems (Miele, Jura, Gaggenau) the milk pipework, frother venturi, or air-intake is clogged with dried milk and scale. On steam-wand machines (La Marzocco, Breville Dual Boiler/Oracle) a scaled steam boiler or a failed steam solenoid drops steam pressure, so the wand spits water instead of producing dry steam.",
      fix:
        "We strip and clean the milk circuit and venturi, clear the air intake, and descale the steam boiler. On wand machines we test the steam solenoid and boiler element and rebuild the steam valve seals. We finish by frothing a test pitcher to confirm dry, stable steam.",
    },
  ],
  faqs: [
    {
      question: "Do you repair built-in and plumbed-in coffee machines?",
      answer:
        "Yes — built-in plumbed machines are our specialty. We service Miele CVA, Gaggenau 200/400-series, Wolf E-series coffee systems, and Thermador built-ins, including the plumbed water supply, the 3-way solenoid, and the drainage. We come to the home, pull the unit or work it in the cabinet, and re-seal the plumbing connection when we're done.",
    },
    {
      question: "My machine keeps asking to descale and it won't stop. Can you fix that?",
      answer:
        "Almost always, yes. South Florida tap water runs hard, and once heavy scale builds up the machine's automatic descale cycle can't keep up — so the message returns or the cycle aborts. We do a professional manual decalcification of the boiler, brew circuit, flow meter, and solenoid, then verify flow. That's our single most common coffee-machine call.",
    },
    {
      question: "Is it really worth repairing instead of replacing?",
      answer:
        "For a premium machine, yes. A built-in Miele or Gaggenau runs $4,000–$15,000 to replace, a Jura Giga or La Marzocco several thousand. These machines are engineered to be rebuilt — brew units, seals, pumps, valves, and boilers are all serviceable parts. A typical repair is a small fraction of replacement cost and buys you many more years.",
    },
    {
      question: "Which coffee machine brands do you service?",
      answer:
        "Miele, Gaggenau, Jura, La Marzocco, Wolf, Thermador, Nespresso (Momento and built-in), and prosumer Breville/Sage Dual Boiler and Oracle. We focus on premium and built-in machines — we don't service basic drip coffee makers, because those aren't worth a service call.",
    },
    {
      question: "How much does a service call cost?",
      answer:
        "$59 for the diagnostic visit — and it's free when you approve the repair. You only pay the $59 if you decline the work. We give you a written quote with parts and labor up front, no surprise fees on top of the call. Phone (754) 345-4515.",
    },
  ],
  brands: [
    "Miele",
    "Gaggenau",
    "Jura",
    "La Marzocco",
    "Wolf",
    "Thermador",
    "Nespresso",
    "Breville / Sage",
  ],
  related: [
    {
      href: "/services/warming-drawer-repair",
      label: "Warming Drawer Repair",
      blurb:
        "The other built-in your morning depends on — element, thermostat, and control repair on Wolf, Miele, and Thermador warming drawers.",
    },
    {
      href: "/services/wine-cooler-repair",
      label: "Wine Cooler Repair",
      blurb:
        "Our existing kitchen-luxury service — compressor, thermostat, and seal repair on built-in Sub-Zero, Miele, and Thermador wine columns.",
    },
  ],
  article: {
    slug: "built-in-coffee-machine-descaling-miami",
    title: "Hard Water Is Killing Your Built-In Coffee Machine — A Miami Descaling Guide",
    description:
      "Why South Florida's hard water destroys premium built-in coffee machines, how scale hides behind the panels of a Miele CVA or Gaggenau, and what a real descaling and rebuild involves.",
    publishedAt: new Date("2026-06-26T13:00:00Z"),
    author: "Eugene Berne, Owner — Berne Appliance Repair",
    readingMinutes: 7,
    topic: "premium-service",
    body: `A homeowner in Pinecrest called us about her built-in Miele CVA. It had thrown a "descale" message, she ran the cycle twice with Miele tablets, and the message came right back — then the machine started pouring lukewarm, thin espresso and finally refused to brew at all. She assumed the machine was dead and had already priced a $9,000 replacement. We pulled the unit, did a manual decalcification of the boiler and brew circuit, freed a scaled-up 3-way solenoid, and replaced a single brew-unit seal. Total was a small fraction of a new machine. Three years later it's still running.

That call is the most common premium coffee-machine job we get in Miami-Dade and Broward, and the cause is almost always the same: hard water.

## Why South Florida water is so hard on these machines

Most of South Florida draws drinking water from the Biscayne Aquifer, which runs through limestone. That means our tap water is hard — frequently 200 to 350 ppm of dissolved calcium and magnesium, sometimes higher inland. Every time a coffee machine heats water, that calcium drops out of solution and plates onto the hottest surfaces first: the boiler walls, the heating element, the thermoblock, and the narrow flow paths the machine uses to push water at pressure.

A premium machine — a Miele CVA, a Gaggenau 200 or 400-series, a Jura Giga, a La Marzocco — runs more water through more precision passages than a drip maker ever will. So it scales faster, and scale does more damage. On a built-in or plumbed-in machine the problem is invisible: it's all happening behind the cabinet panels where you never see it.

## What scale actually breaks

Scale isn't just a film. As it accumulates it does four specific things, and they map directly to the symptoms owners describe:

- **Insulates the boiler element.** Calcium is a thermal blanket. The element works harder, the machine takes longer to heat, and brew temperature drifts — that's the "heating forever" or "lukewarm espresso" complaint.
- **Chokes the flow meter and solenoid.** Built-in machines use a flow meter to measure each shot and a 3-way solenoid valve to release puck pressure. Scale narrows those passages, the flow reading goes wrong, and the machine throws "descale" or aborts the cycle because it can no longer move water the way it expects.
- **Robs pump pressure.** Good espresso needs around 9 bar at the group. Scaled flow paths and a tired pump together drop that pressure, and you get pale, fast, crema-less shots.
- **Seizes the brew unit.** On super-automatics, scale plus hardened coffee oils binds the brew group so it grinds, jams, or won't return home.

By the time the automatic descale cycle can't clear the message, the scale is usually past what the onboard cycle was designed to handle. That's the point where it needs to come apart.

## Why the automatic descale cycle stops working

People assume that if they run the descale program, they're covered. The onboard cycle is a maintenance tool, not a rescue tool. It circulates a mild solution through the easy paths. Once scale has packed the boiler or partially blocked the solenoid and flow meter, the cycle can't push enough solution through to dissolve it — and on some machines it can't even complete, because it relies on the same flow meter that scale has compromised. At that stage the fix is a manual decalcification: we circulate a stronger professional solution through the boiler and brew circuit, and we physically clear the flow meter and the solenoid by hand.

## What a real diagnosis and repair looks like

When we open a scaled built-in machine, the visit runs about the same on a Miele, Gaggenau, or Jura. We pull the panels and inspect the brew unit, boiler, and plumbing. We gauge actual brew pressure at the group instead of trusting the cup. We ohm-test the NTC temperature sensor and the heating element. We clear the flow meter and the 3-way solenoid, and we manually descale the boiler and brew circuit. Then we strip and re-seal the brew unit — new brew seals and O-rings, food-safe re-greasing — and on plumbed machines we re-test the water supply connection for leaks before we close it up. We finish by pulling a real shot and checking temperature with a probe.

If you also have a built-in [warming drawer repair](/services/warming-drawer-repair) question or any other built-in acting up, we'll look at it on the same visit — most luxury kitchens have several of these appliances feeding off the same hard water and the same morning routine.

## How to slow it down

You can't change the aquifer, but you can buy your machine years. Use filtered or softened water in tank-fed machines, and on plumbed-in built-ins install an inline scale filter on the supply — it's the single best thing you can do for a Miele CVA or Gaggenau. Run the descale cycle on the schedule the machine asks for, not when it's convenient. And get a professional decalcification roughly once a year down here; that interval is far shorter than the manufacturer's literature, which is written for normal water, not Biscayne limestone.

## When to call us

If your built-in machine keeps asking to descale, pours thin and cool, leaks under the cabinet, or has simply quit, it's almost certainly worth saving — these machines are built to be rebuilt. We do [premium coffee machine repair](/services/coffee-machine-repair) on built-in and plumbed Miele, Gaggenau, Jura, La Marzocco, Wolf, Thermador, and prosumer Breville/Sage machines across South Florida.

The service call is $59 — and it's free when you approve the repair. You get a written quote with parts and labor up front, no surprise fees. Call (754) 345-4515 and most days we can have a tech at your door within a few hours.`,
  },
  es: {
    name: "Reparación de Cafeteras",
    shortName: "Cafetera",
    seoNoun: "cafetera",
    metaTitle: "Reparación de Cafeteras Empotradas y Premium",
    metaDescription:
      "Reparación de cafeteras empotradas y premium en el sur de Florida — Miele CVA, Gaggenau, Jura, La Marzocco, Wolf, Thermador. Descalcificación, grupos de café, bombas. Visita técnica de $59.",
    heroLede: "para cafeteras empotradas y premium.",
    longDescription:
      "Reparamos las máquinas que cuestan tanto como un auto pequeño — cafeteras empotradas y conectadas a la red de agua como las Miele CVA y Gaggenau serie 200/400, las superautomáticas Jura Giga y línea Z, La Marzocco Linea Mini y GS3, los sistemas de café Wolf y Thermador, y las máquinas de gama profesional Breville/Sage Dual Boiler y Oracle. El agua dura del sur de Florida es lo que más daña estas máquinas: la cal obstruye la caldera, traba el grupo de café y tapa la electroválvula de 3 vías. Descalcificamos, reconstruimos, resellamos y recalibramos en sitio para que una máquina de $5,000 siga preparando café en lugar de acabar en la basura.",
    ownerNote: {
      opener: "La cafetera empotrada es el único electrodoméstico que la gente da por desechable. No lo es.",
      body:
        "He visto a propietarios descartar una Miele CVA de $7,000 por un mensaje de 'descalcificar' que no se quitaba, cuando la verdadera solución era una válvula de $40 y una hora de descalcificación que la máquina ya no podía hacer sola. Aquí en Broward y Miami-Dade el agua sale dura del grifo — entre 200 y 350 ppm en la mayoría de los barrios — y ese calcio entra directo a la caldera y al grupo de café de toda máquina de espresso de la casa. Si nunca le ha hecho una descalcificación profesional a una máquina empotrada o conectada al agua, la cal ya se está acumulando detrás de los paneles. La buena noticia: estas máquinas están hechas para reconstruirse. Los grupos de café se desarman, los sellos se reemplazan, las calderas se limpian, los molinos se mantienen. Por eso cuestan lo que cuestan, y por eso reparar casi siempre conviene más que reemplazar por $4,000 a $15,000.",
      closer: "Tráigame una Gaggenau llena de cal o una Jura que se apagó a media taza y le diré con franqueza si vale la pena salvarla — casi siempre la vale.",
    },
    diagnosisTitle: "Cómo diagnosticamos y reparamos cafeteras premium",
    diagnosisIntro:
      "Las máquinas premium esconden sus fallas detrás de mensajes genéricos — 'descalcificar', 'llenar agua', 'error'. Nosotros quitamos los paneles, probamos la presión de la bomba, revisamos el grupo de café y la electroválvula, y leemos los datos reales de la falla en lugar de adivinar. Esto es lo que más vemos en máquinas empotradas y profesionales en el sur de Florida.",
    commonIssues: [
      "Acumulación de cal — el ciclo de descalcificación no se completa o la máquina va lenta",
      "Espresso débil, aguado o sin presión (pérdida de presión de la bomba / 9 bar)",
      "Grupo de café trabado, que rechina o gotea",
      "Fuga de agua debajo del mueble (electroválvula de 3 vías, sellos, mangueras)",
      "Sin agua / sin flujo en una máquina empotrada conectada a la red",
      "El sistema de leche o vapor no espuma o echa poco vapor",
      "Temperatura incorrecta o 'calentando' sin parar (caldera / thermoblock / sensor NTC)",
    ],
    failureModes: [
      {
        symptom: "El mensaje de \"descalcificar\" vuelve una y otra vez, o el ciclo se detiene a la mitad",
        cause:
          "El agua dura del sur de Florida ha llenado de cal la caldera y los conductos más rápido de lo que el ciclo automático puede disolver. En las superautomáticas Miele CVA y Jura el caudalímetro ya no mide bien el flujo por las líneas calcificadas, así que la máquina vuelve a pedir descalcificación o aborta el ciclo. Usar descalcificador en la concentración incorrecta lo empeora.",
        fix:
          "Hacemos una descalcificación manual — circulamos solución profesional por la caldera y el circuito de café, y luego limpiamos físicamente el caudalímetro y la electroválvula de 3 vías. En calderas muy incrustadas las desmontamos y enjuagamos en vez de confiar en el ciclo automático. Terminamos reasentando el grupo de café y verificando el flujo. La mayoría se resuelve en la primera visita.",
      },
      {
        symptom: "El espresso sale aguado, pálido y rápido — sin crema, sin cuerpo",
        cause:
          "Pérdida de presión de preparación. La bomba vibratoria (Jura, Breville/Sage, Nespresso Momento) o la bomba rotativa (La Marzocco GS3, equipos conectados a la red) ya no mantiene los ~9 bar — normalmente por una bomba gastada, un conducto con cal, o una válvula de sobrepresión/expansión que pierde presión. Un molino tapado que muele demasiado grueso produce la misma taza.",
        fix:
          "Medimos la presión real de preparación en el grupo, revisamos el rendimiento de la bomba e inspeccionamos la válvula de sobrepresión/expansión. Reemplazamos la bomba o reconstruimos la válvula, descalcificamos el conducto y recalibramos la molienda y la dosis. Conseguimos rápido las bombas rotativas La Marzocco y las vibratorias Sage/Breville.",
      },
      {
        symptom: "El grupo de café rechina, se traba o no regresa a su posición de inicio",
        cause:
          "En las superautomáticas Jura, Miele y otras, el grupo de café tiene grasa seca y aceites de café endurecidos que traban los engranajes, o un sello agrietado/gastado que deja entrar borra al mecanismo. En las empotradas Gaggenau y Miele CVA el grupo se traba cuando se ha omitido la descalcificación y la cal llega al pistón.",
        fix:
          "Desmontamos y damos servicio completo al grupo de café — limpieza profunda, reemplazo de sellos y juntas tóricas, re-engrasado con lubricante apto para alimentos, y reajuste del sincronismo de engranajes. Si el grupo está agrietado o gastado instalamos un conjunto original. Es la reconstrucción más común en Jura Giga/línea Z y Miele.",
      },
      {
        symptom: "Agua acumulándose debajo del mueble alrededor de una máquina empotrada",
        cause:
          "La electroválvula de 3 vías que libera la presión residual de la pastilla ha fallado o tiene los sellos con cal, O una conexión de agua, una manguera interna de silicona o la junta de la caldera está goteando. En las Miele CVA y Gaggenau conectadas a la red una fuga lenta se esconde detrás del mueble y aparece como un piso deformado antes de que alguien la note.",
        fix:
          "Aislamos la fuga con presión — electroválvula, conexiones, mangueras o junta de la caldera — reemplazamos el sello o la válvula que falló, y volvemos a probar la conexión de agua. Reubicamos o sujetamos cualquier manguera que roce contra el borde del mueble. Llevamos en la camioneta electroválvulas y sellos de las marcas empotradas comunes.",
      },
      {
        symptom: "La máquina calienta sin parar, o el café sale tibio / hirviendo",
        cause:
          "Un sensor de temperatura NTC averiado que le da una lectura falsa a la placa de control, un thermoblock o resistencia de la caldera cubiertos de cal (el calcio aísla y frena la transferencia de calor), o un elemento térmico dañado. Otra vez, la cal es la causa raíz en la mayoría de las máquinas del sur de Florida — el calcio sobre la resistencia actúa como una manta.",
        fix:
          "Medimos con óhmetro el sensor NTC y la resistencia, descalcificamos o reemplazamos el thermoblock/caldera según haga falta, y verificamos la temperatura de preparación en el grupo con una sonda contra la especificación de la máquina. Los sensores y resistencias son específicos del modelo; medimos y pedimos los que no llevamos en stock.",
      },
      {
        symptom: "Poca espuma de leche / vapor débil, o la lanza de vapor escupe agua",
        cause:
          "En los sistemas automáticos de leche (Miele, Jura, Gaggenau) los conductos de leche, el venturi del espumador o la toma de aire están tapados con leche seca y cal. En las máquinas con lanza de vapor (La Marzocco, Breville Dual Boiler/Oracle) una caldera de vapor con cal o una electroválvula de vapor averiada bajan la presión, así que la lanza escupe agua en lugar de dar vapor seco.",
        fix:
          "Desmontamos y limpiamos el circuito de leche y el venturi, despejamos la toma de aire y descalcificamos la caldera de vapor. En las máquinas con lanza probamos la electroválvula de vapor y la resistencia de la caldera y reconstruimos los sellos de la válvula de vapor. Terminamos espumando una jarra de prueba para confirmar vapor seco y estable.",
      },
    ],
    faqs: [
      {
        question: "¿Reparan cafeteras empotradas y conectadas a la red de agua?",
        answer:
          "Sí — las máquinas empotradas conectadas a la red son nuestra especialidad. Damos servicio a Miele CVA, Gaggenau serie 200/400, sistemas de café Wolf serie E y empotradas Thermador, incluyendo el suministro de agua, la electroválvula de 3 vías y el drenaje. Vamos a la casa, sacamos la unidad o la trabajamos en el mueble, y volvemos a sellar la conexión de agua al terminar.",
      },
      {
        question: "Mi máquina pide descalcificar todo el tiempo y no para. ¿Pueden arreglarlo?",
        answer:
          "Casi siempre, sí. El agua del grifo del sur de Florida es dura, y cuando se acumula mucha cal el ciclo automático de la máquina ya no da abasto — por eso el mensaje vuelve o el ciclo se aborta. Hacemos una descalcificación manual profesional de la caldera, el circuito de café, el caudalímetro y la electroválvula, y luego verificamos el flujo. Es nuestra llamada de cafeteras más común.",
      },
      {
        question: "¿De verdad vale la pena repararla en lugar de reemplazarla?",
        answer:
          "Para una máquina premium, sí. Una Miele o Gaggenau empotrada cuesta entre $4,000 y $15,000 reemplazarla, y una Jura Giga o La Marzocco varios miles. Estas máquinas están diseñadas para reconstruirse — grupos de café, sellos, bombas, válvulas y calderas son piezas reparables. Una reparación típica cuesta una fracción del reemplazo y le da muchos años más.",
      },
      {
        question: "¿Qué marcas de cafeteras reparan?",
        answer:
          "Miele, Gaggenau, Jura, La Marzocco, Wolf, Thermador, Nespresso (Momento y empotradas) y las profesionales Breville/Sage Dual Boiler y Oracle. Nos enfocamos en máquinas premium y empotradas — no reparamos cafeteras de goteo básicas, porque esas no justifican una visita técnica.",
      },
      {
        question: "¿Cuánto cuesta la visita técnica?",
        answer:
          "$59 por la visita de diagnóstico — y es gratis cuando aprueba la reparación. Solo paga los $59 si decide no hacer el trabajo. Le damos un presupuesto por escrito con piezas y mano de obra por adelantado, sin cargos sorpresa. Teléfono (754) 345-4515.",
      },
    ],
  },
};
