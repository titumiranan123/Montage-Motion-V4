import ShortVideoPlayer from "@/component/home/ShortVideoPlayer";
import Heading from "@/component/share/Headering";

import React from "react";

const ShortsWorks = ({ data }: { data: any }) => {
  return (
    <div className="container sectionGap">
      <Heading
        subtitle="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing "
        tag="Our Works"
        title="Our Feature Reels"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((dt: any, idx: number) => (
          <div
            key={idx}
            className="md:w-[384px] md:h-[683px] w-[398px] h-[707px]"
          >
            <div
              data-aos="fade-up"
              data-aos-delay={200 + idx * 100}
              key={idx}
              className="relative  overflow-hidden"
            >
              {/* Type Label */}
              {dt.type && (
                <p className="absolute z-20 text-sm py-1 px-2 rounded-[13px] left-2 top-2 text-white bg-[#00000066]">
                  {dt.title}
                </p>
              )}

              <ShortVideoPlayer
                videoUrl={dt.video_link}
                thumbnail={dt.thumbnail}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortsWorks;
