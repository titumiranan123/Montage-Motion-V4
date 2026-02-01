/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Heading } from "./Headering";
import Image from "next/image";
import Accordion from "./Accordion";
import Gradientcard from "./Gradientcard";

const HomeFaqSection = ({ data }: { data?: any }) => {
  const allFaq = data?.faqs;
  return (
    <div id="faq" className="container sectionGap">
      <Heading
        subtitle={data?.section_description}
        tag={data?.section_tag}
        title={data?.section_title}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:mt-20 md:mt-16 mt-8 lg:gap-10">
        <div data-aos="fade-up" className="" data-aos-delay={400}>
          <Gradientcard
            borderClassName="max-w-[422px] max-h-[751px] h-full w-full rounded-3xl p-[1px] "
            className="max-w-[420px] max-h-[749px] h-full w-full rounded-3xl "
          >
            <div className="flex justify-center  items-center flex-col h-full md:py-10 py-6 px-2 md:px-9">
              <Image
                src={"/assets/faq.png"}
                alt="faq"
                title="faqimage"
                width={135}
                height={135}
                priority
              />
              <h2 className="md:mt-4 mt-2 mb-2 font-semibold poppins  text-(--text-primary)  md:text-[24px] text-[22px] text-center lg:text-left">
                Have more questions ?
              </h2>
              <p className="font-normal text-[16px] opensans leading-[140%]  text-(--text-primary)  text-center">
                Still curious? Let’s talk it out. Book a quick call. We’ll walk
                you through everything and help you figure out the best move for
                your brand.
              </p>
              <div className="flex justify-between items-center flex-col  text-(--text-primary)  mt-12 mb-9 gap-2">
                <h2 className="text-[24px] font-semibold leading-[100%] poppins">
                  Safwan Wafif
                </h2>
                <p className="text-[16px] font-normal leading-[140%] opensans">
                  Project Co-ordinator
                </p>
              </div>
              <button className="btn-color max-w-[348px] w-full h-14 rounded-2xl py-4 px-4 font-medium  opensans animated hover:scale-105">
                Book a Call
              </button>
            </div>
          </Gradientcard>
        </div>
        <div className=" col-span-2 ">
          <Accordion items={allFaq} />
        </div>
      </div>
    </div>
  );
};

export default HomeFaqSection;
