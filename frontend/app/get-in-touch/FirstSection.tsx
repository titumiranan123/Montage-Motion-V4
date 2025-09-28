"use client";

import ContactForm from "@/component/share/ContactForm";
import Gradientcard from "@/component/share/Gradientcard";
import Heading from "@/component/share/Headering";
import Image from "next/image";
import React from "react";

const FirstSection = () => {
  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // You can integrate your API call here
  };

  return (
    <div>
      <Heading
        subtitle="See how design meets function. Real results, clean code, and user-first experiences."
        tag="Contact Us"
        title="Have a Project ? "
        extratitle="Let's Talk"
      />
      <div className=" lg:mt-20 mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          {["Email Us", "Call Us", "Visit Us"].map((title, idx) => (
            <Gradientcard
              key={idx}
              className="contact-card flex justify-between items-center text-white max-w-[582px] w-full h-[190px] rounded-[24px]"
              borderClassName="max-w-[582px] w-full h-[190px] rounded-[24px] p-[1px]"
            >
              <div>
                <h3>{title}</h3>
                <p>Hello@montagemotion.com</p>
              </div>
              <Image
                src={"/assets/icon/gmail.png"}
                alt="icon"
                className="w-[56px] h-[56px] bg-white rounded-[12px] p-[10px]"
                width={36}
                height={36}
              />
            </Gradientcard>
          ))}
        </div>

        <div>
          <Gradientcard
            className="contact-card flex justify-between items-center text-white max-w-[582px] w-full h-auto rounded-[24px]"
            borderClassName="max-w-[582px] w-full h-auto rounded-[24px] p-[1px]"
          >
            <ContactForm onSubmit={handleFormSubmit} />
          </Gradientcard>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
