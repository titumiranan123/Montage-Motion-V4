"use client";
import Image from "next/image";
import React from "react";
import Gradientcard from "../page-service/Gradientcard";
import Heading from "../page-service/Headering";

const SingleProcess = ({ data }: { data: any }) => {
  console.log("data.process_steps", data.process_steps);
  return (
    <div className="container sectionGap">
      <Heading
        subtitle={data?.paragraph}
        title={data?.heading_part1}
        extratitle={data?.heading_part2}
        tag={data?.tag}
      />
      <div className="lg:mt-20 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.process_steps?.map((dt: any, idx: number) => (
          <div key={idx} data-aos="fade-up" data-aos-delay={100 + idx * 100}>
            <Gradientcard
              className="max-w-[384px] w-full max-h-[488px] h-full rounded-[24px] "
              borderClassName="max-w-[384px] w-full max-h-[488px] h-full rounded-[24px]  p-[1px]"
            >
              <div className=" text-[#E4E8F7] flex justify-center items-start flex-col p-4">
                <Image
                  src={dt.icon}
                  alt={dt.alt}
                  width={44}
                  height={44}
                  priority
                  className="max-w-[44px] w-full max-h-[44px] h-full md:mb-8 mb-4"
                />
                <h2 className="md:text-[24px] text-[20px] poppins font-[600]">
                  {dt.title}
                </h2>
                <p className="md:text-[16px] text-[14px] font-[400] leading-[140%] text-[#E4E8F7] mt-2 opensans">
                  {dt.description}
                </p>
              </div>
            </Gradientcard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleProcess;
