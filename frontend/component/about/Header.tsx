import React from "react";
import Link from "next/link";
import { Videoplayer } from "./Reactplayer";
import TurstedBy from "../home/TurstedBy";

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
    <section className="px-2 lg:px-0">
      <div className="relative w-full ">
        <div className="max-w-[900px] w-full  pt-16 lg:pt-[138px] mx-auto text-center md:text-left">
          <div
            // data-aos="fade-up"
            // data-aos-delay="100"
            className="max-w-[254px] rounded-[24px] w-full mx-auto bg-[#5586ED]/39 backdrop-blur-[22px] h-[36px] p-2"
          >
            <TurstedBy isCenter={true} />
          </div>
          <h2
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-white  tracking-[-4%]   text-[36px] leading-[45px] md:text-[45px] md:leading-[60px] lg:text-[64px] font-[500] lg:leading-[76px] text-center  poppins"
          >
            Discover Our Story and Are and How We Help Creators
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-[#E4E8F7] text-[14px] md:text-[16px] font-[400] opensans mt-6 text-center lg:px-2"
          >
            Montage Motion is a creative ad agency specializing in influencer
            marketing, video editing, thumbnails, content strategy, visual
            design, web design, and content marketing.
          </p>
        </div>
        {/* Responsive Video Section */}
        <div data-aos="fade-up" data-aos-delay="500">
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
