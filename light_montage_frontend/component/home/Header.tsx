/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import TurstedBy from "./TurstedBy";
import Link from "next/link";
import HeadervideoPalyer from "./HeadervideoPalyer";
const Header: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="flex  flex-col justify-center items-center relative    py-10  lg:gap-4 gap-4 ">
      {/* header content left side */}
      <div className="flex z-20 justify-center items-center  flex-col  lg:pt-10 pt-10 max-w-[680px] mx-auto">
        <TurstedBy isCenter={true} />
        <h1
          data-aos="fade-up"
          data-aos-delay={200}
          className="lg:text-[96px] lg:leading-[90px] text-[48px] leading-[111%] font-medium text-textPrimary poppins  text-center lg:mt-5 mt-4"
        >
          Scaling Your Online Growth
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay={300}
          className="text-textSecondary text-[14px] font-normal md:text-[16px] opensans text-center  leading-[150% ]  mt-6 "
        >
          Montage Motion is a creative ad agency specializing in influencer
          marketing, video editing , thumbnails, content strategy, visual
          design, web design, and content marketing.
        </p>
        <div
          data-aos="fade-up"
          data-aos-delay={200}
          className="w-full flex justify-center items-center md:flex-row flex-col gap-3 mt-10"
        >
          <Link
            target="_blank"
            href={"https://calendly.com/imonofficial2/30min?month=2024-07"}
            className="md:w-[155px] w-full  h-12 btn-color  py-4 px-5 rounded-[10px] flex justify-center items-center poppins font-medium hover:scale-105 duration-200 transition-all ease-in-out"
          >
            Start a project
          </Link>
          <Link
            target="_blank"
            href={"https://calendly.com/imonofficial2/30min?month=2024-07"}
            className="md:w-[155px] w-full h-12 btn-secondary text-textPrimary py-4 px-5 rounded-[10px] flex justify-center items-center poppins font-medium hover:scale-105 duration-200 transition-all ease-in-out"
          >
            Book a Call
          </Link>
        </div>
      </div>
      <HeadervideoPalyer
        thumbnail={data?.media?.[0]?.image_url}
        video_url={data?.media?.[0]?.video_url}
      />
    </div>
  );
};

export default Header;
