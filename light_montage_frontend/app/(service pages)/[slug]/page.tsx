import { getPageSEO } from "@/component/share/getPageSEO";
import { getData } from "@/utils/getData";
import React from "react";
import { getTypeFromSlug } from "./getTypeFromSlug";
import PageContactsections from "../(servicepage-component)/PageContactsections";
import PageFaqSection from "../(servicepage-component)/PagefaqSection";
import PageProcesssection from "../(servicepage-component)/PageProcesssection";
import PagePricing from "../(servicepage-component)/PagePricing";
import PageServicesection from "../(servicepage-component)/PageServicesection";
export async function generateMetadata() {
  return await getPageSEO("contact");
}
const ServicePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const type = await getTypeFromSlug(slug);
  console.log("type : ", `api/website/services/data?${type}`);
  const data = await getData({
    url: `api/website/services/data?type=${slug}`,
  });
  console.log(data?.data);
  return (
    <div className="min-h-screen text-black mt-40 ">
      {slug}
      {"thumbnail-design-service" === slug && (
        <>
          <PageServicesection data={data?.data?.service?.[0]} />
          <PagePricing pricing={data?.data?.pricing} />
          <PageProcesssection data={data?.data?.process} />
          <PageFaqSection />
          <PageContactsections />
        </>
      )}
    </div>
  );
};

export default ServicePage;
