import Gradientcard from "@/component/share/Gradientcard";
import Heading from "@/component/share/Headering";
import Image from "next/image";
import React from "react";

const WhySassVideo = () => {
  const datas = [
    {
      image: "/assets/icon/video-cut.png",
      title: "Drive Conversions",
      description:
        "A well-placed explainer video on your landing page can instantly grab attention and deliver your value proposition in seconds. Studies show that landing pages with video can increase conversions by over 80%—because visitors understand faster, trust quicker, and take action sooner.",
    },
    {
      image: "/assets/icon/video-cut.png",
      title: "Educate Effortlessly",
      description:
        "A well-placed explainer video on your landing page can instantly grab attention and deliver your value proposition in seconds. Studies show that landing pages with video can increase conversions by over 80%—because visitors understand faster, trust quicker, and take action sooner.",
    },
    {
      image: "/assets/icon/video-cut.png",
      title: "Boost Retention",
      description:
        "A well-placed explainer video on your landing page can instantly grab attention and deliver your value proposition in seconds. Studies show that landing pages with video can increase conversions by over 80%—because visitors understand faster, trust quicker, and take action sooner.",
    },
    {
      image: "/assets/icon/video-cut.png",
      title: "Win Trust Quickly",
      description:
        "A well-placed explainer video on your landing page can instantly grab attention and deliver your value proposition in seconds. Studies show that landing pages with video can increase conversions by over 80%—because visitors understand faster, trust quicker, and take action sooner.",
    },
    {
      image: "/assets/icon/video-cut.png",
      title: "expandReach",
      description:
        "A well-placed explainer video on your landing page can instantly grab attention and deliver your value proposition in seconds. Studies show that landing pages with video can increase conversions by over 80%—because visitors understand faster, trust quicker, and take action sooner.",
    },
  ];
  return (
    <div className="container sectionGap">
      <Heading
        subtitle="Montage Motion is an Avertising and Digital Agency specializing in Influencer Marketing "
        title="Why Explainer Videos  "
        extratitle="For Essential for Saas Growth"
        tag="Why SaaS Videos?"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mt-20 mt-10 gap-10">
        {datas?.slice(0, 3).map((dt, idx) => (
          <Gradientcard
            key={idx}
            className="max-w-[384px] w-full h-full md:min-h-[302px] max-h-[302px] rounded-[24px] md:py-6 py-4 md:px-5 px-4"
            borderClassName="p-[1px] max-w-[384px] w-full h-full md:min-h-[304px] max-h-[304px] rounded-[24px]"
          >
            <div className="flex justify-center items-start flex-col text-white gap-2">
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

        {/* last two cards as flex */}
        <div className="lg:col-span-3  grid grid-cols-1 md:grid-cols-2  gap-10">
          {datas?.slice(3, 5).map((dt, idx) => (
            <Gradientcard
              key={idx}
              className="max-w-[588px] w-full h-full md:min-h-[256px] max-h-[256px] rounded-[24px] md:py-6 py-4 md:px-5 px-4"
              borderClassName="p-[1px] max-w-[588px] w-full h-full md:min-h-[258px] max-h-[258px] rounded-[24px] "
            >
              <div className="flex justify-center items-start flex-col text-white gap-2">
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
    </div>
  );
};

export default WhySassVideo;
