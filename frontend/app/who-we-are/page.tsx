"use client";
import Brand from "@/component/about/Brand";
import HeaderService from "@/component/about/Header";
import TestimonialSection from "@/component/share/Testimonial";
import useHomeApi from "@/hook/useHomeApi";
import React from "react";

const AboutUs = () => {
  const { data, isLoading } = useHomeApi("main");
  return (
    <div>
      <HeaderService isLoading={isLoading} mainIntro={data?.header} />
      <Brand />
      {data?.testimonial?.length > 0 && (
        <TestimonialSection
          title={"Testimonials"}
          description={
            "Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
          }
          data={data?.testimonial}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default AboutUs;
