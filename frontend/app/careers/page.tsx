import React from "react";
import WhyjoinMontagemotion from "./WhyjoinMontagemotion";
import Locationsection from "../contact-us/Locationsection";
import JobPost from "./JobPost";
import CareersHeader from "./CareersHeader";
import { getPageSEO } from "@/component/share/getPageSEO";
export async function generateMetadata() {
  return await getPageSEO("career");
}
const Careers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobpost`);
  const data = await res.json();
  // console.log();
  return (
    <div>
      <CareersHeader />
      <WhyjoinMontagemotion />
      <JobPost data={data?.data ?? []} />
      <Locationsection />
    </div>
  );
};

export default Careers;
