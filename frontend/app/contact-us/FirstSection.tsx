"use client";

import ContactForm from "@/component/share/ContactForm";
import Gradientcard from "@/component/share/Gradientcard";
import Heading from "@/component/share/Headering";
import Image from "next/image";
import React from "react";

const FirstSection = () => {
  return (
    <div>
      <Heading
        subtitle="See how design meets function. Real results, clean code, and user-first experiences."
        tag="Contact Us"
        title="Have a Project ? "
        extratitle="Let's Talk"
      />
      <div className=" lg:mt-20 mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mx-auto">
        <div className="flex flex-col gap-4 w-full justify-center items-center mx-auto">
          {[
            {
              title: "Email Us",
              value: "Hello@montagemotion.com",
              icon: "/assets/icon/gmail.png",
            },
            {
              title: "Call Us",
              value: "+880 1862938306",
              icon: "/assets/icon/whatsapp.png",
            },
            {
              title: "Visit Us",
              value: "See current job opportunities",
              icon: "/assets/icon/users.png",
            },
          ].map((item, idx) => (
            <Gradientcard
              key={idx}
              className="contact-card flex justify-between items-center text-white max-w-[582px] w-full h-[190px] rounded-[24px]"
              borderClassName="max-w-[582px] w-full h-[192px] rounded-[24px] p-[1px]"
            >
              <div>
                <h3 className="text-[20px] md:text-[24px] font-[600] poppins">
                  {item.title}
                </h3>
                <p className="text-[14px] md:text-[16px] font-[400] opensans">
                  {item.value}
                </p>
              </div>
              <Image
                src={item.icon}
                alt={item.title}
                className="w-[56px] h-[56px] bg-white rounded-[12px] p-[10px]"
                width={36}
                height={36}
              />
            </Gradientcard>
          ))}
        </div>

        <Gradientcard
          className="contact-card flex justify-center mx-auto items-center text-white max-w-[582px] w-full h-auto rounded-[24px]"
          borderClassName="max-w-[582px] mx-auto w-full h-auto rounded-[24px] p-[1px]"
        >
          <ContactForm />
        </Gradientcard>
      </div>
    </div>
  );
};

export default FirstSection;
