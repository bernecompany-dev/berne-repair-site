import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "geolocation=(), microphone=(), camera=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // Core Web Vitals — instruct next/image to prefer modern formats. AVIF
  // first (best compression), WebP fallback. ~30-50% bandwidth savings vs
  // JPEG/PNG on the team headshots and hero artwork. Browser negotiates
  // via Accept header; non-supporting clients still get original.
  images: {
    formats: ["image/avif", "image/webp"],
    // Long-cache the optimized variants behind the immutable URL.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Service-map data (single source on bernerepair.com, regenerated weekly on
  // Miami) is now served via an edge-cached Route Handler at
  // app/service-map.json/route.ts instead of a bare rewrite proxy. The rewrite
  // was NOT edge-cached, so the ~526KB file was re-pulled from origin on every
  // map view — the dominant source of Vercel Fast Origin Transfer. The route
  // revalidates daily, collapsing origin transfer to near zero.
  async redirects() {
    return [
      // Eugene (owner) removed from the staff roster (owner request 2026-06).
      // His old bio URL was in the sitemap and may be indexed — send it to
      // the owner story on /about instead of a 404.
      {
        source: "/team/evgenii-knyazev",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
