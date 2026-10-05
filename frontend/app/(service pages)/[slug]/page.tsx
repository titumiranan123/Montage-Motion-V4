import { getPageSEO } from "@/component/share/getPageSEO";
import { getData } from "@/utils/getData";
import { notFound } from "next/navigation";
import React from "react";
import { getTypeFromSlug } from "./getTypeFromSlug";
import PageContactsections from "../(servicepage-component)/PageContactsections";
import PageProcesssection from "../(servicepage-component)/PageProcesssection";
import PagePricing from "../(servicepage-component)/PagePricing";
import PageServicesection from "../(servicepage-component)/PageServicesection";

import ShortsHeader from "../(servicepage-component)/ShortsHeader";
import PartnersSection from "@/component/home/PatnersSection";
import PageHomeHero from "../(servicepage-component)/PageHomeHero";
import PodacstHeader from "../(servicepage-component)/PodacstHeader";
import PodcastInsight from "../(servicepage-component)/PodcastInsight";
import SaasInshight from "../(servicepage-component)/SaasInshight";
import PageWhychooseus from "../(servicepage-component)/PageWhychooseus";
import Thumbnailworksection from "../(servicepage-component)/Thumbnailworksection";
import HomeFaqSection from "@/component/share/HomeFaqSection";
import ComparisonCards from "@/component/home/PriceComparison";
import JsonLd from "@/component/share/JsonLd";
import TestimonialSection from "@/component/share/Testimonial";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const result = await getData({ url: "api/website/service/type" });

  return (result?.data ?? [])
    .filter((item: { href?: string }) => item.href && item.href !== "/")
    .map((item: { href: string }) => ({ slug: item.href }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const type = await getTypeFromSlug(slug);
  return await getPageSEO(type ?? slug);
}
const ServicePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const type = await getTypeFromSlug(slug);
  if (!type) notFound();

  const data = await getData({
    url: `api/website/services/data?type=${slug}`,
    throwOnError: true,
  });
  if (!data?.data || Object.keys(data.data).length === 0) notFound();
  // console.log("scham ====================>", data);
    // console.log(data?.data?.home_hero)
  return (
    <div className="lg:min-h-screen text-black mt-4 ">
      <JsonLd value={data?.data?.schema} />
      {data?.data?.short_hero && <ShortsHeader data={data?.data?.short_hero} />}
      {data?.data?.home_hero && (
        <PageHomeHero
          data={data?.data?.home_hero}
          autoPlay={slug === "saas-explainer"}
        />
      )}
      {data?.data?.podcast_hero && (
        <PodacstHeader data={data?.data?.podcast_hero} />
      )}
      {data?.data?.our_clients && (
        <PartnersSection data={data?.data?.our_clients} />
      )}
      {data?.data?.work && (
        <Thumbnailworksection works={data?.data?.work} />
      )}
      {slug === "saas-explainer" && (
        <>
          <SaasInshight />
        </>
      )}
      {data?.data?.service && (
        <PageServicesection data={data?.data?.service?.[0]} />
      )}
      {data?.data?.pricing && <PagePricing pricing={data?.data?.pricing} />}
      {data?.data?.testimonial && (
        <TestimonialSection
          data={data?.data?.testimonial}
          title="What Our Clients Say"
          description="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
        />
      )}
      {data?.data?.process && <PageProcesssection data={data?.data?.process} />}
      {data?.data?.insight && <PodcastInsight data={data?.data?.insight} />}
      {data?.data?.comparison && (
        <ComparisonCards data={data?.data?.comparison?.[0]} />
      )}
      {data?.data?.whychooseus && (
        <PageWhychooseus data={data?.data?.whychooseus ?? []} />
      )}
      {data?.data?.faq && <HomeFaqSection data={data?.data?.faq} />}
      {data?.data?.contact && <PageContactsections />}
    </div>
  );
};

export default ServicePage;
