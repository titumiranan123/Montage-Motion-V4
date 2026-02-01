import { useQuery } from "@tanstack/react-query";
import { api_url } from "./Apiurl";
const useAlltype = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["alltype"],
    queryFn: async () => await api_url.get(`/api/website/service/type`),
  });
  const type = data?.data?.data ?? [];
  return { type, isLoading, isError, refetch };
};

export default useAlltype;
