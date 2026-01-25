"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getDataCategory } from "./getCategory";

export const ServiceTypeSelect = ({
  onChange,
  value,
  slice = 0,
}: {
  value: string;
  onChange: (p: string) => void;
  slice?: number;
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
      {data?.slice(slice)?.map((item: any) => (
        <option key={item} value={item.service_type}>
          {item.service_title}
        </option>
      ))}
    </select>
  );
};
