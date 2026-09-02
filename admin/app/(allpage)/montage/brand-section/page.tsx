import React from "react";
import Brandwrapper from "./Brandwrapper";
import { BrandCardData } from "./Brandcard";

const BrandSection = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  let data: BrandCardData[] = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brand/images${
        page ? `?type=${encodeURIComponent(page)}` : ""
      }`,
      { cache: "no-store" },
    );
    if (!response.ok) throw new Error(`Brand images request failed: ${response.status}`);
    const result = await response.json();
    data = Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.error("Could not load brand images", error);
  }

  return <Brandwrapper data={data} />;
};

export default BrandSection;
