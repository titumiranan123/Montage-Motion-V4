import { api_url } from "../Apiurl";

export const fetchBlog = async () => {
  const res = await api_url.get("/api/website/blog");
  return res.data.data;
};
