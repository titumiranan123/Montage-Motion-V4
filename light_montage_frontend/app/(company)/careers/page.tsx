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
  const [data, seoRes] = await Promise.all([
    getData({ url: "api/jobpost" }),
    getData({ url: "api/seo/career" }),
  ]);

  const safeSchema =
    seoRes?.data?.schema ??
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
      <OurStory />
      <JobPost data={data?.data ?? []} />
      <Locationsection />
    </div>
  );
};

export default Careers;
