"use client";
import TestimonialMessagecard from "./TextTestimonial";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import TestimonialVideocard from "./Videotestimonial";
import React from "react";
import Heading from "./Headering";
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
    <div className="container sectionGap min-h-screen ">
      <Heading subtitle={description} tag="Testimonials" title={title} />

      <div className="w-full mx-auto mt-10 lg:mt-16 ">
        <Marquee
          gradientColor="#000"
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
          className=" mt-5 overflow-hidden h-[320px]"
          gradientColor="#000"
          gradientWidth={100}
          gradient
          pauseOnHover
        >
          {messageTesti?.map((testimonial: ITestimonial, idx: number) => (
            <div
              key={idx}
              className="px-5"
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
  );
};

// export default React.memo(TestimonialSection);
export default TestimonialSection;
