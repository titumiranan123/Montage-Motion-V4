import WhyChooseUs from "@/component/home/WhyChooseUs";
import ContactSection from "@/component/share/ContactSection";
import FaqSection from "@/component/share/FaqSection";
import { getPageSEO } from "@/component/share/getPageSEO";
import React from "react";
import PodcastProcess from "../podcast-editing-service/PodcastProcess";
import TestimonialSection from "@/component/share/Testimonial";
import PodcastPricing from "../podcast-editing-service/PodcastPricing";
import ServiceSections from "@/component/home/ServiceSections";
import IndustryWeWork from "@/component/share/IndustryWork";
import ShortsWorks from "./ShortsWorks";
import ShortsHeader from "./ShortsHeader";
export async function generateMetadata() {
  const res = await getPageSEO("shorts");
  return res;
}
const getPageData = async () => {
  const [seoRes, mainRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seo/shorts`, {
      cache: "no-store",
    }),
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/website/data?type=shorts&&table=services,pricing,process,whychooseus`,
      {
        cache: "no-store",
      }
    ),
  ]);
  const seoData = await seoRes.json();
  const data = await mainRes.json();
  return { seo: seoData.data, main: data.data };
};
const page = async () => {
  const { main } = await getPageData();
  return (
    <div>
      <ShortsHeader data={main?.header} />
      <ShortsWorks data={main?.works} />
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
      <PodcastProcess data={main.process} />
      <IndustryWeWork />
      <WhyChooseUs data={main?.whychooseus} />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default page;
