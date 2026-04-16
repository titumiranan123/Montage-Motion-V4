/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Heading } from "./Headering";
import React from "react";
import VideoTestimonialSwiper from "./VideoTestimonialSwiper";
import TextTestimonialSwiper from "./TextTestimonailSwiper";

interface ITestimonial {
  id?: string;
  name: string;
  designation: string;
  image: string;
  video_message?: string;
  message?: string;
  position?: number;
  category: "message" | "video_message";
  type: string;
}

interface TestimonialSectionProps {
  title: string;
  description?: string;
  data: ITestimonial[];
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  title,
  
  data,
}) => {
  const video_message =
    data?.filter((item: any) => item.category !== "message") || [];
  const messageTesti =
    data?.filter((item: any) => item.category === "message") || [];

  return (
    <div className="container px-0!  testimonialbg rounded-[40px]    sectionGap">
      <div className=" py-15">
        <style>{`
      .testimonialbg {
        background:   linear-gradient(180deg, #E9F8FC 0%, #F6FDFF 100%);
      }
      `}</style>
        <Heading
          subtitle={"1,000+ creators trust us to edit their videos."}
          tag="Testimonials"
          title={title}
          width={"180"}
        />

        <div className="w-full mx-auto mt-10 lg:mt-16 ">
          <VideoTestimonialSwiper data={video_message} />
          <TextTestimonialSwiper data={messageTesti} />
        </div>
      </div>
    </div>
  );
};

// export default React.memo(TestimonialSection);
export default TestimonialSection;
