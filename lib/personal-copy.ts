/**
 * Hand-written first-person voice copy for service / city / combo pages.
 * Templates rotate based on a deterministic hash of the slug+city so each
 * page reliably gets its own variation, and the same page renders the same
 * copy every build. Multiple openers + bodies + closers compose into ~100+
 * unique outputs per page type before factoring in neighborhood/brand
 * substitutions, which makes the corpus look hand-written at scale.
 *
 * Voice: Eugene Berne, owner — direct, slightly informal, no AI fluff.
 */

import type { Service } from "@/data/services";
import type { City } from "@/data/cities";
import type { Locale } from "@/lib/i18n";

// ---- deterministic small hash, slug → small int -------------------------
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
const pick = <T,>(arr: T[], seed: number, salt = 0): T =>
  arr[(seed + salt) % arr.length];

// ---- combo (service × city) ---------------------------------------------

const COMBO_OPENERS: Array<(s: Service, c: City) => string> = [
  (s, c) =>
    `Eugene here. Most ${s.seoNoun} calls we get from ${c.name} are not the disaster the owner thinks they are — they're usually a part we've already got on the truck.`,
  (s, c) =>
    `Quick note from the owner. I've personally been on ${s.seoNoun} jobs in ${c.name} from ${c.neighborhoods[0]} to ${c.neighborhoods[1] ?? c.neighborhoods[0]} — and the answer's almost always the same: get a real diagnostic before anyone quotes you a number.`,
  (s, c) =>
    `Hi, Eugene Berne — I run Berne Repair. ${s.shortName} stuff in ${c.name} is something we do every week. If you called us today before noon, odds are we'd have a tech at your door by dinner.`,
  (s, c) =>
    `Straight from the owner: ${c.name} is one of our busiest pockets for ${s.seoNoun}. Three of our techs are based within twenty minutes of you, which is why same-day actually means same-day here, not 'in two business days.'`,
  (s, c) =>
    `If you're reading this you've probably already tried the obvious — unplug-and-replug, check the breaker. Eugene Berne here, founder. We see the actual ${s.seoNoun} failures every day in ${c.name}. Let me save you the troubleshooting article.`,
  (s, c) =>
    `${c.name} — yeah, we work this zip every day. ${s.shortName} repairs especially. I'm Eugene, I own this thing, and I take it personally when a job here doesn't go right.`,
  (s, c) =>
    `Honest take from the guy whose name is on the truck. ${s.seoNoun} in ${c.name} runs $150-$600 most of the time, occasionally less. If anyone in ${c.county} County quotes you four figures for a basic fix, get a second opinion.`,
  (s, c) =>
    `Owner speaking. The reason I list cities like ${c.name} individually isn't SEO — it's so you know I actually have technicians who live near you. ${s.shortName} jobs in this area go to one of the same three guys every time.`,
];

const COMBO_BODIES: Array<(s: Service, c: City) => string> = [
  (s, c) =>
    `We stock parts for ${s.brands.slice(0, 3).join(", ")} on the trucks because that's what's actually in ${c.name} kitchens — not whatever a parts catalog says is "popular." On a typical ${s.seoNoun} job we diagnose, quote, and finish in the same visit about 80% of the time.`,
  (s, c) =>
    `What you get: a real ${COMPANY_SHORT} tech (one of ours, not a subcontractor), the flat $59 diagnostic, then a number for the repair before we touch a screwdriver. If you say no, you owe us $59 and we leave. If you say yes, the $59 comes off the total.`,
  (s, c) =>
    `Two things I always tell ${c.name} customers about ${s.seoNoun}: first, don't wait — the longer a sealed system leaks or a motor labors, the more expensive it gets. Second, ask for the OEM part number on the invoice. We always provide it.`,
  (s, c) =>
    `Realistic timing in ${c.name}: call before noon → tech at your door same day. Call after 4 PM → next-morning slot. Weekends and holidays we run a smaller crew, but same-day's still on the table for true emergencies.`,
  (s, c) =>
    `If you've got a high-end build — Sub-Zero, Wolf, Thermador, Miele — I send one of my senior guys. Those units have quirks the manufacturer doesn't put in the manual, and I'd rather pay someone who's seen it before than have a junior tech burn three hours figuring it out at your expense.`,
  (s, c) =>
    `Here's the part nobody else will tell you: sometimes ${s.seoNoun} is not worth the repair. If a unit is 12+ years old and the failure is the compressor or the main board, I'll tell you that on the phone before we even drive out. Replacement is replacement.`,
  (s, c) =>
    `The neighborhoods I see ${s.seoNoun} from most in ${c.name}: ${c.neighborhoods.slice(0, 3).join(", ")}. Older buildings tend to have older units, which means more sealed-system and electrical work. New construction in this area still throws curveballs — usually install-related.`,
  (s, c) =>
    `A note on warranty. Ninety days, parts and labor we touched. If the same symptom returns inside that window, the next visit is on us. Not "we'll send someone out and look" — we fix it again at no charge. That's how it should work.`,
];

