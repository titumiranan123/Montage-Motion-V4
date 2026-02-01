import React from "react";
import PricingWrapper from "./PricingWrapper";
import axios from "axios";

const page = async ({ searchParams }: { searchParams: any }) => {
  const { page } = await searchParams;
  const responsce = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/pricing?type=${page ?? "main"}`,
  );

  return (
    <div>
      <PricingWrapper data={responsce?.data?.data} />
    </div>
  );
};

export default page;
