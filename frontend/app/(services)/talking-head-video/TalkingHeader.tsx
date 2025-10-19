import React from "react";
import PodcastSldder from "../podcast-editing-service/PodcastSldder";

const TalkingHeader = () => {
  return (
    <div>
      <div className="container  lg:mt-24 mt-10">
        <div className="flex justify-center items-center flex-col gap-[14px] max-w-[928px] w-full mx-auto lg:mb-20">
          <p className="text-[#c0c9ea] font-[400] text-[16px] text-center">
            Trusted by 1000+ clients
          </p>
          <h1 className="poppins leading-[81px] font-[500] text-[64px]  text-center text-white">
            Professional Talking Head Video Editing Editing
          </h1>
          <p className="text-[#c0c9ea] font-[400] text-[16px] text-center max-w-[508px] mx-auto">
            Transform your recordings into polished, engaging videos that
            captivate your audience and amplify your message.
          </p>

          <div className="flex gap-2 w-full mx-auto justify-center items-center lg:mt-10">
            <button className="py-4 px-5 rounded-[16px] max-w-[131px] w-full btn-color">
              Book a Call{" "}
            </button>
            <button className="py-4 px-5 rounded-[16px] max-w-[131px] w-full btn-secondary bg-white/60 text-white">
              Our works
            </button>
          </div>
        </div>
        <PodcastSldder />
      </div>
    </div>
  );
};

export default TalkingHeader;
