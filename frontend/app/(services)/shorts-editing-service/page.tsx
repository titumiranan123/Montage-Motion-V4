import FaqSection from "@/component/home/FaqSection";
import WhyChooseUs from "@/component/home/WhyChooseUs";
import ContactSection from "@/component/share/ContactSection";
import React from "react";
import ShortsHeader from "./ShortsHeader";

const ShortsEditing = () => {
  return (
    <div>
      <ShortsHeader />
      <WhyChooseUs />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default ShortsEditing;
