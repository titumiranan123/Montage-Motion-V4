import React from "react";
import { getData } from "@/utils/getDate";
import Industrieswrapper from "./Industrieswrapper";

const IndustriesPage: React.FC<{ searchParams: any }> = async ({
  searchParams,
}) => {
  const { page } = await searchParams;
  const data = await getData({ slug: `works?type=${page}` });

  return (
    <div>
      <Industrieswrapper data={data} />
    </div>
  );
};

export default IndustriesPage;
