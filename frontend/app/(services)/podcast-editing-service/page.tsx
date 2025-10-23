import FaqSection from "@/component/home/FaqSection";
import WhyChooseUs from "@/component/home/WhyChooseUs";
import ContactSection from "@/component/share/ContactSection";
import React from "react";
import PodacastMarquee from "./PodacastMarquee";
import PodacstHeader from "./PodacstHeader";
import OurWork from "./OurWork";
import PodcastService from "./PodcastService";
import PodcastProcess from "./PodcastProcess";
import PodcastWhychooseus from "./PodcastWhychooseus";
import PodcastPricing from "./PodcastPricing";
import PodcastPlanwithpurpose from "./PodcastPlanwithpurpose";
import GsapImageSlide from "./VerticalSlide";
import TestimonialSection from "@/component/share/Testimonial";
import { Metadata } from "next";
const getPageData = async () => {
  const [seoRes, mainRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seo/podcast`, {
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/website/data?type=podcast`, {
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

const PodcastEditing = async () => {
  const res = await fetch(
    "https://api-v2.montagemotion.com/api/website/data?type=main",
    { cache: "no-store" } // ensures fresh data on every request
  );
  const { main } = await getPageData();

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return (
    <div className="lg:mt-20 mt-10">
      <PodacstHeader />
      <PodacastMarquee />
      <OurWork />
      <PodcastService />
      <PodcastPricing />

      {/* common */}
      {data?.data?.testimonial.length > 0 && (
        <TestimonialSection
          title="What Our Clients Say"
          description="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
          data={data?.data?.testimonial}
        />
      )}
      <PodcastProcess />
      <PodcastPlanwithpurpose />
      <PodcastWhychooseus />
      {/* <WhyChooseUs /> */}
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default PodcastEditing;
