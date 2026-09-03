import { SEO_CONFIG } from "./config/seo";

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const publicCacheHeaders = [
      {
        key: "Cache-Control",
        value: "public, s-maxage=300, stale-while-revalidate=86400",
      },
    ];

    return [
      { source: "/", headers: publicCacheHeaders },
      { source: "/about-us", headers: publicCacheHeaders },
      { source: "/careers", headers: publicCacheHeaders },
      { source: "/contact-us", headers: publicCacheHeaders },
      { source: "/privacy-policy", headers: publicCacheHeaders },
      { source: "/refund-policy", headers: publicCacheHeaders },
      { source: "/terms-and-conditions", headers: publicCacheHeaders },
      { source: "/blogs", headers: publicCacheHeaders },
      { source: "/blogs/:slug", headers: publicCacheHeaders },
      { source: "/portfolio", headers: publicCacheHeaders },
      { source: "/case-studies", headers: publicCacheHeaders },
      { source: "/case-studies/:slug", headers: publicCacheHeaders },
      { source: "/:slug", headers: publicCacheHeaders },
    ];
  },
  async rewrites() {
    return [
      {
        source: SEO_CONFIG.routes.robots,
        destination: SEO_CONFIG.backend.robots,
      },
      {
        source: SEO_CONFIG.routes.sitemap,
        destination: SEO_CONFIG.backend.sitemap,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-6a9bd81559354e09b0ca799ba12301c8.r2.dev",
        port: "",
        pathname: "/**",
      },
    ],

    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
};

module.exports = nextConfig;
