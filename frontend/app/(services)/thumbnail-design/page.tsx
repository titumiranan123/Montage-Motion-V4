import WhyChooseUs from "@/component/home/WhyChooseUs";
import ContactSection from "@/component/share/ContactSection";
import FaqSection from "@/component/share/FaqSection";
import { getPageSEO } from "@/component/share/getPageSEO";
import React from "react";
import Thumbnailheader from "./Thumbnailheader";
import Thumbnailworksection from "./Thumbnailworksection";
export async function generateMetadata() {
  return await getPageSEO("thumbnail");
}
const getPageData = async () => {
  const [seoRes, mainRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seo/thumbnail`, {
      cache: "no-store",
    }),
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/website/data?type=thumbnail&&table=services,pricing,process,whychooseus`,
      {
        cache: "no-store",
      }
    ),
  ]);
  const seoData = await seoRes.json();
  const data = await mainRes.json();
  return { seo: seoData.data, main: data.data };
};
const GraphicDesign = async () => {
  const { main } = await getPageData();
  return (
    <div>
      <Thumbnailheader data={main?.header} />
      <Thumbnailworksection works={main?.works} />
      <WhyChooseUs data={main?.whychooseus} />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default GraphicDesign;
