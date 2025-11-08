import Brand from "@/component/about/Brand";
import HeaderService from "@/component/about/Header";
import TestimonialSection from "@/component/share/Testimonial";
import React from "react";
import InsideMontage from "./InsideMontage";
import OurMission from "./OurMission";
import FirstSection from "../contact-us/FirstSection";
import OurTeam from "./OurTeam";
import OurStory from "./OurStory";
import { getPageSEO } from "@/component/share/getPageSEO";
export async function generateMetadata() {
  return await getPageSEO("about");
}
const AboutUs = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/website/data?type=about&&table=brand`,
    { cache: "no-store" } // ensures fresh data on every request
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  console.log(data.data);
  return (
    <div className="">
      <HeaderService mainIntro={data?.data?.header} />
      <Brand />
      <OurMission />
      {data?.data?.testimonial.length > 0 && (
        <TestimonialSection
          title="What Our Clients Say"
          description="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
          data={data?.data?.testimonial}
        />
      )}
      <OurStory />
      <OurTeam />
      <InsideMontage />
      <FirstSection />
    </div>
  );
};

export default AboutUs;
