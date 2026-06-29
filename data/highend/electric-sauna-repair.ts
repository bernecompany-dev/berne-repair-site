import type { HighEndService } from "./types";

export const electricSaunaRepair: HighEndService = {
  slug: "electric-sauna-repair",
  name: "Electric Sauna Repair",
  shortName: "Sauna",
  seoNoun: "electric sauna",
  metaTitle: "Electric Sauna Repair, South Florida | $59 Call",
  metaDescription:
    "Home electric and infrared sauna repair across Miami-Dade, Broward, and Palm Beach. Tylo, Harvia, Finnleo, Klafs heaters, controls, and elements. $59 service call, free with repair.",
  cardDescription:
    "Heater, element, and control repair for electric and infrared home saunas. Tylo, Harvia, Finnleo, Klafs.",
  heroLede: "for South Florida luxury homes.",
  longDescription:
    "When a steam-dry sauna goes cold or an infrared cabin throws a breaker, the problem is almost always the heater element, a contactor, or the control board — not the cabin itself. We service electric sauna heaters, infrared carbon and ceramic emitters, control panels, and high-limit safety circuits for Tylo, Harvia, Finnleo, Klafs, and the rest of the niche brands you actually find in Bal Harbour, Coral Gables, and Boca homes. Careful, clean work inside finished cedar and hemlock rooms, with the salt-air corrosion that comes with coastal living factored in from the first visit.",
  ownerNote: {
    opener:
      "A home sauna is a small thing that lives inside an expensive room, and most repair guys treat it like a water heater. We do not.",
    body:
      "I have had techs walk into a Klafs cabin in a Fisher Island master suite where the cedar alone cost more than the heater, the control, and the labor combined. So we drop cloths first, pull the heater guard without scratching the bench, and ohm-test the element before we touch anything else. Nine times out of ten an electric sauna that will not heat is one failed heater element or a contactor that stopped pulling in, and we carry the common Tylo and Harvia parts to make that a one-visit fix. The honest part: Klafs, Sauna360, and some older Finnleo controls are slow to source in the US, so when a board is genuinely dead we tell you it is a two-to-five-day order, not a same-day miracle.",
    closer:
      "You get a tech who respects the room, a real diagnosis, and a straight answer on repair versus replace — the same $59 service call, free with the repair, that the rest of the company runs on.",
  },
  diagnosisTitle: "How we diagnose & fix electric saunas",
  diagnosisIntro:
    "An electric sauna is a simple high-current circuit wrapped in a beautiful box: power in, contactor, heater elements, a temperature sensor, and a high-limit safety cutout, all run by a control panel. We test that chain in order, with a meter, so you are not paying to swap parts on a guess. Here is what we actually see in South Florida homes.",
  commonIssues: [
    "Sauna powers on but never reaches temperature",
    "Heater dead — no heat at all, breaker holds",
    "Breaker or GFCI trips when the heater calls for power",
    "Control panel blank, frozen, or showing a fault code",
    "Infrared cabin: one or more emitters cold",
    "Heater elements corroded or crusted white (coastal homes)",
    "Sauna will not stay on / shuts off after a few minutes",
  ],
  failureModes: [
    {
      symptom: "Heater runs but the room only gets lukewarm",
      cause:
        "One of the heater elements has gone open-circuit. Most electric stoves (Tylo Sport/Sense, Harvia KIP/Cilindro, Finnleo) use three elements in parallel; lose one and the heater still draws current and feels warm, but it cannot pull a finished room up to 180-195F. The control reads the sensor, keeps calling for heat, and never satisfies.",
      fix:
        "We ohm each element individually at the heater terminal block — a good element reads roughly 17-25 ohms depending on wattage; an open one reads infinite. We replace the dead element (Tylo and Harvia elements ride on the truck) and confirm balanced draw on all legs before we button up. Most are a single-visit fix.",
    },
    {
      symptom: "Heater is completely dead but the breaker is on and the panel lights up",
      cause:
        "The contactor (the heavy relay that actually switches the heater elements) has failed to pull in, or its contacts have welded and then burned open. On Harvia Xenio and Griffin systems the contactor lives in a separate power box; on many Tylo stoves it is integral. Salt air and years of high-current cycling pit the contacts.",
      fix:
        "We confirm the control is sending the low-voltage call, then test for line voltage across the contactor output. No output with a valid call means the contactor is replaced — a clean, common part we stock for the major control families. We also check the wiring lugs for heat damage, since a loose lug cooks a contactor early.",
    },
    {
      symptom: "Breaker or GFCI trips the moment the heater fires",
      cause:
        "Almost always a heater element that has cracked its sheath and is now leaking current to ground — extremely common on coastal homes where salt-laden air corrodes the element ends. Less often it is moisture in the heater junction box or a chafed element lead. A genuine sauna circuit on GFCI will trip instantly on this fault, which is the safety system doing its job.",
      fix:
        "We megger/insulation-test each element to ground to find the leaker, replace it, and dry and reseal the junction box. If the home has older non-GFCI protection on a wet-rated sauna we flag it. We do not defeat a GFCI to make a symptom go away — that fault is real and we fix the cause.",
    },
    {
      symptom: "Control panel is blank, frozen, or showing an error code",
      cause:
        "On Tylo Pure and Elite and on Harvia Xenio/Griffin, a frozen or blank panel is usually a failed temperature sensor or a broken sensor lead reading out of range, which forces the control into a protective lockout. Sometimes it is the control board itself after a surge — common after summer storm season in Florida.",
      fix:
        "We read the code, then test the temperature sensor and its run back to the board (a failed sensor is a cheap, fast swap). If the board is genuinely dead we order it. Tylo and Harvia boards are reasonably quick to source; Klafs, Sauna360, Helo, and older Finnleo controls can take two to five business days, and we say so up front.",
    },
    {
      symptom: "Infrared cabin: it powers on but one bench stays cold",
      cause:
        "Infrared cabins (Finnleo, Saunatec, and the infrared lines) use multiple carbon or ceramic emitters wired in zones. One cold emitter or a failed zone relay leaves part of the cabin warm and part dead. Carbon panels fail open at a solder joint; ceramic rods crack with age and vibration.",
      fix:
        "We test each emitter for continuity and draw, isolate the dead one or the failed zone relay, and replace it. Carbon and ceramic emitters are model-specific, so we measure and confirm fitment — some are stocked, some are a short order. Wiring and connectors get re-terminated since heat fatigues them over time.",
    },
    {
      symptom: "Sauna heats then shuts itself off after a few minutes",
      cause:
        "The high-limit thermostat (the manual-reset safety cutout on the heater) is doing its job because the heater is overheating in place, OR the high-limit itself has drifted and is tripping early. The usual root cause is rocks packed too tightly, a blocked heater, or an aged high-limit that no longer holds its setpoint. This is the circuit that prevents a fire, so we never just bypass it.",
      fix:
        "We check rock loading and airflow first, then test the high-limit and the operating thermostat. If the cutout is genuinely weak we replace it with the correct OEM-spec part and verify it holds at temperature. We also re-stack sauna stones properly — loose, not packed — which fixes a surprising number of these calls outright.",
    },
  ],
  faqs: [
    {
      question: "Is it worth repairing my sauna, or should I just replace it?",
      answer:
        "For the cabin itself, almost always repair. The cedar or hemlock room is the expensive part and it rarely fails — what fails is the heater element, a contactor, a sensor, or the control board, and those are bounded, fixable costs. We only steer you toward a new heater when the stove is badly corroded and parts cost approaches a replacement heater. We give you the numbers and let you decide; there is no upsell.",
    },
    {
      question: "Which sauna brands do you actually work on?",
      answer:
        "Tylo (Tylo), Harvia, Finnleo, Klafs, Sauna360, Amerec, Helo, and Saunatec, plus the common infrared cabin lines. We stock the fast-moving Tylo and Harvia elements, contactors, and sensors. Klafs, Sauna360, Helo, and older Finnleo controls are genuine niche parts and can take a few business days to source — we tell you the timeline before you commit.",
    },
    {
      question: "How does the $59 service call work?",
      answer:
        "A flat $59 brings a real technician to your home to diagnose the sauna with a meter — not a guess. If you approve the repair, the $59 is free, folded into the job. If you decline, you pay only the $59 and keep a written quote with part numbers. Repairs carry our 90-day warranty, and same-day service is often available across Miami-Dade, Broward, and Palm Beach.",
    },
    {
      question: "My sauna keeps tripping the breaker or GFCI — is that dangerous?",
      answer:
        "It means the safety system is working. A sauna heater that trips a GFCI is almost always leaking current to ground through a cracked element — the protection is stopping a real hazard. The right fix is to find and replace the faulty element and reseal the junction box, never to defeat the GFCI or the high-limit cutout. We diagnose the actual fault and repair it to code.",
    },
    {
      question: "Why do heater elements fail faster in coastal homes?",
      answer:
        "Salt-laden air corrodes the metal ends of sauna heater elements and pits contactor contacts, so oceanfront homes in Bal Harbour, Fisher Island, Sunny Isles, and Key Biscayne see elements fail years earlier than inland. Simple maintenance helps: run the heater dry for 15-20 minutes after wet use to drive off moisture, keep stones loose and rotated, and have the heater inspected annually. We can set that up when we are out.",
    },
  ],
  brands: [
    "Tylo",
    "Harvia",
    "Finnleo",
    "Klafs",
    "Sauna360",
    "Amerec",
    "Helo",
    "Saunatec",
    "Sentiotec",
    "Polar",
  ],
  related: [
    {
      href: "/services/cold-plunge-repair",
      label: "Cold Plunge & Ice Bath Repair",
      blurb:
        "The other half of contrast therapy — chiller, pump, and controller service for home cold plunges and ice baths.",
    },
    {
      href: "/services/pool-heater-repair",
      label: "Pool Heater Repair",
      blurb:
        "Gas, electric, and heat-pump pool heaters diagnosed and repaired across South Florida's luxury homes.",
    },
  ],
  article: {
    slug: "electric-sauna-repair-troubleshooting-miami",
    title: "Electric Sauna Won't Heat? A Miami Technician's Troubleshooting Guide",
    description:
      "Why home electric and infrared saunas stop heating, trip breakers, or lock out — element tests, contactors, high-limit cutouts, and the coastal salt-air problem. From the owner of Berne Appliance Repair.",
    publishedAt: new Date("2026-06-24T13:00:00Z"),
    author: "Eugene Berne, Owner — Berne Appliance Repair",
    readingMinutes: 7,
    topic: "premium-service",
    body: `A client in Coral Gables texted us a photo last winter: her Tylo sauna control glowing, the timer counting down, and a thermometer on the bench stuck at 110F three hours in. The room felt warm, almost convincing, but it would never get to the 185F she set. By the time we pulled the heater guard, the answer was obvious on the meter — one of three heater elements had gone open. We swapped it, balanced the draw across all three legs, and the room hit setpoint in under forty minutes.

That call is the single most common electric-sauna problem we see in Miami homes, and it is one of several you can at least understand before you book anyone. Here is how a [home electric sauna](/services/electric-sauna-repair) actually works, where it fails, and what is safe to check yourself.

## How an electric sauna actually heats

Strip away the cedar and an electric sauna is a simple, high-current circuit. Power comes in on a dedicated breaker, runs through a contactor — a heavy relay that switches the big load — and feeds the heater elements, usually three of them in parallel under the rocks. A temperature sensor up on the wall tells the control panel what the room is doing, and a high-limit safety cutout sits on the heater ready to kill power if anything overheats.

Brands change the packaging, not the physics. Tylo Pure and Elite, Harvia Xenio and Griffin, Finnleo, and Klafs all run that same chain. When a sauna misbehaves, we test it in order: power, contactor, elements, sensor, high-limit. A meter turns "it won't heat" into a specific failed part in about twenty minutes.

## The lukewarm sauna: a dead element

If the room gets warm but never hot, suspect a heater element. Three elements share the load; lose one and the heater still draws current and feels warm to the hand, but it cannot pull a finished room up past the 180s. The control keeps calling for heat and never gets satisfied, so it runs forever.

A good element ohms out around 17-25 ohms depending on wattage. An open one reads infinite. We test each one at the terminal block, replace the dead one — Tylo and Harvia elements ride on our truck — and confirm balanced current on all three legs before we close it up. This is almost always a one-visit fix.

## When it trips the breaker: take it seriously

A sauna that trips the breaker or GFCI the instant the heater fires is not a nuisance, it is a warning. The usual cause is an element that has cracked its sheath and is now leaking current to ground. In coastal homes this is common — salt air corrodes the metal ends of the elements until one finally fails to ground.

Do not keep resetting the breaker, and never let anyone "solve" it by defeating the GFCI or jumping the high-limit cutout. Those circuits exist to prevent a fire in a wooden room you sit inside. We insulation-test each element to ground to find the leaker, replace it, and dry and reseal the heater junction box. The fix is the fault, not the safety device.

## The blank or frozen control panel

On Tylo and Harvia systems, a dead or frozen panel is usually not the panel — it is the temperature sensor or its wiring reading out of range, which forces the control into a protective lockout. A failed sensor is a cheap, fast swap. After our summer storm season we also see boards killed by surges; a whole-home surge protector at the panel is cheap insurance for any premium sauna or spa.

Here is the honest part about parts. Tylo and Harvia boards we can source quickly. Klafs, Sauna360, Helo, and some older Finnleo controls are genuine niche items and can take two to five business days to land in the US. When a board is truly dead, we tell you the real timeline rather than promise a same-day fix we can't keep.

## Infrared cabins are a different animal

Infrared rooms — Finnleo, Saunatec, and the infrared lines — do not use rocks and a stove. They use carbon or ceramic emitters wired in zones. If one bench stays cold while another warms up, you have a dead emitter or a failed zone relay, not a whole-cabin failure. Carbon panels tend to fail at a solder joint; ceramic rods crack with age. We test each emitter, isolate the dead one, and replace it — measuring first, since emitters are model-specific.

## The coastal tax — and the maintenance that beats it

If you live near the water in Bal Harbour, Fisher Island, Sunny Isles, or Key Biscayne, your heater elements will fail earlier than they would inland. Salt-laden air pits contactor contacts and corrodes element ends. You cannot stop the ocean, but you can slow it down: run the heater dry for fifteen to twenty minutes after every wet session to drive off moisture, keep the stones loose and rotated rather than packed tight, and have the heater looked at once a year. The same discipline protects your other wellness gear — we cover that in our [cold plunge and ice bath service](/services/cold-plunge-repair) too.

## What is safe to check, and when to call

You can safely confirm the breaker is on, look for a fault code on the panel, and check that the stones are loose, not jammed against the elements. Anything past that means opening a high-current heater, and on a sauna that lives inside finished cedar, that is our job.

If your sauna won't heat, trips the breaker, or locks out, a real diagnosis is one phone call. We charge a flat $59 service call — a technician comes out, tests the heater with a meter, and gives you a straight answer. Approve the repair and the $59 is free, folded into the job; decline and you owe only the $59 and keep a written quote. Repairs carry a 90-day warranty, and same-day service is often available across Miami-Dade, Broward, and Palm Beach. Call (754) 345-4515.`,
  },
  es: {
    name: "Reparación de Saunas Eléctricas",
    shortName: "Sauna",
    seoNoun: "sauna eléctrica",
    metaTitle: "Reparación de Saunas Eléctricas | Visita $59",
    metaDescription:
      "Reparación de saunas eléctricas e infrarrojas en Miami-Dade, Broward y Palm Beach. Calentadores, resistencias y controles Tylo, Harvia, Finnleo y Klafs. Visita técnica de $59, gratis con la reparación.",
    heroLede: "en hogares de lujo del sur de Florida.",
    longDescription:
      "Cuando una sauna seca se enfría o una cabina infrarroja dispara el breaker, el problema casi siempre es la resistencia del calentador, un contactor o la placa de control — no la cabina en sí. Reparamos calentadores de sauna eléctricos, emisores infrarrojos de carbono y cerámica, paneles de control y circuitos de seguridad de alto límite para Tylo, Harvia, Finnleo, Klafs y las demás marcas especializadas que se encuentran en las casas de Bal Harbour, Coral Gables y Boca. Trabajo cuidadoso y limpio dentro de habitaciones acabadas en cedro y hemlock, teniendo en cuenta desde la primera visita la corrosión por aire salino de la vida costera.",
    ownerNote: {
      opener:
        "Una sauna en casa es algo pequeño que vive dentro de una habitación cara, y la mayoría de los técnicos la tratan como un calentador de agua. Nosotros no.",
      body:
        "He tenido técnicos que entran a una cabina Klafs en una suite principal de Fisher Island donde solo el cedro costó más que el calentador, el control y la mano de obra juntos. Por eso ponemos cobertores primero, retiramos la rejilla del calentador sin rayar la banca y medimos la resistencia con el multímetro antes de tocar nada más. Nueve de cada diez veces, una sauna eléctrica que no calienta es una sola resistencia dañada o un contactor que dejó de activarse, y llevamos las piezas comunes de Tylo y Harvia para resolverlo en una sola visita. La parte honesta: los controles de Klafs, Sauna360 y algunos Finnleo antiguos tardan en conseguirse en EE. UU., así que cuando una placa está realmente muerta le decimos que es un pedido de dos a cinco días, no un milagro el mismo día.",
      closer:
        "Recibe un técnico que respeta la habitación, un diagnóstico real y una respuesta directa sobre reparar o reemplazar — con la misma visita técnica de $59, gratis con la reparación, que rige en toda la empresa.",
    },
    diagnosisTitle: "Cómo diagnosticamos y reparamos saunas",
    diagnosisIntro:
      "Una sauna eléctrica es un circuito sencillo de alta corriente envuelto en una caja hermosa: entrada de energía, contactor, resistencias, un sensor de temperatura y un corte de seguridad de alto límite, todo gobernado por un panel de control. Probamos esa cadena en orden, con el multímetro, para que no pague por cambiar piezas a la adivinanza. Esto es lo que realmente vemos en los hogares del sur de Florida.",
    commonIssues: [
      "La sauna enciende pero nunca alcanza la temperatura",
      "Calentador muerto — no calienta nada, el breaker se mantiene",
      "El breaker o el GFCI se dispara cuando el calentador pide energía",
      "Panel de control en blanco, congelado o con código de error",
      "Cabina infrarroja: uno o más emisores fríos",
      "Resistencias corroídas o cubiertas de costra blanca (casas costeras)",
      "La sauna no se mantiene encendida / se apaga a los pocos minutos",
    ],
    failureModes: [
      {
        symptom: "El calentador funciona pero la habitación solo se entibia",
        cause:
          "Una de las resistencias del calentador quedó en circuito abierto. La mayoría de los calentadores eléctricos (Tylo Sport/Sense, Harvia KIP/Cilindro, Finnleo) usan tres resistencias en paralelo; si falla una, el calentador sigue consumiendo corriente y se siente tibio, pero no puede llevar una habitación acabada a 180-195F. El control lee el sensor, sigue pidiendo calor y nunca se satisface.",
        fix:
          "Medimos cada resistencia por separado en la regleta del calentador — una buena marca unos 17-25 ohmios según la potencia; una abierta marca infinito. Reemplazamos la resistencia muerta (llevamos resistencias Tylo y Harvia en la camioneta) y confirmamos consumo equilibrado en todas las líneas antes de cerrar. Casi siempre se resuelve en una visita.",
      },
      {
        symptom: "El calentador está totalmente muerto pero el breaker está encendido y el panel ilumina",
        cause:
          "El contactor (el relé pesado que conecta las resistencias) no se activa, o sus contactos se soldaron y luego se quemaron. En los sistemas Harvia Xenio y Griffin el contactor vive en una caja de poder aparte; en muchos calentadores Tylo es integral. El aire salino y años de ciclos de alta corriente pican los contactos.",
        fix:
          "Confirmamos que el control envía la señal de baja tensión, luego medimos el voltaje de línea a la salida del contactor. Sin salida con una señal válida, se reemplaza el contactor — una pieza limpia y común que tenemos en existencia para las principales familias de control. También revisamos los bornes por daño térmico, ya que un borne flojo quema un contactor antes de tiempo.",
      },
      {
        symptom: "El breaker o el GFCI se dispara en cuanto enciende el calentador",
        cause:
          "Casi siempre es una resistencia con la vaina agrietada que ahora fuga corriente a tierra — muy común en casas costeras donde el aire salino corroe los extremos de la resistencia. Con menos frecuencia es humedad en la caja de conexiones o un cable de resistencia rozado. Un circuito de sauna con GFCI se dispara de inmediato ante esta falla, que es el sistema de seguridad haciendo su trabajo.",
        fix:
          "Hacemos una prueba de aislamiento de cada resistencia a tierra para hallar la que fuga, la reemplazamos, y secamos y sellamos la caja de conexiones. Si la casa tiene una protección antigua sin GFCI en una sauna de zona húmeda, lo señalamos. No anulamos un GFCI para que el síntoma desaparezca — esa falla es real y reparamos la causa.",
      },
      {
        symptom: "El panel de control está en blanco, congelado o muestra un código de error",
        cause:
          "En Tylo Pure y Elite y en Harvia Xenio/Griffin, un panel congelado o en blanco suele ser un sensor de temperatura dañado o un cable de sensor roto que lee fuera de rango, lo que fuerza al control a un bloqueo de protección. A veces es la propia placa de control tras una sobretensión — común después de la temporada de tormentas de verano en Florida.",
        fix:
          "Leemos el código, luego probamos el sensor de temperatura y su cableado hasta la placa (un sensor dañado es un cambio rápido y económico). Si la placa está realmente muerta, la pedimos. Las placas Tylo y Harvia se consiguen razonablemente rápido; los controles Klafs, Sauna360, Helo y Finnleo antiguos pueden tardar de dos a cinco días hábiles, y lo decimos de entrada.",
      },
      {
        symptom: "Cabina infrarroja: enciende pero una banca queda fría",
        cause:
          "Las cabinas infrarrojas (Finnleo, Saunatec y las líneas infrarrojas) usan varios emisores de carbono o cerámica cableados por zonas. Un emisor frío o un relé de zona dañado dejan parte de la cabina caliente y parte muerta. Los paneles de carbono fallan en una soldadura; las varillas de cerámica se agrietan con la edad y la vibración.",
        fix:
          "Probamos cada emisor por continuidad y consumo, aislamos el muerto o el relé de zona dañado, y lo reemplazamos. Los emisores de carbono y cerámica son específicos del modelo, así que medimos y confirmamos la compatibilidad — algunos están en existencia, otros son un pedido corto. Recableamos los conectores ya que el calor los fatiga con el tiempo.",
      },
      {
        symptom: "La sauna calienta y luego se apaga sola a los pocos minutos",
        cause:
          "El termostato de alto límite (el corte de seguridad de rearme manual del calentador) está haciendo su trabajo porque el calentador se sobrecalienta, O el propio alto límite se descalibró y se dispara antes de tiempo. La causa habitual son piedras apiladas muy apretadas, un calentador bloqueado o un alto límite envejecido que ya no mantiene su punto de ajuste. Este es el circuito que evita un incendio, así que nunca lo anulamos.",
        fix:
          "Primero revisamos la carga de piedras y el flujo de aire, luego probamos el alto límite y el termostato de operación. Si el corte está realmente débil lo reemplazamos con la pieza OEM correcta y verificamos que aguante a temperatura. También reacomodamos las piedras correctamente — sueltas, no apretadas — lo que resuelve muchas de estas llamadas por completo.",
      },
    ],
    faqs: [
      {
        question: "¿Vale la pena reparar mi sauna o debería reemplazarla?",
        answer:
          "En cuanto a la cabina, casi siempre conviene repararla. La habitación de cedro o hemlock es la parte cara y rara vez falla — lo que falla es la resistencia, un contactor, un sensor o la placa de control, costos acotados y reparables. Solo recomendamos un calentador nuevo cuando la estufa está muy corroída y el costo de las piezas se acerca al de un calentador de reemplazo. Le damos los números y usted decide; sin ventas a presión.",
      },
      {
        question: "¿Con qué marcas de sauna trabajan realmente?",
        answer:
          "Tylo, Harvia, Finnleo, Klafs, Sauna360, Amerec, Helo y Saunatec, además de las líneas comunes de cabinas infrarrojas. Tenemos en existencia las resistencias, contactores y sensores de Tylo y Harvia de mayor rotación. Los controles Klafs, Sauna360, Helo y Finnleo antiguos son piezas especializadas y pueden tardar varios días hábiles — le indicamos el plazo antes de comprometerse.",
      },
      {
        question: "¿Cómo funciona la visita técnica de $59?",
        answer:
          "Una tarifa fija de $59 lleva a un técnico real a su casa para diagnosticar la sauna con un multímetro — no a la adivinanza. Si aprueba la reparación, los $59 son gratis, incluidos en el trabajo. Si la rechaza, paga solo los $59 y se queda con un presupuesto por escrito con números de pieza. Las reparaciones tienen garantía de 90 días, y a menudo hay servicio el mismo día en Miami-Dade, Broward y Palm Beach.",
      },
      {
        question: "Mi sauna sigue disparando el breaker o el GFCI — ¿es peligroso?",
        answer:
          "Significa que el sistema de seguridad está funcionando. Una resistencia de sauna que dispara un GFCI casi siempre fuga corriente a tierra por una resistencia agrietada — la protección está deteniendo un peligro real. La solución correcta es hallar y reemplazar la resistencia defectuosa y resellar la caja de conexiones, nunca anular el GFCI ni el corte de alto límite. Diagnosticamos la falla real y la reparamos según norma.",
      },
      {
        question: "¿Por qué las resistencias fallan más rápido en las casas costeras?",
        answer:
          "El aire cargado de sal corroe los extremos metálicos de las resistencias y pica los contactos del contactor, así que las casas frente al mar en Bal Harbour, Fisher Island, Sunny Isles y Key Biscayne ven fallar las resistencias años antes que tierra adentro. El mantenimiento simple ayuda: encienda el calentador en seco 15-20 minutos después del uso húmedo para eliminar la humedad, mantenga las piedras sueltas y rotadas, y revise el calentador una vez al año. Lo podemos dejar programado cuando vayamos.",
      },
    ],
  },
};
