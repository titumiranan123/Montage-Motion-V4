import TurstedBy from "@/component/home/TurstedBy";
import React from "react";
import Headerpopup from "./Headerpopup";

const SaasHeader: React.FC = () => {
  return (
    <div className="flex lg:flex-row flex-col lg:justify-between items-center   container  overflow-hidden relative  lg:gap-4 gap-4 lg:pt-[72px] pt-10 ">
      {/* <div className="absolute lg:top-1/3 md:top-[60%] top-[76%] lg:right-1/4 right-[20%]  lg:w-[689px] md:w-[500px] w-[250px] h-[400px] md:h-[900px] lg:h-[689px] bg-[#5586ED] lg:blur-[125px] md:blur-[80px] blur-[50px] rounded-full  z-10 ">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[321px] md:h-[321px] w-[150px] h-[150px] bg-white rounded-full   "></div>
      </div> */}
      <div className="flex z-20 justify-center items-start  flex-col lg:w-[50%] ">
        <TurstedBy />
        <h1 className="lg:text-[64px] lg:leading-[80px] text-[40px] leading-[111%] font-[500] text-white poppins md:text-left text-center lg:mt-5 mt-4">
          Bring Your SaaS to Life with Explainer Videos
        </h1>
        <p className="text-white text-[14px] font-[400] md:text-[16px] opensans text-center md:text-left leading-[150% ]  mt-6 ">
          We turn complex software into clear, engaging stories that drive
          signups, boost retention, and help customers fall in love with your
          product.
        </p>
        <div className="w-full flex md:flex-row flex-col gap-3 mt-10">
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
      <div className="  lg:w-[50%]  w-full">
        <Headerpopup />
      </div>
    </div>
  );
};

export default SaasHeader;
