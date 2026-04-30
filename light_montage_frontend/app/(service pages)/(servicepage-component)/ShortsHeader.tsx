import React from "react";
import TurstedBy from "@/component/home/TurstedBy";
import VerticalMarqueeSlider from "./VerticalMarqueeSlider";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ShortsHeader = ({ data }: { data: any }) => {
  return (
    <div className="flex lg:flex-row flex-col lg:justify-between items-center  rounded-[40px] sectionarea  overflow-hidden relative lg:h-176 h-full lg:gap-24 gap-4 ">
      <div className="flex z-20 justify-center items-start  flex-col   w-full  mt-18 ">
        <TurstedBy />
        <h1
          data-aos="fade-up"
          data-aos-delay={200}
          className="lg:text-[62px] lg:leading-18 text-[40px] leading-14 font-medium text-(--text-primary) poppins md:text-left  lg:mt-4 mt-3"
        >
          {data?.page_title}
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay={300}
          className="text-(--text-primary) text-[14px] font-normal md:text-[16px] opensans  md:text-left lg:mt-6 mt-6 mb-10"
        >
          {data?.description}
        </p>
        <div
          data-aos="fade-up"
          data-aos-delay={400}
          className="w-full flex justify-start items-center md:flex-row flex-col gap-3 "
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
      <div className=" lg:mt-32 mt-5 relative md:h-150">
        <VerticalMarqueeSlider data={data?.media} type={data?.type} />
        {/* Top Fade (White) */}
        <div className="absolute bg-linear-to-b from-white to-transparent h-40 sm:-left-10 left-0 -top-2 w-full sm:w-screen   pointer-events-none "></div>
        {/* Bottom Fade (White) */}
        <div className="absolute bg-linear-to-t from-white to-transparent h-40  sm:-left-10 left-0 -bottom-2 w-full sm:w-screen glasx pointer-events-none"></div>
      </div>
    </div>
  );
};

export default ShortsHeader;
