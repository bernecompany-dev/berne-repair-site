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
  ],
};
