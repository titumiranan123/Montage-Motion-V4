"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

import Image from "next/image";
import ReactPlayer from "react-player";

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
  const [playingId, setPlayingId] = useState<string | number | null>(null);

  if (!data?.length) return null;

  return (
    <div
      className="relative"
      // Fix 1: wrapper div এ mouse events দেওয়া হয়েছে
      onMouseEnter={() => swiperInstance?.autoplay?.stop()}
      onMouseLeave={() => {
        // Fix 2: কোনো video play হলে mouse leave এও autoplay শুরু হবে না
        if (playingId === null) {
          swiperInstance?.autoplay?.start();
        }
      }}
    >
      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {data.map((testimonial, idx) => (
          <SwiperSlide key={testimonial.id ?? idx}>
            <div className="md:w-102.5 w-75 h-197.75 mx-auto md:p-6 p-1 rounded-3xl flex flex-col gap-4 glassShadow bg-white/40 backdrop-blur-2xl">
              {/* Video Player Section */}
              <div className="md:w-[355.67px] h-[660.43px] rounded-[13px] overflow-hidden relative">
                <ReactPlayer
                  light={testimonial?.thumbnail ?? true}
                  playIcon={
                    <button  aria-label={`Play video testimonial from ${testimonial.name}`}  className="w-16 absolute top-[42%] left-[44%] flex justify-center items-center rounded-xl h-10 text-white backdrop-blur-sm st group">
                      <Play
                        fill="#fff"
                        className="group-hover:scale-105 active:scale-90 duration-200 ease-in-out"
                      />
                    </button>
                  }
                  url={testimonial.video_message}
                  height={"100%"}
                  width={"100%"}
                  controls
                  // Fix 3: video play শুরু হলে autoplay বন্ধ ও id track
                  onPlay={() => {
                    setPlayingId(testimonial.id ?? idx);
                    swiperInstance?.autoplay?.stop();
                  }}
                  // Fix 4: video pause/end হলে id clear ও autoplay শুরু
                  onPause={() => {
                    setPlayingId(null);
                    swiperInstance?.autoplay?.start();
                  }}
                  onEnded={() => {
                    setPlayingId(null);
                    swiperInstance?.autoplay?.start();
                  }}
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
                <div className="text-(--text-primary)">
                  <h3 className="text-[20px] font-bold leading-tight poppins">
                    {testimonial.name}
                  </h3>
                  <p className="text-[14px] font-normal opensans">
                    {testimonial.designation}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        onClick={() => swiperInstance?.slidePrev()}
        aria-label="Previous slide"
        className="absolute md:flex hidden items-center justify-center left-0 top-1/2 -translate-y-1/2 z-10 border-[#1fb5dd] shadow-md p-3 rounded-full border transition"
      >
        <ChevronLeft className="text-[#1fb5dd]" size={22} />
      </button>

      <button
        onClick={() => swiperInstance?.slideNext()}
        aria-label="Next slide"
        className="absolute md:flex hidden items-center justify-center -right-10 top-1/2 -translate-y-1/2 z-10 border-[#1fb5dd] shadow-md p-3 rounded-full border transition"
      >
        <ChevronRight className="text-[#1fb5dd]" size={22} />
      </button>
    </div>
  );
};

export default VideoTestimonialSwiper;