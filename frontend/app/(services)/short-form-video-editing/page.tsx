import { getPageSEO } from "@/component/share/getPageSEO";
import React from "react";
export async function generateMetadata() {
  const res = await getPageSEO("shorts");

  console.log(res);
  return res;
}
const page = () => {
  return <div></div>;
};

export default page;
