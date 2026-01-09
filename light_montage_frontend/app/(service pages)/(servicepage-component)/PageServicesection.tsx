"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { Heading } from "@/component/share/Headering";
import Gradientcard from "@/component/share/Gradientcard";

const PageServicesection = ({ data }: { data: any }) => {
  return (
    <div className="container sectionGap">
      <Heading
        subtitle={data?.paragraph}
        title={data?.heading_part1}
        tag={data?.tag}
      />
      <div className="lg:mt-20 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.services?.map((dt: any, idx: number) => (
          <div key={idx} className="group  min-h-[500px]">
            <Gradientcard
              isHover={true}
              borderClassName="max-w-[384px] w-full max-h-[488px] h-full rounded-[24px] p-[1px] "
              className="max-w-[384px] w-full max-h-[488px] h-full rounded-3xl  text-(--text-primary) flex justify-center items-start flex-col p-4 bg-[#F7F7F7]!"
            >
              <h2 className="text-[24px] font-semibold">{dt.service_title}</h2>
              <p className="text-[16px] font-normal leading--[140%] text-(--text-primary)">
                {dt.service_description}
              </p>
              <Image
                src={dt.image}
                alt={dt.title}
                width={344}
                height={276}
                priority
                className="max-w-[344px] w-full max-h-[276px] h-full"
              />
            </Gradientcard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageServicesection;
