import Header from "@/component/home/Header";
import OurProcess from "@/component/home/OurProcess";
import OurWorkSection from "@/component/home/OurWorkSection";
import PatnersSection from "@/component/home/PatnersSection";
import ServiceSections from "@/component/home/ServiceSections";
import WhyChooseUs from "@/component/home/WhyChooseUs";
import ContactSection from "@/component/share/ContactSection";
import FaqSection from "@/component/share/FaqSection";
import React from "react";

const HomePage = async () => {
  const res = await fetch(
    "https://api-v2.montagemotion.com/api/website/data?type=main",
    { cache: "no-store" } // ensures fresh data on every request
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return (
    <div className="">
      <Header data={data?.data?.header} />
      <PatnersSection />
      <OurWorkSection />
      <OurProcess />
      <ServiceSections />
      <WhyChooseUs />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
