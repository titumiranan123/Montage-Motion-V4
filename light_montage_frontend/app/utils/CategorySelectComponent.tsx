"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getDataCategory } from "./getCategory";

export const CategorySelectComponent = ({
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
      value={value} // <-- THIS MAKES SELECTED WORK
      onChange={(e) => {
        onChange(e.target.value); // only call prop function
      }}
      className="max-w-[542px] w-full h-14 rounded-2xl border border-[#B9BEBF] animated hover:scale-[103%]  p-3  text-(--text-primary)  focus:outline-none backdrop-blur-2xl text-[16px] leading-[100%] font-normal"
    >
      {data
        ?.slice(1)
        .map((item: { service_type: string; service_title: string }) => (
          <option key={item.service_type} value={item.service_type}>
            {item.service_title}
          </option>
        ))}
    </select>
  );
};
