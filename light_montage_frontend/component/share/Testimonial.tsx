/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Heading } from "./Headering";
import TestimonialMessagecard from "./TextTestimonial";

import TestimonialVideocard from "./Videotestimonial";
import React from "react";
import Marquee from "react-fast-marquee";

interface ITestimonial {
  id?: string;
  name: string;
  designation: string;
  image: string;
  video_message?: string;
  message?: string;
  position?: number;
  category: "message" | "video_message";
  type:
    | "main"
    | "shorts"
    | "talking"
    | "podcast"
    | "graphic"
    | "advertising"
    | "website";
}

interface TestimonialSectionProps {
  title: string;
  description: string;
  data: ITestimonial[];
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  title,
  description,
  data,
}) => {
  const video_message =
    data?.filter((item: any) => item.category !== "message") || [];
  const messageTesti =
    data?.filter((item: any) => item.category === "message") || [];

  return (
    <div className="container testimonialbg rounded-[40px]    sectionGap">
      <div className=" py-[60px]">
        <style>{`
      .testimonialbg {
        background:   linear-gradient(180deg, #E9F8FC 0%, #F6FDFF 100%);
      }
      `}</style>
        <Heading subtitle={description} tag="Testimonials" title={title} />

        <div className="w-full mx-auto mt-10 lg:mt-16 ">
          <Marquee
            gradientColor="#E9F8FC"
            gradientWidth={100}
            gradient
            pauseOnHover
            className="overflow-hidden"
          >
            {video_message?.map((testimonial: ITestimonial, idx: number) => (
              <div
                className="px-6"
                key={idx}
                data-aos="fade-up"
                data-aos-delay={100 + idx * 100}
              >
                <TestimonialVideocard
                  testimonial={testimonial}
                  key={testimonial.id || idx}
                />
              </div>
            ))}
          </Marquee>
          <Marquee
            className=" mt-5 overflow-hidden h-80"
            gradientColor="#E9F8FC"
            gradientWidth={100}
            gradient
            pauseOnHover
          >
            {messageTesti?.map((testimonial: ITestimonial, idx: number) => (
              <div
                key={idx}
                className="px-5 "
                data-aos="fade-up"
                data-aos-delay={100 + idx * 100}
              >
                <TestimonialMessagecard
                  testimonial={testimonial}
                  key={testimonial.id || idx}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

// export default React.memo(TestimonialSection);
export default TestimonialSection;
