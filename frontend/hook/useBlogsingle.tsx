import { useQuery } from "@tanstack/react-query";
import { fetchSingleBlog } from "./functions/fetchsingleBlog";

const useBlogSingle = (slug: string) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => fetchSingleBlog(slug),
  });
  return { data, isLoading, isError, refetch };
};

export default useBlogSingle;
