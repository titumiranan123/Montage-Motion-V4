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
 
  const data = await getData({ url: "api/website/carrer" })

  const safeSchema =
    data?.data?.schema ??
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "MontageMotion",
    });
  return (
    <div className="lg:mt-5 mt-2">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeSchema,
        }}
      />
      <CareersHeader />
      <OurStory data={data?.data?.ourstory?.[0]} />
      <JobPost data={data?.data?.jobpost ?? []} />
      <Locationsection />
    </div>
  );
};

export default Careers;
