import React from "react";
import Heading from "../share/Headering";
import Image from "next/image";
import Gradientcard from "../share/Gradientcard";

const WhyChooseUs = () => {
  const datas = [
    {
      image: "/assets/icon/video-cut.png",
      title: "Attention-Grabbing Edits",
      description:
        "We turn your raw footage into fast-paced, scroll-stopping shorts that hold viewers attention from start to finish.",
    },
    {
      image: "/assets/icon/video-cut.png",
      title: "Attention-Grabbing Edits",
      description:
        "Every edit is tailored to perform perfectly on Instagram, TikTok, YouTube Shorts, and other platforms.",
    },
    {
      image: "/assets/icon/video-cut.png",
      title: "Brand Consistency",
      description:
        "We Maintain your unique style with colors , fonts and graphics that reflect your personal or business brand.",
    },
    {
      image: "/assets/icon/video-cut.png",
      title: "Fast Turnaround",
      description:
        "We Maintain your unique style with colors , fonts and graphics that reflect your personal or business brand.",
    },
    {
      image: "/assets/icon/video-cut.png",
      title: "Growth-Focused Strategy",
      description:
        "We Maintain your unique style with colors , fonts and graphics that reflect your personal or business brand.",
    },
    {
      image: "/assets/icon/video-cut.png",
      title: "Expert Tea, Support",
      description:
        "We Maintain your unique style with colors , fonts and graphics that reflect your personal or business brand.",
    },
  ];
  return (
    <div className="container  sectionGap">
      <Heading
        subtitle="Montage Motion is an Advertising and Digital Agency specializing in influencer Marketing "
        tag="Why Choose Us"
        title="Here's Why We Standout from Others"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mt-20 mt-10 gap-10 ">
        {datas?.map((dt, idx) => (
          <Gradientcard
            className="max-w-[384px] w-full h-full max-h-[214px] rounded-[24px] md:py-6 py-3 md:px-5 px-2"
            borderClassName="p-[1px] rounded-[24px]"
          >
            <div
              key={idx}
              className="flex justify-center items-start flex-col text-white  gap-2  "
            >
              <Image
                src={dt?.image}
                alt={dt?.title}
                width={35}
                height={35}
                priority
              />
              <p className="text-[22px] md:text-[24px] font-semibold poppins text-[#E4E8F7]">
                {dt?.title}
              </p>
              <p className="text-[14px] md:text-[16px] font-[400] opensans text-[#E4E8F7]">
                {dt?.description}
              </p>
            </div>
          </Gradientcard>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
