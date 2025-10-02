/* eslint-disable @typescript-eslint/no-explicit-any */

interface SitemapPage {
  pageSlug: string;
  lastModified: string;
  priority: number;
}
import sitemapData from "@/public/sitemap-data.json";
async function fetchSiteMapFromJSON(): Promise<SitemapPage[]> {
  try {
    const res = await fetch(sitemapData as any);
    if (!res.ok) throw new Error("Failed to fetch sitemap data");
    const json = await res.json();
    console.log("json ==========>", json);
    return json ?? [];
  } catch (error) {
    console.error("Error fetching sitemap:", error);
    // Fallback data if JSON fetch fails
    return [
      {
        pageSlug: "contact",
        lastModified: "2025-09-13T05:18:33Z",
        priority: 0.8,
      },
      {
        pageSlug: "refund-policy",
        lastModified: "2025-09-13T05:18:33Z",
        priority: 0.8,
      },
      {
        pageSlug: "terms",
        lastModified: "2025-09-13T05:18:33Z",
        priority: 0.8,
      },
      {
        pageSlug: "upcoming-batches",
        lastModified: "2025-09-13T05:18:33Z",
        priority: 0.8,
      },
      {
        pageSlug: "free-courses",
        lastModified: "2025-09-13T05:18:33Z",
        priority: 0.8,
      },
      {
        pageSlug: "our-gallery",
        lastModified: "2025-09-13T05:18:33Z",
        priority: 0.8,
      },
      {
        pageSlug: "faq",
        lastModified: "2025-09-13T05:18:33Z",
        priority: 0.8,
      },
    ];
  }
}

const sitemap = async () => {
  const pages = await fetchSiteMapFromJSON();

  return pages?.map((site: SitemapPage) => ({
    url: `${process.env.NEXT_PUBLIC_API_URL}/${site.pageSlug}`,
    lastModified: new Date(site.lastModified),
    priority: site?.priority ?? 0.8,
  }));
};

export default sitemap;
