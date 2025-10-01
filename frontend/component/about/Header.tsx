"use client";
import React from "react";
import ReactPlayer from "react-player";

import Link from "next/link";
import Image from "next/image";

interface HeaderServiceProps {
  mainIntro: {
    id?: string;
    title: string;
    description: string;
    thumbnail: string;
    video_link: string;
    is_active: boolean;
    type: string;
    created_at?: string;
    updated_at?: string;
  };
  isLoading: boolean;
}

const HeaderService: React.FC<HeaderServiceProps> = ({
  mainIntro,
  isLoading,
}) => {
  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <section>
      <div className="relative w-full ">
        <div className="max-w-[800px]  pt-16 lg:pt-[138px] mx-auto text-center md:text-left">
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-white  capitalize   text-[36px] leading-[45px] md:text-[45px] md:leading-[60px] lg:text-[64px] font-[700] lg:leading-[76px] text-center satoshi"
          >
            {mainIntro?.title}
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-[#E4E8F7] text-[14px] md:text-[16px] font-[400] mt-6"
          >
            {mainIntro?.description}
          </p>

          <div className="flex flex-row justify-center md:justify-center items-center gap-4  md:mt-10 mt-6">
            <Link
              data-aos="fade-up"
              data-aos-delay="300"
              href="https://calendly.com/imonofficial2/30min?month=2024-07"
              className="flex justify-center items-center gap-3 font-bold text-[16px] p-4 text-white hover:border-none headerbutton rounded-[16px]"
            >
              Book a Call
            </Link>
            <Link
              data-aos="fade-up"
              data-aos-delay="400"
              href="https://calendly.com/imonofficial2/30min?month=2024-07"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center gap-3 font-bold text-[16px] p-4 w-[126px] rounded-[16px] border border-white text-white hover:border-none headersecond"
            >
              Our Works
            </Link>
          </div>
        </div>

        {/* Responsive Video Section */}

        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="relative lg:w-[794px] mx-auto lg:h-[444px] w-full h-full aspect-video bg-black overhidden rounded-[39px] mt-7 lg:mt-16"
        >
          <ReactPlayer
            src={mainIntro?.video_link}
            playing={false}
            light={mainIntro?.thumbnail}
            playIcon={
              <Image
                src="/assets/playbutton.png"
                width={80}
                height={80}
                alt="Play"
                className="z-10"
                priority
              />
            }
            width="100%"
            height="100%"
            controls
          />
        </div>
      </div>
    </section>
  );
};

const SkeletonLoader = () => {
  return (
    <section className="">
      <div className="relative w-full">
        <div className="max-w-[800px] pt-16 lg:pt-[138px] mx-auto text-center md:text-left ">
          {/* Title Skeleton */}
          <div className="flex flex-col items-center">
            <div className="h-8 sm:h-10 md:h-12 lg:h-16 w-3/4 mx-auto md:mx-0 bg-gray-800 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>

          {/* Description Skeleton */}
          <div className="mt-6 space-y-2 flex flex-col ">
            <div className="h-4 w-full bg-gray-800 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-800 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-4/6 bg-gray-800 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex flex-col md:flex-row justify-center md:justify-center items-center gap-4 mt-10 md:mt-16">
            <div className="h-12 w-full sm:w-[246px] md:w-[200px] bg-gray-800 dark:bg-gray-700 rounded-[30px] animate-pulse"></div>
            <div className="h-12 w-full sm:w-[246px] md:w-[200px] bg-gray-800 dark:bg-gray-700 rounded-[30px] animate-pulse"></div>
          </div>
        </div>

        {/* Video Section Skeleton */}
        <div className="lg:w-[794px] mx-auto lg:h-[444px] w-full h-full aspect-video bg-gray-800 dark:bg-gray-700 rounded-[39px] mt-24 animate-pulse">
          <div className="flex items-center justify-center h-full">
            <div className="w-20 h-20 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderService;
