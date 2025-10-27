import React from "react";
import Heading from "../share/Headering";
import Image from "next/image";
import Gradientcard from "../share/Gradientcard";

const ServiceSections = () => {
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
        subtitle="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
        title="Cat't Standout ?"
        extratitle="Let Us Help You."
        tag="Our Services"
      />
      <div className="lg:mt-20 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((dt, idx) => (
          <div key={idx} data-aos="fade-up" data-aos-delay={100 + idx * 100}>
            <Gradientcard
              className="max-w-[384px] w-full max-h-[488px] h-full rounded-[24px] "
              borderClassName="max-w-[384px] w-full max-h-[488px] h-full rounded-[24px]  p-[1px]"
            >
              <div className=" text-[#E4E8F7] flex justify-center items-start flex-col p-4">
                <h2 className="md:text-[24px] text-[20px] poppins font-[600]">
                  {dt.title}
                </h2>
                <p className="md:text-[16px] text-[14px] font-[400] leading-[140%] text-[#E4E8F7] mt-2 opensans">
                  {dt.description}
                </p>
                <Image
                  src={dt.image}
                  alt={dt.title}
                  width={344}
                  height={276}
                  priority
                  className="max-w-[344px] w-full max-h-[276px] h-full md:mt-8 mt-4"
                />
              </div>
            </Gradientcard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSections;
