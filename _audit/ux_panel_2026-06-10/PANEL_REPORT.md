# UX Panel Review — berne-repair.com — 2026-06-10 (evening)

Same 10-expert panel as the berne-commercial review earlier today (Rams / Ive / Norman / Nielsen / Wroblewski / Krug / Au / Garrett / Hall / Levy). 10 review agents in parallel (read-only, live site + code), findings consolidated and implemented by 4 parallel fix agents + a cleanup pass. Build, typecheck, and lint (on touched files) green.

Screenshots/evidence: `rams/`, `ive/`, `lukew/`, `krug/` subdirs (untracked) + `C:\Users\golds\Berne_Commercial\_audit\norman_2026-06-10\`.

## Cross-confirmed critical findings (all FIXED)

| # | Finding | Flagged by | Fix |
|---|---------|-----------|-----|
| 1 | "Live integration ships in Phase 4" — internal roadmap note in the production reviews section, EN+ES | Rams, Au, Hall, Levy | New copy "Verified Google reviews, quoted as posted." via dictionary; whole Reviews section localized |
| 2 | Hours contradiction on every page: "8 AM – 9 PM" (hero/stats, 4×) vs "7 AM – 9 PM" (footer/contact, 3×) + `Mo-Su 08:00-21:00` datetime attrs | Rams, Nielsen, Krug, Hall, Levy | Canonical = 7 AM – 9 PM (matches data/company.ts + schema). Locales fixed, 3 hardcoded datetime attrs fixed, "Open today" → "Open 7 days" |
| 3 | Founding story self-contradiction: /about "founded 2015" + "Eleven years" vs /team "moved to US 2022… launched 7 months later"; surname flip Berne/Bernitsky; "over 30,000" vs canonical 29k+ | Hall, Levy | /about rewritten: "Berne family of companies since 2015; Eugene Berne launched this premium division in 2022." OG image fixed. Person schema → name "Eugene Berne", alternateName "Eugene Bernitsky". 30,000 → 29,000. "yrs with Berne" → "yrs in the trade" |
| 4 | 5 sections of /es homepage render English (Areas, Brands, Team, Reviews, Commercial had no locale prop; es.ts translations were dead keys) + 17 EN-path links | Au, Rams, Levy | All 5 sections take locale + getDictionary; app/es/page.tsx passes locale="es"; localePath for links; FAQ ES title wired |
| 5 | ES footer dead links: /es/contact and /es/family → live 404 on every Spanish page | Norman, Au, Garrett | EN paths linked (same pattern as /blog) |
| 6 | Brand layer (50+ hubs) orphaned — zero /brands/ links from home or footer | Krug, Garrett | Home brand wordmarks + footer brand names now link to hubs; "All brands →"; Brands added to header nav |
| 7 | 404 search box discards the query (action="/", homepage ignores ?q) + SearchAction schema pointed at "/?q=" | Norman, Nielsen | action="/search"; urlTemplate → /search?q={query} |
| 8 | Language switcher dumps to /es home from pages WITH live mirrors (request-dispatch, brands, about, …) | Norman, Nielsen, Au, Garrett | ES_MIRROR_PATTERNS extended to the full real app/es tree incl. es-enabled brand slugs |
| 9 | Zod field errors hardcoded English for Spanish users | Nielsen, Hall | Per-locale schema factory; usted-register ES messages; dead consentError key now live |
| 10 | Header nav = homepage anchors from every page (Services→/#services etc.) | Norman, Nielsen, Krug, Garrett | Nav → real hubs /services /areas /brands /contact (+aria-current active state); /#why kept (no page) |
| 11 | Breadcrumbs (visible + JSON-LD) used /#services and /#areas fragments as parent crumbs | Norman, Garrett | → /services and /areas in services/[slug], services/[slug]/[city], areas/[city] |

## Other fixes shipped

**Mobile/forms (Wroblewski, Norman):** /request-dispatch form now first on mobile (order swap; was 1.6 viewports down on the ads landing page) · sticky CTA bar + WhatsApp FAB respect env(safe-area-inset-bottom) · FAB hides while #lead-form in view (was overlapping the TCPA consent checkbox) · consent checkbox survives validation round-trip (defaultChecked from returned values) · focus moves to first invalid field on server-side error · success card role="status" + heading focus · header phone CTA 36→44px, hamburger/theme 40→44px · footer tel links py-2, legal cluster spacing · language pills enlarged · "Maria Reyes" placeholder removed · brand input autocomplete="off" · brand pages now prefill the brand field (defaultBrand; old defaultAppliance={brand.slug} matched nothing and was silently dropped) · anti-bot fast-submit now logs name+phone+city to server logs before fake-success (leads recoverable) · app/error.tsx error boundary added (was none; uses this Next version's unstable_retry API) · mobile menu closes on Escape/outside-click.

**Visual craft (Ive, Rams):** mobile H1 "repair.Same-day" missing space fixed · hero portrait declared 800×1100 vs actual 800×1000 (~70px CLS) fixed · gradient H1 end-stop to-[oklch(0.85…)] ≈1.4:1 in light theme → 0.55 light / 0.85 dark, swept across all 29 files · real serif (Playfair Display via next/font) for brand wordmarks (was falling back to Times New Roman) · Miele/LG wordmark colors get dark: variants (were ~2.2:1 on dark) · "→ →" double arrows in credentials fixed · section rhythm normalized (sm:py-24 → py-28 ×2) · app/icon.svg added (bolt mark; favicon.ico was 16/32px only) · header "$59" badge pill removed (was 3rd $59 in first viewport) · brands footnote derived from BRANDS.slice(14) (was duplicating grid, omitting Electrolux) · dead hero-highlight.tsx, .btn-cta/.btn-ghost, 5 orphaned white SVGs deleted.

**Copy/trust (Hall, Levy, Krug):** "Get a free quote" → "Request same-day service" (was contradicting $59 two inches away) · "Request service dispatch" → "Book your repair visit" (jargon) · "Dispatch finds you a slot" → "We find you a same-day slot" · "callcenter" → "call center" · "871+" → "871" · "Thousands of repairs" → "29,000+ repairs" · "871 Google reviews" → "871 verified reviews" (aggregate, was false attribution; brand-service-landing + brand-city + combo-unique) · "90-day labor & parts warranty on parts and labor" stutter fixed (EN+ES) · "Three minutes, two required fields" → "Name and phone — that's it." · city counts 64/60+/70 unified via CITIES.length interpolation · ES grammar: "equipo en el que confío", "confían en nosotros", "Al servicio de administradores de propiedades…", "Facturación a crédito (net terms)" · ES FAQ "17 técnicos" → 18 · CTABand bookHref="/#lead-form" on blog/credentials (button was a dead click) · "All 11 services →" + Search link added to footer · 70-city wall on service pages → 2-col on mobile.

## Deliberately skipped (with reasons)

- **$59 in the 11 service-card descriptions** (Levy) — `service.description` doubles as the SERP meta description; $59 there is a CTR asset. Header pill removal already cut above-the-fold saturation.
- **ES city template parity** (Au: Neighborhoods/ZIP + Nearby sections missing vs EN) — sizeable content port, queue for a content wave.
- **CredentialsSection on /es home** (Au) — section is EN-hardcoded; adding it untranslated would be worse. Queue with the above.
- **Per-section gradient/glow stripping** (Rams) — subjective at scale; single-expert opinion, visual identity Eugene approved.
- **MapMock replacement with real CityMap** (Rams) — visual risk; the city list beside it carries the content.
- **ZIP input instead of 70-option city select** (Levy) — form-behavior change, needs A/B thought.
- **Gmail → dispatch@berne-repair.com** (Levy) — needs mailbox/DNS infra, not a code edit. Recommended.
- **"Mike" without surname fronting Sub-Zero** (Levy) — needs real data from Eugene.
- **OG image mark redesign** (Ive, Low) · **client-side validation** (server round-trip kept, focus fix shipped) · **removing a floating CTA channel** (experts disagreed on which).

## Known follow-ups
- PhoneCTA instances outside the header still render English labels on ES pages (parents don't pass locale).
- Footer BRAND_HUBS and switcher ES_BRAND_SLUGS lists carry sync-comments → must follow `residential-brand-profiles.ts` es-flags.
- Pre-existing lint errors in legal pages (react/no-unescaped-entities) and tests — untouched, not from this wave.
