/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getDataCategory } from "./getCategory";

import { useEffect } from "react";

export const ServiceTypeSelect = ({
  onChange,
  value,
  slice = 0,
  others = [],
}: {
  value: string;
  onChange: (p: string) => void;
  slice?: number;
  others?: any[];
}) => {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getDataCategory,
  });

  const allTypes = [...(data ?? []), ...others];

  useEffect(() => {
    if (!value && allTypes.length > 0) {
      onChange(allTypes[slice]?.service_type);
    }
  }, [allTypes.length]); // runs when options first arrive

  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="bg-[#101828] border border-slate-300 rounded-lg p-2 text-white w-full md:w-50"
    >
      {allTypes?.slice(slice)?.map((item: any, idx: number) => (
        <option key={idx} value={item.service_type}>
          {item.service_title}
        </option>
      ))}
    </select>
  );
};
