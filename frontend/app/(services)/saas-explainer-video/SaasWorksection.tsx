import VideoPlayer from "@/component/home/PrettyPlayer";
import Heading from "@/component/share/Headering";
import React from "react";

const SaasWork = ({ data }: { data: any }) => {
  return (
    <div className="container sectionGap">
      <Heading
        tag="Our Works"
        title="Our Works"
        subtitle="A quick look at how we've helped SaaS brands explain, engage, and expand their audience."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 lg:mt-16">
        {data?.map((item: any, idx: number) => (
          <div
            key={idx}
            data-aos="fade-up"
            data-aos-delay={100 + idx * 100}
            className="max-w-[316px] w-full h-[216px] mx-auto rounded-[13px]"
          >
            <VideoPlayer
              youtubeUrl={data?.video_link}
              thumbnail={item?.thumbnail}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaasWork;
