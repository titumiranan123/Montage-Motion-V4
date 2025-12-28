import HeaderService from "@/component/about/Header";
import TestimonialSection from "@/component/share/Testimonial";
import React from "react";
import InsideMontage from "./InsideMontage";
import OurMission from "./OurMission";
import OurTeam from "./OurTeam";
import OurStory from "./OurStory";
import { getPageSEO } from "@/component/share/getPageSEO";
import ContactSection from "@/component/share/ContactSection";

import { getData } from "@/utils/getData";
import FaqSection from "@/component/share/FaqSection";
import PartnersSection from "@/component/home/PatnersSection";

// Metadata for SEO
export async function generateMetadata() {
  return await getPageSEO("about");
}

const AboutUs = async () => {
  const data = await getData({
    url: `api/website/data?type=about&table=brand,members`,
  });
  console.log(data?.data?.brand);
  return (
    <div className=" mt-2 md:pt-0 ">
      <div className="headerbg rounded-[40px] max-w-[1440px] px-2 xl:px-[60px] mx-auto pb-[60px] pt-16 mb-10">
        <HeaderService mainIntro={data?.data?.header || null} />
      </div>
      <PartnersSection data={data?.data?.brand ?? []} />
      {/* <Brand /> */}
      <OurMission />

      {data?.data?.testimonial?.length > 0 && (
        <TestimonialSection
          title="What Our Clients Say"
          description="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
          data={data?.data?.testimonial}
        />
      )}

      <OurStory />
      <OurTeam members={data?.data?.members} />
      <FaqSection />
      <InsideMontage />
      <ContactSection />
    </div>
  );
};

export default AboutUs;
