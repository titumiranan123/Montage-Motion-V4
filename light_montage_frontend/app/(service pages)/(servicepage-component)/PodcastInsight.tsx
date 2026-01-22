"use client";
import { Bullet } from "@/component/home/BulletPoint";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import StepperDemo from "./PodcastPurposestep";
import Gradientcard from "@/component/share/Gradientcard";
const stepsData = [
  {
    id: 1,
    title: "Plan with Purpose",
    content: {
      heading: "Plan with Purpose",
      description:
        "Define the core message of your video. A well-planned script or outline ensures that your content stays focused and delivers clear value.",
      items: [
        "Define Your Audience",
        "Set a Clear Goal",
        "Create an Outline",
        "Plan Your Visuals",
      ],
    },
  },
  {
    id: 2,
    title: "Record with Quality",
    content: {
      heading: "Record with Quality",
      description:
        "Ensure professional audio and video quality. Good recording practices make your content more engaging and easier to understand.",
      items: [
        "Use Good Lighting",
        "Check Audio Levels",
        "Frame Your Shot",
        "Use a Quality Microphone",
      ],
    },
  },
  {
    id: 3,
    title: "Edit for Impact",
    content: {
      heading: "Edit for Impact",
      description:
        "Polish your content through editing. Remove unnecessary parts, add transitions, and enhance your message for maximum impact.",
      items: [
        "Cut Unnecessary Footage",
        "Add Transitions",
        "Enhance Audio",
        "Add Text & Graphics",
      ],
    },
  },
];
const PodcastInsight = () => {
  const [activeStep, setActivestep] = useState(0);

  return (
    <div className="flex justify-between lg:flex-row flex-col gap-8 container sectionGap">
      <div className="max-w-[499px] w-full max-h-[688px]">
        <div className="flex flex-col gap-1 justify-start items-start sectionGap max-w-[668px] w-full mx-auto">
          <p className=" text-(--text-primary) min-w-[122px] h-[38px] rounded-3xl py-2 px-5 text-center opensans">
            Insights
          </p>
          <p className="poppins md:text-[56px] md:leading-[120%] font-semibold text-left text-(--text-primary) text-[32px]">
            How to Make a Great Podcast
          </p>

          <p className="opensans font-normal md:text-[16px] text-[14px] md:leading-[150%] text-(--text-primary) text-left">
            It&apos;s not just about talking into a mic- it&apos;s about
            crafting an experience your audience wants to come back to .
          </p>
          <StepperDemo
            setActivestep={setActivestep}
            activeStep={activeStep}
            data={stepsData}
          />
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

        <Gradientcard
          className="max-w-[440px] max-h-[450px] w-full h-full px-2 py-3 md:py-10 md:px-9 rounded-3xl text-(--text-primary)    purposebg"
          borderClassName="max-w-[440px] max-h-[450px] w-full h-full borderbg rounded-3xl md:-translate-x-32 md:-translate-y-80 p-px"
        >
          <div>
            <h2 className="text-[24px] font-semibold poppins">
              {stepsData?.[activeStep].content.heading}
            </h2>
            <p className="opensans text-[14px] md:text-[16px] font-normal">
              {stepsData?.[activeStep].content.description}
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
        </Gradientcard>
      </div>
    </div>
  );
};

export default PodcastInsight;
