import Heading from "@/component/share/Headering";
import React from "react";
import Portfoliotab from "./Portfoliotab";
import VideoPlayer from "@/component/home/PrettyPlayer";
import FirstSection from "@/app/contact-us/FirstSection";
import { getPageSEO } from "@/component/share/getPageSEO";
import ShortVideoPlayer from "@/component/home/ShortVideoPlayer";
import Image from "next/image";
export async function generateMetadata() {
  return await getPageSEO("portfolio");
}
const Portfolio = async ({ searchParams }: { searchParams: any }) => {
  const { search, cat } = await searchParams;
  // console.log(cat);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/works/website?type=${
      cat ? cat : "shorts"
    }&search=${search}`
  );
  const data = await res.json();
  // console.log(data);
  return (
    <div className=" lg:mt-16 mt-10">
      <Heading
        subtitle="Turning raw footage and ideas into content that captures attention."
        title="Creativity That Converts"
        tag="Our Portfolio"
      />
      <Portfoliotab tab={cat} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:mt-16 mt-10 container">
        {data?.data?.map((work: any, idx: number) => {
          if (work?.type === "shorts") {
            return (
              <div
                data-aos="fade-up"
                data-aos-delay={100 + idx * 100}
                className=""
              >
                <ShortVideoPlayer
                  thumbnail={work?.thumbnail}
                  videoUrl={work?.video_link}
                />
              </div>
            );
          } else if (work.type === "thumbnail") {
            return (
              <div
                data-aos="fade-up"
                data-aos-delay={200 + idx * 100}
                key={work.id || idx}
                className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 aspect-video max-w-[348px] w-full h-full max-h-[216px] rounded-[13px]"
              >
                {/* Title */}
                {work.title && (
                  <p className="absolute z-20 text-sm py-1 px-2 rounded-[13px] left-2 top-2 text-white bg-[#00000066]">
                    {work.title}
                  </p>
                )}

                {/* Thumbnail */}
                {work.thumbnail ? (
                  <Image
                    src={work.thumbnail}
                    alt={work.title || "Graphic work"}
                    width={348}
                    height={216}
                    className="rounded-[13px] object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center bg-gray-700 w-full h-full rounded-[13px]">
                    <p>No thumbnail</p>
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <div
                data-aos="fade-up"
                data-aos-delay={100 + idx * 100}
                className=""
              >
                <VideoPlayer
                  thumbnail={work?.thumbnail}
                  youtubeUrl={work?.video_link}
                />
              </div>
            );
          }
        })}
      </div>
      <FirstSection />
    </div>
  );
};

export default Portfolio;
