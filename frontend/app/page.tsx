import Header from "@/component/home/Header";
import OurProcess from "@/component/home/OurProcess";
import OurWorkSection from "@/component/home/OurWorkSection";
import PatnersSection from "@/component/home/PatnersSection";
import ContactSection from "@/component/share/ContactSection";
import FaqSection from "@/component/share/FaqSection";
import React from "react";

const HomePage = () => {
  return (
    <div className="">
      <Header />
      <PatnersSection />
      <OurWorkSection />
      <OurProcess />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
