/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Marquee from "react-fast-marquee";
import TestimonialMessagecard from "./TextTestimonial";

type Props = {
  data: any[];
};

const TextTestimonialSwiper: React.FC<Props> = ({ data }) => {
  if (!data?.length) return null;

  return (
    <div className="mt-5">
      <Marquee
        gradient={true}
        gradientColor={`255, 255, 255`} 
        speed={50}
        pauseOnHover={true}
      >
        <div className="flex gap-6 px-5 overflow-y-hidden">
          {data.map((testimonial, idx) => (
            <div
              key={testimonial.id ?? idx}
              className=""
            >
              <TestimonialMessagecard testimonial={testimonial} idx={idx} />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default TextTestimonialSwiper;