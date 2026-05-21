/**
 * Open roles surfaced on /careers + emitted as JobPosting JSON-LD for
 * Google for Jobs integration. Each entry must satisfy Google's
 * structured-data requirements (title, description, datePosted,
 * validThrough, hiringOrganization, jobLocation, baseSalary).
 *
 * Bump POSTING_DATE every 30 days so listings don't go stale in Google for
 * Jobs (validThrough is 90 days out; Google warns once validThrough is in
 * the past). Eugene refreshes these in batch — keep the structure stable so
 * a single date bump is the only edit needed.
 */
export type JobRole = {
  slug: string;
  title: string;
  titleEs: string;
  employmentType:
    | "FULL_TIME"
    | "PART_TIME"
    | "CONTRACTOR"
    | "TEMPORARY"
    | "INTERN"
    | "VOLUNTEER"
    | "PER_DIEM"
    | "OTHER";
  pay: {
    /** Display label for the page UI (en) — schema uses min/max below. */
    label: string;
    labelEs: string;
    min: number;
    max: number;
    unitText: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";
  };
  /** Where the work happens (used in body copy + schema jobLocation). */
  workLocation: string;
  workLocationEs: string;
  /** Schema-only — Hallandale HQ vs Boca office or Mobile. */
  locationType?: "TELECOMMUTE" | null;
  /** Short blurb used in cards. */
  blurb: string;
  blurbEs: string;
  /** Multi-paragraph description (used in schema `description` + body). */
  description: string;
  descriptionEs: string;
  requirements: string[];
  requirementsEs: string[];
  skills: string;
  skillsEs: string;
};

/** Canonical posting date — bump when Eugene refreshes the listings. */
export const POSTING_DATE = "2026-05-20";
/** Google for Jobs requires validThrough; 90 days is the recommended window. */
export const VALID_THROUGH = "2026-08-18";

