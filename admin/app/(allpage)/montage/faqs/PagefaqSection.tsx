import React from "react";
import Image from "next/image";

import Link from "next/link";
import Gradientcard from "../hyper-service/Gradientcard";
import Heading from "../page-service/Headering";
import Accordions from "@/component/faqs/Accordions";

const PageFaqSection = ({ data }: { data: any }) => {
  return (
    <div id="faq" className="sectionArea sectionGap">
      <Heading
        subtitle="Everything you need to know before we get started. "
        tag="FAQ"
        title="Frequently Asked Questions"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:mt-20 md:mt-16 mt-8 gap-10">
        <div data-aos="fade-up" className="" data-aos-delay={400}>
          <Gradientcard
            borderClassName="max-w-[422px] max-h-[751px] h-full w-full rounded-3xl p-[1px] "
            className="max-w-[420px] max-h-[749px] h-full w-full rounded-3xl "
          >
            <div className="flex justify-center  items-center flex-col h-full py-10 px-9">
              <Image
                src={data?.contact_image}
                alt={data?.contact_alt}
                title="faqimage"
                width={135}
                height={135}
                priority
              />
              <h2 className="md:mt-4 mt-2 mb-2 font-semibold poppins  text-(--text-primary)  text-[24px]">
                {data?.contact_heading}
              </h2>
              <p className="font-normal text-[16px] opensans leading-[140%]  text-(--text-primary)  text-center">
                {data.contact_description}
              </p>
              <div className="flex justify-between items-center flex-col  text-(--text-primary)  mt-12 mb-9 gap-2">
                <h2 className="text-[24px] font-semibold leading-[100%] poppins">
                  {data?.contact_name}
                </h2>
                <p className="text-[16px] font-normal leading-[140%] opensans">
                  {data?.contact_position}
                </p>
              </div>
              <Link
                href={`${data.contact_link}`}
                target="_blank"
                style={{ background: "#29bbf5" }}
                className=" max-w-[348px] w-full h-14 rounded-2xl py-4 px-4 font-medium   opensans animated hover:scale-105 flex justify-center items-center bg-[#29bbf5]"
              >
                Book a Call
              </Link>
            </div>
          </Gradientcard>
        </div>
        <div className=" col-span-2 ">
          <Accordions items={data?.faqs} />
        </div>
      </div>
    </div>
  );
};

export default PageFaqSection;
