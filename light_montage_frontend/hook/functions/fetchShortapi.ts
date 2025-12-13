import { api_url } from "../Apiurl";

export const fetchShortsapi = async () => {
  const res = await api_url.get("/api/works/website?type=shorts");
  return res.data.data;
};
