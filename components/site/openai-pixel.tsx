import Script from "next/script";

// OpenAI / ChatGPT Ads pixel (oaiq). Mirrors the Meta pixel: loads the SDK at
// idle, fires the `lead_created` conversion (the event registered in Ads
// Manager, data.type=customer_action) on tel:/mailto: clicks. WhatsApp and the
// lead form fire it from their own handlers. The SDK auto-captures the `oppref`
// click ref for attribution; the layout cookie capture is a server-side backup.
const PIXEL_ID =
  process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID ?? "SpLsNLeEy2QEwZQgH3uHkF";

export function OpenAIPixel() {
  if (process.env.NODE_ENV !== "production" || !PIXEL_ID) return null;

  return (
    <Script id="openai-pixel" strategy="lazyOnload">
      {`
        !function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");
        oaiq('init', { pixelId: '${PIXEL_ID}' });
        document.addEventListener('click', function(e) {
          var t = e.target instanceof Element ? e.target.closest('a[href^="tel:"], a[href^="mailto:"]') : null;
          if (!t || typeof oaiq !== 'function') return;
          oaiq('measure', 'lead_created', { type: 'customer_action' });
        }, true);
      `}
    </Script>
  );
}

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
  }
}
