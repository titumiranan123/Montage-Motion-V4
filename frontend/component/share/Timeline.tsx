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
    icon: discover, // আইকন হিসেবে এখানে SVG বা React Icon ব্যবহার করতে পারেন
  },
  {
    id: 2,
    title: "Strategy & Creative Direction",
    description:
      "We set up the project: a brand strategy, storyboards, script framework, and a content plan. We define the creative direction for the project.",
    icon: target,
  },
  {
    id: 3,
    title: "Produce & Gather Assets",
    description:
      "We organize your product, service, team, location, and brand assets. We gather all the elements needed to tell your story, including footage, photos, and messaging.",
    icon: file_video,
  },
  {
    id: 4,
    title: "Build & Edit",
    description:
      "This is the craft phase: editing and motion graphics, sound design, and color grading. We build the final product, ensuring it meets your expectations.",
    icon: file_video,
  },
  {
    id: 5,
    title: "Review & Refine",
    description:
      "You get a first cut to give us feedback. We make all the changes and revisions to ensure the project is perfect before it goes live.",
    icon: file_video,
  },
  {
    id: 6,
    title: "Package & Launch",
    description:
      "We prepare the final assets for delivery and distribution. This includes optimizing for various platforms and ensuring everything is ready for launch.",
    icon: file_video,
  },
];

const AIProcess = () => {
  return (
    <div className="bg-black text-white py-16 px-4 font-sans">
      <div className="relative max-w-5xl mx-auto">
        {/* মাঝখানে উল্লম্ব রেখা */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-700 hidden md:block"></div>

        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex flex-col md:flex-row items-start md:items-center my-12 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* স্টেপের বিবরণ */}
            <div className="w-full md:w-1/2 p-4 md:p-8">
              <div className="bg-gray-900 p-6 rounded-lg processboxborder">
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>

            {/* আইকন এবং নম্বর */}
            <div
              className={`relative w-full md:w-auto flex items-center justify-center -mt-8 md:mt-0 md:absolute  md:transform md:-translate-x-1/2 ${
                index % 2 === 0 ? "md:left-[53%]" : "md:left-[50%]"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center z-10 
                                 ${
                                   index % 2 === 0
                                     ? "bg-blue-500"
                                     : "bg-green-500"
                                 }
                                 ${
                                   index % 2 === 0
                                     ? "md:left-1/2 md:transform md:-translate-x-1/2"
                                     : ""
                                 }
                                 `}
              >
                <span className="text-3xl font-bold">{step.id}</span>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center justify-center relative ">
              {/* <span className="w-24 h-12  rounded-full flex items-center justify-center processglow-1 backdrop-blur-2xl blur-[48px] text-white font-bold">
                <span className="w-24 h-12 backdrop-blur-2xl blur-[48px]  processglow-2  rounded-full flex items-center justify-centertext-white font-bold"></span>
              </span> */}

              <Image src={background} width={560} height={180} alt="" />
              <Image
                className="absolute left-[35%]
                -top-5"
                src={step.icon}
                width={150}
                height={150}
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
