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
};

export default nextConfig;
