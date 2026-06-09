import Script from "next/script";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "982134867633227";

export function MetaPixel() {
  // Production-only: keep dev/localhost sessions out of the pixel's data,
  // matching the GA4 gating in components/site/google-analytics.tsx.
  if (process.env.NODE_ENV !== "production" || !PIXEL_ID) return null;

  return (
    <>
      {/*
        lazyOnload: fbevents.js is heavy third-party JS that is not needed
        for first interaction; loading at browser idle keeps it off the
        TBT/INP critical path. The fbq stub, PageView, and the delegated
        PhoneClick/EmailClick listener all initialize when this snippet runs
        (a few seconds after load at worst) — acceptable loss window for
        click attribution, and PageView still fires for every session.
      */}
      <Script id="meta-pixel" strategy="lazyOnload">
        {`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
          document.addEventListener('click', function(e) {
            var t = e.target instanceof Element ? e.target.closest('a[href^="tel:"], a[href^="mailto:"]') : null;
            if (!t || typeof fbq !== 'function') return;
            var href = t.getAttribute('href') || '';
            if (href.indexOf('tel:') === 0) {
              fbq('trackCustom', 'PhoneClick', { phone: href.replace('tel:', ''), page: location.pathname });
            } else if (href.indexOf('mailto:') === 0) {
              fbq('trackCustom', 'EmailClick', { email: href.replace('mailto:', ''), page: location.pathname });
            }
          }, true);
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
