import { useQuery } from "@tanstack/react-query";
import { api_url } from "./Apiurl";
const useCategories = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api_url.get("/api/website/service/type");
      return res?.data?.data;
    },
  });
  return { data, isLoading, isError, refetch };
};

export default useCategories;
