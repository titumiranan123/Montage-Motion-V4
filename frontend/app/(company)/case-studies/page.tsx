// app/case-studies/page.tsx

import { getPageSEO } from '@/component/share/getPageSEO';
import JsonLd from '@/component/share/JsonLd';
import CaseStudiesInfiniteGrid from './CaseStudiesInfiniteGrid';
import Style from './Style';
import { getData } from '@/utils/getData';

export const revalidate = 300;
export async function generateMetadata() {
  return await getPageSEO("case-studies");
}
const CaseStudies = async () => {
  const currentPage = 1;
  const limit = 6;

  const allCaseStudies = await getData({
    url: `api/case-studies?page=${currentPage}&limit=${limit}&status=published`,
  });
// console.log("all case studies =========>", allCaseStudies?.data?.schema);
  const totalPages = allCaseStudies?.data?.pages || 1;
  const caseStudies = allCaseStudies?.data?.data || [];
  return (
    <div style={{
      background: `linear-gradient(180deg, #EAF0F7 30.22%, #69CDE8 65.11%, #EAF0F7 100%)`
    }} className="relative lg:mt-4 pt-40 rounded-[40px] pb-10 pagelogo casebg">
       <JsonLd value={allCaseStudies?.data?.schema} />
      <div className="flex flex-col gap-1 justify-center items-center max-w-4xl w-full mx-auto sectionarea">
        <p
          data-aos="fade-up"
          data-aos-delay={200}
          style={{ maxWidth: `120px` }}
          className="max-w-59.5 w-full h-11.5 flex justify-center items-center rounded-3xl text-[16px] leading-[140%] font-normal poppins glass-card text-(--text-primary)"
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
          className="text-sm md:text-base md:leading-[150%] font-normal text-center text-gray-600 mt-2 w-full xl:w-8/9 mx-auto"
        >
          Real projects. Measurable results. Proven work across video, content, and marketing.
        </p>
      </div>

      <div className="container">
        <CaseStudiesInfiniteGrid
          initialItems={caseStudies}
          currentPage={currentPage}
          totalPages={totalPages}
          limit={limit}
        />
      </div>
     <Style />
    </div>
  );
};

export default CaseStudies;
