import Image from "next/image";
import React from "react";
import ContactForm from "./ContactForm";
import { Heading } from "../share/Headering";

const ContactSection = () => {
  return (
    <div className="container contactbg sectionGap  p-[60px] rounded-[40px]">
      <style>{`
      .contactbg{
        background: linear-gradient(180deg, #E9F8FC 0%, #F6FDFF 100%);
        
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
              title: "Work at Montage Motion",
              value: "See current job opportunities",
              icon: "/assets/currentjob.png",
            },
            {
              title: "Visit Us",
              value: "Learn more about our services",
              icon: "/assets/icon/users.png",
            },
          ].map((item, idx) => (
            <div
              className="w-full "
              key={idx}
              data-aos="fade-up"
              data-aos-delay={100 + idx * 100}
            >
              <div className="contact-card flex justify-between items-center text-(--text-primary)  max-w-[622px] w-full h-[139px] rounded-3xl glassShadow  bg-white/40  backdrop-blur-2xl animated hover:scale-[104%] px-5 py-6">
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
              </div>
            </div>
          ))}
        </div>
        <div data-aos="fade-up" data-aos-delay={400}>
          <div className="contact-card flex justify-between items-center  text-(--text-primary)  max-w-[622px] glassShadow  bg-white/40  backdrop-blur-2xl w-full h-[604px] rounded-3xl ">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
