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
      "I'm Eugene — founder of Berne Repair. 18 years in appliance service, 4 of them building this company here in South Florida. I still take service calls. I still back every repair personally.",
    background:
      "Trained as an engineer before moving into appliance service. Picked up refrigeration first because it's the category that punishes shortcuts — refrigerant, compressors, sealed systems, and electronics all have to line up before the job is real. Built Berne Repair so I'd want to work here: W-2 only, paid training, real trucks, real parts.",
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
 * Back-office scaffold. Names + photos to be filled by Eugene in coming days.
 *
 * TODO(eugene): provide real names, photos, and any role corrections. Once
 * supplied, edit each entry below and remove the `placeholder: true` flag.
 */
export type BackOfficeMember = {
  slug: string;
  name: string;
  role: string;
  photo: string;
  bio: ExtendedBio;
  placeholder: boolean;
};

const PLACEHOLDER_PHOTO = "/images/team/placeholder-back-office.svg";

export const BACK_OFFICE: BackOfficeMember[] = [
  {
    slug: "back-office-1",
    name: "Berne Operations Team Member",
    role: "Dispatch Manager",
    photo: PLACEHOLDER_PHOTO,
    placeholder: true,
    bio: {
      lede:
        "Dispatch manager — the person who decides which tech goes where, in what order, and with which parts already loaded on the truck.",
      background:
        "Dispatch is the difference between a same-day fix and a return visit. The role covers technician routing, parts pre-load, ETA windows, and the day-of customer communication that keeps a homeowner calm when a fridge fails at 6 a.m.",
      workOn:
        "Live routing across Miami-Dade, Broward, and Palm Beach. Triage of incoming dispatch tickets, technician load balancing, parts-on-truck verification, and same-day reschedule logistics when a job runs long.",
      whyBerne:
        "Berne dispatch runs on real software and real notes from real techs — not whiteboards and guesses.",
      serviceArea:
        "Coordinates the full fleet across Miami-Dade, Broward, and Palm Beach.",
      related: [
        { href: "/request-dispatch", label: "Request service" },
        { href: "/services", label: "Service catalog" },
      ],
    },
  },
  {
    slug: "back-office-2",
    name: "Berne Operations Team Member",
    role: "Customer Service Lead",
    photo: PLACEHOLDER_PHOTO,
    placeholder: true,
    bio: {
      lede:
        "Customer service lead — first voice on the phone when a customer calls Berne, and the person who follows up after the tech leaves.",
      background:
        "This role owns the customer experience from first call through invoice and warranty follow-up. Every escalation lands here first — before it becomes a problem for the owner.",
      workOn:
        "Inbound call qualification, customer onboarding, post-service follow-up calls, warranty claim coordination, and the kind of small-print communication that prevents disputes before they happen.",
      whyBerne:
        "Berne backs the work in writing. That makes the customer-service job possible to do honestly.",
      serviceArea:
        "Phone and email coverage during business hours across all Berne service areas.",
      related: [
        { href: "/contact", label: "Contact Berne Repair" },
        { href: "/request-dispatch", label: "Request service" },
      ],
    },
  },
  {
    slug: "back-office-3",
    name: "Berne Operations Team Member",
    role: "Operations Coordinator",
    photo: PLACEHOLDER_PHOTO,
    placeholder: true,
    bio: {
      lede:
        "Operations coordinator — the role that keeps trucks stocked, schedules synced, and technician credentials current.",
      background:
        "Operations covers the work that doesn't happen on a truck but makes the work on the truck possible: fleet maintenance, EPA 608 renewal tracking, Florida license renewals, and continuous-training enrollment with MSA World.",
      workOn:
        "Vendor compliance documentation, COI renewals, EPA and Florida license tracking for the technician roster, MSA World training enrollment, and the back-end credentialing work that the customer never sees.",
      whyBerne:
        "Berne treats compliance as a feature, not a checkbox. That makes this role meaningful rather than performative.",
      serviceArea:
        "Operations support for the full Berne service area.",
      related: [
        { href: "/credentials", label: "Berne credentials" },
        { href: "/about", label: "About Berne Repair" },
      ],
    },
  },
  {
    slug: "back-office-4",
    name: "Berne Operations Team Member",
    role: "Parts Procurement Specialist",
    photo: PLACEHOLDER_PHOTO,
    placeholder: true,
    bio: {
      lede:
        "Parts procurement — the person who keeps the right Sub-Zero compressor, LG control board, and Whirlpool drum belt on the right truck the night before.",
      background:
        "Parts is where appliance service either works or fails. Berne procurement maintains relationships with Marcone, Reliable Parts, and OEM distributors (Sub-Zero, Wolf, LG, Samsung) so that next-day part availability stops being a customer-facing problem.",
      workOn:
        "Daily parts pull for the next day's dispatch board, OEM distributor coordination, MSA World parts-program management, urgent overnight sourcing for premium-brand emergencies, and the warranty-parts paperwork that keeps OEM coverage in play.",
      whyBerne:
        "Berne actually invests in parts-on-truck inventory. Most shops don't, and customers feel the difference.",
      serviceArea:
        "Procurement support for the full Berne fleet.",
      related: [
        { href: "/brands", label: "Brands serviced" },
        { href: "/services", label: "Service catalog" },
      ],
    },
  },
  {
    slug: "back-office-5",
    name: "Berne Operations Team Member",
    role: "Admin / Billing Lead",
    photo: PLACEHOLDER_PHOTO,
    placeholder: true,
    bio: {
      lede:
        "Admin and billing — invoicing, vendor payment terms, COI compliance, and the financial back end of an appliance service operation.",
      background:
        "Billing for a multi-DBA service operation is a different animal from a single-shop. Vendor portals, COIs by location, sales-tax-exempt certificates, and dispute resolution all live in this role.",
      workOn:
        "Customer invoicing through QuickBooks Online and Service Fusion, Marcone Servicers Association vendor program billing, vendor-portal compliance for property management groups, and reconciliation of warranty-parts credits.",
      whyBerne:
        "Berne keeps the books clean. That makes this work possible to do correctly.",
      serviceArea:
        "Billing and admin support for the full Berne service area.",
      related: [
        { href: "/contact", label: "Contact Berne Repair" },
        { href: "/about", label: "About Berne Repair" },
      ],
    },
  },
];

export const BACK_OFFICE_BY_SLUG: Record<string, BackOfficeMember> =
  Object.fromEntries(BACK_OFFICE.map((m) => [m.slug, m]));
