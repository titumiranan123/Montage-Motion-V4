"use client";
import VideoPlayer from "@/component/home/VideoPlayer";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading } from "@/component/share/Headering";
import Image from "next/image";
import Link from "next/link";

const Thumbnailworksection = ({
  works,
  slug,
}: {
  works: any;
  slug: string;
}) => {
  return (
    <div className="sectionarea overflow-hidden sectionGap">
      <Heading
        subtitle={works?.paragraph}
        tag={works?.tag}
        title={works?.heading_part1}
        width="180"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 lg:mt-16">
        {works?.type !== "shortsreels-editing" ? (
          <>
            {works?.work?.map((dt: any, idx: number) => (
              <div
                data-aos="fade-up"
                data-aos-delay={200 + idx * 100}
                key={dt?.id || idx}
              >
                {/* Thumbnail */}
                {dt?.video_link === "" || dt?.video_link === null ? (
                  <Image
                    src={dt?.thumbnail}
                    alt={dt?.title || "Graphic work"}
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
                  max-w-102.5
                  w-full
                  h-full
                  max-h-77
                  rounded-[13px]
                
                "
                  />
                ) : (
                  <div className="aspect-auto overflow-hidden rounded-xl">
                    <VideoPlayer
                      thumbnail={dt?.thumbnail}
                      link={dt?.video_link}
                    />
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <>
            {works?.work?.map((dt: any, idx: number) => (
              <div
                data-aos="fade-up"
                data-aos-delay={200 + idx * 100}
                key={dt?.id || idx}
              >
                <div className="aspect-9/16! overflow-hidden rounded-xl">
                  <VideoPlayer
                    thumbnail={dt?.thumbnail}
                    link={dt?.video_link}
                    className="aspect-9/16!"
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="mt-16 flex justify-center items-center ">
        <Link
          href={`/portfolio?cat=${slug}`}
          className="btn-color py-4 px-6 hover:scale-105 active:scale-90 rounded-lg text-base font-medium transition-transform ease-in-out duration-200"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default Thumbnailworksection;
