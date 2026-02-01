"use client";
import Image from "next/image";
import React from "react";
import Gradientcard from "../page-service/Gradientcard";
import Heading from "../page-service/Headering";

const SingleProcess = ({ data }: { data: any }) => {
  console.log("kjhsadjfklasdfjkla", data);
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
          className="max-w-[420px] w-full max-h-[542px] h-full"
          priority
        />

        <div className="col-span-2 flex flex-col  gap-2">
          {data?.process_steps.map((dt: any) => (
            <Gradientcard
              key={dt.id}
              className="contact-card flex justify-between items-center text-white max-w-[700px] w-full h-[170px] rounded-[24px] px-5"
              borderClassName="max-w-[698px] w-full h-[172px] rounded-[24px] p-[1px]"
            >
              <div className="w-full">
                <h3 className="font-[600] poppins text-[24px] text-white">
                  {dt?.title}
                </h3>
                <p className="text-white font-[400] text-[16px]">
                  {dt?.description}
                </p>
              </div>
              <Image
                src={dt?.icon}
                alt="icon"
                className="w-[56px] h-[56px]  rounded-[12px] p-[10px]"
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