const COMBO_CLOSERS: Array<(s: Service, c: City) => string> = [
  (s, c) =>
    `Either call us or fill in the form below — both come to me. — Eugene`,
  (s, c) =>
    `Easiest path: click the call button. It rings dispatch in ${c.county} County. — E.B.`,
  (s, c) =>
    `If ${s.shortName} in ${c.name} is what you need today, you're a tap away. — Eugene Berne`,
  (s, c) =>
    `I read every form submission. The faster you send it, the faster I see it. — Eugene`,
  (s, c) =>
    `Talk to you soon — and thanks for considering us instead of one of those national chains. — E.B.`,
];

const COMPANY_SHORT = "Berne";

// ---- Spanish combo templates ----
const COMBO_OPENERS_ES: Array<(s: Service, c: City) => string> = [
  (s, c) =>
    `Eugene aquí. La mayoría de las llamadas de ${s.seoNoun} que recibimos de ${c.name} no son el desastre que el dueño cree — suele ser una pieza que ya tenemos en el camión.`,
  (s, c) =>
    `Una nota rápida del dueño. He estado personalmente en trabajos de ${s.seoNoun} en ${c.name}, desde ${c.neighborhoods[0]} hasta ${c.neighborhoods[1] ?? c.neighborhoods[0]} — la respuesta casi siempre es la misma: pida un diagnóstico real antes de que alguien le cotice un número.`,
  (s, c) =>
    `Hola, Eugene Berne — yo dirijo Berne Repair. ${s.shortName} en ${c.name} es algo que hacemos todas las semanas. Si nos llama hoy antes del mediodía, lo más probable es que tengamos un técnico en su puerta antes de la cena.`,
  (s, c) =>
    `Directo del dueño: ${c.name} es uno de los puntos más activos para nosotros. Tres técnicos viven a menos de veinte minutos de su zona, por eso "el mismo día" aquí sí significa el mismo día.`,
  (s, c) =>
    `${c.name} — sí, trabajamos en este zip todos los días. Reparaciones de ${s.shortName} especialmente. Soy Eugene, soy el dueño, y me lo tomo personal cuando un trabajo aquí no sale bien.`,
];

const COMBO_BODIES_ES: Array<(s: Service, c: City) => string> = [
  (s, c) =>
    `Llevamos piezas para ${s.brands.slice(0, 3).join(", ")} en los camiones porque eso es lo que realmente hay en las cocinas de ${c.name}. En un trabajo típico de ${s.seoNoun} diagnosticamos, cotizamos y terminamos en la misma visita en el 80% de los casos.`,
  (s, c) =>
    `Lo que recibe: un técnico Berne (uno de los nuestros, no subcontratista), la visita técnica fija de $59, y un número antes de que toquemos un tornillo. Si dice que no, paga $59 y nos vamos. Si dice sí, esos $59 se aplican al total.`,
  (s, c) =>
    `Dos cosas que siempre le digo a los clientes de ${c.name} sobre ${s.seoNoun}: primero, no espere — entre más espera, más caro sale. Segundo, pida el número de pieza OEM en la factura. Siempre lo damos.`,
  (s, c) =>
    `Tiempos reales en ${c.name}: llama antes del mediodía → técnico el mismo día. Llama después de las 4 PM → mañana temprano. Fines de semana corremos con menos personal, pero el mismo día sigue siendo posible para emergencias.`,
];

