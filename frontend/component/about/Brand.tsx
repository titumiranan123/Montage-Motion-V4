"use client";
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
import Marquee from "react-fast-marquee";

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
        // style={{ boxShadow: "0px 4px 60px 0px #1FB5DD29 inset" }}
        data-aos="fade-up"
        data-aos-delay="400"
        className=" mx-auto h-[86px]  overflow-hidden mt-10 md:mt-16"
        // className=" mx-auto hidden sm:block h-[86px] rounded-[17.45px] border bg-[#080B0C] border-[#0A303A] overflow-hidden mt-10 md:mt-16"
      >
        <div className=" w-full h-full flex items-center">
          <Marquee
            pauseOnHover={true}
            gradient={true}
            gradientColor="#000"
            speed={50}
          >
            {duplicatedImages.map((img, idx) => (
              <div key={idx} className="relative h-[40px] w-[120px]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain"
                  priority={idx < 4}
                />
              </div>
            ))}
          </Marquee>
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
