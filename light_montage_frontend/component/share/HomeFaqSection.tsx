/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Heading } from "./Headering";
import Image from "next/image";
import Accordion from "./Accordion";
import Gradientcard from "./Gradientcard";
import Link from "next/link";

const HomeFaqSection = ({ data }: { data?: any }) => {
  const allFaq = data?.faqs;
  if (data?.length <= 0) {
    return null;
  }
  return (
    <div id="faq" className="container sectionGap">
      <Heading
        subtitle={data?.section_description}
        tag={data?.section_tag}
        title={data?.section_title}
        isbackground={true}
        width="160"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:mt-20 md:mt-16 mt-8 lg:gap-10">
        <div data-aos="fade-up" className="" data-aos-delay={400}>
          <Gradientcard
            borderClassName="max-w-[422px] max-h-[751px] h-full w-full rounded-3xl p-[1px] "
            className="max-w-105 max-h-187.25 h-full w-full rounded-3xl "
          >
            <div className="flex justify-center  items-center flex-col h-full md:py-10 py-6 px-2 md:px-9">
              <Image
                src={data?.contact_image}
                alt="faq"
                  
                width={135}
                height={135}
                priority
                className="rounded-lg w-33.75 h-auto"
              />
              <h3 className="md:mt-4 mt-2 mb-2 font-semibold poppins  text-(--text-primary)  md:text-[24px] text-[22px] text-center lg:text-left">
                {data?.contact_heading}
              </h3>
              <p className="font-normal text-[16px] opensans leading-[140%]  text-(--text-primary)  text-center">
                {data?.contact_description}
              </p>
              <div className="flex justify-between items-center flex-col  text-(--text-primary)  mt-12 mb-9 gap-2">
                <p className="text-[24px] font-semibold leading-[100%] poppins">
                  {data?.contact_name}
                </p>
                <p className="text-[16px] font-normal leading-[140%] opensans">
                  {data?.contact_position}
                </p>
              </div>
              <Link
                href={data?.contact_link ?? "#"}
                target="_blank"
                className="btn-color max-w-87 w-full h-14 rounded-2xl py-4 px-4 font-medium flex justify-center items-center opensans animated hover:scale-105"
              >
                Book a Call
              </Link>
            </div>
          </Gradientcard>
        </div>
        <div className=" col-span-2 mt-6 lg:mt-0" data-aos="fade-up" data-aos-delay={500}>
          <Accordion items={allFaq} />
        </div>
      </div>
    </div>
  );
};

export default HomeFaqSection;
