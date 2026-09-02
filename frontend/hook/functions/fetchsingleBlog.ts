import { isAxiosError } from "axios";
import { api_url } from "../Apiurl";

export const fetchSingleBlog = async (slug: string) => {
  if (!slug?.trim()) return null;

  try {
    const res = await api_url.get(`/api/website/blog/${encodeURIComponent(slug)}`);
    return res.data?.data ?? null;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) return null;
    console.error("fetchSingleBlog error:", error);
    throw error;
  }
};
