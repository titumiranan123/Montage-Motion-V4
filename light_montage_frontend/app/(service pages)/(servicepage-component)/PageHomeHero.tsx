/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import TurstedBy from "@/component/home/TurstedBy";
import HeroVideoPlayer from "@/component/home/HeroVideoPlayer";
const PageHomeHero: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="flex headerbg   flex-col justify-center items-center relative   pt-36   lg:gap-4 gap-4 max-w-[1440px] mx-auto rounded-[40px] p-[60px]">
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
          className="lg:text-[96px]  text-[48px] leading-[111%] font-medium text-(--text-primary) poppins  text-center lg:mt-5 mt-4"
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
      <div data-aos="fade-up" data-aos-delay="500" className="lg:mt-10 mt-8  ">
        <HeroVideoPlayer
          thumbnail={data?.media?.[0]?.thumbnail}
          video_url={data?.media?.[0]?.video_url}
        />
      </div>
    </div>
  );
};

export default PageHomeHero;
