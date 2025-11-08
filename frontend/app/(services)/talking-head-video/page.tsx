import ContactSection from "@/component/share/ContactSection";
import FaqSection from "@/component/share/FaqSection";
import React from "react";
import TalkingHeader from "./TalkingHeader";
import TalkingService from "./TalkingService";
import TalkingHeadWork from "./TalkingHeadWork";
import TalkingHeadprocess from "./TalkingHeadprocess";
import TalkingWhychooseus from "./TalkingHeadChooseus";
import TalkingHeadPlanPurpose from "./TalkingHeadPlanPurpose";
import TestimonialSection from "@/component/share/Testimonial";
import TalkingHeadPricing from "./TalkingHeadPricing";
import { getPageSEO } from "@/component/share/getPageSEO";
export async function generateMetadata() {
  return await getPageSEO("talking");
}
const TalkingHeadEditing = async () => {
  const res = await fetch(
    "https://api-v2.montagemotion.com/api/website/data?type=main",
    { cache: "no-store" } // ensures fresh data on every request
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return (
    <div>
      <TalkingHeader />
      <TalkingHeadWork />
      <TalkingService />
      <TalkingHeadPricing />
      {/* common */}
      {data?.data?.testimonial.length > 0 && (
        <TestimonialSection
          title="What Our Clients Say"
          description="Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
          data={data?.data?.testimonial}
        />
      )}
      <TalkingHeadprocess />

      <TalkingHeadPlanPurpose />
      <TalkingWhychooseus />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default TalkingHeadEditing;
