import { getData } from "@/utils/getDate";
import React from "react";
import Blogwraper from "./Blogwraper";

interface BlogsPageProps {
  searchParams: Promise<{ page?: string }>;
}

const Blogs = async ({ searchParams }: BlogsPageProps) => {
  const { page: pageParam } = await searchParams;
  const requestedPage = Number(pageParam);
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const limit = 6;
  const result = await getData({ slug: `blogs?page=${currentPage}&limit=${limit}` });
  const data = Array.isArray(result) ? result : result?.data ?? [];
  const totalPages = Array.isArray(result) ? 1 : result?.pages || 1;

  return (
    <div>
      <Blogwraper
        data={data}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Blogs;
