import FaqSection from "@/component/home/FaqSection";
import WhyChooseUs from "@/component/home/WhyChooseUs";
import ContactSection from "@/component/share/ContactSection";
import React from "react";
import PodacastMarquee from "./PodacastMarquee";
import PodacstHeader from "./PodacstHeader";
import OurWork from "./OurWork";
import PodcastService from "./PodcastService";
import PodcastProcess from "./PodcastProcess";

const PodcastEditing = () => {
  return (
    <div className="lg:mt-20 mt-10">
      <PodacstHeader />
      <PodacastMarquee />
      <OurWork />
      <PodcastService />
      <PodcastProcess />
      {/* common */}
      <WhyChooseUs />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default PodcastEditing;
