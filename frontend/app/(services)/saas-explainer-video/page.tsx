import React from "react";
import SaasHeader from "./SaasHeader";
import SaasWork from "./SaasWorksection";
import SaasMarquee from "./SaasMarquee";
import SaasThirdSection from "./SaasThirdSection";
import SaasService from "./SaasService";
import SaasProcess from "./SaasProcess";
import FirstSection from "@/app/contact-us/FirstSection";
import FaqSection from "@/component/share/FaqSection";
import WhyChooseUs from "@/component/home/WhyChooseUs";
import TestimonialSection from "@/component/share/Testimonial";
import WhySassVideo from "./WhySassVideo";
import { getPageSEO } from "@/component/share/getPageSEO";
export async function generateMetadata() {
  return await getPageSEO("saas");
}
const SaaSExplainer = async () => {
  const res = await fetch(
    "https://api-v2.montagemotion.com/api/website/data?type=main",
    { cache: "no-store" } // ensures fresh data on every request
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return (
    <div>
      <SaasHeader />
      <SaasMarquee />
      <SaasThirdSection />
      <SaasWork />
      <SaasService />
      <SaasProcess />
      <WhySassVideo />
      {data?.data?.testimonial.length > 0 && (
        <TestimonialSection
          title="What Our Clients Say"
          description="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
          data={data?.data?.testimonial}
        />
      )}
      <WhyChooseUs />
      <FaqSection />
      <FirstSection />
    </div>
  );
};

export default SaaSExplainer;
