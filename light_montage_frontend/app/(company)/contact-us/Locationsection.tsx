import Gradientcard from "@/component/share/Gradientcard";
import { Heading } from "@/component/share/Headering";
import { ChevronRight } from "lucide-react";
import React from "react";

const Locationsection = () => {
  return (
    <div className="relative sectionGap container">
      <Heading
        tag="Our Location"
        title="Visit Our Office"
        subtitle="Let's connect where ideas trun into visuals, Drop by and meet the team behind Montage Motion"
      />
      <div
        data-aos="fade-up"
        data-aos-delay={400}
        className="max-w-[1055px] w-full px-2 max-h-[758px] h-full mt-10  mx-auto flex flex-col-reverse justify-center items-center relative gap-2"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d868.4200193609572!2d90.3718197197554!3d23.83628515594626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c10077d8354d%3A0x6baa8b9e6aa72e89!2sMontage%20Motion%20Ltd.!5e1!3m2!1sen!2sus!4v1766743405766!5m2!1sen!2sus"
          width="1055"
          height="578"
          loading="lazy"
          className="rounded-lg md:w-[1055px] lg:mt-0 mt-10 md:h-[578px] w-full h-full px-2"
        ></iframe>
        <div
          data-aos="fade-right"
          data-aos-delay={500}
          className="md:absolute lg:-left-20 md:-left-11 md:bottom-12  lg:bottom-20 "
        >
          <Gradientcard
            isHover={false}
            className="max-w-[440px] max-h-[217px] w-full h-full rounded-3xl md:py-6 py-5 md:px-5 px-5 "
            borderClassName="max-w-[440px]   max-h-[219px] w-full h-full p-[1px] rounded-[24px] "
          >
            <h2 className="text-[20px] text-(--text-primary) font-semibold poppins md:text-[24px]">
              Location
            </h2>
            <p className="text-[14px] font-normal opensans md:text-[16px] text-(--text-primary) mt-2">
              House #12, Road #3, Mirpur DOHS, Dhaka, Bangladesh.
            </p>
            <a
              href="https://wa.me/8801786-546949?text=Hi%20Montage%20Motion!%20I%20need%20guidance%20to%20reach%20your%20location."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-semibold opensans md:text-[16px] text-(--text-primary) mt-5 md:mt-8 flex items-center cursor-pointer hover:text-[#2B6AB2] transition translate-all duration-300 ease-in-out hover:scale-105"
            >
              Message on WhatsApp for Guidance <ChevronRight className="ml-1" />
            </a>
          </Gradientcard>
        </div>
      </div>
    </div>
  );
};

export default Locationsection;
