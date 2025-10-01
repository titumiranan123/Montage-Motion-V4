import { api_url } from "../Apiurl";

export const AboutFetch = async () => {
  const res = await api_url.get("/api/website/about");
  return res.data.data;
};
