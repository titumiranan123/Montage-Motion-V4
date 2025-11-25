import ContactSection from "@/component/share/ContactSection";
import FaqSection from "@/component/share/FaqSection";
import React from "react";
import TalkingHeader from "./TalkingHeader";
import TalkingService from "./TalkingService";
import TalkingHeadWork from "./TalkingHeadWork";
import TalkingHeadprocess from "./TalkingHeadprocess";
import TalkingWhychooseus from "./TalkingHeadChooseus";
import TalkingHeadPlanPurpose from "./TalkingHeadPlanPurpose";
import TestimonialSection from "@/component/share/Testimonial";
import TalkingHeadPricing from "./TalkingHeadPricing";
import { getPageSEO } from "@/component/share/getPageSEO";
import PodcastPricing from "../podcast-editing-service/PodcastPricing";
import WhyChooseUs from "@/component/home/WhyChooseUs";
import ServiceSections from "@/component/home/ServiceSections";
export async function generateMetadata() {
  return await getPageSEO("talking");
}
const getPageData = async () => {
  const [seoRes, mainRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seo/talkinghead`, {
      cache: "no-store",
    }),
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/website/data?type=talkinghead&&table=services,pricing,process,whychooseus`,
      {
        cache: "no-store",
      }
    ),
  ]);
  const seoData = await seoRes.json();
  const data = await mainRes.json();
  return { seo: seoData.data, main: data.data };
};
const TalkingHeadEditing = async () => {
  const { main } = await getPageData();
  console.log(main);
  return (
    <div>
      <TalkingHeader data={main?.header} />
      <TalkingHeadWork data={main?.works} />
      <ServiceSections data={main?.services} />
      <PodcastPricing pricing={main.pricing} />
      {/* common */}
      {main?.testimonial.length > 0 && (
        <TestimonialSection
          title="What Our Clients Say"
          description="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
          data={main?.testimonial}
        />
      )}
      {/* <TalkingHeadprocess />

      <TalkingHeadPlanPurpose /> */}
      <WhyChooseUs data={main?.whychooseus} />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default TalkingHeadEditing;
