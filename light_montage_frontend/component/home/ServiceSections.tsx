/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import Gradientcard from "../share/Gradientcard";
import Link from "next/link";
import { Heading } from "../share/Headering";

const ServiceSections = ({ data }: { data: any }) => {
  return (
    <div className="container sectionGap">
      <Heading
        subtitle={
          data?.paragraph
            ? data?.paragraph
            : "Montage Motion is an Advertising and Digital Agency specializing in Influencer Marketing"
        }
        title={data?.heading_part1 ? data?.heading_part1 : "Cat't Standout ?"}
        extratitle={
          data?.heading_part2 ? data?.heading_part2 : "Let Us Help You."
        }
        tag={data?.tag ? data?.tag : "Our Services"}
      />
      <div className="lg:mt-20 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.services?.map((dt: any, idx: number) => (
          <Link
            href={"#"}
            // href={dt?.href}
            key={idx}
            data-aos="fade-up"
            data-aos-delay={100 + idx * 100}
          >
            <Gradientcard
              className="max-w-[394px] w-full h-full md:max-h-[214px] max-h-[230px] rounded-3xl md:py-6 py-4 md:px-5 px-4  bg-white "
              borderClassName="max-w-[394px] w-full h-full md:max-h-[214px] max-h-[230px] rounded-[24px] p-[1px] hover:scale-105 animated"
            >
              <div className="flex justify-center items-start flex-col  text-(--text-primary)   gap-2  ">
                <Image
                  src={dt?.image}
                  alt={dt?.alt}
                  width={35}
                  height={35}
                  priority
                />
                <p className="text-[22px] leading-[100%] md:text-[24px] font-semibold poppins text-[#E4E8F7 mt-2">
                  {dt?.service_title}
                </p>
                <p className="text-[14px] md:text-[16px] font-normal opensans text-(--text-secondary) leading-[140%]">
                  {dt?.service_description}
                </p>
              </div>
            </Gradientcard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServiceSections;
