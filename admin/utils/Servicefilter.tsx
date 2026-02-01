"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getDataCategory } from "./getCategory";
import { useRouter, useSearchParams } from "next/navigation";

export const ServiceFilter = ({ slice = 0 }: { slice?: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = searchParams.get("page");

  // Set default page if missing
  useEffect(() => {
    if (!currentPage) {
      router.replace("?page=home"); // replace prevents reload
    }
  }, [currentPage, router]);

  // Fetch category list
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getDataCategory,
  });
  return (
    <select
      value={currentPage ?? "home"}
      onChange={(e) => {
        router.push(`?page=${e.target.value}`);
      }}
      className="bg-[#101828] border border-slate-300 rounded-lg p-2 text-white w-full md:w-[200px]"
    >
      {data?.slice(slice)?.map((item: any, idx: number) => (
        <option key={idx} value={item.service_type}>
          {item.service_title}
        </option>
      ))}
    </select>
  );
};
