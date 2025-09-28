"use client";
import Heading from "@/component/share/Headering";
import React from "react";
import { InlineWidget } from "react-calendly";

const CalendlyContact = () => {
  return (
    <div className="sectionGap ">
      <Heading
        subtitle="Prefer virtual? Let's hop on a quick call and bring your ideas to life."
        tag="Book a Call"
        title="Your Next Step"
        extratitle="Starts Here"
      />
      <div className="max-w-[1200px] w-full h-[761px] overflow-hidden bg-[url('https://via.placeholder.com/998x861.png?text=Calendar+Background')] bg-cover bg-center">
        <InlineWidget
          url="https://calendly.com/imonofficial2/30min"
          className="max-w-[1200px] w-full h-[761px] overflow-hidden"
        />
      </div>
    </div>
  );
};

export default CalendlyContact;
