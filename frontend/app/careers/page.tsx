import React from "react";
import WhyjoinMontagemotion from "./WhyjoinMontagemotion";
import Locationsection from "../contact-us/Locationsection";
import JobPost from "./JobPost";
import CareersHeader from "./CareersHeader";

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
