import { Metadata } from "next";

export async function getPageSEO(slug: string): Promise<Metadata> {
  const defaultSEO: Metadata = {
    title: "MontageMotion",
    description: "Professional video editing and creative agency.",
  };

  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  if (!apiURL) return defaultSEO;

  try {
    const res = await fetch(`${apiURL}/api/seo/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return defaultSEO;

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
        images: `https://pub-6a9bd81559354e09b0ca799ba12301c8.r2.dev/Montage%20Motion%20OG%20Image.png`
          ,
        type: "website",
      },
      twitter: {
        card: seo.twitter_card_type || "summary_large_image",
        title: seo.meta_title || defaultSEO.title,
        description: seo.meta_description || defaultSEO.description,
        images: `https://pub-6a9bd81559354e09b0ca799ba12301c8.r2.dev/Montage%20Motion%20OG%20Image.png`,
      },
      alternates: {
        canonical: seo.canonical_url || "https://montagemotion.com",
      },
      robots: seo.meta_robots || "index, follow",
    };
  } catch {
    return defaultSEO;
  }
}
