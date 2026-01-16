import React from "react";
import { WorkWrapper } from "./WorksWrapper";
import { getData } from "@/utils/getDate";

const page: React.FC<{ searchParams: any }> = async ({ searchParams }) => {
  const { page } = await searchParams;
  const data = await getData({ slug: `works?type=${page}` });
  return (
    <div>
      <WorkWrapper data={data} />
    </div>
  );
};

export default page;
