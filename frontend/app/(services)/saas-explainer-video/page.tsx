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
import ServiceSections from "@/component/home/ServiceSections";
import PodcastProcess from "../podcast-editing-service/PodcastProcess";
export async function generateMetadata() {
  return await getPageSEO("saas");
}
const getPageData = async () => {
  const [seoRes, mainRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seo/saas`, {
      cache: "no-store",
    }),
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/website/data?type=saas&&table=services,pricing,process,whychooseus,brand`,
      {
        cache: "no-store",
      }
    ),
  ]);
  const seoData = await seoRes.json();
  const data = await mainRes.json();
  return { seo: seoData.data, main: data.data };
};
const SaaSExplainer = async () => {
  const { main } = await getPageData();
  // console.log(main.works);
  return (
    <div>
      <SaasHeader data={main?.header} />
      <SaasMarquee />
      {/* <PartnersSection data={main?.brand} /> */}
      <SaasThirdSection />
      <SaasWork data={main?.works} />
      <ServiceSections data={main?.services} />
      <PodcastProcess data={main.process} />
      <WhySassVideo />
      {main?.testimonial.length > 0 && (
        <TestimonialSection
          title="What Our Clients Say"
          description="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
          data={main?.testimonial}
        />
      )}
      <WhyChooseUs data={main?.whychooseus} />
      <FaqSection />
      <FirstSection />
    </div>
  );
};

export default SaaSExplainer;
