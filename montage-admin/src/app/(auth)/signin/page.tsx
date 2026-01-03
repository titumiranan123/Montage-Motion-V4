import React from "react";
import LoginPage from "./Signin";

const Page = async ({
  searchParams,
}: {
  searchParams: { message?: string };
}) => {
  console.log(await searchParams);

  return (
    <div>
      <LoginPage message={(await searchParams?.message) || "unauthorized"} />
    </div>
  );
};

export default Page;
