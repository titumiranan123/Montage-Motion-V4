import React from "react";
import LoginPage from "./Signin";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) => {
  const { message } = await searchParams;
  return (
    <div>
      <LoginPage message={message || "unauthorized"} />
    </div>
  );
};

export default Page;
