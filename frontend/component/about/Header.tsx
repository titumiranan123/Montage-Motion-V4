import React from "react";
import Link from "next/link";
import { Videoplayer } from "./Reactplayer";

interface HeaderServiceProps {
  mainIntro: {
    id?: string;
    title: string;
    description: string;
    thumbnail: string;
    video_link: string;
    is_active: boolean;
    type: string;
    created_at?: string;
    updated_at?: string;
  };
}

const HeaderService: React.FC<HeaderServiceProps> = ({ mainIntro }) => {
  return (
    <section>
      <div className="relative w-full ">
        <div className="max-w-[800px]  pt-16 lg:pt-[138px] mx-auto text-center md:text-left">
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-white  capitalize   text-[36px] leading-[45px] md:text-[45px] md:leading-[60px] lg:text-[64px] font-[700] lg:leading-[76px] text-center satoshi"
          >
            {mainIntro?.title}
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-[#E4E8F7] text-[14px] md:text-[16px] font-[400] mt-6"
          >
            {mainIntro?.description}
          </p>

          <div className="flex flex-row justify-center md:justify-center items-center gap-4  md:mt-10 mt-6">
            <Link
              data-aos="fade-up"
              data-aos-delay="300"
              href="https://calendly.com/imonofficial2/30min?month=2024-07"
              className="flex justify-center items-center gap-3 font-bold text-[16px] p-4 text-white hover:border-none headerbutton rounded-[16px]"
            >
              Book a Call
            </Link>
            <Link
              data-aos="fade-up"
              data-aos-delay="400"
              href="https://calendly.com/imonofficial2/30min?month=2024-07"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center gap-3 font-bold text-[16px] p-4 w-[126px] rounded-[16px] border border-white text-white hover:border-none headersecond"
            >
              Our Works
            </Link>
          </div>
        </div>

        {/* Responsive Video Section */}

        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="relative lg:w-[794px] mx-auto lg:h-[444px] w-full h-full aspect-video bg-black overhidden rounded-[39px] mt-7 lg:mt-16"
        >
          <Videoplayer
            thumbnail={mainIntro.thumbnail}
            video_link={mainIntro.video_link}
          />
        </div>
      </div>
    </section>
  );
};

export default HeaderService;
