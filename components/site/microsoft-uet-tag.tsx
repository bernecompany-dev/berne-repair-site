import Script from "next/script";

const UET_ID = process.env.NEXT_PUBLIC_MS_UET_ID ?? "97251280";

export function MicrosoftUetTag() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        id="ms-uet-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: "window.uetq = window.uetq || [];",
        }}
      />
      <Script
        id="ms-uet-lib"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"${UET_ID}", enableAutoSpaTracking: true};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");
          `,
        }}
      />
    </>
  );
}
