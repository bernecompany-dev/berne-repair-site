import type { HighEndService } from "./types";

export const yachtMarineApplianceRepair: HighEndService = {
  slug: "yacht-marine-appliance-repair",
  name: "Yacht & Marine Appliance Repair",
  shortName: "Marine Appliance",
  seoNoun: "marine appliance",
  metaTitle: "Yacht Appliance Repair Miami & Fort Lauderdale | Dockside",
  metaDescription:
    "Dockside yacht & marine appliance repair — Sub-Zero, U-Line, Vitrifrigo, Isotherm, Marvel refrigerators, wine coolers, ice makers, galley cooktops & laundry. Miami, Fort Lauderdale & Palm Beach marinas. $59 diagnostic, credited to repair. Licensed & insured.",
  cardDescription:
    "White-glove dockside repair of onboard refrigerators, wine coolers, ice makers, dishwashers, laundry & galley cooktops — Sub-Zero, U-Line, Vitrifrigo, Isotherm, Marvel. Miami to Palm Beach marinas.",
  heroLede: "dockside at South Florida's marinas.",
  longDescription:
    "The galley of a yacht runs on the same luxury appliances as a fine home — Sub-Zero and U-Line refrigeration, Marvel wine drawers, Scotsman and Hoshizaki ice, Miele laundry, and induction or gimbaled cooktops — but they live in a harder world: salt air, constant humidity, vibration underway, and 12/24-volt DC or shore-power systems that a shoreside tech never touches. We service onboard appliances dockside, coming to the slip in Miami Beach, Fort Lauderdale, or Palm Beach and working around the captain's and crew's schedule. We repair Vitrifrigo, Isotherm, Frigoboat, Dometic, Norcold, U-Line Marine, Sub-Zero, Marvel, and Fisher & Paykel refrigeration; wine columns and drawers; flake, cube, and seawater-cooled ice makers; galley dishwashers, cooktops and ovens; and compact Miele and Splendide laundry — diagnosing on-site and finishing on the first visit whenever the part is aboard our truck. We coordinate with yacht management and captains, protect the joinery, and keep the work discreet.",
  ownerNote: {
    opener: "A yacht galley is a luxury kitchen that has to survive salt, vibration, and a DC electrical system — I treat it that way.",
    body:
      "Most appliance techs won't set foot on a boat. The refrigeration often runs on 12 or 24 volts through a Danfoss BD compressor instead of a wall outlet, the condenser may be water-cooled off a seawater loop rather than a fan, and everything is bolted into tight custom teak joinery you cannot afford to scratch. That's exactly the work my senior guys are built for. The appliance itself — a Sub-Zero drawer, a Vitrifrigo box, a Scotsman ice head — fails the same way it does ashore: a tired compressor, a fouled condenser, a bad thermistor, a clogged drain. What marine adds is the DC power path, the corrosion, and the discipline to work clean in a stateroom. I come to the slip, I confirm whether it's the appliance or the boat's power feeding it, and I give the captain a straight answer and a real number before anyone orders a part.",
    closer: "If your box holds temp, your ice head drops clean cubes, and I leave the joinery the way I found it, I did the job right.",
  },
  diagnosisTitle: "How we diagnose & fix marine appliances dockside",
  diagnosisIntro:
    "An onboard refrigerator or ice maker is the same compressor, condenser, control, and drain you'd find ashore — plus a marine twist: a DC compressor, a seawater-cooled condenser, and a salt-air environment. We test the chain in order with a meter and confirm the boat's power first, so you get a real diagnosis, not a guess and a parts order.",
  commonIssues: [
    "Refrigerator or freezer not holding temp / running warm underway or at the dock",
    "DC fridge won't start or short-cycles (12V/24V Danfoss/Secop BD compressor)",
    "Ice maker stopped producing, makes soft or hollow cubes, or won't harvest",
    "Wine cooler drifting off its set temperature or icing up",
    "Water-cooled condenser fouled or pump not circulating — high-side overheating",
    "Galley dishwasher won't drain, fill, or heat",
    "Induction, gas, or gimbaled cooktop / oven not igniting or not heating",
    "Compact washer/dryer (Miele, Splendide) not draining, spinning, or drying",
    "Corrosion, salt buildup, or a musty box after time closed up at the dock",
  ],
  failureModes: [
    {
      symptom: "Box runs but won't get cold — refrigerator or freezer stays warm",
      cause:
        "On marine refrigeration the two prime suspects are the sealed system and the condenser. Air-cooled boxes (Vitrifrigo, Isotherm front-vent, U-Line Marine) foul their condenser fins with salt and dust in the confined locker they're built into, so the compressor can't reject heat and the box climbs. Water-cooled units (Frigoboat keel-cooler, Sub-Zero marine, seawater-cooled ice) lose cooling when the seawater pump fails, the strainer clogs, or the condenser coil scales up. Underneath either, the Danfoss/Secop BD compressor itself can lose efficiency after years, or the system can be low on charge from a slow leak.",
      fix:
        "We check the obvious marine causes first — clean and inspect the condenser, confirm the seawater pump is pulling and the strainer is clear, and verify airflow to the box. We put a clamp meter on the compressor and read its current draw and cut-in behavior against spec, and check the fridge/freezer thermistors. A fouled condenser or a dead cooling pump is a same-visit fix; a genuinely weak compressor or a refrigerant leak we diagnose and quote before any sealed-system work.",
    },
    {
      symptom: "DC refrigerator won't start, clicks, or short-cycles",
      cause:
        "Marine DC refrigeration lives or dies on clean voltage. A Danfoss/Secop BD35 or BD50 compressor needs adequate volts at the electronic control module; a low or sagging house bank, a corroded terminal, an undersized or aged wire run, or a loose ground drops the voltage under start load and the module trips on low-voltage cutout — you hear it click and give up. The control module's fan, thermostat, or the module itself can also fail and blink a fault code on its LED.",
      fix:
        "We measure voltage right at the compressor's control module while it tries to start, not just at the panel — half of these calls are the boat's power, not the fridge. We check the house-bank voltage under load, the terminals and ground, and read the module's blink-code. A wiring or connection fault we clean and correct; a failed control module or compressor we identify by its fault pattern and quote with the exact part. We tell you plainly when the fix is the appliance and when it's the vessel's electrical system.",
    },
    {
      symptom: "Ice maker stopped, or makes soft, hollow, or cloudy cubes",
      cause:
        "Onboard ice makers (Scotsman, Hoshizaki, U-Line Marine, Dometic) work hard and scale fast on dock water. A stopped machine is usually a clogged water valve or line, a failed water pump, or a harvest-cycle fault; soft or hollow cubes mean low water flow, a fouled evaporator, or a refrigeration/charge problem; cloudy or slow ice points to scale and a dirty system. Seawater-cooled ice heads add the same condenser-cooling failures as the fridges — a weak pump or a scaled condenser.",
      fix:
        "We trace the water side first — inlet valve, pump, and lines — then the harvest mechanism and the evaporator, and we descale the water path where dock water has scaled it. On seawater-cooled heads we confirm the cooling loop. Most no-ice and bad-ice calls are water flow, scale, or a harvest fault and finish on the first visit; a sealed-system fault we diagnose and quote.",
    },
    {
      symptom: "Wine cooler drifting off temperature or frosting up",
      cause:
        "Onboard wine columns and drawers (Sub-Zero, Marvel, U-Line, EuroCave) fight humidity and door-seal wear in the marine environment. A drifting temperature is usually a failed thermistor feeding the control a false reading, a tired compressor or fan, or a door gasket that no longer seals in the humid saloon so the box works against itself. Frost or ice on the coil points to a defrost fault or, again, a leaking seal pulling humid air in.",
      fix:
        "We verify the actual cabinet temperature against the setpoint with a probe, test the thermistor and the evaporator fan, and inspect the door seal and hinges. A drifted sensor or a failed fan is swapped and verified; a hardened gasket is replaced so the box holds against the humidity. We confirm the cabinet stays on its setpoint before we close up.",
    },
    {
      symptom: "Galley dishwasher won't drain, fill, or heat",
      cause:
        "Compact and full-size galley dishwashers (Miele, Bosch, Fisher & Paykel drawer) fail the same way ashore — a clogged drain pump or filter, a failed inlet valve, a bad heating element or control — but the boat adds two wrinkles: the drain path may run to a sump or overboard pump that's the real clog, and the unit may be fed from the vessel's pressurized water and shore/inverter power. A drawer dishwasher's seal and lid mechanism also wear.",
      fix:
        "We clear and test the drain pump and filter, confirm the boat's drain path and sump aren't the actual blockage, and check the inlet valve, heater, and control. On Fisher & Paykel DishDrawer units we service the lid seal and motor. We verify a full cycle — fill, heat, wash, drain — before we call it done.",
    },
    {
      symptom: "Cooktop or oven won't ignite or heat — induction, gas, or gimbaled range",
      cause:
        "Galley cooking runs the gamut: Miele and Wolf induction, sealed gas burners, and gimbaled marine ranges (Force 10, Kenyon). An induction hob that won't heat is usually a failed power board, a cracked coil, or a pan-detection/sensor fault. A gas burner that won't light is an igniter, a fouled orifice, or a failed valve/safety thermocouple. A gimbaled range that won't swing or a burner safety that won't stay lit is a mechanical or thermocouple issue specific to the marine unit.",
      fix:
        "For induction we test the board, coil, and sensors and replace the failed stage. For gas we clean or replace the igniter and orifice and verify the safety thermocouple holds the valve open. On gimbaled ranges we free and service the gimbal and the flame-failure device. We confirm every element or burner lights and holds before we leave.",
    },
    {
      symptom: "Compact washer or dryer won't drain, spin, or dry",
      cause:
        "Onboard laundry is usually a Miele compact, a Splendide washer-dryer combo, or a stacked pair. A no-drain or no-spin is typically a clogged pump or filter, a drain-path or sump issue on the boat side, a failed pump, or a lid/door-lock fault. A combo unit that washes but won't dry is often a vent or condenser-drying fault, a heater, or a thermostat. Vibration underway also loosens connections and wears the suspension.",
      fix:
        "We clear and test the drain pump and filter, confirm the vessel's drain path, and check the door lock and control. On Splendide and Miele combo units we test the heater, thermostat, and the condenser-dry circuit. We run a full cycle and confirm it drains, spins, and dries before closing up.",
    },
  ],
  faqs: [
    {
      question: "Do you come to the boat, or does it have to be hauled out?",
      answer:
        "We come to the boat. We work dockside at the slip — Miami Beach Marina, the Fort Lauderdale and Las Olas marinas, Bahia Mar, Pier Sixty-Six, and the Palm Beach marinas — so the appliance is repaired in place. There's no need to move the vessel or pull the unit off the boat unless a sealed-system rebuild genuinely requires it, and we tell you that up front.",
    },
    {
      question: "Which onboard appliances and brands do you service?",
      answer:
        "Refrigeration and freezers (Sub-Zero, U-Line Marine, Vitrifrigo, Isotherm, Frigoboat, Dometic, Norcold, Marvel, Fisher & Paykel), wine coolers and drawers, ice makers (Scotsman, Hoshizaki, U-Line, Dometic — including seawater-cooled heads), galley dishwashers (Miele, Bosch, Fisher & Paykel DishDrawer), induction and gas cooktops and ovens including gimbaled marine ranges (Wolf, Miele, Force 10, Kenyon), and compact laundry (Miele, Splendide). These are the platforms we see in South Florida's yachts and the parts our trucks and suppliers carry.",
    },
    {
      question: "Can you work on 12-volt and 24-volt DC marine refrigeration?",
      answer:
        "Yes. Marine DC refrigeration built on Danfoss/Secop BD compressors and electronic control modules is a core part of this work, and it's exactly what a shoreside appliance tech isn't equipped to diagnose. We measure voltage at the control module under start load, read the module's fault codes, and separate an appliance fault from a house-bank, wiring, or grounding problem on the vessel — so you're not paying to replace a compressor when the real issue is a corroded terminal or a low battery bank.",
    },
    {
      question: "Do you coordinate with captains and yacht management companies?",
      answer:
        "Routinely. We schedule around the crew's and charter calendar, coordinate access and scope with the captain or the management company, provide a written diagnosis and quote for their records, and keep the work discreet and clean. For a managed fleet we can invoice and report through the management office.",
    },
    {
      question: "How much does a dockside diagnostic cost?",
      answer:
        "Our diagnostic visit is a flat $59, credited to your repair — so you only pay it if you decide not to proceed. You get a firm written quote with parts and labor before any work begins. No diagnostic fee stacked on top, no upsell.",
    },
  ],
  brands: [
    "Sub-Zero",
    "U-Line Marine",
    "Vitrifrigo",
    "Isotherm",
    "Frigoboat",
    "Dometic",
    "Norcold",
    "Marvel",
    "Fisher & Paykel",
    "Miele",
    "Scotsman",
    "Hoshizaki",
    "Wolf",
    "Splendide",
    "Force 10",
  ],
  related: [
    {
      href: "/services/refrigerator-repair",
      label: "Refrigerator Repair",
      blurb:
        "The shoreside side of what we do onboard — sealed-system, compressor, and control work on built-in and premium refrigeration for your home.",
    },
    {
      href: "/services/wine-cooler-repair",
      label: "Wine Cooler Repair",
      blurb:
        "Column and drawer wine storage — temperature drift, compressor, and seal repair, whether it's in the saloon or the house.",
    },
    {
      href: "/services/ice-maker-repair",
      label: "Ice Maker Repair",
      blurb:
        "Cube, flake, and nugget ice heads — no-ice, bad-ice, harvest, and scale faults on Scotsman, Hoshizaki, and U-Line units.",
    },
  ],
  article: {
    slug: "yacht-refrigerator-not-cooling-repair-miami",
    title: "Yacht Refrigerator Not Cooling? A Marine Tech's Guide Before You Call",
    description:
      "Why an onboard refrigerator or freezer runs warm — condenser fouling, seawater-pump failure, DC voltage cutout, and compressor faults on Sub-Zero, Vitrifrigo, Isotherm, and Frigoboat marine units. Specific to South Florida marinas.",
    publishedAt: new Date("2026-07-01T13:00:00Z"),
    author: "Eugene Berne, Owner — Berne Appliance Repair",
    readingMinutes: 8,
    topic: "premium-service",
    body: `A captain at Bahia Mar called us on a Friday before a charter weekend. The main galley refrigerator — a Vitrifrigo built into a tight teak locker — was running nonstop and still sitting at 55°F, and the owner was aboard the next morning. By the time we left the slip, the box was back at 38°F. The cause wasn't the compressor everyone feared; it was a condenser packed solid with salt and lint in a locker that never got airflow, plus a house bank sagging just low enough to make the compressor stumble. A clean, a terminal, and a battery check, and the box held.

That call is the most common [yacht and marine appliance repair](/services/yacht-marine-appliance-repair) we get across Miami-Dade, Broward, and Palm Beach, and the good news for owners and captains is that an onboard refrigerator is not a mysterious machine. It is a compressor, a condenser, a control, a thermistor, and — on a boat — a DC power path and often a seawater cooling loop. When one runs warm, the fault is almost always in one of those things, and most of them read out at the slip with a meter and a clamp.

Here is how a marine appliance tech actually thinks through a yacht refrigerator that won't cool — so a captain knows what he's paying for before he books.

## Warm box, still running: the condenser and the cooling loop come first

When a marine fridge runs constantly but won't pull temperature down, the compressor is the last suspect, not the first. The machine is making cold; something is stopping it from rejecting heat.

On air-cooled boxes — Vitrifrigo, front-vent Isotherm, U-Line Marine — the condenser lives in a confined locker and cakes with salt and dust until it can't shed heat. We pull and clean it and confirm the box actually breathes; on a surprising number of calls that alone brings the temperature back. On water-cooled units — a Frigoboat keel-cooler, a Sub-Zero marine box, or any seawater-cooled ice head — the cooling comes from a seawater pump and a condenser coil, and either can fail: a clogged raw-water strainer, a dead or weak pump, or a coil scaled up from hard water. We confirm the pump is pulling and the strainer is clear before we ever touch the sealed system.

## The DC power path: read voltage at the compressor, not the panel

This is where marine refrigeration diverges hard from a house fridge, and where a shoreside tech gets lost. Most yacht refrigeration runs on 12 or 24 volts through a Danfoss/Secop BD compressor and an electronic control module, and that module is fussy about voltage. Feed it a sagging house bank, a corroded terminal, an undersized wire run, or a soft ground, and the voltage collapses under start load. The module protects itself with a low-voltage cutout — you hear the compressor click and quit.

So we measure voltage **right at the control module while it tries to start**, not at the distribution panel where it reads fine. We check the house bank under load, the terminals, and the ground. Half the time the "dead fridge" is the boat's electrical system, not the appliance — and telling those two apart is the whole point of calling someone who works on boats. The module also blinks a fault code on its LED; we read it and let it tell us whether the problem is voltage, the module's own fan, the thermistor, or the compressor.

## Runs warm and everything checks out: the sealed system

If the condenser is clean, the cooling loop is good, and the voltage is solid, only then do we look at the sealed system. A Danfoss BD compressor loses efficiency after years, and a slow refrigerant leak leaves the box short of charge so it runs forever and never quite gets there. We read the compressor's current draw against spec and evaluate the system's behavior. Sealed-system work is real work, so we diagnose it plainly and quote it before anyone commits — we don't guess a compressor because it was easier than checking the condenser and the battery first.

## Ice makers and wine columns fail the same way — plus scale

The ice head and the wine drawer on board are the same story with a marine accent. Onboard ice makers scale fast on dock water, so no-ice and soft-cube calls are usually a clogged valve, a tired pump, a harvest fault, or a scaled evaporator — a water-side fix that finishes at the slip. Wine columns drift when a thermistor lies or a door gasket gives up in the humid saloon and the box works against itself. None of it is exotic; it just has to be diagnosed by someone who won't be thrown by the DC feed or the seawater loop.

## Working clean in the joinery

The last part of the job isn't electrical at all. These units are bolted into custom teak-and-holly joinery worth as much as the appliance, in staterooms and galleys where a scratch matters. The craft is pulling and re-seating a box without marking the surround, working discreetly around crew and guests, and leaving the cabinetry the way we found it. If the vessel is professionally run, we coordinate scope and access with the captain and report to the management office.

## When to call us

If your galley refrigerator is running warm, your ice head has quit, or a DC box won't start and the battery bank looks fine, the next step is a dockside diagnostic. We charge a flat **$59 diagnostic**, credited to your repair and paid only if you decline. You get a written quote with part numbers and labor before any work starts, and we tell you honestly whether the fix is the appliance or the vessel's power feeding it. If you're weighing a repair against replacing a built-in unit, our [luxury appliance repair cost guide](/resources/luxury-appliance-repair-cost-guide) lays out cost ranges and a repair-or-replace calculator for the premium brands aboard. Call **(754) 345-4515** and we'll meet you at the slip — Miami Beach, Fort Lauderdale, or Palm Beach.`,
  },
  es: {
    name: "Reparación de Electrodomésticos para Yates y Embarcaciones",
    shortName: "Electrodoméstico Marino",
    seoNoun: "electrodoméstico marino",
    metaTitle: "Reparación de Electrodomésticos de Yate | Miami y Fort Lauderdale",
    metaDescription:
      "Reparación de electrodomésticos de yate en el muelle — refrigeradores Sub-Zero, U-Line, Vitrifrigo, Isotherm, Marvel, vinotecas, máquinas de hielo, cocinas de galera y lavado. Marinas de Miami, Fort Lauderdale y Palm Beach. Diagnóstico de $59, abonado a la reparación. Con licencia y seguro.",
    heroLede: "en el muelle, en las marinas del sur de Florida.",
    longDescription:
      "La galera de un yate funciona con los mismos electrodomésticos de lujo que una casa fina — refrigeración Sub-Zero y U-Line, cajones de vino Marvel, hielo Scotsman y Hoshizaki, lavado Miele y cocinas de inducción o basculantes — pero viven en un mundo más duro: aire salino, humedad constante, vibración en navegación y sistemas de 12/24 voltios de corriente continua o de energía de muelle que un técnico de tierra nunca toca. Atendemos los electrodomésticos a bordo en el muelle, llegando al amarre en Miami Beach, Fort Lauderdale o Palm Beach y trabajando según el horario del capitán y la tripulación. Reparamos refrigeración Vitrifrigo, Isotherm, Frigoboat, Dometic, Norcold, U-Line Marine, Sub-Zero, Marvel y Fisher & Paykel; columnas y cajones de vino; máquinas de hielo en escamas, en cubos y enfriadas por agua de mar; lavavajillas, cocinas y hornos de galera; y lavado compacto Miele y Splendide — diagnosticando en sitio y terminando en la primera visita siempre que la pieza esté en el camión. Coordinamos con el capitán y la gestión del yate, protegemos la ebanistería y trabajamos con discreción.",
    ownerNote: {
      opener: "La galera de un yate es una cocina de lujo que además debe sobrevivir a la sal, la vibración y un sistema eléctrico de corriente continua — así la trato.",
      body:
        "La mayoría de los técnicos de electrodomésticos no pisan un barco. La refrigeración suele funcionar a 12 o 24 voltios con un compresor Danfoss BD en vez de un tomacorriente, el condensador puede enfriarse con agua de mar en lugar de un ventilador, y todo va atornillado en ebanistería de teca a medida que no puedes rayar. Para eso justamente están hechos mis técnicos senior. El electrodoméstico en sí — un cajón Sub-Zero, una nevera Vitrifrigo, una máquina Scotsman — falla igual que en tierra: un compresor cansado, un condensador sucio, un termistor malo, un desagüe tapado. Lo que agrega el ambiente marino es el camino de energía CC, la corrosión y la disciplina de trabajar limpio en un camarote. Llego al amarre, confirmo si es el electrodoméstico o la energía del barco que lo alimenta, y le doy al capitán una respuesta clara y un número real antes de que alguien pida una pieza.",
      closer: "Si su nevera mantiene la temperatura, su máquina suelta cubos limpios y dejo la ebanistería como la encontré, hice bien el trabajo.",
    },
    diagnosisTitle: "Cómo diagnosticamos y reparamos electrodomésticos marinos en el muelle",
    diagnosisIntro:
      "Un refrigerador o una máquina de hielo a bordo son el mismo compresor, condensador, control y desagüe que hallaría en tierra — más un giro marino: un compresor CC, un condensador enfriado por agua de mar y un ambiente salino. Probamos la cadena en orden con un multímetro y confirmamos primero la energía del barco, para que reciba un diagnóstico real, no una suposición y un pedido de piezas.",
    commonIssues: [
      "El refrigerador o congelador no mantiene la temperatura — trabaja caliente en navegación o en el muelle",
      "La nevera CC no arranca o cicla en corto (compresor Danfoss/Secop BD de 12V/24V)",
      "La máquina de hielo dejó de producir, hace cubos blandos o huecos, o no cosecha",
      "La vinoteca se desvía de su temperatura o se congela",
      "Condensador enfriado por agua sucio o bomba sin circular — sobrecalentamiento del lado alto",
      "El lavavajillas de galera no desagua, no llena o no calienta",
      "La cocina de inducción, a gas o basculante no enciende o no calienta",
      "La lavadora/secadora compacta (Miele, Splendide) no desagua, no centrifuga o no seca",
      "Corrosión, sal acumulada o mal olor tras tiempo cerrada en el muelle",
    ],
    failureModes: [
      {
        symptom: "La nevera funciona pero no enfría — el refrigerador o congelador queda caliente",
        cause:
          "En la refrigeración marina los dos sospechosos principales son el sistema sellado y el condensador. Las neveras enfriadas por aire (Vitrifrigo, Isotherm de rejilla frontal, U-Line Marine) ensucian sus aletas de condensador con sal y polvo en el compartimento cerrado donde están montadas, así que el compresor no puede disipar calor y la nevera sube. Las unidades enfriadas por agua (Frigoboat de quilla, Sub-Zero marino, hielo por agua de mar) pierden enfriamiento cuando falla la bomba de agua de mar, se tapa el filtro o se incrusta el serpentín. Debajo de cualquiera de los dos, el compresor Danfoss/Secop BD puede perder eficiencia con los años, o el sistema puede quedar bajo de carga por una fuga lenta.",
        fix:
          "Revisamos primero las causas marinas obvias — limpiamos e inspeccionamos el condensador, confirmamos que la bomba de agua de mar succiona y que el filtro está limpio, y verificamos el flujo de aire a la nevera. Ponemos una pinza amperimétrica en el compresor y leemos su consumo y su arranque contra especificación, y revisamos los termistores. Un condensador sucio o una bomba muerta se arreglan en la misma visita; un compresor genuinamente débil o una fuga de refrigerante los diagnosticamos y cotizamos antes de tocar el sistema sellado.",
      },
      {
        symptom: "La nevera CC no arranca, chasquea o cicla en corto",
        cause:
          "La refrigeración marina de CC vive o muere por el voltaje limpio. Un compresor Danfoss/Secop BD35 o BD50 necesita voltaje adecuado en el módulo de control electrónico; un banco de baterías bajo o que cae, un terminal corroído, un cableado subdimensionado o viejo, o una tierra floja hacen caer el voltaje bajo la carga de arranque y el módulo corta por bajo voltaje — lo escucha chasquear y rendirse. El ventilador del módulo, el termostato o el módulo mismo también pueden fallar y parpadear un código en su LED.",
        fix:
          "Medimos el voltaje justo en el módulo de control del compresor mientras intenta arrancar, no solo en el panel — la mitad de estas llamadas son la energía del barco, no la nevera. Revisamos el voltaje del banco bajo carga, los terminales y la tierra, y leemos el código de parpadeo del módulo. Una falla de cableado o conexión la limpiamos y corregimos; un módulo de control o un compresor fallado lo identificamos por su patrón de falla y lo cotizamos con la pieza exacta. Le decimos con claridad cuándo el arreglo es el electrodoméstico y cuándo es el sistema eléctrico de la embarcación.",
      },
      {
        symptom: "La máquina de hielo se detuvo, o hace cubos blandos, huecos o turbios",
        cause:
          "Las máquinas de hielo a bordo (Scotsman, Hoshizaki, U-Line Marine, Dometic) trabajan duro y se incrustan rápido con el agua del muelle. Una máquina detenida suele ser una válvula o línea de agua tapada, una bomba de agua fallada o una falla del ciclo de cosecha; los cubos blandos o huecos indican bajo flujo de agua, un evaporador sucio o un problema de refrigeración/carga; el hielo turbio o lento apunta a incrustación y un sistema sucio. Las máquinas enfriadas por agua de mar suman las mismas fallas de enfriamiento que las neveras — una bomba débil o un condensador incrustado.",
        fix:
          "Rastreamos primero el lado del agua — válvula de entrada, bomba y líneas — luego el mecanismo de cosecha y el evaporador, y descalcificamos el paso de agua donde el agua del muelle lo ha incrustado. En cabezales enfriados por agua de mar confirmamos el circuito de enfriamiento. La mayoría de las llamadas de falta de hielo o mal hielo son flujo de agua, incrustación o una falla de cosecha y terminan en la primera visita; una falla del sistema sellado la diagnosticamos y cotizamos.",
      },
      {
        symptom: "La vinoteca se desvía de temperatura o se escarcha",
        cause:
          "Las columnas y cajones de vino a bordo (Sub-Zero, Marvel, U-Line, EuroCave) luchan contra la humedad y el desgaste del sello de puerta en el ambiente marino. Una temperatura que se desvía suele ser un termistor fallado que da una lectura falsa al control, un compresor o ventilador cansado, o una junta de puerta que ya no sella en el salón húmedo y la nevera trabaja contra sí misma. La escarcha o el hielo en el serpentín apuntan a una falla de descongelamiento o, de nuevo, a un sello con fuga que mete aire húmedo.",
        fix:
          "Verificamos la temperatura real del gabinete contra el punto fijado con una sonda, probamos el termistor y el ventilador del evaporador, e inspeccionamos el sello y las bisagras de la puerta. Un sensor desviado o un ventilador fallado se cambia y se verifica; una junta endurecida se reemplaza para que la nevera aguante contra la humedad. Confirmamos que el gabinete se mantenga en su punto fijado antes de cerrar.",
      },
      {
        symptom: "El lavavajillas de galera no desagua, no llena o no calienta",
        cause:
          "Los lavavajillas de galera compactos y de tamaño completo (Miele, Bosch, Fisher & Paykel de cajón) fallan igual que en tierra — una bomba o filtro de desagüe tapados, una válvula de entrada fallada, una resistencia o control malos — pero el barco agrega dos matices: el desagüe puede ir a un sumidero o una bomba de achique que es el verdadero tapón, y la unidad puede alimentarse del agua presurizada de la embarcación y de energía de muelle/inversor. El sello y el mecanismo de la tapa de un lavavajillas de cajón también se desgastan.",
        fix:
          "Limpiamos y probamos la bomba y el filtro de desagüe, confirmamos que el desagüe y el sumidero del barco no sean el bloqueo real, y revisamos la válvula de entrada, la resistencia y el control. En las unidades Fisher & Paykel DishDrawer atendemos el sello y el motor de la tapa. Verificamos un ciclo completo — llenar, calentar, lavar, desaguar — antes de darlo por terminado.",
      },
      {
        symptom: "La cocina u horno no enciende ni calienta — inducción, gas o cocina basculante",
        cause:
          "La cocina de galera abarca de todo: inducción Miele y Wolf, quemadores de gas sellados y cocinas marinas basculantes (Force 10, Kenyon). Una placa de inducción que no calienta suele ser una placa de potencia fallada, una bobina agrietada o una falla de detección de olla/sensor. Un quemador de gas que no enciende es un encendedor, un orificio sucio o una válvula/termopar de seguridad fallado. Una cocina basculante que no bascula o un quemador cuya seguridad no se mantiene encendida es un problema mecánico o de termopar propio de la unidad marina.",
        fix:
          "Para inducción probamos la placa, la bobina y los sensores y reemplazamos la etapa fallada. Para gas limpiamos o reemplazamos el encendedor y el orificio y verificamos que el termopar de seguridad mantenga la válvula abierta. En cocinas basculantes liberamos y atendemos el balancín y el dispositivo de corte por falla de llama. Confirmamos que cada elemento o quemador encienda y se mantenga antes de irnos.",
      },
      {
        symptom: "La lavadora o secadora compacta no desagua, no centrifuga o no seca",
        cause:
          "El lavado a bordo suele ser una Miele compacta, una combinada lavadora-secadora Splendide o un par apilado. Un no-desagua o no-centrifuga es típicamente una bomba o filtro tapados, un problema de desagüe o sumidero del lado del barco, una bomba fallada o una falla del bloqueo de puerta. Una combinada que lava pero no seca suele ser una falla de ventilación o de secado por condensación, una resistencia o un termostato. La vibración en navegación también afloja conexiones y desgasta la suspensión.",
        fix:
          "Limpiamos y probamos la bomba y el filtro de desagüe, confirmamos el desagüe de la embarcación y revisamos el bloqueo de puerta y el control. En unidades combinadas Splendide y Miele probamos la resistencia, el termostato y el circuito de secado por condensación. Corremos un ciclo completo y confirmamos que desagua, centrifuga y seca antes de cerrar.",
      },
    ],
    faqs: [
      {
        question: "¿Van al barco o hay que sacarlo del agua?",
        answer:
          "Vamos al barco. Trabajamos en el muelle, en el amarre — Miami Beach Marina, las marinas de Fort Lauderdale y Las Olas, Bahia Mar, Pier Sixty-Six y las marinas de Palm Beach — así que el electrodoméstico se repara en el lugar. No hay que mover la embarcación ni sacar la unidad del barco, salvo que una reconstrucción del sistema sellado realmente lo exija, y eso se lo decimos de entrada.",
      },
      {
        question: "¿Qué electrodomésticos y marcas a bordo atienden?",
        answer:
          "Refrigeración y congeladores (Sub-Zero, U-Line Marine, Vitrifrigo, Isotherm, Frigoboat, Dometic, Norcold, Marvel, Fisher & Paykel), vinotecas y cajones de vino, máquinas de hielo (Scotsman, Hoshizaki, U-Line, Dometic — incluidas las enfriadas por agua de mar), lavavajillas de galera (Miele, Bosch, Fisher & Paykel DishDrawer), cocinas de inducción y gas y hornos, incluidas cocinas marinas basculantes (Wolf, Miele, Force 10, Kenyon), y lavado compacto (Miele, Splendide). Son las plataformas que vemos en los yates del sur de Florida y las piezas que llevan nuestros camiones y proveedores.",
      },
      {
        question: "¿Pueden trabajar con refrigeración marina de 12 y 24 voltios CC?",
        answer:
          "Sí. La refrigeración marina de CC construida sobre compresores Danfoss/Secop BD y módulos de control electrónico es parte central de este trabajo, y es justamente lo que un técnico de tierra no está equipado para diagnosticar. Medimos el voltaje en el módulo de control bajo la carga de arranque, leemos los códigos de falla del módulo y separamos una falla del electrodoméstico de un problema del banco de baterías, del cableado o de la tierra de la embarcación — para que no pague por reemplazar un compresor cuando el problema real es un terminal corroído o una batería baja.",
      },
      {
        question: "¿Coordinan con capitanes y empresas de gestión de yates?",
        answer:
          "De forma rutinaria. Programamos según el calendario de la tripulación y de chárter, coordinamos el acceso y el alcance con el capitán o la empresa de gestión, entregamos un diagnóstico y presupuesto por escrito para sus registros, y mantenemos el trabajo discreto y limpio. Para una flota gestionada podemos facturar y reportar a través de la oficina de gestión.",
      },
      {
        question: "¿Cuánto cuesta el diagnóstico en el muelle?",
        answer:
          "Nuestra visita de diagnóstico es una tarifa fija de $59, abonada a la reparación — así que solo la paga si decide no continuar. Recibe un presupuesto firme por escrito con piezas y mano de obra antes de comenzar. Sin tarifa de diagnóstico adicional, sin ventas forzadas.",
      },
    ],
  },
};
