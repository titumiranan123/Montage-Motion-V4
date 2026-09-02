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

  const result: ServiceTypeResponse = await getData({
    url: "api/website/service/type",
    throwOnError: true,
  });

  const matchedType = result?.data?.find((item) => item.href === slug);

  return matchedType?.service_type ?? null;
};
