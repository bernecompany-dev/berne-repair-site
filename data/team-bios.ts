/**
 * Long-form technician + back-office bios for /team/[slug] pages.
 *
 * Source data:
 *   - C:/Users/golds/Berne_Commercial/_data/technicians.json (canonical)
 *   - data/team.ts (UI roster + Person schema fields)
 *
 * Voice rules:
 *   - Technician voice, not marketing voice.
 *   - No fabricated years, cities, or training-program dates.
 *   - Each bio is 200-400 words.
 */

export type RelatedLink = {
  href: string;
  label: string;
};

export type ExtendedBio = {
  lede: string;
  background: string;
  workOn: string;
  whyBerne: string;
  serviceArea: string;
  related: RelatedLink[];
};

/**
 * Keyed by data/team.ts slug. Eugene Berne (owner) is also keyed by his
 * data/team.ts slug "evgenii-knyazev" (legacy — predates the rename to
 * eugene-bernitsky on other sites). Bio reflects the owner voice.
 */
export const TECH_BIOS: Record<string, ExtendedBio> = {
  "evgenii-knyazev": {
    lede:
      "I'm Eugene — founder of Berne Appliance Repair. 18 years in appliance service, 4 of them building this company here in South Florida. I still take service calls. I still back every repair personally.",
    background:
      "Trained as an engineer before moving into appliance service. Picked up refrigeration first because it's the category that punishes shortcuts — refrigerant, compressors, sealed systems, and electronics all have to line up before the job is real. Built Berne Appliance Repair so I'd want to work here: W-2 only, paid training, real trucks, real parts.",
    workOn:
      "Still on the schedule for commercial dispatch, Sub-Zero 648PRO and 700-series diagnostics, Wolf range work, and any control-board call a tech in the field needs a second pair of eyes on. About a third of my week is on the trucks. Two thirds is dispatch, training, and customer escalations that need an owner's signature.",
    whyBerne:
      "I built it. The version of this company I wanted to work at didn't exist, so I made it. Same reason most of the team stays — Berne treats the work seriously.",
    serviceArea:
      "Personal dispatch across South Florida — Miami-Dade, Broward, Palm Beach. English, Russian, conversational Spanish.",
    related: [
      { href: "/brands/sub-zero", label: "Sub-Zero repair" },
      { href: "/brands/wolf", label: "Wolf range service" },
      { href: "/services/refrigerator-repair", label: "Refrigerator repair" },
    ],
  },

  "refat-bekirov": {
    lede:
      "Senior multi-category technician. Refrigeration, premium brands, diagnostics. Reviewers ask for me by name on Google.",
    background:
      "10 years across both residential premium-brand work and commercial routes. I learned early that the variety keeps me sharp — every category has a different failure pattern, and you stop relying on shortcuts when the next job might be something completely different.",
    workOn:
      "Sub-Zero and Wolf premium service, LG and Samsung refrigerator inverter boards, GE Monogram diagnostics, washer and dryer drive trains. Florida technician license and EPA 608 Universal — full sealed-system authority for the refrigerant work that comes up on built-in fridges.",
    whyBerne:
      "Honest dispatch, honest billing, and a team I respect. That's why I've stayed.",
    serviceArea:
      "Premium routes across Miami-Dade, Broward, and Palm Beach — Aventura, Bal Harbour, Sunny Isles, Boca Raton. English and Russian.",
    related: [
      { href: "/services/refrigerator-repair", label: "Refrigerator repair" },
      { href: "/brands/sub-zero", label: "Sub-Zero service" },
      { href: "/brands/lg", label: "LG service" },
    ],
  },

  "akhmed-osmanov": {
    lede:
      "Commercial laundry and refrigeration technician. Property managers and laundromat owners call me by name.",
    background:
      "Started in the former Soviet bloc on industrial refrigeration before crossing over to South Florida commercial work. The first thing I learned: a laundromat with three dead UniMacs is not three identical problems. Patience and a multimeter solve more jobs than any parts catalog.",
    workOn:
      "Commercial laundry routes — UniMac, Speed Queen, Electrolux Professional. Coin and card payment systems, drive trains, gas dryer ignition and venting, plus refrigeration crossover work when a residential built-in goes down on the same site.",
    whyBerne:
      "Fleet, dispatch, and parts. All the things that used to slow me down when I was solo.",
    serviceArea:
      "Routes across Miami-Dade and Broward, with regular laundromat stops in Hollywood, Pembroke Pines, and North Miami. English and Russian.",
    related: [
      { href: "/services/washer-repair", label: "Washer repair" },
      { href: "/services/dryer-repair", label: "Dryer repair" },
      { href: "/brands/whirlpool", label: "Whirlpool service" },
    ],
  },

  "andrei-lavrov": {
    lede:
      "Senior refrigeration technician with a strong sealed-system background. EPA 608 Universal — compressor swaps and refrigerant work other shops won't touch.",
    background:
      "Trained on industrial equipment in Eastern Europe before moving into US appliance service. I spent the first few years specifically chasing leak-detection and recovery work, because that's the corner of the trade where reading the gauges wrong gets expensive fast.",
    workOn:
      "Built-in refrigerator service — Sub-Zero, Thermador, GE Monogram. Compressor failures, evaporator coil leaks, sealed-system recharge. I keep recovery machines and nitrogen on the truck — no shortcut refrigerant pulls.",
    whyBerne:
      "Real parts inventory, real backup from senior techs, and a dispatcher who actually reads the notes I leave at end-of-day.",
    serviceArea:
      "Refrigerator calls across Broward and Palm Beach — Fort Lauderdale, Boca Raton, Delray Beach, Boynton. English and Russian.",
    related: [
      { href: "/services/refrigerator-repair", label: "Refrigerator repair" },
      { href: "/brands/sub-zero", label: "Sub-Zero service" },
      { href: "/brands/thermador", label: "Thermador service" },
    ],
  },

  "dzmitrii-kitou": {
    lede:
      "Laundry specialist. Drum bearings, transmissions, drain pump rebuilds — the laundry jobs other techs flag as too hard.",
    background:
      "Came up on industrial laundry equipment in Eastern Europe, then transitioned to US residential and light-commercial work. Coin operations and card-reader integrations were the steepest learning curve when I started here — those electronics are nothing like what's installed overseas.",
    workOn:
      "Whirlpool, LG, Samsung, Maytag, and Speed Queen washers and dryers. Front-load and top-load — both feel the same once you have the rear panel off. Gas dryer ignition and venting, drum bearings, drive trains, and any drain pump that's been on borrowed time for a year.",
    whyBerne:
      "Dispatch knows my hard-job calibration. They send me the difficult tickets and protect my schedule from the easy ones, so I can actually finish what I start.",
    serviceArea:
      "Across Miami-Dade and Broward — Hialeah, Miami Lakes, Pembroke Pines, Davie. English and Russian.",
    related: [
      { href: "/services/washer-repair", label: "Washer repair" },
      { href: "/services/dryer-repair", label: "Dryer repair" },
      { href: "/brands/lg", label: "LG laundry service" },
    ],
  },

  mike: {
    lede:
      "Sub-Zero and Wolf specialist on the team. 5 years on built-in columns, integrated wine coolers, and dual-zone units. Factory-trained on sealed systems.",
    background:
      "I got into refrigeration through restaurant work — bussing tables turned into bussing condenser coils, and I never went back. Picked up factory training on Sub-Zero sealed systems early, and have stayed on the premium side of the catalog ever since.",
    workOn:
      "Built-in columns (Sub-Zero 700, 736TC, integrated wine), Wolf ranges and ovens, Thermador refrigeration. The kind of sealed-system work that needs an EPA-certified tech with a recovery machine in the truck. I carry digital manifold gauges, micron meter, and a leak detector on every refrigerant call.",
    whyBerne:
      "Honest dispatch. Honest pricing. I've worked at shops that quote a flat compressor swap before they've pulled the panel — Berne won't do that.",
    serviceArea:
      "Primary coverage Hallandale Beach, Aventura, Sunny Isles, Miami Beach, and the Brickell corridor. English and Russian.",
    related: [
      { href: "/brands/sub-zero", label: "Sub-Zero repair" },
      { href: "/brands/wolf", label: "Wolf service" },
      { href: "/services/refrigerator-repair", label: "Refrigerator repair" },
    ],
  },

  "nikita-maslakov": {
    lede:
      "Service technician — dryers, gas appliances, vent installation. Quick, polite, knowledgeable; that's the customer feedback that keeps coming back.",
    background:
      "Crossed over from a mechanical trade and built up appliance-side skills with an emphasis on gas systems. Gas is one of those categories where the smaller details matter most — ignitor cleanliness, gas pressure, venting clearances.",
    workOn:
      "Gas dryers (Whirlpool, Maytag, Samsung), dryer vent installation and re-routing, electric ranges, microwaves. Ignition control board diagnostics. EPA 608 certified for refrigerant work that comes up.",
    whyBerne:
      "Training budget — Berne pays for me to stay current on factory courses, not just to ship me to a job.",
    serviceArea:
      "Routes across Miami-Dade and Broward, with regular dryer-vent jobs in Aventura, North Miami Beach, and Hollywood high-rises. English and Russian.",
    related: [
      { href: "/services/dryer-repair", label: "Dryer repair" },
      { href: "/brands/whirlpool", label: "Whirlpool service" },
      { href: "/brands/samsung", label: "Samsung service" },
    ],
  },

  "nikita-shirshov": {
    lede:
      "Service technician — ovens, ranges, cooktops. Premium cooking equipment is what I'm called for.",
    background:
      "Worked through a few smaller shops before joining Berne. The cooking side is detail work — gas valves, ignitors, electronic ignition controls, and the kind of operator-error issues that resolve themselves once someone explains what's actually happening.",
    workOn:
      "Wolf, Viking, Thermador ranges and ovens; KitchenAid and GE cooktops; built-in microwaves; warming drawers. Gas and electric, ignition modules, valve diagnostics.",
    whyBerne:
      "The fleet stocks the right brand-specific parts. I'm not waiting on overnight shipping every time a Viking ignitor blows.",
    serviceArea:
      "Routes across Miami-Dade — Miami Beach, Brickell, Coconut Grove, Coral Gables. English and Russian.",
    related: [
      { href: "/services/oven-repair", label: "Oven repair" },
      { href: "/brands/wolf", label: "Wolf service" },
      { href: "/brands/viking", label: "Viking service" },
    ],
  },

  "maksim-shiryagin": {
    lede:
      "Service technician. Patient and thorough — would rather take an extra 30 minutes than guess at a root cause.",
    background:
      "Started in industrial electronics overseas and crossed into appliance service in South Florida. The diagnostic workflow is where I add the most value: read the codes, verify the inputs, then make a parts decision — not the other way around.",
    workOn:
      "Control board diagnostics on multi-brand kitchens — Wolf, Viking, Thermador, KitchenAid, GE Monogram, Sub-Zero. I keep an oscilloscope and a meter that actually reads true-RMS in the truck because clamps lie.",
    whyBerne:
      "The team is built around technicians who think first. That's not the norm in this trade.",
    serviceArea:
      "Multi-county dispatch — anywhere a control-board call has stumped the first tech. English and Russian.",
    related: [
      { href: "/services/refrigerator-repair", label: "Refrigerator repair" },
      { href: "/services/oven-repair", label: "Oven repair" },
      { href: "/brands/sub-zero", label: "Sub-Zero service" },
    ],
  },

  "denis-novitskii": {
    lede:
      "Service technician. General appliance repair, same-day calls. Customers on Google reviews ask for me by name — \"Dennis was great\" lands often.",
    background:
      "Started in residential refrigeration and moved into multi-category work after a year. I'm not the fastest tech on the team but I leave the cleanest notes, which matters when the next call on the same site lands six months later.",
    workOn:
      "Refrigerators, washers, dryers, dishwashers, ovens. The kind of full-route day where every call is a different brand and a different failure mode. Component-level diagnostics that go past \"replace the board\" and find the actual upstream cause.",
    whyBerne:
      "Honest shop. I don't have to upsell anything. When I quote a job it's the job that's actually needed.",
    serviceArea:
      "Across Broward — Hollywood, Dania Beach, Fort Lauderdale, Sunrise. English and Russian.",
    related: [
      { href: "/services/refrigerator-repair", label: "Refrigerator repair" },
      { href: "/services/dishwasher-repair", label: "Dishwasher repair" },
      { href: "/services/washer-repair", label: "Washer repair" },
    ],
  },

  dzmitrii: {
    lede:
      "Service technician focused on refrigerators, ice makers, and dishwashers.",
    background:
      "Moved into US appliance service after a few years of mixed residential and commercial work overseas. I keep my diagnostics conservative — gauges on, panels off, decision after. The job pays for the slow approach the first time and saves you the second.",
    workOn:
      "Built-in and freestanding refrigerators, undercounter ice makers, residential dishwashers (Bosch, KitchenAid, Miele, GE). Component-level work on condensers, evaporator fans, and electronic temperature controls.",
    whyBerne:
      "Berne has the parts on the truck. That alone is the difference between a same-day fix and a return visit.",
    serviceArea:
      "Across Broward and Palm Beach. English and Russian.",
    related: [
      { href: "/services/refrigerator-repair", label: "Refrigerator repair" },
      { href: "/services/dishwasher-repair", label: "Dishwasher repair" },
      { href: "/services/ice-maker-repair", label: "Ice maker repair" },
    ],
  },

  "ruslan-hordieiev": {
    lede:
      "Service technician with strong front-load laundry coverage. Reach-ins, walk-ins, and washers.",
    background:
      "Came through HVAC and crossed into appliance work. Front-load laundry is its own animal — door seals, drive trains, drum bearings, and digital control boards that look nothing like top-load systems.",
    workOn:
      "Front-load washers (LG, Samsung, Whirlpool, Maytag), dryers, refrigerator electrical, and the kind of motor and pump circuit diagnostics that need real meter discipline rather than parts swapping.",
    whyBerne:
      "Real training time and real parts inventory. Both make the work feel possible.",
    serviceArea:
      "Routes across Broward and northern Miami-Dade — Hollywood, Hallandale Beach, Aventura, North Miami. English and Russian.",
    related: [
      { href: "/services/washer-repair", label: "Washer repair" },
      { href: "/services/dryer-repair", label: "Dryer repair" },
      { href: "/brands/lg", label: "LG service" },
    ],
  },

  "shokhrat-agabekov": {
    lede:
      "Service technician. General service, microwaves, ranges, warming systems.",
    background:
      "Mechanical background before crossing into appliance service. The cooking line was an easy choice — I prefer the immediacy of gas and ignition work to the slower-paced refrigeration troubleshooting cycle.",
    workOn:
      "Whirlpool, Maytag, Samsung, LG ranges. Built-in and over-the-range microwaves. Warming drawers. Gas valves, ignition modules, electric elements.",
    whyBerne:
      "Berne pays for ongoing factory training. That matters in the cooking-line segment where ignition systems evolve every model year.",
    serviceArea:
      "Across Miami-Dade and Broward. English and Russian.",
    related: [
      { href: "/services/oven-repair", label: "Oven repair" },
      { href: "/services/microwave-repair", label: "Microwave repair" },
      { href: "/brands/whirlpool", label: "Whirlpool service" },
    ],
  },

  "valerii-basov": {
    lede:
      "Service technician. Dishwashers, ovens, cooking appliances.",
    background:
      "Worked on industrial systems before moving into residential service. I bring a methodical pace and notes-heavy diagnostic habit — every call gets a written summary, because the next tech on that address shouldn't have to start from zero.",
    workOn:
      "Bosch, KitchenAid, Miele dishwashers. GE, KitchenAid, Wolf ovens and ranges. Cooktops — induction and gas. Component-level diagnostics on control boards and motors.",
    whyBerne:
      "Multi-category routes are good for me — I'd rather solve four different problems in a day than do the same one four times.",
    serviceArea:
      "Across Miami-Dade and Broward. English and Russian.",
    related: [
      { href: "/services/dishwasher-repair", label: "Dishwasher repair" },
      { href: "/services/oven-repair", label: "Oven repair" },
      { href: "/brands/kitchenaid", label: "KitchenAid service" },
    ],
  },

  "viktor-kamenschikov": {
    lede:
      "Service technician. Refrigerators and built-in repairs.",
    background:
      "Long career in refrigeration, much of it on rebuild and overhaul work rather than break-fix. There's a difference between replacing a compressor and rebuilding a system that's been wrong for three years — I prefer the second job.",
    workOn:
      "Built-in refrigerators (Sub-Zero 600, 700, integrated wine), semi-hermetic compressor service, sealed system recharge, defrost timing, and refrigerant management. Florida technician license and EPA 608 Universal.",
    whyBerne:
      "Berne lets me take the time the job actually needs. The shops that rush these jobs are the ones that get called back in three months.",
    serviceArea:
      "Across Miami-Dade and Broward. English and Russian.",
    related: [
      { href: "/services/refrigerator-repair", label: "Refrigerator repair" },
      { href: "/brands/sub-zero", label: "Sub-Zero repair" },
      { href: "/brands/thermador", label: "Thermador service" },
    ],
  },

  boris: {
    lede:
      "Service technician — general service, same-day dispatch.",
    background:
      "Picked up appliance repair after a few years in adjacent trades. I do steady, well-documented work — not flashy, but reliable. The team uses me for any high-volume routing day when same-day dispatch matters.",
    workOn:
      "Refrigerators, washers, dryers, dishwashers, microwaves — full multi-category coverage. Whirlpool, GE, LG, Samsung, Maytag, KitchenAid. Diagnostic-first approach on every call.",
    whyBerne:
      "I like steady work and honest paperwork. Berne provides both.",
    serviceArea:
      "Across Miami-Dade and Broward. English and Russian.",
    related: [
      { href: "/services/refrigerator-repair", label: "Refrigerator repair" },
      { href: "/services/washer-repair", label: "Washer repair" },
      { href: "/services/dishwasher-repair", label: "Dishwasher repair" },
    ],
  },
};

