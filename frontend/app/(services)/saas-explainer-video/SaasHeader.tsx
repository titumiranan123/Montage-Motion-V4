import TurstedBy from "@/component/home/TurstedBy";
import React from "react";
import Headerpopup from "./Headerpopup";
import Link from "next/link";

const SaasHeader = ({ data }: { data: any }) => {
  return (
    <div className="flex lg:flex-row flex-col lg:justify-between items-center   container  overflow-hidden relative  lg:gap-4 gap-10 lg:pt-[72px] pt-10 ">
      <div className="flex z-20 justify-center items-start  flex-col lg:w-[50%] ">
        <TurstedBy />
        <h1
          data-aos="fade-up"
          data-aos-delay={200}
          className="lg:text-[64px] lg:leading-[80px] text-[40px] leading-[111%] font-[500] text-white poppins md:text-left text-center lg:mt-5 mt-4"
        >
          {data?.page_title}
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay={300}
          className="text-white text-[14px] font-[400] md:text-[16px] opensans text-center md:text-left leading-[150% ]  mt-6 "
        >
          {data?.description}
        </p>
        <div className="w-full flex md:flex-row flex-col gap-3 mt-10">
          <Link
            data-aos="fade-up"
            data-aos-delay={400}
            href={data?.cta_primary_link}
            className="md:w-[155px] w-full  h-[48px] btn-color text-black py-4 px-5 rounded-[16px] flex justify-center items-center poppins font-[500]"
          >
            Start a project
          </Link>
          <Link
            data-aos="fade-up"
            data-aos-delay={500}
            href={data?.cta_primary_link}
            className="md:w-[155px] w-full h-[48px] btn-secondary text-white py-4 px-5 rounded-[16px] flex justify-center items-center poppins font-[500]"
          >
            Book a Call
          </Link>
        </div>
      </div>
      <div
        data-aos="fade-left"
        data-aos-delay={600}
        className="  lg:w-[50%]  w-full"
      >
        <Headerpopup data={data?.media?.[0] ?? []} />
      </div>
    </div>
  );
};

export default SaasHeader;
