import type { HighEndService } from "./types";

export const reclinerRepair: HighEndService = {
  slug: "recliner-repair",
  name: "Power Recliner Repair",
  shortName: "Recliner",
  seoNoun: "power recliner",
  metaTitle: "Power & Leather Recliner Repair | South Florida",
  metaDescription:
    "We repair power recliners and premium leather motion furniture across South Florida — dead motors, failed transformers, hand controls, USB ports, and stuck mechanisms. $59 diagnostic, credited to repair. (754) 345-4515.",
  cardDescription:
    "Motor, transformer, and mechanism repair for power recliners, home-theater seating, and premium leather motion furniture.",
  heroLede: "for power & premium leather motion furniture.",
  longDescription:
    "When a power recliner stops moving, the problem is almost never the leather — it's a motor, a transformer, a hand control, or a wiring connection that has quietly failed. We diagnose and fix the electrical and mechanical side of premium motion furniture in your home: Ekornes Stressless, Natuzzi, American Leather, Roche Bobois, Fjords, theater seating, and sectionals where one seat has gone dead. We carry actuators, transformers, and hand controls for the common brands and isolate the fault on the first visit whenever a part is on the truck.",
  ownerNote: {
    opener: "I'm Eugene Berne, and I'll be straight with you about recliners.",
    body:
      "A $6,000 leather motion sectional that won't recline gets quoted as a full replacement by most furniture stores — when nine times out of ten it's a $90 transformer or a pinched ribbon cable behind one seat. My techs treat these like the precision pieces they are: drop cloths down, shoes off if you ask, no dragging frames across hardwood. We work the motors, actuators, transformers, hand controls, and wiring. We're not an upholstery shop, so if the failure is torn leather or a broken wood frame, I'll tell you honestly and point you to the right craftsman rather than charge you for work we don't do.",
    closer: "You get a real diagnosis and a fair number — not a sales pitch to throw out good furniture.",
  },
  diagnosisTitle: "How we diagnose & fix power recliners",
  diagnosisIntro:
    "A power recliner is a simple electrical chain: wall power → transformer (power supply) → hand control → motor/actuator → mechanism. We test that chain in order until we find the break. Most no-movement calls come down to the transformer, the hand control, or a disconnected harness — all fast fixes once the bad link is found.",
  commonIssues: [
    "Recliner completely dead — won't move in either direction",
    "Works one direction but won't return (stuck open or stuck closed)",
    "One seat of a sectional or theater row is dead, the rest work",
    "Clicking or buzzing from the base but no motion",
    "Grinding, clunking, or wobble from the mechanism",
    "USB / charging port or cup-holder light not working",
    "Hand control unresponsive or only works when wiggled",
  ],
  failureModes: [
    {
      symptom: "Recliner is completely dead — no hum, no movement, nothing",
      cause:
        "Start at the wall. The #1 cause is a failed transformer / power supply (the black brick that converts 110V to the 29V or 24V DC the motor needs) — they fail far more often than motors. Second most common is a power cord knocked out of the transformer or the under-seat junction by a vacuum or a robot mop.",
      fix:
        "Meter the transformer output: no DC voltage means the brick is dead — we swap it on the spot (we stock 29V and 24V supplies for the common brands). If the transformer is good, we trace the cord and connectors back to the motor. Stuck-power calls finish same-visit unless the part is a proprietary unit we have to order.",
    },
    {
      symptom: "Motor buzzes or clicks but the seat won't move",
      cause:
        "The linear actuator (the motor that drives the recline mechanism) has burned out or seized — the gear train strips or the internal limit switch fails, so it draws power but produces no travel. On heavily used theater seating and lift chairs this is the typical end-of-life failure.",
      fix:
        "We confirm voltage is reaching the actuator, then bench-test it off the frame. A bad actuator gets replaced — most are 2-bolt, plug-in units. We carry universal-fit actuators for many frames and order brand-specific units (American Leather, Palliser, theater seating) when the mount is proprietary.",
    },
    {
      symptom: "Hand control / button does nothing, or only works when wiggled",
      cause:
        "The handset switch or its cable has failed — broken solder joint, cracked rocker switch, or a pinched/frayed control cable where it crosses the mechanism. On two-motor seats (independent headrest + footrest) one half of the control often dies while the other still works.",
      fix:
        "We isolate the control by jumpering the motor directly — if the seat moves, the handset is the culprit and we replace it. Hand controls for Stressless, Natuzzi, American Leather, and the common theater brands are quick swaps; we keep universal controls on the truck.",
    },
    {
      symptom: "One seat in a sectional or theater row is dead, the others work fine",
      cause:
        "Almost always a wiring/harness problem at that seat, not a motor — the daisy-chain power connector between modules has popped apart, or the ribbon/wiring harness got crushed when the sections were pushed together against a wall.",
      fix:
        "We pull that module out, find the disconnected or damaged connector, and reseat or splice the harness. If a transformer feeds that seat individually (common on power sectionals), we test it too. This is one of the most satisfying same-visit fixes we do.",
    },
    {
      symptom: "Grinding, clunking, popping, or side-to-side wobble during recline",
      cause:
        "The recline mechanism itself — the scissor linkage and pivot points — has worn, lost a fastener, or run dry. On Ekornes Stressless the issue is usually the glide/Plus system tension wheels or the sliding rails needing service rather than a motor; on standard frames it's a loose mounting bolt or a worn pivot bushing.",
      fix:
        "We disassemble enough to inspect the linkage, retorque hardware, replace worn bushings or pivot pins, and lubricate the rails. For Stressless we adjust the glide wheels and Plus-system tension to spec. Noise that's actually a cracked weld or broken wood frame we flag as a frame/upholstery referral.",
    },
    {
      symptom: "USB / charging port, cup-holder light, or panel accessory is dead",
      cause:
        "These run off a separate low-voltage tap or their own small transformer, independent of the recline motor. The most common failure is a blown accessory transformer or a disconnected accessory harness; sometimes the USB module itself has shorted from a spilled drink.",
      fix:
        "We test the accessory circuit separately from the motor circuit, replace the accessory transformer or USB module, and reseat the harness. Quick, low-cost fix — and we'll check that a spill hasn't reached the motor wiring while we're in there.",
    },
  ],
  faqs: [
    {
      question: "Do you actually repair the power recliner motors and electronics?",
      answer:
        "Yes — that's our core work on motion furniture. We test and replace linear actuators (motors), transformers/power supplies (29V and 24V), hand controls, wiring harnesses, and accessory circuits like USB ports. We come to your home, diagnose the full electrical chain, and fix it on the spot whenever the part is on the truck.",
    },
    {
      question: "Which brands of recliners and motion furniture do you service?",
      answer:
        "Ekornes Stressless, Natuzzi (Editions and Italia), American Leather, Roche Bobois, Fjords, Palliser, Ethan Allen, Hancock & Moore, Berkline, and home-theater seating brands like Fortress and Octane. We carry universal-fit actuators, transformers, and hand controls that cover many other frames as well.",
    },
    {
      question: "Can you fix torn leather or a broken frame?",
      answer:
        "We're honest about our lane: we specialize in the mechanical and electrical side — motors, mechanisms, transformers, and controls. We do not do leather re-hiding or wood-frame rebuilding. If your problem is torn upholstery or a cracked frame, we'll tell you plainly and refer you to a trusted furniture craftsman rather than charge for work outside our specialty.",
    },
    {
      question: "Is it worth repairing a power recliner instead of replacing it?",
      answer:
        "Usually, yes. On premium motion furniture the most common failures — a transformer, a hand control, a disconnected harness — are inexpensive parts and a short visit, while replacing a quality leather recliner or sectional runs into the thousands. We give you a straight diagnosis and a written quote so you can decide with real numbers, not a store's pressure to buy new.",
    },
    {
      question: "How does the $59 diagnostic work?",
      answer:
        "The $59 diagnostic covers a full in-home diagnosis. If you approve the repair, the $59 is credited to your repair and you only pay for the repair itself; if you decide not to proceed, you pay just the $59. No hidden diagnostic fee on top, and no charge to quote a part we have to order. Call (754) 345-4515 to schedule.",
    },
  ],
  brands: [
    "Ekornes Stressless",
    "Natuzzi",
    "American Leather",
    "Roche Bobois",
    "Fjords",
    "Palliser",
    "Ethan Allen",
    "Hancock & Moore",
    "Berkline",
    "Fortress / Octane (theater seating)",
  ],
  related: [
    {
      href: "/services/electric-sauna-repair",
      label: "Electric Sauna Repair",
      blurb:
        "Heater elements, control boards, and sensors for in-home electric saunas — the same precise electrical diagnosis we bring to power recliners.",
    },
    {
      href: "/services/cold-plunge-repair",
      label: "Cold Plunge & Ice Bath Repair",
      blurb:
        "Chillers, pumps, and controls for home cold plunges and ice baths — another luxury home-comfort system we keep running.",
    },
  ],
  article: {
    slug: "power-recliner-wont-move-repair-south-florida",
    title: "Power Recliner Won't Move? How We Diagnose It Before You Replace It",
    description:
      "A senior tech's field guide to a dead power recliner: test the transformer, swap the actuator, isolate the hand control, and trace a dead seat on a sectional — before anyone tells you to buy new.",
    publishedAt: new Date("2026-06-22T13:00:00Z"),
    author: "Eugene Berne, Owner — Berne Appliance Repair",
    readingMinutes: 7,
    topic: "premium-service",
    body: `A homeowner in Fort Lauderdale called us about a four-seat leather home-theater row. The two end recliners worked perfectly; the third seat was stone dead. The furniture store that sold it — for just under nine thousand dollars — had already quoted her a full replacement of the module, parts and labor, because "the motor's gone." When we pulled that seat out from the wall, the actual problem took ninety seconds to find: the daisy-chain power connector between modules had popped apart when the sectional was pushed tight against the baseboard. We snapped it back together, dressed the cable so it wouldn't pinch again, and the seat reclined like new. Total parts cost: zero.

That call is the rule, not the exception. Power motion furniture looks complicated, but electrically it's a simple chain, and most failures are at the cheap end of it. Here's how we walk that chain — and what you can safely check before you call anyone.

## A power recliner is just five links

Every power recliner, lift chair, and theater seat is the same circuit: wall outlet → transformer (the power-supply brick) → hand control → motor/actuator → recline mechanism. Find the broken link and you've found the repair. The mistake furniture salespeople make is jumping straight to "the motor" — the single most expensive part — when the failure is almost always upstream of it.

## Start at the transformer, not the motor

The black brick that plugs into the wall converts 110V house power down to the low DC voltage the motor needs — usually 29V or 24V. Transformers fail far more often than motors do. Heat, a power surge, or simple age kills them, and when one dies the recliner goes completely dead: no hum, no click, nothing.

This is the first thing we meter. We read the transformer's output with a multimeter; if there's no DC voltage coming out, the brick is the culprit and we replace it on the spot. We stock 29V and 24V supplies for the common brands. Before that, the genuinely free check any owner can do: confirm the power cord is fully seated at the wall *and* at the connector under the seat. Vacuums and robot mops unplug more recliners than any electrical fault.

## If power's good, isolate the hand control

If the transformer is feeding voltage but pressing the button does nothing — or the seat only moves when you wiggle the handset — the control is suspect. The rocker switches crack, solder joints break, and the thin control cable frays where it crosses the moving mechanism.

We isolate it by jumpering the motor directly, bypassing the handset. If the seat then moves, the control is bad and we swap it — hand controls for Stressless, Natuzzi, American Leather, and the theater brands are fast replacements, and we carry universal controls. This step matters because a $70 handset is constantly misdiagnosed as a dead motor.

## Now test the actuator

Only after power and control check out do we look at the linear actuator — the motor that drives the recline. A failed actuator typically buzzes or clicks but produces no travel: the gear train has stripped or the internal limit switch has failed. We confirm voltage is arriving at the actuator, then bench-test it off the frame to be certain before condemning it. Most are two-bolt, plug-in units; we fit universal actuators on many frames and order proprietary mounts (American Leather, Palliser, theater seating) when needed.

## The dead-seat-on-a-sectional special

When one seat of a sectional or one chair in a theater row is dead and the others work, do not let anyone sell you a motor. The working seats prove the transformer and controls for the row are fine — the fault is local to that seat, and it's almost always wiring: a popped module-to-module connector or a harness crushed against the wall. This is a reseat-or-splice fix, usually same-visit, usually no parts.

## A word on the leather itself

We fix the motors, transformers, controls, mechanisms, and wiring — the things that make the chair *move*. We're not an upholstery shop. If your real problem is torn leather, worn cushioning, or a cracked wood frame, we'll say so honestly and point you to a furniture craftsman instead of charging you for work outside our lane. On Ekornes Stressless, by the way, a lot of "noise" complaints aren't motors at all — they're the glide/Plus-system tension wheels needing adjustment, which we handle.

## When to call us

If you've confirmed the cord is seated at both ends and the seat is still dead — or it's grinding, stuck open, or one section of a set won't move — that's a diagnostic call. We come to your South Florida home, walk the whole chain, and fix it on the first visit whenever the part is on the truck. You can read more about our full [recliner repair](/services/recliner-repair) service, and if you're outfitting a luxury home we also handle [cold plunge and ice bath repair](/services/cold-plunge-repair).

The visit is a flat **$59 diagnostic** — credited to your repair when you approve it, with no separate fee piled on top. Call **(754) 345-4515** and most days we'll have a technician at your door within hours. Don't let a furniture store talk you into replacing thousands of dollars of good leather over a ninety-dollar transformer.`,
  },
  es: {
    name: "Reparación de Sillones Reclinables Eléctricos",
    shortName: "Sillón Reclinable",
    seoNoun: "sillón reclinable eléctrico",
    metaTitle: "Reparación de Sillones Reclinables Eléctricos FL",
    metaDescription:
      "Reparamos sillones reclinables eléctricos y muebles de movimiento en cuero premium en el sur de Florida — motores muertos, transformadores, controles y mecanismos atascados. Diagnóstico de $59, abonado a la reparación. (754) 345-4515.",
    heroLede: "para muebles reclinables eléctricos y de cuero premium.",
    longDescription:
      "Cuando un sillón reclinable eléctrico deja de moverse, casi nunca es el cuero — es un motor, un transformador, un control de mano o una conexión de cableado que falló en silencio. Diagnosticamos y reparamos la parte eléctrica y mecánica de los muebles de movimiento premium en su hogar: Ekornes Stressless, Natuzzi, American Leather, Roche Bobois, Fjords, asientos de cine en casa y seccionales donde un solo asiento quedó muerto. Llevamos actuadores, transformadores y controles de las marcas comunes y aislamos la falla en la primera visita siempre que la pieza esté en el camión.",
    ownerNote: {
      opener: "Soy Eugene Berne, y le hablaré con franqueza sobre los sillones reclinables.",
      body:
        "Un seccional de cuero con movimiento de $6,000 que no reclina recibe, de la mayoría de las tiendas de muebles, un presupuesto de reemplazo completo — cuando nueve de cada diez veces es un transformador de $90 o un cable plano pellizcado detrás de un asiento. Mis técnicos los tratan como las piezas de precisión que son: cubiertas en el piso, sin arrastrar marcos sobre el suelo de madera. Trabajamos los motores, actuadores, transformadores, controles de mano y el cableado. No somos un taller de tapicería, así que si la falla es cuero rasgado o un marco de madera roto, se lo diré con honestidad y lo referiré al artesano correcto en lugar de cobrarle por un trabajo que no hacemos.",
      closer: "Usted recibe un diagnóstico real y un precio justo — no un argumento de venta para tirar muebles que están bien.",
    },
    diagnosisTitle: "Cómo diagnosticamos y reparamos sillones reclinables eléctricos",
    diagnosisIntro:
      "Un sillón reclinable eléctrico es una cadena eléctrica simple: corriente de la pared → transformador (fuente de poder) → control de mano → motor/actuador → mecanismo. Probamos esa cadena en orden hasta encontrar el corte. La mayoría de las llamadas por falta de movimiento se reducen al transformador, al control de mano o a un arnés desconectado — todas reparaciones rápidas una vez que se encuentra el eslabón malo.",
    commonIssues: [
      "Sillón completamente muerto — no se mueve en ninguna dirección",
      "Funciona en un sentido pero no regresa (atascado abierto o cerrado)",
      "Un asiento de un seccional o fila de cine está muerto, el resto funciona",
      "Zumbido o clic en la base pero sin movimiento",
      "Rechinido, golpeteo o bamboleo del mecanismo",
      "Puerto USB / de carga o luz del portavasos no funciona",
      "Control de mano no responde o solo funciona si se mueve el cable",
    ],
    failureModes: [
      {
        symptom: "El sillón está completamente muerto — sin zumbido, sin movimiento, nada",
        cause:
          "Empiece en la pared. La causa #1 es un transformador / fuente de poder dañado (el bloque negro que convierte 110V a los 29V o 24V CC que necesita el motor) — fallan mucho más a menudo que los motores. La segunda más común es un cable de corriente desconectado del transformador o de la unión bajo el asiento por una aspiradora o un robot trapeador.",
        fix:
          "Medimos la salida del transformador: sin voltaje CC el bloque está muerto y lo cambiamos en el momento (tenemos fuentes de 29V y 24V para las marcas comunes). Si el transformador está bien, rastreamos el cable y los conectores hasta el motor. Las llamadas por falta de corriente se resuelven en la misma visita salvo que sea una pieza propietaria que haya que pedir.",
      },
      {
        symptom: "El motor zumba o hace clic pero el asiento no se mueve",
        cause:
          "El actuador lineal (el motor que mueve el mecanismo) se quemó o se trabó — el tren de engranajes se desgasta o falla el interruptor de límite interno, así que consume corriente pero no produce recorrido. En asientos de cine y sillones de elevación muy usados, esta es la falla típica de fin de vida.",
        fix:
          "Confirmamos que llega voltaje al actuador y luego lo probamos fuera del marco. Un actuador malo se reemplaza — la mayoría son unidades de 2 pernos que se enchufan. Llevamos actuadores de ajuste universal para muchos marcos y pedimos unidades específicas de marca (American Leather, Palliser, asientos de cine) cuando el montaje es propietario.",
      },
      {
        symptom: "El control de mano no hace nada, o solo funciona al mover el cable",
        cause:
          "El interruptor del control o su cable falló — soldadura rota, interruptor agrietado, o un cable de control pellizcado/deshilachado donde cruza el mecanismo. En asientos de dos motores (reposacabezas + reposapiés independientes) suele morir una mitad del control mientras la otra sigue funcionando.",
        fix:
          "Aislamos el control puenteando el motor directamente — si el asiento se mueve, el control es el culpable y lo reemplazamos. Los controles de mano para Stressless, Natuzzi, American Leather y las marcas comunes de cine son cambios rápidos; llevamos controles universales en el camión.",
      },
      {
        symptom: "Un asiento de un seccional o fila de cine está muerto, los demás funcionan",
        cause:
          "Casi siempre es un problema de cableado en ese asiento, no un motor — el conector de corriente en cadena entre módulos se soltó, o el arnés de cableado se aplastó cuando se empujaron las secciones contra la pared.",
        fix:
          "Sacamos ese módulo, encontramos el conector desconectado o dañado, y reasentamos o empalmamos el arnés. Si un transformador alimenta ese asiento de forma individual (común en seccionales eléctricos), también lo probamos. Es una de las reparaciones de misma visita más satisfactorias que hacemos.",
      },
      {
        symptom: "Rechinido, golpeteo o bamboleo lateral al reclinar",
        cause:
          "El mecanismo de reclinación en sí — el varillaje de tijera y los puntos de pivote — se desgastó, perdió un tornillo o se quedó sin lubricación. En Ekornes Stressless suele ser el sistema de deslizamiento/Plus y sus ruedas de tensión, más que un motor; en marcos estándar es un perno de montaje suelto o un buje de pivote gastado.",
        fix:
          "Desarmamos lo suficiente para inspeccionar el varillaje, reapretamos la tornillería, reemplazamos bujes o pasadores gastados y lubricamos los rieles. En Stressless ajustamos las ruedas de deslizamiento y la tensión del sistema Plus a especificación. El ruido que en realidad es una soldadura agrietada o un marco de madera roto lo señalamos como referencia de marco/tapicería.",
      },
      {
        symptom: "Puerto USB / de carga, luz del portavasos o accesorio del panel no funciona",
        cause:
          "Estos funcionan con una derivación de bajo voltaje separada o con su propio pequeño transformador, independiente del motor de reclinación. La falla más común es un transformador de accesorios quemado o un arnés de accesorios desconectado; a veces el módulo USB se cortocircuitó por una bebida derramada.",
        fix:
          "Probamos el circuito de accesorios por separado del circuito del motor, reemplazamos el transformador de accesorios o el módulo USB, y reasentamos el arnés. Reparación rápida y económica — y revisamos que un derrame no haya alcanzado el cableado del motor mientras estamos adentro.",
      },
    ],
    faqs: [
      {
        question: "¿De verdad reparan los motores y la electrónica de los sillones reclinables eléctricos?",
        answer:
          "Sí — es nuestro trabajo principal en muebles de movimiento. Probamos y reemplazamos actuadores lineales (motores), transformadores/fuentes de poder (29V y 24V), controles de mano, arneses de cableado y circuitos de accesorios como puertos USB. Vamos a su hogar, diagnosticamos toda la cadena eléctrica y la reparamos en el momento siempre que la pieza esté en el camión.",
      },
      {
        question: "¿Qué marcas de sillones reclinables y muebles de movimiento atienden?",
        answer:
          "Ekornes Stressless, Natuzzi (Editions e Italia), American Leather, Roche Bobois, Fjords, Palliser, Ethan Allen, Hancock & Moore, Berkline y marcas de asientos de cine en casa como Fortress y Octane. También llevamos actuadores, transformadores y controles de ajuste universal que cubren muchos otros marcos.",
      },
      {
        question: "¿Pueden reparar cuero rasgado o un marco roto?",
        answer:
          "Somos honestos sobre nuestra especialidad: nos enfocamos en la parte mecánica y eléctrica — motores, mecanismos, transformadores y controles. No hacemos retapizado de cuero ni reconstrucción de marcos de madera. Si su problema es tapicería rasgada o un marco agrietado, se lo diremos con claridad y lo referiremos a un artesano de muebles de confianza en lugar de cobrarle por trabajo fuera de nuestra especialidad.",
      },
      {
        question: "¿Vale la pena reparar un sillón reclinable eléctrico en vez de reemplazarlo?",
        answer:
          "Por lo general, sí. En muebles de movimiento premium las fallas más comunes — un transformador, un control de mano, un arnés desconectado — son piezas económicas y una visita corta, mientras que reemplazar un sillón o seccional de cuero de calidad cuesta miles. Le damos un diagnóstico directo y un presupuesto por escrito para que decida con números reales, no con la presión de una tienda para comprar nuevo.",
      },
      {
        question: "¿Cómo funciona el diagnóstico de $59?",
        answer:
          "El diagnóstico de $59 cubre una revisión completa en su hogar. Si aprueba la reparación, los $59 se abonan a su reparación y solo paga el trabajo; si decide no continuar, paga únicamente los $59. Sin cargo de diagnóstico oculto adicional, y sin costo por cotizar una pieza que haya que pedir. Llame al (754) 345-4515 para agendar.",
      },
    ],
  },
};
