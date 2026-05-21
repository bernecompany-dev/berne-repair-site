export type FAQ = { question: string; answer: string };

export const GENERAL_FAQS: FAQ[] = [
  {
    question: "How much does a service call cost?",
    answer:
      "$59. That covers the trip and a full diagnosis. If you go ahead with the repair, the service call fee is applied toward the total cost.",
  },
  {
    question: "Do you offer same-day appliance repair?",
    answer:
      "Yes. Call us before noon and in most cases we can have a technician at your door the same day across Miami-Dade, Broward, and Palm Beach.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. Berne Appliance Repair is fully licensed and insured to operate in the state of Florida. We carry general liability so your home and equipment are protected.",
  },
  {
    question: "Which brands do you service?",
    answer:
      "All major residential and commercial brands — including premium lines like Sub-Zero, Wolf, Viking, Thermador, Miele, and GE Monogram, plus everyday brands like LG, Samsung, Whirlpool, KitchenAid, and Bosch.",
  },
  {
    question: "What kind of warranty do you offer?",
    answer:
      "90-day warranty on labor and parts we install. If the same issue reappears within 90 days, we return at no charge.",
  },
  {
    question: "Do you repair commercial appliances?",
    answer:
      "Yes. We service restaurants, property management companies, and retail — including past work with Target, Publix, and Petco. Ask about volume contracts.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Cash, all major credit cards, Apple Pay, Google Pay, and Zelle. We email a receipt after every job.",
  },
  {
    question: "Will the technician have the part in their truck?",
    answer:
      "For the most common parts — yes. With 18 technicians and trucks stocked for the brands we service most, we resolve a large share of jobs on the first visit. If a part needs ordering we typically get it in 1–3 business days.",
  },
];

export const GENERAL_FAQS_ES: FAQ[] = [
  {
    question: "¿Cuánto cuesta una visita técnica?",
    answer:
      "$59. Cubre el viaje y un diagnóstico completo. Si decide proceder con la reparación, esos $59 se aplican al costo total.",
  },
  {
    question: "¿Ofrecen servicio el mismo día?",
    answer:
      "Sí. Llame antes del mediodía y en la mayoría de los casos tenemos un técnico en su puerta el mismo día — en Miami-Dade, Broward y Palm Beach.",
  },
  {
    question: "¿Tienen licencia y seguro?",
    answer:
      "Sí. Berne Appliance Repair tiene licencia completa y seguro para operar en el estado de Florida. Tenemos seguro de responsabilidad general que protege su hogar y equipo.",
  },
  {
    question: "¿Qué marcas reparan?",
    answer:
      "Todas las marcas residenciales y comerciales principales — incluyendo líneas premium como Sub-Zero, Wolf, Viking, Thermador, Miele y GE Monogram, además de marcas comunes como LG, Samsung, Whirlpool, KitchenAid y Bosch.",
  },
  {
    question: "¿Qué tipo de garantía ofrecen?",
    answer:
      "Garantía de 90 días en mano de obra y piezas que instalamos. Si el mismo problema vuelve dentro de 90 días, regresamos sin costo.",
  },
  {
    question: "¿Reparan electrodomésticos comerciales?",
    answer:
      "Sí. Servimos restaurantes, administradores de propiedades y retail — incluyendo trabajo previo con Target, Publix y Petco. Pregunte por contratos de volumen.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Efectivo, todas las tarjetas de crédito principales, Apple Pay, Google Pay y Zelle. Enviamos recibo por correo después de cada trabajo.",
  },
  {
    question: "¿El técnico tendrá la pieza en su camión?",
    answer:
      "Para las piezas más comunes — sí. Con 17 técnicos y camiones equipados para las marcas que más servimos, resolvemos una gran parte de los trabajos en la primera visita. Si hay que pedir una pieza, normalmente la tenemos en 1-3 días hábiles.",
  },
];

export const SERVICE_FAQS_ES: Record<string, FAQ[]> = {
  "refrigerator-repair": [
    {
      question: "Mi refrigerador está caliente pero el congelador está frío. ¿Qué pasa?",
      answer:
        "Lo más común es un ventilador del evaporador fallado, flujo de aire bloqueado, o problema con el sistema de descongelado. Nuestro técnico diagnosticará en sitio y cotizará antes de empezar.",
    },
    {
      question: "¿Vale la pena reparar un Sub-Zero o debería reemplazarlo?",
      answer:
        "Casi siempre vale la pena reparar. Las unidades Sub-Zero están diseñadas para 20+ años de servicio — reemplazar una cuesta $10K-$20K, mientras que la mayoría de reparaciones quedan entre $200-$800. Le daremos una evaluación honesta.",
    },
    {
      question: "¿Reparan refrigeradores empotrados y de columna?",
      answer:
        "Sí — incluyendo Sub-Zero empotrados, columnas integradas, Thermador Freedom, Miele MasterCool, y Viking Professional.",
    },
  ],
};

