import { getData, isApiNotFoundError } from "@/utils/getData";

export const fetchSingleBlog = async (slug: string) => {
  if (!slug?.trim()) return null;

  try {
    const result = await getData({
      url: `api/website/blog/${encodeURIComponent(slug)}`,
      throwOnError: true,
    });
    return result?.data ?? null;
  } catch (error) {
    if (isApiNotFoundError(error)) return null;
    console.error("fetchSingleBlog error:", error);
    throw error;
  }
};