const COMBO_CLOSERS_ES: Array<(s: Service, c: City) => string> = [
  () => `Llame o llene el formulario — ambos me llegan a mí. — Eugene`,
  () => `El camino más fácil: el botón de llamar. Suena en despacho. — E.B.`,
  () => `Hablamos pronto — y gracias por considerarnos. — Eugene Berne`,
];

// ---- Spanish service templates ----
const SERVICE_OPENERS_ES: Array<(s: Service) => string> = [
  (s) =>
    `Eugene Berne aquí — nota rápida sobre ${s.name.toLowerCase()}. Vemos esta categoría todos los días en el sur de Florida, así que déjeme ir al grano.`,
  (s) =>
    `Desde el escritorio del dueño. ${s.name} es una de las tres categorías de mayor volumen que manejamos. Eso significa que quien llegue a su puerta ya ha resuelto esa misma falla antes.`,
  (s) =>
    `Si está mirando un ${s.seoNoun} dañado ahora mismo — Eugene Berne, dueño. Esto es lo que hacemos, lo que cuesta, y qué preguntar a cualquier compañía que llame (nosotros u otra).`,
];

const SERVICE_BODIES_ES: Array<(s: Service) => string> = [
  (s) =>
    `Marcas para las que tenemos piezas el día uno: ${s.brands.slice(0, 6).join(", ")}. Otras marcas residenciales y comerciales: las servimos, posiblemente pedimos la pieza. El trabajo premium — Sub-Zero, Wolf, Viking, Thermador, Miele — va a técnicos senior que conocen las particularidades.`,
  (s) =>
    `Rangos de precio reales: diagnóstico $59 fijo, aplicado a la reparación. Reemplazo simple de piezas: $150-$300. Trabajo de sistema sellado o tarjeta: $400-$800. Todo se cotiza por escrito antes de empezar.`,
  (s) =>
    `Proceso: usted llama → despacho le encuentra un horario hoy o mañana temprano → técnico llega con camión equipado → diagnóstico, cotización, decisión, reparación. Tiempo promedio en sitio: 45-90 minutos.`,
];

const SERVICE_CLOSERS_ES: Array<(s: Service) => string> = [
  () => `Llame, escriba, reserve online — todo llega a mi equipo. — Eugene`,
  () => `Si quiere que yo personalmente vaya, dígalo al llamar. — Eugene Berne`,
  () => `Esperamos arreglar lo que se rompió. — E.B.`,
];

// ---- Spanish city templates ----
const CITY_OPENERS_ES: Array<(c: City) => string> = [
  (c) =>
    `Nota sobre ${c.name} de parte mía, Eugene Berne. Hemos hecho llamadas en esta ciudad desde que la compañía empezó — barrios como ${c.neighborhoods.slice(0, 2).join(" y ")} son prácticamente casa.`,
  (c) =>
    `Pitch del dueño sobre ${c.name}. Tenemos técnicos a menos de quince minutos de la mayoría de este zip, por eso "el mismo día" sí significa el mismo día. No "vamos a intentar."`,
  (c) =>
    `Hola — Eugene aquí. ${c.name} es una de las ciudades con clientes recurrentes que nos llaman cada año, a veces por electrodomésticos completamente distintos. Ese historial es lo que estoy construyendo en todas partes.`,
];

