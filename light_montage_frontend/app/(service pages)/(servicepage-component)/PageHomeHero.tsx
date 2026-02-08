"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import TurstedBy from "@/component/home/TurstedBy";
import Image from "next/image";
import { Play } from "lucide-react";
import ReactPlayer from "react-player";
const PageHomeHero: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="flex headerbg   flex-col justify-center items-center relative   lg:pt-56 pt-48  lg:gap-4 gap-4 sectionarea rounded-[40px]  ">
      {/* header content left side */}
      <div className="flex z-20 justify-center items-center  flex-col   max-w-[1100px] mx-auto">
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="flex justify-center items-center"
        >
          <TurstedBy isCenter={true} />
        </div>
        <h1
          data-aos="fade-up"
          data-aos-delay={200}
          className="lg:text-[70px]  text-[30px] leading-[111%] font-medium text-(--text-primary) poppins  text-center lg:mt-5 mt-4"
        >
          {data?.page_title}
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay={300}
          className="text-(--text-secondary) text-[14px] font-normal md:text-[16px] opensans text-center  leading-[150% ]  mt-6 "
        >
          {data?.description} {}
        </p>
        <div
          data-aos="fade-up"
          data-aos-delay={200}
          className="w-full flex justify-center items-center md:flex-row flex-col gap-3 mt-10"
        >
          <Link
            target="_blank"
            href={`${data?.cta_primary_link}`}
            className="md:w-[155px] w-full  h-14 btn-color  py-4 px-5 rounded-[10px] flex justify-center items-center poppins font-medium hover:scale-105 duration-200 transition-all ease-in-out"
          >
            Start a project
          </Link>
          <Link
            target="_blank"
            href={`${data?.cta_primary_link}`}
            className="md:w-[155px] w-full h-14 btn-secondary text-textPrimary py-4 px-5 rounded-[10px] flex justify-center items-center poppins font-medium hover:scale-105 duration-200 transition-all ease-in-out bg-white/20 glassShadow backdrop-blur-2xl"
          >
            Book a Call
          </Link>
        </div>
      </div>
      <div
        className="
             lg:mt-10 mt-8
             overflow-hidden
             max-w-7xl
             mx-auto
             
             rounded-[40px]
             bg-black relative aspect-video w-full
           "
      >
        <ReactPlayer
          url={`https://pub-6a9bd81559354e09b0ca799ba12301c8.r2.dev/videos/work3.mp4`}
          width="100%"
          height="100%"
          controls
          playsinline
          playIcon={
            <button className="w-16 absolute top-[42%] left-[48%] flex justify-center items-center rounded-xl h-10 text-white backdrop-blur-[2px]  st group">
              <Play
                fill="#fff"
                className="group-hover:scale-105 active:scale-90 duration-200 ease-in-out"
              />
            </button>
          }
          light={
            <Image
              src={data?.media?.[0]?.image_url}
              alt="Intro video thumbnail"
              fill
              priority
              className="object-cover"
            />
          }
        />
      </div>
    </div>
  );
};

export default PageHomeHero;
