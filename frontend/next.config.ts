import { SEO_CONFIG } from "./config/seo";

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
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
