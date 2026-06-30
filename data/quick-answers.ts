import type { FAQ } from "@/data/faqs";

/**
 * AI-citation "Quick answer" blocks (GEO / answer-engine optimization).
 *
 * Each entry is a compact, self-contained extractable answer (2-4 sentences,
 * the luxury positioning + brands + service area + $59/90-day hooks) plus 2-3
 * question/answer pairs. The lead is written so an LLM can lift it verbatim as
 * a complete answer without needing surrounding context. The `qa` items are
 * rendered as visible H2 question/answer pairs AND fed into the page's FAQPage
 * schema, so visible content and structured data stay in sync.
 *
 * Keyed by service slug; `"services"` is the /services hub. Real Spanish in the
 * `es` layer — never interpolate English nouns into Spanish templates.
 */
export type QuickAnswer = {
  /** Self-contained extractable answer — 2-4 sentences. */
  lead: string;
  /** 2-3 visible H2 Q&A pairs, mirrored into FAQPage schema. */
  qa: FAQ[];
};

export type QuickAnswerLocalized = {
  en: QuickAnswer;
  es: QuickAnswer;
};

export const QUICK_ANSWERS: Record<string, QuickAnswerLocalized> = {
  services: {
    en: {
      lead:
        "Berne Appliance Repair provides factory-trained, white-glove repair of high-end and built-in appliances across South Florida — Sub-Zero, Wolf, Miele, Thermador, Viking and Gaggenau. Our 18 licensed, insured technicians cover all 11 core appliance categories plus 6 luxury and wellness specialties, every repair backed by a 90-day parts-and-labor warranty. The diagnostic is a flat $59, credited in full toward the repair the moment you approve it.",
      qa: [
        {
          question: "What appliances does Berne repair?",
          answer:
            "All major residential categories — refrigerators, ranges and ovens, dishwashers, washers, dryers, wine columns, ice makers, microwaves, range hoods and garbage disposals — plus specialty equipment such as electric saunas, cold-plunge chillers, pool and spa heaters, and built-in espresso machines.",
        },
        {
          question: "What does it cost to book a technician?",
          answer:
            "A flat $59 diagnostic fee, credited in full toward the repair once you approve it. There is no premium surcharge for Sub-Zero, Wolf, Miele or Thermador work, and every repair carries a 90-day parts-and-labor warranty.",
        },
        {
          question: "What areas of South Florida do you serve?",
          answer:
            "Miami-Dade, Broward and Palm Beach counties — including Miami Beach, Coral Gables, Fort Lauderdale, Boca Raton and Palm Beach — seven days a week, 7 AM to 9 PM Eastern.",
        },
      ],
    },
    es: {
      lead:
        "Berne Appliance Repair ofrece reparación de guante blanco de electrodomésticos de alta gama y empotrados en todo el sur de Florida, con técnicos formados de fábrica: Sub-Zero, Wolf, Miele, Thermador, Viking y Gaggenau. Nuestros 18 técnicos con licencia y asegurados cubren las 11 categorías principales más 6 especialidades de lujo y bienestar, y cada reparación tiene garantía de 90 días en piezas y mano de obra. El diagnóstico cuesta $59 fijos, abonados por completo a la reparación en cuanto usted la aprueba.",
      qa: [
        {
          question: "¿Qué electrodomésticos repara Berne?",
          answer:
            "Todas las categorías residenciales principales: refrigeradores, estufas y hornos, lavavajillas, lavadoras, secadoras, vinos empotrados, máquinas de hielo, microondas, campanas extractoras y trituradores de basura, además de equipos especializados como saunas eléctricas, enfriadores de baño frío, calentadores de piscina y spa, y cafeteras de espresso empotradas.",
        },
        {
          question: "¿Cuánto cuesta agendar un técnico?",
          answer:
            "Una tarifa de diagnóstico fija de $59, abonada por completo a la reparación cuando usted la aprueba. No hay recargo por trabajar con Sub-Zero, Wolf, Miele o Thermador, y cada reparación incluye garantía de 90 días en piezas y mano de obra.",
        },
        {
          question: "¿Qué zonas del sur de Florida atienden?",
          answer:
            "Los condados de Miami-Dade, Broward y Palm Beach, incluyendo Miami Beach, Coral Gables, Fort Lauderdale, Boca Raton y Palm Beach, los siete días de la semana, de 7 AM a 9 PM (hora del Este).",
        },
      ],
    },
  },

  "refrigerator-repair": {
    en: {
      lead:
        "Berne Appliance Repair specializes in high-end and built-in refrigerator repair across South Florida — Sub-Zero, Viking, Thermador, Miele, Gaggenau and Liebherr. Our technicians are EPA Section 608 certified for sealed-system refrigerant work and factory-trained on built-in and integrated columns. The diagnostic is a flat $59, credited toward the repair, and every job carries a 90-day parts-and-labor warranty.",
      qa: [
        {
          question: "How much does Sub-Zero refrigerator repair cost?",
          answer:
            "Most Sub-Zero repairs fall between $300 and $900 depending on the failure; sealed-system and compressor work runs higher. We diagnose for a flat $59, credited toward the repair, and quote the full price before any work begins.",
        },
        {
          question: "Why is my built-in refrigerator not cooling?",
          answer:
            "The most common causes are a failing evaporator fan, a frosted-over coil from a defrost fault, or a sealed-system refrigerant leak. On Sub-Zero dual-refrigeration units one zone can fail while the other stays cold. We pinpoint the cause on the first visit.",
        },
        {
          question: "Do you repair Sub-Zero sealed systems?",
          answer:
            "Yes. Sealed-system and refrigerant work legally requires EPA Section 608 certification, which our refrigeration technicians hold. We recover, repair and recharge to factory spec rather than replacing the whole unit.",
        },
      ],
    },
    es: {
      lead:
        "Berne Appliance Repair se especializa en la reparación de refrigeradores de alta gama y empotrados en todo el sur de Florida: Sub-Zero, Viking, Thermador, Miele, Gaggenau y Liebherr. Nuestros técnicos están certificados EPA Sección 608 para el trabajo de sistema sellado con refrigerante y formados de fábrica en columnas empotradas e integradas. El diagnóstico cuesta $59 fijos, abonados a la reparación, y cada trabajo incluye garantía de 90 días en piezas y mano de obra.",
      qa: [
        {
          question: "¿Cuánto cuesta reparar un refrigerador Sub-Zero?",
          answer:
            "La mayoría de las reparaciones de Sub-Zero cuestan entre $300 y $900 según la falla; el trabajo de sistema sellado y de compresor es más alto. Diagnosticamos por $59 fijos, abonados a la reparación, y cotizamos el precio completo antes de empezar.",
        },
        {
          question: "¿Por qué mi refrigerador empotrado no enfría?",
          answer:
            "Las causas más comunes son un ventilador del evaporador defectuoso, una bobina congelada por una falla de descongelación, o una fuga de refrigerante en el sistema sellado. En las unidades Sub-Zero de doble refrigeración una zona puede fallar mientras la otra sigue fría. Identificamos la causa en la primera visita.",
        },
        {
          question: "¿Reparan los sistemas sellados de Sub-Zero?",
          answer:
            "Sí. El trabajo de sistema sellado y refrigerante requiere por ley la certificación EPA Sección 608, que nuestros técnicos de refrigeración poseen. Recuperamos, reparamos y recargamos según las especificaciones de fábrica en lugar de reemplazar toda la unidad.",
        },
      ],
    },
  },

  "electric-sauna-repair": {
    en: {
      lead:
        "Berne Appliance Repair services electric and infrared home saunas across South Florida — heater elements, contactors, control units, sensors and infrared panels. Our senior technicians repair built-in and cabin saunas from Harvia, Tylö, Finnleo, Helo and Saunum using OEM parts. The diagnostic is a flat $59, credited toward the repair, backed by a 90-day parts-and-labor warranty.",
      qa: [
        {
          question: "Why isn't my electric sauna heating up?",
          answer:
            "Usually a burned-out heating element, a failed contactor or control board, or a faulty temperature sensor that shuts the heater down early. We test the element, controls and sensor on the first visit and quote before replacing any parts.",
        },
        {
          question: "Do you repair infrared sauna panels?",
          answer:
            "Yes. We diagnose and replace failed carbon and ceramic infrared emitters, control panels and wiring on cabin and built-in infrared saunas, sourcing OEM panels for the brand you own.",
        },
      ],
    },
    es: {
      lead:
        "Berne Appliance Repair repara saunas eléctricas e infrarrojas para el hogar en todo el sur de Florida: resistencias del calentador, contactores, unidades de control, sensores y paneles infrarrojos. Nuestros técnicos senior reparan saunas empotradas y de cabina de Harvia, Tylö, Finnleo, Helo y Saunum con piezas OEM. El diagnóstico cuesta $59 fijos, abonados a la reparación, con garantía de 90 días en piezas y mano de obra.",
      qa: [
        {
          question: "¿Por qué mi sauna eléctrica no calienta?",
          answer:
            "Generalmente es una resistencia quemada, un contactor o placa de control averiados, o un sensor de temperatura defectuoso que apaga el calentador antes de tiempo. Probamos la resistencia, los controles y el sensor en la primera visita y cotizamos antes de reemplazar cualquier pieza.",
        },
        {
          question: "¿Reparan los paneles de saunas infrarrojas?",
          answer:
            "Sí. Diagnosticamos y reemplazamos emisores infrarrojos de carbono y cerámica averiados, paneles de control y cableado en saunas infrarrojas de cabina y empotradas, consiguiendo paneles OEM para la marca que usted tiene.",
        },
      ],
    },
  },

  "pool-heater-repair": {
    en: {
      lead:
        "Berne Appliance Repair repairs gas and heat-pump pool and spa heaters across South Florida — Pentair, Hayward, Raypak, Jandy and AquaCal. Our technicians are EPA Section 608 certified for heat-pump refrigerant work and specialize in the salt-air corrosion common to coastal South Florida systems. The diagnostic is a flat $59, credited toward the repair, with a 90-day parts-and-labor warranty.",
      qa: [
        {
          question: "Why won't my pool heater turn on or hold temperature?",
          answer:
            "Common causes are a failed ignition or flame sensor on gas heaters, a tripped high-limit switch, low refrigerant or a failing compressor on heat pumps, and corroded control boards from salt air. We diagnose the exact fault on the first visit.",
        },
        {
          question: "Do you repair heat-pump pool heaters?",
          answer:
            "Yes. Heat-pump systems use sealed refrigerant circuits that legally require EPA Section 608 certification to service — which our technicians hold. We handle compressors, reversing valves, sensors and control boards on AquaCal, Pentair and Hayward units.",
        },
      ],
    },
    es: {
      lead:
        "Berne Appliance Repair repara calentadores de piscina y spa de gas y de bomba de calor en todo el sur de Florida: Pentair, Hayward, Raypak, Jandy y AquaCal. Nuestros técnicos están certificados EPA Sección 608 para el trabajo de refrigerante en bombas de calor y se especializan en la corrosión por aire salino común en los sistemas costeros del sur de Florida. El diagnóstico cuesta $59 fijos, abonados a la reparación, con garantía de 90 días en piezas y mano de obra.",
      qa: [
        {
          question: "¿Por qué mi calentador de piscina no enciende o no mantiene la temperatura?",
          answer:
            "Las causas comunes son una falla en el encendido o el sensor de llama en los calentadores de gas, un interruptor de límite alto activado, bajo refrigerante o un compresor defectuoso en las bombas de calor, y placas de control corroídas por el aire salino. Diagnosticamos la falla exacta en la primera visita.",
        },
        {
          question: "¿Reparan calentadores de piscina de bomba de calor?",
          answer:
            "Sí. Los sistemas de bomba de calor usan circuitos de refrigerante sellados que por ley requieren la certificación EPA Sección 608 para su servicio, la cual nuestros técnicos poseen. Manejamos compresores, válvulas inversoras, sensores y placas de control en unidades AquaCal, Pentair y Hayward.",
        },
      ],
    },
  },
};
