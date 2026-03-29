/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import StepperDemo from "./PodcastPurposestep";
import Gradientcard from "@/component/share/Gradientcard";
import { Bullet } from "./BulletPoint";

const PodcastInsight = ({ data }: any) => {
  const [activeStep, setActivestep] = useState(0);
  return (
    <div className="flex justify-between lg:flex-row flex-col gap-8 container sectionGap items-start lg:pb-12.5">
      <div className="max-w-124.75 w-full ">
        <div className="flex flex-col gap-1 justify-start items-start  max-w-167 w-full mx-auto">
          <p className=" text-[#1FB5DD] min-w-30.5 h-9.5 rounded-3xl py-2 px-5 text-center opensans glass-card flex justify-center items-center backdrop-blur-[2px]!">
            {data?.tag}
          </p>
          <p className="poppins md:text-[56px] md:leading-[120%] font-semibold text-left text-(--text-primary) text-[32px]">
            {data?.heading_title}
          </p>

          <p className="opensans font-normal md:text-[16px] text-[14px] md:leading-[150%] text-(--text-primary) text-left">
            {data?.paragraph}
          </p>
          <StepperDemo
            setActivestep={setActivestep}
            activeStep={activeStep}
            data={data}
          />
        </div>
      </div>
      <div className="relative lg:pb-10 pb-48">
        <Image
          src={data?.steps?.[activeStep]?.image}
          width={544}
          height={506}
          className="rounded-[13px] lg:w-136 lg:h-126.5 w-70 ms-24 lg:ms-0"
          alt="greatpodcast"
        />

        <Gradientcard
          className="max-w-110 max-h-112.5  w-full h-97.5 lg:h-full px-2 py-3 md:py-10 md:px-9 rounded-3xl text-(--text-primary)     purposebg"
          borderClassName="max-w-[440px]  lg:max-h-[450px] w-full h-full borderbg rounded-3xl absolute md:top-[147px] top-10 -left-2 md:-left-[90px]  p-px"
        >
          <div>
            <h2 className="text-[24px] leading-7.5 font-semibold poppins">
              {data?.steps?.[activeStep]?.title}
            </h2>
            <p className="opensans text-(--text-primary) text-[14px] md:text-[16px] font-normal leading-[140%] mt-1">
              {data?.steps?.[activeStep]?.description}
            </p>
          </div>
          <div className="flex justify-between flex-col gap-6 md:gap-8 md:mt-8 mt-6">
            <div>
              {data?.steps?.[activeStep]?.items?.map(
                (it: string, idx: number) => (
                  <Bullet key={idx} text={it} />
                ),
              )}
            </div>
            <button className="flex poppins">
              Get More Suggestions <ChevronRight />
            </button>
          </div>
        </Gradientcard>
      </div>
    </div>
  );
};

export default PodcastInsight;
