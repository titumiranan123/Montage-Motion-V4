import React from "react";
import FirstSection from "./FirstSection";
import "./contact.css";
import Locationsection from "./Locationsection";
import CalendlyContact from "./CalendlyContact";
import { getPageSEO } from "@/component/share/getPageSEO";

export async function generateMetadata() {
  return await getPageSEO("contact");
}
const ContactPage = async () => {
  return (
    <div className="">
      <FirstSection />
      <Locationsection />
      <CalendlyContact />
    </div>
  );
};

export default ContactPage;
