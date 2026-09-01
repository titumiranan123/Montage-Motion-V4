import { useQuery } from "@tanstack/react-query";
import { api_url } from "./Apiurl";
const useWorks = (category: string) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["works", category],
    queryFn: async () => {
      const res = await api_url.get(`api/works/website?type=${category}`);
      return res.data.data;
    },
  });
  return { data, isLoading, isError, refetch };
};

export default useWorks;
