// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Option A: recommended (Next.js 12.3+ / 13+) — allow via remotePatterns
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-6a9bd81559354e09b0ca799ba12301c8.r2.dev",
        port: "", // empty means any default port (443 for https)
        pathname: "/**", // allow all paths under that host
      },
    ],

    // Optional extra tuning (device sizes / formats)
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
};

module.exports = nextConfig;
