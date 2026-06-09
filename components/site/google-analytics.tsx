import Script from "next/script";

/**
 * GA4 loader — replaces `<GoogleAnalytics>` from @next/third-parties.
 *
 * Why custom:
 * 1. Production gating. The library component loads gtag.js in every
 *    environment; `next dev` localhost sessions were ~27% of the GA4
 *    property's "users". We render nothing unless NODE_ENV === "production"
 *    (i.e. `next build` output — dev server traffic never reports).
 * 2. Third-party weight. @next/third-parties hardcodes the gtag.js library
 *    fetch at `afterInteractive` (no `strategy` prop), putting ~100KB+ of
 *    third-party JS on the hydration-critical path. Here the heavy library
 *    loads at `lazyOnload` (browser idle) while a tiny inline stub still
 *    installs `window.gtag` + the dataLayer queue at `afterInteractive`.
 *
 * Conversion wiring stays intact: lead-form `generate_lead`, delegated
 * `phone_call` / `whatsapp_click` (analytics-events.tsx, whatsapp-fab.tsx)
 * all call `window.gtag(...)` guarded by a typeof check. The stub exists as
 * soon as hydration finishes, so events fired before gtag.js arrives are
 * queued in `dataLayer` and replayed by the library when it loads — the
 * standard gtag snippet semantics, nothing is dropped.
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  if (process.env.NODE_ENV !== "production" || !gaId) return null;

  return (
    <>
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
        }}
      />
      <Script
        id="ga-lib"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="lazyOnload"
      />
    </>
  );
}
