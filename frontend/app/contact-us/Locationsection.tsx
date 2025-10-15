import Gradientcard from "@/component/share/Gradientcard";
import Heading from "@/component/share/Headering";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const Locationsection = () => {
  return (
    <div className="relative sectionGap">
      <Heading
        tag="Our Location"
        title="Visit Our Office"
        subtitle="Let's connect where ideas trun into visuals, Drop by and meet the team behind Montage Motion"
      />
      <div className="max-w-[1055px] w-full max-h-[758px] h-full mt-10 lg:mt-20 mx-auto flex flex-col-reverse justify-center items-center relative gap-2">
        <Image
          src={"/assets/location.png"}
          alt="location"
          priority
          title="House #12, Road #3, Mirpur DOHS, Dhaka, Bangladesh"
          width={1055}
          height={578}
          className="max-w-[1055px] w-full max-h-[758px] h-full mt-10 lg:mt-20"
        />
        <div className="md:absolute lg:-left-20 md:-left-11 md:bottom-12  lg:bottom-20 ">
          <Gradientcard
            className="max-w-[440px] max-h-[217px] w-full h-full rounded-[24px] md:py-6 py-5 md:px-5 px-5 "
            borderClassName="max-w-[440px]   max-h-[219px] w-full h-full p-[1px] rounded-[24px] "
          >
            <h2 className="text-[20px] text-[#E4E8F7] font-[600] poppins md:text-[24px]">
              Location
            </h2>
            <p className="text-[14px] font-[400] opensans md:text-[16px] text-[#E4E8F7] mt-2">
              House #12, Road #3, Mirpur DOHS, Dhaka, Bangladesh.
            </p>
            <p className="text-[14px] font-[600] opensans md:text-[16px] text-white mt-5 md:mt-8 flex items-center cursor-pointer">
              Message on WhatsApp for Guidance <ChevronRight />
            </p>
          </Gradientcard>
        </div>
      </div>
    </div>
  );
};

export default Locationsection;
