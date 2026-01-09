import React from "react";
import Locationsection from "../contact-us/Locationsection";
import JobPost from "./JobPost";
import CareersHeader from "./CareersHeader";
import { getPageSEO } from "@/component/share/getPageSEO";
import OurStory from "../about-us/OurStory";
export async function generateMetadata() {
  return await getPageSEO("career");
}
const Careers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobpost`);
  const data = await res.json();
  // console.log();
  return (
    <div className="mt-5 ">
      <CareersHeader />
      <OurStory />
      <JobPost data={data?.data ?? []} />
      <Locationsection />
    </div>
  );
};

export default Careers;
