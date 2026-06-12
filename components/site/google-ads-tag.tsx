import Script from "next/script";
import { COMPANY } from "@/data/company";

/**
 * Google Ads conversion tag (gtag.js) — separate from the GA4 loader
 * (components/site/google-analytics.tsx) so Ads can be enabled/disabled
 * independently via env.
 *
 * IDs are baked in as defaults (they are public — present in the HTML of
 * every page), with env override via NEXT_PUBLIC_GADS_ID /
 * NEXT_PUBLIC_GADS_CALL_LABEL, so no Vercel dashboard changes are needed.
 * Production-gated like the other third-party loaders so `next dev`
 * traffic never registers conversions.
 *
 * Coexistence with GA4: both loaders push into the same window.dataLayer,
 * and `window.gtag = window.gtag || gtag` keeps whichever stub installed
 * first. gtag.js tolerates being requested with both a G- and an AW- id;
 * the config commands are deduped by the library.
 *
 * "Calls from website" uses Google's website call tracking snippet — the
 * `config` with `phone_conversion_number` below. Google dynamically swaps
 * the displayed number for a forwarding number for ad-click visitors and
 * records calls (≥60s by default) as conversions; no click listener is
 * involved. `phone_conversion_number` must EXACTLY match how the number is
 * rendered on the page, hence the import from data/company.ts (the single
 * source every header/hero/footer renders from): "(754) 345-4515".
 *
 * "Lead form submit" (WEBPAGE) is fired as a gtag('event','conversion')
 * in components/sections/lead-form.tsx (success effect).
 */
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID ?? "AW-18232464152";
const CALL_LABEL =
  process.env.NEXT_PUBLIC_GADS_CALL_LABEL ??
  "AW-18232464152/Ou0TCMyJqL0cEJim9fVD";
const PHONE_DISPLAY = COMPANY.phone.display; // "(754) 345-4515"

export function GoogleAdsTag() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        id="gads-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            window.gtag('js', new Date());
            window.gtag('config', '${GADS_ID}');
            window.gtag('config', '${CALL_LABEL}', {
              'phone_conversion_number': '${PHONE_DISPLAY}'
            });
          `,
        }}
      />
      <Script
        id="gads-lib"
        src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
