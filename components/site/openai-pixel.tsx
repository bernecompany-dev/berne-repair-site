import Script from "next/script";

const PIXEL_ID =
  process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID ?? "SpLsNLeEy2QEwZQgH3uHkF";

export function OpenAIPixel() {
  if (process.env.NODE_ENV !== "production" || !PIXEL_ID) return null;

  return (
    <Script id="openai-pixel" strategy="lazyOnload">
      {`
        !function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");
        oaiq('init', { pixelId: '${PIXEL_ID}' });
      `}
    </Script>
  );
}

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
  }
}
