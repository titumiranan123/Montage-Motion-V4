import React from "react";
import PodcastSldder from "./PodcastSldder";
import TurstedBy from "@/component/home/TurstedBy";

const PodacstHeader = () => {
  return (
    <div className="container lg:mt-24 mt-10">
      <div className="flex justify-center items-center flex-col  max-w-[928px] w-full mx-auto lg:mb-20">
        <TurstedBy isCenter={true} />
        <h1 className="poppins lg:leading-[81px] font-[500] lg:text-[64px] text-[48px] leading-[56px]  text-center text-white mt-4 mb-6">
          Professional Podcast Editing That Amplifies Your Voice
        </h1>
        <p className="text-[#c0c9ea] font-[400] text-[16px] text-center max-w-[508px] mx-auto opensans">
          From raw recordings to polished episodes, we handle the editing so you
          can focus on creating and growing your show.{" "}
        </p>

        <div className="w-full flex md:flex-row flex-col justify-center items-center gap-3 mt-10">
          <button className="md:w-[155px] w-full  h-[48px] btn-color text-black py-4 px-5 rounded-[16px] flex justify-center items-center poppins font-[500]">
            Start a project
          </button>
          <button
            style={{}}
            className="md:w-[155px] w-full h-[48px] btn-secondary text-white py-4 px-5 rounded-[16px] flex justify-center items-center poppins font-[500]"
          >
            Book a Call
          </button>
        </div>
      </div>
      <PodcastSldder />
    </div>
  );
};

export default PodacstHeader;
