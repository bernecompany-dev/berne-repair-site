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
 * Coexistence with GA4: both configs push into the same window.dataLayer,
 * and GoogleAnalytics owns the single gtag.js library request. One gtag.js
 * instance handles both G- and AW- destinations; loading it again here cost
 * roughly 146 KB and duplicated main-thread work on every page.
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
 *
 * MOBILE LCP CONTRACT — the gtag.js LIBRARY loads at `lazyOnload` (browser
 * idle), same as the GA4/Meta/Clarity loaders. It briefly shipped as
 * `afterInteractive` and that single tag dragged ~330KB of third-party JS
 * into the pre-LCP window (gtag AW 139KB → linked GA4 config 164KB →
 * doubleclick + wcm/loader + call-tracking_9.js), inflating simulated
 * mobile LCP on every page to 7.5–9.9s (SEO round-4 block 6). The inline
 * stub below stays `afterInteractive`: config commands queue in dataLayer
 * and the library replays them at idle, so no conversion is dropped. The
 * call-tracking number swap for ad-click visitors happens a second or two
 * later — standard tradeoff, Google replays the swap on load.
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
    </>
  );
}
