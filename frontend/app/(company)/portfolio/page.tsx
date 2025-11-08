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
  console.log(cat);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/works/website?type=${
      cat ? cat : "shorts"
    }&search=${search}`
  );
  const data = await res.json();
  console.log(data);
  return (
    <div className=" lg:mt-16 mt-10">
      <Heading
        subtitle="Turning raw footage and ideas into content that captures attention."
        title="Creativity That Converts"
        tag="Our Portfolio"
      />
      <Portfoliotab tab={cat} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:mt-16 mt-10 container">
        {data?.data?.map((work: any, idx: number) => (
          <div data-aos="fade-up" data-aos-delay={100 + idx * 100} className="">
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
