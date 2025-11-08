import WhyChooseUs from "@/component/home/WhyChooseUs";
import ContactSection from "@/component/share/ContactSection";
import FaqSection from "@/component/share/FaqSection";
import { getPageSEO } from "@/component/share/getPageSEO";
import React from "react";
export async function generateMetadata() {
  return await getPageSEO("podcast");
}
const Advertising = () => {
  return (
    <div>
      <WhyChooseUs />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default Advertising;
