import Heading from "@/component/share/Headering";
import React from "react";
import Portfoliotab from "./Portfoliotab";
import VideoPlayer from "@/component/home/PrettyPlayer";

const Portfolio = async ({ searchParams }: { searchParams: any }) => {
  const { search, cat } = await searchParams;
  const res = await fetch(
    `https://api-v2.montagemotion.com/api/works/website?type=${
      cat ? cat : "shorts"
    }&search=${search}`
  );
  const data = await res.json();
  return (
    <div className="container sectionGap">
      <Heading
        subtitle="Turning raw footage and ideas into content that captures attention."
        title="Creativity That Converts"
        tag="Our Portfolio"
      />
      <Portfoliotab />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sectionGap">
        {data?.data?.map((work: any) => (
          <div className="">
            <VideoPlayer
              thumbnail={work?.thumbnail}
              youtubeUrl={work?.video_link}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
