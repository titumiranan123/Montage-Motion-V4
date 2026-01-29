/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import PodcastSldder from "./PodcastSldder";
import TurstedBy from "@/component/home/TurstedBy";

const PodacstHeader = ({ data }: { data: any }) => {
  return (
    <div className="container lg:mt-24 mt-10 ">
      <div className="flex justify-center items-center flex-col  max-w-[928px] w-full mx-auto lg:mb-20">
        <TurstedBy isCenter={true} />
        <h1
          data-aos="fade-up"
          data-aos-delay={300}
          className="poppins lg:leading-[81px] font-medium lg:text-[64px] text-[48px] leading-14  text-center text-(--text-primary) mt-4 mb-6"
        >
          {data?.page_title}
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay={300}
          className="text-(--text-primary) font-normal text-[16px] text-center max-w-[508px] mx-auto opensans"
        >
          {data?.description}
        </p>

        <div className="w-full flex md:flex-row flex-col justify-center items-center gap-3 mt-10">
          <button
            data-aos="fade-up"
            data-aos-delay={500}
            className="md:w-[155px] w-full  h-12 btn-color text-black py-4 px-5 rounded-2xl flex justify-center items-center poppins font-medium"
          >
            Start a project
          </button>
          <button
            data-aos="fade-up"
            data-aos-delay={600}
            style={{}}
            className="md:w-[155px] w-full h-12 btn-secondary text-(--text-primary) py-4 px-5 rounded-2xl flex justify-center items-center poppins font-medium"
          >
            Book a Call
          </button>
        </div>
      </div>
      <div data-aos="fade-up" data-aos-delay={700} className="">
        <PodcastSldder data={data?.media} />
      </div>
    </div>
  );
};

export default PodacstHeader;
