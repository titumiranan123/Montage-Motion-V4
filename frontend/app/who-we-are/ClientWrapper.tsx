import Brand from "@/component/about/Brand";
import HeaderService from "@/component/about/Header";
import TestimonialSection from "@/component/share/Testimonial";
import React from "react";

const AboutUs = async () => {
  const res = await fetch(
    "https://api-v2.montagemotion.com/api/website/data?type=main",
    { cache: "no-store" } // ensures fresh data on every request
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  console.log(data.data.header);
  return (
    <div>
      <HeaderService mainIntro={data?.data?.header} />
      {/* <Brand />
      {data?.testimonial?.length > 0 && (
        <TestimonialSection
          title="Testimonials"
          description="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
          data={data?.testimonial}
          isLoading={false}
        />
      )} */}
    </div>
  );
};

export default AboutUs;
