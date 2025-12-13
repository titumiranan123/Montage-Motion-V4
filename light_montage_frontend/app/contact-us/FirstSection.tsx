"use client";

import ContactForm from "@/component/share/ContactForm";
import Gradientcard from "@/component/share/Gradientcard";
import Heading from "@/component/share/Headering";
import Image from "next/image";
import React from "react";

const FirstSection = () => {
  return (
    <div className="">
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
              value: "hello@montagemotion.com",
              icon: "/assets/icon/gmail.png",
            },
            {
              title: "Call Us",
              value: "+880 1786-546949",
              icon: "/assets/icon/whatsapp.png",
            },
            {
              title: "Visit Us",
              value: "See current job opportunities",
              icon: "/assets/icon/users.png",
            },
          ].map((item, idx) => (
            <div
              className="w-full"
              key={idx}
              data-aos="fade-up"
              data-aos-delay={100 + idx * 100}
            >
              <Gradientcard
                className="contact-card flex justify-between items-center text-(--text-primary) max-w-[582px] w-full h-[190px] rounded-3xl "
                borderClassName="max-w-[582px] w-full h-[192px] rounded-[24px] p-[1px] translate-all duration-300 ease-in-out hover:scale-105"
              >
                <div>
                  <h3 className="text-[20px] md:text-[24px] md:leading-[30px] font-semibold poppins">
                    {item.title}
                  </h3>
                  <p className="text-[14px] md:text-[16px] md:leading-[140%] font-normal opensans">
                    {item.value}
                  </p>
                </div>
                <Image
                  src={item.icon}
                  alt={item.title}
                  className="w-14 h-14 bg-white rounded-[12px] p-2.5"
                  width={36}
                  height={36}
                />
              </Gradientcard>
            </div>
          ))}
        </div>
        <div data-aos="fade-up" data-aos-delay={600}>
          <Gradientcard
            className="contact-card flex justify-center mx-auto items-center text-(--text-primary) max-w-[582px] w-full h-auto rounded-3xl"
            borderClassName="max-w-[582px] mx-auto w-full h-auto rounded-[24px] p-[1px]"
          >
            <ContactForm />
          </Gradientcard>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
