/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Gradientcard from "../page-service/Gradientcard";
import { Bullet } from "../carrerpost/BulletPoint";
import StepperDemo from "./PodcastPurposestep";

const PodcastInsight = ({ data }: any) => {
  const [activeStep, setActivestep] = useState(0);
  const steps = Array.isArray(data?.steps) ? data.steps : [];
  const activeIndex = Math.min(activeStep, Math.max(steps.length - 1, 0));
  const activeData = steps[activeIndex];

  if (!data || steps.length === 0) {
    return (
      <div className="rounded-lg border border-slate-700 p-8 text-gray-400">
        No insight steps found. Add at least one step to preview this section.
      </div>
    );
  }

  return (
    <div className="flex justify-between lg:flex-row flex-col gap-8 container sectionGap">
      <div className="max-w-124.75 w-full max-h-172">
        <div className="flex flex-col gap-1 justify-start items-start sectionGap max-w-167 w-full mx-auto">
          <p className=" text-(--text-primary) min-w-30.5 h-9.5 rounded-3xl py-2 px-5 text-center opensans">
            {data?.tag}
          </p>
          <p className="poppins md:text-[56px] md:leading-[120%] font-semibold text-left text-(--text-primary) text-[32px]">
            {data?.heading_title}
          </p>

          <p className="opensans font-normal md:text-[16px] text-[14px] md:leading-[150%] text-(--text-primary) text-left">
            {data?.paragraph || "No paragraph added yet."}
          </p>
          <StepperDemo
            setActivestep={setActivestep}
            activeStep={activeIndex}
            data={data}
          />
        </div>
      </div>
      <div className="relative">
        {activeData?.image ? (
          <Image
            src={activeData.image}
            width={544}
            height={506}
            className="rounded-[13px]"
            alt={activeData.heading || activeData.title || "Insight step"}
          />
        ) : (
          <div className="w-[544px] max-w-full h-[300px] rounded-[13px] bg-slate-800 flex items-center justify-center text-gray-400">
            No step image
          </div>
        )}

        <Gradientcard
          className="max-w-110 max-h-112.5 w-full h-full px-2 py-3 md:py-10 md:px-9 rounded-3xl text-(--text-primary)    purposebg"
          borderClassName="max-w-[440px] max-h-[450px] w-full h-full borderbg rounded-3xl md:-translate-x-32 md:-translate-y-80 p-px"
        >
          <div>
            <h2 className="text-[24px] font-semibold poppins">
              {data?.steps?.[activeStep]?.title}
            </h2>
            <p className="opensans text-white text-[14px] md:text-[16px] font-normal">
              {data?.steps?.[activeStep]?.description}
            </p>
          </div>
          <div className="flex justify-between flex-col gap-6 md:gap-8 md:mt-8 mt-6">
            <div>
              {activeData?.items?.map((it: string, idx: number) => (
                <Bullet key={idx} text={it} />
              ))}
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
