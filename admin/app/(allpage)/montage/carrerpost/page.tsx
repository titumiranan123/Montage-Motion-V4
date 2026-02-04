import React from "react";
export const dynamic = "force-dynamic";
import CareerWrapper from "./CareerWrapper";
import axios from "axios";

const page = async () => {
  const responsce = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/jobpost`,
  );

  return (
    <div>
      <CareerWrapper data={responsce?.data?.data} />
    </div>
  );
};

export default page;
