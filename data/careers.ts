/**
 * Open role surfaced on /careers (+ /es/careers) and emitted as JobPosting
 * JSON-LD. One vacancy: luxury-segment appliance repair technician.
 *
 * FACTS POLICY (Eugene, 2026-07-21): only verified company facts appear here —
 * founded 2015, 18 W-2 staff technicians, EPA-608, Miami-Dade / Broward /
 * Palm Beach coverage, steady year-round workload, in-house luxury-brand
 * training. No salary figures anywhere (page or schema): pay is discussed
 * per experience. Do NOT add baseSalary back into the schema.
 *
 * Bump POSTING_DATE when Eugene refreshes the listing; keep validThrough
 * ~6 months out so Google for Jobs doesn't flag it as stale.
 */
export const POSTING_DATE = "2026-07-21";
export const VALID_THROUGH = "2027-01-21";

export const TECH_ROLE = {
  slug: "appliance-repair-technician",
  employmentType: "FULL_TIME",

  title: "Appliance Repair Technician — Luxury Brands (Sub-Zero, Wolf, Viking, Miele, Thermador)",
  titleEs: "Técnico de reparación de electrodomésticos — marcas de lujo (Sub-Zero, Wolf, Viking, Miele, Thermador)",

  payLabel: "Pay discussed based on experience",
  payLabelEs: "Pago a convenir según experiencia",
  payLabelRu: "Оплата обсуждается по опыту",

  workLocation: "Field work — Miami-Dade, Broward, Palm Beach",
  workLocationEs: "Trabajo de campo — Miami-Dade, Broward, Palm Beach",

  /** Schema `description` (EN, also rendered on the page). */
  description:
    "Berne has repaired household appliances in South Florida since 2015. The team is 18 staff technicians, every one a W-2 employee — no 1099 arrangements. Our clients own Sub-Zero, Wolf, Viking, Miele, and Thermador equipment, and they expect careful, quiet, well-documented work. We train technicians on these luxury brands in-house. The workload is steady year round across Miami-Dade, Broward, and Palm Beach counties. Refrigerant work follows EPA Section 608 requirements.",
  descriptionEs:
    "Berne repara electrodomésticos en el sur de Florida desde 2015. El equipo son 18 técnicos de planta, todos empleados W-2 — sin arreglos 1099. Nuestros clientes tienen equipos Sub-Zero, Wolf, Viking, Miele y Thermador, y esperan un trabajo cuidadoso y bien documentado. Capacitamos a los técnicos en estas marcas de lujo internamente. El flujo de trabajo es estable todo el año en Miami-Dade, Broward y Palm Beach. El trabajo con refrigerante sigue los requisitos de la Sección 608 de la EPA.",

  requirements: [
    "Hands-on appliance repair experience, or a strong technical background (electrical, HVAC, refrigeration)",
    "Valid driver license",
    "Conversational English — Russian is also spoken on the team",
    "EPA Section 608 certification for sealed-system refrigerant work (federal requirement; bring it if you have it)",
  ],
  requirementsEs: [
    "Experiencia práctica en reparación de electrodomésticos, o una base técnica sólida (eléctrica, HVAC, refrigeración)",
    "Licencia de conducir válida",
    "Inglés conversacional — en el equipo también se habla ruso",
    "Certificación EPA Sección 608 para trabajo con refrigerante en sistemas sellados (requisito federal; tráela si la tienes)",
  ],
  requirementsRu: [
    "Опыт ремонта бытовой техники — или сильная техническая база (электрика, HVAC, холодильные системы)",
    "Действующие водительские права",
    "Разговорный английский — в команде говорят и по-русски",
    "Сертификат EPA 608 для работы с фреоном (федеральное требование; если он у вас есть — это плюс)",
  ],

  skills:
    "Appliance diagnostics, sealed-system refrigeration, luxury brands (Sub-Zero, Wolf, Viking, Miele, Thermador), customer-facing field work",
  skillsEs:
    "Diagnóstico de electrodomésticos, refrigeración de sistema sellado, marcas de lujo (Sub-Zero, Wolf, Viking, Miele, Thermador), trabajo de campo con clientes",
} as const;

export type TechRole = typeof TECH_ROLE;
