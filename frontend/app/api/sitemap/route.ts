import { SEO_CONFIG, buildFallbackSitemap, isSitemapXml } from "@/config/seo";

export const revalidate = 300;

const xmlHeaders = {
  "Content-Type": "application/xml; charset=utf-8",
};

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

  if (!apiUrl) {
    return new Response(buildFallbackSitemap(), {
      status: 200,
      headers: xmlHeaders,
    });
  }

  try {
    const response = await fetch(`${apiUrl}${SEO_CONFIG.backend.sitemap}`, {
      next: {
        revalidate: 300,
        tags: [SEO_CONFIG.cacheTags.sitemap],
      },
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    const sitemapXml = await response.text();
    if (!response.ok || !isSitemapXml(sitemapXml)) {
      throw new Error(`Sitemap API returned an invalid response (${response.status})`);
    }

    return new Response(sitemapXml, {
      status: 200,
      headers: xmlHeaders,
    });
  } catch (error) {
    console.error("Error fetching sitemap.xml:", error);
    return new Response(buildFallbackSitemap(), {
      status: 200,
      headers: { ...xmlHeaders, "X-Sitemap-Source": "fallback" },
    });
  }
}
