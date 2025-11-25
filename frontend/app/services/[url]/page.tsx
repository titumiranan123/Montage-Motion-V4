import React from "react";

const page = async ({ params }: { params: any }) => {
  const { url } = await params;
  return <div></div>;
};

export default page;
