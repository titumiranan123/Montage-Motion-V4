import ContactSection from "@/component/share/ContactSection";
import FaqSection from "@/component/share/FaqSection";
import React from "react";
import TalkingHeader from "./TalkingHeader";
import TalkingService from "./TalkingService";
import TalkingHeadWork from "./TalkingHeadWork";
import TalkingHeadprocess from "./TalkingHeadprocess";
import TalkingWhychooseus from "./TalkingHeadChooseus";

const TalkingHeadEditing = () => {
  return (
    <div>
      <TalkingHeader />
      <TalkingHeadWork />
      <TalkingService />
      <TalkingHeadprocess />
      <TalkingWhychooseus />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default TalkingHeadEditing;
