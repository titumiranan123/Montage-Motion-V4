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
      className="md:w-[475px] w-[340px]  md:h-[248px]  h-full  p-[1px] rounded-[18px] "
      borderClassName="md:w-[477px] md:h-[250px] w-[342px] h-full w-full h-full rounded-[18px] flex justify-center items-center"
    >
      <div
        // style={{ boxShadow: "0px 4px 60px 0px #1FB5DD29 inset" }}
        className=" md:p-4  w-full h-auto p-4  flex flex-col gap-4"
      >
        <p className="text-white" title={`${testimonial.message}`}>
          {testimonial.message?.slice(0, 200)}{" "}
          {testimonial?.message && testimonial?.message?.length > 200
            ? "............"
            : ""}
        </p>
        <div className="flex justify-start gap-10 h-[90px] items-center">
          <Image
            className="rounded-full w-[64px] mt-5 h-[64px] overflow-hidden"
            src={testimonial.image}
            alt=""
            width={64}
            height={64}
            priority
          />
          <div className=" text-white flex flex-col gap-4">
            <h2 className="font-bold text-[20px]">{testimonial.name}</h2>
            <p className="text-[14px] font-[400] md:-mt-5">
              {testimonial.designation}
            </p>
          </div>
        </div>
      </div>
    </Gradientcard>
  );
};

export default TestimonialMessagecard;
