/* eslint-disable @typescript-eslint/no-explicit-any */
import Portfoliotab from "./Portfoliotab";
import { getPageSEO } from "@/component/share/getPageSEO";
import Image from "next/image";
import ContactSection from "@/component/share/ContactSection";
import { getData } from "@/utils/getData";
import VideoPlayer from "@/component/home/VideoPlayer";
import CalendlyContact from "../contact-us/CalendlyContact";
export async function generateMetadata() {
  return await getPageSEO("portfolio");
}
const Portfolio = async ({ searchParams }: { searchParams: any }) => {
  const { cat } = await searchParams;
  const [categoryRes, seoRes] = await Promise.all([
    getData({ url: "api/website/service/type" }),
    getData({ url: "api/seo/portfolio" }),
  ]);

  const matchedCategory = categoryRes?.data?.find(
    (item: any) => item.service_type === cat || item.href === cat,
  );

  const safeSchema =
    seoRes?.data?.schema ??
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "MontageMotion",
    });
  const data = await getData({
    url: `api/works/website?type=${cat && cat !== "all" ? matchedCategory?.service_type : "home"}`,
  });

  return (
    <div className=" mt-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeSchema,
        }}
      />
      <div className="portfoliobg sectionarea min-h-screen rounded-[42px]">
        <div className="pt-40"></div>

        <div
          className={`flex flex-col gap-1 justify-center items-center max-w-4xl w-full mx-auto `}
        >
          <p
            data-aos="fade-up"
            data-aos-delay={200}
            style={{ maxWidth: `160px` }}
            className={`  max-w-59.5 w-full h-11.5 flex justify-center items-center rounded-3xl text-[16px] leading-[140%]  font-normal  poppins glass-card text-(--text-primary) `}
          >
            Our Portfolio
          </p>

          <h1
            data-aos="fade-up"
            data-aos-delay={300}
            className="text-[36px] md:text-[56px] md:leading-[120%] font-medium text-center text-(--text-primary) mt-2 xl:mt-4 poppins"
          >
            Creativity That Converts
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay={400}
            className="text-sm md:text-base md:leading-[150%] font-normal text-center text-gray-600 mt-2 w-full xl:w-8/9 mx-auto "
          >
            Turning raw footage and ideas into content that captures attention.
          </p>
        </div>
        <Portfoliotab
          tab={matchedCategory?.service_type}
          types={categoryRes?.data}
        />
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-2 lg:mt-16 mt-10 max-w-7xl mx-auto">
          {data?.data?.map((work: any, idx: number) => {
            if (work?.type === "shortsreels-editing") {
              return (
                <div
                  key={idx}
                  // data-aos="fade-up"
                  // data-aos-delay={100 + idx * 100}
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
                  // data-aos="fade-up"
                  // data-aos-delay={200 + idx * 100}
                  key={work.id || idx}
                  className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 aspect-video max-w-102.5 w-full h-full max-h-77 rounded-[13px]"
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
      <div className="sectionGap">
        <CalendlyContact />
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
