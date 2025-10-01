import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import amazon from "@/public/assets/brand/amazon.png";
import airtel from "@/public/assets/brand/airtel.png";
import gucci from "@/public/assets/brand/gucci.png";
import honor from "@/public/assets/brand/honor.png";
import oppo from "@/public/assets/brand/oppo.png";
import rfl from "@/public/assets/brand/rfl.png";
import pran from "@/public/assets/brand/pran.png";
import nogad from "@/public/assets/brand/nogod.png";

const Brand = () => {
  const images = [
    { src: amazon, alt: "Amazon" },
    { src: gucci, alt: "Gucci" },
    { src: honor, alt: "Honor" },
    { src: oppo, alt: "Oppo" },
    { src: rfl, alt: "RFL" },
    { src: pran, alt: "Pran" },
    { src: airtel, alt: "Airtel" },
    { src: nogad, alt: "Nogod" },
  ];

  // Duplicate the array to create seamless looping
  const duplicatedImages = [...images, ...images];

  return (
    <div className=" container px-4 sm:px-6">
      {/* Desktop Marquee */}
      <div
        style={{ boxShadow: "0px 4px 60px 0px #1FB5DD29 inset" }}
        data-aos="fade-up"
        data-aos-delay="400"
        className=" mx-auto hidden sm:block h-[86px] rounded-[17.45px] border bg-[#080B0C] border-[#0A303A] overflow-hidden mt-10 md:mt-16"
      >
        <div className="marquee-container w-full h-full flex items-center">
          <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={5000}
            freeMode={true}
            spaceBetween={40}
            className="w-full h-full"
          >
            {duplicatedImages.map((img, idx) => (
              <SwiperSlide
                key={idx}
                className="!flex items-center justify-center !w-auto h-full"
              >
                <div className="relative h-[40px] w-[120px]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain"
                    priority={idx < 4}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Mobile Marquee */}
      <div
        style={{ boxShadow: "0px 4px 60px 0px #1FB5DD29 inset" }}
        className="max-w-[996px] sm:hidden mx-auto rounded-[17.45px] border bg-[#080B0C] border-[#0A303A] overflow-hidden py-6"
      >
        <div className="marquee-container w-full h-full flex items-center">
          <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: -20,

              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={4000}
            freeMode={true}
            spaceBetween={10}
            className="w-full h-full"
          >
            {duplicatedImages.map((img, idx) => (
              <SwiperSlide
                key={idx}
                className="!flex items-center justify-center !w-auto h-full"
              >
                <div className="relative h-[25px] w-full min-w-[100px]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain"
                    priority={idx < 4}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .marquee-container {
          overflow: hidden;
        }
        .swiper-wrapper {
          transition-timing-function: linear !important;
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Brand;
