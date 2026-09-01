import { useQuery } from "@tanstack/react-query";
import { fetchBlog } from "./functions/fetchBlog";
const useBlog = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => fetchBlog(),
  });
  return { data, isLoading, isError, refetch };
};

export default useBlog;
