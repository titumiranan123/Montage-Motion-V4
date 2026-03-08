"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import TurstedBy from "./TurstedBy";
import Link from "next/link";
import ReactPlayer from "react-player";
import Image from "next/image";
import { Play } from "lucide-react";
const Header: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="flex   lg:pt-30 pt-34 flex-col justify-center items-center relative    py-10  lg:gap-4 gap-4 ">
      {/* header content left side */}
      <div className="flex z-20 justify-center items-center  flex-col  lg:pt-10 pt-10 max-w-195 mx-auto">
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
          className="lg:text-[70px]  text-[42px] leading-[101%] font-medium text-(--text-primary) poppins  text-center lg:mt-5 mt-4"
        >
          {data?.page_title}
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay={300}
          className="text-(--text-secondary) text-[14px] font-normal md:text-[16px] opensans text-center  leading-[150% ]  mt-6 "
        >
          {data?.description}
        </p>
        <div
          data-aos="fade-up"
          data-aos-delay={200}
          className="w-full flex justify-center items-center md:flex-row flex-col gap-3 mt-10"
        >
          <Link
            target="_blank"
            href={`${data?.cta_primary_link}`}
            className="md:w-38.75 w-full  h-14 btn-color  py-4 px-5 rounded-[12px] flex justify-center items-center poppins font-medium hover:scale-105 duration-200 transition-all ease-in-out"
          >
            Start a project
          </Link>
          <Link
            target="_blank"
            href={`${data?.cta_primary_link}`}
            className="md:w-38.75 w-full h-14 btn-secondary text-textPrimary py-4 px-5 rounded-[12px] flex justify-center items-center poppins font-medium hover:scale-105 duration-200 transition-all ease-in-out bg-white/20 glassShadow backdrop-blur-[2px]"
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

export default Header;
