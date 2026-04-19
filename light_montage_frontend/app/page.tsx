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
const HomePage = async () => {
  const { data } = await getData({
    url: `api/website/data?type=home&table=brand,services,process,whychooseus,industries,comparision,faq`,
  });
  // console.log("scham ====================>", data);
  const categoryRes = await getData({ url: "api/website/service/type" });
  // console.log(data?.header)
  return (
    <div className="lg:mt-4 w-full mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            data?.schema ??
            JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "MontageMotion",
              url: "https://montagemotion.com",
              description:
                "Full-service video editing agency helping creators and brands grow with Shorts, Reels, podcasts, and high-converting content.",
            }),
        }}
      />
      <div className="headerbg lg:rounded-[40px] rounded-lg  mb-10 min-h-screen">
        <Header data={data?.header ?? []} />
      </div>
      <PartnersSection data={data?.brand ?? []} />
      <OurFeatureProject header={data?.works} category={categoryRes?.data} />
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
