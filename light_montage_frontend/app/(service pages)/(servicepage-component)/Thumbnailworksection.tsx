"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading } from "@/component/share/Headering";
import Image from "next/image";
import ReactPlayer from "react-player";

const Thumbnailworksection = ({ works }: { works: any }) => {
  console.log("works", works);
  return (
    <div className="container sectionGap">
      <Heading
        subtitle="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing "
        tag="Our Works"
        title="Our Feature Reels"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 lg:mt-16">
        {works?.map((dt: any, idx: number) => (
          <div
            // data-aos="fade-up"
            // data-aos-delay={200 + idx * 100}
            key={dt.id || idx}
          >
            {/* Thumbnail */}
            {dt.video_link === "" || dt.video_link === null ? (
              <Image
                src={dt.thumbnail}
                alt={dt.title || "Graphic work"}
                width={410}
                height={308}
                className="  z-10 
                relative
                overflow-hidden
                origin-center
                transition-all
                duration-300
                hover:scale-105
                aspect-video
                max-w-[410px]
                w-full
                h-full
                max-h-[308px]
                rounded-[13px]
              
              "
              />
            ) : (
              <div className="aspect-video overflow-hidden rounded-xl">
                <ReactPlayer
                  url={dt.video_link}
                  playing={false}
                  light={dt.thumbnail}
                  width={"100%"}
                  height={"100%"}
                  controls={true}
                  playIcon={
                    <div className="flex items-center justify-center w-[68px] h-12">
                      <Image
                        src="/assets/icon/playsmall.png"
                        width={68}
                        height={48}
                        alt="Play"
                        className=""
                        priority
                      />
                    </div>
                  }
                  config={{
                    youtube: {
                      playerVars: {
                        modestbranding: 1,
                        showinfo: 0,
                        rel: 0,
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thumbnailworksection;
