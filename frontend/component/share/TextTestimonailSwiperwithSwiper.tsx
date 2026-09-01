/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import TestimonialMessagecard from "./TextTestimonial";

type Props = {
  data: any[];
};
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
const TextTestimonialSwiper: React.FC<Props> = ({ data }) => {
  if (!data?.length) return null;

  return (
    <div className="mt-5">
      {" "}
      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2.5 },
        }}
        className="textSwiper"
      >
        {data.map((testimonial, idx) => (
          <SwiperSlide key={testimonial.id ?? idx}>
            <div
              className=""
              data-aos="fade-up"
              data-aos-delay={100 + idx * 100}
            >
              <TestimonialMessagecard
                testimonial={testimonial}
                key={testimonial?.id || idx}
              />
            </div>
          </SwiperSlide>
        ))}
        <style>{`
   .textSwiper{
   height: 360px;
   }
   .swiper-pagination-bullet{
     background: linear-gradient(180deg, #1fb5dd 0%, #2b6ab2 100%);
   }
   `}</style>
      </Swiper>
    </div>
  );
};

export default TextTestimonialSwiper;
