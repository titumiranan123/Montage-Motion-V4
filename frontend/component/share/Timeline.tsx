// components/AIProcess.tsx (সম্পূর্ণ কোড)
import React from "react";
import target from "@/public/assets/target-02.png";
import background from "@/public/assets/Group 1000011820.png";
import discover from "@/public/assets/discover.png";
import file_video from "@/public/assets/file-video.png";
import Image from "next/image";
const steps = [
  {
    id: 1,
    title: "Discover & Align",
    description:
      "We start with a quick brief or call to lock in goals, messaging, audience and key performance metrics. No guesswork, just clarity from day one.",
    icon: "/assets/discover.png",
  },
  {
    id: 2,
    title: "Strategy & Creative Direction",
    description:
      "We set up the project: a brand strategy, storyboards, script framework, and a content plan. We define the creative direction for the project.",
    icon: "/assets/strategy.png",
  },
  {
    id: 3,
    title: "Produce & Gather Assets",
    description:
      "We organize your product, service, team, location, and brand assets. We gather all the elements needed to tell your story, including footage, photos, and messaging.",
    icon: "/assets/edit.png",
  },
  {
    id: 4,
    title: "Build & Edit",
    description:
      "This is the craft phase: editing and motion graphics, sound design, and color grading. We build the final product, ensuring it meets your expectations.",
    icon: "/assets/review.png",
  },
  {
    id: 5,
    title: "Review & Refine",
    description:
      "You get a first cut to give us feedback. We make all the changes and revisions to ensure the project is perfect before it goes live.",
    icon: "/assets/file-video.png",
  },
];

const AIProcess = () => {
  return (
    <div className="bg-black text-white py-16 px-4 font-sans">
      <div className="relative max-w-6xl mx-auto">
        {/* মাঝখানে উল্লম্ব রেখা */}
        <div className="absolute top-[7%] left-1/2 transform -translate-x-1/2 h-[86%] w-[10px] verticalLine-bg hidden md:block"></div>

        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex flex-col lg:gap-0 gap-8 md:flex-row items-start md:items-center my-12 justify-between ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div
              className={`relative w-full md:w-auto flex items-center justify-center -mt-8 md:mt-0 md:absolute  md:transform md:-translate-x-1/2 ${
                index % 2 === 0 ? "md:left-[53%]" : "md:left-[50%]"
              }`}
            >
              <div
                className={`relative flex items-center justify-center z-10
    ${
      index === 0
        ? "w-[84px] h-[84px] border-none   text-white "
        : "w-7 h-7 bg-white text-black "
    }
    rounded-full border border-white/20 transition-all duration-300 hover:scale-105
    md:absolute md:top-1/2 md:-translate-y-1/2
    ${index % 2 === 0 ? "md:-left-8 md:-translate-x-1/2" : ""}
  `}
              >
                <style>
                  {`
    .firstNumber-bg::before {
      content: "1";
      display:flex;
      justify-content:center;
      align-items: center;
      position: absolute;
      left: 2px;
      top:2px;
      background: black;
      z-index: 0;
      padding:2px;
      width:80px;
      height:80px;
      border-radius: 24px;
    }
    .firstNumber-bg{
      background: linear-gradient(
        250.64deg,
        rgba(51, 87, 163, 0.5) 0%,
        rgba(51, 87, 163, 0) 50%,
        rgba(51, 87, 163, 0.5) 100%
      );
    }
      .verticalLine-bg{
        background: linear-gradient(180deg, rgba(49, 95, 172, 0.2) 0.02%, #315FAC 21.38%, rgba(49, 95, 172, 0.2) 100%);

      }
  `}
                </style>
                <span
                  className={`font-bold ${
                    index === 0 ? "text-xl " : "text-sm"
                  } ${
                    index === 0 &&
                    "rounded-[24px] w-[84px] h-[84px] z-10 flex justify-center items-center firstNumber-bg relative !border-none"
                  } leading-none poppins`}
                >
                  {step.id}
                </span>
              </div>
            </div>
            {/* স্টেপের বিবরণ */}
            <div className="w-full max-w-[460px] min-h-[196px] h-full p-[1px] rounded-[24px] processboxborder">
              <div className="bg-black p-6  w-full max-w-[460px] min-h-[196px] h-full rounded-[24px]">
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center justify-center relative ">
              {/* <span className="w-24 h-12  rounded-full flex items-center justify-center processglow-1 backdrop-blur-2xl blur-[48px] text-white font-bold">
                <span className="w-24 h-12 backdrop-blur-2xl blur-[48px]  processglow-2  rounded-full flex items-center justify-centertext-white font-bold"></span>
              </span> */}

              {/* <Image src={background} width={560} height={180} alt="" /> */}
              <Image
                className=""
                src={step.icon}
                width={460}
                height={194}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIProcess;