export const SERVICE_FAQS: Record<string, FAQ[]> = {
  "refrigerator-repair": [
    {
      question: "My fridge is warm but the freezer is cold. What's wrong?",
      answer:
        "Most often this is a failed evaporator fan, blocked airflow, or a defrost system issue. Our technician will diagnose on-site and quote the repair before any work starts.",
    },
    {
      question: "Is it worth repairing a Sub-Zero or should I replace it?",
      answer:
        "Almost always worth repairing. Sub-Zero units are designed for 20+ years of service — replacing one costs $10K–$20K, while most repairs fall in the $200–$800 range. We'll give you an honest assessment.",
    },
    {
      question: "Do you fix built-in and column refrigerators?",
      answer:
        "Yes — including Sub-Zero built-ins, integrated columns, Thermador Freedom, Miele MasterCool, and Viking Professional.",
    },
    {
      question: "What's the difference between a service call and a diagnostic?",
      answer:
        "Same thing in our shop — $59 flat. It covers travel, full diagnosis, and a written quote on the repair. Approve the work and the $59 is credited toward the total. Decline and you owe only the $59.",
    },
    {
      question: "Why is my Sub-Zero ice maker not making ice anymore?",
      answer:
        "On 600 and 700-series Sub-Zero built-ins the ice maker pivot bushings dry out and bind, the optic emitter and receiver get dusty, or the water inlet valve solenoid sticks. We carry the Sub-Zero pivot kit on the truck for the common pre-2017 models. Newer 7000-series units use a different harvest module that we order as needed.",
    },
    {
      question: "How long does a refrigerator repair usually take?",
      answer:
        "Most repairs finish on the first visit in 45 to 90 minutes once the diagnostic is done. Sealed-system work (compressors, condensers, evaporators) is a longer call — typically 2 to 4 hours and requires EPA-certified refrigerant handling. Built-in Sub-Zero and Thermador work sometimes runs to a second visit because the part has to come from the factory channel.",
    },
    {
      question: "Why is water pooling under the produce drawers?",
      answer:
        "The defrost drain at the back of the freezer floor has frozen over with ice and food residue. Water from the normal defrost cycle has nowhere to go, overflows the drain pan, and runs forward. A 30-minute fix in most cases — we clear the drain with hot water and install a copper drain clip so it does not recur.",
    },
    {
      question: "Do you service Viking refrigerators and built-ins?",
      answer:
        "Yes. Viking VCBB, VCFF, and VRI-series built-ins are part of our regular service mix and we carry the common Viking parts — evaporator fan motors, defrost heaters, ice maker assemblies, and door gaskets. Senior technicians handle Viking calls because the platform has its own service quirks separate from Sub-Zero.",
    },
    {
      question: "What is the loud humming sound from the back of my fridge?",
      answer:
        "Almost always the condenser fan motor with dry bearings, or a piece of debris (cardboard, paper, on patio units sometimes a gecko) hitting the fan blade. On built-in Sub-Zero 600 and 700-series the condenser fan sits up top and is easy to overlook. We pull the back grille, inspect, lubricate or replace, and clear the condenser coil on the same visit.",
    },
    {
      question: "My fridge keeps cycling on and off every couple minutes. Why?",
      answer:
        "Usually a failing thermistor giving the control board a wildly fluctuating temperature reading — the board reacts by short-cycling the compressor. Less common is a low refrigerant charge causing the compressor to short-cycle on the overload protector. Thermistor swaps are 20-minute jobs; sealed-system work is an EPA-certified call and quoted separately.",
    },
    {
      question: "How much should I budget for a Sub-Zero compressor failure?",
      answer:
        "Compressor replacement on a Sub-Zero built-in runs $1,400 to $2,400 all-in including the part, EPA refrigerant work, and labor. On older 500-series and 600-series units with R-134a the part cost is reasonable; newer 7000-series with R-600a refrigerant adds a premium. We always quote in writing before opening the sealed system.",
    },
  ],
  "washer-repair": [
    {
      question: "Why does my front-loader smell musty even after running empty cycles?",
      answer:
        "Biofilm has built up in the gasket folds, the dispenser drawer, and behind the drum baffle. Empty hot cycles help but rarely fix it on their own. We can pull and clean the dispenser, deep-clean the gasket, and recommend a habit change — hot maintenance cycle weekly, door and drawer left open between loads. Stubborn cases need the tub lifted for a full clean, which is a separate visit.",
    },
    {
      question: "My washer drum thumps and walks across the floor on spin. What is it?",
      answer:
        "Suspension rods on top-load HE washers or shock absorbers on front-loaders have lost damping after 5 to 8 years. They wear together so we replace all four as a set — replacing only one fails again in months. On older Maytag and Whirlpool top-loaders the spider arm sometimes cracks and the basket itself needs replacing. We quote both honestly.",
    },
    {
      question: "What does a UE error code mean on my Samsung or LG front-loader?",
      answer:
        "UE means the drum could not balance the load during the spin ramp-up. First step is redistributing laundry — heavy towels and rugs spread evenly. If UE keeps coming back on normal loads, the suspension or shocks have failed and need replacement. On older units a bad hall sensor on the drive motor can also throw UE codes.",
    },
    {
      question: "Why are my clothes still soaking wet after the spin cycle?",
      answer:
        "Drain pump partial blockage (water leaving slowly so the spin starts under partial load) or the spin speed is not hitting max RPM because the hall sensor on the motor has drifted or the drive belt is worn on belted models. We diagnostic-spin in service mode and measure actual RPM. Belt swaps are 30 minutes on most front-loaders; hall sensors are similar.",
    },
    {
      question: "Do you fix Miele and Asko premium washers?",
      answer:
        "Yes. Miele W1, W3000, and PW-series plus Asko W6 and W8 lines are in our regular service mix. Premium European washers are senior-tech work — they use different door interlock circuits, different drain pumps, and different control panel diagnostics than the mainstream brands. Parts often order in 2 to 4 business days because they come from the East-Coast distribution channel.",
    },
    {
      question: "How much does a washer drain pump replacement cost?",
      answer:
        "Drain pump replacement on mainstream brands runs $240 to $340 all-in including the part, labor, and the $59 diagnostic credit. Bosch, Miele, and Asko pump jobs sit at $340 to $480 because of the parts cost. Most calls finish on the first visit when the pump is a stocked truck item — LG, Samsung, Whirlpool, and Maytag all are.",
    },
    {
      question: "Why won't my washer fill with water?",
      answer:
        "Three common causes: inlet valve screens are clogged with sediment (very common in older South Florida buildings with iron supply pipes), the inlet valve solenoid is burned out and not opening on a fill command, or the pressure switch hose is kinked and the machine thinks the tub is already full. We test all three on a $59 service call.",
    },
    {
      question: "Are stacked washer-dryer units harder to service?",
      answer:
        "They take more access labor because the dryer often has to come off the washer for serious washer repairs — drum bearings, tub seals, and pump deep cleans. The diagnostic flow is the same. We quote the extra labor up front on stacked calls. Common stacked units: Whirlpool Duet, Maytag Maxima, LG WashTower, Samsung 27-inch.",
    },
    {
      question: "How long should a washing machine last?",
      answer:
        "Mainstream front-loaders run 10 to 12 years; top-loaders with agitators often hit 14 to 18 years before bearings or transmissions retire them. Speed Queen and Miele commonly hit 18 to 22 years. South Florida hard water shortens that range slightly — gaskets and inlet valve screens fail earlier here. Regular descaling and gasket wipe-downs add 2 to 4 years.",
    },
  ],
  "dryer-repair": [
    {
      question: "Why is my dryer not heating but the drum still turns?",
      answer:
        "On electric dryers the heating element has burned open or the thermal fuse blew because the exhaust vent is restricted. On gas dryers the igniter has cracked (a 5 to 8 year wear part), the gas valve coils have failed, or the flame sensor is dirty. We ohm-test the element and check vent flow on every no-heat call — fixing the heat without clearing the vent just burns out the new part.",
    },
    {
      question: "How often should the dryer vent be cleaned?",
      answer:
        "Every 18 to 24 months on a normal household; annually if you run more than 6 loads a week or have a long roof-vented duct run. Lint buildup downstream of the lint trap is the number-one cause of dryer fires and doubles your dry times. We power-vacuum the full duct path with HEPA equipment on the same visit as a repair call.",
    },
    {
      question: "Why is my dryer taking three cycles to dry one load?",
      answer:
        "In nine out of ten cases the exhaust vent is restricted somewhere downstream of the unit — in the wall duct or at the roof termination. Long exterior runs in older South Florida homes accumulate years of lint buildup. The heating element itself is fine; the dryer simply cannot exhaust moist air fast enough to dry the load.",
    },
    {
      question: "Should I worry if my dryer smells like something is burning?",
      answer:
        "Yes — stop using it immediately and unplug the unit. The most likely cause is lint buildup in the cabinet around the heating element or motor, which is the number-one cause of dryer fires. Less commonly a failing drum bearing creates metal-on-metal contact. Call us same-day at (754) 345-4515 for safety.",
    },
    {
      question: "What is the loud squealing sound when my dryer runs?",
      answer:
        "Dry idler-pulley bearing or worn drum support rollers — both are 45-minute swaps with parts that stock on the truck for Whirlpool, Maytag, GE, LG, and Samsung. On the 27-inch Whirlpool and Maytag platform the drum glides under the front bulkhead also wear through and need replacing as a kit. We diagnose by spinning everything by hand with the cabinet open.",
    },
    {
      question: "Do you service Miele and Bosch heat-pump dryers?",
      answer:
        "Yes. Miele T1 and Bosch 800-series heat-pump dryers are increasingly common in South Florida condos that cannot vent to exterior. Heat-pump diagnostics are senior-tech work — the refrigerant circuit, condenser fins, and lint filter are all different from a conventional dryer. We carry the Miele tech manual and the most common Miele parts on the senior truck.",
    },
    {
      question: "Why does my gas dryer click but not light?",
      answer:
        "The igniter is glowing but the gas valve coils are not opening, the igniter has fractured silicon carbide and is not glowing at all, or the flame sensor is dirty and is not confirming flame. We ohm-test the coils (each should read 1300 to 1500 ohms cold) and replace coils as a pair, never individually. Igniters stock for Whirlpool, Maytag, GE, and Samsung gas units.",
    },
    {
      question: "How much does dryer repair cost on average?",
      answer:
        "Most repairs run $160 to $380 in parts and labor. Heating elements and thermal fuses are on the lower end; control boards and motor replacements sit at the upper end. Heat-pump dryer repairs (Miele, Bosch) run higher because of part cost. The $59 service call is credited toward any approved repair.",
    },
    {
      question: "Is it worth fixing a 12-year-old dryer?",
      answer:
        "On commodity brands like Whirlpool, Maytag, GE, and Samsung — depends on the failure. Cheap fixes like elements, thermal fuses, belts, rollers, and igniters are almost always worth it. A failed control board on a 12-year-old commodity dryer often is not. Speed Queen and Miele dryers are almost always worth repairing because the drums, motors, and cabinets outlast any replacement.",
    },
  ],
  "dishwasher-repair": [
    {
      question: "Why is there standing water at the bottom of my dishwasher tub?",
      answer:
        "Drain pump impeller is obstructed by broken glass, label adhesive, or food debris; the drain hose loop is kinked; or — very common — the garbage disposal knock-out plug was never removed during a disposal install. The dishwasher will never drain until that plug is out. We check all three on a $59 diagnostic.",
    },
    {
      question: "What does a Bosch E15 error code mean?",
      answer:
        "E15 is the Bosch leak-detection float telling you water has collected in the base pan under the unit. Resetting the float without finding the leak just buys you a day or two — we open the unit, dye-test the supply connections, inlet valve, and pump seal, and fix the actual leak source. Most E15 calls finish on the first visit.",
    },
    {
      question: "Why are my dishes still gritty after a full cycle?",
      answer:
        "Spray arms are clogged with hard-water scale (very common in South Florida), the chopper or macerator blade has failed and food particles are recirculating, or the wash temperature is not reaching 130 degrees Fahrenheit because the heating element has failed open. We test all three on a service call. Chopper kits stock for Whirlpool and KitchenAid Tall Tub platforms.",
    },
    {
      question: "Do you service Miele dishwashers?",
      answer:
        "Yes. Miele G5000, G6000, G7000, and the older Optima G2000 lines are part of our regular service mix. Miele uses heat-pump drying systems and brushless DC circulation pumps that are different from mainstream brands. Senior technicians handle Miele calls and we carry the most common Miele parts on the senior truck.",
    },
    {
      question: "Why won't my dishwasher start when I press the button?",
      answer:
        "Door latch microswitch has failed (the unit does not think the door is closed), the ribbon cable from the user-interface board to the main control board has corroded, or a thermal fuse on the control board has blown. Latch assemblies are stock items for high-volume brands. Control board thermal fuse is re-solderable on some Whirlpool boards.",
    },
    {
      question: "How much does a dishwasher heating element replacement cost?",
      answer:
        "Heating element replacement on Whirlpool, KitchenAid, GE, and Maytag dishwashers runs $190 to $280 all-in including the part, labor, and the $59 diagnostic credit. Bosch and Miele use heat-pump drying with no traditional element — those repairs are different and we quote separately. The signature symptom is dishes still warm but the cycle never finishes.",
    },
    {
      question: "Why does my dishwasher leak from the door?",
      answer:
        "Door gasket has a flat spot or tear (common after 6 to 10 years), or the inlet valve is dribbling past its shutoff and overfilling the tub so water spills over the door seal during the wash phase. We dye-test the gasket and inlet valve to isolate. Gasket swaps are quick; inlet valves are model-specific and stock for Whirlpool, KitchenAid, GE, and Bosch.",
    },
    {
      question: "Should I repair or replace a 10-year-old dishwasher?",
      answer:
        "On mainstream brands depends on the failure. Cheap fixes like door latches, gaskets, inlet valves, and choppers are almost always worth doing. A failed circulation pump or main control board on a 10-plus year old commodity dishwasher often is not. On Bosch and Miele — almost always worth repairing because the heat-pump drying systems and stainless tubs are designed for 15-plus years.",
    },
    {
      question: "Do you handle dishwasher install when we replace?",
      answer:
        "Yes — supply line, drain hookup, electrical, leveling, and door-spring tension setup. We also haul away the old unit on the same visit. Install runs $185 to $260 depending on whether the under-sink plumbing needs new shutoffs or a fresh dishwasher tailpiece on the garbage disposal. Built-in panel-ready units (Bosch Benchmark, Miele) take longer and we quote those separately.",
    },
  ],
  "oven-repair": [
    {
      question: "Why is my Wolf oven temperature off by 30 or 40 degrees?",
      answer:
        "On Wolf the platinum RTD oven sensor can drift up to 50 degrees Fahrenheit either way after 6 to 10 years of use. We verify the actual cavity temperature with a calibrated digital probe and either swap the sensor or recalibrate via the service mode — whichever the unit needs. Wolf calibration is reversible so we always document the as-found offset.",
    },
    {
      question: "Why won't my Viking oven door unlock after self-clean?",
      answer:
        "The latch motor that drives the lock cam has burned out, or the cam itself has stripped from the heat of a self-clean cycle. On Viking VESO and VDSO wall ovens we replace the door latch assembly as a unit — typically a 60 to 90 minute job. Sometimes a thermal limit switch in the latch circuit has opened and that is a separate fix.",
    },
    {
      question: "My gas oven won't light but the burner clicks — what is wrong?",
      answer:
        "The bake igniter has weakened with age and is no longer pulling enough current to open the gas safety valve. This is the most common gas oven failure — igniters are a 5 to 8 year wear part. We amp-clamp the igniter circuit during a cold start: a good igniter draws 3.2 to 3.6 amps; a weak one reads 2.5 amps or below and will not open the valve. 30-minute swap.",
    },
    {
      question: "Do you fix Thermador Pro Grand and Pro Harmony ovens?",
      answer:
        "Yes. Thermador Pro Grand 48-inch, 60-inch, and Pro Harmony 30-inch and 36-inch ranges are all in our regular service mix. Senior technicians handle Thermador calls because the platform uses German tech-sheet conventions and has different ignition module wiring than the mainstream brands. We carry the Thermador tech manuals on the senior truck.",
    },
    {
      question: "What does an F2 or F3 error code mean on my oven?",
      answer:
        "On Whirlpool and KitchenAid, F2 is a stuck key on the touch panel and often clears by replacing the membrane overlay alone — no board swap needed. F3 is the oven sensor reading open and is a 20-minute sensor replacement. F4 is the sensor shorted. F1 is a control board ROM error and we order direct from the OEM channel.",
    },
    {
      question: "Why is my convection fan making a loud grinding sound?",
      answer:
        "Convection fan motor bearings have failed after 6 to 10 years of continuous use. The convection element behind the fan often degrades at the same time because both are downstream of the rear bake circuit. We pull the rear cavity cover (door off for full access), swap the fan motor, and quote the element as a separate decision. Premium brand motors usually 1 to 3 day order.",
    },
    {
      question: "How much does Wolf or Viking oven repair cost?",
      answer:
        "Premium oven repairs (Wolf, Viking, Thermador, Miele) typically run $320 to $720 in parts and labor. Igniters, sensors, door hinges, and bake elements are on the lower end; control boards, latch assemblies, and convection motors sit at the upper end. The $59 service call is credited toward the approved repair.",
    },
    {
      question: "Is it worth repairing a 15-year-old Wolf or Viking oven?",
      answer:
        "Almost always yes. Wolf, Viking, Thermador, and Miele ovens are built for 20-plus year service lives and the cavity, burners, hinges, and grate hardware will outlast any commodity replacement. Even a $700 control board repair makes sense against a $4,000-plus new unit. We give the honest call on a $59 diagnostic.",
    },
    {
      question: "Why won't my wall oven heat evenly?",
      answer:
        "Uneven baking is usually a bake element that has a hot spot but is not drawing full amperage (visual: it glows dimly or unevenly), or the oven cavity sensor has drifted out of spec. Less commonly the convection fan or convection element is failing on combination convection ovens. We ohm-test all three and replace whichever is bad.",
    },
  ],
  "microwave-repair": [
    {
      question: "Why is my microwave running but not heating food?",
      answer:
        "The magnetron has failed — it is the part that generates the microwave energy and it is a wear item with a 7 to 10 year typical life. Symptoms are exactly what you described: turntable spins, lights work, fan runs, but food stays cold. Magnetron replacement is $250 to $420 depending on brand. On a unit older than 10 years we will tell you straight whether replacement makes more sense.",
    },
    {
      question: "Do you service Wolf and Sharp microwave drawers?",
      answer:
        "Yes. Sharp KB6 series, Wolf MD30, and Thermador MD24 microwave drawers are part of our regular service mix. Drawer units have a more complex track and door system than over-the-range units and we send senior technicians on those calls. Parts often order in 2 to 4 business days because they are brand-specific.",
    },
    {
      question: "My microwave is sparking inside — is that dangerous?",
      answer:
        "Yes — stop using it immediately. Internal sparking is almost always a damaged waveguide cover (the small mica or plastic panel inside, easily replaced) or a failing magnetron arcing to ground. Less commonly it is metal contamination on the cavity walls. Continued use damages the magnetron permanently. Call us same-day for a $59 diagnostic.",
    },
    {
      question: "How much does over-the-range microwave install cost?",
      answer:
        "Over-the-range install runs $195 to $295 depending on whether the wall mounting plate needs reinforcement or new exhaust ducting is required. Includes electrical hookup, mounting bracket alignment, and exhaust vent connection (recirculating or ducted). We haul away the old unit on the same visit at no extra charge.",
    },
    {
      question: "Why is my microwave touch panel unresponsive?",
      answer:
        "Most common cause is a failed membrane keypad — the conductive contacts behind the buttons wear out after 8 to 12 years of use. Less common is a control board failure where the main board no longer reads the keypad input. Membrane swaps are quicker and cheaper at $180 to $260 all-in. We diagnose which it is on a service call.",
    },
    {
      question: "Why does my microwave turntable not spin?",
      answer:
        "Three usual suspects: the turntable motor below the cavity floor has failed (the most common cause), the roller guide ring under the glass tray is missing or broken, or the coupler that connects the motor shaft to the tray is cracked. All three are inexpensive fixes — motors stock for GE, Whirlpool, Samsung, LG, and Sharp.",
    },
    {
      question: "How long should a built-in microwave last?",
      answer:
        "Countertop microwaves typically run 7 to 10 years. Over-the-range and built-in models last 10 to 15 years because they get less rough handling and are usually cooled by a real exhaust fan. Magnetrons are the limiting part — once they go, the math on a $300-plus repair against a $500 replacement gets close on commodity brands.",
    },
    {
      question: "Can you replace a built-in microwave with a different brand?",
      answer:
        "Sometimes — depends on the cabinet cutout dimensions and the trim kit availability. We measure on a service call before ordering anything. GE Profile, KitchenAid, and Whirlpool built-ins often share cutout dimensions; Sharp and Wolf drawer units have unique cutouts that limit cross-brand swaps. Trim kits run $120 to $280.",
    },
  ],
  "ice-maker-repair": [
    {
      question: "Why is my Sub-Zero ice maker not making ice?",
      answer:
        "On 600 and 700-series Sub-Zero built-ins the pivot bushings dry out and bind the ice maker module, the optic emitter and receiver get dusty, or the water inlet valve solenoid sticks. We carry the Sub-Zero pivot kit on the truck for the common pre-2017 models. Newer 7000-series units use a different harvest module that we order as needed. Most calls finish on the first visit.",
    },
    {
      question: "Do you fix stand-alone ice makers like Scotsman and U-Line?",
      answer:
        "Yes. Scotsman, U-Line, Manitowoc, Hoshizaki residential, and Marvel stand-alone ice makers are all in our regular service mix. These are senior-tech calls because the sealed-system work follows EPA refrigerant handling protocols. We hold EPA Section 608 Universal certification and document refrigerant recovery on every system that opens.",
    },
    {
      question: "Why is my ice cloudy or tasting bad?",
      answer:
        "Cloudy ice usually means the water filter is overdue (most units restrict flow and quality when the filter is past life) or the dispenser line has mineral buildup. Bad-tasting ice is almost always filter-related or a stagnant supply line. We change filters as part of a service call and flush the supply line on units that have been sitting unused. Filter replacement alone runs $45 to $85.",
    },
    {
      question: "How long should an ice maker harvest cycle take?",
      answer:
        "A healthy refrigerator ice maker harvests every 90 to 180 minutes and produces 2 to 4 pounds of ice in 24 hours. Stand-alone Sub-Zero, Scotsman, and U-Line units harvest every 15 to 30 minutes and produce 25 to 60 pounds per day. Slow harvest cycles point at low water pressure, dirty optics, or a failing harvest motor. We measure on a $59 diagnostic.",
    },
    {
      question: "Why is my ice maker leaking water?",
      answer:
        "Three common causes: cracked water-supply line behind the unit (the most common), failed water inlet valve dribbling past its shutoff, or a clogged drain line on stand-alone units. Stand-alone ice makers drain by gravity so any low spot or kink stops the drain and water backs up. We dye-test and replace the failed part on a service call.",
    },
    {
      question: "How much does ice maker module replacement cost?",
      answer:
        "On refrigerator-mounted ice makers (Samsung, LG, Whirlpool, GE), module replacement runs $220 to $360 all-in including the part, labor, and the $59 diagnostic credit. Sub-Zero pivot kits are similar pricing. Stand-alone Scotsman and U-Line head replacements run $480 to $920 depending on harvest motor and control board condition.",
    },
  ],
  "wine-cooler-repair": [
    {
      question: "Why is my Sub-Zero wine cooler running warm?",
      answer:
        "Three common causes on Sub-Zero 424 and 427 wine columns: condenser coil is dusty and not rejecting heat efficiently, condenser fan motor has slowed or failed, or the dual-zone evaporator fan motor has failed on one of the two zones. We measure actual cabinet temperature with a calibrated probe and isolate the cause. Sealed-system work is EPA-certified and quoted separately.",
    },
    {
      question: "Do you service EuroCave and Wine Enthusiast units?",
      answer:
        "Yes. EuroCave Premiere, Premiere L, and S-series plus Wine Enthusiast Silent Series are all in our regular service mix. EuroCave is senior-tech work — the cabinets use a different cooling logic and the door seals are model-specific. We carry the EuroCave tech manual and the most common parts on the senior truck.",
    },
    {
      question: "Why is there condensation forming inside my wine cooler?",
      answer:
        "Almost always a door seal failure — the gasket has hardened or shrunk and warm humid air is leaking into the cabinet, condensing on the cold glass and rack surfaces. Door gasket replacement is the fix. On dual-zone units it can also be a failed divider seal between the two zones letting cool air mix.",
    },
    {
      question: "How much does wine cooler repair typically cost?",
      answer:
        "Most wine cooler repairs run $220 to $480 in parts and labor — condenser fan motors, evaporator fan motors, thermostats, and door gaskets are common fixes. Sealed-system work on Sub-Zero, EuroCave, and Marvel wine columns runs $1,200 to $2,400 because of EPA refrigerant handling and the longer service time. We always quote in writing before opening sealed systems.",
    },
    {
      question: "Is it worth repairing a 12-year-old wine cooler?",
      answer:
        "On Sub-Zero, EuroCave, Marvel, and Viking — almost always yes. These are built for 15 to 20 year service lives and the cabinet, rack hardware, and door systems outlast any commodity replacement. On commodity brands like Wine Enthusiast or NewAir, depends on the failure — a fan motor or thermostat is worth fixing; a compressor replacement against a $700 new unit usually is not.",
    },
    {
      question: "Why is my wine cooler making a loud humming or buzzing sound?",
      answer:
        "Condenser fan motor bearings are dry (the most common cause), the compressor mount is loose and vibrating against the cabinet, or the start relay on the compressor is buzzing because it cannot pull in. We open the back, identify the source, and replace whichever component is bad. Most noise calls finish in 60 to 90 minutes.",
    },
  ],
  "garbage-disposal-repair": [
    {
      question: "Why is my garbage disposal humming but not turning?",
      answer:
        "The flywheel is jammed by something hard — chicken bones, fruit pits, broken glass, sometimes a coin or piece of silverware. We free the jam with an Allen wrench from underneath, clear the obstruction, and run a test cycle. If the motor has actually seized, that is a different problem and we quote replacement instead of repair.",
    },
    {
      question: "What is the reset button for on a garbage disposal?",
      answer:
        "The red reset button on the bottom of the disposal trips when the motor overheats from a jam or overload. Press it back in to restore power. If it keeps tripping even with no jam, the motor windings are failing and the unit needs replacement. We can diagnose on a service call before you spend on a new unit you might not need.",
    },
    {
      question: "How much does a garbage disposal replacement cost?",
      answer:
        "Replacement runs $285 to $545 all-in including the new disposal (InSinkErator Badger 5 or Evolution Compact at the budget and mid-range, Evolution Excel at the premium tier), labor, and removal of the old unit. We carry the common InSinkErator and Waste King models on the truck for same-day install. Premium quiet-mount models order in 1 to 2 days.",
    },
    {
      question: "Why is my disposal leaking under the sink?",
      answer:
        "Three common leak points: the upper sink flange where the disposal connects to the sink drain (worn plumber's putty seal), the dishwasher hose connection on the side of the disposal (loose clamp), or the drain elbow at the bottom (cracked gasket). We dye-test to find the source and reseal or replace the failed gasket. Most leak repairs finish in 45 minutes.",
    },
    {
      question: "Do you repair InSinkErator Evolution and Waste King units?",
      answer:
        "Yes. InSinkErator Badger, Evolution Compact, Evolution Excel, and Pro lines plus Waste King L-series, Legend, and Knight units are all in our regular service mix. We service motor jams, leaking flanges, broken splash guards, and stripped grind chambers. Replacement is often cheaper than repair on units older than 8 years.",
    },
    {
      question: "How long do garbage disposals usually last?",
      answer:
        "Budget half-horse units (InSinkErator Badger 5, Waste King L-1001) typically run 6 to 10 years; mid-range three-quarter horse units (Evolution Compact) run 10 to 14 years; premium one-horse quiet-mount units (Evolution Excel, Pro 1100XL) often hit 15-plus years. Hard water and grinding fibrous foods (celery, banana peels, eggshells) shorten the life on any unit.",
    },
  ],
  "range-hood-repair": [
    {
      question: "Why is my range hood fan not working at any speed?",
      answer:
        "Three common causes: the speed control switch on the front of the hood has failed (most common, especially on touch-panel models 5-plus years old), the blower motor has burned out, or the wiring between the switch and motor has come loose at one of the harness connectors. We test all three on a $59 service call. Touch-panel swaps stock for the major brands.",
    },
    {
      question: "Do you fix Wolf, Viking, and Thermador range hoods?",
      answer:
        "Yes. Wolf VW, Viking VWH, Thermador HMW, and Vent-A-Hood premium range hoods are all in our regular service mix. Premium hoods use proprietary control boards that mainstream parts houses do not stock — we carry the brand-specific spares on the senior truck and order longer-lead parts directly from the OEM distribution channel.",
    },
    {
      question: "Why is my range hood lights working but the fan is dead?",
      answer:
        "The fan circuit on the control board has failed, the speed control switch has burned out on the fan side only (lights and fan use separate circuits on most hoods), or the blower motor has open windings. We isolate by testing voltage at the motor terminals on a service call. Most fan-only failures finish on the first visit.",
    },
    {
      question: "How much does range hood blower motor replacement cost?",
      answer:
        "Blower motor replacement runs $260 to $480 all-in including the part, labor, and the $59 diagnostic credit. Wolf, Viking, Thermador, and Vent-A-Hood blower motors are at the upper end because of part cost; mainstream brands (Broan, Best, Faber, Zephyr) are lower. Most motors stock for next-business-day install.",
    },
    {
      question: "Why is my range hood damper stuck open or rattling?",
      answer:
        "The backdraft damper at the duct connection has either rusted in place (stuck open, letting outside air in when the fan is off) or the spring tension has weakened and it is rattling against the duct. We replace the damper assembly on a service call — a quick swap on most installs. On long duct runs we also inspect the exterior wall cap for the same failure.",
    },
    {
      question: "Should I get my range hood ducted or recirculating?",
      answer:
        "Ducted to the exterior is always the better choice on a real cooking household — it removes grease, steam, and combustion byproducts from the home. Recirculating (charcoal-filter) installs are a compromise for condos and apartments without exterior duct access. We can convert a recirculating install to ducted on a separate visit if duct routing is feasible.",
    },
  ],
  "air-duct-cleaning": [
    {
      question: "How often should HVAC ducts be cleaned in South Florida?",
      answer:
        "Every 3 to 5 years for a normal household, every 2 to 3 years if you have pets or anyone with allergies or asthma. South Florida humidity accelerates mold spore growth in ducts that are not regularly cleaned. New construction homes should have a cleaning within the first year because drywall dust and construction debris accumulate during the build.",
    },
    {
      question: "What does air duct cleaning cost for a typical home?",
      answer:
        "Standard 3-bedroom 2-bathroom home with central HVAC runs $385 to $585 depending on the number of supply and return vents (typically 10 to 18 per home). Larger homes and multi-zone systems are quoted on-site. We provide before-and-after photos of every job so you see what came out of the ducts.",
    },
    {
      question: "Do you also clean the dryer vent during a duct cleaning?",
      answer:
        "Yes if requested — dryer vent cleaning adds $89 to $129 to a same-day HVAC cleaning because the truck and equipment are already on-site. Standalone dryer vent cleaning runs $129 to $189. We power-vacuum the full duct path with HEPA equipment regardless of which scope you book.",
    },
    {
      question: "What equipment do you use for duct cleaning?",
      answer:
        "HEPA-filtered negative-pressure equipment that pulls debris out of the duct system rather than scrubbing inside it (which can damage flex duct and push dust into the home). We agitate with brush whips and air whips, then vacuum from a sealed access point at the air handler. NADCA-compliant process.",
    },
    {
      question: "Will duct cleaning help with my allergies?",
      answer:
        "Most households see a real difference in indoor air quality for 12 to 24 months after a thorough cleaning, especially in homes with pets, smokers, or anyone with respiratory sensitivities. Cleaning removes accumulated dust mite debris, pet dander, mold spores, and pollen that the HVAC system has been recirculating. Filter upgrade to MERV 11 or higher extends the benefit.",
    },
    {
      question: "Do you handle commercial duct cleaning for restaurants and offices?",
      answer:
        "Yes — restaurant kitchen exhaust hoods, office HVAC systems, and retail spaces are all in our regular service mix. Commercial work typically happens after-hours or weekends to avoid business disruption. We provide COI for landlord and property-management compliance and document NFPA 96 hood-cleaning records for restaurant inspections.",
    },
  ],
};
