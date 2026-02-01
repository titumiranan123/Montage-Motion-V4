import React from "react";
import Locationsection from "../contact-us/Locationsection";
import JobPost from "./JobPost";
import CareersHeader from "./CareersHeader";
import { getPageSEO } from "@/component/share/getPageSEO";
import OurStory from "../about-us/OurStory";
import { getData } from "@/utils/getData";
export async function generateMetadata() {
  return await getPageSEO("career");
}
const Careers = async () => {
  const data = await getData({ url: `api/jobpost` });
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
