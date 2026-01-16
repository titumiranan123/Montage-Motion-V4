"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getDataCategory } from "./getCategory";
import { useSearchParams } from "next/navigation";

export const ServiceTypeSelect = ({
  onChange,
  value,
}: {
  value: string;
  onChange: (p: string) => void;
}) => {
  // Fetch category list
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getDataCategory,
  });

  return (
    <select
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      className="bg-[#101828] border border-slate-300 rounded-lg p-2 text-white w-full md:w-[200px]"
    >
      {data?.slice(1)?.map((item: any) => (
        <option key={item} value={item.service_type}>
          {item.service_title}
        </option>
      ))}
    </select>
  );
};
