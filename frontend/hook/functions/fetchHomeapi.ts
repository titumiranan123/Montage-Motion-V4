import { api_url } from "../Apiurl";

export const fetchHomeapi = async (type: string) => {
  const res = await api_url.get(`/api/website/data?type=${encodeURIComponent(type)}`);
  return res.data.data;
};
