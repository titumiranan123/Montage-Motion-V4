import React from "react";
import ServiceForm from "./Serviceform";
import axios from "axios";
import Servicewrapper from "./Servicewrapper";

const Page = async ({ searchParams }: { searchParams: any }) => {
  const { page } = await searchParams;
  const responsce = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/our-service?type=${page}`
  );

  return (
    <main className="min-h-screen  py-10">
      <Servicewrapper
        data={responsce?.data?.data}
        key={responsce?.data?.data}
        page={page}
      />
    </main>
  );
};

export default Page;
