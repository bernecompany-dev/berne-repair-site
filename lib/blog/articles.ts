/**
 * Blog article registry. Inline markdown content keeps the build simple
 * (no MDX pipeline, no remark dep) while still allowing date-gated
 * publishing via `publishedAt`. New articles surface within an hour of
 * their publish date thanks to ISR `revalidate: 3600` on the blog routes.
 */

export type Article = {
  slug: string;
  title: string;
  description: string;
  publishedAt: Date;
  updatedAt?: Date;
  author: string;
  readingMinutes: number;
  /** Tag used in related-articles fallback. */
  topic: "sub-zero" | "wolf" | "viking-thermador" | "miele" | "warranty";
  /** Markdown body. Rendered by lib/blog/render.ts. */
  body: string;
};

const AUTHOR = "Evgenii Knyazev, Owner — Berne Repair";

export const ARTICLES: Article[] = [
  {
    slug: "sub-zero-refrigerator-troubleshooting-miami",
    title: "Sub-Zero Refrigerator Won't Cool — Troubleshooting Before You Call",
    description:
      "A Sub-Zero owner's field guide: condenser cleaning, gasket checks, vacuum-condenser fan reset, and when the dual compressor really needs replacement. Specific to South Florida heat and salt air.",
    publishedAt: new Date("2026-05-22T13:00:00Z"),
    author: AUTHOR,
    readingMinutes: 7,
    topic: "sub-zero",
    body: `A client in Bal Harbour called us at 6 AM on a Saturday. Her 36" Sub-Zero 648PRO had been running warm for three days. The freezer side held, the fridge side drifted up to 52°F. She'd already lost a tray of Kobe beef and a bottle of opened Domaine Leflaive. By the time we arrived, the cause was obvious from across the kitchen: a coil pack matted with eight years of dust and Atlantic salt mist. We vacuumed it, brushed the fins, ran a 15-minute defrost cycle, and the unit was back to 38°F before we left the building.

That visit is the most common Sub-Zero call we get in Miami-Dade. Before you book any technician — ours or anyone else's — there are five checks an owner can run safely. Three of them resolve about 40% of "not cooling" complaints on built-in Sub-Zero units we see.

## Check the condenser grille first

Sub-Zero's own service literature recommends cleaning the condenser every six months. In South Florida, with construction dust, sea salt aerosol, and 80% summer humidity, that interval drops to every three to four months. Pet owners closer to two.

Pop the upper grille off your built-in (units like the 648PRO, 632, BI-36, and the newer PRO 48). On most models the grille tilts forward and lifts free without tools. You're looking at the condenser coil and a pair of fans. Black dust shouldn't form a felt mat across the fins. If it has, that's your problem. A soft brush and a HEPA shop vacuum bring it back to bare aluminum in 20 minutes. Don't use compressed air — it pushes debris deeper into the coil.

Run the unit for an hour after cleaning before judging the result. The compressor needs time to recover from the heat soak. We see homeowners panic and call after 15 minutes when the fix only needed patience.

## Listen for the condenser fan

Sub-Zero uses two fans behind that grille on most full-size built-ins: one for the condenser, one for the compressor compartment. Open the grille and listen. Both should spin smoothly without bearing noise. A fan that's stopped, dragging, or screeching is a $180 to $320 part replacement depending on model — common on units past the eight-year mark.

The most-replaced fan we stock is the 4204130 condenser fan motor for 600 and 700 series builts-ins. On Pro 48 units (PRO 4850G, 7857000) the fan is the 7027360 assembly. Both are field-serviceable in about 45 minutes.

## Inspect the door gaskets — both of them

A Sub-Zero with a cracked, hardened, or pulled-away door gasket runs the compressor 30 to 50% longer than it should. The freezer side often hides the problem because freezer gaskets fail less from coastal humidity than fridge-side gaskets. Pull a dollar bill across the seal at six points (corners and middle of each side). If it slides out without resistance, the gasket is done.

Gaskets are model-specific and not cheap — figure $140 to $260 a side — but installation takes 20 minutes and pays for itself in compressor longevity. Sub-Zero builds for 20-year service life; a tired gasket cuts that to twelve.

## Reset the electronics

Built-in Sub-Zeros use a microprocessor board that can lock into a defrost-stuck or sensor-fault state after a brownout. We see this every hurricane season. Power-cycling the unit at the breaker (not just unplugging — full breaker off for two minutes) clears most soft faults.

If your display shows codes like EC, OF, vac C, or 1°F where the freezer should be 0°F, that's a sensor or electronics fault that an owner can't resolve. Take a photo of the code before you reset; we'll need it. On 700 series and newer 7000 series units, the system board is part 7012392 — diagnostic and replacement together runs $480 to $720 depending on access.

## The compressor question

This is the call we hate to make. A Sub-Zero compressor failure on a built-in unit past warranty is a $1,400 to $2,100 repair on a single-compressor model, $2,200 to $3,400 on dual-compressor 600 and 700 series. The math against replacement gets tight — but only if you're comparing to another Sub-Zero. Against a builder-grade 36" French-door, you'd be giving up the cabinet integration, the vacuum condenser, and the longevity.

How to tell if it's the compressor: the unit hums but won't cool, no fan noise from the grille area, and the lines off the compressor stay room-temperature instead of warming up after startup. If your compressor is original on a 1998-2008 unit, replacement is the right call — those units have another decade in them with a fresh compressor.

## South Florida coastal context

Salt-air corrosion on Sub-Zero condensers in Bal Harbour, Fisher Island, Sunny Isles, and Key Biscayne is real. We've pulled condensers off three-year-old units in oceanfront condos that looked like they'd done a decade inland. If you're within two blocks of the water, factor a quarterly grille clean into your maintenance budget. Spend twenty minutes with a vacuum every season and you'll never call us about cooling.

Hurricane prep matters too. Before a named storm, set the unit to its coldest setting eighteen hours before landfall. The thermal mass holds 36-hour outages without losing critical zones. After power restoration, give the compressor ten minutes before opening doors — the suction-discharge balance needs to equalize.

## Condo high-rise complications

Built-in Sub-Zeros in Miami high-rises add two service factors most owners haven't considered. The first is condenser ventilation: a Sub-Zero needs clear airflow off the front grille, period. In tight galley kitchens common in Brickell and Sunny Isles buildings, owners stack cookbooks or wine bottles on top of the unit and assume the air goes up. It does not — Sub-Zero's airflow is front-to-front, drawing through the lower grille and exhausting through the upper. Block either and the compressor heat-soaks.

The second is grid power quality. High-rise transformers serving 30 to 60 units swing voltage during peak HVAC demand on August afternoons. Sub-Zero's electronics are filtered well, but the cumulative effect on long-life electrolytic capacitors is real. A whole-home surge protector at the panel — about $450 installed — is the single best longevity investment for any premium-built-in installation in a Florida high-rise.

## What a diagnostic visit actually does

Before you book, here's what a Berne Repair tech does on a Sub-Zero diagnostic call so you know what you're paying for. Five steps: pressure-test the condenser fans at full load, current-draw measurement on the compressor against Sub-Zero's spec table, evaporator coil temperature differential check, gasket integrity test with a smoke pencil, and electronics fault log download from the system board. The whole visit is 40 to 60 minutes. We leave you with either a working unit or a written quote with parts numbers and labor breakdown — no upsell, no diagnostic fee on top of the $59 call.

## When to call us

If you've cleaned the condenser, confirmed both fans spin, checked the gaskets, and the unit still drifts warm after two hours, the next step is diagnostic. We charge a $59 service call, applied toward any repair. Berne Repair runs factory-trained Sub-Zero technicians out of a Miami truck stocked with the common 600 and 700 series parts. Call (305) 520-7833 — most days we can have a tech at your door within three hours.

A few related reads on our site:

- [Refrigerator repair service across South Florida](/services/refrigerator-repair)
- [Wine cooler and undercounter built-in service](/services/wine-cooler-repair)
- [Ice maker diagnosis on Sub-Zero and Scotsman units](/services/ice-maker-repair)

Berne Repair specializes in high-end built-ins like Sub-Zero, Wolf, Viking, and Thermador. For standard-brand refrigerators (LG, Samsung, GE, Whirlpool) our sister operation at [bernerepair.com](https://bernerepair.com) handles those calls at the same response speed.`,
  },
  {
    slug: "wolf-range-burner-issues",
    title: "Wolf Range Burner Won't Light? Diagnosis from a Certified Tech",
    description:
      "Wolf range ignition troubleshooting — sealed burner caps, spark module faults, gas valve issues, and what owners can check before scheduling service. Real model numbers and part references.",
    publishedAt: new Date("2026-05-29T13:00:00Z"),
    author: AUTHOR,
    readingMinutes: 6,
    topic: "wolf",
    body: `The kitchen designer in Coral Gables had three guests due in an hour. Her Wolf DF366 dual-fuel range — the workhorse of her open kitchen — was clicking endlessly on the front-left burner without ever lighting. Her husband had already pulled the cap, brushed the igniter, and re-seated everything twice. By the time I arrived, the issue was a single drop of olive oil that had wicked into the spark module's wire harness during a sauté two weeks earlier. Forty minutes, one harness clip, dinner saved.

Wolf burner issues sound dramatic but break down into four root causes. Knowing which one you have lets you decide between a $59 diagnostic visit and a $0 owner fix.

## Cause 1: The burner cap is misaligned

This is the embarrassing fix. Wolf sealed burners use a removable cap that drops over the burner head. Drop it off-center by even a millimeter and the spark electrode hits ceramic instead of gas-mixed air. Click click click, no flame.

Pull the cap straight up, look for the small alignment notch on the cap and the matching pin on the burner base, drop it back on dead-square. Try ignition. If it lights, you're done. We see this on every Wolf range built since 2004 — DF304, DF366, AG304, R304, R366, the gas rangetops, all of them.

While the cap is off, run a finger around the rim of the burner head. Carbonized boil-overs build up in the gas ports and choke flame quality. A pin or a paperclip clears them in two minutes. Don't use a wire brush — you'll widen the ports unevenly.

## Cause 2: The igniter is wet or dirty

Wolf's spark electrodes sit roughly one centimeter above the burner head. They survive normal cooking, but they don't survive boil-overs that pool into the burner well. Pull the cap, lift the burner head off (it lifts straight up, no screws on most models), and inspect the white ceramic insulator. Carbonized sugar or grease around the electrode tip kills the spark.

A toothbrush and isopropyl alcohol — never water — clean it in five minutes. Let it dry for thirty before retrying. Wolf's official position is that the entire spark module is field-replaceable as part number 808093 on most dual-fuel models; we replace maybe one a year because cleaning resolves 90% of these calls.

## Cause 3: One burner clicks, all burners click

This is the spark module talking. Wolf wires all burner igniters to one module that fires sequentially when any burner valve opens. If you turn the front-left knob and you hear every igniter click in rapid succession, the module is reading a stuck spark request from one of the switches and broadcasting it across the manifold.

The fix is usually a burner switch (807894 on most pre-2014 ranges, 9013098 on newer transitional control boards). Replacement is a half-hour bench job for a tech but a service visit because access is from underneath through the cooktop. Figure $280 to $440 parts and labor depending on which switch is failing.

## Cause 4: Gas supply or valve

Wolf burners are sealed-bottom, so a leak above the burner is rare. Almost all gas-side faults trace to the brass valve under the cooktop. Symptoms: gas smell when you turn the knob, hissing without click sound, or the burner lights on simmer but won't hold on medium.

Stop and call. We will not — and you should not — chase a gas-side fault past the knob. South Florida gas service in condo high-rises adds complexity; most buildings shut a riser to one apartment for valve work. Berne Repair coordinates with building engineering on every condo job in Miami Beach, Sunny Isles, Brickell, and Aventura.

The valve part on most DF366 and DF484 models is the 9019700 sealed brass dual-pressure valve. Replacement is a tech-only job because Wolf requires a manometer pressure test before re-commissioning.

## Cause 5: The orifice (rare, but real)

If your range was relocated from a natural-gas property to a propane property — or vice versa — and the conversion kit wasn't installed correctly, the orifice mismatch shows up as either a sooty yellow flame or a refusal to light at all. Wolf shipped LP conversion kit 814220 with most pre-2018 ranges. The kit changes the orifices and the regulator spring. If you bought the home with the range installed and you've ever wondered whether it was converted properly, ask your next service tech to verify gas type at the regulator stamp.

## South Florida humidity and salt-air notes

Coastal Wolf installs in oceanfront condos see one persistent issue: salt-air corrosion on the spark electrode boot. We pull boots off 2018-built ranges in Surfside that look like they came out of 1995 ranges from inland Kendall. If your range sits less than half a mile from the water and you notice intermittent ignition (lights sometimes, not others), the boots are usually the cause. Replacement is cheap, $40 a pair, plus labor.

Hurricane-prep tip: shut the gas at the riser before evacuation, not just at the range knob. Re-light all six burners after restoration to clear any air pockets in the manifold; expect each to take five to ten clicks before flame.

## The simmer-versus-full-flame question

A specific symptom worth knowing: a Wolf burner that lights cleanly on high but drops to a stuttering yellow flame when turned to simmer is almost always the simmer bypass orifice inside the valve, not the burner. Wolf's brass valves have a tiny secondary orifice that meters simmer-range gas; in salt-air condo kitchens these clog with corrosion product about year six. Symptoms are clean lighting, clean high flame, ugly low flame, sometimes outright flame-out on simmer. Replacement is a valve swap — $310 to $420 parts and labor depending on which burner position.

If your simmer is unreliable but your high flame is perfect, that's the diagnosis 90% of the time.

## Salt-air enclosed-burner pattern

Wolf gas rangetops and rangetop variants of dual-fuel ranges (DF366, DF484, CT36G, SRT366) house the burner manifold in a sealed-bottom design. Salt-air corrosion still finds the manifold through the upper burner ports during long humid stretches — May through October in Miami. Owners report a metallic-tasting odor on first ignition after the range has sat unused for a week. Run all six burners at full flame for two minutes to burn off accumulated humidity products. The taste clears by the second cycle.

## Before you call

Quick owner checklist before scheduling service:

1. Reseat the burner cap, square to the head.
2. Clean the spark electrode with a toothbrush and isopropyl alcohol.
3. Brush the gas ports around the burner head rim.
4. Confirm gas valve at the wall is fully open.
5. Try a different burner — if one works and one doesn't, the issue is local.

If you've done all five and it still clicks without lighting, we're a phone call away. Berne Repair runs Wolf-trained technicians on every truck. (305) 520-7833. The $59 service call applies toward the repair if you go ahead with us.

Related service pages:

- [Range, cooktop, and oven repair](/services/oven-repair)
- [Range hood service and ventilation](/services/range-hood-repair)
- [Built-in refrigerator service for the matching Sub-Zero](/services/refrigerator-repair)

We focus on premium kitchens — Wolf, Sub-Zero, Viking, Thermador, Miele, Bosch built-ins. For standard-brand ranges (GE Profile, Samsung, LG) our sister site [bernerepair.com](https://bernerepair.com) covers those at the same speed.`,
  },
  {
    slug: "viking-vs-thermador-comparison",
    title: "Viking vs Thermador for South Florida Coastal Homes",
    description:
      "Buying a new luxury range for a Miami Beach, Naples, or Palm Beach home? A working tech's side-by-side on salt-air durability, parts availability, condo elevator constraints, and repair economics.",
    publishedAt: new Date("2026-06-05T13:00:00Z"),
    author: AUTHOR,
    readingMinutes: 8,
    topic: "viking-thermador",
    body: `A homeowner doing a Fisher Island gut renovation asked me a question last month I get every spring: "Viking or Thermador for the kitchen — which one survives the salt air better?"

The honest answer is neither survives it untouched, but they age very differently. I've serviced both brands for a decade in the worst environment in the United States for stainless steel: South Florida oceanfront condos with windows open six months a year. Here's what I'd tell my own family.

## Build quality on the showroom floor versus year five

A Viking VGR548 and a Thermador PRG486WDH are both eight-burner 48" professional ranges priced within a few hundred dollars of each other. On the showroom floor they look identical: heavy doors, brushed stainless, knurled knobs, gas convection. Year five tells a different story.

Viking uses thicker gauge steel on the chassis and oven liners — 14-gauge versus Thermador's 16-gauge on most pro models. That weight buys you abuse tolerance: a Viking takes the inevitable Miami-renovation shuffle of being moved across a kitchen during a remodel without warping. It does not buy you better salt-air corrosion resistance.

Thermador's stainless cladding (their "Star-K" series and the Pro Grand line) uses a brighter polish that shows water spots faster but holds the chrome finish on control knobs longer. Viking's matte-brushed finish hides spots but the knob shafts pit. In an oceanfront condo, both will need a cosmetic refresh at year eight.

## Parts availability — the silent decision driver

This is where my technician hat replaces my consumer-advice hat. Both Viking and Thermador own their parts distribution; both keep most catalog items in domestic warehouses. Where they diverge is on legacy support.

Viking ranges built before 2013 — when the Middleby acquisition closed — have spotty parts support. Specific control boards on the original VGSC and VGIC series can be 4-to-8-week back-orders. Post-2013 Viking ranges are stocked normally; common bake igniters (PB040054), spark modules (PE040041), gas valves (PB040003) ship overnight.

Thermador has the advantage of BSH Home Appliances behind it (the Bosch-Siemens group). Their parts pipeline is the most reliable in the luxury kitchen segment after Sub-Zero. The catch: it costs more. A Thermador control board (00754620) runs roughly 25% over the equivalent Viking part for the same diagnostic complexity.

For a buyer in a Brickell high-rise where a downed range is a dinner-reservation problem, parts speed matters more than dollar premium. Thermador wins on that axis.

## Service network depth in South Florida

Factory-authorized service for Viking in our market is concentrated in two firms. Thermador works through BSH's authorized network, which is broader — maybe six firms across Miami-Dade, Broward, and Palm Beach. We work both brands as a non-factory shop and source parts through normal distribution, which means our parts costs run the same as the factory channels but our scheduling is more flexible. A factory-authorized appointment in May or June can run two to three weeks out; we run three days out, often same-day for diagnostic visits.

## Coastal salt-air durability — the real test

I serviced a 2014 Viking VGR548 in a Sunny Isles Beach condo last year that had never been moved. Original install, original owner. The cosmetic stainless was tired but the cooking surface and internals were essentially showroom. Five-year-old Thermador PRG486 two floors down: control board failure from condensate pooling on the daughter board, $740 repair, otherwise pristine.

The pattern: Viking has more cosmetic aging in coastal homes, Thermador has more electronic-fault aging. Neither is a deal-breaker, but if your kitchen is the entertainer-focused showpiece in a $4M Surfside condo, Viking holds its visual presence longer. If it's the working core of a Pinecrest house that does Thanksgiving for 22 people, Thermador's tighter temperature control on the convection ovens (Thermador's Hardware Diffuser is the best-engineered convection system on the market) earns its keep.

## The condo factor

This one matters more than buyers expect. A 48" pro range weighs 600 to 750 pounds depending on options. Service elevators in older Miami Beach buildings — Sunset Harbour, Mid-Beach, parts of South Beach — have door clearances and floor-rating limits that rule out delivery of certain frames without a crane. Viking's 48" pro is roughly 5/8" deeper than Thermador's matching unit. We've watched two installs get aborted at the freight elevator because the protective crating wouldn't clear the elevator door frame; both happened to be Viking.

Before you sign the order, get exact crated dimensions from the dealer and clear them with building engineering. We can refer you to white-glove appliance delivery firms in Miami that handle the building-side logistics.

## Repair economics over ten years

Rough estimates from our service records on 48" pro ranges in South Florida:

Viking ten-year cost of ownership (excluding install): $1,800 to $2,800 in repairs and service calls. Major items: bake igniter replacement at year three to four, spark module at year six to seven, one infrared broiler element by year eight on heavy-use kitchens.

Thermador ten-year cost: $2,200 to $3,400. Major items: control board service at year four to five, convection motor at year seven, two igniter replacements distributed over the decade.

Thermador owners spend more on repairs but typically report fewer no-cook nights. The brand's diagnostic-friendly architecture means faster turnaround once a tech is on-site.

## What I'd buy

For a coastal condo with a chef-style kitchen: Thermador, every time. The convection oven, the parts pipeline, and the BSH service depth justify the cost premium.

For a single-family home set back from the water, doing serious heavy daily cooking: Viking. The chassis, the burner output (Viking's 15,000-BTU sealed surface burner remains the most-powerful in the residential category), and the lower repair frequency win on a long horizon.

For a rental property in any South Florida market: neither. Buy a GE Cafe and budget for a five-year replacement. Premium ranges in renter kitchens get abused beyond their service envelope.

## Resale value on the unit itself

Realtors in our service area have started listing brand of range as a feature line — a working Wolf or Viking in a $3M+ Miami Beach property is a soft positive for buyer appeal. The reverse is also true: a non-working luxury range on a listing is a price-negotiation lever buyers use freely. We get calls every spring from sellers prepping listings who need a one-week diagnostic-and-fix turnaround before photos. Plan for it. Both Viking and Thermador hold their visual presence in listing photos well enough to be worth servicing rather than replacing pre-sale.

## Hurricane season practical notes

Both brands' control boards are sensitive to power-quality issues — brown-outs, voltage sags during grid recovery after a named storm. A whole-home surge protector at the panel is a $400 to $600 install that pays for itself the first time a transformer takes a lightning hit in your block. Both brands are explicit in their service literature: warranty does not cover surge-related electronic failure.

## Calling us for either

Berne Repair handles both Viking and Thermador in the field. (305) 520-7833. Same $59 diagnostic visit, applied to repair. If you're in the buying decision and you'd rather not guess, we'll do a paid one-hour kitchen consult and walk through your specific install context.

Related reading on our site:

- [Range and oven repair service](/services/oven-repair)
- [Range hood and ventilation](/services/range-hood-repair)
- [Built-in refrigerator service](/services/refrigerator-repair)

We focus on the premium category. For mid-tier and entry-level ranges, our sister operation at [bernerepair.com](https://bernerepair.com) handles those at the same response speed.`,
  },
  {
    slug: "miele-dishwasher-error-codes",
    title: "Miele Dishwasher Error Codes Explained — F11, F14, F32, F70",
    description:
      "A practical decoder for the most common Miele dishwasher fault codes (F11, F14, F32, F70), with what each really means, what you can reset yourself, and when to call a tech.",
    publishedAt: new Date("2026-06-12T13:00:00Z"),
    author: AUTHOR,
    readingMinutes: 7,
    topic: "miele",
    body: `A client in Pinecrest called us last week about her G7106 SCU. Mid-cycle, the unit beeped twice, the display showed F11, and the cabin filled with about half a gallon of standing water on the floor of the tub. Her installer had told her two years ago to "call Miele direct" for any error code. Two days waiting on Miele dispatch later, she called us. We had the unit running again in 90 minutes.

Miele's German engineering is unmatched in residential dishwashers. The trade-off is a diagnostic system that assumes the operator reads German technical documentation. Here's the plain-English version of the four codes I see most often in South Florida kitchens.

## F11 — Drainage fault

What it means: the unit isn't pumping water out of the sump within the time window the controller expects. In ten years of Miele service across Miami, this is the single most common fault on G6000 and G7000 series machines.

Common owner-checkable causes:

1. **Drain hose kink behind the cabinet**. New Miele installs in condo kitchens sometimes get the drain hose pinched against the cabinet box during final positioning. Pull the unit out six inches (it's on adjustable feet, not screwed to the floor) and check.
2. **Disposal blockage**. Miele dishwashers in homes with garbage disposals share a drain line. If the disposal is clogged downstream, water backs up. Run the disposal with cold water for 30 seconds, then retry the dishwasher.
3. **Filter and sump screen clogged**. The triple-filter at the bottom of the tub (the round mesh, the fine filter, the coarse strainer) catches food debris. Unscrew the assembly, rinse all three pieces under hot water. Reinstall finger-tight. This alone fixes about 40% of F11 calls.

If those three checks don't resolve it, the drain pump (Miele part 6239562 on most G6000 series, 11254160 on G7000) has failed. Service-only replacement; figure $380 to $520 parts and labor.

## F14 — Water-intake fault

What it means: the unit isn't filling within the time window. Less common than F11 but more frustrating because it locks the cycle before any cleaning begins.

Owner checks:

1. **Confirm the supply valve under the sink is fully open**. Miele's installation manual specifies a quarter-turn ball valve; plenty of South Florida plumbers install a multi-turn gate valve instead. If a gate valve is half-closed, the flow rate fails the unit's pressure test and triggers F14. Open fully.
2. **Check the inlet hose filter screen**. Miele's water-inlet hose has a fine mesh screen inside the unit-end coupling. Sediment from old galvanized pipes — common in pre-1995 Miami homes — chokes it. Unscrew the hose from the back of the unit (shut the water first), pop out the screen, rinse with hot water, reinstall.
3. **Water hardness setting wrong**. Miele dishwashers ship with a default hardness setting that may not match Miami's hard municipal water. If salt regeneration has failed (you'll usually see this paired with poor cleaning), the resin bed is saturated and the inlet behaves erratically. Refill the salt reservoir with proper dishwasher salt (not table salt) and run a regeneration cycle.

If owner checks don't clear F14, the inlet valve (10182750 on most current models) is the next service item.

## F32 — Door lock fault

What it means: the door switch isn't reporting a securely-latched state. Owners read this as "door open" but the door is physically closed.

This one is genuinely close-and-retry-able about half the time. Open the door fully, slam it shut firmly, retry. If F32 persists, the issue is the door interlock assembly. On built-in panel-ready Mieles in Miami Beach condos, the panel itself can sometimes drift off-square during cabinet settlement; if the panel weight is misaligned, the latch geometry fails. A finger-tight adjustment on the panel mounting screws often fixes it.

Hardware replacement: door switch is part 11215290 on G7000 series, around 90 minutes labor, $260 to $340 all-in.

## F70 — Waterproof system fault (the serious one)

What it means: Miele's WaterProof System has detected a leak in the bottom pan of the unit. The machine has triggered its anti-flood pump, shut off the inlet valve, and will not run another cycle until cleared by a technician.

This is the only code on the list I tell owners not to clear themselves. F70 is the safety system doing its job; resetting without diagnosis can flood a kitchen. If you live in a condo with a unit below you, F70 is the difference between a $0 incident and a $40,000 insurance claim.

Causes of F70 in our service experience:

- **Spray arm gasket failure**: the upper spray arm gasket gets brittle with age and lets water past the seal. Common past year five on heavy-use units.
- **Tub corrosion at a weld seam**: rare, but we've seen two on 2017-2018 G6000 units. Warranty item if within ten years.
- **Heat exchanger crack**: very rare, but the most common cause of F70 on G7000 series with the heat pump option.

The bottom pan has a styrofoam float that triggers the F70 reed switch. Even small intermittent leaks can soak the styrofoam and lock the system. A tech needs to dry the pan, find the leak source, repair, and reset the float manually.

Berne Repair carries F70 parts on the truck for the G6000 and G7000 series. Same-day reset turnaround is standard for our Miami, Miami Beach, and Coral Gables clients.

## Other codes worth knowing

- **F24 to F26**: heater faults. Often the thermistor, sometimes the heating circuit.
- **F36**: turbidity sensor fault. Cosmetic — cycle runs but defaults to standard wash regardless of soil level.
- **F47 to F53**: motor and circulation pump faults. Service-only.

## A note on the G7000 generation

Miele's G7000 series is the most diagnostic-friendly residential dishwasher built, full stop. The unit logs its own fault history to non-volatile memory; a tech with the right service tool reads the last 30 events directly from the control board. If you have a G7000 throwing intermittent codes that clear themselves, ask your tech to pull the log. The pattern in the history usually identifies a marginal component three months before it fails outright — letting you schedule replacement during a planned service visit rather than mid-dinner-party.

## Coastal-specific Miele notes

Miele's electronic boards are robust against humidity but the door panel ribbon cable on built-in models can corrode at the connector in oceanfront condos. We see this on Star Island, Fisher Island, and high-floor Sunny Isles units past year seven. The connector (replaced as part of harness 11210840) is a 40-minute service job once the door panel is off.

Salt regeneration is genuinely necessary in Miami. Municipal water in much of Miami-Dade runs 11 to 14 grains hardness; Miele's salt system handles up to 17. Skip the salt and the dishwasher slowly stops cleaning glassware to spec — not a fault code, but a quality complaint we hear monthly. A 4-pound box of Miele-spec salt lasts six months on most households.

## When to book service

If your Miele shows any of the above codes and an owner check doesn't clear it within thirty minutes, the diagnostic is faster than the trial-and-error. Berne Repair runs Miele-trained technicians on Miami-Dade routes daily. (305) 520-7833. Standard $59 service call applies toward repair.

Related service pages:

- [Dishwasher repair across South Florida](/services/dishwasher-repair)
- [Built-in refrigerator service for the matching Miele column](/services/refrigerator-repair)
- [Range and oven repair for Miele ovens](/services/oven-repair)

We focus on European premium brands. For standard-brand dishwashers (Whirlpool, GE, Samsung) our sister site at [bernerepair.com](https://bernerepair.com) handles those at the same response speed.`,
  },
  {
    slug: "luxury-appliance-warranty-after-expiration",
    title: "What to Do When Your Sub-Zero or Wolf Warranty Expires",
    description:
      "Your factory warranty just ended. Here's the practical playbook on finding factory-authorized service, deciding between dealer and independent repair, and when an extended plan actually pays off.",
    publishedAt: new Date("2026-06-19T13:00:00Z"),
    author: AUTHOR,
    readingMinutes: 8,
    topic: "warranty",
    body: `A new client in Bay Harbor Islands forwarded me a letter from Sub-Zero last month: her 2024 BI-36U built-in just rolled off its two-year full warranty. The letter offered an extended-protection plan starting at $1,790 for three additional years. She asked me whether it was worth it.

The answer to that question depends on a few things most owners don't know to ask. Here's the framework I walk every client through when a Sub-Zero, Wolf, Viking, Thermador, or Miele warranty hits expiration.

## What just expired, exactly

Sub-Zero and Wolf carry a layered warranty. The full two-year covers parts and labor end-to-end. The fifth-year sealed-system warranty covers the compressor, condenser, evaporator, and connecting tubing on refrigeration units. The twelfth-year warranty covers only sealed-system parts (no labor).

When the two-year ends, you keep three more years of sealed-system protection on refrigeration and seven more years of parts-only coverage on the compressor. That's worth knowing before you panic-buy an extended plan that duplicates coverage you already have.

Wolf cooking products: two-year full, that's it. No long-tail coverage.

Viking: one-year full, three-year limited parts. The cliff at year one is real.

Thermador: two-year full on most pro lines, one-year on built-in cooking. Some retailers bundle a third year through BSH at point-of-sale; check your registration.

Miele: two-year full on most lines; the Generation 7000 series carries select multi-year coverage on specific components. Check your registration documentation, not the retailer's verbal promise.

## The case for an extended plan

Extended plans pay off in three specific scenarios:

1. **Built-in refrigeration with a single compressor in service for 18+ hours a day**: high cycle count means earlier sealed-system fatigue. A compressor replacement out-of-pocket on a Sub-Zero PRO 48 runs $2,800 to $3,800. A three-year extended plan at $1,900 carries positive expected value if the compressor has any meaningful failure probability.

2. **Pro ranges installed within a half-mile of the ocean**: salt-air corrosion accelerates electronic and ignition failures. We see a 30 to 40% higher service-call rate on coastal Wolf and Viking ranges versus inland comparables. Extended coverage on a Wolf DF486G in Sunny Isles is a smaller bet than on the same range in Pinecrest.

3. **Households with no in-network factory-authorized service**: not Miami's situation, but if you have a vacation property in a less-served market (Naples, Sarasota, Stuart), having the factory plan attached can guarantee responsive service that independent shops can't offer in those zip codes.

## The case against

Extended plans are insurance with a deductible-free claims process, sold at retail margin. The retailer's expected payout is below the premium — that's how the math works. For most South Florida households with reasonable usage on a flat-floor non-built-in install, paying retail for repairs as they happen runs cheaper than the plan.

Specific cases where I tell clients to skip the plan:

- **Wolf or Viking ranges past year five**: most heavy-failure items are out by then.
- **Sub-Zero units with no coastal exposure**: the sealed system on Sub-Zero rarely fails inside 12 years of normal use.
- **Households planning to renovate within 5 years**: you'll replace the appliance before you'd amortize the plan.

## Finding factory-authorized service

Sub-Zero and Wolf maintain a service-locator at subzero-wolf.com. Enter your zip code, the locator returns local factory-authorized firms. In Miami-Dade, the list is short — typically two to three firms — and their scheduling runs two to three weeks out in March, July, and December (the busy refrigeration months).

Factory-authorized is not always the right choice. Factory firms run higher labor rates ($180 to $240 per hour versus $130 to $170 for established independent shops), and their scheduling pressure means they're not always the fastest responder. Where factory wins is on warranty-period work and on parts dispatch on rare items. Where independents win is on speed, price, and accumulated experience across multiple brands.

A reasonable rule: in warranty, use factory-authorized to keep the coverage clean. Out of warranty, choose the firm with the fastest response and the verifiable factory training for your specific brand.

## What "factory-trained" actually means

This is where the market is murky. The official term is "factory-authorized," which means a service firm has a contract with the manufacturer to perform warranty work. "Factory-trained" is a step down — technicians who have completed manufacturer training but whose firm doesn't carry the authorization contract. Both groups are competent; the distinction matters mainly for warranty work.

At Berne Repair we run factory-trained technicians on Sub-Zero, Wolf, Viking, Thermador, and Miele. We're not factory-authorized for warranty claims; for in-warranty work we'll refer you to your authorized firm. Past warranty, we'll be on-site within 24 hours in most South Florida markets.

## Questions to ask any independent shop

When you're vetting a non-factory shop for premium-appliance work, ask:

1. **Who trains your techs on this brand?** A real answer names a Sub-Zero training school, a BSH Bosch-Siemens curriculum, a Miele technical academy. A vague answer is your warning.
2. **How many of these units do you service in a typical month?** Volume matters. A shop that sees one Sub-Zero a quarter doesn't have the muscle memory.
3. **Do you stock common parts on your trucks?** The yes/no answer is less important than which specific parts they name when asked.
4. **What's your warranty on your own work?** Industry-standard is 30 to 90 days. Anything less than 30 is a flag.
5. **Can you provide three recent client references in my zip code?** Coastal South Florida is a small market for premium-appliance work. References should be verifiable.

## Post-warranty maintenance schedule

The biggest determinant of premium-appliance lifespan past warranty isn't the brand — it's maintenance. A maintenance calendar I give every long-term client:

**Quarterly**: condenser grille on all built-in refrigeration. Burner caps and igniter electrodes on all gas ranges. Spray-arm rinse on dishwashers.

**Semi-annually**: door gasket inspection on refrigeration. Hinge alignment check on built-in ovens. Filter clean on dishwashers and washing machines.

**Annually**: full diagnostic visit. Compressor performance check (current draw, run-time analysis). Gas pressure verification on cooking products. Wash-pump bearing check on dishwashers.

A $150 annual maintenance visit catches three of the four failures that lead to $1,500 emergency repairs.

## When the repair-versus-replace question comes up

Past the ten-year mark on Sub-Zero or twelve on Wolf, every major repair invites the replacement conversation. My honest opinion as someone who fixes these units for a living: Sub-Zero refrigeration is rebuildable to 20-plus years if you stay ahead of the sealed system. Wolf cooking is rebuildable to 15-plus years if you replace consumables on schedule. Viking is good to 12 to 14 years; past that, repair economics get tight. Thermador and Miele follow Wolf's curve.

Replacement makes financial sense when (a) the repair quote exceeds 40% of replacement cost on a unit past its design-life midpoint, (b) the unit has had two non-trivial repairs in the previous 18 months, or (c) the chassis itself has cosmetic damage that can't be remediated.

## Our position

Berne Repair handles post-warranty service on every premium brand we've named here, plus a few we haven't. (305) 520-7833. The $59 service call applies toward the repair. We won't sell you an extended plan because we don't offer them — but we'll tell you honestly whether the one in your mailbox is worth signing.

Related service pages on our site:

- [Sub-Zero, Wolf, and built-in refrigerator service](/services/refrigerator-repair)
- [Wolf, Viking, and Thermador range and oven repair](/services/oven-repair)
- [Miele dishwasher service](/services/dishwasher-repair)
- [Wine cooler and undercounter built-in service](/services/wine-cooler-repair)

For standard-brand appliances (LG, Samsung, GE, Whirlpool, KitchenAid) our sister operation at [bernerepair.com](https://bernerepair.com) handles those at the same response speed.`,
  },
];

/**
 * Returns articles whose publishedAt is at or before `now`. Articles
 * with future publishedAt dates remain in the registry but are filtered
 * from the index and return notFound() on direct access.
 */
export function publishedArticles(now: Date = new Date()): Article[] {
  return ARTICLES.filter((a) => a.publishedAt.getTime() <= now.getTime()).sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );
}

export function articleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function isPublished(article: Article, now: Date = new Date()): boolean {
  return article.publishedAt.getTime() <= now.getTime();
}

/**
 * Surface up to `limit` other articles, prioritizing same topic, then
 * recency. Filters to published-only relative to `now`.
 */
export function relatedArticles(
  current: Article,
  limit = 3,
  now: Date = new Date(),
): Article[] {
  const others = publishedArticles(now).filter((a) => a.slug !== current.slug);
  const sameTopic = others.filter((a) => a.topic === current.topic);
  const rest = others.filter((a) => a.topic !== current.topic);
  return [...sameTopic, ...rest].slice(0, limit);
}
