import HeaderService from "@/component/about/Header";
import InsideMontage from "./InsideMontage";
import OurMission from "./OurMission";
import OurTeam from "./OurTeam";
import OurStory from "./OurStory";
import { getPageSEO } from "@/component/share/getPageSEO";
import ContactSection from "@/component/share/ContactSection";
import { getData } from "@/utils/getData";
import PartnersSection from "@/component/home/PatnersSection";
import HomeFaqSection from "@/component/share/HomeFaqSection";
export const dynamic = "force-dynamic";
// Metadata for SEO
export async function generateMetadata() {
  return await getPageSEO("about");
}

const AboutUs = async () => {
  const data = await getData({
    url: `api/website/data?type=about&table=brand,members,faq`,
  });
  return (
    <div className=" mt-2 md:pt-0 ">
      {data?.data?.brand && (
        <div className="headerbg rounded-[40px] max-w-[1440px] px-2 xl:px-[60px] mx-auto pb-[60px] pt-16 mb-10">
          <HeaderService mainIntro={data?.data?.header || null} />
        </div>
      )}
      {data?.data?.brand && <PartnersSection data={data?.data?.brand ?? []} />}
      {/* <Brand /> */}
      <OurMission />

      <OurStory />
      {data?.data?.members && <OurTeam members={data?.data?.members} />}
      <InsideMontage />
      {data?.data?.faq && <HomeFaqSection data={data?.data?.faq} />}
      <ContactSection />
    </div>
  );
};

export default AboutUs;
