/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/refs */
"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import TestimonialVideocard from "./Videotestimonial";

type Testimonial = {
  id?: string | number;
  [key: string]: any;
};

type Props = {
  data: Testimonial[];
};

const VideoTestimonialSwiper: React.FC<Props> = ({ data }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  if (!data?.length) return null;

  return (
    <div className="relative">
      <div>
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== "boolean") {
              swiper.params.navigation!.prevEl = prevRef.current;
              swiper.params.navigation!.nextEl = nextRef.current;
            }
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {data.map((testimonial, idx) => (
            <SwiperSlide key={testimonial.id ?? idx}>
              <div
                className=""
                // data-aos="fade-up"
                // data-aos-delay={100 + idx * 100}
              >
                <TestimonialVideocard testimonial={testimonial} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className="absolute md:block hidden left-0 top-1/2 -translate-y-1/2 z-10 border-[#1fb5dd] shadow-md p-3 rounded-full border transition"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        ref={nextRef}
        className="absolute md:block hidden -right-10 top-1/2 -translate-y-1/2 z-10 border-[#1fb5dd] shadow-md p-3 rounded-full border transition"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
};

export default VideoTestimonialSwiper;
