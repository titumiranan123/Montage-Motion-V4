"use client";

import ContactForm from "@/component/share/ContactForm";
import Image from "next/image";
import Link from "next/link";

const FirstSection = () => {
  return (
    <div className="w-full mx-auto">
      <div
        className={`flex flex-col gap-1 justify-center items-center max-w-4xl w-full mx-auto `}
      >
        <p
          data-aos="fade-up"
          data-aos-delay={200}
          style={{ maxWidth: `170px` }}
          className={`  max-w-59.5 w-full h-11.5 flex justify-center items-center rounded-3xl text-[16px] leading-[140%]  font-normal  poppins glass-card text-(--text-primary) `}
        >
          Contact Us
        </p>

        <h1
          data-aos="fade-up"
          data-aos-delay={300}
          className="text-[36px] md:text-[56px] md:leading-[120%] font-medium text-center text-(--text-primary) mt-2 xl:mt-4 poppins"
        >
          Have a Project ? Let&apos;s Talk
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay={400}
          className="text-sm md:text-base md:leading-[150%] font-normal text-center text-gray-600 mt-2 w-full xl:w-8/9 mx-auto "
        >
          See how design meets function. Real results, clean code, and
          user-first experiences.
        </p>
        <style>{`
       .glass-card {
        width: "100%";
        height: 46px;
        background: rgba(255, 255, 255, 0.09);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 
          0 0.2px 1px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.5),
          inset 0 -1px 0 rgba(255, 255, 255, 0.1),
          inset 0 0 6px 3px rgba(255, 255, 255, 0.3);
        position: relative;
        overflow: hidden;
      }
      
      .glass-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.1),
          transparent
        );
      }
      
      .glass-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 100%;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.8),
          transparent,
          rgba(255, 255, 255, 0.3)
        );
      }
     
      `}</style>
      </div>
      <div className="w-full mx-auto">
        <div className=" lg:mt-20 mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          <div className="flex flex-col gap-4  justify-center items-center">
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
                href={`${item?.href}`}
                className="w-full cursor-pointer"
                key={idx}
                data-aos="fade-up"
                data-aos-delay={100 + idx * 100}
              >
                <div className="contact-card flex justify-between items-center text-(--text-primary)  max-w-155.5 w-full h-34.75 rounded-3xl glassShadow bg-white/40 backdrop-blur-2xl animated hover:scale-[104%] px-5 py-6">
                  <div>
                    <h3 className="text-[20px] md:text-[24px] md:leading-7.5 font-semibold poppins">
                      {item.title}
                    </h3>
                    <p className="text-[14px] md:text-[16px] md:leading-[140%] font-normal opensans mt-1">
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

          <div
            data-aos="fade-up"
            data-aos-delay={600}
            className="contact-card flex justify-center mx-auto items-center text-(--text-primary) max-w-145.5  w-full h-auto rounded-3xl glassShadow  bg-white/40  backdrop-blur-2xl"
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
