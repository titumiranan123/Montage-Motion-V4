import { api_url } from "../Apiurl";

export const fetchHomeapi = async (type: any) => {
  const res = await api_url.get(`/api/website/data?type=${type}`);
  return res.data.data;
};
