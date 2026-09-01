/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import PodcastSldder from "./PodcastSldder";
import TurstedBy from "@/component/home/TurstedBy";
import Link from "next/link";

const PodacstHeader = ({ data }: { data: any }) => {
  return (
    <div className="container lg:mt-48 mt-40  rounded-2xl lg:rounded-[40px]">
      <div className="flex justify-center items-center flex-col  max-w-232 w-full mx-auto lg:mb-20">
        <TurstedBy isCenter={true} />
        <h1
          data-aos="fade-up"
          data-aos-delay={300}
          className="poppins lg:leading-20.25 font-medium lg:text-[64px] text-[42px] leading-14  text-center text-(--text-primary) mt-4 mb-6"
        >
          {data?.page_title}
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay={300}
          className="text-(--text-primary) font-normal text-[16px] text-center max-w-197 mx-auto opensans"
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
            Start a Project
          </Link>
          <Link
            target="_blank"
            href={`/portfolio`}
            className="md:w-38.75 w-full h-14 btn-secondary text-textPrimary py-4 px-5 rounded-[12px] flex justify-center items-center poppins font-medium hover:scale-105 duration-200 transition-all ease-in-out bg-white/20 glassShadow backdrop-blur-[2px]"
          >
            View Work
          </Link>
     
        </div>
      </div>
      <div data-aos="fade-up" data-aos-delay={700} className="">
        <PodcastSldder data={data?.media} />
      </div>
    </div>
  );
};

export default PodacstHeader;
