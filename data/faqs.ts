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
      "Yes. Berne Repair is fully licensed and insured to operate in the state of Florida. We carry general liability so your home and equipment are protected.",
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
      "For the most common parts — yes. With 17 technicians and trucks stocked for the brands we service most, we resolve a large share of jobs on the first visit. If a part needs ordering we typically get it in 1–3 business days.",
  },
];

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
