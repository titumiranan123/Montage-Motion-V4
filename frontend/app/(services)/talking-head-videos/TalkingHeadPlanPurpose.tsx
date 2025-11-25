import { Bullet } from "@/component/home/BulletPoint";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import StepperDemo from "../podcast-editing-service/PodcastPurposestep";

const TalkingHeadPlanPurpose = () => {
  return (
    <div className="flex justify-between lg:flex-row flex-col gap-8 container sectionGap">
      <div className="max-w-[499px] w-full max-h-[688px]">
        <div className="flex flex-col gap-1 justify-start items-start sectionGap max-w-[668px] w-full mx-auto">
          <p className="bg-[#1D2122] text-[#E4E8F7] min-w-[122px] h-[38px] rounded-[24px] py-2 px-5 text-center opensans">
            Insights
          </p>
          <p className="poppins md:text-[56px] md:leading-[120%] font-semibold text-left text-white text-[32px]">
            How to Make a Great Podcast
          </p>

          <p className="opensans font-[400] md:text-[16px] text-[14px] md:leading-[150%] text-[#E4E8F7] text-left">
            It's not just about talking into a mic- it's about crafting an
            experience your audience wants to come back to .
          </p>
          <StepperDemo />
        </div>
      </div>
      <div className="">
        <Image
          src={"/assets/podcast/greatpodcast.png"}
          width={544}
          height={506}
          className="rounded-[13px] relative"
          alt="greatpodcast"
        />
        <style>
          {`
             .purposebg {
                    background: linear-gradient(209.88deg, rgba(0, 0, 0, 0.9) 23.29%, rgba(49, 95, 172, 0.9) 214.87%);
                }
                    .borderbg{
                        

                        background: linear-gradient(242.39deg, #3357A3 -5.78%, rgba(51, 87, 163, 0) 38.74%);
                        
                        
                    }
                `}
        </style>
        <div className="max-w-[440px] max-h-[450px] w-full h-full borderbg rounded-[24px] md:-translate-x-32 md:-translate-y-80 p-[1px]">
          <div className="max-w-[440px] max-h-[450px] w-full h-full px-2 py-3 md:py-10 md:px-9 rounded-[24px] text-[#E4E8F7]    purposebg">
            <div>
              <h2 className="text-[24px] font-[600] poppins">
                Plan with Purpose
              </h2>
              <p className="opensans text-[14px] md:text-[16px] font-[400]">
                Define your theme, know your audience, and structure episodes
                with clear takeaways. A great podcast starts with intentional
                planning.
              </p>
            </div>
            <div className="flex justify-between flex-col gap-6 md:gap-8 md:mt-8 mt-6">
              <div>
                <Bullet text="Define Your Audience" />
                <Bullet text="Set a Core Goal" />
                <Bullet text="Pick a Strong Theme" />
                <Bullet text="Plan Episodes in Advance" />
                <Bullet text="Script with Flexiblity" />
                <Bullet text="Balance Length with Value" />
              </div>
              <button className="flex poppins">
                Get More Suggestions <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalkingHeadPlanPurpose;
