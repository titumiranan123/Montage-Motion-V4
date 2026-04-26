/* eslint-disable @typescript-eslint/no-explicit-any */

import { getPageSEO } from "@/component/share/getPageSEO";
import { getData } from "@/utils/getData";
import CaseStudiesCarousel from "./CaseStudiesCarousel";
export async function generateMetadata() {
  return await getPageSEO("blog");
}

const Blogs = async ({ searchParams }: { searchParams: any }) => {
  const { cat, search } = await searchParams;
  const result = await getData({
    url: `api/website/blog?category=${cat}&search=${search}`,
  });
  const data = [...result.data,...result.data,...result.data,...result.data,...result.data,];
  
  const seoRes = await getData({ url: "api/seo/blog" });
  const safeSchema =
    seoRes?.data?.schema ??
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "MontageMotion",
    });
  return (
    <div className="relative   lg:mt-4 pt-40 rounded-[40px]  pb-10  pagelogo casebg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeSchema,
        }}
      />
      <div
        className={`flex flex-col gap-1 justify-center items-center max-w-4xl w-full mx-auto  sectionarea`}
      >
        <p
          data-aos="fade-up"
          data-aos-delay={200}
          style={{ maxWidth: `120px` }}
          className={`  max-w-59.5 w-full h-11.5 flex justify-center items-center rounded-3xl text-[16px] leading-[140%]  font-normal  poppins glass-card text-(--text-primary) `}
        >
          Case Study
        </p>

        <h1
          data-aos="fade-up"
          data-aos-delay={300}
          className="text-[36px] md:text-[56px] md:leading-[120%] font-medium text-center text-(--text-primary) mt-2 xl:mt-4 poppins"
        >
          Case Studies
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay={400}
          className="text-sm md:text-base md:leading-[150%] font-normal text-center text-gray-600 mt-2 w-full xl:w-8/9 mx-auto "
        >
          Explore tips, trends, and strategies from the world of video editing,
          content creation, and digital marketing .
        </p>
        <style>{`
.casebg{
background: linear-gradient(180deg, #EAF0F7 30.22%, #69CDE8 65.11%, #EAF0F7 100%);

}
       .glass-card {
        width: "100%";
        height: 46px;
        background: rgba(255, 255, 255, 0.09);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 
          0 0.2px 1px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.5),
          inset 0 -1px 0 rgba(255, 255, 255, 0.1),
          inset 0 0 6px 3px rgba(255, 255, 255, 0.3);
        position: relative;
        overflow: hidden;
      }
      
      .glass-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.1),
          transparent
        );
      }
      
      .glass-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 100%;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.8),
          transparent,
          rgba(255, 255, 255, 0.3)
        );
      }
     
      `}</style>
      </div>
  
      <CaseStudiesCarousel data={data} />
    </div>
  );
};

export default Blogs;
