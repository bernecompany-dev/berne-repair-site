import Script from "next/script";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "xfuty713o8";

/**
 * Microsoft Clarity loader.
 *
 * Reads NEXT_PUBLIC_CLARITY_ID from env. To enable, set it in Vercel project
 * environment variables (see _docs/analytics/clarity-setup.md).
 *
 * - Empty / missing env  → renders nothing.
 * - "BERNE_PLACEHOLDER"  → renders an HTML comment so the integration is
 *                          verifiably wired without a 404 to clarity.ms.
 * - Real ID              → injects the official Clarity snippet via
 *                          next/script with strategy="afterInteractive".
 */
export function Clarity() {
  // Production-only: keep dev/localhost sessions out of recordings, matching
  // the GA4/Meta Pixel gating.
  if (process.env.NODE_ENV !== "production" || !CLARITY_ID) return null;

  if (CLARITY_ID === "BERNE_PLACEHOLDER") {
    // Render a verifiable, no-side-effect marker so `curl | grep clarity` succeeds
    // and the integration is provably wired before the real ID is set in Vercel.
    return (
      <meta
        name="berne-clarity"
        content="placeholder: set NEXT_PUBLIC_CLARITY_ID in Vercel to a real Microsoft Clarity project ID"
      />
    );
  }

  // Defensive: allow only alnum/underscore/hyphen, max 64 chars.
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(CLARITY_ID)) return null;

  // Clarity is a session-recorder for UX research, not a conversion-critical
  // pixel. Use `lazyOnload` so it only loads after the browser is idle, which
  // keeps it out of the TBT / INP critical path on initial page interaction.
  return (
    <Script id="ms-clarity" strategy="lazyOnload">
      {`
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `}
    </Script>
  );
}
