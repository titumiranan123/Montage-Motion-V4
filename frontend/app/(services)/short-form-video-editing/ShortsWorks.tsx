"use client";
import Heading from "@/component/share/Headering";
import useWorks from "@/hook/useWorks";
import Image from "next/image";
import React from "react";
import ReactPlayer from "react-player";
const ShortsWorks = () => {
  const { data, isLoading } = useWorks("shorts");
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
            <ReactPlayer
              light={
                <Image
                  src={dt?.thumbnail}
                  alt={dt?.title}
                  width={384}
                  height={683}
                />
              }
              playIcon={""}
              src={dt?.video_link}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortsWorks;
