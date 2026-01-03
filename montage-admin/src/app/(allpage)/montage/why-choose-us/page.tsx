import React from "react";
import axios from "axios";
import Whychoosewrapper from "./Whychoosewrapper";

const Page = async ({ searchParams }: { searchParams: any }) => {
  const { page } = await searchParams;
  const responsce = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/why-choose-us?type=${
      page ?? "home"
    }`
  );
  console.log(responsce.data);
  return (
    <main className="min-h-screen  py-10">
      <Whychoosewrapper
        data={responsce?.data?.data}
        key={responsce?.data?.data}
      />
    </main>
  );
};

export default Page;
