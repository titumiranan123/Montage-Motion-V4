import React from "react";
export const dynamic = "force-dynamic";
import CareerWrapper from "./CareerWrapper";
import axios from "axios";

const page = async () => {
  let data = null;
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/jobpost`);
    data = response?.data?.data ?? null;
  } catch (error) {
    console.error("Failed to load career page:", error);
  }

  return (
    <div>
      <CareerWrapper data={data} />
    </div>
  );
};

export default page;
