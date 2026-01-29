import React from "react";
import TurstedBy from "@/component/home/TurstedBy";
import VerticalMarqueeSlider from "./VerticalMarqueeSlider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ShortsHeader = ({ data }: { data: any }) => {
  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between items-center  rounded-[40px] sectionarea   overflow-hidden relative lg:h-[704px] h-[1300px] lg:gap-4 gap-4 ">
      <div className="flex z-20 justify-center items-start  flex-col lg:w-[514px] w-full lg:mt-18 mt-10">
        <TurstedBy />
        <h1 className="lg:text-[62px] lg:leading-[72px] text-[48px] leading-14 font-medium text-(--text-primary) poppins md:text-left text-center lg:mt-4 mt-3">
          {data?.page_title}
        </h1>
        <p className="text-(--text-primary) text-[14px] font-normal md:text-[16px] opensans text-center md:text-left lg:mt-6 mt-6 mb-10">
          {data?.description}
        </p>
        <div className="w-full flex md:flex-row flex-col gap-3">
          <button className="md:w-[155px] w-full  h-12 btn-color text-black py-4 px-5 rounded-2xl flex justify-center items-center font-popins font-normal">
            Start a project
          </button>
          <button
            style={{}}
            className="md:w-[155px] w-full h-12 btn-secondary text-(--text-primary) py-4 px-5 rounded-2xl flex justify-center items-center font-popins font-normal"
          >
            Book a Call
          </button>
        </div>
      </div>
      <div className="lg:w-[50%] h-[553px] mt-14 mx-auto w-full ">
        <VerticalMarqueeSlider data={data?.media} />
      </div>
    </div>
  );
};

export default ShortsHeader;