export const CAREERS: JobRole[] = [
  {
    slug: "senior-appliance-technician",
    title: "Senior Appliance Technician — South Florida",
    titleEs: "Técnico senior de electrodomésticos — sur de Florida",
    employmentType: "FULL_TIME",
    pay: {
      label: "Competitive base + per-job + bonuses",
      labelEs: "Base competitiva + por servicio + bonos",
      min: 65000,
      max: 110000,
      unitText: "YEAR",
    },
    workLocation: "Mobile (truck) — Miami-Dade, Broward, Palm Beach",
    workLocationEs: "Móvil (camioneta) — Miami-Dade, Broward, Palm Beach",
    blurb:
      "5+ years residential or commercial repair experience. EPA Section 608 Universal. Bilingual preferred.",
    blurbEs:
      "5+ años de experiencia en reparación residencial o comercial. EPA Sección 608 Universal. Bilingüe preferido.",
    description:
      "Senior field technician on the Berne Appliance Repair fleet — diagnose and repair refrigerators, dishwashers, washers, dryers, ovens, ranges and cooktops across the Miami-Dade / Broward / Palm Beach service area. W-2 employment, not 1099 subcontractor. Continuous OEM training through Marcone Servicers Association (MSA): Sub-Zero, Wolf, Miele, LG, Samsung, GE. Established dispatch through HousecallPro — routes are pre-built, parts are pre-staged. Honest pricing culture: no commission-based upsell pressure.",
    descriptionEs:
      "Técnico senior de campo en la flota de Berne Appliance Repair — diagnostica y repara refrigeradores, lavavajillas, lavadoras, secadoras, hornos, estufas y cocinas en el área de servicio de Miami-Dade / Broward / Palm Beach. Empleo W-2, no subcontratista 1099. Capacitación continua de OEM a través de Marcone Servicers Association (MSA): Sub-Zero, Wolf, Miele, LG, Samsung, GE. Despacho establecido a través de HousecallPro — rutas pre-construidas, repuestos pre-asignados. Cultura de precios honestos: sin presión por venta adicional basada en comisiones.",
    requirements: [
      "5+ years residential / commercial appliance repair experience",
      "EPA Section 608 Universal (or obtained within 90 days of hire)",
      "Valid Florida driver license + clean MVR (Motor Vehicle Record)",
      "Bilingual (English + Spanish or Russian) preferred",
      "Comfortable with diagnostic multimeter, manometer, refrigerant gauges",
      "Customer-facing demeanor — every job ends with a Google review request",
    ],
    requirementsEs: [
      "5+ años de experiencia en reparación de electrodomésticos residenciales / comerciales",
      "EPA Sección 608 Universal (o obtenido dentro de los 90 días de contratación)",
      "Licencia de conducir de Florida válida + MVR limpio (Registro de Vehículo Motorizado)",
      "Bilingüe (inglés + español o ruso) preferido",
      "Cómodo con multímetro de diagnóstico, manómetro, indicadores de refrigerante",
      "Trato amable con el cliente — cada trabajo termina con una solicitud de reseña en Google",
    ],
    skills:
      "Appliance repair, EPA Section 608, sealed-system refrigeration, control board diagnostics, customer service, dispatch software (HousecallPro)",
    skillsEs:
      "Reparación de electrodomésticos, EPA Sección 608, refrigeración de sistema sellado, diagnóstico de placas de control, servicio al cliente, software de despacho (HousecallPro)",
  },
  {
    slug: "junior-appliance-technician",
    title: "Junior Appliance Technician",
    titleEs: "Técnico junior de electrodomésticos",
    employmentType: "FULL_TIME",
    pay: {
      label: "$22 – $32 / hr depending on experience",
      labelEs: "$22 – $32 / hora según experiencia",
      min: 22,
      max: 32,
      unitText: "HOUR",
    },
    workLocation: "Mobile (truck) — Miami-Dade, Broward, Palm Beach",
    workLocationEs: "Móvil (camioneta) — Miami-Dade, Broward, Palm Beach",
    blurb:
      "1-3 years experience or technical school graduate. Ride-along training with senior techs. W-2 with health-benefits track.",
    blurbEs:
      "1-3 años de experiencia o graduado de escuela técnica. Capacitación con técnicos senior. W-2 con plan de salud.",
    description:
      "Entry-level field technician. Ride with a senior tech for the first 30-60 days, then own a truck. Berne pays for EPA 608 certification, MSA training modules, and brand-specific OEM classes (Sub-Zero/Wolf, LG/Samsung). The goal is a 12-month track from junior to independent senior. Trade school graduates without field experience are welcome — we hire for attitude and train for skill.",
    descriptionEs:
      "Técnico de campo de nivel inicial. Acompaña a un técnico senior los primeros 30-60 días, luego maneja su propia camioneta. Berne paga la certificación EPA 608, módulos de capacitación MSA y clases OEM específicas de marca (Sub-Zero/Wolf, LG/Samsung). El objetivo es un plan de 12 meses de junior a senior independiente. Graduados de escuela técnica sin experiencia de campo son bienvenidos — contratamos por actitud y capacitamos por habilidad.",
    requirements: [
      "1-3 years field appliance repair experience OR technical school graduate (HVAC, electrical, automotive)",
      "Valid Florida driver license + clean MVR",
      "Mechanical aptitude — can read a schematic, use a multimeter",
      "Bilingual (Spanish or Russian) a strong plus",
      "Reliable — start time is 7:00 AM, route depends on you",
    ],
    requirementsEs: [
      "1-3 años de experiencia en reparación de electrodomésticos O graduado de escuela técnica (HVAC, eléctrica, automotriz)",
      "Licencia de conducir de Florida válida + MVR limpio",
      "Aptitud mecánica — puede leer un esquema, usar un multímetro",
      "Bilingüe (español o ruso) un gran plus",
      "Confiable — la hora de inicio es 7:00 AM, la ruta depende de ti",
    ],
    skills:
      "Mechanical diagnostics, multimeter, schematic reading, customer communication, willingness to obtain EPA 608",
    skillsEs:
      "Diagnóstico mecánico, multímetro, lectura de esquemas, comunicación con el cliente, disposición para obtener EPA 608",
  },
  {
    slug: "customer-service-representative",
    title: "Customer Service Representative",
    titleEs: "Representante de servicio al cliente",
    employmentType: "FULL_TIME",
    pay: {
      label: "$18 – $22 / hr",
      labelEs: "$18 – $22 / hora",
      min: 18,
      max: 22,
      unitText: "HOUR",
    },
    workLocation: "In-office — Hallandale Beach HQ or Boca Raton",
    workLocationEs: "En oficina — Hallandale Beach (sede) o Boca Raton",
    blurb:
      "Phone, SMS, web-form intake. 7 AM – 9 PM rotational shifts. Bilingual strongly preferred. HCP / CRM experience a plus.",
    blurbEs:
      "Recepción por teléfono, SMS, formulario web. Turnos rotativos de 7 AM – 9 PM. Bilingüe muy preferido. Experiencia con HCP / CRM un plus.",
    description:
      "Front-line customer service. Answer inbound calls, respond to web-form leads, qualify the request (appliance, brand, model, symptom), book the service-call window in HousecallPro, take the credit card on file, and hand off to dispatch. You are the first voice every customer hears — patience, tone, and English/Spanish fluency matter as much as keyboard speed. Two offices: Hallandale Beach (HQ) or Boca Raton — pick whichever is closer to home.",
    descriptionEs:
      "Servicio al cliente de primera línea. Contesta llamadas entrantes, responde a leads de formularios web, califica la solicitud (electrodoméstico, marca, modelo, síntoma), reserva la ventana de visita en HousecallPro, toma la tarjeta de crédito en archivo y entrega al despacho. Eres la primera voz que escucha cada cliente — la paciencia, el tono y la fluidez en inglés/español importan tanto como la velocidad del teclado. Dos oficinas: Hallandale Beach (sede) o Boca Raton — elige la más cercana a tu casa.",
    requirements: [
      "Bilingual English + Spanish strongly preferred (Russian a plus)",
      "Comfortable on the phone — high call volume, polite under pressure",
      "Familiar with CRM / dispatch software (HousecallPro, ServiceTitan, Jobber, ZenDesk)",
      "Reliable schedule — rotation includes some evening + Saturday shifts",
      "Clear written English — you'll be replying to web-form leads",
    ],
    requirementsEs: [
      "Bilingüe inglés + español muy preferido (ruso un plus)",
      "Cómodo en el teléfono — alto volumen de llamadas, cortés bajo presión",
      "Familiarizado con software CRM / despacho (HousecallPro, ServiceTitan, Jobber, ZenDesk)",
      "Horario confiable — la rotación incluye algunos turnos vespertinos y de sábado",
      "Inglés escrito claro — responderás a leads de formularios web",
    ],
    skills:
      "Customer service, bilingual communication, CRM software, HousecallPro, call qualification, scheduling",
    skillsEs:
      "Servicio al cliente, comunicación bilingüe, software CRM, HousecallPro, calificación de llamadas, programación",
  },
  {
    slug: "dispatcher-route-coordinator",
    title: "Dispatcher / Route Coordinator",
    titleEs: "Despachador / coordinador de rutas",
    employmentType: "FULL_TIME",
    pay: {
      label: "$20 – $25 / hr",
      labelEs: "$20 – $25 / hora",
      min: 20,
      max: 25,
      unitText: "HOUR",
    },
    workLocation: "In-office — Hallandale Beach HQ",
    workLocationEs: "En oficina — Hallandale Beach (sede)",
    blurb:
      "Route 18 trucks across 3 counties. HousecallPro power-user. Multi-tasking, calm under pressure. Logistics/dispatch experience required.",
    blurbEs:
      "Rutea 18 camionetas en 3 condados. Usuario avanzado de HousecallPro. Multitarea, calma bajo presión. Se requiere experiencia en logística / despacho.",
    description:
      "Own the route board. Sequence 18 technician routes across Miami-Dade, Broward, and Palm Beach — minimizing dead miles, maximizing booked jobs per truck per day. Real-time re-routing when a job runs long, a customer cancels, or a parts run is needed. Coordinate with parts (Marcone, Encompass, Reliable Parts) so techs aren't blocked waiting. You'll have HousecallPro, Google Maps API, and direct phone lines to every tech — the rest is logistical chess.",
    descriptionEs:
      "Dueño del tablero de rutas. Secuencia 18 rutas de técnicos en Miami-Dade, Broward y Palm Beach — minimizando millas muertas, maximizando trabajos reservados por camioneta por día. Re-ruteo en tiempo real cuando un trabajo se alarga, un cliente cancela o se necesita una corrida de repuestos. Coordina con repuestos (Marcone, Encompass, Reliable Parts) para que los técnicos no esperen. Tendrás HousecallPro, Google Maps API y líneas telefónicas directas con cada técnico — el resto es ajedrez logístico.",
    requirements: [
      "2+ years dispatch / logistics / route-coordination experience (any vertical: HVAC, plumbing, courier, field service)",
      "HousecallPro, ServiceTitan, Jobber, or similar dispatch software",
      "Geographic familiarity with South Florida (Miami-Dade / Broward / Palm Beach)",
      "Calm under pressure — 9 AM Monday is a 40-job day",
      "Bilingual English + Spanish strongly preferred",
    ],
    requirementsEs: [
      "2+ años de experiencia en despacho / logística / coordinación de rutas (cualquier vertical: HVAC, plomería, mensajería, servicio de campo)",
      "HousecallPro, ServiceTitan, Jobber o software de despacho similar",
      "Familiaridad geográfica con el sur de Florida (Miami-Dade / Broward / Palm Beach)",
      "Calma bajo presión — un lunes a las 9 AM son 40 trabajos en el día",
      "Bilingüe inglés + español muy preferido",
    ],
    skills:
      "Route optimization, dispatch software, geographic logistics, parts coordination, bilingual communication, time management",
    skillsEs:
      "Optimización de rutas, software de despacho, logística geográfica, coordinación de repuestos, comunicación bilingüe, gestión del tiempo",
  },
];

export type CareersData = typeof CAREERS;
