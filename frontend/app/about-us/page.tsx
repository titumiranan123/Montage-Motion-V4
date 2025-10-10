import Brand from "@/component/about/Brand";
import HeaderService from "@/component/about/Header";
import TestimonialSection from "@/component/share/Testimonial";
import React from "react";
import OurLocation from "./OurLocation";
import OurMission from "./OurMission";

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
    <div>
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
      <OurLocation />
    </div>
  );
};

export default AboutUs;
