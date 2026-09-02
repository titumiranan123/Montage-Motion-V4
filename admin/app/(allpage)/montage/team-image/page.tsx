/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Brandwrapper from "./Teamimagewrapper";

const BrandSection = async () => {
  let data = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/team-image`,
      { cache: "no-store" },
    );
    if (!response.ok) throw new Error(`Team images request failed: ${response.status}`);
    const result = await response.json();
    data = result?.data ?? [];
  } catch (error) {
    console.error("Failed to load team images:", error);
  }

  return <Brandwrapper data={data} />;
};

export default BrandSection;
