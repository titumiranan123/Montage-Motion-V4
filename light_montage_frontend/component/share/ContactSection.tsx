import Image from "next/image";
import React from "react";
import ContactForm from "./ContactForm";
import { Heading } from "../share/Headering";

const ContactSection = () => {
  return (
    <div className="container contactbg sectionGap  p-[60px] rounded-[40px]">
      <style>{`
      .contactbg{
        background: linear-gradient(180deg, #E0D7FF 0%, rgba(224, 215, 255, 0.2) 100%);

      }
      `}</style>

      <Heading
        title="Have a Project? Let’s Talk "
        subtitle="See how design meets function. Real results, clean code, and 
user-first experiences."
        tag="Contact Us"
        isbackground={true}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
        <div className=" text-(--text-primary)  flex flex-col items-start justify-center w-full">
          <div className=" flex gap-4 flex-col w-full">
            <style>{`
            .glass {
            border: 2px solid hsl(0,0%,100%,0.3);
            background:hsl(0,0%,100%,0.2);
            backdrop-filter: blur(2px);
            box-shadow: inset 0 0 8px -1px hsl(0,0%,100%,0.3);
            }
            `}</style>
            <div data-aos="fade-up" data-aos-delay={600}>
              <div className="max-w-[622px] h-[139px] w-full  rounded-3xl glass  py-10 px-5 flex items-center transition-all duration-300 ease-in-out  hover:scale-105">
                <div className="flex justify-between  items-center rounded-3xl py-4 px-4 w-full">
                  <div>
                    <h3 className="poppins text-[24px] font-medium text-(--text-primary)">
                      Email Us{" "}
                    </h3>
                    <p className="font-normal opensans md:text-[16px] text-[14px]">
                      Hello@montagemotion.com
                    </p>
                  </div>
                  <Image
                    src={"/assets/icon/gmail.png"}
                    alt="gmail"
                    className="w-14 h-14 bg-white rounded-[12px] p-2.5"
                    width={36}
                    height={36}
                  />
                </div>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-delay={700}>
              <div className="max-w-[622px] max-h-[139px] w-full  rounded-3xl bg-white/40 border border-white py-10 px-5 flex items-center animated  hover:scale-105">
                <div className="flex justify-between  items-center rounded-3xl py-4 px-4 w-full">
                  <div>
                    <h3 className="poppins text-[24px] font-medium  text-(--text-primary) ">
                      Chat on WhatsApp{" "}
                    </h3>
                    <p className="font-normal opensans md:text-[16px] text-[14px]">
                      +8801862938306
                    </p>
                  </div>
                  <Image
                    src={"/assets/icon/whatsapp.png"}
                    alt="gmail"
                    className="w-14 h-14 bg-white rounded-[12px] p-2.5"
                    width={36}
                    height={36}
                  />
                </div>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-delay={700}>
              <div className="max-w-[622px] h-[139px] w-full  rounded-3xl bg-white/40 border border-white py-10 px-5 flex items-center animated  hover:scale-105">
                <div className="flex justify-between  items-center rounded-3xl py-4 px-4 w-full">
                  <div>
                    <h3 className="poppins text-[24px] font-medium  text-(--text-primary) ">
                      Work at Motage Motion
                    </h3>
                    <p className="font-normal opensans md:text-[16px] text-[14px]">
                      See current job opportuites
                    </p>
                  </div>
                  <Image
                    src={"/assets/icon/users.png"}
                    alt="gmail"
                    className="w-14 h-14 bg-white rounded-[12px] p-2.5"
                    width={36}
                    height={36}
                  />
                </div>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-delay={700}>
              <div className="max-w-[622px] h-[139px] w-full  rounded-3xl bg-white/40 border border-white py-10 px-5 flex items-center animated  hover:scale-105">
                <div className="flex justify-between  items-center rounded-3xl py-4 px-4 w-full">
                  <div>
                    <h3 className="poppins text-[24px] font-medium  text-(--text-primary) ">
                      Work at Motage Motion
                    </h3>
                    <p className="font-normal opensans md:text-[16px] text-[14px]">
                      See current job opportuites
                    </p>
                  </div>
                  <Image
                    src={"/assets/icon/users.png"}
                    alt="gmail"
                    className="w-14 h-14 bg-white rounded-[12px] p-2.5"
                    width={36}
                    height={36}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay={400}>
          <div className="contact-card flex justify-between items-center  text-(--text-primary)  max-w-[622px] bg-white/40 w-full h-[604px] rounded-3xl border border-white">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
