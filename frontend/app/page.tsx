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
const getPageData = async () => {
  const [seoRes, mainRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seo/home`, {
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/website/data?type=main`, {
      cache: "no-store",
    }),
  ]);
  const seoData = await seoRes.json();
  const data = await mainRes.json();
  return { seo: seoData.data, main: data.data };
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { seo } = await getPageData();
    if (!seo) {
      return {
        title: "MontageMotion",
        description: "Professional video editing and creative agency.",
      };
    }
    return {
      title: seo.meta_title || "MontageMotion",
      description: seo.meta_description || "",
      keywords: seo.meta_keywords || "",
      openGraph: {
        title: seo.meta_title || "",
        description: seo.meta_description || "",
        url: seo.canonical_url || "https://montagemotion.com",
        images: seo.ogImage
          ? [
              {
                url: seo.ogImage,
                width: 1200,
                height: 630,
                alt: seo.meta_title || "MontageMotion",
              },
            ]
          : [],
        type: "website",
      },
      twitter: {
        card: seo.twitter_card_type || "summary_large_image",
        title: seo.meta_title || "",
        description: seo.meta_description || "",
        images: seo.twitter?.image ? [seo.twitter.image] : [],
      },
      alternates: {
        canonical: seo.canonical_url || "https://montagemotion.com",
      },
      robots: seo.meta_robots || "index, follow",
    };
  } catch (error) {
    console.error("Failed to generate metadata:", error);
    return {
      title: "MontageMotion",
      description: "Professional video editing and creative agency.",
    };
  }
}

const HomePage = async () => {
  const { seo, main: data } = await getPageData();
  // Parse JSON schema safely
  let schema = null;
  try {
    schema = seo?.schema ? JSON.parse(seo?.schema) : null;
  } catch (err) {
    console.warn("Invalid schema JSON:", err);
  }
  console.log("home =========>", data.header);
  return (
    <div className="">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <Header data={data.header} />
      <PatnersSection />
      <OurFeatureProject />
      <ServiceSections />
      {data?.testimonial.length > 0 && (
        <TestimonialSection
          title="What Our Clients Say"
          description="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
          data={data?.testimonial}
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