const CITY_BODIES_ES: Array<(c: City) => string> = [
  (c) =>
    `Lo típico aquí: edificios antiguos en la costa, casas individuales tierra adentro, además de bastante administración de propiedades. Cubrimos las tres. Refrigeradores empotrados en condos costeros, cocinas completas en residencias, lavanderías comerciales para edificios.`,
  (c) =>
    `Cobertura abarca cada ZIP que listamos (${c.zips.slice(0, 5).join(", ")}, y los que se nos pasaron). Si está dentro del condado de ${c.county}, está dentro de nuestra área, punto.`,
  (c) =>
    `Problemas comunes que veo en ${c.name}: el aire salino corroe las serpentinas más rápido que tierra adentro. La humedad estresa los ductos de secadora. El agua dura acorta la vida del lavavajillas. Conocemos los patrones de falla locales porque vivimos aquí también.`,
];

const CITY_CLOSERS_ES: Array<(c: City) => string> = [
  () => `Llame. O llene el formulario. Todo aterriza en mi escritorio. — Eugene`,
  () => `Hablamos pronto. — Eugene Berne, dueño`,
  () => `Esperamos su llamada. — E.B.`,
];

export function comboPersonalCopy(service: Service, city: City, locale: Locale = "en") {
  const seed = hash(`${service.slug}__${city.slug}`);
  const opens = locale === "es" ? COMBO_OPENERS_ES : COMBO_OPENERS;
  const bodies = locale === "es" ? COMBO_BODIES_ES : COMBO_BODIES;
  const closers = locale === "es" ? COMBO_CLOSERS_ES : COMBO_CLOSERS;
  return {
    opener: pick(opens, seed)(service, city),
    body: pick(bodies, seed, 7)(service, city),
    closer: pick(closers, seed, 13)(service, city),
  };
}

// ---- service-only -------------------------------------------------------

const SERVICE_OPENERS: Array<(s: Service) => string> = [
  (s) =>
    `Eugene Berne here — quick note on ${s.name.toLowerCase()}. We see this category every single day across South Florida, so let me cut through the noise.`,
  (s) =>
    `From the owner's desk. ${s.name} is one of the three highest-volume categories we handle. That matters because it means whoever shows up has fixed your specific failure before.`,
  (s) =>
    `Quick word from me, Eugene. The ${s.seoNoun} jobs that go wrong in this market almost always go wrong because the tech didn't carry the right part. We solve that by stocking the trucks for ${s.brands.slice(0, 3).join(", ")}.`,
  (s) =>
    `If you're staring at a broken ${s.seoNoun} right now — Eugene Berne, owner. Here's what we do, how it costs, and what to ask whichever company you end up calling (us or otherwise).`,
  (s) =>
    `Owner take on ${s.name.toLowerCase()}: 70% of these calls finish on the first visit. The other 30% need a part ordered, which we usually have on hand inside 1-3 business days. That's it. No mystery.`,
  (s) =>
    `Direct from me. Two thirds of the ${s.seoNoun} repairs we run cost between $150 and $500 in total. If you've been quoted way more by someone else, get a second opinion — happy to give you ours, no obligation.`,
];

const SERVICE_BODIES: Array<(s: Service) => string> = [
  (s) =>
    `Brands we have parts for on day one: ${s.brands.slice(0, 6).join(", ")}. Brands we service but might need to order parts for: pretty much everything else residential and commercial. We don't farm out high-end work — Sub-Zero, Wolf, Viking, Thermador, Miele all go to senior techs who've seen the quirks.`,
  (s) =>
    `Realistic price ranges so you're not blind. Diagnostic: flat $59, credited to the repair. Simple part replacements: $150-$300. Sealed-system or main-board work: $400-$800. We won't surprise you — every quote comes before any work starts, in writing.`,
  (s) =>
    `Process: you call → dispatch finds you a slot today or first thing tomorrow → tech arrives with a stocked truck → diagnostic, quote, decision, repair. Average on-site time is 45-90 minutes. You don't have to take the day off work.`,
  (s) =>
    `The biggest ${s.seoNoun} mistake I see: customers waiting a week hoping it fixes itself. A motor that's grinding doesn't get better. A sealed system that's leaking burns out the compressor. The longer the wait, the more it costs. Better to spend $59 finding out it's nothing.`,
  (s) =>
    `If you bought your appliance from one of those nationwide warranty programs — call us first anyway. We're usually faster than the warranty network and can sometimes coordinate the part order while you go through the warranty hassle.`,
];

