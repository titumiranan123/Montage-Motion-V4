import { getData } from "@/utils/getData";

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
    const result: ServiceTypeResponse = await getData({
      url: `api/website/service/type`,
    });

    const matchedType = result?.data?.find((item) => item.href === slug);

    return matchedType?.service_type ?? null;
  } catch (error) {
    console.error("getTypeFromSlug error:", error);
    return null;
  }
};
