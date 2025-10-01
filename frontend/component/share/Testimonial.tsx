import TestimonialMessagecard from "./TextTestimonial";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import TestimonialVideocard from "./Videotestimonial";
import React from "react";

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
  isLoading: boolean;
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  title,
  description,
  data,
  isLoading,
}) => {
  const video_message =
    data?.filter((item: any) => item.category !== "message") || [];
  const messageTesti =
    data?.filter((item: any) => item.category === "message") || [];

  // Create refs for the swiper instances
  const videoSwiperRef = React.useRef<any>(null);
  const textSwiperRef = React.useRef<any>(null);

  // Function to handle video play
  const handleVideoPlay = () => {
    if (videoSwiperRef.current && videoSwiperRef.current.swiper) {
      videoSwiperRef.current.swiper.autoplay.stop();
    }
  };

  // Function to handle video pause/end
  const handleVideoStop = () => {
    if (videoSwiperRef.current && videoSwiperRef.current.swiper) {
      videoSwiperRef.current.swiper.autoplay.start();
    }
  };
  const handleVideoCardClick = () => {
    if (videoSwiperRef.current?.swiper) {
      videoSwiperRef.current.swiper.autoplay.stop();
    }
  };
  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <div className="container section px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col text-white mx-auto gap-3 md:gap-4">
        <h2
          data-aos="fade-up"
          data-aos-delay="200"
          className="w-full text-center mx-auto gradienttext satoshi "
        >
          {title}
        </h2>
        <p data-aos="fade-up" data-aos-delay="300" className="text-center">
          {description}
        </p>
      </div>

      <div className="max-w-[970px] w-full mx-auto mt-10 lg:mt-16">
        {data && data.length > 0 ? (
          <div>
            {video_message?.length > 0 && (
              <Swiper
                ref={videoSwiperRef}
                slidesPerView={1}
                spaceBetween={20}
                freeMode={false}
                loop={true}
                speed={12000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                modules={[FreeMode, Autoplay]}
                className="testimonial-swiper-video"
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 5,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 5,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                    slidesPerGroup: 1,
                  },
                  1280: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                    slidesPerGroup: 1,
                  },
                }}
                grabCursor={true}
                resistance={true}
                resistanceRatio={0.85}
              >
                {video_message?.map(
                  (testimonial: ITestimonial, idx: number) => (
                    <SwiperSlide key={testimonial.id || idx}>
                      <div
                        key={idx}
                        data-aos="fade-up"
                        data-aos-delay={100 + idx * 100}
                      >
                        <TestimonialVideocard
                          testimonial={testimonial}
                          key={testimonial.id || idx}
                          onPlay={handleVideoPlay}
                          onPause={handleVideoStop}
                          onEnded={handleVideoStop}
                          onClick={handleVideoCardClick}
                        />
                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            )}

            {messageTesti?.length > 0 && (
              <Swiper
                ref={textSwiperRef}
                slidesPerView={1}
                spaceBetween={10}
                freeMode={false}
                speed={12000}
                modules={[FreeMode, Autoplay]}
                loop={true}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  reverseDirection: true,
                  pauseOnMouseEnter: true,
                }}
                className="testimonial-swiper-text"
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    slidesPerGroup: 1,
                  },
                  1280: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    slidesPerGroup: 1,
                  },
                }}
                grabCursor={true}
                resistance={true}
                resistanceRatio={0.85}
                onMouseEnter={() =>
                  videoSwiperRef.current?.swiper.autoplay.stop()
                }
                onMouseLeave={() =>
                  videoSwiperRef.current?.swiper.autoplay.start()
                }
              >
                {messageTesti?.map((testimonial: ITestimonial, idx: number) => (
                  <SwiperSlide key={testimonial.id || idx}>
                    <div
                      key={idx}
                      data-aos="fade-up"
                      data-aos-delay={100 + idx * 100}
                    >
                      <TestimonialMessagecard
                        testimonial={testimonial}
                        key={testimonial.id || idx}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        ) : (
          <div className="text-center text-white mt-8">
            No testimonials found
          </div>
        )}
      </div>
    </div>
  );
};
const SkeletonLoader = () => (
  <div className="max-w-[970px] w-full mx-auto mt-10 lg:mt-16">
    {/* Video testimonials skeleton */}
    <div className="mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-gray-800 rounded-lg overflow-hidden animate-pulse w-[321.11px] h-[575.59px] flex flex-col p-5 justify-between ">
          <div className="aspect-video bg-gray-700 h-full rounded-lg"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden animate-pulse w-[321.11px] h-[575.59px] flex flex-col p-5 justify-between ">
          <div className="aspect-video bg-gray-700 h-full rounded-lg"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden animate-pulse w-[321.11px] h-[575.59px] flex flex-col p-5 justify-between ">
          <div className="aspect-video bg-gray-700 h-full rounded-lg"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Text testimonials skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800 py-14 rounded-lg p-6 animate-pulse">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-700"></div>
          <div>
            <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-24"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-3 bg-gray-700 rounded w-full"></div>
          <div className="h-3 bg-gray-700 rounded w-5/6"></div>
          <div className="h-3 bg-gray-700 rounded w-4/6"></div>
        </div>
      </div>
      <div className="bg-gray-800 py-14 rounded-lg p-6 animate-pulse">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-700"></div>
          <div>
            <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-24"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-3 bg-gray-700 rounded w-full"></div>
          <div className="h-3 bg-gray-700 rounded w-5/6"></div>
          <div className="h-3 bg-gray-700 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  </div>
);

// export default React.memo(TestimonialSection);
export default React.memo(TestimonialSection);
