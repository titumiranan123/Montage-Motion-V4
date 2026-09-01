import { api_url } from "../Apiurl";

export const fetchSingleBlog = async (slug: string) => {
  const res = await api_url.get(`/api/website/blog/${slug}`);
  return res.data.data;
};
