import Header from "@/component/home/Header";
import OurFeatureProject from "@/component/home/OurFeatureProject";
import OurProcess from "@/component/home/OurProcess";
import PartnersSection from "@/component/home/PatnersSection";
import ComparisonCards from "@/component/home/PriceComparison";
import ServiceSections from "@/component/home/ServiceSections";
import WhyChooseUs from "@/component/home/WhyChooseUs";
import ContactSection from "@/component/share/ContactSection";
import { getPageSEO } from "@/component/share/getPageSEO";
import HomeFaqSection from "@/component/share/HomeFaqSection";
import IndustryWeWork from "@/component/share/IndustryWork";
import TestimonialSection from "@/component/share/Testimonial";
import { getData } from "@/utils/getData";
export async function generateMetadata() {
  return await getPageSEO("home");
}
const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ cat: string }>;
}) => {
  const { data } = await getData({
    url: `api/website/data?type=home&table=brand,services,process,whychooseus,industries,comparision,faq`,
  });
  const { cat } = await searchParams;
  return (
    <div className="lg:mt-4">
      <div className="headerbg lg:rounded-[40px] rounded-lg sectionarea mb-10 min-h-screen">
        <Header data={data?.header ?? []} />
      </div>
      <PartnersSection data={data?.brand ?? []} />
      <OurFeatureProject tab={cat ?? []} header={data?.works} />
      <ServiceSections data={data?.services ?? []} />
      <TestimonialSection
        title="What Our Clients Say"
        description="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
        data={data?.testimonial ?? []}
      />
      <OurProcess data={data?.process ?? []} />
      <ComparisonCards data={data?.comparision?.[0]} />
      <IndustryWeWork data={data?.industries} />
      <WhyChooseUs data={data?.whychooseus ?? []} />
      <HomeFaqSection data={data?.faq} />
      <ContactSection />
    </div>
  );
};

export default HomePage;