/**
 * Office / dispatch & operations team. Real names + photos supplied by Eugene
 * 2026-06 (source: C:/Users/golds/Team). Photos optimized to webp, max 800px,
 * EXIF stripped — see scripts/optimize-office-photos.mjs.
 *
 * Voice rules match TECH_BIOS: role-truthful only — nothing invented about
 * individuals beyond what their role actually entails.
 */
export type BackOfficeMember = {
  slug: string;
  name: string;
  role: string;
  /** Spanish role title for /es/team. */
  roleEs: string;
  photo: string;
  /** One-line, role-truthful fact shown on the /team card. */
  fact: string;
  /** Spanish card fact for /es/team. */
  factEs: string;
  bio: ExtendedBio;
};

export const BACK_OFFICE: BackOfficeMember[] = [
  {
    slug: "bogdan",
    name: "Bogdan",
    role: "Operational Director",
    roleEs: "Director de Operaciones",
    photo: "/images/team/bogdan.webp",
    fact: "Runs the day-to-day operation — every route, escalation, and warranty call crosses his desk.",
    factEs: "Dirige la operación diaria — cada ruta, escalación y garantía pasa por su escritorio.",
    bio: {
      lede:
        "I'm Bogdan — Operational Director at Berne Appliance Repair. If a job involves more than one truck, one parts order, or one unhappy customer, it ends up on my desk.",
      background:
        "Directing operations at a fleet shop means owning everything between the phone ringing and the invoice closing: dispatch policy, technician load, the parts pipeline, warranty escalations. The role exists so the owner can stay close to the trucks and the techs can stay on the tools.",
      workOn:
        "The daily dispatch board across Miami-Dade, Broward, and Palm Beach. Escalations that need a decision, not a script. Scheduling for both the field roster and the office team, and the review of every callback so the same mistake doesn't happen twice.",
      whyBerne:
        "Berne runs on real software, real technician notes, and real accountability. That's rare in this trade — and it's what makes the director job possible.",
      serviceArea:
        "Oversees the full operation across Miami-Dade, Broward, and Palm Beach.",
      related: [
        { href: "/request-dispatch", label: "Request service" },
        { href: "/about", label: "About Berne Appliance Repair" },
      ],
    },
  },
  {
    slug: "artem",
    name: "Artem",
    role: "Operational Manager & IT",
    roleEs: "Gerente de Operaciones e IT",
    photo: "/images/team/artem.webp",
    fact: "Keeps the dispatch software, phones, and parts systems online.",
    factEs: "Mantiene en línea el software de despacho, los teléfonos y los sistemas de repuestos.",
    bio: {
      lede:
        "I'm Artem — Operational Manager and the IT side of Berne. The dispatch software, the phone system, the parts lookups, the website forms: if it has a screen, it's mine.",
      background:
        "A fleet of technicians generates a lot of moving data — tickets, routes, parts orders, invoices, photos from the field. My job is keeping the systems that carry that data fast and boring. The good kind of boring.",
      workOn:
        "Service-management software administration, phone and messaging systems, parts-supplier tooling, and the operational reporting the dispatch desk runs on. Plus the everyday manager work: schedules, handoffs, process fixes.",
      whyBerne:
        "Most repair shops treat software as an afterthought. Berne treats it as infrastructure.",
      serviceArea:
        "Systems and operations support for the full Berne service area.",
      related: [
        { href: "/request-dispatch", label: "Request service" },
        { href: "/services", label: "Service catalog" },
      ],
    },
  },
  {
    slug: "gabe",
    name: "Gabe",
    role: "Operational Manager",
    roleEs: "Gerente de Operaciones",
    photo: "/images/team/gabe.webp",
    fact: "Coordinates technicians, parts, and schedules so jobs close on the first visit.",
    factEs: "Coordina técnicos, repuestos y horarios para cerrar el trabajo en la primera visita.",
    bio: {
      lede:
        "I'm Gabe — Operational Manager. My job is simple to say and hard to do: the right tech, with the right part, at the right address, on time.",
      background:
        "Operations management at Berne covers the seam between dispatch and the field — making sure what the customer was promised on the phone is what actually happens at the door.",
      workOn:
        "Technician scheduling and load balancing, parts-on-truck verification before the morning rollout, same-day reschedules when a job runs long, and quality follow-up on completed work.",
      whyBerne:
        "The technicians here are genuinely good, which means operations can promise things and keep them.",
      serviceArea:
        "Coordinates routes across Miami-Dade, Broward, and Palm Beach.",
      related: [
        { href: "/services", label: "Service catalog" },
        { href: "/team", label: "Meet the technicians" },
      ],
    },
  },
  {
    slug: "keith",
    name: "Keith",
    role: "Dispatch Lead Operator",
    roleEs: "Operador Líder de Despacho",
    photo: "/images/team/keith.webp",
    fact: "Leads the dispatch desk routing 18 technicians across three counties.",
    factEs: "Lidera la mesa de despacho que dirige a 18 técnicos en tres condados.",
    bio: {
      lede:
        "I'm Keith — lead operator on the dispatch desk. When you call Berne, my desk decides which technician shows up and how fast.",
      background:
        "Dispatch is the difference between a same-day fix and a return visit. The lead role owns the desk: call triage, routing decisions, and coaching the operators who keep the line answered.",
      workOn:
        "Live routing across three counties, urgent-call triage, ETA windows customers can actually plan around, and the end-of-day handoff notes that make tomorrow's board work.",
      whyBerne:
        "Dispatch here runs on real technician notes, not guesses. That lets me put the right person on the right job.",
      serviceArea:
        "Dispatch coverage across Miami-Dade, Broward, and Palm Beach.",
      related: [
        { href: "/request-dispatch", label: "Request service" },
        { href: "/areas", label: "Service areas" },
      ],
    },
  },
  {
    slug: "jayla",
    name: "Jayla",
    role: "Dispatch Operator",
    roleEs: "Operadora de Despacho",
    photo: "/images/team/jayla.webp",
    fact: "Answers your call 7 days a week and books the soonest window.",
    factEs: "Atiende su llamada los 7 días de la semana y reserva la ventana más cercana.",
    bio: {
      lede:
        "I'm Jayla — dispatch operator. Mine is often the first voice you hear when you call Berne.",
      background:
        "A dispatch operator's job is to turn a stressful morning — broken fridge, flooded laundry room — into a booked time window and a tech on the way.",
      workOn:
        "Inbound calls seven days a week, appointment booking, brand-and-model intake so the technician arrives prepared, and status updates while your job is open.",
      whyBerne:
        "I get to actually fix the caller's day. Most phone jobs can't say that.",
      serviceArea:
        "Phone coverage for all Berne service areas.",
      related: [
        { href: "/contact", label: "Contact Berne Appliance Repair" },
        { href: "/request-dispatch", label: "Request service" },
      ],
    },
  },
  {
    slug: "lina",
    name: "Lina",
    role: "Dispatch Operator",
    roleEs: "Operadora de Despacho",
    photo: "/images/team/lina.webp",
    fact: "Tracks every ticket from first call to finished repair.",
    factEs: "Sigue cada ticket desde la primera llamada hasta la reparación terminada.",
    bio: {
      lede:
        "I'm Lina — dispatch operator. I track every open ticket from first call to finished repair.",
      background:
        "Once a job is booked, somebody has to make sure it doesn't fall through the cracks — the part arrives, the tech is briefed, the customer knows the window. That's the operator's craft.",
      workOn:
        "Appointment confirmations, parts-arrival follow-ups, rescheduling logistics, and the post-repair check-in that closes the loop on every job.",
      whyBerne:
        "The notes culture. Every technician writes down what happened, so I never have to tell a customer \"I don't know.\"",
      serviceArea:
        "Phone and scheduling coverage for the full Berne service area.",
      related: [
        { href: "/request-dispatch", label: "Request service" },
        { href: "/services", label: "Service catalog" },
      ],
    },
  },
  {
    slug: "stacey",
    name: "Stacey",
    role: "Dispatch Operator",
    roleEs: "Operadora de Despacho",
    photo: "/images/team/stacey.webp",
    fact: "Confirms appointments and keeps your ETA window honest.",
    factEs: "Confirma las citas y mantiene honesta su ventana de llegada.",
    bio: {
      lede:
        "I'm Stacey — dispatch operator. Appointment confirmations and ETA updates are my lane: you should never have to wonder where your technician is.",
      background:
        "Service visits fail when communication fails. The operator role exists to keep customers ahead of the schedule, not chasing it.",
      workOn:
        "Confirmation calls, day-of ETA updates, rebooking when life happens on the customer's side, and keeping the dispatch board honest about what's actually achievable today.",
      whyBerne:
        "Berne gives operators real schedules and real notes to share — so the updates I give are true.",
      serviceArea:
        "Phone coverage across Miami-Dade, Broward, and Palm Beach.",
      related: [
        { href: "/contact", label: "Contact Berne Appliance Repair" },
        { href: "/areas", label: "Service areas" },
      ],
    },
  },
];

export const BACK_OFFICE_BY_SLUG: Record<string, BackOfficeMember> =
  Object.fromEntries(BACK_OFFICE.map((m) => [m.slug, m]));
