import { useQuery } from "@tanstack/react-query";
import { api_url } from "./Apiurl";

const useHomeShorts = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["home shorts"],
    queryFn: async () => {
      const res = await api_url.get("/api/works/website?type=shorts");
      return res.data.data;
    },
  });
  return { data, isLoading, isError, refetch };
};

export default useHomeShorts;
