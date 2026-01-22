import { getPageSEO } from "@/component/share/getPageSEO";
import { getData } from "@/utils/getData";
import React from "react";
import { getTypeFromSlug } from "./getTypeFromSlug";
import PageContactsections from "../(servicepage-component)/PageContactsections";
import PageFaqSection from "../(servicepage-component)/PagefaqSection";
import PageProcesssection from "../(servicepage-component)/PageProcesssection";
import PagePricing from "../(servicepage-component)/PagePricing";
import PageServicesection from "../(servicepage-component)/PageServicesection";
import ServicepageTestimonial from "../(servicepage-component)/ServicepageTestimonial";
import ShortsHeader from "../(servicepage-component)/ShortsHeader";
import PartnersSection from "@/component/home/PatnersSection";
import PageHomeHero from "../(servicepage-component)/PageHomeHero";
import PodacstHeader from "../(servicepage-component)/PodacstHeader";
import PodcastInsight from "../(servicepage-component)/PodcastInsight";
import SaasInshight from "../(servicepage-component)/SaasInshight";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const type = await getTypeFromSlug(slug);
  return await getPageSEO(type as string);
}
const ServicePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const data = await getData({
    url: `api/website/services/data?type=${slug}`,
  });
  console.log("data", data);
  return (
    <div className="min-h-screen text-black mt-4 ">
      <div className="mt-32"></div>
      {data?.data?.short_hero && <ShortsHeader data={data?.data?.short_hero} />}
      {data?.data?.home_hero && (
        <PageHomeHero data={data?.data?.home_hero?.[0]} />
      )}
      {data?.data?.podcast_hero && (
        <PodacstHeader data={data?.data?.podcast_hero?.[0]} />
      )}
      {data?.data?.our_clients && (
        <PartnersSection data={data?.data?.our_clients} />
      )}
      {data?.data?.service && (
        <PageServicesection data={data?.data?.service?.[0]} />
      )}
      {data?.data?.pricing && <PagePricing pricing={data?.data?.pricing} />}
      {data?.data?.process && <PageProcesssection data={data?.data?.process} />}
      {data?.data?.process && (
        <ServicepageTestimonial
          data={data?.data?.testimonial}
          title="What Our Clients Say"
          description="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
        />
      )}
      {slug === "saas-explainer" && (
        <>
          <SaasInshight />
        </>
      )}
      {slug === "podcast-editing-service" && (
        <>
          <PodcastInsight />
        </>
      )}
      <PageFaqSection />
      <PageContactsections />
    </div>
  );
};

export default ServicePage;
