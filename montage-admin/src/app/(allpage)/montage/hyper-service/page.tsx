import React from "react";
import axios from "axios";
import HyperServicewrapper from "./HyperServicewrapper";

const Page = async () => {
  const responsce = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/home-service?type=home`
  );

  return (
    <main className="min-h-screen  py-10">
      <HyperServicewrapper
        data={responsce?.data?.data}
        key={responsce?.data?.data}
      />
    </main>
  );
};

export default Page;
