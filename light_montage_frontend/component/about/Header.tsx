/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import TurstedBy from "../home/TurstedBy";
import VideoPlayer from "../home/PrettyPlayer";

interface HeaderServiceProps {
  mainIntro: any;
}

const HeaderService: React.FC<HeaderServiceProps> = ({ mainIntro }) => {
  return (
    <section className="px-2 lg:px-0  ">
      <div className="relative w-full ">
        <div className="max-w-[900px] w-full  pt-16 lg:pt-[138px] mx-auto text-center md:text-left">
          <div
            // data-aos="fade-up"
            // data-aos-delay="100"
            className="max-w-[254px] rounded-3xl w-full mx-auto bg-[#5586ED]/39 backdrop-blur-[22px] h-9 p-2"
          >
            <TurstedBy isCenter={true} />
          </div>
          <h2
            data-aos="fade-up"
            data-aos-delay="200"
            className=" text-(--text-primary)   tracking-[-4%]   text-[36px] leading-[45px] md:text-[45px] md:leading-[60px] lg:text-[64px] font-medium lg:leading-[76px] text-center  poppins"
          >
            Discover Our Story and Are and How We Help Creators
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-[#E4E8F7] text-[14px] md:text-[16px] font-normal opensans mt-6 text-center lg:px-2"
          >
            Montage Motion is a creative ad agency specializing in influencer
            marketing, video editing, thumbnails, content strategy, visual
            design, web design, and content marketing.
          </p>
        </div>
        {/* Responsive Video Section */}
        <div data-aos="fade-up" data-aos-delay="500" className="lg:mt-10 mt-8">
          <VideoPlayer
            thumbnail={mainIntro?.media[0]?.image_url}
            youtubeUrl={mainIntro?.media[0]?.video_url}
          />
        </div>
      </div>
    </section>
  );
};

export default HeaderService;
