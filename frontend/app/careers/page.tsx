import React from "react";
import WhyjoinMontagemotion from "./WhyjoinMontagemotion";
import Locationsection from "../contact-us/Locationsection";
import JobPost from "./JobPost";
import CareersHeader from "./CareersHeader";
import { getPageSEO } from "@/component/share/getPageSEO";
export async function generateMetadata() {
  return await getPageSEO("career");
}
const Careers = () => {
  return (
    <div>
      <CareersHeader />
      <WhyjoinMontagemotion />
      <JobPost />
      <Locationsection />
    </div>
  );
};

export default Careers;
