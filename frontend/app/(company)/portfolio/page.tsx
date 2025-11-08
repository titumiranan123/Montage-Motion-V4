import Heading from "@/component/share/Headering";
import React from "react";
import Portfoliotab from "./Portfoliotab";
import VideoPlayer from "@/component/home/PrettyPlayer";
import FirstSection from "@/app/contact-us/FirstSection";
import { getPageSEO } from "@/component/share/getPageSEO";
export async function generateMetadata() {
  return await getPageSEO("portfolio");
}
const Portfolio = async ({ searchParams }: { searchParams: any }) => {
  const { search, cat } = await searchParams;
  const res = await fetch(
    `https://api-v2.montagemotion.com/api/works/website?type=${
      cat ? cat : "shorts"
    }&search=${search}`
  );
  const data = await res.json();
  return (
    <div className=" lg:mt-16 mt-10">
      <Heading
        subtitle="Turning raw footage and ideas into content that captures attention."
        title="Creativity That Converts"
        tag="Our Portfolio"
      />
      <Portfoliotab />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sectionGap container">
        {data?.data?.map((work: any) => (
          <div className="">
            <VideoPlayer
              thumbnail={work?.thumbnail}
              youtubeUrl={work?.video_link}
            />
          </div>
        ))}
      </div>
      <FirstSection />
    </div>
  );
};

export default Portfolio;
