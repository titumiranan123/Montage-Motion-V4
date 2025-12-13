import Header from "@/component/home/Header";
import OurFeatureProject from "@/component/home/OurFeatureProject";
import OurProcess from "@/component/home/OurProcess";
import PartnersSection from "@/component/home/PatnersSection";
import ComparisonCards from "@/component/home/PriceComparison";
import ServiceSections from "@/component/home/ServiceSections";
import WhyChooseUs from "@/component/home/WhyChooseUs";
import ContactSection from "@/component/share/ContactSection";
import FaqSection from "@/component/share/FaqSection";
import IndustryWeWork from "@/component/share/IndustryWork";
import Navbar from "@/component/share/Navbar";
import TestimonialSection from "@/component/share/Testimonial";
import React from "react";
const getPageData = async () => {
  const [seoRes, mainRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seo/home`, {
      cache: "no-store",
    }),
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/website/data?type=home&&table=brand,services,process,whychooseus`,
      {
        cache: "no-store",
      }
    ),
  ]);
  const seoData = await seoRes.json();
  const data = await mainRes.json();
  console.log(data);
  return { seo: seoData.data, main: data.data };
};
const HomePage = async ({
  searchParams,
}: {
  searchParams: { tab: string };
}) => {
  const { tab } = await searchParams;
  const { main: data } = await getPageData();
  return (
    <div className="">
      <div className="headerbg rounded-[40px] max-w-[1440px] px-[60px] mx-auto">
        <style>
          {`
            .headerbg {
              background: linear-gradient(180deg, #EAF0F7 30.22%, #69CDE8 100%);

            }
            `}
        </style>
        <Navbar />
        <Header data={data?.header} />
      </div>
      <PartnersSection data={data?.brand} />
      <OurFeatureProject tab={tab} />
      <ServiceSections data={data?.services} />
      <TestimonialSection
        title="What Our Clients Say"
        description="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
        data={data?.testimonial}
      />
      <OurProcess process={data?.process} />
      <ComparisonCards />
      <IndustryWeWork />
      <WhyChooseUs data={data?.whychooseus} />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
