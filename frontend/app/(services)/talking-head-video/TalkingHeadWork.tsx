import VideoPlayer from "@/component/home/PrettyPlayer";
import Heading from "@/component/share/Headering";
import React from "react";
const TalkingHeadWork = ({ data }: { data: any }) => {
  return (
    <div className="container sectionGap">
      <Heading
        tag="Our Works"
        title="Our Works"
        subtitle="From podcasts with intimate conversations to shows with high-energy stroytelling, we've hellped creators and brands produce episodes that sound professional, engaging , and ready for any platform."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 lg:mt-16">
        {data?.map((item: any, idx: number) => (
          <div
            key={idx}
            data-aos="fade-up"
            data-aos-delay={100 * idx + 100}
            className="max-w-[316px] mx-auto w-full  h-[216px] rounded-[13px]"
          >
            <VideoPlayer
              youtubeUrl={item?.video_link}
              thumbnail={item?.thumbnail}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TalkingHeadWork;
