import Image from "next/image";
import React from "react";
import ReactPlayer from "react-player";
import Gradientcard from "./Gradientcard";

interface Testimonial {
  id?: string;
  name: string;
  designation: string;
  image: string;
  thumbnail?: string;
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

const TestimonialVideocard = ({
  testimonial,
}: {
  testimonial: Testimonial;
}) => {
  return (
    <Gradientcard
      borderClassName="md:w-[386px] w-[302px]  h-[742px] mx-auto p-[1px] rounded-[18px] flex justify-center items-center"
      className="md:w-[384px] w-[300px]  h-[740px] mx-auto p-3 rounded-[18px]"
    >
      <div
        className=" p-3  flex flex-col  gap-4"
        // style={{ boxShadow: "0px 4px 60px 0px #1FB5DD29 inset" }}
      >
        {/* Video Player Section */}
        <div className="w-[344px] h-[612px] rounded-[13px] overflow-hidden relative">
          <ReactPlayer
            light={testimonial?.thumbnail ?? true}
            playIcon={
              <div className="flex items-center justify-center w-[68px] h-[48px]">
                <Image
                  src="/assets/icon/playsmall.png"
                  width={68}
                  height={48}
                  alt="Play"
                  className=""
                  priority
                />
              </div>
            }
            src={testimonial.video_message}
            height={"100%"}
            width={"100%"}
            controls
          />
        </div>

        {/* Profile Info Section */}
        <div className="flex items-center gap-4 mt-2">
          <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
            <Image
              src={testimonial.image}
              alt={`${testimonial.name}'s profile`}
              className="object-cover"
              width={64}
              height={64}
              priority
            />
          </div>
          <div className="text-white">
            <h3 className="text-[20px] font-bold leading-tight poppins">
              {testimonial.name}
            </h3>
            <p className="text-[14px] font-[400] opensans ">
              {testimonial.designation}
            </p>
          </div>
        </div>
      </div>
    </Gradientcard>
  );
};

export default TestimonialVideocard;
