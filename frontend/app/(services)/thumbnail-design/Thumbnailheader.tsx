import React from "react";

import TurstedBy from "@/component/home/TurstedBy";
import Verticalheader from "./Verticalheader";

const Thumbnailheader = ({ data }: { data: any }) => {
  //   console.log(data.media);
  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between items-center   container px-[60px] overflow-hidden relative md:h-[70vh] h-screen lg:gap-4 gap-4 ">
      <div className="flex z-20 justify-center items-start  flex-col lg:w-[50%] lg:mt-0 mt-10">
        <TurstedBy />
        <h1 className="lg:text-[72px] lg:leading-[90px] text-[48px] leading-[56px] font-[500] text-white poppins md:text-left text-center lg:mt-4 mt-3">
          Scaling Your Online Growth
        </h1>
        <p className="text-white text-[14px] font-[400] md:text-[16px] opensans text-center md:text-left lg:mt-6 mt-6 mb-10">
          Montage Motion is a creative ad agency specializing in influencer
          marketing, video editing , thumbnails, content strategy, visual
          design, web design, and content marketing.
        </p>
        <div className="w-full flex md:flex-row flex-col gap-3">
          <button className="md:w-[155px] w-full  h-[48px] btn-color text-black py-4 px-5 rounded-[16px] flex justify-center items-center font-popins font-[400]">
            Start a project
          </button>
          <button
            style={{}}
            className="md:w-[155px] w-full h-[48px] btn-secondary text-white py-4 px-5 rounded-[16px] flex justify-center items-center font-popins font-[400]"
          >
            Book a Call
          </button>
        </div>
      </div>
      <div className="lg:w-[50%] w-full lg:h-screen h-[900px] ">
        <Verticalheader data={data?.media} />
      </div>
    </div>
  );
};
export default Thumbnailheader;
