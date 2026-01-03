interface ServiceTypeItem {
  href: string;
  service_type: string;
  service_title: string;
}

interface ServiceTypeResponse {
  data: ServiceTypeItem[];
}

export const getTypeFromSlug = async (slug: string): Promise<string | null> => {
  if (!slug) return null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/website/service/type`,
      { cache: "no-store" } // optional: avoids stale data in Next.js
    );

    if (!res.ok) {
      console.error("Failed to fetch service types:", res.status);
      return null;
    }

    const result: ServiceTypeResponse = await res.json();

    const matchedType = result?.data?.find((item) => item.href === slug);

    return matchedType?.service_type ?? null;
  } catch (error) {
    console.error("getTypeFromSlug error:", error);
    return null;
  }
};
