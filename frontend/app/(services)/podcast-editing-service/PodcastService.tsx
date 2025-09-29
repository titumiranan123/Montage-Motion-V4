import React from "react";
import Image from "next/image";
import Heading from "@/component/share/Headering";
import Gradientcard from "@/component/share/Gradientcard";

const PodcastService = () => {
  const data = [
    {
      title: "Podcast Editing",
      description:
        "Our brilliant team are expert on both 2D and 3D Animation. We create Character Animation and Explainer for personal and commercial use. ",
      image: "/assets/services/podcast.png",
    },
    {
      title: "Shorts/Reels Editing ",
      description:
        "Our brilliant team are expert on both 2D and 3D Animation. We create Character Animation and Explainer for personal and commercial use. ",
      image: "/assets/services/shorts.png",
    },
    {
      title: "Talking Head Video Editing",
      description:
        "Our brilliant team are expert on both 2D and 3D Animation. We create Character Animation and Explainer for personal and commercial use. ",
      image: "/assets/services/talking.png",
    },
    {
      title: "Promo Video Editing",
      description:
        "Our brilliant team are expert on both 2D and 3D Animation. We create Character Animation and Explainer for personal and commercial use. ",
      image: "/assets/services/promo.png",
    },
    {
      title: "Music Editing",
      description:
        "Our brilliant team are expert on both 2D and 3D Animation. We create Character Animation and Explainer for personal and commercial use. ",
      image: "/assets/services/musicvideo.png",
    },
    {
      title: "Thumbnail Design",
      description:
        "Our brilliant team are expert on both 2D and 3D Animation. We create Character Animation and Explainer for personal and commercial use. ",
      image: "/assets/services/thumbnail.png",
    },
  ];
  return (
    <div className="container sectionGap">
      <Heading
        subtitle="Everything you need to make your talking head videos look professional and shareable"
        title="Our Talking Head"
        extratitle="Editing Services"
        tag="Our Services"
      />
      <div className="lg:mt-20 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((dt, idx) => (
          <Gradientcard
            key={idx}
            borderClassName="max-w-[384px] w-full max-h-[488px] h-full rounded-[24px] p-[1px]"
            className="max-w-[384px] w-full max-h-[488px] h-full rounded-[24px]  text-white flex justify-center items-start flex-col p-4"
          >
            <h2 className="text-[24px] font-[600]">{dt.title}</h2>
            <p className="text-[16px] font-[400] leading--[140%] text-[#e4e8e7]">
              {dt.description}
            </p>
            <Image
              src={dt.image}
              alt={dt.title}
              width={344}
              height={276}
              priority
              className="max-w-[344px] w-full max-h-[276px] h-full"
            />
          </Gradientcard>
        ))}
      </div>
    </div>
  );
};

export default PodcastService;
