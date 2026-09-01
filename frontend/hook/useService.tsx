import { useQuery } from "@tanstack/react-query";
import { api_url } from "./Apiurl";

const useService = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["service"],
    queryFn: async () => {
      const response = await api_url.get("/api/website/service/type");
      return response.data;
    },
    select: (data) => data.data,
  });
  return { data, isLoading, refetch };
};

export default useService;
