import React from "react";
import Heading from "../share/Headering";
import Image from "next/image";
import Gradientcard from "../share/Gradientcard";

const WhyChooseUs = ({ data }: { data: any }) => {
  // const datas = [
  //   {
  //     image: "/assets/icon/video-cut.png",
  //     title: "Attention-Grabbing Edits",
  //     description:
  //       "We turn your raw footage into fast-paced, scroll-stopping shorts that hold viewers attention from start to finish.",
  //   },
  //   {
  //     image: "/assets/icon/video-cut.png",
  //     title: "Attention-Grabbing Edits",
  //     description:
  //       "Every edit is tailored to perform perfectly on Instagram, TikTok, YouTube Shorts, and other platforms.",
  //   },
  //   {
  //     image: "/assets/icon/video-cut.png",
  //     title: "Brand Consistency",
  //     description:
  //       "We Maintain your unique style with colors , fonts and graphics that reflect your personal or business brand.",
  //   },
  //   {
  //     image: "/assets/icon/video-cut.png",
  //     title: "Fast Turnaround",
  //     description:
  //       "We Maintain your unique style with colors , fonts and graphics that reflect your personal or business brand.",
  //   },
  //   {
  //     image: "/assets/icon/video-cut.png",
  //     title: "Growth-Focused Strategy",
  //     description:
  //       "We Maintain your unique style with colors , fonts and graphics that reflect your personal or business brand.",
  //   },
  //   {
  //     image: "/assets/icon/video-cut.png",
  //     title: "Expert Tea, Support",
  //     description:
  //       "We Maintain your unique style with colors , fonts and graphics that reflect your personal or business brand.",
  //   },
  // ];
  return (
    <div className="container  sectionGap">
      <Heading
        subtitle={
          data?.paragraph
            ? data?.paragraph
            : "Montage Motion is an Advertising and Digital Agency specializing in influencer Marketing "
        }
        tag={data?.tag ? data?.tag : "Why Choose Us"}
        title={
          data?.heading_part1
            ? data?.heading_part1
            : "Here's Why We Standout from Others"
        }
        extratitle={data?.heading_part2 ? data?.heading_part2 : ""}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mt-20 mt-10 gap-10 ">
        {data?.whychooseus_items?.map((dt: any, idx: number) => (
          <div data-aos="fade-up" data-aos-delay={100 + idx * 100}>
            <Gradientcard
              key={idx}
              className="max-w-[394px] w-full h-full md:max-h-[214px] max-h-[230px] rounded-[24px] md:py-6 py-4 md:px-5 px-4"
              borderClassName="p-[1px] rounded-[24px]  translate-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
            >
              <div className="flex justify-center items-start flex-col text-white  gap-2  ">
                <Image
                  src={dt?.icon}
                  alt={dt?.alt}
                  width={35}
                  height={35}
                  priority
                />
                <p className="text-[22px] leading-[100%] md:text-[24px] font-semibold poppins text-[#E4E8F7 mt-2">
                  {dt?.title}
                </p>
                <p className="text-[14px] md:text-[16px] font-[400] opensans text-[#E4E8F7] leading-[140%]">
                  {dt?.description}
                </p>
              </div>
            </Gradientcard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
