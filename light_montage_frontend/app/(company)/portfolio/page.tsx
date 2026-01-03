/* eslint-disable @typescript-eslint/no-explicit-any */
import Portfoliotab from "./Portfoliotab";
import { getPageSEO } from "@/component/share/getPageSEO";
import ShortVideoPlayer from "@/component/home/ShortVideoPlayer";
import Image from "next/image";
import ContactSection from "@/component/share/ContactSection";
import { Heading } from "@/component/share/Headering";
import { getData } from "@/utils/getData";
import FeaturePlayer from "@/component/home/FeaturePlayer";
export async function generateMetadata() {
  return await getPageSEO("portfolio");
}
const Portfolio = async ({ searchParams }: { searchParams: any }) => {
  const { search, cat } = await searchParams;
  const data = await getData({
    url: `api/works/website?type=${
      cat ? cat : "shortsreels-editing"
    }&search=${search}`,
  });

  const category = await getData({ url: "api/website/service/type" });

  console.log(data);
  // console.log(data);
  return (
    <div className=" mt-4">
      <div className="portfoliobg container min-h-screen rounded-[42px]">
        <div className="pt-[60px]"></div>
        <Heading
          subtitle="Turning raw footage and ideas into content that captures attention."
          title="Creativity That Converts"
          tag="Our Portfolio"
        />
        <style>
          {`
            .portfoliobg {
              background: linear-gradient(180deg, #EAF0F7 30.22%, #69CDE8 65.11%, #EAF0F7 100%);

            }
            
            `}
        </style>
        <Portfoliotab tab={cat} types={category?.data} />
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-2 lg:mt-16 mt-10 max-w-7xl mx-auto">
          {data?.data?.map((work: any, idx: number) => {
            if (work?.type === "shorts") {
              return (
                <div
                  key={idx}
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
                  key={idx}
                  // data-aos="fade-up"
                  // data-aos-delay={100 + idx * 100}
                  className=" rounded-lg   overflow-hidden"
                >
                  <FeaturePlayer
                    thumbnail={work?.thumbnail}
                    youtubeUrl={work?.video_link}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
      <ContactSection />
    </div>
  );
};

export default Portfolio;
