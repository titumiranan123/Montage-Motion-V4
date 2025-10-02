import { MetadataRoute } from "next";
import robotsData from "@/public/robots-data.json";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL;
  return {
    rules: [
      {
        userAgent: "*",
        allow: robotsData.allow,
        disallow: robotsData.disallow,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
