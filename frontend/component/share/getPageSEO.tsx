import { Metadata } from "next";

export async function getPageSEO(slug: string): Promise<Metadata> {
  const defaultSEO: Metadata = {
    title: "MontageMotion",
    description: "Professional video editing and creative agency.",
  };

  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  if (!apiURL) {
    console.error("NEXT_PUBLIC_API_URL is not set!");
    return defaultSEO;
  }

  try {
    const res = await fetch(`${apiURL}/api/seo/${slug}`, { cache: "no-store" });

    if (!res.ok) {
      console.error("SEO API returned status:", res.status);
      return defaultSEO;
    }

    const data = await res.json();
    const seo = data?.data;

    if (!seo) return defaultSEO;

    return {
      title: seo.meta_title || defaultSEO.title,
      description: seo.meta_description || defaultSEO.description,
      keywords: seo.meta_keywords || "",
      openGraph: {
        title: seo.meta_title || defaultSEO.title,
        description: seo.meta_description || defaultSEO.description,
        url: seo.canonical_url || "https://montagemotion.com",
        images: seo.ogImage
          ? [
              {
                url: seo.ogImage,
                width: 1200,
                height: 630,
                alt: seo.meta_title || defaultSEO.title,
              },
            ]
          : [],
        type: "website",
      },
      twitter: {
        card: seo.twitter_card_type || "summary_large_image",
        title: seo.meta_title || defaultSEO.title,
        description: seo.meta_description || defaultSEO.description,
        images: seo.twitter?.image ? [seo.twitter.image] : [],
      },
      alternates: {
        canonical: seo.canonical_url || "https://montagemotion.com",
      },
      robots: seo.meta_robots || "index, follow",
    };
  } catch (error) {
    console.error("SEO fetch failed:", error);
    return defaultSEO;
  }
}
