"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

import TestimonialVideocard from "./Videotestimonial";

type Testimonial = {
  id?: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type Props = {
  data: Testimonial[];
};

const VideoTestimonialSwiper: React.FC<Props> = ({ data }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  if (!data?.length) return null;

  return (
    <div className="relative">
      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        onMouseEnter={() => swiperInstance?.autoplay?.stop()}
        onMouseLeave={() => swiperInstance?.autoplay?.start()}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {data.map((testimonial, idx) => (
          <SwiperSlide key={testimonial.id ?? idx}>
            <TestimonialVideocard testimonial={testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        onClick={() => swiperInstance?.slidePrev()}
        className="absolute md:flex hidden items-center justify-center left-0 top-1/2 -translate-y-1/2 z-10 border-[#1fb5dd] shadow-md p-3 rounded-full border transition"
      >
        <ChevronLeft className="text-[#1fb5dd]" size={22} />
      </button>

      <button
        onClick={() => swiperInstance?.slideNext()}
        className="absolute md:flex hidden items-center justify-center -right-10 top-1/2 -translate-y-1/2 z-10 border-[#1fb5dd] shadow-md p-3 rounded-full border transition"
      >
        <ChevronRight className="text-[#1fb5dd]" size={22} />
      </button>
    </div>
  );
};

export default VideoTestimonialSwiper;
