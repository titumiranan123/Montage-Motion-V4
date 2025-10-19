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

const PodcastEditing = async () => {
  const res = await fetch(
    "https://api-v2.montagemotion.com/api/website/data?type=main",
    { cache: "no-store" } // ensures fresh data on every request
  );

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
