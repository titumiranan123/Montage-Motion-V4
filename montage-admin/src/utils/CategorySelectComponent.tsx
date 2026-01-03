"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getDataCategory } from "./getCategory";
import { useRouter, useSearchParams } from "next/navigation";

export const CategorySelectComponent = ({
  onChange,
  value,
}: {
  value?: string;
  onChange?: (p: string) => void;
}) => {
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
      value={onChange ? value : currentPage ?? value ?? "home"} // <-- THIS MAKES SELECTED WORK
      onChange={(e) => {
        if (onChange) {
          onChange(e.target.value); // only call prop function
        } else {
          router.push(`?page=${e.target.value}`); // fallback to router
        }
      }}
      className="bg-[#101828] border border-slate-300 rounded-lg p-2 text-white w-full md:w-[200px]"
    >
      {data?.map((item: any) => (
        <option key={item} value={item.service_type}>
          {item.service_title}
        </option>
      ))}
    </select>
  );
};
