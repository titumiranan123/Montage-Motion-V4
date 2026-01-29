/* eslint-disable @typescript-eslint/no-explicit-any */
import Portfoliotab from "./Portfoliotab";
import { getPageSEO } from "@/component/share/getPageSEO";
import Image from "next/image";
import ContactSection from "@/component/share/ContactSection";
import { Heading } from "@/component/share/Headering";
import { getData } from "@/utils/getData";
import VideoPlayer from "@/component/home/VideoPlayer";
export async function generateMetadata() {
  return await getPageSEO("portfolio");
}
const Portfolio = async ({ searchParams }: { searchParams: any }) => {
  const category = await getData({ url: "api/website/service/type" });
  const { cat } = await searchParams;
  const data = await getData({
    url: `api/works/website?type=${cat && cat !== "all" ? cat : "home"}`,
  });

  console.log("data", data.data);
  return (
    <div className=" mt-4">
      <div className="portfoliobg container min-h-screen rounded-[42px]">
        <div className="pt-40"></div>
        <Heading
          subtitle="Turning raw footage and ideas into content that captures attention."
          title="Creativity That Converts"
          tag="Our Portfolio"
          width="160"
        />

        <Portfoliotab tab={cat} types={category?.data} />
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-2 lg:mt-16 mt-10 max-w-7xl mx-auto">
          {data?.data?.map((work: any, idx: number) => {
            console.log(work);
            if (work?.type === "shortsreels-editing") {
              return (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={100 + idx * 100}
                  className=""
                >
                  <VideoPlayer
                    thumbnail={work?.thumbnail}
                    link={work?.video_link}
                    className="aspect-9/16! "
                  />
                </div>
              );
            } else if (work.video_link === "" || work.video_link === null) {
              return (
                <div
                  data-aos="fade-up"
                  data-aos-delay={200 + idx * 100}
                  key={work.id || idx}
                  className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 aspect-video max-w-[410px] w-full h-full max-h-[308px] rounded-[13px]"
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
                  data-aos="fade-up"
                  data-aos-delay={100 + idx * 100}
                  className=" rounded-lg   overflow-hidden"
                >
                  <VideoPlayer
                    thumbnail={work?.thumbnail}
                    link={work?.video_link}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
      <ContactSection />
      <style>
        {`
            .portfoliobg {
              background: linear-gradient(180deg, #EAF0F7 30.22%, #69CDE8 65.11%, #EAF0F7 100%);

            }
          `}
      </style>
    </div>
  );
};

export default Portfolio;
