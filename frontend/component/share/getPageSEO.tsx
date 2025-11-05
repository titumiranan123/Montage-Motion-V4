import { Metadata } from "next";

export async function getPageSEO(slug: string): Promise<Metadata> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/seo/${slug}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();
    const seo = data?.data;

    if (!seo) {
      return {
        title: "MontageMotion",
        description: "Professional video editing and creative agency.",
      };
    }

    return {
      title: seo.meta_title || "MontageMotion",
      description: seo.meta_description || "",
      keywords: seo.meta_keywords || "",
      openGraph: {
        title: seo.meta_title || "",
        description: seo.meta_description || "",
        url: seo.canonical_url || "https://montagemotion.com",
        images: seo.ogImage
          ? [
              {
                url: seo.ogImage,
                width: 1200,
                height: 630,
                alt: seo.meta_title || "MontageMotion",
              },
            ]
          : [],
        type: "website",
      },
      twitter: {
        card: seo.twitter_card_type || "summary_large_image",
        title: seo.meta_title || "",
        description: seo.meta_description || "",
        images: seo.twitter?.image ? [seo.twitter.image] : [],
      },
      alternates: {
        canonical: seo.canonical_url || "https://montagemotion.com",
      },
      robots: seo.meta_robots || "index, follow",
    };
  } catch (error) {
    console.error("SEO fetch failed:", error);
    return {
      title: "MontageMotion",
      description: "Professional video editing and creative agency.",
    };
  }
}