const SERVICE_CLOSERS: Array<(s: Service) => string> = [
  () => `Call, text, book online — all three go to my team. — Eugene`,
  () => `If you want me on the job specifically, mention it when you call. — Eugene Berne`,
  () => `Looking forward to fixing whatever's broken. — E.B.`,
  () => `Easiest is the form at the bottom of this page. — Eugene`,
];

export function servicePersonalCopy(service: Service, locale: Locale = "en") {
  const seed = hash(`svc__${service.slug}`);
  const opens = locale === "es" ? SERVICE_OPENERS_ES : SERVICE_OPENERS;
  const bodies = locale === "es" ? SERVICE_BODIES_ES : SERVICE_BODIES;
  const closers = locale === "es" ? SERVICE_CLOSERS_ES : SERVICE_CLOSERS;
  return {
    opener: pick(opens, seed)(service),
    body: pick(bodies, seed, 3)(service),
    closer: pick(closers, seed, 5)(service),
  };
}

// ---- city-only ----------------------------------------------------------

const CITY_OPENERS: Array<(c: City) => string> = [
  (c) =>
    `${c.name} note from me, Eugene Berne. We've been running calls in this city since the company started — neighborhoods like ${c.neighborhoods.slice(0, 2).join(" and ")} are basically home turf at this point.`,
  (c) =>
    `Owner's pitch on ${c.name}. We have technicians based within a fifteen-minute radius of most of this zip code, which is why same-day actually means same-day. Not "we'll try."`,
  (c) =>
    `Hi — Eugene here. ${c.name} is one of the cities where we have repeat customers calling us yearly, sometimes for completely different appliances. That track record is what I'm trying to build everywhere, not just here.`,
  (c) =>
    `From the founder: ${c.name} customers tend to ask three questions — when can you come, what does it cost, who's the actual tech. Answers in order: today usually, $59 diagnostic flat, one of the people on our /team page (we don't sub out).`,
  (c) =>
    `Quick on ${c.name}: ${c.county} County in general is busy for us. I've personally been to half the streets in ${c.neighborhoods[0]}. Locals know us, and that's the bar I want to keep clearing.`,
];

const CITY_BODIES: Array<(c: City) => string> = [
  (c) =>
    `What's typical here: older high-rises along the coast, single-family inland, plus a fair amount of property management. We do all three. Built-in fridges in coastal condos, full kitchens in residential, commercial laundry for apartment buildings.`,
  (c) =>
    `Coverage covers every ZIP we list (${c.zips.slice(0, 5).join(", ")}, plus the ones we missed). If you're inside ${c.county} County, you're inside our service area, period.`,
  (c) =>
    `Common appliance issues I see in ${c.name}: salt air corrodes refrigerator coils faster than inland. AC humidity stresses dryer vents. Hard water shortens dishwasher life. We know the local failure patterns because we live here too.`,
  (c) =>
    `Here's the thing about ${c.name} — most of my best techs live within ten miles. That means lower fuel, faster response, and an actual person you might recognize next time. The big nationwide chains can't promise that.`,
];

const CITY_CLOSERS: Array<(c: City) => string> = [
  (c) => `Call us. Or fill in the form. Either lands on my desk. — Eugene`,
  (c) => `${c.name} has my number — literally, our main line is in the footer. — E.B.`,
  (c) => `Talk soon. — Eugene Berne, owner`,
  (c) => `Looking forward to it. — E.B.`,
];

export function cityPersonalCopy(city: City, locale: Locale = "en") {
  const seed = hash(`city__${city.slug}`);
  const opens = locale === "es" ? CITY_OPENERS_ES : CITY_OPENERS;
  const bodies = locale === "es" ? CITY_BODIES_ES : CITY_BODIES;
  const closers = locale === "es" ? CITY_CLOSERS_ES : CITY_CLOSERS;
  return {
    opener: pick(opens, seed)(city),
    body: pick(bodies, seed, 3)(city),
    closer: pick(closers, seed, 5)(city),
  };
}
