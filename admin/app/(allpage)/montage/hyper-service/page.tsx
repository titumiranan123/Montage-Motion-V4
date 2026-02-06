import React from "react";
import HyperServicewrapper from "./HyperServicewrapper";
import { getData } from "@/utils/getDate";

const Page = async () => {
  const data = await getData({ slug: "home-service?type=home" });
  return (
    <main className="min-h-screen  py-10">
      <HyperServicewrapper data={data} key={data} />
    </main>
  );
};

export default Page;
