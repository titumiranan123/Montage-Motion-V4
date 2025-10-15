import Brand from "@/component/about/Brand";
import HeaderService from "@/component/about/Header";
import TestimonialSection from "@/component/share/Testimonial";
import React from "react";
import InsideMontage from "./InsideMontage";
import OurMission from "./OurMission";
import FirstSection from "../contact-us/FirstSection";
import OurTeam from "./OurTeam";
import OurStory from "./OurStory";

const AboutUs = async () => {
  const res = await fetch(
    "https://api-v2.montagemotion.com/api/website/data?type=main",
    { cache: "no-store" } // ensures fresh data on every request
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

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
