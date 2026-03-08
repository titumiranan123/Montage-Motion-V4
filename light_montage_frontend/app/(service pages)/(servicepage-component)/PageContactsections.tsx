import ContactForm from "@/component/share/ContactForm";
import { Heading } from "@/component/share/Headering";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PageContactsections = () => {
  return (
    <div className="sectionarea contactbg sectionGap   rounded-[40px]">
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
        width="160"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
        <div className="flex flex-col gap-4 w-full justify-center items-center mx-auto">
          {[
            {
              title: "Email Us",
              value: "hello@montagemotion.com",
              icon: "/assets/icon/gmail.png",
              href: "mailto:hello@montagemotion.com",
            },
            {
              title: "Call Us",
              value: "+8801786546949",
              icon: "/assets/icon/whatsapp.png",
              href: "tel:+8801786546949",
            },
            {
              title: "Work at Montage Motion",
              value: "See current job opportunities",
              icon: "/assets/currentjob.png",
              href: "/careers",
            },
            {
              title: "Visit Us",
              value: "Learn more about our services",
              icon: "/assets/icon/users.png",
              href: "/about-us",
            },
          ].map((item, idx) => (
            <Link
              href={`${item.href}`}
              className="w-full "
              key={idx}
              data-aos="fade-up"
              data-aos-delay={100 + idx * 100}
            >
              <div className="contact-card flex justify-between items-center text-(--text-primary)  max-w-155.5 w-full h-34.75 rounded-3xl glassShadow  bg-white/40  backdrop-blur-2xl animated hover:scale-[104%] px-5 py-6">
                <div>
                  <h3 className="text-[20px] md:text-[24px] md:leading-7.5 font-semibold poppins">
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
            </Link>
          ))}
        </div>
        <div data-aos="fade-up" data-aos-delay={400}>
          <div className="contact-card flex justify-between items-center  text-(--text-primary)  max-w-155.5 glassShadow  bg-white/40  backdrop-blur-2xl w-full h-151 rounded-3xl ">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageContactsections;
