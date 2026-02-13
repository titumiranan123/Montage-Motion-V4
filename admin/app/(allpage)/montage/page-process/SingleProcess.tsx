/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React from "react";
import Gradientcard from "../page-service/Gradientcard";
import Heading from "../page-service/Headering";

const SingleProcess = ({ data }: { data: any }) => {
  return (
    <div className="container sectionGap">
      <Heading
        subtitle={data?.paragraph}
        title={data?.heading_part1}
        extratitle={data?.heading_part2}
        tag={data?.tag}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 mt-9 md:mt-16 gap-5">
        <Image
          src={data?.image}
          alt="process "
          width={420}
          height={542}
          className="max-w-105 w-full max-h-135.5 h-full"
          priority
        />

        <div className="col-span-2 flex flex-col  gap-2">
          {data?.process_steps.map((dt: any) => (
            <Gradientcard
              key={dt.id}
              className="contact-card flex justify-between items-center text-white max-w-175 w-full h-42.5 rounded-3xl px-5"
              borderClassName="max-w-[698px] w-full h-[172px] rounded-[24px] p-[1px]"
            >
              <div className="w-full">
                <h3 className="font-semibold poppins text-[24px] text-white">
                  {dt?.title}
                </h3>
                <p className="text-white font-normal text-[16px]">
                  {dt?.description}
                </p>
              </div>
              <Image
                src={dt?.icon}
                alt="icon"
                className="w-14 h-14  rounded-xl p-2.5"
                width={36}
                height={36}
              />
            </Gradientcard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProcess;
