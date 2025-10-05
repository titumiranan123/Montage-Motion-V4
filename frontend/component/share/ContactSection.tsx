import Image from "next/image";
import React from "react";
import Gradientcard from "./Gradientcard";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <div className="container sectionGap grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="text-white flex flex-col items-start justify-center w-full">
        <div>
          <h2 className="md:text-[56px] text-[32px] leading-[120%] font-[600] poppins">
            Have a Project ?
          </h2>
          <h2 className="md:text-[56px] text-[32px] leading-[120%] font-[600] poppins">
            Let's Talk
          </h2>
          <p className="text-[14px] mt-2 md:text-[16px] opensans font-[400]  leading-[140%]">
            See how design meets
          </p>
          <p className="text-[14px] md:text-[16px] opensans font-[400] leading-[140%]">
            Real results, clean code, and user-first experiences
          </p>
        </div>
        <div className="mt-10 flex gap-4 flex-col w-full">
          <Gradientcard
            className="max-w-[582px] max-h-[94px] w-full h-full rounded-[24px]"
            borderClassName="p-[1px] rounded-[24px]"
          >
            <div className="flex justify-between  items-center rounded-[24px] py-4 px-4">
              <div>
                <h3 className="poppins text-[24px] font-[500] text-white">
                  Email Us{" "}
                </h3>
                <p className="font-[400] opensans md:text-[16px] text-[14px]">
                  Hello@montagemotion.com
                </p>
              </div>
              <Image
                src={"/assets/icon/gmail.png"}
                alt="gmail"
                className="w-[56px] h-[56px] bg-white rounded-[12px] p-[10px]"
                width={36}
                height={36}
              />
            </div>
          </Gradientcard>
          <Gradientcard
            className="max-w-[582px] max-h-[94px] w-full h-full rounded-[24px]"
            borderClassName="p-[1px] rounded-[24px]"
          >
            <div className="flex justify-between  items-center rounded-[24px] py-4 px-4">
              <div>
                <h3 className="poppins text-[24px] font-[500] text-white">
                  Chat on WhatsApp{" "}
                </h3>
                <p className="font-[400] opensans md:text-[16px] text-[14px]">
                  +8801862938306
                </p>
              </div>
              <Image
                src={"/assets/icon/whatsapp.png"}
                alt="gmail"
                className="w-[56px] h-[56px] bg-white rounded-[12px] p-[10px]"
                width={36}
                height={36}
              />
            </div>
          </Gradientcard>
          <Gradientcard
            className="max-w-[582px] max-h-[94px] w-full h-full rounded-[24px]"
            borderClassName="p-[1px] rounded-[24px]"
          >
            <div className="flex justify-between  items-center rounded-[24px] py-4 px-4">
              <div>
                <h3 className="poppins text-[24px] font-[500] text-white">
                  Work at Motage Motion
                </h3>
                <p className="font-[400] opensans md:text-[16px] text-[14px]">
                  See current job opportuites
                </p>
              </div>
              <Image
                src={"/assets/icon/users.png"}
                alt="gmail"
                className="w-[56px] h-[56px] bg-white rounded-[12px] p-[10px]"
                width={36}
                height={36}
              />
            </div>
          </Gradientcard>
        </div>
      </div>

      <Gradientcard
        className="contact-card flex justify-between items-center text-white max-w-[582px] w-full h-auto rounded-[24px]"
        borderClassName="max-w-[582px] w-full h-auto rounded-[24px] p-[1px]"
      >
        <ContactForm />
      </Gradientcard>
    </div>
  );
};

export default ContactSection;
