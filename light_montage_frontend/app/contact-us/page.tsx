import React from "react";
import FirstSection from "./FirstSection";
import "./contact.css";
import Locationsection from "./Locationsection";
import CalendlyContact from "./CalendlyContact";
import { getPageSEO } from "@/component/share/getPageSEO";
import Navbar from "@/component/share/Navbar";

export async function generateMetadata() {
  return await getPageSEO("contact");
}
const ContactPage = async () => {
  return (
    <div className="">
      <div className="headerbg rounded-[40px] max-w-[1440px] px-[60px]  mx-auto">
        <style>
          {`
            .headerbg {
              background: linear-gradient(180deg, #EAF0F7 30.22%, #69CDE8 100%); }
.candly {
  background: linear-gradient(180deg, #E9F8FC 0%, #F6FDFF 100%);
  
}
           
            `}
        </style>
        <Navbar />
        <div className="pb-[60px] pt-20 ">
          <FirstSection />
        </div>
      </div>
      <Locationsection />
      <div className="candly sectionGap container  rounded-[40px] ">
        <CalendlyContact />
      </div>
    </div>
  );
};

export default ContactPage;
