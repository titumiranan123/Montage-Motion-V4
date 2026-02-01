import React from "react";
import { getData } from "@/utils/getDate";
import Industrieswrapper from "./Industrieswrapper";

const IndustriesPage: React.FC<{ searchParams: any }> = async ({
  searchParams,
}) => {
  const { page } = await searchParams;
  const data = await getData({ slug: `industries?page=${page}` });
  console.log(data);
  return (
    <div>
      <Industrieswrapper data={data?.[0]} />
    </div>
  );
};

export default IndustriesPage;
