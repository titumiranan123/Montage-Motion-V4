import { useQuery } from "@tanstack/react-query";
const useCaseStudy = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["case-studies"],
    queryFn: async() => await fetchCaseStudy(),
  });
  return { data, isLoading, isError, refetch };
};

export default useCaseStudy;
async function fetchCaseStudy() {
  const response = await fetch('/api/case-studies');
  if (!response.ok) {
    throw new Error('Failed to fetch case studies');
  }
  return response.json();
}

