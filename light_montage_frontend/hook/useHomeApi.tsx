"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchHomeapi } from "./functions/fetchHomeapi";
const useHomeApi = (type: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["homeData", type],
    queryFn: () => fetchHomeapi(type),
  });
  return { data, isLoading, isError };
};

export default useHomeApi;
