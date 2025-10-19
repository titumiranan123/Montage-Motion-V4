import Header from "@/component/home/Header";
import OurProcess from "@/component/home/OurProcess";
import PatnersSection from "@/component/home/PatnersSection";
import ServiceSections from "@/component/home/ServiceSections";
import WhyChooseUs from "@/component/home/WhyChooseUs";
import ContactSection from "@/component/share/ContactSection";
import FaqSection from "@/component/share/FaqSection";
import TestimonialSection from "@/component/share/Testimonial";
import React from "react";
import OurFeatureProject from "@/component/home/OurFeatureProject";
import ComparisonCards from "@/component/home/PriceComparison";
import IndustryWeWork from "@/component/share/IndustryWork";
import { Metadata } from "next";
import homeseo from "@/public/homepage.json";
export async function generateMetadata(): Promise<Metadata> {
  const seo = homeseo; // already an object, no need to fetch

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: "https://montagemotion.com",
      images: [
        {
          url: "",
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
      type: "website",
    },
    // twitter: {
    //   card: seo.twitter?.card,
    //   title: seo.twitter?.title,
    //   description: seo.twitter?.description,
    //   images: [seo.twitter?.image],
    // },
    alternates: {
      canonical: "https://montagemotion.com",
    },
  };
}

const HomePage = async () => {
  const res = await fetch(
    "https://api-v2.montagemotion.com/api/website/data?type=main",
    { cache: "no-store" } // ensures fresh data on every request
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return (
    <div className="">
      <Header data={data?.data?.header} />
      <PatnersSection />
      <OurFeatureProject />
      <ServiceSections />
      {data?.data?.testimonial.length > 0 && (
        <TestimonialSection
          title="What Our Clients Say"
          description="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
          data={data?.data?.testimonial}
        />
      )}
      <OurProcess />
      <ComparisonCards />
      <IndustryWeWork />
      <WhyChooseUs />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
