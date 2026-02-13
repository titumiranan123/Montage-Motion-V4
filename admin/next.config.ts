import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains deprecated, remotePatterns ব্যবহার করুন
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
      {
        protocol: "https",
        hostname: "pub-6a9bd81559354e09b0ca799ba12301c8.r2.dev",
      },
    ],
  },
};

export default nextConfig;
