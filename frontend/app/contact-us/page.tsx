import React from "react";
import FirstSection from "./FirstSection";
import "./contact.css";
import Locationsection from "./Locationsection";
import CalendlyContact from "./CalendlyContact";
const ContactPage = () => {
  return (
    <div className="container">
      <FirstSection />
      <Locationsection />
      <CalendlyContact />
    </div>
  );
};

export default ContactPage;
