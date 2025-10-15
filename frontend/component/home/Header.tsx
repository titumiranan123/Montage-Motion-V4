import React from "react";
import TurstedBy from "./TurstedBy";
import Headervideopop from "./Headervideopop";
import CounterNumber from "../share/CounterNumber";
import Link from "next/link";
const Header: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="flex lg:flex-row flex-col lg:justify-between items-center   container px-[60px] overflow-hidden relative lg:h-[564px] h-[780px] lg:gap-4 gap-4 ">
      <div className="absolute lg:top-1/3 md:top-[60%] top-[76%] lg:right-1/4 right-[20%]  lg:w-[689px] md:w-[500px] w-[250px] h-[400px] md:h-[900px] lg:h-[689px] bg-[#5586ED] lg:blur-[125px] md:blur-[80px] blur-[50px] rounded-full  z-10 ">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[321px] md:h-[321px] w-[150px] h-[150px] bg-white rounded-full   "></div>
      </div>
      <div className="flex z-20 justify-center items-start  flex-col lg:w-[50%] lg:mt-0 mt-10">
        <TurstedBy />
        <h1 className="lg:text-[72px] lg:leading-[90px] text-[48px] leading-[111%] font-[500] text-white poppins md:text-left text-center lg:mt-5 mt-4">
          Scaling Your Online Growth
        </h1>
        <p className="text-white text-[14px] font-[400] md:text-[16px] opensans text-center md:text-left leading-[150% ]  mt-6 ">
          Montage Motion is a creative ad agency specializing in influencer
          marketing, video editing , thumbnails, content strategy, visual
          design, web design, and content marketing.
        </p>
        <div className="w-full flex md:flex-row flex-col gap-3 mt-10">
          <Link
            target="_blank"
            href={"https://calendly.com/imonofficial2/30min?month=2024-07"}
            className="md:w-[155px] w-full  h-[48px] btn-color text-black py-4 px-5 rounded-[16px] flex justify-center items-center poppins font-[500]"
          >
            Start a project
          </Link>
          <Link
            target="_blank"
            href={"https://calendly.com/imonofficial2/30min?month=2024-07"}
            className="md:w-[155px] w-full h-[48px] btn-secondary text-white py-4 px-5 rounded-[16px] flex justify-center items-center poppins font-[500]"
          >
            Book a Call
          </Link>
        </div>
      </div>
      <div className="relative  z-20  lg:w-[50%] p-5 flex justify-center items-center">
        <div className="state-box md:w-[142px] w-[94px] h-[80px] md:h-[104px] absolute lg:left-5 lg:top-[88px] md:top-[80px] md:-left-11 z-10 top-[60px] -left-3 flex justify-center items-center">
          <CounterNumber number={8} title="Years of Experience" />
        </div>
        <Headervideopop thumbnail={data?.thumbnail} link={data?.video_link} />
        <div className="state-box md:w-[114px] md:h-[104px] w-[90px] h-[80px] absolute lg:-bottom-4 lg:left-7 -bottom-3 md:-left-4 -left-1 flex justify-center items-center ">
          <CounterNumber number={1000} title="Succesfull Projects" />
        </div>

        <div className="state-box md:w-[112px] md:h-[104px] w-[84px] h-[80px]  absolute md:top-32 top-16 md:-right-8 -right-5 lg:right-10 flex justify-center items-center">
          <CounterNumber number={10} title="Team Members" />
        </div>
      </div>
    </div>
  );
};

export default Header;
