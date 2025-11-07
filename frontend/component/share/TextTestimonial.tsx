import Image from "next/image";
import React from "react";
import Gradientcard from "./Gradientcard";
interface testimonial {
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
const TestimonialMessagecard = ({
  testimonial,
}: {
  testimonial: testimonial;
}) => {
  return (
    <Gradientcard
      borderClassName="md:w-[590px] w-[302px]  h-[301px] mx-auto p-[1px] rounded-[18px] flex justify-center items-center"
      className="md:w-[588px] w-[300px]  h-[299px] mx-auto p-3 rounded-[18px]"
    >
      <div
        // style={{ boxShadow: "0px 4px 60px 0px #1FB5DD29 inset" }}
        className=" md:p-4  w-full h-auto p-4  flex flex-col gap-4"
      >
        <Image
          className=" w-[40px]  h-[40px] "
          src={`/assets/comma.png`}
          alt=""
          width={40}
          height={40}
          priority
        />

        <p
          className="text-white opensans h-[95px] w-[95%] duration-300 delay-100 transition-all ease-in-out overflow-hidden hover:overflow-y-scroll"
          title={`${testimonial.message}`}
        >
          {testimonial.message}
        </p>
        <div className="flex justify-start gap-10 h-[90px] items-center">
          <Image
            className="rounded-full w-[64px]  mt-5 h-[64px] overflow-hidden"
            src={testimonial.image}
            alt=""
            width={64}
            height={64}
            priority
          />
          <div className=" text-white flex flex-col md:gap-4 gap-2">
            <h2 className="font-bold text-[20px] poppins">
              {testimonial.name}
            </h2>
            <p className="text-[14px] font-[400] md:-mt-5 opensans">
              {testimonial.designation}
            </p>
          </div>
        </div>
      </div>
    </Gradientcard>
  );
};

export default TestimonialMessagecard;
