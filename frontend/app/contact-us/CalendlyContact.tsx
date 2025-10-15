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

      <div className="max-w-[1200px] w-full md:h-[761px] min-h-screen overflow-hidden  bg-cover bg-center lg:mt-20 mt-10">
        {/* JS Disabled Fallback */}
        <noscript>
          <div className="flex flex-col items-center justify-center text-center bg-black/60 text-white p-10 h-full">
            <h2 className="text-2xl font-semibold mb-3">
              JavaScript is disabled in your browser
            </h2>
            <p className="mb-5 max-w-[500px]">
              Please enable JavaScript to view the booking calendar.
              Alternatively, you can book your meeting directly using the link
              below.
            </p>
            <a
              href="https://calendly.com/imonofficial2/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Open Calendly in a new tab
            </a>
          </div>
        </noscript>
        <InlineWidget
          url="https://calendly.com/imonofficial2/30min"
          className="max-w-[1200px] w-full lg:h-[761px] h-[980px] overflow-hidden"
        />
      </div>
    </div>
  );
};

export default CalendlyContact;
