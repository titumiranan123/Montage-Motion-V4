import Header from "@/component/home/Header";
import OurFeatureProject from "@/component/home/OurFeatureProject";
import OurProcess from "@/component/home/OurProcess";
import PartnersSection from "@/component/home/PatnersSection";
import ComparisonCards from "@/component/home/PriceComparison";
import ServiceSections from "@/component/home/ServiceSections";
import WhyChooseUs from "@/component/home/WhyChooseUs";
import ContactSection from "@/component/share/ContactSection";
import FaqSection from "@/component/share/FaqSection";
import { getPageSEO } from "@/component/share/getPageSEO";
import IndustryWeWork from "@/component/share/IndustryWork";
import TestimonialSection from "@/component/share/Testimonial";
import { getData } from "@/utils/getData";
export async function generateMetadata() {
  return await getPageSEO("home");
}
const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab: string }>;
}) => {
  const { data } = await getData({
    url: `api/website/data?type=home&&table=brand,services,process,whychooseus`,
  });

  const { tab } = await searchParams;
  return (
    <div className="mt-4">
      <div className="headerbg rounded-[40px] max-w-[1440px] px-[60px] mx-auto">
        <style>
          {`
            .headerbg {
              background: linear-gradient(180deg, #EAF0F7 30.22%, #69CDE8 100%);

            }
            `}
        </style>

        <Header data={data?.header ?? []} />
      </div>
      <PartnersSection data={data?.brand ?? []} />
      <OurFeatureProject tab={tab ?? []} />
      <ServiceSections data={data?.services ?? []} />
      <TestimonialSection
        title="What Our Clients Say"
        description="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
        data={data?.testimonial ?? []}
      />
      <OurProcess process={data?.process ?? []} />
      <ComparisonCards />
      <IndustryWeWork />
      <WhyChooseUs data={data?.whychooseus ?? []} />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
