import WhyChooseUs from "@/component/home/WhyChooseUs";
import ContactSection from "@/component/share/ContactSection";
import FaqSection from "@/component/share/FaqSection";
import React from "react";
import TalkingHeader from "./TalkingHeader";
import TalkingService from "./TalkingService";
import TalkingHeadWork from "./TalkingHeadWork";
import TalkingHeadprocess from "./TalkingHeadprocess";

const TalkingHeadEditing = () => {
  return (
    <div>
      <TalkingHeader />
      <TalkingHeadWork />
      <TalkingService />
      <TalkingHeadprocess />
      <WhyChooseUs />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default TalkingHeadEditing;
